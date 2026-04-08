const { User, Token } = require("../database/models");
const {
  emailField,
  renewPwSchema,
  newPwSchema,
  profileSchema,
  pwField,
  tokenField,
} = require("../schemas/auth.schema");
const { transporter, getEmailUrl } = require("../email");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const getProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const profile = await User.findByPk(id);
    if (!profile) throw createError(404, "Profile not found");

    return res.status(200).json({ profile });
  } catch (error) {
    return next(error);
  }
};

const changePw = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      error,
      value: { newPw, currentPw },
    } = newPwSchema.validate(req.body);
    if (error) throw createError(400, error);

    if (currentPw === newPw)
      throw createError(400, "Passwords can't be the same.");

    const profile = await User.scope(null).findByPk(id);
    if (!(await profile?.comparePassword(currentPw)))
      throw createError(400, "Invalid credentials");

    profile.password = newPw;
    await profile.save();

    return res.status(200).json({ profile });
  } catch (error) {
    return next(error);
  }
};

const requestChangeEmail = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { error, value: newEmail } = emailField.validate(req.body);
    if (error) throw createError(400, error);

    const emailToken = jwt.sign(
      { newEmail, userId },
      process.env.JWT_EMAIL_SECRET,
      { expiresIn: "5m" },
    );

    const newEmailUrl = `${process.env.API_ORIGIN}/profile/change-email?token=${emailToken}`;
    const infoMail = await transporter.sendMail({
      to: newEmail,
      from: "'Zosterp' <no-reply@zosterp.com>",
      subject: "Cambio de e-mail",
      html: `<p>Has solicitado un cambio de correo para tu cuenta Zosterp. Si desea continuar, haz <a href="${newEmailUrl}">click aquí</a>. Si no, ignora este correo.<br/>Este enlace vencerá en 5 minutos</p>`,
    });

    const data =
      process.env.NODE_ENV === "development"
        ? { mail: await getEmailUrl(infoMail) }
        : {};
    return res.status(200).json({ data });
  } catch (error) {
    return next(error);
  }
};

const changeEmail = async (req, res, next) => {
  try {
    const {
      error,
      value: { password, token },
    } = renewPwSchema.validate(req.body);
    if (error) throw createError(400, error);

    const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET);

    const profile = await User.scope(null).findByPk(decoded.userId);
    if (!(await profile?.comparePassword(password)))
      throw createError(400, "Invalid credentials");

    profile.email = decoded.newEmail;
    await profile.save();

    return res.status(200).json({ profile });
  } catch (error) {
    return next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { error, value: password } = pwField.validate(req.body);
    if (error) throw createError(400, error);

    const profile = await User.scope(null).findByPk(id);
    if (!(await profile?.comparePassword(password)))
      throw createError(400, "Invalid credentials");

    await profile.destroy();

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { error, value } = profileSchema(req.body);
    if (error) throw createError(400, error);

    if (Object.keys(value).length < 1) throw createError(400, "No changes.");

    const profile = await User.update(value, {
      where: { id },
      returning: true,
    });

    return res.status(200).json({ profile });
  } catch (error) {
    return next(error);
  }
};

const getSessions = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const tokens = await Token.findAll({ where: { userId } });
    return res.status(200).json({ tokens });
  } catch (error) {
    return next(error);
  }
};

const deleteSession = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { error, value } = tokenField.validate(req.params);
    if (error) throw createError(400, error);

    await Token.destroy({ where: { userId, id: value.id } });

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProfile,
  deleteProfile,
  changePw,
  requestChangeEmail,
  changeEmail,
  updateProfile,
  getSessions,
  deleteSession,
};

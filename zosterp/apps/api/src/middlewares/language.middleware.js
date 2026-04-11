export const getLanguage = async (req, _res, next) => {
  try {
    const rawPrefix = req.headers["Accept-Language"] || "en";
    const parsedPrefix = rawPrefix.split("-")[0];
    req.language = parsedPrefix;
    return next();
  } catch (error) {
    return next(error);
  }
};

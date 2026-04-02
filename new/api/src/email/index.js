const nodemailer = require("nodemailer");

const testAccount = async () => await nodemailer.createTestAccount();

const transporter = async () => {
  return await nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

module.exports = transporter;

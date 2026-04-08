const nodemailer = require("nodemailer");

const testAccount = async () => await nodemailer.createTestAccount();

const getEmailUrl = async (mail) => await nodemailer.getTestMessageUrl(mail)

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

module.exports = {transporter, getEmailUrl};

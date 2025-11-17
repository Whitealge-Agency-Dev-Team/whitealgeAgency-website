const nodemailer = require("nodemailer");

async function createTransporter() {
  const test = await nodemailer.createTestAccount();

  return nodemailer.createTransport({
    host: test.smtp.host,
    port: test.smtp.port,
    secure: test.smtp.secure,
    auth: {
      user: test.user,
      pass: test.pass,
    },
  });
}

module.exports = { createTransporter };

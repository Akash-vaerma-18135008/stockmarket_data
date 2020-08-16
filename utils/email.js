


const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "akashverma.mec18@itbhu.ac.in",
      pass: "imsingle4242"
    },
  });

  const mailOptions = {
    from: "Akash Verma",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

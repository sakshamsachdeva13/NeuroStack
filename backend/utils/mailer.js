const nodemailer = require("nodemailer");

const sendEmail = (emailConfig) => {
  let transporter = nodemailer.createTransport({
    service : "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD 
    }
  });
  console.log(emailConfig)
  let mailOptions = {
    from: process.env.EMAIL, 
    to: emailConfig.recepientMailId,
    subject: emailConfig.subject,
    text: emailConfig.text, 
    // html: emailConfig.html, 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};



module.exports = sendEmail;
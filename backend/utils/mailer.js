const nodemailer = require("nodemailer");

const sendEmail = (emailConfig) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.example.com", 
    port: 587, 
    secure: false, 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.password, 
    },
  });

  let mailOptions = {
    from: emailConfig.sender, 
    to: emailConfig.recepientMailId,
    subject: emailConfig.subject,
    text: emailConfig.text, 
    html: emailConfig.html, 
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
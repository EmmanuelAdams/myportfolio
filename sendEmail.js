const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

app.use(express.json());

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: 'Thank you for your message',
    text: `Hi ${name},\n\nThank you for sending me a message. I will reply as soon as I see your email.\n\nBest regards,\nYour Name`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res
        .status(500)
        .json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res
        .status(200)
        .json({ message: 'Email sent successfully' });
    }
  });
});

module.exports = app;

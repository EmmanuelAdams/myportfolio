const nodemailer = require('nodemailer');

exports.handler = function (event, context, callback) {
  const { name, email, message } = JSON.parse(event.body);

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
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Failed to send email',
        }),
      });
    } else {
      console.log('Email sent:', info.response);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Email sent successfully',
        }),
      });
    }
  });
};

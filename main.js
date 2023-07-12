const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = 3000 || process.env.PORT;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public');
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASS,
    },
  });

  const userMailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: 'Thank you for reaching out!',
    text: `Hi ${name},\n\nThank you for sending me a message. I received the following message from you:\n\n"${message}"\n\nI will reply as soon as I see your email.\n\nBest regards,\nEmmanuel`,
  };

  const myMailOptions = {
    from: email,
    to: process.env.MY_EMAIL,
    subject: 'New Message from My Portfolio Contact Form',
    text: `You have received a new message from ${name} (${email}):\n\n${message}`,
  };

  try {
    transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        console.log('User Email Error:', error);
        res
          .status(500)
          .json({ error: 'Failed to send email' });
      } else {
        console.log('User Email sent:', info.response);

        transporter.sendMail(
          myMailOptions,
          (error, info) => {
            if (error) {
              console.log('My Email Error:', error);
            } else {
              console.log('My Email sent:', info.response);
            }
          }
        );

        res.status(200).json({
          success: true,
          message: 'Email sent successfully',
        });
      }
    });
  } catch (error) {
    console.log('Error:', error);
    res
      .status(500)
      .json({ error: 'An unexpected error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

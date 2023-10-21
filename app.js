const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors'); // Import the cors package
const admin = require('firebase-admin');

app.use(express.json());
//app.use(cors({ origin: 'http://localhost:4200' }));
app.use(cors({ origin: '' }));

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  // Set up nodemailer with your Gmail SMTP credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port:25,
    auth: {
      user: 'trinetr.help@gmail.com',
      pass: 'dpcppylllliwqyex',
    },
  });

  const mailOptions = {
    from: '"Trinetr" ',
    sender:'"Trinetr Mobile Tracking"',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    } else {
      console.log('Email sent successfully:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));



// node app.js  to start the server


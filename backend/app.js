const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 10000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the cors middleware with specific origin
app.use(cors());
  

// Routes
app.post('/api/send-email', (req, res) => {
  const { name, email, message, phone } = req.body;

  // Create a nodemailer transporter using your email service
  const transporter = nodemailer.createTransport({
    host: 'smtp.stackmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@vortexway.com',
      pass: 'Pass@123',
    },
  });

  // Email content
  const mailOptions = {
    from: 'info@vortexway.com',
    to: 'info@vortexway.com',
    subject: `Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({msg: 'Error sending email', error});
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

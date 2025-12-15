const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

// @desc    Send a new contact message
// @route   POST /api/messages
// @access  Public
const sendContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error('Please fill out all fields.');
  }

  // 1. Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // True for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // 2. Define the email content
  const mailOptions = {
    // Email recipient (your email address)
    to: process.env.TO_EMAIL, 
    // Sender will appear as your SMTP user
    from: `${name} <${process.env.SMTP_USER}>`, 
    subject: `New Portfolio Message: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr>
      <h3>Message:</h3>
      <div style="border: 1px solid #ccc; padding: 15px; background-color: #f9f9f9;">
        <p>${message.replace(/\n/g, '<br>')}</p>
      </div>
      <br>
      <p><em>This message was sent via your portfolio contact form.</em></p>
    `,
  };

  try {
    // 3. Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: 'Message sent successfully!',
    });

  } catch (error) {
    console.error('Nodemailer Error:', error);
    res.status(500);
    // Throw an error that Express-async-handler will catch
    throw new Error('Email sending failed. Please check server logs.'); 
  }
});

module.exports = { sendContactMessage };
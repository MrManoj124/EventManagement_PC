const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
  try {
    const { firstName, lastName, email, inquiryType, message } = req.body;

    if (!firstName || !email || !message) {
      return res.status(400).json({ error: "Please populate all mandatory fields before sending." });
    }

    // Configure the secure Nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'youremail@gmail.com', // Replace with your institutional Gmail account
        pass: 'xxxx xxxx xxxx xxxx'  // Replace with your generated 16-character Google App Password
      }
    });

    const mailOptions = {
      from: email,
      to: 'kabijakep@gmail.com', 
      subject: `New UniEvents Inquiry: [${inquiryType}] from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #0f172a; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #137fec; font-size: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Contact Form Submission</h2>
          <p style="margin-top: 15px;"><strong>Sender Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Inquiry Category:</strong> ${inquiryType}</p>
          <div style="margin-top: 20px; background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #137fec;">
            <p style="margin: 0; font-weight: bold; margin-bottom: 5px;">Message Details:</p>
            <p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.5; color: #334155;">${message}</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Inquiry dispatched to administrator successfully!" });
  } catch (error) {
    // Send the error message directly to help with client-side debugging
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router; 

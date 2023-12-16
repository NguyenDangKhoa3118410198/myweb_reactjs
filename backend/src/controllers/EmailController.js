const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
   const { email } = req.body;

   const emailUser = process.env.EMAIL_USER;
   const emailPassword = process.env.EMAIL_PASSWORD;

   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: emailUser,
         pass: emailPassword,
      },
   });

   const mailOptions = {
      from: emailUser,
      to: email,
      subject: 'Hello, Test Email',
      text: 'Hello, this is a test email!',
   };

   try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      res.json({ success: true, message: 'Email sent successfully' });
   } catch (error) {
      console.error('Error sending email:', error);
      res.json({ success: false, message: 'Failed to send email' });
   }
};

module.exports = { sendEmail };

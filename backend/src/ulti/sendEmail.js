const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, verificationCode) => {
   const verificationLink = `http://localhost:${process.env.PORT}/auth/register/verify?code=${verificationCode}`;

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
      subject: 'Account Verification',
      text: `Hello ${email},\n\nPlease verify your registration by clicking on the following link:\n${verificationLink}`,
   };

   return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
            console.error('Error sending verification email:', error);
            reject(error);
         } else {
            console.log('Verification email sent: ' + info.response);
            resolve();
         }
      });
   });
};

const sendResetEmail = async (email, resetLink, resetCode) => {
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
      subject: 'Reset Your Password',
      text: `Click on the following link to reset your password: ${resetLink} and your reset code: ${resetCode}`,
   };

   return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
            reject(error);
         } else {
            resolve(info);
         }
      });
   });
};

module.exports = { sendVerificationEmail, sendResetEmail };

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
      html: `
      <p>Hello ${email},</p>
      <p>Please verify your registration by clicking on the following link:</p>
      <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px;">Verify Account</a>
   `,
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
      html: `
      <p>Hello,</p>
      <p>You have requested to reset your password. Please click the button below to set a new password:</p>
      <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Verification Code: <span style="background-color: #777; color: #ffffff; padding: 5px; border-radius: 5px;">${resetCode}</span></p>
      <p>Best regards,</p>
      <p>Your App Team</p>
  `,
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

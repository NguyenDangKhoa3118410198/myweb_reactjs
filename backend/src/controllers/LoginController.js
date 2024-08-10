const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../ulti/token');
const { hashPassword, generateVerificationCode } = require('../ulti/bcrypt');
const { sendResetEmail } = require('../ulti/sendEmail');

const User = require('../models/User');
const Customer = require('../models/Customer');

const loginAttemptsMap = new Map();

const getUserLoginInfo = (email) => {
   return loginAttemptsMap.get(email) || { attempts: 0, lastAttemptTime: 0 };
};

const updateLoginAttempts = (email, userLoginInfo) => {
   const updatedLoginInfo = {
      attempts: userLoginInfo.attempts + 1,
      lastAttemptTime: Date.now(),
   };
   loginAttemptsMap.set(email, updatedLoginInfo);
};

const resetLoginAttempts = (email) => {
   loginAttemptsMap.set(email, { attempts: 0, lastAttemptTime: 0 });
};

const login = async (req, res) => {
   try {
      const { email, password } = req.body;

      const userLoginInfo = getUserLoginInfo(email);

      if (
         userLoginInfo.attempts >= 5 &&
         Date.now() - userLoginInfo.lastAttemptTime < 30000
      ) {
         const timeRemaining = Math.ceil(
            (30000 - (Date.now() - userLoginInfo.lastAttemptTime)) / 1000
         );
         return res.status(429).json({
            success: false,
            message: `Too many login attempts. Please try again in ${timeRemaining} seconds.`,
         });
      }

      const existingUser = await User.findOne({ email });

      if (!existingUser || existingUser === null) {
         updateLoginAttempts(email, userLoginInfo);

         return res.status(401).json({
            success: false,
            message: 'Login failed. Incorrect username or password.',
         });
      }

      if (!existingUser.isActive) {
         return res.status(401).json({
            success: false,
            message: 'Login failed. User account is not active.',
         });
      }

      if (!existingUser.isVerified) {
         return res.status(401).json({
            success: false,
            message:
               'Email not verified. Please check your email for verification instructions.',
         });
      }

      const passwordMatch = await bcrypt.compare(
         password,
         existingUser.password
      );

      if (passwordMatch) {
         resetLoginAttempts(email);

         const accessToken = generateAccessToken(existingUser);
         const refreshToken = generateRefreshToken(existingUser);

         res.json({
            success: true,
            message: 'Login successful!',
            username: existingUser.username,
            accessToken,
            refreshToken,
         });
      } else {
         updateLoginAttempts(email, userLoginInfo);

         return res.status(401).json({
            success: false,
            message: 'Login failed. Incorrect password.',
         });
      }
   } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({
         success: false,
         message:
            'Internal Server Error: An unexpected error occurred during login.',
      });
   }
};

const loginRoleAdmin = async (req, res) => {
   try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (!existingUser || existingUser === null) {
         return res.status(401).json({
            success: false,
            message: 'Login failed. Incorrect username or password.',
         });
      }

      if (existingUser.role !== 'admin') {
         return res.status(403).json({
            success: false,
            message: 'Login failed. User does not have admin role.',
         });
      }

      if (!existingUser.isActive) {
         return res.status(401).json({
            success: false,
            message: 'Login failed. User account is not active.',
         });
      }

      const passwordMatch = await bcrypt.compare(
         password,
         existingUser.password
      );

      if (passwordMatch) {
         const customerFilter = await Customer.findOne({
            user: existingUser._id,
         }).select({ user: 0, _id: 0 });

         const customerInfo = {
            ...customerFilter.toObject(),
            name: existingUser.name,
            email: existingUser.email,
            username: existingUser.username,
         };

         const accessToken = generateAccessToken(existingUser);
         const refreshToken = generateRefreshToken(existingUser);

         res.json({
            success: true,
            message: 'Login successful!',
            username: existingUser.username,
            customerInfo,
            accessToken,
            refreshToken,
         });
      } else {
         return res.status(401).json({
            success: false,
            message: 'Login failed. Incorrect password.',
         });
      }
   } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({
         success: false,
         message:
            'Internal Server Error: An unexpected error occurred during login.',
      });
   }
};

const resetPassword = async (req, res) => {
   console.log('--------------- Request reset password -------------------');
   try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
         return res
            .status(404)
            .json({ success: false, message: 'Email not found' });
      }

      const resetCode = generateVerificationCode();
      if (!resetCode) {
         return res.status(500).json({
            success: false,
            message: 'Failed to generate verification code',
         });
      }
      user.resetCode = resetCode;

      await user.save();

      const resetLink = `myweb-reactjs.vercel.app/new-password`;

      await sendResetEmail(email, resetLink, resetCode);
      res.status(200).json({
         success: true,
         message:
            'Request reset password successfully. Please check your email.',
      });
   } catch (error) {
      console.error('Error during password reset request:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
      });
   }
};

const confirmResetPassword = async (req, res) => {
   console.log('--------------- Confirm reset password -------------------');
   try {
      const { code, newPassword } = req.body;
      const user = await User.findOne({ resetCode: code });

      if (!user) {
         return res.status(400).json({
            success: false,
            message: 'Invalid verification code or email not confirmed',
         });
      }

      const hashedPassword = hashPassword(newPassword);

      if (
         typeof hashedPassword === 'string' &&
         hashedPassword.includes('Error')
      ) {
         return res.status(500).json({
            success: false,
            message: hashedPassword,
         });
      }

      user.password = hashedPassword;
      user.resetCode = undefined;
      await user.save();

      return res.status(200).json({
         success: true,
         message: 'Password reset successful',
      });
   } catch (error) {
      console.error('Error during password reset confirmation:', error);
      return res.status(500).json({ message: 'Internal server error' });
   }
};

module.exports = {
   login,
   loginRoleAdmin,
   resetPassword,
   confirmResetPassword,
};

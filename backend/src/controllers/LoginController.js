const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../ulti/token');
const User = require('../models/User');

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
         return res.json({
            success: false,
            message: `Too many login attempts. Please try again in ${timeRemaining} seconds.`,
         });
      }

      const existingUser = await User.findOne({ email });

      if (!existingUser || existingUser === null) {
         updateLoginAttempts(email, userLoginInfo);

         return res.json({
            success: false,
            message: 'Login failed. Incorrect username or password.',
         });
      }

      if (!existingUser.isActive) {
         return res.json({
            success: false,
            message: 'Login failed. User account is not active.',
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
         res.json({
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

module.exports = { login };

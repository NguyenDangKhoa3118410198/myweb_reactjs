const registeredUsers = require('../models/users');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../ulti/token');

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

const login = (req, res) => {
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

   const existingUser = registeredUsers.find(
      (user) =>
         user.email === email && bcrypt.compareSync(password, user.password)
   );

   if (existingUser) {
      resetLoginAttempts(email);

      const accessToken = generateAccessToken(existingUser);
      const refreshToken = generateRefreshToken(existingUser);

      res.json({
         success: true,
         message: 'Login successful!',
         accessToken,
         refreshToken,
      });
   } else {
      updateLoginAttempts(email, userLoginInfo);

      res.json({
         success: false,
         message: 'Login failed. Incorrect username or password.',
      });
   }
};

module.exports = { login };

const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
   console.log('id: ', user._id);
   return jwt.sign(
      { _id: user._id, role: user.role },
      process.env.TOKEN_SECRET_KEY,
      {
         expiresIn: '1m',
      }
   );
};

const generateRefreshToken = (user) => {
   return jwt.sign(
      { _id: user._id, role: user.role },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
         expiresIn: '2m',
      }
   );
};

module.exports = { generateAccessToken, generateRefreshToken };

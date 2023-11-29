const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
   return jwt.sign(
      { email: user.email, role: user.role },
      process.env.TOKEN_SECRET_KEY,
      {
         expiresIn: '1m',
      }
   );
};

const generateRefreshToken = (user) => {
   return jwt.sign(
      { email: user.email, role: user.role },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
         expiresIn: '2h',
      }
   );
};

module.exports = { generateAccessToken, generateRefreshToken };

const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
   return jwt.sign(
      { id: user._id, role: user.role },
      process.env.TOKEN_SECRET_KEY,
      {
         expiresIn: '1h',
      }
   );
};

const generateRefreshToken = (user) => {
   return jwt.sign(
      { id: user._id, role: user.role },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
         expiresIn: '2h',
      }
   );
};

module.exports = { generateAccessToken, generateRefreshToken };

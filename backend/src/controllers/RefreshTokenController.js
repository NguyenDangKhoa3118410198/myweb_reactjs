const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../ulti/token');

const isValidRefreshToken = async (req, res) => {
   const refreshToken = req.body.refreshToken;
   console.log('server refreshToken: ', refreshToken);

   if (!refreshToken) {
      return res
         .status(401)
         .json({ message: 'Unauthorized: No refresh token provided' });
   }
   try {
      const decoded = jwt.verify(
         refreshToken,
         process.env.REFRESH_TOKEN_SECRET_KEY
      );

      const statusUser = await User.findOne({ _id: decoded._id });

      if (!statusUser.isActive) {
         return res.status(403).json({
            message: 'Forbidden: User is not active',
         });
      }
      const newAccessToken = generateAccessToken(decoded);
      const newRefreshToken = generateRefreshToken(decoded);

      console.log('Server New Token: ' + newAccessToken);

      res.status(201).json({
         accessToken: newAccessToken,
         refreshToken: newRefreshToken,
      });
   } catch (error) {
      return res
         .status(403)
         .json({ message: 'Forbidden: Invalid refresh token' });
   }
};

module.exports = { isValidRefreshToken };

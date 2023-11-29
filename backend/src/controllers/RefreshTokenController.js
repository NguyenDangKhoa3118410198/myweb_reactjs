const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../ulti/token');

const isValidRefreshToken = async (req, res) => {
   const refreshToken = req.body.refreshToken;
   console.log('server refreshToken: ', refreshToken);

   if (!refreshToken) {
      return res
         .status(401)
         .json({ message: 'Unauthorized: No refresh token provided' });
   }

   jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      (err, user) => {
         if (err) {
            return res
               .status(403)
               .json({ message: 'Forbidden: Invalid refresh token' });
         }

         const newAccessToken = generateAccessToken(user);
         console.log('Server New Token: ' + newAccessToken);

         res.json({ accessToken: newAccessToken });
      }
   );
};

module.exports = { isValidRefreshToken };

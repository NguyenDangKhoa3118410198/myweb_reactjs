const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
   const authHeader = req.header('Authorization');
   console.log('Middleware: ', authHeader);

   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(400).json({
         success: false,
         message: 'Bad Request: Middleware invalid token format',
      });
   }

   const token = authHeader.split(' ')[1];

   try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      const { email, role } = decoded;

      const existingUser = await User.findOne({ email, role });

      if (!existingUser) {
         return res.status(403).json({
            success: false,
            message:
               'Forbidden: Middleware you do not have permission to access this resource.',
         });
      }

      if (!existingUser.isActive) {
         return res.status(403).json({
            success: false,
            requestLoginAgain: true,
            message: 'Forbidden: Middleware user is not active',
         });
      }

      req.user = decoded;
      next();
   } catch (error) {
      return res.status(403).json({
         success: false,
         message: 'Forbidden: Middleware invalid token',
         error: error.message,
      });
   }
};

module.exports = authenticateToken;

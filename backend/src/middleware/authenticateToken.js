const jwt = require('jsonwebtoken');
const registeredUsers = require('../models/users');

const authenticateToken = (req, res, next) => {
   const authHeader = req.header('Authorization');
   console.log('Middleware: ', authHeader);

   if (!authHeader) {
      return res
         .status(401)
         .json({ success: false, message: 'Unauthorized: No token provided' });
   }

   if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
         success: false,
         message: 'Unauthorized: Invalid token format',
      });
   }

   const token = authHeader.split(' ')[1];

   try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      const { email, role } = decoded;

      const existingUser = registeredUsers.some(
         (user) => user.email === email && user.role === role
      );

      if (!existingUser) {
         return res
            .status(403)
            .json({ success: false, message: 'Forbidden: User not found' });
      }

      req.user = decoded;
      next();
   } catch (error) {
      return res
         .status(403)
         .json({ success: false, message: 'Forbidden: Invalid token' });
   }
};

module.exports = authenticateToken;

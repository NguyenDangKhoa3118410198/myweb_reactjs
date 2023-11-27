const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
   const authHeader = req.header('Authorization');

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

      req.user = decoded;
      next();
   } catch (error) {
      return res
         .status(403)
         .json({ success: false, message: 'Forbidden: Invalid token' });
   }
};

module.exports = authenticateToken;

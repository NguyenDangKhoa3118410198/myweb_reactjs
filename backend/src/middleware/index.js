const mongoose = require('mongoose');
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
      const { _id, role } = decoded;

      const existingUser = await User.findOne({ _id, role });

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

const checkAdminRole = async (req, res, next) => {
   authenticateToken(req, res, async () => {
      try {
         if (req.user.role === 'admin') {
            next();
         } else {
            console.error(
               `Access denied for ${req.user.email} with role ${req.user.role}`
            );
            res.status(403).json({ message: 'Forbidden: You need role Admin' });
         }
      } catch (error) {
         console.error(
            `Access denied for ${
               req.user ? req.user.email : 'Unknown User'
            } with role ${req.user ? req.user.role : 'Unknown Role'}`
         );
         res.status(403).json({
            message: 'Forbidden: Invalid token',
            error: error.message,
         });
      }
   });
};

const allowUserEditOwnProfile = (modelName) => async (req, res, next) => {
   try {
      const userIdFromToken = req.user?._id;
      const modelInstance = await mongoose
         .model(modelName)
         .findById(req.params.id);

      if (!modelInstance) {
         return res.status(404).json({ message: 'Object not found' });
      }

      const modelUserId = modelInstance.user?.toString();

      if (userIdFromToken && userIdFromToken === modelUserId) {
         return next();
      }

      res.status(403).json({
         message: 'Forbidden: Insufficient access rights',
      });
   } catch (error) {
      console.error(`Error checking ${modelName} permission:`, error.message);
      res.status(500).json({ message: 'Internal Server Error' });
   }
};

module.exports = { authenticateToken, checkAdminRole, allowUserEditOwnProfile };

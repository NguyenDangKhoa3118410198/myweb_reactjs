const User = require('../models/User');
const { hashPasswordByNameAndEmail } = require('../ulti/bcrypt');
const Customer = require('../models/Customer');

const countTotalUsers = async (req, res) => {
   console.log('--------------- Count total users -------------------');

   try {
      const count = await User.countDocuments({});
      res.status(200).json({
         success: true,
         message: 'Total users counted successfully!',
         totalUsers: count,
      });
   } catch (error) {
      console.error('Error counting total users:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message,
      });
   }
};

const getUsers = async (req, res) => {
   console.log('--------------- Get users -------------------');
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 5;
   const skip = (page - 1) * limit;

   try {
      let usersDB;
      let totalUsers;

      if (req.user && req.user.role === 'admin') {
         totalUsers = await User.countDocuments({});
         usersDB = await User.find(
            {},
            { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }
         )
            .skip(skip)
            .limit(limit);
      } else {
         totalUsers = await User.countDocuments({ role: 'user' });
         usersDB = await User.find(
            { role: 'user' },
            { name: 1, username: 1, email: 1 }
         )
            .skip(skip)
            .limit(limit);
      }

      const listUsers = await Promise.all(
         usersDB.map(async (user) => {
            const filteredUser = {
               name: user.name,
               username: user.username,
               email: user.email,
            };

            if (req.user && req.user.role === 'admin') {
               filteredUser.id = user._id;
               filteredUser.role = user.role;
               filteredUser.isActive = user.isActive.toString();

               const customerFilter = await Customer.findOne({
                  user: user._id,
               }).select({ user: 0, _id: 0 });

               if (customerFilter) {
                  filteredUser.address = customerFilter.address;
                  filteredUser.phone = customerFilter.phone;
                  filteredUser.dateOfBirth = customerFilter.dateOfBirth;
                  filteredUser.gender = customerFilter.gender;
                  filteredUser.avatar = customerFilter.avatar;
               }
            }

            return filteredUser;
         })
      );

      const totalPages = Math.ceil(totalUsers / limit);

      res.status(200).json({
         data: listUsers,
         pagination: { page, totalPages },
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

const addUser = async (req, res) => {
   console.log('--------------- Add user -------------------');

   try {
      if (req.user && req.user.role === 'admin') {
         const { name, email } = req.body;
         const hashedPassword = hashPasswordByNameAndEmail(name, email);

         const newUser = req.body;
         newUser.password = hashedPassword;
         newUser.isVerified = true;

         if (email) {
            const emailExists = await User.findOne({ email });

            if (emailExists) {
               return res.status(400).json({
                  success: false,
                  message: 'Email already exists',
               });
            }
         }

         const createdUser = await User.create(newUser);

         console.log('Created user:', createdUser);

         const simplifiedUser = {
            id: createdUser._id,
            name: createdUser.name,
            username: createdUser.username,
            email: createdUser.email,
            role: createdUser.role,
            isActive: createdUser.isActive.toString(),
         };

         res.status(201).json({
            success: true,
            message: 'User added successfully!',
            newUser: simplifiedUser,
         });
      }
   } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message,
      });
   }
};

const editUser = async (req, res) => {
   console.log('--------------- Edit user -------------------');

   try {
      if (req.user && req.user.role === 'admin') {
         const userId = req.params.id;
         const updatedUserData = req.body;

         const existingUser = await User.findById(userId);

         if (!existingUser) {
            return res.status(404).json({
               success: false,
               message: 'User not found',
            });
         }

         if (
            updatedUserData.email &&
            updatedUserData.email !== existingUser.email
         ) {
            const emailExists = await User.findOne({
               email: updatedUserData.email,
            });

            if (emailExists) {
               return res.status(400).json({
                  success: false,
                  message: 'Email already exists',
               });
            }
         }

         existingUser.set(updatedUserData);
         await existingUser.save();

         console.log('Updated user:', existingUser);

         res.status(200).json({
            success: true,
            message: 'User updated successfully',
         });
      }
   } catch (error) {
      console.error('Error editing user:', error.message);
      res.status(500).json({
         success: false,
         message: 'Internal Server Error',
      });
   }
};

const deactivateUser = async (req, res) => {
   console.log('--------------- Deactivated  user -------------------');

   try {
      const userId = req.params.id;

      const existingUser = await User.findById(userId);

      if (!existingUser) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
         });
      }

      existingUser.isActive = false;
      await existingUser.save();

      res.status(200).json({
         success: true,
         message: 'User deactivated successfully',
      });
   } catch (error) {
      console.error('Error deactivated user:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message,
      });
   }
};

const activateUser = async (req, res) => {
   console.log('--------------- Activated  user -------------------');

   try {
      const userId = req.params.id;

      const existingUser = await User.findById(userId);

      if (!existingUser) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
         });
      }

      existingUser.isActive = true;
      await existingUser.save();

      res.status(200).json({
         success: true,
         message: 'User activated successfully',
      });
   } catch (error) {
      console.error('Error activated user:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message,
      });
   }
};

module.exports = {
   countTotalUsers,
   getUsers,
   addUser,
   editUser,
   deactivateUser,
   activateUser,
};

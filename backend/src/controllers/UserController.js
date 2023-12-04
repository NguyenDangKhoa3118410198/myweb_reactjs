const User = require('../models/User');
// const axios = require('axios');
// const users = [];

// ------------------------Delete-------------------
const bcrypt = require('bcrypt');
const saltRounds = 10;
const hashPassword = (name, email) => {
   const combinedString = `${name}${email}`;
   const salt = bcrypt.genSaltSync(saltRounds);
   return bcrypt.hashSync(combinedString, salt);
};

const getUsers = async (req, res) => {
   console.log('--------------- Get users -------------------');

   try {
      const usersDB = await User.find({});
      const simplifiedUsers = usersDB.map((user) => ({
         id: user._id,
         name: user.name,
         username: user.username,
         email: user.email,
      }));
      res.json(simplifiedUsers);

      // const response = await axios.get(
      //    'https://jsonplaceholder.typicode.com/users'
      // );
      // const updatedData = response.data.map((user) => {
      //    const updatedUser = {
      //       id: user.id,
      //       name: user.name,
      //       username: user.username,
      //       email: user.email,
      //    };
      //    users.push(updatedUser);
      //    return updatedUser;
      // });
      // res.json(updatedData);
      // console.log(users);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

const addUser = async (req, res) => {
   console.log('--------------- Add user -------------------');

   try {
      const { name, email } = req.body;
      const newUser = req.body;
      const hashedPassword = hashPassword(name, email);
      newUser.password = hashedPassword;

      const createdUser = await User.create(newUser);

      console.log('Created user:', createdUser);

      const simplifiedUser = {
         id: createdUser._id,
         name: createdUser.name,
         username: createdUser.username,
         email: createdUser.email,
      };

      res.json({
         success: true,
         message: 'User added successfully!',
         newUser: simplifiedUser,
      });
   } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message,
      });
   }
};

const deleteUser = async (req, res) => {
   console.log('--------------- Delete user -------------------');

   try {
      const userId = req.params.id;

      const existingUser = await User.findById(userId);

      if (!existingUser) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
         });
      }

      await existingUser.deleteOne();

      res.json({
         success: true,
         message: 'User deleted successfully',
         deletedUser: existingUser,
      });
   } catch (error) {
      console.error('Error deleting user:', error);
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
      const userId = req.params.id;
      const updatedUserData = req.body;

      const existingUser = await User.findById(userId);

      if (!existingUser) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
         });
      }

      existingUser.set(updatedUserData);
      await existingUser.save();

      console.log('Updated user:', existingUser);

      res.json({
         success: true,
         message: 'User updated successfully',
      });
   } catch (error) {
      console.error('Error editing user:', error.message);
      res.status(500).json({
         success: false,
         message: 'Internal Server Error',
      });
   }
};

module.exports = { getUsers, addUser, deleteUser, editUser };

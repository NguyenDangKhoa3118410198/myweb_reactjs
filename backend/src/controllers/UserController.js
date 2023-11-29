const axios = require('axios');
const users = [];

const getUsers = async (req, res) => {
   try {
      const response = await axios.get(
         'https://jsonplaceholder.typicode.com/users'
      );
      const updatedData = response.data.map((user) => {
         const updatedUser = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
         };
         users.push(updatedUser);
         return updatedUser;
      });
      res.json(updatedData);
      console.log(users);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

const addUser = (req, res) => {
   try {
      const newUser = req.body;

      const lastElement = users.length > 0 ? users[users.length - 1] : null;
      const lastElementId = lastElement ? parseInt(lastElement.id, 10) : 0;

      newUser.id = lastElementId + 1;
      users.push(newUser);
      console.log(users);

      res.json({
         success: true,
         message: 'User added successfully!',
         newUser,
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

const deleteUser = (req, res) => {
   try {
      const userId = parseInt(req.params.id, 10);
      console.log('delete userId : ', userId);

      const userIndex = users.findIndex((user) => user.id === userId);

      if (userIndex === -1) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
         });
      }

      const deletedUser = users.splice(userIndex, 1)[0];

      res.json({
         success: true,
         message: 'User deleted successfully',
         deletedUser,
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

const editUser = (req, res) => {
   try {
      const userId = parseInt(req.params.id, 10);
      const updatedUserData = req.body;

      const userIndex = users.findIndex((user) => user.id === userId);

      if (userIndex === -1) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
         });
      }

      users[userIndex] = { ...users[userIndex], ...updatedUserData };

      console.log('Updated user:', users[userIndex]);

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

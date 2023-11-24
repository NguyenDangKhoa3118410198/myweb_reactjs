const registeredUsers = require('../models/users');

const register = (req, res) => {
   const { email, password, username } = req.body;

   console.log('Received registration request:', email, password, username);

   const existingUser = registeredUsers.some((user) => user.email === email);

   if (existingUser) {
      return res.json({
         success: false,
         message: 'User already exists.',
      });
   }

   registeredUsers.push({ email, password, username });

   console.log('Registration successful!');
   res.json({
      success: true,
      message: 'Registration successful!',
   });
};

module.exports = { register };

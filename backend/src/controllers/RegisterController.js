const registeredUsers = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = process.env.SALT_ROUNDS || 10;

const hashPassword = (password) => {
   const salt = bcrypt.genSaltSync(Number(saltRounds));
   return bcrypt.hashSync(password, salt);
};

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

   let hashedPassword = hashPassword(password);

   registeredUsers.push({ email, password: hashedPassword, username });

   const token = jwt.sign(
      { email: existingUser.email },
      process.env.SECRETKEY,
      {
         expiresIn: '1h',
      }
   );
   console.log('Registration successful!');
   res.json({
      success: true,
      message: 'Registration successful!',
      token,
   });
};
module.exports = { register };

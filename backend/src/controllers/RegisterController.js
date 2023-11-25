const registeredUsers = require('../models/users');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../ulti/token');

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
         message: 'Email already exists.',
      });
   }

   let hashedPassword = hashPassword(password);

   const role = 'user';
   const newUser = { email, password: hashedPassword, username, role };
   registeredUsers.push(newUser);

   const accessToken = generateAccessToken(existingUser);
   const refreshToken = generateRefreshToken(existingUser);

   console.log('Registration successful!');
   res.json({
      success: true,
      message: 'Registration successful!',
      accessToken,
      refreshToken,
   });
};

module.exports = { register };

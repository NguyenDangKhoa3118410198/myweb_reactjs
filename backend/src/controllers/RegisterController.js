// const registeredUsers = require('../models/users');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../ulti/token');
const { hashPassword } = require('../ulti/bcrypt');

const register = async (req, res) => {
   const { email, password, username, name } = req.body;

   console.log(
      'Received registration request:',
      email,
      password,
      username,
      name
   );

   const existingUser = await User.findOne({ email });

   if (existingUser) {
      return res.json({
         success: false,
         message: 'Email already exists.',
      });
   }

   let hashedPassword = hashPassword(password);

   const role = 'user';
   const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role,
   });
   try {
      await newUser.save();

      const accessToken = generateAccessToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      console.log('Registration successful!');
      res.json({
         success: true,
         message: 'Registration successful!',
         accessToken,
         refreshToken,
      });
   } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({
         success: false,
         message:
            'Internal Server Error: An unexpected error occurred during registration.',
      });
   }
};

module.exports = { register };

const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../ulti/token');
const { hashPassword, generateVerificationCode } = require('../ulti/bcrypt');
const { sendVerificationEmail } = require('../ulti/sendEmail');

const register = async (req, res) => {
   const { username, name, email, password } = req.body;

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
   const verificationCode = generateVerificationCode();

   const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role,
      verificationCode,
   });

   try {
      await newUser.save();

      await sendVerificationEmail(email, verificationCode);

      res.json({
         success: true,
         message: 'Registration successful! Check your email for verification.',
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

const verifyEmail = async (req, res) => {
   const userVerificationCode = req.query.code;

   try {
      const user = await User.findOne({
         verificationCode: userVerificationCode,
      });

      if (user) {
         user.verificationCode = undefined;
         user.isVerified = true;
         await user.save();

         const accessToken = generateAccessToken(user);
         const refreshToken = generateRefreshToken(user);

         res.json({
            success: true,
            message: 'Email verification successful!',
            username: user.username,
            accessToken,
            refreshToken,
         });
      } else {
         res.json({
            success: false,
            message:
               'Email verification unsuccessful. Invalid verification code.',
         });
      }
   } catch (error) {
      console.error('Error during email verification:', error);
      res.status(500).send(
         'Internal Server Error: An unexpected error occurred during email verification.'
      );
   }
};

module.exports = { register, verifyEmail };

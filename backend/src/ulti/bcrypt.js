const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = process.env.SALT_ROUNDS || 10;

const hashPassword = (plainPassword) => {
   const validationMessage = isPasswordValid(plainPassword);

   if (validationMessage !== '') {
      return validationMessage;
   }

   const salt = bcrypt.genSaltSync(Number(saltRounds));
   return bcrypt.hashSync(plainPassword, salt);
};

const hashPasswordByNameAndEmail = (name, email) => {
   const combinedString = `${name}${email}`;
   return bcrypt.hashSync(combinedString, Number(saltRounds));
};

const generateVerificationCode = () => {
   return crypto.randomBytes(20).toString('hex');
};

const isPasswordValid = (password) => {
   if (!password || password === undefined) {
      return 'Error: Password is undefined or null.';
   }

   if (password.length < 6) {
      return 'Error: Password must be at least 6 characters long.';
   }

   if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      return 'Error: Password must contain at least one lowercase and one uppercase letter.';
   }

   if (!/\d/.test(password)) {
      return 'Error: Password must contain at least one digit.';
   }

   return '';
};

module.exports = {
   hashPassword,
   hashPasswordByNameAndEmail,
   generateVerificationCode,
};

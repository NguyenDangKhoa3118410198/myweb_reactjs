const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = process.env.SALT_ROUNDS || 10;

const hashPassword = (password) => {
   const salt = bcrypt.genSaltSync(Number(saltRounds));
   return bcrypt.hashSync(password, salt);
};

const hashPasswordByNameAndEmail = (name, email) => {
   const combinedString = `${name}${email}`;
   return bcrypt.hashSync(combinedString, Number(saltRounds));
};

const generateVerificationCode = () => {
   return crypto.randomBytes(20).toString('hex');
};

module.exports = {
   hashPassword,
   hashPasswordByNameAndEmail,
   generateVerificationCode,
};

const registeredUsers = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginAttemptsMap = new Map();

const getUserLoginInfo = (email) => {
   return loginAttemptsMap.get(email) || { attempts: 0, lastAttemptTime: 0 };
};

const updateLoginAttempts = (email, userLoginInfo) => {
   const updatedLoginInfo = {
      attempts: userLoginInfo.attempts + 1,
      lastAttemptTime: Date.now(),
   };
   loginAttemptsMap.set(email, updatedLoginInfo);
};

const resetLoginAttempts = (email) => {
   loginAttemptsMap.set(email, { attempts: 0, lastAttemptTime: 0 });
};

const login = (req, res) => {
   const { email, password } = req.body;

   // Lấy thông tin đăng nhập của người dùng từ loginAttemptsMap
   const userLoginInfo = getUserLoginInfo(email);

   // Kiểm tra xem người dùng đã đăng nhập quá số lần quy định trong khoảng thời gian nhất định chưa
   if (
      userLoginInfo.attempts >= 5 &&
      Date.now() - userLoginInfo.lastAttemptTime < 30000
   ) {
      const timeRemaining = Math.ceil(
         (30000 - (Date.now() - userLoginInfo.lastAttemptTime)) / 1000
      );
      return res.json({
         success: false,
         message: `Too many login attempts. Please try again in ${timeRemaining} seconds.`,
      });
   }

   // Tiến hành kiểm tra thông tin đăng nhập
   const existingUser = registeredUsers.find(
      (user) =>
         user.email === email && bcrypt.compareSync(password, user.password)
   );

   if (existingUser) {
      // Nếu đăng nhập thành công, đặt lại thông tin đăng nhập cho người dùng
      resetLoginAttempts(email);

      const token = jwt.sign(
         { email: existingUser.email, role: existingUser.role },
         process.env.SECRET_KEY,
         {
            expiresIn: '1h',
         }
      );

      res.json({ success: true, message: 'Login successful!', token });
   } else {
      // Nếu đăng nhập thất bại, cập nhật thông tin đăng nhập của người dùng
      updateLoginAttempts(email, userLoginInfo);

      res.json({
         success: false,
         message: 'Login failed. Incorrect username or password.',
      });
   }
};

module.exports = { login };

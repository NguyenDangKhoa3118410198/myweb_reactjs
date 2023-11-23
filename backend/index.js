const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

// Cấu hình CORS
const corsOptions = {
   origin: 'http://localhost:3000', // Chỉ chấp nhận yêu cầu từ nguồn này
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true, // Cho phép gửi cookie qua các nguồn
   optionsSuccessStatus: 204, // Trả về mã status 204 nếu OPTIONS được gọi thành công
};

app.use(cors(corsOptions)); // Sử dụng middleware cors
app.use(bodyParser.json());

const registeredUsers = [{ email: 'Admin@123', password: '123' }];

const loginAttemptsMap = new Map();

app.post('/api/login', (req, res) => {
   const { email, password } = req.body;

   // Lấy thông tin đăng nhập của người dùng từ loginAttemptsMap
   const userLoginInfo = loginAttemptsMap.get(email) || {
      attempts: 0,
      lastAttemptTime: 0,
   };

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
      (user) => user.email === email && user.password === password
   );
   if (existingUser) {
      // Nếu đăng nhập thành công, đặt lại thông tin đăng nhập cho người dùng
      loginAttemptsMap.set(email, { attempts: 0, lastAttemptTime: 0 });

      res.json({ success: true, message: 'Login successful!' });
   } else {
      // Nếu đăng nhập thất bại, cập nhật thông tin đăng nhập của người dùng
      const updatedLoginInfo = {
         attempts: userLoginInfo.attempts + 1,
         lastAttemptTime: Date.now(),
      };
      loginAttemptsMap.set(email, updatedLoginInfo);

      res.json({
         success: false,
         message: 'Login failed. Incorrect username or password.',
      });
   }
});

app.post('/api/register', (req, res) => {
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
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});

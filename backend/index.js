const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;

const route = require('./src/routes');

const corsOptions = {
   origin: 'http://localhost:3000', // Chỉ chấp nhận yêu cầu từ nguồn này
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true, // Cho phép gửi cookie qua các nguồn
   optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
   // Kiểm tra xem yêu cầu có đến đường dẫn cụ thể không
   if (req.path.includes('/assets/drop-wrapper-pic-GDO35LIT.png')) {
      return res.send('skip');
   }
   // Nếu không phải là đường dẫn cụ thể, tiếp tục xử lý yêu cầu
   next();
});

// ---------------------------------------------------Handle------------------------------------------

const registeredUsers = [{ email: 'Admin@123', password: '123' }];

const loginAttemptsMap = new Map();

app.get('/', (req, res) => {
   res.send('Welcome');
});

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

route(app);

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});

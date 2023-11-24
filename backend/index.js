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

route(app);

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('../src/models/db');
require('dotenv').config();
const port = process.env.PORT || 4000;

const route = require('../src/routes');

const corsOptions = {
   origin: ['http://localhost:3000', 'https://myweb-reactjs.vercel.app'],
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true, // Cho phép gửi cookie qua các nguồn
   optionsSuccessStatus: 200,
};

db.connectToDatabase();
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

app.get('/', (req, res) => res.send('Express on Vercel'));
app.listen(4000, () => console.log('Server ready on port 4000.'));
route(app);

module.exports = app;

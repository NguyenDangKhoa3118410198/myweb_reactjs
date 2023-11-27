const userRouter = require('./user');
const orderRouter = require('./order');
const productRouter = require('./product');
const loginRouter = require('./login');
const registerRouter = require('./register');
const refreshTokenRouter = require('./refreshToken');

const authenticateToken = require('../middleware/authenticateToken');

function route(app) {
   app.use('/api/users', authenticateToken, userRouter);
   app.use('/api/orders', authenticateToken, orderRouter);
   app.use('/api/products', authenticateToken, productRouter);
   app.use('/auth/login', loginRouter);
   app.use('/auth/register', registerRouter);
   app.use('/auth/refreshToken', refreshTokenRouter);

   app.use((req, res) => {
      res.status(404).send('Page not found');
   });

   app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something went wrong!');
   });
}
module.exports = route;

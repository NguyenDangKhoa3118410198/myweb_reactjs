const userRouter = require('./user');
const orderRouter = require('./order');
const productRouter = require('./product');
const loginRouter = require('./login');
const registerRouter = require('./register');

function route(app) {
   app.use('/api/users', userRouter);
   app.use('/api/orders', orderRouter);
   app.use('/api/products', productRouter);
   app.use('/auth/login', loginRouter);
   app.use('/auth/register', registerRouter);

   app.use((req, res) => {
      res.status(404).send('Page not found');
   });

   app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something went wrong!');
   });
}
module.exports = route;

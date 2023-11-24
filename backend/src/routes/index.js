const userRouter = require('./user');
const orderRouter = require('./order');
const productRouter = require('./product');

function route(app) {
   app.use('/user', userRouter);
   app.use('/order', orderRouter);
   app.use('/product', productRouter);
}
module.exports = route;

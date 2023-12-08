const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   userId: String,
   total: Number,
   discountedTotal: Number,
   totalProducts: Number,
   totalQuantity: Number,
});

module.exports = mongoose.model('Order', orderSchema);

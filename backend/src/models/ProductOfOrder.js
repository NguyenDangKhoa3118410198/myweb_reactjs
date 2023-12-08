const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productOfOrderSchema = new Schema({
   id: Number,
   title: String,
   price: Number,
   quantity: Number,
   total: Number,
   discountPercentage: Number,
   discountedPrice: Number,
   thumbnail: String,
   orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
});

module.exports = mongoose.model('ProductOfOrder', productOfOrderSchema);

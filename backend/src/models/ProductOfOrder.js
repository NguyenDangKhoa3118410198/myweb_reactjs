const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productOfOrderSchema = new Schema({
   id: { type: Number, required: true },
   title: { type: String, required: true },
   price: { type: Number, required: true, min: 0 },
   quantity: { type: Number, required: true, min: 1 },
   total: { type: Number, required: true, min: 0 },
   discountPercentage: { type: Number, required: true, min: 0, max: 100 },
   discountedPrice: { type: Number, required: true, min: 0 },
   thumbnail: { type: String, required: true },
   orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
});

module.exports = mongoose.model('ProductOfOrder', productOfOrderSchema);

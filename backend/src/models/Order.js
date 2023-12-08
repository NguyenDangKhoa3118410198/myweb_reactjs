const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
   {
      userId: String,
      total: { type: Number, required: true, min: 0 },
      discountedTotal: { type: Number, required: true, min: 0 },
      totalProducts: { type: Number, required: true, min: 0 },
      totalQuantity: { type: Number, required: true, min: 0 },
      status: {
         type: String,
         enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
         default: 'Pending',
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);

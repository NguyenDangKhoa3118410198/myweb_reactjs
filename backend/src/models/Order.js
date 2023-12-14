const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
   {
      customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
      total: { type: Number, required: true, min: 0 },
      discountedTotal: { type: Number, required: true, min: 0 },
      totalProducts: { type: Number, required: true, min: 0 },
      totalQuantity: { type: Number, required: true, min: 0 },
      status: {
         type: String,
         enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
         default: 'Pending',
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);

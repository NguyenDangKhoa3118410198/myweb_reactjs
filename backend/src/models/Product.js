const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
   id: { type: Number, required: true },
   all_time_quantity_sold: { type: Number },
   description: { type: String },
   discount: { type: Number },
   discount_rate: { type: Number },
   favourite_count: { type: Number },
   image_url: { type: String },
   list_price: { type: Number },
   name: { type: String },
   original_price: { type: Number },
   price: { type: Number },
   rating_average: { type: Number },
   review_count: { type: Number },
   short_description: { type: String },
   sku: { type: String },
   url_key: { type: String },
   url_path: { type: String },
   category_id: { type: Number },
   brand_id: { type: Number },
});

module.exports = mongoose.model('Product', productSchema);

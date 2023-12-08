const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
   user: { type: Schema.Types.ObjectId, ref: 'User' },
   address: { type: String, required: true },
   phone: { type: String, required: true },
   dateOfBirth: Date,
   gender: { type: String, enum: ['Male', 'Female', 'Other'] },
   avatar: String,
});

module.exports = mongoose.model('Customer', customerSchema);

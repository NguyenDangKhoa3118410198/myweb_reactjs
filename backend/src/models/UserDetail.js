const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDetailSchema = new Schema({
   user: { type: Schema.Types.ObjectId, ref: 'User' },
   address: { type: String, required: true },
   phone: { type: String, required: true },
   dateOfBirth: Date,
   gender: { type: String, enum: ['Male', 'Female', 'Other'] },
   avatar: String,
});

module.exports = mongoose.model('UserDetail', userDetailSchema);

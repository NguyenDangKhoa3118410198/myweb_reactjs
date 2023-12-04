const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   name: { type: String, maxLength: 255, required: true },
   username: { type: String, maxLength: 255, required: true },
   email: { type: String, maxLength: 255, required: true },
   password: { type: String, maxLength: 255, required: true },
   role: { type: String, default: 'user' },
   createAt: { type: Date, default: Date.now },
   updateAt: { type: Date, default: Date.now },
});

userSchema.pre('save', function (next) {
   this.updateAt = new Date();
   next();
});

module.exports = mongoose.model('User', userSchema);

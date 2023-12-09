const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
   {
      name: { type: String, maxLength: 255, required: true },
      username: { type: String, maxLength: 255, required: true },
      email: { type: String, maxLength: 255, required: true },
      password: { type: String, maxLength: 255, required: true },
      role: { type: String, default: 'user' },
      isActive: { type: Boolean, default: true },
   },
   { timestamps: true }
);

userSchema.pre('save', function (next) {
   this.updatedAt = new Date();
   next();
});

module.exports = mongoose.model('User', userSchema);

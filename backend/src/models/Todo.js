const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
   task: { type: String, required: true },
   createAt: { type: Date, default: Date.now },
   updateAt: { type: Date, default: Date.now },
   completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Todo', todoSchema);

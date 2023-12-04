const mongoose = require('mongoose');

const connectToDatabase = async () => {
   try {
      await mongoose.connect('mongodb://localhost:27017/my_web_reactjs');
      console.log('Connected to MongoDB');
   } catch (error) {
      console.error('MongoDB connection error: ', error);
   }
};

module.exports = { connectToDatabase };

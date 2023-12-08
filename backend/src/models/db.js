const mongoose = require('mongoose');

const connectToDatabase = async () => {
   try {
      await mongoose.connect(process.env.URL_MONGODB);
      console.log('Connected to MongoDB');
   } catch (error) {
      console.error('MongoDB connection error: ', error);
   }
};

module.exports = { connectToDatabase };

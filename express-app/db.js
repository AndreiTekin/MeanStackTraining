const mongoose = require('mongoose');

const connectDB = async () => {
try {
  await mongoose.connect('mongodb://127.0.0.1:27017/my_database', {
    });
  console.log('MongoDB connected successfully');
} catch (err) {
  console.error('MongoDB connection error:', err.message);
  process.exit(1); 
  }
};

module.exports = connectDB;

const mongoose = require('mongoose');
require('dotenv').config(); 

// change db connection based on NODE_ENV
const db_URI = (process.env.NODE_ENV === 'test') ? process.env.MONGO_TEST_URI : process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(db_URI);
    console.log(`MongoDB connection: ${connect.connection.host}`);
  }
  catch (error) {
    console.log(error);

  }
};

module.exports = connectDB;
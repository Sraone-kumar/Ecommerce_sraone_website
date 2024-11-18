require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection to DB success");
  } catch (error) {
    console.error("Connection Failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;

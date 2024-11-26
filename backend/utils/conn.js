const mongoose = require("mongoose");
// require("dotenv").config();
// const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.f8mb5gx.mongodb.net/hostel",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error("MongoDB connection FAIL");
    process.exit(1);
  }
};

module.exports = connectDB;

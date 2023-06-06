const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      usenewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection established");
    })
    .catch((err) => {
      console.log(err.message);
      console.log("Error connecting to database");
      process.exit(1);
    });
};

module.exports = connectDB;

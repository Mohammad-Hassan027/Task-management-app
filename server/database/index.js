const mongoose = require("mongoose");

function ConnectDb() {
  try {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("Database connected successfully");
    });
  } catch (error) {
    console.log("Error in conneting database", error);
  }
}

module.exports = ConnectDb;

const mongoose = require("mongoose");

const conectDB = async () => {
  try {
    const con = await mongoose.connect(
      "mongodb+srv://admin:admin123@cluster0.7xdblpd.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(`MongoDB is connected: ${con.connection.host}`);
  } catch (err) {
    console.log(`Error while connection to database: ${err}`);
    process.exit(1);
  }
};

module.exports = conectDB;

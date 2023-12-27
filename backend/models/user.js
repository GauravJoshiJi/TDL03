const mongoose = require("mongoose");

const userScript = new mongoose.Script({
  email: {
    type: String,
    require: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
});

const userModel = mongoose.model("User", userScript);
module.exports = userModel;

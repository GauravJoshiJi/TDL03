const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  list: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
});

const listModel = mongoose.model("List", listSchema);
module.exports = listModel;

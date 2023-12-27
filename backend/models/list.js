const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    list: {
      type: String,
      require: true,
    },
    body: {
      type: String,
      require: true,
    },
    user: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const listModel = mongoose.model("List", listSchema);
module.exports = listModel;

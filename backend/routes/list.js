const express = require("express");
const router = express.Router();

const User = require("../models/user");
const List = require("../models/list");

//Creating new task
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = new List({ title, body, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//Updating task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = await List.findByIdAndUpdate(req.params.id, { title, body });
      list
        .save()
        .then(() =>
          res.status(200).json({ message: "Task updated Successfull!" })
        );
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete task
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOneAndUpdate(
      { email },
      { $pull: { list: req.params.id } }
    );
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({ message: "Task Deleted" });
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET data
router.get("/getTasks/:id", async (req, res) => {
  const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
  res.status(200).json({ list: list });
});

module.exports = router;

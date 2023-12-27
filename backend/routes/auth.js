const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/user");
//SIGN-UP
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashPassword = bcrypt.hashSync(password);
    //creating new user
    const user = new User({ email, username, password: hashPassword });
    await user.save().then(() => {
      res.status(400).json({ user: user });
    });
  } catch (err) {
    res.status(500).json({ message: `Error on sending data. ${err}` });
  }
});

//SIGN-IN
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      req.status(200).json({ message: `Plese signin first` });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      req.status(200).json({ message: `Password is incorrect` });
    }
    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (err) {
    res.status(500).json({ message: `User already exist: ${err}` });
  }
});

module.exports = router;

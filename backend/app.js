const express = require("express");
const app = express();
const port = 8000;

const mongoDB = require("./connection/conn");

mongoDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

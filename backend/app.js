const express = require("express");
const app = express();
const port = 8000;
const auth = require("./routes/auth");
const mongoDB = require("./connection/conn");
const list = require("./routes/list");
mongoDB();
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(express.json());

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

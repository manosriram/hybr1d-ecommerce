const express = require("express");
const app = express();
const port = process.env.PORT || 5002;
const mongoose = require("mongoose");
const isauth = require("./isauth");

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ecom", { useNewUrlParser: true })
  .then(() => console.log("mongodb connected !"))
  .catch((err) => console.log(err));

app.use("/auth", require("./routes/auth"));
app.use("/api/buyer", isauth, require("./routes/buyer"));
app.use("/api/seller", isauth, require("./routes/seller"));
app.listen(port, () => console.log(`server at ${port}`));

module.exports = app;

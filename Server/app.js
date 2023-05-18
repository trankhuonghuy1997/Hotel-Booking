const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const clientRoute = require("./Routes/client");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(clientRoute);

mongoose
  .connect(
    "mongodb+srv://TranKhuongHuy:123456789%40@cluster0.wtxqxow.mongodb.net/DatabaseHotel?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

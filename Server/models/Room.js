const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  maxPeople: {
    type: Number,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  roomNumbers: {
    type: Array,
    require: true,
  },
});

module.exports = mongoose.model("Rooms", roomSchema);

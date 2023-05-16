const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hoteSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  address: {
    type: Number,
    require: true,
  },
  distance: {
    type: Number,
    require: true,
  },
  photos: {
    type: Boolean,
    require: true,
  },
  photos: {
    type: Boolean,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  photos: {
    type: Array,
    require: true,
  },
  featured: {
    type: Boolean,
    require: true,
  },
  rooms: {
    type: Array,
    require: true,
  },
});

module.exports = mongoose.model("Hotel", hoteSchema);

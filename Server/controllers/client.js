const Rooms = require("../models/Room");
const Hotels = require("../models/Hotel");
const paging = require("../paging/paging");

exports.getAllRoom = (req, res, next) => {
  Rooms.find()
    .then((result) => {
      const dataSend = paging(result, 1, 3);
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(dataSend));
    })
    .catch((err) => console.log(err));
};

exports.getAllHotel = (req, res, next) => {
  Hotels.find()
    .then((result) => {
      const dataSend = paging(result, 1, 3);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(dataSend));
    })
    .catch((err) => console.log(err));
};

exports.getHotelDetail = (req, res, next) => {
  const hotelId = req.params.id;
  Hotels.findOne({ _id: hotelId })
    .then((hotel) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(hotel));
    })
    .catch((err) => console.log(err));
};

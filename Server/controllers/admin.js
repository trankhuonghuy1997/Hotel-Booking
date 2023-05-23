const Rooms = require("../models/Room");
const Hotels = require("../models/Hotel");
const User = require("../models/User");

// Hotel controller
exports.createHotel = (req, res, next) => {
  const name = req.body.name;
  const type = req.body.type;
  const city = req.body.city;
  const address = req.body.address;
  const distance = req.body.distance;
  const photos = req.body.photos;
  const desc = req.body.desc;
  const featured = req.body.featured;
  const rooms = req.body.rooms;
  const title = req.body.title;
  const cheapestPrice = req.body.cheapestPrice;
  const newHotel = new Hotels({
    name,
    type,
    city,
    title,
    address,
    distance,
    cheapestPrice,
    photos,
    desc,
    featured,
    rooms,
  });

  newHotel
    .save()
    .then(() => {
      res.send("Hotel has been create");
    })
    .catch((err) => res.send(err));
};

exports.deleteHotel = (req, res, next) => {
  const hotelId = req.params.id;
  console.log(hotelId);
  Hotels.findByIdAndDelete(hotelId)
    .then(() => {
      res.send("Hotel has been deleted");
    })
    .catch((err) => console.log(err));
};

exports.updateHotel = (req, res, next) => {
  console.log(req.body);
  Hotels.findByIdAndUpdate(req.params.id, { $set: req.body }).then((hotel) => {
    console.log(hotel);
  });
  res.status(200).send("Hotel has been updated");
};

// Room controller

exports.createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Rooms(req.body);
  newRoom
    .save()
    .then(() => {
      Hotels.findById({ _id: hotelId }).then((hotel) => {
        hotel.rooms.push(newRoom._id.toString());
        hotel.save();
      });
    })
    .then(() => {
      res.status(200).json(newRoom);
    })
    .catch((err) => console.log(err));
};

exports.deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  Rooms.findByIdAndDelete(req.params.id)
    .then(() => {
      Hotels.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
    })
    .then(() => {
      res.status(200).json("Room has been deleted.");
    })
    .catch((err) => console.log(err));
};

exports.updateRoom = (req, res, next) => {
  console.log(req.body);
  Rooms.findByIdAndUpdate(req.params.id, { $set: req.body }).then((Room) => {
    console.log(Room);
  });
  res.status(200).send("Room has been updated");
};

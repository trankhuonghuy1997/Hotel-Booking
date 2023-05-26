const Rooms = require("../models/Room");
const Hotels = require("../models/Hotel");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const bcrypt = require("bcrypt");

// Hotel controller
exports.getAllHotel = (req, res, next) => {
  Hotels.find()
    .then((result) => {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
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

exports.getAllRoom = (req, res, next) => {
  Rooms.find()
    .then((result) => {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
};

exports.getRoomDetail = (req, res, next) => {
  const roomId = req.params.id;
  Rooms.find({ _id: roomId })
    .then((result) => {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
};

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
  const id = req.params.id;

  Rooms.findByIdAndDelete(id)
    .then((room) => {
      console.log("Room", room);
      Hotels.findOneAndUpdate(
        { rooms: { $elemMatch: { $eq: id } } },
        { $pull: { rooms: id } }
      ).then((hotel) => console.log("Hotel", hotel));
    })
    .then(() => {
      res.status(200).json({ message: "Room has been deleted." });
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

// User controller

exports.getAllUser = (req, res, next) => {
  User.find()
    .then((result) => {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
};

// Transaction controller
exports.getAllTransaction = (req, res, next) => {
  Transaction.find()
    .then((result) => {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
};

// login
exports.login = (req, res, next) => {
  const userLogin = req.body;
  User.findOne({ email: userLogin.email }).then((user) => {
    if (!user) {
      res.status(404).json({ message: "User is not define!", status: 404 });
    } else if (!bcrypt.compareSync(userLogin.password, user.password)) {
      res.status(401).json({ message: "Wrong password", status: 401 });
    } else if (!user.isAdmin) {
      res.status(402).json({ message: "You are not allow", status: 402 });
    } else {
      res.status(200).json({ message: "Login successfull!", status: 200 });
    }
  });
};

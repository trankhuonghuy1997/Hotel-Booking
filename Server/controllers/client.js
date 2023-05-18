const Rooms = require("../models/Room");
const Hotels = require("../models/Hotel");
const User = require("../models/User");
const paging = require("../paging/paging");

exports.getAllRoom = (req, res, next) => {
  Rooms.find()
    .then((result) => {
      const dataSend = paging(result, 1, 4);
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
      const dataSend = paging(result, 1, 4);
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

exports.register = (req, res, next) => {
  const email = req.body.enteredEmail;
  const password = req.body.enteredPassWord;
  const isAdmin = false;
  const newUser = new User({
    email,
    password,
    isAdmin,
  });
  User.findOne({ email: email })
    .then((user) => {
      console.log(user);
      if (user && user.email === email) {
        console.log("Not Ok");
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User exist", status: 404 }));
      } else {
        newUser.save();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newUser));
      }
    })
    .catch((err) => console.log(err));
};

exports.logIn = (req, res, next) => {
  const email = req.body.enteredEmail;
  const password = req.body.enteredPassWord;
  User.findOne({ email: email })
    .then((user) => {
      console.log(user);
      if (user && user.email === email && user.password === password) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Login successfully",
            status: 200,
            _id: user._id,
            email: user.email,
          })
        );
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ status: 404, message: "Something went wrong" })
        );
      }
    })
    .catch((err) => console.log(err));
};

exports.search = (req, res, next) => {
  const city = decodeURIComponent(req.query.city);
  const date = +req.query.date;
  const room = req.query.room;
  console.log(city);

  let searchResult = [];
  Hotels.find({ city: city })
    .then((hotel) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(hotel));
    })
    .catch((err) => console.log(err));
};

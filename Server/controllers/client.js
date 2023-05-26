const Rooms = require("../models/Room");
const Hotels = require("../models/Hotel");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const paging = require("../paging/paging");
const Transaction = require("../models/Transaction");
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

exports.getRoomDetail = (req, res, next) => {
  const roomId = req.params.roomId;
  Rooms.find({ _id: roomId })
    .then((result) => {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
};

exports.getAllHotel = (req, res, next) => {
  const limit = req.query.limit;
  Hotels.find()
    .then((result) => {
      let dataSend = paging(result, 1, result.length);
      if (limit) {
        dataSend = paging(result, 1, limit);
      }
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
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  const isAdmin = false;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const newUser = new User({
    userName: userName,
    password: hash,
    email: email,
    isAdmin: isAdmin,
  });
  newUser
    .save()
    .then(() => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "User has been create",
          status: 200,
        })
      );
    })
    .catch((err) => {
      res.json({
        status: 404,
        message: "Somthing went wrong! - Your email is already exist",
      });
    });
};

exports.logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (user && bcrypt.compare(user.password, password)) {
        const { password, isAdmin, ...other } = user._doc;
        const token = jwt.sign(
          { email: user.email, isAdmin: user.isAdmin },
          "shhhhh"
        );
        res
          .cookie("acces_token", token, { httpOnly: true })
          .status(200)
          .json({ ...other });
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

  console.log(city);

  Hotels.find({ city: city })
    .then((hotel) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(hotel));
    })
    .catch((err) => console.log(err));
};

exports.postTransaction = (req, res, next) => {
  const newTransaction = req.body;
  const transaction = new Transaction(newTransaction);
  transaction.save();
  console.log(transaction);
  res.json(newTransaction);
};

exports.getTransaction = (req, res, next) => {
  const userId = req.params.userId;
  Transaction.find({ userId: userId }).then((results) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results));
  });
};

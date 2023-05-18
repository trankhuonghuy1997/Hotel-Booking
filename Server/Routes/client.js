const clientController = require("../controllers/client");

const express = require("express");

const clientRoute = express.Router();

clientRoute.get("/rooms", clientController.getAllRoom);

clientRoute.get("/hotels", clientController.getAllHotel);

clientRoute.get("/hotels/:id", clientController.getHotelDetail);

clientRoute.post("/signup", clientController.register);

clientRoute.post("/login", clientController.logIn);

clientRoute.get("/search", clientController.search);

module.exports = clientRoute;

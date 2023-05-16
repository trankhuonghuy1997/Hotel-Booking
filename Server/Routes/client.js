const clientController = require("../controllers/client");

const express = require("express");

const clientRoute = express.Router();

clientRoute.get("/rooms", clientController.getAllRoom);

clientRoute.get("/hotels", clientController.getAllHotel);

clientRoute.get("/hotels/:id", clientController.getHotelDetail);

module.exports = clientRoute;

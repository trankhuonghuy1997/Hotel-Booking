const clientController = require("../controllers/client");

const express = require("express");

const clientRoute = express.Router();

clientRoute.get("/rooms", clientController.getAllRoom);

clientRoute.get("/rooms/:roomId", clientController.getRoomDetail);

clientRoute.get("/hotels", clientController.getAllHotel);

clientRoute.get("/hotels/:id", clientController.getHotelDetail);

clientRoute.post("/signup", clientController.register);

clientRoute.post("/login", clientController.logIn);

clientRoute.get("/search", clientController.search);

clientRoute.post("/transaction", clientController.postTransaction);

clientRoute.get("/transaction/:userId", clientController.getTransaction);

module.exports = clientRoute;

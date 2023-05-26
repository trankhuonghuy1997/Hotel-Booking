const adminController = require("../controllers/admin");

const express = require("express");

const adminRoute = express.Router();
// Hotel route
adminRoute.get("/hotels/:id", adminController.getHotelDetail);

adminRoute.get("/hotels", adminController.getAllHotel);

adminRoute.post("/hotels/create-hotel", adminController.createHotel);

adminRoute.delete("/hotels/delete-hotel/:id", adminController.deleteHotel);

adminRoute.post("/hotels/update-hotel/:id", adminController.updateHotel);

// Room route

adminRoute.get("/rooms", adminController.getAllRoom);

adminRoute.get("/rooms/:id", adminController.getRoomDetail);

adminRoute.post("/rooms/create-room/:hotelId", adminController.createRoom);

adminRoute.delete("/rooms/delete-room/:id", adminController.deleteRoom);

adminRoute.post("/rooms/update-room/:id", adminController.updateRoom);

// user route
adminRoute.get("/users", adminController.getAllUser);

// Transaction route
adminRoute.get("/transactions", adminController.getAllTransaction);

// Login
adminRoute.post("/login", adminController.login);

module.exports = adminRoute;

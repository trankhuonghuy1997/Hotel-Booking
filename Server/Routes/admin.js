const adminController = require("../controllers/admin");

const express = require("express");

const adminRoute = express.Router();
// Hotel route
adminRoute.post("/hotels/create-hotel", adminController.createHotel);

adminRoute.delete("/hotels/delete-hotel/:id", adminController.deleteHotel);

adminRoute.post("/hotels/update-hotel/:id", adminController.updateHotel);

// Room route

adminRoute.post("/rooms/create-room/:hotelId", adminController.createRoom);

adminRoute.delete(
  "/rooms/delete-room/:hotelId/:id",
  adminController.deleteRoom
);

adminRoute.post("/rooms/update-room/:id", adminController.updateRoom);

module.exports = adminRoute;

const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../controllers/user.controller");
const { createBooking, getUserBookings } = require("../controllers/booking.controller");

router.post("", authMiddleware, createBooking);

router.get("/manage", authMiddleware, getUserBookings);

module.exports = router;

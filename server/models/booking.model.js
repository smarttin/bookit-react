const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  startAt: { type: Date, required: "Starting date is required" },
  endAt: { type: Date, required: "Ending date is required" },
  totalPrice: Number,
  days: Number,
  guests: Number,
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rental: { type: mongoose.Schema.Types.ObjectId, ref: "Rental" }
});

module.exports = mongoose.model("Booking", bookingSchema);

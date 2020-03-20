const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    min: [4, "Too short, min is 4 characters"],
    max: [32, "Too long, max is 32 characters"]
  },
  email: {
    type: String,
    required: "Email is required",
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    min: [4, "Too short, min is 4 characters"],
    max: [32, "Too long, max is 32 characters"]
  },
  password: {
    type: String,
    required: "Password is required",
    min: [4, "Too short, min is 4 characters"],
    max: [32, "Too long, max is 32 characters"]
  },
  rentals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rental' }],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});

userSchema.methods.hasSamePassword = function(requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password);
};

userSchema.pre("save", function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);

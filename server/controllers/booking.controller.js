const Rental = require('../models/rental.model');
const User = require('../models/user.model');
const Booking = require('../models/booking.model');
const moment = require('moment');
const { normalizeErrors } = require('../helpers/mongoose');


const createBooking = (req, res) => {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const user = res.locals.user;
  const booking = new Booking({startAt, endAt, totalPrice, guests, days});

  Rental.findById(rental._id)
        .populate('bookings')
        .populate('user')
        .exec((err, foundRental) => {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (foundRental.user.id === user.id) {
      return res.status(422).send({errors: [{title: "Invalid user", detail: "Cannot create booking on your rental"}]});
    }

    // check here for valid booking
    if (!isValidBooking(booking, foundRental)) {
      return res.status(422).send({errors: [{title: "Invalid Booking", detail: "Choosen dates already taken"}]});
    }

    // update rental with booking and save, update and save booking, update user
    booking.user = user;
    booking.rental = foundRental;
    foundRental.bookings.push(booking);

    booking.save((err) => {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      foundRental.save();
      User.update({_id: user.id}, {$push: {bookings: booking}});

      return res.json({ startAt: booking.startAt, endAt: booking.endAt });
    });
  });
};

function isValidBooking(proposedBooking, rental) {
  let isValid = true;

  if (rental.bookings && rental.bookings.length > 0) {

    isValid = rental.bookings.every((booking) => {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);

      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);

      return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualStart && proposedEnd < actualEnd));

      // if ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualStart && proposedEnd < actualEnd)) {
      //   return true;
      // } else {
      //   return false;
      // }
    });
  }
  return isValid;
}

const getUserBookings = (req, res) => {
  const user = res.locals.user;

  Booking.where({user: user})
    .populate('rental')
    .exec((err, foundBookings) => {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    return res.json(foundBookings);
  });
}

module.exports = {
  createBooking,
  getUserBookings
}

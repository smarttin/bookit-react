const Rental = require("../models/rental.model");
const User = require('../models/user.model');
const { normalizeErrors } = require('../helpers/mongoose');

const getAllRentals = (req, res) => {
  const city = req.query.city;
  const query = city ? {city: city.toLowerCase()} : {}

  Rental.find(query)
  .select("-bookings")
  .exec((err, foundRentals) => {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (city && foundRentals.length === 0) {
      return res.status(404).send({
        errors: [{ title: "No Rentals Found!", detail: `There are no rentals for ${city} city` }]
      });
    }

    return res.json(foundRentals);
  });
}

const getRental = (req, res) => {
  const rentalId = req.params.id;

  Rental.findById(rentalId)
    .populate("user", "username -_id")
    .populate("bookings", "startAt endAt -_id")
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422)
          .send({
            errors: [{ title: "Rental Error", detail: "Could not find the Rental" }]
          });
      }
      return res.json(foundRental);
    });
};

const createRental = (req, res) => {
  const { title, city, street,category, image, bedrooms, shared, description, dailyRate } = req.body;
  const user = res.locals.user;

  const rental = new Rental({title, city, street,category, image, bedrooms, shared, description, dailyRate})
  rental.user = user;
  Rental.create(rental, (err, newRental) => {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    User.updateOne({_id: user.id}, {$push: {rentals: newRental}}, () => {});

    return res.json(newRental);
  });
}

const deleteRental = (req, res) => {
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate('user', '_id')
    .populate({
      path: 'bookings',
      select: 'startAt',
      match: { startAt: { $gt: new Date()}}
    })
    .exec((err, foundRental) => {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (user.id !== foundRental.user.id) {
      return res.status(422)
        .send({
          errors: [{ title: "Invalid User", detail: "You don't own this rental!" }]
        });
    }

    if (foundRental.bookings.length > 0) {
      return res.status(422)
        .send({
          errors: [{ title: "Active Bookings", detail: "Can't delete rental with active booking" }]
        });
    }

    foundRental.remove((err) => {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      return res.json({'status': 'deleted'});
    });
  });
}

const getUserRentals = (req, res) => {
  const user = res.locals.user;

  Rental.where({user: user})
    .populate('bookings')
    .exec((err, foundRental) => {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    return res.json(foundRental);
  });
}

module.exports = {
  getAllRentals,
  getRental,
  createRental,
  deleteRental,
  getUserRentals
}

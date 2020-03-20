const Rental = require('./models/rental.model');
const User = require('./models/user.model');
const Booking = require('./models/booking.model');
const FakeDbData = require('./data.json');

class FakeDb {
  constructor() {
    this.rentals = FakeDbData.rentals;
    this.users = FakeDbData.users;
  }

  async cleanDb() {
    await User.deleteMany();
    await Rental.deleteMany();
    await Booking.deleteMany();
  }

  pushDataToDb() {
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);

    this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);
      newRental.user = user;

      user.rentals.push(newRental);
      newRental.save();
    });

    user.save();
    user2.save();
  }

  async seedDb() {
    await this.cleanDb();
    this.pushDataToDb();
  }
}

module.exports = FakeDb;

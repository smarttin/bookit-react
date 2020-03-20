const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require('body-parser');
const config = require("./config");
const rentalRoutes = require('./routes/rentals.route');
const userRoutes = require('./routes/users.route');
const bookingRoutes = require('./routes/booking.route');
const FakeDb = require("./fake-db"); 

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    if (process.env.NODE_ENV !== 'production') {
      const fakeDb = new FakeDb();
      // fakeDb.seedDb();
    }
    console.log("Connected to database!");
  })
  .catch(err => {
    console.log("Connection failed!", err);
  });

const app = express();
app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist/booker-ng');
  app.use(express.static(appPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });  
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

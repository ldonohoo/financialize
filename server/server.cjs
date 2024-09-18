const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');
const { mongoClient } = require('../server/middleware/mongo.cjs');

require('dotenv').config();

const PORT = process.env.PORT || 5001;


// Middleware to connect to MongoDB
app.use(async (req, res, next) => {
  try {
    if (!mongoClient.isConnected) {
      await mongoClient.connect();
    }
    req.db = mongoClient.db('sample_analytics'); // Select the sample database from mongoEDU
    next();
  } catch (err) {
    res.status(500).json({ message: "Error connecting to database", error: err });
  }
});
// Middleware Includes
// const sessionMiddleware = require('./modules/session-middleware');
// const passport = require('./strategies/user.strategy');

// Route Includes
// const userRouter = require('./routes/user.router');
// const listsRouter = require('./routes/lists.router');
// const listItemsRouter = require('./routes/list-items.router');
// const locationsRouter = require('./routes/locations.router');
// const weatherRouter = require('./routes/weather.router');
// const timeOfDayRouter = require('./routes/timeofday.router');
const customersRouter = require('./routes/customers.router.cjs');
// Express Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
// app.use(sessionMiddleware);

// Start Passport Sessions
// app.use(passport.initialize());
// app.use(passport.session());

// Routes
// app.use('/api/user', userRouter);
// app.use('/api/lists', listsRouter);
// app.use('/api/list_items', listItemsRouter);
// app.use('/api/locations', locationsRouter);
// app.use('/api/weather', weatherRouter);
// app.use('/api/time_of_days', timeOfDayRouter);
app.use('/customers', customersRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});





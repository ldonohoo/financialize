const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 5001;
const MONGO_PASSWORD= process.env.MONGO_PASSWORD;
const MONGO_USER=process.env.MONGO_USER;
const cluster = `testdevcluster0.r1bwgw6`;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${cluster}.mongodb.net/?retryWrites=true&w=majority&appName=TestDevCluster0`;
const client = new MongoClient(uri);

// Middleware to connect to MongoDB
app.use(async (req, res, next) => {
  try {
    if (!client.isConnected) {
      await client.connect();
    }
    req.db = client.db('test'); // Select the 'test' database
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

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});




// // Route to get all users
// app.get('/users', async (req, res) => {
//   try {
//     const users = await req.db.collection('users').find().toArray();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


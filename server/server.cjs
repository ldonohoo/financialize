
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');

const PORT = process.env.PORT || 5001;

console.log('hello')
// express middleware setup
app.use(cors()); // cross origin allow
app.use(express.json()); // parses incoming requests w/JSON payloads

// route includes
const customersRouter = require('./routes/customers.router.cjs');


// mongo middleware setup
const client = new MongoClient("mongodb+srv://lisa:9mCcOCqmG1sSdtP4@myatlasclusteredu.nj66p.mongodb.net/sample_analytics?retryWrites=true&w=majority&appName=financialize");
app.use(async (req, res, next) => {
  try {
    if (!client.isConnected) {
      await client.connect();
    }
    req.db = client.db('sample_analytics'); // Select the 'test' database
    next();
  } catch (err) {
    res.status(500).json({ message: "Error connecting to database", error: err });
  }
});

// routes
app.use('/customers', customersRouter);

// start server & listen at port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

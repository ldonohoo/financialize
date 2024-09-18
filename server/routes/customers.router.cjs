const express = require('express');

const app = express();

// Route to get all users
app.get('/customers', async (req, res) => {
    try {
        console.log('hi!')
      const customers = await req.db.collection('customers').find().toArray();
      console.log(customers);
      res.json(customers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
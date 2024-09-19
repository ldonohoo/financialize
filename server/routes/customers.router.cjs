const express = require('express');
const router = express.Router();

console.log('in customer router')
// Route to get all customers
router.get('/get_all', async (req, res) => {
  console.log('here again')
  try {
    const customers = await req.db.collection('customers').find().toArray();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
  
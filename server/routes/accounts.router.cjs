// Route to get all users
app.get('/users', async (req, res) => {
    try {
      const users = await req.db.collection('users').find().toArray();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { name, surname, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newUser = new User({ name, surname, email });
    await newUser.save();
    
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
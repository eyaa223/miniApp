require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// استبدل هذا ب MongoDB URI متاعك
const MONGO_URI = "mongodb+srv://ourhenieya:ILv7TCgPKJ2cuN7T@cluster0.favp73j.mongodb.net/miniappDB?retryWrites=true&w=majority&appName=Cluster0";

// نموذج بيانات المستخدم
const userSchema = new mongoose.Schema({
  name: String,
  subname: String,
  email: String,
});
const User = mongoose.model('User', userSchema);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error(err));

// API route لحفظ المستخدم
app.post('/api/users', async (req, res) => {
  try {
    const { name, subname, email } = req.body;
    const newUser = new User({ name, subname, email });
    await newUser.save();
    res.status(201).json({ message: "User saved successfully" });
  } catch (err) {
    console.error(" MongoDB Save Error:", err);
    res.status(500).json({ error: "Failed to save user" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes');
const app = express();
require('dotenv').config(); // Load environment variables from .env file


app.use(cors());
app.use(express.json());

console.log('MONGODB_URL:', process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));


app.use("/api/user", userRoutes);

app.listen(5000, () => console.log('Server Running'));

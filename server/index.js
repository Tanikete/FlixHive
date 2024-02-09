const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://awushu6:tUekkXW7flLgZVbI@cluster0.tmyb1dy.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use("/api/user", userRoutes);

app.listen(5000, () => console.log('Server Running'));

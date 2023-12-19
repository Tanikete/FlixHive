const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/FlixHive')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use("/", userRoutes);

app.listen(5000, () => console.log('Server Running'));

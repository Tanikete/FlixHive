const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://awushu6:3XR2zB1vEvLHuSLD@yu.lkumhgt.mongodb.net/')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use("/", userRoutes);

app.listen(5000, () => console.log('Server Running'));

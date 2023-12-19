const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use("/api/user", userRoutes);

app.listen(5000, () => console.log('Server Running'));

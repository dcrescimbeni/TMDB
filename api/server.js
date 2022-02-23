require('dotenv').config();
const express = require('express');
const volleyball = require('volleyball');
const db = require('./models/_db');
const models = require('./models/index');

const app = express();

app.use(volleyball);
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.log('Error');
  console.log(err);
  res.status(500).send(err.message);
});

db.sync({ force: true }).then(() => {
  app.listen(3001, () => {
    console.log(`Server up on port`);
  });
});

require('dotenv').config();
const express = require('express');
const volleyball = require('volleyball');
const db = require('./models/_db');
// eslint-disable-next-line no-unused-vars
const models = require('./models/index');
const router = require('./routes');

const app = express();

app.use(volleyball);
app.use(express.json());

app.use('/api', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log('Error');
  console.log(err);
  res.status(500).send(err.message);
});

db.sync({ force: true }).then(() => {
  app.listen(3001, () => {
    console.log(`Server up on port 3001`);
  });
});

module.exports = app;

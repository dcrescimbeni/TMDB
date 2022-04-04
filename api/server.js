require('dotenv').config();
const express = require('express');
const volleyball = require('volleyball');
const session = require('express-session');
const passport = require('passport');
const db = require('./models/_db');
require('./models/index');
const router = require('./routes');
require('./config/auth'); // Passport configuration

const app = express();

app.use(volleyball);
app.use(express.json());

// Passport configuration middleware
app.use(
  session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/test', (req, res, next) => {
  res.send('working');
});

app.use('/api', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log('Error');
  console.log(err);
  res.status(500).send(err.message);
});

db.sync({ force: false }).then(() => {
  if (!module.parent) {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server up on port 3001`);
    });
  }
});

module.exports = app;

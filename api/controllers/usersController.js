const { User } = require('../models');

exports.usersCreateNew = (req, res, next) => {
  const { username, password, email } = req.body;

  User.create({ username, password, email })
    .then((createdUser) => {
      res.status(201).send(createdUser);
    })
    .catch((err) => next(err));
};

exports.usersLogin = (req, res, next) => {
  res.send('login page');
};

exports.usersOwnProfile = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.send('user profile: authenticated');
  } else {
    res.send('user profile: NOT authenticated');
  }
};

exports.usersFavList = (req, res, next) => {
  res.send('users fav GET');
};
exports.usersFavPost = (req, res, next) => {
  res.send('users fav POST');
};
exports.usersFavDelete = (req, res, next) => {
  res.send('users fav DELETE');
};

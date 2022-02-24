const { User } = require('../models');

exports.usersCreateNew = (req, res, next) => {
  const { username, password, email } = req.body;

  User.create({ username, password, email })
    .then((createdUser) => {
      res.status(201).send(createdUser);
    })
    .catch((err) => next(err));
};

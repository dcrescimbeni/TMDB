const { User, Favorite } = require('../models');
const { Op } = require('sequelize');
const axios = require('axios');

exports.usersCreateNew = (req, res, next) => {
  const { username, password, email } = req.body;

  User.create({ username, password, email })
    .then((createdUser) => {
      res.status(201).send(createdUser);
    })
    .catch((err) => next(err));
};

exports.usersSearch = (req, res, next) => {
  const userSearch = req.query.query;
  console.log(userSearch);
  User.findAll({ where: { username: { [Op.like]: `%${userSearch}%` } } }).then(
    (result) => {
      res.send(result);
    }
  );
};

exports.usersLogin = (req, res, next) => {
  res.send('login page');
};

exports.usersProfile = (req, res, next) => {
  let username = req.params.username.toLowerCase();
  req.isAuthenticated();

  User.findOne({ where: { username }, include: Favorite })
    .then((user) => user.dataValues)
    .then((userDetails) => {
      let isOwner = false;

      if (req.user && req.user.dataValues.username === userDetails.username) {
        isOwner = true;
      }

      let userInfo = {
        username: userDetails.username,
        isOwner,
      };

      res.send(userInfo);
    });
};

exports.usersFavList = (req, res, next) => {
  let username = req.params.username.toLowerCase();

  User.findOne({ where: { username }, include: Favorite })
    .then((response) => response.dataValues.favorites)
    .then((favorites) => {
      let populatedFavorites = favorites.map((item) => {
        let url = `https://api.themoviedb.org/3/${item.type}/${item.mediaId}?api_key=${process.env.TMDB_API}`;
        return axios
          .get(url)
          .then((res) => res.data)
          .then((data) => {
            item.dataValues.tmdbDetails = data;
            return item;
          });
      });
      return populatedFavorites;
    })
    .then((favorites) => {
      return Promise.all(favorites);
    })
    .then((allPopulatedFavorites) => {
      res.json(allPopulatedFavorites);
    })
    .catch((err) => next(err));
};

exports.usersFavPost = (req, res, next) => {
  const { mediaId, type } = req.body;
  const userId = req.user.dataValues.id;

  Favorite.create({ userId, mediaId, type })
    .then((addedFavorite) => {
      res.status(201).send(addedFavorite);
    })
    .catch((err) => next(err));
};

exports.usersFavDelete = (req, res, next) => {
  const { mediaId, type } = req.body;
  const userId = req.user.dataValues.id;
  Favorite.destroy({ where: { mediaId, userId, type } })
    .then((deletedMovie) => {
      res.send('Movie deleted');
    })
    .catch((err) => next(err));
};

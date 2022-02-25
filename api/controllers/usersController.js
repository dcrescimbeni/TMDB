const { User, Favorite } = require('../models');
const axios = require('axios');

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
  const { username } = req.params;

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

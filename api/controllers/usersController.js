const { User, Favorite } = require('../models');
const { Op } = require('sequelize');
const axios = require('axios');

exports.usersCreateNew = (req, res, next) => {
  const { username, password, email } = req.body;

  User.create({ username, password, email })
    .then((createdUser) => {
      res.status(201).send(createdUser);
    })
    .catch((err) => res.sendStatus(409));
};

exports.usersCheckIfUserExists = (req, res, next) => {
  const username = req.query.q;
  console.log(username);

  User.findOne({ where: { username } }).then((user) => {
    if (!user) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
};

exports.usersSearch = (req, res, next) => {
  const userSearch = req.query.query.toLowerCase();
  console.log(userSearch);
  User.findAll({
    where: { username: { [Op.like]: `%${userSearch}%` } },
    attributes: { exclude: ['password', 'email', 'createdAt', 'updatedAt'] },
  }).then((result) => {
    res.send(result);
  });
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
            item.dataValues.tmdbDetails.media_type = item.type;
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

exports.usersFavCheck = (req, res, next) => {
  let username = req.params.username.toLowerCase();
  let mediaId = parseInt(req.query.mediaId);
  let type = req.query.type;

  User.findOne({ where: { username }, include: Favorite })
    .then((response) => response.dataValues.favorites)
    .then((favorites) => {
      let favoriteExist = false;

      favorites.forEach((favorite) => {
        if (favorite.mediaId === mediaId && favorite.type === type) {
          favoriteExist = true;
        }
      });
      res.send(favoriteExist);
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
  const { mediaId, type } = req.query;
  const userId = req.user.dataValues.id;
  Favorite.destroy({ where: { mediaId, userId, type } })
    .then((deletedMovie) => {
      res.send('Movie deleted');
    })
    .catch((err) => next(err));
};

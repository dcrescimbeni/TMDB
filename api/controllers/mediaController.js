const axios = require('axios');

exports.mediaSearchGet = (req, res, next) => {
  let { query, page } = req.query;

  if (!page) {
    page = 1;
  }

  axios
    .get(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API}&query=${query}&page=${page}`
    )
    .then((response) => response.data)
    .then((searchResult) => {
      res.status(200).send(searchResult.results);
    });
};

exports.mediaGetSingle = (req, res, next) => {
  let { id } = req.params;
  let { type } = req.query;

  axios
    .get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.TMDB_API}`
    )
    .then((response) => response.data)
    .then((foundElement) => {
      res.send(foundElement);
    })
    .catch((err) => {
      next(err);
    });
};

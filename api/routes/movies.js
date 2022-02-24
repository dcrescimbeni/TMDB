const express = require('express');
const moviesRouter = express.Router();
const axios = require('axios');

moviesRouter.get('/search', (req, res, next) => {
  let { query, page } = req.query;

  if (!page) {
    page = 1;
  }
  axios
    .get(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API}&query=${query}&page=${page}`
    )
    .then((res) => res.data)
    .then((searchResult) => {
      res.status(200).send(searchResult.results);
    });
});

module.exports = moviesRouter;

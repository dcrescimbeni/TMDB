const express = require('express');
const moviesRouter = express.Router();
const axios = require('axios');

// https://api.themoviedb.org/3/search/multi?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

moviesRouter.get('/search', (req, res, next) => {
  const { query } = req.query;
  axios
    .get(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API}&query=${query}`
    )
    .then((res) => res.data)
    .then((searchResult) => {
      res.status(200).send(searchResult);
    });
});

module.exports = moviesRouter;

const axios = require('axios');

exports.mediaSearchGet = async (req, res, next) => {
  let { query, page } = req.query;

  if (!query.length) throw new Error('Must provide a search query');

  if (!page) {
    page = 1;
  }

  let mediaSearchResults = await axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API}&query=${query}&page=${page}`
  );

  console.log(mediaSearchResults);

  res.send(mediaSearchResults.data.results);
  // .then((response) => response.data)
  // .then((searchResult) => {
  //   res.status(200).send(searchResult.results);
  // });
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

const movieSchema = require('../models/movie');

module.exports.getAllMovies = (req, res, next) => {
  movieSchema
    .find({})
    .then((cards) => res.send(cards.reverse()))
    .catch(next);
};

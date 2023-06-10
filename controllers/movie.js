const movieSchema = require('../models/movie');

const {
  NotFoundError,
} = require('../utils/error');

module.exports.getAllMovies = (req, res, next) => {
  movieSchema
    .find({})
    .then((cards) => res.send(cards.reverse()))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  movieSchema
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotFoundError('Invalid data when post card'));
      }

      return next(err);
    });
};

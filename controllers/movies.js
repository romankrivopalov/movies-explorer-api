const movieSchema = require('../models/movie');

const {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
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
      nameRU,
      nameEN,
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotFoundError('Invalid data when post card'));
      }

      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  movieSchema
    .findById(movieId)
    .orFail(new BadRequestError(`Movie Id: ${movieId} is not found`))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError("You can't delete someone else's movie"));
      }

      return movie;
    })
    .then((movie) => movieSchema.deleteOne(movie))
    .then(() => res.status(200).send({ message: 'Movie deleted' }))
    .catch(next);
};

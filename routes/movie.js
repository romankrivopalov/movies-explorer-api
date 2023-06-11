const movieRouter = require('express').Router();

const {
  validateCreateMovie,
} = require('../middlewares/celebrate');

const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

movieRouter.get('/', getAllMovies);
movieRouter.post('/', validateCreateMovie, createMovie);
movieRouter.delete('/:cardId', deleteMovie);

module.exports = movieRouter;

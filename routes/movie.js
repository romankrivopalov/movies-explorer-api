const movieRouter = require('express').Router();

const {
  validateCreateMovie,
} = require('../middlewares/celebrate');

const {
  getAllMovies,
  createMovie,
} = require('../controllers/movie');

movieRouter.get('/', getAllMovies);
movieRouter.post('/', validateCreateMovie, createMovie);

module.exports = movieRouter;

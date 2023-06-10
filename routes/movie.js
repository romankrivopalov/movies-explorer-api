const movieRouter = require('express').Router();

const {
  validateCreateCard,
} = require('../middlewares/celebrate');

const {
  getAllMovies,
  createMovie,
} = require('../controllers/movie');

movieRouter.get('/', getAllMovies);
// movieRouter.post('/', validateCreateCard, createMovie);
movieRouter.post('/', createMovie);

module.exports = movieRouter;

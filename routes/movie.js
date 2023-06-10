const movieRouter = require('express').Router();

const {
  getAllMovies,
} = require('../controllers/movie');

movieRouter.get('/', getAllMovies);

module.exports = movieRouter;

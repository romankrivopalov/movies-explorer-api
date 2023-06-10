const mongoose = require('mongoose');
const { urlPattern } = require('../utils/constants');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    minlength: 1,
    maxlength: 4,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (url) => urlPattern.test(url),
      message: 'Wrong link format',
    },
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (url) => urlPattern.test(url),
      message: 'Wrong link format',
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (url) => urlPattern.test(url),
      message: 'Wrong link format',
    },
  },
  owner: {

  },
  movieId: {

  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

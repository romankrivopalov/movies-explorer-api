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
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
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

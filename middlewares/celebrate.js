const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../utils/constants');

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(40),
    email: Joi.string().required().email(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().min(1).max(4).required(),
    description: Joi.string().required(),
    image: Joi.string().regex(urlPattern),
    trailerLink: Joi.string().regex(urlPattern),
    thumbnail: Joi.string().regex(urlPattern),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  validateUpdateUser,
  validateCreateMovie,
};

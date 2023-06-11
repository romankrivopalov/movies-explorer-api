//
const router = require('express').Router();

// получение мидлвары для проверки токена в запросе
const { validateToken } = require('../middlewares/auth');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { BadRequestError } = require('../utils/error');

//
// const { errors } = require('celebrate');

//
// const { validateLogin, validateCreateUser } = require('../middlewares/celebrate');

router.use('/users', validateToken, usersRouter);
router.use('/movies', validateToken, moviesRouter);
router.use('/*', validateToken, (req, res, next) => next(new BadRequestError('This page not found')));

module.exports = router;

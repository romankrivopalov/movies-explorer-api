const { NODE_ENV, JWT_SECRET } = process.env;

// модуль для хеширования пароля
const bcrypt = require('bcryptjs');

// модуль для создания и подтверждения токенов
const jwt = require('jsonwebtoken');
const userSchema = require('../models/users');

const {
  NotFoundError,
  UnathorizedError,
  BadRequestError,
  ConflictError,
} = require('../utils/error');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return userSchema
    .findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnathorizedError('incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnathorizedError('incorrect email or password'));
          }

          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true });

          return res
            .status(200)
            .send({
              _id: user._id,
              name: user.name,
              email: user.email,
            });
        });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => userSchema.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('A user with such a email is already registered'));
      }

      if (err.name === 'ValidationError') {
        return next(new NotFoundError('Invalid data when post user'));
      }

      return next(err);
    });
};

module.exports.getUserById = (req, res, next) => {
  const userId = req.params.id;

  userSchema
    .findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('Invalid data when get user'));
      }

      if (err.name === 'DocumentNotFoundError') {
        return next(new BadRequestError(`User Id: ${userId} is not found`));
      }

      return next(res);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  userSchema.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new NotFoundError('Invalid user id passed'));
      }

      return next(err);
    });
};

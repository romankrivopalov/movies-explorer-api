const userSchema = require('../models/users');

const {
  NotFoundError,
  BadRequestError,
} = require('../utils/error');

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

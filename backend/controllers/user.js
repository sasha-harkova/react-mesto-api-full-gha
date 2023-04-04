const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userSchema');
const NotFoundError = require('../errors/not-found-err');
const { JWT_SECRET } = require('../config');

const error404Message = 'Пользователь по указанному _id не найден.';

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
}

function getUserById(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(error404Message);
      }
      return res.send(user);
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(error404Message);
      }
      return res.send(user);
    })
    .catch(next);
}

function createUser(req, res, next) {
  const user = req.body;

  bcrypt.hash(user.password, 10)
    .then((hash) => User.create({ ...user, password: hash })
      .then((newUser) => res.send({
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
        email: newUser.email,
        _id: user._id,
      }))
      .catch(next));
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(error404Message);
      }
      return res.send(user);
    })
    .catch(next);
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(error404Message);
      }
      return res.send(user);
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET,  { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};

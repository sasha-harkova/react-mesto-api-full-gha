const error400Message = 'Переданы некорректные данные';
const error409Message = 'Пользователь с таким e-mail существует';
const error500Message = 'На сервере произошла ошибка';

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500
    ? `${error500Message}: ${err.message}`
    : err.message;

  if (err.name === 'CastError') {
    res.status(400).send({ message: `${error400Message}: ${err.message}` });
  // } else if (err.name === 'CastError') {
  //   res.status(404).send({ message: `${error404Message}: ${err.message}` });
  } else if (err.code === 11000) {
    res.status(409).send({ message: `${error409Message}: ${err.message}` });
  } res.status(statusCode).send({ message: `${err.statusCode}: ${message}` });

  next();
};

module.exports = errorHandler;

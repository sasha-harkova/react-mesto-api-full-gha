const Card = require('../models/cardSchema');
const NotFoundError = require('../errors/not-found-err');
const TryingIsFailed = require('../errors/trying-is-failed');

const error403Message = 'Попытка удаления чужой карточки';
const error404Message = 'Карточка с указанным _id не найдена.';

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError(error404Message))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.deleteOne(card)
          .then((ownerCard) => res.send({ data: ownerCard }))
          .catch(next);
      } else {
        throw new TryingIsFailed(error403Message);
      }
    })
    .catch(next);
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundError(error404Message);
      }
      return res.send({ data: card });
    })
    .catch(next);
}

function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundError(error404Message);
      }
      return res.send({ data: card });
    })
    .catch(next);
}

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};

// "_id": "64088a02c7da6336ad30381f"

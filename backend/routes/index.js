const router = require('express').Router();

const userRoutes = require('./userRoutes');
const cardRoutes = require('./cardRoutes');
const authAndRegistrationRoutes = require('./authAndRegistrationRoutes');
const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');

const error404Message = 'Страница по указанному маршруту не найдена';

router.use('/', authAndRegistrationRoutes);
router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use(() => {
  throw new NotFoundError(error404Message);
});


module.exports = router;

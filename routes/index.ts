import express from 'express';
import { wineRouter } from './wines';
import { userRouter } from './users';
import { createUser, login } from '../controllers/users';

const router = express.Router();

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/wines', wineRouter);
// router.use('/users', userRouter)
router.use('*', (req, res) => {
  res.status(404).send({ message: "страница не найдена"})
})

export {
  router
}
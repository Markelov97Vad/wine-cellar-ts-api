import express from 'express';
import { wineRouter } from './wines';

const router = express.Router();

router.use('/wines', wineRouter);
router.use('*', (req, res) => {
  res.status(404).send({ message: "страница не найдена"})
})

export {
  router
}
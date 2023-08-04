import express from 'express';
import { wineRouter } from './wines';

const router = express.Router();

router.use('/wine', wineRouter);
router.use('*', (req, res) => {
  res.send(404).send({ message: "страница не найдена"})
})

export {
  router
}
import express from 'express'
import { createWine, getAllWines } from "../controllers/wines";

const wineRouter = express.Router();

wineRouter.post('/', createWine);
wineRouter.get('/', getAllWines)

export {
  wineRouter
}
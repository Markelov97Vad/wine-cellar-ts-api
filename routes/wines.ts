import express from 'express'
import { createWine, getAllWines, getCurrentWine } from "../controllers/wines";

const wineRouter = express.Router();

wineRouter.post('/', createWine);
wineRouter.get('/', getAllWines);
wineRouter.get('/:id', getCurrentWine);

export {
  wineRouter
}
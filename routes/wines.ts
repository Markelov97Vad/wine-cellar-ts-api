import express from 'express'
import { addWineFromFavorite, createWine, deleteWineFromFavorite, getAllWines, getCurrentWine } from "../controllers/wines";
import auth from '../middlewares/auth';


const wineRouter = express.Router();

wineRouter.get('/', getAllWines);
wineRouter.get('/:id', getCurrentWine);

wineRouter.use(auth);

wineRouter.post('/', createWine);
wineRouter.put('/:wineId/favorite', addWineFromFavorite);
wineRouter.delete('/:wineId/favorite', deleteWineFromFavorite);

export {
  wineRouter
}
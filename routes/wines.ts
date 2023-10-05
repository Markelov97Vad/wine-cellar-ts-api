import express from 'express'
import { addWineFromFavorite, createWine, deleteWineFromFavorite, getAllWines, getCurrentUserWine, getCurrentWine } from "../controllers/wines";
import auth from '../middlewares/auth';


const wineRouter = express.Router();

wineRouter.get('/', getAllWines);
wineRouter.get('/current/:id', getCurrentWine);
wineRouter.use(auth);


wineRouter.post('/', createWine);
wineRouter.get('/my', getCurrentUserWine);
wineRouter.put('/:wineId/favorite', addWineFromFavorite);
wineRouter.delete('/:wineId/favorite', deleteWineFromFavorite);

export {
  wineRouter
}
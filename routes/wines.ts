import express from "express";
import {
  addWineFromFavorite,
  createWine,
  deleteWine,
  deleteWineFromFavorite,
  getAllWines,
  getCurrentUserWine,
  getCurrentWine,
  getFavoriteWine,
  setWineInfo,
} from "../controllers/wines";
import auth from "../middlewares/auth";

const wineRouter = express.Router();

wineRouter.get("/", getAllWines);
wineRouter.get("/current/:id", getCurrentWine);

wineRouter.use(auth);

wineRouter.post("/", createWine);
wineRouter.patch('/current/:id', setWineInfo);
wineRouter.delete("/:wineId", deleteWine);
wineRouter.get("/my", getCurrentUserWine);
wineRouter.get('/favorite', getFavoriteWine);
wineRouter.put("/favorite/:wineId/", addWineFromFavorite);
wineRouter.delete("/favorite/:wineId", deleteWineFromFavorite);

export { wineRouter };

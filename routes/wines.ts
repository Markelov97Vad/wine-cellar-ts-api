import express from 'express'
import { createWine } from "../controllers/wines";

const wineRouter = express.Router();

wineRouter.post('/', createWine);

export {
  wineRouter
}
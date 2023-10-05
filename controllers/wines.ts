import NotFoundError from '../errors/NotFoundError';
import Wine from '../models/wine'
import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST_MESSAGE_UPDATE, CREATED_CODE, NOT_FOUND_MESSAGE, OK_CODE } from '../utils/config';
import { handleError } from '../utils/handleError';
import { WineType } from '../types/wine.type';
import { ObjectId } from 'mongodb';

const createWine = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    colorWine,
    grapeVariety,
    country,
    typeWine,
    year,
    image,
    rating,
    comment,
    brand,
    region
  } : WineType = req.body;
  const owner = req.user;

  Wine.create({
    name,
    colorWine,
    grapeVariety,
    country,
    typeWine,
    year,
    image,
    rating,
    comment,
    brand,
    region,
    owner
  }).then(newWine => {
    Wine.findById(newWine._id)
      .populate('owner')
      .then(createdWine => {
        console.log('Добавленно вино');
        res.status(CREATED_CODE).send(createdWine)
      })
      .catch(err => handleError(err, next))
  }).catch(err => {
    console.log(`Ошибка при создании вина ${err}`)
    handleError(err, next)
  })
};

const getAllWines = (req : Request, res: Response, next: NextFunction) => {
// console.log('Get Wine');
// console.log('\x1b[33m%s\x1b[0m',req.params);

  Wine.find({})
    .populate('owner')
    .then(allWines => {
      res.status(OK_CODE).send(allWines)
    })
    .catch(err => handleError(err, next))
}

const getCurrentWine = (req : Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  // console.log(id);

  Wine.findById(id)
    .then((currentWine) => {
      if (!currentWine) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      return res.status(OK_CODE).send(currentWine);
    })
    .catch((err) => handleError(err, next))
}

const getCurrentUserWine = (req: Request, res: Response, next: NextFunction) => {
  const { _id }  = req.user;
  console.log('\x1b[33m%s\x1b[0m',req.user);


  Wine.find({owner: req.user._id})
    .populate('owner')
    .then(userWines => {
      if (!userWines) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      return res.status(OK_CODE).send(userWines)
    })
    .catch(err => handleError(err, next))
}


async function findCardByIdAndUpdate(model: typeof Wine, req: Request, res: Response, options: string, next: NextFunction) {
  try {
    const { wineId } = req.params;
    const { id } = req.user;

    const wine = model.findByIdAndUpdate(
      wineId,
      { [options]: { likes : id }},
      { new: true }
    ).populate(['owner', 'likes']);

    if(!wine) {
      throw new NotFoundError(BAD_REQUEST_MESSAGE_UPDATE);
    }
    return res.status(OK_CODE).send(wine);

  } catch(err: any) {
    return handleError(err, next);
  }
}

const addWineFromFavorite = (req : Request, res: Response, next: NextFunction) => {
  findCardByIdAndUpdate(Wine, req, res, '$addToSet', next);
}
const deleteWineFromFavorite = (req : Request, res: Response, next: NextFunction) => {
  findCardByIdAndUpdate(Wine, req, res, '$pull', next);
}

export {
  createWine,
  getAllWines,
  getCurrentWine,
  getCurrentUserWine,
  addWineFromFavorite,
  deleteWineFromFavorite
};

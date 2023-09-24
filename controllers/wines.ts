import NotFoundError from '../errors/NotFoundError';
import Wine from '../models/wine'
import { NextFunction, Request, Response } from "express";
import { NOT_FOUND_MESSAGE, OK_CODE } from '../utils/config';
import { handleError } from '../utils/handleError';

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
    comment
  } = req.body;

  Wine.create({
    name,
    colorWine,
    grapeVariety,
    country,
    typeWine,
    year,
    image,
    rating,
    comment
  }).then(newWine => {
    Wine.findById(newWine._id)
      // .populate('owner')
      .then(createdWine => {
        console.log('Добавленно вино');
        res.status(200).send(createdWine)
      })
      .catch(err => handleError(err, next))
  }).catch(err => {
    console.log(`Ошибка при создании вина ${err}`)
    handleError(err, next)
  })
};

const getAllWines = (req : Request, res: Response, next: NextFunction) => {

  Wine.find({})
    .then(allWines => {
      res.status(200).send(allWines)
    })
    .catch(err => handleError(err, next))
}

const getCurrentWine = (req : Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  console.log(id);

  Wine.findById(id)
    .then((currentWine) => {
      if (!currentWine) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      return res.status(OK_CODE).send(currentWine);
    })
    .catch((err) => handleError(err, next))
}

export {
  createWine,
  getAllWines,
  getCurrentWine
};

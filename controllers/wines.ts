import Wine from '../models/wine'
import { Request, Response } from "express";

const createWine = (req: Request, res: Response) => {
  const {
    name,
    colorWine,
    grapeVariety,
    country,
    typeWine,
    year,
    image,
    reiting,
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
    reiting,
    comment
  }).then(newWine => {
    Wine.findById(newWine._id)
      // .populate('owner')
      .then(createdWine => {
        console.log('Добавленно вино');
        res.status(200).send(createdWine)
      })
      .catch(err => console.log(`Ошибка при поиске вина ${err}`))
  }).catch(err => console.log(`Ошибка при создании вина ${err}`))
};

const getAllWines = (req : Request, res: Response) => {
  Wine.find({})
    .then(allWines => {
      res.status(200).send(allWines)
    })
    .catch(err => console.log(`Ошибка при получении списка вин ${err}`))
}

export {
  createWine,
  getAllWines
};

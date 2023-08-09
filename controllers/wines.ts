import Wine from '../models/wine'
import { Request, Response } from "express";


// type wineType = {
//   name: string;
//   region: string;
//   grapeVariety: string;
//   country: string;
//   typeWine: string;
//   year: number;
//   image: string;
//   reiting: number;
//   comment: string;
// }

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

export {
  createWine
};

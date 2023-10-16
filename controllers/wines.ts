import NotFoundError from '../errors/NotFoundError';
import Wine from '../models/wine'
import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST_MESSAGE_UPDATE, CREATED_CODE, DELETE_MESSAGE, FORBIDDEN_MESSAGE, NOT_FOUND_MESSAGE, OK_CODE } from '../utils/config';
import { handleError } from '../utils/handleError';
import { WineType } from '../types/wine.type';
import { ObjectId } from 'mongodb';
import ForbiddenError from '../errors/ForbiddenError';

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
    .populate('owner')
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

  Wine.find({owner: _id})
    .populate('owner', 'likes')
    .then(userWines => {
      if (!userWines) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      return res.status(OK_CODE).send(userWines)
    })
    .catch(err => handleError(err, next))
}

const getFavoriteWine = (req: Request, res: Response, next: NextFunction) => {
  const { _id }  = req.user;

  Wine.find({likes: _id })
    .populate('owner', 'likes')
    .then(favoriteWines => {
      if (!favoriteWines) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      return res.status(OK_CODE).send(favoriteWines)
    })
    .catch(err => handleError(err, next));
}
// const getFavoriteWine = (req: Request, res: Response, next: NextFunction) => {
//   const { _id }  = req.user;

//   Wine.find({likes: _id})
//     .populate('owner')
//     .then(favoriteWine => {
//       if (!favoriteWine) {
//         throw new NotFoundError(NOT_FOUND_MESSAGE);
//       }
//       return res.status(OK_CODE).send(favoriteWine)
//     })
//     .catch(err => handleError(err, next))
// }


// async function findCardByIdAndUpdate(model: typeof Wine, req: Request, res: Response, options: string, next: NextFunction) {
//   try {
//     const { wineId } = req.params;
//     const { _id } = req.user;

//     const wine = model.findByIdAndUpdate(
//       {_id: wineId},
//       { [options]: { likes : _id }},
//       { new: true }
//     ).populate(['owner', 'likes']);

//     console.log('ОШИБКА');
//     // console.log(wine);

//     if(!wine) {
//       console.log('ОШИБКА');

//       throw new NotFoundError(BAD_REQUEST_MESSAGE_UPDATE);
//     }
//     return res.status(OK_CODE).send(wine);

//   } catch(err: any) {
//     return handleError(err, next);
//   }
// }

// const addWineFromFavorite = (req : Request, res: Response, next: NextFunction) => {
//   findCardByIdAndUpdate(Wine, req, res, '$addToSet', next);
// }
// const deleteWineFromFavorite = (req : Request, res: Response, next: NextFunction) => {
//   findCardByIdAndUpdate(Wine, req, res, '$pull', next);
// }

const addWineFromFavorite = (req: Request, res: Response, next: NextFunction) => {
  const { wineId } = req.params;
  const { _id } = req.user;

  Wine.findByIdAndUpdate(
    {_id: wineId},
    { '$addToSet': { likes : _id }},
    { new: true }
  )
  .populate(['owner', 'likes'])
  .then( wine => {
    if(!wine) {
      throw new NotFoundError(BAD_REQUEST_MESSAGE_UPDATE);
    }
    return res.status(OK_CODE).send(wine)
  })
  .catch(err => handleError(err, next));
}
const deleteWineFromFavorite = (req: Request, res: Response, next: NextFunction) => {
  const { wineId } = req.params;
  const { _id } = req.user;

  Wine.findByIdAndUpdate(
    {_id: wineId},
    { '$pull': { likes : _id }},
    { new: true }
  )
  .populate(['owner', 'likes'])
  .then( wine => {
    if(!wine) {
      throw new NotFoundError(BAD_REQUEST_MESSAGE_UPDATE);
    }
    return res.status(OK_CODE).send(wine)
  })
  .catch(err => handleError(err, next));
}

const deleteWine = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { wineId } = req.params;

  Wine
    .findById(wineId)
    .then(wine => {
      if (!wine) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      console.log(wine.owner);

      if (_id !== wine.owner?.valueOf()) {
        throw new ForbiddenError(FORBIDDEN_MESSAGE)
      }
      return wine.deleteOne();
    })
    .then(() => res.status(OK_CODE).send({ message: DELETE_MESSAGE}))
    .catch(err => handleError(err, next));

}

export {
  createWine,
  getAllWines,
  getCurrentWine,
  getCurrentUserWine,
  addWineFromFavorite,
  deleteWineFromFavorite,
  getFavoriteWine,
  deleteWine
};

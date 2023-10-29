import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/user";
import { handleError } from "../utils/handleError";
import { DELETE_MESSAGE, NOT_FOUND_MESSAGE, OK_CODE, checkJWT } from "../utils/config";
import NotFoundError from "../errors/NotFoundError";

interface IRequestBody {
  nameUser: string;
  email: string;
  password?: string;
}

export const createUser = (req : Request, res: Response, next: NextFunction) => {
  const { nameUser, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then( hash => User.create({
      nameUser,
      email,
      password: hash
    })).then(user => {
      const newUser : IRequestBody = user.toObject();
      delete newUser.password;
      return res.status(201).send(newUser)
    }).catch(err => handleError(err, next))
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } : { email: string, password: string} = req.body;

  User.findUserByCredentails(email, password)
    .then( user => {
      const token = jwt.sign(
        { _id: user._id },
        checkJWT!,
        { expiresIn: '365d' },
      );
      const newUser: IRequestBody = user.toObject();
      delete newUser.password;
      return res.status(OK_CODE).send({newUser, token});
    }).catch(err => handleError(err, next))
}

export const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      return res.status(OK_CODE).send(user);
    })
    .catch((err) => handleError(err, next));
};

export const logout = (req: Request, res: Response) => {
  res.send({ message: DELETE_MESSAGE });
};

export const setUserInfo = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { nameUser , email, surname } :
  {
    nameUser: string,
    email: string,
    surname: string
  } = req.body;

  User
    .findByIdAndUpdate(
      _id,
      {nameUser, email, surname},
      {new: true, runValidators: true}
    )
    .then(user => {
      if (!user) {
        return new NotFoundError(NOT_FOUND_MESSAGE);
      }
      return res.status(OK_CODE).send(user)
    })
    .catch(err => handleError(err, next))
}
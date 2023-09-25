import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/user";
import { handleError } from "../utils/handleError";
import { DELETE_MESSAGE, NODE_ENV, NOT_FOUND_MESSAGE, OK_CODE, checkJWT } from "../utils/config";
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
  console.log(email, password);


  User.findUserByCredentails(email, password)
    .then( user => {
      console.log(user);

      const token = jwt.sign(
        { _id: user._id },
        checkJWT!,
        {expiresIn: '7d'}
      );
      const newUser: IRequestBody = user.toObject();
      delete newUser.password;
      console.log(token);
      return res.cookie(
        'jwt',
        token,
        {
          httpOnly: true,
          secure: NODE_ENV === 'production',
          // sameSite: 'none',
          // secure: true,
          maxAge: 3600000 * 24 * 7,
        }
      ).send(newUser);
    })
    .catch(err =>{
      console.log(err);

      next(err)
    })
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
  res
    .clearCookie('jwt')
    .send({ message: DELETE_MESSAGE });
};

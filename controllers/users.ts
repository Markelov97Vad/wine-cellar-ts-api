import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';

interface IRequestBody {
  nameUser: string;
  email: string;
  password?: string;
}

const createUser = (req : Request, res: Response) => {
  const { nameUser, email, password } = req.body;
  console.log(nameUser,email );



  return bcrypt
    .hash(password, 10)
    .then( hash => User.create({
      nameUser,
      email,
      password
    })).then(user => {
      const newUser : IRequestBody = user.toObject();
      // const { password } : Partial<Pick<IRequestBody, 'password'>> = newUser
      // console.log(password);
      delete newUser.password;
      return res.status(201).send(newUser)
      // User.findById(newUser._id)
      // .then(createdUser => {
      //   console.log('Создан пользватель');
      //   res.status(201).send(createdUser)
      // })
      // .catch(err => console.log(`Ошибка при поиске пользователя ${err}`))
    }).catch(err => console.log(`Ошибка при создании пользователя ${err}`))


};

export {
  createUser
};
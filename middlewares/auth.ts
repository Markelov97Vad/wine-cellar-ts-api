import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import UnauthorizedError from "../errors/UnauthorizedError";
import { UNAUTHORIZED_AUTH_MESSAGE, checkJWT } from "../utils/config";


const auth = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  console.log('jwt',req.cookies.jwt);

  if(!token) {
    return next(new UnauthorizedError(UNAUTHORIZED_AUTH_MESSAGE));
  }
  let payload;
  try {
    payload = jwt.verify(token, checkJWT!);
  } catch(err) {
    return next(new UnauthorizedError(UNAUTHORIZED_AUTH_MESSAGE))
  }
  req.user = payload;
  // console.log('payload',payload);

  return next();
};

export default auth;
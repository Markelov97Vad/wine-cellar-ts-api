import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import UnauthorizedError from "../errors/UnauthorizedError";
import { UNAUTHORIZED_AUTH_MESSAGE, checkJWT } from "../utils/config";


const auth = (req: Request, res: Response, next: NextFunction) => {

  const { authorization } = req.headers
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(UNAUTHORIZED_AUTH_MESSAGE));
  }

  const token = req.headers.authorization?.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token!, checkJWT!);
  } catch(err) {
    return next(new UnauthorizedError(UNAUTHORIZED_AUTH_MESSAGE))
  }

  req.user = payload;

  return next();
};

export default auth;
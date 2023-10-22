import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import UnauthorizedError from "../errors/UnauthorizedError";
import { UNAUTHORIZED_AUTH_MESSAGE, checkJWT } from "../utils/config";


const auth = (req: any, res: Response, next: NextFunction) => {
  // const token = req.cookies.jwt;
  // console.log('secret',req.secret);
  // // console.log('cookie',req.rawHeaders[req.rawHeaders.length - 1].slice(4));
  // console.log('cookie',req.rawHeaders);
  console.log('cookie',req.cookies);

  // const token = req.rawHeaders[req.rawHeaders.length - 1].slice(4);
  const token = req.cookies.jwt;
  // console.log('token',token);


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
  console.log('req.user',payload);

  return next();
};

export default auth;
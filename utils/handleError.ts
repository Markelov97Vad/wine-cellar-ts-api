import { ErrorRequestHandler, NextFunction } from "express"
import mongoose, { MongooseError } from "mongoose"
import { BAD_REQUEST_CODE, BAD_REQUEST_MESSAGE, CONFLICT_MESSAGE } from "./config";
import ConflictError from '../errors/ConflictError';
import { ErrorCallback } from "typescript";
import { MongoError } from 'mongodb';
import BadRequestError from "../errors/BadRequestError";

// interface err {
//   code: number
// }

export const handleError = (err : MongoError, next: NextFunction) => {
  console.log(err);

  if (err instanceof mongoose.Error.CastError) {
    return next(new BadRequestError(BAD_REQUEST_MESSAGE))
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return next(new BadRequestError(BAD_REQUEST_MESSAGE))
  }
  if(err.name === 'MongoServerError' && err.code === 11000) {
    return next(new ConflictError(CONFLICT_MESSAGE));
  }
  return next(err)
}
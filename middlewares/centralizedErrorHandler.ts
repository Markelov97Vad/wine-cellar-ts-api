import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { SERVER_ERROR_CODE, SERVER_ERROR_MESSAGE } from "../utils/config";

type ErrorType = {
  statusCode: number;
  message: string
}

export const centralizedErrorHandler = (err: ErrorType, req: Request, res: Response, next: NextFunction) => {
  // console.log(err.statusCode);
  // console.log('Неизвестная ошибка');

  if (err.statusCode) {
    console.log('ошибка на клиенте');

    res.status(err.statusCode).send({ message: err.message})
  } else {
    console.log('ошибка на сервере');
    // console.log(req.headers);

    res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE})
  }
  return next();
}
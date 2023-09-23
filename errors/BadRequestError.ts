import { BAD_REQUEST_CODE } from "../utils/config";

class BadRequestError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = BAD_REQUEST_CODE;
  }
}

export default BadRequestError;
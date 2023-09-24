import { UNAUTHORIZED_CODE } from "../utils/config";

class UnauthorizedError extends Error {
  statusCode: number
  constructor(message: string) {
    super(message);
    this.statusCode = UNAUTHORIZED_CODE;
  }
}

export default UnauthorizedError;

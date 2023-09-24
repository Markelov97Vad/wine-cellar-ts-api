import { FORBIDDEN_CODE } from "../utils/config";

class ForbiddenError extends Error {
  statusCode: number
  constructor(message: string) {
    super(message);
    this.statusCode = FORBIDDEN_CODE;
  }
}

export default ForbiddenError;

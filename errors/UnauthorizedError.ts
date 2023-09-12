const { UNAUTHORIZED_CODE } = require('../ustils/config');

class UnauthorizedError extends Error {
  statusCode: number
  constructor(message: string) {
    super(message);
    this.statusCode = UNAUTHORIZED_CODE;
  }
}

export default UnauthorizedError;

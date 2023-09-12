const { NOT_FOUND_CODE } = require('../ustils/config');

class NotFoundError extends Error {
  statusCode: number
  constructor(message: string) {
    super(message);
    this.statusCode = NOT_FOUND_CODE;
  }
}

export default NotFoundError;

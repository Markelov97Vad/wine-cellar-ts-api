const { CONFLICT_CODE } = require('../ustils/config');

class ConflictError extends Error {
  statusCode: number
  constructor(message: string) {
    super(message);
    this.statusCode = CONFLICT_CODE;
  }
}

export default ConflictError;

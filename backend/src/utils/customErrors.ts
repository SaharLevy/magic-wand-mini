class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
    this.name = "BadRequestError";
  }
}

export { CustomError,BadRequestError, NotFoundError };

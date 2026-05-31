import { StatusCodes } from "http-status-codes";

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
    this.name = "NotFoundError";
  }
}

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
    this.name = "BadRequestError";
  }
}

export { CustomError, BadRequestError, NotFoundError };

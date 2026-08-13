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

class ValidationError extends CustomError {
  details: string[];
  constructor(message: string, details: string[]) {
    super(message, StatusCodes.BAD_REQUEST);
    this.name = "ValidationError";
    this.details = details;
  }
}
export { CustomError, BadRequestError, NotFoundError, ValidationError };


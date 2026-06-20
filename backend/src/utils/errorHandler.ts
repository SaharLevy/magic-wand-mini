import type { NextFunction, Request, Response } from "express";
import { CustomError, ValidationError } from "./customErrors.js";

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.log(err.message);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
    statusCode,
    ...(err instanceof ValidationError && { details: err.details }),
  });
};

export default errorHandler;

import type { NextFunction, Request, Response } from "express";
import { CustomError } from "./customErrors.js";

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log(err.message);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
    statusCode,
  });
};

export default errorHandler;

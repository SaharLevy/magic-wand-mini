import type { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(err.message);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
    statusCode: statusCode,
  });
};

export default errorHandler;

// src/tasks/presentation/middelwares/ErrorHandlerMiddelware.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/errors/AppError.js";

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    // Handle known application errors
    res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode,
    });
    return;
  }

  // Handle unexpected errors
  console.error("UNEXPECTED ERROR:", err);

  res.status(500).json({
    message: "Internal Server Error",
  });
  return;
};

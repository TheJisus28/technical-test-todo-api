// shared/errors/BadRequestError.ts
import { AppError } from "./AppError.js";

export class BadRequestError extends AppError {
  constructor(message: string = "Bad Request", errorCode?: string) {
    super(message, 400, errorCode);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

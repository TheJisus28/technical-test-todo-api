// shared/errors/InternalServerError.ts
import { AppError } from "./AppError.js";

export class InternalServerError extends AppError {
  constructor(message: string = "Internal Server Error", errorCode?: string) {
    super(message, 500, errorCode);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// shared/errors/NotFoundError.ts
import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
  constructor(message: string = "Not Found") {
    super(message, 404);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

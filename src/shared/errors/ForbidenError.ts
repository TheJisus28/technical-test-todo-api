// shared/errors/ForbiddenError.ts
import { AppError } from "./AppError.js";

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden") {
    super(message, 403);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

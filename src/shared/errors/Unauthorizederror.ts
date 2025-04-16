// shared/errors/UnauthorizedError.ts
import { AppError } from "./AppError.js";

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

import { v4 as uuidv4 } from "uuid";

export class UUIDGenrator {
  static generateUUID(): string {
    return uuidv4();
  }
}

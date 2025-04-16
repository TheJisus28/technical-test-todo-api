import { UUIDGenrator } from "../../../shared/utils/UUIDGenerator.js";
import { TaskStatus } from "../enums/TaskStatus.js";
import { ITask } from "./ITaks.js";

export class Task implements ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;

  constructor(title: string, description: string) {
    this.id = UUIDGenrator.generateUUID();
    this.title = title;
    this.description = description;
    this.status = TaskStatus.PENDING;
    this.createdAt = new Date();
  }
}

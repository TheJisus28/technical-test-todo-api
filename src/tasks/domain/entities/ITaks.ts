import { TaskStatus } from "../enums/TaskStatus.js";

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
}

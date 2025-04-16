import { TaskStatus } from "../enums/TaskStatus.js";

export interface UpdateTaskDTO {
  id: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
}

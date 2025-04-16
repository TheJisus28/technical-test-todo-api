import { TaskStatus } from "../../domain/enums/TaskStatus.js";

export interface Filters {
  status?: TaskStatus;
  createdBefore?: string; // Format YYYY-MM-DD
  createdAfter?: string; // Format YYYY-MM-DD
  limit?: number;
  page?: number;
}

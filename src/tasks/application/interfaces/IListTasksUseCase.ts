import { ITask } from "../../domain/entities/ITask.js";
import { Filters } from "../dtos/Filters.js";

export interface IListTasksUseCase {
  execute(filters: Filters): Promise<ITask[] | null>;
}

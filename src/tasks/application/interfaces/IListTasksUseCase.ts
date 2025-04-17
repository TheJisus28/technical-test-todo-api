import { ITask } from "../../domain/entities/ITaks.js";
import { Filters } from "../dtos/Filters.js";

export interface IListTasksUseCase {
  execute(filters: Filters): Promise<ITask[] | null>;
}

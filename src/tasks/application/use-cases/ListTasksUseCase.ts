import { InternalServerError } from "../../../shared/errors/InternalServerError.js";
import { ITask } from "../../domain/entities/ITaks.js";
import { Filters } from "../dtos/Filters.js";
import { IListTasksUseCase } from "../interfaces/IListTasksUseCase.js";
import { ITaskRepository } from "../interfaces/ITaskRepository.js";

export class ListTasksUseCase implements IListTasksUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(filters: Filters): Promise<ITask[] | null> {
    try {
      const tasks = await this.taskRepository.listTasks(filters);
      return tasks;
    } catch (error) {
      throw new InternalServerError("Could not list tasks", "TASK_LIST_FAILED");
    }
  }
}

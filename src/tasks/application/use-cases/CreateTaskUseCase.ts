import { ITask } from "../../domain/entities/ITask.js";
import { Task } from "../../domain/entities/Task.js";
import { CreateTaskDTO } from "../dtos/CreateTaskDTO.js";
import { ICreateTaskUseCase } from "../interfaces/ICreateTaskUseCase.js";
import { ITaskRepository } from "../interfaces/ITaskRepository.js";
import { BadRequestError } from "../../../shared/errors/BadRquestError.js";

export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(data: CreateTaskDTO): Promise<ITask> {
    try {
      // Validate the input data using custom errors
      if (!data.title) {
        throw new BadRequestError(
          "Title is required",
          "TASK_CREATE_MISSING_TITLE"
        );
      }
      if (!data.description) {
        throw new BadRequestError(
          "Description is required",
          "TASK_CREATE_MISSING_DESCRIPTION"
        );
      }

      // Create a new task instance
      const task = new Task(data.title, data.description);

      // Save the task to the repository
      await this.taskRepository.save(task);

      return task;
    } catch (error: Error | any) {
      // Re-throw the error, it will be caught by the error handler middleware
      throw error;
    }
  }
}

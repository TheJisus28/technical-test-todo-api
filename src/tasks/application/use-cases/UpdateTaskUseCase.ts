import { BadRequestError } from "../../../shared/errors/BadRquestError.js";
import { NotFoundError } from "../../../shared/errors/NotFoundError.js";
import { ITask } from "../../domain/entities/ITask.js";
import { TaskStatus } from "../../domain/enums/TaskStatus.js";
import { UpdateTaskDTO } from "../dtos/UpdateTaskDTO.js";
import { ITaskRepository } from "../interfaces/ITaskRepository.js";
import { IUpdateTaskUseCase } from "../interfaces/IUpdateTaskUseCase.js";

export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(data: UpdateTaskDTO): Promise<ITask | null> {
    if (!data.id) {
      throw new BadRequestError(
        "Task ID is required",
        "TASK_UPDATE_MISSING_ID"
      );
    }

    // Check if the task exists
    const existingTask = await this.taskRepository.findById(data.id);
    if (!existingTask) {
      throw new NotFoundError("TASK_NOT_FOUND");
    }

    // Ensure there's at least one field to update (besides the id)
    if (!data.title && !data.description && !data.status) {
      throw new BadRequestError(
        "No data provided for update",
        "TASK_UPDATE_NO_DATA"
      );
    }

    if (data.title && typeof data.title !== "string") {
      throw new BadRequestError(
        "Task title must be a string",
        "TASK_UPDATE_INVALID_TITLE"
      );
    }

    if (data.description && typeof data.description !== "string") {
      throw new BadRequestError(
        "Task description must be a string",
        "TASK_UPDATE_INVALID_DESCRIPTION"
      );
    }

    if (data.status && !Object.values(TaskStatus).includes(data.status)) {
      throw new BadRequestError(
        `Task status must be one of: ${Object.values(TaskStatus).join(", ")}`,
        "TASK_UPDATE_INVALID_STATUS"
      );
    }

    return this.taskRepository.update(data);
  }
}

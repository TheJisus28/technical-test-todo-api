import { ITask } from "../../domain/entities/ITaks.js";
import { CreateTaskDTO } from "../dtos/CreateTaskDTO.js";
import { ITaskRepositorie } from "../interfaces/ITaskRepositorie.js";

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepositorie) {}

  async execute(data: CreateTaskDTO): Promise<ITask> {
    // Validate the input data
    if (!data.title || !data.description) {
      throw new Error("Title and description are required");
    }

    // Create the task using the repository
    const task = await this.taskRepository.create(data);

    return task;
  }
}

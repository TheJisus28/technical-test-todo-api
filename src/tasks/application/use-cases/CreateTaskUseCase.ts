import { ITask } from "../../domain/entities/ITaks.js";
import { Task } from "../../domain/entities/Task.js";
import { CreateTaskDTO } from "../dtos/CreateTaskDTO.js";
import { ITaskRepositorie } from "../interfaces/ITaskRepositorie.js";

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepositorie) {}

  async execute(data: CreateTaskDTO): Promise<ITask> {
    try {
      // Validate the input data
      if (!data.title || !data.description) {
        throw new Error("Title and description are required");
      }

      // Create a new task instance
      const task = new Task(data.title, data.description);

      // Save the task to the repository
      await this.taskRepository.save(task);

      return task;
    } catch (error: Error | any) {
      // Handle any errors that occur during task creation
      console.error("Error creating task:", error.message);

      // Re-throw the error to be handled by the caller
      throw error;
    }
  }
}

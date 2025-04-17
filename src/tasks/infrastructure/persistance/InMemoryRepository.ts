import { Filters } from "../../application/dtos/Filters.js";
import { UpdateTaskDTO } from "../../application/dtos/UpdateTaskDTO.js";
import { ITaskRepository } from "../../application/interfaces/ITaskRepository.js";
import { ITask } from "../../domain/entities/ITaks.js";

export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: ITask[] = []; // In-memory storage for tasks

  async save(data: ITask): Promise<void> {
    this.tasks.push(data); // Add the task to the in-memory array
  }

  async update(data: UpdateTaskDTO): Promise<ITask> {
    const taskIndex = this.tasks.findIndex((task) => task.id === data.id);
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }
    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...data }; // Update the task in the array
    return this.tasks[taskIndex];
  }

  async delete(id: string): Promise<ITask | undefined> {
    const taskToDelete = this.tasks.find((task) => task.id === id); // Find the task
    this.tasks = this.tasks.filter((task) => task.id !== id); // Remove the task
    return taskToDelete; // Return the deleted task
  }

  async listTasks(filters?: Filters): Promise<ITask[]> {
    let filteredTasks = [...this.tasks]; // Create a copy to avoid modifying the original array

    if (filters?.status) {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === filters.status
      );
    }

    if (filters?.createdBefore) {
      filteredTasks = filteredTasks.filter(
        (task) => new Date(task.createdAt) < new Date(filters.createdBefore!)
      );
    }

    if (filters?.createdAfter) {
      filteredTasks = filteredTasks.filter(
        (task) => new Date(task.createdAt) > new Date(filters.createdAfter!)
      );
    }

    if (filters?.limit && filters?.page) {
      const startIndex = (filters.page - 1) * filters.limit;
      const endIndex = startIndex + filters.limit;
      filteredTasks = filteredTasks.slice(startIndex, endIndex);
    } else if (filters?.limit) {
      filteredTasks = filteredTasks.slice(0, filters.limit);
    }

    return filteredTasks;
  }
}

export default InMemoryTaskRepository;

import { Filters } from "../../application/dtos/Filters.js";
import { UpdateTaskDTO } from "../../application/dtos/UpdateTaskDTO.js";
import { ITaskRepositorie } from "../../application/interfaces/ITaskRepositorie.js";
import { ITask } from "../../domain/entities/ITaks.js";

class InMemoryTaskRepository implements ITaskRepositorie {
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

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id); // Remove the task from the array
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

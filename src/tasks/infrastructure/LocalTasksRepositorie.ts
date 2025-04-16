import * as fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { CreateTaskDTO } from "../application/dtos/CreateTaskDTO.js";
import { ITask } from "../domain/entities/ITaks.js";
import { ITaskRepositorie } from "../application/interfaces/ITaskRepositorie.js";
import { TaskStatus } from "../domain/enums/TaskStatus.js";
import { UpdateTaskDTO } from "../application/dtos/UpdateTaskDTO.js";
import { Filters } from "../application/dtos/Filters.js";
import { UUIDGenrator } from "../../shared/utils/UUIDGenerator.js";

// Get the directory of the current file for relative pathing
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE_PATH = path.join(__dirname, "tasks.json"); // Path to the JSON file storing tasks

class LocalTaskRepository implements ITaskRepositorie {
  async create(data: CreateTaskDTO): Promise<ITask> {
    const tasks = await this.readTasks();
    const newTask: ITask = {
      id: UUIDGenrator.generateUUID(),
      title: data.title,
      description: data.description || "",
      status: TaskStatus.PENDING,
      createdAt: new Date(),
    };
    tasks.push(newTask);
    await this.saveTasks(tasks);
    return newTask;
  }

  async update(data: UpdateTaskDTO): Promise<ITask> {
    const tasks = await this.readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === data.id);
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }
    tasks[taskIndex] = { ...tasks[taskIndex], ...data };
    await this.saveTasks(tasks);
    return tasks[taskIndex];
  }

  async delete(id: string): Promise<void> {
    const tasks = await this.readTasks();
    const updatedTasks = tasks.filter((task) => task.id !== id);
    await this.saveTasks(updatedTasks);
  }

  async find(filters?: Filters): Promise<ITask[]> {
    const tasks = await this.readTasks();
    let filteredTasks = tasks;

    if (filters?.status) {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === filters.status
      );
    }

    if (filters?.createdBefore) {
      filteredTasks = filteredTasks.filter(
        (task) => new Date(task.createdAt) <= new Date(filters.createdBefore!)
      );
    }

    if (filters?.createdAfter) {
      filteredTasks = filteredTasks.filter(
        (task) => new Date(task.createdAt) >= new Date(filters.createdAfter!)
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

  private async readTasks(): Promise<ITask[]> {
    try {
      const data = await fs.readFile(DATA_FILE_PATH, "utf8");

      if (!data.trim()) {
        // If the file is empty, return an empty array
        return [];
      }

      return JSON.parse(data) as ITask[];
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return [];
      }
      console.error("Error reading tasks from JSON:", error);
      throw new Error("Could not read tasks data.");
    }
  }

  private async saveTasks(tasks: ITask[]): Promise<void> {
    try {
      const data = JSON.stringify(tasks, null, 2); // Use null, 2 for pretty printing
      await fs.writeFile(DATA_FILE_PATH, data, "utf8");
    } catch (error) {
      console.error("Error saving tasks to JSON:", error);
      throw new Error("Could not save tasks data.");
    }
  }
}

export default LocalTaskRepository;

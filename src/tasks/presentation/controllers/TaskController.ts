import { Request, Response, NextFunction } from "express"; // Importa NextFunction
import { CreateTaskDTO } from "../../application/dtos/CreateTaskDTO.js";
import { ICreateTaskUseCase } from "../../application/interfaces/ICreateTaskUseCase.js";
import { IListTasksUseCase } from "../../application/interfaces/IListTasksUseCase.js";
import { IDeleteTaskUseCase } from "../../application/interfaces/IDeleteTaskUseCase.js";
import { DeleteTaskUseCase } from "../../application/use-cases/DeleteTaskUseCase.js";
import { IUpdateTaskUseCase } from "../../application/interfaces/IUpdateTaskUseCase.js";
import { UpdateTaskDTO } from "../../application/dtos/UpdateTaskDTO.js";

export class TaskController {
  private readonly createTaskUseCase: ICreateTaskUseCase;
  private readonly listTasksUseCase: IListTasksUseCase;
  private readonly deleteTaskUseCase: IDeleteTaskUseCase;
  private readonly updateTaskUseCase: IUpdateTaskUseCase;
  constructor(
    createTaskUseCase: ICreateTaskUseCase,
    listTasksUseCase: IListTasksUseCase,
    deleteTaskUseCase: IDeleteTaskUseCase,
    updateTaskUseCase: IUpdateTaskUseCase
  ) {
    this.createTaskUseCase = createTaskUseCase;
    this.listTasksUseCase = listTasksUseCase;
    this.deleteTaskUseCase = deleteTaskUseCase;
    this.updateTaskUseCase = updateTaskUseCase;
  }

  public async createTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const createTaskDTO: CreateTaskDTO = req.body;
      const newTask = await this.createTaskUseCase.execute(createTaskDTO);
      return res.status(201).json(newTask);
    } catch (error: any) {
      next(error);
    }
  }

  public async listTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const filters = req.query;
      const tasks = await this.listTasksUseCase.execute(filters);
      return res.status(200).json(tasks);
    } catch (error: any) {
      next(error);
    }
  }

  public async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const taskId = req.params.id;
      await this.deleteTaskUseCase.execute(taskId);
      return res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }

  public async updateTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const taskId = req.params.id;
      const updateData = req.body;
      const taskToUpdate: UpdateTaskDTO = {
        id: taskId,
        ...updateData,
      };
      const updatedTask = await this.updateTaskUseCase.execute(taskToUpdate);
      return res.status(200).json(updatedTask);
    } catch (error: any) {
      next(error);
    }
  }
}

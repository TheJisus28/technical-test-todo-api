import { Request, Response, NextFunction } from "express"; // Importa NextFunction
import { CreateTaskDTO } from "../../application/dtos/CreateTaskDTO.js";
import { ICreateTaskUseCase } from "../../application/interfaces/ICreateTaskUseCase.js";
import { IListTasksUseCase } from "../../application/interfaces/IListTasksUseCase.js";

export class TaskController {
  private readonly createTaskUseCase: ICreateTaskUseCase;
  private readonly listTasksUseCase: IListTasksUseCase;

  constructor(
    createTaskUseCase: ICreateTaskUseCase,
    listTasksUseCase: IListTasksUseCase
  ) {
    this.createTaskUseCase = createTaskUseCase;
    this.listTasksUseCase = listTasksUseCase;
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
}

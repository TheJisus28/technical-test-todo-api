import { Request, Response, NextFunction } from "express"; // Importa NextFunction
import { CreateTaskDTO } from "../../application/dtos/CreateTaskDTO.js";
import { ICreateTaskUseCase } from "../../application/interfaces/ICreateTaskUseCase.js";

export class TaskController {
  private readonly createTaskUseCase: ICreateTaskUseCase;

  constructor(createTaskUseCase: ICreateTaskUseCase) {
    this.createTaskUseCase = createTaskUseCase;
  }

  public async createTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    // Añade next y cambia el tipo de retorno
    try {
      const createTaskDTO: CreateTaskDTO = req.body;
      const newTask = await this.createTaskUseCase.execute(createTaskDTO);
      return res.status(201).json(newTask);
    } catch (error: any) {
      next(error);
    }
  }
}

import { Request, Response } from "express";
import { CreateTaskDTO } from "../../application/dtos/CreateTaskDTO.js";
import { ICreateTaskUseCase } from "../../application/interfaces/ICreateTaskUseCase.js";

export class TaskController {
  private readonly createTaskUseCase: ICreateTaskUseCase;

  constructor(createTaskUseCase: ICreateTaskUseCase) {
    this.createTaskUseCase = createTaskUseCase;
  }

  async createTask(req: Request, res: Response): Promise<Response> {
    try {
      const createTaskDTO: CreateTaskDTO = req.body;
      const newTask = await this.createTaskUseCase.execute(createTaskDTO);
      return res.status(201).json(newTask);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

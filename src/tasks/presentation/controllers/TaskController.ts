import { Request, Response } from "express";
import { CreateTaskUseCase } from "../../application/use-cases/CreateTaskUseCase.js";
import { CreateTaskDTO } from "../../application/dtos/CreateTaskDTO.js";

export class TaskController {
  private readonly createTaskUseCase: CreateTaskUseCase;

  constructor(createTaskUseCase: CreateTaskUseCase) {
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

// application/interfaces/ICreateTaskUseCase.ts
import { CreateTaskDTO } from "../dtos/CreateTaskDTO.js";
import { ITask } from "../../domain/entities/ITaks.js";

export interface ICreateTaskUseCase {
  execute(data: CreateTaskDTO): Promise<ITask>;
}

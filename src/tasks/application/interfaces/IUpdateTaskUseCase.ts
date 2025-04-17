import { ITask } from "../../domain/entities/ITask.js";
import { UpdateTaskDTO } from "../dtos/UpdateTaskDTO.js";

export interface IUpdateTaskUseCase {
  execute(data: UpdateTaskDTO): Promise<ITask | null>;
}

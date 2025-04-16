import { CreateTaskDTO } from "../dtos/CreateTaskDTO.js";
import { UpdateTaskDTO } from "../dtos/UpdateTaskDTO.js";
import { Filters } from "../dtos/Filters.js";
import { ITask } from "../../domain/entities/ITaks.js";

export interface ITaskRepositorie {
  create(data: CreateTaskDTO): Promise<ITask>;
  update(data: UpdateTaskDTO): Promise<ITask>;
  delete(id: string): Promise<void>;
  find(filters?: Filters): Promise<ITask[]>;
}

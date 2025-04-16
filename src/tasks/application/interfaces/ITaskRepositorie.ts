import { CreateTaskDTO } from "../dtos/CreateTaskDTO.js";
import { UpdateTaskDTO } from "../dtos/UpdateTaskDTO.js";
import { Filters } from "../dtos/Filters.js";
import { ITask } from "../../domain/entities/ITaks.js";

export interface ITaskRepositorie {
  save(data: ITask): Promise<void>;
  update(data: UpdateTaskDTO): Promise<ITask>;
  delete(id: string): Promise<void>;
  listTasks(filters?: Filters): Promise<ITask[]>;
}

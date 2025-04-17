import { NotFoundError } from "../../../shared/errors/NotFoundError.js";
import { IDeleteTaskUseCase } from "../interfaces/IDeleteTaskUseCase.js";
import { ITaskRepository } from "../interfaces/ITaskRepository.js";

export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<void> {
    const task = await this.taskRepository.delete(id);

    if (!task) {
      throw new NotFoundError("TASK_NOT_FOUND");
    }

    await this.taskRepository.delete(id);
  }
}

import express, { Router, Request, Response, NextFunction } from "express";
import { CreateTaskUseCase } from "../../application/use-cases/CreateTaskUseCase.js";
import { InMemoryTaskRepository } from "../../infrastructure/persistance/InMemoryRepository.js";
import { TaskController } from "../controllers/TaskController.js";
import asyncHandler from "../middelwares/AsyncHandler.js";
import { ListTasksUseCase } from "../../application/use-cases/ListTasksUseCase.js";
import { DeleteTaskUseCase } from "../../application/use-cases/DeleteTaskUseCase.js";
import { UpdateTaskUseCase } from "../../application/use-cases/UpdateTaskUseCase.js";

// Setup repository
const inMemoryTaskRepository = new InMemoryTaskRepository();

// Setup use cases
const createTaskUseCase = new CreateTaskUseCase(inMemoryTaskRepository);
const listTasksUseCase = new ListTasksUseCase(inMemoryTaskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(inMemoryTaskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(inMemoryTaskRepository);

// Setup controller
const taskController = new TaskController(
  createTaskUseCase,
  listTasksUseCase,
  deleteTaskUseCase,
  updateTaskUseCase
);

// Define router
const taskRouter: Router = express.Router();

// Route to create a task
taskRouter.post(
  "/tasks",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await taskController.createTask(req, res, next);
  })
);

// Route to list tasks
taskRouter.get(
  "/tasks",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await taskController.listTasks(req, res, next);
  })
);

taskRouter.delete(
  "/tasks/:id",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await taskController.deleteTask(req, res, next);
  })
);

taskRouter.put(
  "/tasks/:id",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await taskController.updateTask(req, res, next);
  })
);

export default taskRouter;

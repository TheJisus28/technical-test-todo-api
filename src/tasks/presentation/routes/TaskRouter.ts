import express, { Router, Request, Response, NextFunction } from "express";
import { CreateTaskUseCase } from "../../application/use-cases/CreateTaskUseCase.js";
import { InMemoryTaskRepository } from "../../infrastructure/persistance/InMemoryRepositorie.js";
import { TaskController } from "../controllers/TaskController.js";
import asyncHandler from "../middelwares/AsyncHandler.js";
import { ListTasksUseCase } from "../../application/use-cases/ListTasksUseCase.js";

// Setup repository
const taskRepository = new InMemoryTaskRepository();

// Setup use cases
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const listTasksUseCase = new ListTasksUseCase(taskRepository);

// Setup controller
const taskController = new TaskController(createTaskUseCase, listTasksUseCase);

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

export default taskRouter;

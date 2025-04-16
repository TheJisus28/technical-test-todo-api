import express, { Router, Request, Response, NextFunction } from "express";
import { CreateTaskUseCase } from "../../application/use-cases/CreateTaskUseCase.js";
import { InMemoryTaskRepository } from "../../infrastructure/persistance/InMemoryRepositorie.js";
import { TaskController } from "../controllers/TaskController.js";
import asyncHandler from "../middelwares/AsyncHandler.js";

// Setup dependencies
const taskRepository = new InMemoryTaskRepository();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const taskController = new TaskController(createTaskUseCase);

// Define router
const taskRouter: Router = express.Router();

// Route to create a task
taskRouter.post(
  "/tasks",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await taskController.createTask(req, res, next);
  })
);

export default taskRouter;

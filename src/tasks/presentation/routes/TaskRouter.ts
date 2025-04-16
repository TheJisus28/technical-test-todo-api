import express, { Router } from "express";
import { CreateTaskUseCase } from "../../application/use-cases/CreateTaskUseCase.js";
import { InMemoryTaskRepository } from "../../infrastructure/persistance/InMemoryRepositorie.js";
import { TaskController } from "../controllers/TaskController.js";

// Setup dependencies
const taskRepository = new InMemoryTaskRepository();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const taskController = new TaskController(createTaskUseCase);

// Define router
const taskRouter: Router = express.Router();

// Route to create a task
taskRouter.post("/tasks", async (req, res) => {
  taskController.createTask(req, res);
});

export default taskRouter;

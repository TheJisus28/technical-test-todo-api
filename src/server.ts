// src/server.ts
import express from "express"; // Import from 'express'
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import fs from "fs";
import taskRouter from "./tasks/presentation/routes/TaskRouter.js";
import { errorHandlerMiddleware } from "./tasks/presentation/middelwares/ErrorHandlerMiddelware.js";

const app = express();

app.use(express.json());

const swaggerDocument = yaml.load(
  fs.readFileSync("./swagger.yaml", "utf8")
) as Record<string, any>;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", taskRouter);

app.use(errorHandlerMiddleware);

export default app;

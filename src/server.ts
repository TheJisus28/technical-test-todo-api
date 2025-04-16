// src/server.ts
import express from "express";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import fs from "fs";
import taskRouter from "./tasks/presentation/routes/TaskRouter.js"; // Import task router

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

const swaggerDocument = yaml.load(
  fs.readFileSync("./swagger.yaml", "utf8")
) as Record<string, any>;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Swagger UI for API documentation

app.use("/api", taskRouter); // Mount task router under the /api path

export default app;

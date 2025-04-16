// src/server.ts
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import fs from "fs";

const app = express();

app.use(express.json());

const swaggerDocument = yaml.load(
  fs.readFileSync("./swagger.yaml", "utf8")
) as Record<string, any>;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint de prueba
app.get("/test", (req: Request, res: Response) => {
  res.send("Hello from Express with TypeScript!");
});

export default app;

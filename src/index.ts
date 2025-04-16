// src/index.ts
import app from "./server.js";
import env from "../config/env.js";

const port = env.PORT;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

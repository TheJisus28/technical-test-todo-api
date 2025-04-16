import * as dotenv from "dotenv";

dotenv.config();

interface EnvVariables {
  PORT: number;
}

function validateEnvVariables(): EnvVariables {
  const port = parseInt(process.env.PORT || "3000", 10);

  if (isNaN(port)) {
    throw new Error("PORT must be a number");
  }

  return {
    PORT: port,
  };
}

const env: EnvVariables = validateEnvVariables();

export default env;

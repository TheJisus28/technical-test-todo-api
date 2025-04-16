// jest.config.ts
import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest"; // Aún lo importas, pero no lo usas si no tienes paths
import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testMatch: ["**/tests/**/*.test.ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    // Elimina esta línea si no usas paths en tsconfig
    // ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
    //   prefix: "<rootDir>/",
    // }),
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

export default config;

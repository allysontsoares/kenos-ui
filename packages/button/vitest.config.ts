import { defineConfig, mergeConfig } from "vitest/config";
import baseConfig from "../../tooling/package-vitest";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./tests/setup.ts"],
    },
  }),
);

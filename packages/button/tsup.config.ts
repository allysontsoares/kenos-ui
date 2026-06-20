import { defineConfig } from "tsup";
import baseConfig from "../../tooling/package-tsup";

export default defineConfig({
  ...baseConfig,
  entry: ["src/index.ts"],
});

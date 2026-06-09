import "@testing-library/jest-dom";
import "vitest";
import type { AxeMatchers } from "vitest-axe";
import * as matchers from "vitest-axe/dist/matchers";
import { expect } from "vitest";

declare module "vitest" {
  interface Assertion<T = any> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}

expect.extend(matchers);

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

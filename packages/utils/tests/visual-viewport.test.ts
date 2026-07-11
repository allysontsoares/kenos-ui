import { describe, expect, it, afterEach, vi } from "vitest";
import {
  getVisualViewportScale,
  isAppleWebKit,
  isPinchZoomed,
  isSafariPinchZoomed,
} from "../src/browser/visual-viewport";

describe("visual-viewport helpers", () => {
  const originalUA = navigator.userAgent;
  const originalVV = window.visualViewport;

  afterEach(() => {
    Object.defineProperty(navigator, "userAgent", {
      configurable: true,
      get: () => originalUA,
    });
    Object.defineProperty(window, "visualViewport", {
      configurable: true,
      value: originalVV,
    });
  });

  it("detects AppleWebKit Safari without Chromium brands", () => {
    Object.defineProperty(navigator, "userAgent", {
      configurable: true,
      get: () =>
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    });
    expect(isAppleWebKit()).toBe(true);
  });

  it("rejects Chromium browsers that include AppleWebKit in UA", () => {
    Object.defineProperty(navigator, "userAgent", {
      configurable: true,
      get: () =>
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    });
    expect(isAppleWebKit()).toBe(false);
  });

  it("reads visualViewport.scale", () => {
    Object.defineProperty(window, "visualViewport", {
      configurable: true,
      value: { scale: 1.5, addEventListener: vi.fn(), removeEventListener: vi.fn() },
    });
    expect(getVisualViewportScale()).toBe(1.5);
    expect(isPinchZoomed()).toBe(true);
  });

  it("isSafariPinchZoomed requires both Safari and scale !== 1", () => {
    Object.defineProperty(navigator, "userAgent", {
      configurable: true,
      get: () =>
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    });
    Object.defineProperty(window, "visualViewport", {
      configurable: true,
      value: { scale: 2, addEventListener: vi.fn(), removeEventListener: vi.fn() },
    });
    expect(isSafariPinchZoomed()).toBe(true);

    Object.defineProperty(window, "visualViewport", {
      configurable: true,
      value: { scale: 1, addEventListener: vi.fn(), removeEventListener: vi.fn() },
    });
    expect(isSafariPinchZoomed()).toBe(false);
  });
});

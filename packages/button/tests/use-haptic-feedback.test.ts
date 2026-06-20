import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useHapticFeedback } from "../src/utils/use-haptic-feedback";

describe("useHapticFeedback", () => {
  let originalNavigator: any;

  beforeEach(() => {
    originalNavigator = globalThis.navigator;
    // @ts-ignore
    globalThis.navigator = {
      vibrate: vi.fn(),
      userAgent: "Mozilla/5.0 (Linux; Android 10)",
    };
  });

  afterEach(() => {
    // @ts-ignore
    globalThis.navigator = originalNavigator;
    document.body.innerHTML = "";
  });

  it("calls navigator.vibrate when supported", () => {
    const { result } = renderHook(() => useHapticFeedback());

    expect(result.current.isSupported).toBe(true);

    act(() => {
      result.current.trigger("medium");
    });

    expect(navigator.vibrate).toHaveBeenCalledWith(20);
  });

  it("injects hidden checkbox for iOS trick", () => {
    // Mock iOS User Agent
    // @ts-ignore
    globalThis.navigator = {
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
      platform: "iPhone",
      maxTouchPoints: 5,
    };

    renderHook(() => useHapticFeedback());

    const checkbox = document.getElementById("kenos-haptic-trigger") as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.type).toBe("checkbox");
    expect(checkbox).toHaveAttribute("aria-hidden", "true");
  });

  it("toggles checkbox when triggering on iOS", () => {
    // Mock iOS User Agent without vibrate
    // @ts-ignore
    global.navigator = {
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
      platform: "iPhone",
      maxTouchPoints: 5,
    };

    const { result } = renderHook(() => useHapticFeedback());

    const checkbox = document.getElementById("kenos-haptic-trigger") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    act(() => {
      result.current.trigger();
    });

    expect(checkbox.checked).toBe(true);

    act(() => {
      result.current.trigger();
    });

    expect(checkbox.checked).toBe(false);
  });
});

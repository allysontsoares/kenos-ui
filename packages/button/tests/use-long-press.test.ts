import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useLongPress, type LongPressMouseEvent } from "../src/utils/use-long-press";

describe("useLongPress", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls onLongPress after delay", () => {
    const onLongPress = vi.fn();
    const { result } = renderHook(() => useLongPress({ delay: 500, onLongPress }));

    const mockEvent = { button: 0, persist: vi.fn() } as any;

    act(() => {
      result.current.onPointerDown(mockEvent);
    });

    expect(onLongPress).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(onLongPress).toHaveBeenCalledTimes(1);
    expect(onLongPress).toHaveBeenCalledWith(mockEvent);
  });

  it("cancels long press on pointer up before delay", () => {
    const onLongPress = vi.fn();
    const onCancel = vi.fn();
    const { result } = renderHook(() => useLongPress({ delay: 500, onLongPress, onCancel }));

    const mockEvent = { button: 0, persist: vi.fn() } as any;

    act(() => {
      result.current.onPointerDown(mockEvent);
    });

    act(() => {
      vi.advanceTimersByTime(200);
      result.current.onPointerUp(mockEvent);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onLongPress).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("cancels long press on pointer leave", () => {
    const onLongPress = vi.fn();
    const { result } = renderHook(() => useLongPress({ delay: 500, onLongPress }));

    const mockEvent = { button: 0, persist: vi.fn() } as any;

    act(() => {
      result.current.onPointerDown(mockEvent);
    });

    act(() => {
      result.current.onPointerLeave(mockEvent);
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(onLongPress).not.toHaveBeenCalled();
  });

  it("suppresses next click if long press fired", () => {
    const onLongPress = vi.fn();
    const { result } = renderHook(() => useLongPress({ delay: 500, onLongPress }));

    const mockPointerEvent = { button: 0, persist: vi.fn() } as any;
    const mockClickEvent = {} as LongPressMouseEvent;

    act(() => {
      result.current.onPointerDown(mockPointerEvent);
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(onLongPress).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.onClick(mockClickEvent);
    });

    expect(mockClickEvent.suppressedByLongPress).toBe(true);

    // Next click should not be suppressed
    const mockClickEvent2 = {} as LongPressMouseEvent;
    act(() => {
      result.current.onClick(mockClickEvent2);
    });
    expect(mockClickEvent2.suppressedByLongPress).toBe(false);
  });

  it("does not suppress click if long press was cancelled", () => {
    const onLongPress = vi.fn();
    const { result } = renderHook(() => useLongPress({ delay: 500, onLongPress }));

    const mockPointerEvent = { button: 0, persist: vi.fn() } as any;
    const mockClickEvent = {} as LongPressMouseEvent;

    act(() => {
      result.current.onPointerDown(mockPointerEvent);
    });

    act(() => {
      vi.advanceTimersByTime(200);
      result.current.onPointerUp(mockPointerEvent);
    });

    act(() => {
      result.current.onClick(mockClickEvent);
    });

    expect(mockClickEvent.suppressedByLongPress).toBe(false);
  });
});

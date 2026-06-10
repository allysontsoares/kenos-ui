import { useCallback, type KeyboardEvent } from "react";

export interface UseGridNavigationOptions {
  enabled?: boolean;
  columns: number;
  itemCount: number;
  focusedIndex: number;
  onFocusedIndexChange: (index: number) => void;
  isItemDisabled?: (index: number) => boolean;
  direction?: "ltr" | "rtl";
  onSelect?: (index: number) => void;
  onPageUp?: () => void;
  onPageDown?: () => void;
  onEscape?: () => void;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function useGridNavigation({
  enabled = true,
  columns,
  itemCount,
  focusedIndex,
  onFocusedIndexChange,
  isItemDisabled,
  direction = "ltr",
  onSelect,
  onPageUp,
  onPageDown,
  onEscape,
}: UseGridNavigationOptions) {
  const moveTo = useCallback(
    (next: number) => {
      if (itemCount <= 0) return;
      onFocusedIndexChange(clamp(next, 0, itemCount - 1));
    },
    [itemCount, onFocusedIndexChange],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || itemCount <= 0) return;

      const rtl = direction === "rtl";
      let next = focusedIndex;

      switch (event.key) {
        case "ArrowRight":
          next = focusedIndex + (rtl ? -1 : 1);
          break;
        case "ArrowLeft":
          next = focusedIndex + (rtl ? 1 : -1);
          break;
        case "ArrowDown":
          next = focusedIndex + columns;
          break;
        case "ArrowUp":
          next = focusedIndex - columns;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = itemCount - 1;
          break;
        case "PageUp":
          onPageUp?.();
          event.preventDefault();
          return;
        case "PageDown":
          onPageDown?.();
          event.preventDefault();
          return;
        case "Escape":
          onEscape?.();
          event.preventDefault();
          return;
        case "Enter":
        case " ":
          if (!isItemDisabled?.(focusedIndex)) {
            onSelect?.(focusedIndex);
          }
          event.preventDefault();
          return;
        default:
          return;
      }

      event.preventDefault();
      moveTo(next);
    },
    [
      enabled,
      itemCount,
      focusedIndex,
      columns,
      direction,
      moveTo,
      onPageUp,
      onPageDown,
      onEscape,
      onSelect,
      isItemDisabled,
    ],
  );

  return { onKeyDown };
}

import { useRef, useCallback, useEffect } from "react";

export type LongPressMouseEvent = React.MouseEvent<HTMLButtonElement> & {
  suppressedByLongPress?: boolean;
};

export interface UseLongPressOptions {
  delay?: number;
  onLongPress: (e: React.PointerEvent | PointerEvent) => void;
  onCancel?: () => void;
}

export function useLongPress({ delay = 500, onLongPress, onCancel }: UseLongPressOptions) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressActive = useRef(false);
  const suppressNextClick = useRef(false);

  const startTimer = useCallback(
    (e: React.PointerEvent) => {
      // Ignore if not primary button (e.g. right click)
      if (e.button !== 0) return;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      isLongPressActive.current = true;
      suppressNextClick.current = false;

      // We need to persist the event because we access it asynchronously in the timeout
      e.persist();

      timerRef.current = setTimeout(() => {
        if (isLongPressActive.current) {
          suppressNextClick.current = true;
          onLongPress(e);
        }
      }, delay);
    },
    [delay, onLongPress],
  );

  const clearTimer = useCallback(
    (_e?: React.PointerEvent) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (isLongPressActive.current && !suppressNextClick.current) {
        onCancel?.();
      }
      isLongPressActive.current = false;
    },
    [onCancel],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    onPointerDown: startTimer,
    onPointerUp: clearTimer,
    onPointerLeave: clearTimer,
    onPointerCancel: clearTimer,
    onClick: (e: LongPressMouseEvent) => {
      if (suppressNextClick.current) {
        e.suppressedByLongPress = true;
        suppressNextClick.current = false; // reset after consumption
      } else {
        e.suppressedByLongPress = false;
      }
    },
  };
}

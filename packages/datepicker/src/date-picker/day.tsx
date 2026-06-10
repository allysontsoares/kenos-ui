import React, { useRef, useCallback } from "react";
import { useDatePickerContext } from "./context";
import {
  isSameDay,
  isInRange,
  isDateDisabled,
  isDateUnavailable,
  isDateSelectable,
  startOfDay,
} from "../utils/date";
import { formatDayAriaLabel } from "../utils/day-aria";
import type { DayCellMeta } from "../types";

const TOUCH_DRAG_DELAY_MS = 200;

export interface DayProps {
  date: Date;
  children?: (meta: DayCellMeta) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Day({ date, children, className, style }: DayProps) {
  const { state, dispatch, config } = useDatePickerContext();
  const today = startOfDay(new Date());
  const disabled = isDateDisabled(date, config);
  const unavailable = isDateUnavailable(date, config);
  const dragActiveRef = useRef(false);
  const suppressClickRef = useRef(false);
  const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const meta: DayCellMeta = {
    date,
    isCurrentMonth: date.getMonth() === state.focusedMonth,
    isToday: isSameDay(date, today),
    isSelected:
      config.mode === "single"
        ? isSameDay(date, state.selectedDate)
        : config.mode === "multiple"
          ? state.selectedDates.some((d) => isSameDay(d, date))
          : isSameDay(date, state.rangeStart) || isSameDay(date, state.rangeEnd),
    isDisabled: disabled,
    isUnavailable: unavailable,
    isRangeStart: isSameDay(date, state.rangeStart),
    isRangeEnd: isSameDay(date, state.rangeEnd ?? state.hoverDate),
    isInRange: isInRange(date, state.rangeStart, state.rangeEnd ?? state.hoverDate),
    isHovered: isSameDay(date, state.hoverDate),
  };

  const isFocused = isSameDay(date, state.focusedDate);
  const canFocus = !disabled;
  const canSelect = isDateSelectable(date, config) && !config.readOnly;

  const ariaLabel = formatDayAriaLabel(date, config.locale, {
    isSelected: meta.isSelected,
    isToday: meta.isToday,
    isUnavailable: unavailable,
    isOutsideMonth: !meta.isCurrentMonth,
  });

  const clearTouchTimer = useCallback(() => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
  }, []);

  const beginRangeDrag = useCallback(
    (target: HTMLElement, pointerId: number) => {
      if (config.mode !== "range" || !canSelect) return;
      dragActiveRef.current = true;
      if (typeof target.setPointerCapture === "function") {
        target.setPointerCapture(pointerId);
      }
      dispatch({ type: "ANCHOR_DATE", date });
    },
    [config.mode, canSelect, dispatch, date],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableCellElement>) => {
      if (suppressClickRef.current) return;
      if (!canSelect) return;
      if (config.mode === "multiple" && (e.ctrlKey || e.metaKey)) {
        dispatch({ type: "TOGGLE_DATE", date });
        return;
      }
      dispatch({ type: "SELECT_DATE", date });
    },
    [canSelect, config.mode, dispatch, date],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLTableCellElement>) => {
      if (config.mode !== "range" || config.readOnly || e.button > 0) return;
      if (!canSelect) return;

      if (e.pointerType === "touch") {
        clearTouchTimer();
        touchTimerRef.current = setTimeout(() => {
          beginRangeDrag(e.currentTarget, e.pointerId);
        }, TOUCH_DRAG_DELAY_MS);
        return;
      }

      beginRangeDrag(e.currentTarget, e.pointerId);
    },
    [config.mode, config.readOnly, canSelect, clearTouchTimer, beginRangeDrag],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLTableCellElement>) => {
      clearTouchTimer();
      if (!dragActiveRef.current) return;
      dragActiveRef.current = false;
      if (
        typeof e.currentTarget.hasPointerCapture === "function" &&
        e.currentTarget.hasPointerCapture(e.pointerId)
      ) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      if (
        config.mode === "range" &&
        state.rangeStart &&
        !state.rangeEnd &&
        state.hoverDate &&
        canSelect
      ) {
        dispatch({ type: "SELECT_DATE", date: state.hoverDate });
      }
      suppressClickRef.current = true;
      requestAnimationFrame(() => {
        suppressClickRef.current = false;
      });
    },
    [
      clearTouchTimer,
      config.mode,
      state.rangeStart,
      state.rangeEnd,
      state.hoverDate,
      canSelect,
      dispatch,
    ],
  );

  const handlePointerCancel = useCallback(
    (e: React.PointerEvent<HTMLTableCellElement>) => {
      clearTouchTimer();
      dragActiveRef.current = false;
      if (
        typeof e.currentTarget.hasPointerCapture === "function" &&
        e.currentTarget.hasPointerCapture(e.pointerId)
      ) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    },
    [clearTouchTimer],
  );

  return (
    <td
      role="gridcell"
      aria-label={ariaLabel}
      aria-selected={meta.isSelected || undefined}
      aria-disabled={disabled || undefined}
      aria-current={meta.isToday ? "date" : undefined}
      tabIndex={isFocused && canFocus ? 0 : -1}
      className={className}
      style={style}
      data-selected={meta.isSelected || undefined}
      data-today={meta.isToday || undefined}
      data-disabled={meta.isDisabled || undefined}
      data-unavailable={meta.isUnavailable || undefined}
      data-outside-month={!meta.isCurrentMonth || undefined}
      data-range-start={meta.isRangeStart || undefined}
      data-range-end={meta.isRangeEnd || undefined}
      data-in-range={meta.isInRange || undefined}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onMouseEnter={() => {
        if (config.mode === "range") dispatch({ type: "HOVER_DATE", date });
      }}
      onMouseLeave={() => {
        if (config.mode === "range" && !dragActiveRef.current) {
          dispatch({ type: "HOVER_DATE", date: null });
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (canSelect) dispatch({ type: "SELECT_DATE", date });
        }
      }}
    >
      {children ? children(meta) : date.getDate()}
    </td>
  );
}

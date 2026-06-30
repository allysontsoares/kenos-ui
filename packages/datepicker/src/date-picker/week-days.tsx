import React from "react";
import { useDatePickerContext } from "./context";
import { buildWeekDays } from "../utils/calendar";
import { getWeekStartDay } from "../utils/locale";

export interface WeekDaysProps {
  format?: "long" | "short" | "narrow";
  className?: string;
}

export function WeekDays({ format = "short", className }: WeekDaysProps) {
  const { config } = useDatePickerContext();
  const weekStartDay = getWeekStartDay(config.locale, config.weekStartsOn);
  const days = buildWeekDays(config.locale, weekStartDay, format);

  return (
    <tr className={className} data-kenos="date-picker-week-days">
      {days.map((day) => (
        <th key={day.ariaLabel} scope="col" abbr={day.ariaLabel} data-kenos="date-picker-week-day">
          {day.label}
        </th>
      ))}
    </tr>
  );
}

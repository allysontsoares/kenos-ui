import React, { useMemo } from "react";
import { useDatePickerContext } from "./context";
import { DatePickerViewContext } from "./context";
import type { ViewMode } from "../types";

export interface ViewProps {
  view: ViewMode;
  children: React.ReactNode;
}

export function View({ view, children }: ViewProps) {
  const { state } = useDatePickerContext();
  const contextValue = useMemo(() => ({ view }), [view]);
  if (state.view !== view) return null;
  return (
    <DatePickerViewContext.Provider value={contextValue}>{children}</DatePickerViewContext.Provider>
  );
}

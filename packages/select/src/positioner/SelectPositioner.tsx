import React, { useLayoutEffect, useMemo } from "react";
import { useFloating } from "@kenos-ui/utils";
import { useSelectContext } from "../context";
import { useSelectStore } from "../store";
import type { SelectPositionerProps } from "../types";
import { PositionerContext } from "./PositionerContext";

export function Positioner({
  children,
  side = "bottom",
  align = "start",
  sideOffset = 4,
  alignOffset = 0,
  avoidCollisions = true,
  collisionPadding = 8,
  sameWidth = false,
}: SelectPositionerProps) {
  const { store, refs } = useSelectContext();
  const open = useSelectStore(store, (s) => s.open);

  const { setReference, setFloating, floatingStyles, isPositioned } = useFloating({
    open,
    side,
    align,
    sideOffset,
    alignOffset,
    avoidCollisions,
    collisionPadding,
    sameWidth,
  });

  useLayoutEffect(() => {
    if (!open) return;
    setReference(refs.triggerRef.current);
  }, [open, refs.triggerRef, setReference]);

  const contextValue = useMemo(
    () => ({
      floatingStyles,
      isPositioned,
      setFloating,
    }),
    [floatingStyles, isPositioned, setFloating],
  );

  return (
    <PositionerContext.Provider value={contextValue}>{children}</PositionerContext.Provider>
  );
}
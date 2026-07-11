import React from "react";
import { useSelectContext } from "../context";
import { useItemContext } from "../item/item-context";
import { useSelectStore } from "../store";

export interface ItemIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The item value to check. When omitted, reads from the nearest `Select.Item`.
   */
  value?: string | undefined;
}

/**
 * Visibility wrapper for a checkmark (or any indicator) when the item is selected.
 */
export function ItemIndicator({ value, children, style, ...props }: ItemIndicatorProps) {
  const item = useItemContext();
  const { store, config } = useSelectContext();
  // Subscribe so the indicator re-renders when selection changes.
  useSelectStore(store, (s) => s.value);

  const targetValue = value ?? item?.value;
  const isSelected =
    targetValue != null
      ? store.isSelected(targetValue, config.multiple, config.isItemEqualToValue)
      : false;

  return (
    <span
      aria-hidden="true"
      data-kenos="select-item-indicator"
      data-state={isSelected ? "checked" : "unchecked"}
      style={{ visibility: isSelected ? undefined : "hidden", ...style }}
      {...props}
    >
      {children}
    </span>
  );
}

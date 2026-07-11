import React from "react";
import { useComboboxContext } from "../context";
import { useItemContext } from "../item/item-context";
import { useComboboxStore } from "../store";

export interface ItemIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The item value to check. When omitted, reads from the nearest `Combobox.Item`.
   */
  value?: string | undefined;
}

/**
 * Visibility wrapper for a checkmark (or any indicator) when the item is selected.
 */
export function ItemIndicator({ value, children, style, ...props }: ItemIndicatorProps) {
  const item = useItemContext();
  const { store, config } = useComboboxContext();
  // Subscribe so the indicator re-renders when selection changes.
  useComboboxStore(store, (s) => s.value);

  const targetValue = value ?? item?.value;
  const isSelected =
    targetValue != null ? store.isSelected(targetValue, config.isItemEqualToValue) : false;

  return (
    <span
      aria-hidden="true"
      data-kenos="combobox-item-indicator"
      data-state={isSelected ? "checked" : "unchecked"}
      style={{ visibility: isSelected ? undefined : "hidden", ...style }}
      {...props}
    >
      {children}
    </span>
  );
}

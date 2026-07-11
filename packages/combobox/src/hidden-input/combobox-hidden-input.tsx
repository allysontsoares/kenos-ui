import React from "react";
import { useComboboxContext } from "../context";
import { useComboboxStore } from "../store";

/**
 * Native hidden field for form submission. Renders only when `name` is set on Root.
 */
export function HiddenInput() {
  const { store, config } = useComboboxContext();
  const value = useComboboxStore(store, (s) => s.value);

  if (!config.name) return null;

  return (
    <input
      type="hidden"
      name={config.name}
      value={value ?? ""}
      disabled={config.disabled || undefined}
      required={config.required || undefined}
      readOnly={config.readOnly || undefined}
      data-part="hidden-input"
      data-kenos="combobox-hidden-input"
    />
  );
}

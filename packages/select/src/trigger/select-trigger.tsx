import React, { useCallback } from "react";
import { useSelectContext } from "../context";
import { useSelectStore } from "../store";

export type TriggerProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-haspopup" | "aria-expanded" | "aria-controls"
> & {
  /**
   * When true, focusing the trigger opens the listbox.
   * Overrides `openOnFocus` on `<Select.Root>` when set.
   */
  openOnFocus?: boolean | undefined;
};

export function Trigger({
  children,
  onClick,
  onFocus,
  onKeyDown,
  disabled,
  openOnFocus: openOnFocusProp,
  ...props
}: TriggerProps) {
  const { store, ids, refs, config, close, open, selectValue, suppressOpenOnFocusRef } =
    useSelectContext();
  const isOpen = useSelectStore(store, (s) => s.open);
  const openSource = useSelectStore(store, (s) => s.openSource);
  const highlightedValue = useSelectStore(store, (s) => s.highlightedValue);
  const items = useSelectStore(store, (s) => s.items);

  const isDisabled = disabled ?? config.disabled;
  const isReadOnly = config.readOnly;
  const openOnFocus = openOnFocusProp ?? config.openOnFocus;

  // aria-activedescendant lives on the focused element only (pointer open → trigger).
  const activeDescendantId =
    isOpen && openSource === "pointer" && highlightedValue != null
      ? `${ids.content}-opt-${highlightedValue}`
      : undefined;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled || isReadOnly) return;
      if (isOpen) {
        close();
      } else {
        open("pointer");
      }
      onClick?.(e);
    },
    [isDisabled, isReadOnly, isOpen, close, open, onClick],
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLButtonElement>) => {
      if (openOnFocus && !suppressOpenOnFocusRef.current && !isDisabled && !isReadOnly && !isOpen) {
        open("keyboard");
      }
      onFocus?.(e);
    },
    [openOnFocus, suppressOpenOnFocusRef, isDisabled, isReadOnly, isOpen, open, onFocus],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (isDisabled || isReadOnly) {
        onKeyDown?.(e);
        return;
      }

      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open("keyboard");
        }
        onKeyDown?.(e);
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        close();
        onKeyDown?.(e);
        return;
      }

      // Pointer-open: focus stays on trigger — handle list keys here.
      if (openSource === "pointer") {
        const navItems = Array.from(items.values());

        if (e.key === "Enter" || e.key === " ") {
          if (highlightedValue != null) {
            e.preventDefault();
            const item = items.get(highlightedValue);
            if (item && !item.disabled) {
              selectValue(highlightedValue);
            }
          }
          onKeyDown?.(e);
          return;
        }

        if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Home" || e.key === "End") {
          e.preventDefault();
          const enabled = navItems.filter((item) => !item.disabled);
          if (enabled.length === 0) {
            onKeyDown?.(e);
            return;
          }

          const currentIndex = highlightedValue
            ? enabled.findIndex((item) => item.value === highlightedValue)
            : -1;

          let nextIndex = currentIndex;
          if (e.key === "Home") {
            nextIndex = 0;
          } else if (e.key === "End") {
            nextIndex = enabled.length - 1;
          } else if (e.key === "ArrowDown") {
            nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % enabled.length;
          } else {
            nextIndex =
              currentIndex < 0
                ? enabled.length - 1
                : (currentIndex - 1 + enabled.length) % enabled.length;
          }

          const next = enabled[nextIndex];
          if (next) store.setHighlightedValue(next.value);
        }
      }

      onKeyDown?.(e);
    },
    [
      isDisabled,
      isReadOnly,
      isOpen,
      open,
      openSource,
      items,
      highlightedValue,
      close,
      selectValue,
      store,
      onKeyDown,
    ],
  );

  return (
    <button
      ref={refs.triggerRef}
      type="button"
      id={ids.trigger}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-controls={isOpen ? ids.content : undefined}
      aria-labelledby={ids.label ? `${ids.label} ${ids.trigger}` : undefined}
      aria-activedescendant={activeDescendantId}
      aria-disabled={isDisabled || isReadOnly || undefined}
      data-kenos="select-trigger"
      data-disabled={isDisabled || isReadOnly ? "true" : undefined}
      data-open={isOpen ? "true" : undefined}
      data-state={isOpen ? "open" : "closed"}
      disabled={isDisabled || isReadOnly}
      onClick={handleClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </button>
  );
}

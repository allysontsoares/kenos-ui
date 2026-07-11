import React, { useRef, useLayoutEffect, useCallback, useMemo } from "react";
import { useSelectContext } from "../context";
import { useGroupContext } from "../group/group-context";
import { useSelectStore } from "../store";
import { ItemContext } from "./item-context";

export interface ItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
  disabled?: boolean | undefined;
  textValue?: string | undefined;
}

Item.displayName = "Select.Item";

function extractItemTextLabel(children: React.ReactNode): string | null {
  let label: string | null = null;

  React.Children.forEach(children, (child) => {
    if (label != null || !React.isValidElement(child)) return;
    const type = child.type as { displayName?: string; name?: string };
    const isItemText = type?.displayName === "Select.ItemText" || type?.name === "ItemText";
    if (!isItemText) return;
    const text = React.Children.toArray((child.props as { children?: React.ReactNode }).children)
      .filter((c): c is string | number => typeof c === "string" || typeof c === "number")
      .join("");
    if (text) label = text;
  });

  return label;
}

export function Item({
  value,
  disabled = false,
  textValue,
  children,
  onClick,
  onPointerMove,
  ...props
}: ItemProps) {
  const { store, ids, config, selectValue } = useSelectContext();
  const group = useGroupContext();
  const selectedValue = useSelectStore(store, (s) => s.value);
  const highlightedValue = useSelectStore(store, (s) => s.highlightedValue);
  const liRef = useRef<HTMLLIElement>(null);

  const isSelected = config.multiple
    ? Array.isArray(selectedValue) &&
      selectedValue.some((item) => config.isItemEqualToValue(item, value))
    : typeof selectedValue === "string" && config.isItemEqualToValue(selectedValue, value);
  const isHighlighted = highlightedValue === value;
  const isDisabled = disabled || config.disabled || config.readOnly;

  useLayoutEffect(() => {
    const label = textValue ?? extractItemTextLabel(children) ?? value;

    store.registerItem({
      value,
      label,
      textValue: textValue ?? label,
      disabled: isDisabled,
      ref: liRef.current,
      groupId: group?.groupId ?? null,
    });

    return () => store.unregisterItem(value);
  }, [value, isDisabled, store, textValue, children, group?.groupId]);

  useLayoutEffect(() => {
    store.updateItemRef(value, liRef.current);
  });

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      if (isDisabled) return;
      selectValue(value);
      onClick?.(e);
    },
    [isDisabled, selectValue, value, onClick],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLLIElement>) => {
      if (!isDisabled) store.setHighlightedValue(value);
      onPointerMove?.(e);
    },
    [isDisabled, store, value, onPointerMove],
  );

  const itemContext = useMemo(() => ({ value, isSelected }), [value, isSelected]);

  return (
    <ItemContext.Provider value={itemContext}>
      <li
        ref={liRef}
        id={`${ids.content}-opt-${value}`}
        role="option"
        aria-selected={isSelected}
        aria-disabled={isDisabled || undefined}
        data-kenos="select-item"
        data-highlighted={isHighlighted ? "true" : undefined}
        data-selected={isSelected ? "true" : undefined}
        data-disabled={isDisabled ? "true" : undefined}
        tabIndex={-1}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        {...props}
      >
        {children}
      </li>
    </ItemContext.Provider>
  );
}

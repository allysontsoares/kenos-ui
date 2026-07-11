import React, { useId, useMemo, useRef, useEffect, useCallback } from "react";
import { restoreFocus } from "@kenos-ui/utils";
import { ComboboxStore } from "../store";
import { ComboboxContext } from "../context";
import type { ComboboxRootProps } from "../types";

const defaultIsItemEqualToValue = (a: string, b: string) => a === b;

function resolveLabel(
  value: string | null,
  items: Map<string, { label: string }>,
  staticItems: Record<string, string>,
): string {
  if (value == null) return "";
  return items.get(value)?.label ?? staticItems[value] ?? value;
}

export function Root(props: ComboboxRootProps) {
  const {
    children,
    value,
    defaultValue,
    onValueChange,
    inputValue,
    defaultInputValue,
    onInputValueChange,
    open,
    defaultOpen,
    onOpenChange,
    onOpenChangeComplete,
    name,
    disabled = false,
    required = false,
    readOnly = false,
    modal = false,
    openOnFocus = false,
    openOnChange = true,
    id,
    items = {},
    isItemEqualToValue = defaultIsItemEqualToValue,
    filter,
  } = props;

  const uid = useId();
  const prefix = id ?? `cbx-${uid.replace(/:/g, "")}`;

  const ids = useMemo(
    () => ({
      root: prefix,
      label: `${prefix}-label`,
      input: `${prefix}-input`,
      trigger: `${prefix}-trigger`,
      content: `${prefix}-content`,
    }),
    [prefix],
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const suppressOpenOnFocusRef = useRef(false);
  const syncingValueFromPropsRef = useRef(false);
  const syncingOpenFromPropsRef = useRef(false);
  const syncingInputValueFromPropsRef = useRef(false);
  const valuePropRef = useRef(value);
  valuePropRef.current = value;
  const openPropRef = useRef(open);
  openPropRef.current = open;
  const inputValuePropRef = useRef(inputValue);
  inputValuePropRef.current = inputValue;
  const isControlledValueRef = useRef(value !== undefined);
  isControlledValueRef.current = value !== undefined;
  const isControlledOpenRef = useRef(open !== undefined);
  isControlledOpenRef.current = open !== undefined;
  const isControlledInputValueRef = useRef(inputValue !== undefined);
  isControlledInputValueRef.current = inputValue !== undefined;

  const isControlledValue = value !== undefined;
  const isControlledOpen = open !== undefined;
  const isControlledInputValue = inputValue !== undefined;

  const initialValue = isControlledValue ? (value ?? null) : (defaultValue ?? null);
  const initialInputValue = isControlledInputValue
    ? (inputValue ?? "")
    : (defaultInputValue ?? resolveLabel(initialValue, new Map(), items));

  const storeRef = useRef<ComboboxStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = new ComboboxStore({
      value: initialValue,
      inputValue: initialInputValue,
      open: isControlledOpen ? (open ?? false) : (defaultOpen ?? false),
      openSource: (isControlledOpen ? open : defaultOpen) ? "input" : null,
    });
  }
  const store = storeRef.current;

  // When items register, upgrade inputValue from the raw value key to the real label
  // (initial resolveLabel falls back to the value string when the registry is empty).
  useEffect(() => {
    return store.subscribe(() => {
      if (isControlledInputValueRef.current) return;
      const state = store.getState();
      if (typeof state.value !== "string") return;
      const label = state.items.get(state.value)?.label ?? items[state.value] ?? null;
      if (!label || label === state.value) return;
      if (state.inputValue === state.value) {
        store.setInputValue(label);
      }
    });
  }, [store, items]);

  const prevControlledValue = useRef(value);
  useEffect(() => {
    if (!isControlledValue) return;
    if (value === prevControlledValue.current) return;
    prevControlledValue.current = value;
    syncingValueFromPropsRef.current = true;
    store.setValue(typeof value === "string" ? value : null);
  }, [isControlledValue, value, store]);

  const prevControlledInputValue = useRef(inputValue);
  useEffect(() => {
    if (!isControlledInputValue) return;
    if (inputValue === prevControlledInputValue.current) return;
    prevControlledInputValue.current = inputValue;
    syncingInputValueFromPropsRef.current = true;
    store.setInputValue(inputValue ?? "");
  }, [isControlledInputValue, inputValue, store]);

  const prevControlledOpen = useRef(open);
  useEffect(() => {
    if (!isControlledOpen) return;
    if (open === prevControlledOpen.current) return;
    prevControlledOpen.current = open;

    syncingOpenFromPropsRef.current = true;
    const nextOpen = open ?? false;
    if (!nextOpen) {
      const state = store.getState();
      store.setOpen(false);
      if (state.open) {
        suppressOpenOnFocusRef.current = true;
        restoreFocus({
          openSource: "input",
          input: inputRef.current,
          trigger: triggerRef.current,
        });
        requestAnimationFrame(() => {
          suppressOpenOnFocusRef.current = false;
        });
      }
    } else {
      store.setOpen(true, "input");
    }
  }, [isControlledOpen, open, store]);

  const onValueChangeRef = useRef(onValueChange);
  onValueChangeRef.current = onValueChange;

  const prevStoreValue = useRef(store.getState().value);
  useEffect(() => {
    return store.subscribe(() => {
      const state = store.getState();
      if (state.value === prevStoreValue.current) return;

      if (syncingValueFromPropsRef.current) {
        syncingValueFromPropsRef.current = false;
        prevStoreValue.current = state.value;
        return;
      }

      prevStoreValue.current = state.value;
      onValueChangeRef.current?.(typeof state.value === "string" ? state.value : null);

      if (isControlledValueRef.current) {
        queueMicrotask(() => {
          const propValue = valuePropRef.current;
          const current = store.getState().value;
          if (propValue !== current) {
            syncingValueFromPropsRef.current = true;
            store.setValue(typeof propValue === "string" ? propValue : null);
          }
        });
      }
    });
  }, [store]);

  const onInputValueChangeRef = useRef(onInputValueChange);
  onInputValueChangeRef.current = onInputValueChange;

  const prevStoreInputValue = useRef(store.getState().inputValue);
  useEffect(() => {
    return store.subscribe(() => {
      const state = store.getState();
      if (state.inputValue === prevStoreInputValue.current) return;

      if (syncingInputValueFromPropsRef.current) {
        syncingInputValueFromPropsRef.current = false;
        prevStoreInputValue.current = state.inputValue;
        return;
      }

      prevStoreInputValue.current = state.inputValue;
      onInputValueChangeRef.current?.(state.inputValue);

      if (isControlledInputValueRef.current) {
        queueMicrotask(() => {
          const propInputValue = inputValuePropRef.current ?? "";
          const current = store.getState().inputValue;
          if (propInputValue !== current) {
            syncingInputValueFromPropsRef.current = true;
            store.setInputValue(propInputValue);
          }
        });
      }
    });
  }, [store]);

  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;

  const prevStoreOpen = useRef(store.getState().open);
  useEffect(() => {
    return store.subscribe(() => {
      const state = store.getState();
      if (state.open === prevStoreOpen.current) return;

      if (syncingOpenFromPropsRef.current) {
        syncingOpenFromPropsRef.current = false;
        prevStoreOpen.current = state.open;
        return;
      }

      prevStoreOpen.current = state.open;
      onOpenChangeRef.current?.(state.open);

      if (isControlledOpenRef.current) {
        queueMicrotask(() => {
          const propOpen = openPropRef.current ?? false;
          const current = store.getState().open;
          if (propOpen !== current) {
            syncingOpenFromPropsRef.current = true;
            store.setOpen(propOpen, propOpen ? "input" : null);
          }
        });
      }
    });
  }, [store]);

  const close = useCallback(() => {
    const state = store.getState();
    if (!state.open) return;
    suppressOpenOnFocusRef.current = true;
    store.setOpen(false);
    // Input-first: always restore to the combobox input.
    restoreFocus({
      openSource: "input",
      input: inputRef.current,
      trigger: triggerRef.current,
    });
    requestAnimationFrame(() => {
      suppressOpenOnFocusRef.current = false;
    });
  }, [store]);

  const selectValue = useCallback(
    (itemValue: string) => {
      const item = store.getState().items.get(itemValue);
      const label = item?.label ?? items[itemValue] ?? itemValue;
      store.setValue(itemValue);
      store.setInputValue(label);
      close();
    },
    [store, close, items],
  );

  const clearValue = useCallback(() => {
    store.clearValue();
  }, [store]);

  const config = useMemo(
    () => ({
      disabled,
      required,
      readOnly,
      modal,
      name,
      items,
      isItemEqualToValue,
      openOnFocus,
      openOnChange,
      filter:
        filter ??
        ((item, query) => {
          const normalized = query.trim().toLowerCase();
          if (!normalized) return true;
          return (
            item.textValue.toLowerCase().includes(normalized) ||
            item.label.toLowerCase().includes(normalized)
          );
        }),
    }),
    [
      disabled,
      required,
      readOnly,
      modal,
      name,
      items,
      isItemEqualToValue,
      openOnFocus,
      openOnChange,
      filter,
    ],
  );

  const ctx = useMemo(
    () => ({
      store,
      ids,
      refs: { inputRef, triggerRef, contentRef, listRef },
      config,
      isControlledValue,
      isControlledOpen,
      isControlledInputValue,
      onOpenChangeComplete,
      close,
      selectValue,
      clearValue,
      suppressOpenOnFocusRef,
    }),
    [
      store,
      ids,
      config,
      isControlledValue,
      isControlledOpen,
      isControlledInputValue,
      onOpenChangeComplete,
      close,
      selectValue,
      clearValue,
    ],
  );

  return <ComboboxContext.Provider value={ctx}>{children}</ComboboxContext.Provider>;
}

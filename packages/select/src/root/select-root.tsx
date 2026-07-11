import React, { useId, useMemo, useRef, useEffect, useCallback } from "react";
import { restoreFocus } from "@kenos-ui/utils";
import { SelectStore } from "../store";
import { SelectContext } from "../context";
import type { SelectRootProps } from "../types";
import { extractItemsFromChildren } from "../utils/extract-items";
import { scrollToIndexInState } from "../utils/scroll-to-index";
import type { ScrollToIndexOptions } from "../types";

const defaultIsItemEqualToValue = (a: string, b: string) => a === b;

function valuesEqual(
  a: string | string[] | null | undefined,
  b: string | string[] | null | undefined,
): boolean {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  return false;
}

export function Root(props: SelectRootProps) {
  const {
    children,
    value,
    defaultValue,
    onValueChange,
    open,
    defaultOpen,
    onOpenChange,
    onOpenChangeComplete,
    name,
    disabled = false,
    required = false,
    readOnly = false,
    modal = false,
    id,
    items = {},
    isItemEqualToValue = defaultIsItemEqualToValue,
    multiple = false,
    openOnFocus = false,
  } = props;

  const uid = useId();
  const prefix = id ?? `sel-${uid.replace(/:/g, "")}`;

  const ids = useMemo(
    () => ({
      root: prefix,
      label: `${prefix}-label`,
      trigger: `${prefix}-trigger`,
      content: `${prefix}-content`,
    }),
    [prefix],
  );

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const suppressOpenOnFocusRef = useRef(false);
  const syncingValueFromPropsRef = useRef(false);
  const syncingOpenFromPropsRef = useRef(false);
  const valuePropRef = useRef(value);
  valuePropRef.current = value;
  const openPropRef = useRef(open);
  openPropRef.current = open;
  const isControlledValueRef = useRef(value !== undefined);
  isControlledValueRef.current = value !== undefined;
  const isControlledOpenRef = useRef(open !== undefined);
  isControlledOpenRef.current = open !== undefined;

  const isControlledValue = value !== undefined;
  const isControlledOpen = open !== undefined;

  const initialValue = isControlledValue
    ? multiple
      ? (value ?? [])
      : (value ?? null)
    : multiple
      ? (defaultValue ?? [])
      : (defaultValue ?? null);

  const storeRef = useRef<SelectStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = new SelectStore({
      value: initialValue,
      // Programmatic / defaultOpen behaves like keyboard (focus into content).
      open: isControlledOpen ? (open ?? false) : (defaultOpen ?? false),
      openSource: (isControlledOpen ? open : defaultOpen) ? "keyboard" : null,
    });
  }
  const store = storeRef.current;

  const prevControlledValue = useRef(value);
  useEffect(() => {
    if (!isControlledValue) return;
    if (valuesEqual(value, prevControlledValue.current)) return;
    prevControlledValue.current = value;

    syncingValueFromPropsRef.current = true;
    if (multiple) {
      store.setValues(Array.isArray(value) ? value : []);
    } else {
      store.setValue(typeof value === "string" ? value : null);
    }
  }, [isControlledValue, value, store, multiple]);

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
          openSource: "trigger",
          trigger: triggerRef.current,
        });
        requestAnimationFrame(() => {
          suppressOpenOnFocusRef.current = false;
        });
      }
    } else {
      store.setOpen(true, "keyboard");
    }
  }, [isControlledOpen, open, store]);

  const onValueChangeRef = useRef(onValueChange);
  onValueChangeRef.current = onValueChange;

  const prevStoreValue = useRef(store.getState().value);
  useEffect(() => {
    return store.subscribe(() => {
      const state = store.getState();
      if (valuesEqual(state.value, prevStoreValue.current)) return;

      if (syncingValueFromPropsRef.current) {
        syncingValueFromPropsRef.current = false;
        prevStoreValue.current = state.value;
        return;
      }

      prevStoreValue.current = state.value;

      if (multiple) {
        (onValueChangeRef.current as ((value: string[]) => void) | undefined)?.(
          Array.isArray(state.value) ? state.value : [],
        );
      } else {
        (onValueChangeRef.current as ((value: string | null) => void) | undefined)?.(
          typeof state.value === "string" ? state.value : null,
        );
      }

      // Controlled rollback: if parent ignored onValueChange, restore prop value.
      if (isControlledValueRef.current) {
        queueMicrotask(() => {
          const propValue = valuePropRef.current;
          const current = store.getState().value;
          if (!valuesEqual(propValue, current)) {
            syncingValueFromPropsRef.current = true;
            if (multiple) {
              store.setValues(Array.isArray(propValue) ? propValue : []);
            } else {
              store.setValue(typeof propValue === "string" ? propValue : null);
            }
          }
        });
      }
    });
  }, [store, multiple]);

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
            store.setOpen(propOpen, propOpen ? "keyboard" : null);
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
    restoreFocus({
      openSource: "trigger",
      trigger: triggerRef.current,
    });
    requestAnimationFrame(() => {
      suppressOpenOnFocusRef.current = false;
    });
  }, [store]);

  const openListbox = useCallback(
    (source: "pointer" | "keyboard") => {
      if (store.getState().open) return;
      store.setOpen(true, source);
    },
    [store],
  );

  const selectValue = useCallback(
    (itemValue: string) => {
      if (multiple) {
        store.toggleValue(itemValue, isItemEqualToValue);
        return;
      }
      store.setValue(itemValue);
      close();
    },
    [store, close, multiple, isItemEqualToValue],
  );

  const clearValue = useCallback(() => {
    store.clearValue(multiple);
  }, [store, multiple]);

  const scrollToIndex = useCallback(
    (index: number, options?: ScrollToIndexOptions) => {
      scrollToIndexInState(store.getState(), index, options);
    },
    [store],
  );

  const discoveredItems = useMemo(() => extractItemsFromChildren(children), [children]);
  const mergedItems = useMemo(() => ({ ...discoveredItems, ...items }), [discoveredItems, items]);

  const config = useMemo(
    () => ({
      disabled,
      required,
      readOnly,
      modal,
      name,
      multiple,
      items: mergedItems,
      isItemEqualToValue,
      openOnFocus,
    }),
    [
      disabled,
      required,
      readOnly,
      modal,
      name,
      multiple,
      mergedItems,
      isItemEqualToValue,
      openOnFocus,
    ],
  );

  const ctx = useMemo(
    () => ({
      store,
      ids,
      refs: { triggerRef, contentRef, listRef },
      config,
      isControlledValue,
      isControlledOpen,
      onOpenChangeComplete,
      close,
      open: openListbox,
      selectValue,
      selectAndClose: selectValue,
      clearValue,
      scrollToIndex,
      suppressOpenOnFocusRef,
    }),
    [
      store,
      ids,
      config,
      isControlledValue,
      isControlledOpen,
      onOpenChangeComplete,
      close,
      openListbox,
      selectValue,
      clearValue,
      scrollToIndex,
    ],
  );

  return <SelectContext.Provider value={ctx}>{children}</SelectContext.Provider>;
}

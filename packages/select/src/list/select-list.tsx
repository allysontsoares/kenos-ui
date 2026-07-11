import React, { useEffect } from "react";
import { useSelectContext } from "../context";
import { useSelectStore } from "../store";

export type ListProps = React.HTMLAttributes<HTMLUListElement> & {
  /**
   * When set, scrolls the list to the item at this index.
   * Useful with virtualization or controlled scroll sync.
   */
  scrollToIndex?: number | undefined;
};

export function List({ children, scrollToIndex, ...props }: ListProps) {
  const { store, ids, refs, config, scrollToIndex: scrollToIndexFn } = useSelectContext();
  const isOpen = useSelectStore(store, (s) => s.open);
  const openSource = useSelectStore(store, (s) => s.openSource);
  const highlightedValue = useSelectStore(store, (s) => s.highlightedValue);

  useEffect(() => {
    if (scrollToIndex == null || scrollToIndex < 0) return;
    scrollToIndexFn(scrollToIndex);
  }, [scrollToIndex, scrollToIndexFn]);

  // aria-activedescendant on the focused listbox (keyboard open path).
  const activeDescendantId =
    isOpen && openSource === "keyboard" && highlightedValue != null
      ? `${ids.content}-opt-${highlightedValue}`
      : undefined;

  return (
    <ul
      ref={refs.listRef}
      role="listbox"
      id={`${ids.content}-list`}
      tabIndex={-1}
      aria-labelledby={ids.label}
      aria-multiselectable={config.multiple ? true : undefined}
      aria-activedescendant={activeDescendantId}
      data-kenos="select-list"
      {...props}
    >
      {children}
    </ul>
  );
}

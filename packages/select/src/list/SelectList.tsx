import React from "react";
import { useSelectContext } from "../context";

export type ListProps = React.HTMLAttributes<HTMLUListElement>;

export function List({ children, ...props }: ListProps) {
  const { ids, refs, config } = useSelectContext();

  return (
    <ul
      ref={refs.listRef}
      role="listbox"
      id={`${ids.content}-list`}
      aria-labelledby={ids.label}
      aria-multiselectable={config.multiple ? true : undefined}
      {...props}
    >
      {children}
    </ul>
  );
}
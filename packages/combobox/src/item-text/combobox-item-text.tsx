import React from "react";

export type ItemTextProps = React.HTMLAttributes<HTMLSpanElement>;

/** Text label for a Combobox.Item. */
export function ItemText({ children, ...props }: ItemTextProps) {
  return (
    <span data-kenos="combobox-item-text" {...props}>
      {children}
    </span>
  );
}

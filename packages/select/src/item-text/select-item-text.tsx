import React from "react";

export type ItemTextProps = React.HTMLAttributes<HTMLSpanElement>;

/** Text label for a Select.Item — also used by Select.Value to display the selected label. */
export function ItemText({ children, ...props }: ItemTextProps) {
  return (
    <span data-kenos="select-item-text" {...props}>
      {children}
    </span>
  );
}

ItemText.displayName = "Select.ItemText";

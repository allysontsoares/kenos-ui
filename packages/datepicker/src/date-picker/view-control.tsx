import React from "react";

export type ViewControlProps = React.HTMLAttributes<HTMLDivElement>;

export function ViewControl({ children, ...props }: ViewControlProps) {
  return (
    <div
      role="group"
      data-kenos="date-picker-view-control"
      data-date-picker-view-control
      {...props}
    >
      {children}
    </div>
  );
}

import React from "react";
import { useGroupContext } from "../group/group-context";

export type GroupLabelProps = React.HTMLAttributes<HTMLDivElement>;

export function GroupLabel({ children, ...props }: GroupLabelProps) {
  const group = useGroupContext();

  return (
    <div id={group?.labelId} {...props}>
      {children}
    </div>
  );
}

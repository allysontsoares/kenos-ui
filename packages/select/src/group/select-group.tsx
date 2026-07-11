import React, { useId, useMemo } from "react";
import { GroupContext } from "./group-context";

export type GroupProps = React.HTMLAttributes<HTMLDivElement>;

export function Group({ children, ...props }: GroupProps) {
  const groupId = useId();
  const labelId = `${groupId}-label`;
  const contextValue = useMemo(() => ({ groupId, labelId }), [groupId, labelId]);

  return (
    <GroupContext.Provider value={contextValue}>
      <div role="group" aria-labelledby={labelId} data-kenos="select-group" {...props}>
        {children}
      </div>
    </GroupContext.Provider>
  );
}

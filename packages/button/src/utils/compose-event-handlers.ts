import type * as React from "react";

export function composeEventHandlers<E extends React.SyntheticEvent | Event>(
  internal?: (event: E) => void,
  external?: (event: E) => void,
  options?: { checkDefaultPrevented?: boolean },
) {
  return (event: E) => {
    internal?.(event);
    if (options?.checkDefaultPrevented === false || !(event as any).defaultPrevented) {
      external?.(event);
    }
  };
}

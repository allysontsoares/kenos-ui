import { useState, useCallback } from "react";

export function useHover() {
  const [isHovered, setIsHovered] = useState(false);

  const onPointerEnter = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse") {
      setIsHovered(true);
    }
  }, []);

  const onPointerLeave = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse") {
      setIsHovered(false);
    }
  }, []);

  return {
    isHovered,
    hoverProps: {
      onPointerEnter,
      onPointerLeave,
    },
  };
}

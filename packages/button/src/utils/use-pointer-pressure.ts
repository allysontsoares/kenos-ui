import { useState, useEffect, type RefObject } from "react";

export function usePointerPressure(
  ref: RefObject<HTMLElement | null>,
  onForceChange?: (force: number) => void,
) {
  const [force, setForce] = useState(0);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Feature check for Safari Force Touch events
    const supported = typeof window !== "undefined" && "onwebkitmouseforcechanged" in window;
    setIsSupported(supported);

    if (!supported || !ref.current) return;

    const element = ref.current;

    const handleForceChange = (e: any) => {
      const currentForce = e.webkitForce || 0;
      setForce(currentForce);
      onForceChange?.(currentForce);
    };

    element.addEventListener("webkitmouseforcechanged", handleForceChange);
    element.addEventListener("webkitmouseforcedown", handleForceChange);
    element.addEventListener("webkitmouseforceup", handleForceChange);

    return () => {
      element.removeEventListener("webkitmouseforcechanged", handleForceChange);
      element.removeEventListener("webkitmouseforcedown", handleForceChange);
      element.removeEventListener("webkitmouseforceup", handleForceChange);
    };
  }, [ref, onForceChange]);

  return { force, isSupported };
}

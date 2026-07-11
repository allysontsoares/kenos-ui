import { useEffect, useState } from "react";
import { isPinchZoomed, isSafariPinchZoomed } from "./visual-viewport";

/**
 * Subscribes to `visualViewport` resize/scroll so pinch-zoom changes re-render.
 */
export function useIsPinchZoomed(): boolean {
  const [pinched, setPinched] = useState(() =>
    typeof window === "undefined" ? false : isPinchZoomed(),
  );

  useEffect(() => {
    const vv = window.visualViewport;
    const update = () => setPinched(isPinchZoomed());
    update();

    vv?.addEventListener("resize", update);
    vv?.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      vv?.removeEventListener("resize", update);
      vv?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return pinched;
}

/** Safari-only variant used to disable `alignItemWithTrigger`. */
export function useIsSafariPinchZoomed(): boolean {
  const [pinched, setPinched] = useState(() =>
    typeof window === "undefined" ? false : isSafariPinchZoomed(),
  );

  useEffect(() => {
    const vv = window.visualViewport;
    const update = () => setPinched(isSafariPinchZoomed());
    update();

    vv?.addEventListener("resize", update);
    vv?.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      vv?.removeEventListener("resize", update);
      vv?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return pinched;
}

import { useLayoutEffect, useState } from "react";
import { useIsSafariPinchZoomed, type FloatingSide } from "@kenos-ui/utils";
import type { SelectRefs } from "../context";
import { getAlignItemWithTriggerOffset, shouldDisableFlipForAlign } from "./align-with-trigger";

export interface AlignItemWithTriggerOptions {
  alignItemWithTrigger: boolean;
  side: FloatingSide;
  sideOffset: number;
  open: boolean;
  refs: SelectRefs;
}

/**
 * Cover-trigger offset for Select Content.
 * On Safari pinch-zoom, falls back to standard anchoring (Base UI #1139).
 */
export function useAlignItemWithTrigger({
  alignItemWithTrigger,
  side,
  sideOffset,
  open,
  refs,
}: AlignItemWithTriggerOptions) {
  const safariPinchZoomed = useIsSafariPinchZoomed();
  const effectiveAlign = alignItemWithTrigger && !safariPinchZoomed;
  const [triggerHeight, setTriggerHeight] = useState(0);

  useLayoutEffect(() => {
    if (!effectiveAlign || !open) {
      setTriggerHeight(0);
      return;
    }

    const trigger = refs.triggerRef.current;
    if (!trigger) return;

    const update = () => setTriggerHeight(trigger.offsetHeight);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(trigger);

    return () => observer.disconnect();
  }, [effectiveAlign, open, refs.triggerRef]);

  const effectiveSideOffset = getAlignItemWithTriggerOffset(
    effectiveAlign,
    side,
    triggerHeight,
    sideOffset,
  );

  const avoidCollisionsOverride = shouldDisableFlipForAlign(effectiveAlign) ? false : undefined;

  return {
    alignItemWithTriggerActive: effectiveAlign && triggerHeight > 0,
    effectiveSideOffset,
    avoidCollisionsOverride,
    /** True when the requested align mode was disabled due to Safari pinch-zoom. */
    alignItemWithTriggerFallback: alignItemWithTrigger && safariPinchZoomed,
  };
}

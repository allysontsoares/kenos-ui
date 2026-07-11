/**
 * Browser helpers for Safari pinch-zoom / visual viewport edge cases
 * mirrored from Base UI Select behavior (mui/base-ui#1139, #4485).
 */

const PINCH_EPS = 0.001;

/** True for Safari / AppleWebKit without Chromium/Firefox branding. */
export function isAppleWebKit(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /AppleWebKit/i.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS/i.test(ua);
}

/** Current `visualViewport.scale`, or `1` when unavailable (SSR / old browsers). */
export function getVisualViewportScale(): number {
  if (typeof window === "undefined") return 1;
  return window.visualViewport?.scale ?? 1;
}

/** Pinch-zoom active on any browser (`visualViewport.scale !== 1`). */
export function isPinchZoomed(): boolean {
  return Math.abs(getVisualViewportScale() - 1) > PINCH_EPS;
}

/**
 * Safari-only pinch zoom — Base UI falls back from `alignItemWithTrigger`
 * to standard anchoring in this state.
 */
export function isSafariPinchZoomed(): boolean {
  return isAppleWebKit() && isPinchZoomed();
}

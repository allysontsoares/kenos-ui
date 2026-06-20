import { useCallback, useEffect, useState } from "react";

export type HapticIntensity = "light" | "medium" | "heavy";

export function useHapticFeedback() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Basic support check
    const hasVibrate = typeof navigator !== "undefined" && "vibrate" in navigator;
    // iOS switch trick: assumed possible if it's an iOS device
    const isIOS =
      typeof navigator !== "undefined" &&
      (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

    setIsSupported(hasVibrate || isIOS);

    if (isIOS) {
      // Setup singleton for iOS switch trick
      let checkbox = document.getElementById("kenos-haptic-trigger") as HTMLInputElement | null;
      if (!checkbox) {
        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "kenos-haptic-trigger";
        checkbox.setAttribute("aria-hidden", "true");
        checkbox.tabIndex = -1;
        // visually hidden but interactable by code
        Object.assign(checkbox.style, {
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          opacity: "0",
          pointerEvents: "none",
        });
        document.body.appendChild(checkbox);
      }
    }
  }, []);

  const trigger = useCallback((intensity: HapticIntensity = "medium") => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      // Android / Chrome
      const duration = intensity === "light" ? 10 : intensity === "heavy" ? 40 : 20;
      navigator.vibrate(duration);
      return;
    }

    // iOS Safari switch trick
    const checkbox = document.getElementById("kenos-haptic-trigger") as HTMLInputElement | null;
    if (checkbox) {
      // Toggling the checkbox simulates the native switch interaction
      checkbox.checked = !checkbox.checked;
    }
  }, []);

  return { trigger, isSupported };
}

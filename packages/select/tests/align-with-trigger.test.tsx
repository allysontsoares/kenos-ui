import { describe, expect, it } from "vitest";
import {
  getAlignItemWithTriggerOffset,
  shouldDisableFlipForAlign,
} from "../src/utils/align-with-trigger";

describe("align-with-trigger helpers", () => {
  it("returns plain sideOffset when align is off", () => {
    expect(getAlignItemWithTriggerOffset(false, "bottom", 40, 4)).toBe(4);
  });

  it("offsets by negative trigger height for bottom/top", () => {
    expect(getAlignItemWithTriggerOffset(true, "bottom", 40, 4)).toBe(-36);
    expect(getAlignItemWithTriggerOffset(true, "top", 40, 0)).toBe(-40);
  });

  it("does not offset left/right", () => {
    expect(getAlignItemWithTriggerOffset(true, "left", 40, 4)).toBe(4);
  });

  it("disables flip when align is active", () => {
    expect(shouldDisableFlipForAlign(true)).toBe(true);
    expect(shouldDisableFlipForAlign(false)).toBe(false);
  });
});

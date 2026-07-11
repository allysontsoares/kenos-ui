import { describe, expect, it } from "vitest";
import { restoreFocus } from "../src/focus/restore-focus";

describe("restoreFocus disconnected target", () => {
  it("falls back to trigger when preferred input is disconnected", () => {
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);

    const detachedInput = document.createElement("input");
    // never appended → not connected

    restoreFocus({
      openSource: "input",
      input: detachedInput,
      trigger,
    });

    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });

  it("falls back to previousActiveElement when trigger is disconnected", () => {
    const previous = document.createElement("button");
    document.body.appendChild(previous);

    const detachedTrigger = document.createElement("button");

    restoreFocus({
      openSource: "trigger",
      trigger: detachedTrigger,
      previousActiveElement: previous,
    });

    expect(document.activeElement).toBe(previous);
    previous.remove();
  });
});

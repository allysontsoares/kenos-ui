export type OpenSource = "trigger" | "input" | "unknown";

export interface RestoreFocusOptions {
  openSource?: OpenSource | undefined;
  trigger?: HTMLElement | null | undefined;
  input?: HTMLElement | null | undefined;
  previousActiveElement?: Element | null | undefined;
}

function isFocusable(element: Element | null | undefined): element is HTMLElement {
  return element instanceof HTMLElement && element.isConnected;
}

export function restoreFocus({
  openSource = "unknown",
  trigger,
  input,
  previousActiveElement,
}: RestoreFocusOptions): void {
  let target: HTMLElement | null = null;

  switch (openSource) {
    case "trigger":
      target = trigger ?? null;
      break;
    case "input":
      target = input ?? null;
      break;
    case "unknown":
      target = isFocusable(previousActiveElement) ? previousActiveElement : (trigger ?? null);
      break;
  }

  // Base UI floating-ui #4655: if the preferred target unmounted, fall back to
  // another connected candidate instead of leaving focus on <body>.
  if (!isFocusable(target)) {
    if (isFocusable(trigger)) target = trigger;
    else if (isFocusable(input)) target = input;
    else if (isFocusable(previousActiveElement)) target = previousActiveElement;
    else target = null;
  }

  if (isFocusable(target)) {
    target.focus();
  }
}

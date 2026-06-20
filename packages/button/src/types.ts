import type * as React from "react";

export interface ButtonState {
  isHovered: boolean;
  isPressed: boolean;
  isFocused: boolean;
  isFocusVisible: boolean;
  isPending: boolean;
  isDisabled: boolean;
}

export type DOMRenderFunction = (
  props: React.ComponentProps<"button">,
  state: ButtonState,
) => React.ReactElement;

export interface ButtonRootProps extends React.ComponentPropsWithoutRef<"button"> {
  /** Loading state. Maintains focusability, blocks action, announces via aria-busy. */
  isPending?: boolean;

  /** Semantic equivalent to `disabled`, explicitly named for intent clarity. */
  isDisabled?: boolean;

  /** Removes from tab order without using native `disabled`. Use with caution. */
  excludeFromTabOrder?: boolean;

  /**
   * Prevents focus from moving to the button on press (mouse/touch).
   * Note: Touch behavior requires empirical validation.
   */
  preventFocusOnPress?: boolean;

  /** Replaces the rendered DOM element, keeping behavior and props. */
  render?: DOMRenderFunction;
}

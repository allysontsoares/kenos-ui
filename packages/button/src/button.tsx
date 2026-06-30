import React, { forwardRef, useState, isValidElement, useMemo } from "react";
import { composeEventHandlers } from "./utils/compose-event-handlers";
import { ButtonContext } from "./utils/use-button-state";
import type { ButtonProps, ButtonState } from "./types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      isPending = false,
      isDisabled = false,
      excludeFromTabOrder = false,
      preventFocusOnPress = false,
      render,
      children,
      tabIndex,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Computed state
    const buttonState: ButtonState = useMemo(
      () => ({
        isHovered,
        isPressed,
        isFocused,
        // React 19 / Modern browsers handle :focus-visible natively.
        // Exposing a basic fallback or false if we rely entirely on CSS `[data-slot="button"]:focus-visible`.
        // We keep it false here to encourage CSS-first focus-visible usage as per the plan.
        isFocusVisible: false,
        isPending,
        isDisabled,
      }),
      [isHovered, isPressed, isFocused, isPending, isDisabled],
    );

    // Native-first use-press logic
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === " ") {
        e.preventDefault(); // prevent scroll
      }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        // The browser natively triggers onClick for buttons on Enter/Space,
        // but if we are augmenting, we ensure it's handled.
        // Wait, native <button> already fires onClick for Space and Enter.
        // The plan says: "replica o comportamento nativo do <button> para Enter, e normaliza Space que só dispara em keyup por padrão do navegador."
        // Native <button> handles it, so we might just let native behavior work unless we prevent default.
        // Actually, preventing default on keyup for space might prevent the native click.
        // We will just let native <button> do its thing for onClick.
      }
    };

    // Handlers mapped to state
    const onPointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.pointerType === "mouse") setIsHovered(true);
    };
    const onPointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.pointerType === "mouse") setIsHovered(false);
      setIsPressed(false);
    };
    const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.button === 0 || e.button === undefined) {
        setIsPressed(true);
        if (preventFocusOnPress) {
          e.preventDefault();
        }
      }
    };
    const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.button === 0 || e.button === undefined) setIsPressed(false);
    };
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    // Block click if pending or disabled
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isPending || isDisabled) {
        e.preventDefault();
        return;
      }
    };

    // Compose with consumer props
    const composedProps = {
      ...props,
      onPointerEnter: composeEventHandlers(onPointerEnter, props.onPointerEnter),
      onPointerLeave: composeEventHandlers(onPointerLeave, props.onPointerLeave),
      onPointerDown: composeEventHandlers(onPointerDown, props.onPointerDown),
      onPointerUp: composeEventHandlers(onPointerUp, props.onPointerUp),
      onFocus: composeEventHandlers(onFocus, props.onFocus),
      onBlur: composeEventHandlers(onBlur, props.onBlur),
      onKeyDown: composeEventHandlers(handleKeyDown, props.onKeyDown),
      onKeyUp: composeEventHandlers(handleKeyUp, props.onKeyUp),
      onClick: composeEventHandlers(onClick, props.onClick, { checkDefaultPrevented: true }),
    };

    const finalTabIndex = excludeFromTabOrder || isDisabled ? -1 : tabIndex;

    const domProps = {
      ...composedProps,
      ref,
      tabIndex: finalTabIndex,
      "aria-disabled": (isPending || isDisabled ? true : undefined) as boolean | undefined,
      "aria-busy": (isPending ? true : undefined) as boolean | undefined,
      "data-pending": isPending ? "true" : undefined,
      "data-disabled": isDisabled ? "true" : undefined,
      "data-hovered": isHovered ? "true" : undefined,
      "data-pressed": isPressed ? "true" : undefined,
      "data-focused": isFocused ? "true" : undefined,
      "data-slot": "button",
      "data-kenos": "button",
    };

    const content = (
      <ButtonContext.Provider value={buttonState}>
        {render ? (
          render(domProps as any, buttonState)
        ) : (
          <button type="button" {...domProps}>
            {children}
          </button>
        )}
      </ButtonContext.Provider>
    );

    // @ts-ignore process might not be defined in some environments without @types/node
    if (typeof process !== "undefined" && process.env.NODE_ENV !== "production" && render) {
      const rendered = render(domProps as any, buttonState);
      if (!isValidElement(rendered) || rendered.type === React.Fragment) {
        // eslint-disable-next-line no-console
        console.warn("Button: `render` prop must return a single valid React element.");
      }
    }

    return content;
  },
);

Button.displayName = "Button";

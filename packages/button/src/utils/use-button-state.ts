import { createContext, useContext } from "react";
import type { ButtonState } from "../types";

export const ButtonContext = createContext<ButtonState | null>(null);

export function useButtonState(): ButtonState {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error("useButtonState must be used within a Button.Root");
  }
  return context;
}

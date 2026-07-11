import { createContext, useContext } from "react";

export interface ItemContextValue {
  value: string;
  isSelected: boolean;
}

export const ItemContext = createContext<ItemContextValue | null>(null);

export function useItemContext(): ItemContextValue | null {
  return useContext(ItemContext);
}

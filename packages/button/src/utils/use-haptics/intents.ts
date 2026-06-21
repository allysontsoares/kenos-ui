/**
 * Vocabulário de intenção do Kenos — desacoplado dos presets crus do `web-haptics`.
 *
 * Por quê: se a lib subjacente trocar (ou os nomes dos presets dela mudarem),
 * a API pública do Kenos (`trigger("save")`) não muda. Só este mapa muda.
 */
export type HapticIntent =
  | "tap" // toque genérico, sem significado especial (ex: botão secundário)
  | "press" // confirmação de press (ex: botão primário)
  | "longPress" // long press completou
  | "toggle" // switch/checkbox alternou estado
  | "selection" // mudança discreta de seleção (tabs, picker, slider detent)
  | "save" // ação de sucesso concluída
  | "warning" // ação destrutiva ou irreversível à frente
  | "error"; // falha de validação, erro de rede

/**
 * Mapa de intenção do Kenos -> preset do `web-haptics`.
 * Única função permitida a conhecer o vocabulário da lib externa.
 */
export const HAPTIC_INTENT_MAP: Record<HapticIntent, string> = {
  tap: "light",
  press: "medium",
  longPress: "heavy",
  toggle: "light",
  selection: "selection",
  save: "success",
  warning: "warning",
  error: "error",
};

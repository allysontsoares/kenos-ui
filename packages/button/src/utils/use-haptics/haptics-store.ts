/**
 * Store externo mínimo para o estado global "haptics habilitado".
 *
 * Por quê `useSyncExternalStore` em vez de uma variável de módulo lida direto:
 * uma variável de módulo lida via `isHapticsEnabled()` dentro de um componente
 * não é reativa — se `setHapticsEnabled` for chamado por outro componente,
 * quem já renderizou fica com o valor congelado até re-renderizar por outro motivo.
 * `useSyncExternalStore` resolve isso da forma idiomática do React: o store notifica
 * os subscribers, e o hook força a re-leitura.
 */

const STORAGE_KEY = "kenos:haptics-enabled";

type Listener = () => void;

const listeners = new Set<Listener>();
let state = readInitialState();

function readInitialState(): boolean {
  if (typeof window === "undefined") return true; // SSR-safe default
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === null ? true : stored === "true";
}

function emitChange() {
  for (const listener of listeners) listener();
}

export function getHapticsEnabled(): boolean {
  return state;
}

export function setHapticsEnabled(enabled: boolean): void {
  if (state === enabled) return;
  state = enabled;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, String(enabled));
  }
  emitChange();
}

export function subscribeHapticsEnabled(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

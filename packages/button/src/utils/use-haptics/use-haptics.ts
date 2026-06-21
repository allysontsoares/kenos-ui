"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useWebHaptics } from "web-haptics/react";
import { getHapticsEnabled, setHapticsEnabled, subscribeHapticsEnabled } from "./haptics-store";
import { HAPTIC_INTENT_MAP, type HapticIntent } from "./intents";

export interface UseHapticsResult {
  /** Estado global atual — reativo, atualiza em qualquer componente que chame o hook. */
  enabled: boolean;
  /** Liga/desliga haptics globalmente (ex: toggle de configuração do usuário). */
  setEnabled: (enabled: boolean) => void;
  /** Dispara feedback haptic pra uma intenção semântica. No-op se `enabled` for false. */
  trigger: (intent: HapticIntent) => void;
}

/**
 * Hook de haptics do Kenos. Funciona com ou sem Provider — não há ritual de setup
 * obrigatório (alinhado à filosofia "progressive enhancement" do resto do projeto).
 *
 * Reatividade do `enabled` é garantida via `useSyncExternalStore`: qualquer componente
 * que chame `useHaptics()` recebe atualização automática quando outro componente
 * chamar `setEnabled`, mesmo sem Provider compartilhado.
 */
export function useHaptics(): UseHapticsResult {
  const enabled = useSyncExternalStore(
    subscribeHapticsEnabled,
    getHapticsEnabled,
    () => true, // snapshot do servidor (SSR) — default seguro
  );

  const { trigger: webTrigger } = useWebHaptics();

  const trigger = useCallback(
    (intent: HapticIntent) => {
      if (!enabled) return;
      const preset = HAPTIC_INTENT_MAP[intent];
      webTrigger(preset);
    },
    [enabled, webTrigger],
  );

  return { enabled, setEnabled: setHapticsEnabled, trigger };
}

# Kenos UI — `useHaptics`: Guia de Uso

> Pacote: `@kenos-ui/react-haptics` (sugestão de nome — ajustar ao padrão real do monorepo).
> Dependência externa: [`web-haptics`](https://github.com/lochie/web-haptics) (`npm i web-haptics`).

---

## O que é

Hook de feedback haptic do Kenos UI. **Não é uma prop automática do `Button`** — é um hook que o consumidor compõe manualmente, seguindo a mesma filosofia de `useLongPress`, `useHover`, etc: comportamento opcional, explícito, nunca escondido dentro do componente.

```tsx
import { useHaptics } from "@kenos-ui/react-haptics";

const haptic = useHaptics();
haptic.trigger("save"); // dispara feedback semântico de "sucesso"
```

---

## Por que existe uma camada própria em cima do `web-haptics`

1. **Vocabulário semântico, não técnico.** Em vez de `trigger("light")`/`trigger("medium")` (que exige saber o vocabulário interno da lib), o Kenos expõe intenções com significado de produto: `trigger("save")`, `trigger("warning")`, `trigger("longPress")`. Isso desacopla a API pública do Kenos da lib escolhida — se um dia vocês trocarem `web-haptics` por outra implementação, nenhum consumidor de `@kenos-ui/react-haptics` precisa mudar código.

2. **Estado global reativo de enable/disable, sem exigir Provider.** `useHaptics()` funciona sozinho, sem nenhum setup — mas se algum componente chamar `setEnabled(false)` (ex: um toggle de configuração "reduzir feedback tátil"), **todos** os outros componentes que usam `useHaptics()` recebem a atualização automaticamente, mesmo sem compartilhar um Context Provider. Isso é resolvido via `useSyncExternalStore`, e é o motivo de essa camada existir em vez de simplesmente reexportar `useWebHaptics` direto.

---

## API

```ts
function useHaptics(): {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  trigger: (intent: HapticIntent) => void;
};

type HapticIntent =
  | "tap" // toque genérico — botão secundário, interação menor
  | "press" // confirmação de press — botão primário
  | "longPress" // long press completou
  | "toggle" // switch/checkbox alternou
  | "selection" // seleção discreta — tabs, picker, slider detent
  | "save" // ação de sucesso concluída — formulário salvo, pagamento confirmado
  | "warning" // ação destrutiva/irreversível à frente
  | "error"; // falha de validação, erro de rede
```

---

## Uso com `Button` (composição explícita — sem prop mágica)

`trigger` deve rodar **antes** do handler de negócio do consumidor, não depois — o feedback tátil simula a reação física do botão ao toque, não o resultado de uma operação assíncrona que ainda vai rodar. Isso é exatamente o que `composeEventHandlers(internal, external)` já garante (internal roda primeiro):

```tsx
import { Button, composeEventHandlers } from "@kenos-ui/react-button";
import { useHaptics } from "@kenos-ui/react-haptics";

function SaveButton() {
  const haptic = useHaptics();

  return (
    <Button.Root
      onClick={composeEventHandlers(
        () => haptic.trigger("press"),
        async () => {
          await save();
        },
      )}
    >
      Salvar
    </Button.Root>
  );
}
```

### Com `onLongPress`

```tsx
const longPress = useLongPress({
  delay: 500,
  onLongPress: () => haptic.trigger("longPress"),
});

<Button.Root
  {...longPress}
  onClick={(e) => {
    if (e.nativeEvent.suppressedByLongPress) return;
    haptic.trigger("press");
    handleNormalClick();
  }}
>
  Pressione e segure
</Button.Root>;
```

### Toggle de configuração ("reduzir feedback tátil")

```tsx
function HapticsToggle() {
  const haptic = useHaptics();

  return (
    <label>
      <input
        type="checkbox"
        checked={haptic.enabled}
        onChange={(e) => haptic.setEnabled(e.target.checked)}
      />
      Feedback tátil
    </label>
  );
}
```

Qualquer outro componente na árvore que chame `useHaptics()` reflete essa mudança automaticamente, sem precisar de Context Provider envolvendo a aplicação.

---

## Limitações de plataforma (documentar, não tentar "corrigir")

Estas são limitações de browser/SO, não bugs do Kenos. Já se aplicam à própria `web-haptics` por trás:

| Plataforma                                 | Comportamento                                                                                                                                                                                                                                        |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chrome / Edge / Samsung Internet (Android) | Funciona via `navigator.vibrate`                                                                                                                                                                                                                     |
| iOS Safari (até patches recentes)          | Funciona via truque de `<input type="checkbox" switch>`                                                                                                                                                                                              |
| iOS Safari 26.5+                           | Truque programático foi corrigido pela Apple — haptic só dispara em clique **direto** do usuário no switch, não mais via `.click()` script. Efeito prático: o fallback de iOS pode parar de funcionar silenciosamente em versões futuras, sem aviso. |
| Firefox (qualquer plataforma, 129+)        | **Sem solução possível.** A Mozilla bloqueia `navigator.vibrate` por política de permissão nunca implementada (sem prompt de usuário) — não existe mecanismo alternativo conhecido, vinculado a nenhum controle HTML.                                |
| Desktop (qualquer browser)                 | `vibrate` retorna `true` mas não há hardware — no-op silencioso.                                                                                                                                                                                     |

**Não implementar feature-detection ou warning de "haptics não suportado" na UI.** `trigger()` já faz no-op silencioso nas plataformas sem suporte — é o comportamento correto (haptics é enhancement, nunca requisito; a UI deve funcionar idêntica sem ele).

---

## O que este hook **não** faz (decisão deliberada)

- **Não dispara automaticamente dentro do `Button`** baseado em variant/props. Cada consumidor decide explicitamente onde e quando chamar `trigger()`.
- **Não usa `react-aria-components`/`onPress`.** Compõe via `onClick` nativo + `composeEventHandlers`, igual ao resto da arquitetura do Kenos.
- **Não expõe os presets crus do `web-haptics`** (`"light"`, `"medium"`, etc.) na API pública — só o vocabulário semântico (`HapticIntent`). Se precisar de um preset que não existe no mapa, adicionar a intenção em `HAPTIC_INTENT_MAP`, não vazar o preset direto pro consumidor.

---

## Setup necessário

```bash
npm i web-haptics
```

Next.js: o hook já inclui `"use client"` no topo do arquivo — nenhum setup adicional necessário em Server Components que renderizam o componente.

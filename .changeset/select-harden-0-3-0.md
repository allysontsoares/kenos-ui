---
"@kenos-ui/react-select": minor
"@kenos-ui/utils": patch
---

Harden Select to 0.3.0: ItemContext + ItemIndicator (multiple-safe), pointer vs keyboard focus model (`aria-activedescendant` on the focused node), controlled sync/rollback, `openOnFocus` reopen guard, Escape `scopeRef`, closed Trigger opens via ArrowDown/Enter/Space, labels via `ItemText`/`textValue`, `groupId` on groups.

**Utils (patch):** Safari pinch-zoom floating parity (`visualViewport`), `restoreFocus` fallback when preferred target is disconnected, `alignItemWithTrigger` disabled on pinch-zoom.

**Behavior notes:** Pointer open keeps focus on Trigger; keyboard open moves focus into List. Highlight on open prefers selected value when present in the list.

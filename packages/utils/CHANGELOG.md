# @kenos-ui/utils

## 1.0.2

### Patch Changes

- Add `visuallyHiddenStyle` to `@kenos-ui/utils` — WCAG visually-hidden inline styles with no Tailwind/CSS framework dependency.

  DatePicker Input replaces `className="sr-only"` on accessibility description spans with `visuallyHiddenStyle`, fixing visible assistive text ("Selected date: …") in projects without Tailwind. Content live announcer refactored to reuse the shared utility.

## 1.0.1

### Patch Changes

- 891e3a4: Harden Select to 0.3.0: ItemContext + ItemIndicator (multiple-safe), pointer vs keyboard focus model (`aria-activedescendant` on the focused node), controlled sync/rollback, `openOnFocus` reopen guard, Escape `scopeRef`, closed Trigger opens via ArrowDown/Enter/Space, labels via `ItemText`/`textValue`, `groupId` on groups.

  **Utils (patch):** Safari pinch-zoom floating parity (`visualViewport`), `restoreFocus` fallback when preferred target is disconnected, `alignItemWithTrigger` disabled on pinch-zoom.

  **Behavior notes:** Pointer open keeps focus on Trigger; keyboard open moves focus into List. Highlight on open prefers selected value when present in the list.

## 1.0.0

### Major Changes

- f2ea00f: - Extend `useGridNavigation` with `getNextIndex`, `GridNavigationKey` export, and optional Escape handling (`onEscape` may return `false` to defer). `getNextIndex` returning `null` now means the consumer handled navigation (preventDefault + stop).
  - Add `packages/utils/docs/popup-policy.md` documenting `POPUP_POLICY_DEFAULTS` and dismiss/focus behavior.
  - Add unit tests for `useGridNavigation`.

### Minor Changes

- 9c9de3d: Extend `useGridNavigation` with `getNextIndex` (returning `null` means the consumer handled navigation) and scoped Escape handling. Refactor datepicker grids to use the shared hook. Add range drag, resize, Ctrl+click multiple, and live announcer. Document popup policy.

## 0.0.2

### Minor Changes

- **Kenos UI Utils — shared primitives** (`@kenos-ui/utils@0.0.2`)

  Internal hooks and helpers shared across Kenos UI headless components.

  **Floating & presence**
  - `useFloating` — Floating UI positioning (`side`, `align`, offsets, collision)
  - `usePresence` — mount/unmount lifecycle for animated overlays

  **Dismiss & focus**
  - `useClickOutside`, `useEscapeKey` (with `stopPropagation` for dialog interop)
  - `useFocusTrap`, `getFocusableElements`, `restoreFocus` with `OpenSource`

  **Composite / collection**
  - `useListNavigation`, `useTypeahead`
  - `useSelectCollection` — type-to-filter for Combobox (and similar patterns)

  **Popup policy**
  - `POPUP_POLICY_DEFAULTS` — interop-first defaults (`modal={false}`, `portal={false}`)

  **Packaging**
  - Add `license: MIT` to `package.json` (fixes npm registry showing "no license")

## 0.0.1

### Patch Changes

- aaa8a57: Initial Combobox scaffold (`@kenos-ui/react-combobox@0.1.0`):
  - Parts: Root, Label, Input, Trigger, Content, List, Item, ItemText, Empty, Clear
  - `ComboboxStore` with `open`, `value`, `inputValue`, `highlightedValue`, item registry
  - `useSelectCollection` hook in `@kenos-ui/utils` for type-to-filter
  - Basic keyboard: filter on type, arrow navigation, Enter to select
  - Re-exported from `@kenos-ui/react`

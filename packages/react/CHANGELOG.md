# @kenos-ui/react

## 0.4.0

### Minor Changes

- 8a6a79d: **Kenos UI Button — initial release** (`@kenos-ui/react-button@0.1.0`)

  A headless, composition-first Button primitive for React 19+. Unstyled, accessible, and designed for building complex interactive elements.

  **Core Architecture**
  - `<Button.Root>` augments the native `<button>` element with computed interaction states.
  - Exposes `isHovered`, `isPressed`, `isFocused`, `isFocusVisible`, `isPending`, and `isDisabled` states.
  - Native-first `use-press` logic that faithfully replicates browser behavior for mouse, touch, and keyboard interactions without relying on `stopPropagation` hacks.
  - Correct keyboard normalization: Space triggers on `keyup` (preventing scroll), Enter triggers native `click`.

  **Composition & Rendering**
  - Supports the standard `children` pattern for simple native buttons.
  - Provides a flexible `render` prop for rendering as an `<a>`, `Link`, or custom element, injecting props and states dynamically.
  - Validates `render` prop usage to enforce a single valid React element (prevents `React.Fragment`).

  **Advanced Hooks Ecosystem**
  - `useHapticFeedback`: Trigger OS-level tactile feedback using the Vibration API (Android) and hidden checkbox hacks (iOS Safari).
  - `useLongPress`: Detect extended pointer interactions, useful for context menus or secondary actions.
  - `usePointerPressure`: Capture Force Touch / 3D Touch and stylus pressure data for dynamic visual feedback.

  **Accessibility & UX**
  - Correct WAI-ARIA mappings for `aria-disabled` and `aria-busy` based on `isDisabled` and `isPending` states.
  - Handles `excludeFromTabOrder` via dynamic `tabIndex` manipulation.
  - Opt-in `preventFocusOnPress` to prevent focus stealing during pointer down.

  **Integration**
  - Fully integrated into `@kenos-ui/react` aggregator.
  - Fully typed (`ButtonRootProps`, `ButtonState`).

### Patch Changes

- Updated dependencies [8a6a79d]
  - @kenos-ui/react-button@0.2.0

## 0.3.6

### Patch Changes

- Updated dependencies [b0fd79e]
- Updated dependencies [9c9de3d]
- Updated dependencies [f2ea00f]
  - @kenos-ui/react-datepicker@0.5.0
  - @kenos-ui/react-combobox@0.2.2
  - @kenos-ui/react-select@0.2.3

## 0.3.5

### Patch Changes

- Updated dependencies [3222bd8]
  - @kenos-ui/react-datepicker@0.4.2

## 0.3.4

### Minor Changes

- **Kenos UI React — aggregator release** (`@kenos-ui/react@0.3.4`)

  Single install for all Kenos UI headless primitives.

  **Re-exports**
  - `DatePicker` from `@kenos-ui/react-datepicker`
  - `Select` from `@kenos-ui/react-select`
  - `Combobox` from `@kenos-ui/react-combobox`

  **Packaging**
  - Add `license: MIT` to `package.json` (fixes npm registry showing "no license")

### Patch Changes

- Updated dependencies
  - @kenos-ui/react-datepicker@0.4.1
  - @kenos-ui/react-select@0.2.2
  - @kenos-ui/react-combobox@0.2.1
  - @kenos-ui/utils@0.0.2

## 0.3.3

### Patch Changes

- Updated dependencies
  - @kenos-ui/react-datepicker@0.4.0

## 0.3.2

### Patch Changes

- Updated dependencies
  - @kenos-ui/react-datepicker@0.3.3

## 0.3.1

### Patch Changes

- aaa8a57: Initial Combobox scaffold (`@kenos-ui/react-combobox@0.1.0`):
  - Parts: Root, Label, Input, Trigger, Content, List, Item, ItemText, Empty, Clear
  - `ComboboxStore` with `open`, `value`, `inputValue`, `highlightedValue`, item registry
  - `useSelectCollection` hook in `@kenos-ui/utils` for type-to-filter
  - Basic keyboard: filter on type, arrow navigation, Enter to select
  - Re-exported from `@kenos-ui/react`

- Updated dependencies [aaa8a57]
  - @kenos-ui/react-combobox@0.2.0
  - @kenos-ui/react-datepicker@0.3.2
  - @kenos-ui/react-select@0.2.1

## 0.3.0

### Minor Changes

- 03f6e47: Add `@kenos-ui/react-select@0.1.0` — headless single select with interop-first popup defaults (`modal={false}`, `portal={false}`), store-based item registry, forms via `Select.HiddenSelect`, and dialog-interop keyboard behavior.
- Add `@kenos-ui/react-select@0.2.0` Tier 2 — multiple selection, `items` prop for label maps, `portal` + `container` on Content, `Select.ClearTrigger`, `isItemEqualToValue`, `onOpenChangeComplete`, and `Select.Backdrop` when `modal={true}`.

### Patch Changes

- Updated dependencies [03f6e47]
- Updated dependencies
  - @kenos-ui/react-select@0.2.0

## 0.2.1

### Patch Changes

- Rebrand: publish under `@kenos-ui` org. Replaces interim `@torq-ui/*` naming. No API changes.
- Updated dependencies
  - @kenos-ui/react-datepicker@0.3.1

## 0.2.0

### Minor Changes

- Axis lift-and-shift: publish DatePicker under `@at5/axis-datepicker`.
  - Add `@at5/axis-datepicker` — same DatePicker API and behavior as `@at5/kairo` (migrated from `packages/kairo` to `packages/datepicker`)
  - Add `@at5/axis` — aggregator re-exporting `DatePicker`
  - `@at5/kairo` — deprecated; thin re-export of `@at5/axis-datepicker` for transition
  - Docs site and playground now depend on `@at5/axis-datepicker`

  **Migration:** replace `@at5/kairo` with `@at5/axis-datepicker` (or `@at5/axis`). No API changes.

### Patch Changes

- Updated dependencies
  - @at5/axis-datepicker@0.3.0

## 0.1.0

### Minor Changes

- Initial aggregator release — re-exports `@at5/axis-datepicker`

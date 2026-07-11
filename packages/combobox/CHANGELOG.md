# @kenos-ui/react-combobox

## 0.3.0

### Minor Changes

- 7a3ef7d: Harden Combobox to 0.3.0: Input-first focus, dissociated `open`/`inputValue`, controlled sync/rollback, portal props, HiddenInput, ItemIndicator.

  **Breaking:** `openOnFocus` now defaults to `false` (0.2.x always opened on Input focus). Pass `openOnFocus` to restore the previous behavior. Typing still opens via `openOnChange` (default `true`). Trigger only toggles open and does not clear the query — empty query shows the full list.

## 0.2.3

### Patch Changes

- 53e2d94: Add stable `data-kenos` DOM fingerprints to every public primitive part for tooling detection (e.g. Wappalyzer) without affecting styling or accessibility.

  - **Button:** `data-kenos="button"`
  - **Select:** `select-trigger`, `select-item`, `select-content`, and 12 other parts
  - **Combobox:** `combobox-input`, `combobox-trigger`, `combobox-item`, and 6 other parts
  - **Date Picker:** `date-picker-root`, `date-picker-input`, `date-picker-day`, and 18 other parts

  Each fingerprint uses the `{component}-{part}` kebab-case convention and coexists with existing state `data-*` attributes.

## 0.2.2

### Patch Changes

- Updated dependencies [9c9de3d]
- Updated dependencies [f2ea00f]
  - @kenos-ui/utils@1.0.0

## 0.2.1

### Minor Changes

- **Kenos UI Combobox — feature release** (`@kenos-ui/react-combobox@0.2.1`)

  Headless, accessible, composable Combobox primitive for React 19+, fully unstyled.

  **Compound API**

  - Parts: `Root`, `Label`, `Input`, `Trigger`, `Content`, `List`, `Item`, `ItemText`, `Empty`, `Clear`

  **Filtering & selection**

  - Type-to-filter via `useSelectCollection` from `@kenos-ui/utils`
  - `ComboboxStore`: `open`, `value`, `inputValue`, `highlightedValue`, item registry
  - Keyboard: filter on type, arrow navigation, Enter to select
  - `Empty` state when filtered collection has no matches
  - `Clear` resets value and input text

  **Popup policy**

  - Floating UI positioning on `Content`; `lazyMount` / dialog-interop patterns aligned with Select
  - Re-exported from `@kenos-ui/react` as `Combobox` namespace

  **Packaging**

  - Add `license: MIT` to `package.json` (fixes npm registry showing "no license")

## 0.2.0

### Minor Changes

- aaa8a57: Initial Combobox scaffold (`@kenos-ui/react-combobox@0.1.0`):
  - Parts: Root, Label, Input, Trigger, Content, List, Item, ItemText, Empty, Clear
  - `ComboboxStore` with `open`, `value`, `inputValue`, `highlightedValue`, item registry
  - `useSelectCollection` hook in `@kenos-ui/utils` for type-to-filter
  - Basic keyboard: filter on type, arrow navigation, Enter to select
  - Re-exported from `@kenos-ui/react`

### Patch Changes

- Updated dependencies [aaa8a57]
  - @kenos-ui/utils@0.0.1

## 0.1.0

### Minor Changes

- Initial Combobox scaffold: Root, Label, Input, Trigger, Content, List, Item, ItemText, Empty, Clear
- `ComboboxStore` with `open`, `value`, `inputValue`, `highlightedValue`, and item registry
- Type-to-filter via `@kenos-ui/utils` `useSelectCollection`
- Basic keyboard: filter on type, arrow navigation, Enter to select

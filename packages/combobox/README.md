# @kenos-ui/react-combobox

Headless, accessible, composable Combobox primitive for React.

## Installation

```bash
pnpm add @kenos-ui/react-combobox
```

## Usage

```tsx
import { Combobox } from "@kenos-ui/react-combobox";

<Combobox.Root name="language" onValueChange={setValue}>
  <Combobox.Label>Language</Combobox.Label>
  <Combobox.Input placeholder="Search…" />
  <Combobox.Trigger>▼</Combobox.Trigger>
  <Combobox.Content>
    <Combobox.List>
      <Combobox.Item value="ts">
        <Combobox.ItemText>TypeScript</Combobox.ItemText>
        <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
      </Combobox.Item>
      <Combobox.Item value="js">
        <Combobox.ItemText>JavaScript</Combobox.ItemText>
      </Combobox.Item>
    </Combobox.List>
    <Combobox.Empty>No results</Combobox.Empty>
  </Combobox.Content>
  <Combobox.Clear />
  <Combobox.HiddenInput />
</Combobox.Root>;
```

## API

| Part            | Description                                                           |
| --------------- | --------------------------------------------------------------------- |
| `Root`          | Context + state (`value`, `open`, `inputValue`, `name`, filter)       |
| `Label`         | Associated `<label>`                                                  |
| `Input`         | `role="combobox"` — type to filter; focus stays here                  |
| `Trigger`       | Toggles listbox only (does not clear/set `inputValue`); focuses Input |
| `Content`       | Floating container (`portal={false}` default); dismiss + presence     |
| `List`          | `role="listbox"` wrapper                                              |
| `Item`          | `role="option"` — registers value/label                               |
| `ItemText`      | Option label slot (`displayName = "Combobox.ItemText"`)               |
| `ItemIndicator` | Selected check (reads `ItemContext`)                                  |
| `Empty`         | Shown when the filtered collection is empty                           |
| `Clear`         | Clears value and input text                                           |
| `HiddenInput`   | Native hidden field when `name` is set on Root                        |

### Root highlights

| Prop           | Default | Notes                                                           |
| -------------- | ------- | --------------------------------------------------------------- |
| `openOnFocus`  | `false` | **Breaking vs 0.2.x** — focus alone no longer opens the listbox |
| `openOnChange` | `true`  | Typing opens when closed; independent of Trigger                |
| `modal`        | `false` | Interop-first (popup-policy)                                    |
| `name`         | —       | Enables `HiddenInput` for native forms                          |

### Focus model (Input-first)

- Focus stays on `Combobox.Input`; `aria-activedescendant` is set on the Input.
- Do **not** move focus into the List.
- `open` and `inputValue` are independent: Trigger toggles open with an empty query → full unfiltered list.
- Floating reference is always the **Input** (not Trigger).

## Store

`ComboboxStore` tracks:

- `open` — listbox visibility
- `openSource` — `'input' | 'trigger' | null`
- `value` — selected value
- `inputValue` — current input text (filter query)
- `highlightedValue` — keyboard/mouse highlight
- `items` — registry populated by `Combobox.Item`

Filtering uses `useSelectCollection` from `@kenos-ui/utils` (not a dependency on `@kenos-ui/react-select`).

## Popup defaults (interop-first)

- `modal={false}` — no inert/aria-modal on document
- `portal={false}` — content stays in-tree (Dialog-friendly)
- `lazyMount` — content is not in the DOM until first opened
- Escape `stopPropagation` + `scopeRef` — closes Combobox without closing a parent Dialog

See [popup-policy.md](../../docs/popup-policy.md).

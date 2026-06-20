# @kenos-ui/react-button

An augmented native `<button>` primitive.

## Features

- Fully interoperable with Radix and Base UI.
- Native-first `use-press` behavior inside `ButtonRoot`.
- `isPending` state that manages `aria-disabled` and blocks clicks.
- `data-*` attributes for visual state management (`data-hovered`, `data-pressed`, `data-focused`, `data-pending`, `data-disabled`).
- Independent hooks for advanced behaviors:
  - `useLongPress`
  - `useHapticFeedback`
  - `useHover`
  - `usePointerPressure`

## Usage

```tsx
import { Button } from "@kenos-ui/react-button";

export function Example() {
  return <Button.Root isPending={false}>Click me</Button.Root>;
}
```

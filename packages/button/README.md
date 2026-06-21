# @kenos-ui/react-button

An augmented native `<button>` primitive. Built with native-first press logic, keyboard support, robust state-driven data attributes, and a focus-visible polyfill. Zero CSS shipped.

## Features

- Native-first use-press logic that replicates browser interactions.
- Provides logical focus and pointer-aware states like hovered and pressed.
- Fully accessible, managing disabled and pending states natively.
- First-class DOM rendering composition via the `render` prop.
- Zero CSS shipped — target semantic data-attributes to style.

## Accessibility

Kenos enhances the native button accessibility. Roles, labels, and state management (like pending/disabled) are handled for you natively via `aria-disabled` and `aria-busy`.

### Roles and attributes

| Part   | Role / Attributes |
| :----- | :---------------- |
| Button | `button`          |

### Keyboard support

| Key     | Description                                                 |
| :------ | :---------------------------------------------------------- |
| `Enter` | Activates the button.                                       |
| `Space` | Activates the button. Prevents page scrolling when pressed. |

## Usage

```tsx
import { Button } from "@kenos-ui/react-button";

export function Example() {
  return <Button isPending={false}>Click me</Button>;
}
```

## API Reference

Props and data attributes. Import from `@kenos-ui/react-button`.

### Root props

- **`isPending`** (`boolean`, default: `false`)
  Loading state. Maintains focusability, blocks action, announces via `aria-busy`.

- **`isDisabled`** (`boolean`, default: `false`)
  Semantic equivalent to `disabled`, explicitly named for intent clarity. Uses `aria-disabled` internally.

- **`excludeFromTabOrder`** (`boolean`, default: `false`)
  Removes from tab order without using native `disabled`.

- **`preventFocusOnPress`** (`boolean`, default: `false`)
  Prevents focus from moving to the button on press (mouse/touch).

- **`render`** (`DOMRenderFunction`)
  Replaces the rendered DOM element, keeping behavior and props.

### Data attributes

| Attribute         | On part | Description                                            |
| :---------------- | :------ | :----------------------------------------------------- |
| `[data-hovered]`  | Button  | Present when the button is hovered with mouse.         |
| `[data-pressed]`  | Button  | Present when the button is actively pressed.           |
| `[data-focused]`  | Button  | Present when the button has logical focus.             |
| `[data-pending]`  | Button  | Present when the button is in a pending/loading state. |
| `[data-disabled]` | Button  | Present when the button is semantically disabled.      |

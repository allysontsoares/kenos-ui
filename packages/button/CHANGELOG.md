# @kenos-ui/react-button

## 0.3.0

### Minor Changes

- 1d49a44: Refactored `Button.Root` to `Button`, introducing a simpler API for the single-part Button primitive. Added comprehensive interactive documentation and examples including unstyled, CSS, Tailwind CSS, Panda CSS, and StyleX.

## 0.2.0

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

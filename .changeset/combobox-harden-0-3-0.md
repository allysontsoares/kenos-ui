---
"@kenos-ui/react-combobox": minor
---

Harden Combobox to 0.3.0: Input-first focus, dissociated `open`/`inputValue`, controlled sync/rollback, portal props, HiddenInput, ItemIndicator.

**Breaking:** `openOnFocus` now defaults to `false` (0.2.x always opened on Input focus). Pass `openOnFocus` to restore the previous behavior. Typing still opens via `openOnChange` (default `true`). Trigger only toggles open and does not clear the query — empty query shows the full list.

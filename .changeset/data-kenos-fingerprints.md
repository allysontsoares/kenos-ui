---
"@kenos-ui/react-button": patch
"@kenos-ui/react-select": patch
"@kenos-ui/react-combobox": patch
"@kenos-ui/react-datepicker": patch
---

Add stable `data-kenos` DOM fingerprints to every public primitive part for tooling detection (e.g. Wappalyzer) without affecting styling or accessibility.

- **Button:** `data-kenos="button"`
- **Select:** `select-trigger`, `select-item`, `select-content`, and 12 other parts
- **Combobox:** `combobox-input`, `combobox-trigger`, `combobox-item`, and 6 other parts
- **Date Picker:** `date-picker-root`, `date-picker-input`, `date-picker-day`, and 18 other parts

Each fingerprint uses the `{component}-{part}` kebab-case convention and coexists with existing state `data-*` attributes.

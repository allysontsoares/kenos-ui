---
"@kenos-ui/react-datepicker": patch
---

Sync controlled single `value` into reducer state via a new `SET_SELECTED_DATE` action, keeping the segmented input and calendar focused month in sync when the prop changes externally.
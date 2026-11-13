# Field

A 40px floating-label field for text, dropdown, date, numeric and lookup values.

**Consumer provides:** label, value or placeholder, optional trailing icon action (calendar, chevron, lookup, clear), disabled/read-only state, and the surface it sits on.

- Fill follows the Field contrast rule: `surface-raised` on `surface-page`; `surface-page` on raised surfaces (dialogs, card headers, popups — wrap them in `.npn-on-raised`). Read-only: `disabled-fill`.
- Label 12px `text-muted` 4px from the top; value `text` at 17px from the top; both start 10px from the left. A dropdown's value starts exactly under its label — never offset by the platform's transform.
- Trailing icon: 28px rounded hover box, 6px from the right, vertically centred; the input reserves 34px right padding so text never runs under it.
- Width fits the longest real value plus the icon ("month/day/year" needs 150px in Inter). Never compress a field until its contents overlap.
- Focus: 2px `accent` inset underline + 1px `focus-ring`. No square outline.
- In forms, fields stack with `space-3` between them. Multi-line text areas use the same fill and `radius-md` on every inner layer.

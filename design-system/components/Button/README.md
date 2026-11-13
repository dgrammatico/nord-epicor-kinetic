# Button

Text buttons for actions; one primary per surface, the rest secondary.

**Consumer provides:** the label (sentence case, names the action), optional 16px leading icon, size (`control-md` 34px default, `control-sm` 30px compact).

- Primary: `accent` fill, `on-accent` 600 text, hover `accent-hover`. Use once per dialog, popup or form — the action that completes it (Filter, Ok, Log in).
- Secondary: `surface-hover` fill, `ink` text, hover `surface-strong`. The hover must keep the box.
- Compact (30px, 13px text, 0 12px 0 10px padding) for popup footers; a compact button beside a primary matches its height.
- Icon and label sit on ONE line, 6px apart, `white-space: nowrap`; never let a toolbar squeeze a button so its icon stacks above its text.
- A row of buttons in a dialog footer: secondary left of primary, equal widths when they sit under a preview of known width.
- Buttons inside a form column are flush with the fields' left edge (no stray margin).
- Disabled: `surface-strong` fill, `text-soft` label, not-allowed cursor.

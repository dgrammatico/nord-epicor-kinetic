# IconButton

A square, icon-only action with a rounded hover box: toolbars, card headers, overflow (⋮), chevrons, field actions.

**Consumer provides:** the icon (20px in toolbars, 16px in compact), a `title`/aria-label, the size (`control-sm` 30px; `control-xs` 26px in filter rows, spinners, chevrons; `hit-icon` 28px inside fields), and `is-on` when it toggles.

- Rest: transparent, `icon` colour. Hover: `surface-hover` fill, `accent` icon. Toggled on: `accent-tint` fill, `accent` icon — visible without hover.
- The icon is optically centred both ways; SVG uses `fill: currentColor`.
- Neighbouring icon buttons keep at least 4px between their boxes; the overflow ⋮ is the same size and on the same row as the icons beside it.
- Destructive (delete, remove file): hover `danger-tint` with `danger` icon; disabled at 40% with a not-allowed cursor.
- Never a nested second highlight: strip platform `::before`/icon backgrounds so only this box shows.

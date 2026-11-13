# DataGrid

Tables of records inside a Card.

**Consumer provides:** columns, rows, optional filter row / column filter menus, empty-state text.

- Header cells `column-header` in `ink`, 1px `divider` below; hovering a header shows a full-height `surface-raised` rounded fill drawn INSIDE the cell so the bottom border stays continuous.
- Column filter icons are always visible (not hover-only), 26px boxes in `icon` colour, `accent` when hovered or active.
- Cells `text`, tabular numerals, row hover `surface-raised`.
- Filter row: every filter box (text, dropdown, date) is 26px tall with `radius-md`; their buttons are 26px IconButtons centred in the cell.
- Empty state: `text-muted` italic, inset 12px from the left with 8px above and below.
- The grid shares the card's rounded corners; the card outline shows the bottom edge even when the grid is empty.

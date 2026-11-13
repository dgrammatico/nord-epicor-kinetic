# Card

The container for a form section or a grid: a raised header over a page-coloured body.

**Consumer provides:** title, header actions (IconButtons, optional header fields), body content.

- `radius-lg` corners, 1px `surface-hover` outline on all sides (so the edges read against an identical page colour), `overflow: hidden`.
- Header `surface-raised`, title `card-title` in `ink`; actions are 30px IconButtons on one baseline, the ⋮ last.
- Body `surface-page`, 16px padding; fields inside follow the Field contrast rule (they take `surface-raised`).
- Cards keep 10px clear of a scrollbar on the right and 12px from the tab divider above.

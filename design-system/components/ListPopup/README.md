# ListPopup

Dropdown lists, menus and selectors that float over the page.

**Consumer provides:** options, the selected value, optional search box and header.

- Popup: `surface-raised`, 1px `surface-hover` border, `radius-lg`, 4px padding.
- Options: `radius-md` on all four corners (first, last and placeholder rows too), 3px × 6px padding, 2px apart. Hover `surface-hover`; selected `accent` fill with `on-accent` text.
- The scrolling list pads 8px on the right and uses a thin scrollbar so the bar never covers an option.
- A search box at the top uses a `surface-page` field with `radius-md`, its search/clear icon centred vertically 10px from the right.
- If the platform cannot mark the selected option, show the state on the opener instead (IconButton `is-on`).

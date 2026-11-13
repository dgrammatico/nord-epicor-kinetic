A calm, dark, low-glare interface system for dense business software, built on the Nord palette and set in Inter. It was proven by restyling Epicor Kinetic end to end. Apply it to any app, web page, dashboard, document or tool that should feel like part of the same family.

The bar is **polish**. Every rule below exists because the same flaw was caught in review again and again: a hover box with square corners, an icon 2px off centre, unequal gaps, a scrollbar over content, text touching a border. Before you call something done, run the **Review checklist** at the end.

## Principles

1. **Depth by surface steps, not shadows.** There are four Polar Night surfaces, `surface-page` → `surface-raised` → `surface-hover` → `surface-strong`. Anything that comes forward steps one lighter. Shadows are reserved for `shadow-card-lift`, used by the sign-in card and floating dialogs only.
2. **One accent.** `accent` (Nord8 frost) marks the single primary action, the selected item and focus. `icon` (Nord9) is the resting colour of every icon. Aurora colours (`danger`, `warning`, `success`) mean state, never decoration.
3. **Everything interactive is rounded and contained.** Every hover, selection and focus effect is a filled box with `radius-md` corners. Its size is explicit, it is centred on its icon, and it never overlaps a neighbour's box.
4. **Equal rhythm.** Repeated items get identical gaps. The gap between a field and the next field is always `space-3`. The space above a divider equals the space below it.
5. **Things line up.** Labels, values, placeholders, buttons and checkboxes in one column share one left edge. Icons are optically centred in their boxes, both horizontally and vertically. Adjacent controls (a field and its button) share a height and a radius.
6. **Nothing is clipped, compressed or covered.** Text never runs under an icon. Content never sits under a scrollbar. Tabs, cards and popups show all four corners.

## Color

- Page and card bodies use `surface-page`. Card headers, popups, menus, dialogs, panels and the page navigator use `surface-raised`.
- **Field contrast rule.**
  - A field is always one step away from what it sits on.
  - On `surface-page`, fields fill with `surface-raised`.
  - On `surface-raised` (dialogs, card headers, popups, settings panels), fields fill with `surface-page`.
  - Read-only and disabled fields use `disabled-fill`, and keep a legible label and value.
- Hover is `surface-hover`. When the control already sits on `surface-hover`, hover is `surface-strong`. A secondary button's hover is `surface-strong`, and must never remove the button's box.
- Selected and active states:
  - **List or menu item:** `surface-hover` fill with `accent` text, or `accent` fill with `on-accent` text for the current value in a dropdown.
  - **Toggled-on icon button:** `accent-tint` fill with `accent` icon.
  - **Active tab:** `surface-hover` chip with a bold `accent` label and a 2px `accent` underline.
- Text:
  - `ink` for headings and titles.
  - `text` for values.
  - `text-body` for running copy, list items and inactive tabs.
  - `text-soft` for secondary copy.
  - `text-muted` only for labels, placeholders, hints and empty states. It sits below 4.5:1, so never use it for content a person must read to act.
- Never put white on `accent`. Use `on-accent`.
- Alerts are tinted bars. Each has `radius-md` corners and 6px × 10px padding, and its text sits vertically centred.
  - **Info:** `info-tint` fill with `accent` text.
  - **Warning:** `warning-tint` fill with `warning` text.
  - **Error:** `danger` at 16% for the fill, with `danger-text` for the words.
- Destructive icon buttons rest in `icon` colour. On hover they show a `danger-tint` fill and a `danger` icon. When disabled, they show at 40% opacity with a not-allowed cursor.
- Hairlines use `divider`, 1px. Card outlines and popup borders use `surface-hover`, 1px.

## Typography

- Set everything in Inter (`--font-sans`) with `font-feature-settings: "cv05", "cv08", "ss03"`. Add `"tnum"` wherever numbers stack: grids, totals and numeric fields.
- Use these styles:
  - `page-title` for the app or page name
  - `card-title` for card headers
  - `section-heading` for column groups inside a card
  - `column-header` for grid headers and popup headers
  - `body` for nearly everything else
  - `body-strong` for primary buttons and the active tab
  - `small` for compact secondary buttons
  - `label` for floating labels over a value
  - `caption` for floating labels in 40px popup controls
- Sentence case for labels and buttons ("Clear filters", "Help and support center"). Product nouns keep their own casing.
- Inter is wider than system UI fonts. When it replaces another font, re-measure every fixed-width container, such as panels, date fields and calendar cells, and widen it until no text overflows or touches an icon.

## Spacing and layout

- **Forms:**
  - `space-3` between every pair of fields: text, dropdown, date or numeric.
  - The last checkbox in a run sits `space-3` above the next field.
  - Checkboxes sit 6px apart.
  - The check box aligns with the left edge of the fields above it.
- **Fields:** labels, values and placeholders all start at `space-2.5` (10px) from the field's left edge. A dropdown's value starts exactly under its label. A floating label sits 4px from the top. The value's text box sits 17px below the field top, the same as a text box.
- **Icons inside fields:** icons such as calendar, lookup, clear and chevrons sit 6px from the right edge in a `hit-icon` (28px) or `control-xs` (26px) rounded box, vertically centred. The field reserves 34px of right padding, so text never runs under the icon.
- **Buttons beside fields:** an icon button next to a search field is `space-2` (8px) away. It matches the field's height (`control-lg`), fill (`surface-raised`) and radius.
- **Toolbars:** icon buttons are `control-sm` squares. Rows of toolbar icons align on one baseline. The overflow (⋮) button is the same size and on the same row as the top row of icons. Where a divider separates two icon rows, the gap above it equals the gap below it (6px).
- **Cards:**
  - `radius-lg` corners, a 1px `surface-hover` outline, a `surface-raised` header and a `surface-page` body.
  - Cards end `space-2.5` (10px) clear of any scrollbar.
  - Banner actions (such as "Get More") keep 8px from the card's right edge.
- **Page tabs:** each tab is a fully rounded `surface-raised` chip, 6px apart, sitting 7px above a 1px `divider`. The divider runs the full width. Tabs never sit on it or get cut by it.
- **Side navigator:** it starts level with the top of the first card, never over the tab divider. It has `radius-lg` corners, ends 12px above the window bottom, and pads 20px.
- **Slide-out panels:** never narrower than `panel-w`. When a second column opens, add `panel-ext-w`. Panels must stay resizable, so set these as `min-width`, never as a fixed width.
- **Empty states:** "No records available" and similar text sits `space-3` (12px) in from the grid's left edge, with 8px above and below.

## Shape and states

- Radii:
  - `radius-md` for fields, buttons, hover boxes, chips, list options and alerts.
  - `radius-lg` for cards, popups, menus, dialogs and panels.
  - `radius-sm` only for 20px micro-buttons.
  - Adjacent elements share one radius. A dropdown filter and a text filter in the same row are both 6px and both `control-xs` tall.
- **Every hover state is a box with corners.** That applies to icon buttons, chevrons, spinner arrows, column headers, tabs, list options and menu items. If the platform draws a square highlight (Kendo `::before` overlays, icon backgrounds), remove it. Draw one rounded box only, never two nested ones.
- **Hover boxes have explicit sizes.**
  - Two neighbouring boxes keep `space-1` (4px) between them.
  - Spinner arrows: two 26px boxes with a 4px gap.
  - Column-header hover: a full-height rounded fill drawn inside the cell, so the header's bottom border stays continuous.
- **The first and last options in a list** are rounded on all four corners like every other option, including an "All" placeholder row.
- **Focus:** fields show a 2px `accent` bottom inset plus a 1px `focus-ring`. Hide platform square focus outlines. Never leave a control with no focus indication.
- **Transitions:** background and colour only, 100ms. Nothing slides, scales or bounces.

## Iconography

- Use the platform's own icon set at 20px in toolbars, 16px in compact controls and 18px inside fields. In Epicor, that's Material Design Icons (`mdi-*`) and Kendo SVG icons.
- Icons take `icon` at rest and `accent` on hover or when active. SVG icons must use `fill: currentColor`. A black icon means the platform hard-coded the fill: override it.
- A drawn X (two 2.4-stroke diagonals, round caps) beats a font "×" glyph wherever it must be exactly centred.
- No emoji in UI.

## Content and voice

- Short, plain and literal. A button names its action ("Filter", "Clear filters", "Save search"). Never write "OK, got it".
- Empty states say what is empty ("No records available."). No illustrations.
- Never hide a state. If a platform can't mark the selected option, show the state on the control that opened the menu instead (for example, an `accent-tint` filter button while a filter is on).

## Applying it to other surfaces

- **Web apps and tools:** load the tokens as CSS custom properties. Build components from the guidelines in this system: Button, IconButton, Field, Tabs, Card, ListPopup, DataGrid, Alert and Checkbox.
- **Documents and slides:**
  - `surface-page` ground, `ink` titles, `text-body` copy.
  - `accent` for one emphasis colour per page.
  - `radius-lg` panels, 1px `surface-hover` outlines.
  - Aurora colours only for status.
- **Charts:**
  - Series in this order: `accent`, `icon`, `success`, `warning`, `accent-deep`, with `danger` reserved for negative values.
  - Gridlines use `divider`; axis labels use `text-muted`.
- **Terminals and editors:** use the standard Nord palette. Here, nord0–3 are `surface-page`–`surface-strong`.

## Restyling third-party apps (the Epicor method)

1. **Override variables before selectors.** If the app themes through CSS variables (Kendo `--kendo-*`, app `--focus`), set them first. For example, set `--focus` to transparent to kill square focus outlines.
2. **Inspect, then target.** Read the live DOM. Copy the app's own class names, and scope every rule to the smallest stable ancestor, such as `.ep-view-content`, `.k-grid-filter-popup` or `.ep-panel-search:has(> ep-dropdown-button)`. Never restyle a shared class globally until you've checked every screen that uses it. A search panel, a help panel and a menu can share one class.
3. **Beat specificity honestly.** When an app rule with `!important` wins, repeat a class (`.mdi.mdi`) or add a real ancestor. Don't remove the app's rule.
4. **Never fight the app's layout engine.**
   - Leave the app's inline `top`/`left` and `position` values alone. Adjust with margins or offsets instead.
   - Use `min-width` rather than `width` on resizable panels.
   - Hide nothing the app needs to measure.
5. **Measure, don't eyeball.** After every change, read the bounding boxes: gaps, centres, edges and contrast. Then check the neighbouring screens that share the selector.
6. **Version every round** and keep the stylesheet in source control.

## Review checklist

- [ ] Every hover, selected and focus box has rounded corners. None is nested inside a second box, and none overlaps a neighbour.
- [ ] Every icon is centred horizontally and vertically in its box. Every dropdown chevron is centred in a 26px box, 5px from the edge.
- [ ] Gaps between repeated items are equal. Spacing above and below each divider is equal.
- [ ] Labels, values, placeholders, checkboxes and buttons line up on their column's left edge. A dropdown's value sits under its label.
- [ ] Neighbouring controls share height and radius.
- [ ] No text touches a border, sits under an icon, or is compressed, wrapped or clipped. Re-measure after any font change.
- [ ] No scrollbar overlaps content. Lists and cards keep 8–10px clear on the right.
- [ ] Fields contrast with the surface they sit on, following the Field contrast rule. Read-only fields are tinted, not invisible.
- [ ] Tabs, cards, popups and the first and last list options show all their corners. Nothing is cut off at the bottom.
- [ ] Every state is visible. A selected filter, an active tab and a toggled control can each be told apart without hover.
- [ ] Empty states are inset 12px.
- [ ] Icons are Nord-coloured (`icon` or `accent`), never black or white defaults.
- [ ] Text meets 4.5:1 (3:1 for icons and 24px+ text), apart from the documented `text-muted` exception.
- [ ] The change was checked on every screen that shares the selector.

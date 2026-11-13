# Changelog

## 9.2.0
- **Application Studio:** the left slide-out panels (Layouts, Rules, Events, Views, Data) were light with faint text. They are now raised Nord panels with rounded tree rows, hover and selected states, page-filled search fields and a matching add button. Also covered:
  - The properties header is one raised bar. The zoom control no longer truncates to "10…", and Add/Edit/Delete Page are rounded text buttons.
  - The properties tabs, component toolbox, Problems panel and the help and AI-chat panels inside the designer.
- **BAQ / BPM studio:**
  - Removed the off-palette block and white underline behind the header save/overflow icons, and the dark box behind the breadcrumb.
  - Designer tabs are proper 32px chips.
  - The code editor's minimap and overview ruler are now dark instead of black and grey.
  - The table toolbox icons are visible, with rounded tiles.
  - Query Diagram / Display Fields / Sort Order is a single segmented control.
  - The query-properties tabs stay on one row.
  - The Query Designer sidebar matches the other slide-out panels.
- **Grids:** column headers are the same size and colour everywhere (some non-sortable headers were 14px and accent-coloured).
- **Read-only fields:** use the design system's tinted disabled fill instead of a dashed outline.
- **Toasts:** save, error and info pop-ups are now dark cards with a coloured edge. They were light grey. Tooltips get rounded corners and a hairline border.

## 9.1.2
- Header action buttons: the "has entries" marker (e.g. on Change Log) is a small red dot at the icon's corner again, instead of a large circle covering the icon.

## 9.1.1
- Home tiles look uniform again: unavailable ("Menu is not available") tiles are no longer dimmed.

## 9.1.0
Kinetic-wide sweep against the design system.
- **Studios:** BAQ Designer, BPM Designer and Application Studio get the Nord chrome. This covers the header bar, tab strip, breadcrumbs, badges, category titles, toolbox labels, property panels and zoom control.
- **Monaco editor:** the BAQ phrase and BPM/C# editors are remapped from the light "vs" theme to Nord. That includes the tokens, gutter, cursor, selection, widgets and minimap.
- **Diagrams:** the BAQ Phrase Build, BPM workflow and App Studio page-map canvases get dark canvases and Nord cards and connectors. The BPM widget icons are made visible.
- **Entry forms:** checkbox "shape" tags (PO Approve/Hold/Unconfirmed) become full-width field boxes. Floating labels no longer run under lookup icons.
- **Reports:** page titles truncate only when the header holds fields. Filter multi-selects match field height.
- **Lookups:** the search slideout uses an even field rhythm.
- **Contrast:** the user-panel caption, App Studio layer links and disabled field labels now meet the contrast rule.
- One stylesheet for Firefox and Chromium. Generic `@namespace`/metadata, plus `@updateURL` for automatic Stylus updates.

## 9.0.0
- Generalised for any Kinetic instance (cloud or on-prem): one regexp matcher on `/<instance>/Apps/ERP/`.

## 8.x
- Iterative polish across Home, Layout Management, project entry/tracker pages, grids, popups, the shell panels, dialogs and calendars.

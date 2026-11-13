# Changelog

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

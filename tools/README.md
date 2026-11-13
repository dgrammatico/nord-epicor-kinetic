# Audit tools

Two scripts you can paste into the browser DevTools console on any Kinetic page while the theme is on. Each returns a summary and the offending elements.

- **`nord-audit.js`**: colour and shape. It flags off-palette surfaces and text, text under the 3:1 contrast floor, black icons, square interactive elements, off-centre icons, clipped text and non-Inter text.
- **`nord-layout.js`**: structure. It flags uneven gaps between stacked fields, fields off the 40px height, and controls overflowing their card, panel or popup.

Tips:
- Run them with the window at about 1400×900 and the tab visible. A hidden tab freezes CSS transitions, so computed colours can be stale.
- `nord-layout.js` reports any gap over 16px between fields in the same column. A checkbox or heading between two fields is a legitimate reason for a gap, so check before "fixing".
- An `<img>` icon drawn dark-on-dark isn't visible to these checks. Look for `img[src$=".svg"]` icons with dark fills (BPM's widget icons were one).

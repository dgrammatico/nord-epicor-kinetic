/* Nord Polar Night — in-page audit for Epicor Kinetic.
   Paste into DevTools (or run via automation) on any Kinetic screen with the theme applied.
   Returns findings against the design-system checklist: off-palette surfaces/text, dark-on-dark text,
   black or default-coloured icons, square interactive boxes, off-centre icons, clipped text,
   text running under field icons, non-Inter text. */
(() => {
  const PAL = ['2e3440','272c36','3b4252','434c5e','4c566a','d8dee9','e5e9f0','eceff4','8fbcbb','88c0d0','81a1c1','5e81ac','bf616a','d08770','ebcb8b','a3be8c','b48ead','8f9bb3','a3adbf','e5a1a8','7b88a1','616e88','1f232b','242933']
    .map(h => [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)]);
  const parse = c => { const m = c && c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const dist = c => Math.min(...PAL.map(p => Math.hypot(p[0]-c.r, p[1]-c.g, p[2]-c.b)));
  const lum = c => { const f = v => { v /= 255; return v <= .03928 ? v/12.92 : ((v+.055)/1.055)**2.4; }; return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b); };
  const vis = e => { const r = e.getBoundingClientRect(); if (r.width < 2 || r.height < 2 || r.bottom < 0 || r.right < 0 || r.top > innerHeight || r.left > innerWidth) return false; const s = getComputedStyle(e); return s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > .05; };
  const path = e => { const out = []; let x = e; for (let i = 0; i < 4 && x && x !== document.body; i++) { out.unshift(x.tagName.toLowerCase() + (x.classList.length ? '.' + [...x.classList].filter(c => !/^ng-|^k-state|ng-star/.test(c)).slice(0,3).join('.') : '')); x = x.parentElement; } return out.join(' > '); };
  const bgUnder = e => { let x = e; while (x) { const c = parse(getComputedStyle(x).backgroundColor); if (c && c.a > .9) return c; x = x.parentElement; } return { r: 46, g: 52, b: 64, a: 1 }; };
  const F = { offPaletteSurface: [], offPaletteText: [], lowContrastText: [], blackIcon: [], squareInteractive: [], offCentreIcon: [], clippedText: [], textUnderIcon: [], notInter: [] };
  const add = (k, e, extra) => { if (F[k].length < 25) F[k].push(path(e) + (extra ? '  ' + extra : '')); else F[k].more = (F[k].more || 0) + 1; };
  const all = [...document.querySelectorAll('body *')].filter(e => !e.closest('svg') || e.tagName === 'svg');
  for (const e of all) {
    if (!vis(e)) continue;
    const s = getComputedStyle(e), r = e.getBoundingClientRect();
    const bg = parse(s.backgroundColor);
    if (bg && bg.a > .9 && r.width * r.height > 300 && dist(bg) > 14 && !e.closest('.ep-indicator, img, canvas, .k-chart, kendo-chart, .k-colorpalette, .k-colorgradient, [style*="background-color"]')) add('offPaletteSurface', e, s.backgroundColor);
    const ownText = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    if (ownText) {
      const fg = parse(s.color);
      if (fg && fg.a > .5) {
        if (dist(fg) > 18 && !e.closest('[style*="color"], .ep-indicator')) add('offPaletteText', e, s.color);
        const b = bgUnder(e), L1 = lum(fg), L2 = lum(b), cr = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
        if (cr < 3) add('lowContrastText', e, `${s.color} on ${b.r},${b.g},${b.b} = ${cr.toFixed(2)}`);
      }
      if (!/inter/i.test(s.fontFamily) && !/mdi|material|icon|kendo/i.test(s.fontFamily + ' ' + e.className)) add('notInter', e, s.fontFamily.slice(0, 40));
      if (e.scrollWidth > e.clientWidth + 2 && s.overflow !== 'visible' && s.textOverflow !== 'ellipsis' && e.clientWidth > 0) add('clippedText', e, `${e.scrollWidth}>${e.clientWidth}`);
    }
    if (e.tagName === 'svg') { const fill = parse(s.fill); if (fill && fill.a > .5 && lum(fill) < .02) add('blackIcon', e); }
    const interactive = e.matches('button, [role=button], .k-button, .ep-button, .ep-user-action-button, .k-list-item, .k-menu-link, .k-tabstrip-item, .k-input-button');
    if (interactive && bg && bg.a > .1 && parseFloat(s.borderTopLeftRadius) < 2 && r.width < 400) add('squareInteractive', e, s.backgroundColor);
    if (interactive && r.width <= 48 && r.height <= 48) {
      const ic = e.querySelector('svg, i.mdi, span.mdi, .k-svg-icon, .k-icon');
      if (ic && vis(ic)) { const q = ic.getBoundingClientRect(); const dx = (q.left + q.width/2) - (r.left + r.width/2), dy = (q.top + q.height/2) - (r.top + r.height/2); if (Math.abs(dx) > 1.5 || Math.abs(dy) > 1.5) add('offCentreIcon', e, `dx ${dx.toFixed(1)} dy ${dy.toFixed(1)}`); }
    }
    if (e.matches('input.k-input-inner, input.k-textbox, input.ep-search-input') && e.value) {
      const box = e.closest('.ep-component-top-element, .k-input, .k-picker') || e.parentElement; const btn = box && box.querySelector('.k-input-button, .ep-search-icon, .k-clear-value, i.mdi');
      if (btn && vis(btn)) { const rg = document.createRange(); const t = document.createElement('span'); t.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;font:' + s.font; t.textContent = e.value; document.body.appendChild(t); const tw = t.getBoundingClientRect().width; t.remove(); const textRight = r.left + parseFloat(s.paddingLeft) + tw; if (textRight > btn.getBoundingClientRect().left + 1 && textRight < r.right) add('textUnderIcon', e, `text→${Math.round(textRight)} icon@${Math.round(btn.getBoundingClientRect().left)}`); }
    }
  }
  const summary = Object.fromEntries(Object.entries(F).map(([k, v]) => [k, v.length + (v.more || 0)]));
  return { url: location.hash.slice(0, 80), summary, findings: F };
})();

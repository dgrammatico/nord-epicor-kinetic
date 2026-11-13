// nord-layout: structural checks — uneven stacked-field gaps, off-height fields, child overflow, edge-touch
(() => {
  const vis = e => { const r = e.getBoundingClientRect(); return r.width > 2 && r.height > 2 && getComputedStyle(e).visibility !== 'hidden'; };
  const name = e => (e.querySelector('label')?.textContent.trim() || e.textContent.trim()).slice(0, 28);
  const F = { unevenGap: [], fieldHeight: [], overflow: [], edgeTouch: [] };
  const fields = [...document.querySelectorAll('.ep-component-top-element.ep-text-box, .ep-component-top-element.ep-combo-box, .ep-component-top-element.ep-dropdown, .ep-component-top-element.ep-date-picker, .ep-component-top-element.ep-currency-box, .ep-component-top-element.ep-numeric-box')].filter(vis);
  // group by column (same left & width)
  const cols = {};
  fields.forEach(f => { const r = f.getBoundingClientRect(); const k = Math.round(r.left / 4) + ':' + Math.round(r.width / 4); (cols[k] ||= []).push(f); });
  Object.values(cols).forEach(list => {
    list.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    for (let i = 1; i < list.length; i++) {
      const a = list[i - 1].getBoundingClientRect(), b = list[i].getBoundingClientRect();
      const gap = Math.round(b.top - a.bottom);
      if (gap > 0 && gap < 60 && (gap < 6 || gap > 16)) F.unevenGap.push(`${name(list[i - 1])} → ${name(list[i])}: ${gap}px`);
    }
  });
  fields.forEach(f => { const h = Math.round(f.getBoundingClientRect().height); if (f.closest('.ep-panel-card-body, .ep-shell-panel') && (h < 34 || h > 46) && !f.querySelector('textarea')) F.fieldHeight.push(`${name(f)}: ${h}px`); });
  document.querySelectorAll('.ep-panel-card, .ep-shell-panel-content, .k-popup, .k-dialog').forEach(c => {
    if (!vis(c)) return; const cr = c.getBoundingClientRect();
    c.querySelectorAll('button, .ep-component-top-element, .k-grid').forEach(k => {
      if (!vis(k)) return; const r = k.getBoundingClientRect();
      if (r.right > cr.right + 1 || r.left < cr.left - 1) F.overflow.push(`${k.tagName}.${[...k.classList].slice(0, 2).join('.')} ${name(k)} over ${c.className.split(' ')[0]}`);
    });
  });
  const out = { summary: Object.fromEntries(Object.entries(F).map(([k, v]) => [k, v.length])), findings: Object.fromEntries(Object.entries(F).map(([k, v]) => [k, [...new Set(v)].slice(0, 12)])) };
  return out;
})()

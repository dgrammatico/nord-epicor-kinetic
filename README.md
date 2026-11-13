# Nord Polar Night for Epicor Kinetic

A dark theme for the Epicor Kinetic web client, built on the [Nord](https://www.nordtheme.com/) Polar Night palette. It is a single [Stylus](https://github.com/openstyles/stylus) user style, so it only changes how Kinetic looks in your own browser: nothing is installed on the Epicor server and nothing about your data changes.

It covers the whole web client: Home, entry forms, landing grids and trackers, reports and processes, dashboards, lookups and search slideouts, the shell panels (menu, help, notifications, System Monitor, user panel), Layout Management, and the studios (BAQ Designer, BPM Designer and Application Studio, including the Monaco code editor and the diagram canvases).

Works with Kinetic cloud (`*.epicorsaas.com`) and on-prem: it applies to any address shaped like `https://<host>/<instance>/Apps/ERP/...`.

## Install

### Windows: one script, per user

1. Download this repository (**Code ▸ Download ZIP**) and unzip it, or download just the [`install`](install) folder.
2. Double-click **`install\install.cmd`** (or run `powershell -ExecutionPolicy Bypass -File .\install\Install-NordEpicorTheme.ps1`).
3. Pick your browser(s). For each one the script opens the Stylus page (click **Add**), then opens the theme, where Stylus shows **Install style**: click it.

The script needs no administrator rights. It also installs the [Inter](https://rsms.me/inter/) font for your user account, since the theme is set in Inter (it falls back to Segoe UI without it). Options:

| Option | What it does |
| --- | --- |
| `-Browser Firefox,Chrome,Edge,All` | Skip the browser question |
| `-SkipFont` | Don't install Inter |
| `-SkipStylus` | Don't open the Stylus extension page (already installed) |

### Any OS: manual

1. Install Stylus for [Firefox](https://addons.mozilla.org/firefox/addon/styl-us/), [Chrome](https://chromewebstore.google.com/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne) or [Edge](https://microsoftedge.microsoft.com/addons/detail/stylus/ogjnbcnhnehbhfghiikbmhbjnlnhkljd).
2. Open **[epicor-kinetic-nord.user.css](https://raw.githubusercontent.com/dgrammatico/nord-epicor-kinetic/main/epicor-kinetic-nord.user.css)** and click **Install style** in the Stylus tab that opens.
3. Optional: install [Inter](https://github.com/rsms/inter/releases/latest).

Reload Kinetic after installing.

## Updates

Stylus checks this repository for new versions on its own (the style carries an `@updateURL`). To update right away: **Stylus ▸ Manage ▸ Check for updates**.

## Browsers

One stylesheet serves Firefox and Chromium browsers (Chrome, Edge, Brave and so on). It uses only features both support, such as `:has()`, `scrollbar-width` and prefixed plus unprefixed `mask`. It needs Firefox 121+ or Chromium 121+.

## What's in here

| Path | Contents |
| --- | --- |
| `epicor-kinetic-nord.user.css` | The theme |
| `install/` | Windows installer (`Install-NordEpicorTheme.ps1`) and a double-click launcher |
| `design-system/` | The *Nord Polar Night* design system the theme follows: palette, type, spacing, shape, states, component rules, review checklist, and tokens as JSON and CSS custom properties |
| `tools/` | The audit scripts used to check every page against the design system |
| `CHANGELOG.md` | Version history |

## Customising or contributing

Kinetic is Angular plus Kendo UI with Epicor's own `ep-*` / `erp-*` components. A few rules keep the theme robust:

- Target classes and element names, never the auto-generated `ep-object-id` values (they change between loads).
- Stylus can't see the `#/view/...` hash, so every rule applies to all of Kinetic. Scope by component (`.app-studio-designer …`, `.ep-studio …`), not by page.
- Epicor often uses `!important`. When a rule loses, add specificity (repeat a class or add an ancestor) rather than more `!important`.
- Follow [`design-system/README.md`](design-system/README.md) for colours, spacing, radii and states, and run the audit in `tools/` on the page you changed.

Issues and pull requests are welcome. Please include the Kinetic page and a screenshot.

## Not covered

- The Epicor sign-in page is served by Epicor's identity service on another address, so the theme does not reach it.
- Third-party content shown inside Kinetic in iframes (embedded web apps, report previews from other hosts) keeps its own styling.
- SSRS/Report Builder output (PDF previews) is not restyled.

## Licence

MIT. Not affiliated with or endorsed by Epicor Software Corporation. "Epicor" and "Kinetic" are trademarks of their owner. The Nord palette is by Arctic Ice Studio (MIT).

# Phase 0: Foundation

> Runnable Astro site deployed to GitHub Pages with the Stark & Structural app shell.

## Goal

Establish the project scaffold, design system, shared layout, and deployment pipeline. No tool logic yet — only the shell that every future tool plugs into.

## Prerequisites

- Node.js 20+
- GitHub repository with Pages enabled
- Design reference: [design brief](../design.md), [UI mockup](../../stark_structural_ui_design.html)

## Deliverables

- [ ] Initialize Astro project with TypeScript
- [ ] Install and configure WebcoreUI
- [ ] Extract design tokens from mockup into `src/styles/tokens.css`
- [ ] Build `AppShell.astro` layout (header, sidebar, workspace grid)
- [ ] Implement theme toggle (dark/light) with `localStorage` persistence
- [ ] Create sidebar navigation driven by `src/data/tools.json`
- [ ] Add placeholder tool routes under `src/pages/tools/`
- [ ] Register `coi-serviceworker` stub (inactive until Phase 4)
- [ ] Configure GitHub Actions workflow: build on push to `main`, deploy to Pages
- [ ] Set Astro `site` URL for GitHub Pages base path

## Technical approach

### Astro setup

```bash
npm create astro@latest . -- --template minimal --typescript strict
npm install @webcoreui/astro
```

Configure static output (`output: 'static'`) and set `site` to the GitHub Pages URL.

### Design tokens

Port CSS variables from [`stark_structural_ui_design.html`](../../stark_structural_ui_design.html) lines 3–30 into `src/styles/tokens.css`. Import in the global layout. Theme switching toggles `.light-mode` on the app root element.

### App shell components

| Component | Responsibility |
|-----------|----------------|
| `Header.astro` | Logo, search bar placeholder, theme toggle |
| `Sidebar.astro` | Category-grouped tool list from `tools.json` |
| `ThemeToggle.astro` | Client island: toggle class + persist preference |
| `AppShell.astro` | Grid layout wrapping header + sidebar + `<slot />` |

### Tool registry

`src/data/tools.json` defines sidebar entries:

```json
[
  { "slug": "text-analyzer", "name": "Text Analyzer", "category": "text", "icon": "ti-text-size", "phase": 1 },
  { "slug": "image-converter", "name": "Image Converter", "category": "media", "icon": "ti-file-type-jpg", "phase": 1 },
  { "slug": "md-previewer", "name": "MD Previewer", "category": "dev", "icon": "ti-markdown", "phase": 1 }
]
```

Phase 0 routes render a "Coming soon" placeholder in the workspace.

### CI/CD

GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Checkout, setup Node 20
2. `npm ci && npm run build`
3. Upload `dist/` to GitHub Pages

### coi-serviceworker stub

Install `coi-serviceworker` and register in the base layout. The worker loads but WASM tools are not activated until Phase 4.

## UI / design notes

- Match the mockup grid: 42px header, 200px sidebar, flex workspace
- Zero border-radius, no shadows — borders define structure
- Fonts: Inter (UI) + JetBrains Mono (data/code)
- Search bar shows `⌘K` hint; keyboard shortcut wiring deferred to Phase 1

See [design brief](../design.md) §1 for full visual concept.

## Acceptance criteria

- [ ] `npm run dev` serves the app shell locally
- [ ] `npm run build` produces static output without errors
- [ ] GitHub Actions deploys to GitHub Pages on push to `main`
- [ ] Theme toggle switches dark/light and persists across reloads
- [ ] Sidebar lists placeholder tools with correct categories
- [ ] Clicking a sidebar item navigates to the tool route
- [ ] Layout matches mockup structure (header / sidebar / workspace)

## Out of scope

- Tool interactivity (Phase 1)
- Global search / `Ctrl+K` command palette (Phase 1)
- Sidebar collapse animation (nice-to-have, not blocking)
- PWA manifest or offline caching beyond service worker stub

## Risks & mitigations

| Risk | Mitigation |
|------|------------|
| GitHub Pages base path breaks asset URLs | Set Astro `base` config to repo name |
| WebcoreUI conflicts with custom tokens | Scope WebcoreUI overrides in a dedicated CSS layer |
| Font loading flash (FOUT) | Preload Inter and JetBrains Mono in layout `<head>` |

## Next step

Proceed to [Phase 1: Core Tools](./phase-1-core-tools.md).

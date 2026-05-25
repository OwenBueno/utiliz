# utiliz

A privacy-first, ad-free utility hub where every tool runs entirely in your browser. Files never leave your device. Hosted for free on GitHub Pages.

## Development

```bash
npm install
npm run dev      # http://localhost:4321/utiliz/
npm run build
npm run preview
```

## Deployment

Pushes to `main` deploy via GitHub Actions to [GitHub Pages](https://owenbueno.github.io/utiliz/).

One-time setup: Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Documentation

| Doc | Description |
|-----|-------------|
| [Roadmap](docs/roadmap.md) | Phased implementation plan and timeline |
| [Technical architecture](docs/tech.md) | Stack, design tokens, tool patterns, project structure |
| [Design brief](docs/design.md) | Stark & Structural UI concept and Phase 1 tool specs |
| [Executive summary](docs/executive.md) | Business context and strategy |
| [UI mockup](stark_structural_ui_design.html) | Interactive prototype of the app shell and Phase 1 tools |

## Phases

1. **[Foundation](docs/phases/phase-0-foundation.md)** — Astro scaffold, app shell, CI/CD
2. **[Core Tools](docs/phases/phase-1-core-tools.md)** — Text Analyzer, Image Converter, MD Previewer
3. **[PDF Suite](docs/phases/phase-2-pdf-suite.md)** — Merge, split, image-to-PDF
4. **[Local AI](docs/phases/phase-3-local-ai.md)** — Browser-based text humanizer
5. **[WASM Media](docs/phases/phase-4-wasm-media.md)** — Audio transcoder, image OCR

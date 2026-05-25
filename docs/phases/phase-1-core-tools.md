# Phase 1: Core Tools

> Ship three fast, zero-dependency utilities that prove the platform works — text analysis, image conversion, and markdown preview.

## Goal

Replace placeholder tool routes with fully functional, client-side utilities. Every tool uses only browser-native APIs — no external libraries. Optional fourth tool: QR Generator/Scanner.

## Prerequisites

- [Phase 0: Foundation](./phase-0-foundation.md) complete
- App shell deployed and navigable
- Design tokens and layout components in place

## Deliverables

### Tool 1: Unified Text Analyzer

- [ ] Split-pane layout: textarea (left) + stats grid (right)
- [ ] Live counters: characters (total/no spaces), words, sentences, paragraphs
- [ ] Readability metrics: reading time (200 WPM), speaking time (130 WPM)
- [ ] Actions: copy text, clear workspace, toggle case (UPPER / lower / Title)
- [ ] Auto-focus textarea on page load

### Tool 2: One-Click Image Converter

- [ ] Drag-and-drop zone with border highlight on drag-over
- [ ] File picker fallback (PNG, JPEG, WebP, AVIF)
- [ ] Format dropdown: WebP, JPEG, PNG
- [ ] Quality slider (1–100)
- [ ] Thumbnail preview with file name and size
- [ ] Convert & download via Canvas API (`canvas.toBlob`)

### Tool 3: Split-View Markdown Previewer

- [ ] 50/50 horizontal split: editor (left) + rendered preview (right)
- [ ] Line numbers in editor gutter
- [ ] Live HTML rendering on input
- [ ] Synchronized scrolling (editor scroll drives preview)
- [ ] Status bar: line count, word count, sync indicator

### Stretch: QR Generator / Scanner

- [ ] Generate QR codes from text input (Canvas or SVG)
- [ ] Scan QR codes via device camera (`BarcodeDetector` API with fallback message)
- [ ] Download generated QR as PNG

## Technical approach

### Reference implementation

Logic and layout are prototyped in [`stark_structural_ui_design.html`](../../stark_structural_ui_design.html):

| Tool | Mockup lines | Key functions |
|------|-------------|---------------|
| Text Analyzer | 418–447, 565–595 | `analyzeText()`, `toggleCase()` |
| Image Converter | 449–490, 597–632 | `loadImage()`, `convertImage()` via Canvas |
| MD Previewer | 492–530, 634–666 | `simpleMarkdown()`, `syncScroll()` |

Port vanilla JS logic into TypeScript island scripts under `src/scripts/tools/`.

### File structure

```
src/pages/tools/text-analyzer.astro
src/pages/tools/image-converter.astro
src/pages/tools/md-previewer.astro
src/scripts/tools/text-analyzer.ts
src/scripts/tools/image-converter.ts
src/scripts/tools/md-previewer.ts
src/styles/tools/text-analyzer.css
src/styles/tools/image-converter.css
src/styles/tools/md-previewer.css
```

### Astro islands

Each tool page uses `AppShell` layout and loads its script as a client island:

```astro
---
import AppShell from '../../layouts/AppShell.astro';
---
<AppShell title="Text Analyzer" activeTool="text-analyzer">
  <!-- tool markup -->
</AppShell>
<script src="../../scripts/tools/text-analyzer.ts"></script>
```

### Markdown rendering

Phase 1 uses a lightweight custom parser (as in the mockup). Do not add a markdown library — keep bundle size at zero. Support: headings, bold, italic, code blocks, blockquotes, lists.

### Image conversion

Use `HTMLCanvasElement.toBlob()` with MIME type and quality parameters. No server round-trip. Revoke object URLs after download to prevent memory leaks.

## UI / design notes

Full specs in [design brief](../design.md) §2. Key layout patterns:

| Tool | Layout class | Panes |
|------|-------------|-------|
| Text Analyzer | `split-v` | Input (flex) + Stats (320px) |
| Image Converter | Vertical stack | Drop zone → preview → controls |
| MD Previewer | `split-h` | Editor (50%) + Preview (50%) |

Each tool header shows a mono file-name title (e.g. `text-analyzer.tsx`) and a live badge.

## Acceptance criteria

- [ ] All three tools function with JavaScript disabled gracefully (static shell visible)
- [ ] Text Analyzer updates all stats in real time as user types
- [ ] Image Converter accepts drag-drop and file picker; download produces valid file
- [ ] MD Previewer renders headings, code, lists, blockquotes correctly
- [ ] Scroll sync keeps preview aligned with editor position
- [ ] All tools work offline after initial page load
- [ ] No external JS libraries loaded on any Phase 1 route
- [ ] Tools match mockup layout and use design tokens exclusively

## Out of scope

- PDF tools (Phase 2)
- Persistent text/image storage (localStorage, IndexedDB)
- Full CommonMark/GFM compliance for markdown
- Multi-file batch image conversion
- QR stretch goal is optional — do not block Phase 1 exit on it

## Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Large images crash tab | Show file-size warning above 50MB; disable convert button |
| Simple markdown parser misses edge cases | Document supported syntax in tool header tooltip |
| Canvas API lacks AVIF encode support | Detect support; hide AVIF output option if unavailable |
| Clipboard API blocked without HTTPS | GitHub Pages serves HTTPS; show fallback copy message on failure |

## Next step

Proceed to [Phase 2: PDF Suite](./phase-2-pdf-suite.md).

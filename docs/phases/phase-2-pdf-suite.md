# Phase 2: PDF Suite

> Client-side PDF manipulation — merge, split, and convert images to PDF — powered by pdf-lib.

## Goal

Add document processing tools that handle PDF files entirely in the browser. Users can combine multiple PDFs, extract page ranges, and package images into a standard PDF layout.

## Prerequisites

- [Phase 1: Core Tools](./phase-1-core-tools.md) complete
- App shell and tool plugin pattern established
- File handling patterns from Image Converter reusable

## Deliverables

### Tool 4: PDF Merger

- [ ] Multi-file upload (drag-drop or file picker)
- [ ] Reorderable file list before merge
- [ ] Progress indicator during merge
- [ ] Download merged PDF

### Tool 5: PDF Splitter

- [ ] Upload single PDF
- [ ] Page range input (e.g. "1-3, 5, 7-10")
- [ ] Preview page count and selected range
- [ ] Download extracted pages as new PDF

### Tool 6: Image-to-PDF

- [ ] Multi-image upload (PNG, JPEG, WebP)
- [ ] Reorderable image list
- [ ] Layout options: one image per page, grid (2×2)
- [ ] Page size selector (A4, Letter)
- [ ] Download generated PDF

### Shared infrastructure

- [ ] `FileSizeWarning` component active on all PDF routes (200MB soft limit)
- [ ] Progress bar component for long operations
- [ ] Lazy-load `pdf-lib` via dynamic import (not in global bundle)

## Technical approach

### Library

[pdf-lib](https://pdf-lib.js.org/) — pure JavaScript PDF creation and manipulation. No WASM required. Works in all modern browsers.

```typescript
const { PDFDocument } = await import('pdf-lib');
```

### PDF Merger flow

```mermaid
flowchart LR
    Upload[UploadPDFs] --> Order[ReorderList]
    Order --> Merge[pdf_lib_merge]
    Merge --> Download[DownloadBlob]
```

1. Read each file as `ArrayBuffer`
2. Load into `PDFDocument.load()`
3. Copy all pages into a new `PDFDocument.create()`
4. Save and trigger download via `Blob` + anchor click

### PDF Splitter flow

1. Load PDF, get page count
2. Parse range string into page indices
3. Create new document with selected pages via `copyPages()`
4. Save and download

### Image-to-PDF flow

1. Load images via `FileReader` → `HTMLImageElement`
2. Create PDF with selected page dimensions
3. Embed each image scaled to fit page
4. Save and download

### Memory management

PDF operations can consume significant RAM for large files.

| Threshold | Action |
|-----------|--------|
| > 50MB | Show info banner with estimated processing time |
| > 200MB | Show warning banner; require explicit confirmation |
| Processing | Show progress bar; allow cancel via `AbortController` |

### File structure

```
src/pages/tools/pdf-merger.astro
src/pages/tools/pdf-splitter.astro
src/pages/tools/image-to-pdf.astro
src/scripts/tools/pdf-merger.ts
src/scripts/tools/pdf-splitter.ts
src/scripts/tools/image-to-pdf.ts
src/lib/pdf-utils.ts          # Shared merge/split helpers
src/components/ProgressBar.astro
```

Update `src/data/tools.json` with new entries under a `pdf` category.

## UI / design notes

Follow the Stark & Structural pattern from Phase 1:

- Solid-bordered drop zones (same as Image Converter)
- Mono labels for file names and page counts
- Control rows with uppercase labels (format, quality, layout)
- Full-width accent button for primary action ("merge & download")

Tool headers: `pdf-merger.tsx`, `pdf-splitter.tsx`, `image-to-pdf.tsx` with `pdf-lib` badge.

## Acceptance criteria

- [ ] Merge 2+ PDFs into a single valid PDF
- [ ] Split PDF by page range; output opens correctly in a PDF reader
- [ ] Convert 1+ images to a multi-page PDF
- [ ] All operations complete without any network request (verify in DevTools)
- [ ] `pdf-lib` is not in the initial page bundle (check Network tab — loaded on demand)
- [ ] File-size warning appears for files over 200MB
- [ ] Progress indicator visible during operations on files > 5MB

## Out of scope

- PDF text extraction or OCR (Phase 4)
- PDF encryption/password protection
- Form filling or digital signatures
- PDF-to-image conversion (consider for a future phase)
- Editing PDF content (text, annotations)

## Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Large PDFs exhaust browser memory | File-size warnings; process sequentially, not in parallel |
| pdf-lib bundle size (~500KB) | Dynamic import per route; never in global bundle |
| Corrupted PDF input crashes tool | Wrap in try/catch; show user-friendly error with file name |
| Page range parsing edge cases | Validate input; show preview of selected pages before split |

## Next step

Proceed to [Phase 3: Local AI](./phase-3-local-ai.md).

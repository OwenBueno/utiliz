# Phase 4: WASM Media

> Heavy media processing via WebAssembly — audio transcoding and image OCR — with cross-origin isolation enabled.

## Goal

Add advanced media tools that require WebAssembly and SharedArrayBuffer. Activate `coi-serviceworker` to emulate COOP/COEP headers on GitHub Pages, enabling multi-threaded WASM execution.

## Prerequisites

- [Phase 3: Local AI](./phase-3-local-ai.md) complete
- `coi-serviceworker` stub registered in Phase 0
- File-size warning and progress bar components from Phase 2
- User comfortable with memory constraints from PDF and AI tools

## Deliverables

### Tool 8: Audio Transcoder

- [ ] Upload audio file (WAV, FLAC, OGG, MP3)
- [ ] Output format selector (MP3, WAV, OGG, AAC)
- [ ] Bitrate/quality controls
- [ ] Progress bar during transcoding
- [ ] Download converted file

### Tool 9: Image OCR

- [ ] Upload image (PNG, JPEG, WebP, TIFF)
- [ ] Language selector (English default; add Spanish, French)
- [ ] Progress bar during recognition
- [ ] Extracted text displayed in copyable textarea
- [ ] Download as .txt file

### Infrastructure

- [ ] Activate `coi-serviceworker` with full COOP/COEP emulation
- [ ] Verify `crossOriginIsolated` is `true` before loading WASM
- [ ] Web Worker strategy for ffmpeg and Tesseract (off main thread)
- [ ] Graceful degradation message if isolation fails

## Technical approach

### Cross-origin isolation

GitHub Pages cannot set required HTTP headers. `coi-serviceworker` intercepts responses to inject:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

Activation checklist:
- [ ] Service worker registered on first visit (from Phase 0 stub)
- [ ] Page reloads once after SW activation
- [ ] `window.crossOriginIsolated === true` verified before WASM load
- [ ] Fallback UI if isolation unavailable (browser doesn't support SW)

### Audio transcoder (ffmpeg.wasm)

```mermaid
flowchart LR
    Upload[UploadAudio] --> Worker[FFmpegWebWorker]
    Worker --> WASM[ffmpeg_core_wasm]
    WASM --> Progress[ProgressEvents]
    Progress --> Download[DownloadBlob]
```

```typescript
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

const ffmpeg = new FFmpeg();
await ffmpeg.load(); // downloads ~25MB WASM core
await ffmpeg.writeFile('input.wav', await fetchFile(file));
await ffmpeg.exec(['-i', 'input.wav', '-codec:a', 'libmp3lame', '-b:a', '192k', 'output.mp3']);
const data = await ffmpeg.readFile('output.mp3');
```

Run ffmpeg in a dedicated Web Worker to keep the UI responsive. Progress events update the progress bar.

### Image OCR (Tesseract.js)

```typescript
import Tesseract from 'tesseract.js';

const { data: { text } } = await Tesseract.recognize(imageFile, 'eng', {
  logger: (m) => updateProgress(m.progress),
});
```

Tesseract.js ships its own WASM worker. Language data files (~10MB per language) download on first use and cache in IndexedDB.

### Memory and file limits

| Tool | Recommended max | Hard warning |
|------|----------------|--------------|
| Audio transcoder | 100MB | 200MB |
| Image OCR | 20MB | 50MB |

WASM tools allocate large contiguous memory blocks. Warn aggressively and allow cancel mid-operation.

### File structure

```
src/pages/tools/audio-transcoder.astro
src/pages/tools/image-ocr.astro
src/scripts/tools/audio-transcoder.ts
src/scripts/tools/image-ocr.ts
src/lib/wasm/isolation-check.ts    # Verify crossOriginIsolated
src/lib/wasm/ffmpeg-worker.ts      # FFmpeg Web Worker wrapper
src/lib/wasm/tesseract-loader.ts   # Tesseract init + language cache
public/coi-serviceworker.js        # Service worker script
```

Update `src/data/tools.json` with `media` category entries.

## UI / design notes

Both tools follow established patterns:

| Tool | Layout | Primary action |
|------|--------|---------------|
| Audio Transcoder | Drop zone → format controls → progress → download | "transcode & download" |
| Image OCR | Drop zone → language selector → progress → text output | "extract text" |

Tool headers: `audio-transcoder.tsx` (badge: `ffmpeg.wasm`), `image-ocr.tsx` (badge: `tesseract.js`).

Show isolation status in status bar: `● wasm ready` (green) or `○ wasm unavailable` (amber).

## Acceptance criteria

- [ ] `window.crossOriginIsolated` is `true` after service worker activation
- [ ] WAV file converts to MP3 and downloads as valid audio
- [ ] OCR extracts readable text from a clear photo of printed text
- [ ] Progress bars update during transcoding and OCR
- [ ] WASM modules load on demand (not in initial bundle)
- [ ] Tools degrade gracefully when COOP/COEP emulation fails
- [ ] Cancel button aborts in-progress WASM operation
- [ ] No files sent over network during processing (verify in DevTools)

## Out of scope

- Video transcoding (future phase — significantly larger WASM payload)
- Real-time audio streaming or live OCR via camera
- Batch processing of multiple files
- Cloud OCR APIs (Google Vision, AWS Textract)
- Audio editing (trim, merge, effects)

## Risks & mitigations

| Risk | Mitigation |
|------|------------|
| coi-serviceworker fails on some browsers | Detect and show clear message; link to supported browsers |
| ffmpeg.wasm core is ~25MB download | Show size before first use; cache in IndexedDB |
| SharedArrayBuffer unavailable | Required for ffmpeg threading; block tool with explanation |
| Mobile browsers lack WASM performance | Warn on mobile; recommend desktop for large files |
| Service worker conflicts with GitHub Pages caching | Test SW update strategy; version the worker script |
| Safari COEP limitations | Test on Safari; document known issues |

## Next step

Phase 4 completes the initial roadmap. Future phases may add video transcoding, additional text tools, PWA offline support, and expanded language packs for OCR.

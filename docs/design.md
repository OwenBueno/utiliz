### Design & Phase 1 Tool Brief

This design brief outlines a highly structured, utilitarian, and distraction-free user interface combined with the core requirements for the initial Phase 1 launch.

---

### 1. Visual & UI Design Concept: "Stark & Structural"
To avoid the generic, gradient-heavy, and over-polished aesthetic common in AI-generated landing pages, this design focuses on high-contrast grids, micro-interactions, and functional typography.

*   **The Grid Layout:** Inspired by technical software interfaces (like code editors or CAD tools). The page is divided into clear, solid-bordered panes rather than floating cards with soft shadows.
*   **Dual-Theme System:**
    *   **Black Theme (True Dark):** Background is pitch black (`#000000`). Borders are thin, crisp, muted grays (`#1F1F1F`). Accents are stark white and neon green/amber for active states.
    *   **Light Theme (Stark White):** Background is paper white (`#FFFFFF`). Borders are light gray (`#E4E4E7`). Text is solid near-black (`#09090B`).
*   **Typography:** Strict, highly readable sans-serif (such as *Inter* or *Geist*) paired with monospace fonts (*JetBrains Mono* or *Fira Code*) for numbers, statistics, and code outputs.
*   **Structure:**
    1.  **Header:** Minimal title, a global search input (`Ctrl + K` menu), and a simple toggle button for Light/Black themes.
    2.  **Left Sidebar (Collapsible):** Simple text list of available tools, categorized with minimal icons.
    3.  **Center Workspace:** The active tool pane, utilizing 100% of the remaining screen space for maximum focus.

---

### 2. Phase 1 Core Tool Specifications

To launch a usable site immediately, Phase 1 focuses on three essential, fast-loading utilities:

#### Tool 1: Unified Text Analyzer (All-in-One Counter)
*   **Visual Layout:** A split-pane workspace. 
    *   *Left Side:* A large, borderless `<textarea>` that auto-focuses on load, prompting the user to "Type or paste text here...".
    *   *Right Side:* A clean vertical grid presenting live statistics.
*   **Features:**
    *   **Counters:** Live updates for Character Count (with and without spaces), Word Count, Sentence Count, and Paragraph Count.
    *   **Readability metrics:** Estimated reading time (based on 200 WPM) and estimated speaking time.
    *   **Actions:** One-click buttons to "Copy Text," "Clear Workspace," and "Toggle Case" (UPPERCASE, lowercase, Title Case).

#### Tool 2: One-Click Image Converter
*   **Visual Layout:** A solid-bordered drag-and-drop zone that changes border style on drag-over.
*   **Features:**
    *   Accepts any common image file (PNG, JPEG, WebP, AVIF).
    *   **Simple Controls:** A small dropdown menu to select the target format (e.g., "Convert to WebP") and a quality slider.
    *   **Output:** Generates a thumbnail preview and an instant "Download" button utilizing the browser's local `<canvas>` API.

#### Tool 3: Split-View Markdown Previewer
*   **Visual Layout:** A 50/50 horizontal split-screen editor.
*   **Features:**
    *   *Left Pane:* Raw Markdown text editor with line numbers.
    *   *Right Pane:* Live rendered HTML preview with synchronized scrolling (scrolling the left pane automatically scrolls the right pane to match).
const WARN_BYTES = 50 * 1024 * 1024;
const BLOCK_BYTES = 200 * 1024 * 1024;

export interface FileSizeCheck {
  warn: boolean;
  block: boolean;
  message: string;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function checkFileSize(file: File): FileSizeCheck {
  if (file.size >= BLOCK_BYTES) {
    return {
      warn: true,
      block: true,
      message: `File exceeds 200MB (${formatFileSize(file.size)}). Conversion disabled to protect browser memory.`,
    };
  }
  if (file.size >= WARN_BYTES) {
    return {
      warn: true,
      block: false,
      message: `Large file (${formatFileSize(file.size)}). Processing may be slow or fail.`,
    };
  }
  return { warn: false, block: false, message: '' };
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function revokeObjectUrl(url: string | null | undefined): void {
  if (url) URL.revokeObjectURL(url);
}

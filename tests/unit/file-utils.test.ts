import { describe, expect, it } from 'vitest';
import { checkFileSize, formatFileSize } from '../../src/lib/file-utils.ts';

function mockFile(size: number, name = 'test.png'): File {
  const file = new File([], name, { type: 'image/png' });
  Object.defineProperty(file, 'size', { value: size });
  return file;
}

describe('formatFileSize', () => {
  it('formats bytes, kilobytes, and megabytes', () => {
    expect(formatFileSize(500)).toBe('500 B');
    expect(formatFileSize(1536)).toBe('1.5 KB');
    expect(formatFileSize(2.3 * 1024 * 1024)).toBe('2.3 MB');
  });
});

describe('checkFileSize', () => {
  it('allows files under 50MB', () => {
    const result = checkFileSize(mockFile(10 * 1024 * 1024));
    expect(result.warn).toBe(false);
    expect(result.block).toBe(false);
    expect(result.message).toBe('');
  });

  it('warns for files between 50MB and 200MB', () => {
    const result = checkFileSize(mockFile(60 * 1024 * 1024));
    expect(result.warn).toBe(true);
    expect(result.block).toBe(false);
    expect(result.message).toContain('Large file');
  });

  it('blocks files at or above 200MB', () => {
    const result = checkFileSize(mockFile(250 * 1024 * 1024));
    expect(result.warn).toBe(true);
    expect(result.block).toBe(true);
    expect(result.message).toContain('200MB');
  });
});

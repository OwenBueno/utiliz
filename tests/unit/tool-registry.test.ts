import { describe, expect, it } from 'vitest';
import {
  getToolPath,
  getTools,
  getToolsByCategory,
  resolveToolPath,
} from '../../src/lib/tool-registry.ts';

describe('getTools', () => {
  it('returns three Phase 1 tools', () => {
    const tools = getTools();
    expect(tools).toHaveLength(3);
    expect(tools.map((t) => t.slug)).toEqual([
      'text-analyzer',
      'image-converter',
      'md-previewer',
    ]);
  });
});

describe('getToolsByCategory', () => {
  it('groups tools in category order', () => {
    const grouped = getToolsByCategory();
    expect([...grouped.keys()]).toEqual(['text', 'media', 'dev']);
    expect(grouped.get('text')).toHaveLength(1);
    expect(grouped.get('media')?.[0]?.slug).toBe('image-converter');
  });
});

describe('resolveToolPath', () => {
  it('builds path with base URL', () => {
    expect(resolveToolPath('text-analyzer', '/utiliz/')).toBe('/utiliz/tools/text-analyzer/');
  });
});

describe('getToolPath', () => {
  it('ends with tool slug path', () => {
    expect(getToolPath('text-analyzer')).toMatch(/tools\/text-analyzer\/$/);
  });
});

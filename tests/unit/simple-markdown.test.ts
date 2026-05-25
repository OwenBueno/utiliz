import { describe, expect, it } from 'vitest';
import {
  countLines,
  countMarkdownWords,
  simpleMarkdown,
} from '../../src/lib/simple-markdown.ts';

describe('simpleMarkdown', () => {
  it('renders headings', () => {
    expect(simpleMarkdown('# Title')).toContain('<h1>Title</h1>');
    expect(simpleMarkdown('## Sub')).toContain('<h2>Sub</h2>');
    expect(simpleMarkdown('### H3')).toContain('<h3>H3</h3>');
  });

  it('renders bold and italic', () => {
    expect(simpleMarkdown('**bold**')).toContain('<strong>bold</strong>');
    expect(simpleMarkdown('*italic*')).toContain('<em>italic</em>');
  });

  it('renders inline code', () => {
    expect(simpleMarkdown('`code`')).toContain('<code>code</code>');
  });

  it('renders blockquotes', () => {
    expect(simpleMarkdown('> quote')).toContain('<blockquote>quote</blockquote>');
  });

  it('renders list items', () => {
    expect(simpleMarkdown('- item')).toContain('<li>item</li>');
  });

  it('escapes HTML for XSS safety', () => {
    expect(simpleMarkdown('<script>alert(1)</script>')).toContain('&lt;script&gt;');
    expect(simpleMarkdown('<script>alert(1)</script>')).not.toContain('<script>');
  });

  it('renders fenced code blocks', () => {
    const result = simpleMarkdown('```js\nconst x = 1;\n```');
    expect(result).toContain('<pre><code>');
    expect(result).toContain('const x = 1;');
  });
});

describe('countLines', () => {
  it('counts newline-separated lines', () => {
    expect(countLines('a\nb\nc')).toBe(3);
    expect(countLines('single')).toBe(1);
  });
});

describe('countMarkdownWords', () => {
  it('counts words like text-stats', () => {
    expect(countMarkdownWords('hello world')).toBe(2);
    expect(countMarkdownWords('')).toBe(0);
  });
});

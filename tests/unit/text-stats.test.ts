import { describe, expect, it } from 'vitest';
import {
  caseModeLabel,
  computeTextStats,
  countParagraphs,
  countSentences,
  countWords,
  nextCaseMode,
  readingTime,
  speakingTime,
  toggleCase,
} from '../../src/lib/text-stats.ts';

describe('countWords', () => {
  it('returns 0 for empty or whitespace-only text', () => {
    expect(countWords('')).toBe(0);
    expect(countWords('   ')).toBe(0);
  });

  it('counts words correctly', () => {
    expect(countWords('hello')).toBe(1);
    expect(countWords('hello world')).toBe(2);
    expect(countWords('  hello   world  ')).toBe(2);
  });
});

describe('countSentences', () => {
  it('returns 0 when no sentence punctuation', () => {
    expect(countSentences('hello world')).toBe(0);
  });

  it('counts sentence-ending punctuation groups', () => {
    expect(countSentences('Hello. World! How?')).toBe(3);
  });
});

describe('countParagraphs', () => {
  it('returns 0 for empty text', () => {
    expect(countParagraphs('')).toBe(0);
  });

  it('counts paragraphs separated by blank lines', () => {
    expect(countParagraphs('one')).toBe(1);
    expect(countParagraphs('one\n\ntwo')).toBe(2);
  });
});

describe('readingTime and speakingTime', () => {
  it('formats zero words as 0s', () => {
    expect(readingTime(0)).toBe('0s');
    expect(speakingTime(0)).toBe('0s');
  });

  it('formats 200 words as 1m reading time', () => {
    expect(readingTime(200)).toBe('1m');
  });

  it('formats short durations in seconds', () => {
    expect(readingTime(10)).toBe('3s');
  });
});

describe('toggleCase', () => {
  it('applies upper, lower, and title case', () => {
    expect(toggleCase('Hello World', 'upper')).toBe('HELLO WORLD');
    expect(toggleCase('Hello World', 'lower')).toBe('hello world');
    expect(toggleCase('hello world', 'title')).toBe('Hello World');
  });
});

describe('nextCaseMode', () => {
  it('cycles upper → lower → title → upper', () => {
    expect(nextCaseMode('upper')).toBe('lower');
    expect(nextCaseMode('lower')).toBe('title');
    expect(nextCaseMode('title')).toBe('upper');
  });
});

describe('caseModeLabel', () => {
  it('returns mode name', () => {
    expect(caseModeLabel('upper')).toBe('upper');
    expect(caseModeLabel('lower')).toBe('lower');
    expect(caseModeLabel('title')).toBe('title');
  });
});

describe('computeTextStats', () => {
  it('returns full stats for known input', () => {
    const text = 'Hello world. Second sentence.';
    const stats = computeTextStats(text);

    expect(stats).toEqual({
      charTotal: text.length,
      charNoSpace: text.replace(/\s/g, '').length,
      words: 4,
      sentences: 2,
      paragraphs: 1,
      readTime: readingTime(4),
      speakTime: speakingTime(4),
    });
  });
});

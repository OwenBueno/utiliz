export type CaseMode = 'upper' | 'lower' | 'title';

const READING_WPM = 200;
const SPEAKING_WPM = 130;

export function countWords(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

export function countSentences(text: string): number {
  return (text.match(/[.!?]+/g) ?? []).length;
}

export function countParagraphs(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\n\s*\n/).length;
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  return `${Math.round(seconds / 60)}m`;
}

export function readingTime(words: number): string {
  const seconds = Math.round((words / READING_WPM) * 60);
  return formatDuration(seconds);
}

export function speakingTime(words: number): string {
  const seconds = Math.round((words / SPEAKING_WPM) * 60);
  return formatDuration(seconds);
}

export function toggleCase(text: string, mode: CaseMode): string {
  if (mode === 'upper') return text.toUpperCase();
  if (mode === 'lower') return text.toLowerCase();
  return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export function nextCaseMode(current: CaseMode): CaseMode {
  if (current === 'upper') return 'lower';
  if (current === 'lower') return 'title';
  return 'upper';
}

export function caseModeLabel(mode: CaseMode): string {
  if (mode === 'upper') return 'upper';
  if (mode === 'lower') return 'lower';
  return 'title';
}

export interface TextStats {
  charTotal: number;
  charNoSpace: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readTime: string;
  speakTime: string;
}

export function computeTextStats(text: string): TextStats {
  const words = countWords(text);
  return {
    charTotal: text.length,
    charNoSpace: text.replace(/\s/g, '').length,
    words,
    sentences: countSentences(text),
    paragraphs: countParagraphs(text),
    readTime: readingTime(words),
    speakTime: speakingTime(words),
  };
}

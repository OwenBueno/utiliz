import {
  countLines,
  countMarkdownWords,
  simpleMarkdown,
} from '../../lib/simple-markdown.ts';

export function initMdPreviewer(): void {
  const mdInput = document.getElementById('mdInput') as HTMLTextAreaElement | null;
  const mdPreview = document.getElementById('mdPreview');
  const lineNums = document.getElementById('lineNums');
  const lineCount = document.getElementById('lineCount');
  const mdWords = document.getElementById('mdWords');

  if (!mdInput || !mdPreview || !lineNums) return;

  const updateLineNums = () => {
    const lines = countLines(mdInput.value);
    lineNums.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
    if (lineCount) lineCount.textContent = String(lines);
  };

  const updatePreview = () => {
    mdPreview.innerHTML = simpleMarkdown(mdInput.value);
    if (mdWords) mdWords.textContent = String(countMarkdownWords(mdInput.value));
    updateLineNums();
  };

  const syncScroll = () => {
    const maxEditor = mdInput.scrollHeight - mdInput.clientHeight;
    const maxPreview = mdPreview.scrollHeight - mdPreview.clientHeight;
    const ratio = maxEditor > 0 ? mdInput.scrollTop / maxEditor : 0;
    mdPreview.scrollTop = ratio * maxPreview;
  };

  mdInput.addEventListener('input', updatePreview);
  mdInput.addEventListener('scroll', syncScroll);

  updatePreview();
}

import {
  caseModeLabel,
  computeTextStats,
  nextCaseMode,
  toggleCase,
  type CaseMode,
} from '../../lib/text-stats.ts';

export function initTextAnalyzer(): void {
  const textarea = document.getElementById('textInput') as HTMLTextAreaElement | null;
  const caseBtn = document.getElementById('caseBtn');

  if (!textarea) return;

  let caseMode: CaseMode = 'title';

  const updateStats = () => {
    const stats = computeTextStats(textarea.value);
    setText('charTotal', String(stats.charTotal));
    setText('charNoSpace', String(stats.charNoSpace));
    setText('wordCount', String(stats.words));
    setText('sentCount', String(stats.sentences));
    setText('paraCount', String(stats.paragraphs));
    setText('readTime', stats.readTime);
    setText('speakTime', stats.speakTime);
  };

  textarea.addEventListener('input', updateStats);

  document.getElementById('copyBtn')?.addEventListener('click', () => {
    if (textarea.value) {
      navigator.clipboard.writeText(textarea.value).catch(() => {});
    }
  });

  document.getElementById('clearBtn')?.addEventListener('click', () => {
    textarea.value = '';
    updateStats();
    textarea.focus();
  });

  caseBtn?.addEventListener('click', () => {
    caseMode = nextCaseMode(caseMode);
    textarea.value = toggleCase(textarea.value, caseMode);
    if (caseBtn) {
      caseBtn.textContent = caseModeLabel(caseMode);
    }
    updateStats();
  });

  updateStats();
  textarea.focus();
}

function setText(id: string, value: string): void {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

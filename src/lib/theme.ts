const STORAGE_KEY = 'theme';

export type Theme = 'dark' | 'light';

export function getStoredTheme(): Theme {
  if (typeof localStorage === 'undefined') return 'dark';
  return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('light-mode', theme === 'light');
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
}

export function toggleTheme(): Theme {
  const next: Theme = getStoredTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

export function initThemeToggle(): void {
  const button = document.getElementById('theme-btn');
  const label = document.getElementById('theme-label');

  if (!button || !label) return;

  const updateUi = (theme: Theme) => {
    if (theme === 'dark') {
      button.textContent = 'LIGHT MODE';
      label.textContent = '● DARK';
    } else {
      button.textContent = 'DARK MODE';
      label.textContent = '● LIGHT';
    }
  };

  applyTheme(getStoredTheme());
  updateUi(getStoredTheme());

  button.addEventListener('click', () => {
    updateUi(toggleTheme());
  });
}

export function registerServiceWorker(): void {
  if (!('serviceWorker' in navigator)) return;

  const swUrl = `${import.meta.env.BASE_URL}coi-serviceworker.js`;
  navigator.serviceWorker.register(swUrl).catch(() => {});
}

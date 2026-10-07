(() => {
  const storageKey = 'anirudh-portfolio-theme';
  const root = document.documentElement;
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');

  const storedTheme = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  };

  const preferredTheme = () => storedTheme() || (systemPreference.matches ? 'dark' : 'light');

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#171a1f' : '#f1eee5');

    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    toggle.title = `Switch to ${nextTheme} theme`;
    toggle.querySelector('[aria-hidden="true"]').textContent = theme === 'dark' ? '☀' : '☾';
  };

  applyTheme(preferredTheme());

  window.addEventListener('DOMContentLoaded', () => {
    applyTheme(preferredTheme());
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // The selected theme still applies for the current page if storage is unavailable.
      }
      applyTheme(theme);
    });
  });

  systemPreference.addEventListener?.('change', () => {
    if (!storedTheme()) applyTheme(preferredTheme());
  });
})();

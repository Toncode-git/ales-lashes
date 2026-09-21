const root = document.documentElement;

// Runs in <head>, before the page paints, so dark visitors never see a light flash.
// Saved choice first, then the system preference, then light.
const saved = localStorage.getItem('theme');
const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
if (saved ? saved === 'dark' : prefersDark) root.classList.add('darkmode');

// The button doesn't exist yet in <head>, so wait for the page to load.
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('theme-switch');

  const updateLabel = () => {
    const isDark = root.classList.contains('darkmode');
    button.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
  };

  button.addEventListener('click', () => {
    const isDark = root.classList.toggle('darkmode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateLabel();
  });

  updateLabel();
});

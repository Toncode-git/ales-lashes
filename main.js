const root = document.documentElement;

/* ── DARK MODE ── */

// This file loads in <head>, so the theme is applied before the page paints
// and dark visitors never see a light flash.
// Saved choice first, then the system preference, then light.
const saved = localStorage.getItem('theme');
const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
if (saved ? saved === 'dark' : prefersDark) root.classList.add('darkmode');

// Everything below needs the page's elements, so it waits for the page to load.
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

  /* ── NAV: highlight the active tab on scroll ── */

  const sections = ['sobre', 'servicios', 'galeria', 'contacto'];
  const links = document.querySelectorAll('.nav-tabs a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-tabs a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
});

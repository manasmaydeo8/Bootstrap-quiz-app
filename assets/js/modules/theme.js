/**
 * Theme Module - Dark/Light Mode Management via Bootstrap 5.3 data-bs-theme
 */

import { getSavedTheme, setSavedTheme } from './storage.js';

export function applyTheme(theme) {
  const activeTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-bs-theme', activeTheme);
  
  // Update toggle button icon/text if present
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector('i');
    const label = themeToggleBtn.querySelector('.theme-label');
    if (activeTheme === 'dark') {
      if (icon) icon.className = 'bi bi-sun-fill text-warning';
      if (label) label.textContent = 'Light Mode';
      themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      if (icon) icon.className = 'bi bi-moon-stars-fill text-primary';
      if (label) label.textContent = 'Dark Mode';
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }
}

export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setSavedTheme(newTheme);
  applyTheme(newTheme);
  return newTheme;
}

export function initTheme() {
  const savedTheme = getSavedTheme();
  applyTheme(savedTheme);
  return savedTheme;
}

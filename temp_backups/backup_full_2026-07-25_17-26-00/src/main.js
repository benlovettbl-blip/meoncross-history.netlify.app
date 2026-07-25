/**
 * Main Application Entry Point
 * Coordinates Authentication, Storage, Layout Binding, and Navigation routing.
 */

import { initAuth } from './auth.js';
import { initData } from './storage.js';
import { bindEvents } from './layout.js';
import { switchView } from './navigation.js';
import { state } from './state.js';

window.addEventListener('DOMContentLoaded', () => {
  // Bind global helper routing
  window.switchView = switchView;
  window.state = state;

  initAuth();
  initData();
  bindEvents();

  // Set default theme styling active button state
  const currentTheme = state.theme || 'desert';
  const themeBtn = document.querySelector(`.theme-btn[data-theme="${currentTheme}"]`);
  if (themeBtn) {
    themeBtn.classList.add('active');
  }

  // Load main dashboard
  switchView('dashboard');
});

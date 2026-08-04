/**
 * Main Application Entry Point
 * Coordinates Authentication, Storage, Layout Binding, and Navigation routing.
 */

import { initAuth } from './auth.js';
import { initData } from './storage.js';
import { bindEvents } from './layout.js';
import { switchView } from './navigation.js';
import { state } from './state.js';

window.addEventListener('DOMContentLoaded', async () => {
  // Bind global helper routing
  window.switchView = switchView;
  window.state = state;

  initAuth();
  initData();
  
  try {
    const res = await fetch(`/database.json?v=${Date.now()}`);
    window.db = await res.json();
  } catch (err) {
    console.error('Failed to load database.json:', err);
    window.db = {};
  }

  bindEvents();

  // Set default theme styling active button state
  const currentTheme = state.theme || 'desert';
  const themeBtn = document.querySelector(`.theme-btn[data-theme="${currentTheme}"]`);
  if (themeBtn) {
    themeBtn.classList.add('active');
  }

  // Load view based on URL or fallback to dashboard
  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get('view') || 'dashboard';
  const unit = urlParams.get('unit');
  
  switchView(view, unit, true);

  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.view) {
      switchView(e.state.view, e.state.unit, true);
    } else {
      switchView('dashboard', null, true);
    }
  });
  
  // Hide the loading curtain smoothly
  setTimeout(() => {
    const curtain = document.getElementById('page-curtain');
    if (curtain) {
      curtain.classList.add('hidden');
    }
  }, 100);
});

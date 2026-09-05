/**
 * Main Application Entry Point
 * Coordinates Authentication, Storage, Layout Binding, and Navigation routing.
 */

import { initAuth } from './auth.js';
import { initData } from './storage.js';
import { bindEvents } from './layout.js';
import { switchView, initNavigationUI } from './navigation.js';
import { state } from './state.js';
import { initEventDelegation } from './engine/events.js';
import './langemarck_myth.js';

window.addEventListener('DOMContentLoaded', async () => {
  // Initialize UI subscribers
  initNavigationUI();
  initEventDelegation();

  // Bind global helper routing
  window.switchView = switchView;
  window.state = state;

  initAuth();
  initData();

  try {
    const res = await fetch(`/database.json?v=${Date.now()}`);
    state.db = await res.json();
    // Keep window.db temporarily for files not yet refactored
    window.db = state.db;
  } catch (err) {
    console.error('Failed to load database.json:', err);
    state.db = {};
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

  // Offline / Online Connectivity Indicator for Battlefield Tour
  const updateNetworkStatus = () => {
    let offlinePill = document.getElementById('offline-status-pill');
    if (!navigator.onLine) {
      if (!offlinePill) {
        offlinePill = document.createElement('div');
        offlinePill.id = 'offline-status-pill';
        offlinePill.className = 'offline-status-pill no-print';
        offlinePill.innerHTML =
          '<i class="fa-solid fa-plane-slash"></i> <span>Offline Mode · Field Guide Available</span>';
        document.body.appendChild(offlinePill);
      }
      offlinePill.style.display = 'flex';
    } else if (offlinePill) {
      offlinePill.innerHTML = '<i class="fa-solid fa-check"></i> <span>Online Reconnected</span>';
      offlinePill.style.background = '#059669';
      setTimeout(() => {
        if (offlinePill) offlinePill.style.display = 'none';
      }, 2500);
    }
  };

  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);
  if (!navigator.onLine) updateNetworkStatus();

  // Hide the loading curtain smoothly
  setTimeout(() => {
    const curtain = document.getElementById('page-curtain');
    if (curtain) {
      curtain.classList.add('hidden');
    }
  }, 100);
});

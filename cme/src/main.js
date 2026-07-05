import { initData, setMastered } from './storage.js';
import { state } from './state.js';
console.log("=== MAIN.JS EXECUTING IN WINDOW CONTEXT ===");
import { renderSidebarNav, updateGlobalStats, closeVideoModal } from './views.js';
import { bindEvents } from './layout.js';
import { switchView } from './navigation.js';
import { initMapExplorer } from './map_explorer.js';

// --- Application Entry Point ---
window.addEventListener('DOMContentLoaded', () => {
  initData();
  initMapExplorer();
  renderSidebarNav();
  updateGlobalStats();
  bindEvents();
  window.switchView = switchView;
  window.state = state;
  window.setMastered = setMastered;
  
  // Bind video modal close events
  const closeBtn = document.getElementById('video-modal-close-btn');
  if (closeBtn) {
    const handleClose = (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeVideoModal();
    };
    closeBtn.addEventListener('click', handleClose);
    closeBtn.addEventListener('touchend', handleClose);
  }
  const modalOverlay = document.getElementById('video-modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        e.preventDefault();
        e.stopPropagation();
        closeVideoModal();
      }
    });
    modalOverlay.addEventListener('touchend', (e) => {
      if (e.target === modalOverlay) {
        e.preventDefault();
        e.stopPropagation();
        closeVideoModal();
      }
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.style.display === 'flex') {
      closeVideoModal();
    }
  });

  // Intercept all target="_blank" links for Capacitor system browser compatibility
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a && a.getAttribute('target') === '_blank') {
      const href = a.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        if (window.Capacitor && window.Capacitor.platform !== 'web') {
          window.open(href, '_system');
        } else {
          window.open(href, '_blank');
        }
      }
    }
  });
  
  // Render default Dashboard view
  switchView('dashboard');
  updateGlobalStats();
  if (window.renderScumbagBinder) {
    window.renderScumbagBinder();
  }
});
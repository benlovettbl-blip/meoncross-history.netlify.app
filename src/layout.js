/**
 * Layout and Event Binding Controller for Meoncross History Mega App
 */

import { state } from './state.js';
import { switchView } from './navigation.js';

export function bindEvents() {
  // Back button click handler
  const backBtn = document.getElementById('header-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('dashboard');
    });
  }

  // Bind Sidebar navigation items
  const navDashboard = document.getElementById('nav-dashboard');
  if (navDashboard) {
    navDashboard.addEventListener('click', () => switchView('dashboard'));
  }

  const navProfile = document.getElementById('nav-profile');
  if (navProfile) {
    navProfile.addEventListener('click', () => switchView('profile'));
  }

  // Bind theme selector clicks
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const themeName = e.currentTarget.getAttribute('data-theme');
      state.theme = themeName;
      document.documentElement.setAttribute('data-theme', themeName);
      localStorage.setItem('meoncross_theme', themeName);
      
      // Update active class
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  // Mobile navigation drawer toggle
  const menuToggle = document.getElementById('sidebar-toggle-btn');
  const sidebar = document.getElementById('app-sidebar');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
}

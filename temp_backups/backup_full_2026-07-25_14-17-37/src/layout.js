/**
 * Layout and Event Binding Controller for Mr Lovett's History Hub Mega App
 */

import { UNITS } from './views.js';
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
      localStorage.setItem('history_theme', themeName);
      
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


  // Render Sidebar Units
  const sidebarUnitsContainer = document.getElementById('sidebar-unit-links');
  if (sidebarUnitsContainer) {
    sidebarUnitsContainer.innerHTML = '';
    UNITS.forEach(unit => {
      const link = document.createElement('div');
      link.className = 'nav-item';
      link.style.cursor = 'pointer';
      link.style.display = 'flex';
      link.style.alignItems = 'center';
      link.style.gap = '8px';
      link.style.padding = '8px 16px';
      link.style.borderRadius = '6px';
      link.style.margin = '0 8px 4px 8px';
      link.style.color = 'rgba(255,255,255,0.85)';
      
      // Setup hover effect matching nav-item
      link.addEventListener('mouseenter', () => {
        link.style.background = 'rgba(255,255,255,0.1)';
        link.style.color = '#fff';
      });
      link.addEventListener('mouseleave', () => {
        link.style.background = 'transparent';
        link.style.color = 'rgba(255,255,255,0.85)';
      });

      const prefix = unit.category === 'Key Stage 3' && !unit.title.startsWith('KS3:') ? 'KS3: ' : '';
      link.innerHTML = `<i class="fa-solid ${unit.id === 'great_war' || unit.id === 'great_war_part2' ? 'fa-helmet-safety' : 'fa-book'}" style="opacity: 0.7; width: 20px; text-align: center;"></i> <span style="font-size: 0.85rem; line-height: 1.2;">${prefix}${unit.title}</span>`;
      link.addEventListener('click', () => {
        if (window.launchSubApp) window.launchSubApp(unit.id);
      });
      sidebarUnitsContainer.appendChild(link);
    });
  }
}

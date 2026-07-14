import { unitData } from './data.js';
import { initializeApp } from '../src/core_app.js';
import { initKeyIndividualsTask } from '../src/key_individuals.js';

initializeApp(unitData);

// Add custom tabs for this unit
setTimeout(() => {
  const sidebarNav = document.getElementById('sidebar-nav-container');
  if (sidebarNav) {
    // Key Individuals Tab
    const kiLink = document.createElement('a');
    kiLink.className = 'lesson-link';
    kiLink.innerHTML = '<i class="fa-solid fa-users" style="margin-right: 8px;"></i> Key Individuals';
    kiLink.href = '#';
    kiLink.onclick = (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
      kiLink.classList.add('active');
      const contentArea = document.getElementById('content-area');
      contentArea.innerHTML = '';
      initKeyIndividualsTask(contentArea, unitData.key_individuals);
    };
    sidebarNav.appendChild(kiLink);
  }
}, 500);

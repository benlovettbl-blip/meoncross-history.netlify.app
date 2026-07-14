
import { initializeApp } from '../src/core_app.js';
import { initKeyIndividualsTask } from '../src/key_individuals.js';

fetch('/database.json').then(r => r.json()).then(db => {
  const pathParts = window.location.pathname.split('/').filter(p => p);
  let unitId = pathParts[pathParts.length - 1] === 'index.html' ? pathParts[pathParts.length - 2] : pathParts[pathParts.length - 1];
  if (!unitId || !db[unitId]) unitId = 'great_war'; // default to folder name
  
  const unitData = db[unitId].data || {};

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
      const contentArea = document.getElementById('engine-workbook-container');
      contentArea.innerHTML = '';
      if (db[unitId].biographies) initKeyIndividualsTask(contentArea, db[unitId].biographies);
    };
    sidebarNav.appendChild(kiLink);
  }
}, 500);

});

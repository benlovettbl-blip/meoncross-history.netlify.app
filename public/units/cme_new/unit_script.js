
import { initializeApp } from '../src/core_app.js';
import { initTimelineTask } from './src/timeline_task.js';
import { initTerminologyTask } from './src/terminology_task.js';
import { initKeyIndividualsTask } from '../src/key_individuals.js';

fetch('/database.json').then(r => r.json()).then(db => {
  const pathParts = window.location.pathname.split('/').filter(p => p);
  let unitId = pathParts[pathParts.length - 1] === 'index.html' ? pathParts[pathParts.length - 2] : pathParts[pathParts.length - 1];
  if (!unitId || !db[unitId]) unitId = 'cme_new'; // default to folder name
  
  const unitData = db[unitId].data || {};

  initializeApp(unitData);

// Add custom tabs for this unit
setTimeout(() => {
  const sidebarNav = document.getElementById('sidebar-nav-container');
  if (sidebarNav) {
    // 1. Domino Flowcharts Tab
    const tlLink = document.createElement('a');
    tlLink.className = 'lesson-link';
    tlLink.innerHTML = '<i class="fa-solid fa-hourglass-half" style="margin-right: 8px;"></i> Domino Flowcharts';
    tlLink.href = '#';
    tlLink.onclick = (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
      tlLink.classList.add('active');
      const contentArea = document.getElementById('engine-workbook-container');
      contentArea.innerHTML = '';
      initTimelineTask(contentArea, unitData.timeline);
    };
    sidebarNav.appendChild(tlLink);

    // 2. Terminology Match Tab
    const termLink = document.createElement('a');
    termLink.className = 'lesson-link';
    termLink.innerHTML = '<i class="fa-solid fa-spell-check" style="margin-right: 8px;"></i> Terminology Match';
    termLink.href = '#';
    termLink.onclick = (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
      termLink.classList.add('active');
      const contentArea = document.getElementById('engine-workbook-container');
      contentArea.innerHTML = '';
      initTerminologyTask(contentArea, unitData.terminology);
    };
    sidebarNav.appendChild(termLink);

    // 3. Key Individuals Tab
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

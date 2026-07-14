import { unitData } from './data.js';
import { initializeApp } from '../src/core_app.js';
import { initTimelineTask } from './src/timeline_task.js';
import { initTerminologyTask } from './src/terminology_task.js';
import { initKeyIndividualsTask } from '../src/key_individuals.js';

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
      const contentArea = document.getElementById('content-area');
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
      const contentArea = document.getElementById('content-area');
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
      const contentArea = document.getElementById('content-area');
      contentArea.innerHTML = '';
      initKeyIndividualsTask(contentArea, unitData.key_individuals);
    };
    sidebarNav.appendChild(kiLink);
  }
}, 500);

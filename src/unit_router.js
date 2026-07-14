import { initializeApp } from './core_app.js';
import { initTimelineTask } from './timeline_task.js';
import { initTerminologyTask } from './terminology_task.js';
import { initKeyIndividualsTask } from './key_individuals.js';

const urlParams = new URLSearchParams(window.location.search);
let unitId = urlParams.get('id');
window.currentUnitId = unitId;

if (!unitId) {
  document.body.innerHTML = '<h1>Unit not found</h1><p>Please return to the <a href="/">Dashboard</a>.</p>';
} else {
  fetch(`/data/${unitId}.json`).then(r => {
    if (!r.ok) throw new Error('Unit not found');
    return r.json();
  }).then(unitPayload => {
    const db = {};
    db[unitId] = unitPayload;
    
    const unitData = db[unitId].data || {};
  
  // Set page title dynamically
  if (unitData.title) {
    document.title = unitData.title;
    const headerTitle = document.querySelector('.header-title-container h1');
    if (headerTitle) headerTitle.textContent = unitData.title;
  }

  initializeApp(unitData);

  // Add custom tabs for this unit if data exists
  setTimeout(() => {
    const sidebarNav = document.getElementById('sidebar-nav-container');
    if (sidebarNav) {
      // 1. Domino Flowcharts Tab
      if (unitData.timeline) {
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
      }

      // 2. Terminology Match Tab
      if (unitData.terminology) {
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
      }

      // 3. Key Individuals Tab
      if (db[unitId].biographies) {
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
          initKeyIndividualsTask(contentArea, db[unitId].biographies);
        };
        sidebarNav.appendChild(kiLink);
      }
    }
  }, 500);

  }).catch(err => {
    console.error('Error loading unit:', err);
    document.body.innerHTML = '<div style="padding: 40px; text-align: center;"><h1 style="color: #ef4444;">Unit Not Found</h1><p>Sorry, the data for this unit could not be loaded.</p><br><a href="/" style="padding: 10px 20px; background: #002855; color: white; text-decoration: none; border-radius: 6px;">Return to Dashboard</a></div>';
  });
}

// force vite reload

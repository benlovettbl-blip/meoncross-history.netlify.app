import { initializeApp } from './core_app.js';
import { renderVerticalTimeline } from './vertical_timeline.js';
import { initTerminologyTask } from './terminology_task.js';
import { initKeyIndividualsTask } from './key_individuals.js';
import { initGeographicalLocationsTask } from './geographical_locations.js';
const urlParams = new URLSearchParams(window.location.search);
let unitId = urlParams.get('id');
window.currentUnitId = unitId;

if (!unitId) {
  document.body.innerHTML = '<h1>Unit not found</h1><p>Please return to the <a href="/">Dashboard</a>.</p>';
} else {
  fetch(`/data/${unitId}.json?v=${Date.now()}`).then(r => {
    if (!r.ok) throw new Error('Unit not found');
    return r.json();
  }).then(unitPayload => {
    const db = {};
    db[unitId] = unitPayload;
    window.db = db;
    
    const unitData = db[unitId].data || {};
  
  // Set page title dynamically
  if (unitData.title) {
    document.title = unitData.title;
    const headerTitle = document.querySelector('.header-title-container h1');
    if (headerTitle) headerTitle.textContent = unitData.title;
  }

  initializeApp(unitData);

  // Add custom tabs for this unit if data exists
  {
    const sidebarNav = document.getElementById('sidebar-nav-container');
    if (sidebarNav) {
      // 1. Timeline Tab
      if (unitData.timeline) {
        const tlLink = document.createElement('a');
        tlLink.className = 'lesson-link';
        tlLink.innerHTML = '<i class="fa-solid fa-timeline" style="margin-right: 8px;"></i> Timeline';
        tlLink.href = '#';
        tlLink.onclick = (e) => {
          e.preventDefault();
          if (e.isTrusted !== false) {
            const url = new URL(window.location);
            url.searchParams.set('tab', 'timeline');
            history.pushState({ customTab: 'timeline' }, "", url);
          }

          document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
          tlLink.classList.add('active');
          const contentArea = document.getElementById('content-area');
          contentArea.innerHTML = '';
          renderVerticalTimeline(contentArea, unitData.timeline, unitData);
          if (contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
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
          if (e.isTrusted !== false) {
            const url = new URL(window.location);
            url.searchParams.set('tab', 'terminology');
            history.pushState({ customTab: 'terminology' }, "", url);
          }

          document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
          termLink.classList.add('active');
          const contentArea = document.getElementById('content-area');
          contentArea.innerHTML = '';
          initTerminologyTask(contentArea, unitData.terminology);
          if (contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
        };
        sidebarNav.appendChild(termLink);
      }

      // 3. Key Individuals Tabs (Split)
      const keyIndividualsData = (db[unitId].data && db[unitId].data.key_individuals) || db[unitId].biographies;
      if (keyIndividualsData) {
        const historicalData = keyIndividualsData.filter(p => !p.group || p.group === 'Historical Figures' || p.group !== 'Historians');
        if (historicalData.length > 0) {
          const kiLink = document.createElement('a');
          kiLink.className = 'lesson-link';
          kiLink.innerHTML = '<i class="fa-solid fa-users" style="margin-right: 8px;"></i> Historical Individuals';
          kiLink.href = '#';
          kiLink.onclick = (e) => {
            e.preventDefault();
            if (e.isTrusted !== false) {
              const url = new URL(window.location);
              url.searchParams.set('tab', 'historical_individuals');
              history.pushState({ customTab: 'historical_individuals' }, "", url);
            }
  
            document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
            kiLink.classList.add('active');
            const contentArea = document.getElementById('content-area');
            contentArea.innerHTML = '';
            initKeyIndividualsTask(contentArea, historicalData, 'Historical Individuals', 'Profiles of the major historical figures who shaped these events.');
            if (contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
          };
          sidebarNav.appendChild(kiLink);
        }

        const historiansData = keyIndividualsData.filter(p => p.group === 'Historians');
        if (historiansData.length > 0) {
          const histLink = document.createElement('a');
          histLink.className = 'lesson-link';
          histLink.innerHTML = '<i class="fa-solid fa-book-open-reader" style="margin-right: 8px;"></i> Historians';
          histLink.href = '#';
          histLink.onclick = (e) => {
            e.preventDefault();
            if (e.isTrusted !== false) {
              const url = new URL(window.location);
              url.searchParams.set('tab', 'historians');
              history.pushState({ customTab: 'historians' }, "", url);
            }
  
            document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
            histLink.classList.add('active');
            const contentArea = document.getElementById('content-area');
            contentArea.innerHTML = '';
            initKeyIndividualsTask(contentArea, historiansData, 'Historians', 'Academic perspectives and historical interpretations.');
            if (contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
          };
          sidebarNav.appendChild(histLink);
        }
      }
      
      // 4. Geographical Locations Tab
      const geoLocationsData = db[unitId].data && db[unitId].data.geographical_locations;
      if (geoLocationsData) {
        const geoLink = document.createElement('a');
        geoLink.className = 'lesson-link';
        geoLink.innerHTML = '<i class="fa-solid fa-earth-americas" style="margin-right: 8px;"></i> Geographical Locations';
        geoLink.href = '#';
        geoLink.onclick = (e) => {
          e.preventDefault();
          if (e.isTrusted !== false) {
            const url = new URL(window.location);
            url.searchParams.set('tab', 'geographical_locations');
            history.pushState({ customTab: 'geographical_locations' }, "", url);
          }

          document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
          geoLink.classList.add('active');
          const contentArea = document.getElementById('content-area');
          contentArea.innerHTML = '';
          initGeographicalLocationsTask(contentArea, geoLocationsData);
          if (contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
        };
        sidebarNav.appendChild(geoLink);
      }

      // 5. Printable Workbook Tab
      {
        const wbLink = document.createElement('a');
        wbLink.className = 'lesson-link';
        wbLink.innerHTML = '<i class="fa-solid fa-file-pdf" style="margin-right: 8px;"></i> Printable Workbook';
        wbLink.href = '#';
        wbLink.onclick = (e) => {
          e.preventDefault();
          if (e.isTrusted !== false) {
            const url = new URL(window.location);
            url.searchParams.set('tab', 'workbook');
            history.pushState({ customTab: 'workbook' }, "", url);
          }

          document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
          wbLink.classList.add('active');
          const contentArea = document.getElementById('content-area');
          contentArea.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column;">
              <div style="margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                <h2 style="margin: 0; color: #1e3a8a;"><i class="fa-solid fa-file-pdf"></i> PDF Workbook Preview</h2>
                <a href="/units/${unitId}/workbook.pdf" download class="btn btn-primary"><i class="fa-solid fa-download"></i> Download PDF</a>
              </div>
              <iframe src="/units/${unitId}/workbook.pdf" style="width: 100%; height: 80vh; border: none; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" title="Workbook PDF"></iframe>
            </div>
          `;
          if (contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
        };
        sidebarNav.appendChild(wbLink);
      }


    }
  }

  // Remove the loading curtain
  setTimeout(() => {
    const curtain = document.getElementById('page-curtain');
    if (curtain) {
      curtain.classList.add('hidden');
    }
  }, 100);

  }).catch(err => {
    console.error('Error loading unit:', err);
    document.body.innerHTML = '<div style="padding: 40px; text-align: center;"><h1 style="color: #ef4444;">Unit Not Found</h1><p>Sorry, the data for this unit could not be loaded.</p><br><a href="/" style="padding: 10px 20px; background: #002855; color: white; text-decoration: none; border-radius: 6px;">Return to Dashboard</a></div>';
  });
}

window.navigateBack = function() {
  const curtain = document.getElementById('page-curtain');
  if (curtain) curtain.classList.remove('hidden');
  setTimeout(() => {
    window.location.href = '/';
  }, 350);
};

// force vite reload

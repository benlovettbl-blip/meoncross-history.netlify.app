console.log('ROUTER RUNNING');
import { initializeApp } from './core_app.js';
import { initEventDelegation } from './engine/events.js';
import { renderVerticalTimeline } from './vertical_timeline.js';
import { initTerminologyTask } from './terminology_task.js';
import { initKeyIndividualsTask } from './key_individuals.js';
import { initGeographicalLocationsTask } from './geographical_locations.js';
import { initGuidedReadingTask } from './guided_reading.js';
const urlParams = new URLSearchParams(window.location.search);
let unitId = urlParams.get('id');
window.currentUnitId = unitId;

initEventDelegation();

if (!unitId) {
  document.body.innerHTML = '<h1>Unit not found</h1><p>Please return to the <a href="/">Dashboard</a>.</p>';
} else {
  fetch(`/data/${unitId}.json?v=${Date.now()}`)
    .then(r => {
      if (!r.ok) {
        // Fallback for local development using serve . instead of Vite
        return fetch(`/public/data/${unitId}.json?v=${Date.now()}`);
      }
      return r;
    })
    .then(r => {
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

      // 5. PDF Textbook and Workbook Tabs
      // Removed direct PDF sidebar links in favor of centralized Print & PDF Hub



    }
  }

  // Remembrance Visual Theme (Trips Only)
  if (unitData.type === 'trip') {
    const themeStyles = document.createElement('style');
    themeStyles.innerHTML = `
      :root {
        --primary: #7f1d1d !important;
        --secondary: #991b1b !important;
        --accent: #dc2626 !important;
        --gold: #d4af37 !important;
        --light-bg: #fdfaf6 !important;
      }
      body {
        background-color: #faf8f5 !important;
        background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.15' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E") !important;
      }
      h1, h2, h3, h4, .hero-title {
        font-family: 'Playfair Display', serif !important;
      }
      .lesson-banner { border-bottom: 5px solid var(--primary) !important; }
    `;
    document.head.appendChild(themeStyles);
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
    document.body.innerHTML = `<div style="padding: 40px; text-align: center;"><h1 style="color: #ef4444;">Unit Error</h1><p>Sorry, an error occurred while loading this unit.</p><pre style="text-align: left; background: #fee2e2; padding: 15px; border-radius: 6px; color: #991b1b; max-width: 800px; margin: 20px auto; overflow: auto;">${err.stack || err.message || err}</pre><br><a href="/" style="padding: 10px 20px; background: #002855; color: white; text-decoration: none; border-radius: 6px;">Return to Dashboard</a></div>`;
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

// --- Mobile Hamburger Menu Logic ---
setTimeout(() => {
  const menuToggle = document.getElementById('unit-sidebar-toggle-btn');
  const sidebar = document.getElementById('sidebar');
  if (menuToggle && sidebar) {
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      document.body.appendChild(overlay);
    }
    
    const toggleSidebar = () => {
      sidebar.classList.toggle('mobile-open');
      overlay.classList.toggle('active');
    };

    menuToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // Auto close when links are clicked
    sidebar.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && e.target.closest('a')) {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
      }
    });
  }
}, 100);

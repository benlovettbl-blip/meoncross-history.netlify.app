const fs = require('fs');
let code = fs.readFileSync('src/unit_router.js', 'utf8');

const tabImports = `import { initGeographicalLocationsTask } from './geographical_locations.js';\nimport { initVisualSourcesTask } from './visual_sources.js';\n`;

const tabsCode = `
      // 4. Geographical Locations Tab
      const geographicalLocationsData = (db[unitId].data && db[unitId].data.geographical_locations);
      if (geographicalLocationsData) {
        const glLink = document.createElement('a');
        glLink.className = 'lesson-link';
        glLink.innerHTML = '<i class="fa-solid fa-earth-americas" style="margin-right: 8px;"></i> Geographical Locations';
        glLink.href = '#';
        glLink.onclick = (e) => {
          e.preventDefault();
          if (e.isTrusted !== false) {
            const url = new URL(window.location);
            url.searchParams.set('tab', 'geographical_locations');
            history.pushState({ customTab: 'geographical_locations' }, "", url);
          }
          document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
          glLink.classList.add('active');
          const contentArea = document.getElementById('content-area');
          contentArea.innerHTML = '';
          initGeographicalLocationsTask(contentArea, geographicalLocationsData);
          if (contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
        };
        sidebarNav.appendChild(glLink);
      }

      // 5. Visual Sources Tab
      const visualSourcesData = (db[unitId].data && db[unitId].data.visual_sources);
      if (visualSourcesData) {
        const vsLink = document.createElement('a');
        vsLink.className = 'lesson-link';
        vsLink.innerHTML = '<i class="fa-solid fa-eye" style="margin-right: 8px;"></i> Visual Sources';
        vsLink.href = '#';
        vsLink.onclick = (e) => {
          e.preventDefault();
          if (e.isTrusted !== false) {
            const url = new URL(window.location);
            url.searchParams.set('tab', 'visual_sources');
            history.pushState({ customTab: 'visual_sources' }, "", url);
          }
          document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
          vsLink.classList.add('active');
          const contentArea = document.getElementById('content-area');
          contentArea.innerHTML = '';
          initVisualSourcesTask(contentArea, visualSourcesData);
          if (contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
        };
        sidebarNav.appendChild(vsLink);
      }
`;

// Insert imports
if (!code.includes('initVisualSourcesTask')) {
    code = code.replace("import { initKeyIndividualsTask } from './key_individuals.js';", "import { initKeyIndividualsTask } from './key_individuals.js';\n" + tabImports);
}

// Insert tabs
if (!code.includes('Visual Sources Tab')) {
    code = code.replace("    }\n  }\n\n  // Remove the loading curtain", tabsCode + "    }\n  }\n\n  // Remove the loading curtain");
}

fs.writeFileSync('src/unit_router.js', code, 'utf8');
console.log('Successfully updated src/unit_router.js with tabs.');

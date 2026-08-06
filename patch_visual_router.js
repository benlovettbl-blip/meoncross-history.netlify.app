const fs = require('fs');

let code = fs.readFileSync('src/unit_router.js', 'utf8');

// 1. Add the import if it's missing
if (!code.includes("import { initVisualSourcesTask }")) {
  code = code.replace(
    "import { initGeographicalLocationsTask } from './geographical_locations.js';",
    "import { initGeographicalLocationsTask } from './geographical_locations.js';\nimport { initVisualSourcesTask } from './visual_sources.js';"
  );
}

// 2. Add the routing block if it's missing
if (!code.includes("Visual Sources Tab")) {
  const visualSourcesBlock = `
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

  // Inject it right after the Geographical Locations block
  // The Geographical Locations block ends with `sidebarNav.appendChild(glLink);\n      }`
  // Let's replace that specific ending block
  const searchStr = "sidebarNav.appendChild(glLink);\n      }";
  if (code.includes(searchStr)) {
     code = code.replace(searchStr, searchStr + "\n" + visualSourcesBlock);
  } else {
     console.error("Could not find insertion point for Visual Sources Tab");
  }
}

fs.writeFileSync('src/unit_router.js', code, 'utf8');
console.log('Successfully updated src/unit_router.js');

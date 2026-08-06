const fs = require('fs');
let code = fs.readFileSync('src/unit_router.js', 'utf8');
const locationsBlock = `
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
`;

if (!code.includes('4. Geographical Locations Tab')) {
    code = code.replace('// Custom routing based on URL', locationsBlock + '\n\n      // Custom routing based on URL');
    fs.writeFileSync('src/unit_router.js', code, 'utf8');
    console.log('Fixed unit_router.js');
} else {
    console.log('Already fixed.');
}

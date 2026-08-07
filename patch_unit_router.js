const fs = require('fs');
const file = 'src/unit_router.js';
let content = fs.readFileSync(file, 'utf8');

const regex = /\/\/ 3\. Key Individuals Tab[\s\S]+?\/\/ 4\. Geographical Locations Tab/;

const newTabs = `// 3. Key Individuals Tabs (Split)
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
      
      // 4. Geographical Locations Tab`;

content = content.replace(regex, newTabs);
fs.writeFileSync(file, content);
console.log("Updated unit_router.js");

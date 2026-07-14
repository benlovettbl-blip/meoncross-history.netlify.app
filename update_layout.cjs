const fs = require('fs');
let code = fs.readFileSync('src/layout.js', 'utf8');

const importStatement = "import { UNITS } from './views.js';\n";
if (!code.includes('import { UNITS }')) {
  code = code.replace(/import \{ state \} from '\.\/state\.js';/, importStatement + "import { state } from './state.js';");
}

const renderCode = `

  // Render Sidebar Units
  const sidebarUnitsContainer = document.getElementById('sidebar-unit-links');
  if (sidebarUnitsContainer) {
    sidebarUnitsContainer.innerHTML = '';
    UNITS.forEach(unit => {
      const link = document.createElement('div');
      link.className = 'nav-item';
      link.style.cursor = 'pointer';
      link.style.display = 'flex';
      link.style.alignItems = 'center';
      link.style.gap = '8px';
      link.style.padding = '8px 16px';
      link.style.borderRadius = '6px';
      link.style.margin = '0 8px 4px 8px';
      link.style.color = 'rgba(255,255,255,0.85)';
      
      // Setup hover effect matching nav-item
      link.addEventListener('mouseenter', () => {
        link.style.background = 'rgba(255,255,255,0.1)';
        link.style.color = '#fff';
      });
      link.addEventListener('mouseleave', () => {
        link.style.background = 'transparent';
        link.style.color = 'rgba(255,255,255,0.85)';
      });

      link.innerHTML = \`<i class="fa-solid \${unit.id === 'great_war' || unit.id === 'great_war_part2' ? 'fa-helmet-safety' : 'fa-book'}" style="opacity: 0.7; width: 20px; text-align: center;"></i> <span style="font-size: 0.85rem; line-height: 1.2;">\${unit.title}</span>\`;
      link.addEventListener('click', () => {
        if (window.launchSubApp) window.launchSubApp(unit.id);
      });
      sidebarUnitsContainer.appendChild(link);
    });
  }
}
`;

code = code.replace(/}\s*$/, renderCode);
fs.writeFileSync('src/layout.js', code, 'utf8');
console.log('Updated layout.js');

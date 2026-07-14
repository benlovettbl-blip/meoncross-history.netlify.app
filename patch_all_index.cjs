const fs = require('fs');
const path = require('path');

const getDirs = src => fs.readdirSync(src, {withFileTypes: true}).filter(d => d.isDirectory() && !d.name.startsWith('.')).map(d => d.name);
const units = getDirs('./').filter(d => fs.existsSync(path.join(d, 'index.html')));

const polyfill = `
  <!-- Touchscreen Drag and Drop Polyfill -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mobile-drag-drop@2.3.0/default.css">
  <script src="https://cdn.jsdelivr.net/npm/mobile-drag-drop@2.3.0/index.min.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      MobileDragDrop.polyfill({
        dragImageTranslateOverride: MobileDragDrop.scrollBehaviourDragImageTranslateOverride
      });
      window.addEventListener('touchmove', function() {}, {passive: false});
    });
  </script>
`;

for (const unit of units) {
  let code = fs.readFileSync(path.join(unit, 'index.html'), 'utf8');

  // 1. Logo Patch
  const oldHeader = /<div class="sidebar-header"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
  const newHeader = `<div class="sidebar-logo" style="padding: 1.5rem 1rem; border-bottom: 1px solid var(--border-glass); cursor: pointer; margin-bottom: 0;" onclick="window.location.href='/'" title="Back to History Hub">
        <i class="fa-solid fa-graduation-cap logo-icon"></i>
        <div>
          <h2 style="margin: 0;">Mr Lovett's History Hub</h2>
          <span>History Portal</span>
        </div>
      </div>`;
  
  if (!code.includes('sidebar-logo')) {
    code = code.replace(oldHeader, newHeader);
  }

  // 2. Touch Polyfill Patch
  if (!code.includes('mobile-drag-drop')) {
    code = code.replace('</head>', polyfill + '\n</head>');
  }

  fs.writeFileSync(path.join(unit, 'index.html'), code, 'utf8');
  console.log(`Successfully patched ${unit}/index.html`);
}

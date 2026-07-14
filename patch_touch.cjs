const fs = require('fs');

let code = fs.readFileSync('cme_new/index.html', 'utf8');

const polyfill = `
  <!-- Touchscreen Drag and Drop Polyfill -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mobile-drag-drop@2.3.0/default.css">
  <script src="https://cdn.jsdelivr.net/npm/mobile-drag-drop@2.3.0/index.min.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      MobileDragDrop.polyfill({
        dragImageTranslateOverride: MobileDragDrop.scrollBehaviourDragImageTranslateOverride
      });
      // Workaround for touch scrolling issues
      window.addEventListener('touchmove', function() {}, {passive: false});
    });
  </script>
`;

if (!code.includes('mobile-drag-drop')) {
  code = code.replace('</head>', polyfill + '\n</head>');
  fs.writeFileSync('cme_new/index.html', code, 'utf8');
  console.log('Injected mobile-drag-drop polyfill into cme_new/index.html');
} else {
  console.log('Polyfill already exists.');
}

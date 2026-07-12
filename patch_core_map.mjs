import fs from 'fs';

const corePath = 'c:/Projects/meoncross-history.netlify.app/src/core_app.js';
let coreContent = fs.readFileSync(corePath, 'utf8');

const targetStr = `      lesson.narrative_blocks.forEach((block, index) => {
        const bg = (index % 2 === 0) ? '#ffffff' : '#f0f9ff';`;

const replacementStr = `      lesson.narrative_blocks.forEach((block, index) => {
        if (block.type === 'interactive_map') {
          html += \`
            <div class="interactive-map-container" style="margin: 30px 0; background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h3 style="margin-top: 0; color: #1e293b; font-family: 'Playfair Display', serif;"><i class="fa-solid fa-map-location-dot"></i> Interactive Historical Map</h3>
              <div class="map-img-wrapper" style="position: relative; height: 500px; width: 100%; display: flex; justify-content: center; align-items: center; overflow: hidden; margin-bottom: 20px; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0;">
          \`;
          
          block.maps.forEach((m, idx) => {
            html += \`<img src="\${m.src}" id="map-img-\${m.id}" style="position: absolute; max-width: 100%; max-height: 100%; object-fit: contain; opacity: \${idx === 0 ? '1' : '0'}; transition: opacity 0.6s ease-in-out; border-radius: 6px;">\`;
          });
          
          html += \`
              </div>
              <div id="map-caption-display" style="font-size: 1.1rem; font-style: italic; color: #334155; min-height: 3em; margin-bottom: 20px;">\${block.maps[0].caption}</div>
              <div class="map-controls" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
          \`;
          
          block.maps.forEach((m, idx) => {
            const activeClass = idx === 0 ? 'active-map-btn' : '';
            html += \`
                <button class="btn btn-secondary map-toggle-btn \${activeClass}" data-map-id="\${m.id}" data-caption="\${m.caption.replace(/"/g, '&quot;')}" onclick="toggleMap(this)" style="border-radius: 30px; padding: 8px 16px; font-weight: bold;">
                  \${m.year} \${m.label}
                </button>
            \`;
          });
          
          html += \`
              </div>
            </div>
          \`;
          return;
        }

        const bg = (index % 2 === 0) ? '#ffffff' : '#f0f9ff';`;

// Add toggleMap function globally if it doesn't exist
const globalScript = `
window.toggleMap = function(btn) {
  const container = btn.closest('.interactive-map-container');
  // Update buttons
  container.querySelectorAll('.map-toggle-btn').forEach(b => {
    b.classList.remove('active-map-btn');
    b.style.backgroundColor = '';
    b.style.color = '';
  });
  btn.classList.add('active-map-btn');
  btn.style.backgroundColor = '#1a237e';
  btn.style.color = 'white';
  
  // Update images
  const targetId = btn.getAttribute('data-map-id');
  container.querySelectorAll('img[id^="map-img-"]').forEach(img => {
    img.style.opacity = '0';
  });
  container.querySelector('#map-img-' + targetId).style.opacity = '1';
  
  // Update caption
  container.querySelector('#map-caption-display').innerHTML = btn.getAttribute('data-caption');
};
`;

if (coreContent.includes(targetStr) && !coreContent.includes('interactive_map')) {
  coreContent = coreContent.replace(targetStr, replacementStr);
  
  if (!coreContent.includes('window.toggleMap = function')) {
    coreContent = coreContent + '\n' + globalScript;
  }
  
  fs.writeFileSync(corePath, coreContent, 'utf8');
  console.log("Injected interactive_map logic into core_app.js");
} else {
  console.log("Target not found or already injected");
}

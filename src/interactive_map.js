export function initInteractiveMap(container, task) {
  if (!container || !task || !task.maps || task.maps.length === 0) return;

  const instructionsHtml = task.instructions ? `<p style="margin-top: 0; font-weight: 500; color: #475569; margin-bottom: 20px;">${task.instructions}</p>` : '';

  let tabsHtml = `<div class="map-tabs" style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 10px; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0;">`;
  
  task.maps.forEach((map, index) => {
    tabsHtml += `
      <button class="map-tab-btn" data-index="${index}" style="
        background: ${index === 0 ? '#1a237e' : '#f1f5f9'};
        color: ${index === 0 ? 'white' : '#475569'};
        border: none;
        border-radius: 6px;
        padding: 10px 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
        box-shadow: ${index === 0 ? '0 4px 6px rgba(26, 35, 126, 0.2)' : 'none'};
      ">
        <div style="font-size: 0.8rem; opacity: ${index === 0 ? '0.9' : '0.7'}; margin-bottom: 2px;">${map.year || ''}</div>
        <div style="font-size: 1.05rem;">${map.label || map.id}</div>
      </button>
    `;
  });
  tabsHtml += `</div>`;

  let contentHtml = `<div class="map-content-container" style="position: relative; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); background: white; border: 1px solid #e2e8f0;">`;
  
  task.maps.forEach((map, index) => {
    contentHtml += `
      <div class="map-pane" id="map-pane-${index}" style="display: ${index === 0 ? 'block' : 'none'}; animation: fadeIn 0.4s ease;">
        <div style="width: 100%; height: 400px; background: #e2e8f0; display: flex; justify-content: center; align-items: center; overflow: hidden; position: relative;">
          ${map.src ? `<img src="${map.src}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" alt="${map.label}">` : '<i class="fa-solid fa-map-location-dot fa-3x" style="color: #94a3b8;"></i>'}
        </div>
        <div style="padding: 20px; background: white;">
          <p style="margin: 0; font-size: 1.1rem; line-height: 1.6; color: #1e293b;">${map.caption || ''}</p>
        </div>
      </div>
    `;
  });
  contentHtml += `</div>`;

  container.innerHTML = `
    <div class="interactive-map-wrapper" style="background: #f8fafc; padding: 25px; border-radius: 12px; border: 1px solid #cbd5e1; margin-top: 20px;">
      <h3 style="margin-top: 0; color: #0f172a; font-family: 'Playfair Display', serif; font-size: 1.4rem; margin-bottom: 15px;"><i class="fa-solid fa-map" style="color: #3b82f6; margin-right: 10px;"></i> Interactive Map</h3>
      ${instructionsHtml}
      ${tabsHtml}
      ${contentHtml}
    </div>
    <style>
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .map-tab-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
      }
    </style>
  `;

  // Add event listeners
  const tabBtns = container.querySelectorAll('.map-tab-btn');
  const panes = container.querySelectorAll('.map-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetIndex = btn.getAttribute('data-index');
      
      // Update buttons
      tabBtns.forEach(b => {
        b.style.background = '#f1f5f9';
        b.style.color = '#475569';
        b.style.boxShadow = 'none';
        b.querySelector('div:first-child').style.opacity = '0.7';
      });
      btn.style.background = '#1a237e';
      btn.style.color = 'white';
      btn.style.boxShadow = '0 4px 6px rgba(26, 35, 126, 0.2)';
      btn.querySelector('div:first-child').style.opacity = '0.9';

      // Update panes
      panes.forEach((pane, idx) => {
        if (idx.toString() === targetIndex) {
          pane.style.display = 'block';
        } else {
          pane.style.display = 'none';
        }
      });
    });
  });
}

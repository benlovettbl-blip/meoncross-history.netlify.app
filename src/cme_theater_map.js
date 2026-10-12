/**
 * Conflict in the Middle East (1945–1995)
 * Dedicated High-Resolution Regional Map Viewer & 5-Stage Presenter Focus Mode
 *
 * Designed for Edexcel GCSE History Paper 2: Conflict in the Middle East.
 * Strictly adheres to Institutional Neutrality and Zero AI Educational Jargon.
 * Clean, uncluttered, high-resolution cartography and live slippy map engine.
 */

import { getAssetUrl } from './engine/assets.js';

// Available Regional Reference & Live Maps
export const CME_REGIONAL_MAPS = {
  regional: {
    id: 'regional',
    title: 'Middle East Regional Cartography (Israel & Surrounding Neighbours)',
    subtitle:
      'High-resolution historical survey: Israel, Egypt/Sinai, Jordan, Syria, Golan Heights, Lebanon, West Bank & Gaza (1967)',
    image: '/images/palestine_1967_six_day_war_map.png',
  },
  cia: {
    id: 'cia',
    title: 'Israel & The Occupied Territories (CIA Cartographic Reference)',
    subtitle:
      'Official survey: Armistice demarcation lines, former mandate boundaries, and major towns/cities',
    image: '/images/cme_1967_occupied_territories_cia_map.png',
  },
  live: {
    id: 'live',
    title: 'Live Interactive Map (Satellite & Street Engine)',
    subtitle:
      'Real-time slippy map: Zoom seamlessly from space down to street level • Toggle Satellite / Physical Terrain',
    isLive: true,
  },
};

let currentMapKey = 'regional';
let currentZoom = 1;
let panX = 0;
let panY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;
let startPanX = 0;
let startPanY = 0;

let leafletMapInstance = null;
let leafletLoadingPromise = null;

// ============================================================================
// DYNAMIC LEAFLET LOADER (No local build dependency, 100% lightweight)
// ============================================================================

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  if (leafletLoadingPromise) return leafletLoadingPromise;

  leafletLoadingPromise = new Promise((resolve, reject) => {
    // Inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Inject Script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => resolve(window.L);
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });

  return leafletLoadingPromise;
}

// ============================================================================
// MODAL HTML GENERATOR & OPEN / CLOSE LOGIC
// ============================================================================

export function ensureCmeTheaterMapModalInDOM() {
  let modal = document.getElementById('cme-theater-map-modal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'cme-theater-map-modal';
  modal.className = 'cme-theater-map-modal';
  modal.style.cssText =
    'display: none; position: fixed; inset: 0; z-index: 99999; background: rgba(7, 11, 20, 0.92); backdrop-filter: blur(8px); align-items: center; justify-content: center; padding: 12px; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';

  modal.innerHTML = `
    <div class="cme-map-dialog" style="background: #0b1120; border: 1.5px solid #1e293b; border-radius: 12px; width: 98vw; max-width: 1560px; height: 95vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.85); color: #f8fafc;">
      
      <!-- Top Modal Header & Controls Toolbar -->
      <div style="padding: 10px 18px; background: #070d19; border-bottom: 1px solid #1e293b; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        
        <!-- Left: Title & Map Switcher -->
        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <div style="background: #0284c7; color: #ffffff; width: 32px; height: 32px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 1rem; box-shadow: 0 2px 8px rgba(2,132,199,0.4); flex-shrink: 0;">
            <i class="fa-solid fa-map"></i>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h3 id="cme-map-dialog-title" style="margin: 0; font-size: 1.05rem; font-weight: 800; color: #ffffff; letter-spacing: -0.01em;">
                ${CME_REGIONAL_MAPS[currentMapKey].title}
              </h3>
              <span style="background: #0369a1; color: #e0f2fe; font-size: 0.65rem; font-weight: 800; padding: 2px 7px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Edexcel Paper 2</span>
            </div>
            <div id="cme-map-dialog-subtitle" style="font-size: 0.72rem; color: #94a3b8; margin-top: 1px;">
              ${CME_REGIONAL_MAPS[currentMapKey].subtitle}
            </div>
          </div>

          <!-- Clean 3-Option Map Switcher Buttons -->
          <div style="display: flex; gap: 4px; background: #0f172a; padding: 3px; border-radius: 6px; border: 1px solid #334155; margin-left: 4px;">
            <button type="button" id="btn-cme-map-regional" onclick="window.switchCmeRegionalMap('regional');" style="padding: 4px 10px; font-size: 0.74rem; font-weight: 700; border-radius: 4px; cursor: pointer; border: 1px solid ${currentMapKey === 'regional' ? '#38bdf8' : 'transparent'}; background: ${currentMapKey === 'regional' ? '#0284c7' : 'transparent'}; color: ${currentMapKey === 'regional' ? '#ffffff' : '#94a3b8'}; transition: all 0.15s ease;">
              <i class="fa-solid fa-earth-middle-east"></i> Regional Overview (1967)
            </button>
            <button type="button" id="btn-cme-map-cia" onclick="window.switchCmeRegionalMap('cia');" style="padding: 4px 10px; font-size: 0.74rem; font-weight: 700; border-radius: 4px; cursor: pointer; border: 1px solid ${currentMapKey === 'cia' ? '#38bdf8' : 'transparent'}; background: ${currentMapKey === 'cia' ? '#0284c7' : 'transparent'}; color: ${currentMapKey === 'cia' ? '#ffffff' : '#94a3b8'}; transition: all 0.15s ease;">
              <i class="fa-solid fa-location-dot"></i> CIA Borders Reference
            </button>
            <button type="button" id="btn-cme-map-live" onclick="window.switchCmeRegionalMap('live');" style="padding: 4px 10px; font-size: 0.74rem; font-weight: 700; border-radius: 4px; cursor: pointer; border: 1px solid ${currentMapKey === 'live' ? '#38bdf8' : 'transparent'}; background: ${currentMapKey === 'live' ? '#0284c7' : 'transparent'}; color: ${currentMapKey === 'live' ? '#ffffff' : '#94a3b8'}; transition: all 0.15s ease;" title="Interactive live slippy map with satellite imagery and infinite zoom">
              <i class="fa-solid fa-satellite"></i> Live Satellite / Street Map
            </button>
          </div>
        </div>

        <!-- Right: Zoom Controls, Shortcuts, Close -->
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          
          <!-- Zoom Controls -->
          <div style="display: flex; align-items: center; gap: 4px; background: #0f172a; padding: 2px 4px; border-radius: 6px; border: 1px solid #334155;">
            <button type="button" onclick="window.zoomCmeMap(0.25);" style="background: #1e293b; color: #fff; border: 1px solid #475569; width: 28px; height: 28px; border-radius: 4px; cursor: pointer; font-weight: 900; font-size: 0.95rem; display: flex; align-items: center; justify-content: center;" title="Zoom In (+)">+</button>
            <button type="button" onclick="window.zoomCmeMap(-0.25);" style="background: #1e293b; color: #fff; border: 1px solid #475569; width: 28px; height: 28px; border-radius: 4px; cursor: pointer; font-weight: 900; font-size: 0.95rem; display: flex; align-items: center; justify-content: center;" title="Zoom Out (-)">−</button>
            <button type="button" onclick="window.resetCmeMapZoom();" style="background: #1e293b; color: #cbd5e1; border: 1px solid #475569; padding: 0 9px; height: 28px; border-radius: 4px; cursor: pointer; font-size: 0.72rem; font-weight: 700;" title="Reset View (0)">Reset (↺)</button>
            <span id="cme-map-zoom-level" style="font-size: 0.72rem; font-weight: 700; color: #38bdf8; min-width: 44px; text-align: center;">100%</span>
          </div>

          <!-- Shortcuts Badge -->
          <div style="display: flex; align-items: center; gap: 6px; background: #0f172a; padding: 4px 8px; border-radius: 6px; font-size: 0.7rem; color: #94a3b8; border: 1px solid #334155;">
            <span>Drag to pan &bull; Scroll to zoom</span>
          </div>

          <!-- Close Button -->
          <button type="button" onclick="window.closeCmeTheaterMapModal();" style="background: #1e293b; color: #cbd5e1; border: 1px solid #334155; width: 32px; height: 32px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; transition: all 0.15s ease;" onmouseover="this.style.background='#dc2626'; this.style.color='#fff';" onmouseout="this.style.background='#1e293b'; this.style.color='#cbd5e1';" title="Close Map Modal (Esc)">
            &times;
          </button>
        </div>
      </div>

      <!-- Main Map Body: Dual Containers (Static High-Res Viewer vs Live Leaflet Slippy Map) -->
      <div style="flex: 1; position: relative; overflow: hidden; background: #030712; display: flex;">
        
        <!-- 1. Static Image Map Viewport (Full Space, Drag-to-Pan, Smooth Zoom) -->
        <div id="cme-map-viewport" style="flex: 1; position: relative; overflow: hidden; background: #030712; cursor: grab; display: flex; align-items: center; justify-content: center; user-select: none;">
          <div id="cme-map-stage" style="position: absolute; transform-origin: center center; will-change: transform; transition: transform 0.08s linear;">
            <img id="cme-regional-map-img" src="${getAssetUrl(CME_REGIONAL_MAPS[currentMapKey].image || CME_REGIONAL_MAPS.regional.image)}" alt="Regional Map of Israel and Surrounding Neighbours" style="max-height: 86vh; max-width: 94vw; object-fit: contain; display: block; border-radius: 6px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.9); pointer-events: none;" draggable="false">
          </div>
        </div>

        <!-- 2. Live Interactive Slippy Map Container (Leaflet Engine with Satellite & Street Layers) -->
        <div id="cme-leaflet-container" style="display: none; width: 100%; height: 100%; background: #030712; position: absolute; inset: 0; z-index: 10;">
          <!-- Loaded dynamically on switch to 'live' -->
        </div>

        <!-- Google Maps External Link Launcher (Visible when in Live Map mode) -->
        <div id="cme-live-gmaps-link" style="display: none; position: absolute; bottom: 12px; right: 14px; z-index: 1000; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(4px); border: 1px solid #334155; border-radius: 6px; padding: 6px 12px; font-size: 0.74rem;">
          <a href="https://www.google.com/maps/@31.4,34.9,7z" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 5px;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open in Google Maps
          </a>
        </div>
      </div>

      <!-- Bottom Hint Bar -->
      <div style="padding: 6px 18px; background: #070d19; border-top: 1px solid #1e293b; font-size: 0.72rem; color: #94a3b8; display: flex; align-items: center; justify-content: space-between;">
        <span id="cme-bottom-hint"><strong>Tip:</strong> Click and drag to pan across the Sinai, Golan, West Bank, Suez, and surrounding borders. Use mouse wheel or <kbd style="background: #1e293b; padding: 1px 4px; border-radius: 3px; color: #e2e8f0;">+</kbd>/<kbd style="background: #1e293b; padding: 1px 4px; border-radius: 3px; color: #e2e8f0;">−</kbd> to inspect fine topographical and border details.</span>
        <span style="color: #38bdf8; font-weight: 700;">Press <kbd style="background: #1e293b; padding: 1px 4px; border-radius: 3px; color: #38bdf8; border: 1px solid #334155;">Esc</kbd> or <kbd style="background: #1e293b; padding: 1px 4px; border-radius: 3px; color: #38bdf8; border: 1px solid #334155;">M</kbd> to return to lesson</span>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Setup Drag-to-Pan and Wheel-to-Zoom Event Listeners for Static Map
  initMapDragAndZoomEvents(modal);

  // Close modal when clicking outside dialog
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      window.closeCmeTheaterMapModal();
    }
  });

  return modal;
}

function initMapDragAndZoomEvents(modal) {
  const viewport = modal.querySelector('#cme-map-viewport');
  if (!viewport) return;

  viewport.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startPanX = panX;
    startPanY = panY;
    viewport.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    panX = startPanX + (e.clientX - startX);
    panY = startPanY + (e.clientY - startY);
    updateMapTransform();
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      const vp = document.getElementById('cme-map-viewport');
      if (vp) vp.style.cursor = 'grab';
    }
  });

  viewport.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 0.15 : -0.15;
      const nextZoom = Math.min(Math.max(0.6, currentZoom + zoomFactor), 4.0);
      currentZoom = parseFloat(nextZoom.toFixed(2));
      updateMapTransform();
    },
    { passive: false },
  );
}

function updateMapTransform() {
  const stage = document.getElementById('cme-map-stage');
  const zoomLevelEl = document.getElementById('cme-map-zoom-level');
  if (stage) {
    stage.style.transform = `translate(${panX}px, ${panY}px) scale(${currentZoom})`;
  }
  if (zoomLevelEl) {
    zoomLevelEl.textContent = `${Math.round(currentZoom * 100)}%`;
  }
}

// ============================================================================
// LEAFLET LIVE INTERACTIVE ENGINE INITIALIZATION
// ============================================================================

async function ensureLeafletMapInitialized() {
  const container = document.getElementById('cme-leaflet-container');
  if (!container) return;

  if (leafletMapInstance) {
    setTimeout(() => {
      leafletMapInstance.invalidateSize();
    }, 100);
    return;
  }

  container.innerHTML = `
    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #38bdf8; font-weight: 700; font-size: 0.9rem; gap: 8px;">
      <i class="fa-solid fa-spinner fa-spin"></i> Initializing Real-Time Map Engine...
    </div>
  `;

  try {
    const L = await loadLeaflet();
    container.innerHTML = ''; // Clear loading spinner

    // Center on Israel / Middle East Theater (Lat 31.4, Lng 34.9) at Zoom Level 7
    leafletMapInstance = L.map('cme-leaflet-container', {
      center: [31.4, 34.9],
      zoom: 7,
      minZoom: 3,
      maxZoom: 18,
      zoomControl: true,
    });

    // Base Layer 1: Esri World Imagery (High-Resolution Real Satellite)
    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        attribution: 'Tiles &copy; Esri &mdash; Earthstar Geographics',
      },
    );

    // Base Layer 2: OpenStreetMap Standard (Roads, Borders, Modern Topography)
    const streetLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    });

    // Default to Satellite Imagery for rich desert/topographical visualization
    satelliteLayer.addTo(leafletMapInstance);

    // Add 1-Click Layer Switcher (Top Right, Always Open)
    const baseMaps = {
      '🛰️ Satellite View': satelliteLayer,
      '🗺️ Street & Borders': streetLayer,
    };
    L.control
      .layers(baseMaps, null, { position: 'topright', collapsed: false })
      .addTo(leafletMapInstance);

    // Update zoom indicator on live map zoom changes
    leafletMapInstance.on('zoomend', () => {
      const zoomLevelEl = document.getElementById('cme-map-zoom-level');
      if (zoomLevelEl && currentMapKey === 'live') {
        zoomLevelEl.textContent = `z${leafletMapInstance.getZoom()}`;
      }
    });

    setTimeout(() => {
      leafletMapInstance.invalidateSize();
    }, 150);
  } catch (err) {
    console.error('Failed to load Leaflet:', err);
    container.innerHTML = `
      <div style="padding: 40px; text-align: center; color: #ef4444;">
        <i class="fa-solid fa-circle-exclamation" style="font-size: 2rem; margin-bottom: 12px;"></i>
        <div style="font-size: 1rem; font-weight: 700;">Interactive Map Engine Offline</div>
        <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 6px;">Please check your internet connection or use the Regional Overview / CIA Borders tabs.</div>
      </div>
    `;
  }
}

// ============================================================================
// PUBLIC MODAL CONTROLS
// ============================================================================

export function openCmeTheaterMapModal(preferredMap) {
  const modal = ensureCmeTheaterMapModalInDOM();

  if (preferredMap && CME_REGIONAL_MAPS[preferredMap]) {
    currentMapKey = preferredMap;
  }

  modal.style.display = 'flex';
  switchCmeRegionalMap(currentMapKey);
}

export function closeCmeTheaterMapModal() {
  const modal = document.getElementById('cme-theater-map-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

export function switchCmeRegionalMap(mapKey) {
  if (!CME_REGIONAL_MAPS[mapKey]) return;
  currentMapKey = mapKey;

  const mapData = CME_REGIONAL_MAPS[currentMapKey];
  const title = document.getElementById('cme-map-dialog-title');
  const subtitle = document.getElementById('cme-map-dialog-subtitle');
  const viewport = document.getElementById('cme-map-viewport');
  const leafletContainer = document.getElementById('cme-leaflet-container');
  const gmapsLink = document.getElementById('cme-live-gmaps-link');
  const bottomHint = document.getElementById('cme-bottom-hint');
  const zoomLevelEl = document.getElementById('cme-map-zoom-level');

  if (title) title.textContent = mapData.title;
  if (subtitle) subtitle.textContent = mapData.subtitle;

  updateMapSwitcherButtonStyles();

  if (mapKey === 'live') {
    // Show Live Leaflet Map
    if (viewport) viewport.style.display = 'none';
    if (leafletContainer) leafletContainer.style.display = 'block';
    if (gmapsLink) gmapsLink.style.display = 'block';
    if (bottomHint) {
      bottomHint.innerHTML =
        '<strong>Live Engine:</strong> Pan anywhere across the Middle East. Zoom with mouse wheel or <kbd style="background: #1e293b; padding: 1px 4px; border-radius: 3px; color: #e2e8f0;">+</kbd>/<kbd style="background: #1e293b; padding: 1px 4px; border-radius: 3px; color: #e2e8f0;">−</kbd>. Switch between <strong>Satellite</strong> and <strong>Street</strong> in the top-right corner.';
    }

    ensureLeafletMapInitialized();

    if (zoomLevelEl && leafletMapInstance) {
      zoomLevelEl.textContent = `z${leafletMapInstance.getZoom()}`;
    }
  } else {
    // Show Static High-Resolution Image Map
    if (leafletContainer) leafletContainer.style.display = 'none';
    if (gmapsLink) gmapsLink.style.display = 'none';
    if (viewport) viewport.style.display = 'flex';
    if (bottomHint) {
      bottomHint.innerHTML =
        '<strong>Tip:</strong> Click and drag to pan across the Sinai, Golan, West Bank, Suez, and surrounding borders. Use mouse wheel or <kbd style="background: #1e293b; padding: 1px 4px; border-radius: 3px; color: #e2e8f0;">+</kbd>/<kbd style="background: #1e293b; padding: 1px 4px; border-radius: 3px; color: #e2e8f0;">−</kbd> to inspect fine topographical and border details.';
    }

    currentZoom = 1;
    panX = 0;
    panY = 0;
    updateMapTransform();

    const img = document.getElementById('cme-regional-map-img');
    if (img && mapData.image) {
      img.src = getAssetUrl(mapData.image);
    }
  }
}

function updateMapSwitcherButtonStyles() {
  const btnRegional = document.getElementById('btn-cme-map-regional');
  const btnCia = document.getElementById('btn-cme-map-cia');
  const btnLive = document.getElementById('btn-cme-map-live');

  if (btnRegional) {
    const isReg = currentMapKey === 'regional';
    btnRegional.style.background = isReg ? '#0284c7' : 'transparent';
    btnRegional.style.borderColor = isReg ? '#38bdf8' : 'transparent';
    btnRegional.style.color = isReg ? '#ffffff' : '#94a3b8';
  }
  if (btnCia) {
    const isCia = currentMapKey === 'cia';
    btnCia.style.background = isCia ? '#0284c7' : 'transparent';
    btnCia.style.borderColor = isCia ? '#38bdf8' : 'transparent';
    btnCia.style.color = isCia ? '#ffffff' : '#94a3b8';
  }
  if (btnLive) {
    const isLive = currentMapKey === 'live';
    btnLive.style.background = isLive ? '#0284c7' : 'transparent';
    btnLive.style.borderColor = isLive ? '#38bdf8' : 'transparent';
    btnLive.style.color = isLive ? '#ffffff' : '#94a3b8';
  }
}

export function zoomCmeMap(delta) {
  if (currentMapKey === 'live' && leafletMapInstance) {
    if (delta > 0) leafletMapInstance.zoomIn();
    else leafletMapInstance.zoomOut();
    return;
  }
  currentZoom = Math.min(Math.max(0.6, parseFloat((currentZoom + delta).toFixed(2))), 4.0);
  updateMapTransform();
}

export function resetCmeMapZoom() {
  if (currentMapKey === 'live' && leafletMapInstance) {
    leafletMapInstance.setView([31.4, 34.9], 7);
    return;
  }
  currentZoom = 1;
  panX = 0;
  panY = 0;
  updateMapTransform();
}

// ============================================================================
// FLOATING TRIGGER BUTTON (Pill at bottom-right of viewport)
// ============================================================================

export function renderFloatingCmeMapButton() {
  const existing = document.getElementById('cme-floating-theater-map-btn');
  const unitId = window.currentUnitId;

  if (unitId !== 'cme_new') {
    if (existing) existing.remove();
    return;
  }

  if (existing) return;

  const btn = document.createElement('button');
  btn.id = 'cme-floating-theater-map-btn';
  btn.type = 'button';
  btn.className = 'cme-floating-theater-map-btn no-print';
  btn.setAttribute('aria-label', 'Open Middle East Regional Map');
  btn.style.cssText =
    'position: fixed; bottom: 24px; right: 24px; z-index: 9990; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: 1.5px solid #38bdf8; border-radius: 30px; padding: 9px 16px; font-size: 0.82rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.45); transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); user-select: none; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';

  btn.innerHTML = `
    <i class="fa-solid fa-map" style="font-size: 0.95rem;"></i>
    <span>Regional Map <kbd style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.3); border-radius: 3px; padding: 1px 4px; font-size: 0.65rem; margin-left: 2px;">M</kbd></span>
  `;

  btn.onmouseover = () => {
    btn.style.transform = 'translateY(-2px) scale(1.03)';
    btn.style.boxShadow = '0 6px 20px rgba(2, 132, 199, 0.6)';
  };
  btn.onmouseout = () => {
    btn.style.transform = 'translateY(0) scale(1)';
    btn.style.boxShadow = '0 4px 14px rgba(2, 132, 199, 0.45)';
  };
  btn.onclick = () => {
    window.openCmeTheaterMapModal();
  };

  document.body.appendChild(btn);
}

// ============================================================================
// KEYBOARD SHORTCUTS
// ============================================================================

export function initCmeMapHotkeys() {
  if (window._cmeHotkeysAttached) return;
  window._cmeHotkeysAttached = true;

  window.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    if (
      active &&
      (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)
    ) {
      return;
    }

    const modal = document.getElementById('cme-theater-map-modal');
    const isModalVisible = modal && modal.style.display === 'flex';

    // Toggle Regional Map with 'M' or 'm'
    if (e.key === 'm' || e.key === 'M') {
      if (isModalVisible) {
        window.closeCmeTheaterMapModal();
      } else {
        window.openCmeTheaterMapModal();
      }
      return;
    }

    // Modal active shortcuts (+, -, 0, Esc)
    if (isModalVisible) {
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        window.zoomCmeMap(0.25);
        return;
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        window.zoomCmeMap(-0.25);
        return;
      } else if (e.key === '0') {
        e.preventDefault();
        window.resetCmeMapZoom();
        return;
      } else if (e.key === 'Escape') {
        window.closeCmeTheaterMapModal();
        return;
      }
    }

    // Presenter Focus Hotkeys (when Presenter Mode is active)
    if (window._cmePresenterActive) {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        window.stepCmePresenterStage(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        window.stepCmePresenterStage(-1);
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        window.setCmePresenterStage(parseInt(e.key, 10) - 1);
      } else if (e.key === 'Escape') {
        window.toggleCmePresenterMode();
      }
    }
  });
}

// ============================================================================
// TEACHING / 5-STAGE FOCUS VIEW ("PRESENTER MODE") ENGINE
// ============================================================================

window._cmePresenterActive = false;
window._cmePresenterStageIndex = 0;
window._cmePresenterLayoutMode = 'spotlight';

export function toggleCmePresenterMode() {
  const spine = document.getElementById('lesson-chronology-spine');
  if (!spine) return;

  window._cmePresenterActive = !window._cmePresenterActive;
  const isActive = window._cmePresenterActive;

  const btn = document.getElementById('btn-cme-presenter-focus');
  const label = document.getElementById('cme-presenter-label');
  const foldedBanner = document.getElementById('cme-presenter-folded-banner');
  const proseContent = document.getElementById('cme-narrative-prose-content');

  if (isActive) {
    spine.classList.add('cme-presenter-active');
    spine.open = true;

    if (btn) {
      btn.style.background = '#0284c7';
      btn.style.color = '#ffffff';
      btn.style.borderColor = '#0369a1';
    }
    if (label) {
      label.innerHTML = '<i class="fa-solid fa-person-chalkboard"></i> Presenter Active (Exit)';
    }

    // Fold prose narrative
    if (foldedBanner) foldedBanner.style.display = 'block';
    if (proseContent) proseContent.style.display = 'none';

    // Inject Presenter Toolbar and Stage Focus View
    renderCmePresenterUI(spine);

    // Smoothly scroll spine to top of viewport for smartboard presentation
    spine.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    spine.classList.remove('cme-presenter-active');

    if (btn) {
      btn.style.background = '#f0fdf4';
      btn.style.color = '#166534';
      btn.style.borderColor = '#86efac';
    }
    if (label) {
      label.innerHTML = '<i class="fa-solid fa-person-chalkboard"></i> Presenter Focus View';
    }

    // Unfold prose narrative
    if (foldedBanner) foldedBanner.style.display = 'none';
    if (proseContent) proseContent.style.display = 'block';

    // Remove Presenter UI
    const toolbar = document.getElementById('cme-presenter-toolbar');
    if (toolbar) toolbar.remove();

    const spotlightBox = document.getElementById('cme-presenter-spotlight-box');
    if (spotlightBox) spotlightBox.remove();

    // Restore normal grid display
    const grid = spine.querySelector('.cme-chronology-spine-grid');
    if (grid) {
      grid.style.display = 'grid';
      grid.querySelectorAll('.cme-spine-card').forEach((c) => {
        c.style.display = 'flex';
      });
    }
  }
}

export function renderCmePresenterUI(spine) {
  const cards = Array.from(spine.querySelectorAll('.cme-spine-card'));
  if (cards.length === 0) return;

  const stageData = cards.map((c, idx) => {
    const stageNum = idx + 1;
    const date = c.querySelector('[data-stage] span[title]')?.textContent || '';
    const tag = c.querySelector('div[title*="•"] strong')?.textContent || '';
    const title = c.querySelector('h5')?.textContent?.trim() || `Stage ${stageNum}`;
    const desc = c.querySelector('.cme-spine-desc')?.textContent?.trim() || '';
    const because =
      c
        .querySelector('.cme-quiz-target[data-quiz-type="motive"] .cme-quiz-content')
        ?.textContent?.trim() || '';
    const therefore =
      c
        .querySelector('.cme-quiz-target[data-quiz-type="result"] .cme-quiz-content')
        ?.textContent?.trim() || '';
    const connective = c.querySelector('.cme-domino-bridge')?.getAttribute('title') || '';

    return { stageNum, date, tag, title, desc, because, therefore, connective };
  });

  let toolbar = document.getElementById('cme-presenter-toolbar');
  if (!toolbar) {
    toolbar = document.createElement('div');
    toolbar.id = 'cme-presenter-toolbar';
    toolbar.className = 'cme-presenter-toolbar';
    toolbar.style.cssText =
      'background: #0f172a; border-bottom: 2px solid #0284c7; padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; color: #ffffff;';

    const summary = spine.querySelector('summary');
    if (summary && summary.nextSibling) {
      spine.insertBefore(toolbar, summary.nextSibling);
    } else {
      spine.prepend(toolbar);
    }
  }

  toolbar.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
      <span style="background: #0284c7; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
        <i class="fa-solid fa-person-chalkboard"></i> Whole-Class Focus
      </span>
      
      <!-- Stage Selector Pills -->
      <div style="display: flex; gap: 4px; flex-wrap: wrap;">
        ${stageData
          .map(
            (s, idx) => `
          <button type="button" class="cme-presenter-pill" onclick="window.setCmePresenterStage(${idx});" style="padding: 4px 10px; font-size: 0.76rem; font-weight: 700; border-radius: 4px; cursor: pointer; transition: all 0.15s ease; ${
            idx === window._cmePresenterStageIndex
              ? 'background: #38bdf8; color: #0f172a; border: 1px solid #7dd3fc; font-weight: 900;'
              : 'background: #1e293b; color: #94a3b8; border: 1px solid #334155;'
          }">
            Stage ${s.stageNum}
          </button>
        `,
          )
          .join('')}
      </div>

      <!-- Prev / Next Steppers -->
      <div style="display: flex; gap: 4px;">
        <button type="button" onclick="window.stepCmePresenterStage(-1);" style="padding: 4px 9px; font-size: 0.74rem; font-weight: 700; background: #1e293b; color: #e2e8f0; border: 1px solid #334155; border-radius: 4px; cursor: pointer;" title="Previous Stage (Left Arrow)">
          &larr; Prev
        </button>
        <button type="button" onclick="window.stepCmePresenterStage(1);" style="padding: 4px 9px; font-size: 0.74rem; font-weight: 700; background: #1e293b; color: #e2e8f0; border: 1px solid #334155; border-radius: 4px; cursor: pointer;" title="Next Stage (Right Arrow)">
          Next &rarr;
        </button>
      </div>
    </div>

    <!-- Right Controls: Map Launcher & Exit -->
    <div style="display: flex; align-items: center; gap: 8px;">
      <button type="button" onclick="window.openCmeTheaterMapModal();" style="padding: 4px 11px; font-size: 0.76rem; font-weight: 700; background: #0369a1; color: #ffffff; border: 1px solid #38bdf8; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Open Regional Map (M)">
        <i class="fa-solid fa-map"></i> Regional Map
      </button>
      <button type="button" onclick="window.toggleCmePresenterMode();" style="padding: 4px 10px; font-size: 0.76rem; font-weight: 700; background: #334155; color: #cbd5e1; border: 1px solid #475569; border-radius: 4px; cursor: pointer;" title="Exit Presenter Focus (Esc)">
        Exit Focus
      </button>
    </div>
  `;

  let spotlightBox = document.getElementById('cme-presenter-spotlight-box');
  if (!spotlightBox) {
    spotlightBox = document.createElement('div');
    spotlightBox.id = 'cme-presenter-spotlight-box';
    spotlightBox.className = 'cme-presenter-spotlight-box';
    spotlightBox.style.cssText =
      'padding: 24px; background: #ffffff; border-bottom: 2px solid #e2e8f0;';

    const grid = spine.querySelector('.cme-chronology-spine-grid');
    if (grid) {
      grid.style.display = 'none';
      spine.insertBefore(spotlightBox, grid);
    }
  }

  const activeStage = stageData[window._cmePresenterStageIndex] || stageData[0];
  const isLast = activeStage.stageNum === stageData.length;

  spotlightBox.innerHTML = `
    <div style="max-width: 1080px; margin: 0 auto; animation: fadeIn 0.25s ease;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="background: #0f172a; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 900; padding: 3px 10px; border-radius: 5px; letter-spacing: 0.6px;">
            STAGE ${activeStage.stageNum} OF ${stageData.length}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 1.05rem; font-weight: 800; color: #0284c7;">
            ${activeStage.date}
          </span>
        </div>
        ${
          activeStage.tag
            ? `
          <span style="font-size: 0.82rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; background: #f1f5f9; padding: 3px 10px; border-radius: 4px; border: 1px solid #cbd5e1;">
            Actor: <strong style="color: #0f172a;">${activeStage.tag}</strong>
          </span>
        `
            : ''
        }
      </div>

      <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.85rem; font-weight: 800; color: #0f172a; margin: 0 0 14px 0; line-height: 1.25;">
        ${activeStage.title}
      </h3>

      <div style="font-size: 1.12rem; line-height: 1.65; color: #1e293b; background: #f8fafc; border-left: 4px solid #0284c7; padding: 14px 18px; border-radius: 0 8px 8px 0; margin-bottom: 22px;">
        ${activeStage.desc}
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-bottom: 22px;">
        <div style="background: #fefce8; border: 1.5px solid #fef08a; border-top: 4px solid #ca8a04; border-radius: 8px; padding: 16px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <i class="fa-solid fa-lightbulb" style="color: #ca8a04; font-size: 1rem;"></i>
            <span style="font-weight: 800; font-size: 0.82rem; text-transform: uppercase; color: #854d0e; letter-spacing: 0.5px;">
              Motive & Underlying Cause (Why did they act?)
            </span>
          </div>
          <div style="font-size: 0.98rem; line-height: 1.55; color: #713f12;">
            ${activeStage.because || 'Historical actors acted in response to rising geopolitical pressure and regional strategic imperatives.'}
          </div>
        </div>

        <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-top: 4px solid #16a34a; border-radius: 8px; padding: 16px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <i class="fa-solid fa-arrow-trend-up" style="color: #16a34a; font-size: 1rem;"></i>
            <span style="font-weight: 800; font-size: 0.82rem; text-transform: uppercase; color: #166534; letter-spacing: 0.5px;">
              Direct Consequence & Spark for Next Stage
            </span>
          </div>
          <div style="font-size: 0.98rem; line-height: 1.55; color: #14532d;">
            ${activeStage.therefore || 'Directly catalyzed the subsequent military or political maneuver in the causal sequence.'}
          </div>
        </div>
      </div>

      ${
        !isLast
          ? `
        <div style="background: #eff6ff; border: 1.5px dashed #93c5fd; border-radius: 8px; padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="background: #1d4ed8; color: #ffffff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.85rem;">
              &darr;
            </span>
            <span style="font-size: 0.92rem; color: #1e40af; font-weight: 700;">
              <strong>Causal Domino Spark:</strong> How Stage ${activeStage.stageNum} forces Stage ${activeStage.stageNum + 1}
            </span>
          </div>
          <button type="button" onclick="window.stepCmePresenterStage(1);" style="padding: 6px 14px; font-size: 0.82rem; font-weight: 800; background: #1d4ed8; color: #ffffff; border: none; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(29, 78, 216, 0.3);">
            Advance to Stage ${activeStage.stageNum + 1} &rarr;
          </button>
        </div>
      `
          : `
        <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fa-solid fa-flag-checkered" style="color: #16a34a; font-size: 1.2rem;"></i>
            <span style="font-size: 0.92rem; color: #166534; font-weight: 700;">
              <strong>Causal Spine Complete:</strong> Pupils now have the complete 5-stage causal narrative to tackle Edexcel 8-mark and 16-mark explanations.
            </span>
          </div>
          <button type="button" onclick="window.toggleCmePresenterMode();" style="padding: 6px 14px; font-size: 0.82rem; font-weight: 800; background: #166534; color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
            Return to Full Lesson Text &darr;
          </button>
        </div>
      `
      }
    </div>
  `;
}

export function setCmePresenterStage(idx) {
  window._cmePresenterStageIndex = idx;
  const spine = document.getElementById('lesson-chronology-spine');
  if (spine) {
    renderCmePresenterUI(spine);
  }
}

export function stepCmePresenterStage(delta) {
  const spine = document.getElementById('lesson-chronology-spine');
  if (!spine) return;
  const cards = spine.querySelectorAll('.cme-spine-card');
  const maxIdx = Math.max(0, cards.length - 1);
  const nextIdx = Math.min(Math.max(0, window._cmePresenterStageIndex + delta), maxIdx);
  setCmePresenterStage(nextIdx);
}

export function toggleCmeNarrativeFold() {
  const content = document.getElementById('cme-narrative-prose-content');
  const banner = document.getElementById('cme-presenter-folded-banner');
  if (!content) return;

  const isHidden = content.style.display === 'none';
  content.style.display = isHidden ? 'block' : 'none';
  if (banner) {
    banner.innerHTML = isHidden
      ? `
      <span style="font-weight: 800; color: #0369a1; font-size: 0.95rem;">
        <i class="fa-solid fa-eye-slash"></i> Full Lesson Narrative & Primary Sources (Expanded &bull; Click to re-fold)
      </span>
    `
      : `
      <span style="font-weight: 800; color: #0369a1; font-size: 0.95rem;">
        <i class="fa-solid fa-book-open"></i> Full Lesson Narrative & Primary Sources (Folded for Presenter Focus &bull; Click to expand)
      </span>
    `;
  }
}

// Global window registrations
window.openCmeTheaterMapModal = openCmeTheaterMapModal;
window.closeCmeTheaterMapModal = closeCmeTheaterMapModal;
window.switchCmeRegionalMap = switchCmeRegionalMap;
window.zoomCmeMap = zoomCmeMap;
window.resetCmeMapZoom = resetCmeMapZoom;
window.toggleCmePresenterMode = toggleCmePresenterMode;
window.setCmePresenterStage = setCmePresenterStage;
window.stepCmePresenterStage = stepCmePresenterStage;
window.toggleCmeNarrativeFold = toggleCmeNarrativeFold;
window.renderFloatingCmeMapButton = renderFloatingCmeMapButton;

import { getAssetUrl } from './engine/assets.js';

export function generateGeographicalLocationEmbedHTML(location) {
  // Keeping this for backward compatibility if it's used elsewhere
  let imgSrcHtml = '';
  if (location.image || location.image_url) {
    const imgSrc = location.image_url ? location.image_url : (typeof getAssetUrl === 'function' ? getAssetUrl(location.image) : location.image);
    imgSrcHtml = `
      <div style="margin-top: 25px; display: flex; justify-content: center; align-items: flex-start;">
        <img src="${imgSrc}" loading="lazy" style="max-width: 100%; max-height: 200px; object-fit: contain; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);" onerror="this.parentElement.style.display='none'">
      </div>
    `;
  }

  let basicBio = '';
  if (location.description) {
    basicBio = `<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;">${location.description}</div>`;
  } else if (location.significance) {
    basicBio = `<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;"><strong>Significance:</strong> ${location.significance}`;
    if (location.achievements && Array.isArray(location.achievements) && location.achievements.length > 0) {
      basicBio += `<br><br><strong>Achievements:</strong><ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 0;"><li>${location.achievements.join('</li><li>')}</li></ul>`;
    }
    basicBio += `</div>`;
  }

  let coordinatesHtml = location.coordinates ? `<p style="font-size: 0.85rem; color: var(--text-muted); margin-top: -5px; margin-bottom: 10px;">${location.coordinates}</p>` : '';

  return `
    <div style="display: flex; flex-wrap: wrap; gap: 40px; align-items: stretch; background: var(--bg-card); padding: 25px; border-radius: 12px; border: 1px solid var(--border-glass);">
      <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column;">
        <h3 style="margin: 0 0 5px 0; color: var(--primary); font-family: var(--font-heading); font-size: 1.5rem;">${location.name}</h3>
        ${coordinatesHtml}
        <p style="margin: 0 0 15px 0; color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">${location.region || ''}</p>
        ${basicBio}
        ${imgSrcHtml}
      </div>
    </div>
  `;
}

window.openGeographyModal = function(index) {
  if (!window.locationsDataGlobal || !window.locationsDataGlobal[index]) return;
  const location = window.locationsDataGlobal[index];
  
  let modal = document.getElementById('geo-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'geo-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.zIndex = '999999';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.padding = '20px';
    modal.style.boxSizing = 'border-box';
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        modal.innerHTML = '';
      }
    };
    document.body.appendChild(modal);
  }

  const mapQuery = location.mapQuery || location.name;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  let rightPanelHtml = `
    <div style="flex: 0 0 350px; background: #f8fafc; padding: 25px; border-left: 1px solid #cbd5e1; overflow-y: auto; display: flex; flex-direction: column; gap: 25px;">
  `;

  if (location.description) {
    rightPanelHtml += `
      <div>
        <h2 style="margin-top: 0; color: #0f172a; font-family: var(--font-heading, sans-serif); border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 12px; font-size: 1.3rem;">About</h2>
        <p style="color: #334155; font-size: 0.95rem; line-height: 1.6; margin: 0;">${location.description}</p>
      </div>
    `;
  }

  if (location.timeline && Array.isArray(location.timeline) && location.timeline.length > 0) {
    rightPanelHtml += `
      <div>
        <h2 style="margin-top: 0; color: #0f172a; font-family: var(--font-heading, sans-serif); border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px; font-size: 1.3rem;">Key Events</h2>
        <ul style="list-style: none; padding: 0; margin: 0; position: relative; border-left: 3px solid #3b82f6; margin-left: 10px;">
    `;
    location.timeline.forEach((event, i) => {
      const parts = event.split(' - ');
      const year = parts.length > 1 ? parts[0] : '';
      const text = parts.length > 1 ? parts.slice(1).join(' - ') : event;
      
      rightPanelHtml += `
        <li style="position: relative; margin-bottom: 20px; padding-left: 20px;">
          <div style="position: absolute; left: -8px; top: 5px; width: 13px; height: 13px; border-radius: 50%; background: #3b82f6; border: 3px solid #f8fafc;"></div>
          ${year ? `<div style="font-weight: bold; color: #1d4ed8; font-size: 0.95rem; margin-bottom: 4px;">${year}</div>` : ''}
          <div style="color: #334155; font-size: 0.9rem; line-height: 1.5;">${text}</div>
        </li>
      `;
    });
    rightPanelHtml += `
        </ul>
      </div>
    `;
  }

  rightPanelHtml += `</div>`;

  modal.innerHTML = `
    <div style="background: white; border-radius: 12px; width: 100%; max-width: 1200px; height: 80vh; max-height: 800px; display: flex; flex-direction: column; overflow: hidden; position: relative; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
      
      <!-- Header -->
      <div style="padding: 15px 25px; background: #0f172a; color: white; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="margin: 0; font-size: 1.4rem;">${location.name}</h2>
          <div style="font-size: 0.85rem; color: #94a3b8; margin-top: 4px;">${location.region || ''} ${location.coordinates ? `| ${location.coordinates}` : ''}</div>
        </div>
        <button onclick="document.getElementById('geo-modal').style.display='none'; document.getElementById('geo-modal').innerHTML='';" style="background: none; border: none; color: white; font-size: 2rem; cursor: pointer; padding: 0 10px; line-height: 1;">&times;</button>
      </div>
      
      <!-- Body -->
      <div style="display: flex; flex: 1; overflow: hidden; flex-direction: row;">
        <!-- Left: Map -->
        <div style="flex: 1; background: #e2e8f0; position: relative;">
          <iframe 
            width="100%" 
            height="100%" 
            frameborder="0" 
            style="border:0; display:block;"
            src="${mapSrc}" 
            allowfullscreen>
          </iframe>
        </div>
        
        <!-- Right: Timeline / Info -->
        ${rightPanelHtml}
      </div>

    </div>
  `;
  modal.style.display = 'flex';
};

export function generateGeographicalLocationCardHTML(location, index) {
  let frontImgHtml = '';
  if (location.image || location.image_url) {
    const imgSrc = location.image_url ? location.image_url : (typeof getAssetUrl === 'function' ? getAssetUrl(location.image) : location.image);
    frontImgHtml = `
      <div style="width: 100%; height: 280px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden;">
        <img src="${imgSrc}" loading="lazy" style="width: 100%; height: 100%; object-fit: contain;" onerror="this.parentElement.style.display='none'">
      </div>
    `;
  }

  let basicBio = '';
  if (location.description) {
    basicBio = `<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;">${location.description}</div>`;
  } else if (location.significance) {
    basicBio = `<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;"><strong>Significance:</strong> ${location.significance}`;
    if (location.achievements && Array.isArray(location.achievements) && location.achievements.length > 0) {
      basicBio += `<br><br><strong>Achievements:</strong><ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 0;"><li>${location.achievements.join('</li><li>')}</li></ul>`;
    }
    basicBio += `</div>`;
  }

  let coordinatesHtml = location.coordinates ? `<p style="font-size: 0.85rem; color: var(--text-muted); margin-top: -10px; margin-bottom: 10px;">${location.coordinates}</p>` : '';

  return `
    <div class="location-card" onclick="window.openGeographyModal(${index})" style="height: 100%; background: var(--bg-card, rgba(255, 255, 255, 0.05)); border: 1px solid var(--border-glass); border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 20px rgba(0,0,0,0.15)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
      ${frontImgHtml}
      <div style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
        <h3 style="margin: 0 0 5px 0; color: var(--primary); font-family: var(--font-heading);">${location.name}</h3>
        ${coordinatesHtml}
        <p style="margin: 0 0 15px 0; color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">${location.region || ''}</p>
        ${basicBio}
        <div style="text-align: center; margin-top: auto; padding-top: 15px; font-size: 0.85rem; color: #10b981; font-weight: bold;"><i class="fas fa-map-marked-alt" style="margin-right: 5px;"></i> View Interactive Map</div>
      </div>
    </div>
  `;
}

export function initGeographicalLocationsTask(container, locationsData) {
  if (!locationsData || locationsData.length === 0) return;
  
  // Attach data to window for modal lookup
  window.locationsDataGlobal = locationsData;

  const wrapper = document.createElement('div');
  wrapper.className = 'key-individuals-wrapper fade-in';
  wrapper.style.padding = '20px';
  wrapper.style.maxWidth = '1200px';
  wrapper.style.margin = '0 auto';

  const header = document.createElement('div');
  header.style.textAlign = 'center';
  header.style.marginBottom = '40px';
  header.innerHTML = `
    <h1 style="font-family: var(--font-heading); color: var(--primary); margin-bottom: 10px; font-size: 2.5rem;">Geographical Locations</h1>
    <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">Explore the key geographical locations and understand their significance.</p>
  `;
  wrapper.appendChild(header);

  let grouped = false;
  if (locationsData.length > 0 && locationsData[0].group) {
    grouped = true;
  }

  const bannerMap = {
    'Key Topic 1': {
      title: 'Key Topic 1: The Weimar Republic (1918-29)',
      image: 'images/weimar_kt1_cover.jpg',
      gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
      border: '#3b82f6',
      enquiry: 'To what extent did the Weimar Republic recover from its early crises?'
    },
    'Key Topic 2': {
      title: "Key Topic 2: Hitler's Rise to Power, 1919-33",
      image: 'images/weimar_kt2_cover.jpg',
      gradient: 'linear-gradient(135deg, #7f1d1d, #dc2626)',
      border: '#dc2626',
      enquiry: 'How did a tiny obscure political group transform?'
    },
    'Key Topic 3': {
      title: "Key Topic 3: Nazi Control and Dictatorship",
      image: 'images/weimar_kt3_cover.jpg',
      gradient: 'linear-gradient(135deg, #4b5563, #1f2937)',
      border: '#1f2937',
      enquiry: 'From chains to absolute control'
    },
    'Key Topic 4': {
      title: "Key Topic 4: Life in Nazi Germany, 1933-39",
      image: 'images/weimar_kt4_cover.jpg',
      gradient: 'linear-gradient(135deg, #4d7c0f, #65a30d)',
      border: '#65a30d',
      enquiry: 'Did life improve under the Nazis?'
    }
  };

  if (grouped) {
    let currentGroup = '';
    let htmlContent = '';
    let isFirstGroup = true;

    locationsData.forEach((location, index) => {
      if (location.group !== currentGroup) {
        if (!isFirstGroup) {
          htmlContent += '</div>'; // Close previous grid
        }
        isFirstGroup = false;
        currentGroup = location.group;
        
        // Add Banner
        const bannerData = bannerMap[currentGroup];
        if (bannerData) {
          const bannerUrl = typeof getAssetUrl === 'function' ? getAssetUrl('/' + bannerData.image) : '/' + bannerData.image;
          htmlContent += `
            <div style="margin-top: 40px; margin-bottom: 25px;">
              <div class="premium-banner" style="position: relative; overflow: hidden; border-radius: 12px; padding: 25px 30px; margin: 0; min-height: 140px; box-shadow: 0 10px 25px -10px rgba(0,0,0,0.4); display: flex; flex-direction: column; align-items: flex-start; justify-content: center;">
                <div class="premium-banner-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('${bannerUrl}'); background-position: center; background-size: cover; z-index: 1; filter: brightness(0.9);"></div>
                <div class="premium-banner-overlay-1" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%); z-index: 2;"></div>
                <div class="premium-banner-overlay-2" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.45; mix-blend-mode: multiply; z-index: 3; background: ${bannerData.gradient};"></div>
                <div class="premium-banner-glow" style="position: absolute; bottom: -50px; right: -50px; width: 300px; height: 300px; filter: blur(40px); z-index: 3; opacity: 0.6; border-radius: 50%; background: radial-gradient(circle, ${bannerData.border} 0%, transparent 70%);"></div>
                <div class="premium-banner-content" style="position: relative; z-index: 4; padding-left: 20px; border-left: 6px solid ${bannerData.border};">
                  <h3 class="premium-banner-title" style="margin: 0; color: #ffffff; font-size: 2rem; font-weight: 700; font-family: 'Playfair Display', serif; text-shadow: 0px 4px 12px rgba(0,0,0,0.8);">${bannerData.title}</h3>
                  <p class="premium-banner-enquiry" style="margin: 8px 0 0 0; color: #f8fafc; font-size: 1.05rem; font-style: italic; max-width: 800px; font-weight: 300; text-shadow: 0px 2px 8px rgba(0,0,0,0.8);">${bannerData.enquiry}</p>
                </div>
              </div>
            </div>
          `;
        } else {
          // Fallback text header
          htmlContent += `
            <h2 style="margin-top: 40px; margin-bottom: 20px; color: var(--primary); border-bottom: 2px solid var(--primary); padding-bottom: 10px;">
              ${currentGroup}
            </h2>
          `;
        }

        // Create new grid for this group
        htmlContent += `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; align-items: stretch;">`;
      }
      
      htmlContent += generateGeographicalLocationCardHTML(location, index);
    });

    if (!isFirstGroup) {
      htmlContent += '</div>'; // Close final grid
    }

    wrapper.insertAdjacentHTML('beforeend', htmlContent);

  } else {
    // Legacy non-grouped logic
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    grid.style.gap = '25px';
    grid.style.alignItems = 'stretch';
    
    let gridHtml = '';
    locationsData.forEach((location, index) => {
      gridHtml += generateGeographicalLocationCardHTML(location, index);
    });
    grid.innerHTML = gridHtml;
    wrapper.appendChild(grid);
  }
  container.appendChild(wrapper);
}

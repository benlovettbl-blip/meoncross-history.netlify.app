import { getAssetUrl } from './core_app.js';

export function generateKeyIndividualEmbedHTML(person) {
  const hasBackData = person.actions || (person.achievements && !Array.isArray(person.achievements)) || person.limitations;
  
  let imgSrcHtml = '';
  if (person.image || person.image_url) {
    const imgSrc = person.image_url ? person.image_url : (typeof getAssetUrl === 'function' ? getAssetUrl(person.image) : person.image);
    imgSrcHtml = `
      <div style="margin-top: 25px; display: flex; justify-content: center; align-items: flex-start;">
        <img src="${imgSrc}" style="max-width: 100%; max-height: 200px; object-fit: contain; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);" onerror="this.parentElement.style.display='none'">
      </div>
    `;
  }

  let basicBio = '';
  if (person.bio) {
    basicBio = `<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;">${person.bio}</div>`;
  } else if (person.significance) {
    basicBio = `<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;"><strong>Significance:</strong> ${person.significance}`;
    if (person.achievements && Array.isArray(person.achievements) && person.achievements.length > 0) {
      basicBio += `<br><br><strong>Achievements:</strong><ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 0;"><li>${person.achievements.join('</li><li>')}</li></ul>`;
    }
    basicBio += `</div>`;
  }

  let backHtml = '';
  if (hasBackData) {
    backHtml = `<div style="flex: 1.5; min-width: 350px; display: flex; flex-direction: column; gap: 15px; justify-content: center;">`;
    if (person.actions) {
      backHtml += `
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; padding: 10px; border-radius: 4px;">
          <strong style="color: #3b82f6; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Core Actions</strong>
          <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${person.actions}</span>
        </div>`;
    }
    if (person.achievements && !Array.isArray(person.achievements)) {
      backHtml += `
        <div style="background: rgba(34, 197, 94, 0.1); border-left: 3px solid #22c55e; padding: 10px; border-radius: 4px;">
          <strong style="color: #22c55e; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Impact / Achievements</strong>
          <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${person.achievements}</span>
        </div>`;
    }
    if (person.limitations) {
      backHtml += `
        <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; border-radius: 4px;">
          <strong style="color: #ef4444; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Structural Limitations</strong>
          <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${person.limitations}</span>
        </div>`;
    }
    backHtml += `</div>`;
  }

  let lifespanHtml = person.lifespan ? `<p style="font-size: 0.85rem; color: var(--text-muted); margin-top: -5px; margin-bottom: 10px;">${person.lifespan}</p>` : '';

  return `
    <div style="display: flex; flex-wrap: wrap; gap: 40px; align-items: stretch; background: var(--bg-card); padding: 25px; border-radius: 12px; border: 1px solid var(--border-glass);">
      <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column;">
        <h3 style="margin: 0 0 5px 0; color: var(--primary); font-family: var(--font-heading); font-size: 1.5rem;">${person.name}</h3>
        ${lifespanHtml}
        <p style="margin: 0 0 15px 0; color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">${person.role || ''}</p>
        ${basicBio}
        ${imgSrcHtml}
      </div>
      ${backHtml}
    </div>
  `;
}

export function generateKeyIndividualCardHTML(person) {
  const hasBackData = person.actions || (person.achievements && !Array.isArray(person.achievements)) || person.limitations;
  
  let frontImgHtml = '';
  if (person.image || person.image_url) {
    const imgSrc = person.image_url ? person.image_url : (typeof getAssetUrl === 'function' ? getAssetUrl(person.image) : person.image);
    frontImgHtml = `
      <div style="width: 100%; height: 280px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden;">
        <img src="${imgSrc}" style="width: 100%; height: 100%; object-fit: contain;" onerror="this.parentElement.style.display='none'">
      </div>
    `;
  }

  let basicBio = '';
  if (person.bio) {
    basicBio = `<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;">${person.bio}</div>`;
  } else if (person.significance) {
    basicBio = `<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;"><strong>Significance:</strong> ${person.significance}`;
    if (person.achievements && Array.isArray(person.achievements) && person.achievements.length > 0) {
      basicBio += `<br><br><strong>Achievements:</strong><ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 0;"><li>${person.achievements.join('</li><li>')}</li></ul>`;
    }
    basicBio += `</div>`;
  }

  let backHtml = '';
  if (hasBackData) {
    backHtml = `
      <h3 style="margin: 0 0 15px 0; color: var(--primary); font-family: var(--font-heading); text-align: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 10px;">${person.name}</h3>
    `;
    if (person.actions) {
      backHtml += `
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
          <strong style="color: #3b82f6; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Core Actions</strong>
          <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${person.actions}</span>
        </div>`;
    }
    if (person.achievements && !Array.isArray(person.achievements)) {
      backHtml += `
        <div style="background: rgba(34, 197, 94, 0.1); border-left: 3px solid #22c55e; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
          <strong style="color: #22c55e; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Impact / Achievements</strong>
          <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${person.achievements}</span>
        </div>`;
    }
    if (person.limitations) {
      backHtml += `
        <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
          <strong style="color: #ef4444; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Structural Limitations</strong>
          <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${person.limitations}</span>
        </div>`;
    }
    
    backHtml += `<div style="text-align: center; margin-top: auto; padding-top: 15px; font-size: 0.8rem; color: var(--text-muted);"><i class="fas fa-undo"></i> Tap to flip back</div>`;
  }

  let lifespanHtml = person.lifespan ? `<p style="font-size: 0.85rem; color: var(--text-muted); margin-top: -10px; margin-bottom: 10px;">${person.lifespan}</p>` : '';

  const onclickAttr = hasBackData ? `onclick="this.classList.toggle('flipped')"` : '';

  return `
    <div class="person-card" ${onclickAttr} style="height: 100%;">
      <div class="card-inner">
        <div class="card-front">
          ${frontImgHtml}
          <div style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
            <h3 style="margin: 0 0 5px 0; color: var(--primary); font-family: var(--font-heading);">${person.name}</h3>
            ${lifespanHtml}
            <p style="margin: 0 0 15px 0; color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">${person.role || ''}</p>
            ${basicBio}
            ${hasBackData ? `<div style="text-align: center; margin-top: auto; padding-top: 15px; font-size: 0.85rem; color: #10b981; font-weight: bold;"><i class="fas fa-sync-alt" style="margin-right: 5px;"></i> Tap for Exam Breakdown</div>` : ''}
          </div>
        </div>
        ${hasBackData ? `<div class="card-back">${backHtml}</div>` : ''}
      </div>
    </div>
  `;
}

export function initKeyIndividualsTask(container, keyIndividualsData) {
  if (!keyIndividualsData || keyIndividualsData.length === 0) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'key-individuals-wrapper fade-in';
  wrapper.style.padding = '20px';
  wrapper.style.maxWidth = '1200px';
  wrapper.style.margin = '0 auto';

  const header = document.createElement('div');
  header.style.textAlign = 'center';
  header.style.marginBottom = '40px';
  header.innerHTML = `
    <h1 style="font-family: var(--font-heading); color: var(--primary); margin-bottom: 10px; font-size: 2.5rem;">Key Individuals</h1>
    <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">Profiles of the major historical figures who shaped these events.</p>
  `;
  wrapper.appendChild(header);

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
  grid.style.gap = '25px';
  grid.style.alignItems = 'stretch';

  // Pre-inject the flip-card styles into the document
  let style = document.getElementById('flip-card-styles');
  if (!style) {
    style = document.createElement('style');
    style.id = 'flip-card-styles';
    document.head.appendChild(style);
  }
  style.innerHTML = `
    .person-card {
      background: transparent;
      cursor: pointer;
    }
    .card-inner {
      position: relative;
      height: 100%;
      perspective: 1000px;
    }
    .person-card:hover:not(.flipped) .card-inner {
      transform: translateY(-5px);
      -webkit-transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
    .card-front, .card-back {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
      -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
      background: var(--bg-card, rgba(255, 255, 255, 0.05));
      border: 1px solid var(--border-glass);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
    }
    .card-front {
      position: relative;
      transform: rotateY(0deg);
      -webkit-transform: rotateY(0deg);
      height: 100%;
    }
    .card-back {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: rotateY(180deg);
      -webkit-transform: rotateY(180deg);
      padding: 20px;
      overflow-y: auto;
      box-sizing: border-box;
    }
    .person-card.flipped .card-front {
      transform: rotateY(-180deg);
      -webkit-transform: rotateY(-180deg);
    }
    .person-card.flipped .card-back {
      transform: rotateY(0deg);
      -webkit-transform: rotateY(0deg);
    }
  `;

  let gridHtml = '';
  keyIndividualsData.forEach(person => {
    gridHtml += generateKeyIndividualCardHTML(person);
  });
  grid.innerHTML = gridHtml;

  wrapper.appendChild(grid);
  container.appendChild(wrapper);
}

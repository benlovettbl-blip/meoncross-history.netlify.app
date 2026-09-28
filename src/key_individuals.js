import { getAssetUrl } from './engine/assets.js';

export function generateKeyIndividualEmbedHTML(person) {
  let imgSrcHtml = '';
  if (person.image || person.image_url) {
    const imgSrc = person.image_url
      ? person.image_url
      : typeof getAssetUrl === 'function'
        ? getAssetUrl(person.image)
        : person.image;
    imgSrcHtml = `
      <div style="flex-shrink: 0; width: 84px; height: 96px; border-radius: 6px; overflow: hidden; background: #ffffff; border: 1.5px solid #cbd5e1; box-shadow: 0 2px 5px rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: center;">
        <img src="${imgSrc}" loading="lazy" alt="${person.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.parentElement.style.display='none'">
      </div>
    `;
  }

  let actionsList = '';
  if (person.strategic_actions) {
    const items = Array.isArray(person.strategic_actions)
      ? person.strategic_actions
      : [person.strategic_actions];
    actionsList = `<ul style="margin: 0; padding-left: 18px; font-size: 0.88rem; color: #1e293b; line-height: 1.5;">${items.map((a) => `<li style="margin-bottom: 4px;">${a}</li>`).join('')}</ul>`;
  } else if (person.actions) {
    actionsList = `<div style="font-size: 0.88rem; color: #1e293b; line-height: 1.5;">${person.actions}</div>`;
  }

  let achievementsList = '';
  if (person.achievements) {
    const items = Array.isArray(person.achievements) ? person.achievements : [person.achievements];
    achievementsList = `<ul style="margin: 0; padding-left: 18px; font-size: 0.88rem; color: #15803d; line-height: 1.5;">${items.map((a) => `<li style="margin-bottom: 4px;">${a}</li>`).join('')}</ul>`;
  }

  return `
    <div class="key-individual-dossier-card" style="background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 5px solid #1e40af; border-radius: 8px; padding: 16px 20px; margin: 18px 0; box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);">
      <div style="display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
        ${imgSrcHtml}
        <div style="flex: 1; min-width: 240px;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px;">
            <span class="archival-meta-tag accent-blue" style="font-size: 0.68rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #1e40af; background: #eff6ff; padding: 2px 7px; border-radius: 3px; border: 1px solid #bfdbfe;">
              Historical Figure Dossier
            </span>
            ${person.lifespan ? `<span style="font-size: 0.8rem; color: #64748b; font-weight: 600;">(${person.lifespan})</span>` : ''}
          </div>
          <h3 style="margin: 0; color: #0f172a; font-family: 'Playfair Display', Georgia, serif; font-size: 1.25rem; font-weight: 700; line-height: 1.3;">
            ${person.name}
          </h3>
          ${person.role ? `<div style="font-size: 0.85rem; color: #475569; font-weight: 600; margin-top: 2px;">${person.role}</div>` : ''}
          ${
            person.significance || person.bio
              ? `
            <div style="margin-top: 8px; font-size: 0.9rem; color: #334155; line-height: 1.5; background: #f8fafc; border-left: 3px solid #3b82f6; padding: 8px 12px; border-radius: 0 4px 4px 0;">
              <strong>Historical Significance:</strong> ${person.significance || person.bio}
            </div>
          `
              : ''
          }
        </div>
      </div>
      ${
        actionsList
          ? `
        <div style="margin-top: 12px; padding-top: 10px; border-top: 1px dashed #e2e8f0;">
          <strong style="color: #1e40af; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">
            Key Strategic Decisions &amp; Actions:
          </strong>
          ${actionsList}
        </div>
      `
          : ''
      }
      ${
        achievementsList
          ? `
        <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed #e2e8f0;">
          <strong style="color: #15803d; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">
            Impact &amp; Achievements:
          </strong>
          ${achievementsList}
        </div>
      `
          : ''
      }
    </div>
  `;
}

export function generateKeyIndividualCardHTML(person) {
  // FORCE hasBackData to always be true so every card flips, even if empty
  const hasBackData = true;

  let frontImgHtml = '';
  if (person.image || person.image_url) {
    const imgSrc = person.image_url
      ? person.image_url
      : typeof getAssetUrl === 'function'
        ? getAssetUrl(person.image)
        : person.image;
    frontImgHtml = `<div style="width: 100%; height: 280px; background: var(--bg-card, #f8fafc); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden;">
      <img src="${imgSrc}" style="max-width: 100%; max-height: 100%; object-fit: contain; mix-blend-mode: multiply;" onerror="this.src='/images/placeholder_portrait.jpg'">
    </div>`;
  } else {
    frontImgHtml = `<div style="width: 100%; height: 280px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden; flex-direction: column; color: var(--text-muted);">
      <i class="fa-solid fa-user" style="font-size: 4rem; opacity: 0.2;"></i>
    </div>`;
  }

  let basicBio = '';
  if (person.bio) {
    basicBio = `<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;">${person.bio}</div>`;
  } else if (person.significance) {
    basicBio = `<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;"><strong>Significance:</strong> ${person.significance}</div>`;
  }

  let backHtml = `
    <h3 style="margin: 0 0 15px 0; color: var(--primary); font-family: var(--font-heading); text-align: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 10px;">${person.name}</h3>
  `;

  let hasDetailedContent = false;

  if (person.actions) {
    hasDetailedContent = true;
    backHtml += `
      <div style="background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
        <strong style="color: #3b82f6; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Core Actions</strong>
        <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${person.actions}</span>
      </div>`;
  }
  if (person.strategic_actions) {
    hasDetailedContent = true;
    const actionsList = Array.isArray(person.strategic_actions)
      ? `<ul style="margin-top: 5px; padding-left: 18px; margin-bottom: 0;"><li>${person.strategic_actions.join('</li><li>')}</li></ul>`
      : person.strategic_actions;
    backHtml += `
      <div style="background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
        <strong style="color: #3b82f6; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Strategic Decisions &amp; Actions</strong>
        <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${actionsList}</span>
      </div>`;
  }
  if (person.achievements) {
    hasDetailedContent = true;
    const achievementsList = Array.isArray(person.achievements)
      ? `<ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 0;"><li>${person.achievements.join('</li><li>')}</li></ul>`
      : person.achievements;
    backHtml += `
      <div style="background: rgba(34, 197, 94, 0.1); border-left: 3px solid #22c55e; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
        <strong style="color: #22c55e; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Impact / Achievements</strong>
        <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${achievementsList}</span>
      </div>`;
  }
  if (person.limitations) {
    hasDetailedContent = true;
    backHtml += `
      <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
        <strong style="color: #ef4444; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Structural Limitations</strong>
        <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${person.limitations}</span>
      </div>`;
  }

  if (person.quotes) {
    hasDetailedContent = true;
    let quotesHtml = Array.isArray(person.quotes)
      ? person.quotes.map((q) => `&ldquo;${q}&rdquo;`).join('<br><br>')
      : `&ldquo;${person.quotes}&rdquo;`;
    backHtml += `
      <div style="background: rgba(168, 85, 247, 0.1); border-left: 3px solid #a855f7; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
        <strong style="color: #a855f7; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Key Quotes</strong>
        <span style="font-size: 0.9rem; color: var(--text-main); display: block; font-style: italic;">${quotesHtml}</span>
      </div>`;
  }

  if (!hasDetailedContent) {
    backHtml += `<div style="padding: 20px; text-align: center; color: var(--text-muted); font-style: italic; background: rgba(0,0,0,0.02); border-radius: 8px;">Detailed revision notes for this individual are currently being compiled. Check back soon!</div>`;
  }

  backHtml += `<div style="text-align: center; margin-top: auto; padding-top: 15px; font-size: 0.8rem; color: var(--text-muted);"><i class="fas fa-undo"></i> Tap to flip back</div>`;

  let lifespanHtml = person.lifespan
    ? `<p style="font-size: 0.85rem; color: var(--text-muted); margin-top: -10px; margin-bottom: 10px;">${person.lifespan}</p>`
    : '';

  const onclickAttr = `onclick="this.classList.toggle('flipped')"`;

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
            <div style="text-align: center; margin-top: auto; padding-top: 15px; font-size: 0.85rem; color: #10b981; font-weight: bold;"><i class="fas fa-sync-alt" style="margin-right: 5px;"></i> Tap for Details</div>
          </div>
        </div>
        <div class="card-back">${backHtml}</div>
      </div>
    </div>
  `;
}

export function initKeyIndividualsTask(
  container,
  keyIndividualsData,
  customTitle,
  customDescription,
) {
  if (!keyIndividualsData || keyIndividualsData.length === 0) return;

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

    /* Premium Banner Styles */
    .premium-banner {
      position: relative; overflow: hidden; border-radius: 12px; padding: 25px 30px; margin-top: 30px; margin-bottom: 20px; 
      box-shadow: 0 10px 25px -10px rgba(0,0,0,0.4); display: flex; flex-direction: column; align-items: flex-start; gap: 8px; 
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: default;
    }
    .premium-banner:hover {
      transform: scale(1.01) translateY(-3px);
      box-shadow: 0 15px 30px -10px rgba(0,0,0,0.5);
    }
    .premium-banner-bg {
      position: absolute; top: -5%; left: -5%; width: 110%; height: 110%; 
      background-position: center; background-size: cover; 
      z-index: 1; filter: brightness(0.9); transition: transform 0.8s ease;
    }
    .premium-banner:hover .premium-banner-bg {
      transform: scale(1.03);
    }
    .premium-banner-overlay-1 {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
      background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%); z-index: 2;
    }
    .premium-banner-overlay-2 {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
      opacity: 0.45; mix-blend-mode: multiply; z-index: 3;
    }
    .premium-banner-glow {
      position: absolute; bottom: -50px; right: -50px; width: 300px; height: 300px; 
      filter: blur(40px); z-index: 3; opacity: 0.6; border-radius: 50%;
    }
    .premium-banner-content {
      position: relative; z-index: 4; padding-left: 20px;
    }
    .premium-banner-title {
      margin: 0; color: #ffffff; font-size: 2rem; font-weight: 700; 
      font-family: 'Playfair Display', serif; text-shadow: 0px 4px 12px rgba(0,0,0,0.8); letter-spacing: -0.5px;
    }
    .premium-banner-enquiry {
      margin: 8px 0 0 0; color: #f8fafc; font-size: 1.05rem; font-style: italic; 
      max-width: 800px; font-weight: 300; text-shadow: 0px 2px 8px rgba(0,0,0,0.8);
    }
  `;

  const wrapper = document.createElement('div');
  wrapper.className = 'key-individuals-wrapper fade-in';
  wrapper.style.padding = '20px';
  wrapper.style.maxWidth = '1200px';
  wrapper.style.margin = '0 auto';

  const header = document.createElement('div');
  header.style.textAlign = 'center';
  header.style.marginBottom = '40px';
  const title = customTitle || 'Key Individuals';
  const desc =
    customDescription || 'Profiles of the major historical figures who shaped these events.';
  header.innerHTML = `
    <h1 style="font-family: var(--font-heading); color: var(--primary); margin-bottom: 10px; font-size: 2.5rem;">${title}</h1>
    <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">${desc}</p>
  `;
  wrapper.appendChild(header);

  let grouped = false;
  if (keyIndividualsData.length > 0 && keyIndividualsData[0].group) {
    grouped = true;
  }

  const bannerMap = {
    'Key Topic 1': {
      title: 'Key Topic 1: The Weimar Republic (1918-29)',
      image: 'images/weimar_kt1_cover.jpg',
      gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
      border: '#3b82f6',
      enquiry: 'To what extent did the Weimar Republic recover from its early crises?',
    },
    'Key Topic 2': {
      title: "Key Topic 2: Hitler's Rise to Power, 1919-33",
      image: 'images/weimar_kt2_cover.jpg',
      gradient: 'linear-gradient(135deg, #7f1d1d, #dc2626)',
      border: '#dc2626',
      enquiry: 'How did a tiny obscure political group transform?',
    },
    'Key Topic 3': {
      title: 'Key Topic 3: Nazi Control and Dictatorship',
      image: 'images/weimar_kt3_cover.jpg',
      gradient: 'linear-gradient(135deg, #4b5563, #1f2937)',
      border: '#1f2937',
      enquiry: 'From chains to absolute control',
    },
    'Key Topic 4': {
      title: 'Key Topic 4: Life in Nazi Germany, 1933-39',
      image: 'images/weimar_kt4_cover.jpg',
      gradient: 'linear-gradient(135deg, #4d7c0f, #65a30d)',
      border: '#65a30d',
      enquiry: 'Did life improve under the Nazis?',
    },
  };

  if (grouped) {
    let currentGroup = '';
    let htmlContent = '';
    let isFirstGroup = true;

    keyIndividualsData.forEach((person) => {
      if (person.group !== currentGroup) {
        if (!isFirstGroup) {
          htmlContent += '</div>'; // Close previous grid
        }
        isFirstGroup = false;
        currentGroup = person.group;

        // Add Banner
        const bannerData = bannerMap[currentGroup];
        if (bannerData) {
          const bannerUrl =
            typeof getAssetUrl === 'function'
              ? getAssetUrl('/' + bannerData.image)
              : '/' + bannerData.image;
          htmlContent += `
            <div style="margin-top: 40px; margin-bottom: 25px;">
              <div class="premium-banner" style="position: relative; margin: 0; min-height: 140px;">
                <div class="premium-banner-bg" style="background-image: url('${bannerUrl}'); background-position: center;"></div>
                <div class="premium-banner-overlay-1"></div>
                <div class="premium-banner-overlay-2" style="background: ${bannerData.gradient};"></div>
                <div class="premium-banner-glow" style="background: radial-gradient(circle, ${bannerData.border} 0%, transparent 70%);"></div>
                <div class="premium-banner-content" style="border-left: 6px solid ${bannerData.border};">
                  <h3 class="premium-banner-title">${bannerData.title}</h3>
                  <p class="premium-banner-enquiry">${bannerData.enquiry}</p>
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

      htmlContent += generateKeyIndividualCardHTML(person);
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
    keyIndividualsData.forEach((person) => {
      gridHtml += generateKeyIndividualCardHTML(person);
    });
    grid.innerHTML = gridHtml;
    wrapper.appendChild(grid);
  }
  container.appendChild(wrapper);
}

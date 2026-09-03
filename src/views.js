/**
 * Views Renderer for Mr Lovett's History Hub Mega App
 * Handles rendering the Dashboard, Interactive Quizzes, Timelines, Printable Booklets, and Student Profiles.
 */

import { state } from './state.js';
import { getProfile, setMockUser } from './auth.js';
import { getMasteryStatus, updateLeitnerBox, toggleBookmark, saveProgress } from './storage.js';
import { renderCoverSourcesHTML } from './cover_sources.js';
import { renderKeyTopicLessonsHTML } from './lesson_cards.js';
import { renderLesson } from './engine/lesson_renderer.js';
import { initKeyIndividualsTask } from './key_individuals.js';
import { initGuidedReadingTask } from './guided_reading.js'; // Added for guided reading tab
import { getAssetUrl } from './engine/assets.js';
import './engine/modals.js'; // Side-effect: registers window.renderQuizQuestion, openGallery, etc.

export function getUnits() {
  if (!window.db) return [];
  return Object.keys(window.db).map((k) => ({
    id: k,
    ...window.db[k].data,
  }));
}

export function renderDashboard() {
  const container = document.getElementById('main-content');
  const contentArea = document.getElementById('content-area');
  if (contentArea) contentArea.style.paddingTop = '2rem'; // Restore gap for dashboard
  const profile = getProfile();

  // Calculate general stats
  const totalQuestions = state.allQuestions ? state.allQuestions.length : 0;
  let masteredCount = 0;
  let securedCount = 0;
  const boxes = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  if (state.mastery) {
    Object.values(state.mastery).forEach((entry) => {
      if (entry.status === 'mastered') masteredCount++;
      else if (entry.status === 'secured') securedCount++;
      const b = entry.leitnerBox || 1;
      if (boxes[b] !== undefined) boxes[b]++;
    });
  }

  // Inject compact stats into header
  const headerRight = document.querySelector('.header-right');
  if (headerRight) {
    headerRight.style.flex = '1';
    headerRight.style.display = 'flex';
    headerRight.style.justifyContent = 'space-between';
    headerRight.style.alignItems = 'center';

    headerRight.innerHTML = `
      <div style="font-size: 1.35rem; font-family: 'Playfair Display', serif; font-weight: 800; color: #1e3a8a; display: flex; align-items: center; gap: 12px; margin-left: 20px;">
        <i class="fa-solid fa-graduation-cap" style="color: #3b82f6;"></i>
        Mr Lovett's History Hub
      </div>
      <div style="display: flex; gap: 8px; align-items: center; font-size: 0.85rem; flex-wrap: wrap; justify-content: flex-end;">
        <span style="font-weight: 600; color: #334155; margin-right: 5px;">Welcome back, ${profile ? profile.name : 'Student'}</span>
        <span style="background: #fef3c7; color: #d97706; padding: 3px 8px; border-radius: 6px; font-weight: 700; border: 1px solid #fde68a;"><i class="fa-solid fa-fire"></i> ${state.dailyXp} XP</span>
        <span style="background: #dcfce7; color: #166534; padding: 3px 8px; border-radius: 6px; font-weight: 700; border: 1px solid #bbf7d0;"><i class="fa-solid fa-graduation-cap"></i> ${masteredCount} Mastered</span>
        <span style="background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 6px; font-weight: 700; border: 1px solid #bae6fd;"><i class="fa-solid fa-shield-halved"></i> ${securedCount} Secured</span>
        <!-- Theme Toggle -->
        <div style="position:relative; margin-left:4px;">
          <button id="theme-toggle-btn" title="Change Theme" style="background: rgba(255,255,255,0.9); border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 5px 10px; cursor: pointer; display: flex; align-items: center; gap: 5px; font-size: 0.78rem; font-weight: 600; color: #334155; transition: all 0.2s;" onmouseover="this.style.borderColor='#1e3a8a'" onmouseout="this.style.borderColor='#e2e8f0'">
            <i class="fa-solid fa-palette" style="color:#6366f1;"></i> <span id="theme-toggle-label">Theme</span>
          </button>
          <div id="theme-popover" style="display:none; position:absolute; top:calc(100% + 8px); right:0; background:var(--bg-card, #fff); border:1.5px solid var(--border-glass, #e2e8f0); border-radius:10px; padding:10px 14px; box-shadow:0 8px 24px rgba(0,0,0,0.15); z-index:9999; min-width:180px;">
            <p style="font-size:0.7rem; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:var(--text-primary,#334155); opacity:0.5; margin:0 0 8px;">Choose Theme</p>
            <div style="display:flex; gap:10px; align-items:center;">
              <button class="theme-btn" data-theme="primary" title="History Hub (Default)"><span class="color-dot primary"></span></button>
              <button class="theme-btn" data-theme="desert" title="Sand"><span class="color-dot desert"></span></button>
              <button class="theme-btn" data-theme="space" title="Deep Space"><span class="color-dot space"></span></button>
              <button class="theme-btn" data-theme="coral" title="Coral"><span class="color-dot coral"></span></button>
            </div>
            <div style="margin-top:8px;"><span style="font-size:0.68rem; color:var(--text-primary,#334155); opacity:0.35;">History Hub · Sand · Space · Coral</span></div>
          </div>
        </div>
      </div>
    `;

    // Wire up the injected theme toggle
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themePopover = document.getElementById('theme-popover');
    const themeToggleLabel = document.getElementById('theme-toggle-label');
    const themeNames = {
      primary: 'History Hub',
      desert: 'Sand',
      space: 'Deep Space',
      coral: 'Coral',
    };
    if (themeToggleBtn && themePopover) {
      // Set initial label
      const currentTheme = localStorage.getItem('history_theme') || 'primary';
      if (themeToggleLabel) themeToggleLabel.textContent = themeNames[currentTheme] || 'Theme';
      themeToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themePopover.style.display = themePopover.style.display === 'none' ? 'block' : 'none';
      });
      document.addEventListener('click', (e) => {
        if (!themeToggleBtn.contains(e.target) && !themePopover.contains(e.target)) {
          themePopover.style.display = 'none';
        }
      });
      // Re-bind the theme-btn clicks inside the popover
      themePopover.querySelectorAll('.theme-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const themeName = e.currentTarget.getAttribute('data-theme');
          document.documentElement.setAttribute('data-theme', themeName);
          localStorage.setItem('history_theme', themeName);
          document.querySelectorAll('.theme-btn').forEach((b) => b.classList.remove('active'));
          document
            .querySelectorAll(`.theme-btn[data-theme="${themeName}"]`)
            .forEach((b) => b.classList.add('active'));
          if (themeToggleLabel) themeToggleLabel.textContent = themeNames[themeName] || 'Theme';
          themePopover.style.display = 'none';
        });
      });
    }
  }

  let html = `
    <div style="max-width: 1150px; margin: 0 auto; padding: 0 20px;">
  `;

  const units = getUnits();

  // Year 7 Grouping
  const year7Order = ['water_and_sanitation', 'medieval_england', 'early_modern_world'];
  const year7Units = units
    .filter((u) => year7Order.includes(u.id))
    .sort((a, b) => year7Order.indexOf(a.id) - year7Order.indexOf(b.id));

  // Year 8 Grouping — great_war_part2 follows great_war chronologically
  const year8Order = ['industrialisation_and_empire', 'australia', 'great_war', 'great_war_part2'];
  const year8Units = units
    .filter((u) => year8Order.includes(u.id))
    .sort((a, b) => year8Order.indexOf(a.id) - year8Order.indexOf(b.id));

  // Year 9 Grouping — hide units still under construction; great_war_part2 moved to Year 8
  const underConstructionIds = ['second_world_war', 'the_shoah', 'cold_war', 'post_war_britain'];
  const year9Order = ['the_shoah', 'cold_war', 'second_world_war', 'post_war_britain'];
  const year9Units = units
    .filter((u) => year9Order.includes(u.id) && !underConstructionIds.includes(u.id))
    .sort((a, b) => year9Order.indexOf(a.id) - year9Order.indexOf(b.id));
  // Names of coming-soon units for the strip
  const comingSoonNames = [
    'KS3: The Shoah',
    'KS3: The Cold War',
    'KS3: The Second World War',
    'KS3: Rights, Protest & Post-War Britain',
  ];

  // Year 10 Grouping
  const year10Order = ['cme_new', 'weimar_nazi_germany'];
  const year10Units = units
    .filter((u) => year10Order.includes(u.id))
    .sort((a, b) => year10Order.indexOf(a.id) - year10Order.indexOf(b.id));

  // Year 11 Grouping
  const year11Order = ['edexcel_medicine', 'eee'];
  const year11Units = units
    .filter((u) => year11Order.includes(u.id))
    .sort((a, b) => year11Order.indexOf(a.id) - year11Order.indexOf(b.id));

  // Trips & Tours Grouping
  const tripOrder = ['trip_ypres'];
  const tripUnits = units
    .filter((u) => tripOrder.includes(u.id))
    .sort((a, b) => tripOrder.indexOf(a.id) - tripOrder.indexOf(b.id));

  const renderUnitCard = (unit, index) => {
    const isUnlocked = true; // Unlocked all topics for developer/admin preview
    const icon = unit.icon || 'fa-book-open';
    const color = unit.color || 'var(--primary)';
    const bg = unit.bg || 'var(--border-glass)';
    const title = unit.title || unit.id;
    const desc = unit.desc || unit.enquiry || 'Historical enquiry.';
    const category = unit.category || 'History';
    const yearGroup = unit.yearGroup || 'All';
    const imageUrl = unit.homepage_background || unit.cover_image || '';

    let displayTitle = title;
    let displayDesc = unit.enquiry_question || desc;

    if (title.includes('KS3:') || unit.enquiry_question) {
      displayTitle = unit.enquiry_question || desc;
      displayDesc = title;
    }

    // cover_image_position: pulled from unit data first, then a per-unit fallback map
    const positionFallbacks = {
      edexcel_medicine: 'center 10%',
      eee: 'center 10%',
      australia: 'center 70%',
      great_war_part2: 'center top',
      weimar_nazi_germany: 'center 20%',
    };
    const bgPos = unit.cover_image_position || positionFallbacks[unit.id] || 'center';

    const gcseUnitIds = ['cme_new', 'weimar_nazi_germany', 'edexcel_medicine', 'eee'];
    const isGcse = gcseUnitIds.includes(unit.id);
    const gcseBadge = isGcse
      ? `<span style="position:absolute; top:10px; left:10px; z-index:10; background:#f59e0b; color:#fff; font-size:0.65rem; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; padding:3px 9px; border-radius:20px; box-shadow:0 2px 6px rgba(0,0,0,0.25);">GCSE</span>`
      : '';

    // Derive a short, friendly label for the CTA button
    const unitShortNames = {
      water_and_sanitation: 'Water & Sanitation',
      medieval_england: 'Medieval England',
      early_modern_world: 'Early Modern World',
      industrialisation_and_empire: 'Industrialisation',
      australia: 'Australia',
      great_war: 'Great War Causes',
      great_war_part2: 'The Great War',
      the_shoah: 'The Shoah',
      cold_war: 'The Cold War',
      second_world_war: 'The Second World War',
      post_war_britain: 'Post-War Britain',
      cme_new: 'Middle East',
      weimar_nazi_germany: 'Weimar & Nazi Germany',
      edexcel_medicine: 'Medicine Through Time',
      eee: 'Elizabethan England',
    };
    const ctaLabel = unitShortNames[unit.id] || title;

    html += `
      <div class="module-card ${isUnlocked ? '' : 'locked'}" style="animation-delay: ${index * 0.1}s; cursor: pointer; position: relative;" data-action="launch-subapp" data-unit="${unit.id}">
        ${gcseBadge}
        ${imageUrl ? `<div class="module-card-img" style="background-image: url('${imageUrl}'); background-position: ${bgPos}; background-size: cover;"></div>` : `<div class="module-card-img" style="background: var(--primary);"></div>`}
        <div style="position: relative; z-index: 2; padding: 0; flex-grow: 1; display: flex; flex-direction: column;">
          <div class="module-header" style="margin-bottom: 8px;">
          </div>
          <div style="display: flex; gap: 14px; align-items: flex-start; flex-grow: 1;">
            <div style="flex-grow: 1; min-width: 0;">
              <h4 style="margin: 0 0 4px 0; font-size: 0.95rem; font-weight: 600; line-height: 1.25; color: inherit; font-family: 'Playfair Display', serif;">${displayTitle}</h4>
              <p style="margin: 0; font-size: 0.8rem; line-height: 1.4; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; opacity: 0.9;">${displayDesc}</p>
            </div>
          </div>
        </div>
        
        <div class="module-actions" style="margin-top: auto; padding: 0; position: relative; z-index: 2;">
          <button class="btn-pedagogy-primary btn-pedagogy-sm w-full" data-action="launch-subapp" data-unit="${unit.id}" style="display: flex; align-items: center; justify-content: center; gap: 6px; padding-left: 8px; padding-right: 8px;">
            <i class="fa-solid fa-circle-play" style="flex-shrink: 0;"></i> 
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${ctaLabel}</span>
          </button>
        </div>
      </div>
    `;
  };

  // ── Year-jump quick-nav strip ──────────────────────────────────────────
  html += `
    <nav aria-label="Jump to year group" style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 1.5rem;">
      <a href="#year7-section"  style="text-decoration:none; padding: 6px 18px; border-radius: 20px; font-size: 0.875rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; border: 1.5px solid #bfdbfe; transition: all 0.2s;" onmouseover="this.style.background='#1d4ed8';this.style.color='#fff'" onmouseout="this.style.background='#eff6ff';this.style.color='#1d4ed8'">Year 7</a>
      <a href="#year8-section"  style="text-decoration:none; padding: 6px 18px; border-radius: 20px; font-size: 0.875rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; border: 1.5px solid #bfdbfe; transition: all 0.2s;" onmouseover="this.style.background='#1d4ed8';this.style.color='#fff'" onmouseout="this.style.background='#eff6ff';this.style.color='#1d4ed8'">Year 8</a>
      <a href="#year9-section"  style="text-decoration:none; padding: 6px 18px; border-radius: 20px; font-size: 0.875rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; border: 1.5px solid #bfdbfe; transition: all 0.2s;" onmouseover="this.style.background='#1d4ed8';this.style.color='#fff'" onmouseout="this.style.background='#eff6ff';this.style.color='#1d4ed8'">Year 9</a>
      <a href="#year10-section" style="text-decoration:none; padding: 6px 18px; border-radius: 20px; font-size: 0.875rem; font-weight: 700; background: #fef3c7; color: #92400e; border: 1.5px solid #fde68a; transition: all 0.2s;" onmouseover="this.style.background='#92400e';this.style.color='#fff'" onmouseout="this.style.background='#fef3c7';this.style.color='#92400e'">Year 10 — GCSE</a>
      <a href="#year11-section" style="text-decoration:none; padding: 6px 18px; border-radius: 20px; font-size: 0.875rem; font-weight: 700; background: #fef3c7; color: #92400e; border: 1.5px solid #fde68a; transition: all 0.2s;" onmouseover="this.style.background='#92400e';this.style.color='#fff'" onmouseout="this.style.background='#fef3c7';this.style.color='#92400e'">Year 11 — GCSE</a>
    </nav>
  `;

  if (tripUnits.length > 0) {
    tripUnits.forEach((unit, index) => {
      const imageUrl =
        unit.homepage_background || unit.cover_image || 'images/stubbington_memorial.jpg';
      const title = 'Featured Battlefield Tour: Ypres & The Salient';

      html += `
        <div class="featured-trip-banner" style="display: flex; flex-wrap: wrap; width: 100%; margin-top: 0; margin-bottom: 2rem; background: var(--bg-card, #ffffff); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid var(--border-glass, #e2e8f0); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="flex: 3; min-width: 260px; padding: 22px 32px; display: flex; flex-direction: column; justify-content: center;">
            <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:10px;">
              <h2 style="font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--primary, #1e3a8a); margin: 0; line-height: 1.2;">${title}</h2>
              <span style="background: rgba(59,130,246,0.1); color: #2563eb; padding: 3px 10px; border-radius: 20px; font-weight: 600; font-size: 0.8rem; white-space:nowrap;"><i class="fa-solid fa-calendar-days"></i> 1st–4th Oct 2026</span>
            </div>
            <div style="display: flex; gap: 10px; align-items:center; flex-wrap: wrap;">
              <span style="background: rgba(16,185,129,0.1); color: #059669; padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 0.8rem;"><i class="fa-solid fa-map-location-dot"></i> Itinerary</span>
              <span style="background: rgba(245,158,11,0.1); color: #d97706; padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 0.8rem;"><i class="fa-solid fa-suitcase-rolling"></i> Prep Pack</span>
              <span style="background: rgba(139,92,246,0.1); color: #7c3aed; padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 0.8rem;"><i class="fa-solid fa-book-open-reader"></i> Site Guide</span>
              <button class="btn-pedagogy-primary" style="padding: 8px 20px; font-size: 0.95rem; border-radius: 6px; font-weight: 600; cursor: pointer; border: none; background: #2563eb; color: white; margin-left:auto;" data-action="launch-subapp" data-unit="${unit.id}" onmouseover="this.style.background='#1d4ed8'" onmouseout="this.style.background='#2563eb'">
                <i class="fa-solid fa-compass" style="margin-right: 6px;"></i> Launch Tour App
              </button>
            </div>
          </div>
          <div style="flex: 1; min-width: 200px; min-height: 130px; max-height: 160px; background-image: url('${imageUrl}'); background-position: center; background-size: cover; border-left: 3px solid var(--primary, #1e3a8a);"></div>
        </div>
      `;
    });
  }

  if (year7Units.length > 0) {
    html += `
      <h3 class="section-title" id="year7-section">Year 7</h3>
      <div class="modules-grid" style="margin-bottom: 2rem;">
    `;
    year7Units.forEach(renderUnitCard);
    html += `</div>`;
  }

  if (year8Units.length > 0) {
    html += `
      <h3 class="section-title" id="year8-section">Year 8</h3>
      <div class="modules-grid" style="margin-bottom: 2rem;">
    `;
    year8Units.forEach(renderUnitCard);
    html += `</div>`;
  }

  html += `<h3 class="section-title" id="year9-section">Year 9</h3>`;

  if (year9Units.length > 0) {
    html += `<div class="modules-grid" style="margin-bottom: 1rem;">`;
    year9Units.forEach(renderUnitCard);
    html += `</div>`;
  }

  // Coming-soon strip for Year 9 units still in development
  if (comingSoonNames.length > 0) {
    const pills = comingSoonNames
      .map(
        (name) =>
          `<span style="background:#f1f5f9;border:1px solid #e2e8f0;color:#64748b;padding:4px 12px;border-radius:20px;font-size:0.8rem;font-weight:600;white-space:nowrap;"><i class="fa-solid fa-hammer" style="margin-right:5px;color:#94a3b8;"></i>${name}</span>`,
      )
      .join('');
    html += `
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:14px 18px;background:#f8fafc;border:1.5px dashed #cbd5e1;border-radius:10px;margin-bottom:2rem;">
        <span style="font-size:0.8rem;font-weight:700;color:#94a3b8;white-space:nowrap;"><i class="fa-solid fa-circle-info"></i> Coming Soon:</span>
        ${pills}
      </div>
    `;
  }

  if (year10Units.length > 0) {
    html += `
      <h3 class="section-title" id="year10-section">Year 10 <span style="font-size:0.7em;font-weight:600;background:#fef3c7;color:#92400e;padding:2px 10px;border-radius:12px;vertical-align:middle;margin-left:8px;">GCSE</span></h3>
      <div class="modules-grid" style="margin-bottom: 2rem;">
    `;
    year10Units.forEach(renderUnitCard);
    html += `</div>`;
  }

  if (year11Units.length > 0) {
    html += `
      <h3 class="section-title" id="year11-section">Year 11 <span style="font-size:0.7em;font-weight:600;background:#fef3c7;color:#92400e;padding:2px 10px;border-radius:12px;vertical-align:middle;margin-left:8px;">GCSE</span></h3>
      <div class="modules-grid">
    `;
    year11Units.forEach(renderUnitCard);

    // Legacy USA App Card
    html += `
      <div class="module-card" style="animation-delay: 0.5s; cursor: pointer;" data-action="open-link" data-url="https://edexcelgcsehistoryusa.netlify.app/">
        <div class="module-card-img" style="background-image: url('/images/mlk_washington.jpg'); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.2); font-size: 4rem;">
            <i class="fa-solid fa-flag-usa"></i>
        </div>
        <div style="position: relative; z-index: 2; padding: 0; flex-grow: 1; display: flex; flex-direction: column;">
          <div class="module-header" style="margin-bottom: 8px;">
          </div>
          <div style="display: flex; gap: 14px; align-items: flex-start; flex-grow: 1;">
            <div style="flex-grow: 1; min-width: 0;">
              <h4 style="margin: 0 0 4px 0; font-size: 0.95rem; font-weight: 600; line-height: 1.25; color: inherit; font-family: 'Playfair Display', serif;">USA 1954–75 (Legacy App)</h4>
              <p style="margin: 0; font-size: 0.8rem; line-height: 1.4; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; opacity: 0.9;">Conflict at Home and Abroad (Legacy access for current Year 11s)</p>
            </div>
          </div>
        </div>
        
        <div class="module-actions" style="margin-top: auto; padding: 0; position: relative; z-index: 2;">
          <button class="btn-pedagogy-primary btn-pedagogy-sm w-full" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
            <i class="fa-solid fa-external-link-alt"></i> Open Legacy App
          </button>
        </div>
      </div>
    `;

    html += `</div>`;
  }
  html += `</div>`;
  container.innerHTML = html;
}

export function renderProfileView() {
  const container = document.getElementById('main-content');
  const profile = getProfile();

  const totalQuestions = state.allQuestions ? state.allQuestions.length : 0;
  const boxes = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  if (state.mastery) {
    Object.values(state.mastery).forEach((entry) => {
      const b = entry.leitnerBox || 1;
      if (boxes[b] !== undefined) boxes[b]++;
    });
  }

  container.innerHTML = `
    <div class="card max-w-md mx-auto" style="margin-bottom: 2rem;">
      <h3><i class="fa-solid fa-user-circle"></i> Microsoft SSO Student Profile</h3>
      <p class="text-muted">Simulated tenant environment: <strong>history-app.local</strong></p>
      
      <div class="profile-details">
        <div class="form-group">
          <label>Microsoft Account Email</label>
          <input type="text" class="form-control" value="${profile ? profile.username : ''}" disabled />
        </div>
        <div class="form-group">
          <label>Display Name</label>
          <input type="text" class="form-control" value="${profile ? profile.name : ''}" disabled />
        </div>
        <div class="form-group">
          <label>Assigned Year Group unit authorization</label>
          <select id="profile-year-group" class="form-control" onchange="window.updateProfileYearGroup(this.value)">
            <option value="Year 7" ${profile && profile.yearGroup === 'Year 7' ? 'selected' : ''}>Year 7 (Norman Conquest)</option>
            <option value="Year 8" ${profile && profile.yearGroup === 'Year 8' ? 'selected' : ''}>Year 8 (Changes 1450-1750)</option>
            <option value="Year 9" ${profile && profile.yearGroup === 'Year 9' ? 'selected' : ''}>Year 9 (Great War)</option>
            <option value="GCSE" ${profile && profile.yearGroup === 'GCSE' ? 'selected' : ''}>GCSE (USA 1954-1975)</option>
            <option value="Admin" ${profile && profile.yearGroup === 'Admin' ? 'selected' : ''}>Admin (Unlock All Modules)</option>
          </select>
        </div>
      </div>
      
      <div style="margin-top: 24px;">
        <button class="btn btn-secondary w-full" data-action="switch-view" data-view="dashboard">Save and Return</button>
      </div>
    </div>

    <!-- Leitner Box spaced repetition distribution -->
    <div class="card leitner-card max-w-md mx-auto">
      <h3><i class="fa-solid fa-brain"></i> Memory Spaced Repetition Distribution</h3>
      <div class="leitner-distribution">
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 1 (New)</span>
          <div class="bar-container"><div class="bar-fill bg-danger" style="width: ${totalQuestions ? (boxes[1] / totalQuestions) * 100 : 0}%"></div></div>
          <span class="bar-count">${boxes[1]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 2 (Learning)</span>
          <div class="bar-container"><div class="bar-fill bg-warning" style="width: ${totalQuestions ? (boxes[2] / totalQuestions) * 100 : 0}%"></div></div>
          <span class="bar-count">${boxes[2]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 3 (Securing)</span>
          <div class="bar-container"><div class="bar-fill bg-info" style="width: ${totalQuestions ? (boxes[3] / totalQuestions) * 100 : 0}%"></div></div>
          <span class="bar-count">${boxes[3]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 4 (Retained)</span>
          <div class="bar-container"><div class="bar-fill bg-primary" style="width: ${totalQuestions ? (boxes[4] / totalQuestions) * 100 : 0}%"></div></div>
          <span class="bar-count">${boxes[4]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 5 (Mastered)</span>
          <div class="bar-container"><div class="bar-fill bg-success" style="width: ${totalQuestions ? (boxes[5] / totalQuestions) * 100 : 0}%"></div></div>
          <span class="bar-count">${boxes[5]}</span>
        </div>
      </div>
    </div>
  `;
}

// Global update function bound to window
window.updateProfileYearGroup = function (val) {
  setMockUser(val);
  renderDashboard();
};

window.launchSubApp = function (subAppName) {
  // Show the curtain
  const curtain = document.getElementById('page-curtain');
  if (curtain) {
    curtain.classList.remove('hidden');
  }

  setTimeout(() => {
    if (subAppName === 'gcse_middle_east_1945_1995') {
      window.location.href = '/cme/';
      return;
    }
    if (subAppName === 'gcse_usa_1954_1975') {
      window.location.href = '/usa/';
      return;
    }

    let mappedName = subAppName;
    if (subAppName === 'gcse_middle_east_1945_1995_new') mappedName = 'cme_new';
    if (subAppName === 'gcse_elizabethan_england') mappedName = 'eee';
    if (subAppName === 'great_war_v2') mappedName = 'great_war';

    window.location.href = `/?view=lessons&unit=${mappedName}`;
  }, 350);
};

export function renderInteractiveQuiz() {
  const container = document.getElementById('main-content');
  const data = state.activeUnitData;

  if (!data || !data.quizData || data.quizData.length === 0) {
    container.innerHTML = `
      <div class="card text-center">
        <p>No quiz questions available for this unit.</p>
        <button class="btn-pedagogy-primary" data-action="switch-view" data-view="dashboard">Back to Dashboard</button>
      </div>
    `;
    return;
  }

  // Choose a random question or Leitner review question
  const questions = data.quizData;
  const randomIndex = Math.floor(Math.random() * questions.length);
  const q = questions[randomIndex];

  // Scramble options
  const options = [q.answer, ...q.distractors].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <div class="card max-w-lg mx-auto quiz-container">
      <div class="quiz-header">
        <span class="quiz-badge">Interactive Recall Quiz</span>
        <button class="btn btn-outline btn-sm" data-action="toggle-bookmark" data-id="${q.id}">
          <i class="${state.bookmarks.includes(q.id) ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
        </button>
      </div>
      <h3 class="quiz-question">${q.question}</h3>
      <div class="quiz-options">
        ${options
          .map(
            (opt) => `
          <button class="btn btn-block btn-quiz-opt" data-action="submit-quiz-answer" data-id="${q.id}" data-opt="${opt.replace(/"/g, '&quot;')}">
            ${opt}
          </button>
        `,
          )
          .join('')}
      </div>
      <div id="quiz-feedback" class="quiz-feedback hidden"></div>
      <div style="margin-top: 24px; display: flex; justify-content: space-between;">
        <button class="btn btn-secondary" data-action="switch-view" data-view="dashboard">Exit Quiz</button>
        <button class="btn-pedagogy-primary" data-action="switch-view" data-view="interactive" data-unit="${state.selectedUnitId}">Next Question &rarr;</button>
      </div>
    </div>
  `;
}

window.toggleBookmarkQuestion = function (qid) {
  toggleBookmark(qid);
  renderInteractiveQuiz();
};

window.submitQuizAnswer = function (qid, chosen, btnElement) {
  const data = state.activeUnitData;
  const q = data.quizData.find((item) => item.id === qid);
  if (!q) return;

  const isCorrect = chosen === q.answer;
  updateLeitnerBox(qid, isCorrect);

  // Disable all options
  document.querySelectorAll('.btn-quiz-opt').forEach((btn) => {
    btn.disabled = true;
    if (btn.innerText.trim() === q.answer) {
      btn.classList.add('btn-success');
    } else if (btn === btnElement && !isCorrect) {
      btn.classList.add('btn-danger');
    }
  });

  const feedback = document.getElementById('quiz-feedback');
  feedback.innerHTML = `
    <strong>${isCorrect ? '✅ Correct Answer!' : '❌ Incorrect.'}</strong>
    <p>${q.explanation}</p>
  `;
  feedback.classList.remove('hidden');
};

export function renderTimeline() {
  const container = document.getElementById('main-content');
  const events = state.activeUnitData.timelineEvents;

  if (!events || events.length === 0) {
    container.innerHTML = `
      <div class="card text-center">
        <h3><i class="fa-solid fa-timeline"></i> Timeline</h3>
        <p>No historical events listed in this module's timeline.</p>
        <button class="btn-pedagogy-primary" data-action="switch-view" data-view="dashboard">Back to Dashboard</button>
      </div>
    `;
    return;
  }

  // Sort chronological order
  const sortedEvents = [...events].sort((a, b) => parseInt(a.year, 10) - parseInt(b.year, 10));

  container.innerHTML = `
    <div class="card">
      <h3 style="margin-bottom: 24px;"><i class="fa-solid fa-timeline text-primary"></i> Interactive Chronology Timeline</h3>
      <div class="timeline-wrapper">
        ${sortedEvents
          .map(
            (evt, idx) => `
          <div class="timeline-item ${idx % 2 === 0 ? 'left' : 'right'}">
            <div class="timeline-badge">${evt.year}</div>
            <div class="timeline-panel">
              <h4>${evt.year}</h4>
              <p>${evt.text}</p>
            </div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  `;
}

export async function renderDecisionsView() {
  const container = document.getElementById('main-content');
  const unitId = state.selectedUnitId || 'gcse_usa_1954_1975';

  let decisionsData = [];
  if (unitId === 'gcse_middle_east_1945_1995' || unitId === 'cme_new') {
    const mod = await import('./data/cme/decisions_data.js');
    decisionsData = mod.DECISIONS_DATA;
  } else if (unitId === 'gcse_usa_1954_1975') {
    const mod = await import('./decisions_data.js');
    decisionsData = mod.DECISIONS_DATA;
  }

  if (decisionsData.length === 0) {
    container.innerHTML = `
      <div class="card text-center">
        <h3><i class="fa-solid fa-phone-volume"></i> Decision Simulator</h3>
        <p>No decision scenarios available for this unit.</p>
        <button class="btn-pedagogy-primary" data-action="switch-view" data-view="dashboard">Back to Dashboard</button>
      </div>
    `;
    return;
  }

  window.playDecisionsScenario = function (gameId) {
    const g = decisionsData.find((x) => x.id === gameId);
    if (!g) return;

    container.innerHTML = `
      <div class="card max-w-lg mx-auto quiz-container">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
          <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">Phase 1: Initial Response</span>
          <button class="btn btn-secondary btn-sm" data-action="switch-view" data-view="decisions" data-unit="${unitId}">
            <i class="fa-solid fa-arrow-left"></i> Scenario Menu
          </button>
        </div>

        <h2 style="font-size: 1.4rem; font-weight: 800; margin: 10px 0 0 0;">${g.title}</h2>
        <div style="font-size: 0.9rem; margin-bottom: 14px; font-weight: 600; opacity: 0.8;">Active Role: ${g.role}</div>

        <div style="background-color: var(--bg-app); border: 1px solid var(--border-glass); padding: 18px; border-radius: var(--border-radius-sm); margin-bottom: 20px;">
          <strong>THE CRISIS:</strong><br />
          ${g.crisis}
        </div>

        <div class="quiz-options">
          <button class="btn btn-block btn-quiz-opt" data-action="play-decisions-phase2" data-id="${g.id}" data-choice="A">
            <strong>Choice A:</strong> ${g.phase1.choiceA.text}
          </button>
          <button class="btn btn-block btn-quiz-opt" data-action="play-decisions-phase2" data-id="${g.id}" data-choice="B">
            <strong>Choice B:</strong> ${g.phase1.choiceB.text}
          </button>
        </div>
      </div>
    `;
  };

  window.playDecisionsPhase2 = function (gameId, choiceLetter) {
    const g = decisionsData.find((x) => x.id === gameId);
    if (!g) return;

    const selectedChoice = choiceLetter === 'A' ? g.phase1.choiceA : g.phase1.choiceB;

    container.innerHTML = `
      <div class="card max-w-lg mx-auto quiz-container">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
          <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">Phase 2: The Fallout</span>
          <button class="btn btn-secondary btn-sm" data-action="switch-view" data-view="decisions" data-unit="${unitId}">
            <i class="fa-solid fa-arrow-left"></i> Scenario Menu
          </button>
        </div>

        <h2 style="font-size: 1.4rem; font-weight: 800; margin: 10px 0 0 0;">${g.title}</h2>
        
        <div style="border: 1px solid var(--border-glass); padding: 12px; border-radius: var(--border-radius-sm); font-size: 0.9rem; color: var(--text-muted);">
          <strong>Your Choice:</strong> ${selectedChoice.text}
        </div>

        <div style="background-color: var(--bg-app); border: 1px solid var(--border-glass); padding: 18px; border-radius: var(--border-radius-sm); margin-bottom: 20px; border-left: 4px solid var(--accent);">
          <strong>THE FALLOUT:</strong><br />
          ${selectedChoice.fallout}
        </div>

        <div class="quiz-options">
          <button class="btn btn-block btn-quiz-opt" data-action="play-decisions-phase3" data-id="${g.id}" data-choice="${choiceLetter}" data-phase="1">
            <strong>Choice ${choiceLetter}1:</strong> ${selectedChoice.choice1.text}
          </button>
          <button class="btn btn-block btn-quiz-opt" data-action="play-decisions-phase3" data-id="${g.id}" data-choice="${choiceLetter}" data-phase="2">
            <strong>Choice ${choiceLetter}2:</strong> ${selectedChoice.choice2.text}
          </button>
        </div>
      </div>
    `;
  };

  window.playDecisionsPhase3 = function (gameId, choiceLetter, subChoice) {
    const g = decisionsData.find((x) => x.id === gameId);
    if (!g) return;

    const selectedChoice = choiceLetter === 'A' ? g.phase1.choiceA : g.phase1.choiceB;
    const selectedSubChoice = subChoice === '1' ? selectedChoice.choice1 : selectedChoice.choice2;

    container.innerHTML = `
      <div class="card max-w-lg mx-auto quiz-container">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
          <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">Phase 3: The Verdict</span>
          <button class="btn btn-secondary btn-sm" data-action="switch-view" data-view="decisions" data-unit="${unitId}">
            <i class="fa-solid fa-arrow-left"></i> Scenario Menu
          </button>
        </div>

        <h2 style="font-size: 1.4rem; font-weight: 800; margin: 10px 0 0 0;">${g.title}</h2>
        
        <div style="background-color: var(--bg-app); border: 1px solid var(--border-glass); padding: 18px; border-radius: var(--border-radius-sm); margin-bottom: 20px; border-left: 4px solid ${selectedSubChoice.isHistorical ? 'var(--primary)' : 'var(--accent)'};">
          <h4 style="margin-bottom: 8px;">${selectedSubChoice.isHistorical ? '🏆 Historical Path Followed' : '⚠️ Deviated from History'}</h4>
          ${selectedSubChoice.verdict}
        </div>

        <div style="display: flex; justify-content: space-between;">
          <button class="btn btn-secondary" data-action="switch-view" data-view="decisions" data-unit="${unitId}">Another Scenario</button>
          <button class="btn-pedagogy-primary" data-action="switch-view" data-view="dashboard">Exit Simulator</button>
        </div>
      </div>
    `;
  };

  // Render scenarios menu list
  container.innerHTML = `
    <div class="card">
      <h3 style="margin-bottom: 8px;"><i class="fa-solid fa-phone-volume text-primary"></i> Decision-Making Simulation</h3>
      <p class="text-muted" style="margin-bottom: 24px;">Put yourself in the shoes of historical figures facing critical turning points.</p>
      
      <div class="modules-grid">
        ${decisionsData
          .map(
            (g) => `
          <div class="module-card">
            <div class="module-header">
              <span class="category-badge">${g.series}</span>
              <i class="${g.icon}" style="color: var(--primary);"></i>
            </div>
            <h4>${g.title}</h4>
            <p style="font-size: 0.85rem;"><strong>Role:</strong> ${g.role}</p>
            <button class="btn-pedagogy-primary btn-pedagogy-sm w-full" data-action="play-decisions-scenario" data-id="${g.id}">
              Start Simulation
            </button>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  `;
}

export async function renderTabooView() {
  const container = document.getElementById('main-content');
  const unitId = window.currentUnitId || state.selectedUnitId || 'cme_new';

  let tabooCards = [];
  if (unitId === 'cme_new' || unitId === 'gcse_middle_east_1945_1995') {
    // Both USA and CME are currently pulling from the same taboo_data file for now based on the old code
    const mod = await import('./taboo_data.js');
    Object.keys(mod.TABOO_CARDS).forEach((cat) => {
      mod.TABOO_CARDS[cat].forEach((card) => {
        tabooCards.push({
          id: `taboo_${unitId}_${card.target.replace(/\s+/g, '_')}`,
          topic: cat,
          target: card.target.toUpperCase(),
          taboo: card.taboo,
          hint: `Recall this key ${cat} from the course.`,
        });
      });
    });
  } else if (unitId === 'eee' || unitId === 'gcse_elizabethan_england') {
    const mod = await import('./data/elizabethan/data.js');
    const timelineData = mod.timelineData;
    let cardCount = 1;
    timelineData.forEach((topic) => {
      topic.events.forEach((evt) => {
        if (evt.subtitle && evt.text) {
          const target = evt.subtitle.toUpperCase();
          const taboo = [...(evt.names || []), ...(evt.stats || [])]
            .slice(0, 5)
            .map((s) => s.replace(/\(.*?\)/g, '').trim())
            .filter(Boolean);
          const hint = evt.text.split('.')[0] + '.';
          if (taboo.length >= 2) {
            tabooCards.push({
              id: `taboo_eee_${cardCount++}`,
              topic: topic.title,
              target: target,
              taboo: taboo,
              hint: hint,
            });
          }
        }
      });
    });
  }

  if (tabooCards.length === 0) {
    container.innerHTML = `
      <div class="card text-center">
        <h3><i class="fa-solid fa-tags"></i> Taboo Recall</h3>
        <p>No Taboo recall cards available for this unit.</p>
        <button class="btn-pedagogy-primary" data-action="switch-view" data-view="dashboard">Back to Dashboard</button>
      </div>
    `;
    return;
  }

  window.showTabooCard = function (index) {
    const card = tabooCards[index];
    container.innerHTML = `
      <div class="card max-w-md mx-auto text-center" style="display: flex; flex-direction: column; gap: 20px; border: 2px solid var(--primary); padding: 32px;">
        <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">${card.topic}</span>
        
        <div style="background-color: var(--bg-app); border: 2px solid var(--border-glass); border-radius: var(--border-radius-md); padding: 24px; box-shadow: var(--shadow-sm);">
          <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--primary); letter-spacing: 0.5px;">${card.target}</h2>
        </div>

        <div style="border-top: 1px solid var(--border-glass); border-bottom: 1px solid var(--border-glass); padding: 18px 0;">
          <h4 style="text-transform: uppercase; font-size: 0.85rem; color: var(--accent); margin-bottom: 12px; letter-spacing: 1px;">Forbidden Taboo Words:</h4>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${card.taboo.map((w) => `<span style="font-size: 1.1rem; font-weight: 700; text-decoration: line-through; opacity: 0.85;">${w}</span>`).join('')}
          </div>
        </div>

        <div id="taboo-hint-box" style="display: none; background-color: var(--bg-app); padding: 12px; border-radius: var(--border-radius-sm); font-size: 0.85rem; text-align: left;">
          <strong>Context Hint:</strong> ${card.hint}
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button class="btn btn-outline" id="btn-show-hint" data-action="reveal-taboo-hint">Show Context Hint</button>
          <div style="display: flex; gap: 10px; justify-content: center; margin-top: 10px;">
            <button class="btn btn-secondary" data-action="switch-view" data-view="dashboard">Exit Game</button>
            <button class="btn-pedagogy-primary" data-action="next-taboo-card">Next Card &rarr;</button>
          </div>
        </div>
      </div>
    `;
  };

  window.showRandomTabooCard = function () {
    const randomIndex = Math.floor(Math.random() * tabooCards.length);
    window.showTabooCard(randomIndex);
  };

  window.showRandomTabooCard();
}

export async function renderLessonsView() {
  const container = document.getElementById('main-content');
  const unitId = state.selectedUnitId || 'gcse_usa_1954_1975';
  const data = state.activeUnitData;

  const lessonsList = data.lessons || data.subtopics;
  if (!data || !lessonsList || lessonsList.length === 0) {
    container.innerHTML = `
      <div class="card text-center">
        <h3><i class="fa-solid fa-book-open"></i> Lessons Study Guide</h3>
        <p>No lessons available for this unit.</p>
        <button class="btn-pedagogy-primary" data-action="switch-view" data-view="dashboard">Back to Dashboard</button>
      </div>
    `;
    return;
  }

  window.viewLessonDetail = function (index) {
    const lessonsList = data.lessons || data.subtopics;
    const sub = lessonsList[index];

    // Inject the content-area wrapper if it doesn't exist, since the legacy renderer expects it!
    container.innerHTML = `
      <div id="content-area" style="animation: fadeInUp 0.3s ease-out; background-color: var(--bg-app); min-height: 100vh;">
      </div>
    `;

    // Call the legacy Netlify app's beautifully formatted lesson renderer!
    renderLesson(sub);
    window.scrollTo(0, 0);
  };

  let heroImageUrl = '';
  if (
    data.cover_image &&
    typeof data.cover_image === 'string' &&
    !data.cover_image.includes('placeholder_cover')
  ) {
    heroImageUrl = getAssetUrl(data.cover_image);
  } else if (
    Array.isArray(data.cover_image) &&
    data.cover_image.length > 0 &&
    !data.cover_image[0].includes('placeholder_cover')
  ) {
    heroImageUrl = getAssetUrl(data.cover_image[0]);
  } else if (data.homepage_background) {
    heroImageUrl = getAssetUrl(data.homepage_background);
  } else if (data.cover_sources && data.cover_sources.length > 0) {
    heroImageUrl = getAssetUrl(data.cover_sources[0].image);
  }

  let headerHtml = '';
  if (heroImageUrl) {
    headerHtml = `
      <div style="position: relative; text-align: center; padding: 80px 30px 60px 30px; background-image: url('${heroImageUrl}'); background-size: cover; background-position: center; border-radius: 0;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.85));"></div>
        <div style="position: relative; z-index: 1;">
          <h1 style="font-family: 'Playfair Display', serif; font-size: 2.8rem; color: white; margin-bottom: 10px; line-height: 1.2; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${data.enquiry_question || data.enquiry || 'Unit Enquiry'}</h1>
          <h2 style="font-size: 1.4rem; color: #cbd5e1; font-weight: 500; margin-top: 0; margin-bottom: 0; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
            ${data.title}
          </h2>
          ${data.cover_caption ? `<p style="margin-top: 20px; margin-bottom: 0; font-style: italic; color: #94a3b8; font-size: 0.95rem; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto;">${data.cover_caption}</p>` : ''}
        </div>
      </div>
      <div style="padding: 20px 30px 0 30px; background: white;">
        ${renderCoverSourcesHTML(data, true)}
      </div>
    `;
  } else {
    headerHtml = `
      <div style="text-align: center; padding: 40px 30px 20px 30px; background: white;">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 2.8rem; color: #1a237e; margin-bottom: 10px; line-height: 1.2;">${data.enquiry_question || data.enquiry || 'Unit Enquiry'}</h1>
        <h2 style="font-size: 1.4rem; color: #475569; font-weight: 500; margin-top: 0; margin-bottom: 30px;">
          ${data.title}
        </h2>
        
        ${renderCoverSourcesHTML(data)}
        
        ${data.cover_caption ? `<p style="margin-top: 5px; margin-bottom: 0; font-style: italic; color: #64748b; font-size: 0.95rem; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto;">${data.cover_caption}</p>` : ''}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="card" style="animation: fadeInUp 0.3s ease-out; padding: 0; overflow: hidden; background: white;">
      ${headerHtml}
      
      <div style="padding: 30px; border-top: 1px solid #e2e8f0;">
        <p class="text-muted" style="margin-bottom: 24px;">Read through the core steps, historical sources, and historian's tips for each lesson before testing yourself.</p>
        
        ${renderKeyTopicLessonsHTML(data, unitId, data)}
      </div>
    </div>
  `;
}

export function renderIndividualsView() {
  const contentArea = document.getElementById('main-content');
  if (!contentArea) return;
  contentArea.innerHTML = '';
  contentArea.style.paddingTop = '1rem';

  const keyIndividualsData =
    (state.activeUnitData && state.activeUnitData.key_individuals) ||
    (state.activeUnitData && state.activeUnitData.biographies);
  if (!keyIndividualsData || keyIndividualsData.length === 0) {
    contentArea.innerHTML =
      '<p style="padding: 2rem; color: var(--text-main);">No historical individuals found for this unit.</p>';
    return;
  }

  const historicalData = keyIndividualsData.filter(
    (p) => !p.group || p.group === 'Historical Figures' || p.group !== 'Historians',
  );

  if (historicalData.length > 0) {
    initKeyIndividualsTask(
      contentArea,
      historicalData,
      'Historical Individuals',
      'Profiles of the major historical figures who shaped these events.',
    );
  }

  const historiansData = keyIndividualsData.filter((p) => p.group === 'Historians');
  if (historiansData && historiansData.length > 0) {
    initKeyIndividualsTask(
      contentArea,
      historiansData,
      'Historians',
      'Academic perspectives and historical interpretations.',
    );
  }

  contentArea.scrollTo({ top: 0, behavior: 'smooth' });
}

export function renderReadingView() {
  const contentArea = document.getElementById('main-content');
  if (!contentArea) return;
  contentArea.innerHTML = '';
  contentArea.style.paddingTop = '1rem';

  const readingData = state.activeUnitData.guided_reading;
  if (!readingData || readingData.length === 0) {
    contentArea.innerHTML =
      '<p style="padding: 2rem; color: var(--text-main);">No guided reading available for this unit.</p>';
    return;
  }

  initGuidedReadingTask(contentArea, readingData, state);

  contentArea.scrollTo({ top: 0, behavior: 'smooth' });
}

export async function renderBookletView() {
  const contentArea = document.getElementById('main-content');
  if (!contentArea) return;
  contentArea.innerHTML = '';

  const { renderWorkbooksZone } = await import('./workbooks_zone.js');
  renderWorkbooksZone(contentArea, state.activeUnitData);

  contentArea.scrollTo({ top: 0, behavior: 'smooth' });
}

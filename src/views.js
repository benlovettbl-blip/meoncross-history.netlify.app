/**
 * Views Renderer for GCSE History Study & Revision Portal
 * Handles rendering the Dashboard, Interactive Quizzes, Timelines, Printable Booklets, and Student Profiles.
 */

import { state } from './state.js';
import { getProfile, setMockUser } from './auth.js';
import { getMasteryStatus, updateLeitnerBox, toggleBookmark, saveProgress } from './storage.js';
import { renderCoverSourcesHTML } from './cover_sources.js';
import { renderKeyTopicLessonsHTML } from './lesson_cards.js';
import { renderUnitSynopsis } from './unit_synopses.js';
import { renderLesson } from './engine/lesson_renderer.js'; // force-refresh
import { initKeyIndividualsTask } from './key_individuals.js';
import { initGuidedReadingTask } from './guided_reading.js';
import { getAssetUrl } from './engine/assets.js';
import './engine/modals.js'; // Side-effect: registers window.renderQuizQuestion, openGallery, etc.
import { renderDiagnosticLauncherHTML } from './diagnostic_benchmark.js';
export { renderCompetitionsView } from './competitions_zone.js';
export { renderChessHubView } from './chess_zone.js';

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
        The History Revision Hub
      </div>
      <div style="display: flex; gap: 8px; align-items: center; font-size: 0.85rem; flex-wrap: wrap; justify-content: flex-end;">
        <span style="font-weight: 600; color: #334155; margin-right: 5px;">Welcome back to The History Revision Hub</span>
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

  // Co-Curricular & Enrichment Dual Spotlight (Competitions + Chess Club)
  html += `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-bottom: 24px;">
      
      <!-- Competition Spotlight -->
      <div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border: 1.5px solid #fde68a; border-radius: 14px; padding: 18px 20px; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.09); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 12px; min-width: 220px; flex: 1;">
          <div style="width: 44px; height: 44px; border-radius: 10px; background: #f59e0b; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);">
            <i class="fa-solid fa-trophy"></i>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 2px;">
              <span style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; background: #d97706; color: #ffffff; padding: 2px 7px; border-radius: 10px;">Enrichment</span>
              <span style="font-size: 0.72rem; font-weight: 700; color: #92400e;">History Awards &amp; Essay Competitions</span>
            </div>
            <div style="font-size: 0.92rem; font-weight: 700; color: #78350f;">
              Explore Opportunities
            </div>
          </div>
        </div>
        <button class="btn-pedagogy-primary" onclick="window.switchView('competitions')" style="background: #d97706; border-color: #b45309; padding: 8px 14px; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; border-radius: 6px; cursor: pointer; color: #ffffff; flex-shrink: 0;">
          <span>Explore</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <!-- Chess Club Spotlight -->
      <div style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border: 1.5px solid #ddd6fe; border-radius: 14px; padding: 18px 20px; box-shadow: 0 4px 14px rgba(139, 92, 246, 0.09); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 12px; min-width: 220px; flex: 1;">
          <div style="width: 44px; height: 44px; border-radius: 10px; background: #8b5cf6; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0; box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);">
            <i class="fa-solid fa-chess-knight"></i>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 2px;">
              <span style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; background: #7c3aed; color: #ffffff; padding: 2px 7px; border-radius: 10px;">Thursdays P6</span>
              <span style="font-size: 0.72rem; font-weight: 700; color: #6d28d9;">Chess Club</span>
            </div>
            <div style="font-size: 0.92rem; font-weight: 700; color: #4c1d95;">
              Strategy League · Every Game Earns Points
            </div>
          </div>
        </div>
        <button class="btn-pedagogy-primary" onclick="window.switchView('chess')" style="background: #7c3aed; border-color: #6d28d9; padding: 8px 14px; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; border-radius: 6px; cursor: pointer; color: #ffffff; flex-shrink: 0;">
          <span>Chess Hub</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

    </div>
  `;

  const units = getUnits();

  // Year 7 Grouping
  const year7Order = ['water_and_sanitation', 'medieval_england'];
  const year7Units = units
    .filter((u) => year7Order.includes(u.id))
    .sort((a, b) => year7Order.indexOf(a.id) - year7Order.indexOf(b.id));

  // Year 8 Grouping
  const year8Order = ['early_modern_world', 'industrialisation_and_empire', 'australia'];
  const year8Units = units
    .filter((u) => year8Order.includes(u.id))
    .sort((a, b) => year8Order.indexOf(a.id) - year8Order.indexOf(b.id));

  // Year 9 Grouping — great_war and great_war_part2 are ready; remaining 3 under construction
  const underConstructionIds = ['the_shoah', 'cold_war', 'post_war_britain'];
  const year9Order = ['great_war', 'great_war_part2', 'the_shoah', 'cold_war', 'post_war_britain'];
  const year9Units = units
    .filter((u) => year9Order.includes(u.id) && !underConstructionIds.includes(u.id))
    .sort((a, b) => year9Order.indexOf(a.id) - year9Order.indexOf(b.id));
  // Names of coming-soon units for the strip
  const comingSoonNames = [
    'KS3: The Shoah & World War II',
    'KS3: The Cold War',
    'KS3: Rights, Protest & Post-War Britain',
  ];

  // Year 10 Grouping
  const year10Order = ['cme_new', 'weimar_nazi_germany'];
  const year10Units = units
    .filter((u) => year10Order.includes(u.id))
    .sort((a, b) => year10Order.indexOf(a.id) - year10Order.indexOf(b.id));

  // Year 11 Grouping
  const year11Order = ['edexcel_medicine', 'eee', 'usa'];
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
      usa: 'center 25%',
    };
    const bgPos = unit.cover_image_position || positionFallbacks[unit.id] || 'center';

    const gcseUnitIds = ['cme_new', 'weimar_nazi_germany', 'edexcel_medicine', 'eee', 'usa'];
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
      weimar_nazi_germany: 'Weimar Germany',
      edexcel_medicine: 'Medicine Through Time',
      eee: 'Elizabethan England',
      usa: 'USA 1954–75',
    };
    const ctaLabel = unitShortNames[unit.id] || title;

    html += `
      <div class="module-card ${isUnlocked ? '' : 'locked'}" style="animation-delay: ${index * 0.1}s; cursor: pointer; position: relative; ${isGcse ? 'border-top: 3px solid #f59e0b;' : ''}" data-action="launch-subapp" data-unit="${unit.id}">
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
      <a href="#year7-section" onclick="event.preventDefault(); window.scrollToSection('year7-section');" style="text-decoration:none; padding: 6px 18px; border-radius: 20px; font-size: 0.875rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; border: 1.5px solid #bfdbfe; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='#1d4ed8';this.style.color='#fff'" onmouseout="this.style.background='#eff6ff';this.style.color='#1d4ed8'">Year 7</a>
      <a href="#year8-section" onclick="event.preventDefault(); window.scrollToSection('year8-section');" style="text-decoration:none; padding: 6px 18px; border-radius: 20px; font-size: 0.875rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; border: 1.5px solid #bfdbfe; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='#1d4ed8';this.style.color='#fff'" onmouseout="this.style.background='#eff6ff';this.style.color='#1d4ed8'">Year 8</a>
      <a href="#year9-section" onclick="event.preventDefault(); window.scrollToSection('year9-section');" style="text-decoration:none; padding: 6px 18px; border-radius: 20px; font-size: 0.875rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; border: 1.5px solid #bfdbfe; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='#1d4ed8';this.style.color='#fff'" onmouseout="this.style.background='#eff6ff';this.style.color='#1d4ed8'">Year 9</a>
      <a href="#year10-section" onclick="event.preventDefault(); window.scrollToSection('year10-section');" style="text-decoration:none; padding: 6px 18px; border-radius: 20px; font-size: 0.875rem; font-weight: 700; background: #fef3c7; color: #92400e; border: 1.5px solid #fde68a; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='#92400e';this.style.color='#fff'" onmouseout="this.style.background='#fef3c7';this.style.color='#92400e'">Year 10 — GCSE</a>
      <a href="#year11-section" onclick="event.preventDefault(); window.scrollToSection('year11-section');" style="text-decoration:none; padding: 6px 18px; border-radius: 20px; font-size: 0.875rem; font-weight: 700; background: #fef3c7; color: #92400e; border: 1.5px solid #fde68a; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='#92400e';this.style.color='#fff'" onmouseout="this.style.background='#fef3c7';this.style.color='#92400e'">Year 11 — GCSE</a>
      <a href="#gcse-trip-section" onclick="event.preventDefault(); window.scrollToSection('gcse-trip-section');" style="text-decoration:none; padding: 6px 18px; border-radius: 20px; font-size: 0.875rem; font-weight: 700; background: #ede9fe; color: #5b21b6; border: 1.5px solid #ddd6fe; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='#5b21b6';this.style.color='#fff'" onmouseout="this.style.background='#ede9fe';this.style.color='#5b21b6'"><i class="fa-solid fa-compass" style="margin-right:5px;"></i> Ypres Tour (GCSE)</a>
    </nav>
  `;

  if (tripUnits.length > 0) {
    tripUnits.forEach((unit, index) => {
      const imageUrl =
        unit.homepage_background || unit.cover_image || 'images/stubbington_memorial.jpg';
      const title = 'GCSE Battlefield Tour: Ypres & The Salient';

      html += `
        <div id="gcse-trip-section" class="featured-trip-banner" style="display: flex; flex-wrap: wrap; width: 100%; margin-top: 0; margin-bottom: 2rem; background: var(--bg-card, #ffffff); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid var(--border-glass, #e2e8f0); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="flex: 3; min-width: 260px; padding: 22px 32px; display: flex; flex-direction: column; justify-content: center;">
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:6px;">
              <span style="background: #fef3c7; color: #92400e; padding: 3px 10px; border-radius: 20px; font-weight: 700; font-size: 0.75rem; white-space:nowrap; border: 1px solid #fde68a;"><i class="fa-solid fa-graduation-cap"></i> GCSE Years 10–11</span>
              <span style="background: rgba(59,130,246,0.1); color: #2563eb; padding: 3px 10px; border-radius: 20px; font-weight: 600; font-size: 0.75rem; white-space:nowrap;"><i class="fa-solid fa-calendar-days"></i> Autumn Term GCSE Fieldwork Study</span>
              <span style="background: #ede9fe; color: #6d28d9; padding: 3px 10px; border-radius: 20px; font-weight: 600; font-size: 0.75rem; white-space:nowrap;"><i class="fa-solid fa-notes-medical"></i> Paper 1: Western Front Historic Environment</span>
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--primary, #1e3a8a); margin: 0 0 6px 0; line-height: 1.2;">${title}</h2>
            <p style="margin: 0 0 12px 0; font-size: 0.85rem; color: var(--text-muted, #64748b); line-height: 1.4;">
              On-site historic environment study investigating the British sector of the Western Front, casualty evacuation chains (dressing stations, clearing stations), and local Fallen commemorations.
            </p>
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

    <!-- Mobile Version & Cache Control Card -->
    <div class="card max-w-md mx-auto" style="margin-top: 1.5rem;">
      <h3><i class="fa-solid fa-arrows-rotate"></i> App Version &amp; Mobile Updates</h3>
      <p class="text-muted" style="font-size: 0.86rem; line-height: 1.5; margin-bottom: 14px;">
        If you are on a mobile phone, iPad, or tablet and want to ensure you are seeing the very latest curriculum features and quizzes:
      </p>
      <button class="btn btn-outline w-full" id="btn-force-update" onclick="window.forceAppUpdate(event)" style="display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700;">
        <i class="fa-solid fa-cloud-arrow-down"></i>
        <span>Check for Updates &amp; Refresh Cache</span>
      </button>
      <p style="font-size: 0.75rem; color: #94a3b8; text-align: center; margin-top: 10px; margin-bottom: 0;">
        Clears local service worker cache and pulls fresh build from Netlify.
      </p>
    </div>
  `;
}

// Global force update function for mobile devices
window.forceAppUpdate = async function (e) {
  const btn = document.getElementById('btn-force-update');
  if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking for updates...';
  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const r of registrations) {
        await r.unregister();
      }
    }
    if ('caches' in window) {
      const names = await caches.keys();
      for (const name of names) {
        await caches.delete(name);
      }
    }
  } catch (err) {
    console.warn('Error purging caches:', err);
  }
  // Force reload with cache buster
  const url = new URL(window.location.href);
  url.searchParams.set('_v', Date.now());
  window.location.href = url.toString();
};

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

  setTimeout(async () => {
    if (subAppName === 'gcse_middle_east_1945_1995') {
      window.location.href = '/cme/';
      return;
    }
    let mappedName = subAppName;
    if (subAppName === 'gcse_middle_east_1945_1995_new') mappedName = 'cme_new';
    if (subAppName === 'gcse_usa_1954_1975') mappedName = 'usa';
    if (subAppName === 'gcse_elizabethan_england') mappedName = 'eee';
    if (subAppName === 'great_war_v2') mappedName = 'great_war';

    if (window.switchView) {
      await window.switchView('lessons', mappedName);
    } else {
      window.location.href = `/?view=lessons&unit=${mappedName}`;
    }

    if (curtain) {
      setTimeout(() => curtain.classList.add('hidden'), 150);
    }
  }, 180);
};

export function renderInteractiveQuiz() {
  const container = document.getElementById('main-content');
  const unitId = state.selectedUnitId || window.currentUnitId;
  const data = state.activeUnitData;

  if (!data || !unitId) {
    container.innerHTML = `
      <div class="card text-center" style="padding: 40px;">
        <h3><i class="fa-solid fa-circle-question" style="color: #f59e0b;"></i> Interactive Quizzing &amp; Spaced Recall</h3>
        <p>Please select a unit to access its interactive quizzes and spaced recall decks.</p>
        <button class="btn-pedagogy-primary" data-action="switch-view" data-view="dashboard">Back to Dashboard</button>
      </div>
    `;
    return;
  }

  const workbooks = data.workbooks || [
    { id: 'full', title: 'Complete Unit Mastery', prefix: 'lesson' },
  ];

  // Calculate total question count across lessons
  let totalQuestions = 0;
  const lessons = data.lessons || data.subtopics || [];
  lessons.forEach((l) => {
    if (l.quiz && Array.isArray(l.quiz)) totalQuestions += l.quiz.length;
    if (l.do_now && Array.isArray(l.do_now.items)) totalQuestions += l.do_now.items.length;
    else if (l.do_now && Array.isArray(l.do_now.questions))
      totalQuestions += l.do_now.questions.length;
  });
  if (totalQuestions === 0 && data.quizData) totalQuestions = data.quizData.length;

  const defaultWb = workbooks[0];
  const defaultWbId = defaultWb.name || defaultWb.id;
  const initialFlashcardUrl = `/units/${unitId}/mastery_pack_${defaultWbId}.html#practice-mode`;
  const initialWhiteboardUrl = `/units/${unitId}/mastery_pack_${defaultWbId}.html#practice-mode&teacher=true`;
  const initialVaultUrl = `/units/${unitId}/mastery_pack_${defaultWbId}.html`;

  let html = `
    <div style="max-width: 980px; margin: 0 auto; padding-bottom: 50px; animation: fadeInUp 0.3s ease-out;">
      
      <!-- Streamlined Header -->
      <div style="margin-bottom: 28px; text-align: center;">
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(99, 102, 241, 0.25); color: #c7d2fe; border: 1px solid rgba(99, 102, 241, 0.4); padding: 5px 16px; border-radius: 999px; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; backdrop-filter: blur(4px);">
          <i class="fa-solid fa-circle-question" style="color: #fef08a;"></i> Quizzing &amp; Spaced Retrieval
        </div>
        <h1 style="font-family: 'Montserrat', sans-serif; font-size: 2.3rem; font-weight: 800; color: #ffffff; margin: 0 0 10px 0; letter-spacing: -0.5px; text-shadow: 0 2px 10px rgba(0,0,0,0.4);">
          Interactive Quizzing &amp; Spaced Recall
        </h1>
        <p style="color: #cbd5e1; font-size: 1.05rem; margin: 0 auto; max-width: 620px; line-height: 1.5; font-weight: 400; text-shadow: 0 1px 3px rgba(0,0,0,0.3);">
          Strengthen long-term factual memory through daily 5-minute retrieval drills, or benchmark your exam readiness with a 10-minute diagnostic check.
        </p>
      </div>

      <!-- Primary Two-Choice Layout -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 22px; margin-bottom: 24px;">
        
        <!-- Choice 1: Daily Recall Practice -->
        <div style="background: white; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 20px rgba(0,0,0,0.03); transition: all 0.2s ease;" onmouseover="this.style.borderColor='#6366f1'; this.style.boxShadow='0 8px 30px rgba(99,102,241,0.08)';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.boxShadow='0 4px 20px rgba(0,0,0,0.03)';">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
              <span style="background: #eef2ff; color: #4338ca; border: 1px solid #c7d2fe; font-size: 0.72rem; font-weight: 800; padding: 3px 10px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
                ⭐ Daily Practice • 5 Mins
              </span>
              <span style="color: #64748b; font-size: 0.78rem; font-weight: 600; display: inline-flex; align-items: center; gap: 5px;">
                <i class="fa-solid fa-layer-group" style="color: #6366f1;"></i> 3-Box Leitner
              </span>
            </div>

            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
              <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25); flex-shrink: 0;">
                <i class="fa-solid fa-bolt-lightning" style="color: #fef08a;"></i>
              </div>
              <div>
                <h2 style="margin: 0; font-size: 1.3rem; font-family: 'Montserrat', sans-serif; font-weight: 800; color: #1e293b;">
                  Daily Recall Flashcards
                </h2>
                <p style="margin: 2px 0 0 0; color: #64748b; font-size: 0.82rem;">
                  Effortful retrieval with adaptive intervals
                </p>
              </div>
            </div>

            <p style="color: #475569; font-size: 0.9rem; line-height: 1.5; margin: 0 0 18px 0;">
              Flip through core retrieval cards. Mastered facts move to weekly review; facts you struggle with return daily for immediate consolidation.
            </p>

            ${
              workbooks.length > 1
                ? `
              <div style="margin-bottom: 18px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px;">
                <label for="select-recall-deck" style="display: block; font-size: 0.76rem; font-weight: 700; color: #475569; margin-bottom: 6px; text-transform: uppercase;">
                  Select Deck / Subtopic Drill:
                </label>
                <select id="select-recall-deck" class="form-select" style="width: 100%; padding: 7px 10px; font-size: 0.86rem; border: 1px solid #cbd5e1; border-radius: 6px; background: white; color: #0f172a; font-weight: 600; cursor: pointer;" onchange="window.handleRecallDeckChange('${unitId}', this.value)">
                  ${
                    unitId === 'cme_new'
                      ? workbooks
                          .map((wb, i) => {
                            const wbId = wb.name || wb.id;
                            const normWbId = (wbId || '').replace(/\s+/g, '').toLowerCase();
                            const normPrefix = (wb.prefix || wbId || '')
                              .replace(/\s+/g, '')
                              .toLowerCase();
                            const matching = lessons.filter((l) => {
                              const normTitle = (l.title || '').replace(/\s+/g, '').toLowerCase();
                              const normId = (l.id || '').replace(/\s+/g, '').toLowerCase();
                              return (
                                l.workbook === wbId ||
                                (l.title && l.title.startsWith(wb.prefix || wbId)) ||
                                (l.id && l.id.startsWith(wb.prefix || wbId)) ||
                                normTitle.startsWith(normPrefix) ||
                                normId.startsWith(normPrefix) ||
                                normTitle.startsWith(normWbId)
                              );
                            });
                            return `
                              <optgroup label="${wb.title || `Key Topic ${i + 1}`}">
                                <option value="${wbId}:all">⭐ Complete ${wb.id || `Key Topic ${i + 1}`} Deck (${matching.length * 20 || 60}+ Cards)</option>
                                ${matching
                                  .map((l, pIdx) => {
                                    return `<option value="${wbId}:${pIdx}">🎯 ${l.title} (20 Cards)</option>`;
                                  })
                                  .join('')}
                              </optgroup>
                            `;
                          })
                          .join('')
                      : workbooks
                          .map((wb, i) => {
                            const id = wb.name || wb.id;
                            const isFull = id === 'full';
                            return `<option value="${id}">${isFull ? 'Comprehensive Unit Deck (All Lessons)' : `Key Topic ${i + 1}: ${wb.title || wb.name}`}</option>`;
                          })
                          .join('')
                  }
                </select>
              </div>
            `
                : ''
            }
          </div>

          <div>
            <a id="btn-start-flashcards" href="${initialFlashcardUrl}" target="_blank" style="text-decoration: none; background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%); color: white; padding: 13px 20px; border-radius: 10px; font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 9px; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35); transition: all 0.15s ease;" onmouseover="this.style.filter='brightness(1.1)'; this.style.transform='translateY(-1px)';" onmouseout="this.style.filter='brightness(1)'; this.style.transform='translateY(0)';">
              <i class="fa-solid fa-play" style="font-size: 0.9rem;"></i>
              <span>Launch Flashcards</span>
            </a>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 14px; padding-top: 12px; border-top: 1px solid #f1f5f9; font-size: 0.8rem;">
              <a id="btn-wb-mode" href="${initialWhiteboardUrl}" target="_blank" style="color: #4f46e5; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 5px; transition: color 0.15s ease;" onmouseover="this.style.color='#312e81';" onmouseout="this.style.color='#4f46e5';">
                <i class="fa-solid fa-chalkboard-user"></i> Whiteboard Mode
              </a>
              <a id="btn-key-mode" href="${initialVaultUrl}" target="_blank" style="color: #64748b; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 5px; transition: color 0.15s ease;" onmouseover="this.style.color='#0f172a';" onmouseout="this.style.color='#64748b';">
                <i class="fa-solid fa-key"></i> Question Vault
              </a>
            </div>
          </div>
        </div>

        <!-- Choice 2: Timed Readiness Benchmark -->
        <div style="background: white; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 20px rgba(0,0,0,0.03); transition: all 0.2s ease;" onmouseover="this.style.borderColor='#f59e0b'; this.style.boxShadow='0 8px 30px rgba(245,158,11,0.08)';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.boxShadow='0 4px 20px rgba(0,0,0,0.03)';">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
              <span style="background: #fef3c7; color: #b45309; border: 1px solid #fde68a; font-size: 0.72rem; font-weight: 800; padding: 3px 10px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
                🎯 Exam Check • 10 Mins
              </span>
              <span style="color: #64748b; font-size: 0.78rem; font-weight: 600; display: inline-flex; align-items: center; gap: 5px;">
                <i class="fa-solid fa-chart-pie" style="color: #d97706;"></i> Diagnostic
              </span>
            </div>

            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
              <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.25); flex-shrink: 0;">
                <i class="fa-solid fa-bullseye" style="color: #fef08a;"></i>
              </div>
              <div>
                <h2 style="margin: 0; font-size: 1.3rem; font-family: 'Montserrat', sans-serif; font-weight: 800; color: #1e293b;">
                  10-Min Readiness Check
                </h2>
                <p style="margin: 2px 0 0 0; color: #64748b; font-size: 0.82rem;">
                  Targeted knowledge diagnosis &amp; Box 1 sync
                </p>
              </div>
            </div>

            <p style="color: #475569; font-size: 0.9rem; line-height: 1.5; margin: 0 0 18px 0;">
              Answer 20 questions sampled evenly across all historical eras. Pinpoints your weakest period and automatically queues missed facts into your Daily Box 1 deck.
            </p>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; margin-bottom: 18px; display: grid; grid-template-columns: 1fr 1fr 1fr; text-align: center;">
              <div>
                <div style="font-weight: 800; font-size: 1.05rem; color: #0f172a;">20</div>
                <div style="font-size: 0.7rem; color: #64748b; text-transform: uppercase; font-weight: 600;">Sampled MCQs</div>
              </div>
              <div style="border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                <div style="font-weight: 800; font-size: 1.05rem; color: #0f172a;">10:00</div>
                <div style="font-size: 0.7rem; color: #64748b; text-transform: uppercase; font-weight: 600;">Timer</div>
              </div>
              <div>
                <div style="font-weight: 800; font-size: 1.05rem; color: #0f172a;">Box 1</div>
                <div style="font-size: 0.7rem; color: #64748b; text-transform: uppercase; font-weight: 600;">Auto-Sync</div>
              </div>
            </div>
          </div>

          <div>
            <button id="btn-start-diagnostic" class="btn-pedagogy-primary" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #000; font-weight: 800; font-size: 0.95rem; padding: 13px 20px; border-radius: 10px; border: none; cursor: pointer; width: 100%; display: flex; align-items: center; justify-content: center; gap: 9px; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35); transition: all 0.15s ease;" onclick="window.startDiagnosticBenchmark('${unitId}')" onmouseover="this.style.filter='brightness(1.08)'; this.style.transform='translateY(-1px)';" onmouseout="this.style.filter='brightness(1)'; this.style.transform='translateY(0)';">
              <i class="fa-solid fa-bullseye"></i>
              <span>Start 10-Min Benchmark</span>
            </button>

            <div style="display: flex; align-items: center; justify-content: center; margin-top: 14px; padding-top: 12px; border-top: 1px solid #f1f5f9; font-size: 0.8rem; color: #64748b;">
              <span><i class="fa-solid fa-check-circle" style="color: #10b981; margin-right: 4px;"></i> Instant feedback &amp; era breakdown</span>
            </div>
          </div>
        </div>

      </div>

      ${
        unitId === 'usa'
          ? `
      <div style="background: linear-gradient(135deg, rgba(249, 115, 22, 0.08), rgba(6, 182, 212, 0.08)); border: 1px solid rgba(249, 115, 22, 0.3); border-radius: 14px; padding: 20px 24px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #f97316, #ea580c); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; box-shadow: 0 4px 14px rgba(249, 115, 22, 0.3);">
            <i class="fa-solid fa-layer-group" style="color: #facc15;"></i>
          </div>
          <div>
            <h3 style="margin: 0 0 4px 0; font-size: 1.15rem; font-family: 'Montserrat', sans-serif; font-weight: 800; color: #ffffff;">
              Historical Hooligans &amp; Arcade Revision Games
            </h3>
            <p style="margin: 0; color: #cbd5e1; font-size: 0.85rem;">
              16 3D satirical collector cards (Top Trumps stats) + Retro Falling Blocks arcade revision game.
            </p>
          </div>
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <a href="/units/usa/trading_cards.html" target="_blank" class="btn-pedagogy-primary btn-pedagogy-sm" style="text-decoration: none; display: inline-flex; align-items: center; gap: 7px; background: linear-gradient(135deg, #f97316, #ea580c); color: #fff; font-weight: 700; border-radius: 8px; padding: 9px 16px;">
            <i class="fa-solid fa-id-card"></i> Open Trading Cards
          </a>
          <a href="/units/usa/falling_blocks.html" target="_blank" class="btn btn-secondary btn-sm" style="text-decoration: none; display: inline-flex; align-items: center; gap: 7px; background: rgba(255, 255, 255, 0.08); color: #fff; font-weight: 700; border-radius: 8px; padding: 9px 16px; border: 1px solid var(--border-glass);">
            <i class="fa-solid fa-gamepad" style="color: #06b6d4;"></i> Falling Blocks Arcade
          </a>
        </div>
      </div>
      `
          : ''
      }

      <!-- Prominent Physical Booklets & Printable PDF Quizzes -->
      <div style="background: white; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 22px 24px; box-shadow: 0 4px 18px rgba(0,0,0,0.03); margin-top: 10px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: #eef2ff; color: #4338ca; display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
              <i class="fa-solid fa-file-pdf" style="color: #dc2626;"></i>
            </div>
            <div>
              <h3 style="margin: 0; color: #1e293b; font-size: 1.1rem; font-weight: 700;">Printable A4 Quizzes &amp; Mastery Booklets</h3>
              <p style="margin: 2px 0 0 0; font-size: 0.82rem; color: #64748b;">Photocopier-ready retrieval sheets, scratch-off Vault answer keys, and complete exam practice packs.</p>
            </div>
          </div>
          <span style="font-size: 0.76rem; color: #4338ca; font-weight: 700; background: #e0e7ff; padding: 4px 12px; border-radius: 999px;">
            ${workbooks.length} ${workbooks.length === 1 ? 'Deck' : 'Decks'} Ready to Print
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${workbooks
            .map((wb, idx) => {
              const wbId = wb.name || wb.id;
              const isFull = wbId === 'full' || wbId === 'FULL';
              const htmlUrl = `/units/${unitId}/mastery_pack_${wbId}.html`;

              let recallPdfUrl = `/pdfs/${unitId}_mastery_pack_${wbId}_FINAL_V17.pdf`;
              let examPdfUrl = null;

              if (unitId === 'cme_new') {
                const upperId = wbId.toUpperCase();
                recallPdfUrl = `/pdfs/cme_recall_quiz_${upperId}.pdf`;
                examPdfUrl = `/pdfs/cme_new/cme_mastery_pack_${upperId}.pdf`;
              } else if (unitId === 'usa') {
                const upperId = wbId.toUpperCase();
                recallPdfUrl = `/pdfs/usa_recall_quiz_${upperId}.pdf`;
                examPdfUrl = `/pdfs/usa/usa_mastery_pack_${upperId}.pdf`;
              }

              const examSuiteLabel = isFull
                ? unitId === 'usa'
                  ? '48p Exam Suite'
                  : '36p Exam Suite'
                : '12p Exam Pack';

              return `
              <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; transition: all 0.2s ease;" onmouseover="this.style.borderColor='#cbd5e1'; this.style.background='#ffffff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='#f8fafc';">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="background: ${isFull ? '#e0e7ff' : '#f1f5f9'}; color: ${isFull ? '#4338ca' : '#475569'}; font-size: 0.74rem; font-weight: 800; padding: 3px 9px; border-radius: 6px; text-transform: uppercase;">
                    ${isFull ? 'Master Volume' : `Topic ${idx + 1}`}
                  </span>
                  <div>
                    <strong style="color: #0f172a; font-size: 0.95rem; display: block;">${wb.title || wb.name}</strong>
                    <span style="font-size: 0.78rem; color: #64748b;">${isFull ? (unitId === 'usa' ? 'All 16 Lessons • Complete Retrieval (320Q) & Exam Mastery' : 'All 10 Lessons • Complete Retrieval & Exam Mastery') : 'Knowledge Retrieval • The Vault Solutions • Exam Practice'}</span>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                  <a href="${htmlUrl}" target="_blank" style="text-decoration: none; background: #ffffff; border: 1.5px solid #cbd5e1; color: #334155; padding: 7px 12px; border-radius: 6px; font-weight: 600; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 5px; transition: all 0.15s ease;" onmouseover="this.style.background='#f1f5f9'; this.style.borderColor='#94a3b8';" onmouseout="this.style.background='#ffffff'; this.style.borderColor='#cbd5e1';">
                    <i class="fa-solid fa-key" style="color: #d97706;"></i> The Vault Key
                  </a>

                  <a href="${recallPdfUrl}" target="_blank" download style="text-decoration: none; background: #fef2f2; border: 1.5px solid #fecaca; color: #991b1b; padding: 7px 12px; border-radius: 6px; font-weight: 700; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease;" onmouseover="this.style.background='#fee2e2';" onmouseout="this.style.background='#fef2f2';">
                    <i class="fa-solid fa-file-pdf" style="color: #dc2626;"></i> Print Recall Quiz PDF
                  </a>

                  ${
                    examPdfUrl
                      ? `
                  <a href="${examPdfUrl}" target="_blank" download style="text-decoration: none; background: #e0f2fe; border: 1.5px solid #bae6fd; color: #0369a1; padding: 7px 12px; border-radius: 6px; font-weight: 700; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease;" onmouseover="this.style.background='#bae6fd';" onmouseout="this.style.background='#e0f2fe';">
                    <i class="fa-solid fa-book-open" style="color: #0284c7;"></i> ${examSuiteLabel}
                  </a>
                  `
                      : ''
                  }
                </div>
              </div>
            `;
            })
            .join('')}
        </div>
      </div>

    </div>
  `;

  container.innerHTML = html;
}

window.handleRecallDeckChange = function (unitId, value) {
  let wbId = value;
  let part = null;
  if (value && value.includes(':')) {
    const parts = value.split(':');
    wbId = parts[0];
    part = parts[1];
  }

  const flashcardBtn = document.getElementById('btn-start-flashcards');
  const wbBtn = document.getElementById('btn-wb-mode');
  const keyBtn = document.getElementById('btn-key-mode');

  const partParam = part && part !== 'all' ? `&part=${part}` : '';

  if (flashcardBtn)
    flashcardBtn.href = `/units/${unitId}/mastery_pack_${wbId}.html#practice-mode${partParam}`;
  if (wbBtn)
    wbBtn.href = `/units/${unitId}/mastery_pack_${wbId}.html#practice-mode${partParam}&teacher=true`;
  if (keyBtn) {
    if (part && part !== 'all') {
      keyBtn.href = `/units/${unitId}/mastery_pack_${wbId}.html#topic-part-${part}`;
    } else {
      keyBtn.href = `/units/${unitId}/mastery_pack_${wbId}.html#the-vault`;
    }
  }
};

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
          .map((evt, idx) => {
            const eventTitle = evt.title || evt.event || '';
            const eventDetail = evt.text || evt.detail || evt.description || '';
            return `
          <div class="timeline-item ${idx % 2 === 0 ? 'left' : 'right'}">
            <div class="timeline-badge">${evt.year}</div>
            <div class="timeline-panel">
              <h4>${evt.year}${eventTitle ? ` · ${eventTitle}` : ''}</h4>
              <p>${eventDetail}</p>
            </div>
          </div>
        `;
          })
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
  } else if (unitId === 'gcse_usa_1954_1975' || unitId === 'usa') {
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
  if (
    unitId === 'cme_new' ||
    unitId === 'gcse_middle_east_1945_1995' ||
    unitId === 'usa' ||
    unitId === 'gcse_usa_1954_1975'
  ) {
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
  window.currentUnitData = data;
  window.currentUnitId = unitId;

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

  window.viewLessonDetail = function (index, targetStopId = null, skipPush = false) {
    const lessonsList = data.lessons || data.subtopics;
    const sub = lessonsList[index];
    if (!sub) return;

    // Snapshot scroll on unit menu and push history state for this lesson
    if (!skipPush && typeof window !== 'undefined' && window.history) {
      const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
      const currentState = window.history.state || {};
      try {
        window.history.replaceState(
          {
            ...currentState,
            view: 'lessons',
            unit: unitId,
            lessonIndex: undefined,
            scrollY: currentScroll,
          },
          '',
          window.location.href,
        );

        const url = new URL(window.location);
        url.searchParams.set('view', 'lessons');
        url.searchParams.set('unit', unitId);
        url.searchParams.set('lesson', index);
        window.history.pushState(
          {
            view: 'lessons',
            unit: unitId,
            lessonIndex: index,
            scrollY: 0,
          },
          '',
          url,
        );
      } catch (err) {}
    }

    // Update breadcrumbs to show Dashboard > Unit > Lesson Title
    if (typeof window.updateBreadcrumbs === 'function') {
      const lessonTitle = sub.title || `Lesson ${index + 1}`;
      window.updateBreadcrumbs([
        { label: 'Dashboard', view: 'dashboard' },
        {
          label: data.title ? data.title.split(':')[0].trim() : 'Unit',
          view: 'lessons',
          unit: unitId,
        },
        { label: lessonTitle },
      ]);
    }

    // Inject the content-area wrapper if it doesn't exist, since the legacy renderer expects it!
    container.innerHTML = `
      <div id="content-area" style="animation: fadeInUp 0.3s ease-out; background-color: var(--bg-app); min-height: 100vh;">
      </div>
    `;

    // Call the legacy Netlify app's beautifully formatted lesson renderer!
    renderLesson(sub);

    // Attach draft preservation to student response boxes in this lesson
    if (typeof window.initDraftPreservation === 'function') {
      window.initDraftPreservation(
        document.getElementById('content-area'),
        `${unitId}_${sub.id || index}`,
      );
    }

    if (targetStopId) {
      setTimeout(() => {
        if (window.jumpToStop) window.jumpToStop(targetStopId);
      }, 180);
    } else {
      if (window.scrollToTop) window.scrollToTop(true);
      else window.scrollTo(0, 0);
    }
  };

  const floatingBtn = document.getElementById('floating-stop-navigator-btn');
  if (floatingBtn) floatingBtn.remove();

  // Check if a specific lesson was requested via URL query params (e.g. from QR code ?lesson=1)
  const urlParams = new URLSearchParams(window.location.search);
  const requestedLesson = urlParams.get('lesson');
  if (requestedLesson !== null && requestedLesson !== undefined && requestedLesson !== '') {
    let targetIndex = -1;
    const parsed = parseInt(requestedLesson, 10);
    if (!isNaN(parsed) && String(parsed) === requestedLesson.trim()) {
      targetIndex = parsed;
    } else {
      targetIndex = lessonsList.findIndex(
        (l) =>
          l.id === requestedLesson ||
          (l.title && l.title.toLowerCase().includes(requestedLesson.toLowerCase())),
      );
    }
    if (targetIndex >= 0 && targetIndex < lessonsList.length) {
      window.viewLessonDetail(targetIndex, null, true);
      return;
    }
  }

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
      <div style="position: relative; text-align: center; padding: 70px 24px 50px 24px; background-image: url('${heroImageUrl}'); background-size: cover; background-position: center; border-radius: 0;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.88));"></div>
        <div style="position: relative; z-index: 1; max-width: 900px; margin: 0 auto;">
          <h1 class="enquiry-title" style="font-family: 'Playfair Display', serif; font-size: clamp(1.65rem, 5.2vw, 2.7rem); line-height: 1.25; color: white; margin-bottom: 12px; text-shadow: 0 2px 4px rgba(0,0,0,0.5); hyphens: none; -webkit-hyphens: none; word-break: normal; overflow-wrap: normal; text-wrap: balance;">${data.enquiry_question || data.enquiry || 'Unit Enquiry'}</h1>
          <h2 style="font-size: clamp(1.05rem, 3.5vw, 1.35rem); color: #cbd5e1; font-weight: 500; margin-top: 0; margin-bottom: 0; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
            ${data.title}
          </h2>
          ${data.cover_caption ? `<p style="margin-top: 20px; margin-bottom: 0; font-style: italic; color: #94a3b8; font-size: 0.95rem; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto;">${data.cover_caption}</p>` : ''}
        </div>
      </div>
      ${renderCoverSourcesHTML(data, true) ? `<div style="padding: 20px 30px 0 30px; background: white;">${renderCoverSourcesHTML(data, true)}</div>` : ''}
    `;
  } else {
    headerHtml = `
      <div style="text-align: center; padding: 40px 24px 20px 24px; background: white; max-width: 900px; margin: 0 auto;">
        <h1 class="enquiry-title" style="font-family: 'Playfair Display', serif; font-size: clamp(1.65rem, 5.2vw, 2.7rem); line-height: 1.25; color: #1a237e; margin-bottom: 12px; hyphens: none; -webkit-hyphens: none; word-break: normal; overflow-wrap: normal; text-wrap: balance;">${data.enquiry_question || data.enquiry || 'Unit Enquiry'}</h1>
        <h2 style="font-size: clamp(1.05rem, 3.5vw, 1.35rem); color: #475569; font-weight: 500; margin-top: 0; margin-bottom: 24px;">
          ${data.title}
        </h2>
        
        ${renderCoverSourcesHTML(data)}
        
        ${data.cover_caption ? `<p style="margin-top: 5px; margin-bottom: 0; font-style: italic; color: #64748b; font-size: 0.95rem; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto;">${data.cover_caption}</p>` : ''}
      </div>
    `;
  }

  const isTrip = unitId === 'trip_ypres' || (data && data.type === 'trip');

  container.innerHTML = `
    <div class="card" style="animation: fadeInUp 0.3s ease-out; padding: 0; overflow: hidden; background: white;">
      ${headerHtml}
      
      <div style="padding: 30px; border-top: 1px solid #e2e8f0;">
        ${renderUnitSynopsis(data, unitId)}
        
        ${
          isTrip
            ? ''
            : `
          <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: white; border-radius: 12px; padding: 18px 24px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="background: rgba(245, 158, 11, 0.2); color: #fef08a; width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
                <i class="fa-solid fa-circle-question"></i>
              </div>
              <div>
                <h4 style="margin: 0; font-size: 1.05rem; color: #ffffff; font-family: 'Montserrat', sans-serif;">Interactive Quizzing &amp; Spaced Recall</h4>
                <p style="margin: 3px 0 0 0; font-size: 0.85rem; color: #cbd5e1;">Test your knowledge across all unit questions with timed diagnostic quizzes, 3-Box Leitner flashcards &amp; whiteboard drills.</p>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <button class="btn-pedagogy-primary" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #000; font-weight: 700; border: none; padding: 10px 18px; border-radius: 8px; font-size: 0.88rem; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35); transition: all 0.15s ease;" onclick="window.switchView('interactive', '${unitId}')" onmouseover="this.style.filter='brightness(1.1)';" onmouseout="this.style.filter='brightness(1)';">
                <i class="fa-solid fa-circle-question"></i>
                <span>Open Quizzing Arena</span>
              </button>
            </div>
          </div>
        `
        }
        
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

  if (window.scrollToTop) window.scrollToTop(true);
  else contentArea.scrollTo({ top: 0, behavior: 'smooth' });
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

  if (window.scrollToTop) window.scrollToTop(true);
  else contentArea.scrollTo({ top: 0, behavior: 'smooth' });
}

export async function renderBookletView() {
  const contentArea = document.getElementById('main-content');
  if (!contentArea) return;
  contentArea.innerHTML = '';

  const { renderWorkbooksZone } = await import('./workbooks_zone.js');
  renderWorkbooksZone(contentArea, state.activeUnitData);

  if (window.scrollToTop) window.scrollToTop(true);
  else contentArea.scrollTo({ top: 0, behavior: 'smooth' });
}

function playExamPacingChime(frequency = 659.25, duration = 1.0) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn('Audio chime unavailable:', e);
  }
}

function playDoubleChime() {
  playExamPacingChime(659.25, 0.7); // E5
  setTimeout(() => {
    playExamPacingChime(880, 1.2); // A5
  }, 300);
}

window.hubExamTimerState = window.hubExamTimerState || {
  interval: null,
  totalSeconds: 4800,
  initialSeconds: 4800,
  isRunning: false,
  soundEnabled: true,
};

window.toggleHubExamClock = function (action, defaultMinutes = 80) {
  const state = window.hubExamTimerState;
  const display = document.getElementById('hub-exam-clock-display');
  const startBtn = document.getElementById('hub-exam-clock-start');
  const pauseBtn = document.getElementById('hub-exam-clock-pause');
  const soundBtn = document.getElementById('hub-exam-clock-sound');
  const alertBanner = document.getElementById('hub-exam-clock-pacing-alert');

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const updateDisplay = () => {
    if (display) {
      display.textContent = formatTime(state.totalSeconds);
      if (state.totalSeconds === 0) {
        display.style.color = '#f87171';
        display.textContent = "00:00 (TIME'S UP)";
      } else if (state.totalSeconds <= 300) {
        display.style.color = '#facc15';
      } else {
        display.style.color = '#ffffff';
      }
    }
  };

  if (action === 'start') {
    if (state.isRunning) return;
    if (state.totalSeconds === 0) {
      state.totalSeconds = state.initialSeconds || defaultMinutes * 60;
    }
    state.isRunning = true;
    if (startBtn) startBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'inline-flex';

    if (state.interval) clearInterval(state.interval);
    state.interval = setInterval(() => {
      if (state.totalSeconds > 0) {
        state.totalSeconds--;
        updateDisplay();

        // Section A milestone check
        if (
          state.initialSeconds === 4800 &&
          (state.totalSeconds === 3300 || state.totalSeconds === 3000)
        ) {
          if (state.soundEnabled) playDoubleChime();
          if (alertBanner) {
            const secInfo =
              state.totalSeconds === 3300
                ? 'Section A (Western Front) complete &bull; 55m remaining for Section B (Thematic Study)'
                : 'Section A complete &bull; 50m remaining for Section B';
            alertBanner.innerHTML = `
              <div style="background: #000000; color: #ffffff; padding: 10px 18px; border-radius: 4px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; justify-content: space-between; gap: 12px; border: 2px solid #ffffff;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="background: #ffffff; color: #000000; padding: 2px 6px; font-weight: 800; font-size: 0.75rem; text-transform: uppercase;">PACING NOTICE</span>
                  <span><strong>SECTION TRANSITION:</strong> ${secInfo}</span>
                </div>
                <button type="button" onclick="this.parentElement.parentElement.style.display='none'" style="background: #374151; border: 1px solid #9ca3af; color: white; padding: 4px 10px; border-radius: 3px; cursor: pointer; font-size: 0.8rem; font-weight: 700;">Dismiss</button>
              </div>
            `;
            alertBanner.style.display = 'block';
          }
        }

        // 5-Minute warning check
        if (state.totalSeconds === 300) {
          if (state.soundEnabled) playDoubleChime();
          if (alertBanner) {
            alertBanner.innerHTML = `
              <div style="background: #000000; color: #ffffff; padding: 10px 18px; border-radius: 4px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; justify-content: space-between; gap: 12px; border: 2px solid #facc15;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="background: #facc15; color: #000000; padding: 2px 6px; font-weight: 800; font-size: 0.75rem; text-transform: uppercase;">WARNING</span>
                  <span><strong>5 MINUTES REMAINING:</strong> Conclude final evaluations, verify sustained criteria judgements, and check SPaG.</span>
                </div>
                <button type="button" onclick="this.parentElement.parentElement.style.display='none'" style="background: #374151; border: 1px solid #9ca3af; color: white; padding: 4px 10px; border-radius: 3px; cursor: pointer; font-size: 0.8rem; font-weight: 700;">Dismiss</button>
              </div>
            `;
            alertBanner.style.display = 'block';
          }
        }

        // Time's Up
        if (state.totalSeconds === 0) {
          if (state.soundEnabled) playDoubleChime();
          clearInterval(state.interval);
          state.interval = null;
          state.isRunning = false;
          if (alertBanner) {
            alertBanner.innerHTML = `
              <div style="background: #000000; color: #ffffff; padding: 12px 18px; border-radius: 4px; font-weight: 800; font-size: 0.95rem; display: flex; align-items: center; gap: 10px; border: 2px solid #ef4444;">
                <span style="background: #ef4444; color: #ffffff; padding: 3px 8px; font-weight: 900; font-size: 0.78rem; text-transform: uppercase;">EXAM CONCLUDED</span>
                <span>TIME IS UP: All pens down. Examination concluded.</span>
              </div>
            `;
            alertBanner.style.display = 'block';
          }
          if (startBtn) {
            startBtn.style.display = 'inline-flex';
            startBtn.textContent = 'Restart Clock';
          }
          if (pauseBtn) pauseBtn.style.display = 'none';
        }
      }
    }, 1000);
  } else if (action === 'pause') {
    if (!state.isRunning) return;
    clearInterval(state.interval);
    state.interval = null;
    state.isRunning = false;
    if (startBtn) {
      startBtn.style.display = 'inline-flex';
      startBtn.textContent = 'Resume Clock';
    }
    if (pauseBtn) pauseBtn.style.display = 'none';
  } else if (action === 'reset') {
    if (state.interval) clearInterval(state.interval);
    state.interval = null;
    state.isRunning = false;
    state.totalSeconds = defaultMinutes * 60;
    state.initialSeconds = defaultMinutes * 60;
    updateDisplay();
    if (alertBanner) alertBanner.style.display = 'none';
    if (startBtn) {
      startBtn.style.display = 'inline-flex';
      startBtn.textContent = 'Start Clock';
    }
    if (pauseBtn) pauseBtn.style.display = 'none';
  } else if (action === 'add5') {
    state.totalSeconds += 300;
    updateDisplay();
  } else if (action === 'add20') {
    state.totalSeconds += 1200;
    updateDisplay();
  } else if (action === 'toggleSound') {
    state.soundEnabled = !state.soundEnabled;
    if (soundBtn) {
      soundBtn.textContent = state.soundEnabled ? '🔊 Sound: On' : '🔇 Sound: Off';
    }
  }
};

window.toggleHubTimingStrategy = function () {
  const drawer = document.getElementById('hub-timing-strategy-drawer');
  const arrow = document.getElementById('hub-strategy-arrow');
  if (!drawer) return;
  const isHidden = drawer.style.display === 'none' || drawer.style.display === '';
  drawer.style.display = isHidden ? 'block' : 'none';
  if (arrow) {
    arrow.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
  }
};

window.setHubExamClockMinutes = function (mins, label) {
  mins = parseInt(mins, 10);
  if (isNaN(mins) || mins <= 0) return;
  const state = window.hubExamTimerState;
  if (state.interval) {
    clearInterval(state.interval);
    state.interval = null;
    state.isRunning = false;
  }
  state.totalSeconds = mins * 60;
  state.initialSeconds = state.totalSeconds;

  const display = document.getElementById('hub-exam-clock-display');
  const startBtn = document.getElementById('hub-exam-clock-start');
  const pauseBtn = document.getElementById('hub-exam-clock-pause');
  if (display) {
    const m = Math.floor(state.totalSeconds / 60);
    const s = state.totalSeconds % 60;
    display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    display.style.color = '#38bdf8';
  }
  if (startBtn) {
    startBtn.style.display = 'none';
  }
  if (pauseBtn) {
    pauseBtn.style.display = 'inline-flex';
  }
  window.toggleHubExamClock('start', mins);
};

function getHubTimingStrategyRows(unitId) {
  let rows = [];
  if (unitId === 'cme_new') {
    rows = [
      {
        tariff: '4 Marks (×2)',
        type: 'Explain one consequence of... (Q1a & Q1b)',
        totalTime: '6 mins each',
        planSplit: '<strong>1 min</strong> identify 1 direct consequence + context',
        writeSplit:
          '<strong>5 mins</strong> single sustained analytical paragraph with precise factual detail',
        actionMins: 6,
        actionLabel: '4-Mark Consequence (6m)',
      },
      {
        tariff: '8 Marks',
        type: 'Write a narrative account analysing... (Q2)',
        totalTime: '14 mins',
        planSplit:
          '<strong>2 mins</strong> outline 3-phase chronological flow (start &rarr; dev &rarr; outcome)',
        writeSplit:
          '<strong>12 mins</strong> 3 linked analytical paragraphs showing causation and change',
        actionMins: 14,
        actionLabel: '8-Mark Narrative (14m)',
      },
      {
        tariff: '8 Marks',
        type: 'Explain the importance of [Choice 1] for... (Q3 Option 1)',
        totalTime: '14 mins',
        planSplit: '<strong>2 mins</strong> define criteria + 2 distinct impacts/consequences',
        writeSplit:
          '<strong>12 mins</strong> 2 structured analytical paragraphs evaluating significance',
        actionMins: 14,
        actionLabel: '8-Mark Importance Choice 1 (14m)',
      },
      {
        tariff: '8 Marks',
        type: 'Explain the importance of [Choice 2] for... (Q3 Option 2)',
        totalTime: '14 mins',
        planSplit: '<strong>2 mins</strong> define criteria + 2 distinct impacts/consequences',
        writeSplit:
          '<strong>12 mins</strong> 2 structured analytical paragraphs evaluating significance',
        actionMins: 14,
        actionLabel: '8-Mark Importance Choice 2 (14m)',
      },
    ];
  } else if (unitId === 'eee') {
    rows = [
      {
        tariff: '2 Marks (×2)',
        type: 'Describe one feature of... (Q1a & Q1b)',
        totalTime: '3 mins each',
        planSplit: '<strong>30s</strong> target feature recall',
        writeSplit:
          '<strong>2.5m</strong> 2 precise sentences (feature identification + supporting detail)',
        actionMins: 3,
        actionLabel: '2-Mark Feature (3m)',
      },
      {
        tariff: '12 Marks',
        type: 'Explain why... (Causation / Analytical Account - Q2)',
        totalTime: '18 mins',
        planSplit: '<strong>3 mins</strong> select 3 distinct causes (2 stimulus + 1 own point)',
        writeSplit: '<strong>15 mins</strong> 3 PEEL paragraphs with sustained causal links',
        actionMins: 18,
        actionLabel: '12-Mark Causation (18m)',
      },
      {
        tariff: '16 Marks',
        type: 'Statement Evaluation Essay ("How far do you agree?" - Q3 or Q4)',
        totalTime: '25 mins',
        planSplit: '<strong>5 mins</strong> define criteria + balance arguments + reach judgement',
        writeSplit:
          '<strong>20 mins</strong> Intro + Agree argument + Counter argument + Justified Judgement',
        actionMins: 25,
        actionLabel: '16-Mark Essay (25m)',
      },
    ];
  } else if (unitId === 'edexcel_medicine') {
    rows = [
      {
        tariff: '2 Marks (×2)',
        type: 'Describe one feature of... (Sec A: Western Front - Q1a & Q1b)',
        totalTime: '3 mins each',
        planSplit: '<strong>30s</strong> target feature recall',
        writeSplit:
          '<strong>2.5m</strong> 2 precise sentences (feature + clinical/contextual detail)',
        actionMins: 3,
        actionLabel: '2-Mark Feature (3m)',
      },
      {
        tariff: '8 Marks',
        type: 'How useful are Sources A and B for an enquiry into... (Sec A: Q2a)',
        totalTime: '12 mins',
        planSplit: '<strong>2 mins</strong> annotate provenance (NOP) + own knowledge context',
        writeSplit:
          '<strong>10 mins</strong> 2 balanced paragraphs evaluating utility on content and NOP',
        actionMins: 12,
        actionLabel: '8-Mark Utility (12m)',
      },
      {
        tariff: '4 Marks',
        type: 'How could you follow up Source B... (Sec A: Q2b Table)',
        totalTime: '5 mins',
        planSplit: '<strong>1 min</strong> select specific detail from Source B to investigate',
        writeSplit:
          '<strong>4 mins</strong> complete 4-part enquiry table: detail, question, source, purpose',
        actionMins: 5,
        actionLabel: '4-Mark Follow-up (5m)',
      },
      {
        tariff: '4 Marks',
        type: 'Explain one similarity or difference between two eras (Sec B: Q3)',
        totalTime: '6 mins',
        planSplit:
          '<strong>1 min</strong> identify precise historical criteria across both periods',
        writeSplit:
          '<strong>5 mins</strong> single sustained comparative paragraph with cross-era evidence',
        actionMins: 6,
        actionLabel: '4-Mark Comparison (6m)',
      },
      {
        tariff: '12 Marks',
        type: 'Explain why... (Causation / Analytical Account - Sec B: Q4)',
        totalTime: '18 mins',
        planSplit: '<strong>3 mins</strong> select 3 distinct factors (2 stimulus + 1 own point)',
        writeSplit:
          '<strong>15 mins</strong> 3 PEEL paragraphs with causal links and impact analysis',
        actionMins: 18,
        actionLabel: '12-Mark Causation (18m)',
      },
      {
        tariff: '16+4 Marks',
        type: 'Statement Evaluation Essay ("How far do you agree?" - Sec B: Q5 or Q6)',
        totalTime: '26 mins',
        planSplit: '<strong>5 mins</strong> define criteria + balance both sides + plan judgement',
        writeSplit:
          '<strong>21 mins</strong> Intro + Agree + Counter + Justified Judgement + SPaG check',
        actionMins: 26,
        actionLabel: '16+4 Mark Essay (26m)',
      },
    ];
  } else {
    // Paper 3 Modern Depth Study: USA 1954-75 & Weimar and Nazi Germany
    rows = [
      {
        tariff: '4 Marks',
        type: 'Give two things you can infer from Source A... (Sec A: Q1)',
        totalTime: '5 mins',
        planSplit: '<strong>1 min</strong> identify quotes and details in Source A',
        writeSplit: '<strong>4 mins</strong> 2 separate inference + evidence pairs (2× 2 marks)',
        actionMins: 5,
        actionLabel: '4-Mark Inference (5m)',
      },
      {
        tariff: '12 Marks',
        type: 'Explain why... (Causation / Analytical Account - Sec A: Q2)',
        totalTime: '18 mins',
        planSplit: '<strong>3 mins</strong> select 3 distinct causes (2 stimulus + 1 own point)',
        writeSplit: '<strong>15 mins</strong> 3 PEEL paragraphs with sustained causal links',
        actionMins: 18,
        actionLabel: '12-Mark Causation (18m)',
      },
      {
        tariff: '8 Marks',
        type: 'How useful are Sources B and C for an enquiry into... (Sec B: Q3a)',
        totalTime: '12 mins',
        planSplit: '<strong>2 mins</strong> annotate provenance (NOP) + own knowledge context',
        writeSplit:
          '<strong>10 mins</strong> 2 balanced paragraphs evaluating utility on content and NOP',
        actionMins: 12,
        actionLabel: '8-Mark Utility (12m)',
      },
      {
        tariff: '4 Marks',
        type: 'What is the main difference between Interpretations 1 and 2? (Sec B: Q3b)',
        totalTime: '5 mins',
        planSplit:
          '<strong>1 min</strong> compare historical perspectives in Interpretations 1 & 2',
        writeSplit:
          '<strong>4 mins</strong> identify primary divergence supported by direct quotations',
        actionMins: 5,
        actionLabel: '4-Mark Difference (5m)',
      },
      {
        tariff: '4 Marks',
        type: 'Suggest one reason why Interpretations 1 and 2 give different views (Sec B: Q3c)',
        totalTime: '5 mins',
        planSplit: '<strong>1 min</strong> match with Sources B/C or author focus/emphasis',
        writeSplit:
          '<strong>4 mins</strong> explain reason for divergence (different sources/motives)',
        actionMins: 5,
        actionLabel: '4-Mark Reason (5m)',
      },
      {
        tariff: '16+4 Marks',
        type: 'How far do you agree with Interpretation 2... (Sec B: Q3d)',
        totalTime: '27 mins',
        planSplit:
          '<strong>5 mins</strong> define criteria + balance views against Interpretation 1',
        writeSplit:
          '<strong>22 mins</strong> Intro + evaluate Int 2 + evaluate Int 1/context + Judgement + SPaG',
        actionMins: 27,
        actionLabel: '16+4 Mark Essay (27m)',
      },
    ];
  }

  return rows
    .map((row, idx) => {
      const isLast = idx === rows.length - 1;
      const borderStyle = isLast ? '' : 'border-bottom: 1px solid #1f2937;';
      return `<tr style="${borderStyle}">
        <td style="padding: 8px 12px; font-weight: 800; color: #38bdf8;">${row.tariff}</td>
        <td style="padding: 8px 12px; color: #e5e7eb;">${row.type}</td>
        <td style="padding: 8px 12px; font-weight: 700; color: #facc15;">${row.totalTime}</td>
        <td style="padding: 8px 12px; color: #9ca3af;">${row.planSplit}</td>
        <td style="padding: 8px 12px; color: #d1d5db;">${row.writeSplit}</td>
        <td style="padding: 8px 12px; text-align: right;">
          <button type="button" onclick="window.setHubExamClockMinutes(${row.actionMins}, '${row.actionLabel}')" style="background: #111827; color: #38bdf8; border: 1px solid #0284c7; padding: 4px 8px; border-radius: 3px; font-weight: 700; font-size: 0.72rem; cursor: pointer;">⏱ Time (${row.actionMins}m)</button>
        </td>
      </tr>`;
    })
    .join('\n');
}

export async function renderMockExamsView() {
  const contentArea = document.getElementById('main-content');
  if (!contentArea) return;
  contentArea.innerHTML = '';
  contentArea.style.paddingTop = '0';

  const unitData = state.activeUnitData || {};
  const unitId = state.selectedUnitId || window.currentUnitId || 'cme_new';
  const mocks = unitData.mock_exams || [];

  if (!mocks || mocks.length === 0) {
    contentArea.innerHTML = `
      <div style="padding: 40px; text-align: center; background: #ffffff; border: 2px solid #000000; border-radius: 4px; margin: 40px auto; max-width: 800px;">
        <h2 style="color: #000000; margin-top: 0; font-family: 'Outfit', sans-serif;">No Mock Exam Papers Registered</h2>
        <p style="color: #374151; font-size: 1rem;">There are currently no mock exam papers registered for this unit.</p>
        <button class="btn" data-action="switch-view" data-view="dashboard" style="margin-top: 15px; padding: 10px 20px; background: #000000; color: #ffffff; border: 2px solid #000000; border-radius: 4px; cursor: pointer; font-weight: 700;">Back to Dashboard</button>
      </div>
    `;
    return;
  }

  // Determine unit-specific exam metadata
  let specTitle = 'Edexcel GCSE (9–1) History';
  let specPaperRef = '1HI0';
  let defaultTime = '1 Hour 20 Mins';
  let defaultMarks = '52 Marks';
  let pacingSummary = 'Section A: 28 mins &bull; Section B: 52 mins';

  if (unitId === 'cme_new') {
    specTitle = 'Paper 2: Conflict in the Middle East, 1945–1995';
    specPaperRef = '1HI0/21';
    defaultTime = '55 Minutes';
    defaultMarks = '32 Marks';
    pacingSummary =
      'Total Exam Duration: 55 mins &bull; Q1(a)/(b) Consequence (6m each) &bull; Q2 Narrative (14m) &bull; Q3 Importance (2× 14m)';
  } else if (unitId === 'weimar_nazi_germany') {
    specTitle = 'Paper 3: Weimar and Nazi Germany, 1918–1939';
    specPaperRef = '1HI0/31';
    defaultTime = '1 Hour 20 Mins';
    defaultMarks = '52 Marks + 4 SPaG';
    pacingSummary =
      'Section A: 28 mins (Q1 5m, Q2 18m) &bull; Section B: 52 mins (Q3a 12m, Q3b 5m, Q3c 5m, Q3d 27m)';
  } else if (unitId === 'eee') {
    specTitle = 'Paper 2: Early Elizabethan England, 1558–1588';
    specPaperRef = '1HI0/B4';
    defaultTime = '55 Minutes';
    defaultMarks = '32 Marks';
    pacingSummary =
      'Total Exam Duration: 55 mins &bull; Q1(a)/(b) Features (3m each) &bull; Q2 Causation (18m) &bull; Q3/4 Essay (25m)';
  } else if (unitId === 'edexcel_medicine') {
    specTitle = 'Paper 1: Medicine in Britain, c1250–present and Western Front';
    specPaperRef = '1HI0/11';
    defaultTime = '1 Hour 20 Mins';
    defaultMarks = '52 Marks + 4 SPaG';
    pacingSummary = 'Section A (Western Front): 25 mins &bull; Section B (Thematic Study): 55 mins';
  } else if (unitId === 'usa') {
    specTitle = 'Paper 3: Conflict at Home and Abroad: the USA, 1954–75';
    specPaperRef = '1HI0/33';
    defaultTime = '1 Hour 20 Mins';
    defaultMarks = '52 Marks + 4 SPaG';
    pacingSummary = 'Section A (Civil Rights): 28 mins &bull; Section B (Vietnam): 52 mins';
  }

  const defaultMins = defaultTime.includes('55') ? 55 : 80;
  if (window.hubExamTimerState && window.hubExamTimerState.interval) {
    clearInterval(window.hubExamTimerState.interval);
  }
  window.hubExamTimerState = {
    interval: null,
    totalSeconds: defaultMins * 60,
    initialSeconds: defaultMins * 60,
    isRunning: false,
    soundEnabled: true,
  };

  let html = `
    <!-- Docked Top Invigilator Toolbar -->
    <div id="docked-invigilator-hud" style="position: sticky; top: 0; z-index: 1000; background: #000000; color: #ffffff; border-bottom: 2px solid #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.5); padding: 12px 24px;">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 18px;">
          <div>
            <div style="font-size: 0.68rem; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #9ca3af;">
              PEARSON EXAM HALL CLOCK &bull; ${specPaperRef}
            </div>
            <div id="hub-exam-clock-display" style="font-size: 1.95rem; font-weight: 800; font-family: 'Courier New', Courier, monospace; letter-spacing: 2px; color: #ffffff; line-height: 1.05; margin-top: 2px;">
              ${defaultMins === 55 ? '55:00' : '01:20:00'}
            </div>
          </div>
          <div style="border-left: 1px solid #374151; padding-left: 16px; font-size: 0.78rem; color: #d1d5db; line-height: 1.4;">
            <div style="font-weight: 800; color: #ffffff; text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.5px;">Pacing Schedule</div>
            <div>${pacingSummary}</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button type="button" class="btn" id="hub-exam-clock-start" onclick="window.toggleHubExamClock('start', ${defaultMins})" style="background: #ffffff; color: #000000; padding: 7px 18px; border-radius: 3px; font-weight: 800; font-size: 0.85rem; border: 2px solid #ffffff; cursor: pointer;">
            Start Clock
          </button>
          <button type="button" class="btn" id="hub-exam-clock-pause" onclick="window.toggleHubExamClock('pause')" style="background: #facc15; color: #000000; padding: 7px 14px; border-radius: 3px; font-weight: 800; font-size: 0.85rem; border: 2px solid #facc15; cursor: pointer; display: none;">
            Pause
          </button>
          <button type="button" class="btn" id="hub-exam-clock-reset" onclick="window.toggleHubExamClock('reset', ${defaultMins})" style="background: transparent; color: #d1d5db; padding: 7px 12px; border-radius: 3px; font-weight: 700; font-size: 0.82rem; border: 1.5px solid #4b5563; cursor: pointer;">
            Reset
          </button>
          <button type="button" class="btn" onclick="window.toggleHubExamClock('add5')" style="background: transparent; color: #ffffff; border: 1.5px solid #6b7280; padding: 7px 11px; border-radius: 3px; font-weight: 700; font-size: 0.82rem; cursor: pointer;" title="Add 5 Minutes Extra Time">
            +5m
          </button>
          <button type="button" class="btn" onclick="window.toggleHubExamClock('add20')" style="background: transparent; color: #ffffff; border: 1.5px solid #6b7280; padding: 7px 11px; border-radius: 3px; font-weight: 700; font-size: 0.82rem; cursor: pointer;" title="Add 20 Minutes (25% Access Arrangements)">
            +20m (25%)
          </button>
          <button type="button" class="btn" id="hub-exam-clock-sound" onclick="window.toggleHubExamClock('toggleSound')" style="background: transparent; color: #ffffff; border: 1.5px solid #6b7280; padding: 7px 11px; border-radius: 3px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
            🔊 Sound: On
          </button>
          <button type="button" class="btn" id="hub-timing-strategy-btn" onclick="window.toggleHubTimingStrategy()" style="background: #111827; color: #38bdf8; border: 1.5px solid #0284c7; padding: 7px 14px; border-radius: 3px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="View Exam Timing Strategy & Pacing Breakdown">
            <span>⏱ Timing Strategy</span> <span id="hub-strategy-arrow" style="font-size: 9px; transition: transform 0.2s ease;">▼</span>
          </button>
        </div>
      </div>
      <div id="hub-exam-clock-pacing-alert" style="max-width: 1200px; margin: 10px auto 0 auto; display: none;"></div>

      <!-- Collapsible Timing Strategy Drawer (Pacing Matrix: 1 Mark ≈ 1.25 Mins) -->
      <div id="hub-timing-strategy-drawer" style="display: none; max-width: 1200px; margin: 12px auto 0 auto; border-top: 1px solid #374151; padding-top: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
          <div>
            <div style="font-size: 0.78rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.8px;">
              ⏱ Pearson GCSE History &bull; Exam Timing Strategy &amp; Pacing Matrix
            </div>
            <div style="font-size: 0.78rem; color: #d1d5db; margin-top: 2px;">
              <strong>The Golden Rule:</strong> 1 Mark &asymp; 1.25 Minutes. Protect your marks by adhering strictly to the recommended planning vs. writing splits below.
            </div>
          </div>
          <div style="font-size: 0.72rem; color: #9ca3af; background: #111827; padding: 4px 10px; border-radius: 3px; border: 1px solid #374151;">
            💡 Tip: Click any row's <strong>[⏱ Time (Xm)]</strong> button to set the invigilator clock immediately.
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.78rem; text-align: left; background: #000000; border: 1px solid #374151; border-radius: 4px;">
            <thead>
              <tr style="background: #111827; color: #93c5fd; border-bottom: 1px solid #374151; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.5px;">
                <th style="padding: 8px 12px;">Tariff</th>
                <th style="padding: 8px 12px;">Question Type (Edexcel Specification)</th>
                <th style="padding: 8px 12px;">Total Time</th>
                <th style="padding: 8px 12px;">Planning &amp; Prep Split</th>
                <th style="padding: 8px 12px;">Writing &amp; Evidence Split</th>
                <th style="padding: 8px 12px; text-align: right;">Quick Action</th>
              </tr>
            </thead>
            <tbody>
              ${getHubTimingStrategyRows(unitId)}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div style="max-width: 1200px; margin: 0 auto; padding: 25px 15px 40px 15px;">
      <!-- Pearson Examination Official Masthead -->
      <div style="background: #ffffff; color: #000000; border: 2px solid #000000; border-radius: 4px; padding: 26px 30px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #000000; padding-bottom: 12px; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="font-size: 0.78rem; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #000000;">
              PEARSON EDEXCEL GCSE (9–1) HISTORY
            </div>
            <h1 style="margin: 4px 0 0 0; font-size: 1.9rem; font-weight: 900; line-height: 1.2; font-family: 'Outfit', sans-serif; color: #000000;">
              Official Mock Examination Papers
            </h1>
          </div>
          <div style="text-align: right;">
            <span style="display: inline-block; background: #000000; color: #ffffff; font-weight: 800; font-size: 0.75rem; letter-spacing: 1px; padding: 4px 10px; text-transform: uppercase;">
              ${specPaperRef} &bull; ${defaultTime.toUpperCase()}
            </span>
            <div style="font-size: 0.82rem; font-weight: 700; color: #000000; margin-top: 4px;">
              ${mocks.length} Practice Papers Available
            </div>
          </div>
        </div>
        <div style="font-size: 1rem; font-weight: 700; color: #000000; margin-bottom: 6px;">
          ${specTitle}
        </div>
        <p style="margin: 0; font-size: 0.92rem; color: #111827; max-width: 900px; line-height: 1.5;">
          Authentic past-paper format replicas featuring full source booklets, question papers, and comprehensive teacher mark schemes. Calibrated for timed exam hall conditions or commercial A4 printing.
        </p>
      </div>

      <!-- Sub Navigation Tabs: High-Contrast Monochrome -->
      <div style="display: flex; gap: 8px; margin-bottom: 24px; border-bottom: 2px solid #000000; padding-bottom: 2px; overflow-x: auto;">
        <button id="tab-btn-official-mocks" class="btn" style="background: #000000; color: #ffffff; border: 2px solid #000000; border-bottom: none; padding: 10px 20px; border-radius: 4px 4px 0 0; font-weight: 800; cursor: pointer; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
          Official Mock Exam Papers
        </button>
        <button id="tab-btn-trend-radar" class="btn" style="background: #ffffff; color: #000000; border: 2px solid #000000; border-bottom: none; padding: 10px 20px; border-radius: 4px 4px 0 0; font-weight: 700; cursor: pointer; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
          2018–2026 Past Paper Matrix &amp; Overdue Radar
        </button>
      </div>

      <div id="mock-papers-wrapper">
        <!-- Assessment Specification Quick Audit -->
        <div style="background: #ffffff; border: 2px solid #000000; border-radius: 4px; padding: 16px 20px; margin-bottom: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px;">
          <div>
            <div style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: #000000; letter-spacing: 1px;">Exam Timing</div>
            <div style="font-size: 1.1rem; font-weight: 900; color: #000000; margin-top: 2px;">${defaultTime}</div>
          </div>
          <div>
            <div style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: #000000; letter-spacing: 1px;">Total Marks</div>
            <div style="font-size: 1.1rem; font-weight: 900; color: #000000; margin-top: 2px;">${defaultMarks}</div>
          </div>
          <div>
            <div style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: #000000; letter-spacing: 1px;">Print Format</div>
            <div style="font-size: 1.1rem; font-weight: 900; color: #000000; margin-top: 2px;">A4 Exam Replicas</div>
          </div>
          <div>
            <div style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: #000000; letter-spacing: 1px;">Marking Support</div>
            <div style="font-size: 1.1rem; font-weight: 900; color: #000000; margin-top: 2px;">Full Indicative Content</div>
          </div>
        </div>

        <!-- Mock Papers Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
  `;

  mocks.forEach((mock, idx) => {
    const paperUrl = mock.url || `${mock.id}.html`;
    const fullPaperUrl = paperUrl.startsWith('/') ? paperUrl : `/units/${unitId}/${paperUrl}`;

    const hasMs = Boolean(
      mock.has_mark_scheme ||
      mock.mark_scheme_url ||
      unitId === 'weimar_nazi_germany' ||
      unitId === 'eee' ||
      unitId === 'usa' ||
      (unitId === 'edexcel_medicine' && mock.id !== 'mock_2025_clone'),
    );
    const msFileName =
      mock.mark_scheme_url || `${paperUrl.replace(/\.html$/, '')}_mark_scheme.html`;
    const fullMsUrl = msFileName.startsWith('/') ? msFileName : `/units/${unitId}/${msFileName}`;

    const isRadarMock =
      mock.title.includes('Radar') ||
      mock.title.includes('Heat Map') ||
      mock.title.includes('Forecast');
    const badgeText = mock.title.includes('NotebookLM')
      ? 'PREDICTION MODEL'
      : isRadarMock
        ? 'RADAR SPEC GAP'
        : `MOCK PAPER ${idx + 1}`;

    html += `
      <div style="background: #ffffff; border: 2px solid #000000; border-radius: 4px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 14px;">
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-size: 0.7rem; font-weight: 800; background: #000000; color: #ffffff; padding: 3px 8px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.5px;">
              ${badgeText}
            </span>
            <span style="font-size: 0.8rem; font-weight: 800; color: #000000;">
              ${mock.paper_reference || specPaperRef}
            </span>
          </div>

          <h3 style="margin: 8px 0 10px 0; color: #000000; font-size: 1.15rem; font-weight: 800; line-height: 1.35; font-family: 'Outfit', sans-serif;">
            ${mock.title}
          </h3>

          ${
            isRadarMock
              ? `
            <div style="font-size: 0.78rem; color: #000000; background: #f9fafb; border: 1.5px solid #000000; border-radius: 3px; padding: 8px 10px; margin-bottom: 12px; line-height: 1.45; font-style: italic;">
              <strong>Topic Forecast:</strong> Target questions calibrated against 100% unexamined syllabus criteria across 2018–2026.
            </div>
          `
              : ''
          }

          <div style="background: #f4f4f5; border: 1px solid #d1d5db; border-radius: 3px; padding: 8px 12px; font-size: 0.82rem; color: #000000; margin-bottom: 12px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 6px; font-weight: 600;">
            <span><strong>Time:</strong> ${mock.time_minutes ? mock.time_minutes + ' mins' : defaultTime}</span>
            <span><strong>Marks:</strong> ${mock.total_marks ? mock.total_marks + ' marks' : defaultMarks}</span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <a href="${fullPaperUrl}" target="_blank" style="text-align: center; text-decoration: none; background: #000000; color: #ffffff; border: 2px solid #000000; padding: 10px 14px; border-radius: 4px; font-size: 0.88rem; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.15s ease;" onmouseover="this.style.background='#27272a'; this.style.borderColor='#27272a';" onmouseout="this.style.background='#000000'; this.style.borderColor='#000000';">
            Open Question Paper
          </a>

          ${
            hasMs
              ? `
            <a href="${fullMsUrl}" target="_blank" style="text-align: center; text-decoration: none; background: #ffffff; color: #000000; border: 2px solid #000000; padding: 9px 14px; border-radius: 4px; font-size: 0.85rem; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.15s ease;" onmouseover="this.style.background='#f4f4f5';" onmouseout="this.style.background='#ffffff';">
              Teacher Mark Scheme
            </a>
          `
              : `
            <div style="font-size: 0.75rem; color: #4b5563; text-align: center; font-style: italic; padding: 4px 0;">
              Model answers integrated in study bank
            </div>
          `
          }
        </div>
      </div>
    `;
  });

  html += `
        </div>
      </div> <!-- End #mock-papers-wrapper -->

      <!-- Past Paper Question Matrix & Overdue Radar Container -->
      <div id="mock-trend-matrix-container" style="display: none;"></div>

      <!-- Bottom Actions Bar -->
      <div style="margin-top: 35px; padding-top: 20px; border-top: 2px solid #000000; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <button class="btn" data-action="switch-view" data-view="lessons" data-unit="${unitId}" style="padding: 9px 18px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-weight: 700; background: #ffffff; color: #000000; border: 2px solid #000000;">
          &larr; Return to Lessons
        </button>
        <button class="btn" data-action="switch-view" data-view="booklet" data-unit="${unitId}" style="padding: 9px 18px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-weight: 700; background: #000000; color: #ffffff; border: 2px solid #000000;">
          Visit Print &amp; PDF Hub
        </button>
      </div>
    </div>
  `;

  contentArea.innerHTML = html;

  // Sub Navigation Tabs Logic
  const tabBtnMocks = document.getElementById('tab-btn-official-mocks');
  const tabBtnTrend = document.getElementById('tab-btn-trend-radar');
  const mockWrapper = document.getElementById('mock-papers-wrapper');
  const trendContainer = document.getElementById('mock-trend-matrix-container');

  if (tabBtnMocks && tabBtnTrend) {
    tabBtnMocks.addEventListener('click', () => {
      tabBtnMocks.style.background = '#000000';
      tabBtnMocks.style.color = '#ffffff';
      tabBtnTrend.style.background = '#ffffff';
      tabBtnTrend.style.color = '#000000';
      if (mockWrapper) mockWrapper.style.display = 'block';
      if (trendContainer) trendContainer.style.display = 'none';
    });

    tabBtnTrend.addEventListener('click', async () => {
      tabBtnTrend.style.background = '#000000';
      tabBtnTrend.style.color = '#ffffff';
      tabBtnMocks.style.background = '#ffffff';
      tabBtnMocks.style.color = '#000000';
      if (mockWrapper) mockWrapper.style.display = 'none';
      if (trendContainer) {
        trendContainer.style.display = 'block';
        const { renderExamTrendMatrix } = await import('./exam_trend_matrix.js');
        renderExamTrendMatrix(trendContainer, unitId);
      }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const targetTab = urlParams.get('tab');
    const curView = urlParams.get('view');
    if (
      targetTab === 'radar' ||
      targetTab === 'trend' ||
      targetTab === 'matrix' ||
      curView === 'trend-radar' ||
      curView === 'matrix'
    ) {
      tabBtnTrend.click();
    }
  }

  if (window.scrollToTop) window.scrollToTop(true);
  else contentArea.scrollTo({ top: 0, behavior: 'smooth' });
}

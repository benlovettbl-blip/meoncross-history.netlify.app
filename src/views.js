/**
 * Views Renderer for Mr Lovett's History Hub Mega App
 * Handles rendering the Dashboard, Interactive Quizzes, Timelines, Printable Booklets, and Student Profiles.
 */

import { state } from './state.js';
import { getProfile, setMockUser } from './auth.js';
import { getMasteryStatus, updateLeitnerBox, toggleBookmark, saveProgress } from './storage.js';
import { renderCoverSourcesHTML } from './cover_sources.js';
import { renderKeyTopicLessonsHTML } from './lesson_cards.js';
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
              <span style="font-size: 0.72rem; font-weight: 700; color: #92400e;">Hampshire History Awards</span>
            </div>
            <div style="font-size: 0.92rem; font-weight: 700; color: #78350f;">
              Win £100 cash &amp; £300 for Department
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
              <span style="font-size: 0.72rem; font-weight: 700; color: #6d28d9;">Meoncross Chess Club</span>
            </div>
            <div style="font-size: 0.92rem; font-weight: 700; color: #4c1d95;">
              House League · Every Game Earns Points
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
              <span style="background: rgba(59,130,246,0.1); color: #2563eb; padding: 3px 10px; border-radius: 20px; font-weight: 600; font-size: 0.75rem; white-space:nowrap;"><i class="fa-solid fa-calendar-days"></i> 1st–3rd Oct 2026 (3 Days)</span>
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

      <!-- Quiet Secondary Drawer: Printable Materials & The Vault -->
      <details style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
        <summary style="font-weight: 700; color: #1e293b; font-size: 0.92rem; cursor: pointer; display: flex; align-items: center; justify-content: space-between; outline: none; user-select: none;">
          <span style="display: inline-flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-folder-open" style="color: #6366f1;"></i>
            <span>Printable A4 Workbooks &amp; Mastery Key Vault</span>
          </span>
          <span style="font-size: 0.76rem; color: #64748b; font-weight: 600; background: #f1f5f9; padding: 2px 10px; border-radius: 999px;">
            ${workbooks.length} ${workbooks.length === 1 ? 'Deck' : 'Decks'} Available ▾
          </span>
        </summary>

        <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid #f1f5f9;">
          <p style="margin: 0 0 14px 0; font-size: 0.85rem; color: #64748b; line-height: 1.4;">
            Physical booklets and scratch-off answer keys for homework assignments or structured intervention sessions:
          </p>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${workbooks
              .map((wb, idx) => {
                const wbId = wb.name || wb.id;
                const isFull = wbId === 'full';
                const htmlUrl = `/units/${unitId}/mastery_pack_${wbId}.html`;
                const pdfUrl = `/pdfs/${unitId}_mastery_pack_${wbId}_FINAL_V17.pdf`;
                return `
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="background: ${isFull ? '#e0e7ff' : '#f1f5f9'}; color: ${isFull ? '#4338ca' : '#475569'}; font-size: 0.72rem; font-weight: 700; padding: 2px 8px; border-radius: 4px;">
                      ${isFull ? 'All Lessons' : `Topic ${idx + 1}`}
                    </span>
                    <strong style="color: #1e293b; font-size: 0.88rem;">${wb.title || wb.name}</strong>
                  </div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <a href="${htmlUrl}" target="_blank" style="text-decoration: none; background: white; border: 1px solid #cbd5e1; color: #334155; padding: 5px 10px; border-radius: 6px; font-weight: 600; font-size: 0.78rem; display: inline-flex; align-items: center; gap: 5px;" onmouseover="this.style.background='#f1f5f9';" onmouseout="this.style.background='white';">
                      <i class="fa-solid fa-lock" style="color: #d97706;"></i> The Vault Key
                    </a>
                    <a href="${pdfUrl}" target="_blank" style="text-decoration: none; background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 5px 10px; border-radius: 6px; font-weight: 600; font-size: 0.78rem; display: inline-flex; align-items: center; gap: 5px;" onmouseover="this.style.background='#fee2e2';" onmouseout="this.style.background='#fef2f2';">
                      <i class="fa-solid fa-file-pdf" style="color: #dc2626;"></i> Print A4 PDF
                    </a>
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>
        </div>
      </details>

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

  window.viewLessonDetail = function (index, targetStopId = null) {
    const lessonsList = data.lessons || data.subtopics;
    const sub = lessonsList[index];

    // Inject the content-area wrapper if it doesn't exist, since the legacy renderer expects it!
    container.innerHTML = `
      <div id="content-area" style="animation: fadeInUp 0.3s ease-out; background-color: var(--bg-app); min-height: 100vh;">
      </div>
    `;

    // Call the legacy Netlify app's beautifully formatted lesson renderer!
    renderLesson(sub);
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
      window.viewLessonDetail(targetIndex);
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
      <div style="padding: 20px 30px 0 30px; background: white;">
        ${renderCoverSourcesHTML(data, true)}
      </div>
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
          <p class="text-muted" style="margin-bottom: 24px;">Read through the core steps, historical sources, and historian's tips for each lesson before testing yourself.</p>
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
};

window.toggleHubExamClock = function (action, defaultMinutes = 80) {
  const state = window.hubExamTimerState;
  const display = document.getElementById('hub-exam-clock-display');
  const startBtn = document.getElementById('hub-exam-clock-start');
  const pauseBtn = document.getElementById('hub-exam-clock-pause');
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
        display.style.color = '#ef4444';
        display.textContent = "00:00 (Time's Up!)";
      } else if (state.totalSeconds <= 300) {
        display.style.color = '#ef4444';
      } else if (state.totalSeconds <= 900) {
        display.style.color = '#f59e0b';
      } else {
        display.style.color = '#38bdf8';
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

        // 25-Minute Section A transition check (when starting from 80m = 4800s, 25m elapsed = 3300s remaining)
        if (state.initialSeconds === 4800 && state.totalSeconds === 3300) {
          playDoubleChime();
          if (alertBanner) {
            alertBanner.innerHTML = `
              <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #ffffff; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 0.92rem; display: flex; align-items: center; justify-content: space-between; gap: 12px; box-shadow: 0 4px 15px rgba(245,158,11,0.4); border: 1.5px solid rgba(255,255,255,0.3);">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <i class="fa-solid fa-bell" style="font-size: 1.2rem; animation: ring 1s ease infinite;"></i>
                  <span><strong>🔔 PACING CHIME (25 Mins Elapsed):</strong> Section A is complete! Time to turn to <strong>Section B (Thematic Study)</strong> &bull; 55 mins remaining.</span>
                </div>
                <button type="button" onclick="this.parentElement.parentElement.style.display='none'" style="background: rgba(0,0,0,0.2); border: none; color: white; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Dismiss</button>
              </div>
            `;
            alertBanner.style.display = 'block';
          }
        }

        // 5-Minute warning check
        if (state.totalSeconds === 300) {
          playDoubleChime();
          if (alertBanner) {
            alertBanner.innerHTML = `
              <div style="background: #ef4444; color: #ffffff; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 0.92rem; display: flex; align-items: center; justify-content: space-between; gap: 12px; box-shadow: 0 4px 15px rgba(239,68,68,0.4); border: 1.5px solid rgba(255,255,255,0.3);">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <i class="fa-solid fa-triangle-exclamation" style="font-size: 1.2rem;"></i>
                  <span><strong>⚠️ 5 MINUTES REMAINING:</strong> Conclude essays, verify sustained judgements, and check SPaG!</span>
                </div>
                <button type="button" onclick="this.parentElement.parentElement.style.display='none'" style="background: rgba(0,0,0,0.2); border: none; color: white; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Dismiss</button>
              </div>
            `;
            alertBanner.style.display = 'block';
          }
        }

        if (state.totalSeconds === 0) {
          playDoubleChime();
          clearInterval(state.interval);
          state.interval = null;
          state.isRunning = false;
          if (alertBanner) {
            alertBanner.innerHTML = `
              <div style="background: #ef4444; color: #ffffff; padding: 12px 18px; border-radius: 8px; font-weight: 800; font-size: 1rem; display: flex; align-items: center; gap: 10px; box-shadow: 0 4px 20px rgba(239,68,68,0.5);">
                <i class="fa-solid fa-hourglass-end" style="font-size: 1.3rem;"></i>
                <span>⏰ TIME'S UP! All pens down. Examination concluded.</span>
              </div>
            `;
            alertBanner.style.display = 'block';
          }
          if (startBtn) {
            startBtn.style.display = 'inline-flex';
            startBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Restart';
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
      startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
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
      startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start Clock';
    }
    if (pauseBtn) pauseBtn.style.display = 'none';
  } else if (action === 'add5') {
    state.totalSeconds += 300;
    updateDisplay();
  }
};

export async function renderMockExamsView() {
  const contentArea = document.getElementById('main-content');
  if (!contentArea) return;
  contentArea.innerHTML = '';
  contentArea.style.paddingTop = '1rem';

  const unitData = state.activeUnitData || {};
  const unitId = state.selectedUnitId || window.currentUnitId || 'cme_new';
  const mocks = unitData.mock_exams || [];

  if (!mocks || mocks.length === 0) {
    contentArea.innerHTML = `
      <div style="padding: 40px; text-align: center; background: #fff; border-radius: 12px; margin: 20px auto; max-width: 800px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        <i class="fa-solid fa-file-circle-xmark fa-3x" style="color: #cbd5e1; margin-bottom: 15px;"></i>
        <h2 style="color: #0f172a; margin-top: 0;">No Mock Exams Available</h2>
        <p style="color: #64748b;">There are currently no mock exam papers registered for this unit.</p>
        <button class="btn-pedagogy-primary" data-action="switch-view" data-view="dashboard" style="margin-top: 15px; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Back to Dashboard</button>
      </div>
    `;
    return;
  }

  // Determine unit-specific exam metadata
  let specTitle = 'Edexcel GCSE (9–1) History';
  let headerColor = '#1e3a8a';
  let headerGrad = 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)';
  let defaultTime = '1 Hour 20 Mins';
  let defaultMarks = '52 Marks';

  if (unitId === 'cme_new') {
    specTitle = 'Paper 2: Conflict in the Middle East, 1945–1995 (1HI0/21)';
    headerColor = '#0284c7';
    headerGrad = 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)';
    defaultTime = '55 Minutes';
    defaultMarks = '32 Marks';
  } else if (unitId === 'weimar_nazi_germany') {
    specTitle = 'Paper 3: Weimar and Nazi Germany, 1918–1939 (1HI0/31)';
    headerColor = '#7f1d1d';
    headerGrad = 'linear-gradient(135deg, #7f1d1d 0%, #1e1b4b 100%)';
    defaultTime = '1 Hour 20 Mins';
    defaultMarks = '52 Marks + 4 SPaG';
  } else if (unitId === 'eee') {
    specTitle = 'Paper 2: Early Elizabethan England, 1558–1588 (1HI0/B4)';
    headerColor = '#b45309';
    headerGrad = 'linear-gradient(135deg, #b45309 0%, #1e293b 100%)';
    defaultTime = '55 Minutes';
    defaultMarks = '32 Marks';
  } else if (unitId === 'edexcel_medicine') {
    specTitle = 'Paper 1: Medicine in Britain & British Sector of Western Front (1HI0/11)';
    headerColor = '#0f766e';
    headerGrad = 'linear-gradient(135deg, #0f766e 0%, #0f172a 100%)';
    defaultTime = '1 Hour 20 Mins';
    defaultMarks = '52 Marks + 4 SPaG';
  } else if (unitId === 'usa') {
    specTitle = 'Paper 3: Conflict at Home and Abroad: the USA, 1954–75 (1HI0/33)';
    headerColor = '#1e40af';
    headerGrad = 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)';
    defaultTime = '1 Hour 20 Mins';
    defaultMarks = '52 Marks + 4 SPaG';
  }

  const defaultMins = defaultTime.includes('55') ? 55 : defaultTime.includes('15') ? 75 : 80;
  if (window.hubExamTimerState && window.hubExamTimerState.interval) {
    clearInterval(window.hubExamTimerState.interval);
  }
  window.hubExamTimerState = {
    interval: null,
    totalSeconds: defaultMins * 60,
    initialSeconds: defaultMins * 60,
    isRunning: false,
  };

  let html = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 0 15px 40px 15px;">
      <!-- Welcome Banner -->
      <div style="background: ${headerGrad}; color: white; padding: 35px 30px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 8px; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
          <span style="font-size: 0.82rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #93c5fd;">
            ${specTitle}
          </span>
          <span style="font-size: 0.75rem; background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); padding: 3px 10px; border-radius: 4px; font-weight: 700; border: 1px solid rgba(255,255,255,0.3);">
            ${mocks.length} Official Mock Papers Available
          </span>
        </div>
        <h1 style="margin: 0; font-size: 1.85rem; font-weight: 800; line-height: 1.25; font-family: 'Outfit', sans-serif;">
          GCSE Mock Examination Papers
        </h1>
        <p style="margin: 8px 0 0 0; font-size: 1rem; color: #e2e8f0; max-width: 850px; line-height: 1.45;">
          Authentic Pearson Edexcel GCSE (9–1) past-paper format replicas featuring full source booklets, question papers, and comprehensive teacher mark schemes. Ready to view, print for exam conditions, or use in classroom mock assessment cycles.
        </p>
      </div>

      <!-- Sub Navigation Tabs: Mock Papers vs Past Paper Matrix -->
      <div style="display: flex; gap: 10px; margin-bottom: 25px; border-bottom: 2px solid #e2e8f0; padding-bottom: 2px; overflow-x: auto;">
        <button id="tab-btn-official-mocks" class="btn" style="background: ${headerColor}; color: white; border: none; padding: 12px 22px; border-radius: 10px 10px 0 0; font-weight: 700; cursor: pointer; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; transition: all 0.2s;">
          <i class="fa-solid fa-file-signature"></i> Official Mock Exam Papers
        </button>
        <button id="tab-btn-trend-radar" class="btn" style="background: transparent; color: #64748b; border: none; padding: 12px 22px; border-radius: 10px 10px 0 0; font-weight: 700; cursor: pointer; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; transition: all 0.2s;">
          <i class="fa-solid fa-table-cells"></i> 2018–2026 Past Paper Matrix &amp; Overdue Radar
        </button>
      </div>

      <div id="mock-papers-wrapper">
        <!-- Quick Assessment Specifications & Instructions -->
        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 18px 24px; margin-bottom: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <div>
            <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">Exam Timing</div>
            <div style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-top: 2px;"><i class="fa-regular fa-clock" style="color: ${headerColor}; margin-right: 6px;"></i>${defaultTime}</div>
          </div>
          <div>
            <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">Total Marks Available</div>
            <div style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-top: 2px;"><i class="fa-solid fa-award" style="color: ${headerColor}; margin-right: 6px;"></i>${defaultMarks}</div>
          </div>
          <div>
            <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">Print Format</div>
            <div style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-top: 2px;"><i class="fa-solid fa-print" style="color: ${headerColor}; margin-right: 6px;"></i>A4 Booklet / Replicas</div>
          </div>
          <div>
            <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">Marking Support</div>
            <div style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-top: 2px;"><i class="fa-solid fa-chalkboard-user" style="color: ${headerColor}; margin-right: 6px;"></i>Full Model Answers</div>
          </div>
        </div>

      <!-- Digital Exam Hall Clock & Timer Bar -->
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; border-radius: 10px; padding: 18px 24px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-left: 5px solid #38bdf8;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); display: flex; align-items: center; justify-content: center; color: #38bdf8; font-size: 1.3rem;">
              <i class="fa-solid fa-stopwatch-20"></i>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 0.72rem; font-weight: 800; background: #38bdf8; color: #0f172a; padding: 2px 7px; border-radius: 3px; text-transform: uppercase;">
                  Digital Exam Clock
                </span>
                <span style="font-size: 0.8rem; color: #94a3b8;">
                  Whiteboard Projector Mode &bull; Audio Pacing Chimes Active
                </span>
              </div>
              <div id="hub-exam-clock-display" style="font-size: 1.85rem; font-weight: 800; font-family: 'Courier New', Courier, monospace; letter-spacing: 2px; color: #38bdf8; line-height: 1.15; margin-top: 3px;">
                ${defaultMins === 55 ? '55:00' : '01:20:00'}
              </div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <button type="button" class="btn" id="hub-exam-clock-start" onclick="window.toggleHubExamClock('start', ${defaultMins})" style="background: #10b981; color: #fff; padding: 8px 16px; border-radius: 6px; font-weight: 700; font-size: 0.85rem; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-play"></i> Start Clock
            </button>
            <button type="button" class="btn" id="hub-exam-clock-pause" onclick="window.toggleHubExamClock('pause')" style="background: #f59e0b; color: #fff; padding: 8px 14px; border-radius: 6px; font-weight: 600; font-size: 0.85rem; border: none; cursor: pointer; display: none; align-items: center; gap: 6px;">
              <i class="fa-solid fa-pause"></i> Pause
            </button>
            <button type="button" class="btn" id="hub-exam-clock-reset" onclick="window.toggleHubExamClock('reset', ${defaultMins})" style="background: #334155; color: #e2e8f0; padding: 8px 14px; border-radius: 6px; font-weight: 600; font-size: 0.85rem; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-rotate-right"></i> Reset
            </button>
            <button type="button" class="btn" onclick="window.toggleHubExamClock('add5')" style="background: #1e293b; color: #94a3b8; border: 1px solid #475569; padding: 8px 12px; border-radius: 6px; font-weight: 600; font-size: 0.82rem; cursor: pointer;" title="Add 5 Minutes Extra Time">
              +5m Extra Time
            </button>
          </div>
        </div>

        <div id="hub-exam-clock-pacing-alert" style="display: none; margin-top: 14px;"></div>

        ${
          unitId === 'edexcel_medicine'
            ? `
        <div style="width: 100%; margin-top: 14px; background: rgba(255,255,255,0.06); border-radius: 6px; padding: 8px 14px; display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; color: #94a3b8; border: 1px solid rgba(255,255,255,0.1); flex-wrap: wrap; gap: 8px;">
          <span style="display: flex; align-items: center; gap: 6px;"><strong style="color: #38bdf8;"><i class="fa-solid fa-flag"></i> Section A (Western Front):</strong> 25 mins &bull; 16 marks [Q1(a)/(b) 5m, Q2(a) 15m, Q2(b) 5m]</span>
          <span style="display: flex; align-items: center; gap: 6px;"><strong style="color: #a78bfa;"><i class="fa-solid fa-book-medical"></i> Section B (Thematic Study):</strong> 55 mins &bull; 36 marks [Q3 5m, Q4 20m, Q5/Q6 30m]</span>
        </div>
        `
            : ''
        }
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

    const badgeText = mock.title.includes('NotebookLM')
      ? 'Prediction Model'
      : `Exam Mock ${idx + 1}`;

    html += `
      <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 10px; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; gap: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.04); transition: transform 0.2s ease, box-shadow 0.2s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 20px rgba(0,0,0,0.08)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.04)';">
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 0.72rem; font-weight: 800; background: ${headerColor}18; color: ${headerColor}; padding: 3px 9px; border-radius: 4px; text-transform: uppercase; border: 1px solid ${headerColor}30;">
              ${badgeText}
            </span>
            <span style="font-size: 0.75rem; font-weight: 700; color: #64748b;">
              <i class="fa-solid fa-file-lines" style="color: ${headerColor}; margin-right: 4px;"></i>${mock.paper_reference || specTitle.split(':')[0]}
            </span>
          </div>

          <h3 style="margin: 0 0 10px 0; color: #0f172a; font-size: 1.15rem; line-height: 1.35; font-family: 'Outfit', sans-serif;">
            ${mock.title}
          </h3>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px; font-size: 0.8rem; color: #475569; margin-bottom: 12px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 6px;">
            <span><strong>Time:</strong> ${mock.time_minutes ? mock.time_minutes + ' mins' : defaultTime}</span>
            <span><strong>Marks:</strong> ${mock.total_marks ? mock.total_marks + ' marks' : defaultMarks}</span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 5px;">
          <a href="${fullPaperUrl}" target="_blank" style="text-align: center; text-decoration: none; background: linear-gradient(135deg, ${headerColor} 0%, #0f172a 100%); color: #ffffff; padding: 10px 14px; border-radius: 6px; font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); transition: opacity 0.2s ease;" onmouseover="this.style.opacity='0.92';" onmouseout="this.style.opacity='1';">
            <i class="fa-solid fa-file-pdf"></i> Open &amp; Print Question Paper
          </a>

          ${
            hasMs
              ? `
            <a href="${fullMsUrl}" target="_blank" style="text-align: center; text-decoration: none; background: #f1f5f9; color: #1e293b; border: 1.5px solid #cbd5e1; padding: 9px 14px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s ease;" onmouseover="this.style.background='#e2e8f0'; this.style.borderColor='#94a3b8';" onmouseout="this.style.background='#f1f5f9'; this.style.borderColor='#cbd5e1';">
              <i class="fa-solid fa-chalkboard-user" style="color: ${headerColor};"></i> View Teacher Mark Scheme
            </a>
          `
              : `
            <div style="font-size: 0.75rem; color: #94a3b8; text-align: center; font-style: italic; padding: 4px 0;">
              Model answers integrated in unit study bank
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
      <div style="margin-top: 35px; padding-top: 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <button class="btn btn-secondary" data-action="switch-view" data-view="lessons" data-unit="${unitId}" style="padding: 10px 18px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-weight: 600;">
          <i class="fa-solid fa-arrow-left"></i> Return to Lessons
        </button>
        <button class="btn btn-secondary" data-action="switch-view" data-view="booklet" data-unit="${unitId}" style="padding: 10px 18px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-weight: 600; color: #8b5cf6; border-color: #ddd6fe;">
          <i class="fa-solid fa-print"></i> Visit Print &amp; PDF Hub
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
      tabBtnMocks.style.background = headerColor;
      tabBtnMocks.style.color = 'white';
      tabBtnTrend.style.background = 'transparent';
      tabBtnTrend.style.color = '#64748b';
      if (mockWrapper) mockWrapper.style.display = 'block';
      if (trendContainer) trendContainer.style.display = 'none';
    });

    tabBtnTrend.addEventListener('click', async () => {
      tabBtnTrend.style.background = headerColor;
      tabBtnTrend.style.color = 'white';
      tabBtnMocks.style.background = 'transparent';
      tabBtnMocks.style.color = '#64748b';
      if (mockWrapper) mockWrapper.style.display = 'none';
      if (trendContainer) {
        trendContainer.style.display = 'block';
        const { renderExamTrendMatrix } = await import('./exam_trend_matrix.js');
        renderExamTrendMatrix(trendContainer, unitId);
      }
    });
  }

  if (window.scrollToTop) window.scrollToTop(true);
  else contentArea.scrollTo({ top: 0, behavior: 'smooth' });
}

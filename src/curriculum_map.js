/**
 * Curriculum Map View
 * Renders an interactive, native curriculum overview table
 * driven by /curriculum_meta.json (the single source of truth),
 * as well as the Disciplinary Skills Progression Matrix (Years 7–11).
 */

import { switchView } from './navigation.js';
import { DISCIPLINARY_STRANDS, YEAR_GROUPS_PROGRESSION } from './disciplinary_skills_data.js';

const ALL_TERMS = ['Autumn 1', 'Autumn 2', 'Spring 1', 'Spring 2', 'Summer 1', 'Summer 2'];

// Colour palette per year group (header accent)
const YEAR_COLOURS = {
  'Year 7': { bg: '#1b365d', accent: '#facc15', badge: '#dbeafe', badgeText: '#1e40af' },
  'Year 8': { bg: '#1b4332', accent: '#86efac', badge: '#dcfce7', badgeText: '#166534' },
  'Year 9': { bg: '#4c1d95', accent: '#c4b5fd', badge: '#ede9fe', badgeText: '#5b21b6' },
  'Year 10': { bg: '#7c2d12', accent: '#fdba74', badge: '#fff7ed', badgeText: '#9a3412' },
  'Year 11': { bg: '#1e1b4b', accent: '#a5f3fc', badge: '#ecfeff', badgeText: '#0e7490' },
};

let metaCache = null;
let currentViewTab = 'sequence'; // 'sequence' | 'matrix'
let selectedStrand = 'all'; // 'all' | 'causation' | 'change_continuity' | 'source_utility' | 'interpretations'
let selectedYear = 'all'; // 'all' | 'Year 7' | ...
let matrixLayout = 'strand'; // 'strand' | 'year'

async function loadMeta() {
  if (metaCache) return metaCache;
  const res = await fetch(`/curriculum_meta.json?v=${Date.now()}`);
  metaCache = await res.json();
  return metaCache;
}

export async function renderCurriculumMap() {
  const container = document.getElementById('main-content');
  if (!container) return;

  container.innerHTML = `
    <div style="padding: 24px 28px; max-width: 100%;">
      <!-- Top Header & PDF Action Bar -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
        <div>
          <h1 style="font-family:'Playfair Display',serif; font-size:1.85rem; margin:0; color:var(--text-primary);">
            Curriculum &amp; Pedagogical Architecture
          </h1>
          <p style="margin:4px 0 0; color:var(--text-muted); font-size:0.9rem;">
            History Department &mdash; Years 7&ndash;11 &middot; 2026&ndash;2027
          </p>
        </div>
        <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
          <a href="/pdfs/curriculum_overview_tabular.pdf" target="_blank"
             style="display:inline-flex; align-items:center; gap:8px; padding:9px 16px;
                    background:var(--primary, #1e3a8a); color:#fff; border-radius:8px; text-decoration:none;
                    font-weight:600; font-size:0.85rem; box-shadow:0 2px 6px rgba(0,0,0,0.1); transition:all 0.2s;"
             onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-1px)'"
             onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)'">
            <i class="fa-solid fa-table"></i> Tabular Overview (PDF)
          </a>
          <a href="/pdfs/whole_school_curriculum_overview.pdf" target="_blank"
             style="display:inline-flex; align-items:center; gap:8px; padding:9px 16px;
                    background:#1b365d; color:#fff; border-radius:8px; text-decoration:none;
                    font-weight:600; font-size:0.85rem; box-shadow:0 2px 6px rgba(0,0,0,0.1); transition:all 0.2s;"
             onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-1px)'"
             onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)'">
            <i class="fa-solid fa-book-open"></i> Full SOW (PDF)
          </a>
          <a href="/pdfs/history_marking_and_feedback_policy.pdf" target="_blank"
             style="display:inline-flex; align-items:center; gap:8px; padding:9px 16px;
                    background:#334155; color:#fff; border-radius:8px; text-decoration:none;
                    font-weight:600; font-size:0.85rem; box-shadow:0 2px 6px rgba(0,0,0,0.1); transition:all 0.2s;"
             onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-1px)'"
             onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)'">
            <i class="fa-solid fa-file-shield"></i> Marking Policy (PDF)
          </a>
        </div>
      </div>

      <!-- Navigation Tab Switcher -->
      <div style="display:flex; gap:12px; margin-bottom:24px; border-bottom:2px solid var(--border, #e2e8f0); padding-bottom:12px;">
        <button id="btn-tab-sequence" 
          style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; font-weight:600; font-size:0.92rem; cursor:pointer; border:none; transition:all 0.2s; ${currentViewTab === 'sequence' ? 'background:#1b365d; color:#fff; box-shadow:0 2px 8px rgba(27,54,93,0.25);' : 'background:var(--surface-secondary, #f1f5f9); color:var(--text-secondary, #475569);'}">
          <i class="fa-solid fa-map-location-dot"></i> Curriculum Sequence (Termly Grid)
        </button>
        <button id="btn-tab-matrix" 
          style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; font-weight:600; font-size:0.92rem; cursor:pointer; border:none; transition:all 0.2s; ${currentViewTab === 'matrix' ? 'background:#1b365d; color:#fff; box-shadow:0 2px 8px rgba(27,54,93,0.25);' : 'background:var(--surface-secondary, #f1f5f9); color:var(--text-secondary, #475569);'}">
          <i class="fa-solid fa-stairs"></i> Disciplinary Skills Matrix (Progression Grid)
        </button>
      </div>

      <!-- Dynamic Content Area -->
      <div id="curriculum-map-body"></div>
    </div>
  `;

  // Attach tab listeners
  document.getElementById('btn-tab-sequence')?.addEventListener('click', () => {
    currentViewTab = 'sequence';
    renderCurriculumMap();
  });
  document.getElementById('btn-tab-matrix')?.addEventListener('click', () => {
    currentViewTab = 'matrix';
    renderCurriculumMap();
  });

  if (currentViewTab === 'sequence') {
    await renderSequenceView();
  } else {
    renderMatrixView();
  }
}

/**
 * View 1: Curriculum Sequence (Termly Grid)
 */
async function renderSequenceView() {
  const body = document.getElementById('curriculum-map-body');
  if (!body) return;

  body.innerHTML = `
    <div style="text-align:center; padding:40px; color:var(--text-muted);">
      <i class="fa-solid fa-spinner fa-spin" style="font-size:2rem; margin-bottom:12px;"></i>
      <p>Loading curriculum data&hellip;</p>
    </div>
  `;

  let meta;
  try {
    meta = await loadMeta();
  } catch (e) {
    body.innerHTML = `
      <div style="text-align:center; padding:40px; color:#ef4444;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size:2rem; margin-bottom:12px;"></i>
        <p>Failed to load curriculum data. Please try refreshing.</p>
      </div>`;
    return;
  }

  body.innerHTML = '<div style="display:flex; flex-direction:column; gap:32px;"></div>';
  const container = body.firstElementChild;

  for (const yearGroup of meta.yearGroups) {
    const colours = YEAR_COLOURS[yearGroup.year] || YEAR_COLOURS['Year 7'];
    const isGCSE = yearGroup.ks.includes('4');

    const section = document.createElement('div');
    section.style.cssText =
      'border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.1);';

    // Year header
    const safeYearName = yearGroup.year.toLowerCase().replace(' ', '_');
    section.innerHTML = `
      <div style="background:${colours.bg}; color:#fff; padding:14px 20px; border-bottom:3px solid ${colours.accent}; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
        <div>
          <h2 style="font-family:'Playfair Display',serif; font-size:1.2rem; margin:0; color:#fff;">${yearGroup.year}</h2>
          <span style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.1em; color:${colours.accent}; font-weight:600;">${yearGroup.ks}</span>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          ${isGCSE ? `<span style="background:${colours.accent}; color:${colours.bg}; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700;">GCSE</span>` : ''}
          <a href="/pdfs/${safeYearName}_sow.pdf" target="_blank"
             style="background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); color:#fff; padding:5px 12px; border-radius:6px; font-size:0.75rem; font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:6px; transition:all 0.2s;"
             onmouseover="this.style.background='rgba(255,255,255,0.28)'"
             onmouseout="this.style.background='rgba(255,255,255,0.15)'">
            <i class="fa-solid fa-file-pdf"></i> ${yearGroup.year} SOW (PDF)
          </a>
        </div>
      </div>
    `;

    // Responsive card grid for units
    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 0;
      background: var(--surface-secondary, #f8fafc);
    `;

    for (const unit of yearGroup.units) {
      const isRevision = unit.uid === '_revision';
      const termLabel =
        unit.terms.length === 1
          ? unit.terms[0]
          : `${unit.terms[0]} – ${unit.terms[unit.terms.length - 1]}`;

      const card = document.createElement('div');
      card.style.cssText = `
        padding: 18px 20px;
        border-right: 1px solid var(--border, #e2e8f0);
        border-bottom: 1px solid var(--border, #e2e8f0);
        background: var(--surface, #fff);
        display: flex;
        flex-direction: column;
        gap: 12px;
        ${isRevision ? 'opacity:0.8; background: #f1f5f9;' : ''}
      `;

      // Make KS3 unit titles clickable to navigate to that unit
      const titleLink =
        !isRevision && !isGCSE
          ? `<a href="#" onclick="event.preventDefault(); window.switchView('lessons','${unit.uid}');" 
             style="color:${colours.bg}; text-decoration:none; font-weight:700; font-size:0.95rem; 
                    font-family:'Playfair Display',serif; line-height:1.3; display:block;
                    transition:color 0.2s;" 
             onmouseover="this.style.color='var(--primary)'" 
             onmouseout="this.style.color='${colours.bg}'">${unit.shortTitle}</a>`
          : `<span style="color:${colours.bg}; font-weight:700; font-size:0.95rem; font-family:'Playfair Display',serif; line-height:1.3;">${unit.shortTitle}</span>`;

      card.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
          <span style="background:${colours.badge}; color:${colours.badgeText}; padding:2px 10px; border-radius:20px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; white-space:nowrap;">
            ${termLabel}
          </span>
        </div>

        ${titleLink}

        <p style="margin:0; font-size:0.82rem; color:var(--text-muted, #64748b); line-height:1.55;">
          ${unit.summary}
        </p>

        ${
          unit.vocab
            ? `
          <div style="display:flex; flex-wrap:wrap; gap:5px;">
            ${unit.vocab
              .split(',')
              .map(
                (v) =>
                  `<span style="background:var(--surface-secondary,#f1f5f9); border:1px solid var(--border,#e2e8f0); border-radius:12px; padding:2px 8px; font-size:0.7rem; color:var(--text-secondary,#475569);">${v.trim()}</span>`,
              )
              .join('')}
          </div>
        `
            : ''
        }

        <hr style="border:none; border-top:1px solid var(--border,#e2e8f0); margin:4px 0;">

        <div style="font-size:0.78rem; color:var(--text-secondary,#475569);">
          <span style="font-weight:600; color:var(--text-primary,#0f172a);">Skills:</span>
          ${unit.skills ? unit.skills.join(' &middot; ') : ''}
        </div>

        <div style="font-size:0.78rem; background:${colours.badge}; border-left:3px solid ${colours.accent}; padding:8px 10px; border-radius:0 6px 6px 0; color:var(--text-secondary,#475569);">
          <span style="font-weight:600; color:${colours.badgeText}; display:block; margin-bottom:2px;">Assessment</span>
          ${unit.assessment}
        </div>

        <details style="font-size:0.75rem; color:var(--text-muted,#94a3b8);">
          <summary style="cursor:pointer; font-weight:600; color:var(--text-secondary,#64748b); margin-bottom:6px; list-style:none; display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-chevron-right" style="font-size:0.65rem; transition:transform 0.2s;"></i> SMSC &amp; Careers
          </summary>
          <div style="margin-top:6px; padding-top:6px; border-top:1px solid var(--border,#e2e8f0);">
            <p style="margin:0 0 6px;">${unit.smsc || ''}</p>
            <p style="margin:0;"><span style="font-weight:600;">Careers:</span> ${unit.careers || ''}</p>
          </div>
        </details>
      `;

      card.querySelector('details')?.addEventListener('toggle', function () {
        const chevron = this.querySelector('.fa-chevron-right');
        if (chevron) chevron.style.transform = this.open ? 'rotate(90deg)' : 'rotate(0deg)';
      });

      grid.appendChild(card);
    }

    section.appendChild(grid);
    container.appendChild(section);
  }
}

/**
 * View 2: Disciplinary Skills Progression Matrix
 */
function renderMatrixView() {
  const body = document.getElementById('curriculum-map-body');
  if (!body) return;

  body.innerHTML = `
    <div>
      <!-- Matrix Header & Educational Intent -->
      <div style="background:linear-gradient(135deg, #1b365d 0%, #0f172a 100%); color:#fff; border-radius:12px; padding:24px 28px; margin-bottom:24px; border-bottom:4px solid #facc15; box-shadow:0 4px 14px rgba(15,23,42,0.15);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
          <div style="max-width:850px;">
            <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(250,204,21,0.15); border:1px solid #facc15; color:#facc15; font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; padding:4px 10px; border-radius:20px; margin-bottom:10px;">
              <i class="fa-solid fa-graduation-cap"></i> 5-Year Disciplinary Progression Architecture
            </div>
            <h2 style="font-family:'Playfair Display',serif; font-size:1.5rem; margin:0 0 10px 0; color:#fff;">
              Historical Thinking &amp; Examination Mastery Matrix
            </h2>
            <p style="margin:0; font-size:0.88rem; line-height:1.6; color:#cbd5e1;">
              This matrix tracks the deliberate, sequential cognitive escalation of our four core disciplinary strands from <strong>Year 7 single-sentence assertions</strong> through to <strong>Year 9 16-mark essay hierarchies</strong> and <strong>Years 10–11 Edexcel GCSE exam techniques</strong>.
            </p>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <button id="matrix-btn-expand-all" style="background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.25); color:#fff; padding:6px 14px; border-radius:6px; font-size:0.78rem; font-weight:600; cursor:pointer; transition:all 0.2s;">
              <i class="fa-solid fa-angles-down"></i> Expand All Scaffolds
            </button>
            <button id="matrix-btn-collapse-all" style="background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.25); color:#fff; padding:6px 14px; border-radius:6px; font-size:0.78rem; font-weight:600; cursor:pointer; transition:all 0.2s;">
              <i class="fa-solid fa-angles-up"></i> Collapse All
            </button>
          </div>
        </div>
      </div>

      <!-- Filter Controls Bar -->
      <div style="background:var(--surface, #fff); border:1px solid var(--border, #e2e8f0); border-radius:10px; padding:16px 20px; margin-bottom:24px; display:flex; flex-direction:column; gap:14px; box-shadow:0 1px 4px rgba(0,0,0,0.05);">
        <!-- Strand Filter Buttons -->
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
          <span style="font-size:0.8rem; font-weight:700; color:var(--text-secondary,#475569); text-transform:uppercase; letter-spacing:0.05em; min-width:110px;">
            <i class="fa-solid fa-filter"></i> By Strand:
          </span>
          <button class="strand-pill ${selectedStrand === 'all' ? 'active-pill' : ''}" data-strand="all"
            style="padding:6px 12px; border-radius:20px; font-size:0.8rem; font-weight:600; cursor:pointer; border:1px solid #cbd5e1; background:#f8fafc; color:#334155;">
            All Strands (4)
          </button>
          ${DISCIPLINARY_STRANDS.map(
            (s) => `
            <button class="strand-pill ${selectedStrand === s.id ? 'active-pill' : ''}" data-strand="${s.id}"
              style="padding:6px 12px; border-radius:20px; font-size:0.8rem; font-weight:600; cursor:pointer; border:1px solid #cbd5e1; background:#f8fafc; color:#334155; display:inline-flex; align-items:center; gap:6px;">
              <i class="${s.icon}" style="color:${s.color};"></i> ${s.title}
            </button>
          `,
          ).join('')}
        </div>

        <!-- Year Group Filter Buttons -->
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; border-top:1px dashed var(--border,#e2e8f0); padding-top:10px;">
          <span style="font-size:0.8rem; font-weight:700; color:var(--text-secondary,#475569); text-transform:uppercase; letter-spacing:0.05em; min-width:110px;">
            <i class="fa-solid fa-calendar-days"></i> By Year:
          </span>
          <button class="year-pill ${selectedYear === 'all' ? 'active-pill' : ''}" data-year="all"
            style="padding:6px 12px; border-radius:20px; font-size:0.8rem; font-weight:600; cursor:pointer; border:1px solid #cbd5e1; background:#f8fafc; color:#334155;">
            All Years (7–11)
          </button>
          ${YEAR_GROUPS_PROGRESSION.map(
            (yg) => `
            <button class="year-pill ${selectedYear === yg.year ? 'active-pill' : ''}" data-year="${yg.year}"
              style="padding:6px 12px; border-radius:20px; font-size:0.8rem; font-weight:600; cursor:pointer; border:1px solid #cbd5e1; background:#f8fafc; color:#334155;">
              ${yg.year} <span style="font-size:0.7rem; color:#64748b;">(${yg.ks})</span>
            </button>
          `,
          ).join('')}
        </div>
      </div>

      <!-- Matrix Cards Container -->
      <div id="matrix-cards-wrapper" style="display:flex; flex-direction:column; gap:28px;"></div>
    </div>
  `;

  // Render the actual cards based on active filters
  renderFilteredMatrixCards();

  // Attach filter pill handlers
  document.querySelectorAll('.strand-pill').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      selectedStrand = e.currentTarget.getAttribute('data-strand');
      renderMatrixView();
    });
  });

  document.querySelectorAll('.year-pill').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      selectedYear = e.currentTarget.getAttribute('data-year');
      renderMatrixView();
    });
  });

  // Expand / Collapse All handlers
  document.getElementById('matrix-btn-expand-all')?.addEventListener('click', () => {
    document.querySelectorAll('#matrix-cards-wrapper details').forEach((d) => (d.open = true));
  });
  document.getElementById('matrix-btn-collapse-all')?.addEventListener('click', () => {
    document.querySelectorAll('#matrix-cards-wrapper details').forEach((d) => (d.open = false));
  });
}

/**
 * Renders the filtered cards for the Disciplinary Matrix
 */
function renderFilteredMatrixCards() {
  const container = document.getElementById('matrix-cards-wrapper');
  if (!container) return;
  container.innerHTML = '';

  const activeStrands =
    selectedStrand === 'all'
      ? DISCIPLINARY_STRANDS
      : DISCIPLINARY_STRANDS.filter((s) => s.id === selectedStrand);

  const yearList =
    selectedYear === 'all' ? ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11'] : [selectedYear];

  for (const strand of activeStrands) {
    const strandBox = document.createElement('div');
    strandBox.style.cssText = `
      background: var(--surface, #fff);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    `;

    // Strand banner
    strandBox.innerHTML = `
      <div style="background:${strand.bgColor}; border-left:6px solid ${strand.color}; padding:18px 24px; border-bottom:1px solid ${strand.borderColor};">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:6px;">
          <div style="width:36px; height:36px; border-radius:8px; background:${strand.color}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
            <i class="${strand.icon}"></i>
          </div>
          <div>
            <h3 style="font-family:'Playfair Display',serif; font-size:1.25rem; margin:0; color:#0f172a;">
              ${strand.title}
            </h3>
          </div>
        </div>
        <p style="margin:0; font-size:0.83rem; color:#475569; line-height:1.5;">
          ${strand.summary}
        </p>
      </div>
    `;

    // Grid of progression steps across years
    const yearGrid = document.createElement('div');
    yearGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 0;
      background: var(--surface-secondary, #f8fafc);
    `;

    for (const yName of yearList) {
      const yearData = strand.years[yName];
      if (!yearData) continue;

      const ygMeta = YEAR_GROUPS_PROGRESSION.find((yg) => yg.year === yName);
      const isGCSE = yName === 'Year 10' || yName === 'Year 11';

      const card = document.createElement('div');
      card.style.cssText = `
        padding: 20px;
        background: #fff;
        border-right: 1px solid var(--border, #e2e8f0);
        border-bottom: 1px solid var(--border, #e2e8f0);
        display: flex;
        flex-direction: column;
        gap: 14px;
      `;

      card.innerHTML = `
        <!-- Year Header & Badges -->
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-family:'Playfair Display',serif; font-weight:700; font-size:1.1rem; color:${ygMeta?.color || '#1b365d'};">
              ${yName}
            </span>
            <span style="background:${ygMeta?.badge || '#dbeafe'}; color:${ygMeta?.badgeText || '#1e40af'}; font-size:0.72rem; font-weight:700; padding:2px 8px; border-radius:12px;">
              ${yearData.stage}
            </span>
          </div>
          ${isGCSE ? '<span style="background:#fef3c7; color:#92400e; border:1px solid #fde68a; font-size:0.68rem; font-weight:800; padding:2px 6px; border-radius:4px;">EDEXCEL</span>' : ''}
        </div>

        <!-- Headline Skill -->
        <div style="font-size:0.86rem; font-weight:700; color:#0f172a; line-height:1.4; border-left:3px solid ${strand.color}; padding-left:8px;">
          ${yearData.skillHeadline}
        </div>

        <!-- Progression Narrative -->
        <p style="margin:0; font-size:0.82rem; color:#475569; line-height:1.55;">
          ${yearData.progression}
        </p>

        <!-- Cognitive Scaffold & Sentence Starters -->
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 12px; font-size:0.78rem;">
          <div style="font-weight:700; color:#1e293b; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-puzzle-piece" style="color:${strand.color}; font-size:0.75rem;"></i> Cognitive Scaffold
          </div>
          <div style="color:#334155; font-family:monospace; font-size:0.75rem; background:#fff; padding:6px 8px; border-radius:4px; border:1px solid #cbd5e1; line-height:1.45;">
            ${yearData.scaffold}
          </div>
        </div>

        <!-- Assessment Format & Model Question -->
        <details style="font-size:0.76rem; color:#64748b; margin-top:auto;" open>
          <summary style="cursor:pointer; font-weight:600; color:#334155; list-style:none; display:flex; align-items:center; gap:6px; user-select:none;">
            <i class="fa-solid fa-chevron-right" style="font-size:0.65rem; transition:transform 0.2s;"></i> Assessment &amp; Model Stem
          </summary>
          <div style="margin-top:8px; padding-top:8px; border-top:1px solid #e2e8f0; display:flex; flex-direction:column; gap:6px;">
            <div>
              <strong style="color:#0f172a;">Format:</strong> ${yearData.assessmentFormat}
            </div>
            <div>
              <strong style="color:#0f172a;">Model Stem:</strong>
              <em style="color:#1e40af; display:block; margin-top:2px;">"${yearData.modelQuestion}"</em>
            </div>
          </div>
        </details>
      `;

      card.querySelector('details')?.addEventListener('toggle', function () {
        const chevron = this.querySelector('.fa-chevron-right');
        if (chevron) chevron.style.transform = this.open ? 'rotate(90deg)' : 'rotate(0deg)';
      });

      yearGrid.appendChild(card);
    }

    strandBox.appendChild(yearGrid);
    container.appendChild(strandBox);
  }
}

// Inject styling helper for active pills
const styleEl = document.createElement('style');
styleEl.textContent = `
  .strand-pill.active-pill, .year-pill.active-pill {
    background: #1b365d !important;
    color: #ffffff !important;
    border-color: #1b365d !important;
    box-shadow: 0 2px 6px rgba(27,54,93,0.25) !important;
  }
  .strand-pill.active-pill i {
    color: #facc15 !important;
  }
  .strand-pill.active-pill span, .year-pill.active-pill span {
    color: #e2e8f0 !important;
  }
`;
document.head.appendChild(styleEl);

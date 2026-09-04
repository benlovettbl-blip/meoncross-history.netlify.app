/**
 * Curriculum Map View
 * Renders an interactive, native curriculum overview table
 * driven by /curriculum_meta.json (the single source of truth).
 */

import { switchView } from './navigation.js';

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
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; flex-wrap:wrap; gap:12px;">
        <div>
          <h1 style="font-family:'Playfair Display',serif; font-size:1.75rem; margin:0; color:var(--text-primary);">
            Curriculum Overview
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
      <div id="curriculum-map-body" style="display:flex; flex-direction:column; gap:32px;">
        <div style="text-align:center; padding:40px; color:var(--text-muted);">
          <i class="fa-solid fa-spinner fa-spin" style="font-size:2rem; margin-bottom:12px;"></i>
          <p>Loading curriculum data&hellip;</p>
        </div>
      </div>
    </div>
  `;

  let meta;
  try {
    meta = await loadMeta();
  } catch (e) {
    document.getElementById('curriculum-map-body').innerHTML = `
      <div style="text-align:center; padding:40px; color:#ef4444;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size:2rem; margin-bottom:12px;"></i>
        <p>Failed to load curriculum data. Please try refreshing.</p>
      </div>`;
    return;
  }

  const body = document.getElementById('curriculum-map-body');
  body.innerHTML = '';

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
        <!-- Term badge -->
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
          <span style="background:${colours.badge}; color:${colours.badgeText}; padding:2px 10px; border-radius:20px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; white-space:nowrap;">
            ${termLabel}
          </span>
        </div>

        <!-- Title -->
        ${titleLink}

        <!-- Summary -->
        <p style="margin:0; font-size:0.82rem; color:var(--text-muted, #64748b); line-height:1.55;">
          ${unit.summary}
        </p>

        <!-- Vocab pill strip -->
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

        <!-- Divider -->
        <hr style="border:none; border-top:1px solid var(--border,#e2e8f0); margin:4px 0;">

        <!-- Skills -->
        <div style="font-size:0.78rem; color:var(--text-secondary,#475569);">
          <span style="font-weight:600; color:var(--text-primary,#0f172a);">Skills:</span>
          ${unit.skills ? unit.skills.join(' &middot; ') : ''}
        </div>

        <!-- Assessment -->
        <div style="font-size:0.78rem; background:${colours.badge}; border-left:3px solid ${colours.accent}; padding:8px 10px; border-radius:0 6px 6px 0; color:var(--text-secondary,#475569);">
          <span style="font-weight:600; color:${colours.badgeText}; display:block; margin-bottom:2px;">Assessment</span>
          ${unit.assessment}
        </div>

        <!-- SMSC & Careers collapsed row -->
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

      // Rotate chevron on open/close
      card.querySelector('details')?.addEventListener('toggle', function () {
        const chevron = this.querySelector('.fa-chevron-right');
        if (chevron) chevron.style.transform = this.open ? 'rotate(90deg)' : 'rotate(0deg)';
      });

      grid.appendChild(card);
    }

    section.appendChild(grid);
    body.appendChild(section);
  }
}

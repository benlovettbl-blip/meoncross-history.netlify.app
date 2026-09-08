/**
 * Competitions & Young Historians Hub View
 * Academic Prospectus Broadsheet Layout
 * Scholarly, two-column editorial presentation of regional, national, and university historical prizes.
 */

import { competitionsData } from './competitions_data.js';

// Global handler to jump directly into a curriculum lesson from a competition research prompt
if (typeof window !== 'undefined') {
  window.openLessonFromCompetition = async function (unitId, lessonIndex) {
    if (window.switchView) {
      await window.switchView('lessons', unitId);
      if (window.viewLessonDetail && lessonIndex !== undefined && lessonIndex !== null) {
        setTimeout(() => {
          window.viewLessonDetail(parseInt(lessonIndex, 10));
        }, 120);
      }
    }
  };
}

let currentFilter = 'all';

export function renderCompetitionsView() {
  const container = document.getElementById('main-content');
  if (!container) return;

  const filteredCompetitions = competitionsData.filter((c) => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'ks3')
      return c.targetYears.includes('Years 7–9') || c.targetYears.includes('Key Stage 3');
    if (currentFilter === 'gcse')
      return c.targetYears.includes('Years 10–11') || c.targetYears.includes('GCSE');
    if (currentFilter === 'advanced')
      return c.id === 'julia_wood_oxford_2027' || c.targetYears.includes('Sixth Form');
    return true;
  });

  let html = `
    <style>
      .prospectus-container {
        max-width: 1180px;
        margin: 0 auto;
        padding: 0 24px 60px 24px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        color: #1e293b;
        animation: fadeIn 0.25s ease-out;
      }
      .prospectus-masthead {
        background: #0f172a;
        color: #ffffff;
        border-radius: 8px;
        padding: 36px 36px 32px 36px;
        margin-bottom: 28px;
        border-left: 6px solid #b45309;
      }
      .prospectus-masthead-overline {
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #d97706;
        margin-bottom: 8px;
      }
      .prospectus-masthead-title {
        font-family: "Playfair Display", Georgia, serif;
        font-size: 2.2rem;
        font-weight: 700;
        margin: 0 0 12px 0;
        letter-spacing: -0.01em;
        color: #ffffff;
      }
      .prospectus-masthead-desc {
        font-size: 0.98rem;
        line-height: 1.65;
        color: #cbd5e1;
        max-width: 840px;
        margin: 0;
      }
      .prospectus-nav-bar {
        display: flex;
        gap: 6px;
        margin-bottom: 32px;
        border-bottom: 1px solid #cbd5e1;
        padding-bottom: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      .prospectus-nav-label {
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #64748b;
        margin-right: 10px;
      }
      .prospectus-tab-btn {
        background: transparent;
        border: none;
        border-bottom: 2px solid transparent;
        padding: 8px 16px;
        font-size: 0.85rem;
        font-weight: 600;
        color: #475569;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .prospectus-tab-btn:hover {
        color: #0f172a;
      }
      .prospectus-tab-btn.active {
        color: #0f172a;
        font-weight: 700;
        border-bottom: 2px solid #0f172a;
      }
      .prospectus-entry {
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        margin-bottom: 36px;
        overflow: hidden;
      }
      .prospectus-entry-header {
        padding: 28px 32px 20px 32px;
        border-bottom: 1px solid #e2e8f0;
        background: #fafaf9;
      }
      .prospectus-sponsor {
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #64748b;
        margin-bottom: 6px;
      }
      .prospectus-title {
        font-family: "Playfair Display", Georgia, serif;
        font-size: 1.7rem;
        font-weight: 700;
        color: #0f172a;
        margin: 0 0 12px 0;
        line-height: 1.25;
      }
      .prospectus-meta-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        align-items: center;
        font-size: 0.82rem;
        color: #475569;
      }
      .prospectus-meta-item strong {
        color: #0f172a;
        font-weight: 600;
      }
      .prospectus-status-tag {
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 2px 8px;
        border-radius: 4px;
        background: #f1f5f9;
        color: #0f172a;
        border: 1px solid #cbd5e1;
      }
      .prospectus-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.75fr) minmax(0, 1fr);
        gap: 36px;
        padding: 32px;
        align-items: start;
      }
      @media (max-width: 880px) {
        .prospectus-grid {
          grid-template-columns: 1fr;
          gap: 28px;
          padding: 24px 20px;
        }
        .prospectus-entry-header {
          padding: 20px;
        }
        .prospectus-masthead {
          padding: 24px;
        }
      }
      .prospectus-col-main {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      .prospectus-col-side {
        display: flex;
        flex-direction: column;
        gap: 24px;
        background: #fafaf9;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 24px;
      }
      .prospectus-section-label {
        font-size: 0.74rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #64748b;
        margin-bottom: 8px;
        border-bottom: 1px solid #e2e8f0;
        padding-bottom: 4px;
      }
      .prospectus-lead {
        font-size: 0.96rem;
        line-height: 1.65;
        color: #334155;
        margin: 0;
      }
      .prospectus-criterion-block {
        border-left: 3px solid #0f172a;
        background: #f8fafc;
        padding: 16px 20px;
        border-radius: 0 6px 6px 0;
      }
      .prospectus-criterion-title {
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #0f172a;
        margin: 0 0 6px 0;
      }
      .prospectus-criterion-text {
        font-size: 0.9rem;
        line-height: 1.55;
        color: #334155;
        margin: 0;
      }
      .prospectus-sparks-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .prospectus-spark-row {
        border-bottom: 1px solid #f1f5f9;
        padding-bottom: 14px;
      }
      .prospectus-spark-row:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
      .prospectus-spark-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 10px;
        margin-bottom: 4px;
        flex-wrap: wrap;
      }
      .prospectus-spark-title {
        font-weight: 700;
        font-size: 0.94rem;
        color: #0f172a;
      }
      .prospectus-spark-cat {
        font-size: 0.72rem;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .prospectus-spark-desc {
        font-size: 0.86rem;
        line-height: 1.55;
        color: #475569;
        margin: 0 0 8px 0;
      }
      .prospectus-spark-link {
        display: inline-block;
        font-size: 0.78rem;
        font-weight: 700;
        color: #1e3a8a;
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
        text-decoration: underline;
        text-underline-offset: 3px;
        transition: color 0.15s;
      }
      .prospectus-spark-link:hover {
        color: #b45309;
      }
      .prospectus-steps-list {
        margin: 0;
        padding-left: 20px;
        font-size: 0.88rem;
        line-height: 1.7;
        color: #334155;
      }
      .prospectus-steps-list li {
        margin-bottom: 6px;
      }
      .prospectus-dates-block {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .prospectus-date-line {
        font-size: 0.86rem;
        line-height: 1.5;
        color: #334155;
      }
      .prospectus-date-line strong {
        color: #0f172a;
        font-weight: 700;
      }
      .prospectus-prizes-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.85rem;
      }
      .prospectus-prizes-table tr {
        border-bottom: 1px solid #e2e8f0;
      }
      .prospectus-prizes-table tr:last-child {
        border-bottom: none;
      }
      .prospectus-prizes-table td {
        padding: 10px 0;
        vertical-align: top;
      }
      .prospectus-prize-tier {
        font-weight: 700;
        color: #0f172a;
        font-size: 0.85rem;
        margin-bottom: 2px;
      }
      .prospectus-prize-reward {
        font-weight: 700;
        color: #b45309;
        font-size: 0.82rem;
        margin-bottom: 4px;
      }
      .prospectus-prize-desc {
        font-size: 0.8rem;
        color: #64748b;
        line-height: 1.45;
      }
      .prospectus-formats-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .prospectus-format-tag {
        font-size: 0.75rem;
        color: #334155;
        background: #ffffff;
        border: 1px solid #cbd5e1;
        padding: 4px 10px;
        border-radius: 3px;
        font-weight: 500;
      }
      .prospectus-actions-block {
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-top: 1px solid #e2e8f0;
        padding-top: 16px;
      }
      .prospectus-btn-primary {
        display: block;
        text-align: center;
        background: #0f172a;
        color: #ffffff;
        font-size: 0.84rem;
        font-weight: 700;
        padding: 10px 14px;
        border-radius: 4px;
        text-decoration: none;
        transition: background 0.15s ease;
      }
      .prospectus-btn-primary:hover {
        background: #1e3a8a;
      }
      .prospectus-btn-secondary {
        display: block;
        text-align: center;
        background: #ffffff;
        color: #0f172a;
        border: 1px solid #cbd5e1;
        font-size: 0.82rem;
        font-weight: 600;
        padding: 8px 12px;
        border-radius: 4px;
        text-decoration: none;
        transition: all 0.15s ease;
      }
      .prospectus-btn-secondary:hover {
        border-color: #0f172a;
      }
      .prospectus-contact-line {
        font-size: 0.78rem;
        color: #64748b;
        line-height: 1.45;
        margin-top: 4px;
      }
    </style>

    <div class="prospectus-container">
      
      <!-- Academic Masthead -->
      <div class="prospectus-masthead">
        <div class="prospectus-masthead-overline">
          Meoncross School &middot; Co-Curricular &amp; Academic Scholarship
        </div>
        <h1 class="prospectus-masthead-title">
          The Young Historians Prospectus
        </h1>
        <p class="prospectus-masthead-desc">
          Connecting classroom enquiry to authentic primary archives, regional competitions, national scholarship awards, and Oxford University essay prizes. Pupils across Key Stages 3, 4, and Sixth Form are encouraged to submit independent historical research under faculty mentorship.
        </p>
      </div>

      <!-- Navigation & Categorical Filter Bar -->
      <div class="prospectus-nav-bar">
        <span class="prospectus-nav-label">Filter Prospectus:</span>
        <button class="prospectus-tab-btn ${currentFilter === 'all' ? 'active' : ''}" onclick="window.filterCompetitions('all')">
          All Awards (${competitionsData.length})
        </button>
        <button class="prospectus-tab-btn ${currentFilter === 'ks3' ? 'active' : ''}" onclick="window.filterCompetitions('ks3')">
          Key Stage 3 (Years 7&ndash;9)
        </button>
        <button class="prospectus-tab-btn ${currentFilter === 'gcse' ? 'active' : ''}" onclick="window.filterCompetitions('gcse')">
          GCSE (Years 10&ndash;11)
        </button>
        <button class="prospectus-tab-btn ${currentFilter === 'advanced' ? 'active' : ''}" onclick="window.filterCompetitions('advanced')">
          Sixth Form &amp; University Prize
        </button>
      </div>

      <!-- Broadsheet Competitions Register -->
      <div style="display: flex; flex-direction: column; gap: 32px;">
  `;

  filteredCompetitions.forEach((comp) => {
    html += `
      <article class="prospectus-entry" id="comp-${comp.id}">
        
        <!-- Entry Header -->
        <header class="prospectus-entry-header">
          <div class="prospectus-sponsor">${comp.sponsor}</div>
          <h2 class="prospectus-title">${comp.title}</h2>
          <div class="prospectus-meta-bar">
            <span class="prospectus-status-tag">${comp.status}</span>
            <span class="prospectus-meta-item"><strong>Eligibility:</strong> ${comp.targetYears}</span>
            <span class="prospectus-meta-item"><strong>Submissions Due:</strong> ${comp.deadline}</span>
          </div>
        </header>

        <!-- Two-Column Broadsheet Dossier -->
        <div class="prospectus-grid">
          
          <!-- Primary Scholarly Column (Left) -->
          <div class="prospectus-col-main">
            
            <div>
              <div class="prospectus-section-label">Academic Scope &amp; Enquiry</div>
              <p class="prospectus-lead">${comp.overview}</p>
            </div>

            <div class="prospectus-criterion-block">
              <div class="prospectus-criterion-title">Archival Evidence &amp; Scholarly Standard</div>
              <p class="prospectus-criterion-text">${comp.keyRequirement}</p>
            </div>

            <div>
              <div class="prospectus-section-label">Curriculum Connections &amp; Research Pathways</div>
              <div class="prospectus-sparks-list">
                ${comp.localSparks
                  .map(
                    (spark) => `
                  <div class="prospectus-spark-row">
                    <div class="prospectus-spark-header">
                      <span class="prospectus-spark-title">${spark.title}</span>
                      <span class="prospectus-spark-cat">${spark.category}</span>
                    </div>
                    <p class="prospectus-spark-desc">${spark.desc}</p>
                    ${
                      spark.unitId
                        ? `
                      <button type="button" class="prospectus-spark-link" onclick="window.openLessonFromCompetition('${spark.unitId}', ${spark.lessonIndex !== undefined ? spark.lessonIndex : 0})">
                        ${spark.lessonLabel || 'Examine Curriculum Lesson'} &rarr;
                      </button>
                    `
                        : ''
                    }
                  </div>
                `,
                  )
                  .join('')}
              </div>
            </div>

            <div>
              <div class="prospectus-section-label">Submission Protocol</div>
              <ol class="prospectus-steps-list">
                ${comp.howToEnter.map((step) => `<li>${step}</li>`).join('')}
              </ol>
            </div>

          </div>

          <!-- Gazette & Specifications Column (Right Sidebar) -->
          <aside class="prospectus-col-side">
            
            <div>
              <div class="prospectus-section-label">Schedule &amp; Adjudication</div>
              <div class="prospectus-dates-block">
                <div class="prospectus-date-line">
                  <strong>Final Deadline:</strong><br />
                  ${comp.deadline}
                </div>
                ${
                  comp.ceremony
                    ? `
                  <div class="prospectus-date-line" style="margin-top: 6px;">
                    <strong>Presentation:</strong><br />
                    ${comp.ceremony}
                  </div>
                `
                    : ''
                }
              </div>
            </div>

            <div>
              <div class="prospectus-section-label">Endowments &amp; Honours</div>
              <table class="prospectus-prizes-table">
                <tbody>
                  ${comp.prizes
                    .map(
                      (p) => `
                    <tr>
                      <td>
                        <div class="prospectus-prize-tier">${p.tier}</div>
                        <div class="prospectus-prize-reward">${p.reward}</div>
                        <div class="prospectus-prize-desc">${p.desc}</div>
                      </td>
                    </tr>
                  `,
                    )
                    .join('')}
                </tbody>
              </table>
            </div>

            <div>
              <div class="prospectus-section-label">Prescribed Mediums</div>
              <div class="prospectus-formats-list">
                ${comp.acceptableFormats
                  .map(
                    (f) => `
                  <span class="prospectus-format-tag">${f.name}</span>
                `,
                  )
                  .join('')}
              </div>
            </div>

            <div class="prospectus-actions-block">
              ${
                comp.posterPdfUrl
                  ? `
                <a href="${comp.posterPdfUrl}" download="Hampshire_Archives_History_Competition_Poster.pdf" target="_blank" class="prospectus-btn-primary">
                  Download Official Notice (PDF)
                </a>
              `
                  : ''
              }
              ${comp.links
                .filter((l) => !l.isDownload)
                .map(
                  (link) => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="prospectus-btn-secondary">
                  ${link.label} &rarr;
                </a>
              `,
                )
                .join('')}
              <div class="prospectus-contact-line">
                <strong>Faculty Contact:</strong><br />
                ${comp.contact}
              </div>
            </div>

          </aside>

        </div>
      </article>
    `;
  });

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
  if (window.scrollToTop) window.scrollToTop(true);
}

if (typeof window !== 'undefined') {
  window.filterCompetitions = function (filterKey) {
    currentFilter = filterKey;
    renderCompetitionsView();
  };
}

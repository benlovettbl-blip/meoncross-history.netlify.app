/**
 * Competitions & Young Historians Hub View
 * Renders regional, national, and university historical competitions, academic prizes, and curriculum links.
 */

import { competitionsData } from './competitions_data.js';

// Global handler to jump directly into a curriculum lesson from a competition research prompt
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
    <div style="max-width: 1150px; margin: 0 auto; padding: 0 20px 60px 20px; animation: fadeInUp 0.3s ease-out;">
      
      <!-- Hero Header -->
      <div style="background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); border-radius: 16px; padding: 32px 28px; color: #ffffff; margin-bottom: 24px; box-shadow: 0 10px 25px rgba(30, 58, 138, 0.25); position: relative; overflow: hidden;">
        <div style="position: absolute; right: -20px; bottom: -20px; font-size: 150px; color: rgba(255, 255, 255, 0.04); pointer-events: none;">
          <i class="fa-solid fa-trophy"></i>
        </div>
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(245, 158, 11, 0.2); border: 1px solid rgba(245, 158, 11, 0.4); padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">
          <i class="fa-solid fa-star"></i> Co-Curricular &amp; Academic Enrichment
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 2.1rem; margin: 0 0 10px 0; color: #ffffff; font-weight: 800;">
          Young Historians &amp; Competitions Hub
        </h1>
        <p style="margin: 0; font-size: 1rem; color: #cbd5e1; max-width: 820px; line-height: 1.6;">
          Take your historical enquiry beyond the classroom. Investigate authentic primary archives, represent Meoncross School, connect classroom learning to real scholarship, and compete for county and national trophies, Oxford University prizes, and student cash awards.
        </p>
      </div>

      <!-- Filter Controls Bar -->
      <div style="display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; align-items: center; background: #ffffff; padding: 8px 12px; border-radius: 10px; border: 1.5px solid #e2e8f0; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
        <span style="font-size: 0.8rem; font-weight: 700; color: #64748b; margin-right: 6px; text-transform: uppercase; letter-spacing: 0.05em;">
          <i class="fa-solid fa-filter" style="color: #2563eb;"></i> Filter By Category:
        </span>
        <button class="comp-filter-btn ${currentFilter === 'all' ? 'active' : ''}" onclick="window.filterCompetitions('all')" style="${getFilterBtnStyle(currentFilter === 'all')}">
          All Awards (${competitionsData.length})
        </button>
        <button class="comp-filter-btn ${currentFilter === 'ks3' ? 'active' : ''}" onclick="window.filterCompetitions('ks3')" style="${getFilterBtnStyle(currentFilter === 'ks3')}">
          Years 7–9 (KS3)
        </button>
        <button class="comp-filter-btn ${currentFilter === 'gcse' ? 'active' : ''}" onclick="window.filterCompetitions('gcse')" style="${getFilterBtnStyle(currentFilter === 'gcse')}">
          Years 10–11 (GCSE)
        </button>
        <button class="comp-filter-btn ${currentFilter === 'advanced' ? 'active' : ''}" onclick="window.filterCompetitions('advanced')" style="${getFilterBtnStyle(currentFilter === 'advanced')}">
          Advanced Extension (Oxford Prize)
        </button>
      </div>

      <!-- Competitions List -->
      <div style="display: flex; flex-direction: column; gap: 32px;">
  `;

  filteredCompetitions.forEach((comp) => {
    html += `
      <div class="competition-card" id="comp-${comp.id}" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s;">
        
        <!-- Card Top Bar -->
        <div style="background: #f8fafc; border-bottom: 1.5px solid #e2e8f0; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: #fef3c7; color: #d97706; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; border: 1.5px solid #fde68a; flex-shrink: 0;">
              <i class="fa-solid ${comp.sponsorLogo || 'fa-trophy'}"></i>
            </div>
            <div>
              <span style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em;">${comp.sponsor}</span>
              <h2 style="margin: 2px 0 0 0; font-size: 1.35rem; font-family: 'Playfair Display', serif; color: #1e293b; font-weight: 700;">
                ${comp.title}
              </h2>
            </div>
          </div>
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <span style="background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 4px 10px; border-radius: 20px; font-size: 0.78rem; font-weight: 700;">
              <i class="fa-solid fa-circle-check"></i> ${comp.status}
            </span>
            <span style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 4px 10px; border-radius: 20px; font-size: 0.78rem; font-weight: 700;">
              <i class="fa-solid fa-users"></i> ${comp.targetYears}
            </span>
          </div>
        </div>

        <!-- Card Body -->
        <div style="padding: 24px;">
          
          <!-- Key Overview -->
          <p style="font-size: 0.98rem; color: #334155; line-height: 1.6; margin: 0 0 20px 0;">
            ${comp.overview}
          </p>

          <!-- Prizes Grid -->
          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; margin: 0 0 12px 0; font-weight: 700;">
              <i class="fa-solid fa-award" style="color: #f59e0b;"></i> Awards &amp; Prizes
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
              ${comp.prizes
                .map(
                  (p) => `
                <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 14px 16px;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                    <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: #64748b;">${p.tier}</span>
                    <i class="fa-solid ${p.icon}" style="color: #f59e0b; font-size: 0.9rem;"></i>
                  </div>
                  <div style="font-size: 1.05rem; font-weight: 800; color: #1e293b; margin-bottom: 4px;">${p.reward}</div>
                  <div style="font-size: 0.82rem; color: #475569; line-height: 1.4;">${p.desc}</div>
                </div>
              `,
                )
                .join('')}
            </div>
            ${
              comp.ceremony
                ? `
              <div style="margin-top: 10px; background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 10px 14px; display: flex; align-items: center; gap: 10px; font-size: 0.82rem; color: #92400e; font-weight: 600;">
                <i class="fa-solid fa-crown" style="color: #d97706; font-size: 1rem; flex-shrink: 0;"></i>
                <span>${comp.ceremony}</span>
              </div>
            `
                : ''
            }
          </div>

          <!-- Archival / Scholarly Requirement Callout -->
          <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 10px; padding: 16px 20px; margin-bottom: 24px; display: flex; gap: 14px; align-items: flex-start;">
            <i class="fa-solid fa-box-archive" style="color: #16a34a; font-size: 1.4rem; margin-top: 2px; flex-shrink: 0;"></i>
            <div>
              <h4 style="margin: 0 0 4px 0; color: #166534; font-size: 0.95rem; font-weight: 700;">The Core Criterion: Archival Evidence &amp; Independent Enquiry</h4>
              <p style="margin: 0; color: #15803d; font-size: 0.88rem; line-height: 1.5;">${comp.keyRequirement}</p>
            </div>
          </div>

          <!-- Formats Accepted -->
          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; margin: 0 0 10px 0; font-weight: 700;">
              <i class="fa-solid fa-shapes" style="color: #3b82f6;"></i> Accepted Project Mediums
            </h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${comp.acceptableFormats
                .map(
                  (f) => `
                <span style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 20px; padding: 6px 14px; font-size: 0.82rem; font-weight: 600; color: #334155; display: inline-flex; align-items: center; gap: 6px;">
                  <i class="fa-solid ${f.icon}" style="color: #2563eb;"></i> ${f.name}
                </span>
              `,
                )
                .join('')}
            </div>
          </div>

          <!-- Curriculum Research Sparks (Interactive with lesson jump buttons!) -->
          <div style="margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <h3 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; margin: 0; font-weight: 700;">
                <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Meoncross Curriculum Links &amp; Research Ideas
              </h3>
              <span style="font-size: 0.75rem; color: #64748b; font-weight: 600;">Click any card to explore the related portal lesson</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
              ${comp.localSparks
                .map(
                  (spark) => `
                <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.03); display: flex; flex-direction: column; justify-content: space-between; transition: all 0.2s;" onmouseover="this.style.borderColor='#93c5fd'; this.style.boxShadow='0 4px 12px rgba(37, 99, 235, 0.08)';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.03)';">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 4px;">
                      <span style="font-size: 0.72rem; font-weight: 700; color: #0284c7; background: #e0f2fe; padding: 3px 8px; border-radius: 12px;">${spark.badge}</span>
                      <span style="font-size: 0.72rem; color: #64748b; font-weight: 600;">${spark.category}</span>
                    </div>
                    <div style="font-weight: 800; font-size: 0.95rem; color: #1e293b; margin-bottom: 6px; line-height: 1.35;">${spark.title}</div>
                    <div style="font-size: 0.83rem; color: #475569; line-height: 1.5; margin-bottom: 12px;">${spark.desc}</div>
                  </div>
                  ${
                    spark.unitId
                      ? `
                    <button type="button" onclick="window.openLessonFromCompetition('${spark.unitId}', ${spark.lessonIndex !== undefined ? spark.lessonIndex : 0})" style="background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; padding: 7px 12px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: all 0.15s; margin-top: auto;" onmouseover="this.style.background='#dbeafe';" onmouseout="this.style.background='#eff6ff';">
                      <span><i class="fa-solid fa-book-open" style="margin-right: 6px;"></i> ${spark.lessonLabel || 'Explore Lesson'}</span>
                      <i class="fa-solid fa-arrow-right"></i>
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

          <!-- Important Deadlines & How to Enter -->
          <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; flex-wrap: wrap;">
              <i class="fa-solid fa-calendar-check" style="color: #dc2626;"></i>
              <strong style="color: #1e293b; font-size: 0.92rem;">Submission Deadline:</strong>
              <span style="background: #fee2e2; color: #b91c1c; font-weight: 700; padding: 3px 10px; border-radius: 6px; font-size: 0.85rem; border: 1px solid #fca5a5;">
                ${comp.deadline}
              </span>
            </div>
            <ol style="margin: 0; padding-left: 20px; font-size: 0.85rem; color: #475569; line-height: 1.7;">
              ${comp.howToEnter.map((step) => `<li>${step}</li>`).join('')}
            </ol>
          </div>

          <!-- Action Links, Poster Download & Teacher Contact -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; border-top: 1.5px solid #f1f5f9; padding-top: 18px;">
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              ${
                comp.posterPdfUrl
                  ? `
                <a href="${comp.posterPdfUrl}" download="Hampshire_Archives_History_Competition_Poster.pdf" target="_blank" style="display: inline-flex; align-items: center; gap: 7px; background: #dc2626; color: #ffffff; padding: 9px 16px; border-radius: 6px; font-size: 0.85rem; font-weight: 700; text-decoration: none; box-shadow: 0 2px 6px rgba(220, 38, 38, 0.25); transition: all 0.2s;" onmouseover="this.style.background='#b91c1c';" onmouseout="this.style.background='#dc2626';">
                  <i class="fa-solid fa-file-pdf"></i>
                  <span>Download A4 Printable Poster (PDF)</span>
                </a>
              `
                  : ''
              }
              ${comp.links
                .filter((l) => !l.isDownload)
                .map(
                  (link) => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 6px; background: #ffffff; border: 1.5px solid #cbd5e1; padding: 8px 14px; border-radius: 6px; font-size: 0.84rem; font-weight: 600; color: #1e293b; text-decoration: none; transition: all 0.2s;" onmouseover="this.style.borderColor='#1e3a8a'; this.style.color='#1e3a8a';" onmouseout="this.style.borderColor='#cbd5e1'; this.style.color='#1e293b';">
                  <i class="fa-solid ${link.icon}" style="color: #2563eb;"></i>
                  <span>${link.label}</span>
                </a>
              `,
                )
                .join('')}
            </div>
            <div style="font-size: 0.82rem; color: #64748b; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-envelope" style="color: #94a3b8;"></i>
              <span>${comp.contact}</span>
            </div>
          </div>

        </div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
  if (window.scrollToTop) window.scrollToTop(true);
}

function getFilterBtnStyle(isActive) {
  if (isActive) {
    return 'background: #1e3a8a; color: #ffffff; border: 1px solid #1e3a8a; padding: 6px 14px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: all 0.15s;';
  }
  return 'background: #f8fafc; color: #475569; border: 1px solid #cbd5e1; padding: 6px 14px; border-radius: 6px; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.15s;';
}

window.filterCompetitions = function (filterKey) {
  currentFilter = filterKey;
  renderCompetitionsView();
};

/**
 * Competitions & Young Historians Hub View
 * Renders co-curricular historical competitions, academic prizes, and archival enrichment.
 */

import { competitionsData } from './competitions_data.js';

export function renderCompetitionsView() {
  const container = document.getElementById('main-content');
  if (!container) return;

  let html = `
    <div style="max-width: 1150px; margin: 0 auto; padding: 0 20px 60px 20px; animation: fadeInUp 0.3s ease-out;">
      
      <!-- Hero Header -->
      <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%); border-radius: 16px; padding: 32px 28px; color: #ffffff; margin-bottom: 30px; box-shadow: 0 10px 25px rgba(30, 58, 138, 0.25); position: relative; overflow: hidden;">
        <div style="position: absolute; right: -20px; bottom: -20px; font-size: 140px; color: rgba(255, 255, 255, 0.05); pointer-events: none;">
          <i class="fa-solid fa-trophy"></i>
        </div>
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(245, 158, 11, 0.2); border: 1px solid rgba(245, 158, 11, 0.4); padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">
          <i class="fa-solid fa-star"></i> Co-Curricular &amp; Academic Enrichment
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 2rem; margin: 0 0 10px 0; color: #ffffff; font-weight: 800;">
          Young Historians &amp; Competitions Hub
        </h1>
        <p style="margin: 0; font-size: 1rem; color: #cbd5e1; max-width: 780px; line-height: 1.6;">
          Take your historical enquiry beyond the classroom. Investigate authentic primary archives, represent Meoncross School, and compete for county and national trophies and student cash prizes.
        </p>
      </div>

      <!-- Competitions Container -->
      <div style="display: flex; flex-direction: column; gap: 32px;">
  `;

  competitionsData.forEach((comp) => {
    html += `
      <div class="competition-card" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s;">
        
        <!-- Card Top Bar -->
        <div style="background: #f8fafc; border-bottom: 1.5px solid #e2e8f0; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: #fef3c7; color: #d97706; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; border: 1.5px solid #fde68a;">
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
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
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

          <!-- Archival Requirement Callout -->
          <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 10px; padding: 16px 20px; margin-bottom: 24px; display: flex; gap: 14px; align-items: flex-start;">
            <i class="fa-solid fa-box-archive" style="color: #16a34a; font-size: 1.4rem; margin-top: 2px; flex-shrink: 0;"></i>
            <div>
              <h4 style="margin: 0 0 4px 0; color: #166534; font-size: 0.95rem; font-weight: 700;">The Core Criterion: Primary Archival Evidence</h4>
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

          <!-- Local Meoncross Enquiry Sparks -->
          <div style="margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <h3 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; margin: 0; font-weight: 700;">
                <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Meoncross Hampshire Research Sparks
              </h3>
              <span style="font-size: 0.75rem; color: #64748b;">Ideas to kickstart your project</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px;">
              ${comp.localSparks
                .map(
                  (spark) => `
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <span style="font-size: 0.7rem; font-weight: 700; color: #0284c7; background: #e0f2fe; padding: 2px 8px; border-radius: 12px;">${spark.badge}</span>
                      <span style="font-size: 0.7rem; color: #94a3b8; font-weight: 600;">${spark.category}</span>
                    </div>
                    <div style="font-weight: 700; font-size: 0.92rem; color: #1e293b; margin-bottom: 6px; line-height: 1.3;">${spark.title}</div>
                    <div style="font-size: 0.8rem; color: #475569; line-height: 1.45;">${spark.desc}</div>
                  </div>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>

          <!-- Important Deadlines & How to Enter -->
          <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <i class="fa-solid fa-calendar-check" style="color: #dc2626;"></i>
              <strong style="color: #1e293b; font-size: 0.92rem;">Submission Deadline:</strong>
              <span style="background: #fee2e2; color: #b91c1c; font-weight: 700; padding: 3px 8px; border-radius: 6px; font-size: 0.85rem; border: 1px solid #fca5a5;">
                ${comp.deadline}
              </span>
            </div>
            <ol style="margin: 0; padding-left: 20px; font-size: 0.85rem; color: #475569; line-height: 1.7;">
              ${comp.howToEnter.map((step) => `<li>${step}</li>`).join('')}
            </ol>
          </div>

          <!-- Action Links & Teacher Contact -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; border-top: 1.5px solid #f1f5f9; padding-top: 18px;">
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              ${comp.links
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
              <span>Entries co-ordinated by Mr Lovett (Head of History)</span>
            </div>
          </div>

        </div>
      </div>
    `;
  });

  // Future Competitions Teaser Card
  html += `
        <div style="background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 24px; text-align: center; color: #64748b;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: #e2e8f0; display: inline-flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #64748b; margin-bottom: 10px;">
            <i class="fa-solid fa-plus"></i>
          </div>
          <h3 style="margin: 0 0 6px 0; font-size: 1.05rem; color: #334155; font-weight: 700;">More National Competitions Coming Soon</h3>
          <p style="margin: 0; font-size: 0.85rem; max-width: 500px; margin: 0 auto; line-height: 1.5;">
            Further historical essay prizes and national awards (including the Historical Association Young Historian Awards) will be featured here throughout the academic year.
          </p>
        </div>

      </div>
    </div>
  `;

  container.innerHTML = html;
  if (window.scrollToTop) window.scrollToTop(true);
}

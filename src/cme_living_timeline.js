/**
 * cme_living_timeline.js
 *
 * Interactive Living Chronological Timeline for Pearson Edexcel GCSE (9–1) History
 * Paper 2: Conflict in the Middle East, 1945–1995 (Option 26/27)
 *
 * Features:
 * - 24 curated specification milestones across 4 Key Topic Eras
 * - 3-beat rhythm on every card: TRIGGER -> ACTION -> CONSEQUENCE
 * - Interactive Era filter pills (All, KT1, KT2, KT3A, KT3B)
 * - Edexcel 5-Beat Narrative Causation Chains for each Era
 * - Interactive image zoom Lightbox Modal with archival captions
 * - "Jump to Lesson" navigation directly into the web app study views
 * - Direct link to the compiled 4-page master revision timeline (/units/cme_new/timeline.html)
 * - Compact / Expand detail view toggle
 */

import { CME_ERAS, CME_TIMELINE_MILESTONES } from './data/cme/timeline_data.js';

export function renderCmeLivingTimeline(container) {
  if (!container) return;

  let currentFilter = 'all';
  let isCompact = false;

  function render() {
    const filteredMilestones =
      currentFilter === 'all'
        ? CME_TIMELINE_MILESTONES
        : CME_TIMELINE_MILESTONES.filter((m) => m.eraId === currentFilter);

    const activeEras =
      currentFilter === 'all' ? CME_ERAS : CME_ERAS.filter((e) => e.eraId === currentFilter);

    container.innerHTML = `
      <style>
        .cme-tl-wrapper {
          max-width: 1280px;
          margin: 0 auto;
          padding: 16px 20px 60px 20px;
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: var(--text-primary, #0f172a);
        }

        /* Header Hero */
        .cme-tl-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e3a8a 100%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 24px 28px;
          margin-bottom: 24px;
          color: #ffffff;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cme-tl-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .cme-tl-meta-badge {
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .cme-tl-hero-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          flex-wrap: wrap;
        }

        .cme-tl-title-group h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.85rem;
          font-weight: 800;
          margin: 0 0 6px 0;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        .cme-tl-title-group p {
          margin: 0;
          color: #cbd5e1;
          font-size: 0.95rem;
          max-width: 720px;
          line-height: 1.45;
        }

        .cme-tl-hero-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        .cme-tl-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
          border: none;
        }

        .cme-tl-btn-primary {
          background: #2563eb;
          color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
        }
        .cme-tl-btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        .cme-tl-btn-secondary {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
        .cme-tl-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Filter Controls */
        .cme-tl-controls {
          background: var(--card-bg, #ffffff);
          border: 1px solid var(--border-glass, #e2e8f0);
          border-radius: 10px;
          padding: 12px 18px;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .cme-tl-filter-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .cme-tl-pill-btn {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #475569;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cme-tl-pill-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .cme-tl-pill-btn.active {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.25);
        }

        /* Era Header & Causation Strip */
        .cme-tl-era-block {
          margin-bottom: 36px;
        }

        .cme-tl-era-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 10px;
          margin-bottom: 16px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cme-tl-era-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.35rem;
          font-weight: 800;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cme-tl-era-badge {
          font-family: 'Outfit', sans-serif;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 4px;
          color: #ffffff;
          letter-spacing: 0.05em;
        }

        /* Narrative Causation Chain */
        .cme-tl-causation-chain {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px 16px;
          margin-bottom: 20px;
        }

        .cme-tl-causation-title {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #64748b;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .cme-tl-chain-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px;
        }

        .cme-tl-chain-step {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-left: 3px solid #2563eb;
          border-radius: 4px;
          padding: 8px 10px;
          font-size: 0.78rem;
        }

        .cme-tl-chain-step strong {
          display: block;
          color: #1e293b;
          font-size: 0.8rem;
          margin-bottom: 2px;
        }

        .cme-tl-chain-step span {
          color: #475569;
          line-height: 1.3;
          display: block;
        }

        /* Cards Grid */
        .cme-tl-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 18px;
        }

        .cme-tl-card {
          background: var(--card-bg, #ffffff);
          border: 1px solid var(--border-glass, #e2e8f0);
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .cme-tl-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        .cme-tl-card-header {
          padding: 12px 16px 8px 16px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .cme-tl-card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .cme-tl-date-badge {
          color: #ffffff;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.02em;
        }

        .cme-tl-spec-tag {
          font-size: 0.68rem;
          font-weight: 700;
          color: #475569;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 2px 6px;
          border-radius: 3px;
        }

        .cme-tl-card-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0;
          color: var(--text-primary, #0f172a);
          line-height: 1.3;
        }

        .cme-tl-card-body {
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        /* Image Box */
        .cme-tl-thumb-box {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid #cbd5e1;
          background: #0f172a;
          cursor: pointer;
          height: 140px;
        }

        .cme-tl-thumb-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .cme-tl-thumb-box:hover img {
          transform: scale(1.04);
        }

        .cme-tl-zoom-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #ffffff;
          font-size: 0.78rem;
          font-weight: 700;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .cme-tl-thumb-box:hover .cme-tl-zoom-overlay {
          opacity: 1;
        }

        .cme-tl-img-caption {
          font-size: 0.7rem;
          color: #64748b;
          font-style: italic;
          line-height: 1.3;
          margin-top: -6px;
        }

        /* 3-Beat Rhythm */
        .cme-tl-rhythm {
          display: flex;
          flex-direction: column;
          gap: 7px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 10px 12px;
          font-size: 0.8rem;
          line-height: 1.4;
        }

        .cme-tl-rhythm-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .cme-tl-rhythm-badge {
          font-size: 0.64rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 3px;
          letter-spacing: 0.04em;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .badge-trigger {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        }
        .badge-action {
          background: #eff6ff;
          color: #1e40af;
          border: 1px solid #93c5fd;
        }
        .badge-consequence {
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #6ee7b7;
        }

        .cme-tl-rhythm-text {
          color: #334155;
          flex: 1;
        }

        .cme-tl-card-footer {
          padding: 8px 16px 12px 16px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fafafa;
          gap: 8px;
        }

        .cme-tl-lesson-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748b;
        }

        .cme-tl-jump-btn {
          background: #0f172a;
          color: #ffffff;
          border: none;
          border-radius: 4px;
          padding: 5px 10px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .cme-tl-jump-btn:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }

        /* Lightbox Modal */
        .cme-tl-lightbox-modal {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        .cme-tl-lightbox-modal.active {
          opacity: 1;
          pointer-events: auto;
        }

        .cme-tl-modal-content {
          background: #ffffff;
          border-radius: 10px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .cme-tl-modal-header {
          padding: 12px 18px;
          background: #0f172a;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cme-tl-modal-header h3 {
          margin: 0;
          font-size: 1.05rem;
          font-family: 'Playfair Display', Georgia, serif;
        }

        .cme-tl-modal-close {
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 1.4rem;
          cursor: pointer;
          line-height: 1;
          padding: 0 4px;
        }

        .cme-tl-modal-img-wrap {
          background: #020617;
          display: flex;
          align-items: center;
          justify-content: center;
          max-height: 60vh;
          overflow: hidden;
        }

        .cme-tl-modal-img-wrap img {
          max-width: 100%;
          max-height: 60vh;
          object-fit: contain;
        }

        .cme-tl-modal-caption {
          padding: 12px 18px;
          font-size: 0.85rem;
          color: #334155;
          line-height: 1.4;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }

        @media (max-width: 768px) {
          .cme-tl-cards-grid {
            grid-template-columns: 1fr;
          }
          .cme-tl-hero {
            padding: 18px;
          }
          .cme-tl-title-group h2 {
            font-size: 1.4rem;
          }
        }
      </style>

      <div class="cme-tl-wrapper">
        <!-- Hero Header -->
        <div class="cme-tl-hero">
          <div class="cme-tl-badge-row">
            <span class="cme-tl-meta-badge"><i class="fa-solid fa-graduation-cap"></i> Edexcel GCSE Paper 2</span>
            <span class="cme-tl-meta-badge"><i class="fa-solid fa-compass"></i> Conflict in the Middle East, 1945–1995</span>
            <span class="cme-tl-meta-badge" style="background: rgba(37, 99, 235, 0.4);"><i class="fa-solid fa-check-double"></i> 24 Curated Milestones</span>
          </div>

          <div class="cme-tl-hero-main">
            <div class="cme-tl-title-group">
              <h2>Living Chronological Timeline</h2>
              <p>Explore the 50-year arc of conflict, diplomacy, and grassroots resistance through 24 specification milestones. Every event features authentic primary evidence and the 3-beat causal rhythm (<strong>Trigger &rarr; Action &rarr; Consequence</strong>).</p>
            </div>

            <div class="cme-tl-hero-actions">
              <a href="/units/cme_new/timeline.html" target="_blank" class="cme-tl-btn cme-tl-btn-primary" id="btn-open-timeline-page">
                <i class="fa-solid fa-file-pdf"></i> Open 4-Page Revision Timeline
              </a>
              <button class="cme-tl-btn cme-tl-btn-secondary" id="btn-toggle-timeline-details">
                <i class="fa-solid fa-arrows-up-down"></i> ${isCompact ? 'Expand Details' : 'Compact View'}
              </button>
            </div>
          </div>
        </div>

        <!-- Filter Controls -->
        <div class="cme-tl-controls">
          <div class="cme-tl-filter-pills">
            <button class="cme-tl-pill-btn ${currentFilter === 'all' ? 'active' : ''}" data-era="all">
              <i class="fa-solid fa-layer-group"></i> All 24 Milestones
            </button>
            <button class="cme-tl-pill-btn ${currentFilter === 'kt_1' ? 'active' : ''}" data-era="kt_1">
              KT 1: Mandate & Creation (1945–49)
            </button>
            <button class="cme-tl-pill-btn ${currentFilter === 'kt_2' ? 'active' : ''}" data-era="kt_2">
              KT 2: Crises & Conflict (1955–73)
            </button>
            <button class="cme-tl-pill-btn ${currentFilter === 'kt_3a' ? 'active' : ''}" data-era="kt_3a">
              KT 3A: Shuttle to Camp David (1974–79)
            </button>
            <button class="cme-tl-pill-btn ${currentFilter === 'kt_3b' ? 'active' : ''}" data-era="kt_3b">
              KT 3B: Lebanon to Oslo (1982–95)
            </button>
          </div>
          <span style="font-size: 0.8rem; font-weight: 700; color: #64748b;">
            Showing <strong>${filteredMilestones.length}</strong> of 24 Milestones
          </span>
        </div>

        <!-- Active Eras Content -->
        ${activeEras
          .map((era) => {
            const eraMilestones = filteredMilestones.filter((m) => m.eraId === era.eraId);
            if (eraMilestones.length === 0) return '';

            return `
            <div class="cme-tl-era-block" data-era-block="${era.eraId}">
              <!-- Era Header -->
              <div class="cme-tl-era-header">
                <h3 class="cme-tl-era-title" style="color: ${era.themeColor};">
                  <span class="cme-tl-era-badge" style="background: ${era.themeColor};">${era.badgeText}</span>
                  ${era.eraTitle}
                </h3>
              </div>

              <!-- 5-Beat Narrative Causation Chain -->
              ${
                era.narrativeChain && era.narrativeChain.length > 0
                  ? `
                <div class="cme-tl-causation-chain">
                  <div class="cme-tl-causation-title">
                    <i class="fa-solid fa-link" style="color: ${era.themeColor};"></i> Edexcel 8-Mark Narrative Causation Sequence
                  </div>
                  <div class="cme-tl-chain-steps">
                    ${era.narrativeChain
                      .map(
                        (step) => `
                      <div class="cme-tl-chain-step" style="border-left-color: ${era.themeColor};">
                        <strong>${step.title}</strong>
                        <span>${step.desc}</span>
                      </div>
                    `,
                      )
                      .join('')}
                  </div>
                </div>
              `
                  : ''
              }

              <!-- Cards Grid -->
              <div class="cme-tl-cards-grid">
                ${eraMilestones
                  .map(
                    (m) => `
                  <div class="cme-tl-card" style="border-left: 4px solid ${era.themeColor};" data-milestone-id="${m.id}">
                    <div class="cme-tl-card-header">
                      <div class="cme-tl-card-top-row">
                        <span class="cme-tl-date-badge" style="background: ${era.themeColor};">${m.date}</span>
                        <span class="cme-tl-spec-tag">${m.specTag}</span>
                      </div>
                      <h4 class="cme-tl-card-title">${m.title}</h4>
                    </div>

                    ${
                      !isCompact
                        ? `
                      <div class="cme-tl-card-body">
                        ${
                          m.image
                            ? `
                          <div class="cme-tl-thumb-box" data-action="zoom-img" data-img="${m.image}" data-title="${m.title}" data-caption="${m.caption || ''}">
                            <img src="${m.image}" alt="${m.title}" loading="lazy">
                            <div class="cme-tl-zoom-overlay">
                              <i class="fa-solid fa-magnifying-glass-plus"></i> Enlarge Primary Source
                            </div>
                          </div>
                          ${m.caption ? `<div class="cme-tl-img-caption">${m.caption}</div>` : ''}
                        `
                            : ''
                        }

                        <div class="cme-tl-rhythm">
                          <div class="cme-tl-rhythm-row">
                            <span class="cme-tl-rhythm-badge badge-trigger">Trigger</span>
                            <span class="cme-tl-rhythm-text">${m.trigger}</span>
                          </div>
                          <div class="cme-tl-rhythm-row">
                            <span class="cme-tl-rhythm-badge badge-action">Action</span>
                            <span class="cme-tl-rhythm-text">${m.action}</span>
                          </div>
                          <div class="cme-tl-rhythm-row">
                            <span class="cme-tl-rhythm-badge badge-consequence">Consequence</span>
                            <span class="cme-tl-rhythm-text">${m.consequence}</span>
                          </div>
                        </div>
                      </div>
                    `
                        : ''
                    }

                    <div class="cme-tl-card-footer">
                      <span class="cme-tl-lesson-tag"><i class="fa-solid fa-book-bookmark"></i> ${m.lessonTitle ? m.lessonTitle.split(':')[0] : 'Lesson'}</span>
                      <button class="cme-tl-jump-btn" data-action="jump-lesson" data-lesson-idx="${m.lessonIndex}">
                        <i class="fa-solid fa-arrow-right"></i> Study Lesson
                      </button>
                    </div>
                  </div>
                `,
                  )
                  .join('')}
              </div>
            </div>
          `;
          })
          .join('')}
      </div>

      <!-- Lightbox Modal -->
      <div class="cme-tl-lightbox-modal" id="cme-tl-lightbox">
        <div class="cme-tl-modal-content">
          <div class="cme-tl-modal-header">
            <h3 id="cme-tl-modal-title">Primary Source Image</h3>
            <button class="cme-tl-modal-close" id="cme-tl-modal-close">&times;</button>
          </div>
          <div class="cme-tl-modal-img-wrap">
            <img id="cme-tl-modal-img" src="" alt="Enlarged Primary Source">
          </div>
          <div class="cme-tl-modal-caption" id="cme-tl-modal-caption"></div>
        </div>
      </div>
    `;

    // Attach Event Listeners
    attachEvents();
  }

  function attachEvents() {
    // 1. Era filter buttons
    const filterBtns = container.querySelectorAll('.cme-tl-pill-btn');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        currentFilter = btn.dataset.era;
        render();
      });
    });

    // 2. Toggle compact view
    const toggleBtn = container.querySelector('#btn-toggle-timeline-details');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isCompact = !isCompact;
        render();
      });
    }

    // 3. Jump to Lesson buttons
    const jumpBtns = container.querySelectorAll('.cme-tl-jump-btn');
    jumpBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lessonIdx = parseInt(btn.dataset.lessonIdx, 10);
        if (!isNaN(lessonIdx) && typeof window.switchView === 'function') {
          window.switchView('lessons', 'cme_new').then(() => {
            setTimeout(() => {
              if (typeof window.renderLessonByIndex === 'function') {
                window.renderLessonByIndex(lessonIdx, true);
              }
            }, 100);
          });
        }
      });
    });

    // 4. Lightbox Modal
    const lightbox = container.querySelector('#cme-tl-lightbox');
    const modalImg = container.querySelector('#cme-tl-modal-img');
    const modalTitle = container.querySelector('#cme-tl-modal-title');
    const modalCaption = container.querySelector('#cme-tl-modal-caption');
    const modalClose = container.querySelector('#cme-tl-modal-close');

    const zoomBoxes = container.querySelectorAll('.cme-tl-thumb-box');
    zoomBoxes.forEach((box) => {
      box.addEventListener('click', () => {
        const src = box.dataset.img;
        const title = box.dataset.title;
        const caption = box.dataset.caption;

        if (modalImg) modalImg.src = src;
        if (modalTitle) modalTitle.textContent = title || 'Primary Source Evidence';
        if (modalCaption) modalCaption.textContent = caption || '';
        if (lightbox) lightbox.classList.add('active');
      });
    });

    if (modalClose && lightbox) {
      modalClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
      });
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.classList.remove('active');
        }
      });
    }
  }

  // Initial render
  render();
}

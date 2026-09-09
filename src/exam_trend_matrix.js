/**
 * exam_trend_matrix.js
 *
 * Interactive Pearson Edexcel GCSE Past Paper Matrix (2018–2026) &
 * Specification Gap Analysis / Overdue Topic Predictor for History Hub.
 */

export function renderExamTrendMatrix(container, unitId = 'edexcel_medicine') {
  // Normalize unitId
  const isMedicine = unitId === 'edexcel_medicine';
  const dataFile = isMedicine
    ? '/data/edexcel_medicine_past_papers.json'
    : '/data/cme_new_past_papers.json';
  const trendFile = isMedicine
    ? '/data/edexcel_medicine_trend_analysis.json'
    : '/data/cme_new_trend_analysis.json';

  container.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 400px; color: #64748b;">
      <i class="fa-solid fa-spinner fa-spin fa-2x" style="margin-right: 12px; color: #3b82f6;"></i>
      <span style="font-size: 1.1rem; font-weight: 600;">Loading Exam Trend Matrix & Specification Radar...</span>
    </div>
  `;

  Promise.all([
    fetch(dataFile).then((r) => (r.ok ? r.json() : null)),
    fetch(trendFile).then((r) => (r.ok ? r.json() : null)),
  ])
    .then(([pastData, trendData]) => {
      if (!pastData || !trendData) {
        container.innerHTML = `
          <div style="padding: 40px; text-align: center; background: white; border-radius: 16px; border: 1px solid #e2e8f0; margin: 20px auto; max-width: 800px;">
            <i class="fa-solid fa-triangle-exclamation fa-3x" style="color: #f59e0b; margin-bottom: 15px;"></i>
            <h2 style="color: #0f172a; margin: 0 0 10px 0;">Data Not Available</h2>
            <p style="color: #64748b;">Unable to load past exam papers or specification trend analysis for <code>${unitId}</code>.</p>
          </div>
        `;
        return;
      }
      buildTrendMatrixUI(container, pastData, trendData, unitId);
    })
    .catch((err) => {
      console.error('Failed to load exam trend matrix:', err);
      container.innerHTML = `
        <div style="padding: 40px; text-align: center; background: white; border-radius: 16px; border: 1px solid #fee2e2; margin: 20px auto; max-width: 800px;">
          <i class="fa-solid fa-circle-exclamation fa-3x" style="color: #ef4444; margin-bottom: 15px;"></i>
          <h2 style="color: #991b1b; margin: 0 0 10px 0;">Error Loading Exam Radar</h2>
          <p style="color: #64748b;">${err.message}</p>
        </div>
      `;
    });
}

function buildTrendMatrixUI(container, pastData, trendData, unitId) {
  const isMedicine = unitId === 'edexcel_medicine';
  const papers = pastData.papers || [];
  const years = papers.map((p) => p.year);

  // Flatten questions
  const allQuestions = [];
  papers.forEach((p) => {
    p.questions.forEach((q) => {
      allQuestions.push({
        ...q,
        year: p.year,
        season: p.season,
        series: p.series,
      });
    });
  });

  const totalQuestions = allQuestions.length;
  const overdueCount = trendData.summary_stats ? trendData.summary_stats.overdue_topics_count : 0;
  const highTariffGaps = trendData.summary_stats
    ? trendData.summary_stats.high_tariff_gaps_count
    : 0;
  const totalPoints = trendData.summary_stats
    ? trendData.summary_stats.total_specification_points
    : 0;

  // Distinct question rows
  const questionRowsMedicine = [
    {
      label: 'Q1: Feature Questions',
      sub: '2m / 4m (Western Front)',
      match: (q) => q.q_number.startsWith('Q1'),
    },
    {
      label: 'Q2(a): Source Utility',
      sub: '8m (Western Front)',
      match: (q) => q.q_number === 'Q2(a)',
    },
    {
      label: 'Q2(b): Follow-Up Enquiry',
      sub: '4m (Western Front)',
      match: (q) => q.q_number === 'Q2(b)',
    },
    {
      label: 'Q3: Similarity / Difference',
      sub: '4m (Thematic c1250-present)',
      match: (q) => q.q_number === 'Q3',
    },
    {
      label: 'Q4: Causation Explanation',
      sub: '12m (Thematic c1250-present)',
      match: (q) => q.q_number === 'Q4',
    },
    {
      label: 'Q5: Judgement Essay (Choice A)',
      sub: '16m + 4m SPaG (Extended)',
      match: (q) => q.q_number === 'Q5',
    },
    {
      label: 'Q6: Judgement Essay (Choice B)',
      sub: '16m + 4m SPaG (Extended)',
      match: (q) => q.q_number === 'Q6',
    },
  ];

  const questionRowsCME = [
    {
      label: 'Q1: Consequence',
      sub: '4m / 8m (Direct Cause & Effect)',
      match: (q) => q.q_number.startsWith('Q1'),
    },
    {
      label: 'Q2: Narrative Account',
      sub: '8m (Chronological Analysis)',
      match: (q) => q.q_number === 'Q2',
    },
    {
      label: 'Q3(a): Importance Option 1',
      sub: '8m (Significance & Impact)',
      match: (q) => q.q_number === 'Q3(a)',
    },
    {
      label: 'Q3(b): Importance Option 2',
      sub: '8m (Significance & Impact)',
      match: (q) => q.q_number === 'Q3(b)',
    },
    {
      label: 'Q3(c): Importance Option 3',
      sub: '8m (Significance & Impact)',
      match: (q) => q.q_number === 'Q3(c)',
    },
  ];

  const currentRows = isMedicine ? questionRowsMedicine : questionRowsCME;

  const html = `
    <style>
      .etm-container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 10px 20px 60px 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      }
      .etm-hero {
        background: linear-gradient(135deg, ${isMedicine ? '#064e3b 0%, #0f766e 50%, #042f2e 100%' : '#0369a1 0%, #0284c7 50%, #082f49 100%'});
        border-radius: 20px;
        padding: 35px 40px;
        color: white;
        margin-bottom: 30px;
        box-shadow: 0 20px 40px -15px rgba(0,0,0,0.3);
        position: relative;
        overflow: hidden;
      }
      .etm-hero::after {
        content: '';
        position: absolute;
        top: -60px; right: -60px; width: 260px; height: 260px;
        background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
        border-radius: 50%;
      }
      .etm-metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-top: 25px;
      }
      .etm-metric-box {
        background: rgba(255,255,255,0.12);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 14px;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        gap: 15px;
      }
      .etm-tabs-bar {
        display: flex;
        gap: 10px;
        border-bottom: 2px solid #e2e8f0;
        margin-bottom: 25px;
        overflow-x: auto;
        padding-bottom: 2px;
      }
      .etm-tab-btn {
        background: none;
        border: none;
        padding: 12px 24px;
        font-size: 1.05rem;
        font-weight: 700;
        color: #64748b;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        margin-bottom: -2px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
      }
      .etm-tab-btn:hover {
        color: #0f172a;
      }
      .etm-tab-btn.active {
        color: ${isMedicine ? '#0d9488' : '#0284c7'};
        border-bottom-color: ${isMedicine ? '#0d9488' : '#0284c7'};
      }
      .etm-table-wrap {
        overflow-x: auto;
        background: white;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);
      }
      .etm-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        min-width: 1100px;
      }
      .etm-table th {
        background: #f8fafc;
        color: #1e293b;
        padding: 16px;
        font-weight: 700;
        font-size: 0.95rem;
        border-bottom: 2px solid #cbd5e1;
        position: sticky;
        top: 0;
        z-index: 2;
      }
      .etm-table td {
        padding: 14px;
        border-bottom: 1px solid #e2e8f0;
        border-right: 1px solid #f1f5f9;
        vertical-align: top;
      }
      .etm-table tr:hover td {
        background-color: #fafafa;
      }
      .etm-q-card {
        background: #f8fafc;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        padding: 10px 12px;
        font-size: 0.85rem;
        color: #1e293b;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 6px;
      }
      .etm-q-card:hover {
        transform: translateY(-2px);
        background: white;
        border-color: ${isMedicine ? '#0d9488' : '#0284c7'};
        box-shadow: 0 8px 16px -4px rgba(0,0,0,0.1);
      }
      .etm-tariff-badge {
        font-size: 0.72rem;
        font-weight: 800;
        padding: 2px 7px;
        border-radius: 6px;
        text-transform: uppercase;
        align-self: flex-start;
      }
      .etm-tariff-2m { background: #e0e7ff; color: #3730a3; }
      .etm-tariff-4m { background: #dbeafe; color: #1e40af; }
      .etm-tariff-8m { background: #fef3c7; color: #92400e; }
      .etm-tariff-12m { background: #ffedd5; color: #9a3412; }
      .etm-tariff-16m { background: #fce7f3; color: #9d174d; }

      /* Modal / Drawer */
      .etm-modal-backdrop {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease;
      }
      .etm-modal-backdrop.open {
        opacity: 1;
        pointer-events: auto;
      }
      .etm-modal-card {
        background: white;
        border-radius: 20px;
        max-width: 780px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3);
        padding: 35px 40px;
        position: relative;
        transform: translateY(20px);
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .etm-modal-backdrop.open .etm-modal-card {
        transform: translateY(0);
      }
      .etm-badge-overdue-high {
        background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;
      }
      .etm-badge-overdue-med {
        background: #fef3c7; color: #92400e; border: 1px solid #fde68a;
      }
      .etm-badge-overdue-recent {
        background: #dcfce7; color: #166534; border: 1px solid #86efac;
      }
    </style>

    <div class="etm-container">
      <!-- HERO BANNER -->
      <div class="etm-hero">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px;">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); padding: 5px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
              <i class="fa-solid fa-graduation-cap"></i> Pearson Edexcel GCSE (9–1) Archive
            </div>
            <h1 style="margin: 0; font-size: 2.3rem; font-weight: 800; line-height: 1.2;">
              Past Exam Matrix & Overdue Topic Radar
            </h1>
            <p style="margin: 10px 0 0 0; font-size: 1.15rem; opacity: 0.9; max-width: 800px;">
              ${pastData.paper_name} (${pastData.paper_code}) • Comprehensive 2018–2026 examination history, indicative mark schemes, and syllabus gap predictions.
            </p>
          </div>
          
          <div style="display: flex; gap: 10px;">
            <button id="etm-btn-switch-unit" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; padding: 10px 18px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: background 0.2s;" title="Switch between Medicine and Middle East">
              <i class="fa-solid fa-repeat"></i> Switch to ${isMedicine ? 'Middle East (P5)' : 'Medicine (11)'}
            </button>
          </div>
        </div>

        <div class="etm-metrics-grid">
          <div class="etm-metric-box">
            <i class="fa-solid fa-file-lines fa-2x" style="color: #67e8f9;"></i>
            <div>
              <div style="font-size: 1.6rem; font-weight: 800;">${totalQuestions} Questions</div>
              <div style="font-size: 0.82rem; opacity: 0.85;">${papers.length} Exam Series (2018–2026)</div>
            </div>
          </div>
          <div class="etm-metric-box">
            <i class="fa-solid fa-triangle-exclamation fa-2x" style="color: #fca5a5;"></i>
            <div>
              <div style="font-size: 1.6rem; font-weight: 800;">${overdueCount} Overdue</div>
              <div style="font-size: 0.82rem; opacity: 0.85;">Unexamined or 5+ yrs unexamined</div>
            </div>
          </div>
          <div class="etm-metric-box">
            <i class="fa-solid fa-bullseye fa-2x" style="color: #fde047;"></i>
            <div>
              <div style="font-size: 1.6rem; font-weight: 800;">${highTariffGaps} Essay Gaps</div>
              <div style="font-size: 0.82rem; opacity: 0.85;">Never set as 12m or 16m essays</div>
            </div>
          </div>
          <div class="etm-metric-box">
            <i class="fa-solid fa-list-check fa-2x" style="color: #a7f3d0;"></i>
            <div>
              <div style="font-size: 1.6rem; font-weight: 800;">${totalPoints} Spec Points</div>
              <div style="font-size: 0.82rem; opacity: 0.85;">100% Syllabus Coverage Mapped</div>
            </div>
          </div>
        </div>
      </div>

      <!-- TABS BAR -->
      <div class="etm-tabs-bar">
        <button class="etm-tab-btn active" data-tab="matrix">
          <i class="fa-solid fa-table-cells"></i> Year × Question Matrix (2018–2026)
        </button>
        <button class="etm-tab-btn" data-tab="radar">
          <i class="fa-solid fa-radar"></i> Syllabus Overdue Radar & Gap Heatmap
        </button>
        <button class="etm-tab-btn" data-tab="vault">
          <i class="fa-solid fa-vault"></i> Official PDF Materials Vault
        </button>
      </div>

      <!-- TAB 1: MATRIX VIEW -->
      <div id="etm-view-matrix" class="etm-tab-content">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
          <p style="margin: 0; color: #475569; font-size: 0.95rem;">
            Click any question card to inspect the exact prompt, stimulus points, mark scheme indicative content, and chief examiner pitfalls.
          </p>
          <div style="display: flex; gap: 6px; align-items: center; font-size: 0.8rem; font-weight: 600;">
            <span style="color: #64748b;">Key:</span>
            <span class="etm-tariff-badge etm-tariff-2m">2m</span>
            <span class="etm-tariff-badge etm-tariff-4m">4m</span>
            <span class="etm-tariff-badge etm-tariff-8m">8m</span>
            <span class="etm-tariff-badge etm-tariff-12m">12m</span>
            <span class="etm-tariff-badge etm-tariff-16m">16m</span>
          </div>
        </div>

        <div class="etm-table-wrap">
          <table class="etm-table">
            <thead>
              <tr>
                <th style="min-width: 220px; width: 220px; border-right: 2px solid #cbd5e1;">Question Focus</th>
                ${years.map((y) => `<th style="text-align: center; min-width: 140px;">${y === 2026 ? '2026 (Specimen)' : y}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${currentRows
                .map((row) => {
                  return `
                    <tr>
                      <td style="background: #f8fafc; font-weight: 700; border-right: 2px solid #e2e8f0;">
                        <div style="color: #0f172a; font-size: 0.95rem;">${row.label}</div>
                        <div style="color: #64748b; font-size: 0.78rem; font-weight: 500; margin-top: 4px;">${row.sub}</div>
                      </td>
                      ${years
                        .map((yr) => {
                          const yearPaper = papers.find((p) => p.year === yr);
                          const matchedQs = yearPaper
                            ? yearPaper.questions.filter((q) => row.match(q))
                            : [];
                          if (matchedQs.length === 0) {
                            return `<td style="color: #cbd5e1; text-align: center; font-size: 0.8rem; font-style: italic;">—</td>`;
                          }
                          return `
                            <td>
                              ${matchedQs
                                .map((q) => {
                                  const tariffClass = `etm-tariff-${q.tariff}m`;
                                  return `
                                    <div class="etm-q-card" data-qid="${q.q_id}" title="Click to view question & mark scheme">
                                      <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-weight: 800; font-size: 0.75rem; color: #475569;">${q.q_number}</span>
                                        <span class="etm-tariff-badge ${tariffClass}">${q.tariff} Marks</span>
                                      </div>
                                      <div style="font-weight: 700; color: #0f172a; line-height: 1.3;">${q.topic}</div>
                                    </div>
                                  `;
                                })
                                .join('')}
                            </td>
                          `;
                        })
                        .join('')}
                    </tr>
                  `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 2: SPECIFICATION OVERDUE RADAR -->
      <div id="etm-view-radar" class="etm-tab-content" style="display: none;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 25px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
          <div>
            <h3 style="margin: 0 0 6px 0; color: #0f172a;">Specification Overdue & Probability Filter</h3>
            <p style="margin: 0; color: #64748b; font-size: 0.95rem;">Filter syllabus sub-topics based on their historical exam frequency and overdue rating.</p>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="etm-radar-filters">
            <button class="etm-pill active" data-filter="all" style="padding: 7px 16px; border-radius: 20px; border: 1px solid #cbd5e1; background: #0f172a; color: white; cursor: pointer; font-weight: 600; font-size: 0.85rem;">All Topics (${totalPoints})</button>
            <button class="etm-pill" data-filter="high" style="padding: 7px 16px; border-radius: 20px; border: 1px solid #fca5a5; background: #fee2e2; color: #991b1b; cursor: pointer; font-weight: 700; font-size: 0.85rem;">🔴 Highly Overdue / Unexamined (${overdueCount})</button>
            <button class="etm-pill" data-filter="gaps" style="padding: 7px 16px; border-radius: 20px; border: 1px solid #fde68a; background: #fef3c7; color: #92400e; cursor: pointer; font-weight: 700; font-size: 0.85rem;">🎯 High-Tariff Essay Gaps (${highTariffGaps})</button>
          </div>
        </div>

        <div id="etm-radar-list" style="display: flex; flex-direction: column; gap: 20px;">
          ${trendData.sections
            .map((sec) => {
              return `
                <div class="etm-sec-block" style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                  <div style="background: #f8fafc; padding: 18px 24px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 1.15rem; color: #1e293b;">${sec.title}</h3>
                  </div>
                  <div style="padding: 20px 24px; display: flex; flex-direction: column; gap: 15px;">
                    ${sec.topics
                      .map((top) => {
                        return `
                          <div style="margin-bottom: 10px;">
                            <h4 style="margin: 0 0 12px 0; color: #334155; font-size: 1.02rem; border-left: 3px solid ${isMedicine ? '#0d9488' : '#0284c7'}; padding-left: 10px;">${top.title}</h4>
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                              ${top.points
                                .map((pt) => {
                                  let badgeClass = 'etm-badge-overdue-recent';
                                  let badgeLabel = `Examined in ${pt.last_examined}`;
                                  if (pt.overdue_status === 'high') {
                                    badgeClass = 'etm-badge-overdue-high';
                                    badgeLabel =
                                      pt.last_examined === 'Never'
                                        ? 'Never Examined (2018–2026)'
                                        : `Overdue: Last set in ${pt.last_examined}`;
                                  } else if (pt.overdue_status === 'medium') {
                                    badgeClass = 'etm-badge-overdue-med';
                                    badgeLabel = `Warm: Last set in ${pt.last_examined}`;
                                  }

                                  return `
                                    <div class="etm-radar-item" data-overdue="${pt.overdue_status}" data-gap="${pt.high_tariff_gap ? 'true' : 'false'}" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; transition: border-color 0.2s;">
                                      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 15px; flex-wrap: wrap;">
                                        <div style="flex: 1; font-size: 0.95rem; color: #1e293b; line-height: 1.5;">
                                          ${pt.point_text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                                        </div>
                                        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                                          <span style="font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px;" class="${badgeClass}">
                                            ${badgeLabel}
                                          </span>
                                          <span style="font-size: 0.75rem; font-weight: 700; background: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 12px;">
                                            ${pt.exam_count}x in Exams
                                          </span>
                                        </div>
                                      </div>
                                      
                                      <div style="margin-top: 12px; background: #f8fafc; border-left: 3px solid ${pt.overdue_status === 'high' ? '#ef4444' : '#3b82f6'}; padding: 8px 12px; border-radius: 0 8px 8px 0; font-size: 0.85rem; color: #334155;">
                                        ${pt.teacher_note}
                                      </div>
                                      
                                      ${
                                        pt.matched_questions && pt.matched_questions.length > 0
                                          ? `
                                          <div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
                                            <span style="font-size: 0.75rem; color: #64748b; font-weight: 600;">Tested in:</span>
                                            ${pt.matched_questions
                                              .map(
                                                (mq) => `
                                                  <span class="etm-q-card-mini" data-qid="${mq.q_id}" style="cursor: pointer; background: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 8px; font-size: 0.75rem; font-weight: 700; color: #1e293b;" title="Click to view question">
                                                    ${mq.year} ${mq.q_number} (${mq.tariff}m)
                                                  </span>
                                                `,
                                              )
                                              .join('')}
                                          </div>
                                        `
                                          : ''
                                      }
                                    </div>
                                  `;
                                })
                                .join('')}
                            </div>
                          </div>
                        `;
                      })
                      .join('')}
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>
      </div>

      <!-- TAB 3: OFFICIAL PDF VAULT -->
      <div id="etm-view-vault" class="etm-tab-content" style="display: none;">
        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 30px; margin-bottom: 25px;">
          <h2 style="margin: 0 0 10px 0; color: #0f172a;"><i class="fa-solid fa-book-bookmark" style="color: ${isMedicine ? '#0d9488' : '#0284c7'};"></i> Official Edexcel Exam Archive</h2>
          <p style="color: #64748b; font-size: 1rem; margin-bottom: 25px;">
            The History Hub is synchronized directly with your local Google Drive exam repository. Below are all verified official Question Papers, Mark Schemes, and Examiner Reports.
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
            ${papers
              .map((p) => {
                return `
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="font-weight: 800; font-size: 1.15rem; color: #0f172a;">${p.series} (${p.paper_code})</span>
                        <span style="background: #e2e8f0; color: #334155; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 6px;">${p.questions.length} Questions</span>
                      </div>
                      <p style="color: #64748b; font-size: 0.88rem; margin: 0 0 15px 0;">
                        Official Pearson Edexcel Examination Series with complete question paper, mark scheme, and examiner report insights.
                      </p>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                      <button class="main-btn etm-btn-view-paper" data-year="${p.year}" style="flex: 1; padding: 8px 12px; font-size: 0.82rem; background: white; border: 1px solid #cbd5e1; border-radius: 8px; cursor: pointer; font-weight: 600; color: #1e293b;">
                        <i class="fa-solid fa-list-ol"></i> View Questions
                      </button>
                    </div>
                  </div>
                `;
              })
              .join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- QUESTION INSPECTOR MODAL -->
    <div id="etm-modal" class="etm-modal-backdrop">
      <div class="etm-modal-card">
        <button id="etm-modal-close" style="position: absolute; top: 20px; right: 20px; background: #f1f5f9; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 1.1rem; color: #475569; display: flex; justify-content: center; align-items: center;">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div id="etm-modal-content"></div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // --------------------------------------------------------------------------
  // Interactivity & Event Handlers
  // --------------------------------------------------------------------------

  // Switch between Medicine and Middle East
  const btnSwitchUnit = document.getElementById('etm-btn-switch-unit');
  if (btnSwitchUnit) {
    btnSwitchUnit.addEventListener('click', () => {
      const targetUnit = isMedicine ? 'cme_new' : 'edexcel_medicine';
      if (window.switchView) {
        window.switchView('mock-exams', targetUnit);
      } else {
        renderExamTrendMatrix(container, targetUnit);
      }
    });
  }

  // Tab navigation
  const tabBtns = container.querySelectorAll('.etm-tab-btn');
  const tabContents = {
    matrix: document.getElementById('etm-view-matrix'),
    radar: document.getElementById('etm-view-radar'),
    vault: document.getElementById('etm-view-vault'),
  };

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      Object.keys(tabContents).forEach((k) => {
        if (tabContents[k]) tabContents[k].style.display = k === target ? 'block' : 'none';
      });
    });
  });

  // Radar Filters
  const filterBtns = container.querySelectorAll('#etm-radar-filters .etm-pill');
  const radarItems = container.querySelectorAll('.etm-radar-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.style.background = '#f1f5f9';
        b.style.color = '#334155';
        b.style.borderColor = '#cbd5e1';
      });
      btn.classList.add('active');
      btn.style.background = '#0f172a';
      btn.style.color = 'white';

      const filter = btn.dataset.filter;
      radarItems.forEach((item) => {
        if (filter === 'all') {
          item.style.display = 'block';
        } else if (filter === 'high') {
          item.style.display = item.dataset.overdue === 'high' ? 'block' : 'none';
        } else if (filter === 'gaps') {
          item.style.display = item.dataset.gap === 'true' ? 'block' : 'none';
        }
      });
    });
  });

  // Modal Setup
  const modal = document.getElementById('etm-modal');
  const modalClose = document.getElementById('etm-modal-close');
  const modalContent = document.getElementById('etm-modal-content');

  const openQuestionModal = (qid) => {
    const q = allQuestions.find((item) => item.q_id === qid);
    if (!q) return;

    modalContent.innerHTML = `
      <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px; flex-wrap: wrap;">
        <span style="background: ${isMedicine ? '#0d9488' : '#0284c7'}; color: white; padding: 4px 12px; border-radius: 8px; font-weight: 800; font-size: 0.85rem;">
          ${q.series} (${q.year})
        </span>
        <span style="background: #f1f5f9; color: #1e293b; padding: 4px 12px; border-radius: 8px; font-weight: 700; font-size: 0.85rem;">
          ${q.q_number} • ${q.tariff} Marks
        </span>
        <span style="color: #64748b; font-size: 0.85rem; font-weight: 600;">
          ${q.section || 'Exam Question'}
        </span>
      </div>

      <h2 style="color: #0f172a; margin: 0 0 15px 0; font-size: 1.45rem; line-height: 1.35; font-family: 'Playfair Display', serif;">
        ${q.question_text}
      </h2>

      ${
        q.stimulus
          ? `
          <div style="background: #f8fafc; border-left: 4px solid #cbd5e1; padding: 12px 16px; border-radius: 0 8px 8px 0; font-size: 0.95rem; color: #475569; margin-bottom: 20px; font-style: italic; white-space: pre-wrap;">
            <strong>Stimulus provided in exam:</strong><br>${q.stimulus}
          </div>
        `
          : ''
      }

      <!-- EXAMINER REPORT WARNING -->
      ${
        q.examiner_tips
          ? `
          <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
            <div style="color: #b45309; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-triangle-exclamation"></i> Chief Examiner Pitfall Warning
            </div>
            <div style="color: #92400e; font-size: 0.95rem; line-height: 1.5;">
              ${q.examiner_tips}
            </div>
          </div>
        `
          : ''
      }

      <!-- INDICATIVE CONTENT -->
      <div style="margin-bottom: 25px;">
        <h4 style="color: #1e293b; font-size: 1rem; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px;">
          <i class="fa-solid fa-check-double" style="color: #10b981;"></i> Mark Scheme Indicative Content
        </h4>
        <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 0.95rem; line-height: 1.6;">
          ${
            Array.isArray(q.indicative_content)
              ? q.indicative_content
                  .map((pt) => `<li style="margin-bottom: 8px;">${pt}</li>`)
                  .join('')
              : `<li>${q.indicative_content}</li>`
          }
        </ul>
      </div>

      <!-- ACTION BUTTONS -->
      <div style="display: flex; gap: 12px; flex-wrap: wrap; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        <button id="etm-modal-practice-btn" style="background: linear-gradient(135deg, #3b82f6, #4f46e5); color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-stopwatch"></i> Practice in Exam Hall With Timer
        </button>
        ${
          isMedicine
            ? `
            <a href="/pdfs/edexcel_medicine_revision_guide.pdf" target="_blank" style="text-decoration: none; background: #f1f5f9; color: #1e293b; border: 1px solid #cbd5e1; padding: 12px 20px; border-radius: 10px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-book-open"></i> Open in 40-Page Visual Guide
            </a>
          `
            : ''
        }
      </div>
    `;

    modal.classList.add('open');

    // Wire practice button to load into Exam Practice Zone
    const practiceBtn = document.getElementById('etm-modal-practice-btn');
    if (practiceBtn) {
      practiceBtn.addEventListener('click', async () => {
        modal.classList.remove('open');
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
          const { renderExamPracticeZone } = await import('./exam_practice_zone.js');
          const activeUnitData = window.currentUnitData || {};
          renderExamPracticeZone(contentArea, activeUnitData);

          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });

          // Pre-populate question into display area
          setTimeout(() => {
            const displayArea = document.getElementById('epz-question-display');
            const controls = document.getElementById('epz-controls');
            const qMeta = document.getElementById('epz-q-meta');
            const qText = document.getElementById('epz-q-text');
            const qStimulus = document.getElementById('epz-q-stimulus');
            const wagollPanel = document.getElementById('epz-wagoll-panel');
            const wagollBtn = document.getElementById('epz-wagoll-btn');

            if (displayArea && qText) {
              if (controls) controls.style.display = 'none';
              displayArea.style.display = 'block';
              qMeta.textContent = `${q.year} Past Paper • ${q.q_number} • ${q.tariff} Marks`;
              qText.textContent = q.question_text;
              if (qStimulus && q.stimulus) {
                qStimulus.style.display = 'block';
                qStimulus.textContent = q.stimulus;
              }
              if (wagollPanel && q.indicative_content) {
                const points = Array.isArray(q.indicative_content)
                  ? q.indicative_content.join('\n\n• ')
                  : q.indicative_content;
                wagollPanel.textContent = 'MARK SCHEME INDICATIVE CONTENT:\n\n• ' + points;
                if (wagollBtn) wagollBtn.style.display = 'inline-block';
              }
            }
          }, 100);
        }
      });
    }
  };

  modalClose.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  // Attach click to all question cards in table
  container.querySelectorAll('.etm-q-card, .etm-q-card-mini').forEach((card) => {
    card.addEventListener('click', () => {
      const qid = card.dataset.qid;
      if (qid) openQuestionModal(qid);
    });
  });

  // View Paper button in Vault
  container.querySelectorAll('.etm-btn-view-paper').forEach((btn) => {
    btn.addEventListener('click', () => {
      const year = parseInt(btn.dataset.year);
      tabBtns[0].click(); // Switch to matrix
    });
  });
}

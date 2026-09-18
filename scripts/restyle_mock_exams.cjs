const fs = require('fs');
const path = require('path');

const units = [
  {
    id: 'cme_new',
    name: 'Middle East',
    defaultMinutes: 55,
    paperRef: '1HI0/21',
    pacing:
      'Q1(a)/(b) Consequence (6m each) &bull; Q2 Narrative (14m) &bull; Q3 Importance (2× 14m)',
    presets: [
      { mins: 6, label: '4-Mark Consequence (6m)', title: '6 Minutes (4-Mark Consequence)' },
      {
        mins: 14,
        label: '8-Mark Question (14m)',
        title: '14 Minutes (8-Mark Narrative / Importance Choice)',
      },
      {
        mins: 28,
        label: 'Q3 Both Choices (28m)',
        title: '28 Minutes (Question 3: Both Importance Choices)',
      },
      { mins: 55, label: 'Full Paper (55m)', title: 'Full Paper (55m)' },
    ],
    matrixRows: [
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
    ],
  },
  {
    id: 'edexcel_medicine',
    name: 'Medicine Through Time',
    defaultMinutes: 80,
    paperRef: '1HI0/11',
    pacing: 'Sec A: 25m (Western Front) | Sec B: 55m (Thematic Study)',
    presets: [
      { mins: 3, label: '2-Mark Feature (3m)', title: '3 Minutes (2-Mark Feature - Sec A)' },
      {
        mins: 5,
        label: '4-Mark Follow-up (5m)',
        title: '5 Minutes (4-Mark Follow-up Table - Sec A)',
      },
      {
        mins: 6,
        label: '4-Mark Comparison (6m)',
        title: '6 Minutes (4-Mark Similarity/Diff - Sec B)',
      },
      {
        mins: 12,
        label: '8-Mark Utility (12m)',
        title: '12 Minutes (8-Mark Source Utility - Sec A)',
      },
      {
        mins: 18,
        label: '12-Mark Causation (18m)',
        title: '18 Minutes (12-Mark Explain Why - Sec B)',
      },
      {
        mins: 26,
        label: '16+4 Mark Essay (26m)',
        title: '26 Minutes (16+4 Mark Evaluative Essay - Sec B)',
      },
      { mins: 80, label: 'Full Paper (80m)', title: 'Full Paper (80m)' },
    ],
    matrixRows: [
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
    ],
  },
  {
    id: 'eee',
    name: 'Early Elizabethan England',
    defaultMinutes: 55,
    paperRef: '1HI0/B4',
    pacing: 'Q1(a)/(b) Features (3m each) &bull; Q2 Causation (18m) &bull; Q3/4 Essay (25m)',
    presets: [
      { mins: 3, label: '2-Mark Feature (3m)', title: '3 Minutes (2-Mark Feature Question)' },
      {
        mins: 18,
        label: '12-Mark Causation (18m)',
        title: '18 Minutes (12-Mark Explain Why Question)',
      },
      { mins: 25, label: '16-Mark Essay (25m)', title: '25 Minutes (16-Mark Evaluative Essay)' },
      { mins: 55, label: 'Full Paper (55m)', title: 'Full Paper (55m)' },
    ],
    matrixRows: [
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
    ],
  },
  {
    id: 'usa',
    name: 'USA 1954-75',
    defaultMinutes: 80,
    paperRef: '1HI0/33',
    pacing: 'Sec A: 28m (Q1 5m, Q2 18m) &bull; Sec B: 52m (Q3a 12m, Q3b 5m, Q3c 5m, Q3d 27m)',
    presets: [
      {
        mins: 5,
        label: '4-Mark Question (5m)',
        title: '5 Minutes (4-Mark Inference / Diff / Reason)',
      },
      { mins: 12, label: '8-Mark Utility (12m)', title: '12 Minutes (8-Mark Source Utility)' },
      { mins: 18, label: '12-Mark Causation (18m)', title: '18 Minutes (12-Mark Explain Why)' },
      {
        mins: 27,
        label: '16+4 Mark Essay (27m)',
        title: '27 Minutes (16+4 Mark Evaluative Essay)',
      },
      { mins: 80, label: 'Full Paper (80m)', title: 'Full Paper (80m)' },
    ],
    matrixRows: [
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
    ],
  },
  {
    id: 'weimar_nazi_germany',
    name: 'Weimar & Nazi Germany',
    defaultMinutes: 80,
    paperRef: '1HI0/31',
    pacing: 'Sec A: 28m (Q1 5m, Q2 18m) &bull; Sec B: 52m (Q3a 12m, Q3b 5m, Q3c 5m, Q3d 27m)',
    presets: [
      {
        mins: 5,
        label: '4-Mark Question (5m)',
        title: '5 Minutes (4-Mark Inference / Diff / Reason)',
      },
      { mins: 12, label: '8-Mark Utility (12m)', title: '12 Minutes (8-Mark Source Utility)' },
      { mins: 18, label: '12-Mark Causation (18m)', title: '18 Minutes (12-Mark Explain Why)' },
      {
        mins: 27,
        label: '16+4 Mark Essay (27m)',
        title: '27 Minutes (16+4 Mark Evaluative Essay)',
      },
      { mins: 80, label: 'Full Paper (80m)', title: 'Full Paper (80m)' },
    ],
    matrixRows: [
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
    ],
  },
];

const baseDir = path.join(__dirname, '..', 'public', 'units');

function generateInvigilatorHud(unit, msUrl) {
  const defaultTimeFormatted = unit.defaultMinutes === 55 ? '55:00' : '01:20:00';

  const presetButtonsHtml = unit.presets
    .map((p) => {
      const isFull = p.label.includes('Full');
      const colorStyle = isFull
        ? 'color: #38bdf8; border: 1px solid #0284c7;'
        : 'color: #e2e8f0; border: 1px solid #475569;';
      const btnText = p.btnText || (isFull ? `Full (${unit.defaultMinutes}m)` : `${p.mins}m`);
      return `<button type="button" class="mock-preset-btn" data-mins="${p.mins}" onclick="setMockExamTimerMinutes(${p.mins}, '${p.label}')" style="background: #0f172a; ${colorStyle} padding: 4px 7px; font-weight: 700; font-size: 11px; border-radius: 4px; cursor: pointer;" title="${p.title}">${btnText}</button>`;
    })
    .join('\n      ');

  const matrixRowsHtml = unit.matrixRows
    .map((row, idx) => {
      const isLast = idx === unit.matrixRows.length - 1;
      const borderStyle = isLast ? '' : 'border-bottom: 1px solid #1e293b;';
      return `<tr style="${borderStyle}">
              <td style="padding: 6px 10px; font-weight: 800; color: #38bdf8;">${row.tariff}</td>
              <td style="padding: 6px 10px; color: #e2e8f0;">${row.type}</td>
              <td style="padding: 6px 10px; font-weight: 700; color: #facc15;">${row.totalTime}</td>
              <td style="padding: 6px 10px; color: #94a3b8;">${row.planSplit}</td>
              <td style="padding: 6px 10px; color: #cbd5e1;">${row.writeSplit}</td>
              <td style="padding: 6px 10px; text-align: right;">
                <button type="button" onclick="setMockExamTimerMinutes(${row.actionMins}, '${row.actionLabel}'); toggleMockExamTimer('start');" style="background: #1e293b; color: #38bdf8; border: 1px solid #0284c7; padding: 2px 7px; border-radius: 3px; font-weight: 700; font-size: 10px; cursor: pointer;">⏱ Time (${row.actionMins}m)</button>
              </td>
            </tr>`;
    })
    .join('\n            ');

  return `  <!-- Top Docked Invigilator Toolbar (Interactive Screen Mode) -->
  <div class="invigilator-hud no-print" style="position: sticky; top: 0; z-index: 9999; background: #0f172a; color: #ffffff; border-bottom: 3px solid #3b82f6; padding: 8px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); font-family: 'Open Sans', Arial, sans-serif;">
    <!-- Left: Clock & Status -->
    <div style="display: flex; align-items: center; gap: 14px;">
      <div>
        <div style="font-size: 9px; font-weight: 800; letter-spacing: 1px; color: #94a3b8; text-transform: uppercase;">PEARSON EXAM CLOCK &bull; ${unit.paperRef}</div>
        <div id="mock-exam-clock" style="font-size: 26px; font-weight: 800; font-family: 'Courier New', Courier, monospace; color: #38bdf8; line-height: 1.1; cursor: pointer; text-shadow: 0 0 10px rgba(56,189,248,0.3);" title="Click to set custom timer duration">${defaultTimeFormatted}</div>
      </div>
      <div style="font-size: 11px; color: #cbd5e1; border-left: 1px solid #334155; padding-left: 12px; max-width: 260px; line-height: 1.3;">
        <div id="mock-pacing-status"><strong>Pacing:</strong> ${unit.pacing}</div>
        <div style="font-size: 10px; color: #64748b; margin-top: 2px;">💡 Click clock to type custom minutes</div>
      </div>
    </div>

    <!-- Center: Single-Question Practice Presets, Strategy Drawer & Custom Mins -->
    <div style="display: flex; align-items: center; gap: 5px; flex-wrap: wrap; background: #1e293b; padding: 4px 8px; border-radius: 6px; border: 1px solid #334155;">
      <span style="font-size: 10px; font-weight: 800; color: #93c5fd; text-transform: uppercase; letter-spacing: 0.5px; margin-right: 2px;">Question Practice:</span>
      ${presetButtonsHtml}
      
      <!-- Custom Minute Input -->
      <div style="display: flex; align-items: center; gap: 3px; margin-left: 4px; border-left: 1px solid #475569; padding-left: 6px;">
        <input type="number" id="mock-custom-mins" min="1" max="240" placeholder="Mins" style="width: 48px; background: #0f172a; color: #ffffff; border: 1px solid #475569; border-radius: 3px; padding: 3px 5px; font-size: 11px; font-weight: 700; text-align: center;">
        <button type="button" onclick="applyCustomMockMinutes()" style="background: #3b82f6; color: #ffffff; border: none; padding: 4px 8px; font-weight: 700; font-size: 11px; border-radius: 3px; cursor: pointer;" title="Apply Custom Minutes">Set</button>
      </div>

      <!-- Collapsible Timing Strategy Toggle Button -->
      <button type="button" id="mock-strategy-toggle" onclick="toggleMockTimingStrategy()" style="background: #1e293b; color: #38bdf8; border: 1.5px solid #0284c7; padding: 4px 9px; font-weight: 800; font-size: 11px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; margin-left: 4px;" title="View Exam Timing Strategy & Pacing Breakdown">
        <span>⏱ Timing Strategy</span> <span id="mock-strategy-arrow" style="font-size: 9px; transition: transform 0.2s ease;">▼</span>
      </button>
    </div>

    <!-- Right: Controls -->
    <div style="display: flex; align-items: center; gap: 5px; flex-wrap: wrap;">
      <button type="button" id="mock-timer-toggle" onclick="toggleMockExamTimer('start')" style="background: #ffffff; color: #000000; border: 2px solid #ffffff; padding: 5px 12px; font-weight: 800; font-size: 12px; border-radius: 4px; cursor: pointer;">▶ Start Clock</button>
      <button type="button" id="mock-timer-pause" onclick="toggleMockExamTimer('pause')" style="background: #facc15; color: #000000; border: 2px solid #facc15; padding: 5px 12px; font-weight: 800; font-size: 12px; border-radius: 4px; cursor: pointer; display: none;">⏸ Pause</button>
      <button type="button" id="mock-timer-reset" onclick="toggleMockExamTimer('reset')" style="background: transparent; color: #cbd5e1; border: 1.5px solid #475569; padding: 5px 8px; font-weight: 700; font-size: 12px; border-radius: 4px; cursor: pointer;" title="Reset Timer">🔄 Reset</button>
      <button type="button" onclick="toggleMockExamTimer('sub1')" style="background: transparent; color: #e2e8f0; border: 1.5px solid #475569; padding: 5px 7px; font-weight: 700; font-size: 11px; border-radius: 4px; cursor: pointer;" title="Subtract 1 Minute">-1m</button>
      <button type="button" onclick="toggleMockExamTimer('add1')" style="background: transparent; color: #e2e8f0; border: 1.5px solid #475569; padding: 5px 7px; font-weight: 700; font-size: 11px; border-radius: 4px; cursor: pointer;" title="Add 1 Minute">+1m</button>
      <button type="button" onclick="toggleMockExamTimer('add5')" style="background: transparent; color: #e2e8f0; border: 1.5px solid #475569; padding: 5px 7px; font-weight: 700; font-size: 11px; border-radius: 4px; cursor: pointer;" title="Add 5 Minutes Extra Time">+5m</button>
      <button type="button" onclick="toggleMockExamTimer('add25pct')" style="background: transparent; color: #c084fc; border: 1.5px solid #8b5cf6; padding: 5px 7px; font-weight: 700; font-size: 11px; border-radius: 4px; cursor: pointer;" title="Add 25% Extra Time (Access Arrangements)">+25% Extra</button>
      <button type="button" id="mock-timer-sound" onclick="toggleMockExamTimer('toggleSound')" style="background: transparent; color: #e2e8f0; border: 1.5px solid #475569; padding: 5px 7px; font-weight: 700; font-size: 11px; border-radius: 4px; cursor: pointer;" title="Toggle Audio Chimes">🔊 Sound: On</button>
      ${msUrl ? `<a id="mock-ms-link" href="${msUrl}" target="_blank" style="background: #10b981; color: #ffffff; border: 1.5px solid #059669; padding: 5px 10px; font-weight: 800; font-size: 11px; border-radius: 4px; text-decoration: none; display: inline-flex; align-items: center; margin-left: 4px;">Mark Scheme &rarr;</a>` : ''}
    </div>

    <!-- Collapsible Timing Strategy Drawer (Pacing Matrix: 1 Mark ≈ 1.25 Mins) -->
    <div id="mock-timing-strategy-drawer" style="display: none; width: 100%; border-top: 1px solid #334155; margin-top: 8px; padding-top: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
        <div>
          <div style="font-size: 11px; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.8px;">
            ⏱ Pearson GCSE History &bull; Exam Timing Strategy &amp; Pacing Matrix
          </div>
          <div style="font-size: 11px; color: #cbd5e1; margin-top: 2px;">
            <strong>The Golden Rule:</strong> 1 Mark &asymp; 1.25 Minutes. Protect your time by adhering strictly to the recommended planning vs. writing splits below.
          </div>
        </div>
        <div style="font-size: 10px; color: #94a3b8; background: #0f172a; padding: 3px 8px; border-radius: 4px; border: 1px solid #334155;">
          💡 Tip: Click any row's <strong>[⏱ Time (Xm)]</strong> button or on-page question anchor to start immediately.
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 11px; text-align: left; background: #0f172a; border: 1px solid #334155; border-radius: 4px;">
          <thead>
            <tr style="background: #1e293b; color: #93c5fd; border-bottom: 1px solid #334155; text-transform: uppercase; font-size: 10px; letter-spacing: 0.5px;">
              <th style="padding: 6px 10px;">Tariff</th>
              <th style="padding: 6px 10px;">Question Type (Edexcel Specification)</th>
              <th style="padding: 6px 10px;">Total Time</th>
              <th style="padding: 6px 10px;">Planning &amp; Prep Split</th>
              <th style="padding: 6px 10px;">Writing &amp; Evidence Split</th>
              <th style="padding: 6px 10px; text-align: right;">Quick Action</th>
            </tr>
          </thead>
          <tbody>
            ${matrixRowsHtml}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function generateTimerScript(defaultMinutes) {
  return `  <!-- Pearson Invigilator HUD Live Timer Engine -->
  <script>
  (function () {
    var defaultMins = ${defaultMinutes};
    var totalSecs = defaultMins * 60;
    var initialSecs = totalSecs;
    var interval = null;
    var isRunning = false;
    var soundEnabled = true;
    var currentModeLabel = 'Full Paper (' + defaultMins + 'm)';

    function formatTime(secs) {
      var h = Math.floor(secs / 3600);
      var m = Math.floor((secs % 3600) / 60);
      var s = secs % 60;
      if (h > 0) {
        return (
          (h < 10 ? '0' + h : h) +
          ':' +
          (m < 10 ? '0' + m : m) +
          ':' +
          (s < 10 ? '0' + s : s)
        );
      }
      return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
    }

    function updateClockDisplay() {
      var clockEl = document.getElementById('mock-exam-clock');
      if (!clockEl) return;

      if (totalSecs <= 0) {
        clockEl.style.color = '#ef4444';
        clockEl.textContent = "00:00 (TIME'S UP)";
      } else if (totalSecs <= 300) {
        clockEl.style.color = '#facc15';
        clockEl.textContent = formatTime(totalSecs);
      } else {
        clockEl.style.color = '#38bdf8';
        clockEl.textContent = formatTime(totalSecs);
      }
    }

    function playTone(freq, dur) {
      if (!soundEnabled) return;
      try {
        var ctx = new (window.AudioContext || window.webkitAudioContext)();
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + dur);
      } catch (e) {}
    }

    window.setMockExamTimerMinutes = function (mins, label) {
      mins = parseInt(mins, 10);
      if (isNaN(mins) || mins <= 0) return;
      if (interval) {
        clearInterval(interval);
        interval = null;
        isRunning = false;
      }
      totalSecs = mins * 60;
      initialSecs = totalSecs;
      currentModeLabel = label || mins + ' mins';

      var startBtn = document.getElementById('mock-timer-toggle');
      var pauseBtn = document.getElementById('mock-timer-pause');
      if (startBtn) {
        startBtn.style.display = 'inline-flex';
        startBtn.innerHTML = '▶ Start Clock';
      }
      if (pauseBtn) pauseBtn.style.display = 'none';

      var statusEl = document.getElementById('mock-pacing-status');
      if (statusEl) {
        statusEl.innerHTML = '<strong>Practice Mode:</strong> ' + currentModeLabel;
      }

      var presetBtns = document.querySelectorAll('.mock-preset-btn, .preset-btn');
      presetBtns.forEach(function (btn) {
        var btnMins = btn.getAttribute('data-mins');
        if (btnMins === String(mins) || btn.textContent.trim().startsWith(String(mins) + 'm')) {
          btn.style.background = '#2563eb';
          btn.style.color = '#ffffff';
          btn.style.borderColor = '#60a5fa';
        } else {
          btn.style.background = '#0f172a';
          btn.style.color = '#e2e8f0';
          btn.style.borderColor = '#475569';
        }
      });

      var customInput = document.getElementById('mock-custom-mins');
      if (customInput) customInput.value = mins;

      updateClockDisplay();
    };

    window.applyCustomMockMinutes = function () {
      var input = document.getElementById('mock-custom-mins');
      var val = input ? parseInt(input.value, 10) : NaN;
      if (isNaN(val) || val <= 0) {
        var promptVal = prompt(
          'Enter custom timer minutes (e.g. 5, 10, 15, 25, 45, ' + defaultMins + '):',
          Math.round(totalSecs / 60) || '15',
        );
        if (promptVal) {
          var m = parseInt(promptVal, 10);
          if (!isNaN(m) && m > 0) {
            window.setMockExamTimerMinutes(m, m + 'm (Custom Single Question)');
          }
        }
        return;
      }
      window.setMockExamTimerMinutes(val, val + 'm (Custom Single Question)');
    };

    window.toggleMockExamTimer = function (action) {
      var startBtn = document.getElementById('mock-timer-toggle');
      var pauseBtn = document.getElementById('mock-timer-pause');
      var soundBtn = document.getElementById('mock-timer-sound');

      if (action === 'start') {
        if (isRunning) return;
        if (totalSecs <= 0) totalSecs = initialSecs;
        isRunning = true;
        if (startBtn) startBtn.style.display = 'none';
        if (pauseBtn) pauseBtn.style.display = 'inline-flex';

        if (interval) clearInterval(interval);
        interval = setInterval(function () {
          if (totalSecs > 0) {
            totalSecs--;
            updateClockDisplay();

            // 5-minute warning chime
            if (totalSecs === 300) {
              playTone(659.25, 0.6);
              setTimeout(function () {
                playTone(880, 0.8);
              }, 250);
            } else if (totalSecs === 60) {
              // 1-minute warning chime
              playTone(587.33, 0.5);
            }

            // Time's up chime
            if (totalSecs === 0) {
              playTone(440, 1.2);
              setTimeout(function () {
                playTone(440, 1.2);
              }, 400);
              clearInterval(interval);
              interval = null;
              isRunning = false;
              if (startBtn) {
                startBtn.style.display = 'inline-flex';
                startBtn.innerHTML = '🔄 Restart';
              }
              if (pauseBtn) pauseBtn.style.display = 'none';
            }
          }
        }, 1000);
      } else if (action === 'pause') {
        if (!isRunning) return;
        clearInterval(interval);
        interval = null;
        isRunning = false;
        if (startBtn) {
          startBtn.style.display = 'inline-flex';
          startBtn.innerHTML = '▶ Resume';
        }
        if (pauseBtn) pauseBtn.style.display = 'none';
      } else if (action === 'reset') {
        if (interval) clearInterval(interval);
        interval = null;
        isRunning = false;
        totalSecs = initialSecs;
        updateClockDisplay();
        if (startBtn) {
          startBtn.style.display = 'inline-flex';
          startBtn.innerHTML = '▶ Start Clock';
        }
        if (pauseBtn) pauseBtn.style.display = 'none';
      } else if (action === 'sub1') {
        if (totalSecs > 60) totalSecs -= 60;
        else totalSecs = 0;
        updateClockDisplay();
      } else if (action === 'add1') {
        totalSecs += 60;
        updateClockDisplay();
      } else if (action === 'add5') {
        totalSecs += 300;
        updateClockDisplay();
      } else if (action === 'add20' || action === 'add25pct') {
        var extra = Math.round(initialSecs * 0.25);
        if (extra < 60) extra = 300;
        totalSecs += extra;
        updateClockDisplay();
        var statusEl = document.getElementById('mock-pacing-status');
        if (statusEl && !statusEl.textContent.includes('+25%')) {
          statusEl.innerHTML +=
            ' <span style="color: #c084fc; font-weight: 700;">(+25% Extra Time: +' +
            Math.round(extra / 60) +
            'm)</span>';
        }
      } else if (action === 'toggleSound') {
        soundEnabled = !soundEnabled;
        if (soundBtn) {
          soundBtn.textContent = soundEnabled ? '🔊 Sound: On' : '🔇 Sound: Off';
        }
      }
    };

    window.toggleMockTimingStrategy = function () {
      var drawer = document.getElementById('mock-timing-strategy-drawer');
      var arrow = document.getElementById('mock-strategy-arrow');
      if (!drawer) return;
      var isHidden = drawer.style.display === 'none' || drawer.style.display === '';
      drawer.style.display = isHidden ? 'block' : 'none';
      if (arrow) {
        arrow.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    };

    window.timeThisQuestion = function (btnEl, mins, label) {
      mins = parseInt(mins, 10);
      if (isNaN(mins) || mins <= 0) return;

      // 1. Lock timer to question minutes & update status
      window.setMockExamTimerMinutes(mins, label || (mins + 'm Question'));

      // 2. Start clock immediately
      window.toggleMockExamTimer('start');

      // 3. Smooth scroll viewport to anchor question container below sticky HUD
      var container = btnEl.closest('.question-block, .page-inner, .page, .question-title') || btnEl;
      var hud = document.querySelector('.invigilator-hud');
      var hudOffset = (hud ? hud.offsetHeight : 60) + 16;
      var rect = container.getBoundingClientRect();
      var targetY = window.pageYOffset + rect.top - hudOffset;

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });

      // 4. Subtle visual pulse/accent to highlight the anchored question
      var origOutline = container.style.outline;
      var origOffset = container.style.outlineOffset;
      var origTransition = container.style.transition;
      container.style.transition = 'outline 0.25s ease';
      container.style.outline = '3px solid #38bdf8';
      container.style.outlineOffset = '6px';
      setTimeout(function () {
        container.style.outline = origOutline;
        container.style.outlineOffset = origOffset;
        container.style.transition = origTransition;
      }, 2200);
    };

    function initHud() {
      var clockEl = document.getElementById('mock-exam-clock');
      if (clockEl) {
        clockEl.onclick = function () {
          window.applyCustomMockMinutes();
        };
        clockEl.style.cursor = 'pointer';
        clockEl.title = 'Click to set custom duration in minutes';
      }

      var customInput = document.getElementById('mock-custom-mins');
      if (customInput) {
        customInput.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') window.applyCustomMockMinutes();
        });
      }

      updateClockDisplay();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initHud);
    } else {
      initHud();
    }
  })();
  </script>`;
}

const buttonCss = `
    /* Question-Anchor Quick Launch Button Styles */
    .btn-time-question {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #0f172a;
      color: #38bdf8;
      border: 1px solid #0284c7;
      border-radius: 4px;
      padding: 2px 7px;
      font-size: 11px;
      font-weight: 700;
      font-family: 'Open Sans', Arial, sans-serif;
      cursor: pointer;
      margin-left: 8px;
      vertical-align: middle;
      text-decoration: none;
      line-height: 1.2;
      transition: all 0.15s ease;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    .btn-time-question:hover {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(2,132,199,0.3);
    }
    .btn-time-question:active {
      transform: translateY(0);
    }
    .question-block, .question-title, .page-inner {
      scroll-margin-top: 75px;
    }
    @media print {
      .btn-time-question, .invigilator-hud, #mock-timing-strategy-drawer, .no-print {
        display: none !important;
      }
    }
`;

function injectButtonStyles(content) {
  if (content.includes('.btn-time-question')) {
    content = content.replace(
      /\/\* Question-Anchor Quick Launch Button Styles \*\/[\s\S]*?@media print\s*\{[\s\S]*?\.btn-time-question[^\}]*\}\s*\}/gi,
      '',
    );
  }
  return content.replace(/<\/style>/i, `${buttonCss}\n  </style>`);
}

function getMinsForMarks(marks, unitId) {
  const m = parseInt(marks, 10);
  if (unitId === 'cme_new') {
    if (m === 4) return 6;
    if (m === 8) return 14;
    if (m === 16) return 28;
    return 14;
  }
  if (unitId === 'eee') {
    if (m === 2) return 3;
    if (m === 12) return 18;
    if (m === 16 || m === 20) return 25;
    return 18;
  }
  if (unitId === 'edexcel_medicine') {
    if (m === 2) return 3;
    if (m === 4) return 5;
    if (m === 8) return 12;
    if (m === 12) return 18;
    if (m === 16 || m === 20) return 26;
    return Math.max(3, Math.round(m * 1.25));
  }
  if (unitId === 'usa' || unitId === 'weimar_nazi_germany') {
    if (m === 4) return 5;
    if (m === 8) return 12;
    if (m === 12) return 18;
    if (m === 16 || m === 20) return 27;
    return Math.max(3, Math.round(m * 1.25));
  }
  return Math.max(3, Math.round(m * 1.25));
}

function makeTimeQuestionButton(marks, label, unitId) {
  const mins = getMinsForMarks(marks, unitId);
  const displayLabel = label || `${marks}-Mark Question (${mins}m)`;
  return ` <button type="button" class="btn-time-question no-print" onclick="window.timeThisQuestion(this, ${mins}, '${displayLabel}')" title="Lock timer to ${mins}m and start immediately">⏱ Time this question (${mins}m)</button>`;
}

function injectQuestionTimeButtons(content, unitId) {
  // Strip any previous buttons for clean idempotency
  content = content.replace(
    /<button[^>]*class=["'][^"']*btn-time-question[^"']*["'][^>]*>[\s\S]*?<\/button>/gi,
    '',
  );

  if (unitId === 'edexcel_medicine') {
    // Replace <div class="marks">(X)</div>
    content = content.replace(
      /<div class="marks"[^>]*>\s*\(([0-9]+)\)\s*<\/div>/g,
      (match, marks) => {
        const m = parseInt(marks, 10);
        let label = `${m}-Mark Question`;
        if (m === 2) label = '2-Mark Feature (3m)';
        else if (m === 4) label = '4-Mark Question (5m)';
        else if (m === 8) label = '8-Mark Utility (12m)';
        else if (m === 12) label = '12-Mark Causation (18m)';
        else if (m === 16 || m === 20) label = '16+4 Mark Essay (26m)';
        const btn = makeTimeQuestionButton(marks, label, unitId);
        return `<div class="marks" style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">(${marks})${btn}</div>`;
      },
    );
  }

  if (unitId === 'cme_new') {
    // Replace <span style="...float: right...">(X)</span>
    content = content.replace(
      /(<span[^>]*style=["'][^"']*float:\s*right[^"']*["'][^>]*>\s*)\(([0-9]+)\)(\s*<\/span>)/g,
      (match, p1, marks, p2) => {
        const m = parseInt(marks, 10);
        let mins = 6;
        let lbl = '4-Mark Consequence (6m)';
        if (m === 8) {
          mins = 14;
          lbl = '8-Mark Narrative (14m)';
        } else if (m === 16) {
          mins = 14;
          lbl = 'Choice: 8 Marks (14m)';
        }
        const btn = ` <button type="button" class="btn-time-question no-print" onclick="window.timeThisQuestion(this, ${mins}, '${lbl}')" title="Lock timer to ${mins}m and start immediately">⏱ Time this question (${mins}m)</button>`;
        return `${p1}(${marks})${btn}${p2}`;
      },
    );

    // Question 3 total:
    content = content.replace(/(\(Total for Question 3 = 16 marks\))/g, (match, p1) => {
      const btn = ` <button type="button" class="btn-time-question no-print" onclick="window.timeThisQuestion(this, 28, 'Question 3: Both Choices (28m)')" title="Lock timer to 28m and start immediately">⏱ Time Question 3 (28m)</button>`;
      return `${p1}${btn}`;
    });
  }

  if (unitId === 'eee') {
    // 1(a), 1(b), 2 in spans
    content = content.replace(
      /(<span[^>]*style=["'][^"']*float:\s*right[^"']*["'][^>]*>\s*)\(([0-9]+)\)(\s*<\/span>)/g,
      (match, p1, marks, p2) => {
        const m = parseInt(marks, 10);
        let label = `${m}-Mark Question`;
        if (m === 2) label = '2-Mark Feature (3m)';
        else if (m === 12) label = '12-Mark Causation (18m)';
        const btn = makeTimeQuestionButton(marks, label, unitId);
        return `${p1}(${marks})${btn}${p2}`;
      },
    );
    // Question 3 and 4 in Total for Question X = 16 marks
    content = content.replace(
      /(\(Total for Question (\d+) = (16) marks\))/g,
      (match, p1, qNum, marks) => {
        const btn = makeTimeQuestionButton(marks, `Question ${qNum} (25m)`, unitId);
        return `${p1}${btn}`;
      },
    );
  }

  if (unitId === 'usa') {
    // Ensure Question 2 has (12 marks) if missing
    content = content.replace(
      /(<div class="question-title">\s*2\.\s*Explain why[\s\S]*?)(<\/div>)/gi,
      (match, p1, p2) => {
        if (!p1.includes('marks')) {
          return `${p1.trimEnd()} (12 marks)\n    ${p2}`;
        }
        return match;
      },
    );

    // Inside question-title: (X marks)
    content = content.replace(
      /(\(([0-9]+)\s*marks(?:\s*\+\s*4\s*marks[^\)]*)?\))/gi,
      (match, p1, marks) => {
        const m = parseInt(marks, 10);
        let label = `${m}-Mark Question`;
        if (m === 4) label = '4-Mark Inference (5m)';
        else if (m === 8) label = '8-Mark Utility (12m)';
        else if (m === 12) label = '12-Mark Causation (18m)';
        else if (m === 16 || m === 20) label = '16+4 Mark Essay (27m)';
        const btn = makeTimeQuestionButton(marks, label, unitId);
        return `${p1}${btn}`;
      },
    );
  }

  if (unitId === 'weimar_nazi_germany') {
    // Section A spans
    content = content.replace(
      /(<span[^>]*style=["'][^"']*float:\s*right[^"']*["'][^>]*>\s*)\(([0-9]+)\)(\s*<\/span>)/g,
      (match, p1, marks, p2) => {
        const m = parseInt(marks, 10);
        let label = `${m}-Mark Question`;
        if (m === 4) label = '4-Mark Inference (5m)';
        else if (m === 12) label = '12-Mark Causation (18m)';
        const btn = makeTimeQuestionButton(marks, label, unitId);
        return `${p1}(${marks})${btn}${p2}`;
      },
    );
    // Section B (8), (4), (16+4 SPaG) at end of question text before </div>
    content = content.replace(/\(([0-9]+)(?:\+4\s*SPaG)?\)(\s*<\/div>)/g, (match, marks, p2) => {
      const fullMarksText = match.replace(p2, '');
      const m = parseInt(marks, 10);
      let label = `${fullMarksText} Question`;
      if (m === 8) label = '8-Mark Utility (12m)';
      else if (m === 4) label = '4-Mark Question (5m)';
      else if (m === 16 || m === 20) label = '16+4 Mark Essay (27m)';
      const btn = makeTimeQuestionButton(marks, label, unitId);
      return `${fullMarksText}${btn}${p2}`;
    });
  }

  return content;
}

function replaceOrInjectHud(content, hudHtml) {
  let hudIdx = content.indexOf('class="invigilator-hud');
  if (hudIdx === -1) hudIdx = content.indexOf("class='invigilator-hud'");

  if (hudIdx !== -1) {
    let startIdx = content.lastIndexOf('<div', hudIdx);
    const commentMarker = '<!-- Top Docked Invigilator Toolbar';
    const commentIdx = content.lastIndexOf(commentMarker, startIdx);
    if (
      commentIdx !== -1 &&
      content.substring(commentIdx, startIdx).includes('Top Docked Invigilator Toolbar')
    ) {
      startIdx = commentIdx;
    }

    let depth = 0;
    let i = content.lastIndexOf('<div', hudIdx);
    let endIdx = -1;
    while (i < content.length) {
      if (content.startsWith('<div', i) && (content[i + 4] === ' ' || content[i + 4] === '>')) {
        depth++;
        i += 4;
      } else if (content.startsWith('</div>', i)) {
        depth--;
        i += 6;
        if (depth === 0) {
          endIdx = i;
          break;
        }
      } else {
        i++;
      }
    }

    if (endIdx !== -1 && startIdx !== -1) {
      return content.substring(0, startIdx) + hudHtml + content.substring(endIdx);
    }
  }

  // Fallback if not found: insert after <body>
  return content.replace(/<body[^>]*>/i, (match) => `${match}\n${hudHtml}`);
}

function replaceOrInjectTimerScript(content, scriptHtml) {
  content = content.replace(/<!-- Invigilator HUD Live Timer Engine -->[\s\S]*?<\/script>/gi, '');
  content = content.replace(
    /<!-- Pearson Invigilator HUD Live Timer Engine -->[\s\S]*?<\/script>/gi,
    '',
  );
  content = content.replace(/<script src="[^"]*exam_timer\.js"><\/script>\s*/gi, '');

  return content.replace(/<\/body>/i, `${scriptHtml}\n</body>`);
}

function generateMinimalMasthead(paperRef) {
  return `
    <!-- Official Pearson Examination Header (Minimal & Focused) -->
    <div style="border: 2px solid #000; padding: 14px 18px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; background: #fff;">
      <div>
        <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: #000;">PEARSON EDEXCEL GCSE (9–1)</div>
        <div style="font-size: 18px; font-weight: 900; color: #000; font-family: 'Open Sans', Arial, sans-serif;">History Practice Examination Paper</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 11px; font-weight: 800; color: #555; text-transform: uppercase;">Paper Reference</div>
        <div style="font-size: 20px; font-weight: 900; line-height: 1; color: #000;">${paperRef}</div>
      </div>
    </div>
  `;
}

function removeCandidateBoxAndWarning(content, paperRef) {
  const masthead = generateMinimalMasthead(paperRef);

  // USA style:
  const usaPattern =
    /<div style=["']display:\s*flex;\s*justify-content:\s*space-between;\s*align-items:\s*flex-start;["']>[\s\S]*?Candidate Number[\s\S]*?Paper Reference[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i;
  if (usaPattern.test(content)) {
    return content.replace(usaPattern, masthead);
  }

  // CME, EEE, Medicine, Weimar style with .cover-box:
  let coverIdx = content.indexOf('class="cover-box"');
  if (coverIdx === -1) coverIdx = content.indexOf("class='cover-box'");

  if (coverIdx !== -1) {
    const pageIdx = content.lastIndexOf('<div class="page"', coverIdx);
    let startIdx = content.lastIndexOf('<div', coverIdx);

    // Check if there is a warning div between pageIdx and coverIdx
    if (pageIdx !== -1) {
      const intermediateText = content.substring(pageIdx, coverIdx);
      if (intermediateText.includes('Please check') || intermediateText.includes('top-warning')) {
        const firstDivAfterPage = content.indexOf('<div', pageIdx + '<div class="page"'.length);
        if (firstDivAfterPage !== -1 && firstDivAfterPage < coverIdx) {
          startIdx = firstDivAfterPage;
        }
      }
    }

    const coverBoxStart = content.lastIndexOf('<div', coverIdx);
    let depth = 0;
    let i = coverBoxStart;
    let endIdx = -1;

    while (i < content.length) {
      if (content.startsWith('<div', i) && (content[i + 4] === ' ' || content[i + 4] === '>')) {
        depth++;
        i += 4;
      } else if (content.startsWith('</div>', i)) {
        depth--;
        i += 6;
        if (depth === 0) {
          endIdx = i;
          break;
        }
      } else {
        i++;
      }
    }

    if (endIdx !== -1 && startIdx !== -1) {
      return content.substring(0, startIdx) + masthead + content.substring(endIdx);
    }
  }

  return content;
}

let modifiedCount = 0;

units.forEach((unit) => {
  const dir = path.join(baseDir, unit.id);
  if (!fs.existsSync(dir)) return;

  const files = fs
    .readdirSync(dir)
    .filter(
      (f) =>
        f.endsWith('.html') &&
        !f.includes('mark_scheme') &&
        (f.includes('mock') || f.includes('clone') || f.includes('notebook')),
    );

  files.forEach((fileName) => {
    const fullPath = path.join(dir, fileName);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Expected mark scheme URL
    const expectedMsName = fileName.replace(/\.html$/, '_mark_scheme.html');
    const msExists = fs.existsSync(path.join(dir, expectedMsName));
    const msUrl = msExists ? expectedMsName : null;

    // 1. Remove candidate box & warning, insert clean minimal masthead
    content = removeCandidateBoxAndWarning(content, unit.paperRef);

    // 2. Remove instructions bullet regarding candidate name/number
    content = content.replace(
      /<li>(?:<strong>)?Fill in the boxes(?:<\/strong>)? at the top of this page with your name, centre number and candidate number\.?<\/li>/gi,
      '',
    );

    // 3. Ensure @media print hides .invigilator-hud
    if (!content.includes('.invigilator-hud { display: none')) {
      content = content.replace(
        /@media print\s*\{/i,
        '@media print {\n    .invigilator-hud { display: none !important; }\n',
      );
    }

    // 4. Inject or Replace Invigilator HUD with timing strategy drawer
    const hudHtml = generateInvigilatorHud(unit, msUrl);
    content = replaceOrInjectHud(content, hudHtml);

    // 5. Inject Self-Contained Timer Engine directly before </body>
    const scriptHtml = generateTimerScript(unit.defaultMinutes);
    content = replaceOrInjectTimerScript(content, scriptHtml);

    // 6. Inject Quick Launch question buttons next to mark indicators
    content = injectQuestionTimeButtons(content, unit.id);

    // 7. Inject Question Button and Print Styles into <style>
    content = injectButtonStyles(content);

    // 8. Normalize blue mark scheme banners or colorful elements
    content = content.replace(
      /\.mark-scheme-banner\s*\{[^}]*background:\s*#[a-f0-9]+;[^}]*\}/gi,
      '.mark-scheme-banner { background: #000000; color: #ffffff; border: 2px solid #000000; }',
    );

    fs.writeFileSync(fullPath, content, 'utf8');
    modifiedCount++;
    console.log(`[UPDATED] ${unit.id}/${fileName}`);
  });
});

console.log(
  `\n🎉 Successfully processed and upgraded ${modifiedCount} mock exam papers with Question-Anchor Quick Launch & Timing Strategy Drawers!`,
);

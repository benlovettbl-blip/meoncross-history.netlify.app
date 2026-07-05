import { state } from './state.js';
import { saveProgress } from './storage.js';
import { AudioEngine } from './audio.js';
import { getKeywordsForQuestion } from './layout.js';
import { PAST_PAPERS_DATA, CONSEQUENCE_SKILLS_DATA, NARRATIVE_SKILLS_DATA, EXAM_SKILLS_DATA } from '../questions.js';

// --- Past Exam Papers Engine ---

export function updateDraftFeedback(qId, value, questionObj) {
  const badge = document.getElementById(`feedback-badge-${qId}`);
  const fill = document.getElementById(`feedback-fill-${qId}`);
  const connTags = document.getElementById(`connective-tags-${qId}`);
  const keyTags = document.getElementById(`keyword-tags-${qId}`);
  const keyRow = document.getElementById(`keyword-feedback-row-${qId}`);
  
  if (!badge || !fill) return;
  
  const text = (value || '').toLowerCase().trim();
  
  // Causal connectives check
  const connectives = ["because", "as a result", "led to", "resulted in", "provoked", "consequently", "enabled", "intensified", "forced", "therefore"];
  const matchedConnectives = connectives.filter(c => text.includes(c));
  
  // Keywords check
  const keywords = getKeywordsForQuestion(questionObj);
  const matchedKeywords = keywords.filter(k => text.includes(k.toLowerCase()));
  
  // Scoring
  const connectivesScore = Math.min(50, matchedConnectives.length * 10);
  const keywordsScore = keywords.length > 0 ? Math.min(50, matchedKeywords.length * (50 / keywords.length)) : 50;
  const totalScore = Math.round(connectivesScore + keywordsScore);
  
  // Update progress bar
  fill.style.width = `${totalScore}%`;
  
  // Update status badge
  badge.className = "feedback-badge";
  if (totalScore <= 20) {
    badge.textContent = "Structure: Drafting";
  } else if (totalScore <= 50) {
    badge.textContent = "Structure: Developing";
    badge.classList.add('status-developing');
  } else if (totalScore <= 80) {
    badge.textContent = "Structure: Strong";
    badge.classList.add('status-strong');
  } else {
    badge.textContent = "Structure: Exam-Ready";
    badge.classList.add('status-outstanding');
  }
  
  // Render connectives pills
  if (connTags) {
    connTags.innerHTML = connectives.map(c => {
      const matched = matchedConnectives.includes(c);
      return `<span class="feedback-tag ${matched ? 'matched' : ''}">${matched ? '✔ ' : ''}${c}</span>`;
    }).join('');
  }
  
  // Render keywords pills
  if (keywords.length > 0) {
    if (keyRow) keyRow.style.display = 'block';
    if (keyTags) {
      keyTags.innerHTML = keywords.map(k => {
        const matched = matchedKeywords.includes(k);
        return `<span class="feedback-tag ${matched ? 'matched' : ''}">${matched ? '✔ ' : ''}${k}</span>`;
      }).join('');
    }
  } else {
    if (keyRow) keyRow.style.display = 'none';
  }
}

export function renderPastPapersView() {
  const container = document.getElementById('past-paper-sheet-container');
  if (state.pastPaperSession.activePaperId) {
    renderExamSheet();
    if (container) container.style.display = 'block';
  } else {
    if (container) container.style.display = 'none';
  }
}

export function startPastPaper(paperId) {
  const paper = PAST_PAPERS_DATA.find(p => p.id === paperId);
  if (!paper) return;

  state.pastPaperSession.activePaperId = paperId;
  state.pastPaperSession.activePaperData = paper;
  if (!state.pastPaperSession.answers[paperId]) {
    state.pastPaperSession.answers[paperId] = {};
  }
  
  renderExamSheet();
  const sheetContainer = document.getElementById('past-paper-sheet-container');
  if (sheetContainer) sheetContainer.style.display = 'block';
}

export function generateMockExam() {
  const consequenceKeys = Object.keys(CONSEQUENCE_SKILLS_DATA);
  const randomC1 = consequenceKeys[Math.floor(Math.random() * consequenceKeys.length)];
  const randomC2 = consequenceKeys.filter(k => k !== randomC1)[Math.floor(Math.random() * (consequenceKeys.length - 1))];
  
  const narrativeKeys = Object.keys(NARRATIVE_SKILLS_DATA);
  const randomN = narrativeKeys[Math.floor(Math.random() * narrativeKeys.length)];
  
  const importanceKeys = Object.keys(EXAM_SKILLS_DATA);
  const selectedImp = [];
  while (selectedImp.length < 3) {
    const rKey = importanceKeys[Math.floor(Math.random() * importanceKeys.length)];
    if (!selectedImp.includes(rKey)) {
      selectedImp.push(rKey);
    }
  }

  const paper = {
    id: "mock_random_" + Date.now(),
    title: "Random Mock Exam",
    year: "Mock",
    q1: {
      type: "consequence_split_4",
      question: "Section A: Consequence sub-questions",
      subQuestions: [
        {
          id: randomC1,
          title: `Q1(a): ${CONSEQUENCE_SKILLS_DATA[randomC1].question} (4 marks)`,
          clue: CONSEQUENCE_SKILLS_DATA[randomC1].clue,
          model: CONSEQUENCE_SKILLS_DATA[randomC1].answer
        },
        {
          id: randomC2,
          title: `Q1(b): ${CONSEQUENCE_SKILLS_DATA[randomC2].question} (4 marks)`,
          clue: CONSEQUENCE_SKILLS_DATA[randomC2].clue,
          model: CONSEQUENCE_SKILLS_DATA[randomC2].answer
        }
      ]
    },
    q2: {
      type: "narrative",
      question: NARRATIVE_SKILLS_DATA[randomN].question + " (8 marks)",
      stimulus: NARRATIVE_SKILLS_DATA[randomN].events.slice(0, 2),
      clue: "Verify the correct chronological order, then write the narrative. Integrate analytical process words (intensified, provoked, resulted in, enabled).",
      model: NARRATIVE_SKILLS_DATA[randomN].model
    },
    q3: {
      type: "importance_choice",
      question: "Explain two of the following: (16 marks)",
      choices: selectedImp.map((key, idx) => {
        const letter = ['a', 'b', 'c'][idx];
        return {
          id: key,
          title: `The importance of ${EXAM_SKILLS_DATA[key].question.replace("Explain the importance of ", "").replace(" for ", " for the ").replace("?", "")}.`,
          clue: `${EXAM_SKILLS_DATA[key].clue1} ${EXAM_SKILLS_DATA[key].clue2}`,
          model: EXAM_SKILLS_DATA[key].answer
        };
      })
    }
  };

  state.pastPaperSession.activePaperId = paper.id;
  state.pastPaperSession.activePaperData = paper;
  state.pastPaperSession.answers[paper.id] = {};

  renderExamSheet();
  const sheetContainer = document.getElementById('past-paper-sheet-container');
  if (sheetContainer) sheetContainer.style.display = 'block';
}

export function togglePastClue(qId) {
  const box = document.getElementById(`past-clue-box-${qId}`);
  if (!box) return;
  const isHidden = box.style.display === 'none';
  box.style.display = isHidden ? 'block' : 'none';
  AudioEngine.play(isHidden ? 'flip' : 'click');
}

export function togglePastAnswer(qId) {
  const box = document.getElementById(`past-answer-box-${qId}`);
  if (!box) return;
  const isHidden = box.style.display === 'none';
  box.style.display = isHidden ? 'block' : 'none';
  AudioEngine.play(isHidden ? 'success' : 'click');
}

export function togglePastQuestionComplete(qId, checked) {
  const session = state.pastPaperSession;
  if (checked) {
    if (!session.completedQuestions.includes(qId)) {
      session.completedQuestions.push(qId);
      AudioEngine.play('success');
    }
  } else {
    const idx = session.completedQuestions.indexOf(qId);
    if (idx > -1) {
      session.completedQuestions.splice(idx, 1);
      AudioEngine.play('click');
    }
  }
  saveProgress();
}

export function renderExamSheet() {
  const session = state.pastPaperSession;
  const paper = session.activePaperData;
  const container = document.getElementById('past-paper-sheet-container');
  if (!paper || !container) return;

  const questionsList = [];
  if (paper.q1) {
    if (paper.q1.type === 'consequence_split_4') {
      questionsList.push(paper.q1.subQuestions[0].id, paper.q1.subQuestions[1].id);
    } else if (paper.q1.type === 'consequence_8') {
      questionsList.push(paper.id + '_q1');
    }
  }
  if (paper.q2 && paper.q2.type !== 'none') {
    questionsList.push(paper.id + '_q2');
  }
  if (paper.q3 && paper.q3.type !== 'none') {
    paper.q3.choices.forEach(c => questionsList.push(c.id));
  }

  const completedCount = questionsList.filter(id => session.completedQuestions.includes(id)).length;
  const pct = questionsList.length > 0 ? Math.round((completedCount / questionsList.length) * 100) : 0;

  let highProbBanner = '';
  if (paper.highProbability) {
    highProbBanner = `
      <div class="high-probability-banner" style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(249, 115, 22, 0.08) 100%); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: var(--border-radius-sm); padding: 14px 18px; margin-bottom: 20px; display: flex; align-items: center; gap: 14px; box-sizing: border-box; text-align: left;">
        <div style="width: 38px; height: 38px; border-radius: 50%; background: rgba(239, 68, 68, 0.15); display: flex; align-items: center; justify-content: center; color: #ef4444; font-size: 1.25rem; flex-shrink: 0;">
          <i class="fa-solid fa-fire"></i>
        </div>
        <div>
          <strong style="color: #ef4444; font-size: 0.95rem; display: block; margin-bottom: 3px;">2026 High Probability Mock Exam</strong>
          <span style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.45; display: block;">This paper contains questions highly predicted to appear in upcoming exams. Prioritise mastering these model answers!</span>
        </div>
      </div>
    `;
  }

  let html = `
    <div class="exam-sheet">
      <div class="exam-sheet-header">
        <h3>${paper.title}</h3>
        <div class="exam-metadata">
          <span><i class="fa-solid fa-calendar"></i> Year: ${paper.year}</span>
          <span><i class="fa-solid fa-check-double"></i> Complete: ${completedCount}/${questionsList.length} (${pct}%)</span>
        </div>
      </div>
      ${highProbBanner}
  `;

  if (paper.q1) {
    html += `<div class="exam-sheet-section">`;
    if (paper.q1.type === 'consequence_split_4') {
      html += `<h4>Section A: Consequence Questions (8 marks total)</h4>`;
      paper.q1.subQuestions.forEach(sq => {
        html += renderPastQuestionMarkup(sq.id, sq.title, sq.clue, sq.model, 4);
      });
    } else if (paper.q1.type === 'consequence_8') {
      html += `<h4>Section A: Consequence Question (8 marks)</h4>`;
      html += renderPastQuestionMarkup(paper.id + '_q1', paper.q1.question, paper.q1.clue, paper.q1.model, 8);
    } else {
      html += `<h4>Section A: Consequence Question</h4><p style="font-style: italic; color: var(--text-muted);">${paper.q1.question}</p>`;
    }
    html += `</div>`;
  }

  if (paper.q2) {
    html += `<div class="exam-sheet-section">`;
    if (paper.q2.type === 'narrative') {
      html += `<h4>Section B: Narrative Account (8 marks)</h4>`;
      html += renderPastQuestionMarkup(paper.id + '_q2', paper.q2.question, paper.q2.clue, paper.q2.model, 8, paper.q2.stimulus);
    } else {
      html += `<h4>Section B: Narrative Account</h4><p style="font-style: italic; color: var(--text-muted);">${paper.q2.question}</p>`;
    }
    html += `</div>`;
  }

  if (paper.q3) {
    html += `<div class="exam-sheet-section">`;
    if (paper.q3.type === 'importance_choice') {
      html += `<h4>Section C: Importance Choice (16 marks total, answer TWO of three)</h4>`;
      html += `<p style="font-size: 0.9rem; margin-bottom: 12px; font-weight: bold; color: var(--primary);">Choose any two questions to answer:</p>`;
      paper.q3.choices.forEach((choice, idx) => {
        const indexStr = ['a', 'b', 'c'][idx];
        const titleText = `Q3(${indexStr}): ${choice.title} (8 marks)`;
        html += renderPastQuestionMarkup(choice.id, titleText, choice.clue, choice.model, 8);
      });
    } else {
      html += `<h4>Section C: Importance Question</h4><p style="font-style: italic; color: var(--text-muted);">${paper.q3.question}</p>`;
    }
    html += `</div>`;
  }

  html += `
      <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
        <button class="btn-secondary" id="btn-close-exam-sheet" style="font-weight: 600;">
          Close Paper & Save Draft
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;

  questionsList.forEach(qId => {
    let qObj = null;
    if (paper.q1) {
      if (paper.q1.type === 'consequence_split_4') {
        qObj = paper.q1.subQuestions.find(sq => sq.id === qId);
      } else if (paper.id + '_q1' === qId) {
        qObj = paper.q1;
      }
    }
    if (!qObj && paper.q2 && paper.id + '_q2' === qId) {
      qObj = paper.q2;
    }
    if (!qObj && paper.q3 && paper.q3.type === 'importance_choice') {
      qObj = paper.q3.choices.find(c => c.id === qId);
    }

    const textarea = document.getElementById(`past-textarea-${qId}`);
    if (textarea && qObj) {
      textarea.value = session.answers[paper.id][qId] || '';
      updateDraftFeedback(qId, textarea.value, qObj);
      textarea.addEventListener('input', (e) => {
        session.answers[paper.id][qId] = e.target.value;
        updateDraftFeedback(qId, e.target.value, qObj);
        saveProgress();
      });
    }

    const chk = document.getElementById(`past-chk-${qId}`);
    if (chk) {
      chk.checked = session.completedQuestions.includes(qId);
      chk.addEventListener('change', (e) => {
        togglePastQuestionComplete(qId, e.target.checked);
        renderExamSheetStats();
      });
    }

    const btnClue = document.getElementById(`past-btn-clue-${qId}`);
    if (btnClue) {
      btnClue.addEventListener('click', () => togglePastClue(qId));
    }

    const btnCheck = document.getElementById(`past-btn-check-${qId}`);
    if (btnCheck) {
      btnCheck.addEventListener('click', () => togglePastAnswer(qId));
    }
  });

  const closeBtn = document.getElementById('btn-close-exam-sheet');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      AudioEngine.play('click');
      state.pastPaperSession.activePaperId = null;
      state.pastPaperSession.activePaperData = null;
      container.style.display = 'none';
      const selectEl = document.getElementById('past-paper-select');
      if (selectEl) selectEl.value = '';
    });
  }
}

export function renderPastQuestionMarkup(qId, questionText, clue, modelAnswer, marks, stimulus = null) {
  let stimulusHTML = '';
  if (stimulus && stimulus.length > 0) {
    stimulusHTML = `
      <div class="stimulus-container">
        <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted); display: flex; align-items: center;">Stimulus:</span>
        ${stimulus.map(s => `<span class="stimulus-item">${s}</span>`).join('')}
      </div>
    `;
  }

  return `
    <div class="exam-question-block" id="exam-q-block-${qId}">
      <div class="exam-question-header">
        <h5 class="exam-question-title">${questionText}</h5>
        <span class="exam-question-marks">${marks} Marks</span>
      </div>
      ${stimulusHTML}
      <textarea class="exam-textarea" id="past-textarea-${qId}" placeholder="Draft your answer here..." style="min-height: 120px;"></textarea>
      
      <!-- Live feedback card -->
      <div class="draft-feedback-card" id="draft-feedback-${qId}">
        <div class="feedback-stats">
          <div class="feedback-badge" id="feedback-badge-${qId}">Structure: Drafting</div>
          <div class="feedback-progress-bar">
            <div class="feedback-progress-fill" id="feedback-fill-${qId}" style="width: 0%;"></div>
          </div>
        </div>
        <div class="feedback-checklist">
          <div class="feedback-item">
            <strong>Causal Connectives:</strong>
            <div class="feedback-tags" id="connective-tags-${qId}"></div>
          </div>
          <div class="feedback-item" id="keyword-feedback-row-${qId}">
            <strong>Key Terms:</strong>
            <div class="feedback-tags" id="keyword-tags-${qId}"></div>
          </div>
        </div>
      </div>

      <div class="exam-sheet-actions">
        <button class="btn-secondary" id="past-btn-clue-${qId}" style="flex: 1; min-width: 130px; font-size: 0.85rem; padding: 8px 12px;">
          <i class="fa-solid fa-lightbulb"></i> Educator Clue
        </button>
        <button class="btn-primary" id="past-btn-check-${qId}" style="flex: 2; min-width: 180px; font-size: 0.85rem; padding: 8px 12px;">
          <i class="fa-solid fa-clipboard-check"></i> Self-Check Answer
        </button>
      </div>

      <div class="past-clue-box" id="past-clue-box-${qId}" style="display: none;">
        <strong>Clue:</strong> ${clue}
      </div>

      <div class="past-model-answer" id="past-answer-box-${qId}" style="display: none;">
        <div class="past-model-answer-title"><i class="fa-solid fa-star"></i> Level 7-9 Model Answer</div>
        <div class="past-model-answer-content">${modelAnswer}</div>
      </div>

      <label class="completion-check-row">
        <input type="checkbox" id="past-chk-${qId}">
        Mark this question as complete
      </label>
    </div>
  `;
}

export function renderExamSheetStats() {
  const session = state.pastPaperSession;
  const paper = session.activePaperData;
  if (!paper) return;

  const questionsList = [];
  if (paper.q1) {
    if (paper.q1.type === 'consequence_split_4') {
      questionsList.push(paper.q1.subQuestions[0].id, paper.q1.subQuestions[1].id);
    } else if (paper.q1.type === 'consequence_8') {
      questionsList.push(paper.id + '_q1');
    }
  }
  if (paper.q2 && paper.q2.type !== 'none') {
    questionsList.push(paper.id + '_q2');
  }
  if (paper.q3 && paper.q3.type !== 'none') {
    paper.q3.choices.forEach(c => questionsList.push(c.id));
  }

  const completedCount = questionsList.filter(id => session.completedQuestions.includes(id)).length;
  const pct = questionsList.length > 0 ? Math.round((completedCount / questionsList.length) * 100) : 0;

  const metaEl = document.querySelector('.exam-sheet-header .exam-metadata');
  if (metaEl) {
    metaEl.innerHTML = `
      <span><i class="fa-solid fa-calendar"></i> Year: ${paper.year}</span>
      <span><i class="fa-solid fa-check-double"></i> Complete: ${completedCount}/${questionsList.length} (${pct}%)</span>
    `;
  }
}

// --- Printable Mock Creator & Word Export Helpers ---

export function downloadHtmlAsWord(filename, htmlContent) {
  let processedHtml = htmlContent;
  
  // Inject inline page breaks and other word formatting fixes in htmlContent
  processedHtml = processedHtml.replace(/class="print-page"/g, 'class="print-page" style="page-break-after: always; mso-special-character: line-break; clear: both;"');
  processedHtml = processedHtml.replace(/class="print-page-last"/g, 'class="print-page-last" style="page-break-after: avoid; clear: both;"');

  let finalHtml = '';
  const trimmed = processedHtml.trim().toLowerCase();
  
  if (trimmed.startsWith('<!doctype html') || trimmed.startsWith('<html')) {
    finalHtml = '\ufeff' + processedHtml;
  } else {
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <title>Export HTML to Word</title>
    <!--[if gte mso 9]>
    <xml>
      <w:WordDocument>
        <w:View>Print</w:View>
        <w:Zoom>100</w:Zoom>
        <w:DoNotOptimizeForBrowser/>
      </w:WordDocument>
    </xml>
    <![endif]-->
    <style>
      @page {
        size: 21cm 29.7cm; /* A4 */
        margin: 2cm 2cm 2cm 2cm;
        mso-page-orientation: portrait;
      }
      body {
        font-family: 'Arial', sans-serif;
        font-size: 11pt;
        color: #000000;
        line-height: 1.5;
      }
      .print-page {
        page-break-after: always;
        clear: both;
      }
      .edexcel-header-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      .edexcel-header-table td {
        border: 1.5px solid #000000;
        padding: 8px 12px;
        font-size: 9pt;
        vertical-align: top;
      }
      .edexcel-candidate-label {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 7.5pt;
        display: block;
        margin-bottom: 4px;
      }
      .edexcel-title-block {
        text-align: center;
        margin: 30px 0 20px 0;
      }
      .edexcel-title-pearson {
        font-size: 14pt;
        font-weight: bold;
        display: block;
        margin-bottom: 4px;
      }
      .edexcel-title-main {
        font-size: 18pt;
        font-weight: 800;
        display: block;
        margin-bottom: 12px;
      }
      .edexcel-paper-details {
        font-size: 11pt;
        font-weight: bold;
        border-top: 2px solid #000000;
        border-bottom: 2px solid #000000;
        padding: 10px 0;
        margin: 15px 0;
        text-align: center;
      }
      .edexcel-meta-row {
        display: flex;
        justify-content: space-between;
        font-size: 10pt;
        font-weight: bold;
        margin-bottom: 25px;
      }
      .edexcel-instruction-box {
        border: 2px solid #000000;
        padding: 15px;
        margin-bottom: 20px;
        font-size: 9.5pt;
        text-align: left;
      }
      .edexcel-instruction-title {
        font-weight: bold;
        text-transform: uppercase;
        display: block;
        margin-bottom: 6px;
        border-bottom: 1px solid #000000;
        padding-bottom: 2px;
      }
      .edexcel-double-line {
        border-top: 1px solid #000;
        border-bottom: 3px double #000;
        height: 4px;
        margin: 30px 0 20px 0;
      }
      .edexcel-section-title {
        font-size: 14pt;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 15px;
      }
      .edexcel-question-container {
        margin-bottom: 30px;
      }
      .edexcel-question-header {
        font-weight: bold;
        font-size: 11.5pt;
        margin-bottom: 12px;
        line-height: 1.4;
      }
      .edexcel-question-marks {
        font-weight: bold;
        font-size: 11pt;
        float: right;
      }
      .edexcel-stimulus-box {
        border: 1px solid #000000;
        padding: 10px 15px;
        margin: 10px 0 20px 0;
        background: #ffffff;
        font-size: 10.5pt;
      }
      .edexcel-stimulus-item {
        font-weight: bold;
        border: 1.5px solid #000000;
        padding: 6px 20px;
        margin: 0 10px;
        display: inline-block;
      }
      .edexcel-writing-line {
        border-bottom: 1px dashed #777777;
        height: 32px;
        width: 100%;
      }
      /* Answers styling */
      .model-answer-section {
        background: #f9fafb;
        border-left: 3px solid #10b981;
        padding: 12px;
        margin-top: 10px;
        font-size: 10pt;
      }
    </style>
  </head>
  <body>
    ${processedHtml}
  </body>
  </html>`;
    finalHtml = '\ufeff' + header;
  }

  const blob = new Blob([finalHtml], {
    type: 'application/msword;charset=utf-8'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.doc') ? filename : filename + '.doc';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function initMockCreator() {
  const modeSelect = document.getElementById('mock-creator-mode');
  const presetRow = document.getElementById('mock-creator-preset-select-row');
  const customSelectors = document.getElementById('mock-creator-custom-selectors');
  
  if (modeSelect) {
    modeSelect.addEventListener('change', () => {
      const mode = modeSelect.value;
      if (mode === 'preset') {
        if (presetRow) presetRow.style.display = 'block';
        if (customSelectors) customSelectors.style.display = 'none';
      } else if (mode === 'random') {
        if (presetRow) presetRow.style.display = 'none';
        if (customSelectors) customSelectors.style.display = 'none';
      } else if (mode === 'custom') {
        if (presetRow) presetRow.style.display = 'none';
        if (customSelectors) customSelectors.style.display = 'flex';
      }
    });
  }

  // Populate Presets dropdown
  const presetDropdown = document.getElementById('mock-creator-preset');
  if (presetDropdown) {
    presetDropdown.innerHTML = PAST_PAPERS_DATA.map(p => `
      <option value="${p.id}">${p.title} (${p.year})</option>
    `).join('');
  }

  // Populate Custom selectors
  const q1Select = document.getElementById('mock-creator-custom-q1');
  if (q1Select) {
    q1Select.innerHTML = Object.entries(CONSEQUENCE_SKILLS_DATA).map(([key, data]) => `
      <option value="${key}">${key}: ${data.question.slice(0, 75)}...</option>
    `).join('');
  }

  const q2Select = document.getElementById('mock-creator-custom-q2');
  if (q2Select) {
    q2Select.innerHTML = Object.entries(NARRATIVE_SKILLS_DATA).map(([key, data]) => `
      <option value="${key}">${key}: ${data.question.slice(0, 75)}...</option>
    `).join('');
  }

  const q3_1 = document.getElementById('mock-creator-custom-q3-1');
  const q3_2 = document.getElementById('mock-creator-custom-q3-2');
  const q3_3 = document.getElementById('mock-creator-custom-q3-3');
  
  if (q3_1 && q3_2 && q3_3) {
    const q3Options = Object.entries(EXAM_SKILLS_DATA).map(([key, data]) => `
      <option value="${key}">${key}: ${data.question.slice(0, 75)}...</option>
    `).join('');
    
    q3_1.innerHTML = q3Options;
    q3_2.innerHTML = q3Options;
    q3_3.innerHTML = q3Options;
    
    // Auto select unique choices
    const keys = Object.keys(EXAM_SKILLS_DATA);
    if (keys.length >= 3) {
      q3_1.value = keys[0];
      q3_2.value = keys[1];
      q3_3.value = keys[2];
    }
  }

  // Bind Export Buttons
  const btnWord = document.getElementById('btn-mock-export-word');
  if (btnWord) {
    btnWord.addEventListener('click', () => {
      const compiled = compileMockData();
      if (!compiled) return;
      const html = generateMockHtml(compiled);
      downloadHtmlAsWord(`Edexcel_GCSE_History_Mock_${compiled.paperId}.doc`, html);
      AudioEngine.play('success');
    });
  }

  const btnPrint = document.getElementById('btn-mock-print');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      const compiled = compileMockData();
      if (!compiled) return;
      const html = generateMockHtml(compiled);
      const printArea = document.getElementById('print-area');
      if (printArea) {
        printArea.innerHTML = html;
        setTimeout(() => {
          window.print();
        }, 150);
        AudioEngine.play('success');
      }
    });
  }

  // Open & Close
  const btnOpen = document.getElementById('btn-mock-creator-open');
  const modal = document.getElementById('mock-creator-modal');
  if (btnOpen && modal) {
    btnOpen.addEventListener('click', () => {
      modal.style.display = 'flex';
      AudioEngine.play('click');
    });
  }

  const btnClose = document.getElementById('btn-mock-creator-close');
  if (btnClose && modal) {
    btnClose.addEventListener('click', () => {
      modal.style.display = 'none';
      AudioEngine.play('click');
    });
  }
}

function compileMockData() {
  const mode = document.getElementById('mock-creator-mode').value;
  const lineDensity = parseInt(document.getElementById('mock-creator-lines').value);
  const includeCover = document.getElementById('mock-creator-extras').value;
  const includeAnswers = document.getElementById('mock-creator-answers').value === 'yes';
  const paperFont = document.getElementById('mock-creator-font').value;

  let compiled = {
    paperId: 'custom',
    title: 'Custom History GCSE Mock Exam',
    year: 'Mock 2026',
    font: paperFont === 'times' ? 'Times New Roman, serif' : 'Arial, sans-serif',
    includeCover: includeCover,
    lineDensity: lineDensity,
    includeAnswers: includeAnswers,
    q1: null,
    q2: null,
    q3: []
  };

  if (mode === 'preset') {
    const presetId = document.getElementById('mock-creator-preset').value;
    const presetPaper = PAST_PAPERS_DATA.find(p => p.id === presetId);
    if (!presetPaper) return null;

    compiled.paperId = presetPaper.id;
    compiled.title = presetPaper.title;
    compiled.year = presetPaper.year;

    // Consequence
    if (presetPaper.q1) {
      if (presetPaper.q1.type === 'consequence_split_4') {
        compiled.q1 = {
          title: "Section A: Explain two consequences of...",
          subQuestions: presetPaper.q1.subQuestions.map(sq => ({
            question: sq.title,
            marks: 4,
            model: sq.model || sq.answer
          }))
        };
      } else {
        compiled.q1 = {
          title: presetPaper.q1.question,
          marks: 8,
          model: presetPaper.q1.model || presetPaper.q1.answer
        };
      }
    }
    // Narrative
    if (presetPaper.q2) {
      compiled.q2 = {
        question: presetPaper.q2.question,
        stimulus: presetPaper.q2.stimulus || [],
        marks: 8,
        model: presetPaper.q2.model || presetPaper.q2.answer
      };
    }
    // Importance choices
    if (presetPaper.q3 && presetPaper.q3.choices) {
      compiled.q3 = presetPaper.q3.choices.map((c, idx) => ({
        letter: ['a', 'b', 'c'][idx],
        title: c.title,
        marks: 8,
        model: c.model || c.answer
      }));
    }
  } else if (mode === 'random') {
    compiled.paperId = 'rand_' + Date.now();
    compiled.title = 'Randomly Generated GCSE History Mock';

    // Q1 Consequence
    const consequenceKeys = Object.keys(CONSEQUENCE_SKILLS_DATA);
    const rc1 = consequenceKeys[Math.floor(Math.random() * consequenceKeys.length)];
    const rc2 = consequenceKeys.filter(k => k !== rc1)[Math.floor(Math.random() * (consequenceKeys.length - 1))];
    compiled.q1 = {
      title: "Section A: Explain two consequences of...",
      subQuestions: [
        {
          question: `Explain one consequence of ${CONSEQUENCE_SKILLS_DATA[rc1].question.replace("Explain one consequence of ", "")}`,
          marks: 4,
          model: CONSEQUENCE_SKILLS_DATA[rc1].answer
        },
        {
          question: `Explain one consequence of ${CONSEQUENCE_SKILLS_DATA[rc2].question.replace("Explain one consequence of ", "")}`,
          marks: 4,
          model: CONSEQUENCE_SKILLS_DATA[rc2].answer
        }
      ]
    };

    // Q2 Narrative
    const narrativeKeys = Object.keys(NARRATIVE_SKILLS_DATA);
    const rn = narrativeKeys[Math.floor(Math.random() * narrativeKeys.length)];
    compiled.q2 = {
      question: NARRATIVE_SKILLS_DATA[rn].question,
      stimulus: NARRATIVE_SKILLS_DATA[rn].events.slice(0, 2),
      marks: 8,
      model: NARRATIVE_SKILLS_DATA[rn].model
    };

    // Q3 Importance Choice
    const importanceKeys = Object.keys(EXAM_SKILLS_DATA);
    const selected = [];
    while (selected.length < 3) {
      const rKey = importanceKeys[Math.floor(Math.random() * importanceKeys.length)];
      if (!selected.includes(rKey)) selected.push(rKey);
    }
    compiled.q3 = selected.map((key, idx) => {
      const qText = EXAM_SKILLS_DATA[key].question;
      const cleanText = qText.replace("Explain the importance of ", "").replace(" for ", " for the ").replace("?", "");
      return {
        letter: ['a', 'b', 'c'][idx],
        title: `The importance of ${cleanText}.`,
        marks: 8,
        model: EXAM_SKILLS_DATA[key].answer
      };
    });
  } else if (mode === 'custom') {
    compiled.paperId = 'custom_' + Date.now();
    compiled.title = 'Custom Mixed GCSE History Mock';

    const q1Key = document.getElementById('mock-creator-custom-q1').value;
    const q1Data = CONSEQUENCE_SKILLS_DATA[q1Key];
    compiled.q1 = {
      title: q1Data.question,
      marks: 8,
      model: q1Data.answer
    };

    const q2Key = document.getElementById('mock-creator-custom-q2').value;
    const q2Data = NARRATIVE_SKILLS_DATA[q2Key];
    compiled.q2 = {
      question: q2Data.question,
      stimulus: q2Data.events.slice(0, 2),
      marks: 8,
      model: q2Data.model
    };

    const q3_1Key = document.getElementById('mock-creator-custom-q3-1').value;
    const q3_2Key = document.getElementById('mock-creator-custom-q3-2').value;
    const q3_3Key = document.getElementById('mock-creator-custom-q3-3').value;

    const q3Keys = [q3_1Key, q3_2Key, q3_3Key];
    compiled.q3 = q3Keys.map((key, idx) => {
      const qData = EXAM_SKILLS_DATA[key];
      const cleanText = qData.question.replace("Explain the importance of ", "").replace(" for ", " for the ").replace("?", "");
      return {
        letter: ['a', 'b', 'c'][idx],
        title: `The importance of ${cleanText}.`,
        marks: 8,
        model: qData.answer
      };
    });
  }

  return compiled;
}

function generateMockHtml(compiled) {
  let html = `<div style="font-family: ${compiled.font}; text-align: left; padding: 20px; color: #000000; background-color: #ffffff;">`;

  // Page 1: Cover Page
  if (compiled.includeCover !== 'none') {
    html += `
      <div class="print-page" style="page-break-after: always; padding: 20px;">
        <table class="edexcel-header-table" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="border: 1.5px solid #000000; padding: 8px 12px; width: 60%;">
              <span class="edexcel-candidate-label" style="font-weight: bold; text-transform: uppercase; font-size: 7.5pt; display: block; margin-bottom: 4px;">Surname</span>
              <div style="height: 20px;"></div>
            </td>
            <td style="border: 1.5px solid #000000; padding: 8px 12px; width: 40%;" colspan="2">
              <span class="edexcel-candidate-label" style="font-weight: bold; text-transform: uppercase; font-size: 7.5pt; display: block; margin-bottom: 4px;">Other Names</span>
              <div style="height: 20px;"></div>
            </td>
          </tr>
          ${compiled.includeCover === 'both' ? `
          <tr>
            <td style="border: 1.5px solid #000000; padding: 8px 12px;">
              <span class="edexcel-candidate-label" style="font-weight: bold; text-transform: uppercase; font-size: 7.5pt; display: block; margin-bottom: 4px;">Candidate Signature</span>
              <div style="height: 20px;"></div>
            </td>
            <td style="border: 1.5px solid #000000; padding: 8px 12px; width: 20%;">
              <span class="edexcel-candidate-label" style="font-weight: bold; text-transform: uppercase; font-size: 7.5pt; display: block; margin-bottom: 4px;">Centre No.</span>
              <div style="height: 20px; border: 1px solid #777777;"></div>
            </td>
            <td style="border: 1.5px solid #000000; padding: 8px 12px; width: 20%;">
              <span class="edexcel-candidate-label" style="font-weight: bold; text-transform: uppercase; font-size: 7.5pt; display: block; margin-bottom: 4px;">Candidate No.</span>
              <div style="height: 20px; border: 1px solid #777777;"></div>
            </td>
          </tr>` : ''}
        </table>

        <div class="edexcel-title-block" style="text-align: center; margin: 30px 0 20px 0;">
          <span class="edexcel-title-pearson" style="font-size: 14pt; font-weight: bold; display: block;">Pearson Edexcel GCSE (9-1)</span>
          <span class="edexcel-title-main" style="font-size: 18pt; font-weight: 800; display: block;">History</span>
          <div class="edexcel-paper-details" style="font-size: 11pt; font-weight: bold; border-top: 2px solid #000000; border-bottom: 2px solid #000000; padding: 10px 0; margin: 15px 0;">
            Paper 2: Period study and British depth study<br>
            Option 26/27: Conflict in the Middle East, 1945-95
          </div>
        </div>

        <div class="edexcel-meta-row" style="display: flex; justify-content: space-between; font-weight: bold; font-size: 10pt; margin-bottom: 20px;">
          <span>Exam Reference: ${compiled.paperId.toUpperCase()}</span>
          <span>Time: 50 minutes</span>
        </div>

        <div class="edexcel-instruction-box" style="border: 2px solid #000000; padding: 15px; font-size: 9.5pt; text-align: left;">
          <span class="edexcel-instruction-title" style="font-weight: bold; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 6px;">Instructions</span>
          <ul>
            <li>Use black ink or ball-point pen.</li>
            <li>Fill in the boxes at the top of this page with your name, centre number and candidate number.</li>
            <li>Answer all questions.</li>
            <li>Answer the questions in the spaces provided - <i>there may be more space than you need</i>.</li>
          </ul>
          <span class="edexcel-instruction-title" style="font-weight: bold; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-top: 12px; margin-bottom: 6px;">Information</span>
          <ul>
            <li>The total mark for this paper is 32.</li>
            <li>The marks for each question are shown in brackets - <i>use this as a guide as to how much time to spend on each question</i>.</li>
          </ul>
        </div>
      </div>
    `;
  }

  // Question 1 Page
  if (compiled.q1) {
    html += `
      <div class="print-page" style="page-break-after: always; padding: 20px;">
        <div class="print-page-header" style="font-size: 8.5pt; color: #555555; border-bottom: 1px solid #cccccc; padding-bottom: 4px; margin-bottom: 20px; display: flex; justify-content: space-between;">
          <span>${compiled.title}</span>
          <span>Section A</span>
        </div>
        <div class="edexcel-section-title" style="font-size: 14pt; font-weight: bold; text-transform: uppercase; margin-bottom: 15px; text-align: left;">Section A: Consequence Questions</div>
        
        <div class="edexcel-question-container" style="margin-bottom: 30px; text-align: left;">
    `;

    if (compiled.q1.subQuestions) {
      compiled.q1.subQuestions.forEach((sq, idx) => {
        html += `
          <div style="margin-bottom: 25px;">
            <div class="edexcel-question-header" style="font-weight: bold; font-size: 11.5pt; margin-bottom: 12px; display: flex; justify-content: space-between;">
              <span>Q1(${idx === 0 ? 'a' : 'b'}): ${sq.question}</span>
              <span class="edexcel-question-marks" style="font-weight: bold; font-size: 11pt; margin-left: 15px;">(4 marks)</span>
            </div>
            ${generateLinesHtml(compiled.lineDensity / 2)}
          </div>
        `;
      });
    } else {
      html += `
        <div class="edexcel-question-header" style="font-weight: bold; font-size: 11.5pt; margin-bottom: 12px; display: flex; justify-content: space-between;">
          <span>Question 1: ${compiled.q1.title}</span>
          <span class="edexcel-question-marks" style="font-weight: bold; font-size: 11pt; margin-left: 15px;">(${compiled.q1.marks} marks)</span>
        </div>
        ${generateLinesHtml(compiled.lineDensity)}
      `;
    }

    html += `
        </div>
        <div class="print-page-footer" style="position: absolute; bottom: 10px; left: 20px; right: 20px; font-size: 8pt; color: #555555; border-top: 1px solid #cccccc; padding-top: 4px; text-align: center;">Page 2</div>
      </div>
    `;
  }

  // Question 2 Page
  if (compiled.q2) {
    html += `
      <div class="print-page" style="page-break-after: always; padding: 20px;">
        <div class="print-page-header" style="font-size: 8.5pt; color: #555555; border-bottom: 1px solid #cccccc; padding-bottom: 4px; margin-bottom: 20px; display: flex; justify-content: space-between;">
          <span>${compiled.title}</span>
          <span>Section B</span>
        </div>
        <div class="edexcel-section-title" style="font-size: 14pt; font-weight: bold; text-transform: uppercase; margin-bottom: 15px; text-align: left;">Section B: Narrative Accounts</div>
        
        <div class="edexcel-question-container" style="margin-bottom: 30px; text-align: left;">
          <div class="edexcel-question-header" style="font-weight: bold; font-size: 11.5pt; margin-bottom: 12px; display: flex; justify-content: space-between;">
            <span>Question 2: ${compiled.q2.question}</span>
            <span class="edexcel-question-marks" style="font-weight: bold; font-size: 11pt; margin-left: 15px;">(${compiled.q2.marks} marks)</span>
          </div>

          ${compiled.q2.stimulus && compiled.q2.stimulus.length > 0 ? `
          <div class="edexcel-stimulus-box" style="border: 1px solid #000000; padding: 10px 15px; margin: 10px 0 20px 0; background: #ffffff; font-size: 10.5pt; display: flex; justify-content: space-around;">
            ${compiled.q2.stimulus.map(s => `<span class="edexcel-stimulus-item" style="font-weight: bold; border: 1.5px solid #000000; padding: 6px 20px;">${s}</span>`).join('')}
          </div>` : ''}

          <p style="font-size: 8.5pt; color: #555555; font-style: italic; margin-bottom: 10px;">
            Write your narrative response here. You may use the stimulus points above, but you must also include your own knowledge.
          </p>
          ${generateLinesHtml(compiled.lineDensity)}
        </div>
        <div class="print-page-footer" style="position: absolute; bottom: 10px; left: 20px; right: 20px; font-size: 8pt; color: #555555; border-top: 1px solid #cccccc; padding-top: 4px; text-align: center;">Page 3</div>
      </div>
    `;
  }

  // Question 3 Page
  if (compiled.q3 && compiled.q3.length > 0) {
    html += `
      <div class="print-page" style="page-break-after: ${compiled.includeAnswers ? 'always' : 'avoid'}; padding: 20px;">
        <div class="print-page-header" style="font-size: 8.5pt; color: #555555; border-bottom: 1px solid #cccccc; padding-bottom: 4px; margin-bottom: 20px; display: flex; justify-content: space-between;">
          <span>${compiled.title}</span>
          <span>Section C</span>
        </div>
        <div class="edexcel-section-title" style="font-size: 14pt; font-weight: bold; text-transform: uppercase; margin-bottom: 15px; text-align: left;">Section C: Importance Choice</div>
        
        <div class="edexcel-question-container" style="margin-bottom: 30px; text-align: left;">
          <div class="edexcel-question-header" style="font-weight: bold; font-size: 11.5pt; margin-bottom: 12px; display: flex; justify-content: space-between;">
            <span>Question 3: Explain two of the following:</span>
            <span class="edexcel-question-marks" style="font-weight: bold; font-size: 11pt; margin-left: 15px;">(16 marks total)</span>
          </div>

          <div style="margin: 15px 0 25px 0; border: 1.5px solid #000000; padding: 15px; line-height: 1.6; font-size: 10.5pt;">
            ${compiled.q3.map(c => `<strong>Q3(${c.letter}):</strong> ${c.title}<br>`).join('<div style="height: 8px;"></div>')}
          </div>

          <p style="font-size: 9pt; font-weight: bold; color: #ef4444; text-transform: uppercase; margin-bottom: 10px;">
            INDICATE WHICH QUESTIONS YOU ARE ANSWERING BELOW:
          </p>
          <div style="margin-bottom: 20px; font-size: 10pt;">
            <span>I am answering: </span>
            <label style="margin-right: 15px;"><input type="checkbox"> Option Q3(a)</label>
            <label style="margin-right: 15px;"><input type="checkbox"> Option Q3(b)</label>
            <label style="margin-right: 15px;"><input type="checkbox"> Option Q3(c)</label>
          </div>

          ${generateLinesHtml(compiled.lineDensity)}
        </div>
        <div class="print-page-footer" style="position: absolute; bottom: 10px; left: 20px; right: 20px; font-size: 8pt; color: #555555; border-top: 1px solid #cccccc; padding-top: 4px; text-align: center;">Page 4</div>
      </div>
    `;
  }

  // Page 5: Mark Scheme/Model Answers
  if (compiled.includeAnswers) {
    html += `
      <div class="print-page" style="padding: 20px;">
        <div class="print-page-header" style="font-size: 8.5pt; color: #555555; border-bottom: 1px solid #cccccc; padding-bottom: 4px; margin-bottom: 20px; display: flex; justify-content: space-between;">
          <span>${compiled.title}</span>
          <span>Educator Mark Scheme</span>
        </div>
        <div class="edexcel-section-title" style="font-size: 14pt; font-weight: bold; text-transform: uppercase; margin-bottom: 15px; text-align: left;">Teacher Mark Scheme &amp; Model Answers</div>
        <p style="font-size: 9pt; color: #555555; margin-bottom: 20px; text-align: left;">
          This section contains Level 7-9 model responses and key vocabulary markers to guide grading and student feedback.
        </p>

        <!-- Q1 Answers -->
        ${compiled.q1 ? `
        <div style="margin-bottom: 20px; border-bottom: 1px solid #dddddd; padding-bottom: 15px; text-align: left;">
          <h4 style="margin: 0 0 8px 0; font-size: 11pt; color: #1f2937;">Question 1 Model Answers</h4>
          ${compiled.q1.subQuestions ? compiled.q1.subQuestions.map((sq, idx) => `
            <div style="margin-bottom: 10px;">
              <strong>Q1(${idx === 0 ? 'a' : 'b'}):</strong> ${sq.question}
              <div class="model-answer-section" style="background: #f9fafb; border-left: 3px solid #10b981; padding: 10px; margin-top: 6px; font-size: 9.5pt;">${sq.model}</div>
            </div>
          `).join('') : `
            <div class="model-answer-section" style="background: #f9fafb; border-left: 3px solid #10b981; padding: 10px; font-size: 9.5pt;">${compiled.q1.model}</div>
          `}
        </div>` : ''}

        <!-- Q2 Answers -->
        ${compiled.q2 ? `
        <div style="margin-bottom: 20px; border-bottom: 1px solid #dddddd; padding-bottom: 15px; text-align: left;">
          <h4 style="margin: 0 0 8px 0; font-size: 11pt; color: #1f2937;">Question 2 Model Answer</h4>
          <div class="model-answer-section" style="background: #f9fafb; border-left: 3px solid #10b981; padding: 10px; font-size: 9.5pt;">${compiled.q2.model}</div>
        </div>` : ''}

        <!-- Q3 Answers -->
        ${compiled.q3 && compiled.q3.length > 0 ? `
        <div style="margin-bottom: 20px; text-align: left;">
          <h4 style="margin: 0 0 8px 0; font-size: 11pt; color: #1f2937;">Question 3 Choice Model Answers</h4>
          ${compiled.q3.map(c => `
            <div style="margin-bottom: 10px;">
              <strong>Option Q3(${c.letter}):</strong> ${c.title}
              <div class="model-answer-section" style="background: #f9fafb; border-left: 3px solid #10b981; padding: 10px; margin-top: 6px; font-size: 9.5pt;">${c.model}</div>
            </div>
          `).join('')}
        </div>` : ''}
      </div>
    `;
  }

  html += `</div>`;
  return html;
}

function generateLinesHtml(lineCount) {
  if (lineCount <= 0) return '';
  let lines = '<div class="edexcel-writing-lines" style="margin-top: 15px;">';
  for (let i = 0; i < lineCount; i++) {
    lines += '<div class="edexcel-writing-line" style="border-bottom: 1px dashed #777777; height: 32px; width: 100%;"></div>';
  }
  lines += '</div>';
  return lines;
}

export function initBulkWorkbookCreator() {
  const btnPrint = document.getElementById('btn-bulk-workbook-print');
  const btnWord = document.getElementById('btn-bulk-workbook-word');

  if (btnPrint) {
    btnPrint.addEventListener('click', async () => {
      const style = document.getElementById('bulk-workbook-style').value;
      const density = 'comfortable';
      const answers = document.getElementById('bulk-workbook-answers').value;
      
      AudioEngine.play('click');
      
      const html = await window.generateBulkWorkbookHtml(style, density, answers === 'yes');
      
      const newWin = window.open();
      if (newWin) {
        newWin.document.write(html);
        newWin.document.close();
      } else {
        alert("Pop-up blocker prevented opening the bulk worksheets. Please allow popups for this site.");
      }
    });
  }

  if (btnWord) {
    btnWord.addEventListener('click', async () => {
      const style = document.getElementById('bulk-workbook-style').value;
      const density = 'comfortable';
      const answers = document.getElementById('bulk-workbook-answers').value;
      
      AudioEngine.play('click');
      
      const html = await window.generateBulkWorkbookHtml(style, density, answers === 'yes');
      const styleLabel = style.charAt(0).toUpperCase() + style.slice(1);
      
      downloadHtmlAsWord(`Course_Worksheet_Pack_All_Lessons_${styleLabel}.doc`, html);
      AudioEngine.play('success');
    });
  }
}

export function initWarQuizCreator() {
  const btnPrint = document.getElementById('btn-war-quiz-print');
  const btnWord = document.getElementById('btn-war-quiz-word');

  if (btnPrint) {
    btnPrint.addEventListener('click', async () => {
      const warId = document.getElementById('war-quiz-select').value;
      const density = document.getElementById('war-quiz-density').value;
      const answers = document.getElementById('war-quiz-answers').value;
      
      AudioEngine.play('click');
      
      const html = await window.generateWarWorkbookHtml(warId, density, answers === 'yes');
      
      const printArea = document.getElementById('print-area');
      if (printArea) {
        printArea.innerHTML = html;
        setTimeout(() => {
          window.print();
        }, 150);
        AudioEngine.play('success');
      }
    });
  }

  if (btnWord) {
    btnWord.addEventListener('click', async () => {
      const warId = document.getElementById('war-quiz-select').value;
      const density = document.getElementById('war-quiz-density').value;
      const answers = document.getElementById('war-quiz-answers').value;
      
      AudioEngine.play('click');
      
      const html = await window.generateWarWorkbookHtml(warId, density, answers === 'yes');
      const warNames = {
        '1948_1949': '1948-49_Arab-Israeli_War',
        '1956_suez': '1956_Suez_Crisis',
        '1967_sixday': '1967_Six-Day_War',
        '1973_yomkippur': '1973_Yom_Kippur_War',
        '1982_lebanon': '1982_Lebanon_War'
      };
      const fileName = `War_Quiz_${warNames[warId] || warId}.doc`;
      downloadHtmlAsWord(fileName, html);
      AudioEngine.play('success');
    });
  }
}

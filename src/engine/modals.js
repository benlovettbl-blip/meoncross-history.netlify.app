import { appStore } from './store.js';
import {
  renderLesson,
  assignQuestionNumbers,
  getGoldenSentenceExemplar,
} from './lesson_renderer.js';
import { getAssetUrl } from './assets.js';
import { WORKBOOK_PAGE_MAP, getWorkbookPageAnchor } from './workbook_page_map.js';

window.WORKBOOK_PAGE_MAP = WORKBOOK_PAGE_MAP;
window.getWorkbookPageAnchor = getWorkbookPageAnchor;

let glossaryPopover = null;
let activeVocabElement = null;

export function openCurriculumModal() {
  let modal = document.getElementById('curriculum-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'curriculum-modal';
    modal.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;';

    const content = document.createElement('div');
    content.style.cssText =
      'background:#ffffff;padding:30px;border-radius:12px;width:90%;max-width:500px;color:#333333;box-shadow:0 10px 25px rgba(0,0,0,0.2);';

    content.innerHTML = `
        <h2 style="margin-top:0"><i class="fa-solid fa-clock-rotate-left"></i> Prior Knowledge Setup</h2>
        <p style="opacity:0.8;font-size:0.95rem;">Select the units your class has already been taught. The app will dynamically generate "PAST TOPIC" Do Now retrieval questions from these units.</p>
        <div id="unit-checkboxes" style="display:flex;flex-direction:column;gap:12px;margin:25px 0;">
        </div>
        <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;">
          <button id="close-curriculum" class="btn-pedagogy-primary">Save & Close</button>
        </div>
      `;
    modal.appendChild(content);
    document.body.appendChild(modal);

    const availableUnits = [
      { id: 'norman_conquest', title: 'The Norman Conquest' },
      { id: 'water_and_sanitation', title: 'Water & Health Through Time' },
      { id: 'change_1450_1750', title: 'Change 1450-1750 (Tudors)' },
    ];

    const container = content.querySelector('#unit-checkboxes');
    const taught = JSON.parse(localStorage.getItem('taughtUnits') || '[]');

    availableUnits.forEach((u) => {
      const label = document.createElement('label');
      label.style.display = 'flex';
      label.style.alignItems = 'center';
      label.style.gap = '10px';
      label.style.cursor = 'pointer';
      label.style.fontSize = '1.1rem';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = u.id;
      checkbox.style.width = '20px';
      checkbox.style.height = '20px';
      checkbox.checked = taught.includes(u.id);
      checkbox.addEventListener('change', () => {
        let current = JSON.parse(localStorage.getItem('taughtUnits') || '[]');
        if (checkbox.checked) current.push(u.id);
        else current = current.filter((id) => id !== u.id);
        localStorage.setItem('taughtUnits', JSON.stringify([...new Set(current)]));
      });
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(u.title));
      container.appendChild(label);
    });

    content.querySelector('#close-curriculum').addEventListener('click', () => {
      document.body.removeChild(modal);
      // Refresh page to apply new Do Nows if we are currently looking at one
      location.reload();
    });
  }
}

export function openTaskWhiteboard() {
  let modal = document.getElementById('task-whiteboard-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'task-whiteboard-modal';
    modal.innerHTML = `
      <div class="whiteboard-header">
        <div>
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; color: #0f172a; font-size: 1.8rem;">
            <i class="fa-solid fa-person-chalkboard" style="color: #0284c7; margin-right: 10px;"></i> Task Whiteboard · Live Marking
          </h2>
          <p style="margin: 4px 0 0 0; color: #64748b; font-size: 0.95rem;">
            Click or tap any question card to reveal the model answer for whole-class review.
          </p>
        </div>
        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <button class="btn" data-action="open-vocab-whiteboard" id="wb-launch-mwb-btn" style="padding: 8px 16px; font-size: 0.9rem; font-weight: 700; cursor: pointer; background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%); color: white; border: 1.5px solid #818cf8; border-radius: 6px; box-shadow: 0 2px 6px rgba(79, 70, 229, 0.3); display: inline-flex; align-items: center; gap: 7px; transition: all 0.2s ease;" title="Launch Fullscreen Starter Drill for smartboard projection">
            <i class="fa-solid fa-chalkboard-user"></i> Starter Prompt Overlay
          </button>
          <button class="btn" data-action="reveal-all-wb-answers" id="wb-reveal-all-btn" style="padding: 8px 16px; font-size: 0.9rem; font-weight: 600; cursor: pointer; background: #0284c7; color: white; border: none; border-radius: 6px; box-shadow: 0 2px 4px rgba(2, 132, 199, 0.25); display: inline-flex; align-items: center; gap: 7px; transition: all 0.2s ease;">
            <i class="fa-solid fa-eye"></i> Reveal All Answers <span style="background: rgba(255,255,255,0.25); padding: 1px 6px; border-radius: 4px; font-size: 0.75rem; font-family: monospace;">A</span>
          </button>
          <button class="btn btn-secondary" data-action="close-task-whiteboard" style="padding: 8px 16px; font-size: 0.9rem; cursor: pointer;">
            <i class="fa-solid fa-times"></i> Close
          </button>
        </div>
      </div>
      <div class="whiteboard-content" id="whiteboard-questions-container"></div>
    `;
    document.body.appendChild(modal);
  }

  const container = document.getElementById('whiteboard-questions-container');
  container.innerHTML = '';

  const activeLesson = window.currentActiveLesson || appStore.state.activeUnitData.lessons[0];
  const unitId =
    (activeLesson && activeLesson.unitId) ||
    window.currentUnitId ||
    (appStore && appStore.state && appStore.state.selectedUnitId) ||
    (appStore &&
      appStore.state &&
      appStore.state.activeUnitData &&
      appStore.state.activeUnitData.id);

  assignQuestionNumbers(activeLesson, unitId);

  let html = '';
  const cards = [];

  const addQuestionCard = (qNum, questionText, answerText) => {
    if (typeof questionText === 'object' && questionText !== null) {
      questionText = questionText.text || questionText.question || questionText.prompt || '';
    }
    if (typeof questionText !== 'string' || !questionText.trim()) return;
    cards.push({ qNum, questionText: questionText.trim(), answerText: answerText || '' });
  };

  if (activeLesson.vocab && Array.isArray(activeLesson.vocab) && activeLesson.vocab.length > 0) {
    let currentLessonIdx = 0;
    const unitDataObj =
      (appStore && appStore.state && appStore.state.activeUnitData) || window.unitData;
    if (unitDataObj && Array.isArray(unitDataObj.lessons)) {
      currentLessonIdx = unitDataObj.lessons.findIndex(
        (l) => l.id === activeLesson.id || l.title === activeLesson.title,
      );
      if (currentLessonIdx === -1) currentLessonIdx = 0;
    }
    const vocabStyle = currentLessonIdx % 4;
    const termsList = activeLesson.vocab.map((v) => (v.term || '').trim()).filter(Boolean);
    const termsBadges = termsList
      .map(
        (t) =>
          `<span style="display:inline-block; padding:2px 8px; margin:2px 4px; background:#e0e7ff; color:#3730a3; border-radius:10px; font-weight:600; font-size:0.85rem;">${t}</span>`,
      )
      .join(' ');

    let challengeTitle = '';
    let challengePrompt = '';
    let modelAnswer = '';

    if (vocabStyle === 0) {
      challengeTitle = 'The Odd One Out';
      challengePrompt = `Identify <strong>ONE</strong> term that does not belong with the others.<br><strong>Explain your reasoning:</strong> What historical connection links the other terms, and why is your chosen term different?<br><div style="margin-top:6px;"><strong>Word Bank:</strong> ${termsBadges}</div>`;
      modelAnswer = `Pupils should categorize terms by conceptual theme (e.g. status vs power vs doctrine). Any choice justified with specific historical evidence from the lesson is creditworthy.`;
    } else if (vocabStyle === 1) {
      challengeTitle = 'The Golden Sentence';
      challengePrompt = `Select <strong>TWO</strong> vocabulary terms. Write <strong>ONE</strong> sophisticated sentence connecting them using <strong>because</strong>, <strong>although</strong>, or <strong>consequently</strong>.<br><div style="margin-top:6px;"><strong>Word Bank:</strong> ${termsBadges}</div>`;
      const exemplar =
        typeof window.getGoldenSentenceExemplar === 'function'
          ? window.getGoldenSentenceExemplar(activeLesson, termsList)
          : `Although ${termsList[0]} played a pivotal role, ${termsList[1]} proved equally critical because it fundamentally altered the long-term balance of power.`;
      modelAnswer = `<strong>Model Golden Sentence:</strong> "${exemplar}"`;
    } else if (vocabStyle === 2) {
      challengeTitle = 'Conceptual Binary Sort';
      challengePrompt = `Sort the 6 vocabulary terms into two columns: <strong>[Power, Governance & Warfare]</strong> vs <strong>[Economy, Trade & Society]</strong>.<br><div style="margin-top:6px;"><strong>Word Bank:</strong> ${termsBadges}</div>`;
      modelAnswer = `Ensure terms relating to state authority and conflict are separated from civilian, economic, and cultural developments. Discuss any terms that bridge both categories.`;
    } else {
      challengeTitle = 'Spot the Deliberate Error!';
      const errStmt =
        activeLesson.vocab_deliberate_error ||
        `A historical commentator claimed that ${termsList[0] || 'key concepts'} had zero effect on the outcome of this era.`;
      challengePrompt = `Identify the misconception in this historical statement: <em style="color:#b91c1c;">"${errStmt}"</em>. Write the accurate historical correction in your workbook!<br><div style="margin-top:6px;"><strong>Word Bank:</strong> ${termsBadges}</div>`;
      modelAnswer = `<strong>Historical Correction:</strong> The claim is historically false. Pupils should contrast this misconception with specific factual evidence from the lesson narrative.`;
    }

    addQuestionCard(
      'Vocabulary Starter',
      `<strong>[${challengeTitle}]</strong> ${challengePrompt}`,
      modelAnswer,
    );
  }

  if (activeLesson.do_now) {
    if (activeLesson.do_now.type === 'timeline' && activeLesson.do_now.prediction_question) {
      addQuestionCard(
        'Do Now',
        activeLesson.do_now.prediction_question,
        activeLesson.do_now.model || activeLesson.do_now.answer || '',
      );
    } else if (activeLesson.do_now.type === 'questions') {
      activeLesson.do_now.items.forEach((item) => {
        addQuestionCard('Do Now', item.question, item.answer || '');
      });
    }
  }

  if (activeLesson.primary_source && activeLesson.primary_source.question) {
    addQuestionCard(
      activeLesson.primary_source.qNum,
      activeLesson.primary_source.question,
      activeLesson.primary_source.model_answer || '',
    );
  }

  if (activeLesson.sources) {
    activeLesson.sources.forEach((source) => {
      if (source.question && source.qNum) {
        addQuestionCard(source.qNum, source.question, source.model_answer || '');
      }
    });
  }

  if (activeLesson.narrative_blocks) {
    activeLesson.narrative_blocks.forEach((block) => {
      if (block.source && block.source.question) {
        addQuestionCard(block.source.qNum, block.source.question, block.source.model_answer || '');
      }
      if (block.tasks) {
        block.tasks.forEach((task) => {
          if (task.type !== 'vocab_match') {
            addQuestionCard(
              task.qNum,
              task.text || task.question || '',
              task.model || task.model_answer || '',
            );
          }
        });
      }
      if (block.hinge_question) {
        const hq = block.hinge_question;
        const qText = typeof hq === 'string' ? hq : hq.text || hq.question || hq.prompt || '';
        if (qText) {
          let aText = hq.model_answer || hq.model || hq.answer || '';
          if (!aText && Array.isArray(hq.options)) {
            const cIdx =
              typeof hq.correct_index === 'number'
                ? hq.correct_index
                : typeof hq.answer === 'number'
                  ? hq.answer
                  : -1;
            if (cIdx >= 0 && hq.options[cIdx]) {
              aText = `<strong>Correct Answer:</strong> Option ${String.fromCharCode(65 + cIdx)}: ${hq.options[cIdx]}`;
              if (hq.explanation) {
                aText += `<br><br><strong>Explanation:</strong> ${hq.explanation}`;
              }
            }
          }
          addQuestionCard(
            hq.qNum || 'Hinge Question',
            qText,
            aText || 'Formative checkpoint question for class discussion.',
          );
        }
      }
    });
  }

  if (activeLesson.pair_share && activeLesson.pair_share.prompt) {
    addQuestionCard(
      activeLesson.pair_share.qNum,
      activeLesson.pair_share.prompt,
      'Discuss in pairs.',
    );
  }

  if (activeLesson.tasks) {
    activeLesson.tasks.forEach((task) => {
      addQuestionCard(
        task.qNum,
        task.text || task.question || '',
        task.model || task.model_answer || '',
      );
    });
  }

  if (activeLesson.extended && activeLesson.extended.question) {
    addQuestionCard(
      activeLesson.extended.qNum,
      activeLesson.extended.question,
      activeLesson.extended.model_answer || '',
    );
  }

  if (
    activeLesson.gcse_task &&
    (activeLesson.gcse_task.question || activeLesson.gcse_task.prompt)
  ) {
    addQuestionCard(
      activeLesson.gcse_task.qNum,
      activeLesson.gcse_task.question || activeLesson.gcse_task.prompt,
      activeLesson.gcse_task.model_answer || '',
    );
  }

  if (activeLesson.debate_prep) {
    addQuestionCard(
      '-',
      `Debate Prep: ${activeLesson.debate_prep.question}`,
      `<strong>Agree:</strong><ul>${activeLesson.debate_prep.arguments_for.map((a) => `<li>${a}</li>`).join('')}</ul><strong>Disagree:</strong><ul>${activeLesson.debate_prep.arguments_against.map((a) => `<li>${a}</li>`).join('')}</ul>`,
    );
  }

  // Sort cards: Vocabulary Starter first, then Do Now, then numerically by assigned qNum, then unnumbered
  cards.sort((a, b) => {
    if (a.qNum === 'Vocabulary Starter') return -1;
    if (b.qNum === 'Vocabulary Starter') return 1;
    if (a.qNum === 'Do Now') return -1;
    if (b.qNum === 'Do Now') return 1;
    if (typeof a.qNum === 'number' && typeof b.qNum === 'number') return a.qNum - b.qNum;
    if (typeof a.qNum === 'number') return -1;
    if (typeof b.qNum === 'number') return 1;
    return 0;
  });

  cards.forEach(({ qNum, questionText, answerText }) => {
    const finalAnswer =
      (typeof window.formatBold === 'function' ? window.formatBold(answerText) : answerText) ||
      'Model answer to be discussed in class.';
    const prefix =
      typeof qNum === 'number'
        ? `Q${qNum}. `
        : qNum === 'Vocabulary Starter'
          ? '<strong>[Vocabulary Starter]</strong> '
          : qNum === 'Do Now'
            ? '<strong>[Do Now]</strong> '
            : qNum === 'Hinge Question'
              ? '<strong>[Hinge Question]</strong> '
              : qNum && qNum !== '-'
                ? `<strong>[${qNum}]</strong> `
                : '';
    html += `
        <div class="wb-question-card" style="cursor:pointer;" data-action="toggle-wb-answer" title="Click to reveal answer">
          <div style="font-weight: bold;">${prefix}${questionText}</div>
          <div class="wb-answer">${finalAnswer}</div>
        </div>
      `;
  });

  container.innerHTML = html;
  modal.classList.add('visible');

  // Teacher Quick-Toggle keyboard shortcuts: 'A' to toggle all answers, 'Escape' to close
  if (!window._wbKeyHandlerAttached) {
    window._wbKeyHandlerAttached = true;
    window.addEventListener('keydown', (e) => {
      const wbModal = document.getElementById('task-whiteboard-modal');
      if (!wbModal || !wbModal.classList.contains('visible')) return;
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === 'a' || e.key === 'A') {
        const toggleBtn = wbModal.querySelector('[data-action="reveal-all-wb-answers"]');
        if (toggleBtn) toggleBtn.click();
      } else if (e.key === 'Escape') {
        wbModal.classList.remove('visible');
      }
    });
  }
}

window.openTaskWhiteboard = openTaskWhiteboard;

let _mwbTimerInterval = null;
let _mwbTimerSeconds = 120;
let _mwbTimerRunning = false;

export function openVocabWhiteboardModal(customLesson) {
  let modal = document.getElementById('vocab-whiteboard-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'vocab-whiteboard-modal';
    document.body.appendChild(modal);
  }

  const activeLesson =
    customLesson ||
    window.currentActiveLesson ||
    (appStore &&
      appStore.state &&
      appStore.state.activeUnitData &&
      appStore.state.activeUnitData.lessons &&
      appStore.state.activeUnitData.lessons[0]) ||
    (window.unitData && window.unitData.lessons && window.unitData.lessons[0]);

  if (!activeLesson) return;

  const unitDataObj =
    (appStore && appStore.state && appStore.state.activeUnitData) || window.unitData;
  let currentLessonIdx = 0;
  if (unitDataObj && Array.isArray(unitDataObj.lessons)) {
    currentLessonIdx = unitDataObj.lessons.findIndex((l) =>
      l.id && activeLesson.id ? l.id === activeLesson.id : l.title === activeLesson.title,
    );
    if (currentLessonIdx === -1) currentLessonIdx = 0;
  }
  const currentUnitId =
    (appStore && appStore.state && appStore.state.currentUnitId) ||
    window.currentUnitId ||
    (unitDataObj && unitDataObj.id) ||
    '';
  const pageAnchor = getWorkbookPageAnchor(currentUnitId, activeLesson, currentLessonIdx);
  const vocabStyle = currentLessonIdx % 4;
  const termsList = (activeLesson.vocab || []).map((v) => (v.term || '').trim()).filter(Boolean);

  let styleBadge = '';
  let challengeTitle = '';
  let challengePromptHtml = '';
  let modelAnswerHtml = '';

  if (vocabStyle === 0) {
    styleBadge = 'Style 0 · Conceptual Categorisation';
    challengeTitle = 'THE ODD ONE OUT';
    challengePromptHtml = `
      <div style="font-size: 1.5rem; line-height: 1.6; color: #f8fafc; font-weight: 500;">
        Identify <strong style="color: #f87171;">ONE</strong> term that does not belong with the others.<br>
        <span style="font-size: 1.25rem; color: #cbd5e1;"><strong>Explain your reasoning:</strong> What historical connection links the other terms, and why is your chosen term different?</span>
      </div>
      <div style="font-size: 1.15rem; color: #94a3b8; margin-top: 12px; font-style: italic;">
        Write your chosen word and a rigorous historical justification in your workbook!
      </div>
    `;
    const oddExemplars = window.getOddOneOutExemplars
      ? window.getOddOneOutExemplars(activeLesson, termsList)
      : [];
    modelAnswerHtml = `
      <div style="font-size: 1.35rem; font-weight: 700; color: #ca8a04; margin-bottom: 8px;">
        <i class="fa-solid fa-star" style="color: #eab308;"></i> High-Tariff Discussion Exemplars
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${oddExemplars
          .map(
            (ex, idx) => `
          <div style="background: rgba(255, 255, 255, 0.95); border: 1.5px solid #fde047; border-radius: 8px; padding: 10px 14px; text-align: left;">
            <div style="font-size: 0.9rem; font-weight: 800; color: #b45309; text-transform: uppercase;">
              Option ${String.fromCharCode(65 + idx)}: ${ex.title || 'Historical Link'}
            </div>
            <div style="font-size: 1.1rem; color: #1e293b; margin: 3px 0;">
              <strong>Trio:</strong> ${Array.isArray(ex.trio) ? ex.trio.join(', ') : ex.trio} · <strong>Odd One Out:</strong> <span style="color: #b91c1c; font-weight: 800; background: #fee2e2; padding: 1px 6px; border-radius: 4px;">${ex.odd}</span>
            </div>
            <div style="font-size: 1rem; color: #334155;">
              <strong>Why:</strong> ${ex.reason}
            </div>
          </div>
        `,
          )
          .join('')}
      </div>
    `;
  } else if (vocabStyle === 1) {
    styleBadge = 'Style 1 · Syntactic Precision';
    challengeTitle = 'THE GOLDEN SENTENCE';
    challengePromptHtml = `
      <div style="font-size: 1.5rem; line-height: 1.6; color: #f8fafc; font-weight: 500;">
        Choose <strong style="color: #fbbf24;">TWO</strong> vocabulary terms from the word bank. Write <strong style="color: #38bdf8;">ONE</strong> grammatically sophisticated historical sentence in your workbook using:
      </div>
      <div style="display: flex; gap: 15px; margin-top: 14px; flex-wrap: wrap;">
        <span style="background: rgba(245, 158, 11, 0.25); border: 2px solid #f59e0b; color: #fef08a; padding: 6px 18px; border-radius: 8px; font-weight: 800; font-size: 1.25rem; letter-spacing: 1px;">BECAUSE</span>
        <span style="background: rgba(245, 158, 11, 0.25); border: 2px solid #f59e0b; color: #fef08a; padding: 6px 18px; border-radius: 8px; font-weight: 800; font-size: 1.25rem; letter-spacing: 1px;">ALTHOUGH</span>
        <span style="background: rgba(245, 158, 11, 0.25); border: 2px solid #f59e0b; color: #fef08a; padding: 6px 18px; border-radius: 8px; font-weight: 800; font-size: 1.25rem; letter-spacing: 1px;">CONSEQUENTLY</span>
      </div>
    `;
    const goldenExemplar = getGoldenSentenceExemplar(activeLesson, termsList);
    modelAnswerHtml = `
      <div style="font-size: 1.35rem; font-weight: 700; color: #ca8a04; margin-bottom: 8px;">
        <i class="fa-solid fa-star" style="color: #eab308;"></i> Model Golden Sentence
      </div>
      <div style="font-size: 1.35rem; font-family: 'Playfair Display', Georgia, serif; line-height: 1.6; color: #0f172a; font-style: italic;">
        "${goldenExemplar}"
      </div>
      <div style="font-size: 0.95rem; color: #78350f; margin-top: 8px;">
        <strong>Examiner Insight:</strong> High-tariff syntax directly models Edexcel/AQA causal analytical writing.
      </div>
    `;
  } else if (vocabStyle === 2) {
    styleBadge = 'Style 2 · Structural Categorisation';
    challengeTitle = 'CONCEPTUAL BINARY SORT';
    challengePromptHtml = `
      <div style="font-size: 1.5rem; line-height: 1.6; color: #f8fafc; font-weight: 500;">
        Divide your workbook page into <strong style="color: #4ade80;">TWO COLUMNS</strong>:
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 16px;">
        <div style="background: rgba(59, 130, 246, 0.15); border: 2px solid #3b82f6; border-radius: 10px; padding: 14px; text-align: center;">
          <div style="font-size: 1.25rem; font-weight: 800; color: #93c5fd; text-transform: uppercase;">Column A: Power, Governance & Warfare</div>
        </div>
        <div style="background: rgba(34, 197, 94, 0.15); border: 2px solid #22c55e; border-radius: 10px; padding: 14px; text-align: center;">
          <div style="font-size: 1.25rem; font-weight: 800; color: #86efac; text-transform: uppercase;">Column B: Economy, Trade & Society</div>
        </div>
      </div>
      <div style="font-size: 1.2rem; color: #cbd5e1; margin-top: 14px;">
        Sort all 6 words from the bank above into the correct column in your workbook!
      </div>
    `;
    modelAnswerHtml = `
      <div style="font-size: 1.35rem; font-weight: 700; color: #ca8a04; margin-bottom: 8px;">
        <i class="fa-solid fa-star" style="color: #eab308;"></i> Model Categorisation Discussion
      </div>
      <div style="font-size: 1.15rem; line-height: 1.6; color: #1e293b;">
        Ask pupils to defend terms that have dual characteristics (e.g. warfare funded by economic taxes, or social rebellions challenging royal power).
      </div>
    `;
  } else {
    styleBadge = 'Style 3 · Critical Reading & Misconceptions';
    challengeTitle = 'SPOT THE DELIBERATE ERROR!';
    const errStmt =
      activeLesson.vocab_deliberate_error ||
      `A modern historical commentator claimed that ${termsList[0] || 'the main concept'} and ${termsList[1] || 'the event'} were completely trivial, playing no role in shaping the political outcome of this era.`;
    challengePromptHtml = `
      <div style="font-size: 1.35rem; color: #f8fafc; font-weight: 500; margin-bottom: 12px;">
        The statement below contains a <strong style="color: #f87171;">deliberate historical misconception</strong>:
      </div>
      <div style="font-size: 1.45rem; line-height: 1.6; color: #fecaca; background: rgba(239, 68, 68, 0.15); border-left: 6px solid #ef4444; border-radius: 0 10px 10px 0; padding: 18px 24px; font-style: italic; font-family: 'Playfair Display', Georgia, serif;">
        "${errStmt}"
      </div>
      <div style="font-size: 1.25rem; color: #cbd5e1; margin-top: 14px;">
        Spot the deliberate error! Write the <strong>accurate historical correction</strong> in your workbook.
      </div>
    `;
    modelAnswerHtml = `
      <div style="font-size: 1.35rem; font-weight: 700; color: #ca8a04; margin-bottom: 8px;">
        <i class="fa-solid fa-star" style="color: #eab308;"></i> Accurate Historical Reality
      </div>
      <div style="font-size: 1.2rem; line-height: 1.6; color: #1e293b;">
        Historians must challenge reductive claims. The statement distorts the historical reality by ignoring primary evidence from the period. Pupils must state the factual correction with evidence from today's lesson.
      </div>
    `;
  }

  // Reset timer
  _mwbTimerSeconds = 120;
  _mwbTimerRunning = false;
  if (_mwbTimerInterval) clearInterval(_mwbTimerInterval);

  modal.innerHTML = `
    <div class="mwb-container">
      <!-- Presentation Top Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(255,255,255,0.15); padding-bottom: 18px; margin-bottom: 25px; flex-wrap: wrap; gap: 15px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <span style="background: rgba(99, 102, 241, 0.25); color: #a5b4fc; border: 1.5px solid #6366f1; padding: 4px 12px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
              <i class="fa-solid fa-chalkboard-user"></i> Starter Prompt Overlay
            </span>
            <span style="background: rgba(255, 255, 255, 0.1); color: #cbd5e1; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
              ${styleBadge}
            </span>
            ${
              pageAnchor
                ? `
              <span class="mwb-page-anchor-pill" style="background: rgba(14, 165, 233, 0.25); color: #7dd3fc; border: 1.5px solid #0284c7; padding: 4px 12px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-book-open" style="color: #38bdf8;"></i> ${pageAnchor.label}
              </span>
            `
                : ''
            }
          </div>
          <div style="display: flex; align-items: baseline; flex-wrap: wrap; gap: 16px; margin-top: 8px;">
            <h1 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; margin: 0; color: #ffffff; letter-spacing: 0.5px; display: inline-block;">
              ${activeLesson.title}
            </h1>
            ${
              pageAnchor
                ? `
              <span class="wb-page-anchor-tag" style="display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 5px 14px; border-radius: 8px; font-size: 1.15rem; font-weight: 700; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4); border: 1.5px solid #38bdf8; vertical-align: middle;">
                <i class="fa-solid fa-book-open" style="color: #7dd3fc;"></i> ${pageAnchor.label}
              </span>
            `
                : ''
            }
          </div>
        </div>

        <!-- Timer & Quick Actions -->
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px; background: rgba(15,23,42,0.6); padding: 6px 12px; border-radius: 10px; border: 1.5px solid rgba(255,255,255,0.15);">
            <div id="mwb-clock" class="mwb-timer-display">02:00</div>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <button id="mwb-btn-play" onclick="window.toggleMwbTimer()" style="background: #0284c7; color: white; border: none; border-radius: 4px; padding: 4px 10px; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: all 0.15s;" title="Start/Pause Timer (Space)">
                <i class="fa-solid fa-play" id="mwb-play-icon"></i> Start
              </button>
              <button onclick="window.resetMwbTimer()" style="background: rgba(255,255,255,0.15); color: #cbd5e1; border: none; border-radius: 4px; padding: 4px 10px; font-size: 0.8rem; cursor: pointer; transition: all 0.15s;" title="Reset Timer">
                <i class="fa-solid fa-rotate-left"></i>
              </button>
            </div>
            <button onclick="window.adjustMwbTimer(30)" style="background: rgba(255,255,255,0.15); color: #cbd5e1; border: none; border-radius: 4px; padding: 6px 10px; font-size: 0.85rem; font-weight: 700; cursor: pointer; height: 100%;" title="Add 30 seconds">
              +30s
            </button>
          </div>

          <button id="mwb-toggle-exemplar-btn" onclick="window.toggleVocabWbExemplar()" style="padding: 10px 18px; font-size: 0.95rem; font-weight: 700; cursor: pointer; background: #eab308; color: #713f12; border: 1.5px solid #facc15; border-radius: 8px; box-shadow: 0 4px 14px rgba(234, 179, 8, 0.3); display: inline-flex; align-items: center; gap: 8px; transition: all 0.15s;" title="Show/Hide Model Answer (Press A)">
            <i class="fa-solid fa-eye" id="mwb-eye-icon"></i> Show Model Answer <span style="background: rgba(0,0,0,0.12); padding: 1px 6px; border-radius: 4px; font-size: 0.75rem; font-family: monospace;">A</span>
          </button>

          <button onclick="window.closeVocabWhiteboardModal()" style="background: rgba(255,255,255,0.1); color: #ffffff; border: 1.5px solid rgba(255,255,255,0.25); padding: 10px 16px; border-radius: 8px; font-size: 0.95rem; cursor: pointer; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s;" title="Exit Whiteboard Overlay (Esc)">
            <i class="fa-solid fa-times"></i> Close
          </button>
        </div>
      </div>

      <!-- Classroom Instructions Banner -->
      <div style="background: linear-gradient(90deg, rgba(79, 70, 229, 0.25) 0%, rgba(14, 165, 233, 0.2) 100%); border: 1.5px solid rgba(129, 140, 248, 0.4); border-radius: 10px; padding: 12px 20px; display: flex; align-items: center; gap: 12px; margin-bottom: 25px;">
        <span style="font-size: 1.6rem;">✍️</span>
        <div style="font-size: 1.15rem; font-weight: 600; color: #e0e7ff;">
          Workbook Task${pageAnchor ? ` (<strong>${pageAnchor.label}</strong>)` : ''}: Write your response clearly in your workbook. When the timer finishes: <strong>"PENS DOWN!"</strong> and be ready to share your answer.
        </div>
      </div>

      <!-- Extra-Large Word Bank Display -->
      <div style="margin-bottom: 30px;">
        <div style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #38bdf8; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-boxes-stacked"></i> Curriculum Vocabulary Word Bank
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          ${termsList
            .map(
              (t) => `
            <div class="mwb-word-chip">
              ${t}
            </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Big Rotating Challenge Box -->
      <div style="background: rgba(255, 255, 255, 0.05); border: 2.5px solid rgba(255, 255, 255, 0.18); border-radius: 14px; padding: 28px 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); margin-bottom: 25px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin: 0; color: #facc15; display: flex; align-items: center; gap: 10px;">
            ${challengeTitle}
          </h2>
        </div>
        ${challengePromptHtml}
      </div>

      <!-- Model Answer / Exemplar Reveal Drawer -->
      <div id="vocab-wb-exemplar-box" style="display: none; background: #fefce8; border: 3px solid #eab308; border-radius: 14px; padding: 24px 30px; box-shadow: 0 12px 35px rgba(234, 179, 8, 0.25); animation: fadeIn 0.3s ease;">
        ${modelAnswerHtml}
      </div>
    </div>
  `;

  modal.classList.add('visible');

  // Key listeners for overlay
  if (!window._mwbKeyHandlerAttached) {
    window._mwbKeyHandlerAttached = true;
    window.addEventListener('keydown', (e) => {
      const mwb = document.getElementById('vocab-whiteboard-modal');
      if (!mwb || !mwb.classList.contains('visible')) return;
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        window.toggleMwbTimer();
      } else if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        window.toggleVocabWbExemplar();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        window.closeVocabWhiteboardModal();
      }
    });
  }
}

export function toggleMwbTimer() {
  const clock = document.getElementById('mwb-clock');
  const btn = document.getElementById('mwb-btn-play');
  const icon = document.getElementById('mwb-play-icon');
  if (!_mwbTimerRunning) {
    _mwbTimerRunning = true;
    if (btn) btn.style.background = '#e11d48';
    if (icon) icon.className = 'fa-solid fa-pause';
    if (btn) btn.innerHTML = '<i class="fa-solid fa-pause" id="mwb-play-icon"></i> Pause';
    _mwbTimerInterval = setInterval(() => {
      if (_mwbTimerSeconds > 0) {
        _mwbTimerSeconds--;
        updateMwbClockDisplay();
      } else {
        clearInterval(_mwbTimerInterval);
        _mwbTimerRunning = false;
        if (btn) btn.style.background = '#0284c7';
        if (btn) btn.innerHTML = '<i class="fa-solid fa-play" id="mwb-play-icon"></i> Start';
        if (clock) {
          clock.style.color = '#ef4444';
          clock.style.borderColor = '#ef4444';
          clock.innerHTML = '00:00 - PENS DOWN!';
        }
      }
    }, 1000);
  } else {
    _mwbTimerRunning = false;
    clearInterval(_mwbTimerInterval);
    if (btn) btn.style.background = '#0284c7';
    if (icon) icon.className = 'fa-solid fa-play';
    if (btn) btn.innerHTML = '<i class="fa-solid fa-play" id="mwb-play-icon"></i> Start';
  }
}

export function resetMwbTimer() {
  if (_mwbTimerInterval) clearInterval(_mwbTimerInterval);
  _mwbTimerRunning = false;
  _mwbTimerSeconds = 120;
  updateMwbClockDisplay();
  const btn = document.getElementById('mwb-btn-play');
  if (btn) {
    btn.style.background = '#0284c7';
    btn.innerHTML = '<i class="fa-solid fa-play" id="mwb-play-icon"></i> Start';
  }
  const clock = document.getElementById('mwb-clock');
  if (clock) {
    clock.style.color = '#38bdf8';
    clock.style.borderColor = '#0284c7';
  }
}

export function adjustMwbTimer(deltaSec) {
  _mwbTimerSeconds = Math.max(10, _mwbTimerSeconds + deltaSec);
  updateMwbClockDisplay();
}

function updateMwbClockDisplay() {
  const clock = document.getElementById('mwb-clock');
  if (!clock) return;
  const mins = Math.floor(_mwbTimerSeconds / 60);
  const secs = _mwbTimerSeconds % 60;
  clock.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function toggleVocabWbExemplar() {
  const box = document.getElementById('vocab-wb-exemplar-box');
  const btn = document.getElementById('mwb-toggle-exemplar-btn');
  if (!box) return;
  const isVis = box.style.display === 'block';
  box.style.display = isVis ? 'none' : 'block';
  if (btn) {
    btn.innerHTML = isVis
      ? '<i class="fa-solid fa-eye" id="mwb-eye-icon"></i> Show Model Answer <span style="background: rgba(0,0,0,0.12); padding: 1px 6px; border-radius: 4px; font-size: 0.75rem; font-family: monospace;">A</span>'
      : '<i class="fa-solid fa-eye-slash" id="mwb-eye-icon"></i> Hide Model Answer <span style="background: rgba(0,0,0,0.12); padding: 1px 6px; border-radius: 4px; font-size: 0.75rem; font-family: monospace;">A</span>';
    btn.style.background = isVis ? '#eab308' : '#ca8a04';
  }
}

export function closeVocabWhiteboardModal() {
  const modal = document.getElementById('vocab-whiteboard-modal');
  if (modal) modal.classList.remove('visible');
  if (_mwbTimerInterval) clearInterval(_mwbTimerInterval);
  _mwbTimerRunning = false;
}

window.openVocabWhiteboardModal = openVocabWhiteboardModal;
window.closeVocabWhiteboardModal = closeVocabWhiteboardModal;
window.toggleMwbTimer = toggleMwbTimer;
window.resetMwbTimer = resetMwbTimer;
window.adjustMwbTimer = adjustMwbTimer;
window.toggleVocabWbExemplar = toggleVocabWbExemplar;

export function initGlossaryPopover() {
  if (!document.getElementById('global-glossary-popover')) {
    glossaryPopover = document.createElement('div');
    glossaryPopover.id = 'global-glossary-popover';
    document.body.appendChild(glossaryPopover);
  } else {
    glossaryPopover = document.getElementById('global-glossary-popover');
  }

  const showPopover = (e) => {
    const target = e.target.closest('.vocab-word');
    if (!target) return;

    const definition = target.getAttribute('data-definition');
    if (!definition) return;

    activeVocabElement = target;
    target.classList.add('active');
    glossaryPopover.innerHTML = `<strong style="color: #60a5fa; display: block; margin-bottom: 4px;">${target.textContent}</strong>${definition}`;
    glossaryPopover.classList.add('visible');

    // Calculate position
    const rect = target.getBoundingClientRect();
    const popoverRect = glossaryPopover.getBoundingClientRect();

    let top = rect.top - popoverRect.height - 10;
    let left = rect.left + rect.width / 2 - popoverRect.width / 2;

    // Boundary detection
    let arrowLeft = '50%';
    glossaryPopover.classList.remove('arrow-top');

    // Top boundary
    if (top < 10) {
      top = rect.bottom + 10;
      glossaryPopover.classList.add('arrow-top');
    }

    // Left boundary
    if (left < 10) {
      const overflow = 10 - left;
      left = 10;
      arrowLeft = `calc(50% - ${overflow}px)`;
    }
    // Right boundary
    else if (left + popoverRect.width > window.innerWidth - 10) {
      const overflow = left + popoverRect.width - (window.innerWidth - 10);
      left = window.innerWidth - 10 - popoverRect.width;
      arrowLeft = `calc(50% + ${overflow}px)`;
    }

    glossaryPopover.style.top = `${top}px`;
    glossaryPopover.style.left = `${left}px`;

    let arrowStyle = document.getElementById('popover-arrow-style');
    if (!arrowStyle) {
      arrowStyle = document.createElement('style');
      arrowStyle.id = 'popover-arrow-style';
      document.head.appendChild(arrowStyle);
    }
    arrowStyle.innerHTML = `#global-glossary-popover::after { left: ${arrowLeft}; }`;
  };

  const hidePopover = (e) => {
    if (glossaryPopover && glossaryPopover.classList.contains('visible')) {
      glossaryPopover.classList.remove('visible');
      if (activeVocabElement) {
        activeVocabElement.classList.remove('active');
        activeVocabElement = null;
      }
    }
  };

  document.body.addEventListener('mouseover', showPopover);
  document.body.addEventListener('mouseout', (e) => {
    if (e.target.closest('.vocab-word')) hidePopover(e);
  });

  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.vocab-word')) {
      if (activeVocabElement === e.target.closest('.vocab-word')) {
        hidePopover(e);
      } else {
        hidePopover(e);
        showPopover(e);
      }
    } else {
      hidePopover(e);
    }
  });

  window.addEventListener('scroll', hidePopover, { passive: true });
  window.addEventListener('resize', hidePopover, { passive: true });
}

// --- Historical Figures Popover Cards ---
let figurePopover = null;
let activeFigureElement = null;

const KNOWN_HISTORICAL_FIGURES = {
  niccolo_barbaro: {
    name: 'Niccolò Barbaro',
    role: 'Venetian Doctor & Merchant',
    lifespan: 'c. 1420 – 1494',
    bio: 'A Venetian eyewitness who kept a detailed daily diary during the 1453 Ottoman siege of Constantinople.',
    image: '/images/individuals/niccol_barbaro.jpg',
  },
  barbaro: {
    name: 'Niccolò Barbaro',
    role: 'Venetian Doctor & Merchant',
    lifespan: 'c. 1420 – 1494',
    bio: 'A Venetian eyewitness who kept a detailed daily diary during the 1453 Ottoman siege of Constantinople.',
    image: '/images/individuals/niccol_barbaro.jpg',
  },
  mehmed_ii: {
    name: 'Sultan Mehmed II',
    role: 'Ottoman Sultan',
    lifespan: '1432 – 1481',
    bio: 'The 21-year-old Ottoman conqueror who captured Constantinople in 1453, transforming it into Istanbul.',
    image: '/images/individuals/sultan_mehmed_ii.jpg',
  },
  sultan_mehmed_ii: {
    name: 'Sultan Mehmed II',
    role: 'Ottoman Sultan',
    lifespan: '1432 – 1481',
    bio: 'The 21-year-old Ottoman conqueror who captured Constantinople in 1453, transforming it into Istanbul.',
    image: '/images/individuals/sultan_mehmed_ii.jpg',
  },
  queen_nanny: {
    name: 'Queen Nanny',
    role: 'Jamaican Maroon Military Leader',
    lifespan: 'c. 1686 – c. 1755',
    bio: 'A brilliant military strategist who led the Maroons in guerrilla warfare, forcing the British to sign a peace treaty in 1739.',
    image: '/images/individuals/queen_nanny_nanny_of_the_maroons.jpg',
  },
  nanny: {
    name: 'Queen Nanny',
    role: 'Jamaican Maroon Military Leader',
    lifespan: 'c. 1686 – c. 1755',
    bio: 'A brilliant military strategist who led the Maroons in guerrilla warfare, forcing the British to sign a peace treaty in 1739.',
    image: '/images/individuals/queen_nanny_nanny_of_the_maroons.jpg',
  },
  mansa_musa: {
    name: 'Mansa Musa',
    role: 'Emperor of Mali',
    lifespan: 'c. 1280 – 1337',
    bio: 'The wealthy ruler of Mali whose 1324 pilgrimage to Mecca displayed West Africa’s colossal gold wealth.',
    image: '/images/individuals/mansa_musa.jpg',
  },
  william_wilberforce: {
    name: 'William Wilberforce',
    role: 'British Politician & Abolitionist',
    lifespan: '1759 – 1833',
    bio: 'A British MP who led the parliamentary campaign to abolish the transatlantic slave trade (1807).',
    image: '/images/william_wilberforce.jpg',
  },
  olaudah_equiano: {
    name: 'Olaudah Equiano',
    role: 'Freed Slave, Author & Abolitionist',
    lifespan: 'c. 1745 – 1797',
    bio: 'A formerly enslaved African whose bestselling 1789 autobiography exposed the horrors of the Middle Passage.',
    image: '/images/equiano.jpg',
  },
};

export function initHistoricalFigurePopover() {
  if (typeof document === 'undefined') return;
  if (!document.getElementById('global-figure-popover')) {
    figurePopover = document.createElement('div');
    figurePopover.id = 'global-figure-popover';
    document.body.appendChild(figurePopover);
  } else {
    figurePopover = document.getElementById('global-figure-popover');
  }

  const showFigurePopover = (e) => {
    const target = e.target.closest('.historical-figure');
    if (!target) return;

    const personKey = (target.getAttribute('data-person') || '').toLowerCase().trim();
    let name = target.getAttribute('data-name') || target.textContent.trim();
    let role = target.getAttribute('data-role') || 'Historical Figure';
    let lifespan = target.getAttribute('data-dates') || target.getAttribute('data-lifespan') || '';
    let bio = target.getAttribute('data-bio') || '';
    let image = target.getAttribute('data-image') || '';

    if (!bio || !image) {
      if (personKey && KNOWN_HISTORICAL_FIGURES[personKey]) {
        const known = KNOWN_HISTORICAL_FIGURES[personKey];
        name = name || known.name;
        role = role !== 'Historical Figure' ? role : known.role;
        lifespan = lifespan || known.lifespan;
        bio = bio || known.bio;
        image = image || known.image;
      } else {
        let unitIndividuals = null;
        if (window.appStore?.state?.activeUnitData?.key_individuals) {
          unitIndividuals = window.appStore.state.activeUnitData.key_individuals;
        } else if (window.db && window.currentUnitId && window.db[window.currentUnitId]) {
          const u = window.db[window.currentUnitId].data || window.db[window.currentUnitId];
          unitIndividuals = u?.key_individuals || u?.biographies;
        }
        if (unitIndividuals) {
          const match = unitIndividuals.find(
            (p) =>
              (personKey && p.id === personKey) ||
              (p.name && p.name.toLowerCase() === name.toLowerCase()) ||
              (personKey && p.name && p.name.toLowerCase().includes(personKey.replace(/_/g, ' '))),
          );
          if (match) {
            name = match.name || name;
            role = match.role || role;
            lifespan = match.lifespan || lifespan;
            bio = match.bio || bio;
            image = match.image || match.img || image;
          }
        }
      }
    }

    if (!bio) {
      bio = `${name} is an influential historical figure studied in this enquiry.`;
    }

    activeFigureElement = target;
    target.classList.add('active');

    const imageHtml = image
      ? `<img src="${image}" alt="${name}" style="width: 52px; height: 52px; border-radius: 8px; object-fit: cover; border: 1.5px solid #a855f7; flex-shrink: 0; box-shadow: 0 2px 6px rgba(0,0,0,0.3);" onerror="this.style.display='none'" />`
      : `<div style="width: 52px; height: 52px; border-radius: 8px; background: rgba(168,85,247,0.2); border: 1.5px solid #a855f7; display: flex; align-items: center; justify-content: center; color: #d8b4fe; font-size: 1.3rem; flex-shrink: 0;"><i class="fa-solid fa-user"></i></div>`;

    figurePopover.innerHTML = `
      <div style="display: flex; gap: 12px; align-items: flex-start; text-align: left;">
        ${imageHtml}
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 2px;">
            <strong style="color: #f5f3ff; font-size: 0.95rem; line-height: 1.25; font-weight: 700;">${name}</strong>
            <span style="background: rgba(168, 85, 247, 0.25); color: #e9d5ff; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; padding: 2px 6px; border-radius: 6px; border: 1px solid rgba(168,85,247,0.4); white-space: nowrap;">Key Figure</span>
          </div>
          <div style="font-size: 0.74rem; color: #c084fc; margin-bottom: 5px; font-weight: 600;">${role}${lifespan ? ' · ' + lifespan : ''}</div>
          <div style="font-size: 0.82rem; color: #e2e8f0; line-height: 1.4;">${bio}</div>
        </div>
      </div>
    `;
    figurePopover.classList.add('visible');

    // Calculate position
    const rect = target.getBoundingClientRect();
    const popoverRect = figurePopover.getBoundingClientRect();

    let top = rect.top - popoverRect.height - 10;
    let left = rect.left + rect.width / 2 - popoverRect.width / 2;

    let arrowLeft = '50%';
    figurePopover.classList.remove('arrow-top');

    if (top < 10) {
      top = rect.bottom + 10;
      figurePopover.classList.add('arrow-top');
    }

    if (left < 10) {
      const overflow = 10 - left;
      left = 10;
      arrowLeft = `calc(50% - ${overflow}px)`;
    } else if (left + popoverRect.width > window.innerWidth - 10) {
      const overflow = left + popoverRect.width - (window.innerWidth - 10);
      left = window.innerWidth - 10 - popoverRect.width;
      arrowLeft = `calc(50% + ${overflow}px)`;
    }

    figurePopover.style.top = `${top}px`;
    figurePopover.style.left = `${left}px`;

    let arrowStyle = document.getElementById('figure-popover-arrow-style');
    if (!arrowStyle) {
      arrowStyle = document.createElement('style');
      arrowStyle.id = 'figure-popover-arrow-style';
      document.head.appendChild(arrowStyle);
    }
    arrowStyle.innerHTML = `#global-figure-popover::after { left: ${arrowLeft}; }`;
  };

  const hideFigurePopover = () => {
    if (figurePopover && figurePopover.classList.contains('visible')) {
      figurePopover.classList.remove('visible');
      if (activeFigureElement) {
        activeFigureElement.classList.remove('active');
        activeFigureElement = null;
      }
    }
  };

  document.body.addEventListener('mouseover', showFigurePopover);
  document.body.addEventListener('mouseout', (e) => {
    if (e.target.closest('.historical-figure')) hideFigurePopover();
  });

  document.body.addEventListener('click', (e) => {
    const target = e.target.closest('.historical-figure');
    if (target) {
      if (activeFigureElement === target) {
        hideFigurePopover();
      } else {
        hideFigurePopover();
        showFigurePopover(e);
      }
    } else {
      hideFigurePopover();
    }
  });

  window.addEventListener('scroll', hideFigurePopover, { passive: true });
  window.addEventListener('resize', hideFigurePopover, { passive: true });
}

// Auto-initialize figure popover
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHistoricalFigurePopover);
  } else {
    initHistoricalFigurePopover();
  }
}

window.openKeyInfoModal = function () {
  const info = window.currentUnitData && window.currentUnitData.key_info;
  if (!info) return;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.display = 'flex';
  overlay.innerHTML = `
    <div class="modal-content" style="max-width: 500px; padding: 30px; border-radius: 12px; font-family: 'Outfit', sans-serif;">
      <h3 style="margin-top:0; color: #1e293b; font-size: 1.5rem; margin-bottom: 20px;"><i class="fa-solid fa-circle-info" style="color:#ef4444; margin-right:10px;"></i> Key Trip Information</h3>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
        <h4 style="margin: 0 0 5px 0; color: #334155; font-size: 1rem;"><i class="fa-solid fa-phone" style="width:20px; color:#64748b;"></i> Emergency Contact</h4>
        <p style="margin: 0; color: #0f172a; font-weight: 600;">${info.emergency_contact}</p>
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
        <h4 style="margin: 0 0 5px 0; color: #334155; font-size: 1rem;"><i class="fa-solid fa-hotel" style="width:20px; color:#64748b;"></i> Accommodation</h4>
        <p style="margin: 0; color: #0f172a; font-weight: 600;">${info.hotel}</p>
        ${info.hotel_phone ? `<p style="margin: 4px 0 0 0; font-size: 0.85rem; color: #475569;"><strong>Tel:</strong> ${info.hotel_phone} · <strong>Email:</strong> ${info.hotel_email || 'info@peacevillage.be'}</p>` : ''}
        ${info.hotel_faq_url ? `<div style="margin-top: 8px;"><a href="${info.hotel_faq_url}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.85rem; color: #1e3a8a; font-weight: 700; text-decoration: underline;"><i class="fa-solid fa-circle-question" style="color:#2563eb;"></i> View Hostel FAQs &amp; Facilities</a></div>` : ''}
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
        <h4 style="margin: 0 0 5px 0; color: #334155; font-size: 1rem;"><i class="fa-solid fa-bus" style="width:20px; color:#64748b;"></i> Transport Provider</h4>
        <p style="margin: 0; color: #0f172a; font-weight: 600;">${info.coach}</p>
      </div>
      <div style="text-align: right;">
        <button class="btn btn-secondary" data-action="close-modal">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
};

window.openTourGuideModal = function (lessonIndex) {
  const lesson = window.currentUnitData.lessons[lessonIndex];
  if (!lesson || !lesson.tour_guide_script) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay no-print';
  overlay.style.cssText =
    'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(10px); justify-content: center; align-items: center; z-index: 2000; display: flex;';
  overlay.onclick = function (e) {
    if (e.target === overlay) overlay.remove();
  };

  let blocksHtml = lesson.tour_guide_script
    .map(
      (block) => `
      <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0;">
        <h4 style="color: #1e293b; font-size: 1.25rem; margin-bottom: 15px; border-left: 4px solid #6366f1; padding-left: 12px;">${block.theme_heading}</h4>
        <div style="font-size: 1.1rem; line-height: 1.6; color: #334155;">${block.text}</div>
      </div>
    `,
    )
    .join('');

  overlay.innerHTML = `
      <div class="modal-content" style="background: white; max-width: 800px; width: 90%; max-height: 90vh; overflow-y: auto; padding: 40px; border-radius: 12px; font-family: 'Outfit', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #6366f1; padding-bottom: 15px;">
          <h3 style="margin: 0; color: #1e293b; font-size: 1.8rem;"><i class="fa-solid fa-bullhorn" style="color:#6366f1; margin-right:12px;"></i> Tour Guide Script</h3>
          <button class="btn btn-secondary" data-action="close-modal"><i class="fa-solid fa-times"></i> Close</button>
        </div>
        ${blocksHtml}
        <div style="text-align: right; margin-top: 20px;">
          <button class="btn btn-secondary" data-action="close-modal">Close Script</button>
        </div>
      </div>
    `;
  document.body.appendChild(overlay);
};
window.openAnthologyModal = async function () {
  let dossiers =
    window.currentUnitData?.poetry_dossiers ||
    (window.appStore &&
      window.appStore.state &&
      window.appStore.state.activeUnitData?.poetry_dossiers);

  if (!dossiers) {
    try {
      const mod = await import('../../units/trip_ypres/poetry_data.js');
      dossiers = mod.poetryDossiers;
    } catch (e) {
      console.warn('Failed to load poetry dossiers dynamically:', e);
    }
  }

  if (!dossiers) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay no-print';
  overlay.style.cssText =
    'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(10px); justify-content: center; align-items: center; z-index: 2000; display: flex;';
  overlay.onclick = function (e) {
    if (e.target === overlay) overlay.remove();
  };

  const days = [
    { title: 'Day 1: Thursday 1st October 2026', stops: dossiers.day_1 || [] },
    { title: 'Day 2: Friday 2nd October 2026', stops: dossiers.day_2 || [] },
    { title: 'Day 3: Saturday 3rd October 2026', stops: dossiers.day_3 || [] },
    ...(dossiers.special_studies && dossiers.special_studies.length > 0
      ? [
          {
            title: 'Expedition Special Case Study: The Somme & Thiepval Wood',
            stops: dossiers.special_studies,
          },
        ]
      : []),
  ];

  let bodyHtml = '';
  days.forEach((day, dIdx) => {
    bodyHtml += `
      <div style="margin-top: ${dIdx === 0 ? '0' : '40px'}; margin-bottom: 25px;">
        <div style="background: #1e3a8a; color: white; padding: 12px 18px; border-radius: 6px; font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 700; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
          <span>${day.title}</span>
          <span style="font-size: 0.8rem; font-family: sans-serif; font-weight: normal; background: rgba(255,255,255,0.2); padding: 3px 10px; border-radius: 12px;">${day.stops.length} Stops</span>
        </div>
    `;

    day.stops.forEach((stop, sIdx) => {
      bodyHtml += `
        <div id="anthology-stop-${stop.site_id}" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 22px; margin-bottom: 24px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <div>
              <span style="font-size: 0.72rem; font-weight: 700; color: #991b1b; text-transform: uppercase; letter-spacing: 0.05em;">Field Reading · Stop ${sIdx + 1}</span>
              <h4 style="margin: 2px 0 0 0; color: #0f172a; font-size: 1.25rem; font-family: 'Playfair Display', serif;">${stop.site_name}</h4>
            </div>
            <span style="font-size: 0.78rem; font-weight: 700; background: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 14px; border: 1px solid #e2e8f0;">${stop.stop_time}</span>
          </div>
      `;

      stop.poems.forEach((poem) => {
        bodyHtml += `
          <div style="margin-bottom: 25px; background: #fdfaf6; border: 1px solid #e7dfd5; border-radius: 8px; padding: 20px;">
            <!-- Poet Profile -->
            <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start; margin-bottom: 16px;">
              <div style="flex: 0 0 110px; text-align: center;">
                <img src="${poem.poet.portrait}" alt="${poem.poet.name}" style="width: 110px; height: 140px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <small style="display: block; margin-top: 4px; font-size: 0.75rem; color: #64748b; font-weight: 600;">${poem.poet.lifespan}</small>
              </div>
              <div style="flex: 1; min-width: 240px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; flex-wrap: wrap;">
                  <div>
                    <h5 style="margin: 0; color: #1e293b; font-size: 1.2rem; font-family: 'Playfair Display', serif;">${poem.poet.name}</h5>
                    <div style="font-size: 0.85rem; color: #78350f; font-weight: 600; margin-top: 2px;">${poem.poet.role}</div>
                  </div>
                  <span style="font-size: 0.75rem; font-weight: 700; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 10px;">${poem.year}</span>
                </div>
                <p style="margin: 8px 0 0 0; color: #475569; font-size: 0.9rem; line-height: 1.55;">${poem.bio}</p>
              </div>
            </div>

            <!-- Poem Verse -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #991b1b; border-radius: 6px; padding: 18px 22px; margin-bottom: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 6px;">
                <strong style="font-size: 1.15rem; color: #1e3a8a; font-family: 'Playfair Display', serif; font-style: italic;">"${poem.title}"</strong>
                <span style="font-size: 0.78rem; color: #64748b;">${poem.year}</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 1rem; line-height: 1.8; color: #1e293b; white-space: pre-line; margin: 0;">${poem.poem_text}</div>
            </div>

            <!-- Teacher Guidance Drawer -->
            <details style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #2563eb; border-radius: 6px; margin-bottom: 10px; overflow: hidden;">
              <summary style="padding: 10px 14px; cursor: pointer; font-weight: 700; color: #1d4ed8; font-size: 0.9rem; display: flex; align-items: center; justify-content: space-between;">
                <span><i class="fa-solid fa-bullhorn" style="margin-right: 8px; color: #2563eb;"></i> On-Site Teacher Guidance</span>
                <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; color: #60a5fa;"></i>
              </summary>
              <div style="padding: 12px 16px; border-top: 1px solid #bfdbfe; font-size: 0.92rem; line-height: 1.6; color: #1e3a8a; background: #ffffff;">
                ${poem.teacher_commentary}
              </div>
            </details>

            <!-- Pedagogical Rationale Drawer -->
            <details style="background: #fdfaf6; border: 1px solid #fed7aa; border-left: 4px solid #ea580c; border-radius: 6px; overflow: hidden;">
              <summary style="padding: 10px 14px; cursor: pointer; font-weight: 700; color: #9a3412; font-size: 0.9rem; display: flex; align-items: center; justify-content: space-between;">
                <span><i class="fa-solid fa-brain" style="margin-right: 8px; color: #ea580c;"></i> Historical Rationale &amp; Hinge Question</span>
                <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; color: #fb923c;"></i>
              </summary>
              <div style="padding: 12px 16px; border-top: 1px solid #fed7aa; font-size: 0.92rem; line-height: 1.6; color: #334155; background: #ffffff;">
                <p style="margin: 0 0 10px 0;">${poem.pedagogical_rationale.context}</p>
                <div style="background: #fff7ed; border-left: 3px solid #ea580c; padding: 10px 14px; border-radius: 4px;">
                  <strong style="color: #9a3412; display: block; margin-bottom: 3px; font-size: 0.85rem;"><i class="fa-solid fa-circle-question" style="margin-right: 5px;"></i> Class Discussion Hinge Question:</strong>
                  <span style="color: #431407; font-weight: 600; font-size: 0.95rem;">"${poem.pedagogical_rationale.hinge_question}"</span>
                </div>
              </div>
            </details>
          </div>
        `;
      });

      bodyHtml += `</div>`;
    });

    bodyHtml += `</div>`;
  });

  overlay.innerHTML = `
    <div class="modal-content" style="background: #f8fafc; max-width: 950px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 35px; border-radius: 12px; font-family: 'Outfit', sans-serif;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px; border-bottom: 2px solid #7f1d1d; padding-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <div>
          <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: #fee2e2; color: #991b1b; padding: 3px 10px; border-radius: 12px;">Complete Expedition Anthology</span>
          <h2 style="margin: 6px 0 0 0; color: #7f1d1d; font-size: 1.8rem; font-family: 'Playfair Display', serif;">
            Voices &amp; Poetry of the Salient
          </h2>
          <p style="margin: 4px 0 0 0; color: #64748b; font-size: 0.95rem;">
            16 Unabridged First World War Poems Across 11 Stops of the Ypres Salient
          </p>
        </div>
        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="padding: 8px 16px; font-size: 0.9rem; cursor: pointer;">
          <i class="fa-solid fa-times" style="margin-right: 5px;"></i> Close
        </button>
      </div>

      ${bodyHtml}

      <div style="text-align: right; margin-top: 30px; border-top: 1px solid #cbd5e1; padding-top: 15px;">
        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close Anthology</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
};

window.openDebateModal = function () {
  window.injectDebateModalIfNeeded();
  const modal = document.getElementById('debateModal');
  modal.style.display = 'flex';
  // Trigger reflow
  void modal.offsetWidth;
  modal.style.opacity = '1';
  modal.querySelector('.modal-content').style.transform = 'scale(1)';
  window.renderDebatePrompt();
};

window.closeDebateModal = function () {
  const modal = document.getElementById('debateModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.95)';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
};

window.renderDebatePrompt = function () {
  if (
    !window.currentUnitData ||
    !window.currentUnitData.debatePrompts ||
    window.currentUnitData.debatePrompts.length === 0
  ) {
    document.getElementById('debateTopicSubtitle').innerText = 'No prompts available';
    document.getElementById('debateModalContent').innerHTML =
      'No debate prompts found for this unit.';
    document.getElementById('btn-show-starter').style.display = 'none';
    return;
  }
  const prompts = window.currentUnitData.debatePrompts;
  const promptData = prompts[window.currentDebateIndex];
  document.getElementById('debateTopicSubtitle').innerText = promptData.title;
  document.getElementById('debateModalContent').innerHTML = promptData.prompt;

  const starterContainer = document.getElementById('debateSentenceStarterContainer');
  const starterBtn = document.getElementById('btn-show-starter');

  // Hide starter by default when changing prompts
  if (starterContainer) starterContainer.style.display = 'none';

  if (promptData.sentence_starter && starterBtn) {
    starterBtn.style.display = 'inline-block';
    starterBtn.innerText = 'Show Hint';
    document.getElementById('debateSentenceStarterText').innerText = promptData.sentence_starter;
  } else if (starterBtn) {
    starterBtn.style.display = 'none';
  }
};

window.toggleDebateStarter = function () {
  const container = document.getElementById('debateSentenceStarterContainer');
  const btn = document.getElementById('btn-show-starter');
  if (container.style.display === 'none') {
    container.style.display = 'block';
    btn.innerText = 'Hide Hint';
  } else {
    container.style.display = 'none';
    btn.innerText = 'Show Hint';
  }
};

window.cycleDebatePrompt = function (direction) {
  if (!window.currentUnitData || !window.currentUnitData.debatePrompts) return;
  const prompts = window.currentUnitData.debatePrompts;
  window.currentDebateIndex += direction;
  if (window.currentDebateIndex < 0) window.currentDebateIndex = prompts.length - 1;
  if (window.currentDebateIndex >= prompts.length) window.currentDebateIndex = 0;
  window.renderDebatePrompt();
};

window.injectMilestoneModalIfNeeded = function () {
  if (document.getElementById('milestoneModal')) return;
  const html = `
  <div id="milestoneModal" class="modal-overlay no-print" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(8px); justify-content: center; align-items: center; z-index: 1000; opacity: 0; transition: opacity 0.3s ease;" data-action="close-milestone-overlay">
    <div class="modal-content" style="background: var(--navy); border: 2.5px solid var(--gold); border-radius: 12px; padding: 25px; max-width: 500px; width: 90%; color: #ffffff; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: scale(0.95); transition: transform 0.3s ease;">
      <button class="modal-close-btn" data-action="close-milestone" style="position: absolute; top: 15px; right: 15px; background: transparent; border: none; color: #ffffff; font-size: 16pt; cursor: pointer; transition: color 0.2s;"><i class="fa-solid fa-xmark"></i></button>
      <div id="modalMilestoneContent">
        <!-- Content dynamically populated via showMilestoneModal -->
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
};

window.showMilestoneModal = function (id) {
  window.injectMilestoneModalIfNeeded();
  if (!window.currentUnitData || !window.currentUnitData.milestones) return;
  const data = window.currentUnitData.milestones[id];
  if (!data) return;

  const contentBox = document.getElementById('modalMilestoneContent');
  if (contentBox) {
    contentBox.innerHTML = `
      <div style="font-size: 11pt; font-weight: bold; color: var(--gold); text-transform: uppercase; margin-bottom: 5px;">Milestone ${id}: ${data.year}</div>
      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-top: 0; margin-bottom: 15px; border-bottom: 1.5px solid var(--gold); padding-bottom: 5px; color: #ffffff;">${data.title}</h3>
      <img src="${getAssetUrl(data.img)}" alt="${data.title}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 6px; border: 1.5px solid var(--gold); margin-bottom: 15px;">
      <p style="font-size: 10.5pt; line-height: 1.5; color: #e2e8f0; margin-bottom: 15px; text-align: justify;">${data.desc}</p>
      <div style="background: rgba(255,255,255,0.06); padding: 12px; border-radius: 6px; border-left: 3px solid var(--gold);">
        <strong style="display: block; font-size: 9pt; text-transform: uppercase; color: var(--gold); margin-bottom: 4px;"><i class="fa-solid fa-circle-question"></i> Retrieval Challenge</strong>
        <span style="font-size: 9.5pt; line-height: 1.4; color: #f8fafc;">${data.trivia}</span>
      </div>
    `;
  }

  const modal = document.getElementById('milestoneModal');
  if (modal) {
    modal.style.display = 'flex';
    // Trigger reflow
    void modal.offsetWidth;
    modal.style.opacity = '1';
    modal.querySelector('.modal-content').style.transform = 'scale(1)';
  }
};

window.closeMilestoneModal = function () {
  const modal = document.getElementById('milestoneModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.95)';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
};

window.injectQuizModalIfNeeded = function () {
  if (document.getElementById('quizModal')) return;
  const html = `
  <div id="quizModal" class="modal-overlay no-print" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); justify-content: center; align-items: center; z-index: 99999; opacity: 0; transition: opacity 0.25s ease;">
    <div class="modal-content" style="background: #ffffff; border-radius: 16px; padding: 20px 24px 24px; max-width: 680px; width: 94%; position: relative; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.35); transform: scale(0.96); transition: transform 0.25s ease; border: 1px solid #e2e8f0; max-height: 92vh; overflow-y: auto; display: flex; flex-direction: column;">
      
      <!-- Top Bar: Exit button, Topic Pill, and Progress Pill -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 10px;">
        <button class="modal-close-btn" onclick="window.closeQuizModal()" style="background: #f1f5f9; border: 1.5px solid #cbd5e1; color: #334155; height: 36px; padding: 0 12px; border-radius: 8px; font-size: 0.84rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; flex-shrink: 0; transition: all 0.2s;">
          <i class="fa-solid fa-arrow-left"></i> <span>Exit</span>
        </button>

        <div style="flex: 1; text-align: center; min-width: 0;">
          <span id="quiz-lesson-badge" style="display: inline-block; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: 'Inter', sans-serif; font-size: 0.78rem; font-weight: 800; background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; padding: 3px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.3px;">
            Retrieval Practice
          </span>
        </div>

        <span id="quiz-progress-pill" style="background: #0f172a; color: #ffffff; font-weight: 800; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; flex-shrink: 0; letter-spacing: 0.5px;">
          Q <span id="quiz-progress">1 / 8</span>
        </span>
      </div>

      <!-- Animated Progress Bar -->
      <div style="width: 100%; height: 5px; background: #e2e8f0; border-radius: 4px; margin-bottom: 16px; overflow: hidden;">
        <div id="quiz-progress-bar" style="width: 12%; height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb); transition: width 0.3s ease;"></div>
      </div>
      
      <!-- Question and Options Area -->
      <div id="quiz-question-container" style="flex: 1;">
        <!-- Populated dynamically -->
      </div>
      
      <!-- Feedback and Next Action Footer -->
      <div id="quiz-footer" style="margin-top: 16px; border-top: 1px solid #f1f5f9; padding-top: 12px; display: flex; flex-direction: column; gap: 10px;">
        <div id="quiz-feedback" style="font-weight: 600; font-size: 0.95rem;"></div>
        <button id="quiz-next-btn" class="btn-pedagogy-primary" style="display: none; padding: 13px 20px; font-weight: 800; font-size: 1rem; border-radius: 10px; width: 100%; justify-content: center; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);" onclick="window.nextQuizQuestion()">
          Next Question <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
};

window.startQuiz = function (lessonId, isFullscreen = false) {
  window.injectQuizModalIfNeeded();
  const unitData =
    window.currentUnitData ||
    (window.appStore && window.appStore.state && window.appStore.state.activeUnitData);
  if (!unitData || !unitData.lessons) return;

  let lesson = unitData.lessons.find((l) => l.id === lessonId);
  if (!lesson && !isNaN(parseInt(lessonId, 10))) {
    lesson = unitData.lessons[parseInt(lessonId, 10)];
  }
  if (!lesson) {
    lesson = unitData.lessons.find((l) =>
      (l.id || '').toLowerCase().includes(String(lessonId).toLowerCase()),
    );
  }
  if (!lesson) return;

  const rawQuiz = lesson.quiz || lesson.quick_quiz || lesson.quiz_questions || [];
  if (!rawQuiz || rawQuiz.length === 0) return;

  // Set topic badge with clean concise Key Topic text for mobile
  const badge = document.getElementById('quiz-lesson-badge');
  if (badge) {
    let cleanBadge = 'RETRIEVAL PRACTICE';
    const ktMatch = (lesson.title || '').match(/KT\s*(\d+)/i);
    if (ktMatch) {
      cleanBadge = 'KEY TOPIC ' + ktMatch[1];
    } else if (lesson.title) {
      let t = lesson.title.replace(/^Enquiry:\s*/i, '');
      cleanBadge = t.length > 25 ? t.slice(0, 23).trim() + '…' : t;
    }
    badge.innerText = cleanBadge;
  }

  window.currentQuizData = rawQuiz.map((q) => {
    let options = q.options ? [...q.options] : [];
    let correctIdx = -1;
    const rawAns = q.answer !== undefined ? q.answer : q.a;
    if (typeof rawAns === 'number') {
      correctIdx = rawAns;
    } else if (typeof rawAns === 'string') {
      correctIdx = options.findIndex(
        (opt) => opt.trim().toLowerCase() === rawAns.trim().toLowerCase(),
      );
      if (correctIdx === -1 && options.length === 0 && q.distractors) {
        options = [rawAns, ...q.distractors].sort(() => Math.random() - 0.5);
        correctIdx = options.indexOf(rawAns);
      }
    }
    return {
      ...q,
      question: q.question || q.q,
      options: options,
      answer: correctIdx >= 0 ? correctIdx : 0,
      explanation: q.explanation || q.historian_explanation || '',
    };
  });

  window.currentQuizIndex = 0;
  window.currentQuizScore = 0;
  window.currentQuizLessonId = lesson.id || lessonId;

  // Fullscreen mobile adaptation
  const isMobile =
    window.innerWidth <= 768 ||
    isFullscreen ||
    new URLSearchParams(window.location.search).get('quiz') === 'true';
  const modal = document.getElementById('quizModal');
  const content = modal ? modal.querySelector('.modal-content') : null;
  if (isMobile) {
    document.body.classList.add('mobile-fullscreen-quiz-active');
    if (modal) {
      modal.classList.add('fullscreen-modal');
      modal.style.background = '#ffffff';
      modal.style.alignItems = 'stretch';
      modal.style.justifyContent = 'stretch';
      modal.style.padding = '0';
      modal.style.backdropFilter = 'none';
    }
    if (content) {
      content.style.width = '100vw';
      content.style.height = '100vh';
      content.style.maxWidth = '100vw';
      content.style.maxHeight = '100vh';
      content.style.borderRadius = '0';
      content.style.boxShadow = 'none';
      content.style.border = 'none';
      content.style.transform = 'none';
      content.style.padding = '14px 16px 20px';
      content.style.margin = '0';
      content.style.display = 'flex';
      content.style.flexDirection = 'column';
      content.style.justifyContent = 'space-between';
      content.style.background = '#ffffff';
    }
  } else {
    document.body.classList.remove('mobile-fullscreen-quiz-active');
    if (modal) {
      modal.classList.remove('fullscreen-modal');
      modal.style.background = 'rgba(15, 23, 42, 0.85)';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.padding = '';
      modal.style.backdropFilter = 'blur(8px)';
    }
    if (content) {
      content.style.width = '94%';
      content.style.height = '';
      content.style.maxWidth = '680px';
      content.style.maxHeight = '92vh';
      content.style.borderRadius = '16px';
      content.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.35)';
      content.style.border = '1px solid #e2e8f0';
      content.style.padding = '20px 24px 24px';
      content.style.margin = '';
    }
  }

  window.renderQuizQuestion();

  if (modal) {
    modal.style.display = 'flex';
    void modal.offsetWidth; // Trigger reflow
    modal.style.opacity = '1';
    if (content && !isMobile) {
      content.style.transform = 'scale(1)';
    }
  }
};

window.renderQuizQuestion = function () {
  const qData = window.currentQuizData[window.currentQuizIndex];
  const total = window.currentQuizData.length;
  const currentNum = window.currentQuizIndex + 1;
  const pctProgress = Math.round((currentNum / total) * 100);

  const progPill = document.getElementById('quiz-progress');
  if (progPill) progPill.innerText = `${currentNum} / ${total}`;
  const progBar = document.getElementById('quiz-progress-bar');
  if (progBar) progBar.style.width = `${pctProgress}%`;

  let optionsHtml = '';
  if (qData.options && qData.options.length > 0) {
    qData.options.forEach((opt, idx) => {
      optionsHtml += `
        <button class="btn-quiz-option quiz-option-btn" data-idx="${idx}" onclick="window.checkQuizAnswer(this, ${idx})" style="display: flex; align-items: center; width: 100%; text-align: left; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 10px; padding: 13px 16px; margin-bottom: 10px; font-size: 0.96rem; cursor: pointer; transition: all 0.15s ease; color: #1e293b; min-height: 52px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
          <span style="display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; line-height: 30px; text-align: center; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 50%; margin-right: 14px; font-weight: 800; color: #334155; flex-shrink: 0; font-size: 0.85rem;">${String.fromCharCode(65 + idx)}</span>
          <span style="flex: 1; line-height: 1.35;">${opt}</span>
        </button>
      `;
    });
  } else {
    optionsHtml = `
      <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 15px;">
         <button class="btn btn-secondary" onclick="this.nextElementSibling.style.display='block'; this.style.display='none'; document.getElementById('quiz-next-btn').style.display='inline-flex';">Reveal Answer</button>
         <div style="display: none; font-size: 1.15rem; color: #059669; font-weight: bold; padding: 10px;">${qData.a || qData.answer || ''}</div>
      </div>
    `;
  }

  const container = document.getElementById('quiz-question-container');
  if (container) {
    container.innerHTML = `
      <h3 style="font-size: 1.18rem; color: #0f172a; margin-top: 4px; margin-bottom: 18px; line-height: 1.4; font-family: 'Inter', sans-serif; font-weight: 800;">${qData.question || qData.q}</h3>
      ${qData.img ? `<div style="text-align: center; margin-bottom: 16px;"><img src="${qData.img}" style="max-height: 220px; max-width: 100%; border-radius: 8px; border: 1px solid #e2e8f0; object-fit: contain;"></div>` : ''}
      <div class="quiz-options-list">${optionsHtml}</div>
    `;
  }

  const feedbackEl = document.getElementById('quiz-feedback');
  if (feedbackEl) feedbackEl.innerHTML = '';

  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) {
    nextBtn.style.display = 'none';
    if (window.currentQuizIndex >= window.currentQuizData.length - 1) {
      nextBtn.innerHTML = 'View Results <i class="fa-solid fa-trophy"></i>';
      nextBtn.onclick = window.finishQuizModal;
    } else {
      nextBtn.innerHTML = 'Next Question <i class="fa-solid fa-arrow-right"></i>';
      nextBtn.onclick = window.nextQuizQuestion;
    }
  }
};

window.checkQuizAnswer = function (btnEl, selectedIdx) {
  const qData = window.currentQuizData[window.currentQuizIndex];
  const isCorrect = selectedIdx === qData.answer;
  if (isCorrect) {
    window.currentQuizScore = (window.currentQuizScore || 0) + 1;
  }

  const allBtns = document
    .getElementById('quiz-question-container')
    .querySelectorAll('.quiz-option-btn');
  allBtns.forEach((btn) => {
    btn.disabled = true;
    btn.style.cursor = 'default';
    if (parseInt(btn.dataset.idx) === qData.answer) {
      btn.style.borderColor = '#10b981';
      btn.style.background = '#ecfdf5';
      btn.style.color = '#065f46';
      btn.style.fontWeight = '700';
      const badge = btn.querySelector('span:first-child');
      if (badge) {
        badge.style.background = '#10b981';
        badge.style.color = '#ffffff';
        badge.style.borderColor = '#10b981';
      }
    }
  });

  const feedbackEl = document.getElementById('quiz-feedback');
  if (isCorrect) {
    feedbackEl.innerHTML =
      '<div style="color: #059669; display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 1.05rem;"><i class="fa-solid fa-circle-check"></i> Correct!</div>';
  } else {
    btnEl.style.borderColor = '#ef4444';
    btnEl.style.background = '#fef2f2';
    btnEl.style.color = '#991b1b';
    const badge = btnEl.querySelector('span:first-child');
    if (badge) {
      badge.style.background = '#ef4444';
      badge.style.color = '#ffffff';
      badge.style.borderColor = '#ef4444';
    }
    feedbackEl.innerHTML =
      '<div style="color: #dc2626; display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 1.05rem;"><i class="fa-solid fa-circle-xmark"></i> Incorrect</div>';
  }

  if (qData.explanation) {
    const expDiv = document.createElement('div');
    expDiv.style.cssText =
      'margin-top: 10px; padding: 12px 14px; background: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 6px; font-size: 0.88rem; color: #1e293b; line-height: 1.45; text-align: left;';
    expDiv.innerHTML = `<strong style="color: #1e40af; display: block; margin-bottom: 3px;"><i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Historical Fact &amp; Context:</strong><span>${qData.explanation}</span>`;
    feedbackEl.appendChild(expDiv);
  }

  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) {
    nextBtn.style.display = 'inline-flex';
  }
};

window.nextQuizQuestion = function () {
  window.currentQuizIndex++;
  window.renderQuizQuestion();
};

window.finishQuizModal = function () {
  const score = window.currentQuizScore || 0;
  const total = window.currentQuizData.length;
  const pct = Math.round((score / total) * 100);
  const lessonId = window.currentQuizLessonId;

  const progPill = document.getElementById('quiz-progress');
  if (progPill) progPill.innerText = `${total} / ${total}`;
  const progBar = document.getElementById('quiz-progress-bar');
  if (progBar) progBar.style.width = '100%';

  // Retrieve previous attempt from LocalStorage
  let prevRecord = null;
  try {
    const raw = localStorage.getItem('history_quiz_' + lessonId);
    if (raw) prevRecord = JSON.parse(raw);
  } catch (e) {}

  const prevBestScore =
    prevRecord && typeof prevRecord.score === 'number' ? prevRecord.score : null;
  const isNewBest = prevBestScore === null || score > prevBestScore;
  const bestScore = prevBestScore === null ? score : Math.max(score, prevBestScore);

  try {
    localStorage.setItem(
      'history_quiz_' + lessonId,
      JSON.stringify({
        score: bestScore,
        lastScore: score,
        prevBest: prevBestScore,
        total,
        pct,
        date: Date.now(),
      }),
    );
  } catch (e) {}

  const statusBadge = document.getElementById('quiz-status-badge-' + lessonId);
  if (statusBadge) {
    statusBadge.innerHTML = `
      <span class="quiz-score-pill" style="background: #f0fdf4; color: #166534; border: 1.5px solid #86efac; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.88rem; display: inline-flex; align-items: center; gap: 6px;">
        <i class="fa-solid fa-circle-check"></i> Score: ${score}/${total} (${pct}%)
      </span>
      <button class="btn btn-secondary" onclick="window.startQuiz('${lessonId}')" style="padding: 7px 14px; font-size: 0.85rem; font-weight: 600; margin-left: 8px;">
        <i class="fa-solid fa-rotate-right"></i> Re-take
      </button>
    `;
  }

  // Trajectory Growth Badge
  let trajectoryHtml = '';
  if (prevBestScore === null) {
    trajectoryHtml = `
      <div style="display: inline-block; background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; margin-top: 8px; white-space: nowrap;">
        <i class="fa-solid fa-star" style="color: #3b82f6;"></i> First Attempt Completed!
      </div>`;
  } else if (score > prevBestScore) {
    trajectoryHtml = `
      <div style="display: inline-block; background: #f0fdf4; color: #15803d; border: 1.5px solid #86efac; padding: 4px 12px; border-radius: 20px; font-weight: 800; font-size: 0.8rem; margin-top: 8px; white-space: nowrap;">
        <i class="fa-solid fa-arrow-trend-up"></i> New Personal Best! (Prev: ${prevBestScore}/${total} &rarr; Now: ${score}/${total} 🎉)
      </div>`;
  } else if (score === prevBestScore) {
    trajectoryHtml = `
      <div style="display: inline-block; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; margin-top: 8px; white-space: nowrap;">
        <i class="fa-solid fa-bullseye"></i> Matched Best: ${score}/${total} 🎯
      </div>`;
  } else {
    trajectoryHtml = `
      <div style="display: inline-block; background: #f8fafc; color: #475569; border: 1px solid #cbd5e1; padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 0.8rem; margin-top: 8px; white-space: nowrap;">
        Current: ${score}/${total} &bull; Best: ${prevBestScore}/${total}
      </div>`;
  }

  let descriptor = '';
  let descriptorColor = '#16a34a';
  if (pct >= 85) {
    descriptor =
      "Outstanding Retrieval Mastery! Excellent recall of today's historical facts and concepts.";
    descriptorColor = '#16a34a';
  } else if (pct >= 65) {
    descriptor = 'Good Work! Solid grasp of core lesson knowledge.';
    descriptorColor = '#2563eb';
  } else {
    descriptor = 'Keep Practicing! Review key terms and chronology before your next assessment.';
    descriptorColor = '#d97706';
  }

  const container = document.getElementById('quiz-question-container');
  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 15px 5px;">
        <div style="font-size: 3.2rem; margin-bottom: 8px;">🏆</div>
        <h2 style="font-size: 1.4rem; color: #0f172a; margin: 0 0 6px 0; font-weight: 800; font-family: 'Inter', sans-serif;">
          Retrieval Practice Complete!
        </h2>
        <div style="display: inline-block; background: #f0fdf4; border: 2px solid #86efac; border-radius: 14px; padding: 12px 28px; margin: 10px 0 6px 0;">
          <div style="font-size: 0.8rem; font-weight: 800; color: #166534; text-transform: uppercase; letter-spacing: 0.5px;">Your Score</div>
          <div style="font-size: 2.4rem; font-weight: 900; color: #15803d; line-height: 1.1;">${score} / ${total}</div>
          <div style="font-size: 0.95rem; font-weight: 800; color: #166534;">${pct}% Correct</div>
        </div>

        <div>${trajectoryHtml}</div>

        <!-- Prominent Physical Booklet Connection Callout -->
        <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 10px; padding: 12px 16px; max-width: 440px; margin: 12px auto 18px auto; text-align: center;">
          <div style="font-size: 0.92rem; font-weight: 800; color: #1e40af; margin-bottom: 3px;">
            📘 Record Your Score in Your Workbook!
          </div>
          <div style="font-size: 0.82rem; color: #1e3a8a; line-height: 1.4;">
            Turn to <strong>Page 14</strong> of your printed booklet and write <strong>${bestScore} / ${total}</strong> in the <strong>Best Score</strong> box under this topic.
          </div>
        </div>

        <p style="font-size: 0.92rem; color: ${descriptorColor}; max-width: 440px; margin: 0 auto 20px auto; font-weight: 600; line-height: 1.45;">
          ${descriptor}
        </p>

        <div style="display: flex; flex-direction: column; gap: 10px; max-width: 380px; margin: 0 auto;">
          <button class="btn-pedagogy-primary" onclick="window.startQuiz('${lessonId}', true)" style="padding: 13px 20px; font-size: 0.98rem; font-weight: 800; border-radius: 10px; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);">
            <i class="fa-solid fa-rotate-right"></i> Retake Quiz
          </button>
          <button class="btn btn-secondary" onclick="window.closeQuizModal()" style="padding: 12px 20px; font-size: 0.95rem; font-weight: 700; border-radius: 10px; display: flex; align-items: center; justify-content: center; gap: 8px; background: #f8fafc; border: 1.5px solid #cbd5e1; color: #1e293b;">
            <i class="fa-solid fa-book-open"></i> View Full Lesson Masterclass
          </button>
        </div>
      </div>
    `;
  }

  const feedbackEl = document.getElementById('quiz-feedback');
  if (feedbackEl) feedbackEl.innerHTML = '';
  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) nextBtn.style.display = 'none';
};

window.closeAndScrollToExitTicket = function () {
  window.closeQuizModal();
  setTimeout(() => {
    const exitTicket = document.querySelector('.exit-ticket-card');
    if (exitTicket) {
      exitTicket.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 320);
};

window.closeQuizModal = function () {
  document.body.classList.remove('mobile-fullscreen-quiz-active');
  const modal = document.getElementById('quizModal');
  if (modal) {
    modal.classList.remove('fullscreen-modal');
    modal.style.opacity = '0';
    const content = modal.querySelector('.modal-content');
    if (content) content.style.transform = 'scale(0.95)';
    setTimeout(() => {
      modal.style.display = 'none';
      modal.style.background = 'rgba(15, 23, 42, 0.85)';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.padding = '';
      modal.style.backdropFilter = 'blur(8px)';
      if (content) {
        content.style.width = '94%';
        content.style.height = '';
        content.style.maxWidth = '680px';
        content.style.maxHeight = '92vh';
        content.style.borderRadius = '16px';
        content.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.35)';
        content.style.border = '1px solid #e2e8f0';
        content.style.padding = '20px 24px 24px';
        content.style.margin = '';
        content.style.transform = 'scale(0.96)';
      }
    }, 250);
  }
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.has('quiz')) {
      url.searchParams.delete('quiz');
      window.history.replaceState({}, '', url.toString());
    }
  } catch (e) {}
};

window.openModal = function (src, options = {}) {
  if (
    !src ||
    typeof src !== 'string' ||
    src.trim() === '' ||
    src === 'undefined' ||
    src === 'null'
  ) {
    console.warn('[openModal] Blocked attempt to open modal with invalid image src:', src);
    return;
  }

  // Remove any previously open image modal to prevent duplicates
  const existing = document.getElementById('global-image-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'global-image-modal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(15, 23, 42, 0.94)';
  modal.style.backdropFilter = 'blur(6px)';
  modal.style.webkitBackdropFilter = 'blur(6px)';
  modal.style.zIndex = '999999';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.overflow = 'hidden';
  modal.style.touchAction = 'none';
  modal.style.cursor = 'default';

  const cleanupAndClose = () => {
    window.removeEventListener('keydown', onKeyDown);
    modal.remove();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      cleanupAndClose();
    }
  };
  window.addEventListener('keydown', onKeyDown);

  // Close Button (Top Right)
  const closeBtn = document.createElement('button');
  closeBtn.setAttribute('aria-label', 'Close Image');
  closeBtn.title = 'Close (Esc)';
  closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '20px';
  closeBtn.style.right = '25px';
  closeBtn.style.background = 'rgba(255,255,255,0.2)';
  closeBtn.style.border = '1px solid rgba(255,255,255,0.4)';
  closeBtn.style.borderRadius = '50%';
  closeBtn.style.width = '44px';
  closeBtn.style.height = '44px';
  closeBtn.style.color = '#ffffff';
  closeBtn.style.fontSize = '1.3rem';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.display = 'flex';
  closeBtn.style.justifyContent = 'center';
  closeBtn.style.alignItems = 'center';
  closeBtn.style.zIndex = '1000002';
  closeBtn.style.transition = 'all 0.2s ease';
  closeBtn.onmouseover = () => {
    closeBtn.style.background = 'rgba(239, 68, 68, 0.85)';
    closeBtn.style.borderColor = '#ef4444';
  };
  closeBtn.onmouseout = () => {
    closeBtn.style.background = 'rgba(255,255,255,0.2)';
    closeBtn.style.borderColor = 'rgba(255,255,255,0.4)';
  };
  closeBtn.onclick = (e) => {
    e.stopPropagation();
    cleanupAndClose();
  };
  modal.appendChild(closeBtn);

  // Floating Zoom Controls (Top Left) - Specially designed for tablets & laptops
  const zoomControls = document.createElement('div');
  zoomControls.style.position = 'absolute';
  zoomControls.style.top = '20px';
  zoomControls.style.left = '25px';
  zoomControls.style.display = 'flex';
  zoomControls.style.alignItems = 'center';
  zoomControls.style.gap = '8px';
  zoomControls.style.background = 'rgba(15, 23, 42, 0.75)';
  zoomControls.style.backdropFilter = 'blur(8px)';
  zoomControls.style.webkitBackdropFilter = 'blur(8px)';
  zoomControls.style.border = '1px solid rgba(255, 255, 255, 0.25)';
  zoomControls.style.borderRadius = '24px';
  zoomControls.style.padding = '4px 10px';
  zoomControls.style.zIndex = '1000002';
  zoomControls.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';

  const zoomOutBtn = document.createElement('button');
  zoomOutBtn.innerHTML = '<i class="fa-solid fa-minus"></i>';
  zoomOutBtn.title = 'Zoom Out';
  zoomOutBtn.style.background = 'none';
  zoomOutBtn.style.border = 'none';
  zoomOutBtn.style.color = '#fff';
  zoomOutBtn.style.cursor = 'pointer';
  zoomOutBtn.style.padding = '6px 8px';
  zoomOutBtn.style.fontSize = '0.9rem';

  const zoomLabel = document.createElement('span');
  zoomLabel.innerText = '100%';
  zoomLabel.style.color = '#38bdf8';
  zoomLabel.style.fontSize = '0.8rem';
  zoomLabel.style.fontWeight = '700';
  zoomLabel.style.minWidth = '45px';
  zoomLabel.style.textAlign = 'center';
  zoomLabel.style.fontFamily = 'monospace';

  const zoomInBtn = document.createElement('button');
  zoomInBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
  zoomInBtn.title = 'Zoom In';
  zoomInBtn.style.background = 'none';
  zoomInBtn.style.border = 'none';
  zoomInBtn.style.color = '#fff';
  zoomInBtn.style.cursor = 'pointer';
  zoomInBtn.style.padding = '6px 8px';
  zoomInBtn.style.fontSize = '0.9rem';

  const resetBtn = document.createElement('button');
  resetBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Reset';
  resetBtn.title = 'Reset Zoom';
  resetBtn.style.background = 'rgba(255,255,255,0.15)';
  resetBtn.style.border = '1px solid rgba(255,255,255,0.2)';
  resetBtn.style.borderRadius = '14px';
  resetBtn.style.color = '#e2e8f0';
  resetBtn.style.cursor = 'pointer';
  resetBtn.style.padding = '3px 10px';
  resetBtn.style.fontSize = '0.75rem';
  resetBtn.style.fontWeight = '600';
  resetBtn.style.marginLeft = '4px';

  zoomControls.appendChild(zoomOutBtn);
  zoomControls.appendChild(zoomLabel);
  zoomControls.appendChild(zoomInBtn);
  zoomControls.appendChild(resetBtn);
  modal.appendChild(zoomControls);

  // Bottom Helper Hint
  const hint = document.createElement('div');
  hint.innerText = 'Pinch, scroll, or use buttons to zoom · Drag to pan · Double-tap to expand';
  hint.style.position = 'absolute';
  hint.style.bottom = '20px';
  hint.style.left = '50%';
  hint.style.transform = 'translateX(-50%)';
  hint.style.color = 'rgba(255,255,255,0.85)';
  hint.style.background = 'rgba(0,0,0,0.6)';
  hint.style.border = '1px solid rgba(255,255,255,0.15)';
  hint.style.padding = '6px 16px';
  hint.style.borderRadius = '20px';
  hint.style.fontSize = '0.82rem';
  hint.style.letterSpacing = '0.03em';
  hint.style.pointerEvents = 'none';
  hint.style.zIndex = '1000001';
  modal.appendChild(hint);

  // Image Viewport & Transform State
  const imgContainer = document.createElement('div');
  imgContainer.style.width = '100%';
  imgContainer.style.height = '100%';
  imgContainer.style.display = 'flex';
  imgContainer.style.justifyContent = 'center';
  imgContainer.style.alignItems = 'center';
  imgContainer.style.overflow = 'hidden';
  imgContainer.style.position = 'relative';

  const img = document.createElement('img');
  img.src = src;
  img.style.maxWidth = '90%';
  img.style.maxHeight = '88%';
  img.style.objectFit = 'contain';
  img.style.borderRadius = '8px';
  img.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
  img.style.transition = 'transform 0.08s ease-out';
  img.style.userSelect = 'none';
  img.style.webkitUserSelect = 'none';
  img.style.cursor = 'zoom-in';

  const defaultZoomOpt =
    typeof options === 'object' && options !== null ? options.defaultZoom : options;
  let baseScale = 1;
  if (defaultZoomOpt === 2 || defaultZoomOpt === '2' || defaultZoomOpt === '2x') {
    baseScale = 2;
  } else if (
    typeof src === 'string' &&
    (src.includes('vesalius_fabrica_frontispiece') || src.includes('vesalius_fabrica_1543'))
  ) {
    baseScale = 2;
  }

  let scale = baseScale;
  let posX = 0;
  let posY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let hasDragged = false;

  const updateTransform = () => {
    if (scale <= 1) {
      scale = 1;
      posX = 0;
      posY = 0;
      img.style.cursor = 'zoom-in';
      img.style.transform = 'translate(0px, 0px) scale(1)';
    } else {
      img.style.cursor = isDragging ? 'grabbing' : 'grab';
      img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    }
    zoomLabel.innerText = `${Math.round(scale * 100)}%`;
  };

  if (scale > 1) {
    updateTransform();
  }

  zoomInBtn.onclick = (e) => {
    e.stopPropagation();
    scale = Math.min(scale + 0.4, 5);
    updateTransform();
  };

  zoomOutBtn.onclick = (e) => {
    e.stopPropagation();
    scale = Math.max(scale - 0.4, 1);
    updateTransform();
  };

  resetBtn.onclick = (e) => {
    e.stopPropagation();
    scale = 1;
    posX = 0;
    posY = 0;
    updateTransform();
  };

  // Mouse wheel zoom
  modal.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      scale += e.deltaY * -0.004;
      scale = Math.min(Math.max(1, scale), 5);
      updateTransform();
    },
    { passive: false },
  );

  // Mouse drag panning when zoomed in
  img.addEventListener('mousedown', (e) => {
    if (scale > 1) {
      e.preventDefault();
      isDragging = true;
      hasDragged = false;
      startX = e.clientX - posX;
      startY = e.clientY - posY;
      img.style.cursor = 'grabbing';
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      hasDragged = true;
      posX = e.clientX - startX;
      posY = e.clientY - startY;
      updateTransform();
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      updateTransform();
    }
  });

  // Touch gestures for tablet/touchscreen (Pinch to zoom + 1-finger pan + double tap)
  let initialPinchDistance = null;
  let initialScale = 1;
  let lastTapTime = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  imgContainer.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length === 2) {
        initialPinchDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        );
        initialScale = scale;
      } else if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX - posX;
        touchStartY = e.touches[0].clientY - posY;
        hasDragged = false;

        const now = Date.now();
        if (now - lastTapTime < 300) {
          if (scale > 1) {
            scale = 1;
            posX = 0;
            posY = 0;
          } else {
            scale = 2.4;
          }
          updateTransform();
          lastTapTime = 0;
        } else {
          lastTapTime = now;
        }
      }
    },
    { passive: true },
  );

  imgContainer.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length === 2 && initialPinchDistance) {
        e.preventDefault();
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        );
        const diff = currentDistance / initialPinchDistance;
        scale = Math.min(Math.max(1, initialScale * diff), 5);
        updateTransform();
      } else if (e.touches.length === 1 && scale > 1) {
        e.preventDefault();
        hasDragged = true;
        posX = e.touches[0].clientX - touchStartX;
        posY = e.touches[0].clientY - touchStartY;
        updateTransform();
      }
    },
    { passive: false },
  );

  imgContainer.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
      initialPinchDistance = null;
    }
  });

  modal.onclick = (e) => {
    if (
      e.target === closeBtn ||
      closeBtn.contains(e.target) ||
      zoomControls.contains(e.target) ||
      hasDragged
    ) {
      hasDragged = false;
      return;
    }
    if (e.target === img) {
      if (scale === 1) {
        scale = 2.2;
        updateTransform();
      } else {
        scale = 1;
        updateTransform();
      }
      return;
    }
    cleanupAndClose();
  };

  img.onerror = () => {
    img.style.display = 'none';
    zoomControls.style.display = 'none';
    const errBox = document.createElement('div');
    errBox.style.background = '#ffffff';
    errBox.style.padding = '30px';
    errBox.style.borderRadius = '12px';
    errBox.style.textAlign = 'center';
    errBox.style.maxWidth = '420px';
    errBox.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    errBox.innerHTML = `
      <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; color: #ef4444; margin-bottom: 12px; display: block;"></i>
      <h3 style="margin: 0 0 8px 0; color: #0f172a; font-family: 'Playfair Display', serif;">Photograph Unavailable</h3>
      <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 20px; line-height: 1.4;">The high-resolution photograph could not be loaded (${src}).</p>
      <button style="background: #1e3a8a; color: white; border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer; font-weight: 600;">Close</button>
    `;
    errBox.querySelector('button').onclick = (e) => {
      e.stopPropagation();
      cleanupAndClose();
    };
    modal.appendChild(errBox);
  };

  imgContainer.appendChild(img);
  modal.appendChild(imgContainer);
  document.body.appendChild(modal);
};

window.openGallery = function (encodedData, startIndex) {
  const images = JSON.parse(decodeURIComponent(encodedData));
  let currentIndex = startIndex;

  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
  modal.style.zIndex = '999999';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '20px';
  closeBtn.style.right = '20px';
  closeBtn.style.background = 'none';
  closeBtn.style.border = 'none';
  closeBtn.style.color = 'white';
  closeBtn.style.fontSize = '2rem';
  closeBtn.style.cursor = 'pointer';
  closeBtn.onclick = () => modal.remove();
  modal.appendChild(closeBtn);

  const imgContainer = document.createElement('div');
  imgContainer.style.position = 'relative';
  imgContainer.style.width = '80%';
  imgContainer.style.height = '80%';
  imgContainer.style.display = 'flex';
  imgContainer.style.flexDirection = 'column';
  imgContainer.style.justifyContent = 'center';
  imgContainer.style.alignItems = 'center';

  const img = document.createElement('img');
  img.style.maxWidth = '100%';
  img.style.maxHeight = '90%';
  img.style.objectFit = 'contain';
  img.style.borderRadius = '8px';
  img.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
  img.style.transition = 'transform 0.1s ease';
  img.style.cursor = 'zoom-in';
  imgContainer.appendChild(img);

  const caption = document.createElement('div');
  caption.style.color = 'white';
  caption.style.marginTop = '15px';
  caption.style.fontSize = '1.1rem';
  caption.style.textAlign = 'center';
  imgContainer.appendChild(caption);

  modal.appendChild(imgContainer);

  let scale = 1;
  imgContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    scale += e.deltaY * -0.005;
    scale = Math.min(Math.max(1, scale), 5);
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (scale === 1) {
      img.style.transformOrigin = 'center center';
      img.style.cursor = 'zoom-in';
    } else if (e.deltaY < 0) {
      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.cursor = 'zoom-out';
    }
    img.style.transform = `scale(${scale})`;
  });

  imgContainer.onclick = (e) => {
    if (scale > 1) {
      scale = 1;
      img.style.transform = `scale(1)`;
      img.style.cursor = 'zoom-in';
    }
  };

  const prevBtn = document.createElement('button');
  prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  prevBtn.style.position = 'absolute';
  prevBtn.style.left = '5%';
  prevBtn.style.top = '50%';
  prevBtn.style.transform = 'translateY(-50%)';
  prevBtn.style.background = 'rgba(255,255,255,0.2)';
  prevBtn.style.border = 'none';
  prevBtn.style.color = 'white';
  prevBtn.style.fontSize = '2rem';
  prevBtn.style.width = '60px';
  prevBtn.style.height = '60px';
  prevBtn.style.borderRadius = '50%';
  prevBtn.style.cursor = 'pointer';
  prevBtn.style.display = 'flex';
  prevBtn.style.justifyContent = 'center';
  prevBtn.style.alignItems = 'center';
  prevBtn.onclick = (e) => {
    e.stopPropagation();
    scale = 1;
    img.style.transform = 'scale(1)';
    if (currentIndex > 0) {
      currentIndex--;
      updateImage();
    }
  };
  modal.appendChild(prevBtn);

  const nextBtn = document.createElement('button');
  nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  nextBtn.style.position = 'absolute';
  nextBtn.style.right = '5%';
  nextBtn.style.top = '50%';
  nextBtn.style.transform = 'translateY(-50%)';
  nextBtn.style.background = 'rgba(255,255,255,0.2)';
  nextBtn.style.border = 'none';
  nextBtn.style.color = 'white';
  nextBtn.style.fontSize = '2rem';
  nextBtn.style.width = '60px';
  nextBtn.style.height = '60px';
  nextBtn.style.borderRadius = '50%';
  nextBtn.style.cursor = 'pointer';
  nextBtn.style.display = 'flex';
  nextBtn.style.justifyContent = 'center';
  nextBtn.style.alignItems = 'center';
  nextBtn.onclick = (e) => {
    e.stopPropagation();
    scale = 1;
    img.style.transform = 'scale(1)';
    if (currentIndex < images.length - 1) {
      currentIndex++;
      updateImage();
    }
  };
  modal.appendChild(nextBtn);

  const updateImage = () => {
    img.src = images[currentIndex].src;
    caption.innerHTML = images[currentIndex].alt || '';
    prevBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
    nextBtn.style.display = currentIndex < images.length - 1 ? 'flex' : 'none';
  };

  modal.onclick = (e) => {
    if (e.target === modal || e.target === imgContainer) modal.remove();
  };

  const keyHandler = (e) => {
    if (!document.body.contains(modal)) {
      document.removeEventListener('keydown', keyHandler);
      return;
    }
    if (e.key === 'Escape') modal.remove();
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      currentIndex--;
      updateImage();
    }
    if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
      currentIndex++;
      updateImage();
    }
  };
  document.addEventListener('keydown', keyHandler);

  updateImage();
  document.body.appendChild(modal);
};

window.openTeacherGuideModal = function () {
  if (document.getElementById('teacherGuideModal')) return;
  const html = `
    <div id="teacherGuideModal" class="modal-overlay no-print" style="display: flex; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(10px); justify-content: center; align-items: center; z-index: 2000; opacity: 0; transition: opacity 0.3s ease;" data-action="close-modal-overlay">
      <div class="modal-content" style="background: white; border-radius: 12px; padding: 40px; max-width: 800px; width: 90%; max-height: 90vh; overflow-y: auto; color: #1e293b; position: relative; font-family: 'Outfit', sans-serif;">
        <button data-action="close-modal" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: #64748b; font-size: 18pt; cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
        
        <h2 style="font-family: 'Playfair Display', serif; color: #4f46e5; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; font-size: 2rem;">
          <i class="fa-solid fa-chalkboard-user"></i> Teacher & Tour Guide Instructions
        </h2>
        
        <p style="font-size: 1.1rem; line-height: 1.6;">Welcome to the GCSE Battlefield Tour App! This app is designed with a "Dual Interface" to keep pupils engaged while giving you, the teacher, all the information you need.</p>
        
        <h3 style="color: #334155; margin-top: 30px;"><i class="fa-solid fa-mobile-screen"></i> 1. The Pupil View vs. Teacher View</h3>
        <p style="font-size: 1.05rem; line-height: 1.6;">By default, the app is in <strong>Pupil Mode</strong>. They will see the timeline, photos, and interactive maps. However, they do NOT see the historical script or the answers to questions.</p>
        <p style="font-size: 1.05rem; line-height: 1.6;">As a teacher, you have access to the <strong>Tour Guide Script</strong>. On any day's page, click the blue button with the megaphone icon at the top. This opens your script, complete with timelines, key facts, and historical sources to read out loud to the pupils.</p>

        <h3 style="color: #334155; margin-top: 30px;"><i class="fa-solid fa-location-dot"></i> 2. Geo-Fenced "Missions" (Padlocks)</h3>
        <p style="font-size: 1.05rem; line-height: 1.6;">To prevent pupils from just scrolling through the entire trip while bored on the coach, many historical sites are <strong>Geo-Fenced</strong>. You will see a <i class="fa-solid fa-lock"></i> padlock icon next to these sites.</p>
        <p style="font-size: 1.05rem; line-height: 1.6;"><strong>How it works:</strong> When the pupils physically step off the coach and enter the boundaries of the cemetery or memorial, the app uses their phone's GPS to automatically unlock the site. This reveals a specific interactive "Mission" they must complete there (e.g., finding a specific grave, using their compass to find the direction of a gas attack).</p>
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 10px; border-radius: 4px;">
          <strong>Teacher's Fail-Safe:</strong> If a pupil's GPS is broken or offline, they can manually unlock their mission task. To do this, simply instruct the pupil to <strong>tap the padlock icon 4 times in quick succession</strong>. This will act as a secret override.
        </div>

        <h3 style="color: #334155; margin-top: 30px;"><i class="fa-solid fa-users"></i> 3. The Oral Storytelling Task (Tyne Cot & Langemarck)</h3>
        <p style="font-size: 1.05rem; line-height: 1.6;">At massive cemeteries like Tyne Cot, pupils can easily be overwhelmed by the numbers. To build empathy, the app assigns each pupil one specific, well-documented soldier to find (e.g., a Victoria Cross winner or a local Stubbington hero).</p>
        <p style="font-size: 1.05rem; line-height: 1.6;"><strong>Your Role:</strong> Let the pupils spread out to find their assigned graves and read the biography on their phones. At the end of the visit, gather them together and ask them to orally tell the rest of the group the story of "their" soldier.</p>
        
        <div style="margin-top: 40px; text-align: center;">
          <button class="btn-pedagogy-primary" data-action="close-modal" style="background: #4f46e5; color: white; padding: 10px 30px; font-size: 1.1rem; border-radius: 8px; border: none; cursor: pointer;">Got it!</button>
        </div>
      </div>
    </div>
    `;
  document.body.insertAdjacentHTML('beforeend', html);
  const modal = document.getElementById('teacherGuideModal');
  // Trigger reflow for animation
  void modal.offsetWidth;
  modal.style.opacity = '1';
};

window.openParentBriefingModal = function () {
  if (document.getElementById('parentBriefingModal')) return;

  const html = `
    <div id="parentBriefingModal" class="modal-overlay no-print" style="display: flex; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.92); backdrop-filter: blur(8px); justify-content: center; align-items: center; z-index: 999999; opacity: 0; transition: opacity 0.3s ease;">
      <div class="modal-content" style="background: #f8fafc; border-radius: 12px; width: 95vw; max-width: 1280px; max-height: 94vh; overflow-y: auto; color: #1e293b; position: relative; font-family: 'Outfit', sans-serif; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); border: 1px solid #cbd5e1; display: flex; flex-direction: column;">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: #ffffff; padding: 18px 24px; border-radius: 11px 11px 0 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; border-bottom: 3px solid #d97706;">
          <div>
            <div style="font-size: 0.85rem; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 2px;">
              Parent &amp; Pupil Expedition Briefing · Thursday 10th September (16:15)
            </div>
            <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 1.6rem; color: #ffffff; letter-spacing: 0.02em;">
              YPRES 1914–1918: REMEMBRANCE, SACRIFICE &amp; LOCAL HERITAGE
            </h2>
            <div style="font-size: 0.9rem; color: #cbd5e1; margin-top: 4px;">
              The History Department &amp; The History Boys · Led jointly by <strong>Department Lead</strong> &amp; <strong>Mr James Garrett</strong> · Accompanied by <strong>Fieldwork Staff</strong>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <a href="/pdfs/ypres_2026_parent_information_pack_v2.pdf" target="_blank" style="background: #fefce8; color: #b45309; border: 1.5px solid #fde047; padding: 7px 14px; border-radius: 6px; font-weight: 700; font-size: 0.82rem; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <i class="fa-solid fa-file-pdf" style="color: #dc2626;"></i> PDF Handout
            </a>
            <a href="/briefings/ypres_2026_parent_briefing.pptx" download="ypres_2026_parent_briefing.pptx" target="_blank" style="background: #f0fdf4; color: #166534; border: 1.5px solid #bbf7d0; padding: 7px 14px; border-radius: 6px; font-weight: 700; font-size: 0.82rem; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <i class="fa-solid fa-file-powerpoint" style="color: #ea580c;"></i> Slides (.pptx)
            </a>
            <button id="closeParentBriefingBtn" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: #ffffff; width: 36px; height: 36px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: all 0.2s;">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <!-- 3-Column Executive Presentation Slide -->
        <div style="padding: 22px; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px; flex: 1;">
          
          <!-- Column 1: Itinerary & Local Mission -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #1e3a8a; border-radius: 8px; padding: 18px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="background: #eff6ff; color: #1e3a8a; width: 28px; height: 28px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: 800; font-size: 0.85rem;">1</span>
              <h3 style="margin: 0; color: #1e3a8a; font-size: 1.1rem; font-family: 'Playfair Display', serif;">3-Day Itinerary &amp; Mission</h3>
            </div>
            
            <div style="margin-bottom: 12px; padding: 10px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #1e3a8a;">
              <strong style="color: #0f172a; font-size: 0.85rem;">Day 1 (Thu 1 Oct): North Salient &amp; Medical Care</strong>
              <p style="margin: 3px 0 0 0; font-size: 0.8rem; color: #475569; line-height: 1.35;">06:15 departure from school. Essex Farm ADS (John McCrae's bunker), Yorkshire Trench, Langemarck German Cemetery. Peace Village Hostel check-in &amp; 2-course dinner on-site.</p>
            </div>

            <div style="margin-bottom: 12px; padding: 10px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #b45309;">
              <strong style="color: #0f172a; font-size: 0.85rem;">Day 2 (Fri 2 Oct): Passchendaele &amp; Menin Gate</strong>
              <p style="margin: 3px 0 0 0; font-size: 0.8rem; color: #475569; line-height: 1.35;">Vancouver Corner, Hooge Crater preserved trenches, Sanctuary Wood, supermarket lunch stop, Tyne Cot Cemetery (finding our village fallen). 2-course dinner on-site at Peace Village, followed by the solemn <strong>8:00 PM Last Post Ceremony</strong> with school wreath laying.</p>
            </div>

            <div style="margin-bottom: 12px; padding: 10px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #0f766e;">
              <strong style="color: #0f172a; font-size: 0.85rem;">Day 3 (Sat 3 Oct): Ypres Town &amp; Journey Home</strong>
              <p style="margin: 3px 0 0 0; font-size: 0.8rem; color: #475569; line-height: 1.35;">In Flanders Fields Museum (Cloth Hall), Ypres Ramparts walk, supermarket lunch stop, Talbot House (Poperinge). Return to school approx. 20:30.</p>
            </div>

            <div style="background: #fefce8; border: 1px solid #fef08a; padding: 10px 12px; border-radius: 6px;">
              <strong style="color: #92400e; font-size: 0.82rem; display: block; margin-bottom: 2px;">🕊️ The Local Heritage Hook:</strong>
              <span style="font-size: 0.78rem; color: #78350f; line-height: 1.35;"><em>"How did three sons from one coastal Hampshire family answer the call across Gallipoli, Arras, and the Somme—and how did six young men from our quiet village come to rest upon the ramparts and mud of Flanders?"</em> Pupils will touch the carved names of our village fallen on Tyne Cot and Menin Gate.</span>
            </div>
          </div>

          <!-- Column 2: Food, Money & Rooming -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #b45309; border-radius: 8px; padding: 18px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="background: #fef3c7; color: #b45309; width: 28px; height: 28px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: 800; font-size: 0.85rem;">2</span>
              <h3 style="margin: 0; color: #b45309; font-size: 1.1rem; font-family: 'Playfair Display', serif;">Food, Money &amp; Accommodation</h3>
            </div>

            <div style="margin-bottom: 14px;">
              <strong style="color: #0f172a; font-size: 0.88rem; display: block; margin-bottom: 4px;">🍽️ Catering Arrangements:</strong>
              <ul style="margin: 0; padding-left: 16px; font-size: 0.82rem; color: #334155; line-height: 1.4;">
                <li><strong>Thursday Day 1:</strong> Pupils <strong>must bring a packed lunch</strong> &amp; travel snacks from home for coach/crossing.</li>
                <li><strong>Included Meals:</strong> Buffet breakfasts at hostel (Fri &amp; Sat mornings); 2-course evening group dinners on-site at Peace Village (Thu &amp; Fri).</li>
                <li><strong>Days 2 &amp; 3 Lunches:</strong> Supermarket packed lunch stops in Belgium.</li>
              </ul>
            </div>

            <div style="margin-bottom: 14px; background: #fffbeb; border: 1px solid #fde68a; padding: 10px 12px; border-radius: 6px;">
              <strong style="color: #92400e; font-size: 0.88rem; display: block; margin-bottom: 4px;">💶 Spending Money (€30–€40 Euros Cash):</strong>
              <p style="margin: 0; font-size: 0.82rem; color: #78350f; line-height: 1.4;">
                Pupils require <strong>€30 to €40 in cash (Euros)</strong>. Covers fresh supermarket lunches on Friday and Saturday, plus Belgian chocolates or small souvenirs.
              </p>
            </div>

            <div>
              <strong style="color: #0f172a; font-size: 0.88rem; display: block; margin-bottom: 4px;">🏨 Peace Village Hostel &amp; Rooming:</strong>
              <p style="margin: 0 0 6px 0; font-size: 0.82rem; color: #334155; line-height: 1.4;">
                Rural educational centre in Heuvelland with secure keycards and en-suite rooms (typically 4–7 pupils with bunk beds).
              </p>
              <div style="background: #f1f5f9; border-left: 3px solid #0284c7; padding: 8px 10px; border-radius: 4px; font-size: 0.78rem; color: #0369a1; line-height: 1.35;">
                <strong>Rooming &amp; Dietary Timeline:</strong> Friend preference requests and dietary requirements (e.g. vegetarian evening meals) gathered in school in approx. <strong>two weeks' time</strong> (medical allergies already on record).
              </div>
            </div>
          </div>

          <!-- Column 3: Essential Kit & Forms -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #15803d; border-radius: 8px; padding: 18px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="background: #dcfce7; color: #15803d; width: 28px; height: 28px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: 800; font-size: 0.85rem;">3</span>
              <h3 style="margin: 0; color: #15803d; font-size: 1.1rem; font-family: 'Playfair Display', serif;">Essential Kit &amp; Next Steps</h3>
            </div>

            <div style="margin-bottom: 14px;">
              <strong style="color: #0f172a; font-size: 0.88rem; display: block; margin-bottom: 4px;">🥾 Practical Clothing &amp; Kit:</strong>
              <ul style="margin: 0; padding-left: 16px; font-size: 0.82rem; color: #334155; line-height: 1.4;">
                <li><strong>Sturdy Walking Boots:</strong> Waterproof &amp; broken-in. Ground and duckboards can be slippery.</li>
                <li><strong>Waterproof Raincoat:</strong> Windproof with hood.</li>
                <li><strong>Warm Hat &amp; Gloves:</strong> Mandatory for standing at 8pm Menin Gate ceremony.</li>
                <li><strong>Casual Clothes:</strong> Comfortable clothing for hostel downtime (no formal dress needed).</li>
              </ul>
            </div>

            <div style="margin-bottom: 14px;">
              <strong style="color: #0f172a; font-size: 0.88rem; display: block; margin-bottom: 4px;">📄 Travel Documents &amp; Mobiles:</strong>
              <ul style="margin: 0; padding-left: 16px; font-size: 0.82rem; color: #334155; line-height: 1.4;">
                <li><strong>Passports &amp; GHIC/EHIC:</strong> Collected in advance tonight at briefing (or this week).</li>
                <li><strong>European 2-Pin Adapter:</strong> For charging devices.</li>
                <li><strong>Mobile Phone Bag:</strong> Handed in each evening at curfew/bedtime for a restful night.</li>
              </ul>
            </div>

            <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 10px 12px; border-radius: 6px;">
              <strong style="color: #991b1b; font-size: 0.82rem; display: block; margin-bottom: 2px;">⚠️ Action Checklist:</strong>
              <span style="font-size: 0.78rem; color: #7f1d1d; line-height: 1.35;">Return signed <strong>Code of Conduct Agreement Form</strong> by <strong>Friday 25th September</strong>. Ensure passport &amp; GHIC are handed in.</span>
            </div>
          </div>

        </div>

        <!-- Footer Bar -->
        <div style="background: #0f172a; color: #ffffff; padding: 12px 24px; border-radius: 0 0 11px 11px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; font-size: 0.82rem;">
          <div>
            <span style="color: #38bdf8; font-weight: 700;">🌐 Web App:</span> the-history-revision-hub.netlify.app &nbsp;|&nbsp;
            <span style="color: #fbbf24; font-weight: 700;">24/7 School Base:</span> +44 (0)1329 662182
          </div>
          <div style="color: #94a3b8; font-size: 0.78rem;">
            Press <strong>Esc</strong> or click anywhere outside to close this briefing slide
          </div>
        </div>

      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
  const modal = document.getElementById('parentBriefingModal');

  const closeBtn = document.getElementById('closeParentBriefingBtn');
  const closeModal = () => {
    window.removeEventListener('keydown', keyHandler);
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 250);
  };

  const keyHandler = (e) => {
    if (e.key === 'Escape') closeModal();
  };
  window.addEventListener('keydown', keyHandler);

  if (closeBtn) closeBtn.onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  // Trigger reflow & fade in
  void modal.offsetWidth;
  modal.style.opacity = '1';
};

window.openTeacherPrintPreview = function (fileBaseName, title, pdfUrl) {
  let htmlUrl = fileBaseName;
  if (!htmlUrl.startsWith('/') && !htmlUrl.startsWith('http')) {
    if (fileBaseName.includes('mastery')) {
      const normalized = fileBaseName.replace('cme_mastery_pack_', 'cme_mastery_');
      htmlUrl = `/units/cme_new/booklets/${normalized}.html`;
    } else {
      htmlUrl = `/units/cme_new/printables/${fileBaseName}.html`;
    }
  }

  if (!pdfUrl) {
    const pdfBase = fileBaseName
      .replace('/units/cme_new/booklets/', '')
      .replace('.html', '')
      .replace('cme_mastery_', 'cme_mastery_pack_');
    pdfUrl = `/pdfs/cme_new/${pdfBase}.pdf`;
  }

  // Remove existing modal if any
  const existing = document.getElementById('teacherPrintPreviewModal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'teacherPrintPreviewModal';
  overlay.className = 'modal-overlay no-print';
  overlay.style.cssText =
    'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); z-index: 99999; display: flex; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.25s ease;';

  overlay.innerHTML = `
    <div class="modal-content" style="background: #0f172a; border: 1px solid #334155; border-radius: 12px; width: 94vw; max-width: 1350px; height: 92vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); transform: scale(0.97); transition: transform 0.25s ease; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;">
      
      <!-- Modal Header -->
      <div style="background: #1e293b; border-bottom: 1px solid #334155; padding: 14px 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 38px; height: 38px; border-radius: 8px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 1.15rem; box-shadow: 0 2px 8px rgba(2,132,199,0.35);">
            <i class="fa-solid fa-print"></i>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; background: rgba(14, 165, 233, 0.2); color: #38bdf8; padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(56, 189, 248, 0.3);">Teacher Planning Hub</span>
              <span style="font-size: 0.7rem; font-weight: 600; color: #94a3b8;">Classroom Set Print Preview</span>
            </div>
            <h3 style="margin: 2px 0 0 0; color: #f8fafc; font-size: 1.25rem; font-weight: 700; letter-spacing: -0.01em;">${title || 'Classroom Print Preview'}</h3>
          </div>
        </div>

        <!-- Action Controls -->
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <button id="teacherPrintModalTrigger" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; border: none; font-weight: 700; font-size: 0.9rem; padding: 9px 18px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 14px rgba(37,99,235,0.4); transition: all 0.2s ease;">
            <i class="fa-solid fa-print"></i> Print Class Set
          </button>
          
          <a href="${pdfUrl}" target="_blank" download style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); font-weight: 600; font-size: 0.88rem; padding: 8px 14px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;">
            <i class="fa-solid fa-file-pdf"></i> High-Res PDF
          </a>

          <a href="${htmlUrl}" target="_blank" style="background: rgba(255, 255, 255, 0.08); color: #e2e8f0; border: 1px solid rgba(255, 255, 255, 0.15); font-weight: 600; font-size: 0.88rem; padding: 8px 14px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Full Tab
          </a>

          <button id="teacherPrintModalClose" style="background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.1); color: #94a3b8; font-size: 1.1rem; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- Iframe Container with Loading Indicator -->
      <div style="flex: 1; position: relative; background: #334155; overflow: hidden; display: flex; align-items: center; justify-content: center;">
        <div id="teacherIframeLoader" style="position: absolute; display: flex; flex-direction: column; align-items: center; gap: 12px; color: #94a3b8; font-size: 0.95rem; z-index: 1;">
          <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2rem; color: #38bdf8;"></i>
          <span>Rendering high-fidelity print layout...</span>
        </div>
        <iframe id="teacherPreviewIframe" src="${htmlUrl}" style="width: 100%; height: 100%; border: none; background: #ffffff; position: relative; z-index: 2; opacity: 0; transition: opacity 0.2s ease;"></iframe>
      </div>

      <!-- Footer Bar with Teacher Print Instructions -->
      <div style="background: #1e293b; border-top: 1px solid #334155; padding: 10px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; font-size: 0.82rem; color: #94a3b8;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-lightbulb" style="color: #facc15;"></i>
          <span><strong>Teacher Tip:</strong> The print stylesheet automatically handles page sizing (A3 Landscape for Placemats, A4 Portrait for Workouts, A4 Landscape for Trifolds). Ensure <em>"Background graphics"</em> is checked in your browser's print dialog.</span>
        </div>
        <div style="color: #64748b; font-size: 0.78rem;">
          Press <kbd style="background: #334155; color: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace;">Esc</kbd> to close
        </div>
      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  const iframe = overlay.querySelector('#teacherPreviewIframe');
  const loader = overlay.querySelector('#teacherIframeLoader');
  const modalContent = overlay.querySelector('.modal-content');

  iframe.onload = () => {
    iframe.style.opacity = '1';
    if (loader) loader.style.display = 'none';
  };

  const closeModal = () => {
    window.removeEventListener('keydown', handleKeyDown);
    overlay.style.opacity = '0';
    modalContent.style.transform = 'scale(0.97)';
    setTimeout(() => overlay.remove(), 250);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
  };
  window.addEventListener('keydown', handleKeyDown);

  const closeBtn = overlay.querySelector('#teacherPrintModalClose');
  if (closeBtn) closeBtn.onclick = closeModal;

  overlay.onclick = (e) => {
    if (e.target === overlay) closeModal();
  };

  const printBtn = overlay.querySelector('#teacherPrintModalTrigger');
  if (printBtn) {
    printBtn.onclick = () => {
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }
    };
  }

  // Animate in
  void overlay.offsetWidth;
  overlay.style.opacity = '1';
  modalContent.style.transform = 'scale(1)';
};

/**
 * ============================================================================
 * Emergency Cover Generator Modal (Teacher Planning Hub)
 * Allows the teacher to instantly generate a 1-period or 2-period cover plan
 * with scannable QR codes, exact workbook page references or paper-only tasks,
 * printable A4 sheet, and one-click copy text for email/VLE.
 * ============================================================================
 */
window.openEmergencyCoverModal = async function (initialUnitId, initialUnitData) {
  // Staff Privacy Guard for Netlify deployment
  const isLocal =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const hasStoredAuth =
    localStorage.getItem('history_hub_teacher_mode') === 'true' ||
    localStorage.getItem('history_chess_teacher_auth') === 'true';

  if (!isLocal && !hasStoredAuth) {
    const entered = prompt('History Department Staff Verification: Enter Passkey:');
    if (
      entered &&
      (entered.trim().toLowerCase() === 'drake.30' || entered.trim().toLowerCase() === 'drake.30!')
    ) {
      localStorage.setItem('history_hub_teacher_mode', 'true');
      window.isTeacherMode = true;
      const headerBtn = document.getElementById('btn-cover-modal');
      if (headerBtn) headerBtn.style.display = 'inline-flex';
      const sidebarBtn = document.getElementById('nav-cover-generator');
      if (sidebarBtn) sidebarBtn.style.display = 'flex';
    } else {
      if (entered !== null) {
        alert('Access restricted to authorized teaching staff.');
      }
      return;
    }
  }

  const existing = document.getElementById('emergencyCoverModal');
  if (existing) existing.remove();

  // Load database for lesson titles and units
  let db = window.cachedDatabase;
  if (!db) {
    try {
      const res = await fetch('/database.json');
      db = await res.json();
      window.cachedDatabase = db;
    } catch (e) {
      console.warn('Could not fetch database.json, using fallback data:', e);
      db = {};
    }
  }

  const TIMETABLE_DATA = {
    'Week A': {
      Monday: [
        {
          period: 'Period 1',
          time: '09:10 - 10:05',
          type: 'lesson',
          raw: 'Set 11aHiD\nHistory\n(7)',
        },
        {
          period: 'Period 2',
          time: '10:25 - 11:20',
          type: 'lesson',
          raw: 'Set 7XHi\nHistory\n(18)',
        },
        {
          period: 'Period 3',
          time: '11:20 - 12:15',
          type: 'lesson',
          raw: 'Set 9yHi\nHistory\n(20)',
        },
        { period: 'Period 4', time: '12:15 - 13:10', type: 'hub', raw: 'Hub Supervision' },
        {
          period: 'Period 5',
          time: '14:00 - 14:55',
          type: 'lesson',
          raw: 'Set 11aHiC\nHistory\n(5)',
        },
        {
          period: 'Period 6',
          time: '14:55 - 15:50',
          type: 'lesson',
          raw: 'Set 10aHiB\nHistory\n(7)',
        },
      ],
      Tuesday: [
        {
          period: 'Period 1',
          time: '09:10 - 10:05',
          type: 'lesson',
          raw: 'Set 11aHiC\nHistory\n(5)',
        },
        { period: 'Period 2', time: '10:25 - 11:20', type: 'hub', raw: 'Hub Supervision' },
        {
          period: 'Period 4',
          time: '12:15 - 13:10',
          type: 'lesson',
          raw: 'Set 8yHi\nHistory\n(11)',
        },
        {
          period: 'Period 5',
          time: '14:00 - 14:55',
          type: 'lesson',
          raw: 'Set 11aHiD\nHistory\n(7)',
        },
      ],
      Wednesday: [
        {
          period: 'Period 1',
          time: '09:10 - 10:05',
          type: 'lesson',
          raw: 'Set 10aHiB\nHistory\n(7)',
        },
        {
          period: 'Period 2',
          time: '10:25 - 11:20',
          type: 'lesson',
          raw: 'Set 11aHiD\nHistory\n(7)',
        },
        {
          period: 'Period 3',
          time: '11:20 - 12:15',
          type: 'lesson',
          raw: 'Set 10aHiB\nHistory\n(7)',
        },
        { period: 'Period 4', time: '12:15 - 13:10', type: 'hub', raw: 'Hub Supervision' },
        {
          period: 'Period 5',
          time: '14:00 - 14:55',
          type: 'lesson',
          raw: 'Set 11aHiD\nHistory\n(7)',
        },
      ],
      Thursday: [
        {
          period: 'Period 1',
          time: '09:10 - 10:05',
          type: 'lesson',
          raw: 'Set 8xHi\nHistory\n(11)',
        },
        {
          period: 'Period 2',
          time: '10:25 - 11:20',
          type: 'lesson',
          raw: 'Set 11aHiC\nHistory\n(5)',
        },
        {
          period: 'Period 3',
          time: '11:20 - 12:15',
          type: 'lesson',
          raw: 'Set 9xHi\nHistory\n(19)',
        },
        { period: 'Period 4', time: '12:15 - 13:10', type: 'hub', raw: 'Hub Supervision' },
        {
          period: 'Period 5',
          time: '14:00 - 14:55',
          type: 'lesson',
          raw: 'Set 7YHi\nHistory\n(17)',
        },
        { period: 'Period 6', time: '14:55 - 15:50', type: 'club', raw: 'Chess Club' },
      ],
      Friday: [
        {
          period: 'Period 1',
          time: '09:10 - 10:05',
          type: 'lesson',
          raw: 'Set 10aHiB\nHistory\n(7)',
        },
        {
          period: 'Period 2',
          time: '10:25 - 11:20',
          type: 'lesson',
          raw: 'Set 11aHiC\nHistory\n(5)',
        },
        {
          period: 'Period 3',
          time: '11:20 - 12:15',
          type: 'lesson',
          raw: 'Set 9yHi\nHistory\n(20)',
        },
        {
          period: 'Period 4',
          time: '12:15 - 13:10',
          type: 'lesson',
          raw: 'Set 10aHiB\nHistory\n(7)',
        },
        { period: 'Period 5', time: '14:00 - 14:55', type: 'hub', raw: 'Hub Supervision' },
        {
          period: 'Period 6',
          time: '14:55 - 15:50',
          type: 'lesson',
          raw: 'Set 8yHi\nHistory\n(11)',
        },
      ],
    },
    'Week B': {
      Monday: [
        { period: 'Period 1', time: '09:10 - 10:05', type: 'hub', raw: 'Hub Supervision' },
        {
          period: 'Period 3',
          time: '11:20 - 12:15',
          type: 'lesson',
          raw: 'Set 9yHi\nHistory\n(20)',
        },
        {
          period: 'Period 4',
          time: '12:15 - 13:10',
          type: 'lesson',
          raw: 'Set 11aHiD\nHistory\n(7)',
        },
        {
          period: 'Period 5',
          time: '14:00 - 14:55',
          type: 'lesson',
          raw: 'Set 10aHiB\nHistory\n(7)',
        },
        {
          period: 'Period 6',
          time: '14:55 - 15:50',
          type: 'lesson',
          raw: 'Set 11aHiC\nHistory\n(5)',
        },
      ],
      Tuesday: [
        {
          period: 'Period 2',
          time: '10:25 - 11:20',
          type: 'lesson',
          raw: 'Set 7XHi\nHistory\n(18)',
        },
        { period: 'Period 3', time: '11:20 - 12:15', type: 'hub', raw: 'Hub Supervision' },
        {
          period: 'Period 4',
          time: '12:15 - 13:10',
          type: 'lesson',
          raw: 'Set 7YHi\nHistory\n(17)',
        },
        {
          period: 'Period 6',
          time: '14:55 - 15:50',
          type: 'lesson',
          raw: 'Set 11aHiD\nHistory\n(7)',
        },
      ],
      Wednesday: [
        {
          period: 'Period 1',
          time: '09:10 - 10:05',
          type: 'lesson',
          raw: 'Set 10aHiB\nHistory\n(7)',
        },
        {
          period: 'Period 3',
          time: '11:20 - 12:15',
          type: 'lesson',
          raw: 'Set 11aHiD\nHistory\n(7)',
        },
        {
          period: 'Period 4',
          time: '12:15 - 13:10',
          type: 'lesson',
          raw: 'Set 11aHiC\nHistory\n(5)',
        },
        {
          period: 'Period 6',
          time: '14:55 - 15:50',
          type: 'lesson',
          raw: 'Set 8yHi\nHistory\n(11)',
        },
      ],
      Thursday: [
        {
          period: 'Period 1',
          time: '09:10 - 10:05',
          type: 'lesson',
          raw: 'Set 9xHi\nHistory\n(19)',
        },
        {
          period: 'Period 2',
          time: '10:25 - 11:20',
          type: 'lesson',
          raw: 'Set 8xHi\nHistory\n(11)',
        },
        { period: 'Period 3', time: '11:20 - 12:15', type: 'hub', raw: 'Hub Supervision' },
        {
          period: 'Period 5',
          time: '14:00 - 14:55',
          type: 'lesson',
          raw: 'Set 11aHiC\nHistory\n(5)',
        },
        { period: 'Period 6', time: '14:55 - 15:50', type: 'club', raw: 'Chess Club' },
      ],
      Friday: [
        {
          period: 'Period 1',
          time: '09:10 - 10:05',
          type: 'lesson',
          raw: 'Set 8xHi\nHistory\n(11)',
        },
        {
          period: 'Period 2',
          time: '10:25 - 11:20',
          type: 'lesson',
          raw: 'Set 9xHi\nHistory\n(19)',
        },
        {
          period: 'Period 3',
          time: '11:20 - 12:15',
          type: 'lesson',
          raw: 'Set 7YHi\nHistory\n(17)',
        },
        {
          period: 'Period 4',
          time: '12:15 - 13:10',
          type: 'lesson',
          raw: 'Set 7XHi\nHistory\n(18)',
        },
        { period: 'Period 5', time: '14:00 - 14:55', type: 'hub', raw: 'Hub Supervision' },
      ],
    },
    duties: {
      Monday: [],
      Tuesday: [],
      Wednesday: [{ time: '13:10 - 13:30', duty: 'Lunch Hall Duty' }],
      Thursday: [
        {
          time: '13:10 - 13:35',
          duty: 'Lunch Duty Zone 1 (Classrooms, Gym Toilets, Changing Toilets)',
        },
      ],
      Friday: [{ time: '13:10 - 13:30', duty: 'Lunch Hall Duty' }],
    },
  };

  const ALL_UNITS = [
    // GCSE History
    {
      id: 'edexcel_medicine',
      title: 'Paper 1: Medicine Through Time (1250–present)',
      group: 'GCSE History',
    },
    {
      id: 'cme_new',
      title: 'Paper 2: Conflict in the Middle East (1945–1995)',
      group: 'GCSE History',
    },
    { id: 'eee', title: 'Paper 2: Early Elizabethan England (1558–1588)', group: 'GCSE History' },
    {
      id: 'weimar_nazi_germany',
      title: 'Paper 3: Weimar & Nazi Germany (1918–1939)',
      group: 'GCSE History',
    },
    {
      id: 'usa',
      title: 'Paper 3: Conflict at Home and Abroad: USA (1954–1975)',
      group: 'GCSE History',
    },
    {
      id: 'trip_ypres',
      title: 'GCSE Battlefield Tour: Ypres & The Salient',
      group: 'GCSE History',
    },
    // Key Stage 3
    { id: 'medieval_england', title: 'KS3: Medieval England (1066–1485)', group: 'Key Stage 3' },
    {
      id: 'early_modern_world',
      title: 'KS3: Early Modern World & Encounters (1450–1750)',
      group: 'Key Stage 3',
    },
    {
      id: 'industrialisation_and_empire',
      title: 'KS3: Industrialisation, Empire & Power (1750–1900)',
      group: 'Key Stage 3',
    },
    { id: 'great_war', title: 'KS3: Causes of the Great War', group: 'Key Stage 3' },
    { id: 'great_war_part2', title: 'KS3: The Great War (1914–1919)', group: 'Key Stage 3' },
    { id: 'the_shoah', title: 'KS3: The Shoah / Holocaust', group: 'Key Stage 3' },
    {
      id: 'post_war_britain',
      title: 'KS3: Rights, Protest & Post-War Britain (1900–Present)',
      group: 'Key Stage 3',
    },
    { id: 'cold_war', title: 'KS3: The Cold War', group: 'Key Stage 3' },
    { id: 'australia', title: 'KS3: History of Australia', group: 'Key Stage 3' },
    {
      id: 'water_and_sanitation',
      title: 'KS3: Water & Sanitation Through Time',
      group: 'Key Stage 3',
    },
  ];

  const DEFAULT_SET_MAPPING = {
    'Set 7XHi': {
      year: 'Year 7',
      unit: 'water_and_sanitation',
      unit_name: 'KS3: Water & Sanitation Through Time',
      default_lesson: 1,
      default_topic: 'Why did public health decline during the Middle Ages?',
      default_resource: 'workbooks',
      default_shelf: true,
      default_collection: 'collect',
    },
    'Set 7YHi': {
      year: 'Year 7',
      unit: 'water_and_sanitation',
      unit_name: 'KS3: Water & Sanitation Through Time',
      default_lesson: 1,
      default_topic: 'Why did public health decline during the Middle Ages?',
      default_resource: 'workbooks',
      default_shelf: true,
      default_collection: 'collect',
    },
    'Set 8xHi': {
      year: 'Year 8',
      unit: 'industrialisation_and_empire',
      unit_name: 'KS3: Industrialisation, Empire & Power (1750–1900)',
      default_lesson: 0,
      default_topic: 'The Agricultural Revolution & Origins of Industry',
      default_resource: 'workbooks',
      default_shelf: true,
      default_collection: 'collect',
    },
    'Set 8yHi': {
      year: 'Year 8',
      unit: 'industrialisation_and_empire',
      unit_name: 'KS3: Industrialisation, Empire & Power (1750–1900)',
      default_lesson: 0,
      default_topic: 'The Agricultural Revolution & Origins of Industry',
      default_resource: 'workbooks',
      default_shelf: true,
      default_collection: 'collect',
    },
    'Set 9xHi': {
      year: 'Year 9',
      unit: 'great_war',
      unit_name: 'KS3: Causes of the Great War',
      default_lesson: 2,
      default_topic: "To what extent did the 'Scramble for Africa' increase tension in Europe?",
      default_resource: 'workbooks',
      default_shelf: true,
      default_collection: 'collect',
    },
    'Set 9yHi': {
      year: 'Year 9',
      unit: 'great_war',
      unit_name: 'KS3: Causes of the Great War',
      default_lesson: 2,
      default_topic: "To what extent did the 'Scramble for Africa' increase tension in Europe?",
      default_resource: 'workbooks',
      default_shelf: true,
      default_collection: 'collect',
    },
    'Set 10aHiB': {
      year: 'Year 10',
      unit: 'cme_new',
      unit_name: 'Paper 2: Conflict in the Middle East (1945–1995)',
      default_lesson: 2,
      default_topic: 'KT 1.2: The Aftermath of the 1948–49 War & The Palestinian Refugee Crisis',
      default_resource: 'workbooks',
      default_shelf: false,
      default_collection: 'folders',
    },
    'Set 11aHiC': {
      year: 'Year 11',
      unit: 'edexcel_medicine',
      unit_name: 'Paper 1: Medicine Through Time (1250–present)',
      default_lesson: 5,
      default_topic:
        'KT2.1: The New Spirit of Enquiry: Humanism, The Printing Press & The Royal Society (c1500–c1700)',
      default_resource: 'workbooks',
      default_shelf: true,
      default_collection: 'folders',
    },
    'Set 11aHiD': {
      year: 'Year 11',
      unit: 'edexcel_medicine',
      unit_name: 'Paper 1: Medicine Through Time (1250–present)',
      default_lesson: 5,
      default_topic:
        'KT2.1: The New Spirit of Enquiry: Humanism, The Printing Press & The Royal Society (c1500–c1700)',
      default_resource: 'laptops',
      default_shelf: false,
      default_collection: 'folders',
    },
  };

  const DEFAULT_PREVIOUS_COVERS = {
    'Set 7XHi': {
      unitId: 'water_and_sanitation',
      lessonIdx: 0,
      dateStr: '18 Sep',
      fullDateStr: 'Friday, 18 September 2026',
    },
    'Set 7YHi': {
      unitId: 'water_and_sanitation',
      lessonIdx: 0,
      dateStr: '18 Sep',
      fullDateStr: 'Friday, 18 September 2026',
    },
    'Set 8xHi': {
      unitId: 'industrialisation_and_empire',
      lessonIdx: 0,
      dateStr: '18 Sep',
      fullDateStr: 'Friday, 18 September 2026',
    },
    'Set 8yHi': {
      unitId: 'industrialisation_and_empire',
      lessonIdx: 0,
      dateStr: '18 Sep',
      fullDateStr: 'Friday, 18 September 2026',
    },
    'Set 9xHi': {
      unitId: 'great_war',
      lessonIdx: 1,
      dateStr: '18 Sep',
      fullDateStr: 'Friday, 18 September 2026',
    },
    'Set 9yHi': {
      unitId: 'great_war',
      lessonIdx: 1,
      dateStr: '18 Sep',
      fullDateStr: 'Friday, 18 September 2026',
    },
    'Set 10aHiB': {
      unitId: 'cme_new',
      lessonIdx: 1,
      dateStr: '17 Sep',
      fullDateStr: 'Thursday, 17 September 2026',
    },
    'Set 11aHiC': {
      unitId: 'edexcel_medicine',
      lessonIdx: 4,
      dateStr: '18 Sep',
      fullDateStr: 'Friday, 18 September 2026',
    },
    'Set 11aHiD': {
      unitId: 'edexcel_medicine',
      lessonIdx: 4,
      dateStr: '18 Sep',
      fullDateStr: 'Friday, 18 September 2026',
    },
  };

  const HUB_BASE_URL = 'https://the-history-revision-hub.netlify.app';

  // 1. Dynamic UK Academic Calendar Week Calculation
  // Academic Reference: Monday 7 September 2026 is Week A (Term start)
  const getAcademicWeekForDate = (targetDate) => {
    const refMonday = new Date(2026, 8, 7); // Monday 7 Sept 2026 is Week A
    const d = new Date(targetDate);
    const day = d.getDay();
    const diffToMon = (day === 0 ? -6 : 1) - day;
    d.setDate(d.getDate() + diffToMon);
    d.setHours(0, 0, 0, 0);
    const diffWeeks = Math.round((d.getTime() - refMonday.getTime()) / (7 * 24 * 60 * 60 * 1000));
    return Math.abs(diffWeeks) % 2 === 0 ? 'Week A' : 'Week B';
  };

  // Helper to compute target date object given day name & target academic week
  const getTargetDateObj = (dayName, targetWeek) => {
    const d = new Date();
    const curDay = d.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
    const mondayOffset = curDay === 0 ? 1 : curDay === 6 ? 2 : 1 - curDay;
    const targetMonday = new Date(d);
    targetMonday.setDate(d.getDate() + mondayOffset);
    targetMonday.setHours(0, 0, 0, 0);

    const baseWeek = getAcademicWeekForDate(targetMonday);
    if (targetWeek && targetWeek !== baseWeek) {
      targetMonday.setDate(targetMonday.getDate() + 7);
    }

    const dayOffsets = { Monday: 0, Tuesday: 1, Wednesday: 2, Thursday: 3, Friday: 4 };
    const offset = dayOffsets[dayName] !== undefined ? dayOffsets[dayName] : 0;
    const res = new Date(targetMonday);
    res.setDate(targetMonday.getDate() + offset);
    return res;
  };

  const formatTargetDate = (d) => {
    const day = d.getDate();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Determine initial day & week
  const now = new Date();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIdx = now.getDay();
  const currentHour = now.getHours();

  let currentDay = 'Monday';
  if (todayIdx === 0 || todayIdx === 6) {
    currentDay = 'Monday';
  } else if (currentHour >= 15) {
    if (todayIdx === 5) {
      currentDay = 'Monday';
    } else {
      currentDay = daysOfWeek[todayIdx + 1];
    }
  } else {
    currentDay = daysOfWeek[todayIdx];
  }

  const initialTargetDate = getTargetDateObj(currentDay);
  let currentWeek = getAcademicWeekForDate(initialTargetDate);

  let defaultResourceMode = 'workbooks'; // 'workbooks' or 'paper'
  let defaultShelfMode = true; // whether workbooks are handed out from shelf & returned at end
  let defaultCollectionMode = 'collect'; // 'collect', 'folders', 'digital'
  let includePolicyNotes = true;
  let selectedUnits = {}; // Maps periodIndex -> unitId
  let selectedLessons = {}; // Maps periodIndex -> lessonIdx
  let periodSettings = {}; // Maps `${currentDay}_${pIdx}` -> { resource, shelf, collection }
  let currentDispatchPayload = null;
  let expandedSettings = {}; // Maps pIdx -> boolean for revealing detailed per-period settings
  const sessionCoverHistory = {}; // Maps `${week}_${day}_${setName}` -> { unitId, lessonIdx, topic, dayName, dateStr }

  const getYearBadge = (setName) => {
    const def = (setName && DEFAULT_SET_MAPPING[setName]) || {};
    const year = def.year || '';
    if (year.includes('8') || (setName && setName.includes('8'))) {
      return {
        label: 'Year 8',
        bg: 'rgba(245, 158, 11, 0.16)',
        border: 'rgba(245, 158, 11, 0.4)',
        color: '#fbbf24',
      };
    }
    if (year.includes('9') || (setName && setName.includes('9'))) {
      return {
        label: 'Year 9',
        bg: 'rgba(59, 130, 246, 0.16)',
        border: 'rgba(59, 130, 246, 0.4)',
        color: '#60a5fa',
      };
    }
    if (year.includes('10') || (setName && setName.includes('10'))) {
      return {
        label: 'GCSE Year 10',
        bg: 'rgba(16, 185, 129, 0.16)',
        border: 'rgba(16, 185, 129, 0.4)',
        color: '#34d399',
      };
    }
    if (year.includes('11') || (setName && setName.includes('11'))) {
      return {
        label: 'GCSE Year 11',
        bg: 'rgba(168, 85, 247, 0.16)',
        border: 'rgba(168, 85, 247, 0.4)',
        color: '#c084fc',
      };
    }
    return {
      label: year || 'History Class',
      bg: 'rgba(148, 163, 184, 0.16)',
      border: 'rgba(148, 163, 184, 0.35)',
      color: '#cbd5e1',
    };
  };

  const getPeriodSetting = (pIdx, setName) => {
    const key = `${currentDay}_${pIdx}`;
    if (!periodSettings[key]) {
      if (setName && periodSettings[setName]) {
        periodSettings[key] = { ...periodSettings[setName] };
      } else {
        const def = (setName && DEFAULT_SET_MAPPING[setName]) || {};
        periodSettings[key] = {
          resource: def.default_resource || defaultResourceMode,
          shelf: def.default_shelf !== undefined ? def.default_shelf : defaultShelfMode,
          collection: def.default_collection || defaultCollectionMode,
        };
      }
    }
    return periodSettings[key];
  };

  const setPeriodSetting = (pIdx, setName, updates) => {
    const key = `${currentDay}_${pIdx}`;
    if (!periodSettings[key]) {
      periodSettings[key] = { ...getPeriodSetting(pIdx, setName) };
    }
    Object.assign(periodSettings[key], updates);
    if (setName) {
      if (!periodSettings[setName]) periodSettings[setName] = {};
      Object.assign(periodSettings[setName], updates);
    }
  };

  // 2. Local Storage Helpers for Topic Persistence & Multi-day Cover Memory
  const getSavedTopics = () => {
    try {
      return JSON.parse(localStorage.getItem('history_cover_last_topics') || '{}');
    } catch (e) {
      return {};
    }
  };

  const saveTopicForSet = (setName, unitId, lessonIdx) => {
    try {
      const topics = getSavedTopics();
      topics[setName] = { unit: unitId, lesson: lessonIdx };
      localStorage.setItem('history_cover_last_topics', JSON.stringify(topics));
    } catch (e) {}
  };

  const getRecentCoverLog = () => {
    try {
      return JSON.parse(localStorage.getItem('history_cover_recent_log') || '[]');
    } catch (e) {
      return [];
    }
  };

  const saveToCoverLog = (entry) => {
    try {
      let log = getRecentCoverLog();
      log = log.filter(
        (item) => !(item.dateStr === entry.dateStr && item.dayName === entry.dayName),
      );
      log.unshift(entry);
      if (log.length > 10) log = log.slice(0, 10);
      localStorage.setItem('history_cover_recent_log', JSON.stringify(log));
    } catch (e) {}
  };

  const wipeAbsenceMemory = () => {
    try {
      localStorage.removeItem('history_cover_recent_log');
      localStorage.removeItem('history_cover_last_topics');
    } catch (e) {}
  };

  // Helper to get lessons for a unit
  const getUnitLessons = (unitId) => {
    if (db && db[unitId] && db[unitId].data && db[unitId].data.lessons) {
      return db[unitId].data.lessons;
    }
    if (db && db[unitId] && db[unitId].lessons) {
      return db[unitId].lessons;
    }
    return [];
  };

  const getUnitTitle = (unitId) => {
    const u = ALL_UNITS.find((item) => item.id === unitId);
    if (u) return u.title;
    if (db && db[unitId] && db[unitId].data && db[unitId].data.title) {
      return db[unitId].data.title;
    }
    return unitId;
  };

  // Helper to generate the 10 timetable days across the 2-week cycle
  const get10DaysList = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const weeks = ['Week A', 'Week B'];
    const nowDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(nowDate.getDate() + 1);

    const isSameDate = (d1, d2) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    const shortMonths = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const list = [];
    weeks.forEach((w) => {
      days.forEach((d) => {
        const dateObj = getTargetDateObj(d, w);
        const dayNum = dateObj.getDate();
        const monStr = shortMonths[dateObj.getMonth()];
        const isToday = isSameDate(dateObj, nowDate);
        const isTom = isSameDate(dateObj, tomorrowDate);
        list.push({
          week: w,
          day: d,
          shortCode: `${d.slice(0, 3)} ${w.slice(-1)}`,
          dateLabel: `${dayNum} ${monStr}`,
          isToday: isToday,
          isTomorrow: isTom,
          dateObj: dateObj,
        });
      });
    });
    return list;
  };

  // Create High-Contrast, Modern Dark Slate Modal Overlay
  const overlay = document.createElement('div');
  overlay.id = 'emergencyCoverModal';
  overlay.className = 'modal-overlay no-print';
  overlay.style.cssText =
    'position: fixed; inset: 0; background: rgba(11, 19, 43, 0.88); backdrop-filter: blur(8px); z-index: 99999; display: flex; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.25s ease; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;';

  overlay.innerHTML = `
    <div class="modal-content" id="coverModalContainer" style="background: #0b1120; width: 100vw; height: 100vh; max-width: 100vw; max-height: 100vh; border-radius: 0; border: none; display: flex; flex-direction: column; overflow: hidden; box-shadow: none; color: #f8fafc;">
      
      <!-- Top Navigation & Header Bar -->
      <div style="background: #1e293b; border-bottom: 1px solid #334155; padding: 10px 20px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #2563eb, #1d4ed8); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 1.1rem; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);">
            <i class="fa-solid fa-envelope-open-text"></i>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h2 style="margin: 0; color: #f8fafc; font-size: 1.12rem; font-weight: 700; letter-spacing: -0.01em;">Cover Lesson Generator</h2>
              <span style="background: #3b82f6; color: #ffffff; font-size: 0.68rem; font-weight: 700; padding: 2px 7px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em;">Interactive Draft Email</span>
            </div>
            <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 500;">The History Department • Departmental Cover Portal</span>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <!-- Recent History Log Toggle -->
          <div id="coverRecentHistoryToggle" style="display: flex; align-items: center; gap: 6px; background: #0f172a; border: 1px solid #334155; padding: 5px 10px; border-radius: 6px; cursor: pointer; user-select: none; font-size: 0.74rem;">
            <i class="fa-solid fa-clock-rotate-left" style="color: #3b82f6;"></i>
            <span style="font-weight: 600; color: #e2e8f0;">Absence History</span>
            <span id="coverRecentHistoryBadge" style="background: #1e293b; border: 1px solid #334155; color: #60a5fa; padding: 0 5px; border-radius: 8px; font-size: 0.65rem; font-weight: 700;">0</span>
            <i class="fa-solid fa-chevron-down" id="coverHistoryChevron" style="font-size: 0.6rem; color: #94a3b8; transition: transform 0.2s;"></i>
          </div>

          <button id="coverWipeMemoryBtn" type="button" title="Clear all saved cover memory from this machine" style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 5px 10px; border-radius: 6px; font-size: 0.72rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 5px; transition: all 0.15s;">
            <i class="fa-solid fa-trash-can"></i> Wipe Memory
          </button>

          <button id="coverModalCloseBtn" type="button" title="Close Cover Generator" style="background: #0f172a; border: 1px solid #334155; color: #94a3b8; width: 32px; height: 32px; border-radius: 6px; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s;" onmouseover="this.style.color='#f8fafc'; this.style.borderColor='#ef4444'; this.style.background='#7f1d1d';" onmouseout="this.style.color='#94a3b8'; this.style.borderColor='#334155'; this.style.background='#0f172a';">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- Collapsible Recent History Panel -->
      <div id="coverRecentHistoryList" style="display: none; background: #0f172a; border-bottom: 1px solid #334155; padding: 10px 20px; flex-direction: column; gap: 6px; max-height: 180px; overflow-y: auto;">
        <!-- Dynamically populated -->
      </div>

      <!-- 10-Day Quick Timetable Tab Strip -->
      <div id="cover10DayStrip" style="background: #131c2d; border-bottom: 1px solid #1e293b; padding: 8px 20px; display: flex; flex-wrap: wrap; gap: 14px; align-items: center; justify-content: space-between; flex-shrink: 0;">
        <!-- Hidden test compatibility elements -->
        <div style="display: none;" aria-hidden="true">
          <button id="btnWeekA" type="button"></button>
          <button id="btnWeekB" type="button"></button>
          <button class="day-btn" data-day="Monday" type="button"></button>
          <button class="day-btn" data-day="Tuesday" type="button"></button>
          <button class="day-btn" data-day="Wednesday" type="button"></button>
          <button class="day-btn" data-day="Thursday" type="button"></button>
          <button class="day-btn" data-day="Friday" type="button"></button>
          <input type="checkbox" id="chkIncludePolicy" checked>
        </div>

        <div style="display: flex; align-items: center; gap: 12px; flex: 1; flex-wrap: wrap;">
          <!-- Week A Group -->
          <div style="display: flex; align-items: center; gap: 6px; background: rgba(15, 23, 42, 0.7); border: 1px solid #243044; border-radius: 8px; padding: 3px 8px;">
            <span style="font-size: 0.68rem; font-weight: 800; color: #93c5fd; text-transform: uppercase; letter-spacing: 0.06em; padding-right: 4px;">Week A</span>
            <div id="coverWeekAGroup" style="display: flex; gap: 4px;">
              <!-- 5 buttons populated -->
            </div>
          </div>

          <!-- Week B Group -->
          <div style="display: flex; align-items: center; gap: 6px; background: rgba(15, 23, 42, 0.7); border: 1px solid #243044; border-radius: 8px; padding: 3px 8px;">
            <span style="font-size: 0.68rem; font-weight: 800; color: #c084fc; text-transform: uppercase; letter-spacing: 0.06em; padding-right: 4px;">Week B</span>
            <div id="coverWeekBGroup" style="display: flex; gap: 4px;">
              <!-- 5 buttons populated -->
            </div>
          </div>
        </div>

        <!-- Single-Click Bulk Action in Tab Strip -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <button id="btnAdvanceAllSets" type="button" style="display: none; background: rgba(37, 99, 235, 0.18); border: 1px solid #3b82f6; color: #93c5fd; padding: 5px 12px; border-radius: 6px; font-size: 0.74rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);" title="Auto-advance all eligible classes to their next sequential lesson (+1)">
            <i class="fa-solid fa-forward-step"></i> +1 Advance All
          </button>
          <button id="btnApplyDefaultsToAll" type="button" style="background: #0f172a; border: 1px solid #3b82f6; color: #60a5fa; padding: 5px 12px; border-radius: 6px; font-size: 0.74rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s;" title="Apply standard printed workbooks (shelf handout) & collect at end to all teaching periods today">
            <i class="fa-solid fa-arrows-rotate"></i> Apply Workbooks to All
          </button>
        </div>
      </div>

      <!-- Action Dispatch Toolbar (Sticky directly above the email document) -->
      <div id="coverDispatchBar" style="background: #0f172a; border-bottom: 1px solid #1e293b; padding: 10px 24px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 0.78rem; font-weight: 700; color: #f8fafc; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-file-pen" style="color: #3b82f6;"></i>
            <span id="coverScheduleLabel">Schedule for Week A Tuesday</span>
          </span>
          <span style="font-size: 0.72rem; color: #94a3b8;">• Select topics and options directly in the draft sentences below</span>
        </div>

        <div style="display: flex; align-items: center; gap: 8px;">
          <button id="btnToggleRawText" type="button" style="background: #1e293b; color: #94a3b8; border: 1px solid #334155; padding: 6px 12px; border-radius: 6px; font-size: 0.76rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: all 0.15s;" title="Toggle raw plain-text output view">
            <i class="fa-solid fa-code"></i> <span id="btnToggleRawTextLabel">View Plain Text</span>
          </button>

          <a id="coverMailtoBtn" href="#" class="btn-mail" style="background: #1e293b; color: #cbd5e1; border: 1px solid #334155; padding: 6px 12px; border-radius: 6px; font-size: 0.76rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s;" onmouseover="this.style.borderColor='#60a5fa'; this.style.color='#ffffff';" onmouseout="this.style.borderColor='#334155'; this.style.color='#cbd5e1';">
            <i class="fa-solid fa-envelope"></i> Mail
          </a>

          <a id="coverOutlookBtn" href="#" target="_blank" class="btn-outlook" style="background: #1e293b; color: #cbd5e1; border: 1px solid #334155; padding: 6px 12px; border-radius: 6px; font-size: 0.76rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s;" onmouseover="this.style.borderColor='#60a5fa'; this.style.color='#ffffff';" onmouseout="this.style.borderColor='#334155'; this.style.color='#cbd5e1';">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Outlook Web
          </a>

          <button id="coverCopyActionBtn" type="button" style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #ffffff; border: 1px solid #3b82f6; padding: 7px 18px; border-radius: 6px; font-size: 0.84rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4); transition: all 0.15s;">
            <i class="fa-solid fa-copy"></i> Copy Cover Email
          </button>
        </div>
      </div>

      <!-- Scrollable Main Canvas: The Interactive Cloze Email Document -->
      <div style="flex: 1; overflow-y: auto; padding: 24px 20px; background: #080d19; display: flex; flex-direction: column; align-items: center;">
        
        <!-- Interactive Executive Stationery Card -->
        <div id="coverEmailDocument" style="width: 100%; max-width: 860px; background: #0d1527; border: 1px solid #1e293b; border-radius: 12px; padding: 28px 34px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 0.92rem; line-height: 1.65; color: #f1f5f9;">
          
          <!-- Email Envelope / Header Fields -->
          <div style="display: flex; flex-direction: column; gap: 8px; padding-bottom: 16px; border-bottom: 1px solid #1e293b;">
            <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 0.72rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; width: 44px;">To:</span>
                <input type="text" id="coverRecipientInput" value="${localStorage.getItem('cover_recipient') || 'Paul'}" style="background: #162032; border: 1px solid #334155; border-radius: 6px; color: #f8fafc; font-size: 0.84rem; font-weight: 600; padding: 4px 10px; width: 130px; outline: none;" placeholder="Paul">
              </div>

              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 0.72rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; width: 44px;">From:</span>
                <input type="text" id="coverSenderInput" value="${localStorage.getItem('cover_sender_name') || 'Ben'}" style="background: #162032; border: 1px solid #334155; border-radius: 6px; color: #f8fafc; font-size: 0.84rem; font-weight: 600; padding: 4px 10px; width: 130px; outline: none;" placeholder="Ben">
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 0.72rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; width: 55px;">Subject:</span>
              <span id="coverSubjectLine" style="color: #60a5fa; font-weight: 700; font-size: 0.88rem;">COVER: History - ...</span>
            </div>
          </div>

          <!-- Email Body Section -->
          <div style="padding-top: 18px; display: flex; flex-direction: column; gap: 12px;">
            <div>
              Dear <span id="clozeRecipientDisplay" style="font-weight: 700; color: #ffffff;">Paul</span>,
            </div>

            <div>
              Please find below the cover <span id="clozeWhenPhrase">for </span><strong id="clozeDateDisplay" style="color: #93c5fd;">...</strong>.
            </div>

            <div>
              Tutor AM / PM Warrior 2
            </div>

            <!-- Duties & General Note Line -->
            <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 8px;">
              <span>Duties: <span id="clozeDutiesText" style="color: #e2e8f0;">none</span></span>
              <span style="display: inline-flex; align-items: center; gap: 6px; background: #162032; border: 1px solid #243044; border-radius: 6px; padding: 3px 8px; font-size: 0.8rem;">
                <input type="checkbox" id="chkIncludeGeneralNote" checked style="accent-color: #3b82f6; cursor: pointer;">
                <input type="text" id="coverGeneralNoteInput" value="${localStorage.getItem('cover_general_note') !== null ? localStorage.getItem('cover_general_note') : 'All cover set on VLE; please allow pupils to use laptops as textbooks only.'}" style="background: transparent; border: none; color: #cbd5e1; outline: none; width: 460px; font-size: 0.8rem;" placeholder="All cover set on VLE; please allow pupils to use laptops as textbooks only.">
              </span>
            </div>

            <!-- Dynamic Timetable Period Rows (The Gap-Fill / Cloze Section) -->
            <div id="coverEmailPeriodsFlow" style="display: flex; flex-direction: column; gap: 6px; margin: 8px 0;">
              <!-- Dynamically populated with Period rows -->
            </div>

            <!-- Email Closing Section -->
            <div style="margin-top: 8px; color: #94a3b8; font-size: 0.85rem;">
              Early Finishers: Pupils should navigate to the Revision Zone flashcards or Living Timeline challenge on the platform.
            </div>

            <div style="margin-top: 12px; color: #f8fafc;">
              Thanks
            </div>
            <div style="color: #ffffff; font-weight: 700; font-size: 0.95rem;">
              <span id="clozeSenderDisplay">Ben</span>
            </div>

          </div>

        </div>

        <!-- Collapsible Raw Plain-Text Textarea Drawer -->
        <div id="coverRawTextDrawer" style="display: none; width: 100%; max-width: 860px; margin-top: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 0.74rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Raw Plain-Text Email Feed:</span>
            <span style="font-size: 0.7rem; color: #64748b;">Synchronized continuously with Cloze fields above</span>
          </div>
          <textarea id="coverEmailOutputArea" readonly style="width: 100%; height: 260px; box-sizing: border-box; background: #070d1e; border: 1px solid #1e293b; border-radius: 8px; color: #f1f5f9; padding: 14px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 0.82rem; line-height: 1.6; resize: vertical; outline: none; box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);"></textarea>
        </div>

      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  // References
  const modalContainer = overlay.querySelector('#coverModalContainer');
  const closeBtn = overlay.querySelector('#coverModalCloseBtn');
  const btnWeekA = overlay.querySelector('#btnWeekA');
  const btnWeekB = overlay.querySelector('#btnWeekB');
  const dayButtons = overlay.querySelectorAll('.day-btn');
  const chkIncludePolicy = overlay.querySelector('#chkIncludePolicy');
  const scheduleLabel = overlay.querySelector('#coverScheduleLabel');
  const coverWeekAGroup = overlay.querySelector('#coverWeekAGroup');
  const coverWeekBGroup = overlay.querySelector('#coverWeekBGroup');
  const periodsFlow = overlay.querySelector('#coverEmailPeriodsFlow');
  const emailOutputArea = overlay.querySelector('#coverEmailOutputArea');
  const recipientInput = overlay.querySelector('#coverRecipientInput');
  const senderInput = overlay.querySelector('#coverSenderInput');
  const generalNoteInput = overlay.querySelector('#coverGeneralNoteInput');
  const chkIncludeGeneralNote = overlay.querySelector('#chkIncludeGeneralNote');
  const mailtoBtn = overlay.querySelector('#coverMailtoBtn');
  const outlookBtn = overlay.querySelector('#coverOutlookBtn');
  const copyActionBtn = overlay.querySelector('#coverCopyActionBtn');
  const recentHistoryToggle = overlay.querySelector('#coverRecentHistoryToggle');
  const recentHistoryList = overlay.querySelector('#coverRecentHistoryList');
  const recentHistoryBadge = overlay.querySelector('#coverRecentHistoryBadge');
  const historyChevron = overlay.querySelector('#coverHistoryChevron');
  const wipeMemoryBtn = overlay.querySelector('#coverWipeMemoryBtn');
  const btnApplyDefaultsToAll = overlay.querySelector('#btnApplyDefaultsToAll');
  const btnToggleRawText = overlay.querySelector('#btnToggleRawText');
  const btnToggleRawTextLabel = overlay.querySelector('#btnToggleRawTextLabel');
  const coverRawTextDrawer = overlay.querySelector('#coverRawTextDrawer');
  const clozeRecipientDisplay = overlay.querySelector('#clozeRecipientDisplay');
  const clozeSenderDisplay = overlay.querySelector('#clozeSenderDisplay');
  const clozeWhenPhrase = overlay.querySelector('#clozeWhenPhrase');
  const clozeDateDisplay = overlay.querySelector('#clozeDateDisplay');
  const clozeDutiesText = overlay.querySelector('#clozeDutiesText');
  const coverSubjectLine = overlay.querySelector('#coverSubjectLine');

  // Toggle Raw Plain-Text Drawer
  let rawTextDrawerOpen = false;
  btnToggleRawText.onclick = () => {
    rawTextDrawerOpen = !rawTextDrawerOpen;
    coverRawTextDrawer.style.display = rawTextDrawerOpen ? 'block' : 'none';
    btnToggleRawTextLabel.textContent = rawTextDrawerOpen ? 'Hide Plain Text' : 'View Plain Text';
    btnToggleRawText.style.background = rawTextDrawerOpen ? '#2563eb' : '#1e293b';
    btnToggleRawText.style.color = rawTextDrawerOpen ? '#ffffff' : '#94a3b8';
  };

  // Recent History Drawer Toggle
  let historyDrawerOpen = false;
  recentHistoryToggle.onclick = () => {
    historyDrawerOpen = !historyDrawerOpen;
    recentHistoryList.style.display = historyDrawerOpen ? 'flex' : 'none';
    historyChevron.style.transform = historyDrawerOpen ? 'rotate(180deg)' : 'rotate(0deg)';
  };

  // Wipe Memory Handler
  wipeMemoryBtn.onclick = () => {
    wipeAbsenceMemory();
    selectedUnits = {};
    selectedLessons = {};
    const origHtml = wipeMemoryBtn.innerHTML;
    wipeMemoryBtn.innerHTML = '<i class="fa-solid fa-check"></i> Wiped Clean!';
    wipeMemoryBtn.style.background = 'rgba(16, 185, 129, 0.25)';
    wipeMemoryBtn.style.borderColor = 'rgba(16, 185, 129, 0.6)';
    wipeMemoryBtn.style.color = '#6ee7b7';
    renderRecentHistory();
    updateModalState();
    setTimeout(() => {
      wipeMemoryBtn.innerHTML = origHtml;
      wipeMemoryBtn.style.background = 'rgba(239, 68, 68, 0.12)';
      wipeMemoryBtn.style.borderColor = 'rgba(239, 68, 68, 0.3)';
      wipeMemoryBtn.style.color = '#fca5a5';
    }, 2000);
  };

  // Render Multi-Day Absence History
  const renderRecentHistory = () => {
    const log = getRecentCoverLog();
    recentHistoryBadge.textContent = `${log.length}`;
    if (log.length === 0) {
      recentHistoryList.innerHTML = `<span style="color: #94a3b8; font-size: 0.72rem; font-style: italic;">No previous absence cover entries recorded on this machine yet. As you copy or dispatch cover, records will automatically appear here.</span>`;
      return;
    }

    recentHistoryList.innerHTML = log
      .map(
        (item) => `
      <div style="background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 8px 12px; display: flex; flex-direction: column; gap: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 700; color: #60a5fa; font-size: 0.78rem;"><i class="fa-solid fa-calendar-day" style="margin-right: 5px;"></i>${item.dayName}, ${item.dateStr} (${item.week})</span>
          <span style="color: #94a3b8; font-size: 0.7rem;"><i class="fa-solid fa-clock" style="margin-right: 4px;"></i>${item.recordedAt || ''}</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; font-size: 0.72rem; color: #cbd5e1;">
          ${(item.entries || [])
            .map((e) => {
              const yb = getYearBadge(e.setName);
              return `
            <span style="background: #0f172a; border: 1px solid #334155; padding: 3px 8px; border-radius: 5px; display: inline-flex; align-items: center; gap: 6px;">
              <span style="background: ${yb.bg}; border: 1px solid ${yb.border}; color: ${yb.color}; padding: 1px 5px; border-radius: 3px; font-size: 0.64rem; font-weight: 700;">${yb.label}</span>
              <strong style="color: #f8fafc;">${e.period}:</strong> <span style="color: #e2e8f0;">${e.setName}</span> — <span style="color: #93c5fd;">${e.topic}</span>
            </span>
          `;
            })
            .join('')}
        </div>
      </div>
    `,
      )
      .join('');
  };

  // Helper to find previous cover topic for a set from history & session
  const findPreviousCoverForSet = (setName) => {
    // 1. Search sessionCoverHistory across prior days in the 10-day cycle
    const tenDays = get10DaysList();
    const currentDayIdx = tenDays.findIndex((t) => t.week === currentWeek && t.day === currentDay);
    if (currentDayIdx > 0) {
      for (let i = currentDayIdx - 1; i >= 0; i--) {
        const priorDay = tenDays[i];
        const key = `${priorDay.week}_${priorDay.day}_${setName}`;
        if (sessionCoverHistory[key]) {
          const entry = sessionCoverHistory[key];
          const unitLessons = getUnitLessons(entry.unitId);
          const nextLessonIdx =
            entry.lessonIdx !== undefined && entry.lessonIdx !== null ? entry.lessonIdx + 1 : null;
          const hasNextLesson = nextLessonIdx !== null && nextLessonIdx < unitLessons.length;
          return {
            dateStr: `${priorDay.shortCode} (${priorDay.dateLabel})`,
            fullDateStr: `${priorDay.day}, ${priorDay.dateLabel} (${priorDay.week})`,
            topic: entry.topic,
            lessonIdx: entry.lessonIdx,
            unitId: entry.unitId,
            unitTitle: entry.unitTitle || getUnitTitle(entry.unitId),
            nextLesson: hasNextLesson
              ? {
                  idx: nextLessonIdx,
                  title:
                    (unitLessons[nextLessonIdx] && unitLessons[nextLessonIdx].title) ||
                    `Lesson ${nextLessonIdx + 1}`,
                }
              : null,
            totalLessons: unitLessons.length,
            isLastLesson: nextLessonIdx !== null && nextLessonIdx >= unitLessons.length,
          };
        }
      }
    }

    // 2. Search recent cover log (persisted from previous dispatches/copies)
    const log = getRecentCoverLog();
    for (const item of log) {
      // Don't match the current day itself if it was previously dispatched
      if (item.week === currentWeek && item.dayName === currentDay) continue;
      if (item.entries) {
        const found = item.entries.find((e) => e.setName === setName);
        if (found) {
          let unitId = found.unitId;
          if (!unitId) {
            const matchedUnit = ALL_UNITS.find(
              (u) => u.title === found.unitTitle || u.id === found.unitTitle,
            );
            unitId = matchedUnit
              ? matchedUnit.id
              : (DEFAULT_SET_MAPPING[setName] && DEFAULT_SET_MAPPING[setName].unit) || 'great_war';
          }
          const unitLessons = getUnitLessons(unitId);
          const nextLessonIdx =
            found.lessonIdx !== undefined && found.lessonIdx !== null ? found.lessonIdx + 1 : null;
          const hasNextLesson = nextLessonIdx !== null && nextLessonIdx < unitLessons.length;
          return {
            dateStr: `${item.dayName.slice(0, 3)} ${item.dateStr.split(' ')[0]} ${item.dateStr.split(' ')[1]}`,
            fullDateStr: `${item.dayName}, ${item.dateStr}`,
            topic: found.topic,
            lessonIdx: found.lessonIdx,
            unitId: unitId,
            unitTitle: found.unitTitle || getUnitTitle(unitId),
            nextLesson: hasNextLesson
              ? {
                  idx: nextLessonIdx,
                  title:
                    (unitLessons[nextLessonIdx] && unitLessons[nextLessonIdx].title) ||
                    `Lesson ${nextLessonIdx + 1}`,
                }
              : null,
            totalLessons: unitLessons.length,
            isLastLesson: nextLessonIdx !== null && nextLessonIdx >= unitLessons.length,
          };
        }
      }
    }

    // 3. Fallback to last saved topics in localStorage
    const savedTopics = getSavedTopics();
    if (savedTopics[setName] && savedTopics[setName].unit) {
      const saved = savedTopics[setName];
      const unitLessons = getUnitLessons(saved.unit);
      const nextLessonIdx =
        saved.lesson !== undefined && saved.lesson !== null ? saved.lesson + 1 : null;
      const hasNextLesson = nextLessonIdx !== null && nextLessonIdx < unitLessons.length;
      return {
        dateStr: 'Last Saved',
        fullDateStr: 'Last Saved Topic',
        topic:
          (unitLessons[saved.lesson] && unitLessons[saved.lesson].title) ||
          `Lesson ${saved.lesson + 1}`,
        lessonIdx: saved.lesson,
        unitId: saved.unit,
        unitTitle: getUnitTitle(saved.unit),
        nextLesson: hasNextLesson
          ? {
              idx: nextLessonIdx,
              title:
                (unitLessons[nextLessonIdx] && unitLessons[nextLessonIdx].title) ||
                `Lesson ${nextLessonIdx + 1}`,
            }
          : null,
        totalLessons: unitLessons.length,
        isLastLesson: nextLessonIdx !== null && nextLessonIdx >= unitLessons.length,
      };
    }

    // 4. Default baseline curriculum progression fallback
    if (DEFAULT_PREVIOUS_COVERS && DEFAULT_PREVIOUS_COVERS[setName]) {
      const def = DEFAULT_PREVIOUS_COVERS[setName];
      const unitLessons = getUnitLessons(def.unitId);
      const nextLessonIdx =
        def.lessonIdx !== undefined && def.lessonIdx !== null ? def.lessonIdx + 1 : null;
      const hasNextLesson = nextLessonIdx !== null && nextLessonIdx < unitLessons.length;
      return {
        dateStr: def.dateStr || 'Prior Lesson',
        fullDateStr: def.fullDateStr || 'Prior Lesson Recorded',
        topic:
          (unitLessons[def.lessonIdx] && unitLessons[def.lessonIdx].title) ||
          `Lesson ${def.lessonIdx + 1}`,
        lessonIdx: def.lessonIdx,
        unitId: def.unitId,
        unitTitle: getUnitTitle(def.unitId),
        nextLesson: hasNextLesson
          ? {
              idx: nextLessonIdx,
              title:
                (unitLessons[nextLessonIdx] && unitLessons[nextLessonIdx].title) ||
                `Lesson ${nextLessonIdx + 1}`,
            }
          : null,
        totalLessons: unitLessons.length,
        isLastLesson: nextLessonIdx !== null && nextLessonIdx >= unitLessons.length,
      };
    }

    return null;
  };

  // Main Reactive Update Function
  const updateModalState = () => {
    // 1. Render & Update 10-Day Quick Selector Tabs
    const tenDays = get10DaysList();
    const weekADays = tenDays.filter((t) => t.week === 'Week A');
    const weekBDays = tenDays.filter((t) => t.week === 'Week B');

    const renderDayTabButtons = (daysArr, container) => {
      container.innerHTML = '';
      daysArr.forEach((item) => {
        const isActive = item.week === currentWeek && item.day === currentDay;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cover-10day-tab';
        btn.setAttribute('data-week', item.week);
        btn.setAttribute('data-day', item.day);
        btn.style.cssText = `
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s;
          border: 1px solid ${isActive ? '#60a5fa' : '#334155'};
          background: ${isActive ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : '#0f172a'};
          color: ${isActive ? '#ffffff' : '#cbd5e1'};
          box-shadow: ${isActive ? '0 2px 8px rgba(37, 99, 235, 0.4)' : 'none'};
          min-width: 62px;
        `;

        let badgeHtml = '';
        if (item.isToday) {
          badgeHtml = `<span style="background: #10b981; color: #ffffff; font-size: 0.58rem; padding: 1px 4px; border-radius: 3px; font-weight: 800; text-transform: uppercase;">TODAY</span>`;
        } else if (item.isTomorrow) {
          badgeHtml = `<span style="background: #3b82f6; color: #ffffff; font-size: 0.58rem; padding: 1px 4px; border-radius: 3px; font-weight: 800; text-transform: uppercase;">TOMORROW</span>`;
        }

        btn.innerHTML = `
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="font-size: 0.78rem; font-weight: 700;">${item.day.slice(0, 3)}</span>
            ${badgeHtml}
          </div>
          <span style="font-size: 0.65rem; opacity: 0.85; margin-top: 1px;">${item.dateLabel}</span>
        `;

        btn.onclick = () => {
          currentWeek = item.week;
          currentDay = item.day;
          selectedLessons = {};
          updateModalState();
        };

        container.appendChild(btn);
      });
    };

    renderDayTabButtons(weekADays, coverWeekAGroup);
    renderDayTabButtons(weekBDays, coverWeekBGroup);

    // 2. Synchronize hidden legacy elements for test script compatibility
    if (btnWeekA) {
      btnWeekA.style.background = currentWeek === 'Week A' ? '#3b82f6' : 'transparent';
      btnWeekA.style.color = currentWeek === 'Week A' ? '#ffffff' : '#94a3b8';
    }
    if (btnWeekB) {
      btnWeekB.style.background = currentWeek === 'Week B' ? '#3b82f6' : 'transparent';
      btnWeekB.style.color = currentWeek === 'Week B' ? '#ffffff' : '#94a3b8';
    }
    dayButtons.forEach((btn) => {
      const d = btn.getAttribute('data-day');
      if (d === currentDay) {
        btn.style.background = '#2563eb';
        btn.style.color = '#ffffff';
        btn.style.borderColor = '#3b82f6';
      } else {
        btn.style.background = '#0f172a';
        btn.style.color = '#cbd5e1';
        btn.style.borderColor = '#334155';
      }
    });

    // 3. Compute Dates & Header Strings
    const targetDateObj = getTargetDateObj(currentDay, currentWeek);
    const dateStr = formatTargetDate(targetDateObj);

    const todayDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(todayDate.getDate() + 1);
    const isSameDay = (d1, d2) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    let whenPhrase = '';
    if (isSameDay(targetDateObj, todayDate)) {
      whenPhrase = 'for today, ';
    } else if (isSameDay(targetDateObj, tomorrowDate)) {
      whenPhrase = 'for tomorrow, ';
    } else {
      whenPhrase = 'for ';
    }

    const savedRecipient = localStorage.getItem('cover_recipient') || 'Paul';
    const recipient = (recipientInput && recipientInput.value.trim()) || savedRecipient;

    const savedSender = localStorage.getItem('cover_sender_name') || 'Ben';
    const sender = (senderInput && senderInput.value.trim()) || savedSender;

    const defaultGenNote =
      'All cover set on VLE; please allow pupils to use laptops as textbooks only.';
    const savedGeneralNote =
      localStorage.getItem('cover_general_note') !== null
        ? localStorage.getItem('cover_general_note')
        : defaultGenNote;
    const generalNote =
      generalNoteInput &&
      generalNoteInput.value !== undefined &&
      generalNoteInput.value.trim() !== ''
        ? generalNoteInput.value.trim()
        : savedGeneralNote;
    const includeGeneralNote = chkIncludeGeneralNote ? chkIncludeGeneralNote.checked : true;

    scheduleLabel.textContent = `Schedule for ${currentWeek} ${currentDay} (${dateStr})`;
    const subject = `COVER: History - ${currentDay}, ${dateStr} (${currentWeek})`;
    coverSubjectLine.textContent = subject;

    clozeRecipientDisplay.textContent = recipient;
    clozeSenderDisplay.textContent = sender;
    clozeWhenPhrase.textContent = whenPhrase;
    clozeDateDisplay.textContent = `${currentDay}, ${dateStr} (${currentWeek})`;

    const timetableDayList =
      (TIMETABLE_DATA[currentWeek] && TIMETABLE_DATA[currentWeek][currentDay]) || [];
    const duties = (TIMETABLE_DATA.duties && TIMETABLE_DATA.duties[currentDay]) || [];

    let dutiesStr = 'none';
    if (duties.length > 0) {
      dutiesStr = duties.map((d) => `${d.time} (${d.duty})`).join('; ');
    }
    clozeDutiesText.textContent = dutiesStr;

    // 4. Render Dynamic Periods Flow (Cloze Gap-Fill Rows)
    periodsFlow.innerHTML = '';
    const savedLastTopics = getSavedTopics();
    const periodsData = [];

    timetableDayList.forEach((slot, pIdx) => {
      const periodName = slot.period;
      const timeSlot = slot.time;

      if (slot.type === 'hub') {
        periodsData.push({
          type: 'hub',
          period: periodName,
          time: timeSlot,
          title: 'Hub Supervision',
        });

        const hubRow = document.createElement('div');
        hubRow.style.cssText =
          'margin: 12px 0; padding: 12px 16px; background: rgba(30, 41, 59, 0.45); border-left: 4px solid #64748b; border-radius: 0 8px 8px 0; display: flex; justify-content: space-between; align-items: center;';
        hubRow.innerHTML = `
          <div>
            <div style="font-weight: 700; color: #f8fafc; font-size: 0.92rem;">${periodName.toUpperCase()} (${timeSlot}) — HUB SUPERVISION</div>
            <div style="color: #94a3b8; font-size: 0.82rem; margin-top: 2px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">SUPERVISION ONLY — NO COVER WORK TO SET</div>
          </div>
          <span style="font-size: 0.7rem; color: #fbbf24; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); padding: 3px 8px; border-radius: 4px; font-weight: 700; text-transform: uppercase;">Supervision Only</span>
        `;
        periodsFlow.appendChild(hubRow);
        return;
      }

      if (slot.type === 'club') {
        periodsData.push({
          type: 'club',
          period: periodName,
          time: timeSlot,
          title: slot.raw || 'Chess Club',
        });

        const clubRow = document.createElement('div');
        clubRow.style.cssText =
          'margin: 12px 0; padding: 12px 16px; background: rgba(30, 41, 59, 0.45); border-left: 4px solid #10b981; border-radius: 0 8px 8px 0; display: flex; justify-content: space-between; align-items: center;';
        clubRow.innerHTML = `
          <div>
            <div style="font-weight: 700; color: #f8fafc; font-size: 0.92rem;">${periodName.toUpperCase()} (${timeSlot}) — ${(slot.raw || 'Chess Club').toUpperCase()}</div>
            <div style="color: #94a3b8; font-size: 0.82rem; margin-top: 2px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">SUPERVISION ONLY — NO COVER WORK TO SET</div>
          </div>
          <span style="font-size: 0.7rem; color: #34d399; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); padding: 3px 8px; border-radius: 4px; font-weight: 700; text-transform: uppercase;">Supervision Only</span>
        `;
        periodsFlow.appendChild(clubRow);
        return;
      }

      // Teaching class
      const setNameMatch = slot.raw ? slot.raw.match(/Set\s+[0-9a-zA-Z]+/i) : null;
      const setName = setNameMatch
        ? setNameMatch[0]
        : slot.raw
          ? slot.raw.split('\n')[0]
          : 'History Class';
      const defaultInfo = DEFAULT_SET_MAPPING[setName] || {
        year: 'GCSE',
        unit: 'great_war',
        unit_name: 'The Great War (1914–1919)',
        default_lesson: 0,
        default_topic: 'Key Historical Enquiry',
      };

      // Active Unit
      if (selectedUnits[pIdx] === undefined) {
        if (savedLastTopics[setName] && savedLastTopics[setName].unit) {
          selectedUnits[pIdx] = savedLastTopics[setName].unit;
        } else {
          selectedUnits[pIdx] = defaultInfo.unit;
        }
      }
      const activeUnitId = selectedUnits[pIdx];
      const activeUnitTitle = getUnitTitle(activeUnitId);
      const unitLessons = getUnitLessons(activeUnitId);

      // Active Lesson
      if (selectedLessons[pIdx] === undefined) {
        if (savedLastTopics[setName] && savedLastTopics[setName].lesson !== undefined) {
          selectedLessons[pIdx] = savedLastTopics[setName].lesson;
        } else {
          selectedLessons[pIdx] = defaultInfo.default_lesson || 0;
        }
      }
      if (selectedLessons[pIdx] >= unitLessons.length) {
        selectedLessons[pIdx] = 0;
      }

      const activeLIdx = selectedLessons[pIdx];
      const activeLesson = unitLessons[activeLIdx] || { title: defaultInfo.default_topic };
      const activeTopic = activeLesson.title || defaultInfo.default_topic;
      const liveUrl = `${HUB_BASE_URL}/?unit=${activeUnitId}&lesson=${activeLIdx}`;

      periodsData.push({
        pIdx: pIdx,
        type: 'lesson',
        period: periodName,
        time: timeSlot,
        setName: setName,
        unitId: activeUnitId,
        unitName: activeUnitTitle,
        topicName: activeTopic,
        lessonIdx: activeLIdx,
        liveUrl: liveUrl,
      });

      // Record current state into sessionCoverHistory for this slot
      sessionCoverHistory[`${currentWeek}_${currentDay}_${setName}`] = {
        unitId: activeUnitId,
        unitTitle: activeUnitTitle,
        lessonIdx: activeLIdx,
        topic: activeTopic,
        dayName: currentDay,
        dateStr: dateStr,
      };

      const yb = getYearBadge(setName);
      const prevCover = findPreviousCoverForSet(setName);

      // Build Unit Dropdown Options with optgroups
      const gcseUnits = ALL_UNITS.filter((u) => u.group === 'GCSE History');
      const ks3Units = ALL_UNITS.filter((u) => u.group === 'Key Stage 3');

      const unitOptionsHtml = `
        <optgroup label="GCSE History Specification">
          ${gcseUnits.map((u) => `<option value="${u.id}" ${u.id === activeUnitId ? 'selected' : ''}>${u.title}</option>`).join('')}
        </optgroup>
        <optgroup label="Key Stage 3 Curriculum">
          ${ks3Units.map((u) => `<option value="${u.id}" ${u.id === activeUnitId ? 'selected' : ''}>${u.title}</option>`).join('')}
        </optgroup>
      `;

      // Build Lesson Dropdown Options
      let lessonOptionsHtml = '';
      if (unitLessons.length > 0) {
        lessonOptionsHtml = unitLessons
          .map(
            (l, lIndex) => `
          <option value="${lIndex}" ${lIndex === activeLIdx ? 'selected' : ''}>Lesson ${lIndex + 1}: ${l.title}</option>
        `,
          )
          .join('');
      } else {
        lessonOptionsHtml = `<option value="0">${defaultInfo.default_topic}</option>`;
      }

      // Per-Period Settings
      const pSetting = getPeriodSetting(pIdx, setName);
      const isWorkbooks = pSetting.resource === 'workbooks';
      const isShelf = pSetting.shelf === true;
      const colMode = pSetting.collection || 'collect';

      // Header previous context display
      let headerPrevHtml = '';
      if (prevCover) {
        headerPrevHtml = `
          <span style="color: #94a3b8; font-size: 0.73rem; display: inline-flex; align-items: center; gap: 5px;" title="${prevCover.fullDateStr}: ${prevCover.topic}">
            <i class="fa-solid fa-clock-rotate-left" style="color: #60a5fa; font-size: 0.7rem;"></i>
            Previously: <strong style="color: #cbd5e1; font-weight: 600;">Lesson ${(prevCover.lessonIdx ?? 0) + 1}</strong> <span style="color: #64748b;">(${prevCover.dateStr})</span>
          </span>
        `;
      }

      // Smart Lesson Auto-Increment (+1 Bump) Badge next to topic dropdown
      let advanceBadgeHtml = '';
      if (prevCover && prevCover.nextLesson) {
        if (activeLIdx === prevCover.nextLesson.idx && activeUnitId === prevCover.unitId) {
          advanceBadgeHtml = `
            <span class="badge-advanced-confirm" style="background: rgba(16, 185, 129, 0.16); border: 1px solid rgba(16, 185, 129, 0.45); color: #6ee7b7; padding: 3px 9px; border-radius: 6px; font-size: 0.74rem; font-weight: 700; display: inline-flex; align-items: center; gap: 5px; white-space: nowrap;" title="Auto-advanced sequentially to Lesson ${activeLIdx + 1} (Following ${prevCover.dateStr})">
              <i class="fa-solid fa-circle-check"></i> +1 Advanced (L${activeLIdx + 1})
            </span>
          `;
        } else {
          advanceBadgeHtml = `
            <button type="button" class="btn-quick-bump" data-pidx="${pIdx}" data-setname="${setName}" data-unitid="${prevCover.unitId}" data-nextidx="${prevCover.nextLesson.idx}" style="background: linear-gradient(135deg, rgba(37, 99, 235, 0.22), rgba(29, 78, 216, 0.35)); color: #93c5fd; border: 1px solid #3b82f6; padding: 3px 9px; border-radius: 6px; font-size: 0.74rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25); transition: all 0.15s; white-space: nowrap;" onmouseover="this.style.background='#2563eb'; this.style.color='#ffffff'; this.style.borderColor='#60a5fa';" onmouseout="this.style.background='linear-gradient(135deg, rgba(37, 99, 235, 0.22), rgba(29, 78, 216, 0.35))'; this.style.color='#93c5fd'; this.style.borderColor='#3b82f6';" title="Auto-select next sequential lesson in unit: Lesson ${prevCover.nextLesson.idx + 1} (${prevCover.nextLesson.title}) — following ${prevCover.dateStr}">
              <i class="fa-solid fa-forward-step" style="font-size: 0.68rem;"></i> +1 Advance (L${prevCover.nextLesson.idx + 1})
            </button>
          `;
        }
      } else if (prevCover && prevCover.isLastLesson) {
        advanceBadgeHtml = `
          <span style="color: #94a3b8; font-size: 0.72rem; font-style: italic; display: inline-flex; align-items: center; gap: 4px; padding: 2px 6px; background: rgba(148, 163, 184, 0.1); border-radius: 4px;" title="Completed all ${prevCover.totalLessons} lessons in ${prevCover.unitTitle}">
            <i class="fa-solid fa-flag-checkered" style="color: #60a5fa;"></i> Completed Unit
          </span>
        `;
      }

      // Determine resources dropdown value
      let currentResSelectVal = 'workbooks_shelf';
      if (pSetting.resource === 'paper') {
        currentResSelectVal = 'paper';
      } else if (pSetting.resource === 'laptops') {
        currentResSelectVal = 'laptops';
      } else if (pSetting.resource === 'workbooks') {
        currentResSelectVal = isShelf ? 'workbooks_shelf' : 'workbooks_pupil';
      }

      const card = document.createElement('div');
      card.className = 'cloze-period-card';
      card.style.cssText =
        'margin: 14px 0; padding: 14px 18px; background: #111a2e; border: 1px solid #1e293b; border-left: 4px solid #3b82f6; border-radius: 0 8px 8px 0; display: flex; flex-direction: column; gap: 10px;';

      card.innerHTML = `
        <!-- Period & Class Header Line -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: ${yb.bg}; border: 1px solid ${yb.border}; color: ${yb.color}; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase;">
              ${yb.label}
            </span>
            <strong style="color: #ffffff; font-size: 0.95rem;">
              ▶ ${periodName.toUpperCase()} (${timeSlot}) — ${setName}
            </strong>
          </div>
          <div>${headerPrevHtml}</div>
        </div>

        <!-- Cloze Line 1: Topic -->
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 0.88rem; color: #cbd5e1;">
          <span style="color: #94a3b8; font-weight: 700; min-width: 44px;">Topic:</span>
          <select class="cloze-unit-picker" data-pidx="${pIdx}" data-setname="${setName}" style="background: #1e293b; border: 1px solid #334155; border-radius: 6px; color: #f8fafc; font-size: 0.82rem; padding: 4px 8px; outline: none; cursor: pointer; max-width: 270px;">
            ${unitOptionsHtml}
          </select>
          <select class="cloze-lesson-picker" data-pidx="${pIdx}" data-setname="${setName}" style="background: #1e293b; border: 1px solid #334155; border-radius: 6px; color: #f8fafc; font-size: 0.82rem; padding: 4px 8px; outline: none; cursor: pointer; max-width: 360px;">
            ${lessonOptionsHtml}
          </select>
          ${advanceBadgeHtml}
          <a href="${liveUrl}" target="_blank" title="Preview lesson on Hub" style="background: #1e293b; border: 1px solid #334155; color: #60a5fa; padding: 4px 8px; border-radius: 6px; font-size: 0.76rem; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open
          </a>
        </div>

        <!-- Cloze Line 2: Resources -->
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 0.88rem; color: #cbd5e1;">
          <span style="color: #94a3b8; font-weight: 700; min-width: 44px;">Resources:</span>
          <select class="cloze-res-picker" data-pidx="${pIdx}" data-setname="${setName}" style="background: #1e293b; border: 1px solid #334155; border-radius: 6px; color: #f8fafc; font-size: 0.82rem; padding: 4px 8px; outline: none; cursor: pointer; flex: 1; min-width: 320px;">
            <option value="workbooks_shelf" ${currentResSelectVal === 'workbooks_shelf' ? 'selected' : ''}>Printed physical workbooks — please hand out from classroom shelf and ensure all are returned to shelf at end</option>
            <option value="workbooks_pupil" ${currentResSelectVal === 'workbooks_pupil' ? 'selected' : ''}>Pupils should work in their printed physical workbooks</option>
            <option value="paper" ${currentResSelectVal === 'paper' ? 'selected' : ''}>Paper only — pupils complete all work on lined A4 paper</option>
            <option value="laptops" ${currentResSelectVal === 'laptops' ? 'selected' : ''}>Laptops only (textbook reading on VLE / no physical paper needed)</option>
          </select>
        </div>

        <!-- Cloze Line 3: Work Collection -->
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 0.88rem; color: #cbd5e1;">
          <span style="color: #94a3b8; font-weight: 700; min-width: 44px;">Collection:</span>
          <select class="cloze-col-picker" data-pidx="${pIdx}" data-setname="${setName}" style="background: #1e293b; border: 1px solid #334155; border-radius: 6px; color: #f8fafc; font-size: 0.82rem; padding: 4px 8px; outline: none; cursor: pointer; flex: 1; min-width: 280px;">
            <option value="collect" ${colMode === 'collect' ? 'selected' : ''}>Please collect all pupil work at the end of the period</option>
            <option value="folders" ${colMode === 'folders' ? 'selected' : ''}>Pupils keep completed work in their books/folders for next lesson</option>
            <option value="digital" ${colMode === 'digital' ? 'selected' : ''}>Pupils submit work digitally via Google Classroom / VLE</option>
          </select>
        </div>
      `;

      // Quick bump button listener
      const bumpBtn = card.querySelector('.btn-quick-bump');
      if (bumpBtn) {
        bumpBtn.onclick = () => {
          const targetUnitId = bumpBtn.getAttribute('data-unitid');
          const targetLessonIdx = parseInt(bumpBtn.getAttribute('data-nextidx'), 10);
          selectedUnits[pIdx] = targetUnitId;
          selectedLessons[pIdx] = targetLessonIdx;
          saveTopicForSet(setName, targetUnitId, targetLessonIdx);
          updateModalState();
        };
      }

      // Unit dropdown listener
      const unitPickerEl = card.querySelector('.cloze-unit-picker');
      unitPickerEl.onchange = (e) => {
        const newUnitId = e.target.value;
        selectedUnits[pIdx] = newUnitId;
        selectedLessons[pIdx] = 0;
        saveTopicForSet(setName, newUnitId, 0);
        updateModalState();
      };

      // Lesson dropdown listener
      const lessonPickerEl = card.querySelector('.cloze-lesson-picker');
      lessonPickerEl.onchange = (e) => {
        const newLessonIdx = parseInt(e.target.value, 10) || 0;
        selectedLessons[pIdx] = newLessonIdx;
        saveTopicForSet(setName, activeUnitId, newLessonIdx);
        updateModalState();
      };

      // Resources dropdown listener
      const resPickerEl = card.querySelector('.cloze-res-picker');
      resPickerEl.onchange = (e) => {
        const val = e.target.value;
        if (val === 'workbooks_shelf') {
          setPeriodSetting(pIdx, setName, { resource: 'workbooks', shelf: true });
        } else if (val === 'workbooks_pupil') {
          setPeriodSetting(pIdx, setName, { resource: 'workbooks', shelf: false });
        } else if (val === 'paper') {
          setPeriodSetting(pIdx, setName, { resource: 'paper', shelf: false });
        } else if (val === 'laptops') {
          setPeriodSetting(pIdx, setName, { resource: 'laptops', shelf: false });
        }
        updateModalState();
      };

      // Collection dropdown listener
      const colPickerEl = card.querySelector('.cloze-col-picker');
      colPickerEl.onchange = (e) => {
        const val = e.target.value;
        setPeriodSetting(pIdx, setName, { collection: val });
        updateModalState();
      };

      periodsFlow.appendChild(card);
    });

    // Wire Batch Advance All Sets Button in toolbar
    const pendingAdvances = [];
    timetableDayList.forEach((slot, pIdx) => {
      if (slot.type === 'lesson') {
        const match = slot.raw ? slot.raw.match(/Set\s+[0-9a-zA-Z]+/i) : null;
        const setName = match ? match[0] : slot.raw ? slot.raw.split('\n')[0] : 'Class';
        const prev = findPreviousCoverForSet(setName);
        if (prev && prev.nextLesson) {
          const curUnit =
            selectedUnits[pIdx] ||
            (DEFAULT_SET_MAPPING[setName] && DEFAULT_SET_MAPPING[setName].unit) ||
            'great_war';
          const curL =
            selectedLessons[pIdx] !== undefined
              ? selectedLessons[pIdx]
              : (DEFAULT_SET_MAPPING[setName] && DEFAULT_SET_MAPPING[setName].default_lesson) || 0;
          if (curL !== prev.nextLesson.idx || curUnit !== prev.unitId) {
            pendingAdvances.push({
              pIdx,
              setName,
              unitId: prev.unitId,
              nextLessonIdx: prev.nextLesson.idx,
            });
          }
        }
      }
    });

    const btnAdvanceAllSets = overlay.querySelector('#btnAdvanceAllSets');
    if (btnAdvanceAllSets) {
      if (pendingAdvances.length > 0) {
        btnAdvanceAllSets.style.display = 'inline-flex';
        btnAdvanceAllSets.innerHTML = `<i class="fa-solid fa-forward-step"></i> +1 Advance All Sets (${pendingAdvances.length})`;
        btnAdvanceAllSets.onclick = () => {
          pendingAdvances.forEach((item) => {
            selectedUnits[item.pIdx] = item.unitId;
            selectedLessons[item.pIdx] = item.nextLessonIdx;
            saveTopicForSet(item.setName, item.unitId, item.nextLessonIdx);
          });
          updateModalState();
        };
      } else {
        btnAdvanceAllSets.style.display = 'none';
      }
    }

    // 5. Generate Synchronized Clean Plain-Text Output
    const emailLines = [];
    emailLines.push(`Dear ${recipient},`);
    emailLines.push(
      `Please find below the cover ${whenPhrase}${currentDay}, ${dateStr} (${currentWeek}).`,
    );
    emailLines.push('Tutor AM / PM Warrior 2');

    if (includeGeneralNote && generalNote) {
      emailLines.push(`Duties: ${dutiesStr} ${generalNote}`);
    } else {
      emailLines.push(`Duties: ${dutiesStr}`);
    }

    periodsData.forEach((p) => {
      if (p.type === 'hub') {
        emailLines.push(`${p.period.toUpperCase()} (${p.time}) — HUB SUPERVISION`);
        emailLines.push('SUPERVISION ONLY — NO COVER WORK TO SET');
        return;
      }
      if (p.type === 'club') {
        emailLines.push(`${p.period.toUpperCase()} (${p.time}) — ${p.title.toUpperCase()}`);
        emailLines.push('SUPERVISION ONLY — NO COVER WORK TO SET');
        return;
      }
      emailLines.push(`▶ ${p.period.toUpperCase()} (${p.time}) — ${p.setName}`);
      emailLines.push(`Topic: ${p.topicName} (${p.unitName}) [${p.liveUrl}]`);

      if (includePolicyNotes) {
        const pSet = getPeriodSetting(p.pIdx, p.setName);
        if (pSet.resource === 'laptops' || pSet.resource === 'none') {
          // Laptops used as textbooks: omit physical resources line
        } else if (pSet.resource === 'paper') {
          emailLines.push('Resources: Paper only — pupils complete all work on lined A4 paper.');
        } else {
          if (pSet.shelf) {
            emailLines.push(
              'Resources: Printed physical workbooks — please hand out from classroom shelf and ensure all are returned to shelf at end.',
            );
          } else {
            emailLines.push('Resources: Pupils should work in their printed physical workbooks.');
          }
        }
        if (pSet.collection === 'folders') {
          emailLines.push(
            'Work Collection: Pupils keep completed work in their books/folders for next lesson.',
          );
        } else if (pSet.collection === 'digital') {
          emailLines.push(
            'Work Collection: Pupils submit work digitally via Google Classroom / VLE.',
          );
        } else {
          emailLines.push(
            'Work Collection: Please collect all pupil work at the end of the period.',
          );
        }
      }
    });

    emailLines.push(
      'Early Finishers: Pupils should navigate to the Revision Zone flashcards or Living Timeline challenge on the platform.',
    );
    emailLines.push('Thanks');
    emailLines.push(sender);

    const emailText = emailLines.join('\n');
    emailOutputArea.value = emailText;

    // 6. Configure Outlook Web & Mailto Links
    const encodedSubj = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(emailText);

    mailtoBtn.href = `mailto:?subject=${encodedSubj}&body=${encodedBody}`;
    outlookBtn.href = `https://outlook.office.com/mail/deeplink/compose?subject=${encodedSubj}&body=${encodedBody}`;

    // Update live dispatch payload for recording upon actual dispatch / copy
    currentDispatchPayload = {
      dateStr: dateStr,
      dayName: currentDay,
      week: currentWeek,
      entries: periodsData
        .filter((p) => p.type === 'lesson')
        .map((p) => ({
          period: p.period,
          setName: p.setName,
          unitId: p.unitId,
          unitTitle: p.unitName,
          topic: p.topicName,
          lessonIdx: p.lessonIdx,
        })),
    };

    renderRecentHistory();
  };

  const commitDispatchToLog = () => {
    if (
      currentDispatchPayload &&
      currentDispatchPayload.entries &&
      currentDispatchPayload.entries.length > 0
    ) {
      currentDispatchPayload.recordedAt = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      saveToCoverLog(currentDispatchPayload);
      renderRecentHistory();
    }
  };

  // Event Listeners for Week & Day Toggles (Legacy & Test Script Support)
  if (btnWeekA) {
    btnWeekA.onclick = () => {
      currentWeek = 'Week A';
      selectedLessons = {};
      updateModalState();
    };
  }

  if (btnWeekB) {
    btnWeekB.onclick = () => {
      currentWeek = 'Week B';
      selectedLessons = {};
      updateModalState();
    };
  }

  dayButtons.forEach((btn) => {
    btn.onclick = () => {
      currentDay = btn.getAttribute('data-day');
      selectedLessons = {};
      updateModalState();
    };
  });

  if (btnApplyDefaultsToAll) {
    btnApplyDefaultsToAll.onclick = () => {
      const rawDayData =
        TIMETABLE_DATA[currentWeek] && TIMETABLE_DATA[currentWeek][currentDay]
          ? TIMETABLE_DATA[currentWeek][currentDay]
          : [];
      rawDayData.forEach((slot, pIdx) => {
        const match = slot.raw ? slot.raw.match(/Set\s+[0-9a-zA-Z]+/i) : null;
        const setName = match ? match[0] : slot.raw ? slot.raw.split('\n')[0] : 'Class';
        setPeriodSetting(pIdx, setName, {
          resource: 'workbooks',
          shelf: true,
          collection: 'collect',
        });
      });
      const origHtml = btnApplyDefaultsToAll.innerHTML;
      btnApplyDefaultsToAll.innerHTML = '<i class="fa-solid fa-check"></i> Applied Workbooks!';
      btnApplyDefaultsToAll.style.color = '#34d399';
      btnApplyDefaultsToAll.style.borderColor = '#10b981';
      updateModalState();
      setTimeout(() => {
        btnApplyDefaultsToAll.innerHTML = origHtml;
        btnApplyDefaultsToAll.style.color = '#60a5fa';
        btnApplyDefaultsToAll.style.borderColor = '#3b82f6';
      }, 1500);
    };
  }

  if (chkIncludePolicy) {
    chkIncludePolicy.onchange = () => {
      includePolicyNotes = chkIncludePolicy.checked;
      updateModalState();
    };
  }

  if (recipientInput) {
    recipientInput.oninput = () => {
      localStorage.setItem('cover_recipient', recipientInput.value);
      updateModalState();
    };
  }

  if (senderInput) {
    senderInput.oninput = () => {
      localStorage.setItem('cover_sender_name', senderInput.value);
      updateModalState();
    };
  }

  if (generalNoteInput) {
    generalNoteInput.oninput = () => {
      localStorage.setItem('cover_general_note', generalNoteInput.value);
      updateModalState();
    };
  }

  if (chkIncludeGeneralNote) {
    chkIncludeGeneralNote.onchange = () => {
      updateModalState();
    };
  }

  mailtoBtn.onclick = () => {
    commitDispatchToLog();
  };

  outlookBtn.onclick = () => {
    commitDispatchToLog();
  };

  // Copy Action with rich feedback
  copyActionBtn.onclick = () => {
    commitDispatchToLog();
    navigator.clipboard
      .writeText(emailOutputArea.value)
      .then(() => {
        const orig = copyActionBtn.innerHTML;
        copyActionBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied to Clipboard!';
        copyActionBtn.style.background = '#10b981';
        copyActionBtn.style.borderColor = '#059669';
        setTimeout(() => {
          copyActionBtn.innerHTML = orig;
          copyActionBtn.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
          copyActionBtn.style.borderColor = '#3b82f6';
        }, 2000);
      })
      .catch((err) => {
        console.warn('Clipboard write error:', err);
        emailOutputArea.select();
        document.execCommand('copy');
        alert('Copied to clipboard!');
      });
  };

  // Close handlers
  const closeModal = () => {
    window.removeEventListener('keydown', handleEsc);
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 250);
  };

  const handleEsc = (e) => {
    if (e.key === 'Escape') closeModal();
  };
  window.addEventListener('keydown', handleEsc);

  closeBtn.onclick = closeModal;
  overlay.onclick = (e) => {
    if (e.target === overlay) closeModal();
  };

  // Initialize
  updateModalState();

  overlay.style.opacity = '1';
  modalContainer.style.transform = 'scale(1)';
};

export function openGuidedReadingModal(lessonIndex) {
  const activeUnit =
    window.currentUnitData || (appStore && appStore.state && appStore.state.activeUnitData) || {};
  const readings = activeUnit.guided_reading || [];
  if (!readings || readings.length === 0) {
    alert('No guided reading extracts available for this unit.');
    return;
  }

  // Determine current lesson index if not specified
  let targetIndex = lessonIndex;
  if (targetIndex === undefined || isNaN(targetIndex)) {
    const allLessons = activeUnit.lessons || [];
    const activeLesson = window.currentActiveLesson;
    if (activeLesson) {
      targetIndex = allLessons.findIndex(
        (l) => l.title === activeLesson.title || (activeLesson.id && l.id === activeLesson.id),
      );
    }
    if (targetIndex === -1 || targetIndex === undefined) targetIndex = 0;
  }

  let readingData = readings.find((r) => r.lesson_index === targetIndex);
  if (!readingData) {
    readingData = readings[0];
  }

  let modal = document.getElementById('guided-reading-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'guided-reading-modal';
    modal.style.cssText =
      'position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(8px); z-index: 10050; display: flex; align-items: center; justify-content: center; padding: 20px; opacity: 0; transition: opacity 0.25s ease;';
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        window.closeGuidedReadingModal();
      }
    });
  }

  // Render modal content
  modal.innerHTML = `
    <div class="guided-reading-modal-card" style="background: #ffffff; border-radius: 12px; width: 96%; max-width: 1100px; max-height: 92vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35); border: 1px solid #e2e8f0;">
      
      <!-- Modal Header -->
      <div style="padding: 16px 24px; background: linear-gradient(to right, #fdf2f8, #ffffff); border-bottom: 1px solid #fbcfe8; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <span style="background: #be185d; color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-book-open-reader"></i> Lesson ${readingData.lesson_index + 1} Guided Reading
          </span>
          <h3 style="margin: 0; font-family: 'Playfair Display', serif; color: #831843; font-size: 1.4rem; font-weight: 700;">
            ${readingData.book_title}
          </h3>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          ${
            readings.length > 1
              ? `
            <select id="gr-lesson-select" style="padding: 5px 10px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-family: 'Inter', sans-serif; font-size: 0.85rem; background: white; color: #1e293b; cursor: pointer;">
              ${readings
                .map(
                  (r) =>
                    `<option value="${r.lesson_index}" ${r.lesson_index === readingData.lesson_index ? 'selected' : ''}>Lesson ${r.lesson_index + 1}: ${r.book_title}</option>`,
                )
                .join('')}
            </select>
          `
              : ''
          }
          <button onclick="window.closeGuidedReadingModal()" style="background: none; border: none; font-size: 1.4rem; color: #64748b; cursor: pointer; padding: 4px 8px; border-radius: 6px; display: flex; align-items: center; justify-content: center;" title="Close (Esc)">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- Modal Body (Two-Column Layout) -->
      <div style="padding: 24px; overflow-y: auto; display: flex; gap: 28px; flex: 1; min-height: 0;" class="guided-reading-modal-body">
        
        <!-- Left Column: Source / Author / Audio / Think-Pair-Share -->
        <div style="width: 320px; flex-shrink: 0; display: flex; flex-direction: column; gap: 16px;">
          
          <!-- Source Cover Image -->
          ${
            readingData.cover_image
              ? `
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
              <img src="${getAssetUrl(readingData.cover_image)}" alt="${readingData.book_title}" style="width: 100%; height: auto; border-radius: 6px; display: block; max-height: 200px; object-fit: cover;">
              ${
                readingData.cover_caption
                  ? `
                <div style="font-size: 0.78rem; color: #64748b; margin-top: 8px; line-height: 1.35; font-style: italic; border-top: 1px solid #e2e8f0; padding-top: 6px;">
                  ${readingData.cover_caption}
                </div>
              `
                  : ''
              }
            </div>
          `
              : ''
          }

          <!-- Author Box -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
            <div style="font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 700; margin-bottom: 4px;">Author</div>
            <div style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">${readingData.author}</div>
            ${
              readingData.author_context
                ? `
              <div style="font-size: 0.85rem; color: #334155; line-height: 1.45;">
                ${readingData.author_context}
              </div>
            `
                : ''
            }
          </div>

          <!-- Audio Read-Aloud Player -->
          ${
            readingData.audio_file
              ? `
            <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.82rem; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
                  <i class="fa-solid fa-volume-high" style="color: #2563eb;"></i> Audio Read-Aloud
                </span>
                <span id="gr-audio-status" style="font-size: 0.75rem; color: #64748b;">Ready</span>
              </div>
              <button id="gr-play-btn" class="btn" onclick="window.toggleGuidedReadingAudio()" style="background: #2563eb; color: white; border: none; padding: 8px 14px; border-radius: 6px; font-weight: 700; font-size: 0.88rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 2px 4px rgba(37,99,235,0.25);">
                <i class="fa-solid fa-play"></i> Play Audio Reading
              </button>
              <audio id="gr-audio-element" src="${getAssetUrl(readingData.audio_file)}" preload="none"></audio>
            </div>
          `
              : ''
          }

          <!-- Think-Pair-Share Box -->
          <div style="background: #fdf2f8; border: 1.5px solid #fbcfe8; border-radius: 8px; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 8px; color: #be185d; font-weight: 700; font-size: 0.92rem; text-transform: uppercase; letter-spacing: 0.5px;">
              <i class="fa-solid fa-users"></i> Think-Pair-Share Challenge
            </div>
            <div style="font-size: 0.88rem; color: #831843; line-height: 1.5;">
              ${readingData.hinge_question || 'Discuss the core argument made by the author in this primary extract.'}
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-top: 4px;">
              <div style="background: white; border: 1px solid #fbcfe8; border-radius: 4px; padding: 6px 4px; text-align: center; font-size: 0.75rem; color: #9d174d; font-weight: 600;">
                <i class="fa-regular fa-lightbulb"></i> 1m Think
              </div>
              <div style="background: white; border: 1px solid #fbcfe8; border-radius: 4px; padding: 6px 4px; text-align: center; font-size: 0.75rem; color: #9d174d; font-weight: 600;">
                <i class="fa-solid fa-user-group"></i> 2m Pair
              </div>
              <div style="background: white; border: 1px solid #fbcfe8; border-radius: 4px; padding: 6px 4px; text-align: center; font-size: 0.75rem; color: #9d174d; font-weight: 600;">
                <i class="fa-solid fa-bullhorn"></i> 2m Share
              </div>
            </div>
          </div>

        </div>

        <!-- Right Column: Reading Extract & Glossary -->
        <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 14px;">
          
          <!-- Extract Header Banner -->
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
            <span style="font-size: 0.82rem; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
              Primary Text & Archival Excerpt
            </span>
            ${
              readingData.is_adapted !== undefined
                ? readingData.is_adapted
                  ? `<span style="display: inline-flex; align-items: center; gap: 5px; font-size: 0.78rem; font-weight: 700; color: #b45309; background: #fffbeb; border: 1px solid #fde68a; padding: 3px 8px; border-radius: 4px;"><i class="fa-solid fa-triangle-exclamation"></i> Adapted for Classroom</span>`
                  : `<span style="display: inline-flex; align-items: center; gap: 5px; font-size: 0.78rem; font-weight: 700; color: #047857; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 3px 8px; border-radius: 4px;"><i class="fa-solid fa-check"></i> Verbatim Primary Source</span>`
                : ''
            }
          </div>

          <!-- Extract Body -->
          <div class="guided-reading-text-body" style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.18rem; line-height: 1.8; color: #0f172a; padding: 24px; background: #fafafa; border-radius: 8px; border: 1px solid #e2e8f0; overflow-y: auto; flex: 1;">
            ${readingData.extract}
          </div>

        </div>

      </div>

    </div>
  `;

  // Attach select listener if multiple readings
  const sel = modal.querySelector('#gr-lesson-select');
  if (sel) {
    sel.addEventListener('change', (e) => {
      const newIdx = parseInt(e.target.value, 10);
      window.openGuidedReadingModal(newIdx);
    });
  }

  // Audio setup
  const audioEl = modal.querySelector('#gr-audio-element');
  const playBtn = modal.querySelector('#gr-play-btn');
  const statusEl = modal.querySelector('#gr-audio-status');
  if (audioEl && playBtn) {
    audioEl.addEventListener('play', () => {
      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause Audio Reading';
      playBtn.style.background = '#dc2626';
      if (statusEl) statusEl.innerText = 'Playing...';
    });
    audioEl.addEventListener('pause', () => {
      playBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play Audio Reading';
      playBtn.style.background = '#2563eb';
      if (statusEl) statusEl.innerText = 'Paused';
    });
    audioEl.addEventListener('ended', () => {
      playBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play Audio Reading';
      playBtn.style.background = '#2563eb';
      if (statusEl) statusEl.innerText = 'Completed';
    });
    audioEl.addEventListener('error', () => {
      if (statusEl) statusEl.innerText = 'Audio not found';
    });
  }

  modal.style.display = 'flex';
  void modal.offsetWidth;
  modal.style.opacity = '1';

  // Attach Escape listener
  if (!window._grModalKeyHandlerAttached) {
    window._grModalKeyHandlerAttached = true;
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.closeGuidedReadingModal();
      }
    });
  }
}

window.openGuidedReadingModal = openGuidedReadingModal;

export function closeGuidedReadingModal() {
  const modal = document.getElementById('guided-reading-modal');
  if (modal) {
    const audioEl = modal.querySelector('#gr-audio-element');
    if (audioEl) {
      audioEl.pause();
    }
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 250);
  }
}

window.closeGuidedReadingModal = closeGuidedReadingModal;

window.toggleGuidedReadingAudio = function () {
  const modal = document.getElementById('guided-reading-modal');
  if (!modal) return;
  const audioEl = modal.querySelector('#gr-audio-element');
  if (!audioEl) return;
  if (audioEl.paused) {
    audioEl.play().catch((err) => {
      console.warn('Could not play guided reading audio:', err);
      const statusEl = modal.querySelector('#gr-audio-status');
      if (statusEl) statusEl.innerText = 'No audio file';
    });
  } else {
    audioEl.pause();
  }
};

// ==========================================
// Task 4 Focused Interactive Workspace Modal
// ==========================================
let t4TimerSeconds = 900;
let t4TimerInterval = null;
let t4CurrentInPageTextarea = null;

export function openTask4WorkspaceModal(taskId, target) {
  const container = document.getElementById(taskId) || target?.closest('.task-box');
  if (!container) return;

  t4CurrentInPageTextarea = container.querySelector('textarea.interactive-textarea');
  const initialText = t4CurrentInPageTextarea ? t4CurrentInPageTextarea.value : '';

  // Extract Question / Title
  const headingEl = container.querySelector('h4');
  const questionEl = container.querySelector('[style*="border-left: 4px"]');
  const titleText = headingEl
    ? headingEl.textContent.trim()
    : 'Task 4: Interactive Enquiry Workspace';
  const promptText = questionEl ? questionEl.innerHTML : '';

  // Extract Side-by-side cards
  const gridEl = container.querySelector(
    '[style*="grid-template-columns: repeat(auto-fit, minmax(320px"]',
  );
  const sourcesHtml = gridEl ? gridEl.outerHTML : '';

  // Extract 3-Step Matrix
  const matrixEl =
    container.querySelector('[style*="3-Step"]')?.parentElement ||
    container.querySelectorAll('[style*="border-radius: 8px"]')[0];
  const matrixHtml = matrixEl ? matrixEl.outerHTML : '';

  // Extract Connectives
  const connectivesEl =
    container.querySelector('[style*="Analytical Connectives"]') ||
    container.querySelector('[style*="Historiographical Connectives"]');
  const connectivesHtml = connectivesEl ? connectivesEl.outerHTML : '';

  // Extract Model Answer
  const modelEl = container.querySelector('details.model-paragraph-reveal');
  const modelHtml = modelEl ? modelEl.outerHTML : '';

  let modal = document.getElementById('task4-workspace-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'task4-workspace-modal';
    document.body.appendChild(modal);
  }

  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(15, 23, 42, 0.94);
    backdrop-filter: blur(10px);
    z-index: 10005;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 16px 24px;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  `;

  const wordCount = initialText.trim() ? initialText.trim().split(/\s+/).length : 0;
  const activeLesson = window.currentActiveLesson || {};
  const mak = activeLesson.teacher_notes?.model_answer_key;

  modal.innerHTML = `
    <!-- Modal Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(255, 255, 255, 0.15); padding-bottom: 12px; flex-wrap: wrap; gap: 12px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="background: #2563eb; color: #ffffff; padding: 6px 12px; border-radius: 6px; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">
          <i class="fa-solid fa-rocket" style="margin-right: 6px;"></i> Task 4 Workspace
        </span>
        <div>
          <h3 style="margin: 0; color: #f8fafc; font-size: 1.15rem; font-weight: 700;">${titleText}</h3>
        </div>
      </div>

      <!-- Exam Timer Controls -->
      <div style="display: flex; align-items: center; gap: 8px; background: rgba(0, 0, 0, 0.45); padding: 5px 14px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.15);">
        <span style="color: #94a3b8; font-size: 0.76rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">
          <i class="fa-solid fa-stopwatch" style="color: #f59e0b; margin-right: 4px;"></i> 15m Timer:
        </span>
        <span id="t4-timer-display" style="font-family: monospace; font-size: 1.25rem; font-weight: 800; color: #facc15; min-width: 55px; text-align: center;">15:00</span>
        <button type="button" id="t4-timer-toggle-btn" class="btn btn-pedagogy-sm" style="padding: 3px 9px; font-size: 0.78rem; background: #2563eb; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">
          <i class="fa-solid fa-play"></i> Start
        </button>
        <button type="button" id="t4-timer-reset-btn" class="btn btn-pedagogy-sm" style="padding: 3px 7px; font-size: 0.78rem; background: rgba(255,255,255,0.12); color: #cbd5e1; border: none; border-radius: 4px; cursor: pointer;" title="Reset Timer to 15:00">
          <i class="fa-solid fa-rotate-left"></i>
        </button>
      </div>

      <!-- Actions -->
      <div style="display: flex; align-items: center; gap: 10px;">
        <span id="t4-modal-word-count" style="color: #38bdf8; font-family: monospace; font-size: 0.9rem; font-weight: 700; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); padding: 4px 10px; border-radius: 6px;">
          ${wordCount} Words
        </span>
        ${
          mak
            ? `
          <button type="button" id="t4-whiteboard-rubric-btn" class="btn btn-pedagogy-sm" style="background: #f59e0b; color: #451a03; font-weight: 700; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-chalkboard"></i> Whiteboard Rubric
          </button>
        `
            : ''
        }
        <button type="button" class="btn" data-action="close-task4-workspace" style="background: #10b981; color: #ffffff; font-weight: 700; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);">
          <i class="fa-solid fa-check"></i> Save & Return
        </button>
      </div>
    </div>

    <!-- Whiteboard Rubric Overlay (Collapsible) -->
    ${
      mak
        ? `
      <div id="t4-modal-rubric-drawer" style="display: none; margin-top: 12px; background: rgba(15, 23, 42, 0.95); border: 1.5px solid #f59e0b; border-radius: 8px; padding: 14px; max-height: 220px; overflow-y: auto;">
        <div style="font-weight: 700; color: #facc15; font-size: 0.92rem; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
          <span><i class="fa-solid fa-award"></i> Teacher Model Answer Key &bull; Whiteboard Rubric</span>
          <span style="font-size: 0.75rem; color: #cbd5e1;">Project on classroom board for live feedback</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px;">
          ${['level_1', 'level_2', 'level_3', 'level_4']
            .map((lvlKey, idx) => {
              const lvl = mak[lvlKey];
              if (!lvl) return '';
              const borderCol =
                idx === 0 ? '#94a3b8' : idx === 1 ? '#38bdf8' : idx === 2 ? '#34d399' : '#f59e0b';
              return `
              <div style="background: rgba(255,255,255,0.05); border: 1px solid ${borderCol}; border-radius: 6px; padding: 8px; font-size: 0.78rem;">
                <div style="font-weight: 700; color: ${borderCol}; text-transform: uppercase;">Level ${idx + 1} (${lvl.marks || (idx === 0 ? '1–2m' : idx === 1 ? '3–4m' : idx === 2 ? '5–6m' : '7–8m')})</div>
                <div style="color: #f1f5f9; font-weight: 600; margin: 2px 0;">${lvl.title}</div>
                <div style="color: #cbd5e1; font-style: italic; background: rgba(0,0,0,0.3); padding: 4px 6px; border-radius: 3px; margin-top: 4px;">&ldquo;${lvl.exemplar}&rdquo;</div>
              </div>
            `;
            })
            .join('')}
        </div>
      </div>
    `
        : ''
    }

    <!-- Modal Two-Pane Workspace -->
    <div style="flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; min-height: 0; margin-top: 14px;">
      <!-- Left Column: Primary Evidence & Planning Matrix -->
      <div style="background: #ffffff; border-radius: 8px; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        ${
          promptText
            ? `
          <div style="font-size: 0.95rem; font-weight: 700; color: #0f172a; padding: 8px 12px; background: #eff6ff; border-left: 4px solid #2563eb; border-radius: 0 6px 6px 0;">
            ${promptText}
          </div>
        `
            : ''
        }
        ${sourcesHtml ? `<div>${sourcesHtml}</div>` : ''}
        ${matrixHtml ? `<div>${matrixHtml}</div>` : ''}
        ${connectivesHtml ? `<div>${connectivesHtml}</div>` : ''}
      </div>

      <!-- Right Column: Focused Pupil Writing Area -->
      <div style="background: #ffffff; border-radius: 8px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-height: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
          <span style="font-weight: 700; font-size: 0.9rem; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            <i class="fa-solid fa-pen-nib" style="color: #2563eb; margin-right: 6px;"></i> Extended Essay Response
          </span>
          <span style="font-size: 0.78rem; color: #64748b; font-style: italic;">
            <i class="fa-solid fa-cloud-arrow-up" style="color: #10b981;"></i> Changes sync live to your workbook
          </span>
        </div>

        <textarea id="t4-modal-textarea" style="flex: 1; width: 100%; box-sizing: border-box; resize: none; font-size: 1rem; font-family: inherit; line-height: 1.6; padding: 14px; border: 1.5px solid #cbd5e1; border-radius: 6px; outline: none; margin-bottom: 10px;" placeholder="Type your detailed, evaluative exam response here...">${initialText}</textarea>

        ${
          modelHtml
            ? `
          <div style="border-top: 1px solid #e2e8f0; padding-top: 8px;">
            ${modelHtml}
          </div>
        `
            : ''
        }
      </div>
    </div>
  `;

  modal.style.display = 'flex';

  // Wire Textarea Live Sync
  const modalTextarea = modal.querySelector('#t4-modal-textarea');
  const wordCountBadge = modal.querySelector('#t4-modal-word-count');
  if (modalTextarea) {
    modalTextarea.focus();
    modalTextarea.addEventListener('input', () => {
      const val = modalTextarea.value;
      if (t4CurrentInPageTextarea) {
        t4CurrentInPageTextarea.value = val;
      }
      const words = val.trim() ? val.trim().split(/\s+/).length : 0;
      if (wordCountBadge) wordCountBadge.textContent = `${words} Words`;
    });
  }

  // Wire Timer
  const timerDisplay = modal.querySelector('#t4-timer-display');
  const timerToggleBtn = modal.querySelector('#t4-timer-toggle-btn');
  const timerResetBtn = modal.querySelector('#t4-timer-reset-btn');

  const updateTimerDisplay = () => {
    if (!timerDisplay) return;
    const mins = Math.floor(t4TimerSeconds / 60);
    const secs = t4TimerSeconds % 60;
    timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    if (t4TimerSeconds <= 120) {
      timerDisplay.style.color = '#ef4444';
    } else {
      timerDisplay.style.color = '#facc15';
    }
  };

  if (timerToggleBtn) {
    timerToggleBtn.onclick = () => {
      if (t4TimerInterval) {
        clearInterval(t4TimerInterval);
        t4TimerInterval = null;
        timerToggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
        timerToggleBtn.style.background = '#2563eb';
      } else {
        timerToggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
        timerToggleBtn.style.background = '#e11d48';
        t4TimerInterval = setInterval(() => {
          if (t4TimerSeconds > 0) {
            t4TimerSeconds--;
            updateTimerDisplay();
          } else {
            clearInterval(t4TimerInterval);
            t4TimerInterval = null;
            timerToggleBtn.innerHTML = '<i class="fa-solid fa-flag-checkered"></i> Done';
            timerToggleBtn.style.background = '#10b981';
          }
        }, 1000);
      }
    };
  }

  if (timerResetBtn) {
    timerResetBtn.onclick = () => {
      if (t4TimerInterval) {
        clearInterval(t4TimerInterval);
        t4TimerInterval = null;
      }
      t4TimerSeconds = 900;
      updateTimerDisplay();
      if (timerToggleBtn) {
        timerToggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
        timerToggleBtn.style.background = '#2563eb';
      }
    };
  }

  // Wire Whiteboard Rubric Toggle
  const rubricBtn = modal.querySelector('#t4-whiteboard-rubric-btn');
  const rubricDrawer = modal.querySelector('#t4-modal-rubric-drawer');
  if (rubricBtn && rubricDrawer) {
    rubricBtn.onclick = () => {
      const isHidden = rubricDrawer.style.display === 'none';
      rubricDrawer.style.display = isHidden ? 'block' : 'none';
      rubricBtn.style.background = isHidden ? '#d97706' : '#f59e0b';
    };
  }

  // Escape Key listener
  if (!window._t4KeyHandlerAttached) {
    window._t4KeyHandlerAttached = true;
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const m = document.getElementById('task4-workspace-modal');
        if (m && m.style.display === 'flex') {
          closeTask4WorkspaceModal();
        }
      }
    });
  }
}

export function closeTask4WorkspaceModal() {
  const modal = document.getElementById('task4-workspace-modal');
  if (modal) {
    const modalTextarea = modal.querySelector('#t4-modal-textarea');
    if (modalTextarea && t4CurrentInPageTextarea) {
      t4CurrentInPageTextarea.value = modalTextarea.value;
    }
    if (t4TimerInterval) {
      clearInterval(t4TimerInterval);
      t4TimerInterval = null;
    }
    modal.style.display = 'none';
  }
}

window.openTask4WorkspaceModal = openTask4WorkspaceModal;
window.closeTask4WorkspaceModal = closeTask4WorkspaceModal;

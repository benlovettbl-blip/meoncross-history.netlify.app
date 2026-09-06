/**
 * Diagnostic 10-Minute Pre-Exam Readiness Benchmark Engine
 *
 * Provides secondary history pupils with an evidence-based, timed diagnostic
 * assessment that samples 20 questions evenly across historical eras/key topics,
 * diagnoses knowledge blind spots, and automatically populates missed questions
 * into Leitner Box 1 (Daily Review).
 */

import { state } from './state.js';

/**
 * Resolves the correct answer string from any question object format.
 */
function resolveAnswerString(q) {
  if (typeof q.a === 'string' && q.a.trim()) return q.a.trim();
  if (typeof q.answer === 'number' && q.options && q.options[q.answer]) {
    return q.options[q.answer].trim();
  }
  if (typeof q.answer === 'string') {
    const num = parseInt(q.answer, 10);
    if (!isNaN(num) && String(num) === q.answer.trim() && q.options && q.options[num]) {
      return q.options[num].trim();
    }
    if (q.answer.trim()) return q.answer.trim();
  }
  if (q.options && typeof q.answer !== 'undefined' && q.options[q.answer]) {
    return q.options[q.answer].trim();
  }
  if (q.explanation && typeof q.explanation === 'string' && !q.explanation.includes(' ')) {
    return q.explanation.trim();
  }
  return (q.answer || q.a || '').toString().trim();
}

/**
 * Shuffles an array in place using Fisher-Yates algorithm.
 */
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Partitions lessons and extracts 20 questions evenly distributed across eras/key topics.
 */
export function sampleDiagnosticQuestions(unitId, unitData) {
  const lessons = unitData.lessons || unitData.subtopics || [];
  if (!lessons || lessons.length === 0) return [];

  // Determine Eras / Key Topics
  const eras = [];
  const workbooks = unitData.workbooks || [];

  if (workbooks.length > 1) {
    // Multi-topic GCSE unit (e.g. Medicine, Elizabethan England, Weimar Germany)
    workbooks.forEach((wb, wbIdx) => {
      const prefix = wb.prefix || wb.id;
      const matchingLessons = lessons.filter(
        (l) => (l.id && l.id.startsWith(prefix)) || (l.title && l.title.startsWith(prefix)),
      );
      eras.push({
        id: wb.id || `era_${wbIdx}`,
        title: wb.title || wb.name || `Key Topic ${wbIdx + 1}`,
        lessons: matchingLessons.length > 0 ? matchingLessons : lessons,
        workbookId: wb.id || wb.name,
      });
    });
  } else {
    // Single-pack unit (KS3 or unified GCSE): split lessons chronologically into 4 quarters
    const quarterSize = Math.max(1, Math.ceil(lessons.length / 4));
    for (let i = 0; i < 4; i++) {
      const start = i * quarterSize;
      const end = Math.min(lessons.length, (i + 1) * quarterSize);
      const eraLessons = lessons.slice(start, end);
      if (eraLessons.length > 0) {
        const firstLessonTitle = eraLessons[0].title.replace(/^Lesson \d+:\s*/i, '').trim();
        const cleanTitle =
          firstLessonTitle.length > 45 ? firstLessonTitle.slice(0, 42) + '...' : firstLessonTitle;
        eras.push({
          id: `band_${i + 1}`,
          title: `Era ${i + 1}: ${cleanTitle}`,
          lessons: eraLessons,
          workbookId: 'full',
        });
      }
    }
  }

  if (eras.length === 0) return [];

  // Determine questions per era to reach exactly 20
  const questionsPerEra = Math.floor(20 / eras.length);
  const remainder = 20 % eras.length;

  const sampledQuestions = [];
  let questionCounter = 1;

  eras.forEach((era, eraIdx) => {
    const targetCount = questionsPerEra + (eraIdx < remainder ? 1 : 0);
    const pool = [];

    // Collect all multiple choice questions from lessons in this era
    era.lessons.forEach((l) => {
      if (l.quiz && Array.isArray(l.quiz)) {
        l.quiz.forEach((q) => {
          const ans = resolveAnswerString(q);
          const prompt = q.question || q.q;
          if (prompt && ans && q.options && Array.isArray(q.options) && q.options.length >= 2) {
            pool.push({
              prompt: prompt.trim(),
              answer: ans,
              options: [...q.options],
              explanation: q.explanation || `Core historical knowledge from ${l.title}.`,
              lessonTitle: l.title,
            });
          }
        });
      }

      if (l.do_now && Array.isArray(l.do_now.items)) {
        l.do_now.items.forEach((item) => {
          const ans = resolveAnswerString(item);
          const prompt = item.question || item.q;
          if (
            prompt &&
            ans &&
            item.options &&
            Array.isArray(item.options) &&
            item.options.length >= 2
          ) {
            pool.push({
              prompt: prompt.trim(),
              answer: ans,
              options: [...item.options],
              explanation: item.explanation || `Core recall statement from ${l.title}.`,
              lessonTitle: l.title,
            });
          }
        });
      }
    });

    const shuffledPool = shuffleArray(pool);
    const selected = shuffledPool.slice(0, targetCount);

    selected.forEach((q) => {
      // Ensure the options are randomized
      const shuffledOptions = shuffleArray(q.options);

      sampledQuestions.push({
        diagnosticId: questionCounter++,
        eraId: era.id,
        eraTitle: era.title,
        workbookId: era.workbookId,
        lessonTitle: q.lessonTitle,
        prompt: q.prompt,
        options: shuffledOptions,
        answer: q.answer,
        explanation: q.explanation,
      });
    });
  });

  // If fewer than 20 questions sampled, backfill from remaining unused questions in the unit
  if (sampledQuestions.length < 20) {
    const usedPrompts = new Set(sampledQuestions.map((q) => q.prompt));
    const backfillPool = [];

    lessons.forEach((l, lIdx) => {
      const era =
        eras[
          Math.min(
            eras.length - 1,
            Math.floor(lIdx / Math.max(1, Math.ceil(lessons.length / eras.length))),
          )
        ] || eras[0];
      if (l.quiz && Array.isArray(l.quiz)) {
        l.quiz.forEach((q) => {
          const ans = resolveAnswerString(q);
          const prompt = (q.question || q.q || '').trim();
          if (prompt && ans && q.options && q.options.length >= 2 && !usedPrompts.has(prompt)) {
            backfillPool.push({
              eraId: era.id,
              eraTitle: era.title,
              workbookId: era.workbookId,
              lessonTitle: l.title,
              prompt: prompt,
              options: shuffleArray(q.options),
              answer: ans,
              explanation: q.explanation || `Core historical knowledge from ${l.title}.`,
            });
            usedPrompts.add(prompt);
          }
        });
      }
    });

    const needed = 20 - sampledQuestions.length;
    const extra = shuffleArray(backfillPool).slice(0, needed);
    extra.forEach((q) => {
      sampledQuestions.push({
        diagnosticId: questionCounter++,
        ...q,
      });
    });
  }

  return sampledQuestions;
}

/**
 * Returns the HTML for the Diagnostic Benchmark Launcher banner in the Recall Arena.
 */
export function renderDiagnosticLauncherHTML(unitId, unitData) {
  return `
    <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); border-radius: 14px; padding: 26px 30px; margin-bottom: 30px; color: white; box-shadow: 0 10px 25px rgba(49, 46, 129, 0.25); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; border: 1px solid rgba(255, 255, 255, 0.15);">
      <div style="max-width: 680px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap;">
          <span style="background: rgba(245, 158, 11, 0.25); color: #fef08a; border: 1px solid rgba(245, 158, 11, 0.4); padding: 3px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
            ⏱️ 10-Minute Assessment
          </span>
          <span style="background: rgba(16, 185, 129, 0.2); color: #a7f3d0; padding: 3px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 700;">
            20 Balanced Questions
          </span>
          <span style="background: rgba(99, 102, 241, 0.3); color: #e0e7ff; padding: 3px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600;">
            Weakness Hunting &amp; Box 1 Sync
          </span>
        </div>

        <h2 style="margin: 0 0 8px 0; font-size: 1.5rem; font-family: 'Montserrat', sans-serif; font-weight: 800; color: #ffffff; letter-spacing: -0.3px;">
          Pre-Exam Readiness Benchmark
        </h2>
        <p style="margin: 0; color: #cbd5e1; font-size: 0.95rem; line-height: 1.45;">
          Unsure which historical era you are weakest in? Take a rapid 10-minute diagnostic check sampling 5 questions evenly from each key period. Pinpoints your knowledge blind spots and creates an instant targeted Leitner Box 1 revision deck.
        </p>
      </div>

      <div>
        <button id="btn-launch-diagnostic" class="btn-pedagogy-primary" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #000; font-weight: 800; font-size: 0.98rem; padding: 14px 26px; border-radius: 10px; border: none; cursor: pointer; display: flex; align-items: center; gap: 10px; box-shadow: 0 6px 18px rgba(245, 158, 11, 0.4); transition: all 0.2s ease;" onclick="window.startDiagnosticBenchmark('${unitId}')" onmouseover="this.style.filter='brightness(1.1)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.filter='brightness(1)'; this.style.transform='translateY(0)';">
          <i class="fa-solid fa-bullseye" style="font-size: 1.15rem;"></i>
          <span>Start 10-Min Benchmark</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Diagnostic Benchmark Session State
 */
let activeSession = null;

/**
 * Handles direct keyboard hotkeys and navigation during Diagnostic Benchmark:
 * - 1, 2, 3, 4 or A, B, C, D: Instantly select corresponding option
 * - Enter or ArrowRight: Advance to next question (or submit on question 20)
 * - ArrowLeft: Return to previous question
 * - Escape: Close modal / prompt exit
 */
function handleDiagnosticKeydown(e) {
  if (!activeSession || activeSession.isCompleted) return;

  const tag = e.target ? e.target.tagName : '';
  if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;

  const key = e.key;

  // Handle Option selection (1-4 or A-D)
  const q = activeSession.questions[activeSession.currentIndex];
  if (!q) return;

  let optionIndex = -1;
  if (key === '1' || key.toLowerCase() === 'a') optionIndex = 0;
  else if (key === '2' || key.toLowerCase() === 'b') optionIndex = 1;
  else if (key === '3' || key.toLowerCase() === 'c') optionIndex = 2;
  else if (key === '4' || key.toLowerCase() === 'd') optionIndex = 3;

  if (optionIndex >= 0 && q.options && optionIndex < q.options.length) {
    e.preventDefault();
    const opt = q.options[optionIndex];
    window.selectDiagnosticAnswer(encodeURIComponent(opt));
    return;
  }

  // Handle Navigation (ArrowRight / Enter -> Next)
  if (key === 'ArrowRight' || key === 'Enter') {
    const confirmPrompt = document.getElementById('diag-confirm-prompt');
    if (confirmPrompt) {
      e.preventDefault();
      confirmPrompt.remove();
      window.submitDiagnosticBenchmark(true);
      return;
    }

    e.preventDefault();
    if (activeSession.currentIndex < activeSession.questions.length - 1) {
      window.nextDiagnosticQuestion();
    } else {
      window.submitDiagnosticBenchmark();
    }
    return;
  }

  // Handle Navigation (ArrowLeft -> Previous)
  if (key === 'ArrowLeft') {
    const confirmPrompt = document.getElementById('diag-confirm-prompt');
    if (confirmPrompt) {
      e.preventDefault();
      confirmPrompt.remove();
      return;
    }

    e.preventDefault();
    if (activeSession.currentIndex > 0) {
      window.prevDiagnosticQuestion();
    }
    return;
  }

  // Handle Escape (Exit)
  if (key === 'Escape') {
    const confirmPrompt = document.getElementById('diag-confirm-prompt');
    if (confirmPrompt) {
      e.preventDefault();
      confirmPrompt.remove();
      return;
    }

    e.preventDefault();
    window.closeDiagnosticModal();
    return;
  }
}

/**
 * Launches the interactive Diagnostic Benchmark Modal.
 */
export function startDiagnosticBenchmark(unitId) {
  const unitData = state.activeUnitData || window.currentUnitData || {};
  const questions = sampleDiagnosticQuestions(unitId, unitData);

  if (!questions || questions.length === 0) {
    alert('No multiple-choice questions found to generate a diagnostic benchmark for this unit.');
    return;
  }

  activeSession = {
    unitId,
    unitData,
    questions,
    answers: {}, // { [qIndex]: chosenOption }
    currentIndex: 0,
    timeRemainingSeconds: 600, // 10 minutes
    timerInterval: null,
    isCompleted: false,
  };

  createOrShowDiagnosticModal();
  startDiagnosticTimer();
  renderDiagnosticQuestion();

  // Attach keyboard shortcuts
  window.removeEventListener('keydown', handleDiagnosticKeydown);
  window.addEventListener('keydown', handleDiagnosticKeydown);
}

window.startDiagnosticBenchmark = startDiagnosticBenchmark;

/**
 * Creates and appends the Diagnostic Modal to the document.
 */
function createOrShowDiagnosticModal() {
  let modal = document.getElementById('diagnostic-benchmark-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'diagnostic-benchmark-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(8px);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-sizing: border-box;
      animation: fadeIn 0.2s ease-out;
    `;
    document.body.appendChild(modal);
  }

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

/**
 * Closes the diagnostic benchmark modal.
 */
export function closeDiagnosticModal(force = false) {
  if (!force && activeSession && !activeSession.isCompleted) {
    if (
      !confirm(
        'Are you sure you want to exit the Diagnostic Benchmark? Your current progress will be lost.',
      )
    ) {
      return;
    }
  }

  // Detach keyboard listener
  window.removeEventListener('keydown', handleDiagnosticKeydown);

  if (activeSession && activeSession.timerInterval) {
    clearInterval(activeSession.timerInterval);
    activeSession.timerInterval = null;
  }

  const modal = document.getElementById('diagnostic-benchmark-modal');
  if (modal) {
    modal.style.display = 'none';
    modal.innerHTML = '';
  }
  document.body.style.overflow = '';
  activeSession = null;
}

window.closeDiagnosticModal = closeDiagnosticModal;

/**
 * Starts the 10-minute countdown timer.
 */
function startDiagnosticTimer() {
  if (!activeSession) return;
  if (activeSession.timerInterval) clearInterval(activeSession.timerInterval);

  activeSession.timerInterval = setInterval(() => {
    if (!activeSession) return;
    activeSession.timeRemainingSeconds--;

    updateTimerDisplay();

    if (activeSession.timeRemainingSeconds <= 0) {
      clearInterval(activeSession.timerInterval);
      activeSession.timerInterval = null;
      alert('⏰ Time has expired! Submitting your Diagnostic Benchmark now.');
      submitDiagnosticBenchmark();
    }
  }, 1000);
}

/**
 * Updates the digital timer badge.
 */
function updateTimerDisplay() {
  const timerEl = document.getElementById('diag-timer-text');
  if (!timerEl || !activeSession) return;

  const totalSecs = Math.max(0, activeSession.timeRemainingSeconds);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  timerEl.textContent = formatted;

  timerEl.classList.remove('diag-timer-warn', 'diag-timer-crit');
  if (totalSecs <= 60) {
    timerEl.classList.add('diag-timer-crit');
  } else if (totalSecs <= 120) {
    timerEl.classList.add('diag-timer-warn');
  }
}

/**
 * Renders the active question inside the modal.
 */
function renderDiagnosticQuestion() {
  const modal = document.getElementById('diagnostic-benchmark-modal');
  if (!modal || !activeSession) return;

  const q = activeSession.questions[activeSession.currentIndex];
  const totalQ = activeSession.questions.length;
  const answeredCount = Object.keys(activeSession.answers).length;
  const selectedOption = activeSession.answers[activeSession.currentIndex];

  const totalSecs = Math.max(0, activeSession.timeRemainingSeconds);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  modal.innerHTML = `
    <div style="background: #ffffff; width: 100%; max-width: 900px; max-height: 94vh; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4); display: flex; flex-direction: column; overflow: hidden; font-family: 'Inter', sans-serif;">
      
      <!-- Top Header Bar -->
      <div style="background: #0f172a; color: white; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #334155; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="background: #4f46e5; color: white; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
            <i class="fa-solid fa-bullseye"></i>
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.05rem; font-weight: 700; color: #f8fafc; font-family: 'Montserrat', sans-serif;">Pre-Exam Readiness Benchmark</h3>
            <span style="font-size: 0.78rem; color: #94a3b8;">${activeSession.unitData.title || 'Curriculum Unit'} • 20 Balanced Questions</span>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 16px;">
          <!-- 10-Minute Countdown Clock -->
          <div style="background: rgba(30, 41, 59, 0.9); border: 1px solid #475569; padding: 6px 14px; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 0.95rem;">⏱️</span>
            <span id="diag-timer-text" style="font-family: 'Courier New', monospace; font-size: 1.15rem; font-weight: 800; color: #38bdf8; letter-spacing: 1px;">
              ${formattedTime}
            </span>
          </div>

          <button onclick="window.closeDiagnosticModal()" style="background: rgba(255,255,255,0.1); color: #cbd5e1; border: none; width: 34px; height: 34px; border-radius: 8px; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; transition: all 0.15s ease;" onmouseover="this.style.background='rgba(239,68,68,0.3)'; this.style.color='#fca5a5';" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.color='#cbd5e1';" title="Exit Benchmark">
            ✕
          </button>
        </div>
      </div>

      <!-- Question Progress Pill Track (1–20) -->
      <div style="background: #f8fafc; padding: 12px 24px; border-bottom: 1px solid #e2e8f0; display: flex; gap: 6px; overflow-x: auto; align-items: center;">
        <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; margin-right: 6px; white-space: nowrap; text-transform: uppercase;">Questions:</span>
        <div style="display: flex; gap: 6px; flex-wrap: nowrap;">
          ${activeSession.questions
            .map((item, idx) => {
              const isAnswered = typeof activeSession.answers[idx] !== 'undefined';
              const isCurrent = idx === activeSession.currentIndex;
              let bg = '#e2e8f0';
              let color = '#475569';
              let border = '1px solid #cbd5e1';

              if (isCurrent) {
                border = '2px solid #4f46e5';
                bg = '#e0e7ff';
                color = '#4338ca';
              } else if (isAnswered) {
                bg = '#d1fae5';
                color = '#065f46';
                border = '1px solid #a7f3d0';
              }

              return `
                <button onclick="window.jumpToDiagnosticQuestion(${idx})" style="min-width: 32px; height: 32px; border-radius: 6px; background: ${bg}; color: ${color}; border: ${border}; font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: all 0.15s ease; display: flex; align-items: center; justify-content: center;" title="Jump to Question ${idx + 1} (${item.eraTitle})">
                  ${idx + 1}
                </button>
              `;
            })
            .join('')}
        </div>
      </div>

      <!-- Main Question Body -->
      <div style="padding: 28px 32px; overflow-y: auto; flex: 1;">
        <!-- Era & Lesson Badge -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: #ede9fe; color: #5b21b6; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 6px; text-transform: uppercase;">
              ${q.eraTitle}
            </span>
            <span style="color: #64748b; font-size: 0.82rem;">
              • ${q.lessonTitle}
            </span>
          </div>
          <span style="font-size: 0.82rem; font-weight: 700; color: #4f46e5;">
            Question ${activeSession.currentIndex + 1} of ${totalQ}
          </span>
        </div>

        <!-- Question Prompt -->
        <h2 style="margin: 0 0 24px 0; font-size: 1.35rem; color: #0f172a; font-weight: 700; line-height: 1.45;">
          ${q.prompt}
        </h2>

        <!-- 4 Option Cards (A, B, C, D / Hotkeys 1, 2, 3, 4) -->
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
          ${q.options
            .map((opt, optIdx) => {
              const letter = String.fromCharCode(65 + optIdx);
              const numKey = optIdx + 1;
              const isSelected = selectedOption === opt;
              const borderStyle = isSelected ? '2px solid #4f46e5' : '1px solid #cbd5e1';
              const bgStyle = isSelected ? '#f5f3ff' : '#ffffff';
              const badgeBg = isSelected ? '#4f46e5' : '#f1f5f9';
              const badgeColor = isSelected ? '#ffffff' : '#475569';

              return `
                <div onclick="window.selectDiagnosticAnswer('${encodeURIComponent(opt)}')" style="background: ${bgStyle}; border: ${borderStyle}; border-radius: 10px; padding: 14px 18px; display: flex; align-items: center; gap: 14px; cursor: pointer; transition: all 0.15s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.03);" onmouseover="if(!${isSelected}) this.style.borderColor='#94a3b8';" onmouseout="if(!${isSelected}) this.style.borderColor='#cbd5e1';">
                  <div style="background: ${badgeBg}; color: ${badgeColor}; width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.92rem; flex-shrink: 0; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                    ${letter}
                  </div>
                  <div style="font-size: 1rem; color: #1e293b; font-weight: ${isSelected ? '600' : '500'}; flex: 1;">
                    ${opt}
                  </div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <kbd style="background: ${isSelected ? '#ede9fe' : '#f1f5f9'}; border: 1px solid ${isSelected ? '#c4b5fd' : '#cbd5e1'}; color: ${isSelected ? '#4338ca' : '#64748b'}; padding: 2px 7px; border-radius: 5px; font-size: 0.72rem; font-family: monospace; font-weight: 700; display: inline-flex; align-items: center; gap: 3px;" title="Press '${numKey}' or '${letter}'">
                      <span>${numKey}</span><span style="opacity: 0.4;">/</span><span>${letter}</span>
                    </kbd>
                    ${isSelected ? `<i class="fa-solid fa-circle-check" style="color: #4f46e5; font-size: 1.25rem;"></i>` : ''}
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>
      </div>

      <!-- Navigation & Submission Footer -->
      <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <button onclick="window.prevDiagnosticQuestion()" ${activeSession.currentIndex === 0 ? 'disabled' : ''} style="background: white; border: 1px solid #cbd5e1; color: #334155; padding: 9px 15px; border-radius: 8px; font-weight: 600; font-size: 0.88rem; cursor: ${activeSession.currentIndex === 0 ? 'not-allowed' : 'pointer'}; opacity: ${activeSession.currentIndex === 0 ? '0.5' : '1'}; transition: all 0.15s ease;" title="Previous Question (Left Arrow)">
            ⬅️ Prev
          </button>
          <button onclick="window.nextDiagnosticQuestion()" ${activeSession.currentIndex === totalQ - 1 ? 'disabled' : ''} style="background: white; border: 1px solid #cbd5e1; color: #334155; padding: 9px 15px; border-radius: 8px; font-weight: 600; font-size: 0.88rem; cursor: ${activeSession.currentIndex === totalQ - 1 ? 'not-allowed' : 'pointer'}; opacity: ${activeSession.currentIndex === totalQ - 1 ? '0.5' : '1'}; transition: all 0.15s ease;" title="Next Question (Right Arrow or Enter)">
            Next ➡️
          </button>
        </div>

        <!-- Direct Keyboard Hotkey Hint -->
        <div style="display: flex; align-items: center; gap: 6px; font-size: 0.76rem; color: #64748b; background: #ffffff; padding: 5px 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
          <i class="fa-solid fa-keyboard" style="color: #4f46e5; font-size: 0.85rem;"></i>
          <span>Keys: <strong>1–4</strong> / <strong>A–D</strong> select · <strong>Enter/➔</strong> next · <strong>⬅</strong> back · <strong>Esc</strong> exit</span>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 0.82rem; color: #64748b;">
            <strong>${answeredCount}</strong> of <strong>${totalQ}</strong>
          </span>

          <button onclick="window.submitDiagnosticBenchmark()" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 800; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35); transition: all 0.15s ease;" onmouseover="this.style.filter='brightness(1.1)';" onmouseout="this.style.filter='brightness(1)';">
            <i class="fa-solid fa-flag-checkered"></i>
            <span>Submit</span>
          </button>
        </div>
      </div>

    </div>
  `;
}

/**
 * Handles selecting an answer option.
 */
window.selectDiagnosticAnswer = function (encodedOpt) {
  if (!activeSession) return;
  const opt = decodeURIComponent(encodedOpt);
  activeSession.answers[activeSession.currentIndex] = opt;
  renderDiagnosticQuestion();
};

/**
 * Navigation handlers
 */
window.jumpToDiagnosticQuestion = function (idx) {
  if (!activeSession) return;
  activeSession.currentIndex = idx;
  renderDiagnosticQuestion();
};

window.prevDiagnosticQuestion = function () {
  if (!activeSession || activeSession.currentIndex <= 0) return;
  activeSession.currentIndex--;
  renderDiagnosticQuestion();
};

window.nextDiagnosticQuestion = function () {
  if (!activeSession || activeSession.currentIndex >= activeSession.questions.length - 1) return;
  activeSession.currentIndex++;
  renderDiagnosticQuestion();
};

function showInModalSubmitConfirm(unanswered) {
  let promptEl = document.getElementById('diag-confirm-prompt');
  if (!promptEl) {
    promptEl = document.createElement('div');
    promptEl.id = 'diag-confirm-prompt';
    promptEl.style.cssText = `
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      z-index: 100; padding: 20px; box-sizing: border-box;
    `;
    const cardModal = document.querySelector('#diagnostic-benchmark-modal > div');
    if (cardModal) {
      cardModal.style.position = 'relative';
      cardModal.appendChild(promptEl);
    }
  }

  promptEl.innerHTML = `
    <div style="background: white; border-radius: 14px; padding: 26px 30px; max-width: 440px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3);">
      <div style="font-size: 2.2rem; color: #f59e0b; margin-bottom: 8px;">⚠️</div>
      <h3 style="margin: 0 0 8px 0; color: #0f172a; font-family: 'Montserrat', sans-serif;">Submit Benchmark Early?</h3>
      <p style="margin: 0 0 20px 0; color: #64748b; font-size: 0.92rem; line-height: 1.45;">
        You have <strong>${unanswered}</strong> unanswered question(s). Unanswered questions will be scored as incorrect and prioritized in Leitner Box 1.
      </p>
      <div style="display: flex; gap: 12px; justify-content: center;">
        <button onclick="document.getElementById('diag-confirm-prompt')?.remove()" style="background: white; border: 1px solid #cbd5e1; color: #334155; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer;">
          Keep Answering
        </button>
        <button onclick="document.getElementById('diag-confirm-prompt')?.remove(); window.submitDiagnosticBenchmark(true);" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 800; font-size: 0.9rem; cursor: pointer;">
          Yes, Submit Now
        </button>
      </div>
    </div>
  `;
}

/**
 * Submits the diagnostic benchmark and renders the results & weakness hunting report.
 */
export function submitDiagnosticBenchmark(forceSubmit = false) {
  if (!activeSession) return;

  const unanswered = activeSession.questions.length - Object.keys(activeSession.answers).length;
  if (!forceSubmit && unanswered > 0 && activeSession.timeRemainingSeconds > 0) {
    // Show in-modal non-blocking confirmation dialog
    showInModalSubmitConfirm(unanswered);
    return;
  }

  if (activeSession.timerInterval) {
    clearInterval(activeSession.timerInterval);
    activeSession.timerInterval = null;
  }
  activeSession.isCompleted = true;

  // Detach keyboard listener once benchmark finishes
  window.removeEventListener('keydown', handleDiagnosticKeydown);

  // Evaluate answers
  let correctCount = 0;
  const eraStats = {}; // { [eraTitle]: { total: 0, correct: 0, workbookId: string, missed: [] } }
  const missedQuestions = [];

  activeSession.questions.forEach((q, idx) => {
    const studentChoice = activeSession.answers[idx];
    const isCorrect = studentChoice && studentChoice.trim() === q.answer.trim();

    if (!eraStats[q.eraTitle]) {
      eraStats[q.eraTitle] = {
        title: q.eraTitle,
        workbookId: q.workbookId,
        total: 0,
        correct: 0,
        missed: [],
      };
    }

    eraStats[q.eraTitle].total++;

    if (isCorrect) {
      correctCount++;
      eraStats[q.eraTitle].correct++;
    } else {
      const missedObj = {
        question: q,
        studentChoice: studentChoice || 'No answer submitted',
      };
      eraStats[q.eraTitle].missed.push(missedObj);
      missedQuestions.push(missedObj);
    }
  });

  // Identify Weakest Era
  let weakestEra = null;
  let lowestPct = 101;

  Object.values(eraStats).forEach((stat) => {
    const pct = Math.round((stat.correct / stat.total) * 100);
    stat.pct = pct;
    if (pct < lowestPct) {
      lowestPct = pct;
      weakestEra = stat;
    }
  });

  renderDiagnosticResultsReport({
    unitId: activeSession.unitId,
    unitTitle: activeSession.unitData.title || 'Curriculum Unit',
    totalQuestions: activeSession.questions.length,
    correctCount,
    eraStats: Object.values(eraStats),
    weakestEra,
    missedQuestions,
  });
}

window.submitDiagnosticBenchmark = submitDiagnosticBenchmark;

/**
 * Renders the diagnostic results and metacognition report.
 */
function renderDiagnosticResultsReport(report) {
  const modal = document.getElementById('diagnostic-benchmark-modal');
  if (!modal) return;

  const scorePct = Math.round((report.correctCount / report.totalQuestions) * 100);

  // Determine Readiness Band
  let readinessBadge = {
    title: 'Exam Ready — High Recall Mastery',
    color: '#10b981',
    bg: '#d1fae5',
    icon: 'fa-circle-check',
  };
  if (scorePct < 50) {
    readinessBadge = {
      title: 'Urgent Intervention Needed — Critical Knowledge Gaps',
      color: '#ef4444',
      bg: '#fee2e2',
      icon: 'fa-triangle-exclamation',
    };
  } else if (scorePct < 70) {
    readinessBadge = {
      title: 'Developing Foundation — Topic Gaps Detected',
      color: '#f59e0b',
      bg: '#fef3c7',
      icon: 'fa-circle-exclamation',
    };
  } else if (scorePct < 90) {
    readinessBadge = {
      title: 'Solid Foundation — Minor Revision Required',
      color: '#3b82f6',
      bg: '#dbeafe',
      icon: 'fa-award',
    };
  }

  modal.innerHTML = `
    <div style="background: #ffffff; width: 100%; max-width: 920px; max-height: 94vh; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4); display: flex; flex-direction: column; overflow: hidden; font-family: 'Inter', sans-serif;">
      
      <!-- Top Header -->
      <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: white; padding: 22px 28px; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <span style="background: rgba(245, 158, 11, 0.25); color: #fef08a; padding: 3px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;">
            Diagnostic Metacognition Report
          </span>
          <h2 style="margin: 6px 0 0 0; font-size: 1.5rem; font-family: 'Montserrat', sans-serif; font-weight: 800; color: #ffffff;">
            Readiness Benchmark Results
          </h2>
        </div>
        <button onclick="window.closeDiagnosticModal(true)" style="background: rgba(255,255,255,0.15); color: white; border: none; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center;" title="Close Report">
          ✕
        </button>
      </div>

      <!-- Report Body -->
      <div style="padding: 26px 30px; overflow-y: auto; flex: 1;">
        
        <!-- Score & Readiness Banner -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; margin-bottom: 24px;">
          <!-- Score Card -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 20px;">
            <div style="background: ${readinessBadge.bg}; color: ${readinessBadge.color}; width: 68px; height: 68px; border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-weight: 900; font-family: 'Montserrat', sans-serif;">
              <span style="font-size: 1.6rem; line-height: 1;">${report.correctCount}</span>
              <span style="font-size: 0.75rem; opacity: 0.8;">/${report.totalQuestions}</span>
            </div>
            <div>
              <div style="font-size: 1.4rem; font-weight: 800; color: #0f172a;">${scorePct}% Accuracy</div>
              <span style="background: ${readinessBadge.bg}; color: ${readinessBadge.color}; padding: 3px 8px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; margin-top: 4px;">
                <i class="fa-solid ${readinessBadge.icon}"></i>
                <span>${readinessBadge.title}</span>
              </span>
            </div>
          </div>

          <!-- Weakness Hunting Insight Box -->
          <div style="background: ${report.weakestEra && report.weakestEra.pct < 70 ? '#fffbeb' : '#f0fdf4'}; border: 1px solid ${report.weakestEra && report.weakestEra.pct < 70 ? '#fde68a' : '#bbf7d0'}; border-radius: 12px; padding: 20px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <i class="fa-solid ${report.weakestEra && report.weakestEra.pct < 70 ? 'fa-triangle-exclamation' : 'fa-circle-check'}" style="color: ${report.weakestEra && report.weakestEra.pct < 70 ? '#b45309' : '#15803d'}; font-size: 1.1rem;"></i>
              <strong style="color: ${report.weakestEra && report.weakestEra.pct < 70 ? '#92400e' : '#166534'}; font-size: 0.92rem;">
                ${report.weakestEra && report.weakestEra.pct < 70 ? 'Knowledge Blind Spot Identified' : 'Balanced Knowledge Profile'}
              </strong>
            </div>
            <p style="margin: 0; font-size: 0.85rem; color: #475569; line-height: 1.4;">
              ${
                report.weakestEra && report.weakestEra.pct < 70
                  ? `Your lowest score was in <strong>${report.weakestEra.title}</strong> (${report.weakestEra.correct}/${report.weakestEra.total} - ${report.weakestEra.pct}%). Target this topic first during retrieval practice to prevent exam-day drops.`
                  : `Well done! Your recall is evenly balanced across all historical periods. Continue regular Box 2 and Box 3 spaced reviews.`
              }
            </p>
          </div>
        </div>

        <!-- Historical Era Accuracy Bars -->
        <h3 style="font-size: 1.05rem; color: #0f172a; margin: 0 0 14px 0; font-family: 'Montserrat', sans-serif; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-chart-simple" style="color: #4f46e5;"></i>
          <span>Historical Era Breakdown</span>
        </h3>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px;">
          ${report.eraStats
            .map((stat) => {
              let barColor = '#10b981';
              if (stat.pct < 50) barColor = '#ef4444';
              else if (stat.pct < 70) barColor = '#f59e0b';
              else if (stat.pct < 85) barColor = '#3b82f6';

              const isLowest =
                report.weakestEra && report.weakestEra.title === stat.title && stat.pct < 70;

              return `
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="font-weight: 700; font-size: 0.9rem; color: #1e293b;">${stat.title}</span>
                      ${isLowest ? `<span style="background: #fee2e2; color: #b91c1c; font-size: 0.7rem; font-weight: 800; padding: 2px 6px; border-radius: 4px;">PRIORITY FOCUS</span>` : ''}
                    </div>
                    <span style="font-weight: 800; font-size: 0.9rem; color: ${barColor};">
                      ${stat.correct}/${stat.total} (${stat.pct}%)
                    </span>
                  </div>
                  <div style="background: #e2e8f0; border-radius: 999px; height: 10px; overflow: hidden;">
                    <div style="width: ${stat.pct}%; height: 100%; background: ${barColor}; border-radius: 999px; transition: width 0.5s ease-out;"></div>
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>

        <!-- Leitner Box 1 Injection Action Hero Banner -->
        ${
          report.missedQuestions.length > 0
            ? `
          <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px solid #fecaca; border-radius: 12px; padding: 20px 24px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; color: #b91c1c; margin-bottom: 4px;">
                <span style="font-size: 1.2rem;">🔴</span>
                <h4 style="margin: 0; font-size: 1.05rem; font-family: 'Montserrat', sans-serif;">
                  Automated Leitner Box 1 Targeted Drill
                </h4>
              </div>
              <p style="margin: 0; color: #7f1d1d; font-size: 0.88rem; max-width: 540px;">
                You missed <strong>${report.missedQuestions.length}</strong> questions. With 1 click, populate these exact questions into <strong>Box 1 (Daily Review)</strong> in your unit's Leitner flashcard deck.
              </p>
            </div>

            <button id="btn-sync-box1" onclick="window.injectMissedQuestionsToLeitner()" style="background: #dc2626; color: white; border: none; padding: 12px 20px; border-radius: 8px; font-weight: 800; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.35); transition: all 0.15s ease;" onmouseover="this.style.filter='brightness(1.1)';" onmouseout="this.style.filter='brightness(1)';">
              <i class="fa-solid fa-bolt-lightning"></i>
              <span>Load into Leitner Box 1 &amp; Drill</span>
            </button>
          </div>
        `
            : `
          <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 18px 22px; margin-bottom: 28px; display: flex; align-items: center; gap: 14px;">
            <div style="font-size: 2rem; color: #059669;">🏆</div>
            <div>
              <h4 style="margin: 0; font-size: 1.05rem; color: #065f46;">Flawless 100% Diagnostic Score!</h4>
              <p style="margin: 2px 0 0 0; font-size: 0.85rem; color: #047857;">You answered every question correctly across all eras. All questions remain promoted to Box 3 (Mastered).</p>
            </div>
          </div>
        `
        }

        <!-- Expandable Question-by-Question Review -->
        <h3 style="font-size: 1.05rem; color: #0f172a; margin: 0 0 14px 0; font-family: 'Montserrat', sans-serif; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-list-check" style="color: #4f46e5;"></i>
          <span>Detailed Diagnostic Review (${report.totalQuestions} Questions)</span>
        </h3>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${activeSession.questions
            .map((q, idx) => {
              const studentChoice = activeSession.answers[idx];
              const isCorrect = studentChoice && studentChoice.trim() === q.answer.trim();

              return `
                <div style="background: white; border: 1px solid ${isCorrect ? '#d1fae5' : '#fee2e2'}; border-left: 4px solid ${isCorrect ? '#10b981' : '#ef4444'}; border-radius: 8px; padding: 14px 18px;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                    <span style="font-size: 0.78rem; font-weight: 700; color: #64748b;">Q${idx + 1} • ${q.eraTitle}</span>
                    <span style="font-size: 0.8rem; font-weight: 800; color: ${isCorrect ? '#059669' : '#dc2626'};">
                      ${isCorrect ? '✅ Correct' : '❌ Incorrect'}
                    </span>
                  </div>

                  <h4 style="margin: 0 0 8px 0; font-size: 0.95rem; color: #1e293b;">${q.prompt}</h4>

                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px; font-size: 0.85rem; margin-top: 8px;">
                    <div style="background: ${isCorrect ? '#ecfdf5' : '#fef2f2'}; padding: 8px 12px; border-radius: 6px;">
                      <span style="color: #64748b;">Your Answer:</span>
                      <strong style="color: ${isCorrect ? '#065f46' : '#991b1b'}; display: block;">${studentChoice || 'Blank'}</strong>
                    </div>
                    ${
                      !isCorrect
                        ? `
                      <div style="background: #f0fdf4; padding: 8px 12px; border-radius: 6px;">
                        <span style="color: #64748b;">Correct Answer:</span>
                        <strong style="color: #166534; display: block;">${q.answer}</strong>
                      </div>
                    `
                        : ''
                    }
                  </div>

                  ${
                    q.explanation
                      ? `
                    <div style="margin-top: 8px; font-size: 0.8rem; color: #64748b; font-style: italic;">
                      💡 ${q.explanation}
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

      <!-- Results Footer -->
      <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px 28px; display: flex; align-items: center; justify-content: space-between;">
        <button onclick="window.startDiagnosticBenchmark('${report.unitId}')" style="background: white; border: 1px solid #cbd5e1; color: #334155; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 0.88rem; cursor: pointer;">
          🔄 Retake Benchmark (Fresh Set)
        </button>

        <button onclick="window.closeDiagnosticModal(true)" style="background: #1e293b; color: white; border: none; padding: 10px 22px; border-radius: 8px; font-weight: 700; font-size: 0.88rem; cursor: pointer;">
          Back to Recall Arena
        </button>
      </div>

    </div>
  `;
}

/**
 * Injects all missed questions into Leitner Box 1 in localStorage
 * and opens the flashcards deck pre-filtered to Box 1.
 */
window.injectMissedQuestionsToLeitner = function () {
  if (!activeSession) return;

  const unitId = activeSession.unitId;
  const missed = [];

  activeSession.questions.forEach((q, idx) => {
    const studentChoice = activeSession.answers[idx];
    const isCorrect = studentChoice && studentChoice.trim() === q.answer.trim();
    if (!isCorrect) {
      missed.push(q);
    }
  });

  if (missed.length === 0) {
    alert('No missed questions to inject! You scored 100%.');
    return;
  }

  // Determine target workbook for flashcards
  const targetWb = activeSession.questions[0].workbookId || 'full';
  const storageKey = `leitner_v1_${unitId}_${targetWb}`;

  let userBoxes = {};
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) userBoxes = JSON.parse(raw);
  } catch (e) {
    userBoxes = {};
  }

  // For each missed question, mark it as Box 1
  missed.forEach((q) => {
    userBoxes[q.diagnosticId] = 1;
  });

  try {
    localStorage.setItem(storageKey, JSON.stringify(userBoxes));
  } catch (e) {}

  const btn = document.getElementById('btn-sync-box1');
  if (btn) {
    btn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Loaded! Opening Flashcards...</span>`;
    btn.style.background = '#059669';
  }

  setTimeout(() => {
    closeDiagnosticModal(true);
    // Open the unit's mastery pack flashcards with Box 1 filter
    const flashcardUrl = `/units/${unitId}/mastery_pack_${targetWb}.html#practice-mode&box=1`;
    window.open(flashcardUrl, '_blank');
  }, 700);
};

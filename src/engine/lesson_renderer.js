import { cleanQuestionText } from '../data_parser.js';
import { generateKeyIndividualEmbedHTML } from '../key_individuals.js';
import { appStore } from './store.js';
import { getAssetUrl } from './assets.js';
import { getWorkbookPageAnchor } from './workbook_page_map.js';
import { renderAudioPlaybackBar } from './speech.js';

// Module-level fallback to ensure isGCSE never throws ReferenceError
var isGCSE = false;

window.formatBold = function (text) {
  if (!text) return '';
  if (typeof text !== 'string') {
    if (typeof text === 'object') {
      if (text.stem) {
        return (
          (text.tier ? '<strong>' + text.tier + ':</strong> ' : '') +
          window.formatBold(text.stem) +
          (text.pupil_focus
            ? ' <span style="display:block; font-size:0.85em; opacity:0.85; margin-top:2px;">(' +
              text.pupil_focus +
              ')</span>'
            : '')
        );
      }
      return '';
    }
    text = String(text);
  }
  let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Handle blockquotes
  parsed = parsed.replace(
    /(^|\n)> (.*?)(?=\n|$)/g,
    '$1<blockquote style="border-left: 4px solid #cbd5e1; padding-left: 15px; margin-left: 0; color: #475569; font-style: italic; background: rgba(248, 250, 252, 0.5); padding-top: 5px; padding-bottom: 5px; border-radius: 0 4px 4px 0;">$2</blockquote>',
  );
  // Handle headers
  parsed = parsed.replace(
    /(^|\n)### (.*?)(?=\n|$)/g,
    '$1<h4 style="color: #1e3a8a; margin-top: 15px; margin-bottom: 5px;">$2</h4>',
  );
  parsed = parsed.replace(
    /(^|\n)## (.*?)(?=\n|$)/g,
    '$1<h3 style="color: #1e3a8a; margin-top: 15px; margin-bottom: 5px;">$2</h3>',
  );

  parsed = parsed.replace(/\\n/g, '\n');

  // Handle lists
  if (parsed.match(/(^|\n)[\*\-]\s/)) {
    parsed = parsed.replace(/(^|\n)[\*\-]\s+(.*)/g, '$1<li>$2</li>');
    parsed = parsed.replace(
      /(<li>.*<\/li>(?:\n<li>.*<\/li>)*)/g,
      '<ul style="margin-top: 5px; margin-bottom: 5px; padding-left: 20px;">\n$1\n</ul>',
    );
  }

  // Handle italics (after lists so we don't conflict with bullet points)
  parsed = parsed.replace(/\*([^\*]+)\*/g, '<i>$1</i>');

  // Isolate table newline stripping to cme_new to prevent large whitespace before tables
  if (window.currentUnitId === 'cme_new') {
    parsed = parsed.replace(/<table[\s\S]*?<\/table>/gi, (tableHtml) =>
      tableHtml.replace(/\r?\n\s*/g, ' '),
    );
  }

  if (!parsed.trim().startsWith('<table') && !parsed.trim().startsWith('<div')) {
    parsed = parsed.replace(/\n/g, '<br>');
  }
  // Clean up <br> around elements
  if (window.currentUnitId === 'cme_new') {
    parsed = parsed
      .replace(/(?:<br\s*\/?>\s*)+(<table)/gi, '$1')
      .replace(/(<\/table>)(?:\s*<br\s*\/?>)+/gi, '$1');
  }
  parsed = parsed
    .replace(/<br><ul/g, '<ul')
    .replace(/<\/ul><br>/g, '</ul>')
    .replace(/<br><li>/g, '<li>')
    .replace(/<\/li><br>/g, '</li>');
  parsed = parsed
    .replace(/<br><blockquote/g, '<blockquote')
    .replace(/<\/blockquote><br>/g, '</blockquote>');
  parsed = parsed
    .replace(/<br><h/g, '<h')
    .replace(/<\/h4><br>/g, '</h4>')
    .replace(/<\/h3><br>/g, '</h3>');

  return parsed;
};

export function getGoldenSentenceExemplar(lesson, vocabTermsList = []) {
  if (lesson && lesson.vocab_golden_sentence) {
    return lesson.vocab_golden_sentence;
  }
  const terms =
    vocabTermsList && vocabTermsList.length > 0
      ? vocabTermsList
      : lesson && lesson.vocab
        ? lesson.vocab.map((v) => (v.term || '').trim()).filter(Boolean)
        : [];
  const t1 = terms[0] || 'the initial developments';
  const t2 = terms[1] || 'subsequent events';
  return `Although ${t1} significantly shaped the early trajectory of this era, ${t2} proved equally decisive because it fundamentally transformed the social and political balance of power.`;
}
window.getGoldenSentenceExemplar = getGoldenSentenceExemplar;

export function getOddOneOutExemplars(lesson, vocabTermsList = []) {
  if (
    lesson &&
    Array.isArray(lesson.vocab_odd_one_out_exemplars) &&
    lesson.vocab_odd_one_out_exemplars.length > 0
  ) {
    return lesson.vocab_odd_one_out_exemplars;
  }
  const terms =
    vocabTermsList && vocabTermsList.length > 0
      ? vocabTermsList
      : lesson && lesson.vocab
        ? lesson.vocab.map((v) => (v.term || '').trim()).filter(Boolean)
        : [];

  if (terms.length < 3) {
    return [
      {
        title: 'Categorical Distinction',
        trio: terms.slice(0, 3),
        odd: terms[0] || 'Term 1',
        reason:
          'Multiple valid historical criteria can distinguish these terms depending on whether you group by political authority, economic trade, or ideological perspective.',
      },
    ];
  }

  const t0 = terms[0];
  const t1 = terms[1];
  const t2 = terms[2];
  const t3 = terms[3] || terms[0];
  const last = terms[terms.length - 1];

  return [
    {
      title: 'Structural Entity vs Broader Concept / Event',
      trio: [t0, t1, last],
      odd: last,
      reason: `${t0} and ${t1} represent concrete institutions or organized polities of this era, whereas ${last} represents a broader concept, event, or overarching historical perspective.`,
    },
    {
      title: 'Regional / Operational Scope',
      trio: [t0, t1, t2],
      odd: t2,
      reason: `While ${t0} and ${t1} operated primarily within the central political power structures of this period, ${t2} played a distinct economic, religious, or external role.`,
    },
    {
      title: 'Cause vs Systemic Consequence',
      trio: [t1, t2, t3],
      odd: t1,
      reason: `${t1} acted as an initial catalyst, whereas ${t2} and ${t3} were sustained, institutional consequences that developed across multiple generations.`,
    },
  ];
}
window.getOddOneOutExemplars = getOddOneOutExemplars;

function getRetrievalStarterActions(lesson, currentUnitId) {
  if (currentUnitId === 'cme_new') {
    let kt = 'KT1';
    let pIdx = 0;
    const lTitle = lesson.title || '';
    const lId = lesson.id || '';
    if (
      lTitle.startsWith('KT1') ||
      ['lesson_1', 'lesson_2', 'lesson_3', 'lesson_4'].includes(lId)
    ) {
      kt = 'KT1';
      if (lTitle.includes('KT1.1') || lId === 'lesson_2') pIdx = 1;
      else if (lTitle.includes('KT1.2') || lId === 'lesson_3') pIdx = 2;
      else if (lTitle.includes('KT1.3') || lId === 'lesson_4') pIdx = 3;
      else pIdx = 0;
    } else if (lTitle.startsWith('KT2') || ['lesson_5', 'lesson_6', 'lesson_7'].includes(lId)) {
      kt = 'KT2';
      if (lTitle.includes('KT2.1') || lId === 'lesson_5') pIdx = 0;
      else if (lTitle.includes('KT2.2') || lId === 'lesson_6') pIdx = 1;
      else if (lTitle.includes('KT2.3') || lId === 'lesson_7') pIdx = 2;
    } else if (lTitle.startsWith('KT3') || ['lesson_8', 'lesson_9', 'lesson_10'].includes(lId)) {
      kt = 'KT3';
      if (lTitle.includes('KT3.1') || lId === 'lesson_8') pIdx = 0;
      else if (lTitle.includes('KT3.2') || lId === 'lesson_9') pIdx = 1;
      else if (lTitle.includes('KT3.3') || lId === 'lesson_10') pIdx = 2;
    }

    const shortCode = lTitle.split(':')[0].trim();
    return `
      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <a href="/units/cme_new/mastery_pack_${kt}.html#practice-mode&part=${pIdx}" target="_blank" style="display: inline-flex; align-items: center; gap: 7px; font-size: 0.86rem; padding: 7px 14px; background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%); color: #ffffff; text-decoration: none; font-weight: 700; border-radius: 6px; box-shadow: 0 2px 6px rgba(79,70,229,0.3); transition: all 0.15s ease;" onmouseover="this.style.filter='brightness(1.1)';" onmouseout="this.style.filter='brightness(1)';">
          <i class="fa-solid fa-bolt" style="color: #fde047;"></i>
          Launch ${shortCode} Leitner Drill (20 Cards)
        </a>
        <a href="/units/cme_new/mastery_pack_${kt}.html#practice-mode&part=${pIdx}&teacher=true" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.86rem; padding: 7px 12px; background: #ffffff; color: #4338ca; border: 1.5px solid #c7d2fe; text-decoration: none; font-weight: 600; border-radius: 6px; transition: all 0.15s ease;" title="Launch classroom whiteboard presentation with 15s timer" onmouseover="this.style.background='#eef2ff';" onmouseout="this.style.background='#ffffff';">
          <i class="fa-solid fa-chalkboard-user"></i>
          Whiteboard
        </a>
        <button class="btn btn-secondary" data-action="switch-view" data-view="interactive" data-unit="cme_new" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.84rem; padding: 6px 12px; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; font-weight: 600; border-radius: 6px; cursor: pointer;">
          <i class="fa-solid fa-circle-question"></i>
          All Decks
        </button>
      </div>
    `;
  }

  return `
    <button class="btn btn-primary" data-action="switch-view" data-view="interactive" data-unit="${currentUnitId || ''}" style="display: inline-flex; align-items: center; gap: 8px; font-size: 0.88rem; padding: 8px 16px; background: #2563eb; color: #ffffff; border: none; font-weight: 600; border-radius: 6px; cursor: pointer; box-shadow: 0 2px 5px rgba(37,99,235,0.25); transition: all 0.2s ease;">
      <i class="fa-solid fa-circle-question" style="color: #fde047;"></i>
      Jump to Unit Quizzing
    </button>
  `;
}

function renderDoNowTimerBarHTML(timerId = 'donow-timer') {
  return `
    <div class="donow-timer-bar" id="${timerId}-bar" style="grid-column: 1 / -1; width: 100%; display: flex; flex-direction: column; gap: 8px; background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid #0284c7; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.03); box-sizing: border-box;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <!-- Left: Stopwatch icon + display + mode -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 34px; height: 34px; border-radius: 6px; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
            <i class="fa-solid fa-stopwatch"></i>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">Retrieval Timer</span>
              <span id="${timerId}-mode-pill" style="font-size: 0.7rem; font-weight: 700; color: #0369a1; background: #f0f9ff; padding: 1px 6px; border-radius: 10px; border: 1px solid #bae6fd;">5 Mins</span>
            </div>
            <div style="font-size: 1.35rem; font-weight: 800; font-family: 'Courier New', monospace; color: #0f172a; line-height: 1.1;" id="${timerId}-display">05:00</div>
          </div>
        </div>

        <!-- Center: Quick Preset Pills (Flexi Timer for Teachers) -->
        <div class="timer-preset-pills" id="${timerId}-presets" style="display: flex; align-items: center; gap: 5px; flex-wrap: wrap;">
          <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; margin-right: 2px;">Presets:</span>
          <button type="button" class="btn-timer-pill" data-sec="120" onclick="event.stopPropagation(); window.setDoNowTimerPreset('${timerId}', 120);" style="padding: 3px 8px; font-size: 0.75rem; font-weight: 700; border-radius: 4px; border: 1px solid #cbd5e1; background: #f8fafc; color: #334155; cursor: pointer;">2m</button>
          <button type="button" class="btn-timer-pill" data-sec="180" onclick="event.stopPropagation(); window.setDoNowTimerPreset('${timerId}', 180);" style="padding: 3px 8px; font-size: 0.75rem; font-weight: 700; border-radius: 4px; border: 1px solid #cbd5e1; background: #f8fafc; color: #334155; cursor: pointer;">3m</button>
          <button type="button" class="btn-timer-pill active-preset" data-sec="300" onclick="event.stopPropagation(); window.setDoNowTimerPreset('${timerId}', 300);" style="padding: 3px 8px; font-size: 0.75rem; font-weight: 700; border-radius: 4px; border: 1.5px solid #0284c7; background: #e0f2fe; color: #0369a1; cursor: pointer;">5m</button>
          <button type="button" class="btn-timer-pill" data-sec="480" onclick="event.stopPropagation(); window.setDoNowTimerPreset('${timerId}', 480);" style="padding: 3px 8px; font-size: 0.75rem; font-weight: 700; border-radius: 4px; border: 1px solid #cbd5e1; background: #f8fafc; color: #334155; cursor: pointer;">8m</button>
          <button type="button" class="btn-timer-pill" data-sec="600" onclick="event.stopPropagation(); window.setDoNowTimerPreset('${timerId}', 600);" style="padding: 3px 8px; font-size: 0.75rem; font-weight: 700; border-radius: 4px; border: 1px solid #cbd5e1; background: #f8fafc; color: #334155; cursor: pointer;">10m</button>
        </div>

        <!-- Right: Controls (Start / Pause / Reset / +/- 1m / Mute) -->
        <div style="display: flex; align-items: center; gap: 5px; flex-wrap: wrap;">
          <button type="button" class="btn btn-primary btn-sm" id="${timerId}-start-btn" onclick="event.stopPropagation(); window.toggleDoNowTimer('${timerId}', 'start');" style="padding: 5px 12px; font-weight: 700; font-size: 0.82rem; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; background: #0284c7; color: #fff; border: none;">
            <i class="fa-solid fa-play"></i> Start
          </button>
          <button type="button" class="btn btn-secondary btn-sm" id="${timerId}-pause-btn" onclick="event.stopPropagation(); window.toggleDoNowTimer('${timerId}', 'pause');" style="padding: 5px 12px; font-size: 0.82rem; font-weight: 600; border-radius: 6px; cursor: pointer; display: none; align-items: center; gap: 5px;">
            <i class="fa-solid fa-pause"></i> Pause
          </button>
          <button type="button" class="btn btn-secondary btn-sm" id="${timerId}-sub1-btn" onclick="event.stopPropagation(); window.toggleDoNowTimer('${timerId}', 'sub1');" style="padding: 5px 8px; font-size: 0.8rem; font-weight: 700; border-radius: 6px; cursor: pointer;" title="Subtract 1 minute">-1m</button>
          <button type="button" class="btn btn-secondary btn-sm" id="${timerId}-add1-btn" onclick="event.stopPropagation(); window.toggleDoNowTimer('${timerId}', 'add1');" style="padding: 5px 8px; font-size: 0.8rem; font-weight: 700; border-radius: 6px; cursor: pointer;" title="Add 1 minute">+1m</button>
          <button type="button" class="btn btn-secondary btn-sm" id="${timerId}-reset-btn" onclick="event.stopPropagation(); window.toggleDoNowTimer('${timerId}', 'reset');" style="padding: 5px 10px; font-size: 0.82rem; font-weight: 600; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;" title="Reset timer to start of chosen duration">
            <i class="fa-solid fa-rotate-right"></i> Reset
          </button>
          <button type="button" class="btn btn-secondary btn-sm" id="${timerId}-sound-btn" onclick="event.stopPropagation(); window.toggleDoNowTimerSound('${timerId}');" style="padding: 5px 8px; font-size: 0.8rem; font-weight: 600; border-radius: 6px; cursor: pointer;" title="Toggle audio chime on/off">
            <i class="fa-solid fa-bell-slash" id="${timerId}-sound-icon" style="color: #64748b;"></i>
          </button>
        </div>
      </div>

      <!-- Slim Visual Progress Bar -->
      <div style="width: 100%; height: 4px; background: #e2e8f0; border-radius: 2px; overflow: hidden;">
        <div id="${timerId}-progress" style="width: 100%; height: 100%; background: #0284c7; transition: width 0.5s linear, background 0.3s ease;"></div>
      </div>
    </div>
  `;
}

window.doNowTimers = window.doNowTimers || {};

window.setDoNowTimerPreset = function (timerId, seconds) {
  let timer = window.doNowTimers[timerId];
  if (!timer) {
    timer = {
      totalSeconds: seconds,
      initialSeconds: seconds,
      interval: null,
      isRunning: false,
      isSilent: true,
    };
    window.doNowTimers[timerId] = timer;
  } else {
    if (timer.interval) clearInterval(timer.interval);
    timer.interval = null;
    timer.isRunning = false;
    timer.totalSeconds = seconds;
    timer.initialSeconds = seconds;
  }

  // Update pills UI
  const presetsContainer = document.getElementById(`${timerId}-presets`);
  if (presetsContainer) {
    presetsContainer.querySelectorAll('.btn-timer-pill').forEach((pill) => {
      const sec = parseInt(pill.getAttribute('data-sec'), 10);
      if (sec === seconds) {
        pill.classList.add('active-preset');
        pill.style.border = '1.5px solid #0284c7';
        pill.style.background = '#e0f2fe';
        pill.style.color = '#0369a1';
      } else {
        pill.classList.remove('active-preset');
        pill.style.border = '1px solid #cbd5e1';
        pill.style.background = '#f8fafc';
        pill.style.color = '#334155';
      }
    });
  }

  // Update mode pill
  const modePill = document.getElementById(`${timerId}-mode-pill`);
  if (modePill) {
    const mins = Math.round(seconds / 60);
    modePill.textContent = `${mins} Mins`;
  }

  // Reset button state
  const startBtn = document.getElementById(`${timerId}-start-btn`);
  const pauseBtn = document.getElementById(`${timerId}-pause-btn`);
  if (startBtn) {
    startBtn.style.display = 'inline-flex';
    startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
  }
  if (pauseBtn) pauseBtn.style.display = 'none';

  // Update display
  const display = document.getElementById(`${timerId}-display`);
  const summaryBadge = document.getElementById(`${timerId}-summary-badge`);
  const progressBar = document.getElementById(`${timerId}-progress`);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  if (display) {
    display.textContent = formatted;
    display.style.color = '#0f172a';
  }
  if (summaryBadge) {
    summaryBadge.textContent = formatted;
    summaryBadge.style.color = '#0369a1';
  }
  if (progressBar) {
    progressBar.style.width = '100%';
    progressBar.style.background = '#0284c7';
  }
};

window.toggleDoNowTimerSound = function (timerId) {
  let timer = window.doNowTimers[timerId];
  if (!timer) {
    timer = {
      totalSeconds: 300,
      initialSeconds: 300,
      interval: null,
      isRunning: false,
      isSilent: true,
    };
    window.doNowTimers[timerId] = timer;
  }
  timer.isSilent = !timer.isSilent;
  const icon = document.getElementById(`${timerId}-sound-icon`);
  const btn = document.getElementById(`${timerId}-sound-btn`);
  if (icon && btn) {
    if (timer.isSilent) {
      icon.className = 'fa-solid fa-bell-slash';
      icon.style.color = '#64748b';
      btn.title = 'Silent Mode Active (Click to unmute chime)';
    } else {
      icon.className = 'fa-solid fa-bell';
      icon.style.color = '#0284c7';
      btn.title = 'Audio Chime Active (Click to mute)';
    }
  }
};

window.toggleDoNowTimer = function (timerId, action) {
  let timer = window.doNowTimers[timerId];
  if (!timer) {
    timer = {
      totalSeconds: 300,
      initialSeconds: 300,
      interval: null,
      isRunning: false,
      isSilent: true,
    };
    window.doNowTimers[timerId] = timer;
  }

  const display = document.getElementById(`${timerId}-display`);
  const summaryBadge = document.getElementById(`${timerId}-summary-badge`);
  const startBtn = document.getElementById(`${timerId}-start-btn`);
  const pauseBtn = document.getElementById(`${timerId}-pause-btn`);
  const progressBar = document.getElementById(`${timerId}-progress`);

  const updateDisplay = () => {
    const mins = Math.floor(timer.totalSeconds / 60);
    const secs = timer.totalSeconds % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (display) {
      display.textContent = formatted;
      if (timer.totalSeconds === 0) {
        display.style.color = '#ef4444';
        display.textContent = "00:00 (Time's Up!)";
      } else if (timer.totalSeconds <= 30) {
        display.style.color = '#ef4444';
      } else {
        display.style.color = '#0f172a';
      }
    }
    if (summaryBadge) {
      summaryBadge.textContent = formatted;
      summaryBadge.style.color = timer.totalSeconds <= 30 ? '#ef4444' : '#0369a1';
    }
    if (progressBar) {
      const pct = Math.max(0, (timer.totalSeconds / (timer.initialSeconds || 300)) * 100);
      progressBar.style.width = pct + '%';
      if (timer.totalSeconds === 0) {
        progressBar.style.background = '#ef4444';
      } else if (timer.totalSeconds <= 30 || pct <= 20) {
        progressBar.style.background = '#f59e0b';
      } else {
        progressBar.style.background = '#0284c7';
      }
    }
  };

  const playChime = () => {
    if (timer.isSilent) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {}
  };

  if (action === 'start') {
    if (timer.isRunning) return;
    if (timer.totalSeconds === 0) timer.totalSeconds = timer.initialSeconds || 300;
    timer.isRunning = true;
    if (startBtn) startBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'inline-flex';

    if (timer.interval) clearInterval(timer.interval);
    timer.interval = setInterval(() => {
      if (timer.totalSeconds > 0) {
        timer.totalSeconds--;
        updateDisplay();
        if (timer.totalSeconds === 0) {
          clearInterval(timer.interval);
          timer.interval = null;
          timer.isRunning = false;
          if (startBtn) {
            startBtn.style.display = 'inline-flex';
            startBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Restart';
          }
          if (pauseBtn) pauseBtn.style.display = 'none';
          playChime();
        }
      }
    }, 1000);
  } else if (action === 'pause') {
    if (!timer.isRunning) return;
    clearInterval(timer.interval);
    timer.interval = null;
    timer.isRunning = false;
    if (startBtn) {
      startBtn.style.display = 'inline-flex';
      startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
    }
    if (pauseBtn) pauseBtn.style.display = 'none';
  } else if (action === 'reset') {
    if (timer.interval) clearInterval(timer.interval);
    timer.interval = null;
    timer.isRunning = false;
    timer.totalSeconds = timer.initialSeconds || 300;
    updateDisplay();
    if (startBtn) {
      startBtn.style.display = 'inline-flex';
      startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
    }
    if (pauseBtn) pauseBtn.style.display = 'none';
  } else if (action === 'add1') {
    timer.totalSeconds += 60;
    if (timer.totalSeconds > timer.initialSeconds) timer.initialSeconds = timer.totalSeconds;
    updateDisplay();
  } else if (action === 'sub1') {
    if (timer.totalSeconds > 60) {
      timer.totalSeconds -= 60;
      updateDisplay();
    }
  } else if (action === 'add5') {
    timer.totalSeconds += 300;
    if (timer.totalSeconds > timer.initialSeconds) timer.initialSeconds = timer.totalSeconds;
    updateDisplay();
  }
};

window.toggleWhiteboardMode = function (forceState) {
  // If in chess view, delegate to chess projector/whiteboard mode
  if (
    document.getElementById('chess-hub-root') ||
    (window.state && window.state.currentView === 'chess') ||
    (typeof window.location !== 'undefined' && window.location.search.includes('view=chess'))
  ) {
    if (typeof window.toggleChessWhiteboardMode === 'function') {
      return window.toggleChessWhiteboardMode(forceState);
    }
  }

  const isCurrentlyActive = document.body.classList.contains('whiteboard-mode-active');
  const nextState = typeof forceState === 'boolean' ? forceState : !isCurrentlyActive;
  if (nextState) {
    document.body.classList.add('whiteboard-mode-active');
  } else {
    document.body.classList.remove('whiteboard-mode-active');
  }
  try {
    localStorage.setItem('whiteboardMode', nextState ? 'true' : 'false');
  } catch (e) {}
  window.syncWhiteboardButtons(nextState);
};

window.syncWhiteboardButtons = function (isActive) {
  const btns = document.querySelectorAll('.btn-whiteboard-toggle');
  btns.forEach((btn) => {
    if (isActive) {
      btn.classList.add('active');
      btn.innerHTML =
        '<i class="fa-solid fa-compress"></i> <span class="wb-btn-label">Standard View</span>';
      btn.title = 'Exit Whiteboard Presentation Mode (restore hero banner)';
    } else {
      btn.classList.remove('active');
      btn.innerHTML =
        '<i class="fa-solid fa-chalkboard"></i> <span class="wb-btn-label">Whiteboard View</span>';
      btn.title =
        'Toggle Whiteboard Presentation Mode (collapses hero banner for classroom projectors)';
    }
  });
};

window.toggleTeacherMode = function (forceState) {
  const isCurrentlyActive = document.body.classList.contains('teacher-mode-active');
  const nextState = typeof forceState === 'boolean' ? forceState : !isCurrentlyActive;
  if (nextState) {
    document.body.classList.add('teacher-mode-active');
  } else {
    document.body.classList.remove('teacher-mode-active');
  }
  try {
    localStorage.setItem('teacherMode', nextState ? 'true' : 'false');
  } catch (e) {}
  window.syncTeacherButtons(nextState);
};

window.syncTeacherButtons = function (isActive) {
  const btns = document.querySelectorAll('.btn-teacher-mode-toggle');
  btns.forEach((btn) => {
    if (isActive) {
      btn.classList.add('active');
      btn.innerHTML =
        '<i class="fa-solid fa-user-tie"></i> <span class="teacher-btn-label">Teacher Mode: ON</span>';
      btn.title = 'Teacher Mode is ON (Click to hide teacher guidance)';
    } else {
      btn.classList.remove('active');
      btn.innerHTML =
        '<i class="fa-solid fa-user-tie"></i> <span class="teacher-btn-label">Teacher Mode</span>';
      btn.title = 'Click to show Teacher Guidance & Delivery Roadmap';
    }
  });
};

if (typeof localStorage !== 'undefined' && localStorage.getItem('teacherMode') === 'true') {
  if (typeof document !== 'undefined' && document.body) {
    document.body.classList.add('teacher-mode-active');
  }
}

window.renderLessonByIndex = function (index, skipHistory = false) {
  if (typeof window !== 'undefined' && typeof window.cancelSpeech === 'function') {
    window.cancelSpeech();
  }

  if (
    appStore.state.activeUnitData &&
    appStore.state.activeUnitData.lessons &&
    appStore.state.activeUnitData.lessons[index]
  ) {
    const unitId = appStore.state.selectedUnitId || window.currentUnitId;
    const lesson = appStore.state.activeUnitData.lessons[index];

    if (!skipHistory && typeof window !== 'undefined' && window.history) {
      try {
        const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
        const currentState = window.history.state || {};
        window.history.replaceState(
          {
            ...currentState,
            scrollY: currentScroll,
          },
          '',
          window.location.href,
        );

        const url = new URL(window.location);
        url.searchParams.set('view', 'lessons');
        url.searchParams.set('lesson', index);
        if (unitId) url.searchParams.set('unit', unitId);
        window.history.pushState(
          {
            view: 'lessons',
            unit: unitId,
            lessonIndex: index,
            scrollY: 0,
          },
          '',
          url,
        );
      } catch (e) {
        console.warn('History routing disabled (e.g. file:// protocol):', e);
      }
    }

    if (typeof window.updateBreadcrumbs === 'function') {
      const lessonTitle = lesson.title || `Lesson ${index + 1}`;
      const unitTitle = appStore.state.activeUnitData.title
        ? appStore.state.activeUnitData.title.split(':')[0].trim()
        : 'Unit';
      window.updateBreadcrumbs([
        { label: 'Dashboard', view: 'dashboard' },
        { label: unitTitle, view: 'lessons', unit: unitId },
        { label: lessonTitle },
      ]);
    }

    document.querySelectorAll('.lesson-link').forEach((l) => l.classList.remove('active'));
    // Try to activate the corresponding sidebar link
    const matchLink = document.querySelector(`.lesson-link[data-index="${index}"]`);
    if (matchLink) {
      matchLink.classList.add('active');
    } else {
      const links = document.querySelectorAll('.lesson-link');
      const isKS3 =
        appStore.state.activeUnitData.title && appStore.state.activeUnitData.title.includes('KS3');
      if (!isKS3 && links.length > index + 1) {
        // +1 because the first link is Unit Homepage
        links[index + 1].classList.add('active');
      }
    }

    renderLesson(lesson);

    // Auto-save student draft inputs for this lesson
    if (typeof window.initDraftPreservation === 'function') {
      window.initDraftPreservation(
        document.getElementById('content-area') || document,
        `${unitId}_${lesson.id || index}`,
      );
    }

    if (window.scrollToTop) window.scrollToTop(true);
    else
      (document.getElementById('content-area') || window).scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Register global switchVideoTab handler if in browser
if (typeof window !== 'undefined' && !window.switchVideoTab) {
  window.switchVideoTab = function (btn, sectionId, targetCardId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    // Hide all video cards in this section
    section.querySelectorAll('.archival-video-entry').forEach(function (card) {
      card.style.display = 'none';
    });
    // Show target card
    const targetCard = document.getElementById(targetCardId);
    if (targetCard) {
      targetCard.style.display = 'flex';
    }
    // Update button states
    const tabBtns = section.querySelectorAll('.video-pathway-tab-btn');
    tabBtns.forEach(function (b) {
      b.classList.remove('is-active');
      b.style.background = '#ffffff';
      b.style.color = '#475569';
      b.style.borderColor = '#cbd5e1';
      b.style.fontWeight = '600';
      b.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
      const icon = b.querySelector('i');
      if (icon) icon.style.color = '#2563eb';
    });
    btn.classList.add('is-active');
    btn.style.background = '#1e40af';
    btn.style.color = '#ffffff';
    btn.style.borderColor = '#1e40af';
    btn.style.fontWeight = '700';
    btn.style.boxShadow = '0 2px 5px rgba(30,64,175,0.25)';
    const activeIcon = btn.querySelector('i');
    if (activeIcon) activeIcon.style.color = '#93c5fd';
  };
}

function parseDurationMinutes(durationStr) {
  if (!durationStr || typeof durationStr !== 'string') return 0;
  const colonMatch = durationStr.match(/(?:(\d+):)?(\d+):(\d+)/);
  if (colonMatch) {
    const hours = colonMatch[1] ? parseInt(colonMatch[1], 10) : 0;
    const minutes = parseInt(colonMatch[2], 10);
    return hours * 60 + minutes;
  }
  let mins = 0;
  const hrMatch = durationStr.match(/(\d+)\s*(?:h|hr|hour)/i);
  if (hrMatch) mins += parseInt(hrMatch[1], 10) * 60;
  const minMatch = durationStr.match(/(\d+)\s*(?:m|min|minute)/i);
  if (minMatch) mins += parseInt(minMatch[1], 10);
  return mins;
}

function resolveVideoPathway(vid) {
  const mins = parseDurationMinutes(vid.duration);
  let pathway = vid.pathway;
  let guidance = vid.teacher_guidance;
  let icon = 'fa-solid fa-route';

  if (!pathway) {
    if (mins > 0 && mins < 5) {
      pathway = 'Quick Summary';
    } else if (mins >= 15) {
      pathway = 'In-Depth Analysis';
    } else {
      pathway = 'Core Overview';
    }
  }

  const pLower = pathway.toLowerCase();
  if (
    pLower.includes('quick') ||
    pLower.includes('starter') ||
    pLower.includes('summary') ||
    pLower.includes('recap')
  ) {
    icon = 'fa-solid fa-bolt';
  } else if (
    pLower.includes('deep') ||
    pLower.includes('documentary') ||
    pLower.includes('in-depth') ||
    pLower.includes('tactics') ||
    pLower.includes('mechanics') ||
    pLower.includes('masterclass')
  ) {
    icon = 'fa-solid fa-magnifying-glass-chart';
  } else if (
    pLower.includes('context') ||
    pLower.includes('causes') ||
    pLower.includes('strategic')
  ) {
    icon = 'fa-solid fa-globe';
  } else if (pLower.includes('alliance') || pLower.includes('camp')) {
    icon = 'fa-solid fa-handshake';
  } else if (
    pLower.includes('balkan') ||
    pLower.includes('flashpoint') ||
    pLower.includes('narrative')
  ) {
    icon = 'fa-solid fa-fire';
  }

  if (!guidance) {
    if (mins > 0 && mins < 5) {
      guidance = 'Ideal for starter recaps, rapid retrieval hooks, or SEN visual scaffolding.';
    } else if (mins >= 15) {
      guidance = 'Recommended for flipped homework, independent research, or high-attainer depth.';
    } else {
      guidance = 'Recommended for direct whole-class instruction or guided dual-coding notes.';
    }
  }

  return { pathway, guidance, icon };
}

function renderLessonVideos(videos, lesson, unitId) {
  if (!videos || videos.length === 0) return '';
  const formatBold = window.formatBold || ((s) => s);

  const safeLessonId = (
    lesson && (lesson.id || lesson.title) ? String(lesson.id || lesson.title) : 'lesson'
  ).replace(/[^a-zA-Z0-9_-]/g, '_');
  const videoSectionId = 'video-section-' + safeLessonId;

  let videoCardsHtml = '';

  videos.forEach((vid, idx) => {
    const isYt =
      vid.type === 'youtube' ||
      (vid.url && (vid.url.includes('youtube.com') || vid.url.includes('youtu.be')));
    const isEra = vid.type === 'era' || (vid.url && vid.url.includes('era.org.uk'));

    let ytId = null;
    if (isYt && vid.url) {
      const match = vid.url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i,
      );
      ytId = match ? match[1] : null;
    }

    const providerName = isEra
      ? 'BBC / ERA Educational'
      : isYt
        ? 'YouTube Archival'
        : 'Educational Video';
    const providerBadgeColor = isEra ? '#1e40af' : '#dc2626';
    const providerBadgeBg = isEra ? '#eff6ff' : '#fef2f2';
    const providerBadgeBorder = isEra ? '#bfdbfe' : '#fecaca';
    const providerIcon = isEra ? 'fa-solid fa-graduation-cap' : 'fa-brands fa-youtube';

    const pathwayInfo = resolveVideoPathway(vid);

    let actionButtonHtml = '';
    if (ytId) {
      actionButtonHtml = `
        <button type="button" class="btn btn-primary no-print" data-action="open-video-modal" data-youtube="${ytId}" style="display: inline-flex; align-items: center; gap: 6px; background: #dc2626; color: #ffffff; border: none; padding: 7px 14px; border-radius: 6px; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 5px rgba(220, 38, 38, 0.25);">
          <i class="fa-solid fa-play" style="font-size: 0.78rem;"></i> Watch in App
        </button>
        <a href="${vid.url}" target="_blank" rel="noopener noreferrer" class="no-print" style="color: #64748b; font-size: 0.8rem; text-decoration: underline; display: inline-flex; align-items: center; gap: 3px;">
          Link <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i>
        </a>
      `;
    } else if (isEra) {
      actionButtonHtml = `
        <a href="${vid.url}" target="_blank" rel="noopener noreferrer" class="no-print" style="display: inline-flex; align-items: center; gap: 6px; background: #1e40af; color: #ffffff; border: none; padding: 7px 14px; border-radius: 6px; font-weight: 700; font-size: 0.85rem; text-decoration: none; transition: all 0.2s; box-shadow: 0 2px 5px rgba(30, 64, 175, 0.25);">
          <i class="fa-solid fa-lock" style="font-size: 0.75rem;"></i> Stream on ERA <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem; margin-left: 2px;"></i>
        </a>
        <span class="no-print" style="color: #64748b; font-size: 0.78rem; font-style: italic;">School SSO</span>
      `;
    } else {
      actionButtonHtml = `
        <a href="${vid.url}" target="_blank" rel="noopener noreferrer" class="no-print" style="display: inline-flex; align-items: center; gap: 6px; background: #0f172a; color: #ffffff; border: none; padding: 7px 14px; border-radius: 6px; font-weight: 700; font-size: 0.85rem; text-decoration: none;">
          <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.75rem;"></i> Open
        </a>
      `;
    }

    videoCardsHtml += `
      <div id="${videoSectionId}-card-${idx}" class="archival-video-entry" style="display: ${idx === 0 ? 'flex' : 'none'}; flex-direction: column; gap: 10px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
        <!-- Top row: Provider + Duration + Pathway Badge + Title + Action -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 240px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; flex-wrap: wrap;">
              <span class="archival-meta-tag" style="background: ${providerBadgeBg}; color: ${providerBadgeColor}; border: 1px solid ${providerBadgeBorder}; font-size: 0.70rem; padding: 2px 7px; border-radius: 4px; font-weight: 700; letter-spacing: 0.04em; display: inline-flex; align-items: center; gap: 4px;">
                <i class="${providerIcon}"></i> ${providerName}
              </span>
              ${vid.duration ? `<span style="background: #f1f5f9; color: #475569; font-size: 0.74rem; font-weight: 600; padding: 2px 7px; border-radius: 4px; border: 1px solid #e2e8f0; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-regular fa-clock"></i> ${vid.duration}</span>` : ''}
              <span class="archival-meta-tag" style="background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; font-size: 0.72rem; padding: 2px 8px; border-radius: 4px; font-weight: 700; letter-spacing: 0.04em; display: inline-flex; align-items: center; gap: 4px;">
                <i class="${pathwayInfo.icon}" style="color: #2563eb;"></i> ${pathwayInfo.pathway}
              </span>
            </div>
            <h4 style="margin: 0; font-size: 1.05rem; color: #0f172a; font-family: 'Playfair Display', serif; line-height: 1.35;">
              ${vid.title || 'Historical Documentary Resource'}
            </h4>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            ${actionButtonHtml}
          </div>
        </div>

        <!-- Side-by-side Teacher Guidance + Active Viewing Task Grid (Option 4) -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 10px; margin-top: 2px;">
          ${
            pathwayInfo.guidance
              ? `
            <div class="video-teacher-guidance-box" style="background: #f8fafc; border-left: 3px solid #6366f1; padding: 8px 12px; border-radius: 0 5px 5px 0; display: flex; align-items: flex-start; gap: 8px;">
              <div style="color: #4f46e5; font-size: 0.88rem; margin-top: 2px; flex-shrink: 0;">
                <i class="fa-solid fa-chalkboard-user"></i>
              </div>
              <div>
                <div style="font-size: 0.70rem; font-weight: 800; color: #4338ca; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">
                  Teacher Video Pathway Guidance:
                </div>
                <div style="font-size: 0.84rem; color: #334155; line-height: 1.45;">
                  ${formatBold(pathwayInfo.guidance)}
                </div>
              </div>
            </div>
          `
              : ''
          }

          ${
            vid.viewing_task
              ? `
            <div class="video-viewing-task-box" style="background: #fffbeb; border-left: 3px solid #f59e0b; padding: 8px 12px; border-radius: 0 5px 5px 0; display: flex; align-items: flex-start; gap: 8px;">
              <div style="color: #d97706; font-size: 0.88rem; margin-top: 2px; flex-shrink: 0;">
                <i class="fa-solid fa-crosshairs"></i>
              </div>
              <div>
                <div style="font-size: 0.70rem; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">
                  Active Viewing Task:
                </div>
                <div style="font-size: 0.85rem; color: #92400e; line-height: 1.45;">
                  ${formatBold(vid.viewing_task)}
                </div>
              </div>
            </div>
          `
              : ''
          }
        </div>

        <!-- Revealable Model Answer -->
        ${
          vid.model_answer
            ? `
          <details class="video-model-details" style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; overflow: hidden; margin-top: 2px;">
            <summary style="cursor: pointer; padding: 7px 12px; font-size: 0.82rem; color: #166534; font-weight: 700; user-select: none; display: flex; align-items: center; gap: 6px; background: #f0fdf4;">
              <i class="fa-solid fa-key" style="color: #16a34a;"></i> Reveal Viewing Task Model Notes
            </summary>
            <div style="padding: 10px 14px; font-size: 0.88rem; color: #14532d; line-height: 1.55; border-top: 1px solid #bbf7d0; background: #ffffff;">
              ${formatBold(vid.model_answer)}
            </div>
          </details>
        `
            : ''
        }
      </div>
    `;
  });

  // Segmented Pathway Tabs Bar if multiple videos
  let tabBarHtml = '';
  if (videos.length > 1) {
    const tabButtons = videos
      .map((v, i) => {
        const info = resolveVideoPathway(v);
        const isActive = i === 0;
        let shortDur = '';
        if (v.duration) {
          shortDur = v.duration
            .replace(/\s*secs?/i, 's')
            .replace(/\s*mins?/i, 'm')
            .replace(/\s+/g, ' ')
            .trim();
        }
        return `
          <button type="button" 
            class="video-pathway-tab-btn ${isActive ? 'is-active' : ''}" 
            data-target="${videoSectionId}-card-${i}"
            onclick="window.switchVideoTab && window.switchVideoTab(this, '${videoSectionId}', '${videoSectionId}-card-${i}')"
            style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 6px; font-size: 0.82rem; font-weight: ${isActive ? '700' : '600'}; background: ${isActive ? '#1e40af' : '#ffffff'}; color: ${isActive ? '#ffffff' : '#475569'}; border: 1px solid ${isActive ? '#1e40af' : '#cbd5e1'}; cursor: pointer; transition: all 0.15s ease; white-space: nowrap; box-shadow: ${isActive ? '0 2px 5px rgba(30,64,175,0.25)' : '0 1px 2px rgba(0,0,0,0.03)'};"
            onmouseover="if (!this.classList.contains('is-active')) { this.style.background='#f8fafc'; this.style.borderColor='#94a3b8'; }"
            onmouseout="if (!this.classList.contains('is-active')) { this.style.background='#ffffff'; this.style.borderColor='#cbd5e1'; }"
          >
            <i class="${info.icon}" style="color: ${isActive ? '#93c5fd' : '#2563eb'};"></i>
            <span>${info.pathway}</span>
            ${shortDur ? `<span style="font-size: 0.74rem; opacity: 0.85; font-family: monospace;">(${shortDur})</span>` : ''}
          </button>
        `;
      })
      .join('');

    tabBarHtml = `
      <div class="video-pathway-tabs-bar no-print" style="display: flex; gap: 8px; margin-bottom: 12px; overflow-x: auto; padding-bottom: 4px; border-bottom: 1px solid #e2e8f0;">
        ${tabButtons}
      </div>
    `;
  }

  return `
    <div id="${videoSectionId}" class="phase-card archival-media-phase" style="margin-top: 24px; margin-bottom: 24px; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 10px; overflow: hidden; box-shadow: 0 3px 10px rgba(0,0,0,0.04);">
      <!-- Streamlined Archival Header Bar (Option 4) -->
      <div style="background: #0f172a; color: #ffffff; padding: 8px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; border-bottom: 1px solid #334155;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-film" style="color: #f87171; font-size: 0.85rem;"></i>
          <span style="font-size: 0.88rem; font-weight: 700; color: #f8fafc; font-family: 'Playfair Display', serif; letter-spacing: 0.02em;">
            Archival Video Evidence
          </span>
          <span class="no-print" style="font-size: 0.72rem; color: #94a3b8; font-weight: 500;">&bull; Act 2 Audio-Visual Bridge</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          ${
            videos.length > 1
              ? `
            <span class="no-print" style="font-size: 0.72rem; color: #94a3b8; background: rgba(255,255,255,0.08); padding: 2px 7px; border-radius: 3px;">
              ${videos.length} Pathways Available
            </span>
          `
              : ''
          }
          <span class="archival-shelfmark-stamp" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #cbd5e1; font-size: 0.72rem; padding: 2px 7px; border-radius: 3px; font-family: monospace;">
            MEDIA // ${(unitId || 'HIST').toUpperCase()}
          </span>
        </div>
      </div>

      <!-- Inner Content Area -->
      <div style="padding: 12px 16px; background: #f8fafc;">
        ${tabBarHtml}
        <div class="video-cards-container">
          ${videoCardsHtml}
        </div>
      </div>
    </div>
  `;
}

export function renderLesson(lesson) {
  if (window.doNowTimers) {
    Object.values(window.doNowTimers).forEach((t) => {
      if (t && t.interval) clearInterval(t.interval);
    });
    window.doNowTimers = {};
  }
  window.postRenderHooks = [];
  const activeUnit =
    window.currentUnitData || (appStore && appStore.state && appStore.state.activeUnitData) || {};
  const unitId =
    activeUnit.id ||
    (typeof window !== 'undefined' && window.location && window.location.search
      ? new URLSearchParams(window.location.search).get('id') ||
        new URLSearchParams(window.location.search).get('unit')
      : null) ||
    window.currentUnitId;
  const isEarlyModern = unitId === 'early_modern_world';
  const isGCSE =
    unitId === 'weimar_nazi_germany' ||
    unitId === 'cme_new' ||
    unitId === 'usa' ||
    unitId === 'eee' ||
    unitId === 'edexcel_medicine' ||
    activeUnit.isGCSE ||
    false;
  const hasInlineNarrativeSources =
    Array.isArray(lesson.narrative_blocks) &&
    lesson.narrative_blocks.some(
      (b) => b && (b.source || (unitId === 'edexcel_medicine' && b.image)),
    );
  let htmlDoNow = '',
    htmlPrimary = '',
    htmlSources1 = '',
    htmlNarrative = '',
    htmlVideo = '',
    htmlPairShare = '',
    htmlHistorian = '',
    htmlTasks = '',
    htmlExamPractice = '',
    htmlVocabDeck = '',
    htmlExtended = '';
  const formatBold = window.formatBold;
  let globalQuestionNum = 1;
  const formatQuestion = (qText, prependNumber = true) => {
    if (!qText) return '';
    let cleaned = cleanQuestionText(qText);
    if (prependNumber) return `Question ${globalQuestionNum++}: ${formatBold(cleaned)}`;
    return formatBold(cleaned);
  };
  lesson = JSON.parse(JSON.stringify(lesson));
  assignQuestionNumbers(lesson, unitId);

  // Normalize do_now format
  if (Array.isArray(lesson.do_now)) {
    lesson.do_now = {
      type: 'questions',
      items: lesson.do_now.map((t) => ({ question: t.q || t.question, answer: t.a || t.answer })),
    };
  } else if (lesson.do_now && lesson.do_now.type === 'questions' && lesson.do_now.tasks) {
    lesson.do_now.items = lesson.do_now.tasks.map((t) => ({
      question: t.q || t.question,
      answer: t.a || t.answer,
    }));
  }

  // Extract exam tasks from tasks array so they are not rendered inline
  let extractedExamTasks = [];
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach((block) => {
      if (block.tasks) {
        const eTasks = block.tasks.filter((t) => (t.text || t.question || '').includes('marks)'));
        extractedExamTasks.push(...eTasks);
        block.tasks = block.tasks.filter((t) => !(t.text || t.question || '').includes('marks)'));
      }
    });
  }
  if (lesson.tasks) {
    const eTasks = lesson.tasks.filter((t) => (t.text || t.question || '').includes('marks)'));
    extractedExamTasks.push(...eTasks);
    lesson.tasks = lesson.tasks.filter((t) => !(t.text || t.question || '').includes('marks)'));
  }

  if (lesson.exam_practice && Array.isArray(lesson.exam_practice)) {
    // Duplication removed: exam_practice is rendered directly below.
  }

  assignQuestionNumbers(lesson, unitId);
  lesson.unitId = unitId;
  window.currentActiveLesson = lesson;

  // Tabs container logic
  let heroImage =
    lesson.banner || window.currentUnitData?.homepage_background || '/images/default_hero.jpg';
  const isTrip =
    (window.currentUnitData && window.currentUnitData.type === 'trip') ||
    (appStore.state.activeUnitData && appStore.state.activeUnitData.type === 'trip') ||
    window.currentUnitId === 'trip_ypres' ||
    appStore.state.selectedUnitId === 'trip_ypres' ||
    lesson.cwgc_data !== undefined ||
    lesson.id === 'day_0' ||
    (lesson.id && (lesson.id.startsWith('day_') || lesson.id.startsWith('hero_')));
  let lessonPrefix = 'Lesson';
  let ktMatch = lesson.title ? lesson.title.match(/^(?:KT|Key Topic)\s*([\d\.]+)/i) : null;

  if (window.currentUnitId === 'cme_new' && ktMatch) {
    if (ktMatch[1].startsWith('1')) heroImage = '/assets/cme_new_kt1_cover.png';
    else if (ktMatch[1].startsWith('2')) heroImage = '/assets/cme_new_kt2_cover.png';
    else if (ktMatch[1].startsWith('3')) heroImage = '/assets/cme_new_kt3_cover.png';
  } else if (window.currentUnitId === 'edexcel_medicine' && ktMatch) {
    if (lesson.banner) {
      heroImage =
        typeof lesson.banner === 'string'
          ? lesson.banner
          : lesson.banner.image || lesson.banner.url;
    } else {
      if (ktMatch[1].startsWith('1')) heroImage = '/images/banner_medicine_medieval.jpg';
      else if (ktMatch[1].startsWith('2')) heroImage = '/images/banner_medicine_renaissance.jpg';
      else if (ktMatch[1].startsWith('3')) heroImage = '/images/banner_medicine_18th_19th.jpg';
      else if (ktMatch[1].startsWith('4')) heroImage = '/images/banner_medicine_modern.jpg';
      else if (ktMatch[1].startsWith('5')) heroImage = '/images/banner_medicine_western_front.jpg';
    }
  } else if (window.currentUnitId === 'usa' && ktMatch) {
    if (ktMatch[1].startsWith('1'))
      heroImage = '/units/usa/assets/sources/airborne-little-rock-patrol.jpg';
    else if (ktMatch[1].startsWith('2'))
      heroImage = '/units/usa/assets/sources/birmingham-protests-dogs-1963.jpg';
    else if (ktMatch[1].startsWith('3'))
      heroImage = '/units/usa/assets/sources/us-soldier-patrolling-swamp.jpg';
    else if (ktMatch[1].startsWith('4'))
      heroImage = '/units/usa/assets/sources/antiwar-pentagon-protest-1967.jpg';
  }

  if (isTrip) {
    if (lesson.id === 'day_0') {
      lessonPrefix = 'Expedition Briefing';
    } else if (lesson.id && lesson.id.startsWith('day_')) {
      lessonPrefix = `Day ${lesson.id.split('_')[1]} · Field Guide`;
    } else if (lesson.id === 'hero_crummack') {
      lessonPrefix = 'Pupil Family Archive · Year 10 Family';
    } else if (lesson.id && lesson.id.startsWith('hero_lowry_')) {
      lessonPrefix = 'Home Front Memorial · Manor Way Grange';
    } else if (lesson.id && lesson.id.startsWith('hero_')) {
      lessonPrefix = 'Local Hero · Fallen of the Salient';
    }
  } else if (ktMatch) {
    lessonPrefix = `KT ${ktMatch[1]}`;
  } else if (lesson.id && lesson.id.startsWith('lesson_')) {
    const parts = lesson.id.split('_');
    const rawNum = parseInt(parts[1], 10);
    const lessonNum = isNaN(rawNum) || rawNum === 0 ? 1 : rawNum;
    if (parts.length > 2) {
      lessonPrefix = `Lesson ${lessonNum}.${parts.slice(2).join('.')}`;
    } else {
      lessonPrefix = `Lesson ${lessonNum}`;
    }
  }

  const contentArea = document.getElementById('content-area');
  if (contentArea) contentArea.style.paddingTop = '0'; // Fix gap

  let html = `<div class="lesson-content">`;

  let headerEnquiry = lesson.enquiry || lesson.enquiry_question || lesson.inquiry_question;
  let targetText = headerEnquiry || lesson.title || '';
  if (targetText && targetText.length > 90) {
    targetText = lesson.title || targetText;
  }
  let stickyHeaderText = '';

  if (isTrip) {
    stickyHeaderText = `${lessonPrefix}: ${lesson.title.split('(')[0].trim()}`;
  } else if (/^(?:KT|Key Topic|Lesson)\s*[\d\.]+/i.test(targetText)) {
    stickyHeaderText = targetText;
  } else {
    stickyHeaderText = `${lessonPrefix}: ${targetText}`;
  }

  // Sticky Header (No visible background, but opaque to hide scrolling text)
  const allUnitLessons =
    (appStore.state.activeUnitData && appStore.state.activeUnitData.lessons) ||
    (window.currentUnitData && window.currentUnitData.lessons) ||
    [];
  const currentIndex = allUnitLessons.findIndex(
    (l) => l.title === lesson.title || (lesson.id && l.id === lesson.id),
  );
  const grEntry =
    (activeUnit.guided_reading || []).find((gr) => gr.lesson_index === currentIndex) ||
    ((window.currentUnitData && window.currentUnitData.guided_reading) || []).find(
      (gr) => gr.lesson_index === currentIndex,
    );
  html += `
      <div class="sticky-lesson-header">
          <h4 class="sticky-lesson-title">
            ${stickyHeaderText}
            <span class="edition-badge" title="Curriculum Edition" style="display: inline-block; font-size: 0.72rem; font-weight: 600; vertical-align: middle; margin-left: 8px; padding: 2px 7px; border-radius: 10px; background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; letter-spacing: 0.5px;">Edition ${activeUnit.edition || '2026.1'}</span>
          </h4>
          <div class="sticky-lesson-actions">
          ${
            isTrip
              ? `
              <button class="btn btn-whiteboard-toggle ${typeof document !== 'undefined' && document.body.classList.contains('whiteboard-mode-active') ? 'active' : ''}" id="whiteboard-mode-btn" onclick="event.stopPropagation(); window.toggleWhiteboardMode();" title="Toggle Whiteboard Presentation Mode (collapses hero banner for classroom projectors)"><i class="fa-solid fa-chalkboard"></i> <span class="wb-btn-label">Whiteboard View</span></button>
              <button class="btn btn-secondary" style="padding: 6px 14px; font-size: 0.88rem; background: white; color: #1e3a8a; border: 1.5px solid #cbd5e1; font-weight: 700; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); cursor: pointer;" data-action="switch-view" data-view="lessons" data-unit="${appStore.state.selectedUnitId || window.currentUnitId || 'trip_ypres'}"><i class="fa-solid fa-arrow-left" style="margin-right: 6px;"></i> Itinerary</button>
            `
              : `
              ${
                grEntry
                  ? `<button class="btn btn-guided-reading-launcher" style="padding: 6px 12px; font-size: 0.88rem; background: #fdf2f8; color: #9d174d; border: 1.5px solid #fbcfe8; font-weight: 700; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: inline-flex; align-items: center; gap: 6px; cursor: pointer;" data-action="open-guided-reading-modal" data-lesson-index="${currentIndex}" title="Open Guided Reading Extract: ${grEntry.book_title}"><i class="fa-solid fa-book-open-reader" style="color: #be185d;"></i> Guided Reading: ${grEntry.book_title}</button>`
                  : ''
              }
              ${
                unitId === 'edexcel_medicine' && currentIndex >= 0
                  ? `<a href="/units/edexcel_medicine/visual_revision_guide.html#spread-${currentIndex + 1}" target="_blank" class="btn" style="padding: 6px 12px; font-size: 0.88rem; background: #eff6ff; color: #1e3a8a; border: 1.5px solid #bfdbfe; font-weight: 700; text-decoration: none; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: inline-flex; align-items: center; gap: 6px;" title="Jump directly to this lesson's visual revision spread and exam model in the Masterclass Guide"><i class="fa-solid fa-book-open"></i> Revision Masterclass (Spread ${currentIndex + 1})</a>`
                  : ''
              }
              ${
                unitId === 'cme_new' && currentIndex >= 0
                  ? `<a href="/units/cme_new/visual_revision_guide.html#page_${4 + currentIndex * 2}" target="_blank" class="btn" style="padding: 6px 12px; font-size: 0.88rem; background: #f0f9ff; color: #0369a1; border: 1.5px solid #bae6fd; font-weight: 700; text-decoration: none; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: inline-flex; align-items: center; gap: 6px;" title="Jump directly to this lesson's visual revision spread in the Masterclass Guide"><i class="fa-solid fa-book-open"></i> Revision Masterclass (Spread ${currentIndex + 1})</a>`
                  : ''
              }
              <button class="btn btn-whiteboard-toggle ${typeof document !== 'undefined' && document.body.classList.contains('whiteboard-mode-active') ? 'active' : ''}" id="whiteboard-mode-btn" onclick="event.stopPropagation(); window.toggleWhiteboardMode();" title="Toggle Whiteboard Presentation Mode (collapses hero banner for classroom projectors)"><i class="fa-solid fa-chalkboard"></i> <span class="wb-btn-label">Whiteboard View</span></button>
              <button class="btn btn-secondary btn-teacher-mode-toggle ${typeof document !== 'undefined' && document.body.classList.contains('teacher-mode-active') ? 'active' : ''}" id="teacher-mode-btn" data-action="toggle-teacher-mode" onclick="event.stopPropagation(); window.toggleTeacherMode();" title="${typeof document !== 'undefined' && document.body.classList.contains('teacher-mode-active') ? 'Teacher Mode is ON (Click to hide teacher guidance)' : 'Click to show Teacher Guidance & Delivery Roadmap'}"><i class="fa-solid fa-user-tie"></i> <span class="teacher-btn-label">${typeof document !== 'undefined' && document.body.classList.contains('teacher-mode-active') ? 'Teacher Mode: ON' : 'Teacher Mode'}</span></button>
              <button class="btn" style="padding: 6px 12px; font-size: 0.9rem; background: white; color: #0f172a; border: 1px solid rgba(0,0,0,0.1); font-weight: 600; box-shadow: 0 2px 5px rgba(0,0,0,0.05);" data-action="open-debate-modal"><i class="fa-solid fa-comments" style="color: #3b82f6;"></i> Class Debate</button>
              <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.9rem; background: white; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 2px 5px rgba(0,0,0,0.05);" data-action="open-task-whiteboard" title="Teacher Whiteboard / Live Marking"><i class="fa-solid fa-person-chalkboard" style="color: #0284c7;"></i> Whiteboard</button>
              <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.9rem; background: white; border: 1px solid rgba(0,0,0,0.1);" data-action="switch-view" data-view="lessons" data-unit="${appStore.state.selectedUnitId || window.currentUnitId || 'gcse_usa_1954_1975'}"><i class="fa-solid fa-arrow-left"></i> Unit Menu</button>
            `
          }
        </div>
      </div>
    `;
  let bannerPosition = lesson.banner_position || 'center';
  const isFamilyHero =
    lesson.id &&
    (lesson.id.startsWith('hero_') ||
      lesson.title?.includes('Pupil Family Hero') ||
      lesson.title?.includes('Local Hero'));
  const heroExtraClass = isFamilyHero ? ' family-archive-hero' : '';

  const existingFloatingBtn = document.getElementById('floating-stop-navigator-btn');
  if (existingFloatingBtn) existingFloatingBtn.remove();

  // Full-Bleed Hero Image
  html += `
      <div class="lesson-hero${heroExtraClass}" style="position: relative; width: calc(100% + 8rem); margin-left: -4rem; margin-top: -1rem; height: 300px; background: url('${heroImage}') ${bannerPosition}/cover no-repeat; margin-bottom: 2rem; border-bottom: 1px solid var(--border-glass); box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(15,23,42,0.2), rgba(15,23,42,0.9));"></div>
        <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 2rem 4rem;">
          <span style="color: #cbd5e1; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem;">${lessonPrefix}</span>
          <h2 style="font-family: 'Playfair Display', serif; color: white; font-size: 2.5rem; margin: 0.5rem 0 0 0; line-height: 1.2; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">${lesson.title}</h2>
        </div>
      </div>
    `;

  html += `
      <div id="progress-container" style="background: rgba(226,232,240,0.5); height: 6px; width: 100%; margin-bottom: 20px; border-radius: 3px; overflow: hidden; backdrop-filter: blur(5px);">
        <div id="progress-bar" style="background: #10b981; height: 100%; width: 0%; transition: width 0.3s;"></div>
      </div>
    `;

  // GCSE Specification Anchor Strip
  if (lesson.specification_anchor) {
    const specPaperBadge =
      unitId === 'edexcel_medicine'
        ? 'Edexcel Paper 1 &bull; Specification Anchor'
        : unitId === 'cme_new'
          ? 'Edexcel Paper 2 &bull; Specification Anchor'
          : unitId === 'eee'
            ? 'Edexcel Paper 2 &bull; Specification Anchor'
            : unitId === 'weimar_nazi_germany'
              ? 'Edexcel Paper 3 &bull; Specification Anchor'
              : 'Edexcel GCSE &bull; Specification Anchor';

    html += `
      <div class="gcse-spec-anchor-strip">
        <span style="background: #1e3a8a; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 0.76rem; font-weight: 800; padding: 3px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-bookmark" style="color: #60a5fa;"></i> ${specPaperBadge}
        </span>
        <span class="spec-text" style="font-family: 'Inter', sans-serif; font-size: 0.92rem; color: #1e293b; line-height: 1.4; flex: 1; min-width: 260px;">
          <strong style="color: #0f172a;">Syllabus Focus:</strong> &ldquo;${lesson.specification_anchor}&rdquo;
        </span>
      </div>
    `;
  }

  // -----------------------------------------------------
  // TABS NAVIGATION UI
  // -----------------------------------------------------
  html += `
      
    `;

  let vocabDict = {};
  if (lesson.vocab) {
    lesson.vocab.forEach((v) => {
      const termDef = v.definition || v.def || v.desc || '';
      if (termDef) {
        vocabDict[v.term.toLowerCase()] = termDef;
      }
    });
  }

  let seenTerms = new Set();
  const highlightGlossary = (text) => {
    if (!text || typeof text !== 'string') return text || '';
    if (Object.keys(vocabDict).length === 0) return text;
    let processedText = text;
    const sortedTerms = Object.keys(vocabDict).sort((a, b) => b.length - a.length);
    for (const term of sortedTerms) {
      const def = vocabDict[term];
      if (!def || typeof def !== 'string') continue;
      if (!seenTerms.has(term)) {
        // Regex matches HTML tags OR the specific term word boundary
        const regex = new RegExp(`(<[^>]+>)|\\b(${term})\\b`, 'gi');
        let matchedTerm = false;

        processedText = processedText.replace(regex, (match, htmlTag, word) => {
          if (htmlTag) return htmlTag; // Skip and preserve anything already in an HTML tag
          if (word) {
            matchedTerm = true;
            return `<span class="vocab-word" data-definition="${def.replace(/"/g, '&quot;')}">${word}</span>`;
          }
          return match;
        });

        if (matchedTerm) {
          seenTerms.add(term);
        }
      }
    }
    return processedText;
  };

  if (lesson.teacher_notes) {
    let notesHtml = '';
    if (
      lesson.teacher_notes &&
      !Array.isArray(lesson.teacher_notes) &&
      typeof lesson.teacher_notes === 'object'
    ) {
      const primerText = lesson.teacher_notes.primer
        ? `<div style="font-size: 1.05rem; margin-bottom: 20px;">${lesson.teacher_notes.primer}</div>`
        : '';
      const sourceContextText =
        typeof lesson.teacher_notes.source_context === 'object' &&
        lesson.teacher_notes.source_context !== null
          ? Object.values(lesson.teacher_notes.source_context).join('<br/><br/>')
          : lesson.teacher_notes.source_context;
      const sourceContext = sourceContextText
        ? `<div style="font-size: 0.95rem; margin-bottom: 20px; background: rgba(2, 132, 199, 0.2); padding: 15px; border-left: 4px solid #38bdf8; border-radius: 4px;"><strong><span class="archival-meta-tag" style="color: #38bdf8; margin-right: 6px;">Source Context</span></strong><br/>${sourceContextText}</div>`
        : '';
      let deliveryPlanHtml = '';
      if (lesson.teacher_notes.delivery_plan) {
        const dp = lesson.teacher_notes.delivery_plan;
        const renderLessonPhases = (lObj, label) => {
          if (!lObj || !lObj.phases) return '';
          const phaseItems = lObj.phases
            .map(
              (p) => `
            <div style="display: flex; gap: 12px; margin-bottom: 8px; align-items: flex-start; font-size: 0.9rem;">
              <span style="display: inline-block; background: #1e3a8a; color: #93c5fd; font-weight: 700; font-size: 0.78rem; padding: 2px 8px; border-radius: 4px; white-space: nowrap; font-family: monospace;">${p.time}</span>
              <div style="flex: 1;">
                <strong style="color: #f8fafc; font-size: 0.92rem;">${p.label}:</strong> <span style="color: #cbd5e1;">${p.instruction}</span>
              </div>
            </div>
          `,
            )
            .join('');

          return `
            <div style="background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 6px; padding: 14px; flex: 1; min-width: 280px;">
              <div style="font-weight: bold; color: #38bdf8; margin-bottom: 10px; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
                <i class="fa-regular fa-clock"></i> ${lObj.title || label}
              </div>
              ${phaseItems}
            </div>
          `;
        };

        deliveryPlanHtml = `
          <div style="margin-bottom: 22px; background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <strong style="color: #facc15; font-size: 1rem; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-timeline"></i> Classroom Delivery Roadmap (${dp.format || '2-Lesson Sequence'})
              </strong>
              <span style="font-size: 0.8rem; color: #94a3b8; background: rgba(0,0,0,0.3); padding: 3px 8px; border-radius: 4px;">Departmental Timing Standard</span>
            </div>
            <div style="display: flex; gap: 14px; flex-wrap: wrap;">
              ${renderLessonPhases(dp.lesson_1, 'Lesson 1')}
              ${renderLessonPhases(dp.lesson_2, 'Lesson 2')}
            </div>
          </div>
        `;
      }

      const objectivesHtml = (lesson.teacher_notes.objectives || [])
        .map(
          (note) => `
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><span class="archival-meta-tag" style="color: #facc15; margin-right: 6px;">OBJECTIVE</span> ${note.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: 0;">${note.primer}</div>
            ${note.question ? `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); color: #38bdf8; font-weight: 600;"><span class="archival-meta-tag" style="color: #38bdf8; margin-right: 6px;">HINGE QUESTION:</span> ${note.question}</div>` : ''}
          </div>
        `,
        )
        .join('');
      notesHtml = primerText + deliveryPlanHtml + sourceContext + objectivesHtml;
    } else if (Array.isArray(lesson.teacher_notes)) {
      notesHtml = lesson.teacher_notes
        .map(
          (note) => `
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><span class="archival-meta-tag" style="color: #facc15; margin-right: 6px;">OBJECTIVE</span> ${note.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: 0;">${note.primer}</div>
            ${note.question ? `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); color: #38bdf8; font-weight: 600;"><span class="archival-meta-tag" style="color: #38bdf8; margin-right: 6px;">HINGE QUESTION:</span> ${note.question}</div>` : ''}
          </div>
        `,
        )
        .join('');
    } else {
      notesHtml = `<div style="font-size: 1.05rem;">${lesson.teacher_notes}</div>`;
    }

    if (!isTrip) {
      html += `
          <div class="teacher-note">
            <h4><i class="fa-solid fa-chalkboard-user"></i> Pedagogical Primer</h4>
            ${notesHtml}
          </div>
        `;
    }
  } else {
    // If no teacher notes but we somehow had objectives elsewhere (fallback)
    if (!isTrip) {
    }
  }

  if (
    lesson.sources &&
    lesson.sources.length > 0 &&
    unitId !== 'cme_new' &&
    !hasInlineNarrativeSources
  ) {
    htmlSources1 += `<div class="sources-grid" style="margin-top: 20px;">`;
    lesson.sources.forEach((source) => {
      const sLetterMatch = (source.title || '').match(/Source\s+([A-Z])/i);
      const sLetter = sLetterMatch ? sLetterMatch[1].toUpperCase() : '';
      const cardIdAttr =
        sLetter && window.currentUnitId === 'cme_new'
          ? `id="source-card-${sLetter}" data-source-letter="${sLetter}"`
          : '';
      const qClassAttr =
        sLetter && window.currentUnitId === 'cme_new'
          ? 'source-inquiry-box source-inquiry-interactive'
          : '';
      const qDataAttr =
        sLetter && window.currentUnitId === 'cme_new'
          ? `data-target-source="${sLetter}" title="Hover or click to highlight Source ${sLetter}"`
          : '';

      if (unitId === 'great_war' || unitId === 'edexcel_medicine') {
        const sLetterMatch = (source.title || '').match(/(?:Source|Map|Diagram)\s+([A-Z])/i);
        const sLetter = sLetterMatch ? sLetterMatch[1].toUpperCase() : '';
        const isMap = /map/i.test(source.title);
        const isDiagram = /diagram/i.test(source.title);
        const metaTag = isMap
          ? 'Cartographic Record'
          : isDiagram
            ? 'Historical Diagram'
            : 'Primary Source';
        const displayTitle = source.title
          ? source.title.includes(':')
            ? source.title.split(':').slice(1).join(':').trim()
            : source.title
          : 'Historical Document';
        const prefix = source.title
          ? source.title.split(':')[0].trim()
          : sLetter
            ? `Source ${sLetter}`
            : 'Document';

        htmlSources1 += `
          <div class="archival-source-box accent-amber" style="background: #fffdfa; border: 1px solid #cbd5e1; border-top: 3.5px solid ${isMap ? '#059669' : '#1e3a8a'}; border-radius: 8px; padding: 22px 26px; margin-bottom: 24px; text-align: left; box-shadow: 0 3px 10px rgba(0,0,0,0.04);">
            <div class="archival-source-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; padding-bottom: 12px; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
              <div>
                <h4 class="archival-source-title" style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.15rem; font-weight: 700; color: #0f172a; margin: 0; line-height: 1.35;">
                  ${source.title || displayTitle}
                </h4>
              </div>
            </div>
            ${
              source.src || source.source || source.image
                ? `
              <div class="archival-source-split-layout">
                <div class="archival-source-media-col">
                  <img src="${getAssetUrl(source.src || source.source || source.image)}" alt="${source.title || 'Source Image'}" data-action="open-modal" data-src="${getAssetUrl(source.src || source.source || source.image)}" style="cursor: zoom-in;">
                  <div class="archival-source-inspect-badge">
                    <span class="archival-meta-tag" style="font-size: 0.62rem; color: #cbd5e1; letter-spacing: 0.08em;">CLICK TO ENLARGE / PAN-ZOOM</span>
                  </div>
                </div>
                <div class="archival-source-details-col">
                  <div>
                    ${
                      source.caption
                        ? `
                      <div style="font-size: 0.95rem; color: #334155; margin-bottom: 12px; line-height: 1.6; font-style: italic; background: #f8fafc; padding: 12px 16px; border-left: 3px solid #64748b; border-radius: 0 4px 4px 0;">
                        ${source.caption}
                      </div>
                    `
                        : ''
                    }
                    ${
                      source.context
                        ? `
                      <div style="font-size: 0.95rem; color: #1e293b; margin-bottom: 12px; line-height: 1.65; background: rgba(2, 132, 199, 0.06); padding: 14px 18px; border-left: 4px solid #0284c7; border-radius: 0 6px 6px 0;">
                        <strong style="color: #0369a1; display: block; margin-bottom: 5px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em;"><span class="archival-meta-tag" style="color: #0284c7; margin-right: 6px;">HISTORICAL CONTEXT</span></strong>
                        ${typeof window !== 'undefined' && window.formatBold ? window.formatBold(source.context) : source.context}
                      </div>
                    `
                        : ''
                    }
                  </div>
                  ${
                    source.citation || source.provenance
                      ? `
                    <div class="archival-citation-footer" style="font-size: 0.8rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: auto;">
                      <strong>Provenance:</strong> ${source.citation || source.provenance}
                    </div>
                  `
                      : ''
                  }
                </div>
              </div>
            `
                : `
              ${
                source.caption
                  ? `
                <div style="font-size: 0.95rem; color: #334155; margin: 12px 0; line-height: 1.6; font-style: italic; background: #f8fafc; padding: 12px 16px; border-left: 3px solid #64748b; border-radius: 0 4px 4px 0;">
                  ${source.caption}
                </div>
              `
                  : ''
              }
              ${
                source.context
                  ? `
                <div style="font-size: 0.95rem; color: #1e293b; margin: 14px 0; line-height: 1.65; background: rgba(2, 132, 199, 0.06); padding: 14px 18px; border-left: 4px solid #0284c7; border-radius: 0 6px 6px 0;">
                  <strong style="color: #0369a1; display: block; margin-bottom: 5px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em;"><span class="archival-meta-tag" style="color: #0284c7; margin-right: 6px;">HISTORICAL CONTEXT</span></strong>
                  ${typeof window !== 'undefined' && window.formatBold ? window.formatBold(source.context) : source.context}
                </div>
              `
                  : ''
              }
              ${
                source.citation || source.provenance
                  ? `
                <div class="archival-citation-footer" style="font-size: 0.8rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 12px;">
                  <strong>Provenance:</strong> ${source.citation || source.provenance}
                </div>
              `
                  : ''
              }
            `
            }
            ${
              source.question || source.hinge_question
                ? `
              <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #1e40af; padding: 14px 18px; border-radius: 4px; text-align: left; margin-top: 14px; box-shadow: 0 2px 5px rgba(30,58,138,0.06);">
                <p style="margin-bottom: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.02rem; color: #1e3a8a; line-height: 1.5; font-weight: 600;">
                  <strong>${source.qNum ? `Q${source.qNum}. ` : ''}${formatQuestion(cleanQuestionText(source.question || source.hinge_question), !source.qNum)}</strong>
                </p>
              </div>
            `
                : ''
            }
          </div>
        `;
        return;
      }

      htmlSources1 += `
            <div class="source-card" ${cardIdAttr} style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center; transition: all 0.3s ease;">
              ${source.title ? `<h4 style="color: var(--primary); margin-top: 0; text-align: left;">${source.title}</h4>` : ''}
              
              ${
                source.src || source.source || source.image
                  ? `
                <div style="display: inline-flex; flex-direction: column; position: relative; max-width: 100%; text-align: left; margin: 15px 0;">
                  <div style="position: relative;">
                    <img src="${getAssetUrl(source.src || source.source || source.image)}" alt="Source Image" style="max-width: 100%; max-height: 400px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in; display: block;" data-action="open-modal" data-src="${getAssetUrl(source.src || source.source || source.image)}">
                  </div>
                  ${
                    source.caption
                      ? `
                    <div class="source-info-panel" style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; font-size: 0.95rem; color: #334155; margin-top: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); position: relative;">
                      <strong style="color: #0f172a; margin-bottom: 5px; display: block;">
                        <i class="fa-solid fa-circle-info" style="color: #10b981; margin-right: 5px;"></i>
                        About this source
                      </strong>
                      ${source.caption}
                    </div>
                  `
                      : ''
                  }
                </div>
              `
                  : source.caption
                    ? `
                <div style="text-align: left; margin-top: 15px; font-size: 1.05rem; color: #334155; line-height: 1.5; padding: 15px; background: #f8fafc; border-left: 4px solid #10b981; border-radius: 4px;">
                  ${source.caption}
                </div>
              `
                    : ''
              }
              
              ${source.content ? `<div style="text-align: left; margin-top: 10px; font-style: italic; color: #334155; font-size: 1.05rem; line-height: 1.5;">${source.content}</div>` : ''}
              ${
                source.question
                  ? `
                <div class="${qClassAttr}" ${qDataAttr} style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 15px;">
                  <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>${source.qNum ? `Q${source.qNum}. ` : ''}${formatQuestion(source.question, !source.qNum)}</strong></p>
                </div>
              `
                  : ''
              }
            </div>
          `;
    });
    htmlSources1 += `</div>`;
  }

  // ==========================================
  // TAB 1: PREPARATION
  // ==========================================
  htmlSources1 += ``;

  if (lesson.primary_source) {
    let rawSrcs = lesson.primary_source.src || lesson.primary_source.image;
    let srcs = rawSrcs ? (Array.isArray(rawSrcs) ? rawSrcs.filter(Boolean) : [rawSrcs]) : [];
    if (unitId === 'great_war') {
      const pTitle = lesson.primary_source.title || 'Primary Archival Source';
      const displayTitle = pTitle.includes(':')
        ? pTitle.split(':').slice(1).join(':').trim()
        : pTitle;
      const prefix = pTitle.includes(':') ? pTitle.split(':')[0].trim() : 'Source A';

      htmlPrimary += `
        <div class="phase-card">
          <div class="archival-source-box accent-amber" style="background: #fffdfa; border: 1px solid #cbd5e1; border-top: 3.5px solid #1e3a8a; border-radius: 8px; padding: 22px 26px; margin-bottom: 24px; text-align: left; box-shadow: 0 3px 10px rgba(0,0,0,0.04);">
            <div class="archival-source-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; padding-bottom: 12px; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
              <div>
                <span class="archival-meta-tag" style="display: block; margin-bottom: 4px; color: #1e3a8a; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase;">
                  Primary Archival Evidence · ${prefix}
                </span>
                <h4 class="archival-source-title" style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.2rem; font-weight: 700; color: #0f172a; margin: 0; line-height: 1.35;">
                  ${displayTitle}
                </h4>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="archival-shelfmark-stamp">${lesson.primary_source.shelfmark || 'IWM ARCHIVES / REF-GW-1914'}</span>
              </div>
            </div>
            ${
              srcs.length > 0
                ? `
              <div class="archival-source-split-layout">
                <div class="archival-source-media-col">
                  ${srcs.map((src) => `<img src="${getAssetUrl(src)}" alt="${lesson.primary_source.title}" data-action="open-modal" data-src="${getAssetUrl(src)}" style="cursor: zoom-in;">`).join('')}
                  <div class="archival-source-inspect-badge">
                    <span class="archival-meta-tag" style="font-size: 0.62rem; color: #cbd5e1; letter-spacing: 0.08em;">CLICK TO ENLARGE / PAN-ZOOM</span>
                  </div>
                </div>
                <div class="archival-source-details-col">
                  <div>
                    ${
                      lesson.primary_source.caption
                        ? `
                      <div style="font-size: 0.95rem; color: #334155; margin-bottom: 12px; line-height: 1.6; font-style: italic; background: #f8fafc; padding: 12px 16px; border-left: 3px solid #64748b; border-radius: 0 4px 4px 0;">
                        ${lesson.primary_source.caption}
                      </div>
                    `
                        : ''
                    }
                    ${
                      lesson.primary_source.context
                        ? `
                      <div style="font-size: 0.95rem; color: #1e293b; margin-bottom: 12px; line-height: 1.65; background: rgba(2, 132, 199, 0.06); padding: 14px 18px; border-left: 4px solid #0284c7; border-radius: 0 6px 6px 0;">
                        <strong style="color: #0369a1; display: block; margin-bottom: 5px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em;"><span class="archival-meta-tag" style="color: #0284c7; margin-right: 6px;">HISTORICAL CONTEXT</span></strong>
                        ${typeof window !== 'undefined' && window.formatBold ? window.formatBold(lesson.primary_source.context) : lesson.primary_source.context}
                      </div>
                    `
                        : ''
                    }
                  </div>
                  ${
                    lesson.primary_source.citation || lesson.primary_source.provenance
                      ? `
                    <div class="archival-citation-footer" style="font-size: 0.8rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: auto;">
                      <strong>Provenance:</strong> ${lesson.primary_source.citation || lesson.primary_source.provenance}
                    </div>
                  `
                      : ''
                  }
                </div>
              </div>
            `
                : ''
            }
            ${lesson.primary_source.quote ? `<blockquote style="border-left: 4px solid #3b82f6; background: #f8fafc; padding: 14px 18px; margin: 15px 0; border-radius: 0 8px 8px 0; font-style: italic; color: #1e293b; text-align: left; font-size: 1rem; line-height: 1.6;">&ldquo;${lesson.primary_source.quote}&rdquo;</blockquote>` : ''}
            ${
              lesson.primary_source.citation || lesson.primary_source.provenance
                ? `
              <div class="archival-citation-footer" style="font-size: 0.8rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 14px;">
                <strong>Provenance:</strong> ${lesson.primary_source.citation || lesson.primary_source.provenance}
              </div>
            `
                : ''
            }
            ${
              lesson.primary_source.question
                ? `
              <div style="background: #eff6ff; border-left: 4px solid #1e40af; padding: 16px 20px; border-radius: 0 6px 6px 0; text-align: left; margin-top: 20px; box-shadow: 0 2px 5px rgba(30,58,138,0.05);">
                <p style="margin-bottom: 0; font-size: 1.05rem; color: #1e3a8a; line-height: 1.5;"><strong>${lesson.primary_source.qNum ? `Q${lesson.primary_source.qNum}. ` : ''}${formatQuestion(lesson.primary_source.question, !lesson.primary_source.qNum)}</strong></p>
              </div>
            `
                : ''
            }
          </div>
        </div>
      `;
    } else {
      htmlPrimary += `
        <div class="phase-card">
          <div class="source-card" style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
            ${
              srcs.length > 0
                ? `
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-bottom: 15px;">
              ${srcs.map((src) => `<img src="${getAssetUrl(src)}" alt="Source" style="max-height: 500px; max-width: ${srcs.length > 1 ? '45%' : '100%'}; object-fit: contain; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">`).join('')}
            </div>
            `
                : ''
            }
            <div style="font-weight: bold; margin-bottom: 10px; font-size: 1.1rem; color: var(--primary);">${lesson.primary_source.title}</div>
            ${lesson.primary_source.context ? `<div style="color: #64748b; margin-bottom: 12px; font-size: 0.9rem; text-align: left; font-style: italic;"><strong>Context:</strong> ${lesson.primary_source.context}</div>` : ''}
            ${lesson.primary_source.quote ? `<blockquote style="border-left: 4px solid #3b82f6; background: #f8fafc; padding: 14px 18px; margin: 15px 0; border-radius: 0 8px 8px 0; font-style: italic; color: #1e293b; text-align: left; font-size: 1rem; line-height: 1.6;">&ldquo;${lesson.primary_source.quote}&rdquo;</blockquote>` : ''}
            ${lesson.primary_source.caption ? `<div style="color: #475569; margin-bottom: 15px; font-size: 0.95rem; text-align: left;">${lesson.primary_source.caption}</div>` : ''}
            ${
              lesson.primary_source.question
                ? `
              <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 20px;">
                <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>${lesson.primary_source.qNum ? `Q${lesson.primary_source.qNum}. ` : ''}${formatQuestion(lesson.primary_source.question, !lesson.primary_source.qNum)}</strong></p>
              </div>
            `
                : ''
            }
          </div>
        </div>
      `;
    }
  }

  const isMedicineUnit =
    (typeof window !== 'undefined' && window.currentUnitId === 'edexcel_medicine') ||
    (lesson.id && /^lesson_[1-5]_\d+$/.test(lesson.id));
  if (
    !isMedicineUnit &&
    lesson.starters &&
    lesson.starters.length > 0 &&
    typeof lesson.starters[0] === 'object' &&
    lesson.starters[0].source
  ) {
    htmlPrimary += `
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="padding: 15px 20px; background: linear-gradient(to right, #1e3a8a, #3b82f6); color: white; font-weight: bold; font-size: 1.2rem; display: flex; align-items: center;">
              <i class="fa-solid fa-image" style="margin-right: 10px;"></i> Historical Sources: Think & Wonder
            </div>
            <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start;">
        `;
    lesson.starters.forEach((starter, index) => {
      htmlPrimary += `
              <div style="display: flex; flex-direction: column; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; height: 100%;">
                <h4 style="margin: 0 0 15px 0; color: #0f172a; font-size: 1.1rem; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Source ${String.fromCharCode(65 + index)}: ${starter.title}</h4>
                <div style="width: 100%; height: 250px; background-color: #000; border-radius: 4px; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center;">
                  <img src="${getAssetUrl(starter.source || starter.src || starter.image)}" style="max-width: 100%; max-height: 100%; object-fit: contain; cursor: zoom-in;" data-action="open-modal" data-src="${getAssetUrl(starter.source || starter.src || starter.image)}">
                </div>
                <div style="font-size: 0.95rem; color: #475569; margin-bottom: 15px; font-style: italic;">
                  ${starter.caption}
                </div>
                <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px; border-radius: 0 4px 4px 0; margin-top: auto;">
                  <div style="font-weight: 700; color: #1e40af; margin-bottom: 5px; font-size: 0.95rem;"><i class="fa-solid fa-lightbulb" style="color: #fbbf24; margin-right: 5px;"></i> Think & Wonder</div>
                  <div style="font-size: 0.95rem; color: #1e40af;">${starter.think_wonder}</div>
                </div>
              </div>
          `;
    });
    htmlPrimary += `
            </div>
          </div>
        `;
  }

  if (lesson.utility_starters && lesson.utility_starters.sources) {
    htmlPrimary += `
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="padding: 15px 20px; background: linear-gradient(to right, #475569, #334155); color: white; font-weight: bold; font-size: 1.2rem; display: flex; align-items: center;">
              <i class="fa-solid fa-scale-balanced" style="margin-right: 10px;"></i> Historical Sources: Utility
            </div>
            <div class="utility-sources-grid">
        `;
    lesson.utility_starters.sources.forEach((source, index) => {
      let sourceContentHtml = '';
      if (source.type === 'written') {
        sourceContentHtml = `
               <div class="utility-source-written">
                 <i class="fa-solid fa-quote-left" style="color: #facc15; font-size: 1.5rem; margin-bottom: 10px; display: block;"></i>
                 ${source.content}
               </div>
             `;
      } else {
        const utilSourceSrc = getAssetUrl(source.source || source.src || source.image);
        sourceContentHtml = `
                <div class="utility-source-visual">
                  <img class="utility-source-img" src="${utilSourceSrc}" alt="${source.title || 'Historical Source'}" data-action="open-modal" data-src="${utilSourceSrc}">
                </div>
                ${source.caption ? `<div style="font-size: 0.95rem; color: #475569; margin-bottom: 15px; font-style: italic;">${source.caption}</div>` : ''}
             `;
      }

      htmlPrimary += `
              <div class="utility-source-card">
                <h4 class="utility-source-title">${source.title}</h4>
                ${sourceContentHtml}
                
                <details style="background: #f1f5f9; border-left: 4px solid #64748b; border-radius: 0 4px 4px 0; margin-top: auto; overflow: hidden;">
                  <summary style="padding: 12px; cursor: pointer; font-weight: 700; color: #334155; font-size: 0.95rem; list-style: none; display: flex; align-items: center;">
                    <i class="fa-solid fa-key" style="color: #fbbf24; margin-right: 8px;"></i> Reveal Provenance Clue
                  </summary>
                  <div style="padding: 0 12px 12px 12px; font-size: 0.95rem; color: #475569; border-top: 1px dashed #cbd5e1; margin-top: 4px; padding-top: 8px;">
                    ${source.provenance_clue}
                  </div>
                </details>
              </div>
          `;
    });
    htmlPrimary += `
            </div>
            <div style="padding: 15px 20px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <h3 style="margin: 0; color: #0f172a; font-size: 1.15rem; font-family: 'Playfair Display', serif;">
                How useful are Sources A and B for an enquiry into ${lesson.utility_starters.enquiry}? (8 marks)
              </h3>
            </div>
          </div>
        `;
  }

  if (lesson.do_now && lesson.do_now.type === 'timeline' && lesson.do_now.events) {
    if (isTrip) {
      htmlDoNow += `
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 30px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
              <div style="padding: 20px;">
                <div style="margin-bottom: 20px; font-size: 1.2rem; color: #1e3a8a;"><strong>${lesson.do_now.prediction_question || ''}</strong></div>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: space-between;">
        `;
      lesson.do_now.events.forEach((ev, idx) => {
        htmlDoNow += `
            <div style="width: 45%; border: 2px solid #cbd5e1; border-radius: 8px; padding: 15px; background: #fff; box-shadow: 2px 2px 0px #94a3b8; margin-bottom: 15px;">
              <div style="font-weight: 800; color: #1e40af; font-size: 1.2rem; margin-bottom: 5px;"><i class="fa-regular fa-clock" style="margin-right: 6px;"></i>${ev.year}</div>
              <div style="font-weight: 600; color: #0f172a; margin-bottom: 8px;">${ev.title}</div>
              <div style="font-size: 0.95rem; color: #475569;">${ev.detail}</div>
              ${ev.img ? `<div style="text-align: center; margin-top: 15px;"><img src="${getAssetUrl(ev.img)}" style="max-width: 40%; border-radius: 4px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>` : ''}
            </div>
          `;
      });
      htmlDoNow += `</div></div></div>`;

      // Add Map Container
      const eventsWithLoc = lesson.do_now.events.filter((e) => e.lat && e.lng);
      if (eventsWithLoc.length > 0) {
        htmlDoNow += `
            <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 30px;">
              <div style="padding: 15px 20px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: bold; font-size: 1.1rem; color: #1e293b;">
                <i class="fa-solid fa-map-location-dot" style="color: #ef4444; margin-right: 8px;"></i> Interactive Trip Map
              </div>
              <div id="trip-map-container" style="height: 500px; width: 100%;"></div>
            </div>
          `;
      }
    } else {
      htmlDoNow += `
          <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
              <summary style="padding: 10px 15px; cursor: pointer; color: #0f172a; font-weight: bold; font-size: 1.05rem; background: #f8fafc; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
                <span style="display: flex; align-items: center; gap: 10px;">
                  <i class="fa-solid fa-clock-rotate-left" style="color: #3b82f6;"></i> Chronological Timeline
                  <span id="donow-timeline-timer-summary-badge" style="font-size: 0.8rem; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 12px; font-family: monospace;">05:00</span>
                </span>
                <i class="fa-solid fa-chevron-down" style="color: #64748b;"></i>
              </summary>
              <div style="padding: 20px;">
                ${renderDoNowTimerBarHTML('donow-timeline-timer')}
                ${
                  !isTrip &&
                  ((appStore && appStore.state && appStore.state.selectedUnitId) ||
                    window.currentUnitId)
                    ? `
                  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%); border: 1.5px solid #bfdbfe; border-radius: 8px; padding: 12px 18px; margin-bottom: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1rem; flex-shrink: 0; box-shadow: 0 2px 4px rgba(59,130,246,0.25);">
                        <i class="fa-solid fa-bolt"></i>
                      </div>
                      <div>
                        <div style="font-weight: 700; color: #1e3a8a; font-size: 0.95rem;">Retrieval Starter Drill</div>
                        <div style="font-size: 0.83rem; color: #64748b;">Consolidate prior learning with 3-Box Leitner spaced flashcards or a 10-min readiness check.</div>
                      </div>
                    </div>
                    ${getRetrievalStarterActions(lesson, (appStore && appStore.state && appStore.state.selectedUnitId) || window.currentUnitId || '')}
                  </div>
                `
                    : ''
                }
                <div style="margin-bottom: 20px; font-size: 1.1rem; color: #1e3a8a;"><strong>${lesson.do_now.prediction_question || ''}</strong></div>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: space-between;">
        `;
      lesson.do_now.events.forEach((ev, idx) => {
        htmlDoNow += `
            <div style="width: 45%; border: 2px solid #cbd5e1; border-radius: 8px; padding: 15px; background: #fff; box-shadow: 2px 2px 0px #94a3b8; margin-bottom: 15px;">
              <div style="font-weight: 800; color: #1e40af; font-size: 1.2rem; margin-bottom: 5px;">${ev.year}</div>
              <div style="font-weight: 600; color: #0f172a; margin-bottom: 8px;">${ev.title}</div>
              <div style="font-size: 0.95rem; color: #475569;">${ev.detail}</div>
              ${ev.img ? `<div style="text-align: center; margin-top: 15px;"><img src="${getAssetUrl(ev.img)}" style="max-width: 40%; border-radius: 4px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>` : ''}
            </div>
          `;
      });
      htmlDoNow += `</div></div></details>`;
    }
  } else if (
    lesson.do_now &&
    (lesson.do_now.items || lesson.do_now.questions || lesson.do_now.tasks)
  ) {
    try {
      const taught = JSON.parse(localStorage.getItem('taughtUnits') || '[]');
      if (taught.length > 0 && window.KNOWLEDGE_BANK) {
        const rawItems =
          lesson.do_now.items || lesson.do_now.questions || lesson.do_now.tasks || [];
        rawItems.forEach((item) => {
          if (item && item.question && item.question.includes('PAST TOPIC:')) {
            const unit = taught[Math.floor(Math.random() * taught.length)];
            const bank = window.KNOWLEDGE_BANK[unit];
            if (bank && bank.length > 0) {
              const randQ = bank[Math.floor(Math.random() * bank.length)];
              item.question = 'PAST TOPIC: ' + randQ.question;
              item.answer = randQ.answer;
            }
          }
        });
      }
    } catch (e) {
      console.error(e);
    }

    const currentUnitId =
      (appStore && appStore.state && appStore.state.selectedUnitId) || window.currentUnitId || '';
    const showQuizzing = !isTrip && currentUnitId;

    htmlDoNow += `
        <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
            <summary style="padding: 10px 15px; cursor: pointer; color: #0f172a; font-weight: bold; font-size: 1.05rem; background: #f8fafc; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
              <span style="display: flex; align-items: center; gap: 10px;">
                <i class="fa-solid fa-list-check" style="color: #3b82f6;"></i> Do Now Tasks
                <span id="donow-timer-summary-badge" style="font-size: 0.8rem; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 12px; font-family: monospace;">05:00</span>
              </span>
              <div>
                <button class="btn btn-secondary" data-action="toggle-all-answers" onclick="if(window.toggleAllAnswers){window.toggleAllAnswers(this);}event.stopPropagation();" style="font-size: 0.9rem; padding: 4px 10px; margin-right: 10px;"><i class="fa-solid fa-eye"></i> Reveal All</button>
                <i class="fa-solid fa-chevron-down" style="color: #64748b;"></i>
              </div>
            </summary>
            <div class="do-now-grid" style="padding: 14px 18px; display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 10px;">
              ${renderDoNowTimerBarHTML('donow-timer')}
              ${
                showQuizzing
                  ? `
                <div style="grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%); border: 1.5px solid #bfdbfe; border-radius: 8px; padding: 8px 14px; margin-bottom: 2px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 30px; height: 30px; border-radius: 6px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.9rem; flex-shrink: 0; box-shadow: 0 2px 4px rgba(59,130,246,0.25);">
                      <i class="fa-solid fa-bolt"></i>
                    </div>
                    <div>
                      <div style="font-weight: 700; color: #1e3a8a; font-size: 0.9rem;">Retrieval Starter Drill</div>
                      <div style="font-size: 0.8rem; color: #64748b;">Consolidate prior learning with 3-Box Leitner spaced flashcards or a 10-min readiness check.</div>
                    </div>
                  </div>
                  ${getRetrievalStarterActions(lesson, currentUnitId)}
                </div>
              `
                  : ''
              }
      `;
    const doNowItems = lesson.do_now.items || lesson.do_now.questions || lesson.do_now.tasks || [];
    doNowItems.forEach((item, index) => {
      let qText = item.question || item.q || item.event || '';
      let aText = item.answer || item.a || item.year || '';
      if (typeof qText !== 'string') qText = String(qText);
      if (typeof aText !== 'string') aText = String(aText);
      if (window.currentUnitId) {
        qText = qText.replace(/src=['"]assets\//g, `src="/units/${window.currentUnitId}/assets/`);
        aText = aText.replace(/src=['"]assets\//g, `src="/units/${window.currentUnitId}/assets/`);
      }
      const cardId = `donow-card-${index}`;
      htmlDoNow += `
          <div class="do-now-card" id="do-now-card-${index}" data-action="toggle-element" data-target-id="${cardId}" style="cursor: pointer;">
            <div style="display: flex; gap: 8px; align-items: flex-start;">
              <span style="font-weight: 800; color: #0369a1; background: #e0f2fe; padding: 2px 7px; border-radius: 4px; font-size: 0.85rem; line-height: 1.2; flex-shrink: 0;">${index + 1}</span>
              <div style="font-size: 0.9rem; line-height: 1.35; color: #1e293b; font-weight: 500;">${qText}</div>
            </div>
            <div class="answer" id="${cardId}" style="display: none; margin-top: 8px; padding: 8px 10px; background: #f8fafc; border-left: 3px solid #3b82f6; border-radius: 4px; font-size: 0.85rem; line-height: 1.35; color: #1e3a8a; font-weight: 600;">${aText}</div>
          </div>
        `;
    });
    htmlDoNow += `</div></details>`;
  }

  const hasVocab = lesson.vocab && lesson.vocab.length > 0;
  if (hasVocab) {
    htmlDoNow += `
        <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
            <summary style="padding: 10px 15px; cursor: pointer; color: #b45309; font-weight: bold; font-size: 1.05rem; background: #fffbeb; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
              <span><i class="fa-solid fa-spell-check" style="color: #b45309; margin-right: 10px;"></i> Key Vocabulary</span>
              <i class="fa-solid fa-chevron-down" style="color: #64748b;"></i>
            </summary>
            <div style="padding: 20px;">
              <p style="color: #475569; margin-bottom: 20px; font-size: 1.1rem;"><strong>Vocabulary Practice:</strong> Tap a term on the left, then tap its matching definition on the right to master the key vocabulary.</p>
              <div id="vocab-match-game" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="match-terms" style="display: flex; flex-direction: column; gap: 10px;">
      `;

    lesson.vocab.forEach((v, idx) => {
      htmlDoNow += `<button class="btn btn-secondary match-term-btn" data-idx="${idx}" style="text-align: left; padding: 15px; font-weight: bold; border-width: 2px; cursor: pointer; transition: all 0.2s;">${v.term}</button>`;
    });

    htmlDoNow += `</div><div class="match-defs" style="display: flex; flex-direction: column; gap: 10px;">`;

    let defs = lesson.vocab.map((v, idx) => ({ def: v.definition || v.def || '', idx: idx }));
    defs.sort(() => Math.random() - 0.5);

    defs.forEach((d) => {
      htmlDoNow += `<button class="btn btn-secondary match-def-btn" data-idx="${d.idx}" style="text-align: left; padding: 15px; font-weight: normal; border-width: 2px; cursor: pointer; transition: all 0.2s;">${d.def}</button>`;
    });

    htmlDoNow += `
                </div>
              </div>
              <div id="unlock-success" style="display: none; margin-top: 20px; padding: 15px; background: #ecfdf5; border: 2px solid #10b981; border-radius: 8px; color: #047857; font-weight: bold; text-align: center; font-size: 1.2rem;">
                <i class="fa-solid fa-star"></i> Vocabulary Mastered!
              </div>
    `;

    // Rotating cognitive vocabulary challenge widget
    let currentLessonIdx = 0;
    if (typeof unitData !== 'undefined' && unitData && Array.isArray(unitData.lessons)) {
      currentLessonIdx = unitData.lessons.findIndex((l) =>
        l.id && lesson.id ? l.id === lesson.id : l.title === lesson.title,
      );
      if (currentLessonIdx === -1) currentLessonIdx = 0;
    }
    const currentUnitId =
      (appStore && appStore.state && appStore.state.currentUnitId) || window.currentUnitId || '';
    const pageAnchor = getWorkbookPageAnchor(currentUnitId, lesson, currentLessonIdx);
    const vocabStyle = currentLessonIdx % 4;
    const vocabTermsList = lesson.vocab.map((v) => (v.term || '').trim()).filter(Boolean);

    const wbAnchorBadge = pageAnchor
      ? `<span class="wb-page-pill" style="font-size: 0.8rem; font-weight: 700; color: #0369a1; background: #e0f2fe; border: 1px solid #bae6fd; padding: 3px 8px; border-radius: 6px; display: inline-flex; align-items: center; gap: 5px;" title="Corresponding page in printed pupil workbook"><i class="fa-solid fa-book-open"></i> ${pageAnchor.label}</span>`
      : '';

    const wbDrillBtnHtml = `
      <div style="display: flex; align-items: center; gap: 8px;">
        ${wbAnchorBadge}
        <button type="button" class="btn btn-secondary" data-action="open-vocab-whiteboard" style="font-size: 0.82rem; padding: 4px 10px; background: #eff6ff; color: #1e40af; border: 1.5px solid #bfdbfe; border-radius: 6px; cursor: pointer; font-weight: 600; display: inline-flex; align-items: center; gap: 5px; transition: all 0.15s ease;" title="Project this vocabulary challenge on the classroom smartboard">
          <i class="fa-solid fa-chalkboard-user"></i> Starter Drill
        </button>
      </div>
    `;

    if (vocabStyle === 0) {
      // Style 0: The Odd One Out
      const oddExemplars = getOddOneOutExemplars(lesson, vocabTermsList);
      htmlDoNow += `
        <div id="vocab-cognitive-challenge" style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 700; color: #1e3a8a; font-size: 1.05rem;">
                <i class="fa-solid fa-shapes" style="color: #3b82f6; margin-right: 6px;"></i> Vocabulary Challenge: The Odd One Out
              </span>
              <span style="font-size: 0.8rem; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 12px; font-weight: 600;">Conceptual Categorisation</span>
            </div>
            ${wbDrillBtnHtml}
          </div>
          <p style="color: #475569; font-size: 0.95rem; margin-bottom: 12px; line-height: 1.5;">
            Click <strong>ONE</strong> term that does not belong with the others.<br>
            <strong>Explain your reasoning:</strong> What historical connection links the other terms, and why is your chosen term different?
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px;">
            ${vocabTermsList
              .map(
                (t) =>
                  `<button type="button" class="btn btn-secondary odd-term-btn" onclick="document.querySelectorAll('.odd-term-btn').forEach(b=>{b.style.borderColor='#cbd5e1'; b.style.backgroundColor='#ffffff';}); this.style.borderColor='#2563eb'; this.style.backgroundColor='#eff6ff'; document.getElementById('odd-choice').value='${t.replace(/'/g, "\\'")}'; document.getElementById('odd-reasoning-box').style.display='block';" style="padding: 6px 14px; font-size: 0.9rem; border-radius: 20px; border: 2px solid #cbd5e1; font-weight: 600; cursor: pointer; transition: all 0.2s; background: #ffffff; color: #1e293b;">${t}</button>`,
              )
              .join('')}
          </div>
          <input type="hidden" id="odd-choice" value="">
          <div id="odd-reasoning-box" style="display: none; margin-top: 10px;">
            <textarea placeholder="Explain your historical reasoning: Why is your chosen word the 'Odd One Out' compared to the others?" style="width: 100%; min-height: 70px; padding: 10px; border-radius: 6px; border: 1.5px solid #94a3b8; font-family: inherit; font-size: 0.95rem; box-sizing: border-box;"></textarea>
            <div style="margin-top: 8px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <button type="button" class="btn btn-primary" onclick="this.parentElement.nextElementSibling.style.display='block'; this.style.display='none';" style="font-size: 0.9rem; padding: 6px 14px; background: #1e40af; color: white; border: none; border-radius: 6px; cursor: pointer;">
                <i class="fa-solid fa-check"></i> Submit Justification
              </button>
              <button type="button" class="btn btn-secondary" onclick="const box = document.getElementById('odd-model-box'); const isVis = box.style.display === 'block'; box.style.display = isVis ? 'none' : 'block'; this.innerHTML = isVis ? '<i class=\\'fa-solid fa-eye\\'></i> Show Model Debates' : '<i class=\\'fa-solid fa-eye-slash\\'></i> Hide Model Debates';" style="font-size: 0.9rem; padding: 6px 14px; background: #ffffff; color: #92400e; border: 1.5px solid #fde68a; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.2s;">
                <i class="fa-solid fa-eye"></i> Show Model Debates
              </button>
            </div>
            <div style="display: none; margin-top: 10px; padding: 12px; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 6px; color: #166534; font-size: 0.95rem;">
              <strong>Historical Reflection:</strong> Compare your chosen word and reasoning with a partner! Can they challenge your historical link or offer an alternative Odd One Out?
            </div>
            <div id="odd-model-box" style="display: none; margin-top: 10px; padding: 14px 16px; background: #fefce8; border: 1.5px solid #facc15; border-radius: 8px; color: #713f12; font-size: 0.95rem; line-height: 1.6; box-shadow: 0 2px 8px rgba(234, 179, 8, 0.15);">
              <div style="font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; color: #854d0e;">
                <span><i class="fa-solid fa-star" style="color: #eab308;"></i> High-Tariff Discussion Exemplars:</span>
                <span style="font-size: 0.75rem; background: #fef08a; padding: 2px 8px; border-radius: 10px; text-transform: uppercase;">Teacher Debrief Guide</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${oddExemplars
                  .map(
                    (ex, idx) => `
                  <div style="background: #ffffff; border: 1px solid #fde047; border-radius: 6px; padding: 10px 14px;">
                    <div style="font-size: 0.8rem; font-weight: 800; color: #b45309; text-transform: uppercase;">
                      Option ${String.fromCharCode(65 + idx)}: ${ex.title || 'Historical Link'}
                    </div>
                    <div style="font-size: 0.92rem; color: #1e293b; margin: 3px 0;">
                      <strong>Trio:</strong> ${Array.isArray(ex.trio) ? ex.trio.join(', ') : ex.trio} · <strong>Odd One Out:</strong> <span style="color: #b91c1c; font-weight: 700; background: #fee2e2; padding: 1px 6px; border-radius: 4px;">${ex.odd}</span>
                    </div>
                    <div style="font-size: 0.88rem; color: #334155;">
                      <strong>Why:</strong> ${ex.reason}
                    </div>
                  </div>
                `,
                  )
                  .join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (vocabStyle === 1) {
      // Style 1: The Golden Sentence (Connect Two)
      const goldenExemplar = getGoldenSentenceExemplar(lesson, vocabTermsList);
      htmlDoNow += `
        <div id="vocab-cognitive-challenge" style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 700; color: #1e3a8a; font-size: 1.05rem;">
                <i class="fa-solid fa-pen-fancy" style="color: #3b82f6; margin-right: 6px;"></i> Vocabulary Challenge: The Golden Sentence
              </span>
              <span style="font-size: 0.8rem; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 12px; font-weight: 600;">Syntactic Precision</span>
            </div>
            ${wbDrillBtnHtml}
          </div>
          <p style="color: #475569; font-size: 0.95rem; margin-bottom: 12px;">
            Choose <strong>TWO</strong> terms from the word bank below. Write <strong>ONE</strong> single, grammatically sophisticated historical sentence connecting them using a causal conjunction (<strong>because</strong>, <strong>although</strong>, or <strong>consequently</strong>):
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; background: #f8fafc; padding: 10px; border-radius: 6px; border: 1px solid #e2e8f0;">
            ${vocabTermsList
              .map(
                (t) =>
                  `<span style="background: #ffffff; border: 1px solid #cbd5e1; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600; color: #1e293b;">${t}</span>`,
              )
              .join('')}
          </div>
          <textarea id="golden-sentence-input" placeholder="Write your Golden Sentence here using because, although, or consequently..." style="width: 100%; min-height: 70px; padding: 10px; border-radius: 6px; border: 1.5px solid #94a3b8; font-family: inherit; font-size: 0.95rem; box-sizing: border-box;"></textarea>
          <div style="margin-top: 8px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <button type="button" class="btn btn-primary" onclick="const val = (document.getElementById('golden-sentence-input').value || '').toLowerCase(); const feedback = document.getElementById('golden-feedback'); feedback.style.display='block'; if (val.includes('because') || val.includes('although') || val.includes('consequently')) { feedback.style.background='#f0fdf4'; feedback.style.borderColor='#86efac'; feedback.style.color='#166534'; feedback.innerHTML='<strong>Excellent Syntactic Construction!</strong> You successfully deployed a causal conjunction to establish a sophisticated historical link.'; } else { feedback.style.background='#fffbeb'; feedback.style.borderColor='#fde68a'; feedback.style.color='#92400e'; feedback.innerHTML='<strong>Tip:</strong> Ensure you include one of the target causal conjunctions: <em>because</em>, <em>although</em>, or <em>consequently</em> to elevate your sentence.'; }" style="font-size: 0.9rem; padding: 6px 14px; background: #1e40af; color: white; border: none; border-radius: 6px; cursor: pointer;">
              <i class="fa-solid fa-sparkles"></i> Check Sentence
            </button>
            <button type="button" class="btn btn-secondary" onclick="const box = document.getElementById('golden-model-box'); const isVis = box.style.display === 'block'; box.style.display = isVis ? 'none' : 'block'; this.innerHTML = isVis ? '<i class=\\'fa-solid fa-eye\\'></i> Show Model Sentence' : '<i class=\\'fa-solid fa-eye-slash\\'></i> Hide Model Sentence';" style="font-size: 0.9rem; padding: 6px 14px; background: #ffffff; color: #92400e; border: 1.5px solid #fde68a; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.2s;">
              <i class="fa-solid fa-eye"></i> Show Model Sentence
            </button>
          </div>
          <div id="golden-feedback" style="display: none; margin-top: 10px; padding: 12px; border: 1.5px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem;"></div>
          <div id="golden-model-box" style="display: none; margin-top: 10px; padding: 14px 16px; background: #fefce8; border: 1.5px solid #facc15; border-radius: 6px; color: #713f12; font-size: 0.95rem; line-height: 1.6; box-shadow: 0 2px 6px rgba(234, 179, 8, 0.15);">
            <div style="font-weight: 700; margin-bottom: 4px; display: flex; align-items: center; gap: 6px; color: #854d0e;">
              <i class="fa-solid fa-star" style="color: #eab308;"></i> Model Golden Sentence:
            </div>
            <div style="font-style: italic; font-family: 'Playfair Display', Georgia, serif; font-size: 1.05rem; color: #1e293b;">
              "${goldenExemplar}"
            </div>
            <div style="margin-top: 6px; font-size: 0.82rem; color: #a16207;">
              <strong>Teacher Note:</strong> Demonstrates syntactic embedding of two curriculum terms connected by a causal conjunction.
            </div>
          </div>
        </div>
      `;
    } else if (vocabStyle === 2) {
      // Style 2: Conceptual Binary Sort
      htmlDoNow += `
        <div id="vocab-cognitive-challenge" style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 700; color: #1e3a8a; font-size: 1.05rem;">
                <i class="fa-solid fa-layer-group" style="color: #3b82f6; margin-right: 6px;"></i> Vocabulary Challenge: Conceptual Classification
              </span>
              <span style="font-size: 0.8rem; background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 12px; font-weight: 600;">Conceptual Sorting</span>
            </div>
            ${wbDrillBtnHtml}
          </div>
          <p style="color: #475569; font-size: 0.95rem; margin-bottom: 12px;">
            Click on each term below to sort it into <strong>Power, Governance & Warfare</strong> or <strong>Economy, Trade & Society</strong>:
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px;">
            <div id="sort-cat-power" style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 8px; padding: 12px; min-height: 120px;">
              <div style="font-weight: bold; color: #1e3a8a; font-size: 0.95rem; border-bottom: 1.5px solid #bfdbfe; padding-bottom: 6px; margin-bottom: 10px; text-align: center;">
                Power, Governance & Warfare
              </div>
              <div class="sort-bucket-items" style="display: flex; flex-direction: column; gap: 6px;"></div>
            </div>
            <div id="sort-cat-economy" style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 8px; padding: 12px; min-height: 120px;">
              <div style="font-weight: bold; color: #166534; font-size: 0.95rem; border-bottom: 1.5px solid #bbf7d0; padding-bottom: 6px; margin-bottom: 10px; text-align: center;">
                Economy, Trade & Society
              </div>
              <div class="sort-bucket-items" style="display: flex; flex-direction: column; gap: 6px;"></div>
            </div>
          </div>
          <div id="sort-token-container" style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 8px;">
            ${vocabTermsList
              .map(
                (t) =>
                  `<button type="button" class="btn btn-secondary sort-token-btn" onclick="const b1 = document.querySelector('#sort-cat-power .sort-bucket-items'); const b2 = document.querySelector('#sort-cat-economy .sort-bucket-items'); const root = document.getElementById('sort-token-container'); if(this.dataset.assigned === 'power'){ this.dataset.assigned='economy'; b2.appendChild(this); this.style.background='#dcfce7'; this.style.borderColor='#86efac'; } else if(this.dataset.assigned === 'economy'){ this.dataset.assigned='unassigned'; root.appendChild(this); this.style.background='#ffffff'; this.style.borderColor='#94a3b8'; } else { this.dataset.assigned='power'; b1.appendChild(this); this.style.background='#dbeafe'; this.style.borderColor='#93c5fd'; }" data-assigned="unassigned" style="padding: 5px 12px; font-size: 0.85rem; border-radius: 12px; border: 1.5px solid #94a3b8; background: #ffffff; color: #1e293b; cursor: pointer; font-weight: 600; transition: all 0.2s;">${t} &rarr;</button>`,
              )
              .join('')}
          </div>
          <p style="font-size: 0.8rem; color: #64748b; margin-top: 8px; font-style: italic;">Click a term button to cycle it between Power (blue), Economy (green), and unassigned.</p>
        </div>
      `;
    } else if (vocabStyle === 3) {
      // Style 3: Spot the Deliberate Historical Error!
      const errorStatement = lesson.vocab_deliberate_error
        ? lesson.vocab_deliberate_error
        : `A modern historical commentator claimed that ${vocabTermsList[0] || 'the main concept'} and ${vocabTermsList[1] || 'the event'} were completely trivial, playing no role in shaping the political outcome of this era.`;

      htmlDoNow += `
        <div id="vocab-cognitive-challenge" style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 700; color: #1e3a8a; font-size: 1.05rem;">
                <i class="fa-solid fa-triangle-exclamation" style="color: #ef4444; margin-right: 6px;"></i> Vocabulary Challenge: Spot the Deliberate Error!
              </span>
              <span style="font-size: 0.8rem; background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 12px; font-weight: 600;">Critical Reading</span>
            </div>
            ${wbDrillBtnHtml}
          </div>
          <p style="color: #475569; font-size: 0.95rem; margin-bottom: 12px;">
            The statement below contains a <strong>deliberate historical misconception</strong>. Identify the false claim and write the accurate historical correction below:
          </p>
          <div style="border-left: 4px solid #ef4444; background: #fef2f2; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 12px; font-size: 0.95rem; line-height: 1.6; color: #7f1d1d; font-style: italic;">
            "${errorStatement}"
          </div>
          <textarea id="deliberate-correction-input" placeholder="Explain the historical misconception and provide the accurate historical reality using evidence from the lesson..." style="width: 100%; min-height: 70px; padding: 10px; border-radius: 6px; border: 1.5px solid #94a3b8; font-family: inherit; font-size: 0.95rem; box-sizing: border-box;"></textarea>
          <div style="margin-top: 8px;">
            <button type="button" class="btn btn-primary" onclick="document.getElementById('error-correction-feedback').style.display='block'; this.style.display='none';" style="font-size: 0.9rem; padding: 6px 14px; background: #dc2626; color: white; border: none; border-radius: 6px; cursor: pointer;">
              <i class="fa-solid fa-eye"></i> Reveal Historical Truth & Reflection
            </button>
          </div>
          <div id="error-correction-feedback" style="display: none; margin-top: 10px; padding: 12px; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 6px; color: #166534; font-size: 0.95rem; line-height: 1.5;">
            <strong>Historical Analysis:</strong> Historians must constantly interrogate statements for bias, oversimplification, and factual inaccuracies. Review your correction to ensure you contrasted the false claim with specific historical evidence from the lesson!
          </div>
        </div>
      `;
    }

    if (lesson.vocab_cloze_text && typeof lesson.vocab_cloze_text === 'string') {
      const vocabTerms = lesson.vocab.map((v) => (v.term || '').trim()).filter(Boolean);
      const shuffledOptions = [...vocabTerms].sort(() => Math.random() - 0.5);

      const clozeHtml = lesson.vocab_cloze_text.replace(/\[(.*?)\]/g, (match, term) => {
        const cleanTerm = term.trim();
        let options = `<option value="">-- select term --</option>`;
        shuffledOptions.forEach((opt) => {
          options += `<option value="${opt.replace(/"/g, '&quot;')}">${opt}</option>`;
        });
        return `<select class="cloze-blank-select" data-answer="${cleanTerm.replace(/"/g, '&quot;')}" style="display: inline-block; vertical-align: middle; padding: 4px 10px; margin: 2px 4px; font-family: inherit; font-size: 0.95rem; font-weight: 600; border: 2px solid #cbd5e1; border-radius: 6px; background-color: #ffffff; color: #1e293b; cursor: pointer; transition: all 0.2s; max-width: 100%;">${options}</select>`;
      });

      htmlDoNow += `
              <div id="vocab-cloze-challenge" style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
                <p style="color: #475569; margin-bottom: 12px; font-size: 1.05rem;">
                  <strong>Contextual Challenge:</strong> Complete the historical summary below by selecting the correct vocabulary term for each blank.
                </p>
                <div class="cloze-paragraph" style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 18px 20px; font-size: 1.05rem; line-height: 2.3; color: #1e293b;">
                  ${clozeHtml}
                </div>
                <div id="cloze-success" style="display: none; margin-top: 15px; padding: 12px; background: #ecfdf5; border: 2px solid #10b981; border-radius: 8px; color: #047857; font-weight: bold; text-align: center; font-size: 1.1rem;">
                  Cloze Challenge Mastered! All historical terms placed accurately in context.
                </div>
              </div>
      `;
    }

    htmlDoNow += `
            </div>
          </details>
      `;
  }

  // ==========================================
  // TAB 2: THE HISTORY
  // ==========================================
  htmlDoNow += ``;

  if (lesson.learning_objectives) {
    // Smart check: Only render overarching objective if it differs from the main lesson title
    let overarchingHtml = '';
    const cleanTitle = (lesson.title || '').replace(/^Lesson\\s*\\d+:\\s*/i, '').trim();
    const cleanObj =
      !Array.isArray(lesson.learning_objectives) && lesson.learning_objectives.overarching
        ? lesson.learning_objectives.overarching.trim()
        : '';
    if (cleanObj && cleanObj !== cleanTitle) {
      overarchingHtml = `
          <p style="font-size: 1.1rem; font-weight: 600; color: #1e3a8a; margin-bottom: 15px;">
            ${cleanObj}
          </p>
        `;
    }

    const scaffoldedObjs = Array.isArray(lesson.learning_objectives)
      ? lesson.learning_objectives
      : lesson.learning_objectives.scaffolded || [];

    htmlDoNow += `
        <div class="learning-objectives-card" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-top: 4px solid #10b981;">
          <h3 style="margin-top: 0; color: #0f172a; font-size: 1.2rem; display: flex; align-items: center; gap: 10px; margin-bottom: ${overarchingHtml ? '0' : '15px'};">
            <i class="fa-solid fa-bullseye" style="color: #10b981;"></i> Learning Objectives
          </h3>
          ${overarchingHtml}
          <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 1.05rem; line-height: 1.6;">
            ${scaffoldedObjs.map((obj) => `<li style="margin-bottom: 8px;">${obj}</li>`).join('')}
          </ul>
        </div>
      `;
  }

  let videos = [];
  if (lesson.video) {
    videos = videos.concat(Array.isArray(lesson.video) ? lesson.video : [lesson.video]);
  }
  if (lesson.extra_videos && Array.isArray(lesson.extra_videos)) {
    videos = videos.concat(lesson.extra_videos);
  }

  if (videos.length > 0) {
    htmlVideo = renderLessonVideos(videos, lesson, unitId);
  }

  if (lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {
    htmlNarrative += `
        <div class="phase-card">
      `;

    if (lesson.hook_text) {
      htmlNarrative += `
        <div class="historical-hook-card" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid #0284c7; border-radius: 8px; padding: 20px 24px; margin-bottom: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px; color: #0369a1; font-weight: 700; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.5px;">
            <i class="fa-solid fa-compass" style="color: #0284c7;"></i> The Big Picture &bull; Historical Context
          </div>
          <p style="margin: 0; font-size: 1.08rem; line-height: 1.7; color: #1e293b; font-style: italic; font-family: 'Georgia', serif;">
            "${lesson.hook_text}"
          </p>
        </div>
      `;
    }

    if (
      lesson.timeline_anchor &&
      Array.isArray(lesson.timeline_anchor) &&
      lesson.timeline_anchor.length > 0
    ) {
      htmlNarrative += `
        <details class="timeline-anchor-details" style="background: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #0284c7; border-radius: 8px; margin-bottom: 25px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); overflow: hidden;" open>
          <summary style="padding: 12px 18px; font-weight: 700; color: #0f172a; cursor: pointer; display: flex; align-items: center; justify-content: space-between; user-select: none; background: #f8fafc;">
            <span style="display: flex; align-items: center; gap: 10px; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.5px; color: #0369a1;">
              <i class="fa-solid fa-clock-rotate-left" style="color: #0284c7;"></i> Chronology Spine &bull; Key Milestones
            </span>
            <span style="font-size: 0.8rem; font-weight: 600; color: #64748b;">${lesson.timeline_anchor.length} Milestones</span>
          </summary>
          <div style="padding: 16px 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; background: #fff;">
            ${lesson.timeline_anchor
              .map(
                (anchor) => `
              <div style="position: relative; border-left: 2px solid #e2e8f0; padding-left: 12px;">
                <div style="position: absolute; left: -6px; top: 2px; width: 10px; height: 10px; border-radius: 50%; background: #0284c7;"></div>
                <div style="font-size: 0.75rem; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 0.5px;">${anchor.date}</div>
                <div style="font-weight: 700; font-size: 0.95rem; color: #1e293b; margin: 2px 0 4px 0;">${anchor.title}</div>
                <div style="font-size: 0.82rem; color: #64748b; line-height: 1.4;">${anchor.desc}</div>
              </div>
            `,
              )
              .join('')}
          </div>
        </details>
      `;
    }

    lesson.narrative_blocks.forEach((block, index) => {
      if (block.type === 'causal_diagram') {
        htmlNarrative += `
          <div class="causal-diagram-container" style="margin: 35px 0; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 25px; color: #f8fafc; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.25); border: 1px solid #334155;">
            <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">
              <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(14, 165, 233, 0.2); border: 1px solid #0ea5e9; color: #38bdf8; padding: 4px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                <i class="fa-solid fa-code-fork"></i> Interactive Causal Convergence
              </div>
              <h3 style="margin: 0; font-size: 1.5rem; font-family: 'Playfair Display', serif; color: #ffffff;">${block.title}</h3>
              <p style="margin: 8px auto 0 auto; max-width: 650px; font-size: 0.95rem; color: #94a3b8; font-style: italic;">"${block.lead}"</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 25px;">
              ${block.branches
                .map(
                  (b) => `
                <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-top: 4px solid ${b.color}; border-radius: 8px; padding: 14px; display: flex; flex-direction: column;">
                  <div style="font-weight: 700; font-size: 0.9rem; color: ${b.color}; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">${b.category}</div>
                  <ul style="margin: 0; padding-left: 18px; font-size: 0.84rem; line-height: 1.5; color: #cbd5e1; flex-grow: 1;">
                    ${b.steps.map((s) => `<li style="margin-bottom: 8px;">${s}</li>`).join('')}
                  </ul>
                  <div style="text-align: center; margin-top: 10px; color: ${b.color}; font-size: 1.1rem;">
                    <i class="fa-solid fa-arrow-down"></i>
                  </div>
                </div>
              `,
                )
                .join('')}
            </div>

            <div style="background: rgba(2, 132, 199, 0.15); border: 2px solid #0284c7; border-radius: 10px; padding: 18px 24px; text-align: center; max-width: 700px; margin: 0 auto; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.2);">
              <div style="font-size: 0.8rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Point of Causal Convergence &bull; ${block.convergence.date}</div>
              <div style="font-size: 1.25rem; font-weight: 800; color: #ffffff; margin-bottom: 6px; font-family: 'Playfair Display', serif;">${block.convergence.title}</div>
              <p style="margin: 0; font-size: 0.92rem; line-height: 1.5; color: #e2e8f0;">${block.convergence.desc}</p>
            </div>
          </div>
        `;
        return;
      }

      if (block.type === 'interactive_map') {
        htmlNarrative += `
            <div class="interactive-map-container" style="margin: 30px 0; background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h3 style="margin-top: 0; color: #1e293b; font-family: 'Playfair Display', serif;"><i class="fa-solid fa-map-location-dot"></i> Interactive Historical Map</h3>
              <div class="map-img-wrapper" style="position: relative; height: 500px; width: 100%; display: flex; justify-content: center; align-items: center; overflow: hidden; margin-bottom: 20px; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0;">
          `;

        block.maps.forEach((m, idx) => {
          htmlNarrative += `<img src="${getAssetUrl(m.src)}" id="map-img-${m.id}" data-action="open-modal" data-src="${getAssetUrl(m.src)}" alt="${m.label}" style="position: absolute; max-width: 100%; max-height: 100%; object-fit: contain; opacity: ${idx === 0 ? '1' : '0'}; pointer-events: ${idx === 0 ? 'auto' : 'none'}; transition: opacity 0.6s ease-in-out; border-radius: 6px; cursor: zoom-in;" title="Click to enlarge map">`;
        });

        htmlNarrative += `
              </div>
              <div id="map-caption-display" style="font-size: 1.1rem; font-style: italic; color: #334155; min-height: 3em; margin-bottom: 20px;">${block.maps[0].caption}</div>
              <div class="map-controls" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
          `;

        block.maps.forEach((m, idx) => {
          const activeClass = idx === 0 ? 'active-map-btn' : '';
          const activeStyle =
            idx === 0
              ? 'background-color: #1e40af; color: #ffffff; border: 1px solid #1e40af;'
              : 'background-color: #f1f5f9; color: #334155; border: 1px solid #cbd5e1;';
          htmlNarrative += `
                <button class="btn btn-secondary map-toggle-btn ${activeClass}" data-map-id="${m.id}" data-caption="${m.caption.replace(/"/g, '&quot;')}" data-action="toggle-map" style="border-radius: 30px; padding: 8px 18px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; ${activeStyle}">
                  ${m.year} ${m.label}
                </button>
            `;
        });

        htmlNarrative += `
              </div>
            </div>
          `;
        return;
      }

      if (block.type === 'photo_slider') {
        const sliderId = 'slider-' + Math.random().toString(36).substr(2, 9);
        const hasSat = !!block.satellite_image;
        htmlNarrative += `
            <div class="photo-slider-container" id="${sliderId}-container" style="margin: 32px 0; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 24px; text-align: center; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
              <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 6px;">
                <span class="archival-meta-tag" style="background: #e0e7ff; color: #3730a3; padding: 3px 10px; border-radius: 4px; font-weight: 700; font-size: 0.72rem; letter-spacing: 0.05em; text-transform: uppercase;">${block.tag || 'Cartographic Analysis'}</span>
              </div>
              <h3 style="margin: 6px 0 10px 0; color: #0f172a; font-family: 'Playfair Display', Georgia, serif; font-size: 1.45rem;">
                <i class="fa-solid fa-map-location-dot" style="margin-right: 8px; color: #1e3a8a;"></i> ${block.title || 'Then & Now: Map Slider'}
              </h3>
              ${block.description ? `<p style="font-size: 0.92rem; color: #475569; margin: 0 auto 16px auto; max-width: 760px; line-height: 1.5;">${block.description}</p>` : ''}
              
              ${
                hasSat
                  ? `
              <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 14px;">
                <button type="button" class="btn btn-sm" id="${sliderId}-btn-street" onclick="
                  const container = document.getElementById('${sliderId}-container');
                  const baseImg = container.querySelector('.slider-base-img');
                  baseImg.src = '${getAssetUrl(block.after_image)}';
                  container.querySelector('#${sliderId}-after-text').innerHTML = '${block.after_label || 'Modern Street Map'} <i class=\\'fa-solid fa-arrow-right\\' style=\\'margin-left: 4px;\\'></i>';
                  this.style.background = '#1e3a8a'; this.style.color = '#fff';
                  document.getElementById('${sliderId}-btn-sat').style.background = '#f1f5f9';
                  document.getElementById('${sliderId}-btn-sat').style.color = '#475569';
                " style="padding: 6px 14px; font-size: 0.82rem; font-weight: 700; border-radius: 6px; background: #1e3a8a; color: #ffffff; border: 1px solid #1e3a8a; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s;">
                  <i class="fa-solid fa-road"></i> Modern Street Map
                </button>
                <button type="button" class="btn btn-sm" id="${sliderId}-btn-sat" onclick="
                  const container = document.getElementById('${sliderId}-container');
                  const baseImg = container.querySelector('.slider-base-img');
                  baseImg.src = '${getAssetUrl(block.satellite_image)}';
                  container.querySelector('#${sliderId}-after-text').innerHTML = '${block.satellite_label || 'Modern Satellite Aerial'} <i class=\\'fa-solid fa-arrow-right\\' style=\\'margin-left: 4px;\\'></i>';
                  this.style.background = '#1e3a8a'; this.style.color = '#fff';
                  document.getElementById('${sliderId}-btn-street').style.background = '#f1f5f9';
                  document.getElementById('${sliderId}-btn-street').style.color = '#475569';
                " style="padding: 6px 14px; font-size: 0.82rem; font-weight: 700; border-radius: 6px; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s;">
                  <i class="fa-solid fa-satellite"></i> Satellite Aerial Photo
                </button>
              </div>`
                  : ''
              }

              <!-- Viewport -->
              <div style="position: relative; width: 100%; max-width: 720px; aspect-ratio: ${block.aspect_ratio || '1 / 1'}; margin: 0 auto; overflow: hidden; border-radius: 10px; border: 2px solid #94a3b8; background: #0f172a; box-shadow: 0 4px 14px rgba(0,0,0,0.18); user-select: none;">
                <!-- After (Base) Image -->
                <img class="slider-base-img" src="${getAssetUrl(block.after_image)}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: ${block.object_fit || 'cover'}; pointer-events: none;" alt="${block.after_label || 'After'}">
                
                <!-- Before (Top) Image clipped -->
                <img class="slider-before-img" src="${getAssetUrl(block.before_image)}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: ${block.object_fit || 'cover'}; pointer-events: none; clip-path: inset(0 50% 0 0); -webkit-clip-path: inset(0 50% 0 0);" alt="${block.before_label || 'Before'}">
                
                <!-- Center Divider Line -->
                <div class="slider-divider" style="position: absolute; top: 0; bottom: 0; left: 50%; width: 3px; background: #2563eb; box-shadow: 0 0 10px rgba(0,0,0,0.6); pointer-events: none; z-index: 2;"></div>

                <!-- Slider Handle Visual -->
                <div class="slider-handle" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 44px; height: 44px; background: #ffffff; border: 2.5px solid #2563eb; border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: 0 3px 12px rgba(0,0,0,0.45); pointer-events: none; z-index: 3;">
                  <i class="fa-solid fa-arrows-left-right" style="color: #2563eb; font-size: 15px;"></i>
                </div>

                <!-- Invisible Range Input covering entire viewport -->
                <input type="range" min="0" max="100" value="50" class="photo-range-slider" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: ew-resize; z-index: 4; margin: 0; padding: 0;" oninput="
                  const p = this.parentElement;
                  const before = p.querySelector('.slider-before-img');
                  const div = p.querySelector('.slider-divider');
                  const h = p.querySelector('.slider-handle');
                  const v = this.value;
                  before.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
                  before.style.webkitClipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
                  div.style.left = v + '%';
                  h.style.left = v + '%';
                ">
              </div>

              <!-- Labels Bar -->
              <div style="display: flex; justify-content: space-between; max-width: 720px; margin: 12px auto 0 auto; color: #1e293b; font-size: 0.88rem; font-weight: 700;">
                <span style="color: #1e3a8a;"><i class="fa-solid fa-arrow-left" style="margin-right: 4px;"></i> ${block.before_label || 'Before'}</span>
                <span id="${sliderId}-after-text" style="color: #0f172a;">${block.after_label || 'After'} <i class="fa-solid fa-arrow-right" style="margin-left: 4px;"></i></span>
              </div>

              ${
                block.links && block.links.length
                  ? `
              <div style="margin-top: 16px; padding-top: 14px; border-top: 1px dashed #cbd5e1; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                ${block.links
                  .map(
                    (l) => `
                  <a href="${l.url}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.82rem; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 6px 12px; border-radius: 6px; text-decoration: none; transition: all 0.15s ease;" onmouseover="this.style.background='#dbeafe';" onmouseout="this.style.background='#eff6ff';">
                    <i class="${l.icon || 'fa-solid fa-arrow-up-right-from-square'}"></i> ${l.label}
                  </a>
                `,
                  )
                  .join('')}
              </div>`
                  : ''
              }
            </div>
          `;
        return;
      }

      if (block.type === 'flip_card_gallery') {
        const searchId = 'search-cards-' + Math.random().toString(36).substr(2, 9);

        htmlNarrative += `
            <div class="flip-card-gallery-wrapper" style="margin: 40px 0; background: #1e293b; border: 2px solid #0f172a; border-radius: 12px; padding: 25px; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);">
              <h3 style="margin-top: 0; color: #f8fafc; font-family: 'Playfair Display', serif; text-align: center; border-bottom: 1px solid #475569; padding-bottom: 15px; margin-bottom: 20px;">
                <i class="fa-solid fa-users-viewfinder"></i> The Fallen
              </h3>
              ${
                block.cards && block.cards.length > 10
                  ? `
              <div style="text-align: center; margin-bottom: 30px;">
                <input type="text" id="${searchId}" placeholder="Search names..." onkeyup="
                  const filter = this.value.toUpperCase();
                  const gallery = this.parentElement.nextElementSibling;
                  const cards = gallery.getElementsByClassName('flip-card-wrapper');
                  for (let i = 0; i < cards.length; i++) {
                    const name = cards[i].getAttribute('data-name');
                    if (name.toUpperCase().indexOf(filter) > -1) {
                      cards[i].style.display = '';
                    } else {
                      cards[i].style.display = 'none';
                    }
                  }
                " style="padding: 12px 20px; width: 80%; max-width: 400px; border-radius: 25px; border: 1px solid #334155; background: #0f172a; color: white; outline: none; font-size: 1.1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
              </div>`
                  : ''
              }
              
              <div class="flip-card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px;">
          `;

        if (block.cards && Array.isArray(block.cards)) {
          block.cards.forEach((card) => {
            htmlNarrative += `
                <div class="flip-card-wrapper" data-name="${card.name.replace(/"/g, '&quot;')}" style="background-color: transparent; height: 350px; perspective: 1000px; cursor: pointer;" data-action="flip-card">
                  <div class="flip-card-inner" style="position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.8s; transform-style: preserve-3d;">
                    
                    <!-- Front of card -->
                    <div class="flip-card-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background-color: #334155; color: white; border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.4); border: 1px solid #475569;">
                      <h4 style="margin: 0 0 15px 0; font-size: 1.4rem; font-family: 'Playfair Display', serif; color: #f8fafc; border-bottom: 2px solid #1e293b; padding-bottom: 10px; width: 100%;">${card.name}</h4>
                      <p style="font-size: 1.05rem; font-style: italic; color: #cbd5e1; margin: 0;">${card.background}</p>
                      <div style="margin-top: auto; color: #94a3b8; font-size: 0.85rem;"><i class="fa-solid fa-hand-pointer"></i> Tap to flip</div>
                    </div>
                    
                    <!-- Back of card -->
                    <div class="flip-card-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background-color: #0f172a; color: white; transform: rotateY(180deg); border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); border: 2px solid #065f46; overflow-y: auto;">
                      <i class="fa-solid fa-cross" style="color: #059669; font-size: 2rem; margin-bottom: 15px;"></i>
                      <p style="font-size: 1rem; line-height: 1.5; color: #e2e8f0; margin: 0;">${card.story}</p>
                    </div>
                    
                  </div>
                </div>
              `;
          });
        }

        htmlNarrative += `
              </div>
            </div>
          `;
        return;
      }

      const bg = index % 2 === 0 ? '#ffffff' : '#f0f9ff';

      if (typeof block.text === 'string' && block.text.match(/^\[Key Individual:\s*(.+)\]$/i)) {
        const kiMatch = block.text.match(/^\[Key Individual:\s*(.+)\]$/i);
        const personName = kiMatch[1].trim();
        let person = null;
        if (window.db && window.currentUnitId) {
          const unitDb = window.db[window.currentUnitId];
          person = unitDb.data?.key_individuals?.find((p) =>
            p.name.toLowerCase().includes(personName.toLowerCase()),
          );
          if (!person)
            person = unitDb.biographies?.find((p) =>
              p.name.toLowerCase().includes(personName.toLowerCase()),
            );
        }
        if (
          !person &&
          typeof appStore !== 'undefined' &&
          appStore?.state?.activeUnitData?.key_individuals
        ) {
          person = appStore.state.activeUnitData.key_individuals.find((p) =>
            p.name.toLowerCase().includes(personName.toLowerCase()),
          );
        }
        if (person) {
          const cardHtml = generateKeyIndividualEmbedHTML
            ? generateKeyIndividualEmbedHTML(person)
            : `<div>${person.name}</div>`;
          htmlNarrative += `
               <div class="key-individual-embed" style="margin-bottom: 25px;">
                 ${cardHtml}
               </div>
             `;
          if (block.tasks && block.tasks.length > 0) {
            htmlNarrative += `<div class="embedded-tasks-container" style="margin-bottom: 25px; padding: 15px; background: #fffbeb; border: 2px dashed #fcd34d; border-radius: 6px;">`;
            block.tasks.forEach((task) => {
              if (task.type === 'two_sided_argument') {
                const qNumPrefix = task.qNum ? `Q${task.qNum}. ` : '';
                const adv = task.advancement || {};
                const lim = task.limitations || {};
                const advTitle = adv.title || 'Advancement & Progress (Change)';
                const limTitle = lim.title || 'Critical Limitations & Stagnation (Continuity)';
                const advPoints = adv.points || [];
                const limPoints = lim.points || [];
                const advStarter = adv.starter || adv.sentence_starter || '';
                const limStarter = lim.starter || lim.sentence_starter || '';
                const synthesisPrompt =
                  task.synthesis_prompt ||
                  'Write a balanced GCSE exam paragraph evaluating both sides.';
                const connectives = task.synthesis_connectives || [
                  'Although...',
                  'However, in practical terms...',
                  'Consequently...',
                  'Overall...',
                ];
                const modelAnswer = task.model_answer || task.model || '';

                htmlNarrative += `
                  <div class="task-box two-sided-argument-interactive" style="margin-bottom: 16px; background: #ffffff; padding: 16px; border-radius: 8px; border: 2px solid #0f766e; box-shadow: 0 3px 10px rgba(15, 118, 110, 0.08);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ccfbf1; padding-bottom: 8px;">
                      <h4 style="margin: 0; color: #0f766e; font-size: 1.1rem;"><i class="fa-solid fa-scale-balanced" style="margin-right: 8px;"></i> ${qNumPrefix}${task.topic || task.text || 'Two-Sided Argument Analysis'}</h4>
                      <span style="background: #0f766e; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">GCSE Two-Sided Argument</span>
                    </div>
                    ${task.instruction ? `<p style="font-size: 0.95rem; color: #475569; font-style: italic; margin-top: 0; margin-bottom: 14px;">${task.instruction}</p>` : ''}
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 14px;">
                      <!-- Side 1: Advancement / Progress -->
                      <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 6px; padding: 12px;">
                        <h5 style="margin: 0 0 8px 0; color: #166534; font-size: 0.95rem; border-bottom: 1.5px solid #86efac; padding-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                          <i class="fa-solid fa-arrow-trend-up"></i> ${advTitle}
                        </h5>
                        <ul style="margin: 0 0 10px 0; padding-left: 16px; color: #1e293b; font-size: 0.88rem; line-height: 1.45;">
                          ${advPoints.map((pt) => `<li style="margin-bottom: 5px;">${pt}</li>`).join('')}
                        </ul>
                        ${advStarter ? `<div style="padding: 6px 8px; background: #ffffff; border-left: 3px solid #22c55e; border-radius: 4px; font-size: 0.82rem; color: #15803d; font-style: italic;"><strong>Evidence Stem:</strong> &ldquo;${advStarter}&rdquo;</div>` : ''}
                      </div>

                      <!-- Side 2: Limitations / Continuity -->
                      <div style="background: #fff1f2; border: 1.5px solid #fecdd3; border-radius: 6px; padding: 12px;">
                        <h5 style="margin: 0 0 8px 0; color: #9f1239; font-size: 0.95rem; border-bottom: 1.5px solid #fecdd3; padding-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                          <i class="fa-solid fa-hand"></i> ${limTitle}
                        </h5>
                        <ul style="margin: 0 0 10px 0; padding-left: 16px; color: #1e293b; font-size: 0.88rem; line-height: 1.45;">
                          ${limPoints.map((pt) => `<li style="margin-bottom: 5px;">${pt}</li>`).join('')}
                        </ul>
                        ${limStarter ? `<div style="padding: 6px 8px; background: #ffffff; border-left: 3px solid #f43f5e; border-radius: 4px; font-size: 0.82rem; color: #be123c; font-style: italic;"><strong>Counter-Stem:</strong> &ldquo;${limStarter}&rdquo;</div>` : ''}
                      </div>
                    </div>

                    <!-- Synthesis: GCSE Paragraph Builder -->
                    <div style="background: #fffbeb; border: 1.5px solid #fcd34d; border-radius: 6px; padding: 12px;">
                      <h5 style="margin: 0 0 6px 0; color: #92400e; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
                        <i class="fa-solid fa-pen-nib"></i> GCSE Paragraph Builder: Evaluative Synthesis
                      </h5>
                      <p style="font-size: 0.9rem; color: #78350f; font-weight: 600; margin: 0 0 8px 0;">${synthesisPrompt}</p>
                      
                      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; align-items: center;">
                        <span style="font-size: 0.75rem; font-weight: 700; color: #92400e; text-transform: uppercase;">Connectives:</span>
                        ${connectives.map((c) => `<span style="background: #ffffff; border: 1px solid #fde68a; color: #b45309; padding: 2px 7px; border-radius: 10px; font-size: 0.78rem; font-weight: 600;">${c}</span>`).join('')}
                      </div>

                      <textarea class="interactive-textarea" style="width: 100%; box-sizing: border-box; min-height: 80px; padding: 8px; border: 1px solid #fde68a; border-radius: 5px; font-size: 0.9rem; font-family: inherit; resize: vertical;" placeholder="Combine the evidence and counter-evidence above to write your complex, balanced GCSE exam paragraph..."></textarea>

                      ${
                        modelAnswer
                          ? `
                        <details style="margin-top: 8px;">
                          <summary style="cursor: pointer; color: #b45309; font-weight: 600; font-size: 0.85rem;"><i class="fa-solid fa-eye"></i> View Level 4 Model Paragraph</summary>
                          <div class="scaffold-box model-box" style="margin-top: 6px; padding: 10px 12px; background: #ffffff; border-left: 3px solid #f59e0b; border-radius: 4px; font-size: 0.9rem; color: #78350f; line-height: 1.5;">
                            ${modelAnswer}
                          </div>
                        </details>
                      `
                          : ''
                      }
                    </div>
                  </div>
                `;
                return;
              }

              const qNumPrefix = task.qNum ? `Q${task.qNum}. ` : '';
              const taskPrompt =
                task.text || task.question || task.instructions || task.prompt || '';
              const cleanTaskText = taskPrompt.replace(/^Q\d+[\.\:]\s*/i, '');
              const taskTitle =
                task.title && task.title !== taskPrompt && !cleanTaskText.startsWith(task.title)
                  ? task.title
                  : '';
              const titleHtml = taskTitle
                ? `<div style="font-weight: 800; font-size: 0.88rem; color: #92400e; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">${taskTitle}</div>`
                : '';
              const taskStarter =
                task.starter ||
                task.sentence_starter ||
                (task.scaffolding &&
                  (task.scaffolding.starter || task.scaffolding.sentence_starter));
              const taskModel = task.model || task.model_answer || task.answer;
              htmlNarrative += `
                <div class="task-box" style="margin-bottom: 12px; background: white; padding: 12px 15px; border-radius: 6px; border: 1px solid #fde68a;">
                  ${titleHtml}
                  <strong style="color: #92400e; font-size: 1.05rem;">${qNumPrefix}${cleanTaskText}</strong>
                  ${taskStarter ? `<details style="margin-top: 8px;"><summary style="cursor: pointer; color: #0284c7; font-weight: 600; font-size: 0.9rem;"><i class="fa-solid fa-pen"></i> Sentence Starter</summary><div class="scaffold-box starter-box" style="margin-top: 8px; padding: 10px; background: #f0f9ff; border-left: 3px solid #0284c7; border-radius: 4px; font-size: 0.95rem; color: #0c4a6e; font-style: italic;">${taskStarter}</div></details>` : ''}
                  ${taskModel ? `<details style="margin-top: 8px;"><summary style="cursor: pointer; color: #b45309; font-weight: 600; font-size: 0.9rem;"><i class="fa-solid fa-eye"></i> View Model Answer</summary><div class="scaffold-box model-box" style="margin-top: 8px; padding: 10px; background: #fef3c7; border-left: 3px solid #b45309; border-radius: 4px; font-size: 0.95rem; color: #78350f;">${taskModel}</div></details>` : ''}
                </div>
              `;
            });
            htmlNarrative += `</div>`;
          }
          if (block.hinge_question) {
            const hingeId = `hinge-${index}`;
            const hingeQuestionText = block.hinge_question.text || block.hinge_question.question;
            const correctIndex =
              block.hinge_question.correct_index !== undefined
                ? block.hinge_question.correct_index
                : block.hinge_question.answer;
            htmlNarrative += `
                <div class="hinge-question-container no-print" style="margin-bottom: 25px; margin-top: -5px;">
                  <button class="btn btn-secondary" id="btn-${hingeId}" data-action="reveal-hinge" data-target="${hingeId}" style="background: #0ea5e9; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s;"><i class="fa-solid fa-person-circle-question" style="margin-right: 6px;"></i> Reveal Hinge Question</button>
                  <div id="${hingeId}" style="display: none; background: #f0f9ff; border: 2px solid #38bdf8; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <div style="color: #0284c7; font-weight: bold; font-size: 0.9rem; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Interactive Hinge Question</div>
                    <div style="color: #0f172a; font-size: 1.1rem; font-weight: bold; margin-bottom: 15px;">"${hingeQuestionText}"</div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      ${block.hinge_question.options
                        .map(
                          (opt, i) => `
                        <button data-action="hinge-mcq-select" data-correct="${correctIndex}" data-index="${i}" style="text-align: left; background: white; border: 1px solid #bae6fd; padding: 12px 15px; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 1rem; color: #334155;">
                          <strong>${String.fromCharCode(65 + i)}:</strong> ${opt}
                        </button>
                      `,
                        )
                        .join('')}
                    </div>
                    <div style="display: none; margin-top: 15px; padding: 12px; background: #dcfce7; border-left: 4px solid #22c55e; color: #166534; font-size: 1rem; border-radius: 0 6px 6px 0;">
                      <strong>Explanation:</strong> ${block.hinge_question.explanation}
                    </div>
                  </div>
                </div>
              `;
          }
          return;
        }
      }

      const isQuote = typeof block.text === 'string' && block.text.startsWith('"');
      let blockText = block.text || '';

      // 1. Add inline Key Individual links FIRST
      let contentStr = blockText.replace(/\[Key Individual:\s*([^\]]+)\]/gi, (match, name) => {
        const hasPerson =
          appStore.state.activeUnitData &&
          appStore.state.activeUnitData.key_individuals &&
          appStore.state.activeUnitData.key_individuals.some(
            (p) => p.name && p.name.toLowerCase() === name.toLowerCase(),
          );
        if (!hasPerson) {
          return name;
        }
        return `<a href="javascript:void(0)" class="key-individual-inline-link no-print" data-action="jump-to-key-individual" data-name="${name}" style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 4px; color: #2563eb; text-decoration: none; font-weight: 600; cursor: pointer; padding: 2px 6px; font-size: 0.95em; font-family: inherit; display: inline-flex; align-items: center; gap: 4px; vertical-align: baseline;"><i class="fa-solid fa-id-card-clip"></i> ${name}</a><span class="print-only" style="display:none; font-weight:bold;">${name}</span>`;
      });

      // 2. Add Glossary highlighting SECOND (it will skip the <a> tags we just made)
      contentStr = isQuote
        ? `<em style="font-size:1.1rem; color:#475569;">${contentStr}</em>`
        : highlightGlossary(contentStr);

      contentStr = formatBold(contentStr);
      contentStr = contentStr.replace(
        /src=["'](\.\/)?assets\//g,
        'src="/units/' + window.currentUnitId + '/assets/',
      );
      let styledContent = contentStr;
      if (contentStr.trim().startsWith('<strong>')) {
        styledContent = contentStr.replace(/^<strong>(.*?)<\/strong>\s*/i, (match, headingText) => {
          return `<div class="paragraph-signpost" style="font-weight: 700; color: #1e3a8a; font-size: 1.08rem; letter-spacing: 0.1px; margin-bottom: 6px; border-left: 3px solid #3b82f6; padding-left: 8px;">${headingText}</div><br/>`;
        });
      }

      let l4StyledContent = '';
      if (block.level_4) {
        // 1. Add inline Key Individual links FIRST
        let l4ContentStr = block.level_4.replace(
          /\[Key Individual:\s*([^\]]+)\]/gi,
          (match, name) => {
            const hasPerson =
              appStore.state.activeUnitData &&
              appStore.state.activeUnitData.key_individuals &&
              appStore.state.activeUnitData.key_individuals.some(
                (p) => p.name && p.name.toLowerCase() === name.toLowerCase(),
              );
            if (!hasPerson) {
              return name;
            }
            return `<a href="javascript:void(0)" class="key-individual-inline-link no-print" data-action="jump-to-key-individual" data-name="${name}" style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 4px; color: #2563eb; text-decoration: none; font-weight: 600; cursor: pointer; padding: 2px 6px; font-size: 0.95em; font-family: inherit; display: inline-flex; align-items: center; gap: 4px; vertical-align: baseline;"><i class="fa-solid fa-id-card-clip"></i> ${name}</a><span class="print-only" style="display:none; font-weight:bold;">${name}</span>`;
          },
        );

        // 2. Add Glossary highlighting SECOND
        l4ContentStr = isQuote
          ? `<em style="font-size:1.1rem; color:#475569;">${l4ContentStr}</em>`
          : highlightGlossary(l4ContentStr);

        l4ContentStr = formatBold(l4ContentStr);
        l4StyledContent = l4ContentStr;
        if (l4ContentStr.trim().startsWith('<strong>')) {
          l4StyledContent = l4ContentStr.replace(
            /^<strong>(.*?)<\/strong>\s*/i,
            (match, headingText) => {
              return `<div class="paragraph-signpost" style="font-weight: 700; color: #047857; font-size: 1.08rem; letter-spacing: 0.1px; margin-bottom: 6px; border-left: 3px solid #10b981; padding-left: 8px;">${headingText}</div><br/>`;
            },
          );
        }
      }

      let themeHeadingHtml = '';
      if (block.theme_heading) {
        const headingId = block.theme_heading
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        themeHeadingHtml = `<h4 id="${headingId}" style="margin-top: 0; margin-bottom: 10px; color: #1e3a8a; font-size: 1.15rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; display: inline-block;"><i class="fa-solid fa-bookmark" style="color: #64748b; margin-right: 8px;"></i>${block.theme_heading}</h4><br/>`;
      }

      let imageHtml = '';
      if (block.images && Array.isArray(block.images) && block.images.length > 0) {
        const galleryData = encodeURIComponent(
          JSON.stringify(
            block.images.map((img) => ({
              src: getAssetUrl(img.src || img.image),
              alt: img.alt || img.image_alt || '',
            })),
          ),
        ).replace(/'/g, '%27');
        imageHtml = `
             <style>
               .image-hint-caption {
                 font-size: 0.9rem; color: #64748b; margin-top: 8px; font-style: italic; cursor: pointer; user-select: none; transition: all 0.3s ease; padding: 4px; border-radius: 4px; display: inline-block;
               }
               .image-hint-caption:hover {
                 background: rgba(0,0,0,0.02);
               }
               .image-hint-caption.blurred {
                 color: transparent !important; text-shadow: 0 0 10px rgba(100,116,139,0.8) !important;
               }
             </style>
             <div class="narrative-images-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 20px 0;">
               ${block.images
                 .map((img, idx) => {
                   if (img.image_context) {
                     return `
                     <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch; justify-content: center; margin: 20px 0; width: 100%; grid-column: 1 / -1;">
                       <div style="flex: 1 1 300px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
                         <img src="${getAssetUrl(img.src || img.image)}" alt="${img.alt || img.image_alt || 'Narrative Image'}" style="width: 100%; max-height: 400px; object-fit: contain; background: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in;" data-action="open-gallery" data-gallery="${galleryData}" data-index="${idx}">
                         ${img.caption || img.image_caption || img.alt || img.image_alt ? `<div class="image-hint-caption" data-action="toggle-caption-blur" title="Click to hide caption"><i class="fa-solid fa-eye" style="margin-right:4px; color: #10b981;"></i> ${img.source_letter ? `<strong>Source ${img.source_letter}:</strong> ` : ''}${img.caption || img.image_caption || img.alt || img.image_alt}</div>` : ''}
                       </div>
                       <div style="flex: 1 1 300px; background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: center;">
                         <h4 style="margin-top: 0; margin-bottom: 12px; color: #b45309; display: flex; align-items: center; gap: 8px; font-size: 1.1rem;">
                           <i class="fa-solid fa-magnifying-glass-plus"></i> Historical Context
                         </h4>
                         <p style="margin: 0; font-size: 1rem; color: #334155; line-height: 1.6;">
                           ${img.image_context.replace(/\*\*Hinge Question:\*\*/g, '<br><br><strong style="color: #b45309;">Hinge Question:</strong>')}
                         </p>
                       </div>
                     </div>
                   `;
                   } else {
                     return `
                     <div class="narrative-image-container" style="text-align: center;">
                       <img src="${getAssetUrl(img.src || img.image)}" alt="${img.alt || img.image_alt || 'Narrative Image'}" style="width: 100%; max-height: 400px; object-fit: contain; background: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in;" data-action="open-gallery" data-gallery="${galleryData}" data-index="${idx}">
                       ${img.caption || img.image_caption || img.alt || img.image_alt ? `<div class="image-hint-caption" data-action="toggle-caption-blur" title="Click to hide caption"><i class="fa-solid fa-eye" style="margin-right:4px; color: #10b981;"></i> ${img.source_letter ? `<strong>Source ${img.source_letter}:</strong> ` : ''}${img.caption || img.image_caption || img.alt || img.image_alt}</div>` : ''}
                     </div>
                   `;
                   }
                 })
                 .join('')}
             </div>
           `;
      } else if (
        block.image &&
        !(window.currentUnitId === 'water_and_sanitation' && block.source_letter)
      ) {
        let containerStyle = block.image_context
          ? 'display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch; justify-content: center; margin: 20px 0;'
          : 'text-align: center; margin: 20px 0;';
        let imgWrapperStyle = block.image_context
          ? 'flex: 1 1 300px; text-align: center; display: flex; flex-direction: column; justify-content: center;'
          : '';
        let contextHtml = block.image_context
          ? `
               <div style="flex: 1 1 300px; background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: center;">
                 <h4 style="margin-top: 0; margin-bottom: 12px; color: #b45309; display: flex; align-items: center; gap: 8px; font-size: 1.1rem;">
                   <i class="fa-solid fa-magnifying-glass-plus"></i> Historical Context
                 </h4>
                 <p style="margin: 0; color: #334155; line-height: 1.6; font-size: 1rem;">${block.image_context.replace(/\*\*Hinge Question:\*\*/g, '<br><br><strong style="color: #b45309;">Hinge Question:</strong>')}</p>
               </div>
               `
          : '';

        imageHtml = `
             <style>
               .image-hint-caption {
                 font-size: 0.9rem; color: #64748b; margin-top: 8px; font-style: italic; cursor: pointer; user-select: none; transition: all 0.3s ease; padding: 4px; border-radius: 4px; display: inline-block;
               }
               .image-hint-caption:hover {
                 background: rgba(0,0,0,0.02);
               }
               .image-hint-caption.blurred {
                 color: transparent !important; text-shadow: 0 0 10px rgba(100,116,139,0.8) !important;
               }
             </style>
             <div class="narrative-image-container" style="${containerStyle}">
               <div style="${imgWrapperStyle}">
                 <img src="${getAssetUrl(block.image)}" alt="${block.image_alt || 'Narrative Image'}" style="max-width: 100%; max-height: 240px; object-fit: contain; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in; display: block; margin: 0 auto;" data-action="open-modal" data-src="${getAssetUrl(block.image)}">
                 ${block.caption || block.image_caption || block.image_alt ? `<div class="image-hint-caption" data-action="toggle-caption-blur" title="Click to hide caption"><i class="fa-solid fa-eye" style="margin-right:4px; color: #10b981;"></i> ${block.source_letter ? `<strong>Source ${block.source_letter}:</strong> ` : ''}${block.caption || block.image_caption || block.image_alt}</div>` : ''}
                  ${
                    window.currentUnitId === 'cme_new' ||
                    window.currentUnitId === 'gcse_middle_east_1945_1995'
                      ? `
                    <div style="margin-top: 6px; text-align: center;">
                      <button class="cme-timeline-jump-badge" onclick="if(typeof window.switchView==='function'){window.switchView('timeline', 'cme_new');}else if(typeof window.navigateTo==='function'){window.navigateTo('timeline');}" style="background: rgba(30, 58, 138, 0.08); border: 1px solid rgba(30, 58, 138, 0.25); color: #1e3a8a; font-size: 0.75rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;" title="Jump to interactive chronological Living Timeline">
                        <i class="fa-solid fa-clock-rotate-left"></i> Living Timeline Milestone &bull; View Chronology &rarr;
                      </button>
                    </div>
                    `
                      : ''
                  }
               </div>
               ${contextHtml}
             </div>
           `;
      }

      let blockSourceHtml = '';
      let rawSource =
        block.source ||
        (block.archival_source
          ? {
              type: 'written',
              title: block.archival_source.title,
              shelfmark: block.archival_source.shelfmark,
              content: block.archival_source.text || block.archival_source.content || '',
              citation: block.archival_source.citation || '',
              source_context:
                block.archival_source.source_context || block.archival_source.context || '',
              question: block.archival_source.question || '',
              qNum: block.archival_source.qNum || '',
            }
          : null);

      if (
        !rawSource &&
        window.currentUnitId === 'water_and_sanitation' &&
        block.source_letter &&
        block.image
      ) {
        rawSource = {
          type: 'visual',
          src: block.image,
          source: block.image,
          title: `Source ${block.source_letter}: ${block.image_alt || block.theme_heading || 'Primary Historical Evidence'}`,
          shelfmark: block.shelfmark || `SOURCE ${block.source_letter}`,
          caption: block.caption || block.image_caption || '',
          citation: block.citation || 'Archaeological / Primary Archive Evidence',
          source_context: block.image_context || '',
          question: block.source_question || '',
        };
      }

      if (rawSource) {
        const isWrittenSource =
          rawSource.type === 'written' ||
          (rawSource.content && !rawSource.source && !rawSource.src && !rawSource.image);

        const bLetterMatch = (rawSource.title || '').match(/Source\s+([A-Z])/i);
        const bLetter = bLetterMatch ? bLetterMatch[1].toUpperCase() : '';
        const bCardIdAttr =
          bLetter && window.currentUnitId === 'cme_new'
            ? `id="source-card-${bLetter}" data-source-letter="${bLetter}"`
            : '';
        const bQClassAttr =
          bLetter && window.currentUnitId === 'cme_new'
            ? 'source-inquiry-box source-inquiry-interactive'
            : '';
        const bQDataAttr =
          bLetter && window.currentUnitId === 'cme_new'
            ? `data-target-source="${bLetter}" title="Hover or click to highlight Source ${bLetter}"`
            : '';

        const sourceTitle = rawSource.title || rawSource.caption || '';
        const sourceAudioBtnHtml = isWrittenSource
          ? renderAudioPlaybackBar('Read Aloud Primary Source Excerpt', 'source-audio-bar')
          : '';

        const sourceHeaderHtml = sourceTitle
          ? `
            <div class="archival-source-header" style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0;">
              <h4 class="archival-source-title" style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.12rem; font-weight: 700; color: #0f172a;">${sourceTitle}</h4>
              ${sourceAudioBtnHtml}
            </div>
          `
          : isWrittenSource
            ? `
            <div class="archival-source-header" style="display: flex; justify-content: flex-end;">
              ${sourceAudioBtnHtml}
            </div>
          `
            : '';

        let sourceBodyHtml = '';
        if (isWrittenSource) {
          sourceBodyHtml = `
            <div class="archival-source-body" style="width: 100%; max-height: 350px; overflow-y: auto; font-family: 'Georgia', serif; font-style: italic; font-size: 1.05rem; line-height: 1.75; color: #1e293b; background: #fffdfa; padding: 14px 18px; border-left: 4px solid #1e3a8a; border-radius: 4px;">
              ${rawSource.content}
            </div>
            ${
              rawSource.citation
                ? `<div class="archival-citation-footer" style="font-size: 0.8rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 8px; margin-top: 8px;">
                    <strong>Provenance:</strong> ${rawSource.citation}
                  </div>`
                : ''
            }
            ${
              window.currentUnitId === 'cme_new' && rawSource.title && rawSource.caption
                ? `<div style="font-size: 0.95rem; color: #475569; margin-top: -5px; margin-bottom: 15px; font-style: italic;">${rawSource.caption}</div>`
                : ''
            }
            ${
              rawSource.source_context
                ? `
              <div style="background: #f8fafc; border-left: 4px solid #64748b; padding: 15px; border-radius: 0 4px 4px 0; margin-top: 15px; color: #334155; font-size: 1.05rem; line-height: 1.6;">
                <strong>Historical Context:</strong> ${window.formatBold(rawSource.source_context)}
              </div>
            `
                : ''
            }
            ${
              rawSource.provenance_clue
                ? `
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 15px; margin-top: 15px;">
                <strong style="color: #166534; display: block; margin-bottom: 5px;"><span class="archival-meta-tag accent-emerald" style="margin-right: 6px;">PROVENANCE CLUE</span></strong>
                <span style="color: #15803d; font-size: 0.95rem;">${window.formatBold(rawSource.provenance_clue)}</span>
              </div>
            `
                : ''
            }
          `;
        } else {
          const rawSourceImgUrl = getAssetUrl(rawSource.src || rawSource.source || rawSource.image);
          sourceBodyHtml = `
            <div class="archival-source-split-layout">
              <div class="archival-source-media-col">
                <img src="${rawSourceImgUrl}" alt="${sourceTitle || 'Source'}" data-action="open-modal" data-src="${rawSourceImgUrl}" ${rawSource.default_zoom || rawSource.defaultZoom || (rawSourceImgUrl && rawSourceImgUrl.includes('vesalius_fabrica_frontispiece')) ? `data-default-zoom="${rawSource.default_zoom || rawSource.defaultZoom || '2x'}"` : ''} style="cursor: zoom-in;">
                <div class="archival-source-inspect-badge">
                  <span class="archival-meta-tag" style="font-size: 0.62rem; color: #cbd5e1; letter-spacing: 0.08em;">CLICK TO ENLARGE / PAN-ZOOM</span>
                </div>
                ${
                  window.currentUnitId === 'cme_new' ||
                  window.currentUnitId === 'gcse_middle_east_1945_1995'
                    ? `
                  <div style="margin-top: 6px; text-align: center;">
                    <button class="cme-timeline-jump-badge" onclick="if(typeof window.switchView==='function'){window.switchView('timeline', 'cme_new');}else if(typeof window.navigateTo==='function'){window.navigateTo('timeline');}" style="background: rgba(30, 58, 138, 0.08); border: 1px solid rgba(30, 58, 138, 0.25); color: #1e3a8a; font-size: 0.72rem; font-weight: 700; padding: 3px 9px; border-radius: 20px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: all 0.2s ease;" title="Jump to interactive chronological Living Timeline">
                      <i class="fa-solid fa-clock-rotate-left"></i> Living Timeline Milestone &bull; View Chronology &rarr;
                    </button>
                  </div>
                  `
                    : ''
                }
              </div>
              <div class="archival-source-details-col">
                <div>
                  ${
                    (window.currentUnitId === 'cme_new' ||
                      window.currentUnitId === 'water_and_sanitation' ||
                      rawSource.caption) &&
                    rawSource.caption
                      ? `<div style="font-size: 0.95rem; color: #475569; margin-bottom: 12px; font-style: italic;">${rawSource.caption}</div>`
                      : ''
                  }
                  ${
                    rawSource.source_context || rawSource.context
                      ? `
                    <div style="background: #f8fafc; border-left: 4px solid #64748b; padding: 12px 16px; border-radius: 0 4px 4px 0; margin-bottom: 12px; color: #334155; font-size: 0.98rem; line-height: 1.6;">
                      <strong>Historical Context:</strong> ${window.formatBold(rawSource.source_context || rawSource.context)}
                    </div>
                  `
                      : ''
                  }
                  ${
                    rawSource.provenance_clue
                      ? `
                    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 12px 15px; margin-bottom: 12px;">
                      <strong style="color: #166534; display: block; margin-bottom: 4px;"><span class="archival-meta-tag accent-emerald" style="margin-right: 6px;">PROVENANCE CLUE</span></strong>
                      <span style="color: #15803d; font-size: 0.92rem;">${window.formatBold(rawSource.provenance_clue)}</span>
                    </div>
                  `
                      : ''
                  }
                </div>
                ${
                  rawSource.citation || rawSource.provenance
                    ? `<div class="archival-citation-footer" style="font-size: 0.8rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 8px; margin-top: auto;">
                        <strong>Provenance:</strong> ${rawSource.citation || rawSource.provenance}
                      </div>`
                    : ''
                }
              </div>
            </div>
          `;
        }

        if (window.currentUnitId === 'cme_new') {
          const sLetterMatch = (rawSource.title || '').match(/Source\s+([A-Z0-9]+)/i);
          const sLetter = sLetterMatch ? sLetterMatch[1].toUpperCase() : '';
          const displayTitle = rawSource.title
            ? rawSource.title.replace(/^Source\s+[A-Z0-9]+[:\s-]*/i, '').trim()
            : rawSource.caption || 'Archival Primary Record';

          blockSourceHtml = `
            <details class="cme-source-drawer archival-drawer gcse-source-container archival-source-box" ${bCardIdAttr} style="margin: 20px 0; border: 1.5px solid #cbd5e1; border-radius: 8px; background: #f8fafc; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.03); transition: all 0.25s ease;">
              <summary style="padding: 12px 18px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: space-between; background: #f1f5f9; color: #0f172a; list-style: none; user-select: none; transition: background 0.2s ease;">
                <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                  <span class="archival-meta-tag" style="background: #1e40af; color: #ffffff; padding: 3px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.5px;">${sLetter ? `SOURCE ${sLetter}` : 'ARCHIVAL EVIDENCE'}</span>
                  <span style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.02rem; color: #1e293b; font-weight: 700;">${displayTitle}</span>
                </div>
                <span class="drawer-toggle-indicator" style="font-size: 0.8rem; color: #64748b; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; flex-shrink: 0;">
                  Archival Evidence &bull; Expand <span class="drawer-caret">&#9660;</span>
                </span>
              </summary>
              <div class="cme-source-content" style="padding: 18px; background: #ffffff; border-top: 1px solid #e2e8f0;">
                ${sourceHeaderHtml}
                ${sourceBodyHtml}
                ${
                  rawSource.hinge_question || rawSource.question
                    ? `
                  <div class="archival-source-discussion-box" style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #1e40af; padding: 12px 16px; border-radius: 4px; margin-top: 14px; box-shadow: 0 2px 5px rgba(30, 58, 138, 0.06);">
                    <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #1e40af; margin-bottom: 4px; letter-spacing: 0.5px;"><i class="fa-solid fa-comments"></i> Hinge Discussion Prompt (Teacher / Class Inquiry)</div>
                    <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.02rem; color: #1e3a8a; line-height: 1.5; font-weight: 600;">
                      ${typeof window !== 'undefined' && window.formatBold ? window.formatBold(cleanQuestionText(rawSource.hinge_question || rawSource.question)) : cleanQuestionText(rawSource.hinge_question || rawSource.question)}
                    </div>
                  </div>
                `
                    : ''
                }
              </div>
            </details>
          `;
        } else {
          blockSourceHtml = `
                <div class="gcse-source-container archival-source-box" ${bCardIdAttr} style="text-align: left; transition: all 0.3s ease; margin: 20px 0;">
                  ${sourceHeaderHtml}
                  ${sourceBodyHtml}
                  ${
                    rawSource.question || rawSource.hinge_question
                      ? `
                    <div class="archival-source-discussion-box" style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #1e40af; padding: 12px 16px; border-radius: 4px; margin-top: 12px; box-shadow: 0 2px 5px rgba(30, 58, 138, 0.06);">
                      <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.02rem; color: #1e3a8a; line-height: 1.5; font-weight: 600;">
                        ${typeof window !== 'undefined' && window.formatBold ? window.formatBold(cleanQuestionText(rawSource.question || rawSource.hinge_question)) : cleanQuestionText(rawSource.question || rawSource.hinge_question)}
                      </div>
                    </div>
                  `
                      : ''
                  }
                </div>
               `;
        }
      }

      htmlNarrative += `
            <div class="standard-narrative-container">
              ${imageHtml}
              ${blockSourceHtml}
              <div id="para-${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: ${bg}; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                ${!block.text || !block.text.trim() || (typeof block.text === 'string' && block.text.includes('side-quest-box')) || (block.title && block.title.toLowerCase().includes('lesson reflection')) ? '' : '<div class="para-number">' + (index + 1) + '</div>'}
                <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">${themeHeadingHtml}${styledContent}</div>
                <div style="display: flex; align-items: flex-start;">
                  ${renderAudioPlaybackBar('Read Aloud Paragraph')}
                </div>
              </div>
            </div>
          `;

      let extrasHtml = '';
      if (block.level_4) {
        extrasHtml += `
            <div class="level4-narrative-container" style="display: none;">
              <div id="para-l4-${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: ${bg}; border-radius: 6px; border-left: 4px solid #10b981; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div class="para-number" style="background:#ecfdf5; color:#047857;">${index + 1}</div>
                <div class="narrative-text" style="flex-grow: 1; line-height: 1.6; font-size: 1.15rem; color:#1e293b;">${l4StyledContent}</div>
                <div style="display: flex; align-items: flex-start;">
                  ${renderAudioPlaybackBar('Read Aloud Paragraph (Level 4)')}
                </div>
              </div>
            </div>
          `;
      }

      if (block.hinge_question) {
        const hingeId = `hinge-${index}`;
        const hingeQuestionText = block.hinge_question.text || block.hinge_question.question;
        const correctIndex =
          block.hinge_question.correct_index !== undefined
            ? block.hinge_question.correct_index
            : block.hinge_question.answer;
        extrasHtml += `
            <div class="hinge-question-container no-print" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px;">
              <button class="btn btn-secondary" id="btn-${hingeId}" data-action="reveal-hinge" data-target="${hingeId}" style="background: #0ea5e9; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s;"><i class="fa-solid fa-person-circle-question" style="margin-right: 6px;"></i> Reveal Hinge Question</button>
              <div id="${hingeId}" style="display: none; background: #f0f9ff; border: 2px solid #38bdf8; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="color: #0284c7; font-weight: bold; font-size: 0.9rem; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Interactive Hinge Question</div>
                <div style="color: #0f172a; font-size: 1.1rem; font-weight: bold; margin-bottom: 15px;">"${hingeQuestionText}"</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${block.hinge_question.options
                    .map(
                      (opt, i) => `
                    <button data-action="hinge-mcq-select" data-correct="${correctIndex}" data-index="${i}" style="text-align: left; background: white; border: 1px solid #bae6fd; padding: 12px 15px; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 1rem; color: #334155;">
                      <strong>${String.fromCharCode(65 + i)}:</strong> ${opt}
                    </button>
                  `,
                    )
                    .join('')}
                </div>
                <div style="display: none; margin-top: 15px; padding: 12px; background: #dcfce7; border-left: 4px solid #22c55e; color: #166534; font-size: 1rem; border-radius: 0 6px 6px 0;">
                  <strong>Explanation:</strong> ${block.hinge_question.explanation}
                </div>
              </div>
            </div>
          `;
      }

      if (block.tasks && block.tasks.length > 0) {
        extrasHtml += `<div class="embedded-tasks-container" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px; padding: 15px; background: #fffbeb; border: 2px dashed #fcd34d; border-radius: 6px;">`;
        block.tasks.forEach((task, tIdx) => {
          if (task.type === 'convict_game') {
            const gameId = `convict-game-emb-${index}-${tIdx}`;
            extrasHtml += `<div id="${gameId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../convict_game.js').then((mod) => {
                mod.initConvictGame(document.getElementById(gameId), task);
              });
            });
            return;
          }
          if (task.type === 'physician_game') {
            const gameId = `physician-game-emb-${index}-${tIdx}`;
            extrasHtml += `<div id="${gameId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../physician_game.js').then((mod) => {
                mod.initPhysicianGame(document.getElementById(gameId), task);
              });
            });
            return;
          }
          if (task.type === 'drag_drop_timeline') {
            const timelineId = `dd-timeline-emb-${index}-${tIdx}`;
            extrasHtml += `<div id="${timelineId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../drag_drop_timeline.js').then((mod) => {
                mod.initDragDropTimeline(document.getElementById(timelineId), task);
              });
            });
            return;
          }
          if (task.type === 'interactive_map') {
            const mapId = `interactive-map-emb-${index}-${tIdx}`;
            extrasHtml += `<div id="${mapId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../interactive_map.js').then((mod) => {
                mod.initInteractiveMap(document.getElementById(mapId), task);
              });
            });
            return;
          }
          if (task.type === 'spectrum_mapper') {
            const spectrumId = `spectrum-emb-${index}-${tIdx}`;
            extrasHtml += `<div id="${spectrumId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../spectrum_mapper.js').then((mod) => {
                mod.initSpectrumMapper(document.getElementById(spectrumId), task);
              });
            });
            return;
          }
          if (task.type === 'multiple_choice') {
            const mcPrefix = task.qNum ? `Q${task.qNum}. ` : '';
            extrasHtml += `<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-list-check"></i> ${mcPrefix}${task.text || task.question || ''}</h4>
                 ${task.questions
                   .map(
                     (q, qIdx) => `
                   <div style="margin-top: 15px;">
                     <strong>${q.q}</strong>
                     <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px;">
                       ${q.options
                         .map(
                           (opt, oIdx) => `
                         <label style="cursor:pointer; display:flex; align-items:center; gap:8px;">
                           <input type="radio" name="mc-${index}-${tIdx}-${qIdx}" value="${oIdx}">
                           <span>${opt}</span>
                         </label>
                       `,
                         )
                         .join('')}
                     </div>
                   </div>
                 `,
                   )
                   .join('')}
               </div>`;
            return;
          }
          if (task.type === 'sorting') {
            extrasHtml += `<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-arrow-down-1-9"></i> ${task.text || task.question || ''}</h4>
                 <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
                   ${task.events
                     .map(
                       (ev, eIdx) => `
                     <div style="display:flex; align-items:center; gap:10px;">
                       <input type="number" min="1" max="${task.events.length}" style="width:50px; padding:5px; border:1px solid #ccc; border-radius:4px;">
                       <span>${ev}</span>
                     </div>
                   `,
                     )
                     .join('')}
                 </div>
               </div>`;
            return;
          }
          if (task.type === 'cloze') {
            let renderedCloze = task.cloze_text.replace(
              /\[([^\]]+)\]/g,
              '<input type="text" placeholder="..." style="border:none; border-bottom:2px solid #3b82f6; background:transparent; width:100px; text-align:center; margin:0 5px;" />',
            );
            extrasHtml += `<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-pen-clip"></i> ${task.text || task.question || ''}</h4>
                 <div style="margin-bottom: 15px; padding:10px; background:#e0f2fe; border-radius:6px; font-weight:bold; color:#0369a1;">Word Bank: ${task.words.join(' | ')}</div>
                 <p style="line-height:1.8; font-size:1.05rem;">${renderedCloze}</p>
               </div>`;
            return;
          }
          if (task.type === 'matching') {
            extrasHtml += `<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-link"></i> ${task.text}</h4>
                 <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:15px;">
                   <div style="display:flex; flex-direction:column; gap:10px;">
                     ${task.pairs.map((p) => `<div style="padding:10px; background:white; border:1px solid #cbd5e1; border-radius:6px; font-weight:bold;">${p.left}</div>`).join('')}
                   </div>
                   <div style="display:flex; flex-direction:column; gap:10px;">
                     ${[...task.pairs]
                       .sort(() => Math.random() - 0.5)
                       .map(
                         (p) =>
                           `<div style="padding:10px; background:white; border:1px solid #cbd5e1; border-radius:6px;">${p.right}</div>`,
                       )
                       .join('')}
                   </div></div></div>`;
            return;
          }
          if (task.type === 'table_planner') {
            extrasHtml += `<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; overflow-x:auto;">
                  <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-table"></i> ${task.text || task.question || 'Planner'}</h4>
                 <table style="width:100%; border-collapse:collapse; margin-top:10px; background:white;">
                   <thead><tr>${task.columns.map((c) => `<th style="border:1px solid #cbd5e1; padding:10px; background:#e2e8f0; color:#1e293b; text-align:left;">${c}</th>`).join('')}</tr></thead>
                   <tbody>
                     ${Array.from({ length: task.rows })
                       .map(
                         () =>
                           `<tr>${task.columns.map(() => `<td style="border:1px solid #cbd5e1; padding:10px;"><textarea style="width:100%; min-height:60px; border:none; resize:vertical; outline:none;" placeholder="Type here..."></textarea></td>`).join('')}</tr>`,
                       )
                       .join('')}
                   </tbody>
                 </table>
               </div>`;
            return;
          }
          if (task.type === 'think_pair_share') {
            const tpsPrefix = task.qNum ? `Q${task.qNum}. ` : '';
            extrasHtml += `<div style="margin-bottom: 20px; background: #ecfdf5; padding: 15px; border-radius: 8px; border: 2px solid #10b981;">
                 <h4 style="margin-top:0; color:#065f46;"><i class="fa-solid fa-users"></i> ${tpsPrefix}Think-Pair-Share</h4>
                 <p style="font-weight:bold; color:#0f172a; font-size:1.1rem;">${task.text || task.question}</p>
                 <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-top:15px;">
                   <div style="background:white; padding:10px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                     <div style="font-weight:bold; color:#059669; margin-bottom:8px;"><i class="fa-solid fa-brain"></i> My Thoughts</div>
                     <textarea style="width:100%; border:none; resize:vertical; min-height:80px; outline:none;" placeholder="Jot down your initial ideas..."></textarea>
                   </div>
                   <div style="background:white; padding:10px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                     <div style="font-weight:bold; color:#059669; margin-bottom:8px;"><i class="fa-solid fa-comments"></i> Partner's Thoughts</div>
                     <textarea style="width:100%; border:none; resize:vertical; min-height:80px; outline:none;" placeholder="What did your partner add?..."></textarea>
                   </div></div></div>`;
            return;
          }
          if (task.type === 'drawing') {
            const drawPrefix = task.qNum ? `Q${task.qNum}. ` : '';
            extrasHtml += `<div style="margin-bottom: 20px; background: #fffbeb; padding: 15px; border-radius: 8px; border: 2px dashed #f59e0b; text-align:center;">
                 <h4 style="margin-top:0; color:#b45309;"><i class="fa-solid fa-palette"></i> ${drawPrefix}Drawing Task</h4>
                 <p style="font-weight:bold; color:#0f172a; font-size:1.05rem;">${task.text || task.question}</p>
                 <div style="margin:20px auto; width:80%; height:200px; background:white; border:1px solid #d1d5db; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#9ca3af; font-style:italic;">
                   [Draw your response in your workbook]
                 </div>
               </div>`;
            return;
          }
          if (task.type === 'visual_annotation' || task.type === 'diagram_annotation') {
            const rawImg = task.image || task.src || (block && block.image ? block.image : null);
            const imgSrc = rawImg ? getAssetUrl(rawImg) : '';
            extrasHtml += `
              <div class="task-box visual-annotation-interactive" style="margin-bottom: 25px; background: #ffffff; padding: 20px; border-radius: 10px; border: 2px solid #0f172a; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #0f172a; font-size: 1.15rem;"><i class="fa-solid fa-microscope" style="color: #0284c7; margin-right: 8px;"></i> ${task.text || task.question || 'Visual Blueprint & Archival Anatomy'}</h4>
                  <span style="background: #0f172a; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Visual Anatomy</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #475569; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                ${
                  imgSrc
                    ? `
                  <div style="text-align: center; margin-bottom: 20px; background: #0f172a; border-radius: 8px; padding: 10px; position: relative;">
                    <img src="${imgSrc}" alt="Historical Diagram" style="max-height: 380px; max-width: 100%; object-fit: contain; border-radius: 4px; cursor: zoom-in;" data-action="open-modal" data-src="${imgSrc}" title="Click to zoom">
                    ${task.caption ? `<div style="color: #94a3b8; font-size: 0.85rem; font-style: italic; margin-top: 8px;">${task.caption}</div>` : ''}
                  </div>
                `
                    : ''
                }
                ${
                  task.annotations && task.annotations.length > 0
                    ? `
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
                    ${task.annotations
                      .map((ann, aIdx) => {
                        const num = ann.num || aIdx + 1;
                        return `
                        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 14px;">
                          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <span style="background: #0f172a; color: #ffffff; font-weight: 800; font-size: 0.85rem; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;">${num}</span>
                            <strong style="color: #1e293b; font-size: 0.95rem;">${ann.label || ann.target || 'Feature ' + num}</strong>
                          </div>
                          <p style="font-size: 0.88rem; color: #475569; margin: 0 0 10px 0; line-height: 1.4;">${ann.prompt || ann.question || 'Identify and explain significance:'}</p>
                          <textarea style="width: 100%; box-sizing: border-box; min-height: 55px; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; font-family: inherit; resize: vertical;" placeholder="${ann.starter || 'Type your notes / label here...'}"></textarea>
                          ${
                            ann.model
                              ? `
                            <details style="margin-top: 8px;">
                              <summary style="cursor: pointer; color: #b45309; font-weight: 600; font-size: 0.82rem;"><i class="fa-solid fa-eye"></i> View Expert Historical Note</summary>
                              <div style="margin-top: 6px; padding: 8px 10px; background: #fef3c7; border-left: 3px solid #b45309; border-radius: 4px; font-size: 0.85rem; color: #78350f;">${ann.model}</div>
                            </details>
                          `
                              : ''
                          }
                        </div>
                      `;
                      })
                      .join('')}
                  </div>
                `
                    : ''
                }
              </div>
            `;
            return;
          }
          if (task.type === 'causal_domino') {
            extrasHtml += `
              <div class="task-box causal-domino-interactive" style="margin-bottom: 25px; background: #f0f9ff; padding: 20px; border-radius: 10px; border: 2px solid #0284c7; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #bae6fd; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #0369a1; font-size: 1.15rem;"><i class="fa-solid fa-cubes-stacked" style="color: #0284c7; margin-right: 8px;"></i> ${task.text || task.question || 'Causal Domino Chain'}</h4>
                  <span style="background: #0284c7; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Causal Chain</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #075985; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                ${
                  task.steps && task.steps.length > 0
                    ? `
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${task.steps
                      .map(
                        (step, sIdx) => `
                      <div style="background: #ffffff; border: 1.5px solid ${step.blank ? '#0284c7' : '#cbd5e1'}; border-left: 5px solid ${sIdx === 0 ? '#0284c7' : sIdx === task.steps.length - 1 ? '#0369a1' : '#0ea5e9'}; border-radius: 8px; padding: 14px; display: flex; align-items: flex-start; gap: 14px;">
                        <div style="background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 0.9rem; padding: 4px 10px; border-radius: 6px; white-space: nowrap;">
                          ${step.stage || 'Step ' + (sIdx + 1)}
                        </div>
                        <div style="flex: 1;">
                          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                            <strong style="color: #0f172a; font-size: 1rem;">${step.title || ''}</strong>
                            ${step.year ? `<span style="font-size: 0.85rem; color: #64748b; font-weight: 600;">${step.year}</span>` : ''}
                          </div>
                          ${step.desc ? `<p style="margin: 0 0 8px 0; font-size: 0.92rem; color: #475569; line-height: 1.4;">${step.desc}</p>` : ''}
                          ${
                            step.blank
                              ? `
                            <textarea style="width: 100%; box-sizing: border-box; min-height: 50px; padding: 8px; border: 1.5px dashed #0284c7; border-radius: 6px; font-size: 0.9rem; font-family: inherit; resize: vertical; background: #f8fafc;" placeholder="${step.prompt || 'Explain the causal link connecting this step...'}"></textarea>
                          `
                              : ''
                          }
                        </div>
                      </div>
                    `,
                      )
                      .join('')}
                  </div>
                `
                    : ''
                }
              </div>
            `;
            return;
          }
          if (task.type === 'word_scalpel' || task.type === 'forensic_autopsy') {
            extrasHtml += `
              <div class="task-box word-scalpel-interactive" style="margin-bottom: 25px; background: #fffbeb; padding: 20px; border-radius: 10px; border: 2px solid #d97706; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #fed7aa; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #92400e; font-size: 1.15rem;"><i class="fa-solid fa-scissors" style="color: #d97706; margin-right: 8px;"></i> ${task.text || task.question || 'Forensic Scalpel: Micro-Quotation Extraction'}</h4>
                  <span style="background: #d97706; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Forensic Scalpel</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #78350f; font-style: italic; margin-top: 0; margin-bottom: 12px;">${task.instruction}</p>` : ''}
                ${
                  task.source_excerpt
                    ? `
                  <div style="font-family: Georgia, serif; font-size: 1rem; color: #1e293b; font-style: italic; background: #ffffff; border-left: 4px solid #d97706; padding: 12px 16px; margin-bottom: 15px; border-radius: 0 6px 6px 0; line-height: 1.6;">
                    &ldquo;${task.source_excerpt}&rdquo;
                  </div>
                `
                    : ''
                }
                <div style="background: #ffffff; border: 2px dashed #b45309; border-radius: 8px; padding: 14px; margin-bottom: 14px;">
                  <div style="font-size: 0.88rem; font-weight: 700; color: #92400e; margin-bottom: 6px;">Extract the Exact 3–6 Word "Smoking Gun" Quote:</div>
                  <input type="text" style="width: 100%; box-sizing: border-box; padding: 10px 14px; font-family: Georgia, serif; font-size: 1.05rem; border: 1px solid #fed7aa; border-radius: 6px; color: #1e293b;" placeholder='e.g. "[ . . . 3 to 6 words . . . ]"'>
                </div>
                ${
                  task.justification_prompt
                    ? `
                  <div style="margin-bottom: 10px;">
                    <label style="display: block; font-size: 0.9rem; font-weight: 700; color: #78350f; margin-bottom: 6px;">Why is this phrase decisive? ${task.justification_prompt}</label>
                    <textarea style="width: 100%; box-sizing: border-box; min-height: 60px; padding: 8px; border: 1px solid #fed7aa; border-radius: 6px; font-size: 0.9rem; font-family: inherit; resize: vertical;" placeholder="${task.starter || 'Type your justification here...'}"></textarea>
                  </div>
                `
                    : ''
                }
                ${
                  task.model_quote
                    ? `
                  <details style="margin-top: 10px;">
                    <summary style="cursor: pointer; color: #b45309; font-weight: 600; font-size: 0.85rem;"><i class="fa-solid fa-eye"></i> Reveal Historian's Scalpel Selection</summary>
                    <div style="margin-top: 6px; padding: 10px 14px; background: #fef3c7; border-left: 3px solid #b45309; border-radius: 4px; font-size: 0.92rem; color: #78350f;">
                      <strong>Smoking Gun:</strong> <em>&ldquo;${task.model_quote}&rdquo;</em><br>
                      ${task.model_answer ? `<span style="font-size: 0.88rem; display: block; margin-top: 4px;">${task.model_answer}</span>` : ''}
                    </div>
                  </details>
                `
                    : ''
                }
              </div>
            `;
            return;
          }
          if (task.type === 'ledger_audit' || task.type === 'balance_sheet') {
            const col1 = task.col1 || { title: 'Column A' };
            const col2 = task.col2 || { title: 'Column B' };
            const rowCount = task.rows || 3;
            extrasHtml += `
              <div class="task-box ledger-audit-interactive" style="margin-bottom: 25px; background: #f8fafc; padding: 20px; border-radius: 10px; border: 2px solid #475569; box-shadow: 0 4px 12px rgba(71, 85, 105, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #cbd5e1; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #1e293b; font-size: 1.15rem;"><i class="fa-solid fa-scale-balanced" style="color: #475569; margin-right: 8px;"></i> ${task.text || task.question || 'Forensic Ledger'}</h4>
                  <span style="background: #475569; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Forensic Ledger</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #475569; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px;">
                    <h5 style="margin: 0 0 10px 0; color: #0f172a; font-size: 1rem; border-bottom: 2px solid #cbd5e1; padding-bottom: 6px;">${col1.title}</h5>
                    ${Array.from({ length: rowCount })
                      .map(
                        (_, r) => `
                      <input type="text" style="width: 100%; box-sizing: border-box; margin-bottom: 8px; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 0.88rem;" placeholder="${col1.hints && col1.hints[r] ? col1.hints[r] : 'Evidence point ' + (r + 1)}">
                    `,
                      )
                      .join('')}
                  </div>
                  <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px;">
                    <h5 style="margin: 0 0 10px 0; color: #0f172a; font-size: 1rem; border-bottom: 2px solid #cbd5e1; padding-bottom: 6px;">${col2.title}</h5>
                    ${Array.from({ length: rowCount })
                      .map(
                        (_, r) => `
                      <input type="text" style="width: 100%; box-sizing: border-box; margin-bottom: 8px; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 0.88rem;" placeholder="${col2.hints && col2.hints[r] ? col2.hints[r] : 'Evidence point ' + (r + 1)}">
                    `,
                      )
                      .join('')}
                  </div>
                </div>
              </div>
            `;
            return;
          }
          if (task.type === 'two_sided_argument') {
            const qNumPrefix = task.qNum ? `Q${task.qNum}. ` : '';
            const adv = task.advancement || {};
            const lim = task.limitations || {};
            const advTitle = adv.title || 'Advancement & Progress (Change)';
            const limTitle = lim.title || 'Critical Limitations & Stagnation (Continuity)';
            const advPoints = adv.points || [];
            const limPoints = lim.points || [];
            const advStarter = adv.starter || adv.sentence_starter || '';
            const limStarter = lim.starter || lim.sentence_starter || '';
            const synthesisPrompt =
              task.synthesis_prompt ||
              'Write a balanced GCSE exam paragraph evaluating both sides.';
            const connectives = task.synthesis_connectives || [
              'Although...',
              'However, in practical terms...',
              'Consequently...',
              'Overall...',
            ];
            const modelAnswer = task.model_answer || task.model || '';

            extrasHtml += `
              <div class="task-box two-sided-argument-interactive" style="margin-bottom: 25px; background: #ffffff; padding: 20px; border-radius: 10px; border: 2px solid #0f766e; box-shadow: 0 4px 12px rgba(15, 118, 110, 0.08);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ccfbf1; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #0f766e; font-size: 1.15rem;"><i class="fa-solid fa-scale-balanced" style="margin-right: 8px;"></i> ${qNumPrefix}${task.topic || task.text || 'Two-Sided Argument Analysis'}</h4>
                  <span style="background: #0f766e; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 6px;"><i class="fa-solid fa-bullseye" style="color: #5eead4;"></i> Target: Paper 1 Q5/Q6 Evaluative Essay [16+4 Marks]</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #475569; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 16px;">
                  <!-- Side 1: Advancement / Progress -->
                  <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 14px;">
                    <h5 style="margin: 0 0 10px 0; color: #166534; font-size: 1rem; border-bottom: 2px solid #86efac; padding-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                      <i class="fa-solid fa-arrow-trend-up"></i> ${advTitle}
                    </h5>
                    <ul style="margin: 0 0 12px 0; padding-left: 18px; color: #1e293b; font-size: 0.9rem; line-height: 1.45;">
                      ${advPoints.map((pt) => `<li style="margin-bottom: 6px;">${pt}</li>`).join('')}
                    </ul>
                    ${advStarter ? `<div style="padding: 8px 10px; background: #ffffff; border-left: 3px solid #22c55e; border-radius: 4px; font-size: 0.85rem; color: #15803d; font-style: italic;"><strong>Evidence Stem:</strong> &ldquo;${advStarter}&rdquo;</div>` : ''}
                  </div>

                  <!-- Side 2: Limitations / Continuity -->
                  <div style="background: #fff1f2; border: 1.5px solid #fecdd3; border-radius: 8px; padding: 14px;">
                    <h5 style="margin: 0 0 10px 0; color: #9f1239; font-size: 1rem; border-bottom: 2px solid #fecdd3; padding-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                      <i class="fa-solid fa-hand"></i> ${limTitle}
                    </h5>
                    <ul style="margin: 0 0 12px 0; padding-left: 18px; color: #1e293b; font-size: 0.9rem; line-height: 1.45;">
                      ${limPoints.map((pt) => `<li style="margin-bottom: 6px;">${pt}</li>`).join('')}
                    </ul>
                    ${limStarter ? `<div style="padding: 8px 10px; background: #ffffff; border-left: 3px solid #f43f5e; border-radius: 4px; font-size: 0.85rem; color: #be123c; font-style: italic;"><strong>Counter-Stem:</strong> &ldquo;${limStarter}&rdquo;</div>` : ''}
                  </div>
                </div>

                <!-- Synthesis: GCSE Paragraph Builder -->
                <div style="background: #fffbeb; border: 1.5px solid #fcd34d; border-radius: 8px; padding: 14px;">
                  <h5 style="margin: 0 0 8px 0; color: #92400e; font-size: 1rem; display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-pen-nib"></i> GCSE Paragraph Builder: Evaluative Synthesis
                  </h5>
                  <p style="font-size: 0.92rem; color: #78350f; font-weight: 600; margin: 0 0 10px 0;">${synthesisPrompt}</p>
                  
                  <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; align-items: center;">
                    <span style="font-size: 0.78rem; font-weight: 700; color: #92400e; text-transform: uppercase;">Analytical Connectives (Click to Insert):</span>
                    ${connectives.map((c) => `<button type="button" class="connective-chip" data-connective="${c.replace(/"/g, '&quot;')}" style="background: #ffffff; border: 1px solid #fde68a; color: #b45309; padding: 3px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.15s ease;" title="Click to insert at cursor">${c}</button>`).join('')}
                  </div>

                  <textarea class="interactive-textarea" style="width: 100%; box-sizing: border-box; min-height: 90px; padding: 10px; border: 1px solid #fde68a; border-radius: 6px; font-size: 0.92rem; font-family: inherit; resize: vertical;" placeholder="Combine the evidence and counter-evidence above to write your complex, balanced GCSE exam paragraph..."></textarea>

                  ${
                    modelAnswer
                      ? `
                    <details class="model-paragraph-reveal" style="margin-top: 12px; border: 1px dashed #d97706; border-radius: 6px; padding: 8px 12px; background: #fffbeb;">
                      <summary style="cursor: pointer; color: #b45309; font-weight: 700; font-size: 0.88rem; outline: none; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-eye"></i> [ Show Examiner-Grade Model Paragraph ]</summary>
                      <div class="scaffold-box model-box" style="margin-top: 10px; padding: 12px 15px; background: #ffffff; border-left: 3px solid #f59e0b; border-radius: 4px; font-size: 0.92rem; color: #78350f; line-height: 1.6; border: 1px solid #fde68a;">
                        ${modelAnswer}
                      </div>
                    </details>
                  `
                      : ''
                  }
                </div>
              </div>
            `;
            return;
          }
          if (task.type === 'historiographical_spectrum' || task.type === 'spectrum') {
            const leftPole = task.pole_left || 'Interpretation A';
            const rightPole = task.pole_right || 'Interpretation B';
            const specId = `spec-slider-${index}-${tIdx}`;
            extrasHtml += `
              <div class="task-box spectrum-interactive" style="margin-bottom: 25px; background: #faf5ff; padding: 20px; border-radius: 10px; border: 2px solid #7c3aed; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ddd6fe; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #5b21b6; font-size: 1.15rem;"><i class="fa-solid fa-arrows-left-right" style="color: #7c3aed; margin-right: 8px;"></i> ${task.text || task.question || 'Historiographical Spectrum'}</h4>
                  <span style="background: #7c3aed; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Interpretation Spectrum</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #6b21a8; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                <div style="background: #ffffff; border: 1px solid #ddd6fe; border-radius: 8px; padding: 18px; margin-bottom: 15px;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.95rem; font-weight: 700; color: #4c1d95; margin-bottom: 12px;">
                    <span style="max-width: 45%;">${leftPole}</span>
                    <span style="max-width: 45%; text-align: right;">${rightPole}</span>
                  </div>
                  <input type="range" min="0" max="100" value="50" id="${specId}" style="width: 100%; cursor: pointer;" oninput="document.getElementById('${specId}-val').innerText = this.value + '%';">
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #6b7280; margin-top: 6px;">
                    <span>0%</span><span>25%</span><span id="${specId}-val" style="font-weight: bold; color: #7c3aed;">50%</span><span>75%</span><span>100%</span>
                  </div>
                </div>
                <div style="margin-bottom: 10px;">
                  <label style="display: block; font-size: 0.9rem; font-weight: 700; color: #5b21b6; margin-bottom: 6px;">Justify your placement along this spectrum:</label>
                  <textarea style="width: 100%; box-sizing: border-box; min-height: 55px; padding: 8px; border: 1px solid #ddd6fe; border-radius: 6px; font-size: 0.9rem; font-family: inherit; resize: vertical;" placeholder="${task.starter || 'I have placed this at... because...'}"></textarea>
                </div>
              </div>
            `;
            return;
          }
          if (task.type === 'crucible_fork') {
            extrasHtml += `
              <div class="task-box crucible-fork-interactive" style="margin-bottom: 25px; background: #fff7ed; padding: 20px; border-radius: 10px; border: 2px solid #ea580c; box-shadow: 0 4px 12px rgba(234, 88, 12, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #fed7aa; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #9a3412; font-size: 1.15rem;"><i class="fa-solid fa-code-branch" style="color: #ea580c; margin-right: 8px;"></i> ${task.text || task.question || 'The Crucible Fork: Decision Dilemma'}</h4>
                  <span style="background: #ea580c; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Decision Dilemma</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #c2410c; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                ${
                  task.options && task.options.length > 0
                    ? `
                  <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px;">
                    ${task.options
                      .map(
                        (opt, oIdx) => `
                      <label style="background: #ffffff; border: 1.5px solid #fed7aa; border-radius: 8px; padding: 12px; display: flex; align-items: flex-start; gap: 10px; cursor: pointer; transition: all 0.2s ease;">
                        <input type="radio" name="fork-${index}-${tIdx}" value="${oIdx}" style="margin-top: 3px;">
                        <div>
                          <strong style="color: #9a3412; font-size: 0.95rem;">Option ${String.fromCharCode(65 + oIdx)}: ${opt.title}</strong>
                          <p style="margin: 4px 0 0 0; font-size: 0.88rem; color: #475569; line-height: 1.4;">${opt.desc}</p>
                        </div>
                      </label>
                    `,
                      )
                      .join('')}
                  </div>
                `
                    : ''
                }
                ${
                  task.risk_prompt
                    ? `
                  <div style="margin-bottom: 10px;">
                    <label style="display: block; font-size: 0.9rem; font-weight: 700; color: #9a3412; margin-bottom: 6px;">Calculated Risk: ${task.risk_prompt}</label>
                    <textarea style="width: 100%; box-sizing: border-box; min-height: 50px; padding: 8px; border: 1px solid #fed7aa; border-radius: 6px; font-size: 0.9rem; font-family: inherit; resize: vertical;" placeholder="${task.starter || 'The primary risk of this decision was...'}"></textarea>
                  </div>
                `
                    : ''
                }
                ${
                  task.historical_outcome
                    ? `
                  <details style="margin-top: 10px;">
                    <summary style="cursor: pointer; color: #ea580c; font-weight: 600; font-size: 0.85rem;"><i class="fa-solid fa-clock-rotate-left"></i> Reveal Historical Reality</summary>
                    <div style="margin-top: 6px; padding: 10px 14px; background: #ffedd5; border-left: 3px solid #ea580c; border-radius: 4px; font-size: 0.92rem; color: #9a3412;">
                      <strong>What Actually Happened:</strong> ${task.historical_outcome}
                    </div>
                  </details>
                `
                    : ''
                }
              </div>
            `;
            return;
          }
          if (
            task.type === 'significance_diamond' ||
            task.type === 'priority_matrix' ||
            task.type === 'factor_hierarchy'
          ) {
            extrasHtml += `
              <div class="task-box significance-diamond-interactive" style="margin-bottom: 25px; background: #ecfdf5; padding: 20px; border-radius: 10px; border: 2px solid #059669; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #a7f3d0; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #065f46; font-size: 1.15rem;"><i class="fa-solid fa-gem" style="color: #059669; margin-right: 8px;"></i> ${task.text || task.question || 'The Significance Diamond: Prioritising Catalysts'}</h4>
                  <span style="background: #059669; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Priority Diamond</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #047857; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                ${
                  task.factors && task.factors.length > 0
                    ? `
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div style="background: #ffffff; border: 1.5px solid #a7f3d0; border-radius: 8px; padding: 12px;">
                      <strong style="color: #065f46; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">Historical Factors Bank:</strong>
                      <div style="display: flex; flex-direction: column; gap: 6px;">
                        ${task.factors
                          .map(
                            (f, fIdx) => `
                          <div style="background: #f0fdf4; border: 1px solid #6ee7b7; border-radius: 6px; padding: 8px 10px; display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: #065f46;">
                            <span style="background: #059669; color: #ffffff; font-weight: bold; font-size: 0.75rem; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;">${String.fromCharCode(65 + fIdx)}</span>
                            <span>${typeof f === 'string' ? f : f.title || f.name}</span>
                          </div>
                        `,
                          )
                          .join('')}
                      </div>
                    </div>
                    <div style="background: #ffffff; border: 1.5px solid #a7f3d0; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;">
                      <div style="text-align: center; width: 100%;">
                        <div style="font-size: 0.72rem; font-weight: 700; color: #047857; text-transform: uppercase;">Top Catalyst (#1 Decisive)</div>
                        <div style="max-width: 180px; margin: 4px auto 0 auto; height: 32px; border: 2px solid #059669; background: #d1fae5; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #065f46; font-size: 0.88rem;">#1 (Slot Factor)</div>
                      </div>
                      <div style="display: flex; gap: 10px; width: 100%; justify-content: center;">
                        <div style="text-align: center; flex: 1;">
                          <div style="font-size: 0.7rem; color: #047857;">Contributing Factor</div>
                          <div style="height: 30px; border: 1.5px dashed #059669; background: #f0fdf4; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.82rem; color: #047857;">#2</div>
                        </div>
                        <div style="text-align: center; flex: 1;">
                          <div style="font-size: 0.7rem; color: #047857;">Contributing Factor</div>
                          <div style="height: 30px; border: 1.5px dashed #059669; background: #f0fdf4; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.82rem; color: #047857;">#3</div>
                        </div>
                      </div>
                      <div style="text-align: center; width: 100%;">
                        <div style="font-size: 0.7rem; color: #64748b;">Marginal / Secondary Factor</div>
                        <div style="max-width: 180px; margin: 4px auto 0 auto; height: 30px; border: 1.5px dashed #94a3b8; background: #f8fafc; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.82rem; color: #64748b;">#4</div>
                      </div>
                    </div>
                  </div>
                `
                    : ''
                }
                <div style="margin-top: 10px;">
                  <label style="display: block; font-size: 0.9rem; font-weight: 700; color: #065f46; margin-bottom: 6px;">Evaluative Justification: ${task.justification_prompt || 'Explain why your #1 factor outweighs the others:'}</label>
                  <textarea style="width: 100%; box-sizing: border-box; min-height: 55px; padding: 8px; border: 1px solid #a7f3d0; border-radius: 6px; font-size: 0.9rem; font-family: inherit; resize: vertical;" placeholder="${task.starter || 'Factor A was the decisive catalyst because...'}"></textarea>
                </div>
              </div>
            `;
            return;
          }
          if (task.type === 'extended_writing' && task.scaffolding) {
            const ansId = `ans-emb-${index}-${tIdx}`;
            const scaf = task.scaffolding || {};
            const structureStrip = scaf.structure_strip || [];
            const starters = scaf.sentence_starters || [];
            const connectives = scaf.connective_bank || [];
            const words = scaf.word_bank || [];
            const questionTitle = task.question || task.text || 'Extended Analytical Writing';

            extrasHtml += `
              <div class="task-box extended-writing-box" style="margin-bottom: 25px; background: #ffffff; padding: 22px; border-radius: 10px; border: 2px solid #0284c7; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.12);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 2px solid #e0f2fe; padding-bottom: 12px;">
                  <h4 style="margin: 0; color: #0369a1; font-size: 1.15rem; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-feather-pointed" style="color: #0284c7;"></i>
                    <span>${window.formatBold ? window.formatBold(questionTitle) : questionTitle}</span>
                  </h4>
                  <span style="background: #0284c7; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">GCSE Analytical Masterclass</span>
                </div>
                ${scaf.guidance ? `<p style="font-size: 0.95rem; color: #334155; margin-top: 0; margin-bottom: 16px; line-height: 1.5;">${scaf.guidance}</p>` : ''}

                ${
                  structureStrip.length > 0
                    ? `
                  <div style="margin-bottom: 18px;">
                    <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: #0284c7; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                      <i class="fa-solid fa-layer-group"></i> Analytical Structure Strip
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 10px;">
                      ${structureStrip
                        .map((step, sIdx) => {
                          const isScholar =
                            step.col && (step.col.includes('Scholar') || step.col.includes('★'));
                          const borderCol = isScholar
                            ? '#8b5cf6'
                            : sIdx === 0
                              ? '#0284c7'
                              : sIdx === 1
                                ? '#059669'
                                : '#d97706';
                          const bgCol = isScholar ? '#fbf7ff' : '#f8fafc';
                          const badgeCol = isScholar ? '#7c3aed' : borderCol;
                          return `
                          <div style="background: ${bgCol}; border: 1.5px solid ${borderCol}; border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                              <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: ${badgeCol}; margin-bottom: 4px;">
                                ${step.col}
                              </div>
                              <div style="font-size: 0.84rem; color: #1e293b; line-height: 1.4; margin-bottom: 8px;">
                                ${step.prompt}
                              </div>
                            </div>
                            ${
                              step.starter
                                ? `
                              <div style="font-size: 0.78rem; font-style: italic; color: #475569; border-left: 2px solid ${badgeCol}; padding-left: 6px; margin-top: 4px;">
                                "${step.starter}"
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
                `
                    : ''
                }

                ${
                  starters.length > 0 || connectives.length > 0 || words.length > 0
                    ? `
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 16px;">
                    ${
                      words.length > 0
                        ? `
                      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px;">
                        <strong style="display: block; font-size: 0.75rem; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; margin-bottom: 6px;">
                          GCSE Key Vocabulary Bank
                        </strong>
                        <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                          ${words.map((w) => `<span style="background: #e2e8f0; color: #1e293b; font-size: 0.74rem; font-weight: 600; padding: 2px 7px; border-radius: 4px;">${w}</span>`).join('')}
                        </div>
                      </div>
                    `
                        : ''
                    }
                    ${
                      connectives.length > 0
                        ? `
                      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 12px;">
                        <strong style="display: block; font-size: 0.75rem; text-transform: uppercase; color: #15803d; letter-spacing: 0.5px; margin-bottom: 6px;">
                          Causal Connectives Bank
                        </strong>
                        <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                          ${connectives.map((c) => `<span style="background: #dcfce7; color: #166534; font-size: 0.74rem; font-weight: 600; padding: 2px 7px; border-radius: 4px;">${c}</span>`).join('')}
                        </div>
                      </div>
                    `
                        : ''
                    }
                  </div>
                `
                    : ''
                }

                ${
                  starters.length > 0
                    ? `
                  <details style="margin-bottom: 14px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 8px 12px;">
                    <summary style="cursor: pointer; font-size: 0.84rem; font-weight: 700; color: #1d4ed8;"><i class="fa-solid fa-pen-fancy"></i> Expand Master Sentence Starters Bank (${starters.length} prompts)</summary>
                    <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 0.85rem; color: #1e40af; line-height: 1.5;">
                      ${starters.map((s) => `<li style="margin-bottom: 4px;">${s}</li>`).join('')}
                    </ul>
                  </details>
                `
                    : ''
                }

                <div style="margin-bottom: 14px;">
                  <label style="display: block; font-size: 0.88rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">Pupil Extended Writing Area:</label>
                  <textarea style="width: 100%; box-sizing: border-box; min-height: 130px; padding: 10px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; line-height: 1.6; font-family: inherit; resize: vertical;" placeholder="Compose your 3-paragraph historical evaluation here using the structure strip and connectives..."></textarea>
                </div>

                <div>
                  <button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-reveal" data-action="toggle-element" data-target-id="${ansId}"><i class="fa-solid fa-eye"></i> Reveal Master Model Answer</button>
                  <div class="answer" id="${ansId}" style="display: none; margin-top: 12px; background: #fffbeb; padding: 14px 16px; border-left: 4px solid #b45309; border-radius: 4px; color: #451a03; line-height: 1.7; font-size: 0.95rem;">
                    <div style="font-weight: 800; font-size: 0.8rem; text-transform: uppercase; color: #92400e; margin-bottom: 6px; letter-spacing: 0.5px;">Master Model Answer:</div>
                    ${task.model_answer || task.model || task.answer || ''}
                  </div>
                </div>
              </div>
            `;
            return;
          }
          const qPrefix = task.qNum ? `Q${task.qNum}. ` : '';
          const taskPrompt = task.text || task.question || task.instructions || task.prompt || '';
          const cleanTaskText = taskPrompt.replace(/^Q\d+[\.\:]\s*/i, '');
          const taskTitle =
            task.title && task.title !== taskPrompt && !cleanTaskText.startsWith(task.title)
              ? task.title
              : '';
          const titleHtml = taskTitle
            ? `<div style="font-weight: 800; font-size: 0.92rem; color: #92400e; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">${window.formatBold(taskTitle)}</div>`
            : '';
          const ansId = `ans-emb-${index}-${tIdx}`;
          const starterText =
            task.starter ||
            task.sentence_starter ||
            (task.scaffolding && (task.scaffolding.starter || task.scaffolding.sentence_starter));
          const starterBtn = starterText
            ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-starter" data-action="toggle-element" data-target-id="starter-${ansId}"><i class="fa-solid fa-pen"></i> Starter</button>`
            : '';
          const starterDiv = starterText
            ? `<div class="starter-box" id="starter-${ansId}" style="display: none; margin-top: 8px; background: #f0f9ff; padding: 10px; border-left: 3px solid #0284c7; font-style: italic; color: #0c4a6e; transition: all 0.3s ease;">${starterText}</div>`
            : '';
          let flowchartHtml = '';
          if (task.flowchart) {
            const fc = task.flowchart;
            flowchartHtml = `
              <div class="dual-coding-flowchart" style="margin: 10px 0 16px 0; padding: 12px 14px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px;">
                <div style="font-weight: 800; font-size: 0.92rem; color: #0f172a; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                  <span>${fc.title}</span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                  ${fc.steps
                    .map(
                      (s, sIdx) => `
                    <div style="background: white; border: 1px solid #cbd5e1; border-top: 3.5px solid ${sIdx === 0 ? '#0284c7' : sIdx === 1 ? '#d97706' : '#dc2626'}; border-radius: 6px; padding: 10px;">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                        <span style="font-weight: 800; font-size: 0.78rem; background: #f1f5f9; color: #334155; width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">${s.num}</span>
                        <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: ${sIdx === 0 ? '#0284c7' : sIdx === 1 ? '#d97706' : '#dc2626'}; background: #f8fafc; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0;">${s.badge}</span>
                      </div>
                      <div style="font-weight: 700; font-size: 0.85rem; color: #0f172a; margin-bottom: 3px;">${s.title}</div>
                      <div style="font-size: 0.78rem; color: #475569; line-height: 1.35;">${s.desc}</div>
                    </div>
                  `,
                    )
                    .join('')}
                </div>
              </div>
            `;
          }
          extrasHtml += `
               <div style="margin-bottom: 14px;">
                 ${flowchartHtml}
                 ${titleHtml}
                 <div style="font-size: 1.05rem; line-height: 1.6; color: #1e293b; margin-bottom: 8px;">${window.formatBold(qPrefix + cleanTaskText)}</div>
                 <button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-reveal" data-action="toggle-element" data-target-id="${ansId}"><i class="fa-solid fa-eye"></i> Show</button>
                 ${starterBtn}
                 ${starterDiv}
                 <div class="answer" id="${ansId}" style="display: none; margin-top: 8px; background: white; padding: 10px; border-left: 3px solid #b45309; font-style: italic; color: #451a03; line-height: 1.6;">${window.formatBold(task.model || task.model_answer || task.answer || '')}</div>
               </div>
             `;
        });
        extrasHtml += `</div>`;

        if (block.flashcards && block.flashcards.length > 0) {
          extrasHtml += `<div style="margin-top: 20px; padding: 20px; background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 8px;"><div class="flashcard-deck">`;
          block.flashcards.forEach((fc) => {
            let t = fc.term || fc.word || fc.title || '';
            let d = fc.definition || fc.meaning || fc.desc || '';
            extrasHtml += `
                <div class="flashcard-wrapper" data-action="flip-card-wrapper">
                  <div class="flashcard-inner">
                    <div class="flashcard-face flashcard-front">
                      <h4>${t}</h4>
                      <p style="font-size: 0.9rem; margin-top: 10px;">Tap to reveal</p>
                    </div>
                    <div class="flashcard-face flashcard-back">
                      ${d}
                    </div>
                  </div>
                </div>
              `;
          });
          extrasHtml += `</div></div>`;
        }
      }

      let isSideQuest =
        styledContent.includes('</details>') && block.title && block.title.includes('Side Quest');
      if (isSideQuest) {
        styledContent = styledContent.replace('</details>', extrasHtml + '</details>');
        extrasHtml = '';
        // Rewrite the actual styledContent in the narrative chunk manually below
      }

      htmlNarrative += extrasHtml;
    });
    htmlNarrative += '</div>';

    if (!isTrip) {
      if (lesson.tasks && lesson.tasks.length > 0) {
        let hasModels = false;
        if (lesson.tasks) {
          hasModels = lesson.tasks.some((t) => !!t.model);
        }

        const revealBtn = hasModels
          ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-model" data-action="reveal-all-models"><i class="fa-solid fa-magnifying-glass"></i> Reveal All Models</button>`
          : '';

        htmlTasks += `
            <div class="phase-card">
              <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 20px;">
                
                ${revealBtn}
              </div>
          `;

        lesson.tasks.forEach((task, tIdx) => {
          if (task.type === 'drag_drop_timeline') {
            const timelineId = `dd-timeline-lesson-${tIdx}`;
            htmlTasks += `<div id="${timelineId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../drag_drop_timeline.js').then((mod) => {
                mod.initDragDropTimeline(document.getElementById(timelineId), task);
              });
            });
            return;
          }
          if (task.type === 'interactive_map') {
            const mapId = `interactive-map-lesson-${tIdx}`;
            htmlTasks += `<div id="${mapId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../interactive_map.js').then((mod) => {
                mod.initInteractiveMap(document.getElementById(mapId), task);
              });
            });
            return;
          }
          if (task.type === 'two_sided_argument') {
            const qNumPrefix = task.qNum ? `Q${task.qNum}. ` : '';
            const adv = task.advancement || {};
            const lim = task.limitations || {};
            const advTitle = adv.title || 'Advancement & Progress (Change)';
            const limTitle = lim.title || 'Critical Limitations & Stagnation (Continuity)';
            const advPoints = adv.points || [];
            const limPoints = lim.points || [];
            const advStarter = adv.starter || adv.sentence_starter || '';
            const limStarter = lim.starter || lim.sentence_starter || '';
            const synthesisPrompt =
              task.synthesis_prompt ||
              task.question ||
              'Write a balanced GCSE exam paragraph evaluating both sides.';
            const connectives = task.synthesis_connectives || [
              'On the one hand...',
              'For example...',
              'On the other hand...',
              'Consequently...',
              'Overall, while...',
            ];
            const modelAnswer = task.model_answer || task.model || '';

            htmlTasks += `
              <div class="task-box two-sided-argument-interactive" style="margin-bottom: 25px; background: #ffffff; padding: 20px; border-radius: 10px; border: 2px solid #0f766e; box-shadow: 0 4px 12px rgba(15, 118, 110, 0.08);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ccfbf1; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #0f766e; font-size: 1.15rem;"><i class="fa-solid fa-scale-balanced" style="margin-right: 8px;"></i> ${qNumPrefix}${task.topic || task.text || 'Two-Sided Argument Analysis'}</h4>
                  <span style="background: #0f766e; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 6px;"><i class="fa-solid fa-bullseye" style="color: #5eead4;"></i> Target: Paper 1 Q5/Q6 Evaluative Essay [16+4 Marks]</span>
                </div>
                ${task.question ? `<div style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin-bottom: 10px; line-height: 1.5; padding: 10px 14px; background: #f0fdf4; border-left: 4px solid #0f766e; border-radius: 0 6px 6px 0;"><strong>Question:</strong> ${task.question}</div>` : ''}
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #475569; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 16px;">
                  <!-- Side 1: Advancement / Progress -->
                  <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 14px;">
                    <h5 style="margin: 0 0 10px 0; color: #166534; font-size: 1rem; border-bottom: 2px solid #86efac; padding-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                      <i class="fa-solid fa-arrow-trend-up"></i> ${advTitle}
                    </h5>
                    <ul style="margin: 0 0 12px 0; padding-left: 18px; color: #1e293b; font-size: 0.9rem; line-height: 1.45;">
                      ${advPoints.map((pt) => `<li style="margin-bottom: 6px;">${pt}</li>`).join('')}
                    </ul>
                    ${advStarter ? `<div style="padding: 8px 10px; background: #ffffff; border-left: 3px solid #22c55e; border-radius: 4px; font-size: 0.85rem; color: #15803d; font-style: italic;"><strong>Evidence Stem:</strong> &ldquo;${advStarter}&rdquo;</div>` : ''}
                  </div>

                  <!-- Side 2: Limitations / Continuity -->
                  <div style="background: #fff1f2; border: 1.5px solid #fecdd3; border-radius: 8px; padding: 14px;">
                    <h5 style="margin: 0 0 10px 0; color: #9f1239; font-size: 1rem; border-bottom: 2px solid #fecdd3; padding-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                      <i class="fa-solid fa-hand"></i> ${limTitle}
                    </h5>
                    <ul style="margin: 0 0 12px 0; padding-left: 18px; color: #1e293b; font-size: 0.9rem; line-height: 1.45;">
                      ${limPoints.map((pt) => `<li style="margin-bottom: 6px;">${pt}</li>`).join('')}
                    </ul>
                    ${limStarter ? `<div style="padding: 8px 10px; background: #ffffff; border-left: 3px solid #f43f5e; border-radius: 4px; font-size: 0.85rem; color: #be123c; font-style: italic;"><strong>Counter-Stem:</strong> &ldquo;${limStarter}&rdquo;</div>` : ''}
                  </div>
                </div>

                <!-- Synthesis: GCSE Paragraph Builder -->
                <div style="background: #fffbeb; border: 1.5px solid #fcd34d; border-radius: 8px; padding: 14px;">
                  <h5 style="margin: 0 0 8px 0; color: #92400e; font-size: 1rem; display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-pen-nib"></i> GCSE Paragraph Builder: Evaluative Synthesis
                  </h5>
                  <p style="font-size: 0.92rem; color: #78350f; font-weight: 600; margin: 0 0 10px 0;">${synthesisPrompt}</p>
                  
                  <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; align-items: center;">
                    <span style="font-size: 0.78rem; font-weight: 700; color: #92400e; text-transform: uppercase;">Analytical Connectives (Click to Insert):</span>
                    ${connectives.map((c) => `<button type="button" class="connective-chip" data-connective="${c.replace(/"/g, '&quot;')}" style="background: #ffffff; border: 1px solid #fde68a; color: #b45309; padding: 3px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.15s ease;" title="Click to insert at cursor">${c}</button>`).join('')}
                  </div>

                  <textarea class="interactive-textarea" style="width: 100%; box-sizing: border-box; min-height: 90px; padding: 10px; border: 1px solid #fde68a; border-radius: 6px; font-size: 0.92rem; font-family: inherit; resize: vertical;" placeholder="Combine the evidence and counter-evidence above to write your complex, balanced GCSE exam paragraph..."></textarea>

                  ${
                    modelAnswer
                      ? `
                    <details class="model-paragraph-reveal" style="margin-top: 12px; border: 1px dashed #d97706; border-radius: 6px; padding: 8px 12px; background: #fffbeb;">
                      <summary style="cursor: pointer; color: #b45309; font-weight: 700; font-size: 0.88rem; outline: none; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-eye"></i> [ Show Examiner-Grade Model Paragraph ]</summary>
                      <div class="scaffold-box model-box" style="margin-top: 10px; padding: 12px 15px; background: #ffffff; border-left: 3px solid #f59e0b; border-radius: 4px; font-size: 0.92rem; color: #78350f; line-height: 1.6; border: 1px solid #fde68a;">
                        ${modelAnswer}
                      </div>
                    </details>
                  `
                      : ''
                  }
                </div>
              </div>
            `;
            return;
          }
          let rawQText = typeof task === 'string' ? task : task.question || task.text || '';
          let cleaned = rawQText.replace(/^(Enquiry:|Q\d+:|Task \d+:|Question \d+[a-z]?:)\s*/i, '');
          let qText = typeof formatBold !== 'undefined' ? formatBold(cleaned) : cleaned;
          let clueParaMatch = qText.match(/\((P|Para\s*)(\d+)\)$/i);
          let clueBtn = '';
          if (clueParaMatch) {
            qText = qText.replace(clueParaMatch[0], '').trim();
            clueBtn = `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-clue" title="Find Evidence" data-action="scroll-to-para" data-target="para-${clueParaMatch[2]}"><i class="fa-solid fa-magnifying-glass"></i></button>`;
          }

          let match = qText.match(/^([A-Za-z0-9'\-\/ ]+):\s*([\s\S]*)/);
          let displayHeading = '';
          if (task.topic) {
            displayHeading = `<div style="font-size: 1.15rem; color: #0284c7; margin-bottom: 6px; font-weight: 800;">${task.topic}</div>`;
          } else if (match && match[2] && match[2].length > 15) {
            displayHeading = `<div style="font-size: 1.15rem; color: #0284c7; margin-bottom: 6px; font-weight: 800;">${match[1]}</div>`;
            qText = match[2];
          }
          if (qText && qText.includes('\n')) {
            qText = qText.replace(/\n/g, '<br>');
          }

          htmlTasks += `
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              ${displayHeading}
              <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                ${task.qNum ? `Q${task.qNum}. ` : ''}${qText}
                <span style="display: inline-flex; vertical-align: middle;">
                  ${clueBtn}
                  ${task.starter ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-starter" title="Sentence Starter" data-action="toggle-element" data-target-id="starter-${tIdx}"><i class="fa-solid fa-pen"></i></button>` : ''}
                  ${task.clue ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-clue" title="Clue" data-action="toggle-element" data-target-id="clue-${tIdx}"><i class="fa-solid fa-lightbulb"></i></button>` : ''}
                  ${task.model || task.model_answer || task.answer ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-model" title="Reveal Model Answer" data-action="toggle-element" data-target-id="model-${tIdx}"><i class="fa-solid fa-check-double"></i></button>` : ''}
                </span>
              </div>
              <textarea class="student-answer-input" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>

              ${task.starter ? `<div id="starter-${tIdx}" class="scaffold-box starter-box" style="display:none;"><strong>Sentence Starter:</strong> ${task.starter}</div>` : ''}
              ${task.clue ? `<div id="clue-${tIdx}" class="scaffold-box clue-box" style="display:none;"><strong>Clue Hint:</strong> ${task.clue}</div>` : ''}
              ${task.model || task.model_answer || task.answer ? `<div id="model-${tIdx}" class="scaffold-box model-box" style="display:none;">${formatBold(task.model || task.model_answer || task.answer)}</div>` : ''}
            </div>
          `;
        });
      }
      htmlTasks += `</div>`;
    }

    if (lesson.essay_planning) {
      const ep = lesson.essay_planning;
      htmlHistorian += `
        <div class="phase-card essay-planning-card" style="margin-top: 30px; border: 2px solid #2563eb; border-radius: 10px; background: #ffffff; overflow: hidden; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); color: #ffffff; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.25rem;">⚖️</span>
              <div>
                <h3 style="margin: 0; font-size: 1.15rem; font-family: 'Playfair Display', serif; color: #ffffff;">16-Mark Essay Planning Matrix (2&times;2)</h3>
                <span style="font-size: 0.75rem; color: #bfdbfe; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Edexcel Paper 1 &bull; Section B (Q5/Q6) &bull; ${ep.marks || '16 Marks + 4 SPaG'}</span>
              </div>
            </div>
            <span style="background: rgba(255, 255, 255, 0.2); color: #ffffff; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 20px;">Target: Level 4 (13–16 Marks)</span>
          </div>
          
          <div style="padding: 20px;">
            <div style="background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 0 6px 6px 0; padding: 12px 16px; margin-bottom: 18px;">
              <div style="font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Statement to Evaluate:</div>
              <div style="font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.4;">${ep.statement}</div>
              ${ep.stimulus && ep.stimulus.length > 0 ? `<div style="font-size: 0.85rem; color: #475569; margin-top: 6px;"><strong>Stimulus points provided:</strong> ${ep.stimulus.join(' &bull; ')} <em>(You must also use information of your own)</em></div>` : ''}
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 18px;">
              <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 16px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; border-bottom: 1.5px solid #bbf7d0; padding-bottom: 8px;">
                  <span style="background: #16a34a; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 900;">✓</span>
                  <strong style="color: #166534; font-size: 0.92rem; text-transform: uppercase; letter-spacing: 0.5px;">Factors Supporting Statement (Agree)</strong>
                </div>
                <ul style="margin: 0; padding-left: 18px; color: #14532d; font-size: 0.9rem; line-height: 1.55;">
                  ${(ep.supporting_factors || []).map((f) => `<li style="margin-bottom: 8px;">${formatBold(f)}</li>`).join('')}
                </ul>
              </div>

              <div style="background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; padding: 16px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; border-bottom: 1.5px solid #bfdbfe; padding-bottom: 8px;">
                  <span style="background: #2563eb; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 900;">⇄</span>
                  <strong style="color: #1e40af; font-size: 0.92rem; text-transform: uppercase; letter-spacing: 0.5px;">Counter-Factors / Other Factors (Disagree)</strong>
                </div>
                <ul style="margin: 0; padding-left: 18px; color: #1e3a8a; font-size: 0.9rem; line-height: 1.55;">
                  ${(ep.counter_factors || []).map((f) => `<li style="margin-bottom: 8px;">${formatBold(f)}</li>`).join('')}
                </ul>
              </div>
            </div>

            ${
              ep.criteria_prompt
                ? `
            <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="color: #b45309; font-weight: bold;">⚖️</span>
                <strong style="color: #92400e; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.5px;">Level 4 Evaluative Judgment Criteria:</strong>
              </div>
              <p style="margin: 0; font-size: 0.9rem; color: #78350f; line-height: 1.5; font-style: italic;">
                ${formatBold(ep.criteria_prompt)}
              </p>
            </div>`
                : ''
            }

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #475569; margin-bottom: 6px;">
                <i class="fa-solid fa-pen-to-square"></i> Student Planning Scratchpad (Prioritize your factor hierarchy &amp; concluding judgment):
              </label>
              <textarea class="student-answer-input" placeholder="Jot down your 3 paragraph themes (1 agree, 2 other factors) and your overall criteria-based verdict here..." style="min-height: 80px; width: 100%; box-sizing: border-box;"></textarea>
            </div>
          </div>
        </div>
      `;
    }
  }

  if (lesson.pair_share) {
    const ps = lesson.pair_share;
    const thinkText = ps.think || 'Consider the key historical factors discussed in this lesson.';
    const pairText =
      ps.pair ||
      'Discuss your ideas with your partner. Compare your reasons and evidence, and refine your explanation.';
    const shareText =
      ps.share ||
      'Be prepared to share your argument with the class using analytical sentence starters.';
    const startersHtml =
      ps.starters && ps.starters.length > 0
        ? `<div style="margin-top: 15px; background: white; padding: 12px 16px; border-radius: 6px; border-left: 4px solid #10b981; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
             <strong style="color: #065f46; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">Sentence Starters:</strong>
             ${ps.starters.map((s) => `<div style="font-size: 0.95rem; color: #166534; margin-top: 4px;">• <em>${s}</em></div>`).join('')}
           </div>`
        : '';
    htmlPairShare += `
        <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 15px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
            <summary style="padding: 10px 15px; cursor: pointer; color: #059669; font-weight: bold; font-size: 1.05rem; background: #ecfdf5; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #a7f3d0;">
              <span><i class="fa-solid fa-users" style="color: #059669; margin-right: 10px;"></i> Think, Pair, Share</span>
            </summary>
            <div style="padding: 20px; background: #ecfdf5;">
              <p style="font-size: 1.15rem; font-weight: 700; color: #065f46; margin-top: 0;">${ps.qNum ? `Q${ps.qNum}. ` : ''}${ps.prompt}</p>
              ${
                ps.dilemma_scale
                  ? `
                <div class="dilemma-scale-box" style="margin: 15px 0 20px 0; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
                  <div style="text-align: center; font-weight: 800; color: #1e3a8a; font-size: 1rem; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <i class="fa-solid fa-scale-balanced" style="color: #0284c7;"></i> ${ps.dilemma_scale.title}
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; align-items: stretch;">
                    <div style="background: #fef2f2; border: 1px solid #fecaca; border-top: 3px solid #ef4444; border-radius: 6px; padding: 12px;">
                      <div style="font-weight: 700; color: #b91c1c; font-size: 0.92rem; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
                        <span>${ps.dilemma_scale.side_a.actor}</span>
                        <span style="font-size: 0.75rem; background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 4px;">${ps.dilemma_scale.side_a.tag}</span>
                      </div>
                      <ul style="margin: 6px 0 0 0; padding-left: 16px; font-size: 0.85rem; color: #7f1d1d; line-height: 1.45;">
                        ${ps.dilemma_scale.side_a.points.map((p) => `<li style="margin-bottom: 4px;">${p}</li>`).join('')}
                      </ul>
                    </div>
                    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-top: 3px solid #3b82f6; border-radius: 6px; padding: 12px;">
                      <div style="font-weight: 700; color: #1d4ed8; font-size: 0.92rem; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
                        <span>${ps.dilemma_scale.side_b.actor}</span>
                        <span style="font-size: 0.75rem; background: #dbeafe; color: #1e40af; padding: 2px 6px; border-radius: 4px;">${ps.dilemma_scale.side_b.tag}</span>
                      </div>
                      <ul style="margin: 6px 0 0 0; padding-left: 16px; font-size: 0.85rem; color: #1e3a8a; line-height: 1.45;">
                        ${ps.dilemma_scale.side_b.points.map((p) => `<li style="margin-bottom: 4px;">${p}</li>`).join('')}
                      </ul>
                    </div>
                  </div>
                  <div style="text-align: center; margin-top: 10px; font-size: 0.82rem; font-weight: 700; color: #64748b;">
                    <i class="fa-solid fa-arrows-split-up-and-left" style="color: #0f172a; margin-right: 4px;"></i> Pivot: ${ps.dilemma_scale.pivot}
                  </div>
                </div>
              `
                  : ''
              }
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <span><i class="fa-solid fa-brain"></i> 1. Think</span>
                    <button data-action="start-tps-timer" style="background: #10b981; color: white; border: none; border-radius: 4px; padding: 3px 8px; cursor: pointer; font-size: 0.85rem; font-weight: bold;"><i class="fa-regular fa-clock"></i> 60s</button>
                  </div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">${thinkText}</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-comments"></i> 2. Pair</div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">${pairText}</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-users"></i> 3. Share</div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">${shareText}</p>
                 </div>
              </div>
              ${startersHtml}
            </div>
          </details>
      `;
  }

  if (lesson.exam_practice) {
    let epQuestions = [];
    let epStimulus = [];
    if (Array.isArray(lesson.exam_practice)) {
      epQuestions = lesson.exam_practice;
    } else {
      epQuestions = lesson.exam_practice.questions || [];
      epStimulus = lesson.exam_practice.stimulus || [];
    }

    if (epQuestions.length > 0 || epStimulus.length > 0) {
      htmlExamPractice += `
          <div class="phase-card" style="margin-top: 30px; border: 2px solid #3b82f6; border-radius: 8px;">
            <div style="background: #eff6ff; padding: 15px; border-bottom: 2px solid #bfdbfe; border-radius: 6px 6px 0 0; margin: -20px -20px 20px -20px; display: flex; justify-content: space-between; align-items: center;">
              <h3 style="margin: 0; color: #1e3a8a; font-size: 1.2rem;"><i class="fa-solid fa-graduation-cap"></i> Assessment Practice</h3>
              <button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-model" data-action="reveal-all-models"><i class="fa-solid fa-magnifying-glass"></i> Reveal All Models</button>
            </div>
        `;
      const renderQuestion = (q, qIdx) => {
        let scaffoldHtml = '';
        if (q.scaffolding) {
          const sc = q.scaffolding;
          const stepsHtml = (sc.steps || [])
            .map(
              (step) => `
            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #2563eb; border-radius: 6px; padding: 10px 14px; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="background: #1e40af; color: #ffffff; font-weight: 800; font-size: 0.8rem; padding: 2px 8px; border-radius: 4px; font-family: monospace;">${step.letter}</span>
                <strong style="color: #0f172a; font-size: 0.95rem;">${step.name}</strong>
              </div>
              <div style="font-size: 0.9rem; color: #334155; margin-bottom: 4px;">${step.prompt}</div>
              ${step.starter ? `<div style="font-size: 0.85rem; color: #1e40af; font-style: italic; background: #f0f9ff; padding: 4px 8px; border-radius: 4px;"><strong>Starter:</strong> "${step.starter}"</div>` : ''}
            </div>
          `,
            )
            .join('');

          const startersHtml =
            sc.sentence_starters && sc.sentence_starters.length > 0
              ? `
            <div style="margin-top: 10px;">
              <strong style="font-size: 0.85rem; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-pen-fancy" style="color: #3b82f6;"></i> Model Sentence Starters:</strong>
              <ul style="margin: 6px 0 0 0; padding-left: 20px; font-size: 0.9rem; color: #334155; line-height: 1.5;">
                ${sc.sentence_starters.map((st) => `<li><em>"${st}"</em></li>`).join('')}
              </ul>
            </div>
          `
              : '';

          const connectivesHtml =
            sc.connectives_bank && sc.connectives_bank.length > 0
              ? `
            <div style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center;">
              <span style="font-size: 0.8rem; font-weight: bold; color: #64748b; text-transform: uppercase;">Causal Connective Bank:</span>
              ${sc.connectives_bank.map((conn) => `<span style="background: #e2e8f0; color: #1e293b; font-size: 0.8rem; font-weight: 600; padding: 2px 8px; border-radius: 12px;">${conn}</span>`).join('')}
            </div>
          `
              : '';

          const redFlagsHtml =
            sc.red_flags && sc.red_flags.length > 0
              ? `
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 10px 12px; margin-top: 12px;">
              <strong style="font-size: 0.85rem; color: #b91c1c; text-transform: uppercase; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-triangle-exclamation"></i> Examiner Red Flags:</strong>
              <ul style="margin: 6px 0 0 0; padding-left: 18px; font-size: 0.85rem; color: #991b1b; line-height: 1.4;">
                ${sc.red_flags.map((rf) => `<li>${rf}</li>`).join('')}
              </ul>
            </div>
          `
              : '';

          const checklistHtml =
            sc.checklist && sc.checklist.length > 0
              ? `
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 10px 12px; margin-top: 10px;">
              <strong style="font-size: 0.85rem; color: #15803d; text-transform: uppercase; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-square-check"></i> Self-Audit Checklist:</strong>
              <ul style="margin: 6px 0 0 0; padding-left: 18px; font-size: 0.85rem; color: #166534; line-height: 1.4;">
                ${sc.checklist.map((cl) => `<li>${cl}</li>`).join('')}
              </ul>
            </div>
          `
              : '';

          scaffoldHtml = `
            <div style="margin: 12px 0 16px 0;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                <span style="background: #eff6ff; border: 1px solid #93c5fd; color: #1e40af; font-size: 0.85rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px;">
                  <i class="fa-solid fa-layer-group" style="margin-right: 6px;"></i> ${sc.acronym || 'PEE/PEEL Structure Strip'}
                </span>
                <button class="btn btn-pedagogy btn-pedagogy-sm" data-action="toggle-element" data-target-id="ep-scaffold-${qIdx}" style="background: #f1f5f9; color: #1e3a8a; border: 1px solid #cbd5e1; font-weight: 600;">
                  <i class="fa-solid fa-wand-magic-sparkles" style="color: #2563eb;"></i> PEE/PEEL Structure Strip &amp; Tips
                </button>
              </div>
              <div id="ep-scaffold-${qIdx}" class="scaffold-box" style="display: block; background: #f8fafc; border: 1.5px solid #93c5fd; border-radius: 8px; padding: 16px; margin-top: 8px;">
                <div style="font-weight: 700; color: #1e3a8a; font-size: 1.05rem; margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-sitemap" style="color: #3b82f6;"></i> ${sc.acronym_title || 'Exam Technique Formula'}
                </div>
                ${sc.guidance ? `<p style="font-size: 0.9rem; color: #475569; margin: 0 0 12px 0; font-style: italic;">${sc.guidance}</p>` : ''}
                ${stepsHtml}
                ${startersHtml}
                ${connectivesHtml}
                ${redFlagsHtml}
                ${checklistHtml}
              </div>
            </div>
          `;
        }

        const is4Mark =
          (q.tariff && q.tariff.includes('4')) ||
          q.type === '4-mark' ||
          (lesson.exam_practice && lesson.exam_practice.type === 'consequence_4m');
        let stampHtml = '';
        if (is4Mark) {
          stampHtml = `
            <div class="edexcel-peel-stamp" style="margin: 10px 0 16px 0; border: 2px solid #0284c7; border-radius: 8px; background: #f0f9ff; padding: 12px 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1.5px solid #bae6fd; padding-bottom: 6px;">
                <span style="font-weight: 800; font-size: 0.92rem; color: #0369a1; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-stamp" style="margin-right: 6px;"></i> Edexcel 4-Mark Consequence PEE Structure Strip</span>
                <span style="background: #0284c7; color: white; font-size: 0.78rem; font-weight: 700; padding: 2px 8px; border-radius: 12px;">[4 marks &bull; 5 mins]</span>
              </div>
              <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; font-size: 0.88rem; line-height: 1.4; color: #0f172a;">
                <span style="background: #0284c7; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">P</span>
                <div><strong>Point (Consequence):</strong> <em>"One significant consequence of [Event] was..."</em> (Directly state the resulting change)</div>
                <span style="background: #0284c7; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">E</span>
                <div><strong>Evidence (Historical Detail):</strong> <em>"Specifically, [names, dates, treaties, or figures]..."</em> (Deploy precise factual proof)</div>
                <span style="background: #0284c7; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">E</span>
                <div><strong>Explanation (Causal Impact):</strong> <em>"This resulted in... / Consequently, this led to..."</em> (Explain the ongoing historical effect)</div>
              </div>
            </div>
          `;
        }

        const promptHtml = q.prompt
          ? `
          <div style="font-size: 0.95rem; color: #334155; margin-bottom: 12px; line-height: 1.5; background: #f8fafc; padding: 10px 14px; border-left: 3px solid #64748b; border-radius: 4px;">
            <strong><i class="fa-solid fa-circle-info" style="color: #3b82f6; margin-right: 6px;"></i> Guidance:</strong> ${q.prompt}
          </div>
        `
          : '';

        return `
          <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
            <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
              ${formatQuestion(q.question)}
              <span style="display: inline-flex; vertical-align: middle;">
                ${q.model ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-model" title="Reveal Model Answer" data-action="toggle-element" data-target-id="ep-model-${qIdx}"><i class="fa-solid fa-check-double"></i></button>` : ''}
              </span>
            </div>
            ${stampHtml}
            ${promptHtml}
            ${scaffoldHtml}
            <textarea class="student-answer-input" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>
            ${q.model ? `<div id="ep-model-${qIdx}" class="scaffold-box model-box" style="display:none;">${typeof formatBold !== 'undefined' ? formatBold(q.model) : q.model}</div>` : ''}
          </div>
        `;
      };

      if (epQuestions.length > 0) {
        let q2Index = epQuestions.findIndex(
          (q) =>
            q.question &&
            (q.question.trim().startsWith('2. ') || q.question.trim().startsWith('Q2.')),
        );
        if (q2Index !== -1) {
          htmlExamPractice += renderQuestion(epQuestions[q2Index], q2Index);
        }
      }

      if (lesson.exam_practice.sources && lesson.exam_practice.sources.length > 0) {
        htmlExamPractice += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-bottom: 20px;">`;
        lesson.exam_practice.sources.forEach((src, sIdx) => {
          htmlExamPractice += `
            <div class="archival-source-box" style="margin-bottom: 0; background: #fffcf8; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 14px 18px;">
              <div class="archival-source-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
                <span class="archival-meta-tag" style="font-weight: 700; color: #1e3a8a; font-size: 0.85rem; letter-spacing: 0.5px; text-transform: uppercase;">${src.id || 'Source ' + String.fromCharCode(65 + sIdx)}</span>
                <span class="archival-shelfmark-stamp" style="font-family: monospace; font-size: 0.75rem; color: #64748b; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">ARCHIVAL RECORD</span>
              </div>
              <div class="archival-source-body" style="font-family: Georgia, 'Playfair Display', serif; font-size: 0.95rem; line-height: 1.6; color: #1e293b; margin-bottom: 10px; font-style: italic;">
                "${src.text || src.content || ''}"
              </div>
              <div class="archival-citation-footer" style="font-size: 0.82rem; color: #475569; border-top: 1px solid #e2e8f0; padding-top: 8px; line-height: 1.4;">
                <div><strong>Provenance:</strong> ${src.provenance || ''}</div>
                ${src.provenance_clue ? `<div style="margin-top: 4px; color: #b45309; font-style: italic;"><strong>Provenance Clue:</strong> ${src.provenance_clue}</div>` : ''}
              </div>
            </div>
          `;
        });
        htmlExamPractice += `</div>`;
      }

      if (epStimulus.length > 0) {
        htmlExamPractice += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-bottom: 20px;">`;
        epStimulus.forEach((stim, sIdx) => {
          let stimTitle = '';
          let stimContent = '';
          if (typeof stim === 'string') {
            const parts = stim.split('**:');
            if (parts.length > 1) {
              stimTitle = parts[0].replace(/\*\*/g, '').trim();
              stimContent = parts.slice(1).join('**:').trim();
            } else {
              stimTitle = `Interpretation ${sIdx + 1}`;
              stimContent = stim;
            }
          } else {
            stimTitle = stim.title || `Interpretation ${sIdx + 1}`;
            stimContent = stim.content || stim.text || '';
          }
          htmlExamPractice += `
              <div style="background: #f8fafc; border: 1.5px solid #94a3b8; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="font-weight: 700; color: #0f172a; margin-bottom: 8px; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 6px; font-size: 1rem; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-book-open" style="color: #2563eb;"></i> ${stimTitle}
                </div>
                <p style="margin: 0; font-size: 0.92rem; line-height: 1.6; color: #334155; font-style: italic;">${stimContent}</p>
              </div>
            `;
        });
        htmlExamPractice += `</div>`;
      }

      if (epQuestions.length > 0) {
        epQuestions.forEach((q, qIdx) => {
          let isQ2 =
            q.question &&
            (q.question.trim().startsWith('2. ') || q.question.trim().startsWith('Q2.'));
          if (!isQ2) {
            htmlExamPractice += renderQuestion(q, qIdx);
          }
        });
      }
      htmlExamPractice += `</div>`;
    }
  }

  let deck = null;
  if (lesson.vocab && lesson.vocab.length > 0) {
    deck = lesson.vocab;
  } else if (lesson.key_vocabulary && lesson.key_vocabulary.length > 0) {
    deck = lesson.key_vocabulary;
  } else if (lesson.flashcards && lesson.flashcards.length > 0) {
    if (lesson.flashcards[0].term || lesson.flashcards[0].word) {
      deck = lesson.flashcards;
    }
  }

  if (deck) {
    htmlVocabDeck += `
        <div class="phase-card">
          <div class="phase-title">Consolidation & Recall</div>
          <p style="color: #666; margin-bottom: 20px;">Tap a card to flip it and reveal the definition.</p>
          <div class="flashcard-deck">
      `;
    deck.forEach((fc) => {
      let t = fc.term || fc.word || fc.title || '';
      let d = fc.definition || fc.meaning || fc.desc || '';
      htmlVocabDeck += `
          <div class="flashcard-wrapper" data-action="flip-card-wrapper">
            <div class="flashcard-inner">
              <div class="flashcard-face flashcard-front">
                <h4>${t}</h4>
                <p>Tap to reveal</p>
              </div>
              <div class="flashcard-face flashcard-back">
                ${d}
              </div>
            </div>
          </div>
        `;
    });
    htmlVocabDeck += `</div></div>`;
  }

  if (lesson.extended || lesson.debate_prep) {
    let extHtml = `
        <div class="phase-card">
          <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 20px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Extended Scholarship</div>
            ${lesson.extended && (lesson.extended.model || lesson.extended.model_answer || lesson.extended.answer) ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-model" data-action="toggle-element" data-target-id="extended-model-${lesson.id}"><i class="fa-solid fa-check-double"></i> Reveal Model Answer</button>` : ''}
          </div>
      `;

    if (lesson.debate_prep) {
      const dp = lesson.debate_prep;
      const allArgs = [
        ...dp.arguments_for.map((a) => ({ t: a, s: 'for' })),
        ...dp.arguments_against.map((a) => ({ t: a, s: 'against' })),
      ].sort(() => Math.random() - 0.5);
      const argsHtml = allArgs
        .map(
          (arg, idx) =>
            `<div class="debate-card" draggable="true" ondragstart="window.dragDebate(event)" id="debate-arg-${lesson.id}-${idx}" data-side="${arg.s}" style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; margin-bottom: 8px; border-radius: 6px; cursor: grab;">${arg.t}</div>`,
        )
        .join('');

      extHtml += `
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="margin-top: 0; color: #1e3a8a;"><i class="fa-solid fa-scale-balanced"></i> Debate Prep: ${dp.question}</h3>
            <p style="color: #475569; font-size: 0.95rem;">Drag and drop the evidence cards below into the correct columns to prepare your arguments before writing your essay.</p>
            
            <div id="debate-bank-${lesson.id}" class="debate-dropzone" ondragover="window.allowDrop(event)" ondrop="window.dropDebate(event)" style="background: white; border: 2px dashed #94a3b8; padding: 15px; border-radius: 8px; margin-bottom: 20px; min-height: 80px;">
              ${argsHtml}
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <h4 style="text-align: center; color: #16a34a; margin-top: 0;">Agree</h4>
                <div id="debate-for-${lesson.id}" class="debate-dropzone" data-target="for" ondragover="window.allowDrop(event)" ondrop="window.dropDebate(event)" style="background: white; border: 2px dashed #86efac; padding: 15px; border-radius: 8px; min-height: 150px;"></div>
              </div>
              <div>
                <h4 style="text-align: center; color: #dc2626; margin-top: 0;">Disagree</h4>
                <div id="debate-against-${lesson.id}" class="debate-dropzone" data-target="against" ondragover="window.allowDrop(event)" ondrop="window.dropDebate(event)" style="background: white; border: 2px dashed #fca5a5; padding: 15px; border-radius: 8px; min-height: 150px;"></div>
              </div>
            </div>
            <div style="text-align: center; margin-top: 15px;">
              <button class="btn-pedagogy-primary" data-action="check-debate" data-id="${lesson.id}">Check Answers</button>
              <div id="debate-feedback-${lesson.id}" style="margin-top: 10px; font-weight: bold;"></div>
            </div>
          </div>
        `;
    }

    if (lesson.extended && lesson.extended.paragraphs) {
      if (lesson.extended.title) {
        extHtml += `<h3 style="color: #0f172a;">${lesson.extended.title}</h3>`;
      }
      lesson.extended.paragraphs.forEach((p) => {
        extHtml += `<p style="color: #334155; font-size: 1.05rem; line-height: 1.6;">${formatBold(p)}</p>`;
      });
    }
    extHtml += `</div>`;

    if (lesson.debate_prep || (lesson.extended && lesson.extended.paragraphs)) {
      htmlExtended += extHtml;
    }
  }

  let htmlCwgc = '';
  if (isTrip && lesson.cwgc_data) {
    const cd = lesson.cwgc_data;
    htmlCwgc = `
      <div class="cwgc-plaque-container" style="margin-bottom: 25px; background: #fff; border: 2px solid #b45309; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(180, 83, 9, 0.12);">
        <div style="background: linear-gradient(135deg, #78350f, #92400e); color: white; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fa-solid fa-monument" style="font-size: 1.4rem; color: #fde68a;"></i>
            <div>
              <div style="font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: #fde68a; font-weight: 700;">Commonwealth War Graves Commission</div>
              <div style="font-size: 1.15rem; font-weight: 700; font-family: 'Playfair Display', serif;">Official Record of the Fallen · Ypres Salient</div>
            </div>
          </div>
          <div style="background: rgba(254, 243, 199, 0.15); border: 1px solid rgba(253, 230, 138, 0.4); color: #fde68a; font-weight: 600; font-size: 0.82rem; padding: 6px 14px; border-radius: 20px; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-cross"></i> <span>CWGC Memorial Record</span>
          </div>
        </div>
        <div style="padding: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; background: #fff;">
          <div style="border-left: 3px solid #b45309; padding-left: 12px;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #78350f; font-weight: 700;">Rank &amp; Service Number</div>
            <div style="font-size: 1rem; color: #1e293b; font-weight: 600; margin-top: 2px;">${cd.rank || 'Private'} · #${cd.service_number}</div>
          </div>
          <div style="border-left: 3px solid #b45309; padding-left: 12px;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #78350f; font-weight: 700;">Regiment &amp; Battalion</div>
            <div style="font-size: 1rem; color: #1e293b; font-weight: 600; margin-top: 2px;">${cd.regiment}</div>
          </div>
          <div style="border-left: 3px solid #b45309; padding-left: 12px;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #78350f; font-weight: 700;">Date of Death &amp; Age</div>
            <div style="font-size: 1rem; color: #1e293b; font-weight: 600; margin-top: 2px;">${cd.date_of_death} (Age ${cd.age})</div>
          </div>
          <div style="border-left: 3px solid #dc2626; padding-left: 12px; background: #fef2f2; border-radius: 0 6px 6px 0; padding-top: 6px; padding-bottom: 6px;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #991b1b; font-weight: 700;">Official Memorial Location</div>
            <div style="font-size: 1.02rem; color: #7f1d1d; font-weight: 700; margin-top: 2px;">${cd.memorial} · <span style="background: #dc2626; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem;">${cd.panel}</span></div>
          </div>
          ${
            cd.hometown
              ? `
          <div style="border-left: 3px solid #64748b; padding-left: 12px; grid-column: 1 / -1;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #475569; font-weight: 700;">Home Connection</div>
            <div style="font-size: 0.95rem; color: #334155; margin-top: 2px;">${cd.hometown} ${cd.parents ? `(Son of ${cd.parents})` : ''}</div>
          </div>`
              : ''
          }
          ${
            cd.tablet_inscription
              ? `
          <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 12px; grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            <div>
              <span style="font-size: 0.82rem; font-weight: 700; color: #1e3a8a;"><i class="fa-solid fa-church" style="margin-right: 6px;"></i>Holy Rood Church Crofton Parish Memorial Tablet:</span>
              <span style="font-family: 'Courier New', monospace; font-weight: 700; background: #e2e8f0; padding: 2px 8px; border-radius: 4px; margin-left: 8px; font-size: 1rem; color: #0f172a;">${cd.tablet_inscription}</span>
            </div>
            <span style="font-size: 0.8rem; color: #64748b;"><i class="fa-solid fa-location-dot" style="margin-right: 4px;"></i>Stubbington Village Center</span>
          </div>`
              : ''
          }
        </div>
      </div>
    `;
  }

  let htmlPoetry = '';
  if (isTrip && lesson.poetry_dossiers && lesson.poetry_dossiers.length > 0) {
    htmlPoetry = renderPoetryDossiersHTML(lesson.poetry_dossiers);
  }

  if (isTrip) {
    html +=
      htmlCwgc +
      htmlNarrative +
      htmlVideo +
      htmlPoetry +
      htmlDoNow +
      htmlPrimary +
      htmlSources1 +
      htmlPairShare +
      htmlExamPractice +
      htmlVocabDeck +
      htmlExtended +
      htmlHistorian;
  } else if (isEarlyModern) {
    html +=
      htmlDoNow +
      htmlPrimary +
      (typeof isGCSE !== 'undefined' && isGCSE ? '' : htmlSources1) +
      htmlNarrative +
      htmlVideo +
      htmlPairShare +
      htmlExamPractice +
      htmlVocabDeck +
      htmlExtended +
      htmlHistorian +
      htmlTasks;
  } else if (unitId === 'water_and_sanitation') {
    html +=
      (typeof isGCSE !== 'undefined' && isGCSE ? '' : htmlSources1) +
      htmlPrimary +
      htmlDoNow +
      htmlNarrative +
      htmlVideo +
      htmlPairShare +
      htmlExamPractice +
      htmlVocabDeck +
      htmlExtended +
      htmlTasks +
      htmlHistorian;
  } else if (unitId === 'cme_new') {
    html +=
      htmlPrimary +
      htmlDoNow +
      htmlNarrative +
      htmlVideo +
      htmlPairShare +
      htmlTasks +
      htmlHistorian +
      htmlExamPractice +
      htmlVocabDeck +
      htmlExtended;
  } else if (unitId === 'great_war') {
    html +=
      htmlDoNow +
      htmlNarrative +
      htmlPrimary +
      (typeof isGCSE !== 'undefined' && isGCSE ? '' : htmlSources1) +
      htmlVideo +
      htmlTasks +
      htmlHistorian +
      htmlPairShare +
      htmlExamPractice +
      htmlVocabDeck +
      htmlExtended;
  } else {
    html +=
      (typeof isGCSE !== 'undefined' && isGCSE ? '' : htmlSources1) +
      htmlPrimary +
      htmlDoNow +
      htmlNarrative +
      htmlVideo +
      htmlTasks +
      htmlHistorian +
      htmlPairShare +
      htmlExamPractice +
      htmlVocabDeck +
      htmlExtended;
  }

  if (
    typeof isGCSE !== 'undefined' &&
    isGCSE &&
    unitId !== 'cme_new' &&
    !hasInlineNarrativeSources
  ) {
    html += htmlSources1;
  }
  if (
    lesson.gcse_task ||
    (lesson.extended && lesson.extended.question) ||
    extractedExamTasks.length > 0
  ) {
    let gcseHtml = `
        <div class="phase-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #b45309;">${lesson.extended && lesson.extended.title ? lesson.extended.title : 'Assessment Practice'}</div>
            <button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-model" data-action="reveal-all-models"><i class="fa-solid fa-magnifying-glass"></i> Reveal Models</button>
          </div>
      `;

    if (lesson.extended && lesson.extended.question) {
      let hintsHtml = '';
      if (lesson.extended.hints && lesson.extended.hints.length > 0) {
        hintsHtml = `<div style="margin-top: 15px; padding: 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px;"><strong style="color: #d97706;">Hints &amp; Structure Guide:</strong><ul style="margin: 5px 0 0 0; padding-left: 20px; color: #92400e;">${lesson.extended.hints.map((h) => `<li>${formatBold(h)}</li>`).join('')}</ul></div>`;
      }
      if (
        lesson.extended.teacher_guidance &&
        lesson.extended.teacher_guidance.tiered_stems &&
        lesson.extended.teacher_guidance.tiered_stems.length > 0
      ) {
        hintsHtml += `
          <div style="margin-top: 12px; padding: 12px 16px; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 6px;">
            <strong style="color: #166534; display: flex; align-items: center; gap: 8px; font-size: 0.95rem;">
              <i class="fa-solid fa-pen-fancy"></i> Sentence Starters:
            </strong>
            <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #15803d; line-height: 1.6; font-size: 0.92rem;">
              ${lesson.extended.teacher_guidance.tiered_stems.map((s) => `<li>${formatBold(s)}</li>`).join('')}
            </ul>
          </div>`;
      }

      let wordBankHtml = '';
      if (lesson.extended.word_bank && lesson.extended.word_bank.length > 0) {
        wordBankHtml = `
          <div style="margin-top: 12px; padding: 10px 14px; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 6px;">
            <strong style="color: #166534; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
              Key Word Bank:
            </strong>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${lesson.extended.word_bank.map((w) => `<span style="background: white; border: 1px solid #bbf7d0; color: #14532d; font-size: 0.85rem; font-weight: 600; padding: 2px 8px; border-radius: 4px;">${w}</span>`).join('')}
            </div>
          </div>
        `;
      }

      let connectivesHtml = '';
      if (lesson.extended.connective_bank && lesson.extended.connective_bank.length > 0) {
        connectivesHtml = `
          <div style="margin-top: 10px; padding: 10px 14px; background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 6px;">
            <strong style="color: #1e40af; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">
              Causal Connective Bank:
            </strong>
            <div style="font-size: 0.85rem; color: #1e3a8a; font-style: italic; line-height: 1.5;">
              ${lesson.extended.connective_bank.map((c) => `&ldquo;${c}&rdquo;`).join(' &bull; ')}
            </div>
          </div>
        `;
      }

      let startersHtml = '';
      if (lesson.extended.sentence_starters && lesson.extended.sentence_starters.length > 0) {
        startersHtml = `
          <div style="margin-top: 10px; padding: 10px 14px; background: #faf5ff; border: 1.5px solid #d8b4fe; border-radius: 6px;">
            <strong style="color: #6b21a8; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
              Model Sentence Starters:
            </strong>
            <ul style="margin: 0; padding-left: 20px; font-size: 0.88rem; color: #581c87; line-height: 1.5;">
              ${lesson.extended.sentence_starters.map((st) => `<li><em>"${st}"</em></li>`).join('')}
            </ul>
          </div>
        `;
      }

      let sourceHtml = '';
      if (lesson.extended.source_a || lesson.extended.source_b) {
        sourceHtml = `<div style="display: flex; flex-wrap: wrap; gap: 20px; margin: 15px 0;">`;
        if (lesson.extended.source_a) {
          const prov =
            typeof lesson.extended.source_a === 'string' ? '' : lesson.extended.source_a.provenance;
          const content =
            typeof lesson.extended.source_a === 'string'
              ? lesson.extended.source_a
              : lesson.extended.source_a.content;
          const isImageA =
            typeof content === 'string' &&
            (content.toLowerCase().endsWith('.png') ||
              content.toLowerCase().endsWith('.jpg') ||
              content.toLowerCase().endsWith('.jpeg') ||
              content.toLowerCase().endsWith('.webp'));
          const renderedA = isImageA
            ? `<div style="text-align: center;"><img src="${getAssetUrl(content)}" style="max-width: 100%; max-height: 480px; object-fit: contain; border-radius: 6px; border: 1.5px solid #cbd5e1;" alt="Source A"></div>`
            : content.replace(/\n/g, '<br>');
          sourceHtml += `
               <div style="flex: 1 1 250px; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                 <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source A</strong>
                 ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ''}
                 <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                   ${renderedA}
                 </div>
               </div>`;
        }
        if (lesson.extended.source_b) {
          const prov =
            typeof lesson.extended.source_b === 'string' ? '' : lesson.extended.source_b.provenance;
          const content =
            typeof lesson.extended.source_b === 'string'
              ? lesson.extended.source_b
              : lesson.extended.source_b.content;
          const isImageB =
            typeof content === 'string' &&
            (content.toLowerCase().endsWith('.png') ||
              content.toLowerCase().endsWith('.jpg') ||
              content.toLowerCase().endsWith('.jpeg') ||
              content.toLowerCase().endsWith('.webp'));
          const renderedB = isImageB
            ? `<div style="text-align: center;"><img src="${getAssetUrl(content)}" style="max-width: 100%; max-height: 480px; object-fit: contain; border-radius: 6px; border: 1.5px solid #cbd5e1;" alt="Source B"></div>`
            : content.replace(/\n/g, '<br>');
          sourceHtml += `
               <div style="flex: 1 1 250px; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                 <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source B</strong>
                 ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ''}
                 <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                   ${renderedB}
                 </div>
               </div>`;
        }
        sourceHtml += `</div>`;
        if (lesson.extended.provenance_clue) {
          sourceHtml += `<details style="margin-top: 15px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; overflow: hidden;">
              <summary style="padding: 12px; cursor: pointer; color: #166534; font-weight: bold; list-style: none;">
                <i class="fa-solid fa-magnifying-glass" style="margin-right: 5px;"></i> Click to Reveal Provenance Scaffolding Clues
              </summary>
              <div style="padding: 0 12px 12px 12px; color: #15803d; border-top: 1px solid #bbf7d0; margin-top: 5px; padding-top: 12px;">
                ${lesson.extended.provenance_clue}
              </div>
            </details>`;
        }
      }

      gcseHtml += `
          <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
            <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
              ${lesson.extended.qNum ? `Q${lesson.extended.qNum}. ` : ''}${formatQuestion(lesson.extended.question, !lesson.extended.qNum)}
              <span style="display: inline-flex; vertical-align: middle; gap: 6px;">
                ${lesson.extended.model || lesson.extended.model_answer || lesson.extended.answer ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-model" title="Reveal Model Answer" data-action="toggle-element" data-target-id="extended-model-${lesson.id}"><i class="fa-solid fa-check-double"></i></button>` : ''}
                ${lesson.extended.answer_image ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-model" title="Reveal Reference Map" data-action="toggle-element" data-target-id="extended-map-answer-${lesson.id}"><i class="fa-solid fa-map-location-dot"></i> Reveal Reference Map</button>` : ''}
                ${lesson.extended.title && lesson.extended.title.toLowerCase().includes('map task') ? `<button class="btn btn-pedagogy btn-pedagogy-sm" style="background: #0284c7; color: #ffffff; border: 1px solid #0369a1;" title="Interactive Classroom Map" data-action="toggle-element" data-target-id="extended-map-interactive-${lesson.id}"><i class="fa-solid fa-earth-americas"></i> Interactive Classroom Map</button>` : ''}
              </span>
            </div>
            ${sourceHtml}
            ${wordBankHtml}
            ${connectivesHtml}
            ${startersHtml}
            ${hintsHtml}
            ${
              lesson.extended.answer_image
                ? `
              <div id="extended-map-answer-${lesson.id}" style="display:none; margin-top: 15px; border: 2px solid #16a34a; border-radius: 8px; padding: 15px; background: #f0fdf4;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <strong style="color: #166534; font-size: 1.05rem;"><i class="fa-solid fa-circle-check"></i> Authoritative Reference Map (CIA World Factbook):</strong>
                  <a href="https://www.google.com/maps/@31.2,35.2,6z" target="_blank" rel="noopener noreferrer" style="font-size: 0.85rem; color: #166534; font-weight: 600; text-decoration: none; background: #dcfce7; padding: 3px 8px; border-radius: 4px; border: 1px solid #86efac;">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Google Maps Satellite
                  </a>
                </div>
                <div style="text-align: center;"><img src="${getAssetUrl(lesson.extended.answer_image)}" style="max-width: 100%; max-height: 520px; object-fit: contain; border-radius: 6px; border: 1px solid #86efac;" /></div>
              </div>
            `
                : ''
            }
            ${
              lesson.extended.title && lesson.extended.title.toLowerCase().includes('map task')
                ? `
              <div id="extended-map-interactive-${lesson.id}" style="display:none; margin-top: 15px; border: 2px solid #0284c7; border-radius: 8px; padding: 15px; background: #f0f9ff;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <strong style="color: #0369a1; font-size: 1.05rem;"><i class="fa-solid fa-earth-americas"></i> Interactive Whiteboard Explorer (Middle East):</strong>
                  <div style="display: flex; gap: 8px;">
                    <a href="https://www.google.com/maps/@31.2,35.2,6z" target="_blank" rel="noopener noreferrer" style="font-size: 0.85rem; color: #0284c7; font-weight: 600; text-decoration: none; background: #e0f2fe; padding: 4px 10px; border-radius: 4px; border: 1px solid #7dd3fc;">
                      <i class="fa-brands fa-google"></i> Google Maps Fullscreen
                    </a>
                  </div>
                </div>
                <p style="font-size: 0.85rem; color: #475569; margin: 0 0 10px 0;">Use mouse wheel or touch to zoom in/out on national borders, the Suez Canal, Straits of Tiran, Jerusalem, and regional waterways during classroom discussion.</p>
                <div style="width: 100%; height: 420px; border-radius: 6px; overflow: hidden; border: 1.5px solid #0284c7; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                  <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=25.0%2C20.0%2C55.0%2C38.0&amp;layer=mapnik&amp;marker=31.5%2C35.0" style="border: 0;"></iframe>
                </div>
              </div>
            `
                : ''
            }
            <textarea class="student-answer-input" style="min-height: 200px;" placeholder="Write your extended response here..." oninput="window.updateProgress()"></textarea>
            ${lesson.extended.model || lesson.extended.model_answer || lesson.extended.answer ? `<div id="extended-model-${lesson.id}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${formatBold(lesson.extended.model || lesson.extended.model_answer || lesson.extended.answer)}</div>` : ''}
          </div>
        `;
    }

    if (lesson.secondary_map) {
      const sm = lesson.secondary_map;
      let smContent = sm.source_a
        ? typeof sm.source_a === 'string'
          ? sm.source_a
          : sm.source_a.content
        : '';
      let smHints = '';
      if (sm.hints && sm.hints.length > 0) {
        smHints = `<div style="margin-top: 15px; padding: 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px;"><strong style="color: #d97706;">Hints:</strong><ul style="margin: 5px 0 0 0; padding-left: 20px; color: #92400e;">${sm.hints.map((h) => `<li>${formatBold(h)}</li>`).join('')}</ul></div>`;
      }
      gcseHtml += `
        <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px; margin-top: 25px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <div style="font-weight: 700; font-size: 1.15rem; color: #1e3a8a;">
              ${sm.title}
            </div>
            ${sm.answer_image ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-model" data-action="toggle-element" data-target-id="secondary-map-answer-${lesson.id}"><i class="fa-solid fa-map-location-dot"></i> Reveal Reference Map</button>` : ''}
          </div>
          <p style="font-size: 0.95rem; color: #334155; line-height: 1.5; margin-bottom: 15px;">${formatBold(sm.instructions || sm.question)}</p>
          ${
            smContent
              ? `
            <div style="text-align: center; margin: 15px 0; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 15px; background: #f8fafc;">
              <img src="${getAssetUrl(smContent)}" style="max-width: 100%; max-height: 500px; object-fit: contain; border-radius: 4px;" alt="${sm.title}">
            </div>
          `
              : ''
          }
          ${smHints}
          ${
            sm.answer_image
              ? `
            <div id="secondary-map-answer-${lesson.id}" style="display:none; margin-top: 15px; border: 2px solid #16a34a; border-radius: 8px; padding: 15px; background: #f0fdf4;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong style="color: #166534; font-size: 1rem;"><i class="fa-solid fa-circle-check"></i> Model Answer & Reference Maps</strong>
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-top: 10px;">
                <div style="flex: 1 1 300px; text-align: center;">
                  <div style="font-size: 0.85rem; font-weight: 700; color: #166534; margin-bottom: 6px;">Israel & Occupied Territories Reference</div>
                  <img src="${getAssetUrl(sm.answer_image)}" style="max-width: 100%; max-height: 480px; object-fit: contain; border-radius: 6px; border: 1px solid #bbf7d0;" alt="Reference Map">
                </div>
                ${
                  sm.macro_map
                    ? `
                  <div style="flex: 1 1 300px; text-align: center;">
                    <div style="font-size: 0.85rem; font-weight: 700; color: #166534; margin-bottom: 6px;">1967 Six-Day War Territorial Shift</div>
                    <img src="${getAssetUrl(sm.macro_map)}" style="max-width: 100%; max-height: 480px; object-fit: contain; border-radius: 6px; border: 1px solid #bbf7d0;" alt="Six-Day War Macro Map">
                  </div>
                `
                    : ''
                }
              </div>
              ${
                sm.historical_notes
                  ? `
                <div style="margin-top: 12px; padding: 10px; background: #ffffff; border: 1px solid #86efac; border-radius: 6px; font-size: 0.9rem; color: #14532d; line-height: 1.45;">
                  <strong>Historical Context:</strong> ${sm.historical_notes}
                </div>
              `
                  : ''
              }
            </div>
          `
              : ''
          }
        </div>
      `;
    }

    if (lesson.gcse_task) {
      if (lesson.gcse_task.tasks) {
        lesson.gcse_task.tasks.forEach((task, tIdx) => {
          gcseHtml += `
              <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                  ${lesson.gcse_task.qNum && tIdx === 0 ? `Q${lesson.gcse_task.qNum}. ` : ''}${formatQuestion(task.text || task.question, !(lesson.gcse_task.qNum && tIdx === 0))}
                  <span style="display: inline-flex; vertical-align: middle;">
                    ${task.model ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-model" title="Reveal Model Answer" data-action="toggle-element" data-target-id="gcse-model-${tIdx}"><i class="fa-solid fa-check-double"></i></button>` : ''}
                  </span>
                </div>
                <textarea class="student-answer-input" style="min-height: ${(task.text || task.question || '').includes('12 marks') || (task.text || task.question || '').includes('16 marks') ? '200px' : '100px'};" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>
                ${task.model ? `<div id="gcse-model-${tIdx}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${formatBold(task.model)}</div>` : ''}
              </div>
            `;
        });
      } else if (lesson.gcse_task.sources) {
        let topicText = lesson.gcse_task.topic || '';
        let isNarrative = topicText.toLowerCase().includes('write a narrative account');

        if (isNarrative) {
          gcseHtml += `<p style="font-weight: bold; font-size: 1.15rem; color: #1e3a8a;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : ''}${topicText}</p>`;
          gcseHtml += `<p style="font-size: 1rem; color: #475569; margin-bottom: 10px;"><em>Read the historical sources below before writing your narrative account:</em></p>`;
        } else {
          gcseHtml += `<p style="font-weight: bold; font-size: 1.15rem; color: #1e3a8a;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : ''}How useful are Sources A and B for an enquiry into ${topicText}?</p>`;
        }

        gcseHtml += `<div style="display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">`;
        lesson.gcse_task.sources.forEach((srcObj) => {
          gcseHtml += `<div style="flex: 1; min-width: 300px; background: white; border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">`;
          if (srcObj.type === 'visual') {
            gcseHtml += `<img src="${getAssetUrl(srcObj.src)}" style="max-width: 100%; max-height: 250px; border-radius: 4px; margin-bottom: 10px;">`;
          } else {
            gcseHtml += `<blockquote style="font-size: 1.05rem; font-style: italic; color: #475569; margin: 0 0 15px 0; border-left: 4px solid #94a3b8; padding-left: 10px;">${formatBold(srcObj.text)}</blockquote>`;
          }
          gcseHtml += `<p style="font-size: 0.95rem; font-weight: bold; color: #334155; margin: 0;">${srcObj.title}</p>`;
          gcseHtml += `</div>`;
        });
        gcseHtml += `</div>`;

        if (lesson.gcse_task.scaffolding) {
          const sc = lesson.gcse_task.scaffolding;
          gcseHtml += `
            <div class="provenance-scaffold-box" style="margin: 15px 0 20px 0; padding: 14px 18px; background: #fffbeb; border: 1.5px solid #fcd34d; border-left: 5px solid #d97706; border-radius: 6px;">
              <strong style="color: #92400e; display: flex; align-items: center; gap: 8px; font-size: 1rem; margin-bottom: 8px;">
                <i class="fa-solid fa-magnifying-glass"></i> Provenance Clues &amp; Utility Stems (Edexcel 8-Mark Focus)
              </strong>
              ${
                sc.provenance_clues && sc.provenance_clues.length > 0
                  ? `
                <div style="margin-bottom: 10px;">
                  <span style="font-weight: 700; color: #b45309; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.5px;">Provenance Clues (Nature, Origin, Purpose):</span>
                  <ul style="margin: 4px 0 0 0; padding-left: 20px; color: #78350f; font-size: 0.92rem; line-height: 1.5;">
                    ${sc.provenance_clues.map((c) => `<li>${formatBold(c)}</li>`).join('')}
                  </ul>
                </div>
              `
                  : ''
              }
              ${
                sc.utility_stems && sc.utility_stems.length > 0
                  ? `
                <div>
                  <span style="font-weight: 700; color: #b45309; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.5px;">Tiered Sentence Starters:</span>
                  <ul style="margin: 4px 0 0 0; padding-left: 20px; color: #92400e; font-size: 0.92rem; line-height: 1.5;">
                    ${sc.utility_stems.map((s) => `<li>${formatBold(s)}</li>`).join('')}
                  </ul>
                </div>
              `
                  : ''
              }
            </div>
          `;
        }

        let placeholder = isNarrative
          ? 'Write your 8-mark narrative account here...'
          : 'Type your 8-mark utility evaluation here...';
        gcseHtml += `<textarea class="student-answer-input" style="min-height: 200px;" placeholder="${placeholder}" oninput="window.updateProgress()"></textarea>`;

        const gcseModel = lesson.gcse_task.model || lesson.gcse_task.model_answer;
        if (gcseModel) {
          gcseHtml += `<div style="margin-top: 15px;"><button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-model" data-action="toggle-element" data-target-id="gcse-model-src"><i class="fa-solid fa-check-double"></i> Reveal Model Answer</button></div>`;
          gcseHtml += `<div id="gcse-model-src" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${formatBold(gcseModel)}</div>`;
        }
      }
    }

    if (extractedExamTasks.length > 0) {
      extractedExamTasks.forEach((task, tIdx) => {
        gcseHtml += `
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                ${formatQuestion(task.text || task.question)}
                <span style="display: inline-flex; vertical-align: middle;">
                  ${task.model ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-model" title="Reveal Model Answer" data-action="toggle-element" data-target-id="extracted-model-${tIdx}"><i class="fa-solid fa-check-double"></i></button>` : ''}
                </span>
              </div>
              <textarea class="student-answer-input" style="min-height: 200px;" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>
              ${task.model ? `<div id="extracted-model-${tIdx}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${formatBold(task.model)}</div>` : ''}
            </div>
          `;
      });
    }
    gcseHtml += `</div>`;
    html += gcseHtml;
  }

  // Extension Task
  if (lesson.extension_task) {
    html += `
        <div class="phase-card extension-task-card no-print" style="padding: 25px; background: linear-gradient(to right, #f8fafc, #f1f5f9); border: 2px dashed #cbd5e1; border-radius: 8px; margin-bottom: 30px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); position: relative; overflow: hidden;">
          <div style="position: absolute; top: -15px; right: -15px; opacity: 0.05; font-size: 10rem; color: #1e3a8a;"><i class="fa-solid fa-laptop-code"></i></div>
          <div style="position: relative; z-index: 2;">
            <h3 style="margin-top: 0; color: #1e3a8a; font-size: 1.3rem; display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
              <i class="fa-solid fa-magnifying-glass-plus" style="color: #facc15;"></i> ${lesson.extension_task.title}
            </h3>
            <p style="color: #334155; font-size: 1.05rem; line-height: 1.6; margin-bottom: 20px;">
              ${lesson.extension_task.instructions}
            </p>
            ${
              lesson.extension_task.search_terms && lesson.extension_task.search_terms.length > 0
                ? `
            <div style="background: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; margin-bottom: 15px;">
              <strong style="color: #0f172a; display: block; margin-bottom: 8px;"><i class="fa-brands fa-google" style="color: #ea4335; margin-right: 5px;"></i> Suggested Search Terms:</strong>
              <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                ${lesson.extension_task.search_terms.map((t) => `<span style="background: #f1f5f9; padding: 4px 10px; border-radius: 4px; border: 1px solid #e2e8f0; font-family: monospace; font-size: 0.95rem; color: #475569; user-select: all;">"${t}"</span>`).join('')}
              </div>
            </div>
            `
                : ''
            }
            ${
              lesson.extension_task.hyperlinks && lesson.extension_task.hyperlinks.length > 0
                ? `
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              ${lesson.extension_task.hyperlinks.map((l) => `<a href="${l.url}" target="_blank" class="btn btn-secondary" style="text-decoration: none; display: inline-flex; align-items: center; gap: 8px; border: 1px solid #94a3b8;"><i class="fa-solid fa-arrow-up-right-from-square" style="color: #3b82f6;"></i> ${l.text}</a>`).join('')}
            </div>
            `
                : ''
            }
          </div>
        </div>
    `;
  }

  // --- PLENARY RETRIEVAL QUIZ LAUNCHER (Compact ~80px card immediately above Exit Ticket) ---
  const rawLessonQuiz = lesson.quiz || lesson.quick_quiz || lesson.quiz_questions;
  if (rawLessonQuiz && rawLessonQuiz.length > 0 && appStore.state.activeUnitData.type !== 'trip') {
    let savedScoreBadge = '';
    try {
      const savedRaw = localStorage.getItem('history_quiz_' + lesson.id);
      if (savedRaw) {
        const s = JSON.parse(savedRaw);
        savedScoreBadge = `
          <span class="quiz-score-pill" style="background: #f0fdf4; color: #166534; border: 1.5px solid #86efac; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.88rem; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-circle-check"></i> Score: ${s.score}/${s.total} (${s.pct}%)
          </span>
          <button class="btn btn-secondary" onclick="window.startQuiz('${lesson.id}')" style="padding: 7px 14px; font-size: 0.85rem; font-weight: 600; margin-left: 8px;">
            <i class="fa-solid fa-rotate-right"></i> Re-take
          </button>
        `;
      }
    } catch (e) {}

    html += `
        <div class="phase-card no-print plenary-launcher-card" id="plenary-launcher-${lesson.id}" style="padding: 18px 24px; margin-bottom: 25px; background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 5px solid #2563eb; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.03); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; min-height: 80px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: #eff6ff; display: flex; align-items: center; justify-content: center; font-size: 1.35rem; color: #2563eb; border: 1.5px solid #bfdbfe; flex-shrink: 0;">
              🎯
            </div>
            <div>
              <h3 style="margin: 0; color: #0f172a; font-size: 1.15rem; font-family: 'Playfair Display', Georgia, serif;">Plenary Retrieval Quiz</h3>
              <p style="margin: 3px 0 0 0; color: #64748b; font-size: 0.88rem;">Rapid closed-book recall &bull; <strong>${rawLessonQuiz.length} Questions</strong></p>
            </div>
          </div>
          <div id="quiz-status-badge-${lesson.id}" style="display: flex; align-items: center;">
            ${
              savedScoreBadge
                ? savedScoreBadge
                : `
              <button class="btn-pedagogy-primary" onclick="window.startQuiz('${lesson.id}')" style="padding: 10px 22px; font-size: 0.95rem; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.22); cursor: pointer;">
                <i class="fa-solid fa-rocket"></i> Launch Plenary Quiz
              </button>
            `
            }
          </div>
        </div>
      `;
  }

  // --- EXIT TICKET / LESSON CLOSURE ---
  if (lesson.exit_ticket) {
    const et = lesson.exit_ticket;
    html += `
      <div class="phase-card exit-ticket-card no-print" style="padding: 25px; background: #f8fafc; border: 2px solid #3b82f6; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 16px;">
          <h3 style="margin: 0; color: #1e3a8a; font-size: 1.35rem; display: flex; align-items: center; gap: 10px; font-family: 'Playfair Display', serif;">
            <i class="fa-solid fa-ticket" style="color: #2563eb;"></i> ${et.title || 'Exit Ticket · Lesson Closure'}
          </h3>
          <span style="background: #dbeafe; color: #1e40af; font-size: 0.85rem; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">${et.type_label || 'Exit Ticket'}</span>
        </div>
        <p style="color: #1e293b; font-size: 1.05rem; line-height: 1.6; margin-bottom: 15px;">
          ${window.formatBold(et.prompt)}
        </p>
        ${
          et.options && et.options.length > 0
            ? `
          <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
            ${et.options.map((opt) => `<div style="padding: 8px 12px; margin-bottom: 6px; background: #f8fafc; border-radius: 6px; font-size: 1rem; color: #334155; border-left: 3px solid #94a3b8;">${window.formatBold(opt)}</div>`).join('')}
          </div>
        `
            : ''
        }
        ${
          et.guidance
            ? `
          <div style="font-size: 0.95rem; color: #64748b; font-style: italic; margin-bottom: 12px;">
            <strong>Teacher Guidance:</strong> ${window.formatBold(et.guidance)}
          </div>
        `
            : ''
        }
        <div style="margin-top: 15px;">
          <textarea class="form-control" placeholder="Write your exit ticket response here before leaving class..." style="width: 100%; min-height: 90px; border-radius: 8px; border: 1px solid #cbd5e1; padding: 12px; font-size: 1rem; line-height: 1.5;"></textarea>
        </div>
      </div>
    `;
  }

  // --- LESSON REFLECTION / DIRT PROMPT ---
  // Renders a visual prompt at the end of the final lesson,
  // directing pupils to the DIRT page in their printed workbook.
  if (lesson.lesson_reflection) {
    const ref = lesson.lesson_reflection;
    let instructionsHtml = '';
    if (ref.instructions && ref.instructions.length > 0) {
      instructionsHtml = `<ul style="margin: 12px 0 0 0; padding-left: 20px; color: #1e40af; font-size: 1rem; line-height: 1.7;">
        ${ref.instructions.map((i) => `<li>${i}</li>`).join('')}
      </ul>`;
    }
    html += `
      <div class="phase-card no-print" style="padding: 30px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #3b82f6; border-radius: 12px; margin-bottom: 30px; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -20px; right: -20px; opacity: 0.08; font-size: 12rem; color: #1e40af;"><i class="fa-solid fa-book-open-reader"></i></div>
        <div style="position: relative; z-index: 2;">
          <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
            <div style="background: #3b82f6; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
              <i class="fa-solid fa-pen-to-square"></i>
            </div>
            <div>
              <h3 style="margin: 0; color: #1e3a8a; font-size: 1.3rem;">End of Unit Reflection & Pupil Voice</h3>
              <p style="margin: 2px 0 0; color: #3b82f6; font-size: 0.9rem; font-weight: 600;">DIRT — Dedicated Improvement and Reflection Time</p>
            </div>
          </div>
          <p style="color: #1e40af; font-size: 1.05rem; line-height: 1.6; margin: 0;">${ref.prompt}</p>
          ${instructionsHtml}
        </div>
      </div>
    `;
  }

  // Previous / Next Lesson Navigation Buttons
  if (currentIndex !== -1) {
    html += `<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; margin-bottom: 40px;">`;

    if (currentIndex > 0) {
      const prevLesson = allUnitLessons[currentIndex - 1];
      let prevLabel = 'Previous Lesson';
      if (isTrip && prevLesson) {
        if (prevLesson.id === 'day_0') {
          prevLabel = 'Pre-Trip Briefing';
        } else if (prevLesson.id && prevLesson.id.startsWith('day_')) {
          prevLabel = `Previous Day (${prevLesson.title.split(':')[0]})`;
        } else if (prevLesson.id === 'hero_crummack') {
          prevLabel = 'Pupil Family Hero: 2nd Lt Crummack';
        } else if (prevLesson.id && prevLesson.id.startsWith('hero_lowry_')) {
          prevLabel = `Previous Study: ${prevLesson.title.split('(')[0].trim()}`;
        } else if (prevLesson.id && prevLesson.id.startsWith('hero_')) {
          prevLabel = `Previous Hero: ${prevLesson.title.split('(')[0].trim()}`;
        } else {
          prevLabel = 'Previous';
        }
      }
      html += `<button class="btn btn-secondary" data-action="render-lesson" data-index="${currentIndex - 1}"><i class="fa-solid fa-arrow-left"></i> ${prevLabel}</button>`;
    } else {
      html += `<div></div>`;
    }

    if (currentIndex < allUnitLessons.length - 1) {
      const nextLesson = allUnitLessons[currentIndex + 1];
      let nextLabel = 'Next Lesson';
      if (isTrip && nextLesson) {
        if (nextLesson.id === 'day_0') {
          nextLabel = 'Pre-Trip Briefing';
        } else if (nextLesson.id && nextLesson.id.startsWith('day_')) {
          nextLabel = `Next Day (${nextLesson.title.split(':')[0]})`;
        } else if (nextLesson.id === 'hero_crummack') {
          nextLabel = 'Family Hero: 2nd Lt Crummack';
        } else if (nextLesson.id && nextLesson.id.startsWith('hero_lowry_')) {
          nextLabel = `Home Front: ${nextLesson.title.split('(')[0].trim()}`;
        } else if (nextLesson.id && nextLesson.id.startsWith('hero_')) {
          nextLabel = `Local Hero: ${nextLesson.title.split('(')[0].trim()}`;
        } else {
          nextLabel = 'Next';
        }
      }
      html += `<button class="btn-pedagogy-primary" data-action="render-lesson" data-index="${currentIndex + 1}">${nextLabel} <i class="fa-solid fa-arrow-right"></i></button>`;
    } else {
      html += `<div></div>`;
    }

    html += `</div>`;
  }

  const activeUnitEdition = (activeUnit && activeUnit.edition) || '2026.1';
  html += `
    <div class="lesson-footer-meta" style="text-align: center; margin-top: 50px; padding: 16px; font-size: 0.8rem; color: #94a3b8; border-top: 1px solid #e2e8f0; font-family: 'Inter', sans-serif;">
      GCSE History Hub &bull; Unit: ${unitId} &bull; Edition ${activeUnitEdition}
    </div>
  `;

  html += `</div>`; // End lesson-content wrapper

  contentArea.innerHTML = html;

  window.vocabMatchesFound = 0;
  if (window.resetVocabSelection) window.resetVocabSelection();
  setTimeout(() => {
    if (window.mermaid) {
      try {
        mermaid.init(undefined, document.querySelectorAll('.mermaid'));
      } catch (e) {
        console.error('Mermaid render error:', e);
      }
    }
    if (window.postRenderHooks) {
      window.postRenderHooks.forEach((hook) => hook());
      window.postRenderHooks = [];
    }

    // Initialize Trip Map
    const mapContainer = document.getElementById('trip-map-container');
    if (mapContainer && window.L && lesson.do_now && lesson.do_now.type === 'timeline') {
      const eventsWithLoc = lesson.do_now.events.filter((e) => e.lat && e.lng);
      if (eventsWithLoc.length > 0) {
        if (window.tripMapInstance) {
          window.tripMapInstance.remove();
        }
        const map = L.map('trip-map-container');
        window.tripMapInstance = map;
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        const markers = [];
        eventsWithLoc.forEach((ev) => {
          const marker = L.marker([ev.lat, ev.lng]).addTo(map);
          let popupContent = `<strong>${ev.year} - ${ev.title}</strong><br>${ev.detail}`;

          if (appStore.state.activeUnitData.local_heroes) {
            const heroes = appStore.state.activeUnitData.local_heroes.filter((h) => {
              const loc = (h.visiting_location || h.memorial || h.cemetery || '').toLowerCase();
              const titleLower = (ev.title || '').toLowerCase();
              const detailLower = (ev.detail || '').toLowerCase();
              if (!loc) return false;
              if (titleLower.includes(loc) || detailLower.includes(loc)) return true;
              if (
                loc.includes('menin gate') &&
                (titleLower.includes('menin gate') || detailLower.includes('menin gate'))
              )
                return true;
              if (
                loc.includes('tyne cot') &&
                (titleLower.includes('tyne cot') || detailLower.includes('tyne cot'))
              )
                return true;
              return false;
            });
            if (heroes.length > 0) {
              popupContent += `<div style="margin-top: 15px; border: 2px solid #ef4444; border-radius: 8px; padding: 10px; background: #fef2f2;">
                  <h4 style="margin: 0 0 5px 0; color: #991b1b;"><i class="fa-solid fa-ribbon"></i> Local Connection</h4>`;
              heroes.forEach((h) => {
                popupContent += `<p style="margin: 0 0 5px 0; font-size: 0.9em; color: #7f1d1d;"><strong>${h.name}</strong> (${h.age}) - ${h.regiment}<br><em>${h.connection}</em><br>${h.story}</p>`;
              });
              popupContent += `</div>`;
            }
          }

          if (ev.youtube_id) {
            popupContent += `<div style="margin-top: 10px;"><button class="btn btn-secondary" data-action="open-video-modal" data-youtube="${ev.youtube_id}" style="width:100%; padding: 8px;"><i class="fa-brands fa-youtube" style="color:#ef4444; margin-right:5px;"></i> Play Video</button></div>`;
          }
          marker.bindPopup(popupContent, { minWidth: 250 });
          markers.push(marker);
        });

        if (markers.length > 0) {
          const group = new L.featureGroup(markers);
          map.fitBounds(group.getBounds().pad(0.2));

          // Draw Polyline connecting pins if not a local hero lesson
          if (!lesson.id || !lesson.id.startsWith('hero_')) {
            const latlngs = eventsWithLoc.map((ev) => [ev.lat, ev.lng]);
            L.polyline(latlngs, {
              color: '#ef4444',
              weight: 4,
              opacity: 0.7,
              dashArray: '10, 10',
              lineJoin: 'round',
            }).addTo(map);
          }
        }

        setTimeout(() => {
          if (window.tripMapInstance) {
            window.tripMapInstance.invalidateSize();
          }
        }, 200);
      }
    }

    // Initialize Crummack Lesson 13 Interactive Map Pins & Paleography Features
    if (unitId === 'trip_ypres' && lesson.id === 'hero_crummack') {
      initCrummackInteractiveFeatures();
    }

    // Auto-inject read-aloud buttons into all primary source excerpt cards
    injectArchivalAudioButtons();
  }, 100);
}

/**
 * Automatically inject read-aloud audio buttons into all archival primary source boxes
 * containing readable excerpt text (.archival-source-body).
 */
export function injectArchivalAudioButtons(container = document) {
  if (!container || !container.querySelectorAll) return;
  const sourceBoxes = container.querySelectorAll('.archival-source-box');
  sourceBoxes.forEach((box) => {
    const body = box.querySelector('.archival-source-body');
    if (!body || !body.textContent.trim()) return;

    // Skip if button or playback bar is already present
    if (box.querySelector('[data-action="read-aloud"], .read-aloud-btn, .read-aloud-playback-bar'))
      return;

    const barWrap = document.createElement('div');
    barWrap.innerHTML = renderAudioPlaybackBar(
      'Read Aloud Primary Source Excerpt',
      'source-audio-bar',
    );
    const bar = barWrap.firstElementChild;

    const header = box.querySelector('.archival-source-header');
    if (header) {
      // If header has a right-aligned container or stamp, append next to it, or append to header
      let rightContainer = header.querySelector('.archival-shelfmark-stamp')?.parentElement;
      if (
        rightContainer &&
        rightContainer !== header &&
        rightContainer.style.display?.includes('flex')
      ) {
        rightContainer.appendChild(bar);
      } else {
        const wrap = document.createElement('div');
        wrap.style.cssText = 'display: inline-flex; align-items: center; margin-left: auto;';
        wrap.appendChild(bar);
        header.appendChild(wrap);
      }
    } else {
      const topBar = document.createElement('div');
      topBar.className = 'archival-audio-bar no-print';
      topBar.style.cssText = 'display: flex; justify-content: flex-end; margin-bottom: 8px;';
      topBar.appendChild(bar);
      box.insertBefore(topBar, box.firstChild);
    }
  });
}

export function initCrummackInteractiveFeatures() {
  if (!document.getElementById('crummack-interactive-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'crummack-interactive-styles';
    styleEl.textContent = `
      @keyframes radar-pulse-crimson {
        0% { transform: scale(1); opacity: 0.9; }
        70% { transform: scale(3.5); opacity: 0; }
        100% { transform: scale(3.5); opacity: 0; }
      }
      @keyframes radar-pulse-blue {
        0% { transform: scale(1); opacity: 0.9; }
        70% { transform: scale(3.5); opacity: 0; }
        100% { transform: scale(3.5); opacity: 0; }
      }
      @keyframes radar-pulse-green {
        0% { transform: scale(1); opacity: 0.9; }
        70% { transform: scale(3.5); opacity: 0; }
        100% { transform: scale(3.5); opacity: 0; }
      }

      .map-hotspot-pin {
        position: absolute !important;
        cursor: pointer !important;
        z-index: 10 !important;
        pointer-events: auto !important;
        transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
      }
      .map-hotspot-pin:hover,
      .map-hotspot-pin.active-pin {
        z-index: 30 !important;
      }
      .pin-pulse {
        position: absolute !important;
        left: 0;
        top: 0;
        transform: translate(-50%, -50%);
        width: 22px !important;
        height: 22px !important;
        border-radius: 50% !important;
        pointer-events: none !important;
      }
      .pin-pulse-crimson {
        background: rgba(185, 28, 28, 0.45) !important;
        animation: radar-pulse-crimson 2.2s infinite ease-out !important;
      }
      .pin-pulse-blue {
        background: rgba(29, 78, 216, 0.45) !important;
        animation: radar-pulse-blue 2.2s infinite ease-out !important;
      }
      .pin-pulse-green {
        background: rgba(4, 120, 87, 0.45) !important;
        animation: radar-pulse-green 2.2s infinite ease-out !important;
      }
      .pin-marker {
        position: absolute !important;
        left: 0;
        top: 0;
        transform: translate(-50%, -50%);
        width: 22px !important;
        height: 22px !important;
        border-radius: 50% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4) !important;
        z-index: 2 !important;
        border: 2px solid #ffffff !important;
        transition: all 0.2s ease !important;
      }
      .pin-marker-crimson { background: #b91c1c !important; }
      .pin-marker-blue { background: #1d4ed8 !important; }
      .pin-marker-green { background: #047857 !important; }
      .pin-core {
        width: 6px !important;
        height: 6px !important;
        border-radius: 50% !important;
        background: #ffffff !important;
      }
      .pin-label {
        position: absolute !important;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        font-family: 'Inter', sans-serif !important;
        font-size: 0.72rem !important;
        font-weight: 700 !important;
        color: #ffffff !important;
        background: rgba(15, 23, 42, 0.92) !important;
        padding: 3px 8px !important;
        border-radius: 4px !important;
        box-shadow: 0 3px 8px rgba(0,0,0,0.35) !important;
        border: 1px solid rgba(255,255,255,0.25) !important;
        white-space: nowrap !important;
        pointer-events: auto !important;
        backdrop-filter: blur(4px) !important;
        letter-spacing: 0.02em !important;
      }
      .pin-num {
        display: inline-block !important;
        background: rgba(255,255,255,0.22);
        padding: 0 4px;
        border-radius: 2px;
        margin-right: 4px;
        font-size: 0.68rem;
      }
      .map-hotspot-pin.active-pin .pin-marker {
        transform: translate(-50%, -50%) scale(1.2) !important;
        border-color: #f59e0b !important;
        box-shadow: 0 0 14px rgba(245, 158, 11, 0.8) !important;
      }
      .map-hotspot-pin.active-pin .pin-label {
        border-color: #f59e0b !important;
        box-shadow: 0 0 12px rgba(245, 158, 11, 0.6) !important;
      }

      .scribal-box {
        position: absolute !important;
        border: 1.5px dashed #d97706 !important;
        background: rgba(217, 119, 6, 0.14) !important;
        border-radius: 3px !important;
        cursor: pointer !important;
        transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        z-index: 5 !important;
      }
      .scribal-box:hover {
        border-color: #b91c1c !important;
        background: rgba(185, 28, 28, 0.22) !important;
        transform: scale(1.02) !important;
      }
      .scribal-token {
        cursor: pointer !important;
        border-bottom: 2px solid #d97706 !important;
        background: rgba(254, 243, 199, 0.6) !important;
        padding: 1px 4px !important;
        border-radius: 3px !important;
        font-weight: 600 !important;
        color: #92400e !important;
        transition: all 0.2s ease !important;
        display: inline-block !important;
      }
      .scribal-token:hover {
        background: #fee2e2 !important;
        border-bottom-color: #b91c1c !important;
        color: #991b1b !important;
      }
    `;
    document.head.appendChild(styleEl);
  }

  const mapData = {
    1: {
      name: 'Sains-lez-Marquion · 2nd Lt Crummack MC Action',
      badge: 'Pin 1 · Primary Attack Axis',
      badgeColor: '#b91c1c',
      badgeBg: '#fee2e2',
      date: '27–29 September 1918',
      formations: '2/4th Battalion, York & Lancaster Regiment · 62nd (West Riding) Division',
      coords: 'British Trench Map 51B.N.W. · Square E.14.c (Sains-lez-Marquion)',
      summary:
        'Advancing east of the dry canal bed towards Sains-lez-Marquion, the 2/4th York & Lancasters were pinned down by severe, interlocking Maxim machine-gun fire from reinforced cellar positions and sunken road embankments. 2nd Lieutenant Crummack personally led a bombing dash through heavy machine-gun sweeps, killed the enemy crew, captured the gun, and enabled the entire brigade to break into the Hindenburg support trenches.',
      quote:
        '"When his company was held up by heavy machine-gun fire, 2nd Lt Crummack led a small party forward with the greatest dash and determination, captured the enemy gun, killed the crew, and enabled the company to advance." — London Gazette Official Citation',
      cardId: 'tactical-card-1',
      pinId: 'pin-sains',
    },
    2: {
      name: 'Lock 3 / Dry Canal Crossing · The Funnel Chokepoint',
      badge: 'Pin 2 · Engineering Obstacle',
      badgeColor: '#1d4ed8',
      badgeBg: '#dbeafe',
      date: '27 September 1918 (Zero Hour: 05:20)',
      formations: '4th British Division & 1st Canadian Division (General Sir Arthur Currie)',
      coords: 'Canal du Nord Excavation · Lock 3 (South of Sains-lez-Marquion)',
      summary:
        'The Canal du Nord was an unfinished 100-foot-wide excavation. While northern and southern stretches were deeply flooded marshes, a narrow 400-yard dry sector between Lock 3 and Mœuvres presented the only viable crossing. Allied commanders boldly funneled four complete infantry divisions through this narrow gap under creeping barrage cover, spreading fanwise across the eastern bank once across.',
      quote:
        '"The crossing of the dry Canal du Nord was an audacious tactical gamble. Had the German artillery found our funnel at Lock 3, the carnage would have been unthinkable; yet the speed and coordination of our advance completely broke the enemy center." — 4th Division War Diary',
      cardId: 'tactical-card-2',
      pinId: 'pin-lock3',
    },
    3: {
      name: 'Bourlon Wood Crest · Commanding Observation Post',
      badge: 'Pin 3 · Strategic Objective',
      badgeColor: '#047857',
      badgeBg: '#d1fae5',
      date: '27 September – 1 October 1918',
      formations: '4th Canadian Division & 62nd (West Riding) Division',
      coords: 'High Ground 120m Spot Height · Dominating Cambrai Plains',
      summary:
        'Bourlon Wood occupies the highest topographical ridge between Bapaume and Cambrai, offering panoramic observation across the entire German defensive zone. German defenders had fortified the dense woodland with concrete machine-gun pillboxes and tangled wire. Allied combined arms—supported by heavy tank battalions and relentless rolling artillery—swept through the wood on 27 September, depriving the German army of its master observation post.',
      quote:
        '"From Bourlon Wood crest, the entire Cambrai basin lay exposed beneath our eyes. Once the wood was taken, the Hindenburg Line was irrevocably cracked." — General Sir Julian Byng, Third Army Commander',
      cardId: 'tactical-card-3',
      pinId: 'pin-bourlon',
    },
  };

  const scribalData = {
    1: {
      line: 'Line 6',
      title: 'Pastoral English Radiance vs Frontline Mud',
      original: "Orange and red and all the eye's delight",
      revised: "Yellow and red and all the eye's delight",
      paleoAnalysis:
        'In his pocket notebook in July 1916, Sassoon opened the elegy with a sensory memory of English summertime. Why reject "Orange" for "Yellow"? Yellow evokes the piercing, crystalline sunlight of early morning England ("glittering brass / Of rays low on brown roofs"). In contrast to the filthy, stagnant gray-brown Picardy mud where his friend Marcus Goodall lay bleeding to death along Mill Road, the flash of yellow creates an unbearable emotional dissonance between home and slaughter.',
      hingeQuestion:
        'How does Sassoon\'s substitution of "Yellow" for "Orange" intensify the psychological shock of hearing that Marcus Goodall had fallen in Thiepval Wood?',
    },
    2: {
      line: 'Line 10',
      title: 'Kinetic Dissipation: Somme Smoke & Failing Consciousness',
      original: 'Following & a whirling & subsiding, — where?',
      revised: 'Thinning & whirling & subsiding, — where?',
      paleoAnalysis:
        'The original line ("Following") was passive and inert. By altering it to "Thinning & whirling & subsiding", Sassoon creates a cinematic, triple-part kinetic description. The line operates on two simultaneous planes: literally describing the acrid smoke of German high-explosive shells dispersing across Mill Road, and metaphorically tracking the racing thoughts of Goodall\'s dying mind thinning into nothingness.',
      hingeQuestion:
        'Why is "Thinning" far more effective than "Following" in portraying a young soldier losing consciousness on the battlefield?',
    },
    3: {
      line: 'Line 11',
      title: 'Rejection of Pity: Dignity in Frontline Sorrow',
      original: 'Poor victim, could you see your body thrown',
      revised: 'Sad victim, could you see your body thrown',
      paleoAnalysis:
        'This is Sassoon\'s most profound ethical revision in the manuscript. "Poor victim" carried overtones of helpless, patronizing pity—the sentimental language of civilians back in England. Sassoon forcefully struck out "Poor" and substituted "Sad". "Sad victim" restores moral dignity to Marcus Goodall. It acknowledges his tragic sacrifice without reducing a brave subaltern into a pitiable weakling, reflecting the fierce frontline pride of combat subalterns.',
      hingeQuestion:
        'Why did frontline combatants like Sassoon detest being pitied as "poor" soldiers by civilians back home?',
    },
    4: {
      line: 'Line 21',
      title: 'The Mud as a Mortal Grave: "Dead Clay"',
      original: "You'll no more need to cling to the wet clay",
      revised: "You'll no more need to cling to the dead clay",
      paleoAnalysis:
        'In the final stanza, Sassoon imagines Goodall escaping earthly suffering into heaven. The first draft described "wet clay"—a familiar physical annoyance of trench life. But Sassoon altered it to "dead clay". This single word transforms the Picardy soil: it is no longer merely wet earth, but a necrotic, grasping substance infused with the rot of corpses that clings to the living and dead alike.',
      hingeQuestion:
        'How does altering "wet clay" to "dead clay" strip away any lingering romantic illusions about death on the Somme?',
    },
  };

  window.selectMapPin = function (pinId) {
    const data = mapData[pinId];
    if (!data) return;

    // Update pin elements
    document
      .querySelectorAll('.map-hotspot-pin')
      .forEach((el) => el.classList.remove('active-pin'));
    const targetPin = document.getElementById(data.pinId);
    if (targetPin) targetPin.classList.add('active-pin');

    // Update tactical intel banner
    const banner = document.getElementById('tactical-intel-banner');
    if (banner) {
      banner.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 8px;">
          <div>
            <span style="font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; background: ${data.badgeBg}; color: ${data.badgeColor}; padding: 2px 8px; border-radius: 4px;">
              ${data.badge}
            </span>
            <h4 style="margin: 4px 0 0 0; color: #ffffff; font-size: 1.15rem; font-family: 'Playfair Display', serif;">
              ${data.name}
            </h4>
          </div>
          <div style="text-align: right; font-family: 'Inter', sans-serif; font-size: 0.75rem; color: #94a3b8;">
            <strong style="color: #f59e0b;">${data.date}</strong><br>
            <span>${data.coords}</span>
          </div>
        </div>
        <p style="margin: 0 0 10px 0; font-size: 0.92rem; color: #cbd5e1; line-height: 1.55;">
          ${data.summary}
        </p>
        <div style="background: rgba(255,255,255,0.06); border-left: 3px solid ${data.badgeColor}; padding: 8px 12px; border-radius: 4px; font-style: italic; font-size: 0.85rem; color: #f1f5f9; line-height: 1.45;">
          ${data.quote}
        </div>
      `;
    }

    // Update bottom analysis cards
    document.querySelectorAll('.tactical-analysis-card').forEach((c) => {
      c.style.borderColor = '#cbd5e1';
      c.style.boxShadow = 'none';
      c.style.background = '#ffffff';
    });
    const activeCard = document.getElementById(data.cardId);
    if (activeCard) {
      activeCard.style.borderColor = data.badgeColor;
      activeCard.style.boxShadow = `0 4px 12px ${data.badgeColor}33`;
      activeCard.style.background = '#f8fafc';
    }
  };

  window.selectScribalHotspot = function (id) {
    const data = scribalData[id];
    if (!data) return;

    // Highlight manuscript bounding box
    document.querySelectorAll('.scribal-box').forEach((b) => {
      b.style.border = '1.5px dashed #d97706';
      b.style.background = 'rgba(217, 119, 6, 0.14)';
      b.style.transform = 'scale(1)';
      b.style.boxShadow = 'none';
    });
    const targetBox = document.getElementById(`scribal-box-${id}`);
    if (targetBox) {
      targetBox.style.border = '2.5px solid #b91c1c';
      targetBox.style.background = 'rgba(185, 28, 28, 0.28)';
      targetBox.style.transform = 'scale(1.03)';
      targetBox.style.boxShadow = '0 0 14px rgba(185, 28, 28, 0.6)';
    }

    // Highlight transcript tokens
    document.querySelectorAll('.scribal-token').forEach((t) => {
      t.style.background = 'rgba(254, 243, 199, 0.6)';
      t.style.borderColor = '#d97706';
      t.style.color = '#78350f';
      t.style.fontWeight = '600';
    });
    const targetToken = document.querySelector(`.scribal-token-${id}`);
    if (targetToken) {
      targetToken.style.background = '#fee2e2';
      targetToken.style.borderColor = '#b91c1c';
      targetToken.style.color = '#991b1b';
      targetToken.style.fontWeight = '700';
    }

    // Update buttons
    document.querySelectorAll('.paleo-nav-btn').forEach((btn) => {
      btn.style.background = '#ffffff';
      btn.style.color = '#475569';
      btn.style.borderColor = '#cbd5e1';
    });
    const activeBtn = document.getElementById(`paleo-btn-${id}`);
    if (activeBtn) {
      activeBtn.style.background = '#7f1d1d';
      activeBtn.style.color = '#ffffff';
      activeBtn.style.borderColor = '#7f1d1d';
    }

    // Update Inspector content
    const panel = document.getElementById('scribal-inspector-content');
    if (panel) {
      panel.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 12px; flex-wrap: wrap; gap: 6px;">
          <div>
            <span style="font-family: 'Inter', sans-serif; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; background: #fee2e2; color: #991b1b; padding: 2px 7px; border-radius: 4px;">
              ${data.line} · Holograph Revision [${id}/4]
            </span>
            <h5 style="margin: 4px 0 0 0; color: #7f1d1d; font-size: 1.1rem; font-family: 'Playfair Display', serif;">
              ${data.title}
            </h5>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; font-size: 0.82rem;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px;">
            <strong style="color: #64748b; font-size: 0.72rem; text-transform: uppercase; display: block; margin-bottom: 2px;">Original Holograph Draft:</strong>
            <span style="text-decoration: line-through; color: #64748b; font-family: 'Georgia', serif; font-size: 0.95rem;">&ldquo;${data.original}&rdquo;</span>
          </div>
          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 8px 12px;">
            <strong style="color: #991b1b; font-size: 0.72rem; text-transform: uppercase; display: block; margin-bottom: 2px;">Revised Autograph Text:</strong>
            <span style="font-weight: 700; color: #991b1b; font-family: 'Georgia', serif; font-size: 0.95rem;">&ldquo;${data.revised}&rdquo;</span>
          </div>
        </div>

        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 3.5px solid #d97706; padding: 10px 14px; border-radius: 4px; margin-bottom: 10px; font-size: 0.88rem; line-height: 1.55; color: #334155;">
          <strong style="color: #78350f; display: block; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Forensic Paleographical Analysis:</strong>
          ${data.paleoAnalysis}
        </div>

        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 10px 14px; font-size: 0.85rem; line-height: 1.5; color: #1e3a8a;">
          <strong style="display: block; font-size: 0.76rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px; color: #1d4ed8;">Hinge Question for Class Discussion:</strong>
          ${data.hingeQuestion}
        </div>
      `;
    }
  };

  let allHotspotsVisible = true;
  window.toggleAllScribalHotspots = function () {
    allHotspotsVisible = !allHotspotsVisible;
    document.querySelectorAll('.scribal-box').forEach((b) => {
      b.style.opacity = allHotspotsVisible ? '1' : '0.15';
    });
    const toggleBtn = document.getElementById('toggle-hotspots-btn');
    if (toggleBtn) {
      toggleBtn.innerText = allHotspotsVisible ? 'Hide Overlays' : 'Show All Overlays';
    }
  };

  // Initial selection with a slight tick to allow DOM elements to paint
  setTimeout(() => {
    if (typeof window.selectMapPin === 'function') window.selectMapPin(1);
    if (typeof window.selectScribalHotspot === 'function') window.selectScribalHotspot(1);
  }, 50);
}

export function assignQuestionNumbers(lesson, targetUnitId) {
  const unit =
    targetUnitId ||
    (lesson && lesson.unitId) ||
    (typeof window !== 'undefined' && window.currentUnitId) ||
    (typeof appStore !== 'undefined' && appStore?.state?.selectedUnitId) ||
    (typeof appStore !== 'undefined' && appStore?.state?.activeUnitData?.id) ||
    (typeof window !== 'undefined' && window.location && window.location.search
      ? new URLSearchParams(window.location.search).get('id') ||
        new URLSearchParams(window.location.search).get('unit')
      : null);

  let globalQNum = 1;
  const isGCSE = ['cme_new', 'edexcel_medicine', 'eee', 'weimar_nazi_germany', 'usa'].includes(
    unit,
  );
  const isGreatWar = unit === 'great_war' || unit === 'great_war_part2';

  // 1. Primary Source
  if (lesson.primary_source && lesson.primary_source.question) {
    lesson.primary_source.qNum = globalQNum++;
  }

  // 2. Sources (non-GCSE units)
  if (lesson.sources && lesson.sources.length > 0 && !isGCSE) {
    lesson.sources.forEach((source) => {
      if (source.question) source.qNum = globalQNum++;
    });
  }

  // 3. Narrative Blocks
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach((block) => {
      if (block.source && block.source.question) block.source.qNum = globalQNum++;
      if (block.tasks) {
        block.tasks.forEach((task) => {
          if (
            typeof task === 'object' &&
            task !== null &&
            task.type !== 'vocab_match' &&
            task.type !== 'drag_drop_timeline'
          ) {
            task.qNum = globalQNum++;
          }
        });
      }
    });
  }

  // 4. Pair Share (for all units except Great War)
  if (lesson.pair_share && !isGreatWar) {
    lesson.pair_share.qNum = globalQNum++;
  }

  // 5. Standard Tasks
  if (lesson.tasks) {
    lesson.tasks.forEach((task) => {
      if (typeof task === 'object' && task !== null) {
        if (
          task.type !== 'gcse_exam_practice' &&
          task.type !== 'exam_practice' &&
          task.type !== 'drawing' &&
          task.type !== 'draw'
        ) {
          task.qNum = globalQNum++;
        }
      }
    });
  }

  // 7. Exam Practice Tasks
  if (lesson.tasks) {
    lesson.tasks.forEach((task) => {
      if (typeof task === 'object' && task !== null) {
        if (task.type === 'gcse_exam_practice' || task.type === 'exam_practice') {
          task.qNum = globalQNum++;
        }
      }
    });
  }

  // 8. Pair Share (for Great War)
  if (lesson.pair_share && isGreatWar) {
    lesson.pair_share.qNum = globalQNum++;
  }

  // 9. Extended Writing
  if (lesson.extended && lesson.extended.question) {
    lesson.extended.qNum = globalQNum++;
  }

  // 10. GCSE Task
  if (lesson.gcse_task) {
    if (lesson.gcse_task.tasks && Array.isArray(lesson.gcse_task.tasks)) {
      lesson.gcse_task.tasks.forEach((task) => {
        if (typeof task === 'object' && task !== null) {
          task.qNum = globalQNum++;
        }
      });
    } else {
      lesson.gcse_task.qNum = globalQNum++;
    }
  }
}

if (typeof window !== 'undefined') {
  window.assignQuestionNumbers = assignQuestionNumbers;
}

export function renderPoetryDossiersHTML(poetryDossiers) {
  if (!poetryDossiers || !Array.isArray(poetryDossiers) || poetryDossiers.length === 0) {
    return '';
  }

  let html = `
    <div class="phase-card poetry-dossiers-section" style="margin-top: 35px; border: 1px solid #e2e8f0; border-top: 4px solid #7f1d1d; border-radius: 10px; padding: 25px; background: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.04);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #fecaca; padding-bottom: 12px; margin-bottom: 22px; flex-wrap: wrap; gap: 10px;">
        <div>
          <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: #fee2e2; color: #991b1b; padding: 3px 10px; border-radius: 12px; display: inline-block; margin-bottom: 6px;">
            Field Poetry &amp; Eyewitness Voices
          </span>
          <h3 style="margin: 0; color: #7f1d1d; font-size: 1.45rem; font-family: 'Playfair Display', serif;">
            Voices of the Salient · On-Site Readings
          </h3>
        </div>
        <button class="btn btn-secondary" data-action="open-anthology-modal" style="font-size: 0.85rem; padding: 7px 14px; background: #fafafa; border: 1px solid #cbd5e1; font-weight: 600; color: #7f1d1d; display: inline-flex; align-items: center; gap: 6px; border-radius: 6px; cursor: pointer;">
          <i class="fa-solid fa-book-open"></i> Full 16-Poem Anthology
        </button>
      </div>
      <p style="color: #475569; font-size: 0.95rem; margin-top: 0; margin-bottom: 25px; line-height: 1.5;">
        At each battlefield stop, recite these frontline eyewitness verses. Where two poems are provided, select either voice using the tab switcher. Expand the teacher commentary for on-site speaking cues and the historical rationale for deeper class discussion.
      </p>
      <div style="display: flex; flex-direction: column; gap: 28px;">
  `;

  poetryDossiers.forEach((stop, sIdx) => {
    const hasMultiple = stop.poems && stop.poems.length > 1;
    html += `
      <div class="poetry-dossier-card" id="poetry-${stop.site_id}" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; flex-wrap: wrap; gap: 8px;">
          <div>
            <span style="font-size: 0.72rem; font-weight: 700; color: #991b1b; text-transform: uppercase; letter-spacing: 0.05em; display: block;">Stop ${sIdx + 1} Field Reading</span>
            <h4 style="margin: 2px 0 0 0; color: #0f172a; font-size: 1.2rem; font-family: 'Playfair Display', serif;">
              ${stop.site_name}
            </h4>
          </div>
          <span style="font-size: 0.78rem; font-weight: 700; background: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 14px; border: 1px solid #e2e8f0;">
            ${stop.stop_time}
          </span>
        </div>
    `;

    if (hasMultiple) {
      html += `
        <div style="display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; align-items: center; background: #f8fafc; padding: 8px 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
          <span style="font-size: 0.78rem; font-weight: 700; color: #64748b; margin-right: 4px;">Choose Voice:</span>
          ${stop.poems
            .map(
              (p, pIdx) => `
            <button class="btn poet-tab-btn" data-action="switch-poet-tab" data-target-poet="pane-${stop.site_id}-${p.id}" style="padding: 5px 12px; font-size: 0.82rem; border-radius: 16px; border: 1px solid ${pIdx === 0 ? '#7f1d1d' : '#cbd5e1'}; background: ${pIdx === 0 ? '#7f1d1d' : '#ffffff'}; color: ${pIdx === 0 ? '#ffffff' : '#475569'}; font-weight: ${pIdx === 0 ? '700' : '600'}; cursor: pointer; transition: all 0.2s;">
              <i class="fa-solid fa-feather-pointed" style="margin-right: 4px;"></i> ${p.poet.name.split(',')[0]}: <em>"${p.title}"</em>
            </button>
          `,
            )
            .join('')}
        </div>
      `;
    }

    stop.poems.forEach((poem, pIdx) => {
      const isVisible = pIdx === 0;
      html += `
        <div class="poet-view-pane" id="pane-${stop.site_id}-${poem.id}" style="display: ${isVisible ? 'block' : 'none'};">
          <!-- Poet Profile Header -->
          <div class="poet-profile-header" style="display: flex; flex-wrap: wrap; gap: 18px; align-items: flex-start; background: #faf8f5; border: 1px solid #e7dfd5; border-radius: 8px; padding: 18px; margin-bottom: 18px;">
            <div class="poet-portrait-col" style="flex: 0 0 115px; text-align: center;">
              <img src="${poem.poet.portrait}" alt="${poem.poet.name}" style="width: 115px; height: 145px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1; box-shadow: 0 2px 6px rgba(0,0,0,0.12); cursor: zoom-in;" data-action="open-modal" data-src="${poem.poet.portrait}">
              <small style="display: block; margin-top: 5px; font-size: 0.75rem; color: #64748b; font-weight: 600;">${poem.poet.lifespan}</small>
            </div>
            <div class="poet-bio-col" style="flex: 1; min-width: 240px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; flex-wrap: wrap;">
                <div>
                  <h4 style="margin: 0; color: #1e293b; font-size: 1.25rem; font-family: 'Playfair Display', serif;">${poem.poet.name}</h4>
                  <div style="font-size: 0.85rem; color: #78350f; font-weight: 600; margin-top: 2px;">${poem.poet.role}</div>
                </div>
                <span style="font-size: 0.75rem; font-weight: 700; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 10px; border: 1px solid #fde68a;">${poem.year}</span>
              </div>
              <p style="margin: 10px 0 0 0; color: #334155; font-size: 0.92rem; line-height: 1.6;">${poem.bio}</p>
            </div>
          </div>

          <!-- Unabridged Poem Box -->
          <div class="poem-blockquote-box" style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #991b1b; border-radius: 6px; padding: 22px 26px; margin-bottom: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px;">
              <h5 style="margin: 0; font-size: 1.2rem; color: #1e3a8a; font-family: 'Playfair Display', serif; font-style: italic;">
                "${poem.title}"
              </h5>
              <span style="font-size: 0.78rem; color: #64748b;"><i class="fa-regular fa-calendar" style="margin-right: 4px;"></i>${poem.year}</span>
            </div>
            <div class="poem-text-content" style="font-family: 'Georgia', serif; font-size: 1.02rem; line-height: 1.85; color: #1e293b; white-space: pre-line; margin: 0; overflow-wrap: break-word; word-break: normal;">
${poem.poem_text}
            </div>
            <div style="text-align: right; margin-top: 14px; font-size: 0.85rem; color: #64748b; font-style: italic;">
              — ${poem.poet.name} (${poem.poet.lifespan})
            </div>
          </div>

          <!-- Collapsible Teacher Guide Drawer -->
          <details style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #2563eb; border-radius: 6px; margin-bottom: 12px; overflow: hidden;">
            <summary style="padding: 10px 14px; cursor: pointer; font-weight: 700; color: #1d4ed8; font-size: 0.92rem; display: flex; align-items: center; justify-content: space-between; user-select: none;">
              <span><i class="fa-solid fa-bullhorn" style="margin-right: 8px; color: #2563eb;"></i> On-Site Teacher Guidance: What to Say Here</span>
              <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; color: #60a5fa;"></i>
            </summary>
            <div style="padding: 14px 18px; border-top: 1px solid #bfdbfe; font-size: 0.93rem; line-height: 1.6; color: #1e3a8a; background: #ffffff;">
              ${poem.teacher_commentary}
            </div>
          </details>

          <!-- Collapsible In-Depth Historical & Pedagogical Rationale Drawer -->
          <details style="background: #fdfaf6; border: 1px solid #fed7aa; border-left: 4px solid #ea580c; border-radius: 6px; margin-bottom: 8px; overflow: hidden;">
            <summary style="padding: 10px 14px; cursor: pointer; font-weight: 700; color: #9a3412; font-size: 0.92rem; display: flex; align-items: center; justify-content: space-between; user-select: none;">
              <span><i class="fa-solid fa-brain" style="margin-right: 8px; color: #ea580c;"></i> In-Depth Historical &amp; Pedagogical Rationale</span>
              <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; color: #fb923c;"></i>
            </summary>
            <div style="padding: 14px 18px; border-top: 1px solid #fed7aa; font-size: 0.93rem; line-height: 1.6; color: #334155; background: #ffffff;">
              <p style="margin: 0 0 12px 0;">${poem.pedagogical_rationale.context}</p>
              <div style="background: #fff7ed; border-left: 3px solid #ea580c; padding: 12px 14px; border-radius: 4px;">
                <strong style="color: #9a3412; display: block; margin-bottom: 4px; font-size: 0.88rem;"><i class="fa-solid fa-circle-question" style="margin-right: 5px;"></i> Hinge Question for Class Discussion:</strong>
                <span style="color: #431407; font-weight: 600; font-size: 0.95rem;">"${poem.pedagogical_rationale.hinge_question}"</span>
              </div>
            </div>
          </details>
        </div>
      `;
    });

    html += `</div>`;
  });

  if (window.currentUnitId === 'cme_new') {
    html += `
      <style>
        @keyframes sourceHighlightGlow {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); outline: 3px solid #3b82f6; transform: translateY(-2px); }
          50% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0.25); outline: 3px solid #2563eb; transform: translateY(-3px); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); outline: 3px solid #3b82f6; transform: translateY(-2px); }
        }
        .source-card-highlighted {
          animation: sourceHighlightGlow 1.5s infinite ease-in-out !important;
          border-color: #3b82f6 !important;
          transition: all 0.25s ease-in-out !important;
        }
        .source-inquiry-interactive {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .source-inquiry-interactive:hover {
          filter: brightness(0.97);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2) !important;
        }
      </style>
    `;
  }

  html += `
      </div>
    </div>
  `;
  return html;
}

if (typeof window !== 'undefined' && !window._cmeSourceHighlightBound) {
  window._cmeSourceHighlightBound = true;
  document.addEventListener('mouseover', (e) => {
    if (window.currentUnitId !== 'cme_new') return;
    const box = e.target.closest('[data-target-source]');
    if (box) {
      const letter = box.getAttribute('data-target-source');
      const card = document.getElementById(`source-card-${letter}`);
      if (card) card.classList.add('source-card-highlighted');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (window.currentUnitId !== 'cme_new') return;
    const box = e.target.closest('[data-target-source]');
    if (box) {
      const letter = box.getAttribute('data-target-source');
      const card = document.getElementById(`source-card-${letter}`);
      if (card) card.classList.remove('source-card-highlighted');
    }
  });
  document.addEventListener('click', (e) => {
    if (window.currentUnitId !== 'cme_new') return;
    const box = e.target.closest('[data-target-source]');
    if (box) {
      const letter = box.getAttribute('data-target-source');
      const card = document.getElementById(`source-card-${letter}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('source-card-highlighted');
        setTimeout(() => card.classList.remove('source-card-highlighted'), 3000);
      }
    }
  });
}

export function toggleAllAnswers(btnOrContainer) {
  let container;
  let btn;
  if (btnOrContainer instanceof HTMLElement) {
    if (
      btnOrContainer.tagName === 'BUTTON' ||
      btnOrContainer.dataset?.action === 'toggle-all-answers'
    ) {
      btn = btnOrContainer;
      container =
        btn.closest('details') ||
        btn.closest('.phase-card') ||
        btn.closest('.do-now-box') ||
        document;
    } else {
      container = btnOrContainer.closest?.('details') || btnOrContainer;
      btn = container?.querySelector?.('[data-action="toggle-all-answers"]');
    }
  } else {
    container = document.querySelector('details:has(.do-now-card)') || document;
    btn = container?.querySelector?.('[data-action="toggle-all-answers"]');
  }
  if (!container) return;
  if (container.tagName === 'DETAILS' && !container.open) container.open = true;
  const answers = container.querySelectorAll('.answer');
  if (!answers || answers.length === 0) return;
  const anyHidden = Array.from(answers).some((a) => {
    return window.getComputedStyle(a).display === 'none' || a.style.display === 'none';
  });
  answers.forEach((a) => {
    if (anyHidden) {
      a.style.display = 'block';
      a.classList.add('revealed');
    } else {
      a.style.display = 'none';
      a.classList.remove('revealed');
    }
  });
  if (btn) {
    btn.innerHTML = anyHidden
      ? '<i class="fa-solid fa-eye-slash"></i> Hide All'
      : '<i class="fa-solid fa-eye"></i> Reveal All';
  }
}

if (typeof window !== 'undefined') {
  window.toggleAllAnswers = toggleAllAnswers;
}

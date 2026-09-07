/**
 * GCSE Mock Exam Digital Timer
 * Floating, non-printing countdown timer for authentic timed exam practice.
 */
(function () {
  if (typeof window === 'undefined') return;

  function initTimer() {
    // Avoid double injection
    if (document.getElementById('digital-exam-timer-bar')) return;

    // Detect duration from document text or URL query
    const params = new URLSearchParams(window.location.search);
    let totalMinutes = 55;

    if (params.get('time')) {
      totalMinutes = parseInt(params.get('time'), 10) || 55;
    } else {
      const pageText = document.body ? document.body.innerText.toLowerCase() : '';
      if (
        pageText.includes('1 hour 20') ||
        pageText.includes('80 minutes') ||
        pageText.includes('1hr 20')
      ) {
        totalMinutes = 80;
      } else if (
        pageText.includes('1 hour 15') ||
        pageText.includes('75 minutes') ||
        pageText.includes('1hr 15')
      ) {
        totalMinutes = 75;
      } else if (pageText.includes('55 minutes') || pageText.includes('55 mins')) {
        totalMinutes = 55;
      } else if (
        window.location.pathname.includes('weimar') ||
        window.location.pathname.includes('medicine')
      ) {
        totalMinutes = 80;
      } else {
        totalMinutes = 55;
      }
    }

    let totalSeconds = totalMinutes * 60;
    const initialSeconds = totalSeconds;
    let timerInterval = null;
    let isRunning = false;
    let isMinimized = false;

    // Inject CSS
    const style = document.createElement('style');
    style.id = 'digital-exam-timer-styles';
    style.textContent = `
      #digital-exam-timer-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999999;
        background: rgba(15, 23, 42, 0.96);
        backdrop-filter: blur(10px);
        color: #f8fafc;
        padding: 10px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        border-bottom: 2px solid #38bdf8;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        box-sizing: border-box;
      }
      #digital-exam-timer-pill {
        position: fixed;
        top: 15px;
        right: 20px;
        z-index: 999999;
        background: #0f172a;
        color: #38bdf8;
        border: 1.5px solid #38bdf8;
        border-radius: 30px;
        padding: 8px 18px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        cursor: pointer;
        display: none;
        align-items: center;
        gap: 10px;
        font-family: monospace;
        font-size: 1.1rem;
        font-weight: bold;
      }
      .exam-timer-btn {
        border: none;
        border-radius: 6px;
        padding: 7px 14px;
        font-size: 0.85rem;
        font-weight: 700;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s ease;
        font-family: inherit;
      }
      .exam-timer-btn:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }
      @media print {
        #digital-exam-timer-bar,
        #digital-exam-timer-pill,
        .no-print {
          display: none !important;
        }
        body {
          padding-top: 0 !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Create Timer Bar
    const bar = document.createElement('div');
    bar.id = 'digital-exam-timer-bar';
    bar.className = 'no-print';

    const paperTitle = document.title || 'GCSE Mock Examination';

    bar.innerHTML = `
      <div style="display: flex; align-items: center; gap: 14px; min-width: 260px;">
        <span style="background: #ef4444; color: #fff; font-size: 0.72rem; font-weight: 800; padding: 4px 8px; border-radius: 4px; letter-spacing: 0.05em; text-transform: uppercase;">
          Timed Practice
        </span>
        <div style="max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.88rem; font-weight: 600; color: #e2e8f0;">
          ${paperTitle}
        </div>
      </div>

      <!-- Center Clock -->
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div id="exam-clock-time" style="font-size: 1.75rem; font-weight: 800; font-family: 'Courier New', Courier, monospace; letter-spacing: 2px; color: #38bdf8; line-height: 1;">
          00:00:00
        </div>
        <div id="exam-clock-status" style="font-size: 0.75rem; color: #94a3b8; margin-top: 3px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;">
          Ready (${totalMinutes} Minutes)
        </div>
      </div>

      <!-- Right Controls -->
      <div style="display: flex; align-items: center; gap: 8px;">
        <button type="button" class="exam-timer-btn" id="exam-start-btn" style="background: #10b981; color: #ffffff;">
          ▶ Start
        </button>
        <button type="button" class="exam-timer-btn" id="exam-pause-btn" style="background: #f59e0b; color: #ffffff; display: none;">
          ⏸ Pause
        </button>
        <button type="button" class="exam-timer-btn" id="exam-reset-btn" style="background: #334155; color: #e2e8f0;">
          🔄 Reset
        </button>
        <button type="button" class="exam-timer-btn" id="exam-print-btn" style="background: #1e293b; color: #94a3b8; border: 1px solid #475569;">
          🖨️ Print
        </button>
        <button type="button" class="exam-timer-btn" id="exam-min-btn" style="background: transparent; color: #94a3b8; padding: 7px 8px;" title="Minimize to corner">
          ➖
        </button>
      </div>
    `;

    // Create Minimized Pill
    const pill = document.createElement('div');
    pill.id = 'digital-exam-timer-pill';
    pill.className = 'no-print';
    pill.innerHTML = `
      <span id="pill-clock-time">00:00:00</span>
      <span style="font-size: 0.8rem; color: #94a3b8;">🔍 Expand</span>
    `;

    document.body.prepend(bar);
    document.body.appendChild(pill);

    // Push body down so fixed bar doesn't overlap title page
    document.body.style.paddingTop = '60px';

    const clockDisplay = document.getElementById('exam-clock-time');
    const clockStatus = document.getElementById('exam-clock-status');
    const pillClock = document.getElementById('pill-clock-time');
    const startBtn = document.getElementById('exam-start-btn');
    const pauseBtn = document.getElementById('exam-pause-btn');
    const resetBtn = document.getElementById('exam-reset-btn');
    const printBtn = document.getElementById('exam-print-btn');
    const minBtn = document.getElementById('exam-min-btn');

    function formatHMS(seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      if (h > 0) {
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      }
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function updateDisplay() {
      const formatted = formatHMS(totalSeconds);
      clockDisplay.textContent = formatted;
      pillClock.textContent = formatted;

      if (totalSeconds === 0) {
        clockDisplay.style.color = '#ef4444';
        pillClock.style.color = '#ef4444';
        clockStatus.textContent = "Time's Up! Exam Complete";
        clockStatus.style.color = '#ef4444';
      } else if (totalSeconds <= 300) {
        clockDisplay.style.color = '#ef4444';
        pillClock.style.color = '#ef4444';
        clockStatus.textContent = 'Final 5 Minutes - Check SPaG & Conclusions';
        clockStatus.style.color = '#ef4444';
      } else if (totalSeconds <= 900) {
        clockDisplay.style.color = '#f59e0b';
        pillClock.style.color = '#f59e0b';
        clockStatus.textContent = '15 Minutes Remaining - Pace Final Question';
        clockStatus.style.color = '#f59e0b';
      } else {
        clockDisplay.style.color = '#38bdf8';
        pillClock.style.color = '#38bdf8';
        if (isRunning) {
          clockStatus.textContent = 'Exam in Progress';
          clockStatus.style.color = '#10b981';
        }
      }
    }

    function playChime() {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.2); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.4); // G5
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
      } catch (e) {}
    }

    startBtn.onclick = function () {
      if (isRunning) return;
      if (totalSeconds === 0) totalSeconds = initialSeconds;
      isRunning = true;
      startBtn.style.display = 'none';
      pauseBtn.style.display = 'inline-flex';
      clockStatus.textContent = 'Exam in Progress';
      clockStatus.style.color = '#10b981';

      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateDisplay();
          if (totalSeconds === 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            isRunning = false;
            startBtn.style.display = 'inline-flex';
            startBtn.textContent = '🔄 Restart';
            pauseBtn.style.display = 'none';
            playChime();
          }
        }
      }, 1000);
    };

    pauseBtn.onclick = function () {
      if (!isRunning) return;
      clearInterval(timerInterval);
      timerInterval = null;
      isRunning = false;
      startBtn.style.display = 'inline-flex';
      startBtn.textContent = '▶ Resume';
      pauseBtn.style.display = 'none';
      clockStatus.textContent = 'Exam Paused';
      clockStatus.style.color = '#f59e0b';
    };

    resetBtn.onclick = function () {
      clearInterval(timerInterval);
      timerInterval = null;
      isRunning = false;
      totalSeconds = initialSeconds;
      updateDisplay();
      startBtn.style.display = 'inline-flex';
      startBtn.textContent = '▶ Start';
      pauseBtn.style.display = 'none';
      clockStatus.textContent = `Ready (${totalMinutes} Minutes)`;
      clockStatus.style.color = '#94a3b8';
    };

    printBtn.onclick = function () {
      window.print();
    };

    minBtn.onclick = function () {
      bar.style.display = 'none';
      pill.style.display = 'inline-flex';
      document.body.style.paddingTop = '0px';
      isMinimized = true;
    };

    pill.onclick = function () {
      pill.style.display = 'none';
      bar.style.display = 'flex';
      document.body.style.paddingTop = '60px';
      isMinimized = false;
    };

    updateDisplay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimer);
  } else {
    initTimer();
  }
})();

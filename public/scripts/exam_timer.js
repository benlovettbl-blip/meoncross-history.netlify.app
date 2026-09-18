/**
 * Pearson Exam Clock & Flexible Practice Timer Engine
 * Gives teachers 1-click presets for single questions (4m, 8m, 12m, 16m),
 * full paper countdowns, access arrangements (+25%), and click-to-edit custom times.
 */
(function () {
  if (typeof window === 'undefined') return;

  var totalSecs = 80 * 60;
  var initialSecs = 80 * 60;
  var interval = null;
  var isRunning = false;
  var soundEnabled = true;
  var currentModeLabel = 'Full Paper';

  function formatTime(secs) {
    var h = Math.floor(secs / 3600);
    var m = Math.floor((secs % 3600) / 60);
    var s = secs % 60;
    if (h > 0) {
      return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
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
        'Enter custom timer minutes (e.g. 5, 10, 15, 25, 45, 80):',
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

  function initHud() {
    var clockEl = document.getElementById('mock-exam-clock');
    var defaultMinutes = 80;
    if (clockEl) {
      var text = clockEl.textContent.trim();
      var parts = text.split(':');
      if (parts.length === 3) {
        var h = parseInt(parts[0], 10) || 0;
        var m = parseInt(parts[1], 10) || 0;
        defaultMinutes = h * 60 + m;
      } else if (parts.length === 2) {
        var m = parseInt(parts[0], 10) || 0;
        defaultMinutes = m;
      }
    }
    if (defaultMinutes <= 0) {
      var p = window.location.pathname;
      if (p.includes('cme') || p.includes('eee')) defaultMinutes = 55;
      else if (p.includes('medicine')) defaultMinutes = 80;
      else defaultMinutes = 80;
    }

    totalSecs = defaultMinutes * 60;
    initialSecs = totalSecs;

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

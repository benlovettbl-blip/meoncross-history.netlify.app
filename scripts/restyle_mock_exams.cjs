const fs = require('fs');
const path = require('path');

const units = [
  {
    id: 'cme_new',
    name: 'Middle East',
    defaultMinutes: 55,
    paperRef: '1HI0/21',
    pacing: '55 mins total exam time',
  },
  {
    id: 'edexcel_medicine',
    name: 'Medicine Through Time',
    defaultMinutes: 80,
    paperRef: '1HI0/11',
    pacing: 'Sec A: 25m (Western Front) | Sec B: 55m (Thematic Study)',
  },
  {
    id: 'eee',
    name: 'Early Elizabethan England',
    defaultMinutes: 55,
    paperRef: '1HI0/B4',
    pacing: '55 mins total exam time',
  },
  {
    id: 'usa',
    name: 'USA 1954-75',
    defaultMinutes: 80,
    paperRef: '1HI0/33',
    pacing: 'Sec A: 30m (Civil Rights) | Sec B: 50m (Vietnam)',
  },
  {
    id: 'weimar_nazi_germany',
    name: 'Weimar & Nazi Germany',
    defaultMinutes: 80,
    paperRef: '1HI0/31',
    pacing: 'Sec A: 30m | Sec B: 50m',
  },
];

const baseDir = path.join(__dirname, '..', 'public', 'units');

function generateInvigilatorHud(paperRef, defaultMinutes, pacingText, msUrl) {
  const defaultTimeFormatted = defaultMinutes === 55 ? '55:00' : '01:20:00';
  return `  <!-- Top Docked Invigilator Toolbar (Interactive Screen Mode) -->
  <div class="invigilator-hud no-print" style="position: sticky; top: 0; z-index: 9999; background: #0f172a; color: #ffffff; border-bottom: 3px solid #3b82f6; padding: 8px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); font-family: 'Open Sans', Arial, sans-serif;">
    <!-- Left: Clock & Status -->
    <div style="display: flex; align-items: center; gap: 14px;">
      <div>
        <div style="font-size: 9px; font-weight: 800; letter-spacing: 1px; color: #94a3b8; text-transform: uppercase;">PEARSON EXAM CLOCK &bull; ${paperRef}</div>
        <div id="mock-exam-clock" style="font-size: 26px; font-weight: 800; font-family: 'Courier New', Courier, monospace; color: #38bdf8; line-height: 1.1; cursor: pointer; text-shadow: 0 0 10px rgba(56,189,248,0.3);" title="Click to set custom timer duration">${defaultTimeFormatted}</div>
      </div>
      <div style="font-size: 11px; color: #cbd5e1; border-left: 1px solid #334155; padding-left: 12px; max-width: 250px; line-height: 1.3;">
        <div id="mock-pacing-status"><strong>Pacing:</strong> ${pacingText}</div>
        <div style="font-size: 10px; color: #64748b; margin-top: 2px;">💡 Click clock to type custom minutes</div>
      </div>
    </div>

    <!-- Center: Single-Question Practice Presets & Custom Mins -->
    <div style="display: flex; align-items: center; gap: 5px; flex-wrap: wrap; background: #1e293b; padding: 4px 8px; border-radius: 6px; border: 1px solid #334155;">
      <span style="font-size: 10px; font-weight: 800; color: #93c5fd; text-transform: uppercase; letter-spacing: 0.5px; margin-right: 2px;">Question Practice:</span>
      <button type="button" class="mock-preset-btn" data-mins="5" onclick="setMockExamTimerMinutes(5, '4-Mark Question (5m)')" style="background: #0f172a; color: #e2e8f0; border: 1px solid #475569; padding: 4px 7px; font-weight: 700; font-size: 11px; border-radius: 4px; cursor: pointer;" title="5 Minutes (4-Mark Question)">5m</button>
      <button type="button" class="mock-preset-btn" data-mins="10" onclick="setMockExamTimerMinutes(10, '8-Mark Question (10m)')" style="background: #0f172a; color: #e2e8f0; border: 1px solid #475569; padding: 4px 7px; font-weight: 700; font-size: 11px; border-radius: 4px; cursor: pointer;" title="10 Minutes (8-Mark Question)">10m</button>
      <button type="button" class="mock-preset-btn" data-mins="15" onclick="setMockExamTimerMinutes(15, '12-Mark Question (15m)')" style="background: #0f172a; color: #e2e8f0; border: 1px solid #475569; padding: 4px 7px; font-weight: 700; font-size: 11px; border-radius: 4px; cursor: pointer;" title="15 Minutes (12-Mark Question)">15m</button>
      <button type="button" class="mock-preset-btn" data-mins="25" onclick="setMockExamTimerMinutes(25, '16-Mark Essay (25m)')" style="background: #0f172a; color: #e2e8f0; border: 1px solid #475569; padding: 4px 7px; font-weight: 700; font-size: 11px; border-radius: 4px; cursor: pointer;" title="25 Minutes (16-Mark Essay / Section)">25m</button>
      <button type="button" class="mock-preset-btn" data-mins="${defaultMinutes}" onclick="setMockExamTimerMinutes(${defaultMinutes}, 'Full Paper (${defaultMinutes}m)')" style="background: #0f172a; color: #38bdf8; border: 1px solid #0284c7; padding: 4px 7px; font-weight: 700; font-size: 11px; border-radius: 4px; cursor: pointer;" title="Full Paper (${defaultMinutes}m)">Full (${defaultMinutes}m)</button>
      
      <!-- Custom Minute Input -->
      <div style="display: flex; align-items: center; gap: 3px; margin-left: 4px; border-left: 1px solid #475569; padding-left: 6px;">
        <input type="number" id="mock-custom-mins" min="1" max="240" placeholder="Mins" style="width: 48px; background: #0f172a; color: #ffffff; border: 1px solid #475569; border-radius: 3px; padding: 3px 5px; font-size: 11px; font-weight: 700; text-align: center;">
        <button type="button" onclick="applyCustomMockMinutes()" style="background: #3b82f6; color: #ffffff; border: none; padding: 4px 8px; font-weight: 700; font-size: 11px; border-radius: 3px; cursor: pointer;" title="Apply Custom Minutes">Set</button>
      </div>
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
        (f.includes('mock') || f.includes('clone')),
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

    // 4. Inject or Replace Invigilator HUD with new flexible single-question preset toolbar
    const hudHtml = generateInvigilatorHud(unit.paperRef, unit.defaultMinutes, unit.pacing, msUrl);
    content = replaceOrInjectHud(content, hudHtml);

    // 5. Inject Self-Contained Timer Engine directly before </body>
    const scriptHtml = generateTimerScript(unit.defaultMinutes);
    content = replaceOrInjectTimerScript(content, scriptHtml);

    // 6. Normalize blue mark scheme banners or colorful elements
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
  `\n🎉 Successfully processed and upgraded ${modifiedCount} mock exam papers with self-contained flexible timers!`,
);

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
  return `
  <!-- Top Docked Invigilator Toolbar (Interactive Screen Mode) -->
  <div class="invigilator-hud no-print" style="position: sticky; top: 0; z-index: 9999; background: #000000; color: #ffffff; border-bottom: 2px solid #ffffff; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 15px rgba(0,0,0,0.4); font-family: 'Open Sans', Arial, sans-serif;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div>
        <div style="font-size: 10px; font-weight: 800; letter-spacing: 1px; color: #9ca3af; text-transform: uppercase;">PEARSON EXAM CLOCK &bull; ${paperRef}</div>
        <div id="mock-exam-clock" style="font-size: 24px; font-weight: 800; font-family: 'Courier New', Courier, monospace; color: #ffffff; line-height: 1.1;">${defaultTimeFormatted}</div>
      </div>
      <div style="font-size: 12px; color: #d1d5db; border-left: 1px solid #374151; padding-left: 12px;">
        <div><strong>Pacing:</strong> ${pacingText}</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
      <button type="button" id="mock-timer-toggle" onclick="toggleMockExamTimer('start')" style="background: #ffffff; color: #000000; border: 2px solid #ffffff; padding: 5px 14px; font-weight: 800; font-size: 12px; border-radius: 3px; cursor: pointer;">Start Clock</button>
      <button type="button" id="mock-timer-pause" onclick="toggleMockExamTimer('pause')" style="background: #facc15; color: #000000; border: 2px solid #facc15; padding: 5px 12px; font-weight: 800; font-size: 12px; border-radius: 3px; cursor: pointer; display: none;">Pause</button>
      <button type="button" id="mock-timer-reset" onclick="toggleMockExamTimer('reset')" style="background: transparent; color: #d1d5db; border: 1.5px solid #4b5563; padding: 5px 10px; font-weight: 700; font-size: 12px; border-radius: 3px; cursor: pointer;">Reset</button>
      <button type="button" onclick="toggleMockExamTimer('add5')" style="background: transparent; color: #ffffff; border: 1.5px solid #6b7280; padding: 5px 8px; font-weight: 700; font-size: 12px; border-radius: 3px; cursor: pointer;" title="Add 5 Minutes Extra Time">+5m</button>
      <button type="button" onclick="toggleMockExamTimer('add20')" style="background: transparent; color: #ffffff; border: 1.5px solid #6b7280; padding: 5px 8px; font-weight: 700; font-size: 12px; border-radius: 3px; cursor: pointer;" title="Add 20 Minutes (25% Access Arrangements)">+20m (25%)</button>
      <button type="button" id="mock-timer-sound" onclick="toggleMockExamTimer('toggleSound')" style="background: transparent; color: #ffffff; border: 1.5px solid #6b7280; padding: 5px 8px; font-weight: 700; font-size: 12px; border-radius: 3px; cursor: pointer;">🔊 Sound</button>
      ${msUrl ? `<a id="mock-ms-link" href="${msUrl}" target="_blank" style="background: #ffffff; color: #000000; border: 2px solid #000000; padding: 5px 12px; font-weight: 800; font-size: 12px; border-radius: 3px; text-decoration: none; display: inline-flex; align-items: center; margin-left: 6px;">Teacher Mark Scheme &rarr;</a>` : ''}
    </div>
  </div>
`;
}

function generateTimerScript(defaultMinutes) {
  return `
  <!-- Invigilator HUD Live Timer Engine -->
  <script>
    (function() {
      var totalSecs = ${defaultMinutes} * 60;
      var initialSecs = totalSecs;
      var interval = null;
      var isRunning = false;
      var soundEnabled = true;
      var clockEl = document.getElementById('mock-exam-clock');
      var startBtn = document.getElementById('mock-timer-toggle');
      var pauseBtn = document.getElementById('mock-timer-pause');
      var soundBtn = document.getElementById('mock-timer-sound');

      function formatTime(secs) {
        var h = Math.floor(secs / 3600);
        var m = Math.floor((secs % 3600) / 60);
        var s = secs % 60;
        if (h > 0) {
          return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
        }
        return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
      }

      function updateDisplay() {
        if (!clockEl) return;
        clockEl.textContent = formatTime(totalSecs);
        if (totalSecs === 0) {
          clockEl.style.color = '#f87171';
          clockEl.textContent = "00:00 (TIME'S UP)";
        } else if (totalSecs <= 300) {
          clockEl.style.color = '#facc15';
        } else {
          clockEl.style.color = '#ffffff';
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
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + dur);
        } catch(e) {}
      }

      window.toggleMockExamTimer = function(action) {
        if (action === 'start') {
          if (isRunning) return;
          if (totalSecs === 0) totalSecs = initialSecs;
          isRunning = true;
          if (startBtn) startBtn.style.display = 'none';
          if (pauseBtn) pauseBtn.style.display = 'inline-flex';
          if (interval) clearInterval(interval);
          interval = setInterval(function() {
            if (totalSecs > 0) {
              totalSecs--;
              updateDisplay();
              if (totalSecs === 300) {
                playTone(659.25, 0.7);
                setTimeout(function() { playTone(880, 1.0); }, 300);
              }
              if (totalSecs === 0) {
                playTone(440, 1.2);
                clearInterval(interval);
                interval = null;
                isRunning = false;
                if (startBtn) {
                  startBtn.style.display = 'inline-flex';
                  startBtn.textContent = 'Restart Clock';
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
            startBtn.textContent = 'Resume Clock';
          }
          if (pauseBtn) pauseBtn.style.display = 'none';
        } else if (action === 'reset') {
          if (interval) clearInterval(interval);
          interval = null;
          isRunning = false;
          totalSecs = initialSecs;
          updateDisplay();
          if (startBtn) {
            startBtn.style.display = 'inline-flex';
            startBtn.textContent = 'Start Clock';
          }
          if (pauseBtn) pauseBtn.style.display = 'none';
        } else if (action === 'add5') {
          totalSecs += 300;
          updateDisplay();
        } else if (action === 'add20') {
          totalSecs += 1200;
          updateDisplay();
        } else if (action === 'toggleSound') {
          soundEnabled = !soundEnabled;
          if (soundBtn) {
            soundBtn.textContent = soundEnabled ? '🔊 Sound: On' : '🔇 Sound: Off';
          }
        }
      };
    })();
  </script>
`;
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
        // Find the first div after pageIdx
        const firstDivAfterPage = content.indexOf('<div', pageIdx + '<div class="page"'.length);
        if (firstDivAfterPage !== -1 && firstDivAfterPage < coverIdx) {
          startIdx = firstDivAfterPage;
        }
      }
    }

    // Now find the closing </div> of cover-box by tracking depth from cover-box
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

    // 4. Inject Invigilator HUD after <body>
    if (!content.includes('id="mock-exam-clock"')) {
      const hudHtml = generateInvigilatorHud(
        unit.paperRef,
        unit.defaultMinutes,
        unit.pacing,
        msUrl,
      );
      content = content.replace(/<body[^>]*>/i, (match) => `${match}\n${hudHtml}`);
    }

    // 5. Inject Timer Script before </body>
    if (!content.includes('toggleMockExamTimer')) {
      const scriptHtml = generateTimerScript(unit.defaultMinutes);
      content = content.replace(/<\/body>/i, `${scriptHtml}\n</body>`);
    }

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

console.log(`\n🎉 Successfully processed and restyled ${modifiedCount} mock exam papers!`);

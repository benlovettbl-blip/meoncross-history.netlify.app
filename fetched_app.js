import { renderExamPracticeZone } from "/eee/exam_practice_zone.js";
import { initKeyIndividualsTask, generateKeyIndividualCardHTML, generateKeyIndividualEmbedHTML } from "/eee/key_individuals.js";
import { renderQuizZone } from "/eee/quiz_zone.js";
import { sanitizeLessonData, cleanQuestionText } from "/eee/data_parser.js";
import { sectionAGuide, sectionBGuide, middleEastGuide, weimarGuide } from "/eee/exam_guide_content.js";

window.examTimers = {};

window.toggleExamTimer = function(cardId, defaultMinutes) {
  const container = document.getElementById('timer-container-' + cardId);
  if (container.style.display === 'none') {
    container.style.display = 'flex';
    if (!window.examTimers[cardId]) {
      window.examTimers[cardId] = {
        totalSeconds: defaultMinutes * 60,
        remainingSeconds: defaultMinutes * 60,
        interval: null,
        isRunning: false
      };
      updateTimerDisplay(cardId);
    }
  } else {
    container.style.display = 'none';
  }
};

window.adjustExamTimer = function(cardId, minutesChange) {
  const timer = window.examTimers[cardId];
  if (!timer || timer.isRunning) return;
  
  const newSeconds = timer.totalSeconds + (minutesChange * 60);
  if (newSeconds >= 60) {
    timer.totalSeconds = newSeconds;
    timer.remainingSeconds = newSeconds;
    updateTimerDisplay(cardId);
  }
};

window.startExamTimer = function(cardId) {
  const timer = window.examTimers[cardId];
  if (!timer) return;
  
  const btn = document.getElementById('timer-start-btn-' + cardId);
  
  if (timer.isRunning) {
    // Pause
    clearInterval(timer.interval);
    timer.isRunning = false;
    btn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
    btn.style.background = '#f59e0b';
    btn.onmouseout = function() { this.style.background='#f59e0b' };
    btn.onmouseover = function() { this.style.background='#d97706' };
  } else {
    // Start
    timer.isRunning = true;
    btn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
    btn.style.background = '#f59e0b';
    btn.onmouseout = function() { this.style.background='#f59e0b' };
    btn.onmouseover = function() { this.style.background='#d97706' };
    
    timer.interval = setInterval(() => {
      if (timer.remainingSeconds > 0) {
        timer.remainingSeconds--;
        updateTimerDisplay(cardId);
      } else {
        clearInterval(timer.interval);
        timer.isRunning = false;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Time Up!';
        btn.style.background = '#ef4444';
        btn.onmouseout = function() { this.style.background='#ef4444' };
        btn.onmouseover = function() { this.style.background='#dc2626' };
      }
    }, 1000);
  }
};

window.resetExamTimer = function(cardId, defaultMinutes) {
  const timer = window.examTimers[cardId];
  if (!timer) return;
  
  clearInterval(timer.interval);
  timer.remainingSeconds = timer.totalSeconds;
  timer.isRunning = false;
  
  const btn = document.getElementById('timer-start-btn-' + cardId);
  btn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
  btn.style.background = '#10b981';
  btn.onmouseout = function() { this.style.background='#10b981' };
  btn.onmouseover = function() { this.style.background='#059669' };
  
  updateTimerDisplay(cardId);
};

function updateTimerDisplay(cardId) {
  const timer = window.examTimers[cardId];
  if (!timer) return;
  
  const m = Math.floor(timer.remainingSeconds / 60);
  const s = timer.remainingSeconds % 60;
  
  const display = document.getElementById('timer-display-' + cardId);
  if (display) {
    display.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    if (timer.remainingSeconds <= 60 && timer.remainingSeconds > 0) {
      display.style.color = '#dc2626';
    } else {
      display.style.color = '#1e3a8a';
    }
  }
  
  const progress = document.getElementById('timer-progress-' + cardId);
  if (progress) {
    const percentage = (timer.remainingSeconds / timer.totalSeconds) * 100;
    progress.style.width = percentage + '%';
    if (percentage < 20) {
      progress.style.background = '#ef4444';
    } else if (percentage < 50) {
      progress.style.background = '#f59e0b';
    } else {
      progress.style.background = '#3b82f6';
    }
  }
}

export function getAssetUrl(path) {
  if (!path) return path;
  if (path.startsWith('http') || path.startsWith('/')) return path;
  if (window.currentUnitId) {
    return `/units/${window.currentUnitId}/${path}`;
  }
  return path;
}

export function initializeApp(unitData) {
  window.currentUnitData = unitData;
  
  const init = () => {
  // Listen for custom events from dynamically loaded modules (like the Thematic Matrix)
  window.addEventListener('renderLessonEvent', (e) => {
    const lesson = e.detail;
    renderLesson(lesson);
    setTimeout(() => {
      const ca = document.getElementById('content-area');
      if (ca) {
        ca.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
    // Try to update sidebar active state
    document.querySelectorAll('.lesson-link').forEach(l => {
      l.classList.remove('active');
      if (l.textContent.includes(lesson.title)) {
        l.classList.add('active');
      }
    });
  });

  const sidebar = document.getElementById('sidebar');
  const contentArea = document.getElementById('content-area');
  const btnDyslexia = document.getElementById('btn-dyslexia');

  // Inject Custom Styles for Layout & SEN (No Icons)
  const style = document.createElement('style');
  style.textContent = `
    .phase-card {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 30px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.08);
    }
    .phase-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.6rem;
      font-weight: 700;
      color: #0f172a;
      margin-top: 0;
      margin-bottom: 20px;
      border-bottom: 2px solid rgba(0,0,0,0.05);
      padding-bottom: 10px;
    }
    .narrative-chunk {
      background: #f8fafc;
      border-left: 4px solid #002855;
      padding: 15px 20px;
      margin-bottom: 18px;
      border-radius: 0 6px 6px 0;
      line-height: 1.8;
      font-size: 1.05rem;
    }
    .vocab-word {
      position: relative;
      border-bottom: 2px dashed #3b82f6;
      cursor: pointer;
      color: #1e3a8a;
      font-weight: 700;
      background: rgba(59, 130, 246, 0.1);
      padding: 0 4px;
      border-radius: 3px;
      transition: all 0.2s ease;
    }
    .vocab-word:hover, .vocab-word.active {
      background: rgba(59, 130, 246, 0.25);
      border-bottom-color: #1e3a8a;
    }
    #global-glossary-popover {
      position: fixed;
      background: #1e293b;
      color: #ffffff;
      padding: 12px 16px;
      border-radius: 8px;
      width: max-content;
      max-width: 300px;
      font-size: 0.9rem;
      font-weight: 400;
      line-height: 1.5;
      z-index: 100000;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      pointer-events: none;
      opacity: 0;
      transform: translateY(10px) scale(0.95);
      transition: opacity 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    #global-glossary-popover.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    #global-glossary-popover::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -6px;
      border-width: 6px;
      border-style: solid;
      border-color: #1e293b transparent transparent transparent;
      transition: left 0.2s ease;
    }
    #global-glossary-popover.arrow-top::after {
      top: auto;
      bottom: 100%;
      border-color: transparent transparent #1e293b transparent;
    }
    .scaffold-box {
      background: #fafafa;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 14px;
      margin-top: 12px;
      font-size: 0.95rem;
    }
    .starter-box { border-left: 4px solid #2563eb; }
    .clue-box { border-left: 4px solid #d97706; }
    .model-box { border-left: 4px solid #059669; }
    .btn-group {
      display: flex;
      gap: 10px;
      margin-top: 10px;
      flex-wrap: wrap;
    }
    .student-answer-input {
      display: none;
      width: 100%;
      height: 140px;
      padding: 10px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-family: inherit;
      resize: vertical;
      margin-bottom: 10px;
    }
    .laptop-mode-active .student-answer-input {
      display: block;
    }
    .do-now-card {
      background: rgba(248, 250, 252, 0.9);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(226, 232, 240, 0.8);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    .do-now-card .answer {
      display: none;
      margin-top: 10px;
      padding: 10px;
      background: #e2e8f0;
      border-radius: 4px;
      font-weight: 500;
    }
    .do-now-card.revealed .answer {
      display: block;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid transparent;
      font-size: 0.95rem;
      font-family: inherit;
    }
    .btn-primary {
      background: #1a237e;
      color: white;
      border-color: #1a237e;
    }
    .btn-primary:hover {
      background: #0d1659;
    }
    .btn-sm-icon {
      padding: 4px 8px;
      font-size: 0.9rem;
      border-radius: 4px;
      margin-left: 6px;
    }
    .student-answer-input {
      width: 100%;
      height: 80px;
      padding: 10px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-family: inherit;
      resize: vertical;
      box-sizing: border-box;
      margin-top: 5px;
    }
    .fab-copy {
      display: none;
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: #1e3a8a;
      color: white;
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      font-size: 1.5rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      cursor: pointer;
      z-index: 1000;
      transition: transform 0.2s, background 0.2s;
    }
    .fab-copy:hover {
      transform: scale(1.05);
      background: #1e293b;
    }
    .laptop-mode-active .fab-copy {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-secondary {
      background: #e2e8f0;
      color: #334155;
      border-color: #cbd5e1;
    }
    .btn-secondary:hover {
      background: #cbd5e1;
      color: #0f172a;
    }
    .reading-active {
      background: #ef4444 !important;
      color: white !important;
      border-color: #dc2626 !important;
    }
    .sidebar {
      background: #0f172a !important;
      border-right: none !important;
      box-shadow: 2px 0 15px rgba(0,0,0,0.1);
    }
    .sidebar .fa-graduation-cap, .sidebar h2, .sidebar span, .sidebar .lesson-link {
      color: #f1f5f9 !important;
    }
    .sidebar .lesson-link {
      background: rgba(255,255,255,0.05) !important;
      border: 1px solid transparent;
    }
    .sidebar .lesson-link:hover, .sidebar .lesson-link.active {
      background: rgba(255,255,255,0.15) !important;
      color: #ffffff !important;
      border-color: rgba(255,255,255,0.2);
    }
    .sidebar-header {
      border-bottom: 1px solid rgba(255,255,255,0.1) !important;
    }
    .source-card img {
      max-width: 100%;
      max-height: 500px;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
    .flashcard-deck {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    .flashcard-wrapper {
      background-color: transparent;
      height: 200px;
      perspective: 1000px;
      cursor: pointer;
    }
    .flashcard-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
    }
    .flashcard-face {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
      -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
    }
    .flashcard-front {
      background-color: #f1f5f9;
      color: #333;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 15px;
      border: 1px solid #cbd5e1;
      transform: rotateY(0deg);
      -webkit-transform: rotateY(0deg);
    }
    .flashcard-front h4 {
      margin: 0 0 10px 0;
      color: #1e293b;
      font-size: 1.1rem;
    }
    .flashcard-front p {
      margin: 0;
      color: #64748b;
      font-size: 0.9rem;
    }
    .flashcard-back {
      background-color: #3b82f6;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 15px;
      transform: rotateY(180deg);
      -webkit-transform: rotateY(180deg);
      font-size: 1.05rem;
      line-height: 1.5;
    }
    .flashcard-wrapper.flipped .flashcard-front {
      transform: rotateY(-180deg);
      -webkit-transform: rotateY(-180deg);
    }
    .flashcard-wrapper.flipped .flashcard-back {
      transform: rotateY(0deg);
      -webkit-transform: rotateY(0deg);
    }
    .teacher-note {
      display: none;
      background: #1e293b;
      color: #f8fafc;
      border-left: 4px solid #facc15;
      padding: 15px 20px;
      border-radius: 6px;
      margin-bottom: 25px;
      font-size: 1.05rem;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      line-height: 1.6;
    }
    .teacher-note h4 {
      margin-top: 0;
      margin-bottom: 10px;
      color: #facc15;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.15rem;
    }
    .teacher-mode-active .teacher-note {
      display: block;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
    .para-number {
      background: #e2e8f0;
      color: #475569;
      font-weight: bold;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      margin-right: 15px;
      flex-shrink: 0;
      margin-top: 2px;
    }
    @keyframes highlightPulse {
      0% { background: #fef08a; transform: scale(1.02); }
      50% { background: #fef08a; transform: scale(1.02); }
      100% { background: #f8fafc; transform: scale(1); }
    }
    .highlight-flash {
      animation: highlightPulse 2.5s ease-out;
    }
  `;
  document.head.appendChild(style);

  window.scrollToPara = function(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.remove('highlight-flash');
      // Trigger reflow to restart animation
      void el.offsetWidth;
      el.classList.add('highlight-flash');
      setTimeout(() => el.classList.remove('highlight-flash'), 2600);
    }
  };

  let unitEnquiryText = "";
  const headerDivs = document.querySelectorAll('.header-title-container div div');
  headerDivs.forEach(div => {
    if (div.textContent.includes('Unit Enquiry:')) {
      unitEnquiryText = div.textContent;
      div.style.display = 'none';
    }
  });

  // Set up Speech Synthesis
  let synth = window.speechSynthesis;
  let utterance = null;

  // Copy to OneNote FAB
  const fab = document.createElement('button');
  fab.className = 'fab-copy';
  fab.innerHTML = '<i class="fa-solid fa-copy"></i>';
  fab.title = "Copy all answers to OneNote";
  fab.onclick = () => {
    let text = "History Lesson Answers\n\n";
    document.querySelectorAll('.do-now-card').forEach(card => {
      let qTextEl = card.querySelector('div[style*="font-weight: 700"]');
      let textarea = card.querySelector('.student-answer-input');
      if (qTextEl && textarea) {
        let clone = qTextEl.cloneNode(true);
        let span = clone.querySelector('span');
        if (span) span.remove();
        text += clone.textContent.trim() + "\n";
        text += "Answer: " + textarea.value + "\n\n";
      }
    });
    navigator.clipboard.writeText(text).then(() => {
      alert('All answers copied to clipboard! Ready to paste into OneNote.');
    }).catch(err => {
      alert('Failed to copy to clipboard.');
    });
  };
  document.body.appendChild(fab);

  // Global Simplify logic
  window.toggleSimplify = function(btnElement) {
    const textContainer = btnElement.closest('.narrative-chunk').querySelector('.narrative-text');
    if (!textContainer) return;
    
    if (btnElement.classList.contains('simplified-active')) {
      textContainer.innerHTML = decodeURIComponent(btnElement.getAttribute('data-original'));
      btnElement.classList.remove('simplified-active');
      btnElement.style.background = '';
      btnElement.style.color = '#047857';
    } else {
      textContainer.innerHTML = decodeURIComponent(btnElement.getAttribute('data-simplified'));
      btnElement.classList.add('simplified-active');
      btnElement.style.background = '#d1fae5';
      btnElement.style.color = '#065f46';
    }
  };

  // Global Read Aloud logic (Per Paragraph)
  window.readAloudText = function(btnElement) {
    if (synth.speaking && btnElement.classList.contains('reading-active')) {
      synth.cancel();
      btnElement.classList.remove('reading-active');
      btnElement.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      return;
    }
    
    synth.cancel();
    document.querySelectorAll('.narrative-chunk button').forEach(b => {
      b.classList.remove('reading-active');
      b.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    });

    const textToRead = btnElement.closest('.narrative-chunk').querySelector('.narrative-text').textContent;
    if (textToRead.trim() === "") return;

    btnElement.classList.add('reading-active');
    btnElement.innerHTML = '<i class="fa-solid fa-stop"></i>';

    utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.onend = () => {
      btnElement.classList.remove('reading-active');
      btnElement.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    };
    synth.speak(utterance);
  };

  

  // Toggle Dyslexia Mode (Preserve icon)
  btnDyslexia.addEventListener('click', () => {
    document.body.classList.toggle('sen-mode');
    const isSen = document.body.classList.contains('sen-mode');
    if (btnDyslexia.title === 'SEN / Dyslexia Mode' || btnDyslexia.title === 'Standard Mode') {
      // It's an icon button with title
      btnDyslexia.title = isSen ? 'Standard Mode' : 'SEN / Dyslexia Mode';
      btnDyslexia.style.background = isSen ? '#1e293b' : '';
      btnDyslexia.style.color = isSen ? '#ffffff' : '';
    } else {
      // Legacy text button
      btnDyslexia.textContent = isSen ? 'Standard Mode' : 'SEN / Dyslexia Mode';
    }
  });

  // Inject Laptop Mode & Teacher Mode Buttons
  const headerActions = document.querySelector('.header-actions');
  if (headerActions) {
    const btnLaptop = document.createElement('button');
    btnLaptop.className = 'btn btn-secondary';
    btnLaptop.style.marginRight = '5px';
    btnLaptop.style.padding = '6px 12px';
    btnLaptop.title = 'Laptop Mode';
    btnLaptop.innerHTML = '<i class="fa-solid fa-laptop"></i>';
    
    if (localStorage.getItem('laptopMode') === 'true') {
      document.body.classList.add('laptop-mode-active');
      btnLaptop.style.background = '#1e293b';
      btnLaptop.style.color = '#ffffff';
    }

    btnLaptop.addEventListener('click', () => {
      document.body.classList.toggle('laptop-mode-active');
      const isActive = document.body.classList.contains('laptop-mode-active');
      localStorage.setItem('laptopMode', isActive);
      btnLaptop.style.background = isActive ? '#1e293b' : '';
      btnLaptop.style.color = isActive ? '#ffffff' : '';
    });
    headerActions.appendChild(btnLaptop);

    const btnTeacher = document.createElement('button');
    btnTeacher.className = 'btn btn-secondary';
    btnTeacher.innerHTML = '<i class="fa-solid fa-user-tie"></i> Teacher Mode';
    btnTeacher.addEventListener('click', () => {
      document.body.classList.toggle('teacher-mode-active');
      const isActive = document.body.classList.contains('teacher-mode-active');
      btnTeacher.innerHTML = isActive ? '<i class="fa-solid fa-user-tie"></i> Teacher Mode: ON' : '<i class="fa-solid fa-user-tie"></i> Teacher Mode';
      btnTeacher.style.background = isActive ? '#1e293b' : '';
      btnTeacher.style.color = isActive ? '#ffffff' : '';
    });
    headerActions.appendChild(btnTeacher);

    const btnCurriculum = document.createElement('button');
    btnCurriculum.className = 'btn btn-secondary';
    btnCurriculum.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i> Prior Knowledge (Teachers)';
    btnCurriculum.addEventListener('click', () => {
      openCurriculumModal();
    });
    headerActions.appendChild(btnCurriculum);

    const btnWhiteboard = document.createElement('button');
    btnWhiteboard.className = 'btn btn-secondary';
    btnWhiteboard.innerHTML = '<i class="fa-solid fa-person-chalkboard"></i> Task Whiteboard';
    btnWhiteboard.addEventListener('click', () => {
      openTaskWhiteboard();
    });
    headerActions.appendChild(btnWhiteboard);

  }

  function openCurriculumModal() {
    let modal = document.getElementById('curriculum-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'curriculum-modal';
      modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;';
      
      const content = document.createElement('div');
      content.style.cssText = 'background:#ffffff;padding:30px;border-radius:12px;width:90%;max-width:500px;color:#333333;box-shadow:0 10px 25px rgba(0,0,0,0.2);';
      
      content.innerHTML = `
        <h2 style="margin-top:0"><i class="fa-solid fa-clock-rotate-left"></i> Prior Knowledge Setup</h2>
        <p style="opacity:0.8;font-size:0.95rem;">Select the units your class has already been taught. The app will dynamically generate "PAST TOPIC" Do Now retrieval questions from these units.</p>
        <div id="unit-checkboxes" style="display:flex;flex-direction:column;gap:12px;margin:25px 0;">
        </div>
        <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;">
          <button id="close-curriculum" class="btn btn-primary">Save & Close</button>
        </div>
      `;
      modal.appendChild(content);
      document.body.appendChild(modal);

      const availableUnits = [
        { id: 'norman_conquest', title: 'The Norman Conquest' },
        { id: 'water_and_sanitation', title: 'Water & Health Through Time' },
        { id: 'change_1450_1750', title: 'Change 1450-1750 (Tudors)' }
      ];

      const container = content.querySelector('#unit-checkboxes');
      const taught = JSON.parse(localStorage.getItem('taughtUnits') || '[]');

      availableUnits.forEach(u => {
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
          else current = current.filter(id => id !== u.id);
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

  function renderHomepage() {
    let lessonsHTML = `
      <style>
        .premium-banner {
          position: relative; overflow: hidden; border-radius: 12px; padding: 25px 30px; margin-top: 30px; margin-bottom: 20px; 
          box-shadow: 0 10px 25px -10px rgba(0,0,0,0.4); display: flex; flex-direction: column; align-items: flex-start; gap: 8px; 
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: default;
        }
        .premium-banner:hover {
          transform: scale(1.01) translateY(-3px);
          box-shadow: 0 15px 30px -10px rgba(0,0,0,0.5);
        }
        .premium-banner-bg {
          position: absolute; top: -5%; left: -5%; width: 110%; height: 110%; 
          background-position: center; background-size: cover; 
          z-index: 1; filter: brightness(0.9); transition: transform 0.8s ease;
        }
        .premium-banner:hover .premium-banner-bg {
          transform: scale(1.03);
        }
        .premium-banner-overlay-1 {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
          background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%); z-index: 2;
        }
        .premium-banner-overlay-2 {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
          opacity: 0.45; mix-blend-mode: multiply; z-index: 3;
        }
        .premium-banner-glow {
          position: absolute; bottom: -50px; right: -50px; width: 300px; height: 300px; 
          filter: blur(40px); z-index: 3; opacity: 0.6; border-radius: 50%;
        }
        .premium-banner-content {
          position: relative; z-index: 4; padding-left: 20px;
        }
        .premium-banner-title {
          margin: 0; color: #ffffff; font-size: 2rem; font-weight: 700; 
          font-family: 'Playfair Display', serif; text-shadow: 0px 4px 12px rgba(0,0,0,0.8); letter-spacing: -0.5px;
        }
        .premium-banner-enquiry {
          margin: 8px 0 0 0; color: #f8fafc; font-size: 1.05rem; font-style: italic; 
          max-width: 800px; font-weight: 300; text-shadow: 0px 2px 8px rgba(0,0,0,0.8);
        }
      </style>
    `;
    if (window.currentUnitId === 'edexcel_medicine' || window.currentUnitId === 'cme_new' || window.currentUnitId === 'weimar_nazi_germany' || window.currentUnitId === 'eee') {
      let periods = [];
      if (window.currentUnitId === 'edexcel_medicine') {
        periods = [
          { id: 'medieval', title: 'Medieval (c1250-c1500)', prefix: 'lesson_1_', gradient: 'linear-gradient(135deg, #7f1d1d, #dc2626)', border: '#dc2626', image: 'assets/banners/medieval_pano_1784551792993.png', enquiry: 'How much did medicine really change in Medieval England?' },
          { id: 'renaissance', title: 'Renaissance (c1500-c1700)', prefix: 'lesson_2_', gradient: 'linear-gradient(135deg, #064e3b, #059669)', border: '#059669', image: 'assets/banners/renaissance_pano_1784551804068.png', enquiry: 'Why did the Medical Renaissance have so little impact on everyday treatments?' },
          { id: '18th_19th', title: '18th & 19th C (c1700-c1900)', prefix: 'lesson_3_', gradient: 'linear-gradient(135deg, #475569, #d97706)', border: '#d97706', image: 'assets/banners/industrial_pano_1784551813599.png', enquiry: 'How did the Industrial Revolution transform the understanding and prevention of disease?' },
          { id: 'modern', title: 'Modern (c1900-present)', prefix: 'lesson_4_', gradient: 'linear-gradient(135deg, #0c4a6e, #0284c7)', border: '#0284c7', image: 'assets/banners/modern_pano_1784551822373.png', enquiry: 'How did technology and government intervention revolutionize 20th-century medicine?' },
          { id: 'western_front', title: 'Western Front', prefix: 'lesson_5_', gradient: 'linear-gradient(135deg, #422006, #65a30d)', border: '#65a30d', image: 'assets/banners/western_front_pano_1784551831887.png', enquiry: 'How did the horrific conditions of trench warfare drive rapid medical innovation?' }
        ];
      } else if (window.currentUnitId === 'cme_new') {
        periods = [
          { id: 'KT1', title: 'Key Topic 1: The Birth of Israel', prefix: 'KT1', gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', border: '#3b82f6', image: 'assets/cme_new_kt1_cover.png', enquiry: 'How and why was the state of Israel established?' },
          { id: 'KT2', title: 'Key Topic 2: Escalating Conflict', prefix: 'KT2', gradient: 'linear-gradient(135deg, #7f1d1d, #ef4444)', border: '#ef4444', image: 'assets/cme_new_yom_kippur_crossing.png', enquiry: 'What drove the major conflicts in the Middle East from 1967-1973?' },
          { id: 'KT3', title: 'Key Topic 3: Attempts at Peace', prefix: 'KT3', gradient: 'linear-gradient(135deg, #064e3b, #10b981)', border: '#10b981', image: 'assets/cme_new_camp_david_accords.png', enquiry: 'Why has lasting peace in the Middle East been so difficult to achieve?', bgPos: 'center 20%' }
        ];
      } else if (window.currentUnitId === 'weimar_nazi_germany' || (window.currentUnitData && window.currentUnitData.title && window.currentUnitData.title.includes('Weimar'))) {
        periods = [
          { id: 'KT1', title: 'Key Topic 1: The Weimar Republic (1918-29)', prefix: 'lesson_1_', gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', border: '#3b82f6', image: 'assets/banners/kt1_weimar_banner.png', enquiry: 'To what extent did the Weimar Republic recover from its early crises?' },
          { id: 'KT2', title: "Key Topic 2: Hitler's Rise to Power, 1919-33", prefix: 'lesson_2_', gradient: 'linear-gradient(135deg, #7f1d1d, #dc2626)', border: '#dc2626', image: 'assets/banners/kt2_weimar_banner.png', enquiry: 'How did a tiny obscure political group transform?' },
          { id: 'KT3', title: "Key Topic 3: Nazi Control and Dictatorship", prefix: 'lesson_3_', gradient: 'linear-gradient(135deg, #4b5563, #1f2937)', border: '#1f2937', image: 'assets/banners/kt3_weimar_banner.png', enquiry: 'From chains to absolute control' },
          { id: 'KT4', title: "Key Topic 4: Life in Nazi Germany, 1933-39", prefix: 'lesson_4_', gradient: 'linear-gradient(135deg, #4d7c0f, #65a30d)', border: '#65a30d', image: 'assets/banners/kt4_weimar_banner.png', enquiry: 'Did life improve under the Nazis?' }
        ];
      } else if (window.currentUnitId === 'eee' || (window.currentUnitData && window.currentUnitData.title && window.currentUnitData.title.includes('Elizabeth'))) {
        periods = [
          { id: 'KT1', title: 'Key Topic 1: Queen, government and religion, 1558-69', prefix: 'lesson_1_', gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', border: '#3b82f6', image: 'assets/placeholder_cover.jpg', enquiry: 'From religious division to the Armada: How did Elizabeth secure her throne?' },
          { id: 'KT2', title: "Key Topic 2: Challenges to Elizabeth at home and abroad, 1569-88", prefix: 'lesson_2_', gradient: 'linear-gradient(135deg, #7f1d1d, #dc2626)', border: '#dc2626', image: 'assets/placeholder_cover.jpg', enquiry: 'Why did plots and foreign threats push Elizabeth towards war?' },
          { id: 'KT3', title: "Key Topic 3: Elizabethan society in the Age of Exploration, 1558-88", prefix: 'lesson_3_', gradient: 'linear-gradient(135deg, #4b5563, #1f2937)', border: '#1f2937', image: 'assets/placeholder_cover.jpg', enquiry: 'What was life like during the Elizabethan Golden Age?' }
        ];
      }
      
      periods.forEach(p => {
        lessonsHTML += `
          <div class="premium-banner">
            <div class="premium-banner-bg" style="background-image: url('${p.image}'); background-position: ${p.bgPos || 'center'};"></div>
            <div class="premium-banner-overlay-1"></div>
            <div class="premium-banner-overlay-2" style="background: ${p.gradient};"></div>
            <div class="premium-banner-glow" style="background: radial-gradient(circle, ${p.border} 0%, transparent 70%);"></div>
            <div class="premium-banner-content" style="border-left: 6px solid ${p.border};">
              <h3 class="premium-banner-title">${p.title}</h3>
              <p class="premium-banner-enquiry">${p.enquiry}</p>
            </div>
          </div>
        `;
        lessonsHTML += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; text-align: left;">';
        
        let foundAny = false;
        unitData.lessons.forEach((lesson, index) => {
          if ((lesson.id && lesson.id.startsWith(p.prefix)) || (lesson.title && lesson.title.startsWith(p.prefix))) {
            foundAny = true;
            lessonsHTML += `
              <div class="homepage-lesson-card" data-index="${index}" style="background: white; border: 1px solid #e2e8f0; border-left: 5px solid ${p.border}; border-radius: 8px; padding: 12px 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.05)';">
                <h3 style="margin-top: 0; color: #1a237e; font-size: 1rem; margin-bottom: 5px; font-family: 'Outfit', sans-serif;">Lesson ${index + 1}</h3>
                <p style="margin: 0; color: #475569; font-weight: 500; font-size: 0.9rem; line-height: 1.3;">${lesson.title.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')}</p>
              </div>
            `;
          }
        });
        
        // ADD WORKBOOK FOR THIS PERIOD
        lessonsHTML += `
          <div class="homepage-lesson-card" style="background: #f8fafc; border: 2px dashed ${p.border}; border-radius: 8px; padding: 12px 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center;" onclick="window.open('/units/${window.currentUnitId}/workbook_${p.id}.html', '_blank')" onmouseover="this.style.background='white'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.background='#f8fafc'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
             <i class="fa-solid fa-book-open" style="font-size: 1.2rem; color: ${p.border}; margin-bottom: 6px;"></i>
             <h3 style="margin: 0; color: #334155; font-size: 0.9rem;">Workbook: ${p.title}</h3>
          </div>
        `;
        
        // ADD MASTERY PACK FOR THIS PERIOD
        lessonsHTML += `
          <div class="homepage-lesson-card" style="background: #fff0f2; border: 2px dashed #d32f2f; border-radius: 8px; padding: 12px 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center;" onclick="window.open('/units/${window.currentUnitId}/mastery_pack_${p.id}.html', '_blank')" onmouseover="this.style.background='white'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.background='#fff0f2'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
             <i class="fa-solid fa-shield-halved" style="font-size: 1.2rem; color: #d32f2f; margin-bottom: 6px;"></i>
             <h3 style="margin: 0; color: #d32f2f; font-size: 0.9rem;">Mastery Pack: ${p.title}</h3>
          </div>
        `;

        if (!foundAny) {
           lessonsHTML += `<p style="color: #64748b; font-style: italic; margin-left: 10px;">No lessons found for this period.</p>`;
        }
        lessonsHTML += '</div>';
      });
    } else {
      lessonsHTML = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 40px; text-align: left;">';
      unitData.lessons.forEach((lesson, index) => {
        lessonsHTML += `
          <div class="homepage-lesson-card" data-index="${index}" style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
            <h3 style="margin-top: 0; color: #1a237e; font-size: 1.1rem; margin-bottom: 10px;">Lesson ${index + 1}</h3>
            <p style="margin: 0; color: #475569; font-weight: 500; font-size: 0.95rem;">${lesson.title}</p>
          </div>
        `;
      });
      lessonsHTML += '</div>';
      

      if (unitData.mock_exams && Array.isArray(unitData.mock_exams) && unitData.mock_exams.length > 0) {
        lessonsHTML += '<h2 style="margin-top: 40px; text-align: left; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Mock Exams</h2>';
        lessonsHTML += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; text-align: left;">';
        unitData.mock_exams.forEach(mock => {
          const mockUrl = window.currentUnitId ? `/units/${window.currentUnitId}/${mock.url}` : mock.url;
          lessonsHTML += `
            <div class="homepage-lesson-card" style="background: #fdf2f8; border: 2px dashed #db2777; border-radius: 8px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center;" onclick="window.open('${mockUrl}', '_blank')" onmouseover="this.style.background='white'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.background='#fdf2f8'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
              <i class="fa-solid fa-file-signature fa-2x" style="color: #db2777; margin-bottom: 10px;"></i>
              <h3 style="margin: 0; color: #334155; font-size: 0.9rem;">${mock.title}</h3>
            </div>
          `;
        });
        lessonsHTML += '</div>';
      }

      if (unitData.printable_workbooks && unitData.printable_workbooks.length > 0) {
        lessonsHTML += '<h2 style="margin-top: 40px; text-align: left; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Printable Workbooks</h2>';
        lessonsHTML += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; text-align: left;">';
        unitData.printable_workbooks.forEach(wb => {
          const wbUrl = window.currentUnitId ? `/units/${window.currentUnitId}/${wb.url}` : wb.url;
          lessonsHTML += `
            <div class="homepage-lesson-card" style="background: #f8fafc; border: 2px dashed #3b82f6; border-radius: 8px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center;" onclick="window.open('${wbUrl}', '_blank')" onmouseover="this.style.background='white'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.background='#f8fafc'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
               <i class="fa-solid fa-book-open" style="font-size: 1.5rem; color: #3b82f6; margin-bottom: 10px;"></i>
               <h3 style="margin: 0; color: #334155; font-size: 1.1rem;">${wb.title}</h3>
            </div>
          `;
        });
        lessonsHTML += '</div>';
      }
    }



    contentArea.innerHTML = `
      <div style="text-align: center; padding-bottom: 50px;">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 2.8rem; color: #1a237e; margin-bottom: 10px; line-height: 1.2;">${unitData.enquiry_question || unitData.enquiry || 'Unit Enquiry'}</h1>
        <h2 style="font-size: 1.4rem; color: #475569; font-weight: 500; margin-top: 0; margin-bottom: 30px;">
          ${unitData.title}
        </h2>
        
        ${Array.isArray(unitData.cover_image) ? `
          <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 20px;">
            ${unitData.cover_image.map(img => `
              <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 4px solid white; flex: 1; max-height: 400px; display: flex; align-items: center; justify-content: center; background: #0f172a;">
                <img src="${getAssetUrl(img)}" alt="Unit Cover" style="max-width: 100%; max-height: 100%; object-fit: contain; display: block;">
              </div>
            `).join('')}
          </div>
        ` : (unitData.cover_image ? `
          <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 4px solid white; display: block; margin: 0 auto 5px auto; max-width: 33%;">
            <img src="${getAssetUrl(unitData.cover_image)}" alt="Unit Cover" style="max-width: 100%; height: auto; display: block; max-height: 400px; margin: 0 auto;">
          </div>
        ` : '')}
        
        ${unitData.cover_caption ? `<p style="margin-top: 5px; margin-bottom: 20px; font-style: italic; color: #64748b; font-size: 0.95rem; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto;">${unitData.cover_caption}</p>` : ''}
        
        <h2 style="margin-top: 40px; text-align: left; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Key Topic Lessons</h2>
        ${lessonsHTML}
        

      </div>
    `;

    // Add click listeners to cards
    const cards = contentArea.querySelectorAll('.homepage-lesson-card');
    cards.forEach(card => {
      card.addEventListener('mouseover', () => {
        card.style.transform = 'translateY(-3px)';
        card.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
      });
      card.addEventListener('mouseout', () => {
        card.style.transform = 'none';
        card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
      });
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.index);
        document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
        renderLesson(unitData.lessons[idx]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  function renderExamGuide() {
    contentArea.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'dashboard-container';
    
    let contentHtml = '';
    if (unitData.title && unitData.title.toLowerCase().includes('medicine')) {
      contentHtml = `
        <div class="welcome-banner" style="background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #e2e8f0; font-size: 1.15rem; margin: 0;">The Pearson Edexcel GCSE (9-1) History Paper 1</p>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
          ${sectionAGuide}
          ${sectionBGuide}
        </div>
      `;
    } else if (unitData.title && unitData.title.toLowerCase().includes('middle east')) {
      contentHtml = `
        <div class="welcome-banner" style="background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #fecaca; font-size: 1.15rem; margin: 0;">The Pearson Edexcel GCSE (9-1) History Paper 2</p>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
          ${middleEastGuide}
        </div>
      `;
    } else if (unitData.title && (unitData.title.toLowerCase().includes('weimar') || unitData.title.toLowerCase().includes('germany'))) {
      contentHtml = `
        <div class="welcome-banner" style="background: linear-gradient(135deg, #334155 0%, #0f172a 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #cbd5e1; font-size: 1.15rem; margin: 0;">The Pearson Edexcel GCSE (9-1) History Paper 3</p>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
          ${weimarGuide}
        </div>
      `;
    } else {
      contentHtml = `
        <div class="welcome-banner" style="background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #e2e8f0; font-size: 1.15rem; margin: 0;">Revision strategies for this unit</p>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
          <p>No specific exam guidance is available for this unit yet.</p>
        </div>
      `;
    }
    
    container.innerHTML = contentHtml;
    contentArea.appendChild(container);
  }

  // Render Sidebar
  function renderSidebar() {
    const navContainer = document.getElementById('sidebar-nav-container') || sidebar;
    navContainer.innerHTML = '';

    // Unit Homepage Tab
    const homeLink = document.createElement('a');
    homeLink.className = 'lesson-link active';
    homeLink.innerHTML = '<i class="fa-solid fa-home" style="margin-right: 8px;"></i> Unit Homepage';
    homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
      homeLink.classList.add('active');
      renderHomepage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    navContainer.appendChild(homeLink);

    // Exam Specification Tab
    if (unitData.specification_file) {
      const specLink = document.createElement('a');
      specLink.className = 'lesson-link';
      const specTitle = (unitData.title && unitData.title.includes('KS3')) ? 'Curriculum Overview' : 'Exam Specification';
      specLink.innerHTML = `<i class="fa-solid fa-list-check" style="margin-right: 8px;"></i> ${specTitle}`;
      specLink.href = '#';
      specLink.onclick = (e) => {
        e.preventDefault();
        document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
        specLink.classList.add('active');
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = '';
        import('/src/spec_viewer.js').then(module => {
          module.initSpecViewer(contentArea, unitData.specification_file);
        });
      };
      navContainer.appendChild(specLink);
    }

    // Exam Masterclass Guide Tab - ONLY for KS4 units
    if (!unitData.title || !unitData.title.includes('KS3')) {
      const guideLink = document.createElement('a');
      guideLink.className = 'lesson-link';
      guideLink.innerHTML = '<i class="fa-solid fa-graduation-cap" style="margin-right: 8px;"></i> Exam Masterclass Guide';
      guideLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
        guideLink.classList.add('active');
        renderExamGuide();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      navContainer.appendChild(guideLink);
    }

    // Thematic Matrix Tab (Change & Continuity) - Only for Medicine
    if (window.currentUnitId === 'edexcel_medicine') {
      const thematicLink = document.createElement('a');
      thematicLink.className = 'lesson-link';
      thematicLink.innerHTML = '<i class="fa-solid fa-timeline" style="margin-right: 8px;"></i> Thematic Matrix (Change & Continuity)';
      thematicLink.style.background = 'rgba(56, 189, 248, 0.1)';
      thematicLink.style.borderLeft = '3px solid #38bdf8';
      thematicLink.addEventListener('click', async (e) => {
        e.preventDefault();
        document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
        thematicLink.classList.add('active');
        
        const { renderThematicMatrix } = await import("/eee/thematic_matrix.js");
        const contentArea = document.getElementById('content-area');
        renderThematicMatrix(contentArea, unitData);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      navContainer.appendChild(thematicLink);
    }





    // Add Guided Reading Tab if available
    if (unitData.guided_reading && unitData.guided_reading.length > 0) {
      const grLink = document.createElement('a');
      grLink.className = 'lesson-link';
      grLink.innerHTML = '<i class="fa-solid fa-book-open" style="margin-right: 8px;"></i> Guided Reading';
      grLink.href = '#';
      grLink.style.marginTop = '15px';
      grLink.style.borderTop = '1px solid #e2e8f0';
      grLink.style.paddingTop = '15px';
      grLink.onclick = async (e) => {
        e.preventDefault();
        document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
        grLink.classList.add('active');
        
        // Dynamically load the guided reading module to avoid cluttering core_app.js
        const { initGuidedReadingTask } = await import("/eee/guided_reading.js");
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = '';
        
        let currentLessonIndex = 0;
        if (window.currentActiveLesson && unitData.lessons) {
          currentLessonIndex = unitData.lessons.findIndex(l => l.title === window.currentActiveLesson.title);
        }
        
        initGuidedReadingTask(contentArea, unitData.guided_reading, { currentLessonIndex });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      navContainer.appendChild(grLink);
    }

    const examPracticeLink = document.createElement('a');
    examPracticeLink.className = 'lesson-link';
    examPracticeLink.innerHTML = (unitData.title && unitData.title.includes('KS3')) ? '✍️ Assessments' : '✍️ Assessments & Exam Practice';
    examPracticeLink.style.marginTop = '15px';
    examPracticeLink.style.color = '#60a5fa'; // Blue-400
    examPracticeLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
      examPracticeLink.classList.add('active');
      const contentArea = document.getElementById('content-area');
      contentArea.innerHTML = ''; // clear
      renderExamPracticeZone(contentArea, unitData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    navContainer.appendChild(examPracticeLink);

    const quizPackLink = document.createElement('a');
    quizPackLink.id = 'quiz-zone-link';
    quizPackLink.className = 'lesson-link';
    quizPackLink.innerHTML = '<i class="fa-solid fa-layer-group"></i> Interactive Revision Hub';
    quizPackLink.style.marginTop = '15px';
    quizPackLink.style.color = '#34d399'; // Emerald-400
    quizPackLink.style.cursor = 'pointer';
    quizPackLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
      quizPackLink.classList.add('active');
      const contentArea = document.getElementById('content-area');
      contentArea.innerHTML = '';
      renderQuizZone(contentArea, unitData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    navContainer.appendChild(quizPackLink);

    
    if (window.currentUnitId !== 'water_and_sanitation') {
      const cheatSheetLink = document.createElement('a');
      cheatSheetLink.className = 'lesson-link';
      cheatSheetLink.innerHTML = '<i class="fa-solid fa-file-invoice"></i> Revision Cheat Sheet';
      cheatSheetLink.href = window.currentUnitId ? `/units/${window.currentUnitId}/cheat_sheet.html` : 'cheat_sheet.html';
      cheatSheetLink.target = '_blank';
      cheatSheetLink.style.marginTop = '15px';
      navContainer.appendChild(cheatSheetLink);
    }


  }

  
  // Global markdown formatter for inline text
  window.formatBold = function(text) {
    return text ? text.replace(/\\n|\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') : '';
  };
  
  // Render Lesson Content
  function renderLesson(lesson) {
    const formatBold = window.formatBold;
    lesson = sanitizeLessonData(JSON.parse(JSON.stringify(lesson)));
    
    // Extract exam tasks from tasks array so they are not rendered inline
    let extractedExamTasks = [];
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => {
        if (block.tasks) {
          const eTasks = block.tasks.filter(t => (t.text || t.question || '').includes('marks)'));
          extractedExamTasks.push(...eTasks);
          block.tasks = block.tasks.filter(t => !(t.text || t.question || '').includes('marks)'));
        }
      });
    }
    if (lesson.tasks) {
      const eTasks = lesson.tasks.filter(t => (t.text || t.question || '').includes('marks)'));
      extractedExamTasks.push(...eTasks);
      lesson.tasks = lesson.tasks.filter(t => !(t.text || t.question || '').includes('marks)'));
    }
    
    if (lesson.exam_practice && Array.isArray(lesson.exam_practice)) {
      extractedExamTasks.push(...lesson.exam_practice);
    }

    assignQuestionNumbers(lesson);
    window.currentActiveLesson = lesson;
    
    // Tabs container logic
    const heroImage = window.currentUnitData?.homepage_background || '/images/default_hero.jpg';
    const lessonNumberText = (lesson.id && lesson.id.startsWith('lesson_')) ? `Lesson ${lesson.id.split('_')[1]}` : 'Lesson';
    
    const contentArea = document.getElementById('content-area');
    if (contentArea) contentArea.style.paddingTop = '0'; // Fix gap
    
    let html = `<div class="lesson-content">`;
    
    // Sticky Header (No visible background, but opaque to hide scrolling text)
    html += `
      <div style="position: sticky; top: 0; margin-left: -4rem; margin-right: -4rem; padding: 1rem 4rem; z-index: 90; display:flex; justify-content:space-between; align-items:center; margin-bottom: 2rem; background: #f8f9fa; border: none; box-shadow: none;">
        <h4 style="margin: 0; font-size: 1.1rem; color: var(--primary); font-weight: 600; font-family: 'Playfair Display', serif;">
          ${(lesson.id && lesson.id.startsWith('lesson_')) ? `Lesson ${lesson.id.split('_')[1]}: ` : ''}${lesson.enquiry || lesson.enquiry_question || lesson.inquiry_question || lesson.title}
        </h4>
        <div style="display: flex; gap: 8px; flex-shrink: 0;">
          <button class="btn" style="padding: 6px 12px; font-size: 0.9rem; background: white; color: #0f172a; border: 1px solid rgba(0,0,0,0.1); font-weight: 600; box-shadow: 0 2px 5px rgba(0,0,0,0.05);" onclick="openDebateModal()"><i class="fa-solid fa-comments" style="color: #3b82f6;"></i> Class Debate</button>
          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.9rem; background: white; border: 1px solid rgba(0,0,0,0.1);" onclick="window.renderDashboard()"><i class="fa-solid fa-arrow-left"></i> Unit Menu</button>
        </div>
      </div>
    `;
    
    // Full-Bleed Hero Image
    html += `
      <div class="lesson-hero" style="position: relative; width: calc(100% + 8rem); margin-left: -4rem; margin-top: -1rem; height: 300px; background: url('${heroImage}') center/cover no-repeat; margin-bottom: 2rem; border-bottom: 1px solid var(--border-glass); box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(15,23,42,0.2), rgba(15,23,42,0.9));"></div>
        <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 2rem 4rem;">
          <span style="color: #cbd5e1; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem;">${lessonNumberText}</span>
          <h2 style="font-family: 'Playfair Display', serif; color: white; font-size: 2.5rem; margin: 0.5rem 0 0 0; line-height: 1.2; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">${lesson.title}</h2>
        </div>
      </div>
    `;

    const unitEnquiryText = window.currentUnitData?.enquiry_question || window.currentUnitData?.enquiry || '';
    if (unitEnquiryText) {
      html += `
        <div style="background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); color: #1e3a8a; padding: 15px 20px; border-radius: 12px; margin-bottom: 2rem; text-align: center; font-size: 1.15rem; font-family: 'Playfair Display', serif; font-weight: 600; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid rgba(255,255,255,0.5);">
          <i class="fa-solid fa-lightbulb" style="color: #d97706; margin-right: 10px;"></i> ${unitEnquiryText}
        </div>
      `;
    }
    html += `
      <div id="progress-container" style="background: rgba(226,232,240,0.5); height: 6px; width: 100%; margin-bottom: 20px; border-radius: 3px; overflow: hidden; backdrop-filter: blur(5px);">
        <div id="progress-bar" style="background: #10b981; height: 100%; width: 0%; transition: width 0.3s;"></div>
      </div>
    `;

    // -----------------------------------------------------
    // TABS NAVIGATION UI
    // -----------------------------------------------------
    html += `
      
    `;

    let globalQuestionNum = 1;
    const formatQuestion = (qText) => {
      if (!qText) return '';
      let cleaned = qText.replace(/^(Enquiry:|Q\d+:|Task \d+:|Question \d+[a-z]?:)\s*/i, '');
      return `Question ${globalQuestionNum++}: ${formatBold(cleaned)}`;
    };

    let vocabDict = {};
    if (lesson.vocab) {
      lesson.vocab.forEach(v => {
        vocabDict[v.term.toLowerCase()] = v.definition;
      });
    }

    let seenTerms = new Set();
    const highlightGlossary = (text) => {
      if (Object.keys(vocabDict).length === 0) return text;
      let processedText = text;
      const sortedTerms = Object.keys(vocabDict).sort((a,b) => b.length - a.length);
      for (const term of sortedTerms) {
        const def = vocabDict[term];
        if (!seenTerms.has(term)) {
          const regex = new RegExp(`\\b(${term})\\b`, 'i');
          if (regex.test(processedText)) {
            processedText = processedText.replace(regex, `<span class="vocab-word" data-definition="${def.replace(/"/g, '&quot;')}">$1</span>`);
            seenTerms.add(term);
          }
        }
      }
      return processedText;
    };


    if (lesson.teacher_notes) {
      let notesHtml = '';
      if (lesson.teacher_notes && !Array.isArray(lesson.teacher_notes) && typeof lesson.teacher_notes === 'object') {
        const primerText = lesson.teacher_notes.primer ? `<div style="font-size: 1.05rem; margin-bottom: 20px;">${lesson.teacher_notes.primer}</div>` : '';
        const sourceContext = lesson.teacher_notes.source_context ? `<div style="font-size: 0.95rem; margin-bottom: 20px; background: rgba(2, 132, 199, 0.2); padding: 15px; border-left: 4px solid #38bdf8; border-radius: 4px;"><strong><i class="fa-solid fa-image"></i> Source Context:</strong><br/>${lesson.teacher_notes.source_context}</div>` : '';
        const objectivesHtml = (lesson.teacher_notes.objectives || []).map(note => `
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><i class="fa-solid fa-bullseye" style="font-size: 0.8rem; margin-right: 4px;"></i> ${note.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: 0;">${note.primer}</div>
            ${note.question ? `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); color: #38bdf8; font-weight: 600;"><i class="fa-solid fa-circle-question" style="margin-right: 4px;"></i> Hinge Question: ${note.question}</div>` : ''}
          </div>
        `).join('');
        notesHtml = primerText + sourceContext + objectivesHtml;
      } else if (Array.isArray(lesson.teacher_notes)) {
        notesHtml = lesson.teacher_notes.map(note => `
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><i class="fa-solid fa-bullseye" style="font-size: 0.8rem; margin-right: 4px;"></i> ${note.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: 0;">${note.primer}</div>
            ${note.question ? `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); color: #38bdf8; font-weight: 600;"><i class="fa-solid fa-circle-question" style="margin-right: 4px;"></i> Hinge Question: ${note.question}</div>` : ''}
          </div>
        `).join('');
      } else {
        notesHtml = `<div style="font-size: 1.05rem;">${lesson.teacher_notes}</div>`;
      }

      html += `
        <div class="teacher-note">
          <h4><i class="fa-solid fa-chalkboard-user"></i> Pedagogical Primer</h4>
          ${notesHtml}
        </div>
      `;
    }

    // ==========================================
    // TAB 1: PREPARATION
    // ==========================================
    html += ``;
    
    if (lesson.primary_source) {
      let src = lesson.primary_source.src;
      html += `
        <div class="phase-card">
          <div class="source-card" style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
            <img src="${getAssetUrl(src)}" alt="Source" style="max-height: 500px; max-width: 100%; object-fit: contain; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 15px;">
            <div style="font-weight: bold; margin-bottom: 10px; font-size: 1.1rem; color: var(--primary);">${lesson.primary_source.title}</div>
            ${lesson.primary_source.caption ? `<div style="color: #475569; margin-bottom: 15px; font-size: 0.95rem; text-align: left;">${lesson.primary_source.caption}</div>` : ''}
            ${lesson.primary_source.question ? `
              <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 20px;">
                <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>${formatQuestion(lesson.primary_source.question)}</strong></p>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    
      if (lesson.starters && lesson.starters.length > 0) {
        html += `
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="padding: 15px 20px; background: linear-gradient(to right, #1e3a8a, #3b82f6); color: white; font-weight: bold; font-size: 1.2rem; display: flex; align-items: center;">
              <i class="fa-solid fa-image" style="margin-right: 10px;"></i> Historical Sources: Think & Wonder
            </div>
            <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start;">
        `;
        lesson.starters.forEach((starter, index) => {
          html += `
              <div style="display: flex; flex-direction: column; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; height: 100%;">
                <h4 style="margin: 0 0 15px 0; color: #0f172a; font-size: 1.1rem; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Source ${String.fromCharCode(65 + index)}: ${starter.title}</h4>
                <div style="width: 100%; height: 250px; background-color: #000; border-radius: 4px; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center;">
                  <img src="${starter.source}" style="max-width: 100%; max-height: 100%; object-fit: contain; cursor: zoom-in;" onclick="window.openModal(this.src)">
                </div>
                <div style="font-size: 0.95rem; color: #475569; margin-bottom: 15px; font-style: italic;">
                  ${starter.caption}
                </div>
                <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px; border-radius: 0 4px 4px 0; margin-top: auto;">
                  <div style="font-weight: 700; color: #1e3a8a; margin-bottom: 5px; font-size: 0.95rem;"><i class="fa-solid fa-lightbulb" style="color: #fbbf24; margin-right: 5px;"></i> Think & Wonder</div>
                  <div style="font-size: 0.95rem; color: #1e40af;">${starter.think_wonder}</div>
                </div>
              </div>
          `;
        });
        html += `
            </div>
          </div>
        `;
      }
      
      if (lesson.do_now && lesson.do_now.type === 'timeline' && lesson.do_now.events) {
      html += `
        <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
            <summary style="padding: 10px 15px; cursor: pointer; color: #0f172a; font-weight: bold; font-size: 1.05rem; background: #f8fafc; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
              <span><i class="fa-solid fa-clock-rotate-left" style="color: #3b82f6; margin-right: 10px;"></i> Chronological Timeline</span>
              <i class="fa-solid fa-chevron-down" style="color: #64748b;"></i>
            </summary>
            <div style="padding: 20px;">
              <div style="margin-bottom: 20px; font-size: 1.1rem; color: #1e3a8a;"><strong>${lesson.do_now.prediction_question || ''}</strong></div>
              <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: space-between;">
      `;
      lesson.do_now.events.forEach((ev, idx) => {
        html += `
          <div style="width: 45%; border: 2px solid #cbd5e1; border-radius: 8px; padding: 15px; background: #fff; box-shadow: 2px 2px 0px #94a3b8; margin-bottom: 15px;">
            <div style="font-weight: 800; color: #1e40af; font-size: 1.2rem; margin-bottom: 5px;">${ev.year}</div>
            <div style="font-weight: 600; color: #0f172a; margin-bottom: 8px;">${ev.title}</div>
            <div style="font-size: 0.95rem; color: #475569;">${ev.detail}</div>
            ${ev.img ? `<div style="text-align: center; margin-top: 15px;"><img src="${getAssetUrl(ev.img)}" style="max-width: 40%; border-radius: 4px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>` : ''}
          </div>
        `;
      });
      html += `</div></div></details>`;
    } else if (lesson.do_now && lesson.do_now.items) {
      try {
        const taught = JSON.parse(localStorage.getItem('taughtUnits') || '[]');
        if (taught.length > 0 && window.KNOWLEDGE_BANK) {
          lesson.do_now.items.forEach(item => {
            if (item.question.includes('PAST TOPIC:')) {
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
      } catch(e) { console.error(e); }

      html += `
        <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
            <summary style="padding: 10px 15px; cursor: pointer; color: #0f172a; font-weight: bold; font-size: 1.05rem; background: #f8fafc; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
              <span><i class="fa-solid fa-list-check" style="color: #3b82f6; margin-right: 10px;"></i> Do Now Tasks</span>
              <div>
                <button class="btn btn-secondary" onclick="event.preventDefault(); window.toggleAllAnswers(this.closest('details'))" style="font-size: 0.9rem; padding: 4px 10px; margin-right: 10px;"><i class="fa-solid fa-eye"></i> Reveal All</button>
                <i class="fa-solid fa-chevron-down" style="color: #64748b;"></i>
              </div>
            </summary>
            <div style="padding: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
      `;
      lesson.do_now.items.forEach((item, index) => {
        let qText = item.question;
        let aText = item.answer;
        if (window.currentUnitId) {
          qText = qText.replace(/src=['"]assets\//g, `src="/units/${window.currentUnitId}/assets/`);
          aText = aText.replace(/src=['"]assets\//g, `src="/units/${window.currentUnitId}/assets/`);
        }
        const cardId = `donow-card-${index}`;
        html += `
          <div class="do-now-card" id="do-now-card-${index}" onclick="window.toggleAnswerById('${cardId}')" style="cursor: pointer;">
            <div style="font-weight: 700; margin-bottom: 8px;">Task ${index + 1}</div>
            <div>${qText}</div>
            <div class="answer" id="${cardId}" style="display: none; margin-top: 10px; padding: 10px; background: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 4px;">${aText}</div>
          </div>
        `;
      });
      html += `</div></details>`;
    }

    const hasVocab = lesson.vocab && lesson.vocab.length > 0;
    if (hasVocab) {
      html += `
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
        html += `<button class="btn btn-secondary match-term-btn" data-idx="${idx}" style="text-align: left; padding: 15px; font-weight: bold; border-width: 2px; transition: all 0.2s;">${v.term}</button>`;
      });
      
      html += `</div><div class="match-defs" style="display: flex; flex-direction: column; gap: 10px;">`;
      
      let defs = lesson.vocab.map((v, idx) => ({ def: v.definition, idx: idx }));
      defs.sort(() => Math.random() - 0.5);
      
      defs.forEach(d => {
        html += `<button class="btn btn-secondary match-def-btn" data-idx="${d.idx}" style="text-align: left; padding: 15px; font-weight: normal; border-width: 2px; transition: all 0.2s;">${d.def}</button>`;
      });
      
      html += `
                </div>
              </div>
              <div id="unlock-success" style="display: none; margin-top: 20px; padding: 15px; background: #ecfdf5; border: 2px solid #10b981; border-radius: 8px; color: #047857; font-weight: bold; text-align: center; font-size: 1.2rem;">
                <i class="fa-solid fa-star"></i> Vocabulary Mastered!
              </div>
            </div>
          </details>
      `;
    }

    

    // ==========================================
    // TAB 2: THE HISTORY
    // ==========================================
    html += ``;

    let fallbackEnquiry = lesson.enquiry || lesson.title.replace(/^Lesson\s*\d+:\s*/i, '');
    if (fallbackEnquiry) {
      html += `
        <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px 20px; border-radius: 0 8px 8px 0; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <h3 style="margin-top: 0; color: #1e3a8a; font-size: 1.25rem; display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Enquiry Question
          </h3>
          <p style="font-size: 1.15rem; font-weight: 700; color: #0f172a; margin: 0;">
            ${fallbackEnquiry}
          </p>
        </div>
      `;
    }

    if (lesson.learning_objectives) {
      html += `
        <div class="learning-objectives-card" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-top: 4px solid #10b981;">
          <h3 style="margin-top: 0; color: #0f172a; font-size: 1.2rem; display: flex; align-items: center; gap: 10px;">
            <i class="fa-solid fa-bullseye" style="color: #10b981;"></i> Learning Objectives
          </h3>
          <p style="font-size: 1.1rem; font-weight: 600; color: #1e3a8a; margin-bottom: 15px;">
            ${lesson.learning_objectives.overarching}
          </p>
          <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 1.05rem; line-height: 1.6;">
            ${lesson.learning_objectives.scaffolded.map(obj => `<li style="margin-bottom: 8px;">${obj}</li>`).join('')}
          </ul>
        </div>
      `;
    }



    if (lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {
      let enquiryTitle = lesson.title.replace(/^Lesson\s*\d+:\s*/i, '');
      html += `
        <div class="phase-card">
          <div style="display: flex; justify-content: flex-start; align-items: center; margin-bottom: 20px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #1e3a8a;">${enquiryTitle}</div>
          </div>
      `;
      
      lesson.narrative_blocks.forEach((block, index) => {
        if (block.type === 'interactive_map') {
          html += `
            <div class="interactive-map-container" style="margin: 30px 0; background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h3 style="margin-top: 0; color: #1e293b; font-family: 'Playfair Display', serif;"><i class="fa-solid fa-map-location-dot"></i> Interactive Historical Map</h3>
              <div class="map-img-wrapper" style="position: relative; height: 500px; width: 100%; display: flex; justify-content: center; align-items: center; overflow: hidden; margin-bottom: 20px; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0;">
          `;
          
          block.maps.forEach((m, idx) => {
            html += `<img src="${getAssetUrl(m.src)}" id="map-img-${m.id}" style="position: absolute; max-width: 100%; max-height: 100%; object-fit: contain; opacity: ${idx === 0 ? '1' : '0'}; transition: opacity 0.6s ease-in-out; border-radius: 6px;">`;
          });
          
          html += `
              </div>
              <div id="map-caption-display" style="font-size: 1.1rem; font-style: italic; color: #334155; min-height: 3em; margin-bottom: 20px;">${block.maps[0].caption}</div>
              <div class="map-controls" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
          `;
          
          block.maps.forEach((m, idx) => {
            const activeClass = idx === 0 ? 'active-map-btn' : '';
            html += `
                <button class="btn btn-secondary map-toggle-btn ${activeClass}" data-map-id="${m.id}" data-caption="${m.caption.replace(/"/g, '&quot;')}" onclick="toggleMap(this)" style="border-radius: 30px; padding: 8px 16px; font-weight: bold;">
                  ${m.year} ${m.label}
                </button>
            `;
          });
          
          html += `
              </div>
            </div>
          `;
          return;
        }

        const bg = (index % 2 === 0) ? '#ffffff' : '#f0f9ff';
        
        if (typeof block.text === 'string' && block.text.match(/^\[Key Individual:\s*(.+)\]$/i)) {
          const kiMatch = block.text.match(/^\[Key Individual:\s*(.+)\]$/i);
          const personName = kiMatch[1].trim();
          let person = null;
          if (window.db && window.db[window.currentUnitId]) {
            const unitDb = window.db[window.currentUnitId];
            person = unitDb.data?.key_individuals?.find(p => p.name.toLowerCase().includes(personName.toLowerCase()));
            if (!person) person = unitDb.biographies?.find(p => p.name.toLowerCase().includes(personName.toLowerCase()));
          }
          if (person) {
             const cardHtml = generateKeyIndividualEmbedHTML ? generateKeyIndividualEmbedHTML(person) : `<div>${person.name}</div>`;
             html += `
               <div class="key-individual-embed" style="margin-bottom: 20px; border: 1px solid var(--border-glass); border-radius: 8px; overflow: hidden; background: #f8fafc; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                 <button onclick="const content = this.nextElementSibling; const icon = this.querySelector('.chevron-icon'); if(content.style.display==='none'){content.style.display='block'; icon.classList.replace('fa-chevron-down','fa-chevron-up');}else{content.style.display='none'; icon.classList.replace('fa-chevron-up','fa-chevron-down');}" style="width: 100%; text-align: left; padding: 15px 20px; background: rgba(59, 130, 246, 0.1); border: none; font-weight: bold; color: #1e3a8a; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 1.05rem; transition: background 0.2s;">
                   <span><i class="fa-solid fa-id-card-clip" style="margin-right: 10px; color: #3b82f6;"></i> Key Individual: ${person.name}</span>
                   <i class="fa-solid fa-chevron-down chevron-icon"></i>
                 </button>
                 <div style="display: none; padding: 25px; background: #ffffff;">
                   <div style="width: 100%; margin: 0 auto;">
                     ${cardHtml}
                   </div>
                 </div>
               </div>
             `;
             return;
          }
        }

        const isQuote = typeof block.text === 'string' && block.text.startsWith('"');
        let contentStr = isQuote ? `<em style="font-size:1.1rem; color:#475569;">${block.text}</em>` : highlightGlossary(block.text);
        contentStr = formatBold(contentStr);
        contentStr = contentStr.replace(/\n/g, '<br/>');
        contentStr = contentStr.replace(/src=["'](\.\/)?assets\//g, 'src="/' + window.currentUnitId + '/assets/');
        let styledContent = contentStr;
        if (!isQuote && !contentStr.trim().startsWith('<') && contentStr.length > 20) {
           const firstLetter = contentStr.charAt(0);
           const rest = contentStr.slice(1);
           styledContent = `<span style="float: left; font-size: 3rem; line-height: 2.5rem; padding-top: 4px; padding-right: 8px; padding-left: 3px; font-family: 'Playfair Display', serif; color: #1e3a8a;">${firstLetter}</span>` + rest;
        }
        
        let l4StyledContent = '';
        let simplifyBtn = '';
        if (block.level_4) {
          let l4ContentStr = isQuote ? `<em style="font-size:1.1rem; color:#475569;">${block.level_4}</em>` : highlightGlossary(block.level_4);
          l4ContentStr = formatBold(l4ContentStr);
          l4ContentStr = l4ContentStr.replace(/\n/g, '<br/>');
          l4StyledContent = l4ContentStr;
          if (!isQuote && !l4ContentStr.trim().startsWith('<') && l4ContentStr.length > 20) {
             const firstLetter = l4ContentStr.charAt(0);
             const rest = l4ContentStr.slice(1);
             l4StyledContent = `<span style="float: left; font-size: 3rem; line-height: 2.5rem; padding-top: 4px; padding-right: 8px; padding-left: 3px; font-family: 'Playfair Display', serif; color: #047857;">${firstLetter}</span>` + rest;
          }
          simplifyBtn = `<button class="btn btn-secondary no-print" onclick="window.toggleSimplify(this)" data-original="${encodeURIComponent(styledContent)}" data-simplified="${encodeURIComponent(l4StyledContent)}" style="padding: 6px 10px; flex-shrink: 0; margin-left: 5px; color: #047857;" title="Simplify Text"><i class="fa-solid fa-child-reaching"></i></button>`;
        }

        let themeHeadingHtml = '';
        if (block.theme_heading) {
          themeHeadingHtml = `<h4 style="margin-top: 0; margin-bottom: 10px; color: #1e3a8a; font-size: 1.15rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; display: inline-block;"><i class="fa-solid fa-bookmark" style="color: #64748b; margin-right: 8px;"></i>${block.theme_heading}</h4><br/>`;
        }

        html += `
          <div class="standard-narrative-container">
            <div id="para-${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: ${bg}; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <div class="para-number">${index + 1}</div>
              <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">${themeHeadingHtml}${styledContent}</div>
              <div style="display: flex; align-items: flex-start;">
                <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                ${simplifyBtn}
              </div>
            </div>
          </div>
        `;

        if (block.level_4) {
          html += `
            <div class="level4-narrative-container" style="display: none;">
              <div id="para-l4-${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: ${bg}; border-radius: 6px; border-left: 4px solid #10b981; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div class="para-number" style="background:#ecfdf5; color:#047857;">${index + 1}</div>
                <div class="narrative-text" style="flex-grow: 1; line-height: 1.6; font-size: 1.15rem; color:#1e293b;">${l4StyledContent}</div>
                <div style="display: flex; align-items: flex-start;">
                  <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                </div>
              </div>
            </div>
          `;
        }
        
        if (block.hinge_question) {
          const hingeId = `hinge-${index}`;
          html += `
            <div class="hinge-question-container no-print" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px;">
              <button class="btn btn-secondary" id="btn-${hingeId}" onclick="document.getElementById('${hingeId}').style.display = 'block'; this.style.display = 'none';" style="background: #0ea5e9; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s;"><i class="fa-solid fa-person-circle-question" style="margin-right: 6px;"></i> Reveal Class Quiz</button>
              <div id="${hingeId}" style="display: none; background: #f0f9ff; border: 2px solid #38bdf8; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="color: #0284c7; font-weight: bold; font-size: 0.9rem; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Interactive Hinge Question</div>
                <div style="color: #0f172a; font-size: 1.1rem; font-weight: bold; margin-bottom: 15px;">"${block.hinge_question.text}"</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${block.hinge_question.options.map((opt, i) => `
                    <button onclick="
                      const parent = this.parentElement;
                      const explanation = parent.nextElementSibling;
                      for (let child of parent.children) {
                        child.style.pointerEvents = 'none';
                        if (child.dataset.index == ${block.hinge_question.correct_index}) {
                          child.style.backgroundColor = '#dcfce7';
                          child.style.borderColor = '#22c55e';
                          child.style.color = '#166534';
                        }
                      }
                      if (${i} !== ${block.hinge_question.correct_index}) {
                        this.style.backgroundColor = '#fee2e2';
                        this.style.borderColor = '#ef4444';
                        this.style.color = '#991b1b';
                      }
                      explanation.style.display = 'block';
                    " data-index="${i}" style="text-align: left; background: #ffffff; border: 1px solid #cbd5e1; color: #334155; padding: 10px 15px; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 1rem;">
                      <span style="font-weight: bold; margin-right: 8px;">${String.fromCharCode(65+i)}.</span> ${opt}
                    </button>
                  `).join('')}
                </div>
                <div style="display: none; margin-top: 15px; padding: 12px; background: #dcfce7; border-left: 4px solid #22c55e; color: #166534; font-size: 1rem; border-radius: 0 6px 6px 0;">
                  <strong>Explanation:</strong> ${block.hinge_question.explanation}
                </div>
              </div>
            </div>
          `;
        }
        
        if (block.tasks && block.tasks.length > 0) {
          html += `<div class="embedded-tasks-container" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px; padding: 15px; background: #fffbeb; border: 2px dashed #fcd34d; border-radius: 6px;">`;
          block.tasks.forEach((task, tIdx) => {
             const qPrefix = task.qNum ? `Q${task.qNum}. ` : "";
             const ansId = `ans-emb-${index}-${tIdx}`;
             const starterBtn = task.starter ? `<button class="btn" onclick="window.toggleStarterById('starter-${ansId}')" style="margin-left: 5px; padding: 4px 8px; font-size: 0.8rem; background: #e0f2fe; color: #0284c7; border: 1px solid #7dd3fc;"><i class="fa-solid fa-pen"></i> Starter</button>` : "";
             const starterDiv = task.starter ? `<div class="starter-box" id="starter-${ansId}" style="display: none; margin-top: 8px; background: #f0f9ff; padding: 10px; border-left: 3px solid #0284c7; font-style: italic; color: #0c4a6e; transition: all 0.3s ease;">${task.starter}</div>` : "";
             html += `
               <div style="margin-bottom: 10px;">
                 <strong>${qPrefix}${task.text}</strong>
                 <button class="btn btn-secondary" onclick="window.toggleAnswerById('${ansId}')" style="margin-left: 10px; padding: 4px 8px; font-size: 0.8rem;"><i class="fa-solid fa-eye"></i> Show</button>
                 ${starterBtn}
                 ${starterDiv}
                 <div class="answer" id="${ansId}" style="display: none; margin-top: 8px; background: white; padding: 10px; border-left: 3px solid #b45309; font-style: italic; color: #451a03;">${task.model}</div>
               </div>
             `;
          });
          html += `</div>`;
        }
      });

      if (lesson.sources && lesson.sources.length > 0) {
        html += `<div class="sources-grid" style="margin-top: 20px;">`;
        lesson.sources.forEach(source => {
          html += `
            <div class="source-card" style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
              ${source.title ? `<h4 style="color: var(--primary); margin-top: 0; text-align: left;">${source.title}</h4>` : ''}
              ${source.src ? `<img src="${getAssetUrl(source.src)}" alt="Source Image">` : ''}
              ${source.caption ? `<p class="source-caption" style="text-align: left; color: #475569;">${source.caption}</p>` : ''}
              ${source.question ? `
                <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 15px;">
                  <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>${formatQuestion(source.question)}</strong></p>
                </div>
              ` : ''}
            </div>
          `;
        });
        html += `</div>`;
      }
      html += `</div>`;
    }
    
    

    // ==========================================
    // TAB 3: APPLICATION
    // ==========================================
    html += ``;

    if ((lesson.tasks && lesson.tasks.length > 0) || lesson.historians_corner) {
      let hasModels = false;
      if (lesson.tasks) {
        hasModels = lesson.tasks.some(t => !!t.model);
      }
      if (lesson.historians_corner && lesson.historians_corner.stretch_model) {
        hasModels = true;
      }
      
      const revealBtn = hasModels ? `<button class="btn btn-secondary" onclick="this.closest('.phase-card').querySelectorAll('.model-box').forEach(c => c.style.display = c.style.display === 'block' ? 'none' : 'block')" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-magnifying-glass"></i> Reveal All Models</button>` : '';

      html += `
        <div class="phase-card">
          <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 20px;">
            
            ${revealBtn}
          </div>
      `;

      if (lesson.tasks && lesson.tasks.length > 0) {
        lesson.tasks.forEach((task, tIdx) => {
          let qText = formatQuestion(task.text || task.question);
          let clueParaMatch = qText.match(/\((P|Para\s*)(\d+)\)$/i);
          let clueBtn = '';
          if (clueParaMatch) {
            qText = qText.replace(clueParaMatch[0], '').trim();
            clueBtn = `<button class="btn btn-secondary btn-sm-icon" title="Find Evidence" onclick="window.scrollToPara('para-${clueParaMatch[2]}')"><i class="fa-solid fa-magnifying-glass"></i></button>`;
          }

          html += `
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                ${qText}
                <span style="display: inline-flex; vertical-align: middle;">
                  ${clueBtn}
                  ${task.starter ? `<button class="btn btn-secondary btn-sm-icon" title="Sentence Starter" onclick="toggleElement('starter-${tIdx}')"><i class="fa-solid fa-pen"></i></button>` : ''}
                  ${task.clue ? `<button class="btn btn-secondary btn-sm-icon" title="Clue" onclick="toggleElement('clue-${tIdx}')"><i class="fa-solid fa-lightbulb"></i></button>` : ''}
                  ${task.model ? `<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('model-${tIdx}')"><i class="fa-solid fa-check-double"></i></button>` : ''}
                </span>
              </div>
              <textarea class="student-answer-input" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>

              ${task.starter ? `<div id="starter-${tIdx}" class="scaffold-box starter-box" style="display:none;"><strong>Sentence Starter:</strong> ${task.starter}</div>` : ''}
              ${task.clue ? `<div id="clue-${tIdx}" class="scaffold-box clue-box" style="display:none;"><strong>Clue Hint:</strong> ${task.clue}</div>` : ''}
              ${task.model ? `<div id="model-${tIdx}" class="scaffold-box model-box" style="display:none;">${formatBold(task.model)}</div>` : ''}
            </div>
          `;
        });
      }

      if (lesson.historians_corner) {
        const hc = lesson.historians_corner;
        html += `
          <div style="margin-top: 30px; background: #fafafa; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h3 style="margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; color: #0f172a;">${hc.title}</h3>
            <p style="font-size: 1.05rem; line-height: 1.6; color: #334155; margin-bottom: 20px;">${formatBold(hc.text || (hc.author_context + "<br><br><i>" + hc.extract + "</i>"))}</p>
            ${hc.stretch_question ? `
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 0;">
              <div style="font-weight: 700; margin-bottom: 10px; color: #ef4444;">Stretch Challenge</div>
              <div style="font-size: 1.05rem; margin-bottom: 12px;">
                ${hc.stretch_question}
                <span style="display: inline-flex; vertical-align: middle;">
                  ${hc.starter ? `<button class="btn btn-secondary btn-sm-icon" title="Sentence Starter" onclick="toggleElement('hc-starter')"><i class="fa-solid fa-pen"></i></button>` : ''}
                  ${hc.clue ? `<button class="btn btn-secondary btn-sm-icon" title="Clue" onclick="toggleElement('hc-clue')"><i class="fa-solid fa-lightbulb"></i></button>` : ''}
                  ${hc.stretch_model ? `<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('hc-model')"><i class="fa-solid fa-check-double"></i></button>` : ''}
                </span>
              </div>
              ${hc.starter ? `<div id="hc-starter" class="scaffold-box starter-box" style="display:none;"><strong>Sentence Starter:</strong> ${hc.starter}</div>` : ''}
              ${hc.clue ? `<div id="hc-clue" class="scaffold-box clue-box" style="display:none;"><strong>Clue Hint:</strong> ${hc.clue}</div>` : ''}
              ${hc.stretch_model ? `<div id="hc-model" class="scaffold-box model-box" style="display:none;">${formatBold(hc.stretch_model)}</div>` : ''}
            </div>` : ''}
          </div>
        `;
      }
      html += `</div>`;
    }

    if (lesson.pair_share) {
      const ps = lesson.pair_share;
      html += `
        <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 15px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
            <summary style="padding: 10px 15px; cursor: pointer; color: #059669; font-weight: bold; font-size: 1.05rem; background: #ecfdf5; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #a7f3d0;">
              <span><i class="fa-solid fa-users" style="color: #059669; margin-right: 10px;"></i> Think, Pair, Share</span>
              <i class="fa-solid fa-chevron-down" style="color: #059669;"></i>
            </summary>
            <div style="padding: 20px; background: #ecfdf5;">
              <p style="font-size: 1.15rem; font-weight: 700; color: #065f46; margin-top: 0;">${ps.prompt}</p>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-brain"></i> 1. Think</div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">${ps.think}</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-comments"></i> 2. Pair</div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">${ps.pair}</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-users"></i> 3. Share</div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">${ps.share}</p>
                </div>
              </div>
            </div>
          </details>
      `;
    }

    if (lesson.flashcards && lesson.flashcards.length > 0) {
      html += `
        <div class="phase-card">
          <div class="phase-title">Consolidation & Recall</div>
          <p style="color: #666; margin-bottom: 20px;">Tap a card to flip it and reveal the definition.</p>
          <div class="flashcard-deck">
      `;
      lesson.flashcards.forEach(fc => {
        html += `
          <div class="flashcard-wrapper" onclick="this.classList.toggle('flipped')">
            <div class="flashcard-inner">
              <div class="flashcard-face flashcard-front">
                <h4>${fc.term}</h4>
                <p>Tap to reveal</p>
              </div>
              <div class="flashcard-face flashcard-back">
                ${fc.definition}
              </div>
            </div>
          </div>
        `;
      });
      html += `</div></div>`;
    }

    if (lesson.extended || lesson.debate_prep) {
      let extHtml = `
        <div class="phase-card">
          <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 20px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Extended Scholarship</div>
            ${lesson.extended && (lesson.extended.model || lesson.extended.answer) ? `<button class="btn btn-secondary" onclick="toggleElement('extended-model-${lesson.id}')" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-check-double"></i> Reveal Model Answer</button>` : ''}
          </div>
      `;

      if (lesson.debate_prep) {
        const dp = lesson.debate_prep;
        const allArgs = [...dp.arguments_for.map(a=>({t:a, s:'for'})), ...dp.arguments_against.map(a=>({t:a, s:'against'}))].sort(() => Math.random() - 0.5);
        const argsHtml = allArgs.map((arg, idx) => `<div class="debate-card" draggable="true" ondragstart="window.dragDebate(event)" id="debate-arg-${lesson.id}-${idx}" data-side="${arg.s}" style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; margin-bottom: 8px; border-radius: 6px; cursor: grab;">${arg.t}</div>`).join('');

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
              <button class="btn btn-primary" onclick="window.checkDebate('${lesson.id}')">Check Answers</button>
              <div id="debate-feedback-${lesson.id}" style="margin-top: 10px; font-weight: bold;"></div>
            </div>
          </div>
        `;
      }

      if (lesson.extended && (lesson.extended.paragraphs || lesson.extended.title)) {
        if (lesson.extended.title) {
          extHtml += `<h3 style="color: #0f172a;">${lesson.extended.title}</h3>`;
        }
        if (lesson.extended.paragraphs) {
          lesson.extended.paragraphs.forEach(p => {
             extHtml += `<p style="color: #334155; font-size: 1.05rem; line-height: 1.6;">${formatBold(p)}</p>`;
          });
        }
      }
      extHtml += `</div>`;
      
      if (lesson.debate_prep || (lesson.extended && (lesson.extended.paragraphs || lesson.extended.title))) {
         html += extHtml;
      }
    }

    if (lesson.gcse_task || (lesson.extended && lesson.extended.question) || extractedExamTasks.length > 0) {
      let gcseHtml = `
        <div class="phase-card">
          <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 20px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #b45309;"><i class="fa-solid fa-graduation-cap"></i> ${window.unitData && window.unitData.title && window.unitData.title.includes('KS3') ? 'Assessment Practice' : 'Assessment Practice'}</div>
            <button class="btn btn-secondary" onclick="this.closest('.phase-card').querySelectorAll('.model-box').forEach(c => c.style.display = c.style.display === 'block' ? 'none' : 'block')" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-magnifying-glass"></i> Reveal Models</button>
          </div>
      `;

      if (lesson.extended && lesson.extended.question) {
        let hintsHtml = '';
        if (lesson.extended.hints && lesson.extended.hints.length > 0) {
           hintsHtml = `<div style="margin-top: 15px; padding: 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px;"><strong style="color: #d97706;">Hints:</strong><ul style="margin: 5px 0 0 0; color: #92400e;">${lesson.extended.hints.map(h => `<li>${formatBold(h)}</li>`).join('')}</ul></div>`;
        }

        let sourceHtml = '';
        if (lesson.extended.source_a || lesson.extended.source_b) {
          sourceHtml = `<div style="display: flex; gap: 20px; margin: 15px 0;">`;
          if (lesson.extended.source_a) {
             const prov = typeof lesson.extended.source_a === 'string' ? '' : lesson.extended.source_a.provenance;
             const content = typeof lesson.extended.source_a === 'string' ? lesson.extended.source_a : lesson.extended.source_a.content;
             sourceHtml += `
               <div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                 <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source A</strong>
                 ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ''}
                 <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                   ${content.replace(/\n/g, '<br>')}
                 </div>
               </div>`;
          }
          if (lesson.extended.source_b) {
             const prov = typeof lesson.extended.source_b === 'string' ? '' : lesson.extended.source_b.provenance;
             const content = typeof lesson.extended.source_b === 'string' ? lesson.extended.source_b : lesson.extended.source_b.content;
             sourceHtml += `
               <div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                 <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source B</strong>
                 ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ''}
                 <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                   ${content.replace(/\n/g, '<br>')}
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
              ${formatQuestion(lesson.extended.question)}
              <span style="display: inline-flex; vertical-align: middle;">
                ${lesson.extended.model || lesson.extended.answer ? `<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('extended-model-${lesson.id}')"><i class="fa-solid fa-check-double"></i></button>` : ''}
              </span>
            </div>
            ${sourceHtml}
            ${hintsHtml}
            <textarea class="student-answer-input" style="min-height: 200px;" placeholder="Write your extended response here..." oninput="window.updateProgress()"></textarea>
            ${lesson.extended.model || lesson.extended.answer ? `<div id="extended-model-${lesson.id}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${formatBold(lesson.extended.model || lesson.extended.answer)}</div>` : ''}
          </div>
        `;
      }

      if (lesson.gcse_task) {
        if (lesson.gcse_task.tasks) {
          lesson.gcse_task.tasks.forEach((task, tIdx) => {
            gcseHtml += `
              <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                  ${formatQuestion(task.text || task.question)}
                  <span style="display: inline-flex; vertical-align: middle;">
                    ${task.model ? `<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('gcse-model-${tIdx}')"><i class="fa-solid fa-check-double"></i></button>` : ''}
                  </span>
                </div>
                <textarea class="student-answer-input" style="min-height: ${(task.text || task.question || "").includes("12 marks") || (task.text || task.question || "").includes("16 marks") ? "200px" : "100px"};" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>
                ${task.model ? `<div id="gcse-model-${tIdx}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${formatBold(task.model)}</div>` : ''}
              </div>
            `;
          });
        } else if (lesson.gcse_task.sources) {
           let topicText = lesson.gcse_task.topic || '';
           let isNarrative = topicText.toLowerCase().includes("write a narrative account");
           
           if (isNarrative) {
               gcseHtml += `<p style="font-weight: bold; font-size: 1.15rem; color: #1e3a8a;">${topicText}</p>`;
               gcseHtml += `<p style="font-size: 1rem; color: #475569; margin-bottom: 10px;"><em>Read the historical sources below before writing your narrative account:</em></p>`;
           } else {
               gcseHtml += `<p style="font-weight: bold; font-size: 1.15rem; color: #1e3a8a;">How useful are Sources A and B for an enquiry into ${topicText}?</p>`;
           }
           
           gcseHtml += `<div style="display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">`;
           lesson.gcse_task.sources.forEach(srcObj => {
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
           
           let placeholder = isNarrative ? "Write your 8-mark narrative account here..." : "Type your 8-mark utility evaluation here...";
           gcseHtml += `<textarea class="student-answer-input" style="min-height: 200px;" placeholder="${placeholder}" oninput="window.updateProgress()"></textarea>`;
           
           if (lesson.gcse_task.model) {
              gcseHtml += `<div style="margin-top: 15px;"><button class="btn btn-secondary" onclick="toggleElement('gcse-model-src')"><i class="fa-solid fa-check-double"></i> Reveal Model Answer</button></div>`;
              gcseHtml += `<div id="gcse-model-src" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${formatBold(lesson.gcse_task.model)}</div>`;
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
                  ${task.model ? `<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('extracted-model-${tIdx}')"><i class="fa-solid fa-check-double"></i></button>` : ''}
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

    if (lesson.quiz && lesson.quiz.length > 0) {
      window.currentQuizData = lesson.quiz;
      window.currentQuizIndex = 0;
      window.currentQuizLessonId = lesson.id;
      
      html += `
        <div class="phase-card no-print" id="inline-quiz-container" style="padding: 30px;">
          <div style="display: flex; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
            <i class="fa-solid fa-clipboard-check" style="font-size: 2rem; color: #3b82f6; margin-right: 15px;"></i>
            <div>
              <h2 style="margin: 0; color: #1e293b; font-size: 1.5rem;">Knowledge Check Quiz</h2>
              <p style="margin: 0; color: #64748b; font-size: 0.95rem;">Question <span id="quiz-progress">1 / ${lesson.quiz.length}</span></p>
            </div>
          </div>
          
          <div id="quiz-question-container">
            <!-- Populated dynamically -->
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-top: 25px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            <div id="quiz-feedback" style="font-weight: bold; padding-top: 8px;"></div>
            <button id="quiz-next-btn" class="btn btn-primary" style="display: none;" onclick="window.nextQuizQuestion()">Next Question <i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
      `;
    }

    
    
    html += `</div>`; // End lesson-content wrapper

    contentArea.innerHTML = html;
    
    if (lesson.quiz && lesson.quiz.length > 0) {
      window.renderQuizQuestion();
    }
    window.vocabMatchesFound = 0;
    setTimeout(() => {
      if (window.mermaid) {
        try {
          mermaid.init(undefined, document.querySelectorAll('.mermaid'));
        } catch (e) {
          console.error("Mermaid render error:", e);
        }
      }
    }, 100); 
  }
  
  window.switchTab = (tabId) => {
    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(el => {
      el.style.display = 'none';
    });
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    // Show requested tab
    const activeTab = document.getElementById(tabId);
    if (activeTab) {
      activeTab.style.display = 'block';
    }
    // Set clicked button to active (we can find it via the onclick string)
    const btn = document.querySelector(`button[onclick*="${tabId}"]`);
    if (btn) {
      btn.classList.add('active');
    }
  };

  // Toggling elements helper

  window.toggleElement = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }
  };


  // Matching Game Logic
  let selectedTermIdx = null;
  let selectedTermEl = null;
  window.vocabMatchesFound = 0;

  document.addEventListener('click', (e) => {
    const termBtn = e.target.closest('.match-term-btn');
    const defBtn = e.target.closest('.match-def-btn');

    if (termBtn && !termBtn.disabled) {
      document.querySelectorAll('.match-term-btn').forEach(b => {
        if (!b.disabled) b.style.borderColor = '#cbd5e1';
      });
      termBtn.style.borderColor = '#3b82f6';
      selectedTermIdx = termBtn.dataset.idx;
      selectedTermEl = termBtn;
    }

    if (defBtn && !defBtn.disabled && selectedTermIdx !== null) {
      if (defBtn.dataset.idx === selectedTermIdx) {
        // Match found!
        defBtn.style.background = '#10b981';
        defBtn.style.color = '#fff';
        defBtn.style.borderColor = '#059669';
        defBtn.disabled = true;

        selectedTermEl.style.background = '#10b981';
        selectedTermEl.style.color = '#fff';
        selectedTermEl.style.borderColor = '#059669';
        selectedTermEl.disabled = true;

        selectedTermIdx = null;
        selectedTermEl = null;
        window.vocabMatchesFound++;

        const totalTerms = document.querySelectorAll('.match-term-btn').length;
        if (window.vocabMatchesFound >= totalTerms) {
           const successMsg = document.getElementById('unlock-success');
           if (successMsg) successMsg.style.display = 'block';
           
           const lockedSec = document.getElementById('locked-content');
           if (lockedSec) {
             lockedSec.style.opacity = '1';
             lockedSec.style.pointerEvents = 'auto';
             lockedSec.style.filter = 'none';
           }
        }
      } else {
        // Wrong match
        defBtn.style.borderColor = '#ef4444';
        setTimeout(() => {
          if (!defBtn.disabled) defBtn.style.borderColor = '#cbd5e1';
        }, 500);
      }
    }
  });

  // Initialize
  if (unitData.lessons.length > 0) {
    renderSidebar();
    
    // Initial Render - load homepage
    renderHomepage();
  } else {
    contentArea.innerHTML = "<h2>No lessons found in data.js</h2>";
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

window.updateProgress = () => {
  const inputs = document.querySelectorAll('.student-answer-input');
  let filled = 0;
  inputs.forEach(input => {
    if (input.value.trim().length > 0) filled++;
  });
  const bar = document.getElementById('progress-bar');
  if (bar) {
    if (inputs.length === 0) bar.style.width = '100%';
    else bar.style.width = `${(filled / inputs.length) * 100}%`;
  }
};
}


  function assignQuestionNumbers(lesson) {
    let q = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = q++;
    if (lesson.do_now) {
      if (lesson.do_now.type === "timeline" && lesson.do_now.prediction_question) lesson.do_now.qNum = q++;
      else if (lesson.do_now.type === "questions") lesson.do_now.items.forEach(item => item.qNum = q++);
    }
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => {
        if (block.tasks) block.tasks.forEach(task => task.qNum = q++);
      });
    }
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }

  function openTaskWhiteboard() {
    const modal = document.getElementById('task-whiteboard-modal');
    if (!modal) return;
    
    const container = document.getElementById('whiteboard-questions-container');
    container.innerHTML = '';
    
    const activeLesson = window.currentActiveLesson || unitData.lessons[0];
    
    assignQuestionNumbers(activeLesson);
    
    let html = '';
    
    const addQuestionCard = (qNum, questionText, answerText) => {
      const finalAnswer = window.formatBold(answerText) || "Model answer to be discussed in class.";
      html += `
        <div class="wb-question-card" style="cursor:pointer;" onclick="this.querySelector('.wb-answer').classList.toggle('revealed')" title="Click to reveal answer">
          <div style="font-weight: bold;">Q${qNum}. ${questionText}</div>
          <div class="wb-answer">${finalAnswer}</div>
        </div>
      `;
    };

    if (activeLesson.primary_source && activeLesson.primary_source.question) {
      addQuestionCard(activeLesson.primary_source.qNum, activeLesson.primary_source.question, activeLesson.primary_source.model_answer || '');
    }
    
    if (activeLesson.do_now) {
      if (activeLesson.do_now.type === "timeline" && activeLesson.do_now.prediction_question) {
        addQuestionCard(activeLesson.do_now.qNum, activeLesson.do_now.prediction_question, activeLesson.do_now.model || activeLesson.do_now.answer || '');
      } else if (activeLesson.do_now.type === "questions") {
        activeLesson.do_now.items.forEach(item => {
           addQuestionCard(item.qNum, item.question, item.answer || '');
        });
      }
    }
    
    if (activeLesson.narrative_blocks) {
      activeLesson.narrative_blocks.forEach(block => {
        if (block.tasks) {
          block.tasks.forEach(task => {
            addQuestionCard(task.qNum, task.text, task.model || '');
          });
        }
      });
    }
    
    if (activeLesson.debate_prep) {
       addQuestionCard('-', `Debate Prep: ${activeLesson.debate_prep.question}`, `<strong>Agree:</strong><ul>${activeLesson.debate_prep.arguments_for.map(a=>`<li>${a}</li>`).join('')}</ul><strong>Disagree:</strong><ul>${activeLesson.debate_prep.arguments_against.map(a=>`<li>${a}</li>`).join('')}</ul>`);
    }


    
    container.innerHTML = html;
    modal.classList.add('visible');
  }
  
window.toggleStarterById = function(id) {
  const starter = document.getElementById(id);
  if (starter) {
    starter.style.display = starter.style.display === 'block' ? 'none' : 'block';
  }
};

window.dragDebate = function(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
};

window.allowDrop = function(ev) {
  ev.preventDefault();
};

window.dropDebate = function(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const el = document.getElementById(data);
  let target = ev.target;
  // If dropped on another card, append to the dropzone
  while (target && !target.classList.contains('debate-dropzone')) {
    target = target.parentElement;
  }
  if (target && el) {
    target.appendChild(el);
  }
};

window.checkDebate = function(lessonId) {
  let correct = true;
  let allSorted = true;
  
  const bank = document.getElementById(`debate-bank-${lessonId}`);
  if (bank && bank.children.length > 0) allSorted = false;
  
  const forZone = document.getElementById(`debate-for-${lessonId}`);
  if (forZone) {
    Array.from(forZone.children).forEach(child => {
      if (child.getAttribute('data-side') !== 'for') {
        correct = false;
        child.style.border = '2px solid #dc2626';
      } else {
        child.style.border = '2px solid #16a34a';
      }
    });
  }

  const againstZone = document.getElementById(`debate-against-${lessonId}`);
  if (againstZone) {
    Array.from(againstZone.children).forEach(child => {
      if (child.getAttribute('data-side') !== 'against') {
        correct = false;
        child.style.border = '2px solid #dc2626';
      } else {
        child.style.border = '2px solid #16a34a';
      }
    });
  }
  
  const feedback = document.getElementById(`debate-feedback-${lessonId}`);
  if (!allSorted) {
    feedback.style.color = '#d97706';
    feedback.innerText = "Please sort all evidence cards first!";
  } else if (!correct) {
    feedback.style.color = '#dc2626';
    feedback.innerText = "Some evidence is in the wrong column. Check the red cards and try again!";
  } else {
    feedback.style.color = '#16a34a';
    feedback.innerText = "Excellent! All evidence sorted correctly. You are ready to write your essay!";
  }
};
window.toggleAnswerById = function(id) {
  const ans = document.getElementById(id);
  if (ans) {
    if (ans.classList.contains('revealed')) {
      ans.classList.remove('revealed');
      ans.style.display = 'none';
    } else {
      ans.classList.add('revealed');
      ans.style.display = 'block';
    }
  }
};

window.toggleAllAnswers = function(btn) {
  const container = btn.closest('.phase-card') || btn.closest('.do-now-box') || btn.closest('details');
  if (!container) return;
  const answers = container.querySelectorAll('.answer');
  const anyHidden = Array.from(answers).some(a => a.style.display !== 'block' && !a.classList.contains('revealed'));
  answers.forEach(a => {
    if (anyHidden) {
      a.style.display = 'block';
      a.classList.add('revealed');
    } else {
      a.style.display = 'none';
      a.classList.remove('revealed');
    }
  });
};

window.toggleAllWhiteboardAnswers = function() {
  const container = document.getElementById('taskWhiteboardContent');
  if (!container) return;
  const answers = container.querySelectorAll('.answer');
  const anyHidden = Array.from(answers).some(a => a.style.display !== 'block' && !a.classList.contains('revealed'));
  answers.forEach(a => {
    if (anyHidden) {
      a.style.display = 'block';
      a.classList.add('revealed');
    } else {
      a.style.display = 'none';
      a.classList.remove('revealed');
    }
  });
};

window.toggleMap = function(btn) {
  const container = btn.closest('.interactive-map-container');
  // Update buttons
  container.querySelectorAll('.map-toggle-btn').forEach(b => {
    b.classList.remove('active-map-btn');
    b.style.backgroundColor = '';
    b.style.color = '';
  });
  btn.classList.add('active-map-btn');
  btn.style.backgroundColor = '#1a237e';
  btn.style.color = 'white';
  
  // Update images
  const targetId = btn.getAttribute('data-map-id');
  container.querySelectorAll('img[id^="map-img-"]').forEach(img => {
    img.style.opacity = '0';
  });
  container.querySelector('#map-img-' + targetId).style.opacity = '1';
  
  // Update caption
  container.querySelector('#map-caption-display').innerHTML = btn.getAttribute('data-caption');
};

// --- Debate Modal Global Functions ---
window.currentDebateIndex = 0;

window.injectDebateModalIfNeeded = function() {
  if (document.getElementById('debateModal')) return;
  const html = `
  <div id="debateModal" class="modal-overlay no-print" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(10px); justify-content: center; align-items: center; z-index: 2000; opacity: 0; transition: opacity 0.3s ease;" onclick="if(event.target === this) window.closeDebateModal()">
    <div class="modal-content" style="background: white; border: 3px solid var(--accent-red); border-radius: 12px; padding: 30px; max-width: 700px; width: 90%; color: var(--navy); position: relative; box-shadow: 0 15px 40px rgba(0,0,0,0.6); transform: scale(0.95); transition: transform 0.3s ease;">
      <button onclick="window.closeDebateModal()" style="position: absolute; top: 15px; right: 15px; background: transparent; border: none; color: #555; font-size: 18pt; cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
      <div style="text-align: center; margin-bottom: 20px;">
        <i class="fa-solid fa-scale-balanced" style="font-size: 32pt; color: var(--accent-red);"></i>
        <h2 style="font-family: var(--font-heading); font-size: 22pt; margin: 10px 0 0 0; color: var(--navy); text-transform: uppercase;">Classroom Oracy</h2>
        <h3 style="font-family: var(--font-title); font-size: 14pt; margin: 5px 0 0 0; color: #555;" id="debateTopicSubtitle">Structured Debate Prompt</h3>
      </div>
      <div id="debateModalContent" style="font-size: 14pt; line-height: 1.5; text-align: center; background: #faf9f6; padding: 25px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 20px;">
        <!-- Content dynamically populated -->
      </div>
      <div id="debateSentenceStarterContainer" style="display: none; background: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px; border-radius: 4px; text-align: left;">
        <strong style="color: #d97706; font-size: 11pt; text-transform: uppercase; display: block; margin-bottom: 5px;"><i class="fa-solid fa-lightbulb"></i> Sentence Starter</strong>
        <span id="debateSentenceStarterText" style="font-size: 12pt; color: #451a03; font-style: italic;"></span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <button class="btn btn-secondary" onclick="window.cycleDebatePrompt(-1)"><i class="fa-solid fa-arrow-left"></i> Previous</button>
        <button id="btn-show-starter" class="btn" style="background: transparent; border: 2px dashed #cbd5e1; color: #64748b; border-radius: 6px; padding: 8px 15px; font-size: 11pt; cursor: pointer; transition: all 0.2s;" onclick="window.toggleDebateStarter()">Show Hint</button>
        <button class="btn btn-primary" onclick="window.cycleDebatePrompt(1)">Next Prompt <i class="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
};

window.openDebateModal = function() {
  window.injectDebateModalIfNeeded();
  const modal = document.getElementById('debateModal');
  modal.style.display = 'flex';
  // Trigger reflow
  void modal.offsetWidth;
  modal.style.opacity = '1';
  modal.querySelector('.modal-content').style.transform = 'scale(1)';
  window.renderDebatePrompt();
};

window.closeDebateModal = function() {
  const modal = document.getElementById('debateModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.95)';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
};

window.renderDebatePrompt = function() {
  if (!window.currentUnitData || !window.currentUnitData.debatePrompts || window.currentUnitData.debatePrompts.length === 0) {
    document.getElementById('debateTopicSubtitle').innerText = "No prompts available";
    document.getElementById('debateModalContent').innerHTML = "No debate prompts found for this unit.";
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

window.toggleDebateStarter = function() {
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

window.cycleDebatePrompt = function(direction) {
  if (!window.currentUnitData || !window.currentUnitData.debatePrompts) return;
  const prompts = window.currentUnitData.debatePrompts;
  window.currentDebateIndex += direction;
  if (window.currentDebateIndex < 0) window.currentDebateIndex = prompts.length - 1;
  if (window.currentDebateIndex >= prompts.length) window.currentDebateIndex = 0;
  window.renderDebatePrompt();
};

// --- Milestone Modal Global Functions ---
window.injectMilestoneModalIfNeeded = function() {
  if (document.getElementById('milestoneModal')) return;
  const html = `
  <div id="milestoneModal" class="modal-overlay no-print" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(8px); justify-content: center; align-items: center; z-index: 1000; opacity: 0; transition: opacity 0.3s ease;" onclick="if(event.target === this) window.closeMilestoneModal()">
    <div class="modal-content" style="background: var(--navy); border: 2.5px solid var(--gold); border-radius: 12px; padding: 25px; max-width: 500px; width: 90%; color: #ffffff; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: scale(0.95); transition: transform 0.3s ease;">
      <button class="modal-close-btn" onclick="window.closeMilestoneModal()" style="position: absolute; top: 15px; right: 15px; background: transparent; border: none; color: #ffffff; font-size: 16pt; cursor: pointer; transition: color 0.2s;"><i class="fa-solid fa-xmark"></i></button>
      <div id="modalMilestoneContent">
        <!-- Content dynamically populated via showMilestoneModal -->
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
};

window.showMilestoneModal = function(id) {
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

window.closeMilestoneModal = function() {
  const modal = document.getElementById('milestoneModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.95)';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
};

// --- Quiz Modal Global Functions ---
window.currentQuizData = [];
window.currentQuizIndex = 0;
window.currentQuizLessonId = null;

window.injectQuizModalIfNeeded = function() {
  if (document.getElementById('quizModal')) return;
  const html = `
  <div id="quizModal" class="modal-overlay no-print" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px); justify-content: center; align-items: center; z-index: 1000; opacity: 0; transition: opacity 0.3s ease;" onclick="if(event.target === this) window.closeQuizModal()">
    <div class="modal-content" style="background: #ffffff; border-radius: 12px; padding: 30px; max-width: 600px; width: 90%; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: scale(0.95); transition: transform 0.3s ease;">
      <button class="modal-close-btn" onclick="window.closeQuizModal()" style="position: absolute; top: 15px; right: 15px; background: transparent; border: none; color: #64748b; font-size: 16pt; cursor: pointer; transition: color 0.2s;"><i class="fa-solid fa-xmark"></i></button>
      
      <div style="display: flex; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
        <i class="fa-solid fa-clipboard-check" style="font-size: 2rem; color: #3b82f6; margin-right: 15px;"></i>
        <div>
          <h2 style="margin: 0; color: #1e293b; font-size: 1.5rem;">Knowledge Check</h2>
          <p style="margin: 0; color: #64748b; font-size: 0.95rem;">Question <span id="quiz-progress">1 / 4</span></p>
        </div>
      </div>
      
      <div id="quiz-question-container">
        <!-- Populated dynamically -->
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-top: 25px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        <div id="quiz-feedback" style="font-weight: bold; padding-top: 8px;"></div>
        <button id="quiz-next-btn" class="btn btn-primary" style="display: none;" onclick="window.nextQuizQuestion()">Next Question <i class="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
};

window.startQuiz = function(lessonId) {
  window.injectQuizModalIfNeeded();
  if (!window.currentUnitData || !window.currentUnitData.lessons) return;
  const lesson = window.currentUnitData.lessons.find(l => l.id === lessonId);
  if (!lesson || !lesson.quiz || lesson.quiz.length === 0) return;
  
  window.currentQuizData = lesson.quiz;
  window.currentQuizIndex = 0;
  window.currentQuizLessonId = lessonId;
  
  window.renderQuizQuestion();
  
  const modal = document.getElementById('quizModal');
  modal.style.display = 'flex';
  void modal.offsetWidth; // Trigger reflow
  modal.style.opacity = '1';
  modal.querySelector('.modal-content').style.transform = 'scale(1)';
};

window.renderQuizQuestion = function() {
  const qData = window.currentQuizData[window.currentQuizIndex];
  document.getElementById('quiz-progress').innerText = `${window.currentQuizIndex + 1} / ${window.currentQuizData.length}`;
  
  let optionsHtml = '';
  qData.options.forEach((opt, idx) => {
    optionsHtml += `
      <button class="quiz-option-btn" data-idx="${idx}" onclick="window.checkQuizAnswer(this, ${idx})" style="display: block; width: 100%; text-align: left; padding: 15px; margin-bottom: 10px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 1.05rem; color: #334155; cursor: pointer; transition: all 0.2s;">
        <span style="display: inline-block; width: 30px; height: 30px; line-height: 30px; text-align: center; background: #e2e8f0; border-radius: 50%; margin-right: 15px; font-weight: bold; color: #64748b;">${String.fromCharCode(65 + idx)}</span>
        ${opt}
      </button>
    `;
  });
  
  document.getElementById('quiz-question-container').innerHTML = `
    <h3 style="font-size: 1.3rem; color: #0f172a; margin-bottom: 20px; line-height: 1.4;">${qData.question}</h3>
    ${optionsHtml}
  `;
  
  document.getElementById('quiz-feedback').innerHTML = '';
  document.getElementById('quiz-next-btn').style.display = 'none';
};

window.checkQuizAnswer = function(btnEl, selectedIdx) {
  const qData = window.currentQuizData[window.currentQuizIndex];
  const isCorrect = (selectedIdx === qData.answer);
  
  // Disable all buttons
  const allBtns = document.getElementById('quiz-question-container').querySelectorAll('.quiz-option-btn');
  allBtns.forEach(btn => {
    btn.disabled = true;
    btn.style.cursor = 'default';
    if (parseInt(btn.dataset.idx) === qData.answer) {
      btn.style.borderColor = '#22c55e';
      btn.style.background = '#f0fdf4';
      btn.style.color = '#15803d';
      btn.innerHTML = '<i class="fa-solid fa-check-circle"></i> ' + btn.innerHTML;
    }
  });
  
  const feedbackEl = document.getElementById('quiz-feedback');
  if (isCorrect) {
    feedbackEl.innerHTML = '<span style="color: #22c55e;"><i class="fa-solid fa-star"></i> Correct!</span>';
  } else {
    btnEl.style.borderColor = '#ef4444';
    btnEl.style.background = '#fef2f2';
    btnEl.style.color = '#b91c1c';
    btnEl.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> ' + btnEl.innerHTML;
    feedbackEl.innerHTML = '<span style="color: #ef4444;">Incorrect. Review the answer above.</span>';
  }
  
  if (window.currentQuizIndex < window.currentQuizData.length - 1) {
    document.getElementById('quiz-next-btn').innerHTML = 'Next Question <i class="fa-solid fa-arrow-right"></i>';
    document.getElementById('quiz-next-btn').style.display = 'block';
    document.getElementById('quiz-next-btn').onclick = window.nextQuizQuestion;
  } else {
    document.getElementById('quiz-next-btn').innerHTML = 'Finish Quiz <i class="fa-solid fa-flag-checkered"></i>';
    document.getElementById('quiz-next-btn').style.display = 'block';
    document.getElementById('quiz-next-btn').onclick = function() {
       document.getElementById('quiz-question-container').innerHTML = '<h3 style="text-align:center; color: #15803d;"><i class="fa-solid fa-trophy"></i> Quiz Complete!</h3>';
       document.getElementById('quiz-feedback').innerHTML = '';
       document.getElementById('quiz-next-btn').style.display = 'none';
    };
  }
};

window.nextQuizQuestion = function() {
  window.currentQuizIndex++;
  window.renderQuizQuestion();
};

window.closeQuizModal = function() {
  const modal = document.getElementById('quizModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.95)';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
};

// --- Glossary Popover Logic ---
let glossaryPopover = null;
let activeVocabElement = null;

function initGlossaryPopover() {
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
    let left = rect.left + (rect.width / 2) - (popoverRect.width / 2);
    
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
      const overflow = (left + popoverRect.width) - (window.innerWidth - 10);
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlossaryPopover);
} else {
  initGlossaryPopover();
}



  window.openModal = function(src) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.backgroundColor = 'rgba(0,0,0,0.85)';
    modal.style.zIndex = '999999';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.cursor = 'zoom-out';
    modal.onclick = () => modal.remove();
    
    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
    
    modal.appendChild(img);
    document.body.appendChild(modal);
  };
  
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJFeGFtUHJhY3RpY2Vab25lIH0gZnJvbSBcIi9lZWUvZXhhbV9wcmFjdGljZV96b25lLmpzXCI7XHJcbmltcG9ydCB7IGluaXRLZXlJbmRpdmlkdWFsc1Rhc2ssIGdlbmVyYXRlS2V5SW5kaXZpZHVhbENhcmRIVE1MLCBnZW5lcmF0ZUtleUluZGl2aWR1YWxFbWJlZEhUTUwgfSBmcm9tIFwiL2VlZS9rZXlfaW5kaXZpZHVhbHMuanNcIjtcclxuaW1wb3J0IHsgcmVuZGVyUXVpelpvbmUgfSBmcm9tIFwiL2VlZS9xdWl6X3pvbmUuanNcIjtcclxuaW1wb3J0IHsgc2FuaXRpemVMZXNzb25EYXRhLCBjbGVhblF1ZXN0aW9uVGV4dCB9IGZyb20gXCIvZWVlL2RhdGFfcGFyc2VyLmpzXCI7XHJcbmltcG9ydCB7IHNlY3Rpb25BR3VpZGUsIHNlY3Rpb25CR3VpZGUsIG1pZGRsZUVhc3RHdWlkZSwgd2VpbWFyR3VpZGUgfSBmcm9tIFwiL2VlZS9leGFtX2d1aWRlX2NvbnRlbnQuanNcIjtcclxuXHJcbndpbmRvdy5leGFtVGltZXJzID0ge307XHJcblxyXG53aW5kb3cudG9nZ2xlRXhhbVRpbWVyID0gZnVuY3Rpb24oY2FyZElkLCBkZWZhdWx0TWludXRlcykge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lci1jb250YWluZXItJyArIGNhcmRJZCk7XHJcbiAgaWYgKGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHtcclxuICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgaWYgKCF3aW5kb3cuZXhhbVRpbWVyc1tjYXJkSWRdKSB7XHJcbiAgICAgIHdpbmRvdy5leGFtVGltZXJzW2NhcmRJZF0gPSB7XHJcbiAgICAgICAgdG90YWxTZWNvbmRzOiBkZWZhdWx0TWludXRlcyAqIDYwLFxyXG4gICAgICAgIHJlbWFpbmluZ1NlY29uZHM6IGRlZmF1bHRNaW51dGVzICogNjAsXHJcbiAgICAgICAgaW50ZXJ2YWw6IG51bGwsXHJcbiAgICAgICAgaXNSdW5uaW5nOiBmYWxzZVxyXG4gICAgICB9O1xyXG4gICAgICB1cGRhdGVUaW1lckRpc3BsYXkoY2FyZElkKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgfVxyXG59O1xyXG5cclxud2luZG93LmFkanVzdEV4YW1UaW1lciA9IGZ1bmN0aW9uKGNhcmRJZCwgbWludXRlc0NoYW5nZSkge1xyXG4gIGNvbnN0IHRpbWVyID0gd2luZG93LmV4YW1UaW1lcnNbY2FyZElkXTtcclxuICBpZiAoIXRpbWVyIHx8IHRpbWVyLmlzUnVubmluZykgcmV0dXJuO1xyXG4gIFxyXG4gIGNvbnN0IG5ld1NlY29uZHMgPSB0aW1lci50b3RhbFNlY29uZHMgKyAobWludXRlc0NoYW5nZSAqIDYwKTtcclxuICBpZiAobmV3U2Vjb25kcyA+PSA2MCkge1xyXG4gICAgdGltZXIudG90YWxTZWNvbmRzID0gbmV3U2Vjb25kcztcclxuICAgIHRpbWVyLnJlbWFpbmluZ1NlY29uZHMgPSBuZXdTZWNvbmRzO1xyXG4gICAgdXBkYXRlVGltZXJEaXNwbGF5KGNhcmRJZCk7XHJcbiAgfVxyXG59O1xyXG5cclxud2luZG93LnN0YXJ0RXhhbVRpbWVyID0gZnVuY3Rpb24oY2FyZElkKSB7XHJcbiAgY29uc3QgdGltZXIgPSB3aW5kb3cuZXhhbVRpbWVyc1tjYXJkSWRdO1xyXG4gIGlmICghdGltZXIpIHJldHVybjtcclxuICBcclxuICBjb25zdCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZXItc3RhcnQtYnRuLScgKyBjYXJkSWQpO1xyXG4gIFxyXG4gIGlmICh0aW1lci5pc1J1bm5pbmcpIHtcclxuICAgIC8vIFBhdXNlXHJcbiAgICBjbGVhckludGVydmFsKHRpbWVyLmludGVydmFsKTtcclxuICAgIHRpbWVyLmlzUnVubmluZyA9IGZhbHNlO1xyXG4gICAgYnRuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBsYXlcIj48L2k+IFJlc3VtZSc7XHJcbiAgICBidG4uc3R5bGUuYmFja2dyb3VuZCA9ICcjZjU5ZTBiJztcclxuICAgIGJ0bi5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oKSB7IHRoaXMuc3R5bGUuYmFja2dyb3VuZD0nI2Y1OWUwYicgfTtcclxuICAgIGJ0bi5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uKCkgeyB0aGlzLnN0eWxlLmJhY2tncm91bmQ9JyNkOTc3MDYnIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIFN0YXJ0XHJcbiAgICB0aW1lci5pc1J1bm5pbmcgPSB0cnVlO1xyXG4gICAgYnRuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBhdXNlXCI+PC9pPiBQYXVzZSc7XHJcbiAgICBidG4uc3R5bGUuYmFja2dyb3VuZCA9ICcjZjU5ZTBiJztcclxuICAgIGJ0bi5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oKSB7IHRoaXMuc3R5bGUuYmFja2dyb3VuZD0nI2Y1OWUwYicgfTtcclxuICAgIGJ0bi5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uKCkgeyB0aGlzLnN0eWxlLmJhY2tncm91bmQ9JyNkOTc3MDYnIH07XHJcbiAgICBcclxuICAgIHRpbWVyLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICBpZiAodGltZXIucmVtYWluaW5nU2Vjb25kcyA+IDApIHtcclxuICAgICAgICB0aW1lci5yZW1haW5pbmdTZWNvbmRzLS07XHJcbiAgICAgICAgdXBkYXRlVGltZXJEaXNwbGF5KGNhcmRJZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lci5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGltZXIuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgYnRuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNoZWNrXCI+PC9pPiBUaW1lIFVwISc7XHJcbiAgICAgICAgYnRuLnN0eWxlLmJhY2tncm91bmQgPSAnI2VmNDQ0NCc7XHJcbiAgICAgICAgYnRuLm9ubW91c2VvdXQgPSBmdW5jdGlvbigpIHsgdGhpcy5zdHlsZS5iYWNrZ3JvdW5kPScjZWY0NDQ0JyB9O1xyXG4gICAgICAgIGJ0bi5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uKCkgeyB0aGlzLnN0eWxlLmJhY2tncm91bmQ9JyNkYzI2MjYnIH07XHJcbiAgICAgIH1cclxuICAgIH0sIDEwMDApO1xyXG4gIH1cclxufTtcclxuXHJcbndpbmRvdy5yZXNldEV4YW1UaW1lciA9IGZ1bmN0aW9uKGNhcmRJZCwgZGVmYXVsdE1pbnV0ZXMpIHtcclxuICBjb25zdCB0aW1lciA9IHdpbmRvdy5leGFtVGltZXJzW2NhcmRJZF07XHJcbiAgaWYgKCF0aW1lcikgcmV0dXJuO1xyXG4gIFxyXG4gIGNsZWFySW50ZXJ2YWwodGltZXIuaW50ZXJ2YWwpO1xyXG4gIHRpbWVyLnJlbWFpbmluZ1NlY29uZHMgPSB0aW1lci50b3RhbFNlY29uZHM7XHJcbiAgdGltZXIuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgXHJcbiAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyLXN0YXJ0LWJ0bi0nICsgY2FyZElkKTtcclxuICBidG4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGxheVwiPjwvaT4gU3RhcnQnO1xyXG4gIGJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gJyMxMGI5ODEnO1xyXG4gIGJ0bi5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oKSB7IHRoaXMuc3R5bGUuYmFja2dyb3VuZD0nIzEwYjk4MScgfTtcclxuICBidG4ub25tb3VzZW92ZXIgPSBmdW5jdGlvbigpIHsgdGhpcy5zdHlsZS5iYWNrZ3JvdW5kPScjMDU5NjY5JyB9O1xyXG4gIFxyXG4gIHVwZGF0ZVRpbWVyRGlzcGxheShjYXJkSWQpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlVGltZXJEaXNwbGF5KGNhcmRJZCkge1xyXG4gIGNvbnN0IHRpbWVyID0gd2luZG93LmV4YW1UaW1lcnNbY2FyZElkXTtcclxuICBpZiAoIXRpbWVyKSByZXR1cm47XHJcbiAgXHJcbiAgY29uc3QgbSA9IE1hdGguZmxvb3IodGltZXIucmVtYWluaW5nU2Vjb25kcyAvIDYwKTtcclxuICBjb25zdCBzID0gdGltZXIucmVtYWluaW5nU2Vjb25kcyAlIDYwO1xyXG4gIFxyXG4gIGNvbnN0IGRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZXItZGlzcGxheS0nICsgY2FyZElkKTtcclxuICBpZiAoZGlzcGxheSkge1xyXG4gICAgZGlzcGxheS50ZXh0Q29udGVudCA9IG0gKyAnOicgKyAocyA8IDEwID8gJzAnIDogJycpICsgcztcclxuICAgIGlmICh0aW1lci5yZW1haW5pbmdTZWNvbmRzIDw9IDYwICYmIHRpbWVyLnJlbWFpbmluZ1NlY29uZHMgPiAwKSB7XHJcbiAgICAgIGRpc3BsYXkuc3R5bGUuY29sb3IgPSAnI2RjMjYyNic7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5LnN0eWxlLmNvbG9yID0gJyMxZTNhOGEnO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBjb25zdCBwcm9ncmVzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lci1wcm9ncmVzcy0nICsgY2FyZElkKTtcclxuICBpZiAocHJvZ3Jlc3MpIHtcclxuICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSAodGltZXIucmVtYWluaW5nU2Vjb25kcyAvIHRpbWVyLnRvdGFsU2Vjb25kcykgKiAxMDA7XHJcbiAgICBwcm9ncmVzcy5zdHlsZS53aWR0aCA9IHBlcmNlbnRhZ2UgKyAnJSc7XHJcbiAgICBpZiAocGVyY2VudGFnZSA8IDIwKSB7XHJcbiAgICAgIHByb2dyZXNzLnN0eWxlLmJhY2tncm91bmQgPSAnI2VmNDQ0NCc7XHJcbiAgICB9IGVsc2UgaWYgKHBlcmNlbnRhZ2UgPCA1MCkge1xyXG4gICAgICBwcm9ncmVzcy5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmNTllMGInO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcHJvZ3Jlc3Muc3R5bGUuYmFja2dyb3VuZCA9ICcjM2I4MmY2JztcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBc3NldFVybChwYXRoKSB7XHJcbiAgaWYgKCFwYXRoKSByZXR1cm4gcGF0aDtcclxuICBpZiAocGF0aC5zdGFydHNXaXRoKCdodHRwJykgfHwgcGF0aC5zdGFydHNXaXRoKCcvJykpIHJldHVybiBwYXRoO1xyXG4gIGlmICh3aW5kb3cuY3VycmVudFVuaXRJZCkge1xyXG4gICAgcmV0dXJuIGAvdW5pdHMvJHt3aW5kb3cuY3VycmVudFVuaXRJZH0vJHtwYXRofWA7XHJcbiAgfVxyXG4gIHJldHVybiBwYXRoO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUFwcCh1bml0RGF0YSkge1xyXG4gIHdpbmRvdy5jdXJyZW50VW5pdERhdGEgPSB1bml0RGF0YTtcclxuICBcclxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xyXG4gIC8vIExpc3RlbiBmb3IgY3VzdG9tIGV2ZW50cyBmcm9tIGR5bmFtaWNhbGx5IGxvYWRlZCBtb2R1bGVzIChsaWtlIHRoZSBUaGVtYXRpYyBNYXRyaXgpXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3JlbmRlckxlc3NvbkV2ZW50JywgKGUpID0+IHtcclxuICAgIGNvbnN0IGxlc3NvbiA9IGUuZGV0YWlsO1xyXG4gICAgcmVuZGVyTGVzc29uKGxlc3Nvbik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY29uc3QgY2EgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudC1hcmVhJyk7XHJcbiAgICAgIGlmIChjYSkge1xyXG4gICAgICAgIGNhLnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogJ3Ntb290aCcgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogJ3Ntb290aCcgfSk7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwMCk7XHJcbiAgICAvLyBUcnkgdG8gdXBkYXRlIHNpZGViYXIgYWN0aXZlIHN0YXRlXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGVzc29uLWxpbmsnKS5mb3JFYWNoKGwgPT4ge1xyXG4gICAgICBsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICBpZiAobC50ZXh0Q29udGVudC5pbmNsdWRlcyhsZXNzb24udGl0bGUpKSB7XHJcbiAgICAgICAgbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZWJhcicpO1xyXG4gIGNvbnN0IGNvbnRlbnRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQtYXJlYScpO1xyXG4gIGNvbnN0IGJ0bkR5c2xleGlhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1keXNsZXhpYScpO1xyXG5cclxuICAvLyBJbmplY3QgQ3VzdG9tIFN0eWxlcyBmb3IgTGF5b3V0ICYgU0VOIChObyBJY29ucylcclxuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBgXHJcbiAgICAucGhhc2UtY2FyZCB7XHJcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSk7XHJcbiAgICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cigxMnB4KTtcclxuICAgICAgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTJweCk7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgICAgcGFkZGluZzogMjRweDtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuICAgICAgYm94LXNoYWRvdzogMCA4cHggMzJweCByZ2JhKDAsMCwwLDAuMDgpO1xyXG4gICAgfVxyXG4gICAgLnBoYXNlLXRpdGxlIHtcclxuICAgICAgZm9udC1mYW1pbHk6ICdQbGF5ZmFpciBEaXNwbGF5Jywgc2VyaWY7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS42cmVtO1xyXG4gICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICBjb2xvcjogIzBmMTcyYTtcclxuICAgICAgbWFyZ2luLXRvcDogMDtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYmEoMCwwLDAsMC4wNSk7XHJcbiAgICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG4gICAgfVxyXG4gICAgLm5hcnJhdGl2ZS1jaHVuayB7XHJcbiAgICAgIGJhY2tncm91bmQ6ICNmOGZhZmM7XHJcbiAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgIzAwMjg1NTtcclxuICAgICAgcGFkZGluZzogMTVweCAyMHB4O1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxOHB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAwIDZweCA2cHggMDtcclxuICAgICAgbGluZS1oZWlnaHQ6IDEuODtcclxuICAgICAgZm9udC1zaXplOiAxLjA1cmVtO1xyXG4gICAgfVxyXG4gICAgLnZvY2FiLXdvcmQge1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCBkYXNoZWQgIzNiODJmNjtcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICBjb2xvcjogIzFlM2E4YTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgICAgYmFja2dyb3VuZDogcmdiYSg1OSwgMTMwLCAyNDYsIDAuMSk7XHJcbiAgICAgIHBhZGRpbmc6IDAgNHB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XHJcbiAgICB9XHJcbiAgICAudm9jYWItd29yZDpob3ZlciwgLnZvY2FiLXdvcmQuYWN0aXZlIHtcclxuICAgICAgYmFja2dyb3VuZDogcmdiYSg1OSwgMTMwLCAyNDYsIDAuMjUpO1xyXG4gICAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjMWUzYThhO1xyXG4gICAgfVxyXG4gICAgI2dsb2JhbC1nbG9zc2FyeS1wb3BvdmVyIHtcclxuICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjMWUyOTNiO1xyXG4gICAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgICAgcGFkZGluZzogMTJweCAxNnB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICAgIHdpZHRoOiBtYXgtY29udGVudDtcclxuICAgICAgbWF4LXdpZHRoOiAzMDBweDtcclxuICAgICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XHJcbiAgICAgIHotaW5kZXg6IDEwMDAwMDtcclxuICAgICAgYm94LXNoYWRvdzogMCAxMHB4IDI1cHggcmdiYSgwLDAsMCwwLjIpO1xyXG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpIHNjYWxlKDAuOTUpO1xyXG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpLCB0cmFuc2Zvcm0gMC4ycyBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxLjI3NSk7XHJcbiAgICB9XHJcbiAgICAjZ2xvYmFsLWdsb3NzYXJ5LXBvcG92ZXIudmlzaWJsZSB7XHJcbiAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSBzY2FsZSgxKTtcclxuICAgIH1cclxuICAgICNnbG9iYWwtZ2xvc3NhcnktcG9wb3Zlcjo6YWZ0ZXIge1xyXG4gICAgICBjb250ZW50OiAnJztcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDEwMCU7XHJcbiAgICAgIGxlZnQ6IDUwJTtcclxuICAgICAgbWFyZ2luLWxlZnQ6IC02cHg7XHJcbiAgICAgIGJvcmRlci13aWR0aDogNnB4O1xyXG4gICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xyXG4gICAgICBib3JkZXItY29sb3I6ICMxZTI5M2IgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7XHJcbiAgICAgIHRyYW5zaXRpb246IGxlZnQgMC4ycyBlYXNlO1xyXG4gICAgfVxyXG4gICAgI2dsb2JhbC1nbG9zc2FyeS1wb3BvdmVyLmFycm93LXRvcDo6YWZ0ZXIge1xyXG4gICAgICB0b3A6IGF1dG87XHJcbiAgICAgIGJvdHRvbTogMTAwJTtcclxuICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjMWUyOTNiIHRyYW5zcGFyZW50O1xyXG4gICAgfVxyXG4gICAgLnNjYWZmb2xkLWJveCB7XHJcbiAgICAgIGJhY2tncm91bmQ6ICNmYWZhZmE7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgICAgcGFkZGluZzogMTRweDtcclxuICAgICAgbWFyZ2luLXRvcDogMTJweDtcclxuICAgICAgZm9udC1zaXplOiAwLjk1cmVtO1xyXG4gICAgfVxyXG4gICAgLnN0YXJ0ZXItYm94IHsgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjMjU2M2ViOyB9XHJcbiAgICAuY2x1ZS1ib3ggeyBib3JkZXItbGVmdDogNHB4IHNvbGlkICNkOTc3MDY7IH1cclxuICAgIC5tb2RlbC1ib3ggeyBib3JkZXItbGVmdDogNHB4IHNvbGlkICMwNTk2Njk7IH1cclxuICAgIC5idG4tZ3JvdXAge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBnYXA6IDEwcHg7XHJcbiAgICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgIH1cclxuICAgIC5zdHVkZW50LWFuc3dlci1pbnB1dCB7XHJcbiAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBoZWlnaHQ6IDE0MHB4O1xyXG4gICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2JkNWUxO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xyXG4gICAgICByZXNpemU6IHZlcnRpY2FsO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgfVxyXG4gICAgLmxhcHRvcC1tb2RlLWFjdGl2ZSAuc3R1ZGVudC1hbnN3ZXItaW5wdXQge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuICAgIC5kby1ub3ctY2FyZCB7XHJcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ4LCAyNTAsIDI1MiwgMC45KTtcclxuICAgICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDhweCk7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjI2LCAyMzIsIDI0MCwgMC44KTtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgICAgcGFkZGluZzogMjBweDtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICAgICAgYm94LXNoYWRvdzogMCA0cHggMTVweCByZ2JhKDAsMCwwLDAuMDUpO1xyXG4gICAgfVxyXG4gICAgLmRvLW5vdy1jYXJkIC5hbnN3ZXIge1xyXG4gICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjZTJlOGYwO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICB9XHJcbiAgICAuZG8tbm93LWNhcmQucmV2ZWFsZWQgLmFuc3dlciB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgfVxyXG4gICAgLmJ0biB7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBnYXA6IDZweDtcclxuICAgICAgcGFkZGluZzogOHB4IDE2cHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xyXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuICAgICAgZm9udC1zaXplOiAwLjk1cmVtO1xyXG4gICAgICBmb250LWZhbWlseTogaW5oZXJpdDtcclxuICAgIH1cclxuICAgIC5idG4tcHJpbWFyeSB7XHJcbiAgICAgIGJhY2tncm91bmQ6ICMxYTIzN2U7XHJcbiAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgYm9yZGVyLWNvbG9yOiAjMWEyMzdlO1xyXG4gICAgfVxyXG4gICAgLmJ0bi1wcmltYXJ5OmhvdmVyIHtcclxuICAgICAgYmFja2dyb3VuZDogIzBkMTY1OTtcclxuICAgIH1cclxuICAgIC5idG4tc20taWNvbiB7XHJcbiAgICAgIHBhZGRpbmc6IDRweCA4cHg7XHJcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiA2cHg7XHJcbiAgICB9XHJcbiAgICAuc3R1ZGVudC1hbnN3ZXItaW5wdXQge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiA4MHB4O1xyXG4gICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2JkNWUxO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xyXG4gICAgICByZXNpemU6IHZlcnRpY2FsO1xyXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgICB9XHJcbiAgICAuZmFiLWNvcHkge1xyXG4gICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICAgIGJvdHRvbTogMzBweDtcclxuICAgICAgcmlnaHQ6IDMwcHg7XHJcbiAgICAgIGJhY2tncm91bmQ6ICMxZTNhOGE7XHJcbiAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgYm9yZGVyOiBub25lO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgIHdpZHRoOiA2MHB4O1xyXG4gICAgICBoZWlnaHQ6IDYwcHg7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxNXB4IHJnYmEoMCwwLDAsMC4zKTtcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICB6LWluZGV4OiAxMDAwO1xyXG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycywgYmFja2dyb3VuZCAwLjJzO1xyXG4gICAgfVxyXG4gICAgLmZhYi1jb3B5OmhvdmVyIHtcclxuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcclxuICAgICAgYmFja2dyb3VuZDogIzFlMjkzYjtcclxuICAgIH1cclxuICAgIC5sYXB0b3AtbW9kZS1hY3RpdmUgLmZhYi1jb3B5IHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICB9XHJcbiAgICAuYnRuLXNlY29uZGFyeSB7XHJcbiAgICAgIGJhY2tncm91bmQ6ICNlMmU4ZjA7XHJcbiAgICAgIGNvbG9yOiAjMzM0MTU1O1xyXG4gICAgICBib3JkZXItY29sb3I6ICNjYmQ1ZTE7XHJcbiAgICB9XHJcbiAgICAuYnRuLXNlY29uZGFyeTpob3ZlciB7XHJcbiAgICAgIGJhY2tncm91bmQ6ICNjYmQ1ZTE7XHJcbiAgICAgIGNvbG9yOiAjMGYxNzJhO1xyXG4gICAgfVxyXG4gICAgLnJlYWRpbmctYWN0aXZlIHtcclxuICAgICAgYmFja2dyb3VuZDogI2VmNDQ0NCAhaW1wb3J0YW50O1xyXG4gICAgICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcclxuICAgICAgYm9yZGVyLWNvbG9yOiAjZGMyNjI2ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAuc2lkZWJhciB7XHJcbiAgICAgIGJhY2tncm91bmQ6ICMwZjE3MmEgIWltcG9ydGFudDtcclxuICAgICAgYm9yZGVyLXJpZ2h0OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgIGJveC1zaGFkb3c6IDJweCAwIDE1cHggcmdiYSgwLDAsMCwwLjEpO1xyXG4gICAgfVxyXG4gICAgLnNpZGViYXIgLmZhLWdyYWR1YXRpb24tY2FwLCAuc2lkZWJhciBoMiwgLnNpZGViYXIgc3BhbiwgLnNpZGViYXIgLmxlc3Nvbi1saW5rIHtcclxuICAgICAgY29sb3I6ICNmMWY1ZjkgIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIC5zaWRlYmFyIC5sZXNzb24tbGluayB7XHJcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4wNSkgIWltcG9ydGFudDtcclxuICAgICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICB9XHJcbiAgICAuc2lkZWJhciAubGVzc29uLWxpbms6aG92ZXIsIC5zaWRlYmFyIC5sZXNzb24tbGluay5hY3RpdmUge1xyXG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMTUpICFpbXBvcnRhbnQ7XHJcbiAgICAgIGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7XHJcbiAgICAgIGJvcmRlci1jb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwwLjIpO1xyXG4gICAgfVxyXG4gICAgLnNpZGViYXItaGVhZGVyIHtcclxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4xKSAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLnNvdXJjZS1jYXJkIGltZyB7XHJcbiAgICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgICAgbWF4LWhlaWdodDogNTAwcHg7XHJcbiAgICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgIH1cclxuICAgIC5mbGFzaGNhcmQtZGVjayB7XHJcbiAgICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjUwcHgsIDFmcikpO1xyXG4gICAgICBnYXA6IDIwcHg7XHJcbiAgICB9XHJcbiAgICAuZmxhc2hjYXJkLXdyYXBwZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgICAgaGVpZ2h0OiAyMDBweDtcclxuICAgICAgcGVyc3BlY3RpdmU6IDEwMDBweDtcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgfVxyXG4gICAgLmZsYXNoY2FyZC1pbm5lciB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgfVxyXG4gICAgLmZsYXNoY2FyZC1mYWNlIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcclxuICAgICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDhweCByZ2JhKDAsMCwwLDAuMSk7XHJcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjZzIGN1YmljLWJlemllcigwLjQsIDAuMiwgMC4yLCAxKTtcclxuICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAwLjZzIGN1YmljLWJlemllcigwLjQsIDAuMiwgMC4yLCAxKTtcclxuICAgIH1cclxuICAgIC5mbGFzaGNhcmQtZnJvbnQge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFmNWY5O1xyXG4gICAgICBjb2xvcjogIzMzMztcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjYmQ1ZTE7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlWSgwZGVnKTtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoMGRlZyk7XHJcbiAgICB9XHJcbiAgICAuZmxhc2hjYXJkLWZyb250IGg0IHtcclxuICAgICAgbWFyZ2luOiAwIDAgMTBweCAwO1xyXG4gICAgICBjb2xvcjogIzFlMjkzYjtcclxuICAgICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICB9XHJcbiAgICAuZmxhc2hjYXJkLWZyb250IHAge1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgIGNvbG9yOiAjNjQ3NDhiO1xyXG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgIH1cclxuICAgIC5mbGFzaGNhcmQtYmFjayB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzYjgyZjY7XHJcbiAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlWSgxODBkZWcpO1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWSgxODBkZWcpO1xyXG4gICAgICBmb250LXNpemU6IDEuMDVyZW07XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XHJcbiAgICB9XHJcbiAgICAuZmxhc2hjYXJkLXdyYXBwZXIuZmxpcHBlZCAuZmxhc2hjYXJkLWZyb250IHtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGVZKC0xODBkZWcpO1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWSgtMTgwZGVnKTtcclxuICAgIH1cclxuICAgIC5mbGFzaGNhcmQtd3JhcHBlci5mbGlwcGVkIC5mbGFzaGNhcmQtYmFjayB7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlWSgwZGVnKTtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoMGRlZyk7XHJcbiAgICB9XHJcbiAgICAudGVhY2hlci1ub3RlIHtcclxuICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgICAgYmFja2dyb3VuZDogIzFlMjkzYjtcclxuICAgICAgY29sb3I6ICNmOGZhZmM7XHJcbiAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgI2ZhY2MxNTtcclxuICAgICAgcGFkZGluZzogMTVweCAyMHB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDI1cHg7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS4wNXJlbTtcclxuICAgICAgYm94LXNoYWRvdzogMCA0cHggMTBweCByZ2JhKDAsMCwwLDAuMTUpO1xyXG4gICAgICBsaW5lLWhlaWdodDogMS42O1xyXG4gICAgfVxyXG4gICAgLnRlYWNoZXItbm90ZSBoNCB7XHJcbiAgICAgIG1hcmdpbi10b3A6IDA7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICAgIGNvbG9yOiAjZmFjYzE1O1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBnYXA6IDhweDtcclxuICAgICAgZm9udC1zaXplOiAxLjE1cmVtO1xyXG4gICAgfVxyXG4gICAgLnRlYWNoZXItbW9kZS1hY3RpdmUgLnRlYWNoZXItbm90ZSB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBhbmltYXRpb246IGZhZGVJbiAwLjNzIGVhc2U7XHJcbiAgICB9XHJcbiAgICBAa2V5ZnJhbWVzIGZhZGVJbiB7IGZyb20geyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTVweCk7IH0gdG8geyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH0gfVxyXG4gICAgLnBhcmEtbnVtYmVyIHtcclxuICAgICAgYmFja2dyb3VuZDogI2UyZThmMDtcclxuICAgICAgY29sb3I6ICM0NzU1Njk7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgIHdpZHRoOiAyNHB4O1xyXG4gICAgICBoZWlnaHQ6IDI0cHg7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICBmb250LXNpemU6IDAuODVyZW07XHJcbiAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcclxuICAgICAgZmxleC1zaHJpbms6IDA7XHJcbiAgICAgIG1hcmdpbi10b3A6IDJweDtcclxuICAgIH1cclxuICAgIEBrZXlmcmFtZXMgaGlnaGxpZ2h0UHVsc2Uge1xyXG4gICAgICAwJSB7IGJhY2tncm91bmQ6ICNmZWYwOGE7IHRyYW5zZm9ybTogc2NhbGUoMS4wMik7IH1cclxuICAgICAgNTAlIHsgYmFja2dyb3VuZDogI2ZlZjA4YTsgdHJhbnNmb3JtOiBzY2FsZSgxLjAyKTsgfVxyXG4gICAgICAxMDAlIHsgYmFja2dyb3VuZDogI2Y4ZmFmYzsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgfVxyXG4gICAgfVxyXG4gICAgLmhpZ2hsaWdodC1mbGFzaCB7XHJcbiAgICAgIGFuaW1hdGlvbjogaGlnaGxpZ2h0UHVsc2UgMi41cyBlYXNlLW91dDtcclxuICAgIH1cclxuICBgO1xyXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG5cclxuICB3aW5kb3cuc2Nyb2xsVG9QYXJhID0gZnVuY3Rpb24oaWQpIHtcclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgaWYgKGVsKSB7XHJcbiAgICAgIGVsLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicgfSk7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZ2hsaWdodC1mbGFzaCcpO1xyXG4gICAgICAvLyBUcmlnZ2VyIHJlZmxvdyB0byByZXN0YXJ0IGFuaW1hdGlvblxyXG4gICAgICB2b2lkIGVsLm9mZnNldFdpZHRoO1xyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKCdoaWdobGlnaHQtZmxhc2gnKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWdobGlnaHQtZmxhc2gnKSwgMjYwMCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgbGV0IHVuaXRFbnF1aXJ5VGV4dCA9IFwiXCI7XHJcbiAgY29uc3QgaGVhZGVyRGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXItdGl0bGUtY29udGFpbmVyIGRpdiBkaXYnKTtcclxuICBoZWFkZXJEaXZzLmZvckVhY2goZGl2ID0+IHtcclxuICAgIGlmIChkaXYudGV4dENvbnRlbnQuaW5jbHVkZXMoJ1VuaXQgRW5xdWlyeTonKSkge1xyXG4gICAgICB1bml0RW5xdWlyeVRleHQgPSBkaXYudGV4dENvbnRlbnQ7XHJcbiAgICAgIGRpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBTZXQgdXAgU3BlZWNoIFN5bnRoZXNpc1xyXG4gIGxldCBzeW50aCA9IHdpbmRvdy5zcGVlY2hTeW50aGVzaXM7XHJcbiAgbGV0IHV0dGVyYW5jZSA9IG51bGw7XHJcblxyXG4gIC8vIENvcHkgdG8gT25lTm90ZSBGQUJcclxuICBjb25zdCBmYWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICBmYWIuY2xhc3NOYW1lID0gJ2ZhYi1jb3B5JztcclxuICBmYWIuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtY29weVwiPjwvaT4nO1xyXG4gIGZhYi50aXRsZSA9IFwiQ29weSBhbGwgYW5zd2VycyB0byBPbmVOb3RlXCI7XHJcbiAgZmFiLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICBsZXQgdGV4dCA9IFwiSGlzdG9yeSBMZXNzb24gQW5zd2Vyc1xcblxcblwiO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRvLW5vdy1jYXJkJykuZm9yRWFjaChjYXJkID0+IHtcclxuICAgICAgbGV0IHFUZXh0RWwgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJ2RpdltzdHlsZSo9XCJmb250LXdlaWdodDogNzAwXCJdJyk7XHJcbiAgICAgIGxldCB0ZXh0YXJlYSA9IGNhcmQucXVlcnlTZWxlY3RvcignLnN0dWRlbnQtYW5zd2VyLWlucHV0Jyk7XHJcbiAgICAgIGlmIChxVGV4dEVsICYmIHRleHRhcmVhKSB7XHJcbiAgICAgICAgbGV0IGNsb25lID0gcVRleHRFbC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgbGV0IHNwYW4gPSBjbG9uZS5xdWVyeVNlbGVjdG9yKCdzcGFuJyk7XHJcbiAgICAgICAgaWYgKHNwYW4pIHNwYW4ucmVtb3ZlKCk7XHJcbiAgICAgICAgdGV4dCArPSBjbG9uZS50ZXh0Q29udGVudC50cmltKCkgKyBcIlxcblwiO1xyXG4gICAgICAgIHRleHQgKz0gXCJBbnN3ZXI6IFwiICsgdGV4dGFyZWEudmFsdWUgKyBcIlxcblxcblwiO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRleHQpLnRoZW4oKCkgPT4ge1xyXG4gICAgICBhbGVydCgnQWxsIGFuc3dlcnMgY29waWVkIHRvIGNsaXBib2FyZCEgUmVhZHkgdG8gcGFzdGUgaW50byBPbmVOb3RlLicpO1xyXG4gICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgYWxlcnQoJ0ZhaWxlZCB0byBjb3B5IHRvIGNsaXBib2FyZC4nKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmYWIpO1xyXG5cclxuICAvLyBHbG9iYWwgU2ltcGxpZnkgbG9naWNcclxuICB3aW5kb3cudG9nZ2xlU2ltcGxpZnkgPSBmdW5jdGlvbihidG5FbGVtZW50KSB7XHJcbiAgICBjb25zdCB0ZXh0Q29udGFpbmVyID0gYnRuRWxlbWVudC5jbG9zZXN0KCcubmFycmF0aXZlLWNodW5rJykucXVlcnlTZWxlY3RvcignLm5hcnJhdGl2ZS10ZXh0Jyk7XHJcbiAgICBpZiAoIXRleHRDb250YWluZXIpIHJldHVybjtcclxuICAgIFxyXG4gICAgaWYgKGJ0bkVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaW1wbGlmaWVkLWFjdGl2ZScpKSB7XHJcbiAgICAgIHRleHRDb250YWluZXIuaW5uZXJIVE1MID0gZGVjb2RlVVJJQ29tcG9uZW50KGJ0bkVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW9yaWdpbmFsJykpO1xyXG4gICAgICBidG5FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NpbXBsaWZpZWQtYWN0aXZlJyk7XHJcbiAgICAgIGJ0bkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xyXG4gICAgICBidG5FbGVtZW50LnN0eWxlLmNvbG9yID0gJyMwNDc4NTcnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGV4dENvbnRhaW5lci5pbm5lckhUTUwgPSBkZWNvZGVVUklDb21wb25lbnQoYnRuRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2ltcGxpZmllZCcpKTtcclxuICAgICAgYnRuRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzaW1wbGlmaWVkLWFjdGl2ZScpO1xyXG4gICAgICBidG5FbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSAnI2QxZmFlNSc7XHJcbiAgICAgIGJ0bkVsZW1lbnQuc3R5bGUuY29sb3IgPSAnIzA2NWY0Nic7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gR2xvYmFsIFJlYWQgQWxvdWQgbG9naWMgKFBlciBQYXJhZ3JhcGgpXHJcbiAgd2luZG93LnJlYWRBbG91ZFRleHQgPSBmdW5jdGlvbihidG5FbGVtZW50KSB7XHJcbiAgICBpZiAoc3ludGguc3BlYWtpbmcgJiYgYnRuRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3JlYWRpbmctYWN0aXZlJykpIHtcclxuICAgICAgc3ludGguY2FuY2VsKCk7XHJcbiAgICAgIGJ0bkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgncmVhZGluZy1hY3RpdmUnKTtcclxuICAgICAgYnRuRWxlbWVudC5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS12b2x1bWUtaGlnaFwiPjwvaT4nO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN5bnRoLmNhbmNlbCgpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hcnJhdGl2ZS1jaHVuayBidXR0b24nKS5mb3JFYWNoKGIgPT4ge1xyXG4gICAgICBiLmNsYXNzTGlzdC5yZW1vdmUoJ3JlYWRpbmctYWN0aXZlJyk7XHJcbiAgICAgIGIuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtdm9sdW1lLWhpZ2hcIj48L2k+JztcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRleHRUb1JlYWQgPSBidG5FbGVtZW50LmNsb3Nlc3QoJy5uYXJyYXRpdmUtY2h1bmsnKS5xdWVyeVNlbGVjdG9yKCcubmFycmF0aXZlLXRleHQnKS50ZXh0Q29udGVudDtcclxuICAgIGlmICh0ZXh0VG9SZWFkLnRyaW0oKSA9PT0gXCJcIikgcmV0dXJuO1xyXG5cclxuICAgIGJ0bkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncmVhZGluZy1hY3RpdmUnKTtcclxuICAgIGJ0bkVsZW1lbnQuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtc3RvcFwiPjwvaT4nO1xyXG5cclxuICAgIHV0dGVyYW5jZSA9IG5ldyBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UodGV4dFRvUmVhZCk7XHJcbiAgICB1dHRlcmFuY2Uub25lbmQgPSAoKSA9PiB7XHJcbiAgICAgIGJ0bkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgncmVhZGluZy1hY3RpdmUnKTtcclxuICAgICAgYnRuRWxlbWVudC5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS12b2x1bWUtaGlnaFwiPjwvaT4nO1xyXG4gICAgfTtcclxuICAgIHN5bnRoLnNwZWFrKHV0dGVyYW5jZSk7XHJcbiAgfTtcclxuXHJcbiAgXHJcblxyXG4gIC8vIFRvZ2dsZSBEeXNsZXhpYSBNb2RlIChQcmVzZXJ2ZSBpY29uKVxyXG4gIGJ0bkR5c2xleGlhLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdzZW4tbW9kZScpO1xyXG4gICAgY29uc3QgaXNTZW4gPSBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygnc2VuLW1vZGUnKTtcclxuICAgIGlmIChidG5EeXNsZXhpYS50aXRsZSA9PT0gJ1NFTiAvIER5c2xleGlhIE1vZGUnIHx8IGJ0bkR5c2xleGlhLnRpdGxlID09PSAnU3RhbmRhcmQgTW9kZScpIHtcclxuICAgICAgLy8gSXQncyBhbiBpY29uIGJ1dHRvbiB3aXRoIHRpdGxlXHJcbiAgICAgIGJ0bkR5c2xleGlhLnRpdGxlID0gaXNTZW4gPyAnU3RhbmRhcmQgTW9kZScgOiAnU0VOIC8gRHlzbGV4aWEgTW9kZSc7XHJcbiAgICAgIGJ0bkR5c2xleGlhLnN0eWxlLmJhY2tncm91bmQgPSBpc1NlbiA/ICcjMWUyOTNiJyA6ICcnO1xyXG4gICAgICBidG5EeXNsZXhpYS5zdHlsZS5jb2xvciA9IGlzU2VuID8gJyNmZmZmZmYnIDogJyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBMZWdhY3kgdGV4dCBidXR0b25cclxuICAgICAgYnRuRHlzbGV4aWEudGV4dENvbnRlbnQgPSBpc1NlbiA/ICdTdGFuZGFyZCBNb2RlJyA6ICdTRU4gLyBEeXNsZXhpYSBNb2RlJztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gSW5qZWN0IExhcHRvcCBNb2RlICYgVGVhY2hlciBNb2RlIEJ1dHRvbnNcclxuICBjb25zdCBoZWFkZXJBY3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1hY3Rpb25zJyk7XHJcbiAgaWYgKGhlYWRlckFjdGlvbnMpIHtcclxuICAgIGNvbnN0IGJ0bkxhcHRvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgYnRuTGFwdG9wLmNsYXNzTmFtZSA9ICdidG4gYnRuLXNlY29uZGFyeSc7XHJcbiAgICBidG5MYXB0b3Auc3R5bGUubWFyZ2luUmlnaHQgPSAnNXB4JztcclxuICAgIGJ0bkxhcHRvcC5zdHlsZS5wYWRkaW5nID0gJzZweCAxMnB4JztcclxuICAgIGJ0bkxhcHRvcC50aXRsZSA9ICdMYXB0b3AgTW9kZSc7XHJcbiAgICBidG5MYXB0b3AuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtbGFwdG9wXCI+PC9pPic7XHJcbiAgICBcclxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFwdG9wTW9kZScpID09PSAndHJ1ZScpIHtcclxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdsYXB0b3AtbW9kZS1hY3RpdmUnKTtcclxuICAgICAgYnRuTGFwdG9wLnN0eWxlLmJhY2tncm91bmQgPSAnIzFlMjkzYic7XHJcbiAgICAgIGJ0bkxhcHRvcC5zdHlsZS5jb2xvciA9ICcjZmZmZmZmJztcclxuICAgIH1cclxuXHJcbiAgICBidG5MYXB0b3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnbGFwdG9wLW1vZGUtYWN0aXZlJyk7XHJcbiAgICAgIGNvbnN0IGlzQWN0aXZlID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2xhcHRvcC1tb2RlLWFjdGl2ZScpO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGFwdG9wTW9kZScsIGlzQWN0aXZlKTtcclxuICAgICAgYnRuTGFwdG9wLnN0eWxlLmJhY2tncm91bmQgPSBpc0FjdGl2ZSA/ICcjMWUyOTNiJyA6ICcnO1xyXG4gICAgICBidG5MYXB0b3Auc3R5bGUuY29sb3IgPSBpc0FjdGl2ZSA/ICcjZmZmZmZmJyA6ICcnO1xyXG4gICAgfSk7XHJcbiAgICBoZWFkZXJBY3Rpb25zLmFwcGVuZENoaWxkKGJ0bkxhcHRvcCk7XHJcblxyXG4gICAgY29uc3QgYnRuVGVhY2hlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgYnRuVGVhY2hlci5jbGFzc05hbWUgPSAnYnRuIGJ0bi1zZWNvbmRhcnknO1xyXG4gICAgYnRuVGVhY2hlci5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS11c2VyLXRpZVwiPjwvaT4gVGVhY2hlciBNb2RlJztcclxuICAgIGJ0blRlYWNoZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgndGVhY2hlci1tb2RlLWFjdGl2ZScpO1xyXG4gICAgICBjb25zdCBpc0FjdGl2ZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCd0ZWFjaGVyLW1vZGUtYWN0aXZlJyk7XHJcbiAgICAgIGJ0blRlYWNoZXIuaW5uZXJIVE1MID0gaXNBY3RpdmUgPyAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS11c2VyLXRpZVwiPjwvaT4gVGVhY2hlciBNb2RlOiBPTicgOiAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS11c2VyLXRpZVwiPjwvaT4gVGVhY2hlciBNb2RlJztcclxuICAgICAgYnRuVGVhY2hlci5zdHlsZS5iYWNrZ3JvdW5kID0gaXNBY3RpdmUgPyAnIzFlMjkzYicgOiAnJztcclxuICAgICAgYnRuVGVhY2hlci5zdHlsZS5jb2xvciA9IGlzQWN0aXZlID8gJyNmZmZmZmYnIDogJyc7XHJcbiAgICB9KTtcclxuICAgIGhlYWRlckFjdGlvbnMuYXBwZW5kQ2hpbGQoYnRuVGVhY2hlcik7XHJcblxyXG4gICAgY29uc3QgYnRuQ3VycmljdWx1bSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgYnRuQ3VycmljdWx1bS5jbGFzc05hbWUgPSAnYnRuIGJ0bi1zZWNvbmRhcnknO1xyXG4gICAgYnRuQ3VycmljdWx1bS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jbG9jay1yb3RhdGUtbGVmdFwiPjwvaT4gUHJpb3IgS25vd2xlZGdlIChUZWFjaGVycyknO1xyXG4gICAgYnRuQ3VycmljdWx1bS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgb3BlbkN1cnJpY3VsdW1Nb2RhbCgpO1xyXG4gICAgfSk7XHJcbiAgICBoZWFkZXJBY3Rpb25zLmFwcGVuZENoaWxkKGJ0bkN1cnJpY3VsdW0pO1xyXG5cclxuICAgIGNvbnN0IGJ0bldoaXRlYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGJ0bldoaXRlYm9hcmQuY2xhc3NOYW1lID0gJ2J0biBidG4tc2Vjb25kYXJ5JztcclxuICAgIGJ0bldoaXRlYm9hcmQuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVyc29uLWNoYWxrYm9hcmRcIj48L2k+IFRhc2sgV2hpdGVib2FyZCc7XHJcbiAgICBidG5XaGl0ZWJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBvcGVuVGFza1doaXRlYm9hcmQoKTtcclxuICAgIH0pO1xyXG4gICAgaGVhZGVyQWN0aW9ucy5hcHBlbmRDaGlsZChidG5XaGl0ZWJvYXJkKTtcclxuXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBvcGVuQ3VycmljdWx1bU1vZGFsKCkge1xyXG4gICAgbGV0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJpY3VsdW0tbW9kYWwnKTtcclxuICAgIGlmICghbW9kYWwpIHtcclxuICAgICAgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgbW9kYWwuaWQgPSAnY3VycmljdWx1bS1tb2RhbCc7XHJcbiAgICAgIG1vZGFsLnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLDAuNSk7ei1pbmRleDoxMDAwMDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7JztcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgY29udGVudC5zdHlsZS5jc3NUZXh0ID0gJ2JhY2tncm91bmQ6I2ZmZmZmZjtwYWRkaW5nOjMwcHg7Ym9yZGVyLXJhZGl1czoxMnB4O3dpZHRoOjkwJTttYXgtd2lkdGg6NTAwcHg7Y29sb3I6IzMzMzMzMztib3gtc2hhZG93OjAgMTBweCAyNXB4IHJnYmEoMCwwLDAsMC4yKTsnO1xyXG4gICAgICBcclxuICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGgyIHN0eWxlPVwibWFyZ2luLXRvcDowXCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jbG9jay1yb3RhdGUtbGVmdFwiPjwvaT4gUHJpb3IgS25vd2xlZGdlIFNldHVwPC9oMj5cclxuICAgICAgICA8cCBzdHlsZT1cIm9wYWNpdHk6MC44O2ZvbnQtc2l6ZTowLjk1cmVtO1wiPlNlbGVjdCB0aGUgdW5pdHMgeW91ciBjbGFzcyBoYXMgYWxyZWFkeSBiZWVuIHRhdWdodC4gVGhlIGFwcCB3aWxsIGR5bmFtaWNhbGx5IGdlbmVyYXRlIFwiUEFTVCBUT1BJQ1wiIERvIE5vdyByZXRyaWV2YWwgcXVlc3Rpb25zIGZyb20gdGhlc2UgdW5pdHMuPC9wPlxyXG4gICAgICAgIDxkaXYgaWQ9XCJ1bml0LWNoZWNrYm94ZXNcIiBzdHlsZT1cImRpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Z2FwOjEycHg7bWFyZ2luOjI1cHggMDtcIj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpmbGV4LWVuZDtnYXA6MTBweDttYXJnaW4tdG9wOjIwcHg7XCI+XHJcbiAgICAgICAgICA8YnV0dG9uIGlkPVwiY2xvc2UtY3VycmljdWx1bVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+U2F2ZSAmIENsb3NlPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGA7XHJcbiAgICAgIG1vZGFsLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcclxuXHJcbiAgICAgIGNvbnN0IGF2YWlsYWJsZVVuaXRzID0gW1xyXG4gICAgICAgIHsgaWQ6ICdub3JtYW5fY29ucXVlc3QnLCB0aXRsZTogJ1RoZSBOb3JtYW4gQ29ucXVlc3QnIH0sXHJcbiAgICAgICAgeyBpZDogJ3dhdGVyX2FuZF9zYW5pdGF0aW9uJywgdGl0bGU6ICdXYXRlciAmIEhlYWx0aCBUaHJvdWdoIFRpbWUnIH0sXHJcbiAgICAgICAgeyBpZDogJ2NoYW5nZV8xNDUwXzE3NTAnLCB0aXRsZTogJ0NoYW5nZSAxNDUwLTE3NTAgKFR1ZG9ycyknIH1cclxuICAgICAgXTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRlbnQucXVlcnlTZWxlY3RvcignI3VuaXQtY2hlY2tib3hlcycpO1xyXG4gICAgICBjb25zdCB0YXVnaHQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXVnaHRVbml0cycpIHx8ICdbXScpO1xyXG5cclxuICAgICAgYXZhaWxhYmxlVW5pdHMuZm9yRWFjaCh1ID0+IHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgICAgbGFiZWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICBsYWJlbC5zdHlsZS5hbGlnbkl0ZW1zID0gJ2NlbnRlcic7XHJcbiAgICAgICAgbGFiZWwuc3R5bGUuZ2FwID0gJzEwcHgnO1xyXG4gICAgICAgIGxhYmVsLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcclxuICAgICAgICBsYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxLjFyZW0nO1xyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcclxuICAgICAgICBjaGVja2JveC52YWx1ZSA9IHUuaWQ7XHJcbiAgICAgICAgY2hlY2tib3guc3R5bGUud2lkdGggPSAnMjBweCc7XHJcbiAgICAgICAgY2hlY2tib3guc3R5bGUuaGVpZ2h0ID0gJzIwcHgnO1xyXG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0YXVnaHQuaW5jbHVkZXModS5pZCk7XHJcbiAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgbGV0IGN1cnJlbnQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXVnaHRVbml0cycpIHx8ICdbXScpO1xyXG4gICAgICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIGN1cnJlbnQucHVzaCh1LmlkKTtcclxuICAgICAgICAgIGVsc2UgY3VycmVudCA9IGN1cnJlbnQuZmlsdGVyKGlkID0+IGlkICE9PSB1LmlkKTtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXVnaHRVbml0cycsIEpTT04uc3RyaW5naWZ5KFsuLi5uZXcgU2V0KGN1cnJlbnQpXSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcclxuICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh1LnRpdGxlKSk7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb250ZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9zZS1jdXJyaWN1bHVtJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChtb2RhbCk7XHJcbiAgICAgICAgLy8gUmVmcmVzaCBwYWdlIHRvIGFwcGx5IG5ldyBEbyBOb3dzIGlmIHdlIGFyZSBjdXJyZW50bHkgbG9va2luZyBhdCBvbmVcclxuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJIb21lcGFnZSgpIHtcclxuICAgIGxldCBsZXNzb25zSFRNTCA9IGBcclxuICAgICAgPHN0eWxlPlxyXG4gICAgICAgIC5wcmVtaXVtLWJhbm5lciB7XHJcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IG92ZXJmbG93OiBoaWRkZW47IGJvcmRlci1yYWRpdXM6IDEycHg7IHBhZGRpbmc6IDI1cHggMzBweDsgbWFyZ2luLXRvcDogMzBweDsgbWFyZ2luLWJvdHRvbTogMjBweDsgXHJcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDEwcHggMjVweCAtMTBweCByZ2JhKDAsMCwwLDAuNCk7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OyBnYXA6IDhweDsgXHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC40cyBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxLjI3NSk7IGN1cnNvcjogZGVmYXVsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnByZW1pdW0tYmFubmVyOmhvdmVyIHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wMSkgdHJhbnNsYXRlWSgtM3B4KTtcclxuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMTVweCAzMHB4IC0xMHB4IHJnYmEoMCwwLDAsMC41KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnByZW1pdW0tYmFubmVyLWJnIHtcclxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAtNSU7IGxlZnQ6IC01JTsgd2lkdGg6IDExMCU7IGhlaWdodDogMTEwJTsgXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7IGJhY2tncm91bmQtc2l6ZTogY292ZXI7IFxyXG4gICAgICAgICAgei1pbmRleDogMTsgZmlsdGVyOiBicmlnaHRuZXNzKDAuOSk7IHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjhzIGVhc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5wcmVtaXVtLWJhbm5lcjpob3ZlciAucHJlbWl1bS1iYW5uZXItYmcge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjAzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnByZW1pdW0tYmFubmVyLW92ZXJsYXktMSB7XHJcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCByZ2JhKDAsMCwwLDAuNykgMCUsIHJnYmEoMCwwLDAsMC4xKSAxMDAlKTsgei1pbmRleDogMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnByZW1pdW0tYmFubmVyLW92ZXJsYXktMiB7XHJcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgXHJcbiAgICAgICAgICBvcGFjaXR5OiAwLjQ1OyBtaXgtYmxlbmQtbW9kZTogbXVsdGlwbHk7IHotaW5kZXg6IDM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5wcmVtaXVtLWJhbm5lci1nbG93IHtcclxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgYm90dG9tOiAtNTBweDsgcmlnaHQ6IC01MHB4OyB3aWR0aDogMzAwcHg7IGhlaWdodDogMzAwcHg7IFxyXG4gICAgICAgICAgZmlsdGVyOiBibHVyKDQwcHgpOyB6LWluZGV4OiAzOyBvcGFjaXR5OiAwLjY7IGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnByZW1pdW0tYmFubmVyLWNvbnRlbnQge1xyXG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlOyB6LWluZGV4OiA0OyBwYWRkaW5nLWxlZnQ6IDIwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5wcmVtaXVtLWJhbm5lci10aXRsZSB7XHJcbiAgICAgICAgICBtYXJnaW46IDA7IGNvbG9yOiAjZmZmZmZmOyBmb250LXNpemU6IDJyZW07IGZvbnQtd2VpZ2h0OiA3MDA7IFxyXG4gICAgICAgICAgZm9udC1mYW1pbHk6ICdQbGF5ZmFpciBEaXNwbGF5Jywgc2VyaWY7IHRleHQtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLDAsMCwwLjgpOyBsZXR0ZXItc3BhY2luZzogLTAuNXB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAucHJlbWl1bS1iYW5uZXItZW5xdWlyeSB7XHJcbiAgICAgICAgICBtYXJnaW46IDhweCAwIDAgMDsgY29sb3I6ICNmOGZhZmM7IGZvbnQtc2l6ZTogMS4wNXJlbTsgZm9udC1zdHlsZTogaXRhbGljOyBcclxuICAgICAgICAgIG1heC13aWR0aDogODAwcHg7IGZvbnQtd2VpZ2h0OiAzMDA7IHRleHQtc2hhZG93OiAwcHggMnB4IDhweCByZ2JhKDAsMCwwLDAuOCk7XHJcbiAgICAgICAgfVxyXG4gICAgICA8L3N0eWxlPlxyXG4gICAgYDtcclxuICAgIGlmICh3aW5kb3cuY3VycmVudFVuaXRJZCA9PT0gJ2VkZXhjZWxfbWVkaWNpbmUnIHx8IHdpbmRvdy5jdXJyZW50VW5pdElkID09PSAnY21lX25ldycgfHwgd2luZG93LmN1cnJlbnRVbml0SWQgPT09ICd3ZWltYXJfbmF6aV9nZXJtYW55JyB8fCB3aW5kb3cuY3VycmVudFVuaXRJZCA9PT0gJ2VlZScpIHtcclxuICAgICAgbGV0IHBlcmlvZHMgPSBbXTtcclxuICAgICAgaWYgKHdpbmRvdy5jdXJyZW50VW5pdElkID09PSAnZWRleGNlbF9tZWRpY2luZScpIHtcclxuICAgICAgICBwZXJpb2RzID0gW1xyXG4gICAgICAgICAgeyBpZDogJ21lZGlldmFsJywgdGl0bGU6ICdNZWRpZXZhbCAoYzEyNTAtYzE1MDApJywgcHJlZml4OiAnbGVzc29uXzFfJywgZ3JhZGllbnQ6ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjN2YxZDFkLCAjZGMyNjI2KScsIGJvcmRlcjogJyNkYzI2MjYnLCBpbWFnZTogJ2Fzc2V0cy9iYW5uZXJzL21lZGlldmFsX3Bhbm9fMTc4NDU1MTc5Mjk5My5wbmcnLCBlbnF1aXJ5OiAnSG93IG11Y2ggZGlkIG1lZGljaW5lIHJlYWxseSBjaGFuZ2UgaW4gTWVkaWV2YWwgRW5nbGFuZD8nIH0sXHJcbiAgICAgICAgICB7IGlkOiAncmVuYWlzc2FuY2UnLCB0aXRsZTogJ1JlbmFpc3NhbmNlIChjMTUwMC1jMTcwMCknLCBwcmVmaXg6ICdsZXNzb25fMl8nLCBncmFkaWVudDogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwNjRlM2IsICMwNTk2NjkpJywgYm9yZGVyOiAnIzA1OTY2OScsIGltYWdlOiAnYXNzZXRzL2Jhbm5lcnMvcmVuYWlzc2FuY2VfcGFub18xNzg0NTUxODA0MDY4LnBuZycsIGVucXVpcnk6ICdXaHkgZGlkIHRoZSBNZWRpY2FsIFJlbmFpc3NhbmNlIGhhdmUgc28gbGl0dGxlIGltcGFjdCBvbiBldmVyeWRheSB0cmVhdG1lbnRzPycgfSxcclxuICAgICAgICAgIHsgaWQ6ICcxOHRoXzE5dGgnLCB0aXRsZTogJzE4dGggJiAxOXRoIEMgKGMxNzAwLWMxOTAwKScsIHByZWZpeDogJ2xlc3Nvbl8zXycsIGdyYWRpZW50OiAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzQ3NTU2OSwgI2Q5NzcwNiknLCBib3JkZXI6ICcjZDk3NzA2JywgaW1hZ2U6ICdhc3NldHMvYmFubmVycy9pbmR1c3RyaWFsX3Bhbm9fMTc4NDU1MTgxMzU5OS5wbmcnLCBlbnF1aXJ5OiAnSG93IGRpZCB0aGUgSW5kdXN0cmlhbCBSZXZvbHV0aW9uIHRyYW5zZm9ybSB0aGUgdW5kZXJzdGFuZGluZyBhbmQgcHJldmVudGlvbiBvZiBkaXNlYXNlPycgfSxcclxuICAgICAgICAgIHsgaWQ6ICdtb2Rlcm4nLCB0aXRsZTogJ01vZGVybiAoYzE5MDAtcHJlc2VudCknLCBwcmVmaXg6ICdsZXNzb25fNF8nLCBncmFkaWVudDogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwYzRhNmUsICMwMjg0YzcpJywgYm9yZGVyOiAnIzAyODRjNycsIGltYWdlOiAnYXNzZXRzL2Jhbm5lcnMvbW9kZXJuX3Bhbm9fMTc4NDU1MTgyMjM3My5wbmcnLCBlbnF1aXJ5OiAnSG93IGRpZCB0ZWNobm9sb2d5IGFuZCBnb3Zlcm5tZW50IGludGVydmVudGlvbiByZXZvbHV0aW9uaXplIDIwdGgtY2VudHVyeSBtZWRpY2luZT8nIH0sXHJcbiAgICAgICAgICB7IGlkOiAnd2VzdGVybl9mcm9udCcsIHRpdGxlOiAnV2VzdGVybiBGcm9udCcsIHByZWZpeDogJ2xlc3Nvbl81XycsIGdyYWRpZW50OiAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzQyMjAwNiwgIzY1YTMwZCknLCBib3JkZXI6ICcjNjVhMzBkJywgaW1hZ2U6ICdhc3NldHMvYmFubmVycy93ZXN0ZXJuX2Zyb250X3Bhbm9fMTc4NDU1MTgzMTg4Ny5wbmcnLCBlbnF1aXJ5OiAnSG93IGRpZCB0aGUgaG9ycmlmaWMgY29uZGl0aW9ucyBvZiB0cmVuY2ggd2FyZmFyZSBkcml2ZSByYXBpZCBtZWRpY2FsIGlubm92YXRpb24/JyB9XHJcbiAgICAgICAgXTtcclxuICAgICAgfSBlbHNlIGlmICh3aW5kb3cuY3VycmVudFVuaXRJZCA9PT0gJ2NtZV9uZXcnKSB7XHJcbiAgICAgICAgcGVyaW9kcyA9IFtcclxuICAgICAgICAgIHsgaWQ6ICdLVDEnLCB0aXRsZTogJ0tleSBUb3BpYyAxOiBUaGUgQmlydGggb2YgSXNyYWVsJywgcHJlZml4OiAnS1QxJywgZ3JhZGllbnQ6ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMWUzYThhLCAjM2I4MmY2KScsIGJvcmRlcjogJyMzYjgyZjYnLCBpbWFnZTogJ2Fzc2V0cy9jbWVfbmV3X2t0MV9jb3Zlci5wbmcnLCBlbnF1aXJ5OiAnSG93IGFuZCB3aHkgd2FzIHRoZSBzdGF0ZSBvZiBJc3JhZWwgZXN0YWJsaXNoZWQ/JyB9LFxyXG4gICAgICAgICAgeyBpZDogJ0tUMicsIHRpdGxlOiAnS2V5IFRvcGljIDI6IEVzY2FsYXRpbmcgQ29uZmxpY3QnLCBwcmVmaXg6ICdLVDInLCBncmFkaWVudDogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICM3ZjFkMWQsICNlZjQ0NDQpJywgYm9yZGVyOiAnI2VmNDQ0NCcsIGltYWdlOiAnYXNzZXRzL2NtZV9uZXdfeW9tX2tpcHB1cl9jcm9zc2luZy5wbmcnLCBlbnF1aXJ5OiAnV2hhdCBkcm92ZSB0aGUgbWFqb3IgY29uZmxpY3RzIGluIHRoZSBNaWRkbGUgRWFzdCBmcm9tIDE5NjctMTk3Mz8nIH0sXHJcbiAgICAgICAgICB7IGlkOiAnS1QzJywgdGl0bGU6ICdLZXkgVG9waWMgMzogQXR0ZW1wdHMgYXQgUGVhY2UnLCBwcmVmaXg6ICdLVDMnLCBncmFkaWVudDogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwNjRlM2IsICMxMGI5ODEpJywgYm9yZGVyOiAnIzEwYjk4MScsIGltYWdlOiAnYXNzZXRzL2NtZV9uZXdfY2FtcF9kYXZpZF9hY2NvcmRzLnBuZycsIGVucXVpcnk6ICdXaHkgaGFzIGxhc3RpbmcgcGVhY2UgaW4gdGhlIE1pZGRsZSBFYXN0IGJlZW4gc28gZGlmZmljdWx0IHRvIGFjaGlldmU/JywgYmdQb3M6ICdjZW50ZXIgMjAlJyB9XHJcbiAgICAgICAgXTtcclxuICAgICAgfSBlbHNlIGlmICh3aW5kb3cuY3VycmVudFVuaXRJZCA9PT0gJ3dlaW1hcl9uYXppX2dlcm1hbnknIHx8ICh3aW5kb3cuY3VycmVudFVuaXREYXRhICYmIHdpbmRvdy5jdXJyZW50VW5pdERhdGEudGl0bGUgJiYgd2luZG93LmN1cnJlbnRVbml0RGF0YS50aXRsZS5pbmNsdWRlcygnV2VpbWFyJykpKSB7XHJcbiAgICAgICAgcGVyaW9kcyA9IFtcclxuICAgICAgICAgIHsgaWQ6ICdLVDEnLCB0aXRsZTogJ0tleSBUb3BpYyAxOiBUaGUgV2VpbWFyIFJlcHVibGljICgxOTE4LTI5KScsIHByZWZpeDogJ2xlc3Nvbl8xXycsIGdyYWRpZW50OiAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzFlM2E4YSwgIzNiODJmNiknLCBib3JkZXI6ICcjM2I4MmY2JywgaW1hZ2U6ICdhc3NldHMvYmFubmVycy9rdDFfd2VpbWFyX2Jhbm5lci5wbmcnLCBlbnF1aXJ5OiAnVG8gd2hhdCBleHRlbnQgZGlkIHRoZSBXZWltYXIgUmVwdWJsaWMgcmVjb3ZlciBmcm9tIGl0cyBlYXJseSBjcmlzZXM/JyB9LFxyXG4gICAgICAgICAgeyBpZDogJ0tUMicsIHRpdGxlOiBcIktleSBUb3BpYyAyOiBIaXRsZXIncyBSaXNlIHRvIFBvd2VyLCAxOTE5LTMzXCIsIHByZWZpeDogJ2xlc3Nvbl8yXycsIGdyYWRpZW50OiAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzdmMWQxZCwgI2RjMjYyNiknLCBib3JkZXI6ICcjZGMyNjI2JywgaW1hZ2U6ICdhc3NldHMvYmFubmVycy9rdDJfd2VpbWFyX2Jhbm5lci5wbmcnLCBlbnF1aXJ5OiAnSG93IGRpZCBhIHRpbnkgb2JzY3VyZSBwb2xpdGljYWwgZ3JvdXAgdHJhbnNmb3JtPycgfSxcclxuICAgICAgICAgIHsgaWQ6ICdLVDMnLCB0aXRsZTogXCJLZXkgVG9waWMgMzogTmF6aSBDb250cm9sIGFuZCBEaWN0YXRvcnNoaXBcIiwgcHJlZml4OiAnbGVzc29uXzNfJywgZ3JhZGllbnQ6ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNGI1NTYzLCAjMWYyOTM3KScsIGJvcmRlcjogJyMxZjI5MzcnLCBpbWFnZTogJ2Fzc2V0cy9iYW5uZXJzL2t0M193ZWltYXJfYmFubmVyLnBuZycsIGVucXVpcnk6ICdGcm9tIGNoYWlucyB0byBhYnNvbHV0ZSBjb250cm9sJyB9LFxyXG4gICAgICAgICAgeyBpZDogJ0tUNCcsIHRpdGxlOiBcIktleSBUb3BpYyA0OiBMaWZlIGluIE5hemkgR2VybWFueSwgMTkzMy0zOVwiLCBwcmVmaXg6ICdsZXNzb25fNF8nLCBncmFkaWVudDogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICM0ZDdjMGYsICM2NWEzMGQpJywgYm9yZGVyOiAnIzY1YTMwZCcsIGltYWdlOiAnYXNzZXRzL2Jhbm5lcnMva3Q0X3dlaW1hcl9iYW5uZXIucG5nJywgZW5xdWlyeTogJ0RpZCBsaWZlIGltcHJvdmUgdW5kZXIgdGhlIE5hemlzPycgfVxyXG4gICAgICAgIF07XHJcbiAgICAgIH0gZWxzZSBpZiAod2luZG93LmN1cnJlbnRVbml0SWQgPT09ICdlZWUnIHx8ICh3aW5kb3cuY3VycmVudFVuaXREYXRhICYmIHdpbmRvdy5jdXJyZW50VW5pdERhdGEudGl0bGUgJiYgd2luZG93LmN1cnJlbnRVbml0RGF0YS50aXRsZS5pbmNsdWRlcygnRWxpemFiZXRoJykpKSB7XHJcbiAgICAgICAgcGVyaW9kcyA9IFtcclxuICAgICAgICAgIHsgaWQ6ICdLVDEnLCB0aXRsZTogJ0tleSBUb3BpYyAxOiBRdWVlbiwgZ292ZXJubWVudCBhbmQgcmVsaWdpb24sIDE1NTgtNjknLCBwcmVmaXg6ICdsZXNzb25fMV8nLCBncmFkaWVudDogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICMxZTNhOGEsICMzYjgyZjYpJywgYm9yZGVyOiAnIzNiODJmNicsIGltYWdlOiAnYXNzZXRzL3BsYWNlaG9sZGVyX2NvdmVyLmpwZycsIGVucXVpcnk6ICdGcm9tIHJlbGlnaW91cyBkaXZpc2lvbiB0byB0aGUgQXJtYWRhOiBIb3cgZGlkIEVsaXphYmV0aCBzZWN1cmUgaGVyIHRocm9uZT8nIH0sXHJcbiAgICAgICAgICB7IGlkOiAnS1QyJywgdGl0bGU6IFwiS2V5IFRvcGljIDI6IENoYWxsZW5nZXMgdG8gRWxpemFiZXRoIGF0IGhvbWUgYW5kIGFicm9hZCwgMTU2OS04OFwiLCBwcmVmaXg6ICdsZXNzb25fMl8nLCBncmFkaWVudDogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICM3ZjFkMWQsICNkYzI2MjYpJywgYm9yZGVyOiAnI2RjMjYyNicsIGltYWdlOiAnYXNzZXRzL3BsYWNlaG9sZGVyX2NvdmVyLmpwZycsIGVucXVpcnk6ICdXaHkgZGlkIHBsb3RzIGFuZCBmb3JlaWduIHRocmVhdHMgcHVzaCBFbGl6YWJldGggdG93YXJkcyB3YXI/JyB9LFxyXG4gICAgICAgICAgeyBpZDogJ0tUMycsIHRpdGxlOiBcIktleSBUb3BpYyAzOiBFbGl6YWJldGhhbiBzb2NpZXR5IGluIHRoZSBBZ2Ugb2YgRXhwbG9yYXRpb24sIDE1NTgtODhcIiwgcHJlZml4OiAnbGVzc29uXzNfJywgZ3JhZGllbnQ6ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNGI1NTYzLCAjMWYyOTM3KScsIGJvcmRlcjogJyMxZjI5MzcnLCBpbWFnZTogJ2Fzc2V0cy9wbGFjZWhvbGRlcl9jb3Zlci5qcGcnLCBlbnF1aXJ5OiAnV2hhdCB3YXMgbGlmZSBsaWtlIGR1cmluZyB0aGUgRWxpemFiZXRoYW4gR29sZGVuIEFnZT8nIH1cclxuICAgICAgICBdO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBwZXJpb2RzLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgbGVzc29uc0hUTUwgKz0gYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInByZW1pdW0tYmFubmVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmVtaXVtLWJhbm5lci1iZ1wiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCcke3AuaW1hZ2V9Jyk7IGJhY2tncm91bmQtcG9zaXRpb246ICR7cC5iZ1BvcyB8fCAnY2VudGVyJ307XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmVtaXVtLWJhbm5lci1vdmVybGF5LTFcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByZW1pdW0tYmFubmVyLW92ZXJsYXktMlwiIHN0eWxlPVwiYmFja2dyb3VuZDogJHtwLmdyYWRpZW50fTtcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByZW1pdW0tYmFubmVyLWdsb3dcIiBzdHlsZT1cImJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChjaXJjbGUsICR7cC5ib3JkZXJ9IDAlLCB0cmFuc3BhcmVudCA3MCUpO1wiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJlbWl1bS1iYW5uZXItY29udGVudFwiIHN0eWxlPVwiYm9yZGVyLWxlZnQ6IDZweCBzb2xpZCAke3AuYm9yZGVyfTtcIj5cclxuICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcmVtaXVtLWJhbm5lci10aXRsZVwiPiR7cC50aXRsZX08L2gzPlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJlbWl1bS1iYW5uZXItZW5xdWlyeVwiPiR7cC5lbnF1aXJ5fTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgICAgIGxlc3NvbnNIVE1MICs9ICc8ZGl2IHN0eWxlPVwiZGlzcGxheTogZ3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maWxsLCBtaW5tYXgoMjIwcHgsIDFmcikpOyBnYXA6IDIwcHg7IHRleHQtYWxpZ246IGxlZnQ7XCI+JztcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZm91bmRBbnkgPSBmYWxzZTtcclxuICAgICAgICB1bml0RGF0YS5sZXNzb25zLmZvckVhY2goKGxlc3NvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGlmICgobGVzc29uLmlkICYmIGxlc3Nvbi5pZC5zdGFydHNXaXRoKHAucHJlZml4KSkgfHwgKGxlc3Nvbi50aXRsZSAmJiBsZXNzb24udGl0bGUuc3RhcnRzV2l0aChwLnByZWZpeCkpKSB7XHJcbiAgICAgICAgICAgIGZvdW5kQW55ID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGVzc29uc0hUTUwgKz0gYFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob21lcGFnZS1sZXNzb24tY2FyZFwiIGRhdGEtaW5kZXg9XCIke2luZGV4fVwiIHN0eWxlPVwiYmFja2dyb3VuZDogd2hpdGU7IGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7IGJvcmRlci1sZWZ0OiA1cHggc29saWQgJHtwLmJvcmRlcn07IGJvcmRlci1yYWRpdXM6IDhweDsgcGFkZGluZzogMTJweCAxNXB4OyBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLDAsMCwwLjA1KTsgY3Vyc29yOiBwb2ludGVyOyB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1wiIG9ubW91c2VvdmVyPVwidGhpcy5zdHlsZS50cmFuc2Zvcm09J3RyYW5zbGF0ZVkoLTNweCknOyB0aGlzLnN0eWxlLmJveFNoYWRvdz0nMCA4cHggMTVweCByZ2JhKDAsMCwwLDAuMSknO1wiIG9ubW91c2VvdXQ9XCJ0aGlzLnN0eWxlLnRyYW5zZm9ybT0ndHJhbnNsYXRlWSgwKSc7IHRoaXMuc3R5bGUuYm94U2hhZG93PScwIDJweCA0cHggcmdiYSgwLDAsMCwwLjA1KSc7XCI+XHJcbiAgICAgICAgICAgICAgICA8aDMgc3R5bGU9XCJtYXJnaW4tdG9wOiAwOyBjb2xvcjogIzFhMjM3ZTsgZm9udC1zaXplOiAxcmVtOyBtYXJnaW4tYm90dG9tOiA1cHg7IGZvbnQtZmFtaWx5OiAnT3V0Zml0Jywgc2Fucy1zZXJpZjtcIj5MZXNzb24gJHtpbmRleCArIDF9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxwIHN0eWxlPVwibWFyZ2luOiAwOyBjb2xvcjogIzQ3NTU2OTsgZm9udC13ZWlnaHQ6IDUwMDsgZm9udC1zaXplOiAwLjlyZW07IGxpbmUtaGVpZ2h0OiAxLjM7XCI+JHtsZXNzb24udGl0bGUucmVwbGFjZSgvXFxcXCpcXFxcKiguKj8pXFxcXCpcXFxcKi9nLCAnPHN0cm9uZz4kMTwvc3Ryb25nPicpfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBBREQgV09SS0JPT0sgRk9SIFRISVMgUEVSSU9EXHJcbiAgICAgICAgbGVzc29uc0hUTUwgKz0gYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImhvbWVwYWdlLWxlc3Nvbi1jYXJkXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZjhmYWZjOyBib3JkZXI6IDJweCBkYXNoZWQgJHtwLmJvcmRlcn07IGJvcmRlci1yYWRpdXM6IDhweDsgcGFkZGluZzogMTJweCAxNXB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IGN1cnNvcjogcG9pbnRlcjsgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGFsaWduLWl0ZW1zOiBjZW50ZXI7XCIgb25jbGljaz1cIndpbmRvdy5vcGVuKCcvdW5pdHMvJHt3aW5kb3cuY3VycmVudFVuaXRJZH0vd29ya2Jvb2tfJHtwLmlkfS5odG1sJywgJ19ibGFuaycpXCIgb25tb3VzZW92ZXI9XCJ0aGlzLnN0eWxlLmJhY2tncm91bmQ9J3doaXRlJzsgdGhpcy5zdHlsZS50cmFuc2Zvcm09J3RyYW5zbGF0ZVkoLTNweCknOyB0aGlzLnN0eWxlLmJveFNoYWRvdz0nMCA4cHggMTVweCByZ2JhKDAsMCwwLDAuMSknO1wiIG9ubW91c2VvdXQ9XCJ0aGlzLnN0eWxlLmJhY2tncm91bmQ9JyNmOGZhZmMnOyB0aGlzLnN0eWxlLnRyYW5zZm9ybT0ndHJhbnNsYXRlWSgwKSc7IHRoaXMuc3R5bGUuYm94U2hhZG93PSdub25lJztcIj5cclxuICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtYm9vay1vcGVuXCIgc3R5bGU9XCJmb250LXNpemU6IDEuMnJlbTsgY29sb3I6ICR7cC5ib3JkZXJ9OyBtYXJnaW4tYm90dG9tOiA2cHg7XCI+PC9pPlxyXG4gICAgICAgICAgICAgPGgzIHN0eWxlPVwibWFyZ2luOiAwOyBjb2xvcjogIzMzNDE1NTsgZm9udC1zaXplOiAwLjlyZW07XCI+V29ya2Jvb2s6ICR7cC50aXRsZX08L2gzPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBBREQgTUFTVEVSWSBQQUNLIEZPUiBUSElTIFBFUklPRFxyXG4gICAgICAgIGxlc3NvbnNIVE1MICs9IGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJob21lcGFnZS1sZXNzb24tY2FyZFwiIHN0eWxlPVwiYmFja2dyb3VuZDogI2ZmZjBmMjsgYm9yZGVyOiAycHggZGFzaGVkICNkMzJmMmY7IGJvcmRlci1yYWRpdXM6IDhweDsgcGFkZGluZzogMTJweCAxNXB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IGN1cnNvcjogcG9pbnRlcjsgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGFsaWduLWl0ZW1zOiBjZW50ZXI7XCIgb25jbGljaz1cIndpbmRvdy5vcGVuKCcvdW5pdHMvJHt3aW5kb3cuY3VycmVudFVuaXRJZH0vbWFzdGVyeV9wYWNrXyR7cC5pZH0uaHRtbCcsICdfYmxhbmsnKVwiIG9ubW91c2VvdmVyPVwidGhpcy5zdHlsZS5iYWNrZ3JvdW5kPSd3aGl0ZSc7IHRoaXMuc3R5bGUudHJhbnNmb3JtPSd0cmFuc2xhdGVZKC0zcHgpJzsgdGhpcy5zdHlsZS5ib3hTaGFkb3c9JzAgOHB4IDE1cHggcmdiYSgwLDAsMCwwLjEpJztcIiBvbm1vdXNlb3V0PVwidGhpcy5zdHlsZS5iYWNrZ3JvdW5kPScjZmZmMGYyJzsgdGhpcy5zdHlsZS50cmFuc2Zvcm09J3RyYW5zbGF0ZVkoMCknOyB0aGlzLnN0eWxlLmJveFNoYWRvdz0nbm9uZSc7XCI+XHJcbiAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXNoaWVsZC1oYWx2ZWRcIiBzdHlsZT1cImZvbnQtc2l6ZTogMS4ycmVtOyBjb2xvcjogI2QzMmYyZjsgbWFyZ2luLWJvdHRvbTogNnB4O1wiPjwvaT5cclxuICAgICAgICAgICAgIDxoMyBzdHlsZT1cIm1hcmdpbjogMDsgY29sb3I6ICNkMzJmMmY7IGZvbnQtc2l6ZTogMC45cmVtO1wiPk1hc3RlcnkgUGFjazogJHtwLnRpdGxlfTwvaDM+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBpZiAoIWZvdW5kQW55KSB7XHJcbiAgICAgICAgICAgbGVzc29uc0hUTUwgKz0gYDxwIHN0eWxlPVwiY29sb3I6ICM2NDc0OGI7IGZvbnQtc3R5bGU6IGl0YWxpYzsgbWFyZ2luLWxlZnQ6IDEwcHg7XCI+Tm8gbGVzc29ucyBmb3VuZCBmb3IgdGhpcyBwZXJpb2QuPC9wPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxlc3NvbnNIVE1MICs9ICc8L2Rpdj4nO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxlc3NvbnNIVE1MID0gJzxkaXYgc3R5bGU9XCJkaXNwbGF5OiBncmlkOyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgyNTBweCwgMWZyKSk7IGdhcDogMjBweDsgbWFyZ2luLXRvcDogNDBweDsgdGV4dC1hbGlnbjogbGVmdDtcIj4nO1xyXG4gICAgICB1bml0RGF0YS5sZXNzb25zLmZvckVhY2goKGxlc3NvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXNzb25zSFRNTCArPSBgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG9tZXBhZ2UtbGVzc29uLWNhcmRcIiBkYXRhLWluZGV4PVwiJHtpbmRleH1cIiBzdHlsZT1cImJhY2tncm91bmQ6IHdoaXRlOyBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwOyBib3JkZXItcmFkaXVzOiA4cHg7IHBhZGRpbmc6IDIwcHg7IGJveC1zaGFkb3c6IDAgNHB4IDZweCByZ2JhKDAsMCwwLDAuMDUpOyBjdXJzb3I6IHBvaW50ZXI7IHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzLCBib3gtc2hhZG93IDAuMnM7XCI+XHJcbiAgICAgICAgICAgIDxoMyBzdHlsZT1cIm1hcmdpbi10b3A6IDA7IGNvbG9yOiAjMWEyMzdlOyBmb250LXNpemU6IDEuMXJlbTsgbWFyZ2luLWJvdHRvbTogMTBweDtcIj5MZXNzb24gJHtpbmRleCArIDF9PC9oMz5cclxuICAgICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW46IDA7IGNvbG9yOiAjNDc1NTY5OyBmb250LXdlaWdodDogNTAwOyBmb250LXNpemU6IDAuOTVyZW07XCI+JHtsZXNzb24udGl0bGV9PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuICAgICAgfSk7XHJcbiAgICAgIGxlc3NvbnNIVE1MICs9ICc8L2Rpdj4nO1xyXG4gICAgICBcclxuXHJcbiAgICAgIGlmICh1bml0RGF0YS5tb2NrX2V4YW1zICYmIEFycmF5LmlzQXJyYXkodW5pdERhdGEubW9ja19leGFtcykgJiYgdW5pdERhdGEubW9ja19leGFtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbGVzc29uc0hUTUwgKz0gJzxoMiBzdHlsZT1cIm1hcmdpbi10b3A6IDQwcHg7IHRleHQtYWxpZ246IGxlZnQ7IGNvbG9yOiAjMGYxNzJhOyBib3JkZXItYm90dG9tOiAycHggc29saWQgI2UyZThmMDsgcGFkZGluZy1ib3R0b206IDEwcHg7XCI+TW9jayBFeGFtczwvaDI+JztcclxuICAgICAgICBsZXNzb25zSFRNTCArPSAnPGRpdiBzdHlsZT1cImRpc3BsYXk6IGdyaWQ7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZmlsbCwgbWlubWF4KDI1MHB4LCAxZnIpKTsgZ2FwOiAyMHB4OyBtYXJnaW4tdG9wOiAyMHB4OyB0ZXh0LWFsaWduOiBsZWZ0O1wiPic7XHJcbiAgICAgICAgdW5pdERhdGEubW9ja19leGFtcy5mb3JFYWNoKG1vY2sgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbW9ja1VybCA9IHdpbmRvdy5jdXJyZW50VW5pdElkID8gYC91bml0cy8ke3dpbmRvdy5jdXJyZW50VW5pdElkfS8ke21vY2sudXJsfWAgOiBtb2NrLnVybDtcclxuICAgICAgICAgIGxlc3NvbnNIVE1MICs9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhvbWVwYWdlLWxlc3Nvbi1jYXJkXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZmRmMmY4OyBib3JkZXI6IDJweCBkYXNoZWQgI2RiMjc3NzsgYm9yZGVyLXJhZGl1czogOHB4OyBwYWRkaW5nOiAxNXB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IGN1cnNvcjogcG9pbnRlcjsgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGFsaWduLWl0ZW1zOiBjZW50ZXI7XCIgb25jbGljaz1cIndpbmRvdy5vcGVuKCcke21vY2tVcmx9JywgJ19ibGFuaycpXCIgb25tb3VzZW92ZXI9XCJ0aGlzLnN0eWxlLmJhY2tncm91bmQ9J3doaXRlJzsgdGhpcy5zdHlsZS50cmFuc2Zvcm09J3RyYW5zbGF0ZVkoLTNweCknOyB0aGlzLnN0eWxlLmJveFNoYWRvdz0nMCA4cHggMTVweCByZ2JhKDAsMCwwLDAuMSknO1wiIG9ubW91c2VvdXQ9XCJ0aGlzLnN0eWxlLmJhY2tncm91bmQ9JyNmZGYyZjgnOyB0aGlzLnN0eWxlLnRyYW5zZm9ybT0ndHJhbnNsYXRlWSgwKSc7IHRoaXMuc3R5bGUuYm94U2hhZG93PSdub25lJztcIj5cclxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWZpbGUtc2lnbmF0dXJlIGZhLTJ4XCIgc3R5bGU9XCJjb2xvcjogI2RiMjc3NzsgbWFyZ2luLWJvdHRvbTogMTBweDtcIj48L2k+XHJcbiAgICAgICAgICAgICAgPGgzIHN0eWxlPVwibWFyZ2luOiAwOyBjb2xvcjogIzMzNDE1NTsgZm9udC1zaXplOiAwLjlyZW07XCI+JHttb2NrLnRpdGxlfTwvaDM+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgYDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXNzb25zSFRNTCArPSAnPC9kaXY+JztcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHVuaXREYXRhLnByaW50YWJsZV93b3JrYm9va3MgJiYgdW5pdERhdGEucHJpbnRhYmxlX3dvcmtib29rcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbGVzc29uc0hUTUwgKz0gJzxoMiBzdHlsZT1cIm1hcmdpbi10b3A6IDQwcHg7IHRleHQtYWxpZ246IGxlZnQ7IGNvbG9yOiAjMGYxNzJhOyBib3JkZXItYm90dG9tOiAycHggc29saWQgI2UyZThmMDsgcGFkZGluZy1ib3R0b206IDEwcHg7XCI+UHJpbnRhYmxlIFdvcmtib29rczwvaDI+JztcclxuICAgICAgICBsZXNzb25zSFRNTCArPSAnPGRpdiBzdHlsZT1cImRpc3BsYXk6IGdyaWQ7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZmlsbCwgbWlubWF4KDI1MHB4LCAxZnIpKTsgZ2FwOiAyMHB4OyBtYXJnaW4tdG9wOiAyMHB4OyB0ZXh0LWFsaWduOiBsZWZ0O1wiPic7XHJcbiAgICAgICAgdW5pdERhdGEucHJpbnRhYmxlX3dvcmtib29rcy5mb3JFYWNoKHdiID0+IHtcclxuICAgICAgICAgIGNvbnN0IHdiVXJsID0gd2luZG93LmN1cnJlbnRVbml0SWQgPyBgL3VuaXRzLyR7d2luZG93LmN1cnJlbnRVbml0SWR9LyR7d2IudXJsfWAgOiB3Yi51cmw7XHJcbiAgICAgICAgICBsZXNzb25zSFRNTCArPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob21lcGFnZS1sZXNzb24tY2FyZFwiIHN0eWxlPVwiYmFja2dyb3VuZDogI2Y4ZmFmYzsgYm9yZGVyOiAycHggZGFzaGVkICMzYjgyZjY7IGJvcmRlci1yYWRpdXM6IDhweDsgcGFkZGluZzogMTVweDsgdGV4dC1hbGlnbjogY2VudGVyOyBjdXJzb3I6IHBvaW50ZXI7IHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGp1c3RpZnktY29udGVudDogY2VudGVyOyBhbGlnbi1pdGVtczogY2VudGVyO1wiIG9uY2xpY2s9XCJ3aW5kb3cub3BlbignJHt3YlVybH0nLCAnX2JsYW5rJylcIiBvbm1vdXNlb3Zlcj1cInRoaXMuc3R5bGUuYmFja2dyb3VuZD0nd2hpdGUnOyB0aGlzLnN0eWxlLnRyYW5zZm9ybT0ndHJhbnNsYXRlWSgtM3B4KSc7IHRoaXMuc3R5bGUuYm94U2hhZG93PScwIDhweCAxNXB4IHJnYmEoMCwwLDAsMC4xKSc7XCIgb25tb3VzZW91dD1cInRoaXMuc3R5bGUuYmFja2dyb3VuZD0nI2Y4ZmFmYyc7IHRoaXMuc3R5bGUudHJhbnNmb3JtPSd0cmFuc2xhdGVZKDApJzsgdGhpcy5zdHlsZS5ib3hTaGFkb3c9J25vbmUnO1wiPlxyXG4gICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWJvb2stb3BlblwiIHN0eWxlPVwiZm9udC1zaXplOiAxLjVyZW07IGNvbG9yOiAjM2I4MmY2OyBtYXJnaW4tYm90dG9tOiAxMHB4O1wiPjwvaT5cclxuICAgICAgICAgICAgICAgPGgzIHN0eWxlPVwibWFyZ2luOiAwOyBjb2xvcjogIzMzNDE1NTsgZm9udC1zaXplOiAxLjFyZW07XCI+JHt3Yi50aXRsZX08L2gzPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIGA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGVzc29uc0hUTUwgKz0gJzwvZGl2Pic7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGNvbnRlbnRBcmVhLmlubmVySFRNTCA9IGBcclxuICAgICAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgcGFkZGluZy1ib3R0b206IDUwcHg7XCI+XHJcbiAgICAgICAgPGgxIHN0eWxlPVwiZm9udC1mYW1pbHk6ICdQbGF5ZmFpciBEaXNwbGF5Jywgc2VyaWY7IGZvbnQtc2l6ZTogMi44cmVtOyBjb2xvcjogIzFhMjM3ZTsgbWFyZ2luLWJvdHRvbTogMTBweDsgbGluZS1oZWlnaHQ6IDEuMjtcIj4ke3VuaXREYXRhLmVucXVpcnlfcXVlc3Rpb24gfHwgdW5pdERhdGEuZW5xdWlyeSB8fCAnVW5pdCBFbnF1aXJ5J308L2gxPlxyXG4gICAgICAgIDxoMiBzdHlsZT1cImZvbnQtc2l6ZTogMS40cmVtOyBjb2xvcjogIzQ3NTU2OTsgZm9udC13ZWlnaHQ6IDUwMDsgbWFyZ2luLXRvcDogMDsgbWFyZ2luLWJvdHRvbTogMzBweDtcIj5cclxuICAgICAgICAgICR7dW5pdERhdGEudGl0bGV9XHJcbiAgICAgICAgPC9oMj5cclxuICAgICAgICBcclxuICAgICAgICAke0FycmF5LmlzQXJyYXkodW5pdERhdGEuY292ZXJfaW1hZ2UpID8gYFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGdhcDogMTVweDsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IG1hcmdpbi1ib3R0b206IDIwcHg7XCI+XHJcbiAgICAgICAgICAgICR7dW5pdERhdGEuY292ZXJfaW1hZ2UubWFwKGltZyA9PiBgXHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImJvcmRlci1yYWRpdXM6IDEycHg7IG92ZXJmbG93OiBoaWRkZW47IGJveC1zaGFkb3c6IDAgMTBweCAyNXB4IHJnYmEoMCwwLDAsMC4xKTsgYm9yZGVyOiA0cHggc29saWQgd2hpdGU7IGZsZXg6IDE7IG1heC1oZWlnaHQ6IDQwMHB4OyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgYmFja2dyb3VuZDogIzBmMTcyYTtcIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtnZXRBc3NldFVybChpbWcpfVwiIGFsdD1cIlVuaXQgQ292ZXJcIiBzdHlsZT1cIm1heC13aWR0aDogMTAwJTsgbWF4LWhlaWdodDogMTAwJTsgb2JqZWN0LWZpdDogY29udGFpbjsgZGlzcGxheTogYmxvY2s7XCI+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCA6ICh1bml0RGF0YS5jb3Zlcl9pbWFnZSA/IGBcclxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJib3JkZXItcmFkaXVzOiAxMnB4OyBvdmVyZmxvdzogaGlkZGVuOyBib3gtc2hhZG93OiAwIDEwcHggMjVweCByZ2JhKDAsMCwwLDAuMSk7IGJvcmRlcjogNHB4IHNvbGlkIHdoaXRlOyBkaXNwbGF5OiBibG9jazsgbWFyZ2luOiAwIGF1dG8gNXB4IGF1dG87IG1heC13aWR0aDogMzMlO1wiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cIiR7Z2V0QXNzZXRVcmwodW5pdERhdGEuY292ZXJfaW1hZ2UpfVwiIGFsdD1cIlVuaXQgQ292ZXJcIiBzdHlsZT1cIm1heC13aWR0aDogMTAwJTsgaGVpZ2h0OiBhdXRvOyBkaXNwbGF5OiBibG9jazsgbWF4LWhlaWdodDogNDAwcHg7IG1hcmdpbjogMCBhdXRvO1wiPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCA6ICcnKX1cclxuICAgICAgICBcclxuICAgICAgICAke3VuaXREYXRhLmNvdmVyX2NhcHRpb24gPyBgPHAgc3R5bGU9XCJtYXJnaW4tdG9wOiA1cHg7IG1hcmdpbi1ib3R0b206IDIwcHg7IGZvbnQtc3R5bGU6IGl0YWxpYzsgY29sb3I6ICM2NDc0OGI7IGZvbnQtc2l6ZTogMC45NXJlbTsgdGV4dC1hbGlnbjogY2VudGVyOyBtYXgtd2lkdGg6IDgwMHB4OyBtYXJnaW4tbGVmdDogYXV0bzsgbWFyZ2luLXJpZ2h0OiBhdXRvO1wiPiR7dW5pdERhdGEuY292ZXJfY2FwdGlvbn08L3A+YCA6ICcnfVxyXG4gICAgICAgIFxyXG4gICAgICAgIDxoMiBzdHlsZT1cIm1hcmdpbi10b3A6IDQwcHg7IHRleHQtYWxpZ246IGxlZnQ7IGNvbG9yOiAjMGYxNzJhOyBib3JkZXItYm90dG9tOiAycHggc29saWQgI2UyZThmMDsgcGFkZGluZy1ib3R0b206IDEwcHg7XCI+S2V5IFRvcGljIExlc3NvbnM8L2gyPlxyXG4gICAgICAgICR7bGVzc29uc0hUTUx9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICA8L2Rpdj5cclxuICAgIGA7XHJcblxyXG4gICAgLy8gQWRkIGNsaWNrIGxpc3RlbmVycyB0byBjYXJkc1xyXG4gICAgY29uc3QgY2FyZHMgPSBjb250ZW50QXJlYS5xdWVyeVNlbGVjdG9yQWxsKCcuaG9tZXBhZ2UtbGVzc29uLWNhcmQnKTtcclxuICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XHJcbiAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xyXG4gICAgICAgIGNhcmQuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoLTNweCknO1xyXG4gICAgICAgIGNhcmQuc3R5bGUuYm94U2hhZG93ID0gJzAgOHB4IDE1cHggcmdiYSgwLDAsMCwwLjEpJztcclxuICAgICAgfSk7XHJcbiAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgY2FyZC5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSc7XHJcbiAgICAgICAgY2FyZC5zdHlsZS5ib3hTaGFkb3cgPSAnMCA0cHggNnB4IHJnYmEoMCwwLDAsMC4wNSknO1xyXG4gICAgICB9KTtcclxuICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBjb25zdCBpZHggPSBwYXJzZUludChjYXJkLmRhdGFzZXQuaW5kZXgpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sZXNzb24tbGluaycpLmZvckVhY2gobCA9PiBsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICByZW5kZXJMZXNzb24odW5pdERhdGEubGVzc29uc1tpZHhdKTtcclxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDAsIGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlckV4YW1HdWlkZSgpIHtcclxuICAgIGNvbnRlbnRBcmVhLmlubmVySFRNTCA9ICcnO1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb250YWluZXIuY2xhc3NOYW1lID0gJ2Rhc2hib2FyZC1jb250YWluZXInO1xyXG4gICAgXHJcbiAgICBsZXQgY29udGVudEh0bWwgPSAnJztcclxuICAgIGlmICh1bml0RGF0YS50aXRsZSAmJiB1bml0RGF0YS50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdtZWRpY2luZScpKSB7XHJcbiAgICAgIGNvbnRlbnRIdG1sID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWxjb21lLWJhbm5lclwiIHN0eWxlPVwiYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzFhMjM3ZSAwJSwgIzBkNDdhMSAxMDAlKTsgcGFkZGluZzogNDBweDsgYm9yZGVyLXJhZGl1czogOHB4OyBtYXJnaW4tYm90dG9tOiAyMHB4O1wiPlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGgxIGNsYXNzPVwid2VsY29tZS10aXRsZVwiIHN0eWxlPVwiY29sb3I6ICNmZmZmZmY7IG1hcmdpbi10b3A6IDA7IG1hcmdpbi1ib3R0b206IDEwcHg7XCI+RXhhbSBNYXN0ZXJjbGFzcyBHdWlkZTwvaDE+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwid2VsY29tZS1zdWJ0aXRsZVwiIHN0eWxlPVwiY29sb3I6ICNlMmU4ZjA7IGZvbnQtc2l6ZTogMS4xNXJlbTsgbWFyZ2luOiAwO1wiPlRoZSBQZWFyc29uIEVkZXhjZWwgR0NTRSAoOS0xKSBIaXN0b3J5IFBhcGVyIDE8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogI2ZmZjsgcGFkZGluZzogMzBweDsgYm9yZGVyLXJhZGl1czogOHB4OyBib3gtc2hhZG93OiAwIDRweCAxNXB4IHJnYmEoMCwwLDAsMC4wNSk7IG1hcmdpbi10b3A6IDMwcHg7XCI+XHJcbiAgICAgICAgICAke3NlY3Rpb25BR3VpZGV9XHJcbiAgICAgICAgICAke3NlY3Rpb25CR3VpZGV9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGA7XHJcbiAgICB9IGVsc2UgaWYgKHVuaXREYXRhLnRpdGxlICYmIHVuaXREYXRhLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ21pZGRsZSBlYXN0JykpIHtcclxuICAgICAgY29udGVudEh0bWwgPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIndlbGNvbWUtYmFubmVyXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjN2YxZDFkIDAlLCAjOTkxYjFiIDEwMCUpOyBwYWRkaW5nOiA0MHB4OyBib3JkZXItcmFkaXVzOiA4cHg7IG1hcmdpbi1ib3R0b206IDIwcHg7XCI+XHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8aDEgY2xhc3M9XCJ3ZWxjb21lLXRpdGxlXCIgc3R5bGU9XCJjb2xvcjogI2ZmZmZmZjsgbWFyZ2luLXRvcDogMDsgbWFyZ2luLWJvdHRvbTogMTBweDtcIj5FeGFtIE1hc3RlcmNsYXNzIEd1aWRlPC9oMT5cclxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ3ZWxjb21lLXN1YnRpdGxlXCIgc3R5bGU9XCJjb2xvcjogI2ZlY2FjYTsgZm9udC1zaXplOiAxLjE1cmVtOyBtYXJnaW46IDA7XCI+VGhlIFBlYXJzb24gRWRleGNlbCBHQ1NFICg5LTEpIEhpc3RvcnkgUGFwZXIgMjwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZmZmOyBwYWRkaW5nOiAzMHB4OyBib3JkZXItcmFkaXVzOiA4cHg7IGJveC1zaGFkb3c6IDAgNHB4IDE1cHggcmdiYSgwLDAsMCwwLjA1KTsgbWFyZ2luLXRvcDogMzBweDtcIj5cclxuICAgICAgICAgICR7bWlkZGxlRWFzdEd1aWRlfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgO1xyXG4gICAgfSBlbHNlIGlmICh1bml0RGF0YS50aXRsZSAmJiAodW5pdERhdGEudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnd2VpbWFyJykgfHwgdW5pdERhdGEudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnZ2VybWFueScpKSkge1xyXG4gICAgICBjb250ZW50SHRtbCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwid2VsY29tZS1iYW5uZXJcIiBzdHlsZT1cImJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMzMzQxNTUgMCUsICMwZjE3MmEgMTAwJSk7IHBhZGRpbmc6IDQwcHg7IGJvcmRlci1yYWRpdXM6IDhweDsgbWFyZ2luLWJvdHRvbTogMjBweDtcIj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxoMSBjbGFzcz1cIndlbGNvbWUtdGl0bGVcIiBzdHlsZT1cImNvbG9yOiAjZmZmZmZmOyBtYXJnaW4tdG9wOiAwOyBtYXJnaW4tYm90dG9tOiAxMHB4O1wiPkV4YW0gTWFzdGVyY2xhc3MgR3VpZGU8L2gxPlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cIndlbGNvbWUtc3VidGl0bGVcIiBzdHlsZT1cImNvbG9yOiAjY2JkNWUxOyBmb250LXNpemU6IDEuMTVyZW07IG1hcmdpbjogMDtcIj5UaGUgUGVhcnNvbiBFZGV4Y2VsIEdDU0UgKDktMSkgSGlzdG9yeSBQYXBlciAzPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6ICNmZmY7IHBhZGRpbmc6IDMwcHg7IGJvcmRlci1yYWRpdXM6IDhweDsgYm94LXNoYWRvdzogMCA0cHggMTVweCByZ2JhKDAsMCwwLDAuMDUpOyBtYXJnaW4tdG9wOiAzMHB4O1wiPlxyXG4gICAgICAgICAgJHt3ZWltYXJHdWlkZX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnRlbnRIdG1sID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWxjb21lLWJhbm5lclwiIHN0eWxlPVwiYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzFhMjM3ZSAwJSwgIzBkNDdhMSAxMDAlKTsgcGFkZGluZzogNDBweDsgYm9yZGVyLXJhZGl1czogOHB4OyBtYXJnaW4tYm90dG9tOiAyMHB4O1wiPlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGgxIGNsYXNzPVwid2VsY29tZS10aXRsZVwiIHN0eWxlPVwiY29sb3I6ICNmZmZmZmY7IG1hcmdpbi10b3A6IDA7IG1hcmdpbi1ib3R0b206IDEwcHg7XCI+RXhhbSBNYXN0ZXJjbGFzcyBHdWlkZTwvaDE+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwid2VsY29tZS1zdWJ0aXRsZVwiIHN0eWxlPVwiY29sb3I6ICNlMmU4ZjA7IGZvbnQtc2l6ZTogMS4xNXJlbTsgbWFyZ2luOiAwO1wiPlJldmlzaW9uIHN0cmF0ZWdpZXMgZm9yIHRoaXMgdW5pdDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZmZmOyBwYWRkaW5nOiAzMHB4OyBib3JkZXItcmFkaXVzOiA4cHg7IGJveC1zaGFkb3c6IDAgNHB4IDE1cHggcmdiYSgwLDAsMCwwLjA1KTsgbWFyZ2luLXRvcDogMzBweDtcIj5cclxuICAgICAgICAgIDxwPk5vIHNwZWNpZmljIGV4YW0gZ3VpZGFuY2UgaXMgYXZhaWxhYmxlIGZvciB0aGlzIHVuaXQgeWV0LjwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IGNvbnRlbnRIdG1sO1xyXG4gICAgY29udGVudEFyZWEuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIC8vIFJlbmRlciBTaWRlYmFyXHJcbiAgZnVuY3Rpb24gcmVuZGVyU2lkZWJhcigpIHtcclxuICAgIGNvbnN0IG5hdkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlYmFyLW5hdi1jb250YWluZXInKSB8fCBzaWRlYmFyO1xyXG4gICAgbmF2Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIC8vIFVuaXQgSG9tZXBhZ2UgVGFiXHJcbiAgICBjb25zdCBob21lTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIGhvbWVMaW5rLmNsYXNzTmFtZSA9ICdsZXNzb24tbGluayBhY3RpdmUnO1xyXG4gICAgaG9tZUxpbmsuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtaG9tZVwiIHN0eWxlPVwibWFyZ2luLXJpZ2h0OiA4cHg7XCI+PC9pPiBVbml0IEhvbWVwYWdlJztcclxuICAgIGhvbWVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGVzc29uLWxpbmsnKS5mb3JFYWNoKGwgPT4gbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgIGhvbWVMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICByZW5kZXJIb21lcGFnZSgpO1xyXG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDAsIGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcclxuICAgIH0pO1xyXG4gICAgbmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKGhvbWVMaW5rKTtcclxuXHJcbiAgICAvLyBFeGFtIFNwZWNpZmljYXRpb24gVGFiXHJcbiAgICBpZiAodW5pdERhdGEuc3BlY2lmaWNhdGlvbl9maWxlKSB7XHJcbiAgICAgIGNvbnN0IHNwZWNMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICBzcGVjTGluay5jbGFzc05hbWUgPSAnbGVzc29uLWxpbmsnO1xyXG4gICAgICBjb25zdCBzcGVjVGl0bGUgPSAodW5pdERhdGEudGl0bGUgJiYgdW5pdERhdGEudGl0bGUuaW5jbHVkZXMoJ0tTMycpKSA/ICdDdXJyaWN1bHVtIE92ZXJ2aWV3JyA6ICdFeGFtIFNwZWNpZmljYXRpb24nO1xyXG4gICAgICBzcGVjTGluay5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1saXN0LWNoZWNrXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDhweDtcIj48L2k+ICR7c3BlY1RpdGxlfWA7XHJcbiAgICAgIHNwZWNMaW5rLmhyZWYgPSAnIyc7XHJcbiAgICAgIHNwZWNMaW5rLm9uY2xpY2sgPSAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGVzc29uLWxpbmsnKS5mb3JFYWNoKGwgPT4gbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgc3BlY0xpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgY29uc3QgY29udGVudEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudC1hcmVhJyk7XHJcbiAgICAgICAgY29udGVudEFyZWEuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgaW1wb3J0KCcvc3JjL3NwZWNfdmlld2VyLmpzJykudGhlbihtb2R1bGUgPT4ge1xyXG4gICAgICAgICAgbW9kdWxlLmluaXRTcGVjVmlld2VyKGNvbnRlbnRBcmVhLCB1bml0RGF0YS5zcGVjaWZpY2F0aW9uX2ZpbGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgICBuYXZDb250YWluZXIuYXBwZW5kQ2hpbGQoc3BlY0xpbmspO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEV4YW0gTWFzdGVyY2xhc3MgR3VpZGUgVGFiIC0gT05MWSBmb3IgS1M0IHVuaXRzXHJcbiAgICBpZiAoIXVuaXREYXRhLnRpdGxlIHx8ICF1bml0RGF0YS50aXRsZS5pbmNsdWRlcygnS1MzJykpIHtcclxuICAgICAgY29uc3QgZ3VpZGVMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICBndWlkZUxpbmsuY2xhc3NOYW1lID0gJ2xlc3Nvbi1saW5rJztcclxuICAgICAgZ3VpZGVMaW5rLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWdyYWR1YXRpb24tY2FwXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDhweDtcIj48L2k+IEV4YW0gTWFzdGVyY2xhc3MgR3VpZGUnO1xyXG4gICAgICBndWlkZUxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGVzc29uLWxpbmsnKS5mb3JFYWNoKGwgPT4gbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgZ3VpZGVMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHJlbmRlckV4YW1HdWlkZSgpO1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgbmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKGd1aWRlTGluayk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhlbWF0aWMgTWF0cml4IFRhYiAoQ2hhbmdlICYgQ29udGludWl0eSkgLSBPbmx5IGZvciBNZWRpY2luZVxyXG4gICAgaWYgKHdpbmRvdy5jdXJyZW50VW5pdElkID09PSAnZWRleGNlbF9tZWRpY2luZScpIHtcclxuICAgICAgY29uc3QgdGhlbWF0aWNMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICB0aGVtYXRpY0xpbmsuY2xhc3NOYW1lID0gJ2xlc3Nvbi1saW5rJztcclxuICAgICAgdGhlbWF0aWNMaW5rLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRpbWVsaW5lXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDhweDtcIj48L2k+IFRoZW1hdGljIE1hdHJpeCAoQ2hhbmdlICYgQ29udGludWl0eSknO1xyXG4gICAgICB0aGVtYXRpY0xpbmsuc3R5bGUuYmFja2dyb3VuZCA9ICdyZ2JhKDU2LCAxODksIDI0OCwgMC4xKSc7XHJcbiAgICAgIHRoZW1hdGljTGluay5zdHlsZS5ib3JkZXJMZWZ0ID0gJzNweCBzb2xpZCAjMzhiZGY4JztcclxuICAgICAgdGhlbWF0aWNMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxlc3Nvbi1saW5rJykuZm9yRWFjaChsID0+IGwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgIHRoZW1hdGljTGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCB7IHJlbmRlclRoZW1hdGljTWF0cml4IH0gPSBhd2FpdCBpbXBvcnQoXCIvZWVlL3RoZW1hdGljX21hdHJpeC5qc1wiKTtcclxuICAgICAgICBjb25zdCBjb250ZW50QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50LWFyZWEnKTtcclxuICAgICAgICByZW5kZXJUaGVtYXRpY01hdHJpeChjb250ZW50QXJlYSwgdW5pdERhdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgbmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKHRoZW1hdGljTGluayk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIC8vIEFkZCBHdWlkZWQgUmVhZGluZyBUYWIgaWYgYXZhaWxhYmxlXHJcbiAgICBpZiAodW5pdERhdGEuZ3VpZGVkX3JlYWRpbmcgJiYgdW5pdERhdGEuZ3VpZGVkX3JlYWRpbmcubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBnckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgIGdyTGluay5jbGFzc05hbWUgPSAnbGVzc29uLWxpbmsnO1xyXG4gICAgICBnckxpbmsuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtYm9vay1vcGVuXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDhweDtcIj48L2k+IEd1aWRlZCBSZWFkaW5nJztcclxuICAgICAgZ3JMaW5rLmhyZWYgPSAnIyc7XHJcbiAgICAgIGdyTGluay5zdHlsZS5tYXJnaW5Ub3AgPSAnMTVweCc7XHJcbiAgICAgIGdyTGluay5zdHlsZS5ib3JkZXJUb3AgPSAnMXB4IHNvbGlkICNlMmU4ZjAnO1xyXG4gICAgICBnckxpbmsuc3R5bGUucGFkZGluZ1RvcCA9ICcxNXB4JztcclxuICAgICAgZ3JMaW5rLm9uY2xpY2sgPSBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGVzc29uLWxpbmsnKS5mb3JFYWNoKGwgPT4gbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgZ3JMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIER5bmFtaWNhbGx5IGxvYWQgdGhlIGd1aWRlZCByZWFkaW5nIG1vZHVsZSB0byBhdm9pZCBjbHV0dGVyaW5nIGNvcmVfYXBwLmpzXHJcbiAgICAgICAgY29uc3QgeyBpbml0R3VpZGVkUmVhZGluZ1Rhc2sgfSA9IGF3YWl0IGltcG9ydChcIi9lZWUvZ3VpZGVkX3JlYWRpbmcuanNcIik7XHJcbiAgICAgICAgY29uc3QgY29udGVudEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudC1hcmVhJyk7XHJcbiAgICAgICAgY29udGVudEFyZWEuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGN1cnJlbnRMZXNzb25JbmRleCA9IDA7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5jdXJyZW50QWN0aXZlTGVzc29uICYmIHVuaXREYXRhLmxlc3NvbnMpIHtcclxuICAgICAgICAgIGN1cnJlbnRMZXNzb25JbmRleCA9IHVuaXREYXRhLmxlc3NvbnMuZmluZEluZGV4KGwgPT4gbC50aXRsZSA9PT0gd2luZG93LmN1cnJlbnRBY3RpdmVMZXNzb24udGl0bGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpbml0R3VpZGVkUmVhZGluZ1Rhc2soY29udGVudEFyZWEsIHVuaXREYXRhLmd1aWRlZF9yZWFkaW5nLCB7IGN1cnJlbnRMZXNzb25JbmRleCB9KTtcclxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDAsIGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcclxuICAgICAgfTtcclxuICAgICAgbmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKGdyTGluayk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZXhhbVByYWN0aWNlTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIGV4YW1QcmFjdGljZUxpbmsuY2xhc3NOYW1lID0gJ2xlc3Nvbi1saW5rJztcclxuICAgIGV4YW1QcmFjdGljZUxpbmsuaW5uZXJIVE1MID0gKHVuaXREYXRhLnRpdGxlICYmIHVuaXREYXRhLnRpdGxlLmluY2x1ZGVzKCdLUzMnKSkgPyAn4pyN77iPIEFzc2Vzc21lbnRzJyA6ICfinI3vuI8gQXNzZXNzbWVudHMgJiBFeGFtIFByYWN0aWNlJztcclxuICAgIGV4YW1QcmFjdGljZUxpbmsuc3R5bGUubWFyZ2luVG9wID0gJzE1cHgnO1xyXG4gICAgZXhhbVByYWN0aWNlTGluay5zdHlsZS5jb2xvciA9ICcjNjBhNWZhJzsgLy8gQmx1ZS00MDBcclxuICAgIGV4YW1QcmFjdGljZUxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sZXNzb24tbGluaycpLmZvckVhY2gobCA9PiBsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgZXhhbVByYWN0aWNlTGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgY29uc3QgY29udGVudEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudC1hcmVhJyk7XHJcbiAgICAgIGNvbnRlbnRBcmVhLmlubmVySFRNTCA9ICcnOyAvLyBjbGVhclxyXG4gICAgICByZW5kZXJFeGFtUHJhY3RpY2Vab25lKGNvbnRlbnRBcmVhLCB1bml0RGF0YSk7XHJcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0pO1xyXG4gICAgfSk7XHJcbiAgICBuYXZDb250YWluZXIuYXBwZW5kQ2hpbGQoZXhhbVByYWN0aWNlTGluayk7XHJcblxyXG4gICAgY29uc3QgcXVpelBhY2tMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgcXVpelBhY2tMaW5rLmlkID0gJ3F1aXotem9uZS1saW5rJztcclxuICAgIHF1aXpQYWNrTGluay5jbGFzc05hbWUgPSAnbGVzc29uLWxpbmsnO1xyXG4gICAgcXVpelBhY2tMaW5rLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWxheWVyLWdyb3VwXCI+PC9pPiBJbnRlcmFjdGl2ZSBSZXZpc2lvbiBIdWInO1xyXG4gICAgcXVpelBhY2tMaW5rLnN0eWxlLm1hcmdpblRvcCA9ICcxNXB4JztcclxuICAgIHF1aXpQYWNrTGluay5zdHlsZS5jb2xvciA9ICcjMzRkMzk5JzsgLy8gRW1lcmFsZC00MDBcclxuICAgIHF1aXpQYWNrTGluay5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XHJcbiAgICBxdWl6UGFja0xpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sZXNzb24tbGluaycpLmZvckVhY2gobCA9PiBsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgcXVpelBhY2tMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICBjb25zdCBjb250ZW50QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50LWFyZWEnKTtcclxuICAgICAgY29udGVudEFyZWEuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgIHJlbmRlclF1aXpab25lKGNvbnRlbnRBcmVhLCB1bml0RGF0YSk7XHJcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0pO1xyXG4gICAgfSk7XHJcbiAgICBuYXZDb250YWluZXIuYXBwZW5kQ2hpbGQocXVpelBhY2tMaW5rKTtcclxuXHJcbiAgICBcclxuICAgIGlmICh3aW5kb3cuY3VycmVudFVuaXRJZCAhPT0gJ3dhdGVyX2FuZF9zYW5pdGF0aW9uJykge1xyXG4gICAgICBjb25zdCBjaGVhdFNoZWV0TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgY2hlYXRTaGVldExpbmsuY2xhc3NOYW1lID0gJ2xlc3Nvbi1saW5rJztcclxuICAgICAgY2hlYXRTaGVldExpbmsuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtZmlsZS1pbnZvaWNlXCI+PC9pPiBSZXZpc2lvbiBDaGVhdCBTaGVldCc7XHJcbiAgICAgIGNoZWF0U2hlZXRMaW5rLmhyZWYgPSB3aW5kb3cuY3VycmVudFVuaXRJZCA/IGAvdW5pdHMvJHt3aW5kb3cuY3VycmVudFVuaXRJZH0vY2hlYXRfc2hlZXQuaHRtbGAgOiAnY2hlYXRfc2hlZXQuaHRtbCc7XHJcbiAgICAgIGNoZWF0U2hlZXRMaW5rLnRhcmdldCA9ICdfYmxhbmsnO1xyXG4gICAgICBjaGVhdFNoZWV0TGluay5zdHlsZS5tYXJnaW5Ub3AgPSAnMTVweCc7XHJcbiAgICAgIG5hdkNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVhdFNoZWV0TGluayk7XHJcbiAgICB9XHJcblxyXG5cclxuICB9XHJcblxyXG4gIFxyXG4gIC8vIEdsb2JhbCBtYXJrZG93biBmb3JtYXR0ZXIgZm9yIGlubGluZSB0ZXh0XHJcbiAgd2luZG93LmZvcm1hdEJvbGQgPSBmdW5jdGlvbih0ZXh0KSB7XHJcbiAgICByZXR1cm4gdGV4dCA/IHRleHQucmVwbGFjZSgvXFxcXG58XFxuL2csICc8YnI+JykucmVwbGFjZSgvXFwqXFwqKC4qPylcXCpcXCovZywgJzxzdHJvbmc+JDE8L3N0cm9uZz4nKSA6ICcnO1xyXG4gIH07XHJcbiAgXHJcbiAgLy8gUmVuZGVyIExlc3NvbiBDb250ZW50XHJcbiAgZnVuY3Rpb24gcmVuZGVyTGVzc29uKGxlc3Nvbikge1xyXG4gICAgY29uc3QgZm9ybWF0Qm9sZCA9IHdpbmRvdy5mb3JtYXRCb2xkO1xyXG4gICAgbGVzc29uID0gc2FuaXRpemVMZXNzb25EYXRhKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGVzc29uKSkpO1xyXG4gICAgXHJcbiAgICAvLyBFeHRyYWN0IGV4YW0gdGFza3MgZnJvbSB0YXNrcyBhcnJheSBzbyB0aGV5IGFyZSBub3QgcmVuZGVyZWQgaW5saW5lXHJcbiAgICBsZXQgZXh0cmFjdGVkRXhhbVRhc2tzID0gW107XHJcbiAgICBpZiAobGVzc29uLm5hcnJhdGl2ZV9ibG9ja3MpIHtcclxuICAgICAgbGVzc29uLm5hcnJhdGl2ZV9ibG9ja3MuZm9yRWFjaChibG9jayA9PiB7XHJcbiAgICAgICAgaWYgKGJsb2NrLnRhc2tzKSB7XHJcbiAgICAgICAgICBjb25zdCBlVGFza3MgPSBibG9jay50YXNrcy5maWx0ZXIodCA9PiAodC50ZXh0IHx8IHQucXVlc3Rpb24gfHwgJycpLmluY2x1ZGVzKCdtYXJrcyknKSk7XHJcbiAgICAgICAgICBleHRyYWN0ZWRFeGFtVGFza3MucHVzaCguLi5lVGFza3MpO1xyXG4gICAgICAgICAgYmxvY2sudGFza3MgPSBibG9jay50YXNrcy5maWx0ZXIodCA9PiAhKHQudGV4dCB8fCB0LnF1ZXN0aW9uIHx8ICcnKS5pbmNsdWRlcygnbWFya3MpJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAobGVzc29uLnRhc2tzKSB7XHJcbiAgICAgIGNvbnN0IGVUYXNrcyA9IGxlc3Nvbi50YXNrcy5maWx0ZXIodCA9PiAodC50ZXh0IHx8IHQucXVlc3Rpb24gfHwgJycpLmluY2x1ZGVzKCdtYXJrcyknKSk7XHJcbiAgICAgIGV4dHJhY3RlZEV4YW1UYXNrcy5wdXNoKC4uLmVUYXNrcyk7XHJcbiAgICAgIGxlc3Nvbi50YXNrcyA9IGxlc3Nvbi50YXNrcy5maWx0ZXIodCA9PiAhKHQudGV4dCB8fCB0LnF1ZXN0aW9uIHx8ICcnKS5pbmNsdWRlcygnbWFya3MpJykpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAobGVzc29uLmV4YW1fcHJhY3RpY2UgJiYgQXJyYXkuaXNBcnJheShsZXNzb24uZXhhbV9wcmFjdGljZSkpIHtcclxuICAgICAgZXh0cmFjdGVkRXhhbVRhc2tzLnB1c2goLi4ubGVzc29uLmV4YW1fcHJhY3RpY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzc2lnblF1ZXN0aW9uTnVtYmVycyhsZXNzb24pO1xyXG4gICAgd2luZG93LmN1cnJlbnRBY3RpdmVMZXNzb24gPSBsZXNzb247XHJcbiAgICBcclxuICAgIC8vIFRhYnMgY29udGFpbmVyIGxvZ2ljXHJcbiAgICBjb25zdCBoZXJvSW1hZ2UgPSB3aW5kb3cuY3VycmVudFVuaXREYXRhPy5ob21lcGFnZV9iYWNrZ3JvdW5kIHx8ICcvaW1hZ2VzL2RlZmF1bHRfaGVyby5qcGcnO1xyXG4gICAgY29uc3QgbGVzc29uTnVtYmVyVGV4dCA9IChsZXNzb24uaWQgJiYgbGVzc29uLmlkLnN0YXJ0c1dpdGgoJ2xlc3Nvbl8nKSkgPyBgTGVzc29uICR7bGVzc29uLmlkLnNwbGl0KCdfJylbMV19YCA6ICdMZXNzb24nO1xyXG4gICAgXHJcbiAgICBjb25zdCBjb250ZW50QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50LWFyZWEnKTtcclxuICAgIGlmIChjb250ZW50QXJlYSkgY29udGVudEFyZWEuc3R5bGUucGFkZGluZ1RvcCA9ICcwJzsgLy8gRml4IGdhcFxyXG4gICAgXHJcbiAgICBsZXQgaHRtbCA9IGA8ZGl2IGNsYXNzPVwibGVzc29uLWNvbnRlbnRcIj5gO1xyXG4gICAgXHJcbiAgICAvLyBTdGlja3kgSGVhZGVyIChObyB2aXNpYmxlIGJhY2tncm91bmQsIGJ1dCBvcGFxdWUgdG8gaGlkZSBzY3JvbGxpbmcgdGV4dClcclxuICAgIGh0bWwgKz0gYFxyXG4gICAgICA8ZGl2IHN0eWxlPVwicG9zaXRpb246IHN0aWNreTsgdG9wOiAwOyBtYXJnaW4tbGVmdDogLTRyZW07IG1hcmdpbi1yaWdodDogLTRyZW07IHBhZGRpbmc6IDFyZW0gNHJlbTsgei1pbmRleDogOTA7IGRpc3BsYXk6ZmxleDsganVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOmNlbnRlcjsgbWFyZ2luLWJvdHRvbTogMnJlbTsgYmFja2dyb3VuZDogI2Y4ZjlmYTsgYm9yZGVyOiBub25lOyBib3gtc2hhZG93OiBub25lO1wiPlxyXG4gICAgICAgIDxoNCBzdHlsZT1cIm1hcmdpbjogMDsgZm9udC1zaXplOiAxLjFyZW07IGNvbG9yOiB2YXIoLS1wcmltYXJ5KTsgZm9udC13ZWlnaHQ6IDYwMDsgZm9udC1mYW1pbHk6ICdQbGF5ZmFpciBEaXNwbGF5Jywgc2VyaWY7XCI+XHJcbiAgICAgICAgICAkeyhsZXNzb24uaWQgJiYgbGVzc29uLmlkLnN0YXJ0c1dpdGgoJ2xlc3Nvbl8nKSkgPyBgTGVzc29uICR7bGVzc29uLmlkLnNwbGl0KCdfJylbMV19OiBgIDogJyd9JHtsZXNzb24uZW5xdWlyeSB8fCBsZXNzb24uZW5xdWlyeV9xdWVzdGlvbiB8fCBsZXNzb24uaW5xdWlyeV9xdWVzdGlvbiB8fCBsZXNzb24udGl0bGV9XHJcbiAgICAgICAgPC9oND5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZ2FwOiA4cHg7IGZsZXgtc2hyaW5rOiAwO1wiPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiIHN0eWxlPVwicGFkZGluZzogNnB4IDEycHg7IGZvbnQtc2l6ZTogMC45cmVtOyBiYWNrZ3JvdW5kOiB3aGl0ZTsgY29sb3I6ICMwZjE3MmE7IGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4xKTsgZm9udC13ZWlnaHQ6IDYwMDsgYm94LXNoYWRvdzogMCAycHggNXB4IHJnYmEoMCwwLDAsMC4wNSk7XCIgb25jbGljaz1cIm9wZW5EZWJhdGVNb2RhbCgpXCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jb21tZW50c1wiIHN0eWxlPVwiY29sb3I6ICMzYjgyZjY7XCI+PC9pPiBDbGFzcyBEZWJhdGU8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIHN0eWxlPVwicGFkZGluZzogNnB4IDEycHg7IGZvbnQtc2l6ZTogMC45cmVtOyBiYWNrZ3JvdW5kOiB3aGl0ZTsgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLDAsMCwwLjEpO1wiIG9uY2xpY2s9XCJ3aW5kb3cucmVuZGVyRGFzaGJvYXJkKClcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWFycm93LWxlZnRcIj48L2k+IFVuaXQgTWVudTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgICBcclxuICAgIC8vIEZ1bGwtQmxlZWQgSGVybyBJbWFnZVxyXG4gICAgaHRtbCArPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJsZXNzb24taGVyb1wiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlOyB3aWR0aDogY2FsYygxMDAlICsgOHJlbSk7IG1hcmdpbi1sZWZ0OiAtNHJlbTsgbWFyZ2luLXRvcDogLTFyZW07IGhlaWdodDogMzAwcHg7IGJhY2tncm91bmQ6IHVybCgnJHtoZXJvSW1hZ2V9JykgY2VudGVyL2NvdmVyIG5vLXJlcGVhdDsgbWFyZ2luLWJvdHRvbTogMnJlbTsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1nbGFzcyk7IGJveC1zaGFkb3c6IDAgMTBweCAzMHB4IHJnYmEoMCwwLDAsMC4xNSk7XCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgaW5zZXQ6IDA7IGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMTUsMjMsNDIsMC4yKSwgcmdiYSgxNSwyMyw0MiwwLjkpKTtcIj48L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyBib3R0b206IDA7IGxlZnQ6IDA7IHdpZHRoOiAxMDAlOyBwYWRkaW5nOiAycmVtIDRyZW07XCI+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiAjY2JkNWUxOyBmb250LXdlaWdodDogNjAwOyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyBsZXR0ZXItc3BhY2luZzogMXB4OyBmb250LXNpemU6IDAuOXJlbTtcIj4ke2xlc3Nvbk51bWJlclRleHR9PC9zcGFuPlxyXG4gICAgICAgICAgPGgyIHN0eWxlPVwiZm9udC1mYW1pbHk6ICdQbGF5ZmFpciBEaXNwbGF5Jywgc2VyaWY7IGNvbG9yOiB3aGl0ZTsgZm9udC1zaXplOiAyLjVyZW07IG1hcmdpbjogMC41cmVtIDAgMCAwOyBsaW5lLWhlaWdodDogMS4yOyB0ZXh0LXNoYWRvdzogMCAycHggMTBweCByZ2JhKDAsMCwwLDAuNSk7XCI+JHtsZXNzb24udGl0bGV9PC9oMj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgO1xyXG5cclxuICAgIGNvbnN0IHVuaXRFbnF1aXJ5VGV4dCA9IHdpbmRvdy5jdXJyZW50VW5pdERhdGE/LmVucXVpcnlfcXVlc3Rpb24gfHwgd2luZG93LmN1cnJlbnRVbml0RGF0YT8uZW5xdWlyeSB8fCAnJztcclxuICAgIGlmICh1bml0RW5xdWlyeVRleHQpIHtcclxuICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTsgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEwcHgpOyAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cigxMHB4KTsgY29sb3I6ICMxZTNhOGE7IHBhZGRpbmc6IDE1cHggMjBweDsgYm9yZGVyLXJhZGl1czogMTJweDsgbWFyZ2luLWJvdHRvbTogMnJlbTsgdGV4dC1hbGlnbjogY2VudGVyOyBmb250LXNpemU6IDEuMTVyZW07IGZvbnQtZmFtaWx5OiAnUGxheWZhaXIgRGlzcGxheScsIHNlcmlmOyBmb250LXdlaWdodDogNjAwOyBib3gtc2hhZG93OiAwIDRweCAxNXB4IHJnYmEoMCwwLDAsMC4wNSk7IGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC41KTtcIj5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtbGlnaHRidWxiXCIgc3R5bGU9XCJjb2xvcjogI2Q5NzcwNjsgbWFyZ2luLXJpZ2h0OiAxMHB4O1wiPjwvaT4gJHt1bml0RW5xdWlyeVRleHR9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBodG1sICs9IGBcclxuICAgICAgPGRpdiBpZD1cInByb2dyZXNzLWNvbnRhaW5lclwiIHN0eWxlPVwiYmFja2dyb3VuZDogcmdiYSgyMjYsMjMyLDI0MCwwLjUpOyBoZWlnaHQ6IDZweDsgd2lkdGg6IDEwMCU7IG1hcmdpbi1ib3R0b206IDIwcHg7IGJvcmRlci1yYWRpdXM6IDNweDsgb3ZlcmZsb3c6IGhpZGRlbjsgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDVweCk7XCI+XHJcbiAgICAgICAgPGRpdiBpZD1cInByb2dyZXNzLWJhclwiIHN0eWxlPVwiYmFja2dyb3VuZDogIzEwYjk4MTsgaGVpZ2h0OiAxMDAlOyB3aWR0aDogMCU7IHRyYW5zaXRpb246IHdpZHRoIDAuM3M7XCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgYDtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gVEFCUyBOQVZJR0FUSU9OIFVJXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgaHRtbCArPSBgXHJcbiAgICAgIFxyXG4gICAgYDtcclxuXHJcbiAgICBsZXQgZ2xvYmFsUXVlc3Rpb25OdW0gPSAxO1xyXG4gICAgY29uc3QgZm9ybWF0UXVlc3Rpb24gPSAocVRleHQpID0+IHtcclxuICAgICAgaWYgKCFxVGV4dCkgcmV0dXJuICcnO1xyXG4gICAgICBsZXQgY2xlYW5lZCA9IHFUZXh0LnJlcGxhY2UoL14oRW5xdWlyeTp8UVxcZCs6fFRhc2sgXFxkKzp8UXVlc3Rpb24gXFxkK1thLXpdPzopXFxzKi9pLCAnJyk7XHJcbiAgICAgIHJldHVybiBgUXVlc3Rpb24gJHtnbG9iYWxRdWVzdGlvbk51bSsrfTogJHtmb3JtYXRCb2xkKGNsZWFuZWQpfWA7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB2b2NhYkRpY3QgPSB7fTtcclxuICAgIGlmIChsZXNzb24udm9jYWIpIHtcclxuICAgICAgbGVzc29uLnZvY2FiLmZvckVhY2godiA9PiB7XHJcbiAgICAgICAgdm9jYWJEaWN0W3YudGVybS50b0xvd2VyQ2FzZSgpXSA9IHYuZGVmaW5pdGlvbjtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHNlZW5UZXJtcyA9IG5ldyBTZXQoKTtcclxuICAgIGNvbnN0IGhpZ2hsaWdodEdsb3NzYXJ5ID0gKHRleHQpID0+IHtcclxuICAgICAgaWYgKE9iamVjdC5rZXlzKHZvY2FiRGljdCkubGVuZ3RoID09PSAwKSByZXR1cm4gdGV4dDtcclxuICAgICAgbGV0IHByb2Nlc3NlZFRleHQgPSB0ZXh0O1xyXG4gICAgICBjb25zdCBzb3J0ZWRUZXJtcyA9IE9iamVjdC5rZXlzKHZvY2FiRGljdCkuc29ydCgoYSxiKSA9PiBiLmxlbmd0aCAtIGEubGVuZ3RoKTtcclxuICAgICAgZm9yIChjb25zdCB0ZXJtIG9mIHNvcnRlZFRlcm1zKSB7XHJcbiAgICAgICAgY29uc3QgZGVmID0gdm9jYWJEaWN0W3Rlcm1dO1xyXG4gICAgICAgIGlmICghc2VlblRlcm1zLmhhcyh0ZXJtKSkge1xyXG4gICAgICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGBcXFxcYigke3Rlcm19KVxcXFxiYCwgJ2knKTtcclxuICAgICAgICAgIGlmIChyZWdleC50ZXN0KHByb2Nlc3NlZFRleHQpKSB7XHJcbiAgICAgICAgICAgIHByb2Nlc3NlZFRleHQgPSBwcm9jZXNzZWRUZXh0LnJlcGxhY2UocmVnZXgsIGA8c3BhbiBjbGFzcz1cInZvY2FiLXdvcmRcIiBkYXRhLWRlZmluaXRpb249XCIke2RlZi5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyl9XCI+JDE8L3NwYW4+YCk7XHJcbiAgICAgICAgICAgIHNlZW5UZXJtcy5hZGQodGVybSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBwcm9jZXNzZWRUZXh0O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgaWYgKGxlc3Nvbi50ZWFjaGVyX25vdGVzKSB7XHJcbiAgICAgIGxldCBub3Rlc0h0bWwgPSAnJztcclxuICAgICAgaWYgKGxlc3Nvbi50ZWFjaGVyX25vdGVzICYmICFBcnJheS5pc0FycmF5KGxlc3Nvbi50ZWFjaGVyX25vdGVzKSAmJiB0eXBlb2YgbGVzc29uLnRlYWNoZXJfbm90ZXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgY29uc3QgcHJpbWVyVGV4dCA9IGxlc3Nvbi50ZWFjaGVyX25vdGVzLnByaW1lciA/IGA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxLjA1cmVtOyBtYXJnaW4tYm90dG9tOiAyMHB4O1wiPiR7bGVzc29uLnRlYWNoZXJfbm90ZXMucHJpbWVyfTwvZGl2PmAgOiAnJztcclxuICAgICAgICBjb25zdCBzb3VyY2VDb250ZXh0ID0gbGVzc29uLnRlYWNoZXJfbm90ZXMuc291cmNlX2NvbnRleHQgPyBgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMC45NXJlbTsgbWFyZ2luLWJvdHRvbTogMjBweDsgYmFja2dyb3VuZDogcmdiYSgyLCAxMzIsIDE5OSwgMC4yKTsgcGFkZGluZzogMTVweDsgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjMzhiZGY4OyBib3JkZXItcmFkaXVzOiA0cHg7XCI+PHN0cm9uZz48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWltYWdlXCI+PC9pPiBTb3VyY2UgQ29udGV4dDo8L3N0cm9uZz48YnIvPiR7bGVzc29uLnRlYWNoZXJfbm90ZXMuc291cmNlX2NvbnRleHR9PC9kaXY+YCA6ICcnO1xyXG4gICAgICAgIGNvbnN0IG9iamVjdGl2ZXNIdG1sID0gKGxlc3Nvbi50ZWFjaGVyX25vdGVzLm9iamVjdGl2ZXMgfHwgW10pLm1hcChub3RlID0+IGBcclxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuMik7IHBhZGRpbmc6IDEycHg7IGJvcmRlci1yYWRpdXM6IDRweDsgbWFyZ2luLWJvdHRvbTogMTBweDsgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjNjQ3NDhiO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC13ZWlnaHQ6IGJvbGQ7IGNvbG9yOiAjZmFjYzE1OyBtYXJnaW4tYm90dG9tOiA2cHg7IGZvbnQtc2l6ZTogMC45NXJlbTtcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWJ1bGxzZXllXCIgc3R5bGU9XCJmb250LXNpemU6IDAuOHJlbTsgbWFyZ2luLXJpZ2h0OiA0cHg7XCI+PC9pPiAke25vdGUub2JqZWN0aXZlfTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAwLjk1cmVtOyBtYXJnaW4tYm90dG9tOiAwO1wiPiR7bm90ZS5wcmltZXJ9PC9kaXY+XHJcbiAgICAgICAgICAgICR7bm90ZS5xdWVzdGlvbiA/IGA8ZGl2IHN0eWxlPVwibWFyZ2luLXRvcDogMTBweDsgcGFkZGluZy10b3A6IDEwcHg7IGJvcmRlci10b3A6IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMSk7IGNvbG9yOiAjMzhiZGY4OyBmb250LXdlaWdodDogNjAwO1wiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2lyY2xlLXF1ZXN0aW9uXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDRweDtcIj48L2k+IEhpbmdlIFF1ZXN0aW9uOiAke25vdGUucXVlc3Rpb259PC9kaXY+YCA6ICcnfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCkuam9pbignJyk7XHJcbiAgICAgICAgbm90ZXNIdG1sID0gcHJpbWVyVGV4dCArIHNvdXJjZUNvbnRleHQgKyBvYmplY3RpdmVzSHRtbDtcclxuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGxlc3Nvbi50ZWFjaGVyX25vdGVzKSkge1xyXG4gICAgICAgIG5vdGVzSHRtbCA9IGxlc3Nvbi50ZWFjaGVyX25vdGVzLm1hcChub3RlID0+IGBcclxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuMik7IHBhZGRpbmc6IDEycHg7IGJvcmRlci1yYWRpdXM6IDRweDsgbWFyZ2luLWJvdHRvbTogMTBweDsgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjNjQ3NDhiO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC13ZWlnaHQ6IGJvbGQ7IGNvbG9yOiAjZmFjYzE1OyBtYXJnaW4tYm90dG9tOiA2cHg7IGZvbnQtc2l6ZTogMC45NXJlbTtcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWJ1bGxzZXllXCIgc3R5bGU9XCJmb250LXNpemU6IDAuOHJlbTsgbWFyZ2luLXJpZ2h0OiA0cHg7XCI+PC9pPiAke25vdGUub2JqZWN0aXZlfTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAwLjk1cmVtOyBtYXJnaW4tYm90dG9tOiAwO1wiPiR7bm90ZS5wcmltZXJ9PC9kaXY+XHJcbiAgICAgICAgICAgICR7bm90ZS5xdWVzdGlvbiA/IGA8ZGl2IHN0eWxlPVwibWFyZ2luLXRvcDogMTBweDsgcGFkZGluZy10b3A6IDEwcHg7IGJvcmRlci10b3A6IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMSk7IGNvbG9yOiAjMzhiZGY4OyBmb250LXdlaWdodDogNjAwO1wiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2lyY2xlLXF1ZXN0aW9uXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDRweDtcIj48L2k+IEhpbmdlIFF1ZXN0aW9uOiAke25vdGUucXVlc3Rpb259PC9kaXY+YCA6ICcnfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCkuam9pbignJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbm90ZXNIdG1sID0gYDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDEuMDVyZW07XCI+JHtsZXNzb24udGVhY2hlcl9ub3Rlc308L2Rpdj5gO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBodG1sICs9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGVhY2hlci1ub3RlXCI+XHJcbiAgICAgICAgICA8aDQ+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jaGFsa2JvYXJkLXVzZXJcIj48L2k+IFBlZGFnb2dpY2FsIFByaW1lcjwvaDQ+XHJcbiAgICAgICAgICAke25vdGVzSHRtbH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFRBQiAxOiBQUkVQQVJBVElPTlxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBodG1sICs9IGBgO1xyXG4gICAgXHJcbiAgICBpZiAobGVzc29uLnByaW1hcnlfc291cmNlKSB7XHJcbiAgICAgIGxldCBzcmMgPSBsZXNzb24ucHJpbWFyeV9zb3VyY2Uuc3JjO1xyXG4gICAgICBodG1sICs9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGhhc2UtY2FyZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNvdXJjZS1jYXJkXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZmZmZmZmOyBwYWRkaW5nOiAyMHB4OyBib3JkZXItcmFkaXVzOiA4cHg7IGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7IG1hcmdpbi1ib3R0b206IDIwcHg7IHRleHQtYWxpZ246IGNlbnRlcjtcIj5cclxuICAgICAgICAgICAgPGltZyBzcmM9XCIke2dldEFzc2V0VXJsKHNyYyl9XCIgYWx0PVwiU291cmNlXCIgc3R5bGU9XCJtYXgtaGVpZ2h0OiA1MDBweDsgbWF4LXdpZHRoOiAxMDAlOyBvYmplY3QtZml0OiBjb250YWluOyBib3JkZXItcmFkaXVzOiA0cHg7IGJveC1zaGFkb3c6IDAgNHB4IDZweCByZ2JhKDAsMCwwLDAuMSk7IG1hcmdpbi1ib3R0b206IDE1cHg7XCI+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXdlaWdodDogYm9sZDsgbWFyZ2luLWJvdHRvbTogMTBweDsgZm9udC1zaXplOiAxLjFyZW07IGNvbG9yOiB2YXIoLS1wcmltYXJ5KTtcIj4ke2xlc3Nvbi5wcmltYXJ5X3NvdXJjZS50aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgJHtsZXNzb24ucHJpbWFyeV9zb3VyY2UuY2FwdGlvbiA/IGA8ZGl2IHN0eWxlPVwiY29sb3I6ICM0NzU1Njk7IG1hcmdpbi1ib3R0b206IDE1cHg7IGZvbnQtc2l6ZTogMC45NXJlbTsgdGV4dC1hbGlnbjogbGVmdDtcIj4ke2xlc3Nvbi5wcmltYXJ5X3NvdXJjZS5jYXB0aW9ufTwvZGl2PmAgOiAnJ31cclxuICAgICAgICAgICAgJHtsZXNzb24ucHJpbWFyeV9zb3VyY2UucXVlc3Rpb24gPyBgXHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6ICNlYmY4ZmY7IGJvcmRlci1sZWZ0OiA0cHggc29saWQgIzMxODJjZTsgcGFkZGluZzogMTVweDsgYm9yZGVyLXJhZGl1czogMCA0cHggNHB4IDA7IHRleHQtYWxpZ246IGxlZnQ7IG1hcmdpbi10b3A6IDIwcHg7XCI+XHJcbiAgICAgICAgICAgICAgICA8cCBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDA7IGZvbnQtc2l6ZTogMS4xcmVtOyBjb2xvcjogIzFlM2E4YTtcIj48c3Ryb25nPiR7Zm9ybWF0UXVlc3Rpb24obGVzc29uLnByaW1hcnlfc291cmNlLnF1ZXN0aW9uKX08L3N0cm9uZz48L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGAgOiAnJ31cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgICBpZiAobGVzc29uLnN0YXJ0ZXJzICYmIGxlc3Nvbi5zdGFydGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogI2ZmZmZmZjsgYm9yZGVyOiAxLjVweCBzb2xpZCAjZTJlOGYwOyBib3JkZXItcmFkaXVzOiA4cHg7IG1hcmdpbi1ib3R0b206IDIwcHg7IG92ZXJmbG93OiBoaWRkZW47IGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMDUpO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwicGFkZGluZzogMTVweCAyMHB4OyBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICMxZTNhOGEsICMzYjgyZjYpOyBjb2xvcjogd2hpdGU7IGZvbnQtd2VpZ2h0OiBib2xkOyBmb250LXNpemU6IDEuMnJlbTsgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjtcIj5cclxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWltYWdlXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDEwcHg7XCI+PC9pPiBIaXN0b3JpY2FsIFNvdXJjZXM6IFRoaW5rICYgV29uZGVyXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwicGFkZGluZzogMjBweDsgZGlzcGxheTogZ3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyOyBnYXA6IDIwcHg7IGFsaWduLWl0ZW1zOiBzdGFydDtcIj5cclxuICAgICAgICBgO1xyXG4gICAgICAgIGxlc3Nvbi5zdGFydGVycy5mb3JFYWNoKChzdGFydGVyLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGJhY2tncm91bmQ6ICNmOGZhZmM7IGJvcmRlcjogMXB4IHNvbGlkICNjYmQ1ZTE7IGJvcmRlci1yYWRpdXM6IDZweDsgcGFkZGluZzogMTVweDsgaGVpZ2h0OiAxMDAlO1wiPlxyXG4gICAgICAgICAgICAgICAgPGg0IHN0eWxlPVwibWFyZ2luOiAwIDAgMTVweCAwOyBjb2xvcjogIzBmMTcyYTsgZm9udC1zaXplOiAxLjFyZW07IGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjM2I4MmY2OyBwYWRkaW5nLWJvdHRvbTogNXB4O1wiPlNvdXJjZSAke1N0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBpbmRleCl9OiAke3N0YXJ0ZXIudGl0bGV9PC9oND5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiAyNTBweDsgYmFja2dyb3VuZC1jb2xvcjogIzAwMDsgYm9yZGVyLXJhZGl1czogNHB4OyBvdmVyZmxvdzogaGlkZGVuOyBtYXJnaW4tYm90dG9tOiAxNXB4OyBkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgYWxpZ24taXRlbXM6IGNlbnRlcjtcIj5cclxuICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3N0YXJ0ZXIuc291cmNlfVwiIHN0eWxlPVwibWF4LXdpZHRoOiAxMDAlOyBtYXgtaGVpZ2h0OiAxMDAlOyBvYmplY3QtZml0OiBjb250YWluOyBjdXJzb3I6IHpvb20taW47XCIgb25jbGljaz1cIndpbmRvdy5vcGVuTW9kYWwodGhpcy5zcmMpXCI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDAuOTVyZW07IGNvbG9yOiAjNDc1NTY5OyBtYXJnaW4tYm90dG9tOiAxNXB4OyBmb250LXN0eWxlOiBpdGFsaWM7XCI+XHJcbiAgICAgICAgICAgICAgICAgICR7c3RhcnRlci5jYXB0aW9ufVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogI2VmZjZmZjsgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjM2I4MmY2OyBwYWRkaW5nOiAxMnB4OyBib3JkZXItcmFkaXVzOiAwIDRweCA0cHggMDsgbWFyZ2luLXRvcDogYXV0bztcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtd2VpZ2h0OiA3MDA7IGNvbG9yOiAjMWUzYThhOyBtYXJnaW4tYm90dG9tOiA1cHg7IGZvbnQtc2l6ZTogMC45NXJlbTtcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWxpZ2h0YnVsYlwiIHN0eWxlPVwiY29sb3I6ICNmYmJmMjQ7IG1hcmdpbi1yaWdodDogNXB4O1wiPjwvaT4gVGhpbmsgJiBXb25kZXI8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMC45NXJlbTsgY29sb3I6ICMxZTQwYWY7XCI+JHtzdGFydGVyLnRoaW5rX3dvbmRlcn08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgYDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBpZiAobGVzc29uLmRvX25vdyAmJiBsZXNzb24uZG9fbm93LnR5cGUgPT09ICd0aW1lbGluZScgJiYgbGVzc29uLmRvX25vdy5ldmVudHMpIHtcclxuICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgPGRldGFpbHMgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZmZmZmZmOyBib3JkZXI6IDEuNXB4IHNvbGlkICNlMmU4ZjA7IGJvcmRlci1yYWRpdXM6IDZweDsgbWFyZ2luLWJvdHRvbTogOHB4OyBvdmVyZmxvdzogaGlkZGVuOyBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgwLDAsMCwwLjA1KTtcIiBjbG9zZWQ+XHJcbiAgICAgICAgICAgIDxzdW1tYXJ5IHN0eWxlPVwicGFkZGluZzogMTBweCAxNXB4OyBjdXJzb3I6IHBvaW50ZXI7IGNvbG9yOiAjMGYxNzJhOyBmb250LXdlaWdodDogYm9sZDsgZm9udC1zaXplOiAxLjA1cmVtOyBiYWNrZ3JvdW5kOiAjZjhmYWZjOyBsaXN0LXN0eWxlOiBub25lOyBkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTJlOGYwO1wiPlxyXG4gICAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2xvY2stcm90YXRlLWxlZnRcIiBzdHlsZT1cImNvbG9yOiAjM2I4MmY2OyBtYXJnaW4tcmlnaHQ6IDEwcHg7XCI+PC9pPiBDaHJvbm9sb2dpY2FsIFRpbWVsaW5lPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2hldnJvbi1kb3duXCIgc3R5bGU9XCJjb2xvcjogIzY0NzQ4YjtcIj48L2k+XHJcbiAgICAgICAgICAgIDwvc3VtbWFyeT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cInBhZGRpbmc6IDIwcHg7XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDIwcHg7IGZvbnQtc2l6ZTogMS4xcmVtOyBjb2xvcjogIzFlM2E4YTtcIj48c3Ryb25nPiR7bGVzc29uLmRvX25vdy5wcmVkaWN0aW9uX3F1ZXN0aW9uIHx8ICcnfTwvc3Ryb25nPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBmbGV4LXdyYXA6IHdyYXA7IGdhcDogMTVweDsganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1wiPlxyXG4gICAgICBgO1xyXG4gICAgICBsZXNzb24uZG9fbm93LmV2ZW50cy5mb3JFYWNoKChldiwgaWR4KSA9PiB7XHJcbiAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDQ1JTsgYm9yZGVyOiAycHggc29saWQgI2NiZDVlMTsgYm9yZGVyLXJhZGl1czogOHB4OyBwYWRkaW5nOiAxNXB4OyBiYWNrZ3JvdW5kOiAjZmZmOyBib3gtc2hhZG93OiAycHggMnB4IDBweCAjOTRhM2I4OyBtYXJnaW4tYm90dG9tOiAxNXB4O1wiPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC13ZWlnaHQ6IDgwMDsgY29sb3I6ICMxZTQwYWY7IGZvbnQtc2l6ZTogMS4ycmVtOyBtYXJnaW4tYm90dG9tOiA1cHg7XCI+JHtldi55ZWFyfTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC13ZWlnaHQ6IDYwMDsgY29sb3I6ICMwZjE3MmE7IG1hcmdpbi1ib3R0b206IDhweDtcIj4ke2V2LnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAwLjk1cmVtOyBjb2xvcjogIzQ3NTU2OTtcIj4ke2V2LmRldGFpbH08L2Rpdj5cclxuICAgICAgICAgICAgJHtldi5pbWcgPyBgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgbWFyZ2luLXRvcDogMTVweDtcIj48aW1nIHNyYz1cIiR7Z2V0QXNzZXRVcmwoZXYuaW1nKX1cIiBzdHlsZT1cIm1heC13aWR0aDogNDAlOyBib3JkZXItcmFkaXVzOiA0cHg7IGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7IGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSk7XCI+PC9kaXY+YCA6ICcnfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuICAgICAgfSk7XHJcbiAgICAgIGh0bWwgKz0gYDwvZGl2PjwvZGl2PjwvZGV0YWlscz5gO1xyXG4gICAgfSBlbHNlIGlmIChsZXNzb24uZG9fbm93ICYmIGxlc3Nvbi5kb19ub3cuaXRlbXMpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB0YXVnaHQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXVnaHRVbml0cycpIHx8ICdbXScpO1xyXG4gICAgICAgIGlmICh0YXVnaHQubGVuZ3RoID4gMCAmJiB3aW5kb3cuS05PV0xFREdFX0JBTkspIHtcclxuICAgICAgICAgIGxlc3Nvbi5kb19ub3cuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0ucXVlc3Rpb24uaW5jbHVkZXMoJ1BBU1QgVE9QSUM6JykpIHtcclxuICAgICAgICAgICAgICBjb25zdCB1bml0ID0gdGF1Z2h0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRhdWdodC5sZW5ndGgpXTtcclxuICAgICAgICAgICAgICBjb25zdCBiYW5rID0gd2luZG93LktOT1dMRURHRV9CQU5LW3VuaXRdO1xyXG4gICAgICAgICAgICAgIGlmIChiYW5rICYmIGJhbmsubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZFEgPSBiYW5rW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJhbmsubGVuZ3RoKV07XHJcbiAgICAgICAgICAgICAgICBpdGVtLnF1ZXN0aW9uID0gJ1BBU1QgVE9QSUM6ICcgKyByYW5kUS5xdWVzdGlvbjtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYW5zd2VyID0gcmFuZFEuYW5zd2VyO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoKGUpIHsgY29uc29sZS5lcnJvcihlKTsgfVxyXG5cclxuICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgPGRldGFpbHMgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZmZmZmZmOyBib3JkZXI6IDEuNXB4IHNvbGlkICNlMmU4ZjA7IGJvcmRlci1yYWRpdXM6IDZweDsgbWFyZ2luLWJvdHRvbTogOHB4OyBvdmVyZmxvdzogaGlkZGVuOyBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgwLDAsMCwwLjA1KTtcIiBjbG9zZWQ+XHJcbiAgICAgICAgICAgIDxzdW1tYXJ5IHN0eWxlPVwicGFkZGluZzogMTBweCAxNXB4OyBjdXJzb3I6IHBvaW50ZXI7IGNvbG9yOiAjMGYxNzJhOyBmb250LXdlaWdodDogYm9sZDsgZm9udC1zaXplOiAxLjA1cmVtOyBiYWNrZ3JvdW5kOiAjZjhmYWZjOyBsaXN0LXN0eWxlOiBub25lOyBkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTJlOGYwO1wiPlxyXG4gICAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtbGlzdC1jaGVja1wiIHN0eWxlPVwiY29sb3I6ICMzYjgyZjY7IG1hcmdpbi1yaWdodDogMTBweDtcIj48L2k+IERvIE5vdyBUYXNrczwvc3Bhbj5cclxuICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCIgb25jbGljaz1cImV2ZW50LnByZXZlbnREZWZhdWx0KCk7IHdpbmRvdy50b2dnbGVBbGxBbnN3ZXJzKHRoaXMuY2xvc2VzdCgnZGV0YWlscycpKVwiIHN0eWxlPVwiZm9udC1zaXplOiAwLjlyZW07IHBhZGRpbmc6IDRweCAxMHB4OyBtYXJnaW4tcmlnaHQ6IDEwcHg7XCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1leWVcIj48L2k+IFJldmVhbCBBbGw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2hldnJvbi1kb3duXCIgc3R5bGU9XCJjb2xvcjogIzY0NzQ4YjtcIj48L2k+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvc3VtbWFyeT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cInBhZGRpbmc6IDIwcHg7IGRpc3BsYXk6IGdyaWQ7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjgwcHgsIDFmcikpOyBnYXA6IDE1cHg7XCI+XHJcbiAgICAgIGA7XHJcbiAgICAgIGxlc3Nvbi5kb19ub3cuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgcVRleHQgPSBpdGVtLnF1ZXN0aW9uO1xyXG4gICAgICAgIGxldCBhVGV4dCA9IGl0ZW0uYW5zd2VyO1xyXG4gICAgICAgIGlmICh3aW5kb3cuY3VycmVudFVuaXRJZCkge1xyXG4gICAgICAgICAgcVRleHQgPSBxVGV4dC5yZXBsYWNlKC9zcmM9WydcIl1hc3NldHNcXC8vZywgYHNyYz1cIi91bml0cy8ke3dpbmRvdy5jdXJyZW50VW5pdElkfS9hc3NldHMvYCk7XHJcbiAgICAgICAgICBhVGV4dCA9IGFUZXh0LnJlcGxhY2UoL3NyYz1bJ1wiXWFzc2V0c1xcLy9nLCBgc3JjPVwiL3VuaXRzLyR7d2luZG93LmN1cnJlbnRVbml0SWR9L2Fzc2V0cy9gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY2FyZElkID0gYGRvbm93LWNhcmQtJHtpbmRleH1gO1xyXG4gICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRvLW5vdy1jYXJkXCIgaWQ9XCJkby1ub3ctY2FyZC0ke2luZGV4fVwiIG9uY2xpY2s9XCJ3aW5kb3cudG9nZ2xlQW5zd2VyQnlJZCgnJHtjYXJkSWR9JylcIiBzdHlsZT1cImN1cnNvcjogcG9pbnRlcjtcIj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtd2VpZ2h0OiA3MDA7IG1hcmdpbi1ib3R0b206IDhweDtcIj5UYXNrICR7aW5kZXggKyAxfTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PiR7cVRleHR9PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnN3ZXJcIiBpZD1cIiR7Y2FyZElkfVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTsgbWFyZ2luLXRvcDogMTBweDsgcGFkZGluZzogMTBweDsgYmFja2dyb3VuZDogI2Y4ZmFmYzsgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjM2I4MmY2OyBib3JkZXItcmFkaXVzOiA0cHg7XCI+JHthVGV4dH08L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcbiAgICAgIH0pO1xyXG4gICAgICBodG1sICs9IGA8L2Rpdj48L2RldGFpbHM+YDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoYXNWb2NhYiA9IGxlc3Nvbi52b2NhYiAmJiBsZXNzb24udm9jYWIubGVuZ3RoID4gMDtcclxuICAgIGlmIChoYXNWb2NhYikge1xyXG4gICAgICBodG1sICs9IGBcclxuICAgICAgICA8ZGV0YWlscyBzdHlsZT1cImJhY2tncm91bmQ6ICNmZmZmZmY7IGJvcmRlcjogMS41cHggc29saWQgI2UyZThmMDsgYm9yZGVyLXJhZGl1czogNnB4OyBtYXJnaW4tYm90dG9tOiA4cHg7IG92ZXJmbG93OiBoaWRkZW47IGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDAsMCwwLDAuMDUpO1wiIGNsb3NlZD5cclxuICAgICAgICAgICAgPHN1bW1hcnkgc3R5bGU9XCJwYWRkaW5nOiAxMHB4IDE1cHg7IGN1cnNvcjogcG9pbnRlcjsgY29sb3I6ICNiNDUzMDk7IGZvbnQtd2VpZ2h0OiBib2xkOyBmb250LXNpemU6IDEuMDVyZW07IGJhY2tncm91bmQ6ICNmZmZiZWI7IGxpc3Qtc3R5bGU6IG5vbmU7IGRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgYWxpZ24taXRlbXM6IGNlbnRlcjsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMmU4ZjA7XCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1zcGVsbC1jaGVja1wiIHN0eWxlPVwiY29sb3I6ICNiNDUzMDk7IG1hcmdpbi1yaWdodDogMTBweDtcIj48L2k+IEtleSBWb2NhYnVsYXJ5PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2hldnJvbi1kb3duXCIgc3R5bGU9XCJjb2xvcjogIzY0NzQ4YjtcIj48L2k+XHJcbiAgICAgICAgICAgIDwvc3VtbWFyeT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cInBhZGRpbmc6IDIwcHg7XCI+XHJcbiAgICAgICAgICAgICAgPHAgc3R5bGU9XCJjb2xvcjogIzQ3NTU2OTsgbWFyZ2luLWJvdHRvbTogMjBweDsgZm9udC1zaXplOiAxLjFyZW07XCI+PHN0cm9uZz5Wb2NhYnVsYXJ5IFByYWN0aWNlOjwvc3Ryb25nPiBUYXAgYSB0ZXJtIG9uIHRoZSBsZWZ0LCB0aGVuIHRhcCBpdHMgbWF0Y2hpbmcgZGVmaW5pdGlvbiBvbiB0aGUgcmlnaHQgdG8gbWFzdGVyIHRoZSBrZXkgdm9jYWJ1bGFyeS48L3A+XHJcbiAgICAgICAgICAgICAgPGRpdiBpZD1cInZvY2FiLW1hdGNoLWdhbWVcIiBzdHlsZT1cImRpc3BsYXk6IGdyaWQ7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjsgZ2FwOiAyMHB4O1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGNoLXRlcm1zXCIgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBnYXA6IDEwcHg7XCI+XHJcbiAgICAgIGA7XHJcbiAgICAgIFxyXG4gICAgICBsZXNzb24udm9jYWIuZm9yRWFjaCgodiwgaWR4KSA9PiB7XHJcbiAgICAgICAgaHRtbCArPSBgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IG1hdGNoLXRlcm0tYnRuXCIgZGF0YS1pZHg9XCIke2lkeH1cIiBzdHlsZT1cInRleHQtYWxpZ246IGxlZnQ7IHBhZGRpbmc6IDE1cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBib3JkZXItd2lkdGg6IDJweDsgdHJhbnNpdGlvbjogYWxsIDAuMnM7XCI+JHt2LnRlcm19PC9idXR0b24+YDtcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICBodG1sICs9IGA8L2Rpdj48ZGl2IGNsYXNzPVwibWF0Y2gtZGVmc1wiIHN0eWxlPVwiZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgZ2FwOiAxMHB4O1wiPmA7XHJcbiAgICAgIFxyXG4gICAgICBsZXQgZGVmcyA9IGxlc3Nvbi52b2NhYi5tYXAoKHYsIGlkeCkgPT4gKHsgZGVmOiB2LmRlZmluaXRpb24sIGlkeDogaWR4IH0pKTtcclxuICAgICAgZGVmcy5zb3J0KCgpID0+IE1hdGgucmFuZG9tKCkgLSAwLjUpO1xyXG4gICAgICBcclxuICAgICAgZGVmcy5mb3JFYWNoKGQgPT4ge1xyXG4gICAgICAgIGh0bWwgKz0gYDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBtYXRjaC1kZWYtYnRuXCIgZGF0YS1pZHg9XCIke2QuaWR4fVwiIHN0eWxlPVwidGV4dC1hbGlnbjogbGVmdDsgcGFkZGluZzogMTVweDsgZm9udC13ZWlnaHQ6IG5vcm1hbDsgYm9yZGVyLXdpZHRoOiAycHg7IHRyYW5zaXRpb246IGFsbCAwLjJzO1wiPiR7ZC5kZWZ9PC9idXR0b24+YDtcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJ1bmxvY2stc3VjY2Vzc1wiIHN0eWxlPVwiZGlzcGxheTogbm9uZTsgbWFyZ2luLXRvcDogMjBweDsgcGFkZGluZzogMTVweDsgYmFja2dyb3VuZDogI2VjZmRmNTsgYm9yZGVyOiAycHggc29saWQgIzEwYjk4MTsgYm9yZGVyLXJhZGl1czogOHB4OyBjb2xvcjogIzA0Nzg1NzsgZm9udC13ZWlnaHQ6IGJvbGQ7IHRleHQtYWxpZ246IGNlbnRlcjsgZm9udC1zaXplOiAxLjJyZW07XCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXN0YXJcIj48L2k+IFZvY2FidWxhcnkgTWFzdGVyZWQhXHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kZXRhaWxzPlxyXG4gICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gVEFCIDI6IFRIRSBISVNUT1JZXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGh0bWwgKz0gYGA7XHJcblxyXG4gICAgbGV0IGZhbGxiYWNrRW5xdWlyeSA9IGxlc3Nvbi5lbnF1aXJ5IHx8IGxlc3Nvbi50aXRsZS5yZXBsYWNlKC9eTGVzc29uXFxzKlxcZCs6XFxzKi9pLCAnJyk7XHJcbiAgICBpZiAoZmFsbGJhY2tFbnF1aXJ5KSB7XHJcbiAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZWJmOGZmOyBib3JkZXItbGVmdDogNHB4IHNvbGlkICMzMTgyY2U7IHBhZGRpbmc6IDE1cHggMjBweDsgYm9yZGVyLXJhZGl1czogMCA4cHggOHB4IDA7IG1hcmdpbi1ib3R0b206IDIwcHg7IGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsMCwwLDAuMDUpO1wiPlxyXG4gICAgICAgICAgPGgzIHN0eWxlPVwibWFyZ2luLXRvcDogMDsgY29sb3I6ICMxZTNhOGE7IGZvbnQtc2l6ZTogMS4yNXJlbTsgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiAxMHB4OyBtYXJnaW4tYm90dG9tOiA4cHg7XCI+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtbGlnaHRidWxiXCIgc3R5bGU9XCJjb2xvcjogI2Y1OWUwYjtcIj48L2k+IEVucXVpcnkgUXVlc3Rpb25cclxuICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICA8cCBzdHlsZT1cImZvbnQtc2l6ZTogMS4xNXJlbTsgZm9udC13ZWlnaHQ6IDcwMDsgY29sb3I6ICMwZjE3MmE7IG1hcmdpbjogMDtcIj5cclxuICAgICAgICAgICAgJHtmYWxsYmFja0VucXVpcnl9XHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxlc3Nvbi5sZWFybmluZ19vYmplY3RpdmVzKSB7XHJcbiAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsZWFybmluZy1vYmplY3RpdmVzLWNhcmRcIiBzdHlsZT1cImJhY2tncm91bmQ6ICNmZmZmZmY7IGJvcmRlcjogMS41cHggc29saWQgI2UyZThmMDsgYm9yZGVyLXJhZGl1czogOHB4OyBwYWRkaW5nOiAyMHB4OyBtYXJnaW4tYm90dG9tOiAzMHB4OyBib3gtc2hhZG93OiAwIDRweCAxNXB4IHJnYmEoMCwwLDAsMC4wNSk7IGJvcmRlci10b3A6IDRweCBzb2xpZCAjMTBiOTgxO1wiPlxyXG4gICAgICAgICAgPGgzIHN0eWxlPVwibWFyZ2luLXRvcDogMDsgY29sb3I6ICMwZjE3MmE7IGZvbnQtc2l6ZTogMS4ycmVtOyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDEwcHg7XCI+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtYnVsbHNleWVcIiBzdHlsZT1cImNvbG9yOiAjMTBiOTgxO1wiPjwvaT4gTGVhcm5pbmcgT2JqZWN0aXZlc1xyXG4gICAgICAgICAgPC9oMz5cclxuICAgICAgICAgIDxwIHN0eWxlPVwiZm9udC1zaXplOiAxLjFyZW07IGZvbnQtd2VpZ2h0OiA2MDA7IGNvbG9yOiAjMWUzYThhOyBtYXJnaW4tYm90dG9tOiAxNXB4O1wiPlxyXG4gICAgICAgICAgICAke2xlc3Nvbi5sZWFybmluZ19vYmplY3RpdmVzLm92ZXJhcmNoaW5nfVxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPHVsIHN0eWxlPVwibWFyZ2luOiAwOyBwYWRkaW5nLWxlZnQ6IDIwcHg7IGNvbG9yOiAjMzM0MTU1OyBmb250LXNpemU6IDEuMDVyZW07IGxpbmUtaGVpZ2h0OiAxLjY7XCI+XHJcbiAgICAgICAgICAgICR7bGVzc29uLmxlYXJuaW5nX29iamVjdGl2ZXMuc2NhZmZvbGRlZC5tYXAob2JqID0+IGA8bGkgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiA4cHg7XCI+JHtvYmp9PC9saT5gKS5qb2luKCcnKX1cclxuICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBpZiAobGVzc29uLm5hcnJhdGl2ZV9ibG9ja3MgJiYgbGVzc29uLm5hcnJhdGl2ZV9ibG9ja3MubGVuZ3RoID4gMCkge1xyXG4gICAgICBsZXQgZW5xdWlyeVRpdGxlID0gbGVzc29uLnRpdGxlLnJlcGxhY2UoL15MZXNzb25cXHMqXFxkKzpcXHMqL2ksICcnKTtcclxuICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBoYXNlLWNhcmRcIj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IG1hcmdpbi1ib3R0b206IDIwcHg7XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaGFzZS10aXRsZVwiIHN0eWxlPVwiYm9yZGVyLWJvdHRvbTogbm9uZTsgbWFyZ2luLWJvdHRvbTogMDsgcGFkZGluZy1ib3R0b206IDA7IGNvbG9yOiAjMWUzYThhO1wiPiR7ZW5xdWlyeVRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgIGA7XHJcbiAgICAgIFxyXG4gICAgICBsZXNzb24ubmFycmF0aXZlX2Jsb2Nrcy5mb3JFYWNoKChibG9jaywgaW5kZXgpID0+IHtcclxuICAgICAgICBpZiAoYmxvY2sudHlwZSA9PT0gJ2ludGVyYWN0aXZlX21hcCcpIHtcclxuICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW50ZXJhY3RpdmUtbWFwLWNvbnRhaW5lclwiIHN0eWxlPVwibWFyZ2luOiAzMHB4IDA7IGJhY2tncm91bmQ6ICNmOGZhZmM7IGJvcmRlcjogMnB4IHNvbGlkICNjYmQ1ZTE7IGJvcmRlci1yYWRpdXM6IDEycHg7IHBhZGRpbmc6IDIwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwwLDAsMC4wNSk7XCI+XHJcbiAgICAgICAgICAgICAgPGgzIHN0eWxlPVwibWFyZ2luLXRvcDogMDsgY29sb3I6ICMxZTI5M2I7IGZvbnQtZmFtaWx5OiAnUGxheWZhaXIgRGlzcGxheScsIHNlcmlmO1wiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtbWFwLWxvY2F0aW9uLWRvdFwiPjwvaT4gSW50ZXJhY3RpdmUgSGlzdG9yaWNhbCBNYXA8L2gzPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXAtaW1nLXdyYXBwZXJcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgaGVpZ2h0OiA1MDBweDsgd2lkdGg6IDEwMCU7IGRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBhbGlnbi1pdGVtczogY2VudGVyOyBvdmVyZmxvdzogaGlkZGVuOyBtYXJnaW4tYm90dG9tOiAyMHB4OyBiYWNrZ3JvdW5kOiAjZmZmOyBib3JkZXItcmFkaXVzOiA4cHg7IGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XCI+XHJcbiAgICAgICAgICBgO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBibG9jay5tYXBzLmZvckVhY2goKG0sIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBodG1sICs9IGA8aW1nIHNyYz1cIiR7Z2V0QXNzZXRVcmwobS5zcmMpfVwiIGlkPVwibWFwLWltZy0ke20uaWR9XCIgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IG1heC13aWR0aDogMTAwJTsgbWF4LWhlaWdodDogMTAwJTsgb2JqZWN0LWZpdDogY29udGFpbjsgb3BhY2l0eTogJHtpZHggPT09IDAgPyAnMScgOiAnMCd9OyB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuNnMgZWFzZS1pbi1vdXQ7IGJvcmRlci1yYWRpdXM6IDZweDtcIj5gO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJtYXAtY2FwdGlvbi1kaXNwbGF5XCIgc3R5bGU9XCJmb250LXNpemU6IDEuMXJlbTsgZm9udC1zdHlsZTogaXRhbGljOyBjb2xvcjogIzMzNDE1NTsgbWluLWhlaWdodDogM2VtOyBtYXJnaW4tYm90dG9tOiAyMHB4O1wiPiR7YmxvY2subWFwc1swXS5jYXB0aW9ufTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXAtY29udHJvbHNcIiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBnYXA6IDEwcHg7IGZsZXgtd3JhcDogd3JhcDtcIj5cclxuICAgICAgICAgIGA7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGJsb2NrLm1hcHMuZm9yRWFjaCgobSwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUNsYXNzID0gaWR4ID09PSAwID8gJ2FjdGl2ZS1tYXAtYnRuJyA6ICcnO1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBtYXAtdG9nZ2xlLWJ0biAke2FjdGl2ZUNsYXNzfVwiIGRhdGEtbWFwLWlkPVwiJHttLmlkfVwiIGRhdGEtY2FwdGlvbj1cIiR7bS5jYXB0aW9uLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKX1cIiBvbmNsaWNrPVwidG9nZ2xlTWFwKHRoaXMpXCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOiAzMHB4OyBwYWRkaW5nOiA4cHggMTZweDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+XHJcbiAgICAgICAgICAgICAgICAgICR7bS55ZWFyfSAke20ubGFiZWx9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICBgO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYmcgPSAoaW5kZXggJSAyID09PSAwKSA/ICcjZmZmZmZmJyA6ICcjZjBmOWZmJztcclxuICAgICAgICBcclxuICAgICAgICBpZiAodHlwZW9mIGJsb2NrLnRleHQgPT09ICdzdHJpbmcnICYmIGJsb2NrLnRleHQubWF0Y2goL15cXFtLZXkgSW5kaXZpZHVhbDpcXHMqKC4rKVxcXSQvaSkpIHtcclxuICAgICAgICAgIGNvbnN0IGtpTWF0Y2ggPSBibG9jay50ZXh0Lm1hdGNoKC9eXFxbS2V5IEluZGl2aWR1YWw6XFxzKiguKylcXF0kL2kpO1xyXG4gICAgICAgICAgY29uc3QgcGVyc29uTmFtZSA9IGtpTWF0Y2hbMV0udHJpbSgpO1xyXG4gICAgICAgICAgbGV0IHBlcnNvbiA9IG51bGw7XHJcbiAgICAgICAgICBpZiAod2luZG93LmRiICYmIHdpbmRvdy5kYlt3aW5kb3cuY3VycmVudFVuaXRJZF0pIHtcclxuICAgICAgICAgICAgY29uc3QgdW5pdERiID0gd2luZG93LmRiW3dpbmRvdy5jdXJyZW50VW5pdElkXTtcclxuICAgICAgICAgICAgcGVyc29uID0gdW5pdERiLmRhdGE/LmtleV9pbmRpdmlkdWFscz8uZmluZChwID0+IHAubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHBlcnNvbk5hbWUudG9Mb3dlckNhc2UoKSkpO1xyXG4gICAgICAgICAgICBpZiAoIXBlcnNvbikgcGVyc29uID0gdW5pdERiLmJpb2dyYXBoaWVzPy5maW5kKHAgPT4gcC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocGVyc29uTmFtZS50b0xvd2VyQ2FzZSgpKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAocGVyc29uKSB7XHJcbiAgICAgICAgICAgICBjb25zdCBjYXJkSHRtbCA9IGdlbmVyYXRlS2V5SW5kaXZpZHVhbEVtYmVkSFRNTCA/IGdlbmVyYXRlS2V5SW5kaXZpZHVhbEVtYmVkSFRNTChwZXJzb24pIDogYDxkaXY+JHtwZXJzb24ubmFtZX08L2Rpdj5gO1xyXG4gICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJrZXktaW5kaXZpZHVhbC1lbWJlZFwiIHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMjBweDsgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLWdsYXNzKTsgYm9yZGVyLXJhZGl1czogOHB4OyBvdmVyZmxvdzogaGlkZGVuOyBiYWNrZ3JvdW5kOiAjZjhmYWZjOyBib3gtc2hhZG93OiAwIDJweCA1cHggcmdiYSgwLDAsMCwwLjA1KTtcIj5cclxuICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJjb25zdCBjb250ZW50ID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7IGNvbnN0IGljb24gPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5jaGV2cm9uLWljb24nKTsgaWYoY29udGVudC5zdHlsZS5kaXNwbGF5PT09J25vbmUnKXtjb250ZW50LnN0eWxlLmRpc3BsYXk9J2Jsb2NrJzsgaWNvbi5jbGFzc0xpc3QucmVwbGFjZSgnZmEtY2hldnJvbi1kb3duJywnZmEtY2hldnJvbi11cCcpO31lbHNle2NvbnRlbnQuc3R5bGUuZGlzcGxheT0nbm9uZSc7IGljb24uY2xhc3NMaXN0LnJlcGxhY2UoJ2ZhLWNoZXZyb24tdXAnLCdmYS1jaGV2cm9uLWRvd24nKTt9XCIgc3R5bGU9XCJ3aWR0aDogMTAwJTsgdGV4dC1hbGlnbjogbGVmdDsgcGFkZGluZzogMTVweCAyMHB4OyBiYWNrZ3JvdW5kOiByZ2JhKDU5LCAxMzAsIDI0NiwgMC4xKTsgYm9yZGVyOiBub25lOyBmb250LXdlaWdodDogYm9sZDsgY29sb3I6ICMxZTNhOGE7IGN1cnNvcjogcG9pbnRlcjsgZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyBhbGlnbi1pdGVtczogY2VudGVyOyBmb250LXNpemU6IDEuMDVyZW07IHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4ycztcIj5cclxuICAgICAgICAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtaWQtY2FyZC1jbGlwXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDEwcHg7IGNvbG9yOiAjM2I4MmY2O1wiPjwvaT4gS2V5IEluZGl2aWR1YWw6ICR7cGVyc29uLm5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jaGV2cm9uLWRvd24gY2hldnJvbi1pY29uXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBub25lOyBwYWRkaW5nOiAyNXB4OyBiYWNrZ3JvdW5kOiAjZmZmZmZmO1wiPlxyXG4gICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMDAlOyBtYXJnaW46IDAgYXV0bztcIj5cclxuICAgICAgICAgICAgICAgICAgICAgJHtjYXJkSHRtbH1cclxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpc1F1b3RlID0gdHlwZW9mIGJsb2NrLnRleHQgPT09ICdzdHJpbmcnICYmIGJsb2NrLnRleHQuc3RhcnRzV2l0aCgnXCInKTtcclxuICAgICAgICBsZXQgY29udGVudFN0ciA9IGlzUXVvdGUgPyBgPGVtIHN0eWxlPVwiZm9udC1zaXplOjEuMXJlbTsgY29sb3I6IzQ3NTU2OTtcIj4ke2Jsb2NrLnRleHR9PC9lbT5gIDogaGlnaGxpZ2h0R2xvc3NhcnkoYmxvY2sudGV4dCk7XHJcbiAgICAgICAgY29udGVudFN0ciA9IGZvcm1hdEJvbGQoY29udGVudFN0cik7XHJcbiAgICAgICAgY29udGVudFN0ciA9IGNvbnRlbnRTdHIucmVwbGFjZSgvXFxuL2csICc8YnIvPicpO1xyXG4gICAgICAgIGNvbnRlbnRTdHIgPSBjb250ZW50U3RyLnJlcGxhY2UoL3NyYz1bXCInXShcXC5cXC8pP2Fzc2V0c1xcLy9nLCAnc3JjPVwiLycgKyB3aW5kb3cuY3VycmVudFVuaXRJZCArICcvYXNzZXRzLycpO1xyXG4gICAgICAgIGxldCBzdHlsZWRDb250ZW50ID0gY29udGVudFN0cjtcclxuICAgICAgICBpZiAoIWlzUXVvdGUgJiYgIWNvbnRlbnRTdHIudHJpbSgpLnN0YXJ0c1dpdGgoJzwnKSAmJiBjb250ZW50U3RyLmxlbmd0aCA+IDIwKSB7XHJcbiAgICAgICAgICAgY29uc3QgZmlyc3RMZXR0ZXIgPSBjb250ZW50U3RyLmNoYXJBdCgwKTtcclxuICAgICAgICAgICBjb25zdCByZXN0ID0gY29udGVudFN0ci5zbGljZSgxKTtcclxuICAgICAgICAgICBzdHlsZWRDb250ZW50ID0gYDxzcGFuIHN0eWxlPVwiZmxvYXQ6IGxlZnQ7IGZvbnQtc2l6ZTogM3JlbTsgbGluZS1oZWlnaHQ6IDIuNXJlbTsgcGFkZGluZy10b3A6IDRweDsgcGFkZGluZy1yaWdodDogOHB4OyBwYWRkaW5nLWxlZnQ6IDNweDsgZm9udC1mYW1pbHk6ICdQbGF5ZmFpciBEaXNwbGF5Jywgc2VyaWY7IGNvbG9yOiAjMWUzYThhO1wiPiR7Zmlyc3RMZXR0ZXJ9PC9zcGFuPmAgKyByZXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgbDRTdHlsZWRDb250ZW50ID0gJyc7XHJcbiAgICAgICAgbGV0IHNpbXBsaWZ5QnRuID0gJyc7XHJcbiAgICAgICAgaWYgKGJsb2NrLmxldmVsXzQpIHtcclxuICAgICAgICAgIGxldCBsNENvbnRlbnRTdHIgPSBpc1F1b3RlID8gYDxlbSBzdHlsZT1cImZvbnQtc2l6ZToxLjFyZW07IGNvbG9yOiM0NzU1Njk7XCI+JHtibG9jay5sZXZlbF80fTwvZW0+YCA6IGhpZ2hsaWdodEdsb3NzYXJ5KGJsb2NrLmxldmVsXzQpO1xyXG4gICAgICAgICAgbDRDb250ZW50U3RyID0gZm9ybWF0Qm9sZChsNENvbnRlbnRTdHIpO1xyXG4gICAgICAgICAgbDRDb250ZW50U3RyID0gbDRDb250ZW50U3RyLnJlcGxhY2UoL1xcbi9nLCAnPGJyLz4nKTtcclxuICAgICAgICAgIGw0U3R5bGVkQ29udGVudCA9IGw0Q29udGVudFN0cjtcclxuICAgICAgICAgIGlmICghaXNRdW90ZSAmJiAhbDRDb250ZW50U3RyLnRyaW0oKS5zdGFydHNXaXRoKCc8JykgJiYgbDRDb250ZW50U3RyLmxlbmd0aCA+IDIwKSB7XHJcbiAgICAgICAgICAgICBjb25zdCBmaXJzdExldHRlciA9IGw0Q29udGVudFN0ci5jaGFyQXQoMCk7XHJcbiAgICAgICAgICAgICBjb25zdCByZXN0ID0gbDRDb250ZW50U3RyLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgbDRTdHlsZWRDb250ZW50ID0gYDxzcGFuIHN0eWxlPVwiZmxvYXQ6IGxlZnQ7IGZvbnQtc2l6ZTogM3JlbTsgbGluZS1oZWlnaHQ6IDIuNXJlbTsgcGFkZGluZy10b3A6IDRweDsgcGFkZGluZy1yaWdodDogOHB4OyBwYWRkaW5nLWxlZnQ6IDNweDsgZm9udC1mYW1pbHk6ICdQbGF5ZmFpciBEaXNwbGF5Jywgc2VyaWY7IGNvbG9yOiAjMDQ3ODU3O1wiPiR7Zmlyc3RMZXR0ZXJ9PC9zcGFuPmAgKyByZXN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2ltcGxpZnlCdG4gPSBgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IG5vLXByaW50XCIgb25jbGljaz1cIndpbmRvdy50b2dnbGVTaW1wbGlmeSh0aGlzKVwiIGRhdGEtb3JpZ2luYWw9XCIke2VuY29kZVVSSUNvbXBvbmVudChzdHlsZWRDb250ZW50KX1cIiBkYXRhLXNpbXBsaWZpZWQ9XCIke2VuY29kZVVSSUNvbXBvbmVudChsNFN0eWxlZENvbnRlbnQpfVwiIHN0eWxlPVwicGFkZGluZzogNnB4IDEwcHg7IGZsZXgtc2hyaW5rOiAwOyBtYXJnaW4tbGVmdDogNXB4OyBjb2xvcjogIzA0Nzg1NztcIiB0aXRsZT1cIlNpbXBsaWZ5IFRleHRcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNoaWxkLXJlYWNoaW5nXCI+PC9pPjwvYnV0dG9uPmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGhlbWVIZWFkaW5nSHRtbCA9ICcnO1xyXG4gICAgICAgIGlmIChibG9jay50aGVtZV9oZWFkaW5nKSB7XHJcbiAgICAgICAgICB0aGVtZUhlYWRpbmdIdG1sID0gYDxoNCBzdHlsZT1cIm1hcmdpbi10b3A6IDA7IG1hcmdpbi1ib3R0b206IDEwcHg7IGNvbG9yOiAjMWUzYThhOyBmb250LXNpemU6IDEuMTVyZW07IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTJlOGYwOyBwYWRkaW5nLWJvdHRvbTogNXB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1ib29rbWFya1wiIHN0eWxlPVwiY29sb3I6ICM2NDc0OGI7IG1hcmdpbi1yaWdodDogOHB4O1wiPjwvaT4ke2Jsb2NrLnRoZW1lX2hlYWRpbmd9PC9oND48YnIvPmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGFuZGFyZC1uYXJyYXRpdmUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJwYXJhLSR7aW5kZXggKyAxfVwiIGNsYXNzPVwibmFycmF0aXZlLWNodW5rXCIgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogZmxleC1zdGFydDsgbWFyZ2luLWJvdHRvbTogMTVweDsgcGFkZGluZzogMTVweDsgYmFja2dyb3VuZDogJHtiZ307IGJvcmRlci1yYWRpdXM6IDZweDsgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjM2I4MmY2OyB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlOyBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLDAsMCwwLjA1KTtcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFyYS1udW1iZXJcIj4ke2luZGV4ICsgMX08L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFycmF0aXZlLXRleHRcIiBzdHlsZT1cImZsZXgtZ3JvdzogMTsgbGluZS1oZWlnaHQ6IDEuNjtcIj4ke3RoZW1lSGVhZGluZ0h0bWx9JHtzdHlsZWRDb250ZW50fTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBuby1wcmludFwiIG9uY2xpY2s9XCJ3aW5kb3cucmVhZEFsb3VkVGV4dCh0aGlzKVwiIHN0eWxlPVwicGFkZGluZzogNnB4IDEwcHg7IGZsZXgtc2hyaW5rOiAwOyBtYXJnaW4tbGVmdDogMTVweDtcIiB0aXRsZT1cIlJlYWQgQWxvdWRcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLXZvbHVtZS1oaWdoXCI+PC9pPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgJHtzaW1wbGlmeUJ0bn1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBpZiAoYmxvY2subGV2ZWxfNCkge1xyXG4gICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZXZlbDQtbmFycmF0aXZlLWNvbnRhaW5lclwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGlkPVwicGFyYS1sNC0ke2luZGV4ICsgMX1cIiBjbGFzcz1cIm5hcnJhdGl2ZS1jaHVua1wiIHN0eWxlPVwiZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7IG1hcmdpbi1ib3R0b206IDE1cHg7IHBhZGRpbmc6IDE1cHg7IGJhY2tncm91bmQ6ICR7Ymd9OyBib3JkZXItcmFkaXVzOiA2cHg7IGJvcmRlci1sZWZ0OiA0cHggc29saWQgIzEwYjk4MTsgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTsgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwwLDAsMC4wNSk7XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFyYS1udW1iZXJcIiBzdHlsZT1cImJhY2tncm91bmQ6I2VjZmRmNTsgY29sb3I6IzA0Nzg1NztcIj4ke2luZGV4ICsgMX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYXJyYXRpdmUtdGV4dFwiIHN0eWxlPVwiZmxleC1ncm93OiAxOyBsaW5lLWhlaWdodDogMS42OyBmb250LXNpemU6IDEuMTVyZW07IGNvbG9yOiMxZTI5M2I7XCI+JHtsNFN0eWxlZENvbnRlbnR9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBuby1wcmludFwiIG9uY2xpY2s9XCJ3aW5kb3cucmVhZEFsb3VkVGV4dCh0aGlzKVwiIHN0eWxlPVwicGFkZGluZzogNnB4IDEwcHg7IGZsZXgtc2hyaW5rOiAwOyBtYXJnaW4tbGVmdDogMTVweDtcIiB0aXRsZT1cIlJlYWQgQWxvdWRcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLXZvbHVtZS1oaWdoXCI+PC9pPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGJsb2NrLmhpbmdlX3F1ZXN0aW9uKSB7XHJcbiAgICAgICAgICBjb25zdCBoaW5nZUlkID0gYGhpbmdlLSR7aW5kZXh9YDtcclxuICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGluZ2UtcXVlc3Rpb24tY29udGFpbmVyIG5vLXByaW50XCIgc3R5bGU9XCJtYXJnaW4tbGVmdDogNDBweDsgbWFyZ2luLWJvdHRvbTogMjVweDsgbWFyZ2luLXRvcDogLTVweDtcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBpZD1cImJ0bi0ke2hpbmdlSWR9XCIgb25jbGljaz1cImRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCcke2hpbmdlSWR9Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7IHRoaXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcIiBzdHlsZT1cImJhY2tncm91bmQ6ICMwZWE1ZTk7IGNvbG9yOiB3aGl0ZTsgYm9yZGVyOiBub25lOyBwYWRkaW5nOiA4cHggMTZweDsgYm9yZGVyLXJhZGl1czogNnB4OyBmb250LXdlaWdodDogYm9sZDsgY3Vyc29yOiBwb2ludGVyOyB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnM7XCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZXJzb24tY2lyY2xlLXF1ZXN0aW9uXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDZweDtcIj48L2k+IFJldmVhbCBDbGFzcyBRdWl6PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGRpdiBpZD1cIiR7aGluZ2VJZH1cIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7IGJhY2tncm91bmQ6ICNmMGY5ZmY7IGJvcmRlcjogMnB4IHNvbGlkICMzOGJkZjg7IHBhZGRpbmc6IDE1cHg7IGJvcmRlci1yYWRpdXM6IDhweDsgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwwLDAsMC4wNSk7XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiY29sb3I6ICMwMjg0Yzc7IGZvbnQtd2VpZ2h0OiBib2xkOyBmb250LXNpemU6IDAuOXJlbTsgbWFyZ2luLWJvdHRvbTogMTBweDsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1wiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2lyY2xlLXF1ZXN0aW9uXCI+PC9pPiBJbnRlcmFjdGl2ZSBIaW5nZSBRdWVzdGlvbjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImNvbG9yOiAjMGYxNzJhOyBmb250LXNpemU6IDEuMXJlbTsgZm9udC13ZWlnaHQ6IGJvbGQ7IG1hcmdpbi1ib3R0b206IDE1cHg7XCI+XCIke2Jsb2NrLmhpbmdlX3F1ZXN0aW9uLnRleHR9XCI8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBnYXA6IDhweDtcIj5cclxuICAgICAgICAgICAgICAgICAgJHtibG9jay5oaW5nZV9xdWVzdGlvbi5vcHRpb25zLm1hcCgob3B0LCBpKSA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBleHBsYW5hdGlvbiA9IHBhcmVudC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBwYXJlbnQuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkLmRhdGFzZXQuaW5kZXggPT0gJHtibG9jay5oaW5nZV9xdWVzdGlvbi5jb3JyZWN0X2luZGV4fSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZGNmY2U3JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjMjJjNTVlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5zdHlsZS5jb2xvciA9ICcjMTY2NTM0JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCR7aX0gIT09ICR7YmxvY2suaGluZ2VfcXVlc3Rpb24uY29ycmVjdF9pbmRleH0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZlZTJlMic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI2VmNDQ0NCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuY29sb3IgPSAnIzk5MWIxYic7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICBleHBsYW5hdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgICAgICAgICBcIiBkYXRhLWluZGV4PVwiJHtpfVwiIHN0eWxlPVwidGV4dC1hbGlnbjogbGVmdDsgYmFja2dyb3VuZDogI2ZmZmZmZjsgYm9yZGVyOiAxcHggc29saWQgI2NiZDVlMTsgY29sb3I6ICMzMzQxNTU7IHBhZGRpbmc6IDEwcHggMTVweDsgYm9yZGVyLXJhZGl1czogNnB4OyBjdXJzb3I6IHBvaW50ZXI7IHRyYW5zaXRpb246IGFsbCAwLjJzOyBmb250LXNpemU6IDFyZW07XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkOyBtYXJnaW4tcmlnaHQ6IDhweDtcIj4ke1N0cmluZy5mcm9tQ2hhckNvZGUoNjUraSl9Ljwvc3Bhbj4gJHtvcHR9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogbm9uZTsgbWFyZ2luLXRvcDogMTVweDsgcGFkZGluZzogMTJweDsgYmFja2dyb3VuZDogI2RjZmNlNzsgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjMjJjNTVlOyBjb2xvcjogIzE2NjUzNDsgZm9udC1zaXplOiAxcmVtOyBib3JkZXItcmFkaXVzOiAwIDZweCA2cHggMDtcIj5cclxuICAgICAgICAgICAgICAgICAgPHN0cm9uZz5FeHBsYW5hdGlvbjo8L3N0cm9uZz4gJHtibG9jay5oaW5nZV9xdWVzdGlvbi5leHBsYW5hdGlvbn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChibG9jay50YXNrcyAmJiBibG9jay50YXNrcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiZW1iZWRkZWQtdGFza3MtY29udGFpbmVyXCIgc3R5bGU9XCJtYXJnaW4tbGVmdDogNDBweDsgbWFyZ2luLWJvdHRvbTogMjVweDsgbWFyZ2luLXRvcDogLTVweDsgcGFkZGluZzogMTVweDsgYmFja2dyb3VuZDogI2ZmZmJlYjsgYm9yZGVyOiAycHggZGFzaGVkICNmY2QzNGQ7IGJvcmRlci1yYWRpdXM6IDZweDtcIj5gO1xyXG4gICAgICAgICAgYmxvY2sudGFza3MuZm9yRWFjaCgodGFzaywgdElkeCkgPT4ge1xyXG4gICAgICAgICAgICAgY29uc3QgcVByZWZpeCA9IHRhc2sucU51bSA/IGBRJHt0YXNrLnFOdW19LiBgIDogXCJcIjtcclxuICAgICAgICAgICAgIGNvbnN0IGFuc0lkID0gYGFucy1lbWItJHtpbmRleH0tJHt0SWR4fWA7XHJcbiAgICAgICAgICAgICBjb25zdCBzdGFydGVyQnRuID0gdGFzay5zdGFydGVyID8gYDxidXR0b24gY2xhc3M9XCJidG5cIiBvbmNsaWNrPVwid2luZG93LnRvZ2dsZVN0YXJ0ZXJCeUlkKCdzdGFydGVyLSR7YW5zSWR9JylcIiBzdHlsZT1cIm1hcmdpbi1sZWZ0OiA1cHg7IHBhZGRpbmc6IDRweCA4cHg7IGZvbnQtc2l6ZTogMC44cmVtOyBiYWNrZ3JvdW5kOiAjZTBmMmZlOyBjb2xvcjogIzAyODRjNzsgYm9yZGVyOiAxcHggc29saWQgIzdkZDNmYztcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBlblwiPjwvaT4gU3RhcnRlcjwvYnV0dG9uPmAgOiBcIlwiO1xyXG4gICAgICAgICAgICAgY29uc3Qgc3RhcnRlckRpdiA9IHRhc2suc3RhcnRlciA/IGA8ZGl2IGNsYXNzPVwic3RhcnRlci1ib3hcIiBpZD1cInN0YXJ0ZXItJHthbnNJZH1cIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7IG1hcmdpbi10b3A6IDhweDsgYmFja2dyb3VuZDogI2YwZjlmZjsgcGFkZGluZzogMTBweDsgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjMDI4NGM3OyBmb250LXN0eWxlOiBpdGFsaWM7IGNvbG9yOiAjMGM0YTZlOyB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1wiPiR7dGFzay5zdGFydGVyfTwvZGl2PmAgOiBcIlwiO1xyXG4gICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAxMHB4O1wiPlxyXG4gICAgICAgICAgICAgICAgIDxzdHJvbmc+JHtxUHJlZml4fSR7dGFzay50ZXh0fTwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIG9uY2xpY2s9XCJ3aW5kb3cudG9nZ2xlQW5zd2VyQnlJZCgnJHthbnNJZH0nKVwiIHN0eWxlPVwibWFyZ2luLWxlZnQ6IDEwcHg7IHBhZGRpbmc6IDRweCA4cHg7IGZvbnQtc2l6ZTogMC44cmVtO1wiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtZXllXCI+PC9pPiBTaG93PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgJHtzdGFydGVyQnRufVxyXG4gICAgICAgICAgICAgICAgICR7c3RhcnRlckRpdn1cclxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5zd2VyXCIgaWQ9XCIke2Fuc0lkfVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTsgbWFyZ2luLXRvcDogOHB4OyBiYWNrZ3JvdW5kOiB3aGl0ZTsgcGFkZGluZzogMTBweDsgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjYjQ1MzA5OyBmb250LXN0eWxlOiBpdGFsaWM7IGNvbG9yOiAjNDUxYTAzO1wiPiR7dGFzay5tb2RlbH08L2Rpdj5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBodG1sICs9IGA8L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAobGVzc29uLnNvdXJjZXMgJiYgbGVzc29uLnNvdXJjZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJzb3VyY2VzLWdyaWRcIiBzdHlsZT1cIm1hcmdpbi10b3A6IDIwcHg7XCI+YDtcclxuICAgICAgICBsZXNzb24uc291cmNlcy5mb3JFYWNoKHNvdXJjZSA9PiB7XHJcbiAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvdXJjZS1jYXJkXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZmZmZmZmOyBwYWRkaW5nOiAxNXB4OyBib3JkZXItcmFkaXVzOiA4cHg7IGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7IG1hcmdpbi1ib3R0b206IDIwcHg7IHRleHQtYWxpZ246IGNlbnRlcjtcIj5cclxuICAgICAgICAgICAgICAke3NvdXJjZS50aXRsZSA/IGA8aDQgc3R5bGU9XCJjb2xvcjogdmFyKC0tcHJpbWFyeSk7IG1hcmdpbi10b3A6IDA7IHRleHQtYWxpZ246IGxlZnQ7XCI+JHtzb3VyY2UudGl0bGV9PC9oND5gIDogJyd9XHJcbiAgICAgICAgICAgICAgJHtzb3VyY2Uuc3JjID8gYDxpbWcgc3JjPVwiJHtnZXRBc3NldFVybChzb3VyY2Uuc3JjKX1cIiBhbHQ9XCJTb3VyY2UgSW1hZ2VcIj5gIDogJyd9XHJcbiAgICAgICAgICAgICAgJHtzb3VyY2UuY2FwdGlvbiA/IGA8cCBjbGFzcz1cInNvdXJjZS1jYXB0aW9uXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOiBsZWZ0OyBjb2xvcjogIzQ3NTU2OTtcIj4ke3NvdXJjZS5jYXB0aW9ufTwvcD5gIDogJyd9XHJcbiAgICAgICAgICAgICAgJHtzb3VyY2UucXVlc3Rpb24gPyBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogI2ViZjhmZjsgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjMzE4MmNlOyBwYWRkaW5nOiAxNXB4OyBib3JkZXItcmFkaXVzOiAwIDRweCA0cHggMDsgdGV4dC1hbGlnbjogbGVmdDsgbWFyZ2luLXRvcDogMTVweDtcIj5cclxuICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAwOyBmb250LXNpemU6IDEuMXJlbTsgY29sb3I6ICMxZTNhOGE7XCI+PHN0cm9uZz4ke2Zvcm1hdFF1ZXN0aW9uKHNvdXJjZS5xdWVzdGlvbil9PC9zdHJvbmc+PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgYCA6ICcnfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIGA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaHRtbCArPSBgPC9kaXY+YDtcclxuICAgICAgfVxyXG4gICAgICBodG1sICs9IGA8L2Rpdj5gO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFRBQiAzOiBBUFBMSUNBVElPTlxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBodG1sICs9IGBgO1xyXG5cclxuICAgIGlmICgobGVzc29uLnRhc2tzICYmIGxlc3Nvbi50YXNrcy5sZW5ndGggPiAwKSB8fCBsZXNzb24uaGlzdG9yaWFuc19jb3JuZXIpIHtcclxuICAgICAgbGV0IGhhc01vZGVscyA9IGZhbHNlO1xyXG4gICAgICBpZiAobGVzc29uLnRhc2tzKSB7XHJcbiAgICAgICAgaGFzTW9kZWxzID0gbGVzc29uLnRhc2tzLnNvbWUodCA9PiAhIXQubW9kZWwpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChsZXNzb24uaGlzdG9yaWFuc19jb3JuZXIgJiYgbGVzc29uLmhpc3RvcmlhbnNfY29ybmVyLnN0cmV0Y2hfbW9kZWwpIHtcclxuICAgICAgICBoYXNNb2RlbHMgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCByZXZlYWxCdG4gPSBoYXNNb2RlbHMgPyBgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCIgb25jbGljaz1cInRoaXMuY2xvc2VzdCgnLnBoYXNlLWNhcmQnKS5xdWVyeVNlbGVjdG9yQWxsKCcubW9kZWwtYm94JykuZm9yRWFjaChjID0+IGMuc3R5bGUuZGlzcGxheSA9IGMuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJyA/ICdub25lJyA6ICdibG9jaycpXCIgc3R5bGU9XCJmb250LXNpemU6IDAuOXJlbTsgcGFkZGluZzogNHB4IDEwcHg7XCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1tYWduaWZ5aW5nLWdsYXNzXCI+PC9pPiBSZXZlYWwgQWxsIE1vZGVsczwvYnV0dG9uPmAgOiAnJztcclxuXHJcbiAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaGFzZS1jYXJkXCI+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgbWFyZ2luLWJvdHRvbTogMjBweDtcIj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICR7cmV2ZWFsQnRufVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgIGA7XHJcblxyXG4gICAgICBpZiAobGVzc29uLnRhc2tzICYmIGxlc3Nvbi50YXNrcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbGVzc29uLnRhc2tzLmZvckVhY2goKHRhc2ssIHRJZHgpID0+IHtcclxuICAgICAgICAgIGxldCBxVGV4dCA9IGZvcm1hdFF1ZXN0aW9uKHRhc2sudGV4dCB8fCB0YXNrLnF1ZXN0aW9uKTtcclxuICAgICAgICAgIGxldCBjbHVlUGFyYU1hdGNoID0gcVRleHQubWF0Y2goL1xcKChQfFBhcmFcXHMqKShcXGQrKVxcKSQvaSk7XHJcbiAgICAgICAgICBsZXQgY2x1ZUJ0biA9ICcnO1xyXG4gICAgICAgICAgaWYgKGNsdWVQYXJhTWF0Y2gpIHtcclxuICAgICAgICAgICAgcVRleHQgPSBxVGV4dC5yZXBsYWNlKGNsdWVQYXJhTWF0Y2hbMF0sICcnKS50cmltKCk7XHJcbiAgICAgICAgICAgIGNsdWVCdG4gPSBgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbS1pY29uXCIgdGl0bGU9XCJGaW5kIEV2aWRlbmNlXCIgb25jbGljaz1cIndpbmRvdy5zY3JvbGxUb1BhcmEoJ3BhcmEtJHtjbHVlUGFyYU1hdGNoWzJdfScpXCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1tYWduaWZ5aW5nLWdsYXNzXCI+PC9pPjwvYnV0dG9uPmA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkby1ub3ctY2FyZFwiIHN0eWxlPVwiYmFja2dyb3VuZDogI2ZmZmZmZjsgYm9yZGVyOiAxcHggc29saWQgI2UyZThmMDsgbWFyZ2luLWJvdHRvbTogMjBweDtcIj5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC13ZWlnaHQ6IDcwMDsgbWFyZ2luLWJvdHRvbTogMTJweDsgZm9udC1zaXplOiAxLjFyZW07IGNvbG9yOiAjMGYxNzJhO1wiPlxyXG4gICAgICAgICAgICAgICAgJHtxVGV4dH1cclxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWZsZXg7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XCI+XHJcbiAgICAgICAgICAgICAgICAgICR7Y2x1ZUJ0bn1cclxuICAgICAgICAgICAgICAgICAgJHt0YXNrLnN0YXJ0ZXIgPyBgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbS1pY29uXCIgdGl0bGU9XCJTZW50ZW5jZSBTdGFydGVyXCIgb25jbGljaz1cInRvZ2dsZUVsZW1lbnQoJ3N0YXJ0ZXItJHt0SWR4fScpXCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZW5cIj48L2k+PC9idXR0b24+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAke3Rhc2suY2x1ZSA/IGA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtLWljb25cIiB0aXRsZT1cIkNsdWVcIiBvbmNsaWNrPVwidG9nZ2xlRWxlbWVudCgnY2x1ZS0ke3RJZHh9JylcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWxpZ2h0YnVsYlwiPjwvaT48L2J1dHRvbj5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICR7dGFzay5tb2RlbCA/IGA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtLWljb25cIiB0aXRsZT1cIlJldmVhbCBNb2RlbCBBbnN3ZXJcIiBvbmNsaWNrPVwidG9nZ2xlRWxlbWVudCgnbW9kZWwtJHt0SWR4fScpXCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jaGVjay1kb3VibGVcIj48L2k+PC9idXR0b24+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cInN0dWRlbnQtYW5zd2VyLWlucHV0XCIgcGxhY2Vob2xkZXI9XCJXcml0ZSB5b3VyIHJlc3BvbnNlIGhlcmUuLi5cIiBvbmlucHV0PVwid2luZG93LnVwZGF0ZVByb2dyZXNzKClcIj48L3RleHRhcmVhPlxyXG5cclxuICAgICAgICAgICAgICAke3Rhc2suc3RhcnRlciA/IGA8ZGl2IGlkPVwic3RhcnRlci0ke3RJZHh9XCIgY2xhc3M9XCJzY2FmZm9sZC1ib3ggc3RhcnRlci1ib3hcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIj48c3Ryb25nPlNlbnRlbmNlIFN0YXJ0ZXI6PC9zdHJvbmc+ICR7dGFzay5zdGFydGVyfTwvZGl2PmAgOiAnJ31cclxuICAgICAgICAgICAgICAke3Rhc2suY2x1ZSA/IGA8ZGl2IGlkPVwiY2x1ZS0ke3RJZHh9XCIgY2xhc3M9XCJzY2FmZm9sZC1ib3ggY2x1ZS1ib3hcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIj48c3Ryb25nPkNsdWUgSGludDo8L3N0cm9uZz4gJHt0YXNrLmNsdWV9PC9kaXY+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICR7dGFzay5tb2RlbCA/IGA8ZGl2IGlkPVwibW9kZWwtJHt0SWR4fVwiIGNsYXNzPVwic2NhZmZvbGQtYm94IG1vZGVsLWJveFwiIHN0eWxlPVwiZGlzcGxheTpub25lO1wiPiR7Zm9ybWF0Qm9sZCh0YXNrLm1vZGVsKX08L2Rpdj5gIDogJyd9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgYDtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGxlc3Nvbi5oaXN0b3JpYW5zX2Nvcm5lcikge1xyXG4gICAgICAgIGNvbnN0IGhjID0gbGVzc29uLmhpc3RvcmlhbnNfY29ybmVyO1xyXG4gICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbi10b3A6IDMwcHg7IGJhY2tncm91bmQ6ICNmYWZhZmE7IGJvcmRlcjogMnB4IHNvbGlkICNlMmU4ZjA7IGJvcmRlci1yYWRpdXM6IDhweDsgcGFkZGluZzogMjBweDtcIj5cclxuICAgICAgICAgICAgPGgzIHN0eWxlPVwibWFyZ2luLXRvcDogMDsgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNlMmU4ZjA7IHBhZGRpbmctYm90dG9tOiAxMHB4OyBjb2xvcjogIzBmMTcyYTtcIj4ke2hjLnRpdGxlfTwvaDM+XHJcbiAgICAgICAgICAgIDxwIHN0eWxlPVwiZm9udC1zaXplOiAxLjA1cmVtOyBsaW5lLWhlaWdodDogMS42OyBjb2xvcjogIzMzNDE1NTsgbWFyZ2luLWJvdHRvbTogMjBweDtcIj4ke2Zvcm1hdEJvbGQoaGMudGV4dCB8fCAoaGMuYXV0aG9yX2NvbnRleHQgKyBcIjxicj48YnI+PGk+XCIgKyBoYy5leHRyYWN0ICsgXCI8L2k+XCIpKX08L3A+XHJcbiAgICAgICAgICAgICR7aGMuc3RyZXRjaF9xdWVzdGlvbiA/IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRvLW5vdy1jYXJkXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZmZmZmZmOyBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwOyBtYXJnaW4tYm90dG9tOiAwO1wiPlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXdlaWdodDogNzAwOyBtYXJnaW4tYm90dG9tOiAxMHB4OyBjb2xvcjogI2VmNDQ0NDtcIj5TdHJldGNoIENoYWxsZW5nZTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDEuMDVyZW07IG1hcmdpbi1ib3R0b206IDEycHg7XCI+XHJcbiAgICAgICAgICAgICAgICAke2hjLnN0cmV0Y2hfcXVlc3Rpb259XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1mbGV4OyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1wiPlxyXG4gICAgICAgICAgICAgICAgICAke2hjLnN0YXJ0ZXIgPyBgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbS1pY29uXCIgdGl0bGU9XCJTZW50ZW5jZSBTdGFydGVyXCIgb25jbGljaz1cInRvZ2dsZUVsZW1lbnQoJ2hjLXN0YXJ0ZXInKVwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuXCI+PC9pPjwvYnV0dG9uPmAgOiAnJ31cclxuICAgICAgICAgICAgICAgICAgJHtoYy5jbHVlID8gYDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc20taWNvblwiIHRpdGxlPVwiQ2x1ZVwiIG9uY2xpY2s9XCJ0b2dnbGVFbGVtZW50KCdoYy1jbHVlJylcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWxpZ2h0YnVsYlwiPjwvaT48L2J1dHRvbj5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICR7aGMuc3RyZXRjaF9tb2RlbCA/IGA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtLWljb25cIiB0aXRsZT1cIlJldmVhbCBNb2RlbCBBbnN3ZXJcIiBvbmNsaWNrPVwidG9nZ2xlRWxlbWVudCgnaGMtbW9kZWwnKVwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2hlY2stZG91YmxlXCI+PC9pPjwvYnV0dG9uPmAgOiAnJ31cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAke2hjLnN0YXJ0ZXIgPyBgPGRpdiBpZD1cImhjLXN0YXJ0ZXJcIiBjbGFzcz1cInNjYWZmb2xkLWJveCBzdGFydGVyLWJveFwiIHN0eWxlPVwiZGlzcGxheTpub25lO1wiPjxzdHJvbmc+U2VudGVuY2UgU3RhcnRlcjo8L3N0cm9uZz4gJHtoYy5zdGFydGVyfTwvZGl2PmAgOiAnJ31cclxuICAgICAgICAgICAgICAke2hjLmNsdWUgPyBgPGRpdiBpZD1cImhjLWNsdWVcIiBjbGFzcz1cInNjYWZmb2xkLWJveCBjbHVlLWJveFwiIHN0eWxlPVwiZGlzcGxheTpub25lO1wiPjxzdHJvbmc+Q2x1ZSBIaW50Ojwvc3Ryb25nPiAke2hjLmNsdWV9PC9kaXY+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICR7aGMuc3RyZXRjaF9tb2RlbCA/IGA8ZGl2IGlkPVwiaGMtbW9kZWxcIiBjbGFzcz1cInNjYWZmb2xkLWJveCBtb2RlbC1ib3hcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIj4ke2Zvcm1hdEJvbGQoaGMuc3RyZXRjaF9tb2RlbCl9PC9kaXY+YCA6ICcnfVxyXG4gICAgICAgICAgICA8L2Rpdj5gIDogJyd9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgICB9XHJcbiAgICAgIGh0bWwgKz0gYDwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxlc3Nvbi5wYWlyX3NoYXJlKSB7XHJcbiAgICAgIGNvbnN0IHBzID0gbGVzc29uLnBhaXJfc2hhcmU7XHJcbiAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgIDxkZXRhaWxzIHN0eWxlPVwiYmFja2dyb3VuZDogI2ZmZmZmZjsgYm9yZGVyOiAxLjVweCBzb2xpZCAjZTJlOGYwOyBib3JkZXItcmFkaXVzOiA2cHg7IG1hcmdpbi1ib3R0b206IDE1cHg7IG92ZXJmbG93OiBoaWRkZW47IGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDAsMCwwLDAuMDUpO1wiIGNsb3NlZD5cclxuICAgICAgICAgICAgPHN1bW1hcnkgc3R5bGU9XCJwYWRkaW5nOiAxMHB4IDE1cHg7IGN1cnNvcjogcG9pbnRlcjsgY29sb3I6ICMwNTk2Njk7IGZvbnQtd2VpZ2h0OiBib2xkOyBmb250LXNpemU6IDEuMDVyZW07IGJhY2tncm91bmQ6ICNlY2ZkZjU7IGxpc3Qtc3R5bGU6IG5vbmU7IGRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgYWxpZ24taXRlbXM6IGNlbnRlcjsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNhN2YzZDA7XCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS11c2Vyc1wiIHN0eWxlPVwiY29sb3I6ICMwNTk2Njk7IG1hcmdpbi1yaWdodDogMTBweDtcIj48L2k+IFRoaW5rLCBQYWlyLCBTaGFyZTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNoZXZyb24tZG93blwiIHN0eWxlPVwiY29sb3I6ICMwNTk2Njk7XCI+PC9pPlxyXG4gICAgICAgICAgICA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJwYWRkaW5nOiAyMHB4OyBiYWNrZ3JvdW5kOiAjZWNmZGY1O1wiPlxyXG4gICAgICAgICAgICAgIDxwIHN0eWxlPVwiZm9udC1zaXplOiAxLjE1cmVtOyBmb250LXdlaWdodDogNzAwOyBjb2xvcjogIzA2NWY0NjsgbWFyZ2luLXRvcDogMDtcIj4ke3BzLnByb21wdH08L3A+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGdyaWQ7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjAwcHgsIDFmcikpOyBnYXA6IDE1cHg7IG1hcmdpbi10b3A6IDIwcHg7XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogd2hpdGU7IHBhZGRpbmc6IDE1cHg7IGJvcmRlci1yYWRpdXM6IDZweDsgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4xKTtcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkOyBjb2xvcjogIzA1OTY2OTsgbWFyZ2luLWJvdHRvbTogOHB4O1wiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtYnJhaW5cIj48L2k+IDEuIFRoaW5rPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxwIHN0eWxlPVwibWFyZ2luOiAwOyBmb250LXNpemU6IDAuOTVyZW07IGNvbG9yOiAjNDc1NTY5O1wiPiR7cHMudGhpbmt9PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogd2hpdGU7IHBhZGRpbmc6IDE1cHg7IGJvcmRlci1yYWRpdXM6IDZweDsgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4xKTtcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkOyBjb2xvcjogIzA1OTY2OTsgbWFyZ2luLWJvdHRvbTogOHB4O1wiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtY29tbWVudHNcIj48L2k+IDIuIFBhaXI8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW46IDA7IGZvbnQtc2l6ZTogMC45NXJlbTsgY29sb3I6ICM0NzU1Njk7XCI+JHtwcy5wYWlyfTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6IHdoaXRlOyBwYWRkaW5nOiAxNXB4OyBib3JkZXItcmFkaXVzOiA2cHg7IGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMSk7XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXdlaWdodDogYm9sZDsgY29sb3I6ICMwNTk2Njk7IG1hcmdpbi1ib3R0b206IDhweDtcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLXVzZXJzXCI+PC9pPiAzLiBTaGFyZTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8cCBzdHlsZT1cIm1hcmdpbjogMDsgZm9udC1zaXplOiAwLjk1cmVtOyBjb2xvcjogIzQ3NTU2OTtcIj4ke3BzLnNoYXJlfTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGV0YWlscz5cclxuICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGVzc29uLmZsYXNoY2FyZHMgJiYgbGVzc29uLmZsYXNoY2FyZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICBodG1sICs9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGhhc2UtY2FyZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBoYXNlLXRpdGxlXCI+Q29uc29saWRhdGlvbiAmIFJlY2FsbDwvZGl2PlxyXG4gICAgICAgICAgPHAgc3R5bGU9XCJjb2xvcjogIzY2NjsgbWFyZ2luLWJvdHRvbTogMjBweDtcIj5UYXAgYSBjYXJkIHRvIGZsaXAgaXQgYW5kIHJldmVhbCB0aGUgZGVmaW5pdGlvbi48L3A+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxhc2hjYXJkLWRlY2tcIj5cclxuICAgICAgYDtcclxuICAgICAgbGVzc29uLmZsYXNoY2FyZHMuZm9yRWFjaChmYyA9PiB7XHJcbiAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxhc2hjYXJkLXdyYXBwZXJcIiBvbmNsaWNrPVwidGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdmbGlwcGVkJylcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsYXNoY2FyZC1pbm5lclwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGFzaGNhcmQtZmFjZSBmbGFzaGNhcmQtZnJvbnRcIj5cclxuICAgICAgICAgICAgICAgIDxoND4ke2ZjLnRlcm19PC9oND5cclxuICAgICAgICAgICAgICAgIDxwPlRhcCB0byByZXZlYWw8L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsYXNoY2FyZC1mYWNlIGZsYXNoY2FyZC1iYWNrXCI+XHJcbiAgICAgICAgICAgICAgICAke2ZjLmRlZmluaXRpb259XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuICAgICAgfSk7XHJcbiAgICAgIGh0bWwgKz0gYDwvZGl2PjwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxlc3Nvbi5leHRlbmRlZCB8fCBsZXNzb24uZGViYXRlX3ByZXApIHtcclxuICAgICAgbGV0IGV4dEh0bWwgPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBoYXNlLWNhcmRcIj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kOyBhbGlnbi1pdGVtczogY2VudGVyOyBtYXJnaW4tYm90dG9tOiAyMHB4O1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGhhc2UtdGl0bGVcIiBzdHlsZT1cImJvcmRlci1ib3R0b206IG5vbmU7IG1hcmdpbi1ib3R0b206IDA7IHBhZGRpbmctYm90dG9tOiAwO1wiPkV4dGVuZGVkIFNjaG9sYXJzaGlwPC9kaXY+XHJcbiAgICAgICAgICAgICR7bGVzc29uLmV4dGVuZGVkICYmIChsZXNzb24uZXh0ZW5kZWQubW9kZWwgfHwgbGVzc29uLmV4dGVuZGVkLmFuc3dlcikgPyBgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCIgb25jbGljaz1cInRvZ2dsZUVsZW1lbnQoJ2V4dGVuZGVkLW1vZGVsLSR7bGVzc29uLmlkfScpXCIgc3R5bGU9XCJmb250LXNpemU6IDAuOXJlbTsgcGFkZGluZzogNHB4IDEwcHg7XCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jaGVjay1kb3VibGVcIj48L2k+IFJldmVhbCBNb2RlbCBBbnN3ZXI8L2J1dHRvbj5gIDogJyd9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgYDtcclxuXHJcbiAgICAgIGlmIChsZXNzb24uZGViYXRlX3ByZXApIHtcclxuICAgICAgICBjb25zdCBkcCA9IGxlc3Nvbi5kZWJhdGVfcHJlcDtcclxuICAgICAgICBjb25zdCBhbGxBcmdzID0gWy4uLmRwLmFyZ3VtZW50c19mb3IubWFwKGE9Pih7dDphLCBzOidmb3InfSkpLCAuLi5kcC5hcmd1bWVudHNfYWdhaW5zdC5tYXAoYT0+KHt0OmEsIHM6J2FnYWluc3QnfSkpXS5zb3J0KCgpID0+IE1hdGgucmFuZG9tKCkgLSAwLjUpO1xyXG4gICAgICAgIGNvbnN0IGFyZ3NIdG1sID0gYWxsQXJncy5tYXAoKGFyZywgaWR4KSA9PiBgPGRpdiBjbGFzcz1cImRlYmF0ZS1jYXJkXCIgZHJhZ2dhYmxlPVwidHJ1ZVwiIG9uZHJhZ3N0YXJ0PVwid2luZG93LmRyYWdEZWJhdGUoZXZlbnQpXCIgaWQ9XCJkZWJhdGUtYXJnLSR7bGVzc29uLmlkfS0ke2lkeH1cIiBkYXRhLXNpZGU9XCIke2FyZy5zfVwiIHN0eWxlPVwiYmFja2dyb3VuZDogI2Y4ZmFmYzsgYm9yZGVyOiAxcHggc29saWQgI2NiZDVlMTsgcGFkZGluZzogMTBweDsgbWFyZ2luLWJvdHRvbTogOHB4OyBib3JkZXItcmFkaXVzOiA2cHg7IGN1cnNvcjogZ3JhYjtcIj4ke2FyZy50fTwvZGl2PmApLmpvaW4oJycpO1xyXG5cclxuICAgICAgICBleHRIdG1sICs9IGBcclxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZWZmNmZmOyBib3JkZXI6IDFweCBzb2xpZCAjYmZkYmZlOyBib3JkZXItcmFkaXVzOiA4cHg7IHBhZGRpbmc6IDIwcHg7IG1hcmdpbi1ib3R0b206IDMwcHg7XCI+XHJcbiAgICAgICAgICAgIDxoMyBzdHlsZT1cIm1hcmdpbi10b3A6IDA7IGNvbG9yOiAjMWUzYThhO1wiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtc2NhbGUtYmFsYW5jZWRcIj48L2k+IERlYmF0ZSBQcmVwOiAke2RwLnF1ZXN0aW9ufTwvaDM+XHJcbiAgICAgICAgICAgIDxwIHN0eWxlPVwiY29sb3I6ICM0NzU1Njk7IGZvbnQtc2l6ZTogMC45NXJlbTtcIj5EcmFnIGFuZCBkcm9wIHRoZSBldmlkZW5jZSBjYXJkcyBiZWxvdyBpbnRvIHRoZSBjb3JyZWN0IGNvbHVtbnMgdG8gcHJlcGFyZSB5b3VyIGFyZ3VtZW50cyBiZWZvcmUgd3JpdGluZyB5b3VyIGVzc2F5LjwvcD5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJkZWJhdGUtYmFuay0ke2xlc3Nvbi5pZH1cIiBjbGFzcz1cImRlYmF0ZS1kcm9wem9uZVwiIG9uZHJhZ292ZXI9XCJ3aW5kb3cuYWxsb3dEcm9wKGV2ZW50KVwiIG9uZHJvcD1cIndpbmRvdy5kcm9wRGViYXRlKGV2ZW50KVwiIHN0eWxlPVwiYmFja2dyb3VuZDogd2hpdGU7IGJvcmRlcjogMnB4IGRhc2hlZCAjOTRhM2I4OyBwYWRkaW5nOiAxNXB4OyBib3JkZXItcmFkaXVzOiA4cHg7IG1hcmdpbi1ib3R0b206IDIwcHg7IG1pbi1oZWlnaHQ6IDgwcHg7XCI+XHJcbiAgICAgICAgICAgICAgJHthcmdzSHRtbH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZ3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyOyBnYXA6IDIwcHg7XCI+XHJcbiAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxoNCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgY29sb3I6ICMxNmEzNGE7IG1hcmdpbi10b3A6IDA7XCI+QWdyZWU8L2g0PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cImRlYmF0ZS1mb3ItJHtsZXNzb24uaWR9XCIgY2xhc3M9XCJkZWJhdGUtZHJvcHpvbmVcIiBkYXRhLXRhcmdldD1cImZvclwiIG9uZHJhZ292ZXI9XCJ3aW5kb3cuYWxsb3dEcm9wKGV2ZW50KVwiIG9uZHJvcD1cIndpbmRvdy5kcm9wRGViYXRlKGV2ZW50KVwiIHN0eWxlPVwiYmFja2dyb3VuZDogd2hpdGU7IGJvcmRlcjogMnB4IGRhc2hlZCAjODZlZmFjOyBwYWRkaW5nOiAxNXB4OyBib3JkZXItcmFkaXVzOiA4cHg7IG1pbi1oZWlnaHQ6IDE1MHB4O1wiPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8aDQgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IGNvbG9yOiAjZGMyNjI2OyBtYXJnaW4tdG9wOiAwO1wiPkRpc2FncmVlPC9oND5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJkZWJhdGUtYWdhaW5zdC0ke2xlc3Nvbi5pZH1cIiBjbGFzcz1cImRlYmF0ZS1kcm9wem9uZVwiIGRhdGEtdGFyZ2V0PVwiYWdhaW5zdFwiIG9uZHJhZ292ZXI9XCJ3aW5kb3cuYWxsb3dEcm9wKGV2ZW50KVwiIG9uZHJvcD1cIndpbmRvdy5kcm9wRGViYXRlKGV2ZW50KVwiIHN0eWxlPVwiYmFja2dyb3VuZDogd2hpdGU7IGJvcmRlcjogMnB4IGRhc2hlZCAjZmNhNWE1OyBwYWRkaW5nOiAxNXB4OyBib3JkZXItcmFkaXVzOiA4cHg7IG1pbi1oZWlnaHQ6IDE1MHB4O1wiPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgbWFyZ2luLXRvcDogMTVweDtcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25jbGljaz1cIndpbmRvdy5jaGVja0RlYmF0ZSgnJHtsZXNzb24uaWR9JylcIj5DaGVjayBBbnN3ZXJzPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGRpdiBpZD1cImRlYmF0ZS1mZWVkYmFjay0ke2xlc3Nvbi5pZH1cIiBzdHlsZT1cIm1hcmdpbi10b3A6IDEwcHg7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChsZXNzb24uZXh0ZW5kZWQgJiYgKGxlc3Nvbi5leHRlbmRlZC5wYXJhZ3JhcGhzIHx8IGxlc3Nvbi5leHRlbmRlZC50aXRsZSkpIHtcclxuICAgICAgICBpZiAobGVzc29uLmV4dGVuZGVkLnRpdGxlKSB7XHJcbiAgICAgICAgICBleHRIdG1sICs9IGA8aDMgc3R5bGU9XCJjb2xvcjogIzBmMTcyYTtcIj4ke2xlc3Nvbi5leHRlbmRlZC50aXRsZX08L2gzPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsZXNzb24uZXh0ZW5kZWQucGFyYWdyYXBocykge1xyXG4gICAgICAgICAgbGVzc29uLmV4dGVuZGVkLnBhcmFncmFwaHMuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgIGV4dEh0bWwgKz0gYDxwIHN0eWxlPVwiY29sb3I6ICMzMzQxNTU7IGZvbnQtc2l6ZTogMS4wNXJlbTsgbGluZS1oZWlnaHQ6IDEuNjtcIj4ke2Zvcm1hdEJvbGQocCl9PC9wPmA7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZXh0SHRtbCArPSBgPC9kaXY+YDtcclxuICAgICAgXHJcbiAgICAgIGlmIChsZXNzb24uZGViYXRlX3ByZXAgfHwgKGxlc3Nvbi5leHRlbmRlZCAmJiAobGVzc29uLmV4dGVuZGVkLnBhcmFncmFwaHMgfHwgbGVzc29uLmV4dGVuZGVkLnRpdGxlKSkpIHtcclxuICAgICAgICAgaHRtbCArPSBleHRIdG1sO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxlc3Nvbi5nY3NlX3Rhc2sgfHwgKGxlc3Nvbi5leHRlbmRlZCAmJiBsZXNzb24uZXh0ZW5kZWQucXVlc3Rpb24pIHx8IGV4dHJhY3RlZEV4YW1UYXNrcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGxldCBnY3NlSHRtbCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGhhc2UtY2FyZFwiPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IG1hcmdpbi1ib3R0b206IDIwcHg7XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaGFzZS10aXRsZVwiIHN0eWxlPVwiYm9yZGVyLWJvdHRvbTogbm9uZTsgbWFyZ2luLWJvdHRvbTogMDsgcGFkZGluZy1ib3R0b206IDA7IGNvbG9yOiAjYjQ1MzA5O1wiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtZ3JhZHVhdGlvbi1jYXBcIj48L2k+ICR7d2luZG93LnVuaXREYXRhICYmIHdpbmRvdy51bml0RGF0YS50aXRsZSAmJiB3aW5kb3cudW5pdERhdGEudGl0bGUuaW5jbHVkZXMoJ0tTMycpID8gJ0Fzc2Vzc21lbnQgUHJhY3RpY2UnIDogJ0Fzc2Vzc21lbnQgUHJhY3RpY2UnfTwvZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBvbmNsaWNrPVwidGhpcy5jbG9zZXN0KCcucGhhc2UtY2FyZCcpLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RlbC1ib3gnKS5mb3JFYWNoKGMgPT4gYy5zdHlsZS5kaXNwbGF5ID0gYy5zdHlsZS5kaXNwbGF5ID09PSAnYmxvY2snID8gJ25vbmUnIDogJ2Jsb2NrJylcIiBzdHlsZT1cImZvbnQtc2l6ZTogMC45cmVtOyBwYWRkaW5nOiA0cHggMTBweDtcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLW1hZ25pZnlpbmctZ2xhc3NcIj48L2k+IFJldmVhbCBNb2RlbHM8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICBgO1xyXG5cclxuICAgICAgaWYgKGxlc3Nvbi5leHRlbmRlZCAmJiBsZXNzb24uZXh0ZW5kZWQucXVlc3Rpb24pIHtcclxuICAgICAgICBsZXQgaGludHNIdG1sID0gJyc7XHJcbiAgICAgICAgaWYgKGxlc3Nvbi5leHRlbmRlZC5oaW50cyAmJiBsZXNzb24uZXh0ZW5kZWQuaGludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgIGhpbnRzSHRtbCA9IGA8ZGl2IHN0eWxlPVwibWFyZ2luLXRvcDogMTVweDsgcGFkZGluZzogMTBweDsgYmFja2dyb3VuZDogI2ZmZmJlYjsgYm9yZGVyOiAxcHggc29saWQgI2ZkZTY4YTsgYm9yZGVyLXJhZGl1czogNnB4O1wiPjxzdHJvbmcgc3R5bGU9XCJjb2xvcjogI2Q5NzcwNjtcIj5IaW50czo8L3N0cm9uZz48dWwgc3R5bGU9XCJtYXJnaW46IDVweCAwIDAgMDsgY29sb3I6ICM5MjQwMGU7XCI+JHtsZXNzb24uZXh0ZW5kZWQuaGludHMubWFwKGggPT4gYDxsaT4ke2Zvcm1hdEJvbGQoaCl9PC9saT5gKS5qb2luKCcnKX08L3VsPjwvZGl2PmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc291cmNlSHRtbCA9ICcnO1xyXG4gICAgICAgIGlmIChsZXNzb24uZXh0ZW5kZWQuc291cmNlX2EgfHwgbGVzc29uLmV4dGVuZGVkLnNvdXJjZV9iKSB7XHJcbiAgICAgICAgICBzb3VyY2VIdG1sID0gYDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBnYXA6IDIwcHg7IG1hcmdpbjogMTVweCAwO1wiPmA7XHJcbiAgICAgICAgICBpZiAobGVzc29uLmV4dGVuZGVkLnNvdXJjZV9hKSB7XHJcbiAgICAgICAgICAgICBjb25zdCBwcm92ID0gdHlwZW9mIGxlc3Nvbi5leHRlbmRlZC5zb3VyY2VfYSA9PT0gJ3N0cmluZycgPyAnJyA6IGxlc3Nvbi5leHRlbmRlZC5zb3VyY2VfYS5wcm92ZW5hbmNlO1xyXG4gICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHR5cGVvZiBsZXNzb24uZXh0ZW5kZWQuc291cmNlX2EgPT09ICdzdHJpbmcnID8gbGVzc29uLmV4dGVuZGVkLnNvdXJjZV9hIDogbGVzc29uLmV4dGVuZGVkLnNvdXJjZV9hLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgICBzb3VyY2VIdG1sICs9IGBcclxuICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZsZXg6IDE7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGZvbnQtc2l6ZTogMC45NXJlbTsgbGluZS1oZWlnaHQ6IDEuNTtcIj5cclxuICAgICAgICAgICAgICAgICA8c3Ryb25nIHN0eWxlPVwiY29sb3I6ICMxZTNhOGE7IGRpc3BsYXk6IGJsb2NrOyBtYXJnaW4tYm90dG9tOiA4cHg7IGZvbnQtc2l6ZTogMS4xcmVtO1wiPlNvdXJjZSBBPC9zdHJvbmc+XHJcbiAgICAgICAgICAgICAgICAgJHtwcm92ID8gYDxzcGFuIHN0eWxlPVwiY29sb3I6ICMzMzQxNTU7IGRpc3BsYXk6IGJsb2NrOyBtYXJnaW4tYm90dG9tOiAxNXB4OyBmb250LXN0eWxlOiBpdGFsaWM7XCI+JHtwcm92fTwvc3Bhbj5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImJvcmRlcjogMS41cHggc29saWQgI2NiZDVlMTsgYm9yZGVyLXJhZGl1czogMTJweDsgcGFkZGluZzogMjBweDsgYmFja2dyb3VuZDogI2ZmZmZmZjsgY29sb3I6ICMwZjE3MmE7IGZsZXgtZ3JvdzogMTtcIj5cclxuICAgICAgICAgICAgICAgICAgICR7Y29udGVudC5yZXBsYWNlKC9cXG4vZywgJzxicj4nKX1cclxuICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChsZXNzb24uZXh0ZW5kZWQuc291cmNlX2IpIHtcclxuICAgICAgICAgICAgIGNvbnN0IHByb3YgPSB0eXBlb2YgbGVzc29uLmV4dGVuZGVkLnNvdXJjZV9iID09PSAnc3RyaW5nJyA/ICcnIDogbGVzc29uLmV4dGVuZGVkLnNvdXJjZV9iLnByb3ZlbmFuY2U7XHJcbiAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdHlwZW9mIGxlc3Nvbi5leHRlbmRlZC5zb3VyY2VfYiA9PT0gJ3N0cmluZycgPyBsZXNzb24uZXh0ZW5kZWQuc291cmNlX2IgOiBsZXNzb24uZXh0ZW5kZWQuc291cmNlX2IuY29udGVudDtcclxuICAgICAgICAgICAgIHNvdXJjZUh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleDogMTsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgZm9udC1zaXplOiAwLjk1cmVtOyBsaW5lLWhlaWdodDogMS41O1wiPlxyXG4gICAgICAgICAgICAgICAgIDxzdHJvbmcgc3R5bGU9XCJjb2xvcjogIzFlM2E4YTsgZGlzcGxheTogYmxvY2s7IG1hcmdpbi1ib3R0b206IDhweDsgZm9udC1zaXplOiAxLjFyZW07XCI+U291cmNlIEI8L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgICAke3Byb3YgPyBgPHNwYW4gc3R5bGU9XCJjb2xvcjogIzMzNDE1NTsgZGlzcGxheTogYmxvY2s7IG1hcmdpbi1ib3R0b206IDE1cHg7IGZvbnQtc3R5bGU6IGl0YWxpYztcIj4ke3Byb3Z9PC9zcGFuPmAgOiAnJ31cclxuICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiYm9yZGVyOiAxLjVweCBzb2xpZCAjY2JkNWUxOyBib3JkZXItcmFkaXVzOiAxMnB4OyBwYWRkaW5nOiAyMHB4OyBiYWNrZ3JvdW5kOiAjZmZmZmZmOyBjb2xvcjogIzBmMTcyYTsgZmxleC1ncm93OiAxO1wiPlxyXG4gICAgICAgICAgICAgICAgICAgJHtjb250ZW50LnJlcGxhY2UoL1xcbi9nLCAnPGJyPicpfVxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc291cmNlSHRtbCArPSBgPC9kaXY+YDtcclxuICAgICAgICAgIGlmIChsZXNzb24uZXh0ZW5kZWQucHJvdmVuYW5jZV9jbHVlKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZUh0bWwgKz0gYDxkZXRhaWxzIHN0eWxlPVwibWFyZ2luLXRvcDogMTVweDsgYmFja2dyb3VuZDogI2YwZmRmNDsgYm9yZGVyOiAxcHggc29saWQgI2JiZjdkMDsgYm9yZGVyLXJhZGl1czogNnB4OyBvdmVyZmxvdzogaGlkZGVuO1wiPlxyXG4gICAgICAgICAgICAgIDxzdW1tYXJ5IHN0eWxlPVwicGFkZGluZzogMTJweDsgY3Vyc29yOiBwb2ludGVyOyBjb2xvcjogIzE2NjUzNDsgZm9udC13ZWlnaHQ6IGJvbGQ7IGxpc3Qtc3R5bGU6IG5vbmU7XCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLW1hZ25pZnlpbmctZ2xhc3NcIiBzdHlsZT1cIm1hcmdpbi1yaWdodDogNXB4O1wiPjwvaT4gQ2xpY2sgdG8gUmV2ZWFsIFByb3ZlbmFuY2UgU2NhZmZvbGRpbmcgQ2x1ZXNcclxuICAgICAgICAgICAgICA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cInBhZGRpbmc6IDAgMTJweCAxMnB4IDEycHg7IGNvbG9yOiAjMTU4MDNkOyBib3JkZXItdG9wOiAxcHggc29saWQgI2JiZjdkMDsgbWFyZ2luLXRvcDogNXB4OyBwYWRkaW5nLXRvcDogMTJweDtcIj5cclxuICAgICAgICAgICAgICAgICR7bGVzc29uLmV4dGVuZGVkLnByb3ZlbmFuY2VfY2x1ZX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kZXRhaWxzPmA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnY3NlSHRtbCArPSBgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZG8tbm93LWNhcmRcIiBzdHlsZT1cImJhY2tncm91bmQ6ICNmZmZmZmY7IGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7IG1hcmdpbi1ib3R0b206IDIwcHg7XCI+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXdlaWdodDogNzAwOyBtYXJnaW4tYm90dG9tOiAxMnB4OyBmb250LXNpemU6IDEuMXJlbTsgY29sb3I6ICMwZjE3MmE7XCI+XHJcbiAgICAgICAgICAgICAgJHtmb3JtYXRRdWVzdGlvbihsZXNzb24uZXh0ZW5kZWQucXVlc3Rpb24pfVxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWZsZXg7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XCI+XHJcbiAgICAgICAgICAgICAgICAke2xlc3Nvbi5leHRlbmRlZC5tb2RlbCB8fCBsZXNzb24uZXh0ZW5kZWQuYW5zd2VyID8gYDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc20taWNvblwiIHRpdGxlPVwiUmV2ZWFsIE1vZGVsIEFuc3dlclwiIG9uY2xpY2s9XCJ0b2dnbGVFbGVtZW50KCdleHRlbmRlZC1tb2RlbC0ke2xlc3Nvbi5pZH0nKVwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2hlY2stZG91YmxlXCI+PC9pPjwvYnV0dG9uPmAgOiAnJ31cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAke3NvdXJjZUh0bWx9XHJcbiAgICAgICAgICAgICR7aGludHNIdG1sfVxyXG4gICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJzdHVkZW50LWFuc3dlci1pbnB1dFwiIHN0eWxlPVwibWluLWhlaWdodDogMjAwcHg7XCIgcGxhY2Vob2xkZXI9XCJXcml0ZSB5b3VyIGV4dGVuZGVkIHJlc3BvbnNlIGhlcmUuLi5cIiBvbmlucHV0PVwid2luZG93LnVwZGF0ZVByb2dyZXNzKClcIj48L3RleHRhcmVhPlxyXG4gICAgICAgICAgICAke2xlc3Nvbi5leHRlbmRlZC5tb2RlbCB8fCBsZXNzb24uZXh0ZW5kZWQuYW5zd2VyID8gYDxkaXYgaWQ9XCJleHRlbmRlZC1tb2RlbC0ke2xlc3Nvbi5pZH1cIiBjbGFzcz1cInNjYWZmb2xkLWJveCBtb2RlbC1ib3hcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTsgbWFyZ2luLXRvcDogMTVweDtcIj4ke2Zvcm1hdEJvbGQobGVzc29uLmV4dGVuZGVkLm1vZGVsIHx8IGxlc3Nvbi5leHRlbmRlZC5hbnN3ZXIpfTwvZGl2PmAgOiAnJ31cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChsZXNzb24uZ2NzZV90YXNrKSB7XHJcbiAgICAgICAgaWYgKGxlc3Nvbi5nY3NlX3Rhc2sudGFza3MpIHtcclxuICAgICAgICAgIGxlc3Nvbi5nY3NlX3Rhc2sudGFza3MuZm9yRWFjaCgodGFzaywgdElkeCkgPT4ge1xyXG4gICAgICAgICAgICBnY3NlSHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRvLW5vdy1jYXJkXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZmZmZmZmOyBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwOyBtYXJnaW4tYm90dG9tOiAyMHB4O1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtd2VpZ2h0OiA3MDA7IG1hcmdpbi1ib3R0b206IDEycHg7IGZvbnQtc2l6ZTogMS4xcmVtOyBjb2xvcjogIzBmMTcyYTtcIj5cclxuICAgICAgICAgICAgICAgICAgJHtmb3JtYXRRdWVzdGlvbih0YXNrLnRleHQgfHwgdGFzay5xdWVzdGlvbil9XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWZsZXg7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgJHt0YXNrLm1vZGVsID8gYDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc20taWNvblwiIHRpdGxlPVwiUmV2ZWFsIE1vZGVsIEFuc3dlclwiIG9uY2xpY2s9XCJ0b2dnbGVFbGVtZW50KCdnY3NlLW1vZGVsLSR7dElkeH0nKVwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2hlY2stZG91YmxlXCI+PC9pPjwvYnV0dG9uPmAgOiAnJ31cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJzdHVkZW50LWFuc3dlci1pbnB1dFwiIHN0eWxlPVwibWluLWhlaWdodDogJHsodGFzay50ZXh0IHx8IHRhc2sucXVlc3Rpb24gfHwgXCJcIikuaW5jbHVkZXMoXCIxMiBtYXJrc1wiKSB8fCAodGFzay50ZXh0IHx8IHRhc2sucXVlc3Rpb24gfHwgXCJcIikuaW5jbHVkZXMoXCIxNiBtYXJrc1wiKSA/IFwiMjAwcHhcIiA6IFwiMTAwcHhcIn07XCIgcGxhY2Vob2xkZXI9XCJXcml0ZSB5b3VyIHJlc3BvbnNlIGhlcmUuLi5cIiBvbmlucHV0PVwid2luZG93LnVwZGF0ZVByb2dyZXNzKClcIj48L3RleHRhcmVhPlxyXG4gICAgICAgICAgICAgICAgJHt0YXNrLm1vZGVsID8gYDxkaXYgaWQ9XCJnY3NlLW1vZGVsLSR7dElkeH1cIiBjbGFzcz1cInNjYWZmb2xkLWJveCBtb2RlbC1ib3hcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTsgbWFyZ2luLXRvcDogMTVweDtcIj4ke2Zvcm1hdEJvbGQodGFzay5tb2RlbCl9PC9kaXY+YCA6ICcnfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZXNzb24uZ2NzZV90YXNrLnNvdXJjZXMpIHtcclxuICAgICAgICAgICBsZXQgdG9waWNUZXh0ID0gbGVzc29uLmdjc2VfdGFzay50b3BpYyB8fCAnJztcclxuICAgICAgICAgICBsZXQgaXNOYXJyYXRpdmUgPSB0b3BpY1RleHQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcIndyaXRlIGEgbmFycmF0aXZlIGFjY291bnRcIik7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgaWYgKGlzTmFycmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgIGdjc2VIdG1sICs9IGA8cCBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkOyBmb250LXNpemU6IDEuMTVyZW07IGNvbG9yOiAjMWUzYThhO1wiPiR7dG9waWNUZXh0fTwvcD5gO1xyXG4gICAgICAgICAgICAgICBnY3NlSHRtbCArPSBgPHAgc3R5bGU9XCJmb250LXNpemU6IDFyZW07IGNvbG9yOiAjNDc1NTY5OyBtYXJnaW4tYm90dG9tOiAxMHB4O1wiPjxlbT5SZWFkIHRoZSBoaXN0b3JpY2FsIHNvdXJjZXMgYmVsb3cgYmVmb3JlIHdyaXRpbmcgeW91ciBuYXJyYXRpdmUgYWNjb3VudDo8L2VtPjwvcD5gO1xyXG4gICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIGdjc2VIdG1sICs9IGA8cCBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkOyBmb250LXNpemU6IDEuMTVyZW07IGNvbG9yOiAjMWUzYThhO1wiPkhvdyB1c2VmdWwgYXJlIFNvdXJjZXMgQSBhbmQgQiBmb3IgYW4gZW5xdWlyeSBpbnRvICR7dG9waWNUZXh0fT88L3A+YDtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgZ2NzZUh0bWwgKz0gYDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBnYXA6IDIwcHg7IG1hcmdpbi1ib3R0b206IDIwcHg7IGZsZXgtd3JhcDogd3JhcDtcIj5gO1xyXG4gICAgICAgICAgIGxlc3Nvbi5nY3NlX3Rhc2suc291cmNlcy5mb3JFYWNoKHNyY09iaiA9PiB7XHJcbiAgICAgICAgICAgICBnY3NlSHRtbCArPSBgPGRpdiBzdHlsZT1cImZsZXg6IDE7IG1pbi13aWR0aDogMzAwcHg7IGJhY2tncm91bmQ6IHdoaXRlOyBib3JkZXI6IDFweCBzb2xpZCAjY2JkNWUxOyBwYWRkaW5nOiAxNXB4OyBib3JkZXItcmFkaXVzOiA4cHg7IGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMSk7XCI+YDtcclxuICAgICAgICAgICAgIGlmIChzcmNPYmoudHlwZSA9PT0gJ3Zpc3VhbCcpIHtcclxuICAgICAgICAgICAgICAgZ2NzZUh0bWwgKz0gYDxpbWcgc3JjPVwiJHtnZXRBc3NldFVybChzcmNPYmouc3JjKX1cIiBzdHlsZT1cIm1heC13aWR0aDogMTAwJTsgbWF4LWhlaWdodDogMjUwcHg7IGJvcmRlci1yYWRpdXM6IDRweDsgbWFyZ2luLWJvdHRvbTogMTBweDtcIj5gO1xyXG4gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgZ2NzZUh0bWwgKz0gYDxibG9ja3F1b3RlIHN0eWxlPVwiZm9udC1zaXplOiAxLjA1cmVtOyBmb250LXN0eWxlOiBpdGFsaWM7IGNvbG9yOiAjNDc1NTY5OyBtYXJnaW46IDAgMCAxNXB4IDA7IGJvcmRlci1sZWZ0OiA0cHggc29saWQgIzk0YTNiODsgcGFkZGluZy1sZWZ0OiAxMHB4O1wiPiR7Zm9ybWF0Qm9sZChzcmNPYmoudGV4dCl9PC9ibG9ja3F1b3RlPmA7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBnY3NlSHRtbCArPSBgPHAgc3R5bGU9XCJmb250LXNpemU6IDAuOTVyZW07IGZvbnQtd2VpZ2h0OiBib2xkOyBjb2xvcjogIzMzNDE1NTsgbWFyZ2luOiAwO1wiPiR7c3JjT2JqLnRpdGxlfTwvcD5gO1xyXG4gICAgICAgICAgICAgZ2NzZUh0bWwgKz0gYDwvZGl2PmA7XHJcbiAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgZ2NzZUh0bWwgKz0gYDwvZGl2PmA7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgbGV0IHBsYWNlaG9sZGVyID0gaXNOYXJyYXRpdmUgPyBcIldyaXRlIHlvdXIgOC1tYXJrIG5hcnJhdGl2ZSBhY2NvdW50IGhlcmUuLi5cIiA6IFwiVHlwZSB5b3VyIDgtbWFyayB1dGlsaXR5IGV2YWx1YXRpb24gaGVyZS4uLlwiO1xyXG4gICAgICAgICAgIGdjc2VIdG1sICs9IGA8dGV4dGFyZWEgY2xhc3M9XCJzdHVkZW50LWFuc3dlci1pbnB1dFwiIHN0eWxlPVwibWluLWhlaWdodDogMjAwcHg7XCIgcGxhY2Vob2xkZXI9XCIke3BsYWNlaG9sZGVyfVwiIG9uaW5wdXQ9XCJ3aW5kb3cudXBkYXRlUHJvZ3Jlc3MoKVwiPjwvdGV4dGFyZWE+YDtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICBpZiAobGVzc29uLmdjc2VfdGFzay5tb2RlbCkge1xyXG4gICAgICAgICAgICAgIGdjc2VIdG1sICs9IGA8ZGl2IHN0eWxlPVwibWFyZ2luLXRvcDogMTVweDtcIj48YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBvbmNsaWNrPVwidG9nZ2xlRWxlbWVudCgnZ2NzZS1tb2RlbC1zcmMnKVwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2hlY2stZG91YmxlXCI+PC9pPiBSZXZlYWwgTW9kZWwgQW5zd2VyPC9idXR0b24+PC9kaXY+YDtcclxuICAgICAgICAgICAgICBnY3NlSHRtbCArPSBgPGRpdiBpZD1cImdjc2UtbW9kZWwtc3JjXCIgY2xhc3M9XCJzY2FmZm9sZC1ib3ggbW9kZWwtYm94XCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7IG1hcmdpbi10b3A6IDE1cHg7XCI+JHtmb3JtYXRCb2xkKGxlc3Nvbi5nY3NlX3Rhc2subW9kZWwpfTwvZGl2PmA7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGV4dHJhY3RlZEV4YW1UYXNrcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgZXh0cmFjdGVkRXhhbVRhc2tzLmZvckVhY2goKHRhc2ssIHRJZHgpID0+IHtcclxuICAgICAgICAgIGdjc2VIdG1sICs9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRvLW5vdy1jYXJkXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZmZmZmZmOyBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwOyBtYXJnaW4tYm90dG9tOiAyMHB4O1wiPlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXdlaWdodDogNzAwOyBtYXJnaW4tYm90dG9tOiAxMnB4OyBmb250LXNpemU6IDEuMXJlbTsgY29sb3I6ICMwZjE3MmE7XCI+XHJcbiAgICAgICAgICAgICAgICAke2Zvcm1hdFF1ZXN0aW9uKHRhc2sudGV4dCB8fCB0YXNrLnF1ZXN0aW9uKX1cclxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWZsZXg7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XCI+XHJcbiAgICAgICAgICAgICAgICAgICR7dGFzay5tb2RlbCA/IGA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtLWljb25cIiB0aXRsZT1cIlJldmVhbCBNb2RlbCBBbnN3ZXJcIiBvbmNsaWNrPVwidG9nZ2xlRWxlbWVudCgnZXh0cmFjdGVkLW1vZGVsLSR7dElkeH0nKVwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2hlY2stZG91YmxlXCI+PC9pPjwvYnV0dG9uPmAgOiAnJ31cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJzdHVkZW50LWFuc3dlci1pbnB1dFwiIHN0eWxlPVwibWluLWhlaWdodDogMjAwcHg7XCIgcGxhY2Vob2xkZXI9XCJXcml0ZSB5b3VyIHJlc3BvbnNlIGhlcmUuLi5cIiBvbmlucHV0PVwid2luZG93LnVwZGF0ZVByb2dyZXNzKClcIj48L3RleHRhcmVhPlxyXG4gICAgICAgICAgICAgICR7dGFzay5tb2RlbCA/IGA8ZGl2IGlkPVwiZXh0cmFjdGVkLW1vZGVsLSR7dElkeH1cIiBjbGFzcz1cInNjYWZmb2xkLWJveCBtb2RlbC1ib3hcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTsgbWFyZ2luLXRvcDogMTVweDtcIj4ke2Zvcm1hdEJvbGQodGFzay5tb2RlbCl9PC9kaXY+YCA6ICcnfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIGA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZ2NzZUh0bWwgKz0gYDwvZGl2PmA7XHJcbiAgICAgIGh0bWwgKz0gZ2NzZUh0bWw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxlc3Nvbi5xdWl6ICYmIGxlc3Nvbi5xdWl6Lmxlbmd0aCA+IDApIHtcclxuICAgICAgd2luZG93LmN1cnJlbnRRdWl6RGF0YSA9IGxlc3Nvbi5xdWl6O1xyXG4gICAgICB3aW5kb3cuY3VycmVudFF1aXpJbmRleCA9IDA7XHJcbiAgICAgIHdpbmRvdy5jdXJyZW50UXVpekxlc3NvbklkID0gbGVzc29uLmlkO1xyXG4gICAgICBcclxuICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBoYXNlLWNhcmQgbm8tcHJpbnRcIiBpZD1cImlubGluZS1xdWl6LWNvbnRhaW5lclwiIHN0eWxlPVwicGFkZGluZzogMzBweDtcIj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBtYXJnaW4tYm90dG9tOiAyMHB4OyBib3JkZXItYm90dG9tOiAycHggc29saWQgI2UyZThmMDsgcGFkZGluZy1ib3R0b206IDE1cHg7XCI+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2xpcGJvYXJkLWNoZWNrXCIgc3R5bGU9XCJmb250LXNpemU6IDJyZW07IGNvbG9yOiAjM2I4MmY2OyBtYXJnaW4tcmlnaHQ6IDE1cHg7XCI+PC9pPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxoMiBzdHlsZT1cIm1hcmdpbjogMDsgY29sb3I6ICMxZTI5M2I7IGZvbnQtc2l6ZTogMS41cmVtO1wiPktub3dsZWRnZSBDaGVjayBRdWl6PC9oMj5cclxuICAgICAgICAgICAgICA8cCBzdHlsZT1cIm1hcmdpbjogMDsgY29sb3I6ICM2NDc0OGI7IGZvbnQtc2l6ZTogMC45NXJlbTtcIj5RdWVzdGlvbiA8c3BhbiBpZD1cInF1aXotcHJvZ3Jlc3NcIj4xIC8gJHtsZXNzb24ucXVpei5sZW5ndGh9PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgPGRpdiBpZD1cInF1aXotcXVlc3Rpb24tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDwhLS0gUG9wdWxhdGVkIGR5bmFtaWNhbGx5IC0tPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IG1hcmdpbi10b3A6IDI1cHg7IGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTJlOGYwOyBwYWRkaW5nLXRvcDogMjBweDtcIj5cclxuICAgICAgICAgICAgPGRpdiBpZD1cInF1aXotZmVlZGJhY2tcIiBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkOyBwYWRkaW5nLXRvcDogOHB4O1wiPjwvZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwicXVpei1uZXh0LWJ0blwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIG9uY2xpY2s9XCJ3aW5kb3cubmV4dFF1aXpRdWVzdGlvbigpXCI+TmV4dCBRdWVzdGlvbiA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWFycm93LXJpZ2h0XCI+PC9pPjwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBcclxuICAgIGh0bWwgKz0gYDwvZGl2PmA7IC8vIEVuZCBsZXNzb24tY29udGVudCB3cmFwcGVyXHJcblxyXG4gICAgY29udGVudEFyZWEuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIFxyXG4gICAgaWYgKGxlc3Nvbi5xdWl6ICYmIGxlc3Nvbi5xdWl6Lmxlbmd0aCA+IDApIHtcclxuICAgICAgd2luZG93LnJlbmRlclF1aXpRdWVzdGlvbigpO1xyXG4gICAgfVxyXG4gICAgd2luZG93LnZvY2FiTWF0Y2hlc0ZvdW5kID0gMDtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAod2luZG93Lm1lcm1haWQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgbWVybWFpZC5pbml0KHVuZGVmaW5lZCwgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lcm1haWQnKSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIk1lcm1haWQgcmVuZGVyIGVycm9yOlwiLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIDEwMCk7IFxyXG4gIH1cclxuICBcclxuICB3aW5kb3cuc3dpdGNoVGFiID0gKHRhYklkKSA9PiB7XHJcbiAgICAvLyBIaWRlIGFsbCB0YWIgY29udGVudFxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYi1jb250ZW50JykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9KTtcclxuICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSBhbGwgYnV0dG9uc1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYi1idG4nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIH0pO1xyXG4gICAgLy8gU2hvdyByZXF1ZXN0ZWQgdGFiXHJcbiAgICBjb25zdCBhY3RpdmVUYWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJJZCk7XHJcbiAgICBpZiAoYWN0aXZlVGFiKSB7XHJcbiAgICAgIGFjdGl2ZVRhYi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIH1cclxuICAgIC8vIFNldCBjbGlja2VkIGJ1dHRvbiB0byBhY3RpdmUgKHdlIGNhbiBmaW5kIGl0IHZpYSB0aGUgb25jbGljayBzdHJpbmcpXHJcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBidXR0b25bb25jbGljayo9XCIke3RhYklkfVwiXWApO1xyXG4gICAgaWYgKGJ0bikge1xyXG4gICAgICBidG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gVG9nZ2xpbmcgZWxlbWVudHMgaGVscGVyXHJcblxyXG4gIHdpbmRvdy50b2dnbGVFbGVtZW50ID0gKGlkKSA9PiB7XHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgIGlmIChlbCkge1xyXG4gICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gZWwuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgLy8gTWF0Y2hpbmcgR2FtZSBMb2dpY1xyXG4gIGxldCBzZWxlY3RlZFRlcm1JZHggPSBudWxsO1xyXG4gIGxldCBzZWxlY3RlZFRlcm1FbCA9IG51bGw7XHJcbiAgd2luZG93LnZvY2FiTWF0Y2hlc0ZvdW5kID0gMDtcclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgY29uc3QgdGVybUJ0biA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5tYXRjaC10ZXJtLWJ0bicpO1xyXG4gICAgY29uc3QgZGVmQnRuID0gZS50YXJnZXQuY2xvc2VzdCgnLm1hdGNoLWRlZi1idG4nKTtcclxuXHJcbiAgICBpZiAodGVybUJ0biAmJiAhdGVybUJ0bi5kaXNhYmxlZCkge1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWF0Y2gtdGVybS1idG4nKS5mb3JFYWNoKGIgPT4ge1xyXG4gICAgICAgIGlmICghYi5kaXNhYmxlZCkgYi5zdHlsZS5ib3JkZXJDb2xvciA9ICcjY2JkNWUxJztcclxuICAgICAgfSk7XHJcbiAgICAgIHRlcm1CdG4uc3R5bGUuYm9yZGVyQ29sb3IgPSAnIzNiODJmNic7XHJcbiAgICAgIHNlbGVjdGVkVGVybUlkeCA9IHRlcm1CdG4uZGF0YXNldC5pZHg7XHJcbiAgICAgIHNlbGVjdGVkVGVybUVsID0gdGVybUJ0bjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGVmQnRuICYmICFkZWZCdG4uZGlzYWJsZWQgJiYgc2VsZWN0ZWRUZXJtSWR4ICE9PSBudWxsKSB7XHJcbiAgICAgIGlmIChkZWZCdG4uZGF0YXNldC5pZHggPT09IHNlbGVjdGVkVGVybUlkeCkge1xyXG4gICAgICAgIC8vIE1hdGNoIGZvdW5kIVxyXG4gICAgICAgIGRlZkJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gJyMxMGI5ODEnO1xyXG4gICAgICAgIGRlZkJ0bi5zdHlsZS5jb2xvciA9ICcjZmZmJztcclxuICAgICAgICBkZWZCdG4uc3R5bGUuYm9yZGVyQ29sb3IgPSAnIzA1OTY2OSc7XHJcbiAgICAgICAgZGVmQnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgc2VsZWN0ZWRUZXJtRWwuc3R5bGUuYmFja2dyb3VuZCA9ICcjMTBiOTgxJztcclxuICAgICAgICBzZWxlY3RlZFRlcm1FbC5zdHlsZS5jb2xvciA9ICcjZmZmJztcclxuICAgICAgICBzZWxlY3RlZFRlcm1FbC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjMDU5NjY5JztcclxuICAgICAgICBzZWxlY3RlZFRlcm1FbC5kaXNhYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHNlbGVjdGVkVGVybUlkeCA9IG51bGw7XHJcbiAgICAgICAgc2VsZWN0ZWRUZXJtRWwgPSBudWxsO1xyXG4gICAgICAgIHdpbmRvdy52b2NhYk1hdGNoZXNGb3VuZCsrO1xyXG5cclxuICAgICAgICBjb25zdCB0b3RhbFRlcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1hdGNoLXRlcm0tYnRuJykubGVuZ3RoO1xyXG4gICAgICAgIGlmICh3aW5kb3cudm9jYWJNYXRjaGVzRm91bmQgPj0gdG90YWxUZXJtcykge1xyXG4gICAgICAgICAgIGNvbnN0IHN1Y2Nlc3NNc2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5sb2NrLXN1Y2Nlc3MnKTtcclxuICAgICAgICAgICBpZiAoc3VjY2Vzc01zZykgc3VjY2Vzc01zZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICBcclxuICAgICAgICAgICBjb25zdCBsb2NrZWRTZWMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9ja2VkLWNvbnRlbnQnKTtcclxuICAgICAgICAgICBpZiAobG9ja2VkU2VjKSB7XHJcbiAgICAgICAgICAgICBsb2NrZWRTZWMuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgIGxvY2tlZFNlYy5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xyXG4gICAgICAgICAgICAgbG9ja2VkU2VjLnN0eWxlLmZpbHRlciA9ICdub25lJztcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFdyb25nIG1hdGNoXHJcbiAgICAgICAgZGVmQnRuLnN0eWxlLmJvcmRlckNvbG9yID0gJyNlZjQ0NDQnO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFkZWZCdG4uZGlzYWJsZWQpIGRlZkJ0bi5zdHlsZS5ib3JkZXJDb2xvciA9ICcjY2JkNWUxJztcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIEluaXRpYWxpemVcclxuICBpZiAodW5pdERhdGEubGVzc29ucy5sZW5ndGggPiAwKSB7XHJcbiAgICByZW5kZXJTaWRlYmFyKCk7XHJcbiAgICBcclxuICAgIC8vIEluaXRpYWwgUmVuZGVyIC0gbG9hZCBob21lcGFnZVxyXG4gICAgcmVuZGVySG9tZXBhZ2UoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29udGVudEFyZWEuaW5uZXJIVE1MID0gXCI8aDI+Tm8gbGVzc29ucyBmb3VuZCBpbiBkYXRhLmpzPC9oMj5cIjtcclxuICB9XHJcbn07XHJcblxyXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXQpO1xyXG59IGVsc2Uge1xyXG4gIGluaXQoKTtcclxufVxyXG5cclxud2luZG93LnVwZGF0ZVByb2dyZXNzID0gKCkgPT4ge1xyXG4gIGNvbnN0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdHVkZW50LWFuc3dlci1pbnB1dCcpO1xyXG4gIGxldCBmaWxsZWQgPSAwO1xyXG4gIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcclxuICAgIGlmIChpbnB1dC52YWx1ZS50cmltKCkubGVuZ3RoID4gMCkgZmlsbGVkKys7XHJcbiAgfSk7XHJcbiAgY29uc3QgYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzLWJhcicpO1xyXG4gIGlmIChiYXIpIHtcclxuICAgIGlmIChpbnB1dHMubGVuZ3RoID09PSAwKSBiYXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XHJcbiAgICBlbHNlIGJhci5zdHlsZS53aWR0aCA9IGAkeyhmaWxsZWQgLyBpbnB1dHMubGVuZ3RoKSAqIDEwMH0lYDtcclxuICB9XHJcbn07XHJcbn1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGFzc2lnblF1ZXN0aW9uTnVtYmVycyhsZXNzb24pIHtcclxuICAgIGxldCBxID0gMTtcclxuICAgIGlmIChsZXNzb24ucHJpbWFyeV9zb3VyY2UgJiYgbGVzc29uLnByaW1hcnlfc291cmNlLnF1ZXN0aW9uKSBsZXNzb24ucHJpbWFyeV9zb3VyY2UucU51bSA9IHErKztcclxuICAgIGlmIChsZXNzb24uZG9fbm93KSB7XHJcbiAgICAgIGlmIChsZXNzb24uZG9fbm93LnR5cGUgPT09IFwidGltZWxpbmVcIiAmJiBsZXNzb24uZG9fbm93LnByZWRpY3Rpb25fcXVlc3Rpb24pIGxlc3Nvbi5kb19ub3cucU51bSA9IHErKztcclxuICAgICAgZWxzZSBpZiAobGVzc29uLmRvX25vdy50eXBlID09PSBcInF1ZXN0aW9uc1wiKSBsZXNzb24uZG9fbm93Lml0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLnFOdW0gPSBxKyspO1xyXG4gICAgfVxyXG4gICAgaWYgKGxlc3Nvbi5uYXJyYXRpdmVfYmxvY2tzKSB7XHJcbiAgICAgIGxlc3Nvbi5uYXJyYXRpdmVfYmxvY2tzLmZvckVhY2goYmxvY2sgPT4ge1xyXG4gICAgICAgIGlmIChibG9jay50YXNrcykgYmxvY2sudGFza3MuZm9yRWFjaCh0YXNrID0+IHRhc2sucU51bSA9IHErKyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGxlc3Nvbi50YXNrcykgbGVzc29uLnRhc2tzLmZvckVhY2godGFzayA9PiB0YXNrLnFOdW0gPSBxKyspO1xyXG4gICAgaWYgKGxlc3Nvbi5leHRlbmRlZCAmJiBsZXNzb24uZXh0ZW5kZWQucXVlc3Rpb24pIGxlc3Nvbi5leHRlbmRlZC5xTnVtID0gcSsrO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb3BlblRhc2tXaGl0ZWJvYXJkKCkge1xyXG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay13aGl0ZWJvYXJkLW1vZGFsJyk7XHJcbiAgICBpZiAoIW1vZGFsKSByZXR1cm47XHJcbiAgICBcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aGl0ZWJvYXJkLXF1ZXN0aW9ucy1jb250YWluZXInKTtcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgIFxyXG4gICAgY29uc3QgYWN0aXZlTGVzc29uID0gd2luZG93LmN1cnJlbnRBY3RpdmVMZXNzb24gfHwgdW5pdERhdGEubGVzc29uc1swXTtcclxuICAgIFxyXG4gICAgYXNzaWduUXVlc3Rpb25OdW1iZXJzKGFjdGl2ZUxlc3Nvbik7XHJcbiAgICBcclxuICAgIGxldCBodG1sID0gJyc7XHJcbiAgICBcclxuICAgIGNvbnN0IGFkZFF1ZXN0aW9uQ2FyZCA9IChxTnVtLCBxdWVzdGlvblRleHQsIGFuc3dlclRleHQpID0+IHtcclxuICAgICAgY29uc3QgZmluYWxBbnN3ZXIgPSB3aW5kb3cuZm9ybWF0Qm9sZChhbnN3ZXJUZXh0KSB8fCBcIk1vZGVsIGFuc3dlciB0byBiZSBkaXNjdXNzZWQgaW4gY2xhc3MuXCI7XHJcbiAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3Yi1xdWVzdGlvbi1jYXJkXCIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtcIiBvbmNsaWNrPVwidGhpcy5xdWVyeVNlbGVjdG9yKCcud2ItYW5zd2VyJykuY2xhc3NMaXN0LnRvZ2dsZSgncmV2ZWFsZWQnKVwiIHRpdGxlPVwiQ2xpY2sgdG8gcmV2ZWFsIGFuc3dlclwiPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkO1wiPlEke3FOdW19LiAke3F1ZXN0aW9uVGV4dH08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3Yi1hbnN3ZXJcIj4ke2ZpbmFsQW5zd2VyfTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoYWN0aXZlTGVzc29uLnByaW1hcnlfc291cmNlICYmIGFjdGl2ZUxlc3Nvbi5wcmltYXJ5X3NvdXJjZS5xdWVzdGlvbikge1xyXG4gICAgICBhZGRRdWVzdGlvbkNhcmQoYWN0aXZlTGVzc29uLnByaW1hcnlfc291cmNlLnFOdW0sIGFjdGl2ZUxlc3Nvbi5wcmltYXJ5X3NvdXJjZS5xdWVzdGlvbiwgYWN0aXZlTGVzc29uLnByaW1hcnlfc291cmNlLm1vZGVsX2Fuc3dlciB8fCAnJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmIChhY3RpdmVMZXNzb24uZG9fbm93KSB7XHJcbiAgICAgIGlmIChhY3RpdmVMZXNzb24uZG9fbm93LnR5cGUgPT09IFwidGltZWxpbmVcIiAmJiBhY3RpdmVMZXNzb24uZG9fbm93LnByZWRpY3Rpb25fcXVlc3Rpb24pIHtcclxuICAgICAgICBhZGRRdWVzdGlvbkNhcmQoYWN0aXZlTGVzc29uLmRvX25vdy5xTnVtLCBhY3RpdmVMZXNzb24uZG9fbm93LnByZWRpY3Rpb25fcXVlc3Rpb24sIGFjdGl2ZUxlc3Nvbi5kb19ub3cubW9kZWwgfHwgYWN0aXZlTGVzc29uLmRvX25vdy5hbnN3ZXIgfHwgJycpO1xyXG4gICAgICB9IGVsc2UgaWYgKGFjdGl2ZUxlc3Nvbi5kb19ub3cudHlwZSA9PT0gXCJxdWVzdGlvbnNcIikge1xyXG4gICAgICAgIGFjdGl2ZUxlc3Nvbi5kb19ub3cuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICBhZGRRdWVzdGlvbkNhcmQoaXRlbS5xTnVtLCBpdGVtLnF1ZXN0aW9uLCBpdGVtLmFuc3dlciB8fCAnJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKGFjdGl2ZUxlc3Nvbi5uYXJyYXRpdmVfYmxvY2tzKSB7XHJcbiAgICAgIGFjdGl2ZUxlc3Nvbi5uYXJyYXRpdmVfYmxvY2tzLmZvckVhY2goYmxvY2sgPT4ge1xyXG4gICAgICAgIGlmIChibG9jay50YXNrcykge1xyXG4gICAgICAgICAgYmxvY2sudGFza3MuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICAgICAgYWRkUXVlc3Rpb25DYXJkKHRhc2sucU51bSwgdGFzay50ZXh0LCB0YXNrLm1vZGVsIHx8ICcnKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmIChhY3RpdmVMZXNzb24uZGViYXRlX3ByZXApIHtcclxuICAgICAgIGFkZFF1ZXN0aW9uQ2FyZCgnLScsIGBEZWJhdGUgUHJlcDogJHthY3RpdmVMZXNzb24uZGViYXRlX3ByZXAucXVlc3Rpb259YCwgYDxzdHJvbmc+QWdyZWU6PC9zdHJvbmc+PHVsPiR7YWN0aXZlTGVzc29uLmRlYmF0ZV9wcmVwLmFyZ3VtZW50c19mb3IubWFwKGE9PmA8bGk+JHthfTwvbGk+YCkuam9pbignJyl9PC91bD48c3Ryb25nPkRpc2FncmVlOjwvc3Ryb25nPjx1bD4ke2FjdGl2ZUxlc3Nvbi5kZWJhdGVfcHJlcC5hcmd1bWVudHNfYWdhaW5zdC5tYXAoYT0+YDxsaT4ke2F9PC9saT5gKS5qb2luKCcnKX08L3VsPmApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xyXG4gIH1cclxuICBcclxud2luZG93LnRvZ2dsZVN0YXJ0ZXJCeUlkID0gZnVuY3Rpb24oaWQpIHtcclxuICBjb25zdCBzdGFydGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gIGlmIChzdGFydGVyKSB7XHJcbiAgICBzdGFydGVyLnN0eWxlLmRpc3BsYXkgPSBzdGFydGVyLnN0eWxlLmRpc3BsYXkgPT09ICdibG9jaycgPyAnbm9uZScgOiAnYmxvY2snO1xyXG4gIH1cclxufTtcclxuXHJcbndpbmRvdy5kcmFnRGViYXRlID0gZnVuY3Rpb24oZXYpIHtcclxuICBldi5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgZXYudGFyZ2V0LmlkKTtcclxufTtcclxuXHJcbndpbmRvdy5hbGxvd0Ryb3AgPSBmdW5jdGlvbihldikge1xyXG4gIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbn07XHJcblxyXG53aW5kb3cuZHJvcERlYmF0ZSA9IGZ1bmN0aW9uKGV2KSB7XHJcbiAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICBjb25zdCBkYXRhID0gZXYuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpO1xyXG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YSk7XHJcbiAgbGV0IHRhcmdldCA9IGV2LnRhcmdldDtcclxuICAvLyBJZiBkcm9wcGVkIG9uIGFub3RoZXIgY2FyZCwgYXBwZW5kIHRvIHRoZSBkcm9wem9uZVxyXG4gIHdoaWxlICh0YXJnZXQgJiYgIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlYmF0ZS1kcm9wem9uZScpKSB7XHJcbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcclxuICB9XHJcbiAgaWYgKHRhcmdldCAmJiBlbCkge1xyXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsKTtcclxuICB9XHJcbn07XHJcblxyXG53aW5kb3cuY2hlY2tEZWJhdGUgPSBmdW5jdGlvbihsZXNzb25JZCkge1xyXG4gIGxldCBjb3JyZWN0ID0gdHJ1ZTtcclxuICBsZXQgYWxsU29ydGVkID0gdHJ1ZTtcclxuICBcclxuICBjb25zdCBiYW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGRlYmF0ZS1iYW5rLSR7bGVzc29uSWR9YCk7XHJcbiAgaWYgKGJhbmsgJiYgYmFuay5jaGlsZHJlbi5sZW5ndGggPiAwKSBhbGxTb3J0ZWQgPSBmYWxzZTtcclxuICBcclxuICBjb25zdCBmb3Jab25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGRlYmF0ZS1mb3ItJHtsZXNzb25JZH1gKTtcclxuICBpZiAoZm9yWm9uZSkge1xyXG4gICAgQXJyYXkuZnJvbShmb3Jab25lLmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgaWYgKGNoaWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1zaWRlJykgIT09ICdmb3InKSB7XHJcbiAgICAgICAgY29ycmVjdCA9IGZhbHNlO1xyXG4gICAgICAgIGNoaWxkLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgI2RjMjYyNic7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hpbGQuc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCAjMTZhMzRhJztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhZ2FpbnN0Wm9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBkZWJhdGUtYWdhaW5zdC0ke2xlc3NvbklkfWApO1xyXG4gIGlmIChhZ2FpbnN0Wm9uZSkge1xyXG4gICAgQXJyYXkuZnJvbShhZ2FpbnN0Wm9uZS5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgIGlmIChjaGlsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2lkZScpICE9PSAnYWdhaW5zdCcpIHtcclxuICAgICAgICBjb3JyZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgY2hpbGQuc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCAjZGMyNjI2JztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaGlsZC5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkICMxNmEzNGEnO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgXHJcbiAgY29uc3QgZmVlZGJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZGViYXRlLWZlZWRiYWNrLSR7bGVzc29uSWR9YCk7XHJcbiAgaWYgKCFhbGxTb3J0ZWQpIHtcclxuICAgIGZlZWRiYWNrLnN0eWxlLmNvbG9yID0gJyNkOTc3MDYnO1xyXG4gICAgZmVlZGJhY2suaW5uZXJUZXh0ID0gXCJQbGVhc2Ugc29ydCBhbGwgZXZpZGVuY2UgY2FyZHMgZmlyc3QhXCI7XHJcbiAgfSBlbHNlIGlmICghY29ycmVjdCkge1xyXG4gICAgZmVlZGJhY2suc3R5bGUuY29sb3IgPSAnI2RjMjYyNic7XHJcbiAgICBmZWVkYmFjay5pbm5lclRleHQgPSBcIlNvbWUgZXZpZGVuY2UgaXMgaW4gdGhlIHdyb25nIGNvbHVtbi4gQ2hlY2sgdGhlIHJlZCBjYXJkcyBhbmQgdHJ5IGFnYWluIVwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmZWVkYmFjay5zdHlsZS5jb2xvciA9ICcjMTZhMzRhJztcclxuICAgIGZlZWRiYWNrLmlubmVyVGV4dCA9IFwiRXhjZWxsZW50ISBBbGwgZXZpZGVuY2Ugc29ydGVkIGNvcnJlY3RseS4gWW91IGFyZSByZWFkeSB0byB3cml0ZSB5b3VyIGVzc2F5IVwiO1xyXG4gIH1cclxufTtcclxud2luZG93LnRvZ2dsZUFuc3dlckJ5SWQgPSBmdW5jdGlvbihpZCkge1xyXG4gIGNvbnN0IGFucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICBpZiAoYW5zKSB7XHJcbiAgICBpZiAoYW5zLmNsYXNzTGlzdC5jb250YWlucygncmV2ZWFsZWQnKSkge1xyXG4gICAgICBhbnMuY2xhc3NMaXN0LnJlbW92ZSgncmV2ZWFsZWQnKTtcclxuICAgICAgYW5zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbnMuY2xhc3NMaXN0LmFkZCgncmV2ZWFsZWQnKTtcclxuICAgICAgYW5zLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbndpbmRvdy50b2dnbGVBbGxBbnN3ZXJzID0gZnVuY3Rpb24oYnRuKSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gYnRuLmNsb3Nlc3QoJy5waGFzZS1jYXJkJykgfHwgYnRuLmNsb3Nlc3QoJy5kby1ub3ctYm94JykgfHwgYnRuLmNsb3Nlc3QoJ2RldGFpbHMnKTtcclxuICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xyXG4gIGNvbnN0IGFuc3dlcnMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmFuc3dlcicpO1xyXG4gIGNvbnN0IGFueUhpZGRlbiA9IEFycmF5LmZyb20oYW5zd2Vycykuc29tZShhID0+IGEuc3R5bGUuZGlzcGxheSAhPT0gJ2Jsb2NrJyAmJiAhYS5jbGFzc0xpc3QuY29udGFpbnMoJ3JldmVhbGVkJykpO1xyXG4gIGFuc3dlcnMuZm9yRWFjaChhID0+IHtcclxuICAgIGlmIChhbnlIaWRkZW4pIHtcclxuICAgICAgYS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgYS5jbGFzc0xpc3QuYWRkKCdyZXZlYWxlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICBhLmNsYXNzTGlzdC5yZW1vdmUoJ3JldmVhbGVkJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG53aW5kb3cudG9nZ2xlQWxsV2hpdGVib2FyZEFuc3dlcnMgPSBmdW5jdGlvbigpIHtcclxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza1doaXRlYm9hcmRDb250ZW50Jyk7XHJcbiAgaWYgKCFjb250YWluZXIpIHJldHVybjtcclxuICBjb25zdCBhbnN3ZXJzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5hbnN3ZXInKTtcclxuICBjb25zdCBhbnlIaWRkZW4gPSBBcnJheS5mcm9tKGFuc3dlcnMpLnNvbWUoYSA9PiBhLnN0eWxlLmRpc3BsYXkgIT09ICdibG9jaycgJiYgIWEuY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXZlYWxlZCcpKTtcclxuICBhbnN3ZXJzLmZvckVhY2goYSA9PiB7XHJcbiAgICBpZiAoYW55SGlkZGVuKSB7XHJcbiAgICAgIGEuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgIGEuY2xhc3NMaXN0LmFkZCgncmV2ZWFsZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgYS5jbGFzc0xpc3QucmVtb3ZlKCdyZXZlYWxlZCcpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5cclxud2luZG93LnRvZ2dsZU1hcCA9IGZ1bmN0aW9uKGJ0bikge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGJ0bi5jbG9zZXN0KCcuaW50ZXJhY3RpdmUtbWFwLWNvbnRhaW5lcicpO1xyXG4gIC8vIFVwZGF0ZSBidXR0b25zXHJcbiAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYXAtdG9nZ2xlLWJ0bicpLmZvckVhY2goYiA9PiB7XHJcbiAgICBiLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZS1tYXAtYnRuJyk7XHJcbiAgICBiLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnO1xyXG4gICAgYi5zdHlsZS5jb2xvciA9ICcnO1xyXG4gIH0pO1xyXG4gIGJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtbWFwLWJ0bicpO1xyXG4gIGJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzFhMjM3ZSc7XHJcbiAgYnRuLnN0eWxlLmNvbG9yID0gJ3doaXRlJztcclxuICBcclxuICAvLyBVcGRhdGUgaW1hZ2VzXHJcbiAgY29uc3QgdGFyZ2V0SWQgPSBidG4uZ2V0QXR0cmlidXRlKCdkYXRhLW1hcC1pZCcpO1xyXG4gIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdpbWdbaWRePVwibWFwLWltZy1cIl0nKS5mb3JFYWNoKGltZyA9PiB7XHJcbiAgICBpbWcuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICB9KTtcclxuICBjb250YWluZXIucXVlcnlTZWxlY3RvcignI21hcC1pbWctJyArIHRhcmdldElkKS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gIFxyXG4gIC8vIFVwZGF0ZSBjYXB0aW9uXHJcbiAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNtYXAtY2FwdGlvbi1kaXNwbGF5JykuaW5uZXJIVE1MID0gYnRuLmdldEF0dHJpYnV0ZSgnZGF0YS1jYXB0aW9uJyk7XHJcbn07XHJcblxyXG4vLyAtLS0gRGViYXRlIE1vZGFsIEdsb2JhbCBGdW5jdGlvbnMgLS0tXHJcbndpbmRvdy5jdXJyZW50RGViYXRlSW5kZXggPSAwO1xyXG5cclxud2luZG93LmluamVjdERlYmF0ZU1vZGFsSWZOZWVkZWQgPSBmdW5jdGlvbigpIHtcclxuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlYmF0ZU1vZGFsJykpIHJldHVybjtcclxuICBjb25zdCBodG1sID0gYFxyXG4gIDxkaXYgaWQ9XCJkZWJhdGVNb2RhbFwiIGNsYXNzPVwibW9kYWwtb3ZlcmxheSBuby1wcmludFwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGZpeGVkOyB0b3A6IDA7IGxlZnQ6IDA7IHdpZHRoOiAxMDB2dzsgaGVpZ2h0OiAxMDB2aDsgYmFja2dyb3VuZDogcmdiYSgxNSwgMjMsIDQyLCAwLjg1KTsgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEwcHgpOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgYWxpZ24taXRlbXM6IGNlbnRlcjsgei1pbmRleDogMjAwMDsgb3BhY2l0eTogMDsgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2U7XCIgb25jbGljaz1cImlmKGV2ZW50LnRhcmdldCA9PT0gdGhpcykgd2luZG93LmNsb3NlRGViYXRlTW9kYWwoKVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIiBzdHlsZT1cImJhY2tncm91bmQ6IHdoaXRlOyBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS1hY2NlbnQtcmVkKTsgYm9yZGVyLXJhZGl1czogMTJweDsgcGFkZGluZzogMzBweDsgbWF4LXdpZHRoOiA3MDBweDsgd2lkdGg6IDkwJTsgY29sb3I6IHZhcigtLW5hdnkpOyBwb3NpdGlvbjogcmVsYXRpdmU7IGJveC1zaGFkb3c6IDAgMTVweCA0MHB4IHJnYmEoMCwwLDAsMC42KTsgdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTsgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcIj5cclxuICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwid2luZG93LmNsb3NlRGViYXRlTW9kYWwoKVwiIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDE1cHg7IHJpZ2h0OiAxNXB4OyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgYm9yZGVyOiBub25lOyBjb2xvcjogIzU1NTsgZm9udC1zaXplOiAxOHB0OyBjdXJzb3I6IHBvaW50ZXI7XCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS14bWFya1wiPjwvaT48L2J1dHRvbj5cclxuICAgICAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgbWFyZ2luLWJvdHRvbTogMjBweDtcIj5cclxuICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXNjYWxlLWJhbGFuY2VkXCIgc3R5bGU9XCJmb250LXNpemU6IDMycHQ7IGNvbG9yOiB2YXIoLS1hY2NlbnQtcmVkKTtcIj48L2k+XHJcbiAgICAgICAgPGgyIHN0eWxlPVwiZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtaGVhZGluZyk7IGZvbnQtc2l6ZTogMjJwdDsgbWFyZ2luOiAxMHB4IDAgMCAwOyBjb2xvcjogdmFyKC0tbmF2eSk7IHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XCI+Q2xhc3Nyb29tIE9yYWN5PC9oMj5cclxuICAgICAgICA8aDMgc3R5bGU9XCJmb250LWZhbWlseTogdmFyKC0tZm9udC10aXRsZSk7IGZvbnQtc2l6ZTogMTRwdDsgbWFyZ2luOiA1cHggMCAwIDA7IGNvbG9yOiAjNTU1O1wiIGlkPVwiZGViYXRlVG9waWNTdWJ0aXRsZVwiPlN0cnVjdHVyZWQgRGViYXRlIFByb21wdDwvaDM+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGlkPVwiZGViYXRlTW9kYWxDb250ZW50XCIgc3R5bGU9XCJmb250LXNpemU6IDE0cHQ7IGxpbmUtaGVpZ2h0OiAxLjU7IHRleHQtYWxpZ246IGNlbnRlcjsgYmFja2dyb3VuZDogI2ZhZjlmNjsgcGFkZGluZzogMjVweDsgYm9yZGVyLXJhZGl1czogOHB4OyBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpOyBtYXJnaW4tYm90dG9tOiAyMHB4O1wiPlxyXG4gICAgICAgIDwhLS0gQ29udGVudCBkeW5hbWljYWxseSBwb3B1bGF0ZWQgLS0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGlkPVwiZGViYXRlU2VudGVuY2VTdGFydGVyQ29udGFpbmVyXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lOyBiYWNrZ3JvdW5kOiAjZmZmYmViOyBib3JkZXItbGVmdDogNHB4IHNvbGlkICNmNTllMGI7IHBhZGRpbmc6IDE1cHg7IG1hcmdpbi1ib3R0b206IDIwcHg7IGJvcmRlci1yYWRpdXM6IDRweDsgdGV4dC1hbGlnbjogbGVmdDtcIj5cclxuICAgICAgICA8c3Ryb25nIHN0eWxlPVwiY29sb3I6ICNkOTc3MDY7IGZvbnQtc2l6ZTogMTFwdDsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgZGlzcGxheTogYmxvY2s7IG1hcmdpbi1ib3R0b206IDVweDtcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWxpZ2h0YnVsYlwiPjwvaT4gU2VudGVuY2UgU3RhcnRlcjwvc3Ryb25nPlxyXG4gICAgICAgIDxzcGFuIGlkPVwiZGViYXRlU2VudGVuY2VTdGFydGVyVGV4dFwiIHN0eWxlPVwiZm9udC1zaXplOiAxMnB0OyBjb2xvcjogIzQ1MWEwMzsgZm9udC1zdHlsZTogaXRhbGljO1wiPjwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOiBjZW50ZXI7XCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCIgb25jbGljaz1cIndpbmRvdy5jeWNsZURlYmF0ZVByb21wdCgtMSlcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWFycm93LWxlZnRcIj48L2k+IFByZXZpb3VzPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cImJ0bi1zaG93LXN0YXJ0ZXJcIiBjbGFzcz1cImJ0blwiIHN0eWxlPVwiYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGJvcmRlcjogMnB4IGRhc2hlZCAjY2JkNWUxOyBjb2xvcjogIzY0NzQ4YjsgYm9yZGVyLXJhZGl1czogNnB4OyBwYWRkaW5nOiA4cHggMTVweDsgZm9udC1zaXplOiAxMXB0OyBjdXJzb3I6IHBvaW50ZXI7IHRyYW5zaXRpb246IGFsbCAwLjJzO1wiIG9uY2xpY2s9XCJ3aW5kb3cudG9nZ2xlRGViYXRlU3RhcnRlcigpXCI+U2hvdyBIaW50PC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIG9uY2xpY2s9XCJ3aW5kb3cuY3ljbGVEZWJhdGVQcm9tcHQoMSlcIj5OZXh0IFByb21wdCA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWFycm93LXJpZ2h0XCI+PC9pPjwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PmA7XHJcbiAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGh0bWwpO1xyXG59O1xyXG5cclxud2luZG93Lm9wZW5EZWJhdGVNb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG4gIHdpbmRvdy5pbmplY3REZWJhdGVNb2RhbElmTmVlZGVkKCk7XHJcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGViYXRlTW9kYWwnKTtcclxuICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gIC8vIFRyaWdnZXIgcmVmbG93XHJcbiAgdm9pZCBtb2RhbC5vZmZzZXRXaWR0aDtcclxuICBtb2RhbC5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gIG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jb250ZW50Jykuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEpJztcclxuICB3aW5kb3cucmVuZGVyRGViYXRlUHJvbXB0KCk7XHJcbn07XHJcblxyXG53aW5kb3cuY2xvc2VEZWJhdGVNb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlYmF0ZU1vZGFsJyk7XHJcbiAgaWYgKG1vZGFsKSB7XHJcbiAgICBtb2RhbC5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWNvbnRlbnQnKS5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMC45NSknO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9LCAzMDApO1xyXG4gIH1cclxufTtcclxuXHJcbndpbmRvdy5yZW5kZXJEZWJhdGVQcm9tcHQgPSBmdW5jdGlvbigpIHtcclxuICBpZiAoIXdpbmRvdy5jdXJyZW50VW5pdERhdGEgfHwgIXdpbmRvdy5jdXJyZW50VW5pdERhdGEuZGViYXRlUHJvbXB0cyB8fCB3aW5kb3cuY3VycmVudFVuaXREYXRhLmRlYmF0ZVByb21wdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGViYXRlVG9waWNTdWJ0aXRsZScpLmlubmVyVGV4dCA9IFwiTm8gcHJvbXB0cyBhdmFpbGFibGVcIjtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWJhdGVNb2RhbENvbnRlbnQnKS5pbm5lckhUTUwgPSBcIk5vIGRlYmF0ZSBwcm9tcHRzIGZvdW5kIGZvciB0aGlzIHVuaXQuXCI7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXNob3ctc3RhcnRlcicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IHByb21wdHMgPSB3aW5kb3cuY3VycmVudFVuaXREYXRhLmRlYmF0ZVByb21wdHM7XHJcbiAgY29uc3QgcHJvbXB0RGF0YSA9IHByb21wdHNbd2luZG93LmN1cnJlbnREZWJhdGVJbmRleF07XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlYmF0ZVRvcGljU3VidGl0bGUnKS5pbm5lclRleHQgPSBwcm9tcHREYXRhLnRpdGxlO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWJhdGVNb2RhbENvbnRlbnQnKS5pbm5lckhUTUwgPSBwcm9tcHREYXRhLnByb21wdDtcclxuICBcclxuICBjb25zdCBzdGFydGVyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlYmF0ZVNlbnRlbmNlU3RhcnRlckNvbnRhaW5lcicpO1xyXG4gIGNvbnN0IHN0YXJ0ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXNob3ctc3RhcnRlcicpO1xyXG4gIFxyXG4gIC8vIEhpZGUgc3RhcnRlciBieSBkZWZhdWx0IHdoZW4gY2hhbmdpbmcgcHJvbXB0c1xyXG4gIGlmIChzdGFydGVyQ29udGFpbmVyKSBzdGFydGVyQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgXHJcbiAgaWYgKHByb21wdERhdGEuc2VudGVuY2Vfc3RhcnRlciAmJiBzdGFydGVyQnRuKSB7XHJcbiAgICBzdGFydGVyQnRuLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgIHN0YXJ0ZXJCdG4uaW5uZXJUZXh0ID0gJ1Nob3cgSGludCc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGViYXRlU2VudGVuY2VTdGFydGVyVGV4dCcpLmlubmVyVGV4dCA9IHByb21wdERhdGEuc2VudGVuY2Vfc3RhcnRlcjtcclxuICB9IGVsc2UgaWYgKHN0YXJ0ZXJCdG4pIHtcclxuICAgIHN0YXJ0ZXJCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICB9XHJcbn07XHJcblxyXG53aW5kb3cudG9nZ2xlRGViYXRlU3RhcnRlciA9IGZ1bmN0aW9uKCkge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWJhdGVTZW50ZW5jZVN0YXJ0ZXJDb250YWluZXInKTtcclxuICBjb25zdCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXNob3ctc3RhcnRlcicpO1xyXG4gIGlmIChjb250YWluZXIuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XHJcbiAgICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICBidG4uaW5uZXJUZXh0ID0gJ0hpZGUgSGludCc7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgYnRuLmlubmVyVGV4dCA9ICdTaG93IEhpbnQnO1xyXG4gIH1cclxufTtcclxuXHJcbndpbmRvdy5jeWNsZURlYmF0ZVByb21wdCA9IGZ1bmN0aW9uKGRpcmVjdGlvbikge1xyXG4gIGlmICghd2luZG93LmN1cnJlbnRVbml0RGF0YSB8fCAhd2luZG93LmN1cnJlbnRVbml0RGF0YS5kZWJhdGVQcm9tcHRzKSByZXR1cm47XHJcbiAgY29uc3QgcHJvbXB0cyA9IHdpbmRvdy5jdXJyZW50VW5pdERhdGEuZGViYXRlUHJvbXB0cztcclxuICB3aW5kb3cuY3VycmVudERlYmF0ZUluZGV4ICs9IGRpcmVjdGlvbjtcclxuICBpZiAod2luZG93LmN1cnJlbnREZWJhdGVJbmRleCA8IDApIHdpbmRvdy5jdXJyZW50RGViYXRlSW5kZXggPSBwcm9tcHRzLmxlbmd0aCAtIDE7XHJcbiAgaWYgKHdpbmRvdy5jdXJyZW50RGViYXRlSW5kZXggPj0gcHJvbXB0cy5sZW5ndGgpIHdpbmRvdy5jdXJyZW50RGViYXRlSW5kZXggPSAwO1xyXG4gIHdpbmRvdy5yZW5kZXJEZWJhdGVQcm9tcHQoKTtcclxufTtcclxuXHJcbi8vIC0tLSBNaWxlc3RvbmUgTW9kYWwgR2xvYmFsIEZ1bmN0aW9ucyAtLS1cclxud2luZG93LmluamVjdE1pbGVzdG9uZU1vZGFsSWZOZWVkZWQgPSBmdW5jdGlvbigpIHtcclxuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbGVzdG9uZU1vZGFsJykpIHJldHVybjtcclxuICBjb25zdCBodG1sID0gYFxyXG4gIDxkaXYgaWQ9XCJtaWxlc3RvbmVNb2RhbFwiIGNsYXNzPVwibW9kYWwtb3ZlcmxheSBuby1wcmludFwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGZpeGVkOyB0b3A6IDA7IGxlZnQ6IDA7IHdpZHRoOiAxMDB2dzsgaGVpZ2h0OiAxMDB2aDsgYmFja2dyb3VuZDogcmdiYSgxNSwgMjMsIDQyLCAwLjY1KTsgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDhweCk7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBhbGlnbi1pdGVtczogY2VudGVyOyB6LWluZGV4OiAxMDAwOyBvcGFjaXR5OiAwOyB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZTtcIiBvbmNsaWNrPVwiaWYoZXZlbnQudGFyZ2V0ID09PSB0aGlzKSB3aW5kb3cuY2xvc2VNaWxlc3RvbmVNb2RhbCgpXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiIHN0eWxlPVwiYmFja2dyb3VuZDogdmFyKC0tbmF2eSk7IGJvcmRlcjogMi41cHggc29saWQgdmFyKC0tZ29sZCk7IGJvcmRlci1yYWRpdXM6IDEycHg7IHBhZGRpbmc6IDI1cHg7IG1heC13aWR0aDogNTAwcHg7IHdpZHRoOiA5MCU7IGNvbG9yOiAjZmZmZmZmOyBwb3NpdGlvbjogcmVsYXRpdmU7IGJveC1zaGFkb3c6IDAgMTBweCAzMHB4IHJnYmEoMCwwLDAsMC41KTsgdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTsgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1vZGFsLWNsb3NlLWJ0blwiIG9uY2xpY2s9XCJ3aW5kb3cuY2xvc2VNaWxlc3RvbmVNb2RhbCgpXCIgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMTVweDsgcmlnaHQ6IDE1cHg7IGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyBib3JkZXI6IG5vbmU7IGNvbG9yOiAjZmZmZmZmOyBmb250LXNpemU6IDE2cHQ7IGN1cnNvcjogcG9pbnRlcjsgdHJhbnNpdGlvbjogY29sb3IgMC4ycztcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLXhtYXJrXCI+PC9pPjwvYnV0dG9uPlxyXG4gICAgICA8ZGl2IGlkPVwibW9kYWxNaWxlc3RvbmVDb250ZW50XCI+XHJcbiAgICAgICAgPCEtLSBDb250ZW50IGR5bmFtaWNhbGx5IHBvcHVsYXRlZCB2aWEgc2hvd01pbGVzdG9uZU1vZGFsIC0tPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PmA7XHJcbiAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGh0bWwpO1xyXG59O1xyXG5cclxud2luZG93LnNob3dNaWxlc3RvbmVNb2RhbCA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgd2luZG93LmluamVjdE1pbGVzdG9uZU1vZGFsSWZOZWVkZWQoKTtcclxuICBpZiAoIXdpbmRvdy5jdXJyZW50VW5pdERhdGEgfHwgIXdpbmRvdy5jdXJyZW50VW5pdERhdGEubWlsZXN0b25lcykgcmV0dXJuO1xyXG4gIGNvbnN0IGRhdGEgPSB3aW5kb3cuY3VycmVudFVuaXREYXRhLm1pbGVzdG9uZXNbaWRdO1xyXG4gIGlmICghZGF0YSkgcmV0dXJuO1xyXG4gIFxyXG4gIGNvbnN0IGNvbnRlbnRCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWxNaWxlc3RvbmVDb250ZW50Jyk7XHJcbiAgaWYgKGNvbnRlbnRCb3gpIHtcclxuICAgIGNvbnRlbnRCb3guaW5uZXJIVE1MID0gYFxyXG4gICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxMXB0OyBmb250LXdlaWdodDogYm9sZDsgY29sb3I6IHZhcigtLWdvbGQpOyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyBtYXJnaW4tYm90dG9tOiA1cHg7XCI+TWlsZXN0b25lICR7aWR9OiAke2RhdGEueWVhcn08L2Rpdj5cclxuICAgICAgPGgzIHN0eWxlPVwiZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtaGVhZGluZyk7IGZvbnQtc2l6ZTogMS41cmVtOyBtYXJnaW4tdG9wOiAwOyBtYXJnaW4tYm90dG9tOiAxNXB4OyBib3JkZXItYm90dG9tOiAxLjVweCBzb2xpZCB2YXIoLS1nb2xkKTsgcGFkZGluZy1ib3R0b206IDVweDsgY29sb3I6ICNmZmZmZmY7XCI+JHtkYXRhLnRpdGxlfTwvaDM+XHJcbiAgICAgIDxpbWcgc3JjPVwiJHtnZXRBc3NldFVybChkYXRhLmltZyl9XCIgYWx0PVwiJHtkYXRhLnRpdGxlfVwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IG1heC1oZWlnaHQ6IDIwMHB4OyBvYmplY3QtZml0OiBjb3ZlcjsgYm9yZGVyLXJhZGl1czogNnB4OyBib3JkZXI6IDEuNXB4IHNvbGlkIHZhcigtLWdvbGQpOyBtYXJnaW4tYm90dG9tOiAxNXB4O1wiPlxyXG4gICAgICA8cCBzdHlsZT1cImZvbnQtc2l6ZTogMTAuNXB0OyBsaW5lLWhlaWdodDogMS41OyBjb2xvcjogI2UyZThmMDsgbWFyZ2luLWJvdHRvbTogMTVweDsgdGV4dC1hbGlnbjoganVzdGlmeTtcIj4ke2RhdGEuZGVzY308L3A+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMDYpOyBwYWRkaW5nOiAxMnB4OyBib3JkZXItcmFkaXVzOiA2cHg7IGJvcmRlci1sZWZ0OiAzcHggc29saWQgdmFyKC0tZ29sZCk7XCI+XHJcbiAgICAgICAgPHN0cm9uZyBzdHlsZT1cImRpc3BsYXk6IGJsb2NrOyBmb250LXNpemU6IDlwdDsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgY29sb3I6IHZhcigtLWdvbGQpOyBtYXJnaW4tYm90dG9tOiA0cHg7XCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jaXJjbGUtcXVlc3Rpb25cIj48L2k+IFJldHJpZXZhbCBDaGFsbGVuZ2U8L3N0cm9uZz5cclxuICAgICAgICA8c3BhbiBzdHlsZT1cImZvbnQtc2l6ZTogOS41cHQ7IGxpbmUtaGVpZ2h0OiAxLjQ7IGNvbG9yOiAjZjhmYWZjO1wiPiR7ZGF0YS50cml2aWF9PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgfVxyXG4gIFxyXG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbGVzdG9uZU1vZGFsJyk7XHJcbiAgaWYgKG1vZGFsKSB7XHJcbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgLy8gVHJpZ2dlciByZWZsb3dcclxuICAgIHZvaWQgbW9kYWwub2Zmc2V0V2lkdGg7XHJcbiAgICBtb2RhbC5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWNvbnRlbnQnKS5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMSknO1xyXG4gIH1cclxufTtcclxuXHJcbndpbmRvdy5jbG9zZU1pbGVzdG9uZU1vZGFsID0gZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWlsZXN0b25lTW9kYWwnKTtcclxuICBpZiAobW9kYWwpIHtcclxuICAgIG1vZGFsLnN0eWxlLm9wYWNpdHkgPSAnMCc7X
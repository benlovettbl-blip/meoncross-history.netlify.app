import { renderHomepage, renderSidebar, renderExamGuide } from './engine/home_renderer.js';
import { renderLesson } from './engine/lesson_renderer.js';
import { renderExamPracticeZone } from './exam_practice_zone.js';
import { appStore } from './engine/store.js';
import { initKeyIndividualsTask, generateKeyIndividualCardHTML, generateKeyIndividualEmbedHTML } from './key_individuals.js';
import { renderQuizZone } from './quiz_zone.js';
import { sanitizeLessonData, cleanQuestionText } from './data_parser.js';
import { sectionAGuide, sectionBGuide, middleEastGuide, weimarGuide , elizabethGuide} from './exam_guide_content.js';
import { renderCoverSourcesHTML } from './cover_sources.js';
import { renderKeyTopicLessonsHTML } from './lesson_cards.js';

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
  appStore.state.activeUnitData = unitData;
  
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
        (document.getElementById('content-area') || window).scrollTo({ top: 0, behavior: 'smooth' });
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

  window.renderDashboard = function(skipHistory = false) {
    if (!skipHistory) {
      try {
        const url = new URL(window.location);
        url.searchParams.delete('lesson');
        history.pushState({ dashboard: true }, "", url);
      } catch (e) {
        console.warn('History routing disabled (e.g. file:// protocol):', e);
      }
    }
    document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
    const homeLink = document.querySelector('.lesson-link');
    if (homeLink) homeLink.classList.add('active');
    renderHomepage();
    (document.getElementById('content-area') || window).scrollTo({ top: 0, behavior: 'smooth' });
  };

  

  

  // Render Sidebar
  

  
  // Global markdown formatter for inline text and bullet points
  window.formatBold = function(text) {
      if (!text) return '';
      let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Handle blockquotes
      parsed = parsed.replace(/(^|\n)> (.*?)(?=\n|$)/g, '$1<blockquote style="border-left: 4px solid #cbd5e1; padding-left: 15px; margin-left: 0; color: #475569; font-style: italic; background: rgba(248, 250, 252, 0.5); padding-top: 5px; padding-bottom: 5px; border-radius: 0 4px 4px 0;">$2</blockquote>');
      // Handle headers
      parsed = parsed.replace(/(^|\n)### (.*?)(?=\n|$)/g, '$1<h4 style="color: #1e3a8a; margin-top: 15px; margin-bottom: 5px;">$2</h4>');
      parsed = parsed.replace(/(^|\n)## (.*?)(?=\n|$)/g, '$1<h3 style="color: #1e3a8a; margin-top: 15px; margin-bottom: 5px;">$2</h3>');
      
      parsed = parsed.replace(/\\n/g, '\n');
      
      // Handle lists
      if (parsed.match(/(^|\n)[\*\-]\s/)) {
        parsed = parsed.replace(/(^|\n)[\*\-]\s+(.*)/g, '$1<li>$2</li>');
        parsed = parsed.replace(/(<li>.*<\/li>(?:\n<li>.*<\/li>)*)/g, '<ul style="margin-top: 5px; margin-bottom: 5px; padding-left: 20px;">\n$1\n</ul>');
      }

      // Handle italics (after lists so we don't conflict with bullet points)
      parsed = parsed.replace(/\*([^\*]+)\*/g, '<i>$1</i>');
      
      parsed = parsed.replace(/\n/g, '<br>');
      // Clean up <br> around elements
      parsed = parsed.replace(/<br><ul/g, '<ul').replace(/<\/ul><br>/g, '</ul>').replace(/<br><li>/g, '<li>').replace(/<\/li><br>/g, '</li>');
      parsed = parsed.replace(/<br><blockquote/g, '<blockquote').replace(/<\/blockquote><br>/g, '</blockquote>');
      parsed = parsed.replace(/<br><h/g, '<h').replace(/<\/h4><br>/g, '</h4>').replace(/<\/h3><br>/g, '</h3>');
      
      return parsed;
    };
  
  // Render Lesson Content
    window.renderLessonByIndex = function(index, skipHistory = false) {
      if (unitData && unitData.lessons && unitData.lessons[index]) {
        if (!skipHistory) {
          try {
            const url = new URL(window.location);
            url.searchParams.set('lesson', index);
            history.pushState({ lessonIndex: index }, "", url);
          } catch (e) {
            console.warn('History routing disabled (e.g. file:// protocol):', e);
          }
        }
        document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
        // Try to activate the corresponding sidebar link
        const links = document.querySelectorAll('.lesson-link');
        const isKS3 = unitData.title && unitData.title.includes('KS3');
        if (!isKS3 && links.length > index + 1) { // +1 because the first link is Unit Homepage
            links[index + 1].classList.add('active');
        }
        renderLesson(unitData.lessons[index]);
        (document.getElementById('content-area') || window).scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    
  
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
    
    // Initial Render - load homepage or specific lesson based on URL
    const urlParams = new URLSearchParams(window.location.search);
    const lessonIdx = urlParams.get('lesson');
    if (lessonIdx !== null && !isNaN(lessonIdx)) {
      window.renderLessonByIndex(parseInt(lessonIdx), true);
    } else {
      renderHomepage();
    }
    
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.customTab) {
        // Trigger the corresponding custom tab
        const links = document.querySelectorAll('.lesson-link');
        links.forEach(l => {
          if (l.innerText.toLowerCase().includes(e.state.customTab.replace('_', ' '))) {
            l.click();
          }
        });
      } else if (e.state && e.state.lessonIndex !== undefined) {
        window.renderLessonByIndex(e.state.lessonIndex, true);
      } else {
        window.renderDashboard(true);
      }
    });
  } else {
    contentArea.innerHTML = "<h2>No lessons found in data.js</h2>";
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

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


  function assignQuestionNumbers(lesson) {
    let globalQNum = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = globalQNum++;
    if (lesson.sources) lesson.sources.forEach(source => { if (source.question) source.qNum = globalQNum++; });
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = globalQNum++);
    if (lesson.historians_corner && lesson.historians_corner.stretch_question) lesson.historians_corner.qNum = globalQNum++;
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => {
        if (block.source && block.source.question) block.source.qNum = globalQNum++;
        if (block.tasks) block.tasks.forEach(task => { if (task.type !== 'vocab_match') task.qNum = globalQNum++; });
        if (block.hinge_question) block.hinge_question.qNum = globalQNum++;
      });
    }
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = globalQNum++;
    if (lesson.gcse_task) lesson.gcse_task.qNum = globalQNum++;
    if (lesson.pair_share) lesson.pair_share.qNum = globalQNum++;
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
      const prefix = qNum && qNum !== '-' && qNum !== 'Do Now' ? `Q${qNum}. ` : (qNum === 'Do Now' ? '<strong>[Do Now]</strong> ' : '');
      html += `
        <div class="wb-question-card" style="cursor:pointer;" onclick="this.querySelector('.wb-answer').classList.toggle('revealed')" title="Click to reveal answer">
          <div style="font-weight: bold;">${prefix}${questionText}</div>
          <div class="wb-answer">${finalAnswer}</div>
        </div>
      `;
    };

    if (activeLesson.do_now) {
      if (activeLesson.do_now.type === "timeline" && activeLesson.do_now.prediction_question) {
        addQuestionCard('Do Now', activeLesson.do_now.prediction_question, activeLesson.do_now.model || activeLesson.do_now.answer || '');
      } else if (activeLesson.do_now.type === "questions") {
        activeLesson.do_now.items.forEach(item => {
           addQuestionCard('Do Now', item.question, item.answer || '');
        });
      }
    }

    if (activeLesson.primary_source && activeLesson.primary_source.question) {
      addQuestionCard(activeLesson.primary_source.qNum, activeLesson.primary_source.question, activeLesson.primary_source.model_answer || '');
    }
    
    if (activeLesson.sources) {
      activeLesson.sources.forEach(source => {
        if (source.question) addQuestionCard(source.qNum, source.question, source.model_answer || '');
      });
    }

    if (activeLesson.tasks) {
      activeLesson.tasks.forEach(task => {
        addQuestionCard(task.qNum, task.text || task.question || '', task.model || task.model_answer || '');
      });
    }

    if (activeLesson.historians_corner && activeLesson.historians_corner.stretch_question) {
      addQuestionCard(activeLesson.historians_corner.qNum, activeLesson.historians_corner.stretch_question, activeLesson.historians_corner.model_answer || '');
    }
    
    if (activeLesson.narrative_blocks) {
      activeLesson.narrative_blocks.forEach(block => {
        if (block.source && block.source.question) {
          addQuestionCard(block.source.qNum, block.source.question, block.source.model_answer || '');
        }
        if (block.tasks) {
          block.tasks.forEach(task => {
            if (task.type !== 'vocab_match') {
              addQuestionCard(task.qNum, task.text || task.question || '', task.model || task.model_answer || '');
            }
          });
        }
        if (block.hinge_question) {
          addQuestionCard(block.hinge_question.qNum, block.hinge_question.question || block.hinge_question, block.hinge_question.model_answer || '');
        }
      });
    }
    
    if (activeLesson.extended && activeLesson.extended.question) {
      addQuestionCard(activeLesson.extended.qNum, activeLesson.extended.question, activeLesson.extended.model_answer || '');
    }

    if (activeLesson.gcse_task && (activeLesson.gcse_task.question || activeLesson.gcse_task.prompt)) {
      addQuestionCard(activeLesson.gcse_task.qNum, activeLesson.gcse_task.question || activeLesson.gcse_task.prompt, activeLesson.gcse_task.model_answer || '');
    }

    if (activeLesson.pair_share && activeLesson.pair_share.prompt) {
      addQuestionCard(activeLesson.pair_share.qNum, activeLesson.pair_share.prompt, "Discuss in pairs.");
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

// --- Key Individual Link Global Functions ---
window.jumpToKeyIndividual = function(name) {
    let targetTab = 'historical_individuals'; // default
    let linkSearchStr = 'Historical Individuals';
    
    if (window.db && window.currentUnitId && window.db[window.currentUnitId]) {
      const unitData = window.db[window.currentUnitId].data || window.db[window.currentUnitId];
      if (unitData && unitData.key_individuals) {
         const person = unitData.key_individuals.find(p => p.name.toLowerCase() === name.toLowerCase());
         if (person && person.group === 'Historians') {
            targetTab = 'historians';
            linkSearchStr = 'Historians';
         }
      }
    }

    const url = new URL(window.location);
    url.searchParams.set('tab', targetTab);
    history.pushState({ customTab: targetTab }, "", url);
  
    // 1. Find the sidebar link and click it
    const kiLinks = document.querySelectorAll('.lesson-link');
    let targetLink = null;
    kiLinks.forEach(l => {
      // Avoid partial match false positives (e.g. "Historical Individuals" contains "Historians" if not careful, though technically it doesn't)
      if (l.innerText.includes(linkSearchStr)) {
         if (linkSearchStr === 'Historians' && l.innerText.includes('Historical')) {
             return; // skip
         }
         targetLink = l;
      }
    });
  if (targetLink) {
    targetLink.click();
  }
  
  // 2. Wait for the page to render then find and scroll to the card
  setTimeout(() => {
    const cards = document.querySelectorAll('.person-card');
    let targetCard = null;
    cards.forEach(card => {
      const h3 = card.querySelector('h3');
      if (h3 && h3.innerText.toLowerCase().includes(name.toLowerCase())) {
        targetCard = card;
      }
    });
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const originalBoxShadow = targetCard.style.boxShadow;
      targetCard.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.5)';
      targetCard.style.transition = 'box-shadow 0.3s ease';
      setTimeout(() => {
        targetCard.style.boxShadow = originalBoxShadow;
      }, 2000);
    }
  }, 100);
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

window.openKeyInfoModal = function() {
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
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
        <h4 style="margin: 0 0 5px 0; color: #334155; font-size: 1rem;"><i class="fa-solid fa-bus" style="width:20px; color:#64748b;"></i> Transport Provider</h4>
        <p style="margin: 0; color: #0f172a; font-weight: 600;">${info.coach}</p>
      </div>
      <div style="text-align: right;">
        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
};

  window.openTourGuideModal = function(lessonIndex) {
    const lesson = window.currentUnitData.lessons[lessonIndex];
    if (!lesson || !lesson.tour_guide_script) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay no-print';
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(10px); justify-content: center; align-items: center; z-index: 2000; display: flex;';
    overlay.onclick = function(e) {
      if (e.target === overlay) overlay.remove();
    };
    
    let blocksHtml = lesson.tour_guide_script.map(block => `
      <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0;">
        <h4 style="color: #1e293b; font-size: 1.25rem; margin-bottom: 15px; border-left: 4px solid #6366f1; padding-left: 12px;">${block.theme_heading}</h4>
        <div style="font-size: 1.1rem; line-height: 1.6; color: #334155;">${block.text}</div>
      </div>
    `).join('');

    overlay.innerHTML = `
      <div class="modal-content" style="background: white; max-width: 800px; width: 90%; max-height: 90vh; overflow-y: auto; padding: 40px; border-radius: 12px; font-family: 'Outfit', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #6366f1; padding-bottom: 15px;">
          <h3 style="margin: 0; color: #1e293b; font-size: 1.8rem;"><i class="fa-solid fa-bullhorn" style="color:#6366f1; margin-right:12px;"></i> Tour Guide Script</h3>
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()"><i class="fa-solid fa-times"></i> Close</button>
        </div>
        ${blocksHtml}
        <div style="text-align: right; margin-top: 20px;">
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close Script</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
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
  
  window.currentQuizData = lesson.quiz.map(q => {
    if (!q.options && q.distractors && q.distractors.length > 0) {
      let opts = [q.answer || q.a, ...q.distractors];
      opts = opts.sort(() => Math.random() - 0.5);
      const correctIdx = opts.indexOf(q.answer || q.a);
      return { ...q, options: opts, answer: correctIdx };
    } else if (q.options && typeof (q.answer || q.a) === 'string') {
      let opts = [...q.options];
      opts = opts.sort(() => Math.random() - 0.5);
      return { ...q, options: opts, answer: opts.indexOf(q.answer || q.a) };
    }
    return q;
  });
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
  if (qData.options) {
    qData.options.forEach((opt, idx) => {
      optionsHtml += `
        <button class="quiz-option-btn" data-idx="${idx}" onclick="window.checkQuizAnswer(this, ${idx})" style="display: block; width: 100%; text-align: left; padding: 15px; margin-bottom: 10px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 1.05rem; color: #334155; cursor: pointer; transition: all 0.2s;">
          <span style="display: inline-block; width: 30px; height: 30px; line-height: 30px; text-align: center; background: #e2e8f0; border-radius: 50%; margin-right: 15px; font-weight: bold; color: #64748b;">${String.fromCharCode(65 + idx)}</span>
          ${opt}
        </button>
      `;
    });
  } else {
    optionsHtml = `
      <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 15px;">
         <button class="btn btn-secondary" onclick="this.nextElementSibling.style.display='block'; this.style.display='none'; document.getElementById('quiz-next-btn').style.display='block';">Reveal Answer</button>
         <div style="display: none; font-size: 1.15rem; color: #059669; font-weight: bold; padding: 10px;">${qData.a || qData.answer || ''}</div>
      </div>
    `;
  }
  
  document.getElementById('quiz-question-container').innerHTML = `
    <h3 style="font-size: 1.3rem; color: #0f172a; margin-bottom: 20px; line-height: 1.4;">${qData.question || qData.q}</h3>
    ${optionsHtml}
  `;
  
  document.getElementById('quiz-feedback').innerHTML = '';
  
  const nextBtn = document.getElementById('quiz-next-btn');
  if (!qData.options) {
    nextBtn.style.display = 'none'; // Will be revealed when answer is shown
  } else {
    nextBtn.style.display = 'none';
  }
  
  if (window.currentQuizIndex >= window.currentQuizData.length - 1) {
    nextBtn.innerHTML = 'Finish <i class="fa-solid fa-check"></i>';
    nextBtn.onclick = window.closeQuizModal;
  } else {
    nextBtn.innerHTML = 'Next Question <i class="fa-solid fa-arrow-right"></i>';
    nextBtn.onclick = window.nextQuizQuestion;
  }
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
      
      const img = document.createElement('img');
      img.src = src;
      img.style.maxWidth = '90%';
      img.style.maxHeight = '90%';
      img.style.borderRadius = '8px';
      img.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
      img.style.transition = 'transform 0.1s ease';
      img.style.cursor = 'zoom-in';

      let scale = 1;
      modal.addEventListener('wheel', (e) => {
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

      modal.onclick = (e) => {
          if (scale > 1) {
              scale = 1;
              img.style.transform = `scale(1)`;
              img.style.cursor = 'zoom-in';
          } else {
              modal.remove();
          }
      };
      
      modal.appendChild(img);
      document.body.appendChild(modal);
    };

window.openGallery = function(encodedData, startIndex) {
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
    prevBtn.onclick = (e) => { e.stopPropagation(); scale = 1; img.style.transform = 'scale(1)'; if (currentIndex > 0) { currentIndex--; updateImage(); } };
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
    nextBtn.onclick = (e) => { e.stopPropagation(); scale = 1; img.style.transform = 'scale(1)'; if (currentIndex < images.length - 1) { currentIndex++; updateImage(); } };
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
      if (e.key === 'ArrowLeft' && currentIndex > 0) { currentIndex--; updateImage(); }
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) { currentIndex++; updateImage(); }
    };
    document.addEventListener('keydown', keyHandler);

    updateImage();
    document.body.appendChild(modal);
  };

  window.startTPSTimer = function(btn, seconds) {
    if (btn.timerInterval) return;
    btn.originalHTML = btn.innerHTML;
    let timeLeft = seconds;
    btn.innerHTML = '<i class="fa-regular fa-clock"></i> ' + timeLeft + 's';
    btn.style.background = '#ef4444';
    
    btn.timerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(btn.timerInterval);
        btn.timerInterval = null;
        btn.innerHTML = '<i class="fa-regular fa-bell"></i> Time!';
        setTimeout(() => {
          btn.innerHTML = btn.originalHTML;
          btn.style.background = '#10b981';
        }, 4000);
      } else {
        btn.innerHTML = '<i class="fa-regular fa-clock"></i> ' + timeLeft + 's';
      }
    }, 1000);
  };

  
  window.openTeacherGuideModal = function() {
    if (document.getElementById('teacherGuideModal')) return;
    const html = `
    <div id="teacherGuideModal" class="modal-overlay no-print" style="display: flex; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(10px); justify-content: center; align-items: center; z-index: 2000; opacity: 0; transition: opacity 0.3s ease;" onclick="if(event.target === this) this.remove()">
      <div class="modal-content" style="background: white; border-radius: 12px; padding: 40px; max-width: 800px; width: 90%; max-height: 90vh; overflow-y: auto; color: #1e293b; position: relative; font-family: 'Outfit', sans-serif;">
        <button onclick="this.closest('.modal-overlay').remove()" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: #64748b; font-size: 18pt; cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
        
        <h2 style="font-family: 'Playfair Display', serif; color: #4f46e5; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; font-size: 2rem;">
          <i class="fa-solid fa-chalkboard-user"></i> Teacher & Tour Guide Instructions
        </h2>
        
        <p style="font-size: 1.1rem; line-height: 1.6;">Welcome to the Meoncross Battlefield Tour App! This app is designed with a "Dual Interface" to keep pupils engaged while giving you, the teacher, all the information you need.</p>
        
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
          <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()" style="background: #4f46e5; color: white; padding: 10px 30px; font-size: 1.1rem; border-radius: 8px; border: none; cursor: pointer;">Got it!</button>
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
  window.unlockMission = function(btnElement, siteId) {
    const container = btnElement.closest('.geo-fence-container');
    
    // Simulate GPS Delay
    if (btnElement && !btnElement.classList.contains('geo-btn-loading') && !btnElement.closest('h4')) {
      const originalText = btnElement.innerHTML;
      btnElement.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Acquiring Signal...';
      btnElement.classList.add('geo-btn-loading');
      btnElement.style.pointerEvents = 'none';
      setTimeout(() => window.unlockMission(btnElement, siteId), 1500);
      return;
    }
    
    let missionHTML = '';
    
    if (siteId === 'brooding_soldier') {
      missionHTML = `
        <div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <h4 style="color: #059669; margin: 0 0 10px 0; font-family: 'Playfair Display', serif; font-size: 1.4rem;"><i class="fa-solid fa-unlock"></i> Mission Unlocked: The Direction of the Gas</h4>
          <p style="font-size: 1.05rem; color: #334155;"><strong>Task:</strong> Open your phone's compass app. Stand at the base of the Canadian memorial and turn until you are facing the exact direction the German gas attack came from (North-East).</p>
          <div style="background: #ecfdf5; padding: 15px; border-left: 4px solid #10b981; margin: 15px 0; border-radius: 0 4px 4px 0;">
            <em style="color: #065f46;">"Gas! GAS! Quick, boys!—An ecstasy of fumbling..."</em><br><small style="color: #047857;">- Wilfred Owen</small>
          </div>
          <p style="color: #b91c1c; font-weight: bold; margin-bottom: 5px;"><i class="fa-solid fa-brain"></i> Learn these 3 facts by heart before getting back on the coach:</p>
          <ul style="margin: 0; padding-left: 20px; color: #475569; line-height: 1.5;">
            <li>Chlorine gas severely damaged the respiratory system, causing victims to suffocate.</li>
            <li>The earliest defense was holding cotton pads soaked in urine over the mouth (ammonia neutralized chlorine).</li>
            <li>The memorial shows a soldier in a 'reverse arms' position, signifying mourning, not victory.</li>
          </ul>
        </div>
      `;
    } else if (siteId === 'tyne_cot') {
       const db = window.currentUnitData?.missions_database?.tyne_cot_soldiers;
       if (db && db.length > 0) {
         const soldier = db[Math.floor(Math.random() * db.length)];
         missionHTML = `
           <div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
             <h4 style="color: #059669; margin: 0 0 15px 0; font-family: 'Playfair Display', serif; font-size: 1.4rem;"><i class="fa-solid fa-unlock"></i> Mission Unlocked: Tell Their Story</h4>
             <div style="background: #f8fafc; padding: 20px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #3b82f6;">
               <h3 style="margin: 0 0 5px 0; color: #1e293b; font-size: 1.3rem;"></h3>
               <p style="margin: 0 0 5px 0; color: #475569;"><strong>Regiment:</strong> </p>
               <p style="margin: 0 0 15px 0; color: #ef4444; font-weight: bold; font-size: 1.1rem;"><i class="fa-solid fa-map-pin"></i> <strong>Location:</strong> </p>
               <p style="margin: 0; font-size: 1rem; line-height: 1.6; color: #334155;"></p>
             </div>
             <div style="background: #fff1f2; padding: 15px; border-radius: 6px; border: 1px solid #fecdd3;">
               <p style="margin: 0; color: #be123c; font-weight: bold; font-size: 1.05rem;"><i class="fa-solid fa-person-chalkboard"></i> Task: Find this exact grave or panel. At the end of the visit, you will be asked to orally tell the rest of your group about this soldier.</p>
             </div>
           </div>
         `;
       } else {
         missionHTML = "<p>Error loading soldier database.</p>";
       }
    } else if (siteId === 'langemarck') {
       const db = window.currentUnitData?.missions_database?.langemarck_soldiers;
       if (db && db.length > 0) {
         const soldier = db[Math.floor(Math.random() * db.length)];
         missionHTML = `
           <div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
             <h4 style="color: #059669; margin: 0 0 15px 0; font-family: 'Playfair Display', serif; font-size: 1.4rem;"><i class="fa-solid fa-unlock"></i> Mission Unlocked: The Individuals</h4>
             <div style="background: #f8fafc; padding: 20px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #1e293b;">
               <h3 style="margin: 0 0 5px 0; color: #1e293b; font-size: 1.3rem;"></h3>
               <p style="margin: 0 0 5px 0; color: #475569;"><strong>Regiment:</strong> </p>
               <p style="margin: 0 0 15px 0; color: #ef4444; font-weight: bold; font-size: 1.1rem;"><i class="fa-solid fa-map-pin"></i> <strong>Location:</strong> </p>
               <p style="margin: 0; font-size: 1rem; line-height: 1.6; color: #334155;"></p>
             </div>
             <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">
               <p style="margin: 0; color: #334155; font-weight: bold;"><i class="fa-solid fa-magnifying-glass"></i> Task: Look at the names on the bronze oak panels. Remember that every German soldier in the mass grave had a story and family similar to the one above.</p>
             </div>
           </div>
         `;
       } else {
         missionHTML = "<p>Error loading soldier database.</p>";
       }
    } else if (siteId === 'menin_gate') {
        missionHTML = `
          <div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h4 style="color: #059669; margin: 0 0 15px 0; font-family: 'Playfair Display', serif; font-size: 1.4rem;"><i class="fa-solid fa-unlock"></i> Mission Unlocked: Local Hero & The Empire</h4>
            
            <div style="margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px;">
              <h4 style="margin: 0 0 10px 0; color: #1e293b;"><i class="fa-solid fa-magnifying-glass-location" style="color: #3b82f6;"></i> Task 1: Find the Local Hero</h4>
              
              <div style="background: #f8fafc; padding: 20px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #3b82f6;">
                <h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 1.3rem;">Private T. J. Franklin</h3>
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6; color: #334155;">
                  <strong>Service Number:</strong> 8560<br>
                  <strong>Regiment:</strong> 1st Battalion, The Hampshire Regiment<br>
                  <strong>Born:</strong> Alverstoke, Hampshire, in about 1893.<br><br>
                  <strong>Local Connection:</strong> He was the son of George Franklin (an Army Pensioner and farm labourer) and Mary Ann Jane Franklin. The family lived at Chark Cottage in Stubbington, and later moved to Meadow Cottage, Chark, Lee-on-the-Solent.<br><br>
                  <strong>Military Service & Fate:</strong> Enlisted at Gosport. He was deployed to the Western Front in August 1914. He was killed in action on <strong>29th April 1915</strong> during the Second Battle of Ypres. His battalion was holding an exposed section of the line on the Frezenberg Ridge to cover an Allied withdrawal, enduring intense German shelling and the first ever military poison gas attacks.
                </p>
              </div>
              <p style="margin: 0; color: #b91c1c; font-weight: bold;"><i class="fa-solid fa-person-chalkboard"></i> Action: The Menin Gate has 54,000 names. Locate the specific panel for Private T. J. Franklin.</p>
            </div>
            
            <div>
              <h4 style="margin: 0 0 5px 0; color: #1e293b;"><i class="fa-solid fa-monument" style="color: #f59e0b;"></i> Task 2: The Indian Forces Memorial</h4>
              <p style="margin: 0; color: #475569;">Once you have found his name, walk out of the gate and up onto the grassy ramparts. Locate the <strong>Indian Forces Memorial</strong>. 130,000 troops from the Indian subcontinent served in Flanders. Take a moment to read the inscription before the Last Post begins at 8:00 PM.</p>
            </div>
          </div>
        `;
    }
    
    if (missionHTML) {
      container.style.border = 'none';
      container.style.background = 'transparent';
      container.style.padding = '0';
      container.style.boxShadow = 'none';
      container.innerHTML = missionHTML;
    }
  };

  window.handleSecretUnlock = function(element, siteId) {
    const now = Date.now();
    const lastClick = element.dataset.lastClick ? parseInt(element.dataset.lastClick) : 0;
    let clicks = element.dataset.clicks ? parseInt(element.dataset.clicks) : 0;
    
    // If more than 1.5 seconds have passed since the last click, reset the counter
    if (now - lastClick > 1500) {
      clicks = 1;
    } else {
      clicks++;
    }
    
    element.dataset.lastClick = now;
    element.dataset.clicks = clicks;
    
    // 4 quick taps to unlock
    if (clicks >= 4) {
      window.unlockMission(element, siteId);
    }
  };
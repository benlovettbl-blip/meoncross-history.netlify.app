import { renderRevisionZone } from './revision_zone.js';
import { renderExamPracticeZone } from './exam_practice_zone.js';
export function initializeApp(unitData) {
  document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const contentArea = document.getElementById('content-area');
  const btnDyslexia = document.getElementById('btn-dyslexia');

  // Inject Custom Styles for Layout & SEN (No Icons)
  const style = document.createElement('style');
  style.textContent = `
    .phase-card {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 30px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    .phase-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: #0f172a;
      margin-top: 0;
      margin-bottom: 20px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
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
      border-bottom: 2px dashed #002855;
      cursor: help;
      color: #002855;
      font-weight: 700;
      background: #fef08a;
      padding: 0 4px;
      border-radius: 3px;
    }
    .vocab-word:hover::after {
      content: attr(data-definition);
      position: absolute;
      bottom: 130%;
      left: 50%;
      transform: translateX(-50%);
      background: #1e293b;
      color: #ffffff;
      padding: 10px 14px;
      border-radius: 6px;
      width: 260px;
      font-size: 0.85rem;
      font-weight: 400;
      line-height: 1.4;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      white-space: normal;
      text-align: center;
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
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 15px;
      margin-bottom: 15px;
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
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }
    .flashcard-wrapper.flipped .flashcard-inner {
      transform: rotateY(180deg);
    }
    .flashcard-face {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      border: 2px solid #e2e8f0;
    }
    .flashcard-front {
      background-color: #ffffff;
      color: #0f172a;
    }
    .flashcard-front h4 {
      margin: 0 0 10px 0;
      font-size: 1.2rem;
      color: #1e3a8a;
    }
    .flashcard-front p {
      margin: 0;
      color: #64748b;
      font-size: 0.9rem;
    }
    .flashcard-back {
      background-color: #f8fafc;
      color: #334155;
      transform: rotateY(180deg);
      font-size: 1.05rem;
      line-height: 1.5;
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

    const textToRead = btnElement.parentElement.querySelector('.narrative-text').textContent;
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



  // Toggle Dyslexia Mode (Remove icon if present)
  btnDyslexia.innerHTML = 'SEN / Dyslexia Mode';
  btnDyslexia.addEventListener('click', () => {
    document.body.classList.toggle('sen-mode');
    const isSen = document.body.classList.contains('sen-mode');
    btnDyslexia.textContent = isSen ? 'Standard Mode' : 'SEN / Dyslexia Mode';
  });

  // Inject Laptop Mode & Teacher Mode Buttons
  const headerActions = document.querySelector('.header-actions');
  if (headerActions) {
    const btnLaptop = document.createElement('button');
    btnLaptop.className = 'btn btn-secondary';
    btnLaptop.style.marginRight = '10px';
    btnLaptop.innerHTML = '<i class="fa-solid fa-laptop"></i> Laptop Mode';
    
    if (localStorage.getItem('laptopMode') === 'true') {
      document.body.classList.add('laptop-mode-active');
      btnLaptop.innerHTML = '<i class="fa-solid fa-laptop"></i> Laptop Mode: ON';
      btnLaptop.style.background = '#1e293b';
      btnLaptop.style.color = '#ffffff';
    }

    btnLaptop.addEventListener('click', () => {
      document.body.classList.toggle('laptop-mode-active');
      const isActive = document.body.classList.contains('laptop-mode-active');
      localStorage.setItem('laptopMode', isActive);
      btnLaptop.innerHTML = isActive ? '<i class="fa-solid fa-laptop"></i> Laptop Mode: ON' : '<i class="fa-solid fa-laptop"></i> Laptop Mode';
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
      content.style.cssText = 'background:var(--card-bg);padding:30px;border-radius:12px;width:90%;max-width:500px;color:var(--text-color);box-shadow:0 10px 25px rgba(0,0,0,0.2);';
      
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

  // Render Sidebar
  function renderSidebar() {
    const navContainer = document.getElementById('sidebar-nav-container') || sidebar;
    navContainer.innerHTML = '';
    unitData.lessons.forEach((lesson, index) => {
      const link = document.createElement('a');
      link.className = 'lesson-link';
      if (index === 0) link.classList.add('active');
      link.textContent = lesson.title;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        renderLesson(lesson);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      navContainer.appendChild(link);
    });

    const revisionLink = document.createElement('a');
    revisionLink.className = 'lesson-link';
    revisionLink.innerHTML = '🎮 Revision Zone';
    revisionLink.style.marginTop = '15px';
    revisionLink.style.borderTop = '2px solid rgba(255,255,255,0.1)';
    revisionLink.style.color = '#fde047';
    revisionLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
      revisionLink.classList.add('active');
      const contentArea = document.getElementById('content-area');
      contentArea.innerHTML = ''; // clear
      renderRevisionZone(contentArea, unitData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    navContainer.appendChild(revisionLink);

    const examPracticeLink = document.createElement('a');
    examPracticeLink.className = 'lesson-link';
    examPracticeLink.innerHTML = '✍️ Exam Practice Zone';
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
    quizPackLink.className = 'lesson-link';
    quizPackLink.innerHTML = '📝 Printable Quiz Pack';
    quizPackLink.href = 'quiz_pack.html';
    quizPackLink.target = '_blank';
    quizPackLink.style.marginTop = '15px';
    quizPackLink.style.border = '2px dashed #059669';
    quizPackLink.style.color = '#10b981';
    navContainer.appendChild(quizPackLink);

    const workbookLink = document.createElement('a');
    workbookLink.className = 'lesson-link';
    workbookLink.textContent = 'Pupil Workbook';
    workbookLink.href = 'workbook.html';
    workbookLink.target = '_blank';
    workbookLink.style.marginTop = '15px';
    workbookLink.style.border = '2px dashed #cbd5e1';
    navContainer.appendChild(workbookLink);
  }

  // Render Lesson Content
  function renderLesson(lesson) {
    window.currentActiveLesson = lesson;
    let html = `<div class="lesson-content" style="max-width: 900px; margin: 0 auto;">`;
    
    if (unitEnquiryText) {
      html += `
        <div style="background: linear-gradient(135deg, #1e3a8a, #312e81); color: white; padding: 15px 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-size: 1.15rem; font-weight: 600; box-shadow: 0 4px 10px rgba(0,0,0,0.1); border: 2px solid #a5b4fc;">
          <i class="fa-solid fa-lightbulb" style="color: #fde047; margin-right: 10px;"></i> ${unitEnquiryText}
        </div>
      `;
    }

    html += `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; padding: 10px 15px; border-bottom: 1px solid #e2e8f0; background: #ffffff; border-radius: 8px;">
        <h4 style="margin: 0; font-size: 1.1rem; color: var(--primary);">${lesson.title}</h4>
        <div style="display: flex; gap: 8px; flex-shrink: 0;">
          <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.9rem; background: var(--accent-red); border-color: var(--accent-red);" onclick="openDebateModal()"><i class="fa-solid fa-comments"></i> Class Debate</button>
          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.9rem;" onclick="window.renderDashboard()"><i class="fa-solid fa-arrow-left"></i> Unit Menu</button>
        </div>
      </div>
      <div id="progress-container" style="background: #e2e8f0; height: 6px; width: 100%; margin-bottom: 20px; border-radius: 3px; overflow: hidden;">
        <div id="progress-bar" style="background: #10b981; height: 100%; width: 0%; transition: width 0.3s;"></div>
      </div>
    `;

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

    if (lesson.teacher_notes) {
      let notesHtml = '';
      
      // Handle the new comprehensive object structure
      if (lesson.teacher_notes && !Array.isArray(lesson.teacher_notes) && typeof lesson.teacher_notes === 'object') {
        const primerText = lesson.teacher_notes.primer ? `<div style="font-size: 1.05rem; margin-bottom: 20px;">${lesson.teacher_notes.primer}</div>` : '';
        const objectivesHtml = (lesson.teacher_notes.objectives || []).map(note => `
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><i class="fa-solid fa-bullseye" style="font-size: 0.8rem; margin-right: 4px;"></i> ${note.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: ${note.question ? '10px' : '0'};">${note.primer}</div>
            ${note.question ? `
            <div style="background: rgba(56, 189, 248, 0.1); border-left: 3px solid #38bdf8; padding: 10px; border-radius: 0 4px 4px 0;">
              <div style="color: #38bdf8; font-weight: bold; font-size: 0.85rem; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Hinge Question</div>
              <div style="color: #e0f2fe; font-size: 0.95rem; font-style: italic;">"${note.question}"</div>
            </div>` : ''}
          </div>
        `).join('');
        notesHtml = primerText + objectivesHtml;
      } 
      // Fallback for array structure
      else if (Array.isArray(lesson.teacher_notes)) {
        notesHtml = lesson.teacher_notes.map(note => `
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><i class="fa-solid fa-bullseye" style="font-size: 0.8rem; margin-right: 4px;"></i> ${note.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: ${note.question ? '10px' : '0'};">${note.primer}</div>
            ${note.question ? `
            <div style="background: rgba(56, 189, 248, 0.1); border-left: 3px solid #38bdf8; padding: 10px; border-radius: 0 4px 4px 0;">
              <div style="color: #38bdf8; font-weight: bold; font-size: 0.85rem; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Hinge Question</div>
              <div style="color: #e0f2fe; font-size: 0.95rem; font-style: italic;">"${note.question}"</div>
            </div>` : ''}
          </div>
        `).join('');
      } 
      // Fallback for simple string
      else {
        notesHtml = `<div style="font-size: 1.05rem;">${lesson.teacher_notes}</div>`;
      }

      html += `
        <div class="teacher-note">
          <h4><i class="fa-solid fa-chalkboard-user"></i> Pedagogical Primer</h4>
          ${notesHtml}
        </div>
      `;
    }

    // Process Narrative Glossary Highlight
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
          // No 'g' flag, so it only replaces the first occurrence in this chunk
          const regex = new RegExp(`\\b(${term})\\b`, 'i');
          if (regex.test(processedText)) {
            processedText = processedText.replace(regex, `<span class="vocab-word" data-definition="${def.replace(/"/g, '&quot;')}">$1</span>`);
            seenTerms.add(term);
          }
        }
      }
      return processedText;
    };

    let phaseNum = 1;
    let globalQuestionNum = 1;

    // Helper to format questions
    const formatQuestion = (qText) => {
      let cleaned = qText.replace(/^(Enquiry:|Q\d+:|Task \d+:|Question \d+[a-z]?:)\s*/i, '');
      return `Question ${globalQuestionNum++}: ${cleaned}`;
    };

    // PHASE: Visual Source & Hook
    if (lesson.primary_source) {
      let src = lesson.primary_source.src;
      // If the path doesn't start with http or ../, we assume it's relative to the current unit
      
      html += `
        <div class="phase-card">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Phase ${phaseNum++}: ${lesson.learning_objective || 'Visual Source & Hook'}</div>
          </div>
          <div class="source-card" style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
            <img src="${src}" alt="Source" style="max-height: 500px; max-width: 100%; object-fit: contain; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 15px;">
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

    // PHASE: Retrieval Recall
    if (lesson.do_now && lesson.do_now.items) {
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
        <div class="phase-card" id="phase-${phaseNum}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Phase ${phaseNum++}: Do Now Tasks</div>
            <button class="btn btn-secondary" onclick="this.closest('.phase-card').querySelectorAll('.do-now-card').forEach(c => c.classList.toggle('revealed'))" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-eye"></i> Reveal All</button>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
      `;
      lesson.do_now.items.forEach((item, index) => {
        html += `
          <div class="do-now-card" id="do-now-card-${index}" onclick="this.classList.toggle('revealed')" style="cursor: pointer;">
            <div style="font-weight: 700; margin-bottom: 8px;">Task ${index + 1}</div>
            <div>${item.question}</div>
            <div class="answer" id="do-now-ans-${index}">${item.answer}</div>
          </div>
        `;
      });
      html += `</div></div>`;
    }

    
    // PHASE: Vocabulary Unlock (Tier 3)
    const hasVocab = lesson.vocab && lesson.vocab.length > 0;
    if (hasVocab) {
      html += `
        <div class="phase-card" id="phase-${phaseNum}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #b45309;">Phase ${phaseNum++}: Vocabulary Unlock</div>
          </div>
          <p style="color: #475569; margin-bottom: 20px; font-size: 1.1rem;"><i class="fa-solid fa-spell-check" style="color: #3b82f6;"></i> <strong>Vocabulary Practice:</strong> Tap a term on the left, then tap its matching definition on the right to master the key vocabulary.</p>
          
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
        <div id="locked-content">
      `;
    }

    // PHASE: Core Information & Sources
    if (lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {
      let enquiryTitle = lesson.title.replace(/^Lesson\s*\d+:\s*/i, '');
      html += `
        <div class="phase-card" id="phase-${phaseNum}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #1e3a8a;">Phase ${phaseNum++}: ${enquiryTitle}</div>
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
            html += `<img src="${m.src}" id="map-img-${m.id}" style="position: absolute; max-width: 100%; max-height: 100%; object-fit: contain; opacity: ${idx === 0 ? '1' : '0'}; transition: opacity 0.6s ease-in-out; border-radius: 6px;">`;
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
        const isQuote = typeof block.text === 'string' && block.text.startsWith('"');
        let contentStr = isQuote ? `<em style="font-size:1.1rem; color:#475569;">${block.text}</em>` : highlightGlossary(block.text);
        let styledContent = contentStr;
        if (!isQuote && !contentStr.trim().startsWith('<') && contentStr.length > 20) {
           const firstLetter = contentStr.charAt(0);
           const rest = contentStr.slice(1);
           styledContent = `<span style="float: left; font-size: 3rem; line-height: 2.5rem; padding-top: 4px; padding-right: 8px; padding-left: 3px; font-family: 'Playfair Display', serif; color: #1e3a8a;">${firstLetter}</span>` + rest;
        }
        
        let l4ContentStr = isQuote ? `<em style="font-size:1.1rem; color:#475569;">${block.level_4}</em>` : highlightGlossary(block.level_4);
        let l4StyledContent = l4ContentStr;
        if (!isQuote && !l4ContentStr.trim().startsWith('<') && l4ContentStr.length > 20) {
           const firstLetter = l4ContentStr.charAt(0);
           const rest = l4ContentStr.slice(1);
           l4StyledContent = `<span style="float: left; font-size: 3rem; line-height: 2.5rem; padding-top: 4px; padding-right: 8px; padding-left: 3px; font-family: 'Playfair Display', serif; color: #047857;">${firstLetter}</span>` + rest;
        }

        // Render Standard Narrative Chunk
        html += `
          <div class="standard-narrative-container">
            <div id="para-${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: ${bg}; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <div class="para-number">${index + 1}</div>
              <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">${styledContent}</div>
              <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>
        `;

        // Render Level 4 Narrative Chunk
        if (block.level_4) {
          html += `
            <div class="level4-narrative-container" style="display: none;">
              <div id="para-l4-${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: ${bg}; border-radius: 6px; border-left: 4px solid #10b981; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div class="para-number" style="background:#ecfdf5; color:#047857;">${index + 1}</div>
                <div class="narrative-text" style="flex-grow: 1; line-height: 1.6; font-size: 1.15rem; color:#1e293b;"><strong>[Level 4 Standard]</strong> <br> ${l4StyledContent}</div>
                <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
              </div>
            </div>
          `;
        }
        
        // Render Embedded Tasks for this chunk!
        if (block.tasks && block.tasks.length > 0) {
          html += `<div class="embedded-tasks-container" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px; padding: 15px; background: #fffbeb; border: 2px dashed #fcd34d; border-radius: 6px;">`;
          html += `<h4 style="margin-top: 0; color: #b45309; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;"><i class="fa-solid fa-pen-to-square"></i> Knowledge Check</h4>`;
          block.tasks.forEach(task => {
             html += `
               <div style="margin-bottom: 10px;">
                 <strong>${task.text.replace(/\s*\(P\d+\)/gi, '')}</strong>
                 <button class="btn btn-secondary" onclick="this.nextElementSibling.classList.toggle('revealed')" style="margin-left: 10px; padding: 4px 8px; font-size: 0.8rem;"><i class="fa-solid fa-eye"></i> Show Model</button>
                 <div class="answer" style="margin-top: 8px; background: white; padding: 10px; border-left: 3px solid #b45309; font-style: italic; color: #451a03;">${task.model}</div>
               </div>
             `;
          });
          html += `</div>`;
        }
      });

      if (lesson.sources && lesson.sources.length > 0) {
        html += `<div class="sources-grid" style="margin-top: 20px;">`;
        lesson.sources.forEach(source => {
          if (source.src) {
            let src = source.src.startsWith('../') ? source.src : `../great_war/${source.src}`;
            html += `
              <div class="source-card" style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
                ${source.title ? `<h4 style="color: var(--primary); margin-top: 0; text-align: left;">${source.title}</h4>` : ''}
                <img src="${src}" alt="Source Image">
                ${source.caption ? `<p class="source-caption" style="text-align: left; color: #475569;">${source.caption}</p>` : ''}
                ${source.question ? `
                  <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 15px;">
                    <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>${formatQuestion(source.question)}</strong></p>
                  </div>
                ` : ''}
              </div>
            `;
          }
        });
        html += `</div>`;
      }
      html += `</div>`;
    }
    // PHASE: Think, Pair, Share
    if (lesson.pair_share) {
      const ps = lesson.pair_share;
      html += `
        <div class="phase-card" id="phase-${phaseNum}">
          <div class="phase-title" style="color: #059669; border-bottom-color: #34d399;">Phase ${phaseNum++}: Think, Pair, Share</div>
          <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 20px;">
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
        </div>
      `;
    }

    // PHASE: Application Tasks & Historian Debates
    if ((lesson.tasks && lesson.tasks.length > 0) || lesson.historians_corner) {
      html += `
        <div class="phase-card" id="phase-${phaseNum}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Phase ${phaseNum++}: Written Application</div>
            <button class="btn btn-secondary" onclick="this.closest('.phase-card').querySelectorAll('.model-box').forEach(c => c.style.display = c.style.display === 'block' ? 'none' : 'block')" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-magnifying-glass"></i> Reveal All Models</button>
          </div>
      `;

      if (lesson.tasks && lesson.tasks.length > 0) {
        lesson.tasks.forEach((task, tIdx) => {
          let qText = formatQuestion(task.text);
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
              ${task.model ? `<div id="model-${tIdx}" class="scaffold-box model-box" style="display:none;">${task.model}</div>` : ''}
            </div>
          `;
        });
      }

      // Historians Corner
      if (lesson.historians_corner) {
        const hc = lesson.historians_corner;
        html += `
          <div style="margin-top: 30px; background: #fafafa; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h3 style="margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; color: #0f172a;">${hc.title}</h3>
            <p style="font-size: 1.05rem; line-height: 1.6; color: #334155; margin-bottom: 20px;">${hc.text}</p>
            
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
              <textarea class="student-answer-input" placeholder="Write your stretch response here..." oninput="window.updateProgress()"></textarea>

              ${hc.starter ? `<div id="hc-starter" class="scaffold-box starter-box" style="display:none;"><strong>Sentence Starter:</strong> ${hc.starter}</div>` : ''}
              ${hc.clue ? `<div id="hc-clue" class="scaffold-box clue-box" style="display:none;"><strong>Clue Hint:</strong> ${hc.clue}</div>` : ''}
              ${hc.stretch_model ? `<div id="hc-model" class="scaffold-box model-box" style="display:none;">${hc.stretch_model}</div>` : ''}
            </div>
          </div>
        `;
      }

      html += `</div>`;
    }

    // PHASE: Consolidation & Flashcards
    if (lesson.flashcards && lesson.flashcards.length > 0) {
      html += `
        <div class="phase-card" id="phase-${phaseNum}">
          <div class="phase-title">Phase ${phaseNum++}: Consolidation & Recall</div>
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

    html += `</div>`;
    
    if (hasVocab) {
      html += `</div>`; // End locked-content
    }
    contentArea.innerHTML = html;
    window.vocabMatchesFound = 0; // reset for new lesson

  }

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
    renderLesson(unitData.lessons[0]);
  } else {
    contentArea.innerHTML = "<h2>No lessons found in data.js</h2>";
  }
});

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
      const finalAnswer = answerText || "Model answer to be discussed in class.";
      html += `
        <div class="wb-question-card" style="cursor:pointer;" onclick="this.querySelector('.wb-answer').classList.toggle('revealed')" title="Click to reveal answer">
          <div style="font-weight: bold;">Q${qNum}. ${questionText}</div>
          <div class="wb-answer">${finalAnswer}</div>
        </div>
      `;
    };

    if (activeLesson.primary_source && activeLesson.primary_source.question) {
      addQuestionCard(activeLesson.primary_source.qNum, activeLesson.primary_source.question.replace(/^Enquiry:\s*/, ""), activeLesson.primary_source.model_answer || '');
    }
    
    if (activeLesson.do_now) {
      if (activeLesson.do_now.type === "timeline" && activeLesson.do_now.prediction_question) {
        addQuestionCard(activeLesson.do_now.qNum, activeLesson.do_now.prediction_question.replace(/^Predict:\s*/, ""), activeLesson.do_now.model || activeLesson.do_now.answer || '');
      } else if (activeLesson.do_now.type === "questions") {
        activeLesson.do_now.items.forEach(item => {
           addQuestionCard(item.qNum, item.question.replace(/^\d+\.\s*/, ""), item.answer || '');
        });
      }
    }
    
    if (activeLesson.narrative_blocks) {
      activeLesson.narrative_blocks.forEach(block => {
        if (block.tasks) {
          block.tasks.forEach(task => {
            let cleanTask = task.text.replace(/^(Q\d+: |Task \d+: |Question \d+[a-z]?: |Enquiry Task: )/, "").replace(/\s*\(P\d+\)/gi, "");
            addQuestionCard(task.qNum, cleanTask, task.model || '');
          });
        }
      });
    }
    
    if (activeLesson.extended && activeLesson.extended.question) {
       addQuestionCard(activeLesson.extended.qNum, activeLesson.extended.question.replace(/\s*\(Ext P\d+(-\d+)?\)/gi, ""), activeLesson.extended.model || activeLesson.extended.answer || '');
    }
    
    container.innerHTML = html;
    modal.classList.add('visible');
  }


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

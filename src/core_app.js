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
      height: 80px;
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

    const highlightGlossary = (text) => {
      if (Object.keys(vocabDict).length === 0) return text;
      let processedText = text;
      for (const [term, def] of Object.entries(vocabDict)) {
        const regex = new RegExp(`\\b(${term})\\b`, 'gi');
        processedText = processedText.replace(regex, `<span class="vocab-word" data-definition="${def.replace(/"/g, '&quot;')}">$1</span>`);
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
          <div class="do-now-card" id="do-now-card-${index}">
            <div style="font-weight: 700; margin-bottom: 8px;">Task ${index + 1}</div>
            <div>${item.question}</div>
            <div class="answer" id="do-now-ans-${index}">${item.answer}</div>
          </div>
        `;
      });
      html += `</div></div>`;
    }

    // PHASE: Core Information & Sources
    if (lesson.narrative && lesson.narrative.length > 0) {
      let enquiryTitle = lesson.title.replace(/^Lesson\s*\d+:\s*/i, '');
      html += `
        <div class="phase-card" id="phase-${phaseNum}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #1e3a8a;">Phase ${phaseNum++}: ${enquiryTitle}</div>
          </div>
      `;
      lesson.narrative.forEach((para, index) => {
        html += `
          <div id="para-${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 10px; background: #f8fafc; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease;">
            <div class="para-number">${index + 1}</div>
            <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">${highlightGlossary(para)}</div>
            <button class="btn btn-secondary" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        `;
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
    contentArea.innerHTML = html;
  }

  // Toggling elements helper
  window.toggleElement = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }
  };

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

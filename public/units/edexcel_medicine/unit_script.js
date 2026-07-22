import { renderRevisionZone } from './revision_zone.js';
import { renderExamPracticeZone } from './exam_practice_zone.js';
import { initKeyIndividualsTask } from './key_individuals.js';
import { renderQuizZone } from './quiz_zone.js';
import { sanitizeLessonData, cleanQuestionText } from './data_parser.js';

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
  const sidebar = document.getElementById('sidebar');
  const contentArea = document.getElementById('engine-workbook-container');
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
    let lessonsHTML = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 40px; text-align: left;">';
    unitData.lessons.forEach((lesson, index) => {
      lessonsHTML += `
        <div class="homepage-lesson-card" data-index="${index}" style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
          <h3 style="margin-top: 0; color: #1a237e; font-size: 1.1rem; margin-bottom: 10px;">Lesson ${index + 1}</h3>
          <p style="margin: 0; color: #475569; font-weight: 500; font-size: 0.95rem;">${lesson.title}</p>
        </div>
      `;
    });
    lessonsHTML += '</div>';

    let resourcesHTML = '<h2 style="margin-top: 40px; text-align: left; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Unit Resources</h2><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 15px; margin-top: 20px; text-align: left;">';
    
    // Helper for cards
    const resourceCard = (id, icon, title, color) => `
      <div class="homepage-resource-card" data-resource-id="${id}" style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; display: flex; align-items: center; gap: 10px;">
        <i class="fa-solid ${icon}" style="font-size: 1.5rem; color: ${color};"></i>
        <h4 style="margin: 0; color: #1e293b; font-size: 1rem;">${title}</h4>
      </div>
    `;

    if (unitData.biographies) {
      resourcesHTML += resourceCard('key-individuals', 'fa-users', 'Key Individuals', '#8b5cf6');
    }
    if (unitData.guided_reading && unitData.guided_reading.length > 0) {
      resourcesHTML += resourceCard('guided-reading', 'fa-book-open', 'Guided Reading', '#10b981');
    }
    resourcesHTML += resourceCard('revision-zone', 'fa-gamepad', 'Revision Zone', '#f59e0b');
    resourcesHTML += resourceCard('exam-practice', 'fa-pen-to-square', 'Assessments', '#3b82f6');
    
    // Links (open in new tab)
    resourcesHTML += resourceCard('quiz-zone', 'fa-file-pdf', 'Knowledge Quiz Zone', '#ef4444');

    const wbHref = window.currentUnitId ? `/${window.currentUnitId}/workbook.html` : 'workbook.html';
    resourcesHTML += `
      <a href="${wbHref}" target="_blank" style="text-decoration: none;">
        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; display: flex; align-items: center; gap: 10px;">
          <i class="fa-solid fa-book" style="font-size: 1.5rem; color: #64748b;"></i>
          <h4 style="margin: 0; color: #1e293b; font-size: 1rem;">Pupil Workbook</h4>
        </div>
      </a>
    `;
    
    resourcesHTML += '</div>';

    contentArea.innerHTML = `
      <div style="text-align: center; padding-bottom: 50px;">
        <h1 style="font-size: 2.5rem; color: #1a237e; margin-bottom: 10px;">${unitData.title}</h1>
        <h2 style="margin-size: 1.4rem; color: #475569; font-weight: 500; margin-top: 0; margin-bottom: 30px;">
          Unit Enquiry: <i>${unitData.enquiry || 'What can we learn from this period in history?'}</i>
        </h2>
        
        ${Array.isArray(unitData.cover_image) ? `
          <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 20px;">
            ${unitData.cover_image.map(img => `
              <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 4px solid white; flex: 1; max-height: 400px; display: flex; align-items: center; justify-content: center; background: #0f172a;">
                <img src="${getAssetUrl(img)}" alt="Unit Cover" style="max-width: 100%; max-height: 100%; object-fit: contain; display: block;">
              </div>
            `).join('')}
          </div>
        ` : `
          <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 4px solid white; display: inline-block; margin-bottom: 5px;">
            <img src="${getAssetUrl(unitData.cover_image || 'assets/cover.jpg')}" alt="Unit Cover" style="max-width: 100%; height: auto; display: block; max-height: 500px;">
          </div>
        `}
        
        ${unitData.cover_caption ? `<p style="margin-top: 5px; margin-bottom: 20px; font-style: italic; color: #64748b; font-size: 0.95rem; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto;">${unitData.cover_caption}</p>` : ''}
        
        <h2 style="margin-top: 40px; text-align: left; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Unit Lessons</h2>
        ${lessonsHTML}
        
        ${resourcesHTML}
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
        // sidebar links: index 0 is Homepage, index 1 is Lesson 1
        const sidebarLinks = document.querySelectorAll('.lesson-link');
        if(sidebarLinks[idx + 1]) sidebarLinks[idx + 1].classList.add('active');
        renderLesson(unitData.lessons[idx]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Add click listeners to resource cards
    const resourceCards = contentArea.querySelectorAll('.homepage-resource-card');
    resourceCards.forEach(card => {
      card.addEventListener('mouseover', () => {
        card.style.transform = 'translateY(-3px)';
        card.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
      });
      card.addEventListener('mouseout', () => {
        card.style.transform = 'none';
        card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
      });
      card.addEventListener('click', () => {
        const id = card.dataset.resourceId;
        const findLink = (text) => Array.from(document.querySelectorAll('.lesson-link')).find(l => l.innerHTML.includes(text));
        const resourceMap = {
          'key-individuals': () => {
            const kiLink = findLink("Key Individuals") || findLink("People");
            if (kiLink) kiLink.click();
          },
          'guided-reading': () => {
            const grLink = findLink("Guided Reading");
            if (grLink) grLink.click();
          },
          'revision-zone': () => {
            const revLink = findLink("Revision Zone");
            if (revLink) revLink.click();
          },
          'exam-practice': () => {
            const exLink = findLink("Assessments");
            if (exLink) exLink.click();
          },
          'quiz-zone': () => {
            const qzLink = document.getElementById('quiz-zone-link');
            if (qzLink) qzLink.click();
          }
        };
        if (resourceMap[id]) resourceMap[id]();
      });
    });
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

    unitData.lessons.forEach((lesson, index) => {
      const link = document.createElement('a');
      link.className = 'lesson-link';
      link.textContent = `L${index + 1}: ${lesson.title}`;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        renderLesson(lesson);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      navContainer.appendChild(link);
    });

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
        const { initGuidedReadingTask } = await import('./guided_reading.js');
        const contentArea = document.getElementById('engine-workbook-container');
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
      const contentArea = document.getElementById('engine-workbook-container');
      contentArea.innerHTML = ''; // clear
      renderRevisionZone(contentArea, unitData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    navContainer.appendChild(revisionLink);

    const examPracticeLink = document.createElement('a');
    examPracticeLink.className = 'lesson-link';
    examPracticeLink.innerHTML = '✍️ Assessments & Exam Practice';
    examPracticeLink.style.marginTop = '15px';
    examPracticeLink.style.color = '#60a5fa'; // Blue-400
    examPracticeLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
      examPracticeLink.classList.add('active');
      const contentArea = document.getElementById('engine-workbook-container');
      contentArea.innerHTML = ''; // clear
      renderExamPracticeZone(contentArea, unitData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    navContainer.appendChild(examPracticeLink);

    const quizPackLink = document.createElement('a');
    quizPackLink.id = 'quiz-zone-link';
    quizPackLink.className = 'lesson-link';
    quizPackLink.innerHTML = '📝 Knowledge Quiz Zone';
    quizPackLink.style.marginTop = '15px';
    quizPackLink.style.color = '#34d399'; // Emerald-400
    quizPackLink.style.cursor = 'pointer';
    quizPackLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
      quizPackLink.classList.add('active');
      const contentArea = document.getElementById('engine-workbook-container');
      contentArea.innerHTML = '';
      renderQuizZone(contentArea, unitData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    navContainer.appendChild(quizPackLink);
    const isCmeNew = window.currentUnitId === 'cme_new';
    
    if (isCmeNew) {
      const wbHeader = document.createElement('div');
      wbHeader.innerHTML = '<i class="fa-solid fa-book" style="margin-right: 5px;"></i> <strong>Printable Workbooks</strong>';
      wbHeader.style.marginTop = '20px';
      wbHeader.style.color = '#334155';
      wbHeader.style.fontSize = '0.9rem';
      wbHeader.style.paddingLeft = '5px';
      wbHeader.style.textTransform = 'uppercase';
      wbHeader.style.letterSpacing = '0.5px';
      navContainer.appendChild(wbHeader);

      for (let ktNum = 1; ktNum <= 3; ktNum++) {
        const ktLink = document.createElement('a');
        ktLink.className = 'lesson-link';
        ktLink.innerHTML = `<i class="fa-solid fa-book-open"></i> Workbook KT${ktNum}`;
        ktLink.href = window.currentUnitId ? `/${window.currentUnitId}/workbook_KT${ktNum}.html` : `workbook_KT${ktNum}.html`;
        ktLink.target = '_blank';
        ktLink.style.marginTop = '8px';
        ktLink.style.border = '2px dashed #cbd5e1';
        navContainer.appendChild(ktLink);
      }
    } else {
      const workbookLink = document.createElement('a');
      workbookLink.className = 'lesson-link';
      workbookLink.textContent = 'Pupil Workbook';
      workbookLink.href = window.currentUnitId ? `/${window.currentUnitId}/workbook.html` : 'workbook.html';
      workbookLink.target = '_blank';
      workbookLink.style.marginTop = '15px';
      workbookLink.style.border = '2px dashed #cbd5e1';
      navContainer.appendChild(workbookLink);
    }
  }

  // Render Lesson Content
  function renderLesson(lesson) {
    lesson = sanitizeLessonData(lesson);
    assignQuestionNumbers(lesson);
    window.currentActiveLesson = lesson;
    let html = `<div class="lesson-content">`;
    
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

    if (lesson.teacher_notes) {
      let notesHtml = '';
      
      // Handle the new comprehensive object structure
      if (lesson.teacher_notes && !Array.isArray(lesson.teacher_notes) && typeof lesson.teacher_notes === 'object') {
        const primerText = lesson.teacher_notes.primer ? `<div style="font-size: 1.05rem; margin-bottom: 20px;">${lesson.teacher_notes.primer}</div>` : '';
        const sourceContext = lesson.teacher_notes.source_context ? `<div style="font-size: 0.95rem; margin-bottom: 20px; background: rgba(2, 132, 199, 0.2); padding: 15px; border-left: 4px solid #38bdf8; border-radius: 4px;"><strong><i class="fa-solid fa-image"></i> Source Context:</strong><br/>${lesson.teacher_notes.source_context}</div>` : '';
        const objectivesHtml = (lesson.teacher_notes.objectives || []).map(note => `
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><i class="fa-solid fa-bullseye" style="font-size: 0.8rem; margin-right: 4px;"></i> ${note.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: ${note.question ? '10px' : '0'};">${note.primer}</div>
            ${note.question ? (typeof note.question === 'object' ? `
            <div style="background: rgba(56, 189, 248, 0.1); border-left: 3px solid #38bdf8; padding: 10px; border-radius: 0 4px 4px 0;">
              <div style="color: #38bdf8; font-weight: bold; font-size: 0.85rem; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Interactive Hinge Question</div>
              <div style="color: #e0f2fe; font-size: 0.95rem; font-weight: bold; margin-bottom: 10px;">"${note.question.text}"</div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${note.question.options.map((opt, i) => `
                  <button onclick="
                    const parent = this.parentElement;
                    const explanation = parent.nextElementSibling;
                    for (let child of parent.children) {
                      child.style.pointerEvents = 'none';
                      if (child.dataset.index == ${note.question.correct_index}) {
                        child.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
                        child.style.borderColor = '#22c55e';
                        child.style.color = '#86efac';
                      }
                    }
                    if (${i} !== ${note.question.correct_index}) {
                      this.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                      this.style.borderColor = '#ef4444';
                      this.style.color = '#fca5a5';
                    }
                    explanation.style.display = 'block';
                  " data-index="${i}" style="text-align: left; background: rgba(0,0,0,0.3); border: 1px solid #475569; color: #cbd5e1; padding: 8px 12px; border-radius: 4px; cursor: pointer; transition: all 0.2s;">
                    ${String.fromCharCode(65+i)}. ${opt}
                  </button>
                `).join('')}
              </div>
              <div style="display: none; margin-top: 12px; padding: 10px; background: rgba(34, 197, 94, 0.1); border-left: 3px solid #22c55e; color: #86efac; font-size: 0.9rem; border-radius: 0 4px 4px 0;">
                <strong>Explanation:</strong> ${note.question.explanation}
              </div>
            </div>` : `
            <div style="background: rgba(56, 189, 248, 0.1); border-left: 3px solid #38bdf8; padding: 10px; border-radius: 0 4px 4px 0;">
              <div style="color: #38bdf8; font-weight: bold; font-size: 0.85rem; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Hinge Question</div>
              <div style="color: #e0f2fe; font-size: 0.95rem; font-style: italic;">"${note.question}"</div>
            </div>`) : ''}
          </div>
        `).join('');
        notesHtml = primerText + sourceContext + objectivesHtml;
      } 
      // Fallback for array structure
      else if (Array.isArray(lesson.teacher_notes)) {
        notesHtml = lesson.teacher_notes.map(note => `
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><i class="fa-solid fa-bullseye" style="font-size: 0.8rem; margin-right: 4px;"></i> ${note.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: ${note.question ? '10px' : '0'};">${note.primer}</div>
            ${note.question ? (typeof note.question === 'object' ? `
            <div style="background: rgba(56, 189, 248, 0.1); border-left: 3px solid #38bdf8; padding: 10px; border-radius: 0 4px 4px 0;">
              <div style="color: #38bdf8; font-weight: bold; font-size: 0.85rem; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Interactive Hinge Question</div>
              <div style="color: #e0f2fe; font-size: 0.95rem; font-weight: bold; margin-bottom: 10px;">"${note.question.text}"</div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${note.question.options.map((opt, i) => `
                  <button onclick="
                    const parent = this.parentElement;
                    const explanation = parent.nextElementSibling;
                    for (let child of parent.children) {
                      child.style.pointerEvents = 'none';
                      if (child.dataset.index == ${note.question.correct_index}) {
                        child.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
                        child.style.borderColor = '#22c55e';
                        child.style.color = '#86efac';
                      }
                    }
                    if (${i} !== ${note.question.correct_index}) {
                      this.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                      this.style.borderColor = '#ef4444';
                      this.style.color = '#fca5a5';
                    }
                    explanation.style.display = 'block';
                  " data-index="${i}" style="text-align: left; background: rgba(0,0,0,0.3); border: 1px solid #475569; color: #cbd5e1; padding: 8px 12px; border-radius: 4px; cursor: pointer; transition: all 0.2s;">
                    ${String.fromCharCode(65+i)}. ${opt}
                  </button>
                `).join('')}
              </div>
              <div style="display: none; margin-top: 12px; padding: 10px; background: rgba(34, 197, 94, 0.1); border-left: 3px solid #22c55e; color: #86efac; font-size: 0.9rem; border-radius: 0 4px 4px 0;">
                <strong>Explanation:</strong> ${note.question.explanation}
              </div>
            </div>` : `
            <div style="background: rgba(56, 189, 248, 0.1); border-left: 3px solid #38bdf8; padding: 10px; border-radius: 0 4px 4px 0;">
              <div style="color: #38bdf8; font-weight: bold; font-size: 0.85rem; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Hinge Question</div>
              <div style="color: #e0f2fe; font-size: 0.95rem; font-style: italic;">"${note.question}"</div>
            </div>`) : ''}
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

    // PHASE: Retrieval Recall
    if (lesson.do_now && lesson.do_now.type === 'timeline' && lesson.do_now.events) {
      html += `
        <div class="phase-card" id="phase-${phaseNum}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Phase ${phaseNum++}: Chronological Timeline</div>
          </div>
          <div style="margin-bottom: 20px; font-size: 1.1rem; color: #1e3a8a;"><strong>${lesson.do_now.prediction_question || ''}</strong></div>
          <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: space-between;">
      `;
      lesson.do_now.events.forEach((ev, idx) => {
        html += `
          <div style="width: 45%; border: 2px solid #cbd5e1; border-radius: 8px; padding: 15px; background: #fff; box-shadow: 2px 2px 0px #94a3b8; margin-bottom: 15px;">
            <div style="font-weight: 800; color: #1e40af; font-size: 1.2rem; margin-bottom: 5px;">${ev.year}</div>
            <div style="font-weight: 600; color: #0f172a; margin-bottom: 8px;">${ev.title}</div>
            <div style="font-size: 0.95rem; color: #475569;">${ev.detail}</div>
            ${ev.img ? `<img src="${getAssetUrl(ev.img)}" style="width: 100%; border-radius: 4px; margin-top: 10px; border: 1px solid #e2e8f0;">` : ''}
          </div>
        `;
      });
      html += `</div></div>`;
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
        <div class="phase-card" id="phase-${phaseNum}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Phase ${phaseNum++}: Do Now Tasks</div>
            <button class="btn btn-secondary" onclick="window.toggleAllAnswers(this)" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-eye"></i> Reveal All</button>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
      `;
      lesson.do_now.items.forEach((item, index) => {
        let qText = item.question;
        let aText = item.answer;
        if (window.currentUnitId) {
          qText = qText.replace(/src=['"]assets\//g, `src="/${window.currentUnitId}/assets/`);
          aText = aText.replace(/src=['"]assets\//g, `src="/${window.currentUnitId}/assets/`);
        }
        const cardId = `donow-${phaseNum}-${index}`;
        html += `
          <div class="do-now-card" id="do-now-card-${index}" onclick="window.toggleAnswerById('${cardId}')" style="cursor: pointer;">
            <div style="font-weight: 700; margin-bottom: 8px;">Task ${index + 1}</div>
            <div>${qText}</div>
            <div class="answer" id="${cardId}" style="display: none; margin-top: 10px; padding: 10px; background: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 4px;">${aText}</div>
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
        const isQuote = typeof block.text === 'string' && block.text.startsWith('"');
        let contentStr = isQuote ? `<em style="font-size:1.1rem; color:#475569;">${block.text}</em>` : highlightGlossary(block.text);
        contentStr = contentStr.replace(/src=["'](\.\/)?assets\//g, 'src="/' + window.currentUnitId + '/assets/');
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

        const simplifyBtn = '';

        // Render Standard Narrative Chunk
        html += `
          <div class="standard-narrative-container">
            <div id="para-${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: ${bg}; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <div class="para-number">${index + 1}</div>
              <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">${styledContent}</div>
              <div style="display: flex; align-items: flex-start;">
                <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                ${simplifyBtn}
              </div>
            </div>
          </div>
        `;

        // Render Level 4 Narrative Chunk
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
        
        // Render Embedded Tasks for this chunk!
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
    // PHASE: Application Tasks & Historian Debates
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
        <div class="phase-card" id="phase-${phaseNum}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Phase ${phaseNum++}: Written Application</div>
            ${revealBtn}
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
            <p style="font-size: 1.05rem; line-height: 1.6; color: #334155; margin-bottom: 20px;">${hc.text || (hc.author_context + "<br><br><i>" + hc.extract + "</i>")}</p>
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
              ${hc.stretch_model ? `<div id="hc-model" class="scaffold-box model-box" style="display:none;">${hc.stretch_model}</div>` : ''}
            </div>` : ''}
          </div>
        `;
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

    // PHASE: Extended Scholarship & Debate
    if (lesson.extended || lesson.debate_prep) {
      let extHtml = `
        <div class="phase-card" id="phase-${phaseNum}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Phase ${phaseNum++}: Extended Scholarship</div>
            ${lesson.extended && (lesson.extended.model || lesson.extended.answer) ? `<button class="btn btn-secondary" onclick="toggleElement('extended-model-${lesson.id}')" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-check-double"></i> Reveal Model Answer</button>` : ''}
          </div>
      `;

      if (lesson.debate_prep) {
        const dp = lesson.debate_prep;
        // Interleave the arguments deterministically for rendering, then sort randomly
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

      if (lesson.extended) {
        if (lesson.extended.title) {
          extHtml += `<h3 style="color: #0f172a;">${lesson.extended.title}</h3>`;
        }
        if (lesson.extended.paragraphs) {
          lesson.extended.paragraphs.forEach(p => {
             extHtml += `<p style="color: #334155; font-size: 1.05rem; line-height: 1.6;">${p}</p>`;
          });
        }
        
        let hintsHtml = '';
        if (lesson.extended.hints && lesson.extended.hints.length > 0) {
           hintsHtml = `<div style="margin-top: 15px; padding: 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px;"><strong style="color: #d97706;">Hints:</strong><ul style="margin: 5px 0 0 0; color: #92400e;">${lesson.extended.hints.map(h => `<li>${h}</li>`).join('')}</ul></div>`;
        }

        extHtml += `
          <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
            <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
              ${formatQuestion(lesson.extended.question)}
            </div>
            ${hintsHtml}
            <textarea class="student-answer-input" style="min-height: 200px;" placeholder="Write your extended response here..." oninput="window.updateProgress()"></textarea>

            ${lesson.extended.model || lesson.extended.answer ? `<div id="extended-model-${lesson.id}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${lesson.extended.model || lesson.extended.answer}</div>` : ''}
          </div>
        `;
      }

      extHtml += `</div>`;
      html += extHtml;
    }

    // PHASE: Knowledge Check Quiz
    if (lesson.quiz && lesson.quiz.length > 0) {
      html += `
        <div class="phase-card" id="phase-${phaseNum}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Phase ${phaseNum++}: Knowledge Check</div>
            <button class="btn btn-primary no-print" onclick="window.startQuiz('${lesson.id}')" style="font-size: 1.1rem; padding: 10px 20px; border-radius: 8px;">
              <i class="fa-solid fa-clipboard-check"></i> Start Quiz
            </button>
          </div>
          <p style="color: #475569; font-size: 1.05rem; margin-bottom: 0;">Test your knowledge of this lesson with a quick multiple-choice quiz.</p>
        </div>
      `;
    }

    html += `</div>`;
    
    if (hasVocab) {
      html += `</div>`; // End locked-content
    }

    html += `
      <div style="text-align: center; margin-top: 40px; margin-bottom: 40px; padding: 30px; border-top: 2px dashed #cbd5e1; color: #64748b;">
        <h3 style="margin-bottom: 10px; color: #334155;"><i class="fa-solid fa-flag-checkered"></i> Lesson Complete</h3>
        <p style="margin: 0;">You have reached the end of the core narrative phases for this lesson.</p>
      </div>
    `;
    contentArea.innerHTML = html;
    window.vocabMatchesFound = 0;
    setTimeout(() => {
      if (window.mermaid) {
        try {
          mermaid.init(undefined, document.querySelectorAll('.mermaid'));
        } catch (e) {
          console.error("Mermaid render error:", e);
        }
      }
    }, 100); // reset for new lesson

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
      const finalAnswer = answerText || "Model answer to be discussed in class.";
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

    if (activeLesson.extended && activeLesson.extended.question) {
       addQuestionCard(activeLesson.extended.qNum || '-', activeLesson.extended.question, activeLesson.extended.model || activeLesson.extended.answer || '');
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
  const container = btn.closest('.phase-card') || btn.closest('.do-now-box');
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
    document.getElementById('quiz-next-btn').onclick = window.closeQuizModal;
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

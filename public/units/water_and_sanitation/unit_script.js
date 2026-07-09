import { unitData } from './data.js';

window.initUnit = function() {
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
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
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
    }
    .vocab-word {
      position: relative;
      border-bottom: 2px dashed #002855;
      cursor: help;
      color: #002855;
      font-weight: 600;
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
  `;
  document.head.appendChild(style);

  // Set up Speech Synthesis
  let synth = window.speechSynthesis;
  let utterance = null;

  // Add Read Aloud Button to Header Container (No Icons)
  const headerContainer = document.querySelector('.header-container');
  const btnReadAloud = document.createElement('button');
  btnReadAloud.className = 'btn btn-secondary';
  btnReadAloud.id = 'btn-read-aloud';
  btnReadAloud.style.marginLeft = '10px';
  btnReadAloud.textContent = 'Read Aloud';
  headerContainer.appendChild(btnReadAloud);

  btnReadAloud.addEventListener('click', () => {
    if (synth.speaking) {
      synth.cancel();
      btnReadAloud.textContent = 'Read Aloud';
    } else {
      const narrativeBlocks = document.querySelectorAll('.narrative-chunk');
      let textToRead = "";
      narrativeBlocks.forEach(block => {
        textToRead += block.textContent + " ";
      });
      if (textToRead.trim() === "") return;
      utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.onend = () => {
        btnReadAloud.textContent = 'Read Aloud';
      };
      synth.speak(utterance);
      btnReadAloud.textContent = 'Stop Reading';
    }
  });

  // Toggle Dyslexia Mode (Remove icon if present)
  btnDyslexia.innerHTML = 'SEN / Dyslexia Mode';
  btnDyslexia.addEventListener('click', () => {
    document.body.classList.toggle('sen-mode');
    const isSen = document.body.classList.contains('sen-mode');
    btnDyslexia.textContent = isSen ? 'Standard Mode' : 'SEN / Dyslexia Mode';
  });

  // Render Sidebar
  function renderSidebar() {
    sidebar.innerHTML = '';
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
      sidebar.appendChild(link);
    });
  }

  // Render Lesson Content in 4 Phases
  function renderLesson(lesson) {
    // Header section
    let html = `<div class="lesson-content">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; position: sticky; top: 0; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(5px); padding: 12px 18px; z-index: 1000; border-bottom: 1px solid #e2e8f0; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        <h4 style="margin: 0; font-size: 1.1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60%; color: var(--primary);">${lesson.title}</h4>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.9rem;" onclick="window.renderDashboard()">Unit Menu</button>
          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.9rem;" onclick="window.location.href='../index.html'">Main Dashboard</button>
        </div>
      </div>
      <div id="progress-container" style="position: sticky; top: 62px; background: #e2e8f0; height: 6px; width: 100%; z-index: 1001; margin-bottom: 20px;">
        <div id="progress-bar" style="background: #10b981; height: 100%; width: 0%; transition: width 0.3s;"></div>
      </div>
    `;

    // Process Narrative Glossary Highlight
    let vocabDict = {};
    if (lesson.vocab) {
      lesson.vocab.forEach(v => {
        vocabDict[v.term.toLowerCase()] = v.definition;
      });
    } else if (lesson.glossary) {
      for (const [term, def] of Object.entries(lesson.glossary)) {
        vocabDict[term.toLowerCase()] = def;
      }
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

    // PHASE 1: Retrieval Recall
    if (lesson.do_now && lesson.do_now.items) {
      html += `
        <div class="phase-card" id="phase-1">
          <div class="phase-title">Phase 1: Retrieval Recall</div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
      `;
      lesson.do_now.items.forEach((item, index) => {
        html += `
          <div class="do-now-card" id="do-now-card-${index}">
            <div style="font-weight: 700; margin-bottom: 8px;">Question ${index + 1}</div>
            <div>${item.question}</div>
            <div class="answer" id="do-now-ans-${index}">${item.answer}</div>
            <div class="btn-group">
              <button class="btn btn-secondary btn-sm" onclick="document.getElementById('do-now-card-${index}').classList.toggle('revealed')">Reveal Answer</button>
            </div>
          </div>
        `;
      });
      html += `</div></div>`;
    }

    // PHASE 2: Core Information & Sources
    if (lesson.narrative && lesson.narrative.length > 0) {
      html += `
        <div class="phase-card" id="phase-2">
          <div class="phase-title">Phase 2: Core Information & Sources</div>
      `;
      lesson.narrative.forEach(para => {
        html += `<div class="narrative-chunk">${highlightGlossary(para)}</div>`;
      });

      if (lesson.sources && lesson.sources.length > 0) {
        html += `<div class="sources-grid" style="margin-top: 20px;">`;
        lesson.sources.forEach(source => {
          if (source.src) {
            let src = source.src.startsWith('../') ? source.src : `../great_war/${source.src}`;
            html += `
              <div class="source-card">
                ${source.title ? `<h4>${source.title}</h4>` : ''}
                <img src="${src}" alt="Source Image">
                ${source.caption ? `<p class="source-caption">${source.caption}</p>` : ''}
              </div>
            `;
          }
        });
        html += `</div>`;
      }
      html += `</div>`;
    }

    // PHASE 3: Application Tasks & Historian Debates
    if ((lesson.tasks && lesson.tasks.length > 0) || lesson.historians_corner) {
      html += `
        <div class="phase-card" id="phase-3">
          <div class="phase-title">Phase 3: Written Application</div>
      `;

      if (lesson.tasks && lesson.tasks.length > 0) {
        lesson.tasks.forEach((task, tIdx) => {
          html += `
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <div style="font-weight: 700; margin-bottom: 10px;">Task ${tIdx + 1}</div>
              <div style="font-size: 1.05rem; margin-bottom: 12px;">${task.text}</div>
              <textarea class="student-answer-input" placeholder="Write your response here..." style="width: 100%; height: 80px; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; resize: vertical;" oninput="window.updateProgress()"></textarea>
              
              <div class="btn-group">
                ${task.starter ? `<button class="btn btn-secondary btn-sm" onclick="toggleElement('starter-${tIdx}')">Sentence Starter</button>` : ''}
                ${task.clue ? `<button class="btn btn-secondary btn-sm" onclick="toggleElement('clue-${tIdx}')">Clue</button>` : ''}
                ${task.model ? `<button class="btn btn-secondary btn-sm" onclick="toggleElement('model-${tIdx}')">Reveal Model Answer</button>` : ''}
              </div>

              ${task.starter ? `<div id="starter-${tIdx}" class="scaffold-box starter-box" style="display:none;"><strong>Sentence Starter:</strong> ${task.starter}</div>` : ''}
              ${task.clue ? `<div id="clue-${tIdx}" class="scaffold-box clue-box" style="display:none;"><strong>Clue Hint:</strong> ${task.clue}</div>` : ''}
              ${task.model ? `<div id="model-${tIdx}" class="scaffold-box model-box" style="display:none;"><strong>WAGOLL Model Answer:</strong> ${task.model}</div>` : ''}
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
              <div style="font-size: 1.05rem; margin-bottom: 12px;">${hc.stretch_question}</div>
              <textarea class="student-answer-input" placeholder="Write your stretch response here..." style="width: 100%; height: 80px; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; resize: vertical;" oninput="window.updateProgress()"></textarea>
              
              <div class="btn-group">
                ${hc.starter ? `<button class="btn btn-secondary btn-sm" onclick="toggleElement('hc-starter')">Sentence Starter</button>` : ''}
                ${hc.clue ? `<button class="btn btn-secondary btn-sm" onclick="toggleElement('hc-clue')">Clue</button>` : ''}
                ${hc.stretch_model ? `<button class="btn btn-secondary btn-sm" onclick="toggleElement('hc-model')">Reveal Model Answer</button>` : ''}
              </div>

              ${hc.starter ? `<div id="hc-starter" class="scaffold-box starter-box" style="display:none;"><strong>Sentence Starter:</strong> ${hc.starter}</div>` : ''}
              ${hc.clue ? `<div id="hc-clue" class="scaffold-box clue-box" style="display:none;"><strong>Clue Hint:</strong> ${hc.clue}</div>` : ''}
              ${hc.stretch_model ? `<div id="hc-model" class="scaffold-box model-box" style="display:none;"><strong>WAGOLL Model Answer:</strong> ${hc.stretch_model}</div>` : ''}
            </div>
          </div>
        `;
      }

      html += `</div>`;
    }

    // PHASE 4: Consolidation & Flashcards
    const lessonIndex = unitData.lessons.findIndex(l => l.id === lesson.id);
    const flashcards = lesson.flashcards || (unitData.quizPack ? unitData.quizPack.slice(lessonIndex * 10, (lessonIndex + 1) * 10).map(q => ({ term: q.q, definition: q.a })) : []);

    if (flashcards.length > 0) {
      html += `
        <div class="phase-card" id="phase-4">
          <div class="phase-title">Phase 4: Consolidation & Recall</div>
          <p style="color: #666; margin-bottom: 20px;">Tap a card to flip it and reveal the definition.</p>
          <div class="flashcard-deck">
      `;
      flashcards.forEach(fc => {
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

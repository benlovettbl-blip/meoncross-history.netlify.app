module.exports = function getNewRenderLesson() {
  return `
  // Render Lesson Content
  function renderLesson(lesson) {
    const formatBold = (text) => text ? text.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>') : '';
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

    assignQuestionNumbers(lesson);
    window.currentActiveLesson = lesson;
    
    // Tabs container logic
    let html = \`<div class="lesson-content">\`;
    
    if (unitEnquiryText) {
      html += \`
        <div style="background: linear-gradient(135deg, #1e3a8a, #312e81); color: white; padding: 15px 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-size: 1.15rem; font-weight: 600; box-shadow: 0 4px 10px rgba(0,0,0,0.1); border: 2px solid #a5b4fc;">
          <i class="fa-solid fa-lightbulb" style="color: #fde047; margin-right: 10px;"></i> \${unitEnquiryText}
        </div>
      \`;
    }

    html += \`
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; padding: 10px 15px; border-bottom: 1px solid #e2e8f0; background: #ffffff; border-radius: 8px;">
        <h4 style="margin: 0; font-size: 1.1rem; color: var(--primary);">\${lesson.title}</h4>
        <div style="display: flex; gap: 8px; flex-shrink: 0;">
          <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.9rem; background: var(--accent-red); border-color: var(--accent-red);" onclick="openDebateModal()"><i class="fa-solid fa-comments"></i> Class Debate</button>
          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.9rem;" onclick="window.renderDashboard()"><i class="fa-solid fa-arrow-left"></i> Unit Menu</button>
        </div>
      </div>
      <div id="progress-container" style="background: #e2e8f0; height: 6px; width: 100%; margin-bottom: 20px; border-radius: 3px; overflow: hidden;">
        <div id="progress-bar" style="background: #10b981; height: 100%; width: 0%; transition: width 0.3s;"></div>
      </div>
    \`;

    // -----------------------------------------------------
    // TABS NAVIGATION UI
    // -----------------------------------------------------
    html += \`
      <div class="lesson-tabs" style="display: flex; border-bottom: 2px solid #e2e8f0; margin-bottom: 25px; background: white; border-radius: 8px 8px 0 0; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
        <button class="tab-btn active" onclick="window.switchTab('tab-prep')" style="flex: 1; padding: 15px; font-size: 1.1rem; font-weight: bold; text-align: center; cursor: pointer; border: none; background: #f8fafc; color: #1e3a8a; border-bottom: 3px solid #3b82f6; transition: all 0.2s;"><i class="fa-solid fa-clipboard-list" style="margin-right: 8px;"></i>Preparation</button>
        <button class="tab-btn" onclick="window.switchTab('tab-history')" style="flex: 1; padding: 15px; font-size: 1.1rem; font-weight: bold; text-align: center; cursor: pointer; border: none; background: transparent; color: #64748b; border-bottom: 3px solid transparent; transition: all 0.2s;"><i class="fa-solid fa-book-open" style="margin-right: 8px;"></i>The History</button>
        <button class="tab-btn" onclick="window.switchTab('tab-app')" style="flex: 1; padding: 15px; font-size: 1.1rem; font-weight: bold; text-align: center; cursor: pointer; border: none; background: transparent; color: #64748b; border-bottom: 3px solid transparent; transition: all 0.2s;"><i class="fa-solid fa-pen-nib" style="margin-right: 8px;"></i>Application</button>
      </div>
    \`;

    let globalQuestionNum = 1;
    const formatQuestion = (qText) => {
      if (!qText) return '';
      let cleaned = qText.replace(/^(Enquiry:|Q\\d+:|Task \\d+:|Question \\d+[a-z]?:)\\s*/i, '');
      return \`Question \${globalQuestionNum++}: \${formatBold(cleaned)}\`;
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
          const regex = new RegExp(\`\\\\b(\${term})\\\\b\`, 'i');
          if (regex.test(processedText)) {
            processedText = processedText.replace(regex, \`<span class="vocab-word" data-definition="\${def.replace(/"/g, '&quot;')}">$1</span>\`);
            seenTerms.add(term);
          }
        }
      }
      return processedText;
    };


    // ==========================================
    // TAB 1: PREPARATION
    // ==========================================
    html += \`<div id="tab-prep" class="tab-content" style="display: block;">\`;
    
    if (lesson.primary_source) {
      let src = lesson.primary_source.src;
      html += \`
        <div class="phase-card">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">\${lesson.learning_objective || 'Visual Source & Hook'}</div>
          </div>
          <div class="source-card" style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
            <img src="\${getAssetUrl(src)}" alt="Source" style="max-height: 500px; max-width: 100%; object-fit: contain; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 15px;">
            <div style="font-weight: bold; margin-bottom: 10px; font-size: 1.1rem; color: var(--primary);">\${lesson.primary_source.title}</div>
            \${lesson.primary_source.caption ? \`<div style="color: #475569; margin-bottom: 15px; font-size: 0.95rem; text-align: left;">\${lesson.primary_source.caption}</div>\` : ''}
            \${lesson.primary_source.question ? \`
              <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 20px;">
                <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>\${formatQuestion(lesson.primary_source.question)}</strong></p>
              </div>
            \` : ''}
          </div>
        </div>
      \`;
    }

    if (lesson.do_now && lesson.do_now.type === 'timeline' && lesson.do_now.events) {
      html += \`
        <div class="phase-card">
          <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 15px; overflow: hidden;" closed>
            <summary style="padding: 15px 20px; cursor: pointer; color: #0f172a; font-weight: bold; font-size: 1.2rem; background: #f8fafc; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
              <span><i class="fa-solid fa-clock-rotate-left" style="color: #3b82f6; margin-right: 10px;"></i> Chronological Timeline</span>
              <i class="fa-solid fa-chevron-down" style="color: #64748b;"></i>
            </summary>
            <div style="padding: 20px;">
              <div style="margin-bottom: 20px; font-size: 1.1rem; color: #1e3a8a;"><strong>\${lesson.do_now.prediction_question || ''}</strong></div>
              <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: space-between;">
      \`;
      lesson.do_now.events.forEach((ev, idx) => {
        html += \`
          <div style="width: 45%; border: 2px solid #cbd5e1; border-radius: 8px; padding: 15px; background: #fff; box-shadow: 2px 2px 0px #94a3b8; margin-bottom: 15px;">
            <div style="font-weight: 800; color: #1e40af; font-size: 1.2rem; margin-bottom: 5px;">\${ev.year}</div>
            <div style="font-weight: 600; color: #0f172a; margin-bottom: 8px;">\${ev.title}</div>
            <div style="font-size: 0.95rem; color: #475569;">\${ev.detail}</div>
            \${ev.img ? \`<img src="\${getAssetUrl(ev.img)}" style="width: 100%; border-radius: 4px; margin-top: 10px; border: 1px solid #e2e8f0;">\` : ''}
          </div>
        \`;
      });
      html += \`</div></div></details></div>\`;
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

      html += \`
        <div class="phase-card">
          <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 15px; overflow: hidden;" closed>
            <summary style="padding: 15px 20px; cursor: pointer; color: #0f172a; font-weight: bold; font-size: 1.2rem; background: #f8fafc; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
              <span><i class="fa-solid fa-list-check" style="color: #3b82f6; margin-right: 10px;"></i> Do Now Tasks</span>
              <div>
                <button class="btn btn-secondary" onclick="event.preventDefault(); window.toggleAllAnswers(this.closest('details'))" style="font-size: 0.9rem; padding: 4px 10px; margin-right: 10px;"><i class="fa-solid fa-eye"></i> Reveal All</button>
                <i class="fa-solid fa-chevron-down" style="color: #64748b;"></i>
              </div>
            </summary>
            <div style="padding: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
      \`;
      lesson.do_now.items.forEach((item, index) => {
        let qText = item.question;
        let aText = item.answer;
        if (window.currentUnitId) {
          qText = qText.replace(/src=['"]assets\\//g, \`src="/\${window.currentUnitId}/assets/\`);
          aText = aText.replace(/src=['"]assets\\//g, \`src="/\${window.currentUnitId}/assets/\`);
        }
        const cardId = \`donow-card-\${index}\`;
        html += \`
          <div class="do-now-card" id="do-now-card-\${index}" onclick="window.toggleAnswerById('\${cardId}')" style="cursor: pointer;">
            <div style="font-weight: 700; margin-bottom: 8px;">Task \${index + 1}</div>
            <div>\${qText}</div>
            <div class="answer" id="\${cardId}" style="display: none; margin-top: 10px; padding: 10px; background: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 4px;">\${aText}</div>
          </div>
        \`;
      });
      html += \`</div></details></div>\`;
    }

    const hasVocab = lesson.vocab && lesson.vocab.length > 0;
    if (hasVocab) {
      html += \`
        <div class="phase-card">
          <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 15px; overflow: hidden;" closed>
            <summary style="padding: 15px 20px; cursor: pointer; color: #b45309; font-weight: bold; font-size: 1.2rem; background: #fffbeb; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
              <span><i class="fa-solid fa-spell-check" style="color: #b45309; margin-right: 10px;"></i> Key Vocabulary</span>
              <i class="fa-solid fa-chevron-down" style="color: #64748b;"></i>
            </summary>
            <div style="padding: 20px;">
              <p style="color: #475569; margin-bottom: 20px; font-size: 1.1rem;"><strong>Vocabulary Practice:</strong> Tap a term on the left, then tap its matching definition on the right to master the key vocabulary.</p>
              <div id="vocab-match-game" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="match-terms" style="display: flex; flex-direction: column; gap: 10px;">
      \`;
      
      lesson.vocab.forEach((v, idx) => {
        html += \`<button class="btn btn-secondary match-term-btn" data-idx="\${idx}" style="text-align: left; padding: 15px; font-weight: bold; border-width: 2px; transition: all 0.2s;">\${v.term}</button>\`;
      });
      
      html += \`</div><div class="match-defs" style="display: flex; flex-direction: column; gap: 10px;">\`;
      
      let defs = lesson.vocab.map((v, idx) => ({ def: v.definition, idx: idx }));
      defs.sort(() => Math.random() - 0.5);
      
      defs.forEach(d => {
        html += \`<button class="btn btn-secondary match-def-btn" data-idx="\${d.idx}" style="text-align: left; padding: 15px; font-weight: normal; border-width: 2px; transition: all 0.2s;">\${d.def}</button>\`;
      });
      
      html += \`
                </div>
              </div>
              <div id="unlock-success" style="display: none; margin-top: 20px; padding: 15px; background: #ecfdf5; border: 2px solid #10b981; border-radius: 8px; color: #047857; font-weight: bold; text-align: center; font-size: 1.2rem;">
                <i class="fa-solid fa-star"></i> Vocabulary Mastered!
              </div>
            </div>
          </details>
        </div>
      \`;
    }

    html += \`</div>\`; // End Tab 1

    // ==========================================
    // TAB 2: THE HISTORY
    // ==========================================
    html += \`<div id="tab-history" class="tab-content" style="display: none;">\`;

    let fallbackEnquiry = lesson.enquiry || lesson.title.replace(/^Lesson\\s*\\d+:\\s*/i, '');
    if (fallbackEnquiry) {
      html += \`
        <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px 20px; border-radius: 0 8px 8px 0; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <h3 style="margin-top: 0; color: #1e3a8a; font-size: 1.25rem; display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Enquiry Question
          </h3>
          <p style="font-size: 1.15rem; font-weight: 700; color: #0f172a; margin: 0;">
            \${fallbackEnquiry}
          </p>
        </div>
      \`;
    }

    if (lesson.learning_objectives) {
      html += \`
        <div class="learning-objectives-card" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-top: 4px solid #10b981;">
          <h3 style="margin-top: 0; color: #0f172a; font-size: 1.2rem; display: flex; align-items: center; gap: 10px;">
            <i class="fa-solid fa-bullseye" style="color: #10b981;"></i> Learning Objectives
          </h3>
          <p style="font-size: 1.1rem; font-weight: 600; color: #1e3a8a; margin-bottom: 15px;">
            \${lesson.learning_objectives.overarching}
          </p>
          <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 1.05rem; line-height: 1.6;">
            \${lesson.learning_objectives.scaffolded.map(obj => \`<li style="margin-bottom: 8px;">\${obj}</li>\`).join('')}
          </ul>
        </div>
      \`;
    }

    if (lesson.teacher_notes) {
      let notesHtml = '';
      if (lesson.teacher_notes && !Array.isArray(lesson.teacher_notes) && typeof lesson.teacher_notes === 'object') {
        const primerText = lesson.teacher_notes.primer ? \`<div style="font-size: 1.05rem; margin-bottom: 20px;">\${lesson.teacher_notes.primer}</div>\` : '';
        const sourceContext = lesson.teacher_notes.source_context ? \`<div style="font-size: 0.95rem; margin-bottom: 20px; background: rgba(2, 132, 199, 0.2); padding: 15px; border-left: 4px solid #38bdf8; border-radius: 4px;"><strong><i class="fa-solid fa-image"></i> Source Context:</strong><br/>\${lesson.teacher_notes.source_context}</div>\` : '';
        const objectivesHtml = (lesson.teacher_notes.objectives || []).map(note => \`
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><i class="fa-solid fa-bullseye" style="font-size: 0.8rem; margin-right: 4px;"></i> \${note.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: 0;">\${note.primer}</div>
          </div>
        \`).join('');
        notesHtml = primerText + sourceContext + objectivesHtml;
      } else if (Array.isArray(lesson.teacher_notes)) {
        notesHtml = lesson.teacher_notes.map(note => \`
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><i class="fa-solid fa-bullseye" style="font-size: 0.8rem; margin-right: 4px;"></i> \${note.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: 0;">\${note.primer}</div>
          </div>
        \`).join('');
      } else {
        notesHtml = \`<div style="font-size: 1.05rem;">\${lesson.teacher_notes}</div>\`;
      }

      html += \`
        <div class="teacher-note">
          <h4><i class="fa-solid fa-chalkboard-user"></i> Pedagogical Primer</h4>
          \${notesHtml}
        </div>
      \`;
    }

    if (lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {
      let enquiryTitle = lesson.title.replace(/^Lesson\\s*\\d+:\\s*/i, '');
      html += \`
        <div class="phase-card">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #1e3a8a;">\${enquiryTitle}</div>
          </div>
      \`;
      
      lesson.narrative_blocks.forEach((block, index) => {
        if (block.type === 'interactive_map') {
          html += \`
            <div class="interactive-map-container" style="margin: 30px 0; background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h3 style="margin-top: 0; color: #1e293b; font-family: 'Playfair Display', serif;"><i class="fa-solid fa-map-location-dot"></i> Interactive Historical Map</h3>
              <div class="map-img-wrapper" style="position: relative; height: 500px; width: 100%; display: flex; justify-content: center; align-items: center; overflow: hidden; margin-bottom: 20px; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0;">
          \`;
          
          block.maps.forEach((m, idx) => {
            html += \`<img src="\${getAssetUrl(m.src)}" id="map-img-\${m.id}" style="position: absolute; max-width: 100%; max-height: 100%; object-fit: contain; opacity: \${idx === 0 ? '1' : '0'}; transition: opacity 0.6s ease-in-out; border-radius: 6px;">\`;
          });
          
          html += \`
              </div>
              <div id="map-caption-display" style="font-size: 1.1rem; font-style: italic; color: #334155; min-height: 3em; margin-bottom: 20px;">\${block.maps[0].caption}</div>
              <div class="map-controls" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
          \`;
          
          block.maps.forEach((m, idx) => {
            const activeClass = idx === 0 ? 'active-map-btn' : '';
            html += \`
                <button class="btn btn-secondary map-toggle-btn \${activeClass}" data-map-id="\${m.id}" data-caption="\${m.caption.replace(/"/g, '&quot;')}" onclick="toggleMap(this)" style="border-radius: 30px; padding: 8px 16px; font-weight: bold;">
                  \${m.year} \${m.label}
                </button>
            \`;
          });
          
          html += \`
              </div>
            </div>
          \`;
          return;
        }

        const bg = (index % 2 === 0) ? '#ffffff' : '#f0f9ff';
        
        if (typeof block.text === 'string' && block.text.match(/^\\[Key Individual:\\s*(.+)\\]$/i)) {
          const kiMatch = block.text.match(/^\\[Key Individual:\\s*(.+)\\]$/i);
          const personName = kiMatch[1].trim();
          let person = null;
          if (window.db && window.db[window.currentUnitId]) {
            const unitDb = window.db[window.currentUnitId];
            person = unitDb.data?.key_individuals?.find(p => p.name.toLowerCase().includes(personName.toLowerCase()));
            if (!person) person = unitDb.biographies?.find(p => p.name.toLowerCase().includes(personName.toLowerCase()));
          }
          if (person) {
             const { generateKeyIndividualEmbedHTML } = require('./key_individuals.js');
             // Workaround: we can't easily require this in client side string if it's imported at top.
             // But actually this code runs on client, we can just call generateKeyIndividualEmbedHTML
             const cardHtml = window.generateKeyIndividualEmbedHTML ? window.generateKeyIndividualEmbedHTML(person) : \`<div>\${person.name}</div>\`;
             html += \`
               <div class="key-individual-embed" style="margin-bottom: 20px; border: 1px solid var(--border-glass); border-radius: 8px; overflow: hidden; background: #f8fafc; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                 <button onclick="const content = this.nextElementSibling; const icon = this.querySelector('.chevron-icon'); if(content.style.display==='none'){content.style.display='block'; icon.classList.replace('fa-chevron-down','fa-chevron-up');}else{content.style.display='none'; icon.classList.replace('fa-chevron-up','fa-chevron-down');}" style="width: 100%; text-align: left; padding: 15px 20px; background: rgba(59, 130, 246, 0.1); border: none; font-weight: bold; color: #1e3a8a; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 1.05rem; transition: background 0.2s;">
                   <span><i class="fa-solid fa-id-card-clip" style="margin-right: 10px; color: #3b82f6;"></i> Key Individual: \${person.name}</span>
                   <i class="fa-solid fa-chevron-down chevron-icon"></i>
                 </button>
                 <div style="display: none; padding: 25px; background: #ffffff;">
                   <div style="width: 100%; margin: 0 auto;">
                     \${cardHtml}
                   </div>
                 </div>
               </div>
             \`;
             return;
          }
        }

        const isQuote = typeof block.text === 'string' && block.text.startsWith('"');
        let contentStr = isQuote ? \`<em style="font-size:1.1rem; color:#475569;">\${block.text}</em>\` : highlightGlossary(block.text);
        contentStr = formatBold(contentStr);
        contentStr = contentStr.replace(/src=["'](\\.\\/)?assets\\//g, 'src="/' + window.currentUnitId + '/assets/');
        let styledContent = contentStr;
        if (!isQuote && !contentStr.trim().startsWith('<') && contentStr.length > 20) {
           const firstLetter = contentStr.charAt(0);
           const rest = contentStr.slice(1);
           styledContent = \`<span style="float: left; font-size: 3rem; line-height: 2.5rem; padding-top: 4px; padding-right: 8px; padding-left: 3px; font-family: 'Playfair Display', serif; color: #1e3a8a;">\${firstLetter}</span>\` + rest;
        }
        
        let l4StyledContent = '';
        let simplifyBtn = '';
        if (block.level_4) {
          let l4ContentStr = isQuote ? \`<em style="font-size:1.1rem; color:#475569;">\${block.level_4}</em>\` : highlightGlossary(block.level_4);
          l4ContentStr = formatBold(l4ContentStr);
          l4StyledContent = l4ContentStr;
          if (!isQuote && !l4ContentStr.trim().startsWith('<') && l4ContentStr.length > 20) {
             const firstLetter = l4ContentStr.charAt(0);
             const rest = l4ContentStr.slice(1);
             l4StyledContent = \`<span style="float: left; font-size: 3rem; line-height: 2.5rem; padding-top: 4px; padding-right: 8px; padding-left: 3px; font-family: 'Playfair Display', serif; color: #047857;">\${firstLetter}</span>\` + rest;
          }
          simplifyBtn = \`<button class="btn btn-secondary no-print" onclick="window.toggleSimplify(this)" data-original="\${encodeURIComponent(styledContent)}" data-simplified="\${encodeURIComponent(l4StyledContent)}" style="padding: 6px 10px; flex-shrink: 0; margin-left: 5px; color: #047857;" title="Simplify Text"><i class="fa-solid fa-child-reaching"></i></button>\`;
        }

        html += \`
          <div class="standard-narrative-container">
            <div id="para-\${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: \${bg}; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <div class="para-number">\${index + 1}</div>
              <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">\${styledContent}</div>
              <div style="display: flex; align-items: flex-start;">
                <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                \${simplifyBtn}
              </div>
            </div>
          </div>
        \`;

        if (block.level_4) {
          html += \`
            <div class="level4-narrative-container" style="display: none;">
              <div id="para-l4-\${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: \${bg}; border-radius: 6px; border-left: 4px solid #10b981; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div class="para-number" style="background:#ecfdf5; color:#047857;">\${index + 1}</div>
                <div class="narrative-text" style="flex-grow: 1; line-height: 1.6; font-size: 1.15rem; color:#1e293b;">\${l4StyledContent}</div>
                <div style="display: flex; align-items: flex-start;">
                  <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                </div>
              </div>
            </div>
          \`;
        }
        
        if (block.hinge_question) {
          const hingeId = \`hinge-\${index}\`;
          html += \`
            <div class="hinge-question-container no-print" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px;">
              <button class="btn btn-secondary" id="btn-\${hingeId}" onclick="document.getElementById('\${hingeId}').style.display = 'block'; this.style.display = 'none';" style="background: #0ea5e9; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s;"><i class="fa-solid fa-person-circle-question" style="margin-right: 6px;"></i> Reveal Class Quiz</button>
              <div id="\${hingeId}" style="display: none; background: #f0f9ff; border: 2px solid #38bdf8; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="color: #0284c7; font-weight: bold; font-size: 0.9rem; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Interactive Hinge Question</div>
                <div style="color: #0f172a; font-size: 1.1rem; font-weight: bold; margin-bottom: 15px;">"\${block.hinge_question.text}"</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  \${block.hinge_question.options.map((opt, i) => \`
                    <button onclick="
                      const parent = this.parentElement;
                      const explanation = parent.nextElementSibling;
                      for (let child of parent.children) {
                        child.style.pointerEvents = 'none';
                        if (child.dataset.index == \${block.hinge_question.correct_index}) {
                          child.style.backgroundColor = '#dcfce7';
                          child.style.borderColor = '#22c55e';
                          child.style.color = '#166534';
                        }
                      }
                      if (\${i} !== \${block.hinge_question.correct_index}) {
                        this.style.backgroundColor = '#fee2e2';
                        this.style.borderColor = '#ef4444';
                        this.style.color = '#991b1b';
                      }
                      explanation.style.display = 'block';
                    " data-index="\${i}" style="text-align: left; background: #ffffff; border: 1px solid #cbd5e1; color: #334155; padding: 10px 15px; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 1rem;">
                      <span style="font-weight: bold; margin-right: 8px;">\${String.fromCharCode(65+i)}.</span> \${opt}
                    </button>
                  \`).join('')}
                </div>
                <div style="display: none; margin-top: 15px; padding: 12px; background: #dcfce7; border-left: 4px solid #22c55e; color: #166534; font-size: 1rem; border-radius: 0 6px 6px 0;">
                  <strong>Explanation:</strong> \${block.hinge_question.explanation}
                </div>
              </div>
            </div>
          \`;
        }
        
        if (block.tasks && block.tasks.length > 0) {
          html += \`<div class="embedded-tasks-container" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px; padding: 15px; background: #fffbeb; border: 2px dashed #fcd34d; border-radius: 6px;">\`;
          block.tasks.forEach((task, tIdx) => {
             const qPrefix = task.qNum ? \`Q\${task.qNum}. \` : "";
             const ansId = \`ans-emb-\${index}-\${tIdx}\`;
             const starterBtn = task.starter ? \`<button class="btn" onclick="window.toggleStarterById('starter-\${ansId}')" style="margin-left: 5px; padding: 4px 8px; font-size: 0.8rem; background: #e0f2fe; color: #0284c7; border: 1px solid #7dd3fc;"><i class="fa-solid fa-pen"></i> Starter</button>\` : "";
             const starterDiv = task.starter ? \`<div class="starter-box" id="starter-\${ansId}" style="display: none; margin-top: 8px; background: #f0f9ff; padding: 10px; border-left: 3px solid #0284c7; font-style: italic; color: #0c4a6e; transition: all 0.3s ease;">\${task.starter}</div>\` : "";
             html += \`
               <div style="margin-bottom: 10px;">
                 <strong>\${qPrefix}\${task.text}</strong>
                 <button class="btn btn-secondary" onclick="window.toggleAnswerById('\${ansId}')" style="margin-left: 10px; padding: 4px 8px; font-size: 0.8rem;"><i class="fa-solid fa-eye"></i> Show</button>
                 \${starterBtn}
                 \${starterDiv}
                 <div class="answer" id="\${ansId}" style="display: none; margin-top: 8px; background: white; padding: 10px; border-left: 3px solid #b45309; font-style: italic; color: #451a03;">\${task.model}</div>
               </div>
             \`;
          });
          html += \`</div>\`;
        }
      });

      if (lesson.sources && lesson.sources.length > 0) {
        html += \`<div class="sources-grid" style="margin-top: 20px;">\`;
        lesson.sources.forEach(source => {
          html += \`
            <div class="source-card" style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
              \${source.title ? \`<h4 style="color: var(--primary); margin-top: 0; text-align: left;">\${source.title}</h4>\` : ''}
              \${source.src ? \`<img src="\${getAssetUrl(source.src)}" alt="Source Image">\` : ''}
              \${source.caption ? \`<p class="source-caption" style="text-align: left; color: #475569;">\${source.caption}</p>\` : ''}
              \${source.question ? \`
                <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 15px;">
                  <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>\${formatQuestion(source.question)}</strong></p>
                </div>
              \` : ''}
            </div>
          \`;
        });
        html += \`</div>\`;
      }
      html += \`</div>\`;
    }
    
    html += \`</div>\`; // End Tab 2

    // ==========================================
    // TAB 3: APPLICATION
    // ==========================================
    html += \`<div id="tab-app" class="tab-content" style="display: none;">\`;

    if ((lesson.tasks && lesson.tasks.length > 0) || lesson.historians_corner) {
      let hasModels = false;
      if (lesson.tasks) {
        hasModels = lesson.tasks.some(t => !!t.model);
      }
      if (lesson.historians_corner && lesson.historians_corner.stretch_model) {
        hasModels = true;
      }
      
      const revealBtn = hasModels ? \`<button class="btn btn-secondary" onclick="this.closest('.phase-card').querySelectorAll('.model-box').forEach(c => c.style.display = c.style.display === 'block' ? 'none' : 'block')" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-magnifying-glass"></i> Reveal All Models</button>\` : '';

      html += \`
        <div class="phase-card">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">\${lesson.tasks_title || 'Main Activity'}</div>
            \${revealBtn}
          </div>
      \`;

      if (lesson.tasks && lesson.tasks.length > 0) {
        lesson.tasks.forEach((task, tIdx) => {
          let qText = formatQuestion(task.text);
          let clueParaMatch = qText.match(/\\((P|Para\\s*)(\\d+)\\)$/i);
          let clueBtn = '';
          if (clueParaMatch) {
            qText = qText.replace(clueParaMatch[0], '').trim();
            clueBtn = \`<button class="btn btn-secondary btn-sm-icon" title="Find Evidence" onclick="window.scrollToPara('para-\${clueParaMatch[2]}')"><i class="fa-solid fa-magnifying-glass"></i></button>\`;
          }

          html += \`
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                \${qText}
                <span style="display: inline-flex; vertical-align: middle;">
                  \${clueBtn}
                  \${task.starter ? \`<button class="btn btn-secondary btn-sm-icon" title="Sentence Starter" onclick="toggleElement('starter-\${tIdx}')"><i class="fa-solid fa-pen"></i></button>\` : ''}
                  \${task.clue ? \`<button class="btn btn-secondary btn-sm-icon" title="Clue" onclick="toggleElement('clue-\${tIdx}')"><i class="fa-solid fa-lightbulb"></i></button>\` : ''}
                  \${task.model ? \`<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('model-\${tIdx}')"><i class="fa-solid fa-check-double"></i></button>\` : ''}
                </span>
              </div>
              <textarea class="student-answer-input" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>

              \${task.starter ? \`<div id="starter-\${tIdx}" class="scaffold-box starter-box" style="display:none;"><strong>Sentence Starter:</strong> \${task.starter}</div>\` : ''}
              \${task.clue ? \`<div id="clue-\${tIdx}" class="scaffold-box clue-box" style="display:none;"><strong>Clue Hint:</strong> \${task.clue}</div>\` : ''}
              \${task.model ? \`<div id="model-\${tIdx}" class="scaffold-box model-box" style="display:none;">\${task.model}</div>\` : ''}
            </div>
          \`;
        });
      }

      if (lesson.historians_corner) {
        const hc = lesson.historians_corner;
        html += \`
          <div style="margin-top: 30px; background: #fafafa; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h3 style="margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; color: #0f172a;">\${hc.title}</h3>
            <p style="font-size: 1.05rem; line-height: 1.6; color: #334155; margin-bottom: 20px;">\${formatBold(hc.text || (hc.author_context + "<br><br><i>" + hc.extract + "</i>"))}</p>
            \${hc.stretch_question ? \`
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 0;">
              <div style="font-weight: 700; margin-bottom: 10px; color: #ef4444;">Stretch Challenge</div>
              <div style="font-size: 1.05rem; margin-bottom: 12px;">
                \${hc.stretch_question}
                <span style="display: inline-flex; vertical-align: middle;">
                  \${hc.starter ? \`<button class="btn btn-secondary btn-sm-icon" title="Sentence Starter" onclick="toggleElement('hc-starter')"><i class="fa-solid fa-pen"></i></button>\` : ''}
                  \${hc.clue ? \`<button class="btn btn-secondary btn-sm-icon" title="Clue" onclick="toggleElement('hc-clue')"><i class="fa-solid fa-lightbulb"></i></button>\` : ''}
                  \${hc.stretch_model ? \`<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('hc-model')"><i class="fa-solid fa-check-double"></i></button>\` : ''}
                </span>
              </div>
              \${hc.starter ? \`<div id="hc-starter" class="scaffold-box starter-box" style="display:none;"><strong>Sentence Starter:</strong> \${hc.starter}</div>\` : ''}
              \${hc.clue ? \`<div id="hc-clue" class="scaffold-box clue-box" style="display:none;"><strong>Clue Hint:</strong> \${hc.clue}</div>\` : ''}
              \${hc.stretch_model ? \`<div id="hc-model" class="scaffold-box model-box" style="display:none;">\${hc.stretch_model}</div>\` : ''}
            </div>\` : ''}
          </div>
        \`;
      }
      html += \`</div>\`;
    }

    if (lesson.pair_share) {
      const ps = lesson.pair_share;
      html += \`
        <div class="phase-card">
          <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; overflow: hidden;" closed>
            <summary style="padding: 15px 20px; cursor: pointer; color: #059669; font-weight: bold; font-size: 1.2rem; background: #ecfdf5; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #a7f3d0;">
              <span><i class="fa-solid fa-users" style="color: #059669; margin-right: 10px;"></i> Think, Pair, Share</span>
              <i class="fa-solid fa-chevron-down" style="color: #059669;"></i>
            </summary>
            <div style="padding: 20px; background: #ecfdf5;">
              <p style="font-size: 1.15rem; font-weight: 700; color: #065f46; margin-top: 0;">\${ps.prompt}</p>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-brain"></i> 1. Think</div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">\${ps.think}</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-comments"></i> 2. Pair</div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">\${ps.pair}</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-users"></i> 3. Share</div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">\${ps.share}</p>
                </div>
              </div>
            </div>
          </details>
        </div>
      \`;
    }

    if (lesson.flashcards && lesson.flashcards.length > 0) {
      html += \`
        <div class="phase-card">
          <div class="phase-title">Consolidation & Recall</div>
          <p style="color: #666; margin-bottom: 20px;">Tap a card to flip it and reveal the definition.</p>
          <div class="flashcard-deck">
      \`;
      lesson.flashcards.forEach(fc => {
        html += \`
          <div class="flashcard-wrapper" onclick="this.classList.toggle('flipped')">
            <div class="flashcard-inner">
              <div class="flashcard-face flashcard-front">
                <h4>\${fc.term}</h4>
                <p>Tap to reveal</p>
              </div>
              <div class="flashcard-face flashcard-back">
                \${fc.definition}
              </div>
            </div>
          </div>
        \`;
      });
      html += \`</div></div>\`;
    }

    if (lesson.extended || lesson.debate_prep) {
      let extHtml = \`
        <div class="phase-card">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Extended Scholarship</div>
            \${lesson.extended && (lesson.extended.model || lesson.extended.answer) ? \`<button class="btn btn-secondary" onclick="toggleElement('extended-model-\${lesson.id}')" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-check-double"></i> Reveal Model Answer</button>\` : ''}
          </div>
      \`;

      if (lesson.debate_prep) {
        const dp = lesson.debate_prep;
        const allArgs = [...dp.arguments_for.map(a=>({t:a, s:'for'})), ...dp.arguments_against.map(a=>({t:a, s:'against'}))].sort(() => Math.random() - 0.5);
        const argsHtml = allArgs.map((arg, idx) => \`<div class="debate-card" draggable="true" ondragstart="window.dragDebate(event)" id="debate-arg-\${lesson.id}-\${idx}" data-side="\${arg.s}" style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; margin-bottom: 8px; border-radius: 6px; cursor: grab;">\${arg.t}</div>\`).join('');

        extHtml += \`
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="margin-top: 0; color: #1e3a8a;"><i class="fa-solid fa-scale-balanced"></i> Debate Prep: \${dp.question}</h3>
            <p style="color: #475569; font-size: 0.95rem;">Drag and drop the evidence cards below into the correct columns to prepare your arguments before writing your essay.</p>
            
            <div id="debate-bank-\${lesson.id}" class="debate-dropzone" ondragover="window.allowDrop(event)" ondrop="window.dropDebate(event)" style="background: white; border: 2px dashed #94a3b8; padding: 15px; border-radius: 8px; margin-bottom: 20px; min-height: 80px;">
              \${argsHtml}
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <h4 style="text-align: center; color: #16a34a; margin-top: 0;">Agree</h4>
                <div id="debate-for-\${lesson.id}" class="debate-dropzone" data-target="for" ondragover="window.allowDrop(event)" ondrop="window.dropDebate(event)" style="background: white; border: 2px dashed #86efac; padding: 15px; border-radius: 8px; min-height: 150px;"></div>
              </div>
              <div>
                <h4 style="text-align: center; color: #dc2626; margin-top: 0;">Disagree</h4>
                <div id="debate-against-\${lesson.id}" class="debate-dropzone" data-target="against" ondragover="window.allowDrop(event)" ondrop="window.dropDebate(event)" style="background: white; border: 2px dashed #fca5a5; padding: 15px; border-radius: 8px; min-height: 150px;"></div>
              </div>
            </div>
            <div style="text-align: center; margin-top: 15px;">
              <button class="btn btn-primary" onclick="window.checkDebate('\${lesson.id}')">Check Answers</button>
              <div id="debate-feedback-\${lesson.id}" style="margin-top: 10px; font-weight: bold;"></div>
            </div>
          </div>
        \`;
      }

      if (lesson.extended && (lesson.extended.paragraphs || lesson.extended.title)) {
        if (lesson.extended.title) {
          extHtml += \`<h3 style="color: #0f172a;">\${lesson.extended.title}</h3>\`;
        }
        if (lesson.extended.paragraphs) {
          lesson.extended.paragraphs.forEach(p => {
             extHtml += \`<p style="color: #334155; font-size: 1.05rem; line-height: 1.6;">\${formatBold(p)}</p>\`;
          });
        }
      }
      extHtml += \`</div>\`;
      
      if (lesson.debate_prep || (lesson.extended && (lesson.extended.paragraphs || lesson.extended.title))) {
         html += extHtml;
      }
    }

    if (lesson.gcse_task || (lesson.extended && lesson.extended.question) || extractedExamTasks.length > 0) {
      let gcseHtml = \`
        <div class="phase-card">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #b45309;"><i class="fa-solid fa-graduation-cap"></i> GCSE Exam Practice</div>
            <button class="btn btn-secondary" onclick="this.closest('.phase-card').querySelectorAll('.model-box').forEach(c => c.style.display = c.style.display === 'block' ? 'none' : 'block')" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-magnifying-glass"></i> Reveal Models</button>
          </div>
      \`;

      if (lesson.extended && lesson.extended.question) {
        let hintsHtml = '';
        if (lesson.extended.hints && lesson.extended.hints.length > 0) {
           hintsHtml = \`<div style="margin-top: 15px; padding: 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px;"><strong style="color: #d97706;">Hints:</strong><ul style="margin: 5px 0 0 0; color: #92400e;">\${lesson.extended.hints.map(h => \`<li>\${formatBold(h)}</li>\`).join('')}</ul></div>\`;
        }

        let sourceHtml = '';
        if (lesson.extended.source_a || lesson.extended.source_b) {
          sourceHtml = \`<div style="display: flex; gap: 20px; margin: 15px 0;">\`;
          if (lesson.extended.source_a) {
             const prov = typeof lesson.extended.source_a === 'string' ? '' : lesson.extended.source_a.provenance;
             const content = typeof lesson.extended.source_a === 'string' ? lesson.extended.source_a : lesson.extended.source_a.content;
             sourceHtml += \`
               <div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                 <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source A</strong>
                 \${prov ? \`<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">\${prov}</span>\` : ''}
                 <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                   \${content.replace(/\\n/g, '<br>')}
                 </div>
               </div>\`;
          }
          if (lesson.extended.source_b) {
             const prov = typeof lesson.extended.source_b === 'string' ? '' : lesson.extended.source_b.provenance;
             const content = typeof lesson.extended.source_b === 'string' ? lesson.extended.source_b : lesson.extended.source_b.content;
             sourceHtml += \`
               <div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                 <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source B</strong>
                 \${prov ? \`<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">\${prov}</span>\` : ''}
                 <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                   \${content.replace(/\\n/g, '<br>')}
                 </div>
               </div>\`;
          }
          sourceHtml += \`</div>\`;
          if (lesson.extended.provenance_clue) {
            sourceHtml += \`<details style="margin-top: 15px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; overflow: hidden;">
              <summary style="padding: 12px; cursor: pointer; color: #166534; font-weight: bold; list-style: none;">
                <i class="fa-solid fa-magnifying-glass" style="margin-right: 5px;"></i> Click to Reveal Provenance Scaffolding Clues
              </summary>
              <div style="padding: 0 12px 12px 12px; color: #15803d; border-top: 1px solid #bbf7d0; margin-top: 5px; padding-top: 12px;">
                \${lesson.extended.provenance_clue}
              </div>
            </details>\`;
          }
        }

        gcseHtml += \`
          <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
            <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
              \${formatQuestion(lesson.extended.question)}
              <span style="display: inline-flex; vertical-align: middle;">
                \${lesson.extended.model || lesson.extended.answer ? \`<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('extended-model-\${lesson.id}')"><i class="fa-solid fa-check-double"></i></button>\` : ''}
              </span>
            </div>
            \${sourceHtml}
            \${hintsHtml}
            <textarea class="student-answer-input" style="min-height: 200px;" placeholder="Write your extended response here..." oninput="window.updateProgress()"></textarea>
            \${lesson.extended.model || lesson.extended.answer ? \`<div id="extended-model-\${lesson.id}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">\${lesson.extended.model || lesson.extended.answer}</div>\` : ''}
          </div>
        \`;
      }

      if (lesson.gcse_task) {
        if (lesson.gcse_task.tasks) {
          lesson.gcse_task.tasks.forEach((task, tIdx) => {
            gcseHtml += \`
              <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                  \${formatQuestion(task.text)}
                  <span style="display: inline-flex; vertical-align: middle;">
                    \${task.model ? \`<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('gcse-model-\${tIdx}')"><i class="fa-solid fa-check-double"></i></button>\` : ''}
                  </span>
                </div>
                <textarea class="student-answer-input" style="min-height: \${task.text.includes("12 marks") || task.text.includes("16 marks") ? "200px" : "100px"};" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>
                \${task.model ? \`<div id="gcse-model-\${tIdx}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">\${task.model}</div>\` : ''}
              </div>
            \`;
          });
        } else if (lesson.gcse_task.sources) {
           gcseHtml += \`<p style="font-weight: bold; font-size: 1.15rem; color: #1e3a8a;">How useful are Sources A and B for an enquiry into \${lesson.gcse_task.topic}?</p>\`;
           gcseHtml += \`<div style="display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">\`;
           lesson.gcse_task.sources.forEach(srcObj => {
             gcseHtml += \`<div style="flex: 1; min-width: 300px; background: white; border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">\`;
             if (srcObj.type === 'visual') {
               gcseHtml += \`<img src="\${getAssetUrl(srcObj.src)}" style="max-width: 100%; max-height: 250px; border-radius: 4px; margin-bottom: 10px;">\`;
             } else {
               gcseHtml += \`<blockquote style="font-size: 1.05rem; font-style: italic; color: #475569; margin: 0 0 15px 0; border-left: 4px solid #94a3b8; padding-left: 10px;">\${formatBold(srcObj.text)}</blockquote>\`;
             }
             gcseHtml += \`<p style="font-size: 0.95rem; font-weight: bold; color: #334155; margin: 0;">\${srcObj.title}</p>\`;
             gcseHtml += \`</div>\`;
           });
           gcseHtml += \`</div>\`;
           gcseHtml += \`<textarea class="student-answer-input" style="min-height: 200px;" placeholder="Type your 8-mark utility evaluation here..." oninput="window.updateProgress()"></textarea>\`;
           if (lesson.gcse_task.model) {
              gcseHtml += \`<div style="margin-top: 15px;"><button class="btn btn-secondary" onclick="toggleElement('gcse-model-src')"><i class="fa-solid fa-check-double"></i> Reveal Model Answer</button></div>\`;
              gcseHtml += \`<div id="gcse-model-src" class="scaffold-box model-box" style="display:none; margin-top: 15px;">\${lesson.gcse_task.model}</div>\`;
           }
        }
      }

      if (extractedExamTasks.length > 0) {
        extractedExamTasks.forEach((task, tIdx) => {
          gcseHtml += \`
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                \${formatQuestion(task.text || task.question)}
                <span style="display: inline-flex; vertical-align: middle;">
                  \${task.model ? \`<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('extracted-model-\${tIdx}')"><i class="fa-solid fa-check-double"></i></button>\` : ''}
                </span>
              </div>
              <textarea class="student-answer-input" style="min-height: 200px;" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>
              \${task.model ? \`<div id="extracted-model-\${tIdx}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">\${task.model}</div>\` : ''}
            </div>
          \`;
        });
      }
      gcseHtml += \`</div>\`;
      html += gcseHtml;
    }

    if (lesson.quiz && lesson.quiz.length > 0) {
      html += \`
        <div class="phase-card">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Knowledge Check Quiz</div>
            <button class="btn btn-primary no-print" onclick="window.startQuiz('\${lesson.id}')" style="font-size: 1.1rem; padding: 10px 20px; border-radius: 8px;">
              <i class="fa-solid fa-clipboard-check"></i> Start Quiz
            </button>
          </div>
          <p style="color: #475569; font-size: 1.05rem; margin-bottom: 0;">Test your knowledge of this lesson with a quick multiple-choice quiz.</p>
        </div>
      \`;
    }

    html += \`</div>\`; // End Tab 3
    
    html += \`</div>\`; // End lesson-content wrapper

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
    }, 100); 
  }
  `;
}

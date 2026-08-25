export function renderExamPracticeZone(container, unitData) {
  // 1. Flatten the exam_practice from lessons into a master list of questions
  let examBank = [];
  
  // Legacy support for older units (if any still exist)
  if (unitData.exam_blocks) {
    unitData.exam_blocks.forEach(block => {
      block.questions.forEach(q => {
        examBank.push({
          ...q,
          question: q.text || q.question, // unify
          blockTitle: block.title
        });
      });
    });
  }

  // Modern support for 'exam_practice' within lessons
  if (unitData.lessons) {
    unitData.lessons.forEach(l => {
      if (l.exam_practice) {
        let practices = [];
        if (Array.isArray(l.exam_practice)) {
            practices = l.exam_practice;
        } else if (l.exam_practice.questions) {
            // New structure: object with questions and stimulus
            practices = l.exam_practice.questions.map(q => {
               return {
                  ...q,
                  stimulus: q.stimulus || l.exam_practice.stimulus // inherit global stimulus if question doesn't have its own
               };
            });
        } else {
            // Single question object
            practices = [l.exam_practice];
        }

        practices.forEach(ep => {
          let qText = ep.question || ep.text;
          if (!qText) return; // Skip if no question text
          let type = ep.type;
          if (!type) {
              if (qText.includes("12 marks")) type = "12-mark";
              else if (qText.includes("16 marks")) type = "16-mark";
              else if (qText.includes("2 marks") || qText.includes("4 marks") || qText.includes("8 marks")) {
                  let m = qText.match(/\((\d+) marks?\)/);
                  type = m ? `${m[1]}-mark` : "4-mark";
              } else {
                  type = "Exam";
              }
          }
          let blockTitle = l.title || "";
          let ktPrefix = blockTitle.split(':')[0]; // e.g. "KT1.1"

          examBank.push({
            ...ep,
            question: qText,
            blockTitle: blockTitle,
            ktPrefix: ktPrefix,
            type: type
          });
        });
      }
    });
  }

  let hasAnyAssessments = (unitData.assessments && unitData.assessments.length > 0) || 
                          (unitData.lessons && unitData.lessons.some(l => (l.assessments && l.assessments.length > 0) || l.gcse_task));
  let hasMockExams = (unitData.mock_exams && unitData.mock_exams.length > 0);
  if (examBank.length === 0 && !hasAnyAssessments && !hasMockExams) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px; background: #fff; border-radius: 12px; color: #64748b; font-size: 1.2rem;">
        <i class="fa-solid fa-file-circle-xmark fa-3x" style="margin-bottom:20px; color:#cbd5e1;"></i>
        <br>No assessments or exam questions found for this unit.
      </div>
    `;
    return;
  }

  // Extract unique types for the filter dropdown
  const uniqueTypes = [...new Set(examBank.map(q => q.type).filter(Boolean))];

  const isKS3 = unitData.title && unitData.title.includes('KS3');

  if (isKS3) {
    // For KS3 units, we just list the assessments
    let assessmentsHtml = `
      <style>
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
      <div class="epz-wrapper" style="max-width: 900px; margin: 0 auto; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.4); border-radius: 20px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; position: relative;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #1e3a8a; margin-top: 0; margin-bottom: 30px;"><i class="fa-solid fa-pen-nib" style="color: #3b82f6;"></i> Unit Assessments</h2>
        <div style="display: flex; flex-direction: column; gap: 20px;">
    `;
    
    let ks3Assessments = [];
    if (unitData.assessments && Array.isArray(unitData.assessments)) {
       ks3Assessments.push(...unitData.assessments.map(a => ({...a, lessonTitle: 'End of Unit Assessment'})));
    }
    if (unitData.lessons) {
      unitData.lessons.forEach(l => {
        if (l.assessments) {
           l.assessments.forEach(a => ks3Assessments.push({...a, lessonTitle: l.title}));
        } else if (l.gcse_task) {
           ks3Assessments.push({...l.gcse_task, lessonTitle: l.title});
        }
      });
    }
    
    if (ks3Assessments.length === 0) {
      assessmentsHtml += `<p style="color: #64748b; font-size: 1.1rem;">No assessments found for this unit.</p>`;
    } else {
      ks3Assessments.forEach(ass => {
        let taskContent = ass.question || ass.text || ass.description || 'Assessment Task';
        if (ass.type === 'timeline' && ass.events) {
           taskContent += `<ul style="margin-top: 15px; font-size: 1.1rem; color: #475569;">` + ass.events.map(e => `<li><strong>${e.title}</strong>: ${e.detail}</li>`).join('') + `</ul>`;
        }
        assessmentsHtml += `
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #3b82f6;">
            <div style="font-size: 0.9rem; font-weight: 700; color: #6366f1; text-transform: uppercase; margin-bottom: 10px;">${ass.lessonTitle}</div>
            <h3 style="margin-top: 0; color: #0f172a; font-size: 1.3rem; margin-bottom: 15px;">${ass.title && ass.lessonTitle !== 'End of Unit Assessment' ? ass.title + '<br>' : ''}${taskContent}</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              ${ass.hint ? `<button class="main-btn" onclick="alert('${ass.hint.replace(/'/g, "\\'")}')" style="background: #fef3c7; color: #d97706; border: 1px solid #fde68a; padding: 8px 16px; border-radius: 8px; font-weight: 600;"><i class="fa-solid fa-lightbulb"></i> Hint</button>` : ''}
              ${ass.model_answer ? `<button class="main-btn" onclick="const a = this.nextElementSibling; a.style.display = a.style.display === 'none' ? 'block' : 'none';" style="background: #d1fae5; color: #059669; border: 1px solid #a7f3d0; padding: 8px 16px; border-radius: 8px; font-weight: 600;"><i class="fa-solid fa-star"></i> Show Model</button>
              <div style="display: none; width: 100%; margin-top: 15px; padding: 15px; background: #f0fdf4; border-left: 4px solid #10b981; color: #064e3b; border-radius: 0 8px 8px 0; white-space: pre-wrap;">${Array.isArray(ass.model_answer) ? ass.model_answer.join('\\n\\n') : ass.model_answer}</div>` : ''}
            </div>
          </div>
        `;
      });
    }
    
    assessmentsHtml += `</div></div>`;
    container.innerHTML = assessmentsHtml;
    return;
  }
  
  // 2. Build the UI wrapper for KS4
  container.innerHTML = `
    <style>
      @keyframes slideUpFade {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .epz-wrapper {
        max-width: 900px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.4);
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05);
        animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        position: relative;
        overflow: hidden;
      }
      .epz-title {
        font-family: 'Playfair Display', serif;
        font-size: 2.8rem;
        background: linear-gradient(135deg, #1e3a8a 0%, #4f46e5 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
        font-weight: 800;
        letter-spacing: -0.5px;
      }
      .epz-btn {
        transition: all 0.2s ease;
        transform: translateY(0);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .epz-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        filter: brightness(1.05);
      }
      .epz-btn:active {
        transform: translateY(1px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .epz-select {
        transition: all 0.3s ease;
      }
      .epz-select:hover {
        border-color: #94a3b8 !important;
      }
      .epz-select:focus {
        outline: none;
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
      }
      .epz-card {
        background: white;
        border-radius: 16px;
        padding: 30px;
        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
        border: 1px solid #f1f5f9;
        margin-top: 30px;
        position: relative;
        overflow: hidden;
      }
      .epz-card::after {
        content: '';
        position: absolute;
        top: 0; right: 0; width: 100px; height: 100px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
      }
      .epz-pill {
        padding: 8px 16px;
        border-radius: 20px;
        border: 2px solid #cbd5e1;
        background: white;
        color: #475569;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 0.95rem;
      }
      .epz-pill:hover {
        border-color: #3b82f6;
        color: #3b82f6;
      }
      .epz-pill.active {
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
      }
    </style>
    
    <div class="epz-wrapper">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; gap: 20px; flex-wrap: wrap;">
        <div>
          <h1 class="epz-title"><i class="fa-solid fa-pen-nib" style="color: #3b82f6;"></i> Exam Practice Zone</h1>
          <p style="color: #64748b; font-size: 1.15rem; margin-top: 10px;">${examBank.length > 0 ? 'Select a question type or a specific past paper question to master.' : 'Download complete mock exams below.'}</p>
        </div>
        <button id="epz-back-btn" class="main-btn epz-btn" style="display: none; background: #f8fafc; color: #334155; border: 1px solid #cbd5e1; padding: 10px 20px; border-radius: 10px; font-weight: 600;"><i class="fa-solid fa-arrow-left"></i> Change Question</button>
      </div>

      <div id="epz-controls" ${examBank.length === 0 ? 'style="display:none;"' : ''}>
        <div style="display: flex; flex-direction: column; gap: 20px; background: #f8fafc; padding: 25px; border-radius: 16px; border: 1px solid #e2e8f0;">
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <label style="font-weight: 700; color: #1e293b; font-size: 1.05rem; text-transform: uppercase; letter-spacing: 0.5px;">Target Question Type</label>
            <div id="epz-type-pills" style="display: flex; gap: 10px; flex-wrap: wrap;">
              <button class="epz-pill active" data-type="all">📚 All Question Types</button>
              ${uniqueTypes.map(t => `<button class="epz-pill" data-type="${t}">${t.charAt(0).toUpperCase() + t.slice(1)}</button>`).join('')}
            </div>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <label style="font-weight: 700; color: #1e293b; font-size: 1.05rem; text-transform: uppercase; letter-spacing: 0.5px;">Or Select Specific Question</label>
            <select id="epz-specific-filter" class="epz-select" style="width: 100%; padding: 14px; border-radius: 10px; border: 2px solid #cbd5e1; font-size: 1.15rem; background: #ffffff; color: #1e293b; cursor: pointer;">
              <option value="random">🎲 Random Question (From Filters Above)</option>
            </select>
          </div>
          <button id="epz-generate-btn" class="main-btn epz-btn" style="background: linear-gradient(135deg, #3b82f6, #4f46e5); color: white; padding: 14px 28px; font-size: 1.15rem; flex-shrink: 0; border: none; border-radius: 10px; font-weight: 600;">
            <i class="fa-solid fa-bolt"></i> Generate Question
          </button>
        </div>
      </div>

      <div id="epz-question-display" style="display: none;" class="epz-card">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px;">
          <div id="epz-q-meta" style="font-size: 0.95rem; font-weight: 800; color: #6366f1; text-transform: uppercase; letter-spacing: 1.5px; background: rgba(99, 102, 241, 0.1); padding: 6px 12px; border-radius: 8px;"></div>
          <div id="epz-timer-container" style="display: flex; align-items: center; gap: 12px; background: linear-gradient(135deg, #0f172a, #1e293b); color: white; padding: 10px 20px; border-radius: 25px; font-family: 'Courier New', monospace; font-size: 1.4rem; font-weight: bold; box-shadow: 0 4px 15px rgba(15, 23, 42, 0.4); border: 1px solid rgba(255,255,255,0.1);">
            <i class="fa-solid fa-stopwatch" style="color: #38bdf8;"></i> <span id="epz-timer-display" style="letter-spacing: 2px;">00:00</span>
            <button id="epz-timer-toggle" style="background: rgba(255,255,255,0.1); border: none; color: white; cursor: pointer; padding: 6px 10px; border-radius: 50%; transition: background 0.2s;"><i class="fa-solid fa-play"></i></button>
          </div>
        </div>

        <h2 id="epz-q-text" style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #0f172a; margin-top: 0; line-height: 1.3; font-weight: 700;"></h2>
        <div id="epz-q-stimulus" style="font-size: 1.2rem; color: #475569; margin-top: 20px; font-style: italic; background: rgba(255,255,255,0.7); padding: 15px; border-radius: 8px; border-left: 4px solid #cbd5e1;"></div>
        
        <div id="epz-q-images" style="display: none; margin-top: 20px; display: flex; flex-wrap: wrap; gap: 10px;"></div>

        <div id="epz-q-provenance" style="display: none; margin-top: 15px; padding: 15px; background: #fef08a; border-left: 5px solid #ca8a04; color: #854d0e; font-size: 1.1rem; border-radius: 8px;"><i class="fa-solid fa-lightbulb"></i> <strong>Scaffolding:</strong> <span id="epz-q-provenance-text"></span></div>

        <div style="margin-top: 35px; display: flex; gap: 15px; flex-wrap: wrap;">
          <button id="epz-hint-btn" class="main-btn epz-btn" style="display: none; background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 12px 24px; font-size: 1.1rem; border: none; border-radius: 8px; font-weight: 600;"><i class="fa-solid fa-lightbulb"></i> Structure Strip Hint</button>
          <button id="epz-wagoll-btn" class="main-btn epz-btn" style="display: none; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 12px 24px; font-size: 1.1rem; border: none; border-radius: 8px; font-weight: 600;"><i class="fa-solid fa-star"></i> Show Model Answer</button>
        </div>

        <div id="epz-hint-panel" style="display: none; margin-top: 25px; padding: 25px; background: linear-gradient(to right, #fffbeb, #fef3c7); border-left: 5px solid #f59e0b; border-radius: 0 12px 12px 0; font-size: 1.15rem; color: #92400e; box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.1);"></div>
        <div id="epz-wagoll-panel" style="display: none; margin-top: 25px; padding: 30px; background: linear-gradient(to right, #ecfdf5, #d1fae5); border-left: 5px solid #10b981; border-radius: 0 12px 12px 0; font-size: 1.15rem; color: #065f46; line-height: 1.8; white-space: pre-wrap; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.1);"></div>

      </div>
      
    </div>
  `;

  // 3. Logic State
  let currentQuestion = null;
  let timerInterval = null;
  let timeLeft = 0;
  let timerRunning = false;

  // 4. Elements
  let currentSelectedType = 'all';
  const typePills = document.getElementById('epz-type-pills');
  const specificFilter = document.getElementById('epz-specific-filter');
  const generateBtn = document.getElementById('epz-generate-btn');
  const backBtn = document.getElementById('epz-back-btn');
  const displayArea = document.getElementById('epz-question-display');
  
  const qMeta = document.getElementById('epz-q-meta');
  const qText = document.getElementById('epz-q-text');
  const qStimulus = document.getElementById('epz-q-stimulus');
  const qImages = document.getElementById('epz-q-images');
  const qProv = document.getElementById('epz-q-provenance');
  const qProvText = document.getElementById('epz-q-provenance-text');
  
  const timerDisplay = document.getElementById('epz-timer-display');
  const timerToggle = document.getElementById('epz-timer-toggle');
  
  const hintBtn = document.getElementById('epz-hint-btn');
  const wagollBtn = document.getElementById('epz-wagoll-btn');
  const hintPanel = document.getElementById('epz-hint-panel');
  const wagollPanel = document.getElementById('epz-wagoll-panel');

  // Helpers
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const updateTimerDisplay = () => {
    timerDisplay.textContent = formatTime(timeLeft);
    if (timeLeft <= 60) {
      timerDisplay.style.color = '#ef4444'; // Red for last minute
    } else {
      timerDisplay.style.color = 'white';
    }
  };

  const startTimer = () => {
    if (timerRunning) return;
    timerRunning = true;
    timerToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        stopTimer();
        alert("Time's up! Pens down!");
      }
    }, 1000);
  };

  const stopTimer = () => {
    timerRunning = false;
    timerToggle.innerHTML = '<i class="fa-solid fa-play"></i>';
    clearInterval(timerInterval);
  };

  const populateSpecificQuestions = () => {
    const selectedType = currentSelectedType;
    let filteredBank = examBank;
    
    if (selectedType !== 'all') {
      filteredBank = filteredBank.filter(q => q.type === selectedType);
    }
    
    // Preserve current selection if it still exists
    const currentVal = specificFilter.value;
    
    let html = '<option value="random">🎲 Random Question (From Filters Above)</option>';
    filteredBank.forEach((q) => {
        const originalIndex = examBank.indexOf(q);
        let typeIcon = "📄";
        let truncatedText = q.question.length > 75 ? q.question.substring(0, 75) + "..." : q.question;
        let prefix = q.ktPrefix ? `[${q.ktPrefix}] ` : '';
        html += `<option value="${originalIndex}">${typeIcon} ${prefix}${truncatedText}</option>`;
    });
    
    specificFilter.innerHTML = html;
    
    // Attempt to re-select
    if (currentVal !== "random") {
      let optionExists = Array.from(specificFilter.options).some(opt => opt.value === currentVal);
      if (optionExists) {
          specificFilter.value = currentVal;
      }
    }
  };

  // Interactions
  backBtn.addEventListener('click', () => {
    stopTimer();
    const links = Array.from(document.querySelectorAll('.lesson-link'));
    const homeLink = links.find(l => l.innerHTML.includes('Unit Homepage'));
    if (homeLink) {
      homeLink.click();
    } else {
      window.location.href = '/';
    }
  });

  timerToggle.addEventListener('click', () => {
    if (timerRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  });

  hintBtn.addEventListener('click', () => {
    hintPanel.style.display = hintPanel.style.display === 'none' ? 'block' : 'none';
  });

  wagollBtn.addEventListener('click', () => {
    wagollPanel.style.display = wagollPanel.style.display === 'none' ? 'block' : 'none';
  });

  if (typePills) {
    typePills.addEventListener('click', (e) => {
      if (e.target.classList.contains('epz-pill')) {
        // Update active class
        Array.from(typePills.children).forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        // Update state and refresh
        currentSelectedType = e.target.getAttribute('data-type');
        populateSpecificQuestions();
      }
    });
  }

  generateBtn.addEventListener('click', () => {
    const selectedSpecific = specificFilter ? specificFilter.value : 'random';
    
    if (selectedSpecific !== 'random') {
      currentQuestion = examBank[parseInt(selectedSpecific)];
    } else {
      const selectedType = currentSelectedType;
      let filteredBank = examBank;
      
      if (selectedType !== 'all') {
        filteredBank = filteredBank.filter(q => q.type === selectedType);
      }
      
      if (filteredBank.length === 0) {
        alert("No questions found for this filter.");
        return;
      }

      // Pick random
      const randIndex = Math.floor(Math.random() * filteredBank.length);
      currentQuestion = filteredBank[randIndex];
    }
    
    // Reset UI
    stopTimer();
    displayArea.style.display = 'block';
    hintPanel.style.display = 'none';
    wagollPanel.style.display = 'none';
    qImages.innerHTML = '';
    
    // Set Timer (approx 1.5 mins per mark)
    let marks = currentQuestion.marks || parseInt((currentQuestion.type || "0").replace(/[^0-9]/g, '')) || 0;
    if (marks) {
        timeLeft = marks * 90; // 1.5 mins per mark
        updateTimerDisplay();
    }
    
    qMeta.innerHTML = `<i class="fa-solid fa-book-open"></i> ${currentQuestion.blockTitle} &bull; ${currentQuestion.type || 'Exam'} Question`;
    qText.textContent = currentQuestion.question;
    
    if (currentQuestion.stimulus) {
      if (Array.isArray(currentQuestion.stimulus)) {
          qStimulus.innerHTML = currentQuestion.stimulus.map(stim => {
              if (typeof stim === 'string') return stim;
              if (typeof stim === 'object') {
                  return `<strong>${stim.title}</strong><br>${stim.content}`;
              }
              return '';
          }).join('<br><br>');
      } else {
          qStimulus.innerHTML = currentQuestion.stimulus;
      }
      qStimulus.style.display = 'block';
    } else {
      qStimulus.innerHTML = '';
      qStimulus.style.display = 'none';
    }

    // Handle images / sources
    if (currentQuestion.image) {
        qImages.style.display = 'flex';
        qImages.innerHTML += `<img src="${currentQuestion.image}" style="max-width: 100%; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">`;
    }

    if (currentQuestion.provenance_clue) {
      qProvText.textContent = currentQuestion.provenance_clue;
      qProv.style.display = 'block';
    } else {
      qProv.style.display = 'none';
    }

    if (currentQuestion.structure_strip || currentQuestion.scaffolding) {
        hintBtn.style.display = 'block';
        let strip = currentQuestion.structure_strip || currentQuestion.scaffolding;
        let stripHtml = `<strong>Scaffolding / Structure Strip:</strong><br><br>`;
        if (typeof strip === 'string') {
            stripHtml += strip.replace(/\\n/g, '<br>');
        } else if (Array.isArray(strip)) {
            stripHtml += `<ul style="padding-left: 20px;">${strip.map(s => `<li>${s}</li>`).join('')}</ul>`;
        }
        hintPanel.innerHTML = stripHtml;
    } else {
        hintBtn.style.display = 'none';
    }

    if (currentQuestion.model_answer) {
        wagollBtn.style.display = 'block';
        let ans = currentQuestion.model_answer;
        if (Array.isArray(ans)) ans = ans.join('<br><br>');
        wagollPanel.innerHTML = ans.replace(/\\n|\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    } else {
        wagollBtn.style.display = 'none';
    }
  });

  // Render legacy assessments container correctly
  const assessmentsContainer = document.createElement('div');
  assessmentsContainer.id = 'legacy-assessments';
  
  if (hasAnyAssessments) {
      // Logic for legacy assessments could go here.
      // But since we are extracting ALL exam_practice into examBank,
      // it handles both workflows cleanly now.
  }

  // Initialize specific questions list on load
  populateSpecificQuestions();
  
  // Render Mock Exams Section
  if (unitData.mock_exams && unitData.mock_exams.length > 0) {
    const mocksHtml = `
      <div style="margin-top: 50px; background: #fff; padding: 30px; border-radius: 16px; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: #1e293b; margin-top: 0; margin-bottom: 20px;">
          <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i> Printable Mock Exams
        </h2>
        <p style="color: #475569; font-size: 1.1rem; margin-bottom: 25px;">Generate completely copyright-free, print-ready PDF replicas of past papers.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
          ${unitData.mock_exams.map(mock => `
            <div style="border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; background: #f8fafc; display: flex; flex-direction: column;">
              <h3 style="margin-top: 0; color: #0f172a; font-size: 1.3rem;">${mock.title}</h3>
              ${(mock.paper_reference || mock.time_minutes) ? `<p style="color: #64748b; font-size: 1rem; margin-bottom: 20px; flex-grow: 1;">
                ${mock.paper_reference ? `<strong>Paper Ref:</strong> ${mock.paper_reference}<br>` : ''}
                ${mock.time_minutes ? `<strong>Time:</strong> ${mock.time_minutes} minutes<br>` : ''}
                ${mock.total_marks ? `<strong>Marks:</strong> ${mock.total_marks} marks` : ''}
              </p>` : '<div style="flex-grow: 1;"></div>'}
              <a href="units/${unitData.id || window.currentUnitId}/${mock.id}.html" target="_blank" class="main-btn epz-btn" style="display: block; text-align: center; text-decoration: none; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 12px 20px; font-size: 1.1rem; border-radius: 8px; font-weight: 600; margin-bottom: 10px;">
                <i class="fa-solid fa-print"></i> Generate Printable PDF
              </a>
              ${(mock.has_mark_scheme || (mock.section_b && mock.section_b.questions && mock.section_b.questions.some(q => q.model_answer || (q.type === 'either_or' && (q.q5?.model_answer || q.q6?.model_answer)))) || (mock.questions && mock.questions.some(q => q.model_answer || (q.type === 'essay_choice' && q.options?.some(opt => opt.model_answer))))) ? `
              <a href="units/${unitData.id || window.currentUnitId}/${mock.id}_mark_scheme.html" target="_blank" class="main-btn epz-btn" style="display: block; text-align: center; text-decoration: none; background: linear-gradient(135deg, #002855, #003b7a); color: white; padding: 12px 20px; font-size: 1.1rem; border-radius: 8px; font-weight: 600;">
                <i class="fa-solid fa-chalkboard-user"></i> Teacher Mark Scheme
              </a>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    const wrapper = container.querySelector('.epz-wrapper');
    if (wrapper) {
        wrapper.insertAdjacentHTML('beforeend', mocksHtml);
    }
  }
}

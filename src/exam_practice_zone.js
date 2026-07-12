export function renderExamPracticeZone(container, unitData) {
  // 1. Flatten the exam_blocks into a master list of questions
  let examBank = [];
  if (unitData.exam_blocks) {
    unitData.exam_blocks.forEach(block => {
      block.questions.forEach(q => {
        examBank.push({
          ...q,
          blockTitle: block.title
        });
      });
    });
  }

  if (examBank.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px; background: #fff; border-radius: 12px; color: #64748b; font-size: 1.2rem;">
        <i class="fa-solid fa-file-circle-xmark fa-3x" style="margin-bottom:20px; color:#cbd5e1;"></i>
        <br>No exam questions found for this unit.
      </div>
    `;
    return;
  }

  // 2. Build the UI wrapper
  container.innerHTML = `
    <div style="max-width: 900px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-top: 6px solid #1e3a8a;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #1e3a8a; margin: 0;">
          <i class="fa-solid fa-graduation-cap"></i> Exam Practice Zone
        </h1>
        <button id="epz-back-btn" class="main-btn" style="background: #e2e8f0; color: #475569; padding: 8px 16px; font-size: 1rem;"><i class="fa-solid fa-arrow-left"></i> Back</button>
      </div>
      
      <div style="display: flex; gap: 20px; margin-bottom: 30px; align-items: flex-end; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #334155;">Filter by Question Type:</label>
          <select id="epz-type-filter" style="width: 100%; padding: 12px; border-radius: 8px; border: 2px solid #cbd5e1; font-size: 1.1rem; background: #f8fafc;">
            <option value="all">All Question Types</option>
            <option value="importance_8">8-Mark Importance</option>
            <option value="narrative_8">8-Mark Narrative Account</option>
            <option value="consequence_4">4-Mark Consequences</option>
          </select>
        </div>
        <button id="epz-generate-btn" class="main-btn" style="background: #2563eb; color: white; padding: 12px 24px; font-size: 1.1rem; flex-shrink: 0;">
          <i class="fa-solid fa-dice"></i> Generate Random Question
        </button>
      </div>

      <div id="epz-question-display" style="display: none; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 30px; position: relative;">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
          <div id="epz-q-meta" style="font-size: 0.9rem; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 1px;"></div>
          <div id="epz-timer-container" style="display: flex; align-items: center; gap: 10px; background: #1e293b; color: white; padding: 8px 16px; border-radius: 20px; font-family: monospace; font-size: 1.2rem; font-weight: bold;">
            <i class="fa-solid fa-stopwatch"></i> <span id="epz-timer-display">00:00</span>
            <button id="epz-timer-toggle" style="background: none; border: none; color: white; cursor: pointer; padding: 0 5px;"><i class="fa-solid fa-play"></i></button>
          </div>
        </div>

        <h2 id="epz-q-text" style="font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #0f172a; margin-top: 0; line-height: 1.4;"></h2>
        <div id="epz-q-stimulus" style="font-size: 1.1rem; color: #475569; margin-top: 15px; font-style: italic;"></div>

        <div style="margin-top: 30px; display: flex; gap: 10px;">
          <button id="epz-hint-btn" class="main-btn" style="display: none; background: #f59e0b; color: white; padding: 8px 16px; font-size: 1rem;"><i class="fa-solid fa-lightbulb"></i> Structure Strip Hint</button>
          <button id="epz-wagoll-btn" class="main-btn" style="display: none; background: #10b981; color: white; padding: 8px 16px; font-size: 1rem;"><i class="fa-solid fa-star"></i> Show WAGOLL (Grade 9 Model)</button>
        </div>

        <div id="epz-hint-panel" style="display: none; margin-top: 20px; padding: 20px; background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 0 8px 8px 0; font-size: 1.1rem; color: #92400e;"></div>
        <div id="epz-wagoll-panel" style="display: none; margin-top: 20px; padding: 25px; background: #ecfdf5; border-left: 4px solid #10b981; border-radius: 0 8px 8px 0; font-size: 1.1rem; color: #065f46; line-height: 1.6; white-space: pre-wrap;"></div>

      </div>
      
    </div>
  `;

  // 3. Logic State
  let currentQuestion = null;
  let timerInterval = null;
  let timeLeft = 0;
  let timerRunning = false;

  // 4. Elements
  const typeFilter = document.getElementById('epz-type-filter');
  const generateBtn = document.getElementById('epz-generate-btn');
  const backBtn = document.getElementById('epz-back-btn');
  const displayArea = document.getElementById('epz-question-display');
  
  const qMeta = document.getElementById('epz-q-meta');
  const qText = document.getElementById('epz-q-text');
  const qStimulus = document.getElementById('epz-q-stimulus');
  
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

  // Interactions
  backBtn.addEventListener('click', () => {
    stopTimer();
    import('./navigation.js').then(nav => nav.switchView('dashboard'));
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

  generateBtn.addEventListener('click', () => {
    const selectedType = typeFilter.value;
    let filteredBank = examBank;
    
    if (selectedType !== 'all') {
      filteredBank = examBank.filter(q => q.type === selectedType);
    }
    
    if (filteredBank.length === 0) {
      alert("No questions found for this filter.");
      return;
    }

    // Pick random
    const randIndex = Math.floor(Math.random() * filteredBank.length);
    currentQuestion = filteredBank[randIndex];
    
    // Reset UI
    stopTimer();
    displayArea.style.display = 'block';
    hintPanel.style.display = 'none';
    wagollPanel.style.display = 'none';
    
    // Populate Data
    let typeFriendly = "Exam Question";
    if (currentQuestion.type === "importance_8") typeFriendly = "Explain the Importance (8 Marks)";
    if (currentQuestion.type === "narrative_8") typeFriendly = "Analytical Narrative (8 Marks)";
    if (currentQuestion.type === "consequence_4") typeFriendly = "Consequence (4 Marks)";

    qMeta.innerHTML = `<i class="fa-solid fa-book-open"></i> ${currentQuestion.blockTitle} &bull; ${typeFriendly}`;
    qText.textContent = currentQuestion.text;
    
    // Stimulus points for narrative
    if (currentQuestion.hint) {
      const points = currentQuestion.hint.split('n').map(p => p.trim()).filter(p => p);
      qStimulus.innerHTML = `You may use the following in your answer:<ul style="margin-top: 5px; margin-bottom: 5px;">${points.map(p => `<li>${p}</li>`).join('')}</ul><em>You must also use information of your own.</em>`;
      
      // We will use the stimulus as the structural hint
      hintBtn.style.display = 'block';
      hintPanel.innerHTML = '<strong>Structure Strip Reminder:</strong><br>Paragraph 1: ' + (points[0] || 'Point 1') + '<br>Paragraph 2: ' + (points[1] || 'Point 2') + '<br>Paragraph 3: Your own historical knowledge!<br><em>Ensure you use linking phrases like "This led to..." or "Consequently..."</em>';
    } else {
      qStimulus.innerHTML = '';
      if (currentQuestion.type === "importance_8") {
        hintBtn.style.display = 'block';
        hintPanel.innerHTML = '<strong>Structure Strip Reminder (8 Marks):</strong><br>Paragraph 1: Identify the event and explain its FIRST impact on the situation (Point, Evidence, Explain).<br>Paragraph 2: Explain a SECOND impact or long-term consequence.';
      } else if (currentQuestion.type === "consequence_4") {
        hintBtn.style.display = 'block';
        hintPanel.innerHTML = '<strong>Structure Strip Reminder (4 Marks):</strong><br>Write ONE detailed paragraph. State the consequence clearly, then provide 2-3 sentences of specific historical evidence to support it.';
      } else {
        hintBtn.style.display = 'none';
      }
    }

    if (currentQuestion.wagoll) {
      wagollBtn.style.display = 'block';
      // Format markdown bold
      const formattedWagoll = currentQuestion.wagoll.replace(/**(.*?)**/g, '<strong>$1</strong>');
      wagollPanel.innerHTML = `<strong>Grade 9 Model Answer (WAGOLL):</strong><br><br>${formattedWagoll}`;
    } else {
      wagollBtn.style.display = 'none';
    }

    // Set Timer: 15 mins for 8 marks, 5 mins for 4 marks
    if (currentQuestion.marks === 8) {
      timeLeft = 15 * 60;
    } else {
      timeLeft = 5 * 60;
    }
    updateTimerDisplay();

    // Scroll to the question
    displayArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

}

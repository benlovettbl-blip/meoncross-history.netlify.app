export function renderRevisionZone(container, unitData) {
  // 1. Extract Questions
  let masterBank = [];
  let vocabBank = [];
  
  unitData.lessons.forEach(lesson => {
    if (lesson.vocab) {
      lesson.vocab.forEach(v => {
        vocabBank.push({
          term: v.term,
          definition: v.definition
        });
        masterBank.push({
          q: `What is the definition of "${v.term}"?`,
          a: v.definition,
          source: lesson.title
        });
        masterBank.push({
          q: `Which term matches this definition: "${v.definition}"?`,
          a: v.term,
          source: lesson.title
        });
      });
    }
    if (lesson.do_now && lesson.do_now.type === "questions") {
      lesson.do_now.items.forEach(item => {
        masterBank.push({
          q: item.question,
          a: item.answer,
          source: lesson.title
        });
      });
    }
    if (lesson.knowledge_check) {
      lesson.knowledge_check.forEach(item => {
        masterBank.push({
          q: item.question,
          a: item.answer,
          source: lesson.title
        });
      });
    }
  });

  masterBank = masterBank.filter((v, i, a) => a.findIndex(t => (t.q === v.q)) === i);
  vocabBank = vocabBank.filter((v, i, a) => a.findIndex(t => (t.term === v.term)) === i);

  // 2. Build UI Wrapper
  container.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 25px 35px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 4px solid #1e3a8a;">
      <h1 style="font-family: 'Playfair Display', serif; font-size: 3rem; color: #1e3a8a; margin-top: 0; margin-bottom: 10px;"><i class="fa-solid fa-gamepad"></i> Revision Zone</h1>
      
      <!-- MODE SELECTION -->
      <div id="mode-select-container">
        <p style="font-size: 1.2rem; color: #475569; margin-bottom: 30px;">Select a game mode to test your knowledge!</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.borderColor='#1e3a8a'; this.style.background='#f8fafc';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" id="btn-mode-flashcard">
            <i class="fa-solid fa-bolt" style="font-size: 3rem; color: #f59e0b; margin-bottom: 15px;"></i>
            <h3 style="margin:0 0 10px 0; color: #1e3a8a; font-size: 1.5rem;">Flashcard Frenzy</h3>
            <p style="color: #64748b; margin:0;">10 random multiple-choice questions. ${masterBank.length} questions available.</p>
          </div>
          <div style="border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.borderColor='#1e3a8a'; this.style.background='#f8fafc';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" id="btn-mode-vocab">
            <i class="fa-solid fa-link" style="font-size: 3rem; color: #10b981; margin-bottom: 15px;"></i>
            <h3 style="margin:0 0 10px 0; color: #1e3a8a; font-size: 1.5rem;">Vocab Match-Up</h3>
            <p style="color: #64748b; margin:0;">Drag and drop to match 5 key terms to their definitions.</p>
          </div>
        </div>
      </div>

      <!-- FLASHCARD FRENZY GAME -->
      <div id="flashcard-game-container" style="display: none;">
        <div id="game-dashboard" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; font-size: 1.5rem; font-weight: bold;">
          <div style="color: #1e3a8a;"><i class="fa-solid fa-star"></i> Score: <span id="game-score">0</span></div>
          <div style="color: #047857;"><i class="fa-solid fa-list-ol"></i> Question: <span id="game-qnum">1</span>/10</div>
        </div>
        <div id="game-card" style="background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; padding: 25px 20px; margin-bottom: 20px; font-size: 1.4rem; color: #0f172a; font-weight: 600; min-height: 100px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 4px 6px rgba(0,0,0,0.05); transition: background 0.3s;"></div>
        <div id="game-options" class="options-grid" style="display: grid; gap: 15px;"></div>
        <div id="game-feedback" style="margin-top: 20px; font-size: 1.3rem; font-weight: bold; min-height: 2em;"></div>
      </div>

      <!-- VOCAB MATCH UP GAME -->
      <div id="vocab-game-container" style="display: none; text-align: left;">
         <p style="text-align:center; margin-bottom: 20px; color: #475569;">Drag the Terms on the left to the correct Definitions on the right.</p>
         <div id="vocab-match-grid" style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 20px; margin-bottom: 20px;">
           <div id="vocab-terms-column" style="display:flex; flex-direction: column; gap:15px; border-right: 2px dashed #cbd5e1; padding-right: 20px;"></div>
           <div id="vocab-defs-column" style="display:flex; flex-direction: column; gap:15px;"></div>
         </div>
         <div style="text-align: center;">
           <button id="btn-check-vocab" class="btn btn-primary" style="font-size: 1.2rem; padding: 12px 30px; border-radius: 30px;">Check Answers</button>
           <div id="vocab-feedback" style="margin-top: 15px; font-weight: bold; font-size: 1.2rem; min-height: 2em; text-align: center;"></div>
         </div>
      </div>
      
      <!-- END SCREEN -->
      <div id="game-end-container" style="display: none;">
        <h2 style="font-size: 2.5rem; color: #1e3a8a; margin-bottom: 10px;">Game Complete!</h2>
        <div id="final-score-display" style="font-size: 2rem; margin-bottom: 20px;">Score: <span id="final-score" style="color: #dc2626;"></span></div>
        <div id="final-rank" style="font-size: 1.8rem; font-weight: bold; margin-bottom: 30px; padding: 15px; background: #fef08a; border-radius: 8px; color: #854d0e;"></div>
        <button id="btn-restart-game" class="btn btn-primary" style="font-size: 1.2rem; padding: 12px 30px; border-radius: 30px; margin-right: 10px;"><i class="fa-solid fa-rotate-right"></i> Play Again</button>
        <button id="btn-back-menu" class="btn btn-secondary" style="font-size: 1.2rem; padding: 12px 30px; border-radius: 30px;"><i class="fa-solid fa-list"></i> Select Mode</button>
      </div>
    </div>
  `;

  // UI Elements
  const modeSelect = container.querySelector('#mode-select-container');
  const endContainer = container.querySelector('#game-end-container');
  
  // Flashcard Elements
  const flashcardGame = container.querySelector('#flashcard-game-container');
  const dashboard = container.querySelector('#game-dashboard');
  const card = container.querySelector('#game-card');
  const optionsGrid = container.querySelector('#game-options');
  const feedback = container.querySelector('#game-feedback');
  const scoreEl = container.querySelector('#game-score');
  const qnumEl = container.querySelector('#game-qnum');

  // Vocab Elements
  const vocabGame = container.querySelector('#vocab-game-container');
  const vocabTermsCol = container.querySelector('#vocab-terms-column');
  const vocabDefsCol = container.querySelector('#vocab-defs-column');
  const vocabFeedback = container.querySelector('#vocab-feedback');
  const btnCheckVocab = container.querySelector('#btn-check-vocab');

  let activeMode = null;
  let currentQuestions = [];
  let currentQIndex = 0;
  let score = 0;
  let canAnswer = false;
  let vocabMatchPairs = [];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // GLOBAL EVENT LISTENERS
  container.querySelector('#btn-mode-flashcard').addEventListener('click', () => {
    activeMode = 'flashcard';
    startFlashcardFrenzy();
  });
  
  container.querySelector('#btn-mode-vocab').addEventListener('click', () => {
    activeMode = 'vocab';
    startVocabMatchUp();
  });

  container.querySelector('#btn-restart-game').addEventListener('click', () => {
    if (activeMode === 'flashcard') startFlashcardFrenzy();
    else if (activeMode === 'vocab') startVocabMatchUp();
  });

  container.querySelector('#btn-back-menu').addEventListener('click', () => {
    flashcardGame.style.display = 'none';
    vocabGame.style.display = 'none';
    endContainer.style.display = 'none';
    modeSelect.style.display = 'block';
  });

  // --- FLASHCARD FRENZY LOGIC ---
  function startFlashcardFrenzy() {
    modeSelect.style.display = 'none';
    endContainer.style.display = 'none';
    flashcardGame.style.display = 'block';
    
    score = 0;
    currentQIndex = 0;
    scoreEl.innerText = score;
    feedback.innerText = '';
    
    let shuffledBank = shuffleArray([...masterBank]);
    currentQuestions = shuffledBank.slice(0, 10);
    
    loadQuestion();
  }

  function loadQuestion() {
    canAnswer = true;
    feedback.innerText = '';
    card.style.background = '#f8fafc';
    qnumEl.innerText = currentQIndex + 1;
    
    const currentQ = currentQuestions[currentQIndex];
    card.innerText = currentQ.q;
    
    let allAnswers = masterBank.map(m => m.a).filter(a => a !== currentQ.a);
    let distractors = shuffleArray(allAnswers).slice(0, 3);
    
    let options = [currentQ.a, ...distractors];
    options = shuffleArray(options);
    
    optionsGrid.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-secondary';
      btn.style.padding = '15px';
      btn.style.fontSize = '1rem';
      btn.style.lineHeight = '1.4';
      btn.style.borderRadius = '8px';
      btn.style.height = '100%';
      btn.style.whiteSpace = 'normal';
      btn.innerText = opt;
      
      btn.onclick = () => handleAnswer(opt, currentQ.a, btn);
      optionsGrid.appendChild(btn);
    });
  }

  function handleAnswer(selected, correct, btnNode) {
    if (!canAnswer) return;
    canAnswer = false;
    const buttons = optionsGrid.querySelectorAll('button');
    if (selected === correct) {
      score += 100;
      scoreEl.innerText = score;
      card.style.background = '#dcfce7'; 
      btnNode.style.background = '#16a34a';
      btnNode.style.color = 'white';
      feedback.style.color = '#16a34a';
      feedback.innerText = "Correct! +100 Points";
    } else {
      card.style.background = '#fee2e2';
      btnNode.style.background = '#dc2626';
      btnNode.style.color = 'white';
      feedback.style.color = '#dc2626';
      feedback.innerText = "Incorrect!";
      buttons.forEach(b => {
        if (b.innerText === correct) {
          b.style.background = '#16a34a';
          b.style.color = 'white';
          b.style.border = '3px solid #14532d';
        }
      });
    }
    setTimeout(() => {
      currentQIndex++;
      if (currentQIndex < 10) loadQuestion();
      else endGameFlashcard();
    }, 2000);
  }

  function endGameFlashcard() {
    flashcardGame.style.display = 'none';
    endContainer.style.display = 'block';
    
    container.querySelector('#final-score-display').innerHTML = `Final Score: <span id="final-score" style="color: #dc2626;">${score}</span>/1000`;
    
    let rank = "";
    if (score === 1000) rank = "🏆 History Master!";
    else if (score >= 800) rank = "🥇 First Class Honors!";
    else if (score >= 500) rank = "🥈 Solid Effort!";
    else rank = "📚 Needs More Revision!";
    container.querySelector('#final-rank').innerText = rank;
  }

  // --- VOCAB MATCH-UP LOGIC ---
  function startVocabMatchUp() {
    modeSelect.style.display = 'none';
    endContainer.style.display = 'none';
    vocabGame.style.display = 'block';
    vocabFeedback.innerText = '';
    
    let shuffledVocab = shuffleArray([...vocabBank]).slice(0, 5);
    let terms = shuffleArray([...shuffledVocab]);
    let defs = shuffleArray([...shuffledVocab]);

    vocabTermsCol.innerHTML = '';
    vocabDefsCol.innerHTML = '';
    vocabMatchPairs = [];

    // Make functions globally available for inline html events
    window.dragVocab = function(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    };
    window.allowDropVocab = function(ev) {
      ev.preventDefault();
    };
    window.dropVocab = function(ev) {
      ev.preventDefault();
      const data = ev.dataTransfer.getData("text");
      const draggedEl = document.getElementById(data);
      let target = ev.target;
      while (target && !target.classList.contains('vocab-dropzone')) {
        target = target.parentElement;
      }
      if (target && draggedEl) {
        // If there's already an item here, swap it back to bank? For simplicity, just append.
        if (target.children.length > 0) {
            vocabTermsCol.appendChild(target.children[0]);
        }
        target.appendChild(draggedEl);
      }
    };

    // Render term bank at bottom or side
    terms.forEach((v, i) => {
      vocabTermsCol.innerHTML += `<div id="vocab-term-${i}" data-term="${v.term.replace(/"/g, '&quot;')}" class="vocab-term-card" draggable="true" ondragstart="window.dragVocab(event)" style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 15px; font-weight: bold; cursor: grab; text-align: center;">${v.term}</div>`;
    });

    defs.forEach((v, i) => {
      vocabDefsCol.innerHTML += `
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; display: flex; align-items: stretch; min-height: 60px;">
          <div class="vocab-dropzone" data-def="${v.term.replace(/"/g, '&quot;')}" ondragover="window.allowDropVocab(event)" ondrop="window.dropVocab(event)" style="flex: 0 0 150px; border-right: 2px dashed #94a3b8; background: white; border-top-left-radius: 8px; border-bottom-left-radius: 8px; padding: 10px; display:flex; align-items:center; justify-content:center;"></div>
          <div style="padding: 15px; flex: 1; display:flex; align-items:center;">${v.definition}</div>
        </div>
      `;
    });
  }

  btnCheckVocab.onclick = () => {
    let correct = 0;
    const dropzones = container.querySelectorAll('.vocab-dropzone');
    let allFilled = true;

    dropzones.forEach(dz => {
      dz.style.background = 'white';
      if (dz.children.length === 0) {
        allFilled = false;
        return;
      }
      const termEl = dz.children[0];
      if (termEl.getAttribute('data-term') === dz.getAttribute('data-def')) {
        correct++;
        dz.style.background = '#dcfce7'; // green
        termEl.style.borderColor = '#16a34a';
      } else {
        dz.style.background = '#fee2e2'; // red
        termEl.style.borderColor = '#dc2626';
      }
    });

    if (!allFilled) {
      vocabFeedback.style.color = '#d97706';
      vocabFeedback.innerText = "Please match all terms before checking!";
      return;
    }

    if (correct === 5) {
      vocabFeedback.style.color = '#16a34a';
      vocabFeedback.innerText = "Perfect! 5/5 Correct.";
      setTimeout(() => endGameVocab(5), 2000);
    } else {
      vocabFeedback.style.color = '#dc2626';
      vocabFeedback.innerText = `You got ${correct}/5 correct. Check the red boxes and try again!`;
    }
  };

  function endGameVocab(score) {
    vocabGame.style.display = 'none';
    endContainer.style.display = 'block';
    
    container.querySelector('#final-score-display').innerHTML = `Final Score: <span id="final-score" style="color: #16a34a;">${score}/5</span>`;
    container.querySelector('#final-rank').innerText = "🏆 Vocab Master!";
  }
}

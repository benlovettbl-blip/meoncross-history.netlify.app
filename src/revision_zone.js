export function renderRevisionZone(container, unitData) {
  // 1. Extract all questions from data.js
  let masterBank = [];
  
  unitData.lessons.forEach(lesson => {
    if (lesson.vocab) {
      lesson.vocab.forEach(v => {
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

  // Remove duplicates just in case
  masterBank = masterBank.filter((v, i, a) => a.findIndex(t => (t.q === v.q)) === i);

  // 2. Build the UI wrapper
  container.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 25px 35px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 4px solid #1e3a8a;">
      <h1 style="font-family: 'Playfair Display', serif; font-size: 3rem; color: #1e3a8a; margin-top: 0; margin-bottom: 10px;"><i class="fa-solid fa-gamepad"></i> Revision Zone</h1>
      <p style="font-size: 1.2rem; color: #475569; margin-bottom: 20px;">Test your knowledge! You will face 10 random questions from across the entire unit. Can you achieve the rank of History Master?</p>
      
      <div id="game-dashboard" style="display: none; justify-content: space-between; align-items: center; margin-bottom: 15px; font-size: 1.5rem; font-weight: bold;">
        <div style="color: #1e3a8a;"><i class="fa-solid fa-star"></i> Score: <span id="game-score">0</span></div>
        <div style="color: #047857;"><i class="fa-solid fa-list-ol"></i> Question: <span id="game-qnum">1</span>/10</div>
      </div>

      <div id="game-card" style="display: none; background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; padding: 25px 20px; margin-bottom: 20px; font-size: 1.4rem; color: #0f172a; font-weight: 600; min-height: 100px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 4px 6px rgba(0,0,0,0.05); transition: background 0.3s;">
        <!-- Question goes here -->
      </div>

      <div id="game-options" class="options-grid" style="display: none; gap: 15px;">
        <!-- Options go here -->
      </div>
      
      <div id="game-feedback" style="margin-top: 20px; font-size: 1.3rem; font-weight: bold; min-height: 2em;"></div>

      <div id="game-start-container">
        <button id="btn-start-game" class="btn btn-primary" style="font-size: 1.5rem; padding: 15px 40px; border-radius: 50px; background: #dc2626; border-color: #dc2626;"><i class="fa-solid fa-play"></i> Start Flashcard Frenzy!</button>
        <div style="margin-top: 20px; font-size: 0.9rem; color: #94a3b8;">Question Bank Size: ${masterBank.length} questions</div>
      </div>
      
      <div id="game-end-container" style="display: none;">
        <h2 style="font-size: 2.5rem; color: #1e3a8a; margin-bottom: 10px;">Quiz Complete!</h2>
        <div style="font-size: 2rem; margin-bottom: 20px;">Final Score: <span id="final-score" style="color: #dc2626;"></span>/1000</div>
        <div id="final-rank" style="font-size: 1.8rem; font-weight: bold; margin-bottom: 30px; padding: 15px; background: #fef08a; border-radius: 8px; color: #854d0e;"></div>
        <button id="btn-restart-game" class="btn btn-primary" style="font-size: 1.2rem; padding: 12px 30px; border-radius: 30px;"><i class="fa-solid fa-rotate-right"></i> Play Again</button>
      </div>
    </div>
  `;

  // 3. Game Logic
  let currentQuestions = [];
  let currentQIndex = 0;
  let score = 0;
  let canAnswer = false;

  const btnStart = container.querySelector('#btn-start-game');
  const btnRestart = container.querySelector('#btn-restart-game');
  
  const dashboard = container.querySelector('#game-dashboard');
  const card = container.querySelector('#game-card');
  const optionsGrid = container.querySelector('#game-options');
  const feedback = container.querySelector('#game-feedback');
  const startContainer = container.querySelector('#game-start-container');
  const endContainer = container.querySelector('#game-end-container');
  
  const scoreEl = container.querySelector('#game-score');
  const qnumEl = container.querySelector('#game-qnum');

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function startGame() {
    startContainer.style.display = 'none';
    endContainer.style.display = 'none';
    dashboard.style.display = 'flex';
    card.style.display = 'flex';
    optionsGrid.style.display = 'grid';
    
    score = 0;
    currentQIndex = 0;
    scoreEl.innerText = score;
    feedback.innerText = '';
    
    // Pick 10 random questions
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
    
    // Generate 3 distractors
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
      // Correct
      score += 100;
      scoreEl.innerText = score;
      card.style.background = '#dcfce7'; // green
      btnNode.style.background = '#16a34a';
      btnNode.style.color = 'white';
      feedback.style.color = '#16a34a';
      feedback.innerText = "Correct! +100 Points";
    } else {
      // Incorrect
      card.style.background = '#fee2e2'; // red
      btnNode.style.background = '#dc2626';
      btnNode.style.color = 'white';
      feedback.style.color = '#dc2626';
      feedback.innerText = "Incorrect!";
      
      // Highlight correct answer
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
      if (currentQIndex < 10) {
        loadQuestion();
      } else {
        endGame();
      }
    }, 2000);
  }

  function endGame() {
    dashboard.style.display = 'none';
    card.style.display = 'none';
    optionsGrid.style.display = 'none';
    feedback.innerText = '';
    endContainer.style.display = 'block';
    
    container.querySelector('#final-score').innerText = score;
    
    let rank = "";
    if (score === 1000) rank = "🏆 History Master!";
    else if (score >= 800) rank = "🥇 First Class Honors!";
    else if (score >= 500) rank = "🥈 Solid Effort!";
    else rank = "📚 Needs More Revision!";
    
    container.querySelector('#final-rank').innerText = rank;
  }

  btnStart.addEventListener('click', startGame);
  btnRestart.addEventListener('click', startGame);
}

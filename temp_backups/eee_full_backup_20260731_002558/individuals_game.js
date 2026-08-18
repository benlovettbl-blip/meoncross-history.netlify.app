import { activeFigures, KEY_FIGURES_BIO } from './views.js?v=18';
import { AudioEngine } from './audio.js?v=18';
import { Confetti } from './confetti.js?v=18';
import { getAssetUrl } from './app.js';

let gameState = {
  mode: null,       // 'riddles', 'recall', 'cluedo'
  score: 0,
  streak: 0,
  questionIndex: 0,
  totalQuestions: 10,
  currentQuestion: null,
  riddleCluesRevealed: 1,
  answered: false,

  // Cluedo state variables
  cluedoCases: [
    {
      id: 'littlerock',
      title: "Case #1957-LR: The Little Rock School Crisis",
      brief: "A constitutional crisis has erupted in the American South. The state governor is defying federal court orders to desegregate, and angry mobs are blockading the school. Deduce the Architect, Decisive Tactic, and Location that broke the deadlock and enforced federal integration.",
      suspects: [
        { name: "Orval Faubus", description: "Governor of Arkansas who opposes school integration." },
        { name: "Dwight D. Eisenhower", description: "34th President of the United States." },
        { name: "Elizabeth Eckford", description: "One of the Little Rock Nine Black students." },
        { name: "Earl Warren", description: "Chief Justice of the US Supreme Court." }
      ],
      tactics: [
        { desc: "Ordering the State National Guard to block doors", id: "guard" },
        { desc: "Deploying the 101st Airborne Division to escort students", id: "airborne" },
        { desc: "Organizing a peaceful, dignified walk through a screaming mob", id: "walk" },
        { desc: "Ruling that segregated public education is unconstitutional", id: "ruling" }
      ],
      locations: [
        { name: "Central High School (Little Rock, Arkansas)", id: "school" },
        { name: "The White House (Washington D.C.)", id: "whitehouse" },
        { name: "The Supreme Court (Washington D.C.)", id: "court" }
      ],
      correct: {
        suspect: "Dwight D. Eisenhower",
        tactic: "airborne",
        location: "school"
      },
      evidence: [
        { label: "Presidential Address", text: "Eisenhower warned on TV: 'Mob rule cannot be allowed to override the decisions of our courts. I have sent federal troops.'" },
        { label: "Army Dispatch", text: "Command logs: 'Paratroopers of the 101st Airborne have secured the perimeter of Central High. Escorting 9 Negro students in.'" },
        { label: "Student Diary", text: "Elizabeth Eckford wrote: 'We entered Central High surrounded by soldiers with rifles. For the first time, I felt safe.'" }
      ],
      resolution: "Correct! In September 1957, President Eisenhower federalized the Arkansas National Guard and deployed the elite 101st Airborne Division to Central High School in Little Rock. This historic intervention showed that the federal government would use military force to uphold desegregation, shattering Southern state attempts to nullify the Brown v. Board ruling."
    },
    {
      id: 'diemcoup',
      title: "Case #1963-DM: The Buddhist Crisis & Overthrow",
      brief: "South Vietnam is in chaos. A series of self-immolations by Buddhist monks has shocked public opinion, and the military is planning a coup. Deduce the Architect, Decisive Tactic, and Location that triggered the collapse of the Diem regime.",
      suspects: [
        { name: "Ngo Dinh Diem", description: "Catholic President of South Vietnam." },
        { name: "Thich Quang Duc", description: "Elderly Mahayana Buddhist monk." },
        { name: "Madame Nhu", description: "Diem's sister-in-law, political advisor." },
        { name: "John F. Kennedy", description: "35th President of the United States." }
      ],
      tactics: [
        { desc: "Performing a public self-immolation in protest", id: "immolation" },
        { desc: "Increasing military advisors to 16,000", id: "advisors" },
        { desc: "Passing the Strategic Hamlet Program", id: "hamlets" },
        { desc: "Ordering police dog attacks on civilians", id: "dogs" }
      ],
      locations: [
        { name: "Saigon Intersection (South Vietnam)", id: "saigon" },
        { name: "The Presidential Palace (Saigon)", id: "palace" },
        { name: "The Pentagon (Washington D.C.)", id: "pentagon" }
      ],
      correct: {
        suspect: "Thich Quang Duc",
        tactic: "immolation",
        location: "saigon"
      },
      evidence: [
        { label: "Journalist Dispatch", text: "Malcolm Browne's telegram: 'A monk has burned himself to death in the middle of a Saigon street to protest Diem's discrimination. Public is horrified.'" },
        { label: "US State Dept Cable", text: "Memo: 'The photograph of the burning monk has shocked public opinion globally, making support for Diem politically toxic.'" },
        { label: "Palace Remarks", text: "Madame Nhu's quote: 'Let them barbecue. I will provide the gasoline.' This alienated US officials further." }
      ],
      resolution: "Correct! Thich Quang Duc's self-immolation at a Saigon intersection in June 1963 became a global symbol of Diem's religious persecution. The international outcry forced President Kennedy to realize Diem could not win the 'hearts and minds' of his people, leading the US to signal approval for the South Vietnamese military coup that overthrew Diem in November 1963."
    },
    {
      id: 'tonkin',
      title: "Case #1964-GT: The Gulf of Tonkin Escalation",
      brief: "A reported clash in the waters off North Vietnam has prompted the US President to request military authority from Congress. Deduce the Architect, Decisive Tactic, and Location that authorized the US to wage a full-scale combat war in Vietnam.",
      suspects: [
        { name: "Lyndon B. Johnson", description: "36th President of the United States." },
        { name: "General William Westmoreland", description: "Commander of US forces in Vietnam." },
        { name: "Richard Nixon", description: "37th President of the United States." },
        { name: "Ho Chi Minh", description: "Communist leader of North Vietnam." }
      ],
      tactics: [
        { desc: "Launching Operation Rolling Thunder bombing raids", id: "bombing" },
        { desc: "Passing a congressional resolution giving the President war powers", id: "resolution" },
        { desc: "Falsifying torpedo counts during naval skirmishes", id: "falsify" },
        { desc: "Appealing to the 'Silent Majority' for support", id: "silent" }
      ],
      locations: [
        { name: "The US Capitol (Washington D.C.)", id: "capitol" },
        { name: "The Gulf of Tonkin (Off Vietnam)", id: "gulf" },
        { name: "The White House (Washington D.C.)", id: "whitehouse" }
      ],
      correct: {
        suspect: "Lyndon B. Johnson",
        tactic: "resolution",
        location: "capitol"
      },
      evidence: [
        { label: "Naval Skirmish Report", text: "USS Maddox logs: 'Engaged North Vietnamese patrol boats in the Gulf. Follow-up reports of attacks are highly confused.'" },
        { label: "Presidential Bill Request", text: "LBJ announced: 'I need Congressional authorization to take all necessary measures to prevent further aggression.'" },
        { label: "Senate Vote Record", text: "The Senate voted 88-2 to approve the Gulf of Tonkin Resolution, giving the executive branch absolute war powers." }
      ],
      resolution: "Correct! President Lyndon B. Johnson used the Gulf of Tonkin Incident in August 1964 to secure the Gulf of Tonkin Resolution from Congress, voted on at the US Capitol. This resolution gave the President a 'blank check' to wage war in Vietnam without a formal declaration, leading to the rapid deployment of US combat troops in 1965."
    }
  ],
  currentCluedoCaseIndex: 0,
  cluedoDeductions: 0,
  cluedoAccusationHistory: []
};

// Main entry point called when the trivia tab is selected in Revision Games Hub
export function initIndividualsGame() {
  const container = document.getElementById('individuals-game-play-area');
  if (!container) return;

  renderLobby(container);
}

function renderLobby(container) {
  // Load high scores from localStorage
  const highRiddles = localStorage.getItem('hs_trivia_riddles') || 0;
  const highRecall = localStorage.getItem('hs_trivia_recall') || 0;
  const highCluedo = localStorage.getItem('hs_trivia_cluedo') || 0;

  container.innerHTML = `
    <div style="text-align: center; max-width: 700px; margin: 0 auto; padding: 20px 0;">
      <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--text-main); margin-bottom: 8px;">
        ­ƒòÁ´©ÅÔÇìÔÖé´©Å Historical Witness Trivia
      </h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 30px;">
        Test your knowledge of the 44 key individuals from the GCSE syllabus. Select a mode below to begin:
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <!-- Mode 1: Who Am I? -->
        <div class="lobby-card" onclick="window.startTriviaMode('riddles')" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; padding: 24px; cursor: pointer; transition: all 0.2s; text-align: left; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">­ƒöì</div>
          <h4 style="margin: 0 0 6px 0; font-family: var(--font-heading); color: var(--text-main); font-size: 1.1rem;">"Who Am I?" Riddle Solver</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; flex-grow: 1; margin: 0 0 16px 0;">
            Guess the historical witness by unlocking clues sequentially. The fewer clues you reveal, the more points you earn!
          </p>
          <div style="font-size: 0.72rem; color: var(--accent); font-weight: 700; text-transform: uppercase;">
            ­ƒÅå High Score: ${highRiddles} pts
          </div>
        </div>

        <!-- Mode 2: Quick Recall -->
        <div class="lobby-card" onclick="window.startTriviaMode('recall')" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; padding: 24px; cursor: pointer; transition: all 0.2s; text-align: left; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">­ƒÄ┤</div>
          <h4 style="margin: 0 0 6px 0; font-family: var(--font-heading); color: var(--text-main); font-size: 1.1rem;">Quick Recall Challenge</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; flex-grow: 1; margin: 0 0 16px 0;">
            Rapid-fire multiple choice based on the 44 core syllabus recall questions. Direct syllabus testing.
          </p>
          <div style="font-size: 0.72rem; color: var(--accent); font-weight: 700; text-transform: uppercase;">
            ­ƒÅå High Score: ${highRecall}/10
          </div>
        </div>

        <!-- Mode 3: Historical Cluedo -->
        <div class="lobby-card" onclick="window.startTriviaMode('cluedo')" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; padding: 24px; cursor: pointer; transition: all 0.2s; text-align: left; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">­ƒòÁ´©ÅÔÇìÔÖé´©Å</div>
          <h4 style="margin: 0 0 6px 0; font-family: var(--font-heading); color: var(--text-main); font-size: 1.1rem;">Historical Cluedo (Deduction)</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; flex-grow: 1; margin: 0 0 16px 0;">
            Analyze evidence briefs and deduce the correct combination of Architect, Tactic, and Location behind major turning points.
          </p>
          <div style="font-size: 0.72rem; color: var(--accent); font-weight: 700; text-transform: uppercase;">
            ­ƒÅå Completed: ${highCluedo}/${gameState.cluedoCases.length} Cases
          </div>
        </div>
      </div>

      <p style="font-size: 0.8rem; color: var(--text-muted);">
        ­ƒÆí Interactive recall games support retrieval practice, preparing you for 4, 12, and 16-mark essay significance questions.
      </p>
    </div>
  `;

  // Bind lobby hover effects
  const cards = container.querySelectorAll('.lobby-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-3px)';
      card.style.borderColor = 'var(--accent)';
      card.style.boxShadow = 'var(--accent-glow)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.borderColor = 'var(--border-glass)';
      card.style.boxShadow = 'none';
    });
  });
}

// Bind to window to allow global onclick handlers
window.startTriviaMode = function(mode) {
  AudioEngine.play('click');
  gameState.mode = mode;
  gameState.score = 0;
  gameState.streak = 0;
  gameState.questionIndex = 0;
  gameState.answered = false;

  if (mode === 'cluedo') {
    gameState.currentCluedoCaseIndex = 0;
    startCluedoCase();
  } else {
    nextQuestion();
  }
};

function nextQuestion() {
  gameState.questionIndex++;
  gameState.answered = false;

  if (gameState.questionIndex > gameState.totalQuestions) {
    endGame();
    return;
  }

  // Pick a random figure
  const candidates = activeFigures;
  const randomIdx = Math.floor(Math.random() * candidates.length);
  const target = candidates[randomIdx];
  const figureBio = KEY_FIGURES_BIO[target.key];

  let correctOption, allOptions;

  if (gameState.mode === 'recall') {
    correctOption = target.answer;

    // Pick 3 distractors
    const distractors = [];
    const otherFigures = activeFigures.filter(f => f.key !== target.key);
    while (distractors.length < 3 && otherFigures.length > 0) {
      const dIdx = Math.floor(Math.random() * otherFigures.length);
      const candidateDist = otherFigures.splice(dIdx, 1)[0];
      if (candidateDist.answer && !distractors.includes(candidateDist.answer) && candidateDist.answer !== target.answer) {
        distractors.push(candidateDist.answer);
      }
    }

    allOptions = [correctOption, ...distractors].sort(() => Math.random() - 0.5);

    gameState.currentQuestion = {
      target: target,
      bio: figureBio,
      options: allOptions,
      correct: correctOption,
      displayCorrect: correctOption
    };
  } else {
    correctOption = figureBio;

    // Pick 3 distractors
    const distractors = [];
    const otherFigures = activeFigures.filter(f => f.key !== target.key);
    while (distractors.length < 3 && otherFigures.length > 0) {
      const dIdx = Math.floor(Math.random() * otherFigures.length);
      const candidateDist = otherFigures.splice(dIdx, 1)[0];
      const distBio = KEY_FIGURES_BIO[candidateDist.key];
      if (distBio && !distractors.some(d => d.name === distBio.name)) {
        distractors.push(distBio);
      }
    }

    allOptions = [correctOption, ...distractors].sort(() => Math.random() - 0.5);

    gameState.currentQuestion = {
      target: target,
      bio: figureBio,
      options: allOptions,
      correct: correctOption,
      displayCorrect: correctOption.name
    };
  }

  gameState.riddleCluesRevealed = 1;

  renderQuestion();
}

function renderQuestion() {
  const container = document.getElementById('individuals-game-play-area');
  if (!container) return;

  let questionCardHtml = '';
  let progressText = `Question ${gameState.questionIndex} of ${gameState.totalQuestions}`;

  if (gameState.mode === 'riddles') {
    progressText = `Riddle ${gameState.questionIndex} of ${gameState.totalQuestions}`;
    const clues = [
      `<strong>Role & Significance:</strong> ${gameState.currentQuestion.bio.role}`,
      `<strong>Historical Context:</strong> ${gameState.currentQuestion.bio.bio}`,
      `<strong>Signature Statement/Quote:</strong> "${gameState.currentQuestion.target.quote || 'GCSE Key Individual'}"`
    ];

    let cluesHtml = '';
    for (let i = 0; i < 3; i++) {
      if (gameState.riddleCluesRevealed > i) {
        cluesHtml += `
          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 6px; padding: 12px 16px; font-size: 0.9rem; line-height: 1.4; color: var(--text-main); margin-bottom: 12px; animation: fadeIn 0.3s ease-out; text-align: left;">
            <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--accent); font-weight: 700; display: block; margin-bottom: 4px;">Clue ${i + 1}</span>
            ${clues[i]}
          </div>
        `;
      } else {
        cluesHtml += `
          <div style="background: rgba(0, 0, 0, 0.2); border: 1px dashed var(--border-glass); border-radius: 6px; padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem; margin-bottom: 12px; user-select: none;">
            <i class="fa-solid fa-lock" style="margin-right: 6px;"></i> Clue ${i + 1} is locked
          </div>
        `;
      }
    }

    const nextClueText = gameState.riddleCluesRevealed === 1 ? 'Unlock Clue 2 (Value: 5 pts)' : 'Unlock Clue 3 (Value: 2 pts)';

    questionCardHtml = `
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Figure Clues</span>
          ${gameState.riddleCluesRevealed < 3 && !gameState.answered ? `
            <button onclick="window.revealRiddleClue()" style="background: rgba(var(--primary-rgb), 0.15); border: 1px solid var(--primary); color: var(--primary); padding: 6px 12px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 6px; outline: none;">
              <i class="fa-solid fa-unlock-keyhole"></i> ${nextClueText}
            </button>
          ` : ''}
        </div>
        ${cluesHtml}
      </div>
    `;
  } else if (gameState.mode === 'recall') {
    questionCardHtml = `
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; padding: 24px; margin-bottom: 24px; box-shadow: var(--shadow-sm); text-align: left;">
        <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--accent); font-weight: 700; letter-spacing: 0.5px; margin-bottom: 8px;">Recall Question</div>
        <p style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin: 0; line-height: 1.45;">
          ${gameState.currentQuestion.target.question}
        </p>
      </div>
    `;
  }

  // Build options grid
  let optionsHtml = '';
  gameState.currentQuestion.options.forEach((opt, idx) => {
    const label = String.fromCharCode(65 + idx);
    const displayName = (gameState.mode === 'recall') ? opt : opt.name;
    const clickParam = displayName.replace(/'/g, "\\'");
    optionsHtml += `
      <button class="trivia-option-btn" onclick="window.submitTriviaAnswer('${clickParam}', this)" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 6px; padding: 16px; text-align: left; color: var(--text-main); font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 12px; width: 100%; box-sizing: border-box; outline: none;">
        <span style="width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: var(--text-muted); font-weight: 700; flex-shrink: 0;">${label}</span>
        <span class="option-text" style="flex-grow: 1;">${displayName}</span>
      </button>
    `;
  });

  container.innerHTML = `
    <div style="max-width: 650px; margin: 0 auto; animation: fadeIn 0.2s ease-out;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
        <button onclick="window.exitIndividualsGame()" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; outline: none; padding: 4px 0;">
          <i class="fa-solid fa-arrow-left"></i> Exit Game
        </button>
        <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">${progressText}</span>
        <span style="font-size: 0.85rem; font-weight: 600; color: var(--accent);">Score: ${gameState.score} ${gameState.mode === 'riddles' ? 'pts' : ''}</span>
      </div>

      ${questionCardHtml}

      <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 24px;" class="options-grid">
        ${optionsHtml}
      </div>

      <!-- Explanation Reveal panel, initially hidden -->
      <div id="trivia-feedback-panel" style="display: none; animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); margin-top: 24px; background: rgba(var(--primary-rgb), 0.04); border: 1px solid var(--border-glass); border-radius: 8px; padding: 20px; text-align: left;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px; flex-wrap: wrap;">
          <div class="feedback-img-wrapper" style="width: 64px; height: 64px; border-radius: 50%; border: 2px solid var(--accent); overflow: hidden; background: var(--gradient-hero); display: flex; align-items: center; justify-content: center; position: relative; flex-shrink: 0;">
            <img id="feedback-portrait" src="" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <span id="feedback-fallback" style="display: none; font-size: 1.3rem; font-weight: 800; color: #fff;"></span>
          </div>
          <div>
            <h4 id="feedback-name" style="margin: 0; font-family: var(--font-heading); color: var(--text-main); font-size: 1.15rem;"></h4>
            <span id="feedback-role" style="font-size: 0.72rem; text-transform: uppercase; color: var(--accent); font-weight: 700; letter-spacing: 0.5px;"></span>
          </div>
        </div>
        <p id="feedback-bio" style="font-size: 0.88rem; line-height: 1.5; color: var(--text-muted); margin: 0 0 16px 0;"></p>
        <button id="btn-next-question" onclick="window.loadNextTriviaQuestion()" style="background: var(--primary); border: none; color: #fff; padding: 10px 20px; border-radius: 4px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; margin-left: auto; outline: none;">
          Next Question <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `;

  // Bind option button hover animations
  const btns = container.querySelectorAll('.trivia-option-btn');
  btns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if (gameState.answered) return;
      btn.style.borderColor = 'var(--primary)';
      btn.style.background = 'rgba(59, 130, 246, 0.05)';
      const bubble = btn.querySelector('span');
      bubble.style.borderColor = 'var(--primary)';
      bubble.style.color = 'var(--primary)';
    });
    btn.addEventListener('mouseleave', () => {
      if (gameState.answered) return;
      btn.style.borderColor = 'var(--border-glass)';
      btn.style.background = 'var(--bg-card)';
      const bubble = btn.querySelector('span');
      bubble.style.borderColor = 'var(--border-glass)';
      bubble.style.color = 'var(--text-muted)';
    });
  });
}

window.revealRiddleClue = function() {
  if (gameState.riddleCluesRevealed >= 3) return;
  console.log('Unlocking clue', gameState.riddleCluesRevealed + 1);
  AudioEngine.play('click');
  gameState.riddleCluesRevealed++;
  renderQuestion();
};

window.submitTriviaAnswer = function(answerText, element) {
  if (gameState.answered) return;
  gameState.answered = true;

  const correctDisplay = gameState.currentQuestion.displayCorrect;
  const isCorrect = (answerText === correctDisplay);

  // Disable all option buttons and highlight correct/incorrect
  const container = document.getElementById('individuals-game-play-area');
  const btns = container.querySelectorAll('.trivia-option-btn');
  
  btns.forEach(btn => {
    btn.style.cursor = 'default';
    const textSpan = btn.querySelector('.option-text');
    if (textSpan.textContent === correctDisplay) {
      btn.style.borderColor = '#10b981';
      btn.style.background = 'rgba(16, 185, 129, 0.1)';
      const bubble = btn.querySelector('span');
      bubble.style.background = '#10b981';
      bubble.style.borderColor = '#10b981';
      bubble.style.color = '#fff';
    } else if (btn === element) {
      btn.style.borderColor = '#ef4444';
      btn.style.background = 'rgba(239, 68, 68, 0.1)';
      const bubble = btn.querySelector('span');
      bubble.style.background = '#ef4444';
      bubble.style.borderColor = '#ef4444';
      bubble.style.color = '#fff';
    }
  });

  if (isCorrect) {
    AudioEngine.play('success');
    gameState.streak++;
    
    if (gameState.mode === 'riddles') {
      const points = gameState.riddleCluesRevealed === 1 ? 10 :
                     gameState.riddleCluesRevealed === 2 ? 5 : 2;
      gameState.score += points;
    } else {
      gameState.score++;
    }

    if (gameState.streak >= 3) {
      Confetti.spawn();
    }
  } else {
    AudioEngine.play('fail');
    gameState.streak = 0;
  }

  // Reveal panel
  const panel = document.getElementById('trivia-feedback-panel');
  const pName = document.getElementById('feedback-name');
  const pRole = document.getElementById('feedback-role');
  const pBio = document.getElementById('feedback-bio');
  const pImg = document.getElementById('feedback-portrait');
  const pFallback = document.getElementById('feedback-fallback');

  const correctFigure = gameState.currentQuestion.bio;
  pName.textContent = correctFigure.name;
  pRole.textContent = correctFigure.role;
  pBio.textContent = correctFigure.bio;

  if (correctFigure.image) {
    pImg.src = getAssetUrl(correctFigure.image);
    pImg.style.display = 'block';
    pFallback.style.display = 'none';
  } else {
    pImg.style.display = 'none';
    pFallback.style.display = 'flex';
  }

  const cleanName = correctFigure.name.replace(/Jr\.|Chief Justice|General|Dr\./gi, '').trim();
  const nameParts = cleanName.split(/\s+/).filter(p => p.length > 0);
  let initials = '';
  if (nameParts.length >= 3) {
    initials = (nameParts[0][0] + nameParts[1][0] + nameParts[2][0]).toUpperCase();
  } else if (nameParts.length === 2) {
    initials = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
  } else if (nameParts.length === 1) {
    initials = nameParts[0].substring(0, 2).toUpperCase();
  }
  pFallback.textContent = initials.substring(0, 3);

  panel.style.display = 'block';
};

window.loadNextTriviaQuestion = function() {
  AudioEngine.play('click');
  nextQuestion();
};

function endGame() {
  const container = document.getElementById('individuals-game-play-area');
  if (!container) return;

  let key = 'hs_trivia_riddles';
  if (gameState.mode === 'recall') key = 'hs_trivia_recall';

  const prevHigh = parseInt(localStorage.getItem(key) || 0);
  const isNewHigh = (gameState.score > prevHigh);
  if (isNewHigh) {
    localStorage.setItem(key, gameState.score);
  }

  Confetti.spawn();

  let scoreText = `${gameState.score} out of ${gameState.totalQuestions}`;
  if (gameState.mode === 'riddles') {
    scoreText = `${gameState.score} Points`;
  }

  container.innerHTML = `
    <div style="text-align: center; max-width: 500px; margin: 40px auto; padding: 20px; background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; box-shadow: var(--shadow-md); animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
      <div style="font-size: 3rem; margin-bottom: 16px;">­ƒÅå</div>
      <h3 style="font-family: var(--font-heading); color: var(--text-main); font-size: 1.4rem; margin-bottom: 8px;">Game Completed!</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px;">
        You've completed the challenge. Excellent retrieval practice!
      </p>

      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 6px; padding: 16px; margin-bottom: 24px;">
        <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent); font-weight: 700; display: block; margin-bottom: 6px;">Your Final Score</span>
        <strong style="font-size: 2rem; color: var(--text-main); font-family: var(--font-heading);">${scoreText}</strong>
        ${isNewHigh ? `
          <div style="color: #10b981; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-top: 8px; animation: bounce 1s infinite;">
            Ô£¿ New High Score! Ô£¿
          </div>
        ` : ''}
      </div>

      <div style="display: flex; gap: 12px; justify-content: center;">
        <button onclick="window.startTriviaMode('${gameState.mode}')" style="background: var(--primary); border: none; color: #fff; padding: 12px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; outline: none;">
          <i class="fa-solid fa-arrow-rotate-right"></i> Play Again
        </button>
        <button onclick="window.exitIndividualsGame()" style="background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass); color: var(--text-main); padding: 12px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; outline: none;">
          Back to Lobby
        </button>
      </div>
    </div>
  `;
}

// ==========================================
// HISTORICAL CLUEDO GAME LOGIC & RENDERING
// ==========================================

function startCluedoCase() {
  gameState.cluedoDeductions = 0;
  gameState.cluedoAccusationHistory = [];
  gameState.answered = false;

  renderCluedoCase();
}

function renderCluedoCase() {
  const container = document.getElementById('individuals-game-play-area');
  if (!container) return;

  const currentCase = gameState.cluedoCases[gameState.currentCluedoCaseIndex];

  // Build select option HTML elements
  let suspectOptions = '<option value="" disabled selected>-- Select Suspect (Architect) --</option>';
  currentCase.suspects.forEach(s => {
    suspectOptions += `<option value="${s.name}">${s.name} (${s.description})</option>`;
  });

  let tacticOptions = '<option value="" disabled selected>-- Select Tactic (Weapon) --</option>';
  currentCase.tactics.forEach(t => {
    tacticOptions += `<option value="${t.id}">${t.desc}</option>`;
  });

  let locationOptions = '<option value="" disabled selected>-- Select Location (Room) --</option>';
  currentCase.locations.forEach(l => {
    locationOptions += `<option value="${l.id}">${l.name}</option>`;
  });

  // Build evidence board cards
  let evidenceHtml = '';
  currentCase.evidence.forEach((ev, idx) => {
    evidenceHtml += `
      <div class="evidence-clue-card" onclick="this.querySelector('.evidence-text').style.display='block'; this.style.borderColor='var(--primary)'; AudioEngine.play('click');" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 6px; padding: 14px; cursor: pointer; transition: all 0.2s; text-align: left; box-sizing: border-box;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <span style="font-size: 0.72rem; font-weight: 700; color: var(--accent); text-transform: uppercase;">­ƒôé Evidence File #${idx + 1} (${ev.label})</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);"><i class="fa-solid fa-folder-open"></i> Open</span>
        </div>
        <p class="evidence-text" style="display: none; font-size: 0.85rem; line-height: 1.5; color: var(--text-main); margin: 8px 0 0 0; font-style: italic;">
          "${ev.text}"
        </p>
      </div>
    `;
  });

  // Build historical accusation logs list
  let historyLogs = '';
  if (gameState.cluedoAccusationHistory.length > 0) {
    historyLogs = `
      <div style="margin-top: 24px; border-top: 1px solid var(--border-glass); padding-top: 16px; text-align: left;">
        <h5 style="margin: 0 0 10px 0; font-family: var(--font-heading); color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px;">Investigation log:</h5>
        <div style="max-height: 150px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 8px;">
          ${gameState.cluedoAccusationHistory.map((h, i) => `
            <div style="background: rgba(0, 0, 0, 0.15); border-left: 3px solid ${h.isCorrect ? '#10b981' : '#ef4444'}; padding: 8px 12px; border-radius: 4px; font-size: 0.82rem; line-height: 1.4;">
              <span style="font-weight: 700; color: var(--text-muted);">Accusation #${gameState.cluedoAccusationHistory.length - i}:</span>
              I accused <strong style="color: var(--text-main);">${h.suspect}</strong> in <strong style="color: var(--text-main);">${h.location}</strong> with <strong style="color: var(--text-main);">${h.tactic}</strong>.
              <div style="margin-top: 4px; font-weight: 700; color: ${h.isCorrect ? '#10b981' : 'var(--accent)'};">${h.feedback}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div style="max-width: 700px; margin: 0 auto; animation: fadeIn 0.2s ease-out;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
        <button onclick="window.exitIndividualsGame()" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; outline: none;">
          <i class="fa-solid fa-arrow-left"></i> Exit to Lobby
        </button>
        <span style="font-size: 0.9rem; font-weight: 700; color: var(--accent); font-family: var(--font-heading);">${currentCase.title}</span>
        <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600;">Case ${gameState.currentCluedoCaseIndex + 1} of ${gameState.cluedoCases.length}</span>
      </div>

      <!-- Case Brief Panel -->
      <div style="background: rgba(var(--primary-rgb), 0.03); border: 1px solid var(--border-glass); border-radius: 8px; padding: 20px; margin-bottom: 24px; text-align: left; box-shadow: var(--shadow-sm);">
        <h4 style="margin: 0 0 8px 0; font-family: var(--font-heading); color: var(--text-main); font-size: 1.05rem; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-circle-info" style="color: var(--primary);"></i> Case Mission File
        </h4>
        <p style="font-size: 0.88rem; line-height: 1.5; color: var(--text-muted); margin: 0;">
          ${currentCase.brief}
        </p>
      </div>

      <!-- Evidence Board -->
      <div style="margin-bottom: 24px; text-align: left;">
        <h4 style="margin: 0 0 10px 0; font-family: var(--font-heading); color: var(--text-main); font-size: 0.95rem;">
          ­ƒù║´©Å Evidence Board (Click file folders to open)
        </h4>
        <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
          ${evidenceHtml}
        </div>
      </div>

      <!-- Deduction Form -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; padding: 24px; box-shadow: var(--shadow-sm);">
        <h4 style="margin: 0 0 16px 0; font-family: var(--font-heading); color: var(--accent); font-size: 1rem; text-align: left; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-pen-nib"></i> Formulate Your Accusation
        </h4>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <!-- Select Suspect -->
          <div style="display: flex; flex-direction: column; gap: 4px; text-align: left;">
            <label style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">1. Architect (Suspect)</label>
            <select id="cluedo-suspect-select" style="padding: 10px 14px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-glass); border-radius: 4px; color: var(--text-main); outline: none; cursor: pointer; font-size: 0.9rem;">
              ${suspectOptions}
            </select>
          </div>

          <!-- Select Tactic -->
          <div style="display: flex; flex-direction: column; gap: 4px; text-align: left;">
            <label style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">2. Decisive Tactic (Weapon)</label>
            <select id="cluedo-tactic-select" style="padding: 10px 14px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-glass); border-radius: 4px; color: var(--text-main); outline: none; cursor: pointer; font-size: 0.9rem;">
              ${tacticOptions}
            </select>
          </div>

          <!-- Select Location -->
          <div style="display: flex; flex-direction: column; gap: 4px; text-align: left;">
            <label style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">3. Flashpoint Location (Room)</label>
            <select id="cluedo-location-select" style="padding: 10px 14px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-glass); border-radius: 4px; color: var(--text-main); outline: none; cursor: pointer; font-size: 0.9rem;">
              ${locationOptions}
            </select>
          </div>

          <!-- Accuse Button -->
          <button id="btn-submit-accusation" onclick="window.submitCluedoAccusation()" style="background: var(--primary); border: none; color: #fff; padding: 12px; border-radius: 4px; font-weight: 700; cursor: pointer; transition: all 0.2s; margin-top: 8px; display: flex; align-items: center; justify-content: center; gap: 8px; outline: none; font-size: 0.95rem;">
            <i class="fa-solid fa-gavel"></i> Accuse & Deduce
          </button>
        </div>

        ${historyLogs}

        <!-- Case Resolution Panel, initially hidden -->
        <div id="cluedo-resolution-panel" style="display: none; border-top: 2px dashed #10b981; padding-top: 20px; margin-top: 24px; text-align: left; animation: fadeIn 0.3s ease-out;">
          <h4 style="color: #10b981; font-family: var(--font-heading); font-size: 1.15rem; margin: 0 0 10px 0; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-circle-check"></i> Case Decisively Solved!
          </h4>
          <p id="cluedo-resolution-text" style="font-size: 0.9rem; line-height: 1.5; color: var(--text-muted); margin: 0 0 16px 0;"></p>
          <button id="btn-next-case" onclick="window.nextCluedoCase()" style="background: var(--primary); border: none; color: #fff; padding: 10px 20px; border-radius: 4px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; margin-left: auto; outline: none;">
            Next Case <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  // Bind evidence hover visual highlight styles
  const evCards = container.querySelectorAll('.evidence-clue-card');
  evCards.forEach(c => {
    c.addEventListener('mouseenter', () => {
      if (c.style.borderColor !== 'var(--primary)') c.style.borderColor = 'rgba(255,255,255,0.1)';
      c.style.background = 'rgba(255,255,255,0.02)';
    });
    c.addEventListener('mouseleave', () => {
      if (c.style.borderColor !== 'var(--primary)') c.style.borderColor = 'var(--border-glass)';
      c.style.background = 'var(--bg-card)';
    });
  });
}

window.submitCluedoAccusation = function() {
  if (gameState.answered) return;

  const currentCase = gameState.cluedoCases[gameState.currentCluedoCaseIndex];

  const suspectSel = document.getElementById('cluedo-suspect-select');
  const tacticSel = document.getElementById('cluedo-tactic-select');
  const locationSel = document.getElementById('cluedo-location-select');

  if (!suspectSel.value || !tacticSel.value || !locationSel.value) {
    alert("Please select a value for Suspect, Tactic, and Location before making an accusation!");
    return;
  }

  const selectedSuspect = suspectSel.value;
  const selectedTacticId = tacticSel.value;
  const selectedLocation = locationSel.value;

  const selectedTacticDesc = currentCase.tactics.find(t => t.id === selectedTacticId).desc;
  const selectedLocationName = currentCase.locations.find(l => l.id === selectedLocation).name;

  gameState.cluedoDeductions++;

  // Verify correctness
  const isSuspectCorrect = (selectedSuspect === currentCase.correct.suspect);
  const isTacticCorrect = (selectedTacticId === currentCase.correct.tactic);
  const isLocationCorrect = (selectedLocation === currentCase.correct.location);

  const isAllCorrect = (isSuspectCorrect && isTacticCorrect && isLocationCorrect);

  let feedbackMsg = '';
  if (isAllCorrect) {
    feedbackMsg = "Deduction matches case records perfectly!";
  } else {
    // Cluedo style clue hint
    const wrongParts = [];
    if (!isSuspectCorrect) wrongParts.push("Architect");
    if (!isTacticCorrect) wrongParts.push("Tactic");
    if (!isLocationCorrect) wrongParts.push("Location");

    if (wrongParts.length === 3) {
      feedbackMsg = "ÔØî All elements are incorrect. The clues point elsewhere.";
    } else if (wrongParts.length === 2) {
      feedbackMsg = `ÔÜá´©Å 1 element correct. Check your ${wrongParts.join(' and ')}.`;
    } else {
      feedbackMsg = `ÔÜá´©Å 2 elements correct. Check your ${wrongParts[0]}.`;
    }
  }

  // Record history log
  gameState.cluedoAccusationHistory.unshift({
    suspect: selectedSuspect,
    tactic: selectedTacticDesc,
    location: selectedLocationName,
    feedback: feedbackMsg,
    isCorrect: isAllCorrect
  });

  if (isAllCorrect) {
    gameState.answered = true;
    AudioEngine.play('success');
    Confetti.spawn();

    // Disable accuse button
    const accBtn = document.getElementById('btn-submit-accusation');
    accBtn.style.display = 'none';

    // Show resolution
    const resPanel = document.getElementById('cluedo-resolution-panel');
    const resText = document.getElementById('cluedo-resolution-text');
    resText.textContent = currentCase.resolution;
    resPanel.style.display = 'block';

    // Smooth scroll down to resolution panel
    setTimeout(() => {
      resPanel.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
  } else {
    AudioEngine.play('fail');
    // Re-render layout to update history logs
    renderCluedoCase();
  }
};

window.nextCluedoCase = function() {
  AudioEngine.play('click');
  gameState.currentCluedoCaseIndex++;

  if (gameState.currentCluedoCaseIndex >= gameState.cluedoCases.length) {
    endCluedoGame();
  } else {
    startCluedoCase();
  }
};

function endCluedoGame() {
  const container = document.getElementById('individuals-game-play-area');
  if (!container) return;

  const key = 'hs_trivia_cluedo';
  localStorage.setItem(key, gameState.cluedoCases.length);

  Confetti.spawn();

  container.innerHTML = `
    <div style="text-align: center; max-width: 500px; margin: 40px auto; padding: 30px; background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; box-shadow: var(--shadow-md); animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
      <div style="font-size: 3.5rem; margin-bottom: 16px; animation: bounce 1.5s infinite;">­ƒöì­ƒòÁ´©ÅÔÇìÔÖé´©Å</div>
      <h3 style="font-family: var(--font-heading); color: var(--text-main); font-size: 1.4rem; margin-bottom: 8px;">Deduction Campaign Completed!</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px;">
        Outstanding detective work! You solved all ${gameState.cluedoCases.length} turning point case files decisively.
      </p>

      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 6px; padding: 16px; margin-bottom: 24px;">
        <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent); font-weight: 700; display: block; margin-bottom: 6px;">Status Achieved</span>
        <strong style="font-size: 1.5rem; color: #10b981; font-family: var(--font-heading);">Master Historical Investigator</strong>
      </div>

      <div style="display: flex; gap: 12px; justify-content: center;">
        <button onclick="window.startTriviaMode('cluedo')" style="background: var(--primary); border: none; color: #fff; padding: 12px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; outline: none;">
          <i class="fa-solid fa-arrow-rotate-right"></i> Play Again
        </button>
        <button onclick="window.exitIndividualsGame()" style="background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass); color: var(--text-main); padding: 12px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; outline: none;">
          Back to Lobby
        </button>
      </div>
    </div>
  `;
}

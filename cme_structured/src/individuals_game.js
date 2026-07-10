import { activeFigures, KEY_FIGURES_BIO } from './views.js';
import { AudioEngine } from './audio.js';
import { Confetti } from './confetti.js';

let gameState = {
  mode: null,       // 'riddles', 'recall', 'cluedo'
  score: 0,
  streak: 0,
  questionIndex: 0,
  totalQuestions: 10,
  currentQuestion: null,
  riddleCluesRevealed: 1,
  answered: false,

  // Cluedo state variables for Middle East (CME)
  cluedoCases: [
    {
      id: 'kingdavid',
      title: "Case #1946-KD: The King David Hotel Bombing",
      brief: "A devastating blast has ripped through the British administrative and military headquarters in Jerusalem, killing 91 people. Deduce the Architect, Decisive Tactic, and Location of this militant attack designed to force the British out of Palestine.",
      suspects: [
        { name: "Menachem Begin", description: "Leader of the militant Zionist group, the Irgun." },
        { name: "David Ben-Gurion", description: "Chairman of the Jewish Agency, moderate Zionist." },
        { name: "Ernest Bevin", description: "British Foreign Secretary managing the Mandate." },
        { name: "Haj Amin al-Husseini", description: "Grand Mufti of Jerusalem, leading Palestinian nationalist." }
      ],
      tactics: [
        { desc: "Placing explosives inside milk churns in the basement kitchen", id: "explosives" },
        { desc: "Organizing a general strike and armed revolt across Palestine", id: "strike" },
        { desc: "Intercepting British communications using codes and spies", id: "spies" },
        { desc: "Assassinating high-ranking British officials on the streets", id: "assassinate" }
      ],
      locations: [
        { name: "King David Hotel (Jerusalem)", id: "kingdavid" },
        { name: "The British Embassy (London)", id: "embassy" },
        { name: "Deir Yassin Village (Jerusalem)", id: "deiryassin" }
      ],
      correct: {
        suspect: "Menachem Begin",
        tactic: "explosives",
        location: "kingdavid"
      },
      evidence: [
        { label: "Irgun Order", text: "Disguised as Arab workers, our fighters entered the basement of the hotel carrying milk cans packed with gelignite. Set the timers for 30 minutes." },
        { label: "British Intelligence Report", text: "At 12:37 PM, a massive explosion demolished the southern wing of the King David Hotel in Jerusalem. This is the headquarters of the British Secretariat." },
        { label: "Begin's Statement", text: "The Irgun took responsibility. We sent three warnings to evacuate, but the British refused to leave. The blow was aimed at the heart of their administration." }
      ],
      resolution: "Correct! Under the direction of Menachem Begin, the militant Irgun group smuggled explosives hidden in milk churns into the basement of the King David Hotel in Jerusalem on 22 July 1946. The blast killed 91 people, shattered British administrative control, and became a crucial factor in the British decision to withdraw from Palestine and hand the Mandate to the United Nations."
    },
    {
      id: 'suez',
      title: "Case #1956-SC: The Suez Canal Nationalisation",
      brief: "The Middle East is on the brink of war. Following the US and British withdrawal of funding for the Aswan High Dam, the President of Egypt has taken a dramatic unilateral step that challenges Western imperial power. Deduce the Architect, Decisive Tactic, and Location that triggered this international showdown.",
      suspects: [
        { name: "Gamal Abdel Nasser", description: "President of Egypt, advocate of Pan-Arabism." },
        { name: "Anthony Eden", description: "British Prime Minister determined to maintain Suez control." },
        { name: "David Ben-Gurion", description: "Prime Minister of Israel seeking to open blockaded waterways." },
        { name: "Moshe Dayan", description: "IDF Chief of Staff who executed the Sinai invasion." }
      ],
      tactics: [
        { desc: "Nationalising the Suez Canal Company to fund the Aswan Dam", id: "nationalise" },
        { desc: "Launching a surprise paratrooper drop in the Sinai Peninsula", id: "paratroop" },
        { desc: "Signing the tripartite Sevres secret agreement with France and Israel", id: "sevres" },
        { desc: "Imposing an international oil embargo on Western nations", id: "oil" }
      ],
      locations: [
        { name: "Port Said (Suez Canal)", id: "portsaid" },
        { name: "Cairo (Egypt)", id: "cairo" },
        { name: "Sèvres (France)", id: "sevres_loc" }
      ],
      correct: {
        suspect: "Gamal Abdel Nasser",
        tactic: "nationalise",
        location: "portsaid"
      },
      evidence: [
        { label: "Nasser's Speech in Alexandria", text: "The Suez Canal belongs to Egypt! Today, I announce that we have nationalized the Canal Company. We will use its transit fees to build the Aswan Dam ourselves." },
        { label: "Anglo-French Joint Memo", text: "Nasser's seizure of the Suez Canal at Port Said is a direct threat to global shipping and oil supplies. We must prepare for joint military action to reclaim it." },
        { label: "Shipping Log", text: "Egyptian forces have taken command of the Suez Canal offices in Port Said. All toll fees are now paid to the nationalized Egyptian authority." }
      ],
      resolution: "Correct! Egyptian President Gamal Abdel Nasser nationalised the Suez Canal Company at Port Said in July 1956. This bold move was a direct response to Western funding cuts for the Aswan Dam. It provoked a secret military alliance between Britain, France, and Israel (culminating in the Suez Crisis), but ultimately established Nasser as the undisputed hero of Arab nationalism when pressure from the US forced the invaders to withdraw."
    },
    {
      id: 'yomkippur',
      title: "Case #1973-YK: The Yom Kippur Surprise Crossing",
      brief: "Israeli forces holding the Bar Lev Line along the Suez Canal have been caught completely off guard. Under the cover of a major religious holiday, Egyptian forces have bridged the canal and established a bridgehead. Deduce the Architect, Decisive Tactic, and Location of this surprise breakthrough.",
      suspects: [
        { name: "Anwar Sadat", description: "President of Egypt who succeeded Gamal Abdel Nasser." },
        { name: "Golda Meir", description: "Prime Minister of Israel who faced intense public criticism." },
        { name: "Hafez al-Assad", description: "President of Syria and ally of Egypt." },
        { name: "Moshe Dayan", description: "Minister of Defence of Israel during the war." }
      ],
      tactics: [
        { desc: "Executing a surprise crossing during Yom Kippur using high-pressure water cannons", id: "surprise" },
        { desc: "Launching a pre-emptive airstrike to destroy the Israeli Air Force", id: "airstrike" },
        { desc: "Deploying Merkava tanks across the Sinai desert", id: "tanks" },
        { desc: "Signing a ceasefire agreement mediated by Henry Kissinger", id: "ceasefire" }
      ],
      locations: [
        { name: "The Suez Canal (Sinai Peninsula)", id: "suezcanal" },
        { name: "Golan Heights (Syrian Border)", id: "golan" },
        { name: "Tel Aviv (Israel)", id: "telaviv" }
      ],
      correct: {
        suspect: "Anwar Sadat",
        tactic: "surprise",
        location: "suezcanal"
      },
      evidence: [
        { label: "Egyptian Military Log", text: "Operation Badr is a success. Under cover of Yom Kippur, our forces crossed the Suez Canal and breached the sand walls using high-pressure water hoses." },
        { label: "Sadat's Directive", text: "We do not expect to defeat Israel completely, but we must break the political deadlock. A surprise offensive across the Canal will force negotiations." },
        { label: "IDF Despatch", text: "Egyptian infantry are crossing the Canal in rubber dinghies. The Bar Lev fortifications are being bypassed and overrun. Send reinforcements." }
      ],
      resolution: "Correct! Egyptian President Anwar Sadat launched a surprise crossing of the Suez Canal on 6 October 1973, Yom Kippur, the holiest day in the Jewish calendar. By using water cannons to wash away the massive Israeli sand ramparts of the Bar Lev Line, Egypt established a foothold in the occupied Sinai. Although Israel militarily recovered later in the war, Sadat's strategic success broke the political stalemate and paved the way for the Camp David Accords."
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
        🕵️‍♂️ Historical Witness Trivia
      </h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 30px;">
        Test your knowledge of the 26 key individuals from the GCSE syllabus. Select a mode below to begin:
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <!-- Mode 1: Who Am I? -->
        <div class="lobby-card" onclick="window.startTriviaMode('riddles')" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; padding: 24px; cursor: pointer; transition: all 0.2s; text-align: left; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">🔍</div>
          <h4 style="margin: 0 0 6px 0; font-family: var(--font-heading); color: var(--text-main); font-size: 1.1rem;">"Who Am I?" Riddle Solver</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; flex-grow: 1; margin: 0 0 16px 0;">
            Guess the historical witness by unlocking clues sequentially. The fewer clues you reveal, the more points you earn!
          </p>
          <div style="font-size: 0.72rem; color: var(--accent); font-weight: 700; text-transform: uppercase;">
            🏆 High Score: ${highRiddles} pts
          </div>
        </div>

        <!-- Mode 2: Quick Recall -->
        <div class="lobby-card" onclick="window.startTriviaMode('recall')" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; padding: 24px; cursor: pointer; transition: all 0.2s; text-align: left; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">🎴</div>
          <h4 style="margin: 0 0 6px 0; font-family: var(--font-heading); color: var(--text-main); font-size: 1.1rem;">Quick Recall Challenge</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; flex-grow: 1; margin: 0 0 16px 0;">
            Rapid-fire multiple choice based on the 26 core syllabus recall questions. Direct syllabus testing.
          </p>
          <div style="font-size: 0.72rem; color: var(--accent); font-weight: 700; text-transform: uppercase;">
            🏆 High Score: ${highRecall}/10
          </div>
        </div>

        <!-- Mode 3: Historical Cluedo -->
        <div class="lobby-card" onclick="window.startTriviaMode('cluedo')" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; padding: 24px; cursor: pointer; transition: all 0.2s; text-align: left; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">🕵️‍♂️</div>
          <h4 style="margin: 0 0 6px 0; font-family: var(--font-heading); color: var(--text-main); font-size: 1.1rem;">Historical Cluedo (Deduction)</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; flex-grow: 1; margin: 0 0 16px 0;">
            Analyze evidence briefs and deduce the correct combination of Architect, Tactic, and Location behind major turning points.
          </p>
          <div style="font-size: 0.72rem; color: var(--accent); font-weight: 700; text-transform: uppercase;">
            🏆 Completed: ${highCluedo}/${gameState.cluedoCases.length} Cases
          </div>
        </div>
      </div>

      <p style="font-size: 0.8rem; color: var(--text-muted);">
        💡 Interactive recall games support retrieval practice, preparing you for 4, 12, and 16-mark essay significance questions.
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

window.exitIndividualsGame = function() {
  AudioEngine.play('click');
  const container = document.getElementById('individuals-game-play-area');
  if (container) {
    renderLobby(container);
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
    pImg.src = correctFigure.image;
    pImg.style.display = 'block';
    pImg.onerror = function() {
      this.style.display = 'none';
      pFallback.style.display = 'flex';
    };
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
      <div style="font-size: 3rem; margin-bottom: 16px;">🏆</div>
      <h3 style="font-family: var(--font-heading); color: var(--text-main); font-size: 1.4rem; margin-bottom: 8px;">Game Completed!</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px;">
        You've completed the challenge. Excellent retrieval practice!
      </p>

      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 6px; padding: 16px; margin-bottom: 24px;">
        <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent); font-weight: 700; display: block; margin-bottom: 6px;">Your Final Score</span>
        <strong style="font-size: 2rem; color: var(--text-main); font-family: var(--font-heading);">${scoreText}</strong>
        ${isNewHigh ? `
          <div style="color: #10b981; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-top: 8px; animation: bounce 1s infinite;">
            ✨ New High Score! ✨
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
          <span style="font-size: 0.72rem; font-weight: 700; color: var(--accent); text-transform: uppercase;">📂 Evidence File #${idx + 1} (${ev.label})</span>
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
          🗺️ Evidence Board (Click file folders to open)
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
      feedbackMsg = "❌ All elements are incorrect. The clues point elsewhere.";
    } else if (wrongParts.length === 2) {
      feedbackMsg = `⚠️ 1 element correct. Check your ${wrongParts.join(' and ')}.`;
    } else {
      feedbackMsg = `⚠️ 2 elements correct. Check your ${wrongParts[0]}.`;
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
      <div style="font-size: 3.5rem; margin-bottom: 16px; animation: bounce 1.5s infinite;">🔍🕵️‍♂️</div>
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

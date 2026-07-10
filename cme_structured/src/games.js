import { state } from './state.js';
import { AudioEngine } from './audio.js';
import { Confetti } from './confetti.js';
import { switchView } from './navigation.js';
import { saveProgress } from './storage.js';
import { renderSidebarNav, updateGlobalStats } from './views.js';
import { QUIZ_DATA } from '../questions.js';

export const CRISIS_SCENARIOS = [
  {
    text: "FLASHPOINT I [6 Oct 1973]: Egypt and Syria have launched a surprise assault on Yom Kippur. The Pentagon reports heavy armor losses. The Joint Chiefs want to send tanks immediately, but doing so might upset the delicate balance of global energy stocks.",
    choices: [
      {
        text: "DENY KNOWLEDGE: Inform Prime Minister Golda Meir that the US Switchboard is down for scheduled maintenance until next Tuesday.",
        effects: { tension: -10, oil: +15, arab: +10, israel: -25 }
      },
      {
        text: "SABOTAGE NEGOTIATIONS: Order a massive, highly visible military transport airlift (Nickel Grass) directly into the warzone to see how much smoke the Kremlin breathes.",
        effects: { tension: +25, oil: -20, arab: -15, israel: +30 }
      }
    ]
  },
  {
    text: "FLASHPOINT II [17 Oct 1973]: King Faisal and OAPEC are furious about the US airlift. They threaten to cut off the West's petroleum supply entirely, plunging civilization into a pre-industrial horse-and-carriage era.",
    choices: [
      {
        text: "PANIC BUYING: Ration domestic fuel to 3 drops per citizen. Mandate that all American commuters must roller-skate to work to preserve industrial vitality.",
        effects: { tension: -5, oil: +25, arab: +15, israel: -10 }
      },
      {
        text: "DOUBLE DOWN: Inform OPEC that we have invented a secret nuclear-powered automobile and do not require their organic dinosaur fluids anyway.",
        effects: { tension: +15, oil: -35, arab: -20, israel: +5 }
      }
    ]
  },
  {
    text: "FLASHPOINT III [22 Oct 1973]: UN Resolution 338 demands a truce, but Israel's General Sharon has fully encircled Egypt's Third Army. Leonid Brezhnev sends an angry telegram threatening to deploy Soviet paratroopers to Cairo.",
    choices: [
      {
        text: "DEFCON 3 BLUFF: Crank the global military alert scale to DEFCON 3. Order strategic bombers to circle the North Pole while playing high-volume jazz over the radio frequencies to confuse Russian radar.",
        effects: { tension: +35, oil: -10, arab: -15, israel: +25 }
      },
      {
        text: "DIPLOMATIC SURRENDER: Apologize profusely, demand Israel surrender the Sinai, and offer Brezhnev a signed portrait of President Nixon as a peace offering.",
        effects: { tension: -30, oil: +10, arab: +20, israel: -35 }
      }
    ]
  }
];

export function formatDoomsdayTime(pct) {
  if (pct >= 90) return '11:59 PM (ALARM)';
  if (pct <= 10) return '11:40 PM (ICE AGE)';
  let mins = 60 - Math.floor(pct / 2);
  return `11:${mins < 10 ? '0' : ''}${mins} PM`;
}

export function getCrisisColor(value) {
  if (value > 80 || value < 20) return 'var(--accent)';
  if (value > 65 || value < 35) return '#f59e0b';
  return 'var(--primary)';
}

export function initCrisisGame() {
  state.crisisGameSession.currentStep = 0;
  state.crisisGameSession.metrics = { tension: 50, oil: 50, arab: 50, israel: 50 };
  
  const panel = document.getElementById('crisis-game-panel');
  if (panel) {
    panel.innerHTML = `
      <div class="crisis-header">
        <h2 class="crisis-title">STRATEGIC AIR COMMAND: 1973</h2>
        <p class="crisis-subtitle">CLASSIFICATION: TOP SECRET // NOFORN // KISSINGER EYE ONLY</p>
      </div>

      <div class="meters-grid">
        <div class="meter-card">
          <div class="meter-label"><span>DOOMSDAY CLOCK</span><span id="val-tension">11:50 PM</span></div>
          <div class="meter-bg"><div id="bar-tension" class="meter-fill"></div></div>
        </div>
        <div class="meter-card">
          <div class="meter-label"><span>OIL LEVERAGE RATIO</span><span id="val-oil">50%</span></div>
          <div class="meter-bg"><div id="bar-oil" class="meter-fill"></div></div>
        </div>
        <div class="meter-card">
          <div class="meter-label"><span>SADAT ALLIANCE UNITY</span><span id="val-arab">50%</span></div>
          <div class="meter-bg"><div id="bar-arab" class="meter-fill"></div></div>
        </div>
        <div class="meter-card">
          <div class="meter-label"><span>MINESHAFTS RESERVED</span><span id="val-israel">50%</span></div>
          <div class="meter-bg"><div id="bar-israel" class="meter-fill"></div></div>
        </div>
      </div>

      <div class="scenario-box" style="margin-bottom: 24px;">
        <p id="crisis-scenario-text" class="scenario-text"></p>
      </div>

      <div class="choices-container" id="crisis-choices-box"></div>
    `;
  }
  
  updateCrisisUI();
  renderCrisisScenario();
}

export function updateCrisisUI() {
  const session = state.crisisGameSession;
  
  const tensionEl = document.getElementById('val-tension');
  const tensionBar = document.getElementById('bar-tension');
  if (tensionEl) tensionEl.innerText = formatDoomsdayTime(session.metrics.tension);
  if (tensionBar) {
    tensionBar.style.width = `${session.metrics.tension}%`;
    tensionBar.style.backgroundColor = getCrisisColor(session.metrics.tension);
  }

  const metrics = ['oil', 'arab', 'israel'];
  metrics.forEach(m => {
    const val = session.metrics[m];
    const valEl = document.getElementById(`val-${m}`);
    const barEl = document.getElementById(`bar-${m}`);
    if (valEl) valEl.innerText = `${val}%`;
    if (barEl) {
      barEl.style.width = `${val}%`;
      barEl.style.backgroundColor = getCrisisColor(val);
    }
  });
}

export function checkCrisisGameOver() {
  const m = state.crisisGameSession.metrics;
  if (m.tension >= 100) return "MUTUAL ASSURED DESTRUCTION VALIDATED: The Doomsday Clock strikes midnight. Strategic missiles launched. There is no recovery program for Paper 2.";
  if (m.tension <= 0) return "GEOPOLITICAL ERASURE: The US surrenders global relevance. Washington is converted into a collective wheat farm for the Eastern Bloc.";
  if (m.israel <= 0) return "STRATEGIC SURRENDER: The Israeli front collapses completely. The Joint Chiefs must now book alternative vacation properties.";
  if (m.oil <= 0) return "ECONOMIC EXTINCTION: Global oil drops to zero. Wall Street closes forever; the President is traded for three barrels of crude and an old bicycle.";
  if (m.arab <= 0) return "TOTAL REGIONAL ANARCHY: The Arab Alliance shatters into a billion decentralized factions, making subsequent exam answers impossibly complicated.";
  return null;
}

export function selectCrisisChoice(index) {
  const session = state.crisisGameSession;
  const choice = CRISIS_SCENARIOS[session.currentStep].choices[index];
  
  for (let key in choice.effects) {
    session.metrics[key] = Math.max(0, Math.min(100, session.metrics[key] + choice.effects[key]));
  }
  
  updateCrisisUI();
  const failMessage = checkCrisisGameOver();
  
  if (failMessage) {
    AudioEngine.play('click');
    endCrisisGame(failMessage, false);
    return;
  }

  session.currentStep++;
  if (session.currentStep >= CRISIS_SCENARIOS.length) {
    AudioEngine.play('success');
    endCrisisGame("CONGRATULATIONS: You successfully completed the 1973 October Crisis without triggering an accidental global nuclear holocaust. The Prime Minister is marginally pleased.", true);
  } else {
    AudioEngine.play('flip');
    renderCrisisScenario();
  }
}

export function renderCrisisScenario() {
  const session = state.crisisGameSession;
  const current = CRISIS_SCENARIOS[session.currentStep];
  const textEl = document.getElementById('crisis-scenario-text');
  const boxEl = document.getElementById('crisis-choices-box');
  
  if (textEl) textEl.innerText = current.text;
  if (boxEl) {
    boxEl.innerHTML = '';
    current.choices.forEach((c, idx) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerText = c.text;
      btn.onclick = () => selectCrisisChoice(idx);
      boxEl.appendChild(btn);
    });
  }
}

export function endCrisisGame(msg, isWin) {
  const panel = document.getElementById('crisis-game-panel');
  if (!panel) return;
  
  panel.innerHTML = `
    <div class="game-over-screen">
      <div class="game-over-title ${isWin ? 'win' : 'fail'}">${isWin ? 'WAR COMPLETED' : 'GLOBAL TERMINATION'}</div>
      <p class="scenario-text" style="margin-bottom: 20px; max-width: 500px; color: var(--accent);">${msg}</p>
      <div class="history-link-box">
        <strong>MEMORANDUM FOR EDEXCEL REVISION:</strong> Despite the absurdity, remember the real historical anchors here: the sheer risk of the US airlift (**Operation Nickel Grass**), the crippling weaponization of fuel via the **OPEC Embargo**, and the terrifying geopolitical pressure that led directly to **UN Resolution 338**.
      </div>
      <button class="restart-btn" id="btn-restart-crisis">RE-INITIALIZE COMPUTER</button>
    </div>
  `;
  
  const restartBtn = document.getElementById('btn-restart-crisis');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      AudioEngine.play('click');
      initCrisisGame();
    });
  }
}

const TUG_HISTORICAL_POOL = [
  { text: "1947: The UN votes on the Partition Plan (Resolution 181) to divide Palestine.", type: "deescalation" },
  { text: "1948: David Ben-Gurion officially proclaims the establishment of the State of Israel.", type: "escalation" },
  { text: "1956: President Nasser nationalises the Suez Canal Company.", type: "escalation" },
  { text: "1967: Israel launches preemptive air strikes destroying the Egyptian air force (Six-Day War).", type: "escalation" },
  { text: "1967: The UN Security Council passes Resolution 242 introducing 'Land for Peace'.", type: "deescalation" },
  { text: "1970: King Hussein orders the military expulsion of the PLO from Jordan (Black September).", type: "escalation" },
  { text: "1973: Egypt and Syria launch a coordinated surprise assault on the festival of Yom Kippur.", type: "escalation" },
  { text: "1978: Anwar Sadat and Menachem Begin sign the Camp David Accords.", type: "deescalation" },
  { text: "1987: The First Intifada breaks out in the Gaza Strip and West Bank.", type: "escalation" },
  { text: "1993: Yitzhak Rabin and Yasser Arafat shake hands on the White House lawn over the Oslo I Accord.", type: "deescalation" },
  { text: "1950: Israel passes the Law of Return, granting Jews worldwide the right to immigrate.", type: "escalation" },
  { text: "1979: The formal Egypt-Israel Peace Treaty is signed in Washington DC.", type: "deescalation" }
];

export function initTugGame() {
  if (state.tugGameSession.timeoutId) {
    clearTimeout(state.tugGameSession.timeoutId);
    state.tugGameSession.timeoutId = null;
  }

  state.tugGameSession.score = 0;
  state.tugGameSession.streak = 0;
  state.tugGameSession.defcon = 5;
  state.tugGameSession.gameEvents = [...TUG_HISTORICAL_POOL].sort(() => Math.random() - 0.5);

  const panel = document.getElementById('tug-game-panel');
  if (panel) {
    panel.innerHTML = `
      <div class="game-header">
        <h2 class="game-title">CHRONOLOGICAL TUG-OF-WAR</h2>
        <div style="font-size: 0.75rem; color: #22c55e; margin-top: 4px; font-weight: bold; letter-spacing: 0.05em;">OPERATION: TIMELINE INTERCEPT</div>
      </div>

      <div class="stats-banner">
        <div>INTERCEPTS SECURED: <span id="stat-score">0</span></div>
        <div>STREAK: <span id="stat-streak">0</span></div>
        <div>SECURITY LEVEL: <span id="stat-lives">DEFCON 5</span></div>
      </div>

      <div class="intercept-card-zone">
        <div class="intercept-label">Incoming Telemetry Intercept</div>
        <p id="event-display" class="event-text">INITIALIZING TIMELINE RADAR...</p>
      </div>

      <div class="control-grid">
        <button class="action-btn btn-escalate" id="btn-escalate">◄ ESCALATION (Conflict)</button>
        <button class="action-btn btn-deescalate" id="btn-deescalate">DE-ESCALATION (Peace) ►</button>
      </div>

      <div id="feedback-display" class="feedback-overlay"></div>
    `;

    document.getElementById('btn-escalate').addEventListener('click', () => processTugIntercept('escalation'));
    document.getElementById('btn-deescalate').addEventListener('click', () => processTugIntercept('deescalation'));
  }

  updateTugUI();
  nextTugEvent();
}

export function updateTugUI() {
  const session = state.tugGameSession;
  const scoreEl = document.getElementById('stat-score');
  const streakEl = document.getElementById('stat-streak');
  const livesEl = document.getElementById('stat-lives');

  if (scoreEl) scoreEl.innerText = session.score;
  if (streakEl) streakEl.innerText = session.streak;
  if (livesEl) {
    livesEl.innerText = `DEFCON ${session.defcon}`;
    livesEl.className = "";
    if (session.defcon === 2) {
      livesEl.classList.add('alarm-text');
      livesEl.style.color = "#f97316";
    } else if (session.defcon === 1) {
      livesEl.classList.add('alarm-text');
      livesEl.style.color = "#ef4444";
    } else {
      livesEl.style.color = "#22c55e";
    }
  }
}

export function nextTugEvent() {
  if (state.tugGameSession.timeoutId) {
    clearTimeout(state.tugGameSession.timeoutId);
    state.tugGameSession.timeoutId = null;
  }

  if (state.currentView !== 'games') {
    return;
  }
  const pane = document.getElementById('game-tug-container');
  if (!pane || pane.style.display === 'none') {
    return;
  }

  const session = state.tugGameSession;
  if (session.gameEvents.length === 0) {
    endTugGame(true);
    return;
  }

  const btnEsc = document.getElementById('btn-escalate');
  const btnDeesc = document.getElementById('btn-deescalate');
  if (btnEsc) btnEsc.disabled = false;
  if (btnDeesc) btnDeesc.disabled = false;

  session.currentEvent = session.gameEvents.pop();
  
  const eventEl = document.getElementById('event-display');
  const feedbackEl = document.getElementById('feedback-display');
  if (eventEl) eventEl.innerText = session.currentEvent.text;
  if (feedbackEl) feedbackEl.innerText = "";
}

export function processTugIntercept(playerChoice) {
  const session = state.tugGameSession;
  const feedback = document.getElementById('feedback-display');
  
  const btnEsc = document.getElementById('btn-escalate');
  const btnDeesc = document.getElementById('btn-deescalate');
  if (btnEsc) btnEsc.disabled = true;
  if (btnDeesc) btnDeesc.disabled = true;

  if (playerChoice === session.currentEvent.type) {
    session.score += 10 + (session.streak * 2);
    session.streak++;
    AudioEngine.play('success');
    if (feedback) {
      feedback.style.color = "#22c55e";
      feedback.innerText = "✓ INTERCEPT VALIDATED: DATA ALIGNED CORRECTLY.";
    }
  } else {
    session.streak = 0;
    session.defcon--;
    AudioEngine.play('fail');
    if (feedback) {
      feedback.style.color = "#ef4444";
      feedback.innerText = "✗ SECURITY BREACH: Misclassified timeline vector.";
    }
    
    if (session.defcon <= 1) {
      updateTugUI();
      endTugGame(false);
      return;
    }
  }

  updateTugUI();
  state.tugGameSession.timeoutId = setTimeout(nextTugEvent, 900);
}

export function endTugGame(isWin) {
  if (state.tugGameSession.timeoutId) {
    clearTimeout(state.tugGameSession.timeoutId);
    state.tugGameSession.timeoutId = null;
  }

  const panel = document.getElementById('tug-game-panel');
  if (!panel) return;

  AudioEngine.play(isWin ? 'cheer' : 'fail');

  if (isWin) {
    panel.innerHTML = `
      <div style="padding: 20px 0;">
        <h3 style="color:#22c55e; font-size:1.8rem; margin-bottom:10px; font-weight:800; font-family:'Courier New', Courier, monospace;">TIMELINE RESTORED</h3>
        <p style="color:#fff; line-height: 1.5; font-size: 0.95rem;">Excellent processing speed. You have mapped the dialectical rhythm of Paper 2 perfectly.</p>
        <div class="history-box">
          <strong>Narrative Architecture Note:</strong> Notice how periods of explosive escalation (1948, 1967, 1973) are consistently countered by fragile superpower-brokered de-escalation vectors (Resolution 242, Camp David, Oslo). Remembering this oscillation helps structure any <strong>8-mark Narrative Account</strong> question.
        </div>
        <button class="restart-btn" id="btn-restart-tug">RELOAD SIMULATOR</button>
      </div>
    `;
  } else {
    panel.innerHTML = `
      <div style="padding: 20px 0;">
        <h3 style="color:#ef4444; font-size:1.8rem; margin-bottom:10px; font-weight:800; font-family:'Courier New', Courier, monospace;">SYSTEM LOCKDOWN</h3>
        <p style="color:#fff; line-height: 1.5; font-size: 0.95rem;">DEFCON 1 reached. The timeline has collapsed into unresolvable chronological anomalies.</p>
        <div class="history-box">
          <strong>Review Vector:</strong> Make sure you aren't confusing structural flashpoints with diplomacy. For example, sorting the <em>Suez Crisis</em> or <em>First Intifada</em> as de-escalation will consistently compromise your essay structures.
        </div>
        <button class="restart-btn" id="btn-restart-tug">RE-INITIALIZE RADAR</button>
      </div>
    `;
  }

  const restartBtn = document.getElementById('btn-restart-tug');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      AudioEngine.play('click');
      initTugGame();
    });
  }
}

export const jswKeys = {};
window.addEventListener("keydown", e => {
  const pane = document.getElementById('game-jsw-container');
  const isJswActive = state.currentView === 'games' && pane && pane.style.display !== 'none';
  if (isJswActive) {
    const keysToPrevent = ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyW", "KeyA", "KeyS", "KeyD"];
    if (keysToPrevent.includes(e.code)) {
      e.preventDefault();
    }
  }
  jswKeys[e.code] = true;
});
window.addEventListener("keyup", e => {
  jswKeys[e.code] = false;
});

export function initJswGame() {
  const session = state.jswGameSession;
  session.score = 0;
  session.lives = 3;
  session.isGameOver = false;
  session.isGameWon = false;
  
  session.player.x = 50;
  session.player.y = 200;
  session.player.vx = 0;
  session.player.vy = 0;
  session.player.isJumping = false;

  session.items.forEach(i => i.collected = false);

  session.hazards[0].x = 200;
  session.hazards[0].vx = 2;
  session.hazards[1].x = 150;
  session.hazards[1].vx = 1.5;

  const scoreEl = document.getElementById("jsw-score");
  const itemsEl = document.getElementById("jsw-items");
  const livesEl = document.getElementById("jsw-lives");
  const reviewEl = document.getElementById("jsw-review");

  if (scoreEl) scoreEl.innerText = "00000";
  if (itemsEl) itemsEl.innerText = "4";
  if (livesEl) livesEl.innerText = "★★★";
  if (reviewEl) reviewEl.innerHTML = `<strong>INTELLIGENCE FEED:</strong> Collect the 4 floating white spec dispatch cubes to decrypt critical Paper 2 data files. Avoid moving hazards and structural dead zones.`;

  // Bind mobile on-screen touch controls
  const btnLeft = document.getElementById('jsw-btn-left');
  const btnRight = document.getElementById('jsw-btn-right');
  const btnJump = document.getElementById('jsw-btn-jump');
  
  if (btnLeft && btnRight && btnJump && !btnLeft.dataset.bound) {
    btnLeft.dataset.bound = "true";
    
    // Left button events
    const startLeft = (e) => { e.preventDefault(); jswKeys["ArrowLeft"] = true; };
    const stopLeft = (e) => { e.preventDefault(); jswKeys["ArrowLeft"] = false; };
    btnLeft.addEventListener('pointerdown', startLeft);
    btnLeft.addEventListener('pointerup', stopLeft);
    btnLeft.addEventListener('pointerleave', stopLeft);
    btnLeft.addEventListener('touchstart', startLeft);
    btnLeft.addEventListener('touchend', stopLeft);
    
    // Right button events
    const startRight = (e) => { e.preventDefault(); jswKeys["ArrowRight"] = true; };
    const stopRight = (e) => { e.preventDefault(); jswKeys["ArrowRight"] = false; };
    btnRight.addEventListener('pointerdown', startRight);
    btnRight.addEventListener('pointerup', stopRight);
    btnRight.addEventListener('pointerleave', stopRight);
    btnRight.addEventListener('touchstart', startRight);
    btnRight.addEventListener('touchend', stopRight);
    
    // Jump button events
    const startJump = (e) => { e.preventDefault(); jswKeys["Space"] = true; };
    const stopJump = (e) => { e.preventDefault(); jswKeys["Space"] = false; };
    btnJump.addEventListener('pointerdown', startJump);
    btnJump.addEventListener('pointerup', stopJump);
    btnJump.addEventListener('touchstart', startJump);
    btnJump.addEventListener('touchend', stopJump);
  }

  startJswLoop();
}

export function stopJswLoop() {
  state.jswGameSession.loopActive = false;
}

export function startJswLoop() {
  if (state.jswGameSession.loopActive) return;
  state.jswGameSession.loopActive = true;
  requestAnimationFrame(jswGameLoop);
}

export function jswGameLoop() {
  const session = state.jswGameSession;
  const pane = document.getElementById('game-jsw-container');
  const isJswActive = state.currentView === 'games' && pane && pane.style.display !== 'none';
  if (!session.loopActive || !isJswActive) {
    session.loopActive = false;
    return;
  }
  updateJswGame();
  drawJswGame();
  requestAnimationFrame(jswGameLoop);
}

export function updateJswGame() {
  const session = state.jswGameSession;
  const player = session.player;

  if (session.isGameOver || session.isGameWon) {
    if (jswKeys["Space"]) {
      AudioEngine.play('click');
      initJswGame();
    }
    return;
  }

  if (jswKeys["KeyA"] || jswKeys["ArrowLeft"]) player.vx = -3;
  else if (jswKeys["KeyD"] || jswKeys["ArrowRight"]) player.vx = 3;
  else player.vx = 0;

  if ((jswKeys["Space"] || jswKeys["ArrowUp"] || jswKeys["KeyW"]) && !player.isJumping) {
    player.vy = -7.5;
    player.isJumping = true;
    AudioEngine.play('click');
  }

  player.vy += 0.4;
  player.x += player.vx;
  player.y += player.vy;

  player.isJumping = true;
  for (let plat of session.platforms) {
    if (player.x < plat.x + plat.width &&
        player.x + player.width > plat.x &&
        player.y < plat.y + plat.height &&
        player.y + player.height > plat.y) {
        
      if (player.vy > 0 && player.y + player.height - player.vy <= plat.y + 4) {
        player.y = plat.y - player.height;
        player.vy = 0;
        player.isJumping = false;
      }
    }
  }

  if (player.x < 0) player.x = 0;
  if (player.x + player.width > 600) player.x = 600 - player.width;

  if (player.y > 300) {
    handleJswDeath();
    return;
  }

  for (let haz of session.hazards) {
    haz.x += haz.vx;
    if (haz.x > haz.rangeMax || haz.x < haz.rangeMin) {
      haz.vx *= -1;
    }

    if (player.x < haz.x + haz.width &&
        player.x + player.width > haz.x &&
        player.y < haz.y + haz.height &&
        player.y + player.height > haz.y) {
      handleJswDeath();
      return;
    }
  }

  for (let item of session.items) {
    if (!item.collected &&
        player.x < item.x + 12 && player.x + player.width > item.x &&
        player.y < item.y + 12 && player.y + player.height > item.y) {
        
      item.collected = true;
      session.score += 250;
      AudioEngine.play('success');
      
      const scoreEl = document.getElementById("jsw-score");
      const reviewEl = document.getElementById("jsw-review");
      const itemsEl = document.getElementById("jsw-items");
      
      if (scoreEl) scoreEl.innerText = String(session.score).padStart(5, '0');
      if (reviewEl) reviewEl.innerHTML = `<strong>DECRYPTED DATA:</strong> ${item.spec}`;
      
      const remaining = session.items.filter(i => !i.collected).length;
      if (itemsEl) itemsEl.innerText = remaining;

      if (remaining === 0) {
        handleJswVictory();
        return;
      }
    }
  }
}

export function handleJswDeath() {
  const session = state.jswGameSession;
  session.lives--;
  
  const livesEl = document.getElementById("jsw-lives");
  if (livesEl) livesEl.innerText = "★".repeat(session.lives).padEnd(3, ' ');
  
  session.player.x = 50;
  session.player.y = 200;
  session.player.vx = 0;
  session.player.vy = 0;

  if (session.lives <= 0) {
    AudioEngine.play('fail');
    session.isGameOver = true;
  } else {
    AudioEngine.play('fail');
  }
}

export function handleJswVictory() {
  const session = state.jswGameSession;
  AudioEngine.play('cheer');
  session.isGameWon = true;
}

export function drawJswGame() {
  const canvas = document.getElementById("jswCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const session = state.jswGameSession;
  const player = session.player;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let plat of session.platforms) {
    ctx.fillStyle = plat.color;
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.strokeRect(plat.x, plat.y, plat.width, plat.height);
  }

  for (let item of session.items) {
    if (!item.collected) {
      ctx.fillStyle = Math.floor(Date.now() / 200) % 2 === 0 ? "#ffffff" : "#ffff00";
      ctx.fillRect(item.x, item.y, 10, 10);
    }
  }

  for (let haz of session.hazards) {
    ctx.fillStyle = haz.color;
    ctx.font = "bold 14px Courier New";
    ctx.fillText(haz.label, haz.x, haz.y + 12);
  }

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(player.x - 2, player.y, player.width + 4, 4);

  if (session.isGameOver) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 22px Courier New";
    ctx.fillText("GAME OVER: TIMELINE DESTABILIZED", 90, 110);
    ctx.fillStyle = "#ffff00";
    ctx.font = "14px Courier New";
    ctx.fillText("The Big Board has gone dark.", 180, 150);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px Courier New";
    ctx.fillText("PRESS [SPACE] TO RE-INITIALIZE COMPUTER", 130, 200);
  } else if (session.isGameWon) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 22px Courier New";
    ctx.fillText("GEOPOLITICAL ORDER RESTORED!", 110, 110);
    ctx.fillStyle = "#00ffff";
    ctx.font = "14px Courier New";
    ctx.fillText("All dispatches successfully decrypted.", 140, 150);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px Courier New";
    ctx.fillText("PRESS [SPACE] TO RE-START RADAR", 170, 200);
  }
}

export const PRACTICE_ROOM_DATA = [
  {
    id: 'practice_1',
    subtopicId: 'subtopic_1_1',
    question: "Explain the importance of the King David Hotel Bombing (1946) for the British withdrawal from Palestine.",
    rawAnswer: 'In July 1946, the Jewish paramilitary group <span class="exam-error-span" data-error-idx="0">Haganah</span> blew up the King David Hotel in Jerusalem. This building was used as the <span class="exam-error-span" data-error-idx="1">Arab</span> military and administrative headquarters. The massive explosion killed <span class="exam-error-span" data-error-idx="2">910</span> people. Because of the outrage caused by this event, Britain decided the Mandate was unworkable and handed the problem over to the <span class="exam-error-span" data-error-idx="3">League of Nations</span>.',
    corrections: [
      { wrong: 'Haganah', right: 'Irgun' },
      { wrong: 'Arab', right: 'British' },
      { wrong: '910', right: '91' },
      { wrong: 'League of Nations', right: 'United Nations (UN)' }
    ],
    examinerTip: "💡 <strong>AO1 Examiner Tip:</strong> Examiners hate it when you mix up your Jewish paramilitary groups! The Haganah was the main defence force, but it was the extreme splinter group <em>Irgun</em> who carried out the King David Hotel bombing."
  },
  {
    id: 'practice_2',
    subtopicId: 'subtopic_1_2',
    question: "Explain the consequences of the 1948–49 Arab-Israeli War for the Palestinian Arabs.",
    rawAnswer: 'Following the 1948–49 Arab-Israeli War, Israel expanded its territory to cover <span class="exam-error-span" data-error-idx="0">55%</span> of mandate Palestine. Meanwhile, Egypt took military control of the <span class="exam-error-span" data-error-idx="1">West Bank</span> and Transjordan annexed the <span class="exam-error-span" data-error-idx="2">Gaza Strip</span>. Because of the war, over 700,000 Palestinian Arabs became refugees, a catastrophe they refer to as the <span class="exam-error-span" data-error-idx="3">Aliyah</span>.',
    corrections: [
      { wrong: '55%', right: '79%' },
      { wrong: 'West Bank', right: 'Gaza Strip' },
      { wrong: 'Gaza Strip', right: 'West Bank' },
      { wrong: 'Aliyah', right: 'Nakba' }
    ],
    examinerTip: "💡 <strong>AO1 Examiner Tip:</strong> Examiners frequently see students mix up which Arab country took which territory! Remember: Egypt took the Gaza Strip, and Jordan took the West Bank. Also, the Arabic term for the 1948 refugee catastrophe is the <em>Nakba</em>."
  },
  {
    id: 'practice_3',
    subtopicId: 'subtopic_1_3',
    question: "Explain the consequences of the Suez Crisis (1956) for Egypt's position in the Middle East.",
    rawAnswer: 'The Suez Crisis began in 1956 when Egyptian President <span class="exam-error-span" data-error-idx="0">Anwar Sadat</span> nationalised the Suez Canal Company to pay for the Aswan High Dam. Secretly, Britain, France and <span class="exam-error-span" data-error-idx="1">the USA</span> met at Sèvres to plan a coordinated attack. When the invasion happened, both the USA and the Soviet Union strongly <span class="exam-error-span" data-error-idx="2">supported</span> the attack, but eventually the invaders had to withdraw in humiliation.',
    corrections: [
      { wrong: 'Anwar Sadat', right: 'Gamal Abdel Nasser' },
      { wrong: 'the USA', right: 'Israel' },
      { wrong: 'supported', right: 'condemned' }
    ],
    examinerTip: "💡 <strong>AO1 Examiner Tip:</strong> Do not confuse your Egyptian Presidents! Nasser was the hero of 1956, Sadat was the leader during the 1973 Yom Kippur War. Also, remember that the USA <em>opposed</em> the invasion because they feared it would push Arab states toward the Soviet Union!"
  },
  {
    id: 'practice_4',
    subtopicId: 'subtopic_1_3',
    question: "Explain how border raids and the arms race increased tension in the years 1955–1956.",
    rawAnswer: 'Tension increased in 1955 when an intense Israeli military reprisal raid on <span class="exam-error-span" data-error-idx="0">Cairo</span> showed that the Egyptian army was too weak to defend itself. This provoked President Nasser to sign the <span class="exam-error-span" data-error-idx="1">US Arms Deal</span> to buy massive quantities of modern weapons. To pay for the Aswan High Dam, Nasser nationalised the <span class="exam-error-span" data-error-idx="2">Straits of Tiran</span> in 1956, directly leading to the Suez Crisis.',
    corrections: [
      { wrong: 'Cairo', right: 'Gaza' },
      { wrong: 'US Arms Deal', right: 'Czech Arms Deal (or Soviet)' },
      { wrong: 'Straits of Tiran', right: 'Suez Canal' }
    ],
    examinerTip: "💡 <strong>AO1 Examiner Tip:</strong> Always be precise with your locations and treaties! The 1955 Israeli raid was on Gaza, not Cairo. Nasser bought his weapons from the Soviet bloc via Czechoslovakia, and he nationalised the Suez Canal Company to fund his dam project."
  },
  {
    id: 'practice_5',
    subtopicId: 'subtopic_2_1',
    question: "Write a narrative account analysing the key events of the years 1964–1967 that led to the outbreak of the Six Day War.",
    rawAnswer: 'At the 1964 <span class="exam-error-span" data-error-idx="0">Khartoum</span> Conference, Arab leaders agreed to divert the River Jordan away from Israel and created the <span class="exam-error-span" data-error-idx="1">IDF</span>. Tension escalated in November 1966 when Israel launched a massive reprisal raid against the Jordanian village of <span class="exam-error-span" data-error-idx="2">Deir Yassin</span>. Finally, in May 1967, the <span class="exam-error-span" data-error-idx="3">USA</span> falsely warned Nasser that Israel was massing troops on the Syrian border.',
    corrections: [
      { wrong: 'Khartoum', right: 'Cairo' },
      { wrong: 'IDF', right: 'PLO' },
      { wrong: 'Deir Yassin', right: 'Samu' },
      { wrong: 'USA', right: 'USSR (Soviet Union)' }
    ],
    examinerTip: "💡 <strong>AO1 Examiner Tip:</strong> Keep your conferences and raids strictly chronological! The PLO was formed at the <em>Cairo</em> Conference in 1964. Deir Yassin was a massacre in 1948; the 1966 reprisal raid was against <em>Samu</em>. And it was the Soviet Union, not the USA, that provided the false intelligence in 1967."
  },
  {
    id: 'practice_6',
    subtopicId: 'subtopic_2_2',
    question: "Explain the importance of UN Resolution 242 for the Middle East peace process.",
    rawAnswer: "Following the Six Day War, the UN passed Resolution <span class=\"exam-error-span\" data-error-idx=\"0\">181</span>, which proposed the 'Land for Peace' formula. However, Arab leaders met at Khartoum and issued the 'Three Nos'. Frustrated by the lack of progress, a radical Palestinian group called the <span class=\"exam-error-span\" data-error-idx=\"1\">PLO</span> hijacked four international passenger jets to Dawson's Field in <span class=\"exam-error-span\" data-error-idx=\"2\">Egypt</span> in 1970.",
    corrections: [
      { wrong: '181', right: '242' },
      { wrong: 'PLO', right: 'PFLP' },
      { wrong: 'Egypt', right: 'Jordan' }
    ],
    examinerTip: "💡 <strong>AO1 Examiner Tip:</strong> Always double-check your UN Resolutions! Resolution 181 was the 1947 Partition Plan. Resolution 242 was the 1967 'Land for Peace' agreement."
  },
  {
    id: 'practice_7',
    subtopicId: 'subtopic_2_2',
    question: "Explain the consequences of the Six Day War (1967) for the map of the Middle East.",
    rawAnswer: 'On 5 June 1967, Israel launched a pre-emptive <span class="exam-error-span" data-error-idx="0">naval</span> strike that destroyed the Arab forces. Within six days, Israel completely redrew the map. They captured the <span class="exam-error-span" data-error-idx="1">Golan Heights</span> from Egypt and the <span class="exam-error-span" data-error-idx="2">Sinai Peninsula</span> from Syria. In response to the war, the UN passed Resolution <span class="exam-error-span" data-error-idx="3">181</span>, which established the \'Land for Peace\' formula.',
    corrections: [
      { wrong: 'naval', right: 'air' },
      { wrong: 'Golan Heights', right: 'Sinai Peninsula / Gaza' },
      { wrong: 'Sinai Peninsula', right: 'Golan Heights' },
      { wrong: '181', right: '242' }
    ],
    examinerTip: "💡 <strong>AO1 Examiner Tip:</strong> Territorial knowledge is crucial for AO1 marks! Israel took Sinai and Gaza from Egypt, and the Golan Heights from Syria. Make sure you don't confuse UN Resolution 181 (the 1947 Partition Plan) with Resolution 242 (the 1967 'Land for Peace' formula)."
  },
  {
    id: 'practice_8',
    subtopicId: 'subtopic_2_3',
    question: "Explain the consequences of the 1973 Yom Kippur War for relations between Arab nations and the West.",
    rawAnswer: 'In October 1973, <span class="exam-error-span" data-error-idx="0">King Hussein</span> of Egypt launched a coordinated surprise attack on Israel. Egyptian engineers successfully used water cannons to blast through the <span class="exam-error-span" data-error-idx="1">Green Line</span>, a massive sand-wall fortification along the Suez Canal. During the war, Arab states used the <span class="exam-error-span" data-error-idx="2">\'water weapon\'</span> to punish the West, causing a global economic crisis.',
    corrections: [
      { wrong: 'King Hussein', right: 'Anwar Sadat' },
      { wrong: 'Green Line', right: 'Bar Lev Line' },
      { wrong: '\'water weapon\'', right: '\'oil weapon\' (or oil embargo)' }
    ],
    examinerTip: "💡 <strong>AO1 Examiner Tip:</strong> Don't confuse your Arab leaders or Israeli defensive lines! Sadat was President of Egypt in 1973 (Hussein was King of Jordan). The sand wall on the Suez Canal was the <em>Bar Lev Line</em> (the Green Line was the 1949 armistice border). OPEC used the 'oil weapon' to put pressure on the USA."
  },
  {
    id: 'practice_9',
    subtopicId: 'subtopic_3_1',
    question: "Explain the importance of the Camp David Accords (1978) for the relations between Egypt and Israel.",
    rawAnswer: 'Following the 1973 war, US Secretary of State <span class="exam-error-span" data-error-idx="0">Jimmy Carter</span> engaged in months of \'shuttle diplomacy\'. This eventually led to a major breakthrough when Egyptian President Sadat visited the <span class="exam-error-span" data-error-idx="1">White House</span> in 1977 to offer peace. In 1978, the two sides met at <span class="exam-error-span" data-error-idx="2">Geneva</span> for 13 days of secret talks, resulting in the historic Treaty of Washington.',
    corrections: [
      { wrong: 'Jimmy Carter', right: 'Henry Kissinger' },
      { wrong: 'White House', right: 'Knesset (in Jerusalem)' },
      { wrong: 'Geneva', right: 'Camp David' }
    ],
    examinerTip: "💡 <strong>AO1 Examiner Tip:</strong> Be careful with your American politicians! Kissinger did the 'shuttle diplomacy' in 1974–75, while President Jimmy Carter mediated the 1978 accords at Camp David. Sadat’s historic 1977 speech took place at the Israeli parliament, the Knesset."
  },
  {
    id: 'practice_10',
    subtopicId: 'subtopic_3_2',
    question: "Explain the consequences of the 1982 Israeli invasion of Lebanon.",
    rawAnswer: 'In June 1982, Israel launched Operation <span class="exam-error-span" data-error-idx="0">Wrath of God</span> to push the PLO out of southern Lebanon. Defence Minister <span class="exam-error-span" data-error-idx="1">Yitzhak Rabin</span> secretly planned to bypass UN peacekeepers and drive all the way to Beirut. After a devastating two-month siege of the Lebanese capital, Yasser Arafat and the PLO were forced to evacuate to <span class="exam-error-span" data-error-idx="2">Jordan</span>.',
    corrections: [
      { wrong: 'Wrath of God', right: 'Peace for Galilee' },
      { wrong: 'Yitzhak Rabin', right: 'Ariel Sharon' },
      { wrong: 'Jordan', right: 'Tunisia (Tunis)' }
    ],
    examinerTip: "💡 <strong>AO1 Examiner Tip:</strong> Operation 'Wrath of God' was the Israeli assassination campaign after the 1972 Munich Olympics; the 1982 invasion of Lebanon was Operation 'Peace for Galilee'. It was Ariel Sharon who drove the army to Beirut, resulting in the PLO being exiled to Tunis (they had already been expelled from Jordan in 1970!)."
  },
  {
    id: 'practice_11',
    subtopicId: 'subtopic_3_2',
    question: "Explain the consequences of the First Intifada (1987–1993) for relations between Israel and Palestinians.",
    rawAnswer: 'The First Intifada was an armed military uprising led by the <span class="exam-error-span" data-error-idx="0">Egyptian army</span> that began in Gaza in December 1987. Palestinian youths famously fought Israeli troops using <span class="exam-error-span" data-error-idx="1">suicide bombs</span>. The Israeli government responded with a harsh <span class="exam-error-span" data-error-idx="2">\'Land for Peace\'</span> policy, which drew massive international condemnation and damaged Israel\'s global reputation.',
    corrections: [
      { wrong: 'Egyptian army', right: 'Palestinian civilians (or grassroots/youth)' },
      { wrong: 'suicide bombs', right: 'stones and petrol bombs' },
      { wrong: '\'Land for Peace\'', right: '\'Iron Fist\'' }
    ],
    examinerTip: "💡 <strong>AO1 Examiner Tip:</strong> The First Intifada was a spontaneous, grassroots uprising by civilians in the Occupied Territories, not a conventional war fought by an Arab army. They primarily used stones, boycotts, and strikes, not suicide bombs (which became common later with Hamas in the 1990s). Israel's harsh military response was known as the 'Iron Fist' policy."
  },
  {
    id: 'practice_12',
    subtopicId: 'subtopic_3_3',
    question: "Write a narrative account analysing the key developments in the Middle East peace process in the years 1993–1995.",
    rawAnswer: 'In 1993, highly secret peace talks took place in <span class="exam-error-span" data-error-idx="0">Geneva</span>. This led to a historic breakthrough and a famous handshake on the White House lawn between Yasser Arafat and Israeli Prime Minister <span class="exam-error-span" data-error-idx="1">Golda Meir</span>. This agreement created the Palestinian National Authority. However, the optimism was shattered when the Israeli Prime Minister was assassinated by a <span class="exam-error-span" data-error-idx="2">Hamas</span> extremist in 1995.',
    corrections: [
      { wrong: 'Geneva', right: 'Oslo / Norway' },
      { wrong: 'Golda Meir', right: 'Yitzhak Rabin' },
      { wrong: 'Hamas', right: 'Right-wing Jewish / Israeli' }
    ],
    examinerTip: "💡 <strong>AO1 Examiner Tip:</strong> It is crucial to remember who assassinated Yitzhak Rabin! He was not killed by Palestinian terrorists, but by Yigal Amir, an <em>Israeli religious extremist</em> who viewed the Oslo Accords as a betrayal of the Jewish people."
  }
];

export const practiceState = {
  currentExampleIndex: 0,
  clickedErrors: new Set()
};

// --- Taboo Revision Game Data & Logic ---

export const TABOO_CARDS = [
  {
    id: 'taboo_1',
    topic: 'Key Topic 1: The Birth of the State of Israel (1945–63)',
    target: 'KING DAVID HOTEL',
    taboo: ['Bomb', 'Irgun', 'Jerusalem', '91', 'Headquarters'],
    hint: 'Focus on July 1946, Menachem Begin, milk churns, and the shift in British morale.'
  },
  {
    id: 'taboo_2',
    topic: 'Key Topic 1: The Birth of the State of Israel (1945–63)',
    target: 'UN RESOLUTION 181',
    taboo: ['Partition', '1947', 'Divide', 'State', 'Rejected'],
    hint: "Focus on the international organisation involved, the percentages of land given, the status of Jerusalem, and the Arab League's reaction."
  },
  {
    id: 'taboo_3',
    topic: 'Key Topic 1: The Birth of the State of Israel (1945–63)',
    target: 'THE LAW OF RETURN',
    taboo: ['1950', 'Immigrate', 'Citizen', 'Jew / Jewish', 'Population'],
    hint: 'Focus on the Israeli government policy passed shortly after the 1948 war to build up its demographic strength and workforce.'
  },
  {
    id: 'taboo_4',
    topic: 'Key Topic 1: The Birth of the State of Israel (1945–63)',
    target: 'THE SUEZ CRISIS',
    taboo: ['Canal', 'Nasser', '1956', 'Britain / France', 'Nationalise'],
    hint: 'Focus on the withdrawal of funding for the Aswan High Dam, the secret Protocol of Sèvres, and the introduction of UNEF.'
  },
  {
    id: 'taboo_5',
    topic: 'Key Topic 1: The Birth of the State of Israel (1945–63)',
    target: 'FEDAYEEN',
    taboo: ['Guerrilla', 'Raids', 'Border', 'Egypt / Jordan', 'Terrorist'],
    hint: 'Use the Arabic translation "those who sacrifice themselves", refer to the 1950s infiltrations into Israel, and the IDF reprisal attacks.'
  },
  {
    id: 'taboo_6',
    topic: 'Key Topic 2: The Escalating Conflict (1964–73)',
    target: 'FATAH',
    taboo: ['Arafat', 'PLO', 'Syria', 'Samu', 'Group'],
    hint: 'Focus on the specific militant faction founded in 1959 that launched over 100 strikes between 1965 and 1967, leading to massive border tensions.'
  },
  {
    id: 'taboo_7',
    topic: 'Key Topic 2: The Escalating Conflict (1964–73)',
    target: 'THE SIX DAY WAR',
    taboo: ['1967', 'Pre-emptive', 'Air-strike', 'Territory / Land', 'Egypt / Syria / Jordan'],
    hint: "Focus on the consequences of Soviet misinformation, the closure of the Straits of Tiran, and the rapid expansion of Israel's borders by 350%."
  },
  {
    id: 'taboo_8',
    topic: 'Key Topic 2: The Escalating Conflict (1964–73)',
    target: 'UN RESOLUTION 242',
    taboo: ['Land for Peace', 'Withdraw', 'Recognise', 'Refugee', 'Khartoum'],
    hint: 'Focus on the diplomatic formula proposed after the 1967 conflict that the Arab states initially answered with the "Three Nos".'
  },
  {
    id: 'taboo_9',
    topic: 'Key Topic 2: The Escalating Conflict (1964–73)',
    target: 'BLACK SEPTEMBER',
    taboo: ['Munich', 'Olympics', '1972', 'Athletes', 'Jordan / Expelled'],
    hint: 'Focus on the extremist splinter faction formed after 1970, the hostage situation in Germany, and Israel\'s "Operation Wrath of God" retaliation.'
  },
  {
    id: 'taboo_10',
    topic: 'Key Topic 2: The Escalating Conflict (1964–73)',
    target: 'THE YOM KIPPUR WAR',
    taboo: ['1973', 'Surprise', 'Holy', 'Bar Lev', 'Sadat'],
    hint: 'Focus on the 6th of October, the use of Soviet SAM-3 missiles, the shattering of Israeli invincibility, and the resignation of Golda Meir.'
  },
  {
    id: 'taboo_11',
    topic: 'Key Topic 2: The Escalating Conflict (1964–73)',
    target: 'THE OIL WEAPON',
    taboo: ['OPEC', 'Embargo', 'Price', 'USA', 'Shortages'],
    hint: 'Focus on the economic tactic used by Saudi Arabia and others in 1973 to punish Western nations, causing a global recession.'
  },
  {
    id: 'taboo_12',
    topic: 'Key Topic 3: Attempts at a Solution (1974–95)',
    target: 'SHUTTLE DIPLOMACY',
    taboo: ['Kissinger', 'Travel / Fly', 'USA', 'Negotiate', 'Face-to-face'],
    hint: 'Focus on the method used between 1974 and 1975 to separate forces and reopen a vital Egyptian waterway without direct contact between enemies.'
  },
  {
    id: 'taboo_13',
    topic: 'Key Topic 3: Attempts at a Solution (1974–95)',
    target: 'CAMP DAVID ACCORDS',
    taboo: ['Carter', 'Sadat', 'Begin', '1978', 'Treaty'],
    hint: 'Focus on the 13-day secret summit in the American presidential retreat that laid the groundwork for the return of the Sinai Peninsula.'
  },
  {
    id: 'taboo_14',
    topic: 'Key Topic 3: Attempts at a Solution (1974–95)',
    target: 'SABRA AND SHATILA',
    taboo: ['Massacre', 'Refugee', 'Phalange / Christian', 'Lebanon / Beirut', 'Sharon'],
    hint: 'Focus on the tragic events of September 1982 following the assassination of Bashir Gemayel, which severely damaged Israel\'s international reputation.'
  },
  {
    id: 'taboo_15',
    topic: 'Key Topic 3: Attempts at a Solution (1974–95)',
    target: 'THE FIRST INTIFADA',
    taboo: ['Uprising', 'Stones', 'Iron Fist', '1987', 'Gaza / West Bank'],
    hint: 'Focus on the Arabic word for "shaking off", the grassroots rebellion sparked by a traffic accident, and the resulting global sympathy for Palestinians.'
  },
  {
    id: 'taboo_16',
    topic: 'Key Topic 3: Attempts at a Solution (1974–95)',
    target: 'THE OSLO ACCORDS',
    taboo: ['1993', 'Rabin', 'Arafat', 'Handshake', 'PNA / Authority'],
    hint: 'Focus on the secret talks held in Norway, the letters of mutual recognition, and the famous ceremony on the White House lawn with Bill Clinton.'
  }
];

export function initTabooGame() {
  const session = state.tabooGameSession;
  if (session.timerInterval) {
    clearInterval(session.timerInterval);
    session.timerInterval = null;
  }
  session.isPlaying = false;

  const panel = document.getElementById('taboo-game-panel');
  if (!panel) return;

  panel.innerHTML = `
    <div class="taboo-setup-card">
      <div class="taboo-title-section">
        <h2 class="taboo-main-title">REVISION TABOO: GEOPOLITICAL CODEX</h2>
        <p class="taboo-subtitle">AO1 ACTIVE VOCABULARY ACCELERATOR</p>
      </div>

      <div class="taboo-hint-box" style="font-size:0.85rem; border-color:var(--primary);">
        <strong>How to Play:</strong> Describe the <strong>Target Word</strong> to your team without saying any of the <strong>5 Taboo Words</strong>. No soundalikes, abbreviations, or spelling hints allowed!
      </div>

      <div class="taboo-setup-row">
        <span class="taboo-setup-label">Number of Teams</span>
        <div style="display: flex; gap: 8px;">
          <button class="taboo-team-count-btn active" data-count="2">2 Teams</button>
          <button class="taboo-team-count-btn" data-count="3">3 Teams</button>
          <button class="taboo-team-count-btn" data-count="4">4 Teams</button>
        </div>
      </div>

      <div class="taboo-setup-row">
        <span class="taboo-setup-label">Configure Team Names</span>
        <div id="taboo-team-inputs" class="taboo-teams-names-grid">
          <div>
            <label style="font-size:0.75rem; color:var(--text-muted);">Team 1 Name</label>
            <input type="text" class="taboo-setup-input" id="taboo-team-0-input" value="Red Tigers">
          </div>
          <div>
            <label style="font-size:0.75rem; color:var(--text-muted);">Team 2 Name</label>
            <input type="text" class="taboo-setup-input" id="taboo-team-1-input" value="Blue Eagles">
          </div>
        </div>
      </div>

      <div class="taboo-setup-row">
        <span class="taboo-setup-label">Turn Duration Limit</span>
        <select class="taboo-setup-input" id="taboo-timer-select" style="background-color:#0f172a; cursor:pointer;">
          <option value="45">45 Seconds</option>
          <option value="60" selected>60 Seconds (Standard)</option>
          <option value="90">90 Seconds</option>
          <option value="120">120 Seconds</option>
        </select>
      </div>

      <button class="taboo-btn-primary" id="btn-taboo-initialize" style="margin-top: 8px;">
        INITIALIZE COGNITIVE VECTORS
      </button>
    </div>
  `;

  const countBtns = panel.querySelectorAll('.taboo-team-count-btn');
  countBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      AudioEngine.play('click');
      countBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const count = parseInt(btn.getAttribute('data-count'));
      renderTeamInputs(count);
    });
  });

  document.getElementById('btn-taboo-initialize').addEventListener('click', startTabooGameSetup);
}

function renderTeamInputs(count) {
  const container = document.getElementById('taboo-team-inputs');
  if (!container) return;

  let html = '';
  const defaultNames = ['Red Tigers', 'Blue Eagles', 'Green Panthers', 'Yellow Hornets'];
  for (let i = 0; i < count; i++) {
    html += `
      <div>
        <label style="font-size:0.75rem; color:var(--text-muted);">Team ${i + 1} Name</label>
        <input type="text" class="taboo-setup-input" id="taboo-team-${i}-input" value="${defaultNames[i]}">
      </div>
    `;
  }
  container.innerHTML = html;
}

function startTabooGameSetup() {
  AudioEngine.play('click');
  const countBtn = document.querySelector('.taboo-team-count-btn.active');
  const count = countBtn ? parseInt(countBtn.getAttribute('data-count')) : 2;
  
  const teams = [];
  for (let i = 0; i < count; i++) {
    const input = document.getElementById(`taboo-team-${i}-input`);
    const name = input && input.value.trim() ? input.value.trim() : `Team ${i + 1}`;
    teams.push({ name: name, score: 0 });
  }

  const timerSelect = document.getElementById('taboo-timer-select');
  const timerLimit = timerSelect ? parseInt(timerSelect.value) : 60;

  const session = state.tabooGameSession;
  session.teams = teams;
  session.currentTeamIndex = 0;
  session.currentCardIndex = 0;
  session.timerLimit = timerLimit;
  session.timerRemaining = timerLimit;
  session.isPlaying = false;
  
  session.deck = [...TABOO_CARDS].sort(() => Math.random() - 0.5);

  showTabooTransition();
}

function showTabooTransition() {
  const session = state.tabooGameSession;
  const currentTeam = session.teams[session.currentTeamIndex];

  const panel = document.getElementById('taboo-game-panel');
  if (!panel) return;

  if (session.timerInterval) {
    clearInterval(session.timerInterval);
    session.timerInterval = null;
  }

  panel.innerHTML = `
    <div class="taboo-transition-card">
      <div class="taboo-title-section">
        <h2 class="taboo-main-title">NEXT VECTOR ASSIGNED</h2>
        <p class="taboo-subtitle">TRANSITION PROTOCOL</p>
      </div>

      <div style="margin: 16px 0;">
        <div style="font-size:0.9rem; color:var(--text-muted); text-transform:uppercase; font-weight:700; letter-spacing:0.5px;">Active Team</div>
        <div class="taboo-turn-badge">${currentTeam.name}</div>
        <p style="color:var(--text-muted); font-size:0.88rem; max-width:440px; margin: 12px auto; line-height:1.5;">
          <strong>Attention Describer:</strong> Hand the device to the player describing the target word. Press the button below when ready to begin your ${session.timerLimit}-second turn.
        </p>
      </div>

      <div class="taboo-scoreboard-grid">
        <div style="font-size:0.75rem; text-transform:uppercase; font-weight:800; color:var(--text-muted); letter-spacing:1px; margin-bottom:4px;">Current Scoreboard</div>
        ${session.teams.map((t, idx) => `
          <div class="taboo-score-row ${idx === session.currentTeamIndex ? 'active' : ''}">
            <span>${t.name}</span>
            <span>${t.score} pts</span>
          </div>
        `).join('')}
      </div>

      <button class="taboo-btn-primary" id="btn-taboo-start-turn" style="margin-top: 12px;">
        ENGAGE DECIPHER KEY
      </button>
    </div>
  `;

  document.getElementById('btn-taboo-start-turn').addEventListener('click', startTabooTurn);
}

function startTabooTurn() {
  AudioEngine.play('click');
  const session = state.tabooGameSession;
  session.isPlaying = true;
  session.timerRemaining = session.timerLimit;

  renderTabooActiveScreen();

  session.timerInterval = setInterval(() => {
    session.timerRemaining--;
    const timerEl = document.getElementById('taboo-timer-count');
    if (timerEl) {
      timerEl.innerText = `${session.timerRemaining}s`;
      if (session.timerRemaining <= 10) {
        timerEl.parentElement.classList.add('warning');
      }
    }

    if (session.timerRemaining <= 0) {
      clearInterval(session.timerInterval);
      session.timerInterval = null;
      AudioEngine.play('fail');
      showTabooTimeExpired();
    }
  }, 1000);
}

function renderTabooActiveScreen() {
  const panel = document.getElementById('taboo-game-panel');
  if (!panel) return;

  const session = state.tabooGameSession;
  const currentTeam = session.teams[session.currentTeamIndex];
  
  if (session.currentCardIndex >= session.deck.length) {
    session.deck = [...TABOO_CARDS].sort(() => Math.random() - 0.5);
    session.currentCardIndex = 0;
  }

  const card = session.deck[session.currentCardIndex];

  panel.innerHTML = `
    <div class="taboo-active-card">
      <div class="taboo-header-bar">
        <div class="taboo-active-team">
          <i class="fa-solid fa-users"></i> ${currentTeam.name} (${currentTeam.score} pts)
        </div>
        <div class="taboo-timer">
          <i class="fa-regular fa-clock"></i> <span id="taboo-timer-count">${session.timerRemaining}s</span>
        </div>
      </div>

      <div class="taboo-card-display">
        <div class="taboo-target-label">Target Variable</div>
        <h2 class="taboo-target-word">${card.target}</h2>
        
        <div style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase; font-weight:700; margin-top: 4px;">
          ${card.topic}
        </div>

        <div class="taboo-forbidden-label" style="margin-top: 8px;">Taboo Variables (DO NOT SAY)</div>
        <ul class="taboo-words-list">
          ${card.taboo.map(word => `
            <li class="taboo-word-item">
              <i class="fa-solid fa-ban" style="font-size:0.75rem;"></i> ${word}
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="taboo-hint-box">
        <strong>AO1 Hints:</strong> ${card.hint}
      </div>

      <div class="taboo-actions-grid">
        <button class="taboo-act-btn correct" id="btn-taboo-correct">
          <i class="fa-solid fa-circle-check"></i> CORRECT (+1)
        </button>
        <button class="taboo-act-btn violation" id="btn-taboo-violation">
          <i class="fa-solid fa-triangle-exclamation"></i> TABOO (-1)
        </button>
        <button class="taboo-act-btn skip" id="btn-taboo-skip">
          SKIP
        </button>
      </div>
    </div>
  `;

  document.getElementById('btn-taboo-correct').addEventListener('click', () => handleTabooAction('correct'));
  document.getElementById('btn-taboo-violation').addEventListener('click', () => handleTabooAction('violation'));
  document.getElementById('btn-taboo-skip').addEventListener('click', () => handleTabooAction('skip'));
}

function handleTabooAction(action) {
  const session = state.tabooGameSession;
  const currentTeam = session.teams[session.currentTeamIndex];

  if (action === 'correct') {
    AudioEngine.play('success');
    currentTeam.score++;
  } else if (action === 'violation') {
    AudioEngine.play('fail');
    currentTeam.score = Math.max(0, currentTeam.score - 1);
  } else {
    AudioEngine.play('click');
  }

  session.currentCardIndex++;
  renderTabooActiveScreen();
}

function showTabooTimeExpired() {
  const session = state.tabooGameSession;
  const currentTeam = session.teams[session.currentTeamIndex];

  const panel = document.getElementById('taboo-game-panel');
  if (!panel) return;

  panel.innerHTML = `
    <div class="taboo-transition-card">
      <div class="taboo-title-section">
        <h2 class="taboo-main-title" style="color:var(--accent);">TURN COMPLETED</h2>
        <p class="taboo-subtitle">DURATION LIMIT REACHED</p>
      </div>

      <div style="margin: 16px 0;">
        <p style="font-size:1.1rem; color:var(--text-main); font-weight:600;">
          ${currentTeam.name} completed their decryption round!
        </p>
        <div style="font-size:1.4rem; color:var(--success); font-weight:800; font-family:var(--font-heading); margin-top:8px;">
          Score: ${currentTeam.score} pts
        </div>
      </div>

      <div class="taboo-scoreboard-grid">
        <div style="font-size:0.75rem; text-transform:uppercase; font-weight:800; color:var(--text-muted); letter-spacing:1px; margin-bottom:4px;">Cumulative Scores</div>
        ${session.teams.map(t => `
          <div class="taboo-score-row">
            <span>${t.name}</span>
            <span>${t.score} pts</span>
          </div>
        `).join('')}
      </div>

      <div style="display:flex; gap:12px; margin-top:12px;">
        <button class="taboo-btn-secondary" id="btn-taboo-end-game">
          END GAME (Final Score)
        </button>
        <button class="taboo-btn-primary" id="btn-taboo-next-turn">
          CONTINUE TO NEXT TEAM
        </button>
      </div>
    </div>
  `;

  document.getElementById('btn-taboo-next-turn').addEventListener('click', advanceTabooTurn);
  document.getElementById('btn-taboo-end-game').addEventListener('click', endTabooGame);
}

function advanceTabooTurn() {
  const session = state.tabooGameSession;
  session.currentTeamIndex = (session.currentTeamIndex + 1) % session.teams.length;
  showTabooTransition();
}

function endTabooGame() {
  const session = state.tabooGameSession;
  if (session.timerInterval) {
    clearInterval(session.timerInterval);
    session.timerInterval = null;
  }

  const panel = document.getElementById('taboo-game-panel');
  if (!panel) return;

  let maxScore = -1;
  let winners = [];
  session.teams.forEach(t => {
    if (t.score > maxScore) {
      maxScore = t.score;
      winners = [t];
    } else if (t.score === maxScore) {
      winners.push(t);
    }
  });

  const isTie = winners.length > 1;
  const winnerText = isTie 
    ? `TIE GAME: ${winners.map(w => w.name).join(' & ')}!`
    : `${winners[0].name} Wins!`;

  AudioEngine.play('cheer');
  Confetti.spawn();

  panel.innerHTML = `
    <div class="taboo-victory-card">
      <div class="taboo-title-section">
        <h2 class="taboo-main-title" style="color:var(--primary);">COGNITIVE SIMULATION ENDED</h2>
        <p class="taboo-subtitle">FINAL DECRYPTION LOGS</p>
      </div>

      <div style="margin: 16px 0;">
        <div style="font-size:0.85rem; color:var(--text-muted); text-transform:uppercase; font-weight:700; letter-spacing:1px;">Geopolitical Victor</div>
        <div class="taboo-turn-badge" style="font-size:2.2rem; color:var(--success); text-shadow:0 0 15px rgba(16, 185, 129, 0.25);">
          ${winnerText}
        </div>
      </div>

      <div class="taboo-scoreboard-grid">
        <div style="font-size:0.75rem; text-transform:uppercase; font-weight:800; color:var(--text-muted); letter-spacing:1px; margin-bottom:4px;">Final Standings</div>
        ${session.teams.map(t => `
          <div class="taboo-score-row">
            <span>${t.name}</span>
            <span>${t.score} pts</span>
          </div>
        `).join('')}
      </div>

      <div class="history-link-box" style="margin-top:12px; font-size:0.85rem; line-height:1.5; border-color:var(--primary); background:rgba(168, 85, 247, 0.03);">
        <strong>AO1 Examiner Note:</strong> Revision Taboo successfully locks out superficial descriptions (like saying "Bombing" for <em>King David Hotel</em>, or "Partition" for <em>Resolution 181</em>). Remember that for full AO1 marks in your Edexcel exams, you must supply these exact secondary details, dates, and figures!
      </div>

      <button class="taboo-btn-primary" id="btn-taboo-restart" style="margin-top: 12px;">
        RESET SIMULATOR
      </button>
    </div>
  `;

  document.getElementById('btn-taboo-restart').addEventListener('click', initTabooGame);
}

// =============================================================
// MIDDLE EAST DECISION SIMULATOR HUB
// =============================================================

export const meSimulationDatabase = {
  "israeli_start": {
    "year": "1946",
    "topic": "KT1: End of the British Mandate",
    "text": "You are a Jewish Holocaust survivor arriving in the British Mandate of Palestine via an illegal immigration ship (Aliyah Bet). You encounter a blockade by British forces enforcing strict white-paper migration restrictions. Zionist underground paramilitary groups decide to launch direct retaliation targeting the hub of British operations.\n\nWhich parameter tracks the key paramilitary attack on British headquarters in July 1946?",
    "options": [
      {
        "text": "The Irgun bombing of the King David Hotel, which destroyed the British military and administrative wing, causing 91 fatalities.",
        "nextNode": "israeli_1948",
        "isCorrect": true
      },
      {
        "text": "The Haganah mobilization to declare an immediate military siege on the city of Cairo.",
        "nextNode": "israeli_mandate_fail",
        "isCorrect": false
      }
    ]
  },
  "israeli_mandate_fail": {
    "year": "1946",
    "topic": "⚠️ Specification Fact Error",
    "text": "Incorrect. Zionist paramilitaries focused strictly within the British Mandate borders. The critical event in July 1946 was the bombing of the King David Hotel by the Irgun, which shattered British political resolve to stay in Palestine.",
    "options": [
      {
        "text": "↩️ Correct your historical timeline pass",
        "nextNode": "israeli_start"
      }
    ]
  },
  "israeli_1948": {
    "year": "1947-1948",
    "topic": "KT1: Partition and Statehood",
    "text": "Correct! The King David Hotel bombing severely weakened British mandate sustainability.\n\nNovember 1947. The United Nations passes UN Resolution 181 to partition Palestine into separate Jewish and Arab states. Arab leaders reject the plan as unfair. On May 14, 1948, the British withdraw, and David Ben-Gurion declares the State of Israel. Instantly, surrounding Arab nations mobilize armies and attack.\n\nWhich outcome traces the military resolution of this 1948–49 Arab-Israeli War?",
    "evidenceKey": "king_david_46",
    "evidenceText": "🏨 King David Bombing (1946): Executed by the Irgun, this attack broke British mandate administrative resolve and accelerated the hand-over to the UN.",
    "options": [
      {
        "text": "Israel secures an armistice victory, expanding its territory beyond the original UN partition plan boundaries to control 78% of the area.",
        "nextNode": "israeli_law_return",
        "isCorrect": true
      },
      {
        "text": "Arab armies successfully push Israeli forces completely back into pre-mandate boundaries.",
        "nextNode": "israeli_1948_fail",
        "isCorrect": false
      }
    ]
  },
  "israeli_1948_fail": {
    "year": "1948",
    "topic": "⚠️ War Outcome Error",
    "text": "Incorrect. Israel won the 1948-49 war, capturing significant amounts of territory beyond UN Resolution 181 lines, including West Jerusalem, while the remaining areas became the West Bank (Jordan) and Gaza (Egypt).",
    "options": [
      {
        "text": "↩️ Readjust the territorial baseline",
        "nextNode": "israeli_1948"
      }
    ]
  },
  "israeli_law_return": {
    "year": "1950-1956",
    "topic": "KT1: Aftermath & Structural Growth",
    "text": "Correct! Israel consolidated its victory, leading to massive territorial changes.\n\nTo ensure state preservation, the Knesset passes the 'Law of Return' granting any Jew worldwide the right to immigrate, while integrating paramilitaries into the unified Israeli Defence Forces (IDF). \n\nBy 1956, borders clash. Egyptian President Nasser blocks Israeli shipping lanes through the Straits of Tiran. Israel launches a pre-emptive assault into the Sinai Peninsula as part of a secret tripartite agreement.\n\nWho were Israel's secret allies during this 1956 Suez Crisis?",
    "evidenceKey": "war_48_territory",
    "evidenceText": "🗺️ 1948 War Armistice: Israel expanded its borders to absorb 78% of mandatory Palestine, leaving borders highly contested.",
    "options": [
      {
        "text": "Britain and France, who wanted to regain control of the nationalized Suez Canal.",
        "nextNode": "israeli_six_day",
        "isCorrect": true
      },
      {
        "text": "The United States and the Soviet Union, operating under a joint UN mandate.",
        "nextNode": "israeli_suez_fail",
        "isCorrect": false
      }
    ]
  },
  "israeli_suez_fail": {
    "year": "1956",
    "topic": "⚠️ Suez Alliance Misconception",
    "text": "Incorrect. The US and USSR actually united politically to *condemn* the attack. Israel's secret allies were Britain and France, who coordinated the attack to protect their imperial assets.",
    "options": [
      {
        "text": "↩️ Correct your alliance mapping parameters",
        "nextNode": "israeli_law_return"
      }
    ]
  },
  "israeli_six_day": {
    "year": "1967",
    "topic": "KT2: The Six-Day War",
    "text": "Correct! Israel's military success in Sinai proved the effectiveness of the IDF, even though international pressure forced a withdrawal later.\n\nJune 1967. Border skirmishes with Syria escalate, and Egypt evicts UN peacekeepers from Sinai. Fearing an imminent Arab attack, Israel launches a pre-emptive strike, destroying the entire Egyptian air force on the tarmac in a single morning.\n\nWhich new territories did Israel capture by the end of this Six-Day War?",
    "evidenceKey": "suez_56_alliance",
    "evidenceText": "🚢 Suez Crisis (1956): Proved Israeli military capability via the Sinai sweep alongside secret allies Britain and France.",
    "options": [
      {
        "text": "The Golan Heights (from Syria), the West Bank and East Jerusalem (from Jordan), and the Gaza Strip and Sinai Peninsula (from Egypt).",
        "nextNode": "israeli_yom_kippur",
        "isCorrect": true
      },
      {
        "text": "The cities of Damascus, Cairo, and Amman proper.",
        "nextNode": "israeli_6day_fail",
        "isCorrect": false
      }
    ]
  },
  "israeli_6day_fail": {
    "year": "1967",
    "topic": "⚠️ Occupation Limits Error",
    "text": "Incorrect. Israel did not capture Arab capital cities. It occupied specific strategic buffer zones: the Golan Heights, West Bank, Gaza, East Jerusalem, and Sinai.",
    "options": [
      {
        "text": "↩️ Adjust territorial occupation data",
        "nextNode": "israeli_six_day"
      }
    ]
  },
  "israeli_yom_kippur": {
    "year": "1973",
    "topic": "KT2: The Yom Kippur War",
    "text": "Correct! These captured regions became the 'Occupied Territories' that redefined Middle Eastern diplomacy.\n\nOctober 1973. Seeking to reclaim their lost territories, Egypt and Syria launch a coordinated surprise assault on Israel during the holiest day of the Jewish calendar. The initial attack breaks through the Bar-Lev line along the Suez Canal, catching Israeli forces off-guard.\n\nHow did Israel secure container recovery during this Yom Kippur War?",
    "evidenceKey": "occupied_territories_67",
    "evidenceText": "⛰️ Six-Day War (1967): Israel occupied the Golan Heights, West Bank, Gaza, and Sinai, shifting regional defensive depth entirely.",
    "options": [
      {
        "text": "A massive US military airlift of weapons (Operation Nickel Grass) allowed Israel to stabilize fronts and launch successful counter-attacks.",
        "nextNode": "israeli_complete",
        "isCorrect": true
      },
      {
        "text": "Direct combat support from British and French amphibious troop landings.",
        "nextNode": "israeli_73_fail",
        "isCorrect": false
      }
    ]
  },
  "israeli_73_fail": {
    "year": "1973",
    "topic": "⚠️ Superpower Alignment Error",
    "text": "Incorrect. By 1973, US aid was Israel's primary strategic lifeline. Massive American resupply efforts allowed Israel to stabilize its lines and counter-attack across the Suez Canal.",
    "options": [
      {
        "text": "↩️ Correct your superpower aid variables",
        "nextNode": "israeli_yom_kippur"
      }
    ]
  },
  "israeli_complete": {
    "year": "1973+",
    "topic": "🏆 Israeli Path Completed!",
    "text": "You have traced the security trajectory of Israel from early migration struggles directly through to the defensive parameters of the 1973 war. You have secured all structural historical evidence metrics for this sector.",
    "options": [
      {
        "text": "🔄 Return to Dashboard Hub",
        "nextNode": "RESET_TO_DASHBOARD",
        "isReset": true
      }
    ]
  },
  "palestinian_start": {
    "year": "1947-1948",
    "topic": "KT1: Partition and Al-Nakba",
    "text": "You are a Palestinian Arab living in Jaffa in 1947. The United Nations announces UN Resolution 181, partitioning your homeland to create a Jewish state without consulting your local leadership. Violence erupts. As the 1948 war escalates, rumors of village massacres like Deir Yassin spread panic across Arab neighborhoods.\n\nWhat was the immediate demographic consequence of this war for the Palestinian Arab population?",
    "options": [
      {
        "text": "Over 700,000 Palestinian Arabs flee or are expelled from their homes, becoming refugees displaced into Gaza, the West Bank, Jordan, and Lebanon.",
        "nextNode": "palestinian_occupied",
        "isCorrect": true
      },
      {
        "text": "The entire Arab population is granted dual passport status inside a single federated system.",
        "nextNode": "palestinian_48_fail",
        "isCorrect": false
      }
    ]
  },
  "palestinian_48_fail": {
    "year": "1948",
    "topic": "⚠️ Refugee Crisis Misconception",
    "text": "Incorrect. The war caused a massive displacement crisis known as Al-Nakba ('The Catastrophe'), leaving over 700,000 Palestinians stateless refugees dependent on UNRWA camps.",
    "options": [
      {
        "text": "↩️ Trace the refugee pathway correctly",
        "nextNode": "palestinian_start"
      }
    ]
  },
  "palestinian_occupied": {
    "year": "1967",
    "topic": "KT2: Structural Occupation Life",
    "text": "Correct! The Palestinian refugee status became a permanent point of contention across the Middle East.\n\nIn 1967, the Six-Day War brings the remaining parts of mandatory Palestine under Israeli control. Your refugee camp in the West Bank or Gaza is now governed by Israeli military rule.\n\nWhich political umbrella body, led from 1969 by Yasser Arafat, becomes the primary voice of Palestinian nationalist resistance?",
    "evidenceKey": "nakba_refugees_48",
    "evidenceText": "⛺ Al-Nakba Displacements (1948): Left over 700,000 Palestinians as permanent refugees, reshaping regional political stability.",
    "options": [
      {
        "text": "The PLO (Palestine Liberation Organization), which integrated groups like Fatah to pursue liberation.",
        "nextNode": "palestinian_terrorism",
        "isCorrect": true
      },
      {
        "text": "The Arab League Unified High Command.",
        "nextNode": "palestinian_plo_fail",
        "isCorrect": false
      }
    ]
  },
  "palestinian_plo_fail": {
    "year": "1967",
    "topic": "⚠️ Organizational Error",
    "text": "Incorrect. While the Arab League supported the cause, the specific organization that represented the Palestinian national movement was the PLO, led by Yasser Arafat's Fatah faction.",
    "options": [
      {
        "text": "↩️ Rectify institutional structures",
        "nextNode": "palestinian_occupied"
      }
    ]
  },
  "palestinian_terrorism": {
    "year": "1970-1972",
    "topic": "KT2: Armed Resistance & Radicalization",
    "text": "Correct! The PLO coordinated both political and armed resistance campaigns.\n\nFrustrated by a lack of international diplomatic progress, radical factions like the PFLP carry out international operations, including airplane hijacks in 1970. In late 1970, King Hussein of Jordan views the armed Palestinian factions as a threat to his throne and launches a military campaign to expel the PLO from his country.\n\nWhat was this event called, and where did the PLO relocate its operational base?",
    "evidenceKey": "plo_consolidation_69",
    "evidenceText": "✊ PLO Emergence: Under Arafat, the PLO transformed the Palestinian issue from a humanitarian refugee problem into a nationalist movement.",
    "options": [
      {
        "text": "Black September; the PLO was violently expelled from Jordan and moved its headquarters to Lebanon.",
        "nextNode": "palestinian_lebanon",
        "isCorrect": true
      },
      {
        "text": "The Suez Containment; the PLO relocated to the Sinai Peninsula.",
        "nextNode": "palestinian_jordan_fail",
        "isCorrect": false
      }
    ]
  },
  "palestinian_jordan_fail": {
    "year": "1970",
    "topic": "⚠️ Black September Misconception",
    "text": "Incorrect. The expulsion from Jordan by King Hussein is known as Black September. Driven out of Amman, the PLO re-established its primary military operations in Beirut, Lebanon.",
    "options": [
      {
        "text": "↩️ Correct your regional geography data",
        "nextNode": "palestinian_terrorism"
      }
    ]
  },
  "palestinian_lebanon": {
    "year": "1982",
    "topic": "KT3: Invasion of Lebanon",
    "text": "Correct! The PLO's move to Lebanon shifted the focus of cross-border conflict to the northern Israeli border.\n\nFrom southern Lebanon, Palestinian factions launch rocket strikes and cross-border raids into northern Israel. In June 1982, following an assassination attempt on its UK ambassador, Israel launches a full-scale invasion of Lebanon ('Operation Peace for Galilee') to destroy the PLO infrastructure.\n\nWhat was the primary political result of this 1982 war for the PLO leadership?",
    "evidenceKey": "black_september_70",
    "evidenceText": "💥 Black September (1970): The PLO was violently expelled from Jordan, shifting its base of operations to Lebanon and increasing factional radicalization.",
    "options": [
      {
        "text": "The PLO is forced to evacuate Beirut under a UN-brokered deal, relocating its political leadership far away to Tunis, Tunisia.",
        "nextNode": "palestinian_complete",
        "isCorrect": true
      },
      {
        "text": "The PLO successfully captured northern Galilee, establishing an independent state enclave.",
        "nextNode": "palestinian_lebanon_fail",
        "isCorrect": false
      }
    ]
  },
  "palestinian_lebanon_fail": {
    "year": "1982",
    "topic": "⚠️ Lebanon Campaign Evaluation Error",
    "text": "Incorrect. Israel's invasion successfully forced the PLO out of Beirut. Arafat and his leadership cadre were exiled to Tunis, moving them far from the borders of Israel.",
    "options": [
      {
        "text": "↩️ Correct your operational outcomes",
        "nextNode": "palestinian_lebanon"
      }
    ]
  },
  "palestinian_complete": {
    "year": "1982+",
    "topic": "🏆 Palestinian Path Completed!",
    "text": "You have successfully navigated the complex timeline of the Palestinian national movement from 1948 up to the 1982 exile to Tunis. All historical revision points are locked in.",
    "options": [
      {
        "text": "🔄 Return to Dashboard Hub",
        "nextNode": "RESET_TO_DASHBOARD",
        "isReset": true
      }
    ]
  },
  "egyptian_start": {
    "year": "1956",
    "topic": "KT1: Nasser and the Suez Crisis",
    "text": "You are an Egyptian nationalist officer working alongside President Gamal Abdel Nasser in Cairo. Nasser aims to assert Arab leadership by nationalizing the Suez Canal to fund the Aswan High Dam. In response, Britain, France, and Israel launch a joint military attack, capturing the Sinai Peninsula.\n\nDespite losing the military battles, how did Nasser secure a massive political victory during this Suez Crisis?",
    "options": [
      {
        "text": "The US and USSR applied heavy economic and political pressure, forcing Britain, France, and Israel to withdraw, leaving Nasser in full control of the canal.",
        "nextNode": "egyptian_uar",
        "isCorrect": true
      },
      {
        "text": "The Egyptian military successfully destroyed the combined navies of Britain and France.",
        "nextNode": "egyptian_suez_fail",
        "isCorrect": false
      }
    ]
  },
  "egyptian_suez_fail": {
    "year": "1956",
    "topic": "⚠️ Strategic Evaluation Error",
    "text": "Incorrect. Egypt's forces were outmatched militarily. Nasser's triumph was purely political, achieved because Superpower intervention forced the imperial powers to withdraw.",
    "options": [
      {
        "text": "↩️ Re-evaluate Suez political outcomes",
        "nextNode": "egyptian_start"
      }
    ]
  },
  "egyptian_uar": {
    "year": "1958-1967",
    "topic": "KT1/KT2: Pan-Arabism and Buildup to War",
    "text": "Correct! The Suez Crisis turned Nasser into a hero across the Arab world.\n\nIn 1958, Nasser pursues his Pan-Arab vision by merging Egypt and Syria into a single state called the United Arab Republic (UAR). By May 1967, regional tensions hit a breaking point. Misled by false Soviet intelligence reports of Israeli troop build-ups on the Syrian border, Nasser takes a decisive step: he evicts UN peacekeepers from Sinai and blockades Israeli shipping.\n\nWhich vital international shipping lane did Egypt close in May 1967, triggering the Six-Day War?",
    "evidenceKey": "nasser_suez_56",
    "evidenceText": "🌊 Suez Triumph (1956): Nasser turned a military defeat into a major political victory through Superpower intervention, establishing Egypt as the leader of the Arab world.",
    "options": [
      {
        "text": "The Straits of Tiran, cutting off Israel's access to the Red Sea via the port of Eilat.",
        "nextNode": "egyptian_sadat",
        "isCorrect": true
      },
      {
        "text": "The Bab-el-Mandeb Strait, blocking oil routes to Western Europe.",
        "nextNode": "egyptian_6day_buildup_fail",
        "isCorrect": false
      }
    ]
  },
  "egyptian_6day_buildup_fail": {
    "year": "1967",
    "topic": "⚠️ Geographic Location Error",
    "text": "Incorrect. The specific chokepoint Nasser closed was the Straits of Tiran. Israel had explicitly warned that closing these straits would be considered an act of war, leading directly to their pre-emptive strike.",
    "options": [
      {
        "text": "↩️ Correct your geographical landmarks",
        "nextNode": "egyptian_uar"
      }
    ]
  },
  "egyptian_sadat": {
    "year": "1970-1973",
    "topic": "KT2: Anwar Sadat & Yom Kippur",
    "text": "Correct! The closure of the Straits of Tiran served as the immediate trigger for the 1967 war, which ended with Egypt losing the entire Sinai Peninsula.\n\nNasser passes away in 1970, and Anwar Sadat assumes the presidency. Sadat realizes Egypt cannot afford long-term economic stagnation without its lost territories. He decides on a calculated risk: launch a limited surprise attack across the Suez Canal to break the diplomatic stalemate and force the US into negotiations.\n\nWhat was the outcome of this October 1973 Yom Kippur War for Egypt?",
    "evidenceKey": "straits_tiran_67",
    "evidenceText": "⚓ Straits of Tiran: Egypt's closure of this strategic waterway served as the immediate trigger for Israel's pre-emptive air strike in 1967.",
    "options": [
      {
        "text": "Egyptian forces successfully crossed the canal and broke the Bar-Lev line. Although later encircled, the action restored Egyptian pride and brought the US to the negotiating table.",
        "nextNode": "egyptian_camp_david",
        "isCorrect": true
      },
      {
        "text": "The Egyptian army completely reclaimed the entire Sinai Peninsula within 48 hours.",
        "nextNode": "egyptian_73_fail",
        "isCorrect": false
      }
    ]
  },
  "egyptian_73_fail": {
    "year": "1973",
    "topic": "⚠️ Military Realities Error",
    "text": "Incorrect. Egypt did not win a total military victory; Israeli forces counter-attacked and crossed to the west bank of the canal. However, the initial success broke the myth of Israeli invincibility, achieving Sadat's political goals.",
    "options": [
      {
        "text": "↩️ Recalibrate the war outcomes",
        "nextNode": "egyptian_sadat"
      }
    ]
  },
  "egyptian_camp_david": {
    "year": "1977-1979",
    "topic": "KT3: Camp David & Peace",
    "text": "Correct! The war broke the diplomatic deadlock, leading to US-led 'shuttle diplomacy' by Henry Kissinger.\n\nIn 1977, Sadat takes a historic step by visiting Jerusalem to address the Knesset directly. US President Jimmy Carter invites Sadat and Israeli Prime Minister Menachem Begin to the presidential retreat at Camp David in 1978.\n\nWhat did the resulting Treaty of Washington (1979) accomplish?",
    "evidenceKey": "sadat_73_strategy",
    "evidenceText": "🎯 Yom Kippur War (1973): Re-established Egyptian military credibility, forcing the US to launch diplomatic negotiations.",
    "options": [
      {
        "text": "Egypt officially recognizes the State of Israel in exchange for the complete return of the Sinai Peninsula, becoming the first Arab nation to sign a peace treaty with Israel.",
        "nextNode": "egyptian_complete",
        "isCorrect": true
      },
      {
        "text": "Egypt and Israel agree to form a joint military command to govern the Gaza Strip together.",
        "nextNode": "egyptian_camp_david_fail",
        "isCorrect": false
      }
    ]
  },
  "egyptian_camp_david_fail": {
    "year": "1979",
    "topic": "⚠️ Treaty Interpretation Error",
    "text": "Incorrect. The Washington Treaty focused on trading land for peace. Israel returned the Sinai Peninsula, and Egypt recognized Israel, which led to Egypt being suspended from the Arab League for breaking Arab solidarity.",
    "options": [
      {
        "text": "↩️ Align treaty terms accurately",
        "nextNode": "egyptian_camp_david"
      }
    ]
  },
  "egyptian_complete": {
    "year": "1979",
    "topic": "🏆 Egyptian Path Completed!",
    "text": "You have completed the trajectory of Egyptian statecraft from Nasser's regional leadership directly through to Sadat's historic peace treaty. All critical evidence points are locked in.",
    "options": [
      {
        "text": "🔄 Return to Dashboard Hub",
        "nextNode": "RESET_TO_DASHBOARD",
        "isReset": true
      }
    ]
  },
  "peace_start": {
    "year": "1987",
    "topic": "KT3: The First Intifada",
    "text": "You are a young Palestinian living under military occupation in the Gaza Strip in December 1987. Decades of built-up frustration boil over after an Israeli military vehicle hits a civilian car. A massive, spontaneous grassroots uprising explodes across Gaza and the West Bank, characterized by stone-throwing, strikes, and civil disobedience.\n\nWhat historical name is given to this uprising, and how did it impact international perceptions of the conflict?",
    "options": [
      {
        "text": "The First Intifada; media coverage of Israeli soldiers using heavy force against stone-throwing youths generated international sympathy for the Palestinian cause.",
        "nextNode": "peace_arafat_88",
        "isCorrect": true
      },
      {
        "text": "The Fatah Revolution; it led to an immediate military withdrawal by Israeli forces from the entire West Bank within weeks.",
        "nextNode": "peace_intifada_fail",
        "isCorrect": false
      }
    ]
  },
  "peace_intifada_fail": {
    "year": "1987",
    "topic": "⚠️ Intifada Impact Error",
    "text": "Incorrect. The uprising did not cause an immediate military withdrawal. Known as the First Intifada ('shaking off'), it relied on long-term civil disobedience that pressured both Israel and the PLO to find a diplomatic solution.",
    "options": [
      {
        "text": "↩️ Correct your understanding of the Intifada framework",
        "nextNode": "peace_start"
      }
    ]
  },
  "peace_arafat_88": {
    "year": "1988-1991",
    "topic": "KT3: Diplomatic Shifts & Superpower Changes",
    "text": "Correct! The First Intifada brought the realities of the occupation onto the international stage.\n\nPressured by the ongoing uprising, Yasser Arafat makes a dramatic shift during a 1988 speech to the UN in Geneva: he explicitly renounces terrorism and recognizes Israel's right to exist. Shortly after, the global landscape changes as the Cold War ends, and the US leads a coalition in the 1991 Gulf War, altering regional alliances.\n\nWhere did these diplomatic shifts force Israeli and Palestinian delegates to sit down for formal peace talks for the first time in late 1991?",
    "evidenceKey": "first_intifada_87",
    "evidenceText": "🪨 First Intifada (1987-93): Grassroots civil resistance that transformed international awareness and pressured leaders toward a diplomatic track.",
    "options": [
      {
        "text": "The Madrid Conference, co-sponsored by the USA and the collapsing USSR.",
        "nextNode": "peace_oslo_93",
        "isCorrect": true
      },
      {
        "text": "The Washington Accord Summit.",
        "nextNode": "peace_madrid_fail",
        "isCorrect": false
      }
    ]
  },
  "peace_madrid_fail": {
    "year": "1991",
    "topic": "⚠️ Diplomatic Timeline Error",
    "text": "Incorrect. The first historic roundtable conference following the Gulf War took place at the Madrid Conference in Spain in late 1991, setting up the framework for future secret negotiations.",
    "options": [
      {
        "text": "↩️ Map the diplomatic roadmap correctly",
        "nextNode": "peace_arafat_88"
      }
    ]
  },
  "peace_oslo_93": {
    "year": "1993-1995",
    "topic": "KT3: The Oslo Accords",
    "text": "Correct! The Madrid Conference broke the ice, opening pathways for secret back-channel negotiations in Norway.\n\nIn 1993, secret talks produce the historic Oslo Accords. Yasser Arafat and Israeli Prime Minister Yitzhak Rabin share a historic handshake on the White House lawn alongside President Bill Clinton. \n\nWhat structural authority was established by the Oslo Accords to provide temporary self-governance for Palestinians?",
    "evidenceKey": "madrid_conference_91",
    "evidenceText": "🤝 Madrid Conference (1991): First time Israeli and Palestinian representatives sat down for direct negotiations, reshaped by post-Cold War politics.",
    "options": [
      {
        "text": "The Palestinian National Authority (PNA), gaining civil control over parts of the Gaza Strip and Jericho.",
        "nextNode": "peace_complete",
        "isCorrect": true
      },
      {
        "text": "A fully sovereign, independent State of Palestine with East Jerusalem as its capital.",
        "nextNode": "peace_oslo_fail",
        "isCorrect": false
      }
    ]
  },
  "peace_oslo_fail": {
    "year": "1993",
    "topic": "⚠️ Accord Content Misconception",
    "text": "Incorrect. The Oslo Accords did not establish a fully independent Palestinian state or resolve the status of Jerusalem. It set up an interim self-governing body, the Palestinian National Authority (PNA), deferring final statehood questions to future talks.",
    "options": [
      {
        "text": "↩️ Review the exact terms of the Oslo Accords",
        "nextNode": "peace_oslo_93"
      }
    ]
  },
  "peace_complete": {
    "year": "1995",
    "topic": "🏆 Peace & Street Path Completed!",
    "text": "You have completed the final arc of the Edexcel specification, tracing the conflict from the rock-throwing resistance of the Intifada to the diplomatic frameworks of the Oslo Accords (1993–1995). All historical evidence points are locked in.",
    "options": [
      {
        "text": "🔄 Return to Dashboard Hub",
        "nextNode": "RESET_TO_DASHBOARD",
        "isReset": true
      }
    ]
  }
};

let meCurrentPath = "";
let meCurrentNode = "";
let meScore = 0;
const meUnlockedEvidence = new Set();

export function initMeSimGame() {
  meCurrentPath = "";
  meCurrentNode = "";
  meScore = 0;
  meUnlockedEvidence.clear();
  
  const list = document.getElementById('me-evidence-list');
  if (list) list.innerHTML = '';
  
  returnToDashboard();
}

export function startMePath(pathKey) {
  meCurrentPath = pathKey;
  meCurrentNode = pathKey + "_start";
  
  const dash = document.getElementById('me-dashboard');
  const core = document.getElementById('me-simulator-core');
  if (dash) dash.classList.add('hidden');
  if (core) core.classList.remove('hidden');
  
  renderMeEngine();
}

export function returnToDashboard() {
  const core = document.getElementById('me-simulator-core');
  const dash = document.getElementById('me-dashboard');
  if (core) core.classList.add('hidden');
  if (dash) dash.classList.remove('hidden');
}

export function renderMeEngine() {
  const data = meSimulationDatabase[meCurrentNode];
  if (!data) return;

  if (data.options[0] && data.options[0].isReset) {
    meScore = 0;
    meUnlockedEvidence.clear();
    const list = document.getElementById('me-evidence-list');
    if (list) list.innerHTML = '';
    returnToDashboard();
    return;
  }

  const yearEl = document.getElementById('me-year');
  const topicEl = document.getElementById('me-topic');
  const storyEl = document.getElementById('me-story-text');
  const scoreEl = document.getElementById('me-score');
  
  if (yearEl) yearEl.innerText = data.year;
  if (topicEl) topicEl.innerText = data.topic;
  if (storyEl) storyEl.innerText = data.text;
  if (scoreEl) scoreEl.innerText = meScore;

  const insightBox = document.getElementById('me-historical-insight');
  if (insightBox) {
    if (data.evidenceKey) {
      if (!meUnlockedEvidence.has(data.evidenceKey)) {
        meUnlockedEvidence.add(data.evidenceKey);
        appendMeEvidenceDOM(data.evidenceText);
      }
      insightBox.className = "insight-box correct-node";
      insightBox.innerHTML = `<strong>✓ Spec Fact Unlocked:</strong> Context evidence appended to your active essay bank profile on the right panel.`;
      insightBox.classList.remove('hidden');
    } else if (data.topic && (data.topic.includes("Misconception") || data.topic.includes("Error"))) {
      insightBox.className = "insight-box";
      insightBox.innerHTML = `<strong>⚠️ Syllabus Distractor Blocked:</strong> Note this correction carefully to safeguard your marks against common exam mistakes.`;
      insightBox.classList.remove('hidden');
    } else {
      insightBox.classList.add('hidden');
    }
  }

  const controlsBox = document.getElementById('me-options-container');
  if (controlsBox) {
    controlsBox.innerHTML = '';
    data.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn-option';
      btn.innerText = opt.text;
      
      btn.addEventListener('click', () => {
        if (opt.isCorrect) {
          meScore += 20;
          AudioEngine.play('success');
        } else if (opt.isCorrect === false) {
          AudioEngine.play('fail');
        } else {
          AudioEngine.play('click');
        }
        meCurrentNode = opt.nextNode;
        renderMeEngine();
      });
      controlsBox.appendChild(btn);
    });
  }
}

function appendMeEvidenceDOM(text) {
  const list = document.getElementById('me-evidence-list');
  if (list) {
    const li = document.createElement('li');
    li.className = 'evidence-item';
    li.innerText = text;
    list.appendChild(li);
  }
}

window.startMePath = startMePath;
window.returnToDashboard = returnToDashboard;
window.initMeSimGame = initMeSimGame;

// =============================================================
// CHRONOLOGY 2D POINT-AND-CLICK ADVENTURE ENGINE - HAIFA TO SINAI
// =============================================================

const meEpicEngine = {
  state: {
    chapter: 1,
    room: "DECK",
    inventory: [],
    ch1_crateChecked: false,
    ch2_wireSecured: false,
    ch2_radioRepaired: false,
    ch2_reinforcementsCalled: false,
    ch3_cabinetChecked: false,
    ch3_awaitingChokepoint: false,
    ch3_victory: false
  },

  chapters: {
    1: "1: MANDATE CRISIS (1947)",
    2: "2: 1948 WAR (1948-49)",
    3: "3: SUEZ CRISIS (1956)"
  },

  rooms: {
    DECK: {
      chap: 1, name: "EXODUS DECK", mapLabel: "HAIFA PORT OUTSKIRTS", image: "assets/scenes/haifa_deck.png",
      description: "You are standing on the main deck of a crowded immigrant vessel, the President Warfield (renamed the Exodus 1947), anchored just outside Haifa Port. The deck is packed with Holocaust survivors, exhausted but hopeful. On the pier below, British soldiers have set up a barbed-wire blockade.\nTo the East, a gangway leads down toward the harbor. A hatch leads Down into the dark cargo hold.",
      exits: { east: "PIER", down: "HOLD" }
    },
    HOLD: {
      chap: 1, name: "EXODUS CARGO HOLD", mapLabel: "HAIFA PORT SLIPWAY", image: "assets/scenes/haifa_hold.png",
      description: "You are inside the dimly lit cargo hold of the ship. Heavy wooden crates are stacked against the steel ribs of the hull. A metal ladder leads Up back to the main deck.\nAn old slatted wooden CRATE sits near the ladder.",
      exits: { up: "DECK" }
    },
    PIER: {
      chap: 1, name: "HAIFA PIER", mapLabel: "HAIFA DOCKS AREA", image: "assets/scenes/haifa_pier.png",
      description: "You are standing on the Haifa Port slipway. Armed British soldiers patrol the perimeter, enforcing strict immigration quota policies. A desk has been set up to process arrivals.\nA British officer stands near the processing desk. To the West, the gangway leads back to the deck of the ship.",
      exits: { west: "DECK" }
    },
    OUTPOST: {
      chap: 2, name: "NEGEV OUTPOST", mapLabel: "NEGEV DESERT HIGHWAY", image: "assets/scenes/haifa_outpost.png",
      description: "You are at a desert outpost in the Negev (May 1948). The state of Israel has just been declared, and the first Arab-Israeli War is raging. Your unit is tasked with holding the southern highway against advancing Egyptian forces.\nTo the North, a trench leads to a sandbagged observation LOOKOUT. To the South, a heavy metal door leads Down into the communications BUNKER.",
      exits: { north: "LOOKOUT", south: "BUNKER" }
    },
    BUNKER: {
      chap: 2, name: "NEGEV BUNKER", mapLabel: "SOUTHERN DEFENSE RADAR", image: "assets/scenes/haifa_bunker.png",
      description: "You are inside the concrete communications bunker. A static-filled military shortwave radio console sits on a table. A steel ladder leads Up to the surface.\nA wooden supply CRATE sits in the corner.",
      exits: { up: "OUTPOST" }
    },
    LOOKOUT: {
      chap: 2, name: "SANDBAG LOOKOUT", mapLabel: "NEGEV DESERT SECTOR", image: "assets/scenes/haifa_lookout.png",
      description: "You stand behind a sandbagged parapet overlooking the desert valley. A fellow soldier is peering through binoculars, looking highly anxious. The trench leads back South to the main outpost.",
      exits: { south: "OUTPOST" }
    },
    COMMAND: {
      chap: 3, name: "SINAI TENT COMMAND", mapLabel: "SINAI PENINSULA SECTOR", image: "assets/scenes/haifa_command.png",
      description: "You are inside the tactical command headquarters in the Sinai Peninsula (October 1956). The Suez Crisis is unfolding. You are reviewing the operational blueprints for the pre-emptive Sinai campaign.\nA metal filing cabinet sits in the corner. To the South, a doorway leads out toward the sand DUNES.",
      exits: { south: "DUNES" }
    },
    DUNES: {
      chap: 3, name: "SINAI SAND DUNES", mapLabel: "SINAI OUTPOST RADAR", image: "assets/scenes/haifa_dunes.png",
      description: "You are standing on a desert ridge. An armored patrol of IDF half-tracks is parked nearby, engines idling. The commander is waiting for final orders. To the North, the path leads back into the command tent.",
      exits: { north: "COMMAND" }
    }
  },

  insights: {
    ch1_take: "🍊 GCSE Fact Check (KT1.2): The Exodus 1947 ship carried over 4,500 Jewish refugees. British authorities intercepted the ship, boarded it in international waters, and forcibly returned the passengers to Europe on prison ships, causing a major international public relations disaster that swung global public opinion in favor of Zionist statehood.",
    ch1_win: "🍊 GCSE Fact Check (KT1.2): The British Mandate's strict immigration restrictions (White Paper policies) created severe tensions with Zionist groups, who resorted to both illegal immigration (Aliyah Bet) and armed resistance, eventually forcing Britain to refer the Palestine question to the UN in 1947.",
    ch2_arms: "⛺ GCSE Fact Check (KT1.2): During the 1948 war, Israel secured vital shipments of arms and ammunition from Czechoslovakia (with Soviet approval). This broke the UN embargo and provided the newly formed IDF with a decisive military advantage over the Arab forces.",
    ch2_win: "⛺ GCSE Fact Check (KT1.2): Israel's military victory in 1948 was due to unified command structure (IDF), superior mobilization, and advanced weapon imports, whereas the Arab coalition suffered from divided leadership, conflicting war aims, and poor coordination.",
    ch3_suez: "⚔️ GCSE Fact Check (KT1.3): The 1956 Suez Crisis escalated when Israel launched a pre-emptive invasion of Sinai under a secret agreement (the Sèvres Protocol) with Britain and France. Although Israel withdrew under US pressure, it secured shipping rights through the Straits of Tiran, which reopened the Gulf of Aqaba."
  }
};

// =============================================================
// 2D CANVAS ENGINE GLOBAL STATE VARIABLES
// =============================================================
const player = {
  x: 150,
  y: 360,
  targetX: 150,
  targetY: 360,
  speed: 4,
  isWalking: false,
  scale: 1.0,
  currentFrame: 0,
  facing: 'right'
};

const walkableAreas = {
  DECK: { minX: 50, maxX: 750, minY: 340, maxY: 420 },
  HOLD: { minX: 100, maxX: 700, minY: 340, maxY: 420 },
  PIER: { minX: 80, maxX: 720, minY: 340, maxY: 420 },
  OUTPOST: { minX: 100, maxX: 700, minY: 340, maxY: 420 },
  BUNKER: { minX: 120, maxX: 680, minY: 340, maxY: 420 },
  LOOKOUT: { minX: 150, maxX: 650, minY: 340, maxY: 420 },
  COMMAND: { minX: 100, maxX: 700, minY: 340, maxY: 420 },
  DUNES: { minX: 80, maxX: 720, minY: 340, maxY: 420 }
};

const hotspots = {
  DECK: [
    { id: 'ladder', name: 'Hatch (Down to Hold)', x: 250, y: 370, radius: 35, type: 'transition', targetRoom: 'HOLD', startPos: { x: 550, y: 370 }, lookDesc: 'A steel hatch leads down into the cargo hold.' },
    { id: 'gangway', name: 'Gangway (East to Pier)', x: 700, y: 360, radius: 35, type: 'transition', targetRoom: 'PIER', startPos: { x: 100, y: 360 }, lookDesc: 'A wooden gangway leads down to the harbor pier.' }
  ],
  HOLD: [
    { id: 'ladder', name: 'Ladder (Up to Deck)', x: 150, y: 380, radius: 35, type: 'transition', targetRoom: 'DECK', startPos: { x: 250, y: 370 }, lookDesc: 'A metal ladder leads back up to the main deck.' },
    { id: 'crate', name: 'Wooden Crate', x: 550, y: 370, radius: 45, type: 'object', lookDesc: 'An old slatted wooden cargo crate. It is unsecured. Inspect it to see what is inside.', interactMsg: 'You inspect the crate. Tucked safely beneath some heavy wool blankets, you discover forged British Mandate entry CERTIFICATES. (Type TAKE ILLEGAL CERTIFICATE to take them!)' }
  ],
  PIER: [
    { id: 'gangway', name: 'Gangway (West to Deck)', x: 100, y: 360, radius: 35, type: 'transition', targetRoom: 'DECK', startPos: { x: 700, y: 360 }, lookDesc: 'The gangway leading back onto the Exodus 1947 deck.' },
    { id: 'officer', name: 'Officer Desk', x: 600, y: 350, radius: 45, type: 'object', lookDesc: 'A processing desk manned by a British Officer checking entry permits against quota ledgers.', interactMsg: 'The officer demands: "Show me your immigration papers!" (Type BYPASS WHITE PAPER QUOTA if you have the forged certificates!)' }
  ],
  OUTPOST: [
    { id: 'trench', name: 'Trench (North to Lookout)', x: 400, y: 340, radius: 35, type: 'transition', targetRoom: 'LOOKOUT', startPos: { x: 300, y: 400 }, lookDesc: 'A narrow, sandbag-lined trench leading up to the observation lookout.' },
    { id: 'bunker', name: 'Bunker Door (Down to Bunker)', x: 250, y: 400, radius: 35, type: 'transition', targetRoom: 'BUNKER', startPos: { x: 160, y: 360 }, lookDesc: 'A heavy steel door leading down into the communications bunker.' }
  ],
  BUNKER: [
    { id: 'ladder', name: 'Ladder (Up to Outpost)', x: 160, y: 360, radius: 35, type: 'transition', targetRoom: 'OUTPOST', startPos: { x: 250, y: 400 }, lookDesc: 'A vertical steel ladder leading up to the desert surface.' },
    { id: 'crate', name: 'Weapons Crate', x: 320, y: 380, radius: 45, type: 'object', lookDesc: 'A military supply crate stamped "MANUFACTURED IN PRAGUE". It is filled with weapons and electrical components.', interactMsg: 'Inside the Czech crate, you see a spool of copper terminal WIRE. (Type SECURE CZECH ARMS SHIPMENT to take it!)' },
    { id: 'radio', name: 'Radio Console', x: 550, y: 360, radius: 45, type: 'object', lookDesc: 'A shortwave military transmitter. The antenna link wire is severed. It needs a piece of copper wire to function.', interactMsg: 'The radio console is offline. If you have copper wire, type USE WIRE to repair it.' }
  ],
  LOOKOUT: [
    { id: 'trench', name: 'Trench (South to Outpost)', x: 300, y: 400, radius: 35, type: 'transition', targetRoom: 'OUTPOST', startPos: { x: 400, y: 340 }, lookDesc: 'The trench path leading back down to the Negev outpost.' },
    { id: 'lookout', name: 'Lookout Soldier', x: 500, y: 360, radius: 45, type: 'object', lookDesc: 'An anxious IDF soldier scanning the valley through binoculars. Talk to him or coordinate actions. (Type CONSOLIDATE ISRAEL DEFENSE FORCES to coordinate with him!)' }
  ],
  COMMAND: [
    { id: 'exit', name: 'Exit (South to Dunes)', x: 400, y: 400, radius: 35, type: 'transition', targetRoom: 'DUNES', startPos: { x: 200, y: 360 }, lookDesc: 'The tent flap exit leading out to the Sinai dunes.' },
    { id: 'cabinet', name: 'Filing Cabinet', x: 250, y: 360, radius: 45, type: 'object', lookDesc: 'A lockable metal filing cabinet in the corner of the tent.', interactMsg: 'You open the top drawer. It contains files marked "SECRET - SEVRES ALLIANCE". (Type EXAMINE SEVRES PROTOCOL to extract the blueprints!)' }
  ],
  DUNES: [
    { id: 'tent', name: 'Command Tent (North)', x: 200, y: 340, radius: 35, type: 'transition', targetRoom: 'COMMAND', startPos: { x: 400, y: 400 }, lookDesc: 'The entrance flap of the tactical command tent.' },
    { id: 'patrol', name: 'Patrol Commander', x: 550, y: 370, radius: 45, type: 'object', lookDesc: 'An armored patrol commander leaning over a geopolitical map of Sinai. (Type REOPEN STRAITS OF TIRAN after presenting the campaign orders!)' }
  ]
};

let currentCursorMode = 'LOOK'; // 'LOOK', 'INTERACT', 'WALK'
let hoveredHotspot = null;
let arrivalCallback = null;
const sceneImages = {};
let gameLoopActive = false;
let canvasListenersBound = false;
let meParserFormBound = false;

// =============================================================
// ENGINE HELPER FUNCTIONS
// =============================================================
function clampToNavMesh(roomKey, x, y) {
  const area = walkableAreas[roomKey] || { minX: 50, maxX: 750, minY: 340, maxY: 420 };
  return {
    x: Math.max(area.minX, Math.min(area.maxX, x)),
    y: Math.max(area.minY, Math.min(area.maxY, y))
  };
}

function getPlayerScale(y) {
  const horizon = 320;
  const bottom = 430;
  if (y <= horizon) return 0.5;
  if (y >= bottom) return 1.0;
  return 0.5 + 0.5 * ((y - horizon) / (bottom - horizon));
}

function getHotspotAt(roomKey, x, y) {
  const list = hotspots[roomKey] || [];
  for (const hs of list) {
    const dx = hs.x - x;
    const dy = hs.y - y;
    if (Math.sqrt(dx * dx + dy * dy) <= hs.radius) {
      return hs;
    }
  }
  return null;
}

function logToTerminal(text) {
  const logScroll = document.getElementById('me-scroll-screen');
  if (logScroll) {
    const p = document.createElement('p');
    p.className = "me-story-text";
    p.innerText = text;
    logScroll.appendChild(p);
    logScroll.scrollTop = logScroll.scrollHeight;
  }
}

function ensurePlayerAtHotspot(hotspotId) {
  const room = meEpicEngine.state.room;
  const list = hotspots[room] || [];
  const hs = list.find(h => h.id === hotspotId);
  if (hs) {
    player.x = hs.x;
    player.y = hs.y;
    player.targetX = hs.x;
    player.targetY = hs.y;
    player.isWalking = false;
    player.scale = getPlayerScale(player.y);
  }
}

function transitionToRoom(newRoom, startPos, suppressLog) {
  meEpicEngine.state.room = newRoom;
  
  if (startPos) {
    player.x = startPos.x;
    player.y = startPos.y;
  } else {
    player.x = 400;
    player.y = 380;
  }
  player.targetX = player.x;
  player.targetY = player.y;
  player.isWalking = false;
  player.scale = getPlayerScale(player.y);
  arrivalCallback = null;
  
  syncEngineHudDisplay();
  
  const desc = meEpicEngine.rooms[newRoom].description;
  if (!suppressLog) {
    logToTerminal(`\nEntered ${meEpicEngine.rooms[newRoom].name.toUpperCase()}.`);
    logToTerminal(desc);
  }
  AudioEngine.speak(desc);
}

function setCursorMode(mode) {
  currentCursorMode = mode;
  AudioEngine.play('click');
  
  const buttons = ['me-btn-look', 'me-btn-interact', 'me-btn-walk'];
  buttons.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      if (btn.getAttribute('data-mode') === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  });

  const hoverLabel = document.getElementById('me-hover-label');
  if (hoverLabel) {
    hoverLabel.innerText = `${mode} MODE`;
  }
}

// =============================================================
// CANVAS GRAPHICS AND PHYSICS ENGINE
// =============================================================
function preloadSceneImages() {
  const rooms = meEpicEngine.rooms;
  for (const [key, rData] of Object.entries(rooms)) {
    if (rData.image && typeof window.Image === 'function') {
      const img = new Image();
      img.src = rData.image;
      sceneImages[key] = img;
    }
  }
}

function drawScene(ctx, roomKey) {
  const bgImg = sceneImages[roomKey];
  if (bgImg && bgImg.complete && bgImg.naturalWidth !== 0) {
    ctx.drawImage(bgImg, 0, 0, 800, 450);
  } else {
    // Elegant procedural retro grid fallback
    let grad = ctx.createLinearGradient(0, 0, 0, 450);
    if (roomKey === "DECK" || roomKey === "HOLD" || roomKey === "PIER") {
      grad.addColorStop(0, '#0a0f1d');
      grad.addColorStop(0.6, '#17253a');
      grad.addColorStop(1, '#0c1220');
    } else if (roomKey === "OUTPOST" || roomKey === "BUNKER" || roomKey === "LOOKOUT") {
      grad.addColorStop(0, '#1a1005');
      grad.addColorStop(0.6, '#3a1a02');
      grad.addColorStop(1, '#632500');
    } else {
      grad.addColorStop(0, '#100b26');
      grad.addColorStop(0.5, '#4c0519');
      grad.addColorStop(1, '#c2410c');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 450);
    
    // Draw horizon & grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 320);
    ctx.lineTo(800, 320);
    ctx.stroke();
    
    for (let x = -200; x <= 1000; x += 100) {
      ctx.beginPath();
      ctx.moveTo(x, 320);
      ctx.lineTo(x * 1.6 - 240, 450);
      ctx.stroke();
    }
  }
}

function drawHotspots(ctx) {
  const list = hotspots[meEpicEngine.state.room] || [];
  ctx.save();
  for (const hs of list) {
    const pulse = Math.sin(Date.now() / 220) * 3;
    
    // Glowing center dot
    ctx.fillStyle = hs.type === 'transition' ? 'rgba(56, 189, 248, 0.45)' : 'rgba(245, 158, 11, 0.45)';
    ctx.beginPath();
    ctx.arc(hs.x, hs.y, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Glowing outer ring
    ctx.strokeStyle = hs.type === 'transition' ? 'rgba(56, 189, 248, 0.75)' : 'rgba(245, 158, 11, 0.75)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(hs.x, hs.y, 14 + pulse, 0, Math.PI * 2);
    ctx.stroke();
    

  }
  ctx.restore();
}

function drawPlayer(ctx) {
  const { x, y, scale, facing, isWalking, currentFrame } = player;
  const baseWidth = 40;
  const baseHeight = 85;
  const w = baseWidth * scale;
  const h = baseHeight * scale;
  
  ctx.save();
  ctx.translate(x, y);
  
  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.ellipse(0, 0, w * 0.7, h * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.translate(0, -h);
  
  // Body Coat color themed by chapter
  let bodyColor = '#3f6212'; // green military Negev
  if (meEpicEngine.state.chapter === 1) bodyColor = '#475569'; // slate coat Exodus
  if (meEpicEngine.state.chapter === 3) bodyColor = '#0f766e'; // teal Sinai
  
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.moveTo(-w * 0.4, h * 0.85);
  ctx.lineTo(-w * 0.3, h * 0.3);
  ctx.lineTo(w * 0.3, h * 0.3);
  ctx.lineTo(w * 0.4, h * 0.85);
  ctx.closePath();
  ctx.fill();
  
  // Head
  ctx.fillStyle = '#ffedd5';
  ctx.beginPath();
  ctx.arc(0, h * 0.18, w * 0.22, 0, Math.PI * 2);
  ctx.fill();
  
  // Cap
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(0, h * 0.08, w * 0.25, Math.PI, 0);
  ctx.fill();
  
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  if (facing === 'right') {
    ctx.moveTo(-w * 0.1, h * 0.08);
    ctx.lineTo(w * 0.32, h * 0.11);
  } else {
    ctx.moveTo(w * 0.1, h * 0.08);
    ctx.lineTo(-w * 0.32, h * 0.11);
  }
  ctx.stroke();
  
  // Arms
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  if (facing === 'right') {
    ctx.arc(-w * 0.28, h * 0.42, w * 0.09, 0, Math.PI * 2);
    const swing = isWalking ? Math.sin(Date.now() / 110) * 6 : 0;
    ctx.arc(w * 0.22 + swing * 0.2, h * 0.46, w * 0.09, 0, Math.PI * 2);
  } else {
    ctx.arc(w * 0.28, h * 0.42, w * 0.09, 0, Math.PI * 2);
    const swing = isWalking ? Math.sin(Date.now() / 110) * 6 : 0;
    ctx.arc(-w * 0.22 - swing * 0.2, h * 0.46, w * 0.09, 0, Math.PI * 2);
  }
  ctx.fill();
  
  // Legs / Boots
  ctx.strokeStyle = '#1c1917';
  ctx.lineWidth = w * 0.22;
  ctx.lineCap = 'round';
  
  const legYStart = h * 0.82;
  const legYEnd = h * 0.98;
  
  if (isWalking) {
    let leftOffset = 0;
    let rightOffset = 0;
    if (currentFrame === 0) { leftOffset = -6; rightOffset = 6; }
    else if (currentFrame === 1) { leftOffset = 0; rightOffset = 0; }
    else if (currentFrame === 2) { leftOffset = 6; rightOffset = -6; }
    else if (currentFrame === 3) { leftOffset = 0; rightOffset = 0; }
    
    ctx.beginPath();
    ctx.moveTo(-w * 0.16, legYStart);
    ctx.lineTo(-w * 0.16 + leftOffset * scale, legYEnd);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(w * 0.16, legYStart);
    ctx.lineTo(w * 0.16 + rightOffset * scale, legYEnd);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(-w * 0.16, legYStart);
    ctx.lineTo(-w * 0.16, legYEnd);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(w * 0.16, legYStart);
    ctx.lineTo(w * 0.16, legYEnd);
    ctx.stroke();
  }
  
  // Eyes
  ctx.fillStyle = '#000';
  ctx.beginPath();
  if (facing === 'right') {
    ctx.arc(w * 0.08, h * 0.18, 2 * scale, 0, Math.PI * 2);
  } else {
    ctx.arc(-w * 0.08, h * 0.18, 2 * scale, 0, Math.PI * 2);
  }
  ctx.fill();
  
  ctx.restore();
}

function updatePhysics() {
  if (player.isWalking) {
    const dx = player.targetX - player.x;
    const dy = player.targetY - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist > player.speed) {
      player.x += (dx / dist) * player.speed;
      player.y += (dy / dist) * player.speed;
      player.facing = dx > 0 ? 'right' : 'left';
      player.currentFrame = Math.floor(Date.now() / 130) % 4;
    } else {
      player.x = player.targetX;
      player.y = player.targetY;
      player.isWalking = false;
      player.currentFrame = 0;
      
      if (arrivalCallback) {
        const cb = arrivalCallback;
        arrivalCallback = null;
        cb();
      }
    }
    player.scale = getPlayerScale(player.y);
  }
}

function drawFrame() {
  const canvas = document.getElementById('me-adventure-canvas');
  if (!canvas || typeof canvas.getContext !== 'function') return;
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, 800, 450);
  
  drawScene(ctx, meEpicEngine.state.room);
  drawHotspots(ctx);
  drawPlayer(ctx);
  
  if (hoveredHotspot) {
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(hoveredHotspot.x, hoveredHotspot.y, hoveredHotspot.radius + 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw a soft black backdrop box behind the hovered label above the circle for legibility
    const labelText = hoveredHotspot.name.toUpperCase();
    ctx.font = 'bold 11px monospace';
    const textWidth = ctx.measureText(labelText).width;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(hoveredHotspot.x - (textWidth / 2) - 4, hoveredHotspot.y - hoveredHotspot.radius - 23, textWidth + 8, 16);
    
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText(labelText, hoveredHotspot.x, hoveredHotspot.y - hoveredHotspot.radius - 11);
  }
}

function runAnimationFrameLoop() {
  if (!gameLoopActive) return;
  updatePhysics();
  drawFrame();
  requestAnimationFrame(runAnimationFrameLoop);
}

// =============================================================
// DUAL COMMAND INTERPRETER & GCSE PARSER GATES
// =============================================================
const vocabularyMatrix = {
  verbs: {
    examine: ["examine", "inspect", "open", "pry", "check", "peer", "read"],
    look:    ["look", "l", "search", "peer"],
    take:    ["take", "get", "grab", "pocket", "pick", "collect", "steal", "secure"],
    go:      ["go", "move", "walk", "climb", "run", "step", "head", "travel"],
    use:     ["use", "show", "present", "fix", "repair", "splice", "wire", "apply"],
    talk:    ["talk", "speak", "ask", "chat", "inform", "tell"],
    help:    ["help", "commands", "vocab", "hint"],
    inv:     ["inv", "inventory", "bag", "items", "pocket"]
  },
  nouns: {
    crate:       ["crate", "box", "chest", "cargo", "blankets", "wood"],
    certificate: ["certificate", "papers", "paper", "visa", "document", "documents", "pass"],
    officer:     ["officer", "man", "guard", "soldier", "registrar", "desk", "ledger"],
    wire:        ["wire", "spool", "cable", "copper", "parts"],
    radio:       ["radio", "transmitter", "console", "machine", "shortwave"],
    lookout:     ["lookout", "soldier", "guard", "watcher"],
    cabinet:     ["cabinet", "drawer", "files", "folder", "protocol", "sevres"],
    orders:      ["orders", "plans", "deployment", "file"],
    patrol:      ["patrol", "unit", "commander", "half-track", "vehicle"]
  },
  directions: {
    east:  ["east", "e", "gangway", "pier", "right"],
    west:  ["west", "w", "ship", "deck", "left"],
    up:    ["up", "u", "ladder", "deck", "climb"],
    down:  ["down", "d", "hatch", "hold", "ladder"],
    north: ["north", "n", "trench", "lookout", "forward"],
    south: ["south", "s", "bunker", "door", "back"]
  }
};

function flexibleParse(rawInput) {
  const clean = rawInput.trim().toLowerCase();
  if (!clean) return { verb: "", noun: "" };

  const stopWords = ["the", "a", "an", "at", "in", "into", "to", "through", "on", "inside", "with", "around"];
  const tokens = clean.split(/\s+/).filter(t => !stopWords.includes(t));

  let rawVerb = tokens[0] || "";
  let rawNoun = tokens.slice(1).join(" ") || "";

  let isExplicitNonMovementVerb = false;
  for (const [canonicalVerb, synonyms] of Object.entries(vocabularyMatrix.verbs)) {
    if (canonicalVerb !== "go" && synonyms.includes(rawVerb)) {
      isExplicitNonMovementVerb = true;
      break;
    }
  }

  if (!isExplicitNonMovementVerb) {
    for (const word of tokens) {
      for (const [canonicalDir, synonyms] of Object.entries(vocabularyMatrix.directions)) {
        if (synonyms.includes(word)) {
          return { verb: "go", noun: canonicalDir };
        }
      }
    }
  }

  let resolvedVerb = "";
  let resolvedNoun = "";

  for (const [canonicalVerb, synonyms] of Object.entries(vocabularyMatrix.verbs)) {
    if (synonyms.includes(rawVerb)) {
      resolvedVerb = canonicalVerb;
      break;
    }
  }

  for (const [canonicalNoun, synonyms] of Object.entries(vocabularyMatrix.nouns)) {
    if (synonyms.includes(rawNoun)) {
      resolvedNoun = canonicalNoun;
      break;
    }
  }
  
  if (!resolvedNoun) {
    for (const [canonicalNoun, synonyms] of Object.entries(vocabularyMatrix.nouns)) {
      if (synonyms.some(syn => rawNoun.includes(syn))) {
        resolvedNoun = canonicalNoun;
        break;
      }
    }
  }

  if (!resolvedVerb && resolvedNoun && tokens.length === 1) {
    resolvedVerb = "examine";
  }

  return { verb: resolvedVerb, noun: resolvedNoun };
}

function processCommandInterpreter(rawInput) {
  const clean = rawInput.trim().toLowerCase();
  if (!clean) return "";

  // Intercept pronouns "it" or "them" to suggest correct keyword syntax
  const words = clean.split(/\s+/);
  const hasPronoun = words.includes("it") || words.includes("them");
  if (hasPronoun) {
    const verbSyns = {
      take: ["take", "get", "grab", "pick", "collect", "secure"],
      examine: ["examine", "inspect", "look", "search", "check", "peer"],
      use: ["use", "apply", "show", "give"]
    };
    let resolvedVerb = "";
    for (const [canonical, syns] of Object.entries(verbSyns)) {
      if (syns.some(s => words.includes(s))) {
        resolvedVerb = canonical;
        break;
      }
    }
    if (resolvedVerb) {
      AudioEngine.play('fail');
      const roomKey = meEpicEngine.state.room;
      if (roomKey === "HOLD") {
        if (resolvedVerb === "take") {
          return "Specify the exact item. Did you mean TAKE CERTIFICATE?";
        } else if (resolvedVerb === "examine") {
          return "Specify the exact item. Did you mean EXAMINE CRATE?";
        }
      } else if (roomKey === "BUNKER") {
        if (resolvedVerb === "take") {
          return "Specify the exact item. Did you mean TAKE WIRE?";
        } else if (resolvedVerb === "use") {
          return "Specify the exact item. Did you mean USE WIRE?";
        } else if (resolvedVerb === "examine") {
          return "Specify the exact item. Did you mean EXAMINE CRATE?";
        }
      } else if (roomKey === "COMMAND") {
        if (resolvedVerb === "take") {
          return "Specify the exact item. Did you mean TAKE ORDERS?";
        } else if (resolvedVerb === "examine") {
          return "Specify the exact item. Did you mean EXAMINE CABINET?";
        }
      } else if (roomKey === "DUNES") {
        if (resolvedVerb === "use") {
          return "Specify the exact item. Did you mean USE ORDERS?";
        } else if (resolvedVerb === "examine") {
          return "Specify the exact item. Did you mean EXAMINE PATROL?";
        }
      }
    }
  }

  // -------------------------------------------------------------
  // GCSE PROGRESSION GATE 1: TAKE ILLEGAL CERTIFICATE
  // -------------------------------------------------------------
  if (clean === "take illegal certificate" || (meEpicEngine.state.room === "HOLD" && clean === "take certificate")) {
    if (meEpicEngine.state.room !== "HOLD") {
      AudioEngine.play('fail');
      const err = "You cannot take the illegal certificate here. Go to the cargo hold where crates are kept.";
      AudioEngine.speak(err);
      return err;
    }
    
    // Proximity Snap
    ensurePlayerAtHotspot("crate");
    
    meEpicEngine.state.ch1_crateChecked = true;
    if (meEpicEngine.state.inventory.includes("certificate")) {
      AudioEngine.play('click');
      return "You are already carrying this document.";
    }
    meEpicEngine.state.inventory.push("certificate");
    AudioEngine.play('success');
    syncEngineHudDisplay();
    triggerLiveHudInsight(meEpicEngine.insights.ch1_take, false);
    
    const rep = "You pull a forged entry CERTIFICATE from the crate and slide it into your pocket. The stamps look flawlessly authentic.";
    AudioEngine.speak(rep);
    return rep;
  }

  // -------------------------------------------------------------
  // GCSE PROGRESSION GATE 2: BYPASS WHITE PAPER QUOTA
  // -------------------------------------------------------------
  if (clean === "bypass white paper quota" || (meEpicEngine.state.room === "PIER" && (clean === "use certificate" || clean === "show certificate"))) {
    if (meEpicEngine.state.room !== "PIER") {
      AudioEngine.play('fail');
      const err = "You are not at the processing desk. Move to the Pier first.";
      AudioEngine.speak(err);
      return err;
    }
    if (!meEpicEngine.state.inventory.includes("certificate")) {
      AudioEngine.play('fail');
      const err = "You do not possess the required entry certificates to bypass the quota.";
      AudioEngine.speak(err);
      return err;
    }
    
    // Proximity Snap
    ensurePlayerAtHotspot("officer");
    
    meEpicEngine.state.chapter = 2;
    meEpicEngine.state.room = "OUTPOST";
    meEpicEngine.state.inventory = [];
    
    // Reset player position for new act
    player.x = 200;
    player.y = 380;
    player.targetX = 200;
    player.targetY = 380;
    player.isWalking = false;
    player.scale = getPlayerScale(player.y);
    
    AudioEngine.play('success');
    syncEngineHudDisplay();
    triggerLiveHudInsight(meEpicEngine.insights.ch1_win, false);
    
    const rep = "SUCCESSFUL RETRIEVAL ALIGNMENT! The British officer examines the forged certificate, grunts under the strain of the processing queue, and stamps your card. You pass through the gates into Haifa.\n\n---------------------------------------------\n*** CHRONOLOGY ADVANCED: CHAPTER 2 UNLOCKED ***\n---------------------------------------------";
    AudioEngine.speak("Bypass white paper quota passed. Chapter 2 Negev Outpost unlocked.");
    return rep;
  }

  // -------------------------------------------------------------
  // GCSE PROGRESSION GATE 3: SECURE CZECH ARMS SHIPMENT
  // -------------------------------------------------------------
  if (clean === "secure czech arms shipment" || (meEpicEngine.state.room === "BUNKER" && clean === "take wire")) {
    if (meEpicEngine.state.room !== "BUNKER") {
      AudioEngine.play('fail');
      const err = "You cannot secure Czech arms here. You must be in the concrete communications bunker.";
      AudioEngine.speak(err);
      return err;
    }
    
    // Proximity Snap
    ensurePlayerAtHotspot("crate");
    
    if (meEpicEngine.state.inventory.includes("wire")) {
      AudioEngine.play('click');
      return "You are already carrying the wire spool.";
    }
    meEpicEngine.state.inventory.push("wire");
    AudioEngine.play('success');
    syncEngineHudDisplay();
    triggerLiveHudInsight(meEpicEngine.insights.ch2_arms, false);
    
    const rep = "You take the electrical WIRE spool from the Czech armament supply shipment crate.";
    AudioEngine.speak(rep);
    return rep;
  }

  // -------------------------------------------------------------
  // GCSE PROGRESSION GATE 4: CONSOLIDATE ISRAEL DEFENSE FORCES
  // -------------------------------------------------------------
  if (clean === "consolidate israel defense forces" || (meEpicEngine.state.room === "LOOKOUT" && clean === "talk lookout")) {
    if (meEpicEngine.state.room !== "LOOKOUT") {
      AudioEngine.play('fail');
      const err = "You are not at the observation lookout. Head north from the outpost first.";
      AudioEngine.speak(err);
      return err;
    }
    if (!meEpicEngine.state.ch2_reinforcementsCalled) {
      AudioEngine.play('fail');
      const err = "Before consolidating defenses, you must repair the communications radio and call reinforcements.";
      AudioEngine.speak(err);
      return err;
    }
    
    // Proximity Snap
    ensurePlayerAtHotspot("lookout");
    
    meEpicEngine.state.chapter = 3;
    meEpicEngine.state.room = "COMMAND";
    meEpicEngine.state.inventory = [];
    
    // Reset player position for new act
    player.x = 300;
    player.y = 380;
    player.targetX = 300;
    player.targetY = 380;
    player.isWalking = false;
    player.scale = getPlayerScale(player.y);
    
    AudioEngine.play('success');
    syncEngineHudDisplay();
    triggerLiveHudInsight(meEpicEngine.insights.ch2_win, false);
    
    const rep = "SUCCESSFUL STRATEGIC COORDINATION! You inform the lookout that armor support has been confirmed. Backed by Czech arms transfers and a cohesive, unified IDF operational command structure, your unit successfully holds the highway against disjointed Arab coalition moves.\n\n---------------------------------------------\n*** CHRONOLOGY ADVANCED: CHAPTER 3 UNLOCKED ***\n---------------------------------------------";
    AudioEngine.speak("Consolidate Israel Defense Forces passed. Chapter 3 Sinai Command unlocked.");
    return rep;
  }

  // -------------------------------------------------------------
  // GCSE PROGRESSION GATE 5: EXAMINE SEVRES PROTOCOL
  // -------------------------------------------------------------
  if (clean === "examine sevres protocol" || (meEpicEngine.state.room === "COMMAND" && (clean === "examine cabinet" || clean === "take orders" || clean === "open cabinet"))) {
    if (meEpicEngine.state.room !== "COMMAND") {
      AudioEngine.play('fail');
      const err = "You are not in the command tent where secret files are held.";
      AudioEngine.speak(err);
      return err;
    }
    
    // Proximity Snap
    ensurePlayerAtHotspot("cabinet");
    
    meEpicEngine.state.ch3_cabinetChecked = true;
    if (meEpicEngine.state.inventory.includes("orders")) {
      AudioEngine.play('click');
      return "You are already holding the orders.";
    }
    meEpicEngine.state.inventory.push("orders");
    AudioEngine.play('success');
    syncEngineHudDisplay();
    
    const rep = "You pull open the top drawer of the secret cabinet. Inside sits an operational file outlining a secret joint agreement: THE SÈVRES PROTOCOL. It details a plan where Israel launches a pre-emptive strike across Sinai, providing a cover excuse for Britain and France to intervene and retake the Suez Canal. You secure the pre-emptive Sinai campaign deployment ORDERS from the top-secret folder.";
    AudioEngine.speak("Examine Sevres Protocol passed. Orders secured.");
    return rep;
  }

  // -------------------------------------------------------------
  // GCSE PROGRESSION GATE 6: REOPEN STRAITS OF TIRAN
  // -------------------------------------------------------------
  if (clean === "reopen straits of tiran" || (meEpicEngine.state.room === "DUNES" && meEpicEngine.state.ch3_awaitingChokepoint && (clean === "straits of tiran" || clean === "tiran" || clean === "sharm el-sheikh"))) {
    if (meEpicEngine.state.room !== "DUNES") {
      AudioEngine.play('fail');
      const err = "You are not with the patrol unit on the dunes.";
      AudioEngine.speak(err);
      return err;
    }
    if (!meEpicEngine.state.ch3_awaitingChokepoint) {
      AudioEngine.play('fail');
      const err = "The commander is not expecting coordination yet. Present the orders first.";
      AudioEngine.speak(err);
      return err;
    }
    
    // Proximity Snap
    ensurePlayerAtHotspot("patrol");
    
    meEpicEngine.state.ch3_victory = true;
    meEpicEngine.state.ch3_awaitingChokepoint = false;
    AudioEngine.play('success');
    syncEngineHudDisplay();
    triggerLiveHudInsight(meEpicEngine.insights.ch3_suez, false);
    
    const rep = "SUCCESSFUL ACCREDITATION SEQUENCE PASSED!\n\nCorrect. The Straits of Tiran (controlled by Sharm el-Sheikh) is the vital chokepoint. The patrol commander nods and shouts orders. The half-track vehicle engines roar to life, advancing rapidly across the Sinai wastes.\n\nYour swift pre-emptive strike sweeps through Egyptian defenses in hours. Although intense political and financial pressure from US President Eisenhower eventually forces an Anglo-French-Israeli withdrawal from Egyptian territory, your offensive successfully reopens the vital shipping lanes through the Straits of Tiran and demonstrates Israel's clear regional military superiority.\n\n*** 🏆 SIMULATOR EXAM PROTOCOLS FULLY COMPLETED // KEY TOPIC 1 REVISION ANALYSIS METRICS LOCKED IN SECURE ***";
    AudioEngine.speak("Reopen Straits of Tiran passed. Revision exam simulator completed successfully.");
    return rep;
  }

  // -------------------------------------------------------------
  // STANDARD ADVENTURE ACTIONS & NAVIGATIONAL FLOWS
  // -------------------------------------------------------------
  if (meEpicEngine.state.chapter === 3 && meEpicEngine.state.room === "DUNES" && meEpicEngine.state.ch3_awaitingChokepoint) {
    // Final puzzle hint intercept
    const norm = clean.replace(/[^a-z0-9\s]/g, "");
    if (norm.includes("patrol") || norm.includes("commander") || norm.includes("lookout") || norm.includes("examine") || norm.includes("talk")) {
      AudioEngine.play('click');
      return "The commander looks at the southern coast on his map: 'Examine the geopolitical map closely. Tell me the name of the specific geographic chokepoint where the Egyptian blockade is positioned!'";
    }
  }

  const currentRoomData = meEpicEngine.rooms[meEpicEngine.state.room];
  const parsed = flexibleParse(rawInput);
  let { verb, noun } = parsed;
  if (verb === "look" && noun) {
    verb = "examine";
  }

  // Check custom exits
  if (verb === "go" && currentRoomData && currentRoomData.exits) {
    let targetDir = noun;
    if (currentRoomData.exits[targetDir]) {
      const dest = currentRoomData.exits[targetDir];
      
      // Enforce lock traps
      if (meEpicEngine.state.room === "DECK" && targetDir === "east" && !meEpicEngine.state.inventory.includes("certificate")) {
        AudioEngine.play('fail');
        triggerLiveHudInsight(meEpicEngine.insights.ch1_win, true);
        const trap = "EXAM TRAP ENCOUNTERED: You descend the gangway onto the pier. British Mandate soldiers immediately intercept you. Without a legal entry allocation document under the restricted quota limits, you are arrested and transferred onto an extraction ship bound for internment camps in Cyprus. You must find proper papers to proceed. You head back up onto the deck.";
        AudioEngine.speak(trap);
        return trap;
      }
      if (meEpicEngine.state.room === "LOOKOUT" && targetDir === "south" && meEpicEngine.state.ch2_radioRepaired && !meEpicEngine.state.ch2_reinforcementsCalled) {
        AudioEngine.play('fail');
        return "Before leaving the observation post, you should use the repaired radio transmitter to call in coordinates.";
      }

      // Execute transition
      // Find starting point for player in target room
      let startPos = { x: 400, y: 380 };
      const currentList = hotspots[meEpicEngine.state.room] || [];
      // Find a transition hotspot that links to the target room
      const matchingHs = currentList.find(h => h.type === 'transition' && h.targetRoom === dest);
      if (matchingHs && matchingHs.startPos) {
        startPos = matchingHs.startPos;
      }
      
      transitionToRoom(dest, startPos, true);
      return "You move " + targetDir.toUpperCase() + ".\n\n" + meEpicEngine.rooms[dest].description;
    }
    
    // Alternate room name match
    for (const [dir, name] of Object.entries(currentRoomData.exits)) {
      if (name.toLowerCase() === noun) {
        let startPos = { x: 400, y: 380 };
        const currentList = hotspots[meEpicEngine.state.room] || [];
        const matchingHs = currentList.find(h => h.type === 'transition' && h.targetRoom === name);
        if (matchingHs && matchingHs.startPos) {
          startPos = matchingHs.startPos;
        }
        transitionToRoom(name, startPos, true);
        return "You move " + name.toUpperCase() + ".\n\n" + meEpicEngine.rooms[name].description;
      }
    }
    AudioEngine.play('fail');
    return "You can't move that way. Check walkable routes or hotspots.";
  }

  if (verb === "help") {
    AudioEngine.play('click');
    return "VALID ADVENTURE ACTIONS:\n• Click or Tap on canvas hotspots to Walk, Look or Interact.\n• Type commands inside terminal: 'TAKE ILLEGAL CERTIFICATE', 'BYPASS WHITE PAPER QUOTA', 'SECURE CZECH ARMS SHIPMENT', 'CONSOLIDATE ISRAEL DEFENSE FORCES', 'EXAMINE SEVRES PROTOCOL', or 'REOPEN STRAITS OF TIRAN'.\n• Common navigation: 'GO EAST', 'GO DOWN', 'GO NORTH'. Type 'INV' to check inventory.";
  }

  if (verb === "look") {
    AudioEngine.play('click');
    AudioEngine.speak(currentRoomData.description);
    return currentRoomData.description;
  }

  if (verb === "inv") {
    AudioEngine.play('click');
    if (meEpicEngine.state.inventory.length === 0) return "Your inventory is currently empty.";
    return "Current Inventory Items: " + meEpicEngine.state.inventory.map(i => i.toUpperCase()).join(", ");
  }

  if (verb === "examine") {
    if (!noun) return "What do you want to examine?";
    
    if (meEpicEngine.state.room === "HOLD" && noun === "crate") {
      ensurePlayerAtHotspot("crate");
      meEpicEngine.state.ch1_crateChecked = true;
      AudioEngine.play('success');
      return "You pry open the loose slatted lid of the shipping crate. Tucked safely beneath some heavy wool blankets, you uncover a hidden stack of forged British Mandate entry CERTIFICATES.";
    }
    if (meEpicEngine.state.room === "PIER" && noun === "officer") {
      ensurePlayerAtHotspot("officer");
      AudioEngine.play('click');
      return "The Mandate Officer is cross-referencing names against a ledger. He looks highly stressed by the backlog of arrivals and barks: 'Present your entry documents or step toward the detention area!'";
    }
    if (meEpicEngine.state.room === "BUNKER" && noun === "radio") {
      ensurePlayerAtHotspot("radio");
      AudioEngine.play('click');
      return "It's an operational shortwave transmitter unit, but the copper antenna line has been severed from the connection terminal base. It requires a piece of wire to fix the signal chain.";
    }
    if (meEpicEngine.state.room === "BUNKER" && noun === "crate") {
      ensurePlayerAtHotspot("crate");
      AudioEngine.play('click');
      return "You look inside the military supply box. It contains newly arrived rifles and equipment parts clearly stamped: MANUFACTURED IN PRAGUE. You notice a spool of electrical WIRE resting inside.";
    }
    if (meEpicEngine.state.room === "COMMAND" && noun === "cabinet") {
      ensurePlayerAtHotspot("cabinet");
      meEpicEngine.state.ch3_cabinetChecked = true;
      AudioEngine.play('success');
      return "You pull open the top drawer of the secret cabinet. Inside sits an operational file outlining a secret joint agreement: THE SÈVRES PROTOCOL. It details a plan where Israel launches a pre-emptive strike across Sinai, providing a cover excuse for Britain and France to intervene and retake the Suez Canal. You see a set of strategic military ORDERS clipped to the folder.";
    }
    if (meEpicEngine.state.room === "DUNES" && noun === "patrol") {
      ensurePlayerAtHotspot("patrol");
      AudioEngine.play('click');
      if (meEpicEngine.state.ch3_awaitingChokepoint) {
        return "The commander looks at the southern coast on his map: 'Examine the geopolitical map closely. Tell me the name of the specific geographic chokepoint where the Egyptian blockade is positioned!'";
      }
      return "The armored unit commander is checking his maps. He calls out: 'Our half-tracks are fueled and ready to push toward the canal, but we must verify our strategic campaign targets before we cross. Deliver the operational deployment orders!'";
    }

    AudioEngine.play('click');
    return "You check the " + noun.toUpperCase() + " but notice nothing out of the ordinary.";
  }

  if (verb === "use") {
    if (noun === "wire" && meEpicEngine.state.inventory.includes("wire")) {
      if (meEpicEngine.state.room === "BUNKER") {
        ensurePlayerAtHotspot("radio");
        meEpicEngine.state.ch2_radioRepaired = true;
        meEpicEngine.state.inventory = meEpicEngine.state.inventory.filter(i => i !== "wire");
        AudioEngine.play('success');
        syncEngineHudDisplay();
        return "You strip the insulation wire and splice it onto the broken terminal link. The signal power gauge on the shortwave radio console lights up instantly. The machine is fully functional!";
      }
    }
    if (noun === "radio") {
      if ((meEpicEngine.state.room === "BUNKER" || meEpicEngine.state.room === "LOOKOUT" || meEpicEngine.state.room === "OUTPOST") && meEpicEngine.state.ch2_radioRepaired) {
        ensurePlayerAtHotspot("radio");
        meEpicEngine.state.ch2_reinforcementsCalled = true;
        AudioEngine.play('success');
        return "You adjust the frequency dials and broadcast your operational sector code. Central Command acknowledges, confirming heavy weaponry and armor reinforcements are being redirected to defend your line.";
      }
      AudioEngine.play('fail');
      return "The radio console is dead. It requires circuit repair wire first.";
    }
    if (noun === "orders" && meEpicEngine.state.inventory.includes("orders")) {
      if (meEpicEngine.state.room === "DUNES") {
        ensurePlayerAtHotspot("patrol");
        meEpicEngine.state.ch3_awaitingChokepoint = true;
        meEpicEngine.state.inventory = meEpicEngine.state.inventory.filter(i => i !== "orders");
        AudioEngine.play('success');
        syncEngineHudDisplay();
        return "Operational orders verified by the commander!\n\nHowever, he points at the map: 'Central Intelligence reports that Egyptian forces have blockaded our shipping lanes at the southern tip of the Sinai Peninsula, cutting off our port of Eilat. Examine the live map display closely.\n\nType the name of the specific geographic chokepoint where the blockade is positioned so we can dispatch the patrol half-tracks!'";
      }
    }
  }

  if (verb === "talk") {
    if (meEpicEngine.state.room === "LOOKOUT" && noun === "lookout") {
      ensurePlayerAtHotspot("lookout");
      if (meEpicEngine.state.ch2_reinforcementsCalled) {
        // execute final chapter advance
        meEpicEngine.state.chapter = 3;
        meEpicEngine.state.room = "COMMAND";
        meEpicEngine.state.inventory = [];
        
        player.x = 300;
        player.y = 380;
        player.targetX = 300;
        player.targetY = 380;
        player.isWalking = false;
        player.scale = getPlayerScale(player.y);
        
        AudioEngine.play('success');
        syncEngineHudDisplay();
        triggerLiveHudInsight(meEpicEngine.insights.ch2_win, false);
        return "SUCCESSFUL STRATEGIC COORDINATION! You inform the lookout that armor support has been confirmed. Backed by Czech arms transfers and a cohesive, unified IDF operational command structure, your unit successfully holds the highway against disjointed Arab coalition moves.\n\n---------------------------------------------\n*** CHRONOLOGY ADVANCED: CHAPTER 3 UNLOCKED ***\n---------------------------------------------";
      }
      AudioEngine.play('click');
      return "The lookout shouts: 'Enemy armor is advancing! We must fix the transmitter radio inside the bunker and call reinforcements, or we will be overrun!'";
    }
  }

  AudioEngine.play('fail');
  const err = "I don't recognize that specific command formulation. Use LOOK/INTERACT or type HELP.";
  AudioEngine.speak(err);
  return err;
}

// =============================================================
// HUD & MAP GRAPHICS SYNC
// =============================================================
function syncEngineHudDisplay() {
  const chapHud = document.getElementById('me-chap-hud');
  const locHud = document.getElementById('me-loc-hud');
  const invHud = document.getElementById('me-inv-hud');
  
  if (chapHud) chapHud.innerText = meEpicEngine.chapters[meEpicEngine.state.chapter];
  if (locHud) locHud.innerText = meEpicEngine.rooms[meEpicEngine.state.room].name;
  
  if (invHud) {
    const formatItem = (item) => {
      const mapping = {
        certificate: "ILLEGAL CERTIFICATE",
        wire: "SPOOL OF WIRE",
        orders: "CAMPAIGN ORDERS"
      };
      return mapping[item.toLowerCase()] || item.toUpperCase();
    };
    const displayVal = meEpicEngine.state.inventory.length === 0 
      ? "EMPTY" 
      : meEpicEngine.state.inventory.map(formatItem).join(", ");
    invHud.innerText = displayVal;
    
    // Support inv-display / me-inv-display if present
    const altInv = document.getElementById('me-inv-display') || document.getElementById('inv-display');
    if (altInv) {
      altInv.innerText = "INV: " + displayVal;
    }
  }
}

function triggerLiveHudInsight(text, isErrorState) {
  const box = document.getElementById('me-exam-insight');
  if (box) {
    box.innerHTML = `<button class="me-insight-close-btn" onclick="this.parentElement.classList.add('me-hidden')">&times;</button><span>${text}</span>`;
    box.className = isErrorState ? "me-insight-panel me-error-node" : "me-insight-panel";
    box.classList.remove('me-hidden');

    if (window.meInsightTimeout) {
      clearTimeout(window.meInsightTimeout);
    }
    window.meInsightTimeout = setTimeout(() => {
      box.classList.add('me-hidden');
    }, 15000);
  }
}

// =============================================================
// INITIALIZE GAME WORKSPACE
// =============================================================
export function initParserGame() {
  meEpicEngine.state.chapter = 1;
  meEpicEngine.state.room = "DECK";
  meEpicEngine.state.inventory = [];
  meEpicEngine.state.ch1_crateChecked = false;
  meEpicEngine.state.ch2_wireSecured = false;
  meEpicEngine.state.ch2_radioRepaired = false;
  meEpicEngine.state.ch2_reinforcementsCalled = false;
  meEpicEngine.state.ch3_cabinetChecked = false;
  meEpicEngine.state.ch3_awaitingChokepoint = false;
  meEpicEngine.state.ch3_victory = false;

  // Initialize Player Pos
  player.x = 150;
  player.y = 360;
  player.targetX = 150;
  player.targetY = 360;
  player.isWalking = false;
  player.scale = getPlayerScale(player.y);
  arrivalCallback = null;
  hoveredHotspot = null;

  preloadSceneImages();

  // Reset Console Terminal scroll log
  const logContainer = document.getElementById('me-scroll-screen');
  if (logContainer) {
    logContainer.innerHTML = `
      <p class="me-sys-text">*** Chronology Command: Haifa to Sinai (1947–1956) ***</p>
      <p class="me-sys-text">EDEXCEL SPECIFICATION P5 // KEY TOPIC 1 INTERACTIVE CHRONOLOGY</p>
      <p class="me-sys-text">INSTRUCTIONS: CLICK FLASHING MARKERS ON THE SCENE TO MOVE OR INTERACT. TYPE CORE COMMANDS LIKE 'LOOK', 'EXAMINE', OR 'USE' IN THE TERMINAL. TYPE 'HELP' FOR VERBS.</p>
      <hr class="me-terminal-line">
      <p id="me-story-output" class="me-story-text">${meEpicEngine.rooms.DECK.description}</p>
    `;
  }

  const insight = document.getElementById('me-exam-insight');
  if (insight) {
    insight.classList.add('me-hidden');
  }

  syncEngineHudDisplay();

  // Start Canvas animation request loop
  const canvas = document.getElementById('me-adventure-canvas');
  if (canvas && typeof canvas.getContext === 'function') {
    gameLoopActive = true;
    startGameLoop();
    
    // Bind canvas event listeners if not already bound
    if (!canvasListenersBound) {
      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const mX = (e.clientX - rect.left) * scaleX;
        const mY = (e.clientY - rect.top) * scaleY;
        
        const hs = getHotspotAt(meEpicEngine.state.room, mX, mY);
        hoveredHotspot = hs;
        
        if (hs) {
          canvas.style.cursor = 'pointer';
        } else {
          canvas.style.cursor = 'default';
        }
      });
      
      canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;
        
        const hs = getHotspotAt(meEpicEngine.state.room, clickX, clickY);
        
        if (hs) {
          AudioEngine.play('click');
          logToTerminal(`👣 walking to: ${hs.name.toUpperCase()}`);
          
          const target = clampToNavMesh(meEpicEngine.state.room, hs.x, hs.y);
          player.targetX = target.x;
          player.targetY = target.y;
          player.isWalking = true;
          
          arrivalCallback = () => {
            if (hs.type === 'transition') {
              transitionToRoom(hs.targetRoom, hs.startPos);
            } else {
              logToTerminal(hs.interactMsg);
              AudioEngine.speak(hs.interactMsg);
              
              // Pre-populate terminal input and print a hint
              let command = "";
              let hint = "";
              if (hs.id === 'crate' && meEpicEngine.state.room === 'HOLD') {
                command = "TAKE ILLEGAL CERTIFICATE";
                hint = "* Hint: Type 'TAKE ILLEGAL CERTIFICATE' (or click again) to secure the document.";
              } else if (hs.id === 'officer' && meEpicEngine.state.room === 'PIER') {
                command = "BYPASS WHITE PAPER QUOTA";
                hint = "* Hint: Type 'BYPASS WHITE PAPER QUOTA' to present your papers.";
              } else if (hs.id === 'crate' && meEpicEngine.state.room === 'BUNKER') {
                command = "SECURE CZECH ARMS SHIPMENT";
                hint = "* Hint: Type 'SECURE CZECH ARMS SHIPMENT' to collect the copper wire.";
              } else if (hs.id === 'radio' && meEpicEngine.state.room === 'BUNKER') {
                command = "USE WIRE";
                hint = "* Hint: Type 'USE WIRE' to repair the radio console.";
              } else if (hs.id === 'lookout' && meEpicEngine.state.room === 'LOOKOUT') {
                command = "CONSOLIDATE ISRAEL DEFENSE FORCES";
                hint = "* Hint: Type 'CONSOLIDATE ISRAEL DEFENSE FORCES' to coordinate reinforcements.";
              } else if (hs.id === 'cabinet' && meEpicEngine.state.room === 'COMMAND') {
                command = "EXAMINE SEVRES PROTOCOL";
                hint = "* Hint: Type 'EXAMINE SEVRES PROTOCOL' to search the cabinet.";
              } else if (hs.id === 'patrol' && meEpicEngine.state.room === 'DUNES') {
                if (meEpicEngine.state.ch3_awaitingChokepoint) {
                  command = "REOPEN STRAITS OF TIRAN";
                  hint = "* Hint: Type 'REOPEN STRAITS OF TIRAN' to verify the strategic chokepoint.";
                } else {
                  command = "USE ORDERS";
                  hint = "* Hint: Type 'USE ORDERS' to present the campaign plans to the commander.";
                }
              }
              
              if (command) {
                const inputField = document.getElementById('me-user-input');
                if (inputField) {
                  inputField.value = command;
                  inputField.focus();
                }
                if (hint) {
                  const hintPara = document.createElement('p');
                  hintPara.className = "me-sys-text";
                  hintPara.style.color = "#38bdf8";
                  hintPara.innerText = hint;
                  const logScroll = document.getElementById('me-scroll-screen');
                  if (logScroll) {
                    logScroll.appendChild(hintPara);
                    logScroll.scrollTop = logScroll.scrollHeight;
                  }
                }
              }
            }
          };
        } else {
          AudioEngine.play('click');
          const target = clampToNavMesh(meEpicEngine.state.room, clickX, clickY);
          player.targetX = target.x;
          player.targetY = target.y;
          player.isWalking = true;
          arrivalCallback = null;
        }
      });
      
      canvasListenersBound = true;
    }
  }

  // Bind Action Bar buttons
  const modes = ['LOOK', 'INTERACT', 'WALK'];
  modes.forEach(mode => {
    const id = `me-btn-${mode.toLowerCase()}`;
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = (e) => {
        e.preventDefault();
        setCursorMode(mode);
      };
    }
  });

  // Bind Console Parser submit form
  if (!meParserFormBound) {
    const formElement = document.getElementById('me-parser-form');
    const inputField = document.getElementById('me-user-input');
    if (formElement && inputField) {
      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        const rawLine = inputField.value.trim();
        if (!rawLine) return;

        const logScroll = document.getElementById('me-scroll-screen');
        if (logScroll) {
          const userParagraph = document.createElement('p');
          userParagraph.className = "me-user-print";
          userParagraph.innerText = "> " + rawLine.toUpperCase();
          logScroll.appendChild(userParagraph);

          const feedbackReply = processCommandInterpreter(rawLine);
          if (feedbackReply) {
            const storyParagraph = document.createElement('p');
            storyParagraph.className = "me-story-text";
            storyParagraph.innerText = feedbackReply;
            logScroll.appendChild(storyParagraph);
          }

          inputField.value = "";
          logScroll.scrollTop = logScroll.scrollHeight;
        }
      });
      const meVoiceBtn = document.getElementById('me-voice-btn');
      if (meVoiceBtn) {
        meVoiceBtn.onclick = (e) => {
          e.preventDefault();
          const logScroll = document.getElementById('me-scroll-screen');
          if (logScroll) {
            const paras = logScroll.querySelectorAll('p.me-story-text');
            if (paras.length > 0) {
              const lastPara = paras[paras.length - 1];
              AudioEngine.speak(lastPara.innerText, null, null, null, true);
            }
          }
        };
      }
      meParserFormBound = true;
    }
  }
}

function startGameLoop() {
  gameLoopActive = true;
  runAnimationFrameLoop();
}

// Export hooks globally for views and automated tests
window.initParserGame = initParserGame;
window.meEpicEngine = meEpicEngine;
window.processCommandInterpreter = processCommandInterpreter;

// CHRONOLOGY PARSER RETRO TEXT ADVENTURE GAME ENGINE
// =============================================================

const jaffaEpicEngine = {
  state: {
    chapter: 1,
    room: "HOUSE",
    inventory: [],
    ch1_deedsSecured: false,
    ch2_rationsSecured: false,
    ch3_awaitingChokepoint: false,
    ch3_victory: false
  },

  chapters: {
    1: "1: CIVIL WAR (1947-48)",
    2: "2: THE WAR & EXODUS (1948)",
    3: "3: REFUGEE CAMPS (1949-53)"
  },

  rooms: {
    HOUSE: {
      chap: 1, name: "FAMILY HOUSE", mapLabel: "JAFFA URBAN GRID", mapCoords: [32.052, 34.753], mapZoom: 13, image: "assets/scenes/jaffa_house.png",
      description: "You are inside your family home in Jaffa (April 1948). The UN Partition plan has triggered a brutal, localized civil war. Outside, shortwave radio broadcasts are reporting the tragic massacre of Palestinian villagers at DEIR YASSIN by extremist Irgun and Lehi militias. The terrifying news spreads absolute panic through the streets as families pack what they can carry.\nAn old wooden DESK sits in the corner. To the West, the street leads out toward the crowded JAFFA HARBOR.",
      exits: { west: "HARBOR" }
    },
    HARBOR: {
      chap: 1, name: "JAFFA HARBOR", mapLabel: "JAFFA PORT SLIPWAY", mapCoords: [32.054, 34.747], mapZoom: 13, image: "assets/scenes/jaffa_harbor.png",
      description: "You are at the water's edge. In the wake of the panic caused by Deir Yassin and intense mortar shelling, Jaffa's society is collapsing. Thousands are jamming onto fishing boats. Fleeing by sea or heading SOUTH on foot toward the advancing Egyptian army lines are your only options.\nThe open coastal highway leading SOUTH stretches out ahead of you.",
      exits: { east: "HOUSE", south: "ROAD" }
    },
    ROAD: {
      chap: 2, name: "COASTAL EXODUS ROAD", mapLabel: "1948-49 WAR BORDER LINES", mapCoords: [31.504, 34.455], mapZoom: 10, image: "assets/scenes/jaffa_road.png",
      description: "May 1948. The British Mandate has ended, Israel has declared statehood, and the international ARAB-ISRAELI WAR has erupted. Egyptian military units are passing you, marching north to engage Israeli forces, while you march south alongside 700,000 displaced Palestinians in the Nakba.\nAhead, the newly hemmed-in GAZA STRIP has become a massive humanitarian zone. A relief station tracking RATIONS sits by the camp entrance.",
      exits: { south: "CAMPS" }
    },
    CAMPS: {
      chap: 2, name: "GAZA REFUGEE CAMP", mapLabel: "AL-SHATI REFUGEE SECTOR", mapCoords: [31.531, 34.441], mapZoom: 13, image: "assets/scenes/jaffa_camps.png",
      description: "You are inside a permanent refugee camp. The 1949 Armistice Agreements have been signed, locking the borders in place and ending the open warfare, but leaving you in exile. From the wire perimeter fencing, you can see your original family lands across the armistice line.\nA recruitment group of FEDAYEEN guerrilla fighters has gathered near the eastern border wall.",
      exits: { north: "ROAD" }
    }
  },

  insights: {
    ch1_deeds: "🍊 GCSE Fact Check (KT1.2): The civil war phase (Nov 1947–May 1948) saw intense psychological warfare. The April 1948 attack on the village of Deir Yassin by Jewish paramilitary groups resulted in the deaths of over 100 civilians. Reports of the tragedy caused widespread terror, triggering the mass flight of Palestinians from urban centers like Jaffa and Haifa before Arab armies even entered the conflict.",
    ch2_nakba: "⛺ GCSE Fact Check (KT1.2): On May 15, 1948, the conflict escalated into an international war as Egypt, Jordan, Syria, and Iraq invaded. Despite initial Arab advances, unified Israeli forces secured key territories. The 1949 Armistice Lines left the Gaza Strip under Egyptian administration and the West Bank under Jordanian control, solidifying the displacement of 700,000 refugees.",
    ch3_feda: "⚔️ GCSE Fact Check (KT1.2/2.2): Because the 1949 armistice agreements failed to solve the political status of refugees or grant a 'Right of Return', displaced Palestinians formed the Fedayeen. Their cross-border raids from Gaza in the early 1950s led to harsh Israeli military reprisal policies, severely destabilizing the region ahead of the 1956 Suez Crisis."
  }
};

let jaffaParserFormBound = false;
let jaffaGameMap = null;
let jaffaActiveLayerGroup = null;

function initJaffaGameMap() {
  // Map removed to make picture bigger
}

function syncJaffaGeographicLeafletMap(roomKey, chapterNum) {
  const headerElement = document.getElementById('jaffa-canvas-header');
  const roomData = jaffaEpicEngine.rooms[roomKey];
  if (roomData) {
    if (headerElement) {
      headerElement.innerHTML = `📷 ${roomData.name.toUpperCase()}`;
    }
    const sceneImg = document.getElementById('jaffa-scene-img');
    if (sceneImg && roomData.image) {
      sceneImg.src = roomData.image;
    }
  }
}

function syncJaffaEngineHudDisplay() {
  const chapHud = document.getElementById('jaffa-chap-hud');
  const locHud = document.getElementById('jaffa-loc-hud');
  const invHud = document.getElementById('jaffa-inv-hud');
  
  if (chapHud) chapHud.innerText = jaffaEpicEngine.chapters[jaffaEpicEngine.state.chapter];
  if (locHud) locHud.innerText = jaffaEpicEngine.state.room;
  
  if (invHud) {
    const formatItem = (item) => {
      const mapping = {
        deeds: "JAFFA LAND DEEDS",
        rations: "RATIONS CARD"
      };
      return mapping[item.toLowerCase()] || item.toUpperCase();
    };
    const displayVal = jaffaEpicEngine.state.inventory.length === 0 
      ? "EMPTY" 
      : jaffaEpicEngine.state.inventory.map(formatItem).join(", ");
    invHud.innerText = displayVal;
    
    // Support inv-display / jaffa-inv-display if present
    const altInv = document.getElementById('jaffa-inv-display') || document.getElementById('inv-display');
    if (altInv) {
      altInv.innerText = "INV: " + displayVal;
    }
  }

  // Update Jaffa pulsing radar dot position/visibility
  const radarDot = document.getElementById('jaffa-radar-dot');
  if (radarDot && radarDot.style) {
    const roomKey = jaffaEpicEngine.state.room;
    const jaffaHotspots = {
      HOUSE: { top: "75%", left: "55%", command: "EXAMINE DESK", hint: "* Hint: Try typing 'EXAMINE DESK' to inspect the wooden desk in the corner." },
      ROAD: { top: "65%", left: "45%", command: "EXAMINE STATION", hint: "* Hint: Try typing 'EXAMINE STATION' to check the relief station." },
      CAMPS: { top: "70%", left: "50%", command: "EXAMINE FEDAYEEN", hint: "* Hint: Try typing 'EXAMINE FEDAYEEN' (or 'Shati') to speak with the recruiter." }
    };
    const hs = jaffaHotspots[roomKey];
    if (hs) {
      radarDot.style.top = hs.top;
      radarDot.style.left = hs.left;
      radarDot.style.display = "block";
      radarDot.onclick = (e) => {
        e.preventDefault();
        const inputField = document.getElementById('jaffa-user-input');
        if (inputField) {
          inputField.value = hs.command;
          inputField.focus();
        }
        const logScroll = document.getElementById('jaffa-scroll-screen');
        if (logScroll) {
          const hintPara = document.createElement('p');
          hintPara.className = "me-sys-text";
          hintPara.style.color = "#38bdf8";
          hintPara.innerText = hs.hint;
          logScroll.appendChild(hintPara);
          logScroll.scrollTop = logScroll.scrollHeight;
        }
        AudioEngine.play('click');
      };
    } else {
      radarDot.style.display = "none";
    }
  }

  // Sync leaflet map locations and overlays
  syncJaffaGeographicLeafletMap(jaffaEpicEngine.state.room, jaffaEpicEngine.state.chapter);
}

function triggerJaffaLiveHudInsight(text, isErrorState) {
  const box = document.getElementById('jaffa-exam-insight');
  if (box) {
    box.innerHTML = `<button class="me-insight-close-btn" onclick="this.parentElement.classList.add('me-hidden')">&times;</button><span>${text}</span>`;
    box.className = isErrorState ? "me-insight-panel me-error-node" : "me-insight-panel";
    box.classList.remove('me-hidden');

    if (window.jaffaInsightTimeout) {
      clearTimeout(window.jaffaInsightTimeout);
    }
    window.jaffaInsightTimeout = setTimeout(() => {
      box.classList.add('me-hidden');
    }, 15000);
  }
}

// Upgraded Input Normalizer Matrix
const jaffaVocabularyMatrix = {
  verbs: {
    examine: ["examine", "inspect", "look", "search", "open", "pry", "check", "peer", "read"],
    take:    ["take", "get", "grab", "pocket", "pick", "collect", "steal", "secure"],
    go:      ["go", "move", "walk", "climb", "run", "step", "head", "travel"],
    use:     ["use", "show", "present", "fix", "repair", "splice", "wire", "apply"],
    talk:    ["talk", "speak", "ask", "chat", "inform", "tell"],
    help:    ["help", "commands", "vocab", "hint"],
    inv:     ["inv", "inventory", "bag", "items", "pocket"]
  },
  nouns: {
    crate:       ["crate", "box", "chest", "cargo", "blankets", "wood"],
    certificate: ["certificate", "papers", "paper", "visa", "document", "documents", "pass"],
    officer:     ["officer", "man", "guard", "soldier", "registrar", "ledger"],
    wire:        ["wire", "spool", "cable", "copper", "parts"],
    radio:       ["radio", "transmitter", "console", "machine", "shortwave"],
    lookout:     ["lookout", "soldier", "guard", "watcher"],
    cabinet:     ["cabinet", "drawer", "files", "folder", "protocol", "sevres"],
    orders:      ["orders", "plans", "deployment", "file"],
    patrol:      ["patrol", "unit", "commander", "half-track", "vehicle"],
    desk:        ["desk", "drawer", "corner", "table"],
    deeds:       ["deeds", "papers", "land", "ownership"],
    station:     ["station", "relief", "worker", "table"],
    rations:     ["rations", "card", "food", "coupon"],
    fedayeen:    ["fedayeen", "fighters", "guerrillas", "commander", "recruiter", "group"]
  },
  directions: {
    east:  ["east", "e", "gangway", "pier", "right"],
    west:  ["west", "w", "ship", "deck", "left"],
    up:    ["up", "u", "ladder", "deck", "climb"],
    down:  ["down", "d", "hatch", "hold", "ladder"],
    north: ["north", "n", "trench", "lookout", "forward"],
    south: ["south", "s", "bunker", "door", "back"]
  }
};

/**
 * Flexible Parser: Resolves fuzzy text inputs into standard engine tokens
 * @param {string} rawInput - The user's untrusted text entry
 * @returns {Object} Cleaned { verb, noun } pairing
 */
function jaffaFlexibleParse(rawInput) {
  const clean = rawInput.trim().toLowerCase();
  if (!clean) return { verb: "", noun: "" };

  // Strip non-essential fluff words common in student text input
  const stopWords = ["the", "a", "an", "at", "in", "into", "to", "through", "on", "inside", "with", "around"];
  const tokens = clean.split(/\s+/).filter(t => !stopWords.includes(t));

  let rawVerb = tokens[0] || "";
  let rawNoun = tokens.slice(1).join(" ") || "";

  // Check if the first word is a known non-movement verb
  let isExplicitNonMovementVerb = false;
  for (const [canonicalVerb, synonyms] of Object.entries(jaffaVocabularyMatrix.verbs)) {
    if (canonicalVerb !== "go" && synonyms.includes(rawVerb)) {
      isExplicitNonMovementVerb = true;
      break;
    }
  }

  // 1. Resolve Direction Short-cuts (only if not preceded by a non-movement verb)
  if (!isExplicitNonMovementVerb) {
    for (const word of tokens) {
      for (const [canonicalDir, synonyms] of Object.entries(jaffaVocabularyMatrix.directions)) {
        if (synonyms.includes(word)) {
          return { verb: "go", noun: canonicalDir };
        }
      }
    }
  }

  let resolvedVerb = "";
  let resolvedNoun = "";

  // 2. Resolve Global Verbs
  for (const [canonicalVerb, synonyms] of Object.entries(jaffaVocabularyMatrix.verbs)) {
    if (synonyms.includes(rawVerb)) {
      resolvedVerb = canonicalVerb;
      break;
    }
  }

  // 3. Resolve Global Nouns (handles loose phrases or partial entries)
  // First pass: look for exact matches in the synonyms
  for (const [canonicalNoun, synonyms] of Object.entries(jaffaVocabularyMatrix.nouns)) {
    if (synonyms.includes(rawNoun)) {
      resolvedNoun = canonicalNoun;
      break;
    }
  }
  // Second pass: look for substring matches
  if (!resolvedNoun) {
    for (const [canonicalNoun, synonyms] of Object.entries(jaffaVocabularyMatrix.nouns)) {
      if (synonyms.some(syn => rawNoun.includes(syn))) {
        resolvedNoun = canonicalNoun;
        break;
      }
    }
  }

  // Fallback: If a student types just an asset name like "CRATE" without a verb, default to EXAMINE
  if (!resolvedVerb && resolvedNoun && tokens.length === 1) {
    resolvedVerb = "examine";
  }

  return { verb: resolvedVerb, noun: resolvedNoun };
}

function processJaffaCommandInterpreter(rawInput) {
  const clean = rawInput.trim().toLowerCase();
  if (!clean) return "";

  // Intercept pronouns "it" or "them" to suggest correct keyword syntax
  const words = clean.split(/\s+/);
  const hasPronoun = words.includes("it") || words.includes("them");
  if (hasPronoun) {
    const verbSyns = {
      take: ["take", "get", "grab", "pick", "collect", "secure"],
      examine: ["examine", "inspect", "look", "search", "check", "peer"],
      use: ["use", "apply", "show", "give"]
    };
    let resolvedVerb = "";
    for (const [canonical, syns] of Object.entries(verbSyns)) {
      if (syns.some(s => words.includes(s))) {
        resolvedVerb = canonical;
        break;
      }
    }
    if (resolvedVerb) {
      AudioEngine.play('fail');
      const roomKey = jaffaEpicEngine.state.room;
      if (roomKey === "HOUSE") {
        if (resolvedVerb === "take") {
          return "Specify the exact item. Did you mean TAKE LAND DEEDS?";
        } else if (resolvedVerb === "examine") {
          return "Specify the exact item. Did you mean EXAMINE DESK?";
        }
      } else if (roomKey === "ROAD") {
        if (resolvedVerb === "take") {
          return "Specify the exact item. Did you mean TAKE RATIONS?";
        } else if (resolvedVerb === "use") {
          return "Specify the exact item. Did you mean USE LAND DEEDS?";
        } else if (resolvedVerb === "examine") {
          return "Specify the exact item. Did you mean EXAMINE STATION?";
        }
      } else if (roomKey === "CAMPS") {
        if (resolvedVerb === "examine") {
          return "Specify the exact item. Did you mean EXAMINE FEDAYEEN?";
        }
      }
    }
  }

  // Intercept map-dependent chokepoint answer in Chapter 3
  if (jaffaEpicEngine.state.chapter === 3 && jaffaEpicEngine.state.room === "CAMPS" && jaffaEpicEngine.state.ch3_awaitingChokepoint) {
    const norm = clean.replace(/[^a-z0-9\s]/g, "");
    
    // Check for recruiter/fedayeen references first
    if (norm.includes("fedayeen") || norm.includes("fighters") || norm.includes("recruiter") || norm.includes("group") || norm.includes("examine") || norm.includes("talk")) {
      if (norm.includes("shati")) {
        // Fall through to success check below
      } else {
        AudioEngine.play('click');
        return "The Fedayeen recruiter looks at you: 'We are organizing patrols to resist the borders. But first, tell me: what is the name of this refugee sector? Look at the interactive geographic map. It is the Al-______ camp.'";
      }
    }
    
    const isNavigationOrMeta = 
      norm === "look" || norm === "l" || norm === "help" || norm === "inv" || norm === "inventory" ||
      norm.startsWith("go ") || norm === "north" || norm === "n" || norm === "go north";
      
    if (!isNavigationOrMeta) {
      if (norm.includes("shati")) {
        jaffaEpicEngine.state.ch3_victory = true;
        jaffaEpicEngine.state.ch3_awaitingChokepoint = false;
        AudioEngine.play('success');
        syncJaffaEngineHudDisplay();
        triggerJaffaLiveHudInsight(jaffaEpicEngine.insights.ch3_feda, false);
        return "SUCCESSFUL ACCREDITATION SEQUENCE PASSED!\n\nCorrect. Al-Shati (or Shati) is the key Gaza refugee camp sector established in 1949.\n\n*** 🏆 SIMULATOR EXAM PROTOCOLS FULLY COMPLETED // KEY TOPIC 1 REVISION ANALYSIS METRICS LOCKED IN SECURE ***";
      } else {
        AudioEngine.play('fail');
        return "The recruiter shakes his head: 'That is incorrect. Look closely at the map label for this refugee sector. What is the name of this camp?'";
      }
    }
  }

  const currentRoomData = jaffaEpicEngine.rooms[jaffaEpicEngine.state.room];

  // Try to dynamically resolve target room names from current room exits first
  const stopWords = ["the", "a", "an", "at", "in", "into", "to", "through", "on", "inside", "with", "around"];
  const tokens = clean.split(/\s+/).filter(t => !stopWords.includes(t));
  const rawVerb = tokens[0] || "";
  const rawNoun = tokens.slice(1).join(" ") || "";

  const goSynonyms = ["go", "move", "walk", "climb", "run", "step", "head", "travel"];
  const isGoVerb = goSynonyms.includes(rawVerb);
  
  let targetNoun = isGoVerb ? rawNoun : clean; 

  let dynamicDirection = "";
  if (currentRoomData && currentRoomData.exits) {
    for (const [dir, roomName] of Object.entries(currentRoomData.exits)) {
      if (roomName.toLowerCase() === targetNoun || roomName.toLowerCase().replace("'", "") === targetNoun) {
        dynamicDirection = dir;
        break;
      }
    }
  }

  let verb, noun;
  if (dynamicDirection) {
    verb = "go";
    noun = dynamicDirection;
  } else {
    const parsed = jaffaFlexibleParse(rawInput);
    verb = parsed.verb;
    noun = parsed.noun;
  }


  // UTILITY HELPER COMMANDS
  if (verb === "help") {
    AudioEngine.play('click');
    return "VALID ACTION COMMAND MATRIX:\n• LOOK (Redraws current environment context description)\n• GO [NORTH / SOUTH / EAST / WEST / UP / DOWN] (Navigates between rooms)\n• TAKE [ITEM] (Picks up a key object)\n• EXAMINE [OBJECT / PERSON] (Inspects a feature closely)\n• TALK [PERSON] (Interacts with an historical figure)\n• SHOW / USE [ITEM] (Applies an inventory asset to the room state)\n• INV (Displays what items you are currently carrying)";
  }

  // Handle LOOK descriptions
  const lookSynonyms = ["look", "l", "search", "peer"];
  if (verb === "look" || (verb === "examine" && !noun && lookSynonyms.includes(rawVerb))) {
    AudioEngine.play('click');
    return currentRoomData.description;
  }

  if (verb === "inv") {
    AudioEngine.play('click');
    if (jaffaEpicEngine.state.inventory.length === 0) return "Your inventory is currently empty.";
    return "Current Inventory Items: " + jaffaEpicEngine.state.inventory.map(i => i.toUpperCase()).join(", ");
  }

  // =============================================================
  // ACT 1 ARCHITECTURE MATRIX (CIVIL WAR NAKBA)
  // =============================================================
  if (jaffaEpicEngine.state.chapter === 1) {
    if (verb === "go") {
      let path = noun;
      if (currentRoomData.exits[path]) {
        // Trap execution gate checking for deeds when leaving Jaffa Harbor (moving south to ROAD)
        if (jaffaEpicEngine.state.room === "HARBOR" && path === "south" && !jaffaEpicEngine.state.inventory.includes("deeds")) {
          AudioEngine.play('fail');
          return "EXAM TRAP ENCOUNTERED: You try to flee south, but without any proof of identity or land deeds, you will have no way to claim aid or verify your family's history in the chaos ahead. You must return to the house and secure your deeds first.";
        }
        
        // If moving south from HARBOR with deeds, advance to Chapter 2
        if (jaffaEpicEngine.state.room === "HARBOR" && path === "south" && jaffaEpicEngine.state.inventory.includes("deeds")) {
          jaffaEpicEngine.state.chapter = 2;
          jaffaEpicEngine.state.room = "ROAD";
          
          AudioEngine.play('success');
          syncJaffaEngineHudDisplay();
          triggerJaffaLiveHudInsight(jaffaEpicEngine.insights.ch2_nakba, false);
          
          const newRoomDescription = jaffaEpicEngine.rooms[jaffaEpicEngine.state.room].description;
          return "SUCCESSFUL ESCAPE! You flee south along the coastal exodus road with your family's land deeds.\n\n" +
                 "---------------------------------------------\n" +
                 "*** CHRONOLOGY ADVANCED: CHAPTER 2 UNLOCKED ***\n" +
                 "---------------------------------------------\n\n" + 
                 newRoomDescription;
        }

        jaffaEpicEngine.state.room = currentRoomData.exits[path].toUpperCase();
        AudioEngine.play('click');
        syncJaffaEngineHudDisplay();
        return "You move " + path.toUpperCase() + ".\n\n" + jaffaEpicEngine.rooms[jaffaEpicEngine.state.room].description;
      }
      AudioEngine.play('fail');
      return "You can't move that way from here. Type LOOK to check exits.";
    }

    if (verb === "examine") {
      if (!noun) return "What do you want to examine?";
      if (jaffaEpicEngine.state.room === "HOUSE" && noun === "desk") {
        jaffaEpicEngine.state.ch1_deedsSecured = true;
        AudioEngine.play('success');
        return "You search the wooden desk in the corner. Tucked inside a drawer, you find your family's official JAFFA LAND DEEDS, proving ownership of your orchards.";
      }
      AudioEngine.play('click');
      return "You check the " + noun.toUpperCase() + " but notice nothing out of the ordinary.";
    }

    if (verb === "take") {
      if (!noun) return "What do you want to take?";
      if (jaffaEpicEngine.state.room === "HOUSE" && noun === "deeds") {
        if (!jaffaEpicEngine.state.ch1_deedsSecured) {
          AudioEngine.play('fail');
          return "You don't see any deeds here. Try investigating items in the room first.";
        }
        if (jaffaEpicEngine.state.inventory.includes("deeds")) {
          AudioEngine.play('click');
          return "You are already carrying the land deeds.";
        }
        jaffaEpicEngine.state.inventory.push("deeds");
        AudioEngine.play('success');
        syncJaffaEngineHudDisplay();
        triggerJaffaLiveHudInsight(jaffaEpicEngine.insights.ch1_deeds, false);
        return "You slide the Jaffa LAND DEEDS into your pocket. They prove ownership of your family lands.";
      }
      AudioEngine.play('fail');
      return "You cannot pick that up.";
    }
  }

  // =============================================================
  // ACT 2 ARCHITECTURE MATRIX (ROAD TO REFUGEE CAMPS)
  // =============================================================
  if (jaffaEpicEngine.state.chapter === 2) {
    if (verb === "go") {
      let path = noun;
      if (currentRoomData.exits[path]) {
        if (jaffaEpicEngine.state.room === "ROAD" && path === "south") {
          if (!jaffaEpicEngine.state.inventory.includes("rations")) {
            AudioEngine.play('fail');
            return "Before entering the refugee camp, you must secure a rations card at the relief station to ensure your family's survival.";
          }
          
          jaffaEpicEngine.state.chapter = 3;
          jaffaEpicEngine.state.room = "CAMPS";
          jaffaEpicEngine.state.inventory = []; // Flush old items
          
          AudioEngine.play('success');
          syncJaffaEngineHudDisplay();
          
          const newRoomDescription = jaffaEpicEngine.rooms[jaffaEpicEngine.state.room].description;
          return "SUCCESSFUL ENTRY! You show your rations card and pass into the Gaza refugee camp sector.\n\n" +
                 "---------------------------------------------\n" +
                 "*** CHRONOLOGY ADVANCED: CHAPTER 3 UNLOCKED ***\n" +
                 "---------------------------------------------\n\n" + 
                 newRoomDescription;
        }

        jaffaEpicEngine.state.room = currentRoomData.exits[path].toUpperCase();
        AudioEngine.play('click');
        syncJaffaEngineHudDisplay();
        return "You move " + path.toUpperCase() + ".\n\n" + jaffaEpicEngine.rooms[jaffaEpicEngine.state.room].description;
      }
      AudioEngine.play('fail');
      return "You can't go that way. Check your active exits via LOOK.";
    }

    if (verb === "examine") {
      if (!noun) return "What do you want to examine?";
      if (jaffaEpicEngine.state.room === "ROAD" && noun === "station") {
        AudioEngine.play('click');
        return "The relief station is overwhelmed with families. A relief worker is cross-referencing names, explaining that RATIONS coupons are only being distributed to those who can verify their origin.";
      }
      AudioEngine.play('click');
      return "You find nothing unique about the " + noun.toUpperCase() + ".";
    }

    if (verb === "use") {
      if (noun === "deeds" && jaffaEpicEngine.state.inventory.includes("deeds")) {
        if (jaffaEpicEngine.state.room === "ROAD") {
          jaffaEpicEngine.state.ch2_rationsSecured = true;
          jaffaEpicEngine.state.inventory = jaffaEpicEngine.state.inventory.filter(i => i !== "deeds");
          jaffaEpicEngine.state.inventory.push("rations");
          
          AudioEngine.play('success');
          syncJaffaEngineHudDisplay();
          return "You present your Jaffa land deeds to the relief worker. They verify your family name, stamp your registration, and hand you a crucial RATIONS card.";
        }
      }
      AudioEngine.play('fail');
      return "Using that here achieves nothing.";
    }
  }

  // =============================================================
  // ACT 3 ARCHITECTURE MATRIX (GAZA REFUGEE CAMPS)
  // =============================================================
  if (jaffaEpicEngine.state.chapter === 3) {
    if (verb === "go") {
      let path = noun;
      if (currentRoomData.exits[path]) {
        jaffaEpicEngine.state.room = currentRoomData.exits[path].toUpperCase();
        AudioEngine.play('click');
        syncJaffaEngineHudDisplay();
        return "You move " + path.toUpperCase() + ".\n\n" + jaffaEpicEngine.rooms[jaffaEpicEngine.state.room].description;
      }
      AudioEngine.play('fail');
      return "You can't move that way here.";
    }

    if (verb === "examine" || verb === "talk") {
      if (!noun) return "What do you want to examine or talk to?";
      if (jaffaEpicEngine.state.room === "CAMPS" && noun === "fedayeen") {
        jaffaEpicEngine.state.ch3_awaitingChokepoint = true;
        AudioEngine.play('success');
        syncJaffaEngineHudDisplay();
        return "The Fedayeen recruiter looks at you: 'We are organizing patrols to resist the borders. But first, tell me: what is the name of this refugee sector? Look at the interactive geographic map. It is the Al-______ camp.' (Enter the camp name to join the Fedayeen group)";
      }
      AudioEngine.play('click');
      return "You examine the " + noun.toUpperCase() + " but find nothing unique.";
    }
  }

  AudioEngine.play('fail');
  return "I don't recognize that specific command formulation. Type HELP to check the valid verb database structure for your room.";
}

export function initJaffaParserGame() {
  jaffaEpicEngine.state.chapter = 1;
  jaffaEpicEngine.state.room = "HOUSE";
  jaffaEpicEngine.state.inventory = [];
  jaffaEpicEngine.state.ch1_deedsSecured = false;
  jaffaEpicEngine.state.ch2_rationsSecured = false;
  jaffaEpicEngine.state.ch3_awaitingChokepoint = false;
  jaffaEpicEngine.state.ch3_victory = false;

  const storyOutput = document.getElementById('jaffa-story-output');
  if (storyOutput) {
    storyOutput.innerText = jaffaEpicEngine.rooms.HOUSE.description;
  }
  
  const logContainer = document.getElementById('jaffa-scroll-screen');
  if (logContainer) {
    logContainer.innerHTML = `
      <p class="me-sys-text">*** Chronology Command: Jaffa to Gaza (1947–1953) ***</p>
      <p class="me-sys-text">EDEXCEL SPECIFICATION P5 // KEY TOPIC 1 INTERACTIVE CHRONOLOGY</p>
      <p class="me-sys-text">INSTRUCTIONS: CLICK MAP MARKERS TO EXPLORE THE REGION. TYPE CORE COMMANDS LIKE 'LOOK', 'EXAMINE', OR 'USE' IN THE TERMINAL. TYPE 'HELP' FOR VERBS.</p>
      <hr class="me-terminal-line">
      <p id="jaffa-story-output" class="me-story-text">${jaffaEpicEngine.rooms.HOUSE.description}</p>
    `;
  }
  
  const insight = document.getElementById('jaffa-exam-insight');
  if (insight) {
    insight.classList.add('me-hidden');
  }

  syncJaffaEngineHudDisplay();

  if (!jaffaParserFormBound) {
    const formElement = document.getElementById('jaffa-parser-form');
    const inputField = document.getElementById('jaffa-user-input');
    if (formElement && inputField) {
      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        const rawLine = inputField.value.trim();
        if (!rawLine) return;

        const logScroll = document.getElementById('jaffa-scroll-screen');
        if (logScroll) {
          // Echo command onto terminal scrollback screen log
          const userParagraph = document.createElement('p');
          userParagraph.className = "me-user-print";
          userParagraph.innerText = "> " + rawLine.toUpperCase();
          logScroll.appendChild(userParagraph);

          // Evaluate action through state processing loops
          const feedbackReply = processJaffaCommandInterpreter(rawLine);
          if (feedbackReply) {
            const storyParagraph = document.createElement('p');
            storyParagraph.className = "me-story-text";
            storyParagraph.innerText = feedbackReply;
            logScroll.appendChild(storyParagraph);
          }

          // Reset prompt field and scroll view window down
          inputField.value = "";
          logScroll.scrollTop = logScroll.scrollHeight;
        }
      });
      const jaffaVoiceBtn = document.getElementById('jaffa-voice-btn');
      if (jaffaVoiceBtn) {
        jaffaVoiceBtn.onclick = (e) => {
          e.preventDefault();
          const logScroll = document.getElementById('jaffa-scroll-screen');
          if (logScroll) {
            const paras = logScroll.querySelectorAll('p.me-story-text');
            if (paras.length > 0) {
              const lastPara = paras[paras.length - 1];
              AudioEngine.speak(lastPara.innerText, null, null, null, true);
            }
          }
        };
      }
      jaffaParserFormBound = true;
    }
  }
}

window.initJaffaParserGame = initJaffaParserGame;
window.jaffaEpicEngine = jaffaEpicEngine;

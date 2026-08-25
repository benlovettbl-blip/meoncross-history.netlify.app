/**
 * test_falling_blocks.js
 * Verification test suite for Falling Blocks GCSE History Revision game.
 * Uses JSDOM to load and test falling_blocks.html.
 */

const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

console.log("=================================================");
console.log("STARTING FALLING BLOCKS GAME INTERACTIVE TEST SUITE");
console.log("=================================================");

const htmlContent = fs.readFileSync('falling_blocks.html', 'utf8');
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on('error', (...args) => console.error('[JSDOM Page Error]:', ...args));

const dom = new JSDOM(htmlContent, {
  url: 'http://localhost:3000',
  runScripts: 'dangerously',
  resources: 'usable',
  virtualConsole
});

const { window } = dom;
const { document } = window;

// Load questions.js into JSDOM context
const questionsContent = fs.readFileSync('questions.js', 'utf8');
window.eval(questionsContent);

// 1. Mock missing Web/Browser APIs in JSDOM
window.AudioContext = function() {
  return {
    state: 'suspended',
    currentTime: 0,
    resume: async () => {},
    createOscillator: () => ({
      frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
      connect: () => {},
      start: () => {},
      stop: () => {}
    }),
    createGain: () => ({
      gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
      connect: () => {}
    }),
    destination: {}
  };
};

window.webkitAudioContext = window.AudioContext;
window.requestAnimationFrame = (callback) => setTimeout(callback, 0);

// Mock HTMLCanvasElement context
window.HTMLCanvasElement.prototype.getContext = function(type) {
  if (type === '2d') {
    return {
      fillRect: () => {},
      strokeRect: () => {},
      fillText: () => {},
      clearRect: () => {},
      beginPath: () => {},
      closePath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {},
      fill: () => {},
      save: () => {},
      restore: () => {},
      roundRect: () => {},
      measureText: () => ({ width: 10 })
    };
  }
  return null;
};

// Mock localStorage
const storage = {};
window.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: (key) => { delete storage[key]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

// 2. Wait for script execution
setTimeout(() => {
  try {
    // Assert DOM elements
    const canvas = document.getElementById('game-canvas');
    const question = document.getElementById('target-question');
    const scoreHUD = document.getElementById('hud-score');
    const startBtn = document.getElementById('start-game-btn');
    const moveLeftBtn = document.getElementById('btn-move-left');
    const moveRightBtn = document.getElementById('btn-move-right');

    if (!canvas) throw new Error("Canvas element not found in DOM!");
    if (!question) throw new Error("Question element not found in DOM!");
    if (!scoreHUD) throw new Error("Score HUD not found in DOM!");
    if (!startBtn) throw new Error("Start game button not found in DOM!");
    if (!moveLeftBtn) throw new Error("Move Left button not found in DOM!");
    if (!moveRightBtn) throw new Error("Move Right button not found in DOM!");

    console.log("✓ DOM components existence verified.");

    const game = window.gameInstance;
    if (!game) throw new Error("gameInstance is not defined on window!");
    console.log("✓ Game instance loaded. State: " + game.state);

    // Click Start
    console.log("\n--- TEST: Starting Game ---");
    startBtn.click();
    console.log("✓ Start button clicked. State is now: " + game.state);
    if (game.state !== 'PLAYING') throw new Error("Game state should be 'PLAYING'!");
    
    console.log("  - Active Question: " + game.currentQuestion.target);
    console.log("  - Correct Answer: " + game.currentQuestion.correct);
    console.log("  - Target Column Gate: " + game.targetColumn);
    console.log("  - Active Block: " + game.activeBlock.text + " (type: " + game.activeBlock.type + ")");

    // Test Movement
    console.log("\n--- TEST: Steer Controls ---");
    const initialCol = game.activeBlock.col; // Should be 1 (center)
    console.log(`  - Initial column: ${initialCol}`);
    
    // Move Left
    moveLeftBtn.click();
    console.log(`  - Clicked Move Left. Current column: ${game.activeBlock.col}`);
    if (game.activeBlock.col !== 0) throw new Error("Active block column should be 0 after moving left!");
    
    // Move Right twice
    moveRightBtn.click();
    moveRightBtn.click();
    console.log(`  - Clicked Move Right twice. Current column: ${game.activeBlock.col}`);
    if (game.activeBlock.col !== 2) throw new Error("Active block column should be 2 after moving right twice!");

    // Test Scoring and Collision Match Logic
    console.log("\n--- TEST: Match / Discard Logic ---");
    // Let's force a matching scenario:
    // Place active block in the target column
    game.activeBlock.col = game.targetColumn;
    
    const blockText = game.activeBlock.text;
    const blockType = game.activeBlock.type;
    const initialScore = game.score;
    const initialMatches = game.matches;

    console.log(`  - Placing block '${blockText}' (type: ${blockType}) in Target Column (${game.targetColumn}).`);
    
    // Trigger landing callback
    game.handleBlockLanding();

    console.log(`  - Initial Score: ${initialScore} | Score now: ${game.score}`);
    console.log(`  - Initial Matches: ${initialMatches} | Matches now: ${game.matches}`);

    if (blockType === 'CORRECT') {
      // Correct block placed in target gate -> correct match (+100)
      if (game.score !== initialScore + 100) throw new Error("Score did not increase by 100 on correct match!");
      if (game.matches !== initialMatches + 1) throw new Error("Matches counter did not increment on correct match!");
      console.log("✓ Correct match scoring verified.");
    } else {
      // Distractor block placed in target gate -> mistake (stacked, no points)
      if (game.score !== initialScore) throw new Error("Score should not increase when placing distractor in target gate!");
      if (game.stacks[game.targetColumn].length !== 1) throw new Error("Block should stack on mistake!");
      console.log("✓ Incorrect distractor placement stacking verified.");
    }

    // Test Game Over Limit Stacking
    console.log("\n--- TEST: Stack Ceiling Limits & Game Over ---");
    
    // Pile up mistakes to trigger lose state
    console.log("  - Simulating block stack pile up...");
    // Force stack size in column 0 to exceed the ceiling
    // ceiling is y <= 60. gridBottom is 540. blockHeight is 45.
    // (540 - y) / 45 = blocks stacked. For y <= 60, we need (540 - 60) / 45 = 10.6 blocks.
    // Let's add 12 items to the stack in column 0
    for (let i = 0; i < 12; i++) {
      game.stacks[0].push({ text: "ERR", color: "#4b5563" });
    }
    
    const gameOverCheck = game.checkGameOver();
    console.log("  - Check game over condition: " + gameOverCheck);
    if (!gameOverCheck) throw new Error("Game over check should be true!");
    
    // Trigger actual end game
    game.endGame();
    console.log("  - Game state: " + game.state);
    if (game.state !== 'GAMEOVER') throw new Error("State should be 'GAMEOVER'!");
    
    const overlay = document.getElementById('game-overlay');
    if (overlay.style.display === 'none') throw new Error("Game Over overlay should be visible!");
    console.log("✓ Game Over state transition and modal verified.");

    // --- TEST: High Score Security Parameters & Local Storage ---
    console.log("\n--- TEST: High Score Security Validation ---");
    const logo = document.querySelector('.header-logo');
    if (!logo) throw new Error("Header logo not found!");

    // Test invalid format initials
    logo.className = 'header-logo';
    const valInvalidFormat = game.validateInitials("AS");
    if (valInvalidFormat.valid) throw new Error("Initials 'AS' should be invalid!");
    if (!logo.classList.contains('angry')) throw new Error("Logo should shake (have 'angry' class) on validation failure!");
    console.log("✓ Initials length validation & shake feedback verified.");

    // Test profanity initials
    logo.className = 'header-logo';
    const valProfane = game.validateInitials("WTF");
    if (valProfane.valid) throw new Error("Initials 'WTF' should be profane/invalid!");
    if (!logo.classList.contains('angry')) throw new Error("Logo should shake (have 'angry' class) on profanity validation failure!");
    console.log("✓ Profanity blacklisting & shake feedback verified.");

    // Test valid initials
    logo.className = 'header-logo';
    const valValid = game.validateInitials("BEN");
    if (!valValid.valid) throw new Error("Initials 'BEN' should be valid!");
    if (logo.classList.contains('angry')) throw new Error("Logo should not shake on valid input!");
    console.log("✓ Valid initials accepted successfully.");

    // Test Local Storage Key v3
    window.localStorage.clear();
    game.score = 500;
    game.endGame();
    // Set form fields
    const initialsInput = document.getElementById('hs-initials');
    const yearSelect = document.getElementById('hs-year');
    if (initialsInput && yearSelect) {
      initialsInput.value = "BEN";
      yearSelect.value = "Year 11";
      game.submitScore();
      
      const storedLeaderboard = window.localStorage.getItem('fb_leaderboard_v3');
      if (!storedLeaderboard) throw new Error("Leaderboard should be saved under key 'fb_leaderboard_v3'!");
      const parsedScores = JSON.parse(storedLeaderboard);
      if (parsedScores.length !== 1 || parsedScores[0].name !== 'BEN' || parsedScores[0].score !== 500) {
        throw new Error("Leaderboard saved score is incorrect: " + storedLeaderboard);
      }
      
      const storedHigh = window.localStorage.getItem('fb_highscore_v3');
      if (storedHigh !== '500') throw new Error("Highscore should be saved under key 'fb_highscore_v3', got: " + storedHigh);
      console.log("✓ High score and leaderboard saved to 'v3' local storage keys successfully.");
    } else {
      throw new Error("Initials and Year form inputs not found in DOM!");
    }

    // --- TEST: Lesson Selector Dropdown and Filtering ---
    console.log("\n--- TEST: Lesson Selector Dropdown & Filtering ---");
    game.showInstructions();
    const lessonSelect = document.getElementById('lesson-select');
    if (!lessonSelect) throw new Error("Lesson selector select element not found!");
    
    // Check options are populated
    const options = lessonSelect.querySelectorAll('option');
    console.log(`  - Found ${options.length} options in selector.`);
    if (options.length <= 1) throw new Error("Lesson options were not dynamically populated!");
    
    // Test filtering by subtopic_1_1
    lessonSelect.value = "subtopic_1_1";
    // Trigger updateActivePool
    window.updateActivePool("subtopic_1_1");
    
    const poolSize = window.questionsPool.length;
    console.log(`  - Subtopic 1.1 active questions pool size: ${poolSize}`);
    if (poolSize === 0) throw new Error("Filtered questions pool should not be empty!");
    
    // All items in questionsPool must belong to subtopic_1_1
    const nonSubtopic11Items = window.questionsPool.filter(q => q.subtopicId !== "subtopic_1_1");
    if (nonSubtopic11Items.length > 0) {
      throw new Error("Found active questions that do not belong to subtopic_1_1: " + JSON.stringify(nonSubtopic11Items));
    }
    console.log("✓ Correctly filtered questions pool to chosen subtopic.");
    
    // Check Side Panel Keyword Bank displays only subtopic 1.1 words
    const keywordListContainer = document.getElementById('keyword-list-container');
    const keywordItems = keywordListContainer.querySelectorAll('.keyword-item');
    console.log(`  - Side Panel Keyword Bank contains ${keywordItems.length} filtered items.`);
    if (keywordItems.length !== poolSize) {
      throw new Error(`Keyword Bank size (${keywordItems.length}) does not match active questions pool size (${poolSize})!`);
    }
    console.log("✓ Side panel Keyword Bank successfully filtered.");

    console.log("\n=================================================");
    console.log("ALL FALLING BLOCKS TEST CHECKS PASSED!");
    console.log("=================================================");
    process.exit(0);
  } catch (err) {
    console.error("\n❌ TEST SUITE FAILURE:");
    console.error(err.message);
    console.error(err.stack);
    process.exit(1);
  }
}, 500);

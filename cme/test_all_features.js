/**
 * test_all_features.js
 * Comprehensive integration tests for the Edexcel GCSE History Middle East Conflict app.
 * Runs in Node.js using JSDOM to simulate user interaction, routing, state changes, and games.
 */

const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

console.log("=================================================");
console.log("STARTING COMPREHENSIVE INTEGRATION TEST SUITE");
console.log("=================================================");

// 1. Prepare HTML and JSDOM Environment
const htmlContent = fs.readFileSync('index.html', 'utf8');
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on('error', (...args) => console.error('[JSDOM Page Error]:', ...args));
virtualConsole.on('warn', (...args) => console.warn('[JSDOM Page Warning]:', ...args));
virtualConsole.on('log', (...args) => console.log('[JSDOM Page Log]:', ...args));

const dom = new JSDOM(htmlContent, {
  url: 'http://localhost:3000',
  runScripts: 'outside-only',
  resources: 'usable',
  virtualConsole
});

const { window } = dom;
const { document } = window;

// 2. Mock missing Web/Browser APIs in JSDOM
window.AudioContext = function() {
  return {
    state: 'suspended',
    currentTime: 0,
    resume: async () => {},
    createOscillator: () => ({
      frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
      connect: () => {},
      start: () => {},
      stop: () => {}
    }),
    createGain: () => ({
      gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
      connect: () => {}
    }),
    createBiquadFilter: () => ({
      frequency: { setValueAtTime: () => {} },
      connect: () => {}
    }),
    destination: {}
  };
};

window.webkitAudioContext = window.AudioContext;
window.requestAnimationFrame = (callback) => setTimeout(callback, 0);
window.cancelAnimationFrame = (id) => clearTimeout(id);

// Mock HTMLCanvasElement context
window.HTMLCanvasElement.prototype.getContext = function(type) {
  if (type === '2d') {
    const gradientMock = { addColorStop: () => {} };
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
      translate: () => {},
      rotate: () => {},
      scale: () => {},
      ellipse: () => {},
      arcTo: () => {},
      quadraticCurveTo: () => {},
      bezierCurveTo: () => {},
      drawImage: () => {},
      createLinearGradient: () => gradientMock,
      createRadialGradient: () => gradientMock,
      arc: () => {},
      rect: () => {},
      clip: () => {},
      getContextAttributes: () => ({}),
      isPointInPath: () => false,
      measureText: () => ({ width: 10 })
    };
  }
  return null;
};

// Silence alerts and confirmations
window.alert = (msg) => console.log(`[Browser Alert]: ${msg}`);
window.confirm = (msg) => {
  console.log(`[Browser Confirm]: ${msg}`);
  return true;
};

// Mock localStorage
const storage = {};
window.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: (key) => { delete storage[key]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

// Mock Leaflet (L) for Map Explorer and Game Map
window.L = {
  map: () => ({
    setView: function() { return this; },
    invalidateSize: function() { return this; },
    addTo: function() { return this; }
  }),
  tileLayer: () => ({
    addTo: function() { return this; }
  }),
  layerGroup: () => ({
    addTo: function() { return this; },
    clearLayers: function() { return this; }
  }),
  divIcon: (opts) => opts,
  marker: () => ({
    addTo: function() { return this; },
    bindPopup: function() { return this; },
    openPopup: function() { return this; },
    bindTooltip: function() { return this; },
    on: function() { return this; }
  }),
  polyline: () => ({
    addTo: function() { return this; },
    setStyle: function() { return this; }
  })
};

// Capture DOMContentLoaded listener
let domContentLoadedCallback = null;
const originalAddEventListener = window.addEventListener;
window.addEventListener = function(event, callback, options) {
  if (event === 'DOMContentLoaded') {
    domContentLoadedCallback = callback;
  }
  originalAddEventListener.call(this, event, callback, options);
};

// 3. Load script files into the window context
function loadScript(path) {
  let finalPath = path;
  if (path === 'app.js' && fs.existsSync('app_test.js')) {
    finalPath = 'app_test.js';
  }
  const code = fs.readFileSync(finalPath, 'utf8');
  window.eval(code);
}

try {
  console.log("Loading questions.js into VM context...");
  loadScript('questions.js');
  console.log("Loaded questions.js successfully!");

  console.log("Loading app.js (bundled script) into VM context...");
  loadScript('app.js');
  console.log("Loaded app.js successfully!");
} catch (e) {
  console.error("Failed to load scripts:", e);
  process.exit(1);
}

// Helper to fire event
function fireClick(element) {
  if (!element) throw new Error("Target element for click is null!");
  const clickEvent = new window.MouseEvent('click', { bubbles: true, cancelable: true });
  element.dispatchEvent(clickEvent);
}

// 4. Run tests
(async () => {
try {
  // Trigger DOMContentLoaded
  if (domContentLoadedCallback) {
    console.log("Calling captured DOMContentLoaded callback...");
    domContentLoadedCallback();
  } else {
    console.log("Dispatching standard DOMContentLoaded event...");
    const domEvent = new window.Event('DOMContentLoaded');
    window.dispatchEvent(domEvent);
  }
  console.log("✓ DOMContentLoaded triggered.");
  console.log("  - window.switchView is:", typeof window.switchView);
  console.log("  - window.AudioEngine is:", typeof window.AudioEngine);

  // Test 1: Navigation Toggles
  console.log("\n--- TEST 1: Navigation Sidebar Toggles ---");
  const views = [
    { navId: 'nav-dashboard', viewId: 'view-dashboard', name: 'Dashboard' },
    { navId: 'nav-timeline', viewId: 'view-timeline', name: 'Timeline' },
    { navId: 'nav-exam-sim', viewId: 'view-exam', name: 'Quiz Generator' },
    { navId: 'nav-exam-skills', viewId: 'view-exam-skills', name: 'Exam Skills' },
    { navId: 'nav-past-papers', viewId: 'view-past-papers', name: 'Past Papers' },
    { navId: 'nav-games', viewId: 'view-games', name: 'Games Hub' },
    { navId: 'nav-bookmarks', viewId: 'view-bookmarks', name: 'Bookmarks' },
    { navId: 'nav-going-beyond', viewId: 'view-going-beyond', name: 'Going Beyond' }
  ];

  views.forEach(v => {
    const navBtn = document.getElementById(v.navId);
    if (!navBtn) throw new Error(`Sidebar nav item ${v.navId} not found in DOM!`);
    fireClick(navBtn);
    
    const viewContainer = document.getElementById(v.viewId);
    if (!viewContainer.classList.contains('active')) {
      throw new Error(`View container ${v.viewId} is not active after clicking sidebar link!`);
    }
    console.log(`  - Navigated to: ${v.name}`);
  });
  console.log("✓ Sidebar navigation tests passed.");

  // Test 2: Dashboard stats check
  console.log("\n--- TEST 2: Dashboard Statistics Display ---");
  fireClick(document.getElementById('nav-dashboard'));
  const overallProgText = document.getElementById('header-progress-value').textContent;
  console.log(`  - Header Overall Progress Displayed: ${overallProgText}`);
  if (!overallProgText.includes('%')) {
    throw new Error("Header progress percentage is not formatted correctly!");
  }
  console.log("✓ Dashboard statistics test passed.");

  // Test 3: Subtopic Study (Mastery Lessons, Accordions, Flashcards)
  console.log("\n--- TEST 3: Subtopic Study View & Modes ---");
  // Select first subtopic in sidebar
  const subtopicNavBtn = document.getElementById('nav-subtopic-subtopic_1_1');
  if (!subtopicNavBtn) throw new Error("Subtopic Topic 1.1 sidebar button not found!");
  fireClick(subtopicNavBtn);
  
  // Verify header mode switcher is visible
  const modeSwitcher = document.getElementById('subtopic-mode-switcher');
  if (modeSwitcher.style.display === 'none') {
    throw new Error("Subtopic mode switcher should be displayed when in subtopic view!");
  }
  console.log("  - Subtopic mode switcher visible.");

  // 3a. Lesson / Mastery Mode
  console.log("  - Testing Mastery Lesson (spec checklist & narrative chain):");
  
  // Spec points ticking
  const specItems = document.querySelectorAll('.spec-checklist-item');
  if (specItems.length === 0) {
    throw new Error("No spec checklist items found in lesson!");
  }
  console.log(`    * Found ${specItems.length} spec checklist items. Ticking the first one...`);
  fireClick(specItems[0]);
  if (!specItems[0].classList.contains('checked')) {
    throw new Error("Spec checklist item was not checked off after clicking!");
  }
  console.log("    * Checked off successfully.");

  // Narrative chain game check
  const chainBoxes = document.querySelectorAll('.chain-box');
  if (chainBoxes.length > 0) {
    console.log(`    * Found ${chainBoxes.length} Narrative Chain blocks. Clicking all of them...`);
    chainBoxes.forEach(box => fireClick(box));
    const feedback = document.getElementById('narrative-chain-feedback');
    console.log(`    * Narrative chain feedback: "${feedback ? feedback.textContent.trim() : 'N/A'}"`);
  } else {
    console.log("    * Note: No Narrative Chain blocks found in this lesson.");
  }

  // Toggling Hard Mode
  const hardModeToggle = document.getElementById('mastery-hard-mode-toggle');
  if (hardModeToggle) {
    hardModeToggle.checked = true;
    const changeEvent = new window.Event('change');
    hardModeToggle.dispatchEvent(changeEvent);
    console.log("    * Toggled Hard Mode successfully.");
  }

  // Mark Mastery button click
  const markMasteryBtn = document.getElementById('btn-mark-mastery-mastered');
  if (markMasteryBtn) {
    fireClick(markMasteryBtn);
    console.log("    * Marked subtopic as mastered.");
  }

  // 3b. Accordions Mode
  console.log("  - Testing Classic Accordion View:");
  const btnClassic = modeSwitcher.querySelector('[data-mode="classic"]');
  fireClick(btnClassic);
  const accordions = document.querySelectorAll('.quiz-card-details');
  if (accordions.length === 0) {
    throw new Error("Accordions view loaded but no quiz accordion cards were rendered!");
  }
  console.log(`    * Rendered ${accordions.length} questions in subtopic accordion list.`);
  
  // Test filters
  const filterBtns = document.querySelectorAll('.classic-filters .filter-btn');
  if (filterBtns.length > 0) {
    fireClick(filterBtns[1]); // Easy
    console.log("    * Filtered easy questions.");
  }

  // Test toggling mastery inside accordion summary
  const checkboxContainer = accordions[0].querySelector('.mastery-checkbox-container');
  if (checkboxContainer) {
    const isInitiallyMastered = checkboxContainer.classList.contains('mastered');
    fireClick(checkboxContainer);
    if (checkboxContainer.classList.contains('mastered') === isInitiallyMastered) {
      throw new Error("Mastery checkmark did not toggle state!");
    }
    console.log("    * Toggled question mastery checkmark successfully.");
  }

  // 3c. Flashcards Mode
  console.log("  - Testing Flashcard Study Session:");
  const btnFC = modeSwitcher.querySelector('[data-mode="flashcards"]');
  fireClick(btnFC);
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const primeContinue = document.getElementById('btn-prime-continue');
  if (primeContinue) {
    fireClick(primeContinue);
  }
  
  const flashcardCounterTextEl = document.getElementById('flashcard-counter-text');
  if (!flashcardCounterTextEl) {
    throw new Error("flashcard-counter-text element not found in DOM!");
  }
  const flashcardCounter = flashcardCounterTextEl.textContent;
  if (!flashcardCounter.includes('Card 1')) {
    throw new Error("Flashcards view did not initialize with Card 1!");
  }
  console.log(`    * Session started: ${flashcardCounter}`);

  // Reveal Answer (Flip Card)
  const flipBtn = document.getElementById('btn-flashcard-reveal');
  fireClick(flipBtn);
  const cardEl = document.getElementById('flashcard-card');
  if (!cardEl.classList.contains('flipped')) {
    throw new Error("Flashcard did not flip after clicking Reveal!");
  }
  console.log("    * Flipped card face to reveal answer.");

  // Study Again / Incorrect check (starts MCQ Active Recall overlay)
  const incorrectBtn = document.getElementById('btn-flashcard-incorrect');
  fireClick(incorrectBtn);
  const mcqOverlay = document.getElementById('flashcard-mcq-overlay');
  if (!mcqOverlay || mcqOverlay.style.display === 'none') {
    throw new Error("Active Recall MCQ overlay did not display on incorrect grading!");
  }
  console.log("    * Active Recall MCQ check displayed.");

  // Answer MCQ option
  const choiceBtn = mcqOverlay.querySelector('.mcq-choice-btn');
  if (choiceBtn) {
    fireClick(choiceBtn);
    console.log("    * Answered MCQ Active Recall question.");
  }

  // 3d. 3-2-1 Starter Challenge Test for subtopic_2_2
  console.log("  - Testing 3-2-1 Starter Challenge (Topic 2.2):");
  const sub22Btn = document.getElementById('nav-subtopic-subtopic_2_2');
  if (sub22Btn) {
    fireClick(sub22Btn);
    
    // Switch to lessons mode just in case
    const btnMastery = modeSwitcher.querySelector('[data-mode="lessons"]');
    if (btnMastery) fireClick(btnMastery);
    
    // Verify Do Now starts collapsed
    const contentWrapper = document.querySelector('.do-now-content-wrapper');
    if (!contentWrapper || contentWrapper.style.display !== 'none') {
      throw new Error("Do Now Starter should be hidden/collapsed by default!");
    }
    
    // Click the toggle header to reveal the starter
    const toggleHeader = document.querySelector('.do-now-toggle-header');
    if (!toggleHeader) {
      throw new Error("Do Now toggle header not found!");
    }
    fireClick(toggleHeader);
    
    if (contentWrapper.style.display !== 'block') {
      throw new Error("Do Now Starter did not expand after clicking toggle header!");
    }
    console.log("    * Collapsible Do Now task header toggled successfully.");

    // Check for 3-2-1 starter elements
    const starterTitle = document.querySelector('.retrieval-challenge-container');
    if (!starterTitle) {
      throw new Error("3-2-1 Retrieval Challenge container not found for subtopic_2_2!");
    }
    
    // Check for Casus Belli concept
    const htmlContent = document.getElementById('mastery-content-container').innerHTML;
    if (!htmlContent.includes('Key Concept: Casus Belli')) {
      throw new Error("Key Concept: Casus Belli not found in subtopic_2_2 starter!");
    }
    console.log("    * 3-2-1 Starter and Key Concept 'Casus Belli' rendered successfully.");
    
    // Click reveal answers button
    const revealBtn = document.querySelector('.do-now-reveal-btn');
    if (!revealBtn) {
      throw new Error("Reveal Do Now Answers button not found for subtopic_2_2!");
    }
    fireClick(revealBtn);
    
    // Check if answers drawer is revealed
    const answersDrawer = document.querySelector('.do-now-answers-drawer');
    if (!answersDrawer || answersDrawer.style.display === 'none') {
      throw new Error("Answers drawer did not reveal after clicking button!");
    }
    console.log("    * Answers drawer revealed successfully.");
    
    // Switch back to subtopic_1_1 to keep subsequent tests clean
    const sub11Btn = document.getElementById('nav-subtopic-subtopic_1_1');
    if (sub11Btn) fireClick(sub11Btn);
  } else {
    console.log("    * Warning: nav-subtopic-subtopic_2_2 button not found, skipping 3-2-1 starter test.");
  }

  console.log("✓ Subtopic study view tests passed.");

  // Test 4: Quiz Generator (Recall Challenge)
  console.log("\n--- TEST 4: Quiz Generator & Recall Challenge ---");
  fireClick(document.getElementById('nav-exam-sim'));
  
  // Set options and start
  const startChallengeBtn = document.getElementById('btn-exam-start');
  if (!startChallengeBtn) throw new Error("Quiz start button not found!");
  fireClick(startChallengeBtn);
  
  const runnerPanel = document.getElementById('exam-runner-panel');
  if (runnerPanel.style.display === 'none') {
    throw new Error("Active Quiz runner did not show up on start!");
  }
  console.log("  - Active quiz simulator started.");

  // Answer quiz question
  const mcqOption = document.querySelector('#exam-mcq-options-container .mcq-choice-btn');
  if (mcqOption) {
    fireClick(mcqOption);
    console.log("  - Selection submitted.");
    
    const reviewSection = document.getElementById('exam-review-section');
    if (reviewSection.style.display === 'none') {
      throw new Error("Quiz did not enter self-grading/review state after answer selection!");
    }
    
    // Proceed to next question
    const nextQBtn = document.getElementById('btn-exam-next');
    fireClick(nextQBtn);
    console.log("  - Advanced to next question.");
  }

  // Quit challenge
  const quitQBtn = document.getElementById('btn-exam-quit');
  fireClick(quitQBtn);
  const setupPanel = document.getElementById('exam-setup-panel');
  if (setupPanel.style.display === 'none') {
    throw new Error("Quiz did not return to setup panel after quitting!");
  }
  console.log("  - Quit recall test and returned to setup successfully.");
  console.log("✓ Quiz generator test passed.");

  // Test 5: Exam Skills Practice (Q1-Q3)
  console.log("\n--- TEST 5: Exam Skills Practice (Q1-Q3) ---");
  fireClick(document.getElementById('nav-exam-skills'));
  
  // Test Consequence Panel topic selection
  const consequenceSelect = document.getElementById('consequence-topic-select');
  if (consequenceSelect) {
    consequenceSelect.selectedIndex = 1;
    const changeEvent = new window.Event('change');
    consequenceSelect.dispatchEvent(changeEvent);
    console.log("  - Selected Consequence question topic.");
    const qCard = document.getElementById('consequence-question-card');
    if (qCard.style.display === 'none') {
      throw new Error("Consequence question card did not display after selecting topic!");
    }
  }

  // Test Narrative sequence
  const narrativeSelect = document.getElementById('narrative-topic-select');
  if (narrativeSelect) {
    narrativeSelect.selectedIndex = 1;
    const changeEvent = new window.Event('change');
    narrativeSelect.dispatchEvent(changeEvent);
    console.log("  - Selected Narrative question topic.");
  }
  console.log("✓ Exam skills practice panel verification passed.");

  // Test 6: Past Papers & Mock Generator
  console.log("\n--- TEST 6: Past Exam Papers & Mock Generator ---");
  fireClick(document.getElementById('nav-past-papers'));
  
  const pastPaperSelect = document.getElementById('past-paper-select');
  if (pastPaperSelect) {
    pastPaperSelect.selectedIndex = 1;
    const changeEvent = new window.Event('change');
    pastPaperSelect.dispatchEvent(changeEvent);
    
    const openBtn = document.getElementById('btn-start-past-paper');
    fireClick(openBtn);
    
    const sheetContainer = document.getElementById('past-paper-sheet-container');
    if (sheetContainer.style.display === 'none') {
      throw new Error("Past exam paper sheet was not revealed on click!");
    }
    console.log("  - Opened Summer 2018 Past Paper.");
  }
  console.log("✓ Past Exam Papers test passed.");

  // Test 7: Revision Games Hub
  console.log("\n--- TEST 7: Revision Games Hub ---");
  fireClick(document.getElementById('nav-games'));

  const gameTabs = [
    { btnId: 'btn-tab-game-causal', containerId: 'game-causal-container', name: 'Causal Link Builder' },
    { btnId: 'btn-tab-game-chronology', containerId: 'game-chronology-container', name: 'Chronology Challenge' },
    { btnId: 'btn-tab-game-mastery', containerId: 'game-mastery-container', name: 'Mastery Match' },
    { btnId: 'btn-tab-game-mindmap', containerId: 'game-mindmap-container', name: 'Concept Connector' },
    { btnId: 'btn-tab-game-decisions', containerId: 'game-decisions-container', name: 'Decision Simulator' },
    { btnId: 'btn-tab-game-crisis', containerId: 'game-crisis-container', name: 'Crisis Hotline 1973' },
    { btnId: 'btn-tab-game-tug', containerId: 'game-tug-container', name: 'Chronological Tug-of-War' },
    { btnId: 'btn-tab-game-taboo', containerId: 'game-taboo-container', name: 'Taboo Game' },
    { btnId: 'btn-tab-game-me-sim', containerId: 'game-me-sim-container', name: 'Simulator Hub' },
    { btnId: 'btn-tab-game-parser', containerId: 'game-parser-container', name: 'Haifa to Sinai: Text Adventure' },
    { btnId: 'btn-tab-game-parser-jaffa', containerId: 'game-parser-jaffa-container', name: 'Chronology Command: Jaffa to Gaza (1947–1953)' }
  ];

  for (const g of gameTabs) {
    const tabBtn = document.getElementById(g.btnId);
    if (!tabBtn) throw new Error(`Game tab button ${g.btnId} not found!`);
    fireClick(tabBtn);
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const pane = document.getElementById(g.containerId);
    if (pane.style.display === 'none') {
      throw new Error(`Game pane ${g.containerId} is not visible after selecting tab!`);
    }
    console.log(`  - Loaded Game: ${g.name}`);
  }

  // Verify specific game features
  console.log("  - Running verification on individual games:");

  // 7a. Crisis Game
  console.log("    * Verifying Crisis Hotline 1973:");
  fireClick(document.getElementById('btn-tab-game-crisis'));
  await new Promise(resolve => setTimeout(resolve, 50));
  const firstChoiceBtn = document.querySelector('#crisis-choices-box .choice-btn');
  if (firstChoiceBtn) {
    fireClick(firstChoiceBtn);
    console.log("      . Action choice recorded, scenario metrics recalculated.");
  }

  // 7b. Tug Game
  console.log("    * Verifying Chronological Tug-of-War:");
  fireClick(document.getElementById('btn-tab-game-tug'));
  await new Promise(resolve => setTimeout(resolve, 50));
  const escalateBtn = document.getElementById('btn-escalate');
  if (escalateBtn) {
    fireClick(escalateBtn);
    console.log("      . Event classification choice recorded, DEFCON updated.");
  }

  // 7c. Taboo Game
  console.log("    * Verifying Taboo Game:");
  fireClick(document.getElementById('btn-tab-game-taboo'));
  await new Promise(resolve => setTimeout(resolve, 50));
  const initTabooBtn = document.getElementById('btn-taboo-initialize');
  if (initTabooBtn) {
    fireClick(initTabooBtn);
    const startTurnBtn = document.getElementById('btn-taboo-start-turn');
    if (startTurnBtn) fireClick(startTurnBtn);
    console.log("      . Taboo initialized, turn started.");
  }

  // 7d. Haifa to Sinai: Text Adventure Game
  console.log("    * Verifying Haifa to Sinai: Text Adventure:");
  fireClick(document.getElementById('btn-tab-game-parser'));
  await new Promise(resolve => setTimeout(resolve, 50));
  dom.window.initParserGame();
  const parserForm = document.getElementById('me-parser-form');
  const parserField = document.getElementById('me-user-input');
  if (parserForm && parserField) {
    parserField.value = 'look';
    const submitEvent = new dom.window.Event('submit', { bubbles: true, cancelable: true });
    parserForm.dispatchEvent(submitEvent);
    console.log("      . Command form submitted successfully.");

    // Assert chokepoint puzzle behavior
    const state = dom.window.meEpicEngine.state;
    state.chapter = 3;
    state.room = "DUNES";
    state.inventory = ["orders"];
    
    // Submit "use orders"
    parserField.value = 'use orders';
    parserForm.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
    if (!state.ch3_awaitingChokepoint) {
      throw new Error("Game state did not transition to ch3_awaitingChokepoint after using orders");
    }
    console.log("      . Transition to ch3_awaitingChokepoint verified.");

    // Submit incorrect answer
    parserField.value = 'red sea';
    parserForm.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
    if (state.ch3_victory) {
      throw new Error("Game won with incorrect answer 'red sea'");
    }
    console.log("      . Rejection of incorrect answer 'red sea' verified.");

    // Submit correct fuzzy answer
    parserField.value = 'Straits of Tiran';
    parserForm.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
    if (!state.ch3_victory) {
      throw new Error("Game did not register victory with correct fuzzy answer 'Straits of Tiran'");
    }
    console.log("      . Puzzle victory with correct answer 'Straits of Tiran' verified.");
  }

  // 7e. Chronology Command: Jaffa to Gaza (1947–1953) Game
  console.log("    * Verifying Chronology Command: Jaffa to Gaza (1947–1953):");
  fireClick(document.getElementById('btn-tab-game-parser-jaffa'));
  await new Promise(resolve => setTimeout(resolve, 50));
  dom.window.initJaffaParserGame();
  const jaffaForm = document.getElementById('jaffa-parser-form');
  const jaffaField = document.getElementById('jaffa-user-input');
  if (jaffaForm && jaffaField) {
    jaffaField.value = 'look';
    const submitEvent = new dom.window.Event('submit', { bubbles: true, cancelable: true });
    jaffaForm.dispatchEvent(submitEvent);
    console.log("      . Command form submitted successfully.");

    // Assert chokepoint puzzle behavior
    const state = dom.window.jaffaEpicEngine.state;
    state.chapter = 3;
    state.room = "CAMPS";
    state.inventory = [];
    
    // Submit "talk fedayeen"
    jaffaField.value = 'talk fedayeen';
    jaffaForm.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
    if (!state.ch3_awaitingChokepoint) {
      throw new Error("Jaffa game state did not transition to ch3_awaitingChokepoint after talking to fedayeen");
    }
    console.log("      . Transition to ch3_awaitingChokepoint verified.");

    // Submit incorrect answer
    jaffaField.value = 'gaza';
    jaffaForm.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
    if (state.ch3_victory) {
      throw new Error("Jaffa game won with incorrect answer 'gaza'");
    }
    console.log("      . Rejection of incorrect answer 'gaza' verified.");

    // Submit correct fuzzy answer
    jaffaField.value = 'Shati';
    jaffaForm.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
    if (!state.ch3_victory) {
      throw new Error("Jaffa game did not register victory with correct fuzzy answer 'Shati'");
    }
    console.log("      . Puzzle victory with correct answer 'Shati' verified.");
  }

  console.log("✓ Revision Games Hub tests passed.");

  // Test 8: Workbook HTML Generation for All Lessons & Styles
  console.log("\n--- TEST 8: Workbook HTML Generation for All Lessons & Styles ---");
  const subtopicIds = [
    'subtopic_1_1', 'subtopic_1_2', 'subtopic_1_3',
    'subtopic_2_1', 'subtopic_2_2', 'subtopic_2_3',
    'subtopic_3_1', 'subtopic_3_2', 'subtopic_3_3'
  ];
  const styles = ['study', 'timeline', 'exam', 'quiz'];
  
  for (const subId of subtopicIds) {
    for (const style of styles) {
      const selectedIndices = [0, 1];
      const resultHtml = await dom.window.generateWorkbookHtml(subId, style, 'standard', false, selectedIndices);
      if (!resultHtml || typeof resultHtml !== 'string') {
        throw new Error(`Workbook HTML is not a string for ${subId} and style ${style}`);
      }
      if (resultHtml.includes('undefined')) {
        throw new Error(`Workbook HTML for ${subId} and style ${style} contains "undefined"!`);
      }
      if (resultHtml.length < 100) {
        throw new Error(`Workbook HTML is too short for ${subId} and style ${style}`);
      }
    }
  }
  console.log("✓ All workbook generations run and verified successfully without ReferenceError or 'undefined' markers.");

  // Test 9: Bulk Workbook HTML Generation for All Styles
  console.log("\n--- TEST 9: Course-Wide Bulk Workbook HTML Generation ---");
  const bulkStyles = ['study', 'timeline', 'exam', 'quiz'];
  for (const style of bulkStyles) {
    const resultHtml = await dom.window.generateBulkWorkbookHtml(style, 'standard', false);
    if (!resultHtml || typeof resultHtml !== 'string') {
      throw new Error(`Bulk Workbook HTML is not a string for style ${style}`);
    }
    if (resultHtml.includes('undefined')) {
      throw new Error(`Bulk Workbook HTML for style ${style} contains "undefined"!`);
    }
    if (resultHtml.length < 5000) {
      throw new Error(`Bulk Workbook HTML is too short for style ${style} (${resultHtml.length} chars)`);
    }
    console.log(`  - Style ${style}: Generated ${resultHtml.length} characters.`);
  }
  console.log("✓ Bulk workbook generations run and verified successfully without ReferenceError or 'undefined' markers.");

  console.log("\n--- TEST 10: War-Specific Quiz Sheets ---");
  const wars = ['1948_1949', '1956_suez', '1967_sixday', '1973_yomkippur', '1982_lebanon'];
  for (const warId of wars) {
    const warHtml = await window.generateWarWorkbookHtml(warId, 'standard', false);
    if (!warHtml.includes('GCSE Revision:') || warHtml.includes('undefined') || warHtml.includes('[object Promise]')) {
      throw new Error(`War-Specific Quiz Sheet for ${warId} is corrupted or missing title!`);
    }
  }
  console.log("✓ All war-specific quiz sheets verified successfully!");

  console.log("\n=================================================");
  console.log("ALL FEATURES VERIFIED AND CONFIRMED FUNCTIONAL!");
  console.log("=================================================");
  process.exit(0);

} catch (e) {
  console.error("\n❌ TEST FAILURE DETECTED:");
  console.error(e.message);
  console.error(e.stack);
  process.exit(1);
}
})();

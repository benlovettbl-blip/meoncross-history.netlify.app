# Walkthrough: Porting Gamification, Active Recall Flashcards, & Map Explorer to CME App

This walkthrough summarizes the complete set of changes made to port premium study and gamification features from the USA app to the **Conflict in the Middle East (CME)** app, as well as aligning the layouts so they are visually identical.

All changes have been successfully compiled, bundled, and verified using integration test suites.

---

## Merged Premium Features

### 1. Gamification & XP System
*   **Stats State Engine**: Declared state configurations in [state.js](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/src/state.js) for tracking `xp`, `level`, `streak`, and `lastLoginDate`.
*   **Header XP Counter**: Embedded a live XP count badge container inside [index.html](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/index.html) header.
*   **Add XP Hooks**: Programmed XP rewards in [views.js](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/src/views.js) and [lessons.js](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/src/lessons.js) on completing activities.
*   **Level Ups**: Confetti explosions and cheering chime trigger automatically when a student levels up (max Level 5).

### 2. Streak & Level Leaderboard
*   **Rankings Table**: Created a custom leaderboard UI displaying rank medals, student initials, year group, streaks, levels, a
  * Keep the existing CartoDB Dark Matter configuration.

### 3. Ensure Map height bounds and Horizontal Input Alignment
We will adjust the map container's layout using flexbox to ensure it perfectly aligns with the height of the terminal panel on the left:
* **File**: [index.html](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/index.html)
  * Change the inline style of `.me-map-viewport` and `#me-game-map` to support flexbox layout stretching:
    * `.me-map-viewport`: `style="display: flex; flex-direction: column; flex: 1; padding: 0;"`
    * `#me-game-map`: `style="width: 100%; flex: 1; min-height: 400px; background-color: #0b0f19;"`
* **File**: [style.css](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/style.css)
  * Update CSS selectors for `.me-map-viewport` and `#me-game-map` to align with these flex characteristics.

---

## Verification Plan

### Automated Tests
* Run `node test_all_features.js` to ensure the HTML elements, parser inputs, and sidebar navigation function cleanly.
* Run `node test_app.js` to verify application setup.
* Re-run production build: `npm run build`.

            remove: () => {},
            toggle: () => {},
            contains: () => false
          },
          style: {},
          appendChild: () => {},
          children: [],
          querySelector: () => ({ selected: false }),
          innerHTML: '',
          value: ''
        };
      } else {
        // Return null exactl
    destination: {}
  };
};

      return {
        tagName: tag,
        addEventListener: () => {},
        setAttribute: () => {},
        classList: {
          add: () => {},
          remove: () => {},
          toggle: () => {},
          contains: () => false
        },
        style: {},
        appendChild: () => {},
        children: [],
        querySelector: () => ({ selected: false })
      };
    },
    querySelectorAll: () => []
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  },
  AudioEngine: {
    play: () => {}
  },
  Confetti: {
    spawn: () => {}
  },
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
  Math: Math,
  JSON: JSON
};

sandbox.global = sandbox;
sandbox.window.global = sandbox;

try {
  const context = vm.createContext(sandbox);

  // Load questions.js
  const questionsCode = fs.readFileSync('questions.js', 'utf8');
  vm.runInContext(questionsCode, context);

  // Load app.js
  const code = fs.readFileSync('app.js', 'utf8');
  vm.runInContext(code, context);
  
  if (sandbox.triggerDOMContentLoaded) {
    console.log("Triggering DOMContentLoaded in VM...");
    sandbox.triggerDOMContentLoaded();
    console.log("DOMContentLoaded run: Completed successfully in VM!");
    
    console.log("Testing switchView('games')...");
    sandbox.window.switchView('games');
    console.log("switchView('games') run: Completed successfully in VM!");
  }
} catch (e) {
  console.error("CRITICAL RUNTIME ERROR IN VM:", e.message);
  console.error(e.stack);
  process.exit(1);
}

  polyline: () => ({
    addTo: function() { return this; },
    setStyle: function() { return this; }
  })
};

// Capture DOMContentLoaded listener
let domContentLoadedCallback = null;
const originalAddEventListener = window.addEventListener;
    }
    window.speechSynthesis.cancel();
    if (!text) {
      if (onEnd) onEnd();
      return;
    }
    const cleanText = text.replace(/<[^>]*>/g, '').trim();
    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(v => v.lang === 'en-GB' || v.lang === 'en-US') || voices.find(v => v.lang.startsWith('en'));
      if (enVoice) {
        utterance.voice = enVoice;
      }
      utterance.onstart = () => {
        if (onStart) onStart();
  window.addEventListener('mapViewActivated', () => {
    // Lazy initialize Leaflet map
    if (!mapCme) {
      setupMap();
    } else {
      // Refresh size on tab activation
      setTimeout(() => {
        if (mapCme) mapCme.invalidateSize();
      }, 100);
    }
  });
}

function setupMap() {
  const container = document.getElementById('map-cme-container');
  if (!container) return;

  // Setup CME Map centered on the Levant / Sinai region
  mapCme = L.map('map-cme-container', { scrollWheelZoom: false }).setView([30.5, 34.8], 6);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(mapCme);

  // Add Markers
  MAP_LOCATIONS_CME.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng]).addTo(mapCme);
    marker.bindPopup(`<strong>${loc.title}</strong>`);
    marker.on('click', () => {
      if (loc.isIsraeli) {
        AudioEngine.play('ping_israel');
      } else {
        AudioEngine.play('ping_arab');
      }
      showLocationDetails(loc);
    });
  });

  // Add Historical Polylines (Routes)
  
    if (headerModeSwitcher) headerModeSwitcher.style.display = 'none';
    
    // Highlight correct topic header in sidebar
    document.querySelectorAll('.nav-section-header').forEach(hdr => {
      if (hdr.getAttribute('data-topic-id') === subtopicId) {
        hdr.classList.add('active');
      } else {
        hdr.classList.remove('active');
      }
    });
    
    const viewTitle = document.getElementById('current-view-title');
    if (viewTitle) {
      const titles = {
        'topic_1': 'Key Topic 1 Overview',
        'topic_2': 'Key Topic 2 Overview',
        'topic_3': 'Key Topic 3 Overview'
      };
      viewTitle.textContent = titles[subtopicId] || "Key Topic Overview";
    }
    renderKeyTopicOverview(subtopicId);
  }

  // Remove active from topic headers if navigating to other non-key-topic views
  if (viewName !== 'key-topic' && viewName !== 'subtopic') {
            </button>
            <button class="mode-btn" data-mode="flashcards">
              <i class="fa-solid fa-clone"></i> <span>Flashcards</span>
            </button>
  // Toggle active CSS view containers
  const viewIdMap = {
    'dashboard': 'view-dashboard',
    'bookmarks': 'view-bookmarks',
    'timeline': 'view-timeline',
    'exam': 'view-exam',
    'classic': 'view-classic',
    'flashcards': 'view-flashcards',
    'lessons': 'view-mastery',
    'exam-skills': 'view-exam-skills',
    'past-papers': 'view-past-papers',
    'games': 'view-games',
    'going-beyond': 'view-going-beyond',
    'key-topic': 'view-key-topic',
    'ai-videos': 'view-ai-videos',
    'map': 'view-map',
    'leaderboard': 'view-leaderboard'
  };

  const targetViewId = viewName === 'subtopic' ? viewIdMap[state.currentMode] : viewIdMap[viewName];
  
  document.querySelectorAll('.content-view').forEach(view => {
    view.classList.remove('active');
  });
  
  const targetView = document.getElementById(targetViewId);
  if (targetView) targetView.classList.add('active');
  
  closeMobileSidebar();
  updateBrandBanner();
}

export function switchSubtopicMode(mode) {
  state.currentMode = mode;
  
  // Update header buttons active state
  document.querySelectorAll('#subtopic-mode-switcher .mode-btn').forEach(btn => {
    if (btn.getAttribute('data-mode') === mode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Switch displayed container
  document.querySelectorAll('.content-view').forEach(view => {
    view.classList.remove('active');
  });

  if (mode === 'lessons') {
      </div>
    `;
  }

  body.innerHTML = `
    ${imgHtml}
    <div style="font-size: 0.95rem; line-height: 1.6; color: var(--text-main); margin-bottom: 12px; font-style: italic;">
      <strong>Summary:</strong> ${loc.body}
    </div>
    <div style="font-size: 0.92rem; line-height: 1.65; color: var(--text-normal); margin-top: 10px;">
      <strong style="color: var(--primary); display: block; margin-bottom: 6px; text-transform: uppercase; font-size: 0.78rem; letter-spacing: 0.5px;">Geographical & Historical Case Study:</strong>
      ${loc.scholarlyContext || ''}
    </div>
    ${linksHtml}
  `;

  // Standard revision jump buttons are no longer needed
  actionContainer.innerHTML = '';

  let isSpeaking = false;
  const speakBtn = document.getElementById('btn-map-speak');
  speakBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isSpeaking) {
      AudioEngine.stopSpeaking();
      speakBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      isSpeaking = false;
    } else {
      speakBtn.innerHTML = '<i class="fa-solid fa-stop"></i>';
      isSpeaking = true;
### 3. Dashboard Subtopic Row Wording Cleanup
*   **Topic Code Integration**: Combined the topic code directly with the main heading (e.g. `KT 1.1: The British withdrawal...`) inside `src/views.js`.
*   **Repetition Removal**: Removed the secondary subtext line that previously repeated the topic code and year range (e.g., `KT 1.1 • 1945–1949`), eliminating visual redundancy.
*   **Lesson Inquiry Underneath**: Plotted the specific lesson's inquiry question (from `subtopicInquiries`) directly underneath the header line in a soft italicized style.

### 4. Collapsible Do Now Starters (Click to Reveal)
*   **Hidden by Default**: Wrapped the Do Now Starter HTML (including the background context card for lesson 1.1) in a collapsible container `.do-now-content-wrapper` set to `display: none` by default.
*   **Collapsible Header**: Placed a clean, click-to-reveal header `.do-now-toggle-header` above the content with a chevron indicator.
*   **Interactive Toggles**: Programmed show, hide, and chevron rotation handlers in `src/lessons.js` that trigger when the header is clicked.

---

## 3-2-1 Paper 2 Factual Starter (June 2026)

We have successfully integrated the **3-2-1 Retrieval Challenge** format across all 7 retrieval do-now starters in the curriculum (`subtopic_1_2`, `subtopic_1_3`, `subtopic_2_1`, `subtopic_2_2`, `subtopic_2_3`, `subtopic_3_1`, `subtopic_3_2`, and `subtopic_3_3`), converting them into a high-leverage Paper 2 preparation engine.

### 1. 
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

* Configured right-side **Visual Anchors** representing relevant maps or historical scenes with fallback Wikipedia image URLs.
* Added a dedicated **Key Concept callout** box for each starter providing sophisticated tier-3 historical vocabulary:
  * **Topic 1.2:** Key Concept *Zionism*
  * **Topic 1.3:** Key Concept *Armistice*
  * **Topic 2.1:** Key Concept *Nationalisation*
  * **Topic 2.2:** Key Concept *Casus Belli*
  * **Topic 2.3:** Key Concept *Occupation*
  * **Topic 3.1:** Key Concept *Embargo*
  * **Topic 3.2:** Key Concept *Accord*
  * **Topic 3.3:** Key Concept *Intifada*

### 2. Conditional Template Renderer & Styling Refinements (`src/lessons.js`)
* Programmed `renderMasteryView` to render the dual-column layout for any starter with `dn.format === '321'`.
* Fixed duplicate emoji/icon rendering by keeping single raw emojis (`🎯`, `⏳`, `✏️`) and removing double FontAwesome icons.
* Tightened the vertical spacing on the left column by reducing list item gaps to `4px` and container gaps to `10px`.
* Moved both the Exam Concept heading and the italicized question inside the tinted box container for a cleaner visual grouping.
* Structured the **Answer Key** inside a revealable answers drawer showing the 6 structured answers.

### 3. Syntax Bug Fix (`src/lessons.js`)
* Cleaned up a trailing template literal syntax error `}    `;` at the end of the `if/else` render block to ensure correct execution.

### 4. Integration Verification (`test_all_features.js`)
* Added automated tests navigating to `subtopic_2_2`, verifying that the 3-2-1 Retrieval Challenge container and *Casus Belli* details render properly, and verifying that clicking "Reveal Do Now Guide Answers" successfully opens the answer key drawer.

---

## Dashboard Layout and Inquiry Wording Refinements (June 2026)

To optimize vertical space on the home dashboard page and polish subtopic labels:
1. **Consolidated Shortcut Cards**: Merged the "Test & Practice" and "Play & Compete" sections into a single section titled **"Practice, Play & Compete"** using a 5-column grid (`.hub-grid-5`). The "Games Hub" and "Leaderboard" cards are now lined up alongside "Quiz Generator", "Exam Practice", and "Past Papers" on a single row, saving significant screen space.
2. **Defined Responsive Grid Layout**: Styled `.hub-grid-5` in `style.css` to wrap gracefully to 3 columns on tablet viewports, 2 columns on small tablets/mobile landscapes (768px), and collapse to 1 column on mobile screens (640px).
3. **Dashboard Header Cleanup**: Renamed the Topics Mastery List header from **"Key Topics Progress"** to **"Key Topics"**.
4. **Stripped "Inquiry:" Prefix**: Cleaned up the `subtopicInquiries` in `src/views.js` and `INQUIRY_QUESTIONS` in `src/navigation.js` to remove the redundant `"Inquiry: "` prefix. Lesson detail views and dashboard lists now display the inquiry questions directly and cleanly.
5. **Key Topics Year Range Simplification**: Removed the bracketed year ranges (e.g., `(1945–63)`) from the main topic inquiries on the dashboard in [views.js](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/src/views.js) and from the game topic headers in [games.js](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/src/games.js) to keep titles concise and prevent wrapping.
6. **Key Topics Card Height Alignment**: Implemented a `min-height: 105px` style ru
7. **Curriculum Date Consistency**: Adjusted Key Topic 1.1's date boundary in [lessons_data.js](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/src/lessons_data.js) from `(1945–1949)` to `(1945–1948)` to perfectly match the subtopic inquiries and Edexcel Option P5 specifications.

---

## Games Selector Tab Bar Layout Fix (June 2026)

To resolve a layout bug where the game selector tab buttons overflowed the `max-width: 800px` container and were truncated/clipped on desktop and tablet viewports (e.g., in full-screen or narrow-screen modes):
1. **Grid Layout Conversion**: Changed the default `.games-tab-bar` layout in `style.css` from a wrapping flex container to a clean, auto-filling CSS Grid container (`display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));`). This aligns all 9 games into a clean, uniform grid that scales and wraps perfectly across desktop and tablet screen widths.
2. **Narrow Viewports Mobile Query**: Moved the mobile-only swipable layout rules (`display: flex; flex-wrap: nowrap; overflow-x: auto;`) into a dedicated `@media (max-width: 580px)` media query block. This ensures that the horizontal scrolling bar is only used on mobile-sized screens.
3. **Interactive Mouse Scrolling**: Configured the swipable layout's scrollbar suppression to trigger only on native touch devices (`@media (hover: none) and (pointer: coarse)`). On desktop browsers resized to mobile width, a custom scrollbar will remain visible, allowing mouse users to scroll through the games list easily.

---

## Middle East Chronology Parser Retro Game (June 2026)

We have successfully integrated a brand-new retro text adventure parser game into the Games Hub:
1. **UI Assembly**: Added a new tab button `btn-tab-game-parser` with a terminal icon (`fa-ter
2. **Interactive Command Parser Engine**: Implemented the game engine script (`meEpicEngine` and `initParserGame`) in [src/games.js](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/src/games.js). It supports text commands (`LOOK`, `GO EAST`, `EXAMINE CRATE`, `TAKE CERTIFICATE`, etc.) to let students explore historical settings from Key Topic 1 (refugee ship Mandate crisis, 1948 War Negev outpost, 1956 Suez Crisis Sinai Command tent).
3. **Sound Effects & Reset Hooks**: Hooked up the game events with responsive audio clicks, error pings, and victory fanfare chimes (`AudioEngine.play`). Wired tab switching events in [src/views.js](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/src/views.js) to initialize/reset the console terminal state.
4. **Integration Testing**: Updated `test_all_features.js` to automatically verify the new tab button, view panel display, and simulate command execution through the text interpreter.

---

## Upgraded Input Parser & Normalizer (June 2026)

We have upgraded the Chronology Command game's text interpreter with a robust, fuzzy normalizer:
1. **Vocabulary Matrix**: Implemented a comprehensive `vocabularyMatrix` mapping student command synonyms for verbs (e.g. examine, inspect, look, search), nouns (e.g. crate, box, chest), and directions (e.g. east, gangway, pier).
2. **Stop Words Filter**: Added a `stopWords` list to filter out common filler words (e.g. "the", "a", "an", "at", "in", "into", "to") from inputs before parsing.
3. **Flexible Parser**: Added the `flexibleParse(rawInput)` utility function in [src/games.js](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/src/games.js) to resolve complex natural commands to standardized canonical tokens (e.g. "look inside box" is resolved to `examine crate`, and "use spool of wire on transmitter" is resolved to `use wire`).
4. **Dynamic Exit Resolution**: Programmed a smart location-exit resolver inside `processCommandInterpreter` to dynamically match room exits against the raw target noun. For example, typing "go deck" or "deck" from the cargo hold automatically resolves to "go up" (as the hold's exit to the deck is upward), while typing the same from the pier resolves to "go west" (as the gangway exit to the deck is westward).
5. **Comprehensive Testing**: Verified the parser using custom unit tests in [scratch/test_parser.js](file:///C:/Users/fives/.gemini/antigravity/brain/6afc17fc-c4f8-4208-91bb-00957afe130a/scratch/test_parser.js) and the main integration t

---

## Interactive Geopolitical Leaflet Map Integration (June 2026)

We have successfully integrated the application's existing Leaflet-based map system into the **Chronology Command** game workspace:
1. **Side-by-Side Flex Layout**: Structured `#game-parser-container` in [index.html](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/index.html) into `.me-epic-game-workspace` to hold the terminal console (left) and Leaflet map container (right) side-by-side.
2. **Dynamic Leaflet Integration**: Initialized a Leaflet map viewport inside the game view (`#me-game-map`), plotting Haifa Port, Negev Outpost, Sinai Command HQ, Straits of Tiran, and Suez Canal using real map tiles and custom glowing markers.
3. **Premium Visual Styling**: Leveraged custom Leaflet `DivIcon`s with CSS-based drop shadows and size animations (`mePulse` keyframe) to create high-contrast glowing nodes. Applied a global CSS dark mode filter to Leaflet tiles to integrate standard OpenStreetMap map graphics seamlessly into the retro-futuristic Midnight theme.
4. **Dynamic Movement Sync**: Programmed `syncGeographicLeafletMap(roomKey, chapterNum)` in [src/games.js](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/src/games.js) to automatically pan, zoom, draw campaign route polylines, and toggle active markers as player text commands advance.
5. **Robust Resizing & Testing**: Wrapped `invalidateSize()` inside a short timeout during view synchronization to ensure Leaflet renders container dimensions correctly when switching between game tabs. All tests pass successfully.

---

## Refined Leaflet Map Aesthetics, Layouts, and Providers (June 2026)

We have polished the live maps across all study and gamification views to achieve a premium, high-contrast visual design and perfect layout alignments:
1. **Unified CartoDB Dark Matter Base Tiles**: Replaced standard OpenStreetMap tile layers with **CartoDB Dark Matter** (`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`) in both the [Geographical Map Explorer](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/src/map_explorer.js) and the [VLE lesson subtopic maps](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/src/lessons.js).
2. **Removed Global CSS Inversion Filter**: Removed the hacky, resource-intensive `.leaflet-tile` invert/contrast filter in [style.css](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/style.css). This allows native, high-performance dark monochrome tiles to render cleanly without double-inverting or artifacting.
3. **Aligned Viewport Height**: Updated `.me-map-viewport` and `#me-game-map` CSS/HTML properties to stretch dynamically using flexbox properties (`flex: 1`). This ensures that the map container on the right perfectly matches the height of the terminal panel on the left, keeping both columns aligned horizontally across different viewports.

---

## Act Transition Text Synchronization Fix (June 2026)

We fixed a narrative-synchronization issue in the Chronology Command game during the transition from Act 1 to Act 2:
1. **Fuzzy Noun Match**: Upgraded the certificate check to use `noun.includes("certificate")` to match user variations smoothly.
2. **Instant Room Text Load**: Modified the return statement to query `meEpicEngine.rooms[meEpicEngine.state.room].description` and append it directly to the success message. This forces the new Act 2 room (OUTPOST) text to render immediately in the console rather than requiring a subsequent `LOOK` command.
3. **Proper HUD/Map Synchronization**: Switched the synchronization callback to use the correct `syncEngineHudDisplay()` method, updating the visual map indicators and status HUD metrics in lockstep with the text adventure progression.

---

## Game Rename to "Haifa to Sinai: Text Adventure" (June 2026)

Following alignment on student engagement and retro CRT game aesthetics, we renamed the game from "Chronology Command" to **"Haifa to Sinai: Text Adventure"**:
1. **HTML Selector Tab**: Updated the games selector tab button in [index.html](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/index.html#L762) to display "Haifa to Sinai: Text Adventure".
2. **Terminal Engine HUD**: Updated the left terminal pane's system HUD header in [index.html](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/index.html#L982) to read `ENGINE: HAIFA TO SINAI v2.5`.
3. **Terminal Intro Logo**: Updated the starting boot text output inside [src/games.js](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/src/games.js#L2376) to print `HAIFA TO SINAI: TEXT ADVENTURE`.
4. **Style Sheet comments**: Updated documentation headers in [style.css](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/style.css#L7968).
5. **JSDOM Assertions**: Synced all automated unit test logs and selector assertions inside [test_all_features.js](file:///c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/test_all_features.js#L512) to verify the new name.




                    <i class="fa-regular fa-star"></i>
                  </span>
                </div>
                <div class="card-top-topic" id="card-front-topic" style="font-size: 0.75rem; font-weight: 600; color: var(--primary); margin-top: 8px; text-align: left; width: 100%; opacity: 0.8;">KT 1.1: The British withdrawal and the creation of Israel</div>
                <div class="card-body">
                  <h3 class="card-question" id="card-front-question">What legal authority was Britain given by the League of Nations in 1920 to govern Palestine?</h3>
                </div>
                <div class="card-bottom">
                  <i class="fa-solid fa-rotate"></i> Click card to flip and reveal answer
                </div>
              </div>

              <!-- Back Face -->
              <div class="flashcard-face flashcard-back">
                <div class="card-top">
                  <span class="badge badge-easy" id="card-back-badge">Easy</span>
                  <span class="bookmark-icon-container" id="card-back-bookmark" title="Bookmark Question">
                    <i class="fa-regular fa-star"></i>
                  </span>
                </div>
      subtopicsHTML += `
        <div class="dashboard-subtopic-row" data-subtopic-id="${sub.id}">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 8px;">
            <span style="color: var(--text-main); font-family: var(--font-heading); font-size: 0.82rem; font-weight: 600;">
              ${sub.title.replace(/^Topic \d\.\d:\s*/, "")}
            </span>
            <span class="subtopic-pct-badge" style="font-size: 0.7rem; ${subPct === 0 ? 'background: rgba(148, 163, 184, 0.15); color: var(--text-muted);' : 'background: #ffb703; color: #0b0f19; font-weight: 800;'} padding: 2px 6px; border-radius: 10px; font-weight: 700; flex-shrink: 0;">
              ${subPct}%
            </span>
          </div>
          <div style="font-size: 0.72rem; color: var(--text-muted); line-height: 1.35; font-weight: 500; display: flex; justify-content: space-between; align-items: center; margin: 2px 0 4px 0; width: 100%;">
            <span>${dateFramework}</span>
            <span style="font-size: 0.68rem; font-weight: 600; opacity: 0.85;">${subMastered}/${subQs.length} Secured</span>
          </div>
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
    { btnId: 'btn-tab-game-parser', containerId: 'game-parser-container', name: 'Chronology Parser' }
  ];

  gameTabs.forEach(g => {
    const tabBtn = document.getElementById(g.btnId);
    if (!tabBtn) throw new Error(`Game tab button ${g.btnId} not found!`);
    fireClick(tabBtn);
    
    const pane = document.getElementById(g.containerId);
    if (pane.style.display === 'none') {
      throw new Error(`Game pane ${g.containerId} is not visible after selecting tab!`);
    }
    console.log(`  - Loaded Game: ${g.name}`);
  });
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
    { btnId: 'btn-tab-game-parser', containerId: 'game-parser-container', name: 'Haifa to Sinai: Text Adventure' }
  ];

  gameTabs.forEach(g => {
    const tabBtn = document.getElementById(g.btnId);
    if (!tabBtn) throw new Error(`Game tab button ${g.btnId} not found!`);
    fireClick(tabBtn);
    
    const pane = document.getElementById(g.containerId);
    if (pane.style.display === 'none') {
      thro
  const initTabooBtn = document.getElementById('btn-taboo-initialize');
  if (initTabooBtn) {
  const initTabooBtn = document.getElementById('btn-taboo-initialize');
  if (initTabooBtn) {
    fireClick(initTabooBtn);
    const startTurnBtn = document.getElementById('btn-taboo-start-turn');
    if (startTurnBtn) fireClick(startTurnBtn);
    console.log("      . Taboo initialized, turn started.");
  }

  // 7d. Chronology Command Game
  console.log("    * Verifying Chronology Command:");
  fireClick(document.getElementById('btn-tab-game-parser'));
  const parserForm = document.getElementById('me-parser-form');
  const parserField = document.getElementById('me-user-input');
  if (parserForm && parserField) {
    parserField.value = 'look';
    const submitEvent = new dom.window.Event('submit', { bubbles: true, cancelable: true });
    parserForm.dispatchEvent(submitEvent);
    console.log("      . Command form submitted successfully.");
  }

  console.log("✓ Revision Games Hub tests passed.");

  console.log("\n=================================================");
  console.log("ALL FEATURES VERIFIED AND CONFIRMED FUNCTIONAL!");
  console.log("=================================================");
  fireClick(document.getElementById('btn-tab-game-taboo'));
  const initTabooBtn = document.getElementById('btn-taboo-initialize');
  if (initTabooBtn) {
    fireClick(initTabooBtn);
    const startTurnBtn = document.getElementById('btn-taboo-start-turn');
    if (startTurnBtn) fireClick(startTurnBtn);
    console.log("      . Taboo initialized, turn started.");
  }

  // 7d. Chronology Command Game
  console.log("    * Verifying Chronology Command:");
  fireClick(document.getElementById('btn-tab-game-parser'));
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

  console.log("✓ Revision Games Hub tests passed.");

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

      "The use of terrorism, Israel's response and international attitudes towards the Palestine issue: the PFLP airplane hijacks of 1970; Black September and the Munich Olympics.",
      "The expulsion of the PLO from Jordan (1970)."
    ],
    "headerTitle": "<i class=\"fa-solid fa-book-open\"></i>\r\n        🎓 GCSE CORE MASTERY: Key Topic 2.2 - The Six Day War (1967) and its aftermath",
    "headerIntro": "To achieve top marks in this topic, you need to know how Israel won the Six Day War, the massive territorial changes that followed, and how this crushing Arab defeat pushed Palestinian groups towards international terrorism.",
    "steps": [
      {
        "title": "Step 1: The Captured Territories 
.stat-card:nth-child(3) .stat-progress-fill {
  background: linear-gradient(135deg, var(--secondary), var(--success));
}

.stat-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Quick Start Sections */
.dashboard-sections {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (max-width: 1024px) {
  .dashboard-sections {
    grid-template-columns: 1fr;
  }
}

.dashboard-panel {
  background-color: var(--bg-card);
  border: 1px solid var(--border-glass);
      }
    ],
    "dualPerspective": {
      "leftHeadline": "Securing the Promised Land (Keep It)",
      "leftText": "Israel must keep the territories. They provide a vital military 'buffer zone' to protect Israel from future invasions. Furthermore, places like East Jerusalem contain the holiest sites in Judaism, and the land was promised to the Jewish people by God.",
      "rightHeadline": "An Illegal Military Occupation (Give It Back)",
      "rightText": "Taking land by force is completely illegal under international law. Under UN Resolution 242, Israel must withdraw its armed forces and return this stolen land to its rightful Arab owners in exchange for a lasting peace.",
      "neutralTitle": "⚖️ Dual Interpretation: The Post-1967 Captured Territories",
      "tipHtml": "<div class=\"examiner-tip-box\" style=\"margin-top: 18px; margin-bottom: 0;\">\r\n        <span class=\"tip-icon\">💡</span>\r\n        <div>\r\n          <strong>AO2 Exam Skill:</strong> Examiners award top marks when you can explain why different groups reacted completely differently to the exact same event!\r\n        </div>"
    },
    "narrativeChain": {
      "chainData": [
        {
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
      <!-- 8. PAST EXAM PAPERS VIEW -->
      <section class="content-view" id="view-past-papers">
        <div class="past-papers-container" style="max-width: 800px; margin: 0 auto; padding: 12px 4px;">
          <div class="exam-skills-header-card" style="background: var(--gradient-hero); padding: 24px; border-radius: var(--border-radius-md); border: 1px solid var(--border-glass); margin-bottom: 24px; box-shadow: var(--shadow-md);">
            <h2 class="exam-skills-title" style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; color: var(--text-main);">
              <i class="fa-solid fa-file-invoice" style="color: var(--primary);"></i> Past Exam Papers & Mock Generator
            </h2>
            <p class="exam-skills-desc" style="font-size: 0.9rem; line-height: 1.6; color: var(--text-muted); margin: 0;">
              Select an official Edexcel GCSE past paper from the archive, or generate a randomized full mock exam. Draft your responses in the textareas, toggle educator clues to guide your writing, and check your work against the official model answers.
            </p>
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.topic-list-card {
  border: 1px solid var(--border-glass);
  border-radius: var(--border-radius-sm);
  padding: 16px;
  cursor: pointer;
                </select>
              </div>
              <div style="flex: 1; min-width: 200px; display: flex; gap: 12px;">
                <button class="btn-primary" id="btn-start-past-paper" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; padding: 12px;">
                  <i class="fa-solid fa-play"></i> Open Paper
                </button>
                <button class="btn-secondary" id="btn-generate-mock" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; padding: 12px; border-color: var(--primary); color: var(--primary);">
                  <i class="fa-solid fa-dice"></i> Generate Mock
                </button>
              </div>
            </div>
          </div>

          <!-- Dynamic Exam Sheet Container (Hidden until paper is active) -->
          <div id="past-paper-sheet-container" style="display: none;">
            <!-- Sheet template rendered in app.js -->
          </div>
        </div>
      </section>

      <!-- 9. REVISION GAMES VIEW -->
      <section class="content-view" id="view-games">
        <div class="past-papers-container" style="max-width: 800px; margin: 0 auto; padding: 12px 4px;">
          <div class="exam-skills-header-card">
            <h2 class="exam-skills-title">
              <i class="fa-solid fa-gamepad" style="color: var(--primary);"></i> Revision Games Hub
            </h2>
            <p class="exam-skills-desc">
              Train your active recall and chronological thinking. Match historical causes, classify conflict escalation, or test your diplomatic decision-making!
            </p>
          </div>

          <!-- Game Selector Tabs -->
          <div class="games-tab-bar">
            <button class="tab-btn active" id="btn-tab-game-causal">
              <i class="fa-solid fa-link"></i> Causal Link Builder
            </button>
            <button class="tab-btn" id="btn-tab-game-chronology">
              <i class="fa-solid fa-hourglass-half"></i> Chronology Challenge
            </button>
            <button class="tab-btn" id="btn-tab-game-mastery">
              <i class="fa-solid fa-trophy"></i> Mastery Match
            </button>
            <button class="tab-btn" id="btn-tab-game-mindmap">
              <i class="fa-solid fa-network-wired"></i> Concept Connector
            </button>
            <button class="tab-btn" id="btn-tab-game-decisions">
              <i class="fa-solid fa-phone-volume"></i> Decision Simulator
            </button>
            <button class="tab-btn" id="btn-tab-game-crisis">
              <i class="fa-solid fa-phone-volume"></i> Crisis Hotline: 1973
            </button>
            <button class="tab-btn" id="btn-tab-game-tug">
              <i class="fa-solid fa-timeline"></i> Timeline Intercept
            </button>
            <button class="tab-btn" id="btn-tab-game-taboo">
              <i class="fa-solid fa-ban"></i> Taboo Revision
            </button>
            <button class="tab-btn" id="btn-tab-game-me-sim">
              <i class="fa-solid fa-map-location-dot"></i> Simulator Hub
            </button>
            <button class="tab-btn" id="btn-tab-game-parser">
              <i class="fa-solid fa-terminal"></i> Haifa to Sinai: Text Adventure
            </button>
          </div>

          <!-- Container for Causal Link Builder Game -->
          <div id="game-causal-container" class="game-view-pane" style="display: block;">
            <div class="dashboard-panel" style="padding: 24px; margin-bottom: 24px;">
              <div class="form-group" style="display: flex; flex-direction: column; gap: 8px;">
                <label class="form-label" style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted);">Choose a Subtopic to Play</label>
                <select class="select-input" id="causal-game-topic-select" style="width: 100%; padding: 12px 16px; background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-glass); border-rad
                  <option value="" disabled selected>-- Select a Topic --</option>
                  <!-- Populate dynamically -->
                </select>
              </div>
        kwFeedbackContainer.style.display = 'block';
      }
      
      box.style.display = 'block';
                <i class="fa-solid fa-link-slash" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 12px;"></i>
                <h3 style="color: var(--text-main); font-family: var(--font-heading); margin-bottom: 8px;">No Topic Selected</h3>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin: 0;">Select a subtopic from the dropdown menu above to start linking causal factors.</p>
              </div>
            </div>
          </div>

          <!-- Container for Chronology Challenge Game -->
          <div id="game-chronology-container" class="game-view-pane" style="display: none;">
            <div class="dashboard-panel" style="padding: 24px; margin-bottom: 24px;">
              <div class="form-group" style="display: flex; flex-direction: column; gap: 8px;">
                <label class="form-label" style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted);">Choose a Key Topic to Play</label>
                <select class="select-input" id="chrono-game-topic-select" style="width: 100%; padding: 12px 16px; background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); color: var(--text-main); font-size: 0.95rem; outline: none; cursor: pointer;">
                  <option value="" disabled selected>-- Select a Topic --</option>
                </select>
              </div>
            </div>
            <div id="chronology-game-play-area">
              <!-- Dynamically populated -->
            </div>
          </div>
                      <div class="meter-label"><span>DOOMSDAY CLOCK</span><span id="val-tension">11:50 PM</span></div>
                      <div class="meter-bg"><div id="bar-tension" class="meter-fill" style="width: 50%;"></div></div>
                    </div>
                    <div class="meter-card">
                      <div class="meter-label"><span>OIL LEVERAGE RATIO</span><span id="val-oil">50%</span></div>
                      <div class="meter-bg"><div id="bar-oil" class="meter-fill" style="width: 50%;"></div></div>
                    </div>
                    <div class="meter-card">
                      <div class="meter-label"><span>SADAT ALLIANCE UNITY</span><span id="val-arab">50%</span></div>
                      <div class="meter-bg"><div id="bar-arab" class="meter-fill" style="width: 50%;"></div></div>
                    </div>
                    <div class="meter-card">
                      <div class="meter-label"><span>MINESHAFTS RESERVED</span><span id="val-israel">50%</span></div>
                      <div class="meter-bg"><div id="bar-israel" class="meter-fill" style="width: 50%;"></div></div>
                    </div>
                  </div>

                  <div class="scenario-box" style="margin-bottom: 24px;">
                    <p id="crisis-scenario-text" class="scenario-text">Loading diplomatic flashpoint matrix...</p>
                  </div>

                  <div class="choices-container" id="crisis-choices-box">
                    <!-- Dynamic Buttons Go Here -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Container for Timeline Intercept Game -->
          <div id="game-tug-container" class="game-view-pane" style="display: none;">
            <div class="tug-game-container">
              <div id="tug-game-panel">
                <div class="game-header">
                  <h2 class="game-title">CHRONOLOGICAL TUG-OF-WAR</h2>
                  <div style="font-size: 0.75rem; color: #22c55e; margin-top: 4px; font-weight: bold; letter-spacing: 0.05em;">OPERATION: TIMELINE INTERCEPT</div>
                </div>

                <div class="stats-banner">
    "doNowStarter": {
      "prevSubtopicId": "subtopic_2_2",
      "prevSubtopicTitle": "Topic 2.2: The Aftermath of the 1967 War",
      "image": "assets/sources/western_wall_1967.jpg",
      "sourceUrl": "https://en.wikipedia.org/wiki/Paratroopers_at_the_Western_Wall",
      "provenance": "Israeli paratroopers at the Western Wall in East Jerusalem immediately after capturing it during the Six Day War, June 1967.",
      "seeThinkWonder": {
        "see": "Observe the emotional expressions of the soldiers standing in front of the ancient stone wall.",
        "think": "What was the religious and political significance of capturing East Jerusalem for the State of Israel?",
        "wonder": "How did the capture of this and other occupied territories transform the map and security dynamics of the Middle East?"
      },
      "recallQuestions": [
        {
          "question": "Which occupied territories did Israel capture from Egypt during the Six-Day War?",
          "answer": "The Sinai Peninsula and Gaza Strip."
        },
        {
          "question": "Which elevated occupied territory was captured by Israel from Syria?",
          "answer": "The Golan Heights."
        },
        {
          "question": "What was the number of the UN Security Council Resolution passed in November 1967 to introduce 'Land for Peace'?",
          "answer": "UN Resolution 242."
        },
        {
          "question": "What famous 'Three Nos' did Arab leaders issue at the Khartoum Summit in August 1967?",
          "answer": "No peace, no recognition, and no negotiation with Israel."
        },
        {
          "question": "What is the acronym of the radical Marxist Palestinian group that pioneered aircraft hijackings in the late 1960s?",
          "answer": "The PFLP."
        }
      ]
    },
    "causalLinks": {
      "question": "Explain why the Yom Kippur War of 1973 had a major global impact.",
      "successText": "Well done! You connected the battlefield events of 1973 to superpower brinkmanship and global economic shockwaves.",
      "factors": [
        {
          "id": "factor_bar",
          "title": "Breaching of the Bar-Lev Line",

              <!-- On-screen mobile touch controllers -->
              <div class="jsw-mobile-controls" id="jsw-mobile-controls">
                <button class="jsw-btn jsw-btn-left" id="jsw-btn-left" type="button"><i class="fa-solid fa-arrow-left"></i> Left</button>
                <button class="jsw-btn jsw-btn-jump" id="jsw-btn-jump" type="button">JUMP</button>
                <button class="jsw-btn jsw-btn-right" id="jsw-btn-right" type="button">Right <i class="fa-solid fa-arrow-right"></i></button>
              </div>

              <div id="jsw-review" class="jsw-review-pane">
                <strong>INTELLIGENCE FEED:</strong> Collect the 4 floating white spec dispatch cubes to decrypt critical Paper 2 data files. Avoid moving hazards and structural dead zones.
              </div>
            </div>
          </div>

              <div id="taboo-game-panel">
                <!-- Dynamically populated by initTabooGame in games.js -->
              </div>
            </div>
          </div>

          <!-- Container for Middle East Simulator Hub -->
          <div id="game-me-sim-container" class="game-view-pane" style="display: none;">
            <div class="me-simulation-container">
              
              <!-- SUITE MAIN LAUNCH PAD CONTROL PANEL -->
              <div id="me-dashboard" class="dashboard-panel">
                <h2>🕌 Edexcel Paper 2: Conflict in the Middle East Simulator Hub</h2>
                <p class="dashboard-subtitle">Select an interactive historical path to practice knowledge-gated decision making and unlock essay evidence:</p>
                
                <div class="paths-grid">
                  <button class="btn-launch-path path-israel" onclick="startMePath('israeli')">
                    <strong>🇮🇱 Path A: Zionist Project & Israeli Statehood</strong>
                    <span>Timeline: 1945 – 1973 (KT1 & KT2)</span>
                  </button>
                  
                  <button class="btn-launch-path path-palestine" onclick="startMePath('palestinian')">
                    <strong>🇵🇸 Path B: Palestinian Displacement & Resistance</strong>
                    <span>Timeline: 1947 – 1982 (KT1, KT2 & KT3)</span>
                  </button>
                  </button>
                  
                    <strong>🇪🇬 Path C: Egyptian Pan-Arabism & Diplomacy</strong>
                    <span>Timeline: 1956 – 1979 (KT1, KT2 & KT3)</span>
                  </button>
                  
                  <button class="btn-launch-path path-oslo" onclick="startMePath('peace')">
                    <strong>🕊️ Path D: The Intifada & Attempts at Solution</strong>
                    <span>Timeline: 1987 – 1995 (KT3)</span>
                  </button>
                </div>
              </div>

              <!-- MAIN SIMULATOR SCREEN ASSEMBLY (HIDDEN BY DEFAULT) -->
              <div id="me-simulator-core" class="adventure-layout hidden">
                
                <!-- LEFT CONSOLE: TEXT TERMINAL -->
                <div class="adventure-terminal">
                  <div class="terminal-header">
                    <button class="btn-back-dashboard" onclick="returnToDashboard()">↩️ Hub Dashboard</button>
                    <span class="status-item">📅 Year: <strong id="me-year">1945</strong></span>
                    <span class="status-item">🛡️ Score: <strong id="me-score">0</strong></span>
                  </div>

                  <div class="terminal-screen">
                  </div>

                  <div class="terminal-screen">
                    <div id="me-topic" style="font-size: 0.75rem; color: var(--primary); margin-bottom: 8px; font-weight: bold; text-transform: uppercase;"></div>
                    <p id="me-story-text" class="story-passage"></p>
                    <div id="me-historical-insight" class="insight-box hidden"></div>
                  </div>

                  <div class="terminal-input">
                    <div id="me-options-container" class="options-stack"></div>
                  </div>
                </div>

                <!-- RIGHT CONSOLE: THE ESSAY EVIDENCE TRACKER -->
                <div class="evidence-sidebar">
                  <h3>🎒 Paper 2 Essay Evidence Bank</h3>
                  <p class="sidebar-meta">Unlock verified spec points to deploy inside high-tariff 12 and 16-mark causal analysis questions:</p>
                  <ul id="me-evidence-list" class="evidence-tracker">
                    <!-- Injected Live via JS -->
                  </ul>
                </div>

              </div>

            </div>
          </div>

          <!-- Container for Middle East Chronology Parser -->
          <div id="game-parser-container" class="game-view-pane" style="display: none;">
            <div class="me-epic-game-workspace">
              
              <!-- LEFT FRAME: THE SYSTEM PARSER ENGINE -->
              <div id="me-game-root" class="me-retro-container">
                <div class="me-crt-scanlines"></div>
                <div class="me-terminal-box">
                  
                  <div class="me-status-hud">
                    <span class="hud-item">⚙️ ENGINE: CHRONOLOGY COMMAND v2.5</span>
                    <span class="hud-item">📅 ACT: <strong id="me-chap-hud">1: MANDATE CRISIS (1947)</strong></span>
                    <span class="hud-item">🎒 INV: <strong id="me-inv-hud">EMPTY</strong></span>
                  </div>

                  <div id="me-scroll-screen" class="me-terminal-screen">
                    <p class="me-sys-text">*** INFOHIST COLDWAR SIMULATOR v2.5 // GEOGRAPHIC ENGINE ACTIVE ***</p>
                    <p class="me-sys-text">SYSTEM RESOLUTION VERIFIED // OPTION P5 GEOPOLITICAL WORKSPACE</p>
                    <hr class="me-terminal-line">
                    <p id="me-story-output" class="me-story-text"></p>
                  </div>

                  <div id="me-exam-insight" class="me-insight-panel me-hidden"></div>

                  <div class="me-input-bar">
                    <span class="me-prompt-arrow">&gt;</span>
                    <form id="me-parser-form" autocomplete="off" style="flex: 1; display: flex;">
                      <input type="text" id="me-user-input" class="me-cmd-field" placeholder="ENTER COMMANDS HERE...">
                    </form>
                  </div>

                </div>
              </div>

              <!-- RIGHT FRAME: THE INTERACTIVE GEOGRAPHIC VECTOR MAP -->
              <div class="me-map-container">
                <div class="me-map-header">
                  🗺️ GEOPOLITICAL MAP OVERVIEW (<span id="me-map-loc-label">HAIFA PORT</span>)
                </div>
                <div class="me-map-viewport" style="display: flex; flex-direction: column; flex: 1; padding: 0;">
                  <div id="me-game-map" style="width: 100%; flex: 1; min-height: 400px; background-color: #0b0f19;"></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <!-- 12. LEVEL 9 MASTERY VIEW -->
      <section class="content-view" id="view-mastery">
        <div class="mastery-container" id="mastery-content-container">
          <!-- Dynamically populated by renderMasteryView in app.js -->
    <!-- Historical Interpretations Contrasting Quotes -->
    ${interpretationsHtml}
    
    ${chainHtml}
    
    ${revisionQuestionsHtml}
    
    ${kcHtml}
    
    ${impHtml}
    
    ${vaultHtml}
    
    ${summaryHtml}

    <!-- Mastery Progress Button -->
    <div style="max-width: 800px; margin: 0 auto 40px auto; padding: 0 10px;">
      <button class="mastery-btn mastery-btn-success" id="btn-mark-mastery-mastered">
        ✓ Mark Topic ${subtopicId.replace('subtopic_', '').replace('_', '.')} as Mastered
      </button>
    </div>
  `;



  // Bind Video Link Event to open in Video Modal
  const videoLinks = container.querySelectorAll('.lesson-video-link');
  
  if (state.flashcardSession.activeIndex >= state.flashcardSession.deck.length) return;
  
  const cardEl = document.getElementById('flashcard-card');
  if (cardEl.classList.contains('swipe-right') || cardEl.classList.contains('swipe-left')) return;
  
  const deck = state.flashcardSession.deck;
                    <!-- Straits of Tiran Choke point Node -->
                    <circle id="node-tiran" cx="280" cy="420" r="8" class="map-node"/>

                    <!-- TEXT MAP GRAPHICS LABELS -->
                    <text x="50" y="120" fill="#475569" font-size="14" font-weight="bold">MEDITERRANEAN SEA</text>
                    <text x="60" y="580" fill="#94a3b8" font-size="16" font-weight="bold">EGYPT</text>
                    <text x="440" y="420" fill="#4b5563" font-size="16" font-weight="bold">JORDAN</text>
                    <text x="440" y="50" fill="#4b5563" font-size="16" font-weight="bold">SYRIA</text>
                    <text x="345" y="155" fill="#fff" font-size="11" font-weight="bold">Haifa</text>
                    <text x="320" y="365" fill="#fff" font-size="11" font-weight="bold">Negev</text>
                    <text x="150" y="455" fill="#38bdf8" font-size="10" transform="rotate(82 150 455)">SUEZ CANAL</text>
                    <text x="215" y="405" fill="#38bdf8" font-size="10">Straits of Tiran</text>
                  </svg>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <!-- 12. LEVEL 9 MASTERY VIEW -->
      <section class="content-view" id="view-mastery">
        <div class="mastery-container" id="mastery-content-container">
          <!-- Dynamically populated by renderMasteryView in app.js -->
        </div>
      </section>

      <!-- 5. CHRONOLOGY TIMELINE VIEW -->
      <section class="content-view" id="view-timeline">
                    <option value="3.2a">3.2: The invasion of Lebanon (1982)</option>
                    <option value="3.2b">3.2: The First Palestinian Intifada (1987–93)</option>
                    <option value="3.3a">3.3: Arafat's renunciation of terrorism in a speech at the UN (1988)</option>
                    <option value="3.3b">3.3: The Oslo Accords (1993)</option>
                  </optgroup>

    const revealAnswersBtn = doNowCard.querySelector('.do-now-reveal-btn');
    if (revealAnswersBtn) {
      revealAnswersBtn.addEventListener('click', () => {
        AudioEngine.play('click');
        const drawer = doNowCard.querySelector('.do-now-answers-drawer');
        if (drawer) {
          const isHidden = drawer.style.display === 'none' || !drawer.style.display;
          if (isHidden) {
            drawer.style.display = 'block';
            revealAnswersBtn.innerHTML = `<i class="fa-solid fa-eye-slash"></i> Hide Do Now Answers`;
            addXp(3);
          } else {
            drawer.style.display = 'none';
            revealAnswersBtn.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> Reveal Do Now Guide Answers`;
          }
        }
      });
    }
  }

  // Bind Inline Bio Button click listeners
  const bioButtons = container.querySelectorAll('.inline-bio-btn');
  bioButtons.forEach(btn => {

.flashcard-back {
  background-color: var(--bg-card-hover);
  background-image: radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.05) 0%, transparent 40%);
  transform: rotateY(180deg);
  border-color: var(--border-active);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px 0;
}

.card-question {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.4;
  max-width: 500px;
}

.card-answer-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--success);
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.card-answer-text {
  font-size: 1.35rem;
  font-weight: 800;
  margin-bottom: 10px;
  font-family: var(--font-heading);
}

.card-explanation-text {
  font-size: 0.8rem;
  color: var(--text-muted);
  max-width: 480px;
  line-height: 1.4;
}

.card-bottom {
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-muted);
}

        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            AudioEngine.play('click');
            selectedChain.length = 0;
            renderChainBoxes();
            feedbackEl.innerHTML = '';
          });
        }
      }
    };

    renderChainBoxes();
  }

  // Bind Dual Perspective Sliders
  const sliderCards = container.querySelectorAll('.dual-perspective-card');
  sliderCards.forEach(card => {
    const slider = card.querySelector('.perspective-range-slider');
    const labelLeft = card.querySelector('.perspective-label.label-left');
    const labelRight = card.querySelector('.perspective-label.label-right');
    const headline = card.querySelector('.dual-perspective-headline');
    const text = card.querySelector('.dual-perspective-text');

    if (!slider || !labelLeft || !labelRight || !headline || !text) return;

    // Inject visual hint dynamically
    const sliderRow = card.querySelector('.dual-perspective-slider-row');
    if (sliderRow && !card.querySelector('.slider-hint')) {
          <hr style="margin: 48px 0; border: none; border-top: 1px solid var(--border-glass);">

          <!-- PANEL 2: NARRATIVE ACCOUNT (Q2 - 8 Marks) -->
          <div class="exam-panel-content" id="panel-narrative">
            <div class="exam-skills-header-card" style="background: var(--gradient-hero); padding: 24px; border-radius: var(--border-radius-md); border: 1px solid var(--border-glass); margin-bottom: 24px; box-shadow: var(--shadow-md);">
              <h2 class="exam-skills-title" style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; color: var(--text-main);">
                <i class="fa-solid fa-list-check" style="color: var(--primary);"></i> Exam Skills: 'Write a Narrative Account' (8 Marks)
              </h2>
              <p class="exam-skills-desc" style="font-size: 0.9rem; line-height: 1.6; color: var(--text-muted); margin: 0;">
                Select a narrative topic below. To secure full marks on Question 2, you must demonstrate a clear chronological sequence of events (cause/effect structure) and use analytical link words and key vocabulary. First, verify the correct chronological sequence of events, then draft your response.
              </p>
            </div>

            <div class="dashboard-panel exam-skills-panel" style="padding: 24px; background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); box-shadow: var(--shadow-md); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);">
              <div class="form-group" style="margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px;">
                <label class="form-label" style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Select Narrative Topic</label>
                <select class="select-input" id="narrative-topic-select" style="width: 100%; padding: 12px 16px; background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); color: var(--text-main); font-family: var(--font-body); font-size: 0.95rem; outline: none; cursor: pointer; transition: border-color var(--transition-fast);">
                  <option value="" disabled selected>-- Select a Narrative Topic --</option>
                  <option value="n1">Narrative 1: Outbreak of the Arab-Israeli War (1947–48)</option>
                  <option value="n2">Narrative 2: Outbreak of the Suez Crisis (1955–56)</option>
                  <option value="n3">Narrative 3: Israeli invasion of Lebanon (1970–82)</option>
  width: 0%;
  transition: width var(--transition-normal);
}

        "answer": "<strong>Model Consequence:</strong> One consequence was that the USA agreed to open a direct diplomatic dialogue with the PLO for the first time. By renouncing violence, recognizing Israel's right to exist, and accepting UN Resolution 242, Arafat met long-standing US pre-conditions, bypassing Israeli objections and breaking a decades-old diplomatic quarantine."
  
  const isFlipped = card.classList.contains('flipped');
  const revealBtn = document.getElementById('btn-flashcard-reveal');
  const actionBtns = document.getElementById('flashcard-self-grade-actions');
  const rubricContainer = document.getElementById('flashcard-rubric-container');
  
  if (isFlipped) {
    revealBtn.style.display = 'none';
    actionBtns.style.display = 'flex';
    if (rubricContainer && !state.flashcardSession.speedStudyMode) {
      rubricContainer.style.display = 'block';
    }
  } else {
    revealBtn.style.display = 'flex';
      {
        "question": "Explain the importance of Arafat, Rabin and the Oslo Accords (1993) for attempts at a solution. (8 marks)",
        "answer": "<strong>Importance Analysis:</strong><br><strong>Point 1:</strong> The Oslo Accords signed by Arafat and Rabin in 1993 were important because they achieved historic mutual recognition. The PLO recognized Israel's right to exist in peace, and Israel recognized the PLO as the legitimate representative of the Palestinian people, ending decades of total rejectionism.<br><br><strong>Point 2:</strong> They were also important because they created the framework for Palestinian self-government. The Accords established the Palestinian National Authority (PNA) to administer civil and security affairs in Gaza and Jericho, moving the peace process from a theoretical dispute to practical self-rule.",
        "isHighProbability": true
      }
    ],
    "doNowStarter": {
      "prevSubtopicId": "subtopic_3_2",
      "prevSubtopicTitle": "Topic 3.2: Lebanon Invasion & First Intifada",
      "image": "assets/sources/intifada_palestine_1987.jpg",
      "sourceUrl": "https://en.wikipedia.org/wiki/First_Intifada",
      "provenance": "A Palestinian youth throwing a stone at an Israeli military vehicle in Gaza during the First Intifada, December 1987.",
      "seeThinkWonder": {
        "see": "Observe the young boy in a civilian area throwing a rock at a heavily armored military vehicle.",
        "think": "How does the stone represent both the frustration of the population and the asymmetrical nature of the conflict?",
        "wonder": "What role did local grassroots committees play in organizing the Intifada without PLO leadership?"
      },
      "recallQuestions": [
        {
          "question": "What nickname was given to the militarized enclave established by the PLO in southern Lebanon in the 1970s?",
          "answer": "Fatahland."
        },
        {
          "question": "What was the operational name of the massive Israeli land invasion of Lebanon in June 1982?",
          "answer": "Operation Peace for Galilee."
        },
        {
          "question": "To which North African city was Yasser Arafat and the PLO leadership exiled after the 1982 siege of Beirut?",
          "answer": "Tunis (Tunisia)."
        },
        {
          "question": "What was the name of the grassroots Palestinian civilian uprising that erupted in Gaza in December 1987?",
          "answer": "The First Intifada."
        },
        {
          "question": "What name was given to Defence Minister Yitzhak Rabin's harsh military response policy to the Intifada?",
          "answer": "The 'Iron Fist' policy."
        }
      ]
    },
    "causalLinks": {
      // Close all panels
      container.querySelectorAll('.vault-answer-panel').forEach(p => p.classList.remove('active'));
      container.querySelectorAll('.vault-question-btn i').forEach(icon => {
        icon.className = 'fa-solid fa-chevron-down';
      });

      if (!isVisible) {
        panel.classList.add('active');
        btn.querySelector('i').className = 'fa-solid fa-chevron-up';
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
export function formatVaultImportanceAnswers(container) {
  const vaultItems = container.querySelectorAll('.vault-item');
  vaultItems.forEach(item => {
    const questionSpan = item.querySelector('.vault-question-btn span');
    if (!questionSpan) return;
    
    const questionText = questionSpan.textContent || '';
    if (questionText.toLowerCase().includes('explain the importance')) {
      const panel = item.querySelector('.vault-answer-panel');
      if (!panel) return;
      
      let html = panel.innerHTML;
      html = html.replace(/<strong>Importance Analysis:<\/strong>/i, '').trim();
      html = html.replace(/Importance Analysis:/i, '').trim();

// --- GAP between 1380 and 1387 ---

              <div class="form-group" style="margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px;">
                <label class="form-label" style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Select Importance Topic</label>
                <select class="select-input" id="importance-topic-select" style="width: 100%; padding: 12px 16px; background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); color: var(--text-main); font-family: var(--font-body); font-size: 0.95rem; outline: none; cursor: pointer; transition: border-color var(--transition-fast);">
              </p>
            </div>

            <div class="dashboard-panel exam-skills-panel" style="padding: 24px; background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); box-shadow: var(--shadow-md); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);">
              <div class="form-group" style="margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px;">
                <label class="form-label" style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Select Importance Topic</label>
                <select class="select-input" id="importance-topic-select" style="width: 100%; padding: 12px 16px; background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); color: var(--text-main); font-family: var(--font-body); font-size: 0.95rem; outline: none; cursor: pointer; transition: border-color var(--transition-fast);">
                  <option value="" disabled selected>-- Select a Specification Point --</option>
                  <optgroup label="Key Topic 1: The birth of the state of Israel, 1945–63" style="background: var(--bg-card); color: var(--text-main);">
                    <option value="1.1a">1.1: The bombing of the King David Hotel</option>
                    <option value="1.1b">1.1: UN Resolution 181</option>
                    <option value="1.2a">1.2: The creation of the Israeli Defence Forces</option>
                    <option value="1.3a">1.3: The Suez Crisis (1956)</option>
                  </optgroup>
                  <optgroup label="Key Topic 2: The escalating conflict, 1964–73" style="background: var(--bg-card); color: var(--text-main);">
                    <option value="2.1a">2.1: The closure of the Straits of Tiran</option>
                    <option value="2.2a">2.2: The occupied territories</option>
                    <option value="2.3a">2.3: The Yom Kippur War (1973)</option>
                  </optgroup>
                  <optgroup label="Key Topic 3: Attempts at a solution, 1974–95" style="background: var(--bg-card); color: var(--text-main);">
                    <option value="3.1a">3.1: Sadat's visit to Israel (1977)</option>
                    <option value="3.2a">3.2: PLO activities in Lebanon</option>
                    <option value="3.3a">3.3: The end of the Cold War</option>
                    <option value="3.3b">3.3: The Oslo Accords (1993)</option>
                  </optgroup>
                  <optgroup label="Past Paper Questions" style="background: var(--bg-card); color: var(--text-main);">
                    <option value="p_2018_q3_a">2018: Nasser for leadership of Arab world</option>
                    <option value="p_2019_q3_b">2019: Actions of USSR/USA for Six Day War</option>
                    <option value="p_2020_q3_b">2020: Law of Return for development of Israel</option>
                    <option value="p_2020_q3_c">2020: Kissinger's shuttle diplomacy</option>
                    <option value="p_2022_q3_a">2022: Territorial changes for Palestinians</option>

// --- GAP between 1420 and 1427 ---

          button.setAttribute('data-bio-target', bioId);
          button.innerHTML = `${matchedText} <i class="fa-solid fa-address-card" style="font-size: 0.85em; opacity: 0.85;"></i>`;
          
          const drawer = doc.createElement('div');
          drawer.className = 'inline-bio-drawer';
          drawer.id = bioId;
          drawer.innerHTML = `
            <div class="inline-bio-drawer-content">
              <img src="${figure.image}" alt="${figure.name}" class="inline-bio-img" 
                onerror="const fallback = '${getFallbackUrl(figure.image) || ''}'; if (fallback && this.src !== fallback) { this.referrerPolicy = 'no-referrer'; this.src = fallback; } else { this.style.display='none'; }">
              <div class="inline-bio-info">
                <h4 class="inline-bio-name">${figure.name}</h4>
                <div class="inline-bio-role">${figure.role}</div>
                <p class="inline-bio-text">${figure.bio}</p>
                <a href="${figure.sourceUrl}" target="_blank" class="inline-bio-source-link">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> Read full biography on Wikipedia
                </a>
              </div>
            </div>
          `;
          
          node.parentNode.replaceChild(button, rightNode);
          
          
          node.parentNode.replaceChild(button, rightNode);
          
          let blockAncestor = button.parentElement;
          while (blockAncestor && blockAncestor !== doc.body) {
            const tag = blockAncestor.tagName.toUpperCase();
            if (tag === 'P' || tag === 'LI' || tag === 'DIV' || tag === 'BLOCKQUOTE') {
              break;
            }
            blockAncestor = blockAncestor.parentElement;
          }
          if (!blockAncestor || blockAncestor === doc.body) {
            button.parentNode.insertBefore(drawer, button.nextSibling);
          } else {
            blockAncestor.parentNode.insertBefore(drawer, blockAncestor.nextSibling);
          }
          
          matchedFigures.add(figure.name);
          
          walk(remainingNode);
          return;
        }
      }
    } else {
      const tag = node.tagName ? node.tagName.toUpperCase() : '';
      if (tag !== 'A' && tag !== 'BUTTON' && !node.classList.contains('inline-bio-drawer')) {
        const children = Array.from(node.childNodes);
        for (let i = 0; i < children.length; i++) {
          walk(children[i]);
        }
      }
    }
  }
  
  walk(doc.body);
  return doc.body.innerHTML;
}
            "question": "Which Syrian Defence Minister (and future President) played a key role in escalating border clashes before the war?",
            "answer": "Hafez al-Assad",
            "explanation": "Hafez al-Assad was the Syrian Defence Minister who adopted a highly aggressive stance against Israel, later seizing presidency in 1970.",
            "year": 1967,
            "distractors": [
              "Salah Jadid",
              "Nureddin al-Atassi",
              "Bashar al-Assad"
            ]
          }
        ]
      },
      {
        "id": "subtopic_2_2",

// --- GAP between 1500 and 1520 ---

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

              <i class="fa-solid fa-map-location-dot" style="color: var(--primary);"></i> Geographical Map Explorer
            </h2>
            <p class="exam-skills-desc" style="font-size: 0.9rem; line-height: 1.6; color: var(--text-muted); margin: 0;">
              Explore 10 critical sites in the Conflict in the Middle East syllabus. Click a site to play audio pings and reveal scholarly case studies with further research links. Toggle speech output using the volume control.
            </p>
          </div>
          
          <div style="width: 100%; height: 450px; border-radius: var(--border-radius-md); border: 1px solid var(--border-glass); overflow: hidden; box-shadow: var(--shadow-lg); position: relative;">
            <div id="map-cme-container" style="width: 100%; height: 100%; z-index: 1;"></div>
          {
            "id": "q_2_2_s10",
            "question": "In which West German city did the 'Black September' group strike during the highly publicised 1972 Olympic Games?",
            "answer": "Munich",
            <span><kbd style="background: rgba(255,255,255,0.08); padding: 1px 4px; border-radius: 3px; border: 1px solid var(--border-glass);">1-0</kbd> Jump to Step</span>
          </div>
        </div>
      </div>
    `;
  }
      insightBox.classList.remove('hidden');
    } else if (data.topic.includes("Misconception") || data.topic.includes("Error")) {
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
      </section>

      <!-- 11. MAP EXPLORER VIEW -->
      <section class="content-view" id="view-map">
        <div class="map-explorer-container" style="max-width: 900px; margin: 0 auto; padding: 12px 4px; display: flex; flex-direction: column; gap: 20px;">
          <div class="exam-skills-header-card">
            <h2 class="exam-skills-title">
              <i class="fa-solid fa-map-location-dot" style="color: var(--primary);"></i> Geographical Map Explorer
            </h2>
            <p class="exam-skills-desc">
              Explore 10 critical sites in the Conflict in the Middle East syllabus. Click a site to play audio pings and reveal scholarly case studies with further research links. Toggle speech output using the volume control.
            </p>
          </div>
          
          <div style="width: 100%; height: 450px; border-radius: var(--border-radius-md); border: 1px solid var(--border-glass); overflow: hidden; box-shadow: var(--shadow-lg); position: relative;">
            <div id="map-cme-container" style="width: 100%; height: 100%; z-index: 1;"></div>
          </div>

          <!-- Location Context Box (Populated dynamically) -->
          <div id="map-context-box" class="dashboard-panel" style="display: none; padding: 24px; background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); box-shadow: var(--shadow-md);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
              <h3 id="map-context-title" style="margin: 0; font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-location-crosshairs" style="color: var(--primary);"></i> Location Details
              </h3>
            </div>
            <div id="map-context-body">
              <!-- Content injected via JS -->
            </div>
            <div id="map-context-action-container" style="margin-top: 16px; display: flex; gap: 12px; justify-content: flex-end;">
              <!-- Actions injected via JS -->

window.startMePath = startMePath;
window.returnToDashboard = returnToDashboard;
window.initMeSimGame = initMeSimGame;

// =============================================================
// CHRONOLOGY PARSER RETRO TEXT ADVENTURE GAME ENGINE
// =============================================================

const meEpicEngine = {
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
      chap: 1, name: "FAMILY HOUSE", mapLabel: "JAFFA URBAN GRID", mapCoords: [32.052, 34.753], mapZoom: 13,
      description: "You are inside your family home in Jaffa (April 1948). The UN Partition plan has triggered a brutal, localized civil war. Outside, shortwave radio broadcasts are reporting the tragic massacre of Palestinian villagers at DEIR YASSIN by extremist Irgun and Lehi militias. The terrifying news spreads absolute panic through the streets as families pack what they can carry.\nAn old wooden DESK sits in the corner. To the West, the street leads out toward the crowded JAFFA HARBOR.",
      exits: { west: "HARBOR" }
    },
    HARBOR: {
      chap: 1, name: "JAFFA HARBOR", mapLabel: "JAFFA PORT SLIPWAY", mapCoords: [32.054, 34.747], mapZoom: 13,
      description: "You are at the water's edge. In the wake of the panic caused by Deir Yassin and intense mortar shelling, Jaffa's society is collapsing. Thousands are jamming onto fishing boats. Fleeing by sea or heading SOUTH on foot toward the advancing Egyptian army lines are your only options.\nThe open coastal highway leading SOUTH stretches out ahead of you.",
      exits: { east: "HOUSE", south: "ROAD" }
    },
    ROAD: {
      chap: 2, name: "COASTAL EXODUS ROAD", mapLabel: "1948-49 WAR BORDER LINES", mapCoords: [31.504, 34.455], mapZoom: 10,
      description: "May 1948. The British Mandate has ended, Israel has declared statehood, and the international ARAB-ISRAELI WAR has erupted. Egyptian military units are passing you, marching north to engage Israeli forces, while you march south alongside 700,000 displaced Palestinians in the Nakba.\nAhead, the newly hemmed-in GAZA STRIP has become a massive humanitarian zone. A relief station tracking RATIONS sits by the camp entrance.",
      exits: { south: "CAMPS" }
    },
    CAMPS: {
      chap: 2, name: "GAZA REFUGEE CAMP", mapLabel: "AL-SHATI REFUGEE SECTOR", mapCoords: [31.531, 34.441], mapZoom: 13,
      description: "You are inside a permanent refugee camp. The 1949 Armistice Agreements have been signed, locking the borders in place and ending the open warfare, but leaving you in exile. From the wire perimeter fencing, you can see your original family lands across the armistice line.\nA recruitment group of FEDAYEEN guerrilla fighters has gathered near the eastern border wall.",
      exits: { north: "ROAD" }
    }
  },

  insights: {
    ch1_deeds: "🍊 GCSE Fact Check (KT1.2): The civil war phase (Nov 1947–May 1948) saw intense psychological warfare. The April 1948 attack on the village of Deir Yassin by Jewish paramilitary groups resulted in the deaths of over 100 civilians. Reports of the tragedy caused widespread terror, triggering the mass flight of Palestinians from urban centers like Jaffa and Haifa before Arab armies even entered the conflict.",
    ch2_nakba: "⛺ GCSE Fact Check (KT1.2): On May 15, 1948, the conflict escalated into an international war as Egypt, Jordan, Syria, and Iraq invaded. Despite initial Arab advances, unified Israeli forces secured key territories. The 1949 Armistice Lines left the Gaza Strip under Egyptian administration and the West Bank under Jordanian control, solidifying the displacement of 700,000 refugees.",
  }
};

let meParserFormBound = false;
let meGameMap = null;
let meParserFormBound = false;
let meGameMap = null;
let meActiveLayerGroup = null;

function initMeGameMap() {
  const container = document.getElementById('me-game-map');
  if (!container || meGameMap) return;

  // Create Leaflet map centered on Levant / Sinai
  meGameMap = L.map('me-game-map', { scrollWheelZoom: false }).setView([30.5, 34.5], 6);

  // Use CartoDB Dark Matter tile layer for a minimalist dark-mode style
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19
  }).addTo(meGameMap);

  meActiveLayerGroup = L.layerGroup().addTo(meGameMap);
function syncGeographicLeafletMap(roomKey, chapterNum) {
  const mapContainer = document.getElementById('me-game-map');
  if (!mapContainer) return;

  if (!meGameMap) {
    initMeGameMap();
  }
  if (!meGameMap || !meActiveLayerGroup) return;

  // Clear existing layers for dynamic turn updates
  meActiveLayerGroup.clearLayers();

  const mapLabelElement = document.getElementById('me-map-loc-label');
  const roomData = meEpicEngine.rooms[roomKey];
  if (roomData && mapLabelElement) {
    mapLabelElement.innerText = roomData.mapLabel;
  }

  // Icons configurations
  const activeIcon = L.divIcon({
    className: 'me-game-marker-icon active',
    html: `<div class="marker-dot" style="background-color: #ff9d00; box-shadow: 0 0 10px #ff9d00; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #fff; animation: mePulse 1.5s infinite alternate;"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  const permanentIcon = L.divIcon({
    className: 'me-game-marker-icon permanent',
    html: `<div class="marker-dot-static" style="background-color: #10b981; width: 10px; height: 10px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  const blockadeIcon = L.divIcon({
    className: 'me-
  }
  if (!meGameMap || !meActiveLayerGroup) return;

  // Clear existing layers for dynamic turn updates
  meActiveLayerGroup.clearLayers();

  const mapLabelElement = document.getElementById('me-map-loc-label');
  const roomData = meEpicEngine.rooms[roomKey];
  if (roomData && mapLabelElement) {
    mapLabelElement.innerText = roomData.mapLabel;
  }

  // Icons configurations
  const activeIcon = L.divIcon({
    className: 'me-game-marker-icon active',
    html: `<div class="marker-dot" style="background-color: #ff9d00; box-shadow: 0 0 10px #ff9d00; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #fff; animation: mePulse 1.5s infinite alternate;"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  const permanentIcon = L.divIcon({
    className: 'me-game-marker-icon permanent',
    html: `<div class="marker-dot-static" style="background-color: #10b981; width: 10px; height: 10px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  const blockadeIcon = L.divIcon({
    className: 'me-
      className: 'custom-leaflet-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };

  const significanceBox = document.getElementById(`lesson-map-significance-${subtopicId}`);
  
  mapConfig.points.forEach(pt => {
    const icon = createMarkerIcon(pt.highlighted);
    const marker = window.L.marker(pt.coords, { icon: icon }).addTo(map);
    
    marker.bindTooltip(pt.title, {
      permanent: pt.highlighted,
      direction: 'top',
      offset: [0, -10],
      className: pt.highlighted ? 'leaflet-tooltip-active' : 'leaflet-tooltip-inactive'
    });
    
    marker.on('click', () => {
      AudioEngine.play('click');
      if (significanceBox) {
        significanceBox.style.borderColor = 'var(--accent)';
        significanceBox.style.background = 'rgba(249, 115, 22, 0.05)';
        significanceBox.innerHTML = `<strong>📍 ${pt.title}:</strong> ${pt.description}`;
      }
      map.panTo(pt.coords);
    });
  });
  
  if (mapConfig.drawRoute && mapConfig.drawRoute.length > 0) {
    window.L.polyline(mapConfig.drawRoute, {
      color: 'var(--primary)',
      weight: 3,
      dashArray: '5, 5',
      opacity: 0.85
    }).addTo(map);
  }
}
    setMarkerState("haifa", true, "#ff9d00");
    meGameMap.setView([32.8191, 34.9983], 7);
  } 
  else if (chapterNum === 2) {
    setMarkerState("negev", true, "#ff9d00");
    meGameMap.setView([31.2500, 34.7984], 7);
  } 
  else if (chapterNum === 3) {
    if (meRoutes.sinai1956) meRoutes.sinai1956.setStyle({ opacity: 0.8 });

    if (roomKey === "COMMAND") {
      setMarkerState("sinai", true, "#ef4444");
      meGameMap.setView([29.8488, 33.8378], 7);
    } else if (roomKey === "DUNES") {
      setMarkerState("tiran", true, "#ef4444");
      setMarkerState("sinai", true, "#b91c1c");
      meGameMap.setView([27.9904, 34.4285], 7);
    }

      const suezLine = [[31.26, 32.30], [29.93, 32.55]];
      L.polyline(suezLine, { color: '#38bdf8', weight: 5, opacity: 0.8 }).addTo(meActiveLayerGroup);

      meGameMap.setView(locations.suez.coords, 8, { animate: true });
    } else {
      const suezLine = [[31.26, 32.30], [29.93, 32.55]];
      L.polyline(suezLine, { color: '#38bdf8', weight: 5, opacity: 0.5 }).addTo(meActiveLayerGroup);

      if (roomKey === "DUNES") {
        const marker = L.marker(locations.tiran.coords, { icon: blockadeIcon })
          .addTo(meActiveLayerGroup)
          .bindPopup(`<strong>${locations.tiran.label}</strong><br>${locations.tiran.desc}`);
        
        meGameMap.setView(locations.tiran.coords, 8, { animate: true });
        marker.openPopup();
      } else {
        const marker = L.marker(locations.sinai.coords, { icon: activeIcon })
          .addTo(meActiveLayerGroup)
          .bindPopup(`<strong>${locations.sinai.label}</strong><br>${locations.sinai.desc}`);
        
        meGameMap.setView(locations.sinai.coords, 8, { animate: true });
        marker.openPopup();
      }
    }
  }

  // Handle lazy resizing
  setTimeout(() => {
    if (meGameMap) meGameMap.invalidateSize();
  }, 100);
}

function syncEngineHudDisplay() {
}

// Upgraded Input Normalizer Matrix
const vocabularyMatrix = {
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
    officer:     ["officer", "man", "guard", "soldier", "registrar", "desk", "ledger"],
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
function flexibleParse(rawInput) {
  const clean = rawInput.trim().toLowerCase();
  if (!clean) return { verb: "", noun: "" };

  // Strip non-essential fluff words common in student text input
  const stopWords = ["the", "a", "an", "at", "in", "into", "to", "through", "on", "inside", "with", "around"];
  const tokens = clean.split(/\s+/).filter(t => !stopWords.includes(t));

  let rawVerb = tokens[0] || "";
  let rawNoun = tokens.slice(1).join(" ") || "";

  // Check if the first word is a known non-movement verb
  let isExplicitNonMovementVerb = false;
  for (const [canonicalVerb, synonyms] of Object.entries(vocabularyMatrix.verbs)) {
    if (canonicalVerb !== "go" && synonyms.includes(rawVerb)) {
      isExplicitNonMovementVerb = true;
      break;
    }
  }

  // 1. Resolve Direction Short-cuts (only if not preceded by a non-movement verb)
  if (!isExplicitNonMovementVerb) {
    for (const word of tokens) {
      for (const [canonicalDir, synonyms] of Object.entries(vocabularyMatrix.directions)) {
        if (synonyms.includes(word)) {
          return { verb: "go", noun: canonicalDir };
        }
      }
    }
<truncated 17421 bytes>
  for (const [canonicalVerb, synonyms] of Object.entries(vocabularyMatrix.verbs)) {
    if (synonyms.includes(rawVerb)) {
      resolvedVerb = canonicalVerb;
      break;
    }
  }

  // 3. Resolve Global Nouns (handles loose phrases or partial entries)
  // First pass: look for exact matches in the synonyms
  for (const [canonicalNoun, synonyms] of Object.entries(vocabularyMatrix.nouns)) {
    if (synonyms.includes(rawNoun)) {
      resolvedNoun = canonicalNoun;
 * Flexible Parser: Resolves fuzzy text inputs into standard engine tokens
 * @param {string} rawInput - The user's untrusted text entry
 * @returns {Object} Cleaned { verb, noun } pairing
 */
function flexibleParse(rawInput) {
  const clean = rawInput.trim().toLowerCase();
  if (!clean) return { verb: "", noun: "" };

  // Strip non-essential fluff words common in student text input
  const stopWords = ["the", "a", "an", "at", "in", "into", "to", "through", "on", "inside", "with", "around"];
  const tokens = clean.split(/\s+/).filter(t => !stopWords.includes(t));

  let rawVerb = tokens[0] || "";
  let rawNoun = tokens.slice(1).join(" ") || "";

  // Check if the first word is a known non-movement verb
  let isExplicitNonMovementVerb = false;
  for (const [canonicalVerb, synonyms] of Object.entries(vocabularyMatrix.verbs)) {
    if (canonicalVerb !== "go" && synonyms.includes(rawVerb)) {
      isExplicitNonMovementVerb = true;
      break;
    }
  }

  // 1. Resolve Direction Short-cuts (only if not preceded by a non-movement verb)
  if (!isExplicitNonMovementVerb) {
function processCommandInterpreter(rawInput) {
  const clean = rawInput.trim().toLowerCase();
  if (!clean) return "";

  // Intercept map-dependent chokepoint answer in Chapter 3
  if (meEpicEngine.state.chapter === 3 && meEpicEngine.state.room === "DUNES" && meEpicEngine.state.ch3_awaitingChokepoint) {
    const norm = clean.replace(/[^a-z0-9\s]/g, "");
    
    // Check for commander hints first
    if (norm.includes("patrol") || norm.includes("commander") || norm.includes("lookout") || norm.includes("examine") || norm.includes("talk")) {
      if (norm.includes("tiran") || norm.includes("sharm")) {
        // Fall through to success check below
      } else {
        AudioEngine.play('click');
        return "The commander looks at the southern coast on his map: 'Examine the geopolitical map closely. Tell me the name of the specific geographic chokepoint where the Egyptian blockade is positioned!'";
      }
    }
    
    const isNavigationOrMeta = 
      norm === "look" || norm === "l" || norm === "help" || norm === "inv" || norm === "inventory" ||
      norm.startsWith("go ") || norm === "east" || norm === "west" || norm === "e" || norm === "w" ||
      norm === "go east" || norm === "go west" || norm === "walk east" || norm === "walk west";
      
    if (!isNavigationOrMeta) {
      if (norm.includes("tiran") || norm.includes("sharm")) {
        meEpi
    }
  }
  // Second pass: look for substring matches
  if (!resolvedNoun) {
    for (const [canonicalNoun, synonyms] of Object.entries(vocabularyMatrix.nouns)) {
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

function processCommandInterpreter(rawInput) {
      </label>
    `).join('');
    backBody.innerHTML = `
      <h2 class="card-answer-text" id="card-back-answer" style="margin-top: 0; margin-bottom: 10px;">${q.answer}</h2>
      <div class="rubric-checklist-container" style="margin-top: 8px; padding: 12px 14px; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); text-align: left; width: 100%; box-sizing: border-box;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${rubricItemsHtml}
        </div>
      </div>
    `;
  }
  
  document.getElementById('card-front-topic-indicator').textContent = ktLabel;
  document.getElementById('card-back-topic-indicator').textContent = ktLabel;
  
  // Set bookmark states on flashcard faces
  const frontBkmk = document.getElementById('card-front-bookmark');
  if (insight) {
    insight.classList.add('me-hidden');
  }

  syncEngineHudDisplay();

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
          // Echo command onto terminal scrollback screen log
          const userParagraph = document.createElement('p');
          userParagraph.className = "me-user-print";
          userParagraph.innerText = "> " + rawLine.toUpperCase();
          logScroll.appendChild(userParagraph);

          // Evaluate action through state processing loops
          const feedbackReply = processCommandInterpreter(rawLine);
          if (feedbackReply) {
            const storyParagraph = document.createElement('p');
            storyParagraph.className = "me-story-text";
            storyParagraph.innerText = feedbackReply;
            logScroll.appendChild(storyParagraph);
          }

          // Reset prompt field and scroll view window down
          inputField.value = "";
        AudioEngine.play('success');
        syncEngineHudDisplay();
        triggerLiveHudInsight(meEpicEngine.insights.ch1_take, false);
        return "You pull a forged entry CERTIFICATE from the crate and slide it into your coat pocket. The stamps look flawlessly authentic.";
      }
      AudioEngine.play('fail');
      return "You cannot pick that up.";
    }

    if (verb === "use") {
      if (noun === "certificate" && meEpicEngine.state.inventory.includes("certificate")) {
        if (meEpicEngine.state.room === "PIER") {
          // ADVANCE STATE INTERFACE TO ACT 2
          meEpicEngine.state.chapter = 2;
          meEpicEngine.state.room = "OUTPOST";
          meEpicEngine.state.inventory = []; // Flush old structural items
          AudioEngine.play('success');
          syncEngineHudDisplay();
          triggerLiveHudInsight(meEpicEngine.insights.ch1_win, false);
          return "SUCCESSFUL RETRIEVAL ALIGNMENT! The British officer examines the forged certificate, grunts under the strain of the processing queue, and stamps your card. You pass through the gates into Haifa. \n\n---------------------------------------------\n*** CHRONOLOGY ADVANCED: CHAPTER 2 UNLOCKED ***\n---------------------------------------------";
        }
        AudioEngine.play('fail');
        return "Using that here achieves nothing.";
      }
    }
  }

  // =============================================================
  // ACT 2 ARCHITECTURE MATRIX (THE ARAB-ISRAELI WAR OF 1948)
  // =============================================================
  if (meEpicEngine.state.chapter === 2) {
    if (verb === "go") {
      let path = noun;
      if (currentRoomData.exits[path]) {
        if (meEpicEngine.state.room === "LOOKOUT" && path === "south" && meEpicEngine.state.ch2_radioRepaired && !meEpicEngine.state.ch2_reinforcementsCalled) {
          AudioEngine.play('fail');
          return "Before leaving the observation post, you should use the repaired radio transmitter to call in coordinates.";
        }
        meEpicEngine.state.room = currentRoomData.exits[path].toUpperCase();
        AudioEngine.play('click');
        syncEngineHudDisplay();
        return "You move " + path.toUpperCase() + ".\n\n" + meEpicEngine.rooms[meEpicEngine.state.room].description;
      }
      AudioEngine.play('fail');
      return "You can't go that way. Check your active exits via LOOK.";
    }

    if (verb === "examine") {
      if (!noun) return "What do you want to examine?";
      if (meEpicEngine.state.room === "BUNKER" && noun === "radio") {
        AudioEngine.play('click');
        return "It's an operational shortwave transmitter unit, but the copper antenna line has been severed from the connection terminal base. It requires a piece of wire to fix the signal chain.";
      }
      if (meEpicEngine.state.room === "BUNKER" && noun === "crate") {
        AudioEngine.play('click');
        return "You look inside 
    }
  }

  AudioEngine.play('fail');
  return "I don't recognize that specific command formulation. Type HELP to check the valid verb database structure for your room.";
}

export function initParserGame() {
  meEpicEngine.state.chapter = 1;
  meEpicEngine.state.room = "DECK";
  meEpicEngine.state.inventory = [];
  meEpicEngine.state.ch1_crateChecked = false;
  meEpicEngine.state.ch2_wireSecured = false;
  meEpicEngine.state.ch2_radioRepaired = false;
  meEpicEngine.state.ch2_reinforcementsCalled = false;
  meEpicEngine.state.ch3_cabinetChecked = false;

  const storyOutput = document.getElementById('me-story-output');
  if (storyOutput) {
    storyOutput.innerText = meEpicEngine.rooms.DECK.description;
  }
  
  const logContainer = document.getElementById('me-scroll-screen');
  if (logContainer) {
    logContainer.innerHTML = `
      <p class="me-sys-text">*** INFOHIST EMPIRE ENGINE v2.0 // MIDDLE EAST PARSER SUB-ROUTINE ***</p>
      <p class="me-sys-text">EDEXCEL SPECIFICATION P5 // KEY TOPIC 1 INTERACTIVE CHRONOLOGY</p>
      <p class="me-sys-text">INSTRUCTIONS: TYPE CORE COMMANDS LIKE 'LOOK', 'GO EAST', 'EXAMINE CRATE', OR 'TAKE CERTIFICATE'. TYPE 'HELP' FOR AN ACTION VERB SUMMARY SHEET.</p>
      <hr class="me-terminal-line">
      <p id="me-story-output" class="me-story-text">${meEpicEngine.rooms.DECK.description}</p>
    `;
  }
  
  const insight = document.getElementById('me-exam-insight');
        triggerLiveHudInsight(meEpicEngine.insights.ch1_take, false);
        return "You pull a forged entry CERTIFICATE from the crate and slide it into your coat pocket. The stamps look flawlessly authentic.";
      }
      AudioEngine.play('fail');
      return "You cannot pick that up.";
    }

    if (verb === "use") {

    }
  }

  // =============================================================
  // ACT 2 ARCHITECTURE MATRIX (THE ARAB-ISRAELI WAR OF 1948)
  // =============================================================
  if (meEpicEngine.state.chapter === 2) {
          triggerLiveHudInsight(meEpicEngine.insights.ch1_win, false);
          return "SUCCESSFUL RETRIEVAL ALIGNMENT! The British officer examines the forged certificate, grunts under the strain of the processing queue, and stamps your card. You pass through the gates into Haifa. \n\n---------------------------------------------\n*** CHRONOLOGY ADVANCED: CHAPTER 2 UNLOCKED ***\n---------------------------------------------";
        }
        AudioEngine.play('fail');
        return "Using that here achieves nothing.";
      }
    }
  }

  // =============================================================
  // ACT 2 ARCHITECTURE MATRIX (THE ARAB-ISRAELI WAR OF 1948)
  // =============================================================
  if (meEpicEngine.state.chapter === 2) {
    if (verb === "go") {
      let path = noun;
      if (currentRoomData.exits[path]) {
        if (meEpicEngine.state.room === "LOOKOUT" && path === "south" && meEpicEngine.state.ch2_radioRepaired && !meEpicEngine.state.ch2_reinforcementsCalled) {
          AudioEngine.play('fail');
          return "Before leaving the observation post, you should use the repaired radio transmitter to call in coordinates.";
        }
        meEpicEngine.state.room = currentRoomData.exits[path].toUpperCase();
        AudioEngine.play('click');
        syncEngineHudDisplay();
        return "You move " + path.toUpperCase() + ".\n\n" + meEpicEngine.rooms[meEpicEngine.state.room].description;
      }
      AudioEngine.play('fail');
      return "You can't go that way. Check your active exits via LOOK.";
    }

    if (verb === "examine") {
      if (!noun) return "What do you want to examine?";
      if (meEpicEngine.state.room === "BUNKER" && noun === "radio") {
        AudioEngine.play('click');
        return "It's an operational shortwave transmitter unit, but the copper antenna line has been severed from the connection terminal base. It requires a piece of wire to fix the signal chain.";
      }
      if (meEpicEngine.state.room === "BUNKER" && noun === "crate") {
        AudioEngine.play('click');
        return "You look inside the military supply box. It contains newly arrived rifles and equipment parts clearly stamped: MANUFACTURED IN PRAGUE. You notice a spool of electrical WIRE resting inside.";
      }
      AudioEngine.play('click');
      return "You find nothing unique about the " + noun.toUpperCase() + ".";
    }

    if (verb === "take") {
      if (!noun) return "What do you want to take?";
      if (meEpicEngine.state.room === "BUNKER" && noun === "wire") {
        if (meEpicEngine.state.inventory.includes("wire")) {
          AudioEngine.play('click');
          return "You are already carrying the wire spool.";
        }
        meEpicEngine.state.inventory.push("wire");
        AudioEngine.play('success');
        syncE

// --- GAP between 2228 and 2232 ---

        }
        AudioEngine.play('click');
        return "The lookout shouts over the sound of wind: 'Enemy armor is advancing down the sector! If we don't fix the transmitter radio inside the communications bunker and call in reinforcement coordinates, this outpost will be completely overrun!'";
      }
    }
  }

  // =============================================================
  // ACT 3 ARCHITECTURE MATRIX (THE SUEZ CRISIS OF 1956)
  // =============================================================
  if (meEpicEngine.state.chapter === 3) {
    if (verb === "go") {
      let path = noun;
      if (currentRoomData.exits[path]) {
        meEpicEngine.state.room = currentRoomData.exits[path].toUpperCase();
        AudioEngine.play('click');
        syncEngineHudDisplay();
        return "You move " + path.toUpperCase() + ".\n\n" + meEpicEngine.rooms[meEpicEngine.state.room].description;
      }
      AudioEngine.play('fail');
      return "You can't move that way here.";
    }

    if (verb === "examine") {
      if (!noun) return "What do you want to examine?";
      if (meEpicEngine.state.room === "COMMAND" && noun === "cabinet") {
        meEpicEngine.state.ch3_cabinetChecked = true;
        AudioEngine.play('success');
        return "You pull open the top drawer of the secret cabinet. Inside sits an operational file outlining a secret joint agreement: THE SÈVRES PROTOCOL. It details a plan where Israel launches a pre-emptive strike across Sinai, providing a cover excuse for Britain and France to intervene and retake the Suez Canal. You see a set of strategic military ORDERS clipped to the folder.";
      }
      if (meEpicEngine.state.room === "DUNES" && noun === "patrol") {
        AudioEngine.play('click');
        if (meEpicEngine.state.ch3_awaitingChokepoint) {
          return "The commander looks at the southern coast on his map: 'Examine the geopolitical map closely. Tell me the name of the specific geographic chokepoint where the Egyptian blockade is positioned!'";
        }
        return "The armored unit commander is checking his maps. He calls out: 'Our half-tracks are fueled and ready to push toward the canal, but we must verify our strategic campaign targets before we cross. Deliver the operational deployment orders!'";
      }
      AudioEngine.play('click');
      return "You examine the " + noun.toUpperCase() + " but find nothing unique.";
    }

    if (verb === "take") {
      if (!noun) return "What do you want to take?";
      if (meEpicEngine.state.room === "COMMAND" && noun === "orders") {
        if (!meEpicEngine.state.ch3_cabinetChecked) {
          AudioEngine.play('fail');
          return "There are no orders visible here. Inspect items in the room first.";
        }
        if (meEpicEngine.state.inventory.includes("orders")) {
          AudioEngine.play('click');
          return "You are already holding the orders.";
        }
        meEpicEngine.state.inventory.push("orders");
        AudioEngine.play('success');
      
      AudioEngine.play('fail');
      return "You can't move that way here.";
    }

    if (verb === "examine") {
      if (!noun) return "What do you want to examine?";
      if (meEpicEngine.state.room === "COMMAND" && noun === "cabinet") {
        meEpicEngine.state.ch3_cabinetChecked = true;
        AudioEngine.play('success');
        return "You pull open the top drawer of the secret cabinet. Inside sits an operational file outlining a secret joint agreement: THE SÈVRES PROTOCOL. It details a plan where Israel launches a pre-emptive strike across Sinai, providing a cover excuse for Britain and France to intervene and retake the Suez Canal. You see a set of strategic military ORDERS clipped to the folder.";
      }
      if (meEpicEngine.state.room === "DUNES" && noun === "patrol") {
        AudioEngine.play('click');
        return "The armored unit commander is checking his maps. He calls out: 'Our half-tracks are fueled and ready to push toward the canal, but we must verify our international alliance framework codes before we cross the line!'";
     
          logScroll.appendChild(userParagraph);

          // Evaluate action through state processing loops
          const feedbackReply = processCommandInterpreter(rawLine);
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
        AudioEngine.play('success');
        syncEngineHudDisplay();
        return "You secure the pre-emptive Sinai campaign deployment ORDERS from the top-secret folder.";
      }
      AudioEngine.play('fail');
      return "You can't pick that up.";
    }

    if (verb === "use") {
      if (noun === "orders" && meEpicEngine.state.inventory.includes("orders")) {
        if (meEpicEngine.state.room === "DUNES") {
          // HIGH GRADE ACCREDITATION SUCCESS TRIGGER
          AudioEngine.play('success');
          triggerLiveHudInsight(meEpicEngine.insights.ch3_suez, false);
          return "SUCCESSFUL ACCREDITATION SEQUENCE PASSED!\n\nYou deliver the operational deployment orders to the armored patrol commander. The half-track vehicle engines roar to life, advancing rapidly across the Sinai wastes.\n\nYour swift pre-emptive strike sweeps through Egyptian defenses in hours. Although intense political and financial pressure from US President Eisenhower eventually forces an Anglo-French-Israeli withdrawal from Egyptian territory, your offensive successfully reopens the vital shipping lanes through the Straits of Tiran and demonstrates Israel's clear regional military superiority.\n\n*** 🏆 SIMULATOR EXAM PROTOCOLS FULLY COMPLETED // KEY TOPIC 1 REVISION ANALYSIS METRICS LOCKED IN SECURE ***";
        }
      }
    }
  }

  AudioEngine.play('fail');
  if (insight) {
    insight.classList.add('me-hidden');
  }

  syncEngineHudDisplay();

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
          // Echo command onto terminal scrollback screen log
          const userParagraph = document.createElement('p');
          userParagraph.className = "me-user-print";
          userParagraph.innerText = "> " + rawLine.toUpperCase();
          logScroll.appendChild(userParagraph);

          // Evaluate action through state processing loops
          const feedbackReply = processCommandInterpreter(rawLine);
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
      meParserFormBound = true;
    }
  }
}

window.initParserGame = initParserGame;
window.meEpicEngine = meEpicEngine;
  
  const insight = document.getElementById('me-exam-insight');
  if (insight) {
        event.preventDefault();
        const rawLine = inputField.value.trim();
        if (!rawLine) return;

        const logScroll = document.getElementById('me-scroll-screen');
        if (logScroll) {
          // Echo command onto terminal scrollback screen log
          const userParagraph = document.createElement('p');
          userParagraph.className = "me-user-print";
          userParagraph.innerText = "> " + rawLine.toUpperCase();
          logScroll.appendChild(userParagraph);

          // Evaluate action through state processing loops
          const feedbackReply = processCommandInterpreter(rawLine);
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
      meParserFormBound = true;
    }
  }
}

window.initParserGame = initParserGame;
window.meEpicEngine = meEpicEngine;

// --- GAP between 2418 and 2463 ---

// Highscore & Leaderboard Helpers for Mastery Match and Concept Connector
function getHighScores(unitId) {
  const key = `mastery_highscores_${unitId}`;
  let scores = localStorage.getItem(key);
  if (!scores) {
    scores = [
      { name: "Alex", yearGroup: "Year 9", score: 45, date: "2026-05-28" },
      { name: "Sarah", yearGroup: "Year 10", score: 40, date: "2026-05-29" },
      { name: "James", yearGroup: "Year 8", score: 35, date: "2026-05-27" },
      { name: "Emily", yearGroup: "Year 11", score: 25, date: "2026-05-29" },
      { name: "Thomas", yearGroup: "Year 7", score: 15, date: "2026-05-26" }
    ];
    localStorage.setItem(key, JSON.stringify(scores));
  } else {
    scores = JSON.parse(scores);
  }
  return scores.sort((a, b) => b.score - a.score).slice(0, 5);
}

function saveHighScoreLocal(unitId, name, yearGroup, score) {
  const scores = getHighScores(unitId);
  const dateStr = new Date().toISOString().split('T')[0];
  scores.push({ name: name || "Anonymous", yearGroup: yearGroup || "", score: score, date: dateStr });
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem(`mastery_highscores_${unitId}`, JSON.stringify(scores.slice(0, 5)));
}

function renderMasteryLeaderboard(unitId) {
  const container = document.getElementById('mastery-leaderboard-container');
  if (!container) return;


// --- GAP between 2493 and 2569 ---

      let medal = '';
      if (idx === 0) medal = '🥇 ';
      else if (idx === 1) medal = '🥈 ';
      else if (idx === 2) medal = '🥉 ';
      const yrText = s.yearGroup ? ` <span style="font-size: 0.72rem; color: var(--text-muted);">(${s.yearGroup})</span>` : '';
      return `
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.03);">
          <span style="color: var(--primary); font-weight: bold;">${medal}${idx + 1}. ${s.name}${yrText}</span>
          <span style="color: var(--success); font-weight: 700;">${s.score} pts</span>
        </div>
      `;
    }).join('');
    container.innerHTML = `
      <h4 style="font-family: var(--font-heading); font-size: 0.88rem; margin: 12px 0 8px; color: var(--text-main); text-align: left;">
        <i class="fa-solid fa-ranking-star" style="color: var(--accent);"></i> Leaderboard Rankings:
      </h4>
      <div style="text-align: left; background: rgba(0,0,0,0.1); padding: 8px 12px; border-radius: 4px; border: 1px solid var(--border-glass);">
        ${rowsHtml}
      </div>
    `;
  }
}

function getMindMapHighScores(subtopicId) {
  const key = `mindmap_highscores_${subtopicId}`;
  let scores = localStorage.getItem(key);
  if (!scores) {
    scores = [
      { name: "Alex", yearGroup: "Year 9", score: 45, date: "2026-05-28" },
      { name: "Sarah", yearGroup: "Year 10", score: 40, date: "2026-05-29" },
      { name: "James", yearGroup: "Year 8", score: 35, date: "2026-05-27" },
      { name: "Emily", yearGroup: "Year 11", score: 25, date: "2026-05-29" },

// --- GAP between 2600 and 2610 ---

          label.style.background = 'rgba(34, 197, 94, 0.15)';
          label.style.borderLeft = '3px solid #22c55e';
          label.style.paddingLeft = '5px';
        } else if (cb.checked) {
          label.style.background = 'rgba(239, 68, 68, 0.15)';
          label.style.borderLeft = '3px solid #ef4444';
          label.style.paddingLeft = '5px';
        } else {
          label.style.background = 'rgba(255, 255, 255, 0.02)';
          label.style.borderLeft = 'none';
          label.style.paddingLeft = '8px';
        }
      });
    });
  });

  // Initialize Leaflet Map
  if (data.mapConfig && window.L) {
    setTimeout(() => {
      initializeLeafletMap(subtopicId, data.mapConfig);
    }, 100);
  }

  // How Useful Analyser Event Listeners
  if (data.howUsefulAnalyser || data.paper3Suite) {
    const huCard = container.querySelector('.how-useful-card');
    if (huCard) {
      // Tab Switching
      const tabBtns = huCard.querySelectorAll('.hu-tab-btn');
      const panels = huCard.querySelectorAll('.hu-tab-panel');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          AudioEngine.play('click');
          const targetTab = btn.getAttribute('data-tab');
          
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          // Style active tab border-bottom
          tabBtns.forEach(b => {
            b.style.borderBottom = '2px solid transparent';

// --- GAP between 2650 and 2700 ---

function saveHighScoreLocal(unitId, name, yearGroup, score) {
  const scores = getHighScores(unitId);
  const dateStr = new Date().toISOString().split('T')[0];
  scores.push({ name: name || "Anonymous", yearGroup: yearGroup || "", score: score, date: dateStr });
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem(`mastery_highscores_${unitId}`, JSON.stringify(scores.slice(0, 5)));
}

function renderMasteryLeaderboard(unitId) {
  const container = document.getElementById('mastery-leaderboard-container');
  if (!container) return;

  const localScores = getHighScores(unitId);
  renderTable(localScores);

  if (GOOGLE_SHEET_WEBAPP_URL) {
    fetch(`${GOOGLE_SHEET_WEBAPP_URL}?type=mastery&unitId=${unitId}`)
      .then(res => res.json())
      .then(scores => {
        if (Array.isArray(scores)) {
          renderTable(scores);
        }
      })
      .catch(err => console.error("Error loading remote mastery leaderboard:", err));
  }

  function renderTable(scoresList) {
    let rowsHtml = scoresList.map((s, idx) => {
      let medal = '';
      if (idx === 0) medal = '🥇 ';
      else if (idx === 1) medal = '🥈 ';
      else if (idx === 2) medal = '🥉 ';
      
      const yrText = s.yearGroup ? ` <span style="font-size: 0.72rem; color: var(--text-muted);">(${s.yearGroup})</span>` : '';
      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.82rem;">
          <td style="padding: 8px 4px; font-weight: bold; color: var(--primary);">${medal}${idx + 1}</td>
          <td style="padding: 8px 4px; color: var(--text-main);">${s.name}${yrText}</td>
          <td style="padding: 8px 4px; font-weight: 700; color: var(--success); text-align: right;">${s.score} pts</td>
          <td style="padding: 8px 4px; color: var(--text-muted); text-align: right; font-size: 0.72rem;">${s.date}</td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-glass);">
        <h4 style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin: 0 0 12px 0; display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-ranking-star" style="color: var(--accent);"></i> Top High Scores (Unit Leaderboard)
        </h4>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-glass); color: var(--text-muted); font-size: 0.72rem; text-transform: uppercase;">
              <th style="padding: 4px; font-weight: 600;">Rank</th>
              <th style="padding: 4px; font-weight: 600;">Student</th>
              <th style="padding: 4px; font-weight: 600; text-align: right;">Score</th>
              <th style="padding: 4px; font-weight: 600; text-align: right;">Date</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }
}

function renderResultsLeaderboard(unitId) {
  const container = document.getElementById('mastery-results-leaderboard');
  if (!container) return;
  
  const localScores = getHighScores(unitId);
  renderResults(localScores);

  if (GOOGLE_SHEET_WEBAPP_URL) {
    fetch(`${GOOGLE_SHEET_WEBAPP_URL}?type=mastery&unitId=${unitId}`)
      .then(res => res.json())
      .then(scores => {
        if (Array.isArray(scores)) {
          renderResults(scores);
        }
      })
      .catch(err => console.error("Error loading remote mastery results leaderboard:", err));
  }

  function renderResults(scoresList) {
    let rowsHtml = scoresList.map((s, idx) => {
      let medal = '';
      if (idx === 0) medal = '🥇 ';
      else if (idx === 1) medal = '🥈 ';
      else if (idx === 2) medal = '🥉 ';
      const yrText = s.yearGroup ? ` <span style="font-size: 0.72rem; color: var(--text-muted);">(${s.yearGroup})</span>` : '';
      return `
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.03);">
          <span style="color: var(--primary); font-weight: bold;">${medal}${idx + 1}. ${s.name}${yrText}</span>
          <span style="color: var(--success); font-weight: 700;">${s.score} pts</span>
        </div>
      `;
    }).join('');
    container.innerHTML = `
      <h4 style="font-family: var(--font-heading); font-size: 0.88rem; margin: 12px 0 8px; color: var(--text-main); text-align: left;">
        <i class="fa-solid fa-ranking-star" style="color: var(--accent);"></i> Leaderboard Rankings:
      </h4>
      <div style="text-align: left; background: rgba(0,0,0,0.1); padding: 8px 12px; border-radius: 4px; border: 1px solid var(--border-glass);">
        ${rowsHtml}
      </div>
    `;
  }
}

function getMindMapHighScores(subtopicId) {
  const key = `mindmap_highscores_${subtopicId}`;
  let scores = localStorage.getItem(key);
  if (!scores) {
    scores = [
      { name: "Alex", yearGroup: "Year 9", score: 45, date: "2026-05-28" },
      { name: "Sarah", yearGroup: "Year 10", score: 40, date: "2026-05-29" },
      { name: "James", yearGroup: "Year 8", score: 35, date: "2026-05-27" },
      { name: "Emily", yearGroup: "Year 11", score: 25, date: "2026-05-29" },
      { name: "Thomas", yearGroup: "Year 7", score: 15, date: "2026-05-26" }
    ];
    localStorage.setItem(key, JSON.stringify(scores));
  } else {
    scores = JSON.parse(scores);
  }
  return scores.sort((a, b) => b.score - a.score).slice(0, 5);
}

function saveMindMapHighScoreLocal(subtopicId, name, yearGroup, score) {
  const scores = getMindMapHighScores(subtopicId);
  const dateStr = new Date().toISOString().split('T')[0];

.jsw-game-container canvas {
  background: #000000;
  border: 2px solid #ff00ff;

function renderMindMapLeaderboard(subtopicId) {
  const container = document.getElementById('mindmap-leaderboard-container');
  if (!container) return;

  const localScores = getMindMapHighScores(subtopicId);
  renderTable(localScores);

  if (GOOGLE_SHEET_WEBAPP_URL) {
    fetch(`${GOOGLE_SHEET_WEBAPP_URL}?type=mindmap&subtopicId=${subtopicId}`)
      .then(res => res.json())
      .then(scores => {
        if (Array.isArray(scores)) {
          renderTable(scores);
        }
      })
      .catch(err => console.error("Error loading remote mindmap leaderboard:", err));
  }

  function renderTable(scoresList) {
    let rowsHtml = scoresList.map((s, idx) => {
      let medal = '';
      if (idx === 0) medal = '🥇 ';
      else if (idx === 1) medal = '🥈 ';
      else if (idx === 2) medal = '🥉 ';
      
      const yrText = s.yearGroup ? ` <span style="font-size: 0.72rem; color: var(--text-muted);">(${s.yearGroup})</span>` : '';
      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.82rem;">
          <td style="padding: 8px 4px; font-weight: bold; color: var(--primary);">${medal}${idx + 1}</td>
          <td style="padding: 8px 4px; color: var(--text-main);">${s.name}${yrText}</td>
          <td style="padding: 8px 4px; font-weight: 700; color: var(--success); text-align: right;">${s.score} pts</td>
          <td style="padding: 8px 4px; color: var(--text-muted); text-align: right; font-size: 0.72rem;">${s.date}</td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-glass);">
        <h4 style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin: 0 0 12px 0; display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-ranking-star" style="color: var(--accent);"></i> Top High Scores (Topic Leaderboard)
        </h4>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-glass); color: var(--text-muted); font-size: 0.72rem; text-transform: uppercase;">
              <th style="padding: 4px; font-weight: 600;">Rank</th>
              <th style="padding: 4px; font-weight: 600;">Student</th>
              <th style="padding: 4px; font-weight: 600; text-align: right;">Score</th>
              <th style="padding: 4px; font-weight: 600; text-align: right;">Date</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }
}

function renderMindMapResultsLeaderboard(subtopicId) {
    } else {
      masteryState.selectedTermCard = card;
      const updateDraftingAssistant = () => {
        const anyChecked = Array.from(doNowCbs).some(c => c.checked);
        if (draftingContainer) {
          draftingContainer.style.display = anyChecked ? 'flex' : 'none';
        }
        if (wrapC) wrapC.style.display = doNowCbs[0].checked ? 'block' : 'none';
        if (wrapNop) wrapNop.style.display = doNowCbs[1].checked ? 'block' : 'none';
        if (wrapOk) wrapOk.style.display = doNowCbs[2].checked ? 'block' : 'none';

        const allChecked = Array.from(doNowCbs).every(c => c.checked);
        const hasC = txtC && txtC.value.trim().length > 0;
        const hasNop = txtNop && txtNop.value.trim().length > 0;
        const hasOk = txtOk && txtOk.value.trim().length > 0;

        if (compileBtn) {
          compileBtn.style.display = (allChecked && hasC && hasNop && hasOk) ? 'block' : 'none';
        }
      };

      doNowCbs.forEach(cb => {
        cb.addEventListener('change', updateDraftingAssistant);
      });

      [txtC, txtNop, txtOk].forEach(txt => {
        if (txt) {
          txt.addEventListener('input', updateDraftingAssistant);
        }
      });

      if (compileBtn) {
        compileBtn.addEventListener('click', () => {
          AudioEngine.play('success');
          const valC = txtC ? txtC.value.trim() : '';
          co

// --- GAP between 2931 and 3050 ---

  padding: 0 2px;
  border-radius: 2px;
  font-weight: 600;
}

/* Side-by-Side Map Container inside Step 3 */
.mastery-split-layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  margin-top: 16px;
}

.mastery-text-column {
  flex: 3;
}

.mastery-media-column {
  flex: 2;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

@media (max-width: 680px) {
  .mastery-split-layout {
    flex-direction: column;
    align-items: stretch;
  }
  .mastery-media-column {
    min-width: 0;
  }
}

          ${causalHtml}
        </div>
        ${combinedButtonsHtml}
      </div>
    `;
    
    const card = item.querySelector('.timeline-content-card');
    card.addEventListener('click', (e) => {
      if (e.target.closest('.timeline-bio-btn') || e.target.closest('.timeline-lesson-btn') || e.target.closest('.causal-jump-btn')) return;
      AudioEngine.play('click');
      card.classList.toggle('revealed');
    });

    const jumpBtn = item.querySelector('.causal-jump-btn');

// --- GAP between 3099 and 3104 ---

.map-vector-box {
  width: 100%;
  aspect-ratio: 4 / 5;
  background-color: #fafafa;
  border: 1px solid #e2e8f0;
  border-radius: var(--border-radius-md);
  padding: 8px;
  box-sizing: border-box;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.02);
}

.map-vector-box svg,
.map-vector-box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.map-toggles {
  display: flex;
  gap: 8px;
  width: 100%;
}

.map-toggle-btn {
  flex: 1;
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  color: var(--text-main);
  padding: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast) ease;
  text-align: center;
  line-height: 1.2;
}

.map-toggle-btn.active {
  background: var(--primary);
  color: #ffffff;
  border-color: var(--primary);
  box-shadow: var(--shadow-sm);
}

.map-toggle-btn:hover:not(.active) {
  border-color: var(--border-active);
  background: rgba(var(--primary-rgb), 0.05);
}

/* Examiner Tip Box */
.examiner-tip-box {
  background-color: #fef9c3; /* Pale yellow */
  border-left: 4px solid #eab308; /* Yellow bar */
  color: #713f12; /* Dark yellow-brown text */

// --- GAP between 3160 and 3375 ---

        <button class="btn-primary" id="btn-mastery-play-again" style="padding: 10px 20px; font-weight: 600; font-size: 0.9rem; border-radius: 4px; cursor: pointer;">
          <i class="fa-solid fa-rotate-right"></i> Play Again (Same Topic)
        </button>
      </div>
    </div>
  `;

  renderResultsLeaderboard(masteryState.unitId);

  const submitBtn = document.getElementById('btn-submit-highscore');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const initialsInput = document.getElementById('mastery-highscore-initials');
      const yearInput = document.getElementById('mastery-highscore-year');
      
      let initials = initialsInput ? initialsInput.value.trim().toUpperCase() : "";
      let yearGroup = yearInput ? yearInput.value : "";
      
      if (initials.length !== 3 || !/^[A-Z]{3}$/.test(initials)) {
        showWarningToast("Please enter exactly 3 letters for your initials (e.g. ABC).");
        return;
      }
      if (!yearGroup) {
        showWarningToast("Please select your Year Group.");
        return;
}

.importance-flip-card.flipped .importance-card-inner {
  transform: rotateY(180deg);
}

.importance-card-front, .importance-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: var(--border-radius-md);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--border-glass);
  box-shadow: var(--shadow-sm);
}

.importance-card-front {
  background-color: var(--bg-card);
  color: var(--text-main);
}

.importance-card-front strong {
  color: var(--primary) !important;
}

.importance-card-back {
  background-color: #f0fdf4; /* Light success-green tint */
  color: #166534;
  transform: rotateY(180deg);
  overflow-y: auto;
  font-size: 0.9rem;
  line-height: 1.5;
  text-align: left;
  border-color: #bbf7d0;
}

.exam-question-vault {
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  border-radius: var(--border-radius-lg);
  padding: 24px;
  margin-bottom: 24px;
}

.vault-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  mar
  const logo = document.getElementById('header-brand-logo');
  if (logo) {
    logo.classList.add('angry');
    AudioEngine.play('fail');
    setTimeout(() => {
      logo.classList.remove('angry');
    }, 4000);
  }
}

export function validateScoreBoardInitials(initials) {
  if (!/^[A-Z]{3}$/.test(initials)) {
    return { valid: false, message: "Please enter exactly 3 letters for your initials." };
  }
  const profane = new Set([
    'ASS', 'WTF', 'FUC', 'SHI', 'CNT', 'CUM', 'FAG', 'DIK', 'KYS', 'KKK', 'SEX', 
    'NIG', 'TIT', 'FAP', 'WOP', 'PIS', 'HEL', 'DAM', 'SOB', 'PEE', 'POO', 'DIE', 
    'GAY', 'PNS', 'VAG', 'KOK', 'FUK', 'FCK', 'BCH', 'MLF', 'DCK', 'BUM', 'FUG',
    'SHT', 'XXX', 'SUK', 'HOE', 'SLT', 'WHR', 'NOB', 'KNO', 'COK', 'TAD', 'PUB'
  ]);
  if (profane.has(initials)) {
    triggerChimneyAnger();
    return { valid: false, message: "The Fareham chimney master will not allow that." };
  }
  return { valid: true };
}

function saveHighScoreLocal(unitId, name, yearGroup, score) {
  const scores = getHighScores(unitId);
  const dateStr = new Date().toISOString().split('T')[0];
  scores.push({ name: name || "Anonymous", yearGroup: yearGroup || "", score: score, date: dateStr });
  scores.sort((a, b) => b.score - a.score
  localStorage.setItem(`mastery_highscores_${unitId}`, JSON.stringify(scores.slice(0, 5)));
}

function renderMasteryLeaderboard(unitId) {
  const container = document.getElementById('mastery-leaderboard-container');
  if (!container) return;

  const localScores = getHighScores(unitId);
  renderTable(localScores);

  if (GOOGLE_SHEET_WEBAPP_URL) {
    fetch(`${GOOGLE_SHEET_WEBAPP_URL}?type=mastery&unitId=${unitId}`)
      .then(res => res.json())
      .then(scores => {
        if (Array.isArray(scores)) {
          renderTable(scores);
        }
      })
      .catch(err => console.error("Error loading remote mastery leaderboard:", err));
  }

  function renderTable(scoresList) {
    let rowsHtml = scoresList.map((s, idx) => {
      let medal = '';
      if (idx === 0) medal = '🥇 ';
      else if (idx === 1) medal = '🥈 ';
      else if (idx === 2) medal = '🥉 ';
      
      const yrText = s.yearGroup ? ` <span style="font-size: 0.72rem; color: var(--text-muted);">(${s.yearGroup})</span>` : '';
      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.82rem;">
          <td style="padding: 8px 4px; font-weight: bold; color: var(--primary);">${medal}${idx + 1}</td>
          <td style="padding: 8px 4px; color: var(--text-main);">${s.name}${yrText}</td>
          <td style="padding: 8px 4px; font-weight: 700; color: var(--success); text-align: right;">${s.score} pts</td>
          <td style="padding: 8px 4px; color: var(--text-muted); text-align: right; font-size: 0.72rem;">${s.date}</td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-glass);">
        <h4 style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin: 0 0 12px 0; display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-ranking-star" style="color: var(--accent);"></i> Top High Scores (Unit Leaderboard)
        </h4>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-glass); color: var(--text-muted); font-size: 0.72rem; text-transform: uppercase;">
              <th style="padding: 4px; font-weight: 600;">Rank</th>
              <th style="padding: 4px; font-weight: 600;">Student</th>
              <th style="padding: 4px; font-weight: 600; text-align: right;">Score</th>
              <th style="padding: 4px; font-weight: 600; text-align: right;">Date</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }
}

function renderResultsLeaderboard(unitId) {

// --- GAP between 3550 and 3650 ---

    
    const icon = createMarkerIcon(isHighlighted);
    const marker = window.L.marker(pt.coords, { icon: icon }).addTo(map);
    
    marker.bindTooltip(cleanName, {
      permanent: isHighlighted,
      direction: 'top',
      offset: [0, -10],
      className: isHighlighted ? 'leaflet-tooltip-active' : 'leaflet-tooltip-inactive'
    });
    
    marker.on('click', () => {
      AudioEngine.play('click');
      if (significanceBox) {
        significanceBox.style.borderColor = 'var(--accent)';
        significanceBox.style.background = 'rgba(249, 115, 22, 0.05)';
        significanceBox.innerHTML = `<strong>📍 ${cleanName}:</strong> ${applyGlossaryTooltips(significanceText)}`;
      }
      map.panTo(pt.coords);
    });
  }
  
  if (mapConfig.drawRoute && mapConfig.drawRoute.length > 0) {
    const routeCoords = mapConfig.drawRoute.map(pid => {
      const pt = pointsDb[pid];
      return pt ? pt.coords : null;
    }).filter(c => c !== null);
    
    const isTrail = mapConfig.drawRoute.includes('laos') && mapConfig.drawRoute.includes('cambodia');
    const color = isTrail ? 'var(--accent)' : 'var(--primary)';
    
    window.L.polyline(routeCoords, {
      color: color,
      weight: 3,
      dashArray: '5, 5',
      opacity: 0.85
    }).addTo(map);
  }
  
  if (!isUsa) {
    window.L.polyline([[17.0, 104.5], [17.0, 108.5]], {
          <i class="fa-solid fa-rotate-left"></i> Setup Screen
        </button>
        <button class="btn-primary" id="btn-mindmap-play-again" style="padding: 10px 20px; font-weight: 600; font-size: 0.9rem; border-radius: 4px; cursor: pointer;">
          <i class="fa-solid fa-rotate-right"></i> Play Again (Same Topic)
        </button>
      </div>
    </div>
  `;

  renderMindMapResultsLeaderboard(mindmapState.subtopicId);

  const submitBtn = document.getElementById('btn-submit-mindmap-highscore');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const initialsInput = document.getElementById('mindmap-highscore-initials');
      const yearInput = document.getElementById('mindmap-highscore-year');
      
      let initials = initialsInput ? initialsInput.value.trim().toUpperCase() : "";
      let yearGroup = yearInput ? yearInput.value : "";
      
      const val = validateScoreBoardInitials(initials);
      if (!val.valid) {
        showWarningToast(val.message);
        return;
      }
      if (!yearGroup) {
        showWarningToast("Please select your Year Group.");
        return;
      }
      
      const name = initials;
      saveMindMapHighScoreLocal(mindmapState.subtopicId, name, yearGroup, mindmapState.score);
      AudioEngine.play('success');
      
      

// --- GAP between 3725 and 3740 ---

        <button class="btn-primary" id="btn-mindmap-play-again" style="padding: 10px 20px; font-weight: 600; font-size: 0.9rem; border-radius: 4px; cursor: pointer;">
          <i class="fa-solid fa-rotate-right"></i> Play Again (Same Topic)
        </button>
      </div>
    </div>
  `;

  renderMindMapResultsLeaderboard(mindmapState.subtopicId);

  const submitBtn = document.getElementById('btn-submit-mindmap-highscore');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const initialsInput = document.getElementById('mindmap-highscore-initials');
      const yearInput = document.getElementById('mindmap-highscore-year');
      
      let initials = initialsInput ? initialsInput.value.trim().toUpperCase() : "";
      let yearGroup = yearInput ? yearInput.value : "";
      
      if (initials.length !== 3 || !/^[A-Z]{3}$/.test(initials)) {
        showWarningToast("Please enter exactly 3 letters for your initials (e.g. ABC).");
        return;
      }
      if (!yearGroup) {
        showWarningToast("Please select your Year Group.");
        return;
      }
      
      const name = initials;
      saveMindMapHighScoreLocal(mindmapState.subtopicId, name, yearGroup, mindmapState.score);
      AudioEngine.play('success');
      
      if (GOOGLE_SHEET_WEBAPP_URL) {
        const payload = {
          type: "mindmap",
          subtopicId: mindmapState.subtopicId,
          name: name,
          yearGroup: yearGroup,
          score: mindmapState.score,
          date: new Date().toISOString().split('T')[0]
        };
        

// --- GAP between 3780 and 3832 ---

          ${finalChoice.verdict}
        </p>
      </div>

      <div style="display: flex; gap: 12px; justify-content: center; border-top: 1px solid var(--border-glass); padding-top: 18px; flex-wrap: wrap;">
        <button class="btn-secondary" id="btn-dec-menu" style="padding: 10px 20px; font-weight: 600; font-size: 0.9rem; border-radius: 4px; cursor: pointer;">
          <i class="fa-solid fa-rotate-left"></i> Scenario Menu
        </button>
      "immigration",
      "78%"
    ],
    "question": "Write a narrative account analysing the developments in Israel in the years 1949-54.",
    "events": [
      "Israel gains territory from the 1948 war, creating long, hostile borders.",
      "Israel consolidates its military into the single Israeli Defence Forces (IDF).",
      "Israel passes the Law of Return, triggering mass Jewish immigration (1950)."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "model": "<strong>Paragraph 1: Post-War Influx and the Law of Return (1949-50)</strong><br>In the immediate aftermath of the 1948-49 war, the newly established state of Israel faced the urgent task of defending and consolidating its borders. Under the armistice agreements of 1949, Israel captured 78% of former Palestine. <strong>However, these new borders</strong> were long, poorly defined, and surrounded by hostile Arab nations, which <strong>triggered</strong> frequent cross-border infiltrations, prompting Israel to pass the Law of Return in 1950 giving any Jew the right to immigrate.<br><br><strong>Paragraph 2: Economic Strain and Austerity (1950-52)</strong><br><strong>Subsequently</strong>, the arrival of hundreds of thousands of new citizens placed an overwhelming strain on the country's weak economy. To manage this population influx, the government was <strong>forced</strong> to implement a strict austerity regime (Tzena), rationing food and fuel. <strong>To ho
  document.getElementById('btn-dec-retry').addEventListener('click', () => {
    AudioEngine.play('click');
    playDecisionsScenario(gameId);
  });

      "Coastal Road Massacre",
      "Operation Litani",
      "Operation Peace for Galilee"
    ],
    "question": "Write a narrative account analysing the key developments of the PLO in Lebanon in the years 1970-82.",
    "events": [
      "The PLO is expelled from Jordan and establishes 'Fatahland' in Lebanon.",
      "PLO cross-border rocket attacks and raids trigger conflicts like Operation Litani.",
      "The attempted assassination of the Israeli ambassador in London sparks Operation Peace for Galilee (1982)."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "model": "<strong>Paragraph 1: Expulsion from Jordan and Fatahland (1970-75)</strong><br>The PLO's presence in Lebanon was established after their violent expulsion from Jordan during the Black September conflict of 1970-71. Yasser Arafat and thousands of armed fighters relocated to Lebanon, taking advantage of the weak central government in Beirut. <strong>This influx of militants enabled</strong> the PLO to set up a powerful administrative and military base in southern Lebanon, which became known as 'Fatahland', effectively creating a 'state within a state'.<br><br><strong>Paragraph 2: Cross-Border Raids and Operation Litani (1975-78)</strong><br><strong>Subsequently</strong>, from this new southern Lebanese base, the PLO launched frequent rocket attacks and cross-border raids into northern Israeli towns, including the deadly 1978 Coastal Road Massacre. <strong>These constant guerrilla attacks provoked</strong> heavy Israeli military reprisal strikes and destabilized Lebanon's fragile sectarian balance, contributing directly to the outbreak of the Lebanese Civil War. <strong>Consequently</strong>, Isra
  }
};

const PAST_PAPERS_DATA = [
  {
    "id": "2018_summer",
    "title": "Summer 2018 Past Paper",
    "year": "2018",
    "q1": {
      "type": "consequence_8",

// --- GAP between 3885 and 3899 ---

    },
    "q3": {
      "type": "importance_choice",
      "question": "Explain two of the following: (16 marks)",
      "choices": [
        {
          "id": "2018_q3_a",

// --- GAP between 3905 and 3914 ---

          "model": "<strong>Point 1:</strong> The occupied territories were important because they fundamentally altered the military dynamic, giving Israel strategic buffer zones like the Sinai, West Bank, and Golan Heights. This enhanced Israel's security, but placed millions of Palestinians under Israeli military occupation, fueling resentment.<br><br><strong>Point 2:</strong> It was also important because it hardened Arab diplomatic resistance, prompting the Arab League to issue the 'Three Nos' (no peace, no negotiation, no recognition) at Khartoum, and leading to UN Resolution 242's 'Land for Peace' formula, which became the disputed basis for all future negotiations."
        },
        {
          "id": "2018_q3_c",
          "title": "The importance of the end of the Cold War for attempts to find a solution in the Middle East.",
          "clue": "Explain how the collapse of the USSR stripped the PLO of its main source of funding and weapons, which forced Arafat to compromise and attend the US-led Madrid Conference.",
          "model": "<strong>Point 1:</strong> The end of the Cold War was important because the collapse of the Soviet Union in 1991 stripped the PLO and Syria of their primary military, financial, and diplomatic backer, leaving them isolated and severely weakened.<br><br><strong>Point 2:</strong> It was also important because it left the USA as the sole global superpower, allowing Washington to exert immense diplomatic pressure on both Israel and Arab states, which forced Yasser Arafat to make compromises and participate in the landmark Madrid Peace Conference in 1991."

// --- GAP between 3920 and 4034 ---

    },
    "q3": {
      "type": "importance_choice",
      "question": "Explain two of the following: (16 marks)",
      "choices": [
        {
          "id": "2022_q3_a",
          "title": "The importance of territorial changes in the aftermath of the 1948-49 war for Palestinians.",
          "clue": "Detail how Israel expanded beyond the UN partition borders, leaving no land for an independent Palestinian state and creating 700,000 stateless refugees.",
          "model": "<strong>Point 1:</strong> The territorial changes were impo

    newSubmitBtn.addEventListener('click', () => {
      const initials = (initialsInput.value || '').trim().toUpperCase();
      const yearGroup = yearInput.value;

      if (!/^[A-Z]{3}$/.test(initials)) {
    });
    chronoSelect.innerHTML = optionsHtml;
    const firstOption = chronoSelect.querySelector('option[value^="topic_"]');
    if (firstOption) {
      firstOption.selected = true;
    }

    chronoSelect.addEventListener('change', () => {
      AudioEngine.play('click');
      initChronologyGame();
    });
  }

  // 2. Setup game tab switching
  const tabs = {
    causal: document.getElementById('btn-tab-game-causal'),
    chronology: document.getElementById('btn-tab-game-chronology'),
    mastery: document.getElementById('btn-tab-game-mastery'),
    mindmap: document.getElementById('btn-tab-game-mindmap'),
    decisions: document.getElementById('btn-tab-game-decisions'),

  // 2. Setup game tab switching
  const tabs = {
    causal: document.getElementById('btn-tab-game-causal'),
    chronology: document.getElementById('btn-tab-game-chronology'),
    mastery: document.getElementById('btn-tab-game-mastery'),
    mindmap: document.getElementById('btn-tab-game-mindmap'),
    decisions: document.getElementById('btn-tab-game-decisions'),
    crisis: document.getElementById('btn-tab-game-crisis'),
    tug: document.getElementById('btn-tab-game-tug'),
    taboo: document.getElementById('btn-tab-game-taboo'),
    meSim: document.getElementById('btn-tab-game-me-sim')
  };

  const panes = {
    causal: document.getElementById('game-causal-container'),
    chronology: document.getElementById('game-chronology-container'),
    mastery: document.getElementById('game-mastery-container'),
    mindmap: document.getElementById('game-mindmap-container'),
    decisions: document.getElementById('game-decisions-container'),
    crisis: document.getElementById('game-crisis-container'),
    tug: document.getElementById('game-tug-container'),
    taboo: document.getElementById('game-taboo-container'),
    meSim: document.getElementById('game-me-sim-container')
  };

  const cleanUpGames = () => {
    if (state.tugGameSession && state.tugGameSession.timeoutId) {
      clearTimeout(state.tugGameSession.timeoutId);
      state.tugGameSession.timeoutId = null;
    }
    if (state.tabooGameSession && state.tabooGameSession.timerInterval) {
      clearInterval(state.tabooGameSession.timerInterval);
      state.tabooGameSession.timerInterval = null;
    }
    if (masteryState.timerInterval) {
      clearInterval(masteryState.timerInterval);
      masteryState.timerInterval = null;
    }
    if (mindmapState.timerInterval) {
      clearInterval(mindmapState.timerInterval);
      mindmapState.timerInterval = null;
    }
  };

  const showTab = (tabName) => {
    cleanUpGames();

    Object.keys(tabs).forEach(name => {
      const t = tabs[name];
      if (!t) return;
      if (name === tabName) {
        t.classList.add('active');
        t.style.borderColor = 'var(--primary)';
        t.style.color = 'var(--primary)';
        t.style.background = 'rgba(59, 130, 246, 0.1)';
      } else {
        t.classList.remove('active');
        t.style.borderColor = 'var(--border-glass)';
        t.style.color = 'var(--text-muted)';
        t.style.background = 'rgba(255, 255, 255, 0.03)';
      }
    });

    Object.keys(panes).forEach(name => {
      const p = panes[name];
      if (p) {
        p.style.display = name === tabName ? 'block' : 'none';
      }
    });

    if (tabName === 'causal') {
      const val = causalSelect.value;
      if (val) playCausalGame(val);
    } else if (tabName === 'chronology') {
      initChronologyGame();
    } else if (tabName === 'mastery') {
      initMasteryMatchGame();
    } else if (tabName === 'mindmap') {
      initMindMapGame();
    } else if (tabName === 'decisions') {
      initDecisionsGame();
    } else if (tabName === 'crisis') {
      initCrisisGame();
    } else if (tabName === 'tug') {
      initCrisisGame();
    } else if (tabName === 'tug') {
      initTugGame();
    } else if (tabName === 'taboo') {
      initTabooGame();
    } else if (tabName === 'meSim') {
      initMeSimGame();
    } else if (tabName === 'parser') {
      initParserGame();
    }
  };

  Object.keys(tabs).forEach(name => {
    const t = tabs[name];
    if (t) {
      t.addEventListener('click', (e) => {
        e.preventDefault();
        AudioEngine.play('click');
        showTab(name);
      });
    }
  });

  const activeTab = Object.keys(tabs).find(name => tabs[name] && tabs[name].classList.contains('active'));
  showTab(activeTab || 'causal');
}
  border: 1px solid var(--border-glass);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: transform var(--transition-fast);
  background: #000;
}

.onenote-video-thumbnail:hover {
  transform: translateY(-2px);
}

.onenote-thumbnail-placeholder {
  width: 100%;
  height: 100%;
function renderExamResultsLeaderboard(scope) {
  const container = document.getElementById('exam-results-leaderboard');
  if (!container) return;

  const localScores = getExamHighScores(scope);
  renderResults(localScores);

  if (GOOGLE_SHEET_WEBAPP_URL) {
    fetch(`${GOOGLE_SHEET_WEBAPP_URL}?type=exam&subtopicId=${scope}`)
      .then(res => res.json())
      .then(scores => {
        if (Array.isArray(scores)) {
          renderResults(scores);
        }
      })
      .catch(err => console.error("Error loading remote exam results leaderboard:", err));
  }

  function renderResults(scoresList) {
    let rowsHtml = scoresList.map((s, idx) => {
      let medal = '';
      if (idx === 0) medal = '🥇 ';
      else if (idx === 1) medal = '🥈 ';
      else if (idx === 2) medal = '🥉 ';
      const yrText = s.yearGroup ? ` <span style="font-size: 0.72rem; color: var(--text-muted);">(${s.yearGroup})</span>` : '';
      return `
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.03);">
          <span style="color: var(--primary); font-weight: bold;">${medal}${idx + 1}. ${s.name}${yrText}</span>
          <span style="color: var(--success); font-weight: 700;">${s.score} pts</span>
        </div>
      `;
    }).join('');
    container.innerHTML = `
      <h4 style="font-family: var(--font-heading); font-size: 0.88rem; margin: 12px 0 8px; color: var(--text-main); text-align: left;">
        <i class="fa-solid fa-ranking-star" style="color: var(--accent);"></i> Leaderboard Rankings:
      </h4>
      <div style="text-align: left; background: rgba(0,0,0,0.1); padding: 8px 12px; border-radius: 4px; border: 1px solid var(--border-glass);">
        ${rowsHtml || '<div style="font-size: 0.8rem; color: var(--text-muted); text-align: center; padding: 4px 0;">No scores submitted yet. Be the first!</div>'}
      </div>
    `;
  }
}

function initExamLeaderboard(scope, pct) {
  const points = Math.round(pct * 10);
  
  // Show input form

// --- GAP between 4240 and 4270 ---

  color: var(--accent);
  border: 1px solid rgba(244, 63, 94, 0.3);
}

/* --- Desktop/Mobile Visibility Utilities --- */
@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }
}
@media (min-width: 769px) {
  .mobile-only {
    display: none !important;
  }
}


/* --- Tug Game Mobile Responsiveness --- */
@media (max-width: 580px) {
  .tug-game-container .control-grid {
    grid-template-columns: 1fr !important;
  const submitBtn = document.getElementById('btn-submit-highscore');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const initialsInput = document.getElementById('mastery-highscore-initials');
      const yearInput = document.getElementById('mastery-highscore-year');
      
      let initials = initialsInput ? initialsInput.value.trim().toUpperCase() : "";
      let yearGroup = yearInput ? yearInput.value : "";
      
      "question": "Explain two of the following: (16 marks)",
      "choices": [
        {
          "id": "mock_paper_2_q3_a",
          "title": "The importance of the refugee status of Palestinian Arabs for the aftermath of the 1948-49 war.",
          "clue": "Explain how the permanent displacement of 700,000 Palestinians created an enduring humanitarian crisis in neighboring states and catalyzed the rise of independent guerrilla resistance.",
          "model": "<strong>Point 1:</strong> The refugee status of over 700,000 Palestinians was important because it created a permanent humanitarian and political crisis in neighboring Arab states. Fleeing into Gaza, the West Bank, Jordan, and Lebanon, they were housed in squalid, temporary camps under UNRWA care, serving as a constant source of regional instability and anti-Israel sentiment.<br><br><strong>Point 2:</strong> It was also important because it hardened Palestinian national identity and opposition to Israel. Denied the right of return by Israel and left stateless, the refugees formed the core of the Palestinian resistance movement, leading directly to the creation of independent guerrilla groups like Fatah to fight for liberation."
        },
        {
          "id": "mock_paper_2_q3_b",
          "title": "The importance of Syria's support for Fatah for escalating tension between Israel, Syria and Jordan.",
          "clue": "Explain how Syrian backing enabled Fatah raids that provoked IDF repr
  renderExamResultsLeaderboard(scope);

  const submitBtn = document.getElementById('btn-submit-exam-highscore');
  if (submitBtn) {
    const newSubmitBtn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

    newSubmitBtn.addEventListener('click', () => {
      const initials = (initialsInput.value || '').trim().toUpperCase();
      const yearGroup = yearInput.value;

      if (!/^[A-Z]{3}$/.test(initials)) {
        showWarningToast("Please enter exactly 3 uppercase letters for your initials.");
        return;
      }
      if (!yearGroup) {
        showWarningToast("Please select your Year Group.");
        return;
      }

      saveExamHighScoreLocal(scope, initials, yearGroup, points);
      AudioEngine.play('success');

      if (GOOGLE_SHEET_WEBAPP_URL) {
        const payload = {
          type: "exam",
          subtopicId: scope,
          name: initials,
  }

  .stat-desc .stat-label {
    display: none !important;
  }

  /* Compact shortcut cards layout */
  .shortcut-card {
    padding: 10px !important;
    gap: 10px !important;
  }
  .shortcut-icon {
    width: 36px !important;
    height: 36px !important;
    font-size: 1.1rem !important;
  }
  .shortcut-card h3 {
    font-size: 0.88rem !important;
  }
  .shortcut-card p {
    font-size: 0.68rem !important;
    line-height: 1.2 !important;
  }

  /* Swipable and scrollable filter buttons on mobile */
  .classic-filters {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 8px !important;
  }
  
  .filter-btn-group {
    width: 100% !important;
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 6px !important;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
  
  .jsw-btn:active {
    background: #ffffff;
    color: #000000;
  }
  
  .jsw-btn-jump {
    background: #ff00ff;
    border-color: #ff00ff;
  }
  
  .jsw-btn-jump:active {
    background: #ffffff;
    border-color: #ffffff;
    color: #ff00ff;
  }
}

/* --- Tug Game Mobile Responsiveness --- */
@media (max-width: 580px) {
  .tug-game-container .control-grid {

// --- GAP between 4400 and 4429 ---

        },
        {
          "id": "mock_paper_4_q3_c",
          "title": "The importance of Arafat's speech to the UN (1974) for the Palestinian issue.",
          "clue": "Explain how the speech gained the PLO global legitimacy and observer status, but also how Arafat's commitment to armed struggle delayed direct negotiations with the West.",
          "model": "<strong>Point 1:</strong> Arafat's 'olive branch and freedom fighter' speech to the UN General Assembly in 1974 was important because it gained the PLO immense international legitimacy. Following the speech, the UN recognized the PLO as the sole representative of the Palestinian people and granted it observer status, elevating it to the global stage.<br><br><strong>Point 2:</strong> However, it was also important because it highlighted the PLO's refusal to compromise on armed struggle. Arafat's warning that the olive branch would fall if the UN ignored Palestinian rights confirmed Israeli and US suspicions that the PLO remained committed to violence, delaying direct negotiations with the West."
        }
      ]
    }
  }
];

if (typeof exports !== 'undefined') {
  exports.QUIZ_DATA = QUIZ_DATA;
  exports.EXAM_SKILLS_DATA = EXAM_SKILLS_DATA;
  exports.CONSEQUENCE_SKILLS_DATA = CONSEQUENCE_SKILLS_DATA;
  exports.NARRATIVE_SKILLS_DATA = NARRATIVE_SKILLS_DATA;
  exports.PAST_PAPERS_DATA = PAST_PAPERS_DATA;
} else if (typeof window !== 'undefined') {
  window.QUIZ_DATA = QUIZ_DATA;
  window.EXAM_SKILLS_DATA = EXAM_SKILLS_DATA;
  window.CONSEQUENCE_SKILLS_DATA = CONSEQUENCE_SKILLS_DATA;
  window.NARRATIVE_SKILLS_DATA = NARRATIVE_SKILLS_DATA;
  window.PAST_PAPERS_DATA = PAST_PAPERS_DATA;
}


// --- GAP between 4454 and 4459 ---

      subTabGroup.style.borderRadius = '20px';
      subTabGroup.style.gap = '2px';
      
      const subTabs = [
        { id: 'syllabus-modern', name: 'Analysis', icon: 'fa-chart-simple' },
        { id: 'archive', name: 'The Archive', icon: 'fa-book-open' },
        { id: 'debate', name: 'Roundtable', icon: 'fa-users-rectangle' }
      ];
      
      const currentActiveSubTab = cardSubTabs[d.id];
      
      subTabs.forEach(st => {
        const tabBtn = document.createElement('button');
        tabBtn.className = `gb-subtab-btn ${currentActiveSubTab === st.id ? 'active' : ''}`;
        tabBtn.innerHTML = `<i class="fa-solid ${st.icon}" style="font-size: 0.75rem; margin-right: 6px;"></i><span class="desktop-only" style="font-size: 0.75rem;">${st.name}</span>`;
        tabBtn.style.padding = '6px 12px';
        tabBtn.style.border = 'none';
        tabBtn.style.borderRadius = '16px';
        tabBtn.style.cursor = 'pointer';
        tabBtn.style.fontWeight = '600';
        tabBtn.style.background = currentActiveSubTab === st.id ? 'var(--gradient-main)' : 'transparent';
        tabBtn.style.color = currentActiveSubTab === st.id ? 'var(--text-inverse)' : 'var(--text-muted)';
        tabBtn.style.transition = 'all var(--transition-fast)';
        tabBtn.style.display = 'flex';
        tabBtn.style.alignItems = 'center';
        
        tabBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          AudioEngine.play('click');
          cardSubTabs[d.id] = st.id;
          drawCardContentPane();
          subTabGroup.querySelectorAll('button').forEach((btn, idx) => {

// --- GAP between 4490 and 4640 ---

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-width: none !important;
    line-height: 1.3 !important;
  }
  
  /* Visual Density improvements on mobile viewports */
  .content-view {
    padding: 12px 14px !important;
  }
  .shortcut-card {
    padding: 14px !important;
  }
  .filter-btn {
    padding: 8px 12px !important;
    font-size: 0.8rem !important;
  }
  .skills-input-area {
    gap: 16px !important;
  }
  .btn-primary, .btn-secondary {
    padding: 10px 14px !important;
    font-size: 0.85rem !important;
  }
}
/* --- Interactive Timeline Cheat Sheet --- */
.interactive-timeline {
  border-left: 4px solid var(--primary);
  padding-left: 20px;
  margin: 24px 0;
  font-family: var(--font-body);
}
.timeline-controls {
  margin-bottom: 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.timeline-btn {
  background: rgba(0, 0, 0, 0.2);

// --- GAP between 4680 and 4690 ---

    drawAspectCards();
    
    setTimeout(() => {
      const targetCard = document.getElementById(`gb-card-${targetId}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.classList.add('highlighted-pulse');
        setTimeout(() => {
          targetCard.classList.remove('highlighted-pulse');
        }, 3000);
  return match ? `KT ${match[1]}.${match[2]}` : '';
}

function renderKeyTopicOverview(topicId) {
  const data = KEY_TOPICS_OVERVIEWS[topicId];
  if (!data) return;

  const container = document.getElementById('key-topic-content-container');
  if (!container) return;

  // Calculate Key Topic Progress
  const quizTopic = QUIZ_DATA.find(t => t.id === topicId);
  const subtopics = quizTopic ? quizTopic.subtopics : [];
  
  let totalQs = 0;
  let totalMastered = 0;
  subtopics.forEach(sub => {
    const subQs = state.allQuestions.filter(q => q.subtopicId === sub.id);
    totalQs += subQs.length;
    totalMastered += subQs.filter(q => state.mastery[q.id]).length;
  });
  const overallPct = totalQs > 0 ? Math.round((totalMastered / totalQs) * 100) : 0;

  // Build Subtopics Portal HTML
  let subtopicsHtml = '';
  subtopics.forEach(sub => {
    const subQs = state.allQuestions.filter(q => q.subtopicId === sub.id);
    const subMastered = subQs.filter(q => state.mastery[q.id]).length;
    const pct = subQs.length > 0 ? Math.round((subMastered / subQs.length) * 100) : 0;
    const cleanTitle = sub.title.replace(/^Topic \d\.\d:\s*/, "");
    const subNum = sub.title.match(/Topic\s(\d\.\d)/)?.[1] || "";
    
    subtopicsHtml += `
      <div class="key-topic-subtopic-card" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); padding: 16px; display: flex; flex-direction: column; justify-content: space-between; gap: 12px; transition: all var(--transition-normal); cursor: pointer;" onclick="window.switchView('subtopic', '${sub.id}')">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-family: var(--font-heading); font-size: 0.75rem; font-weight: 700; color: var(--primary); letter-spacing: 0.5px;">LESSON ${subNum}</span>
            <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">${pct}% Mastered</span>
          </div>
          <h3 style="font-size: 0.95rem; font-weight: 600; margin: 0; line-height: 1.3; color: var(--text-main); text-align: left;">${cleanTitle}</h3>
        </div>
        <div style="display: flex; align-items: center; gap: 4px; font-size: 0.8rem; font-weight: 600; color: var(--primary); align-self: flex-end;">
          Study Lesson <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    `;
  });

  if (data.timeline) {
    // Build Timeline Nodes HTML
    let timelineNodesHtml = '';
    data.timeline.forEach((event, idx) => {
      timelineNodesHtml += `
<truncated 2528 bytes>
      `;
    });

    // Build Sliders HTML
    let slidersHtml = '';
    data.sliders.forEach(slider => {
      slidersHtml += `
        <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); padding: 14px; display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-main); display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid ${slider.icon}" style="color: var(--primary); font-size: 0.9rem;"></i> ${slider.label}
            </span>
            <span id="slider-badge-${slider.id}" style="font-family: var(--font-heading); font-size: 0.85rem; font-weight: 700; color: var(--primary);">50%</span>
          </div>
          <input type="range" class="key-topic-slider" id="input-slider-${slider.id}" min="0" max="100" value="50" style="width: 100%; cursor: pointer;">
          <div id="slider-tip-${slider.id}" style="font-size: 0.78rem; line-height: 1.4; color: var(--text-muted); min-height: 38px; border-top: 1px dashed var(--border-glass); padding-top:
      `;
    });

    // Build Sliders HTML
    let slidersHtml = '';
    data.sliders.forEach(slider => {
      slidersHtml += `
        <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); padding: 14px; display: flex; flex-direction: column; gap: 8px;">
            <!-- Injected by dynamic logic -->
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <!-- Top Progress Banner -->
      <div style="background: var(--gradient-hero); padding: 24px; border-radius: var(--border-radius-md); border: 1px solid var(--border-glass); margin-bottom: 24px; box-shadow: var(--shadow-md); position: relative; overflow: hidden; display: flex; flex-direction: column; gap: 12px;">
        <h2 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; color: var(--text-main); margin: 0; line-height: 1.3; text-align: left;">
          ${data.title}
        </h2>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
          <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">Key Topic Progress: ${overallPct}% Complete</span>
          <div style="background: rgba(255,255,255,0.05); border-radius: 12px; height: 10px; width: 150px; overflow: hidden;">
            <div style="background: var(--gradient-main); height: 100%; width: ${overallPct}%;"></div>
          </div>
        </div>
      </div>

      <!-- Historical Context Overview (Full Width) -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); padding: 20px; box-shadow: var(--shadow-sm); margin-bottom: 24px;">
        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 600; color: var(--text-main); margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px; text-align: left;">
            <div style="background: var(--gradient-main); height: 100%; width: ${overallPct}%;"></div>
          </div>
        </div>
      </div>

      <!-- Historical Context Overview (Full Width) -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); padding: 20px; box-shadow: var(--shadow-sm); margin-bottom: 24px;">
        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 600; color: var(--text-main); margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px; text-align: left;">
          <i class="fa-solid fa-book-open"></i> Historical Context Overview
        </h3>
        <p style="font-size: 0.92rem; line-height: 1.6; color: var(--text-muted); margin: 0; text-align: justify;">
          ${data.overview}
        </p>
      </div>

      <!-- Component A: Responsive timeline (Full Width) -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); padding: 24px 30px; box-shadow: var(--shadow-sm); position: relative; margin-bottom: 24px;">
        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 600; color: var(--text-main); margin: 0 0 20px 0; display: flex; align-items: center; gap: 8px; text-align: left;">
          <i class="fa-solid fa-timeline"></i> Mental Map Timeline, ${data.title.split(', ').pop()}
        </h3>

// --- GAP between 4820 and 4865 ---

          <div style="background: rgba(230, 92, 0, 0.05); border-left: 3px solid var(--primary); padding: 12px; border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0; font-size: 0.82rem; line-height: 1.4; color: var(--text-muted); font-style: italic; text-align: left;">
            "<span id="timeline-modal-quote"></span>"
            <div id="timeline-modal-author" style="text-align: right; font-size: 0.72rem; font-weight: 600; margin-top: 6px; font-style: normal; color: var(--text-normal);"></div>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); border-top: 1px dashed var(--border-glass); padding-top: 10px; text-align: left;">
            <strong>Key Figures:</strong> <span id="timeline-modal-figures" style="color: var(--text-normal); font-weight: 600;"></span>
          </div>
        </div>
      </div>
    `;

    // Modal logic
    const overlay = document.getElementById('timeline-modal-overlay');
    const modalContent = document.getElementById('timeline-modal-content');
    const closeBtn = document.getElementById('btn-timeline-modal-close');
    const nodes = container.querySelectorAll('.timeline-node-item');

    function openModal(idx) {
      const event = data.timeline[idx];
      if (!event) return;
      AudioEngine.play('click');
      
      document.getElementById('timeline-modal-year').textContent = event.year;
      document.getElementById('timeline-modal-title').textContent = event.title;
      document.getElementById('timeline-modal-quote').textContent = event.quote;
      document.getElementById('timeline-modal-author').textContent = event.author;

// --- GAP between 4890 and 4990 ---

      const stageContainer = document.getElementById('overview-flashcard-stage-container');
      if (!stageContainer) return;
      
      if (!currentQuestion) {
        stageContainer.innerHTML = `
          <div style="background: rgba(255,255,255,0.01); border: 1px dashed var(--border-glass); border-radius: var(--border-radius-md); padding: 40px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
            <i class="fa-solid fa-face-frown" style="font-size: 2rem; color: var(--primary); margin-bottom: 12px; display: block;"></i>
            No flashcards available. Please enable at least one subtopic lesson.
          </div>
        `;
        return;
      }

      const q = currentQuestion;
      const isBookmarked = state.bookmarks.includes(q.id);
      const ktLabel = formatSubtopicIdToKT(q.subtopicId);

      stageContainer.innerHTML = `
        <div class="overview-flashcard-stage" style="perspective: 1000px; position: relative; width: 100%; height: 260px; margin-bottom: 16px;">
          <div class="flashcard-card" id="overview-flashcard-card" style="cursor: pointer; position: absolute; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); border-radius: var(--border-radius-lg); box-shadow: var(--shadow-lg);">
}

// Spaced Repetition / Highscore Helpers for Streak & Level Profile
export function getStreakHighScores() {
  const key = 'streak_highscores';
  let scores = localStorage.getItem(key);
  if (!scores) {
    const defaults = [];
    localStorage.setItem(key, JSON.stringify(defaults));
    return defaults;
  }
  try {
    return JSON.parse(scores);
  } catch (e) {
    return [];
  }
}

export function saveStreakHighScoreLocal(name, yearGroup, streak, level, xp) {
  const scores = getStreakHighScores();
  
  const existingIndex = scores.findIndex(s => s.name === name && s.yearGroup === yearGroup);
  if (existingIndex !== -1) {
    const existing = scores[existingIndex];
    if (streak > existing.streak || 
        (streak === existing.streak && (xp || 0) > (existing.xp || 0)) ||
        (streak === existing.streak && (xp || 0) === (existing.xp || 0) && level > existing.level)) {
      scores[existingIndex] = {
        name: name,
        yearGroup: yearGroup,
        streak: streak,
        level: level,
        xp: xp || 0,
        date: new Date().toISOString().split('T')[0]
      };
    }
  } else {
    scores.push({
      name: name,
      yearGroup: yearGroup,
      streak: streak,
      level: level,
      xp: xp || 0,
      date: new Date().toISOString().split('T')[0]
    });
  }

  scores.sort((a, b) => b.streak - a.streak || (b.xp || 0) - (a.xp || 0) || b.level - a.level || (b.date || '').localeCompare(a.date || ''));
  localStorage.setItem('streak_highscores', JSON.stringify(scores.slice(0, 7)));
}

      const revealBtn = document.getElementById('overview-btn-flashcard-reveal');
      const gradeActions = document.getElementById('overview-flashcard-self-grade-actions');

      cardEl.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('.bookmark-icon-container')) {
          return;
        }
        cardEl.classList.toggle('flipped');
        AudioEngine.play('flip');
        updateControlsVisibility();

export {
  renderSidebarNav,
  updateBookmarksUI,
  updateGlobalStats,
  renderDashboard,
  highlightCausalConnectives,
  renderExamSkillsView,
  renderClassicView,
  startFlashcardSession,
  renderFlashcard,
  handleFlashcardGrade,
  showFlashcardCompletion,
  restoreFlashcardSkeleton,
  flipFlashcard,
  renderTimelineView,
  evaluateStudentAnswer,
  renderBookmarksView,
  openVideoModal,
  closeVideoModal,
  renderGamesView,
  initChronologyGame,
  initMasteryMatchGame,
  initMindMapGame,
  initDecisionsGame,
  initExamLeaderboard,
  renderGoingBeyond,
  formatSubtopicIdToKT,
  renderKeyTopicOverview,
  renderAiVideosView
};


// --- GAP between 5102 and 5108 ---


      return `
        <div class="highscore-card-row ${rankClass}" style="animation-delay: ${idx * 0.07}s; ${highlightStyle}">
          <!-- Rank Column -->
          <div class="highscore-rank">
            ${medal || `<span style="font-size: 1.05rem; opacity: 0.7;">#${idx + 1}</span>`}
          </div>
          
          <!-- Initials & Year Column -->
          <div class="highscore-info">
            <span class="highscore-name">${s.name}</span>
            <span class="highscore-year">${s.yearGroup || 'Year Group'}</span>
          </div>
          
          <!-- Stats Column -->
          <div class="highscore-stats">
            <!-- Streak Badge -->
            <span class="highscore-badge-streak">
              <i class="fa-solid fa-fire ${idx === 0 ? 'fire-flicker-animation' : ''}"></i> ${s.streak} Day${s.streak === 1 ? '' : 's'}
            </span>
            <!-- Level Badge -->
            <span class="highscore-badge-level">
              Lv ${s.level}
            </span>
            <!-- XP Badge -->
            <span class="highscore-badge-xp">
              <i class="fa-solid fa-star"></i> ${s.xp || 0} XP
            </span>
          </div>
          
          <!-- Achievement Title Column -->
          <div class="highscore-achievement">
            <span class="highscore-achievement-title">
              ${achievementTitle}
            </span>
          </div>
          
          <!-- Date Column -->
          <div class="highscore-date">
            ${dateText}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; padding: 10px 0; margin-top: 10px;">
        ${rowsHtml || '<div style="font-size: 0.9rem; color: var(--text-muted); text-align: center; padding: 24px 0; background: rgba(0,0,0,0.1); border: 1px dashed var(--border-glass); border-radius: var(--border-radius-sm);">No high scores. Be the first to submit!</div>'}
      </div>
    `;
  }
}

export function openStreakLeaderboard() {
  const lastInitials = localStorage.getItem('last_streak_initials') || '';
  const lastYear = localStorage.getItem('last_streak_year') || '';
  
  const initialsInput = document.getElementById('streak-highscore-initials');
  const yearInput = document.getElementById('streak-highscore-year');
  const inputBox = document.getElementById('streak-highscore-input-box');
  
  if (initialsInput) {
    initialsInput.value = lastInitials;
  }
  if (yearInput) {
    yearInput.value = lastYear;
  }
  
  if (inputBox) {
    // Always display submission box for layout symmetry and so users can update their scores anytime
    inputBox.style.display = 'block';
  }

  renderStreakLeaderboardList();
}

export function initStreakLeaderboardListeners() {
  const submitBtn = document.getElementById('btn-submit-streak-highscore');
  if (submitBtn) {
 

// --- GAP between 5187 and 5200 ---

    const header = `
      <div style="margin-bottom: 12px;">
        <span style="font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--accent); background: var(--accent-glow); border: 1px solid rgba(244, 63, 94, 0.2); padding: 2px 8px; border-radius: 4px; font-family: var(--font-heading); display: inline-block; margin-bottom: 6px;">${formattedKT}</span>
        <h3 style="font-size: 0.95rem; font-weight: 700; margin: 0; line-height: 1.3; color: var(--text-main);">${lessonTitle.split(':').slice(1).join(':').trim() || lessonTitle}</h3>
      </div>
    `;

    const videoId = video.primary.youtube_url.split('v=')[1];
    const thumbnail = `
      <div class="video-thumbnail-container" style="position: relative; width: 100%; aspect-ratio: 16/9; background: #000; border-radius: var(--border-radius-sm); border: 1px solid var(--border-glass); margin-bottom: 14px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
      localStorage.setItem('last_streak_initials', initials);
      localStorage.setItem('last_streak_year', yearGroup);

      AudioEngine.play('success');

      if (GOOGLE_SHEET_WEBAPP_URL) {
        const payload = {
          type: "streak",
          name: initials,
          yearGroup: yearGroup,
          streak: streak,
          level: level,
          xp: xp,
          date: new Date().toISOString().split('T')[0]
        };

        fetch(GOOGLE_SHEET_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }).catch(err => console.error("Error saving remote streak score:", err));
      }

      const inputBox = document.getElementById('streak-highscore-input-box');
      if (inputBox) {
        inputBox.style.display = 'none';
      }
      renderStreakLeaderboardList();
    });
  }
}

// ==========================================
// --- Taboo Cards Revision Game Logic ---
// ==========================================

let tabooState = {
  teams: [],
  currentTeamIndex: 0,
  currentRound: 1,
  totalRounds: 3,
  timeLimit: 60,
  timeLeft: 60,
  timerInterval: null,
  activeCategories: [],
  cardsPool: [],
  currentCardIndex: 0,
  currentCard: null,
  turnScore: 0,
  turnLogs: []
};

function tabooShuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function initTabooGame() {
  });
}

// Add Streak Leaderboard functions
function triggerAngrySweepAnimation() {
  const logos = document.querySelectorAll('.brand-icon, .brand-subheader-logo');
  logos.forEach(logo => {
    logo.classList.add('angry');
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'soot-particle';
      particle.style.background = '#1a1a1a';
      particle.style.width = `${Math.random() * 8 + 4}px`;
      particle.style.height = particle.style.width;
      particle.style.borderRadius = '50%';
      particle.style.position = 'fixed';
      particle.style.zIndex = '99999';
      const rect = logo.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 80 + 40;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 60;
      document.body.appendChild(particle);
      let start = null;
      function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / 1000;
        particle.style.transform = `translate(${vx * progress}px, ${vy * progress}px) scale(${1 - progress})`;
        particle.style.opacity = `${1 - progress}`;
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      }
      requestAnimationFrame(animate);
    }
    setTimeout(() => {
      logo.classList.remove('angry');
    }, 1200);
  });
}

function getStreakLeaderboard() {
  const key = 'edexcel_streak_leaderboard';
  let board = localStorage.getItem(key);
  if (!board) {
    board = [
      { name: "BEN", yearGroup: "Year 11", streak: 12, xp: 450, level: 3, date: "2026-06-05" },
      { name: "LUC", yearGroup: "Year 10", streak: 8, xp: 320, level: 2, date: "2026-06-06" },
      { name: "SAM", yearGroup: "Year 9", streak: 5, xp: 180, level: 1, date: "2026-06-04" },
      { name: "JON", yearGroup: "Year 11", streak: 4, xp: 510, level: 3, date: "2026-06-03" },

// --- GAP between 5330 and 5340 ---

    });

    container.appendChild(card);
  });
}

// Add Streak Leaderboard functions
function triggerAngrySweepAnimation() {
  const logos = document.querySelectorAll('.brand-icon, .brand-subheader-logo');
  logos.forEach(logo => {
    logo.classList.add('angry');
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'soot-particle';
      particle.style.background = '#1a1a1a';
      particle.style.width = `${Math.random() * 8 + 4}px`;
      particle.style.height = particle.style.width;
      particle.style.borderRadius = '50%';
      particle.style.position = 'fixed';
      particle.style.zIndex = '99999';
      const rect = logo.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 80 + 40;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 60;
      document.body.appendChild(particle);
      let start = null;
      function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / 1000;
        particle.style.transform = `translate(${vx * progress}px, ${vy * progress}px) scale(${1 - progress})`;
        particle.style.opacity = `${1 - progress}`;
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
    actions.appendChild(playBtn);
    actions.appendChild(studyBtn);

    card.innerHTML = header + thumbnail + body;
    card.appendChild(actions);

    card.addEventListener('click', () => {
      AudioEngine.play('click');
      openVideoModal(video.primary.youtube_url, video.primary.video_title);
    });

    container.appendChild(card);
  });
}

// Add Streak Leaderboard functions
function triggerAngrySweepAnimation() {
  const logos = document.querySelectorAll('.brand-icon, .brand-subheader-logo');
  logos.forEach(logo => {
    logo.classList.add('angry');
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'soot-particle';
      particle.style.background = '#1a1a1a';
      particle.style.width = `${Math.random() * 8 + 4}px`;
      particle.style.height = particle.style.width;
      particle.style.borderRadius = '50%';
      particle.style.position = 'fixed';
      particle.style.zIndex = '99999';
      const rect = logo.getBoundingClientRect();
    return new Date(b.date) - new Date(a.date);
  });
  localStorage.setItem('edexcel_streak_leaderboard', JSON.stringify(board.slice(0, 10)));
}

export function renderStreakLeaderboardList() {
  const container = document.getElementById('streak-leaderboard-list-container');
  if (!container) return;
  const scores = getStreakLeaderboard();
  let rowsHtml = scores.map((s, idx) => {
    let medal = '';
    let rowClass = '';
    if (idx === 0) { medal = '🥇 '; rowClass = 'rank-gold'; }
    else if (idx === 1) { medal = '🥈 '; rowClass = 'rank-silver'; }
    else if (idx === 2) { medal = '🥉 '; rowClass = 'rank-bronze'; }
    const yrText = s.yearGroup ? ` <span style="font-size: 0.72rem; color: var(--text-muted);">(${s.yearGroup})</span>` : '';
    return `
      <tr class="${rowClass}" style="border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.85rem;">
        <td style="padding: 10px 6px; font-weight: bold; color: var(--primary);">${medal}${idx + 1}</td>
        <td style="padding: 10px 6px; font-weight: 700; color: var(--text-main);">${s.name}${yrText}</td>
        <td style="padding: 10px 6px; font-weight: 800; color: var(--accent); text-align: center;">🔥 ${s.streak} Days</td>
        <td style="padding: 10px 6px; text-align: center;">
          <span style="font-size: 0.72rem; background: rgba(6,182,212,0.1); color: #06b6d4; border: 1px solid rgba(6,182,21
            Lvl ${s.level}
          </span>
        </td>
        <td style="padding: 10px 6px; font-weight: 700; color: var(--success); text-align: right;">${s.xp} XP</td>
        <td class="desktop-only" style="padding: 10px 6px; color: var(--text-muted); text-align: right; font-size: 0.72rem;">${s.date}</td>
      </tr>
    `;
  }).join('');
  container.innerHTML = `
    <table style="width: 100%; border-collapse: collapse; text-align: left;">
      <thead>
        <tr style="border-bottom: 1px solid var(--border-glass); color: var(--text-muted); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px;">
          <th style="padding: 6px; font-weight: 700;">Rank</th>
          <th style="padding: 6px; font-weight: 700;">Student</th>
          <th style="padding: 6px; font-weight: 700; text-align: center;">Streak</th>
          <th style="padding: 6px; font-weight: 700; text-align: center;">Level</th>
          <th style="padding: 6px; font-weight: 700; text-align: right;">Total XP</th>
          <th class="desktop-only" style="padding: 6px; font-weight: 700; text-align: right;">Date</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
  `;
}

export function openStreakLeaderboard() {
  renderStreakLeaderboardList();
  const submitBtn = document.getElementById('btn-submit-leaderboard');
  const initialsInput = document.getElementById('leaderboard-initials');
  const yearSelect = document.getElementById('leaderboard-year');
  if (submitBtn && initialsInput && yearSelect) {
    const newSubmitBtn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    newSubmitBtn.addEventListener('click', () => {
      const name = initialsInput.value.trim().toUpperCase();
      const year = yearSelect.value;
      const val = validateScoreBoardInitials(name);
      if (!val.valid) {
        showWarningToast(val.message);
        return;
      }
      if (!year) {
        AudioEngine.play('fail');
        showWarningToast("Please select a Year Group!");
        return;
      }
      AudioEngine.play('cheer');
      Confetti.spawn(60);
      saveStreakHighScoreLocal(name, year);
      renderStreakLeaderboardList();
      initialsInput.value = '';
      yearSelect.value = '';
      showToast("Score successfully posted to the Streak Leaderboard!", "success");
    });
  }
}

export {
  renderSidebarNav,
  updateBookmarksUI,
  updateGlobalStats,
  renderDashboard,
  highlightCausalConnectives,
  renderExamSkillsView,
  renderClassicView,
  startFlashcardSession,
        AudioEngine.play('fail');
        triggerAngrySweepAnimation();
        showWarningToast("Initials must be exactly 3 letters!");
        return;
      }
      if (!/^[A-Z]{3}$/.test(name)) {
        AudioEngine.play('fail');
        triggerAngrySweepAnimation();
        showWarningToast("Initials must contain letters only!");
        return;
      }
      const banned = ["KKK", "ASS", "FUK", "DIK", "PNS", "WOP", "BXT", "CNT", "VAG", "SHI", "SHT", "SEX", "WTF", "NGR"];
      if (banned.includes(name)) {
        AudioEngine.play('fail');
        triggerAngrySweepAnimation();
        showWarningToast("Initials rejected: Profanity filter block!");
        return;
      }
      if (!year) {
        AudioEngine.play('fail');
        showWarningToast("Please select a Year Group!");
        return;
      }
      AudioEngine.play('cheer');
      Confetti.spawn(60);
      saveStreakHighScoreLocal(name, year);
      renderStreakLeaderboardList();
      initialsInput.value = '';
      yearSelect.value = '';
      showToast("Score successfully posted to the Streak Leaderboard!", "success");
    });
  }
}

export {
  renderSidebarNav,
  updateBookmarksUI,
  updateGlobalStats,
  renderDashboard,
  highlightCausalConnectives,
  renderExamSkillsView,
  renderClassicView,
  startFlashcardSession,
  renderFlashcard,
  handleFlashcardGrade,
  showFlashcardCompletion,
  restoreFlashcardSkeleton,
  flipFlashcard,
  renderTimelineView,
  evaluateStudentAnswer,
  renderBookmarksView,
  openVideoModal,
  closeVideoModal,
  renderGamesView,
  initChronologyGame,
  initMasteryMatchGame,
  initMindMapGame,
  initDecisionsGame,
  initExamLeaderboard,
  renderGoingBeyond,
  formatSubtopicIdToKT,
  renderKeyTopicOverview,
  renderAiVideosView,
  saveStreakHighScoreLocal
};


// --- GAP between 5566 and 5750 ---


.play-btn-circle {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px var(--primary-glow);
  margin-bottom: 12px;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}

@media (min-width: 769px) {
  .app-container.collapsed-sidebar .sidebar {
    width: 76px !important;
    border-right: 1px solid var(--border-glass) !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
  }

  .app-container.fullscreen-active.collapsed-sidebar .sidebar {
    width: 0 !important;
    border-right: none !important;
    overflow: hidden !important;
  }

  .app-container.collapsed-sidebar .sidebar-header {
    justify-content: center;
    padding: 16px 0;
  }
  
  .app-container.collapsed-sidebar .sidebar-header div:nth-child(2),
  .app-container.collapsed-sidebar .nav-section-title,
  .app-container.collapsed-sidebar .nav-section-header,
  .app-container.collapsed-sidebar .nav-text,
  .app-container.collapsed-sidebar .nav-item-desc,
  .app-container.collapsed-sidebar .nav-item-progress,
  .app-container.collapsed-sidebar .sidebar-footer {
    display: none !important;
  }

  .app-container.collapsed-sidebar .brand-icon {
    margin: 0 auto;
  }

  .app-container.collapsed-sidebar .sidebar-nav {
    padding: 16px 8px;
    gap: 14px;
    align-items: center;

// --- GAP between 5800 and 6101 ---

  margin-bottom: 24px;
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  border-radius: var(--border-radius-lg);
  padding: 24px 28px;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal), border-color var(--transition-normal);
}

.spec-checklist-card:hover {
  border-color: var(--border-active);
}

.spec-checklist-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 6px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.spec-checklist-subtitle {
  font-size: 0.88rem;
  color: var(--text-muted);
  margin: 0 0 16px 0;
}

.spec-checklist-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.spec-checklist-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-glass);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  transition: all var(--transition-fast) ease-in-out;
}

.spec-checklist-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-c

// --- GAP between 6154 and 6200 ---

}

.spec-checklist-item.checked .spec-checklist-checkbox i {
  opacity: 1;
  transform: scale(1);
}

.spec-checklist-text {
  font-size: 0.95rem;
  line-height: 1.45;
  color: var(--text-main);
  transition: all var(--transition-fast);
}

.spec-checklist-item.checked .spec-checklist-text {
  color: var(--text-main);
  font-weight: 700;
}

.spec-checklist-expansion {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  width: 100%;
  border-left: 2px solid var(--primary);
  padding-left: 16px;
  margin-left: 10px;
  box-sizing: border-box;
  transition: max-height 0.35s ease, opacity 0.35s ease, padding-top 0.35s ease, margin-top 0.35s ease;
}

.spec-checklist-item.checked .spec-checklist-expansion {
  max-height: 800px;
  opacity: 1;
  margin-top: 12px;
  padding-top: 4px;
}

/* Graded Revision Questions Styles */
.revision-question-item {
  border: 1px solid var(--border-glass);
  border-radius: var(--border-radius-sm);
  margin-bottom: 12px;
  padding: 14px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.01);
  transition: all var(--transition-fast) ease-in-out;
}

.revision-question-item:hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: var(--border-glass-ho
  box-shadow: var(--shadow-sm) !important;
}
.leaflet-bar a {
  background-color: rgba(15, 23, 42, 0.9) !important;
  color: var(--text-muted) !important;
  border-bottom: 1px solid var(--border-glass) !important;
  transition: all 0.2s !important;
}
.leaflet-bar a:hover {
  background-color: var(--primary) !important;
  color: #fff !important;
}
.hotspot-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary);
  border: 2px solid var(--primary);
  animation: hotspot-ping 2s infinite ease-in-out;
  pointer-events: none;
}
@keyframes hotspot-ping {
  0% {
    width: 10px;
    height: 10px;
    opacity: 0.8;
  }
  100% {
    width: 32px;
    height: 32px;
    opacity: 0;
  }
}

/* --- 10-Step Unit Mastery Journey Accordion Styles --- */
.mastery-journey-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.journey-step-node {
  transition: all var(--transition-fast) ease;
}

// --- GAP between 6300 and 6801 ---

  font-size: 0.95rem;
  line-height: 1.45;
  color: var(--text-main);
  transition: all var(--transition-fast);
}

.spec-checklist-item.checked .spec-checklist-text {
  color: var(--text-main);
  font-weight: 700;
}

.spec-checklist-expansion {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  width: 100%;
  border-left: 2px solid var(--primary);
  padding-left: 16px;
  margin-left: 10px;
  box-sizing: border-box;
  transition: max-height 0.35s ease, opacity 0.35s ease, padding-top 0.35s ease, margin-top 0.35s ease;
}

.spec-checklist-item.checked .spec-checklist-expansion {
  max-height: 800px;
  opacity: 1;
  margin-top: 12px;
  padding-top: 4px;
}

/* Nested Spec Checklist inside Header Card styling */
.mastery-header-card .spec-checklist-card {
  background: transparent;
  border: none;
  padding: 0;
  box-shadow: none;
  margin: 20px 0;
}

    gap: 16px;
    align-items: center !important;
  }
  .timeline-node-label {
    margin-top: 0 !important;
    text-align: left !important;
    align-items: flex-start !important;
  }
  .timeline-node-title {
    max-width: 100% !important;
  }
}

.key-topic-subtopic-card:hover {
  background: rgba(255, 255, 255, 0.05) !important;
  border-color: var(--border-glass-hover) !important;
  transform: translateY(-2px);
}.btn-subtopic-toggle:hover {
  opacity: 0.9;
}

/* Sidebar Nav Topic Headers Clickable states */
.nav-section-header {
  border-left: 3px solid transparent;
}
.nav-section-header:hover {
  background-color: rgba(255, 255, 255, 0.04) !important;
}
.nav-section-header.active {
  background-color: rgba(255, 255, 255, 0.06) !important;
  border-left: 3px solid var(--primary) !important;
  padding-left: 7px !important;
}

@keyframes gb-card-glow {
  0% {
    border-color: var(--border-glass);
    box-shadow: var(--shadow-sm);
    transform: scale(1);
  }
  15% {
    border-color: var(--primary);
    box-shadow: 0 0 25px var(--primary-glow);
    transform: scale(1.02);
  }
  85% {
    border-color: var(--primary);
    box-shadow: 0 0 25px var(--primary-glow);
    transform: scale(1.02);
  }
  100% {
    border-color: var(--border-glass);
    box-shadow: var(--shadow-sm);
    transform: scale(1);

}
.gb-card.highlighted-pulse {
  animation: gb-card-glow 3s cubic-bezier(0.25, 1, 0.5, 1);
}



// --- GAP between 6900 and 6933 ---

  50% {
    transform: translateY(-8px) scale(1.05) rotate(2deg);
  }
  70% {
    transform: translateY(-3px) scale(0.98) rotate(-1deg);
  }
  85% {
    transform: translateY(-1px) scale(1.01) rotate(0.5deg);
  }
}

.bouncy-chimney {
  animation: chimneyBounce 2.5s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 14px;
  flex-shrink: 0;
  transition: filter var(--transition-fast), transform var(--transition-fast);
  position: relative;
}

.bouncy-chimney:hover {
  filter: drop-shadow(0 0 12px var(--primary-glow)) drop-shadow(0 0 4px var(--primary));
  animation-play-state: paused;
  transform: scale(1.15) rotate(3deg);
}

.bouncy-chimney:active {
  transform: scale(0.95);
}

/* Smoke Particles */
.smoke-particle {
  position: absolute;
  top: -4px;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(28, 25, 23, 0.85);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%) scale(1);
  filter: blur(1.5px);
}

@keyframes smokeRise1 {
  0% {
    transform: translate(-50%, 0) scale(1);
    opacity: 0;
  }
  25% {
    opacity: 0.65;
  }
  100% {
    transform: translate(-14px, -26px) scale(3.5);
    opacity: 0;
    filter: blur(4px);
  }
}

@keyframes smokeRise2 {
  0% {
    transform: translate(-50%, 0) scale(1);
    opacity: 0;
  0%, 100% { transform: scale(1) rotate(-1deg); opacity: 0.9; }
  25% { transform: scale(1.05) rotate(2deg); opacity: 1; }
  50% { transform: scale(0.95) rotate(-3deg); opacity: 0.85; }
  75% { transform: scale(1.1) rotate(1deg); opacity: 1; }
}
.fire-flicker-animation {
  animation: fireFlicker 0.6s ease-in-out infinite;
  display: inline-block;
}

.dashboard-subtopic-row {
  background-color: rgba(255, 255, 255, 0.015);
  border: 1px solid var(--border-glass);
  border-radius: var(--border-radius-sm);
  padding: 10px 14px;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dashboard-subtopic-row:hover {
  background-color: rgba(255, 255, 255, 0.04) !important;
  border-color: var(--primary) !important;
  transform: translateX(4px);
}

/* Header Icon Buttons */
.header-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  animation: smokeRise3 2.0s infinite linear;
  animation-delay: 1.0s;
}

/* Angry Chimney Shake & Heavy Red Smoke State */
@keyframes chimneyAngryShake {
  0%, 100% { transform: scale(1.15) translate(0, 0) rotate(0deg); }
  10% { transform: scale(1.15) translate(-2px, -1px) rotate(-1deg); }
  20% { transform: scale(1.15) translate(1px, 2px) rotate(1deg); }
  30% { transform: scale(1.15) translate(-1px, -2px) rotate(-1deg); }
  40% { transform: scale(1.15) translate(2px, 1px) rotate(1deg); }
  50% { transform: scale(1.15) translate(-2px, 2px) rotate(0deg); }
  60% { transform: scale(1.15) translate(1px,

// --- GAP between 7048 and 7050 ---

  fill: #7f1d1d !important;
  transition: fill 0.25s ease;
}
/* White mortar strips turn warning amber-yellow */
.bouncy-chimney.angry svg rect[fill="#ffffff"] {
  fill: #f59e0b !important;
  transition: fill 0.25s ease;
}

.bouncy-chimney.angry .smoke-1 {
  animation: smokeRise1 0.6s infinite linear !important;
  background: rgba(239, 68, 68, 0.95) !important;
  width: 7px;
  height: 7px;
}
.bouncy-chimney.angry .smoke-2 {
  animation: smokeRise2 0.7s infinite linear !important;
  animation-delay: 0.15s !important;
  background: rgba(185, 28, 28, 0.95) !important;
  width: 8px;
  height: 8px;
}
.bouncy-chimney.angry .smoke-3 {
  animation: smokeRise3 0.8s infinite linear !important;
  animation-delay: 0.3s !important;
  background: rgba(28, 25, 23, 0.95) !important;
  width: 9px;
  height: 9px;
}

/* Trophy Pulsing Glow animation */
@keyframes trophyGlow {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 4px rgba(250, 204, 21, 0.4));
  }
  50% {
    transform: scale(1.1) rotate(5deg);
    filter: drop-shadow(0 0 16px rgba(250, 204, 21, 0.8));
  }
}
.trophy-pulse-glow {
  animation: trophyGlow 2s ease-in-out infinite;
}

/* Fire flickering for active stats card */
@keyframes fireFlicker {
  0%, 100% { transform: scale(1) rotate(-1deg); opacity: 0.9; }
  25% { transform: scale(1.05) rotate(2deg); opacity: 1; }
  50% { transform: scale(0.95) rotate(-3deg); opacity: 0.85; }
  75% { transform: scale(1.1) rotate(1deg); opacity: 1; }
}
.fire-flicker-animation {
  animation: fireFlicker 0.6s ease-in-out infinite;
  display: inline-block;
}




// --- GAP between 7108 and 7110 ---

@keyframes fireFlicker {
  0%, 100% { transform: scale(1) rotate(-1deg); opacity: 0.9; }
  25% { transform: scale(1.05) rotate(2deg); opacity: 1; }
  50% { transform: scale(0.95) rotate(-3deg); opacity: 0.85; }
  75% { transform: scale(1.1) rotate(1deg); opacity: 1; }
}
.fire-flicker-animation {
  animation: fireFlicker 0.6s ease-in-out infinite;
  display: inline-block;
}

.dashboard-subtopic-row {
  background-color: rgba(255, 255, 255, 0.015);
  border: 1px solid var(--border-glass);
  border-radius: var(--border-radius-sm);
  padding: 10px 14px;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dashboard-subtopic-row:hover {
  background-color: rgba(255, 255, 255, 0.04) !important;
  border-color: var(--primary) !important;
  transform: translateX(4px);
}




// --- GAP between 7140 and 7180 ---

  .chatbot-window {
    right: 12px;
    bottom: 84px;
    width: calc(100vw - 24px);
    height: 400px;
  }
  .chatbot-fab {
    bottom: 16px;
    right: 16px;
  }
  }
}

/* Custom Leaflet Map Tooltips & Controls */
.leaflet-tooltip-active {
  background-color: rgba(15, 23, 42, 0.95) !important;
  color: #fff !important;
  border: 1px solid var(--primary) !important;
  font-weight: bold !important;
  font-size: 0.72rem !important;
  font-family: var(--font-heading) !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.5) !important;
  border-radius: 4px !important;
  padding: 3px 7px !important;
}
.leaflet-tooltip-inactive {
  background-color: rgba(15, 23, 42, 0.8) !important;
  color: #94a3b8 !important;
  border: 1px solid #475569 !important;
  font-size: 0.65rem !important;
  font-family: var(--font-body) !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
  border-radius: 3px !important;
  padding: 2px 5px !important;
}
.leaflet-tooltip-top::before {
  border-top-color: rgba(15, 23, 42, 0.95) !important;
}
.leaflet-container {
  font-family: inherit;
  background-color: #111 !important;
}
.leaflet-tile {
  filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
}
.leaflet-bar {
  border: 1px solid var(--border-glass) !important;
  box-shadow: var(--shadow-sm) !important;
}
.leaflet-bar a {
  background-color: rgba(15, 23, 42, 0.9) !important;
  color: var(--text-muted) !important;
  border-bottom: 1px solid var(--border-glass) !important;
  transition: all 0.2s !important;
}
.leaflet-bar a:hover {
  background-color: var(--primary) !important;
  color: #fff !important;
}

/* --- Middle East Simulator Hub Styles --- */
  height: 100%;
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.settings-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Responsive Overrides for Header and Text Squeezing */
@media (max-width: 1024px) {
  /* Hide the brand title and quote cycler on tablets */
  .main-app-brand-title,
  .brand-header-text,
  #header-brand-quote-container {
    display: none !important;
  }
  
  /* Hide study switcher text labels to save width */
  #subtopic-mode-switcher .mode-btn span {
    display: none !important;
  }
  
  #subtopic-mode-switcher .mode-btn {
    padding: 8px 12px !important;
  }

  /* Make sure inquiry question adjusts nicely */
  #header-inquiry-question {
    font-size: 0.85rem !important;
    max-width: 320px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 768px) {
  .settings-drawer {
    width: 100%;
  }
}




// --- GAP between 7293 and 7300 ---

  box-shadow: 0 2px 6px rgba(0,0,0,0.5) !important;
  border-radius: 4px !important;
  padding: 3px 7px !important;
}
.leaflet-tooltip-inactive {
  background-color: rgba(15, 23, 42, 0.8) !important;
  color: #94a3b8 !important;
  border: 1px solid #475569 !important;
  font-size: 0.65rem !important;
  font-family: var(--font-body) !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
  border-radius: 3px !important;
  padding: 2px 5px !important;
}
.leaflet-tooltip-top::before {
  border-top-color: rgba(15, 23, 42, 0.95) !important;
}
.leaflet-container {
  font-family: inherit;
  background-color: #111 !important;
}
.leaflet-bar {
  border: 1px solid var(--border-glass) !important;
  box-shadow: var(--shadow-sm) !important;
}
.leaflet-bar a {
  background-color: rgba(15, 23, 42, 0.9) !important;
  color: var(--text-muted) !important;
  border-bottom: 1px solid var(--border-glass) !important;
  transition: all 0.2s !important;
  border-left-color: #2a9d8f;
  color: #a3e2d7;
  background-color: rgba(42, 157, 143, 0.05);
}

.me-simulation-container .options-stack {
  padding: 20px;
  background-color: #1a1f26;
  border-top: 2px solid #232931;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.me-simulation-container .btn-option {
  background: #232931;
  border: 1px solid #30363d;
  color: #c9d1d9;
  padding: 12px 16px;
  text-align: left;
  font-family: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.15s;
}
.me-simulation-container .btn-option:hover { background: #30363d; color: #fff; }

.me-simulation-container .evidence-sidebar {
  flex: 1;
  background-color: #1a1f26;
  border: 2px solid #232931;
  border-radius: 8px;
  padding: 15px;
  max-height: 600px;
  overflow-y: auto;
}
.me-simulation-container .evidence-sidebar h3 { margin-top: 0; color: #ffb703; font-size: 1.05rem; border-bottom: 2px solid #232931; padding-bottom: 8px; }
.me-simulation-container .sidebar-meta { font-size: 0.75rem; color: #8b949e; line-height: 1.4; margin-bottom: 12px; }

.me-simulation-container .evidence-tracker { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
.me-simulation-container .evidence-item {
  font-size: 0.8rem;
  padding: 8px;
  background: rgba(88, 166, 255, 0.05);
  border-left: 3px solid #58a6ff;
  border-radius: 0 4px 4px 0;
  line-height: 1.4;
}

/* --- Segmented Visual Hub Study Shortcuts --- */
.shortcut-card {
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  border-radius: var(--border-radius-md);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
  box-shadow: var(--shadow-sm);
}
.shortcut-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-active);
  box-shadow: var(--shadow-md), 0 0 12px var(--primary-glow);
}
.shortcut-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  flex-shrink: 0;
  transition: transform var(--transition-normal);
}
.shortcut-card:hover .shortcut-icon {
  transform: scale(1.1);
}
.shortcut-card h3 {
  font-size: 0.95rem !important;
  font-weight: 700;
  margin: 0;
  color: var(--text-main);
}
.shortcut-card p {
  font-size: 0.72rem !important;
  color: var(--text-muted);
  margin: 2px 0 0 0;
  line-height: 1.25;
}

.hub-section {
  margin-bottom: 28px;
}
.hub-section-header {
  font-family: var(--font-heading);
  font-size: 0.76rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border-glass);
}
  font-family: var(--font-heading);
  font-size: 0.76rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border-glass);
}
.hub-section.study .hub-section-header {
  color: var(--primary);
}
.hub-section.practice .hub-section-header {
  color: var(--accent);
}
.hub-section.games .hub-section-header {
  color: #ffb703;
}

.hub-grid-5 {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
.hub-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.hub-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.hub-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 1024px) {
  .hub-grid-5 {
    grid-template-columns: repeat(3, 1fr);
  }
  .hub-grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  .hub-grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .hub-grid-5 {
  background-color: #0b0f14;
  border: 2px solid #232931;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.me-simulation-container .terminal-header {
  background-color: #1a1f2
    gap: 8px;
  }
  #fullscreen-btn {
    display: none !important; /* Hide fullscreen button on mobile */
  }
  .header-theme-selector-container {
    padding: 0 !important;
  }
  #theme-selector {
    max-width: 80px; /* Restrict select width on mobile */
    font-size: 0.75rem !important;
    padding: 2px 16px 2px 4px !important;
    height: 28px !important;
  }
  .current-view-title {
    font-size: 1.05rem !important;
  }
}

@media (max-width: 480px) {
  .main-header {
    padding: 0 8px;
  }
  #reset-progress-btn {
    display: none !important; /* Hide reset progress button on small mobile to avoid squeeze */
  }
  .mode-btn span {
    display: none; /* Hide Lessons/Accordions text, show only icons on mobile */
  }
  .mode-btn {
    padding: 6px 10px !important;
  }
  #theme-selector {
    max-width: 60px; /* Further restrict selector size */
  }
}

/* --- Settings & Accessibility Drawer Styles --- */
.settings-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1100;
  display: flex;
  justify-content: flex-end;
  animation: fadeIn 0.25s ease-out;
}

.settings-drawer {
  width: 100%;
  max-width: 380px;
  height: 100%;
  background: var(--bg-card);
  border-left: 1px solid var(--border-glass);
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.settings-drawer-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-glass);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.settings-drawer-header h3 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-main);
  display: flex;
  align-items: center;
}

.settings-drawer-close {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.8rem;
  cursor: pointer;
  line-height: 1;
  padding: 4px;
  transition: color 0.2s;
}

.settings-drawer-close:hover {
  color: var(--text-main);
}

.settings-drawer-body {
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  overflow-y: auto;
  flex: 1;
}

.settings-section {
  display: flex;
  flex-direction: column;
}

.settings-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.font-scale-controls {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.font-scale-btn {
  flex: 1;
  padding: 8px;
  font-size: 0.82rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-glass);
  border-radius: var(--border-radius-sm);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

  color: #a855f7 !important;
}
  gap: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border-glass);
}
.hub-section.study .hub-section-header {
  color: var(--primary);
}
.hub-section.practice .hub-section-header {
  color: var(--accent);
}
.hub-section.games .hub-section-header {
  color: #ffb703;
}

.hub-grid-5 {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
.hub-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.hub-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.hub-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 1024px) {
  .hub-grid-5 {
    grid-template-columns: repeat(3, 1fr);
  }
  .hub-grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  .hub-grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .hub-grid-5 {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .hub-grid-4, .hub-grid-3, .hub-grid-2 {
    grid-template-columns: 1fr;
  }
}

  }
}
@media (max-width: 768px) {
  .hub-grid-5 {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .hub-grid-5, .hub-grid-4, .hub-grid-3, .hub-grid-2 {
    grid-template-columns: 1fr;
  }
}

/* --- Games Selector Hub Tab Bar --- */
.games-tab-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--border-glass);
  padding-bottom: 12px;
}
.games-tab-bar .tab-btn {
  flex: 1;
  min-width: 140px;
  padding: 10px 6px;
  font-weight: 600;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--border-glass);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
}
.games-tab-bar .tab-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-main);
  border-color: rgba(255, 255, 255, 0.2);
}
.games-tab-bar .tab-btn.active {
  background: var(--primary);
  color: var(--text-inverse);
  border-color: var(--primary);
  box-shadow: var(--shadow-primary);
}

/* --- Exam Skills Header Cards --- */
.exam-skills-header-card {
  background: var(--gradient-hero);
  padding: 24px;
  border-radius: var(--border-radius-md);
  bor
    margin-bottom: 16px !important;
    border-radius: var(--border-radius-sm) !important;
  }
  .exam-skills-title {
    font-size: 1.2rem !important;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-main);
}
.exam-skills-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-muted);
  margin: 0;
}

/* --- Leaderboard Container --- */
.leaderboard-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 12px 4px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
#btn-leaderboard-back {
  margin-bottom: 20px;
  width: fit-content;
}

/* --- Mobile Responsiveness Adjustments --- */
@media (max-width: 768px) {
  /* Games Hub Tab Bar Mobile swipable layout */
  .games-tab-bar {
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    padding-bottom: 8px !important;
    margin-bottom: 16px !important;
    scrollbar-width: none !important; /* Firefox */
  }
  .games-tab-bar::-webkit-scrollbar {
    display: none !important; /* Chrome, Safari, Opera */
  }
    font-size: 0.82rem !important;
    line-height: 1.45 !important;
  }

  /* Compact dashboard-panel bottom margin */
  .dashboard-panel {
    margin-bottom: 12px !important;
  }
  
  /* Responsive Leaderboard Table styles */
  .leaderboard-table th, 
  .leaderboard-table td {
    padding: 6px 4px !important;
    font-size: 0.78rem !important;
  }

  /* Leaderboard Container Gap and Back Button Spacing */
  .leaderboard-container {
    gap: 12px !important;
  }
  #btn-leaderboard-back {
    margin-bottom: 8px !important;
  }
}

/* Do Now Collapsible Header Styles */
.do-now-toggle-header:hover {
  border-color: var(--accent) !important;
  background-color: var(--bg-card-hover) !important;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.15) !important;
}


// --- GAP between 7841 and 7850 ---

    }
    .games-tab-bar {
      scrollbar-width: none !important;
    }
  }
  
  .games-tab-bar .tab-btn {
    flex: 0 0 auto !important;
    min-width: 130px !important;
    padding: 8px 10px !important;
    font-size: 0.8rem !important;
  }
}

/* Do Now Collapsible Header Styles */
}

/* Do Now Collapsible Header Styles */
.do-now-toggle-header:hover {
  border-color: var(--accent) !important;
  background-color: var(--bg-card-hover) !important;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.15) !important;
}

/* --- Chronology Parser Game Styles --- */
.me-retro-container {
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  position: relative;
  background-color: #000;
  border-radius: 8px;
  box-shadow: 0 0 35px rgba(255, 150, 0, 0.18);
}

.me-terminal-box {
  background-color: #080501;
  border: 3px solid #4a2900;
  padding: 25px;
  font-family: 'Courier New', Courier, monospace;
  color: #ff9d00;
  text-shadow: 0 0 5px rgba(255, 157, 0, 0.7);
  display: flex;
  flex-direction: column;
  position: relative;
}

.me-status-hud {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  border-bottom: 1px dashed #6b3b00;
  padding-bottom: 10px;
  margin-bottom: 15px;
  color: #ffb33b;
}

.me-terminal-screen {
  height: 400px;
  overflow-y: auto;
  margin-bottom: 15px;
  padding-right: 12px;
  line-height: 1.6;
  font-size: 1.05rem;
}

.me-terminal-screen::-webkit-scrollbar { width: 6px; }
.me-terminal-screen::-webkit-scrollbar-track { background: #050200; }
.me-terminal-screen::-webkit-scrollbar-thumb { background: #6b3b00; border-radius: 3px; }

.me-sys-text { color: #b36b00; font-size: 0.9rem; margin: 3px 0; }
.me-story-text { color: #ff9d00; white-space: pre-line; margin-bottom: 15px; }
.me-user-print { color: #ffe6bd; margin-bottom: 12px; font-style: italic; }
.me-terminal-line { border: 0; border-top: 1px solid #4a2900; margin: 12px 0; }

.me-insight-panel { 
  background-color: rgba(16, 185, 129, 0.08); 
  border-left: 4px solid #10b981; 
  padding: 14px; 
  margin-bottom: 15px;
  font-size: 0.95rem; 
  color: #a7f3d0; 
  border-radius: 0 4px 4px 0;
  line-height: 1.5;
  text-shadow: none;
}

.me-insight-panel.me-error-node {
  background-color: rgba(239, 68, 68, 0.08);
  border-left-color: #ef4444;
  color: #fca5a5;
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px dashed #6b3b00;
  padding-top: 15px;
}

.me-prompt-arrow {
  font-size: 1.2rem;

.me-prompt-arrow {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff9d00;
  animation: meBlinker 1.2s linear infinite;
}

.me-cmd-field {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 1.1rem;
@keyframes meBlinker { 50% { opacity: 0.3; } }
.me-hidden { display: none !important; }

/* --- Chronology Command Geographic Vector Map Styles --- */
.me-epic-game-workspace {
  display: flex;
  gap: 25px;
  max-width: 1250px;
  margin: 20px auto;
  font-family: 'Courier New', Courier, monospace;
}

.me-epic-game-workspace .me-retro-container {
  flex: 1.2;
  width: auto;
  max-width: none;
  flex: 1.2;
  width: auto;
  max-width: none;
  margin: 0;
  box-shadow: 0 0 35px rgba(255, 150, 0, 0.15);
}

.me-map-container {
  flex: 0.8;
  background-color: #090d16;
  border: 3px solid #1e293b;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}

.me-map-header {
  background-color: #0f172a;
  padding: 14px;
  color: #38bdf8;
  font-weight: bold;
  font-size: 0.95rem;
  border-bottom: 2px solid #1e293b;
  text-align: center;
  letter-spacing: 1px;
}

.me-map-viewport {
  background: #04060a;
}

/* Leaflet DivIcon Glowing Markers */
.me-game-marker-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.me-game-marker-icon .marker-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.me-game-marker-icon.active .marker-dot {
  width: 14px;
  height: 14px;
  animation: mePulse 1.5s infinite alternate;
  border-color: #fff;
}

@keyframes mePulse {
  0% {
    transform: scale(0.95);
    filter: brightness(1) drop-shadow(0 0 2px rgba(255, 255, 255, 0.8));
  }
  100% {
    transform: scale(1.25);
    filter: brightness(1.2) drop-shadow(0 0 8px rgba(255, 157, 0, 0.9));
  }
}

/* Device Adaptability Layout Queries */
@media (max-width: 950px) {
  .me-epic-game-workspace { flex-direction: column; }
  .me-map-container { max-height: 520px; }
}

  fill: rgba(56, 189, 248, 0.2) !important;
  stroke: #38bdf8 !important;
}

.territory-highlight-egy {
  fill: rgba(239, 68, 68, 0.15) !important;
  stroke: #ef4444 !important;
}

/* Device Adaptability Layout Queries */
@media (max-width: 950px) {
  .me-epic-game-workspace { flex-direction: column; }
  .me-map-container { max-height: 400px; }
}


// --- GAP between 8068 and 8185 ---

  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.12);
}
.gamification-widget:active {
  transform: translateY(0);
}

/* Bouncy Chimney Sweeper Logo Animations */
@keyframes chimneyBounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  30% {
    transform: translateY(-5px) scale(0.96) rotate(-2deg);
  }
  50% {
    transform: translateY(-8px) scale(1.05) rotate(2deg);
  }
  70% {
    transform: translateY(-3px) scale(0.98) rotate(-1deg);
  }
  85% {
    transform: translateY(-1px) scale(1.01) rotate(0.5deg);
  }
}

.bouncy-chimney {
  animation: chimneyBounce 2.5s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 14px;
  flex-shrink: 0;
  transition: filter var(--transition-fast), transform var(--transition-fast);
  position: relative;
}

.bouncy-chimney:hover {
  filter: drop-shadow(0 0 12px var(--primary-glow)) drop-shadow(0 0 4px var(--primary));
  animation-play-state: paused;
  transform: scale(1.15) rotate(3deg);
}

.bouncy-chimney:active {
  transform: scale(0.95);
}

/* Smoke Particles */
.smoke-particle {
  position: absolute;
  top: -4px;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(28, 25, 23, 0.85);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%) scale(1);
  filter: blur(1.5px);
}

@keyframes smokeRise1 {
  0% {
    transform: translate(-50%, 0) scale(1);
    opacity: 0;
  }
  25% {
    opacity: 0.65;
  }
  100% {
    transform: translate(-14px, -26px) scale(3.5);
    opacity: 0;
    filter: blur(4px);
  }
}

@

// --- GAP between 8262 and 8315 ---

  70% { transform: scale(1.15) translate(-1px, 1px) rotate(-1deg); }
  80% { transform: scale(1.15) translate(2px, -2px) rotate(1deg); }
  90% { transform: scale(1.15) translate(-1px, 2px) rotate(0deg); }
}

.bouncy-chimney.angry {
  animation: chimneyAngryShake 0.12s infinite linear !important;
  filter: drop-shadow(0 0 16px rgba(239, 68, 68, 0.95)) drop-shadow(0 0 6px #dc2626) !important;
}

.bouncy-chimney.angry svg polygon {
  fill: #dc2626 !important;
  transition: fill 0.25s ease;
}
.bouncy-chimney.angry svg rect {
  fill: #7f1d1d !important;
  transition: fill 0.25s ease;
}
/* White mortar strips turn warning amber-yellow */
.bouncy-chimney.angry svg rect[fill="#ffffff"] {
  fill: #f59e0b !important;
  transition: fill 0.25s ease;
}

.bouncy-chimney.angry .smoke-1 {
  animation: smokeRise1 0.6s infinite linear !important;
  background: rgba(239, 68, 68, 0.95) !important;
  width: 7px;
  height: 7px;
}
.bouncy-chimney.angry .smoke-2 {
  animation: smokeRise2 0.7s infinite linear !important;
  animation-delay: 0.15s !important;
  background: rgba(185, 28, 28, 0.95) !important;
  width: 8px;
  height: 8px;
}
.bouncy-chimney.angry .smoke-3 {
  animation: smokeRise3 0.8s infinite linear !important;
  animation-delay: 0.3s !important;
  background: rgba(28, 25, 23, 0.95) !important;
  width: 9px;
  height: 9px;
}

/* Trophy Pulsing Glow animation */
@keyframes trophyGlow {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 4px rgba(250, 204, 21, 0.4));
  }
  50% {
    transform: scale(1.1) rotate(5deg);
    filter: drop-shadow(0 0 16px rgba(250, 204, 21, 0.8));
  }
}
.trophy-pulse-glow {
  animation: trophyGlow 2s ease-in-out infinite;
}

/* Fire flickering for active stats card */
@keyframes fireFlicker {
  0%, 100% { transform: scale(1) rotate(-1deg); opacity: 0.9; }
  25% { transform: scale(1.05) rotate(2deg); opacity: 1; }
  50% { transform: scale(0.95) rotate(-3deg); opacity: 0.85; }
  75% { transform: scale(1.1) rotate(1deg); opacity: 1; }
}
.fire-flicker-animation {
  animation: fireFlicker 0.6s ease-in-out infinite;
  display: inline-block;
}


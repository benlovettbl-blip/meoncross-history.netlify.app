
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
    ch3_feda: "⚔️ GCSE Fact Check (KT1.2/2.2): Because the 1949 armistice agreements failed to solve the political status of refugees or grant a 'Right of Return', displaced Palestinians formed the Fedayeen. Their cross-border raids from Gaza in the early 1950s led to harsh Israeli military reprisal policies, severely destabilizing the region ahead of the 1956 Suez Crisis."
  }
};
};

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
      if (nodeSinai) nodeSinai.classList.add('poly-active');
    }
  }
}

function triggerLiveHudInsight(text, isErrorState) {
  const box = document.getElementById('me-exam-insight');
  if (box) {
    box.innerText = text;
    box.className = isErrorState ? "me-insight-panel me-error-node" : "me-insight-panel";
    box.classList.remove('me-hidden');
  }
}

// Upgraded Input Normalizer Matrix
const vocabularyMatrix = {
  verbs: {
  const mapContainer = document.getElementById('me-game-map');
  if (!mapContainer) return;

  if (!meGameMap) {
    initMeGameMap();
  }
  if (!meGameMap) return;

  // Reset markers
  for (const key of Object.keys(meMarkers)) {
    setMarkerState(key, false, key === 'suez' ? '#38bdf8' : '#64748b');
  }

  if (meRoutes.sinai1956) meRoutes.sinai1956.setStyle({ opacity: 0.2 });

  const mapLabelElement = document.getElementById('me-map-loc-label');
  const roomData = meEpicEngine.rooms[roomKey];
  if (roomData && mapLabelElement) {
    mapLabelElement.innerText = roomData.mapLabel;
  }

  if (chapterNum === 1) {
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
  }

  let resolvedVerb = "";
  let resolvedNoun = "";

  // 2. Resolve Global Verbs
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
  } else {  if (insight) {
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
// Missing line 2229
// Missing line 2230
// Missing line 2231
// Missing line 2232
// Missing line 2233
// Missing line 2234
// Missing line 2235
// Missing line 2236
// Missing line 2237
// Missing line 2238
// Missing line 2239
// Missing line 2240
// Missing line 2241
// Missing line 2242
          triggerLiveHudInsight(meEpicEngine.insights.ch3_suez, false);
          return "SUCCESSFUL ACCREDITATION SEQUENCE PASSED!\n\nYou deliver the operational deployment orders to the armored patrol commander. The half-track vehicle engines roar to life, advancing rapidly across the Sinai wastes.\n\nYour swift pre-emptive strike sweeps through Egyptian defenses in hours. Although intense political and financial pressure from US President Eisenhower eventually forces an Anglo-French-Israeli withdrawal from Egyptian territory, your offensive successfully reopens the vital shipping lanes through the Straits of Tiran and demonstrates Israel's clear regional military superiority.\n\n*** 🏆 SIMULATOR EXAM PROTOCOLS FULLY COMPLETED // KEY TOPIC 1 REVISION ANALYSIS METRICS LOCKED IN SECURE ***";
        }
      }
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
      <p class="me-sys-text">*** INFOHIST EMPIRE ENGINE v2.0 // CHRONOLOGY COMMAND: HAIFA TO SINAI ***</p>
      <p class="me-sys-text">EDEXCEL SPECIFICATION P5 // KEY TOPIC 1 INTERACTIVE CHRONOLOGY</p>
      <p class="me-sys-text">INSTRUCTIONS: TYPE CORE COMMANDS LIKE 'LOOK', 'GO EAST', 'EXAMINE CRATE', OR 'TAKE CERTIFICATE'. TYPE 'HELP' FOR AN ACTION VERB SUMMARY SHEET.</p>
      <hr class="me-terminal-line">
      <p id="me-story-output" class="me-story-text">${meEpicEngine.rooms.DECK.description}</p>
    `;
  }
  
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

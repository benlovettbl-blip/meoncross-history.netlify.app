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
      jaffaParserFormBound = true;
    }
  }
}

window.initJaffaParserGame = initJaffaParserGame;
window.jaffaEpicEngine = jaffaEpicEngine;
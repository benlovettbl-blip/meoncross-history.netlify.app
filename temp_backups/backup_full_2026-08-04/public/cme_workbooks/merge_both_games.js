const fs = require('fs');

try {
  // Read first 1366 lines of games.js (the core games hub code before any parser games were added)
  const originalGamesJs = fs.readFileSync('src/games.js', 'utf8');
  
  // Haifa to Sinai Code block
  const haifaCode = `
// =============================================================
// CHRONOLOGY PARSER RETRO TEXT ADVENTURE GAME - HAIFA TO SINAI
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
      chap: 1, name: "EXODUS DECK", mapLabel: "HAIFA PORT OUTSKIRTS",
      description: "You are standing on the main deck of a crowded immigrant vessel, the President Warfield (renamed the Exodus 1947), anchored just outside Haifa Port. The deck is packed with Holocaust survivors, exhausted but hopeful. On the pier below, British soldiers have set up a barbed-wire blockade.\\nTo the East, a gangway leads down toward the harbor. A hatch leads Down into the dark cargo hold.",
      exits: { east: "PIER", down: "HOLD" }
    },
    HOLD: {
      chap: 1, name: "EXODUS CARGO HOLD", mapLabel: "HAIFA PORT SLIPWAY",
      description: "You are inside the dimly lit cargo hold of the ship. Heavy wooden crates are stacked against the steel ribs of the hull. A metal ladder leads Up back to the main deck.\\nAn old slatted wooden CRATE sits near the ladder.",
      exits: { up: "DECK" }
    },
    PIER: {
      chap: 1, name: "HAIFA PIER", mapLabel: "HAIFA DOCKS AREA",
      description: "You are standing on the Haifa Port slipway. Armed British soldiers patrol the perimeter, enforcing strict immigration quota policies. A desk has been set up to process arrivals.\\nA British officer stands near the processing desk. To the West, the gangway leads back to the deck of the ship.",
      exits: { west: "DECK" }
    },
    OUTPOST: {
      chap: 2, name: "NEGEV OUTPOST", mapLabel: "NEGEV DESERT HIGHWAY",
      description: "You are at a desert outpost in the Negev (May 1948). The state of Israel has just been declared, and the first Arab-Israeli War is raging. Your unit is tasked with holding the southern highway against advancing Egyptian forces.\\nTo the North, a trench leads to a sandbagged observation LOOKOUT. To the South, a heavy metal door leads Down into the communications BUNKER.",
      exits: { north: "LOOKOUT", south: "BUNKER" }
    },
    BUNKER: {
      chap: 2, name: "NEGEV BUNKER", mapLabel: "SOUTHERN DEFENSE RADAR",
      description: "You are inside the concrete communications bunker. A static-filled military shortwave radio console sits on a table. A steel ladder leads Up to the surface.\\nA wooden supply CRATE sits in the corner.",
      exits: { up: "OUTPOST" }
    },
    LOOKOUT: {
      chap: 2, name: "SANDBAG LOOKOUT", mapLabel: "NEGEV DESERT SECTOR",
      description: "You stand behind a sandbagged parapet overlooking the desert valley. A fellow soldier is peering through binoculars, looking highly anxious. The trench leads back South to the main outpost.",
      exits: { south: "OUTPOST" }
    },
    COMMAND: {
      chap: 3, name: "SINAI TENT COMMAND", mapLabel: "SINAI PENINSULA SECTOR",
      description: "You are inside the tactical command headquarters in the Sinai Peninsula (October 1956). The Suez Crisis is unfolding. You are reviewing the operational blueprints for the pre-emptive Sinai campaign.\\nA metal filing cabinet sits in the corner. To the South, a doorway leads out toward the sand DUNES.",
      exits: { south: "DUNES" }
    },
    DUNES: {
      chap: 3, name: "SINAI SAND DUNES", mapLabel: "SINAI OUTPOST RADAR",
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

let meParserFormBound = false;
let meGameMap = null;
let meActiveLayerGroup = null;

function initMeGameMap() {
  const container = document.getElementById('me-game-map');
  if (!container || meGameMap) return;

  meGameMap = L.map('me-game-map', { scrollWheelZoom: false }).setView([30.5, 34.5], 6);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19
  }).addTo(meGameMap);

  meActiveLayerGroup = L.layerGroup().addTo(meGameMap);
}

function syncGeographicLeafletMap(roomKey, chapterNum) {
  const mapContainer = document.getElementById('me-game-map');
  if (!mapContainer) return;

  if (!meGameMap) {
    initMeGameMap();
  }
  if (!meGameMap || !meActiveLayerGroup) return;

  meActiveLayerGroup.clearLayers();

  const mapLabelElement = document.getElementById('me-map-loc-label');
  const roomData = meEpicEngine.rooms[roomKey];
  if (roomData && mapLabelElement) {
    mapLabelElement.innerText = roomData.mapLabel;
  }

  const activeIcon = L.divIcon({
    className: 'me-game-marker-icon active',
    html: \`<div class="marker-dot" style="background-color: #ff9d00; box-shadow: 0 0 10px #ff9d00; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #fff; animation: mePulse 1.5s infinite alternate;"></div>\`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  const permanentIcon = L.divIcon({
    className: 'me-game-marker-icon permanent',
    html: \`<div class="marker-dot-static" style="background-color: #10b981; width: 10px; height: 10px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>\`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  const blockadeIcon = L.divIcon({
    className: 'me-game-marker-icon active',
    html: \`<div class="marker-dot" style="background-color: #ef4444; box-shadow: 0 0 10px #ef4444; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #fff; animation: mePulse 1.5s infinite alternate;"></div>\`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  const locations = {
    haifa: { coords: [32.8191, 34.9983], label: "Haifa Docks Area", desc: "Immigrant quota processing checkpoint." },
    negev: { coords: [31.2500, 34.7984], label: "Negev Desert Highway", desc: "Strategic defense line during the 1948 War." },
    sinai: { coords: [29.8488, 33.8378], label: "Sinai Peninsula Sector", desc: "Pre-emptive strike staging grounds." },
    tiran: { coords: [27.9904, 34.4285], label: "Straits of Tiran", desc: "Strategic maritime chokepoint blockade." },
    suez: { coords: [30.45, 32.55], label: "Suez Canal Blockade", desc: "Target area for Anglo-French operation." }
  };

  if (chapterNum === 1) {
    const marker = L.marker(locations.haifa.coords, { icon: activeIcon })
      .addTo(meActiveLayerGroup)
      .bindPopup(\`<strong>\${locations.haifa.label}</strong><br>\${locations.haifa.desc}\`);
    meGameMap.setView(locations.haifa.coords, 7, { animate: true });
    marker.openPopup();
  } else {
    L.marker(locations.haifa.coords, { icon: permanentIcon })
      .addTo(meActiveLayerGroup)
      .bindPopup(\`<strong>\${locations.haifa.label}</strong><br>\${locations.haifa.desc}\`);
  }

  if (chapterNum === 2) {
    const marker = L.marker(locations.negev.coords, { icon: activeIcon })
      .addTo(meActiveLayerGroup)
      .bindPopup(\`<strong>\${locations.negev.label}</strong><br>\${locations.negev.desc}\`);
    
    L.polyline([locations.haifa.coords, locations.negev.coords], {
      color: '#10b981', weight: 3, opacity: 0.7
    }).addTo(meActiveLayerGroup);

    meGameMap.setView(locations.negev.coords, 7, { animate: true });
    marker.openPopup();
  } else if (chapterNum > 2) {
    L.marker(locations.negev.coords, { icon: permanentIcon })
      .addTo(meActiveLayerGroup)
      .bindPopup(\`<strong>\${locations.negev.label}</strong><br>\${locations.negev.desc}\`);
  }

  if (chapterNum === 3) {
    L.polyline([locations.haifa.coords, locations.negev.coords, locations.sinai.coords], {
      color: '#10b981', weight: 3, opacity: 0.7
    }).addTo(meActiveLayerGroup);

    if (meEpicEngine.state.ch3_victory) {
      L.marker(locations.sinai.coords, { icon: permanentIcon })
        .addTo(meActiveLayerGroup)
        .bindPopup(\`<strong>\${locations.sinai.label}</strong><br>\${locations.sinai.desc}\`);
      
      const suezLine = [[31.26, 32.30], [29.93, 32.55]];
      L.polyline(suezLine, { color: '#38bdf8', weight: 5, opacity: 0.8 }).addTo(meActiveLayerGroup);

      meGameMap.setView(locations.suez.coords, 8, { animate: true });
    } else {
      const suezLine = [[31.26, 32.30], [29.93, 32.55]];
      L.polyline(suezLine, { color: '#38bdf8', weight: 5, opacity: 0.5 }).addTo(meActiveLayerGroup);

      if (roomKey === "DUNES") {
        const marker = L.marker(locations.tiran.coords, { icon: blockadeIcon })
          .addTo(meActiveLayerGroup)
          .bindPopup(\`<strong>\${locations.tiran.label}</strong><br>\${locations.tiran.desc}\`);
        meGameMap.setView(locations.tiran.coords, 8, { animate: true });
        marker.openPopup();
      } else {
        const marker = L.marker(locations.sinai.coords, { icon: activeIcon })
          .addTo(meActiveLayerGroup)
          .bindPopup(\`<strong>\${locations.sinai.label}</strong><br>\${locations.sinai.desc}\`);
        meGameMap.setView(locations.sinai.coords, 8, { animate: true });
        marker.openPopup();
      }
    }
  }

  setTimeout(() => {
    if (meGameMap) meGameMap.invalidateSize();
  }, 100);
}

function syncEngineHudDisplay() {
  const chapHud = document.getElementById('me-chap-hud');
  const locHud = document.getElementById('me-loc-hud');
  const invHud = document.getElementById('me-inv-hud');
  
  if (chapHud) chapHud.innerText = meEpicEngine.chapters[meEpicEngine.state.chapter];
  if (locHud) locHud.innerText = meEpicEngine.state.room;
  
  if (invHud) {
    invHud.innerText = meEpicEngine.state.inventory.length === 0 ? "EMPTY" : meEpicEngine.state.inventory.map(i => i.toUpperCase()).join(", ");
  }

  syncGeographicLeafletMap(meEpicEngine.state.room, meEpicEngine.state.chapter);
}

function triggerLiveHudInsight(text, isErrorState) {
  const box = document.getElementById('me-exam-insight');
  if (box) {
    box.innerText = text;
    box.className = isErrorState ? "me-insight-panel me-error-node" : "me-insight-panel";
    box.classList.remove('me-hidden');
  }
}

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

function flexibleParse(rawInput) {
  const clean = rawInput.trim().toLowerCase();
  if (!clean) return { verb: "", noun: "" };

  const stopWords = ["the", "a", "an", "at", "in", "into", "to", "through", "on", "inside", "with", "around"];
  const tokens = clean.split(/\\s+/).filter(t => !stopWords.includes(t));

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

  if (meEpicEngine.state.chapter === 3 && meEpicEngine.state.room === "DUNES" && meEpicEngine.state.ch3_awaitingChokepoint) {
    const norm = clean.replace(/[^a-z0-9\\s]/g, "");
    
    if (norm.includes("patrol") || norm.includes("commander") || norm.includes("lookout") || norm.includes("examine") || norm.includes("talk")) {
      if (norm.includes("tiran") || norm.includes("sharm")) {
        // success below
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
        meEpicEngine.state.ch3_victory = true;
        meEpicEngine.state.ch3_awaitingChokepoint = false;
        AudioEngine.play('success');
        syncEngineHudDisplay();
        triggerLiveHudInsight(meEpicEngine.insights.ch3_suez, false);
        return "SUCCESSFUL ACCREDITATION SEQUENCE PASSED!\\n\\nCorrect. The Straits of Tiran (controlled by Sharm el-Sheikh) is the vital chokepoint. The patrol commander nods and shouts orders. The half-track vehicle engines roar to life, advancing rapidly across the Sinai wastes.\\n\\nYour swift pre-emptive strike sweeps through Egyptian defenses in hours. Although intense political and financial pressure from US President Eisenhower eventually forces an Anglo-French-Israeli withdrawal from Egyptian territory, your offensive successfully reopens the vital shipping lanes through the Straits of Tiran and demonstrates Israel's clear regional military superiority.\\n\\n*** 🏆 SIMULATOR EXAM PROTOCOLS FULLY COMPLETED // KEY TOPIC 1 REVISION ANALYSIS METRICS LOCKED IN SECURE ***";
      } else {
        AudioEngine.play('fail');
        return "The commander shakes his head: 'That is incorrect. Look closely at the southern tip of the Sinai Peninsula on the geopolitical map. What is the name of that strategic blockade checkpoint?'";
      }
    }
  }

  const currentRoomData = meEpicEngine.rooms[meEpicEngine.state.room];
  const stopWords = ["the", "a", "an", "at", "in", "into", "to", "through", "on", "inside", "with", "around"];
  const tokens = clean.split(/\\s+/).filter(t => !stopWords.includes(t));
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
    const parsed = flexibleParse(rawInput);
    verb = parsed.verb;
    noun = parsed.noun;
  }

  if (verb === "help") {
    AudioEngine.play('click');
    return "VALID ACTION COMMAND MATRIX:\\n• LOOK (Redraws current environment context description)\\n• GO [NORTH / SOUTH / EAST / WEST / UP / DOWN] (Navigates between rooms)\\n• TAKE [ITEM] (Picks up a key object)\\n• EXAMINE [OBJECT / PERSON] (Inspects a feature closely)\\n• TALK [PERSON] (Interacts with an historical figure)\\n• SHOW / USE [ITEM] (Applies an inventory asset to the room state)\\n• INV (Displays what items you are currently carrying)";
  }

  const lookSynonyms = ["look", "l", "search", "peer"];
  if (verb === "look" || (verb === "examine" && !noun && lookSynonyms.includes(rawVerb))) {
    AudioEngine.play('click');
    return currentRoomData.description;
  }

  if (verb === "inv") {
    AudioEngine.play('click');
    if (meEpicEngine.state.inventory.length === 0) return "Your inventory is currently empty.";
    return "Current Inventory Items: " + meEpicEngine.state.inventory.map(i => i.toUpperCase()).join(", ");
  }

  if (meEpicEngine.state.chapter === 1) {
    if (verb === "go") {
      let path = noun;
      if (currentRoomData.exits[path]) {
        if (meEpicEngine.state.room === "DECK" && path === "east" && !meEpicEngine.state.inventory.includes("certificate")) {
          AudioEngine.play('fail');
          triggerLiveHudInsight(meEpicEngine.insights.ch1_win, true);
          return "EXAM TRAP ENCOUNTERED: You descend the gangway onto the pier. British Mandate soldiers immediately intercept you. Without a legal entry allocation document under the restricted quota limits, you are arrested and transferred onto an extraction ship bound for internment camps in Cyprus. You must find proper papers to proceed. You head back up onto the deck.";
        }
        meEpicEngine.state.room = currentRoomData.exits[path].toUpperCase();
        AudioEngine.play('click');
        syncEngineHudDisplay();
        return "You move " + path.toUpperCase() + ".\\n\\n" + meEpicEngine.rooms[meEpicEngine.state.room].description;
      }
      AudioEngine.play('fail');
      return "You can't move that way from here. Type LOOK to check exits.";
    }

    if (verb === "examine") {
      if (!noun) return "What do you want to examine?";
      if (meEpicEngine.state.room === "HOLD" && noun === "crate") {
        meEpicEngine.state.ch1_crateChecked = true;
        AudioEngine.play('success');
        return "You pry open the loose slatted lid of the shipping crate. Tucked safely beneath some heavy wool blankets, you uncover a hidden stack of forged British Mandate entry CERTIFICATES.";
      }
      if (meEpicEngine.state.room === "PIER" && noun === "officer") {
        AudioEngine.play('click');
        return "The Mandate Officer is cross-referencing names against a ledger. He looks highly stressed by the backlog of arrivals and barks: 'Present your entry documents or step toward the detention area!'";
      }
      AudioEngine.play('click');
      return "You check the " + noun.toUpperCase() + " but notice nothing out of the ordinary.";
    }

    if (verb === "take") {
      if (!noun) return "What do you want to take?";
      if (meEpicEngine.state.room === "HOLD" && noun === "certificate") {
        if (!meEpicEngine.state.ch1_crateChecked) {
          AudioEngine.play('fail');
          return "You don't see any document here. Try investigating items in the room first.";
        }
        if (meEpicEngine.state.inventory.includes("certificate")) {
          AudioEngine.play('click');
          return "You are already carrying this document.";
        }
        meEpicEngine.state.inventory.push("certificate");
        AudioEngine.play('success');
        syncEngineHudDisplay();
        triggerLiveHudInsight(meEpicEngine.insights.ch1_take, false);
        return "You pull a forged entry CERTIFICATE from the crate and slide it into your coat pocket. The stamps look flawlessly authentic.";
      }
      AudioEngine.play('fail');
      return "You cannot pick that up.";
    }

    if (verb === "use") {
      if (noun.includes("certificate") && meEpicEngine.state.inventory.includes("certificate")) {
        if (meEpicEngine.state.room === "PIER") {
          meEpicEngine.state.chapter = 2;
          meEpicEngine.state.room = "OUTPOST";
          meEpicEngine.state.inventory = []; 
          AudioEngine.play('success');
          syncEngineHudDisplay();
          triggerLiveHudInsight(meEpicEngine.insights.ch1_win, false);
          return "SUCCESSFUL RETRIEVAL ALIGNMENT! The British officer examines the forged certificate, grunts under the strain of the processing queue, and stamps your card. You pass through the gates into Haifa.\\n\\n---------------------------------------------\\n*** CHRONOLOGY ADVANCED: CHAPTER 2 UNLOCKED ***\\n---------------------------------------------";
        }
        AudioEngine.play('fail');
        return "Using that here achieves nothing.";
      }
    }
  }

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
        return "You move " + path.toUpperCase() + ".\\n\\n" + meEpicEngine.rooms[meEpicEngine.state.room].description;
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
        syncEngineHudDisplay();
        triggerLiveHudInsight(meEpicEngine.insights.ch2_arms, false);
        return "You take the electrical WIRE spool from the Czech armament supply shipment crate.";
      }
      AudioEngine.play('fail');
      return "You can't take that.";
    }

    if (verb === "use") {
      if (noun === "wire" && meEpicEngine.state.inventory.includes("wire")) {
        if (meEpicEngine.state.room === "BUNKER") {
          meEpicEngine.state.ch2_radioRepaired = true;
          meEpicEngine.state.inventory = meEpicEngine.state.inventory.filter(i => i !== "wire");
          AudioEngine.play('success');
          syncEngineHudDisplay();
          return "You strip the insulation wire and splice it onto the broken terminal link. The signal power gauge on the shortwave radio console lights up instantly. The machine is fully functional!";
        }
      }
      if (noun === "radio") {
        if (meEpicEngine.state.room === "BUNKER" && meEpicEngine.state.ch2_radioRepaired) {
          meEpicEngine.state.ch2_reinforcementsCalled = true;
          AudioEngine.play('success');
          return "You adjust the frequency dials and broadcast your operational sector code. Central Command acknowledges, confirming heavy weaponry and armor reinforcements are being redirected to defend your line.";
        }
        AudioEngine.play('fail');
        return "The radio console is dead. It requires circuit repair wire first.";
      }
    }

    if (verb === "talk") {
      if (meEpicEngine.state.room === "LOOKOUT" && noun === "lookout") {
        if (meEpicEngine.state.ch2_reinforcementsCalled) {
          meEpicEngine.state.chapter = 3;
          meEpicEngine.state.room = "COMMAND";
          meEpicEngine.state.inventory = []; 
          AudioEngine.play('success');
          syncEngineHudDisplay();
          triggerLiveHudInsight(meEpicEngine.insights.ch2_win, false);
          return "SUCCESSFUL STRATEGIC COORDINATION! You inform the lookout that armor support has been confirmed. Backed by Czech arms transfers and a cohesive, unified IDF operational command structure, your unit successfully holds the highway against disjointed Arab coalition moves.\\n\\n---------------------------------------------\\n*** CHRONOLOGY ADVANCED: CHAPTER 3 UNLOCKED ***\\n---------------------------------------------";
        }
        AudioEngine.play('click');
        return "The lookout shouts over the sound of wind: 'Enemy armor is advancing down the sector! If we don't fix the transmitter radio inside the communications bunker and call in reinforcement coordinates, this outpost will be completely overrun!'";
      }
    }
  }

  if (meEpicEngine.state.chapter === 3) {
    if (verb === "go") {
      let path = noun;
      if (currentRoomData.exits[path]) {
        meEpicEngine.state.room = currentRoomData.exits[path].toUpperCase();
        AudioEngine.play('click');
        syncEngineHudDisplay();
        return "You move " + path.toUpperCase() + ".\\n\\n" + meEpicEngine.rooms[meEpicEngine.state.room].description;
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
        syncEngineHudDisplay();
        return "You secure the pre-emptive Sinai campaign deployment ORDERS from the top-secret folder.";
      }
      AudioEngine.play('fail');
      return "You can't pick that up.";
    }

    if (verb === "use") {
      if (noun === "orders" && meEpicEngine.state.inventory.includes("orders")) {
        if (meEpicEngine.state.room === "DUNES") {
          meEpicEngine.state.ch3_awaitingChokepoint = true;
          meEpicEngine.state.inventory = meEpicEngine.state.inventory.filter(i => i !== "orders");
          AudioEngine.play('success');
          syncEngineHudDisplay();
          return "Operational orders verified by the commander!\\n\\nHowever, he points at the map: 'Central Intelligence reports that Egyptian forces have blockaded our shipping lanes at the southern tip of the Sinai Peninsula, cutting off our port of Eilat. Examine the live map display closely.\\n\\nType the name of the specific geographic chokepoint where the blockade is positioned so we can dispatch the patrol half-tracks!'";
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
  meEpicEngine.state.ch3_awaitingChokepoint = false;
  meEpicEngine.state.ch3_victory = false;

  const storyOutput = document.getElementById('me-story-output');
  if (storyOutput) {
    storyOutput.innerText = meEpicEngine.rooms.DECK.description;
  }
  
  const logContainer = document.getElementById('me-scroll-screen');
  if (logContainer) {
    logContainer.innerHTML = \`
      <p class="me-sys-text">*** INFOHIST EMPIRE ENGINE v2.0 // HAIFA TO SINAI: TEXT ADVENTURE ***</p>
      <p class="me-sys-text">EDEXCEL SPECIFICATION P5 // KEY TOPIC 1 INTERACTIVE CHRONOLOGY</p>
      <p class="me-sys-text">INSTRUCTIONS: TYPE CORE COMMANDS LIKE 'LOOK', 'GO EAST', 'EXAMINE CRATE', OR 'TAKE CERTIFICATE'. TYPE 'HELP' FOR AN ACTION VERB SUMMARY SHEET.</p>
      <hr class="me-terminal-line">
      <p id="me-story-output" class="me-story-text">\${meEpicEngine.rooms.DECK.description}</p>
    \`;
  }
  
  const insight = document.getElementById('me-exam-insight');
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
      meParserFormBound = true;
    }
  }
}

window.initParserGame = initParserGame;
window.meEpicEngine = meEpicEngine;
`;

  // Write files
  const cleanJaffaCode = fs.readFileSync('scratch/jaffa_game_clean.js', 'utf8');
  
  const totalCode = originalGamesJs + '\n\n' + haifaCode + '\n\n' + cleanJaffaCode;
  
  fs.writeFileSync('src/games.js', totalCode);
  console.log('Successfully rebuilt src/games.js with both separate text adventure games!');
} catch (err) {
  console.error(err);
}

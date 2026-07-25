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
    
    // High-contrast neon tag label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(hs.name.toUpperCase(), hs.x, hs.y + 25);
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
    
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(hoveredHotspot.name.toUpperCase(), hoveredHotspot.x, hoveredHotspot.y - hoveredHotspot.radius - 12);
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
const fs = require('fs');

try {
  let content = fs.readFileSync('scratch/haifa_game_original.js', 'utf8');
  
  // Replace missing lines 1630 to 1639
  const topBlock = `
window.startMePath = startMePath;
window.returnToDashboard = returnToDashboard;
window.initMeSimGame = initMeSimGame;

// =============================================================
// CHRONOLOGY PARSER RETRO TEXT ADVENTURE GAME ENGINE
// =============================================================

const meEpicEngine = {`;

  content = content.replace(/\/\/ Missing line 1630\n\/\/ Missing line 1631\n\/\/ Missing line 1632\n\/\/ Missing line 1633\n\/\/ Missing line 1634\n\/\/ Missing line 1635\n\/\/ Missing line 1636\n\/\/ Missing line 1637\n\/\/ Missing line 1638\n\/\/ Missing line 1639\n/g, topBlock);

  // Replace missing lines 2019 to 2035
  const midBlock = `  const isGoVerb = goSynonyms.includes(rawVerb);
  
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
  } else {`;

  content = content.replace(/\/\/ Missing line 2019\n\/\/ Missing line 2020\n\/\/ Missing line 2021\n\/\/ Missing line 2022\n\/\/ Missing line 2023\n\/\/ Missing line 2024\n\/\/ Missing line 2025\n\/\/ Missing line 2026\n\/\/ Missing line 2027\n\/\/ Missing line 2028\n\/\/ Missing line 2029\n\/\/ Missing line 2030\n\/\/ Missing line 2031\n\/\/ Missing line 2032\n\/\/ Missing line 2033\n\/\/ Missing line 2034\n\/\/ Missing line 2035\n/g, midBlock);

  // Replace missing lines 2229 to 2242
  const endBlock = `          AudioEngine.play('success');
          syncEngineHudDisplay();
          triggerLiveHudInsight(meEpicEngine.insights.ch2_win, false);
          return "SUCCESSFUL STRATEGIC COORDINATION! You inform the lookout that armor support has been confirmed. Backed by Czech arms transfers and a cohesive, unified IDF operational command structure, your unit successfully holds the highway against disjointed Arab coalition moves.\\n\\n---------------------------------------------\\n*** CHRONOLOGY ADVANCED: CHAPTER 3 UNLOCKED ***\\n---------------------------------------------";
        }
        AudioEngine.play('click');
        return "The lookout shouts over the sound of wind: 'Enemy armor is advancing down the sector! If we don't fix the transmitter radio inside the communications bunker and call in reinforcement coordinates, this outpost will be completely overrun!'";
      }
    }
  }

  // =============================================================
  // ACT 3 ARCHITECTURE MATRIX (THE SUEZ CRISIS OF 1956)
  // =============================================================
  if (meEpicEngine.state.chapter === 3) {`;

  // Matches till the end of ACT 3 trigger check
  content = content.replace(/\/\/ Missing line 2229\n\/\/ Missing line 2230\n\/\/ Missing line 2231\n\/\/\s+triggerLiveHudInsight\(meEpicEngine.insights.ch2_win,\s+false\);\/\/ Missing line 2232\n\/\/ Missing line 2233\n\/\/ Missing line 2234\n\/\/ Missing line 2235\n\/\/ Missing line 2236\n\/\/ Missing line 2237\n\/\/ Missing line 2238\n\/\/ Missing line 2239\n\/\/ Missing line 2240\n\/\/ Missing line 2241\n\/\/ Missing line 2242\n/g, endBlock);

  fs.writeFileSync('scratch/haifa_game_fixed.js', content);
  console.log('Successfully wrote fully patched Haifa to Sinai code to scratch/haifa_game_fixed.js');

} catch (err) {
  console.error(err);
}

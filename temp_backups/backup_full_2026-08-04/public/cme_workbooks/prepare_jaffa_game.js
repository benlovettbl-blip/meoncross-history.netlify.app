const fs = require('fs');

try {
  const fileContent = fs.readFileSync('scratch/jaffa_games_backup.js', 'utf8');
  
  // Find where the text adventure block starts
  const startKeyword = '// CHRONOLOGY PARSER RETRO TEXT ADVENTURE GAME ENGINE';
  const startIndex = fileContent.indexOf(startKeyword);
  if (startIndex === -1) {
    throw new Error('Could not find start keyword in backup file.');
  }
  
  let code = fileContent.substring(startIndex);
  
  // Rename variables and function names
  code = code.replace(/meEpicEngine/g, 'jaffaEpicEngine');
  code = code.replace(/initParserGame/g, 'initJaffaParserGame');
  code = code.replace(/processCommandInterpreter/g, 'processJaffaCommandInterpreter');
  code = code.replace(/syncEngineHudDisplay/g, 'syncJaffaEngineHudDisplay');
  code = code.replace(/syncGeographicLeafletMap/g, 'syncJaffaGeographicLeafletMap');
  code = code.replace(/meParserFormBound/g, 'jaffaParserFormBound');
  code = code.replace(/meGameMap/g, 'jaffaGameMap');
  code = code.replace(/meActiveLayerGroup/g, 'jaffaActiveLayerGroup');
  code = code.replace(/initMeGameMap/g, 'initJaffaGameMap');
  
  // Rename DOM IDs
  code = code.replace(/me-game-map/g, 'jaffa-game-map');
  code = code.replace(/me-map-loc-label/g, 'jaffa-map-loc-label');
  code = code.replace(/me-chap-hud/g, 'jaffa-chap-hud');
  code = code.replace(/me-inv-hud/g, 'jaffa-inv-hud');
  code = code.replace(/me-loc-hud/g, 'jaffa-loc-hud');
  code = code.replace(/me-exam-insight/g, 'jaffa-exam-insight');
  code = code.replace(/me-story-output/g, 'jaffa-story-output');
  code = code.replace(/me-scroll-screen/g, 'jaffa-scroll-screen');
  code = code.replace(/me-parser-form/g, 'jaffa-parser-form');
  code = code.replace(/me-user-input/g, 'jaffa-user-input');
  
  // Let's also verify vocabularyMatrix, flexibleParse, etc. in Jaffa
  // Wait, flexibleParse and vocabularyMatrix can be kept or renamed.
  // Wait, if they are global variables in games.js, keeping them will conflict because Haifa game also has them!
  // So we MUST rename vocabularyMatrix, flexibleParse, vocabularyMatrix, etc. to jaffa equivalents!
  code = code.replace(/vocabularyMatrix/g, 'jaffaVocabularyMatrix');
  code = code.replace(/flexibleParse/g, 'jaffaFlexibleParse');
  
  fs.writeFileSync('scratch/jaffa_game_clean.js', code);
  console.log('Successfully wrote Jaffa to Gaza clean code to scratch/jaffa_game_clean.js');
} catch (err) {
  console.error(err);
}

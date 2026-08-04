const fs = require('fs');

try {
  // Read standard 1366 lines baseline of games.js
  const baseline = fs.readFileSync('src/games.js', 'utf8');

  // Read our three games
  const simHub = fs.readFileSync('scratch/simulator_hub_game.js', 'utf8');
  const haifaGame = fs.readFileSync('scratch/haifa_game_clean.js', 'utf8');
  const jaffaGame = fs.readFileSync('scratch/jaffa_game_clean.js', 'utf8');

  // Combine them all
  const combined = [
    baseline.trim(),
    simHub.trim(),
    haifaGame.trim(),
    jaffaGame.trim()
  ].join('\n\n') + '\n';

  fs.writeFileSync('src/games.js', combined);
  console.log("Successfully assembled src/games.js!");
} catch (err) {
  console.error("Assembly failed:", err);
}

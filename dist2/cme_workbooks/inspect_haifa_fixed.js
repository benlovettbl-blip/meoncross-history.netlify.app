const fs = require('fs');
const content = fs.readFileSync('scratch/haifa_game_fixed.js', 'utf8');

// Match all keys under rooms: { ... }
const roomsMatch = content.match(/rooms:\s*\{([\s\S]*?)\n\s*\},/);
if (roomsMatch) {
  console.log("Rooms found inside haifa_game_fixed.js:");
  console.log(roomsMatch[1].trim());
} else {
  console.log("No rooms structure found or matched.");
}

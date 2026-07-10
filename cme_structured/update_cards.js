const fs = require('fs');
let content = fs.readFileSync('src/cards_data.js', 'utf8');
let idx = 0;
content = content.replace(/unlockMessage:\s*".*?",/g, () => {
    idx++;
    return `unlockMessage: "Reach ${idx * 200} XP to unlock",`;
});
fs.writeFileSync('src/cards_data.js', content);
console.log('Successfully updated unlock messages.');

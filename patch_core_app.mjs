import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/src/core_app.js';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  '<div id="locked-content" style="opacity: 0.15; pointer-events: none; filter: blur(4px); transition: all 0.8s ease;">',
  '<div id="locked-content">'
);

content = content.replace(
  '<i class="fa-solid fa-lock-open"></i> Vocabulary Unlocked! Proceed to the narrative.',
  '<i class="fa-solid fa-star"></i> Vocabulary Mastered!'
);

content = content.replace("document.getElementById('locked-content').style.opacity = '1';", "");
content = content.replace("document.getElementById('locked-content').style.filter = 'none';", "");
content = content.replace("document.getElementById('locked-content').style.pointerEvents = 'auto';", "");

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully removed narrative lock from core_app.js");

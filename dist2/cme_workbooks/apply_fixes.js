const fs = require('fs');

const filePath = 'src/games.js';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove default text label writing from all hotspots
const hotspotRegex = /[\t ]*\/\/ High-contrast neon tag label\r?\n[\t ]*ctx\.fillStyle = 'rgba\(255, 255, 255, 0\.7\)';\r?\n[\t ]*ctx\.font = '10px monospace';\r?\n[\t ]*ctx\.textAlign = 'center';\r?\n[\t ]*ctx\.fillText\(hs\.name\.toUpperCase\(\), hs\.x, hs\.y \+ 25\);/g;

if (hotspotRegex.test(content)) {
  content = content.replace(hotspotRegex, '');
  console.log("Success: Hotspot labels removed.");
} else {
  console.error("Error: Could not find hotspot target.");
}

// 2. Add backdrop box behind hovered label in drawFrame
const hoverRegex = /[\t ]*ctx\.fillStyle = '#38bdf8';\r?\n[\t ]*ctx\.font = 'bold 12px monospace';\r?\n[\t ]*ctx\.textAlign = 'center';\r?\n[\t ]*ctx\.fillText\(hoveredHotspot\.name\.toUpperCase\(\), hoveredHotspot\.x, hoveredHotspot\.y - hoveredHotspot\.radius - 12\);/g;

const hoverReplacement = `    // Draw a soft black backdrop box behind the hovered label above the circle for legibility
    const labelText = hoveredHotspot.name.toUpperCase();
    ctx.font = 'bold 11px monospace';
    const textWidth = ctx.measureText(labelText).width;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(hoveredHotspot.x - (textWidth / 2) - 4, hoveredHotspot.y - hoveredHotspot.radius - 23, textWidth + 8, 16);
    
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText(labelText, hoveredHotspot.x, hoveredHotspot.y - hoveredHotspot.radius - 11);`;

if (hoverRegex.test(content)) {
  content = content.replace(hoverRegex, hoverReplacement);
  console.log("Success: Hover backdrop added.");
} else {
  console.error("Error: Could not find hover target.");
}

// 3. Bind meVoiceBtn click in initParserGame
const meVoiceRegex = /([\t ]*inputField\.value = "";\r?\n[\t ]*logScroll\.scrollTop = logScroll\.scrollHeight;\r?\n[\t ]*\}\r?\n[\t ]*\}\);\r?\n)([\t ]*)(meParserFormBound = true;)/g;

if (meVoiceRegex.test(content)) {
  content = content.replace(meVoiceRegex, (match, p1, indent, p3) => {
    return p1 + indent + `const meVoiceBtn = document.getElementById('me-voice-btn');
${indent}if (meVoiceBtn) {
${indent}  meVoiceBtn.onclick = (e) => {
${indent}    e.preventDefault();
${indent}    const logScroll = document.getElementById('me-scroll-screen');
${indent}    if (logScroll) {
${indent}      const paras = logScroll.querySelectorAll('p.me-story-text');
${indent}      if (paras.length > 0) {
${indent}        const lastPara = paras[paras.length - 1];
${indent}        AudioEngine.speak(lastPara.innerText, null, null, null, true);
${indent}      }
${indent}    }
${indent}  };
${indent}}
` + indent + p3;
  });
  console.log("Success: Haifa voice button bound.");
} else {
  console.error("Error: Could not find meVoiceTarget.");
}

// 4. Bind jaffaVoiceBtn click in initJaffaParserGame
const jaffaVoiceRegex = /([\t ]*inputField\.value = "";\r?\n[\t ]*logScroll\.scrollTop = logScroll\.scrollHeight;\r?\n[\t ]*\}\r?\n[\t ]*\}\);\r?\n)([\t ]*)(jaffaParserFormBound = true;)/g;

if (jaffaVoiceRegex.test(content)) {
  content = content.replace(jaffaVoiceRegex, (match, p1, indent, p3) => {
    return p1 + indent + `const jaffaVoiceBtn = document.getElementById('jaffa-voice-btn');
${indent}if (jaffaVoiceBtn) {
${indent}  jaffaVoiceBtn.onclick = (e) => {
${indent}    e.preventDefault();
${indent}    const logScroll = document.getElementById('jaffa-scroll-screen');
${indent}    if (logScroll) {
${indent}      const paras = logScroll.querySelectorAll('p.me-story-text');
${indent}      if (paras.length > 0) {
${indent}        const lastPara = paras[paras.length - 1];
${indent}        AudioEngine.speak(lastPara.innerText, null, null, null, true);
${indent}      }
${indent}    }
${indent}  };
${indent}}
` + indent + p3;
  });
  console.log("Success: Jaffa voice button bound.");
} else {
  console.error("Error: Could not find jaffaVoiceTarget.");
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("src/games.js modification completed successfully!");

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../early_modern_world/data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// 1. Replace the clickable tabs in Lesson 8 with a side-by-side flex layout
const oldTabsHTML = `<div style="border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; margin-top: 15px;">    <div style="display: flex; background: #f1f5f9; border-bottom: 1px solid #cbd5e1;">        <button id="histBtn1" onclick="document.getElementById('hist1').style.display='block'; document.getElementById('hist2').style.display='none'; this.style.background='#fff'; this.nextElementSibling.style.background='#f1f5f9';" style="flex: 1; padding: 12px; border: none; background: #fff; cursor: pointer; font-weight: bold; font-size: 1rem; color: #1e40af;">Interpretation A: [Key Individual: Prof. [Key Individual: Prof. Roy Porter]]</button>        <button id="histBtn2" onclick="document.getElementById('hist1').style.display='none'; document.getElementById('hist2').style.display='block'; this.style.background='#fff'; this.previousElementSibling.style.background='#f1f5f9';" style="flex: 1; padding: 12px; border: none; background: #f1f5f9; border-left: 1px solid #cbd5e1; cursor: pointer; font-weight: bold; font-size: 1rem; color: #b45309;">Interpretation B: [Key Individual: Prof. [Key Individual: Prof. J.C.D. Clark]]</button>    </div>    <div id="hist1" style="padding: 25px; display: block; background: #f0f9ff;">        <h4 style="margin-top: 0; color: #1e40af;">Historian Perspective A: [Key Individual: Prof. Roy Porter] (1990)</h4>        <p><em>"By 1750, Britain was already the world’s first modern, secular, consumer society. It possessed a constitutional government, a vibrant free press, unmatched global trade, and an enterprising middle class that valued property, science, and progress."</em></p>    </div>    <div id="hist2" style="padding: 25px; display: none; background: #fff7ed;">        <h4 style="margin-top: 0; color: #b45309;">Historian Perspective B: [Key Individual: Prof. J.C.D. Clark] (1985)</h4>        <p><em>"18th-century Britain was not a 'modern' nation; it was an Ancien Régime—a deeply traditional, aristocratic, and religious society dominated by the Anglican Church, wealthy landowners, and a hereditary monarchy. Most people’s daily lives were governed by ancient custom, local isolated community, and rural poverty."</em></p>    </div></div>`;

const newTableHTML = `<div style="display: flex; gap: 15px; margin-top: 15px;"><div style="flex: 1; padding: 20px; background: #f0f9ff; border: 1px solid #bfdbfe; border-radius: 8px;"><h4 style="margin-top: 0; color: #1e40af;">Interpretation A: [Key Individual: Prof. Roy Porter] (1990)</h4><p><em>"By 1750, Britain was already the world’s first modern, secular, consumer society. It possessed a constitutional government, a vibrant free press, unmatched global trade, and an enterprising middle class that valued property, science, and progress."</em></p></div><div style="flex: 1; padding: 20px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px;"><h4 style="margin-top: 0; color: #b45309;">Interpretation B: [Key Individual: Prof. J.C.D. Clark] (1985)</h4><p><em>"18th-century Britain was not a 'modern' nation; it was an Ancien Régime—a deeply traditional, aristocratic, and religious society dominated by the Anglican Church, wealthy landowners, and a hereditary monarchy. Most people’s daily lives were governed by ancient custom, local isolated community, and rural poverty."</em></p></div></div>`;

content = content.replace(oldTabsHTML, newTableHTML);

// 2. Add the "extended" assessment task to Lesson 8
// We will look for `"banner": "/images/early_mod_l6_banner.jpg"` inside Lesson 8 and prepend the extended task before it.
// Wait, the banner is at the very end of lesson 8.
const extendedTask = `      "extended": {
        "title": "Synoptic Assessment",
        "question": "How 'modern' was Britain by 1750?",
        "hints": [
          "Intro: Define modernity and state your overall argument (it was modern economically, but traditional socially).",
          "Para 1 (Modern): Discuss the Financial Revolution, Bank of England, and global trade (East India Company).",
          "Para 2 (Traditional): Discuss the brutal social realities (The Bloody Code, chattel slavery, Mudlarks).",
          "Conclusion: Summarise your judgment. Was the modernity just an illusion for the rich?"
        ],
        "lines": 35
      },
      "banner": "/images/early_mod_l6_banner.jpg"`;

content = content.replace('"banner": "/images/early_mod_l6_banner.jpg"', extendedTask);

// 3. Remove Lesson 9 completely
// Lesson 9 starts right after the first "banner": "/images/early_mod_l6_banner.jpg" (which we just replaced, wait!).
// We replaced ALL occurrences of "banner"? No, replace() only does the first occurrence. 
// Let's use regex to remove lesson 9.
const lesson9Regex = /,\s*\{\s*"id":\s*"lesson_9"[\s\S]*?(?=\],\s*"portraits":)/;
content = content.replace(lesson9Regex, '');

fs.writeFileSync(dataPath, content, 'utf8');
console.log("Successfully fixed Lesson 8 and removed Lesson 9.");

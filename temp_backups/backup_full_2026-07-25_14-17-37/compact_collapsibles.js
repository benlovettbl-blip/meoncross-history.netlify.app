const fs = require('fs');
const path = 'src/core_app.js';
let code = fs.readFileSync(path, 'utf8');

// We want to compact the Do Now, Timeline, and Key Vocab details blocks
// Specifically, they have this structure:
// <div class="phase-card">
//   <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 15px; overflow: hidden;" closed>
//     <summary style="padding: 15px 20px; cursor: pointer; color: #0f172a; font-weight: bold; font-size: 1.2rem;

// 1. Let's remove the .phase-card wrapper for these details to reduce margin-bottom.
// We'll replace the exact string wrapper
code = code.replace(/<div class="phase-card">\s*<details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 15px; overflow: hidden;" closed>/g, '<details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>');

// Also need to remove the closing </div> for those phase-cards. 
// Timeline:
code = code.replace(/<\/div><\/div><\/details><\/div>/g, '</div></div></details>');
// Do Now:
code = code.replace(/<\/div><\/details><\/div>/g, '</div></details>');
// Key Vocab:
code = code.replace(/<\/div>\s*<\/details>\s*<\/div>/g, '</div>\n          </details>');

// For the summary tags of those elements:
// Timeline and Do Now:
code = code.replace(/<summary style="padding: 15px 20px; cursor: pointer; color: #0f172a; font-weight: bold; font-size: 1.2rem;/g, '<summary style="padding: 10px 15px; cursor: pointer; color: #0f172a; font-weight: bold; font-size: 1.05rem;');

// Key Vocab:
code = code.replace(/<summary style="padding: 15px 20px; cursor: pointer; color: #b45309; font-weight: bold; font-size: 1.2rem;/g, '<summary style="padding: 10px 15px; cursor: pointer; color: #b45309; font-weight: bold; font-size: 1.05rem;');

// Also shrink Think/Pair/Share (which is Phase Card wrapper as well)
code = code.replace(/<div class="phase-card">\s*<details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; overflow: hidden;" closed>/g, '<details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 15px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>');
// TPS summary:
code = code.replace(/<summary style="padding: 15px 20px; cursor: pointer; color: #059669; font-weight: bold; font-size: 1.2rem;/g, '<summary style="padding: 10px 15px; cursor: pointer; color: #059669; font-weight: bold; font-size: 1.05rem;');

// Save changes
fs.writeFileSync(path, code, 'utf8');
console.log('Compacted collapsibles successfully!');

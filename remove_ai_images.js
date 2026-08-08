const fs = require('fs');

async function removeAiImages() {
  // 1. Remove from data.js
  const dataFile = 'early_modern_world/data.js';
  let dataContent = fs.readFileSync(dataFile, 'utf8');
  
  // A regex to match any image property ending in _ai.png
  // e.g. image: "/images/individuals/martin_noell_ai.png",
  // We can just parse the data, modify it, and write it back.
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  let removedCount = 0;
  for (const person of data.key_individuals) {
    if (person.image && person.image.includes('_ai.png')) {
      delete person.image;
      removedCount++;
    }
  }

  if (removedCount > 0) {
    const output = `export const unitData = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(dataFile, output);
    console.log(`Removed ${removedCount} AI images from data.js`);
  }

  // 2. Patch key_individuals.js to ensure the fallback placeholder is used everywhere
  const jsFile = 'src/key_individuals.js';
  let jsContent = fs.readFileSync(jsFile, 'utf8');
  
  // We want to replace the image generation block in generateKeyIndividualCardHTML
  // We will do a generic replacement of the if (person.image || person.image_url) block
  const searchStr = `    let frontImgHtml = '';
    if (person.image || person.image_url) {
      const imgSrc = person.image_url ? person.image_url : (typeof getAssetUrl === 'function' ? getAssetUrl(person.image) : person.image);
      frontImgHtml = \`<div style="width: 100%; height: 280px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden;">
        <img src="\${imgSrc}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/images/placeholder_portrait.jpg'">
      </div>\`;
    }`;
    
  const replaceStr = `    let frontImgHtml = '';
    if (person.image || person.image_url) {
      const imgSrc = person.image_url ? person.image_url : (typeof getAssetUrl === 'function' ? getAssetUrl(person.image) : person.image);
      frontImgHtml = \`<div style="width: 100%; height: 280px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden;">
        <img src="\${imgSrc}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/images/placeholder_portrait.jpg'">
      </div>\`;
    } else {
      frontImgHtml = \`<div style="width: 100%; height: 280px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden; flex-direction: column; color: var(--text-muted);">
        <i class="fa-solid fa-user-slash" style="font-size: 3rem; margin-bottom: 10px; opacity: 0.5;"></i>
        <div style="font-size: 0.9rem; font-style: italic; opacity: 0.7;">No image available</div>
      </div>\`;
    }`;

  if (jsContent.includes(searchStr)) {
    jsContent = jsContent.replace(searchStr, replaceStr);
    fs.writeFileSync(jsFile, jsContent);
    console.log("Patched key_individuals.js");
  } else {
    console.log("Could not find the target string in key_individuals.js");
  }
}

removeAiImages().catch(console.error);

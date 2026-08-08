const fs = require('fs');

async function patchCards() {
  const jsFile = 'src/key_individuals.js';
  let jsContent = fs.readFileSync(jsFile, 'utf8');
  
  // We want to replace the SECOND instance of the block, or rather ALL instances.
  const searchStr = `    let frontImgHtml = '';
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
    
  const replaceStr = `    let frontImgHtml = '';
    if (person.image || person.image_url) {
      const imgSrc = person.image_url ? person.image_url : (typeof getAssetUrl === 'function' ? getAssetUrl(person.image) : person.image);
      frontImgHtml = \`<div style="width: 100%; height: 280px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden;">
        <img src="\${imgSrc}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/images/placeholder_portrait.jpg'">
      </div>\`;
    } else {
      const searchUrl = \`https://www.google.com/search?tbm=isch&q=\${encodeURIComponent(person.name + ' portrait')}\`;
      frontImgHtml = \`<div style="width: 100%; height: 280px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden; flex-direction: column; color: var(--text-muted);">
        <i class="fa-solid fa-image" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.5;"></i>
        <div style="font-size: 0.9rem; font-style: italic; opacity: 0.7; margin-bottom: 15px;">Image hidden (Copyright)</div>
        <a href="\${searchUrl}" target="_blank" onclick="event.stopPropagation();" style="display: inline-block; padding: 6px 12px; background: var(--primary); color: white; text-decoration: none; border-radius: 4px; font-size: 0.85rem; font-weight: bold; transition: opacity 0.2s;">
          <i class="fa-solid fa-external-link-alt" style="margin-right: 5px;"></i> View External
        </a>
      </div>\`;
    }`;

  // Replace all occurrences (just in case there are multiple)
  jsContent = jsContent.split(searchStr).join(replaceStr);
  fs.writeFileSync(jsFile, jsContent);
  console.log("Patched key_individuals.js");
}

patchCards().catch(console.error);

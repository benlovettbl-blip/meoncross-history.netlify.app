const fs = require('fs');

async function removeLinks() {
  const jsFile = 'src/key_individuals.js';
  let jsContent = fs.readFileSync(jsFile, 'utf8');
  
  const searchStr = `      const searchUrl = \`https://www.google.com/search?tbm=isch&q=\${encodeURIComponent(person.name + ' portrait')}\`;
      frontImgHtml = \`<div style="width: 100%; height: 280px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden; flex-direction: column; color: var(--text-muted);">
        <i class="fa-solid fa-image" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.5;"></i>
        <div style="font-size: 0.9rem; font-style: italic; opacity: 0.7; margin-bottom: 15px;">Image hidden (Copyright)</div>
        <a href="\${searchUrl}" target="_blank" onclick="event.stopPropagation();" style="display: inline-block; padding: 6px 12px; background: var(--primary); color: white; text-decoration: none; border-radius: 4px; font-size: 0.85rem; font-weight: bold; transition: opacity 0.2s;">
          <i class="fa-solid fa-external-link-alt" style="margin-right: 5px;"></i> View External
        </a>
      </div>\`;`;
      
  const replaceStr = `      frontImgHtml = \`<div style="width: 100%; height: 280px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden; flex-direction: column; color: var(--text-muted);">
        <i class="fa-solid fa-image" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.5;"></i>
        <div style="font-size: 0.9rem; font-style: italic; opacity: 0.7;">Image hidden (Copyright)</div>
      </div>\`;`;

  if (jsContent.includes(searchStr)) {
    jsContent = jsContent.split(searchStr).join(replaceStr);
    fs.writeFileSync(jsFile, jsContent);
    console.log("Removed external links from key_individuals.js");
  } else {
    console.log("Could not find exact string to replace.");
  }
}

removeLinks().catch(console.error);

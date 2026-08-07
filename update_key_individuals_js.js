const fs = require('fs');

const file = 'src/key_individuals.js';
let data = fs.readFileSync(file, 'utf8');

const regex = /export function generateKeyIndividualCardHTML\(person\) \{[\s\S]+?return `\s*<div class="person-card" \$\{onclickAttr\} style="height: 100%;">[\s\S]+?<\/div>\s*`;\s*\}/;

const newFunc = `export function generateKeyIndividualCardHTML(person) {
  // Fix: Any actions, achievements (array or string), or limitations triggers the flip
  const hasBackData = !!(person.actions || person.achievements || person.limitations);
  
  let frontImgHtml = '';
  if (person.image || person.image_url) {
    const imgSrc = person.image_url ? person.image_url : (typeof getAssetUrl === 'function' ? getAssetUrl(person.image) : person.image);
    frontImgHtml = \`
      <div style="width: 100%; height: 280px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden;">
        <img src="\${imgSrc}" loading="lazy" style="width: 100%; height: 100%; object-fit: contain;" onerror="this.parentElement.style.display='none'">
      </div>
    \`;
  }

  let basicBio = '';
  if (person.bio) {
    basicBio = \`<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;">\${person.bio}</div>\`;
  } else if (person.significance) {
    basicBio = \`<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;"><strong>Significance:</strong> \${person.significance}</div>\`;
  }

  let backHtml = '';
  if (hasBackData) {
    backHtml = \`
      <h3 style="margin: 0 0 15px 0; color: var(--primary); font-family: var(--font-heading); text-align: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 10px;">\${person.name}</h3>
    \`;
    if (person.actions) {
      backHtml += \`
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
          <strong style="color: #3b82f6; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Core Actions</strong>
          <span style="font-size: 0.9rem; color: var(--text-main); display: block;">\${person.actions}</span>
        </div>\`;
    }
    if (person.achievements) {
      const achievementsList = Array.isArray(person.achievements) ? \`<ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 0;"><li>\${person.achievements.join('</li><li>')}</li></ul>\` : person.achievements;
      backHtml += \`
        <div style="background: rgba(34, 197, 94, 0.1); border-left: 3px solid #22c55e; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
          <strong style="color: #22c55e; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Impact / Achievements</strong>
          <span style="font-size: 0.9rem; color: var(--text-main); display: block;">\${achievementsList}</span>
        </div>\`;
    }
    if (person.limitations) {
      backHtml += \`
        <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
          <strong style="color: #ef4444; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Structural Limitations</strong>
          <span style="font-size: 0.9rem; color: var(--text-main); display: block;">\${person.limitations}</span>
        </div>\`;
    }
    
    backHtml += \`<div style="text-align: center; margin-top: auto; padding-top: 15px; font-size: 0.8rem; color: var(--text-muted);"><i class="fas fa-undo"></i> Tap to flip back</div>\`;
  }

  let lifespanHtml = person.lifespan ? \`<p style="font-size: 0.85rem; color: var(--text-muted); margin-top: -10px; margin-bottom: 10px;">\${person.lifespan}</p>\` : '';

  const onclickAttr = hasBackData ? \`onclick="this.classList.toggle('flipped')"\` : '';

  return \`
    <div class="person-card" \${onclickAttr} style="height: 100%;">
      <div class="card-inner">
        <div class="card-front">
          \${frontImgHtml}
          <div style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
            <h3 style="margin: 0 0 5px 0; color: var(--primary); font-family: var(--font-heading);">\${person.name}</h3>
            \${lifespanHtml}
            <p style="margin: 0 0 15px 0; color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">\${person.role || ''}</p>
            \${basicBio}
            \${hasBackData ? \`<div style="text-align: center; margin-top: auto; padding-top: 15px; font-size: 0.85rem; color: #10b981; font-weight: bold;"><i class="fas fa-sync-alt" style="margin-right: 5px;"></i> Tap for Details</div>\` : ''}
          </div>
        </div>
        \${hasBackData ? \`<div class="card-back">\${backHtml}</div>\` : ''}
      </div>
    </div>
  \`;
}`;

data = data.replace(regex, newFunc);
fs.writeFileSync(file, data);
console.log("Updated generateKeyIndividualCardHTML logic.");

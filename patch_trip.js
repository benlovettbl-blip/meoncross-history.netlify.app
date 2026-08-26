const fs = require('fs');

let fileContent = fs.readFileSync('units/trip_ypres/data.js', 'utf8');
const dataStr = fileContent.replace('export const unitData = ', '').trim();
let unitData;
try {
  unitData = eval('(' + (dataStr.endsWith(';') ? dataStr.slice(0, -1) : dataStr) + ')');
} catch (e) {
  console.error('Eval error:', e);
  process.exit(1);
}

const day0 = unitData.lessons.find(l => l.id === 'day_0');
if (day0) {
  const lowryBlock = day0.narrative_blocks.find(b => b.theme_heading && b.theme_heading.includes('Lowry Brothers'));
  
  // Remove Quick Nav, Kit List, and Lowry Brothers from day_0
  day0.narrative_blocks = day0.narrative_blocks.filter(b => {
    if (b.theme_heading && b.theme_heading.includes('Quick Navigation')) return false;
    if (b.theme_heading && b.theme_heading.includes('What to Pack')) return false;
    if (b.text && b.text.includes('toc-menu')) return false;
    if (b.theme_heading && b.theme_heading.includes('Lowry Brothers')) return false;
    return true;
  });

  if (lowryBlock) {
    let imagesHtml = '';
    if (lowryBlock.images) {
      imagesHtml = '<div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:20px;">';
      lowryBlock.images.forEach(img => {
         imagesHtml += `<div style="flex: 1; min-width: 150px; text-align: center;">
            <img src="${img.image}" alt="${img.image_alt || ''}" style="max-width: 100%; border-radius: 8px; border: 1px solid #e2e8f0;" />
            ${img.image_caption ? `<small style="display:block; margin-top:5px; color:#64748b;">${img.image_caption}</small>` : ''}
         </div>`;
      });
      imagesHtml += '</div>';
    }

    const html = `
      <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-top: 30px;">
        <h3 style="margin-top: 0; color: #1e3a8a; font-family: 'Playfair Display', serif; font-size: 1.8rem;">${lowryBlock.theme_heading}</h3>
        <p style="color: #334155; line-height: 1.6; font-size: 1.05rem;">${lowryBlock.text}</p>
        ${imagesHtml}
      </div>
    `;
    unitData.overview_custom_html = html;
  }
}

const newContent = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';';
fs.writeFileSync('units/trip_ypres/data.js', newContent);
console.log('Successfully updated trip_ypres/data.js');

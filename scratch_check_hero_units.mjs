import fs from 'fs';
import path from 'path';
const unitsDir = 'C:/Projects/meoncross-history.netlify.app/public/units';
const excluded = ['post_war_britain', 'cold_war', 'the_shoah', 'crown_parliament_revolution', 'second_world_war', 'trip_ypres'];

const results = [];
for (const unit of fs.readdirSync(unitsDir)) {
  if (excluded.includes(unit)) continue;
  const dataPath = path.join(unitsDir, unit, 'data.js');
  if (fs.existsSync(dataPath)) {
    const content = fs.readFileSync(dataPath, 'utf-8');
    
    // Evaluate data
    let unitData;
    try {
      const sandbox = { window: {} };
      const match = content.match(/export const data\s*=\s*(\{[\s\S]+\});\s*(?:window\.db|export)/);
      if (match) {
        unitData = new Function('return ' + match[1])();
      } else {
        const match2 = content.match(/window\.db\[[^\]]+\]\s*=\s*\{\s*data:\s*(\{[\s\S]+?\})\s*\};/);
        if (match2) unitData = new Function('return ' + match2[1])();
      }
    } catch(e) {
      console.error('Failed to parse', unit, e.message);
    }
    
    if (unitData) {
      const hasCoverSources = !!unitData.cover_sources;
      const isArrayCover = Array.isArray(unitData.cover_image);
      const isSingleCover = typeof unitData.cover_image === 'string';
      const hasHomepageBg = !!unitData.homepage_background;
      
      let status = '';
      if (hasHomepageBg || (isSingleCover && !hasCoverSources)) {
         status = '✅ Ready (Has Hero Banner)';
      } else if (hasCoverSources) {
         status = '⚠️ Uses Cover Sources (Grid)';
      } else if (isArrayCover) {
         status = '⚠️ Uses Multiple Images (Grid)';
      } else {
         status = '❌ Missing Cover Image';
      }
      
      results.push({ 
        unit, 
        title: unitData.title || unit, 
        status 
      });
    }
  }
}

// Generate Markdown Table
let markdown = `| Unit ID | Title | Status |
|---|---|---|\n`;

results.forEach(r => {
    markdown += `| ${r.unit} | ${r.title} | ${r.status} |\n`;
});

fs.writeFileSync('C:/Projects/meoncross-history.netlify.app/scratch_hero_report.md', markdown);
console.log('Report generated at scratch_hero_report.md');

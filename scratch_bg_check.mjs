import fs from 'fs';
import path from 'path';

async function scan() {
    const unitsDir = path.join(process.cwd(), 'public', 'units');
    const units = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());
    
    let rows = [];
    
    const EXCLUDED_UNITS = ['post_war_britain', 'cold_war', 'the_shoah', 'crown_parliament_revolution', 'second_world_war'];
    
    for (const unit of units) {
        if (EXCLUDED_UNITS.includes(unit)) continue;
        
        const dataPath = path.join(unitsDir, unit, 'data.js');
        if (!fs.existsSync(dataPath)) continue;
        let mod = await import('file:///' + dataPath.replace(/\\/g, '/'));
        let data = mod.unitData || mod.default || mod[unit];
        if (!data) continue;
        
        const hasUnitBg = !!(data.homepage_background);
        if (!hasUnitBg) {
            rows.push(`| Unit Overview | [${data.title} (${unit})](http://localhost:3004/unit?id=${unit}) | ❌ Completely Missing |`);
        }
        
        if (data.lessons) {
            data.lessons.forEach((lesson, i) => {
                const hasLessonBg = !!(lesson.banner);
                
                // Only flag if BOTH the lesson and the unit are missing backgrounds
                if (!hasLessonBg && !hasUnitBg) {
                    rows.push(`| Lesson ${i+1} | [${lesson.title.replace(/\|/g, '-')} (${unit})](http://localhost:3004/unit?id=${unit}&lesson=${i}) | ❌ Completely Missing |`);
                }
            });
        }
    }
    
    let content = '# Completely Missing Background Images\n\nThis table shows units and lessons that have **no background image defined at all** (not even a unit-level fallback).\n\n';
    content += '| Type | Title (Unit ID) | Status |\n|---|---|---|\n';
    content += rows.join('\n');
    
    fs.writeFileSync('C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\201db2f0-b6d6-4c48-90ca-b5268608d135\\missing_backgrounds_report.md', content);
}

scan();

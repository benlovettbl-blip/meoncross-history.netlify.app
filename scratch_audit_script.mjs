import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = 'c:/Projects/meoncross-history.netlify.app';
const publicUnits = path.join(rootDir, 'public', 'units');

async function runAudit() {
    let report = "# Comprehensive Curriculum Audit Report\n\n";
    const units = fs.readdirSync(publicUnits).filter(f => fs.statSync(path.join(publicUnits, f)).isDirectory());

    for (const unit of units) {
        const dataPath = path.join(publicUnits, unit, 'data.js');
        if (!fs.existsSync(dataPath)) continue;
        
        let data;
        try {
            // Using a cache-busting query string to ensure fresh load and bypass some loader issues
            const modulePath = `file:///${dataPath.replace(/\\/g, '/')}?t=${Date.now()}`;
            const m = await import(modulePath);
            data = m.unitData || m.default || Object.values(m)[0];
        } catch (e) {
            report += `## Unit: ${unit}\n- ❌ **Error**: Failed to import data.js (${e.message})\n\n`;
            continue;
        }

        if (!data) {
            report += `## Unit: ${unit}\n- ❌ **Error**: Export not found in data.js\n\n`;
            continue;
        }

        report += `## Unit: ${data.id || unit}\n`;
        
        // 1. Structural Glitches (Empty lessons)
        let emptyLessons = [];
        data.lessons?.forEach(l => {
            if (!l.narrative_blocks || l.narrative_blocks.length === 0) emptyLessons.push(l.lesson_number);
            else if (l.narrative_blocks.length === 1 && l.narrative_blocks[0].text && l.narrative_blocks[0].text.includes("Placeholder")) {
                emptyLessons.push(l.lesson_number + " (Placeholder)");
            }
        });
        if (emptyLessons.length > 0) report += `- ⚠️ **Structure**: Empty/Placeholder lessons found: ${emptyLessons.join(', ')}\n`;

        // 2. Visual Sources QA
        let unusedImages = 0;
        let brokenImages = [];
        let allImages = [];
        let allTasksText = [];

        data.lessons?.forEach(l => {
            l.key_individuals?.forEach(k => { if (k.image) allImages.push({src: k.image, context: `Lesson ${l.lesson_number} KI: ${k.name}`}); });
            
            l.narrative_blocks?.forEach(b => {
                if (b.image) allImages.push({src: b.image, context: `Lesson ${l.lesson_number} Block: ${b.title}`});
                if (b.visual_source) allImages.push({src: b.visual_source, context: `Lesson ${l.lesson_number} Block: ${b.title}`});
                
                b.tasks?.forEach(t => {
                    allTasksText.push(JSON.stringify(t).toLowerCase());
                });
            });
            
            l.sources?.forEach(s => {
                if (s.image_url) allImages.push({src: s.image_url, context: `Lesson ${l.lesson_number} Source: ${s.title}`});
            });
        });

        allImages.forEach(img => {
            if (!img.src) return;
            const filename = path.basename(img.src).split('.')[0].toLowerCase().replace(/_/g, ' ');
            let isUsed = false;
            for (const tText of allTasksText) {
                 if (tText.includes("source") || tText.includes("image") || tText.includes("picture") || tText.includes(filename.split(' ')[0])) {
                     isUsed = true;
                 }
            }
            if (!isUsed) unusedImages++;
            
            const imgPath = path.join(rootDir, 'public', img.src.startsWith('/') ? img.src.substring(1) : img.src);
            if (!fs.existsSync(imgPath)) {
                 brokenImages.push(`${img.src} (${img.context})`);
            }
        });

        if (brokenImages.length > 0) {
             report += `- ❌ **Broken Images (404)**:\n`;
             brokenImages.forEach(b => report += `  - ${b}\n`);
        }
        if (unusedImages > 0) {
           report += `- ⚠️ **Visual Source Usage**: ${unusedImages} images might not have explicit tasks tied to them.\n`;
        }

        // 3. Pedagogy (Task variety)
        let taskTypes = {};
        data.lessons?.forEach(l => {
            l.narrative_blocks?.forEach(b => {
                b.tasks?.forEach(t => {
                    const type = t.type || 'undefined';
                    taskTypes[type] = (taskTypes[type] || 0) + 1;
                });
            });
        });
        
        let typeStr = Object.entries(taskTypes).map(([k,v]) => `${k}:${v}`).join(', ');
        report += `- **Task Variety**: ${Object.keys(taskTypes).length} different task types (${typeStr})\n`;
        
        if (!taskTypes['think_pair_share']) {
            report += `- 🔴 **Pedagogy**: No Think-Pair-Share tasks found in this unit!\n`;
        }
        if (!taskTypes['cloze'] && !taskTypes['sorting'] && !taskTypes['matching']) {
            report += `- 🔴 **Pedagogy**: No highly scaffolded tasks (cloze, sorting, matching) found. This may cause issues for SEND pupils.\n`;
        }
        
        report += `\n`;
    }

    // 4. UI/UX and Layout (CSS checks)
    report += `## UI/UX & Layout Audit\n`;
    const cssPath = path.join(rootDir, 'public', 'style.css');
    if (fs.existsSync(cssPath)) {
        const css = fs.readFileSync(cssPath, 'utf8');
        if (css.includes('red') || css.includes('blue') || css.includes('green')) {
            report += `- ⚠️ **Hardcoded Colors**: Found basic hardcoded colors ('red', 'blue') in style.css. Consider using hex/HSL variables.\n`;
        }
        if (!css.includes('@media')) {
            report += `- ❌ **Responsive Design**: No @media queries found in style.css. Mobile layout might be broken.\n`;
        }
    }
    
    fs.writeFileSync(path.join(rootDir, 'audit_observations.md'), report);
    console.log("Audit complete. Written to audit_observations.md");
}

runAudit().catch(console.error);

const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Projects/meoncross-history.netlify.app';
const publicUnits = path.join(rootDir, 'public', 'units');

if (!fs.existsSync(publicUnits)) {
    console.error("public/units directory not found!");
    process.exit(1);
}

const units = fs.readdirSync(publicUnits).filter(f => fs.statSync(path.join(publicUnits, f)).isDirectory());
let report = "# Curriculum Audit Report\n\n";

units.forEach(unit => {
    const dataPath = path.join(publicUnits, unit, 'data.js');
    if (!fs.existsSync(dataPath)) return;
    
    let content = fs.readFileSync(dataPath, 'utf8');
    let data;
    try {
        // Evaluate the data.js file
        const jsonStr = content.replace(/^export const unitData = /, '').replace(/;?\s*$/, '');
        data = JSON.parse(jsonStr);
    } catch (e) {
        report += `## Unit: ${unit}\n**Error**: Failed to parse data.js\n\n`;
        return;
    }

    report += `## Unit: ${data.id || unit}\n`;
    
    // 1. Check Visual Sources
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

    let unusedImages = [];
    allImages.forEach(img => {
        // Simple check: does the image filename or subject appear in any task text?
        const filename = path.basename(img.src).split('.')[0].toLowerCase().replace(/_/g, ' ');
        let isUsed = false;
        
        for (const tText of allTasksText) {
             if (tText.includes("source") || tText.includes("image") || tText.includes("picture") || tText.includes(filename.split(' ')[0])) {
                 // It's a heuristic, but if a task mentions "source" it might be using it.
                 // Actually, a better check: if the task doesn't explicitly mention the source name or 'look at'.
                 isUsed = true;
             }
        }
        
        if (!isUsed) unusedImages.push(img);
        
        // Also check if file exists
        const imgPath = path.join(rootDir, 'public', img.src.startsWith('/') ? img.src.substring(1) : img.src);
        if (!fs.existsSync(imgPath)) {
             report += `- ❌ **Broken Image**: ${img.src} in ${img.context} does not exist on disk.\n`;
        }
    });

    if (unusedImages.length > 0) {
       // Too noisy for some units, just report count
       report += `- ⚠️ **Potential Unused Visual Sources**: ${unusedImages.length} images might not have explicit tasks tied to them.\n`;
    }

    // 2. Check Pedagogy (Task variety)
    let taskTypes = {};
    data.lessons?.forEach(l => {
        l.narrative_blocks?.forEach(b => {
            b.tasks?.forEach(t => {
                taskTypes[t.type] = (taskTypes[t.type] || 0) + 1;
            });
        });
    });
    
    report += `- **Task Variety**: ${Object.keys(taskTypes).length} different task types used. (${Object.entries(taskTypes).map(([k,v]) => `${k}:${v}`).join(', ')})\n`;
    
    if (!taskTypes['think_pair_share']) {
        report += `- 🔴 **Pedagogy**: No Think-Pair-Share tasks found in this unit!\n`;
    }
    
    report += `\n`;
});

fs.writeFileSync(path.join(rootDir, 'scratch_audit_report.md'), report);
console.log("Audit complete. Written to scratch_audit_report.md");

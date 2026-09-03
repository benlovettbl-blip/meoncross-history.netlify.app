const fs = require('fs');
const path = require('path');

const EXCLUDED_DIRS = ['public', 'scripts', 'node_modules', '.git', 'temp_backups', 'edexcel_medicine', 'cme_new', 'eee', 'weimar_nazi_germany'];
const ROOT_DIR = path.join(__dirname, '../');

const dirs = fs.readdirSync(ROOT_DIR).filter(d => {
    const fullPath = path.join(ROOT_DIR, d);
    return fs.statSync(fullPath).isDirectory() && !EXCLUDED_DIRS.includes(d) && !d.startsWith('.');
});

let patchCount = 0;

dirs.forEach(unit => {
    const dataFile = path.join(ROOT_DIR, unit, 'data.js');
    if (fs.existsSync(dataFile)) {
        let content = fs.readFileSync(dataFile, 'utf8');
        let initialContent = content;
        
        // Remove export wrapper to parse JSON
        let jsonStr = content.replace('export const unitData = ', '').trim();
        if (jsonStr.endsWith(';')) {
            jsonStr = jsonStr.slice(0, -1);
        }
        
        try {
            let unitData = JSON.parse(jsonStr);
            let modified = false;
            
            if (unitData.lessons) {
                unitData.lessons.forEach(lesson => {
                    if (lesson.narrative_blocks) {
                        lesson.narrative_blocks.forEach(block => {
                            const hasNoText = !block.text || block.text.trim() === '';
                            const hasTasks = block.tasks && block.tasks.length > 0;
                            const hasMedia = block.image_url || block.video_id || block.youtube_url || block.image;
                            
                            // If the block is empty but has tasks, the UI renders an empty blue box.
                            if (hasNoText && !hasMedia && hasTasks) {
                                // If it has a title, inject it as text so it renders nicely above the tasks
                                if (block.title) {
                                    block.text = `<h3>${block.title}</h3>`;
                                    modified = true;
                                } else {
                                    // If no title, give it a generic review text so it's not empty
                                    block.text = `<h3>Lesson Task</h3>`;
                                    modified = true;
                                }
                            }
                        });
                    }
                });
            }
            
            if (modified) {
                const newContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
                fs.writeFileSync(dataFile, newContent);
                console.log(`✅ Patched empty narrative blocks in ${unit}`);
                patchCount++;
            } else {
                console.log(`- No empty narrative blocks to patch in ${unit}`);
            }
            
        } catch (e) {
            console.error(`❌ Failed to parse data.js for ${unit}: ${e.message}`);
        }
    }
});
console.log(`\nPatch complete. Modified ${patchCount} root unit(s).`);

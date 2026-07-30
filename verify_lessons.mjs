import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function verifyUnit(unitPath) {
    const dataFilePath = path.join(__dirname, unitPath, 'data.js');
    console.log(`\nVerifying ${unitPath}...`);
    
    if (!fs.existsSync(dataFilePath)) {
        console.error(`ERROR: ${dataFilePath} not found.`);
        return;
    }

    let content = fs.readFileSync(dataFilePath, 'utf8');
    let jsonStr = content.replace('export const unitData = ', '').trim();
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);

    let unitData;
    try {
        unitData = eval('(' + jsonStr + ')');
    } catch (e) {
        console.error(`ERROR parsing ${unitPath}/data.js:`, e);
        return;
    }

    let errorCount = 0;
    
    unitData.lessons.forEach(lesson => {
        let missing = [];
        
        if (!lesson.title) missing.push('title');
        
        let hasNarrative = false;
        if (lesson.narrative && lesson.narrative.length > 0) hasNarrative = true;
        if (lesson.narrative_blocks && lesson.narrative_blocks.length > 0) hasNarrative = true;
        if (!hasNarrative) missing.push('narrative/narrative_blocks');
        
        if (!lesson.vocab || lesson.vocab.length === 0) missing.push('vocab');
        if (!lesson.do_now) missing.push('do_now');
        
        if (missing.length > 0) {
            console.error(`  [X] Lesson ${lesson.id || 'Unknown'} is missing: ${missing.join(', ')}`);
            errorCount++;
        }
    });

    if (errorCount === 0) {
        console.log(`  [OK] All ${unitData.lessons.length} lessons in ${unitPath} passed basic validation.`);
    } else {
        console.log(`  [WARNING] Found issues in ${errorCount} lessons in ${unitPath}.`);
    }
}

verifyUnit('weimar_nazi_germany');
verifyUnit('eee');

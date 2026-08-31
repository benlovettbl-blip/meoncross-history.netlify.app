const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, 'public', 'units');
const units = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());

const ks3Units = units.filter(u => !['edexcel_medicine', 'eee', 'weimar_nazi_germany', 'cme_new', 'trip_ypres', 'dist2', 'v2-app'].includes(u));

function simulateTextbookSequence(unitId, lesson) {
    let sequence = [];
    
    // 1. Pair Share (NOW UNIVERSAL)
    if (lesson.pair_share) {
        sequence.push('pair_share');
    }
    
    // 2. Tasks
    if (lesson.tasks) {
        lesson.tasks.forEach((t, idx) => {
            sequence.push(`task_${idx}`);
        });
    }
    
    // 3. Extended / Writing Practice
    if (lesson.extended && lesson.extended.question) {
        sequence.push('extended_writing');
    }
    
    // 4. Historian's Corner
    if (lesson.historians_corner && lesson.historians_corner.stretch_question) {
        sequence.push('historians_corner');
    }
    
    // 5. GCSE Task / Assessment
    if (lesson.gcse_task) {
        if (lesson.gcse_task.tasks) {
            lesson.gcse_task.tasks.forEach((t, idx) => sequence.push(`gcse_task_${idx}`));
        } else if (lesson.gcse_task.sources) {
            sequence.push('gcse_task_sources');
        } else if (lesson.gcse_task.topic) {
            sequence.push('gcse_task_topic');
        }
    }
    
    return sequence;
}

function simulateWorkbookSequence(unitId, lesson) {
    let sequence = [];
    
    // 1. Tasks
    if (lesson.tasks) {
        lesson.tasks.forEach((t, idx) => {
            sequence.push(`task_${idx}`);
        });
    }
    
    // 2. Pair Share
    if (lesson.pair_share) {
        sequence.push('pair_share');
    }
    
    // 3. Extended / Writing Practice
    if (lesson.extended && lesson.extended.question) {
        sequence.push('extended_writing');
    }
    
    // 4. Historian's Corner
    if (lesson.historians_corner && lesson.historians_corner.stretch_question && !lesson.historians_corner.textbook_only) {
        sequence.push('historians_corner');
    }
    
    // 5. GCSE Task
    if (lesson.gcse_task) {
        if (lesson.gcse_task.tasks) {
            lesson.gcse_task.tasks.forEach((t, idx) => sequence.push(`gcse_task_${idx}`));
        } else if (lesson.gcse_task.sources) {
            sequence.push('gcse_task_sources');
        } else if (lesson.gcse_task.topic) {
            sequence.push('gcse_task_topic');
        }
    }
    
    return sequence;
}

console.log("==================================================");
console.log("🔍 AUDIT REPORT: Curriculum Sequence & Q-Numbering");
console.log("==================================================");

let mismatchesFound = 0;

ks3Units.forEach(unitId => {
    const dataPath = path.join(unitsDir, unitId, 'data.js');
    if (!fs.existsSync(dataPath)) return;
    
    let unitDataModule;
    try {
        unitDataModule = require(dataPath);
    } catch (e) {
        return;
    }
    const unitData = unitDataModule.unitData || unitDataModule.default || unitDataModule.data || unitDataModule;
    if (!unitData || !unitData.lessons) return;
    
    let hasMismatchesInUnit = false;
    
    unitData.lessons.forEach((lesson, i) => {
        let tbSeq = simulateTextbookSequence(unitId, lesson);
        let wbSeq = simulateWorkbookSequence(unitId, lesson);
        
        let filterKeys = ['pair_share', 'historians_corner', 'extended_writing'];
        let tbFiltered = tbSeq.filter(k => filterKeys.includes(k) || k.startsWith('task_'));
        let wbFiltered = wbSeq.filter(k => filterKeys.includes(k) || k.startsWith('task_'));
        
        let tbStr = tbFiltered.join(' -> ');
        let wbStr = wbFiltered.join(' -> ');
        
        if (tbStr !== wbStr) {
            if (!hasMismatchesInUnit) {
                console.log(`\n\n🚨 UNIT: ${unitData.title || unitId}`);
                hasMismatchesInUnit = true;
            }
            console.log(`\n  Lesson ${i + 1}: ${lesson.title}`);
            console.log(`  ❌ MISMATCH DETECTED`);
            console.log(`     Textbook Render Order : ${tbStr}`);
            console.log(`     Workbook Render Order : ${wbStr}`);
            mismatchesFound++;
        }
    });
});

console.log("\n==================================================");
if (mismatchesFound === 0) {
    console.log("✅ All textbook and workbook sequences match perfectly.");
} else {
    console.log(`❌ Found ${mismatchesFound} lessons with rendering sequence mismatches.`);
}
console.log("==================================================\n");

const fs = require('fs');
const data = JSON.parse(fs.readFileSync('c:/Projects/meoncross-history.netlify.app/public/database.json', 'utf8'));

const med = data.edexcel_medicine || {};
const cme = data.cme_new || {};

function dumpLessonStructure(unitName, unitObj) {
    if (!unitObj.data || !unitObj.data[0]) return;
    const lesson = unitObj.data[0];
    console.log(`\n=== ${unitName} FIRST LESSON SCHEMA ===`);
    console.log(Object.keys(lesson));
    if (lesson.teacher_notes) console.log("Has teacher_notes");
    if (lesson.do_now) {
        console.log("Has do_now of type:", lesson.do_now.type);
        console.log("do_now keys:", Object.keys(lesson.do_now));
    }
    if (lesson.narrative_blocks) console.log("Has narrative_blocks, length:", lesson.narrative_blocks.length);
    if (lesson.sections) console.log("Has sections, length:", lesson.sections.length);
    if (lesson.exam_practice) console.log("Has exam_practice, length:", lesson.exam_practice.length);
    if (lesson.ai_revision_pack) console.log("Has ai_revision_pack");
}

dumpLessonStructure("Medicine", med);
dumpLessonStructure("Middle East", cme);

console.log("\n=== COMPARING METADATA ===");
console.log("Medicine root keys:", Object.keys(med));
console.log("Middle East root keys:", Object.keys(cme));

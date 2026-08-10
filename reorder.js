const fs = require('fs');

let content = fs.readFileSync('src/core_app.js', 'utf8');

// Find the start of the sections
const sourcesIdx1 = content.indexOf('if (lesson.sources && lesson.sources.length > 0) {');
const primarySourceIdx = content.indexOf('if (lesson.primary_source) {');
const doNowIdx = content.indexOf('if (lesson.do_now && lesson.do_now.type === \'timeline\' && lesson.do_now.events) {');
const narrativeIdx = content.indexOf('if (lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {');
const sourcesIdx2 = content.indexOf('if (lesson.sources && lesson.sources.length > 0) {', narrativeIdx);
const tasksTopIdx = content.indexOf('if (lesson.tasks) {', sourcesIdx2);
const tasksIdx = content.indexOf('if (lesson.tasks && lesson.tasks.length > 0) {', tasksTopIdx);
const historianIdx = content.indexOf('if (lesson.historians_corner) {', tasksIdx);
const pairShareIdx = content.indexOf('if (lesson.pair_share) {', historianIdx);
const gcseIdx = content.indexOf('if (lesson.gcse_task || (lesson.extended && lesson.extended.question) || extractedExamTasks.length > 0) {');

if ([sourcesIdx1, primarySourceIdx, doNowIdx, narrativeIdx, sourcesIdx2, tasksTopIdx, tasksIdx, historianIdx, pairShareIdx, gcseIdx].includes(-1)) {
    console.error("Could not find all indices");
    process.exit(1);
}

// Extract chunks
const chunkSources1 = content.substring(sourcesIdx1, primarySourceIdx);
const chunkPrimarySource = content.substring(primarySourceIdx, doNowIdx);
const chunkDoNow = content.substring(doNowIdx, narrativeIdx);
const chunkNarrative = content.substring(narrativeIdx, sourcesIdx2);
const chunkSources2 = content.substring(sourcesIdx2, tasksTopIdx); // We will discard this duplicate
const chunkTasksTop = content.substring(tasksTopIdx, tasksIdx); // if (lesson.tasks) { extrasHtml ... }
const chunkTasks = content.substring(tasksIdx, historianIdx);
const chunkHistorian = content.substring(historianIdx, pairShareIdx);
const chunkPairShare = content.substring(pairShareIdx, gcseIdx);

// The part before sourcesIdx1 (Teacher Notes)
const chunkBefore = content.substring(0, sourcesIdx1);
// The part after gcseIdx (GCSE Task and rest)
const chunkAfter = content.substring(gcseIdx);

// Convert each chunk to append to its own string instead of html
function convertToBuilder(chunk, varName) {
    let newChunk = `let ${varName} = '';\n` + chunk;
    newChunk = newChunk.replace(/html \+=/g, `${varName} +=`);
    return newChunk;
}

const bSources1 = convertToBuilder(chunkSources1, 'htmlSources1');
const bPrimary = convertToBuilder(chunkPrimarySource, 'htmlPrimary');
const bDoNow = convertToBuilder(chunkDoNow, 'htmlDoNow');
const bNarrative = convertToBuilder(chunkNarrative, 'htmlNarrative');
const bTasks = convertToBuilder(`let hasModels = false;\n` + chunkTasksTop + chunkTasks, 'htmlTasks');
const bHistorian = convertToBuilder(chunkHistorian, 'htmlHistorian');
const bPairShare = convertToBuilder(chunkPairShare, 'htmlPairShare');

let assembly = `
      let myUnitData = window.currentUnitData || {};
      const unitId = myUnitData.id || new URLSearchParams(window.location.search).get('id');
      const isEarlyModern = (unitId === 'early_modern_world');

      if (isEarlyModern) {
          html += htmlDoNow + htmlPrimary + htmlSources1 + htmlNarrative + htmlPairShare + htmlHistorian + htmlTasks;
      } else {
          html += htmlSources1 + htmlPrimary + htmlDoNow + htmlNarrative + htmlTasks + htmlHistorian + htmlPairShare;
      }
`;

const newContent = chunkBefore + 
    bSources1 + 
    bPrimary + 
    bDoNow + 
    bNarrative + 
    bTasks + 
    bHistorian + 
    bPairShare + 
    assembly + 
    chunkAfter;

fs.writeFileSync('src/core_app_new.js', newContent);
console.log("Wrote src/core_app_new.js");

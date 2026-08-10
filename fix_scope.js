const fs = require('fs');

let content = fs.readFileSync('original_core_app.js', 'utf8');

const sourcesIdx1 = content.indexOf('if (lesson.sources && lesson.sources.length > 0) {');
const gcseIdx = content.indexOf('if (lesson.gcse_task || (lesson.extended && lesson.extended.question) || extractedExamTasks.length > 0) {');

const chunkBefore = content.substring(0, sourcesIdx1);
const middle = content.substring(sourcesIdx1, gcseIdx);
const chunkAfter = content.substring(gcseIdx);

// The middle contains the outer block: `if ((lesson.tasks && lesson.tasks.length > 0) || lesson.historians_corner) {`
// Let's just remove that outer block completely because we are splitting the inner components!
// We can use a simpler approach: extract everything manually.
// Actually, it's easier to just take `src/core_app.js` and move the variable declarations up.

let fixedContent = fs.readFileSync('src/core_app.js', 'utf8');

// Declare them at the top of the function
fixedContent = fixedContent.replace(
  'function renderLesson(lesson) {\n        window.postRenderHooks = [];',
  'function renderLesson(lesson) {\n        window.postRenderHooks = [];\n        let htmlDoNow="", htmlPrimary="", htmlSources1="", htmlNarrative="", htmlPairShare="", htmlHistorian="", htmlTasks="";'
);

// Remove the `let htmlDoNow = '';` etc. so we don't shadow them
fixedContent = fixedContent.replace(/let htmlDoNow = '';/g, '');
fixedContent = fixedContent.replace(/let htmlPrimary = '';/g, '');
fixedContent = fixedContent.replace(/let htmlSources1 = '';/g, '');
fixedContent = fixedContent.replace(/let htmlNarrative = '';/g, '');
fixedContent = fixedContent.replace(/let htmlTasks = '';/g, '');
fixedContent = fixedContent.replace(/let htmlHistorian = '';/g, '');
fixedContent = fixedContent.replace(/let htmlPairShare = '';/g, '');

fs.writeFileSync('src/core_app_fixed.js', fixedContent);

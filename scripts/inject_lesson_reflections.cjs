/**
 * inject_lesson_reflections.cjs
 * 
 * Injects a `lesson_reflection` property into the FINAL lesson of every
 * unit's data.js. This creates the digital trigger in the web app that
 * prompts pupils to turn to the DIRT page in their printed workbook.
 * 
 * Safe: only modifies units that do NOT already have a lesson_reflection
 * on their final lesson. Skips trip_ypres (digital-only).
 */
const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, '..', 'units');
const SKIP = ['trip_ypres'];

const unitDirs = fs.readdirSync(unitsDir).filter(d => {
  const full = path.join(unitsDir, d);
  return fs.statSync(full).isDirectory() && !SKIP.includes(d) && fs.existsSync(path.join(full, 'data.js'));
});

let modified = 0;
let skipped = 0;

unitDirs.forEach(uid => {
  const dataPath = path.join(unitsDir, uid, 'data.js');
  let content = fs.readFileSync(dataPath, 'utf8');

  // Check if lesson_reflection already exists anywhere in the file
  if (content.includes('lesson_reflection')) {
    console.log(`⏭️  ${uid}: already has lesson_reflection, skipping`);
    skipped++;
    return;
  }

  // Strategy: find the LAST lesson object's closing area.
  // We inject `lesson_reflection: { ... }` as a new property on the final lesson.
  // 
  // We look for the pattern of the last `pair_share` or `quiz` or `extended` block
  // at the end of the lessons array. But since data.js files vary wildly,
  // the safest approach is to find the last lesson's closing and inject before it.
  //
  // Actually, the simplest reliable approach: use the database.json to find the
  // last lesson ID, then inject into data.js by finding that lesson's object.

  // Find the last lesson ID from the compiled database
  const dbPath = path.join(__dirname, '..', 'public', 'database.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  if (!db[uid] || !db[uid].data || !db[uid].data.lessons || db[uid].data.lessons.length === 0) {
    console.log(`⏭️  ${uid}: no lessons found in database, skipping`);
    skipped++;
    return;
  }

  const lessons = db[uid].data.lessons;
  const lastLesson = lessons[lessons.length - 1];
  const lastTitle = lastLesson.title;

  // Find the title string in data.js to locate this lesson
  const titleIdx = content.lastIndexOf(`title: '${lastTitle}'`) !== -1
    ? content.lastIndexOf(`title: '${lastTitle}'`)
    : content.lastIndexOf(`title: "${lastTitle}"`);

  if (titleIdx === -1) {
    // Try partial match
    const shortTitle = lastTitle.substring(0, 30);
    const partialIdx = content.lastIndexOf(shortTitle);
    if (partialIdx === -1) {
      console.log(`⚠️  ${uid}: could not locate last lesson "${lastTitle}" in data.js`);
      skipped++;
      return;
    }
  }

  // The reflection object to inject
  const reflectionObj = `
  lesson_reflection: {
    prompt: "You have reached the end of this unit! Before you finish, please turn to the back page of your printed workbook and complete the End of Unit Reflection & Pupil Voice page.",
    instructions: [
      "Complete the WWW (What Went Well) section — what did you enjoy or find easiest?",
      "Complete the EBI (Even Better If) section — what did you find most challenging?",
      "Circle your effort level (1-5) and set a specific target for the next unit."
    ]
  },`;

  // Find a safe injection point: look for the pair_share or quiz property
  // of the last lesson, or just before the closing of the lessons array.
  // 
  // Best strategy: find the title, then find the next occurrence of a 
  // closing pattern that indicates end of that lesson object.
  
  // Instead, let's use a simpler approach: inject it right after the title line
  // of the last lesson.
  const titleLine = content.lastIndexOf(`title:`) > titleIdx - 200 
    ? titleIdx 
    : content.lastIndexOf(`title:`);
  
  // Find the end of the title line
  const titleLineEnd = content.indexOf('\n', titleIdx);
  
  if (titleLineEnd === -1) {
    console.log(`⚠️  ${uid}: could not find title line end`);
    skipped++;
    return;
  }

  // Insert the reflection property right after the title line
  content = content.slice(0, titleLineEnd + 1) + reflectionObj + content.slice(titleLineEnd + 1);

  fs.writeFileSync(dataPath, content);
  console.log(`✅ ${uid}: injected lesson_reflection into "${lastTitle}"`);
  modified++;
});

console.log(`\nDone! Modified: ${modified}, Skipped: ${skipped}`);

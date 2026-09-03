/**
 * inject_kt_reflections.cjs
 * 
 * Injects `lesson_reflection` into the LAST lesson of each Key Topic (KT)
 * for GCSE units that generate separate KT workbooks.
 * Safe: skips lessons that already have lesson_reflection.
 */
const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, '..', 'units');
const dbPath = path.join(__dirname, '..', 'public', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// GCSE units with separate KT workbooks
const GCSE_UNITS = ['weimar_nazi_germany', 'edexcel_medicine', 'cme_new', 'eee'];

const reflectionBlock = `
  lesson_reflection: {
    prompt: "You have reached the end of this Key Topic booklet! Before you finish, please turn to the back page of your printed workbook and complete the End of Unit Reflection & Pupil Voice page.",
    instructions: [
      "Complete the WWW (What Went Well) section — what did you enjoy or find easiest?",
      "Complete the EBI (Even Better If) section — what did you find most challenging?",
      "Circle your effort level (1-5) and set a specific target for the next Key Topic."
    ]
  },`;

let totalModified = 0;

GCSE_UNITS.forEach(uid => {
  const dataPath = path.join(unitsDir, uid, 'data.js');
  if (!fs.existsSync(dataPath)) {
    console.log(`⏭️  ${uid}: data.js not found`);
    return;
  }

  let content = fs.readFileSync(dataPath, 'utf8');
  const lessons = db[uid]?.data?.lessons || [];
  
  // Group lessons by KT
  const kts = {};
  lessons.forEach((l, idx) => {
    const ktMatch = (l.id || '').match(/lesson_(\d+)_/) || (l.title || '').match(/KT(\d+)/i);
    const kt = ktMatch ? ktMatch[1] : '0';
    if (!kts[kt]) kts[kt] = [];
    kts[kt].push({ idx, id: l.id, title: l.title });
  });

  let unitModified = 0;

  Object.keys(kts).sort().forEach(kt => {
    const group = kts[kt];
    const lastLesson = group[group.length - 1];
    const title = lastLesson.title;

    // Check if this specific lesson already has lesson_reflection
    // We need to find the title in data.js and check the surrounding context
    const titleEscaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Find all occurrences of this title
    let searchStr = title;
    let titleIdx = content.indexOf(searchStr);
    
    if (titleIdx === -1) {
      // Try with single quotes
      searchStr = title.replace(/"/g, "'");
      titleIdx = content.indexOf(searchStr);
    }
    
    if (titleIdx === -1) {
      console.log(`  ⚠️  KT${kt}: could not find "${title.substring(0, 50)}..." in data.js`);
      return;
    }

    // Check if lesson_reflection already exists near this title (within ~2000 chars)
    const contextAfter = content.substring(titleIdx, titleIdx + 2000);
    if (contextAfter.includes('lesson_reflection')) {
      console.log(`  ⏭️  KT${kt}: already has reflection (${title.substring(0, 45)}...)`);
      return;
    }

    // Find end of the title line
    const titleLineEnd = content.indexOf('\n', titleIdx);
    if (titleLineEnd === -1) {
      console.log(`  ⚠️  KT${kt}: could not find title line end`);
      return;
    }

    // Inject after the title line
    content = content.slice(0, titleLineEnd + 1) + reflectionBlock + content.slice(titleLineEnd + 1);
    console.log(`  ✅ KT${kt}: injected into "${title.substring(0, 55)}..."`);
    unitModified++;
    totalModified++;
  });

  if (unitModified > 0) {
    fs.writeFileSync(dataPath, content);
    console.log(`  💾 ${uid}: saved (${unitModified} KTs modified)\n`);
  } else {
    console.log(`  ⏭️  ${uid}: no changes needed\n`);
  }
});

console.log(`\nDone! Total KT lessons modified: ${totalModified}`);

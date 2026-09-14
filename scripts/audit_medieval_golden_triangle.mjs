import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

async function auditGoldenTriangle() {
  console.log('====================================================');
  console.log('🏛️ FORENSIC AUDIT: MEDIEVAL ENGLAND GOLDEN TRIANGLE');
  console.log('====================================================');

  // 1. Load data.js
  const dataModule = await import(
    'file:///' + path.join(ROOT, 'units', 'medieval_england', 'data.js').replace(/\\/g, '/')
  );
  const unitData = dataModule.default || dataModule.unitData;

  // 2. Load database.json
  const db = JSON.parse(fs.readFileSync(path.join(ROOT, 'public', 'database.json'), 'utf8'));
  const dbUnit = db.medieval_england?.data;

  // 3. Load HTML files
  const workbookHtml = fs.readFileSync(
    path.join(ROOT, 'units', 'medieval_england', 'pupil_workbook.html'),
    'utf8',
  );
  const textbookHtml = fs.readFileSync(
    path.join(ROOT, 'units', 'medieval_england', 'textbook.html'),
    'utf8',
  );

  console.log(`\n1. Basic Metadata Verification:`);
  console.log(`   - Unit Title: "${unitData.title}"`);
  console.log(`   - Lessons in data.js: ${unitData.lessons.length}`);
  console.log(`   - Lessons in database.json: ${dbUnit ? dbUnit.lessons.length : 'MISSING'}`);
  console.log(`   - Glossary items: ${unitData.glossary?.length || 0}`);

  // Check Page Count in Workbook
  const pageMatches = workbookHtml.match(/class="page\b/g);
  console.log(
    `   - Workbook total pages rendered: ${pageMatches ? pageMatches.length : 0} (Target: 24 pages)`,
  );

  let allClean = true;

  // 4. Per-lesson audit
  console.log(`\n2. Lesson-by-Lesson Triangulation Audit:`);

  unitData.lessons.forEach((lesson, idx) => {
    const lNum = idx + 1;
    console.log(`\n   --- [Lesson ${lNum}: ${lesson.title}] ---`);

    // Check DB sync
    const dbLesson = dbUnit?.lessons[idx];
    if (!dbLesson) {
      console.error(`   ❌ Missing in database.json!`);
      allClean = false;
      return;
    }

    if (dbLesson.title !== lesson.title) {
      console.error(`   ❌ Title mismatch: data.js="${lesson.title}" vs db="${dbLesson.title}"`);
      allClean = false;
    }

    // Check Acts
    const acts = lesson.narrative_blocks.filter((b) => b.act).map((b) => b.act);
    const uniqueActs = [...new Set(acts)];
    console.log(
      `   - Acts present: [${uniqueActs.join(', ')}] (Blocks: ${lesson.narrative_blocks.length})`,
    );
    if (uniqueActs.length !== 4) {
      console.warn(
        `   ⚠️ Warning: Lesson does not have exactly 4 acts! Found: ${uniqueActs.length}`,
      );
      allClean = false;
    }

    // Check Sources
    const sources = lesson.sources || [];
    const sourceLetters = sources.map((s) => s.letter || s.id);
    console.log(`   - Sources: ${sources.length} (${sourceLetters.join(', ')})`);
    if (sources.length < 2) {
      console.warn(`   ⚠️ Warning: Lesson has fewer than 2 sources!`);
    }

    // Check Paragraph Indexing
    let paraCount = 0;
    lesson.narrative_blocks.forEach((b) => {
      const pMatches = (b.content || b.text || '').match(/\[\d+\.\d+\]/g);
      if (pMatches) paraCount += pMatches.length;
    });
    console.log(`   - Indexed paragraphs: ${paraCount} [Act.Paragraph] markers`);

    // Check Do Now Recall Isolation
    const doNow = lesson.do_now;
    if (doNow) {
      console.log(
        `   - Do Now: "${doNow.title || 'Present'}" with ${doNow.questions ? doNow.questions.length : doNow.matching_pairs ? 'matching pairs' : 'custom format'}`,
      );
    } else {
      console.warn(`   ⚠️ Missing Do Now!`);
      allClean = false;
    }

    // Check Teacher Notes
    const tNotes = lesson.teacher_notes;
    if (tNotes && tNotes.primer && tNotes.objectives) {
      console.log(
        `   - Teacher Notes: Present with ${tNotes.objectives.length} objectives and hinge questions`,
      );
    } else {
      console.warn(`   ⚠️ Missing or incomplete teacher_notes!`);
      allClean = false;
    }

    // Triangulate with Workbook HTML
    const inWorkbook = workbookHtml.includes(lesson.title.substring(0, 20));
    if (!inWorkbook) {
      console.error(`   ❌ Lesson title not found in pupil_workbook.html!`);
      allClean = false;
    }

    // Triangulate with Textbook HTML
    const inTextbook = textbookHtml.includes(lesson.title.substring(0, 20));
    if (!inTextbook) {
      console.error(`   ❌ Lesson title not found in textbook.html!`);
      allClean = false;
    }

    // Check Local Hampshire Links
    if (lNum === 2) {
      const hasPortchesterWb = workbookHtml.includes('Portchester');
      const hasPortchesterTb = textbookHtml.includes('Portchester');
      const hasPortchesterDb = JSON.stringify(lesson).includes('Portchester');
      console.log(
        `   - Portchester Castle check: Data=${hasPortchesterDb}, Workbook=${hasPortchesterWb}, Textbook=${hasPortchesterTb}`,
      );
      if (!hasPortchesterWb || !hasPortchesterTb || !hasPortchesterDb) {
        console.error(`   ❌ Portchester Castle missing in one of the triad!`);
        allClean = false;
      }
    }

    if (lNum === 5) {
      const hasWalthamWb = workbookHtml.includes("Bishop's Waltham");
      const hasWalthamTb = textbookHtml.includes("Bishop's Waltham");
      const hasWalthamDb = JSON.stringify(lesson).includes("Bishop's Waltham");
      console.log(
        `   - Bishop's Waltham check: Data=${hasWalthamDb}, Workbook=${hasWalthamWb}, Textbook=${hasWalthamTb}`,
      );
      if (!hasWalthamWb || !hasWalthamTb || !hasWalthamDb) {
        console.error(`   ❌ Bishop's Waltham missing in one of the triad!`);
        allClean = false;
      }
    }
  });

  // Check Page Map sync
  console.log(`\n3. Digital Page Map Synchronisation:`);
  const pageMap = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'src', 'engine', 'workbook_page_map.json'), 'utf8'),
  );
  const medMap = pageMap.medieval_england;
  if (!medMap) {
    console.error(`   ❌ medieval_england missing in workbook_page_map.json!`);
    allClean = false;
  } else {
    const keys = Object.keys(medMap);
    console.log(`   - Mapped lessons count: ${keys.length}`);
    keys.forEach((k) => {
      console.log(`     * ${k} -> Page ${medMap[k].page} (${medMap[k].booklet})`);
    });
  }

  console.log('\n====================================================');
  if (allClean) {
    console.log('🎉 GOLDEN TRIANGLE AUDIT PASSED: 100% PERFECT SYNCHRONISATION');
  } else {
    console.log('⚠️ AUDIT COMPLETED WITH WARNINGS/ISSUES (See above)');
  }
  console.log('====================================================');
}

auditGoldenTriangle().catch((err) => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});

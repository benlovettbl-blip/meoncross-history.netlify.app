import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

const dataJsPath = path.join(ROOT_DIR, 'units', 'early_modern_world', 'data.js');
const scratchDir =
  'C:/Users/fives/.gemini/antigravity-ide/brain/7b4ccfb2-c23a-4f8d-af94-144c2d220771/scratch';

async function applyMasterLessons() {
  console.log('Loading early_modern_world data.js...');
  const mod = await import('file:///' + dataJsPath.replace(/\\/g, '/'));
  const unitData = mod.unitData;

  console.log(`Original unitData has ${unitData.lessons.length} lessons.`);

  for (let i = 0; i < 9; i++) {
    const lessonFile = path.join(scratchDir, `lesson${i + 1}.json`);
    if (!fs.existsSync(lessonFile)) {
      throw new Error(`Missing ${lessonFile}`);
    }

    const lData = JSON.parse(fs.readFileSync(lessonFile, 'utf8'));
    const lesson = unitData.lessons[i];

    console.log(`Applying Master Architecture to Lesson ${i + 1}: ${lesson.title}`);

    // Update core pedagogical blocks
    lesson.teacher_notes = lData.teacher_notes;
    lesson.do_now = lData.do_now;
    lesson.narrative_blocks = lData.narrative_blocks;
    lesson.sources = lData.sources;

    // Clean up obsolete legacy properties
    delete lesson.lesson_assessment;
    delete lesson.formative_assessment;
    delete lesson.extended;
  }

  const outputCode = `export const unitData = ${JSON.stringify(unitData, null, 2)};\nexport default unitData;\n`;
  fs.writeFileSync(dataJsPath, outputCode, 'utf8');
  console.log(`\n✅ Successfully updated ${dataJsPath}!`);
}

applyMasterLessons().catch((err) => {
  console.error('❌ Error applying master lessons:', err);
  process.exit(1);
});

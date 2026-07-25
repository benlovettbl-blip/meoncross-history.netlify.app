import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '../database.json');
const PUBLIC_ASSETS_DIR = path.join(__dirname, '../public/assets');

if (!fs.existsSync(DB_PATH)) {
  console.error('database.json not found! Please run `npm run sync` first.');
  process.exit(1);
}

const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
let errors = 0;

console.log('--- Starting Content Validation ---\n');

async function validateUnits() {
  for (const unitId of Object.keys(db)) {
    console.log(`Checking unit: ${unitId}...`);
    const dataPath = path.join(__dirname, '..', unitId, 'data.js');
    if (!fs.existsSync(dataPath)) {
      console.error(`  ERROR: Could not find data.js for unit ${unitId}`);
      errors++;
      continue;
    }

    try {
      if (unitId === 'temp_water_backup' || unitId.includes('backup') || unitId === 'eee') continue;
      
      // dynamically import the file
      const module = await import(`file://${dataPath}`);
      const unitData = module.unitData || module.gwData;

      if (!unitData || !unitData.lessons) {
        console.error(`  ERROR: unitData.lessons is missing or invalid in ${unitId}`);
        errors++;
        continue;
      }

      unitData.lessons.forEach((lesson, i) => {
        const lessonIdentifier = `[Unit: ${unitId} | Lesson ${i + 1}: ${lesson.title || 'Untitled'}]`;

        if (!lesson.title) {
          console.error(`  ERROR: Missing title in ${lessonIdentifier}`);
          errors++;
        }

        const hasBlocks = lesson.narrative_blocks && lesson.narrative_blocks.length > 0;
        const hasLegacy = lesson.narrative && lesson.narrative.length > 0;

        if (!hasBlocks && !hasLegacy) {
          console.error(`  ERROR: Missing or empty narrative in ${lessonIdentifier}`);
          errors++;
        } else if (hasBlocks) {
          lesson.narrative_blocks.forEach((block, bIdx) => {
            if (block.type) {
               // Non-text blocks like interactive_map or visual_source are fine to not have text
               return;
            }
            if (typeof block.text !== 'undefined' && block.text.trim() === '') {
              // Ignore perfectly empty strings if they are meant to be blank, 
              // but we flag them if they are just whitespace or fully empty
              console.error(`  ERROR: Empty narrative text at block ${bIdx + 1} in ${lessonIdentifier}`);
              errors++;
            } else if (!block.text) {
              console.error(`  ERROR: Missing narrative text at block ${bIdx + 1} in ${lessonIdentifier}`);
              errors++;
            }
          });
        }

        if (!lesson.learning_objectives || lesson.learning_objectives.length === 0) {
          console.warn(`  WARN: Missing learning_objectives in ${lessonIdentifier}`);
        }

        if (!lesson.do_now) {
          console.warn(`  WARN: Missing do_now in ${lessonIdentifier}`);
        }

        if (lesson.sources) {
          lesson.sources.forEach((src, sIdx) => {
            if (src.image) {
              const filename = path.basename(src.image);
              const fullAssetPath = path.join(PUBLIC_ASSETS_DIR, filename);
              if (!fs.existsSync(fullAssetPath)) {
                console.error(`  ERROR: Missing visual source file '${filename}' for ${lessonIdentifier}`);
                errors++;
              }
            }
          });
        }
      });
    } catch (e) {
      console.error(`  ERROR: Failed to parse data.js for ${unitId}:`, e.message);
      errors++;
    }
  }

  console.log('\n--- Validation Complete ---');
  if (errors > 0) {
    console.error(`\nFAILED: Found ${errors} critical errors in the curriculum data.`);
    process.exit(1);
  } else {
    console.log('\nSUCCESS: All units passed content validation!');
  }
}

validateUnits();

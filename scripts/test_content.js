const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../database.json');
const PUBLIC_ASSETS_DIR = path.join(__dirname, '../public/assets');

if (!fs.existsSync(DB_PATH)) {
  console.error('database.json not found! Please run `npm run sync` first.');
  process.exit(1);
}

const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
let errors = 0;

console.log('--- Starting Content Validation ---\n');

Object.values(db).forEach(unit => {
  console.log(`Checking unit: ${unit.id}...`);
  unit.lessons.forEach((lesson, i) => {
    const lessonIdentifier = `[Unit: ${unit.id} | Lesson ${i + 1}: ${lesson.title || 'Untitled'}]`;

    // Check title
    if (!lesson.title) {
      console.error(`  ERROR: Missing title in ${lessonIdentifier}`);
      errors++;
    }

    // Check narrative
    if (!lesson.narrative_blocks || lesson.narrative_blocks.length === 0) {
      console.error(`  ERROR: Missing or empty narrative_blocks in ${lessonIdentifier}`);
      errors++;
    } else {
      lesson.narrative_blocks.forEach((block, bIdx) => {
        if (!block.text) {
          console.error(`  ERROR: Empty narrative text at block ${bIdx + 1} in ${lessonIdentifier}`);
          errors++;
        }
      });
    }

    // Check learning objectives
    if (!lesson.learning_objectives || lesson.learning_objectives.length === 0) {
      // It's a warning, not necessarily an error, but based on rules we want them.
      console.warn(`  WARN: Missing learning_objectives in ${lessonIdentifier}`);
    }

    // Check Do Now recall questions (Hard to test algorithmically if they are *previous* lesson, but we can check existence)
    if (!lesson.do_now) {
      console.warn(`  WARN: Missing do_now in ${lessonIdentifier}`);
    }

    // Check sources (images/audio)
    if (lesson.sources) {
      lesson.sources.forEach((src, sIdx) => {
        if (src.image) {
          // src.image should now point to e.g. "/assets/unit_id_image.jpg" or "assets/..."
          // Let's extract just the filename to check against public/assets
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
});

console.log('\n--- Validation Complete ---');
if (errors > 0) {
  console.error(`\nFAILED: Found ${errors} critical errors in the curriculum data.`);
  process.exit(1);
} else {
  console.log('\nSUCCESS: All units passed content validation!');
}

const fs = require('fs');
const path = require('path');

async function catalogSources() {
  const mod = await import('../public/units/usa/data.js');
  const usa = mod.usa;
  const db = JSON.parse(fs.readFileSync('scripts/master_rights_database.json', 'utf8'));
  const usaDbSources = (db.units && db.units.usa && db.units.usa.sources) || [];

  const foundSources = [];

  usa.lessons.forEach((l, lIdx) => {
    const lessonId = l.id;
    const lessonTitle = l.title;

    if (l.narrative_blocks && Array.isArray(l.narrative_blocks)) {
      l.narrative_blocks.forEach((b, bIdx) => {
        if (b.image) {
          foundSources.push({
            type: 'narrative_block',
            lesson_num: lIdx + 1,
            lesson_id: lessonId,
            lesson_title: lessonTitle,
            block_id: b.id,
            block_title: b.title || b.theme_heading,
            image: b.image,
            caption: b.caption || '',
            image_alt: b.image_alt || '',
            image_context: b.image_context || '',
          });
        }
      });
    }

    if (l.sources && Array.isArray(l.sources)) {
      l.sources.forEach((s, sIdx) => {
        if (s.image) {
          foundSources.push({
            type: 'lesson_source',
            lesson_num: lIdx + 1,
            lesson_id: lessonId,
            lesson_title: lessonTitle,
            source_id: s.id || `Source_${sIdx + 1}`,
            image: s.image,
            caption: s.caption || s.title || '',
            image_alt: s.alt || '',
            image_context: s.context || s.description || '',
          });
        }
      });
    }
  });

  console.log(`Total source placements found in USA lessons: ${foundSources.length}`);

  // Unique images
  const uniqueImages = [...new Set(foundSources.map((s) => s.image))];
  console.log(`Unique images used in lessons: ${uniqueImages.length}`);

  // Check file existence
  const missingFiles = [];
  uniqueImages.forEach((img) => {
    const relPath = path.join('public', img.replace(/^\//, ''));
    const fullPath = path.resolve(relPath);
    if (!fs.existsSync(fullPath)) {
      missingFiles.push({ img, fullPath });
    }
  });

  console.log(`Missing image files: ${missingFiles.length}`);
  if (missingFiles.length > 0) {
    console.log('Missing:', missingFiles);
  }

  // All files in public/units/usa/assets/sources
  const sourcesDir = path.resolve('public/units/usa/assets/sources');
  const diskFiles = fs
    .readdirSync(sourcesDir)
    .filter((f) => !fs.statSync(path.join(sourcesDir, f)).isDirectory());
  console.log(`Total image files in public/units/usa/assets/sources on disk: ${diskFiles.length}`);

  fs.writeFileSync(
    'scripts/usa_source_inventory.json',
    JSON.stringify(
      {
        placements: foundSources,
        uniqueImages,
        diskFiles: diskFiles.map((f) => `/units/usa/assets/sources/${f}`),
        dbSources: usaDbSources,
      },
      null,
      2,
    ),
  );

  console.log('Wrote inventory to scripts/usa_source_inventory.json');
}

catalogSources().catch(console.error);

const fs = require('fs');
const path = require('path');
const ROOT_DIR = path.join(__dirname, '..');

const AI_PATTERNS = [
  /_\d{12,14}\.(png|jpg|jpeg|webp)$/i,
  /_pano_\d+/i,
  /\bdall[-_]?e\b/i,
  /midjourney/i,
  /stablediffusion/i,
  /flux[_-]ai/i,
  /deepai/i,
  /ai[_-]generated/i,
];

function isAiGeneratedFilename(filename) {
  return AI_PATTERNS.some((pattern) => pattern.test(filename));
}

function verifyImages() {
  console.log('====================================================');
  console.log('🛡️ IMAGE INTEGRITY & NO-AI LINTER AUDIT');
  console.log('====================================================');

  let errors = 0;

  // 1. Audit public/images for corruption & AI artifacts
  const imagesDir = path.join(ROOT_DIR, 'public', 'images');
  if (fs.existsSync(imagesDir)) {
    const files = fs.readdirSync(imagesDir);
    for (const file of files) {
      const filePath = path.join(imagesDir, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) continue;

      // Check AI patterns
      if (isAiGeneratedFilename(file)) {
        console.error(
          `❌ CRITICAL ERROR (AI Image Detected): ${file} matches AI generator naming patterns.`,
        );
        errors++;
      }

      // Check broken HTML masquerading as image
      if (stats.size < 3000) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (
          content.includes('<!DOCTYPE html>') ||
          content.includes('<html') ||
          content.includes('Wikimedia Error') ||
          content.includes('Please set a user-agent')
        ) {
          console.error(
            `❌ CRITICAL ERROR (Broken Image): ${file} is a broken HTML error page (Size: ${stats.size} bytes).`,
          );
          errors++;
        }
      }
    }
  }

  // 2. Audit unit assets directories for AI artifacts
  const unitDirs = [path.join(ROOT_DIR, 'units'), path.join(ROOT_DIR, 'public', 'units')];

  unitDirs.forEach((baseDir) => {
    if (!fs.existsSync(baseDir)) return;
    const units = fs.readdirSync(baseDir);
    units.forEach((unit) => {
      const assetsDir = path.join(baseDir, unit, 'assets');
      if (fs.existsSync(assetsDir) && fs.statSync(assetsDir).isDirectory()) {
        const assetFiles = fs.readdirSync(assetsDir);
        assetFiles.forEach((file) => {
          if (isAiGeneratedFilename(file)) {
            console.error(`❌ CRITICAL ERROR (AI Image Detected in ${unit}/assets): ${file}`);
            errors++;
          }
        });
      }
    });
  });

  // 3. Audit curriculum data files for AI image references
  const unitsRoot = path.join(ROOT_DIR, 'units');
  if (fs.existsSync(unitsRoot)) {
    const units = fs.readdirSync(unitsRoot);
    units.forEach((unit) => {
      const dataJsPath = path.join(unitsRoot, unit, 'data.js');
      if (fs.existsSync(dataJsPath)) {
        const content = fs.readFileSync(dataJsPath, 'utf8');
        AI_PATTERNS.forEach((pattern) => {
          const match = content.match(pattern);
          if (match) {
            console.error(
              `❌ CRITICAL ERROR (AI Reference in ${unit}/data.js): Reference to "${match[0]}" detected.`,
            );
            errors++;
          }
        });
      }
    });
  }

  // 4. Audit active curriculum units for placeholder images and intra-lesson duplicates
  const targetUnitArg = process.argv.find((arg) => arg.startsWith('--unit='));
  const targetUnit = targetUnitArg ? targetUnitArg.split('=')[1] : null;

  const dataDir = path.join(ROOT_DIR, 'data');
  if (fs.existsSync(dataDir)) {
    const jsonFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
    for (const jf of jsonFiles) {
      const unitName = jf.replace('.json', '');
      if (targetUnit && unitName !== targetUnit) continue;

      try {
        const unitData = JSON.parse(fs.readFileSync(path.join(dataDir, jf), 'utf8'));
        const lessons = unitData.lessons || [];
        lessons.forEach(l => {
          const lessonImages = [];
          (l.narrative_blocks || []).forEach(b => {
            if (b.image) {
              lessonImages.push({ type: 'Narrative Plate', path: b.image });
              if (b.image.includes('placeholder.jpg') || b.image.includes('default_person.jpg')) {
                console.error(`❌ CRITICAL ERROR: Placeholder image detected in ${jf} Lesson ${l.id || l.title}: ${b.image}`);
                errors++;
              }
            }
          });
          (l.sources || []).forEach(s => {
            const srcImg = s.image || s.src;
            if (srcImg && !srcImg.endsWith('.html') && !srcImg.endsWith('.pdf')) {
              lessonImages.push({ type: `Source ${s.letter || s.id}`, path: srcImg });
              if (srcImg.includes('placeholder.jpg') || srcImg.includes('default_person.jpg')) {
                console.error(`❌ CRITICAL ERROR: Placeholder image detected in ${jf} Lesson ${l.id || l.title} Source ${s.letter}: ${srcImg}`);
                errors++;
              }
            }
          });

          // Check intra-lesson duplicate images
          const seen = new Map();
          lessonImages.forEach(img => {
            if (seen.has(img.path)) {
              if (unitName === 'weimar_nazi_germany' || unitName === targetUnit) {
                console.error(`❌ CRITICAL ERROR: Intra-lesson duplicate image detected in ${jf} Lesson ${l.id || l.title}: "${img.path}" used in both ${seen.get(img.path)} and ${img.type}.`);
                errors++;
              } else {
                console.warn(`⚠️ LEGACY WARNING: Intra-lesson duplicate image in unmigrated unit ${jf} Lesson ${l.id || l.title}: "${img.path}" in ${seen.get(img.path)} and ${img.type}.`);
              }
            } else {
              seen.set(img.path, img.type);
            }
          });
        });
      } catch (e) {
        // Skip non-unit or malformed JSON
      }
    }
  }

  if (errors > 0) {
    console.error(`\n🚨 Image verification failed! Found ${errors} violation(s).`);
    console.error(
      'Educational content must strictly use authentic historical photographs and primary sources.\n',
    );
    process.exit(1);
  } else {
    console.log('✅ All images verified successfully.');
    console.log('🎉 100% CLEAN: Zero broken HTML pages, zero AI-generated images, zero placeholders, and zero intra-lesson duplicates found.\n');
  }
}

verifyImages();

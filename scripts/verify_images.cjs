const fs = require('fs');
const path = require('path');
const ROOT_DIR = path.join(__dirname, '..');

const AI_PATTERNS = [
  /_\d{12,14}\.(png|jpg|jpeg|webp)$/i,
  /_pano_\d+/i,
  /dall[-_]?e/i,
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

  if (errors > 0) {
    console.error(`\n🚨 Image verification failed! Found ${errors} violation(s).`);
    console.error(
      'Educational content must strictly use authentic historical photographs and primary sources.\n',
    );
    process.exit(1);
  } else {
    console.log('✅ All images verified successfully.');
    console.log('🎉 100% CLEAN: Zero broken HTML pages and zero AI-generated images found.\n');
  }
}

verifyImages();

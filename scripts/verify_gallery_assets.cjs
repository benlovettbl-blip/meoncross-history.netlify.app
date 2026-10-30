const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = path.resolve(__dirname, '..');
const DB_PATH = path.join(ROOT_DIR, 'public', 'database.json');
const ROOT_DB_PATH = path.join(ROOT_DIR, 'database.json');
const RIGHTS_DB_PATH = path.join(__dirname, 'master_rights_database.json');

async function main() {
  console.log('======================================================================');
  console.log('🖼️  AUTOMATED VISUAL GALLERY & ASSET INTEGRITY LINTER');
  console.log('======================================================================\n');

  const activeDbPath = fs.existsSync(DB_PATH) ? DB_PATH : ROOT_DB_PATH;
  if (!fs.existsSync(activeDbPath)) {
    console.error(`❌ database.json not found at ${activeDbPath}`);
    process.exit(1);
  }

  const db = JSON.parse(fs.readFileSync(activeDbPath, 'utf8'));
  const rightsDb = fs.existsSync(RIGHTS_DB_PATH)
    ? JSON.parse(fs.readFileSync(RIGHTS_DB_PATH, 'utf8'))
    : null;

  // Set of all unique image paths referenced in curriculum & rights DB
  const assetMap = new Map(); // path -> Set of references

  function addAsset(rawPath, sourceContext) {
    if (!rawPath || typeof rawPath !== 'string') return;
    const clean = rawPath.trim();
    if (!clean || clean.startsWith('http://') || clean.startsWith('https://')) return;
    if (clean.endsWith('.pdf') || clean.endsWith('.html') || clean.endsWith('.txt')) return;

    // Check if it has an image extension or is in an image path
    const isImageExt = /\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(clean);
    if (!isImageExt && !clean.includes('/images/') && !clean.includes('/assets/')) return;

    if (!assetMap.has(clean)) {
      assetMap.set(clean, new Set());
    }
    assetMap.get(clean).add(sourceContext);
  }

  // 1. Scan Database Units
  for (const [uKey, rawUnit] of Object.entries(db)) {
    if (uKey === 'trip_ypres') continue;
    const unit = rawUnit.data || rawUnit;
    const lessons = unit.lessons || [];

    lessons.forEach((l, lIdx) => {
      const lRef = `${uKey} [L${lIdx + 1}]`;

      // Banner
      if (l.banner) {
        const bImg = typeof l.banner === 'string' ? l.banner : l.banner.image;
        if (bImg) addAsset(bImg, `${lRef} Banner`);
      }

      // Narrative Blocks
      (l.narrative_blocks || []).forEach((b, bIdx) => {
        if (b.image) addAsset(b.image, `${lRef} Block ${bIdx + 1}`);
      });

      // Sources
      (l.sources || []).forEach((s) => {
        const sImg = s.image || s.src;
        if (sImg && typeof sImg === 'string') {
          addAsset(sImg, `${lRef} Source ${s.letter || s.id || ''}`);
        }
      });
    });
  }

  // 2. Scan Rights Database
  if (rightsDb && rightsDb.units) {
    for (const [uKey, uData] of Object.entries(rightsDb.units)) {
      if (Array.isArray(uData.sources)) {
        uData.sources.forEach((s) => {
          if (s.asset_path) {
            addAsset(s.asset_path, `RightsDB [${uKey}] ${s.source_id || ''}`);
          }
        });
      }
    }
  }

  console.log(
    `Discovered ${assetMap.size} unique visual assets across curriculum & rights registers.`,
  );
  console.log(
    'Auditing physical existence, file integrity, and graphical dimensions with sharp...\n',
  );

  let missingErrors = 0;
  let corruptErrors = 0;
  let zeroByteErrors = 0;
  let checkedCount = 0;

  // Audit in concurrent chunks
  const assetEntries = Array.from(assetMap.entries());
  const CHUNK_SIZE = 40;

  for (let i = 0; i < assetEntries.length; i += CHUNK_SIZE) {
    const chunk = assetEntries.slice(i, i + CHUNK_SIZE);
    await Promise.all(
      chunk.map(async ([relPath, contexts]) => {
        checkedCount++;
        const absPath = path.join(ROOT_DIR, 'public', relPath.replace(/^\//, ''));

        // Check existence
        if (!fs.existsSync(absPath)) {
          console.error(`❌ [FILE MISSING (404)]: "${relPath}"`);
          console.error(`   Referenced by: ${Array.from(contexts).slice(0, 3).join(', ')}`);
          missingErrors++;
          return;
        }

        // Check size
        let stat;
        try {
          stat = fs.statSync(absPath);
        } catch (e) {
          console.error(`❌ [CANNOT STAT FILE]: "${relPath}" - ${e.message}`);
          corruptErrors++;
          return;
        }

        if (stat.size === 0) {
          console.error(`❌ [ZERO-BYTE FILE]: "${relPath}"`);
          console.error(`   Referenced by: ${Array.from(contexts).slice(0, 3).join(', ')}`);
          zeroByteErrors++;
          return;
        }

        // Check HTML error page masquerading as image
        if (stat.size < 3000) {
          try {
            const head = fs.readFileSync(absPath, 'utf8');
            if (
              head.includes('<!DOCTYPE') ||
              head.includes('<html') ||
              head.includes('Wikimedia Error')
            ) {
              console.error(`❌ [HTML ERROR PAGE AS IMAGE]: "${relPath}" (${stat.size} bytes)`);
              corruptErrors++;
              return;
            }
          } catch {
            // Binary data might fail utf8 read, which is expected for images
          }
        }

        // Check SVG
        if (relPath.toLowerCase().endsWith('.svg')) {
          try {
            const svgContent = fs.readFileSync(absPath, 'utf8');
            if (!svgContent.includes('<svg')) {
              console.error(`❌ [CORRUPT SVG]: "${relPath}" missing <svg> element`);
              corruptErrors++;
            }
          } catch (e) {
            console.error(`❌ [SVG READ ERROR]: "${relPath}" - ${e.message}`);
            corruptErrors++;
          }
          return;
        }

        // Use sharp for raster images (jpg, png, webp, gif, avif)
        try {
          const meta = await sharp(absPath).metadata();
          if (!meta || !meta.width || !meta.height || meta.width <= 0 || meta.height <= 0) {
            console.error(
              `❌ [INVALID IMAGE DIMENSIONS]: "${relPath}" (${meta.width}x${meta.height})`,
            );
            corruptErrors++;
          }
        } catch (e) {
          console.error(`❌ [CORRUPT IMAGE / SHARP ERROR]: "${relPath}" - ${e.message}`);
          console.error(`   Referenced by: ${Array.from(contexts).slice(0, 3).join(', ')}`);
          corruptErrors++;
        }
      }),
    );
  }

  console.log('----------------------------------------------------------------------');
  console.log(`Total Unique Assets Inspected:   ${checkedCount}`);
  console.log(`Missing Files (404):             ${missingErrors}`);
  console.log(`Corrupt / Unreadable Images:     ${corruptErrors}`);
  console.log(`Zero-Byte Files:                 ${zeroByteErrors}`);
  console.log('----------------------------------------------------------------------\n');

  const totalErrors = missingErrors + corruptErrors + zeroByteErrors;
  if (totalErrors > 0) {
    console.error(`❌ VISUAL ASSET AUDIT FAILED with ${totalErrors} violation(s).`);
    process.exit(1);
  } else {
    console.log(
      '🎉 100% HEALTHY: All visual gallery assets exist, possess valid headers, and render cleanly!',
    );
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal error during visual asset audit:', err);
  process.exit(1);
});

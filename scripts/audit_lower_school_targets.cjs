const fs = require('fs');
const path = require('path');

const units = ['water_and_sanitation', 'ks2_ww2', 'medieval_england'];
const pub = path.resolve(__dirname, '../public');

console.log('=== AUDITING LOWER-SCHOOL TARGET UNITS ===\n');

for (const u of units) {
  console.log(`\n==================================================`);
  console.log(`UNIT: ${u}`);
  console.log(`==================================================`);
  const dPath = path.resolve(__dirname, `../units/${u}/data.js`);
  if (!fs.existsSync(dPath)) {
    console.log(`ERROR: File not found: ${dPath}`);
    continue;
  }
  const raw = require(dPath);
  const data = raw.default || raw;
  const lessons = data.lessons || [];
  console.log(`Total Lessons: ${lessons.length}`);

  let missingFiles = 0;
  let mismatchedSources = 0;
  let intraLessonDups = 0;

  lessons.forEach((l, lIdx) => {
    const lId = l.id || `lesson_${lIdx + 1}`;
    console.log(`\n--- [${lId}] ${l.title} ---`);

    const bannerImg =
      typeof l.banner === 'object' && l.banner !== null
        ? l.banner.image || l.banner.url || l.banner.src || ''
        : typeof l.banner === 'string'
          ? l.banner
          : '';

    if (bannerImg) {
      const bannerPath = path.join(pub, bannerImg.replace(/^\//, ''));
      const exists = fs.existsSync(bannerPath);
      if (!exists) {
        console.log(`  ❌ BANNER MISSING: ${bannerImg}`);
        missingFiles++;
      } else {
        console.log(`  Banner: ${bannerImg} (OK)`);
      }
    } else {
      console.log(`  Banner: (None)`);
    }

    const lessonImgList = [];
    if (bannerImg) lessonImgList.push({ role: 'banner', img: bannerImg });

    const blocks = l.narrative_blocks || l.blocks || [];
    blocks.forEach((b, bIdx) => {
      if (b.image) {
        const bPath = path.join(pub, b.image.replace(/^\//, ''));
        const exists = fs.existsSync(bPath);
        if (!exists) {
          console.log(`  ❌ BLOCK ${bIdx + 1} IMAGE MISSING: ${b.image}`);
          missingFiles++;
        } else {
          console.log(`  Block ${bIdx + 1} Image: ${b.image} (OK)`);
          console.log(`    Caption: ${b.caption || b.image_alt || ''}`);
        }
        lessonImgList.push({ role: `block_${bIdx + 1}`, img: b.image });
      }

      // Check block sources vs lesson sources
      if (b.sources && b.sources.length) {
        b.sources.forEach((bs, bsIdx) => {
          const sImg = bs.image || bs.src || '';
          if (sImg) {
            const sPath = path.join(pub, sImg.replace(/^\//, ''));
            if (!fs.existsSync(sPath)) {
              console.log(
                `  ❌ BLOCK ${bIdx + 1} SOURCE ${bs.letter || bsIdx + 1} MISSING: ${sImg}`,
              );
              missingFiles++;
            }
          }
        });
      }
    });

    const sources = l.sources || [];
    console.log(`  Canonical Sources: ${sources.length}`);
    sources.forEach((s, sIdx) => {
      const sImg = s.image || s.src || '';
      const sLetter = s.letter || String.fromCharCode(65 + sIdx);
      const sType = s.type || s.badge || 'visual';
      const sTitle = s.title || '';
      const sDesc = s.desc || s.caption || '';

      if (sImg) {
        const sPath = path.join(pub, sImg.replace(/^\//, ''));
        const exists = fs.existsSync(sPath);
        if (!exists) {
          console.log(`  ❌ SOURCE ${sLetter} MISSING: ${sImg}`);
          missingFiles++;
        } else {
          console.log(`  Source ${sLetter} [${sType}]: ${sTitle}`);
          console.log(`    Img: ${sImg} (OK)`);
          console.log(`    Desc: ${sDesc}`);
        }
        lessonImgList.push({ role: `source_${sLetter}`, img: sImg });
      } else {
        console.log(`  Source ${sLetter} [${sType}]: ${sTitle} (NO IMAGE)`);
      }
    });

    // Check block.sources vs lesson.sources synchronization
    blocks.forEach((b, bIdx) => {
      if (bIdx < sources.length) {
        const canonicalS = sources[bIdx];
        const cImg = canonicalS ? canonicalS.image || canonicalS.src || '' : '';
        const cTitle = canonicalS ? canonicalS.title : '';

        // Check b.sources[0]
        if (b.sources && b.sources[0]) {
          const bsImg = b.sources[0].image || b.sources[0].src || '';
          const bsTitle = b.sources[0].title || '';
          if (bsImg !== cImg || bsTitle !== cTitle) {
            console.log(
              `  ⚠️ MISMATCH in Block ${bIdx + 1} b.sources[0] vs lesson.sources[${bIdx}]:`,
            );
            console.log(`     Block:  [${bsTitle}] -> ${bsImg}`);
            console.log(`     Lesson: [${cTitle}] -> ${cImg}`);
            mismatchedSources++;
          }
        } else if (canonicalS) {
          console.log(
            `  ⚠️ MISSING b.sources in Block ${bIdx + 1} (lesson has Source ${canonicalS.letter})`,
          );
          mismatchedSources++;
        }

        // Check b.source
        if (b.source) {
          const bsImg = b.source.image || b.source.src || '';
          const bsTitle = b.source.title || '';
          if (bsImg !== cImg || bsTitle !== cTitle) {
            console.log(`  ⚠️ MISMATCH in Block ${bIdx + 1} b.source vs lesson.sources[${bIdx}]:`);
            console.log(`     Block:  [${bsTitle}] -> ${bsImg}`);
            console.log(`     Lesson: [${cTitle}] -> ${cImg}`);
            mismatchedSources++;
          }
        }
      }
    });

    // Check intra-lesson image duplicates
    const seenImgs = new Map();
    lessonImgList.forEach((item) => {
      if (!item.img) return;
      if (seenImgs.has(item.img)) {
        console.log(
          `  🚨 INTRA-LESSON DUPLICATE: ${item.img} used in ${seenImgs.get(item.img)} AND ${item.role}`,
        );
        intraLessonDups++;
      } else {
        seenImgs.set(item.img, item.role);
      }
    });
  });

  console.log(`\nSummary for ${u}:`);
  console.log(`  Missing Files: ${missingFiles}`);
  console.log(`  Mismatched Sources: ${mismatchedSources}`);
  console.log(`  Intra-lesson Duplicates: ${intraLessonDups}`);
}

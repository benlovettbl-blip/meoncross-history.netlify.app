const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'public', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('=== AUDIT 1: Broken Image Paths Across All Units ===');
const brokenImages = [];
const verifiedImages = new Set();

function checkImage(imgUrl, context) {
  if (!imgUrl || typeof imgUrl !== 'string') return;
  if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) return; // skip external urls
  if (imgUrl.startsWith('data:')) return;

  const cleanUrl = imgUrl.split('?')[0].split('#')[0];
  let localPath = path.join(__dirname, '..', 'public', cleanUrl.replace(/^\//, ''));
  
  if (!fs.existsSync(localPath)) {
    // Check without public prefix if already in public
    const altPath = path.join(__dirname, '..', cleanUrl.replace(/^\//, ''));
    if (!fs.existsSync(altPath)) {
      brokenImages.push({ imgUrl, context });
    } else {
      verifiedImages.add(imgUrl);
    }
  } else {
    verifiedImages.add(imgUrl);
  }
}

for (const [unitId, unitObj] of Object.entries(db)) {
  const unit = unitObj.data || unitObj;
  
  // Check unit level covers
  checkImage(unit.homepage_background, `${unitId} (homepage_background)`);
  checkImage(unit.cover_image, `${unitId} (cover_image)`);

  const lessons = unit.lessons || [];
  lessons.forEach((l, lIdx) => {
    const lId = l.id || `lesson_${lIdx + 1}`;
    checkImage(l.banner, `${unitId} > ${lId} (banner)`);
    checkImage(l.card_image, `${unitId} > ${lId} (card_image)`);
    checkImage(l.hero_image, `${unitId} > ${lId} (hero_image)`);

    // Narrative blocks
    (l.narrative_blocks || []).forEach((b, bIdx) => {
      checkImage(b.image, `${unitId} > ${lId} > block ${bIdx + 1} (image)`);
      if (b.source) {
        checkImage(b.source.image || b.source.src || b.source.image_url, `${unitId} > ${lId} > block ${bIdx + 1} source`);
      }
      if (Array.isArray(b.sources)) {
        b.sources.forEach((s, sIdx) => {
          checkImage(s.image || s.src || s.image_url, `${unitId} > ${lId} > block ${bIdx + 1} sources[${sIdx}]`);
        });
      }
    });

    // Standalone sources
    (l.sources || []).forEach((s, sIdx) => {
      checkImage(s.image || s.src || s.image_url, `${unitId} > ${lId} > source[${sIdx}]`);
    });
  });
}

console.log(`Total verified local images: ${verifiedImages.size}`);
console.log(`Total broken images found: ${brokenImages.length}`);
if (brokenImages.length > 0) {
  console.log('Broken images list:');
  brokenImages.slice(0, 30).forEach(b => console.log(`  - [${b.context}]: ${b.imgUrl}`));
  if (brokenImages.length > 30) console.log(`  ... and ${brokenImages.length - 30} more.`);
}

console.log('\n=== AUDIT 2: Source Placement (Embedded vs Dumped at End) ===');
const sourcePlacement = [];
for (const [unitId, unitObj] of Object.entries(db)) {
  const unit = unitObj.data || unitObj;
  const lessons = unit.lessons || [];
  let dumpedLessons = 0;
  let embeddedLessons = 0;
  let noSourceLessons = 0;

  lessons.forEach((l) => {
    const hasStandalone = Array.isArray(l.sources) && l.sources.length > 0;
    const hasInline = Array.isArray(l.narrative_blocks) && l.narrative_blocks.some(b => b.source || (b.sources && b.sources.length > 0));

    if (hasInline) {
      embeddedLessons++;
    } else if (hasStandalone) {
      dumpedLessons++;
    } else {
      noSourceLessons++;
    }
  });

  sourcePlacement.push({
    unitId,
    totalLessons: lessons.length,
    embeddedLessons,
    dumpedLessons,
    noSourceLessons
  });
}

console.table(sourcePlacement);

console.log('\n=== AUDIT 3: Key Individual Portraits / Card Banners Without Face Framing ===');
const uncalibratedPortraits = [];
for (const [unitId, unitObj] of Object.entries(db)) {
  const unit = unitObj.data || unitObj;
  const lessons = unit.lessons || [];
  lessons.forEach((l, lIdx) => {
    const banner = l.card_image || l.banner || l.hero_image || '';
    const pos = l.card_position || l.banner_position || 'center';
    
    // Check if the image filename or title suggests a person portrait but position is plain 'center' or not specified
    const isPerson = /portrait|jenner|harvey|vesalius|snow|nightingale|lister|pasteur|paré|koch|fleming|curie|hitler|stresemann|elizabeth|cecil|drake|mary|lenin|stalin|churchill|roosevelt|truman|kennedy|khrushchev/i.test(banner) ||
                     /portrait|jenner|harvey|vesalius|snow|nightingale|lister|pasteur|paré|koch|fleming|curie|hitler|stresemann|elizabeth|cecil|drake|mary/i.test(l.title || '');

    if (isPerson && (pos === 'center' || !pos)) {
      uncalibratedPortraits.push({
        unitId,
        lessonId: l.id || `lesson_${lIdx + 1}`,
        title: l.title,
        banner,
        pos
      });
    }
  });
}
console.log(`Portraits with default 'center' positioning: ${uncalibratedPortraits.length}`);
uncalibratedPortraits.slice(0, 15).forEach(p => console.log(`  - [${p.unitId}] ${p.lessonId}: ${p.title} -> ${p.banner} (${p.pos})`));

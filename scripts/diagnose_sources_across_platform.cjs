const fs = require('fs');
const path = require('path');
const db = JSON.parse(
  fs.readFileSync('C:/Projects/the-history-revision-hub/public/database.json', 'utf8'),
);

const issuesByUnit = {};

const PORTRAIT_PATTERNS = [/portrait/i, /headshot/i, /bust/i, /_formal/i, /studio_photo/i];

Object.keys(db).forEach((unitId) => {
  const root = db[unitId];
  const unit = root.data || root;
  const lessons = Array.isArray(unit.lessons) ? unit.lessons : [];

  const unitIssues = {
    totalLessons: lessons.length,
    totalSources: 0,
    nonStandardBlockCount: 0,
    nonStandardSourceCount: 0,
    mismatchedSrcImage: [],
    portraitSources: [],
    emptySources: [],
    unlinkedBlockSources: [],
  };

  lessons.forEach((lesson, lIdx) => {
    const lNum = lIdx + 1;
    const lId = lesson.id || `L${lNum}`;
    const blocks = lesson.narrative_blocks || lesson.narrative || [];
    const sources = lesson.sources || [];

    unitIssues.totalSources += sources.length;

    if (blocks.length !== 5) {
      unitIssues.nonStandardBlockCount++;
    }
    if (sources.length !== 5) {
      unitIssues.nonStandardSourceCount++;
    }

    // Check blocks source linkage
    blocks.forEach((b, bIdx) => {
      const bSources = b.sources || (b.source ? [b.source] : []);
      if (bSources.length !== 1) {
        unitIssues.unlinkedBlockSources.push(
          `L${lNum} Block ${bIdx + 1} has ${bSources.length} sources`,
        );
      }
    });

    // Check sources
    sources.forEach((s, sIdx) => {
      const sLetter = s.letter || ['A', 'B', 'C', 'D', 'E'][sIdx];
      const sImg = s.image || s.src || '';
      const sTitle = s.title || '';
      const sCap = s.caption || '';

      if (s.src && s.image && s.src !== s.image) {
        unitIssues.mismatchedSrcImage.push({
          lesson: lId,
          letter: sLetter,
          src: s.src,
          image: s.image,
        });
      }

      if (!sImg && s.type === 'visual') {
        unitIssues.emptySources.push({
          lesson: lId,
          letter: sLetter,
          title: sTitle,
        });
      }

      // Check portrait detection
      const isPortraitFile = PORTRAIT_PATTERNS.some((p) => p.test(sImg));
      const hasActionTitle =
        /reviewing|signing|manning|protest|riot|march|surrender|battle|clash|speaks|addressing/i.test(
          sTitle,
        );

      if (isPortraitFile && hasActionTitle) {
        unitIssues.portraitSources.push({
          lesson: lId,
          letter: sLetter,
          title: sTitle,
          image: sImg,
          reason: 'Filename matches portrait but title claims action/event',
        });
      }
    });
  });

  issuesByUnit[unitId] = unitIssues;
});

console.log(
  '====================================================================================================',
);
console.log('PLATFORM-WIDE SOURCE & BLOCK DIAGNOSTIC AUDIT REPORT');
console.log(
  '====================================================================================================',
);
console.log(
  'UNIT ID'.padEnd(28) +
    'LESSONS'.padEnd(10) +
    'NON-5 BLK'.padEnd(12) +
    'NON-5 SRC'.padEnd(12) +
    'SRC!=IMG'.padEnd(12) +
    'PORTRAIT MISMATCH'.padEnd(20) +
    'UNLINKED',
);
console.log(
  '----------------------------------------------------------------------------------------------------',
);

Object.keys(issuesByUnit).forEach((unitId) => {
  const u = issuesByUnit[unitId];
  console.log(
    unitId.padEnd(28) +
      String(u.totalLessons).padEnd(10) +
      String(u.nonStandardBlockCount).padEnd(12) +
      String(u.nonStandardSourceCount).padEnd(12) +
      String(u.mismatchedSrcImage.length).padEnd(12) +
      String(u.portraitSources.length).padEnd(20) +
      String(u.unlinkedBlockSources.length),
  );
});
console.log(
  '====================================================================================================\n',
);

fs.writeFileSync(
  'C:/Projects/the-history-revision-hub/scripts/platform_source_diagnostics.json',
  JSON.stringify(issuesByUnit, null, 2),
);

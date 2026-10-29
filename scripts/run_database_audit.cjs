const fs = require('fs');
const db = JSON.parse(
  fs.readFileSync('C:/Projects/the-history-revision-hub/public/database.json', 'utf8'),
);

const results = [];

Object.keys(db).forEach((unitId) => {
  const root = db[unitId];
  const unit = root.data || root;
  const lessons = Array.isArray(unit.lessons) ? unit.lessons : [];

  const keyStage = [
    'cme_new',
    'usa',
    'weimar_nazi_germany',
    'eee',
    'edexcel_medicine',
    'cold_war',
  ].includes(unitId)
    ? 'GCSE'
    : unitId === 'ks2_ww2'
      ? 'KS2'
      : 'KS3';

  const lessonStats = lessons.map((l, lIdx) => {
    const blocks = l.narrative_blocks || l.narrative || [];
    const blockCount = blocks.length;
    const sources = l.sources || [];
    const sourceCount = sources.length;
    const spineStages = l.causal_domino_spine?.stages?.length || 0;

    let blocksWithSources = 0;
    blocks.forEach((b) => {
      const bSrc = b.sources || (b.source ? [b.source] : []);
      if (bSrc.length > 0) blocksWithSources++;
    });

    const sourcesWithImages = sources.filter((s) => Boolean(s.image || s.src)).length;

    // Check if sources have portraits
    const portraitSources = sources
      .filter((s) => {
        const title = (s.title || '').toLowerCase();
        const cap = (s.caption || '').toLowerCase();
        const img = (s.image || s.src || '').toLowerCase();
        return (
          title.includes('portrait') ||
          title.includes('photograph of') ||
          title.includes('official portrait') ||
          cap.includes('portrait') ||
          img.includes('portrait')
        );
      })
      .map((s) => s.letter || s.title);

    return {
      id: l.id || `L${lIdx + 1}`,
      title: l.title,
      blockCount,
      sourceCount,
      spineStages,
      blocksWithSources,
      sourcesWithImages,
      portraitSources,
    };
  });

  const totalLessons = lessonStats.length;
  const blockCounts = Array.from(new Set(lessonStats.map((s) => s.blockCount)));
  const sourceCounts = Array.from(new Set(lessonStats.map((s) => s.sourceCount)));
  const spineCounts = Array.from(new Set(lessonStats.map((s) => s.spineStages)));

  results.push({
    unitId,
    title: unit.title || unitId,
    keyStage,
    totalLessons,
    blockCounts,
    sourceCounts,
    spineCounts,
    lessonStats,
  });
});

console.log(
  '========================================================================================================================',
);
console.log('PLATFORM-WIDE AUDIT: 5-BLOCK NARRATIVE & PRIMARY SOURCE ALIGNMENT');
console.log(
  '========================================================================================================================',
);
console.log(
  'UNIT ID'.padEnd(28) +
    'STAGE'.padEnd(8) +
    'LESSONS'.padEnd(10) +
    'BLOCKS'.padEnd(14) +
    'SOURCES'.padEnd(14) +
    'SPINE'.padEnd(10) +
    'STATUS',
);
console.log(
  '------------------------------------------------------------------------------------------------------------------------',
);

results.forEach((r) => {
  const bStr = r.blockCounts.join(',');
  const sStr = r.sourceCounts.join(',');
  const spStr = r.spineCounts.join(',');
  const is5x5 = bStr === '5' && sStr === '5';
  let status = '⚠️ Needs Work';
  if (is5x5 && spStr === '5') {
    status = '✅ 100% 5x5 Aligned';
  } else if (bStr === '5' && sStr === '5') {
    status = '🟡 5-Block (Needs Spine)';
  } else if (bStr === '5') {
    status = '🟠 5-Block (Needs Sources)';
  } else {
    status = `🔴 ${bStr} Blocks / ${sStr} Sources`;
  }

  console.log(
    r.unitId.padEnd(28) +
      r.keyStage.padEnd(8) +
      String(r.totalLessons).padEnd(10) +
      bStr.padEnd(14) +
      sStr.padEnd(14) +
      spStr.padEnd(10) +
      status,
  );
});
console.log(
  '========================================================================================================================\n',
);

fs.writeFileSync(
  'C:/Projects/the-history-revision-hub/scripts/platform_audit_detailed.json',
  JSON.stringify(results, null, 2),
);

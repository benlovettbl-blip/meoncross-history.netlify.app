const fs = require('fs');
const results = JSON.parse(
  fs.readFileSync(
    'C:/Projects/the-history-revision-hub/scripts/master_platform_audit_results.json',
    'utf8',
  ),
);

console.log(
  '====================================================================================================',
);
console.log('UNIT AUDIT: 5-BLOCK NARRATIVE & PRIMARY SOURCE ALIGNMENT ACROSS PLATFORM');
console.log(
  '====================================================================================================',
);
console.log(
  'UNIT ID'.padEnd(28) +
    'STAGE'.padEnd(8) +
    'LESSONS'.padEnd(10) +
    'BLOCKS'.padEnd(12) +
    'SOURCES'.padEnd(12) +
    'SPINE'.padEnd(10) +
    'STATUS',
);
console.log(
  '----------------------------------------------------------------------------------------------------',
);

results.forEach((r) => {
  if (r.error) {
    console.log(r.unitId.padEnd(28) + 'ERROR: ' + r.error);
    return;
  }
  const bStr = r.blockCounts.join(',');
  const sStr = r.sourceCounts.join(',');
  const spStr = r.spineCounts.join(',');
  const is5x5 = bStr === '5' && sStr === '5';
  const status = is5x5 ? '✅ 5x5 Standard' : '⚠️ Non-5 Standard';

  console.log(
    r.unitId.padEnd(28) +
      r.keyStage.padEnd(8) +
      String(r.totalLessons).padEnd(10) +
      bStr.padEnd(12) +
      sStr.padEnd(12) +
      spStr.padEnd(10) +
      status,
  );
});
console.log(
  '====================================================================================================\n',
);

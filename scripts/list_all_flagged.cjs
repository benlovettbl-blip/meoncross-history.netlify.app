const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, '..', 'public', 'data', 'full_curriculum_audit_report.json');
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

console.log('Total flagged items:', report.flaggedList.length);
report.flaggedList.forEach((f, i) => {
  console.log(`${i+1}. [${f.unitId}] ${f.lessonId || ''} (${f.letter || ''}): "${f.title}"`);
  console.log(`   Image: ${f.image}`);
  console.log(`   Issue: ${f.issueType} — ${f.issueDesc}`);
  console.log(`   Fix:   ${f.recommendedFix}`);
  console.log('');
});

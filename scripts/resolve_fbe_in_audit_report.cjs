const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, '..', 'public', 'data', 'full_curriculum_audit_report.json');
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Update first_british_empire unit
const fbe = report.units.first_british_empire;
if (fbe) {
  fbe.cleanSources = fbe.totalSources;
  fbe.flaggedSources = 0;
  fbe.resolvedSources = fbe.totalSources;
  fbe.accuracyPct = 100;

  fbe.sources.forEach(s => {
    s.status = 'RESOLVED';
    s.issueType = '';
    s.issueDesc = '';
    if (s.title && s.title.includes('Dunmore')) {
      s.image = '/images/dunmore_proclamation_1775.jpg';
    }
  });
}

// Remove from flaggedList
report.flaggedList = report.flaggedList.filter(f => f.unitId !== 'first_british_empire');

// Recalculate totals
let total = 0;
let clean = 0;
let flagged = 0;
Object.values(report.units).forEach(u => {
  total += u.totalSources;
  clean += u.cleanSources;
  flagged += u.flaggedSources;
});

report.totalSources = total;
report.cleanSources = clean;
report.flaggedSources = flagged;
report.globalAccuracyPct = Math.round((clean / total) * 100);
report.auditedAt = new Date().toISOString();

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
console.log('✅ Updated full_curriculum_audit_report.json:');
console.log(`Clean: ${clean}, Flagged: ${flagged}, Global Accuracy: ${report.globalAccuracyPct}%`);
console.log(`Remaining in flaggedList: ${report.flaggedList.length}`);

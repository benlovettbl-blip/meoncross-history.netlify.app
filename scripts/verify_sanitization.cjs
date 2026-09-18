const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const allFiles = execSync('git ls-files -z').toString('utf8').split('\0').filter(Boolean);

const TEXT_EXTS = new Set([
  '.js',
  '.cjs',
  '.mjs',
  '.html',
  '.css',
  '.json',
  '.md',
  '.ts',
  '.py',
  '.txt',
  '.ps1',
]);

const SKIP_EXTS = new Set([
  '.pdf',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.gif',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.mp3',
  '.wav',
  '.zip',
  '.pptx',
  '.docx',
  '.pyc',
]);

// Transient or backup files to ignore in audit
const IGNORED_FILES = new Set([
  'scan_summary.json',
  'scan_results.json',
  'filtered_occurrences.json',
  'sweep_modified_files.json',
  'scripts/find_targets.cjs',
  'scripts/inspect_matches.cjs',
  'scripts/analyze_lovett.cjs',
  'scripts/execute_anonymization_sweep.cjs',
  'scripts/verify_sanitization.cjs',
  'scripts/register_scheduled_cleanup.ps1',
  '.agents/AGENTS.md',
]);

const issues = [];

for (const relPath of allFiles) {
  if (IGNORED_FILES.has(relPath)) continue;
  if (relPath.startsWith('temp_backups/')) continue;
  const ext = path.extname(relPath).toLowerCase();
  if (SKIP_EXTS.has(ext)) continue;
  if (!TEXT_EXTS.has(ext)) continue;

  try {
    const lines = fs.readFileSync(relPath, 'utf8').split('\n');
    lines.forEach((line, idx) => {
      // Check meoncross
      if (/meoncross|meon\s+cross/i.test(line)) {
        issues.push({ file: relPath, line: idx + 1, type: 'meoncross', text: line.trim() });
      }

      // Check great-great-grandson / student family links
      if (/great-great-grandson/i.test(line)) {
        issues.push({
          file: relPath,
          line: idx + 1,
          type: 'great-great-grandson',
          text: line.trim(),
        });
      }
      if (/john\s+pearson/i.test(line)) {
        issues.push({ file: relPath, line: idx + 1, type: 'john pearson', text: line.trim() });
      }

      // Check teacher lovett (excluding historical Chartist William Lovett)
      if (/lovett/i.test(line)) {
        const isHistoricalWilliamLovett =
          /william\s+lovett|leaders\s+like\s+lovett|lovett\s+and\s+o'connor/i.test(line);
        if (!isHistoricalWilliamLovett) {
          issues.push({ file: relPath, line: idx + 1, type: 'teacher_lovett', text: line.trim() });
        }
      }

      // Check cognita / blenheim / OFG
      if (/\bcognita\b/i.test(line)) {
        issues.push({ file: relPath, line: idx + 1, type: 'cognita', text: line.trim() });
      }
      if (/\bblenheim\s+schools?\b/i.test(line)) {
        issues.push({ file: relPath, line: idx + 1, type: 'blenheim', text: line.trim() });
      }
      if (/outcomes\s+first\s+group/i.test(line)) {
        issues.push({ file: relPath, line: idx + 1, type: 'ofg', text: line.trim() });
      }
    });
  } catch (err) {
    console.error(`Error reading ${relPath}:`, err.message);
  }
}

console.log(`\n================ SANITIZATION AUDIT REPORT ================`);
console.log(`Total files inspected: ${allFiles.length}`);
console.log(`Total issues detected: ${issues.length}`);

if (issues.length > 0) {
  console.log('\nBreakdown by type:');
  const byType = {};
  issues.forEach((i) => {
    byType[i.type] = (byType[i.type] || 0) + 1;
  });
  console.log(byType);

  console.log('\nFirst 50 issues:');
  issues.slice(0, 50).forEach((i) => {
    console.log(`[${i.type}] ${i.file}:${i.line} -> ${i.text.substring(0, 100)}`);
  });
} else {
  console.log(
    '🎉 100% CLEAN: Zero matches for meoncross, teacher lovett, great-great-grandson, cognita, blenheim, or ofg!',
  );
}
console.log(`===========================================================\n`);

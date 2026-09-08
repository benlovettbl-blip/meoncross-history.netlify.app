const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, '..', 'units');
const publicDbPath = path.join(__dirname, '..', 'public', 'database.json');

async function buildDatabase() {
  console.log('Building database.json from units directory...');
  const db = {};
  const dirs = fs
    .readdirSync(unitsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const unitId of dirs) {
    const dataPath = path.join(unitsDir, unitId, 'data.js');
    if (fs.existsSync(dataPath)) {
      try {
        const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
        const module = await import(fileUrl);
        const unitData = module.default || module.unitData || module[unitId];
        if (unitData) {
          unitData.edition = unitData.edition || '2026.1';
          const issues = auditEntityIntegrity(unitId, unitData);
          if (issues.length > 0) {
            console.warn(
              `⚠️  [Entity Integrity Linter] Found ${issues.length} suspicious blank(s) in ${unitId}:`,
            );
            issues.forEach((iss) => {
              console.warn(`    - ${iss.path} (${iss.desc}): "${iss.snippet}"`);
            });
          }
          db[unitId] = { data: unitData };
          console.log(`✅ Included unit: ${unitId}`);
        } else {
          console.log(`⚠️  Could not extract data from ${unitId}/data.js`);
        }
      } catch (err) {
        console.error(`❌ Error importing ${unitId}/data.js:`, err.message);
      }
    } else {
      console.log(`⏭️  Skipped ${unitId} (no data.js found)`);
    }
  }

  fs.writeFileSync(publicDbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log(`🎉 Successfully built database.json with ${Object.keys(db).length} units.`);
}

function auditEntityIntegrity(unitId, unitData) {
  const issues = [];
  const suspiciousPatterns = [
    {
      regex: /\b(named|called|by|after)\s{2,}\S/i,
      desc: 'Suspicious double space after naming preposition',
    },
    {
      regex: /\b(named|after)\s*[,:;]/i,
      desc: 'Missing entity before punctuation',
    },
    {
      regex: /\bcalled\s*[,:;]/i,
      desc: 'Missing entity after "called"',
    },
    {
      regex: /\bby\s*[,;]/i,
      desc: 'Missing entity after "by"',
    },
    {
      regex: /\b(Portrait of|diary of|account of|memoir of)\s*[,:;?!]/i,
      desc: 'Missing name in source attribution',
    },
    {
      regex: /\b(Portrait of|diary of|account of|memoir of)\s{2,}\S/i,
      desc: 'Missing name with double space in attribution',
    },
    {
      regex: /\b(Why did|How did|What did)\s+'s\b/i,
      desc: 'Missing subject before possessive',
    },
    {
      regex: /\b(Why did|How did|What did)\s{2,}\S/i,
      desc: 'Missing subject in question',
    },
    {
      regex: /\b(adapted from (the )?diary of)\s*[,:;?!]/i,
      desc: 'Missing diarist name',
    },
    {
      regex: /\bsection on\s{2,}and\b/i,
      desc: 'Missing topic or entity in section reference',
    },
  ];

  function walk(node, pathStr) {
    if (!node) return;
    if (typeof node === 'string') {
      for (const { regex, desc } of suspiciousPatterns) {
        if (regex.test(node)) {
          if (node.includes('challenged this by...')) continue;
          issues.push({ path: pathStr, desc, snippet: node.trim().substring(0, 110) });
        }
      }
    } else if (Array.isArray(node)) {
      node.forEach((item, idx) => walk(item, `${pathStr}[${idx}]`));
    } else if (typeof node === 'object') {
      for (const key of Object.keys(node)) {
        walk(node[key], `${pathStr}.${key}`);
      }
    }
  }

  walk(unitData, unitId);
  return issues;
}

buildDatabase();

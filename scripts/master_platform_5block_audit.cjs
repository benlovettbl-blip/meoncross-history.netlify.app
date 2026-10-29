const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = 'C:/Projects/the-history-revision-hub';
const unitsDir = path.join(ROOT_DIR, 'units');
const dirs = fs
  .readdirSync(unitsDir)
  .filter((f) => fs.statSync(path.join(unitsDir, f)).isDirectory());

const results = [];

dirs.forEach((unitId) => {
  const dataPath = path.join(unitsDir, unitId, 'data.js');
  if (!fs.existsSync(dataPath)) {
    results.push({ unitId, error: 'No data.js' });
    return;
  }

  let code = fs.readFileSync(dataPath, 'utf8');
  code = code.replace(/export default\s+[a-zA-Z0-9_]+;?/, '');
  const sandbox = { window: {}, console: console, require: require };
  vm.createContext(sandbox);

  let data;
  try {
    vm.runInContext(code, sandbox);
    data =
      sandbox.window[`${unitId}_data`] ||
      sandbox.window.unitData ||
      sandbox.data ||
      sandbox.unitData ||
      sandbox[`${unitId}_data`];

    // Fallback search in sandbox
    if (!data) {
      for (const k of Object.keys(sandbox)) {
        if (sandbox[k] && sandbox[k].lessons) {
          data = sandbox[k];
          break;
        }
        if (sandbox.window && sandbox.window[k] && sandbox.window[k].lessons) {
          data = sandbox.window[k];
          break;
        }
      }
    }
  } catch (err) {
    results.push({ unitId, error: 'Eval error: ' + err.message });
    return;
  }

  if (!data || !data.lessons) {
    results.push({ unitId, error: 'No lessons array' });
    return;
  }

  const lessonStats = data.lessons.map((l, lIdx) => {
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

    return {
      id: l.id || `L${lIdx + 1}`,
      blockCount,
      sourceCount,
      spineStages,
      blocksWithSources,
      sourcesWithImages,
    };
  });

  const totalLessons = lessonStats.length;
  const blockCounts = Array.from(new Set(lessonStats.map((s) => s.blockCount)));
  const sourceCounts = Array.from(new Set(lessonStats.map((s) => s.sourceCount)));
  const spineCounts = Array.from(new Set(lessonStats.map((s) => s.spineStages)));

  results.push({
    unitId,
    title: data.title || unitId,
    keyStage:
      data.key_stage ||
      data.keyStage ||
      (['cme_new', 'usa', 'weimar_nazi_germany', 'eee', 'edexcel_medicine', 'cold_war'].includes(
        unitId,
      )
        ? 'GCSE'
        : unitId === 'ks2_ww2'
          ? 'KS2'
          : 'KS3'),
    totalLessons,
    blockCounts,
    sourceCounts,
    spineCounts,
    isStandard5Block:
      blockCounts.length === 1 &&
      blockCounts[0] === 5 &&
      sourceCounts.length === 1 &&
      sourceCounts[0] === 5,
    lessonStats,
  });
});

console.log('Master Audit Report Generated for ' + results.length + ' Units.');
fs.writeFileSync(
  'C:/Projects/the-history-revision-hub/scripts/master_platform_audit_results.json',
  JSON.stringify(results, null, 2),
);

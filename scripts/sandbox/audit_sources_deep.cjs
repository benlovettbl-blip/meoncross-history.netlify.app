const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..', '..');

function auditUnitSources(unitId) {
  const dataPath = path.join(ROOT_DIR, 'units', unitId, 'data.js');
  if (!fs.existsSync(dataPath)) {
    console.error('File not found:', dataPath);
    return;
  }
  const raw = require(dataPath);
  const unitData = raw.default || raw.unitData || raw;

  console.log(`\n======================================================`);
  console.log(`🔍 AUDITING SOURCES FOR UNIT: [${unitId}] (${unitData.lessons.length} lessons)`);
  console.log(`======================================================`);

  let totalSources = 0;
  let missingFiles = 0;
  let missingHinge = 0;

  unitData.lessons.forEach((l, lIdx) => {
    console.log(`\n--- Lesson ${lIdx + 1}: ${l.id} (${l.title}) ---`);

    // Check primary_source, sources array, and narrative_blocks sources
    const sources = [];
    if (l.primary_source) sources.push({ origin: 'primary_source', ...l.primary_source });
    if (Array.isArray(l.sources)) {
      l.sources.forEach((s) => sources.push({ origin: 'sources[]', ...s }));
    }
    if (Array.isArray(l.narrative_blocks)) {
      l.narrative_blocks.forEach((b, bIdx) => {
        if (b.source) sources.push({ origin: `narrative_blocks[${bIdx}].source`, ...b.source });
      });
    }

    if (sources.length === 0) {
      console.log('  ⚠️ NO SOURCES FOUND IN LESSON!');
    }

    sources.forEach((s) => {
      totalSources++;
      const srcPath = s.src || s.image || s.url || s.source;
      const title = s.title || s.caption || s.desc || 'UNTITLED';
      const hasHinge =
        (s.hinge_question && s.hinge_question.trim().length > 0) ||
        (s.source_context && /Hinge Question:/i.test(s.source_context));

      // Resolve file path
      let fileExists = false;
      let resolvedPath = null;
      if (srcPath) {
        const cleanSrc = srcPath.replace(/^\//, '');
        const candidates = [
          path.join(ROOT_DIR, 'public', cleanSrc),
          path.join(ROOT_DIR, cleanSrc),
          path.join(ROOT_DIR, 'public', 'images', path.basename(cleanSrc)),
          path.join(ROOT_DIR, 'images', path.basename(cleanSrc)),
          path.join(ROOT_DIR, 'units', unitId, 'assets', path.basename(cleanSrc)),
          path.join(ROOT_DIR, 'public', 'units', unitId, 'assets', path.basename(cleanSrc)),
        ];
        for (const cand of candidates) {
          if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
            fileExists = true;
            resolvedPath = cand;
            break;
          }
        }
      }

      if (!fileExists) missingFiles++;
      if (!hasHinge) missingHinge++;

      const statusIcon = fileExists ? '✅' : '❌ FILE MISSING';
      const hingeIcon = hasHinge ? '✅' : '⚠️ NO HINGE';
      console.log(
        `  [${s.origin}] Letter: ${s.letter || 'N/A'} | Title: "${title.slice(0, 45)}..."`,
      );
      console.log(`      Src: "${srcPath}" -> ${statusIcon}`);
      if (resolvedPath) {
        const stats = fs.statSync(resolvedPath);
        console.log(
          `      Resolved: ${path.relative(ROOT_DIR, resolvedPath)} (${Math.round(stats.size / 1024)} KB)`,
        );
      }
      console.log(`      Hinge Question: ${hingeIcon}`);
      if (s.source_context) {
        console.log(`      Context: "${s.source_context.slice(0, 80)}..."`);
      }
    });

    // Check teacher_notes.source_context
    if (l.teacher_notes && l.teacher_notes.source_context) {
      const tcStr =
        typeof l.teacher_notes.source_context === 'string'
          ? l.teacher_notes.source_context
          : JSON.stringify(l.teacher_notes.source_context);
      const tcHasHinge = /Hinge Question:/i.test(tcStr);
      console.log(
        `  [teacher_notes.source_context]: ${tcHasHinge ? '✅ Has Hinge' : '⚠️ NO HINGE'} ("${tcStr.slice(0, 70)}...")`,
      );
    }
  });

  console.log(
    `\nSUMMARY FOR ${unitId}: Total sources: ${totalSources}, Missing files: ${missingFiles}, Missing hinges: ${missingHinge}`,
  );
}

auditUnitSources('weimar_nazi_germany');
auditUnitSources('eee');

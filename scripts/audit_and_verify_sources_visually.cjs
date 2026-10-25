const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dbPath = path.join(rootDir, 'public', 'database.json');
const outJsonPath = path.join(rootDir, 'public', 'data', 'visual_verification_audit.json');

function classifyMedium(title, caption) {
  const text = `${title || ''} ${caption || ''}`.toLowerCase();
  if (text.includes('poster') || text.includes('recruiting') || text.includes('propaganda poster'))
    return 'Propaganda Poster';
  if (
    text.includes('cartoon') ||
    text.includes('punch') ||
    text.includes('caricature') ||
    text.includes('satirical')
  )
    return 'Political Cartoon';
  if (text.includes('map') || text.includes('cartograph') || text.includes('plan'))
    return 'Cartographic Map / Plan';
  if (
    text.includes('painting') ||
    text.includes('portrait') ||
    text.includes('mural') ||
    text.includes('oil on')
  )
    return 'Painting / Portrait';
  if (text.includes('photograph') || text.includes('photo') || text.includes('snapshot'))
    return 'Archival Photograph';
  if (
    text.includes('treaty') ||
    text.includes('letter') ||
    text.includes('diary') ||
    text.includes('seal') ||
    text.includes('broadside') ||
    text.includes('proclamation') ||
    text.includes('act') ||
    text.includes('manuscript')
  )
    return 'Historical Document / Manuscript';
  return 'Archival Visual Evidence';
}

function runAudit() {
  console.log('🔍 Starting Platform-Wide Automated Visual Source Verification Audit...');
  if (!fs.existsSync(dbPath)) {
    console.error('database.json not found!');
    process.exit(1);
  }

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const allSources = [];
  const imageUsageMap = {};

  for (const unitId of Object.keys(db)) {
    const unit = db[unitId].data || db[unitId];
    const unitTitle = unit.title || unitId;

    (unit.lessons || []).forEach((l, lIdx) => {
      const lId = l.id || `L${lIdx + 1}`;
      const lessonTitle = l.title || lId;
      const seenSourcesInLesson = new Set();

      const processSource = (s, locationType) => {
        if (!s) return;
        const imgPath = s.src || s.image || s.source;
        if (!imgPath && !s.plates) return;

        // Path resolution
        let resolvedPath = imgPath;
        if (Array.isArray(s.plates) && s.plates.length > 0 && !resolvedPath) {
          resolvedPath = s.plates[0].image || s.plates[0].src;
        }

        if (!resolvedPath || typeof resolvedPath !== 'string' || resolvedPath.trim() === '' || resolvedPath === 'undefined') {
          return;
        }

        // Deduplicate intra-lesson: if the same source is defined in both l.sources and b.source, audit only once
        const normLetter = (s.letter || '').toUpperCase().trim();
        const sourceKey = `${unitId}:${lId}:${normLetter}:${resolvedPath}`;
        if (seenSourcesInLesson.has(sourceKey)) return;
        seenSourcesInLesson.add(sourceKey);

        const title = s.title || s.caption || 'Archival Evidence';
        const caption = s.caption || '';
        const context = s.context || s.source_context || '';
        const tn = s.teacher_notes || {};
        let hq = s.hinge_question || tn.hinge_question || s.question || s.source_question || '';
        if (!hq && context.includes('Hinge Question:')) {
          const parts = context.split(/\*{0,2}Hinge Question:\*{0,2}/i);
          if (parts[1]) hq = parts[1].trim();
        }
        const ideas =
          s.discussion_ideas ||
          tn.discussion_ideas ||
          s.example_answers ||
          s.exemplar_answers ||
          (s.model_answer
            ? Array.isArray(s.model_answer)
              ? s.model_answer
              : [s.model_answer]
            : []);
        const expectedMedium = classifyMedium(title, caption);

        // Image Usage tracking
        if (!imageUsageMap[resolvedPath]) imageUsageMap[resolvedPath] = [];
        imageUsageMap[resolvedPath].push({ unitId, unitTitle, lId, lessonTitle, title, letter: normLetter });

        // File check
        const diskPath = path.join(rootDir, 'public', resolvedPath.replace(/^\//, ''));
        const exists = fs.existsSync(diskPath);
        let fileSize = 0;
        if (exists) {
          try {
            fileSize = fs.statSync(diskPath).size;
          } catch (e) {}
        }

        const fn = path.basename(resolvedPath).toLowerCase();
        let status = 'VERIFIED';
        let flags = [];

        if (!exists) {
          status = 'MISSING_FILE';
          flags.push(`Image file not found on disk at ${resolvedPath}`);
        } else if (fileSize === 0) {
          status = 'EMPTY_FILE';
          flags.push(`Image file is 0 bytes`);
        } else {
          // Medium mismatch rules
          if (
            expectedMedium === 'Propaganda Poster' &&
            fn.includes('portrait') &&
            !fn.includes('poster')
          ) {
            status = 'MEDIUM_MISMATCH';
            flags.push(`Expected poster, filename is "${fn}"`);
          } else if (
            expectedMedium === 'Political Cartoon' &&
            (fn.includes('photo') || (fn.includes('portrait') && !fn.includes('cartoon')))
          ) {
            status = 'MEDIUM_MISMATCH';
            flags.push(`Expected political cartoon, filename is "${fn}"`);
          } else if (
            expectedMedium === 'Cartographic Map / Plan' &&
            (fn.includes('portrait') || fn.includes('photo'))
          ) {
            status = 'MEDIUM_MISMATCH';
            flags.push(`Expected cartographic map/plan, filename is "${fn}"`);
          }
        }

        allSources.push({
          id: s.id || `${unitId}_${lId}_${normLetter || allSources.length + 1}`,
          unitId,
          unitTitle,
          lessonId: lId,
          lessonTitle,
          locationType,
          letter: normLetter,
          title,
          caption,
          context,
          provenance: s.provenance || s.citation || '',
          hinge_question: hq,
          discussion_ideas: ideas,
          expectedMedium,
          imagePath: resolvedPath,
          exists,
          fileSize,
          status,
          flags,
        });
      };

      (l.sources || []).forEach((s) => processSource(s, 'Lesson Sources Drawer'));
      (l.narrative_blocks || []).forEach((b) => {
        if (b.source) processSource(b.source, 'Narrative Block Source');
        if (b.archival_source) processSource(b.archival_source, 'Narrative Block Archival');
        if (b.images) {
          b.images.forEach((img) => {
            if (img.source_context || img.hinge_question || img.title) {
              processSource(img, 'Narrative Block Image');
            }
          });
        }
      });
      if (l.primary_source) {
        const psList = Array.isArray(l.primary_source) ? l.primary_source : [l.primary_source];
        psList.forEach((ps) => processSource(ps, 'Lesson Primary Source'));
      }
    });
  }

  // Cross-reference reuse
  allSources.forEach((s) => {
    const usages = imageUsageMap[s.imagePath] || [];
    if (usages.length > 1) {
      // Check for intra-unit duplicate (same unit, different lesson)
      const intraUnitLessons = usages.filter((u) => u.unitId === s.unitId && u.lId !== s.lessonId);
      if (intraUnitLessons.length > 0 && !s.imagePath.includes('map') && !s.imagePath.includes('banner')) {
        s.status = 'INTRA_UNIT_DUPLICATE';
        s.flags.push(`Intra-unit duplicate: reused in ${intraUnitLessons.map(u => u.lId).join(', ')}`);
      } else {
        // Cross-unit thematic sharing (e.g. King Cholera across Y7 Water & Sanitation and GCSE Medicine)
        const distinctUnits = [...new Set(usages.map(u => u.unitId))];
        if (distinctUnits.length > 1) {
          s.thematicShared = true;
          s.sharedUnits = distinctUnits.filter(u => u !== s.unitId);
        }
      }
    }
  });

  const summary = {
    generatedAt: new Date().toISOString(),
    totalSources: allSources.length,
    verifiedCount: allSources.filter((s) => s.status === 'VERIFIED').length,
    sharedCount: allSources.filter((s) => s.status === 'SHARED_ASSET').length,
    mediumMismatchCount: allSources.filter((s) => s.status === 'MEDIUM_MISMATCH').length,
    missingFileCount: allSources.filter(
      (s) => s.status === 'MISSING_FILE' || s.status === 'EMPTY_FILE',
    ).length,
    sources: allSources,
  };

  fs.writeFileSync(outJsonPath, JSON.stringify(summary, null, 2), 'utf8');
  console.log(`\n========================================`);
  console.log(`✅ Automated Visual Verification Audit Complete!`);
  console.log(`Total Sources Audited: ${summary.totalSources}`);
  console.log(`Verified Clean: ${summary.verifiedCount}`);
  console.log(`Shared / Thematic Reuses: ${summary.sharedCount}`);
  console.log(`Medium Mismatches: ${summary.mediumMismatchCount}`);
  console.log(`Missing Files: ${summary.missingFileCount}`);
  console.log(`Saved report to: ${outJsonPath}`);
  console.log(`========================================\n`);

  return summary;
}

if (require.main === module) {
  runAudit();
}

module.exports = { runAudit };

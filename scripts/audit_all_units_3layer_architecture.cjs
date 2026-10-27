const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'public', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const auditResults = [];

for (const [unitId, unitWrapper] of Object.entries(db)) {
  let unit = unitWrapper.data || unitWrapper;
  if (unit.data && unit.data.lessons) {
    unit = unit.data;
  }
  const lessons = unit.lessons || [];
  const lessonCount = lessons.length;

  let totalNarrativeBlocks = 0;
  let totalNarrativePlates = 0;
  let totalSources = 0;
  let sourcesWithVisual = 0;
  let sourcesWithBadges = 0;
  let sourcesWithNaturalAnswers = 0;
  let sourcesWithProvenance = 0;

  lessons.forEach((l) => {
    const blocks = l.narrative_blocks || [];
    totalNarrativeBlocks += blocks.length;

    blocks.forEach((b) => {
      // Standalone narrative visual plate
      if (b.image && !b.source_letter && !b.image_context) {
        totalNarrativePlates++;
      } else if (b.image && !b.source && !b.image_context) {
        totalNarrativePlates++;
      }
    });

    const sources = [];
    if (Array.isArray(l.sources) && l.sources.length > 0) {
      sources.push(...l.sources);
    } else if (blocks.length > 0) {
      blocks.forEach((b) => {
        if (b.source) sources.push(b.source);
        if (Array.isArray(b.sources)) sources.push(...b.sources);
      });
    }

    totalSources += sources.length;

    sources.forEach((s) => {
      if (s.image || s.src || s.plates) sourcesWithVisual++;
      if (s.question_badge || s.question_type) sourcesWithBadges++;
      if (s.model_answer && typeof s.model_answer === 'string' && s.model_answer.length > 15) {
        sourcesWithNaturalAnswers++;
      }
      if (s.provenance_clues || s.provenance_clue) sourcesWithProvenance++;
    });
  });

  const avgNarrativePlatesPerLesson = lessonCount > 0 ? (totalNarrativePlates / lessonCount).toFixed(1) : '0.0';
  const hasLayer2Plates = lessonCount > 0 && totalNarrativePlates >= lessonCount * 1.5; // ~2 per lesson
  const hasLayer3RotatedSources = lessonCount > 0 && totalSources >= lessonCount * 3 && sourcesWithBadges >= totalSources * 0.7;
  const hasLayer3ModelAnswers = lessonCount > 0 && sourcesWithNaturalAnswers >= totalSources * 0.7;

  let tier = 'TIER_3_NEEDS_UPGRADE';
  if (hasLayer2Plates && hasLayer3RotatedSources && hasLayer3ModelAnswers) {
    tier = 'TIER_1_COMPLETE_GOLD_STANDARD';
  } else if (hasLayer3RotatedSources && hasLayer3ModelAnswers && !hasLayer2Plates) {
    tier = 'TIER_2A_SOURCES_READY_MISSING_NARRATIVE_PLATES';
  } else if (hasLayer2Plates && (!hasLayer3RotatedSources || !hasLayer3ModelAnswers)) {
    tier = 'TIER_2B_NARRATIVE_PLATES_READY_MISSING_SOURCE_ROTATION';
  }

  auditResults.push({
    unitId,
    title: unit.title || unitId,
    lessonCount,
    totalNarrativeBlocks,
    totalNarrativePlates,
    avgNarrativePlatesPerLesson,
    totalSources,
    sourcesWithVisual,
    sourcesWithBadges,
    sourcesWithNaturalAnswers,
    sourcesWithProvenance,
    tier
  });
}

console.log(JSON.stringify(auditResults, null, 2));
fs.writeFileSync(path.join(__dirname, '..', 'public', 'data', 'three_layer_curriculum_audit.json'), JSON.stringify(auditResults, null, 2), 'utf8');

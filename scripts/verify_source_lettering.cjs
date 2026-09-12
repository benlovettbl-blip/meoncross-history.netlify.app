const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

/**
 * Universal Source Lettering & Sequencing Linter
 * Ensures across all units:
 * 1. Zero forbidden sub-indices (e.g., Source A2, B2, C1).
 * 2. Strictly sequential source lettering (Source A, Source B, Source C...).
 * 3. Zero duplicate source letters within any individual lesson.
 * 4. Zero skips in the lettering alphabet.
 * 5. Zero forbidden legacy phrases (e.g. "Source Detective").
 */
async function runLinter() {
  const targetUnitArg = process.argv[2];
  const unitsDir = path.resolve(__dirname, '../units');

  // List of active core curriculum units to validate
  const defaultUnits = [
    'cme_new',
    'early_modern_world',
    'great_war',
    'medieval_england',
    'industrialisation_and_empire',
    'edexcel_medicine',
    'weimar_germany',
    'eee',
    'cold_war',
    'usa',
  ];

  const unitsToAudit = targetUnitArg
    ? [targetUnitArg]
    : defaultUnits.filter((u) => fs.existsSync(path.join(unitsDir, u, 'data.js')));

  console.log('====================================================');
  console.log('📜 CURRICULUM SOURCE LETTERING & SEQUENCE LINTER');
  console.log('====================================================');
  console.log(`Auditing units: ${unitsToAudit.join(', ')}\n`);

  let totalErrors = 0;
  let totalSourcesAudited = 0;
  let totalLessonsAudited = 0;

  for (const unitId of unitsToAudit) {
    const dataPath = path.join(unitsDir, unitId, 'data.js');
    if (!fs.existsSync(dataPath)) {
      console.warn(`⚠️ Unit "${unitId}" has no data.js file, skipping.`);
      continue;
    }

    try {
      const mod = await import(pathToFileURL(dataPath).href);
      const unitData = mod.default || mod.unitData;
      if (!unitData || !Array.isArray(unitData.lessons)) {
        console.warn(`⚠️ Unit "${unitId}" exports no valid lessons array, skipping.`);
        continue;
      }

      console.log(`\n▶ Unit: [${unitId}] (${unitData.lessons.length} lessons)`);

      unitData.lessons.forEach((lesson, lIdx) => {
        totalLessonsAudited++;
        const lessonNum = lIdx + 1;
        const sourceEntries = [];

        // 1. Primary Source
        if (lesson.primary_source) {
          sourceEntries.push({
            location: 'lesson.primary_source',
            title: lesson.primary_source.title || '',
            caption: lesson.primary_source.caption || '',
          });
        }

        // 2. Narrative Blocks (sources, image_caption, images[])
        if (Array.isArray(lesson.narrative_blocks)) {
          lesson.narrative_blocks.forEach((block, bIdx) => {
            // Block written source
            if (block.source) {
              sourceEntries.push({
                location: `narrative_blocks[${bIdx}].source`,
                title: block.source.title || '',
                caption: block.source.caption || '',
              });
            }
            // Block single visual source caption
            if (block.image_caption) {
              sourceEntries.push({
                location: `narrative_blocks[${bIdx}].image_caption`,
                title: block.image_caption,
                caption: block.image_caption,
              });
            }
            // Block multiple images
            if (Array.isArray(block.images)) {
              block.images.forEach((img, imgIdx) => {
                const cap = img.caption || img.image_caption || '';
                if (cap) {
                  sourceEntries.push({
                    location: `narrative_blocks[${bIdx}].images[${imgIdx}]`,
                    title: cap,
                    caption: cap,
                  });
                }
              });
            }
          });
        }

        // 3. Lesson-level sources array (only add if not already mirrored in primary_source or narrative_blocks)
        if (Array.isArray(lesson.sources)) {
          lesson.sources.forEach((s, sIdx) => {
            const sTitle = (s.title || '').trim();
            const sLetterMatch = sTitle.match(/Source\s+([A-Z]\d?)\b/i);
            const sLetter = sLetterMatch ? sLetterMatch[1].toUpperCase() : null;

            // Check if this source letter is already present in sourceEntries
            const alreadyPresent = sourceEntries.some((existing) => {
              const exMatch = (existing.title || '').match(/Source\s+([A-Z]\d?)\b/i);
              return exMatch && exMatch[1].toUpperCase() === sLetter;
            });

            if (!alreadyPresent) {
              sourceEntries.push({
                location: `sources[${sIdx}]`,
                title: s.title || '',
                caption: s.caption || '',
              });
            }
          });
        }

        // Parse and audit source letters
        const parsedLetters = [];
        const seenLetters = new Map();

        sourceEntries.forEach((entry) => {
          totalSourcesAudited++;
          const textToCheck = `${entry.title} ${entry.caption}`;

          // Check forbidden phrase: "Source Detective"
          if (/Source\s*Detective/i.test(textToCheck)) {
            console.error(
              `  ❌ [${unitId} L${lessonNum}] Contains forbidden legacy phrase 'Source Detective' at ${entry.location}`,
            );
            totalErrors++;
          }

          // Check forbidden sub-indices like Source A1, Source A2, Source B2
          const subIndexMatch = textToCheck.match(/Source\s+([A-Z]\d+)\b/i);
          if (subIndexMatch) {
            console.error(
              `  ❌ [${unitId} L${lessonNum}] Forbidden sub-index found: "${subIndexMatch[0]}" at ${entry.location}`,
            );
            totalErrors++;
          }

          // Extract primary source letter: "Source A", "Source B", etc.
          // Require it to start with "Source X" or be at the start of a clause
          const letterMatches = [...textToCheck.matchAll(/(?:^|[^a-zA-Z0-9])Source\s+([A-Z])\b/gi)];
          letterMatches.forEach((m) => {
            const letter = m[1].toUpperCase();
            parsedLetters.push({
              letter,
              location: entry.location,
              snippet: entry.title.slice(0, 55).trim(),
            });
          });
        });

        // Check for duplicates
        parsedLetters.forEach((p) => {
          if (seenLetters.has(p.letter)) {
            const prev = seenLetters.get(p.letter);
            if (prev.location !== p.location) {
              console.error(
                `  ❌ [${unitId} L${lessonNum}] Duplicate 'Source ${p.letter}' found!\n` +
                  `       First at: ${prev.location} ("${prev.snippet}")\n` +
                  `       Second at: ${p.location} ("${p.snippet}")`,
              );
              totalErrors++;
            }
          } else {
            seenLetters.set(p.letter, p);
          }
        });

        // Check strictly sequential lettering (A, B, C...)
        const distinctLetters = Array.from(seenLetters.keys()).sort();
        if (distinctLetters.length > 0) {
          distinctLetters.forEach((letter, idx) => {
            const expectedLetter = String.fromCharCode(65 + idx);
            if (letter !== expectedLetter) {
              console.error(
                `  ❌ [${unitId} L${lessonNum}] Broken letter sequence! Expected 'Source ${expectedLetter}', but found 'Source ${letter}'. Full list: [${distinctLetters.join(
                  ', ',
                )}]`,
              );
              totalErrors++;
            }
          });
        }
      });
    } catch (err) {
      console.error(`🚨 Fatal error reading unit [${unitId}]:`, err.message);
      totalErrors++;
    }
  }

  console.log('\n====================================================');
  console.log(`Audited ${totalLessonsAudited} lessons across ${unitsToAudit.length} units.`);
  console.log(`Total source elements examined: ${totalSourcesAudited}`);

  if (totalErrors === 0) {
    console.log(
      `🎉 100% CLEAN: All sources have strictly sequential lettering (A, B, C...), zero sub-indices, and zero duplicates!`,
    );
    console.log('====================================================\n');
    process.exit(0);
  } else {
    console.error(
      `🚨 FAILED: Found ${totalErrors} source lettering error(s). Please review and fix the violations above.`,
    );
    console.log('====================================================\n');
    process.exit(1);
  }
}

runLinter();

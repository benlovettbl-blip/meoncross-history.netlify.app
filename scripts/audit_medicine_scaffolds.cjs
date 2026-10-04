const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../public/database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const medData = db['edexcel_medicine']?.data;

if (!medData || !Array.isArray(medData.lessons)) {
  console.error('Medicine unit not found in database.json');
  process.exit(1);
}

const lessons = medData.lessons;
console.log(`Found Medicine unit with ${lessons.length} lessons.`);

let totalBlocks = 0;
let totalTerms = 0;
let foundTerms = 0;
let missingTerms = [];

lessons.forEach((l, idx) => {
  const scaffold = l.note_scaffold;
  if (!scaffold || !Array.isArray(scaffold.blocks)) {
    console.log(`Lesson ${idx + 1} (${l.id}) MISSING scaffold!`);
    return;
  }

  // Gather full narrative text
  let fullText = (l.content || '') + ' ' + (l.overview || '') + ' ';
  if (Array.isArray(l.acts)) {
    l.acts.forEach((a) => {
      fullText += (a.title || '') + ' ' + (a.narrative || '') + ' ' + (a.content || '') + ' ';
    });
  }
  if (Array.isArray(l.narrative_sections)) {
    l.narrative_sections.forEach((s) => {
      fullText += (s.heading || '') + ' ' + (s.body || '') + ' ';
    });
  }
  if (Array.isArray(l.narrative_blocks)) {
    l.narrative_blocks.forEach((b) => {
      fullText += (b.title || '') + ' ' + (b.text || '') + ' ';
    });
  }
  if (Array.isArray(l.guided_reading)) {
    l.guided_reading.forEach((g) => {
      fullText +=
        (typeof g === 'string'
          ? g
          : (g.title || '') + ' ' + (g.text || '') + ' ' + (g.content || '')) + ' ';
    });
  }
  const lowerText = fullText.toLowerCase();

  scaffold.blocks.forEach((b, bIdx) => {
    totalBlocks++;
    const terms = Array.isArray(b.key_terms) ? b.key_terms : [];
    terms.forEach((term) => {
      totalTerms++;
      // Clean term: remove dates like (1847), remove quotes, punctuation
      const cleanTerm = term
        .toLowerCase()
        .replace(/\(\d{4}[^)]*\)/g, '')
        .replace(/['"’]/g, '')
        .trim();
      const words = cleanTerm.split(/\s+/).filter((w) => w.length > 3);

      const exactMatch = lowerText.includes(cleanTerm);
      const allWordsMatch =
        words.length > 0 &&
        words.every((w) => {
          // check word or word stem (e.g. flagellat for flagellants/flagellation)
          const stem = w.slice(0, -1);
          return lowerText.includes(w) || (stem.length >= 4 && lowerText.includes(stem));
        });

      if (exactMatch || allWordsMatch) {
        foundTerms++;
      } else {
        missingTerms.push({
          lesson: l.id,
          title: l.title,
          block: b.title,
          term: term,
          tested: cleanTerm,
        });
      }
    });
  });
});

console.log(`\n========================================`);
console.log(`AUDIT RESULTS:`);
console.log(`Total Lessons: ${lessons.length}`);
console.log(`Total Enquiry Blocks: ${totalBlocks}`);
console.log(`Total Must-Use Key Terms: ${totalTerms}`);
console.log(
  `Terms Verified in Lesson Narrative: ${foundTerms} / ${totalTerms} (${Math.round((foundTerms / totalTerms) * 100)}%)`,
);
console.log(`========================================\n`);

if (missingTerms.length > 0) {
  console.log(`Terms not directly found in narrative (${missingTerms.length}):`);
  missingTerms.forEach((m) => {
    console.log(`- [${m.lesson}] "${m.term}" in "${m.block}"`);
  });
} else {
  console.log('✅ ALL keywords are 100% verified in lesson narratives!');
}

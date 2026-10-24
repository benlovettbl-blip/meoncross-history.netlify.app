const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'early_modern_world', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'early_modern_world.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const EMW_PEDAGOGY = {
  match: /The East Offering its Riches to Britannia/i,
  hinge_question:
    "How does Spiridione Roma's ceiling painting use classical allegory to present aggressive corporate exploitation as a voluntary, harmonious offering of tribute to Britannia?",
  discussion_ideas: [
    'Allegorical Whitewashing of Armed Corporate Extraction: Spiridione Roma depicts figures representing India, China, and Africa kneeling respectfully before an enthroned Britannia, offering pearls, tea, porcelain, and silk; this idealized classical tableau masks the violent reality of East India Company military conquest, extortion, and monopoly trade, framing imperial subjugation as a harmonious, voluntary submission of foreign civilizations to British naval majesty.',
    'Corporate Self-Image at East India House: Commissioned specifically for the Revenue Committee Room at East India House in Leadenhall Street, the painting hovered directly over the directors as they calculated tax revenues extracted from Bengal; it served as ideological propaganda to reassure Company directors and British elites that their commercial plunder was a civilized, noble duty that brought Enlightenment order and prosperity to the globe.',
  ],
};

async function main() {
  console.log('🚀 Starting Early Modern World Enrichment...');

  // Load from data.js
  const fileUrl = pathToFileURL(dataJsPath).href;
  const dataModule = await import(fileUrl);
  const unitData = dataModule.default || dataModule.unitData;

  let totalUpdated = 0;

  unitData.lessons.forEach((l) => {
    (l.sources || []).forEach((s, idx) => {
      if (s && s.title && EMW_PEDAGOGY.match.test(s.title)) {
        s.hinge_question = EMW_PEDAGOGY.hinge_question;
        s.discussion_ideas = EMW_PEDAGOGY.discussion_ideas;
        totalUpdated++;
        console.log(
          `  ✅ [${l.id} l.sources ${idx}] "${s.title}" -> ${EMW_PEDAGOGY.discussion_ideas.length} idea(s)`,
        );
      }
    });

    (l.narrative_blocks || []).forEach((b, idx) => {
      if (b.source && b.source.title && EMW_PEDAGOGY.match.test(b.source.title)) {
        b.source.hinge_question = EMW_PEDAGOGY.hinge_question;
        b.source.discussion_ideas = EMW_PEDAGOGY.discussion_ideas;
        totalUpdated++;
        console.log(
          `  ✅ [${l.id} narrative ${idx}] "${b.source.title}" -> ${EMW_PEDAGOGY.discussion_ideas.length} idea(s)`,
        );
      }
    });
  });

  console.log(`\n🎉 Total sources updated across Early Modern World: ${totalUpdated}`);

  // 1. Write back to units/early_modern_world/data.js
  const serialized = JSON.stringify(unitData, null, 2);
  const jsContent = `const early_modern_world = ${serialized};\nexport const unitData = early_modern_world;\nexport default early_modern_world;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = early_modern_world;\n}\n`;
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/early_modern_world/data.js');

  // 2. Write to public/data/early_modern_world.json
  const pubData = { id: 'early_modern_world', data: unitData };
  fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
  console.log('✅ Successfully updated public/data/early_modern_world.json');

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.early_modern_world) {
      db.early_modern_world.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated early_modern_world in public/database.json');
    }
  }

  console.log('\n🏁 Completed Early Modern World enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});

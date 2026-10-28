const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const canonicalUnits = [
  'edexcel_medicine',
  'usa',
  'australia',
  'cme_new',
  'cold_war',
  'eee',
  'first_british_empire',
  'great_war',
  'great_war_part2',
  'industrialisation_and_empire',
  'ks2_ww2',
  'medieval_england',
  'monarchy_religion_power',
  'post_war_britain',
  'second_british_empire',
  'the_shoah',
  'water_and_sanitation',
  'weimar_nazi_germany'
];

function cleanHingeText(raw) {
  if (!raw || typeof raw !== 'string') return '';
  return raw
    .replace(/^\s*\*{0,2}(?:Hinge Question|Discussion Prompt|Discussion Question|Question):\*{0,2}\s*/i, '')
    .trim();
}

function processUnit(unitId) {
  const jsonPath = path.join(ROOT_DIR, 'public', 'data', `${unitId}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.warn(`File not found: ${jsonPath}`);
    return;
  }

  const rawJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const unitData = rawJson.data || rawJson;
  const lessons = unitData.lessons || [];

  let count = 0;
  let fixedHinge = 0;
  let fixedContext = 0;

  lessons.forEach((l) => {
    if (!l.sources) return;
    const sources = Array.isArray(l.sources) ? l.sources : Object.values(l.sources);

    sources.forEach((s) => {
      count++;

      // 1. Identify or extract hinge question
      let hinge = s.hinge_question ? cleanHingeText(s.hinge_question) : '';

      if (!hinge && s.provenance_clues && s.provenance_clues.hinge_question) {
        hinge = cleanHingeText(s.provenance_clues.hinge_question);
      }

      if (!hinge && s.teacher_notes && s.teacher_notes.source_context) {
        const m = s.teacher_notes.source_context.match(/\*{0,2}(?:Hinge Question|Discussion Prompt|Discussion Question|Question):\*{0,2}\s*([\s\S]*)$/i);
        if (m) {
          hinge = cleanHingeText(m[1]);
        }
      }

      if (!hinge && s.source_context) {
        const m = s.source_context.match(/\*{0,2}(?:Hinge Question|Discussion Prompt|Discussion Question|Question):\*{0,2}\s*([\s\S]*)$/i);
        if (m) {
          hinge = cleanHingeText(m[1]);
        }
      }

      if (!hinge) {
        // Fallback to enquiry question if no hinge prompt exists
        hinge = cleanHingeText(s.enquiry_question || s.question || `How does this source provide evidence for the key turning points of this enquiry?`);
      }

      s.hinge_question = hinge;
      fixedHinge++;

      // 2. Format source_context
      let baseContext = '';
      if (s.teacher_notes && s.teacher_notes.source_context) {
        const parts = s.teacher_notes.source_context.split(/\*{0,2}(?:Hinge Question|Discussion Prompt|Discussion Question|Question):\*{0,2}/i);
        baseContext = parts[0].trim();
      } else if (s.source_context) {
        const parts = s.source_context.split(/\*{0,2}(?:Hinge Question|Discussion Prompt|Discussion Question|Question):\*{0,2}/i);
        baseContext = parts[0].trim();
      } else if (s.context) {
        const parts = s.context.split(/\*{0,2}(?:Hinge Question|Discussion Prompt|Discussion Question|Question):\*{0,2}/i);
        baseContext = parts[0].trim();
      } else {
        baseContext = (s.caption || s.attribution || s.title || '').trim();
      }

      // Ensure baseContext does not end with trailing punctuation/asterisks
      baseContext = baseContext.replace(/\*+$/, '').trim();

      const fullSourceContext = `${baseContext} **Hinge Question:** ${hinge}`;
      s.source_context = fullSourceContext;
      fixedContext++;

      // 3. Ensure teacher_notes has source_context
      if (!s.teacher_notes || typeof s.teacher_notes !== 'object') {
        s.teacher_notes = {};
      }
      s.teacher_notes.source_context = fullSourceContext;

      // 4. Also keep provenance_clues.hinge_question in sync if present
      if (s.provenance_clues && typeof s.provenance_clues === 'object') {
        s.provenance_clues.hinge_question = hinge;
      }
    });
  });

  // Save back to JSON files
  fs.writeFileSync(jsonPath, JSON.stringify(rawJson, null, 2), 'utf8');

  const altJsonPath = path.join(ROOT_DIR, 'data', `${unitId}.json`);
  if (fs.existsSync(altJsonPath)) {
    fs.writeFileSync(altJsonPath, JSON.stringify(rawJson, null, 2), 'utf8');
  }

  // Save back to JS files
  const exportVarName = `${unitId}_data`;
  let jsContent = '';
  if (unitId === 'usa') {
    jsContent = `const usa_data = ${JSON.stringify(unitData, null, 2)};\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = usa_data;\n}\nexport default usa_data;\nexport { usa_data };\n`;
  } else if (unitId === 'edexcel_medicine') {
    jsContent = `const edexcel_medicine_data = ${JSON.stringify(unitData, null, 2)};\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = edexcel_medicine_data;\n}\nexport default edexcel_medicine_data;\n`;
  } else {
    jsContent = `const ${exportVarName} = ${JSON.stringify(unitData, null, 2)};\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = ${exportVarName};\n}\nexport default ${exportVarName};\n`;
  }

  const unitsJsPath = path.join(ROOT_DIR, 'units', unitId, 'data.js');
  if (fs.existsSync(unitsJsPath)) {
    fs.writeFileSync(unitsJsPath, jsContent, 'utf8');
  }

  const publicUnitsJsPath = path.join(ROOT_DIR, 'public', 'units', unitId, 'data.js');
  if (fs.existsSync(publicUnitsJsPath)) {
    fs.writeFileSync(publicUnitsJsPath, jsContent, 'utf8');
  }

  console.log(`✅ ${unitId}: Processed ${count} sources (${fixedHinge} hinges, ${fixedContext} contexts synchronized).`);
}

console.log('🚀 Standardizing Hinge Questions and Source Context across canonical units...');
canonicalUnits.forEach(processUnit);

// Synchronize database.json and public/database.json
function updateMasterDatabase(dbRelPath) {
  const fullPath = path.join(ROOT_DIR, dbRelPath);
  if (!fs.existsSync(fullPath)) return;
  const db = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  canonicalUnits.forEach((u) => {
    const jsonPath = path.join(ROOT_DIR, 'public', 'data', `${u}.json`);
    if (fs.existsSync(jsonPath) && db[u]) {
      const uData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      db[u].data = uData.data || uData;
    }
  });

  fs.writeFileSync(fullPath, JSON.stringify(db, null, 2), 'utf8');
  console.log(`✅ Synchronized ${dbRelPath}`);
}

updateMasterDatabase('database.json');
updateMasterDatabase('public/database.json');

console.log('🎉 All canonical units standardized with top-level Hinge Questions and Source Context!');

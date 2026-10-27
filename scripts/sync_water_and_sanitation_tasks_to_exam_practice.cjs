const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataFilePath = path.join(ROOT_DIR, 'units', 'water_and_sanitation', 'data.js');

// Load original data
const rawDataContent = fs.readFileSync(dataFilePath, 'utf8');
const cleanJsonMatch = rawDataContent.match(/export\s+const\s+water_and_sanitationData\s*=\s*(\{[\s\S]*\});\s*export\s+default\s+water_and_sanitationData;/);
if (!cleanJsonMatch) {
  throw new Error('Could not parse units/water_and_sanitation/data.js JSON structure');
}
const unitData = JSON.parse(cleanJsonMatch[1]);

unitData.lessons.forEach((l, idx) => {
  const primaryTask = (l.tasks && l.tasks[0]) || {};
  if (!primaryTask.question) return;

  const scaffolding = primaryTask.scaffolding || {};
  const strip = scaffolding.structure_strip || [];

  l.exam_practice = {
    title: `Key Stage 3 Disciplinary Writing: Enquiry ${idx + 1}`,
    tariff: primaryTask.topic || '12 marks (Explain Why Causal Analysis)',
    questions: [
      {
        tariff: '12 marks',
        type: 'explain_why_12m',
        question: primaryTask.question,
        stimulus: primaryTask.stimulus || [],
        prompt: scaffolding.guidance || 'Structure your 3-paragraph response using PEEL.',
        model: primaryTask.model_answer || '',
        scaffolding: {
          acronym: '3-Paragraph Causal Analysis (PEEL)',
          acronym_title: '12-Mark Explain Why Standard',
          steps: strip.map((s, sIdx) => ({
            letter: s.col ? s.col.split('.')[0].trim() : `P${sIdx + 1}`,
            name: s.col ? s.col.split('.').slice(1).join('.').trim() || s.col : `Paragraph ${sIdx + 1}`,
            prompt: s.prompt || '',
            starter: s.starter || ''
          })),
          sentence_starters: strip.map(s => s.starter).filter(Boolean),
          connectives_bank: (l.vocabulary || []).map(v => v.term)
        }
      }
    ]
  };
});

// Serialize back to units/water_and_sanitation/data.js
const serialized = `export const water_and_sanitationData = ${JSON.stringify(unitData, null, 2)};\nexport default water_and_sanitationData;\n`;
fs.writeFileSync(dataFilePath, serialized, 'utf8');
console.log('✅ Successfully synchronized all 7 lessons of Water & Sanitation with standardized exam_practice!');

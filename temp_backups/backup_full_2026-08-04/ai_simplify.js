const fs = require('fs');
const path = require('path');

const unitDir = process.argv[2];
if (!unitDir) {
  console.error("Please provide a unit directory as an argument (e.g., node ai_simplify.js great_war)");
  process.exit(1);
}

const dataFile = path.join(unitDir, 'data.js');
if (!fs.existsSync(dataFile)) {
  console.error(`File not found: ${dataFile}`);
  process.exit(1);
}

const apiKey = process.env.GEMINI_API_KEY;

async function simplifyText(originalText) {
  if (!apiKey) {
    // Fallback: extract the first and last sentences (heuristic approach)
    const sentences = originalText.match(/[^.!?]+[.!?]+/g) || [originalText];
    if (sentences.length <= 2) {
      return originalText;
    }
    return sentences[0].trim() + ' ' + sentences[sentences.length - 1].trim();
  }

  // Real LLM call using fetch (Node 18+)
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{
        parts: [{
          text: `Rewrite the following historical text so it is easily understood by an 8-year-old student. Keep all key facts but use very simple vocabulary and short sentences.\n\nText:\n${originalText}`
        }]
      }]
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    
    if (json.candidates && json.candidates.length > 0) {
      return json.candidates[0].content.parts[0].text.trim();
    }
    return originalText;
  } catch (error) {
    console.error("LLM Error:", error);
    return originalText; // fallback
  }
}

async function run() {
  console.log(`Starting AI Simplification for ${unitDir}...`);
  if (!apiKey) {
    console.warn("WARNING: No GEMINI_API_KEY found in environment. Running in MOCK mode.");
  }

  let dataContent = fs.readFileSync(dataFile, 'utf8');
  // Load data
  let unitData;
  const script = `
    (() => {
      ${dataContent.replace('export const unitData =', 'const unitData =')}
      return unitData;
    })();
  `;
  try {
    unitData = eval(script);
  } catch(e) {
    console.error("Failed to parse data.js", e);
    process.exit(1);
  }

  // Process blocks
  let blocksSimplified = 0;
  for (const lesson of unitData.lessons) {
    if (lesson.narrative_blocks) {
      for (const block of lesson.narrative_blocks) {
        if (block.text && !block.text.includes('<img') && !block.text.includes('<div')) {
          const simplified = await simplifyText(block.text);
          block.level_4 = simplified;
          blocksSimplified++;
          process.stdout.write('.');
        }
      }
    }
  }

  console.log(`\nProcessed ${blocksSimplified} narrative blocks.`);
  fs.writeFileSync(dataFile, 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n');
  console.log(`Updated ${dataFile}`);
}

run();

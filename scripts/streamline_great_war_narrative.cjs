const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const textbookScriptPath = path.join(ROOT_DIR, 'scripts', 'render_standard_textbook_great_war.cjs');
const dataJsPath = path.join(ROOT_DIR, 'units', 'great_war', 'data.js');
const dataV2Path = path.join(ROOT_DIR, 'units', 'great_war', 'data_v2_4act.js');

// 1. Extract getGreatWarLessonSections from textbook script
const tbContent = fs.readFileSync(textbookScriptPath, 'utf8');
const startIdx = tbContent.indexOf('function getGreatWarLessonSections');
const endIdx = tbContent.indexOf('async function buildPublisherTextbookHtmlGreatWar');
const fnCode = tbContent.substring(startIdx, endIdx).trim();
eval(fnCode);

function formatText(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function convertToHtmlText(rawText) {
  if (!rawText) return '';
  const paras = rawText
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);
  return paras.map((p) => formatText(p)).join('<br><br>');
}

const actPrefixes = [
  'Act 1: Context & Catalyst',
  'Act 2: Tension & Escalation',
  'Act 3: Crisis & Decision',
  'Act 4: Consequence & Legacy',
];

async function updateFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('Skipping non-existent file:', filePath);
    return;
  }

  const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const data = mod.default || mod.unitData;

  console.log(`\n======================================================`);
  console.log(`Processing: ${path.relative(ROOT_DIR, filePath)}`);
  console.log(`======================================================`);

  data.lessons.forEach((lesson, lIdx) => {
    const secs = getGreatWarLessonSections(lesson, lIdx);
    if (!secs || secs.length < 4) {
      console.warn(`Lesson ${lIdx + 1} has insufficient sections in textbook bank.`);
      return;
    }

    if (!lesson.narrative_blocks) lesson.narrative_blocks = [];

    let lessonWordCount = 0;

    for (let actIdx = 0; actIdx < 4; actIdx++) {
      const sec = secs[actIdx];
      const htmlText = convertToHtmlText(sec.text);
      const cleanWords = htmlText
        .replace(/<[^>]+>/g, ' ')
        .split(/\s+/)
        .filter(Boolean).length;
      lessonWordCount += cleanWords;

      if (!lesson.narrative_blocks[actIdx]) {
        lesson.narrative_blocks[actIdx] = { act: actIdx + 1 };
      }

      const block = lesson.narrative_blocks[actIdx];
      block.act = actIdx + 1;
      block.title = `${actPrefixes[actIdx]} (${sec.title})`;
      block.text = htmlText;
    }

    console.log(
      `✅ Lesson ${lIdx + 1} [${lesson.title.slice(0, 40)}...]: Streamlined to ${lessonWordCount} words across 4 Acts.`,
    );
  });

  // Re-serialize back to JavaScript
  let outputJs = '';
  if (filePath.endsWith('data_v2_4act.js')) {
    outputJs = `const great_war = ${JSON.stringify(data, null, 2)};\n\nexport default great_war;\nexport const unitData = great_war;\nif (typeof module !== 'undefined' && module.exports) module.exports = great_war;\n`;
  } else {
    outputJs = `const great_war = ${JSON.stringify(data, null, 2)};\n\nexport default great_war;\nexport const unitData = great_war;\nif (typeof module !== 'undefined' && module.exports) module.exports = great_war;\n`;
  }

  fs.writeFileSync(filePath, outputJs, 'utf8');
  console.log(`🎉 Successfully written updated narrative to ${path.relative(ROOT_DIR, filePath)}`);
}

async function run() {
  await updateFile(dataJsPath);
  await updateFile(dataV2Path);
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

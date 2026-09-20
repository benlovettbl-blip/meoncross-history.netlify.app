const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const canonicalPath = path.join(ROOT_DIR, 'units', 'cme_new', 'data.js');
const publicPath = path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'data.js');

async function run() {
  console.log('Loading units/cme_new/data.js...');
  const fileUrl = 'file:///' + canonicalPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unitData = mod.unitData || mod.default;

  if (!unitData || !unitData.lessons) {
    throw new Error('Failed to load unitData from ' + canonicalPath);
  }

  let totalSourcesConverted = 0;
  let totalTasksUpdated = 0;

  unitData.lessons.forEach((lesson, lIdx) => {
    // 1. Process top-level sources
    if (lesson.sources && Array.isArray(lesson.sources)) {
      lesson.sources.forEach((s) => {
        if (s.question) {
          const cleanQ = s.question
            .replace(/^Source Detective[:.]?\s*/i, '')
            .replace(/^Q\d+[\.\:]\s*/i, '')
            .trim();
          s.hinge_question = s.hinge_question || cleanQ;
          delete s.question;
          delete s.qNum;
          totalSourcesConverted++;
        }
      });
    }

    // 2. Process narrative blocks
    if (lesson.narrative_blocks && Array.isArray(lesson.narrative_blocks)) {
      lesson.narrative_blocks.forEach((b) => {
        // Source in block
        if (b.source) {
          if (b.source.question) {
            const cleanQ = b.source.question
              .replace(/^Source Detective[:.]?\s*/i, '')
              .replace(/^Q\d+[\.\:]\s*/i, '')
              .trim();
            b.source.hinge_question = b.source.hinge_question || cleanQ;
            delete b.source.question;
            delete b.source.qNum;
            totalSourcesConverted++;
          }
        }

        // Tasks in block
        if (b.tasks && Array.isArray(b.tasks)) {
          b.tasks.forEach((t) => {
            let qText = t.question || t.text || '';
            let modified = false;

            // Pattern 1: "Using paragraphs [X] and [Y] and Source A," -> "Using paragraphs [X] and [Y],"
            qText = qText.replace(
              /Using\s+paragraphs\s+([^,]+?)\s+and\s+Source\s+[A-Z],/gi,
              'Using paragraphs $1,',
            );

            // Pattern 2: "Using Source [A-Z] and paragraphs [X]...[Y]," -> "Using paragraphs [X]...[Y],"
            qText = qText.replace(
              /Using\s+(?:the\s+)?Source\s+[A-Z]\s+and\s+paragraphs\s+([^,]+?),/gi,
              'Using paragraphs $1,',
            );

            // Pattern 3: "Study Source [A-Z]..." in a task -> remove
            qText = qText.replace(/^Study\s+Source\s+[A-Z][\.\:]\s*/i, '');

            // Pattern 4: Any other trailing / embedded "and Source [A-Z]"
            qText = qText.replace(/\s+and\s+Source\s+[A-Z]/gi, '');
            qText = qText.replace(/Source\s+[A-Z]\s+and\s+/gi, '');

            // Specific touchups for KT2
            if (qText.includes('list the five territories captured by Israel in June 1967')) {
              qText = qText.replace(
                'list the five territories captured by Israel in June 1967',
                'identify the five territories captured by Israel in June 1967',
              );
              modified = true;
            }

            if (t.title) {
              if (t.title.includes('Task 2: Source Analysis — The Golan Heights Frontier')) {
                t.title = 'Task 2: Strategic Analysis — The Golan Heights Frontier';
                modified = true;
              }
              if (
                t.title.includes('Task 2: Primary Source Annotation — The Khartoum Declaration')
              ) {
                t.title =
                  'Task 2: Diplomatic Analysis — The Khartoum Declaration ("The Three Noes")';
                modified = true;
              }
              if (
                t.title.includes('Task 3: Forensic Source Analysis — The Munich Olympics Attack')
              ) {
                t.title = 'Task 3: International Crisis Analysis — The Munich Olympics Attack';
                modified = true;
              }
            }

            if (qText !== (t.question || t.text || '')) {
              modified = true;
            }

            if (modified) {
              if (t.question) t.question = qText;
              if (t.text) t.text = qText;
              totalTasksUpdated++;
            }
          });
        }
      });
    }
  });

  console.log(`Converted ${totalSourcesConverted} source questions to hinge questions.`);
  console.log(`Updated ${totalTasksUpdated} task prompts to remove source dependencies.`);

  const outputCode =
    'export const unitData = ' +
    JSON.stringify(unitData, null, 2) +
    ';\nexport default unitData;\n';

  fs.writeFileSync(canonicalPath, outputCode, 'utf8');
  console.log('Saved to canonical path:', canonicalPath);

  fs.writeFileSync(publicPath, outputCode, 'utf8');
  console.log('Saved to public path:', publicPath);
}

run().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});

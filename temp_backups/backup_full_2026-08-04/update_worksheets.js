const fs = require('fs');
let code = fs.readFileSync('water_and_sanitation/generate_worksheets.js', 'utf8');

// 1. Update source rendering
const oldSourceCode = `  // Render Sources
  if (lesson.sources && lesson.sources.length > 0) {
    lesson.sources.forEach(source => {
      if(source.src) {
        let src = source.src.startsWith('../') || source.src.startsWith('http') ? source.src : \`../water_and_sanitation/\${source.src}\`;
        html += \`
          <div class="source-container" style="page-break-inside: avoid;">
            \${source.title ? \`<strong>\${source.title}</strong><br>\` : ''}
            <img src="\${src}" alt="Source">
            \${source.caption ? \`<div class="source-caption">\${source.caption}</div>\` : ''}
          </div>
        \`;
      }
    });
  }`;

const newSourceCode = `  // Render Sources
  if (lesson.sources && lesson.sources.length > 0) {
    lesson.sources.forEach(source => {
      let imgTag = '';
      if(source.src) {
        let src = source.src.startsWith('../') || source.src.startsWith('http') ? source.src : \`../water_and_sanitation/\${source.src}\`;
        imgTag = \`<img src="\${src}" alt="Source">\`;
      }
      html += \`
        <div class="source-container" style="page-break-inside: avoid; margin-bottom: 20px;">
          \${source.title ? \`<strong>\${source.title}</strong><br>\` : ''}
          \${imgTag}
          \${source.caption ? \`<div class="source-caption" style="text-align: left; margin-top: 10px;">\${source.caption}</div>\` : ''}
        </div>
      \`;
    });
  }`;

code = code.replace(oldSourceCode, newSourceCode);

// 2. Add Printed Workbook Vocabulary Tasks
const targetLocation = `  // Render Do Now
  if (lesson.do_now) {`;

const newVocabCode = `  // Render Vocabulary (Tier 3)
  const vocabTerms = lesson.vocab ? lesson.vocab : (lesson.glossary ? Object.keys(lesson.glossary).map(k => ({term: k, definition: lesson.glossary[k]})) : []);
  if (vocabTerms && vocabTerms.length > 0) {
    const vocabStyle = lessonIndex % 3;
    html += \`<div class="task-box" style="margin-bottom: 20px; page-break-inside: avoid;">\`;
    html += \`<h3 style="margin-top: 0;">Tier 3 Vocabulary Pre-Teaching</h3>\`;
    
    if (vocabStyle === 0) {
      // Contextual Cloze
      html += \`<p><strong>Task:</strong> Fill in the blanks using the vocabulary words below:</p>\`;
      html += \`<div style="padding: 10px; border: 1px dashed #333; margin-bottom: 15px; font-weight: bold; text-align: center;">\${vocabTerms.map(v => v.term).join(' | ')}</div>\`;
      html += \`<div class="task-lines-large"></div><div class="task-lines-large"></div>\`;
    } else if (vocabStyle === 1) {
      // Vocabulary Mapping
      html += \`<p><strong>Task:</strong> Write a historically accurate sentence connecting two of the terms below.</p>\`;
      html += \`<div style="padding: 10px; border: 1px dashed #333; margin-bottom: 15px; font-weight: bold; text-align: center;">\${vocabTerms.map(v => v.term).join(' | ')}</div>\`;
      html += \`<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>\`;
    } else {
      // Mini-Frayer Model
      const termToUse = vocabTerms[0].term;
      html += \`<p><strong>Task:</strong> Complete the Frayer model grid for the word: <strong>\${termToUse}</strong></p>\`;
      html += \`
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; text-align: center;">
          <tr>
            <td style="border: 2px solid #333; padding: 10px; width: 50%; height: 80px; vertical-align: top;"><strong>Definition</strong></td>
            <td style="border: 2px solid #333; padding: 10px; width: 50%; height: 80px; vertical-align: top;"><strong>Historical Example</strong></td>
          </tr>
          <tr>
            <td style="border: 2px solid #333; padding: 10px; width: 50%; height: 80px; vertical-align: top;"><strong>Sketch / Symbol</strong></td>
            <td style="border: 2px solid #333; padding: 10px; width: 50%; height: 80px; vertical-align: top;"><strong>Non-Example</strong></td>
          </tr>
        </table>
      \`;
    }
    html += \`</div>\`;
  }

  // Render Do Now
  if (lesson.do_now) {`;

code = code.replace(targetLocation, newVocabCode);

// We need to make sure we have access to lessonIndex
code = code.replace(`unitData.lessons.forEach(lesson => {`, `unitData.lessons.forEach((lesson, lessonIndex) => {`);

fs.writeFileSync('water_and_sanitation/generate_worksheets.js', code);
console.log('generate_worksheets updated successfully');

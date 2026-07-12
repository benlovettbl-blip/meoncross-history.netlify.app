import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/great_war/generate_worksheets.js';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the loop signature
content = content.replace('unitData.lessons.forEach(lesson => {', 'unitData.lessons.forEach((lesson, lessonIndex) => {');

// Inject the vocab task right before "// Render Narrative"
const hookStr = '  // Render Narrative';
const injectStr = `
  // Render Vocab Pre-Teach Task (Rotated)
  if (lesson.vocab && lesson.vocab.length > 0) {
    const vocabStyle = lessonIndex % 3; 
    
    html += \`<div class="task-box"><h3>Vocabulary Focus</h3>\`;
    
    if (vocabStyle === 0) {
      // Contextual Cloze
      html += \`<p><strong>Task:</strong> Fill in the blanks in the summary below using the correct words from the word bank.</p>\`;
      const words = lesson.vocab.map(v => v.term).join(' &nbsp; | &nbsp; ');
      html += \`<div style="border: 1px dashed #666; padding: 10px; text-align: center; font-weight: bold; margin-bottom: 15px; background: #fff;">Word Bank: \${words}</div>\`;
      let clozeHtml = lesson.vocab_cloze_text || "";
      clozeHtml = clozeHtml.replace(/\\[.*?\\]/g, '______________________');
      html += \`<p style="line-height: 2.5; font-size: 13pt;">\${clozeHtml}</p>\`;
    } else if (vocabStyle === 1) {
      // Vocabulary Mapping
      html += \`<p><strong>Task:</strong> Read the key terms and their definitions. Choose <strong>two</strong> terms and write a single, historically accurate sentence that connects them.</p>\`;
      html += \`<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px; background: #fff;">\`;
      lesson.vocab.forEach(v => {
        html += \`<div style="margin-bottom: 5px;"><strong>\${v.term}:</strong> \${v.definition}</div>\`;
      });
      html += \`</div>\`;
      html += \`<div class="task-lines"></div><div class="task-lines"></div>\`;
    } else if (vocabStyle === 2) {
      // Mini-Frayer Model
      html += \`<p><strong>Task:</strong> Complete the Frayer Models for the key concepts below. Write the definition, one historical example, and one non-example (or a sketch).</p>\`;
      const wordsToFrayer = lesson.vocab.slice(0, 2);
      wordsToFrayer.forEach(v => {
        html += \`<div style="margin-top: 15px;"><strong>Concept: \${v.term}</strong></div>\`;
        html += \`
          <table style="width: 100%; border-collapse: collapse; margin-top: 5px; background: #fff;">
            <tr>
              <td style="border: 2px solid #000; width: 50%; height: 80px; padding: 8px; vertical-align: top;"><strong>Definition:</strong><br><span style="color:#666; font-size:10pt;">\${v.definition}</span></td>
              <td style="border: 2px solid #000; width: 50%; height: 80px; padding: 8px; vertical-align: top;"><strong>Historical Example:</strong></td>
            </tr>
            <tr>
              <td style="border: 2px solid #000; width: 50%; height: 80px; padding: 8px; vertical-align: top;"><strong>Characteristics:</strong></td>
              <td style="border: 2px solid #000; width: 50%; height: 80px; padding: 8px; vertical-align: top;"><strong>Non-example / Sketch:</strong></td>
            </tr>
          </table>
        \`;
      });
    }
    html += \`</div>\`;
  }

  // Render Narrative`;

content = content.replace(hookStr, injectStr);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully patched great_war/generate_worksheets.js");

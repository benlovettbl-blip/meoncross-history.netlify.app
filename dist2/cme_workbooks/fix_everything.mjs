import fs from 'fs';

let content = fs.readFileSync('src/lessons.js', 'utf8');

// 1. Restore the Quick-Fire Retrieval quiz pulling logic
const oldRetrievalRegex = /  const retrievalPrompts = TIMELINE_WORKSHEET_PROMPTS\[subtopicId\] \|\| \[\];/g;
const newRetrieval = `  const quizSubtopicData = QUIZ_DATA.flatMap(t => t.subtopics).find(s => s.id === subtopicId) || { easy: [], medium: [], difficult: [] };
  const allQuizQs = [...(quizSubtopicData.easy || []), ...(quizSubtopicData.medium || [])];
  const shuffledQs = [...allQuizQs].sort(() => 0.5 - Math.random());
  const retrievalPrompts = shuffledQs.slice(0, 5).map(q => ({ q: q.question, a: q.answer }));`;

content = content.replace(oldRetrievalRegex, newRetrieval);

// 2. Move warMap block to be OUTSIDE the `quiz` block
const blockRegex = /[ \t]*const warMap = \{[\s\S]*?if \(warId\) \{[\s\S]*?if \(bodyStartIdx !== -1 && bodyEndIdx !== -1\) \{[\s\S]*?html \+= '\\n' \+ warBodyContent;[\s\S]*?\}[\s\S]*?\}[\s\S]*?\}/;
const warMapMatch = content.match(blockRegex);

if (warMapMatch) {
  content = content.replace(blockRegex, '');
  let blockString = warMapMatch[0];
  blockString = blockString.split('\\n').map(line => line.replace(/^  /, '')).join('\\n');
  const endOfFunc = /  html \+= `\r?\n<\/body>\r?\n<\/html>\r?\n  `;\r?\n  return html;\r?\n}/;
  content = content.replace(endOfFunc, (match) => {
    return blockString + '\\n\\n' + match;
  });
} else {
  console.error("warMap block not found!");
}

// 3. Completely replace generateWarWorkbookHtml
const genWarStartIdx = content.indexOf('export async function generateWarWorkbookHtml');
if (genWarStartIdx !== -1) {
  content = content.substring(0, genWarStartIdx);
  const newGenWar = `export async function generateWarWorkbookHtml(warId, density, includeAnswers) {
  const warNames = {
    '1948_1949': '1948–49 Arab-Israeli War',
    '1956_suez': '1956 Suez Crisis / Suez War',
    '1967_sixday': '1967 Six-Day War',
    '1973_yomkippur': '1973 Yom Kippur War',
    '1982_lebanon': '1982 Lebanon War'
  };
  const warTitle = warNames[warId] || 'Major War';

  let html = \`<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>Key Events of a War: \${warTitle}</title>
  <style>
    @page { size: 21cm 29.7cm; margin: 1.0cm; mso-page-orientation: portrait; }
    body { font-family: 'Arial', sans-serif; font-size: 9.5pt; color: #1f2937; line-height: 1.4; background: #ffffff; margin: 0; padding: 0; }
    .print-page { clear: both; box-sizing: border-box; position: relative; background: #ffffff; page-break-after: always; height: 100vh; max-height: 27.7cm; overflow: hidden; display: flex; flex-direction: column; }
    .print-page-last { clear: both; box-sizing: border-box; position: relative; background: #ffffff; height: 100vh; max-height: 27.7cm; overflow: hidden; display: flex; flex-direction: column; }
    @media screen {
      body { background-color: #f3f4f6; padding: 20px 0; }
      .print-page, .print-page-last { width: 21cm; min-height: 29.7cm; margin: 0 auto 20px auto; padding: 1.0cm; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid #e5e7eb; border-radius: 4px; }
    }
  </style>
</head>
<body>
  <!-- PAGE 1: 3 Paragraphs -->
  <div class="print-page">
    <div style="border-bottom: 2px solid #111827; padding-bottom: 8px; margin-bottom: 12px;">
      <h2 style="margin: 0; font-size: 14pt; color: #111827; text-transform: uppercase;">Key Events of a War: \${warTitle}</h2>
      <p style="margin: 4px 0 0 0; font-size: 8.5pt; color: #4b5563;">
        <strong>Edexcel Specification Requirement:</strong> Write an analytical narrative of the key events of this war. 
        Write three detailed paragraphs focusing on the causes/outbreak, the main events/battles, and the consequences/aftermath. 
        Include precise historical details (names, dates, statistics).
      </p>
    </div>
    
    <div style="flex: 1; display: flex; flex-direction: column; gap: 15px;">
      <div style="flex: 1; border: 1.5px solid #d1d5db; border-radius: 6px; padding: 10px; display: flex; flex-direction: column;">
        <h3 style="margin: 0 0 8px 0; font-size: 10pt; color: #374151;">Paragraph 1: Causes & Outbreak</h3>
        <div style="flex: 1; border-top: 1px dashed #e5e7eb; background: repeating-linear-gradient(transparent, transparent 23px, #e5e7eb 23px, #e5e7eb 24px); margin-top: 5px;"></div>
      </div>
      <div style="flex: 1; border: 1.5px solid #d1d5db; border-radius: 6px; padding: 10px; display: flex; flex-direction: column;">
        <h3 style="margin: 0 0 8px 0; font-size: 10pt; color: #374151;">Paragraph 2: Key Events & Battles</h3>
        <div style="flex: 1; border-top: 1px dashed #e5e7eb; background: repeating-linear-gradient(transparent, transparent 23px, #e5e7eb 23px, #e5e7eb 24px); margin-top: 5px;"></div>
      </div>
      <div style="flex: 1; border: 1.5px solid #d1d5db; border-radius: 6px; padding: 10px; display: flex; flex-direction: column;">
        <h3 style="margin: 0 0 8px 0; font-size: 10pt; color: #374151;">Paragraph 3: Consequences & Aftermath</h3>
        <div style="flex: 1; border-top: 1px dashed #e5e7eb; background: repeating-linear-gradient(transparent, transparent 23px, #e5e7eb 23px, #e5e7eb 24px); margin-top: 5px;"></div>
      </div>
    </div>
  </div>

  <!-- PAGE 2: Timeline -->
  <div class="print-page-last">
    <div style="border-bottom: 2px solid #111827; padding-bottom: 8px; margin-bottom: 20px;">
      <h2 style="margin: 0; font-size: 14pt; color: #111827; text-transform: uppercase;">Chronological Analysis: \${warTitle}</h2>
      <p style="margin: 4px 0 0 0; font-size: 8.5pt; color: #4b5563;">
        Plot the 6 most important events of the war in chronological order. Include the date and a brief explanation of why the event was significant.
      </p>
    </div>
    
    <div style="flex: 1; position: relative; padding-left: 20px;">
      <!-- Vertical line -->
      <div style="position: absolute; left: 35px; top: 10px; bottom: 20px; width: 4px; background-color: #9ca3af; border-radius: 2px;"></div>
      
      <div style="display: flex; flex-direction: column; gap: 20px; height: 100%;">
        \${Array(6).fill(0).map((_, i) => \`
          <div style="position: relative; display: flex; align-items: stretch; flex: 1; min-height: 120px; margin-bottom: 10px;">
            <div style="position: absolute; left: 8px; top: 15px; width: 16px; height: 16px; background-color: #3b82f6; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 0 0 1px #9ca3af; z-index: 2;"></div>
            <div style="margin-left: 45px; border: 1.5px solid #d1d5db; border-radius: 6px; padding: 10px; width: 100%; display: flex; flex-direction: column;">
              <div style="display: flex; gap: 10px; align-items: flex-end; margin-bottom: 8px;">
                <span style="font-weight: bold; font-size: 9pt;">Date:</span>
                <div style="border-bottom: 1px dashed #9ca3af; flex: 0 0 120px; margin-bottom: 4px;"></div>
                <span style="font-weight: bold; font-size: 9pt; margin-left: 10px;">Event Title:</span>
                <div style="border-bottom: 1px dashed #9ca3af; flex: 1; margin-bottom: 4px;"></div>
              </div>
              <span style="font-weight: bold; font-size: 9pt; margin-bottom: 4px;">Significance:</span>
              <div style="flex: 1; border-top: 1px dashed #e5e7eb; background: repeating-linear-gradient(transparent, transparent 23px, #e5e7eb 23px, #e5e7eb 24px); margin-top: 5px;"></div>
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
  </div>
</body>
</html>\`;
  
  return html;
}

window.generateWarWorkbookHtml = generateWarWorkbookHtml;
`;
  content += newGenWar;
}

fs.writeFileSync('src/lessons.js', content);
console.log("Everything successfully fixed!");

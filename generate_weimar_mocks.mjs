import fs from 'fs';
import { unitData } from './weimar_nazi_germany/data.js';

// Add mock_exams to data.js
unitData.mock_exams = [
  {
    id: "mock_notebook_1",
    title: "Mock Paper 1 (NotebookLM Prediction)",
    url: "mock_notebook_1.html",
    has_mark_scheme: true
  },
  {
    id: "mock_notebook_2",
    title: "Mock Paper 2 (NotebookLM Prediction)",
    url: "mock_notebook_2.html",
    has_mark_scheme: true
  },
  {
    id: "mock_notebook_3",
    title: "Mock Paper 3 (NotebookLM Prediction)",
    url: "mock_notebook_3.html",
    has_mark_scheme: true
  },
  {
    id: "mock_adapted_2026",
    title: "Mock Paper 4 (Adapted 2026)",
    url: "mock_adapted_2026.html",
    has_mark_scheme: true
  }
];

const output = `export const unitData = ${JSON.stringify(unitData, null, 4)};`;
fs.writeFileSync('./weimar_nazi_germany/data.js', output);
console.log("Added mock_exams to data.js");

// Read the questions
const mocksFile = fs.readFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/1f9faa89-7f32-4037-a93a-b3731e9de1fe/scratch/extracted_mocks.json', 'utf8');
const { extractedMocks, adapted2026 } = JSON.parse(mocksFile);

const mockGroups = {
    mock_notebook_1: extractedMocks.filter(m => m.id.startsWith('mock1')),
    mock_notebook_2: extractedMocks.filter(m => m.id.startsWith('mock2')),
    mock_notebook_3: extractedMocks.filter(m => m.id.startsWith('mock3')),
    mock_adapted_2026: adapted2026
};

const htmlTemplate = (mockId, mockTitle, questions, isMarkScheme = false) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${mockTitle}${isMarkScheme ? ' - Mark Scheme' : ''}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
    * { box-sizing: border-box; font-family: 'Open Sans', Arial, sans-serif; }
    body { margin: 0; padding: 0; background: #e0e0e0; color: #000; }
    .page {
      width: 210mm; min-height: 297mm; background: white; margin: 20mm auto;
      padding: 15mm; box-shadow: 0 0 15px rgba(0,0,0,0.2); position: relative;
      page-break-after: always; display: flex; flex-direction: column;
    }
    @media print {
      body { background: white; }
      .page { margin: 0; padding: 15mm; box-shadow: none; width: 100%; min-height: 100%; page-break-after: always; }
    }
    h1 { text-align: center; font-size: 24px; border-bottom: 2px solid #333; padding-bottom: 10px; }
    h2 { font-size: 18px; margin-top: 20px; }
    .question { margin-bottom: 30px; font-size: 16px; }
    .stimulus { margin-top: 10px; padding: 10px; background: #f9f9f9; border-left: 4px solid #ccc; font-style: italic; }
    .mark-scheme { margin-top: 15px; padding: 15px; background: #eef2ff; border-left: 4px solid #4f46e5; font-size: 14px; }
  </style>
</head>
<body>
  <div class="page">
    <h1>${mockTitle}${isMarkScheme ? ' - Mark Scheme' : ''}</h1>
    ${questions.map((q, index) => `
      <div class="question">
        <strong>Question ${index + 1}:</strong> ${q.question || q.text}
        ${q.stimulus && !isMarkScheme ? `<div class="stimulus">${Array.isArray(q.stimulus) ? q.stimulus.join('<br><br>') : q.stimulus}</div>` : ''}
        ${isMarkScheme && q.model_answer ? `<div class="mark-scheme"><strong>Model Answer:</strong><br><br>${Array.isArray(q.model_answer) ? q.model_answer.join('<br><br>') : q.model_answer.replace(/\\n/g, '<br>')}</div>` : ''}
      </div>
    `).join('')}
  </div>
</body>
</html>
`;

for (const [mockId, questions] of Object.entries(mockGroups)) {
    const title = unitData.mock_exams.find(m => m.id === mockId).title;
    
    // Generate student paper
    fs.writeFileSync(`./weimar_nazi_germany/${mockId}.html`, htmlTemplate(mockId, title, questions, false));
    
    // Generate mark scheme
    fs.writeFileSync(`./weimar_nazi_germany/${mockId}_mark_scheme.html`, htmlTemplate(mockId, title, questions, true));
}

console.log("Successfully generated all mock exam HTML files.");

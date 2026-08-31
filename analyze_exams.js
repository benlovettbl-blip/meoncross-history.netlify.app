const fs = require('fs');

const dataFile = 'cme_questions_dump.json';
const questions = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

// Group by lesson
const lessons = {};
questions.forEach(q => {
  if (!lessons[q.lesson]) {
    lessons[q.lesson] = {
      consequence: 0,
      narrative: 0,
      importance: 0,
      total: 0
    };
  }
  
  lessons[q.lesson].total++;
  
  if (q.question.toLowerCase().includes('consequence')) {
    lessons[q.lesson].consequence++;
  } else if (q.question.toLowerCase().includes('narrative')) {
    lessons[q.lesson].narrative++;
  } else if (q.question.toLowerCase().includes('importance')) {
    lessons[q.lesson].importance++;
  }
});

// Since Lesson 1 had 0 questions, it's not in the JSON. I need to add it manually or pull from data.js.
// Let's just pull from data.js
const txt = fs.readFileSync('cme_new/data.js', 'utf8');
const unit = eval('(' + txt.substring(txt.indexOf('{'), txt.lastIndexOf('}')+1) + ')');

let md = `# Exam Practice Question Analysis (CME Unit)\n\n`;
md += `This document provides a critical analysis of the variety and number of exam practice questions present at the end of each lesson in the Middle East unit.\n\n`;

md += `## Summary of Gaps\n`;
let gapsFound = false;

let missingList = [];

unit.lessons.forEach((l, i) => {
  const title = l.title;
  const stats = { consequence: 0, narrative: 0, importance: 0, total: 0 };
  
  if (l.exam_practice) {
    l.exam_practice.forEach(ep => {
      stats.total++;
      if (ep.question.toLowerCase().includes('consequence')) stats.consequence++;
      else if (ep.question.toLowerCase().includes('narrative')) stats.narrative++;
      else if (ep.question.toLowerCase().includes('importance')) stats.importance++;
    });
  }
  
  const missing = [];
  if (stats.consequence === 0) missing.push('Explain one consequence (4 marks)');
  if (stats.narrative === 0) missing.push('Write a narrative account (8 marks)');
  if (stats.importance === 0) missing.push('Explain the importance of... (8 marks)');
  
  md += `### Lesson ${i+1}: ${title}\n`;
  md += `- Total Questions: ${stats.total}\n`;
  md += `- Consequence (4m): ${stats.consequence}\n`;
  md += `- Narrative (8m): ${stats.narrative}\n`;
  md += `- Importance (8m): ${stats.importance}\n`;
  
  if (missing.length > 0) {
    gapsFound = true;
    md += `> [!WARNING]\n`;
    md += `> **Missing:** ${missing.join(', ')}\n\n`;
    missingList.push(`- **Lesson ${i+1} (${title})** is missing: ${missing.join(', ')}`);
  } else {
    md += `> [!NOTE]\n`;
    md += `> All question types are present.\n\n`;
  }
});

md += `## Notebook LM Prompt\n`;
md += `Copy and paste the prompt below into Notebook LM to generate the missing questions based on your source documents:\n\n`;

const prompt = `I am designing exam practice questions for an Edexcel GCSE History unit: Conflict in the Middle East, 1945-1995 (Paper 2). 

Please review the source material for the following lessons and generate the missing exam questions to fill these specific gaps:

${missingList.join('\n')}

For each missing question, please generate a high-quality, historically accurate question that perfectly aligns with the Edexcel GCSE History Paper 2 specification. 
CRITICAL RULE: For consequence questions, do NOT ask for two consequences (8 marks). The new specification format requires a single consequence: "Explain one consequence of [X]" (4 marks).

Please output the generated questions clearly mapped to their respective lessons.`;

md += `\`\`\`text\n${prompt}\n\`\`\`\n`;

fs.writeFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/ee1ff3f5-cae9-4848-91eb-fd87e1936ea7/exam_analysis.md', md);
console.log('Artifact generated.');

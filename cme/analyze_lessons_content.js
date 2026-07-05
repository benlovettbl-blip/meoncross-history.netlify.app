const fs = require('fs');

// We can read workbook_data.js by extracting the JS object or evaluating it.
// Let's write a simple extraction that reads the file.
const dataCode = fs.readFileSync('src/workbook_data.js', 'utf8');
// Evaluate in a context to extract WORKBOOK_DATA
const sandbox = {};
const evalCode = dataCode.replace('export const WORKBOOK_DATA =', 'sandbox.WORKBOOK_DATA =');
eval(evalCode);

const WORKBOOK_DATA = sandbox.WORKBOOK_DATA;

Object.entries(WORKBOOK_DATA).forEach(([subId, data]) => {
  console.log(`=== Lesson ${subId}: ${data.title} ===`);
  
  // Narrative details
  let totalWords = 0;
  data.narrative.forEach((sec, idx) => {
    const secWords = sec.paragraphs.join(' ').split(/\s+/).filter(Boolean).length;
    totalWords += secWords;
    console.log(`  Narrative Sec ${idx+1}: "${sec.title}" - ${secWords} words`);
  });
  console.log(`  Total Narrative Words: ${totalWords}`);
  
  // Vocabulary details
  console.log(`  Vocabulary Items: ${data.vocabulary.length}`);
  
  // Timeline details
  console.log(`  Timeline Items: ${data.timeline.length}`);
  
  // Comprehension questions
  console.log(`  Comprehension Questions: ${data.comprehensionCheck.length}`);
  
  // Sources
  console.log(`  Sources: ${data.sources ? data.sources.length : 0}`);
  
  // Exam Practice
  console.log(`  Exam Practice Questions: ${data.examPractice.questions.length}`);
  
  // Peer quiz
  console.log(`  Peer Quiz Questions: ${data.peerQuiz.length}`);
});
process.exit(0);

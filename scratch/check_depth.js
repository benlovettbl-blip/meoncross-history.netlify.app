const fs = require('fs');
const path = require('path');

const dataContent = fs.readFileSync(path.join(__dirname, '../edexcel_medicine/data.js'), 'utf8');
const startIndex = dataContent.indexOf('{');
const endIndex = dataContent.lastIndexOf('}');
const jsonStr = dataContent.substring(startIndex, endIndex + 1);
const unitData = eval('(' + jsonStr + ')');

console.log("Analyzing Edexcel Medicine Unit Depth:\\n");

unitData.lessons.forEach(lesson => {
  let wordCount = 0;
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach(block => {
      wordCount += block.text.split(/\\s+/).length;
    });
  }
  
  let grade9Comment = "";
  if (wordCount < 250) {
    grade9Comment = "⚠️ VERY LOW DETAIL. Insufficient for Grade 9. Needs Notebook LM expansion.";
  } else if (wordCount < 400) {
    grade9Comment = "⚠️ MODERATE DETAIL. Could struggle to provide enough specific evidence for 16-mark Grade 9 answers.";
  } else {
    grade9Comment = "✅ GOOD DETAIL. Likely sufficient for Grade 9.";
  }

  console.log(`Lesson: ${lesson.title}`);
  console.log(`Narrative Word Count: ${wordCount}`);
  console.log(`Verdict: ${grade9Comment}`);
  console.log("---------------------------------------------------");
});

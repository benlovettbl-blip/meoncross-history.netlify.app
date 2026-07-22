const fs = require('fs');
const path = require('path');

const unitData = require('../edexcel_medicine/data.js');

console.log("Analyzing Edexcel Medicine Unit Depth:\\n");

unitData.lessons.forEach(lesson => {
  let wordCount = 0;
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach(block => {
      if (typeof block.text === 'string') {
        wordCount += block.text.trim().split(/\\s+/).length;
      }
    });
  }
  
  let grade9Comment = "";
  if (wordCount < 400) {
    grade9Comment = "⚠️ VERY LOW DETAIL (" + wordCount + " words). Insufficient for Grade 9. Needs Notebook LM expansion.";
  } else if (wordCount < 650) {
    grade9Comment = "⚠️ MODERATE DETAIL (" + wordCount + " words). Could struggle to provide enough specific evidence for 16-mark Grade 9 answers.";
  } else {
    grade9Comment = "✅ GOOD DETAIL (" + wordCount + " words). Likely sufficient for Grade 9.";
  }

  console.log(`Lesson: ${lesson.title}`);
  console.log(`Verdict: ${grade9Comment}`);
  console.log("---------------------------------------------------");
});

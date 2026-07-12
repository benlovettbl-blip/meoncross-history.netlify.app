const fs = require('fs');
const path = require('path');

const upgradesContent = fs.readFileSync(path.join(__dirname, '../src/flashcard_upgrades.js'), 'utf8');
const questionsContent = fs.readFileSync(path.join(__dirname, '../questions.js'), 'utf8');

function parseModule(content) {
  let code = content.replace(/import\s+[\s\S]*?from\s+['\"].*?['\"];?/g, '');
  code = code
    .replace(/export\s+const\s+/g, 'const ')
    .replace(/export\s+function\s+/g, 'function ')
    .replace(/export\s+default\s+/g, '');
  return code;
}

const upgradesCode = parseModule(upgradesContent);
const questionsCode = parseModule(questionsContent);

const evalCode = `
const fallbacks = [];
QUIZ_DATA.forEach(topic => {
  topic.subtopics.forEach(subtopic => {
    ['easy', 'medium', 'difficult'].forEach(diff => {
      if (subtopic[diff]) {
        subtopic[diff].forEach(q => {
          const split = getFactSplit({ ...q, subtopicId: subtopic.id });
          const isFallback = (split.significance.startsWith("This event escalated tensions") ||
                              split.significance.startsWith("This outcome solidified") ||
                              split.significance.startsWith("This development intensified") ||
                              split.significance.startsWith("This military confrontation") ||
                              split.significance.startsWith("This clash escalated") ||
                              split.significance.startsWith("This war shattered") ||
                              split.significance.startsWith("This breakthrough") ||
                              split.significance.startsWith("This confrontation") ||
                              split.significance.startsWith("This historic agreement") ||
                              split.significance.startsWith("This represents a key"));
          if (isFallback) {
            fallbacks.push({
              id: q.id,
              subtopicId: subtopic.id,
              question: q.question,
              answer: q.answer,
              explanation: q.explanation
            });
          }
        });
      }
    });
  });
});

console.log("Total Fallbacks:", fallbacks.length);
fs.writeFileSync(path.join(__dirname, 'fallbacks_list.json'), JSON.stringify(fallbacks, null, 2));
`;

try {
  eval(questionsCode + '\n' + upgradesCode + '\n' + evalCode);
} catch (e) {
  console.error("Evaluation error:", e);
}

const fs = require('fs');

const filePath = 'early_modern_world/data.js';
let content = fs.readFileSync(filePath, 'utf8');

// Parse the file into lessons.
const lessons = content.split(/(\{\s*"id":\s*"lesson_\d+",)/g);

for (let i = 1; i < lessons.length; i += 2) {
  let lessonBody = lessons[i+1];
  
  let currentLetterCode = 65; // 'A'
  const letterMap = {};
  
  // Find all unique "Source [A-Z]" in the lesson in order of appearance
  // USING \b to prevent matching "Source Analysis"
  const sourceMatches = [...lessonBody.matchAll(/Source [A-Z]\b/g)];
  const uniqueSourcesInOrder = [];
  for (const match of sourceMatches) {
    if (!uniqueSourcesInOrder.includes(match[0])) {
      uniqueSourcesInOrder.push(match[0]);
    }
  }
  
  // Map them to A, B, C...
  uniqueSourcesInOrder.forEach(oldSource => {
    const newSource = `Source ${String.fromCharCode(currentLetterCode)}`;
    letterMap[oldSource] = newSource;
    currentLetterCode++;
  });
  
  lessonBody = lessonBody.replace(/Source [A-Z]\b/g, match => {
    return letterMap[match] || match; 
  });
  
  lessons[i+1] = lessonBody;
}

const newContent = lessons.join('');
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Source letters updated successfully in early_modern_world/data.js');

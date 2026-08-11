const fs = require('fs');
let content = fs.readFileSync('generate_textbooks.js', 'utf8');

content = content.replace(/if \(lesson\.tasks && lesson\.tasks\.length > 0\) \{/g, 'if (false) {');
content = content.replace(/let hasExamTask = lesson\.gcse_task \|\| lesson\.exam_practice \|\| \(lesson\.extended && lesson\.extended\.question\);/g, 'let hasExamTask = false;');
content = content.replace(/if \(block\.tasks && block\.tasks\.length > 0\) \{/g, 'if (false) {');

fs.writeFileSync('generate_textbooks.js', content);
console.log('Done stripping final tasks!');

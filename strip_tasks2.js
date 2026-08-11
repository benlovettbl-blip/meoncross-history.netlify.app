const fs = require('fs');
let fileContent = fs.readFileSync('generate_textbooks.js', 'utf8');

// The best way to remove these is to find the condition and comment out the whole block if possible, or use a reliable regex.
// Wait, `lesson.tasks` is at: `if (lesson.tasks && lesson.tasks.length > 0) { ... let hasExamTask`
// In the current file, where is `if (lesson.tasks`? Let me just use regex to remove everything from `if (lesson.extended && lesson.extended.question)` to `// Plenary`

let regex = /if \(lesson\.extended && lesson\.extended\.question\) \{[\s\S]*?\/\/ Plenary/g;
fileContent = fileContent.replace(regex, '// Plenary');

// What about `lesson.tasks`? (Active Tasks)
// Let's remove from `if (lesson.tasks && lesson.tasks.length > 0) {` to `if (lesson.extended && lesson.extended.question) {`
// Actually `lesson.tasks` might have been removed or modified. Let's remove all of it.
let regexTasks = /if \(lesson\.tasks && lesson\.tasks\.length > 0\) \{[\s\S]*?\/\/ Plenary/g;
fileContent = fileContent.replace(regexTasks, '// Plenary');

// Remove Pair & Share which might be before or after?
let regexPairShare = /if \(lesson\.pair_share\) \{[\s\S]*?(?=if \(lesson\.historians_corner|\/\/ Plenary)/g;
fileContent = fileContent.replace(regexPairShare, '');

// Remove Historians Corner stretch question
let regexStretch = /if \(lesson\.historians_corner\.stretch_question\) \{[\s\S]*?\} else \{/g;
fileContent = fileContent.replace(regexStretch, 'if (false) {} else {');
let regexStretch2 = /<div class="task-box" style="margin-top: 15px;">[\s\S]*?<\/div>/g;
// Wait, maybe just replace the stretch question text
fileContent = fileContent.replace(/<div class="task-box" style="margin-top: 15px;"><strong>Stretch & Challenge:.*?<\/div>/g, '');

// Save it back
fs.writeFileSync('generate_textbooks.js', fileContent);
console.log("Stripped more tasks!");

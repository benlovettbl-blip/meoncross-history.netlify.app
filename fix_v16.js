const fs = require('fs');

// Edit 1: Fix generate_pupil_workbooks.js cumulative numbering
let workbookCode = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

// The code looks like this:
//     periodLessons.forEach((lesson, lessonIndex) => {
//       let allVideos = [];
//       let imgTags = "";
//       let sources = [];
//       let interpretations = [];
//       let sourceCharCode = 65;
//       let globalQNum = 1;

// We want to move `let globalQNum = 1;` to just BEFORE `periodLessons.forEach`
workbookCode = workbookCode.replace(
    /periodLessons\.forEach\(\(lesson, lessonIndex\) \=\> \{\n(\s*)let allVideos = \[\];\n(\s*)let imgTags = "";\n(\s*)let sources = \[\];\n(\s*)let interpretations = \[\];\n(\s*)let sourceCharCode = 65;\n(\s*)let globalQNum = 1;/g,
    'let globalQNum = 1;\n    periodLessons.forEach((lesson, lessonIndex) => {\n$1let allVideos = [];\n$2let imgTags = "";\n$3let sources = [];\n$4let interpretations = [];\n$5let sourceCharCode = 65;'
);
fs.writeFileSync('generate_pupil_workbooks.js', workbookCode);
console.log('Fixed generate_pupil_workbooks.js numbering');

// Edit 2: Fix generate_textbooks.js ghost heading
let textbookCode = fs.readFileSync('generate_textbooks.js', 'utf8');
// Replace the specific `if (lesson.tasks) {` that follows `// Active Tasks`
textbookCode = textbookCode.replace(
    /\/\/ Active Tasks\n(\s*)if \(lesson\.tasks\) \{/g,
    '// Active Tasks\n$1if (lesson.tasks && lesson.tasks.length > 0) {'
);
fs.writeFileSync('generate_textbooks.js', textbookCode);
console.log('Fixed generate_textbooks.js ghost heading');

import fs from 'fs';

const dataPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

// The lessons are in blocks of 3. KT1 has lessons 1,2,3 -> KT1.1, 1.2, 1.3
// KT2 has lessons 4,5,6 -> KT2.1, 2.2, 2.3
// KT3 has lessons 7,8,9 -> KT3.1, 3.2, 3.3

content = content.replace(/"title": "Lesson 1: (.*?)"/g, '"title": "KT1.1: $1"');
content = content.replace(/"title": "Lesson 2: (.*?)"/g, '"title": "KT1.2: $1"');
content = content.replace(/"title": "Lesson 3: (.*?)"/g, '"title": "KT1.3: $1"');

content = content.replace(/"title": "Lesson 4: (.*?)"/g, '"title": "KT2.1: $1"');
content = content.replace(/"title": "Lesson 5: (.*?)"/g, '"title": "KT2.2: $1"');
content = content.replace(/"title": "Lesson 6: (.*?)"/g, '"title": "KT2.3: $1"');

content = content.replace(/"title": "Lesson 7: (.*?)"/g, '"title": "KT3.1: $1"');
content = content.replace(/"title": "Lesson 8: (.*?)"/g, '"title": "KT3.2: $1"');
content = content.replace(/"title": "Lesson 9: (.*?)"/g, '"title": "KT3.3: $1"');

fs.writeFileSync(dataPath, content, 'utf8');
console.log("Updated lesson titles in data.js");

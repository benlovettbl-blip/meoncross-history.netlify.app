const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'cme_new', 'generate_worksheets.js');
let content = fs.readFileSync(filePath, 'utf8');

const replacementEnd = `});

  const chunkOutPath = isCore 
    ? path.join(__dirname, 'core_workbook_KT' + ktNum + '.html') 
    : path.join(__dirname, 'workbook_KT' + ktNum + '.html');
  fs.writeFileSync(chunkOutPath, html, 'utf8');
  console.log(\`Saved \${chunkOutPath}\`);
}
`;

content = content.replace("let html = `<!DOCTYPE html>", `const CHUNK_SIZE = 3;
const totalChunks = Math.ceil(unitData.lessons.length / CHUNK_SIZE);

for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
  const ktNum = chunkIndex + 1;
  const chunkLessons = unitData.lessons.slice(chunkIndex * CHUNK_SIZE, (chunkIndex + 1) * CHUNK_SIZE);
  
  let html = \`<!DOCTYPE html>`);

content = content.replace("let coverList = unitData.lessons.map", "let coverList = chunkLessons.map");
content = content.replace("unitData.lessons.forEach((lesson, lessonIndex)", "chunkLessons.forEach((lesson, lessonIndex)");

const endBlock = `});

const outPath = isCore ? path.join(__dirname, 'core_workbook.html') : path.join(__dirname, 'workbook.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log(\`Saved \$\{outPath\}\`);`;

content = content.replace(endBlock, replacementEnd);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully patched cme_new/generate_worksheets.js");

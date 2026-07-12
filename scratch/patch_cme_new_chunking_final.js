const fs = require('fs');

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js';
let content = fs.readFileSync(filePath, 'utf8');

// Add isCore support
content = content.replace(
  "const fs = require('fs');\nconst path = require('path');",
  "const fs = require('fs');\nconst path = require('path');\nconst isCore = process.argv.includes('--core');"
);

// Add chunking loop
content = content.replace(
  "let html = `<!DOCTYPE html>",
  `const CHUNK_SIZE = 3;
const totalChunks = Math.ceil(unitData.lessons.length / CHUNK_SIZE);

for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
  const ktNum = chunkIndex + 1;
  const chunkLessons = unitData.lessons.slice(chunkIndex * CHUNK_SIZE, (chunkIndex + 1) * CHUNK_SIZE);
  
  let html = \`<!DOCTYPE html>`
);

// Fix title for core
content = content.replace(
  "<title>${unitData.title} - Printable Workbook</title>",
  "<title>${unitData.title} - ${isCore ? 'Core Workbook' : 'Printable Workbook'}</title>"
);

// Fix cover list mapping
content = content.replace(
  "let coverList = unitData.lessons.map((l, i) => `<li style=\"margin-bottom: 10px;\">${l.title}</li>`).join('');",
  "let coverList = chunkLessons.map((l, i) => `<li style=\"margin-bottom: 10px;\">${l.title}</li>`).join('');"
);

// Fix loop
content = content.replace(
  "unitData.lessons.forEach((lesson, lessonIndex) => {",
  "chunkLessons.forEach((lesson, lessonIndex) => {"
);

// Fix end block
const oldEndBlock = `fs.writeFileSync(path.join(__dirname, 'workbook.html'), html, 'utf8');
console.log("Successfully generated workbook.html!");`;

const newEndBlock = `
  const outFileName = isCore ? \`core_workbook_KT\${ktNum}.html\` : \`workbook_KT\${ktNum}.html\`;
  const outPath = path.join(__dirname, outFileName);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(\`Successfully generated \${outFileName}!\`);
}
`;
content = content.replace(oldEndBlock, newEndBlock);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched successfully!");

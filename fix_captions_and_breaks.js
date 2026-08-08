const fs = require('fs');

let content = fs.readFileSync('src/core_app.js', 'utf8');

// Fix 1 & 2: img.image_caption support in image array loops
content = content.replace(/\$\{img\.alt \|\| img\.image_alt \? `<div class="image-hint-caption"/g, '${(img.caption || img.image_caption || img.alt || img.image_alt) ? `<div class="image-hint-caption"');
content = content.replace(/\$\{img\.alt \|\| img\.image_alt\}<\/div>` : ''\}/g, '${img.caption || img.image_caption || img.alt || img.image_alt}</div>` : \'\'}');

// Fix 3: block.image_caption support for single images
content = content.replace(/\$\{block\.image_alt \? `<div class="image-hint-caption"/g, '${(block.caption || block.image_caption || block.image_alt) ? `<div class="image-hint-caption"');
content = content.replace(/\$\{block\.image_alt\}<\/div>` : ''\}/g, '${block.caption || block.image_caption || block.image_alt}</div>` : \'\'}');

fs.writeFileSync('src/core_app.js', content, 'utf8');
console.log('Fixed captions in core_app.js');

let generateContent = fs.readFileSync('generate_workbooks.js', 'utf8');
// Fix page break for lessons
generateContent = generateContent.replace(
  /<h2 style="page-break-inside: avoid; margin-top: 40px; margin-bottom: 20px; font-size: 22pt; font-weight: 700; color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">/g,
  '<h2 style="page-break-before: always; page-break-inside: avoid; margin-top: 40px; margin-bottom: 20px; font-size: 22pt; font-weight: 700; color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">'
);
fs.writeFileSync('generate_workbooks.js', generateContent, 'utf8');
console.log('Fixed page breaks in generate_workbooks.js');

const fs = require('fs');

let code = fs.readFileSync('generate_workbooks.js', 'utf8');

// Strip all simple <img tags concatenated to html or sourceHTML
code = code.replace(/html \+= `\s*<img[^>]*>\s*`;/g, "html += ''; // STRIPPED IMG");
code = code.replace(/sourceHTML \+= `\s*<img[^>]*>\s*`;/g, "sourceHTML += ''; // STRIPPED IMG");

// Strip the narrative block image generation which looks like this:
//            if (src.toLowerCase().endsWith('.svg')) {
//               html += `<img src="${src}" ...`;
//            } else {
//               html += `<img src="${src}" ...`;
//            }
code = code.replace(/if \(src\.toLowerCase\(\)\.endsWith\('\.svg'\)\) \{[\s\S]*?\} else \{[\s\S]*?\}/g, "/* STRIPPED IMG BLOCK */");

// Strip any remaining html += `<img...` patterns
code = code.replace(/html \+= `.*?<img.*?>.*?`;/g, "/* STRIPPED IMG LINE */");

// Strip toggle tab Source A & B images in the exam section
// const renderedA = isImageA ? `<img ...
code = code.replace(/const renderedA = isImageA \? `<img[^`]*` : content\.replace\(\/\\n\/g, '<br>'\);/g, "const renderedA = isImageA ? '' : content.replace(/\\n/g, '<br>');");
code = code.replace(/const renderedB = isImageB \? `<img[^`]*` : content\.replace\(\/\\n\/g, '<br>'\);/g, "const renderedB = isImageB ? '' : content.replace(/\\n/g, '<br>');");

fs.writeFileSync('generate_workbooks.js', code);
console.log('Aggressively stripped images from generate_workbooks.js');

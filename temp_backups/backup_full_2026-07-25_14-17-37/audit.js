const fs = require('fs');

let indexContent = fs.readFileSync('great_war/index.html', 'utf8');

// 1. Remove justify-content: space-between from .page-content
indexContent = indexContent.replace(/class="page-content"\s+style="([^"]*)justify-content:\s*space-between;?([^"]*)"/g, (match, before, after) => {
    return `class="page-content" style="${before}${after}"`;
});

// 2. Add .keep-together to storytelling boxes and scale fonts
// Find the div with the specific inline style pattern used for these boxes
indexContent = indexContent.replace(/<div\s+style="([^"]*background-color:\s*var\(--light-gray\);\s*border-left:\s*4px\s*solid\s*var\(--navy\)[^"]*)"/g, (match, style) => {
    return `<div class="keep-together" style="${style}"`;
});

// For font sizes within these boxes, since it's hard to isolate just inside the box without a DOM parser,
// let's look for specific inline styles that are used in these boxes.
// "font-size: 10pt;" -> "font-size: 11.5pt;"
// "font-size: 8.5pt;" -> "font-size: 10pt;"
// But wait, there might be other places where 10pt is used. Let's be more specific.
// We can use a regex that looks for Historical Storytelling and Dual-Color Literacy Challenge.
indexContent = indexContent.replace(/font-size:\s*10pt;\s*line-height:\s*1.55/g, 'font-size: 11.5pt; line-height: 1.55');
indexContent = indexContent.replace(/font-size:\s*8\.5pt;\s*line-height:\s*1\.4/g, 'font-size: 10pt; line-height: 1.4');
indexContent = indexContent.replace(/font-size:\s*9pt;\s*color:\s*var\(--navy\)/g, 'font-size: 10.5pt; color: var(--navy)');

// 3. Dynamic lines replacement
// We want to replace <div class="writing-lines-box" style="height: 24mm; border-top: 1.2px solid #555555; background-image: repeating-linear-gradient(to bottom, transparent 0px, transparent calc(8mm - 1.2px), #555555 calc(8mm - 1.2px), #555555 8mm); background-size: 100% 8mm;"></div>
// ONLY if they are part of a 3-line Inference Task that should fill the page.
// We can just find all instances of `<div class="writing-lines-box" style="height: 24mm; border-top...` that are NOT inside an `<div class="answer-box-small">`.
// Actually, earlier I saw them like this:
// `<div style="margin-top: 10px;">`
// `  <h4 class="task-heading" ...`
// `  <p class="task-question" ...`
// `  <div class="writing-lines-box" ...`
// `</div>`
indexContent = indexContent.replace(/(<div style="margin-top: 10px;">\s*<h4 class="task-heading"[^>]*>.*?<\/h4>\s*<p class="task-question"[^>]*>.*?<\/p>\s*)<div class="writing-lines-box"[^>]*><\/div>/g, 
  (match, prefix) => {
      // Replace the outer div style to be flex column
      let updatedPrefix = prefix.replace('<div style="margin-top: 10px;">', '<div style="margin-top: 10px; flex-grow: 1; display: flex; flex-direction: column;">');
      return `${updatedPrefix}<div class="dynamic-writing-lines-zone" style="flex-grow: 1; min-height: 24mm;"></div>`;
  }
);


fs.writeFileSync('great_war/index.html', indexContent);

let cssContent = fs.readFileSync('great_war/styles.css', 'utf8');
if (!cssContent.includes('.keep-together')) {
    cssContent += `\n\n/* Added for print audit */\n.keep-together {\n  page-break-inside: avoid !important;\n  break-inside: avoid !important;\n}\n`;
    fs.writeFileSync('great_war/styles.css', cssContent);
}

console.log('Audit complete.');

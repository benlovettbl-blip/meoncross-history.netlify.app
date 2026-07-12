import fs from 'fs';

let dataJs = fs.readFileSync('cme_new/data.js', 'utf8');

// Replace literal newlines within the div tags we injected
// We can find the div block and replace newlines with \\n
dataJs = dataJs.replace(/"\n<div style=\\"background-color: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;\\">\n  <h3 style=\\"margin-top: 0; color: #333; text-align: center;\\">SPECIFICATION STUDY MAP: KEY TOPIC 2.1<\/h3>\n  <ol style=\\"line-height: 1.6; margin-bottom: 0;\\">\n    <li><strong>Palestinian Nationalism<\/strong> &rarr; Cairo Conference \(1964\), creation of the PLO and Fatah.<\/li>\n    <li><strong>Border Wars &amp; Skirmishes<\/strong> &rarr; Disputes over Jordan water, Samu Raid \(1966\), 7 April 1967.<\/li>\n    <li><strong>The Slide to War \(May '67\)<\/strong> &rarr; Soviet misinformation, UNEF withdrawal, closure of Tiran.<\/li>\n    <li><strong>The Six Day War<\/strong> &rarr; June 5 pre-emptive strike, lightning land war, redrawn boundaries.<\/li>\n  <\/ol>\n<\/div>"/g, 
  '"<div style=\\"background-color: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;\\">\\n  <h3 style=\\"margin-top: 0; color: #333; text-align: center;\\">SPECIFICATION STUDY MAP: KEY TOPIC 2.1</h3>\\n  <ol style=\\"line-height: 1.6; margin-bottom: 0;\\">\\n    <li><strong>Palestinian Nationalism</strong> &rarr; Cairo Conference (1964), creation of the PLO and Fatah.</li>\\n    <li><strong>Border Wars &amp; Skirmishes</strong> &rarr; Disputes over Jordan water, Samu Raid (1966), 7 April 1967.</li>\\n    <li><strong>The Slide to War (May \\\'67)</strong> &rarr; Soviet misinformation, UNEF withdrawal, closure of Tiran.</li>\\n    <li><strong>The Six Day War</strong> &rarr; June 5 pre-emptive strike, lightning land war, redrawn boundaries.</li>\\n  </ol>\\n</div>"');

dataJs = dataJs.replace(/"\n<div style=\\"background-color: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;\\">\n  <h3 style=\\"margin-top: 0; color: #333; text-align: center;\\">THE MAY 1967 CASCADE: CHRONOLOGY OF CRISIS<\/h3>\n  <ul style=\\"line-height: 1.6; margin-bottom: 0; list-style-type: none; padding-left: 0;\\">\n    <li><strong>13 May<\/strong> &rarr; <em>Soviet Misinformation:<\/em> USSR falsely tells Nasser Israel is massing troops on Syria.<\/li>\n    <li><strong>15 May<\/strong> &rarr; <em>Egyptian Mobilization:<\/em> Nasser puts army on alert, moves troops into Sinai.<\/li>\n    <li><strong>16 May<\/strong> &rarr; <em>UN Out:<\/em> Nasser orders UN peacekeepers \(UNEF\) to evacuate the border buffer.<\/li>\n    <li><strong>23 May<\/strong> &rarr; <em>Maritime Blockade:<\/em> Egypt closes the Straits of Tiran, choking Israel\'s port of Eilat.<\/li>\n    <li><strong>30 May<\/strong> &rarr; <em>Encirclement:<\/em> King Hussein of Jordan signs a joint defence pact with Egypt.<\/li>\n  <\/ul>\n<\/div>"/g,
  '"<div style=\\"background-color: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;\\">\\n  <h3 style=\\"margin-top: 0; color: #333; text-align: center;\\">THE MAY 1967 CASCADE: CHRONOLOGY OF CRISIS</h3>\\n  <ul style=\\"line-height: 1.6; margin-bottom: 0; list-style-type: none; padding-left: 0;\\">\\n    <li><strong>13 May</strong> &rarr; <em>Soviet Misinformation:</em> USSR falsely tells Nasser Israel is massing troops on Syria.</li>\\n    <li><strong>15 May</strong> &rarr; <em>Egyptian Mobilization:</em> Nasser puts army on alert, moves troops into Sinai.</li>\\n    <li><strong>16 May</strong> &rarr; <em>UN Out:</em> Nasser orders UN peacekeepers (UNEF) to evacuate the border buffer.</li>\\n    <li><strong>23 May</strong> &rarr; <em>Maritime Blockade:</em> Egypt closes the Straits of Tiran, choking Israel\\\'s port of Eilat.</li>\\n    <li><strong>30 May</strong> &rarr; <em>Encirclement:</em> King Hussein of Jordan signs a joint defence pact with Egypt.</li>\\n  </ul>\\n</div>"');

// Fix html tables too which might have literal newlines from build_diagrams.mjs
// Wait, build_diagrams.mjs had backticks `\n<table>...`
dataJs = dataJs.replace(/"\n<table class=\\"table-auto/g, '"<table class=\\"table-auto');
// just replace literal \n inside string literals
let lines = dataJs.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i] === '<div style=\\"background-color: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;\\">') {
    // we found a bad chunk
  }
}

// Actually an easier way to fix JSON syntax errors is to replace literal newlines that are inside `"text": "` values
// Let's just fix it by replacing the whole thing.
fs.writeFileSync('cme_new/data.js', dataJs);

const fs=require('fs');
const html=fs.readFileSync('great_war_index_temp_utf8.html', 'utf8');

// 1. Do Now tasks
const doNowRegex = /<div class="do-now-task">([\s\S]*?)<\/div>\s*<\/div>\s*<div class="no-print"/g;
const doNows = [];
let m;
while((m=doNowRegex.exec(html))!==null){
  doNows.push(m[1].substring(0, 150).replace(/\n/g, ' '));
}
console.log('Do Now Tasks Found:', doNows.length);
if (doNows.length > 0) console.log('Sample:', doNows[0]);

// 2. Reference Maps
const mapRegex = /<i class="fa-solid fa-map"><\/i>\s*Reference [Mm]ap:/g;
const maps = html.match(mapRegex);
console.log('Reference Maps Found:', maps ? maps.length : 0);

// 3. Page 8 Footer
const p8 = html.indexOf('id="page-8"');
if (p8 !== -1) {
  const p8end = html.indexOf('<div class="page-footer">', p8);
  console.log('Page 8 Footer:', html.substring(p8end, p8end+150).replace(/\n/g, ' '));
}

// 5. Copy Lesson Answers
const copyBtnRegex = /<button[^>]*>.*?Copy Lesson Answers for OneNote Paste<\/button>/g;
const copyBtns = html.match(copyBtnRegex);
console.log('Copy Buttons Found:', copyBtns ? copyBtns.length : 0);

// 6. Number 4 Independent Consolidation
const consRegex = /4\.\s*Independent Consolidation and Analytical Writing/g;
const cons = html.match(consRegex);
console.log('Consolidations Found:', cons ? cons.length : 0);

// 7. Consolidation Writing Prompts
const promptsRegex = /Consolidation Writing Prompts/g;
const prompts = html.match(promptsRegex);
console.log('Consolidation Prompts Found:', prompts ? prompts.length : 0);

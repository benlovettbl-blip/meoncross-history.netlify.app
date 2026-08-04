const fs = require('fs');
const path = require('path');

const oldHtmlPath = path.resolve(__dirname, 'great_war_old.html');
const dataJsPath = path.resolve(__dirname, 'great_war', 'data.js');

let oldHtml = fs.readFileSync(oldHtmlPath, 'utf8');

function extractPageContent(html, id) {
  const startIndex = html.indexOf(`id="${id}"`);
  if (startIndex === -1) return null;
  const startDivIndex = html.lastIndexOf('<div', startIndex);
  
  let depth = 0;
  let endIndex = -1;
  const len = html.length;
  
  for (let i = startDivIndex; i < len; i++) {
    if (html.substr(i, 4) === '<div') depth++;
    if (html.substr(i, 5) === '</div') {
      depth--;
      if (depth === 0) {
        endIndex = i + 6;
        break;
      }
    }
  }
  
  if (endIndex === -1) return null;
  
  let content = html.substring(startDivIndex, endIndex);
  
  return content;
}

const pages = [
  { id: 'page-cover', title: 'Cover & Plans' },
  { id: 'page-timeline', title: 'Timeline' },
  { id: 'page-assessment', title: 'Assessment' },
  { id: 'page-exhibition', title: 'Exhibition' },
  { id: 'page-34', title: 'Trading Cards' }
];

const extractedPages = [];

pages.forEach(p => {
  let content = extractPageContent(oldHtml, p.id);
  if (content) {
    // Escape backticks and standard JS string escaping
    // The easiest way is to use JSON.stringify when injecting
    extractedPages.push({
      id: p.id,
      title: p.title,
      html: content
    });
  } else {
    console.log(`Could not find ${p.id}`);
  }
});

let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

if (!dataJsContent.includes('"staticPages":')) {
  // Insert staticPages right after export const unitData = {
  const insertStr = `\n  "staticPages": ` + JSON.stringify(extractedPages, null, 4) + `,`;
  dataJsContent = dataJsContent.replace('export const unitData = {', 'export const unitData = {' + insertStr);
  fs.writeFileSync(dataJsPath, dataJsContent);
  console.log('Successfully injected static pages into data.js');
} else {
  console.log('data.js already has staticPages.');
}

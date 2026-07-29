const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('great_war_index_temp_utf8.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

const pages = Array.from(document.querySelectorAll('.page'));

function findElement(text) {
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].textContent.includes(text)) {
      console.log(`Found "${text}" on page index ${i} (id=${pages[i].id})`);
      // Find the specific element
      const elements = Array.from(pages[i].querySelectorAll('*'));
      for (const el of elements) {
        if (el.children.length === 0 && el.textContent.includes(text)) {
          console.log(`Element: ${el.outerHTML}`);
        }
      }
      return i;
    }
  }
  console.log(`"${text}" NOT FOUND`);
  return -1;
}

findElement('Street View');
findElement('Interpretation 3');

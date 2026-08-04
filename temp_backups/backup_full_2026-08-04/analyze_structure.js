const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('great_war_index_temp_utf8.html', 'utf8');
const dom = new JSDOM(html);
const pages = dom.window.document.querySelectorAll('.page, .page-landscape');

console.log('Total pages:', pages.length);
pages.forEach((p, i) => {
  let title = p.querySelector('h2') ? p.querySelector('h2').textContent.trim() : 'No Title';
  console.log(`Index ${i}: ID=${p.id} Title="${title}"`);
});

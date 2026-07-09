const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('great_war/index.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

// Fix map spilling on page-24
const p24 = document.getElementById('page-24');
if (p24) {
  const imgs = p24.querySelectorAll('img');
  imgs.forEach(img => {
    if (img.src.includes('map_sarajevo_route')) {
      img.style.maxHeight = '230px'; // make it much smaller
    }
    if (img.src.includes('map_lesson5')) {
      img.style.maxHeight = '230px'; 
    }
  });
}

// Fix Interpretation 3 spilling on page-25 (id="page-25a")
const p25a = document.getElementById('page-25a'); // Part 2
if (p25a) {
  const sources = p25a.querySelectorAll('.source-box');
  sources.forEach(source => {
    if (source.textContent.includes('Interpretation 3')) {
      source.style.fontSize = '8pt';
      source.style.padding = '8px';
      source.style.margin = '4px 0';
    }
  });
  const narrative = p25a.querySelector('.simplified-narrative');
  if (narrative) {
      narrative.style.fontSize = '9pt';
  }
}

fs.writeFileSync('great_war/index.html', dom.serialize());
console.log('Successfully fixed L4/L5 layout issues in great_war/index.html');

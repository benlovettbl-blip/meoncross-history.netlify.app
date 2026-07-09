const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('great_war_index_temp_utf8.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

// 1. Do Now tasks
console.log('\n--- DO NOW TASKS ---');
const doNowCells = document.querySelectorAll('.do-now-cell');
console.log('Found do-now-cell elements:', doNowCells.length);
if (doNowCells.length > 0) {
  console.log('Sample do-now-cell:', doNowCells[0].innerHTML.substring(0, 200).trim());
}

// 2. Reference Maps
console.log('\n--- REFERENCE MAPS ---');
const mapIcons = document.querySelectorAll('.fa-map');
console.log('Found .fa-map elements:', mapIcons.length);
mapIcons.forEach(icon => {
  const parent = icon.parentElement;
  if (parent && parent.textContent.includes('Reference Map:')) {
    console.log('Found map title:', parent.textContent.trim());
  }
});

// 3. Lesson 1 spilling (Core Vocab)
console.log('\n--- LESSON 1 SPILLING ---');
const vocabBlocks = document.querySelectorAll('.core-vocab-block, .core-vocabulary, [style*="Core Vocabulary"]');
console.log('Found core vocab blocks:', vocabBlocks.length);
const pages = document.querySelectorAll('.page');
pages.forEach((page, i) => {
  if (page.textContent.includes('Core Vocabulary')) {
    console.log('Page ' + i + ' contains Core Vocabulary');
  }
});

// 4. Page 8 Footer
console.log('\n--- PAGE 8 FOOTER ---');
const page8 = document.getElementById('page-8');
if (page8) {
  const footer = page8.querySelector('.page-footer');
  console.log('Page 8 footer exists:', !!footer);
  if (footer) {
    console.log('Page 8 footer outerHTML:', footer.outerHTML);
  }
  // Let's check page 7 footer to compare
  const page7 = document.getElementById('page-7');
  if (page7) {
    const footer7 = page7.querySelector('.page-footer');
    console.log('Page 7 footer outerHTML:', footer7 ? footer7.outerHTML : 'None');
  }
} else {
  console.log('Page 8 not found');
}

// 5. Copy Lesson Answers
console.log('\n--- COPY LESSON ANSWERS ---');
const copyButtons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Copy Lesson Answers'));
console.log('Found copy buttons:', copyButtons.length);
if (copyButtons.length > 0) {
  console.log('Sample parent:', copyButtons[0].parentElement.outerHTML);
  
  // Find Comprehension Worksheet headings
  const compHeadings = Array.from(document.querySelectorAll('h3, h4, strong')).filter(el => el.textContent.includes('Comprehension'));
  console.log('Found Comprehension Worksheet headings:', compHeadings.length);
  if (compHeadings.length > 0) {
    console.log('Sample comprehension heading parent:', compHeadings[0].parentElement.outerHTML);
  }
}

// 6. Number 4 Independent Consolidation
console.log('\n--- QUESTION 4 ---');
const q4Elements = Array.from(document.querySelectorAll('h4, p, strong, div')).filter(el => el.textContent.includes('4. Independent Consolidation'));
console.log('Found Q4 elements:', q4Elements.length);
if (q4Elements.length > 0) {
  console.log('Sample Q4:', q4Elements[0].outerHTML);
}

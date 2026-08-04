const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('great_war_index_temp_utf8.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

// 1. Uniform "Do Now" Tasks
const doNowGrids = document.querySelectorAll('.do-now-grid, [style*="grid-template-columns: repeat(3"]');
let modifiedDoNows = 0;
doNowGrids.forEach(grid => {
  const cells = grid.querySelectorAll('.do-now-cell');
  if (cells.length > 0) {
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '10px';
    
    cells.forEach((cell, idx) => {
      const tr = document.createElement('tr');
      if (idx % 2 === 0) tr.style.backgroundColor = '#faf9f6';
      
      const tdQ = document.createElement('td');
      tdQ.style.padding = '8px 12px';
      tdQ.style.border = '1px solid var(--border-color)';
      tdQ.style.width = '60%';
      tdQ.style.verticalAlign = 'top';
      
      const tdA = document.createElement('td');
      tdA.style.padding = '8px 12px';
      tdA.style.border = '1px solid var(--border-color)';
      tdA.style.width = '40%';
      tdA.style.verticalAlign = 'top';
      
      const qSpan = cell.querySelector('span');
      if (qSpan) tdQ.appendChild(qSpan.cloneNode(true));
      else tdQ.innerHTML = cell.innerHTML.replace(/<div class="do-now-answer".*?<\/div>/, '');
      
      const answer = cell.querySelector('.do-now-answer');
      if (answer) {
        const newAnswer = answer.cloneNode(true);
        tdA.appendChild(newAnswer);
      }
      
      tr.appendChild(tdQ);
      tr.appendChild(tdA);
      table.appendChild(tr);
      modifiedDoNows++;
    });
    
    grid.parentNode.replaceChild(table, grid);
  }
});
console.log('Modified Do Nows:', modifiedDoNows);

// 2. Reference Maps
const mapIcons = document.querySelectorAll('.fa-map');
let mapsModified = 0;
mapIcons.forEach(icon => {
  const parent = icon.parentElement;
  if (parent && parent.textContent.includes('Reference Map:')) {
    parent.innerHTML = parent.innerHTML.replace(/Reference [Mm]ap:/, '').trim();
    mapsModified++;
  }
});
console.log('Modified Reference Maps:', mapsModified);

// 3. Lesson 1 Spilling
const pages = document.querySelectorAll('.page');
pages.forEach(page => {
  if (['page-4', 'page-5', 'page-8', 'page-9', 'page-12', 'page-13', 'page-16', 'page-17', 'page-20', 'page-21'].includes(page.id)) {
      const vocab = page.querySelectorAll('.core-vocab-block, [style*="Core Vocabulary"]');
      vocab.forEach(v => {
          if(v.style.fontSize) v.style.fontSize = '9pt';
          const ps = v.querySelectorAll('p, li');
          ps.forEach(p => p.style.fontSize = '8pt'); // make even smaller to be safe
      });
      const narrative = page.querySelectorAll('.narrative-col, p');
      narrative.forEach(n => {
          if (!n.closest('.writing-lines-box') && !n.closest('.do-now-answer')) {
              if (n.style.fontSize) n.style.fontSize = '9pt';
              else if (n.classList.contains('narrative-col')) n.style.fontSize = '9pt';
          }
      });
      const lines = page.querySelectorAll('.writing-lines-box');
      lines.forEach(l => {
          if (l.style.height === '40mm') l.style.height = '35mm';
      });
  }
});
console.log('Adjusted fonts for spill prevention');

// 4. Page 8 Footer
const page8 = document.getElementById('page-8');
if (page8) {
  const footer = page8.querySelector('.page-footer');
  if (!footer) {
    const newFooter = document.createElement('div');
    newFooter.className = 'page-footer';
    newFooter.style.position = 'absolute';
    newFooter.style.bottom = '10mm';
    newFooter.style.left = '0';
    newFooter.style.right = '0';
    newFooter.style.textAlign = 'center';
    newFooter.style.fontSize = '8pt';
    newFooter.style.color = '#888';
    newFooter.innerHTML = '<span class="page-number">8</span>';
    page8.appendChild(newFooter);
    console.log('Added missing footer to Page 8');
  } else {
    footer.style.position = 'absolute';
    footer.style.bottom = '10mm';
    console.log('Fixed existing Page 8 footer');
  }
}
const footers = document.querySelectorAll('.page-footer');
footers.forEach(f => {
  if (f.parentElement && f.parentElement.classList.contains('page')) {
    f.style.marginTop = 'auto';
    f.style.position = 'absolute';
    f.style.bottom = '10mm';
    f.style.left = '0';
    f.style.right = '0';
    f.style.textAlign = 'center';
  }
});

// 5. Relocate Copy Lesson Answers
const copyButtons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Copy Lesson Answers'));
let movedButtons = 0;
copyButtons.forEach(btn => {
  const oldContainer = btn.parentElement;
  const page = btn.closest('.page');
  if (page) {
    const toolbar = page.querySelector('.sen-support-toolbar');
    if (toolbar) {
       toolbar.appendChild(btn);
       btn.style.marginLeft = '8px';
       btn.style.padding = '4px 8px';
       btn.style.fontSize = '8pt';
       movedButtons++;
       
       if (oldContainer && oldContainer.children.length === 0) {
           oldContainer.remove();
       }
    }
  }
});
console.log('Moved copy buttons:', movedButtons);

// 6. Question 4 Consolidation
const q4Headers = Array.from(document.querySelectorAll('h3.section-subtitle')).filter(el => el.textContent.includes('4. INDEPENDENT CONSOLIDATION'));
let q4Modified = 0;
q4Headers.forEach(h3 => {
  h3.innerHTML = '4. <span style="font-weight: 500; font-size: 11pt; color: #333;">(Answer the question below in your own words)</span>';
  
  let sibling = h3.nextElementSibling;
  while(sibling) {
    if (sibling.textContent.includes('Consolidation Writing Prompts')) {
      sibling.style.display = 'none';
    }
    if (sibling.classList.contains('quote-box') || (sibling.style && sibling.style.borderLeft)) {
      const scaffolding = document.createElement('div');
      scaffolding.style.marginTop = '8px';
      scaffolding.style.fontSize = '9pt';
      scaffolding.style.color = '#555';
      scaffolding.style.fontStyle = 'italic';
      scaffolding.innerHTML = '<strong>Key terms to include:</strong> Alliance, Tension, Militarism, Conflict, Power.';
      sibling.parentNode.insertBefore(scaffolding, sibling.nextSibling);
      break;
    }
    sibling = sibling.nextElementSibling;
  }
  q4Modified++;
});
console.log('Modified Q4s:', q4Modified);

fs.writeFileSync('great_war/index.html', dom.serialize());
console.log('Successfully refactored great_war/index.html');

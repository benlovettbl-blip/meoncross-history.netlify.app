const fs = require('fs');
const file = 'src/core_app.js';
let content = fs.readFileSync(file, 'utf8');

const regex = /window\.jumpToKeyIndividual = function\(name\) \{[\s\S]+?let targetLink = null;\s+kiLinks\.forEach\(l => \{\s+if \(l\.innerText\.includes\('Key Individuals'\)\) targetLink = l;\s+\}\);/m;

const newCode = `window.jumpToKeyIndividual = function(name) {
    let targetTab = 'historical_individuals'; // default
    let linkSearchStr = 'Historical Individuals';
    
    if (window.db && window.currentUnitId && window.db[window.currentUnitId]) {
      const unitData = window.db[window.currentUnitId].data || window.db[window.currentUnitId];
      if (unitData && unitData.key_individuals) {
         const person = unitData.key_individuals.find(p => p.name.toLowerCase() === name.toLowerCase());
         if (person && person.group === 'Historians') {
            targetTab = 'historians';
            linkSearchStr = 'Historians';
         }
      }
    }

    const url = new URL(window.location);
    url.searchParams.set('tab', targetTab);
    history.pushState({ customTab: targetTab }, "", url);
  
    // 1. Find the sidebar link and click it
    const kiLinks = document.querySelectorAll('.lesson-link');
    let targetLink = null;
    kiLinks.forEach(l => {
      // Avoid partial match false positives (e.g. "Historical Individuals" contains "Historians" if not careful, though technically it doesn't)
      if (l.innerText.includes(linkSearchStr)) {
         if (linkSearchStr === 'Historians' && l.innerText.includes('Historical')) {
             return; // skip
         }
         targetLink = l;
      }
    });`;

content = content.replace(regex, newCode);
fs.writeFileSync(file, content);
console.log("Updated core_app.js");

const fs = require('fs');

async function patchHyperlinks() {
  const dataFile = 'early_modern_world/data.js';
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  const aliases = {
    "Prof. Peter Frankopan": ["Professor Peter Frankopan", "Prof. Peter Frankopan", "Peter Frankopan"],
    "Dr. Geoffrey Parker": ["Dr. Geoffrey Parker", "Geoffrey Parker"],
    "Sir John Seeley": ["Sir John Seeley", "John Seeley"],
    "Prof. Shashi Tharoor": ["Professor Shashi Tharoor", "Prof. Shashi Tharoor", "Shashi Tharoor"],
    "Prof. Christopher Hill": ["Professor Christopher Hill", "Prof. Christopher Hill", "Christopher Hill"],
    "Prof. Eric Williams": ["Professor Eric Williams", "Prof. Eric Williams", "Eric Williams"],
    "Reginald Coupland": ["Reginald Coupland"],
    "Prof. Roy Porter": ["Professor Roy Porter", "Prof. Roy Porter", "Roy Porter"],
    "Prof. J.C.D. Clark": ["Professor J.C.D. Clark", "Prof. J.C.D. Clark", "J.C.D. Clark"]
  };

  const searchMap = {};
  data.key_individuals.forEach(person => {
    let namesToSearch = aliases[person.name] ? [...aliases[person.name]] : [person.name];
    searchMap[person.name] = namesToSearch;
  });

  let patchedCount = 0;
  const alreadyLinked = new Set();

  data.lessons.forEach(lesson => {
    if (!lesson.text) return;
    
    for (const personName in searchMap) {
      if (alreadyLinked.has(personName)) continue;

      const searchTerms = searchMap[personName];
      let matched = false;

      for (const term of searchTerms) {
        if (matched) break;

        const idx = lesson.text.indexOf(term);
        // Only replace if it isn't already inside an <a> tag
        if (idx !== -1 && !lesson.text.includes(`jumpToKeyIndividual('${personName}')`)) {
          const replacement = `<a href="#" onclick="if(window.jumpToKeyIndividual) window.jumpToKeyIndividual('${personName}'); return false;" style="color: var(--primary); font-weight: bold; text-decoration: underline; cursor: pointer;">${term}</a>`;
          
          lesson.text = lesson.text.substring(0, idx) + replacement + lesson.text.substring(idx + term.length);
          matched = true;
          patchedCount++;
        }
      }

      if (matched) {
        alreadyLinked.add(personName);
      }
    }
  });

  if (patchedCount > 0) {
    const output = `export const unitData = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(dataFile, output);
    console.log(`Successfully added ${patchedCount} hyperlinks to early_modern_world/data.js`);
  } else {
    console.log("No new hyperlinks added.");
  }
}

patchHyperlinks().catch(console.error);

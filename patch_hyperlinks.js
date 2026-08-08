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

  // Build full alias map for all key individuals
  const searchMap = {};
  data.key_individuals.forEach(person => {
    let namesToSearch = aliases[person.name] ? [...aliases[person.name]] : [person.name];
    searchMap[person.name] = namesToSearch;
  });

  let patchedCount = 0;

  // Track who has already been hyperlinked so we only do it the FIRST time
  const alreadyLinked = new Set();

  data.lessons.forEach(lesson => {
    // Only search in lesson.text
    if (!lesson.text) return;
    
    for (const personName in searchMap) {
      if (alreadyLinked.has(personName)) continue; // Only first intro

      const searchTerms = searchMap[personName];
      let matched = false;

      for (const term of searchTerms) {
        if (matched) break;

        // Check if term exists in text, not already inside an <a> tag
        // Simple regex to find the term not preceded or followed by <a> tags
        const regex = new RegExp(`(?<!<a[^>]*>)(?:\\b)?(${term.replace(/\\./g, '\\\\.')})(?:\\b)?(?![^<]*</a>)`, 'g');
        
        if (regex.test(lesson.text)) {
          // Replace the FIRST occurrence in this lesson
          lesson.text = lesson.text.replace(regex, (match) => {
            if (matched) return match; // only replace once per lesson if multiple matches
            matched = true;
            patchedCount++;
            return `<a href="#" onclick="if(window.jumpToKeyIndividual) window.jumpToKeyIndividual('${personName}'); return false;" style="color: var(--primary); font-weight: bold; text-decoration: underline; cursor: pointer;">${match}</a>`;
          });
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

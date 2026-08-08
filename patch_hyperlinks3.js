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
    "Prof. J.C.D. Clark": ["Professor J.C.D. Clark", "Prof. J.C.D. Clark", "J.C.D. Clark"],
    "Admiral Zheng He": ["Admiral Zheng He", "Zheng He"],
    "King Charles I": ["King Charles I", "Charles I"],
    "King Charles II": ["King Charles II", "Charles II"],
    "Sir Walter Raleigh": ["Sir Walter Raleigh", "Walter Raleigh"],
    "Martin Luther": ["Martin Luther"],
    "Chief Powhatan": ["Chief Powhatan", "Powhatan"],
    "Mary, Queen of Scots": ["Mary, Queen of Scots", "Mary Stuart"],
    "King James I": ["King James I", "James I"],
    "Henry Fielding": ["Henry Fielding"],
    "Robert Clive": ["Robert Clive"]
  };

  const searchMap = {};
  data.key_individuals.forEach(person => {
    let namesToSearch = aliases[person.name] ? [...aliases[person.name]] : [person.name];
    searchMap[person.name] = namesToSearch;
  });

  let patchedCount = 0;
  const alreadyLinked = new Set();

  function recurseAndReplace(obj) {
    if (typeof obj === 'string') {
      let currentStr = obj;
      let matchedAny = false;
      for (const personName in searchMap) {
        if (alreadyLinked.has(personName)) continue;

        const searchTerms = searchMap[personName];
        let matched = false;

        for (const term of searchTerms) {
          if (matched) break;

          const idx = currentStr.indexOf(term);
          if (idx !== -1 && !currentStr.includes(`jumpToKeyIndividual('${personName}')`)) {
            // Check if the match is inside an existing HTML tag definition
            // Simple heuristic: if it's inside <...>, don't replace.
            const textBefore = currentStr.substring(0, idx);
            if (textBefore.lastIndexOf('<') > textBefore.lastIndexOf('>')) {
               // We are inside an HTML tag, skip.
               continue;
            }

            const replacement = `<a href="#" onclick="if(window.jumpToKeyIndividual) window.jumpToKeyIndividual('${personName}'); return false;" style="color: var(--primary); font-weight: bold; text-decoration: underline; cursor: pointer;">${term}</a>`;
            currentStr = currentStr.substring(0, idx) + replacement + currentStr.substring(idx + term.length);
            matched = true;
            patchedCount++;
          }
        }

        if (matched) {
          alreadyLinked.add(personName);
          matchedAny = true;
        }
      }
      return { changed: matchedAny, value: currentStr };
    }

    if (Array.isArray(obj)) {
      let arrayChanged = false;
      for (let i = 0; i < obj.length; i++) {
        const res = recurseAndReplace(obj[i]);
        if (res.changed) {
          obj[i] = res.value;
          arrayChanged = true;
        }
      }
      return { changed: arrayChanged, value: obj };
    }

    if (obj !== null && typeof obj === 'object') {
      let objChanged = false;
      for (const key in obj) {
        // Only modify string values in specific text-heavy fields to avoid corrupting data
        if (['text', 'description', 'content', 'model_answer'].includes(key) || (typeof obj[key] === 'string' && obj[key].length > 50)) {
           const res = recurseAndReplace(obj[key]);
           if (res.changed) {
             obj[key] = res.value;
             objChanged = true;
           }
        } else if (typeof obj[key] === 'object') {
           const res = recurseAndReplace(obj[key]);
           if (res.changed) {
             objChanged = true;
           }
        }
      }
      return { changed: objChanged, value: obj };
    }

    return { changed: false, value: obj };
  }

  // Iterate over each lesson and apply replacements sequentially
  data.lessons.forEach(lesson => {
    recurseAndReplace(lesson);
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

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../units/great_war_part2/data.js');
let raw = fs.readFileSync(filePath, 'utf8').trim();

// Extract JSON
const prefix = 'export const unitData = ';
const suffix = ';\nexport default unitData;';

let jsonStr = raw;
if (raw.startsWith(prefix)) {
  jsonStr = raw.slice(prefix.length);
}
if (jsonStr.endsWith(';\nexport default unitData;')) {
  jsonStr = jsonStr.slice(0, -(';\nexport default unitData;'.length));
} else if (jsonStr.endsWith('; export default unitData;')) {
  jsonStr = jsonStr.slice(0, -('; export default unitData;'.length));
} else if (jsonStr.endsWith(';\nexport default unitData')) {
  jsonStr = jsonStr.slice(0, -(';\nexport default unitData'.length));
}

const data = JSON.parse(jsonStr);

function cleanSource(src, lessonIdx) {
  if (!src) return;

  // Delete provenance_clues
  delete src.provenance_clues;

  // Lesson 1 (index 0), Source D (Jessie Pope)
  if (lessonIdx === 0 && src.letter === 'D') {
    src.type = 'written';
    delete src.image;
    delete src.src;
    src.title = "Source D (Propaganda Verse): Jessie Pope, 'Who’s for the Game?' (1915)";
    src.caption = "Extract from Jessie Pope’s recruitment poem 'Who’s for the Game?', published in the Daily Mail in 1915.";
    src.citation = "Jessie Pope, War Poems (Grant Richards Ltd, London, 1915) / British Library.";
  }

  // Lesson 2 (index 1), Source C (Douglas Haig)
  if (lessonIdx === 1 && src.letter === 'C') {
    src.type = 'written';
    delete src.image;
    delete src.src;
    src.title = "Source C (High Command Directive): Fourth Army Operational Plan for the Somme Offensive (June 1916)";
    src.caption = "Extract from General Headquarters Fourth Army Operational Directive issued by General Sir Douglas Haig prior to the 1 July 1916 Somme offensive (The National Archives, WO 158/17).";
    src.citation = "The National Archives (TNA), Kew, WO 158/17.";
  }

  // Lesson 4 (index 3), Source A (DORA)
  if (lessonIdx === 3 && src.letter === 'A') {
    src.type = 'written';
    delete src.image;
    delete src.src;
    src.title = "Source A (Emergency Statute): The Defence of the Realm Act (DORA), Section 1 (8 August 1914)";
    src.caption = "Extract from Section 1 of the Defence of the Realm Act, passed by the UK Parliament on 8 August 1914 (Parliament Archives, 4 & 5 Geo. 5 c. 29).";
    src.citation = "UK Parliament Archives (4 & 5 Geo. 5 c. 29).";
  }

  // Lesson 5 (index 4), Source B (Armistice)
  if (lessonIdx === 4 && src.letter === 'B') {
    src.type = 'written';
    delete src.image;
    delete src.src;
    src.title = "Source B (Armistice Convention): The Military Conditions of the 11 November 1918 Armistice";
    src.caption = "Extract from the official military conditions of the Armistice with Germany, signed in Marshal Foch's railway carriage at Compiègne on 11 November 1918 (The National Archives, FO 371/3448).";
    src.citation = "The National Archives, Kew (FO 371/3448).";
  }

  // Lesson 5 (index 4), Source D (Versailles)
  if (lessonIdx === 4 && src.letter === 'D') {
    src.type = 'written';
    delete src.image;
    delete src.src;
    src.title = "Source D (State Treaty): The Treaty of Versailles Articles 231 (War Guilt) & 232 (Reparations) (1919)";
    src.caption = "Extract from Articles 231 and 232 of the Treaty of Versailles, signed on 28 June 1919 (Treaty Series No. 4, 1919, Cmd. 153).";
    src.citation = "Treaty Series No. 4 (1919, Cmd. 153) / The National Archives, Kew (FO 925/24185).";
  }
}

// Remove provenance_clues recursively
function stripProvenance(obj) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    obj.forEach(stripProvenance);
    return;
  }
  if (obj.provenance_clues) {
    delete obj.provenance_clues;
  }
  for (const k of Object.keys(obj)) {
    stripProvenance(obj[k]);
  }
}

stripProvenance(data);

(data.lessons || []).forEach((les, lIdx) => {
  if (les.narrative_blocks) {
    les.narrative_blocks.forEach(block => {
      if (block.source) cleanSource(block.source, lIdx);
      if (Array.isArray(block.sources)) {
        block.sources.forEach(s => cleanSource(s, lIdx));
      }
    });
  }
  if (Array.isArray(les.sources)) {
    les.sources.forEach(s => cleanSource(s, lIdx));
  }
});

const output = `export const unitData = ${JSON.stringify(data, null, 2)};\nexport default unitData;\n`;

fs.writeFileSync(filePath, output, 'utf8');

// Mirror to public/units/great_war_part2/data.js
const pubPath = path.join(__dirname, '../public/units/great_war_part2/data.js');
if (fs.existsSync(pubPath)) {
  fs.writeFileSync(pubPath, output, 'utf8');
}

// Mirror to data/great_war_part2.json
const jsonPath = path.join(__dirname, '../data/great_war_part2.json');
if (fs.existsSync(jsonPath)) {
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
}

// Mirror to public/data/great_war_part2.json
const pubJsonPath = path.join(__dirname, '../public/data/great_war_part2.json');
if (fs.existsSync(pubJsonPath)) {
  fs.writeFileSync(pubJsonPath, JSON.stringify(data, null, 2), 'utf8');
}

console.log('Successfully updated great_war_part2 data.js and mirrors!');

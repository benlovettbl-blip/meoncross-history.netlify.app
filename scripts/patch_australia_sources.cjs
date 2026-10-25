const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'units/australia/data.js',
  'public/units/australia/data.js',
  'data/australia.json',
  'public/data/australia.json',
  'public/database.json'
];

function updateAustraliaData(obj) {
  const aus = obj.australia ? (obj.australia.data || obj.australia) : obj;
  if (!aus.lessons) return;

  // Lesson 3
  const l3 = aus.lessons.find(l => l.id === 'lesson_3');
  if (l3) {
    (l3.narrative_blocks || []).forEach(b => {
      if (b.source && b.source.letter === 'A') {
        b.source.title = "Source A: Attributed to James Neagle, Portrait of Woollarawarre Bennelong in European Dress (c. 1798)";
      }
    });
    (l3.sources || []).forEach(s => {
      if (s.letter === 'A') {
        s.title = "Source A: Attributed to James Neagle, Portrait of Woollarawarre Bennelong in European Dress (c. 1798)";
      }
    });
  }

  // Lesson 4
  const l4 = aus.lessons.find(l => l.id === 'lesson_4');
  if (l4) {
    (l4.narrative_blocks || []).forEach(b => {
      if (b.source && b.source.letter === 'A') {
        b.source.image = "/images/governor_arthur_proclamation_board_1829.jpg";
      }
      if (b.source && b.source.letter === 'B') {
        b.source.image = "/images/myall_creek_deposition_1838.jpg";
        b.source.caption = "Official report and deposition concerning the Myall Creek Massacre, written by station manager William Hobbs to Police Magistrate Edward Denny Day (Invermein Court of Petty Sessions / NSW State Archives Collection NRS 19437, 9 July 1838).";
      }
    });
    (l4.sources || []).forEach(s => {
      if (s.letter === 'A') {
        s.image = "/images/governor_arthur_proclamation_board_1829.jpg";
      }
      if (s.letter === 'B') {
        s.image = "/images/myall_creek_deposition_1838.jpg";
        s.caption = "Official report and deposition concerning the Myall Creek Massacre, written by station manager William Hobbs to Police Magistrate Edward Denny Day (Invermein Court of Petty Sessions / NSW State Archives Collection NRS 19437, 9 July 1838).";
      }
    });
  }

  // Lesson 5
  const l5 = aus.lessons.find(l => l.id === 'lesson_5');
  if (l5) {
    (l5.narrative_blocks || []).forEach(b => {
      if (b.source && b.source.letter === 'B') {
        b.source.image = "/images/doudiet_southern_cross_eureka_1854.jpg";
      }
    });
    (l5.sources || []).forEach(s => {
      if (s.letter === 'B') {
        s.image = "/images/doudiet_southern_cross_eureka_1854.jpg";
      }
    });
  }
}

filesToUpdate.forEach(relPath => {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) return;
  console.log(`Updating ${relPath}...`);
  if (relPath.endsWith('.json')) {
    const json = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    updateAustraliaData(json);
    fs.writeFileSync(fullPath, JSON.stringify(json, null, 2), 'utf8');
  } else if (relPath.endsWith('.js')) {
    let content = fs.readFileSync(fullPath, 'utf8');
    // Replace in JS string
    content = content.replace(/\/images\/aus_day_of_mourning\.jpg/g, '/images/governor_arthur_proclamation_board_1829.jpg');
    content = content.replace(/\/images\/aus_first_fleet\.jpg/g, '/images/myall_creek_deposition_1838.jpg');
    content = content.replace(/"image":\s*"\/images\/gold_rush\.jpg"/g, '"image": "/images/doudiet_southern_cross_eureka_1854.jpg"');
    content = content.replace(/"Source A:\s*Woollarawarre Bennelong,\s*Letter to Mr Phillips \(1796\)"/g, '"Source A: Attributed to James Neagle, Portrait of Woollarawarre Bennelong in European Dress (c. 1798)"');
    fs.writeFileSync(fullPath, content, 'utf8');
  }
});

console.log('Successfully updated Australia files.');

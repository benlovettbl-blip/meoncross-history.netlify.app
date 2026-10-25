const fs = require('fs');
const path = require('path');

const filesToPatch = [
  'units/water_and_sanitation/data.js',
  'public/units/water_and_sanitation/data.js',
  'public/database.json'
];

function patchUnit(data) {
  const ws = data.water_and_sanitation ? (data.water_and_sanitation.data || data.water_and_sanitation) : data;
  if (!ws || !ws.lessons) return;

  // Lesson 2
  const l2 = ws.lessons.find(l => l.id === 'lesson_2');
  if (l2) {
    (l2.narrative_blocks || []).forEach(b => {
      if (b.source) {
        if (b.source.letter === 'A') {
          b.source.image = '/images/medieval_court_roll_manuscript.png';
          b.source.caption = 'Medieval manor and municipal court roll manuscript recording presentments, fines, and bylaws for waste disposal and nuisance ordure (Huntington Library / Local Archives Collection).';
        }
        if (b.source.letter === 'B') {
          b.source.image = '/images/canterbury_waterworks_plan_1165.jpg';
          b.source.caption = 'The famous hydraulic engineering plan of Christ Church Priory, Canterbury, from the 12th-century Eadwine Psalter (Trinity College Cambridge MS R.17.1, c. 1165), showing conduits, settling tanks, and running water piped to the monastic cloister.';
        }
      }
    });
    (l2.sources || []).forEach(s => {
      if (s.letter === 'A') {
        s.image = '/images/medieval_court_roll_manuscript.png';
        s.caption = 'Medieval manor and municipal court roll manuscript recording presentments, fines, and bylaws for waste disposal and nuisance ordure (Huntington Library / Local Archives Collection).';
      }
      if (s.letter === 'B') {
        s.image = '/images/canterbury_waterworks_plan_1165.jpg';
        s.caption = 'The famous hydraulic engineering plan of Christ Church Priory, Canterbury, from the 12th-century Eadwine Psalter (Trinity College Cambridge MS R.17.1, c. 1165), showing conduits, settling tanks, and running water piped to the monastic cloister.';
      }
    });
  }

  // Lesson 3
  const l3 = ws.lessons.find(l => l.id === 'lesson_3');
  if (l3) {
    (l3.narrative_blocks || []).forEach(b => {
      if (b.source) {
        if (b.source.letter === 'B') {
          b.source.image = '/images/samuel_pepys_diary_manuscript_1660.png';
          b.source.caption = 'Original autograph manuscript page written by Samuel Pepys in 1660, recording his private thoughts, official naval duties, and the domestic realities of Stuart London (Pepys Library, Magdalene College, Cambridge).';
        }
        if (b.source.letter === 'C') {
          b.source.image = '/images/london_bill_of_mortality_1665.jpg';
          b.source.caption = 'Official London Bill of Mortality broadsheet ("London\'s Dreadful Visitation") published by the Company of Parish Clerks during the Great Plague of 1665, recording mortality and burials across 130 parishes.';
        }
      }
    });
    (l3.sources || []).forEach(s => {
      if (s.letter === 'B') {
        s.image = '/images/samuel_pepys_diary_manuscript_1660.png';
        s.caption = 'Original autograph manuscript page written by Samuel Pepys in 1660, recording his private thoughts, official naval duties, and the domestic realities of Stuart London (Pepys Library, Magdalene College, Cambridge).';
      }
      if (s.letter === 'C') {
        s.image = '/images/london_bill_of_mortality_1665.jpg';
        s.caption = 'Official London Bill of Mortality broadsheet ("London\'s Dreadful Visitation") published by the Company of Parish Clerks during the Great Plague of 1665, recording mortality and burials across 130 parishes.';
      }
    });
  }

  // Lesson 4
  const l4 = ws.lessons.find(l => l.id === 'lesson_4');
  if (l4) {
    (l4.narrative_blocks || []).forEach(b => {
      if (b.source) {
        if (b.source.letter === 'A') {
          b.source.image = '/images/court_for_king_cholera.png';
          b.source.caption = 'John Leech\'s famous satirical woodcut engraving "A Court for King Cholera", published in Punch on 25 September 1852, depicting an overcrowded slum courtyard strewn with refuse, coffins, and neglected children.';
        }
        if (b.source.letter === 'B') {
          b.source.image = '/images/chadwick_sanitary_report_1842.jpg';
          b.source.caption = 'Title page and epidemiological statistics from Edwin Chadwick\'s landmark 1842 Report to the Poor Law Commissioners on the Sanitary Condition of the Labouring Population of Great Britain (House of Commons / Wellcome Collection).';
        }
      }
    });
    (l4.sources || []).forEach(s => {
      if (s.letter === 'A') {
        s.image = '/images/court_for_king_cholera.png';
        s.caption = 'John Leech\'s famous satirical woodcut engraving "A Court for King Cholera", published in Punch on 25 September 1852, depicting an overcrowded slum courtyard strewn with refuse, coffins, and neglected children.';
      }
      if (s.letter === 'B') {
        s.image = '/images/chadwick_sanitary_report_1842.jpg';
        s.caption = 'Title page and epidemiological statistics from Edwin Chadwick\'s landmark 1842 Report to the Poor Law Commissioners on the Sanitary Condition of the Labouring Population of Great Britain (House of Commons / Wellcome Collection).';
      }
    });
  }

  // Lesson 5
  const l5 = ws.lessons.find(l => l.id === 'lesson_5');
  if (l5) {
    (l5.narrative_blocks || []).forEach(b => {
      if (b.source) {
        if (b.source.letter === 'A') {
          b.source.image = '/images/father_thames_punch_1858.jpg';
          b.source.caption = 'Punch satirical cartoon (3 July 1858): "Father Thames Introducing His Offspring to the Fair City of London", depicting the foul river presenting Diphtheria, Scrofula, and Cholera during the Great Stink.';
        }
      }
    });
    (l5.sources || []).forEach(s => {
      if (s.letter === 'A') {
        s.image = '/images/father_thames_punch_1858.jpg';
        s.caption = 'Punch satirical cartoon (3 July 1858): "Father Thames Introducing His Offspring to the Fair City of London", depicting the foul river presenting Diphtheria, Scrofula, and Cholera during the Great Stink.';
      }
    });
  }
}

filesToPatch.forEach(relPath => {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) return;
  console.log(`Patching ${relPath}...`);
  if (relPath.endsWith('.json')) {
    const json = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    patchUnit(json);
    fs.writeFileSync(fullPath, JSON.stringify(json, null, 2), 'utf8');
  } else if (relPath.endsWith('.js')) {
    let content = fs.readFileSync(fullPath, 'utf8');
    // Replace paths in JS
    content = content.replace(/\/images\/water_local_fishbourne\.jpg/g, (match, offset, str) => {
      // If it's in Lesson 2 (Canterbury plan), replace it
      const before = str.slice(Math.max(0, offset - 400), offset);
      if (before.includes('Canterbury') || before.includes('Christ Church')) {
        return '/images/canterbury_waterworks_plan_1165.jpg';
      }
      return match;
    });

    content = content.replace(/\/images\/black_death\.jpg/g, (match, offset, str) => {
      const before = str.slice(Math.max(0, offset - 400), offset);
      if (before.includes('Court Rolls') || before.includes('Winchester')) {
        return '/images/medieval_court_roll_manuscript.png';
      }
      if (before.includes('Pepys') || before.includes('Diary')) {
        return '/images/samuel_pepys_diary_manuscript_1660.png';
      }
      if (before.includes('Plague Broadsheet') || before.includes('Bill of Mortality')) {
        return '/images/london_bill_of_mortality_1665.jpg';
      }
      return match;
    });

    content = content.replace(/\/images\/victorian_slum\.jpg/g, (match, offset, str) => {
      const before = str.slice(Math.max(0, offset - 400), offset);
      if (before.includes('King Cholera')) {
        return '/images/court_for_king_cholera.png';
      }
      if (before.includes('Chadwick')) {
        return '/images/chadwick_sanitary_report_1842.jpg';
      }
      return match;
    });

    content = content.replace(/\/images\/bazalgette_sewer\.jpg/g, (match, offset, str) => {
      const before = str.slice(Math.max(0, offset - 400), offset);
      if (before.includes('Father Thames')) {
        return '/images/father_thames_punch_1858.jpg';
      }
      return match;
    });

    fs.writeFileSync(fullPath, content, 'utf8');
  }
});

console.log('✅ Successfully patched all Water and Sanitation data files.');

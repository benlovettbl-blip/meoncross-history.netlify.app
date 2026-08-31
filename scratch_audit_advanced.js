const fs = require('fs');

const dataFile = 'cme_new/data.js';
const txt = fs.readFileSync(dataFile, 'utf8');
const unit = eval('(' + txt.substring(txt.indexOf('{'), txt.lastIndexOf('}')+1) + ')');

const searchTerms = [
  "King David Hotel",
  "Resolution 181",
  "IDF",
  "Law of Return",
  "US aid",
  "attacks on Gaza",
  "Sinai in 1956",
  "United Arab Republic",
  "Cairo Conference",
  "raid on Samu",
  "7 April 1967",
  "Munich",
  "Black September",
  "PFLP",
  "oil crisis",
  "shuttle diplomacy",
  "Treaty of Washington",
  "Begin's visit to Egypt",
  "Arafat's speech to the UN (1974)",
  "Arafat's renunciation of terrorism",
  "Gulf War",
  "end of the Cold War",
  "Palestinian National Authority",
  "Oslo II"
];

const results = {};
searchTerms.forEach(term => results[term] = []);

unit.lessons.forEach(l => {
  if (l.narrative_blocks) {
    l.narrative_blocks.forEach(b => {
      const blockText = (b.text || "").toLowerCase();
      searchTerms.forEach(term => {
        if (blockText.includes(term.toLowerCase())) {
          results[term].push(`[Lesson ${l.title}] ${b.text.substring(0, 100)}...`);
        }
      });
    });
  }
});

for (const term in results) {
  console.log(`\n=== ${term} === (${results[term].length} hits)`);
  results[term].forEach(r => console.log('  ' + r));
}

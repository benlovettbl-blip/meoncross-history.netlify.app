const fs = require('fs');
const path = require('path');

const units = [
  { id: 'great_war', file: 'generate_great_war_quiz_booklet.cjs' },
  { id: 'great_war_part2', file: 'generate_great_war_part2_quiz_booklet.cjs' },
  { id: 'medieval_england', file: 'generate_medieval_england_quiz_booklet.cjs' },
  { id: 'monarchy_religion_power', file: 'generate_monarchy_religion_power_quiz_booklet.cjs' },
  { id: 'industrialisation_and_empire', file: 'generate_industrialisation_quiz_booklet.cjs' },
  { id: 'first_british_empire', file: 'generate_first_british_empire_quiz_booklet.cjs' },
  { id: 'second_british_empire', file: 'generate_second_british_empire_quiz_booklet.cjs' }
];

units.forEach(u => {
  const c = fs.readFileSync(path.join(__dirname, '..', u.file), 'utf8');
  const m = c.match(/const QUIZ_DATA = (\[[\s\S]*?\n\];)/);
  if (m) {
    const data = eval(m[1]);
    console.log(`\n=================== ${u.id} (${data.length} Enquiries) ===================`);
    data.forEach((enq, idx) => {
      const title = enq.lessonTitle || enq.title || enq.shortTitle || `Enquiry ${idx+1}`;
      const items = enq.items || enq.questions || [];
      console.log(`Enquiry ${idx+1}: ${title} (${items.length} Qs)`);
      items.slice(0, 3).forEach((item, qIdx) => {
        console.log(`   Q${qIdx+1}: ${item.q.slice(0, 60)}... -> Ans: ${item.a}`);
      });
    });
  }
});

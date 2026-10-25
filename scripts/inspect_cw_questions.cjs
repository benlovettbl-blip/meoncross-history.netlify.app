const fs = require('fs');
const list = JSON.parse(fs.readFileSync('scripts/cw_sources_dump.json', 'utf8'));
list.forEach((item, idx) => {
  console.log(`[${idx+1}/35] L${item.lessonIdx+1} Source ${item.letter}: ${item.question}`);
});

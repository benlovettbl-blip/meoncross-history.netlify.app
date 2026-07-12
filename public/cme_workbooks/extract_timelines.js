import fs from 'fs';
import { WORKBOOK_DATA } from '../src/workbook_data.js';

let output = '';
for (const [subtopicId, data] of Object.entries(WORKBOOK_DATA)) {
  output += `\n### ${subtopicId}: ${data.title}\n`;
  if (data.timeline) {
    data.timeline.forEach(item => {
      output += `- ${item.date}: ${item.desc}\n`;
    });
  } else {
    output += `(No timeline found)\n`;
  }
}

fs.writeFileSync('./scratch/extracted_timelines.txt', output);
console.log('Done extracting timelines.');

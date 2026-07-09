import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('great_war_v2', 'data.js');
const dataContent = fs.readFileSync(dataPath, 'utf8');

const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;\s*$/, '');
const unitData = JSON.parse(jsonContent);

unitData.lessons.forEach((l, i) => {
  console.log(`\n=== LESSON ${i+1}: ${l.title} ===`);
  if (l.primary_source) {
    console.log(`[PRIMARY SOURCE]`);
    console.log(`Title: ${l.primary_source.title}`);
    console.log(`Src: ${l.primary_source.src}`);
    console.log(`Caption: ${l.primary_source.caption}`);
    if (l.primary_source.tasks) l.primary_source.tasks.forEach((t, idx) => console.log(`Task ${idx+1}: ${t.text}`));
  }
  
  if (l.sources && l.sources.length > 0) {
    console.log(`[NARRATIVE SOURCES]`);
    l.sources.forEach(s => {
      console.log(`Title: ${s.title}`);
      console.log(`Src: ${s.src}`);
      console.log(`Caption: ${s.caption}`);
    });
  }

  if (l.gcse_task) {
    console.log(`[GCSE TASK SOURCES]`);
    l.gcse_task.sources.forEach(s => {
      console.log(`Type: ${s.type}`);
      if (s.src) console.log(`Src: ${s.src}`);
      if (s.text) console.log(`Text: ${s.text}`);
      console.log(`Title: ${s.title}`);
    });
  }
});

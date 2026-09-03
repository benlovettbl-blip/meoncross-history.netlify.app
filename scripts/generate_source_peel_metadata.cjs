/**
 * Generate source/PEEL metadata from the database.
 * Outputs public/source_peel_metadata.json
 */
const fs = require('fs');
const db = JSON.parse(fs.readFileSync('public/database.json', 'utf8'));

const Y7_Y8 = ['water_and_sanitation', 'medieval_england', 'early_modern_world',
  'industrialisation_and_empire', 'australia', 'great_war', 'great_war_part2'];

const sourcePatterns = [
  /study\s+source/i, /how\s+useful/i, /how\s+convincing/i,
  /how\s+far\s+do\s+you\s+agree/i, /source\s+[a-f]/i,
  /provenance/i, /study\s+interpretation/i,
  /what\s+can\s+.*learn\s+from/i
];

const peelPatterns = [
  /peel/i, /explain\s+why/i, /explain\s+two/i, /explain\s+one\s+consequence/i,
  /describe\s+one\s+feature/i, /write\s+a\s+(structured\s+)?paragraph/i,
  /extended\s+writing/i, /\(\d+\s*marks?\)/i, /capstone\s+essay/i,
  /synthesis\s+assessment/i
];

const metadata = {};

for (const uid of Y7_Y8) {
  const unit = db[uid] && db[uid].data;
  if (!unit || !unit.lessons) continue;
  
  metadata[uid] = {
    title: unit.title,
    lessons: []
  };
  
  for (let li = 0; li < unit.lessons.length; li++) {
    const L = unit.lessons[li];
    const sourceTasks = [];
    const peelTasks = [];
    
    if (L.narrative_blocks) {
      for (const block of L.narrative_blocks) {
        if (block.tasks) {
          for (const task of block.tasks) {
            const q = task.question || '';
            
            for (const pat of sourcePatterns) {
              if (pat.test(q)) {
                sourceTasks.push(q.substring(0, 120).replace(/\n/g, ' ').trim());
                break;
              }
            }
            
            for (const pat of peelPatterns) {
              if (pat.test(q)) {
                peelTasks.push(q.substring(0, 120).replace(/\n/g, ' ').trim());
                break;
              }
            }
          }
        }
      }
    }
    
    metadata[uid].lessons.push({
      title: L.title,
      source_task_count: sourceTasks.length,
      peel_task_count: peelTasks.length,
      source_task_examples: sourceTasks.slice(0, 3),
      peel_task_examples: peelTasks.slice(0, 3)
    });
  }
}

fs.writeFileSync('public/source_peel_metadata.json', JSON.stringify(metadata, null, 2), 'utf8');

// Print summary
let totalSource = 0, totalPeel = 0, lessonsWithSource = 0, lessonsWithPeel = 0;
for (const uid of Object.keys(metadata)) {
  for (const l of metadata[uid].lessons) {
    totalSource += l.source_task_count;
    totalPeel += l.peel_task_count;
    if (l.source_task_count > 0) lessonsWithSource++;
    if (l.peel_task_count > 0) lessonsWithPeel++;
  }
}

console.log('✅ Generated public/source_peel_metadata.json');
console.log(`   Source analysis tasks: ${totalSource} across ${lessonsWithSource} lessons`);
console.log(`   PEEL/extended writing tasks: ${totalPeel} across ${lessonsWithPeel} lessons`);

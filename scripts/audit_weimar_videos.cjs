const fs = require('fs');
const path = require('path');

async function auditWeimar() {
  const dataPath = path.join(__dirname, '..', 'units', 'weimar_nazi_germany', 'data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unit = mod.default || mod.unitData;

  console.log(`=== WEIMAR & NAZI GERMANY CURRICULUM AUDIT ===`);
  console.log(`Title: ${unit.title}`);
  console.log(`Total Lessons: ${unit.lessons.length}\n`);

  unit.lessons.forEach((l, i) => {
    const vids = [];
    if (Array.isArray(l.video)) vids.push(...l.video);
    else if (l.video) vids.push(l.video);
    if (Array.isArray(l.extra_videos)) vids.push(...l.extra_videos);

    console.log(`Lesson ${i + 1}: [${l.id}] ${l.title}`);
    console.log(`  Key Enquiry: ${l.enquiry || l.enquiry_question || 'N/A'}`);
    console.log(`  Current Videos (${vids.length}):`);
    vids.forEach((v, vIdx) => {
      const is3Tier = v.viewing_task && v.viewing_task.includes('Recall:') && v.viewing_task.includes('Explain:') && v.viewing_task.includes('Challenge:');
      console.log(`    ${vIdx + 1}. [${v.type || 'youtube'}] "${v.title || 'Untitled'}" (${v.duration || 'No dur'}) - 3Tier: ${is3Tier ? 'YES' : 'NO'}`);
      console.log(`       URL: ${v.url}`);
    });
    console.log('');
  });
}

auditWeimar().catch(console.error);

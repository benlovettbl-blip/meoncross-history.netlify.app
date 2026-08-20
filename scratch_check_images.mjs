import fs from 'fs';
import path from 'path';

async function checkImages() {
  const m = await import('./medieval_england/data.js');
  const data = m.unitData;

  const publicImages = fs.readdirSync('./public/images');
  console.log(`Found ${publicImages.length} images in public/images`);

  let brokenLinks = [];
  let sourcesList = [];

  function checkSrc(src, context) {
    if (!src) return;
    if (src.startsWith('http')) return; // external
    const filename = src.split('/').pop();
    if (!publicImages.includes(filename)) {
      brokenLinks.push(`${context}: ${filename}`);
    }
  }

  data.lessons.forEach((lesson, lIdx) => {
    let lessonSources = [];
    
    if (lesson.banner) checkSrc(lesson.banner, `Lesson ${lIdx+1} Banner`);
    
    if (lesson.key_individuals) {
      lesson.key_individuals.forEach(ki => {
        checkSrc(ki.image, `Lesson ${lIdx+1} KI ${ki.name}`);
        if (ki.image) {
          lessonSources.push({ type: 'Key Individual', title: ki.name, src: ki.image, usedInTask: false });
        }
      });
    }

    lesson.narrative_blocks?.forEach((block, bIdx) => {
      if (block.source && block.source.type === 'image') {
        checkSrc(block.source.src, `Lesson ${lIdx+1} Block ${bIdx+1} Source`);
        lessonSources.push({ type: 'Narrative Source', title: block.source.caption || block.title, src: block.source.src, usedInTask: false });
      }
      if (block.images) {
        block.images.forEach(img => {
          checkSrc(img.src, `Lesson ${lIdx+1} Block ${bIdx+1} Images array`);
          lessonSources.push({ type: 'Narrative Images Array', title: img.caption || img.alt, src: img.src, usedInTask: false });
        });
      }
      
      // Check tasks
      if (block.tasks) {
        block.tasks.forEach(task => {
          const taskText = (task.question || task.instruction || task.text || '').toLowerCase();
          lessonSources.forEach(src => {
            // Check if task refers to this source (by 'Source A', or 'picture', etc)
            if (taskText.includes('source') || taskText.includes('look at') || taskText.includes('diagram') || taskText.includes('image') || taskText.includes('portrait')) {
              src.usedInTask = true;
              src.taskAssigned = taskText;
            }
          });
        });
      }
    });

    sourcesList.push({ lesson: lesson.title, sources: lessonSources });
  });

  console.log('--- BROKEN LINKS ---');
  console.log(brokenLinks);
  
  console.log('\n--- SOURCES WITHOUT TASKS ---');
  sourcesList.forEach(l => {
    const unused = l.sources.filter(s => !s.usedInTask);
    if (unused.length > 0) {
      console.log(`${l.lesson}:`);
      unused.forEach(u => console.log(`  - ${u.title} (${u.src})`));
    }
  });
  
  fs.writeFileSync('scratch_sources_report.json', JSON.stringify(sourcesList, null, 2));
}

checkImages().catch(console.error);

import fs from 'fs';

async function analyzeUnit() {
  const m = await import('./medieval_england/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  const analysis = [];

  data.lessons.forEach((lesson, index) => {
    let wordCount = 0;
    let visualSources = [];
    let visualSourceRefs = 0;
    let taskDescriptions = [];
    
    // Check global lesson tasks (e.g. Do Now, Plenary, Assessment)
    if (lesson.do_now) {
       taskDescriptions.push(`Do Now: ${lesson.do_now.type || 'text'}`);
    }

    if (lesson.key_individuals) {
       lesson.key_individuals.forEach(ki => {
         if (ki.image) visualSources.push(`KI: ${ki.name}`);
       });
    }

    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => {
        if (block.text) {
          wordCount += block.text.split(' ').length;
          // Count embedded images
          const imgMatches = block.text.match(/<img[^>]+>/g);
          if (imgMatches) {
            imgMatches.forEach(img => visualSources.push(`Inline Image`));
          }
        }
        if (block.source && block.source.type === 'image') {
          visualSources.push(block.source.caption || 'Image');
        }
        if (block.images) {
          block.images.forEach(img => {
            visualSources.push(img.caption || 'Image array item');
          });
        }
        if (block.tasks) {
           block.tasks.forEach(task => {
              const text = task.text || task.question || task.instruction || '';
              const type = task.type || 'free_text';
              taskDescriptions.push(type);
              
              if (text.toLowerCase().includes('source') || 
                  text.toLowerCase().includes('picture') || 
                  text.toLowerCase().includes('painting') || 
                  text.toLowerCase().includes('image') || 
                  text.toLowerCase().includes('photo') ||
                  text.toLowerCase().includes('look at') ||
                  text.toLowerCase().includes('visual')) {
                visualSourceRefs++;
              }
           });
        }
      });
    }

    if (lesson.tasks) {
      lesson.tasks.forEach(task => {
        taskDescriptions.push(task.type || 'global_task');
      });
    }
    
    const uniqueTasks = [...new Set(taskDescriptions)];

    analysis.push({
      lesson_number: index + 1,
      title: lesson.title,
      word_count: wordCount,
      visual_sources_count: visualSources.length,
      visual_sources_details: visualSources.join('; '),
      visual_sources_used_in_tasks: visualSourceRefs,
      task_variety: uniqueTasks.join(', ')
    });
  });

  console.log(JSON.stringify(analysis, null, 2));
}

analyzeUnit().catch(console.error);

import fs from 'fs';

async function analyzeUnit() {
  const m = await import('./medieval_england/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  const analysis = [];

  data.lessons.forEach((lesson, index) => {
    let wordCount = 0;
    let visualSources = 0;
    let visualSourceRefs = 0;
    let taskTypes = [];

    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => {
        if (block.text) wordCount += block.text.split(' ').length;
        if (block.source && block.source.type === 'image') {
          visualSources++;
        }
      });
    }

    if (lesson.tasks) {
      lesson.tasks.forEach(task => {
        taskTypes.push(task.type);
        if (task.text && (task.text.includes('source') || task.text.includes('Source') || task.text.includes('picture') || task.text.includes('painting') || task.text.includes('image') || task.text.includes('photo'))) {
          visualSourceRefs++;
        }
      });
    }

    analysis.push({
      lesson_number: index + 1,
      title: lesson.title,
      focus: lesson.title.split(':')[0] || lesson.title,
      narrative_word_count: wordCount,
      visual_sources: visualSources,
      visual_source_refs_in_tasks: visualSourceRefs,
      task_types: [...new Set(taskTypes)].join(', ') || 'None'
    });
  });

  console.log(JSON.stringify(analysis, null, 2));
}

analyzeUnit().catch(console.error);

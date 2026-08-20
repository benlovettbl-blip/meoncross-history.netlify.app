import fs from 'fs';

async function perfectAnalyze() {
  const m = await import('./medieval_england/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  const analysis = [];

  function findVisuals(obj, results) {
    if (!obj) return;
    if (typeof obj === 'string') {
      const imgMatches = obj.match(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/gi);
      if (imgMatches) {
        imgMatches.forEach(img => {
          results.push(`HTML <img>: ${img}`);
        });
      }
    } else if (Array.isArray(obj)) {
      obj.forEach(item => findVisuals(item, results));
    } else if (typeof obj === 'object') {
      if (obj.src && typeof obj.src === 'string' && (obj.src.includes('.jpg') || obj.src.includes('.png') || obj.src.includes('.jpeg') || obj.src.includes('.webp'))) {
        results.push(obj.caption || obj.alt || obj.src);
      }
      if (obj.image && typeof obj.image === 'string' && (obj.image.includes('.jpg') || obj.image.includes('.png') || obj.image.includes('.jpeg') || obj.image.includes('.webp'))) {
        results.push(`Key Individual Image: ${obj.name || obj.image}`);
      }
      if (obj.url && typeof obj.url === 'string' && (obj.url.includes('.jpg') || obj.url.includes('.png'))) {
        results.push(obj.caption || obj.alt || obj.url);
      }
      
      for (const key in obj) {
        if (key !== 'src' && key !== 'image' && key !== 'url') {
           findVisuals(obj[key], results);
        }
      }
    }
  }

  function findTasks(obj, results) {
    if (!obj) return;
    if (Array.isArray(obj)) {
      obj.forEach(item => findTasks(item, results));
    } else if (typeof obj === 'object') {
      // If it looks like a task (has a type and question/instruction)
      if (obj.type && (obj.question || obj.instruction || obj.text || obj.questions)) {
        if (!['image', 'written', 'video', 'youtube'].includes(obj.type)) {
           // It's a task
           let taskDesc = obj.type;
           let taskText = (obj.question || obj.instruction || obj.text || '').toLowerCase();
           
           if (taskText.includes('source') || taskText.includes('picture') || taskText.includes('painting') || taskText.includes('image') || taskText.includes('look at')) {
              taskDesc += ' [USES VISUAL]';
           }
           results.push(taskDesc);
        }
      }
      
      // Specifically check do_now since it's a special task format
      if (obj.do_now && obj.do_now.type) {
         results.push(`do_now_${obj.do_now.type}`);
      }

      for (const key in obj) {
        // don't recurse into do_now if we just handled it, but actually it's fine, we handled it specifically above
        if (key !== 'do_now_handled_marker') {
           findTasks(obj[key], results);
        }
      }
    }
  }
  
  function countWords(obj) {
    let count = 0;
    if (typeof obj === 'string') {
       // Only count substantial strings that look like narrative text (not URLs, types, short names)
       if (obj.length > 50 && !obj.startsWith('/') && !obj.startsWith('http')) {
          count += obj.split(/\s+/).length;
       }
    } else if (Array.isArray(obj)) {
       obj.forEach(item => count += countWords(item));
    } else if (typeof obj === 'object' && obj !== null) {
       // Only count in text, narrative, content fields to avoid counting tasks/meta
       if (obj.text) count += countWords(obj.text);
       if (obj.content) count += countWords(obj.content);
       // we specifically don't recurse blindly to avoid counting task text as narrative text
       if (obj.narrative_blocks) {
         count += countWords(obj.narrative_blocks);
       }
    }
    return count;
  }

  data.lessons.forEach((lesson, index) => {
    let visualSources = [];
    findVisuals(lesson, visualSources);
    
    // Deduplicate
    visualSources = [...new Set(visualSources)];

    let tasks = [];
    findTasks(lesson, tasks);
    tasks = [...new Set(tasks)];
    
    let sourceReferencingTasks = tasks.filter(t => t.includes('[USES VISUAL]')).length;

    let words = countWords(lesson);

    analysis.push({
      lesson_number: index + 1,
      title: lesson.title,
      word_count_est: words,
      visual_sources_count: visualSources.length,
      visual_sources: visualSources.join(' | '),
      task_types: tasks.join(', '),
      tasks_using_visuals: sourceReferencingTasks
    });
  });

  console.log(JSON.stringify(analysis, null, 2));
}

perfectAnalyze().catch(console.error);

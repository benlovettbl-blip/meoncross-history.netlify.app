const fs = require('fs');

let content = fs.readFileSync('early_modern_world/data.js', 'utf8');

// We can extract just the object literal
let match = content.match(/const early_modern_world = (\{[\s\S]+\});\nexport default/);
let dataStr = match[1];
let data;
eval('data = ' + dataStr);

data.lessons.forEach((lesson, i) => {
    // Collect all sources in the lesson
    let sources = [];
    
    // Find things that get assigned a source_letter
    // In typical Meoncross apps, "do_now" (if source based), "narrative" blocks (if they have images), etc.
    
    // Actually, I can just look at `lesson.tasks` and `lesson.narrative` or `lesson.content`
    if (lesson.narrative) {
         lesson.narrative.forEach(block => {
             if (block.type === 'source' || block.type === 'source_box' || block.image) {
                  sources.push(block.title || block.image_caption || block.image_alt || 'Unnamed source');
             }
         });
    }
    
    console.log(`\nLesson ${i+1}: ${lesson.title}`);
    console.log('Sources found:', sources);
    
    // Find tasks that refer to sources
    lesson.tasks?.forEach((task, j) => {
         if (task.question) {
              if (task.question.includes('Source A') || task.question.includes('Source B') || task.question.includes('Source C')) {
                   console.log(`Task ${j+1} asks about: ${task.question}`);
              }
         }
    });
});

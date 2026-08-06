const fs = require('fs');
const data = require('./early_modern_world/data.js').unitData;

const results = data.lessons.map(l => {
  const blocks = l.narrative_blocks || l.content || [];
  
  const wordCount = blocks.reduce((acc, c) => {
      const textOnly = (c.text || "").replace(/<[^>]+>/g, ' ');
      return acc + (textOnly.match(/\b\w+\b/g) || []).length;
  }, 0);
  
  const tasks = blocks.reduce((acc, c) => acc + (c.tasks ? c.tasks.length : 0), 0);
  
  const images = blocks.map(c => {
    const blockImgs = [];
    if (c.image) {
      blockImgs.push({ src: c.image, caption: c.image_caption || c.image_alt || "No caption" });
    }
    return blockImgs;
  }).flat();
  
  return { title: l.title, wordCount, tasks, images };
});

console.log(JSON.stringify(results, null, 2));

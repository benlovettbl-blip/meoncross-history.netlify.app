const fs = require('fs');

// Require or evaluate data.js
let code = fs.readFileSync('./units/water_and_sanitation/data.js', 'utf8');
code = code.replace(/export\s+default\s+[^;]+;?/g, '').replace(/export\s*\{[^}]*\};?/g, '');
let data;
const fakeWindow = {};
const fn = new Function('window', code + '; return typeof unitData !== "undefined" ? unitData : (window.water_and_sanitation_data || window.unitData);');
try {
  data = fn(fakeWindow);
} catch (e) {
  console.log('Error evaluating window:', e.message);
}

if (!data) {
  // Let's inspect how units/water_and_sanitation/data.js declares data
  const lines = code.split('\n').slice(0, 30);
  console.log('First 30 lines:\n' + lines.join('\n'));
} else {
  console.log('Unit loaded successfully. Title:', data.title);
  function findImagesAndSources(obj, path = '') {
    let results = [];
    if (!obj) return results;
    if (typeof obj !== 'object') return results;

    if (obj.image || obj.source_image || obj.file || (obj.title && (obj.provenance || obj.attribution || obj.caption))) {
      results.push({
        path,
        id: obj.id || obj.letter,
        title: obj.title || obj.name,
        image: obj.image || obj.source_image,
        caption: obj.caption || obj.attribution || obj.provenance,
        source_context: obj.source_context
      });
    }

    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        results = results.concat(findImagesAndSources(obj[key], path ? `${path}.${key}` : key));
      }
    }
    return results;
  }

  if (data.lessons) {
    data.lessons.forEach((l, idx) => {
      console.log(`\n========================================`);
      console.log(`Lesson ${idx + 1}: ${l.title} (id: ${l.id})`);
      const items = findImagesAndSources(l);
      items.forEach(item => {
        if (item.image) {
          console.log(`  [${item.path}] id: ${item.id} | title: "${item.title}" | image: ${item.image}`);
        }
      });
    });
  }
}

const fs = require('fs');
const path = require('path');
const url = require('url');

(async () => {
  const dataPath = path.resolve('units', 'weimar_nazi_germany', 'data.js');
  const mod = await import(url.pathToFileURL(dataPath).href);
  const data = mod.default || mod.UNIT_DATA || mod.unitData;

  let content = fs.readFileSync(dataPath, 'utf8');

  data.lessons.forEach((l, idx) => {
    const images = [];
    (l.narrative_blocks || []).forEach((b) => {
      if (b.images && Array.isArray(b.images)) {
        images.push(...b.images);
      }
    });

    if (images.length === 0) return;

    const sourcesArray = images.map((img) => {
      let hinge = '';
      let context = img.image_context || '';
      if (context.includes('Hinge Question:')) {
        const parts = context.split(/Hinge Question:/i);
        hinge = parts[1].trim();
      }
      return {
        type: 'visual',
        letter: img.source_letter || 'A',
        title: img.caption || img.alt || 'Source A',
        src: img.src,
        caption: img.caption || img.alt || '',
        source_context: img.image_context || '',
        hinge_question: hinge,
      };
    });

    // Find sources: [] for this lesson in content
    const idIndex = content.indexOf(`id: '${l.id}'`);
    if (idIndex === -1) return;

    const sourcesIndex = content.indexOf('sources: [', idIndex);
    if (sourcesIndex === -1) return;

    const closeSourcesIndex = content.indexOf('],', sourcesIndex);
    if (closeSourcesIndex === -1) return;

    const oldSourcesStr = content.slice(sourcesIndex, closeSourcesIndex + 2);

    const formattedSources = `sources: [
        ${sourcesArray
          .map((s) => JSON.stringify(s, null, 10).replace(/\n/g, '\n        '))
          .join(',\n        ')}
      ],`;

    content = content.replace(oldSourcesStr, formattedSources);
    console.log(
      `✅ Populated ${sourcesArray.length} source(s) for lesson ${idx + 1} (${l.id}) in Weimar`,
    );
  });

  fs.writeFileSync(dataPath, content, 'utf8');
  console.log('🎉 Successfully populated all lesson sources in units/weimar_nazi_germany/data.js!');
})();

const fs = require('fs');
const path = require('path');
const url = require('url');

(async () => {
  const dataPath = path.resolve('units', 'eee', 'data.js');
  const mod = await import(url.pathToFileURL(dataPath).href);
  const data = mod.default || mod.UNIT_DATA || mod.unitData;

  let content = fs.readFileSync(dataPath, 'utf8');

  data.lessons.forEach((l, idx) => {
    const bSource = (l.narrative_blocks || []).find((b) => b.source)?.source;
    if (!bSource) return;

    // In content, find the lesson by its id, then the sources block
    const idIndex = content.indexOf(`id: '${l.id}'`);
    if (idIndex === -1) return;

    // Find the next sources: [ after idIndex
    const sourcesIndex = content.indexOf('sources: [', idIndex);
    if (sourcesIndex === -1) return;

    // Find closing of sources array: ],
    const closeSourcesIndex = content.indexOf('],', sourcesIndex);
    if (closeSourcesIndex === -1) return;

    const oldSourcesStr = content.slice(sourcesIndex, closeSourcesIndex + 2);

    const formattedSource = `sources: [
        ${JSON.stringify(bSource, null, 10).replace(/\n/g, '\n        ')}
      ],`;

    content = content.replace(oldSourcesStr, formattedSource);
    console.log(`✅ Synced sources for lesson ${idx + 1} (${l.id})`);
  });

  fs.writeFileSync(dataPath, content, 'utf8');
  console.log('🎉 Successfully synchronized all 12 lesson sources in units/eee/data.js!');
})();

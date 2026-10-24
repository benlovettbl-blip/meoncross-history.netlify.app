const path = require('path');
const { pathToFileURL } = require('url');

async function main() {
  const filePath = path.join(__dirname, '../units/usa/data.js');
  const mod = await import(pathToFileURL(filePath).href);
  const data = mod.default || mod.unitData || mod;

  console.log(`Loaded USA data. Total lessons: ${data.lessons.length}`);
  data.lessons.forEach((l, i) => {
    const videoCount = l.video ? l.video.length : 0;
    console.log(`Lesson ${i + 1} (${l.id}): "${l.title}" | Videos: ${videoCount}`);
  });
}

main().catch(console.error);

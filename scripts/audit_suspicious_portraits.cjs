const fs = require('fs');
const path = require('path');

const unitsDir = path.resolve(__dirname, '../units');
const unitDirs = fs
  .readdirSync(unitsDir)
  .filter((f) => fs.statSync(path.join(unitsDir, f)).isDirectory());

console.log('=== AUDITING SOURCES FOR SUSPICIOUS PORTRAITS VS EVENT/DOCUMENT TITLES ===\n');

unitDirs.forEach((u) => {
  const dataPath = path.join(unitsDir, u, 'data.js');
  if (!fs.existsSync(dataPath)) return;

  try {
    const raw = require(dataPath);
    const data = raw.default || raw;
    if (!data.lessons || !Array.isArray(data.lessons)) return;

    data.lessons.forEach((l, lIdx) => {
      const sources = l.sources || [];
      sources.forEach((s, sIdx) => {
        const title = (s.title || '').toLowerCase();
        const img = (s.image || s.src || s.source || '').toLowerCase();
        const desc = (s.desc || s.caption || '').toLowerCase();

        // Check if title mentions an action/event/document/map/protest/conference but image is just a single person's name
        const isEventOrDoc =
          /signing|operation|addressing|speaking|conferring|debating|battle|riot|march|treaty|leaflet|map|protest|conference|summit|meeting|room|crossing/.test(
            title,
          );
        const isPortraitDesc = /portrait/.test(desc);

        // Also check if img filename is simple person name like /units/.../person.jpg
        const filename = path.basename(img, path.extname(img));

        if (isEventOrDoc && (isPortraitDesc || filename.includes('portrait'))) {
          console.log(`[${u}] L${l.id || lIdx + 1} S${s.letter || sIdx + 1}:`);
          console.log(`  Title: ${s.title}`);
          console.log(`  Image: ${s.image || s.src}`);
          console.log(`  Desc:  ${s.desc || s.caption}`);
          console.log('---');
        }
      });
    });
  } catch (e) {}
});

const https = require('https');

function searchCommons(query) {
  return new Promise((resolve, reject) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    https
      .get(
        url,
        { headers: { 'User-Agent': 'HistoryEducationalApp/1.0 (contact@historyhub.org)' } },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              const pages = json.query ? Object.values(json.query.pages) : [];
              resolve(pages);
            } catch (e) {
              reject(e);
            }
          });
        },
      )
      .on('error', reject);
  });
}

async function run() {
  const queries = [
    'civilian gas mask box',
    'General Civilian Respirator',
    'VE Day street party children',
    'VE Day celebrations children London 1945',
    'street party London 1945',
    'Victory street party 1945',
  ];

  for (const q of queries) {
    console.log(`\n=== QUERY: ${q} ===`);
    const pages = await searchCommons(q);
    pages.forEach((p) => {
      const info = p.imageinfo ? p.imageinfo[0] : {};
      const desc =
        info.extmetadata && info.extmetadata.ImageDescription
          ? info.extmetadata.ImageDescription.value.replace(/<[^>]+>/g, '').substring(0, 120)
          : '';
      console.log(`- ${p.title} (${info.width}x${info.height}): ${info.url}`);
      if (desc) console.log(`  Desc: ${desc}`);
    });
  }
}

run();

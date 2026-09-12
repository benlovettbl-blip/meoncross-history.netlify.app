const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => resolve(data));
        },
      )
      .on('error', reject);
  });
}

async function search() {
  try {
    const html = await get('https://collection.sciencemuseumgroup.org.uk/search?q=Henry+Cort');
    const regex =
      /<a class="cc-record-card[^"]*" href="([^"]+)">[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/g;
    let m;
    console.log('Science Museum Results:');
    while ((m = regex.exec(html)) !== null) {
      console.log('Title:', m[2].replace(/<[^>]+>/g, '').trim());
      console.log('Link:', 'https://collection.sciencemuseumgroup.org.uk' + m[1]);
    }
  } catch (e) {
    console.log('Error:', e.message);
  }
}

search();

const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            return fetchUrl(res.headers.location).then(resolve).catch(reject);
          }
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => resolve(data));
        },
      )
      .on('error', reject);
  });
}

async function getYoutubeMeta(videoId) {
  try {
    const cleanId = videoId.replace(/^.*(?:v=|\/)([\w-]{11}).*$/, '$1');
    const pageHtml = await fetchUrl(`https://www.youtube.com/watch?v=${cleanId}`);

    // Extract title
    let title = '';
    const titleMatch =
      pageHtml.match(/<meta property="og:title" content="(.*?)">/) ||
      pageHtml.match(/<title>(.*?)<\/title>/);
    if (titleMatch) {
      title = titleMatch[1].replace(' - YouTube', '').trim();
    }

    // Extract duration from lengthSeconds
    let duration = '';
    const secMatch =
      pageHtml.match(/"lengthSeconds":"(\d+)"/) || pageHtml.match(/approxDurationMs":"(\d+)"/);
    if (secMatch) {
      let totalSec = parseInt(secMatch[1], 10);
      if (totalSec > 100000) totalSec = Math.floor(totalSec / 1000); // ms
      const mins = Math.floor(totalSec / 60);
      const secs = totalSec % 60;
      duration = `${mins} mins ${secs} secs`;
    }

    return { videoId: cleanId, title, duration };
  } catch (err) {
    return { videoId, error: err.message };
  }
}

module.exports = { getYoutubeMeta };

if (require.main === module) {
  const ids = process.argv.slice(2);
  Promise.all(ids.map(getYoutubeMeta)).then((results) =>
    console.log(JSON.stringify(results, null, 2)),
  );
}

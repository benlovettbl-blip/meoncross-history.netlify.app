const https = require('https');

function fetchUrl(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            ...headers,
          },
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => resolve({ status: res.statusCode, body: data }));
        },
      )
      .on('error', reject);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function verifyOembed(videoId) {
  try {
    const res = await fetchUrl(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    );
    if (res.status === 200) {
      const json = JSON.parse(res.body);
      return { valid: true, title: json.title, author: json.author_name };
    }
  } catch (e) {}
  return { valid: false };
}

async function searchYouTube(query) {
  try {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    const { status, body } = await fetchUrl(url);
    if (status !== 200) {
      console.log(`HTTP ${status} for query: ${query}`);
      return [];
    }
    const regex = new RegExp('"videoId":"([a-zA-Z0-9_-]{11})"', 'g');
    const ids = [];
    let m;
    while ((m = regex.exec(body)) !== null) {
      if (!ids.includes(m[1])) {
        ids.push(m[1]);
      }
      if (ids.length >= 6) break;
    }

    const results = [];
    for (const id of ids) {
      const oembed = await verifyOembed(id);
      if (oembed.valid) {
        results.push({ id, title: oembed.title, author: oembed.author });
      }
    }
    return results;
  } catch (e) {
    return [];
  }
}

async function main() {
  const queries = [
    { l: 4, q: 'Southern resistance Civil Rights Act 1957' },
    { l: 5, q: 'Greensboro Sit Ins Civil Rights' },
    { l: 5, q: 'Freedom Rides 1961 Civil Rights' },
  ];

  for (const item of queries) {
    console.log(`\n=== Lesson ${item.l}: "${item.q}" ===`);
    const res = await searchYouTube(item.q);
    res.forEach((r) => console.log(`[${r.id}] "${r.title}" by ${r.author}`));
    await sleep(2500);
  }
}

main().catch(console.error);

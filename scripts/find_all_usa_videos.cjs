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
      if (ids.length >= 5) break;
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
    // KT2
    { l: 6, q: 'Childrens Crusade Birmingham 1963 Civil Rights' },
    { l: 6, q: 'Selma to Montgomery March Bloody Sunday' },
    { l: 7, q: 'Malcolm X Civil Rights Movement History' },
    { l: 7, q: 'Black Panther Party 1966 Huey Newton' },
    { l: 8, q: 'Watts Riots 1965 Los Angeles' },
    { l: 8, q: '1967 Detroit Riots Kerner Commission' },

    // KT3
    { l: 9, q: 'Ngo Dinh Diem Buddhist Crisis 1963 Vietnam' },
    { l: 9, q: 'Geneva Accords 1954 Vietnam Domino Theory' },
    { l: 10, q: 'Gulf of Tonkin Incident 1964 Vietnam War' },
    { l: 10, q: 'US Marines land at Da Nang 1965 Vietnam' },
    { l: 11, q: 'Vietcong Cu Chi tunnels booby traps' },
    { l: 11, q: 'Search and Destroy tactics Vietnam War' },
    { l: 12, q: 'Vietnamization Nixon Vietnam War' },
    { l: 12, q: 'Invasion of Cambodia 1970 Nixon' },

    // KT4
    { l: 13, q: 'My Lai Massacre 1968 Hugh Thompson' },
    { l: 13, q: 'Kent State Shootings May 4 1970' },
    { l: 14, q: 'Nixon Silent Majority Speech 1969' },
    { l: 14, q: 'Hard Hat Riot New York 1970' },
    { l: 15, q: 'Paris Peace Accords 1973 Vietnam' },
    { l: 15, q: 'Fall of Saigon April 30 1975' },
    { l: 16, q: 'Why did the US lose the Vietnam War' },
    { l: 16, q: 'Reasons for US failure in Vietnam War GCSE' },
  ];

  for (const item of queries) {
    console.log(`\n=== Lesson ${item.l}: "${item.q}" ===`);
    const res = await searchYouTube(item.q);
    res.forEach((r) => console.log(`[${r.id}] "${r.title}" by ${r.author}`));
    await sleep(2600);
  }
}

main().catch(console.error);

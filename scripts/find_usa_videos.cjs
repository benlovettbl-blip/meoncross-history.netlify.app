const https = require('https');

function fetchUrl(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
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
    if (status !== 200) return [];
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
  const lessonQueries = [
    // KT1
    { l: 1, q: 'Jim Crow laws Simple History' },
    { l: 1, q: 'Emmett Till Simple History' },
    { l: 2, q: 'Brown v Board of Education TED-Ed' },
    { l: 2, q: 'Little Rock Nine History' },
    { l: 3, q: 'Montgomery Bus Boycott Simple History' },
    { l: 3, q: 'Rosa Parks and Montgomery Bus Boycott' },
    { l: 4, q: 'Ku Klux Klan in the 1950s Civil Rights' },
    { l: 4, q: 'Southern resistance to civil rights White Citizens Councils' },

    // KT2
    { l: 5, q: 'Greensboro Sit Ins Simple History' },
    { l: 5, q: 'Freedom Riders Simple History' },
    { l: 6, q: 'Birmingham Campaign 1963 Simple History' },
    { l: 6, q: 'Selma to Montgomery March Simple History' },
    { l: 7, q: 'Malcolm X Simple History' },
    { l: 7, q: 'Black Panther Party Simple History' },
    { l: 8, q: 'Watts Riots 1965' },
    { l: 8, q: '1968 riots Martin Luther King assassination' },

    // KT3
    { l: 9, q: 'Geneva Accords Diem Vietnam War' },
    { l: 9, q: 'Diem regime Buddhist crisis Vietnam' },
    { l: 10, q: 'Gulf of Tonkin Incident Simple History' },
    { l: 10, q: 'Gulf of Tonkin Resolution US troops Vietnam' },
    { l: 11, q: 'Viet Cong Guerrilla Warfare Tactics Simple History' },
    { l: 11, q: 'Search and Destroy Vietnam War Simple History' },
    { l: 12, q: 'Vietnamization Nixon Simple History' },
    { l: 12, q: 'Invasion of Cambodia Vietnam War 1970' },

    // KT4
    { l: 13, q: 'My Lai Massacre Simple History' },
    { l: 13, q: 'Kent State Shootings Simple History' },
    { l: 14, q: 'Nixon Silent Majority speech' },
    { l: 14, q: 'Hard Hat Riot 1970' },
    { l: 15, q: 'Paris Peace Accords 1973 Vietnam' },
    { l: 15, q: 'Fall of Saigon 1975 Simple History' },
    { l: 16, q: 'Why did the US lose the Vietnam War History Matters' },
    { l: 16, q: 'Why did America lose Vietnam War Simple History' },
  ];

  for (const item of lessonQueries) {
    console.log(`\n=== Lesson ${item.l}: "${item.q}" ===`);
    const res = await searchYouTube(item.q);
    res.forEach((r) => console.log(`[${r.id}] "${r.title}" by ${r.author}`));
    await sleep(600);
  }
}

main().catch(console.error);

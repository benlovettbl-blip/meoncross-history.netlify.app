const https = require('https');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function searchYT(query) {
  return new Promise((resolve) => {
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
    https
      .get(
        url,
        {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        },
        (res) => {
          let html = '';
          res.on('data', (chunk) => (html += chunk));
          res.on('end', () => {
            const match = html.match(/var ytInitialData = ({.*?});<\/script>/s);
            if (!match) return resolve([]);
            try {
              const data = JSON.parse(match[1]);
              const contents =
                data.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer
                  ?.contents[0]?.itemSectionRenderer?.contents || [];
              const videos = [];
              for (const item of contents) {
                if (item.videoRenderer) {
                  const v = item.videoRenderer;
                  videos.push({
                    id: v.videoId,
                    title: v.title?.runs?.[0]?.text,
                    channel: v.ownerText?.runs?.[0]?.text,
                    duration: v.lengthText?.simpleText,
                    views: v.viewCountText?.simpleText,
                  });
                }
              }
              resolve(videos);
            } catch (e) {
              resolve([]);
            }
          });
        },
      )
      .on('error', (e) => resolve([]));
  });
}

(async () => {
  const lessons = [
    {
      lesson: 'Lesson 1: Outbreak 1939 & Home Front Mobilisation',
      queries: [
        'BBC Teach Britain declares war on Germany',
        'BBC Teach World War Two',
        'Imperial War Museums gas masks 1939',
      ],
    },
    {
      lesson: 'Lesson 2: Operation Pied Piper & British Evacuation',
      queries: [
        'BBC Teach evacuee adventure',
        'A Day in the Life Of A 10-Year-Old Evacuee BBC',
        'BBC Teach Lives of WW2 Evacuees',
      ],
    },
    {
      lesson: "Lesson 3: Vera's Journey & The Kindertransport",
      queries: [
        'Trude escaping Czechoslovakia BBC Teach',
        'Children of the Holocaust BBC Teach',
        'Kindertransport Newsround',
        'Imperial War Museums Kindertransport',
      ],
    },
    {
      lesson: 'Lesson 4: The Blitz & Air Raids',
      queries: [
        'Living through air raids BBC Teach',
        'What was the Blitz Imperial War Museums',
        'BBC Teach Anderson shelter',
      ],
    },
    {
      lesson: 'Lesson 5: Dig for Victory & Wartime Rationing',
      queries: [
        'soldier daughter BBC Teach',
        'Food rationing WW2 Imperial War Museums',
        'Dig for Victory BBC',
      ],
    },
    {
      lesson: 'Lesson 6: Women at War',
      queries: [
        'Women roles World War Two Newsround',
        'Women Land Army BBC',
        'Imperial War Museums women wartime',
      ],
    },
    {
      lesson: 'Lesson 7: Pre-War Life & Rights Lost',
      queries: [
        'Heinz story Kristallnacht BBC Teach',
        'Suzanne story BBC Teach',
        'Martin story BBC Teach',
      ],
    },
    {
      lesson: 'Lesson 8: Secret Codebreakers & Bletchley Park',
      queries: [
        'Bletchley Park Newsround',
        'Alan Turing codebreaker BBC',
        'Imperial War Museums Enigma machine',
      ],
    },
    {
      lesson: 'Lesson 9: Who Were the Rescuers?',
      queries: [
        'Thats Life Nicholas Winton BBC',
        'Nicholas Winton Newsround',
        'Nicholas Winton Imperial War Museums',
      ],
    },
    {
      lesson: 'Lesson 10: VE Day, Post-War Rebuilding & Remembrance',
      queries: ['VE Day BBC Teach', 'VE Day Newsround', 'Imperial War Museums VE Day 1945'],
    },
  ];

  for (const item of lessons) {
    console.log(
      `\n========================================\n${item.lesson}\n========================================`,
    );
    const seen = new Set();
    for (const q of item.queries) {
      await sleep(1200);
      const list = await searchYT(q);
      for (const v of list) {
        if (!v.title || seen.has(v.id)) continue;
        // Keep educational/official/documentary channels
        const ch = v.channel || '';
        const t = v.title || '';
        seen.add(v.id);
        console.log(`  [${v.duration || 'N/A'}] ${v.id} : "${t}" | ${ch}`);
      }
    }
  }
})();

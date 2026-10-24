const { searchCommons, getImageInfo, delay } = require('./search_and_inspect_sources.cjs');

const targets = [
  {
    id: 1,
    name: 'southern-manifesto-signing.jpg',
    query: '"Southern Manifesto" OR "Declaration of Constitutional Principles"',
  },
  {
    id: 2,
    name: 'greensboro-sit-in-counter.jpg',
    query: '"Greensboro sit-in" OR "Greensboro Four"',
  },
  {
    id: 3,
    name: 'selma-troopers-bridge.jpg',
    query: '"Bloody Sunday" Selma OR "Edmund Pettus Bridge" 1965',
  },
  {
    id: 4,
    name: 'malcolm-x-speaking.jpg',
    query: '"Malcolm X" speaking OR speech OR press conference',
  },
  {
    id: 5,
    name: 'detroit-riot-guard-1967.jpg',
    query: '1967 Detroit "National Guard" OR "Detroit rebellion" OR "Detroit riot"',
  },
  {
    id: 6,
    name: 'mourners-mlk-assassination.jpg',
    query: '"Martin Luther King" funeral OR "MLK funeral" OR "mule-drawn"',
  },
  {
    id: 7,
    name: 'ngo-dinh-diem-parade.jpg',
    query: '"Ngo Dinh Diem" Eisenhower OR portrait OR motorcade',
  },
  {
    id: 8,
    name: 'buddhist-protests-1963.jpg',
    query: '"Thich Quang Duc" self-immolation OR "Malcolm Browne"',
  },
  {
    id: 9,
    name: 'uss-maddox.jpg',
    query: '"USS Maddox" (DD-731) underway',
  },
  {
    id: 10,
    name: 'marines-landing-danang.jpg',
    query: '"Marines" "Da Nang" 1965 landing',
  },
  {
    id: 11,
    name: 'us-troops-bogged-down.jpg',
    query:
      '"Operation Junction City" OR "Operation Cedar Falls" OR "search and destroy" Vietnam jungle',
  },
  {
    id: 12,
    name: 'huey-helicopter-vietnam.jpg',
    query: '"UH-1D" OR "Huey" Vietnam flight OR "landing zone" OR "1966" OR "1967"',
  },
  {
    id: 13,
    name: 'general-westmoreland.jpg',
    query: '"Westmoreland" "Lyndon Johnson" OR "Cabinet Room" OR "White House"',
  },
];

(async () => {
  for (const t of targets) {
    console.log(`\n========================================`);
    console.log(`Target ${t.id}: ${t.name} (Query: ${t.query})`);
    try {
      const titles = await searchCommons(t.query);
      console.log(`Found ${titles.length} candidates:`);
      for (const title of titles.slice(0, 4)) {
        await delay(1200);
        try {
          const info = await getImageInfo(title);
          if (info) {
            console.log(`  - Title: ${title}`);
            console.log(`    URL: ${info.url}`);
            console.log(`    Size: ${info.width}x${info.height}`);
          }
        } catch (e) {
          console.log(`    Error getting info for ${title}: ${e.message}`);
        }
      }
    } catch (err) {
      console.error(`Search error for ${t.name}:`, err.message);
    }
    await delay(1500);
  }
})();

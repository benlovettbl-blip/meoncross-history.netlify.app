const { fetchJson, delay, getImageInfo } = require('./search_and_inspect_sources.cjs');

async function getCategoryMembers(categoryName) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=' +
    encodeURIComponent('Category:' + categoryName) +
    '&cmtype=file&cmlimit=20&format=json';
  const json = await fetchJson(url);
  return json.query && json.query.categorymembers
    ? json.query.categorymembers.map((m) => m.title)
    : [];
}

(async () => {
  const categories = [
    'Bloody Sunday (Selma)',
    '1967 Detroit riot',
    'William Westmoreland',
    'Operation Cedar Falls',
    'Operation Junction City',
    'Bell UH-1 Iroquois in the Vietnam War',
    'Malcolm X in 1964',
    'Malcolm X in 1963',
  ];

  for (const cat of categories) {
    await delay(1000);
    try {
      const files = await getCategoryMembers(cat);
      console.log(`\n=== Category:${cat} (${files.length} files) ===`);
      console.log(files.slice(0, 8).join('\n'));
    } catch (e) {
      console.log(`Error for Category:${cat}:`, e.message);
    }
  }
})();

const {
  searchCommons,
  getImageInfo,
  delay,
  fetchJson,
} = require('./search_and_inspect_sources.cjs');

(async () => {
  console.log('=== 1. Malcolm X speaking ===');
  const malcolmTitles = await searchCommons('Malcolm X speaking OR rally OR speech');
  for (const t of malcolmTitles.slice(0, 8)) {
    const info = await getImageInfo(t);
    if (info && info.width > 500) {
      console.log(`  ${t} (${info.width}x${info.height}): ${info.url}`);
    }
    await delay(500);
  }

  console.log('\n=== 2. US Troops Vietnam Jungle / Bogged Down ===');
  const troopsTitles = await searchCommons('Vietnam War soldiers jungle patrol mud OR river');
  for (const t of troopsTitles.slice(0, 8)) {
    const info = await getImageInfo(t);
    if (info && info.width > 500) {
      console.log(`  ${t} (${info.width}x${info.height}): ${info.url}`);
    }
    await delay(500);
  }

  console.log('\n=== 3. General Westmoreland Briefing LBJ ===');
  const westmorelandTitles = await searchCommons('William Westmoreland Lyndon Johnson');
  for (const t of westmorelandTitles.slice(0, 8)) {
    const info = await getImageInfo(t);
    if (info && info.width > 500) {
      console.log(`  ${t} (${info.width}x${info.height}): ${info.url}`);
    }
    await delay(500);
  }

  console.log('\n=== 4. Detroit 1967 National Guard ===');
  const detroitTitles = await searchCommons('Detroit 1967 National Guard patrol');
  for (const t of detroitTitles.slice(0, 8)) {
    const info = await getImageInfo(t);
    if (info && info.width > 500) {
      console.log(`  ${t} (${info.width}x${info.height}): ${info.url}`);
    }
    await delay(500);
  }

  console.log('\n=== 5. MLK Funeral Casket / Procession ===');
  const mlkTitles = await searchCommons('Martin Luther King funeral procession');
  for (const t of mlkTitles.slice(0, 8)) {
    const info = await getImageInfo(t);
    if (info && info.width > 500) {
      console.log(`  ${t} (${info.width}x${info.height}): ${info.url}`);
    }
    await delay(500);
  }
})();

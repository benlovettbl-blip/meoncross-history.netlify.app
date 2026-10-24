const {
  searchCommons,
  getImageInfo,
  delay,
  fetchJson,
} = require('./search_and_inspect_sources.cjs');

async function findFileUrl(fileTitle) {
  const info = await getImageInfo(fileTitle);
  return info ? { url: info.url, width: info.width, height: info.height, size: info.size } : null;
}

(async () => {
  console.log('--- Checking Specific Candidate Files ---');
  const candidates = [
    'File:Greensboro Four.jpg',
    'File:Bloody Sunday-Alabama police attack.jpeg',
    'File:Bloody Sunday-officers await demonstrators.jpeg',
    'File:Detroit 1967.jpg',
    'File:MLK Funeral Cart.jpg',
    'File:President NGO-DINH-DIEM of the Republic of Viet-Nam.jpg',
    'File:Ngo Dinh Diem at Washington - ARC 542189.jpg',
    'File:Thích Quảng Đức self-immolation.jpg',
    'File:USS Maddox (DD-731) underway at sea, circa the early 1960s (NH 97900).jpg',
    'File:Beach activity at Da Nang, Vietnam during landing of United States Marines of the 9th Marine Expeditionary Brigade in March of 1965.jpg',
    'File:Marine da nang.jpg',
    'File:173rd Airborne Brigade troopers in the jungle during Operation Junction City, 1967.jpg',
    'File:1st Cavalry Division troops in Vietnam, 1967.jpg',
    'File:Huey helicopter landing in Vietnam, 1966.jpg',
    'File:UH-1D helicopters in Vietnam 1966.jpg',
    'File:Westmoreland Johnson 1968.jpg',
    'File:Malcolm X NYWTS 2a.jpg',
    'File:Malcolm X LOC 71-356.jpg',
  ];

  for (const c of candidates) {
    await delay(1000);
    const info = await findFileUrl(c);
    if (info) {
      console.log(`✔ FOUND: ${c} -> ${info.width}x${info.height} (${info.url})`);
    } else {
      console.log(`✖ NOT FOUND: ${c}`);
    }
  }
})();

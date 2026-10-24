const fs = require('fs');
const path = require('path');

console.log('=== UPDATING VERIFIED YOUTUBE VIDEOS ACROSS APP ===');

// 1. Update The Shoah in units/the_shoah/data.js
const shoahPath = path.resolve('units/the_shoah/data.js');
let shoahCode = fs.readFileSync(shoahPath, 'utf8');

const shoahReplacements = [
  {
    oldId: 'wN3X8w3l_9U',
    newId: 'gfgXXDOXp-c',
    newTitle: 'Jewish Life before the Second World War: an Introduction - Yad Vashem',
    newDuration: '5 mins 36 secs',
    newGuidance:
      'Curated historical overview by Yad Vashem introducing the vibrant diversity, languages, and cultures of pre-war European Jewish communities before Nazi persecution.',
  },
  {
    oldId: 'F0f-2v-4_vQ',
    newId: '5ubZv0YqrnE',
    newTitle:
      'The Path to Nazi Genocide, Chapter 3/4: From Citizens to Outcasts, 1933–1938 - USHMM',
    newDuration: '7 mins 28 secs',
    newGuidance:
      'Essential USHMM documentary chapter charting the escalation from the 1933 anti-Jewish boycott, through the Nuremberg Laws and racial segregation, to the violent pogrom of Kristallnacht.',
  },
  {
    oldId: 'kS_b8q3Yf_g',
    newId: '8tx2PyYlx9A',
    newTitle: 'What Were Ghettos in the Holocaust? - USHMM Explainer',
    newDuration: '4 mins 22 secs',
    newGuidance:
      'Examines the establishment of sealed ghettos in occupied Poland, overcrowding, starvation, and spiritual and cultural resistance in the Warsaw Ghetto.',
  },
  {
    oldId: 'F_fG1_b32_M', // Lesson 4
    newId: 'YoElznkTado',
    newTitle: 'Einsatzgruppen: Mobile Killing Squads - USHMM',
    newDuration: '6 mins 37 secs',
    newGuidance:
      'Carefully contextualises the mobile killing squads and mass shootings in the Baltic and Ukraine following Operation Barbarossa without sensationalism, focusing on historical mechanics.',
  },
  {
    oldId: 'J3Z_fK5-h4c',
    newId: '4wkwYPlXfs4',
    newTitle: 'What Was Auschwitz? - USHMM Explainer',
    newDuration: '3 mins 44 secs',
    newGuidance:
      'Explains the dual function of Auschwitz-Birkenau as a concentration camp and industrial extermination centre, alongside the reality of armed resistance and the Sonderkommando revolt.',
  },
  {
    oldId: '0h3V7p8q1kY',
    newId: '9yU3ALfVcp0',
    newTitle: "Why almost all of Denmark's Jews survived the Holocaust - Imperial War Museums",
    newDuration: '11 mins 4 secs',
    newGuidance:
      'Curator analysis from the Imperial War Museums explaining the extraordinary rescue operation that evacuated over 7,000 Danish Jews across the Sound to neutral Sweden in October 1943.',
  },
];

// Note: Lesson 7 also used F_fG1_b32_M in the original file!
// Let's handle Lesson 7 specifically by replacing the second instance or matching its title.
shoahCode = shoahCode.replace(
  /url:\s*'https:\/\/www\.youtube\.com\/watch\?v=wN3X8w3l_9U'[\s\S]*?teacher_guidance:\s*'.*?'/s,
  `url: 'https://www.youtube.com/watch?v=gfgXXDOXp-c',
        title: 'Jewish Life before the Second World War: an Introduction - Yad Vashem',
        duration: '5 mins 36 secs',
        teacher_guidance: 'Curated historical overview by Yad Vashem introducing the vibrant diversity, languages, and cultures of pre-war European Jewish communities before Nazi persecution.'`,
);

shoahCode = shoahCode.replace(
  /url:\s*'https:\/\/www\.youtube\.com\/watch\?v=F0f-2v-4_vQ'[\s\S]*?teacher_guidance:\s*'.*?'/s,
  `url: 'https://www.youtube.com/watch?v=5ubZv0YqrnE',
        title: 'The Path to Nazi Genocide, Chapter 3/4: From Citizens to Outcasts, 1933–1938 - USHMM',
        duration: '7 mins 28 secs',
        teacher_guidance: 'Essential USHMM documentary chapter charting the escalation from the 1933 anti-Jewish boycott, through the Nuremberg Laws and racial segregation, to the violent pogrom of Kristallnacht.'`,
);

shoahCode = shoahCode.replace(
  /url:\s*'https:\/\/www\.youtube\.com\/watch\?v=kS_b8q3Yf_g'[\s\S]*?teacher_guidance:\s*'.*?'/s,
  `url: 'https://www.youtube.com/watch?v=8tx2PyYlx9A',
        title: 'What Were Ghettos in the Holocaust? - USHMM Explainer',
        duration: '4 mins 22 secs',
        teacher_guidance: 'Examines the establishment of sealed ghettos in occupied Poland, overcrowding, starvation, and spiritual and cultural resistance in the Warsaw Ghetto.'`,
);

shoahCode = shoahCode.replace(
  /url:\s*'https:\/\/www\.youtube\.com\/watch\?v=F_fG1_b32_M'[\s\S]*?title:\s*'The Holocaust by Bullets: Einsatzgruppen 1941–1943 - UCL CfHE'[\s\S]*?teacher_guidance:\s*'.*?'/s,
  `url: 'https://www.youtube.com/watch?v=YoElznkTado',
        title: 'Einsatzgruppen: Mobile Killing Squads - USHMM',
        duration: '6 mins 37 secs',
        teacher_guidance: 'Carefully contextualises the mobile killing squads and mass shootings in the Baltic and Ukraine following Operation Barbarossa without sensationalism, focusing on historical mechanics.'`,
);

shoahCode = shoahCode.replace(
  /url:\s*'https:\/\/www\.youtube\.com\/watch\?v=J3Z_fK5-h4c'[\s\S]*?teacher_guidance:\s*'.*?'/s,
  `url: 'https://www.youtube.com/watch?v=4wkwYPlXfs4',
        title: 'What Was Auschwitz? - USHMM Explainer',
        duration: '3 mins 44 secs',
        teacher_guidance: 'Explains the dual function of Auschwitz-Birkenau as a concentration camp and industrial extermination centre, alongside the reality of armed resistance and the Sonderkommando revolt.'`,
);

shoahCode = shoahCode.replace(
  /url:\s*'https:\/\/www\.youtube\.com\/watch\?v=0h3V7p8q1kY'[\s\S]*?teacher_guidance:\s*'.*?'/s,
  `url: 'https://www.youtube.com/watch?v=9yU3ALfVcp0',
        title: "Why almost all of Denmark's Jews survived the Holocaust - Imperial War Museums",
        duration: '11 mins 4 secs',
        teacher_guidance: "Curator analysis from the Imperial War Museums explaining the extraordinary rescue operation that evacuated over 7,000 Danish Jews across the Sound to neutral Sweden in October 1943."`,
);

shoahCode = shoahCode.replace(
  /url:\s*'https:\/\/www\.youtube\.com\/watch\?v=F_fG1_b32_M'[\s\S]*?title:\s*'Liberation of Bergen-Belsen - British Army AFPU Footage \(IWM BU 4032\)'[\s\S]*?teacher_guidance:\s*'.*?'/s,
  `url: 'https://www.youtube.com/watch?v=Qu3_Oytc5Qk',
        title: 'The Liberation of Bergen-Belsen Concentration Camp - Holocaust Memorial Day Trust',
        duration: '2 mins 40 secs',
        teacher_guidance: 'Authoritative short archival overview from the Holocaust Memorial Day Trust detailing the arrival of the British 11th Armoured Division at Bergen-Belsen on 15 April 1945 and the legacy of testimony.'`,
);

fs.writeFileSync(shoahPath, shoahCode, 'utf8');
console.log('✅ Updated units/the_shoah/data.js with verified videos');

// Now sync the_shoah into public/data/the_shoah.json and public/database.json
const updatedShoah = require('../units/the_shoah/data.js').default;
fs.writeFileSync(
  './public/data/the_shoah.json',
  JSON.stringify({ id: 'the_shoah', data: updatedShoah }, null, 2),
  'utf8',
);
console.log('✅ Synced to public/data/the_shoah.json');

const dbPath = './public/database.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
if (db.the_shoah) {
  db.the_shoah.data = updatedShoah;
}

// 2. Update Early Modern World
const emwReplacements = [
  {
    oldId: 'NJMZURabB2k',
    newId: '3PszVWZNWVA',
    title:
      'The Fall of Constantinople & The Ottoman Empire in the 15th Century (Crash Course World History)',
    dur: '12 mins 44 secs',
  },
  {
    oldId: 's_fTwtgS03A',
    newId: 'YptNONmnXH0',
    title: 'Gunpowder Plot – Stories from Parliament (UK Parliament Education)',
    dur: '5 mins 10 secs',
  },
  {
    oldId: 'bZ7J3n3sD0Y',
    newId: '6niBsMeNToo',
    title: 'Why Did England Have a Civil War? (English Heritage)',
    dur: '4 mins 54 secs',
  },
  {
    oldId: '2YfKCEQ7pC4',
    newId: '899il5aiTBg',
    title: 'Trial and Execution of King Charles I (Historic Royal Palaces)',
    dur: '6 mins 40 secs',
  },
];

// Check units/early_modern_world/data.js
const emwPath = './units/early_modern_world/data.js';
if (fs.existsSync(emwPath)) {
  let emwCode = fs.readFileSync(emwPath, 'utf8');
  emwReplacements.forEach((r) => {
    emwCode = emwCode.split(r.oldId).join(r.newId);
  });
  fs.writeFileSync(emwPath, emwCode, 'utf8');
  console.log('✅ Updated units/early_modern_world/data.js');
}

const emwPublicPath = './public/units/early_modern_world/data.js';
if (fs.existsSync(emwPublicPath)) {
  let emwPubCode = fs.readFileSync(emwPublicPath, 'utf8');
  emwReplacements.forEach((r) => {
    emwPubCode = emwPubCode.split(r.oldId).join(r.newId);
  });
  fs.writeFileSync(emwPublicPath, emwPubCode, 'utf8');
  console.log('✅ Updated public/units/early_modern_world/data.js');
}

// Also update EMW inside db
if (db.early_modern_world) {
  let emwStr = JSON.stringify(db.early_modern_world);
  emwReplacements.forEach((r) => {
    emwStr = emwStr.split(r.oldId).join(r.newId);
  });
  db.early_modern_world = JSON.parse(emwStr);
  console.log('✅ Updated early_modern_world in database.json');
}

// 3. Update trip_ypres
const ypresReplacements = [
  {
    oldId: 'Fwv4qL8yE-s',
    newId: 'PekQfqAWAPw',
    title: "Voices of Indian soldiers in WW1 (David Olusoga / BBC - The World's War)",
    dur: '4 mins 58 secs',
  },
];

['./data/trip_ypres.json', './public/data/trip_ypres.json'].forEach((p) => {
  if (fs.existsSync(p)) {
    let str = fs.readFileSync(p, 'utf8');
    ypresReplacements.forEach((r) => {
      str = str.split(r.oldId).join(r.newId);
    });
    fs.writeFileSync(p, str, 'utf8');
    console.log(`✅ Updated ${p}`);
  }
});

if (db.trip_ypres) {
  let str = JSON.stringify(db.trip_ypres);
  ypresReplacements.forEach((r) => {
    str = str.split(r.oldId).join(r.newId);
  });
  db.trip_ypres = JSON.parse(str);
  console.log('✅ Updated trip_ypres in database.json');
}

// 4. Update water_and_sanitation
const waterReplacements = [
  {
    oldId: '8st-Ako2mrU',
    newId: '5k8AnhNkN04',
    title: 'Bazalgette: Saviour of the Great Stink (Institution of Civil Engineers)',
    dur: '5 mins 14 secs',
  },
];

const wsScript = './scripts/ws_5block_builder/lesson_5.cjs';
if (fs.existsSync(wsScript)) {
  let str = fs.readFileSync(wsScript, 'utf8');
  waterReplacements.forEach((r) => {
    str = str.split(r.oldId).join(r.newId);
  });
  fs.writeFileSync(wsScript, str, 'utf8');
  console.log(`✅ Updated ${wsScript}`);
}

if (db.water_and_sanitation) {
  let str = JSON.stringify(db.water_and_sanitation);
  waterReplacements.forEach((r) => {
    str = str.split(r.oldId).join(r.newId);
  });
  db.water_and_sanitation = JSON.parse(str);
  console.log('✅ Updated water_and_sanitation in database.json');
}

// Save database.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('✅ Updated public/database.json');

console.log('🎉 All replacement videos successfully applied!');

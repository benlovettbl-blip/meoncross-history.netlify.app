const fs = require('fs');
const path = require('path');

const dataJsPath = path.resolve(__dirname, '../units/the_shoah/data.js');
let content = fs.readFileSync(dataJsPath, 'utf8');

const updates = [
  {
    oldId: 'wN3X8w3l_9U',
    replacement: `{
          "url": "https://www.youtube.com/watch?v=gfgXXDOXp-c",
          "title": "Jewish Life before the Second World War: an Introduction - Yad Vashem",
          "duration": "5 mins 36 secs",
          "teacher_guidance": "Curated historical overview by Yad Vashem introducing the vibrant diversity, languages, and cultures of pre-war European Jewish communities before Nazi persecution."
        }`,
  },
  {
    oldId: 'F0f-2v-4_vQ',
    replacement: `{
          "url": "https://www.youtube.com/watch?v=5ubZv0YqrnE",
          "title": "The Path to Nazi Genocide, Chapter 3/4: From Citizens to Outcasts, 1933–1938 - USHMM",
          "duration": "7 mins 28 secs",
          "teacher_guidance": "Essential USHMM documentary chapter charting the escalation from the 1933 anti-Jewish boycott, through the Nuremberg Laws and racial segregation, to the violent pogrom of Kristallnacht."
        }`,
  },
  {
    oldId: 'kS_b8q3Yf_g',
    replacement: `{
          "url": "https://www.youtube.com/watch?v=8tx2PyYlx9A",
          "title": "What Were Ghettos in the Holocaust? - USHMM Explainer",
          "duration": "4 mins 22 secs",
          "teacher_guidance": "Examines the establishment of sealed ghettos in occupied Poland, overcrowding, starvation, and spiritual and cultural resistance in the Warsaw Ghetto."
        }`,
  },
  {
    oldPattern:
      /"url":\s*"https:\/\/www\.youtube\.com\/watch\?v=F_fG1_b32_M"[\s\S]*?"title":\s*"The Holocaust by Bullets: Einsatzgruppen 1941–1943 - UCL CfHE"[\s\S]*?"teacher_guidance":\s*".*?"/s,
    replacement: `"url": "https://www.youtube.com/watch?v=YoElznkTado",
          "title": "Einsatzgruppen: Mobile Killing Squads - USHMM",
          "duration": "6 mins 37 secs",
          "teacher_guidance": "Carefully contextualises the mobile killing squads and mass shootings in the Baltic and Ukraine following Operation Barbarossa without sensationalism, focusing on historical mechanics."`,
  },
  {
    oldId: 'J3Z_fK5-h4c',
    replacement: `{
          "url": "https://www.youtube.com/watch?v=4wkwYPlXfs4",
          "title": "What Was Auschwitz? - USHMM Explainer",
          "duration": "3 mins 44 secs",
          "teacher_guidance": "Explains the dual function of Auschwitz-Birkenau as a concentration camp and industrial extermination centre, alongside the reality of armed resistance and the Sonderkommando revolt."
        }`,
  },
  {
    oldId: '0h3V7p8q1kY',
    replacement: `{
          "url": "https://www.youtube.com/watch?v=9yU3ALfVcp0",
          "title": "Why almost all of Denmark's Jews survived the Holocaust - Imperial War Museums",
          "duration": "11 mins 4 secs",
          "teacher_guidance": "Curator analysis from the Imperial War Museums explaining the extraordinary rescue operation that evacuated over 7,000 Danish Jews across the Sound to neutral Sweden in October 1943."
        }`,
  },
  {
    oldPattern:
      /"url":\s*"https:\/\/www\.youtube\.com\/watch\?v=F_fG1_b32_M"[\s\S]*?"title":\s*"Liberation of Bergen-Belsen - British Army AFPU Footage \(IWM BU 4032\)"[\s\S]*?"teacher_guidance":\s*".*?"/s,
    replacement: `"url": "https://www.youtube.com/watch?v=Qu3_Oytc5Qk",
          "title": "The Liberation of Bergen-Belsen Concentration Camp - Holocaust Memorial Day Trust",
          "duration": "2 mins 40 secs",
          "teacher_guidance": "Authoritative short archival overview from the Holocaust Memorial Day Trust detailing the arrival of the British 11th Armoured Division at Bergen-Belsen on 15 April 1945 and the legacy of testimony."`,
  },
];

updates.forEach((u, i) => {
  if (u.oldId) {
    const reg = new RegExp(
      `\\{\\s*"url":\\s*"https:\\/\\/www\\.youtube\\.com\\/watch\\?v=${u.oldId}"[\\s\\S]*?"teacher_guidance":\\s*".*?"\\s*\\}`,
      's',
    );
    content = content.replace(reg, u.replacement.trim());
  } else if (u.oldPattern) {
    content = content.replace(u.oldPattern, u.replacement.trim());
  }
});

fs.writeFileSync(dataJsPath, content, 'utf8');
console.log('✅ Updated units/the_shoah/data.js');

// Clear require cache and re-require
delete require.cache[require.resolve('../units/the_shoah/data.js')];
const freshShoah = require('../units/the_shoah/data.js').default;

// Save to public/data/the_shoah.json
fs.writeFileSync(
  path.resolve(__dirname, '../public/data/the_shoah.json'),
  JSON.stringify({ id: 'the_shoah', data: freshShoah }, null, 2),
  'utf8',
);
console.log('✅ Updated public/data/the_shoah.json');

// Save to public/database.json
const dbPath = path.resolve(__dirname, '../public/database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
if (db.the_shoah) {
  db.the_shoah.data = freshShoah;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('✅ Updated public/database.json');
}

console.log('🎉 Shoah video synchronization complete!');

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const KS2_BLURBS = {
  lesson_1:
    'On a sunny Sunday morning in September 1939, millions of British families gathered around their radios to hear the shocking news that Britain was at war. Within minutes, loud air raid sirens wailed across London, and everyone—even newborn babies—was given a gas mask in a cardboard box to carry everywhere. Why did ordinary families have to tape up their windows and turn off all their lights to stay safe?',

  lesson_2:
    'In September 1939, over one and a half million schoolchildren were led to busy railway stations, clutching small suitcases and wearing brown cardboard luggage tags pinned to their coats. Leaving their parents behind, they journeyed deep into the quiet countryside to live with strangers they had never met. What was it really like for city children to swap crowded streets for muddy farm fields?',

  lesson_3:
    'As danger grew across Nazi-controlled Europe, frightened parents made the heartbreaking choice to send their beloved children away to safety on special rescue trains called the Kindertransport. Ten-year-old Vera packed a single small suitcase with family photographs and an English doll before boarding the train to London alone. How did ten thousand brave refugee children build new lives in a foreign land?',

  lesson_4:
    'For fifty-seven terrifying nights in a row, German bomber planes roared over London, dropping bombs that lit the night sky with roaring fires. Families huddled together underground in cold garden Anderson shelters or slept shoulder-to-shoulder on dusty railway platforms deep in the London Underground. How did ordinary British neighbours show courage and stick together during the darkest nights of the Blitz?',

  lesson_5:
    "Surrounded by water, Britain relied on merchant ships to bring food from across the Atlantic Ocean—until German submarines began sinking them. With food running dangerously short, the government gave every family a colourful ration book and urged the nation to 'Dig for Victory' by turning flower gardens and parks into vegetable patches. How did children and families manage to eat healthily when eggs and sweets were rare treats?",

  lesson_6:
    "With millions of men serving in the armed forces overseas, women stepped forward in their millions to keep Britain running, fed, and defended. They drove heavy tractors across muddy fields in the Women's Land Army, manufactured bombs in dangerous munitions factories, and even flew Spitfire fighter planes between airfields. How did women prove they could do every job imaginable to help win the war?",

  lesson_7:
    'Before the war, millions of Jewish children across Europe lived happy, vibrant lives—playing football, going to school, learning music, and celebrating festivals with loving families. But when the Nazi regime took power, unfair laws slowly stripped away their freedom, banning Jewish children from public playgrounds, swimming pools, and finally their own classrooms. Why is it vital to remember how their rights were stolen step by step?',

  lesson_8:
    "Deep in the Buckinghamshire countryside at a secret mansion called Bletchley Park, a hidden team of brilliant mathematicians and thousands of young women fought a silent war of wits. They raced day and night to break the German military's 'unbreakable' Enigma cipher machine using colossal whirring codebreaking machines designed by Alan Turing. How did this top-secret operation help save millions of lives and shorten the war?",

  lesson_9:
    'In December 1938, a young British stockbroker named Nicholas Winton cancelled his skiing holiday and travelled to snowy Prague after hearing about desperate refugee children. Working alongside a brave Dorset teacher named Trevor Chadwick, he battled through endless paperwork to organise eight rescue trains that brought 669 boys and girls to safety in Britain. What inspired these ordinary young people to risk everything to save strangers?',

  lesson_10:
    'On Tuesday 8 May 1945, church bells rang out across Britain as Prime Minister Winston Churchill declared that the war in Europe was finally over. Neighbours cheered, danced, and shared sandwiches at lively street parties decorated with red, white, and blue paper bunting, while also remembering loved ones who would never return home. Why do we still wear red poppies and gather at war memorials to remember their sacrifices today?',

  lesson_11:
    'In the summer of 1945, ten giant Stirling bomber planes landed at a British airfield carrying three hundred starving, exhausted child survivors of the concentration camps. Taken to the peaceful shores of Lake Windermere in the Lake District, the children were given warm beds, red bicycles, and caring doctors to help heal their broken bodies and spirits. How did this extraordinary community help young survivors learn to smile, play, and live again?',
};

async function run() {
  const rootDir = path.resolve(__dirname, '..');
  const dataJsPath = path.join(rootDir, 'units', 'ks2_ww2', 'data.js');
  const pubJsonPath = path.join(rootDir, 'public', 'data', 'ks2_ww2.json');
  const dbPath = path.join(rootDir, 'public', 'database.json');

  console.log('Loading units/ks2_ww2/data.js...');
  const mod = await import(pathToFileURL(dataJsPath).href);
  const unitData = mod.default || mod.unitData;

  let injected = 0;
  unitData.lessons.forEach((l) => {
    if (KS2_BLURBS[l.id]) {
      l.prologue = KS2_BLURBS[l.id];
      l.blurb = KS2_BLURBS[l.id];
      injected++;
      console.log(`✅ Injected blurb into ${l.id} (${l.title})`);
    } else {
      console.warn(`⚠️ No blurb defined for ${l.id}`);
    }
  });

  console.log(`\nInjected blurbs into ${injected}/${unitData.lessons.length} lessons.`);

  // 1. Write back to units/ks2_ww2/data.js
  const jsContent = 'export default ' + JSON.stringify(unitData, null, 2) + ';\n';
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote updated units/ks2_ww2/data.js');

  // 2. Update public/data/ks2_ww2.json
  if (fs.existsSync(pubJsonPath)) {
    const pubData = JSON.parse(fs.readFileSync(pubJsonPath, 'utf8'));
    pubData.data = unitData;
    fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
    console.log('✅ Successfully wrote updated public/data/ks2_ww2.json');
  }

  // 3. Update public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.ks2_ww2) {
      db.ks2_ww2.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated ks2_ww2 in public/database.json');
    }
  }

  console.log('🎉 All files synchronized with KS2 WW2 blurbs.');
}

run().catch((err) => {
  console.error('❌ Error injecting blurbs:', err);
  process.exit(1);
});

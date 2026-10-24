const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

console.log('======================================================');
console.log('🎬 INJECTING FULL 6-PART BBC NORMAN CONQUEST SERIES');
console.log('======================================================');

const lesson1Videos = [
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=1sK4JX0co8I',
    title:
      'Who were the claimants to the throne in 1066? (1/6) | History – The Norman Conquest | BBC Bitesize',
    duration: '5 mins 38 secs',
    teacher_guidance:
      "Examines the succession crisis of January 1066 following Edward the Confessor's death, contrasting the legal, bloodline, and oath claims of Harold Godwinson, William Duke of Normandy, Harald Hardrada, and Edgar the Aetheling.",
    viewing_task:
      'What different claims to the English throne were put forward by Harold Godwinson, William of Normandy, and Harald Hardrada?',
    model_answer:
      'Harold Godwinson claimed Edward the Confessor nominated him on his deathbed and the Witan elected him. William of Normandy claimed Edward had promised him the throne in 1051 and Harold had sworn a sacred oath to support him. Harald Hardrada claimed the throne based on an earlier secret pact between King Harthacnut and King Magnus of Norway.',
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=m9NdbxQWdJ8',
    title: '1066: The Battle of Fulford (2/6) | History – The Norman Conquest | BBC Bitesize',
    duration: '6 mins 02 secs',
    teacher_guidance:
      'Investigates the invasion of northern England by Harald Hardrada and Tostig Godwinson in September 1066 and the clash with Earls Edwin and Morcar at Gate Fulford outside York.',
    viewing_task:
      'Why did Earls Edwin and Morcar fight the Viking invaders at Fulford rather than waiting inside the walled city of York?',
    model_answer:
      'Edwin and Morcar chose to confront Hardrada south of York to protect the city from being pillaged and to pin the Viking army against the swampy ditch of Germany Beck, but were outflanked when Hardrada’s veteran warriors pushed through the marsh.',
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=qtW7H7yPZLg',
    title:
      '1066: The Battle of Stamford Bridge (3/6) | History - The Norman Conquest | BBC Bitesize',
    duration: '6 mins 06 secs',
    teacher_guidance:
      'Charts King Harold’s extraordinary forced march 200 miles north in four days, catching the Viking army unawares without armour and ending the Viking Age in England.',
    viewing_task:
      'How did King Harold achieve surprise at Stamford Bridge, and what cost did this victory have for his southern defences?',
    model_answer:
      'Harold marched his mounted housecarls and fyrd 200 miles north in just four days, surprising the Vikings while their heavy chainmail was left with their ships. While Hardrada and Tostig were killed, Harold’s army suffered severe casualties and was exhausted just as Duke William landed on the southern coast.',
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=zigjVCFzZ38',
    title: '1066: The Battle of Hastings (4/6) | History - The Norman Conquest | BBC Bitesize',
    duration: '6 mins 10 secs',
    teacher_guidance:
      'Detailed breakdown of the tactical phases at Senlac Hill, comparing the Saxon shield wall with Norman composite forces (archers, infantry, and heavy cavalry).',
    viewing_task:
      "How did the combination of the Saxon shield wall breaking and the Norman 'feigned retreat' tactic turn the battle in William's favour?",
    model_answer:
      'The Anglo-Saxons held an impenetrable hilltop shield wall until rumours spread that William was dead. When Norman cavalry feigned retreat down the hill, Saxon fyrd soldiers broke formation to pursue them, leaving gaps in their defensive line. William removed his helmet to rally his men, and the cavalry wheeled round to cut down the exposed Saxons.',
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=wiaCId6pANI',
    title: 'Why William Won at the Battle of Hastings 1066 | Animated History | English Heritage',
    duration: '1 min 16 secs',
    teacher_guidance:
      'Crisp animated summary by English Heritage examining the three decisive factors: wind/luck, exhaustion after Stamford Bridge, and tactical flexibility.',
    viewing_task:
      'What three critical advantages allowed Duke William of Normandy to defeat King Harold at Hastings?',
    model_answer:
      "Harold's army was exhausted after marching 200 miles south from Stamford Bridge; William possessed cavalry and archers whereas Harold lacked cavalry; and the feigned retreat tactic successfully shattered the Saxon defensive wall.",
  },
];

const lesson2Videos = [
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=KGDu-_vi8sg',
    title:
      'How William the Conquerer secured power after 1066 (5/6) | History - The Norman Conquest | BBC Bitesize',
    duration: '4 mins 58 secs',
    teacher_guidance:
      'Details how William established military dominance following his coronation through the rapid erection of over 500 motte-and-bailey fortresses and the feudal distribution of land to Norman tenants-in-chief.',
    viewing_task:
      'How did motte-and-bailey castles allow a tiny Norman minority (around 7,000 soldiers) to dominate an English population of over two million?',
    model_answer:
      'Castles functioned as military psychological garrisons placed at strategic road intersections, river crossings, and rebellious towns. A small detachment of mounted Norman knights could shelter safely within the palisades and ride out rapidly to crush any local uprising before rebels could organise.',
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=kNWoXlAZdkM',
    title: 'Revolt and resistance after 1066 (6/6) | History - The Norman Conquest | BBC Bitesize',
    duration: '6 mins 00 secs',
    teacher_guidance:
      'Examines English resistance across Exeter, the Welsh Marches, Hereward the Wake in the Isle of Ely, and the catastrophic brutality of the Harrying of the North (1069–1070).',
    viewing_task:
      'What was the Harrying of the North, and why did William adopt such an extreme, scorched-earth policy in 1069–1070?',
    model_answer:
      'Following rebellions in York supported by Danish fleets, William systematically burned crops, slaughtered livestock, salted soil, and destroyed food stores across Yorkshire to the Tees. He did this to starve out any surviving rebels and create a wasteland buffer zone so the north could never rebel or support an invading fleet again.',
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=RXXDThkJ3Ew',
    title: 'A Mini Guide to Medieval Castles | Animated History | English Heritage',
    duration: '1 min 55 secs',
    teacher_guidance:
      'Explains how William rapidly constructed timber motte-and-bailey fortresses across England to assert territorial control and intimidate local Anglo-Saxon populations.',
    viewing_task:
      'Why were motte-and-bailey castles the ideal military fortification for William to build immediately following the conquest?',
    model_answer:
      'They could be constructed in a matter of days or weeks using readily available earth and timber, providing an elevated motte (mound) for lookout and defence and an enclosed bailey for garrisoning troops and horses to suppress local rebellions.',
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=om_BIzXaVwU',
    title: 'The Domesday Book | The Story of Britain | BBC Teach',
    duration: '6 mins 45 secs',
    teacher_guidance:
      "Archival narrative exploring the unprecedented 1086 nationwide survey, why Anglo-Saxons likened it to the 'Day of Judgement', and how William used it for tax and feudal control.",
    viewing_task:
      'What was the purpose of the 1086 Domesday survey, and why did the English people compare it to Doomsday?',
    model_answer:
      "William ordered royal commissioners to survey every hide of land, mill, pig, woodland, and tenant across England to establish exact tax values and feudal obligations. People called it 'Domesday' because, like the biblical Day of Judgement, its records were absolute and could never be appealed or challenged.",
  },
];

async function update() {
  const meDataPath = path.join(ROOT_DIR, 'units', 'medieval_england', 'data.js');
  const meUrl = 'file:///' + meDataPath.replace(/\\/g, '/');
  const meMod = await import(meUrl);
  const meData = meMod.default || meMod.unitData;

  const l1 = meData.lessons.find((l) => l.id === 'lesson_1');
  if (l1) {
    l1.video = lesson1Videos;
    console.log(
      `✅ Injected ${l1.video.length} videos into Lesson 1 (Parts 1/6, 2/6, 3/6, 4/6 + English Heritage)`,
    );
  }

  const l2 = meData.lessons.find((l) => l.id === 'lesson_2');
  if (l2) {
    l2.video = lesson2Videos;
    console.log(
      `✅ Injected ${l2.video.length} videos into Lesson 2 (Parts 5/6, 6/6 + English Heritage + Domesday)`,
    );
  }

  const meFileContent = `const unitData = ${JSON.stringify(meData, null, 2)};\n\nexport default unitData;\nexport { unitData };\n`;
  fs.writeFileSync(meDataPath, meFileContent, 'utf8');
  console.log('✅ Updated units/medieval_england/data.js');

  // Update JSON mirrors
  ['data/medieval_england.json', 'public/data/medieval_england.json'].forEach((rel) => {
    const p = path.join(ROOT_DIR, rel);
    if (fs.existsSync(p)) {
      const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (raw.data && raw.data.lessons) {
        raw.data.lessons = meData.lessons;
      } else if (raw.lessons) {
        raw.lessons = meData.lessons;
      }
      fs.writeFileSync(p, JSON.stringify(raw, null, 2), 'utf8');
      console.log(`✅ Synced ${rel}`);
    }
  });

  // Recompile database.json
  console.log('\nRebuilding public/database.json...');
  execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });
  console.log('✅ public/database.json successfully recompiled.');

  console.log('\n🎉 ALL 6 BBC BITESIZE NORMAN CONQUEST EPISODES ARE NOW FULLY INJECTED!');
}

update().catch((err) => {
  console.error('❌ Error updating series:', err);
  process.exit(1);
});

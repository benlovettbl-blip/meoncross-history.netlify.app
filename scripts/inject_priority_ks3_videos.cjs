const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

// 1. Medieval England Videos (Lessons 1-5)
const medievalVideos = {
  lesson_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=zigjVCFzZ38',
      title: '1066: The Battle of Hastings | History - The Norman Conquest | BBC Bitesize',
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
  ],
  lesson_2: [
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
  ],
  lesson_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=GtYb038Q7DY',
      title:
        'Henry II, Thomas Becket and the Church Courts | The Strange Case of the Law | BBC Bitesize',
      duration: '4 mins 07 secs',
      teacher_guidance:
        "Explores the fundamental legal constitutional dispute over 'benefit of clergy' and whether churchmen who committed crimes should be tried in royal or ecclesiastical courts.",
      viewing_task:
        "What was the legal issue of 'criminous clerks', and why did Henry II believe the Church courts undermined royal authority?",
      model_answer:
        "Anyone in religious orders could claim 'benefit of clergy' and be tried in bishop's courts, where capital punishment was forbidden and penalties were light (such as prayers or defrocking), whereas royal courts hanged murderers. Henry II argued this created a two-tier legal system where a sixth of the population was exempt from royal justice.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=cwTaqxLg7nk',
      title: 'The Murder of Thomas Becket | Murder and Martyrdom | History Hub',
      duration: '4 mins 24 secs',
      teacher_guidance:
        'Dramatic account of the confrontation on 29 December 1170 inside Canterbury Cathedral between the four Norman knights and Archbishop Thomas Becket.',
      viewing_task:
        'What words did Henry II allegedly utter in fury, and what happened when the four knights confronted Becket in Canterbury Cathedral?',
      model_answer:
        "Henry uttered words of exasperation ('Will no one rid me of this turbulent priest?'). Four knights sailed to England, confronted Becket inside Canterbury Cathedral during Vespers, and struck him down with swords before the altar when he refused to submit to royal authority.",
    },
  ],
  lesson_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=7xo4tUMdAMw',
      title: 'What is Magna Carta? | British Library',
      duration: '3 mins 33 secs',
      teacher_guidance:
        "The British Library's authoritative animated explainer charting King John's abuses of feudal rights, heavy taxation, defeat at Bouvines, and the sealing of the Great Charter at Runnymede.",
      viewing_task:
        'What core legal principle established in Clause 39 of Magna Carta still underpins modern law today?',
      model_answer:
        'Clause 39 established that no free man could be seized, imprisoned, or stripped of possessions except by the lawful judgement of his equals or by the law of the land, establishing that the king himself was subject to the rule of law.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=wWKTy1NlxZE',
      title: 'Magna Carta | The Story of Britain | BBC Teach',
      duration: '7 mins 44 secs',
      teacher_guidance:
        'Examines how the barons drafted the charter in June 1215 to protect their land and wealth against royal extortion, and why Pope Innocent III subsequently annulled the agreement.',
      viewing_task:
        'Why did the barons rebel against King John in 1215, and how did he react once he had sealed the charter at Runnymede?',
      model_answer:
        "The barons rebelled because John demanded exorbitant scutage (shield taxes), seized inheritances, and lost their ancestral lands in Normandy. While John sealed the charter under duress at Runnymede, he immediately appealed to Pope Innocent III, who annulled it, sparking the First Barons' War.",
    },
  ],
  lesson_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=NBxLWTyUJ0w',
      title: 'The Black Death | GCSE & KS3 History Explainer',
      duration: '3 mins 02 secs',
      teacher_guidance:
        "Explains how the Yersinia pestis bacteria arrived via trading ships in 1348, wiping out an estimated third to a half of England's population and creating acute labour shortages.",
      viewing_task:
        'How did the massive loss of population during the Black Death shift economic power into the hands of surviving peasant labourers?',
      model_answer:
        'With up to half the population dead, agricultural fields lay unharvested and landlords faced desperate labour shortages. Surviving peasants could demand higher wages and threaten to move to other manors, directly undermining the traditional feudal system of bonded serfdom.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=WsML7hiTnsY',
      title: "The Peasants' Revolt (1381) | History - The Plantagenets | BBC Bitesize",
      duration: '5 mins 27 secs',
      teacher_guidance:
        'Traces the trigger of the 1381 rebellion from the hated Poll Tax to Wat Tyler and radical priest John Ball marching on London to confront 14-year-old Richard II.',
      viewing_task:
        'What were the main demands of Wat Tyler and the rebels when they met King Richard II at Mile End and Smithfield?',
      model_answer:
        'The rebels demanded the abolition of serfdom (feudal bondage), the repeal of the Ordinance of Labourers, freedom of movement, fair land rents (fourpence an acre), and pardon for all rebels.',
    },
  ],
};

// 2. Industrialisation and Empire Videos (Lessons 2-5)
const industrialVideos = {
  lesson_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=1PmHBqtLFss',
      title:
        'Horrific Working Conditions Experienced by Children in the Industrial Revolution | Channel 4',
      duration: '4 mins 11 secs',
      teacher_guidance:
        'Documentary investigation examining the grueling physical reality for parish apprentice children working inside northern cotton mills under dangerous machinery.',
      viewing_task:
        "What hazardous tasks were children expected to carry out as 'scavengers' and 'piecers' in textile mills?",
      model_answer:
        "Children crawled underneath rapidly moving spinning mules to sweep up loose cotton fibres ('scavengers') or climbed over machinery to tie snapped threads ('piecers'), risking being crushed, losing fingers, or being scalped by unprotected belts and cogs.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=KZM-LpIOEBU',
      title:
        'The Industrial Revolution: Life of Children at Quarry Bank Mill | Educational Archive',
      duration: '1 min 26 secs',
      teacher_guidance:
        'Case study of Quarry Bank Mill at Styal, illustrating factory bell schedules, apprentice dormitories, and the regimentation of human labour by clock-time.',
      viewing_task:
        'How did the factory bell system change the everyday relationship between workers and time during the Industrial Revolution?',
      model_answer:
        'Work was no longer governed by daylight or season as on rural farms, but by strict clock-time. The factory bell dictated waking, eating, and 12-to-14 hour shifts with severe fines or physical punishment for arriving minutes late.',
    },
  ],
  lesson_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=SrrXUN7S_Ys',
      title: 'Urban Slums: Manchester & Industrial Living Conditions | Timelines.tv',
      duration: '6 mins 55 secs',
      teacher_guidance:
        "Explores the explosive growth of industrial cities like Manchester ('Cottonopolis'), where rapid, unregulated building created cramped, damp back-to-back courts without sanitation.",
      viewing_task:
        'Why did life expectancy for working-class families plummet to under 20 years in industrial cities during the early 19th century?',
      model_answer:
        'Overcrowding in damp cellar dwellings, lack of clean piped water, open sewage flowing down unpaved streets, cesspools leaking into water supplies, and virulent water-borne cholera and typhus epidemics devastated public health.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=oHhqzoqFqew',
      title: 'The Growth of Industry & Factory Towns | BBC Bitesize',
      duration: '4 mins 17 secs',
      teacher_guidance:
        'Analyses demographic shifts from countryside to manufacturing hubs and the social cost of rapid, unplanned urban sprawl.',
      viewing_task:
        'How did the layout of back-to-back terraced houses contribute to the rapid spread of infectious diseases?',
      model_answer:
        'Back-to-back houses shared three exterior walls with adjoining properties, creating zero through-ventilation, dark damp interiors, and forcing up to a hundred residents to share a single privy cesspit located in a narrow communal courtyard.',
    },
  ],
  lesson_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=pyMOo52H05E',
      title: 'The Peterloo Massacre (1819) | Timelines.tv',
      duration: '6 mins 31 secs',
      teacher_guidance:
        "Detailed examination of 16 August 1819 at St Peter's Field, Manchester, where 60,000 unarmed working-class demonstrators gathered to demand parliamentary reform before being charged by the yeomanry cavalry.",
      viewing_task:
        "Why did magistrates order the cavalry to charge the crowd at St Peter's Field, and why was the event mockingly named 'Peterloo'?",
      model_answer:
        "Magistrates feared the massive, peaceful gathering was a prelude to violent revolution and ordered the Manchester Yeomanry to arrest orator Henry Hunt. The cavalry drew sabres and charged into the dense crowd, killing 18 and injuring hundreds. The press coined the name 'Peterloo' in bitter contrast to the soldiers' heroics at the Battle of Waterloo.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=mWucd5tXlqY',
      title: 'The Chartists (1838–1848) | Timelines.tv History of Britain',
      duration: '9 mins 35 secs',
      teacher_guidance:
        "Charts the rise of the Chartist movement, the drafting of the People's Charter, and the massive monster petitions delivered to Parliament.",
      viewing_task:
        "What were two key demands of the People's Charter, and how did Parliament initially respond to the million-signature petition?",
      model_answer:
        'The Charter demanded universal male suffrage, secret ballots to prevent landlord intimidation, and the abolition of property qualifications so working-class men could become MPs. Parliament overwhelmingly rejected the petition by 235 votes to 46, sparking waves of strikes and civil unrest.',
    },
  ],
  lesson_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=7geGIkPy5q0',
      title: 'What was the Great Reform Act 1832? | Parliamentary Archives | History Hub',
      duration: '2 mins 30 secs',
      teacher_guidance:
        "Explains how the 1832 Act abolished 'rotten boroughs' like Old Sarum and Dunwich while granting parliamentary representation to burgeoning industrial powerhouses like Manchester and Birmingham.",
      viewing_task:
        "What were 'rotten boroughs', and how did the Great Reform Act of 1832 begin to rebalance parliamentary power?",
      model_answer:
        "'Rotten boroughs' were depopulated settlements (such as Old Sarum with only 7 voters) that sent two MPs to Parliament, while industrial cities of 200,000 people had no representation. The 1832 Act disenfranchised 56 rotten boroughs and created new seats for northern industrial towns, extending the vote to wealthier middle-class men.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=3K2oMqYEGdY',
      title: 'Elections & Voting Explained | UK Parliament',
      duration: '1 min 35 secs',
      teacher_guidance:
        'Concise parliamentary explainer on the evolution from open public hustings voting to the Ballot Act 1872 and progressive widening of the franchise.',
      viewing_task:
        'Why was the introduction of the secret ballot in 1872 vital for protecting working-class voters?',
      model_answer:
        'Prior to 1872, votes were cast verbally on an open wooden stage (hustings), allowing landlords, employers, and factory bosses to fire or evict tenants who voted against their wishes. The secret ballot enabled voters to choose freely without intimidation or bribery.',
    },
  ],
};

// 3. Water & Sanitation Videos (Lesson 7)
const waterLesson7Videos = [
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=TT4Z1Ikf36w',
    title: 'Chadwick and Snow: Transforming 19th Century Public Health | BBC Bitesize',
    duration: '5 mins 00 secs',
    teacher_guidance:
      "Masterclass synthesis contrasting Edwin Chadwick's 1842 Report on the Sanitary Condition of the Labouring Population with Dr John Snow's breakthrough mapping of the 1854 Broad Street cholera outbreak.",
    viewing_task:
      "How did Dr John Snow prove that cholera was water-borne rather than caused by foul air ('miasma')?",
    model_answer:
      'Snow drew a spot map of deaths in Soho and cross-referenced them with local water pumps, showing that the vast majority of cholera victims drank from the Broad Street pump. When the handle was removed and the pump closed, deaths plummeted, providing empirical epidemiological proof that cholera was spread through contaminated water.',
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=XoS68K916eo',
    title: 'Government Action & The Public Health Act 1875 | GCSE History',
    duration: '3 mins 24 secs',
    teacher_guidance:
      "Essential revision summary of the shift from Victorian 'laissez-faire' inaction to compulsory state intervention under the landmark 1875 Public Health Act.",
    viewing_task:
      'Why was the 1875 Public Health Act fundamentally different from the earlier 1848 Public Health Act?',
    model_answer:
      "The 1848 Act was optional ('permissive'), allowing councils to ignore sanitary improvements if local taxpayers objected. In contrast, the 1875 Act was compulsory ('mandatory'), forcing every town council to supply clean water, appoint medical officers of health, collect refuse, and enforce sanitary sewer connections.",
  },
];

async function run() {
  console.log('======================================================');
  console.log('🚀 INJECTING PRIORITY KS3 CURATED VIDEO PLAYLISTS');
  console.log('======================================================');

  // ----------------------------------------------------
  // A. Update Medieval England
  // ----------------------------------------------------
  console.log('\n[1/4] Updating units/medieval_england/data.js...');
  const meDataPath = path.join(ROOT_DIR, 'units', 'medieval_england', 'data.js');
  const meUrl = 'file:///' + meDataPath.replace(/\\/g, '/');
  const meMod = await import(meUrl);
  const meData = meMod.default || meMod.unitData;

  meData.lessons.forEach((lesson) => {
    if (medievalVideos[lesson.id]) {
      lesson.video = medievalVideos[lesson.id];
      console.log(
        `  ✅ Injected ${lesson.video.length} videos into ${lesson.id} (${lesson.title.slice(0, 45)}...)`,
      );
    }
  });

  const meFileContent = `const unitData = ${JSON.stringify(meData, null, 2)};\n\nexport default unitData;\nexport { unitData };\n`;
  fs.writeFileSync(meDataPath, meFileContent, 'utf8');

  // Update JSON files for Medieval England
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
      console.log(`  ✅ Synced ${rel}`);
    }
  });

  // ----------------------------------------------------
  // B. Update Industrialisation & Empire
  // ----------------------------------------------------
  console.log('\n[2/4] Updating units/industrialisation_and_empire/data.js...');
  const indDataPath = path.join(ROOT_DIR, 'units', 'industrialisation_and_empire', 'data.js');
  const indUrl = 'file:///' + indDataPath.replace(/\\/g, '/');
  const indMod = await import(indUrl);
  const indData = indMod.default || indMod.unitData;

  indData.lessons.forEach((lesson) => {
    if (industrialVideos[lesson.id]) {
      lesson.video = industrialVideos[lesson.id];
      console.log(
        `  ✅ Injected ${lesson.video.length} videos into ${lesson.id} (${lesson.title.slice(0, 45)}...)`,
      );
    }
  });

  const indFileContent = `const unitData = ${JSON.stringify(indData, null, 2)};\n\nexport default unitData;\nexport { unitData };\n`;
  fs.writeFileSync(indDataPath, indFileContent, 'utf8');

  // Also update data_v2_4act.js if present
  const indV2Path = path.join(ROOT_DIR, 'units', 'industrialisation_and_empire', 'data_v2_4act.js');
  if (fs.existsSync(indV2Path)) {
    const indV2Url = 'file:///' + indV2Path.replace(/\\/g, '/');
    const indV2Mod = await import(indV2Url);
    const indV2Data =
      indV2Mod.default || indV2Mod.unitData || indV2Mod.industrialisation_and_empire;
    indV2Data.lessons.forEach((l) => {
      if (l.id === 'lesson_2') l.video = industrialVideos.lesson_2;
      if (l.id === 'lesson_3') l.video = industrialVideos.lesson_3;
      if (l.id === 'lesson_6') l.video = industrialVideos.lesson_4;
      if (l.id === 'lesson_7') l.video = industrialVideos.lesson_5;
    });
    const indV2Content = `const industrialisation_and_empire = ${JSON.stringify(indV2Data, null, 2)};\n\nexport default industrialisation_and_empire;\n`;
    fs.writeFileSync(indV2Path, indV2Content, 'utf8');
    console.log('  ✅ Injected videos into data_v2_4act.js');
  }

  // Update JSON files for Industrialisation
  [
    'data/industrialisation_and_empire.json',
    'public/data/industrialisation_and_empire.json',
  ].forEach((rel) => {
    const p = path.join(ROOT_DIR, rel);
    if (fs.existsSync(p)) {
      const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (raw.data && raw.data.lessons) {
        raw.data.lessons = indData.lessons;
      } else if (raw.lessons) {
        raw.lessons = indData.lessons;
      }
      fs.writeFileSync(p, JSON.stringify(raw, null, 2), 'utf8');
      console.log(`  ✅ Synced ${rel}`);
    }
  });

  // ----------------------------------------------------
  // C. Update Water & Sanitation
  // ----------------------------------------------------
  console.log('\n[3/4] Updating units/water_and_sanitation/data.js...');
  const wsDataPath = path.join(ROOT_DIR, 'units', 'water_and_sanitation', 'data.js');
  const wsUrl = 'file:///' + wsDataPath.replace(/\\/g, '/');
  const wsMod = await import(wsUrl);
  const wsData = wsMod.default || wsMod.water_and_sanitation || wsMod.unitData;

  const wsL7 = wsData.lessons.find((l) => l.id === 'lesson_7');
  if (wsL7) {
    wsL7.video = waterLesson7Videos;
    console.log(
      `  ✅ Injected ${wsL7.video.length} videos into lesson_7 (${wsL7.title.slice(0, 45)}...)`,
    );
  }

  const wsFileContent = `const water_and_sanitation = ${JSON.stringify(wsData, null, 2)};\n\nexport default water_and_sanitation;\nexport { water_and_sanitation };\n`;
  fs.writeFileSync(wsDataPath, wsFileContent, 'utf8');

  // Update JSON files for Water & Sanitation
  ['data/water_and_sanitation.json', 'public/data/water_and_sanitation.json'].forEach((rel) => {
    const p = path.join(ROOT_DIR, rel);
    if (fs.existsSync(p)) {
      const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (raw.data && raw.data.lessons) {
        raw.data.lessons = wsData.lessons;
      } else if (raw.lessons) {
        raw.lessons = wsData.lessons;
      }
      fs.writeFileSync(p, JSON.stringify(raw, null, 2), 'utf8');
      console.log(`  ✅ Synced ${rel}`);
    }
  });

  // ----------------------------------------------------
  // D. Recompile Global Database
  // ----------------------------------------------------
  console.log('\n[4/4] Rebuilding public/database.json...');
  try {
    execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });
    console.log('✅ public/database.json successfully recompiled.');
  } catch (e) {
    console.error('❌ Failed to recompile database.json:', e.message);
    process.exit(1);
  }

  console.log('\n🎉 ALL 10 PRIORITY LESSONS SUCCESSFULLY INJECTED WITH CURATED VIDEOS!');
}

run().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});

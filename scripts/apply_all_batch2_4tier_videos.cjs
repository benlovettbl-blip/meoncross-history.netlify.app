/**
 * apply_all_batch2_4tier_videos.cjs
 * Upgrades medieval_england, early_modern_world, and water_and_sanitation
 * to the GCSE/KS3 4-Tier Ideal Classroom Video Shelf Standard (4 videos per lesson).
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const medievalVideos = [
  // Lesson 1: 1066 & The Battle of Hastings
  [
    {
      id: "wiaCId6pANI",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=wiaCId6pANI",
      title: "Why William Won at the Battle of Hastings 1066 | English Heritage",
      duration: "1 min 16 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–01:16 | Lesson Phase: Lesson Hook | Tone Alert: Fast animated breakdown of the pivotal turning points on Senlac Hill.",
      viewing_task: "[00:30] Quick Check: What tactical feint did Norman cavalry execute to lure Anglo-Saxon shield walls down Senlac Hill?\n[01:00] Hinge Question: Was William's victory primarily due to Norman tactical genius or Anglo-Saxon physical exhaustion after Stamford Bridge?",
      model_answer: "Quick Check: A feigned retreat, pretending to panic and flee so Saxons broke their defensive wall in pursuit.\nHinge Question: While the feigned retreat was decisive, Harold's army was critically depleted and exhausted after marching 250 miles south immediately following the brutal Battle of Stamford Bridge."
    },
    {
      id: "zigjVCFzZ38",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=zigjVCFzZ38",
      title: "1066: The Battle of Hastings | BBC Bitesize History",
      duration: "6 mins 10 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–05:45 | Lesson Phase: Tactical Analysis | Tone Alert: Rigorous analysis of weaponry, terrain, cavalry, and Harold Godwinson's death.",
      viewing_task: "[01:15] Recall: What defensive advantages did Harold Godwinson's Saxon shield wall hold at the crest of Senlac Hill?\n[03:20] Explain: How did Norman combined-arms tactics (archers, heavy infantry, armored cavalry) systematically dismantle the Saxon formation?\n[05:10] Challenge: In what ways does the Bayeux Tapestry serve as both valuable primary visual evidence and Norman political propaganda?",
      model_answer: "Recall: The tight interlocking wall of ash-wood shields on higher ground effectively deflected Norman cavalry charges and arrow volleys.\nExplain: William ordered high-angle arrow fire over the shield wall while cavalry repeatedly assaulted disordered groups, breaking Saxon cohesion.\nChallenge: Commissioned by William's half-brother Bishop Odo, it portrays William as God's righteous instrument reclaiming a sworn oath, justifying the conquest to the Christian world."
    },
    {
      id: "1sK4JX0co8I",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=1sK4JX0co8I",
      title: "Who Were the Claimants to the Throne in 1066? | BBC Bitesize",
      duration: "5 mins 38 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:15–05:00 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Dramatic representations of Harold Godwinson, William of Normandy, Harald Hardrada, and Edgar the Aetheling.",
      viewing_task: "[01:40] Cinematic Discussion Focus: How does the dramatisation contrast the claims and personal motivations of Harold Godwinson, William of Normandy, and the Viking king Harald Hardrada?",
      model_answer: "Cinematic Discussion Focus: The dramatisation visually contrasts Godwinson's popular Saxon coronation with William's legalistic invocation of a holy relic oath and Hardrada's warrior ambition, showing how conflicting medieval succession customs produced unavoidable total war."
    },
    {
      id: "m9NdbxQWdJ8",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=m9NdbxQWdJ8",
      title: "1066: The Battle of Fulford & The Crisis of Stamford Bridge | BBC",
      duration: "6 mins 02 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:30–05:40 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Explores the Northern invasion by Harald Hardrada and Tostig Godwinson.",
      viewing_task: "[01:20] Recall: What occurred when northern Earls Edwin and Morcar confronted the Viking invaders at Fulford Gate?\n[03:15] Explain: How did Harold Godwinson achieve total surprise against Hardrada's army at Stamford Bridge on 25 September 1066?\n[05:00] Challenge: How did the double invasion in the North and South within three weeks make the defence of Anglo-Saxon England strategically impossible?",
      model_answer: "Recall: The Viking army outflanked the northern earls, driving them into the marshland and capturing York.\nExplain: Harold marched his elite housecarls 190 miles in just four days, catching the Vikings resting in warm weather without their mail hauberks.\nChallenge: Harold could not be in two places at once: defeating the Viking invasion in Yorkshire cost him elite veteran troops and left southern England completely undefended when William's fleet landed at Pevensey."
    }
  ],
  // Lesson 2: Castles, Terror & Domesday: How did the Normans subjugate England?
  [
    {
      id: "RXXDThkJ3Ew",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=RXXDThkJ3Ew",
      title: "A Mini Guide to Medieval Castles | English Heritage",
      duration: "1 min 55 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–01:55 | Lesson Phase: Lesson Hook | Tone Alert: Visual breakdown of motte-and-bailey fortifications and stone keeps.",
      viewing_task: "[00:45] Quick Check: Why could a wooden motte-and-bailey castle be constructed by Norman troops in just a few days?\n[01:30] Hinge Question: Were Norman castles built primarily to defend England from foreign invaders or to terrorize and control the hostile English population?",
      model_answer: "Quick Check: They utilized local earthworks (ditches and mounds) and prefabricated timber palisades that required no stone quarrying.\nHinge Question: Their primary purpose was internal colonial subjugation: small Norman garrisons controlled hostile towns and countryside, crushing local English rebellions."
    },
    {
      id: "KGDu-_vi8sg",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=KGDu-_vi8sg",
      title: "How William the Conqueror Secured Power After 1066 | BBC Bitesize",
      duration: "4 mins 58 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:40 | Lesson Phase: Mechanisms of Control | Tone Alert: Explores the Feudal System, the Harrying of the North, and castle building.",
      viewing_task: "[01:10] Recall: What was the Feudal System, and how did William redistribute land to his Norman barons (tenants-in-chief)?\n[02:45] Explain: What occurred during the brutal 'Harrying of the North' in the winter of 1069–1070?\n[04:15] Challenge: How did William use the Domesday survey of 1086 to secure total financial and military control over England?",
      model_answer: "Recall: All land belonged to the King, who leased parcels to barons in return for military knight service, oaths of loyalty, and taxes.\nExplain: Following Saxon uprisings in York, William salted fields, burned crops, slaughtered livestock, and destroyed farm tools, starving over 100,000 people to prevent further rebellion.\nChallenge: Domesday recorded every hide of land, mill, pig, and fishpond in the kingdom, eliminating tax evasion and providing William with an exact inventory for extracting maximum feudal dues."
    },
    {
      id: "kNWoXlAZdkM",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=kNWoXlAZdkM",
      title: "Revolt and Resistance After 1066 | BBC Bitesize",
      duration: "6 mins 00 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:30–05:30 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Dramatic storytelling exploring Hereward the Wake and the fenland guerrilla resistance at Ely.",
      viewing_task: "[01:30] Cinematic Discussion Focus: How does the dramatisation depict Hereward the Wake's fenland resistance? Why did the Normans view fenland guerrilla tactics with superstition and fear?",
      model_answer: "Cinematic Discussion Focus: The film portrays Hereward's use of misty fenland waterways, reed camouflage, and sudden ambushes against heavy Norman cavalry, illustrating how local English rebels exploited terrain that European knights could not navigate."
    },
    {
      id: "om_BIzXaVwU",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=om_BIzXaVwU",
      title: "The Domesday Book | The Story of Britain | BBC Teach",
      duration: "6 mins 45 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:30–06:15 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Examines the original parchment manuscript at The National Archives.",
      viewing_task: "[01:45] Recall: Why did the English people compare the 1086 survey to the Day of Judgement ('Domesday')?\n[03:30] Explain: How did Norman royal commissioners cross-examine sworn local juries in every shire to uncover hidden wealth?\n[05:45] Challenge: What does the Domesday Book reveal about the almost total destruction of the Anglo-Saxon ruling aristocracy by 1086?",
      model_answer: "Recall: Because its royal tax decisions were absolute and unappealable, just like God's final judgement at the end of the world.\nExplain: Commissioners summoned the Norman lord, the Saxon bailiff, the priest, and six villagers under oath to testify on the land's value in 1066 versus 1086.\nChallenge: It revealed that fewer than 5% of English land remained in the hands of native Anglo-Saxon landowners; an entire ruling class of 4,000 thegns had been dispossessed and replaced by roughly 200 Norman barons."
    }
  ],
  // Lesson 3: Crown vs Church: Why did Henry II clash with Thomas Becket?
  [
    {
      id: "cwTaqxLg7nk",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=cwTaqxLg7nk",
      title: "The Murder of Thomas Becket | History Hub",
      duration: "4 mins 24 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–04:00 | Lesson Phase: Lesson Hook | Tone Alert: Gripping chronicle of the fateful confrontation in Canterbury Cathedral on 29 December 1170.",
      viewing_task: "[01:00] Quick Check: What fateful outburst by King Henry II prompted four Norman knights to ride to Canterbury?\n[03:15] Hinge Question: Was Becket's murder the result of a deliberate royal assassination order or hot-headed knights misinterpreting an angry king?",
      model_answer: "Quick Check: 'Will no one rid me of this turbulent priest?' (or 'What miserable drones have I nourished in my court...').\nHinge Question: While Henry was notoriously prone to volcanic rages, his words were likely an expression of extreme frustration rather than an explicit order for murder, which brought international outrage and papal condemnation upon him."
    },
    {
      id: "GtYb038Q7DY",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=GtYb038Q7DY",
      title: "Henry II, Thomas Becket and the Church Courts | BBC Bitesize",
      duration: "4 mins 07 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–03:50 | Lesson Phase: Constitutional Clash | Tone Alert: Explores the Constitutions of Clarendon and the 'Benefit of Clergy'.",
      viewing_task: "[01:10] Recall: What was the 'Benefit of Clergy', and why did Henry II believe it created a two-tier justice system?\n[02:30] Explain: Why did Henry II appoint his loyal chancellor Thomas Becket as Archbishop of Canterbury in 1162?\n[03:40] Challenge: Why did Becket undergo a dramatic transformation from worldly royal chancellor to ascetic defender of papal supremacy?",
      model_answer: "Recall: Anyone in holy orders accused of serious crimes (including murder and rape) was tried in lenient Church courts that could not impose the death penalty.\nExplain: Henry believed his closest drinking companion and royal administrator would easily subordinate the English Church to the Crown's royal law.\nChallenge: Upon consecrated ordination, Becket took his religious oath with absolute seriousness, believing his higher loyalty was to Jesus Christ and the Pope in Rome rather than an earthly monarch."
    },
    {
      id: "65oCIxobwVs",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=65oCIxobwVs",
      title: "Becket (1964) | 4K Restored Official Trailer (Richard Burton / Peter O'Toole)",
      duration: "3 mins 10 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–03:10 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Masterpiece cinema depicting the intense friendship and tragic political breach between Henry II and Becket.",
      viewing_task: "[01:30] Cinematic Discussion Focus: How do Peter O'Toole and Richard Burton capture the psychological tragedy of two close friends torn apart by irreconcilable medieval duties to Crown and Church?",
      model_answer: "Cinematic Discussion Focus: The trailer dramatises the agonizing personal rift: Henry feels deeply betrayed by his closest companion, while Becket finds spiritual purpose in defying royal bullying, culminating in his martyrdom in Canterbury Cathedral."
    },
    {
      id: "fKoYHKpCSc4",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=fKoYHKpCSc4",
      title: "The Lion in Winter (1968) | Official Trailer (Peter O'Toole / Katharine Hepburn)",
      duration: "3 mins 05 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:00–03:05 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Explores Henry II's vast Angevin Empire spanning from the Scottish border to the Pyrenees.",
      viewing_task: "[01:00] Recall: What territories made up King Henry II's Angevin Empire?\n[01:50] Explain: How did Henry's volatile family dynamic (Eleanor of Aquitaine and his sons Richard, Geoffrey, and John) undermine his royal authority?\n[02:45] Challenge: How did Henry II's legal reforms (assizes, common law, and royal circuit judges) establish the permanent foundations of the English legal system?",
      model_answer: "Recall: England, Normandy, Anjou, Maine, Touraine, and Aquitaine (stretching across more than half of modern France).\nExplain: His ambitious sons repeatedly rebelled against him, backed by their mother Eleanor and the King of France, fighting for control over imperial lands.\nChallenge: Henry established standard royal writs, trial by 12 sworn men (the jury system), and traveling royal judges, replacing arbitrary feudal and church trials with a uniform English Common Law."
    }
  ],
  // Lesson 4: Magna Carta (1215) & Medieval Kingship: Liberty or Barons’ Power Grab?
  [
    {
      id: "7xo4tUMdAMw",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=7xo4tUMdAMw",
      title: "What is Magna Carta? | British Library",
      duration: "3 mins 33 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–03:33 | Lesson Phase: Lesson Hook | Tone Alert: Narrated by Terry Jones; engaging animated overview of the 1215 charter.",
      viewing_task: "[01:00] Quick Check: Where did King John meet the rebellious barons in June 1215 to seal Magna Carta?\n[02:30] Hinge Question: Was Magna Carta a noble declaration of universal human freedom or a selfish protection pact for wealthy feudal barons?",
      model_answer: "Quick Check: Runnymede on the River Thames near Windsor.\nHinge Question: Originally, it was primarily a baronial peace treaty protecting aristocratic land, inheritances, and feudal privileges; however, Clauses 39 and 40 established the universal principle that no free man could be imprisoned without lawful trial."
    },
    {
      id: "wWKTy1NlxZE",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=wWKTy1NlxZE",
      title: "Magna Carta | The Story of Britain | BBC Teach",
      duration: "7 mins 44 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–07:00 | Lesson Phase: Causal Breakdown | Tone Alert: Rigorous historical investigation into King John's failures in Normandy and tax extortion.",
      viewing_task: "[01:30] Recall: Why did King John lose Normandy ('John Lackland' / 'Softsword') to King Philip Augustus of France in 1204?\n[03:45] Explain: How did John's extortionate 'scutage' taxes and mistreatment of baronial hostages provoke armed rebellion?\n[06:00] Challenge: What is the enduring constitutional significance of Clause 39 ('No free man shall be seized or imprisoned... except by the lawful judgement of his equals')?",
      model_answer: "Recall: Military miscalculations, financial weakness, and the capture of Château Gaillard led to the loss of ancestral Norman lands.\nExplain: John demanded exorbitant scutage (shield money) to fund failed French campaigns, seized estates, and imprisoned relatives of barons who failed to pay.\nChallenge: Clause 39 established the bedrock of constitutional democracy: the monarch is subject to the rule of law, and the state cannot arbitrarily detain citizens without due process."
    },
    {
      id: "OextcsiiBFY",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=OextcsiiBFY",
      title: "Ironclad (2011) | Official Movie Trailer (Paul Giamatti as King John)",
      duration: "2 mins 12 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:12 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Gritty, visceral medieval drama depicting the 1215 Siege of Rochester Castle.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does Paul Giamatti portray King John's fury at being forced to sign Magna Carta? How does the film depict the brutal reality of 13th-century siege warfare?",
      model_answer: "Cinematic Discussion Focus: Giamatti portrays John as an enraged tyrant convinced of his divine right to rule unconditionally, viewing the barons as treasonous upstarts; the trailer captures the savage brutality of trebuchet bombardment and castle starvation."
    },
    {
      id: "js_Kab5C2xI",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=js_Kab5C2xI",
      title: "The Legacy of Magna Carta & The Rule of Law | UK Parliamentary Archives",
      duration: "14 mins 20 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:30–12:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Traces the influence of Magna Carta on the English Civil War, the US Constitution, and the Universal Declaration of Human Rights.",
      viewing_task: "[03:00] Recall: What happened within months of Runnymede when Pope Innocent III annulled Magna Carta at King John's request?\n[06:30] Explain: How did the regency of the child king Henry III re-issue Magna Carta to save the Plantagenet dynasty?\n[10:45] Challenge: How did 17th-century parliamentarians like Sir Edward Coke transform a medieval feudal charter into the foundation of parliamentary sovereignty?",
      model_answer: "Recall: The First Barons' War erupted; barons invited Prince Louis of France to invade England and claim the throne.\nExplain: William Marshal reissued a modified charter in Henry III's name, reconciling the rebel barons and preserving the Crown.\nChallenge: Coke used Magna Carta to challenge King Charles I's divine right in the 1628 Petition of Right, establishing that Parliament and the law were superior to the King's personal will."
    }
  ],
  // Lesson 5: The Black Death (1348) & The Peasants’ Revolt (1381)
  [
    {
      id: "NBxLWTyUJ0w",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=NBxLWTyUJ0w",
      title: "The Black Death | GCSE & KS3 History Explainer",
      duration: "3 mins 02 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–03:02 | Lesson Phase: Lesson Hook | Tone Alert: Fast-paced explainer covering symptoms (buboes), arrival via fleas on rats, and mortality.",
      viewing_task: "[01:00] Quick Check: What percentage of the English population died during the 1348–1349 Black Death?\n[02:15] Hinge Question: Why did the Black Death inadvertently give surviving medieval peasants unprecedented economic bargaining power?",
      model_answer: "Quick Check: Between 30% and 50% of the entire population (an estimated 1.5 to 2 million people).\nHinge Question: The massive shortage of labour meant crops were rotting in fields; surviving serfs could demand higher cash wages and threaten to move to rival lords' estates if refused."
    },
    {
      id: "WsML7hiTnsY",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=WsML7hiTnsY",
      title: "The Peasants' Revolt (1381) | BBC Bitesize",
      duration: "5 mins 27 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–05:00 | Lesson Phase: Causal Breakdown | Tone Alert: Rigorous analysis of the Poll Tax, John Ball's sermons, and Wat Tyler.",
      viewing_task: "[01:15] Recall: What was the 1351 Statute of Labourers, and why did it infuriate English peasants?\n[02:40] Explain: What was John Ball's radical message: 'When Adam delved and Eve span, who was then the gentleman?'\n[04:20] Challenge: How did the 14-year-old King Richard II trick and betray the rebels at Smithfield after Wat Tyler was murdered?",
      model_answer: "Recall: A royal law capping wages at pre-plague levels and ordering serfs who demanded higher pay to be branded with the letter 'F' for falseness.\nExplain: Ball preached that God created all humans equal; hereditary aristocracy and serfdom were artificial human oppressions that should be abolished.\nChallenge: Richard promised to be their leader and grant their charters of freedom; once the rebels dispersed, he rescinded all promises, hung over 1,500 leaders, and declared: 'Serfs you were, and serfs you shall remain.'"
    },
    {
      id: "JkOwLCib1Tk",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=JkOwLCib1Tk",
      title: "Black Death (2010) | Official Movie Trailer (Sean Bean / Eddie Redmayne)",
      duration: "2 mins 18 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:18 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Dark, atmospheric medieval thriller capturing the terror and breakdown of social order during the 1348 pandemic.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film capture the psychological hysteria, religious zealotry, and despair that gripped medieval communities as the plague arrived?",
      model_answer: "Cinematic Discussion Focus: The trailer visually conveys the apocalyptic terror: empty villages, flagellant processions, and desperate villagers turning to superstition and fanaticism as traditional Church authority proved powerless to stop the pestilence."
    },
    {
      id: "YhsPPBGtquo",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=YhsPPBGtquo",
      title: "The Black Death (1348): Causes, Symptoms & Medieval Responses | Timelines.tv",
      duration: "11 mins 40 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:45–11:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Detailed forensic documentary examining medieval medical manuscripts, mass graves, and economic transformation.",
      viewing_task: "[02:30] Recall: What medieval beliefs (astrological alignment, divine wrath, corrupt air / miasma) attempted to explain the pestilence?\n[05:45] Explain: How did the plague permanently shatter the rigid structure of feudalism across England?\n[09:15] Challenge: How did the third Poll Tax of 1381 serve as the immediate catalyst that ignited long-simmering post-plague grievances into open insurrection?",
      model_answer: "Recall: Doctors blamed conjunctions of Saturn and Mars, God's punishment for human wickedness, and foul vaporous air emitted by earthquakes.\nExplain: With labour scarce, lords were forced to rent out land to tenant farmers and pay cash wages; serfdom became economically obsolete within two generations.\nChallenge: The Poll Tax was a flat tax demanding 12 groats from every adult regardless of wealth, shifting the tax burden of the Hundred Years' War onto impoverished peasants who erupted in violent tax resistance."
    }
  ]
];

function applyVideosToUnit(unitName, videosArray) {
  const filePath = path.join(__dirname, '..', 'units', unitName, 'data.js');
  let content = fs.readFileSync(filePath, 'utf8');

  let evalCode = content.replace(/export\s+default\s+unitData;?/g, '').replace(/export\s*\{\s*unitData\s*\};?/g, '');
  evalCode = evalCode.replace('const unitData =', 'var unitData =');
  var unitData;
  eval(evalCode);

  unitData.lessons.forEach((l, idx) => {
    if (videosArray[idx]) {
      l.video = videosArray[idx];
      console.log(`✅ [${unitName}] Lesson ${idx + 1} (${l.id || idx}) upgraded to ${l.video.length} videos`);
    }
  });

  const newContent = 'const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n\nexport { unitData };\nexport default unitData;\n';
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`💾 Updated units/${unitName}/data.js`);

  const dataPath1 = path.join(__dirname, '..', 'data', `${unitName}.json`);
  const dataPath2 = path.join(__dirname, '..', 'public', 'data', `${unitName}.json`);
  fs.writeFileSync(dataPath1, JSON.stringify(unitData, null, 2), 'utf8');
  fs.writeFileSync(dataPath2, JSON.stringify(unitData, null, 2), 'utf8');
  console.log(`💾 Synced data/${unitName}.json and public/data/${unitName}.json`);
}

console.log('======================================================');
console.log('⚔️ APPLYING 4-TIER VIDEO SHELF: MEDIEVAL ENGLAND');
console.log('======================================================');
applyVideosToUnit('medieval_england', medievalVideos);

console.log('\nRebuilding database.json...');
execSync('node scripts/build_database.cjs', { stdio: 'inherit' });
console.log('\n🎉 MEDIEVAL ENGLAND 4-TIER SHELF COMPLETED ACROSS ALL 5 LESSONS!');

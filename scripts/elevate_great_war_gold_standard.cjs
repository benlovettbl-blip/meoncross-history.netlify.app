/**
 * elevate_great_war_gold_standard.cjs
 * Upgrades all 6 lessons of Causes of the Great War (KS3 Year 9)
 * to the publisher-grade Christine Counsell 4-Act Gold Standard:
 * 1. Dramatic Enquiry Prologues (2-3 sentences setting the paradox/hook)
 * 2. 4 Acts with rich fingertip detail, authentic human irony & dark humor
 * 3. 2-beat paragraph structure per Act (~100 words each, tagged [X.1], [X.2])
 * 4. Zero inline comprehension clutter (narrative acts 100% clean)
 * 5. Structured Assessment Zone at bottom: Task 3 (Dual-Column Planning Bridge) + Task 4 (Enquiry Essay with PEEL stems & model answer)
 */

const fs = require('fs');
const path = require('path');

const filePathV2 = path.join(__dirname, '..', 'units', 'great_war', 'data_v2_4act.js');
const filePathLive = path.join(__dirname, '..', 'units', 'great_war', 'data.js');

const PROLOGUES = [
  // Lesson 0
  'For centuries, Central Europe was an ungovernable mosaic of over three hundred separate principalities and kingdoms, vulnerable to invasion and mocked as a geopolitical vacuum. By 1871, a single colossal military superpower had been forged in the heart of Europe under Prussian dominance. Did Chancellor Otto von Bismarck forge this new empire through visionary political genius, or through a ruthless, calculated gamble of "blood and iron"?',
  // Lesson 1
  'In the sunny summer of 1870, Europe appeared at tranquil peace. Six months later, the French Second Empire had collapsed, two million starving Parisians had eaten their own zoo animals under siege, and the German Empire was proclaimed inside the sacred palace of French royalty. How did six months of catastrophic warfare forge a legacy of hatred that would poison an entire continent for over forty years?',
  // Lesson 2
  'In the late nineteenth century, Chancellor Otto von Bismarck famously dismissed imperial expansion, declaring that his map of Africa lay in Europe. Yet by 1905, the impetuous young Kaiser Wilhelm II was galloping a bad-tempered white stallion through Tangier to challenge French colonial dominance. Did the scramble for overseas empires drive European powers to the brink of war, or did it merely mirror existing continental rivalries?',
  // Lesson 3
  'For over a century, Great Britain relied on undisputed command of the oceans to protect its global empire, enforcing a "Two-Power Standard" that required the Royal Navy to be stronger than any two rival fleets combined. When Germany began laying down massive steel battleships on the North Sea coast, Britain met the challenge with a technical revolution that shocked the world. Why did a race to build floating fortresses transform former royal friends into mortal enemies?',
  // Lesson 4
  'Following the humiliation of France in 1871, Otto von Bismarck juggled competing empires like delicate crystal balls, determined to keep Germany safe by keeping France isolated. But when reckless successors dropped the balls, Europe split into two heavily armed, suspicious military coalitions. Did the Triple Alliance and Triple Entente act as a stabilizing balance of power, or did they construct an inflexible doomsday machine?',
  // Lesson 5
  'On a bright June morning in 1914, Archduke Franz Ferdinand and his wife Sophie rode through Sarajevo in an open-topped car. Within hours, an amateurish plot marked by bungled bombs and expired cyanide ended in a bizarre wrong turn outside a delicatessen—triggering the most lethal chain reaction in human history. Why did two pistol shots in a remote Bosnian provincial capital bring down empires and kill twenty million people?',
];

const TASK_3_BRIDGES = [
  // Lesson 0
  {
    type: 'two_sided_argument',
    topic: "Task 3: Bismarck's Legacy: Master Diplomat vs Ruthless Warmonger",
    question:
      'Was the German Empire forged through master diplomacy or ruthless military aggression?',
    instruction:
      "Examine both interpretations of Otto von Bismarck's statecraft. Bullet-point two key pieces of factual evidence into each column, then develop your balanced argument below:",
    advancement: {
      title: 'Interpretation 1: Pragmatic Statesmanship & Diplomacy',
      points: [
        'Built economic unity early through the Zollverein customs union, binding German states peacefully through trade.',
        'Prudently halted Prussian armies after defeating Austria in 1866, refusing to humiliate Vienna to secure future friendship.',
        'Skillfully used defensive alliances to unite southern German states without imposing Prussian military dictatorship.',
      ],
      starter:
        'Historians praising Bismarck argue that his statecraft was guided by calculated moderation, because...',
    },
    limitations: {
      title: 'Interpretation 2: "Blood and Iron" & Provoked Warfare',
      points: [
        'Collected taxes unconstitutionally in 1862 and declared that major historical questions are decided only by iron and blood.',
        'Deliberately provoked three successive wars (against Denmark, Austria, and France) to crush parliamentary opposition.',
        'Bullied King Wilhelm I with emotional tantrums, threatening to jump from palace windows whenever the King hesitated.',
      ],
      starter:
        "Conversely, critics argue that Bismarck's unification rested upon cynical violence and militarism, because...",
    },
    synthesis_prompt:
      'Explain whether Bismarck unified Germany through diplomatic genius or calculated military aggression.',
    synthesis_connectives: [
      'On the one hand...',
      'For instance, Bismarck...',
      'However, in reality...',
      'Consequently...',
      'Overall, it is clear that...',
    ],
    model_answer:
      'While Bismarck was an exceptionally gifted diplomatic tactician who understood the value of moderation—as shown when he refused to march on Vienna in 1866—his entire political strategy rested upon calculated violence. He unconstitutionally bypassed the Prussian parliament to fund his army, manufactured three deliberate wars in seven years, and weaponized the edited Ems Telegram to provoke France. His diplomacy was not an alternative to war, but the art of choosing the precise moment to unleash "blood and iron."',
  },
  // Lesson 1
  {
    type: 'two_sided_argument',
    topic: 'Task 3: Annexing Alsace-Lorraine: Strategic Shield or Catastrophic Blunder?',
    question:
      'Did the annexation of Alsace-Lorraine protect Germany or make a future European war inevitable?',
    instruction:
      'Contrast the Prussian military justification for seizing the border provinces against the long-term diplomatic fallout:',
    advancement: {
      title: 'Prussian Military Justification (The Defensive Shield)',
      points: [
        'Field Marshal von Moltke insisted that the fortress of Metz provided an indispensable military shield protecting the Rhineland.',
        "Deprived France of 1.5 million citizens and 80% of its domestic iron ore, weakening France's industrial capacity for war.",
        'Imposed a 5-billion-franc indemnity and occupation to ensure France remained economically paralyzed.',
      ],
      starter:
        'Prussian military planners justified the annexation as an essential defensive buffer, arguing that...',
    },
    limitations: {
      title: "Diplomatic Fallout (Gordon Craig's Paradox)",
      points: [
        'Created a permanent, unhealable wound in French society, giving birth to the fanatical cult of revanche (revenge).',
        'Immortalized in French schools via Bettannier\'s "La Tache Noire", training generations of boys to prepare for a war of liberation.',
        'Forced Germany into the permanent nightmare of a "two-front war", driving France directly into alliance with Russia in 1894.',
      ],
      starter:
        'In contrast, diplomatic historians emphasize that seizing the provinces was a fatal strategic blunder, because...',
    },
    synthesis_prompt:
      'Explain whether the Treaty of Frankfurt strengthened or permanently endangered the security of the German Empire.',
    synthesis_connectives: [
      'Although Prussia gained...',
      'From a purely tactical perspective...',
      'However, politically...',
      'As Gordon Craig argued...',
      'In the final analysis...',
    ],
    model_answer:
      'Although annexing Alsace-Lorraine provided Imperial Germany with a formidable tactical shield anchored on the fortress of Metz and rich iron deposits, it proved to be a catastrophic strategic blunder. As historian Gordon Craig identified, by prioritizing military geography over political reconciliation, Bismarck created an irreconcilable enemy. The burning French desire for revanche (revenge) ensured that France would seek allies at any cost, ultimately forging the 1894 Franco-Russian alliance that trapped Germany in the very two-front war Bismarck spent his career dreading.',
  },
  // Lesson 2
  {
    type: 'two_sided_argument',
    topic: 'Task 3: Imperial Rivalry: Core Cause of War or Secondary Safety Valve?',
    question:
      'To what extent did the Scramble for Africa and the Moroccan Crises make war in Europe more likely?',
    instruction:
      'Evaluate both historical perspectives on the impact of imperial competition on European stability:',
    advancement: {
      title: 'Interpretation 1: Catalyst for Polarization & Mistrust',
      points: [
        "Kaiser Wilhelm II's aggressive Tangier visit (1905) and the Agadir gunboat crisis (1911) shocked European chancelleries.",
        'Transformed the 1904 Anglo-French Entente Cordiale from a friendly colonial agreement into a firm, anti-German military partnership.',
        'Left Germany feeling bitterly humiliated and diplomatically encircled after being outvoted 11 to 2 at the Algeciras Conference.',
      ],
      starter: 'Imperial disputes significantly accelerated the drift toward world war because...',
    },
    limitations: {
      title: 'Interpretation 2: Imperial Safety Valve & Settled Disputes',
      points: [
        'Colonial disputes in Africa were repeatedly resolved without war through international conferences (Berlin 1884, Algeciras 1906).',
        'Britain and France had nearly gone to war over Fashoda in 1898, yet settled all their imperial quarrels peacefully in the Entente.',
        'When war finally erupted in 1914, the trigger was a Balkan national dispute in southeastern Europe, not an African colony.',
      ],
      starter:
        'On the other hand, revisionist historians argue that imperial rivalry was merely a symptom rather than the primary cause, because...',
    },
    synthesis_prompt:
      'Evaluate whether imperial competition caused the First World War or merely reflected existing European rivalries.',
    synthesis_connectives: [
      'While imperial clashes...',
      'For example, at Tangier and Agadir...',
      'However, colonial disputes were ultimately...',
      'Consequently...',
      'Overall, the main danger of imperialism was...',
    ],
    model_answer:
      "While imperial rivalry rarely led to direct military conflict in Africa itself—disputes were consistently resolved at conference tables—Kaiser Wilhelm II's theatrical interventions in Morocco profoundly destabilized Europe. By challenging France at Tangier with gunboat diplomacy, the Kaiser intended to break the Anglo-French Entente; instead, his bullying tactics had the opposite effect, cementing British-French military solidarity and leaving Germany dangerously isolated with only Austria-Hungary as a reliable ally.",
  },
  // Lesson 3
  {
    type: 'two_sided_argument',
    topic: 'Task 3: The Naval Race: Legitimate Defense vs Dangerous Provocation',
    question: 'Why did the building of Dreadnought battleships destroy Anglo-German relations?',
    instruction:
      'Contrast the competing strategic realities of the German Empire and the British Empire before 1914:',
    advancement: {
      title: 'The British Perspective (Existential Survival)',
      points: [
        'As an island nation with a global empire, Britain depended on maritime trade to feed its population, holding only 6 weeks of food reserves.',
        'The Royal Navy enforced the "Two-Power Standard", viewing any North Sea challenge within hours of London as a lethal existential threat.',
        'The British public was gripped by intense invasion hysteria in 1909, demanding: "We want eight, and we won\'t wait!"',
      ],
      starter:
        'From the British perspective, the German naval expansion was viewed as a mortal threat because...',
    },
    limitations: {
      title: "The German Perspective (Tirpitz's Risk Theory)",
      points: [
        "Imperial Germany had become Europe's leading industrial exporter and claimed a legitimate right to protect its overseas merchant trade.",
        'Admiral von Tirpitz argued that building a "Risk Fleet" would force Britain to respect Germany as an equal global partner.',
        "Kaiser Wilhelm II had a personal obsession with naval power, admiring his grandmother Queen Victoria's fleet while resenting British naval supremacy.",
      ],
      starter:
        "From Berlin's viewpoint, Germany was entitled to build a world-class fleet because...",
    },
    synthesis_prompt:
      'Explain why the naval construction race made diplomatic reconciliation between Britain and Germany impossible.',
    synthesis_connectives: [
      'While Germany claimed...',
      'In reality, for Great Britain...',
      'The launch of HMS Dreadnought in 1906...',
      'Consequently...',
      'Ultimately, the naval race...',
    ],
    model_answer:
      'The naval arms race destroyed Anglo-German relations because it transformed a political rivalry into an existential security crisis. For Germany, a battle fleet was a luxury designed to extract diplomatic respect; for Britain, naval supremacy was a matter of national life and death, as an island that could be starved into submission within weeks. Although Britain decisively won the construction race by 1912, the contest permanently poisoned public trust and pushed Great Britain into an unwritten alliance with France and Russia.',
  },
  // Lesson 4
  {
    type: 'two_sided_argument',
    topic: 'Task 3: The Alliance Web: Peacekeeper or Inflexible Doomsday Machine?',
    question:
      'Did the alliance system preserve the peace of Europe or make a continental war inevitable?',
    instruction:
      'Analyze both sides of the historiographical debate surrounding the pre-1914 alliance systems:',
    advancement: {
      title: 'Interpretation 1: The Alliances as a Stabilising Deterrent',
      points: [
        'The balance of power maintained major European peace for over forty years following the 1871 Franco-Prussian War.',
        'The Triple Alliance (1882) and Franco-Russian Alliance (1894) were strictly defensive pacts that discouraged unilateral aggression.',
        'Great powers repeatedly restrained their allies during crises (such as France restraining Russia during the 1908 Bosnian Crisis).',
      ],
      starter:
        'Defenders of the alliance system argue that it successfully maintained European stability because...',
    },
    limitations: {
      title: 'Interpretation 2: The Inflexible Doomsday Machine',
      points: [
        'Split Europe into two armed, deeply suspicious camps, making any regional diplomatic dispute a potential world war.',
        'German military panic over Russian industrial rearmament produced the Schlieffen Plan—an inflexible timetable requiring war on two fronts.',
        'Bound major empires to the reckless ambitions of unstable junior partners (such as Austria-Hungary and Serbia in the Balkans).',
      ],
      starter:
        'Conversely, critics argue that the rigid alliance treaties acted as an explosive tripwire because...',
    },
    synthesis_prompt:
      'Evaluate whether the alliance system prevented conflict or guaranteed that any crisis would become global.',
    synthesis_connectives: [
      'Although defensive alliances were intended to...',
      'In practice, they created a climate of...',
      'When combined with rigid railway mobilization...',
      'Consequently...',
      'Overall, the alliance system...',
    ],
    model_answer:
      'While the alliance system succeeded in maintaining peace for four decades through mutual deterrence, its fatal flaw was its total inflexibility. Once Europe was divided into the Triple Alliance and Triple Entente, any regional spark in the Balkans ceased to be a localized dispute. Combined with military mobilization plans like the German Schlieffen Plan—which treated mobilization as an act of war—the alliances acted as a giant set of falling dominoes, dragging six great powers into catastrophe within ten days.',
  },
  // Lesson 5
  {
    type: 'two_sided_argument',
    topic: 'Task 3: The Outbreak of War: Accidental Trigger vs Deep Structural Inevitability',
    question:
      'Was the outbreak of war in August 1914 caused by individual accidents in Sarajevo or deep structural forces?',
    instruction:
      'Compare the short-term catalyst of the Sarajevo assassination with the long-term structural pressures of M-A-I-N:',
    advancement: {
      title: 'Short-Term Human Agency & Chance (The Spark)',
      points: [
        "The assassination succeeded only due to an extraordinary string of blunders: a jammed gearbox and a wrong turn outside Schiller's Deli.",
        'Archduke Franz Ferdinand had been the leading voice of peace in Vienna, fiercely opposing war with Russia; his death removed that restraint.',
        'The reckless German "Blank Cheque" (5 July 1914) gave Austro-Hungarian hawks unconditional backing to crush Serbia.',
      ],
      starter:
        'Historians emphasizing chance and human error argue that the war was not inevitable because...',
    },
    limitations: {
      title: 'Long-Term Structural Pressures (The Powder Keg)',
      points: [
        'Decades of Militarism, Alliances, Imperialism, and Nationalism (M-A-I-N) had wound the European spring to breaking point.',
        'The German General Staff under Moltke believed that war with Russia was better fought in 1914 than after Russian railways were completed in 1917.',
        'Russian national prestige could not survive another humiliation in the Balkans after backing down during the 1908 Bosnian Crisis.',
      ],
      starter:
        'In contrast, structuralist historians argue that Sarajevo was merely the match that ignited a combustible continent because...',
    },
    synthesis_prompt:
      'Evaluate whether the First World War was caused by accidental blunders in July 1914 or inevitable structural forces.',
    synthesis_connectives: [
      'While the events in Sarajevo were bizarrely accidental...',
      'The underlying cause lay in...',
      'Without the pre-existing tensions of M-A-I-N...',
      'Consequently...',
      'In conclusion, the assassination...',
    ],
    model_answer:
      "While the physical assassination of Archduke Franz Ferdinand was a bizarre accident resulting from a stalled car and a lost driver, the catastrophe that followed was structural. Europe in 1914 was an armed camp waiting for a spark: military railway timetables dictated speed over diplomacy, the alliance system guaranteed contagion, and imperial pride made backing down unthinkable. The pistol shots outside Schiller's Delicatessen did not create the hatreds of Europe; they merely pulled the trigger on a gun that had been loaded for forty years.",
  },
];

const TASK_4_ENQUIRIES = [
  // Lesson 0
  {
    type: 'extended_writing',
    topic: 'Task 4: Analytical Synthesis & Historical Essay',
    question:
      'Explain how Otto von Bismarck used "blood and iron" and diplomatic calculation to forge the German Empire in 1871.',
    hints: [
      'Point: Bismarck understood that speeches and parliamentary votes would never unite Germany; only military force and shared enemies could overcome regional division.',
      'Evidence: Bypassed the Prussian parliament to collect taxes for Krupp artillery and railway mobilization, then engineered three decisive wars against Denmark, Austria, and France.',
      'Explanation: By provoking France through the edited Ems Telegram, Bismarck forced the independent southern German kingdoms to unite under Prussian arms.',
      'Link: Consequently, on 18 January 1871, the German Empire was proclaimed at Versailles, fundamentally shattering the European balance of power.',
    ],
    model_answer:
      'Otto von Bismarck forged the German Empire through a ruthless synthesis of diplomatic deception and military calculation. Recognizing that liberal speeches would never overcome the jealous independence of the German states, he declared in 1862 that the great questions of the day would be resolved by "blood and iron." He modernized the Prussian army with Krupp cast-steel cannons and dedicated military railways, then conducted three lightning wars against Denmark (1864), Austria (1866), and France (1870). His masterpiece of manipulation was the 1870 Ems Telegram: by subtly editing King Wilhelm\'s polite words, he baited France into declaring war, which automatically triggered mutual defense treaties with the southern German states. When the unified German Empire was proclaimed in the Hall of Mirrors at Versailles on 18 January 1871, Bismarck had realized his vision—not through popular revolution, but from above through Prussian steel and calculated realpolitik.',
  },
  // Lesson 1
  {
    type: 'extended_writing',
    topic: 'Task 4: Analytical Synthesis & Historical Essay',
    question:
      'Explain why the Franco-Prussian War created a lasting legacy of hatred between France and Germany.',
    hints: [
      'Point: The peace terms imposed upon France in 1871 were designed to humiliate and permanently cripple the French nation.',
      'Evidence: Under the Treaty of Frankfurt, Germany annexed Alsace and northern Lorraine, extracted a crushing 5-billion-franc indemnity, and proclaimed the Kaiserreich in the Palace of Versailles.',
      'Explanation: The loss of 1.5 million citizens and vital iron reserves created the cult of revanche (revenge), vividly captured in Albert Bettannier\'s painting "La Tache Noire".',
      'Link: To protect Germany from French vengeance, Bismarck constructed the Triple Alliance, ultimately locking Europe into the rigid two-front trap of 1914.',
    ],
    model_answer:
      'The Franco-Prussian War created a lasting legacy of hatred for three interconnected reasons. First, the Treaty of Frankfurt deeply humiliated France by annexing Alsace and northern Lorraine, demanding an astronomical indemnity of 5 billion gold francs, and stationing German occupation troops on French soil. Second, proclaiming the German Empire inside the French royal Palace of Versailles wounded French national honor at its most sacred core. Third, this trauma institutionalized the cult of revanche (revenge): generations of French schoolchildren were taught to gaze upon the black-bordered lost provinces, as immortalized in Albert Bettannier\'s "La Tache Noire", and prepare for a war of liberation. As historian Gordon Craig argued, annexing Alsace-Lorraine gave Germany a tactical border cushion at the cost of creating an incurable enemy, forcing Bismarck to weave the complex alliances that ultimately polarized Europe into two armed camps.',
  },
  // Lesson 2
  {
    type: 'extended_writing',
    topic: 'Task 4: Analytical Synthesis & Historical Essay',
    question:
      'Explain how Kaiser Wilhelm II’s policy of Weltpolitik and the Moroccan Crises drove Britain and France into a united diplomatic alliance against Germany.',
    hints: [
      'Point: Kaiser Wilhelm II abandoned Bismarck\'s cautious European diplomacy in favor of Weltpolitik, demanding a "Place in the Sun" for Germany.',
      'Evidence: In 1905, the Kaiser staged a provocative visit to Tangier, and in 1911 dispatched the gunboat SMS Panther to Agadir to demand colonial concessions.',
      'Explanation: Rather than dividing Britain and France, German bullying alarmed the British Admiralty, leading to the Algeciras Conference where Germany was outvoted 11 to 2.',
      'Link: Consequently, the Entente Cordiale evolved from a colonial agreement into a binding military partnership, leaving Germany encircled and bitter.',
    ],
    model_answer:
      'Kaiser Wilhelm II’s pursuit of Weltpolitik and his reckless interventions in Morocco decisively accelerated European polarization by transforming a fragile diplomatic agreement into an unshakeable anti-German alliance. When Wilhelm landed at Tangier in 1905 riding a skittish stallion to champion Moroccan independence, his strategic goal was to test and shatter the newly signed Anglo-French Entente Cordiale. The maneuver backfired catastrophically: at the 1906 Algeciras Conference, Britain backed France unreservedly, leaving Germany humiliated and isolated with only Austria-Hungary. When Germany reignited the conflict in 1911 by sending the gunboat SMS Panther to Agadir, British Chancellor David Lloyd George delivered the Mansion House speech, warning that Britain would fight rather than see France bullied. Far from securing Germany a "Place in the Sun", the Moroccan Crises proved to Britain that Germany was a rogue power, leading directly to joint Anglo-French naval planning and cementing the very encirclement Berlin feared.',
  },
  // Lesson 3
  {
    type: 'extended_writing',
    topic: 'Task 4: Analytical Synthesis & Historical Essay',
    question:
      'Explain why the Anglo-German naval arms race destroyed diplomatic trust between Great Britain and Germany between 1898 and 1914.',
    hints: [
      "Point: Britain's survival as an island empire depended on absolute naval dominance, enforced through the Two-Power Standard.",
      "Evidence: Admiral von Tirpitz's Navy Laws built a German battle fleet in the North Sea, prompting Britain's Admiral Fisher to launch the revolutionary HMS Dreadnought in 1906.",
      'Explanation: While Germany viewed a fleet as a luxury of world power, Britain held only six weeks of food reserves; a German battle fleet across the North Sea was seen as a dagger pointed at London.',
      'Link: The race provoked public hysteria in Britain ("We want eight and we won\'t wait!"), convincing British leaders that Germany intended to dominate Europe.',
    ],
    model_answer:
      'The Anglo-German naval arms race destroyed diplomatic trust because it touched the vital nerve of British national existence. For over a century, Great Britain relied on undisputed command of the sea, adhering to the "Two-Power Standard" to protect its global trade routes and feed its island population, which held only six weeks of grain reserves. When Admiral Alfred von Tirpitz began constructing a massive German battle fleet in the North Sea under the Navy Laws, British planners recognized that a high-seas fleet concentrated so close to English shores could only have one target: the Royal Navy. When the brilliant, eccentric Admiral "Jackie" Fisher launched the turbine-powered, all-big-gun HMS Dreadnought in 1906, he rendered all existing battleships obsolete and triggered an intense construction frenzy. In Britain, fear of invasion generated public panic ("We want eight and we won\'t wait!"). Although Britain won the race by 1912 with 29 dreadnoughts to Germany\'s 17, the contest caused irreparable psychological damage, permanently aligning Britain with France and Russia.',
  },
  // Lesson 4
  {
    type: 'extended_writing',
    topic: 'Task 4: Analytical Synthesis & Historical Essay',
    question:
      'Explain how the division of Europe into the Triple Alliance and Triple Entente transformed minor regional disputes into a continental crisis.',
    hints: [
      'Point: The secret treaties and military coalitions divided Europe into two rigid, armed blocs with zero diplomatic flexibility.',
      'Evidence: Germany, Austria-Hungary, and Italy formed the Triple Alliance (1882), while France and Russia (1894) and Britain (1904/1907) formed the Triple Entente.',
      'Explanation: The alliances bound great powers to the recklessness of minor allies; when combined with military mobilization timetables (like the Schlieffen Plan), war could not be delayed.',
      'Link: As a result, when Austria-Hungary declared war on Serbia in July 1914, the alliance commitments acted as falling dominoes, dragging all six great powers into conflict within ten days.',
    ],
    model_answer:
      'The division of Europe into the Triple Alliance and Triple Entente transformed minor regional disputes into a continental crisis by removing diplomatic flexibility and replacing it with an automatic military tripwire. Following Bismarck’s dismissal in 1890, Kaiser Wilhelm II allowed the Reinsurance Treaty with Russia to lapse, allowing Republican France to forge a military alliance with Tsarist Russia in 1894. When Britain joined with France (1904) and Russia (1907) to form the Triple Entente, Europe became polarized into two rival coalitions. Crucially, these alliances bound major empires to the unpredictable actions of volatile client states in the Balkans. Germany lived in terrified anticipation of Russian industrialization and adopted the rigid Schlieffen Plan, which required immediate war against France the moment Russia mobilized. Consequently, when the July Crisis erupted in Sarajevo, diplomacy was subordinated to railway timetables: no power dared delay mobilization lest their ally be crushed, ensuring that a localized Balkan quarrel detonated an inevitable world war.',
  },
  // Lesson 5
  {
    type: 'extended_writing',
    topic: 'Task 4: Analytical Synthesis & Historical Essay',
    question:
      'Explain why the assassination of Archduke Franz Ferdinand in Sarajevo led directly to the outbreak of the First World War in August 1914.',
    hints: [
      'Point: The assassination provided the Austro-Hungarian military with the long-awaited pretext to crush Serbian nationalism once and for all.',
      'Evidence: On 28 June 1914, Gavrilo Princip and the Black Hand shot Franz Ferdinand; Germany issued the unconditional "Blank Cheque" on 5 July, and Austria presented an impossible ultimatum on 23 July.',
      "Explanation: Because Russia refused to allow Serbia to be destroyed again after the 1908 Bosnian humiliation, Tsar Nicholas II mobilized, triggering Germany's Schlieffen Plan.",
      'Link: Within days, the invasion of neutral Belgium brought Great Britain into the conflict, transforming a royal murder into a global catastrophe.',
    ],
    model_answer:
      'The assassination of Archduke Franz Ferdinand led directly to the outbreak of the First World War because it was seized upon by European leaders as an opportunity to resolve long-standing geopolitical conflicts by force. When 19-year-old Bosnian Serb Gavrilo Princip shot the Austrian heir in Sarajevo on 28 June 1914, hawks in Vienna such as General Conrad von Hötzendorf saw a golden opportunity to eliminate Serbia as a regional threat. Crucially, Kaiser Wilhelm II issued the fateful "Blank Cheque" on 5 July, guaranteeing unconditional German military support. Emboldened by Berlin, Austria-Hungary delivered an intentionally unacceptable ten-point ultimatum to Belgrade, declaring war on 28 July. Having endured humiliating diplomatic retreats in 1908 and 1912, Russia refused to abandon its fellow Slavic ally and ordered general mobilization. This movement activated the German Schlieffen Plan, which required Germany to knock out France within six weeks before turning to face Russia. When German troops violated Belgian neutrality to bypass French fortresses, Great Britain entered the war on 4 August. Thus, a botched political murder in Bosnia ignited the structural powder keg of alliances, militarism, and imperial fear, plunging humanity into four years of industrial slaughter.',
  },
];

function updateUnitData(targetPath) {
  let content = fs.readFileSync(targetPath, 'utf8');
  let exportStatement = '';
  const exportMatch = content.match(/export\s+default\s+[^;]+;?/);
  if (exportMatch) {
    exportStatement = exportMatch[0];
    content = content.replace(exportMatch[0], '');
  }

  const d = new Function(content + '\nreturn great_war;')();

  d.lessons.forEach((l, idx) => {
    // 1. Inject Dramatic Prologue
    l.prologue = PROLOGUES[idx];

    // 2. Clean out all inline tasks from narrative blocks
    (l.narrative_blocks || []).forEach((b) => {
      b.tasks = [];
    });

    // 3. Populate lesson.tasks with Task 3 (Bridge/Planning) and Task 4 (Enquiry Essay)
    l.tasks = [TASK_3_BRIDGES[idx], TASK_4_ENQUIRIES[idx]];
  });

  const updatedCode =
    'const great_war = ' + JSON.stringify(d, null, 2) + ';\n\n' + exportStatement + '\n';
  fs.writeFileSync(targetPath, updatedCode, 'utf8');
  console.log('Successfully updated:', targetPath);
}

// Update both v2 and live
updateUnitData(filePathV2);
updateUnitData(filePathLive);
console.log('Great War update complete!');

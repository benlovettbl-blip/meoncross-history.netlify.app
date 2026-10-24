const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'great_war', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'great_war.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const GREAT_WAR_PEDAGOGY = {
  // LESSON 1: German Unification, Franco-Prussian War & Bismarck (1871–1890)
  lesson_1: [
    {
      match: /German Empire in Central Europe/i,
      hinge_question:
        'How did the sudden emergence of a unified German Empire fundamentally shatter the European balance of power?',
      discussion_ideas: [
        "Demographic and Industrial Superpower in the Continental Core: Prior to 1871, Central Europe consisted of dozens of fragmented, weak German principalities; unification under Prussian leadership created a monolithic nation of 41 million people possessing Europe's richest coal and iron basins (the Ruhr and Silesia), rapidly surpassing Britain and France in steel production and chemical manufacturing.",
        'Destruction of the 1815 Congress of Vienna Equilibrium: For two centuries, French and British foreign policy had relied on German fragmentation to maintain continental stability; the sudden appearance of a unified military colossus with a peerless Prussian standing army left France permanently outmatched and forced neighboring great powers to scramble into defensive alliances to prevent German hegemony.',
      ],
    },
    {
      match: /Anton von Werner|Proclamation of the German Empire/i,
      hinge_question:
        'Why did Anton von Werner place Chancellor Otto von Bismarck in pure white at the visual centre of the painting, rather than Kaiser Wilhelm I on the raised dais?',
      discussion_ideas: [
        "Anton von Werner’s visual composition in the Hall of Mirrors at Versailles is a deliberate tribute to the political architect who forged the Reich. Although Prussian King Wilhelm I is being acclaimed Kaiser upon the elevated dais, Chancellor Otto von Bismarck—wearing a striking white cuirassier uniform that contrasts against the dark blue uniforms of the German princes and generals—forms the radiant focal point at the exact center of the canvas. This compositional choice recognizes the historical reality that German unification was not achieved by the hesitant monarch or the squabbling German princes, but through Bismarck's cunning diplomatic mastery, political ruthlessness, and calculated wars ('blood and iron'), establishing the Chancellor as the supreme guiding force of the new German Empire.",
      ],
    },
    {
      match: /Annexation of Alsace-Lorraine/i,
      hinge_question:
        'Why did the annexation of Alsace-Lorraine prove far more damaging to long-term European peace than the 5 billion gold franc indemnity?',
      discussion_ideas: [
        'Permanent Poisoning of Franco-German Diplomacy: While the massive 5-billion-franc war indemnity was paid off by the French Republic ahead of schedule by 1873, the forced territorial amputation of Alsace and Lorraine became an unhealable wound in French national honor, creating the burning ideology of Revanche (revenge) that made any permanent diplomatic reconciliation between Paris and Berlin impossible for forty-four years.',
        'Strategic and Industrial Fortification Driving Entente Alliances: Annexing the provinces provided Germany with advanced textile mills, iron ore reserves, and formidable Rhine border fortresses (such as Metz); however, knowing France would never accept the loss permanently, Bismarck was forced into a permanent diplomatic tightrope of isolating France, which ultimately failed when France allied with Tsarist Russia in 1894, encircling Germany.',
      ],
    },
    {
      match: /La Tache Noire|Bettannier/i,
      hinge_question:
        'How does Bettannier use the classroom setting to prove that the Franco-Prussian War of 1871 had not truly ended?',
      discussion_ideas: [
        "Bettannier’s painting 'La Tache Noire' powerfully demonstrates that the Franco-Prussian War was actively perpetuated through state indoctrination of the next generation. In a Third Republic classroom, a solemn schoolmaster in black directs a young boy's attention to the map of France, where the lost provinces of Alsace-Lorraine are shaded in deep black mourning. The surrounding boys are dressed in military cadet uniforms, rifles stand in the corner, and a battalion medal gleams on the boy’s chest. Bettannier proves that French defeat in 1871 was not accepted as settled history, but transformed into a sacred national duty: an entire generation of French schoolboys was systematically educated to view the recovery of the lost provinces as a moral crusade, ensuring that when the crisis arrived in 1914, millions marched willingly to war to avenge 1871.",
      ],
    },
  ],

  // LESSON 2: Imperial Rivalry, the Scramble for Africa & the Moroccan Crises (1884–1911)
  lesson_2: [
    {
      match: /Partition of Africa/i,
      hinge_question:
        'How did European imperial competition in Africa reflect and intensify rivalries on the European continent?',
      discussion_ideas: [
        "Export of Continental Power Struggles to Global Arenas: The Scramble for Africa transformed local European border rivalries into a global race for prestige, markets, and naval coaling stations; Britain's dream of a 'Cape to Cairo' railway clashed directly with French ambitions across the Sahel (leading to the 1898 Fashoda standoff) and challenged Kaiser Wilhelm II's aggressive demand for Germany's 'Place in the Sun' (Weltpolitik).",
        'Catalyst for Continental Anti-German Alliances: German attempts to bully France in colonial disputes backfired disastrously: instead of driving a wedge between Britain and France, German naval and colonial aggression pushed Britain to resolve colonial differences with France (the 1904 Entente Cordiale) and Russia (the 1907 Anglo-Russian Convention), solidifying the very encirclement Germany feared.',
      ],
    },
    {
      match: /SMS Panther|Agadir/i,
      hinge_question:
        'Why did the deployment of a single small gunboat to an Atlantic port bring Europe to the threshold of a general war?',
      discussion_ideas: [
        "The dispatch of the small German gunboat SMS Panther to the Moroccan port of Agadir on 1 July 1911 triggered the Second Moroccan Crisis because it directly threatened British vital naval security. While Berlin claimed it was protecting German mining interests against French colonial expansion, British Chancellor David Lloyd George delivered his famous Mansion House speech warning that Britain would fight alongside France rather than allow Germany to bully European powers or establish a naval base on the Atlantic sea lanes to India. The crisis exposed Kaiser Wilhelm II's reckless 'gunboat diplomacy', humiliated German public opinion when Berlin was forced to back down in exchange for worthless Congolese swamp, and solidified Anglo-French joint naval planning, convincing the German military high command that a future European war was inevitable and had to be fought sooner rather than later.",
      ],
    },
  ],

  // LESSON 3: The Anglo-German Naval Arms Race & HMS Dreadnought (1898–1914)
  lesson_3: [
    {
      match: /HMS Dreadnought/i,
      hinge_question:
        "Did the launch of HMS Dreadnought protect British imperial security, or did it dangerously erase Britain's established naval advantage?",
      discussion_ideas: [
        "A Technological Triumph That Deterred Invasion: Engineered by First Sea Lord Sir John Fisher, HMS Dreadnought was a revolutionary marvel: with ten 12-inch guns, heavy Krupp armor, and steam-turbine engines capable of 21 knots, she was so fast and lethal she rendered all pre-dreadnought battleships obsolete; by rapidly funding a massive building program under the public slogan 'We want eight and we won't wait', Britain outbuilt Germany (29 dreadnoughts to 17 by 1914), maintaining Royal Navy command of the North Sea.",
        'A Dangerous Tactical Equalizer for Germany: By making every existing warship obsolete at a single stroke, Britain effectively wiped out its own overwhelming numerical superiority (over 40 pre-dreadnoughts); this reset the naval arms race back to zero, allowing Admiral Alfred von Tirpitz and German shipyards to compete on equal terms and widening German paranoia and hostility toward Britain.',
      ],
    },
  ],

  // LESSON 4: The Alliance Systems & the Balkan Powder Keg (1879–1913)
  lesson_4: [
    {
      match: /Triple Alliance & Triple Entente|Armed Camps/i,
      hinge_question:
        'Why did the geographical encirclement of Germany by the Triple Entente make German military planners panic and favor a pre-emptive strike?',
      discussion_ideas: [
        "The Nightmare of a Two-Front War: Situated in the center of Europe, Germany faced a two-front war against the industrial might of France in the west and the massive demographic 'Russian Steamroller' in the east; realizing that Russia was rapidly modernizing its railways with French loans (scheduled for completion by 1917), Chief of Staff Helmuth von Moltke believed Germany’s only window for military victory was narrowing rapidly, creating a panic-driven desire to strike first.",
        'Entangling Mutual Defence Commitments: The division of Europe into two armed camps transformed local disputes into systemic continental crises: because no Great Power could afford to let its only allies be crushed without suffering fatal strategic isolation, an attack on Serbia or Austria-Hungary automatically triggered reciprocal mobilization pledges that dragged all six powers into war.',
      ],
    },
    {
      match: /Encirclement of Germany/i,
      hinge_question:
        'How did Britain’s decision to abandon "Splendid Isolation" transform regional European rivalries into a rigid continental deadlock?',
      discussion_ideas: [
        "Throughout the nineteenth century, Great Britain practiced 'Splendid Isolation', refusing permanent continental alliances and acting as an independent balance of power. Germany's provocative decision to build a high-seas battle fleet to challenge the Royal Navy and aggressively meddle in colonial crises forced Britain to abandon this policy: signing the 1902 Anglo-Japanese Alliance, the 1904 Entente Cordiale with France, and the 1907 Anglo-Russian Convention. By aligning Britain with Paris and St. Petersburg, this diplomatic revolution transformed flexible regional diplomacy into a rigid, polarized continental deadlock: Germany now felt desperately encircled by hostile powers, convinced that the Triple Entente was tightening an iron ring around the Fatherland that could only be broken by sword.",
      ],
    },
    {
      match: /Balkan Powder Keg/i,
      hinge_question:
        'Why did Austria-Hungary view the expansion of Serbia following the Balkan Wars as an existential threat to its own imperial survival?',
      discussion_ideas: [
        "The Threat of Pan-Slavist Nationalism to a Multi-Ethnic Empire: Austria-Hungary was an empire composed of eleven different ethnic nationalities; Serbia’s dramatic territorial doubling in the 1912–1913 Balkan Wars and its open ambition to liberate all South Slavs (Yugoslavs) under a 'Greater Serbia' threatened to incite millions of Bosnians, Croats, and Slovenes into secession, tearing the Habsburg Empire apart from within.",
        "Tsarist Russia's Backing as Protector of the Slavs: Serbia was directly supported by Tsarist Russia, which sought control over the Turkish Straits and Aegean trade routes; Austrian hardliners (like General Conrad von Hötzendorf) believed that unless Serbia was crushed through a pre-emptive military strike, Habsburg prestige and great-power status would be permanently erased in the Balkans.",
      ],
    },
    {
      match: /Boiling Point|Punch.*1912/i,
      hinge_question:
        'Why did the cartoonist depict the Great Power monarchs struggling to keep the lid on the pot, rather than creating the fire underneath?',
      discussion_ideas: [
        "In 'The Boiling Point' (Punch, October 1912), the cartoonist brilliantly captures the helplessness of European diplomacy during the Balkan Wars. The leaders of the Great Powers—the Kaiser, Tsar, King of Britain, and Emperor of Austria—are depicted desperately sitting atop a bubbling cooking pot marked 'Balkan Troubles', struggling to hold down the lid while boiling steam threatens to blow them into the air. The cartoon illustrates that the primary fire beneath the pot was not lit by the monarchs, but generated by fierce indigenous ethnic hatreds, Balkan nationalism, and the violent collapse of the Ottoman Empire ('the sick man of Europe'). The Great Powers were terrified that the uncontrollable flames of local Balkan nationalism would boil over and drag their mutual treaty obligations into an catastrophic, unintended general European war.",
      ],
    },
    {
      match: /Schlieffen Plan/i,
      hinge_question:
        'How did rigid military mobilization timetables like the Schlieffen Plan strip European diplomats of the power to stop war in July 1914?',
      discussion_ideas: [
        'The Schlieffen Plan—designed by Field Marshal Alfred von Schlieffen—was based on absolute mathematical rigidity: to avoid a protracted two-front war, Germany had exactly six weeks to knock out France by sweeping through neutral Belgium before the slow Russian army could fully mobilize in the east. Crucially, the plan did not separate mobilization from invasion: once Russia declared mobilization to defend Serbia on 30 July 1914, German railway timetables dictated that imperial troops had to instantly cross into Belgium and Luxembourg to seize railway junctions before the French could react. When Kaiser Wilhelm II desperately asked if Germany could mobilize against Russia alone and hold back from attacking France, General von Moltke bluntly replied that the imperial deployment of millions of men on pre-set rail schedules could not be altered without throwing the entire army into fatal chaos, proving that rigid military timetables hijacked civilian diplomacy and made general war unstoppable.',
      ],
    },
  ],

  // LESSON 5: The July Crisis: Sarajevo to the Outbreak of War (June–August 1914)
  lesson_5: [
    {
      match: /Latin Bridge|Sarajevo/i,
      hinge_question:
        'Was the assassination of Archduke Franz Ferdinand the fundamental cause of the First World War, or merely the trigger that exposed existing systemic rivalries?',
      discussion_ideas: [
        "The Coincidental Spark That Triggered Systemic Powder Kegs: The assassination of Archduke Franz Ferdinand by nineteen-year-old Gavrilo Princip was a pure tactical coincidence—the royal open-top car took a wrong turn and stalled right in front of Schiller's delicatessen where Princip was standing; without the prior structural powder kegs of militarism, rigid alliance treaties, imperial rivalry, and press jingoism built up over four decades, a local terrorist assassination in the Balkans would have remained a contained regional diplomatic incident.",
        "The Deliberate Exploitation by Austrian and German Warmongers: The assassination was consciously seized upon by Austro-Hungarian and German war hawks as the long-awaited moral justification to eliminate the Serbian threat: Austria issued a deliberately unacceptable ten-point ultimatum, and Germany issued the unconditional 'Blank Cheque' (5 July 1914) guaranteeing full military backing, calculating that 1914 was the optimal moment to wage a preventive European war.",
      ],
    },
  ],
};

async function main() {
  console.log('🚀 Starting Causes of the Great War Enrichment...');

  // Load from data.js
  const fileUrl = pathToFileURL(dataJsPath).href;
  const dataModule = await import(fileUrl);
  const unitData = dataModule.default || dataModule.unitData;

  let totalSourcesUpdated = 0;
  let totalNarrativeUpdated = 0;

  unitData.lessons.forEach((l) => {
    const rules = GREAT_WAR_PEDAGOGY[l.id];
    if (!rules) return;

    console.log(`\nWiring ${l.id} (${l.title})...`);

    function matchRule(s) {
      const textToMatch = [s.title, s.id, s.caption, s.source_context].filter(Boolean).join(' ');
      return rules.find((r) => r.match.test(textToMatch));
    }

    // 1. Update l.sources if present
    (l.sources || []).forEach((s, idx) => {
      const rule = matchRule(s);
      if (rule) {
        s.hinge_question = rule.hinge_question;
        s.discussion_ideas = rule.discussion_ideas;
        totalSourcesUpdated++;
        console.log(
          `  ✅ [l.sources ${idx}] "${s.title}" -> ${rule.discussion_ideas.length} idea(s)`,
        );
      }
    });

    // 2. Update narrative_blocks
    (l.narrative_blocks || []).forEach((b, idx) => {
      if (b.source) {
        const rule = matchRule(b.source);
        if (rule) {
          b.source.hinge_question = rule.hinge_question;
          b.source.discussion_ideas = rule.discussion_ideas;
          totalNarrativeUpdated++;
          console.log(
            `  ✅ [narrative ${idx}] "${b.source.title}" -> ${rule.discussion_ideas.length} idea(s)`,
          );
        } else {
          console.warn(`  ⚠️ [narrative ${idx}] No match for: "${b.source.title}"`);
        }
      }
    });
  });

  console.log(
    `\n🎉 Total sources updated across Causes of the Great War: ${totalSourcesUpdated} in l.sources, ${totalNarrativeUpdated} in narrative_blocks`,
  );

  // 1. Write back to units/great_war/data.js
  const serialized = JSON.stringify(unitData, null, 2);
  const jsContent = `const unitData = ${serialized};\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/great_war/data.js');

  // 2. Write to public/data/great_war.json
  const pubData = { id: 'great_war', data: unitData };
  fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
  console.log('✅ Successfully updated public/data/great_war.json');

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.great_war) {
      db.great_war.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated great_war in public/database.json');
    }
  }

  console.log('\n🏁 Completed Causes of the Great War enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});

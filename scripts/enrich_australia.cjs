const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'australia', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'australia.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const AUSTRALIA_PEDAGOGY = {
  // LESSON 1: Claiming Australia: Captain Cook, Tupaia & The Myth of Terra Nullius (1768–1770)
  lesson_1: [
    {
      match: /Portrait of Captain James Cook|Nathaniel Dance/i,
      hinge_question:
        'Does Dance present Cook as a detached man of science, or does this portrait obscure his role as an agent of British imperial conquest?',
      discussion_ideas: [
        'The Enlightenment Icon of Scientific Reason and Exploration: Nathaniel Dance depicts Cook seated calmly in a naval captain’s uniform, pointing with quiet authority to a nautical chart of his Pacific discoveries, surrounded by books and navigational instruments; the portrait emphasizes Cook’s reputation as an Enlightenment navigator, astronomer, and surveyor whose voyages were ostensibly dedicated to observing the Transit of Venus and charting Oceania for human knowledge.',
        "An Agent of British Imperial Annexation and Dispossession: Dance’s refined depiction obscures the political and military reality: Cook carried secret Admiralty instructions commanding him to find the 'Great Southern Continent' and annex territories for the British Crown. By raising the Union Jack at Possession Island in August 1770 and declaring the entire eastern continent British territory under the fiction of terra nullius—ignoring clear First Nations presence and his orders to gain the consent of the natives—Cook acted as the imperial vanguard of British colonial land-theft.",
      ],
    },
    {
      match: /Chart of Botany Bay|Joseph Banks/i,
      hinge_question:
        'Why did Cook chart natural anchorages with meticulous care while completely ignoring the existence of Indigenous boundaries and sovereign populations?',
      discussion_ideas: [
        "Cook and Banks’ cartography reflects European imperial legal doctrine: land was only recognized as possessed if it was visibly transformed by European-style permanent settlements, fenced private property, and agricultural cultivation. Because Indigenous First Nations custodians practiced sophisticated, sustainable land management (such as fire-stick farming and seasonal migration across songlines) without erecting stone walls or plowing fields, Cook categorized the continent as terra nullius ('nobody's land'). By meticulously sounding depths, charting fresh water creeks, and naming botanical headlands while omitting 65,000 years of Gweagal and Dharawal clan territories, the map served not merely as a navigational aid, but as a colonial erasure tool that prepared the coast for military annexation and convict settlement without treaty or compensation.",
      ],
    },
  ],

  // LESSON 2: The First Fleet & The Convict Penal Colony (1783–1792)
  lesson_2: [
    {
      match: /Prison Hulks|Portsmouth Harbour/i,
      hinge_question:
        'How does Garneray’s depiction of the hulks explain why the British government felt compelled to establish an overseas penal colony in Australia?',
      discussion_ideas: [
        "Catastrophic Overcrowding and Epidemic Filth in English Ports: Following American independence in 1783, Britain could no longer transport convicts to the American colonies; obsolete wooden warships stripped of masts ('hulks') moored at Portsmouth, Plymouth, and the Thames were packed with thousands of petty convicts sentenced under the brutal 'Bloody Code'. Floating in squalor, lice, and typhus ('gaol fever'), the hulks were overflowing and feared by the British ruling class as explosive breeding grounds for disease and violent prisoner mutiny.",
        "Radical Imperial Relocation to the Ends of the Earth: Transporting convicts 15,000 miles to Botany Bay under Captain Arthur Phillip was viewed by William Pitt’s government as a permanent, terrifying deterrent: ridding British streets of the 'criminal class' forever, preventing domestic revolution, and simultaneously securing a strategic British naval and commercial outpost in the South Pacific to counter French imperial expansion.",
      ],
    },
    {
      match: /Sydney Cove|Francis Fowkes/i,
      hinge_question:
        'What does Source B reveal about the immediate logistical and environmental vulnerabilities of the First Fleet encampment?',
      discussion_ideas: [
        "Francis Fowkes' 1788 sketch illustrates the extreme fragility of the early British penal settlement at Sydney Cove. Surrounded by dense, alien eucalyptus forest on infertile, rocky sandstone soil, over 1,400 convicts and marines were housed in fragile canvas tents and crude wattle-and-daub huts, dependent entirely on the tiny freshwater stream (the Tank Stream). The sketch highlights their total logistical isolation: English farming tools broke on the hard Australian timber, European seed corn rotted in the ground, and livestock died, bringing the entire colony to the brink of starvation. Without regular supply ships from England, Governor Phillip was forced to place the entire colony on starvation rations of salt pork and flour, proving that British industrial might was initially completely powerless against the unfamiliar Australian environment.",
      ],
    },
  ],

  // LESSON 3: Frontier Warfare: Smallpox, Bennelong & Pemulwuy’s Resistance (1788–1802)
  lesson_3: [
    {
      match: /Bennelong|Letter to Mr Phillips/i,
      hinge_question:
        'Does Bennelong’s European dress reflect genuine cultural assimilation, or was he a pragmatic diplomat attempting to negotiate with a vastly more powerful military occupier?',
      discussion_ideas: [
        "Pragmatic Indigenous Diplomacy and Intermediary Leadership: Bennelong—a senior Wangal clan man captured on Governor Phillip’s orders—voluntarily adopted European dress and learned English to serve as an ambassador for his people; he traveled to London and met King George III in 1793, strategically using his unique royal connections to negotiate between British authorities and Eora clans, seeking to protect his people's survival through cross-cultural diplomacy.",
        "The Tragedy of Cultural Dislocation and Rejection: Bennelong's European attire trapped him in an agonizing cultural limbo: while British colonists treated him as an exotic novelty to be discarded once his diplomatic usefulness ended, many of his own Eora kin viewed his European clothes, alcohol consumption, and adoption of British customs with deep suspicion, leaving him ostracized and heartbroken upon his return to Sydney.",
      ],
    },
    {
      match: /Pemulwuy|Bidjigal Warrior/i,
      hinge_question:
        "Why did British colonial accounts label Pemulwuy a 'bloodthirsty terrorist', while modern historians regard him as an iconic patriot and military commander?",
      discussion_ideas: [
        "Colonial Demonization to Justify Annihilation: British colonial gazettes branded Pemulwuy—a clever Bidjigal warrior who led a twelve-year guerrilla war against British settlement along the Hawkesbury River—a savage murderer and outlaw; framing his attacks on livestock, crops, and armed expeditions as irrational criminal violence justified Governor King's 1801 proclamation placing a price on his head and ordering soldiers to shoot him on sight.",
        "First Nations Patriot and Resistance Commander: Modern historians recognize Pemulwuy as Australia's first national military hero: he fought a sophisticated, disciplined guerrilla campaign to defend sacred ancestral hunting grounds from environmental destruction and agricultural fencing, uniting disparate Eora, Dharug, and Tharawal clans and surviving seven bullet wounds before being killed in an ambush in 1802, his severed head tragically sent to Sir Joseph Banks in London.",
      ],
    },
  ],

  // LESSON 4: The Frontier Wars, Pastoral Expansion & The Black War (1803–1840)
  lesson_4: [
    {
      match: /Proclamation Board|George Arthur/i,
      hinge_question:
        'How did the pictorial promise of equal justice on the proclamation board contradict the violent reality of Governor Arthur’s martial law and the Black Line?',
      discussion_ideas: [
        "Governor Arthur's proclamation boards—wooden panels painted with comic-strip sequences showing British redcoats and Aboriginal people embracing, followed by equal hangings: a white settler hanged for killing a Black person and a Black person hanged for killing a white settler—were grotesque colonial propaganda. In reality, during the Tasmanian 'Black War' (1824–1831), Arthur declared martial law, offering cash bounties for captured Indigenous people and deploying the 'Black Line'—a human military dragnet of 2,200 armed soldiers, police, and convicts that swept across the entire island to trap and expel the surviving Palawa population. Not a single white settler or soldier was ever legally prosecuted or hanged in Van Diemen's Land for killing an Aboriginal person, exposing the proclamation's promise of equal justice as a cynical falsehood masking near-total demographic genocide.",
      ],
    },
    {
      match: /Myall Creek Massacre|Edward Day/i,
      hinge_question:
        'Why was the conviction of seven white stockmen in 1838 an unprecedented exception to the normal pattern of colonial frontier justice?',
      discussion_ideas: [
        'The Exceptional Triumph of Equal Rule of Law: On 10 June 1838, a gang of eleven armed white stockmen tied together and butchered twenty-eight defenseless Wirrayaraay women, children, and elderly people at Myall Creek; thanks to the courageous whistleblowing of station manager William Hobbs and the determined prosecution by Attorney-General John Plunkett, seven white perpetrators were convicted and hanged, marking the only time in Australian history that white men were legally executed for murdering First Nations people on the frontier.',
        "Fierce Settler Backlash and Underground Frontier Murder: The executions provoked fury across the colonial squatter aristocracy and press, who formed the 'Black Association' to fund the killers' legal defense; rather than stopping frontier massacres, the verdict merely taught stockmen never to leave witnesses or report killings, driving frontier genocide underground through the use of arsenic-laced flour, waterhole poisonings, and secretive nighttime police sweeps.",
      ],
    },
  ],

  // LESSON 5: The Gold Rush, Eureka Stockade & The Legacy of Colonisation (1851–1901)
  lesson_5: [
    {
      match: /Washing for Gold|S\.T\. Gill/i,
      hinge_question:
        'How does Gill’s depiction of egalitarian labour on the goldfield explain why diggers fiercely resisted authoritarian police rule and taxation?',
      discussion_ideas: [
        'The Radical Democracy of the Goldfield Diggings: S.T. Gill captures the rough-hewn egalitarianism of the early alluvial goldfields: doctors, former convicts, Chartists, sailors, and farmworkers worked side-by-side in red flannel shirts and moleskin trousers; fortune depended solely on luck and manual physical sweat rather than aristocratic birth or inherited wealth, fostering a fierce spirit of independence and democratic equality.',
        "Outrage at Authoritarian Colonial Governance: Having escaped rigid British class oppression, free diggers violently resented the authoritarian colonial government, which treated them as quasi-convicts: corrupt mounted police conducted brutal, armed 'digger hunts' twice a week, chaining men to trees if they failed to produce their extortionate 30-shilling monthly licence on demand, fueling the revolutionary anger that exploded at Eureka.",
      ],
    },
    {
      match: /Southern Cross at Eureka|Charles Doudiet/i,
      hinge_question:
        'Does Doudiet depict the diggers as dangerous armed insurrectionists, or as patriotic citizens defending legitimate civil liberties?',
      discussion_ideas: [
        "Charles Doudiet's contemporary sketch of 1 December 1854 presents the Eureka rebels not as dangerous criminals, but as a dignified, solemn assembly of citizens exercising their fundamental British rights against despotic misrule. Under the iconic blue Southern Cross flag (designed by Canadian digger Henry Ross to symbolize Australian liberty), hundreds of diggers stand bareheaded with right hands raised, swearing the sacred oath: 'We swear by the Southern Cross to stand truly by each other, and fight to defend our rights and liberties.' Doudiet captures the moral seriousness of the movement: inspired by Chartist principles, leader Peter Lalor and the Ballarat Reform League were not seeking to overthrow the British Crown, but demanding an end to taxation without representation, the abolition of the corrupt licence system, universal male suffrage, and democratic equality, establishing Eureka as the foundational birthplace of Australian democracy.",
      ],
    },
  ],
};

async function main() {
  console.log('🚀 Starting Australia Enrichment...');

  // Load from data.js
  const fileUrl = pathToFileURL(dataJsPath).href;
  const dataModule = await import(fileUrl);
  const unitData = dataModule.default || dataModule.unitData;

  let totalSourcesUpdated = 0;
  let totalNarrativeUpdated = 0;

  unitData.lessons.forEach((l) => {
    const rules = AUSTRALIA_PEDAGOGY[l.id];
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
      } else {
        console.warn(`  ⚠️ [l.sources ${idx}] No match for: "${s.title}"`);
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
    `\n🎉 Total sources updated across Australia: ${totalSourcesUpdated} in l.sources, ${totalNarrativeUpdated} in narrative_blocks`,
  );

  // 1. Write back to units/australia/data.js
  const serialized = JSON.stringify(unitData, null, 2);
  const jsContent = `const unitData = ${serialized};\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/australia/data.js');

  // 2. Write to public/data/australia.json
  const pubData = { id: 'australia', data: unitData };
  fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
  console.log('✅ Successfully updated public/data/australia.json');

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.australia) {
      db.australia.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated australia in public/database.json');
    }
  }

  console.log('\n🏁 Completed Australia enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});

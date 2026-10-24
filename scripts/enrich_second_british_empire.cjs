const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'second_british_empire', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'second_british_empire.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const SECOND_EMPIRE_PEDAGOGY = {
  // LESSON 1: How was the British Empire built and sustained?
  lesson_1: [
    {
      match: /Walter Crane|Imperial Federation Map/i,
      hinge_question:
        'Why did Victorian cartographers place Britain at the physical center of world maps, and how did this shape British imperial identity?',
      discussion_ideas: [
        "Visual Projection of Imperial Centrality and Global Dominance: Placing Greenwich at the prime meridian and centring the British Isles on world maps visually framed the British Empire as the axis around which the entire globe turned, surrounded by territories shaded in patriotic imperial pink ('the empire on which the sun never sets'), inculcating generations of British schoolchildren with a sense of innate racial and cultural supremacy.",
        'An Allegory of Maritime Commerce and Civilizing Duty: The elaborate borders designed by Walter Crane feature Britannia ruling the waves alongside allegorical figures of indigenous peoples, Australian settlers, and Indian subjects bearing exotic raw commodities, framing the empire not as violent conquest, but as a harmonious, mutually beneficial global federation of commerce and Christian civilization.',
      ],
    },
    {
      match: /HMS Warrior/i,
      hinge_question:
        'How did industrial iron and steam technology convert the Royal Navy from an armed sailing fleet into an invincible instrument of global coercion?',
      discussion_ideas: [
        "Launched in 1860 at Blackwall and fitted at Portsmouth Dockyard, HMS Warrior represented an epochal revolution in naval warfare: the world's first iron-hulled, armor-plated, steam-powered warship. She rendered every wooden battleship on earth instantly obsolete. With 4.5 inches of wrought-iron armor backed by 18 inches of teak, steam engines delivering 14 knots of speed regardless of wind direction, and revolutionary rifled breech-loading Armstrong guns, Warrior was completely impregnable to conventional cannon fire. This unmatched technological superiority allowed Britain to enforce 'Gunboat Diplomacy' across the globe: a single British ironclad steam warship could sail up non-European rivers (such as the Yangtze or Niger) and bombard recalcitrant coastal cities with impunity, coercing foreign rulers into signing unequal trade treaties without requiring costly ground armies.",
      ],
    },
    {
      match: /Robert Clive, Letter to the Court of Directors/i,
      hinge_question:
        "How does Clive's letter demonstrate that British imperialism in India was driven primarily by corporate financial plunder?",
      discussion_ideas: [
        "Clive's letter to the East India Company Directors lays bare the mercenary corporate motives underpinning British expansion in India. Following the Battle of Buxar in 1765, Clive secured the Diwani of Bengal—the sole legal right to collect land revenues and customs taxes from over twenty million Indian subjects. Rather than expressing concern for good governance or the welfare of the Indian population, Clive explicitly calculates the astronomical annual surplus revenue (amounting to over £2 million clear profit) that could be channeled directly into the Company's coffers in London. Clive treats an ancient, populous civilization as a commercial balance sheet, demonstrating that the East India Company operated not as a benevolent state, but as an armed corporate monopoly driven by shareholder dividends, private fortunes, and systematic financial extraction.",
      ],
    },
    {
      match: /Bengal Weavers|Evidence on Bengal Weavers/i,
      hinge_question:
        'Why did the British government enforce free trade on India while imposing punitive tariffs on Indian textiles entering Britain?',
      discussion_ideas: [
        'Protection of British Domestic Textile Manufacturers: In the late eighteenth and early nineteenth centuries, Bengal handloom muslins and calicoes were globally famous for their superior softness, weave, and vibrant dyes, easily outcompeting British cloth; to protect burgeoning Lancashire cotton mills, Parliament imposed discriminatory tariffs of up to 70–80% on Indian cotton goods entering Britain while banning the wearing of printed Indian calicoes under the Calico Acts.',
        "Coercive De-Industrialization of the Indian Economy: Once steam-powered British mechanization lowered production costs, the British government used its political dominance to eliminate all import duties on British manufactured textiles entering India; this flooded Indian bazaars with cheap Lancashire machine-made cloth, destroying the livelihoods of millions of skilled Bengali weavers and reducing India from the world's premier textile exporter into a dependent, impoverished supplier of raw cotton for British mills.",
      ],
    },
  ],

  // LESSON 2: How did corporate exploitation spark the 1857 Indian Rebellion and destroy the East India Company?
  lesson_2: [
    {
      match: /Shah Alam Conveying the Grant of the Diwani/i,
      hinge_question:
        'How does West’s painting present corporate military extortion as a dignified, legitimate imperial transaction?',
      discussion_ideas: [
        "Benjamin West's neoclassical painting deliberately sanitizes and romanticizes an act of armed extortion into an orderly, gracious diplomatic treaty. Commissioned decades after the event to burnish Clive's controversial reputation, the painting depicts Mughal Emperor Shah Alam II seated upon a grand, elevated imperial pavilion, calmly handing an ornate scroll (the Diwani) to a humble, courtly Lord Clive. In reality, Shah Alam was a terrified, blind puppet emperor whose armies had just been crushed at Buxar, signing away Bengal's tax revenues under gunpoint duress in an ordinary military tent. By surrounding Clive with dignified British officers and solemn Indian attendants, West constructed a visual myth of imperial legitimacy, framing the transfer of sovereignty not as an aggressive corporate robbery, but as a lawful, willing gift bestowed by an Oriental potentate upon an honorable servant of the British Empire.",
      ],
    },
    {
      match: /Rani Lakshmibai/i,
      hinge_question:
        'Why did Rani Lakshmibai’s defiance on horseback become an enduring national symbol of Indian resistance against British rule?',
      discussion_ideas: [
        "A Defiant Rejection of the Doctrine of Lapse: When the British East India Company under Governor-General Dalhousie annexed Jhansi in 1853 by refusing to recognize her adopted son as heir under the illegitimate 'Doctrine of Lapse', Rani Lakshmibai famously declared 'Mera Jhansi nahi doongi' ('I shall not surrender my Jhansi'); her refusal to submit to British bureaucratic land grabs inspired regional princes and ordinary citizens alike.",
        "The Transcendent Heroism of a Warrior Queen: Depicted leading cavalry charges with sword raised, reins held in her teeth, and her young infant tied to her back, Lakshmibai shattered both British stereotypes of passive Indian women and patriarchal military norms; dying in battle at Gwalior in June 1858, even her British adversary Sir Hugh Rose acknowledged she was 'the bravest and best military leader of the rebels', cementing her status as the mother of the Indian freedom struggle.",
      ],
    },
    {
      match: /Azamgarh Proclamation/i,
      hinge_question:
        'What evidence does Source C provide that the rebellion was motivated by economic destruction and loss of sovereignty rather than just religious cartridges?',
      discussion_ideas: [
        'Ruin of Indigenous Artisans and Landowners: The proclamation explicitly appeals to diverse social classes—zamindars, merchants, civil servants, and artisans—condemning the British for bankrupting traditional Indian craftspeople through the monopoly importation of English manufactures, imposing exorbitant land revenue taxes that dispossessed ancient aristocratic families, and excluding educated Indians from all senior governmental and military posts.',
        'Unification Across Religious Divides Against Colonial Tyranny: While British historians long dismissed the 1857 uprising as a mere mutiny of superstitious Hindu and Muslim soldiers triggered by greased Enfield rifle cartridges, the Azamgarh Proclamation proves the rebels possessed a coherent political vision: calling upon Hindus and Muslims to unite in a patriotic holy alliance to restore indigenous Mughal sovereignty and expel an alien, extractive corporate regime.',
      ],
    },
    {
      match: /Queen Victoria’s Royal Proclamation/i,
      hinge_question:
        'Why did Queen Victoria promise religious tolerance and respect for Indian princes after the 1857 uprising?',
      discussion_ideas: [
        "The Royal Proclamation of 1858 marked the formal dissolution of the discredited East India Company and the direct assumption of rule by the British Crown (the British Raj). Recognizing that the catastrophic rebellion of 1857 was provoked by aggressive Christian missionary interference, cultural arrogance, and Lord Dalhousie's annexation of native princely states under the Doctrine of Lapse, Queen Victoria and Prime Minister Lord Derby sought to pacify Indian society through conservative conciliation. The proclamation explicitly pledged that the British government would neither impose Christianity nor interfere in ancient religious customs and caste traditions, while promising to honor the territorial integrity and treaty rights of remaining Indian princes. By transforming loyal maharajas and conservative landowners into aristocratic allies of the Crown, the British regime sought to construct an enduring bulwark against future nationalist uprisings.",
      ],
    },
  ],

  // LESSON 3: How did settler colonialism transform Australia? Terra Nullius, The First Fleet & Frontier Resistance
  lesson_3: [
    {
      match: /Needles from Portsmouth/i,
      hinge_question:
        'What does Source A reveal about the maritime scale and logistical preparation required to launch a penal colony on the other side of the globe?',
      discussion_ideas: [
        "A Staggering Feat of Global Maritime Logistics: Sailing from Portsmouth in May 1787 under Captain Arthur Phillip, the First Fleet comprised eleven ships carrying over 1,400 people (including nearly 800 convicts), along with two years' provisions of flour, livestock, tools, and seeds; navigating 15,000 miles across uncharted oceans via Tenerife, Rio de Janeiro, and Cape Town without losing a single ship was a breathtaking display of British navigational mastery.",
        "Exporting Social Crisis from the Metropole: The fleet sailed past the Isle of Wight as a direct consequence of British industrial urbanization and legal brutality: with American independence terminating transatlantic convict exile and English county gaols overflowing with petty thieves sentenced under the 'Bloody Code', the expedition represented the state's radical decision to convert an entire continent into an oceanic open-air prison.",
      ],
    },
    {
      match: /First Fleet in Botany Bay/i,
      hinge_question:
        'How does Source B illustrate the immediate visual contrast between the British industrial fleet and the undisturbed Australian coastline?',
      discussion_ideas: [
        "George Raper's watercolor captures the monumental clash of civilizations at Botany Bay in January 1788. Anchored in pristine, tranquil coastal waters framed by untouched eucalyptus forests, the eleven European sailing ships with their complex rigging, canvas sails, and naval cannon represent the vanguard of an aggressive, mechanized industrial empire. The image visually encapsulates the fateful doctrine of 'Terra Nullius'—the legal fiction fabricated by the British Crown asserting that because Indigenous First Nations peoples did not cultivate the soil with European agriculture or fence private property, the land was 'nobody's land' and could be claimed without treaty, payment, or consent, ignoring 65,000 years of continuous Indigenous custodianship and initiating devastating ecological destruction and frontier conflict.",
      ],
    },
    {
      match: /Watkin Tench/i,
      hinge_question:
        'What does Tench’s account reveal about the military challenges the Royal Marines faced when fighting Indigenous guerrilla warriors in the Australian bush?',
      discussion_ideas: [
        'Superiority of Indigenous Tactical Knowledge: First Nations warriors, led by charismatic resistance leaders like Pemulwuy of the Bidjigal clan, utilized mastery of the dense eucalyptus bush to mount devastating ambushes against British soldiers; moving silently without supply lines and utilizing deadly multi-pronged spears thrown with woomeras, Indigenous fighters easily evaded cumbersome redcoat infantry weighed down by woollen uniforms and slow-loading flintlock muskets.',
        'British Recourse to Indiscriminate Terror and Collective Retaliation: Frustrated by their inability to defeat elusive guerrilla fighters in open combat, Governor Arthur Phillip ordered punitive military expeditions to decapitate resistance leaders and terrorize local clans; as Tench candidly reveals, British troops were ordered to carry severed heads in bags and shoot Indigenous warriors on sight, demonstrating that settler expansion rapidly abandoned benevolent civilizing rhetoric in favor of brutal frontier pacification.',
      ],
    },
    {
      match: /Eureka Stockade/i,
      hinge_question:
        'Why did British miners at Eureka rebel against royal colonial authorities just sixty years after the First Fleet landed?',
      discussion_ideas: [
        "The Eureka Stockade rebellion of December 1854 on the Ballarat goldfields demonstrated that the democratic aspirations of the British working class had traveled across the globe to Australia. Tens of thousands of international and British diggers resented the authoritarian colonial government, which imposed an extortionate monthly gold licence fee of 30 shillings regardless of whether a miner found gold, enforced through brutal, armed police raids ('digger hunts'). Furthermore, the diggers were completely disenfranchised, possessing zero representation in the colonial Legislative Council. Under the Southern Cross flag, led by Peter Lalor, the miners swore an oath to defend their liberties and built a wooden stockade to resist royal troops. Although royal soldiers brutally crushed the stockade, killing over twenty diggers, the uprising horrified the public and forced colonial authorities to replace the hated licence with an affordable 'Miner's Right', grant universal male suffrage, and establish parliamentary democracy in Victoria.",
      ],
    },
  ],

  // LESSON 4: Why did European powers scramble for Africa, and how was empire justified?
  lesson_4: [
    {
      match: /Berlin Conference/i,
      hinge_question:
        'How does Source A illustrate that the partition of Africa was an act of European diplomatic power that completely excluded African voices?',
      discussion_ideas: [
        'Von Rößler’s painting depicts the 1884–1885 Berlin Conference as a civilized gathering of powdered European statesmen, diplomats, and Chancellors (chaired by Otto von Bismarck) seated comfortably in an ornate salon around a massive wall map of Africa. The illustration graphically captures imperial hubris: European powers partitioned an entire continent of over 30 million square kilometers, slicing across thousands of historic ethnic homelands, kingdoms, and language groups with arbitrary ruler-drawn straight lines. Most chillingly, not a single African leader, king, or representative was invited to attend or consult on the division of their own continent, illustrating that European imperial diplomacy viewed Africa not as human societies with sovereign rights, but as a vast, unoccupied board of raw materials, rubber, and minerals to be carved up to prevent European wars.',
      ],
    },
    {
      match: /Maxim Machine Gun/i,
      hinge_question:
        'Why did Victorian imperialists celebrate the Maxim gun as a "humanitarian" weapon of rapid pacification, while African historians view it as an instrument of mechanized slaughter?',
      discussion_ideas: [
        "The Imperial Delusion of 'Humanitarian' Pacification: Victorian commanders and military apologists claimed the Maxim gun—capable of firing 600 rounds per minute—was humane because its terrifying, instantaneous firepower would quickly shatter enemy morale in a single engagement, ending rebellions with minimal British casualties and avoiding prolonged, bloody guerilla counter-insurgencies.",
        "Mechanized Slaughter and Imperial Subjugation: For African armies (such as the Matabele in 1893 or the Mahdists at Omdurman in 1898), the Maxim gun was an instrument of industrial mass murder that neutralized human courage, tactical skill, and numerical superiority; at Omdurman, Kitchener's Maxim guns slaughtered over 10,000 Sudanese warriors in hours while suffering only 48 British deaths, proving that imperial conquest was achieved not through moral or cultural superiority, but through ruthless industrial weapons technology (as immortalized in Hilaire Belloc's couplet: 'Whatever happens, we have got / The Maxim Gun, and they have not').",
      ],
    },
    {
      match: /White Man’s Burden/i,
      hinge_question:
        'What phrase reveals Kipling’s paternalistic belief that colonized peoples were incapable of governing themselves?',
      discussion_ideas: [
        "In 'The White Man's Burden', Rudyard Kipling infamously describes colonized non-European populations as 'half devil and half child'. This racially paternalistic phrase encapsulates the core ideological justification of late Victorian imperialism: framing non-white peoples as moral savages ('half devil') who required stern Christian discipline, and intellectual infants ('half child') who lacked the capacity for self-governance, scientific reason, or democracy. By presenting empire not as a brutal system of capitalist land-theft and resource exploitation, but as a thankless, heroic moral sacrifice ('the burden') borne by noble white men bringing roads, ports, and justice to ungrateful 'sullen peoples', Kipling provided high-minded moral cover for the violent subjugation of millions.",
      ],
    },
    {
      match: /Black Man’s Burden/i,
      hinge_question:
        'According to Morel, what was the real motivation that drove European syndicates into the African interior?',
      discussion_ideas: [
        "Unvarnished Capitalist Greed and Resource Plunder: In direct response to Kipling's imperial myth-making, Morel exposed that European powers did not enter Africa out of philanthropic Christian duty, but out of ruthless corporate hunger for cheap raw materials—rubber, palm oil, ivory, copper, and cotton—to fuel booming European factories and line the pockets of metropolitan shareholders.",
        "The Physical Destruction of Indigenous Societies: Morel emphasized that modern industrial exploitation was far more deadly to the African than ancient chattel slavery: by confiscating land, imposing forced rubber quotas under penalty of mutilation and murder (as in Leopold II's Congo Free State), and destroying traditional agricultural food systems, European syndicates tore apart African family life and inflicted demographic catastrophe.",
      ],
    },
  ],

  // LESSON 5: Who truly benefited from the British Empire?
  lesson_5: [
    {
      match: /Real Wages & Consumption/i,
      hinge_question:
        'Why do statistical increases in sugar and tea consumption not necessarily prove that workers were happier or healthier?',
      discussion_ideas: [
        'Stimulants to Mask Malnutrition and Exhaustion: Economic historians point out that the dramatic rise in working-class consumption of sweet tea and sugar was not a sign of luxurious diet, but an emergency caloric survival strategy: hot, cheap sugary tea provided a quick, artificial burst of energy to sustain exhausted factory workers through 14-hour shifts when fresh meat, milk, and vegetables were unaffordable in overcrowded cities.',
        "The 'Quality of Life' vs 'Standard of Living' Paradox: While statistical real wages showed gradual increases by the late nineteenth century, aggregate consumption tables completely ignore the devastating non-material costs of industrial urbanization: toxic air pollution, cramped back-to-back housing, rampant typhus, high infant mortality rates (where 50% of working-class children died before age five), and the loss of green countryside and community independence.",
      ],
    },
    {
      match: /Friedrich Engels/i,
      hinge_question:
        "How does Engels' critique challenge the cold economic statistics presented by Optimist historians?",
      discussion_ideas: [
        "Friedrich Engels' investigation of industrial Manchester in 1845 savagely dismantles the statistical optimism of classical economists by exposing the physical horror of lived working-class reality. Engels observed that raw wage data hid the horrifying human price paid to generate Britain's imperial wealth: factory workers lived packed in damp, unpaved cellars overflowing with human excrement, breathing soot-choked air that rotted their lungs with tuberculosis. Engels coined the phrase 'social murder' to describe how the British industrial bourgeoisie knowingly placed millions of proletarians in living and working conditions so lethal that thousands perished from preventable disease and factory machinery accidents every year, proving that Victorian capitalism was built upon the ruthless physical destruction of the human body.",
      ],
    },
    {
      match: /Dadabhai Naoroji/i,
      hinge_question:
        'What evidence does Source C provide that Victorian British wealth was directly dependent upon the systematic underdevelopment of India?',
      discussion_ideas: [
        "The Devastating 'Drain of Wealth': Naoroji—the first Indian elected to the British Parliament—statistically proved that Britain extracted over £30–40 million every year out of India through the 'Home Charges' (paying British civil service pensions, interest on guaranteed railway investments, and military expeditions overseas) without returning any economic equivalent to India, bleeding the subcontinent of vital capital that could have funded Indian industry and agriculture.",
        'Engineered Famines and Artificial Impoverishment: Naoroji demonstrated that the horrific late Victorian famines (which killed an estimated 10 to 20 million Indians between 1876 and 1900) were not inevitable natural disasters caused by monsoon failure, but artificial economic catastrophes engineered by British free-market policies, which forced impoverished peasants to export millions of tons of wheat and rice to London even as local populations starved to death.',
      ],
    },
    {
      match: /Capital and Labour/i,
      hinge_question:
        'How does Leech use visual contrast in Source D to challenge the Victorian narrative of universal industrial progress?',
      discussion_ideas: [
        "John Leech's celebrated Punch cartoon 'Capital and Labour' uses brutal visual antithesis to demolish the triumphant Victorian narrative that industrialization was lifting all boats. Leech splits the page into two morally conflicting worlds: the upper panel shows 'Capital'—a luxurious, sunlit drawing room where a corpulent mine-owner sits surrounded by velvet cushions, fine wines, and obedient servants, enjoying idle aristocratic decadence. The lower panel plunges into the subterranean gloom of 'Labour'—a dank, rat-infested coal mine where barefoot children and skeletal women crawl on hands and knees dragging heavy coal carts in iron chains. By juxtaposing lavish capitalist leisure with dehumanizing industrial slavery, Leech visually forces comfortable readers to confront the fundamental moral truth of the Victorian economy: that the dazzling wealth and imperial power of modern Britain was bought through the direct physical torment and subjugation of the working class.",
      ],
    },
  ],
};

async function main() {
  console.log('🚀 Starting Second British Empire Enrichment...');

  // Load from data.js
  const fileUrl = pathToFileURL(dataJsPath).href;
  const dataModule = await import(fileUrl);
  const unitData = dataModule.default || dataModule.unitData;

  let totalSourcesUpdated = 0;
  let totalNarrativeUpdated = 0;

  unitData.lessons.forEach((l) => {
    const rules = SECOND_EMPIRE_PEDAGOGY[l.id];
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
          console.warn(
            `  ⚠️ [narrative ${idx}] No match for: "${b.source.title}" (id=${b.source.id})`,
          );
        }
      }
    });
  });

  console.log(
    `\n🎉 Total sources updated across Second British Empire: ${totalSourcesUpdated} in l.sources, ${totalNarrativeUpdated} in narrative_blocks`,
  );

  // 1. Write back to units/second_british_empire/data.js
  const serialized = JSON.stringify(unitData, null, 2);
  const jsContent = `const unitData = ${serialized};\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/second_british_empire/data.js');

  // 2. Write to public/data/second_british_empire.json
  const pubData = { id: 'second_british_empire', data: unitData };
  fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
  console.log('✅ Successfully created public/data/second_british_empire.json');

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.second_british_empire) {
      db.second_british_empire.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated second_british_empire in public/database.json');
    }
  }

  console.log('\n🏁 Completed Second British Empire enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});

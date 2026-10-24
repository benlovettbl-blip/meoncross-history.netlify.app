const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'first_british_empire', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'first_british_empire.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const FIRST_EMPIRE_PEDAGOGY = {
  // LESSON 1: The East India Company & Mughal Bengal (1600–1757)
  lesson_1: [
    {
      match: /Nathaniel Dance|Robert Clive \(1773\)/i,
      hinge_question:
        'Does Dance depict Clive as a legitimate British military hero or as an agent of corporate plunder?',
      discussion_ideas: [
        'A Victorious Patriotic Hero of Empire: Nathaniel Dance depicts Clive standing resolute in scarlet military uniform against a dramatic backdrop of swirling battlefield smoke, with an Indian obelisk and palm trees behind him; the portrait visually frames Clive as a brilliant imperial commander who secured British supremacy at the Battle of Plassey (1757) and expanded British trade.',
        "A Corrupt Corporate 'Nabob' Enriched by Plunder: In 1773, when Dance painted this portrait, Clive was under hostile parliamentary investigation for gross corruption, extortion, and amassing a personal fortune of over £234,000 while serving as an agent of the East India Company; critics in Parliament condemned him for corporate greed that provoked the catastrophic Great Bengal Famine of 1770, which starved ten million Indian peasants.",
      ],
    },
    {
      match: /Shah Alam II|Grant of the Diwani/i,
      hinge_question:
        'Why did West depict this scene as a peaceful legal ceremony rather than a forced military shakedown?',
      discussion_ideas: [
        'Benjamin West painted this scene thirty years after the event to create an official visual myth of imperial legitimacy. In reality, Mughal Emperor Shah Alam II was a defeated, powerless captive whose forces had been routed at Buxar; he was compelled at gunpoint in an ordinary military tent to surrender the Diwani (tax collection rights) of Bengal, Bihar, and Orissa. West replaces this forced military extortion with a neoclassical ceremonial tableau: Shah Alam sits serenely upon an elevated imperial pavilion, bestowing the treaty scroll upon a bowed, deferential Lord Clive as if granting a voluntary feudal honor. This whitewashed depiction was designed to reassure British audiences that the East India Company’s rule was not an aggressive corporate land-grab, but an orderly, legal, and civilized succession of power.',
      ],
    },
  ],

  // LESSON 2: The Transatlantic Slave Trade & The Middle Passage (1619–1807)
  lesson_2: [
    {
      match: /Slave Ship Brookes|Stowage/i,
      hinge_question:
        'Why did abolitionists choose a technical diagram rather than an emotional painting?',
      discussion_ideas: [
        "The Plymouth Abolition Committee made the deliberate tactical decision to use an objective architectural plan because cold technical diagrams were impossible for slave traders to deny or refute as artistic exaggeration. By depicting the exact dimensions of the ship's hold and showing over 450 human bodies packed shoulder-to-shoulder in rows with each adult male allotted a space just six feet long by sixteen inches wide, the cross-section visually exposed the monstrous reality of chattel slavery: treating human beings not as persons, but as inert, tightly packed cargo. Circulated across Britain, America, and France, this unemotional blueprint stripped away the polite fictions of the slave trade and forced the public to confront the physical horror of the Middle Passage.",
      ],
    },
    {
      match: /Olaudah Equiano|Gustavus Vassa/i,
      hinge_question: 'Why did Equiano insist on European attire holding an open Bible?',
      discussion_ideas: [
        "Direct Refutation of Pro-Slavery Racial Stereotypes: Pro-slavery apologists claimed that African people were uncivilized savages who lacked the capacity for moral reasoning, education, or Christian faith; by presenting himself in elegant British gentleman's attire—a frock coat, ruffled cravat, and styled hair—holding an open Bible, Equiano visually demolished racist caricatures and asserted his full intellectual, moral, and spiritual equality.",
        'Mobilizing Christian Empathy and Abolitionist Appeal: By holding the Christian Scriptures open to the Acts of the Apostles, Equiano appealed directly to the religious conscience of white British churchgoers and evangelical reformers (such as William Wilberforce), reminding readers that all human souls were equal in the sight of God and that chattel slavery was an unpardonable sin against Christian doctrine.',
      ],
    },
  ],

  // LESSON 3: Plantation Reality, Queen Nanny & Maroon Resistance (1655–1740)
  lesson_3: [
    {
      match: /Cutting the Sugar Cane|William Clark/i,
      hinge_question:
        'Why might an artist depict plantation labour looking orderly rather than showing the violence used to enforce work?',
      discussion_ideas: [
        "William Clark's print was produced for British audiences and plantation owners who wished to defend the Caribbean sugar industry against the mounting abolitionist campaign in Parliament. Clark deliberately depicts the enslaved workers in clean clothes, working at an unhurried, rhythmic pace under a bright Caribbean sky, with the overseer appearing calm rather than brandishing the cart whip. By erasing the brutal realities of plantation slavery—where enslaved men, women, and children were driven by the whip through 18-hour shifts cutting cane with razor-sharp machetes under scorching heat, suffering high mortality rates—Clark presented a sanitized, pastoral fantasy designed to convince British buyers that enslavement was a benign, orderly agricultural system.",
      ],
    },
    {
      match: /Queen Nanny|Maroon Resistance/i,
      hinge_question:
        'How does commemorating Queen Nanny challenge narratives of enslaved people as passive victims?',
      discussion_ideas: [
        'Celebrating Active, Militant Indigenous Resistance: Queen Nanny was the spiritual and military leader of the Windward Maroons in the Blue Mountains of Jamaica; rather than submitting to slavery, she organized escaped captives into disciplined guerrilla units who used mountain topography, camouflage, and ambushes to defeat British redcoat regiments, forcing the British Crown to sign a formal peace treaty in 1739 granting the Maroons land autonomy.',
        "Subverting Colonial Historical Erasure: Traditional colonial histories depicted enslaved Africans as helpless victims waiting for benevolent white British politicians to liberate them; honoring Queen Nanny as Jamaica's only National Heroine recenters the historical narrative on Black agency, proving that enslaved people fought heroically for their own freedom decades before parliamentary abolition.",
      ],
    },
  ],

  // LESSON 4: The Thirteen Colonies, The Proclamation of 1763 & The Boston Tea Party (1763–1773)
  lesson_4: [
    {
      match: /Bloody Massacre in King-Street|Paul Revere/i,
      hinge_question:
        'What visual details in Revere’s engraving deliberately distort the reality of a chaotic street brawl?',
      discussion_ideas: [
        "Paul Revere's famous engraving is one of the most effective pieces of political propaganda in American history. In reality, on 5 March 1770, a small, terrified British sentry was surrounded by an angry Boston mob throwing ice, rocks, and clubs before a confused musket discharge killed five civilians. Revere deliberately altered every key detail: he depicts British Captain Preston standing behind his men with a raised sword explicitly commanding an orderly firing squad to shoot into an innocent, peaceful crowd of gentlemen; he erased all stones, snowballs, and weapons, added the label 'Butcher's Hall' above the British customs house, and added a musket firing from a civilian window, transforming a chaotic, self-defense riot into an act of cold-blooded, pre-planned military tyranny to inflame anti-British colonial fury.",
      ],
    },
    {
      match: /Boston Tea Party/i,
      hinge_question:
        'Why did the protestors disguise themselves as Mohawk warriors rather than performing the action as ordinary British townsfolk?',
      discussion_ideas: [
        'Protection from Arrest and Hanging for High Treason: Destroying 342 chests of British East India Company tea worth over £9,000 (millions today) was a felony capital crime against the Crown; donning Native American blankets, smearing soot on their faces, and communicating with mock war cries concealed the identities of prominent Sons of Liberty (including merchant smugglers) from British customs informants and royal courts.',
        "Symbolic Rejection of British Identity: By adopting the persona of indigenous Mohawk warriors, the colonists symbolically declared that they were no longer subservient British subjects obedient to a distant Parliament, but a distinct 'American' people who belonged to the American continent and rejected British imperial taxation without representation.",
      ],
    },
  ],

  // LESSON 5: The American Revolution, 1776 Declaration & The Black Loyalists (1775–1783)
  lesson_5: [
    {
      match: /Declaration of Independence|Trumbull/i,
      hinge_question:
        'Why did Trumbull omit the intense debates over slavery that nearly broke the Congress apart?',
      discussion_ideas: [
        "John Trumbull painted this iconic scene for the US Capitol Rotunda decades after 1776 to create a myth of unanimous, harmonious founding unity. In reality, the drafting committee (led by Thomas Jefferson) was bitterly divided: Jefferson’s original draft contained a passionate clause condemning King George III for waging 'cruel war against human nature itself' by maintaining the transatlantic slave trade. Delegates from Georgia and South Carolina furiously refused to sign unless this passage was completely excised, threatening to walk out and collapse the revolution. Trumbull erased this foundational hypocrisy, depicting 47 founding fathers standing in dignified harmony, concealing the tragic paradox that an empire of liberty was founded by slaveholders proclaiming 'all men are created equal' while keeping 500,000 Black human beings in chattel bondage.",
      ],
    },
    {
      match: /Dunmore’s Proclamation|Lord Dunmore/i,
      hinge_question: 'Was Dunmore motivated by moral abolition or ruthless military strategy?',
      discussion_ideas: [
        "Ruthless Military Warfare to Crush the Rebellion: Lord Dunmore was himself a wealthy slaveowner; his November 1775 proclamation offering freedom to 'all indentured servants, Negroes, or others... able and willing to bear arms' was a desperate tactical weapon designed to cripple the Virginia plantation economy and recruit an 'Ethiopian Regiment' of 800 soldiers to save his beleaguered royal garrison.",
        "The Inadvertent Spark for Black Liberation and Loyalism: Regardless of Dunmore's cynical imperial motives, thousands of enslaved men, women, and children seized the opportunity to escape bondage and run to the British lines; known as the Black Loyalists, over 3,000 were subsequently evacuated by the British to Nova Scotia in 1783 (recorded in the Book of Negroes), transforming a British war measure into the largest emancipation of enslaved people in North America prior to the Civil War.",
      ],
    },
  ],
};

async function main() {
  console.log('🚀 Starting First British Empire Enrichment...');

  // Load from data.js
  const fileUrl = pathToFileURL(dataJsPath).href;
  const dataModule = await import(fileUrl);
  const unitData = dataModule.default || dataModule.unitData;

  let totalSourcesUpdated = 0;
  let totalNarrativeUpdated = 0;

  unitData.lessons.forEach((l) => {
    const rules = FIRST_EMPIRE_PEDAGOGY[l.id];
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
    `\n🎉 Total sources updated across First British Empire: ${totalSourcesUpdated} in l.sources, ${totalNarrativeUpdated} in narrative_blocks`,
  );

  // 1. Write back to units/first_british_empire/data.js
  const serialized = JSON.stringify(unitData, null, 2);
  const jsContent = `const unitData = ${serialized};\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/first_british_empire/data.js');

  // 2. Write to public/data/first_british_empire.json
  const pubData = { id: 'first_british_empire', data: unitData };
  fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
  console.log('✅ Successfully created public/data/first_british_empire.json');

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.first_british_empire) {
      db.first_british_empire.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated first_british_empire in public/database.json');
    }
  }

  console.log('\n🏁 Completed First British Empire enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});

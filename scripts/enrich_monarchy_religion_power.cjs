const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'monarchy_religion_power', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'monarchy_religion_power.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const MONARCHY_PEDAGOGY = {
  // LESSON 1: The Reformation & The Break with Rome (1517–1547)
  lesson_1: [
    {
      match: /Martin Luther/i,
      hinge_question:
        'Does Cranach present Luther as a dangerous rebel or as a holy scholar restoring pure faith?',
      discussion_ideas: [
        "A Pious, Learned Christian Scholar: Cranach—a close personal friend of Luther in Wittenberg—deliberately depicts Luther wearing solemn academic doctor's robes, holding the Holy Scriptures with serene, steadfast dignity against an austere, dark background; the portrait presents Luther not as a radical anarchist, but as a sober theologian restoring the uncorrupted Word of God against papal excess.",
        "A Defiant Heretic Challenging Imperial Authority: To orthodox Roman Catholic observers and Emperor Charles V, Luther's portrait was the likeness of an excommunicated heretic who had shattered the universal unity of Christendom, burned papal bulls in public, and sparked the bloody German Peasants' War of 1525, threatening social order across Europe.",
      ],
    },
    {
      match: /Family of Henry VIII|Tudor Succession/i,
      hinge_question:
        'Why did Henry VIII order Jane Seymour to be painted sitting beside him on the throne in 1545—eight years after her death—while Catherine of Aragon and Anne Boleyn were completely excluded?',
      discussion_ideas: [
        "Painted towards the end of Henry VIII's life, this dynastic allegory is a masterclass in Tudor royal propaganda. Jane Seymour was deliberately depicted sitting beside Henry upon the royal throne because she was the only one of his six wives who fulfilled the paramount duty of a Tudor queen: delivering a surviving, legitimate male heir (Prince Edward, seated beside Henry). By contrast, Catherine of Aragon and Anne Boleyn had been legally repudiated, stripped of their queenly titles, and declared mothers of illegitimate daughters (Mary and Elizabeth). Although Mary and Elizabeth appear at the outer margins of the painting, Jane Seymour is immortalized as the sole lawful consort whose sacrifice secured the unbroken Protestant Tudor succession.",
      ],
    },
    {
      match: /Whitehall Mural|Portrait of King Henry VIII/i,
      hinge_question:
        'Why did Holbein paint Henry VIII standing colossal and gripping a dagger rather than kneeling humbly in prayer?',
      discussion_ideas: [
        "Hans Holbein's iconic Whitehall mural fundamentally redefined royal portraiture following the Break with Rome. Traditional medieval kings had been depicted kneeling in humble prayer before Christ or the Virgin Mary; Holbein presents Henry VIII as a colossal, imposing imperial monarch standing with legs wide in an aggressive stance of absolute masculine power, confronting the viewer with piercing eyes and a hand resting casually on the hilt of a hunting dagger. Adorned with broad padded shoulders, ermine fur, and shimmering gold embroidery, the portrait visually embodies the 1534 Act of Supremacy: declaring that Henry was Supreme Head of the Church of England on earth, acknowledging no foreign Pope or Emperor above him, and commanding absolute obedience from church and state.",
      ],
    },
  ],

  // LESSON 2: Elizabeth I & The Middle Way (1558–1588)
  lesson_2: [
    {
      match: /Procession Portrait|Robert Peake/i,
      hinge_question:
        'Why did Elizabeth choose to be carried through public streets in an open litter rather than moving surrounded by armoured soldiers inside enclosed carriages?',
      discussion_ideas: [
        "Direct Emotional Bonding and Popular Acclamation: By riding upon an open, canopied litter carried by her highest-ranking courtiers, Elizabeth made herself physically visible to ordinary Londoners, yeomen, and apprentices; her open posture projected absolute trust in her subjects' affection, cultivating the cult of Gloriana and the 'Virgin Queen' as a loving mother devoted entirely to her people.",
        "Public Performance of Feudal Subordination: The procession was a carefully orchestrated political performance: the realm's greatest aristocrats walked on foot before her in deferential subservience, carrying the sword of state and wearing her royal livery, publicly signaling that potential rival barons were entirely subordinate to the Crown's authority.",
      ],
    },
    {
      match: /Mary I|Bloody Mary/i,
      hinge_question:
        'Why did the memory of Mary I’s burnings make Elizabeth determined to avoid extreme religious persecution in 1559?',
      discussion_ideas: [
        "Repulsion at Bloody Extremism and Domestic Martyrdom: Mary I's reign had executed nearly 300 Protestant men, women, and clerics (including Archbishop Cranmer, Ridley, and Latimer) at the stake for heresy; these public burnings deeply horrified English public opinion, immortalized in John Foxe's Book of Martyrs, convincing Elizabeth that violent religious inquisitions produced stubborn martyrs and widespread popular revulsion rather than genuine religious conformity.",
        "Pragmatic 'Middle Way' for National Survival: Inheriting a divided, bankrupted kingdom threatened by Catholic France and Spain, Elizabeth recognized that attempting to violently crush the Catholic majority in northern and western England would ignite a catastrophic religious civil war (such as was tearing France apart); she therefore sought the 1559 'Middle Way', famously declaring she had 'no desire to make windows into men's souls' as long as subjects outwardly conformed to the law.",
      ],
    },
    {
      match: /Armada Portrait/i,
      hinge_question:
        'Why is Elizabeth’s hand placed deliberately over the Americas on the globe rather than on an English map?',
      discussion_ideas: [
        "In the Armada Portrait, Elizabeth's hand does not rest on the British Isles, but rests serenely atop the globe with her fingers deliberately covering North America. Flanked by background windows showing the defeated Spanish Armada wrecked upon rocks by the 'Protestant Wind', this gesture makes a bold geopolitical declaration: by shattering Philip II's invincible naval fleet, England had broken Spain's monopoly over the New World. Adorned with virgin pearls symbolizing oceanic mastery, Elizabeth announces that England is no longer a beleaguered island kingdom on the periphery of Europe, but a sovereign global maritime power destined to colonize Virginia and dominate world trade routes.",
      ],
    },
  ],

  // LESSON 3: The Spanish Armada & Naval Warfare (1588)
  lesson_3: [
    {
      match: /Cadiz|Drake’s Raid on Cadiz/i,
      hinge_question:
        'Why was burning seasoned barrel staves so devastating to Spanish sea operations?',
      discussion_ideas: [
        "During Sir Francis Drake's audacious April 1587 raid on Cadiz—famously known as 'singeing the King of Spain's beard'—English sailors destroyed over 24 Spanish warships, but their most destructive act was burning thousands of tons of seasoned oak and chestnut barrel staves stored in the harbor warehouses. In sixteenth-century naval expeditions, seasoned wooden barrels were the only technology available to preserve drinking water, salted beef, beer, and hardtack biscuit at sea. Lacking seasoned wood, the Spanish were forced to construct casks from green, unseasoned timber; when the Armada sailed in 1588, the unseasoned wood warped in the summer heat, causing drinking water to spoil into foul slime and food supplies to rot, decimating the Spanish fleet with dysentery, scurvy, and dehydration before English guns even fired.",
      ],
    },
    {
      match: /Gravelines|Loutherbourg/i,
      hinge_question:
        'Does Source B show a traditional boarding battle or modern artillery warfare?',
      discussion_ideas: [
        'The Modern Revolution of Long-Range Naval Artillery: English commanders (Howard, Drake, and Hawkins) rejected medieval boarding tactics; utilizing nimble, race-built galleons that could sail close to the wind, English crews used heavy brass culverins to bombard the disorganized Spanish line with rapid broadsides from a standoff distance, exploiting superior English reloading speeds to smash timber hulls without allowing Spanish infantry to board.',
        "Chaotic Close-Quarters Gunpowder Duel: De Loutherbourg's painting captures the suffocating, hellish reality of Gravelines: warships locked within musket range amid swirling gunpowder smoke, shattered masts, and burning sails, where the fireships at Calais had scattered the Spanish crescent into a desperate, confused melee before storm winds drove them into the North Sea.",
      ],
    },
  ],

  // LESSON 4: The Civil War, Regicide & The Bill of Rights (1642–1689)
  lesson_4: [
    {
      match: /Anthony van Dyck|Portrait of King Charles I/i,
      hinge_question: 'How did this visual projection of divine kingship alienate Parliament?',
      discussion_ideas: [
        "The Absolutist Cult of Divine Right: Anthony van Dyck's portraits depicted Charles I as an ethereal, divinely anointed monarch reigning supreme above political debate and mortal laws; during the eleven years of 'Personal Rule' (1629–1640), Charles ruled without Parliament, imposing illegal taxes (Ship Money) and ecclesiastical uniformity through Archbishop Laud, visually asserting he was accountable only to God.",
        "Parliamentary Resentment and Catholic Fears: Van Dyck's continental baroque style, celebrating royal elegance and divine majesty, fed intense parliamentary suspicions that Charles was steering England toward French-style royal despotism and Roman Catholicism, alienating Protestant gentry who viewed Parliament as the historic defender of English liberties and property rights.",
      ],
    },
    {
      match: /Battle of Naseby|Naseby/i,
      hinge_question:
        'Why did the discovery of Charles I’s secret letters at Naseby make compromise impossible?',
      discussion_ideas: [
        "The decisive Parliamentary victory at Naseby in June 1645 resulted in the capture of the King's personal royal baggage train, containing his private cabinet of correspondence. Published by Parliament as The King's Cabinet Opened, these letters revealed that while Charles was publicly negotiating peace with Parliament, he was secretly writing to Catholic confederates in Ireland and continental monarchs (including the Pope and French king), pleading for foreign Catholic armies to invade England to crush his own subjects. The exposure of this duplicity permanently shattered Parliament's trust in Charles: it proved that the King was incapable of honoring any constitutional treaty, radicalizing Oliver Cromwell and the New Model Army toward the conviction that Charles was 'that man of blood' who must be brought to justice.",
      ],
    },
    {
      match: /Execution of Charles I|Scaffold/i,
      hinge_question: 'Why are Parliamentary cavalry shown ringing the execution scaffold?',
      discussion_ideas: [
        "Preventing Popular Uprisings and Royalist Rescue: On 30 January 1649, Charles I was beheaded outside the Banqueting House in Whitehall; dense cordons of New Model Army cavalry and pikemen were deployed to hold back the vast crowd, preventing emotional riots or rescue attempts by loyal citizens, and keeping spectators so far away that the King's dying speech could only be heard by those on the scaffold itself.",
        "Demonstration of Military Dictatorship and Regicide: The overwhelming presence of armed soldiers emphasizes that the execution was an act of raw military force orchestrated by the army high command and a purged 'Rump' Parliament; when the executioner severed the King's head, contemporary accounts record that a deep, collective groan arose from the horrified crowd, proving that regicide lacked popular consensus and required military intimidation to enforce.",
      ],
    },
  ],

  // LESSON 5: Crown, Church, or Parliament? (1517–1689)
  lesson_5: [
    {
      match: /1689 Bill of Rights|Original Statute Scroll/i,
      hinge_question:
        'What clause in the Bill of Rights represents the most radical shift from Henry VIII’s Royal Supremacy?',
      discussion_ideas: [
        "The most revolutionary clause of the 1689 Bill of Rights is the explicit prohibition against the monarch suspending or dispensing with parliamentary laws without the consent of Parliament ('the pretended power of suspending of laws... by regal authority without consent of Parliament is illegal'). Under Henry VIII's Royal Supremacy and the Stuart doctrine of the Divine Right of Kings, monarchs claimed inherent prerogative powers superior to statute law. The Bill of Rights permanently subordinated the Crown to the rule of law and the will of the elected legislature: the monarch could no longer levy taxes, maintain a standing army in peacetime, or alter the succession without parliamentary approval, establishing Britain as a constitutional monarchy.",
      ],
    },
    {
      match: /Prince William of Orange Landing|Brixham/i,
      hinge_question:
        'Was the Glorious Revolution a popular domestic revolt or an invited foreign invasion?',
      discussion_ideas: [
        "An Invited Constitutional Defence of Protestant Liberties: Seven leading English peers (the 'Immortal Seven') signed an official invitation pleading with Dutch Protestant Prince William of Orange to intervene to protect English parliamentary liberties and the Protestant religion against James II's Catholic absolutism; when William landed at Torbay, English army officers (including John Churchill) defected to him without firing a shot, framing the event as a bloodless defense of ancient liberties.",
        "A Calculated Foreign Military Invasion: In reality, William landed with an armada of 463 ships and 15,000 veteran Dutch troops—an invasion force four times larger than the Spanish Armada of 1588. William's primary geopolitical motivation was to mobilize English naval and financial resources for his ongoing Dutch war against Louis XIV of France; the subsequent flight of James II was secured through an armed Dutch military occupation of London, followed by brutal wars in Ireland (the Boyne) and Scotland.",
      ],
    },
    {
      match: /Presentation of the Crown and Declaration of Rights|Edward Matthew Ward/i,
      hinge_question:
        'Look closely at the document held in the centre and the crown on the cushion. Who is dictating terms to whom in this room?',
      discussion_ideas: [
        "In Edward Matthew Ward's painting of the historic 13 February 1689 convention in the Banqueting House at Whitehall, the visual composition makes it unmistakable that Parliament is dictating terms to the Crown. Lord Halifax stands at the center holding the written Declaration of Rights, reading aloud the statutory limitations upon royal power. William of Orange and Mary II stand listening attentively, accepting the royal crown—resting upon a velvet cushion—only on condition that they swear an oath to abide by the Declaration's constitutional constraints. This image captures the death of royal absolutism: the Crown is no longer a divinely bestowed, unlimited right of kings, but a conditional contract granted by the representatives of the people in Parliament.",
      ],
    },
  ],
};

async function main() {
  console.log('🚀 Starting Monarchy, Religion and Power Enrichment...');

  // Load from data.js
  const fileUrl = pathToFileURL(dataJsPath).href;
  const dataModule = await import(fileUrl);
  const unitData = dataModule.default || dataModule.unitData;

  let totalSourcesUpdated = 0;
  let totalNarrativeUpdated = 0;

  unitData.lessons.forEach((l) => {
    const rules = MONARCHY_PEDAGOGY[l.id];
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
    `\n🎉 Total sources updated across Monarchy, Religion and Power: ${totalSourcesUpdated} in l.sources, ${totalNarrativeUpdated} in narrative_blocks`,
  );

  // 1. Write back to units/monarchy_religion_power/data.js
  const serialized = JSON.stringify(unitData, null, 2);
  const jsContent = `const unitData = ${serialized};\nexport const unitData = unitData;\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/monarchy_religion_power/data.js');

  // 2. Write to public/data/monarchy_religion_power.json
  const pubData = { id: 'monarchy_religion_power', data: unitData };
  fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
  console.log('✅ Successfully created public/data/monarchy_religion_power.json');

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.monarchy_religion_power) {
      db.monarchy_religion_power.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated monarchy_religion_power in public/database.json');
    }
  }

  console.log('\n🏁 Completed Monarchy, Religion and Power enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'medieval_england', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'medieval_england.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const MEDIEVAL_PEDAGOGY = {
  // LESSON 1: 1066 & The Battle of Hastings: Why did William win?
  lesson_1: [
    {
      match: /Harold Swearing the Sacred Oath|Sacred Oath/i,
      hinge_question:
        'Does Source A prove that Harold genuinely promised England to William, or does it reflect Norman wartime propaganda manufactured to justify invasion?',
      discussion_ideas: [
        "Norman Political Propaganda to Justify a Holy War: The Bayeux Tapestry was commissioned by William's half-brother, Bishop Odo of Bayeux; depicting Harold touching two sacred holy reliquaries while swearing fealty to William was calculated to present Harold as a perjured oath-breaker (perjurus), securing papal endorsement (the Papal Banner) and sanctifying William's armed invasion as a righteous holy crusade.",
        'Plausible Historical Oath Given Under Duress: Harold was shipwrecked in Ponthieu in 1064 and held prisoner by Count Guy before William ransomed him; Anglo-Saxon chroniclers acknowledge Harold took an oath, but argue it was sworn under physical coercion and implied life-or-death duress in Normandy, rendering it legally and morally invalid under medieval canon law.',
      ],
    },
    {
      match: /Death of King Harold|Flight of the Saxons/i,
      hinge_question:
        'Was Harold’s defeat caused primarily by William’s superior cavalry tactics, or by Harold’s reckless exhaustion after Stamford Bridge?',
      discussion_ideas: [
        "Norman Tactical Mastery and the Feigned Retreat: The Anglo-Saxon shield wall atop Senlac Hill held firm for hours against repeated charges; William's decisive breakthrough came when his cavalry executed coordinated 'feigned retreats', luring undisciplined Saxon fyrd levies down the hill in pursuit, breaking the defensive wall and allowing Norman mounted knights to encircle and slaughter them.",
        'Anglo-Saxon Physical Exhaustion and Strategic Haste: Harold had just marched his elite housecarls 190 miles north in four days to crush Harald Hardrada at Stamford Bridge (25 September), followed immediately by an exhausting 250-mile forced march south to Sussex; rushing into battle on 14 October without resting his troops or waiting for northern earls Edwin and Morcar to arrive left his army severely depleted and fatigued.',
      ],
    },
  ],

  // LESSON 2: Castles, Terror & Domesday: How did the Normans subjugate England?
  lesson_2: [
    {
      match: /Building a Castle at Hastings|Motte-and-Bailey/i,
      hinge_question:
        'Why were quick-to-build timber motte-and-bailey castles far more effective for early Norman conquest than slow stone fortresses?',
      discussion_ideas: [
        'Motte-and-bailey castles were the supreme military weapon of rapid blitzkrieg colonization. With an occupying army of only 5,000 to 7,000 Normans amidst a hostile Anglo-Saxon population of over two million, William could not afford the years required to quarry stone, burn lime, and construct masonry fortresses. Utilizing pre-fabricated timber beams shipped directly across the Channel and conscripting local Saxon forced labor, Norman garrisons could erect an earthen motte (mound) topped with a wooden watchtower and surrounded by a palisaded bailey and ditch within eight to fourteen days. These hundreds of wooden forts provided immediate secure bases from which heavily armored cavalry could patrol regional trade routes, intimidate surrounding villages, and crush local rebellions with devastating speed.',
      ],
    },
    {
      match: /Great Domesday Book Folio|Domesday/i,
      hinge_question:
        'Was Domesday primarily a tax ledger, or a legal weapon designed to permanently disinherit the Anglo-Saxon aristocracy?',
      discussion_ideas: [
        "A Comprehensive Fiscal and Military Census: Facing the imminent threat of a Danish Viking invasion in 1085, William commissioned Domesday to conduct a forensic fiscal audit of his realm: recording every acre of arable land, meadow, woodland, mill, pig, and ox across England to determine the kingdom’s maximum tax capacity ('Danegeld') and calculate exactly how many armored feudal knights each manor owed to the Crown.",
        'A Legal Weapon of Total Dispossession: Domesday served as the supreme legal instrument of the Norman Conquest, settling all contested boundary disputes and providing official documentation for the total liquidation of the Anglo-Saxon ruling class: by 1086, less than 5% of English land remained in the hands of native Saxon thegns, with over 90% redistributed to just 200 Norman tenant-in-chief barons and bishops, permanently cementing foreign feudal domination.',
      ],
    },
  ],

  // LESSON 3: Crown vs Church: Why did Henry II clash with Thomas Becket?
  lesson_3: [
    {
      match: /Henry II and Thomas Becket Clashing|Manuscript Illumination/i,
      hinge_question:
        'Was Becket defending Christian justice and Church independence, or was he defending an unjust legal loophole that allowed murderous priests to escape punishment?',
      discussion_ideas: [
        "Defending a Corrupt Legal Loophole for 'Criminous Clerks': Henry II was furious that clergy accused of serious felonies—including robbery, rape, and murder—could claim 'benefit of clergy', being tried solely in lenient ecclesiastical courts that could not impose capital punishment; defrocked priests were merely sentenced to prayer, fasting, or pilgrimage, undermining the King’s efforts to establish a single, fair system of Royal Common Law across England.",
        "Upholding the Sacred Liberty of Christ's Church: Once appointed Archbishop of Canterbury in 1162, Becket experienced a profound spiritual transformation, abandoning worldly courtier luxury for an ascetic hairshirt; he fiercely resisted the Constitutions of Clarendon (1164), arguing from canon law that the Church was sovereign and answerable only to the Pope, citing the scripture that God does not judge twice for the same offense (non bis in idipsum), and refusing to allow secular royal magistrates to dictate to God's clergy.",
      ],
    },
    {
      match: /Murder of Thomas Becket|Edward Grim/i,
      hinge_question:
        'How did Becket’s violent death ultimately grant the Church total victory over King Henry II in the battle for legal independence?',
      discussion_ideas: [
        "Edward Grim’s horrifying eyewitness account of four Norman knights slicing off the crown of Becket's skull upon the altar steps of Canterbury Cathedral on 29 December 1170 created a global shockwave across Catholic Europe. The brutal sacrilege of murdering an archbishop in his own cathedral turned Becket instantly into a holy martyr, canonized by Pope Alexander III within two years. Terrified of papal excommunication and interdict, King Henry II was forced to perform humiliating public penance: walking barefoot through the cobbled streets of Canterbury in sackcloth and kneeling weeping before Becket’s tomb while monks scourged his bare back with rods. Politically, Henry had to formally revoke the controversial clauses of the Constitutions of Clarendon, conceding that clerical trials remained under ecclesiastical jurisdiction and enshrining the Church’s legal independence from the Crown for the next 350 years.",
      ],
    },
  ],

  // LESSON 4: Magna Carta (1215) & Medieval Kingship: Liberty or Barons’ Power Grab?
  lesson_4: [
    {
      match: /Matthew Paris|Chronicle Portrait of King John/i,
      hinge_question:
        'Does Matthew Paris provide an objective assessment of John’s reign, or does his monastic hatred of royal taxation distort his historical interpretation?',
      discussion_ideas: [
        "A Deeply Biased Monastic Smear Campaign: Matthew Paris was a monk writing at St Albans Abbey decades after John's death, inheriting the chronicler tradition of Roger of Wendover; because King John had seized church revenues and expelled monks during his bitter five-year excommunication dispute with Pope Innocent III (1208–1213), Paris crafted a venomous caricature of John as a demonic, cowardly tyrant, famously writing 'Foul as it is, Hell itself is defiled by the foulness of John'.",
        "Accurate Documentation of Royal Extortion and Military Failure: While Paris used dramatic moral rhetoric, historical financial records confirm John's genuine failures: he levied crushing scutage taxes on barons eleven times in sixteen years, extorted massive arbitrary 'relief' fines on aristocratic widows and heirs, and starved prisoners to death, yet lost all of Normandy and Anjou to French King Philip Augustus at the Battle of Bouvines (1214), proving he was an extortionate, militarily inept monarch.",
      ],
    },
    {
      match: /Clauses 39 and 40|Magna Carta/i,
      hinge_question:
        'In 1215, who counted as a "free man" under Clause 39, and what does this reveal about whether Magna Carta protected ordinary peasants?',
      discussion_ideas: [
        "While Clause 39—proclaiming that 'No free man shall be seized or imprisoned... except by the lawful judgment of his equals or by the law of the land'—became the immortal cornerstone of habeas corpus and modern constitutional democracy, in 1215 it was strictly an aristocratic peace treaty. In the thirteenth century, 'free men' (liber homo) comprised less than 20% of England’s population, consisting solely of noble barons, knights, and wealthy urban burgesses. Over 80% of English people were unfree serfs and villeins tied to their lord’s manor, possessing no independent legal standing in the King's courts; serfs remained subject to the arbitrary will, floggings, and forced labor of the very feudal barons who forced John to seal the charter at Runnymede, proving Magna Carta was initially designed to protect aristocratic feudal privileges against the Crown rather than grant universal human rights.",
      ],
    },
  ],

  // LESSON 5: The Black Death (1348) & The Peasants’ Revolt (1381): How did plague and rebellion shatter feudalism?
  lesson_5: [
    {
      match: /Statute of Labourers/i,
      hinge_question:
        'Why did the Statute of Labourers fail in practice, and how did it pave the way for rebellion thirty years later?',
      discussion_ideas: [
        "The Economic Inevitability of Supply and Demand: By killing between 40% and 50% of England's population between 1348 and 1350, the Black Death created a catastrophic labor shortage: crops rotted in fields for lack of reapers. When Parliament passed the 1351 Statute attempting to freeze wages at pre-plague 1346 levels and punish mobile workers, it failed because wealthy landlords secretly offered higher cash wages, free food, and reduced labor duties to lure desperately needed workers from rival manors, rendering royal statutory price controls impossible to enforce.",
        "Brewing Simmering Working-Class Rage: For thirty years, local magistrates weaponized the statute to fine, brand with hot irons, and imprison farmworkers who negotiated higher wages or tried to leave their lords' estates; this persistent, humiliating legal repression, compounded by the imposition of three regressive Poll Taxes between 1377 and 1381, built up an explosive reservoir of working-class grievance that detonated into the violent Peasants' Revolt of 1381.",
      ],
    },
    {
      match: /Death of Wat Tyler|Froissart/i,
      hinge_question:
        'Was Richard II’s promise of freedom at Smithfield a genuine act of youthful mercy or calculated political deceit?',
      discussion_ideas: [
        "Fourteen-year-old Richard II's intervention at Smithfield on 15 June 1381 was a masterclass in ruthless, calculated political deception. After Lord Mayor William Walworth drew his sword and fatally slashed rebel leader Wat Tyler, the 30,000 armed peasant rebels drew their bows, ready to slaughter the royal party. Displaying extraordinary coolness, Richard rode directly out toward the furious archers, shouting 'I am your captain and your king; follow me into the field, and you shall have all that you desire!' He promised to abolish serfdom, grant land at four pence an acre, and grant royal charters of pardon. Yet the moment the peasant host dispersed peacefully back to Kent and Essex, Richard mobilized a royal army of 4,000 knights, revoked all promised charters, and sent gallows judges across the south to hang over 500 rebel leaders, coldly telling a deputation of peasants: 'Villeins you were, and villeins you shall remain; in bondage you shall abide, not such as you have known, but incomparably harsher!'",
      ],
    },
  ],
};

async function main() {
  console.log('🚀 Starting Medieval England Enrichment...');

  // Load from data.js
  const fileUrl = pathToFileURL(dataJsPath).href;
  const dataModule = await import(fileUrl);
  const unitData = dataModule.default || dataModule.unitData;

  let totalSourcesUpdated = 0;
  let totalNarrativeUpdated = 0;

  unitData.lessons.forEach((l) => {
    const rules = MEDIEVAL_PEDAGOGY[l.id];
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
    `\n🎉 Total sources updated across Medieval England: ${totalSourcesUpdated} in l.sources, ${totalNarrativeUpdated} in narrative_blocks`,
  );

  // 1. Write back to units/medieval_england/data.js
  const serialized = JSON.stringify(unitData, null, 2);
  const jsContent = `const unitData = ${serialized};\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/medieval_england/data.js');

  // 2. Write to public/data/medieval_england.json
  const pubData = { id: 'medieval_england', data: unitData };
  fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
  console.log('✅ Successfully updated public/data/medieval_england.json');

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.medieval_england) {
      db.medieval_england.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated medieval_england in public/database.json');
    }
  }

  console.log('\n🏁 Completed Medieval England enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});

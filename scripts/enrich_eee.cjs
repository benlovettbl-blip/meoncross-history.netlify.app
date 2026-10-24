const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'eee', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'eee.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const EEE_PEDAGOGY = {
  // LESSON 1.1: The Situation on Elizabeth’s Accession, 1558
  lesson_1_1: [
    {
      match: /Coronation Portrait|Elizabeth I Coronation/i,
      hinge_question:
        'How did Elizabeth use royal portraits like the Coronation Portrait to project divine authority and overcome early doubts about female rule?',
      discussion_ideas: [
        "In sixteenth-century patriarchal England, female rule was widely viewed as unnatural and politically fragile—a prejudice famously voiced in John Knox's contemporary polemic 'The First Blast of the Trumpet Against the Monstruous Regiment of Women'. Elizabeth countered these doubts by commissioning coronation iconography that fused imperial majesty with sacred legitimacy: depicted crowned with flowing virgin hair (symbolizing purity and dedication to the realm), clad in opulent cloth-of-gold robes, and holding the orb and sceptre, the portrait presented her as God's chosen sovereign, deliberately projecting sacred royal permanence and mystical majesty rather than mortal female vulnerability.",
      ],
    },
    {
      match: /Cecil|Burghley/i,
      hinge_question:
        'Why did Elizabeth’s appointment of moderate, experienced advisers like William Cecil prove critical in stabilising her royal government in 1558?',
      discussion_ideas: [
        'Administrative Competence and Financial Discipline: As Principal Secretary and later Lord Burghley, Cecil brought seasoned bureaucratic expertise and financial prudence to the Crown, inheriting a crippling debt of £300,000 from Mary I and systematically reforming customs revenue collection, recoining the debased silver currency, and restoring royal credit on the Antwerp financial exchange.',
        'Political Moderation and Protestant Realpolitik: While deeply Protestant, Cecil was a cautious pragmatist who actively restrained religious zealots on both extremes and advised Elizabeth to avoid premature foreign military entanglements with Catholic superpowers (Spain and France), ensuring the fledgling regime avoided religious civil war during its vulnerable formative months.',
      ],
    },
  ],

  // LESSON 1.2: The 'Settlement' of Religion, 1559
  lesson_1_2: [
    {
      match: /Act of Supremacy/i,
      hinge_question:
        "Why was the compromise title of 'Supreme Governor' chosen instead of 'Supreme Head' to reassure both Catholic traditionalists and Puritan reformers?",
      discussion_ideas: [
        "Henry VIII had claimed the title 'Supreme Head' of the Church of England, which deeply alienated Catholics who held that only the Pope in Rome could be head of Christ's earthly church, while also offending strict Calvinists and Marian exiles who believed that no mortal monarch—and especially no woman—could claim spiritual headship over Christ. By adopting the compromise title 'Supreme Governor' via the 1559 Act of Supremacy, Elizabeth asserted practical administrative supremacy over ecclesiastical courts, clerical appointments, and church law without claiming direct spiritual or theological authority, enabling moderate Catholics to swear the Oath of Supremacy with an easier conscience while reassuring Protestant reformers.",
      ],
    },
    {
      match: /Book of Common Prayer|Prayer Book/i,
      hinge_question:
        "How did the deliberate ambiguity of the 1559 Prayer Book reflect Elizabeth’s desire 'not to make windows into men’s souls'?",
      discussion_ideas: [
        "Theological Compromise on the Eucharist: The 1559 Communion liturgy ingeniously fused the traditional 1549 wording (which implied the real bodily presence of Christ, comforting traditional Catholics) with the strictly symbolic 1552 Protestant wording ('take and eat this in remembrance that Christ died for thee'), allowing churchgoers of opposing theological convictions to interpret the sacrament according to their own conscience.",
        'Ceremonial Continuity and Social Stability: By retaining traditional clerical vestments, kneeling for communion, and familiar church furnishings from the 1549 Edwardian prayer book via the Ornaments Rubric, the settlement preserved familiar sensory continuity for the conservative rural majority, prioritizing outward civic obedience and regular church attendance over rigid internal doctrinal orthodoxy.',
      ],
    },
  ],

  // LESSON 1.3: Challenge to the Religious Settlement
  lesson_1_3: [
    {
      match: /Regnans in Excelsis|Papal Bull/i,
      hinge_question:
        'Why did Pope Pius V’s papal bull in 1570 make it impossible for English Catholics to remain loyal to both their church and their queen?',
      discussion_ideas: [
        'Theological Release from Civic Fealty: Pope Pius V formally excommunicated Elizabeth as a heretic and declared her throne forfeit, explicitly releasing all English Catholic subjects from their oaths of allegiance and commanding them under pain of anathema not to obey her laws or royal magistrates.',
        "Transformation of Faith into High Treason: Prior to 1570, the Elizabethan regime had largely tolerated quiet Catholic recusancy through manageable 12-penny church absence fines; 'Regnans in Excelsis' forced Catholics into an impossible dilemma where practicing their traditional faith was now legally and politically equated with plotting the armed overthrow of the Crown, sparking severe treason legislation and intense state surveillance.",
      ],
    },
    {
      match: /Campion|Jesuit/i,
      hinge_question:
        'Why did the Elizabethan government treat Jesuit missionaries like Edmund Campion as political traitors rather than religious dissidents?',
      discussion_ideas: [
        "Although Edmund Campion insisted upon his arrest in 1581 that his mission was purely spiritual—administering the sacraments and reclaiming souls for Rome rather than meddling in temporal state politics—the Elizabethan regime viewed all seminary and Jesuit priests through the prism of national security. Because the 1570 Papal Bull had declared Elizabeth a tyrant and commanded her deposition, the Privy Council, led by William Cecil and Francis Walsingham, argued that any priest loyal to the Papacy was effectively a foreign agent sent to mobilize a fifth column of Catholic conspirators to support Spanish invasion. Consequently, under the 1581 Act to Retain the Queen's Majesty's Subjects in Their Due Obedience, converting Englishmen to Catholicism was defined as high treason, and Campion was tried and executed not for theological heresy, but as a traitor plotting against the life of the Queen.",
      ],
    },
  ],

  // LESSON 1.4: The Problem of Mary, Queen of Scots, 1568–69
  lesson_1_4: [
    {
      match: /Mary, Queen of Scots|Mary Stuart/i,
      hinge_question:
        'Why did Mary, Queen of Scots’ arrival in England in 1568 present Elizabeth with an impossible political and legal dilemma?',
      discussion_ideas: [
        'The Danger of Setting a Precedent Against Anointed Monarchy: If Elizabeth put Mary on public trial for the murder of Lord Darnley or extradited her back to Scottish Protestant rebels, she would violate the sacred doctrine of the Divine Right of Kings and establish the dangerous legal precedent that rebellious subjects could put their lawful, anointed monarch on trial and execute them.',
        "The Threat of an Active Catholic Focal Point: If Elizabeth allowed Mary to travel abroad to Catholic France or live freely in England, Mary's legitimate blood claim to the English crown (as Henry VII's great-granddaughter) would serve as a permanent magnetic rallying point for English Catholic plotters and Spanish or French invasion forces seeking to depose the excommunicated Protestant queen.",
      ],
    },
    {
      match: /Walsingham|Spymaster/i,
      hinge_question:
        'Why was Francis Walsingham so determined to convince a reluctant Elizabeth to place Mary, Queen of Scots on trial for high treason?',
      discussion_ideas: [
        "As Elizabeth's Secretary of State and intelligence chief, Sir Francis Walsingham was convinced that as long as Mary Stuart lived, Elizabeth remained in mortal danger of assassination. Repeated Catholic conspiracies—from the Northern Earls (1569) and the Ridolfi Plot (1571) to the Throckmorton Plot (1583)—all centered on assassinating Elizabeth to crown Mary with Spanish military backing. Walsingham recognized that Elizabeth was emotionally and philosophically reluctant to sanction the execution of a royal cousin and fellow anointed monarch; he therefore established an elaborate double-agent network and mail interception operation to trap Mary into giving direct written authorization for Elizabeth's murder, creating incontrovertible legal proof of high treason that left Elizabeth with no political alternative but to sign Mary's death warrant.",
      ],
    },
  ],

  // LESSON 2.1: Plots and Revolts at Home, 1569–1587
  lesson_2_1: [
    {
      match: /Throckmorton/i,
      hinge_question:
        'How did the discovery of the Throckmorton Plot lead directly to Parliament creating the Bond of Association in 1584?',
      discussion_ideas: [
        "In 1583, Walsingham's spy network uncovered a conspiracy organized by Catholic aristocrat Francis Throckmorton, which planned a French Catholic invasion led by the Duke of Guise, financed by Philip II of Spain and the Pope, to assassinate Elizabeth and place Mary, Queen of Scots on the throne. The discovery of papers in Throckmorton's home detailing suitable invasion harbors (such as Arundel) and lists of sympathetic Catholic nobles terrified the Privy Council. In response to the chilling realization that Elizabeth's assassination would immediately elevate Mary to the throne, William Cecil and Francis Walsingham drafted the Bond of Association (1584): a nationwide public oath requiring all signatories to track down, execute, and extinguish anyone who attempted Elizabeth's assassination, as well as anyone on whose behalf the plot was undertaken (directly targeting Mary Stuart even if she was unaware of the plot).",
      ],
    },
    {
      match: /Babington/i,
      hinge_question:
        'Why was Mary’s written reply to Babington’s letter the decisive piece of evidence Walsingham needed to secure her death warrant?',
      discussion_ideas: [
        "In previous plots (such as Ridolfi and Throckmorton), Mary had maintained plausible deniability, claiming that conspiracies were mounted in her name by overzealous supporters without her personal knowledge or consent. In 1586, Walsingham's double-agent Gilbert Gifford intercepted letters between Mary (held at Chartley Manor) and Catholic plotter Anthony Babington, who outlined a plan to assassinate Elizabeth ('the dispatch of the usurper') alongside a Spanish invasion. When Mary wrote back on 17 July 1586 detailing exact instructions for her rescue and explicitly approving the assassination scheme, cryptographer Thomas Phelippes decoded the letter and added a gallows mark. Mary's direct, handwritten endorsement of Elizabeth's murder provided the incontrovertible proof of high treason required under the 1585 Act for the Queen's Safety, disarming Elizabeth's legal objections and sealing Mary's execution at Fotheringhay Castle.",
      ],
    },
  ],

  // LESSON 2.2: Relations with Spain, 1569–1585
  lesson_2_2: [
    {
      match: /Dudley|Leicester/i,
      hinge_question:
        'Why did Elizabeth resist Dudley’s calls for direct war with Spain in the Netherlands for so many years before 1585?',
      discussion_ideas: [
        'Financial Vulnerability and War Costs: England lacked a standing army and possessed fragile royal revenues; open war against Philip II—the ruler of the vast Spanish Empire and the wealthy Americas—threatened to bankrupt the English Crown and disrupt vital cloth export markets in Antwerp.',
        'Reluctance to Support Rebels Against Anointed Sovereigns: Elizabeth held a conservative belief in royal legitimacy and abhorred the idea of aiding Dutch Protestant subjects in an armed rebellion against their lawful feudal ruler, fearing it would legitimize Catholic rebellions against her own rule in England or Ireland.',
      ],
    },
    {
      match: /Drake.*Privateer|Francis Drake.*Privateer/i,
      hinge_question:
        'How did Drake’s state-backed piracy against Spanish treasure fleets push Philip II and Elizabeth toward open war?',
      discussion_ideas: [
        "Direct Economic Devastation of Spanish Imperial Revenue: Drake's raids across the Spanish Main and Pacific coast—culminating in the capture of the treasure galleon Nuestra Señora de la Concepción (Cacafuego) carrying £140,000 in silver and jewels—severely disrupted Philip II's imperial finances and his ability to pay the Spanish Army of Flanders in the Netherlands.",
        "Humiliation of Spanish Sovereignty and Elizabeth's Defiance: By knighting Drake aboard the Golden Hind at Deptford in 1581 rather than hanging him as a pirate as Spain demanded, Elizabeth publicly claimed a share of the plunder and openly defied Philip II, convincing the Spanish king that England's Protestant regime was an intolerable commercial and religious threat that had to be eliminated by naval invasion.",
      ],
    },
  ],

  // LESSON 2.3: The Outbreak of War with Spain, 1585–1588
  lesson_2_3: [
    {
      match: /Cadiz|Singeing/i,
      hinge_question:
        "Why did Drake describe his raid on Cadiz as 'singeing the King of Spain’s beard', and how did it give England vital time to prepare for invasion?",
      discussion_ideas: [
        "In April 1587, Sir Francis Drake led a pre-emptive strike into the Spanish port of Cadiz, sinking or capturing between 24 and 37 Spanish naval vessels, destroying tons of provisions, and sailing along the Portuguese coast to intercept transport ships carrying seasoned barrel staves. Drake referred to this insolent strike as 'singeing the King of Spain's beard'—a humiliating, stinging insult rather than a fatal blow. Crucially, the destruction of seasoned wood forced the Spanish to construct fresh, unseasoned barrel staves for the Armada's food and water supplies, which later rotted meat and spoiled drinking water at sea. Most importantly, the raid delayed the launching of the Spanish Armada by more than a full year, granting England precious time to manufacture guns, train coastal militias, and construct race-built warships.",
      ],
    },
    {
      match: /Tilbury|Speech to the Troops/i,
      hinge_question:
        'How did Elizabeth use the Tilbury speech to transform the gender liability of being a female monarch into a source of national inspiration?',
      discussion_ideas: [
        "Transcending Physical Gender Through Royal Valor: By declaring 'I know I have the body of a weak and feeble woman, but I have the heart and stomach of a king, and of a king of England too', Elizabeth brilliantly turned sixteenth-century patriarchal prejudice on its head, presenting her physical vulnerability as secondary to her divinely bestowed, unconquerable royal spirit.",
        "Shared Sacrifice and National Solidarity: Appearing in warrior attire—wearing a silver breastplate over a white velvet dress and riding a white horse among her troops—she declared her willingness to 'live and die amongst you all' and 'lay down for my God, and for my kingdom, and my people, my honour and my blood, even in the dust', inspiring extraordinary patriotic unity against foreign Catholic tyranny.",
      ],
    },
  ],

  // LESSON 2.4: The Spanish Armada: Strategy, Conflict & Defeat, 1588
  lesson_2_4: [
    {
      match: /Gravelines|Fireships/i,
      hinge_question:
        'Why did the fireship attack at Calais prove the decisive tactical turning point in the defeat of the Spanish Armada?',
      discussion_ideas: [
        "On the night of 7–8 August 1588, Lord Howard of Effingham dispatched eight burning 'hell-burners' (fireships packed with pitch and gunpowder) into the tightly packed, crescent-shaped Spanish Armada anchored off Calais. Panic spread through the Spanish fleet, fearing deadly exploding hulks; the Spanish captains cut their anchor cables, broke their defensive crescent formation, and scattered into the dark North Sea. Lacking anchors to hold position and separated from each other, the Spanish could not rendezvous with the Duke of Parma's invasion army waiting in the Netherlands. The next morning at the Battle of Gravelines, English race-built galleons exploited the disorganized Spanish line, using rapid broadsides of long-range culverin cannon to batter Spanish ships without allowing them to close for boarding, forcing the surviving Armada to flee into the stormy North Sea around Scotland and Ireland.",
      ],
    },
    {
      match: /Armada Portrait/i,
      hinge_question:
        'How does the symbolism in the Armada Portrait present Elizabeth’s victory as both divinely ordained and the start of global empire?',
      discussion_ideas: [
        "Divine Intervention and Moral Righteousness: In the background windows, the painting contrasts the threatening Spanish Armada on the left with the shattered Spanish fleet wrecked upon rocks by the 'Protestant Wind' on the right, echoing the contemporary medal inscribed 'God blew and they were scattered' (Afflavit Deus et dissipati sunt), framing the victory not as mere military luck, but as God's divine judgment against Spanish Catholic tyranny.",
        "Global Imperial Ambition: Elizabeth's right hand rests confidently atop a desktop globe, her fingers deliberately covering North America; adorned with pearls symbolizing purity and an imperial crown behind her, the portrait announces that England has superseded Spain as a global maritime empire, destined to colonize the New World and dominate world trade.",
      ],
    },
  ],

  // LESSON 3.1: Education and Leisure in Elizabethan England, 1558–1588
  lesson_3_1: [
    {
      match: /Royal Procession|Progresses/i,
      hinge_question:
        "Why were summer 'progresses' so essential for maintaining royal popularity and bonding the Queen with provincial English society?",
      discussion_ideas: [
        'Direct Popular Visibility and Royal Legitimacy: In an era without mass media, summer progresses allowed ordinary yeomen, townsfolk, and rural peasants outside London to see their monarch in the flesh; Elizabeth deliberately rode in open carriages, accepted handmade gifts and petitions, and greeted crowds with warm pageantry, cultivating an image of a loving mother accessible to all her people.',
        'Political and Financial Control Over the Aristocracy: Progresses enabled Elizabeth to stay at the lavish country estates of her nobility (such as Kenilworth or Theobalds). Hosting the royal court for weeks cost aristocratic hosts thousands of pounds, simultaneously bankrupting potential rebel nobles while forcing them to publicly compete for royal favor and display their loyalty to the Crown.',
      ],
    },
    {
      match: /Swan Theatre|de Witt/i,
      hinge_question:
        'Why did Elizabethan playhouses appeal equally to working-class groundlings and wealthy aristocrats in private galleries?',
      discussion_ideas: [
        "Democratic Architecture and Affordable Pricing: Playhouses like the Swan and Globe were amphitheaters accommodating over 2,000 spectators with a strictly tiered admission system: apprentices and laborers paid just one penny to stand in the open yard as 'groundlings', while gentry and nobles paid two or three pence for cushioned seats in covered galleries or the Lords' Room, uniting diverse social classes under one roof.",
        'Multilayered Playwriting and Shared Cultural Entertainment: Renaissance dramatists (including Shakespeare and Marlowe) crafted plays containing broad physical comedy, bawdy humor, and sword fights for the groundlings, alongside sophisticated philosophical debates, classical mythology, and political allegories for educated aristocrats, making theatre the premier national art form.',
      ],
    },
  ],

  // LESSON 3.2: The Problem of the Poor and Vagrancy, 1558–1588
  lesson_3_2: [
    {
      match: /Caveat for Common Cursitors|Harman/i,
      hinge_question:
        "Why did Elizabethan society distinguish so sharply between the 'deserving poor' (impotent) and 'idle vagabonds' (sturdy beggars)?",
      discussion_ideas: [
        "Christian Charity for the Impotent Poor: The 'deserving poor'—orphans, the elderly, the sick, and injured soldiers—were seen as victims of unfortunate misfortune outside their personal control, deserving local parish Christian charity, food, and sheltered relief in almshouses.",
        "Moral Outrage and Social Threat of Vagabonds: 'Sturdy beggars' and vagrants—able-bodied individuals without master or land—were feared as dangerous criminals, thieves, and potential rebels who chose idleness over honest labor; popular literature like Thomas Harman's Caveat sensationalized their secret slang ('canting') and elaborate begging scams, justifying brutal corporal punishment (whipping, ear-boring, and hanging for repeat offenders).",
      ],
    },
    {
      match: /Poor Law Statute|Poor Law of 1601/i,
      hinge_question:
        'Why did the 1601 Poor Law represent a radical change from treating poverty as a criminal failure to a civic parish duty?',
      discussion_ideas: [
        "Prior to the late sixteenth century, English statutes treated poverty primarily as a personal moral failure and criminal disorder to be repressed with whipping posts, stocks, and vagrancy acts. The Act for the Relief of the Poor (1601) marked a revolutionary philosophical transition by recognizing that widespread poverty and unemployment were structural economic problems—caused by population growth, bad harvests, enclosure, and the collapse of the Antwerp cloth trade—rather than mere individual laziness. The statute made poverty relief a statutory legal obligation administered by local parishes: Overseers of the Poor were empowered to levy a compulsory local tax ('poor rate'), build houses of correction for the idle, provide raw materials (flax, wool, hemp) to put the able-bodied to work, apprentice poor children, and provide weekly pensions and almshouses for the impotent poor. This established England's state-administered social welfare system that endured for over two centuries.",
      ],
    },
  ],

  // LESSON 3.3: Exploration and Voyages of Discovery, 1558–1588
  lesson_3_3: [
    {
      match: /Naval Galleons|Hawkins/i,
      hinge_question:
        'How did technological innovations in ship design (like John Hawkins’ race-built galleons) give English explorers and commanders a decisive advantage at sea?',
      discussion_ideas: [
        "In the 1570s and 1580s, Treasurer of the Navy Sir John Hawkins radically transformed English naval architecture by introducing 'race-built' galleons (such as Drake's flagship Revenge). By dismantling high, top-heavy forecastles and sterncastles, lowering the deck profiles, lengthening the keel, and narrowing the hull, Hawkins created warships that were significantly faster, more agile, and able to sail closer to the wind than cumbersome Spanish floating fortresses. Crucially, Hawkins redesigned the gun decks with heavy broadsides of long-range brass culverins mounted on compact, four-wheeled trucks, allowing English gun crews to reload and fire rapid broadsides at distance, turning naval warfare from an infantry boarding contest into a modern artillery duel that decimated the Spanish Armada at Gravelines.",
      ],
    },
    {
      match: /Circumnavigating|Drake Circumnavigat/i,
      hinge_question:
        'Why was Drake’s return from his circumnavigation in 1580 celebrated as both a financial triumph and a symbol of national prestige?',
      discussion_ideas: [
        "Staggering Financial Return for Crown and Investors: Drake's ship the Golden Hind returned to Plymouth laden with an astronomical haul of captured Spanish silver, gold, pearls, and spices worth over £400,000 (more than the entire annual revenue of the English Crown), paying a 4,700% dividend to investors and allowing Elizabeth to pay off the national foreign debt and invest in foreign trade companies.",
        "National Pride and Oceanic Mastery: As the first Englishman—and only the second commander in world history—to successfully navigate the globe and survive, Drake shattered the myth of Spanish and Portuguese maritime invincibility, claiming 'Nova Albion' (California) for Elizabeth and establishing England as a daring, global seafaring power.",
      ],
    },
  ],

  // LESSON 3.4: Raleigh and the Colonisation of Virginia, 1584–1590
  lesson_3_4: [
    {
      match: /Raleigh|Coloniser/i,
      hinge_question:
        'Why did Walter Raleigh rely on wealthy private investors and royal charters rather than government funding to establish English colonies in America?',
      discussion_ideas: [
        'Royal Financial Caution and Absence of State Budgets: The Elizabethan state lacked a modern tax system or public treasury dedicated to overseas empire building; Elizabeth was notoriously parsimonious and refused to risk Crown funds on speculative colonial ventures, preferring instead to grant royal patents (charters) granting Raleigh a monopoly over newly discovered lands in exchange for a fifth of all gold and silver discovered.',
        'Commercial Joint-Stock Enterprise and Merchant Capital: Raleigh mobilized private capital from wealthy courtiers, London merchants, and gentry who were motivated by the promise of privateering bases against Spanish treasure ships, discovering precious metals, and finding new markets for English wool, pioneering the joint-stock model of capitalist enterprise that later powered the East India Company and Jamestown.',
      ],
    },
    {
      match: /Roanoke|John White/i,
      hinge_question:
        'What critical geographic and climatic factors made the Roanoke settlement site so vulnerable to famine and indigenous conflict?',
      discussion_ideas: [
        "John White's cartography reveals that Roanoke Island (situated off the coast of modern North Carolina) was protected by treacherous, shallow barrier islands (the Outer Banks) and shifting sandy shoals that prevented deep-draught English ocean vessels from anchoring safely near the settlement; during landing, Raleigh's flagship Tiger struck a sandbar, ruining the colonists' seed grain and food supplies in sea water. Geographically isolated and lacking freshwater springs, the small island had sandy, infertile soil that could not support 100 settlers during the severe regional drought of 1587 without food aid from the local Secotan tribe. When English commanders retaliated aggressively against local Native Americans over a stolen silver cup and killed their chief Wingina, they destroyed indigenous trade relationships, leaving the stranded colony defenseless against starvation and isolation.",
      ],
    },
  ],
};

async function main() {
  console.log('🚀 Starting Early Elizabethan England (eee) Enrichment...');

  // Load from data.js
  const fileUrl = pathToFileURL(dataJsPath).href;
  const dataModule = await import(fileUrl);
  const unitData = dataModule.default || dataModule.unitData;

  let totalSourcesUpdated = 0;
  let totalNarrativeUpdated = 0;

  unitData.lessons.forEach((l) => {
    const rules = EEE_PEDAGOGY[l.id];
    if (!rules) return;

    console.log(`\nWiring ${l.id} (${l.title})...`);

    function matchRule(s) {
      const textToMatch = [s.title, s.id, s.caption, s.source_context].filter(Boolean).join(' ');
      return rules.find((r) => r.match.test(textToMatch));
    }

    // 1. Update l.sources
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
        console.warn(`  ⚠️ [l.sources ${idx}] No match for: "${s.title}" (id=${s.id})`);
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
    `\n🎉 Total sources updated across EEE: ${totalSourcesUpdated} in l.sources, ${totalNarrativeUpdated} in narrative_blocks`,
  );

  // 1. Write back to units/eee/data.js
  const serialized = JSON.stringify(unitData, null, 2);
  const jsContent = `// Early Elizabethan England, 1558–88 Unit Data\nexport const unitData = ${serialized};\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/eee/data.js');

  // 2. Write to public/data/eee.json
  const pubData = { id: 'eee', data: unitData };
  fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
  console.log('✅ Successfully updated public/data/eee.json');

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.eee) {
      db.eee.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated eee in public/database.json');
    }
  }

  console.log('\n🏁 Completed Early Elizabethan England enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});

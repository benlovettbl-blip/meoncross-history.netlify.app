/**
 * History Revision Hub — Publisher-Level Standard Textbook Engine
 *
 * Target: Early Elizabethan England, 1558–1588 (Key Topic 3)
 * Output: public/pdfs/eee_textbook_KT3_PUBLISHER.pdf
 * HTML:   public/units/eee/textbook_KT3_PUBLISHER.html
 *
 * Architectural Standards Enforced:
 * 1. ZERO AI Fluff & Zero Theatrical Jargon.
 * 2. Official Specification Primacy: Header, cover matrix & lesson banners feature authentic Pearson Edexcel 1HI0/B4 spec.
 * 3. Base64 Image Inlining: All archival photos & portraits embedded directly as Data URIs.
 * 4. Master 87mm Photographic Plate on Front Cover: Authentic Roanoke Colony Plate (1590).
 * 5. Official 4-Column Pearson Edexcel Specification Coverage Matrix on Front Cover with 4-Stage Causal Sequences.
 * 6. Specification Accuracy: Feature questions strictly Q1(a) [2m] and Q1(b) [2m] (never "describe two features").
 * 7. Christine Counsell Disciplinary Narrative Standard: Rich dramatic storytelling with social tension, exploration intrigue, and human dilemmas.
 * 8. Zero Whitespace Voids: Pages 10, 11, and 12 completely redesigned to be dense, publisher-grade, and 98% space-utilized.
 * 9. Exact 12-Page Budget (Zero Orphans, Zero Blank Pages, Exactly 3 Folded A3 Sheets):
 *    - Page 1:  Master Front Cover (87mm uncropped plate, 4-column spec matrix, 4 Causal Sequence cards)
 *    - Page 2:  KT 3.1 Education and Leisure - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 3:  KT 3.1 Education and Leisure - Recto (Sections 3 & 4 + Burbage + Theatre Architecture + Enquiry Deck)
 *    - Page 4:  KT 3.2 The Problem of the Poor - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 5:  KT 3.2 The Problem of the Poor - Recto (Sections 3 & 4 + Harman + Welfare Divide + Enquiry Deck)
 *    - Page 6:  KT 3.3 Exploration & Discovery - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 7:  KT 3.3 Exploration & Discovery - Recto (Sections 3 & 4 + Hawkins + Nova Albion + Enquiry Deck)
 *    - Page 8:  KT 3.4 Raleigh and Virginia - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 9:  KT 3.4 Raleigh and Virginia - Recto (Sections 3 & 4 + Raleigh + Roanoke Failure Anatomy + Enquiry Deck)
 *    - Page 10: Key Topic 3 Thematic Synoptic Matrix, Historiographical Debate & Causal Turning Points
 *    - Page 11: Edexcel Paper 2 Section B Exam Masterclass (Q1(a) [2m], Q1(b) [2m], Q2 [12m], Q3 [16m+4SPaG])
 *    - Page 12: Master Back Cover (14-Row Chronological Sequence, Terminology, AO Blueprint, Exam Timing Guide, QR Hub)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');

/**
 * Robust Base64 Image Inliner
 */
function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'eee', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'eee', 'assets', 'portraits', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'eee', 'assets', 'banners', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'eee', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const buf = fs.readFileSync(cand);
      return `data:${mime};base64,${buf.toString('base64')}`;
    }
  }
  console.warn(`[WARN] Image not found on disk: ${relPath}`);
  return null;
}

function formatText(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

async function buildPublisherTextbookHtmlKT3() {
  const { KEY_TOPICS_DATA } = require('./render_eee_twopage_workbook.cjs');
  const ktWorkbookData = KEY_TOPICS_DATA.KT3;
  const getKt3Data = require('./eee_textbook_data_kt3.cjs');
  const ktData = getKt3Data({ getBase64Image });
  const { coverConfig, componentBank, leftSources, leftVocab } = ktData;

  const quizUrl = 'https://the-history-revision-hub.netlify.app/?unit=eee&quiz=true&lesson=3';
  const qrDataUrl = await QRCode.toDataURL(quizUrl, {
    width: 140,
    margin: 1,
    color: { dark: '#0f172a', light: '#ffffff' },
  });

  const coverImgData =
    getBase64Image(coverConfig.coverImage) || getBase64Image('images/roanoke_colony.jpg');

  // Helper for rendering Archival Source Boxes (Paper 2 authentic primary written records)
  const renderArchivalSourceBox = (src) => {
    if (!src || !src.title) return '';
    return `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">PRIMARY RECORD</span>
            <span class="source-type">${src.type}</span>
          </div>
          <span class="source-date-micro">${src.date}</span>
        </div>
        <div class="archival-title">${src.title}</div>
        ${
          src.quote
            ? `
          <div class="archival-source-quote">
            &ldquo;${src.quote}&rdquo;
          </div>
        `
            : ''
        }
        ${src.image ? `<img class="archival-image" src="${src.image}" alt="${src.title}">` : ''}
        <div class="archival-context-box">
          <p class="archival-context-text">${src.context}</p>
          <div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>${src.hingeQuestion}</em></div>
        </div>
      </div>
    `;
  };

  // Enriched, authoritative Pearson-aligned narrative chapters with Christine Counsell dramatic drive
  const lessons = [
    // Lesson 1: KT 3.1 (Education and Leisure, 1558–1588)
    {
      num: 1,
      code: 'KT 3.1',
      title: 'Education and Leisure in Elizabethan England, 1558–1588',
      enquiry:
        'How did Renaissance humanism reshape schooling and university education, and why did the emergence of the public theatre democratise popular culture?',
      specRef: '1HI0/B4 &bull; Key Topic 3.1',
      sec1: {
        num: 1,
        title: 'The Humanist Revolution: Grammar Schools & Social Mobility',
        paras: [
          `During the reign of Elizabeth I, Renaissance humanist philosophy fundamentally transformed English attitudes toward education. Education was increasingly prized not merely for training Catholic clergymen, but as an indispensable instrument of civic duty, commercial enterprise, and effective Tudor administration. Although no universal state education system existed, opportunities expanded dramatically across the social spectrum. For young boys aged four to seven, <strong>'petty schools'</strong> (often conducted in private homes by literate parish dames or church clerics) provided foundational literacy in English and basic arithmetic. Bright boys from merchant, yeoman, and gentry families then progressed to grammar schools, where seventy-two new institutions were established under Elizabeth.`,
          `The grammar school regimen was intensely demanding and rigorous. Schoolboys attended from <strong>6:00 am to 5:30 pm</strong> six days a week, subjected to harsh discipline and corporal punishment via the birch rod for tardiness or speaking English. The curriculum focused almost exclusively on classical languages: Latin grammar, Greek, classical literature (Cicero, Virgil, Seneca), and rhetoric. Boys memorized thousands of Latin phrases and engaged in formal debating to develop eloquence and logical reasoning.`,
          `This educational explosion fostered a new, highly ambitious <strong>'middling sort'</strong> of literate citizens—yeoman farmers, merchants, attorneys, and borough aldermen. While literacy across the entire kingdom remained socially stratified (rising to roughly 30% of men in London, but remaining far lower among rural labourers), grammar schools opened pathways to social advancement based on intellectual ability rather than inherited noble blood, supplying the Crown with loyal, educated civil servants.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'Elite Tutors, Gender Divide & The Inns of Court',
        paras: [
          `Beyond grammar schools, educational opportunities mirrored the rigid hierarchy of Elizabethan gender and social rank. Girls from the nobility and wealthy gentry were educated entirely at home by private tutors. Their curriculum balanced classical languages with refined accomplishments: conversational French, Italian, needlework, lute-playing, dancing, and estate management. Queen Elizabeth herself was the supreme exemplar of the educated Renaissance woman, fluent in Latin, Greek, French, and Italian. However, for ordinary daughters of yeomen and labourers, formal schooling was virtually non-existent; girls were expected to master domestic spinning, brewing, dairy work, and childcare.`,
          `For young gentlemen, higher education expanded rapidly. Oxford and Cambridge universities grew, with new collegiate foundations established under royal patronage, including <strong>Jesus College, Oxford (1571)</strong>, specifically founded to train Welsh Protestant scholars. The university curriculum moved beyond medieval scholastic theology, incorporating humanist geometry, astronomy, and Greek philosophy.`,
          `Concurrently, thousands of sons of the landed gentry bypassed universities to attend the four <strong>Inns of Court</strong> in London (Gray's Inn, Lincoln's Inn, Inner Temple, Middle Temple). Here, young men studied English common law, parliamentary procedure, and political statecraft. This legal training prepared gentlemen to serve as local Justices of the Peace (JPs), county magistrates, and members of Parliament, forging an educated administrative elite that executed Crown directives across the English shires.`,
        ],
      },
      sec3: {
        num: 3,
        title: 'Feudal Sports & The Gruesome Thirst for Blood',
        paras: [
          `Elizabethan leisure pursuits reflected the stark divisions of social class while indulging an insatiable sixteenth-century appetite for violent spectacle. For the nobility and landed gentry, leisure was an exhibition of aristocratic martial prowess and refinement. Nobles engaged in deer hunting on vast private estates, hawking, formal fencing duels, and <strong>real tennis</strong> on indoor stone courts. Archery was compulsory by statute for all men aged sixteen to sixty on Sundays, preserving the traditional military skill of the English longbow.`,
          `For the labouring masses, leisure was boisterous, physically punishing, and communal. Parish youths played <strong>folk football</strong>—unregulated, violent contests between neighbouring villages where hundreds of men battled to kick a pig's bladder to a distant landmark. With no referee, rules, or pitch boundaries, matches frequently resulted in broken limbs, gouged eyes, and fatal drownings in village rivers.`,
          `The most popular mass entertainment across all social classes was blood sport: <strong>bear-baiting, bull-baiting, and cock-fighting</strong>. In Southwark, purpose-built baiting arenas holding up to 3,000 spectators pitted chained bears against packs of fierce mastiff dogs. Spectators bet vast sums on the outcomes, cheered on by crowds that included Queen Elizabeth and foreign ambassadors. The violence was viewed as exciting entertainment, reflecting a society where death and brutality were daily realities.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'The Rise of the Public Playhouse: From Inn-Yards to Bankside',
        paras: [
          `The crowning cultural achievement of the Elizabethan age was the rapid development of the secular <strong>commercial theatre</strong>. Previously, wandering troupes of actors performed religious mystery plays in tavern inn-yards. However, the Elizabethan regime strictly policed travelling actors: the 1572 Vagabonds Act classified unlicensed actors as common rogues, requiring theatrical companies to obtain formal licenses from noble patrons, creating celebrated companies like the Earl of Leicester's Men and the Lord Chamberlain's Men.`,
          `Puritan civic authorities in the City of London bitterly opposed theatrical performances, condemning them as breeding grounds for pickpockets, drunkenness, prostitution, and bubonic plague transmission. To escape the Lord Mayor’s jurisdiction, actor and master joiner <strong>James Burbage</strong> built London’s first permanent commercial playhouse, <strong>*The Theatre*</strong>, in Shoreditch in 1576. Success led to the construction of *The Curtain* (1577), *The Rose* (1587), *The Swan* (1595), and Burbage’s iconic <strong>*Globe Theatre* (1599)</strong> on Bankside.`,
          `Playhouses were revolutionary democratic spaces that brought together disparate social classes into a shared cultural experience. For a single copper penny, common <strong>'groundlings'</strong> stood in the open-air pit around the thrust stage; for twopence or threepence, affluent merchants and gentry sat in covered, cushioned galleries. Featuring the brilliant, dramatic masterpieces of Christopher Marlowe and William Shakespeare, the theatre projected English patriotic identity, reinforced Tudor political legitimacy, and created a vibrant national mythology.`,
        ],
      },
    },

    // Lesson 2: KT 3.2 (The Problem of the Poor and Vagrancy, 1558–1588)
    {
      num: 2,
      code: 'KT 3.2',
      title: 'The Problem of the Poor and Vagrancy, 1558–1588',
      enquiry:
        'Why did rural pauperism reach unprecedented crisis levels under Elizabeth, and how did state legislation transition from brutal punishment to structured social welfare?',
      specRef: '1HI0/B4 &bull; Key Topic 3.2',
      sec1: {
        num: 1,
        title: 'The Demographic Tidal Wave: Population, Inflation & Harvest Failure',
        paras: [
          `Throughout the Elizabethan era, England experienced an unprecedented crisis of poverty and vagrancy, driven by systemic economic forces beyond the control of ordinary peasants. The foundational driver was an explosive demographic expansion: England’s population surged by over <strong>35%</strong>, growing from approximately 2.8 million in 1558 to over 4 million by 1603. Because agricultural productivity remained bound to medieval techniques, the food supply failed to keep pace with soaring consumer demand.`,
          `As a direct consequence, food prices skyrocketed: grain prices more than doubled, triggering a catastrophic cost-of-living crisis. Ordinary farm labourers, whose wages remained virtually stagnant, saw their real purchasing power collapse by up to 50%. This structural inflation was exacerbated by Henry VIII’s earlier <strong>debasement of the coinage</strong>, which had permanently damaged the international purchasing power of English money.`,
          `Compounding this misery was a devastating sequence of <strong>bad harvests</strong> throughout the 1570s and 1580s, culminating in widespread rural starvation. Simultaneously, the European wool and cloth market collapsed: when war erupted in the Spanish Netherlands, the traditional export route through Antwerp was paralyzed, throwing thousands of English cloth workers, carders, and weavers out of work and into absolute destitution.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'Agrarian Upheaval: Enclosure, Rack-Renting & Rural Evictions',
        paras: [
          `These macroeconomic pressures were dramatically intensified in the countryside by the spread of agrarian <strong>enclosure</strong>. Traditional medieval agriculture relied on the open-field system, where peasant farmers cultivated scattered arable strips and shared common pasture land to graze their animals. In the sixteenth century, landed gentry and ambitious yeomen increasingly enclosed these lands with hedges and fences, consolidating holdings into large private estates.`,
          `Crucially, landlords converted arable crop farming into lucrative <strong>sheep pasture</strong>. Wool was substantially more profitable than cereal grain and required almost no manual labour: a single shepherd and his dogs could manage a flock of 2,000 sheep on land that had previously provided livelihoods and food for dozens of peasant tenant families. Common waste land was privatised, stripping poor cottagers of vital grazing and firewood rights.`,
          `Furthermore, landlords engaged in ruthless <strong>'rack-renting'</strong>—drastically hiking rents and entry fines to evict customary tenants who could not pay. Evicted families were cast adrift from their ancestral villages. Deprived of land and employment, thousands of desperate men, women, and children were forced to wander the highways as homeless 'vagabonds', drifting into overcrowded slums in London, Norwich, and Bristol in search of bread.`,
        ],
      },
      sec3: {
        num: 3,
        title: 'The Panic Over the Undeserving: Harman’s Rogues & Counterfeit Cranks',
        paras: [
          `To Elizabethan authorities, the sudden appearance of wandering paupers was not merely a tragic economic problem, but an existential threat to public order, property, and the <strong>Great Chain of Being</strong>. Rural communities lived in terror of wandering vagrant bands who might spread plague, steal livestock, or spark peasant rebellion. Elizabethan society drew a rigid moral divide between the <strong>'Deserving' or 'Impotent Poor'</strong> (the aged, sick, lame, and orphans physically incapable of work) and the <strong>'Undeserving' or 'Idle Poor'</strong> (able-bodied vagrants viewed as lazy, dishonest rogues).`,
          `This public panic was inflamed by sensationalist popular literature, most famously Thomas Harman’s 1567 pamphlet <strong>*A Caveat or Warning for Common Cursitors*</strong>. Harman claimed that vagabonds belonged to an organized criminal underworld with its own secret slang ('canting'). He documented 23 distinct types of fraudulent beggars, warning of <em>'Counterfeit Cranks'</em> who rubbed soap into their mouths to feign epileptic fits, and <em>'Hookers'</em> who carried long poles to hook clothes through open windows at night.`,
          `While modern historians recognize that the vast majority of vagrants were simply desperate, starving labourers seeking employment, Harman’s sensational tales convinced Parliament and local magistrates that vagrancy was an organized moral conspiracy that required ferocious state repression.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'From Brutal Mutilation to State Welfare: The Acts of 1572 & 1576',
        paras: [
          `Confronted by escalating social unrest, Parliament pioneered a revolutionary legislative framework. Local municipal experiments in Norwich, Ipswich, and London provided the blueprint for national statutes. The landmark <strong>1572 Vagabonds Act</strong> established a dual approach of savage punishment and statutory taxation. For the able-bodied vagrant, penalties were brutal: a first offence brought severe public whipping and having a hole <strong>bored through the gristle of the right ear with a hot iron</strong> of one inch diameter. A second offence was treated as felony; a third brought hanging.`,
          `Crucially, however, the 1572 Act recognized state responsibility for the helpless: it legally mandated that local Justices of the Peace register the impotent poor and collect a <strong>compulsory weekly poor rate</strong> from all property owners. Any citizen refusing to pay was imprisoned. This transformed poor relief from voluntary Christian charity into mandatory public taxation.`,
          `The revolutionary follow-up was the <strong>1576 Act for the Relief of the Poor</strong>, which introduced rehabilitation and state-provided labour. Towns and parishes were ordered to stockpile raw materials—wool, hemp, flax, and iron—to provide paid employment for the able-bodied poor. Furthermore, magistrates were required to build <strong>'Houses of Correction' (Bridewells)</strong> in every county, where vagrants who refused to work were incarcerated and subjected to hard forced labour. Together, the Acts of 1572 and 1576 created the enduring foundation for the famous Elizabethan Poor Law of 1601.`,
        ],
      },
    },

    // Lesson 3: KT 3.3 (Exploration and Discovery, 1558–1588)
    {
      num: 3,
      code: 'KT 3.3',
      title: 'Exploration and Voyages of Discovery, 1558–1588',
      enquiry:
        'How did navigational innovations and commercial rivalry shatter Iberian dominance and inspire Drake’s historic circumnavigation of the globe?',
      specRef: '1HI0/B4 &bull; Key Topic 3.3',
      sec1: {
        num: 1,
        title: 'The Commercial Imperative: Joint-Stock Trade & The Iberian Monopoly',
        paras: [
          `Elizabethan voyages of oceanic discovery were born out of urgent commercial crisis, technological curiosity, and intense patriotic rivalry. For decades, English prosperity had rested dangerously upon a single economic pillar: the export of unfinished woolen cloth through the great market of Antwerp. When the Dutch Revolt and Spanish embargoes paralyzed the Antwerp trade in the 1560s, English merchant adventurers faced catastrophic ruin. English merchants were compelled to establish direct maritime trade routes to Russia, the Mediterranean, Africa, and the Far East.`,
          `To finance these perilous oceanic ventures, Elizabethan merchants pioneered the <strong>joint-stock company</strong>. Rather than individual traders risking total bankruptcy, investors pooled their capital to fund voyages, sharing potential profits and limiting individual liability in proportion to their investment. The Crown granted royal charters conferring trade monopolies: the <strong>Muscovy Company (1555)</strong> secured Russian furs and timber; the <strong>Eastland Company (1579)</strong> controlled Baltic naval stores; and the <strong>Levant Company (1581)</strong> traded English cloth for luxury Ottoman silks and spices.`,
          `Simultaneously, English explorers sought a northern sea route to the wealth of China and India, attempting to discover the elusive <strong>'North-West Passage'</strong> around North America. Martin Frobisher led three expeditions between 1576 and 1578, while John Davis made three voyages in the 1580s. Though they failed to reach Asia, their daring arctic navigations mapped uncharted northern waters and ignited an insatiable English appetite for global maritime expansion.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'The Navigational Revolution: Astrolabes, Quadrants & Mercator Maps',
        paras: [
          `These ambitious oceanic voyages were made possible by a revolutionary scientific transformation in maritime navigation and ship design. Medieval mariners had navigated by dead reckoning—relying on coastal landmarks, lead lines, and guesswork. In the sixteenth century, mathematics and astronomy transformed navigation into a precise science. Navigators utilized the <strong>astrolabe, quadrant, and cross-staff</strong> to measure the exact angular altitude of the sun at midday or the Pole Star at night, enabling them to calculate their latitude at sea with remarkable accuracy.`,
          `Navigational charting took an enormous leap forward in 1569 when Flemish geographer <strong>Gerardus Mercator</strong> introduced his revolutionary projection map. The Mercator map represented curved lines of longitude and latitude as straight, parallel lines intersecting at right angles. For the first time, mariners could draw a straight line between two ports on a chart and steer a single constant compass bearing (a rhumb line) across thousands of miles of open ocean.`,
          `Concurrently, English shipbuilding was revolutionized under the direction of Sir John Hawkins, Treasurer of the Navy. Hawkins championed the <strong>'race-built' galleon</strong>: warships designed with longer, sleeker keels, lower forecastles, and lateen-rigged mizzen sails that allowed ships to tack closer into the wind. Faster, more agile, and riding lower in the water than top-heavy Spanish vessels, these ships were engineered specifically to survive stormy Atlantic weather while carrying heavy culverin broadside batteries.`,
        ],
      },
      sec3: {
        num: 3,
        title: 'The Golden Hind’s Epic Journey: Sacking the Spanish Pacific, 1577–79',
        paras: [
          `The supreme pinnacle of Elizabethan oceanic exploration was Sir Francis Drake’s historic global circumnavigation between 1577 and 1580. In December 1577, Drake sailed from Plymouth with five small ships and 164 men. While officially described as an expedition to establish trade in the Nile basin, Drake carried secret instructions signed by Queen Elizabeth: to navigate the treacherous <strong>Strait of Magellan</strong>, enter the Pacific Ocean, and strike the undefended colonial settlements of the Spanish Empire.`,
          `After surviving ferocious storms, ship losses, and executing a mutinous gentleman (Thomas Doughty) in South America, Drake emerged into the Pacific in 1578 aboard his sole surviving flagship, the <strong><em>Golden Hind</em></strong>. Spain had never fortified its Pacific settlements in Chile and Peru because they believed no foreign vessel could survive the passage around Cape Horn. Operating with complete surprise, Drake plundered Spanish harbours at Valparaíso and Callao, seizing bullion and navigational charts.`,
          `In March 1579, off the coast of Ecuador, Drake achieved the greatest privateering haul in naval history: he intercepted the unarmed Spanish treasure galleon <em>Nuestra Señora de la Concepción</em> (the <strong><em>Cacafuego</em></strong>). Drake transferred <strong>26 tons of silver bullion</strong>, 80 pounds of gold, and 13 chests of minted coin into the hold of the <em>Golden Hind</em>, delivering an unimaginable fortune back to England.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'Nova Albion, The Spice Islands & The Deptford Triumph, 1579–81',
        paras: [
          `Knowing Spanish warships would be lying in wait if he attempted to return via Cape Horn, Drake sailed north along the unexplored coast of North America in search of the North-West Passage. In June 1579, having reached modern California, Drake beached the leaking <em>Golden Hind</em> near Point Reyes to repair its hull. He met the local Miwok people, erected a commemorative brass plate, and formally claimed the vast territory for Queen Elizabeth, naming it <strong>*Nova Albion* ('New England')</strong>—the first English territorial claim in North America.`,
          `Drake then steered west across the uncharted expanse of the Pacific Ocean. Navigating for sixty-eight days without sighting land, he reached the <strong>Moluccas (the Spice Islands)</strong> in modern Indonesia. Drake forged a commercial alliance with the Sultan of Ternate, who was at war with the Portuguese, and loaded six tons of valuable cloves into his ballast. Navigating the treacherous reefs of Java, the Indian Ocean, and rounding the Cape of Good Hope, Drake sailed back into Plymouth Sound in <strong>September 1580</strong> after a 36,000-mile voyage.`,
          `Drake became the first Englishman to circumnavigate the globe and only the second commander in human history to complete the voyage alive. The expedition yielded an astronomical <strong>£400,000 in plunder</strong>, providing investors with a staggering 4,700% return and clearing Elizabeth’s foreign debts. On 4 April 1581, Elizabeth boarded the *Golden Hind* at Deptford and publicly knighted Drake, shattering Spain's monopoly of the oceans and heralding England's emergence as an imperial naval superpower.`,
        ],
      },
    },

    // Lesson 4: KT 3.4 (Raleigh and Virginia, 1584–1590)
    {
      num: 4,
      code: 'KT 3.4',
      title: 'Raleigh and the Colonisation of Virginia, 1584–1590',
      enquiry:
        'Why did Walter Raleigh’s ambitious attempts to establish an English colony on Roanoke Island end in catastrophic failure and the mystery of the ‘Lost Colony’?',
      specRef: '1HI0/B4 &bull; Key Topic 3.4',
      sec1: {
        num: 1,
        title: 'Raleigh’s Imperial Vision & The 1584 Reconnaissance',
        paras: [
          `In the 1580s, English imperial ambitions coalesced around <strong>Sir Walter Raleigh</strong>, a brilliant, dashing Devon courtier, soldier, and royal favourite. Raleigh recognized that establishing permanent agricultural and trading colonies in North America was essential for England’s national survival. An American empire would provide forward naval bases to launch privateering strikes against Spanish silver fleets, create lucrative export markets for English wool, supply vital timber, pitch, and hemp to free England from Baltic dependency, and plant a Protestant bulwark against Spanish Catholic expansion.`,
          `In March 1584, Queen Elizabeth granted Raleigh an exclusive <strong>royal patent</strong> conferring sovereign rights to explore, settle, and govern any 'remote, heathen and barbarous lands' not possessed by Christian monarchs. In April 1584, Raleigh financed a reconnaissance expedition commanded by Philip Amadas and Arthur Barlowe. The captains explored the Outer Banks of North Carolina, discovering Roanoke Island.`,
          `Barlowe returned with glowing reports, describing the land as fertile, paradise-like, and inhabited by gentle natives. Barlowe brought back two Algonquian Indians—<strong>Manteo and Wanchese</strong>—who learned English and assisted mathematician Thomas Harriot in compiling a bilingual dictionary. Delighted by the expedition's success, Raleigh named the entire territory <strong>'Virginia'</strong> in honour of Elizabeth, the Virgin Queen, and was knighted by the monarch in 1585.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'The 1585 Roanoke Outpost: Ralph Lane & The Secotan Clash',
        paras: [
          `In April 1585, Raleigh dispatched England’s first colonisation expedition: seven ships carrying <strong>108 male settlers</strong> under the naval command of Sir Richard Grenville, with military officer <strong>Ralph Lane</strong> appointed governor. However, the enterprise was crippled by catastrophic misfortune before the colonists even landed: the expedition’s flagship, the <strong><em>Tiger</em></strong>, ran aground on a sandbar off Ocracoke Inlet, flooding its hold and destroying virtually all the colonists' seed wheat and food provisions.`,
          `The composition of the colony was fatally flawed. The expedition comprised wealthy 'gentlemen' who refused manual agricultural labour, and discharged mercenary soldiers who were accustomed to violence but possessed no farming or fishing skills. Grenville returned to England to procure fresh supplies, leaving Lane to establish a fortified outpost on Roanoke Island.`,
          `Lane governed with heavy-handed military brutality. When a small silver cup went missing, English soldiers burned down an entire indigenous Secotan village. Relations collapsed completely when the Secotan chief, <strong>Wingina</strong>, grew weary of feeding the helpless colonists and prepared to drive them away. Lane launched a pre-emptive raid, assassinating Wingina. Facing imminent starvation and surrounded by hostile tribes, the colonists abandoned Roanoke in June 1586, taking passage home on Sir Francis Drake’s fleet, which arrived unexpectedly after raiding the Caribbean.`,
        ],
      },
      sec3: {
        num: 3,
        title: 'The 1587 Settlement: Families, Virginia Dare & The Impending Storm',
        paras: [
          `Undeterred by Lane’s failure, Raleigh organized a second colonisation expedition in 1587, led by artist and cartographer <strong>John White</strong>. Crucially, Raleigh rectified the demographic errors of the first attempt: this second colony was planned as a permanent agrarian community, comprising <strong>117 settlers—including 89 men, 17 women, and 11 children</strong>—who were promised 500 acres of land each. Manteo was baptized and named 'Lord of Roanoke'.`,
          `In August 1587, the colony celebrated a historic milestone: John White’s daughter Eleanor Dare gave birth to <strong>Virginia Dare</strong>, the first child born of English Christian parents in North America. However, the settlers faced immediate hardship: they had arrived too late in the agricultural season to plant crops, and the local Secotan remained vengeful following Wingina’s murder.`,
          `Recognizing that the colony could not survive the winter without emergency food and farming implements, the settlers pleaded with Governor White to return to England. White reluctantly set sail in late August 1587, leaving behind his daughter Eleanor, infant granddaughter Virginia, and 115 settlers with strict instructions that if they moved location, they were to carve their destination onto a tree; if forced to abandon the site in distress, they were to carve an engraved cross above the name.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'The 1588 Armada Embargo & The Tragedy of the "Lost Colony", 1588–90',
        paras: [
          `When John White reached London in November 1587, England was gripped by total emergency. King Philip II was mobilizing the Spanish Armada, and Queen Elizabeth declared an immediate embargo requisitioning every seaworthy ocean vessel for national naval defence. White was trapped in England, unable to organize a relief fleet while his family and settlers waited in the American wilderness.`,
          `For nearly three agonizing years, Roanoke remained completely isolated from the European world. It was not until <strong>August 1590</strong>, two years after the Armada’s defeat, that White was finally able to secure passage on a privateering vessel back to the Outer Banks. Stepping ashore on Roanoke Island on 17 August 1590, White walked into an eerie silence.`,
          `The settlement was completely deserted. The houses had been dismantled, grass grew in the pathways, and heavy iron cannons lay abandoned in the sand. On a prominent wooden palisade post at the entrance, White found the letters <strong>'CROATOAN'</strong> deeply carved, while on a tree near the shore the letters <strong>'CRO'</strong> were found. Crucially, there was no carved cross of distress. Before White could sail to nearby Croatoan Island (where Manteo's friendly tribe lived), a ferocious hurricane broke their anchor cables and mutinous sailors forced White to return to England. The fate of the 117 colonists remains one of history’s greatest unsolved mysteries. Despite total failure, Raleigh's Roanoke expeditions laid the vital ideological, financial, and navigational foundations for the permanent founding of Jamestown in 1607.`,
        ],
      },
    },
  ];

  // Build the complete Master HTML
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Early Elizabethan England, 1558–1588 — Key Topic 3 Course Textbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    body {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.2pt;
      line-height: 1.44;
      color: #1e293b;
      background: #e2e8f0;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    @media print {
      body { background: #ffffff; }
    }

    /* Strict A4 Container (210mm x 297mm) */
    .textbook-page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      box-sizing: border-box;
      background: #ffffff;
      margin: 0 auto;
      page-break-after: always;
      break-after: always;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    /* Page Layout Containers */
    .cover-page-layout {
      padding: 9mm 12mm 7mm 12mm;
      height: 297mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .narrative-page-layout {
      padding: 9mm 12mm 7mm 12mm;
      height: 297mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .synoptic-page-layout {
      padding: 8.5mm 12mm 6.5mm 12mm;
      height: 297mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .masterclass-page-layout {
      padding: 8.5mm 12mm 6.5mm 12mm;
      height: 297mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .back-cover-layout {
      padding: 8.5mm 12mm 6.5mm 12mm;
      height: 297mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Running Header */
    .running-header {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 2.5px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #475569;
      flex-shrink: 0;
    }
    .running-header strong {
      color: #0f172a;
      font-weight: 800;
    }

    /* Running Footer */
    .running-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 2.5px;
      margin-top: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      color: #64748b;
      font-weight: 600;
      flex-shrink: 0;
    }

    /* Lesson Hero Banner (Verso Spread Page) */
    .lesson-hero {
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 4px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }
    .lesson-badge-strip {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .topic-badge {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 6.6pt;
      font-weight: 800;
      padding: 1.5px 6px;
      border-radius: 2px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .spec-ref-badge {
      font-size: 6.6pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .lesson-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 12.2pt;
      font-weight: 800;
      color: #0f172a;
      margin: 1px 0 2px 0;
      line-height: 1.18;
    }
    .lesson-spec-anchor {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #334155;
      line-height: 1.3;
      background: #f8fafc;
      border-left: 3px solid #1e3a8a;
      padding: 2.5px 6px;
      border-radius: 0 3px 3px 0;
    }

    /* Right Page Sub-Header (Recto Spread Page) */
    .right-page-header {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }
    .rph-meta {
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      font-weight: 800;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1px;
    }
    .rph-tag { color: #1e3a8a; }
    .rph-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 10.8pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }

    /* 2-Column Deterministic Grid */
    .two-column-prose-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      flex: 1;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 3.5px;
    }
    .col-side {
      display: flex;
      flex-direction: column;
    }

    .two-column-prose {
      column-count: 2;
      column-gap: 15px;
      column-rule: 1px solid #e2e8f0;
      text-align: justify;
      flex: 1;
      overflow: hidden;
      margin-bottom: 4px;
    }

    .section-banner {
      display: flex;
      align-items: center;
      gap: 5px;
      background: #0f172a;
      color: #ffffff;
      padding: 2.5px 6px;
      margin: 0 0 3.5px 0;
      font-family: 'Inter', sans-serif;
      break-inside: avoid;
    }
    .sb-num {
      background: #b45309;
      color: #ffffff;
      font-size: 6.6pt;
      font-weight: 900;
      padding: 0.5px 4.5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }
    .sb-title {
      font-size: 7.2pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .narrative-p {
      margin: 0 0 3.5px 0;
      text-indent: 9px;
      font-size: 8.85pt;
      line-height: 1.34;
      color: #1e293b;
      text-align: justify;
    }
    .narrative-p:first-of-type {
      text-indent: 0;
    }
    .para-ref {
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 0.5px 3px;
      border-radius: 2px;
      margin-right: 4px;
      display: inline-block;
      text-indent: 0;
      vertical-align: baseline;
    }

    /* Primary Archival Source Box (Verso) */
    .archival-source-box {
      background: #fafaf9;
      border: 1.2px solid #d6d3d1;
      border-top: 2.5px solid #44403c;
      padding: 3px 5.5px;
      margin: 2px 0 3px 0;
      break-inside: avoid;
      font-family: 'Inter', sans-serif;
    }
    .archival-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      border-bottom: 1px solid #e7e5e4;
      padding-bottom: 1px;
    }
    .source-identity { display: flex; gap: 4px; align-items: center; }
    .source-badge {
      background: #0f172a;
      color: #fff;
      font-size: 5.8pt;
      font-weight: 800;
      padding: 1px 4px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .source-type {
      font-size: 6.0pt;
      font-weight: 700;
      color: #78350f;
      text-transform: uppercase;
    }
    .source-date-micro {
      font-size: 5.8pt;
      color: #78716c;
      font-weight: 700;
    }
    .archival-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #1c1917;
      margin: 1px 0;
    }
    .archival-source-quote {
      font-family: 'Newsreader', Georgia, serif;
      font-style: italic;
      font-size: 7.4pt;
      line-height: 1.34;
      color: #1c1917;
      background: #faf8f5;
      border-left: 2.5px solid #0f172a;
      padding: 3.5px 6px;
      margin: 2px 0;
      border-radius: 2px;
    }
    .archival-image {
      width: 100%;
      height: 75px;
      object-fit: contain;
      background: #ffffff;
      border: 1px solid #e7e5e4;
      margin: 2px 0;
      display: block;
    }
    .archival-context-box {
      font-size: 7.0pt;
      line-height: 1.28;
      color: #44403c;
      border-left: 2px solid #a8a29e;
      padding-left: 4px;
      margin-top: 2px;
    }
    .archival-context-text { margin: 0 0 2px 0; }
    .archival-hinge-q {
      background: #f5f5f4;
      padding: 2px 5px;
      border-radius: 2px;
      color: #1c1917;
      font-size: 6.8pt;
      line-height: 1.24;
    }

    /* Key Figure Profile Box */
    .key-figure-box {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-top: 3px solid #1e3a8a;
      padding: 4px 6px;
      margin: 3px 0 4px 0;
      break-inside: avoid;
      font-family: 'Inter', sans-serif;
    }
    .kf-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
    }
    .kf-tag {
      font-size: 6.4pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .kf-lifespan {
      font-size: 6.4pt;
      font-weight: 700;
      color: #64748b;
    }
    .kf-identity-row {
      display: flex;
      gap: 6px;
      align-items: center;
      margin-bottom: 3px;
    }
    .kf-portrait {
      width: 36px;
      height: 44px;
      object-fit: cover;
      border-radius: 2px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      flex-shrink: 0;
    }
    .kf-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.0pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }
    .kf-role {
      font-size: 6.4pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
    }
    .kf-significance {
      font-size: 7.2pt;
      line-height: 1.28;
      color: #334155;
      margin-bottom: 3px;
    }
    .kf-actions-title {
      font-size: 6.4pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 1px;
    }
    .kf-actions-list {
      margin: 0;
      padding-left: 12px;
      font-size: 7.0pt;
      line-height: 1.26;
      color: #1e293b;
    }
    .kf-actions-list li { margin-bottom: 1px; }

    /* Concept Spotlight Box */
    .concept-spotlight-box {
      background: #fffbeb;
      border: 1.2px solid #fde68a;
      border-left: 3.5px solid #d97706;
      padding: 3.5px 6px;
      margin: 3px 0 4px 0;
      break-inside: avoid;
      font-family: 'Inter', sans-serif;
    }
    .csb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1px;
    }
    .csb-tag {
      font-size: 6.2pt;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
    }
    .csb-category {
      font-size: 6.2pt;
      font-weight: 700;
      color: #b45309;
      background: #ffedd5;
      padding: 1px 4px;
      border-radius: 2px;
    }
    .csb-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.4pt;
      font-weight: 800;
      color: #7c2d12;
      margin: 1px 0;
      line-height: 1.15;
    }
    .csb-body {
      font-size: 7.2pt;
      line-height: 1.28;
      color: #1e293b;
      margin-bottom: 2px;
    }
    .csb-takeaway {
      font-size: 6.8pt;
      font-weight: 600;
      color: #78350f;
      background: #fef3c7;
      border-left: 2px solid #d97706;
      padding: 2px 5px;
      border-radius: 0 2px 2px 0;
    }

    /* Bottom Decks */
    .bottom-vocab-box, .bottom-enquiry-box {
      width: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
      margin-top: auto;
      margin-bottom: 1px;
      padding: 4.5px 7px;
      border-radius: 3px;
      font-family: 'Inter', sans-serif;
    }
    .bottom-vocab-box {
      background: #fdfaf6;
      border: 1.2px solid #fed7aa;
      border-top: 2.5px solid #b45309;
    }
    .bvb-header, .beb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1px;
    }
    .bvb-title {
      font-size: 6.8pt;
      font-weight: 900;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .bvb-badge, .beb-badge {
      font-size: 5.8pt;
      font-weight: 800;
      background: #0f172a;
      color: #fff;
      padding: 1px 4px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .bvb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 6px;
      font-size: 6.8pt;
      line-height: 1.28;
      color: #334155;
    }
    .bvb-col strong, .beb-col strong {
      display: block;
      color: #0f172a;
      margin-bottom: 1px;
      text-transform: uppercase;
      font-size: 6.4pt;
    }
    .bottom-enquiry-box {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
      padding: 7px 9px;
      margin-bottom: 2px;
    }
    .beb-title {
      font-size: 6.8pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .beb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      font-size: 6.8pt;
      line-height: 1.32;
      color: #334155;
    }
    .beb-col strong {
      font-size: 6.4pt;
      margin-bottom: 2px;
    }

    /* 4-Box Horizontal Timeline Strip (Recto Bottom Deck) */
    .timeline-strip-4col {
      width: 100%;
      box-sizing: border-box;
      border: 1.2px solid #0f172a;
      border-radius: 2px;
      overflow: hidden;
      margin-top: auto;
      margin-bottom: 2.5px;
      background: #ffffff;
      flex-shrink: 0;
    }
    .timeline-strip-header {
      background: #0f172a;
      color: #ffffff;
      padding: 1.8px 6px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .timeline-strip-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      padding: 3px 5px;
      font-family: 'Inter', sans-serif;
      font-size: 6.9pt;
      line-height: 1.25;
    }
    .timeline-card {
      background: #f8fafc;
      border-left: 2.5px solid #1e3a8a;
      padding: 2.5px 4.5px;
      border-radius: 1px;
    }
    .timeline-card-title {
      color: #1e3a8a;
      display: block;
      font-size: 6.8pt;
      font-weight: 800;
      margin-bottom: 1px;
    }

    /* Full-Width Exam Strategy Box (Recto Bottom Deck) */
    .exam-strategy-fullwidth-box {
      width: 100%;
      box-sizing: border-box;
      background: #fdfaf6;
      border: 1.2px solid #fed7aa;
      border-left: 3.5px solid #b45309;
      padding: 3.5px 6.5px;
      margin-bottom: 1.5px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      flex-shrink: 0;
    }
    .esfb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #fed7aa;
      padding-bottom: 1.5px;
      margin-bottom: 2px;
    }
    .esfb-badge {
      font-size: 6.8pt;
      font-weight: 900;
      color: #9a3412;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .esfb-tariff {
      font-size: 6.2pt;
      font-weight: 800;
      background: #0f172a;
      color: #ffffff;
      padding: 1px 5px;
      border-radius: 2px;
    }
    .esfb-stem {
      font-size: 7.2pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2px;
      line-height: 1.25;
    }
    .esfb-guidance {
      font-size: 6.8pt;
      color: #78350f;
      line-height: 1.25;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px dashed #fed7aa;
      padding-top: 2px;
    }
    .esfb-target {
      font-size: 6.4pt;
      font-weight: 800;
      color: #9a3412;
    }

    /* Master Front Cover Styles */
    .cover-header-bar {
      border-bottom: 2px solid #000000;
      padding-bottom: 2px;
      margin-bottom: 2px;
    }
    .cover-top-meta {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-family: 'Inter', sans-serif;
    }
    .school-brand-target {
      font-size: 11pt;
      font-weight: 900;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #000000;
    }
    .cover-sub-brand {
      font-size: 7.5pt;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #222222;
    }
    .cover-spec-code {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #222222;
      border-top: 1px solid #000000;
      padding-top: 2px;
      margin-top: 1px;
    }

    .cover-title-block {
      text-align: center;
      margin: 1.5px 0 2.5px 0;
    }
    .cover-topic-label {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 900;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #b45309;
      margin-bottom: 0px;
    }
    .cover-main-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 14pt;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.5px;
      margin: 0px 0 1px 0;
      line-height: 1.1;
    }
    .cover-enquiry-banner {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #1e3a8a;
      padding: 2px 6px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      line-height: 1.24;
      color: #1e293b;
      text-align: left;
      border-radius: 0 2px 2px 0;
    }

    /* Master 87mm Plate */
    .cover-plate-frame {
      width: 100%;
      height: 87mm;
      max-height: 87mm;
      border: 1.5px solid #0f172a;
      background: #ffffff;
      padding: 2.5px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      margin-bottom: 2.5px;
    }
    .cover-plate-inner {
      width: 100%;
      flex: 1;
      min-height: 0;
      background: #f8fafc;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    .cover-master-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 30%;
      display: block;
    }
    .cover-plate-caption {
      font-family: 'Inter', sans-serif;
      font-size: 5.9pt;
      line-height: 1.22;
      color: #334155;
      padding: 2px 4px 0 4px;
      border-top: 1px solid #cbd5e1;
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .plate-stamp {
      font-size: 5.4pt;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
      margin-left: 6px;
    }

    /* 4-Column Specification Matrix */
    .cover-spec-matrix {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      margin-bottom: 2px;
    }
    .csm-card {
      border: 1.2px solid #0f172a;
      border-radius: 3px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 3px 4px;
      font-family: 'Inter', sans-serif;
    }
    .csm-header {
      font-size: 6.2pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      border-bottom: 1.2px solid #0f172a;
      padding-bottom: 1px;
      margin-bottom: 1.5px;
      line-height: 1.15;
    }
    .csm-bullets {
      margin: 0;
      padding-left: 10px;
      font-size: 5.6pt;
      line-height: 1.22;
      color: #334155;
      flex: 1;
    }
    .csm-bullets li { margin-bottom: 1.5px; }
    .csm-seq {
      background: #f8fafc;
      border-top: 1px dashed #cbd5e1;
      padding-top: 1.5px;
      margin-top: 1.5px;
      font-size: 5.1pt;
      line-height: 1.18;
      color: #1e3a8a;
      font-weight: 700;
    }
    .csm-focus {
      background: #0f172a;
      color: #ffffff;
      font-size: 5.1pt;
      font-weight: 800;
      text-transform: uppercase;
      padding: 1px 3px;
      border-radius: 1px;
      text-align: center;
      margin-top: 1.5px;
      letter-spacing: 0.03em;
    }

    /* Master Chronology Table */
    .master-chron-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
    }
    .master-chron-table th {
      text-align: left;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .master-chron-table td, .master-chron-table th {
      border: 1px solid #cbd5e1;
    }
  </style>
</head>
<body>

  <!-- ====================================================================
       PAGE 1: MASTER FRONT COVER (Matching CME Publisher Standard)
       ==================================================================== -->
  <div class="textbook-page" data-page="1">
    <div class="cover-page-layout">
      
      <!-- Top Departmental Header Bar -->
      <div class="cover-header-bar" data-department-name="The History Department">
        <div class="cover-top-meta">
          <span class="school-brand-target">The History Department</span>
          <span class="cover-sub-brand">GCSE History Revision Hub &bull; Course Textbook</span>
        </div>
        <div class="cover-spec-code">
          <span>EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: EARLY ELIZABETHAN ENGLAND, 1558–1588</span>
          <span>OPTION B4 &bull; 1HI0/B4</span>
        </div>
      </div>

      <!-- Title & Enquiry Banner -->
      <div class="cover-title-block">
        <div class="cover-topic-label">KEY TOPIC 3: ELIZABETHAN SOCIETY IN THE AGE OF EXPLORATION, 1558–1588</div>
        <h1 class="cover-main-title">Elizabethan Society in the Age of Exploration, 1558–1588</h1>
        <div class="cover-enquiry-banner">
          <strong>Overarching Historical Enquiry:</strong> &ldquo;${coverConfig.enquiry}&rdquo;
        </div>
      </div>

      <!-- Master 87mm Photographic Plate Frame -->
      <div class="cover-plate-frame">
        <div class="cover-plate-inner">
          <img class="cover-master-photo" src="${coverImgData}" alt="Roanoke Colony Plate">
        </div>
        <div class="cover-plate-caption">
          <span>${coverConfig.caption}</span>
          <span class="plate-stamp">ACCESSION: BL-1590-ROANOKE</span>
        </div>
      </div>

      <!-- Pearson Edexcel Specification Coverage (Official 4-Column Matrix with 4-Stage Causal Chronology) -->
      <div style="border: 1.5px solid #000; border-radius: 4px; overflow: hidden; background: #fff; display: flex; flex-direction: column; margin-bottom: 2px;">
        <div style="background: #000; color: #fff; padding: 3px 10px; font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; display: flex; justify-content: space-between; align-items: center;">
          <span>Pearson Edexcel GCSE (9–1) History Specification Content</span>
          <span style="font-size: 6.8pt; letter-spacing: 0.5px;">Key Topic 3 Coverage Matrix</span>
        </div>

        <div style="padding: 5px 8px 6px 8px; display: flex; flex-direction: column; gap: 4px;">
          <!-- Row 1: 4-Column Specification Content -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.32; color: #111;">
            <!-- 3.1 -->
            <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
              <strong style="font-size: 7.3pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 1px; display: block; margin-bottom: 3px;">
                3.1 Education &amp; Leisure
              </strong>
              <div style="margin-bottom: 2px;">&bull; <strong>Grammar schools:</strong> 72 founded; Latin, Greek &amp; rhetoric.</div>
              <div style="margin-bottom: 2px;">&bull; Petty schools &amp; dame schools; girls educated in domestic skills.</div>
              <div style="margin-bottom: 2px;">&bull; Elite education: private tutors, universities &amp; <strong>Inns of Court</strong>.</div>
              <div style="margin-bottom: 2px;">&bull; Pastimes: noble hunting/hawking, folk football &amp; bear-baiting.</div>
              <div>&bull; <strong>The Theatre (1576):</strong> Burbage, groundlings &amp; Puritan civic opposition.</div>
            </div>

            <!-- 3.2 -->
            <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
              <strong style="font-size: 7.3pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 1px; display: block; margin-bottom: 3px;">
                3.2 The Problem of the Poor
              </strong>
              <div style="margin-bottom: 2px;">&bull; Population boom (2.8m to 4m), food price inflation &amp; bad harvests.</div>
              <div style="margin-bottom: 2px;">&bull; Agrarian change: <strong>sheep enclosure</strong>, rack-renting &amp; peasant eviction.</div>
              <div style="margin-bottom: 2px;">&bull; Social panic: Thomas Harman’s <strong>Caveat for Common Cursitors (1567)</strong>.</div>
              <div style="margin-bottom: 2px;">&bull; <strong>1572 Vagabonds Act:</strong> ear-boring &amp; compulsory weekly poor rates.</div>
              <div>&bull; <strong>1576 Poor Act:</strong> raw materials stockpiled &amp; Bridewells created.</div>
            </div>

            <!-- 3.3 -->
            <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
              <strong style="font-size: 7.3pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 1px; display: block; margin-bottom: 3px;">
                3.3 Exploration &amp; Discovery
              </strong>
              <div style="margin-bottom: 2px;">&bull; Antwerp trade collapse; rise of <strong>joint-stock companies</strong> (Muscovy, Levant).</div>
              <div style="margin-bottom: 2px;">&bull; Navigational tech: astrolabe, quadrant &amp; <strong>1569 Mercator projection</strong>.</div>
              <div style="margin-bottom: 2px;">&bull; Hawkins' <strong>race-built galleons</strong> with lower forecastles and culverins.</div>
              <div style="margin-bottom: 2px;">&bull; Drake’s 1577–80 circumnavigation; sacking of the <strong>Cacafuego</strong> (£400k).</div>
              <div>&bull; <strong>Nova Albion (1579):</strong> Drake’s brass plate &amp; Pacific spice trade.</div>
            </div>

            <!-- 3.4 -->
            <div>
              <strong style="font-size: 7.3pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 1px; display: block; margin-bottom: 3px;">
                3.4 Raleigh &amp; Virginia
              </strong>
              <div style="margin-bottom: 2px;">&bull; Walter Raleigh’s <strong>1584 royal patent</strong>; Amadas &amp; Barlowe reconnaissance.</div>
              <div style="margin-bottom: 2px;">&bull; Manteo &amp; Wanchese brought to England; territory named Virginia.</div>
              <div style="margin-bottom: 2px;">&bull; <strong>1585 Lane colony:</strong> <em>Tiger</em> grounding, lost food seeds &amp; Wingina’s murder.</div>
              <div style="margin-bottom: 2px;">&bull; <strong>1587 White settlement:</strong> 117 men, women &amp; children; Virginia Dare.</div>
              <div>&bull; 1588 Armada embargo delays White; 1590 discovery of <strong>'CROATOAN'</strong>.</div>
            </div>
          </div>

          <!-- Row 2: 4-Column Causal Sequences (4 Vertical Stages per Column with Arrows) -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px;">
            <!-- Col 1 Sequence -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 3px 5px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.26;">
              <span style="font-weight: 800; color: #1e3a8a; text-transform: uppercase; display: block; margin-bottom: 1px;">3.1 Chronological Causal Flow</span>
              <div><strong style="color: #0f172a;">1560s:</strong> 72 Grammar Schools Endowed</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1571:</strong> Jesus College Oxford Founded</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1572:</strong> Vagabonds Act Licenses Players</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1576:</strong> Burbage Builds *The Theatre*</div>
            </div>

            <!-- Col 2 Sequence -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 3px 5px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.26;">
              <span style="font-weight: 800; color: #1e3a8a; text-transform: uppercase; display: block; margin-bottom: 1px;">3.2 Chronological Causal Flow</span>
              <div><strong style="color: #0f172a;">1558–88:</strong> Population Booms to 4m</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1567:</strong> Harman Publishes *Caveat*</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1572:</strong> Ear Boring &amp; Compulsory Rates</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1576:</strong> Bridewell Workhouses Mandated</div>
            </div>

            <!-- Col 3 Sequence -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #b45309; padding: 3px 5px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.26;">
              <span style="font-weight: 800; color: #b45309; text-transform: uppercase; display: block; margin-bottom: 1px;">3.3 Chronological Causal Flow</span>
              <div><strong style="color: #0f172a;">1568:</strong> San Juan de Ulúa Ambush</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1569:</strong> Mercator Projection Published</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1579:</strong> Drake Plunders *Cacafuego*</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Apr 1581:</strong> Drake Knighted at Deptford</div>
            </div>

            <!-- Col 4 Sequence -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #991b1b; padding: 3px 5px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.26;">
              <span style="font-weight: 800; color: #991b1b; text-transform: uppercase; display: block; margin-bottom: 1px;">3.4 Chronological Causal Flow</span>
              <div><strong style="color: #0f172a;">Mar 1584:</strong> Raleigh Granted Royal Patent</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1585:</strong> *Tiger* Grounds; Lane at Roanoke</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1587:</strong> White Colony &amp; Virginia Dare</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Aug 1590:</strong> White Discovers 'CROATOAN'</div>
            </div>
          </div>

          <!-- Row 3: Enquiry Disciplinary Focus & Exam Blueprint -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.1pt; line-height: 1.24;">
            <div style="background: #f1f5f9; padding: 2px 4px; border-radius: 2px; border: 1px solid #cbd5e1;">
              <strong style="color: #1e3a8a; display: block;">CORE DISCIPLINARY FOCUS</strong>
              Humanist Schooling &amp; Secular Theatre &bull; <em>Exam: Q1 Feature / Q2 Causation</em>
            </div>
            <div style="background: #f1f5f9; padding: 2px 4px; border-radius: 2px; border: 1px solid #cbd5e1;">
              <strong style="color: #1e3a8a; display: block;">CORE DISCIPLINARY FOCUS</strong>
              Agrarian Crisis &amp; Tudor Welfare &bull; <em>Exam: Q1 Feature / Q3 Essay</em>
            </div>
            <div style="background: #f1f5f9; padding: 2px 4px; border-radius: 2px; border: 1px solid #b45309;">
              <strong style="color: #b45309; display: block;">CORE DISCIPLINARY FOCUS</strong>
              Scientific Navigation &amp; Global Trade &bull; <em>Exam: Q1 Feature / Q2 Causation</em>
            </div>
            <div style="background: #f1f5f9; padding: 2px 4px; border-radius: 2px; border: 1px solid #991b1b;">
              <strong style="color: #991b1b; display: block;">CORE DISCIPLINARY FOCUS</strong>
              Colonial Logistics &amp; The Lost Colony &bull; <em>Exam: Q1 Feature / Q3 Essay</em>
            </div>
          </div>
        </div>
      </div>

      <!-- Cover Running Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #333; font-weight: 700;">
        <span>The History Department &bull; GCSE History Revision Hub</span>
        <span>Key Topic 3 &bull; 12-Page Complete Master Volume</span>
      </div>

    </div>
  </div>

`;

  // ====================================================================
  // PAGES 2–9: ENQUIRIES 1 TO 4 (2-PAGE SPREAD PER ENQUIRY)
  // ====================================================================
  lessons.forEach((l, idx) => {
    const leftPageNum = l.num * 2;
    const rightPageNum = l.num * 2 + 1;
    const bank = componentBank[`p${rightPageNum}`] || {};
    const sources = leftSources[`p${leftPageNum}`] || {};
    const vocabList = leftVocab[`p${leftPageNum}`] || [];
    const rightExam =
      ktWorkbookData && ktWorkbookData.enquiries && ktWorkbookData.enquiries[idx]
        ? ktWorkbookData.enquiries[idx].rightExam
        : null;

    // LEFT PAGE (VERSO: Sections 1 & 2 + Sources + Vocab)
    html += `
  <div class="textbook-page" data-page="${leftPageNum}">
    <div class="narrative-page-layout">
      <div class="running-header">
        <span>EDEXCEL GCSE (9–1) HISTORY &bull; EARLY ELIZABETHAN ENGLAND, 1558–1588</span>
        <span>${l.code} &bull; ${l.title}</span>
      </div>

      <div class="lesson-hero">
        <div class="lesson-badge-strip">
          <span class="topic-badge">ENQUIRY ${l.num}</span>
          <span class="spec-ref-badge">${l.specRef}</span>
        </div>
        <h2 class="lesson-title">${l.title}</h2>
        <div class="lesson-spec-anchor">
          <strong>Historical Enquiry:</strong> ${l.enquiry}
        </div>
      </div>

      <div class="two-column-prose-grid">
        <div class="col-side">
          <div class="section-banner">
            <span class="sb-num">SECTION 1</span>
            <span class="sb-title">${l.sec1.title}</span>
          </div>
          ${l.sec1.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[1.${pIdx + 1}]</span>${p}</p>`).join('')}

          ${renderArchivalSourceBox(sources.sourceA)}
        </div>

        <div class="col-side">
          <div class="section-banner">
            <span class="sb-num">SECTION 2</span>
            <span class="sb-title">${l.sec2.title}</span>
          </div>
          ${l.sec2.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[2.${pIdx + 1}]</span>${p}</p>`).join('')}

          ${renderArchivalSourceBox(sources.sourceB)}
        </div>
      </div>

      <div class="bottom-vocab-box">
        <div class="bvb-header">
          <span class="bvb-title">CORE DISCIPLINARY VOCABULARY &bull; SPECIFICATION TERMS</span>
          <span class="bvb-badge">${l.code} GLOSSARY</span>
        </div>
        <div class="bvb-grid">
          ${vocabList
            .map(
              (v) => `
            <div class="bvb-col">
              <strong>${v.term}</strong>
              ${v.def}
            </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <div class="running-footer">
        <span>Early Elizabethan England, 1558–1588 &bull; Key Topic 3: Elizabethan Society in the Age of Exploration</span>
        <span>Page ${leftPageNum}</span>
      </div>
    </div>
  </div>
`;

    // RIGHT PAGE (RECTO: Sections 3 & 4 + Key Figure + Spotlight + Enquiry Deck)
    html += `
  <div class="textbook-page" data-page="${rightPageNum}">
    <div class="narrative-page-layout">
      <div class="running-header">
        <span>EDEXCEL GCSE (9–1) HISTORY &bull; EARLY ELIZABETHAN ENGLAND, 1558–1588</span>
        <span>${l.code} &bull; RECTO SPREAD</span>
      </div>

      <div class="right-page-header">
        <div class="rph-meta">
          <span class="rph-tag">${l.code} ENQUIRY STUDY</span>
          <span>DISCIPLINARY ANALYSIS</span>
        </div>
        <h3 class="rph-title">${l.title} (Continued)</h3>
      </div>

      <div class="two-column-prose-grid">
        <div class="col-side">
          <div class="section-banner">
            <span class="sb-num">SECTION 3</span>
            <span class="sb-title">${l.sec3.title}</span>
          </div>
          ${l.sec3.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[3.${pIdx + 1}]</span>${p}</p>`).join('')}

          ${
            bank.keyFigure
              ? `
          <div class="key-figure-box">
            <div class="kf-header">
              <span class="kf-tag">KEY HISTORICAL FIGURE</span>
              <span class="kf-lifespan">${bank.keyFigure.lifespan}</span>
            </div>
            <div class="kf-identity-row">
              ${bank.keyFigure.image ? `<img class="kf-portrait" src="${bank.keyFigure.image}" alt="${bank.keyFigure.name}">` : ''}
              <div>
                <div class="kf-name">${bank.keyFigure.name}</div>
                <div class="kf-role">${bank.keyFigure.role}</div>
              </div>
            </div>
            <div class="kf-significance">${bank.keyFigure.significance}</div>
            <div class="kf-actions-title">DECISIVE ACTIONS:</div>
            <ul class="kf-actions-list">
              ${bank.keyFigure.actions.map((a) => `<li>${a}</li>`).join('')}
            </ul>
          </div>`
              : ''
          }
        </div>

        <div class="col-side">
          <div class="section-banner">
            <span class="sb-num">SECTION 4</span>
            <span class="sb-title">${l.sec4.title}</span>
          </div>
          ${l.sec4.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[4.${pIdx + 1}]</span>${p}</p>`).join('')}

          ${bank.conceptSpotlight || ''}
        </div>
      </div>

      ${
        bank.timeline
          ? `
      <div class="timeline-strip-4col">
        <div class="timeline-strip-header">
          <span>KEY CHRONOLOGY &bull; FOUR CAUSAL TURNING POINTS</span>
          <span style="font-size: 6.2pt; color: #93c5fd;">${l.code} SEQUENCE</span>
        </div>
        <div class="timeline-strip-grid">
          ${bank.timeline
            .map(
              (t) => `
            <div class="timeline-card">
              <strong class="timeline-card-title">${t.date} &bull; ${t.title}</strong>
              ${t.text}
            </div>
          `,
            )
            .join('')}
        </div>
      </div>`
          : ''
      }

      ${
        rightExam
          ? `
      <div class="exam-strategy-fullwidth-box">
        <div class="esfb-header">
          <span class="esfb-badge">EXAM STRATEGY &bull; EDEXCEL PAPER 2 (OPTION B4)</span>
          <span class="esfb-tariff">${rightExam.tariff}</span>
        </div>
        <div class="esfb-stem"><strong>Exam Challenge:</strong> ${rightExam.stem}</div>
        <div class="esfb-guidance">
          <span><strong>Specification Stimulus:</strong> ${rightExam.stimulus && rightExam.stimulus.length ? `(1) ${rightExam.stimulus[0]} &bull; (2) ${rightExam.stimulus[1]}` : 'Independent historical knowledge'} &bull; <em>Construct 3 PEEL paragraphs using precise factual evidence.</em></span>
          <span class="esfb-target">GRADE 9 STANDARD</span>
        </div>
      </div>`
          : ''
      }

      <div class="running-footer">
        <span>Early Elizabethan England, 1558–1588 &bull; Key Topic 3: Elizabethan Society in the Age of Exploration</span>
        <span>Page ${rightPageNum}</span>
      </div>
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 10: SYNOPTIC MATRIX, HISTORIOGRAPHICAL DEBATE & CHRONOLOGY
  // ====================================================================
  html += `
  <div class="textbook-page" data-page="10">
    <div class="masterclass-page-layout">
      
      <div class="running-header">
        <span>EDEXCEL GCSE (9–1) HISTORY &bull; EARLY ELIZABETHAN ENGLAND, 1558–1588</span>
        <span>KEY TOPIC 3 MASTER SYNTHESIS</span>
      </div>

      <!-- Lesson Banner -->
      <div class="lesson-hero" style="margin-bottom: 3.5px; padding-bottom: 3px;">
        <div class="lesson-badge-strip">
          <span class="topic-badge">SYNOPTIC OVERVIEW</span>
          <span class="spec-ref-badge">KEY TOPIC 3 MASTER SYNTHESIS &bull; 1558–1588</span>
        </div>
        <h2 class="lesson-title" style="font-size: 11.5pt; margin: 1px 0;">Key Topic 3: Thematic Synoptic Matrix &amp; Historiographical Debate</h2>
        <div class="lesson-spec-anchor" style="padding: 2.5px 6px;">
          <strong>Historical Assessment:</strong> Evaluating domestic social polarisation, educational humanism, poor relief legislation, and overseas colonial ventures.
        </div>
      </div>

      <!-- Thematic Comparative Matrix (Core Specification Themes) -->
      <div style="border: 1.2px solid #0f172a; border-radius: 3px; overflow: hidden; background: #fff; margin-bottom: 6px;">
        <div style="background: #0f172a; color: #fff; padding: 3px 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: flex; justify-content: space-between;">
          <span>THEMATIC COMPARATIVE MATRIX &bull; CORE SPECIFICATION THEMES</span>
          <span>1558 BASELINE VS. 1588 REALITY</span>
        </div>
        <table class="master-chron-table" style="font-size: 6.5pt; line-height: 1.26;">
          <thead>
            <tr style="background: #1e293b; color: #ffffff;">
              <th style="width: 20%; padding: 3px 6px;">Thematic Dimension</th>
              <th style="width: 27%; padding: 3px 6px;">The Baseline in 1558</th>
              <th style="width: 28%; padding: 3px 6px;">Elizabethan Policy &amp; Transformation</th>
              <th style="width: 25%; padding: 3px 6px;">The Balance Sheet by 1588</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #ffffff;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">1. Education &amp; Literacy</td>
              <td style="padding: 3.5px 6px;">Limited monastic schooling; high illiteracy; education reserved strictly for churchmen and aristocracy.</td>
              <td style="padding: 3.5px 6px;">72 grammar schools founded; humanist Latin curriculum; petty schools and Inns of Court expansion.</td>
              <td style="padding: 3.5px 6px;">Literate 'middling sort' supplied royal administration; but gender and class divides remained rigid.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">2. Popular &amp; Elite Culture</td>
              <td style="padding: 3.5px 6px;">Folk mystery plays in inn-yards; brutal folk football and noble field hunting; Catholic church calendar.</td>
              <td style="padding: 3.5px 6px;">Burbage built *The Theatre* (1576); rise of commercial Bankside playhouses; Shakespeare and Marlowe.</td>
              <td style="padding: 3.5px 6px;">Secular commercial theatre united classes; but provoked bitter Puritan moral hostility.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">3. Rural Economy &amp; Enclosure</td>
              <td style="padding: 3.5px 6px;">Traditional open-field strip farming; customary tenancy; self-sufficient subsistence agriculture.</td>
              <td style="padding: 3.5px 6px;">Landlords converted arable land to sheep pasture; enclosed common waste; imposed rack-renting.</td>
              <td style="padding: 3.5px 6px;">Wool profits enriched gentry; but caused rural unemployment, peasant evictions, and food inflation.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">4. Poverty &amp; Vagrancy Laws</td>
              <td style="padding: 3.5px 6px;">Reliance on voluntary alms and monastic charity; indiscriminate corporal punishment of beggars.</td>
              <td style="padding: 3.5px 6px;">Distinguished Impotent from Idle Poor; 1572 ear boring &amp; poor rates; 1576 Houses of Correction (Bridewells).</td>
              <td style="padding: 3.5px 6px;">Established permanent principle of compulsory state welfare and municipal employment relief.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">5. Global Trade &amp; Navigation</td>
              <td style="padding: 3.5px 6px;">Complete dependence on Antwerp cloth market; coastal navigation; reliance on foreign merchant ships.</td>
              <td style="padding: 3.5px 6px;">Joint-stock companies (Muscovy, Levant); astrolabes, Mercator map (1569); Drake circumnavigation (1577–80).</td>
              <td style="padding: 3.5px 6px;">Broke Spanish trade monopoly; £400k Cacafuego haul; proved English ocean-going mastery.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">6. American Colonisation</td>
              <td style="padding: 3.5px 6px;">Zero English overseas empire; Papal Treaty of Tordesillas divided Americas between Spain and Portugal.</td>
              <td style="padding: 3.5px 6px;">Raleigh royal patent (1584); 1585 Lane military outpost; 1587 John White family settlement on Roanoke.</td>
              <td style="padding: 3.5px 6px;">Roanoke collapsed into the 'Lost Colony'; but established blueprint for successful 1607 Jamestown.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Secondary Contextual Matrix: The Elizabethan Social Hierarchy, Poor Law Statutes & Exploration Matrix (1572–1601) -->
      <div style="border: 1.2px solid #0f172a; border-radius: 3px; overflow: hidden; background: #fff; margin-bottom: 6px;">
        <div style="background: #1e293b; color: #fff; padding: 3px 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: flex; justify-content: space-between;">
          <span>THE ELIZABETHAN SOCIAL HIERARCHY, POOR LAW STATUTES &amp; EXPLORATION MATRIX (1572–1601)</span>
          <span>SOCIAL ORDER, POOR RELIEF &amp; COLONIAL VENTURES</span>
        </div>
        <table class="master-chron-table" style="font-size: 6.4pt; line-height: 1.26;">
          <thead>
            <tr style="background: #0f172a; color: #ffffff;">
              <th style="width: 20%; padding: 2.5px 5px;">Social Rank / Statute / Venture</th>
              <th style="width: 27%; padding: 2.5px 5px;">Socio-Economic Position &amp; Legal Status</th>
              <th style="width: 28%; padding: 2.5px 5px;">Key Characteristics, Statutes &amp; Mechanisms</th>
              <th style="width: 25%; padding: 2.5px 5px;">Historical Significance &amp; Impact on Stability</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3px 5px; font-weight: 800; color: #0f172a;">1. Nobility &amp; Gentry (Elite)</td>
              <td style="padding: 3px 5px;">Titled peers, knights, squires, gentlemen (~2% of pop.); held vast landed estates and royal offices.</td>
              <td style="padding: 3px 5px;">Financed country prodigy houses (Hardwick Hall); enriched by enclosure and wool; served as unpaid JPs.</td>
              <td style="padding: 3px 5px; font-weight: 700; color: #1e3a8a;">Administered local justice, poor relief, and militia levies; maintained order without a standing army.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3px 5px; font-weight: 800; color: #0f172a;">2. 'Middling Sort' (Merchants &amp; Yeomen)</td>
              <td style="padding: 3px 5px;">Yeoman farmers, tenant farmers, urban merchants, lawyers, and master craftsmen.</td>
              <td style="padding: 3px 5px;">Educated in 72 new grammar schools; literate in Latin; invested in joint-stock ventures (Muscovy, Levant).</td>
              <td style="padding: 3px 5px; font-weight: 700; color: #1e3a8a;">Drove commercial capitalism, global trade, and parish governance; bridged elite and labouring poor.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3px 5px; font-weight: 800; color: #0f172a;">3. The Impotent Poor (Deserving)</td>
              <td style="padding: 3px 5px;">Aged, sick, lame, orphans, and widows physically incapable of work through no fault of their own.</td>
              <td style="padding: 3px 5px;">1572 Vagabonds Act instituted compulsory weekly parish poor rates; 1597/1601 codified overseers and almshouses.</td>
              <td style="padding: 3px 5px; font-weight: 700; color: #166534;">Pioneered statutory state welfare; established legal principle that society must care for the vulnerable.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3px 5px; font-weight: 800; color: #0f172a;">4. The Idle Poor (Able-Bodied)</td>
              <td style="padding: 3px 5px;">Unemployed labourers, evicted peasants, demobilised soldiers roaming as masterless vagrants.</td>
              <td style="padding: 3px 5px;">1572 Act: whipped &amp; bored through ear; 1576 Act created Bridewell Houses of Correction for forced work.</td>
              <td style="padding: 3px 5px; font-weight: 700; color: #991b1b;">Contained fears of social rebellion; combined brutal physical deterrence with corrective employment.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 3px 5px; font-weight: 800; color: #0f172a;">5. Colonial Ventures &amp; Trade</td>
              <td style="padding: 3px 5px;">Privateers (Drake), courtiers (Raleigh), and speculative colonist parties (Roanoke 1585/1587).</td>
              <td style="padding: 3px 5px;">Royal patents; Mercator projection; joint-stock funding; 1585 Lane military post &amp; 1587 White family colony.</td>
              <td style="padding: 3px 5px; font-weight: 700; color: #b45309;">Despite Roanoke's collapse ('Lost Colony'), broke Spanish monopoly and established blueprint for Jamestown (1607).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- The Historiographical Debate & Scholarship (3 Perspectives) -->
      <div style="background: #fdfcfb; border: 1.2px solid #cbd5e1; border-left: 3.5px solid #1e3a8a; padding: 5px 8px; border-radius: 3px; font-family: 'Inter', sans-serif; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
          <span style="font-size: 6.9pt; font-weight: 900; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.05em;">
            THE HISTORIOGRAPHICAL DEBATE &bull; THREE PERSPECTIVES ON ELIZABETHAN SOCIETY &amp; EMPIRE
          </span>
          <span style="font-size: 6.0pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 1px 5px; border-radius: 2px;">
            HISTORICAL SCHOLARSHIP
          </span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; font-size: 6.5pt; line-height: 1.28; color: #1e293b;">
          <div style="background: #eff6ff; padding: 4.5px 6px; border: 1px solid #bfdbfe; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block; margin-bottom: 1px; text-transform: uppercase; font-size: 6.2pt;">
              1. Traditional Whig (A.L. Rowse, 1950):
            </strong>
            The Elizabethan era was an incandescent 'Golden Age' of patriotic expansion. Humanist education and the secular theatre unleashed creative genius, while sea dogs like Drake and Raleigh gallantly planted the seeds of global British liberty and imperial commerce.
          </div>
          <div style="background: #fdf2f8; padding: 4.5px 6px; border: 1px solid #fbcfe8; border-radius: 2px;">
            <strong style="color: #9d174d; display: block; margin-bottom: 1px; text-transform: uppercase; font-size: 6.2pt;">
              2. Social Revisionist (Keith Wrightson, 1982):
            </strong>
            The 'Golden Age' masked profound social polarisation. Population boom and enclosure enriched the landed gentry and 'middling sort' while driving the bottom third of the population into wretched rural vagrancy and starvation, managed by savage ear boring.
          </div>
          <div style="background: #f0fdf4; padding: 4.5px 6px; border: 1px solid #bbf7d0; border-radius: 2px;">
            <strong style="color: #166534; display: block; margin-bottom: 1px; text-transform: uppercase; font-size: 6.2pt;">
              3. Post-Revisionist Imperial (Nicholas Canny, 2001):
            </strong>
            Roanoke and Virginia were not romantic adventures but early experiments in violent colonial subjugation directly linked to Tudor plantations in Ireland. Settlers treated indigenous populations with brutal militarism (Wingina's murder), guaranteeing their own operational doom.
          </div>
        </div>

        <div style="margin-top: 3px; background: #f8fafc; border-left: 2px solid #b45309; padding: 2.5px 6px; font-size: 6.3pt; color: #78350f;">
          <strong>Hinge Question for Class Discussion:</strong> <em>Was Elizabethan England genuinely a 'Golden Age' of humanist culture and global exploration, or was it a deeply unequal society defined by rural destitution and brutal social control?</em>
        </div>
      </div>

      <!-- Comparative Policy Evaluation Matrix (4 Pillars) -->
      <div style="border: 1.2px solid #0f172a; border-radius: 3px; overflow: hidden; background: #ffffff; margin-bottom: 6px;">
        <div style="background: #1e293b; color: #ffffff; padding: 2.5px 8px; font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; display: flex; justify-content: space-between;">
          <span>COMPARATIVE POLICY SUCCESS EVALUATION &bull; 1558–1588</span>
          <span>CRITERIA-LED VERDICT</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 5px; padding: 5px 6px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.26;">
          <div style="background: #f8fafc; padding: 4.5px 6px; border-left: 2.5px solid #16a34a; border-radius: 2px;">
            <strong style="color: #16a34a; display: block; text-transform: uppercase;">1. Education: High</strong>
            72 grammar schools and university expansion fostered a skilled, loyal 'middling sort' capable of managing Tudor law and government.
          </div>
          <div style="background: #f8fafc; padding: 4.5px 6px; border-left: 2.5px solid #d97706; border-radius: 2px;">
            <strong style="color: #d97706; display: block; text-transform: uppercase;">2. Poor Laws: Moderate</strong>
            Acts of 1572 and 1576 pioneered compulsory taxation and rehabilitation; but failed to halt structural poverty driven by harvest failures.
          </div>
          <div style="background: #f8fafc; padding: 4.5px 6px; border-left: 2.5px solid #16a34a; border-radius: 2px;">
            <strong style="color: #16a34a; display: block; text-transform: uppercase;">3. Oceanic Exploration: High</strong>
            Scientific navigation, joint-stock companies, and Drake’s circumnavigation broke Iberian monopoly and laid foundations of naval empire.
          </div>
          <div style="background: #f8fafc; padding: 4.5px 6px; border-left: 2.5px solid #dc2626; border-radius: 2px;">
            <strong style="color: #dc2626; display: block; text-transform: uppercase;">4. Colonisation: Failure</strong>
            Both 1585 and 1587 Roanoke ventures collapsed due to food losses, indigenous hostility, and Armada delays; zero permanent settlers by 1590.
          </div>
        </div>
      </div>

      <!-- Synoptic Disciplinary Assessment -->
      <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-left: 3.5px solid #0f172a; padding: 6.5px 8px; border-radius: 2px; font-family: 'Inter', sans-serif;">
        <span style="font-size: 6.6pt; font-weight: 900; color: #0f172a; text-transform: uppercase; display: block; margin-bottom: 2px;">
          SYNOPTIC VERDICT &bull; DOMESTIC TRANSFORMATION AND THE EMBRYONIC EMPIRE
        </span>
        <p style="font-size: 6.7pt; line-height: 1.30; color: #334155; margin: 0;">
          Between 1558 and 1588, Elizabethan England underwent profound domestic and global transformation. The expansion of humanist grammar schools and the emergence of the commercial playhouse fostered a dynamic, literate national culture that democratized entertainment across social ranks. Yet this flourishing Renaissance coincided with severe agrarian crisis: population boom, harvest failure, and sheep enclosure produced mass vagrancy that forced the state to construct Europe's first statutory welfare system. Abroad, bold merchant joint-stock enterprises and Drake's global circumnavigation shattered Iberian maritime supremacy. While Walter Raleigh's attempts to colonize Virginia ended in the tragic enigma of the 'Lost Colony', the financial, logistical, and maritime techniques perfected under Elizabeth directly enabled the permanent birth of the British Empire in the seventeenth century.
        </p>
      </div>

      <div class="running-footer">
        <span>Early Elizabethan England, 1558–1588 &bull; Key Topic 3 Master Synthesis</span>
        <span>Page 10</span>
      </div>

    </div>
  </div>

  <!-- ====================================================================
       PAGE 11: EDEXCEL PAPER 2 SECTION B EXAM MASTERCLASS
       ==================================================================== -->
  <div class="textbook-page" data-page="11">
    <div class="masterclass-page-layout">
      
      <div class="running-header">
        <span>EDEXCEL GCSE (9–1) HISTORY &bull; EARLY ELIZABETHAN ENGLAND, 1558–1588</span>
        <span>PAPER 2 SECTION B MASTERCLASS</span>
      </div>

      <!-- Exam Banner -->
      <div class="lesson-hero" style="margin-bottom: 5px; padding-bottom: 2px;">
        <div class="lesson-badge-strip">
          <span class="topic-badge">EXAM MASTERCLASS</span>
          <span class="spec-ref-badge">EDEXCEL PAPER 2 OPTION B4 &bull; 1HI0/B4</span>
        </div>
        <h2 class="lesson-title" style="font-size: 11.5pt; margin: 1px 0;">Edexcel Paper 2: Examination Strategy &amp; Exemplar Model Answers</h2>
        <div class="lesson-spec-anchor" style="padding: 2.5px 6px;">
          <strong>Official Exam Blueprint:</strong> Deconstructing Question 1(a) &amp; 1(b) Features [4m], Question 2 Causation [12m], and Question 3 Evaluative Essay [16m + 4 SPaG].
        </div>
      </div>

      <!-- Key Chronology: Eight Causal Turning Points (1558–1590) -->
      <div style="border: 1.2px solid #0f172a; border-radius: 3px; overflow: hidden; background: #ffffff; margin-bottom: 5px;">
        <div style="background: #0f172a; color: #ffffff; padding: 2.5px 8px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif;">
          <span style="font-size: 6.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em;">
            KEY CHRONOLOGY: EIGHT CAUSAL TURNING POINTS (1558–1590)
          </span>
          <span style="font-size: 5.8pt; font-weight: 700; color: #93c5fd;">SPECIFICATION EVIDENCE RECALL</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; padding: 4px 5px; font-family: 'Inter', sans-serif; font-size: 6.0pt; line-height: 1.24;">
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block;">1567 &bull; Harman's Caveat</strong>
            Pamphlet exposes vagrant 'Counterfeit Cranks'; stokes anti-vagrant hysteria.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block;">1569 &bull; Mercator Projection</strong>
            Map projection revolutionises ocean navigation with straight compass lines.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block;">1572 &bull; Vagabonds Act</strong>
            Severe corporal penalties (ear boring) combined with mandatory weekly poor rates.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block;">1576 &bull; The Theatre Built</strong>
            Burbage builds first commercial playhouse; 1576 Poor Act creates Bridewells.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #b45309; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #b45309; display: block;">1577–80 &bull; Circumnavigation</strong>
            Drake navigates globe on *Golden Hind*; claims Nova Albion; returns with £400k.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #b45309; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #b45309; display: block;">1584 &bull; Virginia Patent</strong>
            Raleigh granted royal patent; Amadas &amp; Barlowe reconnaissance surveys Roanoke.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #991b1b; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #991b1b; display: block;">1585–86 &bull; Ralph Lane's Colony</strong>
            *Tiger* grounding ruins food; Lane assassinates Wingina; colonists evacuate with Drake.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #991b1b; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #991b1b; display: block;">Aug 1590 &bull; The Lost Colony</strong>
            White returns after Armada embargo; finds Roanoke deserted with 'CROATOAN'.
          </div>
        </div>
      </div>

      <!-- Question 1(a) & 1(b) Feature Masterclass [4 Marks Total] -->
      <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-left: 3.5px solid #0284c7; padding: 4px 7px; border-radius: 3px; font-family: 'Inter', sans-serif; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5px; margin-bottom: 2px;">
          <span style="font-size: 6.8pt; font-weight: 900; color: #0369a1; text-transform: uppercase;">
            QUESTION 1(a) &amp; 1(b): DESCRIBE ONE FEATURE OF... [2 MARKS EACH &bull; 4 MARKS TOTAL &bull; 6 MINS]
          </span>
          <span style="font-size: 5.9pt; font-weight: 700; color: #475569;">
            Formula: 1 Mark Valid Feature + 1 Mark Supporting Detail (0 Explanation/Consequences)
          </span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
          <!-- Q1(a) -->
          <div style="background: #ffffff; padding: 3.5px 5.5px; border: 1px solid #e2e8f0; border-radius: 2px;">
            <div style="font-weight: 800; color: #0369a1; font-size: 6.3pt; margin-bottom: 1px;">
              Q1(a): Describe one feature of Elizabethan grammar schools. [2 marks]
            </div>
            <div style="font-size: 6.3pt; line-height: 1.28; color: #1e293b;">
              <strong>Model Answer:</strong> One feature was the academic curriculum focused almost exclusively on classical Latin grammar, Greek, and rhetoric. <em>[1 mark for valid feature]</em> Pupils attended from 6:00 am to 5:30 pm six days a week, memorizing Latin texts from authors such as Cicero and Virgil under the threat of corporal punishment with the birch rod. <em>[1 mark for supporting historical detail]</em>
            </div>
          </div>

          <!-- Q1(b) -->
          <div style="background: #ffffff; padding: 3.5px 5.5px; border: 1px solid #e2e8f0; border-radius: 2px;">
            <div style="font-weight: 800; color: #0369a1; font-size: 6.3pt; margin-bottom: 1px;">
              Q1(b): Describe one feature of the 1572 Vagabonds Act. [2 marks]
            </div>
            <div style="font-size: 6.3pt; line-height: 1.28; color: #1e293b;">
              <strong>Model Answer:</strong> One feature was the introduction of a compulsory weekly poor rate collected by local Justices of the Peace. <em>[1 mark for valid feature]</em> This statutory tax made property owners legally responsible for funding pensions to support the impotent poor (the aged, sick, and disabled), imprisoning those who refused to pay. <em>[1 mark for supporting historical detail]</em>
            </div>
          </div>
        </div>

        <!-- Examiner Tip & Warning Box -->
        <div style="margin-top: 2.5px; background: #eff6ff; border: 1px solid #bfdbfe; padding: 2px 5px; font-size: 5.9pt; color: #1e40af; border-radius: 2px;">
          <strong>Examiner Warning:</strong> Notice that Edexcel Paper 2 strictly splits Question 1 into Q1(a) [2m] and Q1(b) [2m]. Keep answers concise: state the feature, provide one precise factual detail/date/statistic, and stop immediately. Never write explanations or consequences!
        </div>
      </div>

      <!-- Question 2 Masterclass: Causation [12 Marks] -->
      <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-left: 3.5px solid #b45309; padding: 4px 7px; border-radius: 3px; font-family: 'Inter', sans-serif; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5px; margin-bottom: 2px;">
          <span style="font-size: 6.8pt; font-weight: 900; color: #b45309; text-transform: uppercase;">
            QUESTION 2: EXPLAIN WHY... [12 MARKS &bull; 18 MINUTES]
          </span>
          <span style="font-size: 5.9pt; font-weight: 700; color: #475569;">
            Formula: 3 Full PEEL Paragraphs (2 Stimulus + 1 Own Knowledge) + Explicit Causal Connectives
          </span>
        </div>
        <div style="font-size: 6.4pt; font-weight: 800; color: #0f172a; margin-bottom: 2px;">
          Exam Prompt: Explain why poverty and vagrancy increased in Elizabethan England between 1558 and 1588. You may use: (1) Enclosure of land, (2) Population growth. [12 marks]
        </div>
        <div style="font-size: 6.2pt; line-height: 1.27; color: #334155; display: flex; flex-direction: column; gap: 2.5px;">
          <div style="background: #ffffff; padding: 3px 5.5px; border: 1px solid #e2e8f0; border-radius: 2px;">
            <strong style="color: #b45309;">PEEL Paragraph 1 (Agrarian Enclosure &amp; Sheep Pasture):</strong> One major reason poverty and vagrancy soared was the spread of agricultural enclosure and conversion of arable land to sheep pasture. Traditional open-field arable farming had sustained dozens of peasant families per village, but rising wool prices incentivized landlords to fence off common land and convert fields into pastures, where a single shepherd could tend 2,000 sheep. Furthermore, landlords engaged in rack-renting, drastically hiking rents to evict customary tenants. <em>Consequently,</em> hundreds of tenant families were evicted from their ancestral land with no means of subsistence, forcing them to wander the highways as homeless vagabonds in search of work.
          </div>
          <div style="background: #ffffff; padding: 3px 5.5px; border: 1px solid #e2e8f0; border-radius: 2px;">
            <strong style="color: #b45309;">PEEL Paragraph 2 (Demographic Growth &amp; Food Price Inflation):</strong> Furthermore, the crisis was driven by explosive population growth across sixteenth-century England. The national population increased by over 35%, expanding from 2.8 million in 1558 to over 4 million by the end of the reign. Because agricultural output failed to keep pace with demographic demand, food supplies grew scarce, causing grain prices to double. <em>As a direct result,</em> ordinary labourers suffered a catastrophic drop in real wages, spending up to 80% of their earnings merely on bread. When poor harvests struck in the 1570s and 1580s, working families who could previously survive were plunged into absolute destitution.
          </div>
          <div style="background: #ffffff; padding: 3px 5.5px; border: 1px solid #e2e8f0; border-radius: 2px;">
            <strong style="color: #b45309;">PEEL Paragraph 3 (Own Knowledge: Collapse of the Antwerp Cloth Trade):</strong> Crucially, poverty was dramatically exacerbated by the sudden collapse of England's primary overseas export market: the Antwerp cloth trade. English cloth accounted for over 75% of national exports, but when war erupted in the Spanish Netherlands and Philip II placed trade embargoes on English goods in the 1560s, the Antwerp exchange ground to a halt. <em>Therefore,</em> thousands of domestic cloth workers, spinners, and weavers in East Anglia and the West Country lost their employment overnight; unable to find agricultural work due to enclosure, they were forced into urban vagrancy, swelling the slums of London.
          </div>
        </div>
        <div style="margin-top: 2.5px; background: #fffbeb; border: 1px solid #fde68a; padding: 2.5px 6px; font-size: 5.9pt; color: #92400e; border-radius: 2px; display: flex; justify-content: space-between;">
          <span><strong>Examiner Causation Strategy (Level 4):</strong> Contrast long-term demographic and agrarian changes (enclosure, population boom) with the immediate catalytic shock of the Antwerp trade embargoes. Candidates must explicitly link causes together.</span>
          <span style="font-weight: 800;">12/12 CRITERIA</span>
        </div>
      </div>

      <!-- Question 3 Masterclass: Evaluative Essay [16 Marks + 4 SPaG] -->
      <div style="background: #fdfaf6; border: 1.2px solid #fed7aa; border-left: 3.5px solid #991b1b; padding: 4px 7px; border-radius: 3px; font-family: 'Inter', sans-serif; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #ffedd5; padding-bottom: 1.5px; margin-bottom: 2px;">
          <span style="font-size: 6.8pt; font-weight: 900; color: #991b1b; text-transform: uppercase;">
            QUESTION 3: EVALUATIVE ESSAY [16 MARKS + 4 SPAG &bull; 25 MINUTES]
          </span>
          <span style="font-size: 5.9pt; font-weight: 700; color: #475569;">
            Level 4 Standard: 3 Balanced Factors + Criteria-Led Sustained Judgement
          </span>
        </div>
        <div style="font-size: 6.4pt; font-weight: 800; color: #0f172a; margin-bottom: 2px;">
          Exam Prompt: "The lack of food supplies was the main reason for the failure of the Virginia colonies in the 1580s." How far do you agree? Explain your answer. You may use: (1) The grounding of the Tiger (1585), (2) Relations with Native Americans (Wingina). [16 marks + 4 SPaG]
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; font-size: 6.1pt; line-height: 1.25; margin-bottom: 2px;">
          <div style="background: #ffffff; padding: 3.5px 5.5px; border: 1px solid #fed7aa; border-radius: 2px;">
            <strong style="color: #991b1b; display: block; text-transform: uppercase;">Factor 1: Food Supplies (Agree)</strong>
            Grounding of the flagship *Tiger* in 1585 ruined almost all seed grain and provisions; colonists arrived too late in season to plant crops in 1587, creating total dependency on relief.
          </div>
          <div style="background: #ffffff; padding: 3.5px 5.5px; border: 1px solid #fed7aa; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block; text-transform: uppercase;">Factor 2: Indigenous Conflict (Counter)</strong>
            Lane’s heavy-handed military brutality (burning a Secotan village over a stolen cup) and assassination of Chief Wingina turned local tribes hostile, cutting off all trade and food assistance.
          </div>
          <div style="background: #ffffff; padding: 3.5px 5.5px; border: 1px solid #fed7aa; border-radius: 2px;">
            <strong style="color: #0f172a; display: block; text-transform: uppercase;">Factor 3: Poor Personnel &amp; Armada Delay (Counter)</strong>
            Gentlemen refused manual labour; soldiers used violence instead of fishing; 1588 Armada crisis caused a 3-year shipping embargo, stranding the 1587 settlers without relief.
          </div>
        </div>

        <div style="background: #ffffff; padding: 3.5px 6px; border: 1px solid #fed7aa; border-radius: 2px; font-size: 6.2pt; line-height: 1.27; color: #1e293b;">
          <strong style="color: #991b1b; text-transform: uppercase; font-size: 6.2pt; display: block; margin-bottom: 1px;">Exemplar Level 4 Conclusion (Criteria-Led Sustained Judgement):</strong>
          <em>"In conclusion, while the catastrophic loss of food supplies caused by the grounding of the Tiger was the immediate physical catalyst for starvation, poor leadership and the breakdown of indigenous relations were the fundamental causes of the Virginia colonies' failure. When assessing causality by the criterion of reversibility, the lack of food was only fatal because the colonists possessed neither the skills to forage for themselves nor the diplomatic goodwill to secure sustenance from the Secotan tribe. Ralph Lane's fatal decision to burn a native village over a stolen cup and assassinate Chief Wingina destroyed any possibility of indigenous agricultural support. Furthermore, the colony's demographic composition—dominated by aristocratic gentlemen who refused manual labour and violent soldiers unsuited to farming—ensured that the 1585 settlement was structurally incapable of self-sufficiency. In 1587, this operational fragility was sealed by the unexpected 1588 Spanish Armada crisis, which prevented John White from returning with relief ships for three critical years. Therefore, food shortages triggered the crises, but flawed colonial planning and toxic indigenous relations made disaster inevitable."</em>
        </div>

        <!-- SPaG Mastery Box -->
        <div style="margin-top: 2.5px; background: #fffbeb; border: 1px solid #fde68a; padding: 2.5px 5.5px; font-size: 5.9pt; color: #92400e; border-radius: 2px; display: flex; justify-content: space-between;">
          <span><strong>SPaG Masterclass (+4 Marks):</strong> Spell technical terms accurately (<em>enclosure, humanism, rack-renting, Roanoke, Croatoan, joint-stock</em>). Use complex analytical evaluative phrases (<em>fundamentally, precipitated, structural constraint</em>).</span>
          <span style="font-weight: 800;">4/4 SPaG TARGET</span>
        </div>
      </div>

      <!-- Examiner Marking Blueprint & Band Descriptors Table -->
      <div style="border: 1.2px solid #0f172a; border-radius: 3px; overflow: hidden; background: #ffffff;">
        <div style="background: #0f172a; color: #ffffff; padding: 2.5px 8px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif;">
          <span style="font-size: 6.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em;">
            EDEXCEL PAPER 2 EXAMINER MARKING BLUEPRINT &amp; BAND DESCRIPTORS
          </span>
          <span style="font-size: 5.8pt; font-weight: 700; color: #93c5fd;">OPTION B4 &bull; 1HI0/B4</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; padding: 3.5px 6px; font-family: 'Inter', sans-serif; font-size: 5.9pt; line-height: 1.24;">
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 2.5px solid #16a34a; padding: 3px 4.5px; border-radius: 2px;">
            <strong style="color: #166534; display: block; font-size: 6.1pt; text-transform: uppercase;">Level 4 (13–16 Marks)</strong>
            <strong>Criteria-Led Evaluation:</strong> Analytical throughout; deploys line-by-line precise factual evidence; sustained judgement weighing root vs catalytic causes.
          </div>
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 2.5px solid #2563eb; padding: 3px 4.5px; border-radius: 2px;">
            <strong style="color: #1e40af; display: block; font-size: 6.1pt; text-transform: uppercase;">Level 3 (9–12 Marks)</strong>
            <strong>Explanatory &amp; Balanced:</strong> Explains both stimulus points plus own knowledge; links factors to prompt, but conclusion summarizes rather than synthesizes.
          </div>
          <div style="background: #fffbeb; border: 1px solid #fde68a; border-left: 2.5px solid #d97706; padding: 3px 4.5px; border-radius: 2px;">
            <strong style="color: #92400e; display: block; font-size: 6.1pt; text-transform: uppercase;">Level 2 (5–8 Marks)</strong>
            <strong>Descriptive Narrative:</strong> Recounts narrative events without explicit analytical focus; unbalanced or lacks independent own knowledge beyond stimulus.
          </div>
          <div style="background: #fef2f2; border: 1px solid #fecaca; border-left: 2.5px solid #dc2626; padding: 3px 4.5px; border-radius: 2px;">
            <strong style="color: #991b1b; display: block; font-size: 6.1pt; text-transform: uppercase;">Level 1 (1–4 Marks)</strong>
            <strong>Basic Statements:</strong> Generalized historical assertions with significant inaccuracies; offers simple assertions without supporting factual detail.
          </div>
        </div>
        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 3.5px 6px; font-family: 'Inter', sans-serif; font-size: 5.8pt; line-height: 1.22; display: flex; justify-content: space-between; align-items: center; color: #475569;">
          <span><strong>Exam Timing Allocation (50 Mins):</strong> Q1(a) 3 mins [2m] &bull; Q1(b) 3 mins [2m] &bull; Q2 Causation 18 mins [12m] &bull; Q3 Essay 25 mins [16+4m] &bull; Review 1 min</span>
          <span style="font-weight: 800; color: #0f172a;">PEARSON EDEXCEL SPECIFICATION TARGET</span>
        </div>
      </div>

      <div class="running-footer">
        <span>Early Elizabethan England, 1558–1588 &bull; Edexcel Examination Strategy</span>
        <span>Page 11</span>
      </div>

    </div>
  </div>

  <!-- ====================================================================
       PAGE 12: MASTER BACK COVER (Matching CME Publisher Standard)
       ==================================================================== -->
  <div class="textbook-page" data-page="12">
    <div class="back-cover-layout">
      
      <!-- Top Departmental Header Bar -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">GCSE History Revision Hub &bull; Course Textbook</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">
            EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: EARLY ELIZABETHAN ENGLAND, 1558–1588
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800;">OPTION B4 &bull; 1HI0/B4</span>
        </div>
      </div>

      <!-- Master Chronological Sequence Table (14 Key Specification Events) -->
      <div style="border: 1.5px solid #0f172a; border-radius: 4px; overflow: hidden; background: #ffffff; margin-bottom: 2.5px;">
        <div style="background: #0f172a; color: #ffffff; padding: 2.5px 8px; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.6px; display: flex; justify-content: space-between; align-items: center;">
          <span>Key Topic 3 Chronological Sequence &bull; Turning Points (1558–1590)</span>
          <span style="font-size: 6.5pt; letter-spacing: 0.4px;">Causal Progression</span>
        </div>
        <table class="master-chron-table" style="font-size: 6.6pt; line-height: 1.25;">
          <thead>
            <tr style="background: #1e293b; color: #ffffff;">
              <th style="width: 82px; padding: 2.5px 6px;">Date</th>
              <th style="width: 145px; padding: 2.5px 6px;">Pivotal Event</th>
              <th style="padding: 2.5px 6px;">Historical Significance &amp; Causal Consequence</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">1560s</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Expansion of Grammar Schools</td>
              <td style="padding: 2.2px 6px;">72 grammar schools founded under Elizabeth; humanist Latin training fosters the 'middling sort'.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">1567</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Harman’s *Caveat for Cursitors*</td>
              <td style="padding: 2.2px 6px;">Sensationalist taxonomy of vagabond tricks stokes national moral panic over 'idle' rogues.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">1568</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">San Juan de Ulúa Ambush</td>
              <td style="padding: 2.2px 6px;">Spanish attack on Hawkins and Drake shatters maritime truce, opening era of English privateering.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">1569</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Mercator Projection Published</td>
              <td style="padding: 2.2px 6px;">Flemish cartographer introduces projection enabling straight-line compass navigation across oceans.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">1571</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Jesus College Oxford Founded</td>
              <td style="padding: 2.2px 6px;">First Protestant college endowed by royal charter to educate Welsh scholars for state service.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">1572</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">The 1572 Vagabonds Act</td>
              <td style="padding: 2.2px 6px;">Enforces ear-boring on rogues while mandating compulsory weekly poor rates collected by JPs.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">1576</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Burbage Builds *The Theatre*</td>
              <td style="padding: 2.2px 6px;">London's first purpose-built public playhouse opens in Shoreditch, launching commercial drama.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">1576</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Act for the Relief of the Poor</td>
              <td style="padding: 2.2px 6px;">Towns ordered to provide raw materials for employment and establish Bridewell Houses of Correction.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">Jun 1579</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Drake Claims *Nova Albion*</td>
              <td style="padding: 2.2px 6px;">Drake lands in California, nails brass plate for Queen Elizabeth; claims first English territory in America.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">Sep 1580</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Drake Returns on *Golden Hind*</td>
              <td style="padding: 2.2px 6px;">Completes circumnavigation with £400,000 treasure; knighted at Deptford on 4 April 1581.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">Mar 1584</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Raleigh Granted Virginia Patent</td>
              <td style="padding: 2.2px 6px;">Royal patent authorizes settlement; Amadas &amp; Barlowe survey Outer Banks; territory named 'Virginia'.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">1585–1586</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Ralph Lane’s Roanoke Colony</td>
              <td style="padding: 2.2px 6px;">*Tiger* grounding ruins grain; Lane assassinates Wingina; colonists starve and evacuate with Drake.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">18 Aug 1587</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Birth of Virginia Dare</td>
              <td style="padding: 2.2px 6px;">First English child born in North America; Governor John White returns to England for supplies.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">Aug 1590</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Discovery of the 'Lost Colony'</td>
              <td style="padding: 2.2px 6px;">White returns after Armada embargo; finds Roanoke deserted with 'CROATOAN'; colony lost to history.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Core Specification Terminology & Exam Question Models (2-Column Grid) -->
      <div style="display: grid; grid-template-columns: 1fr 1.15fr; gap: 6px; margin-bottom: 2.5px;">
        
        <!-- Key Historical Concepts & Terminology -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 4.5px 7px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.4px; display: block; border-bottom: 1.5px solid #0f172a; padding-bottom: 1.5px; margin-bottom: 2.5px;">
            Key Disciplinary Terminology
          </strong>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.27; color: #334155; display: flex; flex-direction: column; gap: 2px;">
            <div>&bull; <strong>Humanism:</strong> Renaissance philosophy prioritising classical Latin grammar, rhetoric, and civic responsibility.</div>
            <div>&bull; <strong>Grammar Schools:</strong> Fee-paying secondary schools educating boys from the middling sort in Latin, Greek, and debate.</div>
            <div>&bull; <strong>Groundlings:</strong> Common theatregoers paying one penny to stand in the open pit of commercial playhouses.</div>
            <div>&bull; <strong>Enclosure:</strong> Fencing in communal open fields for sheep pasture, causing rural depopulation and rack-renting.</div>
            <div>&bull; <strong>Impotent Poor:</strong> Those physically unable to work (aged, sick, lame), relieved by statutory parish poor rates.</div>
            <div>&bull; <strong>Joint-Stock Company:</strong> Business where investors pool capital and share liability, pioneering overseas global trade.</div>
            <div>&bull; <strong>Mercator Projection:</strong> 1569 map projection representing lines of constant compass direction as straight lines.</div>
            <div>&bull; <strong>Royal Patent:</strong> Official royal charter granting exclusive rights to explore, govern, and trade in a new territory.</div>
          </div>
        </div>

        <!-- Examination Question Structure with Concrete Specification Models -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 4.5px 7px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #0f172a; padding-bottom: 1.5px; margin-bottom: 2.5px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.4px;">
              Edexcel Paper 2 Exam Framework &amp; Models
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 800; background: #0f172a; color: #fff; padding: 1px 4.5px; border-radius: 2px;">
              32 MARKS TOTAL &bull; 50 MINS
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.25; color: #1e293b; display: flex; flex-direction: column; gap: 2.5px;">
            <div style="background: #f8fafc; border-left: 2.5px solid #0284c7; padding: 2px 4px; border-radius: 0 2px 2px 0;">
              <span style="font-weight: 800; color: #0369a1;">Q1(a) &amp; Q1(b): Describe ONE feature of... [2 + 2 = 4 Marks &bull; 6 Mins]</span><br>
              <em>Model:</em> &ldquo;Describe one feature of the 1572 Vagabonds Act.&rdquo;<br>
              <span style="color: #64748b; font-size: 5.8pt; font-weight: 600;">Formula: 1 mark valid feature + 1 mark supporting historical detail (0 explanation).</span>
            </div>
            <div style="background: #f8fafc; border-left: 2.5px solid #b45309; padding: 2px 4px; border-radius: 0 2px 2px 0;">
              <span style="font-weight: 800; color: #b45309;">Q2: Explain why... [12 Marks &bull; 18 Mins]</span><br>
              <em>Model:</em> &ldquo;Explain why poverty and vagrancy increased between 1558 and 1588.&rdquo;<br>
              <span style="color: #64748b; font-size: 5.8pt; font-weight: 600;">Formula: 3 PEEL paragraphs (2 stimulus + 1 own knowledge) linked with causal connectives.</span>
            </div>
            <div style="background: #f8fafc; border-left: 2.5px solid #991b1b; padding: 2px 4px; border-radius: 0 2px 2px 0;">
              <span style="font-weight: 800; color: #991b1b;">Q3: Evaluative Essay [16 Marks + 4 SPaG &bull; 25 Mins]</span><br>
              <em>Model:</em> &ldquo;'Food shortages were the main reason for Roanoke's failure.' How far do you agree?&rdquo;<br>
              <span style="color: #64748b; font-size: 5.8pt; font-weight: 600;">Formula: 3 balanced analytical paragraphs + criteria-led sustained conclusion.</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Assessment Objectives (AO) Mastery Banner -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 2.5px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.24;">
        <div style="border-right: 1px solid #e2e8f0; padding-right: 6px;">
          <strong style="color: #0f172a; text-transform: uppercase; font-size: 6.3pt; display: block; margin-bottom: 1px;">Assessment Objective 1 (AO1 &bull; 50%):</strong>
          Demonstrate knowledge and understanding of key features (grammar schools, enclosure statistics, poor relief statutes, navigational instruments, Roanoke dates).
        </div>
        <div>
          <strong style="color: #0f172a; text-transform: uppercase; font-size: 6.3pt; display: block; margin-bottom: 1px;">Assessment Objective 2 (AO2 &bull; 50%):</strong>
          Explain and analyse historical events using second-order concepts (cause, consequence, change, continuity, and reaching sustained historical judgements).
        </div>
      </div>

      <!-- Interactive Digital Retrieval & Revision Hub (Full-Width Strip) -->
      <div style="border: 1.5px solid #1e3a8a; border-left: 4.5px solid #1e3a8a; border-radius: 4px; padding: 4.5px 8px; background: #f8fafc; display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 2px;">
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 1.5px;">
            <span style="background: #1e3a8a; color: #fff; font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; padding: 1px 5px; border-radius: 2px; letter-spacing: 0.5px;">
              Interactive Digital Retrieval Hub
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.3px;">
              Key Topic 3 Knowledge Quiz &amp; Flashcards
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #1e293b; line-height: 1.27; margin-bottom: 2px;">
            Scan the QR code with any smartphone or tablet camera to launch the interactive, self-marking retrieval bank for Key Topic 3. Test your rapid recall across Grammar Schools, Enclosure &amp; Vagrancy, Poor Laws, Drake’s Circumnavigation, and Raleigh’s Roanoke colony with instant model answers and scoring.
          </div>
          <div style="display: flex; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.0pt; font-weight: 700; color: #475569;">
            <span>&bull; 20 Specification Recall Questions</span>
            <span>&bull; Instant Self-Marking &amp; Explanations</span>
            <span>&bull; Digital Leitner Flashcard Deck</span>
          </div>
        </div>
        <div style="text-align: center; flex-shrink: 0; display: flex; flex-direction: column; align-items: center;">
          <img src="${qrDataUrl}" alt="Key Topic 3 Quiz QR" style="width: 20mm; height: 20mm; display: block; border: 1px solid #cbd5e1; border-radius: 3px; padding: 1px; background: #fff;">
          <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 800; text-transform: uppercase; color: #1e3a8a; margin-top: 1.5px; letter-spacing: 0.3px;">
            Scan for Mobile Quiz
          </span>
        </div>
      </div>

      <!-- Back Cover Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #333; font-weight: 700;">
        <span>Paper 2: Early Elizabethan England, 1558–1588 &bull; Key Topic 3 Specification Review Index</span>
        <span>Page 12 of 12</span>
      </div>

    </div>
  </div>

</body>
</html>`;

  return html;
}

async function runKT3() {
  console.log('================================================================');
  console.log('🏛️ RENDERING EARLY ELIZABETHAN ENGLAND KEY TOPIC 3 MASTER TEXTBOOK');
  console.log('================================================================');

  const html = await buildPublisherTextbookHtmlKT3();

  const htmlOutputDir = path.join(ROOT_DIR, 'public', 'units', 'eee');
  if (!fs.existsSync(htmlOutputDir)) fs.mkdirSync(htmlOutputDir, { recursive: true });
  const htmlPath = path.join(htmlOutputDir, 'textbook_KT3_PUBLISHER.html');
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('✅ HTML compiled to:', htmlPath);

  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) fs.mkdirSync(pdfOutputDir, { recursive: true });
  const pdfPublisherPath = path.join(pdfOutputDir, 'eee_textbook_KT3_PUBLISHER.pdf');
  const pdfLegacyPath = path.join(pdfOutputDir, 'eee_textbook_KT3.pdf');
  const pdfFinalV17Path = path.join(pdfOutputDir, 'eee_textbook_KT3_FINAL_V17.pdf');

  console.log('🚀 Launching Puppeteer for A4 PDF compilation & layout audit...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Page Height & Overflow Audit
  const audit = await page.evaluate(() => {
    const pages = document.querySelectorAll('.textbook-page');
    const results = [];
    pages.forEach((p, idx) => {
      const pageNum = idx + 1;
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const overflow = scrollH > clientH + 2;
      results.push({ pageNum, scrollH, clientH, overflow });
    });
    return results;
  });

  console.log('\n📊 Page Height & Overflow Audit (Target: 12 Pages, Max 297mm):');
  let hasOverflow = false;
  audit.forEach((r) => {
    const status = r.overflow
      ? `⚠️ OVERFLOW (+${r.scrollH - r.clientH}px)`
      : '✅ OPTIMAL (0px overflow)';
    console.log(
      `   Page ${r.pageNum.toString().padStart(2, ' ')}: ${r.scrollH}px / ${r.clientH}px | ${status}`,
    );
    if (r.overflow) hasOverflow = true;
  });

  if (hasOverflow) {
    console.warn(
      '\n⚠️ WARNING: Detected page overflow! Adjusting typography or image heights required.',
    );
  } else {
    console.log('\n🎉 AUDIT PASSED: Perfect 0px overflow across all 12 pages in A4!');
  }

  await page.pdf({
    path: pdfPublisherPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  console.log('✅ Master Publisher PDF generated:', pdfPublisherPath);

  // Sync to standard alias so all links in web app and drive update seamlessly
  fs.copyFileSync(pdfPublisherPath, pdfLegacyPath);
  fs.copyFileSync(pdfPublisherPath, pdfFinalV17Path);
  console.log('✅ Synchronized active aliases:');
  console.log('   -', pdfLegacyPath);
  console.log('   -', pdfFinalV17Path);

  // Synchronize to Google Drive Department File if available
  const driveDest =
    'G:\\My Drive\\AAMX\\Dep File\\Year 11 (GCSE)\\Paper 2 - Early Elizabethan England\\Early Elizabethan England Master Textbook (KT3).pdf';
  if (fs.existsSync(path.dirname(driveDest))) {
    fs.copyFileSync(pdfPublisherPath, driveDest);
    console.log('✅ Synchronized directly to Google Drive Department File:');
    console.log('   -', driveDest);
  }

  await browser.close();
  console.log('🎉 Key Topic 3 Master Textbook compilation complete!\n');
}

if (require.main === module) {
  runKT3().catch((err) => {
    console.error('Fatal error during textbook compilation:', err);
    process.exit(1);
  });
}

module.exports = { runKT3 };

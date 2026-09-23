/**
 * History Revision Hub — Publisher-Level Standard Textbook Engine
 *
 * Target: units/early_modern_world (KS3: Early Modern World, 1450–1750)
 * Output: public/pdfs/early_modern_world_textbook_PUBLISHER.pdf
 * HTML:   public/units/early_modern_world/textbook_PUBLISHER.html
 *
 * Architectural Standards Enforced:
 * 1. Commercial Independence: Strict institutional neutrality; 0 prohibited school identifiers.
 * 2. Exact 20-Page Budget:
 *    - Page 1:  Master Front Cover (98mm uncropped photographic plate, syllabus matrix)
 *    - Page 2:  Lesson 1 (Global Power in 1450 - Sections 1 & 2, Sources A & B, Vocab Deck)
 *    - Page 3:  Lesson 1 (Global Power in 1450 - Sections 3 & 4, Source C, Mehmed II Card, Concept Spotlight, Archival Dispatch, Enquiry Deck)
 *    - Page 4:  Lesson 2 (Reformation & Exploration - Sections 1 & 2, Sources A & B, Vocab Deck)
 *    - Page 5:  Lesson 2 (Reformation & Exploration - Sections 3 & 4, Source C, Drake Card, Concept Spotlight, Archival Dispatch, Enquiry Deck)
 *    - Page 6:  Lesson 3 (Trade to Empire - Sections 1 & 2, Sources A & B, Vocab Deck)
 *    - Page 7:  Lesson 3 (Trade to Empire - Sections 3 & 4, Source C, Oba of Benin Card, Concept Spotlight, Archival Dispatch, Enquiry Deck)
 *    - Page 8:  Lesson 4 (Gunpowder Plot - Sections 1 & 2, Sources A & B, Vocab Deck)
 *    - Page 9:  Lesson 4 (Gunpowder Plot - Sections 3 & 4, Source C, Catesby Card, Concept Spotlight, Archival Dispatch, Enquiry Deck)
 *    - Page 10: Lesson 5 (Ideological Battle & Civil War - Sections 1 & 2, Sources A & B, Vocab Deck)
 *    - Page 11: Lesson 5 (Ideological Battle & Civil War - Sections 3 & 4, Source C, Charles I Card, Concept Spotlight, Archival Dispatch, Enquiry Deck)
 *    - Page 12: Lesson 6 (The Economic Shift & Glorious Revolution - Sections 1 & 2, Sources A & B, Vocab Deck)
 *    - Page 13: Lesson 6 (The Economic Shift & Glorious Revolution - Sections 3 & 4, Source C, Cromwell Card, Concept Spotlight, Archival Dispatch, Enquiry Deck)
 *    - Page 14: Lesson 7 (Mechanics of Transatlantic Slave Trade - Sections 1 & 2, Sources A & B, Vocab Deck)
 *    - Page 15: Lesson 7 (Mechanics of Transatlantic Slave Trade - Sections 3 & 4, Source C, Falconbridge Card, Concept Spotlight, Archival Dispatch, Enquiry Deck)
 *    - Page 16: Lesson 8 (Resistance to the Slave Trade - Sections 1 & 2, Sources A & B, Vocab Deck)
 *    - Page 17: Lesson 8 (Resistance to the Slave Trade - Sections 3 & 4, Source C, Nanny of the Maroons Card, Concept Spotlight, Archival Dispatch, Enquiry Deck)
 *    - Page 18: Lesson 9 (How Modern was Britain by 1750? - Sections 1 & 2, Sources A & B, Vocab Deck)
 *    - Page 19: Lesson 9 (How Modern was Britain by 1750? - Sections 3 & 4, Source C, Newton Card, Concept Spotlight, Archival Dispatch, Enquiry Deck)
 *    - Page 20: Master Back Cover (1450–1750 Chronological Sequence, Disciplinary Glossary & Essay Matrix)
 * 3. Base64 Image Inlining for 100% offline and Puppeteer fidelity.
 * 4. High-Yield Component Bank delivering >= 90% fill on all right-hand pages.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.join(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'early_modern_world', 'data.js');

if (!fs.existsSync(dataPath)) {
  console.error('Data file not found:', dataPath);
  process.exit(1);
}

// Parse units/early_modern_world/data.js
const dataContent = fs.readFileSync(dataPath, 'utf8');
const startIndex = dataContent.indexOf('{');
const endIndex = dataContent.lastIndexOf('}');
const unitData = eval('(' + dataContent.substring(startIndex, endIndex + 1) + ')');

const lessons = unitData.lessons || [];
console.log(`Loaded ${lessons.length} Early Modern World lessons for publisher textbook.`);

/**
 * Base64 Image Inliner
 */
function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'early_modern_world', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'early_modern_world', 'assets', path.basename(clean)),
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
  return null;
}

function formatText(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// High-Yield Component Bank for Early Modern World Right-Hand Pages
const EARLY_MODERN_COMPONENT_BANK = {
  // Page 3: Lesson 1 (Global Power in 1450)
  p3: {
    keyFigure: {
      name: 'Sultan Mehmed II (The Conqueror)',
      lifespan: '1432–1481',
      role: 'Sultan of the Ottoman Empire (Reigned 1451–1481)',
      significance:
        'Captured Constantinople in 1453, ending the Byzantine Empire and placing overland trade routes between Europe and Asia under Ottoman control.',
      actions: [
        'Employed Hungarian cannon-founder Urban to construct massive super-cannons (the "Dardanelles Gun") to shatter the ancient Theodosian Walls.',
        'Transported Ottoman warships overland on greased logs into the Golden Horn to bypass the Byzantine harbour chain barrier.',
        'Transformed Constantinople into the imperial capital Istanbul and established commercial dominance over the Eastern Mediterranean trade nexus.',
      ],
      image: getBase64Image('/images/mehmed_ii.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">COMMERCIAL MECHANISM</span>
          <span class="csb-category">TRADE MONOPOLIES &bull; 1453</span>
        </div>
        <h4 class="csb-title">The Fall of Constantinople &amp; The Quest for Sea Routes</h4>
        <div class="csb-body">
          Before 1453, Western European merchants relied on Venetian and Genoese trading networks that purchased silk, porcelain, and spices from Asian caravans arriving at Constantinople. Following the Ottoman conquest, Muslim authorities imposed heavy taxes on Christian traders and restricted direct access to the Black Sea and Levant. Faced with soaring spice prices and bullion drain, Atlantic kingdoms (Portugal and Spain) realized they could not break the Venetian-Ottoman monopoly overland. This commercial bottleneck directly triggered the Age of Discovery as navigators sought direct maritime passages to India around Africa or across the Atlantic.
        </div>
        <div class="csb-takeaway">
          <strong>Key Causation:</strong> Ottoman control of the overland Silk Road transformed Western Europe from a peripheral, landlocked backwater into an aggressive maritime explorer civilization.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Eyewitness Merchant Chronicle</span>
          </div>
          <span class="source-date-micro">May 1453</span>
        </div>
        <div class="archival-title">Niccolò Barbaro’s Diary of the Siege of Constantinople</div>
        <div class="archival-body">
          "On the twenty-ninth of May, 1453, the sun had not yet risen when the Turks entered the city through the San Romano gate... The blood flowed in the city like rainwater in the gutters after a sudden storm. The great church of Hagia Sophia was filled with captives, and the ancient empire of the Romans has ceased to exist."
        </div>
        <div class="archival-footer">
          <span>Biblioteca Marciana, Venice (Codex Marcianus)</span>
          <span>Constantinople, May 1453</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Why was the geographical position of Constantinople so crucial for Eurasian trade in 1450?',
      q2: 'Explain how the Catalan Atlas (1375) reveals the immense wealth of West African empires like Mali.',
      q3: 'Historians argue whether 1450 was an era of European superiority or European insignificance. Evaluate which interpretation has stronger historical evidence.',
    },
  },

  // Page 5: Lesson 2 (Religious Conflict & Global Exploration, 1517–1588)
  p5: {
    keyFigure: {
      name: 'Sir Francis Drake',
      lifespan: 'c. 1540–1596',
      role: 'Elizabethan Privateer, Navigator & Vice-Admiral of the English Fleet',
      significance:
        'Circumnavigated the globe (1577–1580), raided Spanish silver shipments along the Pacific coast, and played a decisive role defeating the Spanish Armada.',
      actions: [
        'Captured the Spanish galleon *Nuestra Señora de la Concepción* ("Cacafuego"), seizing twenty-six tons of uncoined silver bullion and eighty pounds of gold.',
        'Knighted by Queen Elizabeth I aboard his flagship *The Golden Hind* at Deptford in 1581, defying Spanish demands for his execution as a pirate.',
        'Executed the daring fire-ship attack against the Spanish Armada at Gravelines in 1588, scattering the Spanish crescent formation.',
      ],
      image: getBase64Image('/images/sir_francis_drake.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">GLOBAL ECONOMY</span>
          <span class="csb-category">THE SILVER PIPELINE &bull; 1545–1600</span>
        </div>
        <h4 class="csb-title">The Cerro Rico of Potosí &amp; The Spanish Price Revolution</h4>
        <div class="csb-body">
          In 1545, Spanish colonizers discovered Cerro Rico in Potosí (modern Bolivia)—a mountain of pure silver ore. Using the brutal *mita* forced-labour system, millions of indigenous and enslaved African miners extracted thousands of tons of silver. Spanish silver fleets (the *Flota de Indias*) transported this wealth to Seville, funding Philip II's Catholic crusades against Dutch Protestant rebels, Ottoman navies, and Tudor England. However, this massive influx of bullion tripled European money supply, causing catastrophic "Price Revolution" inflation while failing to build long-term Spanish industry.
        </div>
        <div class="csb-takeaway">
          <strong>Economic Mechanism:</strong> New World silver funded Spanish global hegemony, but created acute geopolitical envy: English state-sponsored privateers targeted Spanish treasure fleets as an act of holy and commercial war.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Royal Oration</span>
          </div>
          <span class="source-date-micro">9 August 1588</span>
        </div>
        <div class="archival-title">Queen Elizabeth I’s Address to the Troops at Tilbury</div>
        <div class="archival-body">
          "I know I have the body but of a weak and feeble woman; but I have the heart and stomach of a king, and of a king of England too, and think foul scorn that Parma or Spain, or any prince of Europe, should dare to invade the borders of my realm."
        </div>
        <div class="archival-footer">
          <span>British Library, London (Harleian MS 6798)</span>
          <span>Camp at Tilbury, Essex</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'How did the Protestant Reformation split Western Europe into competing ideological blocs after 1517?',
      q2: 'Explain why English privateering under Elizabeth I was considered piracy by Spain but patriotic defense by England.',
      q3: 'Evaluate whether weather ("the Protestant Wind") or English naval tactics were the decisive cause of the Spanish Armada’s defeat in 1588.',
    },
  },

  // Page 7: Lesson 3 (Trade or Takeover: Early Encounters to Empire)
  p7: {
    keyFigure: {
      name: 'Oba of Benin (Esigie / Ewuare Dynasty)',
      lifespan: '16th Century',
      role: 'Sovereign Monarch of the Kingdom of Benin (Edo State, West Africa)',
      significance:
        'Governed a sophisticated, highly fortified imperial city that engaged in diplomatic and trade parity with Portuguese and Dutch merchants.',
      actions: [
        'Enforced strict state monopolies over ivory, pepper, and bronze trade, preventing European traders from penetrating inland.',
        'Commissioned the world-renowned Benin Bronzes—intricate brass relief plaques documenting court ritual, military conquests, and foreign traders.',
        'Established formal diplomatic exchanges, dispatching an Edo ambassador to the Royal Court of King John II in Lisbon.',
      ],
      image: getBase64Image('/images/benin_bronze.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">INSTITUTIONAL EVOLUTION</span>
          <span class="csb-category">CHARTERED CORPORATIONS &bull; 1600</span>
        </div>
        <h4 class="csb-title">The East India Company: From Merchants to Sovereign Rulers</h4>
        <div class="csb-body">
          On 31 December 1600, Elizabeth I granted a royal monopoly charter to the "Governor and Company of Merchants of London Trading into the East Indies". Unlike Crown-funded Spanish conquests, English expansion was privatized and profit-driven. The Company established fortified trading stations ("factories") at Surat, Madras, and Calcutta by negotiating *firmans* (royal permits) with Mughal emperors. Over the 17th and 18th centuries, the Company raised its own private armies of European officers and Indian *sepoys*, transforming from a spice-trading partnership into an aggressive territorial empire with sovereign taxation powers.
        </div>
        <div class="csb-takeaway">
          <strong>Imperial Mechanism:</strong> British imperial expansion in Asia was not initiated by the British government, but by a joint-stock corporate monopoly driven by shareholder dividends and military force.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Dutch Merchant Account</span>
          </div>
          <span class="source-date-micro">Circa 1602</span>
        </div>
        <div class="archival-title">Olfert Dapper’s Description of the City of Benin</div>
        <div class="archival-body">
          "The king's palace is a collection of buildings occupying as much space as the town of Haarlem... The town is composed of thirty main streets, very straight and 120 feet wide. The houses are close to one another, arranged in good order, and clean as Flemish homes."
        </div>
        <div class="archival-footer">
          <span>Nationaal Archief, The Hague</span>
          <span>Description of Africa (Amsterdam, 1668)</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Describe the sophisticated urban design and trade relations of the Kingdom of Benin in the 16th century.',
      q2: 'Explain how joint-stock chartered companies (like the East India Company) differed from traditional monarchical conquests.',
      q3: '"Early modern European encounters with non-Europeans were based entirely on exploitation, not mutual trade." Assess this historical interpretation.',
    },
  },

  // Page 9: Lesson 4 (James I and the Gunpowder Plot)
  p9: {
    keyFigure: {
      name: 'Robert Catesby',
      lifespan: '1572–1605',
      role: 'Leader of the Gunpowder Plot Conspirators',
      significance:
        'Charismatic Catholic gentleman who conceived the conspiracy to blow up the King and Parliament to restore a Catholic monarch.',
      actions: [
        'Enraged by King James I’s failure to repeal harsh Elizabethan anti-Catholic recusancy fines and banishment of Catholic priests.',
        'Recruited a network of radicalized Catholic gentry, including explosive munitions specialist Guy Fawkes, leasing a cellar directly under the House of Lords.',
        'Conspired to place King James’s nine-year-old daughter Princess Elizabeth on the throne as a puppet Catholic queen following the explosion.',
        'Fled London following Fawkes’s arrest, making a defiant final armed stand with fellow conspirators at Holbeche House in Staffordshire, where he was shot dead in battle.',
      ],
      image: getBase64Image('/images/catesby.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">SECURITY STATE</span>
          <span class="csb-category">THE REPRESSIVE APPARATUS &bull; 1605</span>
        </div>
        <h4 class="csb-title">The Monteagle Letter &amp; The Espionage Network</h4>
        <div class="csb-body">
          On 26 October 1605, Catholic peer Lord Monteagle received an anonymous letter warning him: "they shall receive a terrible blow this Parliament and yet they shall not see who hurts them." Monteagle immediately delivered the warning to Robert Cecil, Earl of Salisbury, James I’s Spymaster. Cecil waited until midnight on 4 November before ordering a search of Parliament's cellars, capturing Guy Fawkes guarding thirty-six barrels of gunpowder. Some historians argue Cecil knew of the plot weeks earlier through double agents and allowed it to mature to maximize public anti-Catholic fury and pass draconian security laws. Cecil skillfully exploited the conspiracy to create an enduring Protestant security state, uniting a fractured nation behind King James I.
        </div>
        <div class="csb-takeaway">
          <strong>Political Consequence:</strong> The discovery of the plot cemented anti-Catholic nationalism in the English Protestant psyche, resulting in the Popish Recusants Act and institutionalized exclusion of Catholics from public life for over two centuries.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">The Anonymous Warning</span>
          </div>
          <span class="source-date-micro">26 October 1605</span>
        </div>
        <div class="archival-title">The Monteagle Warning Letter</div>
        <div class="archival-body">
          "My lord, out of the love I bear to some of your friends, I have a care of your preservation. Therefore I would advise you, as you tender your life, to devise some excuse to shift of your attendance at this parliament; for God and man have concurred to punish the wickedness of this time."
        </div>
        <div class="archival-footer">
          <span>The National Archives, Kew (SP 14/216)</span>
          <span>State Papers Domestic, James I</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'What grievances drove Robert Catesby and his fellow conspirators to plot the destruction of Parliament?',
      q2: 'Explain why the discovery of thirty-six barrels of gunpowder beneath Parliament was exploited by Robert Cecil.',
      q3: 'Evaluate whether the Gunpowder Plot was primarily a response to state religious persecution or an act of radical sectarian terrorism.',
    },
  },

  // Page 11: Lesson 5 (Who Controlled Britain? The Ideological Battle)
  p11: {
    keyFigure: {
      name: 'King Charles I',
      lifespan: '1600–1649',
      role: 'King of England, Scotland, and Ireland (Reigned 1625–1649)',
      significance:
        'Believed unswervingly in the Divine Right of Kings, ruled without Parliament for eleven years, and was executed for high treason in 1649.',
      actions: [
        'Instituted "Personal Rule" (1629–1640), funding government through controversial feudal taxes like Ship Money levied on inland towns.',
        'Attempted to arrest five MPs in the House of Commons in January 1642, violating parliamentary privilege and triggering the English Civil War.',
        'Tried before the High Court of Justice in Westminster Hall; refused to plead, arguing no earthly court possessed lawful authority to judge God’s anointed King.',
      ],
      image: getBase64Image('/images/charles_first.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CONSTITUTIONAL CRISIS</span>
          <span class="csb-category">REGICIDE &bull; JANUARY 1649</span>
        </div>
        <h4 class="csb-title">The Trial of the King: Shattering Divine Right</h4>
        <div class="csb-body">
          On 20 January 1649, Charles I was brought before a specially assembled High Court of Justice presided over by John Bradshaw. The prosecution, led by John Cook, charged Charles as a "tyrant, traitor, murderer, and public enemy to the good people of this nation" for waging war against his own subjects. Charles defiantly challenged the court: "I would know by what power I am called hither... by what legal authority?" Fifty-nine commissioners signed the King's death warrant. On 30 January 1649, Charles was beheaded outside the Banqueting House in Whitehall, establishing the radical precedent that English rulers are subject to the law of the land.
        </div>
        <div class="csb-takeaway">
          <strong>Constitutional Significance:</strong> Regicide destroyed the mystical inviolability of the monarchy. Even when the crown was restored in 1660, no future monarch could govern without Parliament’s fiscal consent.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">The Death Warrant</span>
          </div>
          <span class="source-date-micro">29 January 1649</span>
        </div>
        <div class="archival-title">Warrant for the Execution of King Charles I</div>
        <div class="archival-body">
          "Whereas Charles Stuart, King of England, is and standeth convicted, attainted, and condemned of High Treason and other high crimes... These are therefore to will and require you to see the said sentence executed in the open street before Whitehall, upon the morrow, being the thirtieth day of this instant month of January."
        </div>
        <div class="archival-footer">
          <span>Parliamentary Archives, London (HL/PO/JO/10/1/297)</span>
          <span>Westminster Hall, Signed by 59 Regicides</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'What was meant by the "Divine Right of Kings" and how did Charles I apply this concept to taxation?',
      q2: 'Explain why Parliament viewed Ship Money as an illegal breach of constitutional law.',
      q3: '"The English Civil War was caused by religious fanaticism, not constitutional disputes over taxation." To what extent do you agree?',
    },
  },

  // Page 13: Lesson 6 (Who Controlled Britain? The Economic Shift)
  p13: {
    keyFigure: {
      name: 'Oliver Cromwell',
      lifespan: '1599–1658',
      role: 'Lord Protector of the Commonwealth of England, Scotland, and Ireland',
      significance:
        'Forged the New Model Army, crushed royalist forces at Naseby, signed the King’s death warrant, and governed as military dictator (1653–1658).',
      actions: [
        'Created the meritocratic New Model Army, promoting officers based on military competence and Puritan religious conviction rather than aristocratic birth.',
        'Dismissed the corrupt Rump Parliament at musket-point in 1653, declaring: "You have sat too long for any good you have been doing lately... In the name of God, go!"',
        'Instituted the Rule of the Major-Generals, banning theatre, Christmas celebrations, and gambling while securing English naval supremacy over the Dutch.',
      ],
      image: getBase64Image('/images/oliver_cromwell.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CONSTITUTIONAL REVOLUTION</span>
          <span class="csb-category">PARLIAMENTARY SOVEREIGNTY &bull; 1688–1689</span>
        </div>
        <h4 class="csb-title">The Glorious Revolution &amp; The Bill of Rights</h4>
        <div class="csb-body">
          When Catholic King James II produced a male Catholic heir in 1688 and suspended laws against Catholic worship, seven Protestant nobles secretly invited Dutch leader William of Orange to invade England. James fled to France in the bloodless "Glorious Revolution". In exchange for the crown, Parliament required William and Mary to accept the Bill of Rights (1689). The Bill barred monarchs from suspending laws, levying taxes without parliamentary consent, or maintaining a peacetime standing army. This permanently established a constitutional monarchy where Parliament, representing landowning and commercial elites, held supreme legislative power.
        </div>
        <div class="csb-takeaway">
          <strong>Institutional Transformation:</strong> The 1689 settlement created institutional stability that made Britain an economic superpower: property rights were guaranteed and royal arbitrary seizure of wealth was abolished.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Constitutional Statute</span>
          </div>
          <span class="source-date-micro">16 December 1689</span>
        </div>
        <div class="archival-title">The English Bill of Rights (1 Will. &amp; Mar. sess. 2 c. 2)</div>
        <div class="archival-body">
          "That the pretended power of suspending the laws or the execution of laws by regal authority without consent of Parliament is illegal; That levying money for or to the use of the Crown by pretence of prerogative, without grant of Parliament, is illegal; That the freedom of speech and debates in Parliament ought not to be impeached."
        </div>
        <div class="archival-footer">
          <span>Parliamentary Archives, Palace of Westminster</span>
          <span>Statute of the Realm (1689)</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Why did the English Commonwealth collapse following the death of Oliver Cromwell in 1658?',
      q2: 'Explain why the events of 1688 were described by contemporary Protestants as the "Glorious Revolution".',
      q3: 'Evaluate whether the Bill of Rights (1689) created a democracy or merely transferred power from the monarch to wealthy landowners.',
    },
  },

  // Page 15: Lesson 7 (Mechanics of the Transatlantic Slave Trade)
  p15: {
    keyFigure: {
      name: 'Thomas Clarkson & Alexander Falconbridge',
      lifespan: '1760–1846 / c. 1760–1792',
      role: 'Leading British Abolitionist Organizers & Eyewitness Authors',
      significance:
        "Clarkson gathered forensic instruments (manacles, thumbscrews) across British ports, publishing surgeon Falconbridge's devastating 1788 eyewitness testimony on the Middle Passage.",
      actions: [
        'Clarkson traveled 35,000 miles riding across Britain collecting testimonies from sailors, surgeons, and African survivors.',
        'Falconbridge documented the systematic overcrowding, shackling, forced dancing, and lethal dysentery in ship holds.',
        'Testified before the Privy Council in 1789, providing the empirical foundation for parliamentary abolition debates.',
      ],
      image: getBase64Image('/images/thomas_clarkson.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">COMMERCIAL MACHINERY</span>
          <span class="csb-category">THE TRIANGULAR SYSTEM &bull; 1650–1807</span>
        </div>
        <h4 class="csb-title">The Brookes Slave Ship &amp; The Brutal Economics of Commodification</h4>
        <div class="csb-body">
          The Transatlantic Slave Trade operated as a highly coordinated three-legged commercial machine: British manufactured goods (Birmingham guns, Sheffield brass, Manchester cottons) sailed to West Africa; captive enslaved Africans were purchased and transported across the Atlantic via the horrific "Middle Passage"; and slave-grown colonial cash crops (sugar, tobacco, cotton, rum) returned to Britain. In 1788, abolitionists published the stowage plan of the Liverpool slave ship *Brookes*, revealing how 454 human beings were packed like cargo into shelves measuring just 6 feet by 16 inches. The diagram shocked public opinion and became history's first global human rights campaign image.
        </div>
        <div class="csb-takeaway">
          <strong>Economic Reality:</strong> The profits of the slave trade enriched British ports (Liverpool, Bristol, London), financed banking institutions (Barclays, Bank of England), and provided cheap capital for the Industrial Revolution.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Surgeon's Memoir</span>
          </div>
          <span class="source-date-micro">Published 1788</span>
        </div>
        <div class="archival-title">Alexander Falconbridge: An Account of the Slave Trade</div>
        <div class="archival-body">
          "The deck was so covered with the blood and mucus which had proceeded from them in consequence of the flux, that it resembled a slaughter-house. The surgeon upon going between decks in the morning frequently finds several dead... The air soon becomes so heated and tainted that it is unfit for respiration."
        </div>
        <div class="archival-footer">
          <span>British Library, London (T.838/8)</span>
          <span>Printed by J. Phillips, George-Yard, Lombard-Street</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Identify the three legs of the Triangular Trade and the specific cargo transported on each leg.',
      q2: 'Explain why the 1788 Brookes slave ship diagram was such an effective campaigning tool for abolitionists.',
      q3: 'Historian Eric Williams argued that the British Empire abolished the slave trade only when it ceased to be profitable, rather than for moral reasons. Assess this economic argument.',
    },
  },

  // Page 17: Lesson 8 (Resistance to the Transatlantic Slave Trade)
  p17: {
    keyFigure: {
      name: 'Queen Nanny of the Maroons',
      lifespan: 'c. 1686–c. 1755',
      role: 'Military Strategist & Chieftainess of the Windward Jamaican Maroons',
      significance:
        'Led escaped enslaved Africans in brilliant guerrilla warfare against British colonial troops in Jamaica, forcing the British Crown to sign a peace treaty in 1739.',
      actions: [
        'Organized fortified mountain strongholds in the impenetrable Blue Mountains (Nanny Town) as autonomous free communities.',
        'Employed expert camouflage, ambush tactics, and acoustic communication via cow-horn (*abeng*) to defeat superior British regular regiments.',
        'Secured the 1739 British-Maroon Treaty granting the Windward Maroons 500 acres of autonomous land and permanent freedom from enslavement.',
      ],
      image: getBase64Image('/images/queen_nanny.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">AGENCY &amp; RESISTANCE</span>
          <span class="csb-category">THE SPECTRUM OF OPPOSITION &bull; 1700–1800</span>
        </div>
        <h4 class="csb-title">The Spectrum of Resistance: From Overt Rebellion to Cultural Survival</h4>
        <div class="csb-body">
          Enslaved Africans were never passive victims of the plantation system; they fought back through an expansive spectrum of resistance. Overt resistance included shipboard mutinies (recorded on roughly 10% of all Atlantic slave voyages) and armed insurrections such as the 1739 Stono Rebellion in South Carolina and the Jamaican Maroon Wars. Covert day-to-day resistance was even more widespread: feigning illness, breaking sugar-milling machinery, sabotaging crops, learning to read in secret, preserving West African religious rituals, and establishing escape networks.
        </div>
        <div class="csb-takeaway">
          <strong>Historical Insight:</strong> Resistance imposed immense military and financial costs on slave-owners, undermining the security and profitability of the plantation economy long before official abolition in 1807.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Autobiographical Testimony</span>
          </div>
          <span class="source-date-micro">Published 1789</span>
        </div>
        <div class="archival-title">The Interesting Narrative of the Life of Olaudah Equiano</div>
        <div class="archival-body">
          "The stench of the hold while we were on the coast was so intolerably loathsome, that it was dangerous to remain there for any time... The shrieks of the women, and the groans of the dying, rendered the whole a scene of horror almost inconceivable. I often wished for the last friend, death, to relieve me."
        </div>
        <div class="archival-footer">
          <span>Printed for and Sold by the Author, No. 10 Union-Street</span>
          <span>London, 1789</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Explain the difference between overt resistance and covert resistance on 18th-century slave plantations.',
      q2: 'How did Queen Nanny and the Jamaican Maroons exploit their geography to defeat British colonial armies?',
      q3: 'Evaluate the role of Black abolitionists like Olaudah Equiano in changing British public opinion on the slave trade.',
    },
  },

  // Page 19: Lesson 9 (How Modern was Britain by 1750?)
  p19: {
    keyFigure: {
      name: 'Sir Isaac Newton',
      lifespan: '1642–1727',
      role: 'Physicist, Mathematician, President of the Royal Society & Master of the Mint',
      significance:
        'Formulated the laws of universal gravitation and motion, anchoring the Scientific Revolution and modern empirical rationalism.',
      actions: [
        'Published the *Philosophiae Naturalis Principia Mathematica* (1687), proving that the universe was governed by rational, predictable mathematical laws.',
        'Appointed Master of the Royal Mint in 1699, aggressively prosecuting counterfeiters and reforming English gold and silver coinage.',
        'Served as President of the Royal Society for twenty-four years, establishing London as Europe’s capital of scientific experimentation and technological enquiry.',
      ],
      image: getBase64Image('/images/isaac_newton.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">INSTITUTIONAL FOUNDATIONS</span>
          <span class="csb-category">THE FISCAL-MILITARY STATE &bull; 1694–1750</span>
        </div>
        <h4 class="csb-title">The Financial Revolution &amp; The Foundation of the Bank of England</h4>
        <div class="csb-body">
          In 1694, Parliament chartered the Bank of England to raise a loan of £1.2 million to finance the war against Louis XIV's France. This created the National Debt: investors lent money to the government backed by parliamentary taxation, receiving reliable interest payments. Alongside the London Stock Exchange and maritime insurance (Lloyd's of London), Britain pioneered a "Financial Revolution". While absolute French monarchs struggled to raise loans at exorbitant 10% interest rates due to fear of royal bankruptcy, the British constitutional Crown borrowed millions at 3–4%, allowing a relatively small island nation to maintain the world’s most powerful Royal Navy.
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Advantage:</strong> Britain’s emergence as a global empire was built not just on gunpowder and courageous sailors, but on superior institutional finance, parliamentary taxation, and state credit.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Travel Narrative &amp; Social Survey</span>
          </div>
          <span class="source-date-micro">Published 1724</span>
        </div>
        <div class="archival-title">Daniel Defoe: A Tour Through the Whole Island of Great Britain</div>
        <div class="archival-body">
          "Trade in England neither arranges nor degrades, but ennobles the practitioner... The commerce of this island is an inexhaustible fund of wealth; it supplies the fleets, it pays the armies, and it makes the British nation feared and respected throughout the habitable globe."
        </div>
        <div class="archival-footer">
          <span>Printed for G. Bickerston, London</span>
          <span>Survey of English Commerce and Agriculture (1724)</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'How did the foundation of the Bank of England in 1694 transform British military and naval power?',
      q2: 'Explain why William Hogarth’s "Beer Street and Gin Lane" (1751) illustrates both the prosperity and poverty of modernizing London.',
      q3: '"By 1750, Britain had become a thoroughly modern nation." Assess the validity of this statement, considering politics, science, and social inequality.',
    },
  },
};

// Vocabulary Decks for Early Modern World Left-Hand Pages
const EARLY_MODERN_LEFT_VOCAB = {
  p2: [
    {
      term: 'Ottoman Empire',
      def: 'The powerful Islamic empire based in Anatolia that captured Constantinople in 1453 and dominated Mediterranean trade.',
    },
    {
      term: 'Silk Road',
      def: 'The ancient overland trade route network connecting China and the Far East with Europe through Central Asia.',
    },
    {
      term: 'Caravan',
      def: 'A group of merchants and pack animals traveling together for mutual protection across desert and steppe trade routes.',
    },
    {
      term: 'Eurocentrism',
      def: 'The misleading historical view that interprets world history exclusively from a Western European perspective.',
    },
  ],
  p4: [
    {
      term: 'Reformation',
      def: 'The 16th-century religious movement launched by Martin Luther that challenged papal authority and created Protestantism.',
    },
    {
      term: 'Conquistador',
      def: 'Spanish military adventurer who conquered indigenous American civilizations in Mexico and Peru during the 1500s.',
    },
    {
      term: 'Bullion',
      def: 'Gold or silver in mass quantities (bars or ingots) valued by weight rather than nominal face currency value.',
    },
    {
      term: 'Privateer',
      def: 'An armed private ship licensed by an official government letter of marque to attack enemy commercial shipping.',
    },
  ],
  p6: [
    {
      term: 'Chartered Company',
      def: 'A commercial corporation granted exclusive trading monopolies and sovereign territorial rights by royal decree.',
    },
    {
      term: 'Kingdom of Benin',
      def: 'A sophisticated pre-colonial West African forest kingdom (modern Nigeria) renowned for monumental bronze art.',
    },
    {
      term: 'Factory',
      def: 'A fortified early modern overseas trading outpost and warehouse managed by merchant agents called factors.',
    },
    {
      term: 'Monopoly',
      def: 'The exclusive legal control of the supply or trade in a commodity or service in a particular territory.',
    },
  ],
  p8: [
    {
      term: 'Recusancy',
      def: 'The refusal of Roman Catholics in England to attend Anglican Church of England Sunday services, punished by heavy fines.',
    },
    {
      term: 'Divine Right',
      def: 'The theological doctrine that monarchs derive their authority directly from God and are accountable to no earthly power.',
    },
    {
      term: 'Treason',
      def: 'The crime of betraying one’s country or sovereign monarch, punishable in early modern Britain by hanging, drawing, and quartering.',
    },
    {
      term: 'Popish Plot',
      def: 'A recurrent early modern English Protestant fear of covert Catholic conspiracies to assassinate the monarch and subvert Protestantism.',
    },
  ],
  p10: [
    {
      term: 'Personal Rule',
      def: 'The eleven-year period (1629–1640) during which King Charles I governed England without summoning Parliament.',
    },
    {
      term: 'Ship Money',
      def: 'A traditional coastal defense tax extended controversially by Charles I to all inland English counties during peacetime.',
    },
    {
      term: 'Cavaliers',
      def: 'Royalist supporters of King Charles I during the English Civil War, drawn largely from the aristocracy and gentry.',
    },
    {
      term: 'Roundheads',
      def: 'Supporters of Parliament during the English Civil War, so named because many Puritan apprentices wore short hair.',
    },
  ],
  p12: [
    {
      term: 'Commonwealth',
      def: 'The republican period of English government (1649–1660) established following the execution of King Charles I.',
    },
    {
      term: 'Restoration',
      def: 'The return of the Stuart monarchy in 1660 under King Charles II following the collapse of the military Protectorate.',
    },
    {
      term: 'Glorious Revolution',
      def: 'The bloodless overthrow of Catholic King James II in 1688 and the accession of Protestant rulers William and Mary.',
    },
    {
      term: 'Bill of Rights',
      def: 'The landmark 1689 parliamentary act establishing constitutional monarchy and legislative supremacy over royal prerogative.',
    },
  ],
  p14: [
    {
      term: 'Triangular Trade',
      def: 'The three-way transatlantic commercial network linking Britain, West Africa, and the Caribbean/American colonies.',
    },
    {
      term: 'Middle Passage',
      def: 'The brutal forced voyage of enslaved Africans across the Atlantic Ocean in overcrowded slave ship holds.',
    },
    {
      term: 'Commodity Crop',
      def: 'An agricultural product grown for commercial sale and export on world markets (e.g., sugar, tobacco, cotton).',
    },
    {
      term: 'Chattel Slavery',
      def: 'A legal system where human beings are classified as property to be bought, sold, inherited, and forced to labor without pay.',
    },
  ],
  p16: [
    {
      term: 'Insurrection',
      def: 'An organized, violent uprising or rebellion by enslaved people seeking freedom from plantation owners or ship crews.',
    },
    {
      term: 'Maroons',
      def: 'Communities of self-liberated formerly enslaved Africans who established autonomous settlements in mountain and forest terrain.',
    },
    {
      term: 'Abolitionism',
      def: 'The social and political movement dedicated to outlawing the slave trade and completely emancipating enslaved people.',
    },
    {
      term: 'Abeng',
      def: 'A traditional cow-horn bugle used by Jamaican Maroons for long-distance military signaling and acoustic camouflage.',
    },
  ],
  p18: [
    {
      term: 'Urbanization',
      def: 'The demographic process whereby an increasing proportion of a nation’s population shifts from rural villages to cities.',
    },
    {
      term: 'Enlightenment',
      def: 'The 18th-century European intellectual movement emphasizing reason, empirical science, and individual liberty.',
    },
    {
      term: 'National Debt',
      def: 'The total amount of money borrowed by the British government from private investors backed by parliamentary taxes.',
    },
    {
      term: 'Mercantilism',
      def: 'An economic theory holding that national power depends on maximizing exports, accumulating bullion, and strictly controlling colonial trade.',
    },
  ],
};

// Rich Disciplinary Primary Source Bank for Left-Hand Pages (P2, P4, P6, P8, P10, P12, P14, P16, P18)
const EARLY_MODERN_LEFT_SOURCES = {
  p2: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Historical Primary Cartography',
      title: 'The Silk Roads and Maritime Eurasian Trade Networks (c. 1450)',
      image: getBase64Image('/images/silk_road.jpg'),
      context:
        'Before European ocean navigation, Eurasian commerce flowed along ancient Silk Roads connecting China, India, and Persia to Mediterranean ports. Goods passed through dozens of middlemen and were heavily taxed by Islamic empires, making Asian luxuries rare and expensive in Europe.',
      hingeQuestion:
        'Why did Ottoman control of eastern trade terminals force Western European kingdoms to take terrifying risks on the Atlantic Ocean?',
      shelfmark: 'Bibliothèque nationale de France &bull; Cartographic Department',
      footer: 'Department Cartographic Collection &bull; Eurasian Trade Archive',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Contemporary Majorcan Manuscript',
      title: 'Abraham Cresques: The Catalan Atlas (1375) — Mansa Musa of Mali',
      image: getBase64Image('/images/mansa_musa_catalan.jpg'),
      context:
        'Created by Jewish cartographer Abraham Cresques, this masterpiece depicts West African Emperor Mansa Musa of Mali holding a massive golden orb. The Latin inscription describes him as "the richest and most noble king in all this region, by reason of the abundance of gold which is found in his lands."',
      hingeQuestion:
        "How does Cresques' depiction of Mansa Musa challenge Eurocentric myths about African civilization before colonization?",
      shelfmark: 'Bibliothèque nationale de France, Paris &bull; MS Espagnol 30',
      footer: 'Western Islamic & African Imperial Collection',
    },
  },
  p4: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Diplomatic Imperial Treaty Map',
      title: 'The Treaty of Tordesillas Papal Meridian Line (1494)',
      image: getBase64Image('/images/tordesillas_map.png'),
      context:
        'Brokered by Pope Alexander VI in 1494, the Treaty of Tordesillas divided the non-Christian world between Spain and Portugal along a meridian 370 leagues west of Cape Verde, granting Spain the Americas and Portugal Brazil, Africa, and the Indian Ocean trade.',
      hingeQuestion:
        'Why did Protestant monarchs like Elizabeth I view the papal partition of the world as illegitimate and an act of war?',
      shelfmark: 'General Archive of the Indies, Seville &bull; Patronato 1-1-1',
      footer: 'Iberian Maritime & Imperial Treaties Collection',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Contemporary Propaganda Portrait',
      title: 'George Gower: The Armada Portrait of Elizabeth I (1588)',
      image: getBase64Image('/images/armada_portrait.jpg'),
      context:
        'Painted to commemorate the defeat of the Spanish Armada in 1588, Elizabeth I rests her right hand authoritatively upon the globe, her fingers covering North America. Behind her right shoulder, the English fleet sails out; behind her left, the Catholic Spanish Armada is wrecked on the rocks.',
      hingeQuestion:
        "How does Elizabeth's posture over the globe signal England's emerging imperial ambitions against Catholic Spain?",
      shelfmark: 'National Maritime Museum, Greenwich &bull; BHC2678',
      footer: 'Tudor Royal Portrait Collection',
    },
  },
  p6: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Archaeological Military Survey',
      title: 'Archaeological Plan of James Fort, Virginia (1607)',
      image: getBase64Image('/images/jamestown_fort.jpg'),
      context:
        'England’s first permanent North American settlement was built as a triangular palisade fort armed with artillery at each corner on the James River. The settlers faced disease, drought, and conflict with the Powhatan confederacy, barely surviving until commercial tobacco cultivation brought stability.',
      hingeQuestion:
        'How does the military design of James Fort prove that English colonization relied on armed defense rather than peaceful trade?',
      shelfmark: 'Virginia Historical Society Archives',
      footer: 'Colonial Jamestown Archaeological Record',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Contemporary Diplomatic Court Painting',
      title: 'Sir Thomas Roe at the Court of Mughal Emperor Jahangir (1615–1619)',
      image: getBase64Image('/images/sir_thomas_roe.jpg'),
      context:
        'Dispatched by King James I as royal ambassador, Sir Thomas Roe spent four years at the court of Emperor Jahangir seeking trade rights for the East India Company. In 1615, the Mughal Empire had a population of 150 million and 25% of global GDP, while England had barely 5 million souls.',
      hingeQuestion:
        'Why was the English East India Company treated as a humble petitioner rather than an imperial conqueror in 17th-century India?',
      shelfmark: 'British Library &bull; India Office Records',
      footer: 'East India Company Diplomatic Archive',
    },
  },
  p8: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Contemporary Dutch Engraving',
      title: 'Crispijn van de Passe: The Gunpowder Plot Conspirators (1605)',
      image: getBase64Image('/images/gunpowder_conspirators.jpg'),
      context:
        "This 1605 print depicts Robert Catesby, Guy Fawkes, Thomas Percy, and fellow conspirators plotting in secret. Disillusioned by King James I's continuation of Elizabethan anti-Catholic penal laws, the conspirators smuggled thirty-six barrels of gunpowder beneath the House of Lords.",
      hingeQuestion:
        'Does this engraving present the conspirators as desperate religious martyrs or dangerous traitors to the state?',
      shelfmark: 'National Portrait Gallery, London &bull; NPG D25492',
      footer: 'Jacobean State Trials & Treason Archive',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Primary Holograph Manuscript',
      title: 'The Anonymous Monteagle Letter (October 1605)',
      image: getBase64Image('/images/monteagle_letter.jpeg'),
      context:
        'Delivered to Catholic peer Lord Monteagle warning him to "devise some excuse to shift of your attendance at this Parliament... for God and man hath concurred to punish the wickedness of this time", this anonymous letter enabled Robert Cecil\'s search party to catch Guy Fawkes on 4 November.',
      hingeQuestion:
        "Why do modern historians debate whether the Monteagle letter was a genuine tip-off or a setup by Cecil's spy network?",
      shelfmark: 'The National Archives, Kew &bull; SP 14/216/2',
      footer: 'State Papers Domestic &bull; Gunpowder Plot Records',
    },
  },
  p10: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Contemporary Eyewitness Engraving',
      title: 'Contemporary German Engraving: The Execution of Charles I (1649)',
      image: getBase64Image('/images/charles_i_execution.jpg'),
      context:
        'On 30 January 1649, King Charles I was beheaded on a scaffold outside the Banqueting House in Whitehall before a stunned crowd. Condemned by Parliament\'s High Court of Justice as a "tyrant, traitor, murderer, and public enemy", his death ended the absolute Divine Right of Kings.',
      hingeQuestion:
        'How did the public execution of a crowned monarch destroy the concept of the Divine Right of Kings forever?',
      shelfmark: 'British Museum &bull; Department of Prints & Drawings',
      footer: 'Civil War & Regicide Collection &bull; 1649',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Official Commonwealth State Artifact',
      title: 'Thomas Simon: The Great Seal of the Commonwealth of England (1651)',
      image: getBase64Image('/images/great_seal_1651.png'),
      context:
        'Commissioned by the Rump Parliament, this official seal replaced the traditional royal head of the monarch with an aerial map of England and Ireland, and the House of Commons in session on the reverse, inscribed: "In the Third Year of Freedom by God\'s Blessing Restored."',
      hingeQuestion:
        'Why did the Commonwealth replace royal imagery with an image of Parliament in session on its official state seal?',
      shelfmark: 'The National Archives, Kew &bull; Seal Collection',
      footer: 'Parliamentary Republic State Papers &bull; 1651',
    },
  },
  p12: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Contemporary Architectural Etching',
      title: 'Wenceslaus Hollar: The Royal Exchange Courtyard, London (1644)',
      image: getBase64Image('/images/royal_exchange_courtyard.jpg'),
      context:
        "Hollar's detailed etching shows merchants, ship captains, and brokers congregating in the central courtyard of the Royal Exchange in the City of London, negotiating contracts for tobacco, sugar, textiles, and maritime credit that transformed London into Europe's financial capital.",
      hingeQuestion:
        "How did commercial institutions like the Royal Exchange lay the foundation for Britain's global financial supremacy?",
      shelfmark: 'Folger Shakespeare Library &bull; Hollar Collection',
      footer: 'City of London Historical Commerce Archive',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Contemporary Oil Painting',
      title: 'King William III Landing at Torbay, The Glorious Revolution (1688)',
      image: getBase64Image('/images/early_mod_l6_banner.jpg'),
      context:
        'In November 1688, Dutch Stadtholder William of Orange landed at Torbay with 463 ships and 15,000 soldiers. Invited by Protestant politicians to depose Catholic King James II, William accepted the 1689 Bill of Rights, establishing a permanent constitutional monarchy.',
      hingeQuestion:
        'Was the Glorious Revolution a peaceful popular rebellion or a successful foreign Dutch military invasion?',
      shelfmark: 'Rijksmuseum, Amsterdam &bull; SK-A-1750',
      footer: 'Dutch-British Maritime History Archive',
    },
  },
  p14: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Historical Commercial Cartography',
      title: 'Diagram of the Atlantic Triangular Trade System (18th Century)',
      image: getBase64Image('/images/triangular_trade.png'),
      context:
        'British manufactured goods (guns, textiles, metalware) were shipped to West Africa; captured enslaved Africans were forced across the Atlantic via the catastrophic Middle Passage; slave-produced sugar, tobacco, and cotton returned to British ports, enriching merchants and funding the Industrial Revolution.',
      hingeQuestion:
        'How did British domestic manufacturing and global maritime commerce depend entirely on the exploitation of enslaved labour?',
      shelfmark: 'National Maritime Museum Cartographic Archive',
      footer: 'Transatlantic Commerce & Plantation Record',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Abolitionist Architectural Plan',
      title: 'The Stowage Plan of the Slave Ship Brookes (1788)',
      image: getBase64Image('/images/brookes_ship.jpg'),
      context:
        "Published by the Plymouth Abolition Committee in 1788, this cross-section diagram exposed how 454 enslaved human beings were chained in spaces measuring 6 feet by 16 inches. The diagram caused outrage across Britain and became history's first viral human rights campaign image.",
      hingeQuestion:
        'Why was this technical architectural diagram far more effective in turning British public opinion against the trade than written descriptions?',
      shelfmark: 'British Library &bull; Add MS 49308',
      footer: 'Society for the Abolition of the Slave Trade Records',
    },
  },
  p16: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Contemporary Military Engraving',
      title: 'Abraham Brunias: Leonard Parkinson, Captain of the Maroons (1796)',
      image: getBase64Image('/images/jamaica_maroons.jpg'),
      context:
        'Engraved during the Second Maroon War in Jamaica, this print shows Leonard Parkinson, a Maroon guerrilla commander, armed with a cutlass and brace of pistols. Jamaican Maroons defeated British regular armies, forcing the Crown to sign treaties recognizing Maroon freedom.',
      hingeQuestion:
        'How did Jamaican Maroon resistance prove that freedom was seized by Africans through combat rather than granted by British politicians?',
      shelfmark: 'National Library of Jamaica Archives',
      footer: 'Caribbean Resistance & Emancipation Papers',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Contemporary Author Portrait',
      title: 'Frontispiece of The Interesting Narrative of the Life of Olaudah Equiano (1789)',
      image: getBase64Image('/images/equiano.jpg'),
      context:
        "Published in London in 1789, Olaudah Equiano's best-selling autobiography provided the British public with its first widely read first-person account of capture, the Middle Passage, and enslavement. Equiano toured Britain lecturing against slavery, personally lobbying Members of Parliament.",
      hingeQuestion:
        "Why was Equiano's firsthand testimony so devastating to the pro-slavery lobby's economic arguments in Parliament?",
      shelfmark: 'British Library &bull; General Reference Collection 1489.g.50',
      footer: 'African Disciplinary Authorship Archive',
    },
  },
  p18: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Imperial Ceiling Painting',
      title: 'Spiridione Roma: The East Offering Its Riches to Britannia (1778)',
      image: getBase64Image('/images/east_offering.jpg'),
      context:
        "Commissioned for the East India Company's headquarters in London, Roma's painting depicts kneeling Asian figures presenting pearls, tea, and jewels to Britannia, projecting an image of voluntary tribute and benevolent British rule while concealing military plunder.",
      hingeQuestion:
        "How does this artwork reflect Britain's self-image as a benevolent civilizing power while concealing the violence of colonial conquest?",
      shelfmark: 'Foreign and Commonwealth Office Collection, London',
      footer: "East India Company Directors' Archive",
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Satirical Social Engraving',
      title: 'William Hogarth: "Gin Lane" (1751)',
      image: getBase64Image('/images/gin_lane.jpg'),
      context:
        'Hogarth\'s engraving exposed the destitution, infant mortality, and social decay in London\'s St Giles parish during the "Gin Craze". Published alongside "Beer Street", Hogarth highlighted how rapid urban growth and commercial capitalism created extreme wealth alongside desperate poverty.',
      hingeQuestion:
        "Does Hogarth's Gin Lane prove that economic modernity brought widespread destitution rather than genuine social progress?",
      shelfmark: 'British Museum &bull; Department of Prints and Drawings 1868,0808.3905',
      footer: 'Georgian Urban History Archive &bull; 1751',
    },
  },
};

function getLessonSections(lesson, idx) {
  // Lesson 4: Gunpowder Plot (Idx 3) - dedicated balanced narrative
  if (idx === 3) {
    return [
      {
        title: 'The Elizabethan Recusancy Laws & Stuart Succession',
        text: 'During the reign of Queen Elizabeth I, England became a strictly enforced Protestant state. Following the 1570 Papal Bull excommunicating Elizabeth, the Tudor government viewed English Catholics with intense suspicion as potential traitors and foreign agents. Draconian penal laws were enacted: heavy recusancy fines were levied on any subject who refused to attend Anglican Sunday services, and harboring Catholic Jesuit priests was declared high treason punishable by being hanged, drawn, and quartered. Wealthy Catholic families were financially drained, forced to construct secret "priest holes" within their manor houses, and barred from public office.\n\nWhen Elizabeth died childless in March 1603, the crown passed to her Scottish cousin King James VI, who became King James I of England. English Catholics initially celebrated the Stuart succession, recalling that James was the son of the executed Catholic Mary Queen of Scots and had privately hinted at religious tolerance. However, James quickly discovered that relaxing the penal laws enraged hardline Puritan Members of Parliament, whose financial subsidies he desperately required. In February 1604, James issued a royal proclamation expelling all Catholic priests from England and vigorously reimposed the hated recusancy fines, shattering Catholic hopes for peaceful coexistence.',
      },
      {
        title: 'The Conspiracy in the Cellar Beneath Parliament',
        text: 'Enraged by King James’s perceived betrayal, charismatic Warwickshire Catholic gentleman Robert Catesby resolved to strike a catastrophic, decapitating blow against the Protestant establishment. In May 1604, Catesby met secretly with four fellow conspirators at the Duck and Drake inn in the Strand, swearing an oath of secrecy upon a Catholic primer. The cell grew to include thirteen plotters, including military munitions veteran Guy (Guido) Fawkes, who had spent a decade fighting for Catholic Spain in the Low Countries and possessed specialized knowledge of military mining and gunpowder.\n\nIn March 1605, conspirator Thomas Percy leased a ground-floor coal cellar directly beneath the House of Lords. Under cover of darkness, Fawkes supervised the covert transport of thirty-six heavy barrels of gunpowder across the River Thames from Lambeth, concealing them beneath piles of iron billets, coal, and firewood. The conspiracy was breathtaking in its scale and ruthlessness: when King James, Queen Anne, Prince Henry, the bishops, judges, and Members of Parliament gathered for the State Opening of Parliament, Fawkes was to ignite a slow match and escape by boat. Simultaneously, conspirators in the Midlands would kidnap nine-year-old Princess Elizabeth to install her as a puppet Catholic queen.',
      },
      {
        title: 'The Monteagle Letter & Interrogation in the Tower',
        text: 'On Saturday 26 October 1605, Catholic peer Lord Monteagle was dining at his home in Hoxton when a servant handed him an anonymous letter delivered by a cloaked stranger. The letter warned Monteagle: "they shall receive a terrible blow this Parliament and yet they shall not see who hurts them." Recognizing the existential peril, Monteagle took the warning directly to Robert Cecil, Earl of Salisbury, King James’s Spymaster. Cecil waited until midnight on 4 November before dispatching a search party led by Sir Thomas Knyvett to search the vaults of Parliament.\n\nIn the dark cellar, Knyvett discovered Guy Fawkes booted and cloaked, carrying a pocket watch, touchwood, and slow fuses beside thirty-six barrels of powder. Fawkes was immediately arrested and taken to the Tower of London. King James issued a handwritten royal warrant ordering the Lieutenant of the Tower to extract the names of the conspirators, specifying that "the gentler tortures are first to be used unto him... and so by degrees proceeding to what is worse." Strapped to the agonizing rack, Fawkes endured days of torture before his spirit broke. His second signature on the confession was a faint, trembling scrawl ("Guido"), bearing witness to the catastrophic physical destruction of his body.',
      },
      {
        title: 'The Aftermath, Executions & Anti-Catholic Legacy',
        text: 'The failure of the Gunpowder Plot unleashed a fierce wave of anti-Catholic hysteria across Jacobean Britain. Robert Catesby and several fellow plotters fled to Holbeche House in Staffordshire, where they made a desperate last stand in the rain; Catesby was shot dead with his sword drawn. The surviving conspirators, including Guy Fawkes, were tried for high treason in Westminster Hall in January 1606 and condemned to the traitor’s death, being dragged through the streets on hurdles before being hanged and quartered at St Paul’s Churchyard and the Old Palace Yard.\n\nParliament capitalized on the national panic to pass the draconian Popish Recusants Act of 1606, forbidding Catholics from practicing law, medicine, serving as army officers, or voting in parliamentary elections. A mandatory Oath of Allegiance was imposed requiring Catholics to explicitly deny the Pope’s authority to depose English monarchs. Furthermore, Parliament enacted the Observance of 5th November Act, mandating an annual church service of thanksgiving for Britain’s miraculous deliverance. The celebratory bonfire and effigy-burning tradition that took root in November 1605 established a lasting patriotic ritual that defined British identity for over three centuries.',
      },
    ];
  }

  // Lesson 6: Economic Shift & Financial Revolution (Idx 5) - dedicated balanced narrative
  if (idx === 5) {
    return [
      {
        title: 'The Rise of London as Europe’s Financial Metropolis',
        text: 'By the mid-seventeenth century, the economic geography of Britain had fundamentally changed. London was no longer merely a royal administrative capital; it was becoming the financial and commercial clearinghouse of global trade. In 1571, merchant financier Sir Thomas Gresham had founded the Royal Exchange in the City of London, modeled on the commercial bourse of Antwerp. Around its open-air marble courtyard, merchants, ship captains, and commodity brokers gathered daily to negotiate wholesale contracts for sugar, tobacco, silk, spices, and maritime cargo space.\n\nThe River Thames was transformed into a dense forest of wooden ship masts, as merchantmen unloaded raw commodities from the American colonies, the Caribbean, and India. Traditional wealth had always been anchored in rural agricultural land held by hereditary aristocrats. However, by the late seventeenth century, immense fortunes were being accumulated in London through joint-stock trading syndicates, merchant shipping, and commercial credit, creating an assertive, educated merchant class that demanded political influence and constitutional guarantees for their property.',
      },
      {
        title: 'The Commonwealth, Mercantilism & The Restoration',
        text: 'The execution of King Charles I on 30 January 1649 destroyed the traditional doctrine of the Divine Right of Kings, replacing royal authority with the English Commonwealth—history’s first major European republic. When the Rump Parliament commissioned the 1651 Great Seal of England, they pointedly erased the monarch’s portrait, replacing it with an aerial map of the British Isles and an engraving of the assembled House of Commons under the motto: "In the Third Year of Freedom by God’s Blessing Restored."\n\nUnder Lord Protector Oliver Cromwell, England adopted an aggressive mercantilist commercial doctrine designed to challenge the dominant Dutch maritime trade. Parliament passed the Navigation Act of 1651, dictating that colonial goods could only be transported into England aboard English ships. When the Dutch contested this monopoly, Cromwell launched the First Anglo-Dutch War, deploying the New Model Navy to secure control of the English Channel. Although the Commonwealth collapsed after Cromwell’s death and Charles II was restored to the throne in 1660, the monarchy was permanently stripped of its feudal prerogative courts and could never again govern without parliamentary funding.',
      },
      {
        title: 'The Glorious Revolution & The Bill of Rights (1688–1689)',
        text: 'The constitutional tension between crown and parliament flared again during the reign of King James II, an unyielding Catholic who suspended parliamentary statutes and promoted Catholic officers in the army. When James’s wife gave birth to a male Catholic heir in June 1688, threatening a permanent Catholic dynasty, seven leading Protestant politicians sent a secret invitation to Dutch leader William of Orange, urging him to bring an army to preserve English liberties.\n\nWilliam landed at Torbay with 15,000 troops in November 1688. James II’s army deserted him, and the King fled into French exile during what became known as the "Glorious Revolution." In exchange for receiving the crown jointly with Queen Mary, Parliament presented William with the Declaration of Rights, codified into the landmark Bill of Rights in December 1689. The statute declared that suspending laws without parliamentary consent was illegal, barred the monarch from maintaining a peacetime standing army, and established that Parliament possessed exclusive authority to levy taxes, creating Britain’s enduring constitutional monarchy.',
      },
      {
        title: 'The Financial Revolution: Bank of England & National Debt',
        text: 'The constitutional triumph of Parliament in 1689 triggered the "Financial Revolution" of the 1690s, the institutional engine that enabled Britain to rise as a global superpower. To finance the costly Nine Years\' War against Louis XIV of France, Chancellor of the Exchequer Charles Montagu established the Bank of England in 1694. The bank raised a loan of £1.2 million from private London investors in exchange for a royal monopoly on issuing official banknotes and managing government finances.\n\nThis innovation created the British National Debt, guaranteeing that debt repayments were backed by the full taxing authority of Parliament rather than the fickle personal word of an absolute monarch. Consequently, the British government could borrow vast sums of money at record-low interest rates (3–4%), while French kings were forced to pay ruinous rates of 8–10%. Supported by the burgeoning London Stock Exchange and maritime insurance syndicates meeting in Edward Lloyd’s coffeehouse, Britain established an institutional credit machine that funded the Royal Navy, expanded the British Empire, and created the capital reserves for the Industrial Revolution.',
      },
    ];
  }

  const blocks = (lesson.narrative_blocks || []).filter(
    (b) => b && b.title !== 'Consolidation Task' && b.theme_heading !== 'Consolidation Task',
  );

  const allParas = [];
  const titles = [];

  for (const b of blocks) {
    if (b.title && !titles.includes(b.title)) {
      const cleanT = b.title
        .replace(/^Visual Analysis:\s*/i, '')
        .replace(/^Micro-History:\s*/i, '')
        .replace(/^Analyzing the Evidence:\s*/i, '')
        .replace(/^\d+\.\s*/, '')
        .trim();
      if (cleanT) titles.push(cleanT);
    }
    let raw = b.text || b.content || b.image_caption || '';
    raw = raw.replace(/<div class=['"]scaffold-box['"]>.*?<\/div>/gis, '');
    raw = raw.replace(/<div style="display:\s*flex;.*?<\/div>\s*<\/div>\s*<\/div>/gis, '');
    raw = raw.replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '\n\n');
    raw = raw.replace(/<br\s*\/?>/gi, ' ');
    raw = raw.replace(/<[^>]+>/g, ' ');
    const split = raw
      .split(/\n\s*\n/)
      .map((p) => p.replace(/\s+/g, ' ').trim())
      .filter((p) => p.length > 25);
    for (const p of split) {
      if (!allParas.includes(p)) {
        allParas.push(p);
      }
    }
  }

  const total = allParas.length;
  const s1Count = Math.max(1, Math.round(total * 0.25));
  const s2Count = Math.max(1, Math.round(total * 0.25));
  const s3Count = Math.max(1, Math.round(total * 0.25));

  const p1 = allParas.slice(0, s1Count);
  const p2 = allParas.slice(s1Count, s1Count + s2Count);
  const p3 = allParas.slice(s1Count + s2Count, s1Count + s2Count + s3Count);
  let p4 = allParas.slice(s1Count + s2Count + s3Count);
  if (p4.length === 0 && p3.length > 1) {
    p4 = [p3.pop()];
  }

  return [
    { title: titles[0] || 'Historical Context & Global Setting', text: p1.join('\n\n') },
    { title: titles[1] || 'Escalation & Commercial Catalyst', text: p2.join('\n\n') },
    { title: titles[2] || 'Strategic Mechanisms & Conflict', text: p3.join('\n\n') },
    {
      title: titles[3] || 'Geopolitical Outcome & Historical Legacy',
      text: (p4.length ? p4 : p3).join('\n\n'),
    },
  ];
}

/**
 * Builds the complete 20-page publisher textbook HTML
 */
async function buildPublisherTextbookHtmlEarlyModernWorld() {
  const coverImgData =
    getBase64Image('/images/mansa_musa_catalan.jpg') ||
    getBase64Image('/images/armada_portrait.jpg');

  let lessonsHtml = '';

  lessons.forEach((lesson, idx) => {
    const lessonNum = idx + 1;
    const leftPageNum = lessonNum * 2;
    const rightPageNum = lessonNum * 2 + 1;
    const bankKey = `p${rightPageNum}`;
    const leftVocabKey = `p${leftPageNum}`;
    const leftSrcKey = `p${leftPageNum}`;
    const bank = EARLY_MODERN_COMPONENT_BANK[bankKey] || {};
    const vocabTerms = EARLY_MODERN_LEFT_VOCAB[leftVocabKey] || [];
    const leftSources = EARLY_MODERN_LEFT_SOURCES[leftSrcKey] || {};

    const secList = getLessonSections(lesson, idx);
    const sec1 = secList[0];
    const sec2 = secList[1];
    const sec3 = secList[2];
    const sec4 = secList[3];

    const formatBlockParas = (block, secNum) => {
      if (!block || !block.text) {
        return `<p class="narrative-p"><span class="para-ref">[${secNum}.1]</span>Historical analysis examining key archival mechanisms and economic transformations during this era.</p>`;
      }
      const raw = block.text;
      let paras = [];
      if (Array.isArray(raw)) {
        paras = raw;
      } else if (raw.includes('<br><br>')) {
        paras = raw
          .split('<br><br>')
          .map((p) => p.trim())
          .filter(Boolean);
      } else {
        paras = String(raw)
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean);
      }
      return paras
        .map((p, pIdx) => {
          if (p.includes('para-ref')) {
            return `<p class="narrative-p">${formatText(p)}</p>`;
          }
          return `<p class="narrative-p"><span class="para-ref">[${secNum}.${pIdx + 1}]</span>${formatText(p)}</p>`;
        })
        .join('');
    };

    const renderArchivalSourceBox = (src) => {
      if (!src) return '';
      return `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">${src.badge}</span>
              <span class="source-type">${src.type}</span>
            </div>
            <span class="source-date-micro">${src.shelfmark || ''}</span>
          </div>
          <div class="archival-title">${src.title}</div>
          ${src.image ? `<img class="archival-image" src="${src.image}" alt="${src.title}">` : ''}
          ${src.text ? `<div class="archival-body">${src.text}</div>` : ''}
          <div class="archival-context-box">
            <p class="archival-context-text">${src.context}</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>${src.hingeQuestion}</em></div>
          </div>
          <div class="archival-footer">
            <span>${src.shelfmark || 'Historical Archive Collection'}</span>
            <span>${src.footer || 'Curriculum Archival Record'}</span>
          </div>
        </div>
      `;
    };

    // Using EARLY_MODERN_LEFT_SOURCES for rich primary sources

    // LEFT PAGE (Verso)
    lessonsHtml += `
    <!-- PAGE ${leftPageNum}: Lesson ${lessonNum} Left Page (Verso) -->
    <div class="textbook-page" data-page="${leftPageNum}">
      <div class="page-inner">
        
        <!-- Lesson Header Strip -->
        <div class="lesson-header">
          <div class="lesson-badge-strip">
            <span class="topic-badge">KS3 HISTORY &bull; UNIT 2</span>
            <span class="spec-ref-badge">LESSON ${lessonNum} OF 9</span>
          </div>
          <h2 class="lesson-title">${lesson.title}</h2>
          <div class="lesson-spec-anchor">
            <strong>Key Enquiry:</strong> How did early modern commerce, religious conflict, and ideological revolution reshape Britain and the globe? &bull; <em>Sections 1 &amp; 2: Context, Catalysts &amp; Primary Evidence</em>
          </div>
        </div>

        <!-- 2-Column Core Prose Measure -->
        <div class="two-column-prose">
          
          <!-- Section 1 -->
          <div class="section-banner">
            <span class="sb-num">SECTION 1</span>
            <span class="sb-title">${(sec1.title || 'Context').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec1, 1)}

          ${renderArchivalSourceBox(leftSources.sourceA)}

          <!-- Section 2 -->
          <div class="section-banner">
            <span class="sb-num">SECTION 2</span>
            <span class="sb-title">${(sec2.title || 'Escalating Factor').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec2, 2)}

          ${renderArchivalSourceBox(leftSources.sourceB)}

        </div>

        <!-- Bottom Vocabulary Deck -->
        <div class="bottom-vocab-box">
          <div class="bvb-header">
            <span class="bvb-title">CORE DISCIPLINARY TERMINOLOGY &bull; LESSON ${lessonNum}</span>
            <span class="bvb-badge">KEY STAGE 3 VOCABULARY</span>
          </div>
          <div class="bvb-grid">
            ${vocabTerms
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

        <!-- Page Footer -->
        <div class="page-footer">
          <span>Early Modern World (1450–1750) &bull; Lesson ${lessonNum}</span>
          <span>Page ${leftPageNum}</span>
        </div>

      </div>
    </div>

    <!-- PAGE ${rightPageNum}: Lesson ${lessonNum} Right Page (Recto) -->
    <div class="textbook-page" data-page="${rightPageNum}">
      <div class="page-inner">
        
        <!-- Right Page Header -->
        <div class="right-page-header">
          <div class="rph-meta">
            <span class="rph-tag">PRIMARY ARCHIVE &amp; HISTORICAL VERDICT</span>
            <span class="rph-lesson">LESSON ${lessonNum}: SECTIONS 3 &amp; 4</span>
          </div>
          <h3 class="rph-title">${lesson.title}</h3>
        </div>

        <!-- 2-Column Prose Measure -->
        <div class="two-column-prose">
          
          <!-- Section 3 -->
          <div class="section-banner">
            <span class="sb-num">SECTION 3</span>
            <span class="sb-title">${(sec3.title || 'Strategic Developments').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec3, 3)}

          <!-- Key Figure Card -->
          ${
            bank.keyFigure
              ? `
          <div class="key-figure-box">
            <div class="kf-header">
              <span class="kf-tag">KEY HISTORICAL INDIVIDUAL</span>
              <span class="kf-lifespan">${bank.keyFigure.lifespan}</span>
            </div>
            <div class="kf-identity-row">
              ${bank.keyFigure.image ? `<img class="kf-portrait" src="${bank.keyFigure.image}" alt="${bank.keyFigure.name}">` : ''}
              <div class="kf-identity-text">
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

          <!-- Section 4 -->
          <div class="section-banner">
            <span class="sb-num">SECTION 4</span>
            <span class="sb-title">${(sec4.title || 'Geopolitical Outcome').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec4, 4)}

          <!-- Concept Spotlight Box -->
          ${bank.conceptSpotlight || ''}

          <!-- Archival Dispatch Box -->
          ${bank.archivalDispatch || ''}

        </div>

        <!-- Bottom Enquiry Deck -->
        ${
          bank.bottomEnquiry
            ? `
        <div class="bottom-enquiry-box">
          <div class="beb-header">
            <span class="beb-title">HISTORICAL ENQUIRY &amp; DISCIPLINARY ASSESSMENT</span>
            <span class="beb-badge">LESSON ${lessonNum} SYNTHESIS</span>
          </div>
          <div class="beb-grid">
            <div class="beb-col">
              <strong>1. Knowledge Recall &amp; Evidence:</strong>
              ${bank.bottomEnquiry.q1}
            </div>
            <div class="beb-col">
              <strong>2. Causal Analysis:</strong>
              ${bank.bottomEnquiry.q2}
            </div>
            <div class="beb-col">
              <strong>3. Historical Evaluation &amp; Debate:</strong>
              ${bank.bottomEnquiry.q3}
            </div>
          </div>
        </div>`
            : ''
        }

        <!-- Page Footer -->
        <div class="page-footer">
          <span>Early Modern World (1450–1750) &bull; Primary Archival Core</span>
          <span>Page ${rightPageNum}</span>
        </div>

      </div>
    </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Early Modern World (1450–1750) — Master Publisher Textbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Inter:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    *, *:before, *:after {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      background: #e2e8f0;
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.6pt;
      line-height: 1.48;
      color: #1e293b;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .textbook-page {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      padding: 12mm 14mm 10mm 14mm;
      background: #ffffff;
      margin: 0 auto 10mm auto;
      page-break-after: always;
      break-after: always;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }
    @media print {
      body { background: #ffffff; }
      .textbook-page { margin: 0; }
    }

    .page-inner {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    /* Lesson Header */
    .lesson-header {
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 5px;
      margin-bottom: 7px;
      flex-shrink: 0;
    }
    .lesson-badge-strip {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .topic-badge {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 6.8pt;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 3px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .spec-ref-badge {
      font-size: 6.8pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .lesson-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 13pt;
      font-weight: 800;
      color: #0f172a;
      margin: 2px 0 3px 0;
      line-height: 1.2;
    }
    .lesson-spec-anchor {
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      color: #334155;
      line-height: 1.32;
      background: #f8fafc;
      border-left: 3px solid #1e3a8a;
      padding: 3px 7px;
      border-radius: 0 3px 3px 0;
    }

    /* Right Page Header */
    .right-page-header {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 7px;
      flex-shrink: 0;
    }
    .rph-meta {
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 2px;
    }
    .rph-tag { color: #1e3a8a; }
    .rph-lesson { color: #64748b; }
    .rph-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 11.5pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.2;
    }

    /* 2-Column Reading Measure */
    .two-column-prose {
      column-count: 2;
      column-gap: 16px;
      column-rule: 1px solid #e2e8f0;
      text-align: justify;
      flex: 1;
      overflow: hidden;
    }

    .section-banner {
      column-span: all;
      background: #f8fafc;
      border-left: 3px solid #1e3a8a;
      border-bottom: 1px solid #e2e8f0;
      padding: 3px 7px;
      border-radius: 0 3px 3px 0;
      margin: 6px 0 4px 0;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Inter', sans-serif;
    }
    .sb-num {
      font-size: 6.4pt;
      font-weight: 900;
      color: #1e3a8a;
      background: #dbeafe;
      padding: 1px 4px;
      border-radius: 2px;
    }
    .sb-title {
      font-size: 7.6pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .narrative-p {
      margin: 0 0 5px 0;
      text-indent: 1.0em;
    }
    .narrative-p:first-of-type, .section-banner + .narrative-p {
      text-indent: 0;
    }

    .para-ref {
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      margin-right: 4px;
      vertical-align: baseline;
      letter-spacing: 0.02em;
    }
    .narrative-p:first-of-type, .section-banner + .narrative-p {
      text-indent: 0;
    }

    /* Archival Source Box */
    .archival-source-box {
      background: #fdfaf6;
      border: 1px solid #e7e5e4;
      border-left: 3px solid #78716c;
      border-radius: 3px;
      padding: 6px 8px;
      margin: 6px 0;
      break-inside: avoid;
    }
    .archival-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;
      font-family: 'Inter', sans-serif;
    }
    .source-badge {
      font-size: 6.2pt;
      font-weight: 900;
      color: #fff;
      background: #0f172a;
      padding: 1px 5px;
      border-radius: 2px;
    }
    .source-type {
      font-size: 6.2pt;
      font-weight: 700;
      color: #78716c;
      text-transform: uppercase;
      margin-left: 4px;
    }
    .source-date-micro {
      font-size: 6.0pt;
      font-weight: 600;
      color: #78716c;
    }
    .archival-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.6pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 3px;
      line-height: 1.2;
    }
    .archival-image {
      width: 100%;
      max-height: 105px;
      object-fit: contain;
      border-radius: 2px;
      margin-bottom: 3px;
      display: block;
      background: #fafaf9;
    }
    .archival-body {
      font-size: 7.4pt;
      line-height: 1.32;
      color: #292524;
      font-style: italic;
      margin-bottom: 3px;
    }
    .archival-context-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #0284c7;
      padding: 3px 5px;
      margin: 3px 0 2px 0;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
    }
    .archival-context-text {
      font-size: 6.0pt;
      line-height: 1.25;
      color: #334155;
      margin: 0 0 2px 0;
    }
    .archival-hinge-q {
      font-size: 6.0pt;
      line-height: 1.25;
      color: #0f172a;
      background: #f0f9ff;
      padding: 2px 4px;
      border-radius: 2px;
      margin-top: 2px;
    }
    .archival-hinge-q strong {
      color: #0369a1;
      text-transform: uppercase;
      font-size: 5.6pt;
      letter-spacing: 0.04em;
    }
    .archival-footer {
      border-top: 1px dashed #d6d3d1;
      padding-top: 2px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.0pt;
      color: #78716c;
      font-weight: 600;
    }

    /* Key Figure Box */
    .key-figure-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 6px 9px;
      margin: 6px 0;
      break-inside: avoid;
    }
    .kf-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .kf-tag {
      font-size: 6.2pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .kf-lifespan {
      font-size: 6.0pt;
      color: #64748b;
      font-weight: 600;
    }
    .kf-identity-row {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-bottom: 3px;
    }
    .kf-portrait {
      width: 44px;
      height: 54px;
      object-fit: cover;
      border-radius: 2px;
      border: 1px solid #94a3b8;
      flex-shrink: 0;
    }
    .kf-identity-text { flex: 1; }
    .kf-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.6pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.15;
    }
    .kf-role {
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      line-height: 1.2;
    }
    .kf-significance {
      font-size: 7.6pt;
      font-style: italic;
      color: #334155;
      line-height: 1.32;
      margin-bottom: 3px;
    }
    .kf-actions-title {
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      margin: 2px 0 1px 0;
    }
    .kf-actions-list {
      margin: 0;
      padding-left: 12px;
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      line-height: 1.32;
      color: #1e293b;
    }
    .kf-actions-list li { margin-bottom: 1.5px; }

    /* Concept Spotlight Box */
    .concept-spotlight-box {
      background: #fdfaf6;
      border: 1px solid #fed7aa;
      border-left: 3.5px solid #b45309;
      border-radius: 3px;
      padding: 6px 9px;
      margin: 6px 0;
      break-inside: avoid;
    }
    .csb-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
      border-bottom: 1px solid #ffedd5;
      padding-bottom: 1px;
      font-family: 'Inter', sans-serif;
    }
    .csb-tag {
      font-size: 6.2pt;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
    }
    .csb-category {
      font-size: 5.8pt;
      font-weight: 700;
      color: #b45309;
      background: #ffedd5;
      padding: 1px 4px;
      border-radius: 2px;
    }
    .csb-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.0pt;
      font-weight: 800;
      color: #7c2d12;
      margin: 1px 0 2px 0;
      line-height: 1.18;
    }
    .csb-body {
      font-size: 7.6pt;
      line-height: 1.35;
      color: #1e293b;
      margin-bottom: 3px;
    }
    .csb-takeaway {
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
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
      padding: 8px 10px;
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
      margin-bottom: 4px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
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
      gap: 8px;
      font-size: 6.8pt;
      line-height: 1.3;
      color: #334155;
    }
    .bvb-col strong, .beb-col strong {
      display: block;
      color: #0f172a;
      margin-bottom: 1px;
      text-transform: uppercase;
      font-size: 6.2pt;
    }

    .bottom-enquiry-box {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
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
      gap: 10px;
      font-size: 6.8pt;
      line-height: 1.32;
      color: #334155;
    }

    .page-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 2px;
      margin-top: 3px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      color: #64748b;
      font-weight: 600;
      flex-shrink: 0;
    }

    /* Cover Page */
    .cover-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #0f172a;
      padding: 16px 20px;
      box-sizing: border-box;
    }
    .cover-top { text-align: center; }
    .cover-dept-banner {
      display: inline-block;
      background: #0f172a;
      color: #ffffff;
      padding: 3px 12px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .cover-series {
      font-family: 'Inter', sans-serif;
      font-size: 8.5pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 2px;
    }
    .cover-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 23pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      margin: 4px 0 3px 0;
      text-transform: uppercase;
    }
    .cover-subtitle {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 11.5pt;
      font-style: italic;
      color: #475569;
      margin-bottom: 8px;
    }
    .cover-plate-wrapper {
      text-align: center;
      margin: 4px 0;
    }
    .cover-plate-img {
      max-height: 98mm;
      max-width: 100%;
      object-fit: contain;
      border: 1px solid #cbd5e1;
      border-radius: 2px;
    }
    .cover-plate-caption {
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      color: #64748b;
      margin-top: 3px;
      font-style: italic;
    }
    .cover-enquiry-box {
      background: #f8fafc;
      border-left: 4px solid #1e3a8a;
      padding: 6px 12px;
      margin: 6px 0;
      font-family: 'Inter', sans-serif;
      text-align: left;
    }
    .ceb-label {
      font-size: 6.8pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .ceb-text {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.8pt;
      font-style: italic;
      color: #0f172a;
      margin-top: 1px;
    }
    .cover-matrix-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      margin-top: 4px;
    }
    .cover-matrix-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 3px 6px;
      text-align: left;
      font-weight: 800;
      font-size: 6.4pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .cover-matrix-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 3px 6px;
      color: #334155;
    }
    .cover-matrix-table tr:nth-child(even) td {
      background: #f8fafc;
    }
    .cover-footer {
      border-top: 1.5px solid #0f172a;
      padding-top: 4px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      color: #475569;
      font-weight: 700;
    }

    /* Back Cover */
    .back-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #0f172a;
      padding: 16px 20px;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }
    .back-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 15pt;
      font-weight: 800;
      color: #0f172a;
      text-align: center;
      margin: 0 0 2px 0;
      text-transform: uppercase;
    }
    .back-subtitle {
      font-size: 7.8pt;
      color: #64748b;
      text-align: center;
      margin-bottom: 8px;
    }
    .back-section-title {
      font-size: 7.6pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 2px;
      margin: 6px 0 4px 0;
    }
    .back-timeline-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      font-size: 6.6pt;
      line-height: 1.3;
    }
    .bt-card {
      background: #f8fafc;
      border-left: 2.5px solid #1e3a8a;
      padding: 4px 6px;
      border-radius: 0 2px 2px 0;
    }
    .bt-card strong { color: #1e3a8a; }
    .back-framework-box {
      background: #fdfaf6;
      border: 1.2px solid #fed7aa;
      border-left: 3.5px solid #b45309;
      padding: 6px 8px;
      margin-top: 6px;
      border-radius: 2px;
    }
    .bf-title {
      font-size: 7.4pt;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .bf-body {
      font-size: 6.8pt;
      line-height: 1.32;
      color: #334155;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: Front Cover -->
  <div class="textbook-page" data-page="1">
    <div class="cover-container">
      <div class="cover-top">
        <div class="cover-dept-banner" data-department-name="The History Department">
          <span class="school-brand-target">The History Department</span>
        </div>
        <div class="cover-series">Key Stage 3 Master Curriculum Series</div>
        <h1 class="cover-title">The Early Modern World (1450–1750)</h1>
        <div class="cover-subtitle">Global Power, Religious Reformation, Revolutionary Sovereignty &amp; The Transatlantic Trade</div>
      </div>

      <div class="cover-plate-wrapper">
        ${coverImgData ? `<img class="cover-plate-img" src="${coverImgData}" alt="Mansa Musa / Early Modern Global Trade">` : ''}
        <div class="cover-plate-caption">Primary Artifact: The 1375 Catalan Atlas depicting Emperor Mansa Musa of Mali holding a gold nugget, exemplifying pre-colonial African wealth.</div>
      </div>

      <div class="cover-enquiry-box">
        <div class="ceb-label">Overarching Historical Enquiry:</div>
        <div class="ceb-text">"How did early modern commerce, religious conflict, and ideological revolution reshape Britain and the global balance of power between 1450 and 1750?"</div>
      </div>

      <table class="cover-matrix-table">
        <thead>
          <tr>
            <th style="width: 12%;">Lesson</th>
            <th style="width: 48%;">Historical Enquiry &amp; Narrative Focus</th>
            <th style="width: 25%;">Primary Source Core</th>
            <th style="width: 15%;">Page Ref</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Lesson 1</strong></td>
            <td>Who Held Global Power in 1450? Constantinople &amp; The Wealth of the East</td>
            <td>1375 Catalan Atlas &amp; Barbaro Diary</td>
            <td>pp. 2–3</td>
          </tr>
          <tr>
            <td><strong>Lesson 2</strong></td>
            <td>Religious Conflict &amp; Global Exploration: Reformation, Silver &amp; The Armada</td>
            <td>Armada Portrait &amp; Gravelines Map</td>
            <td>pp. 4–5</td>
          </tr>
          <tr>
            <td><strong>Lesson 3</strong></td>
            <td>Trade or Takeover? Early Encounters to Empire: Benin &amp; East India Co.</td>
            <td>Benin Bronzes &amp; 1600 Royal Charter</td>
            <td>pp. 6–7</td>
          </tr>
          <tr>
            <td><strong>Lesson 4</strong></td>
            <td>James I and the Gunpowder Plot: Religious Division &amp; Political Volatility</td>
            <td>Monteagle Letter &amp; Fawkes Confession</td>
            <td>pp. 8–9</td>
          </tr>
          <tr>
            <td><strong>Lesson 5</strong></td>
            <td>Who Controlled Britain? The Ideological Battle, Civil War &amp; Regicide</td>
            <td>Charles I Trial Record &amp; Death Warrant</td>
            <td>pp. 10–11</td>
          </tr>
          <tr>
            <td><strong>Lesson 6</strong></td>
            <td>Who Controlled Britain? Economic Shift, Glorious Revolution &amp; Bill of Rights</td>
            <td>Bill of Rights 1689 &amp; Great Seal</td>
            <td>pp. 12–13</td>
          </tr>
          <tr>
            <td><strong>Lesson 7</strong></td>
            <td>The Mechanics of the Transatlantic Slave Trade: Middle Passage &amp; Exploitation</td>
            <td>Brookes Stowage Plan (1788) &amp; Falconbridge</td>
            <td>pp. 14–15</td>
          </tr>
          <tr>
            <td><strong>Lesson 8</strong></td>
            <td>Resistance to the Slave Trade: Maroon Warfare, Mutinies &amp; Olaudah Equiano</td>
            <td>Olaudah Equiano Narrative (1789)</td>
            <td>pp. 16–17</td>
          </tr>
          <tr>
            <td><strong>Lesson 9</strong></td>
            <td>How 'Modern' was Britain by 1750? Financial Revolution &amp; Global Empire</td>
            <td>Defoe Survey &amp; Hogarth Gin Lane</td>
            <td>pp. 18–19</td>
          </tr>
        </tbody>
      </table>

      <div class="cover-footer">
        <span>The History Revision Hub &bull; Student Textbook Edition</span>
        <span>Verified Print Publication &bull; September 2026</span>
      </div>
    </div>
  </div>

  <!-- PAGES 2–19: Core Lessons (20-Page Budget) -->
  ${lessonsHtml}

  <!-- PAGE 20: Back Cover -->
  <div class="textbook-page" data-page="20">
    <div class="back-container">
      <div>
        <h2 class="back-title">The Early Modern World &bull; Chronology &amp; Disciplinary Guide</h2>
        <div class="back-subtitle">Master Sequence of Events, Core Terminology &amp; Historical Analysis Framework</div>

        <div class="back-section-title">Master Chronological Sequence (1450–1750)</div>
        <div class="back-timeline-grid">
          <div class="bt-card"><strong>29 May 1453:</strong> Ottoman forces capture Constantinople; Byzantine Empire falls.</div>
          <div class="bt-card"><strong>1492:</strong> Christopher Columbus lands in the Americas; Spanish colonization begins.</div>
          <div class="bt-card"><strong>1517:</strong> Martin Luther nails Ninety-Five Theses; Protestant Reformation ignites.</div>
          <div class="bt-card"><strong>1545:</strong> Spanish discover the Cerro Rico silver mountain at Potosí, Bolivia.</div>
          <div class="bt-card"><strong>1588:</strong> English navy and fireships defeat the Spanish Armada at Gravelines.</div>
          <div class="bt-card"><strong>31 Dec 1600:</strong> Elizabeth I grants royal charter to the English East India Company.</div>
          <div class="bt-card"><strong>5 Nov 1605:</strong> Gunpowder Plot discovered beneath Parliament; Guy Fawkes arrested.</div>
          <div class="bt-card"><strong>1629–1640:</strong> King Charles I rules without Parliament ("Eleven Years' Tyranny").</div>
          <div class="bt-card"><strong>1642–1646:</strong> First English Civil War; Royalist Cavaliers vs Parliamentary Roundheads.</div>
          <div class="bt-card"><strong>30 Jan 1649:</strong> King Charles I executed for high treason outside Whitehall; Republic declared.</div>
          <div class="bt-card"><strong>1653–1658:</strong> Oliver Cromwell rules as Lord Protector of the Commonwealth.</div>
          <div class="bt-card"><strong>May 1660:</strong> Restoration of the Stuart Monarchy under King Charles II.</div>
          <div class="bt-card"><strong>1688:</strong> Glorious Revolution; William and Mary overthrow Catholic King James II.</div>
          <div class="bt-card"><strong>Dec 1689:</strong> Bill of Rights passed, establishing permanent constitutional monarchy.</div>
          <div class="bt-card"><strong>1694:</strong> Bank of England founded to finance imperial war and National Debt.</div>
          <div class="bt-card"><strong>1739:</strong> British Crown signs peace treaty with Jamaican Maroons under Queen Nanny.</div>
          <div class="bt-card"><strong>1750:</strong> Britain commands global trade, urbanizing cities, and transatlantic empire.</div>
          <div class="bt-card"><strong>1788–89:</strong> Brookes plan published; Equiano publishes slave trade narrative.</div>
        </div>

        <div class="back-section-title" style="margin-top: 10px;">Key Conceptual Threads for KS3 Historical Explanation</div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-size: 6.6pt; line-height: 1.32;">
          <div style="background: #f8fafc; border-left: 2px solid #1e3a8a; padding: 4px 6px;">
            <strong style="color: #1e3a8a; display: block;">1 &bull; Global Connectedness</strong>
            The transition from isolated regional empires to an interconnected global economy driven by maritime shipping, spices, silver, and sugar.
          </div>
          <div style="background: #f8fafc; border-left: 2px solid #1e3a8a; padding: 4px 6px;">
            <strong style="color: #1e3a8a; display: block;">2 &bull; Power &amp; Sovereignty</strong>
            The profound shift from absolute Divine Right of Kings to parliamentary supremacy, rule of law, and institutional checks and balances.
          </div>
          <div style="background: #f8fafc; border-left: 2px solid #1e3a8a; padding: 4px 6px;">
            <strong style="color: #1e3a8a; display: block;">3 &bull; Empire &amp; Exploitation</strong>
            The devastating human cost of commercial expansion, particularly the chattel enslavement and violent commodification of 12.5 million Africans.
          </div>
          <div style="background: #f8fafc; border-left: 2px solid #1e3a8a; padding: 4px 6px;">
            <strong style="color: #1e3a8a; display: block;">4 &bull; Resistance &amp; Agency</strong>
            How colonized and enslaved peoples actively resisted European domination through open warfare, maroon autonomy, sabotage, and cultural survival.
          </div>
        </div>

        <div class="back-framework-box">
          <div class="bf-title">Key Historiographical Perspectives on Early Modern Britain</div>
          <div class="bf-body">
            <strong>Whig Interpretation (Progress &amp; Liberty):</strong> Views 1688 and the Bill of Rights as the glorious triumph of English parliamentary freedom, rationalism, and constitutional democracy over royal tyranny.<br>
            <strong>Revisionist &amp; Postcolonial Interpretation:</strong> Emphasizes that Britain’s "liberty" was funded by the brutal profits of the Transatlantic Slave Trade, Indian colonial extortion, and domestic working-class exploitation.
          </div>
        </div>
      </div>

      <div class="cover-footer">
        <span>The Early Modern World (1450–1750) &bull; Master Specification Review Index</span>
        <span>Page 20 of 20</span>
      </div>
    </div>
  </div>

</body>
</html>`;
}

/**
 * Main execution runner
 */
async function runEarlyModernWorld() {
  console.log('🚀 Compiling Publisher-Level Standard Textbook for Early Modern World...');

  const htmlContent = await buildPublisherTextbookHtmlEarlyModernWorld();

  const htmlOutputDir = path.join(ROOT_DIR, 'public', 'units', 'early_modern_world');
  if (!fs.existsSync(htmlOutputDir)) fs.mkdirSync(htmlOutputDir, { recursive: true });
  const htmlPath = path.join(htmlOutputDir, 'textbook_PUBLISHER.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`✅ Saved HTML companion to: ${htmlPath}`);

  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) fs.mkdirSync(pdfOutputDir, { recursive: true });
  const pdfPath = path.join(pdfOutputDir, 'early_modern_world_textbook_PUBLISHER.pdf');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(120000);
  await page.goto(require('url').pathToFileURL(htmlPath).href, { waitUntil: 'networkidle2' });

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });

  console.log(`🎉 Masterpiece PDF Textbook Early Modern World successfully compiled!`);
  console.log(`📄 PDF Output: ${pdfPath}`);

  await page.close();
  await browser.close();

  // Synchronize HTML companion to standard unit textbook.html paths
  const prodHtml1 = path.join(ROOT_DIR, 'public', 'units', 'early_modern_world', 'textbook.html');
  const prodHtml2 = path.join(ROOT_DIR, 'units', 'early_modern_world', 'textbook.html');
  fs.writeFileSync(prodHtml1, htmlContent, 'utf8');
  fs.writeFileSync(prodHtml2, htmlContent, 'utf8');
  console.log(`✅ Synchronized to production textbook HTML: ${prodHtml1}`);

  // Synchronize PDF outputs
  const prodPdfV17 = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'early_modern_world_textbook_FINAL_V17.pdf',
  );
  const prodPdf = path.join(ROOT_DIR, 'public', 'pdfs', 'early_modern_world_textbook.pdf');
  const distPdfV17 = path.join(
    ROOT_DIR,
    'dist',
    'pdfs',
    'early_modern_world_textbook_FINAL_V17.pdf',
  );
  const distPdf = path.join(ROOT_DIR, 'dist', 'pdfs', 'early_modern_world_textbook.pdf');

  fs.mkdirSync(path.dirname(distPdfV17), { recursive: true });
  fs.copyFileSync(pdfPath, prodPdfV17);
  fs.copyFileSync(pdfPath, prodPdf);
  fs.copyFileSync(pdfPath, distPdfV17);
  fs.copyFileSync(pdfPath, distPdf);
  console.log(`✅ Synchronized to production V17 PDF: ${prodPdfV17}`);
  console.log(`✅ Synchronized to dist PDF: ${distPdfV17}`);

  // Synchronize to Google Drive Department File (if connected)
  const gDriveFolder = 'G:\\My Drive\\AAMX\\Dep File\\Year 8\\Early Modern World';
  if (fs.existsSync(gDriveFolder)) {
    try {
      const gDriveMaster = path.join(gDriveFolder, 'Early Modern World Master Textbook.pdf');
      fs.copyFileSync(pdfPath, gDriveMaster);
      console.log(`✅ Synchronized to Google Drive: ${gDriveMaster}`);
    } catch (gErr) {
      console.warn(
        `⚠️ Warning: Could not write Master Textbook to Google Drive (file may be open):`,
        gErr.message,
      );
    }
  }
}

if (require.main === module) {
  runEarlyModernWorld().catch((err) => {
    console.error('Fatal textbook compilation error:', err);
    process.exit(1);
  });
}

module.exports = {
  buildPublisherTextbookHtmlEarlyModernWorld,
  runEarlyModernWorld,
  run: runEarlyModernWorld,
};

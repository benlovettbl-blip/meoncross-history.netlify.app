/**
 * History Revision Hub — Publisher-Level Standard Textbook Engine
 *
 * Target: Early Elizabethan England, 1558–1588 (Key Topic 2)
 * Output: public/pdfs/eee_textbook_KT2_PUBLISHER.pdf
 * HTML:   public/units/eee/textbook_KT2_PUBLISHER.html
 *
 * Architectural Standards Enforced:
 * 1. ZERO AI Fluff & Zero Theatrical Jargon.
 * 2. Official Specification Primacy: Header, cover matrix & lesson banners feature authentic Pearson Edexcel 1HI0/B4 spec.
 * 3. Base64 Image Inlining: All archival photos & portraits embedded directly as Data URIs.
 * 4. Master 87mm Photographic Plate on Front Cover: Authentic Armada Portrait of Queen Elizabeth I (1588).
 * 5. Official 4-Column Pearson Edexcel Specification Coverage Matrix on Front Cover with 4-Stage Causal Sequences.
 * 6. Specification Accuracy: Feature questions strictly Q1(a) [2m] and Q1(b) [2m] (never "describe two features").
 * 7. Christine Counsell Disciplinary Narrative Standard: Rich dramatic storytelling with political suspense, intrigue, and human dilemmas.
 * 8. Zero Whitespace Voids: Pages 10, 11, and 12 completely redesigned to be dense, publisher-grade, and 98% space-utilized.
 * 9. Exact 12-Page Budget (Zero Orphans, Zero Blank Pages, Exactly 3 Folded A3 Sheets):
 *    - Page 1:  Master Front Cover (87mm uncropped plate, 4-column spec matrix, 4 Causal Sequence cards)
 *    - Page 2:  KT 2.1 Plots and Revolts at Home (1569–87) - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 3:  KT 2.1 Plots and Revolts at Home (1569–87) - Recto (Sections 3 & 4 + Walsingham + Cipher Trap + Enquiry Deck)
 *    - Page 4:  KT 2.2 Relations with Spain (1569–85) - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 5:  KT 2.2 Relations with Spain (1569–85) - Recto (Sections 3 & 4 + Drake + Cacafuego + Enquiry Deck)
 *    - Page 6:  KT 2.3 Outbreak of War with Spain (1585–88) - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 7:  KT 2.3 Outbreak of War with Spain (1585–88) - Recto (Sections 3 & 4 + Leicester + Cadiz Staves + Enquiry Deck)
 *    - Page 8:  KT 2.4 The Spanish Armada (1588) - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 9:  KT 2.4 The Spanish Armada (1588) - Recto (Sections 3 & 4 + Howard of Effingham + Culverin Revolution + Enquiry Deck)
 *    - Page 10: Key Topic 2 Thematic Synoptic Matrix, Historiographical Debate & Causal Turning Points
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

async function buildPublisherTextbookHtmlKT2() {
  const { KEY_TOPICS_DATA } = require('./render_eee_twopage_workbook.cjs');
  const ktWorkbookData = KEY_TOPICS_DATA.KT2;
  const getKt2Data = require('./eee_textbook_data_kt2.cjs');
  const ktData = getKt2Data({ getBase64Image });
  const { coverConfig, componentBank, leftSources, leftVocab } = ktData;

  const quizUrl = 'https://the-history-revision-hub.netlify.app/?unit=eee&quiz=true&lesson=2';
  const qrDataUrl = await QRCode.toDataURL(quizUrl, {
    width: 140,
    margin: 1,
    color: { dark: '#0f172a', light: '#ffffff' },
  });

  const coverImgData =
    getBase64Image(coverConfig.coverImage) || getBase64Image('images/armada_portrait.jpg');

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
    // Lesson 1: KT 2.1 (Plots and Revolts at Home, 1569–1587)
    {
      num: 1,
      code: 'KT 2.1',
      title: 'Plots and Revolts at Home, 1569–1587',
      enquiry:
        'How did domestic Catholic rebellion, foreign-backed assassination conspiracies, and Walsingham’s intelligence apparatus lead inexorably to the execution of Mary, Queen of Scots?',
      specRef: '1HI0/B4 &bull; Key Topic 2.1',
      sec1: {
        num: 1,
        title: 'The Feudal Uprising: The Northern Earls & Catholic Rebellion, 1569',
        paras: [
          `In November 1569, royal messengers dashed into Whitehall bearing catastrophic news: the Catholic north had risen in armed rebellion. Led by <strong>Charles Neville, Earl of Westmorland</strong>, and <strong>Thomas Percy, Earl of Northumberland</strong>, the Catholic nobility mobilized 4,600 armed horsemen. The earls were alienated by Elizabeth’s centralizing Protestant government. Under Cecil, the Crown stripped northern lords of traditional border offices, granting royal patronage to southern 'new men'. The appointment of Protestant James Pilkington as Bishop of Durham and Sussex over the Council of the North left northern magnates feeling their feudal power and ancient faith under mortal assault.`,
          `On 14 November 1569, rebels burst into <strong>Durham Cathedral</strong>, tearing the English Prayer Book to shreds and celebrating Latin Mass. The rebellion was a dynastic conspiracy: the earls planned to march south, liberate <strong>Mary, Queen of Scots</strong> from Tutbury, and marry her to England’s premier peer, Thomas Howard, Duke of Norfolk, expecting Spanish reinforcement from Alba's tercios in the Netherlands. The rebellion exposed the deep sectarian rift in English society, proving that despite ten years of the Elizabethan Settlement, Catholic loyalties remained entrenched across Yorkshire, Durham, and Northumberland.`,
          `However, the rebellion collapsed under strategic isolation. Spanish troops never arrived, and towns like York and Newcastle closed their gates. As Sussex advanced with 14,000 royal troops, the earls disbanded at Bramham Moor and fled into Scotland. Elizabeth’s retribution was merciless: Northumberland was extradited and beheaded at York, while provost marshals executed over <strong>450 ordinary rebels</strong> across northern villages, ensuring the lesson of Tudor sovereign vengeance was never forgotten.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'The Excommunication Shockwave & The Ridolfi Conspiracy, 1570–1572',
        paras: [
          `The suppression of the northern earls was immediately overshadowed by an international spiritual earthquake. On 25 February 1570, Pope Pius V issued the fateful Papal Bull <strong><em>Regnans in Excelsis</em></strong>. In blistering Latin, the Pope declared Elizabeth a heretic, stripped her of her royal title, and commanded all Catholic subjects to withdraw their civil obedience on pain of excommunication. This fatal decree shattered Elizabeth’s decade-long policy of toleration: overnight, every devout English Catholic was transformed in the eyes of the law from an eccentric recusant into an existential traitor whose religious duty was the violent deposition of their sovereign.`,
          `Foreign assassination conspiracies swiftly followed. In 1571, an Italian Catholic banker residing in London, <strong>Roberto Ridolfi</strong>, constructed a vast international conspiracy. The Ridolfi Plot aimed to assassinate Elizabeth, land 10,000 Spanish veterans under the Duke of Alba at Harwich, marry Mary, Queen of Scots to the Duke of Norfolk, and place Mary upon the English throne as a client monarch of Catholic Spain and the Papacy. Ridolfi traveled personally to Brussels, Rome, and Madrid, securing formal letters of endorsement from Pope Pius V and King Philip II.`,
          `However, William Cecil’s nascent surveillance network intercepted cipher dispatches hidden in the luggage of Ridolfi's courier at Dover. Under interrogation in the Tower of London, codebreakers decrypted the letters, uncovering Norfolk’s treasonous signature. Norfolk was arrested, convicted of high treason by his peers, and beheaded on Tower Hill in June 1572. Parliament passed the ferocious <strong>Treasons Act (1571)</strong>, making it high treason to publish papal bulls or claim Elizabeth was not the lawful queen. While Parliament passionately demanded Mary Stuart’s execution as well, Elizabeth stubbornly refused to execute an anointed queen, banishing the Spanish Ambassador Guerau de Spes instead.`,
        ],
      },
      sec3: {
        num: 3,
        title: 'The Jesuit Infiltration & The Throckmorton Plot, 1580–1584',
        paras: [
          `By 1580, the threat to Elizabeth entered a lethal ideological phase with the arrival of the <strong>Jesuit mission</strong>. Highly trained, zealous Catholic priests—most famously Edmund Campion and Robert Persons—were smuggled into England from European seminaries, operating through secret 'priest holes' in Catholic country manors. Their mission was not merely spiritual comfort; the Elizabethan state viewed them as clandestine enemy agents sent to incite holy war. In December 1581, Campion was arrested, savagely racked in the Tower, and publicly executed at Tyburn. Parliament retaliated with the 1581 Act to Retain the Queen’s Subjects in Due Obedience, raising recusancy fines to an impossible <strong>£20 a month</strong>—bankrupting Catholic gentry.`,
          `In 1583, another sophisticated foreign-backed conspiracy was unmasked: the <strong>Throckmorton Plot</strong>. Conceived by Francis Throckmorton, a young Catholic gentleman who acted as courier between Mary Stuart and the Spanish Ambassador Bernardino de Mendoza, the plot planned an invasion of Sussex by French Catholic forces under the Duke of Guise, funded by Philip II and blessed by the Papacy. The objective was the assassination of Elizabeth and the immediate enthronement of Mary Stuart.`,
          `Sir Francis Walsingham, now Principal Secretary, put Throckmorton under intense surveillance. Arrested with incriminating lists of Catholic conspirators and harbour soundings, Throckmorton was subjected to the agonies of the rack until he confessed the entire network. Throckmorton was executed at Tyburn, and Mendoza was expelled from England. In response to this mortal peril, the Privy Council drafted the terrifying <strong>Bond of Association (1584)</strong>: thousands of English gentlemen signed a solemn pledge binding themselves to hunt down and murder not only anyone who attempted regicide against Elizabeth, but also anyone in whose name or benefit such an attempt was made—a direct death sentence targeting Mary Stuart.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'Walsingham’s Cipher Sting & The Fotheringhay Execution, 1586–1587',
        paras: [
          `The existential crisis reached its dramatic climax in the summer of 1586 with the <strong>Babington Plot</strong>. Anthony Babington, a wealthy Derbyshire Catholic gentleman, organized a circle of Catholic conspirators committed to murdering Elizabeth and rescuing Mary from captivity. Unknown to the conspirators, Sir Francis Walsingham had constructed a masterly counter-espionage trap. Walsingham turned a Catholic courier, <strong>Gilbert Gifford</strong>, into a double-agent. Gifford arranged for Mary’s letters to be smuggled in and out of her secure quarters at Chartley Manor hidden inside watertight beer barrels.`,
          `Dispatches were intercepted and decoded by Walsingham’s cryptographer, <strong>Thomas Phelippes</strong>. When Mary replied on 17 July 1586 approving assassination (<em>"set the six gentlemen to work"</em>), Phelippes drew a gallows emblem. Armed with cryptographic proof, Walsingham struck: Babington and conspirators were arrested, racked, and executed in St Giles' Fields.`,
          `In October 1586, Mary was convicted at Fotheringhay Castle under the Act for the Queen's Safety. Elizabeth hesitated for four months over executing an anointed queen before signing the warrant. The Privy Council dispatched it secretly, and on <strong>8 February 1587</strong>, Mary was beheaded. Her execution eliminated the domestic Catholic figurehead, but in Madrid, Philip II resolved upon total invasion. The execution also removed the prospect of a French-allied Catholic queen ruling England, giving Philip II undisputed papal justification to launch the Armada.`,
        ],
      },
    },

    // Lesson 2: KT 2.2 (Relations with Spain, 1569–1585)
    {
      num: 2,
      code: 'KT 2.2',
      title: 'Relations with Spain, 1569–1585',
      enquiry:
        'How did commercial piracy in the New World, ideological warfare in the Netherlands, and shifting European alliances shatter Anglo-Spanish peace?',
      specRef: '1HI0/B4 &bull; Key Topic 2.2',
      sec1: {
        num: 1,
        title: 'The New World Monopoly & Hawkins’ San Juan de Ulúa Betrayal, 1568–72',
        paras: [
          `In the mid-sixteenth century, King Philip II of Spain presided over the most formidable global empire since ancient Rome. Fueled by mountains of silver from Potosí and Zacatecas, the Spanish Empire encompassed Spain, Portugal, the Spanish Netherlands, southern Italy, the Philippines, and vast American territories. Under Spanish colonial law, foreign merchants were strictly barred from trading with the New World without a royal license—a monopoly Philip enforced with lethal naval violence. English merchants and mariners, however, viewed this closed economic system as an unacceptable barrier to legitimate trade.`,
          `In 1568, Anglo-Spanish commercial rivalry erupted into bloody betrayal at the Battle of <strong>San Juan de Ulúa</strong> off the Mexican coast. John Hawkins and his young cousin Francis Drake had entered the harbour under a formal flag of truce to repair storm damage and trade. The newly arrived Spanish Viceroy, Don Martín Enríquez, agreed to the truce but launched a treacherous surprise attack, sinking four English ships and slaughtering over a hundred English sailors. Drake and Hawkins barely escaped aboard two tiny vessels, enduring starvation on their voyage home. Drake returned to Devon swearing an unyielding vendetta against the Spanish Crown.`,
          `Operating under royal letters of marque, Drake launched audacious privateering raids against Spanish treasure transit routes. In 1572, Drake raided the Isthmus of Panama, ambushing the Spanish Silver Train at <strong>Nombre de Dios</strong>. Overcoming Spanish guards, Drake captured over £20,000 in silver and gold bullion. Elizabeth turned a blind eye to these piratical exploits: with Crown revenues perpetually stretched, plundered Spanish bullion provided essential revenue while bleeding Philip II’s Atlantic supply lines without provoking formal war.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'The Golden Hind & The Pacific Plunder, 1577–1580',
        paras: [
          `In November 1577, Francis Drake sailed from Plymouth with five small vessels on an expedition secretly funded by Queen Elizabeth and members of the Privy Council. While officially announced as an exploration voyage to find the mythical Great South Land, Drake’s secret objective was far more daring: to navigate the treacherous Straits of Magellan and strike the unguarded Pacific coast of South America, where Spain kept no naval warships because they believed no foreign ship could survive the passage.`,
          `Rechristening his flagship the <strong><em>Golden Hind</em></strong>, Drake emerged into the Pacific in 1578, having lost four ships to storms and mutiny. Over the next twelve months, Drake wreaked catastrophic havoc along the coasts of Chile and Peru. He raided Valparaíso and Callao, plundering churches and merchant vessels. In March 1579, Drake tracked down the great Spanish treasure galleon <em>Nuestra Señora de la Concepción</em>—contemptuously nicknamed the <strong><em>Cacafuego</em></strong> ('Shitfire') by Spanish sailors for its heavy broadsides. Caught entirely by surprise, the Spanish captain surrendered without firing a shot.`,
          `Drake transferred <strong>26 tons of silver bullion</strong>, 80 pounds of pure gold, and 13 chests of minted coin into the hold of the <em>Golden Hind</em>. Fearing Spanish ambush if he returned via Cape Horn, Drake sailed north, landed in California to claim 'New Albion' for Elizabeth, and crossed the uncharted Pacific, navigating the Indian Ocean and rounding the Cape of Good Hope. In September 1580, Drake sailed back into Plymouth Sound. The plunder was astronomical: valued at over <strong>£400,000</strong>, Elizabeth’s half-share exceeded the Crown’s ordinary annual expenditure, clearing all national foreign debts overnight.`,
        ],
      },
      sec3: {
        num: 3,
        title: 'The Deptford Defiance & The Low Countries Crucible, 1576–1581',
        paras: [
          `On 4 April 1581, Queen Elizabeth enacted one of the most provocative pieces of political theatre in European diplomatic history. Boarding the <em>Golden Hind</em> anchored at Deptford on the Thames, Elizabeth publicly <strong>knighted Francis Drake</strong> in front of the Spanish Ambassador, Bernardino de Mendoza. Philip II had demanded Drake’s head as an international pirate and the return of the plundered silver. By dubbing Drake Sir Francis, Elizabeth overtly endorsed state-sponsored piracy, signaling to Madrid that England would no longer bend to Spanish imperial intimidation.`,
          `Simultaneously, the geopolitical crucible of the <strong>Spanish Netherlands</strong> deteriorated into total crisis. Across the English Channel, Dutch Protestants had been in open revolt against Spanish taxation and Catholic persecution since 1566. Philip responded by sending the brutal Duke of Alba with 10,000 veteran troops, establishing the 'Council of Blood' which executed over a thousand Dutch rebels. The presence of a massive Spanish army directly opposite the Thames estuary was a mortal threat to England’s security and ruined the vital Antwerp cloth market.`,
          `In November 1576, unpaid Spanish troops mutinied and launched the horrifying <strong>'Spanish Fury'</strong>, sacking Antwerp, slaughtering 7,000 citizens, and burning a third of the city. In revulsion, all seventeen Dutch provinces signed the <strong>Pacification of Ghent</strong>, demanding the expulsion of Spanish forces. Elizabeth pursued a precarious policy of proxy defense: she secretly loaned £100,000 to the Dutch rebels, allowed Protestant privateers ('Sea Beggars') to shelter in English ports, and financed foreign mercenary armies to tie down Spanish troops without declaring formal war.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'The Assassination of William the Silent & The Joinville Trap, 1584',
        paras: [
          `By 1584, Elizabeth’s delicate policy of proxy warfare collapsed catastrophically. In July 1584, the charismatic leader of the Dutch Revolt, <strong>William of Orange ('William the Silent')</strong>, was shot dead in his home at Delft by a Catholic fanatic, Balthasar Gérard. Philip II had publicly placed a bounty of 25,000 crowns on William's head, proving that a Protestant head of state could be assassinated by Catholic agents. William’s death left the Dutch rebellion leaderless and facing immediate destruction at the hands of the brilliant Spanish commander, Alexander Farnese, Duke of Parma.`,
          `Weeks earlier, Elizabeth’s French proxy, the Duke of Alençon (brother of the French King), died of fever. His death extinguished French military opposition to Spain in the Low Countries and threw France into a dynastic succession crisis, as the heir to the French throne was now the Protestant Henry of Navarre. Philip II moved ruthlessly to exploit this power vacuum, sealing a diplomatic masterstroke that isolated England completely.`,
          `In December 1584, Philip II signed the secret <strong>Treaty of Joinville</strong> with the French Catholic League, led by the Duke of Guise. Philip agreed to finance Guise’s private army to wage war against French Protestants and block Henry of Navarre's accession. In return, Guise guaranteed that France would not oppose Spanish military operations in the Netherlands. For England, the Treaty of Joinville was a terrifying geopolitical nightmare: Europe’s two Catholic superpowers were now united in a religious crusade, with England left utterly isolated. Strategic ambiguity was no longer an option: Elizabeth was forced to choose between direct military intervention or absolute Spanish subjugation of Western Europe. The secret pact neutralized French interference in the Low Countries, leaving the English realm with no continental buffer against Parma's veteran tercios.`,
        ],
      },
    },

    // Lesson 3: KT 2.3 (The Outbreak of War with Spain, 1585–1588)
    {
      num: 3,
      code: 'KT 2.3',
      title: 'The Outbreak of War with Spain, 1585–1588',
      enquiry:
        'Why did the Treaty of Nonsuch, Leicester’s Dutch campaign, and Drake’s Cadiz raid transform Cold War proxy conflict into open military invasion?',
      specRef: '1HI0/B4 &bull; Key Topic 2.3',
      sec1: {
        num: 1,
        title: 'The Rubicon Crossed: The Treaty of Nonsuch, August 1585',
        paras: [
          `In the summer of 1585, Queen Elizabeth crossed the Rubicon. With Dutch resistance crumbling and Parma capturing Antwerp, the Dutch Estates-General formally offered Elizabeth the sovereign crown of the Netherlands. Mindful of provoking Philip II into an immediate crusade, Elizabeth prudently declined the crown. However, she could not permit Spanish veteran armies to control the deep-water ports of the Low Countries. On <strong>10 August 1585</strong>, Elizabeth signed the historic <strong>Treaty of Nonsuch</strong> at her Surrey palace.`,
          `Under the terms of Nonsuch, Elizabeth agreed to finance and dispatch an English expeditionary force of <strong>6,400 foot soldiers and 1,000 cavalry</strong>, placing them under the command of her most trusted court favourite, Robert Dudley, Earl of Leicester. To guarantee repayment for military subsidies, the Dutch surrendered two vital deep-water <strong>'cautionary towns'—Flushing and Brill</strong>—which were garrisoned by English troops. Elizabeth’s war aims were strictly defensive: she did not seek Dutch independence, but rather the preservation of Dutch Protestantism and the withdrawal of Spanish forces.`,
          `However, to King Philip II in Madrid, the Treaty of Nonsuch was an explicit, undeniable declaration of open war. For nearly three decades, England had harassed Spanish shipping, protected heretics, and funded rebellion. Now, English soldiers in royal uniform were fighting Spanish troops on sovereign Habsburg territory. Philip ordered the immediate seizure of all English merchant ships in Spanish ports and commenced mobilization for the <em>'Enterprise of England'</em>—the full-scale naval invasion of England.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'Leicester’s Low Countries Misadventure & Betrayal, 1585–87',
        paras: [
          `Despite immense financial expenditure, Leicester’s military intervention in the Low Countries descended into political farce and tactical failure. Upon landing in Flushing in December 1585, Leicester made a catastrophic political blunder: in January 1586, he accepted the title of <strong>'Governor-General of the United Provinces'</strong> from the Dutch Estates. When news reached London, Elizabeth was incandescent with fury: by accepting sovereign executive title, Leicester directly contradicted her public stance that she had no imperial ambitions over Philip’s territory. Elizabeth sent a blistering letter of reprimand, publicly humiliating Leicester before his allies.`,
          `The campaign was crippled by administrative chaos and financial neglect. Elizabeth, horrified by the spiraling costs of continental war, withheld funds; Leicester’s soldiers went unpaid, poorly fed, and lacked basic winter coats, leaving hundreds to die of disease in muddy trenches. Furthermore, Leicester alienated Dutch merchants by attempting to ban all Dutch trade with Spanish territories—a commercial ban Dutch traders completely ignored.`,
          `Military disaster followed in January 1587 when two English Catholic officers, <strong>Sir William Stanley and Rowland York</strong>, defected to the Spanish, surrendering the vital defensive forts of Deventer and Zutphen without firing a shot. This treachery shattered Anglo-Dutch trust. Although English forces fought with great gallantry at the <strong>Battle of Zutphen</strong> in September 1586—where the celebrated poet and courtier Sir Philip Sidney was mortally wounded—Leicester failed to capture any deep-water ports or halt Parma's steady advance. In December 1587, Leicester resigned his command and returned to England in disgrace.`,
        ],
      },
      sec3: {
        num: 3,
        title: 'Drake’s Caribbean Rampage: Sacking the Spanish Empire, 1585–1586',
        paras: [
          `While Leicester foundered on the land, Francis Drake unleashed total war across the oceans. In September 1585, Elizabeth authorized Drake to launch a pre-emptive strike against Spanish imperial commerce. Commanding a fleet of twenty-five warships and 2,000 soldiers, Drake raided the Galician coast before steering across the Atlantic into the heart of the Spanish Caribbean.`,
          `Drake struck with lightning speed. On New Year's Day 1586, he assaulted <strong>Santo Domingo</strong> (Hispaniola), the oldest Spanish capital in the Americas, sacking the city and burning half its buildings until the terrified governor paid a ransom of 25,000 ducats. Drake then stormed <strong>Cartagena</strong> (modern Colombia), the heavily fortified hub of the Spanish treasure fleet, holding the city for six weeks and extorting a massive ransom of 110,000 ducats. Sparing time on his return voyage, Drake razed the Spanish fortress of St Augustine in Florida.`,
          `Although the expedition yielded disappointing financial profits due to rampant yellow fever among the crew, its geopolitical impact was devastating. Drake proved that the Spanish Empire was a hollow colossus whose Atlantic colonies were virtually defenceless. Spanish merchant houses collapsed, the Bank of Genoa suffered runs, and Philip II’s credit rating was so severely impaired that international financiers refused to advance further loans for the planned Armada invasion.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'Singeing the King of Spain’s Beard: The Cadiz Raid, April 1587',
        paras: [
          `By the spring of 1587, Walsingham’s intelligence agents confirmed that Philip II had assembled a massive invasion armada in Spanish and Portuguese ports. Recognizing that defensive waiting would prove fatal, Elizabeth dispatched Francis Drake with four royal galleons and twenty armed merchantmen with orders to <em>"impeach the gathering of the King of Spain's fleet"</em>. On <strong>19 April 1587</strong>, Drake sailed boldly into the heavily defended inner harbour of <strong>Cadiz</strong>.`,
          `Over the next thirty-six hours, Drake executed a masterclass in naval daring. Bombarding shore batteries, Drake’s ships maneuvered through the harbour, sinking, burning, or capturing between <strong>24 and 36 major Spanish vessels</strong>, including massive merchantmen loaded with naval ordnance and food supplies. Drake then sailed along the Portuguese coast, capturing the fortress of Sagres and destroying coastal fishing fleets before intercepting the huge Portuguese carrack <em>San Felipe</em> off the Azores, capturing £108,000 in rich spices and silk.`,
          `Drake famously boasted that he had <em>"singed the King of Spain's beard"</em>. The raid was a logistical catastrophe for Philip II. Drake burned over <strong>1,700 tons of seasoned oak barrel staves</strong> on Cadiz wharves. Philip was forced to construct replacement casks from unseasoned green wood, which leaked fresh water and rotted food during the 1588 campaign. Crucially, the Cadiz raid delayed the launch of the Armada by more than twelve months, granting England a vital year to build warships, train county militias, and construct channel beacons. By intercepting the San Felipe, Drake also captured navigational secrets and Portuguese merchant cargo that financed English mobilization throughout 1587.`,
        ],
      },
    },

    // Lesson 4: KT 2.4 (The Spanish Armada, 1588)
    {
      num: 4,
      code: 'KT 2.4',
      title: 'The Spanish Armada: Strategy, Conflict & Defeat, 1588',
      enquiry:
        'Why did Philip II’s grand invasion plan disintegrate in the English Channel, and what were the decisive factors behind the English naval victory?',
      specRef: '1HI0/B4 &bull; Key Topic 2.4',
      sec1: {
        num: 1,
        title: 'The Grand Enterprise: Philip II’s Flawed Strategy, 1588',
        paras: [
          `In May 1588, King Philip II’s mighty <strong>'Enterprise of England'</strong> finally set sail from Lisbon. Blessed by Pope Sixtus V with a papal crusader banner, the Armada was the largest naval invasion fleet ever assembled: <strong>130 ships, 2,431 cannons, and nearly 30,000 men</strong> (comprising 19,000 soldiers and 8,000 sailors). Philip appointed the Alonso Pérez de Guzmán, <strong>Duke of Medina Sidonia</strong>, as supreme commander. Medina Sidonia was a high-ranking grandee who possessed immense administrative talent but had zero naval combat experience, repeatedly pleading with Philip to cancel the expedition due to poor provisions and ammunition shortages.`,
          `Philip’s grand strategy relied upon a fatal coordination challenge: the Armada was ordered to sail up the English Channel without attacking English ports, anchor off the coast of Flanders, rendezvous with the <strong>Duke of Parma’s 27,000 veteran infantry</strong> (the Army of Flanders), and escort their flat-bottomed invasion barges across the Channel to land in Kent and march on London. Yet the plan was fundamentally flawed from its conception. Spain controlled no deep-water ports along the shallow Flemish coastline: deep-draft Spanish galleons could not enter the sandbanks of Dunkirk or Sluys, while Parma's barges could not leave harbour under blockade by armed Dutch Protestant flyboats.`,
          `Furthermore, maritime communications were slow and disjointed. It took up to forty-eight hours for small courier pinnaces to travel between Medina Sidonia in the Channel and Parma in Bruges. Parma was not even mobilized when the Armada arrived off Calais. Philip had devised a rigid military plan on paper in the Escorial palace that took no account of tide, weather, Dutch naval blockades, or English combat superiority.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'The Running Battle: Crescent Formation vs. Culverin Gunnery, July 1588',
        paras: [
          `On 29 July 1588, lookouts on the Cornish cliffs sighted the Armada approaching the Lizard. Warning beacons were lit across hilltops from Cornwall to London, mobilizing county militias under the Earl of Leicester at Tilbury. Medina Sidonia arrayed his 130 ships in a formidable <strong>defensive crescent formation</strong>, stretching seven miles wide. Heavily armed Portuguese and Castilian galleons formed the protective outer horns, shielding vulnerable supply hulks and troop transports in the center. The formation was designed to bait the English into close boarding combat, where Spain’s elite tercios would overwhelm English crews.`,
          `The English fleet, commanded by <strong>Lord Howard of Effingham</strong> with Drake and Hawkins as vice-admirals, sailed out of Plymouth harbour and seized the weather gauge, maintaining the advantage of the wind. Over the next six days, the English fleet shadowed the Armada up the Channel, engaging in running artillery duels off Plymouth, Portland Bill, and the Isle of Wight. The English consistently refused to close for boarding, exploiting revolutionary naval technology.`,
          `Under Sir John Hawkins’ direction as Treasurer of the Navy, England had constructed <strong>'race-built' galleons</strong>: sleek, low-castled warships that were significantly faster and more maneuverable than high-castled Spanish ships. Crucially, English ships were armed with long-range <strong>culverin cannons</strong> mounted on four-wheeled truck carriages, allowing trained gun crews to reload rapidly and fire 17-pound iron balls from standoff range. Although English gunnery failed to break the crescent formation during the Channel voyage, it prevented the Spanish from landing on the Isle of Wight to establish a secure base.`,
        ],
      },
      sec3: {
        num: 3,
        title: 'Midnight Terror at Calais & The Battle of Gravelines, 7–8 August 1588',
        paras: [
          `On the evening of 6 August 1588, Medina Sidonia anchored the Armada in Calais roads, awaiting news from Parma. The Spanish position was intensely precarious: the fleet was exposed to the open sea with no harbour protection, while Parma sent word that his troops were not yet assembled and his barges could not venture out past Dutch blockades. Recognizing the Spanish vulnerability, Howard and Drake met aboard the <em>Ark Royal</em> to plan a decisive strike.`,
          `At midnight on <strong>7 August 1588</strong>, the English unleashed terror. Eight old naval vessels were packed with pitch, tar, resin, and loaded cannons, set ablaze, and drifted with wind and tide straight into the dense Spanish anchorage. Panic swept the Armada: Spanish captains terrified of Antwerp 'hellburners' (exploding floating mines) frantically severed their anchor cables and fled into the darkness. When dawn broke on 8 August, the Armada’s crescent formation was broken forever; ships were scattered, disorganised, and drifting helplessly toward the deadly sandbanks of Zeeland.`,
          `Lord Howard seized the moment, launching the <strong>Battle of Gravelines</strong>. Closing to within 100 yards, English race-built galleons pummeled the scattered Spanish warships with continuous culverin broadsides. Spanish gun crews, trained for land warfare, were incapable of rapid reloading at sea and suffered horrific casualties on bloody, splinter-filled decks. Three great Spanish galleons were sunk or driven aground, and over 1,000 Spanish sailors were killed. English losses were astonishingly light: not a single English warship was sunk, and fewer than a hundred men were killed in battle. Medina Sidonia's invasion was shattered.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'The Protestant Wind & The Agony of the Atlantic Retreat, August–September 1588',
        paras: [
          `With the Channel blocked by English ships and south-westerly winds blowing relentlessly, Medina Sidonia faced catastrophe. An invasion was impossible: Parma could not embark, the fleet lacked anchors, and ammunition was spent. Medina Sidonia ordered the fleet to flee north into the North Sea, sailing around the wild, stormy coasts of Scotland and Ireland to return to Spain.`,
          `The retreat became an agonizing nightmare. In the North Atlantic, the fleeing fleet was battered by violent gales—hailed in England as the <strong>'Protestant Wind'</strong>. Short of food, drinking putrid water from unseasoned casks, and lacking anchors cut at Calais, ship after ship was hurled onto the jagged rocks of the Hebrides and the western coast of Ireland. Over twenty-five vessels were wrecked along the coasts of Antrim, Sligo, and Kerry; thousands of shipwrecked Spanish survivors were slaughtered by English garrisons or drowned in the pounding surf.`,
          `Barely <strong>65 battered ships and fewer than 10,000 starving, diseased men</strong> limped back into Santander. In London, Queen Elizabeth rode to Tilbury on a white horse, famously declaring to her troops: <em>"I know I have the body but of a weak and feeble woman, but I have the heart and stomach of a king, and of a king of England too!"</em> Elizabeth ordered a victory medal struck with the words <strong><em>Flavit Deus et Dissipati Sunt</em></strong> ('God blew, and they were scattered'). The defeat of the Armada saved English Protestantism, shattered Spain's reputation of invincibility, and announced England's arrival as a global naval power. England established mastery of long-range standoff artillery tactics, forever changing the nature of naval warfare across the Atlantic and North Sea.`,
        ],
      },
    },
  ];

  // Build the complete Master HTML
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Early Elizabethan England, 1558–1588 — Key Topic 2 Course Textbook</title>
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
      margin-top: auto;
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
      object-position: center 20%;
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
        <div class="cover-topic-label">KEY TOPIC 2: CHALLENGES AT HOME AND ABROAD, 1569–1588</div>
        <h1 class="cover-main-title">Challenges to Elizabeth at Home and Abroad, 1569–1588</h1>
        <div class="cover-enquiry-banner">
          <strong>Overarching Historical Enquiry:</strong> &ldquo;${coverConfig.enquiry}&rdquo;
        </div>
      </div>

      <!-- Master 87mm Photographic Plate Frame -->
      <div class="cover-plate-frame">
        <div class="cover-plate-inner">
          <img class="cover-master-photo" src="${coverImgData}" alt="Armada Portrait of Queen Elizabeth I">
        </div>
        <div class="cover-plate-caption">
          <span>${coverConfig.caption}</span>
          <span class="plate-stamp">ACCESSION: NPG-1588-ARMADA</span>
        </div>
      </div>

      <!-- Pearson Edexcel Specification Coverage (Official 4-Column Matrix with 4-Stage Causal Chronology) -->
      <div style="border: 1.5px solid #000; border-radius: 4px; overflow: hidden; background: #fff; display: flex; flex-direction: column; margin-bottom: 2px;">
        <div style="background: #000; color: #fff; padding: 3px 10px; font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; display: flex; justify-content: space-between; align-items: center;">
          <span>Pearson Edexcel GCSE (9–1) History Specification Content</span>
          <span style="font-size: 6.8pt; letter-spacing: 0.5px;">Key Topic 2 Coverage Matrix</span>
        </div>

        <div style="padding: 5px 8px 6px 8px; display: flex; flex-direction: column; gap: 4px;">
          <!-- Row 1: 4-Column Specification Content -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.32; color: #111;">
            <!-- 2.1 -->
            <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
              <strong style="font-size: 7.3pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 1px; display: block; margin-bottom: 3px;">
                2.1 Plots and Revolts
              </strong>
              <div style="margin-bottom: 2px;">&bull; 1569 <strong>Revolt of Northern Earls</strong> (Northumberland &amp; Westmorland).</div>
              <div style="margin-bottom: 2px;">&bull; 1570 Papal Bull <strong>Regnans in Excelsis</strong>: excommunication of Queen.</div>
              <div style="margin-bottom: 2px;">&bull; 1571 <strong>Ridolfi Plot</strong>, Norfolk's execution &amp; 1571 Treasons Act.</div>
              <div style="margin-bottom: 2px;">&bull; 1583 <strong>Throckmorton Plot</strong>, Mendoza expelled &amp; 1584 Bond of Association.</div>
              <div>&bull; 1586 <strong>Babington Plot</strong>, Walsingham's cipher sting &amp; 1587 execution of Mary.</div>
            </div>

            <!-- 2.2 -->
            <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
              <strong style="font-size: 7.3pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 1px; display: block; margin-bottom: 3px;">
                2.2 Relations with Spain
              </strong>
              <div style="margin-bottom: 2px;">&bull; Commercial rivalry: Spanish monopoly &amp; 1568 <strong>San Juan de Ulúa</strong>.</div>
              <div style="margin-bottom: 2px;">&bull; Drake's privateering: Panama (1572) &amp; <strong>Golden Hind circumnavigation</strong>.</div>
              <div style="margin-bottom: 2px;">&bull; Netherlands crisis: 1576 <strong>Spanish Fury</strong> &amp; Pacification of Ghent.</div>
              <div style="margin-bottom: 2px;">&bull; Elizabeth knights Drake at <strong>Deptford (1581)</strong> in defiance of Spain.</div>
              <div>&bull; 1584 <strong>Treaty of Joinville</strong>: France &amp; Spain unite; English isolation.</div>
            </div>

            <!-- 2.3 -->
            <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
              <strong style="font-size: 7.3pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 1px; display: block; margin-bottom: 3px;">
                2.3 Outbreak of War
              </strong>
              <div style="margin-bottom: 2px;">&bull; 1585 <strong>Treaty of Nonsuch</strong>: 7,400 troops sent; Flushing &amp; Brill.</div>
              <div style="margin-bottom: 2px;">&bull; <strong>Leicester's Dutch campaign</strong>: Governor-General blunder &amp; desertions.</div>
              <div style="margin-bottom: 2px;">&bull; 1586 Battle of Zutphen &amp; death of Sir Philip Sidney; Stanley's treason.</div>
              <div style="margin-bottom: 2px;">&bull; Drake's 1585–86 Caribbean raid: sacks Santo Domingo &amp; Cartagena.</div>
              <div>&bull; Drake's 1587 <strong>Cadiz raid</strong>: singeing the King's beard; delays Armada.</div>
            </div>

            <!-- 2.4 -->
            <div>
              <strong style="font-size: 7.3pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 1px; display: block; margin-bottom: 3px;">
                2.4 The Spanish Armada
              </strong>
              <div style="margin-bottom: 2px;">&bull; Philip II's invasion plan: 130 ships under <strong>Duke of Medina Sidonia</strong>.</div>
              <div style="margin-bottom: 2px;">&bull; Strategic flaws: shallow Flemish ports &amp; Parma's stranded 27,000 veterans.</div>
              <div style="margin-bottom: 2px;">&bull; English tactical superiority: <strong>race-built galleons</strong> &amp; culverin cannons.</div>
              <div style="margin-bottom: 2px;">&bull; <strong>Calais fireships (7 Aug)</strong> break crescent; Battle of Gravelines (8 Aug).</div>
              <div>&bull; <strong>Protestant Wind</strong>, shipwreck on Irish coast &amp; destruction of fleet.</div>
            </div>
          </div>

          <!-- Row 2: 4-Column Causal Sequences (4 Vertical Stages per Column with Arrows) -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px;">
            <!-- Col 1 Sequence -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 3px 5px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.26;">
              <span style="font-weight: 800; color: #1e3a8a; text-transform: uppercase; display: block; margin-bottom: 1px;">2.1 Chronological Causal Flow</span>
              <div><strong style="color: #0f172a;">Nov 1569:</strong> Northern Earls Seize Durham</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Feb 1570:</strong> Bull <em>Regnans in Excelsis</em></div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1571:</strong> Ridolfi Plot Intercepted</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Feb 1587:</strong> Mary Beheaded at Fotheringhay</div>
            </div>

            <!-- Col 2 Sequence -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 3px 5px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.26;">
              <span style="font-weight: 800; color: #1e3a8a; text-transform: uppercase; display: block; margin-bottom: 1px;">2.2 Chronological Causal Flow</span>
              <div><strong style="color: #0f172a;">1568:</strong> San Juan de Ulúa Ambush</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1577–80:</strong> Drake Circumnavigates Globe</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Apr 1581:</strong> Drake Knighted at Deptford</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Dec 1584:</strong> Secret Treaty of Joinville</div>
            </div>

            <!-- Col 3 Sequence -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #b45309; padding: 3px 5px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.26;">
              <span style="font-weight: 800; color: #b45309; text-transform: uppercase; display: block; margin-bottom: 1px;">2.3 Chronological Causal Flow</span>
              <div><strong style="color: #0f172a;">Aug 1585:</strong> Treaty of Nonsuch Signed</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Jan 1586:</strong> Leicester Governor-General Error</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Apr 1587:</strong> Drake Raids Cadiz Harbour</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1587–88:</strong> Green Staves Spoil Provisions</div>
            </div>

            <!-- Col 4 Sequence -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #991b1b; padding: 3px 5px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.26;">
              <span style="font-weight: 800; color: #991b1b; text-transform: uppercase; display: block; margin-bottom: 1px;">2.4 Chronological Causal Flow</span>
              <div><strong style="color: #0f172a;">May 1588:</strong> Armada Departs Lisbon</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">29 Jul 1588:</strong> Fleet Sighted off Cornwall</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">7 Aug 1588:</strong> Calais Fireship Night Attack</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Aug–Sep 1588:</strong> Protestant Wind Ruins Fleet</div>
            </div>
          </div>

          <!-- Row 3: Enquiry Disciplinary Focus & Exam Blueprint -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.1pt; line-height: 1.24;">
            <div style="background: #f1f5f9; padding: 2px 4px; border-radius: 2px; border: 1px solid #cbd5e1;">
              <strong style="color: #1e3a8a; display: block;">CORE DISCIPLINARY FOCUS</strong>
              Dynastic Regicide vs Counter-Espionage &bull; <em>Exam: Q1 Feature / Q2 Causation</em>
            </div>
            <div style="background: #f1f5f9; padding: 2px 4px; border-radius: 2px; border: 1px solid #cbd5e1;">
              <strong style="color: #1e3a8a; display: block;">CORE DISCIPLINARY FOCUS</strong>
              Atlantic Piracy &amp; Geopolitics &bull; <em>Exam: Q2 Causation / Q3 Essay</em>
            </div>
            <div style="background: #f1f5f9; padding: 2px 4px; border-radius: 2px; border: 1px solid #b45309;">
              <strong style="color: #b45309; display: block;">CORE DISCIPLINARY FOCUS</strong>
              Treaty of Nonsuch &amp; Cadiz Raid &bull; <em>Exam: Q1 Feature / Q2 Causation</em>
            </div>
            <div style="background: #f1f5f9; padding: 2px 4px; border-radius: 2px; border: 1px solid #991b1b;">
              <strong style="color: #991b1b; display: block;">CORE DISCIPLINARY FOCUS</strong>
              Race-Built Naval Gunnery &amp; Strategy &bull; <em>Exam: Q2 Causation / Q3 Essay</em>
            </div>
          </div>
        </div>
      </div>

      <!-- Cover Running Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #333; font-weight: 700;">
        <span>The History Department &bull; GCSE History Revision Hub</span>
        <span>Key Topic 2 &bull; 12-Page Complete Master Volume</span>
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
        <span>Early Elizabethan England, 1558–1588 &bull; Key Topic 2: Challenges at Home and Abroad</span>
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
        <span>Early Elizabethan England, 1558–1588 &bull; Key Topic 2: Challenges at Home and Abroad</span>
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
        <span>KEY TOPIC 2 MASTER SYNTHESIS</span>
      </div>

      <!-- Lesson Banner -->
      <div class="lesson-hero" style="margin-bottom: 3.5px; padding-bottom: 3px;">
        <div class="lesson-badge-strip">
          <span class="topic-badge">SYNOPTIC OVERVIEW</span>
          <span class="spec-ref-badge">KEY TOPIC 2 MASTER SYNTHESIS &bull; 1569–1588</span>
        </div>
        <h2 class="lesson-title" style="font-size: 11.5pt; margin: 1px 0;">Key Topic 2: Thematic Synoptic Matrix &amp; Historiographical Debate</h2>
        <div class="lesson-spec-anchor" style="padding: 2.5px 6px;">
          <strong>Disciplinary Synthesis:</strong> Evaluating the escalation from covert domestic conspiracies and cold war piracy into total naval invasion in 1588.
        </div>
      </div>

      <!-- Thematic Comparative Matrix (6 Key Specification Pillars) -->
      <div style="border: 1.2px solid #0f172a; border-radius: 3px; overflow: hidden; background: #fff; margin-bottom: 6px;">
        <div style="background: #0f172a; color: #fff; padding: 3px 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: flex; justify-content: space-between;">
          <span>THEMATIC COMPARATIVE MATRIX &bull; SIX SPECIFICATION PILLARS</span>
          <span>1569 CRISIS VS. 1588 REALITY</span>
        </div>
        <table class="master-chron-table" style="font-size: 6.5pt; line-height: 1.26;">
          <thead>
            <tr style="background: #1e293b; color: #ffffff;">
              <th style="width: 20%; padding: 3px 6px;">Thematic Dimension</th>
              <th style="width: 27%; padding: 3px 6px;">The Crisis in 1569–70</th>
              <th style="width: 28%; padding: 3px 6px;">Elizabeth's Strategic Mechanism</th>
              <th style="width: 25%; padding: 3px 6px;">The Balance Sheet by 1588</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #ffffff;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">1. Catholic Dynastic Threat</td>
              <td style="padding: 3.5px 6px;">Mary Stuart alive in England; magnetic figurehead for Ridolfi, Throckmorton, and Babington assassination plots.</td>
              <td style="padding: 3.5px 6px;">Constructed Walsingham's cipher-cracking sting; passed 1584 Bond of Association; executed Mary in Feb 1587.</td>
              <td style="padding: 3.5px 6px;">Domestic Catholic figurehead eliminated forever; but execution triggered Philip II's immediate invasion crusade.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">2. Commercial Cold War</td>
              <td style="padding: 3.5px 6px;">Spanish trade monopoly barred English merchants from Americas; Hawkins betrayed at San Juan de Ulúa (1568).</td>
              <td style="padding: 3.5px 6px;">State-sanctioned privateering: Drake's 1572 Nombre de Dios raid and 1577–80 circumnavigation; £400k Cacafuego haul.</td>
              <td style="padding: 3.5px 6px;">English Crown debt cleared; Spanish Atlantic prestige shattered; Philip II bankrupted, driving him to war.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">3. The Netherlands Crisis</td>
              <td style="padding: 3.5px 6px;">Alba's veteran army on Channel coast; Spanish Fury at Antwerp (1576); William the Silent assassinated (1584).</td>
              <td style="padding: 3.5px 6px;">Signed 1585 Treaty of Nonsuch; sent 7,400 troops under Leicester; seized cautionary towns Flushing and Brill.</td>
              <td style="padding: 3.5px 6px;">Leicester failed tactically; but English presence tied down Parma and preserved Dutch Protestant resistance.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">4. Counter-Espionage Machine</td>
              <td style="padding: 3.5px 6px;">Papal Bull *Regnans in Excelsis* (1570) ordered subjects to depose Queen; Jesuit missionaries entering secretly.</td>
              <td style="padding: 3.5px 6px;">Walsingham built European spy ring; employed cryptographer Phelippes; beer-barrel sting trapped Babington.</td>
              <td style="padding: 3.5px 6px;">All four major assassination plots unmasked; Jesuit networks disrupted; Queen protected without civil war.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">5. Pre-Emptive Naval Power</td>
              <td style="padding: 3.5px 6px;">Royal Navy small and defensive; reliance on merchant conversions; coastal fortifications decaying.</td>
              <td style="padding: 3.5px 6px;">Hawkins built race-built galleons; Drake's 1587 Cadiz raid burned 30+ ships and 1,700 tons of barrel staves.</td>
              <td style="padding: 3.5px 6px;">Armada delayed by over a year; Spanish water casks spoiled; naval initiative seized permanently.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">6. Naval Tactical Supremacy</td>
              <td style="padding: 3.5px 6px;">Spanish naval reputation invincible; reliance on heavy troop transports and close hand-to-hand boarding.</td>
              <td style="padding: 3.5px 6px;">Fireships at Calais scattered Spanish crescent; long-range culverin gunnery raked hulls at Gravelines.</td>
              <td style="padding: 3.5px 6px;">Armada routed with half fleet destroyed; England emerged as paramount Protestant naval superpower.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Secondary Contextual Matrix: The Catholic Plots & Anti-Catholic Penal Legislation Matrix (1569–1587) -->
      <div style="border: 1.2px solid #0f172a; border-radius: 3px; overflow: hidden; background: #fff; margin-bottom: 6px;">
        <div style="background: #1e293b; color: #fff; padding: 3px 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: flex; justify-content: space-between;">
          <span>THE CATHOLIC PLOTS &amp; ANTI-CATHOLIC PENAL LEGISLATION MATRIX (1569–1587)</span>
          <span>DOMESTIC &amp; DYNASTIC CONSPIRACIES</span>
        </div>
        <table class="master-chron-table" style="font-size: 6.4pt; line-height: 1.26;">
          <thead>
            <tr style="background: #0f172a; color: #ffffff;">
              <th style="width: 20%; padding: 2.5px 5px;">Conspiracy / Statute</th>
              <th style="width: 27%; padding: 2.5px 5px;">Key Conspirators &amp; Foreign Backing</th>
              <th style="width: 28%; padding: 2.5px 5px;">Objectives &amp; Papal / Spanish Plot</th>
              <th style="width: 25%; padding: 2.5px 5px;">Outcome &amp; Legislative Retaliation</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3px 5px; font-weight: 800; color: #0f172a;">1. Northern Revolt (1569)</td>
              <td style="padding: 3px 5px;">Earls of Northumberland &amp; Westmorland; backed by Duke of Norfolk; vague Spanish promises.</td>
              <td style="padding: 3px 5px;">Restore Catholicism, marry Norfolk to Mary Stuart, overthrow Cecil, and restore northern regional autonomy.</td>
              <td style="padding: 3px 5px; font-weight: 700; color: #991b1b;">Revolt crushed; 450 rebels executed; 1570 Papal Bull <em>Regnans in Excelsis</em> excommunicates Elizabeth.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3px 5px; font-weight: 800; color: #0f172a;">2. Ridolfi Plot (1571)</td>
              <td style="padding: 3px 5px;">Roberto Ridolfi (banker), Duke of Norfolk, Mary Stuart, Pope Pius V, King Philip II.</td>
              <td style="padding: 3px 5px;">Assassinate Elizabeth; invade England with 10,000 Spanish troops under Alba; place Mary on throne.</td>
              <td style="padding: 3px 5px; font-weight: 700; color: #991b1b;">Plot uncovered by Cecil; Norfolk beheaded (1572); 1571 Treason Act makes questioning Queen's legitimacy treason.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3px 5px; font-weight: 800; color: #0f172a;">3. Throckmorton Plot (1583)</td>
              <td style="padding: 3px 5px;">Francis Throckmorton, French Catholic Duke of Guise, Spanish Ambassador Mendoza, Papacy.</td>
              <td style="padding: 3px 5px;">French army funded by Philip II and Pope to invade Sussex, liberate Mary, and spark Catholic uprising.</td>
              <td style="padding: 3px 5px; font-weight: 700; color: #991b1b;">Walsingham broke cipher; Mendoza expelled; Bond of Association (1584) drafted; Throckmorton executed.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3px 5px; font-weight: 800; color: #0f172a;">4. Babington Plot (1586)</td>
              <td style="padding: 3px 5px;">Anthony Babington, Mary Stuart, Jesuit priest John Ballard, Spanish Ambassador Mendoza.</td>
              <td style="padding: 3px 5px;">Murder Elizabeth, rescue Mary from Chartley Hall, and launch simultaneous Spanish-French invasion.</td>
              <td style="padding: 3px 5px; font-weight: 700; color: #991b1b;">Walsingham's double-agent beer-barrel trap; cipher decoded; Mary Stuart tried and executed (Feb 1587).</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 3px 5px; font-weight: 800; color: #0f172a;">5. Anti-Catholic Statutes (1571–85)</td>
              <td style="padding: 3px 5px;">Parliament, Privy Council, Cecil, Walsingham responding to seminary priests &amp; Jesuits.</td>
              <td style="padding: 3px 5px;">Criminalise incoming Jesuit missionaries (Campion/Persons) and punish Catholic recusancy systematically.</td>
              <td style="padding: 3px 5px; font-weight: 700; color: #1e3a8a;">1581 Act: recusancy fine raised to £20/mo (treason to convert); 1585 Act: death penalty for ordained priests in England.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- The Historiographical Debate & Scholarship (3 Perspectives) -->
      <div style="background: #fdfcfb; border: 1.2px solid #cbd5e1; border-left: 3.5px solid #1e3a8a; padding: 5px 8px; border-radius: 3px; font-family: 'Inter', sans-serif; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
          <span style="font-size: 6.9pt; font-weight: 900; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.05em;">
            THE HISTORIOGRAPHICAL DEBATE &bull; THREE INTERPRETATIONS OF THE ARMADA DEFEAT
          </span>
          <span style="font-size: 6.0pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 1px 5px; border-radius: 2px;">
            HISTORICAL SCHOLARSHIP
          </span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; font-size: 6.5pt; line-height: 1.28; color: #1e293b;">
          <div style="background: #eff6ff; padding: 4.5px 6px; border: 1px solid #bfdbfe; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block; margin-bottom: 1px; text-transform: uppercase; font-size: 6.2pt;">
              1. Traditional Whig (Garrett Mattingly, 1959):
            </strong>
            The Armada was an epic ideological clash between liberty and Counter-Reformation tyranny. English victory was driven by superior naval commanders (Drake, Howard) and tactical gunnery, completed by the 'Protestant Wind' validating God's favour on England.
          </div>
          <div style="background: #fdf2f8; padding: 4.5px 6px; border: 1px solid #fbcfe8; border-radius: 2px;">
            <strong style="color: #9d174d; display: block; margin-bottom: 1px; text-transform: uppercase; font-size: 6.2pt;">
              2. Revisionist (Geoffrey Parker, 1988):
            </strong>
            The Armada was doomed by Philip II's impossible grand strategy rather than English brilliance. Requiring Medina Sidonia to rendezvous with Parma without a deep-water port, while Dutch flyboats blockaded Flemish harbours, was an insurmountable logistical error.
          </div>
          <div style="background: #f0fdf4; padding: 4.5px 6px; border: 1px solid #bbf7d0; border-radius: 2px;">
            <strong style="color: #166534; display: block; margin-bottom: 1px; text-transform: uppercase; font-size: 6.2pt;">
              3. Post-Revisionist (Colin Martin &amp; Peter Pierson, 1999):
            </strong>
            Underwater archaeological recovery of Spanish wrecks proves Spanish gun carriages were unsuited to rapid reloading at sea. The fireships at Calais broke the crescent, and Gravelines proved English culverin superiority, but unseasoned barrels and weather sealed Spain's doom.
          </div>
        </div>

        <div style="margin-top: 3px; background: #f8fafc; border-left: 2px solid #b45309; padding: 2.5px 6px; font-size: 6.3pt; color: #78350f;">
          <strong>Hinge Question for Class Discussion:</strong> <em>Was the defeat of the Spanish Armada primarily the result of English tactical and naval brilliance, or was Philip II's invasion plan doomed from the outset by fatal logistical flaws?</em>
        </div>
      </div>

      <!-- Comparative Policy Evaluation Matrix (4 Pillars) -->
      <div style="border: 1.2px solid #0f172a; border-radius: 3px; overflow: hidden; background: #ffffff; margin-bottom: 6px;">
        <div style="background: #1e293b; color: #ffffff; padding: 2.5px 8px; font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; display: flex; justify-content: space-between;">
          <span>COMPARATIVE POLICY SUCCESS EVALUATION &bull; 1569–1588</span>
          <span>CRITERIA-LED VERDICT</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 5px; padding: 5px 6px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.26;">
          <div style="background: #f8fafc; padding: 4.5px 6px; border-left: 2.5px solid #16a34a; border-radius: 2px;">
            <strong style="color: #16a34a; display: block; text-transform: uppercase;">1. Counter-Espionage: High</strong>
            Walsingham dismantled 4 major assassination plots; cryptographer Phelippes secured legal proof to execute Mary QoS without civil war.
          </div>
          <div style="background: #f8fafc; padding: 4.5px 6px; border-left: 2.5px solid #d97706; border-radius: 2px;">
            <strong style="color: #d97706; display: block; text-transform: uppercase;">2. Dutch Campaign: Low-Mod</strong>
            Leicester's insubordination, desertions, and supply failures damaged trust; but tied down Parma's tercios and prevented Dutch collapse.
          </div>
          <div style="background: #f8fafc; padding: 4.5px 6px; border-left: 2.5px solid #16a34a; border-radius: 2px;">
            <strong style="color: #16a34a; display: block; text-transform: uppercase;">3. Naval Defence: High</strong>
            Cadiz raid delayed invasion; race-built galleons, fireships at Calais, and culverin gunnery prevented Parma junction and routed Armada.
          </div>
          <div style="background: #f8fafc; padding: 4.5px 6px; border-left: 2.5px solid #dc2626; border-radius: 2px;">
            <strong style="color: #dc2626; display: block; text-transform: uppercase;">4. Imperial Finance: Low</strong>
            War in Netherlands and naval mobilization drained Crown reserves, forcing sale of £120,000 Crown lands and renewed reliance on Parliament.
          </div>
        </div>
      </div>

      <!-- Synoptic Disciplinary Assessment -->
      <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-left: 3.5px solid #0f172a; padding: 6.5px 8px; border-radius: 2px; font-family: 'Inter', sans-serif;">
        <span style="font-size: 6.6pt; font-weight: 900; color: #0f172a; text-transform: uppercase; display: block; margin-bottom: 2px;">
          SYNOPTIC VERDICT &bull; THE ESCALATION TO TOTAL WAR AND ARMADA TRIUMPH
        </span>
        <p style="font-size: 6.7pt; line-height: 1.30; color: #334155; margin: 0;">
          Between 1569 and 1588, England was propelled from precarious cold war into total military conflict. While Elizabeth sought for two decades to preserve peace through strategic ambiguity, commercial piracy, and covert Dutch loans, the convergence of papal militancy, Catholic assassination plots around Mary Stuart, and Spain's annexation of Portugal made open war unavoidable. The execution of Mary in 1587 removed the final diplomatic restraint upon Philip II, culminating in the 1588 Armada. England's triumph was neither an accident nor merely a weather miracle: it was the direct product of Walsingham's ruthless intelligence network, Drake's pre-emptive strikes at Cadiz, Hawkins' revolutionary race-built galleons, and superior English standoff gunnery that prevented Parma's veteran army from ever crossing the Channel.
        </p>
      </div>

      <div class="running-footer">
        <span>Early Elizabethan England, 1558–1588 &bull; Key Topic 2 Master Synthesis</span>
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

      <!-- Key Chronology: Eight Causal Turning Points (1569–1588) -->
      <div style="border: 1.2px solid #0f172a; border-radius: 3px; overflow: hidden; background: #ffffff; margin-bottom: 5px;">
        <div style="background: #0f172a; color: #ffffff; padding: 2.5px 8px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif;">
          <span style="font-size: 6.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em;">
            KEY CHRONOLOGY: EIGHT CAUSAL TURNING POINTS (1569–1588)
          </span>
          <span style="font-size: 5.8pt; font-weight: 700; color: #93c5fd;">SPECIFICATION EVIDENCE RECALL</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; padding: 4px 5px; font-family: 'Inter', sans-serif; font-size: 6.0pt; line-height: 1.24;">
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block;">Nov 1569 &bull; Northern Revolt</strong>
            Earls of Northumberland &amp; Westmorland seize Durham; Catholic feudal rebellion.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block;">25 Feb 1570 &bull; Regnans in Excelsis</strong>
            Pius V excommunicates Elizabeth; frees subjects from loyalty; Catholicism = treason.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block;">Sep 1580 &bull; Golden Hind Returns</strong>
            Drake completes circumnavigation with £400k treasure; knighted at Deptford (1581).
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block;">Dec 1584 &bull; Treaty of Joinville</strong>
            Philip II &amp; French Catholic League unite; England left completely isolated.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #b45309; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #b45309; display: block;">10 Aug 1585 &bull; Treaty of Nonsuch</strong>
            England commits 7,400 troops to Netherlands under Leicester; open war with Spain.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #b45309; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #b45309; display: block;">8 Feb 1587 &bull; Execution of Mary Stuart</strong>
            Mary beheaded at Fotheringhay Castle after Babington cipher sting; removes Philip's French obstacle.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #991b1b; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #991b1b; display: block;">19 Apr 1587 &bull; Cadiz Naval Raid</strong>
            Drake destroys 30+ Spanish ships &amp; 1,700 tons of barrel staves; delays Armada 12 months.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #991b1b; padding: 2.5px 4px; border-radius: 2px;">
            <strong style="color: #991b1b; display: block;">8 Aug 1588 &bull; Battle of Gravelines</strong>
            Calais fireships scatter crescent; culverins batter Armada; Protestant wind forces retreat.
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
              Q1(a): Describe one feature of the Duke of Norfolk's plot (Ridolfi Plot) in 1571. [2 marks]
            </div>
            <div style="font-size: 6.3pt; line-height: 1.28; color: #1e293b;">
              <strong>Model Answer:</strong> One feature was the planned invasion of England by a foreign Catholic army of <strong>10,000 Spanish soldiers</strong> led by the Duke of Alba. <em>[1 mark for valid feature]</em> The conspirators planned for these veteran troops from the Netherlands to land at Harwich, murder Queen Elizabeth, and marry Thomas Howard, Duke of Norfolk, to Mary, Queen of Scots. <em>[1 mark for supporting historical detail]</em>
            </div>
          </div>

          <!-- Q1(b) -->
          <div style="background: #ffffff; padding: 3.5px 5.5px; border: 1px solid #e2e8f0; border-radius: 2px;">
            <div style="font-weight: 800; color: #0369a1; font-size: 6.3pt; margin-bottom: 1px;">
              Q1(b): Describe one feature of the fireship attack at Calais in 1588. [2 marks]
            </div>
            <div style="font-size: 6.3pt; line-height: 1.28; color: #1e293b;">
              <strong>Model Answer:</strong> One feature was the English use of <strong>eight burning ghost ships</strong> packed with pitch, tar, and loaded cannons, drifted into the Spanish anchorage at midnight. <em>[1 mark for valid feature]</em> This ignited extreme panic among Spanish captains who feared exploding 'hellburners', causing them to cut their anchor cables and permanently break their defensive crescent formation. <em>[1 mark for supporting historical detail]</em>
            </div>
          </div>
        </div>

        <!-- Examiner Tip & Warning Box -->
        <div style="margin-top: 2.5px; background: #eff6ff; border: 1px solid #bfdbfe; padding: 2px 5px; font-size: 5.9pt; color: #1e40af; border-radius: 2px;">
          <strong>Examiner Warning:</strong> Notice that Edexcel Paper 2 NEVER asks you to 'describe two features' in a single 4-mark question. It strictly divides them into Q1(a) [2m] and Q1(b) [2m]. Keep answers concise: state the feature, add one concrete factual statistic/date/name, and stop immediately. Never write explanations or consequences!
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
          Exam Prompt: Explain why war broke out between England and Spain in 1585. You may use: (1) Drake's privateering in the New World, (2) The Treaty of Nonsuch (1585). [12 marks]
        </div>
        <div style="font-size: 6.2pt; line-height: 1.27; color: #334155; display: flex; flex-direction: column; gap: 2.5px;">
          <div style="background: #ffffff; padding: 3px 5.5px; border: 1px solid #e2e8f0; border-radius: 2px;">
            <strong style="color: #b45309;">PEEL Paragraph 1 (Commercial Piracy &amp; Imperial Provocation):</strong> One major reason war erupted was English commercial piracy in the Spanish Americas, spearheaded by Sir Francis Drake. Spanish colonial law strictly forbade foreign merchants from trading in the New World, yet English 'sea dogs' repeatedly assaulted Spanish treasure ports. This culminated in Drake’s 1577–1580 circumnavigation, during which he plundered £400,000 in silver and gold from the *Cacafuego*, doubling the Crown's annual income. <em>Consequently,</em> when Elizabeth publicly knighted Drake at Deptford in April 1581 rather than executing him as a pirate, she directly challenged Philip II’s imperial prestige and economic solvency, convincing the Spanish monarch that commercial plundering could only be stopped through armed subjugation.
          </div>
          <div style="background: #ffffff; padding: 3px 5.5px; border: 1px solid #e2e8f0; border-radius: 2px;">
            <strong style="color: #b45309;">PEEL Paragraph 2 (Direct Military Intervention &amp; Treaty of Nonsuch):</strong> Furthermore, the direct trigger for open warfare was Elizabeth signing the Treaty of Nonsuch in August 1585. Fearing that the fall of Antwerp to the Duke of Parma would leave the Low Countries in total Spanish control directly opposite London, Elizabeth abandoned twenty-seven years of strategic ambiguity. She agreed to finance and deploy 7,400 English soldiers under the Earl of Leicester and garrisoned the deep-water cautionary towns of Flushing and Brill. <em>As a direct result,</em> Philip II regarded this formal military deployment as an overt declaration of war, immediately impounding all English ships in Iberian ports and ordering the mobilization of the Armada.
          </div>
          <div style="background: #ffffff; padding: 3px 5.5px; border: 1px solid #e2e8f0; border-radius: 2px;">
            <strong style="color: #b45309;">PEEL Paragraph 3 (Own Knowledge: The Assassination of William &amp; Joinville Isolation):</strong> Crucially, the geopolitical crisis in 1584 left England completely isolated and made war unavoidable. In July 1584, Dutch Protestant leader William the Silent was assassinated by a Catholic agent, proving that Protestant leaders could be eliminated. Simultaneously, Philip II signed the secret Treaty of Joinville with the French Catholic League, agreeing to fund the Duke of Guise to keep the Protestant Henry of Navarre off the French throne. <em>Therefore,</em> England was confronted by a united Franco-Spanish Catholic bloc; with France neutralized, Philip had a completely free hand to conquer England, compelling Elizabeth to strike first before Dutch resistance collapsed entirely.
          </div>
        </div>
        <div style="margin-top: 2.5px; background: #fffbeb; border: 1px solid #fde68a; padding: 2.5px 6px; font-size: 5.9pt; color: #92400e; border-radius: 2px; display: flex; justify-content: space-between;">
          <span><strong>Examiner Causation Strategy (Level 4):</strong> Contrast the foundational commercial rivalry (root cause) with the Treaty of Nonsuch and the assassination of William the Silent (immediate triggers). Candidates must explicitly link causes together.</span>
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
          Exam Prompt: "The English use of fireships at Calais was the main reason for the defeat of the Spanish Armada in 1588." How far do you agree? Explain your answer. You may use: (1) Fireships at Calais, (2) English naval gunnery and ship design. [16 marks + 4 SPaG]
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; font-size: 6.1pt; line-height: 1.25; margin-bottom: 2px;">
          <div style="background: #ffffff; padding: 3.5px 5.5px; border: 1px solid #fed7aa; border-radius: 2px;">
            <strong style="color: #991b1b; display: block; text-transform: uppercase;">Factor 1: Calais Fireships (Agree)</strong>
            Midnight attack on 7 August broke the impenetrable crescent formation; Spanish captains cut anchor cables in panic, preventing re-anchoring and leaving ships scattered for Gravelines.
          </div>
          <div style="background: #ffffff; padding: 3.5px 5.5px; border: 1px solid #fed7aa; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block; text-transform: uppercase;">Factor 2: English Gunnery &amp; Design (Counter)</strong>
            Hawkins’ race-built galleons were faster and lower; long-range culverins on 4-wheeled truck carriages allowed rapid reloading, battering Spanish hulls while avoiding boarding melee.
          </div>
          <div style="background: #ffffff; padding: 3.5px 5.5px; border: 1px solid #fed7aa; border-radius: 2px;">
            <strong style="color: #0f172a; display: block; text-transform: uppercase;">Factor 3: Spanish Logistical Flaws &amp; Wind (Counter)</strong>
            No deep-water port to join Parma; Dutch flyboat blockade; unseasoned barrel staves rotting food/water; violent Atlantic gale blew scattered fleet onto Irish rocks.
          </div>
        </div>

        <div style="background: #ffffff; padding: 3.5px 6px; border: 1px solid #fed7aa; border-radius: 2px; font-size: 6.2pt; line-height: 1.27; color: #1e293b;">
          <strong style="color: #991b1b; text-transform: uppercase; font-size: 6.2pt; display: block; margin-bottom: 1px;">Exemplar Level 4 Conclusion (Criteria-Led Sustained Judgement):</strong>
          <em>"In conclusion, while the fireships at Calais provided the decisive tactical turning point, fatal structural and logistical flaws in Philip II’s invasion plan were the ultimate cause of the Armada’s defeat. When assessing causality by the criterion of foundational necessity, the fireships were only effective because the Armada was forced to anchor in an exposed roadstead off Calais due to the absence of a deep-water port in Flanders. Medina Sidonia could never successfully embark Parma’s 27,000 soldiers while Dutch Protestant flyboats maintained an unshakeable shallow-water blockade. Furthermore, superior English naval design—Hawkins’ nimble race-built galleons and fast-reloading culverin cannons—had already neutralized Spanish boarding tactics throughout the Channel voyage. The fireships shattered the crescent formation and Gravelines proved English artillery superiority, but the campaign was structurally doomed before departure by Drake's destruction of barrel staves at Cadiz and Philip's impossible coordination demands. The 'Protestant Wind' merely completed the destruction of an already defeated and disorganized fleet."</em>
        </div>

        <!-- SPaG Mastery Box -->
        <div style="margin-top: 2.5px; background: #fffbeb; border: 1px solid #fde68a; padding: 2.5px 5.5px; font-size: 5.9pt; color: #92400e; border-radius: 2px; display: flex; justify-content: space-between;">
          <span><strong>SPaG Masterclass (+4 Marks):</strong> Spell technical terms accurately (<em>recusancy, privateering, culverin, cautionary towns, tercios</em>). Use sophisticated causal links (<em>consequently, fundamentally, precipitated</em>).</span>
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
          <span>Key Topic 2 Chronological Sequence &bull; Turning Points (1569–1588)</span>
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
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">Nov 1569</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Revolt of Northern Earls</td>
              <td style="padding: 2.2px 6px;">Northumberland &amp; Westmorland seize Durham; mass sung; 450 rebels executed after collapse.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">25 Feb 1570</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Papal Bull Regnans in Excelsis</td>
              <td style="padding: 2.2px 6px;">Pius V excommunicates Elizabeth, releasing subjects from fealty and turning Catholicism into treason.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">1571</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">The Ridolfi Plot</td>
              <td style="padding: 2.2px 6px;">Conspiracy to land 10,000 Spanish troops and marry Mary QoS to Norfolk; leads to 1571 Treasons Act.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">2 Jun 1572</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Execution of Duke of Norfolk</td>
              <td style="padding: 2.2px 6px;">England’s premier Catholic peer beheaded on Tower Hill for complicity in the Ridolfi Plot.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">1572</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Drake Raids Nombre de Dios</td>
              <td style="padding: 2.2px 6px;">Privateer raid in Panama captures £20,000 Spanish bullion, opening direct commercial warfare.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">Nov 1576</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">The Spanish Fury at Antwerp</td>
              <td style="padding: 2.2px 6px;">Mutinous Spanish troops massacre 7,000 citizens; 17 Dutch provinces unite in Pacification of Ghent.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">Sep 1580</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Golden Hind Circumnavigation</td>
              <td style="padding: 2.2px 6px;">Drake returns with £400,000 Cacafuego treasure; Elizabeth knights Drake at Deptford on 4 Apr 1581.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">1583</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">The Throckmorton Plot</td>
              <td style="padding: 2.2px 6px;">French Catholic invasion unmasked by Walsingham; Mendoza expelled; 1584 Bond of Association drafted.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">10 Jul 1584</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">William the Silent Assassinated</td>
              <td style="padding: 2.2px 6px;">Dutch leader shot dead; Treaty of Joinville unites Spain and France; leaves England utterly isolated.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">10 Aug 1585</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Treaty of Nonsuch</td>
              <td style="padding: 2.2px 6px;">England commits 7,400 troops under Leicester and occupies cautionary towns; open war begins.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">Jul–Oct 1586</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">The Babington Plot Exposed</td>
              <td style="padding: 2.2px 6px;">Phelippes deciphers beer-barrel letters; Mary’s endorsement of regicide proves fatal under Bond.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">8 Feb 1587</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Execution of Mary, Queen of Scots</td>
              <td style="padding: 2.2px 6px;">Beheaded at Fotheringhay Castle; eliminates Catholic claimant; triggers Philip’s invasion crusade.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">19 Apr 1587</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Drake’s Raid on Cadiz</td>
              <td style="padding: 2.2px 6px;">'Singeing the King’s Beard': 30+ ships and 1,700 tons of barrel staves burned; delays Armada 1 year.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">7–8 Aug 1588</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Fireships at Calais &amp; Gravelines</td>
              <td style="padding: 2.2px 6px;">Fireships scatter crescent formation; culverin broadsides rout fleet; gale forces catastrophic retreat.</td>
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
            <div>&bull; <strong>Bond of Association (1584):</strong> Legal pledge binding signatories to murder anyone plotting against the Queen or benefiting from regicide.</div>
            <div>&bull; <strong>Privateering:</strong> State-sanctioned piracy where armed merchant vessels operated under government letters of marque against Spanish shipping.</div>
            <div>&bull; <strong>Cautionary Towns:</strong> Strategic Dutch deep-water ports (Flushing and Brill) surrendered to English garrisons as surety for war loans.</div>
            <div>&bull; <strong>Treaty of Joinville (1584):</strong> Secret pact uniting Philip II and the French Catholic League, isolating England on the European stage.</div>
            <div>&bull; <strong>Crescent Formation:</strong> Spanish naval array stretching seven miles wide, shielding vulnerable supply hulks inside heavy outer galleons.</div>
            <div>&bull; <strong>Culverin:</strong> Long-range English naval cannon mounted on 4-wheel truck carriages, allowing fast reloading and standoff broadsides.</div>
            <div>&bull; <strong>Fireships (Hellburners):</strong> Eight burning ghost ships drifted into Calais harbour, forcing the Spanish to cut anchor cables in panic.</div>
            <div>&bull; <strong>Protestant Wind:</strong> Fierce south-westerly gale that blew the damaged Armada into the North Sea, wrecking ships on Irish rocks.</div>
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
              <em>Model:</em> &ldquo;Describe one feature of the fireship attack at Calais in 1588.&rdquo;<br>
              <span style="color: #64748b; font-size: 5.8pt; font-weight: 600;">Formula: 1 mark valid feature + 1 mark supporting historical detail (0 explanation).</span>
            </div>
            <div style="background: #f8fafc; border-left: 2.5px solid #b45309; padding: 2px 4px; border-radius: 0 2px 2px 0;">
              <span style="font-weight: 800; color: #b45309;">Q2: Explain why... [12 Marks &bull; 18 Mins]</span><br>
              <em>Model:</em> &ldquo;Explain why war broke out between England and Spain in 1585.&rdquo;<br>
              <span style="color: #64748b; font-size: 5.8pt; font-weight: 600;">Formula: 3 PEEL paragraphs (2 stimulus + 1 own knowledge) linked with causal connectives.</span>
            </div>
            <div style="background: #f8fafc; border-left: 2.5px solid #991b1b; padding: 2px 4px; border-radius: 0 2px 2px 0;">
              <span style="font-weight: 800; color: #991b1b;">Q3: Evaluative Essay [16 Marks + 4 SPaG &bull; 25 Mins]</span><br>
              <em>Model:</em> &ldquo;'Fireships at Calais were the main cause of Armada defeat.' How far do you agree?&rdquo;<br>
              <span style="color: #64748b; font-size: 5.8pt; font-weight: 600;">Formula: 3 balanced analytical paragraphs + criteria-led sustained conclusion.</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Assessment Objectives (AO) Mastery Banner -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 2.5px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.24;">
        <div style="border-right: 1px solid #e2e8f0; padding-right: 6px;">
          <strong style="color: #0f172a; text-transform: uppercase; font-size: 6.3pt; display: block; margin-bottom: 1px;">Assessment Objective 1 (AO1 &bull; 50%):</strong>
          Demonstrate knowledge and understanding of key features and characteristics of the period (precise dates, statutory acts, plot conspiracies, naval statistics).
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
              Key Topic 2 Knowledge Quiz &amp; Flashcards
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #1e293b; line-height: 1.27; margin-bottom: 2px;">
            Scan the QR code with any smartphone or tablet camera to launch the interactive, self-marking retrieval bank for Key Topic 2. Test your rapid recall across Catholic Plots, Drake's Circumnavigation, the Treaty of Nonsuch, Cadiz Raid, and the 1588 Armada with instant model answers and scoring.
          </div>
          <div style="display: flex; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.0pt; font-weight: 700; color: #475569;">
            <span>&bull; 20 Specification Recall Questions</span>
            <span>&bull; Instant Self-Marking &amp; Explanations</span>
            <span>&bull; Digital Leitner Flashcard Deck</span>
          </div>
        </div>
        <div style="text-align: center; flex-shrink: 0; display: flex; flex-direction: column; align-items: center;">
          <img src="${qrDataUrl}" alt="Key Topic 2 Quiz QR" style="width: 20mm; height: 20mm; display: block; border: 1px solid #cbd5e1; border-radius: 3px; padding: 1px; background: #fff;">
          <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 800; text-transform: uppercase; color: #1e3a8a; margin-top: 1.5px; letter-spacing: 0.3px;">
            Scan for Mobile Quiz
          </span>
        </div>
      </div>

      <!-- Back Cover Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #333; font-weight: 700;">
        <span>Paper 2: Early Elizabethan England, 1558–1588 &bull; Key Topic 2 Specification Review Index</span>
        <span>Page 12 of 12</span>
      </div>

    </div>
  </div>

</body>
</html>`;

  return html;
}

async function runKT2() {
  console.log('================================================================');
  console.log('🏛️ RENDERING EARLY ELIZABETHAN ENGLAND KEY TOPIC 2 MASTER TEXTBOOK');
  console.log('================================================================');

  const html = await buildPublisherTextbookHtmlKT2();

  const htmlOutputDir = path.join(ROOT_DIR, 'public', 'units', 'eee');
  if (!fs.existsSync(htmlOutputDir)) fs.mkdirSync(htmlOutputDir, { recursive: true });
  const htmlPath = path.join(htmlOutputDir, 'textbook_KT2_PUBLISHER.html');
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('✅ HTML compiled to:', htmlPath);

  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) fs.mkdirSync(pdfOutputDir, { recursive: true });
  const pdfPublisherPath = path.join(pdfOutputDir, 'eee_textbook_KT2_PUBLISHER.pdf');
  const pdfLegacyPath = path.join(pdfOutputDir, 'eee_textbook_KT2.pdf');

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
  console.log('✅ Synchronized active alias:');
  console.log('   -', pdfLegacyPath);

  // Synchronize to Google Drive Department File if available
  const driveDest =
    'G:\\My Drive\\AAMX\\Dep File\\Year 11 (GCSE)\\Paper 2 - Early Elizabethan England\\Early Elizabethan England Master Textbook (KT2).pdf';
  if (fs.existsSync(path.dirname(driveDest))) {
    fs.copyFileSync(pdfPublisherPath, driveDest);
    console.log('✅ Synchronized directly to Google Drive Department File:');
    console.log('   -', driveDest);
  }

  await browser.close();
  console.log('🎉 Key Topic 2 Master Textbook compilation complete!\n');
}

if (require.main === module) {
  runKT2().catch((err) => {
    console.error('Fatal error during textbook compilation:', err);
    process.exit(1);
  });
}

module.exports = { runKT2 };

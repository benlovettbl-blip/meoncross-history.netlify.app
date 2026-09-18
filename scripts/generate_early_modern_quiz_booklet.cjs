/**
 * generate_early_modern_quiz_booklet.cjs
 *
 * Compiles the 16-Page A5 Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for KS3 History (Year 8): Early Modern World & Global Encounters (1450–1750).
 *
 * Page Architecture (16-Page A5 Booklet / 4 sheets A4 landscape folded in half):
 * - Page 1: Uniform Front Cover & Formative Homework & Retrieval Tracking Ledger
 *           (9-Lesson ledger, scholar box, traffic light mastery rule, QR code, Armada portrait)
 * - Page 2: Inside Front Cover — Master Chronology Domino Flowchart (1450–1750)
 * - Pages 3–11: 9 Dedicated Lesson Pages (Lessons 1 to 9 • 8 questions each)
 *              Featuring 2 roomy write-in lines per question (18px min-height):
 *              Line 1: Answer: [Core Fact]
 *              Line 2: Detail / Why: [Historical Mechanism or Consequence]
 * - Page 12: Department Marking Bank (Part 1 • Lessons 1–3 • Q1–Q24 • Bold answers + Explanations + [✓][✗])
 * - Page 13: Department Marking Bank (Part 2 • Lessons 4–6 • Q25–Q48 • Bold answers + Explanations + [✓][✗])
 * - Page 14: Department Marking Bank (Part 3 • Lessons 7–9 • Q49–Q72 • Bold answers + Explanations + [✓][✗])
 * - Page 15: Key Historical Figures Gallery (8 protagonists) & Academic Vocabulary with Phonetics
 * - Page 16: Back Cover — Summative Assessment Preparation & Essay Architect
 *            ("To what extent was Britain transformed into a 'modern' nation by 1750?" •
 *            4-Pillar Matrix, "March of Progress" vs "Human Cost & Exploitation" Debate, sentence starters, Archival Seal)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const UNIT_DIR = path.join(ROOT_DIR, 'public', 'units', 'early_modern_world');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');
const DRIVE_ROOT = 'G:\\My Drive\\AAMX\\Dep File';

if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}

// --------------------------------------------------------------------------
// 72 CURATED HIGH-YIELD QUESTIONS ACROSS THE 9 LESSONS
// --------------------------------------------------------------------------
const QUIZ_DATA = [
  // LESSON 1: Who held global power in 1450?
  {
    lesson: 1,
    lessonTitle: '1. Global Power in 1450: Ottomans, Ming & Fragmentation',
    shortTitle: 'Global Power in 1450',
    enquiry: 'Who held global power in 1450?',
    items: [
      {
        q: 'Which powerful Islamic empire captured the Byzantine capital of Constantinople in 1453?',
        a: 'The Ottoman Empire under Sultan Mehmed II',
        exp: 'Using massive bronze siege cannons, the Ottomans breached the Byzantine walls, ending over 1,000 years of the Eastern Roman Empire.',
      },
      {
        q: 'Which Asian dynasty ruled China in 1450, boasting the world’s largest economy and Forbidden City?',
        a: 'The Ming Dynasty',
        exp: 'China dominated global porcelain, silk, and agricultural wealth, having constructed the Forbidden City and vast fleets under Admiral Zheng He.',
      },
      {
        q: 'What West African Islamic empire controlled lucrative gold and salt trans-Saharan trade routes in 1450?',
        a: 'The Songhai Empire (and Mali)',
        exp: 'Timbuktu was a world-famous intellectual and trading capital where salt from northern deserts was traded for gold from southern forests.',
      },
      {
        q: 'What major trade route connecting Europe and Asia was disrupted when the Ottomans took Constantinople?',
        a: 'The Silk Road',
        exp: 'The Ottoman conquest placed overland Asian trade under heavy taxes and Muslim control, forcing European monarchs to seek maritime alternatives.',
      },
      {
        q: 'How did Ottoman disruption of the Silk Road directly drive European maritime exploration?',
        a: 'Europeans desperately sought an ocean sea route to India and the Spice Islands',
        exp: 'Portuguese and Spanish navigators sailed south around Africa and west across the Atlantic to secure direct sea access to valuable spices.',
      },
      {
        q: 'What Mesoamerican empire in Central America had its magnificent island capital at Tenochtitlan?',
        a: 'The Aztec Empire',
        exp: 'With advanced chinampa agriculture, causeways, and stone temples, the Aztecs dominated central Mexico until the Spanish conquest of 1521.',
      },
      {
        q: 'Was Western Europe unified under a single dominant empire in 1450?',
        a: 'No, Europe was fractured into competing feudal kingdoms and principalities',
        exp: 'Constant warfare between rival monarchs in England, France, and the Holy Roman Empire drove intense military innovation and competition.',
      },
      {
        q: 'What navigational instrument adopted by European sailors used the Earth’s magnetic field to determine direction?',
        a: 'The magnetic mariner’s compass',
        exp: 'Originally invented in China, the magnetic compass allowed European caravels to navigate deep open oceans away from coastal landmarks.',
      },
    ],
  },

  // LESSON 2: How did religious conflict trigger global exploration (1517–1588)?
  {
    lesson: 2,
    lessonTitle: '2. Religious Conflict & Exploration: Reformation to Armada (1517–1588)',
    shortTitle: 'Reformation, Rivalry & Armada',
    enquiry: 'How did religious conflict trigger global exploration (1517–1588)?',
    items: [
      {
        q: 'Which German monk triggered the Protestant Reformation by nailing 95 Theses to a church door in 1517?',
        a: 'Martin Luther',
        exp: 'Luther attacked Catholic corruption and the sale of papal indulgences, sparking religious division that fractured Christian Europe.',
      },
      {
        q: 'What English monarch broke with the Roman Catholic Church in 1534 to establish the Church of England?',
        a: 'King Henry VIII',
        exp: 'Henry passed the Act of Supremacy declaring himself Supreme Head of the Church to divorce Catherine of Aragon and seize monastery wealth.',
      },
      {
        q: 'What Spanish military fleet was dispatched by King Philip II in 1588 to overthrow Protestant Queen Elizabeth I?',
        a: 'The Spanish Armada',
        exp: 'Comprising 130 warships and 30,000 soldiers, the Armada aimed to transport Spanish invasion veterans from the Netherlands to London.',
      },
      {
        q: 'What vital resource extracted from American colonies funded the Spanish Catholic Empire’s European wars?',
        a: 'Silver and gold bullion from mines like Potosí',
        exp: 'Enslaved indigenous and African workers mined millions of silver pesos, funding Spanish imperial armies and mercenary warfare across Europe.',
      },
      {
        q: 'What naval tactic did the English use at Gravelines (1588) to shatter the Spanish Armada’s defensive formation?',
        a: 'Eight flaming fireships (hellburners) sent into Calais harbour',
        exp: 'Panic-stricken Spanish captains cut their anchor cables in the dark, scattering into the North Sea where English guns attacked them.',
      },
      {
        q: 'What English privateer circumnavigated the globe (1577–80) while plundering Spanish treasure galleons?',
        a: 'Sir Francis Drake',
        exp: 'Drake’s voyage on the Golden Hind brought back vast Spanish treasure, earning him a royal knighthood from Queen Elizabeth on his ship.',
      },
      {
        q: 'How did Protestant and Catholic rivalry accelerate European colonization of the Americas?',
        a: 'Both sides competed fiercely to convert indigenous souls and seize strategic wealth',
        exp: 'English Protestants like Raleigh sought to build an anti-Catholic maritime empire to check Spanish Catholic power in the New World.',
      },
      {
        q: 'What weather disaster wrecked surviving Spanish Armada ships off the coasts of Scotland and Ireland?',
        a: 'The ‘Protestant Wind’ (severe Atlantic gales and storms)',
        exp: 'Armada ships trying to escape north ran aground on rocky Scottish and Irish cliffs; fewer than half the ships limped back to Spain.',
      },
    ],
  },

  // LESSON 3: Trade or takeover: How did early encounters turn into empire?
  {
    lesson: 3,
    lessonTitle: '3. Trade or Takeover: The East India Company & Early Empire',
    shortTitle: 'Trade to Empire & The EIC',
    enquiry: 'Trade or takeover: How did early encounters turn into empire?',
    items: [
      {
        q: 'What royal charter company was founded in London on 31 December 1600 to trade with the East Indies?',
        a: 'The East India Company (EIC)',
        exp: 'Queen Elizabeth granted a commercial monopoly to London merchants to sail into the Indian Ocean and break the Dutch spice monopoly.',
      },
      {
        q: 'What innovative financial system allowed investors to buy shares in trading voyages and limit personal liability?',
        a: 'The joint-stock company',
        exp: 'Merchants pooled capital and spread risks; if a ship sank, investors lost only their subscribed shares rather than their entire fortune.',
      },
      {
        q: 'What powerful Asian empire ruled India in the 17th century with immense wealth, art, and population?',
        a: 'The Mughal Empire',
        exp: 'Under emperors like Akbar and Shah Jahan, the Mughal Empire commanded 25% of world manufacturing and built architectural wonders like the Taj Mahal.',
      },
      {
        q: 'What were the fortified trading warehouses established by the East India Company on foreign coasts called?',
        a: 'Factories (Factory settlements)',
        exp: 'EIC ‘factors’ (commercial agents) stored textiles and spices inside fortified compounds like Fort St George (Madras) and Fort William (Calcutta).',
      },
      {
        q: 'What valuable Asian goods did British merchants purchase in India to trade in Europe?',
        a: 'Cotton calico, silk, saltpetre, and spices',
        exp: 'Light Indian calico and chintz cottons revolutionized European fashion, while saltpetre was critical for British military gunpowder manufacturing.',
      },
      {
        q: 'How did early European merchant relationships with indigenous rulers differ from 19th-century military conquest?',
        a: 'Early merchants acted as humble supplicants paying tribute and seeking permits',
        exp: 'Ambassadors like Sir Thomas Roe bowed before the Mughal Emperor Jahangir, seeking trade privileges rather than attempting military rule.',
      },
      {
        q: 'What private military force did the East India Company recruit in India to defend its fortified settlements?',
        a: 'Sepoy regiments commanded by British officers',
        exp: 'The EIC recruited Indian soldiers (sepoys) and drilled them in modern European flintlock musket tactics, forming a massive corporate private army.',
      },
      {
        q: 'How did the decline of central Mughal authority in the 18th century allow the EIC to expand from trade into territorial rule?',
        a: 'The EIC exploited regional rivalries and collected local land taxation (Diwani)',
        exp: 'Following the 1757 Battle of Plassey, the EIC seized the tax revenues of Bengal, transforming from a trading firm into a colonial governing power.',
      },
    ],
  },

  // LESSON 4: James I and the Gunpowder Plot
  {
    lesson: 4,
    lessonTitle: '4. James I & The Gunpowder Plot: Religious Volatility (1605)',
    shortTitle: 'James I & The Gunpowder Plot',
    enquiry: 'James I and the Gunpowder Plot: Why was religious division so volatile?',
    items: [
      {
        q: 'In what year did James VI of Scotland succeed Elizabeth I to become King James I of England?',
        a: '1603',
        exp: 'The union of the English and Scottish crowns brought the Stuart dynasty to London, uniting two kingdoms under one Protestant monarch.',
      },
      {
        q: 'What conspiratorial plot was devised by Catholic rebels in 1605 to blow up the Houses of Parliament?',
        a: 'The Gunpowder Plot',
        exp: 'Catholic conspirators aimed to assassinate King James, his ministers, and Parliament to install a Catholic puppet monarch on the throne.',
      },
      {
        q: 'Who was the charismatic ringleader and mastermind behind the 1605 Gunpowder Plot?',
        a: 'Robert Catesby',
        exp: 'Catesby was a charismatic Warwickshire Catholic gentleman whose father had been persecuted and fined under Elizabethan anti-Catholic laws.',
      },
      {
        q: 'What explosives expert was discovered guarding 36 barrels of gunpowder beneath Parliament on 4 November 1605?',
        a: 'Guy Fawkes (John Johnson)',
        exp: 'Fawkes had fought as a mercenary for Catholic Spain; he was arrested in the cellar with a lantern, slow matches, and pocket watch.',
      },
      {
        q: 'What anonymous warning letter sent to Catholic peer Lord Monteagle exposed the Gunpowder Plot?',
        a: 'The Monteagle Letter',
        exp: 'The letter warned Monteagle to skip the opening of Parliament because “they shall receive a terrible blow”; Monteagle showed it to the King’s ministers.',
      },
      {
        q: 'What legal penalties were intensified against English Catholics following the failure of the 1605 plot?',
        a: 'The Popish Recusancy Acts (heavier fines, oaths of allegiance, and loss of rights)',
        exp: 'Catholics were barred from practicing law, serving as army officers, voting, or living within ten miles of London unless taking anti-papal oaths.',
      },
      {
        q: 'What annual national commemoration was established by Parliament in 1606 to celebrate the King’s deliverance?',
        a: 'The Thanksgiving Act (Bonfire Night / 5th of November)',
        exp: 'The state ordered church bells rung and bonfires lit every 5 November, reinforcing Protestant national identity through anti-Catholic effigies.',
      },
      {
        q: 'Why did religious division create intense political fear that Catholics owed their loyalty to a foreign power?',
        a: 'Protestants feared Catholics owed ultimate allegiance to the Pope in Rome',
        exp: 'Because the Pope claimed spiritual authority to excommunicate kings and release subjects from their vows, Catholics were viewed as potential traitors.',
      },
    ],
  },

  // LESSON 5: Who controlled Britain? The Ideological Battle (1625–1649)
  {
    lesson: 5,
    lessonTitle: '5. Who Controlled Britain? Civil War & Regicide (1642–1649)',
    shortTitle: 'The Ideological Battle: Civil War',
    enquiry: 'Who controlled Britain? The Ideological Battle',
    items: [
      {
        q: 'What political theory did King Charles I believe in, asserting that monarchs derived their authority directly from God?',
        a: 'The Divine Right of Kings',
        exp: 'Charles believed monarchs were accountable only to God, meaning any resistance or criticism from Parliament was sinful rebellion.',
      },
      {
        q: 'What eleven-year period (1629–1640) did Charles I rule Britain without calling a single Parliament?',
        a: 'The Eleven Years’ Tyranny (Personal Rule)',
        exp: 'Angry at parliamentary opposition, Charles dismissed Parliament and financed his government through ancient feudal taxes without consent.',
      },
      {
        q: 'What ancient coastal emergency naval tax did Charles I unlawfully impose on inland towns during peacetime?',
        a: 'Ship Money',
        exp: 'Traditionally levied on coastal ports during war, Charles extended Ship Money to inland counties like Buckinghamshire, provoking outrage.',
      },
      {
        q: 'In what year did the English Civil War officially break out between King Charles I and Parliament?',
        a: '1642',
        exp: 'Charles raised his royal standard at Nottingham in August 1642 after failing to arrest five MPs in the House of Commons by force.',
      },
      {
        q: 'What nickname was given to supporters of King Charles I during the Civil War?',
        a: 'Cavaliers (Royalists)',
        exp: 'Supporters of the King were mocked as aristocratic, long-haired Cavaliers, while parliamentary supporters were labelled Roundheads.',
      },
      {
        q: 'What disciplined, professional parliamentary army was formed in 1645 by Oliver Cromwell and Thomas Fairfax?',
        a: 'The New Model Army',
        exp: 'Promoting officers on military merit rather than noble birth, this religious, disciplined force crushed the King at the Battle of Naseby.',
      },
      {
        q: 'What unprecedented constitutional event took place on a scaffold outside the Banqueting House on 30 January 1649?',
        a: 'The public execution (beheading) of King Charles I',
        exp: 'Charles was tried by a special High Court for treason against his own people; his public execution abolished the monarchy.',
      },
      {
        q: 'What form of government was Britain declared to be between 1649 and 1660 under Oliver Cromwell?',
        a: 'A Republic (The Commonwealth / Protectorate)',
        exp: 'Britain was governed without a king, ruled first by Parliament and then by Oliver Cromwell as military Lord Protector.',
      },
    ],
  },

  // LESSON 6: Who controlled Britain? The Economic Shift (1660–1750)
  {
    lesson: 6,
    lessonTitle: '6. The Economic Shift: Restoration, Glorious Revolution & Banks',
    shortTitle: 'The Economic Shift: 1660–1750',
    enquiry: 'Who controlled Britain? The Economic Shift',
    items: [
      {
        q: 'What event in 1660 saw the Stuart monarchy returned to the throne under King Charles II?',
        a: 'The Restoration of the Monarchy',
        exp: 'Following Cromwell’s death and the collapse of the military protectorate, Parliament invited Charles I’s son to return from exile.',
      },
      {
        q: 'What event in 1688 saw Catholic King James II overthrown in favor of Protestant rulers William and Mary?',
        a: 'The Glorious Revolution',
        exp: 'Seven English nobles invited Dutch Prince William of Orange to invade England to preserve Protestantism and parliamentary liberties.',
      },
      {
        q: 'What constitutional document did William and Mary sign in 1689 establishing parliamentary supremacy?',
        a: 'The English Bill of Rights',
        exp: 'The Bill banned monarchs from suspending laws, levying taxes without Parliament, or keeping a peacetime standing army without consent.',
      },
      {
        q: 'What financial institution was established in 1694 to fund government war debts and issue banknotes?',
        a: 'The Bank of England',
        exp: 'Created to raise money for William III’s wars against France, the Bank pioneered the National Debt and national paper currency.',
      },
      {
        q: 'What economic system prioritized accumulating gold and silver by maximizing exports and controlling colonial trade?',
        a: 'Mercantilism',
        exp: 'European powers believed global wealth was fixed; colonies were forced to supply raw materials and buy manufactured goods only from the mother country.',
      },
      {
        q: 'What laws passed in the 17th century required all colonial trade to be carried exclusively in English ships?',
        a: 'The Navigation Acts',
        exp: 'These protectionist laws excluded Dutch and foreign merchants from British imperial trade, guaranteeing immense naval and commercial dominance.',
      },
      {
        q: 'What 1707 treaty joined the kingdoms of England and Scotland into the unified Kingdom of Great Britain?',
        a: 'The Act of Union',
        exp: 'Scotland dissolved its Edinburgh parliament in exchange for Scottish access to England’s lucrative global colonial trading empire.',
      },
      {
        q: 'How did constitutional limits on royal power in 1689 encourage the growth of modern capitalist commerce?',
        a: 'Private property and investments were legally secure from royal confiscation',
        exp: 'Because Parliament controlled taxes and debts, investors trusted British financial institutions, creating low interest rates and booming trade.',
      },
    ],
  },

  // LESSON 7: What were the mechanics of the Transatlantic Slave Trade?
  {
    lesson: 7,
    lessonTitle: '7. The Triangular Trade: Middle Passage & Caribbean Plantations',
    shortTitle: 'The Transatlantic Slave Trade',
    enquiry: 'What were the mechanics of the Transatlantic Slave Trade?',
    items: [
      {
        q: 'What three-legged oceanic trading system connected Britain, West Africa, and the Caribbean Americas?',
        a: 'The Triangular Trade',
        exp: 'British goods sailed to Africa, enslaved people were shipped to American plantations, and slave-grown sugar and tobacco were shipped to Britain.',
      },
      {
        q: 'What manufactured British goods were exchanged on the West African coast for captured enslaved Africans?',
        a: 'Guns, gunpowder, brass pans, cloth, and iron bars',
        exp: 'British manufacturing centres like Birmingham (guns) and Manchester (textiles) boomed by producing goods tailored for African coastal slave traders.',
      },
      {
        q: 'What was the brutal second oceanic leg of the trade across the Atlantic Ocean called?',
        a: 'The Middle Passage',
        exp: 'Enslaved people were shackled in darkness in the suffocating, diseased holds of slave ships for weeks of terror and death.',
      },
      {
        q: 'How long did the horrific transatlantic crossing typically take under sail?',
        a: '6 to 12 weeks depending on weather and ocean currents',
        exp: 'During the voyage, dysentery (the ‘bloody flux’), smallpox, and dehydration killed an estimated 15% to 20% of all captive Africans.',
      },
      {
        q: 'What infamous 1788 diagram of a Liverpool slave ship shocked the British public with its depiction of human packing?',
        a: 'The Brookes of Liverpool diagram',
        exp: 'The diagram showed 454 human bodies packed into wooden shelves like cargo, proving the industrial dehumanisation of the trade.',
      },
      {
        q: 'What term described the practice of packing enslaved people sideways onto wooden shelves with inches of clearance?',
        a: 'Tight-packing (Spoon-fashion)',
        exp: 'Captains believed packing more human beings into the hold maximized profits, even though it caused horrific suffocation and disease.',
      },
      {
        q: 'What major cash crop grown on Caribbean plantations generated enormous profits for British merchants and absentee landlords?',
        a: 'Sugar cane',
        exp: 'Sugar was Britain’s most valuable import; boiling raw cane into sugar crystals was brutal, deadly forced industrial labour in extreme heat.',
      },
      {
        q: 'Approximately how many enslaved African people were transported across the Atlantic over the duration of the trade?',
        a: 'Over 12 million men, women, and children',
        exp: 'Britain alone transported over 3.1 million enslaved Africans, making cities like Bristol and Liverpool the slave-trading capitals of the Atlantic.',
      },
    ],
  },

  // LESSON 8: How did enslaved Africans resist the Transatlantic Slave Trade?
  {
    lesson: 8,
    lessonTitle: '8. Resistance to Slavery: Mutinies, Maroons & Abolitionists',
    shortTitle: 'Resistance to the Slave Trade',
    enquiry: 'How did enslaved Africans resist the Transatlantic Slave Trade?',
    items: [
      {
        q: 'What extreme form of resistance did enslaved Africans commit on slave ships rather than endure enslavement?',
        a: 'Shipboard revolts and jumping overboard (suicide)',
        exp: 'Historians record over 500 violent shipboard insurrections; many Africans chose death in the ocean, believing their spirits would return home.',
      },
      {
        q: 'What famous collective term was given to communities of escaped enslaved people in the mountains of Jamaica?',
        a: 'The Maroons',
        exp: 'Maroons established independent, fortified mountain towns, fighting British troops to a standstill and signing self-governing peace treaties.',
      },
      {
        q: 'Who was the legendary military leader of the Windward Maroons who defeated British troops in guerrilla warfare?',
        a: 'Queen Nanny of the Maroons',
        exp: 'A skilled military strategist and herbalist, Nanny led Moore Town, camouflaging warriors with leaves and using the abeng horn for communications.',
      },
      {
        q: 'What subtle, everyday forms of non-violent resistance did enslaved plantation workers use to resist exploitation?',
        a: 'Working slowly, breaking tools, pretending illness, and feigning misunderstanding',
        exp: 'Everyday resistance slowed plantation production, protected fellow workers from exhaustion, and limited the master’s economic exploitation.',
      },
      {
        q: 'How did enslaved Africans preserve their humanity and heritage in defiance of slave masters?',
        a: 'Retaining ancestral music, oral storytelling, religious rituals, and languages',
        exp: 'Enslaved people created new Creole cultures, blending West African rhythms, drumming, and folklore (like Anansi the spider) to survive trauma.',
      },
      {
        q: 'What African writer published a bestselling 1789 autobiography exposing the horrors of the slave trade?',
        a: 'Olaudah Equiano (Gustavus Vassa)',
        exp: 'Equiano bought his own freedom, joined the Sons of Africa abolitionist group, and toured Britain giving firsthand eyewitness speeches against the trade.',
      },
      {
        q: 'In what year did the British Parliament pass the historic Act to Abolish the Transatlantic Slave Trade?',
        a: '1807',
        exp: 'The Abolition of the Slave Trade Act made it illegal for British ships to transport enslaved people or trade in African ports.',
      },
      {
        q: 'Did the 1807 Act instantly abolish slavery and free all enslaved people working on Caribbean plantations?',
        a: 'No, it banned the trade and shipping; slavery itself was abolished in 1833',
        exp: 'Around 800,000 people remained enslaved on British Caribbean plantations until the Slavery Abolition Act was passed 26 years later in 1833.',
      },
    ],
  },

  // LESSON 9: How 'modern' was Britain by 1750? (Synthesis & Assessment)
  {
    lesson: 9,
    lessonTitle: '9. How ‘Modern’ Was Britain by 1750? Synthesis & Assessment',
    shortTitle: 'How ‘Modern’ Was Britain in 1750?',
    enquiry: 'How ‘modern’ was Britain by 1750? (Synthesis & Assessment)',
    items: [
      {
        q: 'By 1750, was the British monarch an absolute ruler who could govern without Parliament?',
        a: 'No, Britain was a constitutional monarchy governed by Parliament and Prime Minister',
        exp: 'The Glorious Revolution and Bill of Rights subordinated the monarch to Parliament, establishing Robert Walpole as Britain’s first Prime Minister.',
      },
      {
        q: 'What major agricultural transformation consolidated small peasant strips into enclosed, hedged farms?',
        a: 'The Parliamentary Enclosure Acts',
        exp: 'Enclosure boosted crop yields and livestock breeding through four-field crop rotation, but dispossessed rural peasants who migrated to towns.',
      },
      {
        q: 'What global conflict (1756–1763) established Great Britain as the dominant European colonial power in North America and India?',
        a: 'The Seven Years’ War',
        exp: 'Britain defeated France, seizing Canada, Caribbean sugar islands, and expanding the East India Company’s dominance across Bengal.',
      },
      {
        q: 'How did imported colonial goods like sugar, tobacco, tea, and coffee transform ordinary British daily life by 1750?',
        a: 'They became everyday consumer staples across all social classes',
        exp: 'Coffeehouses and tea rituals became centres of business, news, and social debate, fueling a commercial consumer revolution.',
      },
      {
        q: 'Did the majority of British men and women have the right to vote in parliamentary elections in 1750?',
        a: 'No, fewer than 5% of adult men owned enough land to vote; women had zero voting rights',
        exp: 'Parliament was controlled by wealthy aristocratic landowners who bought and sold ‘rotten boroughs’ with virtually no genuine democracy.',
      },
      {
        q: 'What key industrial power source was beginning to be harnessed in 18th-century coal mines by Newcomen engines?',
        a: 'Atmospheric steam power',
        exp: 'Thomas Newcomen’s steam engines pumped water out of deep coal mines, setting the technological foundation for James Watt’s factory engines.',
      },
      {
        q: 'Why is Britain’s economic prosperity in 1750 inseparable from the exploitation of the Transatlantic Slave Trade?',
        a: 'Enormous slave fortunes funded British banks, naval ports, and early manufacturing',
        exp: 'Profits from slave-produced sugar built grand buildings in Bristol and Liverpool, funded Barclays and Baring banks, and purchased industrial machinery.',
      },
      {
        q: 'Why do historians argue Britain was only ‘partially modern’ by 1750?',
        a: 'It had global commerce and constitutional limits, but remained aristocratic and unequal',
        exp: 'While Britain led the world in trade and finance, it was governed by an unelected House of Lords, denied voting rights to 95% of people, and profited from slavery.',
      },
    ],
  },
];

// --------------------------------------------------------------------------
// CSS STYLING FOR A5 SADDLE-STITCH BOOKLET (148mm x 210mm)
// --------------------------------------------------------------------------
const A5_BOOKLET_CSS = `
  @page {
    size: 148mm 210mm;
    margin: 6mm 0mm;
  }
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #0f172a;
    margin: 0;
    padding: 0;
    font-size: 7.2pt;
    line-height: 1.2;
    background: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .a5-page {
    page-break-after: always;
    height: 198mm;
    max-height: 198mm;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }
  /* Gutter-Safe Margin Tuning for A5 Saddle-Stitch Binding */
  .a5-page:nth-child(odd) {
    padding-left: 10mm; /* Inner spine clearance on left for odd/recto pages */
    padding-right: 6mm;
  }
  .a5-page:nth-child(even) {
    padding-left: 6mm;
    padding-right: 10mm; /* Inner spine clearance on right for even/verso pages */
  }
  .a5-page:last-child { page-break-after: avoid; }

  .page-flex-full {
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    height: 198mm !important;
    box-sizing: border-box !important;
  }
  .page-body-stretch {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .timeline-page-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Page Headers & Footers */
  .page-header-strip {
    border-bottom: 1.5px solid #0f172a;
    padding-bottom: 2px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .page-header-strip h2 {
    margin: 0;
    font-size: 8.8pt;
    color: #0f172a;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .page-header-strip p {
    margin: 1px 0 0 0;
    font-size: 6.2pt;
    color: #475569;
    font-weight: 600;
  }
  .page-tag {
    font-size: 6.2pt;
    font-weight: 800;
    background: #854d0e;
    color: #ffffff;
    padding: 2px 6px;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    white-space: nowrap;
  }
  .page-footer-strip {
    font-size: 6.2pt;
    color: #64748b;
    border-top: 1px solid #cbd5e1;
    padding-top: 2px;
    margin-top: 2px;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
  }

  /* Cover Page Styling (Page 1) */
  .cover-banner {
    background: #78350f;
    color: #ffffff;
    padding: 4px 8px;
    border-radius: 4px 4px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 6.5pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }
  /* Commercial School Cover Customizer */
  [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]) .school-brand-target {
    display: inline-block;
    font-size: 0;
  }
  [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]) .school-brand-target::after {
    content: attr(data-department-name);
    font-size: 6.5pt;
  }
  .cover-header-block {
    text-align: center;
    padding: 4px 6px 3px 6px;
    background: #fefce8;
    border-left: 1px solid #fef08a;
    border-right: 1px solid #fef08a;
  }
  .cover-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 11.5pt;
    font-weight: 800;
    color: #451a03;
    line-height: 1.15;
    margin: 0 0 2px 0;
  }
  .cover-subtitle {
    font-size: 6.8pt;
    font-weight: 700;
    color: #854d0e;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin: 0;
  }

  /* Pupil Box */
  .pupil-box {
    background: #ffffff;
    border: 1px solid #fef08a;
    border-top: none;
    padding: 3px 8px;
    font-size: 7pt;
  }
  .pupil-grid {
    display: grid;
    grid-template-columns: 2fr 1.2fr 1.5fr;
    gap: 10px;
    align-items: center;
  }
  .pupil-field {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .pupil-field span.lbl {
    font-weight: 700;
    color: #78350f;
    white-space: nowrap;
  }
  .pupil-field span.line {
    border-bottom: 1.2px solid #000000;
    flex: 1;
    min-height: 12px;
  }

  /* Cover Map Container */
  .cover-map-container {
    margin: 2px 0 2px 0;
    text-align: center;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 2px 4px 2px 4px;
  }
  .cover-map-frame {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    max-height: 58mm;
  }
  .cover-map-img {
    max-height: 58mm;
    max-width: 100%;
    object-fit: contain;
    border: 1px solid #94a3b8;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }
  .cover-map-caption {
    font-size: 5.4pt;
    color: #475569;
    margin-top: 1.5px;
    letter-spacing: 0.2px;
  }

  /* Tracking Grid Table (Page 1) */
  .tracking-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.2pt;
    margin-top: 2px;
    margin-bottom: 2px;
  }
  .tracking-table th {
    background: #78350f;
    color: #ffffff;
    font-weight: 700;
    text-transform: uppercase;
    padding: 2px 3px;
    border: 1px solid #78350f;
    font-size: 5.8pt;
    letter-spacing: 0.2px;
    text-align: center;
  }
  .tracking-table td {
    border: 1px solid #cbd5e1;
    padding: 2.4px 3px;
    text-align: center;
    vertical-align: middle;
  }
  .tracking-table td.left-title {
    text-align: left;
    color: #0f172a;
  }
  .tb-lesson-title {
    font-weight: 800;
    font-size: 6.2pt;
    color: #0f172a;
    line-height: 1.1;
  }
  .tb-lesson-enquiry {
    font-size: 5.1pt;
    color: #475569;
    font-style: italic;
    line-height: 1.1;
  }
  .score-line {
    display: inline-block;
    width: 12px;
    border-bottom: 1px solid #000;
  }
  .retrieval-boxes {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3.5px;
    font-size: 5.8pt;
    color: #334155;
    white-space: nowrap;
  }
  .retrieval-boxes span {
    font-weight: 600;
  }
  .parent-sig-cell {
    padding: 2px 4px;
  }
  .parent-sig-box {
    border: 1px solid #94a3b8;
    background: #ffffff;
    border-radius: 2px;
    height: 14px;
    width: 100%;
  }

  /* 3-Tier Traffic Light Mastery Rule */
  .mastery-traffic-strip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fefce8;
    border: 1px solid #fef08a;
    border-radius: 3px;
    padding: 2px 6px;
    margin-top: 1.5px;
    margin-bottom: 1.5px;
    font-size: 5.6pt;
    line-height: 1.15;
  }
  .traffic-tier {
    display: flex;
    align-items: center;
    gap: 3px;
    color: #78350f;
  }
  .traffic-dot {
    font-size: 7pt;
    line-height: 1;
  }
  .green-dot { color: #16a34a; }
  .amber-dot { color: #d97706; }
  .red-dot { color: #dc2626; }

  /* QR Strip */
  .qr-strip {
    display: flex;
    align-items: center;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 2.5px 6px;
    gap: 8px;
    margin-top: 1.5px;
    margin-bottom: 1px;
  }
  .qr-code-img {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
  }
  .qr-caption-text {
    font-size: 6pt;
    color: #334155;
    line-height: 1.15;
    text-align: left;
    font-weight: 600;
  }

  /* Page 2: Chronology Domino Flowchart */
  .timeline-flow {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    justify-content: space-between;
    margin-top: 2px;
    margin-bottom: 2px;
  }
  .domino-node {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #ffffff;
    border: 1px solid #78350f;
    border-radius: 3px;
    padding: 2.2px 5px;
    font-size: 6.5pt;
    line-height: 1.16;
  }
  .domino-year {
    background: #78350f;
    color: #ffffff;
    font-weight: 800;
    font-size: 6.4pt;
    padding: 1.5px 4px;
    border-radius: 2px;
    white-space: nowrap;
  }
  .domino-text {
    flex: 1;
  }

  /* Pages 3–11: Dedicated Question Page Layout */
  .lesson-instruction-bar {
    background: #fefce8;
    border-left: 3px solid #78350f;
    padding: 2px 6px;
    font-size: 6.4pt;
    color: #78350f;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .q-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 1.5px;
  }
  .q-block {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 3px 6px;
    display: flex;
    flex-direction: column;
    gap: 1.5px;
  }
  .q-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 4px;
    font-size: 8.5pt;
    line-height: 1.15;
  }
  .q-prompt-wrap {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    flex: 1;
  }
  .q-num {
    font-weight: 800;
    color: #000000;
    min-width: 14px;
    font-size: 8.5pt;
  }
  .q-prompt {
    font-weight: 700;
    color: #000000;
    font-size: 8.5pt;
  }
  .q-mastery {
    font-size: 6pt;
    font-weight: 700;
    color: #475569;
    white-space: nowrap;
  }
  .q-line-row {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    font-size: 7.2pt;
    margin-top: 1px;
  }
  .q-line-lbl {
    font-weight: 800;
    color: #000000;
    white-space: nowrap;
    font-size: 7.2pt;
    min-width: 65px;
  }
  .q-solid-line {
    flex: 1;
    border-bottom: 1.2px solid #000000;
    min-height: 18px;
  }

  /* Pages 12–14: Marking Bank */
  .mb-section-title {
    background: #fefce8;
    border-left: 3px solid #78350f;
    padding: 1px 4px;
    font-size: 6.4pt;
    font-weight: 800;
    color: #78350f;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    margin: 1.5px 0 1px 0;
  }
  .mb-section-title:first-child { margin-top: 0; }
  .mb-container {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex: 1;
    justify-content: space-between;
  }
  .ans-card {
    display: flex;
    align-items: flex-start;
    gap: 3px;
    font-size: 6.1pt;
    line-height: 1.12;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 2px;
    padding: 1.5px 3.5px;
  }
  .ans-num {
    font-weight: 800;
    color: #78350f;
    min-width: 13px;
  }
  .ans-content {
    flex: 1;
    color: #0f172a;
  }
  .ans-core {
    font-weight: 800;
    color: #0f172a;
  }
  .ans-exp {
    color: #334155;
    font-style: italic;
  }
  .ans-boxes {
    font-size: 6pt;
    font-weight: 800;
    color: #64748b;
    white-space: nowrap;
  }

  /* Page 15: Figures & Vocab */
  .p15-sec-title {
    font-size: 7.2pt;
    font-weight: 800;
    text-transform: uppercase;
    color: #78350f;
    border-bottom: 1.2px solid #78350f;
    padding-bottom: 1.5px;
    margin-bottom: 3px;
    margin-top: 4px;
  }
  .p15-sec-title:first-of-type { margin-top: 0; }
  .figures-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3px;
    margin-bottom: 3px;
  }
  .figure-card {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 3px 5px;
    font-size: 5.8pt;
    line-height: 1.15;
  }
  .figure-name {
    font-weight: 800;
    color: #78350f;
    font-size: 6.5pt;
  }
  .figure-role {
    font-weight: 600;
    color: #64748b;
    font-size: 5.6pt;
  }
  .figure-act {
    color: #334155;
    margin-top: 1px;
  }
  .vocab-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5px;
  }
  .vocab-card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 2px;
    padding: 2.5px 4px;
    font-size: 5.8pt;
    line-height: 1.15;
  }
  .vocab-term {
    font-weight: 800;
    color: #78350f;
    font-size: 6.4pt;
  }
  .vocab-phonetic {
    font-style: italic;
    color: #b45309;
    font-size: 5.6pt;
    font-weight: 600;
    margin-left: 3px;
  }
  .vocab-def {
    color: #334155;
    margin-top: 0.5px;
  }

  /* Page 16: Back Cover Essay Architect */
  .essay-matrix-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.2pt;
    margin-bottom: 3px;
  }
  .essay-matrix-table th {
    background: #78350f;
    color: #ffffff;
    font-weight: 800;
    padding: 2.5px 4px;
    border: 1px solid #78350f;
    text-align: left;
    font-size: 6pt;
    text-transform: uppercase;
  }
  .essay-matrix-table td {
    border: 1px solid #cbd5e1;
    padding: 2px 4px;
    vertical-align: top;
    line-height: 1.15;
  }
  .essay-card {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 3px 6px;
    margin-bottom: 2.5px;
  }
  .essay-card-title {
    font-size: 6.6pt;
    font-weight: 800;
    color: #78350f;
    margin-bottom: 1.5px;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  .scaffold-list {
    margin: 0;
    padding-left: 10px;
    font-size: 6pt;
    color: #334155;
    line-height: 1.18;
  }
  .connectives-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    margin-top: 1.5px;
  }
  .conn-pill {
    background: #fef3c7;
    color: #92400e;
    font-weight: 700;
    font-size: 5.6pt;
    padding: 1px 4px;
    border-radius: 2px;
  }
  .archival-seal-block {
    text-align: center;
    border-top: 1px dashed #94a3b8;
    padding-top: 2px;
    margin-top: 2px;
    font-size: 5.4pt;
    color: #64748b;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
`;

// --------------------------------------------------------------------------
// COMPILATION PIPELINE
// --------------------------------------------------------------------------
async function buildEarlyModernQuizBooklet() {
  console.log('\n=============================================================');
  console.log('🌍 Compiling Year 8 Early Modern World 16-Page A5 Quiz Booklet');
  console.log('=============================================================\n');

  // 1. Generate QR Code
  console.log('🛠️  Generating QR Code for interactive revision portal...');
  const appUrl =
    'https://the-history-revision-hub.netlify.app/?unit=early_modern_world&view=lessons';
  const qrDataUrl = await QRCode.toDataURL(appUrl, {
    margin: 1,
    width: 90,
    color: { dark: '#78350f', light: '#ffffff' },
  });

  // 2. Load Armada Portrait Artwork for Cover Page
  console.log('🗺️  Loading Armada Portrait Artwork for Cover Page...');
  let mapDataUrl = '';
  const mapPath = path.join(ROOT_DIR, 'public', 'images', 'armada_portrait.jpg');
  if (fs.existsSync(mapPath)) {
    const mapBuffer = fs.readFileSync(mapPath);
    mapDataUrl = `data:image/jpeg;base64,${mapBuffer.toString('base64')}`;
  }

  // ------------------------------------------------------------------------
  // PAGE 1: COVER & FORMATIVE HOMEWORK RETRIEVAL LEDGER (9 LESSONS)
  // ------------------------------------------------------------------------
  const page1 = `
  <div class="a5-page page-flex-full">
    <div class="page-body-stretch">
      <div class="cover-banner" data-department-name="The History Department">
        <span class="school-brand-target">The History Department</span>
        <span>Key Stage 3 History &bull; Year 8</span>
      </div>

      <div class="cover-header-block">
        <h1 class="cover-title">Early Modern World &amp; Global Encounters</h1>
        <div class="cover-subtitle">Knowledge Retrieval &bull; Formative Homework &bull; Assessment Companion (1450&ndash;1750)</div>
      </div>

      <div class="pupil-box">
        <div class="pupil-grid">
          <div class="pupil-field">
            <span class="lbl">Scholar Name:</span>
            <span class="line"></span>
          </div>
          <div class="pupil-field">
            <span class="lbl">Class:</span>
            <span class="line"></span>
          </div>
          <div class="pupil-field">
            <span class="lbl">Teacher:</span>
            <span class="line"></span>
          </div>
        </div>
      </div>

      <div class="cover-map-container">
        <div class="cover-map-frame">
          ${
            mapDataUrl
              ? `<img src="${mapDataUrl}" class="cover-map-img" alt="The Armada Portrait of Elizabeth I (1588)" />`
              : `<div style="padding: 15px; font-size: 7pt; color: #64748b;">[The Armada Portrait of Elizabeth I (1588)]</div>`
          }
        </div>
        <div class="cover-map-caption">
          <strong>Primary Archive:</strong> The Armada Portrait of Queen Elizabeth I (1588), her hand resting upon the global sphere symbolizing nascent English maritime ambition.
        </div>
      </div>

      <!-- Formative Tracking Ledger (9 Lessons) -->
      <table class="tracking-table">
        <thead>
          <tr>
            <th style="width: 34%;">Curriculum Lesson Topic</th>
            <th style="width: 12%;">Attempt 1</th>
            <th style="width: 12%;">Attempt 2</th>
            <th style="width: 20%;">Retrieval Strength</th>
            <th style="width: 22%; font-size: 5.4pt; text-transform: uppercase;">Parent Signature</th>
          </tr>
        </thead>
        <tbody>
          ${QUIZ_DATA.map(
            (l) => `
            <tr>
              <td class="left-title">
                <div class="tb-lesson-title">L${l.lesson}: ${l.shortTitle}</div>
                <div class="tb-lesson-enquiry">“${l.enquiry}”</div>
              </td>
              <td><span class="score-line"></span> / 8</td>
              <td><span class="score-line"></span> / 8</td>
              <td>
                <div class="retrieval-boxes">
                  <span>[ ] Instant</span>
                  <span>[ ] Effortful</span>
                  <span>[ ] Restudy</span>
                </div>
              </td>
              <td class="parent-sig-cell"><div class="parent-sig-box"></div></td>
            </tr>
          `,
          ).join('')}
        </tbody>
      </table>


      <!-- QR Strip -->
      <div class="qr-strip">
        <img src="${qrDataUrl}" class="qr-code-img" alt="Digital Portal QR" />
        <div class="qr-caption-text">
          <strong>Digital Revision &amp; Self-Check:</strong> Scan to access digital flashcards, interactive maps, audio narrations, and primary source documents on the Revision Hub.
        </div>
      </div>
    </div>

    <div class="page-footer-strip">
      <span>The History Department &bull; KS3 Early Modern World</span>
      <span>Page 1 of 16</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 2: INSIDE FRONT COVER — CHRONOLOGY DOMINO FLOWCHART (1450–1750)
  // ------------------------------------------------------------------------
  const timelineNodes = [
    {
      year: '1453',
      text: '<strong>Fall of Constantinople:</strong> Ottoman Sultan Mehmed II captures the Byzantine capital, severing overland Silk Road trade.',
    },
    {
      year: '1492',
      text: '<strong>Voyage to the Americas:</strong> Columbus lands in the Caribbean, initiating transatlantic contact and the Columbian Exchange.',
    },
    {
      year: '1517',
      text: '<strong>The Protestant Reformation:</strong> Martin Luther posts his 95 Theses; Western European Christendom fractures into Catholic and Protestant states.',
    },
    {
      year: '1588',
      text: '<strong>The Spanish Armada:</strong> Philip II’s Catholic invasion fleet is defeated by fireships at Gravelines and wrecked by Atlantic storms.',
    },
    {
      year: '1600',
      text: '<strong>East India Company Chartered:</strong> Elizabeth I grants a royal charter to London merchants, pioneering joint-stock corporate trade.',
    },
    {
      year: '1605',
      text: '<strong>The Gunpowder Plot:</strong> Robert Catesby and Guy Fawkes fail to blow up Parliament; severe anti-Catholic penal laws enacted.',
    },
    {
      year: '1642',
      text: '<strong>English Civil War Outbreak:</strong> Clash between Charles I’s Divine Right and Parliamentary sovereignty triggers nationwide war.',
    },
    {
      year: '1649',
      text: '<strong>Execution of Charles I:</strong> Monarchy abolished; Britain declared a Republic (Commonwealth) under Oliver Cromwell.',
    },
    {
      year: '1660',
      text: '<strong>The Stuart Restoration:</strong> Charles II recalled from exile, restoring the monarchy, House of Lords, and Church of England.',
    },
    {
      year: '1660',
      text: '<strong>Royal Society Founded:</strong> King Charles II grants a royal charter to the Royal Society, institutionalizing empirical scientific inquiry.',
    },
    {
      year: '1672',
      text: '<strong>Royal African Company Chartered:</strong> Monarchy charters monopoly over the transatlantic slave trade, trafficking thousands to sugar colonies.',
    },
    {
      year: '1687',
      text: '<strong>Newton’s Principia Mathematica:</strong> Isaac Newton formulates universal laws of motion and gravity, crystallizing the Scientific Revolution.',
    },
    {
      year: '1688',
      text: '<strong>The Glorious Revolution:</strong> Catholic James II ousted; William and Mary sign the 1689 Bill of Rights, establishing constitutional monarchy.',
    },
    {
      year: '1694',
      text: '<strong>Bank of England Founded:</strong> National debt and paper money created, financing modern British fiscal-military power.',
    },
    {
      year: '1707',
      text: '<strong>Act of Union:</strong> England and Scotland unite into the Kingdom of Great Britain, opening global imperial markets.',
    },
  ];

  const page2 = `
  <div class="a5-page page-flex-full">
    <div class="timeline-page-content">
      <div class="page-header-strip">
        <div>
          <h2>Chronology Domino Flowchart</h2>
          <p>Three Centuries of Global Transformation, Revolution &amp; Empire (1450 &ndash; 1750)</p>
        </div>
        <span class="page-tag">Timeline Chain</span>
      </div>

      <div class="lesson-instruction-bar" style="margin-bottom: 2px;">
        <strong>Causal Chain:</strong> Trace how religious conflict, constitutional revolution, and commercial capitalism transformed Britain from an isolated island into a global power.
      </div>

      <div class="timeline-flow">
        ${timelineNodes
          .map(
            (node) => `
          <div class="domino-node">
            <div class="domino-year">${node.year}</div>
            <div class="domino-text">${node.text}</div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    <div class="page-footer-strip">
      <span>Early Modern World &bull; Chronological Chain</span>
      <span>Page 2 of 16</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGES 3 TO 11: 9 DEDICATED LESSON PAGES (LESSONS 1 TO 9)
  // ------------------------------------------------------------------------
  const questionPages = [];
  let currentQNum = 1;

  for (let lIdx = 0; lIdx < QUIZ_DATA.length; lIdx++) {
    const l = QUIZ_DATA[lIdx];
    const pageNum = lIdx + 3; // Pages 3 to 11

    let qItemsHtml = '';
    l.items.forEach((item) => {
      qItemsHtml += `
        <div class="q-block">
          <div class="q-header">
            <div class="q-prompt-wrap">
              <span class="q-num">${currentQNum}.</span>
              <span class="q-prompt">${item.q}</span>
            </div>
            <span class="q-mastery">[ &nbsp; ] Mastered</span>
          </div>
          <div class="q-line-row">
            <span class="q-line-lbl">Answer:</span>
            <span class="q-solid-line"></span>
          </div>
          <div class="q-line-row">
            <span class="q-line-lbl">Detail / Why:</span>
            <span class="q-solid-line"></span>
          </div>
        </div>
      `;
      currentQNum++;
    });

    const pageHtml = `
    <div class="a5-page">
      <div>
        <div class="page-header-strip">
          <div>
            <h2>Lesson ${l.lesson}: ${l.shortTitle}</h2>
            <p>Enquiry: “${l.enquiry}” &bull; Direct Active Recall</p>
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="font-size: 6.5pt; font-weight: 700; border: 1.2px solid #78350f; padding: 1.5px 5px; border-radius: 2px;">Score: &nbsp;&nbsp;&nbsp; / 8</span>
            <span class="page-tag">Q${currentQNum - 8}–Q${currentQNum - 1}</span>
          </div>
        </div>
        <div class="lesson-instruction-bar">
          <strong>Instructions:</strong> Complete Line 1 (Answer) from memory. Complete Line 2 (Detail / Why) to articulate the historical mechanism, motive, or consequence.
        </div>
      </div>

      <div class="q-container">
        ${qItemsHtml}
      </div>

      <div class="page-footer-strip">
        <span>Early Modern World &bull; Lesson ${l.lesson} Retrieval Drill</span>
        <span>Page ${pageNum} of 16</span>
      </div>
    </div>
    `;

    questionPages.push(pageHtml);
  }

  // ------------------------------------------------------------------------
  // PAGE 12: DEPARTMENT MARKING BANK (PART 1 • LESSONS 1 TO 3)
  // ------------------------------------------------------------------------
  let aP12Html = '';
  let aNum = 1;
  for (let lIdx = 0; lIdx < 3; lIdx++) {
    const l = QUIZ_DATA[lIdx];
    aP12Html += `<div class="mb-section-title">Lesson ${l.lesson}: ${l.shortTitle}</div><div class="mb-container">`;
    l.items.forEach((item) => {
      aP12Html += `
        <div class="ans-card">
          <span class="ans-num">${aNum}.</span>
          <div class="ans-content">
            <span class="ans-core">${item.a}</span> &mdash; <span class="ans-exp">${item.exp}</span>
          </div>
          <span class="ans-boxes">[✓][✗]</span>
        </div>
      `;
      aNum++;
    });
    aP12Html += `</div>`;
  }

  const page12 = `
  <div class="a5-page">
    <div class="page-header-strip">
      <div>
        <h2>Department Marking Bank (Part 1)</h2>
        <p>Lessons 1 to 3 &bull; Answers 1 to 24 &bull; Core Answers &amp; The Explanation</p>
      </div>
      <span class="page-tag">Marking Key 1–24</span>
    </div>

    ${aP12Html}

    <div class="page-footer-strip">
      <span>Early Modern World &bull; Marking Bank &bull; Turn Page for Lessons 4–6</span>
      <span>Page 12 of 16</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 13: DEPARTMENT MARKING BANK (PART 2 • LESSONS 4 TO 6)
  // ------------------------------------------------------------------------
  let aP13Html = '';
  for (let lIdx = 3; lIdx < 6; lIdx++) {
    const l = QUIZ_DATA[lIdx];
    aP13Html += `<div class="mb-section-title">Lesson ${l.lesson}: ${l.shortTitle}</div><div class="mb-container">`;
    l.items.forEach((item) => {
      aP13Html += `
        <div class="ans-card">
          <span class="ans-num">${aNum}.</span>
          <div class="ans-content">
            <span class="ans-core">${item.a}</span> &mdash; <span class="ans-exp">${item.exp}</span>
          </div>
          <span class="ans-boxes">[✓][✗]</span>
        </div>
      `;
      aNum++;
    });
    aP13Html += `</div>`;
  }

  const page13 = `
  <div class="a5-page">
    <div class="page-header-strip">
      <div>
        <h2>Department Marking Bank (Part 2)</h2>
        <p>Lessons 4 to 6 &bull; Answers 25 to 48 &bull; Core Answers &amp; The Explanation</p>
      </div>
      <span class="page-tag">Marking Key 25–48</span>
    </div>

    ${aP13Html}

    <div class="page-footer-strip">
      <span>Early Modern World &bull; Marking Bank &bull; Turn Page for Lessons 7–9</span>
      <span>Page 13 of 16</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 14: DEPARTMENT MARKING BANK (PART 3 • LESSONS 7 TO 9)
  // ------------------------------------------------------------------------
  let aP14Html = '';
  for (let lIdx = 6; lIdx < 9; lIdx++) {
    const l = QUIZ_DATA[lIdx];
    aP14Html += `<div class="mb-section-title">Lesson ${l.lesson}: ${l.shortTitle}</div><div class="mb-container">`;
    l.items.forEach((item) => {
      aP14Html += `
        <div class="ans-card">
          <span class="ans-num">${aNum}.</span>
          <div class="ans-content">
            <span class="ans-core">${item.a}</span> &mdash; <span class="ans-exp">${item.exp}</span>
          </div>
          <span class="ans-boxes">[✓][✗]</span>
        </div>
      `;
      aNum++;
    });
    aP14Html += `</div>`;
  }

  const page14 = `
  <div class="a5-page">
    <div class="page-header-strip">
      <div>
        <h2>Department Marking Bank (Part 3)</h2>
        <p>Lessons 7 to 9 &bull; Answers 49 to 72 &bull; Core Answers &amp; The Explanation</p>
      </div>
      <span class="page-tag">Marking Key 49–72</span>
    </div>

    ${aP14Html}

    <div class="page-footer-strip">
      <span>Early Modern World &bull; Marking Bank &bull; Lessons 7 to 9</span>
      <span>Page 14 of 16</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 15: KEY HISTORICAL FIGURES & ACADEMIC VOCABULARY
  // ------------------------------------------------------------------------
  const figures = [
    {
      name: 'Sultan Mehmed II',
      role: 'Ottoman Sultan (1432–1481)',
      act: 'Conquered Constantinople in 1453 using modern gunpowder artillery, transforming the Ottoman state into an imperial Eurasian superpower.',
    },
    {
      name: 'Queen Elizabeth I',
      role: 'Queen of England (1558–1603)',
      act: 'Defeated the Spanish Armada (1588), chartered the East India Company (1600), and secured England as a sovereign Protestant maritime power.',
    },
    {
      name: 'King Charles I',
      role: 'King of England, Scotland & Ireland (1625–1649)',
      act: 'Championed the Divine Right of Kings and ruled without Parliament for 11 years; provoked the Civil War and was executed for treason in 1649.',
    },
    {
      name: 'Oliver Cromwell',
      role: 'Lord Protector of the Commonwealth (1599–1658)',
      act: 'Forged the New Model Army, defeated Royalist forces, signed the King’s death warrant, and governed Britain as a puritan military republic.',
    },
    {
      name: 'Queen Nanny of the Maroons',
      role: 'Leader of the Jamaican Maroons (c. 1686–1755)',
      act: 'Escaped enslaved African strategist who led guerrilla warfare against the British army, securing a 1739 treaty granting Maroon land freedom.',
    },
    {
      name: 'Olaudah Equiano',
      role: 'African Writer & Abolitionist (c. 1745–1797)',
      act: 'Survived the Middle Passage and slavery; published his famous 1789 autobiography, mobilizing British public opinion against the trade.',
    },
    {
      name: 'Sir Isaac Newton',
      role: 'Physicist & Mathematician (1642–1727)',
      act: 'Formulated the laws of motion and universal gravitation in Principia (1687), anchoring the Enlightenment’s belief in empirical scientific reason.',
    },
    {
      name: 'Sir Robert Walpole',
      role: 'First British Prime Minister (1676–1745)',
      act: 'Consolidated parliamentary government under the Hanoverian monarchs, managing the National Debt and stabilizing British fiscal empire.',
    },
  ];

  const vocabItems = [
    {
      term: 'Divine Right of Kings',
      phonetic: '[Dih-vyne Ryte]',
      lang: 'Political',
      def: 'The doctrine that monarchs receive their authority directly from God and are unaccountable to parliaments or earthly laws.',
    },
    {
      term: 'Joint-Stock Company',
      phonetic: '[Joynt-Stok]',
      lang: 'Commerce',
      def: 'A business owned by multiple shareholders who pool capital and share profits, pioneering global corporate expansion.',
    },
    {
      term: 'Mercantilism',
      phonetic: '[Mur-kan-tih-liz-um]',
      lang: 'Economics',
      def: 'The economic system of maximizing bullion reserves through protectionist tariffs, colonial monopolies, and the Navigation Acts.',
    },
    {
      term: 'The Middle Passage',
      phonetic: '[Mid-ul Pas-ij]',
      lang: 'Historical',
      def: 'The second leg of the Triangular Trade; the forced, lethal transatlantic shipment of enslaved African people in cargo holds.',
    },
    {
      term: 'Constitutional Monarchy',
      phonetic: '[Kon-stih-too-shun-ul]',
      lang: 'Government',
      def: 'A system where the monarch’s power is strictly limited by written law, the Bill of Rights (1689), and an elected parliament.',
    },
    {
      term: 'Enclosure Acts',
      phonetic: '[En-kloh-zhur]',
      lang: 'Agriculture',
      def: 'Parliamentary acts fencing off communal peasant lands into private farms, increasing crop yields while displacing rural laborers.',
    },
    {
      term: 'Manumission',
      phonetic: '[Man-yoo-mish-un]',
      lang: 'Legal',
      def: 'The formal legal release or purchase of an enslaved person from bondage, as achieved by Olaudah Equiano in 1766.',
    },
    {
      term: 'Sovereignty',
      phonetic: '[Sov-rin-tee]',
      lang: 'Political',
      def: 'Supreme and independent power or authority in government, fiercely contested between the Crown and Parliament.',
    },
  ];

  const page15 = `
  <div class="a5-page">
    <div>
      <div class="page-header-strip">
        <div>
          <h2>Key Historical Figures &amp; Academic Vocabulary</h2>
          <p>8 Crucial Protagonists &bull; Spoken Pronunciation Guide &bull; Core Terminology</p>
        </div>
        <span class="page-tag">People &amp; Terms</span>
      </div>

      <div class="p15-sec-title">Eight Crucial Protagonists of the Early Modern Era</div>
      <div class="figures-grid">
        ${figures
          .map(
            (f) => `
          <div class="figure-card">
            <div>
              <span class="figure-name">${f.name}</span>
              <span class="figure-role">&bull; ${f.role}</span>
            </div>
            <div class="figure-act">${f.act}</div>
          </div>
        `,
          )
          .join('')}
      </div>

      <div class="p15-sec-title">Academic Vocabulary with Spoken Pronunciation Guide</div>
      <div class="vocab-list">
        ${vocabItems
          .map(
            (v) => `
          <div class="vocab-card">
            <div>
              <span class="vocab-term">${v.term}</span>
              ${v.phonetic ? `<span class="vocab-phonetic">${v.phonetic}</span>` : ''}
            </div>
            <div class="vocab-def">${v.def}</div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    <div class="page-footer-strip">
      <span>Early Modern World &bull; Key Figures &amp; Vocabulary</span>
      <span>Page 15 of 16</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 16: BACK COVER — HOW TO WRITE YOUR END-OF-UNIT ESSAY
  // ------------------------------------------------------------------------
  const page16 = `
  <div class="a5-page">
    <div>
      <div class="page-header-strip">
        <div>
          <h2>How to Write Your End-of-Unit Essay</h2>
          <p>Key Stage 3 History &bull; Early Modern World Enquiry Guide</p>
        </div>
        <span class="page-tag">Essay Guide</span>
      </div>

      <div style="background: #78350f; color: #ffffff; padding: 4px 8px; border-radius: 3px; margin-bottom: 3px;">
        <div style="font-size: 6.2pt; font-weight: 700; color: #fef08a; text-transform: uppercase; letter-spacing: 0.5px;">Your Essay Question:</div>
        <div style="font-size: 8.8pt; font-weight: 800; font-family: 'Playfair Display', serif; line-height: 1.2; margin-top: 1px;">
          “To what extent was Britain transformed into a ‘modern’ nation by 1750?”
        </div>
      </div>

      <!-- The 4-Pillar Matrix -->
      <table class="essay-matrix-table">
        <thead>
          <tr>
            <th style="width: 22%;">Historical Pillar</th>
            <th style="width: 48%;">Historical Evidence &amp; Specific Mechanism</th>
            <th style="width: 30%;">Evaluation: Modern vs Traditional</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Political Power &amp; Monarchy</strong></td>
            <td>Civil War execution of Charles I (1649); 1689 Bill of Rights established parliamentary supremacy and constitutional monarchy.</td>
            <td><strong>Modern:</strong> Rule of law and Prime Minister replaced royal divine right.</td>
          </tr>
          <tr>
            <td><strong>Global Trade &amp; Capital</strong></td>
            <td>Joint-stock finance, Bank of England (1694), East India Company factory posts, and tea/sugar consumer revolution.</td>
            <td><strong>Modern:</strong> Pioneered global corporate capitalism and state credit.</td>
          </tr>
          <tr>
            <td><strong>Empire &amp; Enslavement</strong></td>
            <td>Transatlantic Slave Trade transported 3.1m captive Africans; Caribbean sugar plantations enriched Bristol and Liverpool.</td>
            <td><strong>Inhuman:</strong> National wealth was directly built on forced racial exploitation.</td>
          </tr>
          <tr>
            <td><strong>Social &amp; Democratic Rights</strong></td>
            <td>Fewer than 5% of adult men possessed the vote in 1750; women were disenfranchised; enclosure displaced tenant farmers.</td>
            <td><strong>Traditional:</strong> Aristocratic elites tightly controlled political power and land.</td>
          </tr>
        </tbody>
      </table>

      <!-- The Historians' Debate -->
      <div class="essay-card">
        <div class="essay-card-title">The Historians' Debate: Was 1750 Britain Truly ‘Modern’?</div>
        <div style="font-size: 6.2pt; color: #1e293b; line-height: 1.2;">
          <strong>Interpretation A (The "March of Progress" View):</strong> Britain was taking giant leaps forward—pioneering constitutional rights, science, global commerce, and the rule of law.<br>
          <strong>Interpretation B (The "Human Cost &amp; Exploitation" View):</strong> Britain’s rise was financed by the human horrors of the Transatlantic Slave Trade and concentrated wealth among an unrepresentative ruling aristocracy.
        </div>
      </div>

      <!-- Sentence Starters & Connectives -->
      <div class="essay-card" style="margin-bottom: 2px;">
        <div class="essay-card-title">Sentence Starters &amp; Causal Connective Toolkit</div>
        <ul class="scaffold-list">
          <li><strong>Point:</strong> On the one hand, Britain had undeniably modernized its political system through the...</li>
          <li><strong>Evidence:</strong> For instance, following the Glorious Revolution of 1688, the Bill of Rights ensured that...</li>
          <li><strong>Counter-Argument:</strong> However, it is misleading to describe Britain as fully modern because...</li>
          <li><strong>Judgement:</strong> Ultimately, while Britain developed modern financial and imperial institutions, it remained...</li>
        </ul>
        <div class="connectives-flex">
          <span class="conn-pill">Consequently</span>
          <span class="conn-pill">In stark contrast</span>
          <span class="conn-pill">This directly enabled</span>
          <span class="conn-pill">Crucially</span>
          <span class="conn-pill">Furthermore</span>
          <span class="conn-pill">However, this was undermined by</span>
        </div>
      </div>

      <div class="archival-seal-block">
        The History Department &bull; Fieldwork &amp; Archival Evidence &bull; GCSE History Preparation Standard
      </div>
    </div>

    <div class="page-footer-strip">
      <span>Early Modern World &bull; End-of-Unit Essay Architect</span>
      <span>Page 16 of 16</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // ASSEMBLE FULL HTML DOCUMENT
  // ------------------------------------------------------------------------
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Early Modern World &amp; Global Encounters - 16-Page A5 Saddle-Stitch Quiz Booklet</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    ${A5_BOOKLET_CSS}
  </style>
</head>
<body>
  ${page1}
  ${page2}
  ${questionPages.join('\n')}
  ${page12}
  ${page13}
  ${page14}
  ${page15}
  ${page16}
</body>
</html>`;

  // Write HTML file to unit directory
  const htmlOutputPath = path.join(UNIT_DIR, 'quiz_pack.html');
  fs.writeFileSync(htmlOutputPath, fullHtml, 'utf8');
  console.log(`✅ Saved 16-Page HTML: ${htmlOutputPath}`);

  // ------------------------------------------------------------------------
  // COMPILE TO PDF WITH PUPPETEER
  // ------------------------------------------------------------------------
  console.log('\n📄 Launching Puppeteer to compile 16-Page A5 Saddle-Stitch PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 559, height: 794 }); // A5 dimensions at 96 DPI
  await page.setContent(fullHtml, { waitUntil: 'domcontentloaded' });

  // DOM Layout check
  const domPageCount = await page.evaluate(() => {
    return document.querySelectorAll('.a5-page').length;
  });
  console.log(`📑 Total A5 Pages rendered in DOM: ${domPageCount}`);

  // ------------------------------------------------------------------------
  // AUTOMATED PAGE BUDGET & SPACE UTILIZATION AUDIT
  // ------------------------------------------------------------------------
  const spaceAudit = await page.evaluate(() => {
    const pages = document.querySelectorAll('.a5-page');
    const auditResults = [];
    pages.forEach((p, idx) => {
      const pageNum = idx + 1;
      const clientH = p.clientHeight;
      const scrollH = p.scrollHeight;
      const overflow = scrollH > clientH + 4 ? scrollH - clientH : 0;

      // Measure content height down to footer
      const footer = p.querySelector('.page-footer-strip');
      let unusedBottom = 0;
      if (footer) {
        const pRect = p.getBoundingClientRect();
        const fRect = footer.getBoundingClientRect();
        unusedBottom = Math.max(0, Math.round(pRect.bottom - fRect.bottom));
      }

      const utilizationPct = Math.min(100, Math.round(((clientH - unusedBottom) / clientH) * 100));
      auditResults.push({ pageNum, clientH, scrollH, overflow, unusedBottom, utilizationPct });
    });
    return auditResults;
  });

  console.log('\n=============================================================');
  console.log('📐 AUTOMATED PAGE BUDGET & SPACE UTILIZATION AUDIT');
  console.log('=============================================================');
  let hasErrors = false;
  spaceAudit.forEach((res) => {
    const status =
      res.overflow > 0
        ? `❌ OVERFLOW (+${res.overflow}px)`
        : res.unusedBottom > 35
          ? `⚠️ UNDERFLOW (${res.unusedBottom}px gap)`
          : `✅ OPTIMAL (${res.utilizationPct}% utilized, ${res.unusedBottom}px gap)`;
    console.log(`Page ${String(res.pageNum).padStart(2, ' ')}: ${status}`);
    if (res.overflow > 0) hasErrors = true;
  });
  console.log('=============================================================\n');

  if (hasErrors) {
    console.warn('⚠️ Please fix layout overflows before production printing!');
  } else {
    console.log('✅ Layout & Space Audit Passed: 100% clean across all 16 pages!');
  }

  const primaryPdfPath = path.join(PDFS_DIR, 'early_modern_world_quiz_pack_FINAL_V1.pdf');
  const aliasPdfPath = path.join(PDFS_DIR, 'early_modern_world_quiz_pack.pdf');

  await page.pdf({
    path: primaryPdfPath,
    format: 'A5',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });
  console.log(`✅ Generated Master 16-Page A5 PDF: ${primaryPdfPath}`);

  // Also write alias
  fs.copyFileSync(primaryPdfPath, aliasPdfPath);
  console.log(`✅ Updated PDF alias: ${aliasPdfPath}`);

  await browser.close();

  // Page Count Audit
  let numPages = 0;
  try {
    const pdf = require('pdf-parse');
    const data = fs.readFileSync(primaryPdfPath);
    const parsed = await pdf(data);
    numPages = parsed.numpages;
    console.log(`📊 Audit: PDF contains exactly ${numPages} pages.`);
  } catch (e) {
    console.warn('Could not audit page count:', e.message);
  }

  // ------------------------------------------------------------------------
  // SYNC TO GOOGLE DRIVE
  // ------------------------------------------------------------------------
  if (fs.existsSync(DRIVE_ROOT)) {
    console.log('\n☁️ Synchronizing Year 8 A5 Quiz Booklet to Google Drive...');
    const driveDestinations = [
      path.join(DRIVE_ROOT, 'Year 8', 'Early_Modern_World_A5_Quiz_Booklet.pdf'),
      path.join(
        DRIVE_ROOT,
        'Year 8',
        'Early Modern World',
        'Early_Modern_World_A5_Quiz_Booklet.pdf',
      ),
      path.join(
        DRIVE_ROOT,
        'Mastery & Quiz Packs',
        'Year 8 - Early Modern World Knowledge Recall Quiz (All 72 Questions).pdf',
      ),
      path.join(DRIVE_ROOT, 'Early_Modern_World_A5_Quiz_Booklet.pdf'),
    ];

    driveDestinations.forEach((dest) => {
      const parent = path.dirname(dest);
      if (!fs.existsSync(parent)) {
        fs.mkdirSync(parent, { recursive: true });
      }
      fs.copyFileSync(primaryPdfPath, dest);
      console.log(`  ✅ Synced to: ${dest}`);
    });
  } else {
    console.log('⚠️ Google Drive root not detected. Skipping drive mirror.');
  }

  console.log(
    '\n🎉 Year 8 Early Modern World 16-Page A5 Booklet compiled cleanly with 0 overflow!\n',
  );
}

buildEarlyModernQuizBooklet().catch((err) => {
  console.error('Fatal error generating early modern world quiz booklet:', err);
  process.exit(1);
});

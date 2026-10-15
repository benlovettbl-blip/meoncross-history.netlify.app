const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.resolve(__dirname, '..');

function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
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

function generateQrSvg(url) {
  const qr = QRCode.create(url, { margin: 1 });
  const size = qr.modules.size;
  const data = qr.modules.data;
  let pathD = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (data[r * size + c]) {
        pathD += `M${c},${r}h1v1h-1z `;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#000000" d="${pathD.trim()}"/></svg>`;
}

// ============================================================================
// 5 Dedicated The First British Empire Enquiry Configurations
// Gold-Standard Christine Counsell 5-Act Decimal Standard
// ============================================================================
const enquiryConfigs = [
  {
    lessonNum: 1,
    id: 'lesson_1',
    title: 'Enquiry 1: The East India Company & Mughal Bengal (1600–1757)',
    enquiryQuestion:
      'How did a private chartered trading company seize sovereign military control of Bengal?',
    specAnchor:
      'Royal Charter (1600); Mughal factory trading posts; Battle of Plassey (1757); Treaty of Allahabad & the Diwani (1765).',
    stages: [
      {
        step: 1,
        paraRef: '[1.1]',
        date: '1600–1615',
        questionHeading: 'Why did Queen Elizabeth I grant a royal monopoly charter?',
        bullets: ['218 London Merchants', 'Pepper & Cotton Cargo', 'Private Trade Profits'],
        focusClue:
          'How did private capital combine with royal prerogative to create a commercial monopoly?',
      },
      {
        step: 2,
        paraRef: '[1.2]',
        date: '1615–1700',
        questionHeading: 'How did the Company establish fortified coastal factories in India?',
        bullets: ['Emperor Jahangir', 'Surat, Madras, Calcutta', 'Armed Sepoy Garrisons'],
        focusClue:
          'Why did Mughal emperors permit foreign merchants to build armed trading warehouses?',
      },
      {
        step: 3,
        paraRef: '[1.3]',
        date: '1756',
        questionHeading: 'Why did tensions erupt into crisis with Nawab Siraj ud-Daulah?',
        bullets: ['Mounting Heavy Cannons', 'Siege of Fort William', 'The Black Hole Dungeon'],
        focusClue:
          'Why did the Company’s unauthorised military expansion provoke the ruler of Bengal?',
      },
      {
        step: 4,
        paraRef: '[1.4]',
        date: 'June 1757',
        questionHeading: 'How did Robert Clive achieve victory at the Battle of Plassey?',
        bullets: ['Secret Gold Bribes', 'Heavy Monsoon Downpour', 'Mir Jafar’s Treason'],
        focusClue:
          'Was Plassey won by superior military power or political betrayal and dry powder?',
      },
      {
        step: 5,
        paraRef: '[1.5]',
        date: '1765–1770',
        questionHeading: 'How did the 1765 Diwani transform a company into a sovereign ruler?',
        bullets: ['Emperor Shah Alam II', 'Collecting Land Revenue', '1770 Bengal Famine'],
        focusClue:
          'What happened when a profit-seeking corporation gained the power to tax 20 million people?',
      },
    ],
    vocabPrompt:
      'Define the <strong>Diwani (1765)</strong> and explain how it fundamentally altered the East India Company’s authority in India:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      examStem:
        'Explain why the East India Company was able to expand its territorial control across Bengal and India between 1600 and 1765. [12 marks]',
      stimulus: [
        'Royal charters granting trade monopolies and company private armies',
        'The grant of the Diwani (1765) by Mughal Emperor Shah Alam II',
      ],
      connectives:
        'A primary reason for this development was that... &bull; In particular, a decisive factor was... &bull; Furthermore, military events demonstrated that... &bull; Crucially, an important turning point occurred when... &bull; Consequently, this resulted in...',
      wordBank:
        'East India Company &bull; Robert Clive &bull; Battle of Plassey (1757) &bull; Diwani (1765) &bull; Shah Alam II &bull; Bengal &bull; private army &bull; corporate monopoly &bull; tax extraction',
      timelineMissionTitle: 'Centrefold Sketch Challenges 1 &amp; 2',
      timelineMission:
        '<strong>Milestone 1 (The Leadenhall Merchant Ship &bull; 1600):</strong> Sketch an East Indiaman merchant sailing ship flying the company flag, laden with pepper sacks and cinnamon bales [⛵ tall ship &bull; 📜 royal charter &bull; 🌶️ spice sacks].<br style="display:block; margin-top:2px;"><strong>Milestone 2 (The Imperial Handoff &bull; 1765):</strong> Sketch Mughal Emperor Shah Alam II on his raised dais handing the legal scroll of the Diwani to Robert Clive [👑 imperial throne &bull; 📜 tax scroll &bull; 💂 scarlet officer].',
    },
    leftPageQuip:
      'In 1600, the East India Company had one clerk; by 1770, it commanded an army twice the size of Britain’s.',
    rightPageQuip:
      'Robert Clive arrived in India as a suicidal teenage clerk and returned with a £300,000 private fortune.',
  },
  {
    lessonNum: 2,
    id: 'lesson_2',
    title: 'Enquiry 2: The Transatlantic Slave Trade & The Middle Passage (1619–1807)',
    enquiryQuestion: 'What were the economic mechanics and human horrors of the Triangular Trade?',
    specAnchor:
      'Triangular Trade; Middle Passage; Royal African Company; Zong massacre (1781); Brookes diagram (1788); Olaudah Equiano.',
    stages: [
      {
        step: 1,
        paraRef: '[2.1]',
        date: '1619–1672',
        questionHeading: 'How did the Triangular Trade connect Britain, Africa, and the Americas?',
        bullets: [
          'Manufactured Guns & Brass',
          'Kidnapped African Captives',
          'Raw Plantation Sugar',
        ],
        focusClue:
          'How did British ports like Bristol and Liverpool grow immensely wealthy from the slave trade?',
      },
      {
        step: 2,
        paraRef: '[2.2]',
        date: '1672–1713',
        questionHeading: 'How did royal monopolies and the Asiento expand British slaving?',
        bullets: ['Royal African Company', 'Branded Hot Iron RAC', 'Spanish Asiento Contract'],
        focusClue:
          'Why did the British Crown treat the trade in human beings as a core national economic asset?',
      },
      {
        step: 3,
        paraRef: '[2.3]',
        date: '1713–1781',
        questionHeading:
          'What forensic conditions characterised the horrors of the Middle Passage?',
        bullets: [
          'Chained on Wooden Shelves',
          'Iron Shackles & Collars',
          'Deadly Dysentery & Fevers',
        ],
        focusClue:
          'Why did slave ship captains treat enslaved human beings as literal inanimate cargo?',
      },
      {
        step: 4,
        paraRef: '[2.4]',
        date: '1781',
        questionHeading:
          'How did the Zong massacre expose the dehumanising logic of chattel slavery?',
        bullets: ['Captain Luke Collingwood', '133 Thrown Overboard', 'Fraudulent Insurance Claim'],
        focusClue:
          'Why was the Zong case fought in London courts as an insurance claim rather than a murder trial?',
      },
      {
        step: 5,
        paraRef: '[2.5]',
        date: '1788–1807',
        questionHeading: 'How did the Brookes diagram and Equiano’s voice ignite abolitionism?',
        bullets: ['Brookes Ship Diagram', 'Equiano’s Bestselling Book', 'Abolition Act of 1807'],
        focusClue:
          'How did forensic architectural evidence and first-person African testimony change public opinion?',
      },
    ],
    vocabPrompt:
      'Define <strong>Chattel Slavery</strong> and contrast it with other historical forms of servitude:',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 1: Describe Two Features [4 marks &bull; 5 mins]',
        badge: 'FEATURE DRILL',
        question:
          'Describe two features of conditions endured by enslaved Africans during the Middle Passage. [4 marks]',
        stems:
          'Feature 1: One key feature was... &bull; Detail: Specifically, on slave ships captives were... &bull; Feature 2: A second key feature was... &bull; Detail: This caused horrific suffering because...',
      },
      partB: {
        tariff: 'Question 2: Explain One Consequence [4 marks &bull; 5 mins]',
        badge: 'STRUCTURED WRITING',
        question:
          'Explain one consequence of the Zong massacre (1781) for the British abolitionist movement. [4 marks]',
        hint: 'Focus on how legal evidence from the trial influenced public debate and aided the campaign against the trade.',
        stems:
          'One consequence was that... &bull; Specifically, this event revealed... &bull; This galvanised abolitionists because...',
        connectives:
          'A significant consequence was that... &bull; For instance, evidence demonstrated that... &bull; Furthermore, this led directly to... &bull; Consequently, public opinion...',
        wordBank:
          'Zong massacre (1781) &bull; Captain Collingwood &bull; Granville Sharp &bull; Gregson v Gilbert &bull; human cargo &bull; insurance fraud &bull; abolitionist movement',
      },
      timelineMissionTitle: 'Centrefold Sketch Challenge 3',
      timelineMission:
        '<strong>Milestone 3 (The Forensic Ship Plan &bull; 1788):</strong> Sketch the famous cross-section of the slave ship Brookes with lines of figures lying tightly packed on wooden shelves [📐 architectural ruler &bull; 🚢 ship cross-section &bull; ⛓️ iron leg shackles].',
    },
    leftPageQuip:
      'The slave ship Brookes carried 454 people under legal regulation—and 609 when unregulated.',
    rightPageQuip:
      'In 1781, British courts debated the Zong massacre not as mass murder, but as an unpaid insurance claim.',
  },
  {
    lessonNum: 3,
    id: 'lesson_3',
    title: 'Enquiry 3: Plantation Reality, Queen Nanny & Maroon Resistance (1655–1740)',
    enquiryQuestion: 'How did enslaved Africans actively resist colonial bondage in the Caribbean?',
    specAnchor:
      'Cromwell’s conquest of Jamaica (1655); sugar cane monoculture; gang system; everyday resistance; Queen Nanny & Maroons (1739 Treaty).',
    stages: [
      {
        step: 1,
        paraRef: '[3.1]',
        date: '1655',
        questionHeading: 'How did Cromwell’s conquest of Jamaica birth the Maroon communities?',
        bullets: ['Western Design Invasion', 'Escaping to Rainforests', 'Blue Mountain Fortresses'],
        focusClue:
          'How did the rugged geography of Jamaica allow self-liberated Africans to establish free societies?',
      },
      {
        step: 2,
        paraRef: '[3.2]',
        date: '1670–1730',
        questionHeading: 'Why was sugar cultivation described as an agro-industrial death machine?',
        bullets: ['Iron Crushing Rollers', 'Overseer Cowhide Whips', 'Exhaustion & Brutality'],
        focusClue:
          'Why did Caribbean sugar planters find it cheaper to work enslaved people to death than sustain them?',
      },
      {
        step: 3,
        paraRef: '[3.3]',
        date: '1680–1720',
        questionHeading:
          'How did enslaved labourers engage in daily sabotage and cultural survival?',
        bullets: ['Breaking Tool Handles', 'Feigning Sudden Sickness', 'Anansi Trickster Tales'],
        focusClue:
          'Why were cultural practices and secret spiritual ceremonies powerful forms of resistance?',
      },
      {
        step: 4,
        paraRef: '[3.4]',
        date: '1720–1734',
        questionHeading: 'How did Queen Nanny lead the Windward Maroons to military victory?',
        bullets: ['Living Branch Camouflage', 'Sounding the Abeng Horn', 'Guerilla Ambush Tactics'],
        focusClue:
          'How did camouflage and knowledge of mountain terrain neutralise British regular army firepower?',
      },
      {
        step: 5,
        paraRef: '[3.5]',
        date: '1739–1740',
        questionHeading: 'Why was the 1739 Peace Treaty both a triumph and a painful compromise?',
        bullets: [
          '1,500 Sovereign Acres',
          'British Truce White Flag',
          'Returning Enslaved Fugitives',
        ],
        focusClue:
          'Did the 1739 Treaty represent sovereign victory, or a tragic bargain with the colonial slave state?',
      },
    ],
    vocabPrompt:
      'Define <strong>Maroon Sovereignty</strong> and explain how Jamaican Maroons secured independence from the British Crown:',
    rightPage: {
      type: 'interpretations',
      tariff: 'Question 3(b) & 3(c): Contrasting Interpretations [8 marks &bull; 10 mins]',
      interpretation1: {
        author: 'Planter Edward Long, History of Jamaica (1774)',
        text: '“The plantation negroes are naturally indolent and require the perpetual surveillance and discipline of the driver’s whip to extract labour. Without European mastery, order would instantly dissolve into ruin.”',
      },
      interpretation2: {
        author: 'Historian Hilary Beckles, Caribbean Freedom (2004)',
        text: '“Enslaved Africans waged an unrelenting war of resistance through daily sabotage, spiritual preservation, and armed guerrilla struggle. Queen Nanny proved that African military strategy could humble the British imperial army.”',
      },
      questionB:
        'Explain how Interpretations 1 and 2 differ on the nature of enslaved African resistance. [4 marks]',
      stemsB:
        'Interpretations 1 and 2 differ on... &bull; Interpretation 1 argues that... &bull; In contrast, Interpretation 2 suggests that... &bull; This is a difference because...',
      questionC:
        'Suggest one reason why Interpretations 1 and 2 differ on the reality of plantation control. [4 marks]',
      stemsC:
        'One reason why Interpretations 1 and 2 differ is because they have a different focus... &bull; Specifically, Interpretation 1 focuses primarily on... &bull; In contrast, Interpretation 2 focuses more on... &bull; As a result, the authors reach different conclusions because...',
      timelineMissionTitle: 'Centrefold Sketch Challenge 4',
      timelineMission:
        '<strong>Milestone 4 (The Abeng in the Blue Mountains &bull; 1739):</strong> Sketch Queen Nanny of the Maroons on a high mountain crag sounding the curved cow-horn abeng, while camouflaged warriors observe advancing British soldiers [📯 curved cow horn &bull; 🌿 leafy camouflage &bull; ⛰️ rugged Blue Mountain peak].',
    },
    leftPageQuip:
      'Queen Nanny’s warriors used tree branches as camouflage so well that redcoats thought the forest was attacking them.',
    rightPageQuip:
      'In 1739, after spending £250,000 failing to defeat the Maroons, the British governor sent a white flag to negotiate peace.',
  },
  {
    lessonNum: 4,
    id: 'lesson_4',
    title:
      'Enquiry 4: The Thirteen Colonies, The Proclamation of 1763 & The Boston Tea Party (1763–1773)',
    enquiryQuestion:
      'Why did imperial taxation drive American colonists from loyal British subjects to open rebellion?',
    specAnchor:
      'Seven Years’ War debt; Proclamation Line of 1763; Stamp Act (1765); Boston Massacre (1770); Tea Act & Boston Tea Party (1773).',
    stages: [
      {
        step: 1,
        paraRef: '[4.1]',
        date: '1763',
        questionHeading:
          'Why did British victory in the Seven Years’ War create imperial conflict?',
        bullets: [
          '£133m Imperial War Debt',
          'Proclamation Line of 1763',
          'Standing Army Quartering',
        ],
        focusClue:
          'Why did banning westward settlement across the Appalachians outrage colonial frontiersmen?',
      },
      {
        step: 2,
        paraRef: '[4.2]',
        date: '1765–1766',
        questionHeading:
          'Why did the Stamp Act provoke the cry "No taxation without representation"?',
        bullets: [
          'Taxing Legal Documents',
          'Attacking Stamp Collectors',
          'Colonial Import Boycotts',
        ],
        focusClue:
          'How did colonists invoke the 1689 Bill of Rights to argue that Parliament had exceeded its authority?',
      },
      {
        step: 3,
        paraRef: '[4.3]',
        date: 'March 1770',
        questionHeading: 'How was the Boston Massacre transformed into revolutionary propaganda?',
        bullets: ['Snowballs, Ice & Oysters', 'Five Dead Colonists', 'Paul Revere’s Engraving'],
        focusClue:
          'How did Paul Revere’s engraving turn a chaotic, violent mob brawl into an orderly execution?',
      },
      {
        step: 4,
        paraRef: '[4.4]',
        date: 'May 1773',
        questionHeading:
          'Why did the 1773 Tea Act provoke outrage even though it lowered tea prices?',
        bullets: [
          '18m Pounds Surplus Tea',
          'East India Company Monopoly',
          'Bypassing Local Merchants',
        ],
        focusClue:
          'Why did colonial merchants fear that a monopoly on tea would lead to monopolies on all trade?',
      },
      {
        step: 5,
        paraRef: '[4.5]',
        date: 'Dec 1773',
        questionHeading:
          'How did the Boston Tea Party shatter relations between Britain and America?',
        bullets: ['Sons of Liberty Mohawks', '342 Chests Smashed Open', 'Punitive Coercive Acts'],
        focusClue:
          'Why did King George III declare that "the die is cast" and the colonies must submit or face war?',
      },
    ],
    vocabPrompt:
      'Define <strong>No Taxation Without Representation</strong> and explain its constitutional roots in English history:',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 2: Narrative Account [8 marks &bull; 10 mins]',
        question:
          'Write a narrative account analysing the key events leading from the Stamp Act (1765) to the Boston Tea Party (1773). [8 marks]',
        stimulus: ['The Stamp Act protests (1765)', 'The Boston Massacre (1770)'],
        structureStrip: [
          {
            col: '1. INITIAL OPPOSITION',
            text: 'Explain how colonists first protested new parliamentary duties and the collective pressure they applied.',
          },
          {
            col: '2. VIOLENCE & ESCALATION',
            text: 'Explain how military presence in the town led to confrontation and how this was represented to the public.',
          },
          {
            col: '3. DIRECT RESISTANCE',
            text: 'Explain how commercial intervention prompted organised physical retaliation in the port.',
          },
        ],
        connectives:
          'The sequence began when... &bull; This produced immediate opposition because... &bull; Tensions escalated further when... &bull; A decisive turning point occurred when... &bull; As a direct result...',
        wordBank:
          'Stamp Act (1765) &bull; Sons of Liberty &bull; boycotts &bull; Townshend Acts &bull; Boston Massacre (1770) &bull; Paul Revere &bull; East India Company &bull; Tea Act (1773) &bull; 342 chests &bull; Coercive Acts',
      },
      partB: {
        tariff: 'Question 3: Explain Importance [8 marks &bull; 10 mins]',
        question:
          'Explain the importance of the Boston Tea Party (1773) for relations between Britain and the American colonies. [8 marks]',
        structureStrip: [
          {
            col: '1. RETALIATORY LAWS',
            text: 'Explain the punitive measures enacted by the British authorities in response to the disturbance.',
          },
          {
            col: '2. INTER-COLONIAL ALLIANCE',
            text: 'Explain how these punishments altered cooperation and solidarity across the other colonies.',
          },
        ],
        connectives:
          'The primary importance was that... &bull; In response, imperial authorities decided to... &bull; Crucially, this had the effect of... &bull; Consequently, relations deteriorated because...',
        wordBank:
          'Boston Tea Party &bull; King George III &bull; Coercive Acts (Intolerable Acts) &bull; Boston Harbour &bull; General Gage &bull; Continental Congress',
      },
      timelineMissionTitle: 'Centrefold Sketch Challenges 5 &amp; 6',
      timelineMission:
        '<strong>Milestone 5 (The Stamp Act Effigy &bull; 1765):</strong> Sketch Boston colonists hanging a straw dummy of the royal stamp tax collector from the Liberty Tree with a banner reading ‘No Taxation Without Representation!’ [🌳 Liberty Tree &bull; 🪢 hanging effigy &bull; 📜 protest banner].<br style="display:block; margin-top:2px;"><strong>Milestone 6 (The Boston Tea Splash &bull; 1773):</strong> Sketch Sons of Liberty in Mohawk headdresses breaking open a wooden tea crate with a tomahawk and spilling leaves into the icy water of Griffin’s Wharf [🪓 tomahawk axe &bull; 📦 tea crate &bull; 🌊 splashing harbour].',
    },
    leftPageQuip:
      'Colonists were so careful during the Boston Tea Party that they swept the deck clean and replaced a broken padlock.',
    rightPageQuip:
      'King George III called the Tea Party ‘flagrant rebellion’; American patriots called it defending English liberties.',
  },
  {
    lessonNum: 5,
    id: 'lesson_5',
    title: 'Enquiry 5: The American Revolution, 1776 Declaration & The Black Loyalists (1775–1783)',
    enquiryQuestion:
      'How did the ideals of the 1776 Revolution contrast with the reality of slavery and imperial defeat?',
    specAnchor:
      'Lexington & Concord (1775); Declaration of Independence (1776); Lord Dunmore’s Proclamation; Battle of Yorktown (1781); Black Loyalists & Treaty of Paris (1783).',
    stages: [
      {
        step: 1,
        paraRef: '[5.1]',
        date: '1775',
        questionHeading: 'How did Lexington, Concord, and Dunmore’s Proclamation start the war?',
        bullets: [
          'Paul Revere Midnight Alarm',
          'The Shot Heard Round the World',
          'Dunmore’s Freedom Offer',
        ],
        focusClue:
          'Why did Lord Dunmore’s offer of freedom to enslaved people strike terror into American rebel slaveholders?',
      },
      {
        step: 2,
        paraRef: '[5.2]',
        date: 'July 1776',
        questionHeading: 'What central moral paradox lay at the heart of the 1776 Declaration?',
        bullets: ['Jefferson’s Eagle Quill', 'All Men Created Equal', 'Slaveholder Signatories'],
        focusClue:
          'How did Dr Samuel Johnson expose the hypocrisy of slaveholders demanding liberty from King George?',
      },
      {
        step: 3,
        paraRef: '[5.3]',
        date: '1777–1780',
        questionHeading:
          'How did Saratoga and the French alliance turn the rebellion into a global war?',
        bullets: [
          'Defeating General Burgoyne',
          'King Louis XVI Warships',
          'Sugar Island Divergence',
        ],
        focusClue:
          'Why was Britain unable to concentrate its military forces solely in North America?',
      },
      {
        step: 4,
        paraRef: '[5.4]',
        date: 'October 1781',
        questionHeading:
          'How did French naval power force General Cornwallis to surrender at Yorktown?',
        bullets: [
          'Cornwallis Peninsula Trap',
          'De Grasse Chesapeake Blockade',
          'The World Turned Upside Down',
        ],
        focusClue: 'Why was Cornwallis trapped, and how did French battleships decide the siege?',
      },
      {
        step: 5,
        paraRef: '[5.5]',
        date: '1783',
        questionHeading:
          'How did the Treaty of Paris and the Black Loyalists conclude the First Empire?',
        bullets: [
          'American Independence Treaty',
          'Book of Negroes Ledgers',
          'Nova Scotia Evacuation Ships',
        ],
        focusClue:
          'Why did British commanders honour their promise to evacuate Black Loyalists despite Washington’s demands?',
      },
    ],
    vocabPrompt:
      'Define <strong>The Black Loyalists</strong> and explain why thousands of enslaved Africans chose to fight for the British Crown:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 5: Evaluative Statement Essay [12 marks &bull; 15 mins]',
      examStem:
        '‘British defeat in the American Revolutionary War was caused primarily by French naval intervention rather than American military strength.’ How far do you agree? [12 marks]',
      stimulus: [
        'The Battle of Saratoga and the French Alliance (1777–1778)',
        'George Washington and the Continental Army at Valley Forge',
      ],
      structureStrip: [
        {
          col: '1. EXTERNAL INTERVENTION',
          text: 'Explain how international military and naval intervention affected Britain’s ability to conduct the war.',
        },
        {
          col: '2. COLONIAL CAMPAIGN',
          text: 'Explain how local military tactics, strategic leadership, and resilience sustained the conflict.',
        },
        {
          col: '3. COMPARATIVE VERDICT',
          text: 'Weigh which factor was more decisive in bringing about imperial surrender and the recognition of independence.',
        },
      ],
      connectives:
        'A compelling argument supporting this statement is that... &bull; In particular, naval factors were significant because... &bull; On the other hand, an alternative perspective is that... &bull; Crucially, ground campaigns demonstrated that... &bull; In conclusion, the decisive reason was... because...',
      wordBank:
        'George Washington &bull; Continental Army &bull; Saratoga (1777) &bull; French Alliance &bull; King Louis XVI &bull; Admiral de Grasse &bull; General Cornwallis &bull; Siege of Yorktown (1781) &bull; Treaty of Paris (1783)',
      timelineMissionTitle: 'Centrefold Sketch Challenges 7 &amp; 8',
      timelineMission:
        '<strong>Milestone 7 (The Liberty Quill &bull; 1776):</strong> Sketch Thomas Jefferson writing the Declaration of Independence with an eagle quill, while an enslaved servant attends his inkwell [🪶 quill pen &bull; 📜 Declaration parchment &bull; ⛓️ unbroken slave shackle].<br style="display:block; margin-top:2px;"><strong>Milestone 8 (The Evacuation to Nova Scotia &bull; 1783):</strong> Sketch a British naval frigate in New York harbour embarking Black Loyalist families carrying the Book of Negroes certificates of freedom [🚢 British frigate &bull; 📖 Book of Negroes &bull; 🕊️ dove of freedom].',
    },
    leftPageQuip:
      'Thomas Jefferson wrote ‘all men are created equal’ while personally owning over 170 enslaved people.',
    rightPageQuip:
      'When the British surrendered at Yorktown in 1781, their military band played ‘The World Turned Upside Down’.',
  },
];

function renderFooterStrip(pageNum, quip, totalPages = 16) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${quip}</span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;">${quip}</span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

// ============================================================================
// LEFT PAGE RENDERER: 5-STAGE CHRONOLOGICAL INQUIRY SPINE (PURE MONOCHROME)
// ============================================================================
function renderSpinePage(cfg, pageNum) {
  const stagesHtml = cfg.stages
    .map((st) => {
      // 3 Spaced-out trigger terms, each aligned 1-to-1 with pairs of ruled lines
      const bulletsHtml = st.bullets
        .map(
          (b, idx) => `
            <div style="flex: 1; display: flex; align-items: center; padding: 0 5px; ${idx < 2 ? 'border-bottom: 0.8px solid #000000;' : ''}">
              <div style="display: flex; align-items: flex-start; gap: 4px; line-height: 1.18;">
                <span style="font-weight: 900; color: #000000; font-size: 7pt; line-height: 1.3;">&bull;</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 800; color: #000000; word-break: break-word;">${b}</span>
              </div>
            </div>`,
        )
        .join('');
      return `
        <div class="spine-stage-block" style="display: flex; flex-direction: column; flex: 1; min-height: 0; margin-bottom: 2.5px; border: 1.2px solid #000000; border-radius: 2px; overflow: hidden; background: #ffffff;">
          
          <!-- Full-Width Banner with Key Question Across Page (Strict Single-Line Fit) -->
          <div class="stage-banner" style="background: #000000; color: #ffffff; padding: 2px 7px; display: flex; align-items: center; border-bottom: 1.2px solid #000000; min-height: 20px; box-sizing: border-box;">
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1; overflow: hidden;">
              <span style="background: #ffffff; color: #000000; font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; padding: 0.6px 6px; border-radius: 2px; white-space: nowrap; flex-shrink: 0;">
                ${st.step}
              </span>
              ${st.paraRef ? `<span style="background: #222222; color: #ffffff; border: 1px solid #ffffff; font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; white-space: nowrap; flex-shrink: 0;">${st.paraRef}</span>` : ''}
              <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 800; color: #ffffff; white-space: nowrap; flex-shrink: 0;">
                ${st.date}
              </span>
              <span style="color: #ffffff; font-size: 7.5pt; flex-shrink: 0;">&bull;</span>
              <span style="font-family: 'Inter', sans-serif; font-size: 9.2pt; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; letter-spacing: -0.1px;">
                ${st.questionHeading}
              </span>
            </div>
          </div>

          <!-- Content Row: Left 3-Zone Trigger Spine (44mm) & Right Ruled Writing Lines (~154mm) -->
          <div style="display: flex; flex: 1; min-height: 0; align-items: stretch;">
            
            <!-- Left Column: High-Visibility 44mm Trigger Spine (Pure White Canvas, Zero Grey Dithering) -->
            <div style="width: 44mm; flex-shrink: 0; background: #ffffff; display: flex; flex-direction: column; border-right: 1.2px solid #000000; box-sizing: border-box;">
              ${bulletsHtml}
            </div>

            <!-- Right Column: 6 Ruled Note-Taking Lines (Expanded Writing Space) -->
            <div style="flex: 1; display: flex; flex-direction: column; background: #ffffff; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
            </div>

          </div>
        </div>`;
    })
    .join('');

  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • CHRONOLOGICAL INQUIRY SPINE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header with Inquiry Question Title (Expanded for High Legibility) -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #000000; color: #ffffff; border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px;">
            ENQUIRY ${cfg.lessonNum} &bull; LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            YEAR 8 &bull; THE FIRST BRITISH EMPIRE (1600–1783)
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 13.0pt; color: #000000; margin: 2px 0 2px 0; font-weight: 900; line-height: 1.22;">
          ${cfg.enquiryQuestion}
        </h2>
      </div>

      <!-- Chronological Inquiry Spine & Note-Taking Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 1px;">
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.leftPageQuip, 16)}
    </div>
  </div>`;
}

// ============================================================================
// RIGHT PAGE RENDERER: ROTATING DISCIPLINARY SKILLS WRITING (MONOCHROME INTERIOR)
// ============================================================================
function renderRightPage(cfg, pageNum) {
  const rp = cfg.rightPage;
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  if (rp.type === 'single_12') {
    // 12-MARK CAUSAL / EVALUATIVE ESSAY WRITING (ENQUIRIES 1 AND 5)
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • 12-MARK EXTENDED ESSAY -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 12.0pt; color: #000000; margin: 0; font-weight: 900;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; padding: 2px 7px; border-radius: 2px;">
          Extended Writing Practice
        </span>
      </div>

      <!-- Question Stem & Stimulus Box -->
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 5px 9px; background: #ffffff; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 11.6pt; font-weight: 900; color: #000000; margin-bottom: 4px; line-height: 1.32;">
          ${rp.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 8.4pt; color: #000000;">
          <strong style="color: #000000;">Stimulus:</strong>
          <span style="border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.stimulus[0]}</span>
          <span style="border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.stimulus[1]}</span>
          <span style="font-style: italic; color: #000000;">(You must also use information of your own)</span>
        </div>
      </div>

      ${
        rp.structureStrip
          ? `
      <!-- Evaluative Structure Strip -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 5px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
        ${rp.structureStrip
          .map(
            (col) => `
          <div style="border-right: 1px solid #000000; padding-right: 4px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #000000;">${col.col}</div>
            <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.18; color: #000000; margin-top: 1px;">${col.text}</div>
          </div>`,
          )
          .join('')}
      </div>`
          : ''
      }

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 5px 9px; background: #ffffff; margin-bottom: 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 900; text-transform: uppercase; display: block; margin-bottom: 2px; color: #000000;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.6pt; font-style: italic; line-height: 1.28; display: block; color: #000000;">${rp.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 900; text-transform: uppercase; display: block; margin-bottom: 2px; color: #000000;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.6pt; line-height: 1.28; display: block; color: #000000;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Task Lines for Extended Writing (20 Lines • Calibrated ~9.4mm British Pitch) -->
      <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-style: italic; color: #000000; margin-bottom: 2px;">
        <strong style="color: #000000;">Task:</strong> Using the vocabulary and connectives above, write your analytical response below:
      </div>
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 4px; flex: 1; min-height: 0;">
        ${Array(20)
          .fill(
            '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>',
          )
          .join('')}
      </div>

      <!-- Timeline Mission Box -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 7px; background: #ffffff; margin-top: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #000000; padding-bottom: 1.5px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
            🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; color: #000000;">
            Turn to Centrefold &bull; Pages 8–9 &rarr;
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; line-height: 1.26;">
          ${rp.timelineMission}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  } else if (rp.type === 'interpretations') {
    // DUAL HISTORIOGRAPHICAL INTERPRETATIONS WRITING (ENQUIRY 3 - PAGE 7)
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • CONTRASTING INTERPRETATIONS -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11.4pt; color: #000000; margin: 0; font-weight: 900;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          HISTORIOGRAPHICAL ANALYSIS
        </span>
      </div>

      <!-- Competing Historical Interpretations Box -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 4px;">
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; color: #000000; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2px;">
            Interpretation 1 &bull; ${rp.interpretation1.author}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #000000; line-height: 1.22;">
            ${rp.interpretation1.text}
          </div>
        </div>
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; color: #000000; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2px;">
            Interpretation 2 &bull; ${rp.interpretation2.author}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #000000; line-height: 1.22;">
            ${rp.interpretation2.text}
          </div>
        </div>
      </div>

      <!-- Task B: Question 3(b) -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 900; color: #000000;">
            ${rp.questionB}
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            PART B
          </span>
        </div>
        ${rp.stemsB ? `<div style="border: 1px solid #000000; border-radius: 2px; padding: 2px 5px; background: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.2; margin-bottom: 2px;"><strong style="color: #000000;">Sentence Stems:</strong> <span style="color: #000000;">${rp.stemsB}</span></div>` : ''}
        <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0;">
          ${Array(12)
            .fill(
              '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>',
            )
            .join('')}
        </div>
      </div>

      <!-- Clean Separator -->
      <div style="border-top: 1.2px solid #000000; margin: 3px 0;"></div>

      <!-- Task C: Question 3(c) -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 900; color: #000000;">
            ${rp.questionC}
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            PART C
          </span>
        </div>
        ${rp.stemsC || rp.stems ? `<div style="border: 1px solid #000000; border-radius: 2px; padding: 2px 5px; background: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.2; margin-bottom: 2px;"><strong style="color: #000000;">Scaffolded Sentence Stems:</strong> <span style="color: #000000;">${rp.stemsC || rp.stems}</span></div>` : ''}
        <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0;">
          ${Array(12)
            .fill(
              '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>',
            )
            .join('')}
        </div>
      </div>

      <!-- Timeline Mission Box -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #000000; padding-bottom: 1.5px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
            🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
            Turn to Centrefold &bull; Pages 8–9 &rarr;
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #000000; line-height: 1.22;">
          ${rp.timelineMission}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  } else {
    // TWO-PART ROTATING SKILLS WRITING (SPLIT: PART A + PART B - ENQUIRIES 2 & 4)
    const partA = rp.partA || {};
    const partB = rp.partB || {};

    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • ROTATING DISCIPLINARY SKILLS -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- PART A: SHORT-FORM DISCIPLINARY PRACTICE [4 OR 8 MARKS] -->
      <div style="border-bottom: 1.5px solid #000000; padding-bottom: 4px; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 900;">
            ${partA.tariff || 'Question 1: Disciplinary Drill'}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 6px; border-radius: 2px; text-transform: uppercase;">
            ${partA.badge || 'DISCIPLINARY DRILL'}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 900; color: #000000; margin: 0 0 2px 0; line-height: 1.25;">
          ${partA.question || ''}
        </p>
        ${partA.hint ? `<div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 2px;">${partA.hint}</div>` : ''}
        ${partA.stems ? `<div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; margin-bottom: 2px; color: #000000;"><strong style="color: #000000;">Sentence Stems:</strong> ${partA.stems}</div>` : ''}
        ${partA.connectives ? `<div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.22; background: #ffffff; border: 1px solid #000000; padding: 2px 5px; border-radius: 2px; margin-bottom: 2px;"><strong style="color: #000000;">Connectives:</strong> ${partA.connectives}</div>` : ''}
        <div class="ruled-lines-block">
          <div class="task-line" style="height: 7.8mm;"></div>
          <div class="task-line" style="height: 7.8mm;"></div>
          <div class="task-line" style="height: 7.8mm;"></div>
          <div class="task-line" style="height: 7.8mm;"></div>
        </div>
      </div>

      <!-- PART B: EXTENDED SKILL WRITING [4, 8 OR 12 MARKS] -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 900;">
              ${partB.tariff || 'Question 2: Structured Writing'}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 6px; border-radius: 2px; text-transform: uppercase;">
              ${partB.badge || 'STRUCTURED WRITING'}
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 900; color: #000000; margin: 0 0 3px 0; line-height: 1.25;">
            ${partB.question || ''}
          </p>
          ${partB.hint ? `<div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 2px;">${partB.hint}</div>` : ''}
          ${
            partB.stimulus
              ? `
          <div style="display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000; margin-bottom: 3px;">
            <strong style="color: #000000;">Stimulus:</strong>
            <span style="border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${partB.stimulus[0]}</span>
            <span style="border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${partB.stimulus[1]}</span>
          </div>`
              : ''
          }

          <!-- Connectives & Word Bank (Single Clean Scaffolding) -->
          ${
            partB.connectives || partB.wordBank
              ? `
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 8.4pt; line-height: 1.26;">
            ${partB.connectives ? `<div><strong style="color: #000000;">Analytical Connectives:</strong> <em style="color: #000000;">${partB.connectives}</em></div>` : ''}
            ${partB.wordBank ? `<div style="margin-top: 2px;"><strong style="color: #000000;">Key Terms:</strong> <span style="color: #000000;">${partB.wordBank}</span></div>` : ''}
          </div>`
              : ''
          }
        </div>

        <!-- Ruled Writing Lines (18 Lines • Matching GCSE 7.8mm pitch) -->
        <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 4px; flex: 1; min-height: 0;">
          ${Array(18)
            .fill(
              '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>',
            )
            .join('')}
        </div>

        <!-- Timeline Mission Box -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #000000; padding-bottom: 1.5px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
              🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
              Turn to Centrefold &bull; Pages 8–9 &rarr;
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #000000; line-height: 1.22;">
            ${rp.timelineMission}
          </div>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  }
}

// Helper to render a dedicated Lined Notes Page with margin (Pages 14 & 15 of 16-page workbook)
function renderNotesPage(pageNum, quip) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  // 32 ruled lines for standard ~8mm pitch filling the page perfectly
  const numLines = 32;
  let linesHtml = '';
  for (let i = 0; i < numLines; i++) {
    linesHtml += `          <div class="note-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\n`;
  }

  return `
  <!-- PAGE ${pageNum}: NOTES PAGE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Notes Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 13pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Notes &bull; Revision &amp; Assessment Planning
        </h2>
      </div>

      <!-- Ruled Lined Canvas with Left Margin (Exercise Book Standard) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; position: relative; border-top: 1.2px solid #000000; margin-bottom: 4px;">
        <!-- Vertical Margin Line (26mm from left edge of lines) - British Exercise Book Red Margin -->
        <div style="position: absolute; top: 0; bottom: 0; left: 26mm; width: 1.5px; background: #dc2626; z-index: 2;"></div>
        
        <!-- Ruled Horizontal Lines (Standard 8mm school pitch, flex-filled) -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
${linesHtml}        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, 16)}
    </div>
  </div>`;
}

// ============================================================================
// MAIN COMPILATION FUNCTION
// ============================================================================
function compileEmpireWorkbook() {
  const coverImgBase64 =
    getBase64Image('images/robert_clive.jpg') ||
    getBase64Image('public/images/robert_clive.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The First British Empire (1600–1783) Pupil Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400&family=Georgia:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 10mm 10mm 12mm 10mm;
    }
    body {
      font-family: 'Georgia', serif;
      font-size: 8.5pt;
      line-height: 1.32;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    .page, .page-container {
      width: 100%;
      height: 272mm;
      max-height: 272mm;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 4mm 6mm;
      background: #ffffff;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    .task-section {
      margin-bottom: 5px;
      padding-bottom: 0;
    }
    .task-section-divider {
      border-bottom: 1.2px solid #000000;
      padding-bottom: 4px;
      margin-bottom: 5px;
    }
    .task-line {
      border-bottom: 1.2px solid #000000;
      height: 7.8mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 7.4mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }
    .ruled-lines-block {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin: 1px 0;
    }
    .lined-page-grid {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 2px 0 3px 0;
      border-top: 1.2px solid #000000;
    }
    .lined-row {
      display: flex;
      flex: 1;
      min-height: 0;
      border-bottom: 1.2px solid #000000;
      box-sizing: border-box;
    }
    .lined-margin-cell {
      width: 18mm;
      border-right: 1.2px solid #000000;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding-left: 1mm;
      padding-right: 0.5mm;
      box-sizing: border-box;
    }
    .lined-content-cell {
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 6px;
      box-sizing: border-box;
    }
    .page-footer-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 0.8px solid #000000;
      padding-top: 1.5px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      line-height: 1.15;
      color: #000000;
    }
    .footer-quip {
      font-style: italic;
      color: #000000;
      white-space: nowrap;
    }
    .footer-page-num {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      white-space: nowrap;
      color: #000000;
      font-size: 6.8pt;
      flex-shrink: 0;
    }
  </style>
</head>
<body>
`;

  // ====================================================================
  // PAGE 1: FRONT COVER (GCSE Medicine Style & High Contrast)
  // ====================================================================
  html += `
  <div class="page page-container recto-page" id="page-1" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding with Customizer Hook -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f284e; padding-bottom: 4px; margin-bottom: 8px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #0f284e; text-transform: uppercase; letter-spacing: 1px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; color: #0f284e;">
          KEY STAGE 3 HISTORICAL STUDIES &bull; YEAR 8
        </div>
      </div>

      <!-- Pupil Details Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 7px 14px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 9pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 16px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 9pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 16px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 9pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 16px;"></div>
        </div>
      </div>

      <!-- Main Title Block -->
      <div style="text-align: center; margin: 2px 0 6px 0;">
        <div style="display: inline-block; border: 1.5px solid #0f284e; color: #ffffff; background: #0f284e; font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; padding: 2.5px 12px; border-radius: 3px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
          Year 8 Enquiry &bull; 1600–1783
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 26pt; line-height: 1.15; color: #0f284e; margin: 2px 0 3px 0; font-weight: 900;">
          The First British Empire (1600–1783)
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 11pt; color: #334155; font-style: italic; font-weight: 600;">
          Chartered Trade, Transatlantic Slavery, Maroon Resistance &amp; The American Revolution
        </div>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Enlarged Clive Full Canvas in Authentic Color + Disciplinary Iconography Plate) -->
      <div style="margin: 2px 0 4px 0; border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="display: grid; grid-template-columns: 70mm 1fr; background: #ffffff;">
          <!-- Left: Full Visual Canvas in Rich Authentic Color (Enlarged Display) -->
          <div style="background: #fcfbf9; border-right: 1.5px solid #0f284e; display: flex; justify-content: center; align-items: center; padding: 2px 4px;">
            <img src="${coverImgBase64}" alt="Major-General Robert Clive Portrait by Nathaniel Dance-Holland" style="height: 118mm; width: auto; max-width: 100%; object-fit: contain; display: block; margin: 0 auto; border: 1.2px solid #0f284e; border-radius: 2px; box-shadow: 0 2px 6px rgba(15,40,78,0.22);">
          </div>
          <!-- Right: Visual Iconography & Historical Significance for Year 8 (Enlarged Typography) -->
          <div style="padding: 5px 10px; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff; box-sizing: border-box;">
            <!-- 1. Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; padding-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e; letter-spacing: 0.5px;">
                Primary Visual Evidence &bull; Corporate Imperial Statecraft
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; color: #64748b;">
                Nathaniel Dance-Holland (c. 1773)
              </span>
            </div>

            <!-- 2. Statecraft Context -->
            <p style="font-family: 'Georgia', serif; font-size: 7.9pt; line-height: 1.25; color: #1e293b; margin: 0;">
              Following the 1757 Battle of Plassey and the 1765 Treaty of Allahabad, the East India Company transitioned from a maritime trading outfit into a military ruler collecting taxes from 20 million Bengalis. Nathaniel Dance portrayed Robert Clive not as an administrator, but as an imperial general:
            </p>

            <!-- 3. Four Core Propaganda Features -->
            <div style="display: flex; flex-direction: column; gap: 2.5px;">
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #0f284e;">1. Stance of Imperial Authority:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.20; color: #222222;">
                  Clive stands resolute in scarlet regimental uniform, sword belt fastened, projecting military command over Indian sovereign territories.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #0f284e;">2. The Bengal Battlefield:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.20; color: #222222;">
                  In the background, sepoy infantry drill beneath smoke and battle pennants, symbolising the privatised corporate army that conquered Bengal.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #0f284e;">3. Royal &amp; Corporate Honours:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.20; color: #222222;">
                  Embroidered badges of the Order of the Bath honour Clive’s elevation to the peerage funded by astronomical private plunder ('jagirs').
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #0f284e;">4. The Obscured Reality:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.20; color: #222222;">
                  The painting glorifies military prestige while obscuring the horrific 1770 Bengal famine where corporate grain speculation devastated millions.
                </div>
              </div>
            </div>

            <!-- 4. Three-Pillar Propaganda Decoding Matrix -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; padding-top: 2px; border-top: 1px solid #cbd5e1;">
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Scarlet Coat</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.7pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Crown recognition of Company military conquest.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Drawn Sword</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.7pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Armed force as foundation of trade monopoly.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Bengal Plain</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.7pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Vast territorial wealth seized from Mughals.</div>
              </div>
            </div>

            <!-- 5. Disciplinary Significance Anchor -->
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e293b; line-height: 1.22; background: #f0f4f9; border-left: 2.5px solid #0f284e; padding: 2.5px 7px;">
              <strong style="text-transform: uppercase; color: #0f284e;">Disciplinary Significance:</strong> In 18th-century imperial expansion, portraiture transformed private corporate commanders into national martial heroes to justify unprecedented chartered monopolies to Parliament.
            </div>

            <!-- 6. Targeted Disciplinary Hinge Question -->
            <div style="background: #ffffff; border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 7px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Disciplinary Hinge Question:</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #64748b; text-transform: uppercase;">Historical Evaluation</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 7.3pt; font-style: italic; color: #1e293b; line-height: 1.20; margin-top: 1px;">
                Does this portrait portray Clive as an honourable servant of the British nation, or does it disguise a reckless corporate plunderer whose greed destabilised an entire subcontinent?
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #ffffff; padding: 3px 8px; border-top: 1.5px solid #0f284e; background: #0f284e;">
          <span><strong>Primary Visual Evidence:</strong> <em>Major-General Robert Clive, Baron Clive of Plassey</em> &bull; Nathaniel Dance-Holland (c. 1773)</span>
          <span style="font-weight: 700; color: #93c5fd; white-space: nowrap;">NATIONAL PORTRAIT GALLERY &bull; LONDON</span>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin: 3px 0 4px 0;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #0f284e; background: #0f284e;">
              <th style="padding: 6px 10px; text-align: left; font-size: 8.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid rgba(255,255,255,0.25); color: #ffffff;">
                Course Specification &bull; Key Enquiry Sequence
              </th>
              <th style="padding: 6px 4px; width: 64px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid rgba(255,255,255,0.25); color: #ffffff;">
                Learnt
              </th>
              <th style="padding: 6px 4px; width: 64px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #ffffff;">
                Revised
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 6.2px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.6pt; font-weight: 800; color: #0f284e; line-height: 1.20;">
                  Enquiry 1: The East India Company &amp; Mughal Bengal (1600–1757)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.18;">
                  How did a private chartered trading company seize sovereign military control of Bengal?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 6.2px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.6pt; font-weight: 800; color: #0f284e; line-height: 1.20;">
                  Enquiry 2: The Transatlantic Slave Trade &amp; The Middle Passage (1619–1807)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.18;">
                  What were the economic mechanics and human horrors of the Triangular Trade?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 6.2px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.6pt; font-weight: 800; color: #0f284e; line-height: 1.20;">
                  Enquiry 3: Plantation Reality, Queen Nanny &amp; Maroon Resistance (1655–1740)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.18;">
                  How did enslaved Africans actively resist colonial bondage in the Caribbean?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 6.2px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.6pt; font-weight: 800; color: #0f284e; line-height: 1.20;">
                  Enquiry 4: The Thirteen Colonies &amp; The Boston Tea Party (1763–1773)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.18;">
                  Why did imperial taxation drive American colonists from loyal British subjects to open rebellion?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding: 6.2px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.6pt; font-weight: 800; color: #0f284e; line-height: 1.20;">
                  Enquiry 5: The American Revolution &amp; Black Loyalists (1775–1783)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.18;">
                  How did colonial rebellion dismantle the First British Empire and reshape global liberty?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${renderFooterStrip(1, 'In 1600, the East India Company had one clerk; by 1770, it commanded an army twice the size of Britain’s.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: ENQUIRY 1 (EAST INDIA COMPANY & BENGAL)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[0], 2);
  html += renderRightPage(enquiryConfigs[0], 3);

  // ====================================================================
  // PAGES 4–5: ENQUIRY 2 (THE TRANSATLANTIC SLAVE TRADE)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[1], 4);
  html += renderRightPage(enquiryConfigs[1], 5);

  // ====================================================================
  // PAGES 6–7: ENQUIRY 3 (QUEEN NANNY & MAROON RESISTANCE)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[2], 6);
  html += renderRightPage(enquiryConfigs[2], 7);

  // ====================================================================
  // PAGES 8–9: THE LIVING TIMELINE IN THE EXACT PHYSICAL CENTREFOLD!
  // ====================================================================
  html += `
  <!-- PAGE 8: LIVING TIMELINE PART 1 (MILESTONES 1–4) -->
  <div class="page page-container verso-page" id="page-8" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.8pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 1: Trade Monopolies, Middle Passage &amp; Maroon Sovereignty (1600–1740)
          </h2>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 1: 1600 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1600 &bull; Queen Elizabeth I Grants Royal Charter to East India Company
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            218 London merchants secure an exclusive royal trade monopoly to import spices, silk, and cotton from the East Indies; private capital combines with sovereign royal authority.
          </p>
        </div>

        <!-- Milestone 2: 1672 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1672 &bull; Establishment of the Royal African Company
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Led by the Duke of York (later James II), the RAC ships more enslaved African men, women, and children across the Atlantic than any other single institution in world history.
          </p>
        </div>

        <!-- Milestone 3: 1739 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1739 &bull; Queen Nanny &amp; The Jamaican Maroon Peace Treaty
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Following decades of mountain guerrilla warfare, Governor Trelawny signs a treaty granting 1,500 sovereign acres and self-government to the Windward Maroons.
          </p>
        </div>

        <!-- Milestone 4: 1757 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1757 &bull; Robert Clive Wins the Battle of Plassey
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Clive conspires with Mir Jafar to overthrow Nawab Siraj ud-Daulah; dry gunpowder and political bribery deliver sovereign control of Bengal to a commercial corporation.
          </p>
        </div>

      </div>

      ${renderFooterStrip(8, 'Centrefold timeline: Dual-coding sketches and dates turns narrative history into permanent long-term memory.', 16)}
    </div>
  </div>

  <!-- PAGE 9: LIVING TIMELINE PART 2 (MILESTONES 5–8) -->
  <div class="page page-container recto-page" id="page-9" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.8pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 2: Taxation, The Boston Tea Party &amp; American Independence (1763–1783)
          </h2>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 5: 1765 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1765 &bull; The Stamp Act Crisis &bull; ‘No Taxation Without Representation’
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Parliament levies internal duties on colonial paper; Bostonians hang tax collectors in effigy from the Liberty Tree, invoking English constitutional rights to resist tyranny.
          </p>
        </div>

        <!-- Milestone 6: 1773 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1773 &bull; The Boston Tea Party &amp; Coercive Acts
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Disguised Sons of Liberty dump 342 chests of Company tea into Boston Harbour; Britain retaliates by closing the port and declaring military rule under General Gage.
          </p>
        </div>

        <!-- Milestone 7: 1776 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1776 &bull; Declaration of Independence &bull; The Moral Paradox
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Thomas Jefferson pens ‘all men are created equal’; Dr Samuel Johnson mocks slaveholders demanding liberty; Lord Dunmore offers freedom to enslaved recruits fighting for the Crown.
          </p>
        </div>

        <!-- Milestone 8: 1783 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1783 &bull; Treaty of Paris &amp; Evacuation of the Black Loyalists
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Britain acknowledges American independence; 3,000 Black Loyalists registered in the Book of Negroes are evacuated to Nova Scotia as free British subjects, closing the First Empire.
          </p>
        </div>

      </div>

      ${renderFooterStrip(9, 'From Bengal to Boston, commercial exploitation and imperial taxation provoked rebellion and transformed the globe.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 10–11: ENQUIRY 4 (TAXATION & BOSTON TEA PARTY)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[3], 10);
  html += renderRightPage(enquiryConfigs[3], 11);

  // ====================================================================
  // PAGES 12–13: ENQUIRY 5 (AMERICAN REVOLUTION & BLACK LOYALISTS)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[4], 12);
  html += renderRightPage(enquiryConfigs[4], 13);

  // ====================================================================
  // PAGES 14–15: DEDICATED LINED NOTES PAGES (EXERCISE BOOK RULING WITH MARGIN)
  // ====================================================================
  html += renderNotesPage(
    14,
    'Notes: Record key causal links, essay plans, and teacher feedback for this unit.',
  );
  html += renderNotesPage(
    15,
    'Notes: Record key causal links, essay plans, and teacher feedback for this unit.',
  );

  // ====================================================================
  // PAGE 16: OUTSIDE BACK COVER (PROGRESS LEDGER + 5 QR CODES)
  // ====================================================================
  html += `
  <!-- PAGE 16: OUTSIDE BACK COVER -->
  <div class="page page-container verso-page" id="page-16" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Back Cover Header Strip -->
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.5pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Key Stage 3 History &bull; Pupil Progress &amp; Assessment Record
        </h2>
      </div>

      <!-- Pupil Details & Target Level Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 7px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1.3fr; gap: 14px; align-items: center; margin-bottom: 5px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Target KS3 Level:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px; text-align: center; font-weight: 900; color: #0f284e;"></div>
        </div>
      </div>

      <!-- KS3 History Progress Pathways & Descriptors -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 8px; background: #ffffff; margin-bottom: 5px; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; background: #f0f4f9; padding: 3px 6px; margin-bottom: 4px; border-radius: 2px;">
          <strong style="font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
            Key Stage 3 History Assessment Pathways &bull; Level Descriptors &amp; Criteria
          </strong>
          <span style="font-size: 7.2pt; font-weight: 800; color: #0f284e;">YEAR 8 STANDARDS</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; font-size: 7pt; line-height: 1.3;">
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Emerging (1–2)
              </div>
              Recalls key imperial facts; describes basic trade and colonial events using structured sentence starters.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Add dates &amp; key terminology.
            </div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Emerging+ (3)
              </div>
              Identifies causes for colonial conflict; describes Middle Passage and plantation conditions with structured paragraphs.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Explain *why*, not just *what*.
            </div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Expected (4–5)
              </div>
              Explains multiple causes &amp; consequences; writes structured causal paragraphs using precise treaties, dates, and trade statistics.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Compare relative significance.
            </div>
          </div>
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px; background: #f0f4f9; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Expected+ (6–7)
              </div>
              Analyses causal significance; evaluates competing historical interpretations and weighs economic vs ideological motivations.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 2px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Sustained historical criteria.
            </div>
          </div>
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px; background: #f0f4f9; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Greater Depth (8–9)
              </div>
              Sustained, nuanced evaluative judgement; synthesises global trade networks, human exploitation, and constitutional collapse across 1600–1783.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 2px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Nuanced historical synthesis.
            </div>
          </div>
        </div>
      </div>

      <!-- Streamlined KS3 Marking Grid (Low-Friction & Periodic Marking Standard) -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin-bottom: 5px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt;">
          <thead>
            <tr style="background: #0f284e; color: #ffffff;">
              <th style="padding: 7px 4px; width: 10%; text-align: center; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">Date</th>
              <th style="padding: 7px 8px; width: 43%; text-align: left; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">Enquiry &bull; Assessment Focus</th>
              <th style="padding: 7px 6px; width: 17%; text-align: center; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">KS3 Level / Effort</th>
              <th style="padding: 7px 8px; width: 30%; text-align: left; font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">Teacher Comment / Spellings</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 1: East India Company &amp; Bengal</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Causal Explanation: Expansion of Control (1600–1765)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 2: Transatlantic Slave Trade</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Feature Drill &amp; Consequence: Middle Passage &amp; Zong</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 3: Maroon Resistance in Jamaica</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Contrasting Interpretations: Queen Nanny &amp; Resistance</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 4: Thirteen Colonies &amp; Tea Party</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Narrative Account &amp; Importance: Boston Escalation</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 5: American Revolution &amp; 1783</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Evaluative Judgement: Turning point in Imperial Defeat</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #0f284e; background: #f0f4f9;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Independent Study &amp; Notes Portfolio</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Pages 14–15 Enquiry Notes, Reflection &amp; Revision Tasks</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #f0f4f9;">&nbsp;</td>
            </tr>
            <tr style="background: #ffffff; border-top: 1.5px solid #0f284e;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Teacher-Designated Assessment Task</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Designated Key Enquiry Assessment (Teacher Selected)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Interactive Digital Quizzing Hub -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; background: #f0f4f9; padding: 3px 6px; margin-bottom: 4px; border-radius: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #0f284e;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">
            ONLINE RECALL
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; text-align: center;">
          ${enquiryConfigs
            .map((cfg, idx) => {
              const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=first_british_empire&lesson=${idx}&quiz=true`;
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'East India Co.',
                'Slave Trade',
                'Maroon Resistance',
                'Boston Tea Party',
                '1776 Revolution',
              ];
              return `
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px; color: #0f284e;">
              Enquiry ${cfg.lessonNum}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #475569; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
              ${shortLabels[idx]}
            </div>
            <div style="width: 24mm; height: 24mm; margin: 0 auto 2px auto;">
              ${qrSvg}
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; text-transform: uppercase; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; margin-bottom: 2px;">
              Scan to Quiz
            </span>
            <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; color: #0f284e; margin-top: 1px; white-space: nowrap;">
              Best Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]
            </div>
          </div>`;
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(16, 'From Bengal to Boston, commercial exploitation and imperial taxation provoked rebellion and transformed the globe.', 16)}
    </div>
  </div>
</body>
</html>
`;

  return html;
}

// ============================================================================
// MAIN COMPILATION SCRIPT
// ============================================================================
async function main() {
  console.log(
    'Rendering 16-Page A4 Pupil Workbook (KS3 Gold Standard): The First British Empire (1600–1783)...',
  );

  const outDir = path.join(ROOT_DIR, 'public', 'units', 'first_british_empire');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outHtmlPath = path.join(outDir, 'pupil_workbook.html');
  const html = compileEmpireWorkbook();
  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(`[OK] HTML written to: ${outHtmlPath}`);

  const altUnitsDir = path.join(ROOT_DIR, 'units', 'first_british_empire');
  if (fs.existsSync(altUnitsDir)) {
    fs.writeFileSync(path.join(altUnitsDir, 'pupil_workbook.html'), html, 'utf8');
    console.log(`[OK] HTML mirrored to: ${path.join(altUnitsDir, 'pupil_workbook.html')}`);
  }

  // Compile PDF via Puppeteer
  const pdfDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
  const outPdfPath = path.join(pdfDir, 'first_british_empire_pupil_workbook.pdf');

  const chromePath =
    process.env.CHROME_PATH ||
    (process.platform === 'win32'
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  console.log('Launching Puppeteer to generate high-resolution print PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Wait for web fonts to load
  await page.evaluateHandle('document.fonts.ready');

  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm',
    },
  });

  await browser.close();
  console.log(`[OK] Single canonical PDF compiled: ${outPdfPath}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error during workbook compilation:', err);
    process.exit(1);
  });
}

module.exports = { compileEmpireWorkbook };

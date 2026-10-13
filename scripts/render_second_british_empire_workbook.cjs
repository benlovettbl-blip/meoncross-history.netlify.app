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
// Medicine 18th-19th Century & CME Standard (Spine Left, Rotating Skills Right)
// ============================================================================
const enquiryConfigs = [
  {
    lessonNum: 1,
    id: 'lesson_1',
    title: 'Enquiry 1: Engines of Empire: Mercantilism, Naval Hegemony & Portsmouth Dockyard',
    enquiryQuestion:
      'How was the British Empire built and sustained through maritime industrial power?',
    specAnchor:
      'Mercantilism & global trade monopolies; Royal Navy supremacy; Portsmouth Royal Dockyard as the world’s largest manufacturing complex; HMS Warrior (1860) ironclad breakthrough; Two-Power Standard doctrine.',
    stages: [
      {
        step: 1,
        date: '1783–1805',
        paraRef: '[1.1]',
        questionHeading: 'Why did Britain rely on mercantilism and navigation laws?',
        bullets: ['Raw Sugar and Cotton', 'Armed Merchant Fleets', 'Piles of Gold Coins'],
        focusClue:
          'How did mercantilist regulations ensure that imperial wealth flowed directly into the British Treasury?',
      },
      {
        step: 2,
        date: '1805–1815',
        paraRef: '[1.2]',
        questionHeading:
          'How did naval dominance at Trafalgar secure Britain’s maritime supremacy?',
        bullets: [
          'Twenty-Seven Battleships',
          'Smashing Enemy Flagships',
          'Controlling Global Sea Lanes',
        ],
        focusClue:
          'Why did total command of ocean trading routes protect British shipping from European rivals?',
      },
      {
        step: 3,
        date: '1815–1850',
        paraRef: '[1.3]',
        questionHeading: 'Why was Portsmouth Royal Dockyard the industrial heart of global empire?',
        bullets: [
          'Ten Thousand Dockyard Smiths',
          'Steam Wooden Block Mills',
          'Forging Iron Anchors',
        ],
        focusClue:
          'How did Portsmouth Dockyard combine mass production with naval engineering to maintain the Royal Navy?',
      },
      {
        step: 4,
        date: '1860',
        paraRef: '[2.1–2.2]',
        questionHeading: 'How did HMS Warrior render all wooden naval fleets obsolete overnight?',
        bullets: ['Four-Inch Iron Armour Plates', 'Twin Steam Engines', 'Bouncing Cannon Shells'],
        focusClue:
          'Why did the launch of HMS Warrior in 1860 trigger a worldwide naval revolution in ironclad technology?',
      },
      {
        step: 5,
        date: '1889',
        paraRef: '[2.3]',
        questionHeading:
          'How did the Two-Power Standard doctrine formalize British naval dominance?',
        bullets: [
          'Naval Defence Act Law',
          'Matching Two Foreign Fleets',
          'Dozens of New Battleships',
        ],
        focusClue:
          'Why did Parliament legislate that the Royal Navy must equal the combined strength of the next two strongest fleets?',
      },
    ],
    vocabPrompt:
      'Define <strong>Mercantilism</strong> and explain how Portsmouth Dockyard and HMS Warrior enforced British global hegemony:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      examStem:
        'Explain why maritime naval supremacy and industrial dockyards were vital for sustaining the British Empire in the 19th century. [12 marks]',
      stimulus: [
        'The industrial manufacturing capacity of Portsmouth Royal Dockyard',
        'The technological breakthrough of HMS Warrior (1860) and the Two-Power Standard',
      ],
      connectives:
        'A primary reason for sustaining imperial power was that... &bull; In particular, manufacturing infrastructure allowed... &bull; Furthermore, technological innovations meant that... &bull; Crucially, defence policies ensured that... &bull; Consequently, naval supremacy was preserved because...',
      wordBank:
        'Portsmouth Dockyard &bull; HMS Warrior &bull; Two-Power Standard &bull; mercantilism &bull; ironclad &bull; Royal Navy &bull; Pax Britannica &bull; naval supremacy',
      timelineMissionTitle: 'Centrefold Sketch Challenges 1 &amp; 2',
      timelineMission:
        '<strong>Milestone 1 (HMS Warrior Ironclad &bull; 1860):</strong> Sketch the revolutionary iron-hulled steam battleship HMS Warrior with its black smokestack and iron armour plates [🚢 iron battleship &bull; 🛡️ armour plate &bull; ⚓ heavy anchor].<br style="display:block; margin-top:2px;"><strong>Milestone 2 (Portsmouth Royal Dockyard &bull; 19th Century):</strong> Sketch Admiralty master smiths operating hydraulic machinery inside the Portsmouth block mills [🏭 brick dockyard &bull; ⚙️ steam engine &bull; ⛵ Royal Navy warship].',
    },
    leftPageQuip:
      'Portsmouth Royal Dockyard was the industrial beating heart of the British Empire, building the ironclads that commanded the oceans.',
    rightPageQuip:
      'Without Portsmouth’s industrial manufacturing supremacy, Victorian Britain could never have projected global Pax Britannica.',
  },
  {
    lessonNum: 2,
    id: 'lesson_2',
    title: 'Enquiry 2: The De-industrialisation of India: The Company & Handloom Crisis',
    enquiryQuestion:
      'How did British corporate rule transform India from the world’s textile workshop into a captive market?',
    specAnchor:
      'Pre-colonial Indian textile supremacy (25% of global output); 1721 Calico Acts; 1765 Bengal Diwani; flood of cheap Lancashire machine-woven cotton; collapse of Dhaka handloom weaving; Bentinck’s 1834 Report.',
    stages: [
      {
        step: 1,
        date: '1700–1757',
        paraRef: '[1.1]',
        questionHeading: 'Why was Mughal India the world’s leading textile workshop in 1700?',
        bullets: [
          'Quarter of World Output',
          'Fine Village Handloom Silk',
          'Paying in Silver Ingots',
        ],
        focusClue:
          'Why were Indian hand-woven textiles so superior that European trading companies paid in gold and silver?',
      },
      {
        step: 2,
        date: '1721',
        paraRef: '[1.2]',
        questionHeading: 'Why did the British Parliament pass the protectionist Calico Acts?',
        bullets: [
          'Protesting English Weavers',
          'Banning Printed Cotton Cloth',
          'Protecting Home Wool Sales',
        ],
        focusClue:
          'Why did Parliament legally ban dyed Indian cloth in Britain while claiming to believe in free commerce?',
      },
      {
        step: 3,
        date: '1765',
        paraRef: '[1.3]',
        questionHeading:
          'How did the Diwani of Bengal invert the financial flow between Britain and India?',
        bullets: [
          'Collecting Peasant Crop Taxes',
          'Buying Silk with Local Taxes',
          'Halting Silver Shipments',
        ],
        focusClue:
          'How did using local peasant taxes to buy Indian textiles eliminate Britain’s need to import silver bullion?',
      },
      {
        step: 4,
        date: '1813–1835',
        paraRef: '[2.1–2.2]',
        questionHeading:
          'How did steam machinery and rigged tariffs dismantle Indian handloom weaving?',
        bullets: [
          'Lancashire Factory Mills',
          'Seventy Percent Border Tax',
          'Flooding Bazaars with Cheap Cotton',
        ],
        focusClue:
          'Why did unequal tariffs allow British machine cloth to flood India while blocking Indian cloth from Britain?',
      },
      {
        step: 5,
        date: '1834',
        paraRef: '[3.1–3.3]',
        questionHeading:
          'Why did Governor-General Bentinck write that "the bones of weavers bleach the plains"?',
        bullets: [
          'Dhaka Loom City Deserted',
          'Starving Handloom Families',
          'Forced into Farm Labour',
        ],
        focusClue:
          'How did de-industrialisation reduce skilled urban artisans to destitute rural farm labourers vulnerable to famine?',
      },
    ],
    vocabPrompt:
      'Define <strong>De-industrialisation</strong> and explain how British tariffs created a captive market across India:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      examStem:
        'Explain why the Indian textile industry experienced rapid de-industrialisation between 1757 and 1850. [12 marks]',
      stimulus: [
        'The invention of steam-powered cotton spinning and weaving in Lancashire',
        'The unequal tariff regime imposed by the British Parliament',
      ],
      connectives:
        'A primary cause of this economic transformation was that... &bull; In particular, new industrial methods meant that... &bull; Furthermore, official trade policies contributed because... &bull; Crucially, changes in taxation and control allowed... &bull; Consequently, traditional craftsmen were affected because...',
      wordBank:
        'De-industrialisation &bull; captive market &bull; Calico Acts &bull; Dhaka muslin &bull; tariff disparity &bull; Lancashire cotton &bull; Diwani &bull; Lord William Bentinck',
      timelineMissionTitle: 'Centrefold Sketch Challenges 3 &amp; 4',
      timelineMission:
        '<strong>Milestone 3 (Bengal Handloom Weavers &bull; 1750):</strong> Sketch an Indian artisan weaving delicate muslin cloth on a wooden village pit loom [🧵 wooden loom &bull; 📜 fine muslin &bull; 🌾 Bengal village].<br style="display:block; margin-top:2px;"><strong>Milestone 4 (Lancashire Steam Mills &bull; 1830):</strong> Sketch British merchant ships unloading thousands of bales of factory cloth at Calcutta docks [🏭 cotton mill &bull; 📦 factory bales &bull; 🚢 merchant ship].',
    },
    leftPageQuip:
      'Before British rule, India produced 25% of the world’s manufactured goods; by 1947, colonial de-industrialisation reduced that share to under 2%.',
    rightPageQuip:
      'Governor-General Bentinck admitted the truth in 1834: "The bones of the cotton-weavers are bleaching the plains of India."',
  },
  {
    lessonNum: 3,
    id: 'lesson_3',
    title: 'Enquiry 3: The 1857 Indian Rebellion: Sepoy Grievance, Rani Lakshmibai & The Raj',
    enquiryQuestion:
      'Was the 1857 Indian Rebellion a limited military mutiny or a war for national liberation?',
    specAnchor:
      'Sepoy grievances in the Bengal Army; Lord Dalhousie’s Doctrine of Lapse; annexation of Awadh (1856); Enfield rifle greased cartridge crisis; outbreak at Meerut & March on Delhi; Rani Lakshmibai of Jhansi; Azamgarh Proclamation; 1858 Government of India Act & Queen Victoria’s Proclamation.',
    stages: [
      {
        step: 1,
        date: '1848–1856',
        paraRef: '[1.1–1.2]',
        questionHeading:
          'Why did Lord Dalhousie’s Doctrine of Lapse alienate Indian royal dynasties?',
        bullets: ['Seizing Heirless Kingdoms', 'Satara, Nagpur, Jhansi', 'Annexing Wealthy Awadh'],
        focusClue:
          'Why did confiscating kingdoms lacking biological male heirs provoke fury among Indian aristocrats and soldiers?',
      },
      {
        step: 2,
        date: 'Early 1857',
        paraRef: '[1.3]',
        questionHeading:
          'Why was the Enfield rifle cartridge the explosive catalyst for rebellion?',
        bullets: ['Greased Paper Tubes', 'Biting Cow and Pig Fat', 'Fear of Forced Conversion'],
        focusClue:
          'Why did biting animal grease confirm sepoy fears that the Company planned forced Christian conversion?',
      },
      {
        step: 3,
        date: 'May 1857',
        paraRef: '[2.1–2.2]',
        questionHeading:
          'Why was the march from Meerut to Delhi a political masterstroke for the rebels?',
        bullets: [
          'Breaking Open Jail Cells',
          'Aged Emperor Bahadur Shah',
          'Hindu and Muslim Unity',
        ],
        focusClue:
          'How did placing 82-year-old Mughal Emperor Bahadur Shah Zafar at the head of the uprising legitimize the war?',
      },
      {
        step: 4,
        date: '1857–1858',
        paraRef: '[2.2–2.3]',
        questionHeading:
          'How did Rani Lakshmibai of Jhansi become an enduring symbol of resistance?',
        bullets: [
          'Riding Battle Horseback',
          'Swinging Curved Talwar Sword',
          'Killed in Action at Gwalior',
        ],
        focusClue:
          'Why did the warrior queen riding into battle on horseback inspire generations of anti-colonial resistance?',
      },
      {
        step: 5,
        date: 'August 1858',
        paraRef: '[3.1–3.3]',
        questionHeading:
          'How did the Government of India Act 1858 permanently reshape British governance?',
        bullets: [
          'Dissolving Company Rule',
          'Viceroy Direct Crown Command',
          'Queen Victoria Proclamation',
        ],
        focusClue:
          'Why did Parliament dissolve the private East India Company and establish the direct rule of the British Raj?',
      },
    ],
    vocabPrompt:
      'Define <strong>The British Raj</strong> and explain why Queen Victoria issued her 1858 Proclamation promising religious neutrality:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      examStem:
        'Explain why the 1857 Indian Rebellion broke out and spread rapidly across northern India. [12 marks]',
      stimulus: [
        'Lord Dalhousie’s Doctrine of Lapse and the annexation of Awadh',
        'The introduction of the greased Enfield rifle cartridge in 1857',
      ],
      connectives:
        'A primary long-term cause of the uprising was that... &bull; In particular, territorial policies caused grievance because... &bull; Furthermore, an immediate trigger arose when... &bull; Crucially, the movement gained momentum because... &bull; Consequently, the conflict escalated when...',
      wordBank:
        'Sepoy &bull; Doctrine of Lapse &bull; Awadh &bull; Enfield rifle &bull; Rani Lakshmibai &bull; Bahadur Shah Zafar &bull; Azamgarh Proclamation &bull; British Raj &bull; Queen Victoria',
      timelineMissionTitle: 'Centrefold Sketch Challenges 5 &amp; 6',
      timelineMission:
        '<strong>Milestone 5 (The Enfield Cartridge Crisis &bull; 1857):</strong> Sketch a sepoy soldier hesitating to bite open the greased paper cartridge [🔫 Enfield rifle &bull; 📜 paper cartridge &bull; 🪖 sepoy uniform].<br style="display:block; margin-top:2px;"><strong>Milestone 6 (Rani Lakshmibai at Gwalior &bull; 1858):</strong> Sketch the Queen of Jhansi on horseback with drawn curved talwar sword leading her cavalry [🐎 galloping horse &bull; 🗡️ curved sword &bull; 🛡️ royal armor].',
    },
    leftPageQuip:
      'Rani Lakshmibai declared "I shall not give up my Jhansi!" and died fighting on horseback, respected even by her British adversaries.',
    rightPageQuip:
      'The 1857 Rebellion proved that corporate rule could not survive; Parliament terminated the East India Company to inaugurate the British Raj.',
  },
  {
    lessonNum: 4,
    id: 'lesson_4',
    title: 'Enquiry 4: The Scramble for Africa & Imperial Ideology: Maxim Guns & Plunder',
    enquiryQuestion:
      'Why did European powers partition Africa after 1884, and was it a civilising mission or armed resource theft?',
    specAnchor:
      '1884–85 Berlin West Africa Conference; Effective Occupation doctrine; Maxim machine gun (1884); quinine & malaria; Battle of Omdurman (1898); Cecil Rhodes & British South Africa Company; Rudyard Kipling’s "The White Man’s Burden" (1899) vs. E.D. Morel’s "The Black Man’s Burden" (1920).',
    stages: [
      {
        step: 1,
        date: '1884–1885',
        paraRef: '[1.1–1.3]',
        questionHeading: 'Why did European powers convene the 1884 Berlin West Africa Conference?',
        bullets: [
          'Chancellor Otto von Bismarck',
          'Drawing Lines Across Maps',
          'Zero Africans Invited',
        ],
        focusClue:
          'Why did fourteen European nations partition 90% of Africa without consulting a single African representative?',
      },
      {
        step: 2,
        date: '1884',
        paraRef: '[1.3]',
        questionHeading:
          'How did the principle of Effective Occupation accelerate military conquest?',
        bullets: [
          'Building Coastal Forts',
          'Marching Troops into Interior',
          'Planting National Flags',
        ],
        focusClue:
          'Why did requiring physical administrative and military occupation trigger a violent race into the African interior?',
      },
      {
        step: 3,
        date: '1884–1898',
        paraRef: '[2.1–2.3]',
        questionHeading: 'How did the Maxim gun and quinine make conquest militarily irresistible?',
        bullets: [
          'Six Hundred Rounds per Minute',
          'Bitter Bark Fever Medicine',
          'Ten Thousand Dead at Omdurman',
        ],
        focusClue:
          'Why did automatic machine guns allow tiny expeditionary forces to annihilate massive traditional armies?',
      },
      {
        step: 4,
        date: '1899',
        paraRef: '[3.1]',
        questionHeading:
          'How did Rudyard Kipling construct the moral myth of "The White Man\'s Burden"?',
        bullets: ['Poem in The Times', 'Claiming Selfless Duty', 'Racist Slur Half-Devil'],
        focusClue:
          'Why did Victorian imperialists claim colonial rule was a moral duty rather than a profitable business?',
      },
      {
        step: 5,
        date: '1920',
        paraRef: '[3.2–3.3]',
        questionHeading:
          'How did E. D. Morel’s "The Black Man\'s Burden" expose colonial capitalism?',
        bullets: [
          'Stealing Rubber and Palm Oil',
          'Severed Hands in Congo',
          'Enriching European Tycoons',
        ],
        focusClue:
          'How did Morel prove that the "civilising mission" was merely a mask for violent corporate plunder?',
      },
    ],
    vocabPrompt:
      'Define <strong>Effective Occupation</strong> and explain the fundamental disagreement between Rudyard Kipling and E. D. Morel:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      examStem:
        'Explain why European powers were able to partition and conquer 90% of Africa between 1884 and 1914. [12 marks]',
      stimulus: [
        'The rules established at the 1884–85 Berlin West Africa Conference',
        'Technological breakthroughs including the Maxim machine gun and quinine',
      ],
      connectives:
        'A primary reason for rapid partition was that... &bull; In particular, diplomatic agreements established... &bull; Furthermore, technological advantages contributed because... &bull; Crucially, decisive military equipment allowed... &bull; Consequently, territorial control was achieved because...',
      wordBank:
        'Scramble for Africa &bull; Berlin Conference &bull; Effective Occupation &bull; Maxim gun &bull; quinine &bull; Battle of Omdurman &bull; Rudyard Kipling &bull; E. D. Morel &bull; resource extraction',
      timelineMissionTitle: 'Centrefold Sketch Challenges 7 &amp; 8',
      timelineMission:
        '<strong>Milestone 7 (The Berlin Conference Caricature &bull; 1884):</strong> Sketch European diplomats sitting around a map table slicing up a large cake labelled "Afrique" [🎂 cake labelled Africa &bull; 🗡️ carving knife &bull; 🗺️ imperial map].<br style="display:block; margin-top:2px;"><strong>Milestone 8 (The Maxim Machine Gun &bull; 1898):</strong> Sketch British colonial troops operating a Maxim machine gun mounted on a carriage [🔫 Maxim machine gun &bull; 💨 bullet smoke &bull; 🪖 khaki sun helmet].',
    },
    leftPageQuip:
      'Hilaire Belloc captured the brutal technological reality of the Scramble: "Whatever happens, we have got / The Maxim Gun, and they have not."',
    rightPageQuip:
      'E. D. Morel exposed the truth: European powers were driven not by a moral civilising mission, but by an insatiable lust for rubber, gold, and palm oil.',
  },
  {
    lessonNum: 5,
    id: 'lesson_5',
    title: 'Enquiry 5: The Imperial Verdict: Workshop of the World or Age of Exploitation?',
    enquiryQuestion:
      'Did the British Empire bring global modernisation and order, or economic exploitation and devastation?',
    specAnchor:
      'The 1851 Great Exhibition at Crystal Palace; Victorian celebration of global supremacy; Dadabhai Naoroji’s "Drain of Wealth" theory (1901); colonial famines in India (1876–1878, 1899–1900); Optimist vs. Pessimist historiographical balance sheet.',
    stages: [
      {
        step: 1,
        date: '1851',
        paraRef: '[1.1]',
        questionHeading:
          'How did the 1851 Great Exhibition proclaim Britain the Workshop of the World?',
        bullets: [
          'Glass and Iron Crystal Palace',
          'Six Million Ticket Holders',
          'Looted Koh-i-Noor Diamond',
        ],
        focusClue:
          'How did Prince Albert’s exhibition celebrate British industrial technology and global imperial dominion?',
      },
      {
        step: 2,
        date: '1870–1900',
        paraRef: '[1.2]',
        questionHeading:
          'What modern infrastructure did British colonial administration construct across India?',
        bullets: [
          'Twenty-Five Thousand Rail Miles',
          'Digging River Canals',
          'Electric Telegraph Wires',
        ],
        focusClue:
          'How did colonial infrastructure physically integrate territories into global trade and administrative control?',
      },
      {
        step: 3,
        date: '1876–1900',
        paraRef: '[2.1–2.2]',
        questionHeading:
          'Why did catastrophic famines strike India while grain was exported to Britain?',
        bullets: [
          'Viceroy Lytton Market Dogma',
          'Hard Labour Relief Camps',
          'Ten Million Starved to Death',
        ],
        focusClue:
          'Why did British adherence to free-market dogma prevent famine relief while millions starved?',
      },
      {
        step: 4,
        date: '1901',
        paraRef: '[3.1–3.3]',
        questionHeading:
          'How did Dadabhai Naoroji calculate the systematic "Drain of Wealth" from India?',
        bullets: [
          'London Book on Poverty',
          'Millions Siphoned in Tax Money',
          'First Indian Westminster MP',
        ],
        focusClue:
          'How did Naoroji prove that millions in tax revenue were siphoned out of India without any economic return?',
      },
      {
        step: 5,
        date: 'Historiography',
        paraRef: '[4.1–4.3]',
        questionHeading:
          'How do "Optimist" and "Pessimist" historians evaluate the British Empire today?',
        bullets: [
          'Global Free Trade and Laws',
          'Crushing Local Industries',
          'Clashing Moral Judgments',
        ],
        focusClue:
          'Can an historian reach a single verdict, or was the Empire simultaneously modernizing and profoundly destructive?',
      },
    ],
    vocabPrompt:
      'Define Dadabhai Naoroji’s <strong>Drain of Wealth</strong> theory and explain how it challenges imperial apologist accounts:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      examStem:
        'Explain why the overall impact of the British Empire remains a subject of intense historical debate today. [12 marks]',
      stimulus: [
        'The construction of modern global infrastructure including railways, telegraphs, and ports',
        'Dadabhai Naoroji’s Drain of Wealth theory and recurring late Victorian colonial famines',
      ],
      connectives:
        'One significant perspective in this debate is that... &bull; In particular, evidence of development highlights... &bull; Conversely, critical historians argue that... &bull; Crucially, economic analysis demonstrated that... &bull; Ultimately, historians disagree because...',
      wordBank:
        'Drain of Wealth &bull; Dadabhai Naoroji &bull; Crystal Palace &bull; Great Exhibition &bull; famine &bull; infrastructure &bull; railways &bull; Optimist vs Pessimist &bull; historiography',
      timelineMissionTitle: 'Centrefold Sketch Challenges 9 &amp; 10',
      timelineMission:
        '<strong>Milestone 9 (The Crystal Palace Exhibition &bull; 1851):</strong> Sketch the monumental glass-and-iron barrel roof of the Crystal Palace in Hyde Park [🏛️ glass palace &bull; ⚙️ giant steam engine &bull; 💎 Koh-i-Noor diamond].<br style="display:block; margin-top:2px;"><strong>Milestone 10 (Dadabhai Naoroji at Westminster &bull; 1892):</strong> Sketch Dadabhai Naoroji standing at the dispatch box in the House of Commons presenting his book to MPs [🏛️ Parliament chamber &bull; 📜 economic ledger &bull; 👓 Victorian statesman].',
    },
    leftPageQuip:
      'Dadabhai Naoroji, Britain’s first Indian MP, used official British records to prove that colonial taxation bled India of industrial capital.',
    rightPageQuip:
      'To Optimists, the Empire brought railways and global trade; to Pessimists, it was an engine of resource extraction and de-industrialisation.',
  },
];

// ============================================================================
// ============================================================================
// 24-QUESTION SEN-ACCESSIBLE DUAL-RETRIEVAL MASTERY BANK (48 MARKS TOTAL)
// Structure: 4 Questions per Enquiry (5 x 4 = 20) + 4 Synoptic Turning Points = 24 Qs
// Line 1: Core Fact [1m] • Line 2: Causal Explanation [1m]
// ============================================================================
const dualRetrievalBank = [
  // Enquiry 1: Henry VIII & The English Reformation (1517–1534)
  {
    num: 1,
    enquiryNum: 1,
    enquiryTitle: 'Enquiry 1: Henry VIII & The English Reformation',
    title: 'Catherine of Aragon & Succession Crisis',
    stem: 'Why did Henry VIII urgently demand an annulment from Catherine of Aragon in 1527?',
    factPrompt: 'Catherine had no surviving male heir to secure the Tudor succession...',
    explPrompt: 'Henry feared Leviticus 20:21 divine curse & dynastic civil war without a son...',
    modelFact: 'Catherine had no surviving male heir to secure the Tudor royal succession.',
    modelExpl:
      'Henry feared a divine curse under Leviticus 20:21 and believed a male heir was vital to prevent civil war.',
  },
  {
    num: 2,
    enquiryNum: 1,
    enquiryTitle: 'Enquiry 1: Henry VIII & The English Reformation',
    title: 'Pope Clement VII & Charles V',
    stem: 'Why was Pope Clement VII unable to grant Henry’s annulment request in 1527?',
    factPrompt: 'Emperor Charles V sacked Rome and held Pope Clement captive...',
    explPrompt: 'Charles was Catherine’s nephew, blocking any papal annulment...',
    modelFact: 'Holy Roman Emperor Charles V sacked Rome in 1527 and held the Pope captive.',
    modelExpl:
      'Charles was Catherine of Aragon’s nephew, so the Pope could not grant the divorce without enraging the Emperor.',
  },
  {
    num: 3,
    enquiryNum: 1,
    enquiryTitle: 'Enquiry 1: Henry VIII & The English Reformation',
    title: 'Act in Restraint of Appeals (1533)',
    stem: 'How did the 1533 Act in Restraint of Appeals transform English legal sovereignty?',
    factPrompt: 'Declared England an independent ‘Empire’ under the King alone...',
    explPrompt: 'Banned all legal appeals to Rome, allowing Cranmer to annul the marriage...',
    modelFact: 'It declared England an independent ‘Empire’ and banned legal appeals to the Pope.',
    modelExpl:
      'This allowed Archbishop Thomas Cranmer to annul Henry’s marriage in England without Roman interference.',
  },
  {
    num: 4,
    enquiryNum: 1,
    enquiryTitle: 'Enquiry 1: Henry VIII & The English Reformation',
    title: 'Act of Supremacy (1534)',
    stem: 'What was the constitutional significance of the 1534 Act of Supremacy?',
    factPrompt: 'Declared Henry VIII the ‘Supreme Head’ of the Church of England...',
    explPrompt: 'Ended papal authority and backed royal supremacy with the Treason Act...',
    modelFact: 'Declared Henry VIII ‘Supreme Head’ of the Church of England.',
    modelExpl:
      'It permanently stripped the Pope of power in England, making denial of royal supremacy punishable by death.',
  },

  // Enquiry 2: Elizabeth I & The Middle Way (1558–1588)
  {
    num: 5,
    enquiryNum: 2,
    enquiryTitle: 'Enquiry 2: Elizabeth I & The Middle Way',
    title: 'The Title ‘Supreme Governor’ (1559)',
    stem: 'Why did Elizabeth I adopt the title ‘Supreme Governor’ instead of ‘Supreme Head’?',
    factPrompt: 'Adopted ‘Supreme Governor’ in the 1559 Act of Supremacy...',
    explPrompt:
      'Reassured Catholics (Christ/Pope is head) & Puritans (opposed female spiritual head)...',
    modelFact: 'She adopted ‘Supreme Governor’ in the 1559 Act of Supremacy.',
    modelExpl:
      'It defused Catholic objections that only Christ or the Pope could head the Church and placated Puritans.',
  },
  {
    num: 6,
    enquiryNum: 2,
    enquiryTitle: 'Enquiry 2: Elizabeth I & The Middle Way',
    title: '1559 Book of Common Prayer',
    stem: 'How did the 1559 Prayer Book compromise on the Communion service?',
    factPrompt: 'Combined Catholic (1549) and Protestant (1552) Communion wording...',
    explPrompt:
      'Allowed moderate Catholics & Protestants to attend without violating conscience...',
    modelFact: 'It combined Catholic (1549) and Protestant (1552) communion wording.',
    modelExpl:
      'This ambiguity allowed moderate Catholics to imagine the Real Presence while Protestants saw a commemoration.',
  },
  {
    num: 7,
    enquiryNum: 2,
    enquiryTitle: 'Enquiry 2: Elizabeth I & The Middle Way',
    title: 'Papal Excommunication (1570)',
    stem: 'How did Pope Pius V’s papal bull Regnans in Excelsis (1570) threaten Elizabeth I?',
    factPrompt: 'Excommunicated Elizabeth and ordered Catholics to depose her...',
    explPrompt: 'Transformed English practicing Catholics into suspected political traitors...',
    modelFact: 'It excommunicated Elizabeth and released English Catholics from loyalty to her.',
    modelExpl:
      'It transformed practicing English Catholics in the eyes of the Crown from religious dissenters into active traitors.',
  },
  {
    num: 8,
    enquiryNum: 2,
    enquiryTitle: 'Enquiry 2: Elizabeth I & The Middle Way',
    title: 'Babington Plot & Execution of Mary (1586–87)',
    stem: 'Why did Walsingham’s discovery of the Babington Plot lead to Mary’s execution?',
    factPrompt: 'Intercepted coded letters proved Mary agreed to assassinate Elizabeth...',
    explPrompt:
      'Executing Mary permanently eliminated the Catholic figurehead for foreign invasion...',
    modelFact: 'Intercepted coded letters proved Mary agreed to assassinate Elizabeth I.',
    modelExpl:
      'Executing Mary in 1587 removed the rallying figurehead for Catholic plots and Spanish invasion schemes.',
  },

  // Enquiry 3: The Spanish Armada & Naval Power (1588)
  {
    num: 9,
    enquiryNum: 3,
    enquiryTitle: 'Enquiry 3: The Spanish Armada & Naval Power',
    title: 'King Philip II’s Invasion Motives',
    stem: 'Why did King Philip II launch the Spanish Armada against England in 1588?',
    factPrompt: 'To restore Catholicism, avenge Mary Queen of Scots, and stop Drake’s piracy...',
    explPrompt:
      'Philip viewed invasion as a holy crusade to end English support for Dutch rebels...',
    modelFact: 'To restore Catholicism, avenge Mary Queen of Scots, and punish English privateers.',
    modelExpl:
      'Philip viewed it as a holy crusade to depose Elizabeth and stop English military aid to Dutch Protestant rebels.',
  },
  {
    num: 10,
    enquiryNum: 3,
    enquiryTitle: 'Enquiry 3: The Spanish Armada & Naval Power',
    title: 'Drake’s Raid on Cadiz (1587)',
    stem: 'How did Francis Drake’s raid on Cadiz in 1587 disrupt Spanish invasion plans?',
    factPrompt: 'Burned 30+ Spanish warships and destroyed seasoned barrel stave supplies...',
    explPrompt: 'Delayed the Armada by a year and caused food and water to rot at sea...',
    modelFact:
      'Drake burned over 30 warships and destroyed seasoned barrel stave supplies in Cadiz harbor.',
    modelExpl:
      'This delayed the invasion by a full year and ruined Spanish food and fresh water storage at sea.',
  },
  {
    num: 11,
    enquiryNum: 3,
    enquiryTitle: 'Enquiry 3: The Spanish Armada & Naval Power',
    title: 'English Race-Built Galleons & Standoff Tactics',
    stem: 'What tactical advantage did English warships have over the Spanish fleet in 1588?',
    factPrompt: 'Race-built galleons were faster, lower, and loaded long-range culverin cannons...',
    explPrompt: 'Allowed English gunners to fire repeated broadsides without being boarded...',
    modelFact:
      'English race-built galleons were faster, lower, and armed with long-range culverins.',
    modelExpl:
      'English crews fired devastating broadsides from standoff range, preventing Spanish soldiers from boarding.',
  },
  {
    num: 12,
    enquiryNum: 3,
    enquiryTitle: 'Enquiry 3: The Spanish Armada & Naval Power',
    title: 'Calais Fireships & Battle of Gravelines',
    stem: 'Why did the deployment of English fireships at Calais trigger the Armada’s defeat?',
    factPrompt:
      'Eight blazing fireships sent into Calais anchorage forced captains to cut anchor cables...',
    explPrompt:
      'Scattered ships could not regroup, leaving them helpless at Gravelines & in storms...',
    modelFact:
      'Eight blazing fireships launched off Calais forced Spanish captains to cut anchor cables.',
    modelExpl:
      'Scattered anchorless ships broke formation and were battered at Gravelines and wrecked by North Sea storms.',
  },

  // Enquiry 4: The English Civil War & Execution of Charles I (1625–1649)
  {
    num: 13,
    enquiryNum: 4,
    enquiryTitle: 'Enquiry 4: The English Civil War & Regicide',
    title: 'Divine Right & 11-Year Personal Rule',
    stem: 'Why did King Charles I rule without Parliament between 1629 and 1640?',
    factPrompt: 'Charles believed in Divine Right and refused parliamentary limits on power...',
    explPrompt:
      'He wanted total control of religion and taxes until Scottish wars forced a recall...',
    modelFact:
      'Charles believed in the Divine Right of Kings and rejected parliamentary criticism.',
    modelExpl:
      'Ruling alone allowed him to impose Arminian religion and unparliamentary taxes until the Scottish war bankrupt him.',
  },
  {
    num: 14,
    enquiryNum: 4,
    enquiryTitle: 'Enquiry 4: The English Civil War & Regicide',
    title: 'Ship Money & John Hampden (1635–37)',
    stem: 'Why did Charles I’s expansion of Ship Money provoke furious nationwide resistance?',
    factPrompt: 'Levied a coastal emergency naval tax on inland counties in peacetime...',
    explPrompt:
      'Landowners like Hampden argued taxation without Parliament violated English law...',
    modelFact: 'He levied an emergency coastal naval tax on inland counties during peacetime.',
    modelExpl:
      'Landowners like John Hampden argued that taking property without parliamentary consent was illegal tyranny.',
  },
  {
    num: 15,
    enquiryNum: 4,
    enquiryTitle: 'Enquiry 4: The English Civil War & Regicide',
    title: 'The New Model Army & Battle of Naseby (1645)',
    stem: 'Why was the New Model Army able to decisively defeat the Royalists at Naseby?',
    factPrompt: 'A national, disciplined, professional citizen army promoted on merit...',
    explPrompt: 'Cromwell’s disciplined cavalry charges crushed the King’s main field army...',
    modelFact:
      'It was England’s first national, professional army promoted on merit rather than birth.',
    modelExpl:
      'Superior training, discipline, and Cromwell’s cavalry charges shattered the Royalist field army permanently.',
  },
  {
    num: 16,
    enquiryNum: 4,
    enquiryTitle: 'Enquiry 4: The English Civil War & Regicide',
    title: 'Trial & Execution of Charles I (1649)',
    stem: 'Why did the Rump Parliament take the radical step of executing King Charles I?',
    factPrompt: 'Tried as a ‘tyrant, traitor, and murderer’ and beheaded on 30 January 1649...',
    explPrompt:
      'Parliament decided peace was impossible while the King lived after the 2nd Civil War...',
    modelFact:
      'Charles was tried as a ‘tyrant, traitor, and murderer’ and beheaded on 30 January 1649.',
    modelExpl:
      'Having secretly conspired with the Scots in the Second Civil War, MPs concluded he could never be trusted.',
  },

  // Enquiry 5: The Restoration, Glorious Revolution & Bill of Rights (1660–1689)
  {
    num: 17,
    enquiryNum: 5,
    enquiryTitle: 'Enquiry 5: Restoration & Glorious Revolution',
    title: 'The Restoration Settlement (1660)',
    stem: 'Why did the English Republic collapse and restore King Charles II in 1660?',
    factPrompt: 'The Protectorate collapsed into military chaos following Cromwell’s death...',
    explPrompt:
      'Elites & public wanted stability, social order, and parliamentary government restored...',
    modelFact:
      'The military Protectorate collapsed into political chaos after Oliver Cromwell’s death.',
    modelExpl:
      'The political nation restored the monarchy to recover social order, stability, and constitutional law.',
  },
  {
    num: 18,
    enquiryNum: 5,
    enquiryTitle: 'Enquiry 5: Restoration & Glorious Revolution',
    title: 'James II & Dynastic Crisis (1688)',
    stem: 'Why did the birth of James II’s son in June 1688 trigger a constitutional crisis?',
    factPrompt: 'The infant prince threatened a permanent Catholic Stuart dynasty...',
    explPrompt:
      'Protestant peers feared permanent royal suspension of laws & persecution of Protestants...',
    modelFact: 'The birth of a Catholic male heir threatened a permanent Catholic Stuart dynasty.',
    modelExpl:
      'Protestant peers panicked that Protestant heirs Mary and Anne would be displaced by a Catholic succession.',
  },
  {
    num: 19,
    enquiryNum: 5,
    enquiryTitle: 'Enquiry 5: Restoration & Glorious Revolution',
    title: 'William of Orange & Glorious Revolution (1688)',
    stem: 'How did Parliament justify the transfer of the Crown to William and Mary in 1688?',
    factPrompt: 'The ‘Immortal Seven’ invited William of Orange; James II fled London...',
    explPrompt:
      'Parliament declared the throne ‘vacant’ and offered it jointly under statutory rules...',
    modelFact:
      'Seven leading peers invited William of Orange; James II threw the Great Seal into the Thames and fled.',
    modelExpl:
      'Parliament declared that by fleeing, James had abdicated, leaving the throne vacant for a constitutional contract.',
  },
  {
    num: 20,
    enquiryNum: 5,
    enquiryTitle: 'Enquiry 5: Restoration & Glorious Revolution',
    title: 'The Bill of Rights (1689)',
    stem: 'How did the 1689 Bill of Rights permanently transform the power of the English Crown?',
    factPrompt:
      'Banned royal suspension of laws, taxation, and standing armies without Parliament...',
    explPrompt:
      'Created a constitutional monarchy where statutory law is supreme over royal prerogative...',
    modelFact:
      'It banned royal suspension of laws, unparliamentary taxes, and peacetime standing armies.',
    modelExpl:
      'It permanently established parliamentary supremacy, transforming Britain into a constitutional monarchy.',
  },

  // Synoptic Turning Points (Questions 21–24)
  {
    num: 21,
    enquiryNum: 5,
    enquiryTitle: 'Synoptic Chronology & Historical Significance',
    title: 'Transformation of Crown vs Church (1517–1689)',
    stem: 'How did supreme religious authority change between the reign of Henry VIII and 1689?',
    factPrompt: 'Shifted from papal supremacy to Royal Supremacy, then parliamentary regulation...',
    explPrompt:
      'The Church ceased to be an independent European power and became governed by statute...',
    modelFact:
      'Religious power shifted from the Pope in Rome to Royal Supremacy, then statutory toleration under Parliament.',
    modelExpl:
      'The Church was transformed from an autonomous Roman power into an institution regulated by English parliamentary law.',
  },
  {
    num: 22,
    enquiryNum: 5,
    enquiryTitle: 'Synoptic Chronology & Historical Significance',
    title: 'The Fundamental Struggle Over Taxation',
    stem: 'What was the core constitutional conflict over taxation between the Stuarts and Parliament?',
    factPrompt:
      'Kings claimed Divine Right to levy funds; Parliament insisted supply required MP consent...',
    explPrompt:
      'This dispute sparked civil war and was resolved in 1689 by outlawing unparliamentary taxes...',
    modelFact:
      'Monarchs claimed divine prerogative to levy taxes, while Parliament insisted only MPs could grant supply.',
    modelExpl:
      'This dispute directly caused the Civil War and was resolved in 1689 by making unparliamentary taxation illegal.',
  },
  {
    num: 23,
    enquiryNum: 5,
    enquiryTitle: 'Synoptic Chronology & Historical Significance',
    title: '1649 Regicide vs 1689 Bill of Rights',
    stem: 'Why is the 1689 settlement considered more historically permanent than the 1649 execution?',
    factPrompt:
      '1649 created an unstable military dictatorship that collapsed back to monarchy in 1660...',
    explPrompt:
      '1689 created a legal partnership between Crown & Parliament that endures to this day...',
    modelFact: 'The 1649 Republic collapsed into military dictatorship and was overthrown in 1660.',
    modelExpl:
      'The 1689 Bill of Rights established a stable statutory compromise that forms the basis of modern democracy.',
  },
  {
    num: 24,
    enquiryNum: 5,
    enquiryTitle: 'Synoptic Chronology & Historical Significance',
    title: 'Evolution of Parliament (1534–1689)',
    stem: 'How did Parliament’s constitutional role evolve between the 1530s and 1689?',
    factPrompt:
      'Evolved from Henry VIII’s occasional legal tool into the permanent sovereign lawmaker...',
    explPrompt:
      'Free speech, regular elections, and control of finances made Parliament the supreme power...',
    modelFact:
      'Parliament evolved from a royal rubber-stamp under Henry VIII into the permanent supreme lawmaker.',
    modelExpl:
      'Statutory guarantees of free elections, free debate, and taxation control permanently subordinated the Crown to the law.',
  },
];

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
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 13pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Notes
        </h2>
      </div>

      <!-- Ruled Lined Canvas with Left Margin (Exercise Book Standard) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; position: relative; border-top: 1.2px solid #0f284e; margin-bottom: 4px;">
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

// Helper to render Page 23 Complete Department Answer Bank + Examiner Traps Box
function renderAnswerBankPage(pageNum, quip) {
  const col1 = dualRetrievalBank.slice(0, 12);
  const col2 = dualRetrievalBank.slice(12, 24);

  const renderAnswerItem = (q) => `
    <div style="border-bottom: 0.8px solid #e0e0e0; padding: 2px 0; flex: 1; display: flex; flex-direction: column; justify-content: center;">
      <div style="display: flex; justify-content: space-between; align-items: baseline;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; color: #000000;">
          Q${q.num}. ${q.title}
        </strong>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #000000;">[2m]</span>
      </div>
      <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; line-height: 1.25; color: #000000; font-weight: 800; margin-top: 1.5px;">
        <span style="font-weight: 900; color: #000000;">• Fact:</span> ${q.modelFact}
      </div>
      <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; line-height: 1.25; color: #000000; font-weight: 800; margin-top: 1px;">
        <span style="font-weight: 900; color: #000000;">• Explanation:</span> ${q.modelExpl}
      </div>
    </div>`;

  return `
  <!-- PAGE 23: COMPLETE DEPARTMENT ANSWER BANK & EXAMINER TRAP MATRIX -->
  <div class="page page-container recto-page" id="page-23" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 900;">
            Complete Department Answer Bank &bull; 24-Question Dual-Retrieval Key
          </h2>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #333333; font-weight: 600;">
            Standardised Core Factual Knowledge &amp; Causal Explanation Models (Enquiries 1–5 &amp; Synoptic Turning Points)
          </div>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
          Total Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 48 ]
        </span>
      </div>

      <!-- Main Body Container filling vertical space -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between; min-height: 0;">
        <!-- 2-Column Complete Answer Grid -->
        <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 6px 9px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px 16px; flex: 1; align-content: space-between; height: 100%;">
            <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
              ${col1.map(renderAnswerItem).join('')}
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
              ${col2.map(renderAnswerItem).join('')}
            </div>
          </div>
        </div>

        <!-- Common Examiner Traps & Misconceptions Matrix -->
        <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 8px; background: #fafafa;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #000000;">
              ⚠️ Common Examiner Traps &amp; Key Historical Misconceptions
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #333333;">
              GCSE GRADE 7–9 DISCIPLINARY PRECISION
            </span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.24; color: #000000;">
            <div style="border: 0.8px solid #000000; border-radius: 2px; padding: 3px 4px; background: #ffffff;">
              <strong style="display: block; font-size: 6.8pt; color: #000000; margin-bottom: 1px;">1. Supreme Head vs Governor</strong>
              Henry VIII claimed absolute spiritual headship (1534); Elizabeth I deliberately chose ‘Governor’ (1559) to soothe Catholic conscience and avoid Puritan blasphemy claims while retaining legal governance.
            </div>
            <div style="border: 0.8px solid #000000; border-radius: 2px; padding: 3px 4px; background: #ffffff;">
              <strong style="display: block; font-size: 6.8pt; color: #000000; margin-bottom: 1px;">2. 1642 Outbreak vs 1649 Regicide</strong>
              The Civil War was fought in 1642 to curb royal prerogative and enforce parliamentary consent, NOT to kill the King. Regicide in 1649 was a radical minority act after Charles secretly restarted war with Scotland.
            </div>
            <div style="border: 0.8px solid #000000; border-radius: 2px; padding: 3px 4px; background: #ffffff;">
              <strong style="display: block; font-size: 6.8pt; color: #000000; margin-bottom: 1px;">3. 1688 Was an Invited Invasion</strong>
              1688 was NOT a popular rebellion. Seven prominent English peers wrote a secret letter formally inviting Dutch Prince William with 15,000 troops; James II fled, allowing Parliament to claim abdication.
            </div>
            <div style="border: 0.8px solid #000000; border-radius: 2px; padding: 3px 4px; background: #ffffff;">
              <strong style="display: block; font-size: 6.8pt; color: #000000; margin-bottom: 1px;">4. Cromwell: Protector, Not King</strong>
              Oliver Cromwell was offered the crown in the Humble Petition and Advice (1657) but refused it due to Puritan army pressure. He governed as Lord Protector, a military dictatorship, not an anointed monarch.
            </div>
            <div style="border: 0.8px solid #000000; border-radius: 2px; padding: 3px 4px; background: #ffffff;">
              <strong style="display: block; font-size: 6.8pt; color: #000000; margin-bottom: 1px;">5. Ship Money Legal Nuance</strong>
              Ship Money was historically a lawful emergency tax on coastal towns during war. Charles I made it tyrannical by extending it permanently to inland counties in peacetime without parliamentary vote.
            </div>
          </div>
        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, 24)}
    </div>
  </div>`;
}

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
// LEFT PAGE RENDERER: 5-STAGE CHRONOLOGICAL INQUIRY SPINE (MEDICINE/CME STYLE)
// ============================================================================
function renderSpinePage(cfg, pageNum) {
  const stagesHtml = cfg.stages
    .map((st) => {
      // 3 Spaced-out trigger terms, each aligned 1-to-1 with pairs of ruled lines
      const bulletsHtml = st.bullets
        .map(
          (b, idx) => `
            <div style="flex: 1; display: flex; align-items: center; padding: 0 2.5px; ${idx < 2 ? 'border-bottom: 0.8px solid #cbd5e1;' : ''}">
              <div style="display: flex; align-items: flex-start; gap: 2.5px; line-height: 1.15;">
                <span style="font-weight: 900; color: #0f284e; font-size: 5pt; line-height: 1.3;">&bull;</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 700; color: #0f284e; word-break: break-word;">${b}</span>
              </div>
            </div>`,
        )
        .join('');
      return `
        <div class="spine-stage-block" style="display: flex; flex-direction: column; flex: 1; min-height: 0; margin-bottom: 2.5px; border: 1.2px solid #0f284e; border-radius: 2px; overflow: hidden; background: #ffffff;">
          
          <!-- Full-Width Banner with Key Question Across Page -->
          <div class="stage-banner" style="background: #0f284e; color: #ffffff; padding: 2px 7px; display: flex; align-items: center; border-bottom: 1.2px solid #0f284e;">
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1;">
              <span style="background: #ffffff; color: #0f284e; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; padding: 0.5px 5.5px; border-radius: 2px; white-space: nowrap;">
                ${st.step}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; color: #93c5fd; white-space: nowrap;">
                ${st.date}
              </span>
              <span style="color: #60a5fa; font-size: 7pt;">&bull;</span>
              <span style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${st.questionHeading}
              </span>
            </div>
          </div>

          <!-- Content Row: Left 3-Zone Trigger Spine (25mm) & Right Ruled Writing Lines (173mm) -->
          <div style="display: flex; flex: 1; min-height: 0; align-items: stretch;">
            
            <!-- Left Column: Ultra-Compact 25mm Trigger Spine (Each Zone Aligns to 2 Ruled Lines) -->
            <div style="width: 25mm; flex-shrink: 0; background: #f0f4f9; display: flex; flex-direction: column; border-right: 1.2px solid #0f284e; box-sizing: border-box;">
              ${bulletsHtml}
            </div>

            <!-- Right Column: 6 Ruled Note-Taking Lines (Expanded Width ~173mm for Maximum Student Writing Space) -->
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
      
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #0f284e; color: #ffffff; border: 1.2px solid #0f284e; padding: 1px 6px; border-radius: 2px;">
            ENQUIRY ${cfg.lessonNum} &bull; LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #0f284e;">
            YEAR 8 &bull; CROWN, CHURCH, OR PARLIAMENT? (1517–1689)
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #0f284e; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.18;">
          ${cfg.enquiryQuestion}
        </h2>
      </div>

      <!-- Specification Focus Strip -->
      <div style="border: 1px solid #0f284e; border-left: 3.5px solid #0f284e; padding: 2px 6px; background: #f0f4f9; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt; line-height: 1.2; color: #1e293b;">
        <strong style="color: #0f284e;">Core Specification Focus:</strong> ${cfg.specAnchor}
      </div>

      <!-- Chronological Inquiry Spine & Note-Taking Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 1px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #0f284e; padding: 1px 0; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
            Chronological Inquiry Spine &bull; Core Causal Narrative
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #475569;">
            Construct your causal explanation for each stage incorporating the core trigger terms
          </span>
        </div>

        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.leftPageQuip, 16)}
    </div>
  </div>`;
}

// ============================================================================
// RIGHT PAGE RENDERER: ROTATING DISCIPLINARY SKILLS WRITING (PAGES 3, 5, 9, 11, 15)
// ============================================================================
function renderRightPage(cfg, pageNum) {
  const rp = cfg.rightPage;
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  if (rp.type === 'single_12') {
    // 12-MARK CAUSAL / EVALUATIVE ESSAY WRITING
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • 12-MARK EXTENDED ESSAY -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #0f284e; margin: 0; font-weight: 800;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          Extended Writing Practice
        </span>
      </div>

      <!-- Question Stem & Stimulus Box -->
      <div style="border: 1px solid #0f284e; border-left: 3.5px solid #0f284e; border-radius: 3px; padding: 5px 8px; background: #f0f4f9; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #0f284e; margin-bottom: 3px; line-height: 1.25;">
          ${rp.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #1e293b;">
          <strong style="color: #0f284e;">Stimulus:</strong>
          <span style="border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #ffffff;">${rp.stimulus[0]}</span>
          <span style="border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #ffffff;">${rp.stimulus[1]}</span>
          <span style="font-style: italic; color: #475569;">(You must also use information of your own)</span>
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 5px 8px; background: #ffffff; margin-bottom: 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; display: block; margin-bottom: 2px; color: #0f284e;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; line-height: 1.22; display: block; color: #1e293b;">${rp.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; display: block; margin-bottom: 2px; color: #0f284e;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22; display: block; color: #1e293b;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Task Lines for Extended Writing -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #222222; margin-bottom: 2px;">
        <strong style="color: #0f284e;">Task:</strong> Using the vocabulary and connectives above, write your analytical response below:
      </div>
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 4px; flex: 1; min-height: 0;">
        ${Array(25).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
      </div>

      <!-- Timeline Mission Box -->
      <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
            🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e;">
            Turn to Centrefold &bull; Pages 8–9 &rarr;
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 6.9pt; color: #111111; line-height: 1.22;">
          ${rp.timelineMission}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  } else if (rp.type === 'interpretations') {
    // DUAL HISTORIOGRAPHICAL INTERPRETATIONS WRITING (ENQUIRY 3)
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • CONTRASTING INTERPRETATIONS -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #0f284e; margin: 0; font-weight: 800;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          HISTORIOGRAPHICAL ANALYSIS
        </span>
      </div>

      <!-- Competing Historical Interpretations Box -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 4px;">
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 4px 6px; background: #fdfbf7;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2px;">
            Interpretation 1 &bull; ${rp.interpretation1.author}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #1e293b; line-height: 1.22;">
            ${rp.interpretation1.text}
          </div>
        </div>
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 4px 6px; background: #f0f4f9;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2px;">
            Interpretation 2 &bull; ${rp.interpretation2.author}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #1e293b; line-height: 1.22;">
            ${rp.interpretation2.text}
          </div>
        </div>
      </div>

      <!-- Task B: Question 3(b) -->
      <div style="border-bottom: 1.5px solid #0f284e; padding-bottom: 2px; margin-bottom: 4px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e; margin-bottom: 2px;">
          ${rp.questionB}
        </div>
        <div class="ruled-lines-block">
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
        </div>
      </div>

      <!-- Task C: Question 3(c) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        <div>
          <div style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e; margin-bottom: 2px;">
            ${rp.questionC}
          </div>
          <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #f0f4f9; font-family: 'Inter', sans-serif; font-size: 6.7pt; line-height: 1.22; margin-bottom: 3px;">
            <strong style="color: #0f284e;">Scaffolded Sentence Stems:</strong> <span style="color: #1e293b;">${rp.stems}</span>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0; margin-bottom: 3px;">
          ${Array(6).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
        </div>

        <!-- Timeline Mission Box -->
        <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
              🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e;">
              Turn to Centrefold &bull; Pages 8–9 &rarr;
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.9pt; color: #111111; line-height: 1.22;">
            ${rp.timelineMission}
          </div>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  } else {
    // TWO-PART ROTATING SKILLS WRITING (SPLIT: PART A + PART B)
    const partA = rp.partA || {};
    const partB = rp.partB || {};

    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • ROTATING DISCIPLINARY SKILLS -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- PART A: SHORT-FORM DISCIPLINARY PRACTICE [4 OR 8 MARKS] -->
      <div style="border-bottom: 1.5px solid #0f284e; padding-bottom: 4px; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10pt; color: #0f284e; margin: 0; font-weight: 800;">
            ${partA.tariff || 'Question 1: Disciplinary Drill'}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            DISCIPLINARY DRILL
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e; margin: 0 0 2px 0;">
          ${partA.question || ''}
        </p>
        ${partA.hint ? `<div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #475569; margin-bottom: 2px;">${partA.hint}</div>` : ''}
        ${partA.stems ? `<div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-weight: 700; margin-bottom: 2px; color: #1e293b;"><strong style="color: #0f284e;">Sentence Stems:</strong> ${partA.stems}</div>` : ''}
        ${partA.connectives ? `<div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22; background: #f0f4f9; padding: 2px 5px; border-radius: 2px; margin-bottom: 2px;"><strong style="color: #0f284e;">Connectives:</strong> ${partA.connectives}</div>` : ''}
        <div class="ruled-lines-block">
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
        </div>
      </div>

      <!-- PART B: EXTENDED SKILL WRITING [4, 8 OR 12 MARKS] -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 10pt; color: #0f284e; margin: 0; font-weight: 800;">
              ${partB.tariff || 'Question 2: Structured Writing'}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
              STRUCTURED WRITING
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 8.4pt; font-weight: 800; color: #0f284e; margin: 0 0 3px 0; line-height: 1.25;">
            ${partB.question || ''}
          </p>
          ${partB.hint ? `<div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #475569; margin-bottom: 2px;">${partB.hint}</div>` : ''}
          ${
            partB.stimulus
              ? `
          <div style="display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e293b; margin-bottom: 3px;">
            <strong style="color: #0f284e;">Stimulus:</strong>
            <span style="border: 1px solid #0f284e; padding: 0.5px 5px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #f0f4f9;">${partB.stimulus[0]}</span>
            <span style="border: 1px solid #0f284e; padding: 0.5px 5px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #f0f4f9;">${partB.stimulus[1]}</span>
          </div>`
              : ''
          }

          <!-- Connectives & Word Bank -->
          ${
            partB.connectives || partB.stems || partB.wordBank
              ? `
          <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 4px 7px; background: #f0f4f9; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.24;">
            ${partB.connectives ? `<div><strong style="color: #0f284e;">Analytical Connectives:</strong> <em style="color: #1e293b;">${partB.connectives}</em></div>` : ''}
            ${partB.stems ? `<div><strong style="color: #0f284e;">Sentence Stems:</strong> <span style="color: #1e293b;">${partB.stems}</span></div>` : ''}
            ${partB.wordBank ? `<div style="margin-top: 2px;"><strong style="color: #0f284e;">Key Terms:</strong> <span style="color: #1e293b;">${partB.wordBank}</span></div>` : ''}
          </div>`
              : ''
          }
        </div>

        <!-- Ruled Writing Lines (18 Lines • Matching GCSE 7.8mm pitch) -->
        <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 4px; flex: 1; min-height: 0;">
          ${Array(18).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
        </div>

        <!-- Timeline Mission Box -->
        <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
              🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e;">
              Turn to Centrefold &bull; Pages 8–9 &rarr;
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.9pt; color: #111111; line-height: 1.22;">
            ${rp.timelineMission}
          </div>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  }
}
// ============================================================================
// DEDICATED PRIMARY SOURCE WORKSHOP RENDERER (PAGES 6, 7, 16, 17)
// Top Half: Source A (Written) + Provenance Clues + 3 Lines
// Bottom Half: Source B (Visual) + Visual Iconography Guide + 3 Lines
// Bottom Footer: 8-Mark "How Useful" Exam Challenge with Structure Strip
// ============================================================================
function renderSourceWorkshopPage(cfg, pageNum) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';
  const imgBase64 = getBase64Image(cfg.sourceB.imageRelPath) || '';

  return `
  <!-- SOURCE WORKSHOP: ${isEven ? 'VERSO' : 'RECTO'} • ${cfg.title.toUpperCase()} -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- 1. Header Banner -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.2pt; color: #000000; margin: 0; font-weight: 900; letter-spacing: 0.2px;">
          ${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px; text-transform: uppercase; background: #ffffff;">
          ${cfg.tariff}
        </span>
      </div>

      <!-- 2. Question Stem Strip -->
      <div style="border: 1.2px solid #000000; border-left: 4px solid #000000; padding: 3px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.4pt; font-weight: 800; color: #000000; line-height: 1.22;">
          ${cfg.enquiryQuestion}
        </div>
      </div>

      <!-- 3. TOP HALF: SOURCE A (WRITTEN PRIMARY SOURCE) -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3.5px 6px; background: #ffffff; margin-bottom: 3.5px; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2.5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #000000;">
            ${cfg.sourceA.label}
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #444444;">
            Contemporary Written Evidence
          </span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 58mm; gap: 7px; align-items: stretch; margin-bottom: 2.5px;">
          <!-- Verbatim Primary Extract in Archival Card -->
          <div style="background: #faf8f5; border: 1px solid #000000; border-radius: 2px; padding: 3.5px 5px; font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.26; color: #111111; font-style: italic; display: flex; align-items: center;">
            ${cfg.sourceA.text}
          </div>
          <!-- Provenance Analysis Guidance Box -->
          <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 2.5px 4.5px; font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.2; color: #000000; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 900; text-transform: uppercase; border-bottom: 0.8px solid #000000; padding-bottom: 1px; margin-bottom: 1.5px; font-size: 6.4pt;">
              ${cfg.sourceA.provenanceTitle}
            </div>
            ${cfg.sourceA.provenancePrompts.map((p) => `<div>&bull; ${p}</div>`).join('')}
          </div>
        </div>

        <!-- Source A Guided Response Lines -->
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #000000; margin-bottom: 1px;">
            1. Source A Evaluation &bull; Content &amp; Provenance: <span style="font-weight: 400; font-style: italic; color: #333333;">(${cfg.sourceA.analysisPrompt})</span>
          </div>
          <div class="ruled-lines-block">
            <div class="task-line" style="height: 8.0mm;"></div>
            <div class="task-line" style="height: 8.0mm;"></div>
            <div class="task-line" style="height: 8.0mm;"></div>
            <div class="task-line" style="height: 8.0mm;"></div>
          </div>
        </div>
      </div>

      <!-- 4. BOTTOM HALF: SOURCE B (VISUAL PRIMARY SOURCE) -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3.5px 6px; background: #ffffff; margin-bottom: 3.5px; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2.5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #000000;">
            ${cfg.sourceB.label}
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #444444;">
            Contemporary Visual Evidence
          </span>
        </div>

        <div style="display: grid; grid-template-columns: 44mm 1fr; gap: 7px; align-items: stretch; margin-bottom: 2.5px;">
          <!-- Visual Image Plate -->
          <div style="background: #faf8f5; border: 1px solid #000000; border-radius: 2px; padding: 2px; display: flex; justify-content: center; align-items: center;">
            <img src="${imgBase64}" alt="${cfg.sourceB.label}" style="max-height: 40mm; max-width: 100%; object-fit: contain; border: 0.8px solid #000000; display: block;">
          </div>
          <!-- Visual Iconography Guidance Box -->
          <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 2.5px 4.5px; font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.2; color: #000000; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; text-transform: uppercase; border-bottom: 0.8px solid #000000; padding-bottom: 1px; margin-bottom: 1.5px; font-size: 6.4pt;">
                ${cfg.sourceB.iconographyTitle}
              </div>
              ${cfg.sourceB.iconographyPrompts.map((p) => `<div>&bull; ${p}</div>`).join('')}
            </div>
            <div style="font-size: 6.0pt; font-style: italic; color: #444444; border-top: 0.8px dashed #cccccc; padding-top: 1px; margin-top: 1px;">
              ${cfg.sourceB.caption}
            </div>
          </div>
        </div>

        <!-- Source B Guided Response Lines -->
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #000000; margin-bottom: 1px;">
            2. Source B Evaluation &bull; Visual Evidence &amp; Purpose: <span style="font-weight: 400; font-style: italic; color: #333333;">(${cfg.sourceB.analysisPrompt})</span>
          </div>
          <div class="ruled-lines-block">
            <div class="task-line" style="height: 8.0mm;"></div>
            <div class="task-line" style="height: 8.0mm;"></div>
            <div class="task-line" style="height: 8.0mm;"></div>
            <div class="task-line" style="height: 8.0mm;"></div>
          </div>
        </div>
      </div>

      <!-- 5. Comparative Utility Verdict Response -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3.5px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #000000; margin-bottom: 1px;">
          3. Comparative Utility Verdict &bull; Final Synthesis: <span style="font-weight: 400; font-style: italic; color: #333333;">(Compare both sources &bull; Which provides greater historical insight into this enquiry, and why?)</span>
        </div>
        <div class="ruled-lines-block">
          <div class="task-line" style="height: 8.0mm;"></div>
          <div class="task-line" style="height: 8.0mm;"></div>
          <div class="task-line" style="height: 8.0mm;"></div>
        </div>
      </div>

      <!-- 6. Structure Strip & Utility Exam Strategy -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.22;">
        ${cfg.structureStrip}
      </div>

      ${renderFooterStrip(pageNum, cfg.quip, 24)}
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
  <title>The Second British Empire (1783–1914) Pupil Workbook</title>
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
      border-top: 0.8px solid #0f284e;
      padding-top: 1.5px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      line-height: 1.15;
      color: #000000;
    }
    .footer-quip {
      font-style: italic;
      color: #475569;
      white-space: nowrap;
    }
    .footer-page-num {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      white-space: nowrap;
      color: #0f284e;
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
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
      </div>

      <!-- Main Title Block -->
      <div style="text-align: center; margin: 2px 0 6px 0;">
        <div style="display: inline-block; border: 1.5px solid #0f284e; color: #ffffff; background: #0f284e; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; padding: 2px 10px; border-radius: 3px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
          Year 8 Enquiry &bull; 1783–1914
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 22pt; line-height: 1.15; color: #0f284e; margin: 2px 0 3px 0; font-weight: 900;">
          The Second British Empire (1783–1914)
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 10pt; color: #334155; font-style: italic; font-weight: 600;">
          Chartered Trade, Transatlantic Slavery, Maroon Resistance & The American Revolution
        </div>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Clive Full Canvas in Authentic Color + Disciplinary Iconography Plate) -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="display: grid; grid-template-columns: 62mm 1fr; background: #ffffff;">
          <!-- Left: Full-Length Uncropped Portrait in Rich Authentic Color -->
          <div style="background: #fcfbf9; border-right: 1.5px solid #0f284e; display: flex; justify-content: center; align-items: center; padding: 2px 3px;">
            <img src="${coverImgBase64}" alt="Major-General Robert Clive Portrait by Nathaniel Dance" style="height: 101mm; width: auto; max-width: 100%; object-fit: contain; display: block; margin: 0 auto; border: 1.2px solid #0f284e; border-radius: 2px; box-shadow: 0 2px 6px rgba(15,40,78,0.22);">
          </div>
          <!-- Right: Visual Iconography & Historical Significance for Year 8 -->
          <div style="padding: 6px 10px; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff; box-sizing: border-box;">
            <!-- 1. Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; padding-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; color: #0f284e; letter-spacing: 0.5px;">
                Primary Visual Evidence &bull; Corporate Imperial Statecraft
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #64748b;">
                Nathaniel Dance-Holland (c. 1773)
              </span>
            </div>

            <!-- 2. Statecraft Context -->
            <p style="font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.3; color: #1e293b; margin: 0;">
              Following the 1757 Battle of Plassey and the 1765 Treaty of Allahabad, the East India Company transitioned from a maritime trading outfit into a military ruler collecting taxes from 20 million Bengalis. Nathaniel Dance portrayed Robert Clive not as an administrator, but as an imperial general:
            </p>

            <!-- 3. Four Core Propaganda Features -->
            <div style="display: flex; flex-direction: column; gap: 3px;">
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">1. Stance of Imperial Authority:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Clive stands resolute in scarlet regimental uniform, sword belt fastened, projecting military command over Indian sovereign territories.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">2. The Bengal Battlefield:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  In the background, sepoy infantry drill beneath smoke and battle pennants, symbolising the privatised corporate army that conquered Bengal.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">3. Royal &amp; Corporate Honours:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Embroidered badges of the Order of the Bath honour Clive’s elevation to the peerage funded by astronomical private plunder ('jagirs').
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">4. The Obscured Reality:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  The painting glorifies military prestige while obscuring the horrific 1770 Bengal famine where corporate grain speculation devastated millions.
                </div>
              </div>
            </div>

            <!-- 4. Three-Pillar Propaganda Decoding Matrix -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; padding-top: 3px; border-top: 1px solid #cbd5e1;">
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2.5px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Scarlet Coat</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Crown recognition of Company military conquest.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2.5px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Drawn Sword</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Armed force as foundation of trade monopoly.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2.5px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Bengal Plain</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Vast territorial wealth seized from Mughals.</div>
              </div>
            </div>

            <!-- 5. Disciplinary Significance Anchor -->
            <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #1e293b; line-height: 1.25; background: #f0f4f9; border-left: 2.5px solid #0f284e; padding: 2px 6px;">
              <strong style="text-transform: uppercase; color: #0f284e;">Disciplinary Significance:</strong> In 18th-century imperial expansion, portraiture transformed private corporate commanders into national martial heroes to justify unprecedented chartered monopolies to Parliament.
            </div>

            <!-- 6. Targeted Disciplinary Hinge Question -->
            <div style="background: #ffffff; border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 6px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Disciplinary Hinge Question:</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; color: #64748b; text-transform: uppercase;">Historical Evaluation</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #1e293b; line-height: 1.2; margin-top: 1px;">
                Does this portrait portray Clive as an honourable servant of the British nation, or does it disguise a reckless corporate plunderer whose greed destabilised an entire subcontinent?
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #ffffff; padding: 3px 8px; border-top: 1.5px solid #0f284e; background: #0f284e;">
          <span><strong>Primary Visual Evidence:</strong> <em>Major-General Robert Clive, Baron Clive of Plassey</em> &bull; Nathaniel Dance-Holland (c. 1773)</span>
          <span style="font-weight: 700; color: #93c5fd;">NATIONAL PORTRAIT GALLERY &bull; LONDON</span>
        </div>
      </div>

      <!-- Disciplinary Strategy Overview & Workbook Blueprint -->
      <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 5px 8px; background: #f0f4f9; margin: 3px 0 6px 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
        <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            1. Chronological Spines [Enquiries 1–5]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Structured chronological note-taking on each left page: 5 causal stages guiding pupil understanding as the teacher narrates the history.
          </div>
        </div>
        <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            2. Disciplinary Writing Practice [4m, 8m, 12m]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Targeted extended writing on each right page: causal explanation, narrative account, difference, and constitutional evaluation.
          </div>
        </div>
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            3. Centrefold Timeline &amp; Notes Portfolio
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Centrefold Living Timeline dual-coding sketchpads (pp. 8–9) and dedicated lined notes &amp; essay planning pages (pp. 14–15).
          </div>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin: 2px 0 2px 0;">
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
              <td style="padding: 7px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 1: The East India Company &amp; Mughal Bengal (1600–1757)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  How did a private chartered trading company seize sovereign military control of Bengal?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 2: The Transatlantic Slave Trade &amp; The Middle Passage (1619–1788)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  How did British merchants organise transatlantic human trafficking, and how was it endured?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 3: Plantation Reality, Queen Nanny &amp; Maroon Resistance (1655–1740)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  How did enslaved Africans actively resist colonial bondage in the Caribbean?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 4: The Thirteen Colonies, Proclamation &amp; Boston Tea Party (1763–1773)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  Why did imperial taxation drive American colonists from loyal British subjects to open rebellion?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 5: The American Revolution, 1776 &amp; The Black Loyalists (1775–1783)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  How did colonial rebellion dismantle the First British Empire and reshape global liberty?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${renderFooterStrip(1, 'If you think politics today is messy, King Henry VIII invented a whole new church because his divorce paperwork took too long.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: ENQUIRY 1 (HENRY VIII & BREAK WITH ROME)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[0], 2);
  html += renderRightPage(enquiryConfigs[0], 3);

  // ====================================================================
  // PAGES 4–5: ENQUIRY 2 (THE ELIZABETHAN SETTLEMENT)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[1], 4);
  html += renderRightPage(enquiryConfigs[1], 5);

  // ====================================================================
  // PAGES 6–7: ENQUIRY 3 (THE SPANISH ARMADA & MARITIME POWER)
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
        <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 1: Chartered Trade, Slavery &amp; Resistance (1600–1740)
          </h2>
        </div>

        <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e293b;">
          <strong style="color: #0f284e;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 1: 1600 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1600 &bull; Foundation of the East India Company
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Queen Elizabeth I grants a royal charter to 218 London merchants, establishing an exclusive trade monopoly over the Indian Ocean for spices, calico, and silk.
          </p>
        </div>

        <!-- Milestone 2: 1619 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1619 &bull; First Enslaved Africans Arrive in Virginia
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            A privateer ship lands around twenty captive Angolans at Point Comfort, Virginia, marking the beginning of hereditary chattel slavery in British North America.
          </p>
        </div>

        <!-- Milestone 3: 1655 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1655 &bull; Cromwell’s Conquest of Jamaica
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Oliver Cromwell’s navy seizes Jamaica from Spain; Spanish enslaved people flee into the Blue Mountains to form free Maroon societies, while coastal plains become sugar factories.
          </p>
        </div>

        <!-- Milestone 4: 1739 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1739 &bull; Queen Nanny &amp; The British-Maroon Treaty
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Following decades of mountain guerrilla warfare, Governor Trelawny signs a treaty granting 1,500 sovereign acres and self-government to the Jamaican Maroons.
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
        <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 2: Plassey, The Boston Tea Party &amp; Revolution (1757–1783)
          </h2>
        </div>

        <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e293b;">
          <strong style="color: #0f284e;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 5: 1757–1765 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1757–1765 &bull; Battle of Plassey &amp; The Diwani Treaty
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Robert Clive defeats Siraj ud-Daulah at Plassey; Emperor Shah Alam II grants the Diwani, handing sovereign tax-raising powers over 20 million Bengalis to a private company.
          </p>
        </div>

        <!-- Milestone 6: 1770 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1770 &bull; The Boston Massacre
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            British redcoats fire into an angry mob outside Boston Custom House, killing five civilians; Paul Revere’s incendiary propaganda engraving unites colonial resistance.
          </p>
        </div>

        <!-- Milestone 7: 1773 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1773 &bull; The Boston Tea Party
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Sons of Liberty disguised as Mohawks dump 342 chests of British East India Company tea (£1.5m) into Boston Harbour, triggering the punitive Coercive Acts.
          </p>
        </div>

        <!-- Milestone 8: 1776–1783 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1776–1783 &bull; The 1776 Declaration &amp; The Black Loyalists
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Jefferson proclaims unalienable rights; Lord Dunmore frees thousands of Black Loyalists; following Yorktown, Britain signs the 1783 Treaty of Paris, ending the First Empire.
          </p>
        </div>

      </div>

      ${renderFooterStrip(9, 'From Bengal to Boston, commercial exploitation and imperial taxation provoked rebellion and transformed the globe.', 16)}
    </div>
  </div>
  `;

  // ====================================================================
  // PAGES 10–11: ENQUIRY 4 (CIVIL WAR & REGICIDE)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[3], 10);
  html += renderRightPage(enquiryConfigs[3], 11);

  // ====================================================================
  // PAGES 12–13: ENQUIRY 5 (CROWN, CHURCH, OR PARLIAMENT?)
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
  // PAGE 16: OUTSIDE BACK COVER (PROGRESS LEDGER + 5 QR CODES - MEDICINE STYLE)
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
              Recalls key historical narrative facts; describes basic imperial events using guided sentence starters.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Add dates &amp; key vocabulary.
            </div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Emerging+ (3)
              </div>
              Identifies reasons for events; begins to describe causes of colonial expansion, trade, and conflict with structured paragraphs.
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
              Explains multiple causes &amp; consequences; writes structured causal paragraphs using precise treaties, dates, and historical terms.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Compare relative importance.
            </div>
          </div>
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px; background: #f0f4f9; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Expected+ (6–7)
              </div>
              Analyses causal significance; evaluates competing historical interpretations and weighs counter-arguments with detailed evidence.
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
              Sustained, nuanced evaluative judgement; synthesises global trade, human exploitation, and political revolution across the 1783–1914 period.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 2px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Nuanced historical judgement.
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
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 1: The East India Company &amp; Bengal</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Inference &amp; Similarity: Company Rule &amp; Plassey (1600–1765)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 2: The Transatlantic Slave Trade</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Forensic Source Follow-Up &amp; Middle Passage (1619–1788)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 3: Plantation Reality &amp; Maroons</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Historical Interpretations: Enslaved Resistance (1655–1740)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 4: Thirteen Colonies &amp; Boston Tea Party</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Narrative Account &amp; Importance: Boston Tea Party (1763–1773)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 5: American Revolution &amp; Loyalists</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Evaluative Statement Essay: Revolutionary War (1775–1783)</div>
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

      <!-- Interactive Digital Quizzing Hub (Medicine Style) -->
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
              const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=second_british_empire&lesson=${idx}&quiz=true`;
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Company & Bengal',
                'Slave Trade',
                'Maroons & Sugar',
                'Boston Tea',
                'Revolution 1776',
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

      ${renderFooterStrip(16, 'From the shores of Bengal to the harbour of Boston, revision is the key to historical mastery. Scan to test your recall.', 16)}
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
    'Rendering 16-Page A4 Pupil Workbook (Medicine/CME Standard): The Second British Empire (1783–1914)...',
  );

  const outDir = path.join(ROOT_DIR, 'public', 'units', 'second_british_empire');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outHtmlPath = path.join(outDir, 'pupil_workbook.html');
  const html = compileEmpireWorkbook();
  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(`[OK] HTML written to: ${outHtmlPath}`);

  const altUnitsDir = path.join(ROOT_DIR, 'units', 'second_british_empire');
  if (fs.existsSync(altUnitsDir)) {
    fs.writeFileSync(path.join(altUnitsDir, 'pupil_workbook.html'), html, 'utf8');
    console.log(`[OK] HTML mirrored to: ${path.join(altUnitsDir, 'pupil_workbook.html')}`);
  }

  // Compile PDF via Puppeteer
  const pdfDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
  const outPdfPath = path.join(pdfDir, 'second_british_empire_pupil_workbook.pdf');

  console.log('Launching Puppeteer to generate high-resolution print PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
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
  const v17PdfPath = path.join(pdfDir, 'second_british_empire_pupil_workbook_FINAL_V17.pdf');
  fs.copyFileSync(outPdfPath, v17PdfPath);
  console.log(`[OK] PDF successfully compiled: ${outPdfPath}`);
  console.log(`[OK] V17 PDF successfully compiled: ${v17PdfPath}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error during workbook compilation:', err);
    process.exit(1);
  });
}

module.exports = { compileEmpireWorkbook };

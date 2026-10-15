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
        paraRef: '[1.4]',
        questionHeading: 'How did HMS Warrior render all wooden naval fleets obsolete overnight?',
        bullets: ['Four-Inch Iron Armour Plates', 'Twin Steam Engines', 'Bouncing Cannon Shells'],
        focusClue:
          'Why did the launch of HMS Warrior in 1860 trigger a worldwide naval revolution in ironclad technology?',
      },
      {
        step: 5,
        date: '1889',
        paraRef: '[1.5]',
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
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
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
        paraRef: '[2.1]',
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
        paraRef: '[2.2]',
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
        paraRef: '[2.3]',
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
        paraRef: '[2.4]',
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
        paraRef: '[2.5]',
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
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
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
        paraRef: '[3.1]',
        questionHeading:
          'Why did Lord Dalhousie’s Doctrine of Lapse alienate Indian royal dynasties?',
        bullets: ['Seizing Heirless Kingdoms', 'Satara, Nagpur, Jhansi', 'Annexing Wealthy Awadh'],
        focusClue:
          'Why did confiscating kingdoms lacking biological male heirs provoke fury among Indian aristocrats and soldiers?',
      },
      {
        step: 2,
        date: 'Early 1857',
        paraRef: '[3.2]',
        questionHeading:
          'Why was the Enfield rifle cartridge the explosive catalyst for rebellion?',
        bullets: ['Greased Paper Tubes', 'Biting Cow and Pig Fat', 'Fear of Forced Conversion'],
        focusClue:
          'Why did biting animal grease confirm sepoy fears that the Company planned forced Christian conversion?',
      },
      {
        step: 3,
        date: 'May 1857',
        paraRef: '[3.3]',
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
        paraRef: '[3.4]',
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
        paraRef: '[3.5]',
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
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
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
        paraRef: '[4.1]',
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
        paraRef: '[4.2]',
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
        paraRef: '[4.3]',
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
        paraRef: '[4.4]',
        questionHeading:
          'How did Rudyard Kipling construct the moral myth of "The White Man\'s Burden"?',
        bullets: ['Poem in The Times', 'Claiming Selfless Duty', 'Racist Slur Half-Devil'],
        focusClue:
          'Why did Victorian imperialists claim colonial rule was a moral duty rather than a profitable business?',
      },
      {
        step: 5,
        date: '1920',
        paraRef: '[4.5]',
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
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
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
        paraRef: '[5.1]',
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
        paraRef: '[5.2]',
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
        paraRef: '[5.3]',
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
        paraRef: '[5.4]',
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
        paraRef: '[5.5]',
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
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
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
            YEAR 8 &bull; THE SECOND BRITISH EMPIRE (1783–1914)
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
    // 12-MARK CAUSAL / EVALUATIVE ESSAY WRITING
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
    // DUAL HISTORIOGRAPHICAL INTERPRETATIONS WRITING
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
    // TWO-PART ROTATING SKILLS WRITING (SPLIT: PART A + PART B)
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
              STRUCTURED WRITING
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 900; color: #000000; margin: 0 0 3px 0; line-height: 1.25;">
            ${partB.question || ''}
          </p>
          ${partB.hint ? `<div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 2px;">${partB.hint}</div>` : ''}
          ${
            partB.stimulus
              ? `
          <div style="display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #000000; margin-bottom: 3px;">
            <strong style="color: #000000;">Stimulus:</strong>
            <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${partB.stimulus[0]}</span>
            <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${partB.stimulus[1]}</span>
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
          ${Array(18).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
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
    getBase64Image('images/imperial_federation_map.jpg') ||
    getBase64Image('public/images/imperial_federation_map.jpg') ||
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
          Naval Hegemony, De-industrialisation, The 1857 Rebellion &amp; The Scramble for Africa
        </div>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Landscape Showcase + Underneath Analytical Deck) -->
      <div style="margin: 2px 0 4px 0; border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff;">
        
        <!-- 1. Top Artwork Showcase (Full-Width Cinematic Landscape Banner) -->
        <div style="background: #fcfbf9; border-bottom: 1.5px solid #0f284e; display: flex; justify-content: center; align-items: center; padding: 4px 6px; height: 89mm; box-sizing: border-box;">
          <img src="${coverImgBase64}" alt="Imperial Federation Map 1886" style="height: 100%; width: auto; max-width: 100%; object-fit: contain; display: block; margin: 0 auto; border: 1.2px solid #0f284e; border-radius: 2px; box-shadow: 0 2px 6px rgba(15,40,78,0.22);">
        </div>

        <!-- 2. Analytical Decomposition Deck (Arranged Underneath in Clean Dual Columns) -->
        <div style="padding: 5px 8px; background: #ffffff; display: grid; grid-template-columns: 1.15fr 1fr; gap: 8px; box-sizing: border-box;">
          
          <!-- Left Column: Context & 4 Core Features -->
          <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 3px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; color: #0f284e; letter-spacing: 0.5px;">
                Visual Decoding &bull; 4 Core Features
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #64748b;">
                Walter Crane (1886)
              </span>
            </div>
            
            <p style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.2; color: #1e293b; margin: 0;">
              Published for Queen Victoria’s Golden Jubilee, Walter Crane illustrated British global dominion, placing Britannia enthroned atop the world surrounded by colonial subjects:
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 6px;">
              <div style="border-left: 2px solid #0f284e; padding-left: 4px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e; display: block;">1. Global Sovereignty:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 6.6pt; line-height: 1.15; color: #222222;">
                  Britannia enthroned with trident and shield, commanding world oceans with the British lion.
                </div>
              </div>
              <div style="border-left: 2px solid #0f284e; padding-left: 4px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e; display: block;">2. Imperial Red Shading:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 6.6pt; line-height: 1.15; color: #222222;">
                  Every colony tinted red on Mercator projection, exaggerating British worldwide territory.
                </div>
              </div>
              <div style="border-left: 2px solid #0f284e; padding-left: 4px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e; display: block;">3. Naval Sea Lanes:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 6.6pt; line-height: 1.15; color: #222222;">
                  Global steam trade routes guarded by Royal Navy ironclads, asserting industrial hegemony.
                </div>
              </div>
              <div style="border-left: 2px solid #0f284e; padding-left: 4px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e; display: block;">4. Subordinated Peoples:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 6.6pt; line-height: 1.15; color: #222222;">
                  Colonial subjects depicted bearing commodities, legitimising racial hierarchy as natural order.
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: 3-Pillar Matrix + Significance + Hinge Question -->
          <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 3px;">
            <!-- Three-Pillar Visual Matrix -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px;">
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 4px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Red Shading</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.3pt; line-height: 1.12; color: #1e293b; margin-top: 1px;">Dominance on global Mercator maps.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 4px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Britannia’s Trident</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.3pt; line-height: 1.12; color: #1e293b; margin-top: 1px;">Naval supremacy under Two-Power Standard.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 4px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Labouring Subjects</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.3pt; line-height: 1.12; color: #1e293b; margin-top: 1px;">Moral justification for resource extraction.</div>
              </div>
            </div>

            <!-- Disciplinary Significance Anchor -->
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #1e293b; line-height: 1.2; background: #f0f4f9; border-left: 2.5px solid #0f284e; padding: 2px 6px;">
              <strong style="text-transform: uppercase; color: #0f284e;">Disciplinary Significance:</strong> In late 19th-century Britain, popular cartography transformed colonial conquest into a glorious imperial federation, hiding the violent realities of exploitation behind colourful patriotic propaganda.
            </div>

            <!-- Targeted Disciplinary Hinge Question -->
            <div style="background: #ffffff; border: 1.2px solid #0f284e; border-radius: 3px; padding: 2.5px 6px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Disciplinary Hinge Question:</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #64748b; text-transform: uppercase;">Evaluation</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #1e293b; line-height: 1.18; margin-top: 1px;">
                Does this map celebrate a cooperative global commonwealth of mutual progress, or does it disguise a coercive racial empire sustained by naval dominance and economic extraction?
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Bottom Museum Provenance Banner -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #ffffff; padding: 2.5px 8px; border-top: 1.5px solid #0f284e; background: #0f284e;">
          <span><strong>Primary Visual Evidence:</strong> <em>Imperial Federation: Map of the World Showing the Extent of the British Empire in 1886</em> &bull; Walter Crane</span>
          <span style="font-weight: 700; color: #93c5fd; white-space: nowrap;">BRITISH LIBRARY ARCHIVE &bull; MAPS 957.(46.)</span>
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
                  Enquiry 1: Engines of Empire: Mercantilism, Naval Hegemony &amp; Portsmouth Dockyard (1783–1889)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  How was the British Empire built and sustained through maritime industrial power?
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
                  Enquiry 2: The De-industrialisation of India: The Company &amp; Handloom Crisis (1700–1850)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  How did British corporate rule transform India from the world’s textile workshop into a captive market?
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
                  Enquiry 3: The 1857 Indian Rebellion: Sepoy Grievance, Rani Lakshmibai &amp; The Raj (1848–1858)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  Was the 1857 Indian Rebellion a limited military mutiny or a war for national liberation?
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
                  Enquiry 4: The Scramble for Africa &amp; Imperial Ideology: Maxim Guns &amp; Plunder (1884–1920)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  Why did European powers partition Africa after 1884, and was it a civilising mission or armed resource theft?
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
                  Enquiry 5: The Imperial Verdict: Workshop of the World or Age of Exploitation? (1851–1901)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  Did the British Empire bring global modernisation and order, or economic exploitation and devastation?
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

      ${renderFooterStrip(1, 'Between 1783 and 1914, Britain ruled a quarter of the globe through industrial manufacturing, naval supremacy, and colonial extraction.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: ENQUIRY 1 (ENGINES OF EMPIRE & MARITIME SUPREMACY)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[0], 2);
  html += renderRightPage(enquiryConfigs[0], 3);

  // ====================================================================
  // PAGES 4–5: ENQUIRY 2 (THE DE-INDUSTRIALISATION OF INDIA)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[1], 4);
  html += renderRightPage(enquiryConfigs[1], 5);

  // ====================================================================
  // PAGES 6–7: ENQUIRY 3 (THE 1857 INDIAN REBELLION & THE RAJ)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[2], 6);
  html += renderRightPage(enquiryConfigs[2], 7);

  // ====================================================================
  // PAGES 8–9: THE LIVING TIMELINE IN THE EXACT PHYSICAL CENTREFOLD!
  // ====================================================================
  html += `
    <!-- PAGE 8: LIVING TIMELINE PART 1 (MILESTONES 1–4: 1783–1858) -->
  <div class="page page-container verso-page" id="page-8" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.8pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 1: Naval Power, Handlooms &amp; The 1857 Rebellion (1783–1858)
          </h2>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 1: 1783–1805 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1783–1805 &bull; Portsmouth Royal Dockyard &amp; Naval Hegemony
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Portsmouth Royal Dockyard operates as the world’s largest industrial factory complex, building and maintaining the Royal Navy fleet that secures total command of global sea lanes at Trafalgar.
          </p>
        </div>

        <!-- Milestone 2: 1813–1834 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1813–1834 &bull; The De-industrialisation of Bengal Handlooms
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            British protectionist tariffs and steam-powered Lancashire mills flood India with cheap machine cloth; Dhaka’s historic handloom weaving collapses, impoverishing millions of weavers.
          </p>
        </div>

        <!-- Milestone 3: 1857 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1857 &bull; The Enfield Rifle Cartridge &amp; Meerut Uprising
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Sepoys at Meerut revolt after being forced to bite paper cartridges greased with cow and pig fat, marching on Delhi to restore Emperor Bahadur Shah Zafar as symbolic head of the rebellion.
          </p>
        </div>

        <!-- Milestone 4: 1858 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1858 &bull; Rani Lakshmibai of Jhansi &amp; The British Raj
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            The Queen of Jhansi is killed fighting on horseback at Gwalior; Parliament abolishes the East India Company and passes the 1858 Government of India Act, inaugurating the direct British Raj.
          </p>
        </div>

      </div>

      ${renderFooterStrip(8, 'Centrefold timeline: Dual-coding sketches and dates turns narrative history into permanent long-term memory.', 16)}
    </div>
  </div>

  <!-- PAGE 9: LIVING TIMELINE PART 2 (MILESTONES 5–8: 1860–1901) -->
  <div class="page page-container recto-page" id="page-9" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.8pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 2: Ironclads, The Scramble for Africa &amp; The Drain of Wealth (1860–1901)
          </h2>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 5: 1860 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1860 &bull; Launch of HMS Warrior at Portsmouth
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Britain launches the revolutionary iron-hulled steam warship HMS Warrior; protected by four-inch wrought iron armour plates, it renders all existing wooden navies instantaneously obsolete.
          </p>
        </div>

        <!-- Milestone 6: 1884–1885 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1884–1885 &bull; The Berlin West Africa Conference
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Fourteen European powers meet in Berlin to partition Africa under the principle of Effective Occupation; zero African leaders are invited as Europeans draw arbitrary border lines across the continent.
          </p>
        </div>

        <!-- Milestone 7: 1889 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1889 &bull; The Two-Power Standard Naval Defence Act
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Parliament passes the Naval Defence Act, legally requiring the Royal Navy to maintain a fleet of battleships equal to or greater than the combined naval strength of the next two strongest world navies.
          </p>
        </div>

        <!-- Milestone 8: 1898–1901 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1898–1901 &bull; Maxim Guns at Omdurman &amp; The Drain of Wealth
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiries 4 &amp; 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Automatic Maxim guns slaughter 10,000 Sudanese warriors at Omdurman; Dadabhai Naoroji publishes his book proving Britain extracted millions in unreturned taxes from India.
          </p>
        </div>

      </div>

      ${renderFooterStrip(9, 'From Portsmouth Royal Dockyard to the plains of Bengal, imperial hegemony transformed the modern world.', 16)}
    </div>
  </div>
  `;

  // ====================================================================
  // PAGES 10–11: ENQUIRY 4 (THE SCRAMBLE FOR AFRICA & IMPERIAL IDEOLOGY)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[3], 10);
  html += renderRightPage(enquiryConfigs[3], 11);

  // ====================================================================
  // PAGES 12–13: ENQUIRY 5 (THE IMPERIAL VERDICT: WORKSHOP OR EXPLOITATION?)
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
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 1: Engines of Empire: Mercantilism &amp; Portsmouth Dockyard</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Explain Why Essay: Maritime Supremacy &amp; Two-Power Standard (1783–1889)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 2: The De-industrialisation of India &amp; Handloom Crisis</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Explain Why Essay: Tariffs, Lancashire Steam &amp; Weavers (1700–1850)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 3: The 1857 Indian Rebellion &amp; Rani Lakshmibai</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Explain Why Essay: Sepoy Mutiny, Cartridge Crisis &amp; The Raj (1848–1858)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 4: The Scramble for Africa &amp; Imperial Ideology</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Explain Why Essay: Berlin Conference, Maxim Guns &amp; Quinine (1884–1920)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 5: The Imperial Verdict: Workshop or Exploitation?</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Explain Why Essay: Naoroji Drain of Wealth vs Infrastructure (1851–1901)</div>
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
              const lessonIndices = [0, 1, 1, 3, 4];
              const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=second_british_empire&lesson=${lessonIndices[idx]}&quiz=true`;
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Portsmouth & Navy',
                'India De-industrial',
                '1857 Rebellion',
                'Scramble Africa',
                'Imperial Verdict',
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

      ${renderFooterStrip(16, 'From Portsmouth Royal Dockyard to the plains of Bengal, revision is the key to historical mastery. Scan to test your recall.', 16)}
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
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

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

  const coverElem = await page.$('#page-1');
  if (coverElem) {
    const previewPath = path.join(
      ROOT_DIR,
      'public',
      'images',
      'second_british_empire_cover_redesign_preview.png',
    );
    await coverElem.screenshot({ path: previewPath });
    const artifactDest = path.join(
      'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\3b641322-c353-4e66-858d-2203cdb22b36',
      'second_british_empire_cover_redesign_preview.png',
    );
    try {
      fs.copyFileSync(previewPath, artifactDest);
    } catch (_) {}
  }

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

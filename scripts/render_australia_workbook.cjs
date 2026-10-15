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
// 5 Dedicated The History of Australia Enquiry Configurations
// Gold-Standard Christine Counsell 5-Act Decimal Standard
// ============================================================================
const enquiryConfigs = [
  {
    lessonNum: 1,
    id: 'lesson_1',
    title: 'Enquiry 1: Claiming Australia: Cook, Tupaia & Terra Nullius (1768–1770)',
    enquiryQuestion:
      'What is the significance of Captain Cook’s voyage on the Endeavour in 1768 for the story of colonisation?',
    specAnchor:
      'Secret Admiralty instructions; Polynesian star navigator Tupaia; Botany Bay encounter with Gweagal warriors; Possession Island declaration; legal fiction of terra nullius.',
    stages: [
      {
        step: 1,
        paraRef: '[1.1]',
        date: '1768–1769',
        questionHeading:
          'Why did the British Admiralty issue secret imperial instructions to Captain Cook?',
        bullets: ['Transit of Venus', 'Secret Admiralty Orders', 'Great Southern Land'],
        focusClue:
          'How did the British government use a scientific astronomical mission to mask an aggressive search for Pacific imperial territory?',
      },
      {
        step: 2,
        paraRef: '[1.2]',
        date: '1769–1770',
        questionHeading:
          'How did Tupaia’s navigational mastery enable the Endeavour to reach New Zealand and Australia?',
        bullets: ['130 Pacific Islands', 'Non-Instrument Navigation', 'Indigenous Guidance'],
        focusClue:
          "Why does Tupaia's mental map of Oceania challenge the Eurocentric concept of 'discovery' in the South Pacific?",
      },
      {
        step: 3,
        paraRef: '[1.3]',
        date: 'April 1770',
        questionHeading:
          'How did the Dharawal and Gweagal warriors defend their ancestral lands at Botany Bay?',
        bullets: ['Two Gweagal Warriors', 'Defensive Spear Protocol', 'British Musket Fire'],
        focusClue:
          "Why did the Gweagal warriors shout 'Walla walla ma' and throw stones, and how did British gunshots violate Indigenous law?",
      },
      {
        step: 4,
        paraRef: '[1.4]',
        date: 'August 1770',
        questionHeading:
          'Why did Captain Cook claim eastern Australia on Possession Island without a treaty?',
        bullets: ['Torres Strait Island', 'Union Jack Flag', 'New South Wales Claim'],
        focusClue:
          "Why did Cook ignore the Admiralty instructions requiring 'consent of the natives' when claiming the continent for King George III?",
      },
      {
        step: 5,
        paraRef: '[1.5]',
        date: '1770–1788',
        questionHeading:
          'How did the legal fiction of terra nullius justify British dispossession of First Nations peoples?',
        bullets: ['European Property Law', 'No Treaties Signed', 'Two Centuries Dispossession'],
        focusClue:
          'How did European assumptions regarding fences, agriculture, and property erase 65,000 years of Indigenous land management?',
      },
    ],
    vocabPrompt:
      'Define <strong>Terra Nullius</strong> and explain how it legally erased First Nations sovereignty from Australian history:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      examStem:
        'Explain why the British Empire claimed eastern Australia and declared it terra nullius between 1768 and 1788. [12 marks]',
      stimulus: [
        'Secret Admiralty instructions to locate the Great Southern Land',
        'Joseph Banks’s reports of Botany Bay and European property law',
      ],
      structureStrip: [
        {
          col: '1. IMPERIAL RIVALRY',
          text: 'Explain how competition with France and naval strategy drove the British Crown to seek Pacific territory.',
        },
        {
          col: '2. CARTOGRAPHY & SURVEYING',
          text: 'Explain how maritime navigation, Indigenous guidance, and coastal charts identified Botany Bay.',
        },
        {
          col: '3. LEGAL DOCTRINE',
          text: "Explain why British jurists dismissed Indigenous custodianship and classified the continent as nobody's land.",
        },
      ],
      connectives:
        'A primary reason for this development was that... &bull; In particular, a decisive factor was... &bull; Furthermore, strategic naval factors demonstrated that... &bull; Crucially, an important legal justification occurred when... &bull; Consequently, this resulted in...',
      wordBank:
        'Captain James Cook &bull; Admiralty secret orders &bull; Tupaia &bull; Endeavour &bull; Botany Bay &bull; Gweagal clan &bull; Possession Island &bull; King George III &bull; terra nullius &bull; dispossession',
      timelineMissionTitle: 'Centrefold Sketch Challenges 1 &amp; 2',
      timelineMission:
        '<strong>Milestone 1 (Cook &amp; Tupaia at Botany Bay &bull; 1770):</strong> Sketch an 18th-century sailing ship anchor crossed with a carved Aboriginal hardwood shield [⚓ ship anchor &bull; 🛡️ bark shield &bull; 🌿 eucalyptus branch].<br style="display:block; margin-top:2px;"><strong>Milestone 2 (First Fleet at Sydney Cove &bull; 1788):</strong> Sketch a British naval flag planted in sand beside a line of convict iron leg-shackles [🇬🇧 Union Jack &bull; ⛓️ iron leg-shackles &bull; ⛺ canvas tent].',
    },
    leftPageQuip:
      'Polynesian navigator Tupaia could map 130 Pacific islands across 3,000 miles entirely from memory.',
    rightPageQuip:
      'Cook claimed 2 million square kilometres of land under terra nullius without consulting a single Indigenous elder.',
  },
  {
    lessonNum: 2,
    id: 'lesson_2',
    title: 'Enquiry 2: The First Fleet & The Convict Penal Colony (1783–1792)',
    enquiryQuestion:
      'Whose story do we tell about the founding of the first British penal colony in Australia?',
    specAnchor:
      'Thames prison hulks; the 1787 First Fleet crossing; abandonment of Botany Bay for Sydney Cove; early starvation crisis; convict labour and emancipists.',
    stages: [
      {
        step: 1,
        paraRef: '[2.1]',
        date: '1783–1786',
        questionHeading:
          'Why did the loss of the American colonies force Britain to establish a penal colony in Australia?',
        bullets: ['Loss of American Colonies', 'Rotting Thames Hulks', 'Typhus & Overcrowding'],
        focusClue:
          'How did the end of the American Revolutionary War in 1783 precipitate an unprecedented crisis in British prisons?',
      },
      {
        step: 2,
        paraRef: '[2.2]',
        date: '1787–1788',
        questionHeading:
          'How did Captain Arthur Phillip manage the 15,000-mile voyage of the First Fleet?',
        bullets: ['11 Sailing Ships', '750 Convicts & 250 Marines', '15,000 Miles via Cape Town'],
        focusClue:
          'What health and hygiene measures did Governor Phillip enforce to ensure remarkably low mortality during the eight-month crossing?',
      },
      {
        step: 3,
        paraRef: '[2.3]',
        date: 'Jan 1788',
        questionHeading:
          'Why did Governor Phillip abandon Botany Bay and establish the settlement at Sydney Cove?',
        bullets: ['Unprotected Botany Bay', 'Port Jackson Deep Water', 'Fresh Water Stream'],
        focusClue:
          "Why was Port Jackson considered by Phillip to be 'the finest harbour in the world', and why was Botany Bay unsuited for a town?",
      },
      {
        step: 4,
        paraRef: '[2.4]',
        date: '1788–1790',
        questionHeading:
          'What factors pushed the early settlement at Sydney Cove to the brink of starvation?',
        bullets: ['Sandy Unproductive Soil', 'Broken Farming Hoes', 'Shipwreck of HMS Guardian'],
        focusClue:
          'How did British ignorance of Australian soils and native plants almost cause the entire settlement to starve to death?',
      },
      {
        step: 5,
        paraRef: '[2.5]',
        date: '1788–1792',
        questionHeading:
          'How did the system of convict labour balance severe punishment with the prospect of freedom?',
        bullets: ['Dawn-to-Dusk Labour', "Cat-o'-Nine-Tails Lash", '30-Acre Land Grants'],
        focusClue:
          "How did the opportunity to become an 'emancipist' transform petty thieves and farm labourers into permanent Australian landowners?",
      },
    ],
    vocabPrompt:
      'Define <strong>Transportation</strong> and explain why convicts who completed their sentences were designated as <strong>Emancipists</strong>:',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 1: Describe Two Features [4 marks &bull; 5 mins]',
        badge: 'FEATURE DRILL',
        question:
          'Describe two features of life on board the Thames prison hulks in the 1780s. [4 marks]',
        stems:
          'Feature 1: One key feature was... &bull; Detail: Specifically, on board the hulks prisoners were... &bull; Feature 2: A second key feature was... &bull; Detail: This caused horrific suffering because...',
      },
      partB: {
        tariff: 'Question 2: How Useful are Sources A and B [8 marks &bull; 10 mins]',
        badge: 'SOURCE UTILITY',
        question:
          'How useful are Sources A and B for an enquiry into the challenges faced by convicts and colonial authorities during the founding of Sydney Cove (1780–1792)? [8 marks]',
        hint: 'Evaluate the evidential content, provenance (author, audience, motive), and historical context of both sources.',
        structureStrip: [
          {
            col: '1. SOURCE A (GARNERAY HULKS)',
            text: 'Analyse the evidential value of Garneray’s sketch for the prison crisis and living conditions.',
          },
          {
            col: '2. SOURCE B (FOWKES SYDNEY PLAN)',
            text: 'Analyse the evidential value of Fowkes’s plan for frontier isolation, shelter, and survival.',
          },
          {
            col: '3. COMPARATIVE SYNTHESIS',
            text: 'Weigh how both sources combine to illustrate the journey from floating hulks to the Sydney frontier.',
          },
        ],
        connectives:
          'Source A is useful for investigating... because... &bull; For instance, evidence indicates that... &bull; However, its utility is limited by... &bull; In contrast, Source B provides valuable evidence of... &bull; Taken together, both sources...',
        wordBank:
          'prison hulks &bull; Bloody Code &bull; First Fleet &bull; Captain Arthur Phillip &bull; Sydney Cove &bull; starvation crisis &bull; rations &bull; emancipists',
      },
      timelineMissionTitle: 'Centrefold Sketch Challenge 3',
      timelineMission:
        '<strong>Milestone 3 (The 1789 Smallpox Epidemic &bull; 1789):</strong> Sketch an empty bark canoe drifting on water beneath a weeping eucalyptus branch [🛶 empty canoe &bull; 🌿 eucalyptus branch &bull; 💧 water ripple].',
    },
    leftPageQuip:
      'Convict Mary Wade was sentenced to transportation at age 11 for stealing an 8-penny cotton frock.',
    rightPageQuip:
      'In 1789, food ran so short at Sydney Cove that Governor Phillip slashed weekly flour rations to just two pounds.',
  },
  {
    lessonNum: 3,
    id: 'lesson_3',
    title: 'Enquiry 3: Frontier Warfare: Smallpox, Bennelong & Pemulwuy (1788–1802)',
    enquiryQuestion:
      'Was the colonisation of Australia a story of ‘amity and kindness’ or violent frontier resistance?',
    specAnchor:
      '65,000 years of First Nations custodianship; the 1789 smallpox catastrophe; Bennelong’s diplomacy; Pemulwuy’s 12-year guerrilla war; Hawkesbury River frontier conflict.',
    stages: [
      {
        step: 1,
        paraRef: '[3.1]',
        date: 'Pre-1788',
        questionHeading: 'How did First Nations peoples manage and govern their lands before 1788?',
        bullets: ['250 Language Nations', 'Fire-Stick Farming', 'Songlines & Custodianship'],
        focusClue:
          'How did Indigenous Australians combine fire management, seasonal harvesting, and spiritual kinship to sustain the continent for 65,000 years?',
      },
      {
        step: 2,
        paraRef: '[3.2]',
        date: 'April 1789',
        questionHeading:
          'What was the impact of the 1789 smallpox epidemic on the Eora people of Sydney?',
        bullets: ['Gal-galla Smallpox', '50–70% Eora Mortality', 'Loss of Elders & Law'],
        focusClue:
          'Why was the rapid loss of law-keepers, healers, and warriors in 1789 an irreversible biological catastrophe for the Sydney clans?',
      },
      {
        step: 3,
        paraRef: '[3.3]',
        date: '1789–1795',
        questionHeading:
          'Why did Bennelong act as a cultural intermediary between the British and the Eora?',
        bullets: ['Kidnapped by Marines', 'London Voyage 1793', 'Trapped Between Two Worlds'],
        focusClue:
          'How did Bennelong attempt to use diplomacy to protect his people, and why did his journey to London leave him alienated from both societies?',
      },
      {
        step: 4,
        paraRef: '[3.4]',
        date: '1790–1797',
        questionHeading:
          'How did Pemulwuy lead Indigenous armed resistance against British expansion?',
        bullets: ['Bidjigal Clan Leader', 'Burning Settler Farms', 'Battle of Parramatta (1797)'],
        focusClue:
          'Why did Pemulwuy target colonial crops, livestock, and soldiers, and how did his survival from musket wounds build his legendary reputation?',
      },
      {
        step: 5,
        paraRef: '[3.5]',
        date: '1795–1802',
        questionHeading:
          'Why did the Hawkesbury River expansion lead to protracted frontier warfare?',
        bullets: ['Fertile Farming Invasions', 'Shoot on Sight Orders', 'Death of Pemulwuy (1802)'],
        focusClue:
          'How did competition for food and water along the Hawkesbury River force British governors into declaring open military conflict?',
      },
    ],
    vocabPrompt:
      'Define <strong>Guerrilla Warfare</strong> and explain how Bidjigal leader Pemulwuy used bush terrain to resist British forces:',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 2: Narrative Account [8 marks &bull; 10 mins]',
        badge: 'NARRATIVE ACCOUNT',
        question:
          'Write a narrative account analysing the key events of Indigenous resistance and frontier conflict in New South Wales between 1788 and 1802. [8 marks]',
        stimulus: [
          'The 1789 smallpox epidemic (gal-galla)',
          'The Battle of Parramatta and Pemulwuy’s resistance (1797)',
        ],
        structureStrip: [
          {
            col: '1. BIOLOGICAL DISASTER',
            text: 'Explain how the arrival of settlers and disease broke early relations and weakened clan resistance.',
          },
          {
            col: '2. ARMED RESISTANCE',
            text: 'Explain how Indigenous leaders organized tactical attacks against colonial outposts and farming settlements.',
          },
          {
            col: '3. MILITARY SUPPRESSION',
            text: 'Explain how imperial authorities deployed regular soldiers and shoot-on-sight orders to crush resistance.',
          },
        ],
        connectives:
          'The sequence of conflict began when... &bull; This produced devastating consequences because... &bull; A major escalation occurred when... &bull; Crucially, a decisive turning point took place when... &bull; As a direct result...',
        wordBank:
          'First Nations &bull; Eora clans &bull; gal-galla (smallpox) &bull; Woollarawarre Bennelong &bull; Pemulwuy &bull; Bidjigal &bull; Battle of Parramatta (1797) &bull; Hawkesbury River &bull; shoot-on-sight proclamation',
      },
      partB: {
        tariff: 'Question 3: Explain the Importance [8 marks &bull; 10 mins]',
        badge: 'HISTORICAL IMPORTANCE',
        question:
          'Explain the importance of Pemulwuy’s guerrilla campaign (1790–1802) for Indigenous resistance against British colonisation. [8 marks]',
        structureStrip: [
          {
            col: '1. INTER-CLAN ALLIANCES',
            text: 'Explain how Pemulwuy united different clans across the Sydney basin in coordinated military opposition.',
          },
          {
            col: '2. DISRUPTING COLONIAL EXPANSION',
            text: 'Explain how targeting crops, supply wagons, and livestock forced colonial authorities to deploy troops.',
          },
        ],
        connectives:
          'The primary importance of this campaign was that... &bull; In response to settler expansion, resistance leaders were able to... &bull; Crucially, this had the effect of... &bull; Consequently, it challenged imperial authority because...',
        wordBank:
          'Pemulwuy &bull; Bidjigal clan &bull; guerrilla tactics &bull; burning crops &bull; Battle of Parramatta &bull; Governor King &bull; frontier warfare',
      },
      timelineMissionTitle: 'Centrefold Sketch Challenge 4',
      timelineMission:
        '<strong>Milestone 4 (Pemulwuy &amp; Parramatta &bull; 1797):</strong> Sketch a barbed multi-prong hunting spear crossed with a burning colonial wheat sheaf [🗡️ barbed spear &bull; 🌾 burning wheat &bull; 🛡️ shield].',
    },
    leftPageQuip:
      'First Nations Australians have maintained continuous cultural custodianship of the continent for 65,000 years.',
    rightPageQuip:
      'Shot seven times at Parramatta in 1797, Pemulwuy escaped hospital with his iron leg-shackles still attached.',
  },
  {
    lessonNum: 4,
    id: 'lesson_4',
    title: 'Enquiry 4: The Frontier Wars, Pastoral Expansion & The Black War (1803–1840)',
    enquiryQuestion:
      'How did pastoral expansion and frontier conflict transform colonial Australia?',
    specAnchor:
      'Invasion of Van Diemen’s Land; Governor Arthur’s martial law and the 1830 Black Line; Truganini and Flinders Island; Merino wool boom; 1838 Myall Creek massacre and trials.',
    stages: [
      {
        step: 1,
        paraRef: '[4.1]',
        date: '1803–1824',
        questionHeading:
          'Why did the British settlement of Van Diemen’s Land trigger violent conflict with the Palawa people?',
        bullets: ['Secondary Penal Colony', 'Risdon Cove Cannon Fire', 'Palawa Hunting Grounds'],
        focusClue:
          'How did the deployment of hardened convicts and armed sealers across Tasmania lead to immediate frontier bloodshed?',
      },
      {
        step: 2,
        paraRef: '[4.2]',
        date: '1826–1830',
        questionHeading:
          'How did Governor Arthur’s martial law and the ‘Black Line’ escalate the Black War?',
        bullets: ['Governor Arthur Martial Law', '2,200 Armed Men', 'The Black Line Sweeps'],
        focusClue:
          'Why did Governor Arthur mobilize the entire male civilian and military population into a 120-mile human chain across Tasmania?',
      },
      {
        step: 3,
        paraRef: '[4.3]',
        date: '1830–1835',
        questionHeading:
          'Why was the relocation of the Palawa to Wybalenna on Flinders Island catastrophic?',
        bullets: ['Truganini Peacemaking', '200 Exiled to Flinders', 'Wybalenna Camp Sickness'],
        focusClue:
          "How did broken government promises transform Robinson’s 'Friendly Mission' into an exile camp where disease wiped out over 150 people?",
      },
      {
        step: 4,
        paraRef: '[4.4]',
        date: '1820–1838',
        questionHeading:
          'How did the Merino wool boom drive violent frontier expansion across the Australian interior?',
        bullets: ['Merino Sheep Flocks', 'Yorkshire Wool Demand', 'Seizing Native Waterholes'],
        focusClue:
          'Why did squatter pastoralists push hundreds of miles beyond the limits of colonial law, and how did sheep destroy Indigenous food supplies?',
      },
      {
        step: 5,
        paraRef: '[4.5]',
        date: '1838',
        questionHeading:
          'Why was the 1838 Myall Creek trial an unprecedented turning point in colonial Australian law?',
        bullets: [
          '28 Wirrayaraay Murdered',
          '7 White Stockmen Hanged',
          'Squatter Outrage & Secrecy',
        ],
        focusClue:
          'Why did the public hanging of seven white stockmen outrage wealthy landowners, and how did it change the nature of frontier violence?',
      },
    ],
    vocabPrompt:
      'Define <strong>Martial Law</strong> and explain how Governor George Arthur used it against the Palawa in the Black War:',
    rightPage: {
      type: 'interpretations',
      tariff: 'Question 3(b) & 3(c): Contrasting Interpretations [8 marks &bull; 10 mins]',
      interpretation1: {
        author: 'Historian Henry Reynolds, The Other Side of the Frontier (1981)',
        text: '“The European occupation of Australia was resisted from the beginning by Indigenous peoples using guerrilla tactics. It was not a peaceful settlement, but a protracted, bloody war that cost the lives of at least 20,000 Aboriginal people defending their lands.”',
      },
      interpretation2: {
        author: 'Historian Keith Windschuttle, The Fabrication of Aboriginal History (2002)',
        text: '“There was no systematic warfare or frontier genocide in colonial Australia. The conflicts that occurred were uncoordinated, small-scale criminal skirmishes over stolen goods and sheep, and the death tolls cited by orthodox historians have been drastically fabricated without documentary proof.”',
      },
      questionB:
        'Explain how Interpretations 1 and 2 differ on the nature and scale of frontier conflict in Australia. [4 marks]',
      stemsB:
        'Interpretations 1 and 2 differ on... &bull; Interpretation 1 argues that... &bull; In contrast, Interpretation 2 suggests that... &bull; This is a difference because...',
      questionC:
        'Suggest one reason why Interpretations 1 and 2 differ on the reality of the Frontier Wars. [4 marks]',
      stemsC:
        'One reason why Interpretations 1 and 2 differ is because they rely on different historical sources... &bull; Specifically, Interpretation 1 uses... &bull; In contrast, Interpretation 2 focuses primarily on... &bull; As a result, the authors reach different conclusions because...',
      timelineMissionTitle: 'Centrefold Sketch Challenges 5 &amp; 6',
      timelineMission:
        '<strong>Milestone 5 (Martial Law &amp; The Black Line &bull; 1828):</strong> Sketch a military proclamation board pinned to a gum tree beside a row of redcoat bayonets [📜 proclamation board &bull; 🌲 gum tree &bull; 🗡️ bayonet rifle].<br style="display:block; margin-top:2px;"><strong>Milestone 6 (The Myall Creek Reckoning &bull; 1838):</strong> Sketch a magistrate\'s wooden gavel resting upon an uncoiled stockman\'s tethering rope [🔨 wooden gavel &bull; 🪢 coiled rope &bull; ⚖️ scales of justice].',
    },
    leftPageQuip:
      'The 1830 ‘Black Line’ swept 2,200 armed men across Tasmania for seven weeks—and captured just two people.',
    rightPageQuip:
      'In 1838, seven white stockmen were hanged for the Myall Creek Massacre—the only legal executions for frontier killings.',
  },
  {
    lessonNum: 5,
    id: 'lesson_5',
    title: 'Enquiry 5: The Gold Rush, Eureka Stockade & Historical Legacy (1851–1901)',
    enquiryQuestion:
      'How did the 1851 Gold Rush and the Eureka Stockade transform Australian society and democracy?',
    specAnchor:
      '1851 gold discoveries; Ballarat diggings; 30-shilling licence tax and digger hunts; 1854 Eureka Stockade rebellion; anti-Chinese riots and the 1901 White Australia Policy; First Nations survival and the 1992 Mabo Decision.',
    stages: [
      {
        step: 1,
        paraRef: '[5.1]',
        date: '1851–1853',
        questionHeading:
          'How did the 1851 gold discoveries transform Australia from a penal colony into an economic powerhouse?',
        bullets: [
          'Hargraves 1851 Discovery',
          'Population Triples to 1.2m',
          'Melbourne Victorian Wealth',
        ],
        focusClue:
          "How did the rush of free fortune-seekers break the social stigma of convict transportation and create 'Marvellous Melbourne'?",
      },
      {
        step: 2,
        paraRef: '[5.2]',
        date: '1853–1854',
        questionHeading:
          'Why did the monthly miner’s licence fee provoke widespread outrage among the gold diggers?',
        bullets: [
          '30-Shilling Monthly Fee',
          'Armed Police Digger Hunts',
          'Taxation Without Representation',
        ],
        focusClue:
          'Why did diggers view corrupt ex-convict police officers and arbitrary licence inspections as tyrannical oppression?',
      },
      {
        step: 3,
        paraRef: '[5.3]',
        date: 'Dec 1854',
        questionHeading:
          'What was the significance of the 1854 Eureka Stockade for the development of Australian democracy?',
        bullets: [
          'Southern Cross Flag',
          '15-Minute Dawn Assault',
          'Secret Ballot & Universal Suffrage',
        ],
        focusClue:
          'How did an armed uprising that ended in military defeat lead to male voting rights, parliamentary seats, and the miner’s right?',
      },
      {
        step: 4,
        paraRef: '[5.4]',
        date: '1855–1901',
        questionHeading:
          'How did anti-Chinese hostility on the goldfields lead directly to the 1901 White Australia Policy?',
        bullets: [
          '40,000 Chinese Diggers',
          'Lambing Flat Riots (1861)',
          '1901 Immigration Restriction Act',
        ],
        focusClue:
          'How was white working-class economic jealousy weaponized into racial fear, culminating in the 1901 dictation test?',
      },
      {
        step: 5,
        paraRef: '[5.5]',
        date: '1901–Present',
        questionHeading:
          'How did the 1938 Day of Mourning and the 1992 Mabo Decision reshape modern Australian history?',
        bullets: [
          '1938 Day of Mourning',
          'Stolen Generations Truth',
          '1992 Mabo Overturns Terra Nullius',
        ],
        focusClue:
          'How did Eddie Mabo’s ten-year legal battle overturn two centuries of British imperial law and establish Native Title?',
      },
    ],
    vocabPrompt:
      'Define <strong>Native Title</strong> and explain how the landmark 1992 Mabo Decision destroyed the legal myth of terra nullius:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 5: Evaluative Statement Essay [12 marks &bull; 15 mins]',
      examStem:
        '‘The discovery of gold and the Eureka Stockade were the most important turning points in 19th-century Australian history.’ How far do you agree? Explain your answer. [12 marks]',
      stimulus: [
        'The 1851 Gold Rush and the Eureka Stockade rebellion (1854)',
        'Pastoral expansion, the wool boom, and the frontier wars (1820–1840)',
      ],
      structureStrip: [
        {
          col: '1. GOLD RUSH & DEMOCRACY',
          text: 'Explain how the influx of immigrants, economic wealth, and digger rebellion fostered democratic rights.',
        },
        {
          col: '2. PASTORAL DISPOSSESSION',
          text: 'Explain how the wool boom drove violent territorial conquest and the dispossession of First Nations peoples.',
        },
        {
          col: '3. COMPARATIVE VERDICT',
          text: 'Weigh which development had a more enduring structural and human impact on the shaping of Australia.',
        },
      ],
      connectives:
        'A compelling argument supporting this statement is that... &bull; In particular, demographic and democratic changes were decisive because... &bull; On the other hand, an alternative perspective is that... &bull; Crucially, frontier and economic evidence demonstrates that... &bull; In conclusion, the more significant development was... because...',
      wordBank:
        'Edward Hargraves &bull; Ballarat &bull; 30-shilling licence &bull; Southern Cross flag &bull; Peter Lalor &bull; manhood suffrage &bull; squatter pastoralists &bull; Merino wool &bull; Myall Creek &bull; terra nullius &bull; First Nations survival',
      timelineMissionTitle: 'Centrefold Sketch Challenges 7 &amp; 8',
      timelineMission:
        '<strong>Milestone 7 (The Gold Rush Discovery &bull; 1851):</strong> Sketch a miner’s iron pickaxe crossed with a tin washing pan filled with glittering gold nuggets [⛏️ pickaxe &bull; 🪙 tin wash pan &bull; 🪨 gold nuggets].<br style="display:block; margin-top:2px;"><strong>Milestone 8 (The Eureka Southern Cross &bull; 1854):</strong> Sketch the blue-and-white Southern Cross Eureka flag flying above rough timber palisades [🚩 Southern Cross flag &bull; 🪵 wooden stockade &bull; ⚔️ crossed muskets].',
    },
    leftPageQuip:
      'The Southern Cross flag was sewn from silk petticoats by women on the Ballarat goldfield in 1854.',
    rightPageQuip:
      'In 1992, the High Court’s Mabo ruling officially extinguished the legal fiction of terra nullius after 222 years.',
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
      
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #000000; color: #ffffff; border: 1.2px solid #000000; padding: 1.5px 7px; border-radius: 2px;">
            ENQUIRY ${cfg.lessonNum} &bull; LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            YEAR 8 &bull; THE HISTORY OF AUSTRALIA (1770–1901)
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
    // DUAL HISTORIOGRAPHICAL INTERPRETATIONS WRITING (ENQUIRY 4 - PAGE 11)
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
        ${rp.stemsC ? `<div style="border: 1px solid #000000; border-radius: 2px; padding: 2px 5px; background: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.2; margin-bottom: 2px;"><strong style="color: #000000;">Scaffolded Sentence Stems:</strong> <span style="color: #000000;">${rp.stemsC}</span></div>` : ''}
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
    // TWO-PART ROTATING SKILLS WRITING (SPLIT: PART A + PART B - ENQUIRIES 2 & 3)
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

          <!-- Connectives & Word Bank -->
          ${
            partB.connectives || partB.stems || partB.wordBank
              ? `
          <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.22;">
            ${partB.connectives ? `<div><strong style="color: #000000;">Analytical Connectives:</strong> <em style="color: #000000;">${partB.connectives}</em></div>` : ''}
            ${partB.stems ? `<div><strong style="color: #000000;">Sentence Stems:</strong> <span style="color: #000000;">${partB.stems}</span></div>` : ''}
            ${partB.wordBank ? `<div style="margin-top: 1.5px;"><strong style="color: #000000;">Key Terms:</strong> <span style="color: #000000;">${partB.wordBank}</span></div>` : ''}
          </div>`
              : ''
          }
        </div>

        <!-- Ruled Writing Lines (18 Lines • Standard 7.8mm pitch) -->
        <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 3px; flex: 1; min-height: 0;">
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
function compileAustraliaWorkbook() {
  const coverImgBase64 =
    getBase64Image('images/first_fleet_botany_bay_1788.jpg') ||
    getBase64Image('public/images/first_fleet_botany_bay_1788.jpg') ||
    getBase64Image('images/prison_hulks.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The History of Australia (1770–1901) Pupil Workbook</title>
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
  // PAGE 1: FRONT COVER (GCSE Style & High Contrast)
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
          Year 8 Enquiry &bull; 1770–1901
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 26pt; line-height: 1.15; color: #0f284e; margin: 2px 0 3px 0; font-weight: 900;">
          The History of Australia (1770–1901)
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 11pt; color: #334155; font-style: italic; font-weight: 600;">
          First Nations Custodianship, Convict Colonisation, Frontier Wars &amp; The Gold Rush
        </div>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (First Fleet at Sydney Cove Canvas + Disciplinary Plate) -->
      <div style="margin: 2px 0 4px 0; border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="display: grid; grid-template-columns: 70mm 1fr; background: #ffffff;">
          <!-- Left: Full Visual Canvas in Rich Authentic Color -->
          <div style="background: #fcfbf9; border-right: 1.5px solid #0f284e; display: flex; justify-content: center; align-items: center; padding: 2px 4px;">
            <img src="${coverImgBase64}" alt="The First Fleet entering Botany Bay and Sydney Cove (1788)" style="height: 118mm; width: auto; max-width: 100%; object-fit: contain; display: block; margin: 0 auto; border: 1.2px solid #0f284e; border-radius: 2px; box-shadow: 0 2px 6px rgba(15,40,78,0.22);">
          </div>
          <!-- Right: Visual Iconography & Historical Significance for Year 8 -->
          <div style="padding: 5px 10px; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff; box-sizing: border-box;">
            <!-- 1. Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; padding-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e; letter-spacing: 0.5px;">
                Primary Visual Evidence &bull; The Founding of Colonial Australia
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; color: #64748b;">
                Francis Fowkes (1788)
              </span>
            </div>

            <!-- 2. Historical Context -->
            <p style="font-family: 'Georgia', serif; font-size: 7.9pt; line-height: 1.25; color: #1e293b; margin: 0;">
              In January 1788, eleven British sailing ships commanded by Governor Arthur Phillip landed roughly 1,400 convicts, marines, and sailors at Sydney Cove. Fowkes’s contemporary survey records the vulnerable foothold of the penal colony on the edge of the Pacific:
            </p>

            <!-- 3. Four Core Historical Features -->
            <div style="display: flex; flex-direction: column; gap: 2.5px;">
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #0f284e;">1. Sheltered Deep-Water Anchorage:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.20; color: #222222;">
                  Transports ride at anchor in Sydney Cove, chosen after Phillip abandoned Botany Bay due to dangerous ocean surf and poor fresh water.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #0f284e;">2. The Convict Tent City:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.20; color: #222222;">
                  Rough canvas tents and wattle-and-daub huts house 750 transported prisoners battling scurvy, dysentery, and near-starvation.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #0f284e;">3. The Freshwater Tank Stream:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.20; color: #222222;">
                  The vital freshwater creek that determined the location of modern Sydney, carved through sandstone by convicts to store drinking water.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #0f284e;">4. The Obscured Indigenous Reality:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.20; color: #222222;">
                  The imperial map depicts the land as an empty canvas, systematically erasing the sovereign presence of the Gadigal and Eora clans.
                </div>
              </div>
            </div>

            <!-- 4. Three-Pillar Visual Matrix -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; padding-top: 2px; border-top: 1px solid #cbd5e1;">
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Canvas Tents</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.7pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Fragile foothold on an isolated continent.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Naval Transports</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.7pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">15,000-mile exile under the Bloody Code.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Eora Country</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.7pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">65,000 years of custodianship erased.</div>
              </div>
            </div>

            <!-- 5. Disciplinary Significance Anchor -->
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e293b; line-height: 1.22; background: #f0f4f9; border-left: 2.5px solid #0f284e; padding: 2.5px 7px;">
              <strong style="text-transform: uppercase; color: #0f284e;">Disciplinary Significance:</strong> In colonial history, surveying and cartography were weapons of imperial conquest that turned living Indigenous homelands into European property through the myth of terra nullius.
            </div>

            <!-- 6. Targeted Disciplinary Hinge Question -->
            <div style="background: #ffffff; border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 7px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Disciplinary Hinge Question:</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #64748b; text-transform: uppercase;">Historical Evaluation</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 7.3pt; font-style: italic; color: #1e293b; line-height: 1.20; margin-top: 1px;">
                Does this contemporary survey depict the triumphant founding of a new nation, or the unauthorized military invasion of sovereign First Nations lands?
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #ffffff; padding: 3px 8px; border-top: 1.5px solid #0f284e; background: #0f284e;">
          <span><strong>Primary Visual Evidence:</strong> <em>Sketch &amp; Description of the Settlement at Sydney Cove</em> &bull; Francis Fowkes (1788)</span>
          <span style="font-weight: 700; color: #93c5fd; white-space: nowrap;">STATE LIBRARY OF NEW SOUTH WALES &bull; SYDNEY</span>
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
                  Enquiry 1: Captain Cook, Tupaia &amp; Terra Nullius (1768–1770)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.18;">
                  What is the significance of Captain Cook’s voyage for the story of colonisation?
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
                  Enquiry 2: The First Fleet &amp; Convict Penal Colony (1783–1792)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.18;">
                  Whose story do we tell about the founding of the first British penal colony in Australia?
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
                  Enquiry 3: Frontier Warfare: Smallpox, Bennelong &amp; Pemulwuy (1788–1802)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.18;">
                  Was the colonisation of Australia a story of ‘amity and kindness’ or violent frontier resistance?
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
                  Enquiry 4: The Frontier Wars, Pastoralism &amp; The Black War (1803–1840)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.18;">
                  How did pastoral expansion and frontier conflict transform colonial Australia?
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
                  Enquiry 5: The Gold Rush, Eureka Stockade &amp; Legacy (1851–1901)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.18;">
                  How did the 1851 Gold Rush and the Eureka Stockade transform Australian society and democracy?
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

      ${renderFooterStrip(1, 'From Botany Bay to Eureka, colonisation in Australia was marked by First Nations resistance and the struggle for freedom.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: ENQUIRY 1 (COOK, TUPAIA & TERRA NULLIUS)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[0], 2);
  html += renderRightPage(enquiryConfigs[0], 3);

  // ====================================================================
  // PAGES 4–5: ENQUIRY 2 (THE FIRST FLEET & PENAL COLONY)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[1], 4);
  html += renderRightPage(enquiryConfigs[1], 5);

  // ====================================================================
  // PAGES 6–7: ENQUIRY 3 (FRONTIER WARFARE: SMALLPOX & PEMULWUY)
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
            Living Timeline &bull; Part 1: Exploration, Penal Invasion &amp; Resistance (1770–1797)
          </h2>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 1: 1770 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1770 &bull; Captain Cook &amp; Tupaia at Botany Bay &bull; Possession Island
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Guided across Oceania by Polynesian navigator Tupaia, Cook enters Botany Bay, clashes with Gweagal warriors, and claims the eastern coast under the myth of terra nullius.
          </p>
        </div>

        <!-- Milestone 2: 1788 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1788 &bull; Arrival of the First Fleet at Sydney Cove &bull; British Penal Colony
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Governor Arthur Phillip lands 11 ships carrying roughly 750 convicts at Sydney Cove, raising the Union Jack to establish Britain’s first Australian penal settlement.
          </p>
        </div>

        <!-- Milestone 3: 1789 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1789 &bull; The Catastrophic Smallpox Outbreak (Gal-galla) Decimates the Eora
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            A deadly smallpox epidemic sweeps through the Sydney Basin, killing between 50% and 70% of the local Eora population and fatally weakening clan leadership.
          </p>
        </div>

        <!-- Milestone 4: 1797 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1797 &bull; Pemulwuy &amp; The Battle of Parramatta &bull; The Guerrilla War
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Bidjigal resistance leader Pemulwuy leads 100 warriors in a direct daytime assault on colonial troops at Parramatta during a 12-year guerrilla war defending country.
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
            Living Timeline &bull; Part 2: Frontier Wars, Wool Boom &amp; Gold Democracy (1828–1854)
          </h2>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 5: 1828 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1828 &bull; Martial Law in Van Diemen’s Land &bull; The 1830 ‘Black Line’
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Governor George Arthur declares martial law in Tasmania, deploying soldiers and settlers in the 1830 ‘Black Line’ cordon to drive Indigenous Tasmanians from ancestral lands.
          </p>
        </div>

        <!-- Milestone 6: 1838 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1838 &bull; The Myall Creek Massacre &amp; Unprecedented Murder Trials
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Eleven white stockmen murder 28 unarmed Wirrayaraay women, children, and elders; seven perpetrators are convicted and hanged in an unprecedented colonial trial.
          </p>
        </div>

        <!-- Milestone 7: 1851 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1851 &bull; The Australian Gold Rush Begins at Ballarat and Bendigo
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Payable gold is discovered at Summerhill Creek and Ballarat, triggering an immense global gold rush that triples Australia’s population to over 1.2 million in a decade.
          </p>
        </div>

        <!-- Milestone 8: 1854 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1854 &bull; The Eureka Stockade Rebellion &bull; Birth of Australian Democracy
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Over 120 Ballarat gold miners swear allegiance to the Southern Cross flag in an armed revolt against corrupt police licence hunts, winning male voting rights and democracy.
          </p>
        </div>

      </div>

      ${renderFooterStrip(9, 'From penal servitude to the gold rush, the struggle for land, rights, and voice shaped modern Australia.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 10–11: ENQUIRY 4 (FRONTIER WARS, PASTORALISM & BLACK WAR)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[3], 10);
  html += renderRightPage(enquiryConfigs[3], 11);

  // ====================================================================
  // PAGES 12–13: ENQUIRY 5 (GOLD RUSH, EUREKA & LEGACY)
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
              Recalls key colonial facts; describes First Fleet and gold rush events using structured sentence starters.
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
              Identifies causes for colonial conflict; describes convict transportation and frontier conditions with structured paragraphs.
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
              Explains multiple causes &amp; consequences; writes structured causal paragraphs using precise dates, legal doctrines, and trade statistics.
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
              Analyses causal significance; evaluates competing historical interpretations of frontier warfare and weighs economic vs democratic factors.
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
              Sustained, nuanced evaluative judgement; synthesises 65,000 years of custodianship, penal governance, violent dispossession, and democratic legacy.
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
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 1: Cook, Tupaia &amp; Terra Nullius</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Causal Explanation: Pacific Claims &amp; Terra Nullius (1768–1788)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 2: The First Fleet &amp; Penal Colony</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Feature Drill &amp; Source Utility: Hulks &amp; Sydney Settlement</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 3: Frontier Warfare &amp; Pemulwuy</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Narrative Account &amp; Importance: Sydney Frontier Resistance</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 4: Pastoralism &amp; The Black War</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Contrasting Interpretations: Reynolds vs Windschuttle</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 5: Gold Rush &amp; Eureka Stockade</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Evaluative Judgement: Turning Points in Australian History</div>
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
              const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=australia&lesson=${idx}&quiz=true`;
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Cook & Terra Nullius',
                'First Fleet & Hulks',
                'Pemulwuy & Frontier',
                'Pastoralism & Black War',
                'Eureka & Democracy',
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

      ${renderFooterStrip(16, 'From Botany Bay to Eureka, colonisation in Australia was marked by First Nations resistance and the struggle for freedom.', 16)}
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
    'Rendering 16-Page A4 Pupil Workbook (KS3 Gold Standard): The History of Australia (1770–1901)...',
  );

  const outDir = path.join(ROOT_DIR, 'public', 'units', 'australia');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outHtmlPath = path.join(outDir, 'pupil_workbook.html');
  const html = compileAustraliaWorkbook();
  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(`[OK] HTML written to: ${outHtmlPath}`);

  const altUnitsDir = path.join(ROOT_DIR, 'units', 'australia');
  if (fs.existsSync(altUnitsDir)) {
    fs.writeFileSync(path.join(altUnitsDir, 'pupil_workbook.html'), html, 'utf8');
    console.log(`[OK] HTML mirrored to: ${path.join(altUnitsDir, 'pupil_workbook.html')}`);
  }

  // Compile PDF via Puppeteer
  const pdfDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
  const outPdfPath = path.join(pdfDir, 'australia_pupil_workbook.pdf');

  console.log('Launching Puppeteer to generate high-resolution print PDF...');
  const chromePath =
    process.env.CHROME_BIN ||
    (process.platform === 'win32' &&
    fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const launchOptions = {
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--allow-file-access-from-files',
      '--disable-web-security',
    ],
  };
  if (chromePath) {
    launchOptions.executablePath = chromePath;
  }

  const browser = await puppeteer.launch(launchOptions);

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

module.exports = { compileAustraliaWorkbook };

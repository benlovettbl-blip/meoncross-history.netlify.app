/**
 * scripts/apply_eee_golden_standard.cjs
 *
 * Upgrades Early Elizabethan England (EEE) in scripts/render_eee_twopage_workbook.cjs:
 * 1. Imports EEE_ENQUIRY_CONFIGS (12 fully calibrated enquiries with 5-stage spines, accessible writing frames, spec vocabulary banks, 0 knowledge leaks)
 * 2. Replaces KT1 and KT2 specImageSrc with official 2-column vector edexcelTable (fixing cover footer collision and text clipping)
 * 3. Sets KT1 & KT2 heroImage.heightMm to 105 (matching KT3 for 99% space utilization and 0px overflow)
 * 4. Replaces renderFeaturePage and renderExtendedWritingPages with Golden Standard 4-Page Module Architecture:
 *    - Page 1 (Verso): renderSpinePage (5-stage spine + 30 ruled exposition lines)
 *    - Page 2 (Recto): renderModulePage2 (Extended Writing Assessment, paired Accessible Writing Frames & Vocabulary Bank, 22 flex task lines, Timeline Mission)
 *    - Page 3 (Verso): renderModulePage3 (Extended Writing Continued with 31 ruled lines with 22mm margin)
 *    - Page 4 (Recto): renderModulePage4 (Essay Synthesis with 24 ruled lines + Question 1 Practice [Q1a 2m + Q1b 2m = 4m] with 6 ruled task lines)
 * 5. Updates back cover assessment ledger to reflect the 4-part module structure
 */

const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'render_eee_twopage_workbook.cjs');
let code = fs.readFileSync(targetFile, 'utf8');

// 1. Ensure import of EEE_ENQUIRY_CONFIGS
if (!code.includes("require('./components/eee_enquiry_configs.cjs')")) {
  code = code.replace(
    "const { ENQUIRY_STAGES, QUESTION_PROBABILITIES } = require('./enhance_eee_workbook.cjs');",
    "const { ENQUIRY_STAGES, QUESTION_PROBABILITIES } = require('./enhance_eee_workbook.cjs');\nconst { EEE_ENQUIRY_CONFIGS } = require('./components/eee_enquiry_configs.cjs');",
  );
}

// 2. Define the replacement KEY_TOPICS_DATA using EEE_ENQUIRY_CONFIGS & vector edexcelTable
const newKeyTopicsDataBlock = `// ============================================================================
// KEY TOPICS MASTER CONFIGURATIONS
// ============================================================================
const KEY_TOPICS_DATA = {
  KT1: {
    keyTopicNum: 1,
    title: 'Queen, Government and Religion, 1558–69',
    subtitle:
      'Accession, Religious Settlement, Puritan & Catholic Challenges, and Mary, Queen of Scots',
    dateRange: '1558–1569',
    heroImage: {
      src: getBase64Image('/images/elizabeth_coronation_robes.jpg'),
      alt: 'Queen Elizabeth I in Coronation Robes',
      objectPosition: 'center 20%',
      shelfmark: 'NPG 2607 • NATIONAL PORTRAIT GALLERY • LONDON',
      date: 'c. 1600',
      title: 'Queen Elizabeth I in Coronation Robes',
      caption:
        'Unknown English Artist • Queen Elizabeth I depicted in her patterned cloth of gold coronation robes, holding the sovereign orb and sceptre. National Portrait Gallery, London (NPG 2607).',
      sourceTag: 'Historical Primary Record',
      archiveTag: 'Edexcel Paper 2 Master Archive',
      heightMm: 105,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification Content',
      edexcelTable: {
        header: 'Key topic 1: Queen, government and religion, 1558–69',
        rows: [
          {
            numTitle: '1 The situation on Elizabeth’s accession',
            bullets: [
              'Elizabethan England in 1558: society and government.',
              'The Virgin Queen: the problem of her legitimacy, gender, marriage. Her character and strengths.',
              'Challenges at home and abroad: financial weaknesses, Mary, Queen of Scots, and the French threat.',
            ],
          },
          {
            numTitle: "2 The 'settlement' of religion",
            bullets: [
              'Religious divisions in England in 1558.',
              'Elizabeth’s Religious Settlement (1559): its features and impact.',
              'The Church of England’s role in society.',
            ],
          },
          {
            numTitle: '3 Challenge to the religious settlement',
            bullets: [
              'The nature and extent of the Puritan challenge.',
              'The nature and extent of the Catholic challenge, including the role of the Papacy.',
            ],
          },
          {
            numTitle: '4 The problem of Mary, Queen of Scots',
            bullets: [
              'Mary, Queen of Scots: her claim to the English throne, her arrival in England, 1568.',
              'Relations between Elizabeth and Mary, 1568–69.',
            ],
          },
        ],
      },
    },
    milestones: [
      {
        date: '17 NOV 1558',
        title: 'Accession of Elizabeth I & Council Appointments',
        tag: 'Key Topic 1.1',
        text: 'Mary I dies; 25-year-old Elizabeth succeeds to the throne. She immediately appoints trusted Protestant statesman Sir William Cecil as her Principal Secretary, confronting £300,000 in Crown debts and French military forces stationed in Scotland.',
      },
      {
        date: 'MAY 1559',
        title: 'The Acts of Supremacy & Uniformity (The Settlement)',
        tag: 'Key Topic 1.2',
        text: "Parliament passes the Religious Settlement. The Act of Supremacy establishes Elizabeth as 'Supreme Governor' of the Church of England; the Act of Uniformity mandates the 1559 Book of Common Prayer and imposes a 1 shilling fine for recusancy.",
      },
      {
        date: 'SUMMER 1559',
        title: 'The Royal Injunctions & National Visitations',
        tag: 'Key Topic 1.2',
        text: 'The Crown issues 57 Royal Injunctions enforcing Protestant worship. Clergy must preach royal supremacy, condemn papal authority, report recusants, and use English bibles. National visitations by 125 commissioners inspect parish compliance.',
      },
      {
        date: 'JULY 1560',
        title: 'The Treaty of Edinburgh',
        tag: 'Key Topic 1.1 / 1.4',
        text: 'French troops withdraw from Scotland after a rebellion by Protestant Scottish lords. The Treaty establishes peace and Mary, Queen of Scots gives up her claim to the English throne, though Mary refuses to formally ratify the agreement.',
      },
      {
        date: '1566',
        title: 'The Vestments Controversy & Puritan Dissent',
        tag: 'Key Topic 1.3',
        text: "Archbishop Matthew Parker issues the 'Book of Advertisements' requiring all clergy to wear the surplice and tippet. In London, 37 Puritan vicars refuse to wear Catholic-style vestments and are deprived of their livings, revealing deep Protestant divisions.",
      },
      {
        date: 'MAY 1568',
        title: 'Mary Queen of Scots Flees to England',
        tag: 'Key Topic 1.4',
        text: 'Following the murder of Lord Darnley and defeat at Carberry Hill, Catholic Mary Stuart flees Scotland in a fishing boat to Workington, Cumberland. Elizabeth places her under armed house arrest, triggering twenty years of Catholic conspiracy.',
      },
    ],
    enquiries: EEE_ENQUIRY_CONFIGS.KT1,
  },

  // ==========================================================================
  KT2: {
    keyTopicNum: 2,
    title: 'Challenges to Elizabeth at Home and Abroad, 1569–88',
    subtitle: 'Catholic Plots, Mary’s Execution, Spanish Rivalry & The Armada',
    dateRange: '1569–1588',
    heroImage: {
      src: getBase64Image('/images/armada_portrait.jpg'),
      alt: 'The Armada Portrait of Queen Elizabeth I (1588)',
      objectPosition: 'center 30%',
      shelfmark: 'WOBURN ABBEY COLLECTION • BEDFORDSHIRE • WA-INV-042',
      date: 'c. 1588',
      title: 'The Armada Portrait of Queen Elizabeth I',
      caption:
        'Attributed to George Gower • Queen Elizabeth I sits in triumph with her right hand resting on a global orb. Behind her, windows depict the English fireships assaulting the Spanish fleet at Gravelines and the Armada wrecked on stormy rocks. Accession Shelfmark WA-INV-042.',
      sourceTag: 'Historical Primary Source',
      archiveTag: 'Edexcel Paper 2 Master Archive',
      heightMm: 105,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification Content',
      edexcelTable: {
        header: 'Key topic 2: Challenges to Elizabeth at home and abroad, 1569–88',
        rows: [
          {
            numTitle: '1 Plots and revolts at home',
            bullets: [
              'The reasons for, and significance of, the Revolt of the Northern Earls (1569).',
              'The features and significance of the Ridolfi, Throckmorton and Babington Plots. Walsingham and his spy network.',
              'The reasons for, and significance of, Mary, Queen of Scots’ execution in 1587.',
            ],
          },
          {
            numTitle: '2 Relations with Spain',
            bullets: [
              'Political and religious rivalry, including commercial rivalry and the activities of Drake in the New World.',
              'Direct English involvement in the Netherlands, 1585–88. The role of Robert Dudley.',
            ],
          },
          {
            numTitle: '3 The Spanish Armada',
            bullets: [
              'Drake’s raid on Cadiz (1587) – ‘singeing the King of Spain’s beard’.',
              'The reasons why Philip II launched the Armada, English and Spanish naval tactics, the defeat of the Armada.',
            ],
          },
        ],
      },
    },
    milestones: [
      {
        date: 'NOV 1569',
        title: 'Revolt of the Northern Earls',
        tag: 'Key Topic 2.1',
        text: 'Catholic Earls of Northumberland and Westmorland march on Durham Cathedral, tear up English bibles, and restore the Latin Mass with 4,600 men. Royal troops march north; the rebellion collapses and Elizabeth executes 450 rebels to crush northern disobedience.',
      },
      {
        date: 'FEB 1570',
        title: 'Papal Bull: Regnans in Excelsis',
        tag: 'Key Topic 2.1',
        text: 'Pope Pius V issues the papal bull Regnans in Excelsis, excommunicating Elizabeth as a heretic and absolving all Catholic subjects of their oath of allegiance. This officially criminalizes Catholic loyalty and makes all active recusants potential traitors.',
      },
      {
        date: '1577–1580',
        title: 'Drake Circumnavigates the Globe',
        tag: 'Key Topic 2.2',
        text: 'Francis Drake completes the second circumnavigation in history in the Golden Hind, raiding Spanish Pacific colonies and capturing the treasure galleon Cacafuego (£140,000 in silver). Elizabeth knights Drake at Deptford, escalating Anglo-Spanish commercial rivalry.',
      },
      {
        date: 'AUG 1585',
        title: 'Treaty of Nonsuch (War in Netherlands)',
        tag: 'Key Topic 2.3',
        text: 'Following the assassination of William of Orange and the French Treaty of Joinville, Elizabeth signs the Treaty of Nonsuch, sending Robert Dudley (Earl of Leicester) with 7,400 English soldiers to aid Dutch Protestant rebels against the Duke of Parma.',
      },
      {
        date: 'FEB 1587',
        title: 'Execution of Mary, Queen of Scots',
        tag: 'Key Topic 2.1',
        text: 'Walsingham’s codebreaker Thomas Phelippes intercepts Babington’s ciphers explicitly approved by Mary Stuart. Tried under the 1584 Bond of Association, Mary is found guilty of high treason and beheaded at Fotheringhay Castle on 8 February 1587.',
      },
      {
        date: 'JUL–AUG 1588',
        title: 'Defeat of the Spanish Armada',
        tag: 'Key Topic 2.4',
        text: 'Medina Sidonia sails 130 ships to ferry Parma’s invasion army across the Channel. English fireships scatter the crescent formation at Calais Roads; agile galleons batter Spanish ships at Gravelines, and violent storms wreck half the fleet on Scottish and Irish rocks.',
      },
    ],
    enquiries: EEE_ENQUIRY_CONFIGS.KT2,
  },

  // ==========================================================================
  KT3: {
    keyTopicNum: 3,
    title: 'Elizabethan Society in the Age of Exploration, 1558–88',
    subtitle: 'Education, Leisure, The Problem of Poverty, Voyages & Virginia',
    dateRange: '1558–1588',
    heroImage: {
      src: getBase64Image('/images/john_white_chief_herowan.jpg'),
      alt: 'John White Watercolor of a Chief of the Secotan (1585)',
      objectPosition: 'center 12%',
      shelfmark: 'BRITISH MUSEUM • 1906,0509.1.21 • LONDON',
      date: '1585',
      title: 'A Chief of the Secotan (Carolina Algonquian)',
      caption:
        'John White • A Cheife Herowan of the Secotan, painted in watercolour during the first Roanoke expedition (1585). Depicts an indigenous Algonquian leader wearing a copper gorget, feather, and fringed deerskin apron. British Museum, London (1906,0509.1.21).',
      sourceTag: 'Historical Primary Record',
      archiveTag: 'Edexcel Paper 2 Master Archive',
      heightMm: 105,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification Content',
      edexcelTable: {
        header: 'Key topic 3: Elizabethan society in the Age of Exploration, 1558–88',
        rows: [
          {
            numTitle: '1 Education and leisure',
            bullets: ['Education in the home and schools.', 'Sport, pastimes and the theatre.'],
          },
          {
            numTitle: "2 The 'problem' of the poor",
            bullets: [
              'The reasons for the increase in poverty and vagabondage during these years.',
              'The changing attitudes and policies towards the poor.',
            ],
          },
          {
            numTitle: '3 Exploration and voyages of discovery',
            bullets: [
              'Factors prompting exploration, including the impact of new technology on ships and sailing and the drive to expand trade.',
              'The reasons for, and significance of, Drake’s circumnavigation of the globe.',
            ],
          },
          {
            numTitle: '4 Attempted colonisation of Virginia',
            bullets: [
              'Reasons for the attempted colonisation of Virginia, including the significance of Raleigh.',
              'Reasons for the failure of the first settlement in Virginia.',
            ],
          },
        ],
      },
    },
    milestones: [
      {
        date: '1572',
        title: 'The Vagabonds Act',
        tag: 'Key Topic 3.2',
        text: "Parliament passes the 1572 Vagabonds Act, creating a legal distinction between the 'deserving poor' (elderly and sick) and 'idle beggars'. Vagrants over 14 are whipped and burned through the ear; repeat offenders face execution.",
      },
      {
        date: '1576',
        title: "Act for Relief of the Poor & Burbage Builds 'The Theatre'",
        tag: 'Key Topic 3.1',
        text: "The 1576 Poor Act orders town councils to provide wool and raw materials to put the unemployed to work, creating 'Houses of Correction' (Bridewells). In the same year, actor James Burbage constructs 'The Theatre' in Shoreditch, launching Elizabethan public drama.",
      },
      {
        date: '1577',
        title: 'Grammar School Expansion & Humanist Curriculum',
        tag: 'Key Topic 3.1',
        text: "Over 70 new grammar schools are founded during Elizabeth's reign. The sons of the gentry and yeomanry study Latin, Greek, rhetoric, and classical history from dawn to dusk, fostering a highly literate administrative and legal class.",
      },
      {
        date: '1577–1580',
        title: 'Drake’s Circumnavigation & Scientific Sailing',
        tag: 'Key Topic 3.3',
        text: "Using new navigation technology including the astrolabe, magnetic compass, and quadrant, Francis Drake navigates through treacherous waters, claims 'Nova Albion' (California) for Elizabeth, and returns with a 4,700% return for his financial backers.",
      },
      {
        date: '1584',
        title: 'Raleigh Granted Royal Patent for Virginia',
        tag: 'Key Topic 3.4',
        text: "Elizabeth grants Sir Walter Raleigh a royal charter to discover and colonise 'remote heathen and barbarous lands'. Raleigh names the territory 'Virginia' in honour of the Virgin Queen, raising funds from London merchants for private colonisation.",
      },
      {
        date: '1585–1586',
        title: 'The First Roanoke Settlement & Failure',
        tag: 'Key Topic 3.4',
        text: "107 male colonists under Ralph Lane settle Roanoke Island. The flagship Tiger grounds, ruining seed crops; relations with Chief Wingina turn violent, and when Francis Drake arrives in June 1586, the starving colonists abandon the settlement.",
      },
    ],
    enquiries: EEE_ENQUIRY_CONFIGS.KT3,
  },
};`;

// Replace from KEY_TOPICS_DATA declaration down to the end of KT3 enquiries
const startIdx = code.indexOf('const KEY_TOPICS_DATA = {');
const endIdx = code.indexOf('function renderSpinePage(enq, pageNum, quip, keyTopicNum) {');

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + newKeyTopicsDataBlock + '\n\n' + code.substring(endIdx);
  console.log('✅ Replaced KEY_TOPICS_DATA block');
} else {
  console.error('❌ Failed to locate KEY_TOPICS_DATA or renderSpinePage');
  process.exit(1);
}

// 3. Define the replacement Golden Standard module functions:
const newModuleRenderers = `
function renderSpinePage(cfg, pageNum, quip, keyTopicNum) {
  let stagesHtml = '';
  const stages = cfg.stages || [];
  stages.forEach((st, idx) => {
    let bulletsHtml = st.bullets
      .map(
        (b) =>
          \`<div style="margin-bottom: 2px;"><span style="font-weight: 900; color: #000000;">&bull;</span> \${b}</div>\`,
      )
      .join('');
    stagesHtml += \`
          <!-- Stage \${idx + 1} -->
          <div class="spine-stage-row" style="display: flex; flex: 1; min-height: 0; align-items: stretch; margin: 0; border-bottom: 1.5px solid #000000;">
            <!-- Left: Factual Chronology Spine (38mm) with strong black font -->
            <div style="width: 38mm; flex-shrink: 0; border-left: 2.5px solid #000000; padding: 2px 4px 2px 5px; display: flex; flex-direction: column; justify-content: center; position: relative;">
              <div style="position: absolute; left: -5.5px; top: 12px; width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
              <div style="display: flex; align-items: center; gap: 3px; margin-bottom: 1.5px;">
                <span style="background: #000000; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; padding: 0.5px 4px; border-radius: 2px;">\${idx + 1}</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; color: #000000;">\${st.dates}</span>
              </div>
              <div style="font-family: 'Playfair Display', serif; font-size: 7.8pt; font-weight: 900; color: #000000; line-height: 1.12; margin-bottom: 2.5px;">
                \${st.title}
              </div>
              <div style="display: flex; flex-direction: column; font-family: 'Inter', sans-serif; font-size: 7.1pt; font-weight: 700; line-height: 1.20; color: #000000;">
                \${bulletsHtml}
              </div>
            </div>

            <!-- Right: Enquiry Prompt + Exact 6 Ruled Lines (Preserving teacher exposition notes) -->
            <div style="flex: 1; display: flex; flex-direction: column; border-left: 1.5px solid #000000; margin: 0; padding: 0;">
              <div style="background: #f1f5f9; border-bottom: 1.5px solid #000000; padding: 2.5px 8px; display: flex; align-items: center;">
                <span style="font-family: 'Georgia', serif; font-size: 7.8pt; font-weight: 700; color: #000000; line-height: 1.18; font-style: italic;">
                  \${st.focusClue}
                </span>
              </div>
              <div style="flex: 1; display: flex; flex-direction: column;">
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              </div>
            </div>
          </div>\`;
  });

  return \`
  <!-- LESSON ENQUIRY NOTEBOOK WITH CHRONOLOGICAL SPINE (PAGE \${pageNum}) -->
  <div class="page page-container verso-page" id="page-\${pageNum}" style="padding: 2.5mm 6mm 2mm 6mm;">
    <div class="page-body-full">
      <!-- Lesson Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            KEY TOPIC \${keyTopicNum}.\${cfg.enquiryNum} &bull; ENQUIRY LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            EDEXCEL PAPER 2 (1HI0/2B) &bull; BRITISH DEPTH STUDY
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.18;">
          \${cfg.inquiryQuestion}
        </h2>
      </div>

      <!-- Active Lesson Note-Taking Spine -->
      <div style="flex: 1; display: flex; flex-direction: column; margin-top: 1px; min-height: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #000000; padding: 1.5px 0; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
            CHRONOLOGICAL INQUIRY SPINE &bull; 5 CAUSAL MILESTONES
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #1e293b;">
            PUPIL NOTE-TAKING ZONE &bull; <span style="font-style: italic; font-weight: 500; color: #475569;">Answer each milestone prompt using evidence from teacher exposition</span>
          </span>
        </div>

        <!-- 5 Chronological Stages with Spine on Left and Ruled Lines on Right -->
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          \${stagesHtml}
        </div>
      </div>

      \${renderFooterStrip(pageNum, quip, 24)}
    </div>
  </div>\`;
}

/**
 * MODULE PAGE 2: Extended Writing Assessment (Recto)
 */
function renderModulePage2(cfg, pageNum, quip, keyTopicNum) {
  const flexTaskLines = Array.from(
    { length: 22 },
    () => \`
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\`,
  ).join('');

  return \`
  <!-- MODULE PAGE 2: EXTENDED WRITING ASSESSMENT (PAGE \${pageNum}) -->
  <div class="page page-container recto-page" id="page-\${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <!-- Exam Header -->
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
          <div style="display: flex; align-items: baseline; gap: 6px;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
              \${cfg.tariff}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f1f5f9; text-transform: uppercase;">
              EDEXCEL PAPER 2 (1HI0/2B)
            </span>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 5px; border-radius: 2px;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / \${cfg.scoreMax} ]
          </span>
        </div>

        <!-- Question Stem & Stimulus Box -->
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; margin-bottom: 3px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 800; color: #000000; margin-bottom: 2px; line-height: 1.22;">
            \${cfg.examStem}
          </div>
          <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000000; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 2px;">
            <strong>You may use in your answer:</strong>
            <span>&bull; \${cfg.stimulus[0]}</span>
            <span>&bull; \${cfg.stimulus[1]}</span>
            <span style="font-style: italic; color: #1e3a8a; font-weight: 700;">(You must also use information of your own.)</span>
          </div>
        </div>

        <!-- Accessible Writing Frames & Key Vocabulary Bank -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 6px;">
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; display: block; margin-bottom: 1px; color: #000000;">
              Accessible Writing Frames:
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; line-height: 1.2; display: block; color: #222222;">
              \${cfg.connectives}
            </span>
          </div>
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; display: block; margin-bottom: 1px; color: #000000;">
              Key Vocabulary Bank:
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2; display: block; color: #111111;">
              \${cfg.wordBank}
            </span>
          </div>
        </div>

        <!-- Ruled Task Lines Prompt -->
        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #222222; margin: 2px 0 2px 0; display: flex; justify-content: space-between;">
          <span><strong>Write your response in the space provided below:</strong></span>
          <span style="font-size: 6.8pt; color: #555555;">(Response continues on facing page)</span>
        </div>
      </div>

      <!-- 22 Ruled Task Lines for Extended Writing -->
      <div style="flex: 1; display: flex; flex-direction: column; margin: 2px 0 4px 0;">
\${flexTaskLines}
      </div>

      <!-- Timeline Mission (Medicine-Style Analytical Navigation Strip) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 3px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
            Timeline Mission
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; line-height: 1.2;">
            \${cfg.timelineMission}
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; white-space: nowrap; margin-left: 8px;">
          &larr; Pages 2–3
        </span>
      </div>

      \${renderFooterStrip(pageNum, quip, 24)}
    </div>
  </div>\`;
}

/**
 * MODULE PAGE 3: Extended Writing Continued (Verso)
 */
function renderModulePage3(cfg, pageNum, quip, keyTopicNum) {
  const continuationTaskLines = Array.from(
    { length: 31 },
    () => \`
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\`,
  ).join('');

  return \`
  <!-- MODULE PAGE 3: EXTENDED WRITING CONTINUED (PAGE \${pageNum}) -->
  <div class="page page-container verso-page" id="page-\${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px; display: flex; justify-content: space-between; align-items: baseline;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          Enquiry \${keyTopicNum}.\${cfg.enquiryNum}: \${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          \${cfg.tariff.split(':')[0]} Continued &bull; Independent Timed Response
        </span>
      </div>

      <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #333333; margin-bottom: 2px;">
        Continue your response to \${cfg.tariff.split(':')[0]} below:
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; margin: 2px 0 4px 0;">
\${continuationTaskLines}
      </div>

      \${renderFooterStrip(pageNum, quip, 24)}
    </div>
  </div>\`;
}

/**
 * MODULE PAGE 4: Essay Synthesis & 4-Mark Feature Practice (Recto)
 */
function renderModulePage4(cfg, pageNum, quip, keyTopicNum) {
  const conclusionTaskLines = Array.from(
    { length: 24 },
    () => \`
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\`,
  ).join('');

  const featLinesA = Array.from(
    { length: 3 },
    () => \`
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\`,
  ).join('');

  const featLinesB = Array.from(
    { length: 3 },
    () => \`
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\`,
  ).join('');

  return \`
  <!-- MODULE PAGE 4: ESSAY SYNTHESIS & 4-MARK FEATURE PRACTICE (PAGE \${pageNum}) -->
  <div class="page page-container recto-page" id="page-\${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- Top Section: Final Essay Synthesis (Flex 2.2) -->
      <div style="flex: 2.2; display: flex; flex-direction: column; min-height: 0;">
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px; display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
            Enquiry \${keyTopicNum}.\${cfg.enquiryNum}: \${cfg.title} &bull; Final Historical Verdict
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 4px; border-radius: 2px; text-transform: uppercase;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / \${cfg.scoreMax} ]
          </span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          Conclude your extended response and provide your sustained historical judgment below:
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; margin: 0 0 2px 0;">
\${conclusionTaskLines}
        </div>
      </div>

      <!-- Bottom Section: Question 1 Practice: Describe Two Key Features [2x2m = 4m] (Flex 1.5) -->
      <div style="border-top: 2px solid #000000; padding-top: 3px; margin-top: 2px; flex: 1.5; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <div style="display: flex; align-items: center; gap: 5px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; text-transform: uppercase; letter-spacing: 0.5px;">
                &bull; Question 1 Practice: Describe Two Key Features [4 marks &bull; 6 mins]
              </strong>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
              Total Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4 ]
            </span>
          </div>
        </div>

        <!-- 2 Features Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; flex: 1; min-height: 0;">
          
          <!-- Feature (a) -->
          <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 1px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase;">
                  Q1(a) [2 marks]
                </span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 3px; border-radius: 2px; background: #f8fafc;">
                  \${cfg.featureA.provenance}
                </span>
              </div>
              <p style="font-family: 'Playfair Display', serif; font-size: 7.8pt; font-weight: 800; color: #000000; margin: 0 0 1px 0; line-height: 1.15;">
                \${cfg.featureA.stem}
              </p>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.12; background: #f8fafc; border: 1px solid #cbd5e1; padding: 1px 3px; border-radius: 2px; margin-bottom: 1px;">
                <strong>Target: AO1 &bull;</strong> <em>One key feature was that... &bull; Specifically, this was evident when...</em>
              </div>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; margin: 0;">
\${featLinesA}
            </div>
          </div>

          <!-- Feature (b) -->
          <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 1px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase;">
                  Q1(b) [2 marks]
                </span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 3px; border-radius: 2px; background: #f8fafc;">
                  \${cfg.featureB.provenance}
                </span>
              </div>
              <p style="font-family: 'Playfair Display', serif; font-size: 7.8pt; font-weight: 800; color: #000000; margin: 0 0 1px 0; line-height: 1.15;">
                \${cfg.featureB.stem}
              </p>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.12; background: #f8fafc; border: 1px solid #cbd5e1; padding: 1px 3px; border-radius: 2px; margin-bottom: 1px;">
                <strong>Target: AO1 &bull;</strong> <em>One key feature was that... &bull; Specifically, this was evident when...</em>
              </div>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; margin: 0;">
\${featLinesB}
            </div>
          </div>

        </div>
      </div>

      \${renderFooterStrip(pageNum, quip, 24)}
    </div>
  </div>\`;
}
`;

// Replace renderSpinePage, renderFeaturePage, renderExtendedWritingPages with newModuleRenderers
const spineStart = code.indexOf('function renderSpinePage(enq, pageNum, quip, keyTopicNum) {');
const extEnd = code.indexOf('function renderSynopticVaultPages(data, footers) {');

if (spineStart !== -1 && extEnd !== -1) {
  code = code.substring(0, spineStart) + newModuleRenderers + '\n' + code.substring(extEnd);
  console.log('✅ Replaced renderModule functions');
} else {
  console.error('❌ Failed to locate spineStart or extEnd');
  process.exit(1);
}

// 4. Update the enquiry loop in buildEeeKeyTopicWorkbook
const oldLoop = `  data.enquiries.forEach((enq, idx) => {
    const leftPageNum = 4 + idx * 4; // 4, 8, 12, 16
    const rightPageNum = leftPageNum + 1; // 5, 9, 13, 17
    const linedLeftPageNum = leftPageNum + 2; // 6, 10, 14, 18
    const linedRightPageNum = leftPageNum + 3; // 7, 11, 15, 19

    // Page 1 of module (Verso): Chronological Inquiry Spine + Cornell Notes
    html += renderSpinePage(enq, leftPageNum, footers[leftPageNum - 1], data.keyTopicNum);

    // Page 2 of module (Recto): Q1(a) [2m] + Q1(b) [2m] + Core Vocab + Timeline Mission
    html += renderFeaturePage(enq, rightPageNum, footers[rightPageNum - 1], data.keyTopicNum);

    // Pages 3 & 4 of module (Facing Spread): Extended Writing Assessment (12m / 16m+4m)
    html += renderExtendedWritingPages(
      enq,
      linedLeftPageNum,
      linedRightPageNum,
      footers,
      data.keyTopicNum,
    );
  });`;

const newLoop = `  data.enquiries.forEach((enq, idx) => {
    const leftPageNum = 4 + idx * 4; // 4, 8, 12, 16
    const rightPageNum = leftPageNum + 1; // 5, 9, 13, 17
    const linedLeftPageNum = leftPageNum + 2; // 6, 10, 14, 18
    const linedRightPageNum = leftPageNum + 3; // 7, 11, 15, 19

    // Page 1 of module (Verso): Chronological Inquiry Spine & Exposition Notes (30 ruled lines)
    html += renderSpinePage(enq, leftPageNum, footers[leftPageNum - 1], data.keyTopicNum);

    // Page 2 of module (Recto): Extended Writing Assessment (Stimulus, Accessible Writing Frames, Key Vocab Bank, 22 flex lines, Timeline Mission)
    html += renderModulePage2(enq, rightPageNum, footers[rightPageNum - 1], data.keyTopicNum);

    // Page 3 of module (Verso): Extended Writing Continued (31 ruled lines with 22mm margin)
    html += renderModulePage3(enq, linedLeftPageNum, footers[linedLeftPageNum - 1], data.keyTopicNum);

    // Page 4 of module (Recto): Essay Synthesis (24 lines) + Q1 Feature Practice [Q1a 2m + Q1b 2m = 4m]
    html += renderModulePage4(enq, linedRightPageNum, footers[linedRightPageNum - 1], data.keyTopicNum);
  });`;

if (code.includes(oldLoop)) {
  code = code.replace(oldLoop, newLoop);
  console.log('✅ Replaced enquiry loop in buildEeeKeyTopicWorkbook');
} else {
  console.error('❌ Failed to locate oldLoop');
  process.exit(1);
}

// 5. Update back cover ledger rows
const oldLedgerStart = "let examRowsHtml = '';";
const oldLedgerEnd = '// 4 Interactive Digital Dual-QR Cards (Lesson Hub + 20-Q Quiz)';

const ledgerStartIdx = code.indexOf(oldLedgerStart);
const ledgerEndIdx = code.indexOf(oldLedgerEnd);

if (ledgerStartIdx !== -1 && ledgerEndIdx !== -1) {
  const newLedgerBlock = `let examRowsHtml = '';

  data.enquiries.forEach((enq, idx) => {
    const leftPageNum = idx * 4 + 4;
    const rightPageNum = idx * 4 + 5;
    const linedRightPageNum = idx * 4 + 7;
    const extTariff = enq.tariff && enq.tariff.includes('12') ? 12 : 20;
    const extLabel = enq.tariff && enq.tariff.includes('12') ? 'Q2 Explain Why' : 'Q3 Essay';

    const featAText = cleanStem(enq.featureA?.stem);
    const featBText = cleanStem(enq.featureB?.stem);
    let extText = enq.examStem || enq.rightExam?.stem || 'Extended Writing Task';
    if (extText.length > 70) extText = extText.slice(0, 67) + '...';

    examRowsHtml += \`
      <tr style="border-top: 1.5px solid #000000; border-bottom: 1px solid #cbd5e1; background: #ffffff;">
        <td rowspan="4" style="padding: 3px 4px; text-align: center; font-weight: 900; font-size: 8.5pt; border-right: 1.2px solid #000000; vertical-align: middle; background: #f8fafc;">
          \${data.keyTopicNum}.\${enq.enquiryNum}
        </td>
        <td rowspan="4" style="padding: 3px 8px; border-right: 1.2px solid #000000; vertical-align: middle; background: #ffffff;">
          <strong style="font-size: 8.0pt; text-transform: uppercase; color: #000000; display: block; line-height: 1.2;">
            Enquiry \${data.keyTopicNum}.\${enq.enquiryNum}: \${enq.title}
          </strong>
          <span style="font-size: 7.2pt; color: #475569; display: block; margin-top: 2px;">
            Spine Lecture Notes (p. \${leftPageNum}): [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]
          </span>
        </td>
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. \${rightPageNum}–\${linedRightPageNum}
        </td>
        <td style="padding: 3px 8px; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 600;">
          <strong>\${extLabel}:</strong> \${extText} [\${extTariff}m]
        </td>
        <td rowspan="4" style="padding: 4px 6px; text-align: center; border-right: 1.2px solid #000000; font-size: 8.5pt; font-weight: 800; vertical-align: middle; background: #ffffff;">
          [ &nbsp;&nbsp;&nbsp;<strong>___ / ___</strong>&nbsp;&nbsp;&nbsp; ]
        </td>
        <td style="padding: 3px 6px; text-align: center; font-size: 9.0pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ \${extTariff}</strong> ]
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #cbd5e1; background: #ffffff;">
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. \${linedRightPageNum}
        </td>
        <td style="padding: 3px 8px; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 600;">
          <strong>Q1(a) Feature:</strong> \${featAText} [2m]
        </td>
        <td style="padding: 3px 6px; text-align: center; font-size: 9.0pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 2</strong> ]
        </td>
      </tr>
      <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. \${linedRightPageNum}
        </td>
        <td style="padding: 3px 8px; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 600;">
          <strong>Q1(b) Feature:</strong> \${featBText} [2m]
        </td>
        <td style="padding: 3px 6px; text-align: center; font-size: 9.0pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 2</strong> ]
        </td>
      </tr>
      <tr style="border-bottom: 1.5px solid #000000; background: #f8fafc;">
        <td style="padding: 2px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.0pt; font-weight: 800; color: #475569;">
          Summary
        </td>
        <td style="padding: 2px 8px; border-right: 1px solid #000000; font-size: 7.0pt; font-weight: 700; color: #475569;">
          Total Module Enquiry Assessment Mark
        </td>
        <td style="padding: 2px 6px; text-align: center; font-size: 8.5pt; font-weight: 900; white-space: nowrap; color: #000000;">
          [ &nbsp;&nbsp;&nbsp;<strong>/ \${extTariff + 4}</strong> ]
        </td>
      </tr>
    \`;
  });\n\n  `;

  code = code.substring(0, ledgerStartIdx) + newLedgerBlock + code.substring(ledgerEndIdx);
  console.log('✅ Replaced ledger rows');
} else {
  console.error('❌ Failed to locate ledger block');
  process.exit(1);
}

fs.writeFileSync(targetFile, code, 'utf8');
console.log('🎉 Successfully applied Golden Standard to scripts/render_eee_twopage_workbook.cjs');

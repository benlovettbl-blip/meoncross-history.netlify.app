/**
 * History Revision Hub — Sandbox Pilot Comparison Runner
 *
 * Runs the universal KS3 engine on Year 8 Early Modern World data and compares
 * the output against the frozen production gold standard.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderKs3WorkbookToPdf } = require('./ks3_workbook_engine.cjs');
const { lessonConfigs } = require('../render_early_modern_world_twopage_workbook.cjs');

const ROOT_DIR = path.join(__dirname, '..', '..');

const timelineMilestones = [
  {
    date: '1453',
    title: 'Milestone 1: Fall of Constantinople & Ottoman Hegemony',
    lesson: 'Lesson 1',
    summary:
      'Sultan Mehmed II’s Ottoman forces breach the Byzantine walls using massive siege cannons. Controlling Constantinople and the Silk Road, the Ottoman Empire levies heavy transit taxes, forcing peripheral European crowns out onto the Atlantic to search for maritime routes to Asian spices.',
    sketchPrompt:
      '✎ Dual-Coding Sketchpad: Sketch the Ottoman siege cannon, Mehmed II’s galleys rolling over land, or Constantinople.',
    keyTerm: 'Ottoman Hegemony',
    exactDate: 'May 1453',
  },
  {
    date: '1494–1588',
    title: 'Milestone 2: Treaty of Tordesillas & Defeat of the Spanish Armada',
    lesson: 'Lesson 2',
    summary:
      'Pope Alexander VI divides the globe between Catholic Spain and Portugal (Treaty of Tordesillas). Protestant England strikes back through state-sponsored privateering (Drake, Hawkins). When Philip II sends the 1588 Armada to invade England, English fireships and storms scatter the fleet, unleashing English oceanic ambitions.',
    sketchPrompt:
      '✎ Dual-Coding Sketchpad: Sketch the 1494 Tordesillas meridian dividing the Atlantic, or Drake’s fireships scattering the Armada.',
    keyTerm: 'Mercantilism & Privateering',
    exactDate: '1494 / 1588',
  },
  {
    date: '1600–1615',
    title: 'Milestone 3: Foundation of the East India Company & Mughal Trade',
    lesson: 'Lesson 3',
    summary:
      'Elizabeth I charters the East India Company. English merchants operate as humble supplicants at the court of Mughal Emperor Jahangir, securing trade firmans to build fortified factories at Surat and Madras. Over time, commercial enclaves expand into private corporate armies and territorial rule.',
    sketchPrompt:
      '✎ Dual-Coding Sketchpad: Sketch Sir Thomas Roe bowing before Emperor Jahangir, or a fortified coastal trading factory at Surat.',
    keyTerm: 'Joint-Stock Factory',
    exactDate: '31 Dec 1600',
  },
  {
    date: '1605',
    title: 'Milestone 4: The Gunpowder Plot & Jacobean Surveillance State',
    lesson: 'Lesson 4',
    summary:
      'Disillusioned Catholic conspirators led by Robert Catesby conceal 36 gunpowder barrels beneath the House of Lords. Discovered on 4 November, Guy Fawkes is captured. Robert Cecil’s surveillance network weaponizes the conspiracy to enact ferocious anti-recusancy laws and solidify Protestant state identity.',
    sketchPrompt:
      '✎ Dual-Coding Sketchpad: Sketch the 36 barrels in the Parliament undercroft, the Monteagle letter, or Guy Fawkes.',
    keyTerm: 'Recusancy & Counter-Espionage',
    exactDate: '5 Nov 1605',
  },
  {
    date: '1642–1649',
    title: 'Milestone 5: The English Civil War & Execution of Charles I',
    lesson: 'Lesson 5',
    summary:
      "Constitutional collision over Divine Right, Ship Money, and religion plunges England into civil war. Parliament's New Model Army defeats Royalist forces. In January 1649, Charles I is executed outside Whitehall for treason against his own people; England becomes an unprecedented Puritan republic under Oliver Cromwell.",
    sketchPrompt:
      '✎ Dual-Coding Sketchpad: Sketch Charles I raising the royal standard at Nottingham, or the execution scaffold outside Whitehall.',
    keyTerm: 'Regicide & Parliamentary Sovereignty',
    exactDate: '30 Jan 1649',
  },
  {
    date: '1688–1694',
    title: 'Milestone 6: Glorious Revolution & Founding of the Bank of England',
    lesson: 'Lesson 6',
    summary:
      "James II deposed in the Glorious Revolution. William III and Mary II accept the 1689 Bill of Rights, establishing constitutional monarchy. In 1694, the Bank of England is founded, creating the National Debt; Britain's new fiscal-military state raises millions at low interest to build the Royal Navy into Europe's supreme fleet.",
    sketchPrompt:
      '✎ Dual-Coding Sketchpad: Sketch the 1689 Bill of Rights parchment, or the founding charter and gold vaults of the Bank of England.',
    keyTerm: 'Fiscal-Military State',
    exactDate: '1688 / 1694',
  },
  {
    date: 'c.1700–1780',
    title: 'Milestone 7: The Transatlantic Slave Trade & The Brookes',
    lesson: 'Lesson 7',
    summary:
      'British ports (Liverpool, Bristol, London) dominate the Triangular Trade. British ships force over 3 million enslaved Africans across the catastrophic Middle Passage into chattel slavery on Caribbean sugar estates. In 1788, the abolitionist plan of the slave ship Brookes exposes the industrial scale of human commodification.',
    sketchPrompt:
      '✎ Dual-Coding Sketchpad: Sketch the chilling cross-section diagram of the slave ship Brookes, or the triangular trade flow.',
    keyTerm: 'Triangular Trade & Chattel Slavery',
    exactDate: '18th Century',
  },
  {
    date: '1739–1760',
    title: 'Milestone 8: Jamaican Maroon Sovereignty & Tacky’s Rebellion',
    lesson: 'Lesson 8',
    summary:
      'Enslaved Africans actively resist the plantation machine through sabotage, cultural preservation, and armed insurrection. In Jamaica, Queen Nanny leads Maroon guerillas against British regiments, forcing the Crown to sign the 1739 Peace Treaty recognizing Maroon sovereignty—proving black agency long before parliamentary abolition.',
    sketchPrompt:
      '✎ Dual-Coding Sketchpad: Sketch Queen Nanny’s Blue Mountain fighters, the horn (abeng) signaling across ravines, or the 1739 Treaty.',
    keyTerm: 'Maroon Sovereignty & Agency',
    exactDate: '1739 / 1760',
  },
];

// Map into pure declarative schema
const pilotConfig = {
  unitId: 'early_modern_world',
  unitTitle: 'THE EARLY MODERN WORLD (1450–1750)',
  yearGroup: 'Year 8',
  overarchingEnquiry:
    'How did religious conflict, oceanic exploration, constitutional civil war, and popular resistance transform Britain and the wider world?',
  coverImage: 'images/east_offering.jpg',
  coverPlate: {
    tag: 'Primary Painting Plate • Spiridione Roma (1778)',
    shelfmark: 'THE BRITISH LIBRARY • EAST INDIA HOUSE',
    title: '‘The East Offering Its Riches to Britannia’',
    description:
      'Spiridione Roma’s 1778 ceiling fresco commissioned for the East India Company House in Leadenhall Street, London, allegorically visualising the colonial extraction and transfer of Asian wealth to Britannia.',
  },
  thematicStrands: [
    {
      title: 'Sovereignty & Power',
      color: '#1e3a8a',
      trajectory: 'Divine Right → Civil War, Regicide & 1689 Settlement (L4–L6)',
    },
    {
      title: 'Exploration & Trade',
      color: '#0369a1',
      trajectory: 'Ottoman fall → Tordesillas → East India Co (L1–L3)',
    },
    {
      title: 'Religious Volatility',
      color: '#b91c1c',
      trajectory: 'Reformation → Gunpowder Plot & Puritan State (L2, L4, L5)',
    },
    {
      title: 'Enslaved Resistance',
      color: '#15803d',
      trajectory: 'Triangular Trade → The Brookes → Maroons & Nanny (L7, L8)',
    },
  ],
  hubUrl: 'https://the-history-revision-hub.netlify.app/?unit=early_modern_world',
  milestones: timelineMilestones,
  lessons: lessonConfigs.map((cfg, i) => {
    const subLabels = [
      'Ottoman Power',
      'Early Empire',
      'Mughal India',
      'Jacobean State',
      'Civil War',
      'Glorious Rev.',
      'Atlantic Slave',
      'Resistance',
    ];
    const overviewTitles = [
      'Global Power in 1450',
      'Religious Zeal & Exploration',
      'Trade to Empire',
      'Gunpowder Plot & Terror',
      'The English Civil War',
      'The Financial Revolution',
      'Transatlantic Slave Trade',
      'Enslaved Resistance',
    ];
    const syllabusTopics = [
      'Ottoman Hegemony, Fall of Constantinople & European Periphery.',
      'Papal Bull, Treaty of Tordesillas & Spanish Armada.',
      'East India Company, Mughal Bengal & North American Trade.',
      'Recusancy Fines, 36 Barrels & Cecil’s Surveillance State.',
      'Divine Right Absolutism, Ship Money, Regicide & Cromwell.',
      'The 1688 Settlement, Bank of England & Fiscal State.',
      'Triangular Trade, The Brookes & The Middle Passage.',
      'Queen Nanny of the Maroons, Tacky’s Revolt & Abolition Agency.',
    ];
    const specBullets = [
      [
        '1453 Fall of Constantinople & Ottoman Silk Road taxes',
        'Ming China’s maritime retreat & Asian economic dominance',
        'European peripheral isolation & quest for spice routes',
      ],
      [
        '1494 Treaty of Tordesillas: Papal division of the globe',
        'Protestant privateering: Drake & Hawkins raid bullion',
        '1588 Spanish Armada defeat: English oceanic ambitions',
      ],
      [
        '1600 East India Company charter & Sir Thomas Roe in Agra',
        'Fortified coastal trading factories (Surat, Madras, Calcutta)',
        'EIC corporate armies & transition to territorial rule',
      ],
      [
        '1605 Gunpowder Plot: 36 barrels beneath Parliament',
        'Recusancy fines & James I’s Divine Right of Kings',
        'Robert Cecil’s surveillance network & Protestant identity',
      ],
      [
        'Divine Right vs Parliament: Ship Money & Personal Rule',
        '1642 Civil War outbreak & Cromwell’s New Model Army',
        '1649 Regicide of Charles I & the Puritan Republic',
      ],
      [
        '1688 Glorious Revolution & 1689 Bill of Rights',
        '1694 Bank of England & National Debt fund the Navy',
        'Britain’s transformation into a fiscal-military power',
      ],
      [
        'Triangular Trade architecture: outward, middle & homeward',
        'Horrors of Middle Passage & 1788 Brookes ship diagram',
        'Chattel slavery, sugar estates & human commodification',
      ],
      [
        'Covert resistance: sabotage, culture & work slowdowns',
        'Armed insurrections: 1760 Tacky’s Revolt in Jamaica',
        'Queen Nanny & Maroons win 1739 Sovereign Peace Treaty',
      ],
    ];
    return {
      ...cfg,
      shortTitle: subLabels[i] || `Lesson ${i + 1}`,
      overviewTitle: overviewTitles[i] || `Lesson ${i + 1}`,
      syllabusTopic: syllabusTopics[i] || '',
      specBullets: specBullets[i] || [],
      questionCount: 20,
    };
  }),
  timelineCheckP2:
    'Why did the fall of Constantinople in 1453 force European crowns out onto the Atlantic Ocean?',
  timelineCheckP3:
    'How did the wealth generated by Atlantic trade and the 1688 financial settlement transform Britain into a global superpower?',
  timelinePart1Title:
    'Living Unit Timeline • Part 1: Global Encounter & Religious Crisis (1450–1605)',
  timelinePart2Title:
    'Living Unit Timeline • Part 2: Civil War, Finance & Enslaved Resistance (1642–1739)',
  quips: [
    'The History Department • Key Stage 3 Historical Studies • Year 8',
    'Trade routes like the Silk Road were engines of wealth, technology, and cultural exchange.',
    'Empires rose and fell on gunpowder, taxation, and bureaucratic organisation.',
    'The capture of Constantinople in 1453 shifted global trade away from the Mediterranean.',
    'European voyages were driven by gold, God, and competition for spices.',
    'Trade with Mughal India laid the foundations of the East India Company.',
    'In 1605, religious division erupted into the Gunpowder Plot beneath Parliament.',
    'The English Civil War pitted Divine Right against parliamentary sovereignty.',
    'The 1688 Glorious Revolution established a constitutional monarchy.',
    'The transatlantic slave trade relied on brutal exploitation and dehumanisation.',
    'Enslaved people constantly fought back through everyday sabotage and open rebellion.',
    'Historical evidence reveals multiple perspectives; always interrogate author motive.',
    'Primary sources are products of their time; cross-reference dispatches with material artifacts.',
    'Connectives build strong historical arguments: Consequently, This directly resulted in...',
    'History is not a static list of dates, but a live argument about how our modern world was made.',
    'Always evaluate long-term significance alongside immediate short-term triggers.',
    'Resistance took many forms: cultural preservation, escape, and armed insurrection.',
    'Queen Nanny and the Jamaican Maroons forced an empire into a treaty of freedom.',
    'Independent judgement requires balancing competing historiographical interpretations.',
    'Key Stage 3 Historical Studies • Pupil Assessment Record • Year 8',
  ],
  pageHeight: '256mm',
  pageMargin: '10mm 12mm 10mm 12mm',
};

async function runPilot() {
  console.log('🚀 Running KS3 Universal Engine Sandbox Pilot on Year 8 Early Modern World...');
  const outputDir = path.join(ROOT_DIR, 'public', 'units', 'sandbox_pilot');

  const { htmlPath, pdfPath } = await renderKs3WorkbookToPdf(pilotConfig, outputDir);
  console.log(`✅ Sandbox HTML generated at: ${htmlPath}`);
  console.log(`✅ Sandbox PDF compiled at: ${pdfPath}`);

  // Take snapshots of Page 10, Page 11, and Page 20
  console.log('📸 Snapping pilot pages for side-by-side comparison...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });

  // Evaluate lines again if needed in DOM
  await page.evaluate(() => {
    if (typeof autoFillWritingLines === 'function') autoFillWritingLines();
  });

  const p1 = await page.$('#page-1');
  if (p1) await p1.screenshot({ path: path.join(outputDir, 'pilot_page1.png') });
  const p2 = await page.$('#page-2');
  if (p2) await p2.screenshot({ path: path.join(outputDir, 'pilot_page2.png') });
  const p3 = await page.$('#page-3');
  if (p3) await p3.screenshot({ path: path.join(outputDir, 'pilot_page3.png') });
  const p4 = await page.$('#page-4');
  if (p4) await p4.screenshot({ path: path.join(outputDir, 'pilot_page4.png') });
  const p5 = await page.$('#page-5');
  if (p5) await p5.screenshot({ path: path.join(outputDir, 'pilot_page5.png') });
  const p6 = await page.$('#page-6');
  if (p6) await p6.screenshot({ path: path.join(outputDir, 'pilot_page6.png') });
  const p7 = await page.$('#page-7');
  if (p7) await p7.screenshot({ path: path.join(outputDir, 'pilot_page7.png') });
  const p8 = await page.$('#page-8');
  if (p8) await p8.screenshot({ path: path.join(outputDir, 'pilot_page8.png') });
  const p10 = await page.$('#page-10');
  if (p10) await p10.screenshot({ path: path.join(outputDir, 'pilot_page10.png') });
  const p11 = await page.$('#page-11');
  if (p11) await p11.screenshot({ path: path.join(outputDir, 'pilot_page11.png') });
  const p12 = await page.$('#page-12');
  if (p12) await p12.screenshot({ path: path.join(outputDir, 'pilot_page12.png') });
  const p14 = await page.$('#page-14');
  if (p14) await p14.screenshot({ path: path.join(outputDir, 'pilot_page14.png') });
  const p16 = await page.$('#page-16');
  if (p16) await p16.screenshot({ path: path.join(outputDir, 'pilot_page16.png') });
  const p18 = await page.$('#page-18');
  if (p18) await p18.screenshot({ path: path.join(outputDir, 'pilot_page18.png') });
  const p20 = await page.$('#page-20');
  if (p20) await p20.screenshot({ path: path.join(outputDir, 'pilot_page20.png') });

  await browser.close();
  console.log(`🎉 Pilot comparison snapshots saved to ${outputDir}`);

  // Synchronize compiled PDF and HTML to primary public/pdfs, dist, unit folders, and Google Drive
  const prodPdfPath = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'early_modern_world_pupil_workbook.pdf',
  );
  const prodPdfV17 = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'early_modern_world_pupil_workbook_FINAL_V17.pdf',
  );
  const distPdfV17 = path.join(
    ROOT_DIR,
    'dist',
    'pdfs',
    'early_modern_world_pupil_workbook_FINAL_V17.pdf',
  );
  const distPdf = path.join(ROOT_DIR, 'dist', 'pdfs', 'early_modern_world_pupil_workbook.pdf');
  const prodHtml1 = path.join(
    ROOT_DIR,
    'public',
    'units',
    'early_modern_world',
    'pupil_workbook.html',
  );
  const prodHtml2 = path.join(ROOT_DIR, 'units', 'early_modern_world', 'pupil_workbook.html');

  fs.mkdirSync(path.dirname(distPdfV17), { recursive: true });
  fs.copyFileSync(pdfPath, prodPdfPath);
  fs.copyFileSync(pdfPath, prodPdfV17);
  fs.copyFileSync(pdfPath, distPdfV17);
  fs.copyFileSync(pdfPath, distPdf);
  fs.copyFileSync(htmlPath, prodHtml1);
  fs.copyFileSync(htmlPath, prodHtml2);
  console.log(`✅ Synchronized to production PDF: ${prodPdfPath}`);
  console.log(`✅ Synchronized to production V17 PDF: ${prodPdfV17}`);
  console.log(`✅ Synchronized to dist PDF: ${distPdfV17}`);

  // Google Drive Department File synchronization (if connected)
  const gDriveFolder = 'G:\\My Drive\\AAMX\\Dep File\\Year 8\\Early Modern World';
  if (fs.existsSync(gDriveFolder)) {
    try {
      const gDriveFile1 = path.join(gDriveFolder, 'Early Modern World Pupil Workbook.pdf');
      const gDriveFile2 = path.join(
        gDriveFolder,
        'early_modern_world_pupil_workbook_FINAL_V17.pdf',
      );
      const gDriveFile3 = path.join(
        gDriveFolder,
        'Early Modern World Pupil Workbook (V18 - Ruled Lines Fixed).pdf',
      );
      fs.copyFileSync(pdfPath, gDriveFile1);
      fs.copyFileSync(pdfPath, gDriveFile2);
      fs.copyFileSync(pdfPath, gDriveFile3);
      console.log(`✅ Synchronized to Google Drive Department File: ${gDriveFile1}`);
      console.log(`✅ Synchronized to Google Drive Department File: ${gDriveFile3}`);
    } catch (gErr) {
      console.warn(
        `⚠️ Warning: Could not write directly to Google Drive (file may be open):`,
        gErr.message,
      );
    }
  }
}

runPilot().catch((err) => {
  console.error('❌ Error running pilot:', err);
  process.exit(1);
});

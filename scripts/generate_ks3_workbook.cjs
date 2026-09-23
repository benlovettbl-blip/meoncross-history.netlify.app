/**
 * History Revision Hub — Universal KS3 Declarative Workbook CLI & Pipeline
 *
 * Compiles 20-Page A4 Pupil Workbooks using the Declarative Universal KS3 Workbook Engine:
 * - Page 1: Publisher-Grade Front Cover with Pupil Portfolio & Department Customizer
 * - Pages 2–3: Living Timeline & Panoramic Dual-Coding Spread
 * - Pages 4–19: Double-Page Enquiry Spreads (Verso Evidence Launchpad + Recto Extended Writing)
 * - Page 20: Universal KS3 Back Cover (Assessment Ledger & QR Hub)
 *
 * Usage:
 *   node scripts/generate_ks3_workbook.cjs <unit_id>
 * Example:
 *   node scripts/generate_ks3_workbook.cjs early_modern_world
 */

const fs = require('fs');
const path = require('path');
const { renderKs3WorkbookToPdf } = require('./ks3_workbook_engine.cjs');

const ROOT_DIR = path.join(__dirname, '..');
const unitId = process.argv[2] || 'early_modern_world';

// Registry of Unit Configurations for KS3 Universal Engine
const UNIT_REGISTRY = {
  early_modern_world: () => {
    const { lessonConfigs } = require('./render_early_modern_world_twopage_workbook.cjs');
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
      unitId: 'early_modern_world',
      unitTitle: 'THE EARLY MODERN WORLD (1450–1750)',
      yearGroup: 'Year 8',
      yearNumber: 8,
      gDriveFolderName: 'Early Modern World',
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
      lessons: lessonConfigs.map((cfg, i) => ({
        ...cfg,
        shortTitle: subLabels[i] || `Lesson ${i + 1}`,
        overviewTitle: overviewTitles[i] || `Lesson ${i + 1}`,
        syllabusTopic: syllabusTopics[i] || '',
        specBullets: specBullets[i] || [],
        questionCount: 20,
      })),
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
        'Sustained criteria evaluation separates description from historical mastery.',
        'The 1689 Bill of Rights permanently subordinated the Crown to Parliament.',
        'Resistance was continuous: enslaved Africans rebelled at every stage of the trade.',
        'Queen Nanny used guerrilla warfare in the Blue Mountains to defeat British regulars.',
        'Abolition was won through political agitation, economic shifts, and African resistance.',
        'Key Stage 3 Historical Studies • Pupil Assessment Record',
      ],
    };
  },
};

async function main() {
  console.log(`\n======================================================`);
  console.log(`🚀 Universal KS3 Declarative Workbook Engine: [${unitId}]`);
  console.log(`======================================================\n`);

  if (!UNIT_REGISTRY[unitId]) {
    // If not in declarative registry, check if a unit-specific two-page renderer exists
    const fallbackScript = path.join(__dirname, `render_${unitId}_twopage_workbook.cjs`);
    if (fs.existsSync(fallbackScript)) {
      console.log(`Executing two-page workbook compiler: ${fallbackScript}...`);
      const { execSync } = require('child_process');
      execSync(`node "${fallbackScript}"`, { stdio: 'inherit', cwd: ROOT_DIR });
      return;
    }
    console.error(
      `❌ Error: Unit [${unitId}] is not registered in the Universal KS3 Workbook Engine.`,
    );
    process.exit(1);
  }

  const unitConfig = UNIT_REGISTRY[unitId]();
  const outputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  console.log(`Compiling 20-page A4 workbook for ${unitConfig.unitTitle}...`);
  const { htmlPath, pdfPath } = await renderKs3WorkbookToPdf(unitConfig, outputDir);

  // Synchronize to standard production destinations
  const prodPdfPath = path.join(ROOT_DIR, 'public', 'pdfs', `${unitId}_pupil_workbook.pdf`);
  const prodPdfV17 = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    `${unitId}_pupil_workbook_FINAL_V17.pdf`,
  );
  const distPdfV17 = path.join(ROOT_DIR, 'dist', 'pdfs', `${unitId}_pupil_workbook_FINAL_V17.pdf`);
  const distPdf = path.join(ROOT_DIR, 'dist', 'pdfs', `${unitId}_pupil_workbook.pdf`);
  const prodHtml1 = path.join(ROOT_DIR, 'public', 'units', unitId, 'pupil_workbook.html');
  const prodHtml2 = path.join(ROOT_DIR, 'units', unitId, 'pupil_workbook.html');

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

  // Synchronize to Google Drive Department File (if connected)
  const gDriveFolder = `G:\\My Drive\\AAMX\\Dep File\\Year ${unitConfig.yearNumber || 8}\\${unitConfig.gDriveFolderName || 'Early Modern World'}`;
  if (fs.existsSync(gDriveFolder)) {
    try {
      const gDriveFile1 = path.join(
        gDriveFolder,
        `${unitConfig.gDriveFolderName || 'Early Modern World'} Pupil Workbook.pdf`,
      );
      const gDriveFile2 = path.join(gDriveFolder, `${unitId}_pupil_workbook_FINAL_V17.pdf`);
      const gDriveFile3 = path.join(
        gDriveFolder,
        `${unitConfig.gDriveFolderName || 'Early Modern World'} Pupil Workbook (V18 - Ruled Lines Fixed).pdf`,
      );
      fs.copyFileSync(pdfPath, gDriveFile1);
      fs.copyFileSync(pdfPath, gDriveFile2);
      fs.copyFileSync(pdfPath, gDriveFile3);
      console.log(`✅ Synchronized to Google Drive: ${gDriveFile1}`);
      console.log(`✅ Synchronized to Google Drive: ${gDriveFile3}`);
    } catch (gErr) {
      console.warn(
        `⚠️ Warning: Could not write directly to Google Drive (file may be open):`,
        gErr.message,
      );
    }
  }

  console.log(`\n🎉 100% SUCCESS: KS3 Workbook for [${unitId}] compiled and synchronized!`);
}

main().catch((err) => {
  console.error('❌ Error compiling KS3 workbook:', err);
  process.exit(1);
});

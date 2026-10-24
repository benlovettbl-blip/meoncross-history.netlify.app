/**
 * extract_all_gcse_specifications.cjs
 *
 * Extracts all 17 Pearson Edexcel GCSE (9–1) History specification options
 * from the official Issue 6 (June 2024) specification PDF into standardized JSON files.
 *
 * Output Directory: public/data/specifications/
 * Manifest: public/data/specifications/specifications_manifest.json
 */

const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const PDF_PATH = 'G:\\My Drive\\AAMX\\Dep File\\gcse-9-1-history-specification.pdf';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data', 'specifications');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const EXAM_STRUCTURES = {
  paper1: {
    paper_code: '1HI0/10–13',
    paper_name: 'Paper 1: Thematic Study and Historic Environment',
    total_marks: 52,
    duration_minutes: 80,
    weighting: '30% of total GCSE',
    overview:
      'Section A tests the Historic Environment site (16 marks, 25 mins). Section B tests the Thematic Study across 4 eras (36 marks, 55 mins) plus 4 marks for SPaG.',
    sections: [
      { id: 'section_a', name: 'Section A: Historic Environment', marks: 16, time_mins: 25 },
      { id: 'section_b', name: 'Section B: Thematic Study', marks: 36, time_mins: 55 },
    ],
  },
  paper2_b: {
    paper_code: '1HI0/B1–B4',
    paper_name: 'Paper 2 (Booklet B): British Depth Study',
    total_marks: 32,
    duration_minutes: 55,
    weighting: '20% of total GCSE',
    overview:
      'Tests British depth across 3 Key Topics. Q1(a)/(b) Describe features (4m), Q2 Explain why causation (12m), Q3/Q4 Choice essay with stimulus points (16m).',
  },
  paper2_p: {
    paper_code: '1HI0/P1–P5',
    paper_name: 'Paper 2 (Booklet P): Period Study',
    total_marks: 32,
    duration_minutes: 55,
    weighting: '20% of total GCSE',
    overview:
      'Tests unfolding period narrative across 3 Key Topics. Q1 Explain two consequences (8m), Q2 Write an analytical narrative (8m), Q3 Explain the importance of two events (16m).',
  },
  paper3: {
    paper_code: '1HI0/30–33',
    paper_name: 'Paper 3: Modern Depth Study',
    total_marks: 52,
    duration_minutes: 90,
    weighting: '30% of total GCSE',
    overview:
      'Section A tests source inference (4m) and causation (12m). Section B tests historical interpretations and contemporary source utility (36m) plus 4 marks for SPaG.',
  },
};

const OPTION_DEFS = [
  // --- PAPER 1: THEMATIC ---
  {
    code: '10',
    id: 'paper1_10_crime_punishment',
    paper: 'Paper 1',
    paperType: 'Thematic Study & Historic Environment',
    title:
      'Crime and punishment in Britain, c1000–present and Whitechapel, c1870–c1900: crime, policing and the inner city',
    shortTitle: 'Crime and Punishment',
    historicSite: 'Whitechapel, c1870–c1900: crime, policing and the inner city',
    startMark: 'Option 10:   Crime and punishment in Britain, c1000–present',
    endMark: 'Option 11:',
    examStruct: EXAM_STRUCTURES.paper1,
  },
  {
    code: '11',
    id: 'paper1_11_medicine_britain',
    paper: 'Paper 1',
    paperType: 'Thematic Study & Historic Environment',
    title:
      'Medicine in Britain, c1250–present and The British sector of the Western Front, 1914–18: injuries, treatment and the trenches',
    shortTitle: 'Medicine in Britain',
    historicSite:
      'The British sector of the Western Front, 1914–18: injuries, treatment and the trenches',
    startMark: 'Option 11:   Medicine in Britain, c1250–present',
    endMark: 'Option 12:',
    examStruct: EXAM_STRUCTURES.paper1,
  },
  {
    code: '12',
    id: 'paper1_12_warfare_british_society',
    paper: 'Paper 1',
    paperType: 'Thematic Study & Historic Environment',
    title:
      'Warfare and British society, c1250–present and London and the Second World War, 1939–45',
    shortTitle: 'Warfare and British Society',
    historicSite: 'London and the Second World War, 1939–45',
    startMark: 'Option 12:   Warfare and British society, c1250–present',
    endMark: 'Option 13:',
    examStruct: EXAM_STRUCTURES.paper1,
  },
  {
    code: '13',
    id: 'paper1_13_migrants_britain',
    paper: 'Paper 1',
    paperType: 'Thematic Study & Historic Environment',
    title: 'Migrants in Britain, c800–present and Notting Hill, c1948–c1970',
    shortTitle: 'Migrants in Britain',
    historicSite: 'Notting Hill, c1948–c1970',
    startMark: 'Option 13:   Migrants in Britain, c800–present',
    endMark: 'Paper 2: Period study and British depth study',
    examStruct: EXAM_STRUCTURES.paper1,
  },

  // --- PAPER 2: BRITISH DEPTH ---
  {
    code: 'B1',
    id: 'paper2_b1_anglo_saxon_norman',
    paper: 'Paper 2 (British Depth)',
    paperType: 'British Depth Study',
    title: 'Anglo-Saxon and Norman England, c1060–88',
    shortTitle: 'Anglo-Saxon & Norman England',
    startMark: 'Option B1: Anglo-Saxon and Norman England, c1060–88',
    endMark: 'Option B2:',
    examStruct: EXAM_STRUCTURES.paper2_b,
  },
  {
    code: 'B2',
    id: 'paper2_b2_richard_and_john',
    paper: 'Paper 2 (British Depth)',
    paperType: 'British Depth Study',
    title: 'The reigns of King Richard I and King John, 1189–1216',
    shortTitle: 'Richard I and King John',
    startMark: 'Option B2:   The reigns of King Richard I and King John,',
    endMark: 'Option B3:',
    examStruct: EXAM_STRUCTURES.paper2_b,
  },
  {
    code: 'B3',
    id: 'paper2_b3_henry_viii_ministers',
    paper: 'Paper 2 (British Depth)',
    paperType: 'British Depth Study',
    title: 'Henry VIII and his ministers, 1509–40',
    shortTitle: 'Henry VIII and his Ministers',
    startMark: 'Option B3: Henry VIII and his ministers, 1509–40',
    endMark: 'Option B4:',
    examStruct: EXAM_STRUCTURES.paper2_b,
  },
  {
    code: 'B4',
    id: 'paper2_b4_early_elizabethan_england',
    paper: 'Paper 2 (British Depth)',
    paperType: 'British Depth Study',
    title: 'Early Elizabethan England, 1558–88',
    shortTitle: 'Early Elizabethan England',
    startMark: 'Option B4: Early Elizabethan England, 1558–88',
    endMark: 'Option P1:',
    examStruct: EXAM_STRUCTURES.paper2_b,
  },

  // --- PAPER 2: PERIOD STUDY ---
  {
    code: 'P1',
    id: 'paper2_p1_spain_new_world',
    paper: 'Paper 2 (Period Study)',
    paperType: 'Period Study',
    title: 'Spain and the ‘New World’, c1490–c1555',
    shortTitle: 'Spain & the New World',
    startMark: 'Option P1: Spain and the ‘New World’, c1490–c1555',
    endMark: 'Option P2:',
    examStruct: EXAM_STRUCTURES.paper2_p,
  },
  {
    code: 'P2',
    id: 'paper2_p2_british_america',
    paper: 'Paper 2 (Period Study)',
    paperType: 'Period Study',
    title: 'British America, 1713–83: empire and revolution',
    shortTitle: 'British America',
    startMark: 'Option P2: British America, 1713–83: empire and revolution',
    endMark: 'Option P3:',
    examStruct: EXAM_STRUCTURES.paper2_p,
  },
  {
    code: 'P3',
    id: 'paper2_p3_american_west',
    paper: 'Paper 2 (Period Study)',
    paperType: 'Period Study',
    title: 'The American West, c1835–c1895',
    shortTitle: 'The American West',
    startMark: 'Option P3: The American West, c1835–c1895',
    endMark: 'Option P4:',
    examStruct: EXAM_STRUCTURES.paper2_p,
  },
  {
    code: 'P4',
    id: 'paper2_p4_superpower_cold_war',
    paper: 'Paper 2 (Period Study)',
    paperType: 'Period Study',
    title: 'Superpower relations and the Cold War, 1941–91',
    shortTitle: 'Superpower Relations & Cold War',
    startMark: 'Option P4: Superpower relations and the Cold War, 1941–91',
    endMark: 'Option P5:',
    examStruct: EXAM_STRUCTURES.paper2_p,
  },
  {
    code: 'P5',
    id: 'paper2_p5_middle_east',
    paper: 'Paper 2 (Period Study)',
    paperType: 'Period Study',
    title: 'Conflict in the Middle East, 1945–95',
    shortTitle: 'Conflict in the Middle East',
    startMark: 'Option P5: Conflict in the Middle East, 1945–95',
    endMark: 'Paper 3: Modern depth study',
    examStruct: EXAM_STRUCTURES.paper2_p,
  },

  // --- PAPER 3: MODERN DEPTH ---
  {
    code: '30',
    id: 'paper3_30_russia_soviet_union',
    paper: 'Paper 3',
    paperType: 'Modern Depth Study',
    title: 'Russia and the Soviet Union, 1917–41',
    shortTitle: 'Russia & the Soviet Union',
    startMark: 'Option 30: Russia and the Soviet Union, 1917–41',
    endMark: 'Option 31:',
    examStruct: EXAM_STRUCTURES.paper3,
  },
  {
    code: '31',
    id: 'paper3_31_weimar_nazi_germany',
    paper: 'Paper 3',
    paperType: 'Modern Depth Study',
    title: 'Weimar and Nazi Germany, 1918–39',
    shortTitle: 'Weimar & Nazi Germany',
    startMark: 'Option 31: Weimar and Nazi Germany, 1918–39',
    endMark: 'Option 32:',
    examStruct: EXAM_STRUCTURES.paper3,
  },
  {
    code: '32',
    id: 'paper3_32_maos_china',
    paper: 'Paper 3',
    paperType: 'Modern Depth Study',
    title: 'Mao’s China, 1945–76',
    shortTitle: 'Mao’s China',
    startMark: 'Option 32: Mao’s China, 1945–76',
    endMark: 'Option 33:',
    examStruct: EXAM_STRUCTURES.paper3,
  },
  {
    code: '33',
    id: 'paper3_33_usa_conflict_home_abroad',
    paper: 'Paper 3',
    paperType: 'Modern Depth Study',
    title: 'The USA, 1954–75: conflict at home and abroad',
    shortTitle: 'USA: Conflict at Home & Abroad',
    startMark: 'Option 33: The USA, 1954–75: conflict at home and abroad',
    endMark: '3 Assessment information',
    examStruct: EXAM_STRUCTURES.paper3,
  },
];

function cleanPdfText(rawText) {
  return rawText.replace(
    /Pearson Edexcel Level 1\/Level 2 GCSE[^\n]*\nSpecification – Issue 6 – June 2024[^\n]*\n\s*\d+\s*/g,
    '',
  );
}

function parseSectionContent(sectionText, isThematic = false) {
  const lines = sectionText.split('\n');
  const topics = [];
  let currentTopic = null;
  let currentBullet = null;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();
    if (!line) continue;

    // Check if line starts a new topic (e.g. "1  Early tension", "4  The Armada ● Spanish invasion plans")
    const topicStartMatch = line.match(/^(\d+)\s+([A-Za-z\‘\’\'\"][^\n]*)/);
    const isBulletLine = line.startsWith('●') || line.startsWith('o ') || line.startsWith('•');

    if (topicStartMatch && !isBulletLine) {
      if (currentBullet && currentTopic) {
        currentTopic.points.push(currentBullet.trim());
        currentBullet = null;
      }
      if (currentTopic) {
        topics.push(currentTopic);
      }

      const num = topicStartMatch[1];
      const remainder = topicStartMatch[2].trim();

      // Check if remainder contains a bullet point on the same line
      if (remainder.includes('●')) {
        const parts = remainder.split('●');
        const titleStr = parts[0].trim();
        currentTopic = {
          number: parseInt(num, 10),
          title: `${num}. ${titleStr}`,
          points: [],
        };
        currentBullet = parts.slice(1).join('●').trim();
        continue;
      }

      let titlePart = remainder;
      let j = i + 1;
      while (
        j < lines.length &&
        !lines[j].trim().startsWith('●') &&
        !lines[j].trim().startsWith('o ') &&
        !lines[j].trim().match(/^\d+\s+[A-Za-z]/)
      ) {
        const nextL = lines[j].trim();
        if (nextL.length > 0 && !nextL.includes('Key topic') && !nextL.includes('Option ')) {
          titlePart += ' ' + nextL;
          i = j;
          j++;
        } else {
          break;
        }
      }

      currentTopic = {
        number: parseInt(num, 10),
        title: `${num}. ${titlePart.replace(/\s+/g, ' ')}`,
        points: [],
      };
      continue;
    }

    if (isBulletLine) {
      if (currentBullet && currentTopic) {
        currentTopic.points.push(currentBullet.trim());
      }
      currentBullet = line.replace(/^[●o•]\s*/, '');
    } else if (currentBullet) {
      currentBullet += ' ' + line;
    }
  }

  if (currentBullet && currentTopic) {
    currentTopic.points.push(currentBullet.trim());
  }
  if (currentTopic) {
    topics.push(currentTopic);
  }

  return topics;
}

function parseStandardOption(optDef, rawBlock) {
  const sections = [];
  const ktRegex = /Key topic (\d+):\s*([^\n]+)/g;
  const matches = [...rawBlock.matchAll(ktRegex)];

  for (let m = 0; m < matches.length; m++) {
    const curMatch = matches[m];
    const ktNum = curMatch[1];
    const ktTitle = curMatch[2].trim();
    const startIdx = curMatch.index + curMatch[0].length;
    const endIdx = m + 1 < matches.length ? matches[m + 1].index : rawBlock.length;

    const ktBody = rawBlock.substring(startIdx, endIdx);
    const topics = parseSectionContent(ktBody, false);

    sections.push({
      id: `key-topic-${ktNum}`,
      keyTopicNumber: parseInt(ktNum, 10),
      title: `Key topic ${ktNum}: ${ktTitle}`,
      topics: topics,
    });
  }

  return sections;
}

function parseThematicOption(optDef, rawBlock) {
  const sections = [];
  const eraRegex = /(c\d+–c\d+:[^\n]+|c\d+–present:[^\n]+)/g;
  const eraMatches = [...rawBlock.matchAll(eraRegex)];

  let siteIdx = -1;
  if (optDef.historicSite) {
    siteIdx = rawBlock.indexOf(optDef.historicSite);
    if (siteIdx === -1) {
      const snippet = optDef.historicSite.substring(0, 15);
      siteIdx = rawBlock.indexOf(snippet);
    }
  }

  for (let e = 0; e < eraMatches.length; e++) {
    const curEra = eraMatches[e];
    const eraTitle = curEra[1].trim();
    const startIdx = curEra.index + curEra[0].length;
    let endIdx = e + 1 < eraMatches.length ? eraMatches[e + 1].index : rawBlock.length;

    if (siteIdx > startIdx && siteIdx < endIdx) {
      endIdx = siteIdx;
    }

    const eraBody = rawBlock.substring(startIdx, endIdx);
    const topics = parseSectionContent(eraBody, true);

    sections.push({
      id: `thematic-era-${e + 1}`,
      eraNumber: e + 1,
      title: eraTitle,
      topics: topics,
    });
  }

  if (siteIdx > -1) {
    const siteBody = rawBlock.substring(siteIdx);
    const siteTopics = parseSectionContent(siteBody, true);
    sections.push({
      id: 'historic-environment',
      title: `Historic Environment: ${optDef.historicSite}`,
      topics: siteTopics,
    });
  }

  return sections;
}

async function runExtraction() {
  console.log('================================================================');
  console.log('  PEARSON EDEXCEL GCSE (9-1) HISTORY: SPECIFICATION EXTRACTOR   ');
  console.log('  Issue 6 (June 2024) - Canonical 17-Option Compilation Engine ');
  console.log('================================================================\n');

  if (!fs.existsSync(PDF_PATH)) {
    console.error('FATAL: Specification PDF not found at:', PDF_PATH);
    process.exit(1);
  }

  console.log('Loading and parsing master PDF buffer...');
  const dataBuffer = fs.readFileSync(PDF_PATH);
  const data = await pdf(dataBuffer);
  const cleanedFullText = cleanPdfText(data.text);
  console.log(`PDF parsed successfully. Total characters: ${cleanedFullText.length}\n`);

  const manifest = [];
  let totalPointsAllUnits = 0;

  for (const opt of OPTION_DEFS) {
    const s = cleanedFullText.indexOf(opt.startMark);
    const e = cleanedFullText.indexOf(opt.endMark, s > -1 ? s : 0);

    if (s === -1 || e === -1 || e <= s) {
      console.error(`ERROR: Failed to slice bounds for Option ${opt.code} (${opt.shortTitle})`);
      continue;
    }

    const rawBlock = cleanedFullText.substring(s, e);
    const isThematic = opt.paper === 'Paper 1';
    const sections = isThematic
      ? parseThematicOption(opt, rawBlock)
      : parseStandardOption(opt, rawBlock);

    let unitPointsCount = 0;
    let unitTopicsCount = 0;
    sections.forEach((sec) => {
      unitTopicsCount += sec.topics.length;
      sec.topics.forEach((t) => {
        unitPointsCount += t.points.length;
      });
    });

    totalPointsAllUnits += unitPointsCount;

    const optDoc = {
      id: opt.id,
      code: opt.code,
      paper: opt.paper,
      paperType: opt.paperType,
      title: `Pearson Edexcel GCSE (9–1) History Specification`,
      subtitle: `Option ${opt.code}: ${opt.title}`,
      shortTitle: opt.shortTitle,
      exam_structure: opt.examStruct,
      stats: {
        sectionsCount: sections.length,
        topicsCount: unitTopicsCount,
        pointsCount: unitPointsCount,
      },
      sections: sections,
    };

    const outFilename = `${opt.id}.json`;
    const outPath = path.join(OUTPUT_DIR, outFilename);
    fs.writeFileSync(outPath, JSON.stringify(optDoc, null, 2), 'utf-8');

    manifest.push({
      id: opt.id,
      code: opt.code,
      paper: opt.paper,
      paperType: opt.paperType,
      title: opt.title,
      shortTitle: opt.shortTitle,
      sectionsCount: sections.length,
      topicsCount: unitTopicsCount,
      pointsCount: unitPointsCount,
      file: `/data/specifications/${outFilename}`,
    });

    console.log(
      `[OK] Option ${opt.code.padEnd(3)} | ${opt.shortTitle.padEnd(32)} | Secs: ${String(sections.length).padStart(2)} | Topics: ${String(unitTopicsCount).padStart(2)} | Spec Points: ${String(unitPointsCount).padStart(3)}`,
    );
  }

  const manifestPath = path.join(OUTPUT_DIR, 'specifications_manifest.json');
  fs.writeFileSync(
    manifestPath,
    JSON.stringify(
      {
        qualification: 'Pearson Edexcel GCSE (9–1) in History (1HI0)',
        issue: 'Issue 6 (June 2024)',
        extracted_at: new Date().toISOString(),
        total_options: manifest.length,
        total_specification_points: totalPointsAllUnits,
        options: manifest,
      },
      null,
      2,
    ),
    'utf-8',
  );

  console.log('\n================================================================');
  console.log(`EXTRACTION COMPLETE: ${manifest.length}/17 Options Processed.`);
  console.log(`Total Specification Points Across Qualification: ${totalPointsAllUnits}`);
  console.log(`Master Manifest Generated: ${manifestPath}`);
  console.log('================================================================\n');
}

runExtraction();

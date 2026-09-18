const fs = require('fs');
const path = require('path');

// Helper to protect William Lovett
const WILLIAM_LOVETT_PLACEHOLDER = '___WILLIAM_LOVETT_HISTORICAL_CHARTIST___';
const LOVETT_OCONNOR_PLACEHOLDER = '___LOVETT_AND_OCONNOR_HISTORICAL___';

function sanitizeContent(filePath, content) {
  let text = content;

  // Protect the authentic 19th century Chartist leader William Lovett in history curriculum
  text = text.replace(/William\s+Lovett/g, WILLIAM_LOVETT_PLACEHOLDER);
  text = text.replace(/Lovett\s+and\s+O'Connor/g, LOVETT_OCONNOR_PLACEHOLDER);
  text = text.replace(/leaders\s+like\s+Lovett\b/g, 'leaders like ' + WILLIAM_LOVETT_PLACEHOLDER);

  // 1. URLs & Netlify domain
  text = text.replace(
    /https:\/\/meoncross-history\.netlify\.app/gi,
    'https://the-history-revision-hub.netlify.app',
  );
  text = text.replace(/meoncross-history\.netlify\.app/gi, 'the-history-revision-hub.netlify.app');

  // 2. Asset renames
  text = text.replace(/mr_lovett_wrapper\.png/gi, 'curator_wrapper.png');
  text = text.replace(
    /water_and_sanitation_mr_lovett_wrapper\.png/gi,
    'water_and_sanitation_wrapper.png',
  );
  text = text.replace(/meoncross_chess_board_qr_stands\.pdf/gi, 'chess_board_qr_stands.pdf');

  // 3. Specific pupil, family & incident attribution
  text = text.replace(
    /whose\s+great-great-grandson\s+joins\s+our\s+year\s+10\s+gcse\s+battlefield\s+expedition\.?/gi,
    'whose service record forms the central primary case study for our GCSE Western Front fieldwork.',
  );

  text = text.replace(
    /shared\s+with\s+meoncross\s+school\s+by\s+a\s+year\s+10\s+family/gi,
    'generously shared with the study archive',
  );

  text = text.replace(
    /shared\s+with\s+the\s+school\s+by\s+a\s+year\s+10\s+family/gi,
    'generously shared with the study archive',
  );

  text = text.replace(
    /Shared\s+with\s+Meoncross\s+School\s+by\s+a\s+Year\s+10\s+family/gi,
    'Generously shared with the study archive',
  );

  text = text.replace(
    /family\s+historian\s+John\s+Pearson'?s/gi,
    "the family archive researcher's",
  );
  text = text.replace(/family\s+historian\s+John\s+Pearson/gi, 'the family archive researcher');
  text = text.replace(/Grandfather\s+John\s+Pearson'?s/gi, "the family archive researcher's");
  text = text.replace(/Grandfather\s+John\s+Pearson/gi, 'the family archive researcher');
  text = text.replace(/grandfather\s+John\s+Pearson'?s/gi, "the family archive researcher's");
  text = text.replace(/grandfather\s+John\s+Pearson/gi, 'the family archive researcher');
  text = text.replace(/John\s+Pearson'?s/gi, "the family archive researcher's");
  text = text.replace(/John\s+Pearson/gi, 'the family archive researcher');

  text = text.replace(
    /great-great-grandfather\s+of\s+a\s+Year\s+10\s+pupil/gi,
    'distinguished Western Front veteran',
  );
  text = text.replace(/an\s+ancestor\s+of\s+a\s+Year\s+10\s+Meoncross\s+pupil,?\s*/gi, '');
  text = text.replace(
    /Ancestor\s+of\s+a\s+Year\s+10\s+Meoncross\s+pupil\.?\s*/gi,
    'Distinguished Western Front case study. ',
  );
  text = text.replace(/a\s+Meoncross\s+Year\s+10\s+family/gi, 'the study archive');
  text = text.replace(/Year\s+10\s+Meoncross\s+family/gi, 'study archive');
  text = text.replace(/Meoncross\s+Pupil\s+Family\s+Record/gi, 'Fieldwork Primary Record');
  text = text.replace(/our\s+Meoncross\s+wreath\s+bearers/gi, 'our student wreath bearers');
  text = text.replace(
    /Designated\s+Meoncross\s+pupil\s+wreath\s+bearers/gi,
    'Designated pupil wreath bearers',
  );
  text = text.replace(
    /\(Pupil\s+Family\s+Hero\s*·\s*Year\s+10\s+Family\)/gi,
    '(Western Front Case Study)',
  );
  text = text.replace(
    /In\s+Recognition\s+of\s+the\s+Crummack\s+&amp;\s+Pearson\s+Family\s+Archive/gi,
    'In Recognition of the Crummack Fieldwork Archive',
  );
  text = text.replace(
    /In\s+Recognition\s+of\s+the\s+Crummack\s+&\s+Pearson\s+Family\s+Archive/gi,
    'In Recognition of the Crummack Fieldwork Archive',
  );
  text = text.replace(
    /Meoncross\s+School\s+Commemoration\s+&\s+Family\s+Acknowledgment/gi,
    'Fieldwork Archive Commemoration',
  );

  text = text.replace(
    /The\s+Meoncross\s+School\s+History\s+Department,\s+on\s+behalf\s+of\s+all\s+staff\s+and\s+pupils\s+participating\s+in\s+the\s+2026\s+Ypres\s+Expedition,\s+extends\s+its\s+deepest\s+gratitude\s+to\s+a\s+<strong>Year\s+10\s+Meoncross\s+family<\/strong>,\s+honouring\s+the\s+research\s+and\s+scholarship\s+of\s+family\s+historian\s+<strong>John\s+Pearson<\/strong>\./gi,
    'The History Department, on behalf of all staff and pupils participating in the 2026 Western Front Expedition, extends its deepest gratitude to the Crummack family, honouring the research and scholarship of the family archive researcher.',
  );

  text = text.replace(
    /By\s+sharing\s+family\s+historian\s+John\s+Pearson's\s+meticulous\s+archival\s+dossier\s+and\s+primary\s+photographs,\s+the\s+family\s+has\s+gifted\s+our\s+school\s+a\s+profound\s+educational\s+treasure\./gi,
    "By sharing the family archive researcher's meticulous archival dossier and primary photographs, the archive has gifted our study programme a profound educational treasure.",
  );

  text = text.replace(
    /Curated\s+for\s+the\s+Meoncross\s+School\s+GCSE\s+Battlefield\s+Study\s+Expedition/gi,
    'Curated for the GCSE Battlefield Study Expedition',
  );

  text = text.replace(
    /\(the\s+immediate\s+community\s+of\s+Meoncross\s+School\)/gi,
    '(the local community)',
  );

  // 4. Archive branding & MCP tags
  text = text.replace(
    /MEONCROSS\s+ARCHIVE\s*[·•]\s*COMMEMORATION/gi,
    'FIELDWORK ARCHIVE · COMMEMORATION',
  );
  text = text.replace(/MEONCROSS\s+ARCHIVE/gi, 'FIELDWORK ARCHIVE');
  text = text.replace(/Meoncross\s+Archive/gi, 'Fieldwork Archive');
  text = text.replace(/ARCHIVE\s+REF\s*[•·]\s*MCP-?/gi, 'ARCHIVE REF • WF-');
  text = text.replace(/ARCHIVE\s+REF\s*[•·]\s*MCP/gi, 'ARCHIVE REF • WF');

  // 5. Educational Trust / Corporate branding
  text = text.replace(/Blenheim\s+Schools?/gi, 'Educational Trust');
  text = text.replace(/Cognita\s+Curriculum\s+Standard/gi, 'Educational Trust Curriculum Standard');
  text = text.replace(/Cognita/gi, 'Educational Trust');
  text = text.replace(/Outcomes\s+First\s+Group/gi, 'Educational Trust');
  text = text.replace(/\bOFG\b/g, 'Educational Trust');

  // 6. Teacher Identity & Personal Names
  text = text.replace(
    /Mr\.?\s*Lovett'?s\s+History\s+Hub\s+Mega\s+App/gi,
    'GCSE History Study & Revision Portal',
  );
  text = text.replace(/Mr\.?\s*Lovett'?s\s+History\s+Hub\s+theme/gi, 'History Revision Hub theme');
  text = text.replace(/Mr\.?\s*Lovett'?s\s+History\s+Hub\s+Theme/gi, 'History Revision Hub Theme');
  text = text.replace(/Mr\.?\s*Lovett'?s\s+History\s+Hub/gi, 'The History Revision Hub');
  text = text.replace(/Mr\.?\s*Ben\s+Lovett\s*\(Head\s+of\s+History\)/gi, 'Department Lead');
  text = text.replace(/Mr\.?\s*Ben\s+Lovett/gi, 'Department Lead');
  text = text.replace(/Benjamin\s+Lovett/gi, 'Department Lead');
  text = text.replace(/Mr\.?\s*B\.?\s*Lovett\s*\(Head\s+of\s+History\)/gi, 'Department Lead');
  text = text.replace(/Mr\.?\s*B\.?\s*Lovett/gi, 'Department Lead');
  text = text.replace(/\bB\.\s+Lovett\b/g, 'Department Lead');
  text = text.replace(/Mr\.?\s*Lovett\s*\(Head\s+of\s+History\)/gi, 'Department Lead');
  text = text.replace(
    /Head\s+of\s+History:\s*Mr\.?\s*B\.?\s*Lovett/gi,
    'Head of History: Department Lead',
  );
  text = text.replace(/Mr\.?\s*Lovett/gi, 'Department Lead');

  // Emails
  text = text.replace(/benlovett\.bl@gmail\.com/gi, 'contact@historyhub.local');
  text = text.replace(
    /\b[a-zA-Z0-9._%+-]+@meoncross[a-zA-Z0-9.-]*\.co\.uk\b/gi,
    'contact@historyhub.local',
  );
  text = text.replace(
    /\b[a-zA-Z0-9._%+-]+lovett[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/gi,
    'contact@historyhub.local',
  );

  // Phone numbers & specific school references
  text = text.replace(
    /\+44\s*\(0\)1329\s*662182\s*\(Meoncross\s*School\s*Office\)\s*\/\s*07825\s*297749\s*\(\+44\s*7825\s*297749\s*\(School\s*Mobile\)\)/gi,
    'Emergency Fieldwork Desk: +44 (0)800 000 0000',
  );

  // School name variants
  text = text.replace(
    /Meoncross\s*School\s*\|\s*History\s*Department/gi,
    'The History Portal | History Department',
  );
  text = text.replace(
    /Meoncross\s*School\s*History\s*Department\s*Standard/gi,
    'The History Department Standard',
  );
  text = text.replace(
    /Meoncross\s*School\s*History\s*Department\s*&bull;\s*Whole\s*School\s*Curriculum\s*Map/gi,
    'The History Department &bull; Whole School Curriculum Map',
  );
  text = text.replace(/Meoncross\s*School\s*History\s*Department/gi, 'The History Department');
  text = text.replace(/Meoncross\s*History\s*Department/gi, 'The History Department');
  text = text.replace(
    /Meoncross\s*School\s*•\s*Faculty\s*of\s*Humanities\s*•\s*Department\s*of\s*History/gi,
    'Faculty of Humanities • Department of History',
  );
  text = text.replace(
    /Meoncross\s*School\s*•\s*Faculty\s*of\s*Humanities/gi,
    'Faculty of Humanities',
  );
  text = text.replace(
    /Meoncross\s*School\s*•\s*Department\s*of\s*History\s*•\s*Department\s*Lead/gi,
    'The History Portal • Department of History • Department Lead',
  );
  text = text.replace(
    /Meoncross\s*School\s*•\s*Department\s*of\s*History/gi,
    'The History Portal • Department of History',
  );
  text = text.replace(
    /Meoncross\s*School\s*&bull;\s*Department\s*of\s*History/gi,
    'The History Portal &bull; Department of History',
  );
  text = text.replace(
    /Meoncross\s*School\s*&bull;\s*History\s*Department\s*Archive/gi,
    'The History Portal &bull; History Department Archive',
  );
  text = text.replace(
    /Meoncross\s*School\s*&bull;\s*History\s*Department\s*Curriculum\s*Archive/gi,
    'The History Portal &bull; History Department Curriculum Archive',
  );
  text = text.replace(
    /Meoncross\s*School\s*–\s*Battlefield\s*Tour/gi,
    'GCSE History – Battlefield Tour',
  );
  text = text.replace(/Meoncross\s*Battlefield\s*Tour\s*App/gi, 'GCSE Battlefield Tour App');
  text = text.replace(/Meoncross\s*Battlefield\s*Tour/gi, 'GCSE Battlefield Tour');
  text = text.replace(/Meoncross\s*History\s*Hub/gi, 'GCSE History Hub');
  text = text.replace(/Meoncross\s*History/gi, 'The History Portal');
  text = text.replace(/Meoncross\s*School/gi, 'The History Portal');
  text = text.replace(/Meoncross\s*champions/gi, 'History Hub champions');
  text = text.replace(/Two\s+Meoncross\s+Staff/gi, 'Fieldwork Staff');
  text = text.replace(/two\s+accompanying\s+Meoncross\s+staff/gi, 'accompanying fieldwork staff');
  text = text.replace(
    /Arrival\s+back\s+at\s+Meoncross\s+School\s+for\s+collection/gi,
    'Arrival back at school for collection',
  );
  text = text.replace(
    /Return\s+to\s+Meoncross\s+approx\.?\s*20:30/gi,
    'Return to school approx. 20:30',
  );

  // Remaining Meoncross or Meon Cross
  text = text.replace(/\bMeoncross\b/g, 'The History Portal');
  text = text.replace(/\bmeoncross\b/g, 'history');
  text = text.replace(/\bMeon\s+Cross\b/gi, 'The History Portal');

  // 7. Chess Zone storage & state keys
  text = text.replace(/meoncross_chess_club_v5/g, 'history_chess_club_v5');
  text = text.replace(/meoncross_chess_master_archive/g, 'history_chess_master_archive');
  text = text.replace(/meoncross_chess_backup_snapshot/g, 'history_chess_backup_snapshot');
  text = text.replace(/meoncross_chess_teacher_auth/g, 'history_chess_teacher_auth');
  text = text.replace(/meoncross_chess_active_session/g, 'history_chess_active_session');
  text = text.replace(/meoncross_chess_export_history/g, 'history_chess_export_history');
  text = text.replace(/meoncross_chess_active_players/g, 'history_chess_active_players');
  text = text.replace(/MeoncrossChessDB/g, 'HistoryChessDB');
  text = text.replace(/__meoncrossSessionInterval/g, '__historySessionInterval');
  text = text.replace(/__meoncrossKeydownBound/g, '__historyKeydownBound');
  text = text.replace(/meoncross_quiz_/g, 'history_quiz_');

  // 8. Copyright & Footer Notices
  text = text.replace(
    /©\s*Meoncross\s*School[^\n<]*/gi,
    '© History Education Resources. All rights reserved.',
  );
  text = text.replace(
    /©\s*Mr\.?\s*Lovett[^\n<]*/gi,
    '© History Education Resources. All rights reserved.',
  );
  text = text.replace(
    /&copy;\s*Meoncross\s*School[^\n<]*/gi,
    '&copy; History Education Resources. All rights reserved.',
  );
  text = text.replace(
    /&copy;\s*Mr\.?\s*Lovett[^\n<]*/gi,
    '&copy; History Education Resources. All rights reserved.',
  );

  // Restore William Lovett Chartist leader
  text = text.replace(new RegExp(WILLIAM_LOVETT_PLACEHOLDER, 'g'), 'William Lovett');
  text = text.replace(new RegExp(LOVETT_OCONNOR_PLACEHOLDER, 'g'), "Lovett and O'Connor");

  return text;
}

// Special pass for index.html GDPR purge logic so it doesn't contain the literal word meoncross
function sanitizeIndexHtml(content) {
  let text = sanitizeContent('index.html', content);
  text = text.replace(
    /<title>Mr Lovett's History Hub Mega App<\/title>/gi,
    '<title>GCSE History Study & Revision Portal</title>',
  );
  text = text.replace(/'meoncross_chess_[^']*',?\s*/gi, '');
  text = text.replace(/indexedDB\.deleteDatabase\(['"]MeoncrossChessDB['"]\);?/g, '');
  return text;
}

// Special pass for src/main.js GDPR purge logic
function sanitizeMainJs(content) {
  let text = sanitizeContent('src/main.js', content);
  text = text.replace(/'meoncross_chess_[^']*',?\s*/gi, '');
  text = text.replace(/indexedDB\.deleteDatabase\(['"]MeoncrossChessDB['"]\);?/g, '');
  return text;
}

// Load scan_summary.json to target ONLY files that have matches
const scanData = JSON.parse(fs.readFileSync('scan_summary.json', 'utf8'));
const targetFiles = scanData.fileMatches.map((f) => f.path);

// Also add key root files to be sure
const mustCheck = [
  'index.html',
  'manifest.json',
  'public/manifest.json',
  'package.json',
  'src/main.js',
  'src/chess_zone.js',
  'src/chess_data.js',
  'src/chess_realtime.js',
  'src/navigation.js',
  'src/views.js',
  'src/layout.js',
  'src/storage.js',
  'src/markdown_parser.js',
  'src/types.d.ts',
  'src/engine/modals.js',
  'src/engine/lesson_renderer.js',
  'src/engine/stop_navigator.js',
  'src/engine/AppEngine.js',
  'src/competitions_data.js',
  'src/competitions_zone.js',
  'src/lesson_cards.js',
  'units/trip_ypres/data.js',
  'units/great_war_part2/data.js',
  'DEPARTMENT_MASTER_PLAN_AND_TRACKER.md',
  'NotebookLM_Source_Document.md',
];

const allTargets = Array.from(new Set([...targetFiles, ...mustCheck]));
console.log(`Starting targeted sweep on ${allTargets.length} files...`);

let modifiedCount = 0;
const modifiedFiles = [];

for (const relPath of allTargets) {
  // Skip database.json - we will rebuild it cleanly with scripts/build_database.cjs
  if (relPath === 'public/database.json') continue;
  if (!fs.existsSync(relPath)) continue;

  const ext = path.extname(relPath).toLowerCase();
  if (['.pyc', '.pdf', '.png', '.jpg', '.jpeg', '.webp', '.pptx', '.docx'].includes(ext)) continue;

  try {
    const raw = fs.readFileSync(relPath, 'utf8');
    let sanitized;
    if (relPath === 'index.html') {
      sanitized = sanitizeIndexHtml(raw);
    } else if (relPath === 'src/main.js') {
      sanitized = sanitizeMainJs(raw);
    } else {
      sanitized = sanitizeContent(relPath, raw);
    }

    if (sanitized !== raw) {
      fs.writeFileSync(relPath, sanitized, 'utf8');
      modifiedFiles.push(relPath);
      modifiedCount++;
      console.log(`Sanitized: ${relPath}`);
    }
  } catch (err) {
    console.error(`Error processing ${relPath}:`, err.message);
  }
}

console.log(`\n🎉 Targeted sweep complete! Modified ${modifiedCount} files.`);
fs.writeFileSync('sweep_modified_files.json', JSON.stringify(modifiedFiles, null, 2));

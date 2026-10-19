const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, 'cme_unified_textbook_data.cjs');
const DATA = require('./cme_unified_textbook_data.cjs');

// Deep clone enquiries
const enquiries = JSON.parse(JSON.stringify(DATA.ENQUIRIES));

// 1. Trims for Pages 4, 5, 11:
// Page 4: Enquiry 1 Block 2
enquiries[0].block2.paras[1] = enquiries[0].block2.paras[1].replace(
  ' Britain had promised the exact same land to two different nations.',
  '',
);

// Page 5: Enquiry 1 Block 4
enquiries[0].block4.paras[1] = enquiries[0].block4.paras[1].replace(
  ', ensuring that once World War II ended, Zionist paramilitaries would turn their weapons on Britain.',
  '.',
);

// Page 11: Enquiry 4 Block 4
enquiries[3].block4.paras[1] = enquiries[3].block4.paras[1].replace(
  ', while Nasser emerged as the undisputed anti-imperialist hero of the Arab world.',
  '.',
);

// 2. Additions for remaining pages:
// Enquiry 02:
// Page 6 (Block 1)
enquiries[1].block1.paras[1] +=
  ' The resulting humanitarian crisis exposed Britain to severe international criticism and moral isolation across the globe.';
// Page 7 (Blocks 3 & 4)
enquiries[1].block3.paras[1] +=
  ' Communal militias mobilized across every contested quarter as the mandate unraveled into widespread lawlessness and bloodshed.';
enquiries[1].block4.paras[1] +=
  ' The 1949 armistice lines consolidated Israeli statehood while leaving regional Arab-Israeli tensions permanently unresolved.';

// Enquiry 03:
// Page 8 (Blocks 1 & 2)
enquiries[2].block1.paras[1] +=
  ' Generations of displaced families preserved their village oral histories, maintaining the memory of their lost ancestral lands.';
enquiries[2].block2.paras[1] +=
  ' The swift military reprisals deepened regional bitterness, transforming the armistice borders into active frontline combat zones.';
// Page 9 (Blocks 3 & 4)
enquiries[2].block3.paras[1] +=
  ' By transforming immigration into an engine of nation-building, Israel dramatically expanded its agricultural and industrial workforce.';
enquiries[2].block4.paras[1] +=
  ' Reprisal operations commanded by Sharon cemented a doctrine of disproportionate deterrence that became central to IDF strategic doctrine.';

// Enquiry 04:
// Page 10 (Blocks 1 & 2)
enquiries[3].block1.paras[1] +=
  ' The Czech arms shipment shattered Western military dominance, demonstrating the growing geopolitical reach of the Soviet Union.';
enquiries[3].block2.paras[1] +=
  ' Nasser’s charismatic oratory rallied millions across the Arab world, positioning Cairo as the epicentre of anti-imperial resistance.';

// Enquiry 05:
// Page 12 (Block 1)
enquiries[4].block1.paras[1] +=
  ' The water disputes demonstrated that ecological resources were inseparable from national sovereignty and military security in the arid Middle East.';
// Page 13 (Blocks 3 & 4)
enquiries[4].block3.paras[1] +=
  ' Syrian artillery bombardments maintained relentless psychological and economic pressure on northern Israeli agricultural communities.';
enquiries[4].block4.paras[1] +=
  ' The expulsion of UN peacekeepers eliminated the diplomatic buffer, leaving Egyptian and Israeli armies confronting each other directly across the frontier.';

// Enquiry 06:
// Page 14 (Block 1)
enquiries[5].block1.paras[1] +=
  ' Rabin’s strategic masterstroke achieved absolute air supremacy within hours, sealing the fate of the entire land campaign before it began.';
// Page 15 (Blocks 3 & 4)
enquiries[5].block3.paras[1] +=
  ' Syrian defenses on the Golan plateau crumbled under combined Israeli armor and close air support, securing the northern approaches.';
enquiries[5].block4.paras[1] +=
  ' The capture of the holy sites aroused fervent religious messianism inside Israel while inflicting profound psychological trauma on the Arab world.';

// Enquiry 07:
// Page 16 (Blocks 1 & 2)
enquiries[6].block1.paras[1] +=
  ' Military rule established extensive administrative controls, identity permits, and security checkpoints that reshaped daily Palestinian life under occupation.';
enquiries[6].block2.paras[1] +=
  ' Religious nationalist movements viewed the newly acquired territories as liberated biblical heritage rather than negotiable bargaining chips.';
// Page 17 (Blocks 3 & 4)
enquiries[6].block3.paras[1] +=
  ' Resolution 242’s linguistic ambiguity allowed both sides to interpret its withdrawal clauses to suit their conflicting territorial ambitions.';
enquiries[6].block4.paras[1] +=
  ' The Khartoum summit cemented a posture of collective defiance that obstructed diplomatic compromise for the next decade.';

// Enquiry 08:
// Page 18 (Blocks 1 & 2)
enquiries[7].block1.paras[1] +=
  ' Fatah’s active armed resistance provided a potent symbol of independent Palestinian agency free from Arab state manipulation.';
enquiries[7].block2.paras[1] +=
  ' The skyjackings forced international governments to confront the reality that the Palestinian national question could no longer be ignored.';
// Page 19 (Blocks 3 & 4)
enquiries[7].block3.paras[1] +=
  ' The massacre irrevocably altered international aviation and event security, inaugurating a grim era of global counter-terrorism operations.';
enquiries[7].block4.paras[1] +=
  ' Arafat’s speech established the PLO as an indispensable participant in any future comprehensive peace architecture.';

// Enquiry 09:
// Page 20 (Blocks 1 & 2)
enquiries[8].block1.paras[1] +=
  ' Sadat recognized that prolonged military stalemate was economically unsustainable and strategically disastrous for Egyptian sovereignty.';
enquiries[8].block2.paras[1] +=
  ' The audacious water-cannon assault shattered Israel’s formidable sand ramparts, achieving complete surprise along the entire length of the canal.';

// Enquiry 10:
// Page 22 (Blocks 1 & 2)
enquiries[9].block1.paras[1] +=
  ' Kissinger’s pragmatic bilateral approach established the precedent that peace could be negotiated incrementally through direct American mediation.';
enquiries[9].block2.paras[1] +=
  ' Sadat’s courageous presence in Jerusalem permanently disarmed the psychological barrier that had made dialogue unthinkable for three decades.';
// Page 23 (Blocks 3 & 4)
enquiries[9].block3.paras[1] +=
  ' Carter’s relentless personal persistence saved the negotiations from collapse on multiple occasions, binding both nations to a historic compromise.';
enquiries[9].block4.paras[1] +=
  ' Despite the intense regional ostracism, the treaty eliminated the existential threat of a multi-front assault on Israel for generations.';

// Enquiry 11:
// Page 24 (Block 1)
enquiries[10].block1.paras[1] +=
  ' The expanding military operation alienated international allies and deepened bitter domestic political divisions within Israeli society.';
// Page 25 (Blocks 3 & 4)
enquiries[10].block3.paras[1] +=
  ' The decentralized nature of the civil uprising rendered conventional Israeli military superiority ineffective against widespread popular rebellion.';
enquiries[10].block4.paras[1] +=
  ' Hamas presented an uncompromising religious vision of total liberation that challenged the secular PLO’s diplomatic monopoly.';

// Enquiry 12:
// Page 27 (Blocks 3 & 4)
enquiries[11].block3.paras[1] +=
  ' The Jordan peace accord demonstrated that pragmatic territorial and resource agreements could foster genuine regional cooperation.';
enquiries[11].block4.paras[1] +=
  ' The tragic murder of Rabin silenced the most credible champion of peace, leaving the region vulnerable to renewed cycles of confrontation.';

// Re-serialize enquiries back into cme_unified_textbook_data.cjs
let originalCode = fs.readFileSync(targetPath, 'utf8');
const startMarker = 'const ENQUIRIES = [';
const endMarker = 'const QUIZ_QUESTIONS = {';

const startIdx = originalCode.indexOf(startMarker);
const endIdx = originalCode.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not locate ENQUIRIES marker in file!');
  process.exit(1);
}

const newEnquiriesCode = 'const ENQUIRIES = ' + JSON.stringify(enquiries, null, 2) + ';\n\n';
const updatedCode = originalCode.slice(0, startIdx) + newEnquiriesCode + originalCode.slice(endIdx);

fs.writeFileSync(targetPath, updatedCode, 'utf8');
console.log('Successfully applied calibration text to cme_unified_textbook_data.cjs!');
